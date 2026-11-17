import path from "node:path";
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

import { designerThemeStates } from "../src/data/designer-themes";

const root = process.cwd();

const productWindowByLayout = {
  standard: { top: 0.13, bottom: 0.015 },
  tall: { top: 0.22, bottom: 0.015 },
  island: { top: 0.015, bottom: 0.1 },
  jersey: { top: 0.14, bottom: 0.015 },
  newYork: { top: 0.015, bottom: 0.11 },
} as const;

function getProductWindow(state: (typeof designerThemeStates)[number]) {
  if (state.slug === "new-york") return productWindowByLayout.newYork;
  if (state.slug === "new-jersey") return productWindowByLayout.jersey;
  if (state.slug === "rhode-island") return productWindowByLayout.island;
  if (["connecticut", "maine", "new-hampshire", "vermont"].includes(state.slug)) return productWindowByLayout.tall;
  return productWindowByLayout.standard;
}

async function main() {
for (const state of designerThemeStates) {
  const source = path.join(root, "public", state.source);
  const output = path.join(root, "public/assets/elphino/states", state.slug);
  await mkdir(output, { recursive: true });
  const metadata = await sharp(source).metadata();
  if (!metadata.width || !metadata.height) throw new Error(`Missing dimensions for ${state.slug}`);
  const width = metadata.width;
  const height = metadata.height;
  const heroHeight = Math.max(1, Math.round(height * (state.crop.headerBottom || 0.2)));
  await sharp(source).extract({ left: 0, top: 0, width, height: heroHeight }).resize({ width: 1280, withoutEnlargement: true }).webp({ quality: 86 }).toFile(path.join(output, "hero.webp"));

  const columnEdges = Array.from({ length: 6 }, (_, index) => Math.round((width * index) / 5));
  const rowEdges = [Math.round(height * state.crop.headerBottom), Math.round(height * state.crop.rowSplit), Math.round(height * state.crop.footerTop)];
  for (let index = 0; index < state.designs.length; index += 1) {
    const row = index < 5 ? 0 : 1;
    const column = index % 5;
    const left = columnEdges[column];
    const cellTop = rowEdges[row];
    const cellHeight = rowEdges[row + 1] - cellTop;
    const window = getProductWindow(state);
    const horizontalInset = Math.max(2, Math.round(width * 0.0015));
    const topInset = Math.round(cellHeight * window.top);
    const bottomInset = Math.round(cellHeight * window.bottom);
    const top = cellTop + topInset;
    const cropWidth = columnEdges[column + 1] - left - (horizontalInset * 2);
    const cropHeight = cellHeight - topInset - bottomInset;
    const filename = path.basename(state.designs[index].image);
    await sharp(source)
      .extract({ left: left + horizontalInset, top, width: cropWidth, height: cropHeight })
      .resize({ width: 1600, height: 2000, fit: "contain", kernel: sharp.kernel.lanczos3, background: "#f3ede3" })
      .sharpen({ sigma: 0.7, m1: 0.7, m2: 1.4 })
      .webp({ quality: 94, effort: 6, smartSubsample: true })
      .toFile(path.join(output, filename));
  }
}

console.log(`Processed ${designerThemeStates.length} states and ${designerThemeStates.reduce((count, state) => count + state.designs.length, 0)} individual designs.`);
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
