import type { APIRoute } from 'astro';
import studio from '../data/studio.json';
import { getServices } from '../lib/services';
import { hoursRows } from '../lib/hours';
import { SITE } from '../lib/schema';
import { whatsappHref } from '../lib/contact';

// /llms.txt: a Markdown overview for AI agents, built from the same data as the site so it never goes stale.
// Format: https://llmstxt.org/ (H1, a blockquote summary, then sections of links with one-line descriptions).
export const GET: APIRoute = async () => {
  const services = await getServices();
  const url = (path: string) => `${SITE}${path}`;
  const hours = hoursRows()
    .map((r) => `${r.label}: ${r.value}`)
    .join('; ');

  const lines = [
    `# ${studio.name}`,
    '',
    `> Studio dentistico a ${studio.address.city} per adulti e bambini: igiene orale e sbiancamento, conservativa, endodonzia, impianti e protesi, ortodonzia, diagnosi ed esami radiografici. Sito in italiano.`,
    '',
    `- Indirizzo: ${studio.address.street}, ${studio.address.postalCode} ${studio.address.city} (${studio.address.province})`,
    `- Telefono: ${studio.phone}`,
    `- WhatsApp: ${whatsappHref()}`,
    `- Orari: ${hours}`,
    '',
    '## Servizi',
    '',
    `- [Servizi dentali](${url('/servizi-dentali/')}): panoramica di tutti i servizi dello studio`,
    ...services.map((s) => `- [${s.data.title}](${url(`/servizi-dentali/${s.id}/`)}): ${s.data.summary}`),
    `- [Casi clinici](${url('/servizi-dentali/casi-clinici/')}): confronti prima e dopo di alcuni trattamenti`,
    '',
    '## Lo studio e i contatti',
    '',
    `- [Home](${url('/')}): presentazione dello studio, servizi, recensioni e contatti`,
    `- [Lo studio](${url('/gallery-studio/')}): fotografie degli ambienti e della strumentazione`,
    `- [Recensioni](${url('/recensioni/')}): recensioni dei pazienti pubblicate su Google`,
    `- [Contatti e appuntamenti](${url('/contatti/')}): indirizzo, orari, mappa e modulo per richiedere un appuntamento`,
    '',
    '## Privacy',
    '',
    `- [Informativa sulla privacy](${studio.privacyUrl}): trattamento dei dati personali`,
    `- [Informativa completa e cookie](${studio.privacyFullUrl}): testo completo dell'informativa, con le informazioni sui cookie`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
