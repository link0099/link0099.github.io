document.querySelectorAll('.project-gallery').forEach(gallery => {
  const slides = Array.from(gallery.querySelectorAll('figure'));
  const caption = gallery.querySelector('.gallery-caption');
  const visual = gallery.querySelector('.visual');
  let active = 0;
  function move(step) {
    slides[active].hidden = true;
    active = (active + step + slides.length) % slides.length;
    slides[active].hidden = false;
    caption.textContent = (active + 1) + ' / ' + slides.length + ' · ' + slides[active].getAttribute('aria-label');
  }
  gallery.querySelectorAll('[data-step]').forEach(button => {
    button.addEventListener('click', () => move(Number(button.dataset.step)));
  });
  gallery.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    move(event.key === 'ArrowRight' ? 1 : -1);
  });
  let start;
  visual.addEventListener('touchstart', event => {
    start = event.touches.length === 1 ? event.touches[0] : null;
  }, {passive: true});
  visual.addEventListener('touchcancel', () => { start = null; });
  visual.addEventListener('touchend', event => {
    if (!start) return;
    const end = event.changedTouches[0];
    const dx = end.clientX - start.clientX;
    const dy = end.clientY - start.clientY;
    start = null;
    if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
  }, {passive: true});
});
