// Small progressive enhancements. Every feature has a complete no-JS state in the HTML.

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- "Aperto ora / Chiuso" badge (Europe/Rome) ---------- */
type Slot = { days: number[]; open: string; close: string };

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};
const fmt = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return m ? `${h}:${String(m).padStart(2, '0')}` : `${h}:00`;
};
const DAY_NAMES = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];

function romeNow() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Rome',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}

function updateOpenNow(el: HTMLElement) {
  const slots: Slot[] = JSON.parse(el.dataset.hours ?? '[]');
  const label = el.querySelector<HTMLElement>('[data-open-label]');
  if (!slots.length || !label) return;
  const { day, minutes } = romeNow();
  const today = slots.find((s) => s.days.includes(day));

  if (today && minutes >= toMinutes(today.open) && minutes < toMinutes(today.close)) {
    el.dataset.state = 'open';
    label.textContent = `Aperto ora · fino alle ${fmt(today.close)}`;
    return;
  }
  el.dataset.state = 'closed';
  if (today && minutes < toMinutes(today.open)) {
    label.textContent = `Chiuso ora · apre oggi alle ${fmt(today.open)}`;
    return;
  }
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    const next = slots.find((s) => s.days.includes(d));
    if (next) {
      label.textContent = `Chiuso ora · riapre ${i === 1 ? 'domani' : DAY_NAMES[d]} alle ${fmt(next.open)}`;
      return;
    }
  }
}

document.querySelectorAll<HTMLElement>('[data-open-now]').forEach((el) => {
  updateOpenNow(el);
  window.setInterval(() => updateOpenNow(el), 60_000);
});

/* ---------- Count-up: the HTML already holds the real value ---------- */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

function countUp(el: HTMLElement) {
  const target = Number(el.dataset.countup);
  if (!Number.isFinite(target)) return;
  const duration = 1400;
  const start = performance.now();
  const tick = (now: number) => {
    const t = Math.min((now - start) / duration, 1);
    el.textContent = String(Math.round(target * easeOut(t)));
    if (t < 1) requestAnimationFrame(tick);
    else el.textContent = String(target);
  };
  el.textContent = '0';
  requestAnimationFrame(tick);
}

const counters = document.querySelectorAll<HTMLElement>('[data-countup]');
if (counters.length && !reduceMotion && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          countUp(e.target as HTMLElement);
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.6 },
  );
  counters.forEach((c) => io.observe(c));
}

/* ---------- Scroll reveal fallback (browsers without CSS scroll-driven animations) ---------- */
if (!CSS.supports('animation-timeline: view()') && !reduceMotion && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px' },
  );
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
} else if (reduceMotion) {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
}
