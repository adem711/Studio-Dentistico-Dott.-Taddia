# Studio Dentistico Dott. Taddia — sito web

Sito statico del Studio Dentistico Dott. Taddia, Corso XXIII Marzo 189, Novara.
Astro 7 (output statico) + Tailwind CSS 4. Nessun framework JavaScript: le parti interattive sono piccoli script e CSS nativo.

> The project brief is [CLAUDE.md](CLAUDE.md). Everything that needs the clinic's confirmation (facts, consents, demo content) is tracked in [TODO-client.md](TODO-client.md). Image and font credits are in [CREDITS.md](CREDITS.md).

## Commands

| Command | What it does |
|---|---|
| `npm install` | Install dependencies (Node 22.23+ required) |
| `npm run dev` | Dev server at http://localhost:4321 |
| `npm run build` | Build to `dist/` **and** regenerate `vercel.json` and `dist/_headers` |
| `npm run preview` | Preview the build |
| `node scripts/serve-dist.mjs 4323` | Serve `dist/` with the production security headers and Brotli (for testing the CSP) |
| `bash scripts/lighthouse-all.sh mobile` (or `desktop`) | Lighthouse on every page; reports go to `reports/` |

## Where things are

- `src/data/studio.json` — phone, address, opening hours, WhatsApp number and message, map switch. Change a detail here and it updates everywhere (header, footer, structured data, `llms.txt`).
- `src/content/services/*.md` — the six service pages (text, FAQ, image).
- `src/data/reviews.json` — Google reviews and the rating shown in the badge (with its date).
- `src/data/cases.ts` — clinical cases (before/after).
- `src/components/Container.astro` — the boxed layout every section uses (content up to 1520 px, gutters 20/32/48 px). Don't use the Tailwind class `container`.
- `src/styles/global.css` — brand tokens (colours, Fira Sans), buttons, type scale.
- `public/_redirects` — the 301 redirects (the single list; `vercel.json` is generated from it).

## Deploying on Vercel

1. Import the repository in Vercel. Framework preset: **Astro**. Build command: `npm run build`. Output directory: `dist`.
2. **`vercel.json` is generated** by `npm run build` (security headers incl. the Content-Security-Policy, caching, the 20 redirects). Vercel reads it from the repository, so after any change to CSS or inline scripts run `npm run build` locally and **commit the updated `vercel.json`**. A stale file makes the CSP block the page's own inline styles.
3. **The contact form does not work on Vercel yet.** It is written for Netlify Forms (`data-netlify`). On Vercel the submit shows the "Non siamo riusciti a inviare…" message with the phone number. It needs a backend (a Vercel function that sends an email, or a form service such as Formspree) and the clinic's email address.
4. Google Maps is embedded directly. To make it load only after a click ("Carica la mappa"), set `"mapRequiresConsent": true` in `src/data/studio.json`.

## Not in this repository

`Brand info/Work/`, `Brand info/Screenshots/` and `Brand info/Video/` (original photos, screenshots and video supplied by the clinic) are kept out on purpose: this repository is public and they include patient photos and other people's names and pictures. The images the site actually uses are in `src/assets/` and `public/`.
