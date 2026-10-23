// Builds src/assets/map.jpg: the preview shown before the visitor loads the interactive Google Map (a 16:9 OpenStreetMap
// render with a brand-coloured pin).
// Run once (tiles are fetched once, politely, then the image is committed). Data © OpenStreetMap contributors.
import sharp from 'sharp';
import { readFileSync } from 'node:fs';

const studio = JSON.parse(readFileSync('src/data/studio.json', 'utf8'));
const { latitude: lat, longitude: lon } = studio.geo;
const Z = 17;
const TILE = 256;
const COLS = 7;
const ROWS = 4;

const worldX = ((lon + 180) / 360) * 2 ** Z * TILE;
const sinLat = Math.sin((lat * Math.PI) / 180);
const worldY = (0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) * 2 ** Z * TILE;

const tx0 = Math.floor(worldX / TILE) - Math.floor(COLS / 2) + (COLS % 2 ? 0 : 0);
const ty0 = Math.floor(worldY / TILE) - Math.floor(ROWS / 2);

const composites = [];
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    const url = `https://tile.openstreetmap.org/${Z}/${tx0 + c}/${ty0 + r}.png`;
    const res = await fetch(url, { headers: { 'User-Agent': 'StudioTaddiaSite/1.0 (one-off static map build; dentistanovarataddia.it)' } });
    if (!res.ok) throw new Error(`${url} -> ${res.status}`);
    composites.push({ input: Buffer.from(await res.arrayBuffer()), left: c * TILE, top: r * TILE });
    await new Promise((ok) => setTimeout(ok, 300));
  }
}

const px = Math.round(worldX - tx0 * TILE);
const py = Math.round(worldY - ty0 * TILE);
const pin = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="64" height="84" viewBox="0 0 64 84">
  <path d="M32 82C32 82 6 52 6 30a26 26 0 0 1 52 0c0 22-26 52-26 52z" fill="#009A8E" stroke="#fff" stroke-width="4"/>
  <circle cx="32" cy="30" r="10" fill="#fff"/>
</svg>`);
composites.push({ input: await sharp(pin).png().toBuffer(), left: px - 32, top: py - 82 });

const full = await sharp({ create: { width: COLS * TILE, height: ROWS * TILE, channels: 3, background: '#eef8f7' } })
  .composite(composites)
  .jpeg({ quality: 90, mozjpeg: true })
  .toBuffer();

// Crop a 16:9 window centred on the pin (as far as the tiles allow), so the pin sits in the middle of the preview.
const W = 1500;
const H = 844;
const left = Math.max(0, Math.min(COLS * TILE - W, px - Math.round(W / 2)));
const top = Math.max(0, Math.min(ROWS * TILE - H, py - Math.round(H / 2)));
await sharp(full).extract({ left, top, width: W, height: H }).jpeg({ quality: 82, mozjpeg: true }).toFile('src/assets/map.jpg');

console.log(`src/assets/map.jpg ${W}x${H}, pin at ${px - left},${py - top} in the crop`);
