// After `astro build`: writes the hosting config with a strict Content-Security-Policy:
//   - dist/_headers  (Netlify / Cloudflare Pages)
//   - vercel.json    (Vercel) in the project root, with headers, caching and the 301 redirects from public/_redirects.
// Vercel reads vercel.json from the repository, so COMMIT the regenerated vercel.json after any change that alters the
// inline CSS or scripts (the CSP lists their hashes).
// Inline <style> and <script> blocks (Astro inlines small CSS/JS) are allowed by SHA-256 hash, not by 'unsafe-inline'.
// JSON-LD blocks are data, not executable, so they need no hash.
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';

function* walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (p.endsWith('.html')) yield p;
  }
}

const styleHashes = new Set();
const scriptHashes = new Set();
const sha = (s) => `'sha256-${createHash('sha256').update(s).digest('base64')}'`;

for (const file of walk(DIST)) {
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(/<style(?:\s[^>]*)?>([\s\S]*?)<\/style>/g)) styleHashes.add(sha(m[1]));
  for (const m of html.matchAll(/<script(\s[^>]*)?>([\s\S]*?)<\/script>/g)) {
    const attrs = m[1] ?? '';
    if (/type="application\/ld\+json"/.test(attrs) || /\ssrc=/.test(attrs)) continue;
    scriptHashes.add(sha(m[2]));
  }
}

const csp = [
  "default-src 'self'",
  `script-src 'self' ${[...scriptHashes].join(' ')}`.trim(),
  `style-src 'self' ${[...styleHashes].join(' ')}`.trim(),
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "media-src 'self'",
  'frame-src https://www.google.com',
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
  ['Content-Security-Policy', csp],
  ['Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload'],
  ['X-Content-Type-Options', 'nosniff'],
  ['Referrer-Policy', 'strict-origin-when-cross-origin'],
  ['Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), interest-cohort=()'],
  ['Cross-Origin-Opener-Policy', 'same-origin'],
  ['Cross-Origin-Resource-Policy', 'same-origin'],
];
const cacheRules = [
  ['/_astro/*', 'public, max-age=31536000, immutable'],
  ['/fonts/*', 'public, max-age=31536000, immutable'],
  ['/video/*', 'public, max-age=604800'],
];

// ---- Netlify / Cloudflare Pages ----
const NL = '\n';
const netlify =
  `/*${NL}${securityHeaders.map(([k, v]) => `  ${k}: ${v}`).join(NL)}${NL}${NL}` +
  cacheRules.map(([path, v]) => `${path}${NL}  Cache-Control: ${v}${NL}`).join(NL) +
  `${NL}/*.html${NL}  Cache-Control: public, max-age=0, must-revalidate${NL}`;
writeFileSync(join(DIST, '_headers'), netlify);

// ---- Vercel ----
// Redirects come from public/_redirects ("from to status" per line), so there is a single list to maintain.
const redirects = readFileSync('public/_redirects', 'utf8')
  .split(NL)
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith('#'))
  .map((line) => {
    const [source, destination, status] = line.split(/\s+/);
    return { source, destination, statusCode: Number(status) || 301 };
  });

const vercel = {
  $schema: 'https://openapi.vercel.sh/vercel.json',
  trailingSlash: true,
  redirects,
  headers: [
    { source: '/(.*)', headers: securityHeaders.map(([key, value]) => ({ key, value })) },
    ...cacheRules.map(([path, value]) => ({
      source: path.replace('/*', '/(.*)'),
      headers: [{ key: 'Cache-Control', value }],
    })),
  ],
};
// Generated file: do not edit by hand (run `npm run build`).
writeFileSync('vercel.json', JSON.stringify(vercel, null, 2) + NL);

console.log(
  `dist/_headers and vercel.json written (${scriptHashes.size} script hashes, ${styleHashes.size} style hashes, ${redirects.length} redirects)`,
);
