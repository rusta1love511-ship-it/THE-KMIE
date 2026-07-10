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

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxClose = lightbox.querySelector('.lightbox-close');
const lightboxCaption = lightbox.querySelector('.lightbox-caption');
const lightboxCaptionTitle = lightboxCaption.querySelector('h3');
const lightboxCaptionText = lightboxCaption.querySelector('p');
const galleryImages = document.querySelectorAll('.showcase .work img');

function setLightbox(open, image) {
  document.body.classList.toggle('lightbox-open', open);
  lightbox.classList.toggle('is-open', open);
  lightbox.setAttribute('aria-hidden', String(!open));

  if (open && image) {
    const work = image.closest('.work');
    const title = work?.querySelector('.work-meta h3')?.textContent || '';
    const text = image.dataset.modalDescription || 'テスト中';

    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt || '';
    lightboxCaptionTitle.textContent = title;
    lightboxCaptionText.textContent = text;
    lightboxCaption.hidden = !title && !text;
    lightbox.scrollTop = 0;
    lightboxClose.focus();
  }

  if (!open) {
    lightboxImage.src = '';
    lightboxImage.alt = '';
    lightboxCaptionTitle.textContent = '';
    lightboxCaptionText.textContent = '';
    lightboxCaption.hidden = false;
  }
}

galleryImages.forEach((image) => {
  image.setAttribute('tabindex', '0');
  image.setAttribute('role', 'button');
  image.setAttribute('aria-label', `${image.alt || '作品画像'}を拡大表示`);

  image.addEventListener('click', () => setLightbox(true, image));
  image.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setLightbox(true, image);
    }
  });
});

lightboxClose.addEventListener('click', () => setLightbox(false));

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) setLightbox(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setLightbox(false);
});
