import studio from '../data/studio.json';

/** wa.me link that opens a WhatsApp chat with the studio, with a pre-filled first message. */
export const whatsappHref = (message: string = studio.whatsappMessage) =>
  `https://wa.me/${studio.whatsappNumber}?text=${encodeURIComponent(message)}`;
