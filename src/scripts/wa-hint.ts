// WhatsApp greeting bubble: dismissible, and it stays away for the rest of the visit (this browser tab only).
const KEY = 'taddia-wa-hint-dismissed';

const hint = document.querySelector<HTMLElement>('[data-wa-hint]');

if (hint) {
  const dismiss = () => {
    hint.hidden = true;
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      /* storage can be blocked: the bubble then simply returns on the next page */
    }
  };

  let already = false;
  try {
    already = sessionStorage.getItem(KEY) === '1';
  } catch {
    /* ignore */
  }
  if (already) hint.hidden = true;

  hint.querySelector('[data-wa-hint-close]')?.addEventListener('click', dismiss);
  // Opening the chat panel also counts as having seen the suggestion.
  document.getElementById('wa-panel')?.addEventListener('toggle', (e) => {
    if ((e as Event & { newState?: string }).newState === 'open') dismiss();
  });
}
