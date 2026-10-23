// Splits the clinic's stacked "prima / dopo" images into separate before/after files for the slider.
// Source: Brand info/Work/. Only close-up intraoral shots with no identifiable faces are included.
// Held back until the clinic confirms its policy on faces: casi-clinici-2/7/8/9, the lips-only shots and the beard shot.
// Output: src/assets/cases/<id>-before.jpg and <id>-after.jpg, cropped to the same size so the slider lines up.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const SRC = 'Brand info/Work/';
const OUT = 'src/assets/cases/';
mkdirSync(OUT, { recursive: true });

// axis: 'rows' = before on top, after below; 'cols' = before on the left, after on the right.
// trimTop / trimBottom: fraction of the height to cut, where the source has "PRIMA"/"DOPO" captions baked in (they would overlap in the slider).
// at: approximate position of the dividing line (found by scanning for a uniform band).
const cases = [
  { id: 'molare', file: 'dentista-novara-casi-clinici-1.webp', axis: 'rows', at: 640, trimBottom: 0.27 },
  { id: 'gengiva', file: 'dentista-novara-casi-clinici-3.webp', axis: 'rows', at: 458 },
  { id: 'incisivi', file: 'dentista-novara-casi-clinici-4.webp', axis: 'rows', at: 410 },
  { id: 'restauro-frontale', file: 'dentista-novara-casi-clinici-5.webp', axis: 'rows', at: 637 },
  { id: 'allineamento', file: '481215192_1122375616568692_3199779563746081787_n.jpg', axis: 'rows', at: 505 },
  { id: 'faccette', file: '481161421_1122375209902066_5775103373218144366_n.jpg', axis: 'cols', at: 488, trimTop: 0.17 },
];

for (const c of cases) {
  const img = sharp(SRC + c.file);
  const { width: w, height: h } = await img.metadata();
  const { data } = await sharp(SRC + c.file).greyscale().raw().toBuffer({ resolveWithObject: true });
  const lineStd = (i) => {
    let s = 0, s2 = 0;
    const n = c.axis === 'rows' ? w : h;
    for (let k = 0; k < n; k++) {
      const v = c.axis === 'rows' ? data[i * w + k] : data[k * w + i];
      s += v; s2 += v * v;
    }
    const m = s / n;
    return Math.sqrt(Math.max(0, s2 / n - m * m));
  };
  // Grow the separator band around `at` while lines stay almost uniform.
  const limit = c.axis === 'rows' ? h : w;
  let a = c.at, b = c.at;
  while (a > 2 && lineStd(a - 1) < 6 && c.at - a < 40) a--;
  while (b < limit - 2 && lineStd(b + 1) < 6 && b - c.at < 40) b++;
  const gap = 3;
  let before, after;
  if (c.axis === 'rows') {
    before = { left: 0, top: 0, width: w, height: Math.max(10, a - gap) };
    after = { left: 0, top: b + gap, width: w, height: h - (b + gap) };
  } else {
    before = { left: 0, top: 0, width: Math.max(10, a - gap), height: h };
    after = { left: b + gap, top: 0, width: w - (b + gap), height: h };
  }
  // Same size for both halves (center crop to the smaller) so they overlay exactly.
  const tw = Math.min(before.width, after.width);
  const th = Math.min(before.height, after.height);
  // Trim a few pixels all round: some sources carry a white frame.
  const INSET = 8;
  const cutTop = Math.round((c.trimTop ?? 0) * th);
  const cutBottom = Math.round((c.trimBottom ?? 0) * th);
  const crop = (r) => ({
    left: r.left + Math.floor((r.width - tw) / 2) + INSET,
    top: r.top + Math.floor((r.height - th) / 2) + INSET + cutTop,
    width: tw - 2 * INSET,
    height: th - 2 * INSET - cutTop - cutBottom,
  });
  await sharp(SRC + c.file).extract(crop(before)).jpeg({ quality: 88, mozjpeg: true }).toFile(`${OUT}${c.id}-before.jpg`);
  await sharp(SRC + c.file).extract(crop(after)).jpeg({ quality: 88, mozjpeg: true }).toFile(`${OUT}${c.id}-after.jpg`);
  console.log(c.id.padEnd(18), `band ${a}-${b}`, `-> ${tw - 16}x${th - 16 - cutTop - cutBottom}`);
}
