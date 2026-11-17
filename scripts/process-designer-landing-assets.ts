import { mkdir } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const source = "/var/folders/rp/12mc7qjs6cqfcrd0sk6lm5rc0000gn/T/codex-clipboard-9fbedc2f-a6ba-4b12-bad6-603a1613b219.png";
const output = path.join(process.cwd(), "public/assets/elphino/designer-landing");

async function main() {
  await mkdir(output, { recursive: true });
  await sharp(source).extract({ left: 596, top: 80, width: 940, height: 360 }).resize(1500, 575).webp({ quality: 90 }).toFile(path.join(output, "hero-shirts.webp"));
  const cards = [
    ["urban-legends", 54],
    ["botanica", 344],
    ["cosmic-journey", 634],
    ["zen-samurai", 919],
    ["geocraft", 1203],
  ] as const;
  for (const [name, left] of cards) {
    await sharp(source).extract({ left, top: 518, width: 270, height: 211 }).resize(800, 625).webp({ quality: 92 }).toFile(path.join(output, `${name}.webp`));
  }
}

void main();
