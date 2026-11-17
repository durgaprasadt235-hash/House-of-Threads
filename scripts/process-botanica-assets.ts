import path from "node:path";
import { mkdir } from "node:fs/promises";

import sharp from "sharp";

const root = process.cwd();
const frontSource = "/var/folders/rp/12mc7qjs6cqfcrd0sk6lm5rc0000gn/T/codex-clipboard-51ff2ab4-8e3c-42b0-9055-353a8b79defd.png";
const backSource = "/var/folders/rp/12mc7qjs6cqfcrd0sk6lm5rc0000gn/T/codex-clipboard-74ae6215-ba61-4d28-b93a-08130c194683.png";
const slugs = ["brown-earth", "bamboo-grove", "ivory-palm", "slate-agave", "plum-thorne", "deep-sea", "desert-seed", "graphite-root", "sage-nepenthes", "golden-ochre"];

const cells = slugs.map((slug, index) => ({
  slug,
  column: index % 5,
  row: Math.floor(index / 5),
}));

async function render(source: string, slug: string, column: number, row: number, side: "front" | "back") {
  const top = side === "front" ? (row === 0 ? 158 : 505) : row === 0 ? 174 : 558;
  // Stop above the captions baked into the source boards. The site supplies
  // product names as real HTML, so only the garment belongs in these assets.
  const height = side === "front" ? 290 : 315;
  const left = column * 307 + 12;
  const output = path.join(root, "public/assets/elphino/designer-themes/botanica", slug, `${side}.webp`);
  await mkdir(path.dirname(output), { recursive: true });
  await sharp(source)
    .extract({ left, top, width: 283, height })
    .resize(900, 1100, { fit: "contain", background: "#f7f3ed" })
    .webp({ quality: 92, smartSubsample: true })
    .toFile(output);
}

async function renderDetail(slug: string) {
  const front = path.join(root, "public/assets/elphino/designer-themes/botanica", slug, "front.webp");
  const output = path.join(root, "public/assets/elphino/designer-themes/botanica", slug, "detail.webp");
  await sharp(front)
    .extract({ left: 175, top: 150, width: 550, height: 550 })
    .resize(1100, 1100, { kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 0.7 })
    .webp({ quality: 94, smartSubsample: true })
    .toFile(output);
}

async function main() {
  await Promise.all(cells.flatMap(({ slug, column, row }) => [render(frontSource, slug, column, row, "front"), render(backSource, slug, column, row, "back")]));
  await Promise.all(slugs.map(renderDetail));
  console.log(`Created ${slugs.length * 3} Botanica assets.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
