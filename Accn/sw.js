/* Accomodation Manager — minimal service worker.
   Purpose: satisfy PWA installability (so "Add to Home Screen" gives a real
   standalone app icon + splash instead of a browser bookmark) and cache the
   static app shell for a fast, resilient launch. It deliberately does NOT
   cache Firestore/Firebase network calls — booking data always comes from
   the network so the app never shows stale room/booking state. */
const SHELL_CACHE = 'am-shell-v1';
const SHELL_FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then((cache) => cache.addAll(SHELL_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== SHELL_CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Never intercept Firebase/Firestore/Google API traffic — always live.
  if (url.origin !== self.location.origin) return;
  if (event.request.method !== 'GET') return;

  // Network-first for the app shell so updates show up immediately when
  // online; fall back to cache when offline.
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(SHELL_CACHE).then((cache) => cache.put(event.request, copy));
        return res;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match('./index.html')))
  );
});
