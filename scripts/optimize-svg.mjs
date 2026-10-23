// Rounds path coordinates to 1 decimal. Shapes are unchanged at any display size we use.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
const dir = 'src/assets/brand/';
for (const f of readdirSync(dir).filter((f) => f.endsWith('.svg'))) {
  const s = readFileSync(dir + f, 'utf8');
  const out = s.replace(/ d="([^"]+)"/g, (_, d) =>
    ' d="' + d.replace(/-?\d*\.\d+/g, (n) => String(Math.round(parseFloat(n) * 10) / 10)) + '"');
  writeFileSync(dir + f, out);
  console.log(f, s.length, '->', out.length);
}
