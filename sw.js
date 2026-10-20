/* Sakay-Baba! service worker (hand-written, generated at build). Cache-first app shell; no other network use. */
const CACHE = 'sb-baf13195927d';
const ASSETS = ["./","./assets/atkinson-hyperlegible-latin-400-normal-BbWidj28.woff","./assets/atkinson-hyperlegible-latin-400-normal-BrHNak5F.woff2","./assets/atkinson-hyperlegible-latin-700-normal-BK6Glc0m.woff","./assets/atkinson-hyperlegible-latin-700-normal-GZI4o3u0.woff2","./assets/bungee-latin-400-normal-DA8IEVW_.woff","./assets/bungee-latin-400-normal-Dfnurram.woff2","./assets/main-BBVnkj-0.js","./assets/privacy-DAG4g6Iv.js","./assets/privacy-content-BQNGqn9Z.css","./assets/privacy-content-vB-nq0Hi.js","./icons/apple-touch-icon.png","./icons/icon-192.png","./icons/icon-512.png","./icons/icon.svg","./icons/maskable-512.png","./manifest.webmanifest"];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('sb-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    caches.match(req, { ignoreSearch: req.mode === 'navigate' }).then(
      (hit) => hit || fetch(req).catch(() => (req.mode === 'navigate' ? caches.match('./index.html') : Response.error())),
    ),
  );
});
