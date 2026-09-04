/* Sable — service worker
   Rôle principal : intercepter les partages entrants (Web Share Target, POST),
   stocker le contenu partagé dans un cache temporaire, puis rediriger l'app
   vers ?share-target pour qu'elle le récupère et l'ajoute à la pile.
   Rôle secondaire : petit cache de la coquille pour un démarrage fiable. */

const APP_CACHE = "sable-app-v103";
const SHARE_CACHE = "sable-share-v1";
const SHARE_META = "/__sable_share/meta";
const SHARE_FILE = "/__sable_share/file_";

/* On NE met PAS le manifeste en cache : il doit toujours venir du réseau,
   sinon une ancienne icône reste « collée » (cache d'abord) après une mise à jour.
   Les icônes sont de toute façon intégrées en data-URI dans le manifeste. */

/* IMMUABLE — le contenu ne change jamais sous un nom donné : un changement de
   fonte passera par un nom de fichier neuf (ticket #11). Donc cache d'abord,
   sans aller-retour réseau. */
const IMMUABLE = [
  "./fonts/geist-latin.woff2",
  "./fonts/geist-latin-ext.woff2",
  "./fonts/geist-mono-latin.woff2",
  "./fonts/geist-mono-latin-ext.woff2"
];

/* CODE — la coquille de l'app. Elle change à chaque déploiement, donc
   RÉSEAU D'ABORD, repli cache : le contrat de fraîcheur reste EXACTEMENT celui
   d'aujourd'hui (un visiteur en ligne reçoit toujours le CSS et le JS frais), et
   le cache n'est qu'un filet hors ligne. Le cache-d'abord a été écarté à
   dessein : il rendrait le bump d'APP_CACHE obligatoire au lieu d'hygiénique —
   un oubli figerait l'app chez les visiteurs déjà installés (ticket #14).
   Chaque réponse réseau valide rafraîchit sa copie : le filet ne périme pas,
   même sans bump. La liste est celle des <link> et <script> d'index.html, plus
   onboarding.css que onboarding.js charge dans son shadow root. */
const CODE = [
  "./",
  "./index.html",
  "./styles.css",
  "./styles-desktop.css",
  "./desktop-v2.css",
  "./desktop-fiche.css",
  "./onboarding.css",
  "./icons.svg",
  "./onboarding.js",
  "./app.js",
  "./desktop.js",
  "./desktop-v2.js",
  "./desktop-fiche.js"
];

const SHELL = CODE.concat(IMMUABLE);

/* Chemins ABSOLUS résolus contre l'URL du worker, comparés à l'identique.
   L'ancienne garde testait `endsWith` sur deux formes dont l'une valait la
   chaîne VIDE pour l'entrée "./" : endsWith("") est toujours vrai, donc le
   worker interceptait TOUT GET de même origine et la liste ne filtrait rien
   (ticket #14, mesuré : 18 chemins testés, 17 interceptés). */
const chemin = (p) => new URL(p, self.location.href).pathname;
const IMMUABLE_PATHS = new Set(IMMUABLE.map(chemin));
const CODE_PATHS = new Set(CODE.map(chemin));

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(APP_CACHE)
      /* Une entrée par requête, et non `addAll` : addAll est atomique, un seul
         404 dans les dix-sept laisserait le cache VIDE et l'app nue hors ligne —
         exactement le défaut qu'on répare. */
      .then((c) => Promise.all(SHELL.map((p) => c.add(p).catch(() => {}))))
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

/* Le bouton « Actualiser l'application » des Réglages passe par ici : sans ça,
   un worker déjà installé attend la fermeture de tous les onglets pour prendre
   la main — sur une PWA ouverte en permanence, ça n'arrive jamais. */
self.addEventListener("message", (e) => {
  if (e.data && e.data.type === "SKIP_WAITING") self.skipWaiting();
});

/* Range une réponse sous une clé SANS query : `favicon.svg?v=3` et `?fresh` ne
   doivent pas fabriquer une seconde entrée à côté de la bonne. Les lectures
   passent toutes par `ignoreSearch`, qui neutralise la query des deux côtés. */
async function memoriser(url, res) {
  try {
    const c = await caches.open(APP_CACHE);
    await c.put(url.origin + url.pathname, res);
  } catch (e) {}
}

/* Réseau d'abord, repli cache — et la réponse fraîche remplace la copie de
   secours au passage. C'est ce qui dispense d'une discipline de bump : le filet
   hors ligne est toujours la dernière version VUE, pas celle de l'installation. */
function reseauDAbord(req, url) {
  return fetch(req)
    .then((res) => {
      if (res && res.ok && res.status === 200) memoriser(url, res.clone());
      return res;
    })
    .catch(() => caches.match(req, { ignoreSearch: true }));
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = new URL(req.url);

  if (req.method === "POST" && url.pathname.endsWith("/share-target")) {
    e.respondWith(handleShare(req));
    return;
  }

  if (req.method !== "GET") return;

  // Le manifeste passe toujours par le réseau (jamais servi depuis le cache).
  // Il n'est plus dans aucune liste — cette garde ne fait que le redire.
  if (url.pathname.endsWith("/manifest.webmanifest") ||
      url.pathname.endsWith("manifest.webmanifest")) {
    return;
  }

  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => {
          /* Seules les pages de la coquille sont mémorisées : une navigation
             vers proto-rangement.html ne doit pas grossir le cache de l'app. */
          if (res && res.ok && res.status === 200 && CODE_PATHS.has(url.pathname))
            memoriser(url, res.clone());
          return res;
        })
        /* `?share-target` et `?fresh` sont des navigations légitimes : la query
           est ignorée au repli, sinon elles tomberaient dans le vide. */
        .catch(() => caches.match(req, { ignoreSearch: true })
          .then((r) => r || caches.match("./index.html")))
    );
    return;
  }

  if (url.origin !== self.location.origin) return;

  if (IMMUABLE_PATHS.has(url.pathname)) {
    e.respondWith(caches.match(req, { ignoreSearch: true }).then((r) => r || fetch(req)));
    return;
  }

  if (CODE_PATHS.has(url.pathname)) {
    e.respondWith(reseauDAbord(req, url));
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