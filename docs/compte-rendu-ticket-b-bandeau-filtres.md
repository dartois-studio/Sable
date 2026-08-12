# Compte rendu — ticket B, le bandeau de filtres de Ma pile

Écrit le 12 août 2026, dans la foulée du ticket A. Surcouche uniquement :
`desktop-v2.js` et `desktop-v2.css` (le bump de `sw.js` v97→v98 du ticket A
couvre toute la session). **Ni `app.js` ni `styles.css` ouverts en écriture ;
aucun `id` ajouté.**

---

## 1. Ce qui a été fait

Un bandeau `.dkr-fbar` injecté dans `#tab-pile`, juste **au-dessus de
`#pileList`** : à gauche les puces de filtre, à droite « Trié par » + le tri
courant. Reconstruit à chaque `paint()` (donc à chaque `renderList` via
`renderPileTab`), il lit son état sur les mêmes variables que l'entonnoir natif.

**Les puces de type** — `Tous`, puis chaque type présent avec son compte
(`Notes · 7`, `Liens · 36`, `YouTube · 5`…). Exactement la logique de
`renderFilterBand()` : compteurs sur `scopeRows()`, la valeur posée reste
proposée même à zéro, les autres n'apparaissent qu'avec un compte. Une puce
cliquée fait `typeFilter=k; renderPileTab()`. Les libellés viennent de
`TYPE_FILTERS` — l'entonnoir `#filterBtn` reste en place pour la **source**, et
les deux ne peuvent pas se contredire puisqu'ils lisent le même `typeFilter`.

**Le tri** — libellé « Trié par » + un bouton qui affiche `SORT_LABEL[sortMode]`
(« Récents »…) et un chevron. Il délègue à `toggleViewBand()` : c'est le panneau
où « Trier » vit déjà (celui du titre et du ⇅ de la surface). Aucun menu neuf.

---

## 2. Les deux décisions posées — et tranchées

Guillaume a répondu « décide pour moi » aux deux. Décisions prises et assumées :

### « Non classés » → issue 1 (branchée sur l'existant), **livrée**

Ce n'est **pas un axe de type** mais un **périmètre** : `pileLoc="none"`, celui
qu'ouvrent déjà l'index de Collection (l'entrée « Non classés »), la surface
« à ranger » et la tuile de stats — tous via `enterCollection("none")`. La puce
réemploie ce chemin :

- **aucun mensonge** : `enterCollection("none")` ouvre un vrai périmètre, donc
  compteurs, état vide et sélection par lot restent justes ;
- **aucune ligne dans `app.js`** : `enterCollection`, `unfiledDue`, `pileLoc`
  sont tous globaux, lus/appelés depuis la surcouche ;
- c'est un **raccourci de navigation**, pas une bascule de filtre — et l'UI le
  dit : la puce est en **pointillé** (`.dkr-fchip-scope`, la convention « à
  ouvrir » déjà employée pour le « à ranger » des lignes), placée à part juste
  après « Tous », et on en **sort par le bouton de retour de la surface**, comme
  de n'importe quelle collection ouverte ;
- elle ne s'affiche qu'où elle a un sens — l'accueil de la pile et le périmètre
  « none » lui-même —, jamais au milieu d'une catégorie ou d'un tag, où un compte
  global de non-classés n'aurait rien à voir.

**Conséquence assumée** : dans le périmètre « none », « Tous » (type-all) **et**
« Non classés » (périmètre) sont tous deux actifs. Ce n'est pas un bug : ce sont
deux axes différents — on regarde *tous les types* *dans* le périmètre des
non-classés. C'est fidèle à l'état réel.

### « + Tag » → issue 3 (non livrée)

Aucun axe de filtre par tag n'existe dans Ma pile : le seul chemin des tags est
`enterTag()`, atteint depuis **l'index des tags**, pas depuis un sélecteur en
ligne. Livrer « + Tag » demanderait soit une UI de sélection neuve (au-delà du
modèle « déléguer à l'existant » de la surcouche), soit de rebaptiser l'entonnoir
de **source** en « Tag » — ce qui serait faux. La **source reste atteignable**
par l'entonnoir `#filterBtn`, laissé en place au bureau. La puce n'est donc pas
posée, et c'est écrit ici plutôt que codé à moitié.

---

## 3. Ce qui a été mesuré (à 1400 px, sur `index-desktop.html`)

Mesuré, pas regardé (captures non compositées — artefact n°1). Animations purgées
avant chaque mesure de position (artefact n°2 : la piste horizontale se translate).

| Vérification | Résultat |
|---|---|
| Le bandeau se pose sous l'en-tête, sur la colonne | **passe** — `x=264` (bord de colonne = rail 236 + 28), `right=1372` (gouttière 28), largeur 1108, inséré juste avant `#pileList`. |
| Puces de type : libellés et compteurs de `scopeRows()` | **passe** — `Tous · Notes 7 · Liens 36 · YouTube 5`, ordre canonique de `TYPE_FILTERS`. |
| Clic « Notes » filtre en place | **passe** — `typeFilter=note`, puce active, 7 lignes affichées (= son compte). |
| Bouton de tri ouvre le panneau « Trier » | **passe** — clic → `viewOn=true`, `#viewBandPile.open`, groupe `Trier` présent. |
| Puce « Non classés » (pointillé, compte) | **passe** — au home : pointillée, compte 3 = `unfiledDue()`. Clic → `pileLoc="none"`, surface scopée, titre « Non classés », 3 lignes ; dans le périmètre, la puce est pleine et active. Sortie par `#scopeBack` : retour propre (`pileLoc="all"`). |
| Idempotence | **passe** — après deux `renderAll` : un seul `.dkr-fbar`, une seule puce de périmètre, 5 puces au total. |
| Invisible sur Collection | **passe** — le nœud vit dans `#tab-pile` ; quand Collection est courant il est translaté hors champ (`x=1408 > 1400`, hors écran), pas seulement masqué. |
| Repli sous 1100 px | **passe** — au chargement à 1000 px, `paint()` sort avant `pileBar()` : le bandeau n'est jamais créé. Franchissement descendant (invérifiable par `resize`, testé à la main) : un `.dkr-fbar` laissé en place passe à `hidden=true` au repaint. |
| Console | **passe** — aucune erreur `[desktop-v2]` ; seuls deux 404 d'icônes préexistants, sans rapport. |

---

## 4. Non vérifié, déclaré

- **Le rendu au pixel du thème sombre** — le CSS n'emploie que des tokens
  (`--surface`, `--border-2`, `--accent`, `--accent-ink`, `--text-2/3`, `--mono`),
  donc juste par construction ; la confirmation à l'œil reste bloquée par
  l'artefact n°3 (valeurs `var()` calculées périmées).
- **Le franchissement du seuil à la souris** (`resize_window` n'émet aucun
  événement, artefact n°4). Rendu initial fidèle aux deux largeurs testées.
- **La capture d'écran** — le volet ne composite pas ; tout est passé par la
  mesure.

---

## 5. Décision restante et pistes

- **« + Tag »** reste ouverte si un jour on veut un vrai filtre par tag : ce
  serait l'issue 2 (un axe `tagFilter` en ligne dans Ma pile — il touche
  `app.js`, donc hors surcouche). À décider plus tard.
- **Redondance mineure** : l'entonnoir natif `#filterBtn`, gardé pour la source,
  réaffiche aussi les types quand on l'ouvre. Pas de contradiction d'état (même
  `typeFilter`, mêmes libellés), mais deux endroits pour le même axe. À fondre le
  jour où la source rejoint le bandeau permanent.

---

## 6. Fichiers touchés

- `desktop-v2.js` — section 6 : `pileBar()` (puces de type + « Non classés » +
  tri) ; `pileBar()` ajouté à `paint()` ; `.dkr-fbar` ajouté à la liste de repli
  sous 1100 px.
- `desktop-v2.css` — section 6 : `.dkr-fbar`, `.dkr-fchips`, `.dkr-fchip`
  (+ `.dkr-fchip-scope` en pointillé), `.dkr-fc-n`, `.dkr-fsort*`.
- `sw.js` — `APP_CACHE` déjà à v98 (ticket A).

Prochaine étape : ticket C (l'habillage des paliers de date, CSS seul).
