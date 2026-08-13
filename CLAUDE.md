# Sable — comment on travaille ici

Ce fichier est lu automatiquement à chaque session de Claude Code ouverte dans ce
dépôt. Il n'a pas besoin d'être cité : il est déjà là.

---

## 1. La nature du travail : prototype **évolutif**, pas maquette

Le desktop de Sable se construit **dans l'app réelle**, pas à côté d'elle.

Le mot juste n'est pas « proto live » mais **prototypage évolutif**
(*evolutionary prototyping*) : le prototype n'est pas une étude qu'on jettera, il
est **la première version du produit**. On le fait grossir jusqu'à ce qu'il *soit*
l'app. Son opposé, à refuser ici, est la **maquette jetable** (*throwaway
prototype*, ou *spike*) : un écran qui a l'air juste et qu'on ne peut pas livrer.

Trois autres termes utiles, parce qu'ils disent chacun une exigence différente :

| Terme | Ce qu'il impose |
|---|---|
| **Chemin de production** (*production path*) | Le code écrit dans le proto est le code qui partira en ligne. Pas de réécriture prévue « plus tard ». |
| **Tranche verticale** (*vertical slice*) | Une décision d'UI va jusqu'aux données : l'écran, le rendu, l'état, le stockage. Pas une peau posée sur du vide. |
| **Balle traçante** (*tracer bullet*) | On tire un chemin complet et mince à travers la vraie pile technique, puis on l'épaissit. On ne construit pas un décor qu'il faudra remplacer. |

**La phrase à donner en début de session, si le contexte doit être rappelé :**

> Sable est un prototype évolutif sur le chemin de production : tout ce qu'on
> décide ici doit être implémentable tel quel dans l'app réelle, avec ses
> contraintes. Pas de maquette jetable, pas d'écran qui ne peut pas être livré.

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
- **Il n'y a qu'une page : `index.html`.** (`index-desktop.html` a été fondu dedans
  le 13 août 2026 puis supprimé.) Elle porte 70 `id` ; app.js les câble au
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

---

## 4. Le motif à réutiliser : surcouche + interrupteur d'arrêt

Le desktop v2 a été livré comme **surcouche** (`desktop-v2.css` +
`desktop-v2.js`), chargée après les fichiers existants, sans en modifier aucun.
Retirer les deux lignes de `<link>`/`<script>` rend exactement l'écran d'avant.

C'est le motif à reprendre pour tout gros changement d'UI : la sortie de secours
n'est pas une option de confort, c'est ce qui rend la décision réversible — donc
ce qui permet de la prendre vite. En vocabulaire courant : un **interrupteur
d'arrêt** (*kill switch*), cousin pauvre du *feature flag*.

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
  interdit purement et simplement une vérification. Les connaître évite d'aller
  chercher un bug dans le code alors qu'il est dans l'outil.
  1. **Les captures d'écran peuvent échouer** — la page ne composite pas.
  2. **L'horloge d'animation est alors gelée** : une propriété en transition
     reste bloquée sur sa valeur de départ, et les images en `loading="lazy"` ne
     se chargent jamais. Purger avec `el.getAnimations().forEach(a=>a.finish())`
     avant de mesurer.
  3. **Changer `data-theme` à la main sert des valeurs calculées périmées.** Une
     couleur issue d'une variable (`background:var(--border-2)`) garde celle de
     l'ancien thème, alors que `getPropertyValue('--border-2')` renvoie déjà la
     nouvelle — les deux se contredisent et on croit à un défaut de thème.
     Passer par `settings.theme=…; applyTheme();`, jamais par `setAttribute`.
  4. **`resize_window` n'émet AUCUN événement** : ni `resize`, ni le `change` de
     `matchMedia` (sondé le 12 août 2026, zéro sur les deux compteurs). Tout ce
     qui réagit au franchissement du seuil de 1100 px — `DK.addEventListener`
     dans `desktop-v2.js` — est donc **invérifiable par ce chemin**. Recharger à
     la largeur voulue teste le rendu initial, qui lui est fidèle ; la voie
     « fenêtre étirée à la main » reste à déclarer non vérifiée.

---

## 6. Voir le proto en local, sans connexion

L'app est adossée à Supabase et l'authentification est **sans mot de passe** (lien
magique / code à usage unique par e-mail) : sans session, il n'y a rien à afficher.
Un harnais de développement lève cet obstacle **en local seulement**.

**Lancer :** double-clic sur `.claude/proto.cmd` — le serveur démarre et la page
bureau s'ouvre. Depuis Claude Code : `preview_start` avec la configuration
`sable-static`.

- une seule adresse : `http://localhost:5599/index.html` — la mise en page suit la
  largeur de la fenêtre. Pour juger l'autre forme, **recharger** à la largeur
  voulue (artefact n°4 ci-dessus : redimensionner n'émet aucun événement).
- remise à zéro du corpus : ajouter `?fresh` à l'adresse

**Comment ça marche, et pourquoi c'est sûr :** `.claude/serve.js` injecte
`.claude/dev-harness.js` dans le HTML qu'il sert. Le harnais remplace
`window.storage` par une couche `localStorage`, amorce un corpus, neutralise
l'écran de connexion et démarre l'app. Il refuse de tourner ailleurs que sur
`localhost`, le serveur n'écoute que sur `127.0.0.1`, et **`.claude/` est dans
`.gitignore` — donc rien de tout ça n'est publié**. Les pages du dépôt restent
identiques à ce qui tourne en production : c'est la seule façon d'être sûr que ce
qu'on juge en local est bien ce qui sera livré.

**Le corpus.** Par défaut, un jeu synthétique calqué sur une vraie pile : titres
longs (jusqu'à 311 caractères), 17 catégories déséquilibrées, vignettes en
data-URI, et les trois états d'une ligne de catégorie (neufs, endormie, vide).
Le rattrapage d'aperçus est coupé : un proto local ne parle à aucun service tiers.

**Pour juger sur tes vraies données** — meilleure fidélité : Réglages →
« Exporter ma pile » → enregistrer le fichier sous `.claude/fixture.json`. Il est
prioritaire, et comme `.claude/` est ignoré par git, les données restent locales.

---

## 7. Où en est le chantier

- **Fait et en ligne** : desktop v2, l'index et Ma pile en tableau, en surcouche.
  Depuis la fusion du 13 août 2026, c'est **l'app elle-même** au-delà de 1100 px :
  `dartois.studio/Sable/` suffit, il n'y a plus d'adresse séparée. En dessous du
  seuil, l'app est exactement la version mobile.
- **Fait aussi** : la remontée au bureau — le bandeau du haut dit combien d'items
  remontent et ce qu'ils sont (les vignettes muettes étaient le défaut le plus
  visible du corpus), il a une sortie à la souris, et le rituel plein écran tient
  la largeur. Tout dans la même surcouche.
- **Fait — ticket A** : la barre d'outils permanente de l'en-tête (faux champ
  « Chercher », segment des trois formes, roue existante). Tout délègue à `app.js`,
  le segment réemploie la primitive `.seg` (donc ne diverge pas du bandeau « Vue »).
  Le `kbd /` de la maquette n'est **pas** posé. ⚠ Le motif invoqué à l'époque
  (« aucun gestionnaire `/` n'existe dans `app.js` ») est vrai mais trompeur :
  `desktop.js:131` implémente bien `/` et appelle `openSearch()` d'`app.js`. Le
  raccourci FONCTIONNE au bureau. Reposer le `kbd /` dans la barre d'outils est
  donc possible — c'est une décision de forme, plus une contrainte technique.
  Compte rendu : `docs/compte-rendu-ticket-a-barre-outils.md`.
- **Fait — ticket B** : le bandeau de filtres de Ma pile (`.dkr-fbar` au-dessus de
  `#pileList`) — puces de type avec compteurs (délèguent à `typeFilter`), « Trié
  par » qui ouvre le panneau « Trier » existant. Décisions tranchées (Guillaume a
  délégué) : « Non classés » livrée en raccourci de périmètre `enterCollection("none")`
  (pointillé, sortie par le retour de surface) ; « + Tag » **non livrée** (aucun axe
  tag en ligne ; source encore atteinte par l'entonnoir `#filterBtn`). Compte rendu :
  `docs/compte-rendu-ticket-b-bandeau-filtres.md`.
- **Fait — ticket C** : l'habillage des paliers de date de Ma pile (`.tier` dans
  `#pileList`) — corps 10 px accordé aux en-têtes de colonnes, bandeau de 34 px,
  8 px de respiration, filet de 1 px (`--border`) sur la largeur restante. CSS seul,
  règle refinée en place. Compte rendu : `docs/compte-rendu-ticket-c-paliers-date.md`.
- **Fait — ticket D** : le détail des lignes. Le `⋯` (index `.cdots`, pile `.rdots`)
  et l'étoile d'épinglage (`.cpin`, champ `settings.catPins`) étaient DÉJÀ en place —
  vérifiés, pas refaits. Fait : « Mis de côté »/« Corbeille » côte à côte (CSS seul).
  Décision produit tranchée (Guillaume a délégué) : la colonne d'index reste
  **« Neufs »**, pas « À ranger » — « À ranger » entrerait en collision avec « Non
  classés » (le compte est de la fraîcheur, pas du classement). Compte rendu :
  `docs/compte-rendu-ticket-d-detail-lignes.md`.
- **À trancher** : la règle des « neufs » (`FRESH_DAYS`, `SLEEP_DAYS` en tête de
  `desktop-v2.js`) — c'est une décision produit, pas technique. Et deux autres
  décisions listées au §7 de `docs/roadmap-desktop-v2-suite.md`. En revanche le
  point « le `kbd /` promet un raccourci absent » est **retiré** : vérifié le
  13 août 2026, le raccourci existe (`desktop.js:131`). Il n'y avait rien à
  trancher, seulement une note fausse.
- **Fait — l'étape structurelle** : `index-desktop.html` fondu dans `index.html`
  puis supprimé (13 août 2026). Le bloc de configuration n'existe plus qu'en un
  exemplaire, le doublon est éteint. Compte rendu :
  `docs/compte-rendu-fusion-page-unique.md`.
- **Les quatre tickets de la roadmap (A→D) sont traités.** Restent, hors de cette
  roadmap : le panneau de fiche, et le parcours de rangement au clavier (conçu
  dans `proto-rangement.html`, jamais implémenté).
- **Tout ce qui précède est en ligne** depuis le 13 août 2026 (commit `910eb95`).
  Les tickets A→D étaient restés sur une branche locale jamais poussée — d'où
  l'écart entre le dépôt et le site pendant quelques jours. Vérifié après coup :
  build Pages `built` sur le bon commit, et les classes du ticket B servies par
  `dartois.studio/Sable/desktop-v2.css`. Le circuit branche → `main` → site est
  décrit dans `docs/memo-git-github.md`.

Les comptes rendus détaillés sont dans `docs/`. Ils sont la source : les lire
avant de reprendre un morceau. Pour reprendre le desktop, l'entrée est
`docs/roadmap-desktop-v2-suite.md` — il est autonome et se lance depuis une
session neuve.
