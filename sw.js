// FinTrack service worker: keeps the whole app available offline.
// Bump VERSION whenever you change any file so phones pick up the update.
const VERSION = 'fintrack-v3';
const FILES = [
  './',
  'index.html',
  'manifest.webmanifest',
  'lib/chart.umd.min.js',
  'lib/xlsx.mini.min.js',
  'lib/jspdf.umd.min.js',
  'lib/jspdf.plugin.autotable.min.js',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/maskable-512.png',
  'icons/apple-touch-icon.png',
  'fonts/instrument-sans-latin-400-normal.woff2',
  'fonts/instrument-sans-latin-500-normal.woff2',
  'fonts/instrument-sans-latin-600-normal.woff2',
  'fonts/instrument-sans-latin-700-normal.woff2',
  'fonts/ibm-plex-mono-latin-400-normal.woff2',
  'fonts/ibm-plex-mono-latin-500-normal.woff2',
  'fonts/ibm-plex-mono-latin-600-normal.woff2'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Serve from the cache first so the app opens instantly and offline,
// then refresh the cached copy in the background when a network is available.
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith((async () => {
    const cache = await caches.open(VERSION);
    const key = req.mode === 'navigate' ? 'index.html' : req;
    const cached = await cache.match(key, {ignoreSearch: req.mode === 'navigate'});
    const network = fetch(req).then(res => {
      if (res && res.ok) cache.put(key, res.clone());
      return res;
    }).catch(() => null);
    if (cached) { event.waitUntil(network); return cached; }
    return (await network) || new Response('Offline', {status: 503, statusText: 'Offline'});
  })());
});
