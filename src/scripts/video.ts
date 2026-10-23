// Studio video: the native <video controls> works on its own. With JS, a play button sits over the poster
// and hides once playback starts. Nothing autoplays and the sound is never turned on for the visitor.
//
// The poster and the video metadata are only requested when the visitor scrolls near the section, so they never
// compete with the hero image for bandwidth (the video must not hurt LCP). Without JS the video still plays from
// its native controls, without a poster.

document.querySelectorAll<HTMLElement>('[data-video]').forEach((root) => {
  const video = root.querySelector<HTMLVideoElement>('video')!;
  const button = root.querySelector<HTMLButtonElement>('.video__play')!;

  button.hidden = false;

  const prepare = () => {
    if (video.dataset.poster) video.poster = video.dataset.poster;
    video.preload = 'metadata';
  };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          prepare();
          io.disconnect();
        }
      },
      { rootMargin: '700px 0px' },
    );
    io.observe(root);
  } else {
    prepare();
  }

  button.addEventListener('click', () => {
    prepare();
    void video.play();
    video.focus();
  });
  video.addEventListener('play', () => (button.hidden = true));
  video.addEventListener('ended', () => (button.hidden = false));
});
