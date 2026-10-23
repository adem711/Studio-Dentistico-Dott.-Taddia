// Prints category scores and every failing audit from a Lighthouse JSON report.
import { readFileSync } from 'node:fs';
const r = JSON.parse(readFileSync(process.argv[2], 'utf8'));
console.log('Lighthouse', r.lighthouseVersion, '|', r.configSettings.formFactor, '|', r.finalDisplayedUrl);
for (const [k, c] of Object.entries(r.categories)) {
  const pass = c.score === null ? 'n/a' : Math.round(c.score * 100);
  console.log(`  ${k}: ${pass}`);
}
const m = r.audits;
const metric = (id) => m[id]?.displayValue;
console.log('  FCP', metric('first-contentful-paint'), '| LCP', metric('largest-contentful-paint'), '| TBT', metric('total-blocking-time'), '| CLS', metric('cumulative-layout-shift'), '| SI', metric('speed-index'));
for (const c of Object.values(r.categories)) {
  for (const ref of c.auditRefs) {
    const a = m[ref.id];
    if (a.score !== null && a.score < 1 && a.scoreDisplayMode !== 'informative' && a.scoreDisplayMode !== 'notApplicable' && ref.weight !== 0 || (c.id === 'agentic-browsing' && a.score !== null && a.score < 1)) {
      console.log(`  ✗ [${c.id}] ${a.id}: ${a.title} (${a.displayValue ?? ''})`);
    }
  }
}
