# État du chantier desktop v2 — journal

_Sorti de `CLAUDE.md` (ATL-005) : ce fichier n'est pas chargé par défaut. Il
paraphrasait les comptes rendus voisins ; il est gardé tel quel comme journal
daté, et c'est `docs/roadmap-desktop-v2-suite.md` qui reste l'entrée pour
reprendre le desktop._

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
- **Les quatre tickets de la roadmap (A→D) sont traités.**
- **En cours — ticket E, le panneau de fiche.** Première tranche livrée le 13 août
  2026 : le panneau passe en **lecture d'abord** au bureau (surcouche
  `desktop-fiche.css` + `desktop-fiche.js`, interrupteur propre). `data-fiche` sur
  `<html>`, une bascule ✎ dans l'en-tête de la feuille ; en lecture, la note **vide**
  se replie (`:placeholder-shown` — donc une note écrite s'affiche toujours) et
  « Jeter » quitte la surface. Mesuré : socle 634 → 479 px, marge du titre 146 →
  301 px, débordements **7/48 → 0/48**. Restent ouverts : le bloc visuel (~190 px,
  le plus gros poste), le bloc Rangement (159 px), et le fait que 41 items sur 48
  ont `title` identique à `content`. Compte rendu :
  `docs/compte-rendu-ticket-e-panneau-fiche.md`.
- **Le corpus réel est en place** (`.claude/fixture.json`, 87 items dont 73 actifs,
  posé le 13 août 2026 — ignoré par git). Il change les conclusions : 3 notes
  remplies sur 73 (pas 0), titre max **1301** caractères (pas 311), et `title`
  n'est **jamais** égal à `content` — la « redondance » vue sur le jeu synthétique
  était un défaut du générateur, il n'y avait rien à corriger.
  ⚠ **Piège vécu** : exporter depuis `localhost:5599` exporte le corpus de TEST.
  Le vrai export vient de `dartois.studio/Sable/`, connecté. Signe qui ne trompe
  pas : des `id` en `dev1…` et des adresses `exemple.local`.
- **Fait — ticket F** : le titre long, coupé à la source (`splitLongTitle` dans
  `app.js`). Une capture Instagram rapportait la légende entière dans le titre —
  et `displayText()` alimente listes, index, recherche et remontée, donc ça
  polluait toute l'app. Champ `body` (texte d'origine complet), affiché en
  `<details>` replié dans la fiche, **et ajouté aux deux filtres de recherche** —
  sans ça, la découpe serait une perte. Projection : titre max 1301 → 88 car.
  **Réparation de l'existant livrée en second** (Réglages → Données → « Raccourcir
  les titres importés ») : Guillaume avait choisi d'attendre, puis a regardé sa
  liste et tranché autrement. La ligne n'apparaît que s'il y a à faire et
  disparaît après. ⚠ **La pile est derrière Supabase — personne ne la répare de
  l'extérieur** : on livre le bouton, son propriétaire l'actionne. Compte rendu :
  `docs/compte-rendu-ticket-f-titre-long.md`.
- Reste aussi, hors roadmap : le parcours de rangement au clavier (conçu dans
  `proto-rangement.html`, jamais implémenté).
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
