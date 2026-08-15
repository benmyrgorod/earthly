const CACHE_NAME = 'earthly-shell-v2';
const APP_SHELL = [
  './',
  './index.html',
  './styles.css?v=20260815-2',
  './script.js?v=20260815-2',
  './manifest.webmanifest',
  './logo.png',
  './download-icon-36px.png',
  './assets/earthly-starry-background.png',
  './favicon/favicon-16.png',
  './favicon/favicon-32.png',
  './favicon/favicon-48.png',
  './favicon/favicon-64.png',
  './favicon/favicon-128.png',
  './favicon/favicon-180.png',
  './favicon/favicon-192.png',
  './favicon/apple-touch-icon.png',
  './favicon/favicon.ico'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    fetch(request)
      .then(async (response) => {
        if (response.ok) {
          const copy = response.clone();
          const cache = await caches.open(CACHE_NAME);
          await cache.put(request, copy);
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(request);
        if (cached) {
          return cached;
        }

        if (request.mode === 'navigate') {
          return caches.match('./index.html');
        }

        return Response.error();
      })
  );
});
