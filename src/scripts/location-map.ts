// "Dove siamo": loads the interactive Google Map only when the visitor asks for it (consent by action),
// and offers a one-tap "copy the address". Without JS the section still gives the address and links to Google Maps.

const KEY = 'taddia-map-consent';

document.querySelectorAll<HTMLElement>('[data-map]').forEach((box) => {
  const button = box.querySelector<HTMLButtonElement>('[data-map-load]');
  if (!button) return;
  button.hidden = false;

  const load = (moveFocus: boolean) => {
    if (box.classList.contains('is-loaded')) return;
    const frame = document.createElement('iframe');
    frame.className = 'where__iframe';
    frame.title = box.dataset.title ?? 'Mappa';
    frame.src = box.dataset.src ?? '';
    frame.referrerPolicy = 'no-referrer-when-downgrade';
    frame.allowFullscreen = true;
    box.append(frame);
    box.classList.add('is-loaded');
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      /* storage blocked: the visitor is simply asked again on the next page */
    }
    if (moveFocus) frame.focus();
  };

  button.addEventListener('click', () => load(true));

  // Already agreed earlier in this visit (this tab only): load straight away.
  let agreed = false;
  try {
    agreed = sessionStorage.getItem(KEY) === '1';
  } catch {
    /* ignore */
  }
  if (agreed) load(false);
});

document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) => {
  if (!navigator.clipboard) return; // keep it hidden where copying is not possible
  btn.hidden = false;
  const label = btn.querySelector<HTMLElement>('[data-copy-label]')!;
  const status = btn.querySelector<HTMLElement>('[data-copy-status]')!;
  const original = label.textContent ?? '';
  let timer: number | undefined;

  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy ?? '');
      label.textContent = 'Indirizzo copiato';
      status.textContent = 'Indirizzo copiato negli appunti';
    } catch {
      label.textContent = 'Copia non riuscita';
      status.textContent = 'Non è stato possibile copiare l\'indirizzo';
    }
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      label.textContent = original;
      status.textContent = '';
    }, 2500);
  });
});
