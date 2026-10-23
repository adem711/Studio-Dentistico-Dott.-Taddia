// Scroll-snap carousel with prev/next, progress dots and a pause control.
// Without JS it is a plain horizontally scrollable list.
// Auto-play (WCAG 2.2.2): off for prefers-reduced-motion, paused on hover and focus, and while off screen.

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll<HTMLElement>('[data-carousel]').forEach((root) => {
  const track = root.querySelector<HTMLElement>('.carousel__track')!;
  const bar = root.querySelector<HTMLElement>('.carousel__bar')!;
  const prev = root.querySelector<HTMLButtonElement>('[data-carousel-prev]')!;
  const next = root.querySelector<HTMLButtonElement>('[data-carousel-next]')!;
  const toggle = root.querySelector<HTMLButtonElement>('[data-carousel-toggle]')!;
  const dots = [...root.querySelectorAll<HTMLButtonElement>('[data-carousel-dot]')];
  const cards = [...track.children] as HTMLElement[];
  const interval = Number(root.dataset.interval ?? 7000);
  const behavior: ScrollBehavior = reduceMotion ? 'auto' : 'smooth';

  bar.hidden = false;

  const step = () => {
    const first = cards[0];
    return first ? first.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || '16') : track.clientWidth;
  };
  const atEnd = () => track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
  const go = (dir: 1 | -1) => {
    if (dir === 1 && atEnd()) track.scrollTo({ left: 0, behavior });
    else if (dir === -1 && track.scrollLeft <= 4) track.scrollTo({ left: track.scrollWidth, behavior });
    else track.scrollBy({ left: dir * step(), behavior });
  };
  prev.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));

  // Progress dots: the active dot follows the scroll position; clicking a dot scrolls to that card.
  const updateDots = () => {
    const index = atEnd() ? cards.length - 1 : Math.round(track.scrollLeft / step());
    dots.forEach((d, i) => (i === index ? d.setAttribute('aria-current', 'true') : d.removeAttribute('aria-current')));
  };
  let ticking = false;
  track.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateDots();
        ticking = false;
      });
    },
    { passive: true },
  );
  dots.forEach((dot, i) =>
    dot.addEventListener('click', () => track.scrollTo({ left: Math.min(cards[i].offsetLeft - cards[0].offsetLeft, track.scrollWidth), behavior })),
  );
  window.addEventListener('resize', updateDots);
  updateDots();

  // Auto-play
  let userPaused = reduceMotion;
  let hovering = false;
  let focused = false;
  let visible = false;
  let timer: number | undefined;

  const syncToggle = () => {
    toggle.setAttribute('aria-pressed', String(userPaused));
    toggle.setAttribute(
      'aria-label',
      userPaused ? 'Riprendi lo scorrimento automatico' : 'Metti in pausa lo scorrimento automatico',
    );
  };
  const restart = () => {
    window.clearInterval(timer);
    if (!userPaused && !hovering && !focused && visible) timer = window.setInterval(() => go(1), interval);
  };

  toggle.addEventListener('click', () => {
    userPaused = !userPaused;
    syncToggle();
    restart();
  });
  root.addEventListener('mouseenter', () => ((hovering = true), restart()));
  root.addEventListener('mouseleave', () => ((hovering = false), restart()));
  root.addEventListener('focusin', () => ((focused = true), restart()));
  root.addEventListener('focusout', () => ((focused = false), restart()));

  new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      restart();
    },
    { threshold: 0.4 },
  ).observe(root);

  syncToggle();
});
