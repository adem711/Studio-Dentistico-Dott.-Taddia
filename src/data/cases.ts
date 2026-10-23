import type { ImageMetadata } from 'astro';
import molareBefore from '../assets/cases/molare-before.jpg';
import molareAfter from '../assets/cases/molare-after.jpg';
import gengivaBefore from '../assets/cases/gengiva-before.jpg';
import gengivaAfter from '../assets/cases/gengiva-after.jpg';
import incisiviBefore from '../assets/cases/incisivi-before.jpg';
import incisiviAfter from '../assets/cases/incisivi-after.jpg';
import restauroBefore from '../assets/cases/restauro-frontale-before.jpg';
import restauroAfter from '../assets/cases/restauro-frontale-after.jpg';
import allineamentoBefore from '../assets/cases/allineamento-before.jpg';
import allineamentoAfter from '../assets/cases/allineamento-after.jpg';
import faccetteBefore from '../assets/cases/faccette-before.jpg';
import faccetteAfter from '../assets/cases/faccette-after.jpg';

export interface ClinicalCase {
  id: string;
  /** Visible heading. DEMO: replace with the clinic's own treatment description. */
  title: string;
  /** Describes only what the two photos visibly show. */
  alt: string;
  before: ImageMetadata;
  after: ImageMetadata;
  /** Crop anchor inside the fixed 16:10 frame. */
  focus?: 'left' | 'center' | 'right' | 'top';
}

// DEMO: titles are neutral placeholders. The clinic must supply, for each case, the treatment performed
// and written patient consent (see TODO-client.md). Images: the clinic's own gallery, close-up intraoral
// shots only, no faces.
export const cases: ClinicalCase[] = [
  {
    id: 'molare',
    title: 'Caso 1 · Molare',
    alt: 'Molare con un\'otturazione metallica scura prima del trattamento e con un restauro del colore del dente dopo',
    before: molareBefore,
    after: molareAfter,
    focus: 'left',
  },
  {
    id: 'restauro-frontale',
    title: 'Caso 2 · Denti anteriori',
    alt: 'Denti anteriori scheggiati e con segni di carie prima del trattamento, ricostruiti dopo',
    before: restauroBefore,
    after: restauroAfter,
  },
  {
    id: 'faccette',
    title: 'Caso 3 · Faccette',
    alt: 'Denti anteriori scheggiati e macchiati senza faccette, e con le faccette applicate',
    before: faccetteBefore,
    after: faccetteAfter,
  },
  {
    id: 'allineamento',
    title: 'Caso 4 · Allineamento',
    alt: 'Denti disallineati prima del trattamento ortodontico e allineati dopo',
    before: allineamentoBefore,
    after: allineamentoAfter,
  },
  {
    id: 'incisivi',
    title: 'Caso 5 · Incisivi',
    alt: 'Incisivi superiori visti da vicino, prima e dopo il trattamento',
    before: incisiviBefore,
    after: incisiviAfter,
  },
  {
    id: 'gengiva',
    title: 'Caso 6 · Denti e gengiva',
    alt: 'Denti anteriori superiori e gengiva visti di lato, prima e dopo il trattamento',
    before: gengivaBefore,
    after: gengivaAfter,
  },
];
