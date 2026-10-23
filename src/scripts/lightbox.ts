// Gallery lightbox on a native <dialog>. Without JS the thumbnails are plain links to the large image.
// Keys: Esc closes (native), ← → navigate. Touch: swipe left/right on the image.

document.querySelectorAll<HTMLElement>('[data-lightbox]').forEach((root) => {
  const dialog = root.querySelector<HTMLDialogElement>('dialog')!;
  const img = dialog.querySelector<HTMLImageElement>('.lb__img')!;
  const cap = dialog.querySelector<HTMLElement>('.lb__cap')!;
  const items = [...root.querySelectorAll<HTMLAnchorElement>('[data-lightbox-item]')];
  let index = 0;

  const show = (i: number) => {
    index = (i + items.length) % items.length;
    const a = items[index];
    img.src = a.href;
    img.alt = a.dataset.alt ?? '';
    img.width = Number(a.dataset.w) || 960;
    img.height = Number(a.dataset.h) || 960;
    cap.textContent = `${a.dataset.alt ?? ''} (${index + 1} di ${items.length})`;
  };

  items.forEach((a, i) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      show(i);
      dialog.showModal();
    });
  });

  dialog.querySelector('[data-lb-close]')!.addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-lb-prev]')!.addEventListener('click', () => show(index - 1));
  dialog.querySelector('[data-lb-next]')!.addEventListener('click', () => show(index + 1));

  // Click on the dark backdrop closes.
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });

  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });

  // Swipe
  let startX = 0;
  let tracking = false;
  const figure = dialog.querySelector<HTMLElement>('.lb__figure')!;
  figure.addEventListener('pointerdown', (e) => {
    startX = e.clientX;
    tracking = true;
  });
  figure.addEventListener('pointerup', (e) => {
    if (!tracking) return;
    tracking = false;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
  });
  figure.addEventListener('pointercancel', () => (tracking = false));
});
