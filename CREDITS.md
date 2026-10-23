# Credits

## Images
| File | Source | Notes |
|---|---|---|
| `src/assets/studio/studio-sala-operativa.jpg`, `studio-sala-attesa.jpg`, `studio-ortopantomografo.jpg`, `studio-sala-luminosa.jpg` | The clinic's own website, https://dentistanovarataddia.it/wp-content/uploads/2021/12/ (`dentista-novara-taddia-1/-2/-4/-5.jpg`) | Studio photos. Higher-resolution originals requested (see TODO-client.md #17). |
| `Brand info/Work/*` | Supplied by the clinic (Facebook posts and the old gallery) | Clinical cases — not published until patient consent is confirmed. |
| `src/assets/services/sbiancamento.jpg` | [Pexels #3958092](https://www.pexels.com/photo/3958092/) by Polina Zimmerman | Pexels licence (free to use, no attribution required). Demo/placeholder image: replace with the clinic's own photo. |
| `src/assets/services/conservativa.jpg` | [Pexels #7800681](https://www.pexels.com/photo/7800681/) by Nadezhda Moryak | Pexels licence. Demo/placeholder. |
| `src/assets/services/endodonzia.jpg` | [Pexels #4971514](https://www.pexels.com/photo/4971514/) by Gustavo Fring | Pexels licence. Demo/placeholder. |
| `src/assets/services/impianti.jpg` | [Pexels #6502305](https://www.pexels.com/photo/6502305/) by cottonbro studio | Pexels licence. Demo/placeholder. |
| `src/assets/services/ortodonzia.jpg` | [Pexels #10896051](https://www.pexels.com/photo/10896051/) by Victor Castardo | Pexels licence. Demo/placeholder. |
| `src/assets/services/diagnosi.jpg` | The clinic's own website (`dentista-novara-taddia-4.jpg`) | The clinic's own X-ray unit photo; same file as the studio gallery. |
| `src/assets/cases/*` | Derived from the clinic's case images in `Brand info/Work/` | Split into before/after halves by `scripts/split-cases.mjs`. |
| `src/assets/map.jpg` | Map tiles © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright), licensed ODbL | Built once by `scripts/make-map.mjs`; attribution shown under the map. |

The five Pexels images above were downloaded at 1600 px and cropped to squares by `scripts/crop-stock.mjs`. They were chosen to show objects, models and hands rather than people. Any other stock image added later is listed here with its source URL and licence, and marked as demo in the page.

## Logo, favicon, brand
Supplied by the clinic in `Brand info/Taddia Logo Kit/` and `Brand info/Taddia Brand Guidelines/`. SVGs were stripped of embedded C2PA metadata and path coordinates rounded to one decimal; shapes are unchanged.

## Fonts
**Fira Sans** (Latin subset, weights 300/400/500/600), SIL Open Font License 1.1. Self-hosted from `@fontsource/fira-sans`; licence text in `public/fonts/OFL-FiraSans.txt`.

## Icons
Shapes adapted from [Feather icons](https://feathericons.com/) (MIT), drawn inline in `src/components/Icon.astro`. The WhatsApp icon is a speech bubble (Feather "message-circle") with a handset (Feather "phone") inside: a generic chat symbol, not WhatsApp's own logo.
