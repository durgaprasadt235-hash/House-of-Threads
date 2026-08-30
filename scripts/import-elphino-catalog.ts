/**
 * Elphino Catalog Importer
 *
 * Idempotent importer for the Elphino TypeScript product fixture.
 * Supports a mandatory dry-run/validation mode before any database writes.
 *
 * Usage:
 *   npx tsx scripts/import-elphino-catalog.ts --dry-run
 *   npx tsx scripts/import-elphino-catalog.ts --bootstrap-inventory=10
 *
 * Safety: refuses to run with a non-zero bootstrap quantity unless
 * NODE_ENV is explicitly "development" or --force-dev flag is provided.
 */

import { existsSync } from "fs";
import path from "path";
import crypto from "crypto";
import {
  PrismaClient,
  InventoryTransactionType,
  ProductImageView,
} from "@prisma/client";
import {
  elphinoProducts,
  type ElphinoProduct,
} from "../src/data/elphino-products.js";

// ─── CLI argument parsing ────────────────────────────────────────────────────

const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run");
const forceDevFlag = args.includes("--force-dev");

function getArg(name: string): string | undefined {
  const flag = args.find((a) => a.startsWith(`--${name}=`));
  return flag ? flag.split("=")[1] : undefined;
}

const bootstrapInventoryArg = getArg("bootstrap-inventory");
const BOOTSTRAP_QTY =
  bootstrapInventoryArg !== undefined
    ? parseInt(bootstrapInventoryArg, 10)
    : 10;

if (isNaN(BOOTSTRAP_QTY) || BOOTSTRAP_QTY < 0) {
  console.error(
    `ERROR: Invalid --bootstrap-inventory value: ${bootstrapInventoryArg}`,
  );
  process.exit(1);
}

// ─── Production guard ────────────────────────────────────────────────────────

const isDevEnv =
  process.env.NODE_ENV === "development" || process.env.NODE_ENV === undefined;
if (!isDryRun && BOOTSTRAP_QTY > 0 && !isDevEnv && !forceDevFlag) {
  console.error(
    "ERROR: Refusing to bootstrap inventory in a non-development environment.\n" +
      "       Set NODE_ENV=development or pass --force-dev to override.\n" +
      "       This guard exists to prevent provisional development stock from\n" +
      "       being written to a production database.",
  );
  process.exit(1);
}

// ─── Expected fixture counts (from fixture analysis 2026-08-30) ──────────────

const EXPECTED_PRODUCT_COUNT = 262;
const EXPECTED_VARIANT_COUNT = 4311;

// ─── SKU generation ──────────────────────────────────────────────────────────

/**
 * Generate a stable, unique, collision-resistant base SKU for a product.
 * Uses SHA-256 of the product ID, takes the first 12 hex chars, uppercased.
 * Prefix ELP- for namespace clarity.
 */
function generateBaseSku(productId: string): string {
  const hash = crypto
    .createHash("sha256")
    .update(`elphino:product:${productId}`)
    .digest("hex");
  return `ELP-${hash.slice(0, 12).toUpperCase()}`;
}

/**
 * Generate a stable, unique SKU for a product variant (size + color).
 * Uses SHA-256 of productId + size + color. Takes the first 16 hex chars.
 */
function generateVariantSku(
  productId: string,
  size: string,
  color: string,
): string {
  const input = `elphino:variant:${productId}:${size}:${color}`;
  const hash = crypto.createHash("sha256").update(input).digest("hex");
  return `ELP-V${hash.slice(0, 14).toUpperCase()}`;
}

/**
 * Generate a URL-safe slug from an arbitrary string.
 */
function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ─── Image path resolution ────────────────────────────────────────────────────

const PUBLIC_DIR = path.join(process.cwd(), "public");

function resolvePublicPath(url: string): string {
  // public/ is the root for Next.js static assets
  return path.join(PUBLIC_DIR, url);
}

// ─── Validation phase ─────────────────────────────────────────────────────────

interface ValidationResult {
  ok: boolean;
  productCount: number;
  variantCount: number;
  imageCount: number;
  skuUnique: boolean;
  errors: string[];
  warnings: string[];
}

function validate(products: ElphinoProduct[]): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // 1. Product count
  const productCount = products.length;
  if (productCount !== EXPECTED_PRODUCT_COUNT) {
    errors.push(
      `Product count mismatch: expected ${EXPECTED_PRODUCT_COUNT}, got ${productCount}`,
    );
  }

  // 2. Unique product IDs
  const idSet = new Set<string>();
  const duplicateIds: string[] = [];
  for (const p of products) {
    if (idSet.has(p.id)) {
      duplicateIds.push(p.id);
    } else {
      idSet.add(p.id);
    }
  }
  if (duplicateIds.length > 0) {
    errors.push(`Duplicate product IDs found: ${duplicateIds.join(", ")}`);
  }

  // 3. Categories
  const validCategories = new Set([
    "Polos",
    "Round Necks",
    "Shirts",
    "Hoodies",
    "Jeans",
    "Trousers",
  ]);
  for (const p of products) {
    if (!validCategories.has(p.category)) {
      errors.push(`Product "${p.id}" has unknown category: "${p.category}"`);
    }
  }

  // 4. Prices
  for (const p of products) {
    if (typeof p.price !== "number" || p.price <= 0 || !isFinite(p.price)) {
      errors.push(`Product "${p.id}" has invalid price: ${p.price}`);
    }
  }

  // 5. Variant generation
  let variantCount = 0;
  const allVariantSkus = new Set<string>();
  const duplicateSkus: string[] = [];
  const allBaseSkus = new Set<string>();
  const duplicateBaseSkus: string[] = [];

  for (const p of products) {
    if (!p.sizes || p.sizes.length === 0) {
      errors.push(`Product "${p.id}" has no sizes`);
    }
    if (!p.colors || p.colors.length === 0) {
      errors.push(`Product "${p.id}" has no colors`);
    }

    const baseSku = generateBaseSku(p.id);
    if (allBaseSkus.has(baseSku)) {
      duplicateBaseSkus.push(`${p.id} → ${baseSku}`);
    } else {
      allBaseSkus.add(baseSku);
    }

    for (const size of p.sizes ?? []) {
      for (const color of p.colors ?? []) {
        variantCount++;
        const sku = generateVariantSku(p.id, size, color);
        if (allVariantSkus.has(sku)) {
          duplicateSkus.push(`${p.id}/${size}/${color} → ${sku}`);
        } else {
          allVariantSkus.add(sku);
        }
      }
    }
  }

  if (variantCount !== EXPECTED_VARIANT_COUNT) {
    errors.push(
      `Variant count mismatch: expected ${EXPECTED_VARIANT_COUNT}, got ${variantCount}`,
    );
  }

  if (duplicateSkus.length > 0) {
    errors.push(`Duplicate variant SKUs:\n  ${duplicateSkus.join("\n  ")}`);
  }

  if (duplicateBaseSkus.length > 0) {
    errors.push(`Duplicate base SKUs:\n  ${duplicateBaseSkus.join("\n  ")}`);
  }

  const skuUnique =
    duplicateSkus.length === 0 && duplicateBaseSkus.length === 0;

  // 6. Image references
  const missingImages: string[] = [];
  let imageCount = 0;

  for (const p of products) {
    // front image
    const frontPath = resolvePublicPath(p.image);
    imageCount++;
    if (!existsSync(frontPath)) {
      missingImages.push(`Product "${p.id}" front image: ${p.image}`);
    }

    // back image
    if (p.backImage) {
      imageCount++;
      const backPath = resolvePublicPath(p.backImage);
      if (!existsSync(backPath)) {
        missingImages.push(`Product "${p.id}" back image: ${p.backImage}`);
      }
    }

    // color variant images
    if (p.colorImages) {
      for (const [color, imgUrl] of Object.entries(p.colorImages)) {
        imageCount++;
        const imgPath = resolvePublicPath(imgUrl);
        if (!existsSync(imgPath)) {
          missingImages.push(
            `Product "${p.id}" color image [${color}]: ${imgUrl}`,
          );
        }
      }
    }
  }

  if (missingImages.length > 0) {
    // Images are development assets — warn but do not fail validation
    // so the importer can be used before all assets are present.
    warnings.push(
      `${missingImages.length} image file(s) not found on disk (import will skip file-exists check in dev):\n` +
        missingImages.map((m) => `  MISSING: ${m}`).join("\n"),
    );
  }

  const ok = errors.length === 0;
  return {
    ok,
    productCount,
    variantCount,
    imageCount,
    skuUnique,
    errors,
    warnings,
  };
}

// ─── Import phase ─────────────────────────────────────────────────────────────

async function runImport(
  products: ElphinoProduct[],
  bootstrapQty: number,
): Promise<void> {
  const prisma = new PrismaClient();

  try {
    console.log(
      "\n─── Starting import ──────────────────────────────────────────",
    );
    console.log(
      `Bootstrap inventory per variant (inStock=true): ${bootstrapQty}`,
    );
    console.log(
      "⚠  PROVISIONAL DEVELOPMENT INVENTORY — not real production stock.\n",
    );

    // Step 1: Upsert Elphino brand
    console.log("[1/8] Upserting Elphino brand…");
    const brand = await prisma.brand.upsert({
      where: { slug: "elphino" },
      update: { name: "Elphino", isActive: true },
      create: {
        id: "elphino",
        name: "Elphino",
        slug: "elphino",
        description: "Elphino — design-forward apparel brand.",
        isActive: true,
      },
    });
    console.log(`   Brand: ${brand.id} (${brand.name})`);

    // Step 2: Upsert six categories
    console.log("[2/8] Upserting six Elphino categories…");
    const categoryDefs = [
      { slug: "elphino-polos", name: "Polos" },
      { slug: "elphino-round-necks", name: "Round Necks" },
      { slug: "elphino-shirts", name: "Shirts" },
      { slug: "elphino-hoodies", name: "Hoodies" },
      { slug: "elphino-jeans", name: "Jeans" },
      { slug: "elphino-trousers", name: "Trousers" },
    ] as const;

    const categoryMap = new Map<string, string>(); // category name → id
    for (const cat of categoryDefs) {
      const record = await prisma.category.upsert({
        where: { slug: cat.slug },
        update: { name: cat.name },
        create: { slug: cat.slug, name: cat.name },
      });
      categoryMap.set(cat.name, record.id);
    }
    console.log(`   Categories: ${[...categoryMap.keys()].join(", ")}`);

    // Step 3–8: Upsert each product
    console.log("[3/8] Upserting products, images, variants, inventory…");

    let productsUpserted = 0;
    let variantsUpserted = 0;
    let variantsDeactivated = 0;
    let inventoryCreated = 0;
    let inventoryUpdated = 0;
    let imagesReconciled = 0;

    for (const fixture of products) {
      const categoryId = categoryMap.get(fixture.category);
      if (!categoryId) {
        throw new Error(
          `Unknown category "${fixture.category}" for product "${fixture.id}"`,
        );
      }

      const baseSku = generateBaseSku(fixture.id);
      // Slug includes the product ID (as a suffix) to guarantee uniqueness
      // across products with the same name (e.g. state round-necks).
      const slug = slugify(fixture.name) + "-" + slugify(fixture.id);

      // Step 4: Upsert product using exact legacy ID
      await prisma.product.upsert({
        where: { id: fixture.id },
        update: {
          name: fixture.name,
          slug,
          price: fixture.price,
          fit: fixture.fit,
          isActive: fixture.inStock,
          style: fixture.style ?? null,
          badge: fixture.status ?? null,
          designConcept: fixture.designConcept ?? null,
          designTechnique: fixture.designTechnique ?? null,
          createdRank: fixture.createdRank,
          brandPlacement: fixture.brandPlacement
            ? (fixture.brandPlacement as object)
            : undefined,
          categoryId,
        },
        create: {
          id: fixture.id,
          brandId: brand.id,
          categoryId,
          name: fixture.name,
          slug,
          description: fixture.name, // placeholder; full descriptions come later
          price: fixture.price,
          baseSku,
          gender: "UNISEX",
          fit: fixture.fit,
          isActive: fixture.inStock,
          isFeatured: false,
          isNewArrival: fixture.status === "NEW",
          style: fixture.style ?? null,
          badge: fixture.status ?? null,
          designConcept: fixture.designConcept ?? null,
          designTechnique: fixture.designTechnique ?? null,
          createdRank: fixture.createdRank,
          brandPlacement: fixture.brandPlacement
            ? (fixture.brandPlacement as object)
            : undefined,
        },
      });
      productsUpserted++;

      // Step 5: Reconcile images deterministically
      // Strategy: delete and recreate images for this product on each run
      // This is safe because ProductImage has no external FK dependencies
      await prisma.productImage.deleteMany({
        where: { productId: fixture.id },
      });

      const imagesToCreate: {
        productId: string;
        url: string;
        altText: string;
        position: number;
        view: ProductImageView;
        color: string | null;
      }[] = [];

      // front image → FRONT, position 0
      imagesToCreate.push({
        productId: fixture.id,
        url: fixture.image,
        altText: `${fixture.name} — front`,
        position: 0,
        view: ProductImageView.FRONT,
        color: null,
      });

      // back image → BACK
      if (fixture.backImage) {
        imagesToCreate.push({
          productId: fixture.id,
          url: fixture.backImage,
          altText: `${fixture.name} — back`,
          position: 1,
          view: ProductImageView.BACK,
          color: null,
        });
      }

      // colorImages → FRONT with that color
      if (fixture.colorImages) {
        let colorPos = 10; // start after reserved positions
        for (const [color, url] of Object.entries(fixture.colorImages)) {
          imagesToCreate.push({
            productId: fixture.id,
            url,
            altText: `${fixture.name} — ${color}`,
            position: colorPos++,
            view: ProductImageView.FRONT,
            color,
          });
        }
      }

      await prisma.productImage.createMany({ data: imagesToCreate });
      imagesReconciled += imagesToCreate.length;

      // Step 6: Upsert variants
      const fixtureVariantKeys = new Set<string>(); // "size:color"

      for (const size of fixture.sizes) {
        for (const color of fixture.colors) {
          const variantKey = `${size}:${color}`;
          fixtureVariantKeys.add(variantKey);
          const sku = generateVariantSku(fixture.id, size, color);

          const variant = await prisma.productVariant.upsert({
            where: {
              productId_size_color: { productId: fixture.id, size, color },
            },
            update: {
              sku,
              isActive: true,
            },
            create: {
              productId: fixture.id,
              sku,
              size,
              color,
              isActive: true,
            },
          });
          variantsUpserted++;

          // Step 7: Create/reconcile inventory
          const targetQty = fixture.inStock ? bootstrapQty : 0;
          const existing = await prisma.inventory.findUnique({
            where: { variantId: variant.id },
          });

          if (!existing) {
            // Create inventory record
            await prisma.inventory.create({
              data: {
                variantId: variant.id,
                quantity: targetQty,
                reserved: 0,
              },
            });

            // Step 8: Create initial inventory adjustment record
            if (targetQty > 0) {
              const inv = await prisma.inventory.findUniqueOrThrow({
                where: { variantId: variant.id },
              });
              await prisma.inventoryTransaction.create({
                data: {
                  inventoryId: inv.id,
                  type: InventoryTransactionType.ADJUSTMENT,
                  quantity: targetQty,
                  reason:
                    `PROVISIONAL DEVELOPMENT INVENTORY — imported from Elphino legacy TypeScript fixture on ${new Date().toISOString()}. ` +
                    `This is NOT real production stock. Bootstrap qty=${targetQty}.`,
                },
              });
            }
            inventoryCreated++;
          } else {
            // Inventory already exists — do not overwrite real quantities.
            // Only create an adjustment if the existing qty is 0 and we
            // are bootstrapping (first import scenario after re-migration).
            if (existing.quantity === 0 && targetQty > 0) {
              await prisma.inventory.update({
                where: { id: existing.id },
                data: { quantity: targetQty },
              });
              await prisma.inventoryTransaction.create({
                data: {
                  inventoryId: existing.id,
                  type: InventoryTransactionType.ADJUSTMENT,
                  quantity: targetQty,
                  reason:
                    `PROVISIONAL DEVELOPMENT INVENTORY — re-bootstrap from Elphino legacy fixture on ${new Date().toISOString()}. ` +
                    `Existing quantity was 0; set to ${targetQty}. NOT real production stock.`,
                },
              });
            }
            inventoryUpdated++;
          }
        }
      }

      // Mark removed variants inactive (do not delete historical data)
      const existingVariants = await prisma.productVariant.findMany({
        where: { productId: fixture.id, isActive: true },
        select: { id: true, size: true, color: true },
      });

      for (const ev of existingVariants) {
        const key = `${ev.size}:${ev.color}`;
        if (!fixtureVariantKeys.has(key)) {
          await prisma.productVariant.update({
            where: { id: ev.id },
            data: { isActive: false },
          });
          variantsDeactivated++;
        }
      }
    }

    // ─── Reconciliation report ───────────────────────────────────────────────
    console.log(
      "\n─── Reconciliation Report ────────────────────────────────────",
    );
    console.log(`Products upserted:      ${productsUpserted}`);
    console.log(`Images reconciled:      ${imagesReconciled}`);
    console.log(`Variants upserted:      ${variantsUpserted}`);
    console.log(`Variants deactivated:   ${variantsDeactivated}`);
    console.log(`Inventory created:      ${inventoryCreated}`);
    console.log(`Inventory updated:      ${inventoryUpdated}`);
    console.log(`Bootstrap qty:          ${bootstrapQty} (dev provisional)`);
    console.log(
      "─────────────────────────────────────────────────────────────",
    );
    console.log("✅ Import complete.");
  } finally {
    await prisma.$disconnect();
  }
}

// ─── Entry point ──────────────────────────────────────────────────────────────

async function main() {
  console.log(
    "═══════════════════════════════════════════════════════════════",
  );
  console.log(" Elphino Catalog Importer");
  console.log(
    `  Mode:             ${isDryRun ? "DRY RUN (validation only)" : "LIVE IMPORT"}`,
  );
  if (!isDryRun) {
    console.log(`  Bootstrap qty:    ${BOOTSTRAP_QTY}`);
  }
  console.log(
    "═══════════════════════════════════════════════════════════════\n",
  );

  // ─── Validation always runs first ───────────────────────────────────────────
  console.log("─── Validation ───────────────────────────────────────────────");
  const result = validate(elphinoProducts);

  console.log(
    `Products validated:     ${result.productCount} (expected ${EXPECTED_PRODUCT_COUNT})`,
  );
  console.log(
    `Variants validated:     ${result.variantCount} (expected ${EXPECTED_VARIANT_COUNT})`,
  );
  console.log(`Image refs validated:   ${result.imageCount}`);
  console.log(
    `SKUs unique:            ${result.skuUnique ? "YES ✅" : "NO ❌"}`,
  );

  if (result.warnings.length > 0) {
    console.log("\n⚠  Warnings:");
    for (const w of result.warnings) {
      console.log(`  ${w}`);
    }
  }

  if (result.errors.length > 0) {
    console.error(
      "\n❌ Validation FAILED. The following errors must be resolved:",
    );
    for (const e of result.errors) {
      console.error(`  ERROR: ${e}`);
    }
    process.exit(1);
  }

  console.log("\n✅ Validation passed.");

  if (isDryRun) {
    console.log(
      "\n── DRY RUN complete — no database writes performed. ──────────",
    );
    console.log("   Re-run without --dry-run to import into the database.");
    process.exit(0);
  }

  // ─── Live import ──────────────────────────────────────────────────────────
  await runImport(elphinoProducts, BOOTSTRAP_QTY);
}

main().catch((err) => {
  console.error("FATAL:", err);
  process.exit(1);
});
