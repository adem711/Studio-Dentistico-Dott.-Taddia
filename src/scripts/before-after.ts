// Before/after slider: the <input type="range"> is the control; this mirrors its value into the --pos CSS variable.
document.querySelectorAll<HTMLElement>('[data-before-after]').forEach((root) => {
  const range = root.querySelector<HTMLInputElement>('.ba__range');
  if (!range) return;
  const update = () => {
    root.style.setProperty('--pos', `${range.value}%`);
    range.setAttribute('aria-valuetext', `Prima ${range.value}%, dopo ${100 - Number(range.value)}%`);
  };
  range.addEventListener('input', update);
  update();
});
