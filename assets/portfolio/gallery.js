document.querySelectorAll('.visual').forEach(gallery => {
  const slides = Array.from(gallery.querySelectorAll('figure'));
  const buttons = Array.from(gallery.querySelectorAll('button'));
  function show(index) {
    slides.forEach((slide, i) => { slide.hidden = i !== index; });
    buttons.forEach((button, i) => { button.setAttribute('aria-pressed', String(i === index)); });
  }
  buttons.forEach((button, index) => button.addEventListener('click', () => show(index)));
  let startX;
  gallery.addEventListener('touchstart', event => { startX = event.changedTouches[0].clientX; }, {passive:true});
  gallery.addEventListener('touchend', event => {
    const distance = event.changedTouches[0].clientX - startX;
    if (Math.abs(distance) < 45) return;
    const active = slides.findIndex(slide => !slide.hidden);
    show((active + (distance < 0 ? 1 : -1) + slides.length) % slides.length);
  }, {passive:true});
});
