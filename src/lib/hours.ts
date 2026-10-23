import studio from '../data/studio.json';

type Slot = { days: number[]; open: string; close: string };

const NAMES = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const fmt = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return `${h}:${String(m).padStart(2, '0')}`;
};

/**
 * Turns the opening hours in src/data/studio.json into display rows, merging consecutive days with the same hours:
 * [{ label: "Lunedì – venerdì", value: "8:00 – 20:00" }, { label: "Sabato e domenica", value: "Chiuso" }]
 */
export function hoursRows(hours: Slot[] = studio.hours) {
  const week = [1, 2, 3, 4, 5, 6, 0]; // Monday first
  const perDay = week.map((d) => {
    const slot = hours.find((h) => h.days.includes(d));
    return { d, value: slot ? `${fmt(slot.open)} – ${fmt(slot.close)}` : 'Chiuso' };
  });

  const groups: { days: number[]; value: string }[] = [];
  for (const day of perDay) {
    const last = groups[groups.length - 1];
    if (last && last.value === day.value) last.days.push(day.d);
    else groups.push({ days: [day.d], value: day.value });
  }

  return groups.map((g) => {
    const first = cap(NAMES[g.days[0]]);
    const lastName = NAMES[g.days[g.days.length - 1]];
    const label =
      g.days.length === 1 ? first : g.days.length === 2 ? `${first} e ${lastName}` : `${first} – ${lastName}`;
    return { label, value: g.value };
  });
}
