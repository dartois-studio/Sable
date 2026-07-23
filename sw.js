/* Sable — service worker
   Rôle principal : intercepter les partages entrants (Web Share Target, POST),
   stocker le contenu partagé dans un cache temporaire, puis rediriger l'app
   vers ?share-target pour qu'elle le récupère et l'ajoute à la pile.
   Rôle secondaire : petit cache de la coquille pour un démarrage fiable. */

const APP_CACHE = "sable-app-v12";
const SHARE_CACHE = "sable-share-v1";
const SHARE_META = "/__sable_share/meta";
const SHARE_FILE = "/__sable_share/file_";

/* On NE met PAS le manifeste en cache : il doit toujours venir du réseau,
   sinon une ancienne icône reste « collée » (cache d'abord) après une mise à jour.
   Les icônes sont de toute façon intégrées en data-URI dans le manifeste. */
const SHELL = [
  "./",
  "./index.html"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(APP_CACHE)
      .then((c) => c.addAll(SHELL))
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys.filter((k) => k !== APP_CACHE && k !== SHARE_CACHE).map((k) => caches.delete(k))
    );
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = new URL(req.url);

  if (req.method === "POST" && url.pathname.endsWith("/share-target")) {
    e.respondWith(handleShare(req));
    return;
  }

  if (req.method !== "GET") return;

  // Le manifeste passe toujours par le réseau (jamais servi depuis le cache).
  if (url.pathname.endsWith("/manifest.webmanifest") ||
      url.pathname.endsWith("manifest.webmanifest")) {
    return;
  }

  if (req.mode === "navigate") {
    e.respondWith(fetch(req).catch(() => caches.match("./index.html")));
    return;
  }

  if (url.origin === self.location.origin &&
      SHELL.some((p) => url.pathname.endsWith(p.replace(/^\.\//, "/")) ||
                        url.pathname.endsWith(p.replace(/^\.\//, "")))) {
    e.respondWith(caches.match(req).then((r) => r || fetch(req)));
    return;
  }
});

async function handleShare(req) {
  try {
    const form = await req.formData();
    const cache = await caches.open(SHARE_CACHE);

    const files = form.getAll("media").filter((f) => f && typeof f !== "string");
    let count = 0;
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      const headers = new Headers();
      headers.set("content-type", f.type || "application/octet-stream");
      headers.set("x-name", encodeURIComponent(f.name || ("partage-" + i)));
      await cache.put(SHARE_FILE + i, new Response(f, { headers }));
      count++;
    }

    const meta = {
      title: (form.get("title") || "").toString(),
      text: (form.get("text") || "").toString(),
      url: (form.get("url") || "").toString(),
      files: count
    };
    await cache.put(SHARE_META, new Response(JSON.stringify(meta), {
      headers: { "content-type": "application/json" }
    }));
  } catch (e) {
  }

  const dest = new URL("./?share-target", self.registration.scope);
  return Response.redirect(dest.href, 303);
}