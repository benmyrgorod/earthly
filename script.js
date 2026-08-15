const THEME_STORAGE_KEY = 'earthly-theme';
const themeToggle = document.querySelector('.theme-toggle');
const themeColor = document.querySelector('meta[name="theme-color"]');

function readSavedTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === 'liquid' ? 'liquid' : 'original';
  } catch (_) {
    return 'original';
  }
}

function applyTheme(theme, persist = false) {
  const activeTheme = theme === 'liquid' ? 'liquid' : 'original';
  const liquidEnabled = activeTheme === 'liquid';

  document.documentElement.dataset.theme = activeTheme;
  themeToggle.setAttribute('aria-checked', String(liquidEnabled));
  themeToggle.setAttribute('aria-label', liquidEnabled ? 'Use original theme' : 'Use Liquid Glass theme');
  themeToggle.title = liquidEnabled ? 'Use original theme' : 'Use Liquid Glass theme';
  themeColor.content = liquidEnabled ? '#273052' : '#030711';

  if (persist) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, activeTheme);
    } catch (_) {}
  }
}

applyTheme(readSavedTheme());

themeToggle.addEventListener('click', () => {
  applyTheme(document.documentElement.dataset.theme === 'liquid' ? 'original' : 'liquid', true);
});

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
