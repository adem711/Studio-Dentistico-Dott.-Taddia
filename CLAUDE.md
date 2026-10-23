# Studio Dentistico Dott. Taddia — Website Rebuild

You are rebuilding the website of a dental clinic in Novara, Italy. The current site is https://dentistanovarataddia.it/ (WordPress + Elementor, built ~2021). All source material — screenshots of the old site, photos, video, clinical case images, contact details — is in this folder. **Inventory the folder first** (list every file, look at the images/screenshots) and summarise what you found before writing any code.

## Goals
1. A modern, fast, trustworthy site that makes it easy to **call** or **request an appointment** from a phone.
2. Keep (and improve) the clinic's local SEO for "dentista Novara".
3. Easy for a non-developer to update text, hours and photos later.

## Tech stack (default — ask before changing)
- **Astro** (static output) + **Tailwind CSS**. "Static" refers to how pages are built (pre-rendered HTML that loads instantly) — **not** to the look and feel. The site must feel alive and modern (see **Motion and interactivity**).
- Interactive components as Astro islands (Svelte or Preact preferred for their small size), hydrated only when needed (`client:visible` / `client:idle`). Avoid shipping a full React app.
- Animation: CSS first (transitions, scroll-driven animations, View Transitions). For richer sequences use a lightweight library such as Motion or GSAP, loaded only on the pages/sections that use it.
- Content (services, cases, reviews) in Markdown/JSON content collections so it can be edited without touching components.
- Images through Astro's `<Image>` (AVIF/WebP, responsive sizes, lazy loading). Compress the video; never autoplay with sound.
- Quality targets are in the **PageSpeed Insights** section below.

## Skills
You are allowed to use the Claude skills already installed in my global skills folder (`~/.claude/skills/`), plus any skills from plugins I have enabled.
- At the start, list the available skills and tell me which ones you plan to use for this project.
- Before each task, check whether an installed skill covers it (e.g. frontend/design, file and PDF reading for the material in this folder, image handling, testing, SEO, accessibility, Lighthouse/performance). If one fits, load its `SKILL.md` and follow it.
- If a skill's instructions conflict with this CLAUDE.md, this file wins — tell me about the conflict.
- Use only the skills already installed; don't download or install new skills or plugins without asking me first.

## Missing content: demo content and images
Don't stop because something is missing — keep building:
- **Images:** first use the files in this folder. If they're not enough, download images from the clinic's own live site (https://dentistanovarataddia.it/ — e.g. `/wp-content/uploads/`) and its Facebook page. For generic visuals (smiles, equipment, illustrations) use free-licence sources such as Unsplash or Pexels and record each source URL in `CREDITS.md`. Don't take images from other clinics' or third-party websites.
- **Text and info:** if a page needs copy or a detail you don't have (e.g. the doctor's bio, a treatment description, an FAQ), write realistic demo content in Italian, consistent with the clinic's real services.
- **Mark all demo content:** add a `{/* DEMO */}` comment in the source and list every item in `TODO-client.md` (page, what was invented, what the client must provide) so it can be replaced before launch.
- **Limits on demo content:** never invent patient reviews, prices, certifications, awards, staff names or clinical results; use clearly labelled placeholders for these instead (e.g. "Recensione di esempio — da sostituire"). Demo before/after photos must be stock images clearly marked as demo, never presented as the clinic's real cases.

## Language & tone
- Site language: **Italian** (`lang="it"`). Warm, reassuring, professional — the clinic's selling points are 40 years of experience, a family atmosphere, and explaining every step to anxious patients.
- Proofread everything. The old site has typos (e.g. "novata", "Perchè") — fix them, don't copy them.

## Clinic facts (verify against the files in this folder; ask me if anything conflicts)
- Name: Studio Dentistico Dott. Taddia
- Address: Corso XXIII Marzo 189, 28100 Novara (NO) — geo 45.43405, 8.63359
- Phone: +39 329 414 8444 (use a `tel:+393294148444` link everywhere)
- Hours: Mon–Fri 08:00–20:00, Sat–Sun closed
- Facebook: https://www.facebook.com/Dott.Taddia
- Footer legal line: "Delmastro Andrea – P.IVA 01531160024" (confirm with me that this is still correct)
- Google reviews: 67 reviews, rated "Eccellente" (as of the old site — refresh the number)
- Privacy policy is hosted on Iubenda: https://www.iubenda.com/privacy-policy/21348848

## Pages and URLs
Keep the existing URLs so Google rankings are not lost. Where the old site is inconsistent, pick one canonical URL and add **301 redirects** for the other.

| Page | Canonical URL | Notes |
|---|---|---|
| Home | `/` | |
| Servizi (overview) | `/servizi-dentali/` | |
| Igiene orale e sbiancamento | `/servizi-dentali/sbiancamento-dentale-a-novara/` | old alias: `/servizi/sbiancamento-dentale-a-novara/` |
| Conservativa | `/servizi-dentali/conservativa-odontoiatria-novara/` | alias `/servizi/...` |
| Endodonzia | `/servizi-dentali/endodonzia-novara/` | alias `/servizi/...` |
| Impianti e protesi | `/servizi-dentali/impianti-dentali-novara/` | alias `/servizi/...` |
| Ortodonzia tradizionale e invisibile | `/servizi-dentali/ortodonzia-novara/` | |
| Diagnosi ed esami radiografici | `/servizi-dentali/diagnosi-esami-radiografici-novara/` | alias `/servizi/...` |
| Casi clinici | `/servizi-dentali/casi-clinici/` | before/after gallery |
| Lo studio (gallery) | `/gallery-studio/` | |
| Recensioni | `/recensioni/` | |
| Contatti | `/contatti/` | |

Generate the redirect file for the hosting platform we choose (`_redirects` for Netlify/Cloudflare Pages, or `vercel.json`).

## Home page structure
1. **Hero**: clinic photo or short muted looping video, headline, "Aperto lun–ven 8–20", two CTAs: **Chiama ora** and **Richiedi un appuntamento**.
2. Trust strip: 40 years of experience, Google rating, family dentistry.
3. Services grid (6 cards → service pages).
4. About the doctor / the clinic: professionalism, continuous training, empathy, a shared and personalised treatment plan.
5. Selected clinical cases (link to full gallery).
6. Google reviews (see rules below).
7. Studio photo gallery.
8. Contacts: map, hours, phone, form.
- **Mobile**: sticky bottom bar with "Chiama" and "Prenota".
- The old site's animated counters show "0" — don't reproduce that bug; use static numbers.

## Contact form
- Fields: nome e cognome, telefono, email, messaggio, required privacy checkbox linking to the Iubenda policy.
- Static-friendly backend (Netlify Forms, Formspree or a small serverless function) — ask me which. Add honeypot spam protection.
- Clear success and error states in Italian.

## Compliance (Italy / EU) — important
- **Cookie banner** via Iubenda (or equivalent) that blocks non-essential scripts until consent. Load Google Maps and any review widget only after consent, or use a static map image that links to Google Maps.
- **Health advertising rules** (Italian law 145/2018, art. 1 c. 525): content for healthcare practices must be informative, not promotional or suggestive. Avoid claims like "il migliore dentista", superlatives, discount-style language. The old site's "prima visita e panoramica gratis/senza impegno" offer — **flag it to me** rather than featuring it prominently.
- **Clinical case photos**: only publish images for which the clinic has patient consent; crop/blur anything identifying. Ask me before using any face photo.
- **Reviews**: show real Google reviews only, unedited, with name and date, or embed a review widget. Never invent or rewrite testimonials. The ones on the old site are from 2021 — prefer fresher ones.
- Add the Iubenda privacy and cookie policy links in the footer.

## SEO
- Unique `<title>` and meta description per page, Italian, including "Novara".
- JSON-LD `Dentist` (LocalBusiness) schema with address, geo, phone, opening hours, sameAs (Facebook).
- Open Graph image (not the 350×59 logo the old site uses — make a proper 1200×630).
- `sitemap.xml`, `robots.txt`, canonical tags, descriptive Italian alt text (natural, not keyword-stuffed).

## PageSpeed Insights — all five categories
The site must score well in every category of https://pagespeed.web.dev/ on **mobile and desktop**. Targets: **100** in Performance, Accessibility, Best Practices and SEO (never below 95), and **all checks passing** in Agentic Browsing. During development run Lighthouse ≥ 13.3 locally on the built site (`npm run build && npm run preview`, then `npx lighthouse <url> --view` with mobile and `--preset=desktop`), fix every flagged issue, and save the final reports in `/reports`. After deploying, verify on pagespeed.web.dev.

**Performance**
- LCP < 2.5 s, CLS < 0.1 (aim for 0), INP < 200 ms, TBT ≈ 0.
- Hero image: preloaded, `fetchpriority="high"`, not lazy-loaded, correctly sized. All other images lazy-loaded with explicit `width`/`height`.
- Self-host fonts (WOFF2, subset, `font-display: swap`, preload only the main weight). At most 2 font families.
- Keep JavaScript lean: islands hydrate only when visible or idle, animation libraries load only where used and after the main content, no render-blocking scripts. Inline critical CSS; no render-blocking third-party scripts. Motion must never cost the Performance score — if an effect hurts it, simplify the effect. Load the map, review widget and cookie banner scripts lazily or only on interaction/consent.
- The hero video must not hurt LCP: use a poster image as the LCP element and load the video after page load.

**Accessibility** (WCAG 2.2 AA)
- One `<h1>` per page, logical heading order, semantic landmarks (`header`, `nav`, `main`, `footer`), skip link.
- Contrast ≥ 4.5:1, visible focus, tap targets ≥ 24×24 px, every form field with a `<label>`, accessible names on icon buttons and links, meaningful `alt` text, `lang="it"`.

**Best Practices**
- HTTPS, no console errors, no deprecated APIs, correct image aspect ratios, a strict Content-Security-Policy and security headers in the hosting config, no third-party cookies before consent.

**SEO**
- See the SEO section: titles, meta descriptions, canonicals, crawlable links with descriptive text, valid `robots.txt`, `sitemap.xml`, structured data that validates in Google's Rich Results Test.

**Agentic Browsing** (new in Lighthouse 13.3; checks how well AI agents can read and use the site)
- *Accessibility tree:* clean semantic HTML is what agents read — real `<button>`/`<a>`/`<form>` elements, no clickable `<div>`s, labelled controls, no content hidden from the accessibility tree.
- *llms.txt:* publish a valid `/llms.txt` (Markdown: H1 with the clinic name, a short summary, then sections of links to every page with one-line descriptions — services, contacts, hours). A broken llms.txt scores worse than none, so validate it and check every link resolves.
- *WebMCP:* expose the appointment-request form to agents as a WebMCP tool (e.g. "richiedi_appuntamento" with fields nome, telefono, email, messaggio). Check the current WebMCP spec and Lighthouse audit docs for the exact syntax before implementing; it must not change the form for human users.
- *Layout stability:* CLS must be 0 — reserve space for images, the cookie banner, embeds and fonts.

## Brand: logo kit and brand guidelines
The folder contains a **logo kit** and the clinic's **brand guidelines**. They are the source of truth for the visual identity — read them in full before proposing any design.
- **Colours and fonts:** take them from the brand guidelines (exact HEX/RGB values, primary/secondary/accent roles, typefaces and weights) and turn them into Tailwind theme tokens and CSS variables. Don't invent new brand colours; if you need extra shades (hover, borders, backgrounds), derive them from the brand colours and note them.
- **Logo usage:** follow the guidelines' rules on clear space, minimum size, allowed colour versions (full colour, monochrome, negative/white on dark) and what not to do (stretching, recolouring, effects). Pick the right version for each background.
- **Use the logo kit files** for: header and footer logo (SVG preferred, with correct `width`/`height`), favicon set (`favicon.ico`, `favicon.svg`, `apple-touch-icon.png` 180×180, `icon-192.png`/`icon-512.png` + `site.webmanifest`), the Open Graph image (1200×630), and the JSON-LD `logo`.
- **Fonts:** self-host the brand typefaces (WOFF2, subset) to meet the performance targets. If the guidelines use more than 2 families, or a font that can't be self-hosted or licensed for web, tell me and propose the closest compliant option.
- **Accessibility vs. brand:** if a brand colour combination fails WCAG AA contrast (e.g. text on the brand colour), keep the brand colour for backgrounds/accents and use an accessible text colour — tell me where you had to do this.
- **Conflicts:** where the brand guidelines and this file disagree on visual matters, the guidelines win; on performance, accessibility, compliance and SEO, this file wins. Report any conflict to me.

## Design direction
- **Not a static, boring template.** The site should feel premium, modern and alive — something the clinic is proud to show — while staying reassuring for anxious patients. Avoid the generic "dentist template" look (stock tooth icons, blue gradients, identical card grids).
- Applied through the brand guidelines above: bold typography, generous white space, confident use of the brand colours, layered layouts (overlapping images and text, asymmetric sections), large real photography.
- Real photos and video of the clinic over stock images.

## Motion and interactivity
Purposeful motion on every page, never decoration that slows things down:
- **Page transitions:** smooth transitions between pages with Astro View Transitions (e.g. the service card image morphing into the service page header).
- **Scroll experience:** sections and images reveal as you scroll (fade/slide/scale), subtle parallax on hero and photo sections, a sticky header that shrinks on scroll. Prefer CSS scroll-driven animations; fall back to IntersectionObserver.
- **Hero:** muted looping clinic video or slow Ken Burns on the photo, headline animating in, CTAs with lively hover/press states.
- **Micro-interactions:** hover effects on service cards (lift, image zoom, colour shift), animated buttons and links, animated icons, animated form feedback (field validation, success state).
- **Interactive components:**
  - **Before/after slider** for clinical cases (drag to compare; keyboard accessible, with an accessible range input).
  - **Studio gallery** with a lightbox and swipe on mobile.
  - **Services** explorer (e.g. tabs or an interactive tooth/mouth illustration linking to each treatment).
  - **FAQ accordion** on service pages (native `<details>` with animated open/close).
  - **"Aperto ora / Chiuso"** live badge based on the opening hours.
  - **Reviews carousel** (auto-play paused on hover/focus, with controls).
  - **Count-up numbers** in the trust strip that end on the real values (and show the real values without JS — never "0").
- **Rules:** animate only `transform` and `opacity` (no layout shift — CLS must stay 0); nothing animates the LCP element in a way that delays it; respect `prefers-reduced-motion` (turn off parallax, autoplay and large movements); every interactive component works with keyboard and screen readers and degrades gracefully without JS.
- Show me the motion concept (a short list of animations per section, or a prototype of the home hero) before applying it to the whole site.
- Accessible: WCAG AA contrast, visible focus states, keyboard navigable, `prefers-reduced-motion` respected.

## Working agreement
- Before building: inventory the folder, list the skills you'll use, summarise the brand guidelines (colours, fonts, logo rules), propose a sitemap + design direction based on them and wait for my OK.
- Build page by page; run the dev server and check each page at mobile (375px) and desktop widths.
- Keep a `TODO-client.md` listing anything that needs the clinic's confirmation (legal entity, current prices/offers, photo consents, fresh reviews, doctor bio) and every piece of demo content.
- A page is done only when Lighthouse passes the targets above for that page.
