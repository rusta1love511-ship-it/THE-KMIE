const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const menuLinks = document.querySelectorAll('.menu a');

function setMenu(open) {
  document.body.classList.toggle('menu-open', open);
  menu.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  menu.setAttribute('aria-hidden', String(!open));
}

menuButton.addEventListener('click', () => {
  setMenu(!menu.classList.contains('is-open'));
});

menuLinks.forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

document.querySelectorAll('img[data-fallback]').forEach((image) => {
  image.addEventListener('error', () => {
    if (image.src.endsWith(image.dataset.fallback)) return;
    image.src = image.dataset.fallback;
  });
});
