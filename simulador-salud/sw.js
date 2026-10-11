/* Service worker: permite usar el simulador sin conexión una vez visitado. */
const CACHE = "martins-salud-v2";
const ASSETS = [
  "./", "index.html", "css/styles.css", "js/data.js", "js/store.js", "js/sims2d.js", "js/admin.js", "js/app.js", "js/scene3d.js",
  "vendor/three.module.min.js", "vendor/OrbitControls.js", "vendor/StereoEffect.js",
  "assets/logo.jpg", "assets/emblema.png", "assets/icon-192.png", "assets/icon-512.png", "manifest.webmanifest"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

// Red primero (para recibir actualizaciones) y caché como respaldo sin conexión.
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        if (res.ok && (e.request.url.startsWith(self.location.origin) || e.request.url.includes("fonts."))) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
        }
        return res;
      })
      .catch(() => caches.match(e.request).then((r) => r || caches.match("index.html")))
  );
});
