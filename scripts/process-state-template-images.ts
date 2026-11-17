import { mkdir } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const gridSource = "/var/folders/rp/12mc7qjs6cqfcrd0sk6lm5rc0000gn/T/codex-clipboard-6f34b3b4-a326-49a0-a6eb-0df44ae204e2.png";
const jerseySource = "/var/folders/rp/12mc7qjs6cqfcrd0sk6lm5rc0000gn/T/codex-clipboard-80e664c6-dd2a-4448-8254-703f15659f29.png";
const output = path.join(process.cwd(), "public/assets/elphino/state-templates");

const columns = [13, 359, 705, 1051, 1397, 1743];
const rows = [39, 342, 634];
const states = [
  ["new-york", "connecticut", "new-hampshire", "maine", "massachusetts", "vermont"],
  ["rhode-island", "georgia", "tennessee", "nevada", "north-carolina", "south-carolina"],
  ["michigan", "florida", "pennsylvania", "virginia", "ohio", "washington"],
];

async function main() {
  await mkdir(output, { recursive: true });
  for (let row = 0; row < rows.length; row += 1) {
    for (let column = 0; column < columns.length; column += 1) {
      const state = states[row][column];
      const panel = sharp(gridSource).extract({ left: columns[column], top: rows[row], width: 329, height: 147 });
      await panel.clone().resize(1316, 588).webp({ quality: 93 }).toFile(path.join(output, `${state}-card.webp`));
      await panel.clone().resize(1974, 882).webp({ quality: 94 }).toFile(path.join(output, `${state}-header.webp`));
    }
  }
  await sharp(jerseySource).extract({ left: 47, top: 526, width: 454, height: 246 }).resize(1316, 713).webp({ quality: 94 }).toFile(path.join(output, "new-jersey-card.webp"));
  await sharp(jerseySource).extract({ left: 540, top: 535, width: 970, height: 443 }).resize(1940, 886).webp({ quality: 95 }).toFile(path.join(output, "new-jersey-header.webp"));
}

void main();
