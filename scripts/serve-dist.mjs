// Serves dist/ and applies the global header block from dist/_headers, so CSP can be tested locally.
// Usage: node scripts/serve-dist.mjs [port]
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { brotliCompressSync } from 'node:zlib';

const PORT = Number(process.argv[2] ?? 4322);
const DIST = 'dist';
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml',
  '.avif': 'image/avif', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2', '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json', '.mp4': 'video/mp4',
};

const globalHeaders = {};
const block = readFileSync(join(DIST, '_headers'), 'utf8').split(/\n\n/)[0].split('\n').slice(1);
for (const line of block) {
  const i = line.indexOf(':');
  if (i > 0) globalHeaders[line.slice(0, i).trim()] = line.slice(i + 1).trim();
}

createServer((req, res) => {
  // Stand-in for Netlify Forms: accept any POST. Add ?fail to the page URL to simulate an outage via header below.
  if (req.method === 'POST') {
    const fail = (req.headers.referer ?? '').includes('fail=1');
    req.resume();
    res.writeHead(fail ? 500 : 200, { ...globalHeaders, 'content-type': 'text/plain' });
    return res.end(fail ? 'error' : 'ok');
  }
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = join(DIST, p);
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  if (!existsSync(file)) {
    res.writeHead(404, { ...globalHeaders, 'content-type': 'text/plain' });
    return res.end('not found');
  }
  const type = types[extname(file)] ?? 'application/octet-stream';
  let body = readFileSync(file);
  const headers = { ...globalHeaders, 'content-type': type };
  // Mimic the production host: Brotli for text assets.
  if (/text|json|xml|svg|manifest/.test(type) && (req.headers['accept-encoding'] ?? '').includes('br')) {
    body = brotliCompressSync(body);
    headers['content-encoding'] = 'br';
    headers['vary'] = 'Accept-Encoding';
  }
  const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range ?? '');
  if (range && !headers['content-encoding']) {
    const start = range[1] ? Number(range[1]) : 0;
    const end = range[2] ? Math.min(Number(range[2]), body.length - 1) : body.length - 1;
    res.writeHead(206, { ...headers, 'accept-ranges': 'bytes', 'content-range': `bytes ${start}-${end}/${body.length}`, 'content-length': end - start + 1 });
    return res.end(body.subarray(start, end + 1));
  }
  res.writeHead(200, { ...headers, 'accept-ranges': 'bytes' });
  res.end(body);
}).listen(PORT, () => console.log(`serving dist on http://localhost:${PORT}`));
