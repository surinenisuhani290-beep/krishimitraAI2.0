// Simple service worker registration and caching strategy for app shell.

const CACHE_NAME = 'krishi-mitra-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/src/index.css'
];

self.addEventListener('install', (event: any) => {
  // @ts-ignore
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event: any) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
