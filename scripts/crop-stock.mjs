// Crops the downloaded Pexels originals to square service images (1400x1400).
// Usage: node scripts/crop-stock.mjs <input-dir> <output-dir>
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const [inDir, outDir] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });
const jobs = [
  { name: 'sbiancamento', position: 'attention' },
  { name: 'conservativa', position: 'attention' },
  { name: 'endodonzia', position: 'attention' },
  { name: 'impianti', position: 'attention' },
  { name: 'ortodonzia', position: 'attention' },
];
for (const j of jobs) {
  const info = await sharp(`${inDir}/${j.name}.jpg`)
    .resize(1400, 1400, { fit: 'cover', position: j.position })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(`${outDir}/${j.name}.jpg`);
  console.log(j.name.padEnd(14), `${info.width}x${info.height}`, `${Math.round(info.size / 1024)} KB`);
}
