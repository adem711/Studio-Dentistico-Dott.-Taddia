# TODO-client — things the clinic must confirm or provide

Status key: **OPEN** = waiting for the clinic · **DEFAULT** = I built with a safe default, change if told otherwise.
Every demo item in the source is marked `{/* DEMO */}`.

## 1. Facts to confirm

| # | Item | Status | Current default in the site |
|---|---|---|---|
| 1 | **Opening hours — Saturday.** Old page footer: Sat closed. Old JSON-LD and the Facebook hours panel: Sat 08:00–20:00. | OPEN | Mon–Fri 08:00–20:00, Sat–Sun closed (as in the brief). Edit once in `src/data/studio.json`. |
| 2 | **Legal line / titolare.** "Delmastro Andrea – P.IVA 01531160024". Who is the titolare? **The video introduces the speaker as "Dott.ssa Pamela Taddia"** (spoken and subtitled): confirm the full name and title, and whether she is "Dott. Taddia". | OPEN | Footer shows the legal line as on the old site. Her name is not written anywhere else on the site yet. |
| 3 | **Albo registration.** Ordine dei Medici Chirurghi e degli Odontoiatri di Novara — registration number; direttore sanitario if applicable; any mandatory notices. | OPEN | Not shown. |
| 4 | **Civic number / street name.** The clinic's official Google listing ("Dentista a Novara - Studio Dentistico Dott. Taddia", confirmed) gives the address as **"Via XXIII Marzo 1849, 189, 28100 Novara"**. The site says "Corso XXIII Marzo 189"; the video's title card says "189 E". Decide one wording and use it everywhere (site, Google, Facebook, Iubenda): matching addresses help local search. | OPEN | Site text unchanged: Corso XXIII Marzo 189. |
| 5 | **Map pin / coordinates**: brief 45.43405, 8.63359 vs old JSON-LD 45.43425, 8.63357 (≈22 m). | DONE (map) / OPEN (schema) | The interactive map now follows the official Google listing, so the pin is Google's own. The coordinates in the site's structured data are still the brief's: compare them with the Google pin when convenient. |
| 6 | **Contact email** for form requests (the old privacy policy lists a personal Gmail). | OPEN | No email shown; form delivery address to be set. |
| 7 | **"40 anni di esperienza"** — what does it refer to (the doctor's career? the studio?). **"1400 clienti all'anno"** (old counter) — still true? | OPEN | "40 anni" shown; 1400 not shown. |
| 8 | **Google rating and number of reviews.** Read from the official listing on 23/10/2026: **4,9 from 225 reviews** (the old widget said 67). | DONE (as of 23/10/2026) | Shown in the reviews badge, dated. Figures live in `src/data/reviews.json` (`rating`, `count`, `ratingAsOf`): refresh them now and then from the live listing, or set them to `null` to hide them. |
| 9 | **Accessible entrance / payments**: the published video says the studio is on the ground floor with a step-free entrance, and that payments can be spread over instalments, "anche senza finanziamento". These now appear on the site only inside the video. Confirm both are accurate and still true (payment terms are also a health-advertising point). | OPEN | Not stated in the page text; stated in the video. |
| 10 | **Domain & DNS** owner, and plan for switching off the old WordPress host. | OPEN | — |

## 2. Compliance decisions

| # | Item | Status | Default |
|---|---|---|---|
| 11 | **"Prima visita e panoramica gratis / senza impegno"** (old hero, meta description, contact page) and "preventivo". Law 145/2018 art. 1 c. 525: information must be informative, not promotional. | OPEN | Not featured anywhere. Form is "Richiedi un appuntamento". |
| 12 | **Logo payoff "Specialisti in ortodonzia per bambini e impiantologia."** Using "specialista" is regulated — confirm titles. **The video's opening title card shows this payoff, and the speaker says she works alongside "specialisti".** | OPEN | Logo without payoff in header, footer, OG image and JSON-LD. The payoff is visible in the first seconds of the published video. |
| 13 | **Superlatives in old copy** ("il migliore dentista", "risultati eccellenti", "L'eccellenza per le tue esigenze", "trattamenti prioritari senza costi aggiuntivi"). | DEFAULT | Rewritten in neutral, informative Italian. |
| 14 | **Patient reviews** that say "il migliore" / "hanno salvato la vita": may they be shown under the advertising rules? Reviews must be real, unedited, with name and an absolute date (the screenshots only have "il y a un mois"). | OPEN | No reviews published yet. |
| 15 | **Analytics.** Old site runs GTM `GTM-5QDTBDS` and GA4 `G-M2L2X5YKSB`; the Iubenda policy (28 Feb 2023) still lists Universal Analytics and Google Fonts. | DEFAULT | No analytics, no Google Fonts, static map image → no cookie banner needed. If analytics is wanted: add consent banner and regenerate the Iubenda policy. |
| 16 | **Iubenda policy** must be regenerated for the new site (access to the Iubenda account needed). The clinic's account has only a privacy policy (`…/21348848`, full text at `…/21348848/legal`); a separate cookie-policy page does not exist (`…/cookie-policy` returns 404). | OPEN | Footer links the privacy policy and the full text ("Informativa completa e cookie"). Add a real cookie-policy link if one is generated. |

## 3. Assets needed

| # | Item | Status | Notes |
|---|---|---|---|
| 17 | **Full-resolution studio photos** (surgery rooms, waiting room, X-ray unit, facade). | OPEN | Only ≤ 1000 px versions from the old site; the hero uses a 960 px square. Facade is a 244 px thumbnail. |
| 18 | **Photos and names of doctor / team**, bio, training. Written permission for any face photo. | OPEN | Doctor section will be a clearly labelled placeholder. The old "doctor" photo is stock and is not reused. |
| 19 | **Video `videoplayback.mp4`** (84 s, Dott.ssa Pamela Taddia presenting the studio, burned-in Italian subtitles, with audio). **PUBLISHED on the home page at your request** (section "Presentazione dello Studio Dentistico Taddia"). Still to confirm: the clinic's rights to the video, and consent of the person shown. | DONE (published); rights OPEN | Click-to-play, no autoplay, sound only if the visitor starts it. Poster and metadata load only when the visitor scrolls near it, so LCP is unaffected. Copy: `public/video/presentazione-studio.mp4` (fast-start remux of the original, not re-encoded); poster `public/video/video-poster.jpg`. **Accessibility gap:** the subtitles are burned into the picture; a separate WebVTT track and a transcript would be better for screen-reader users. |
| 20 | **Clinical cases**: patient consent for each of the 14 images; confirm all are the clinic's own work (cases 7–9 look stylistically different); which faces to crop/blur. Separate before/after originals if available (current files are stacked). | OPEN | Not published yet. |
| 21 | **Old stock images** (family hero, doctor with loupes, service-card photos): licence unknown. | DEFAULT | Not reused as the clinic's own. |

## 4. Demo content (replace before launch)

| Page | What was written | What the clinic must provide |
|---|---|---|
| Home — hero | Eyebrow, headline "Il sorriso di tutta la famiglia, in buone mani" (headline from the brand guidelines cover), lead text | Approval of wording |
| Home — trust strip | "Per tutta la famiglia", "Ogni passaggio spiegato" lines (paraphrased from the old site's "condivisione e personalizzazione del piano di trattamento") | Approval; rating/review count |
| Footer | One-line description of the studio | Approval |
| All pages — `<title>` / meta description | Drafted in Italian, include "Novara", no offers | Approval |

| Services (6 pages) | Page text is the clinic's own from the old site, proofread (typos fixed: "Sbiancamamento", "vien", "pare protesica", "in contro"), reorganised under headings, and toned down (removed "eccelso", "impeccabile", "incredibilmente resistenti"). **FAQ answers are drafted** from that text. | Approval of text and FAQs. Text on **adult and invisible (aligner) orthodontics**: the old page covers children only but the title says "tradizionale e invisibile". Confirm the radiation claim on the diagnosis page ("dosaggio più basso rispetto alle radiografie tradizionali"). |
| Services overview / casi clinici / gallery / reviews / contacts / 404 | Page intros, headings and CTA copy drafted | Approval of wording |
| Casi clinici | Case titles ("Caso 1 · Molare" …) are neutral placeholders; alt texts describe only what is visible | For each case: treatment performed and **written patient consent**. Disclaimer wording to approve. |
| Contact form | Field help texts, error/success messages, privacy checkbox wording | Approval; confirm "email facoltativa" |
| Reviews | Intro line and "Recensioni reali dei pazienti su Google" badge (no rating/count until confirmed) | See #14 and #29 |
| Location section ("Dove siamo") | Heading, consent text and button labels | Approval; see #30 and #36 |
| WhatsApp widget | Panel text (greeting, note) and the pre-filled first message | Approval; see #34 and #35 |
| Home — video | Section heading "Presentazione dello Studio Dentistico Taddia — Un tour guidato all'interno dei nostri spazi" (from the brief) and the note under the video | Approval; video rights and consent (#19) |
| Home — About | Paragraphs paraphrased from the old "La professionalità al tuo servizio" text; no doctor name or photo | Doctor/team details (#2, #18) |

## 4b. Assets added while building pages

| # | Item | Status | Notes |
|---|---|---|---|
| 26 | **Service images**: the 5 old-site stock images were **replaced** with Pexels photos (objects, models and hands, no faces): hygiene, composite restoration, endodontic model, implant model, clear aligner. The diagnosis page keeps the clinic's own X-ray unit photo. | DEFAULT | Pexels licence (free, no attribution required); credits in CREDITS.md. They are still demo/placeholder images: swap for the clinic's own photos when available. |
| 27 | **Clinical cases published on the site: 6** (close-up intraoral shots only, no faces). Held back: case images 2, 7, 8, 9 (faces), plus a lips-only shot, a beard shot and a branded whitening graphic. Which, if any, may be used, and with what face policy? | OPEN | Launch blocker until consent is confirmed. |
| 28 | ~~Stale files `src/assets/cases/diastema-*`, `sorriso-*`, `sbiancamento-*`~~ | **DONE — removed** | Deleted on request. The 12 remaining files in `src/assets/cases/` are the 6 published cases. |
| 29 | **Reviews: 4 shown**, verbatim, from the clinic's screenshots (Manjot Kaur, Chia Rich, Yunan Hu, joker funny). **No date is shown** (cards say "Recensione su Google"); the relative dates from the screenshots are kept only in `src/data/reviews.json`. The other 6 were left out: wording about prices, "il migliore", a health outcome, a staff first name, or text cut off. **The summary badge now shows the listing's real figures (4,9 from 225, dated 23/10/2026)**, not an average of the 4 shown. | OPEN | Provide absolute dates for the four reviews (`dateLabel` in `src/data/reviews.json`). CLAUDE.md asks for name and date on each review. |
| 30 | **Map (contact section, on /contatti/ and the home page).** An interactive **Google Map**, shown directly in the space under the contact details and beside the form, with rounded corners and "Indicazioni stradali", "Apri in Google Maps" and "Copia l'indirizzo" under it. It searches for the official listing's exact name ("Dentista a Novara - Studio Dentistico Dott. Taddia"), so Google selects that listing and shows its card (address, 4,9 ★, 225 reviews). | DEFAULT | **Compliance trade-off:** because the map is shown directly, Google is contacted and may set cookies as soon as the map is near the screen, with no consent step. CLAUDE.md asks for Google Maps only after consent. To bring the "Carica la mappa" consent step back, set `"mapRequiresConsent": true` in `src/data/studio.json` (tested, works). |
| 31 | **Video** — published, see #19. | DONE | |

## 5. Technical / operations

| # | Item | Status |
|---|---|---|
| 22 | Hosting: Netlify proposed (`_redirects`, `_headers` already generated). Confirm. | OPEN |
| 23 | Contact-form backend: Netlify Forms proposed. Confirm. | OPEN |
| 24 | Who edits the site later, and do they have a GitHub account (decides the CMS). | OPEN |
| 25 | After deploy: re-run PageSpeed Insights at pagespeed.web.dev (mobile + desktop). | OPEN |
| 32 | Netlify Forms: after the first deploy, set the notification email in the Netlify dashboard (Forms → appuntamento) and test a real submission. | OPEN |
| 33 | WebMCP is an origin-trial / flagged feature in Chrome; the form is already annotated and tested with the flag on. Nothing to do unless the clinic wants it removed. | DEFAULT |
| 34 | **WhatsApp.** The site now opens WhatsApp chats with +39 329 414 8444 (floating widget on every page, and wherever the bare number is a link). **Is that number active on WhatsApp**, and ideally on WhatsApp Business (opening hours, away message)? Who answers, and when? | OPEN | Number and pre-filled message ("Buongiorno, vorrei informazioni su un appuntamento. Scrivo dal sito.") live in `src/data/studio.json`. "Chiama" buttons stay `tel:` links. |
| 35 | **Privacy for WhatsApp.** A WhatsApp chat goes through Meta. Add it to the regenerated Iubenda policy, and decide how the studio handles health details sent by patients on WhatsApp (the widget and form already ask people not to send them). | OPEN | Widget text: "Non inviare dati sulla tua salute: ne parleremo in visita." |
| 36 | **Google Maps and privacy.** The map loads without a consent step (see #30), so Google receives the visitor's IP address and may set cookies. Either keep it (and say so clearly in the regenerated Iubenda policy, ideally with a cookie banner) or switch `mapRequiresConsent` on. | OPEN | Default: map shown directly, at the client's request. |
| 37 | **A second Google listing, "Dott. Agostino Taddia"**, sits at the same address (it also appeared in directory sites with "189/E"). The clinic confirmed "Dentista a Novara - Studio Dentistico" as the official one. Consider claiming/merging or removing the other listing in Google Business Profile, so patients and the map do not get two entries. | OPEN | Not something the site can fix. |
