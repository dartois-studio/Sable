# Sable — comment on travaille ici

Ce fichier est lu automatiquement à chaque session de Claude Code ouverte dans ce
dépôt. Il ne garde que ce qui **prescrit** ; l'état du chantier et le vocabulaire
sont dans `docs/`, non chargé par défaut (§ 7).

---

## 1. La nature du travail : prototype **évolutif**, pas maquette

Le desktop de Sable se construit **dans l'app réelle**, pas à côté d'elle. Le
prototype n'est pas une étude qu'on jettera, il est **la première version du
produit** : le code écrit ici est le code qui partira en ligne, et une décision
d'UI va jusqu'aux données — l'écran, le rendu, l'état, le stockage. Son opposé, à
refuser, est la **maquette jetable** : un écran qui a l'air juste et qu'on ne
peut pas livrer.

Le vocabulaire complet (prototypage évolutif, chemin de production, tranche
verticale, balle traçante) et la phrase de cadrage à donner en début de session
sont dans `docs/cadre-de-travail.md`.

---

## 2. La règle qui découle de tout ça

> **Toute décision d'UI ou d'UX arrive accompagnée de son chemin
> d'implémentation dans le vrai code.**

Concrètement, une proposition n'est recevable que si elle dit :

1. **quels fichiers** elle touche, et lesquels elle ne touche pas ;
2. **d'où viennent les données** qu'elle affiche — champ existant, dérivation, ou
   champ nouveau (et alors : quelle migration) ;
3. **comment on l'enlève** si elle ne convient pas ;
4. **ce qu'elle casse ailleurs**, en particulier sur mobile.

Une belle idée sans ces quatre réponses n'est pas une idée mûre : elle est un
dessin. Le dire franchement plutôt que de la coder à moitié.

---

## 3. Les invariants du projet

Ils ont tous été payés par un bug. Les respecter n'est pas du zèle.

- **`body` reste le défileur.** Ne jamais créer de conteneur défilant : la
  sentinelle d'en-tête, `body.sheetlock` et l'observation du mini-FAB en
  dépendent tous les trois.
- **Aucune cote CSS posée depuis JS.** Le JS pose des classes et des attributs,
  le CSS tient les dimensions (leçon v2.47). Exemple en place : la barre de
  volume lit `data-fill` de 0 à 10, les onze largeurs vivent dans le CSS.
- **Les repeintures partielles ne passent pas par `renderAll`.** `repaintCatNodes`
  et `repaintIdxNodes` redessinent en place ; tout enrichissement doit s'accrocher
  aux deux (piège v2.20).
- **Une règle `display:` sur une cible masquable réclame son annulation.** Sinon
  l'auteur gagne contre `hidden` et l'élément ne se cache plus (v2.44).
- **Les enrichissements sont idempotents.** Marqueur `data-*` sur le nœud traité :
  un double rendu ne doit jamais doubler une cellule.
- **Pas de champ nouveau sans nécessité.** Tout ce qui peut se dériver de `items`
  se dérive : aucune migration, rien à écrire en base.
- **Il n'y a qu'une page : `index.html`.** Elle porte 70 `id` ; app.js les câble au
  chargement, **un `id` manquant fait tomber tout le fichier**. La dette de
  resynchronisation entre deux gabarits est éteinte — ne pas la recréer.
- **`data-shell="desktop"` est posé à TOUTE largeur.** Il ne signifie plus « on est
  sur un bureau » mais « la couche bureau est chargée ». La garde réelle est la
  requête de média. Corollaire : `styles-desktop.css` et `desktop-v2.css` ne
  doivent avoir **aucune** règle hors `@media (min-width:1100px)` — une seule
  suffirait à faire fuir le bureau sur les téléphones.
- **Les quatre nœuds propres au bureau sont masqués dans `styles.css`.**
  `.dk-railhead`, `.dk-keys`, `.dk-close`, `.dk-empty` vivent dans le gabarit
  commun : c'est la feuille de base qui les tait, et la surcouche qui les rétablit
  au-dessus de 1100 px, chacun avec un `display:` explicite. **C'est ce qui fait
  tenir l'interrupteur d'arrêt** — sans cette règle, retirer la couche bureau les
  révélerait en texte nu.
- **Les JS bureau s'exécutent sur téléphone.** Leur garde d'entrée porte sur
  `data-shell`, désormais toujours présent. Tout ajout à `desktop.js` /
  `desktop-v2.js` doit donc être gardé par `if(!DK.matches)`, ou prouvé sans effet.
- **Les tokens et la typographie viennent de `styles.css`.** Ne jamais redéfinir
  un token dans une surcouche.
- **Le CSS bureau vit sous `@media (min-width:1100px)`.** En dessous, l'app
  redevient exactement la version mobile.
- **`APP_VERSION` suit le DÉPLOIEMENT, pas le fichier app.js.** Toute livraison
  bumpe le numéro et écrit sa ligne de journal en tête d'app.js — y compris une
  livraison de CSS pur, qui touche alors app.js pour ces deux lignes-là et rien
  d'autre. Le numéro n'a qu'un usage, dire « la nouvelle version est bien
  servie » ; un numéro immobile pendant sept tickets ne le dit plus (ticket #23).
  Corollaire : un commentaire de code se date par son TICKET, jamais par un
  numéro de version deviné — deux blocs de styles.css s'étaient datés v2.92 et
  v2.93, numéros déjà pris par des versions vieilles de six semaines.

---

## 4. Le motif à réutiliser : surcouche + interrupteur d'arrêt

Un gros changement d'UI se livre en **surcouche** (un `.css` + un `.js` chargés
après les fichiers existants, sans en modifier aucun) : retirer les deux lignes
de `<link>`/`<script>` rend exactement l'écran d'avant. La sortie de secours
n'est pas une option de confort, c'est ce qui rend la décision réversible — donc
ce qui permet de la prendre vite.

Quand la forme est validée, la surcouche est **fondue** dans les fichiers
définitifs. Une surcouche est un échafaudage, pas une adresse permanente.

---

## 5. Vérifier avant de dire que c'est fait

- **Mesurer, pas regarder.** Pour un alignement, comparer les `getBoundingClientRect`
  de l'en-tête et des lignes vaut mieux qu'un coup d'œil : deux pixels de
  décalage sont invisibles à l'œil et visibles au ruban.
- **Écrire la liste de contrôle avant de livrer**, et la dérouler point par point,
  en disant ce qui passe et ce qui ne passe pas.
- **Nommer ce qui n'a pas été vérifié.** « Non vérifié » est une information
  utile ; « ça marche » sans preuve est une dette.
- **Quatre artefacts connus du volet Navigateur de Claude Code.** Les trois
  premiers font qu'on mesure autre chose que ce qu'on croit ; le quatrième
  interdit purement et simplement une vérification.
  1. **Les captures d'écran peuvent échouer** — la page ne composite pas.
  2. **L'horloge d'animation est alors gelée** : une propriété en transition
     reste bloquée sur sa valeur de départ, et les images en `loading="lazy"` ne
     se chargent jamais. Purger avec `el.getAnimations().forEach(a=>a.finish())`
     avant de mesurer.
  3. **Changer `data-theme` à la main sert des valeurs calculées périmées** : une
     couleur issue d'une variable garde celle de l'ancien thème alors que
     `getPropertyValue()` renvoie déjà la nouvelle. Passer par
     `settings.theme=…; applyTheme();`, jamais par `setAttribute`.
  4. **`resize_window` n'émet AUCUN événement** : ni `resize`, ni le `change` de
     `matchMedia`. Tout ce qui réagit au franchissement des 1100 px —
     `DK.addEventListener` dans `desktop-v2.js` — est **invérifiable par ce
     chemin**. Recharger à la largeur voulue teste le rendu initial, qui lui est
     fidèle ; la voie « fenêtre étirée à la main » reste à déclarer non vérifiée.

---

## 6. Voir le proto en local, sans connexion

L'app est adossée à Supabase et l'authentification est **sans mot de passe** :
sans session, il n'y a rien à afficher. Un harnais de développement lève cet
obstacle **en local seulement**.

**Lancer :** double-clic sur `.claude/proto.cmd`. Depuis Claude Code :
`preview_start` avec la configuration `sable-static`.

- une seule adresse : `http://localhost:5599/index.html` — la mise en page suit la
  largeur de la fenêtre. Pour juger l'autre forme, **recharger** à la largeur
  voulue (artefact n°4 ci-dessus : redimensionner n'émet aucun événement).
- remise à zéro du corpus : ajouter `?fresh` à l'adresse

`.claude/serve.js` injecte `.claude/dev-harness.js` dans le HTML servi : le
harnais remplace `window.storage` par une couche `localStorage`, amorce un
corpus, neutralise l'écran de connexion et démarre l'app. Il refuse de tourner
ailleurs que sur `localhost`, le serveur n'écoute que sur `127.0.0.1`, et
**`.claude/` est dans `.gitignore`** — les pages du dépôt restent identiques à ce
qui tourne en production. Ne jamais déplacer ce harnais hors de `.claude/`.

**Pour juger sur tes vraies données** : Réglages → « Exporter ma pile » →
enregistrer sous `.claude/fixture.json`, prioritaire sur le corpus synthétique.
⚠ **Exporter depuis `localhost:5599` exporte le corpus de TEST** : le vrai export
vient de `dartois.studio/Sable/`, connecté. Signe qui ne trompe pas — des `id` en
`dev1…` et des adresses `exemple.local`.

---

## 7. Où en est le chantier, et quoi lire

Tout ce qui est livré est **en ligne** : au-delà de 1100 px, `dartois.studio/Sable/`
*est* le desktop v2 ; en dessous, l'app est exactement la version mobile. Les
tickets A→D de la roadmap sont traités, le ticket E (panneau de fiche) est
entamé. Les comptes rendus de `docs/` sont la source : les lire avant de
reprendre un morceau, plutôt que de se fier à un résumé.

Ne pas charger tout `docs/` d'un coup. N'ouvrir que ce qui concerne la tâche :

| Tâche | Fichier à lire |
|---|---|
| Reprendre le desktop — **l'entrée**, autonome | `docs/roadmap-desktop-v2-suite.md` |
| Savoir ce qui a été livré, quand, et ce qui reste ouvert | `docs/etat-du-chantier-desktop-v2.md` |
| La remontée en plein écran, les deux réglages d'onglets (tickets #5→#7) | `docs/tickets-plein-ecran-reglages.md` |
| Barre d'outils de l'en-tête | `docs/compte-rendu-ticket-a-barre-outils.md` |
| Bandeau de filtres de Ma pile | `docs/compte-rendu-ticket-b-bandeau-filtres.md` |
| Paliers de date | `docs/compte-rendu-ticket-c-paliers-date.md` |
| Détail des lignes, épinglage | `docs/compte-rendu-ticket-d-detail-lignes.md` |
| Panneau de fiche | `docs/compte-rendu-ticket-e-panneau-fiche.md` |
| Titres longs, champ `body`, recherche | `docs/compte-rendu-ticket-f-titre-long.md` |
| Page unique : pourquoi `index-desktop.html` a disparu | `docs/compte-rendu-fusion-page-unique.md` |
| Pousser, publier, vérifier le site | `docs/memo-git-github.md` |
| Vocabulaire du prototypage évolutif | `docs/cadre-de-travail.md` |
| Parcours de rangement au clavier (jamais implémenté) | `docs/passation-proto-rangement.md` |
