// Builds public/og-default.jpg (1200x630) from the brand logo and a studio photo.
// Composition mirrors the home hero: the photo breaks out of the teal square.
import sharp from 'sharp';
import { readFileSync } from 'node:fs';

const W = 1200;
const H = 630;
const TEAL = '#009A8E';

const logoSvg = readFileSync('src/assets/brand/logo-horizontal-color.svg');
const logo = await sharp(logoSvg, { density: 300 }).resize({ width: 560 }).png().toBuffer();
const logoMeta = await sharp(logo).metadata();

const photoW = 470;
const photoH = 560;
const photo = await sharp('src/assets/studio/studio-sala-luminosa.jpg')
  .resize(photoW, photoH, { fit: 'cover', position: 'attention' })
  .toBuffer();

const square = await sharp({
  create: { width: 420, height: 470, channels: 3, background: TEAL },
}).png().toBuffer();

const tagline = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="560" height="80">
     <rect x="0" y="0" width="64" height="4" fill="${TEAL}"/>
   </svg>`,
);

await sharp({ create: { width: W, height: H, channels: 3, background: '#ffffff' } })
  .composite([
    { input: square, left: W - 420 - 40, top: 40 },
    { input: photo, left: W - 40 - 420 - 110, top: H - photoH - 35 },
    { input: logo, left: 70, top: Math.round((H - logoMeta.height) / 2) - 20 },
    { input: tagline, left: 70, top: Math.round((H + logoMeta.height) / 2) + 20 },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile('public/og-default.jpg');

console.log('public/og-default.jpg written');
