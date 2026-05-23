'use strict';

// ── Versionsnummer: beim Deploy auf aktuelles Datum/Uhrzeit setzen ────────────
// Format: YYYYMMDD-N  (N hochzählen bei mehreren Deploys am selben Tag)
const CACHE = 'questboard-20260523-8';

const PRECACHE_URLS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './constellations.js',
  './icon.svg',
  './manifest.json',
  './galaxy.jpg',
];

// Install: Dateien cachen, aber NICHT sofort übernehmen (skipWaiting fehlt absichtlich)
// → App fragt den User zuerst, bevor die neue Version aktiviert wird
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(PRECACHE_URLS))
  );
});

// Activate: alte Caches löschen, dann alle Clients übernehmen
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch: Cache-first, Fallback auf Netzwerk
self.addEventListener('fetch', event => {
  if (!event.request.url.startsWith(self.location.origin)) return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response && response.ok) {
          const clone = response.clone();
          caches.open(CACHE).then(cache => cache.put(event.request, clone));
        }
        return response;
      });
    })
  );
});

// Nachricht von der App: sofort übernehmen (ausgelöst durch User-Klick auf "Jetzt updaten")
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
