import type { ImageMetadata } from 'astro';
import operativa from '../assets/studio/studio-sala-operativa.jpg';
import attesa from '../assets/studio/studio-sala-attesa.jpg';
import ortopantomografo from '../assets/studio/studio-ortopantomografo.jpg';
import luminosa from '../assets/studio/studio-sala-luminosa.jpg';

export interface StudioPhoto {
  id: string;
  src: ImageMetadata;
  alt: string;
}

// The clinic's own photos (from dentistanovarataddia.it). Higher-resolution originals requested: TODO-client.md #17.
export const studioPhotos: StudioPhoto[] = [
  {
    id: 'sala-operativa',
    src: operativa,
    alt: 'Sala operativa con poltrona odontoiatrica, lampada e mobili bianchi, in un ambiente luminoso',
  },
  {
    id: 'sala-attesa',
    src: attesa,
    alt: "Sala d'attesa con una fila di sedie bianche lungo la parete e una porta in fondo",
  },
  {
    id: 'ortopantomografo',
    src: ortopantomografo,
    alt: "L'ortopantomografo digitale dello studio, appoggiato alla parete bianca",
  },
  {
    id: 'sala-luminosa',
    src: luminosa,
    alt: 'Seconda sala operativa con ampie finestre, poltrona, strumenti e un computer sullo sfondo',
  },
];
