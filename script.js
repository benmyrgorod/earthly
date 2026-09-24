const bookLanguage = document.querySelector('#book-language');

if (bookLanguage) {
  const editions = [...document.querySelectorAll('.book-edition')];
  for (const edition of editions) {
    const option = document.createElement('option');
    option.value = edition.dataset.language;
    option.textContent = edition.dataset.languageLabel;
    bookLanguage.appendChild(option);
  }

  const showSelectedEdition = () => {
    for (const edition of editions) {
      edition.hidden = edition.dataset.language !== bookLanguage.value;
    }
  };

  bookLanguage.addEventListener('change', showSelectedEdition);
  showSelectedEdition();
  document.querySelector('.book-language-field').hidden = false;
}

const starfield = document.querySelector('.starfield');
const starCount = 90;

for (let i = 0; i < starCount; i++) {
  const star = document.createElement('span');
  const size = 1.5 + Math.random() * 2.5;
  star.className = 'star';
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.setProperty('--duration', `${2.5 + Math.random() * 3}s`);
  star.style.setProperty('--peak-opacity', `${0.4 + Math.random() * 0.6}`);
  // negative delay starts each star mid-cycle so the field doesn't pulse in unison
  star.style.setProperty('--delay', `${Math.random() * -5}s`);
  starfield.appendChild(star);
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').catch((error) => {
      console.warn('Service worker registration failed:', error);
    });
  });
}
