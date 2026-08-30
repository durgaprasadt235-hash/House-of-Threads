import "server-only";

import { db } from "@/lib/db";
import type { StorefrontProductDto } from "./types";

export async function getActiveElphinoProductIds(): Promise<string[]> {
  const products = await db.product.findMany({
    where: {
      isActive: true,
      brand: { slug: "elphino" },
    },
    select: { id: true },
    orderBy: { createdAt: "asc" },
  });

  return products.map((product) => product.id);
}

export async function getElphinoProductById(id: string): Promise<StorefrontProductDto | null> {
  const product = await db.product.findUnique({
    where: {
      id,
      isActive: true,
      brand: { slug: "elphino" },
    },
    include: {
      category: true,
      images: {
        orderBy: { position: "asc" },
      },
      variants: {
        where: { isActive: true },
        include: { inventory: true },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!product) return null;

  // Process Images
  let defaultImage = "";
  let backImage: string | undefined = undefined;
  const colorImages: Record<string, string> = {};

  for (const img of product.images) {
    if (img.view === "FRONT" && !img.color && !defaultImage) {
      defaultImage = img.url;
    } else if (img.view === "BACK" && !backImage) {
      backImage = img.url;
    } else if (img.view === "FRONT" && img.color) {
      colorImages[img.color] = img.url;
    }
  }

  // Fallback to first image if no front image is found explicitly
  if (!defaultImage && product.images.length > 0) {
    defaultImage = product.images[0].url;
  }

  // Process Variants and Sizes/Colors Derivation
  const sizeSet = new Set<string>();
  const colorSet = new Set<string>();
  let hasAnyStock = false;

  const variants = product.variants.map((v) => {
    sizeSet.add(v.size);
    colorSet.add(v.color);

    const availableQty = (v.inventory?.quantity ?? 0) - (v.inventory?.reserved ?? 0);
    const isAvailable = v.isActive && availableQty > 0;
    if (isAvailable) {
      hasAnyStock = true;
    }

    return {
      size: v.size,
      color: v.color,
      isAvailable,
    };
  });

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: Number(product.price),
    category: product.category.name,
    style: product.style ?? "Standard",
    fit: product.fit ?? "Regular",
    badge: (product.badge as "NEW" | "LIMITED") ?? undefined,
    designConcept: product.designConcept ?? undefined,
    designTechnique: product.designTechnique ?? undefined,
    designKey: product.designKey ?? undefined,
    poloDesign: product.designKey ?? undefined,
    brandPlacement: product.brandPlacement as { front: string; back: string } | undefined,
    image: defaultImage,
    backImage,
    colorImages: Object.keys(colorImages).length > 0 ? colorImages : undefined,
    sizes: Array.from(sizeSet),
    colors: Array.from(colorSet),
    inStock: hasAnyStock,
    variants,
  };
}
