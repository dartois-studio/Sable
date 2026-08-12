# Reprise — desktop v2, la suite de la maquette

**Écrit le 12 août 2026, pour être lancé depuis une autre session (autre compte)
branchée sur le même dossier `C:\Users\Guillaume\source\repos\Sable`.**

Ce document est **autonome**. La maquette d'origine (`Sable desktop v2.dc.html`,
projet Claude Design `b37aef69-9fd4-42d7-b609-6a792abba868`) vit sur un autre
compte et **n'est pas accessible** depuis la session de reprise : toutes ses
cotes utiles sont recopiées ici, au §5. Ne pas la chercher, ne pas essayer de
s'y connecter.

À lire avant tout : `CLAUDE.md` (nature du travail, invariants, harnais local) et
`docs/passation-desktop-v2.md` (ce que la surcouche fait déjà, et pourquoi).

---

## 0. Le message à coller en premier, dans la session de reprise

> On travaille le desktop de Sable. Lis `CLAUDE.md`, puis
> `docs/roadmap-desktop-v2-suite.md` et suis-le. Périmètre : `index-desktop.html`,
> `styles-desktop.css`, `desktop-v2.css`, `desktop-v2.js` — **ne touche ni
> `app.js` ni `styles.css`**, la surcouche enrichit, elle ne modifie pas. Lance le
> proto local et vérifie sur `index-desktop.html` à 1400 px. Commence par le
> ticket A.

---

## 1. Le cadre, en une phrase

Sable est un **prototype évolutif sur le chemin de production** : ce qui est
décidé ici doit être livrable tel quel. Le desktop v2 est livré en **surcouche**
(`desktop-v2.css` + `desktop-v2.js`, chargés après les fichiers existants) :
retirer les deux lignes de `<link>`/`<script>` de `index-desktop.html` rend
exactement l'écran d'avant. C'est l'interrupteur d'arrêt, et il ne se négocie pas.

**Ne pas ouvrir** `app.js` ni `styles.css` en écriture. Si un ticket semble
l'exiger, c'est le ticket qui est mal posé : le dire plutôt que de le coder.

---

## 2. Où en est le chantier — ce qui est DÉJÀ fait

Vérifié dans le code le 12 août 2026. Ne pas refaire :

- rail de 236 px (`--dk-rail`), plafond de 760 px tombé, gouttière de fiche
  reprise seulement quand une fiche est ouverte (`:has(#appSheet.open)`) ;
- **index de Collection en tableau** à sept colonnes, en-tête `.dkr-head`
  compris, posé par `enrichIndex()` dans `desktop-v2.js` ;
- les trois états de ligne : pastille des neufs, `opacity:.55` + badge
  « endormie » (≥ 14 j), « Vide — rien encore rangé ici » ;
- barre de volume pilotée par `data-fill` (0 à 10), largeurs dans le CSS ;
- **Ma pile en cinq colonnes** (`enrichPile()`), sous-titre regroupé en cellules,
  puce teintée de catégorie ;
- décompte en mono à côté du titre (`counts()`) ;
- bandeau de remontée enrichi (titres sous vignettes, compte, sortie ✕).

**Les paliers de date existent déjà nativement** dans `app.js` (fonction de
palier vers la ligne 2938 : « Aujourd'hui » · « Cette semaine » · « Ce mois » ·
« {Mois année} »). Il n'y a que leur habillage à poser.

---

## 3. Ce qui reste — quatre tickets, dans cet ordre

L'ordre est celui de l'effet visible. Faire A en entier, montrer, puis B.

### Ticket A — la barre d'outils permanente de l'en-tête

**Ce que la maquette montre** : dans l'en-tête, à droite du titre et du
décompte — un champ « Chercher » avec son `kbd /`, un segment de trois formes,
une roue crantée. Aujourd'hui ces trois réglages passent par le bandeau « Vue »
qu'on déplie depuis le titre.

**Chemin d'implémentation** : dans `desktop-v2.js`, une fonction `tools()` qui
insère un nœud `.dkr-tools` dans `#tbRow` (idempotent, marqueur `data-dkr`), et
qui **délègue aux fonctions existantes** de `app.js` — aucune logique nouvelle :

| Contrôle | Ce qu'on appelle | Où c'est dans `app.js` |
|---|---|---|
| Segment de forme, Collection | `setIndexView("list"\|"cards"\|"mosaic")` | l. 1954 |
| Segment de forme, Ma pile | `setPileView(v)` | l. 1937 |
| Tri, Collection | `setIndexSort(v)` | voir `IDX_SORTS` |
| Tri, Ma pile | `sortMode=v; renderPileTab();` | l. 1867, même geste que le bandeau |
| Roue crantée | `document.getElementById("settingsBtn").click()` | existe déjà dans l'en-tête |
| Champ « Chercher » | `document.getElementById("searchBtn").click()` | idem |

Les clés et libellés se lisent dans `app.js` : `IDX_VIEWS`, `IDX_KEYS`,
`PILE_VIEWS`, `PILE_KEYS`, `IDX_SORTS`, `SORT_GROUPS`, `SORT_LABEL`. **Les
recopier, jamais les réinventer** : un libellé divergent entre la barre et le
bandeau est un bug d'interface.

L'état courant à refléter sur le segment se lit sur `indexView` / `pileView` /
`indexSort` / `sortMode` — ce sont des `let` de portée script, donc lisibles par
leur nom nu depuis `desktop-v2.js` (même réalité globale). `paint()` étant déjà
accroché à `renderAll`, `setIndexView`, `setPileView`, etc., la barre se remet à
jour toute seule ; il suffit d'ajouter `tools()` dans `paint()`.

**Piège nommé** (invariant v2.44) : le champ de recherche de la maquette est
permanent, mais `#tbSearch` est piloté par `hidden`. **Ne pas** poser de
`display:` sur `#tbSearch` — ça rendrait la recherche impossible à refermer.
Faire un faux champ `.dkr-search` (un `<button>` qui a l'air d'un champ) qui
déclenche `#searchBtn`, et que le CSS replie quand `#tbSearch` est ouvert.

**Le `kbd /`** ne doit être affiché que si la touche marche vraiment. Vérifier
dans `app.js` qu'un gestionnaire `/` existe ; s'il n'existe pas, **ne pas
l'ajouter** (ce serait un gestionnaire clavier neuf, hors surcouche) — retirer le
`kbd` de la barre et le dire dans le compte rendu.

**Ce que ça casse ailleurs** : rien sous 1100 px si tout le CSS est sous
`@media (min-width:1100px)` et si `paint()` replie les nœuds injectés quand
`DK.matches` est faux — le mécanisme existe déjà, ligne 313 de `desktop-v2.js` :
**ajouter `.dkr-tools` à cette liste de `hidden`**. C'est l'erreur la plus facile
à commettre.

### Ticket B — le bandeau de filtres de Ma pile

**Ce que la maquette montre** : une rangée de puces sous l'en-tête —
Tout · Non classés · Liens · Notes · + Tag — et à droite « Trié par » + le tri
courant.

**Chemin** : mêmes axes que `renderFilterBand()` (`app.js` l. 2730) —
`typeFilter` (voir `TYPE_FILTERS`, `isMediaType`) et `sourceFilter`. Les
compteurs par type se calculent comme là-bas, sur `scopeRows()`. Une puce
cliquée fait `typeFilter=k; renderPileTab();`. Le « Trié par » est le même
contrôle que dans le ticket A.

**⚠ La puce « Non classés » est une décision à prendre, pas une tâche.** Ce
n'est pas un axe de filtre existant : le tri des lignes se fait dans `app.js`.
Une surcouche ne peut l'ajouter qu'en masquant des lignes après rendu — et alors
les compteurs, l'état vide et la sélection par lot mentent. **Demander à
Guillaume de trancher** entre :

1. la brancher sur le mécanisme « À trier » qui existe déjà (`#inboxBtn`,
   `unfiledDue`) — recommandé, aucun mensonge ;
2. la livrer comme vrai axe au prix d'une ligne dans `app.js` — hors mandat
   actuel, donc à autoriser explicitement ;
3. ne pas la livrer, et le dire dans le compte rendu.

**Ne rien coder pour cette puce avant la réponse.** Tout le reste du ticket B ne
dépend pas d'elle : le faire d'abord.

### Ticket C — les paliers de date, l'habillage

Purement CSS dans `desktop-v2.css`. Les séparateurs sont déjà émis par `app.js`
(§2). Leur donner la forme de la maquette : mono 10 px, graisse 500,
interlettrage .11em, capitales, couleur texte-3, suivi d'un filet de 1 px qui
prend la largeur restante ; hauteur 34 px, 8 px de marge haute.

Trouver la classe réelle du séparateur dans le DOM rendu avant d'écrire le
sélecteur — la deviner ferait une règle morte.

### Ticket D — le détail des lignes

Par ordre décroissant d'utilité :

1. **le `⋯` en bout de ligne** de Ma pile et de l'index. Il existe déjà pour les
   items (la porte de l'appui long, v2.49) : le sortir en colonne au bureau
   plutôt que d'en créer un ;
2. **l'étoile d'épinglage** dans la ligne d'index, si le champ existe déjà
   (`settings.pinnedViews` ou équivalent) — sinon, ne pas l'inventer ;
3. **« Mis de côté » / « Corbeille »** en deux liens côte à côte sous le tableau
   (aujourd'hui deux rangées `.rowlink` empilées) : CSS seul, `desktop-v2.css`
   l. 178 est déjà le bon endroit ;
4. **le libellé de colonne** : la maquette dit « À ranger », le code dit
   « Neufs ». Trancher avec Guillaume — c'est du vocabulaire produit, et les deux
   mots ne désignent pas la même chose (cf. §4 de la passation, le piège
   « ranger » ≠ « non classé »).

---

## 4. Les règles de fabrication, non négociables

- **Aucune cote CSS posée depuis JS.** Le JS pose des classes et des attributs
  `data-*`, le CSS tient les dimensions (leçon v2.47). Seule exception tolérée,
  déjà en place : `--ci-h` sur la puce de catégorie, comme `catNodeHTML` le fait.
- **Aucune couleur en dur.** Les hex du §5 sont la *maquette* ; dans le code, les
  remplacer par les tokens de `styles.css`. Repérer la correspondance en lisant
  le bloc `:root` de `styles.css` — et **ne jamais redéfinir un token** dans la
  surcouche.
- **Tout le CSS bureau sous `@media (min-width:1100px)`.** En dessous, l'app
  redevient exactement la version mobile.
- **Idempotence.** Marqueur `data-*` sur chaque nœud enrichi : un double rendu ne
  double aucune cellule.
- **Les repeintures partielles ne passent pas par `renderAll`.** S'accrocher
  aussi à `repaintCatNodes` et `repaintIdxNodes` (piège v2.20) — la liste
  d'accroche est en bas de `desktop-v2.js`, l. 327.
- **`body` reste le défileur.** Ne créer aucun conteneur défilant.
- **Une règle `display:` sur une cible masquable réclame son annulation** (v2.44).
- **Pas de champ nouveau.** Tout ce qui peut se dériver d'`items` se dérive :
  aucune migration, rien à écrire en base.
- **Ne pas ajouter d'`id`** dans `index-desktop.html` : les deux pages portent les
  mêmes 67 `id` dans le même ordre, et `app.js` tombe entier sur un `id` manquant.
- **Bumper le cache de `sw.js`** à la fin, si des fichiers changent.

---

## 5. La maquette, en cotes — puisqu'elle n'est pas consultable

Deux écrans de 1440 × 900 : Collection et Ma pile. Fond `#F7F2E9`, texte
`#20190F`, `line-height:1.45`, familles `Geist` et `Geist Mono`, wordmark en
`Sable Display` (le `@font-face` est déjà dans `styles.css`, l. 2).

**Correspondance des teintes** (à confirmer contre le `:root` de `styles.css`) :
`#F7F2E9` fond · `#FFFDF9` surface · `#F1EADC` surface enfoncée · `#F3E7D1`
accent adouci · `#E7DDCB` bord fort · `#DBCFB8` bord · `#EFE7D8` filet de ligne ·
`#20190F` texte · `#6D6353` texte-2 · `#9C8F79` texte-3 · `#AE7127` accent ·
`#C79A5E` accent en aplat (remplissage de la barre de volume).

### Rail — 236 px

`background:#FFFDF9`, bord droit 1 px, `padding:22px 14px 16px`, `gap:3px`.
Wordmark 26 px + `sup` mono 9,5 px (marge haute 4 px). Boutons d'onglet : 14 px
graisse 500, `padding:11px 12px`, rayon 11, icône 20 px ; actif
`background:#F3E7D1;color:#AE7127`, inactif `color:#9C8F79`, survol
`background:#F1EADC`. Bloc raccourcis en bas (`margin-top:auto`),
`padding:14px 10px 2px`, bord haut, `gap:7px`, 11,5 px ; titre mono 10 px
interlettrage .11em capitales ; `kbd` mono 10,5 px, fond `#F1EADC`, bord,
rayon 5, `padding:1px 5px`, marge droite 5 px ; lien « Version mobile » mono
10 px capitales.

### Colonne de contenu

`left:236px; right:0; padding:0 28px 40px`.

**En-tête** : `display:flex; align-items:center; gap:16px; min-height:64px;
padding:14px 0 10px`, bord bas 1 px.
- titre : 22 px, graisse 700, interlettrage −.025em, chevron 16 px (trait 2,2)
  couleur texte-3 ;
- décompte : mono 11 px texte-3, interlettrage .02em, la part accentuée en accent ;
- champ de recherche : hauteur 32, `padding:0 11px`, surface, bord, rayon 12,
  **largeur 230**, icône 15 px, texte 13 px texte-3, `kbd` mono 10 px à droite ;
- segment : `gap:3px; padding:3px`, fond `#F1EADC`, rayon 15 ; boutons hauteur 26,
  `padding:0 11px`, rayon 10 ; actif fond accent, texte blanc, 12,5 px graisse 600 ;
  inactif texte-2 graisse 500 ;
- roue : 32 × 32, rayon 11, icône 17 px, survol fond `#F1EADC`.

**Tableau de l'index** :
`grid-template-columns: 32px minmax(0,1fr) 232px 96px 140px 84px 36px`.
- en-tête : hauteur 30, bord bas fort, mono 10 px graisse 500 interlettrage .11em
  capitales texte-3 ; libellés : (vide) · Catégorie (retrait 12) · Dernier rangé ·
  À ranger (aligné à droite, marge droite 16) · Volume (retrait 16) · Maj (droite) ·
  (vide) ;
- ligne : hauteur **36**, bord bas `#EFE7D8`, survol fond `#F1EADC` ;
- chevron : 15 px texte-3, tourné de 180° quand replié ;
- avatar : 22 × 22, rayon 7, 10,5 px graisse 600, fond `hsl(h 42% 90%)`, texte
  `hsl(h 48% 32%)` — c'est exactement ce que `catHue` produit déjà ;
- nom : 13,5 px graisse 500 interlettrage −.01em, coupé par ellipse ;
- étoile d'épinglage : 12 px, pleine, en accent ;
- badge « endormie » : mono 9,5 px capitales, bord, rayon 5, `padding:1px 6px` ;
- « dernier rangé » : mono 10,5 px texte-3, ellipse, marge droite 12 ;
- pastille « à ranger » : mono 10 px graisse 600, `padding:2px 8px`, rayon 5,
  fond `#F3E7D1`, texte accent, précédée d'un point de 5 px ;
- volume : barre `flex:1`, hauteur 3, rayon 2, fond `#E9E0CE`, remplissage
  `#C79A5E` ; nombre mono 10,5 px chiffres tabulaires, largeur 22, à droite ;
- maj : mono 10,5 px texte-3, à droite ;
- `⋯` : 17 px, couleur `#DBCFB8`, survol texte.

**Ligne « Nouvelle catégorie »** : carré 22 × 22 rayon 7 en pointillé avec un
`+` de 13 px, texte 13,5 px texte-3, sur la même grille.

**Pied de tableau** : `display:flex; gap:28px; padding-top:18px` ; deux boutons
13 px texte-2 avec leur compte en mono 11 px texte-3.

**Rangée de filtres de Ma pile** : `padding:12px 0`, `gap:8px` ; puces hauteur 28,
`padding:0 12px`, rayon 9 ; actif fond accent texte blanc 12,5 px graisse 600 ;
inactif bord `#DBCFB8` fond surface texte-2, survol bord et texte en accent ;
compte en mono 10,5 px texte-3 ; « + Tag » en pointillé ; à droite « Trié par »
en mono 10,5 px capitales interlettrage .08em, puis le bouton de tri (hauteur 28,
chevron 13 px).

**Tableau de Ma pile** :
`grid-template-columns: 30px minmax(0,1fr) 152px 176px 72px 88px 36px`,
en-tête hauteur 28 — Item · Catégorie · Tags · Type · Gardé (à droite).
- ligne : hauteur 36, mêmes bords et survol que l'index ;
- icône de type : carré 22 rayon 6, fond `#F1EADC`, bord `#E7DDCB`, svg 13 px ;
- titre : 13,5 px, ellipse, marge droite 24 ;
- catégorie : puce 8 × 8 rayon 3 teintée + nom 12 px graisse 500 texte-2 ;
- « à ranger » : mono 10 px capitales, `padding:2px 9px`, rayon 5, texte accent,
  **bord 1 px en pointillé accent** (le pointillé est la convention « à poser ») ;
- tags : mono 10,5 px texte-3 ; type : mono 10 px capitales texte-3 ;
  gardé : mono 10,5 px chiffres tabulaires, à droite.

**Palier de date** : `height:34px; padding-top:8px; gap:12px`, mono 10 px
graisse 500 interlettrage .11em capitales texte-3, suivi d'un filet de 1 px
`#EFE7D8` en `flex:1`.

**FAB** : 52 × 52, rayon 17, `right:28px; bottom:26px`, fond accent, icône 23 px
(trait 2,2), ombre `0 10px 34px -14px rgba(70,50,20,.4), 0 2px 8px -3px rgba(70,50,20,.14)`.

**Ce que la maquette ne montre pas** : le panneau de fiche (les deux écrans sont
sans fiche ouverte). Ne rien en déduire — c'est un morceau à part, pas dans cette
roadmap.

---

## 6. Voir et vérifier

**Lancer** : `preview_start` avec la configuration `sable-static` (ou double-clic
sur `.claude/proto.cmd`). Bureau : `http://localhost:5599/index-desktop.html`.
`?fresh` remet le corpus à zéro. Tout est expliqué au §6 de `CLAUDE.md` — le
harnais ne tourne que sur localhost et `.claude/` est ignoré par git.

**Vérifier à 1400 px de large.** Mesurer, pas regarder : comparer les
`getBoundingClientRect` de l'en-tête et des lignes, lire `gridTemplateColumns`.

Les quatre artefacts connus du volet Navigateur sont décrits au §5 de
`CLAUDE.md` — les relire avant de conclure à un bug. En particulier :
`resize_window` **n'émet aucun événement**, donc tout ce qui réagit au
franchissement du seuil de 1100 px (`DK.addEventListener`) est invérifiable par
ce chemin : recharger à la largeur voulue teste le rendu initial, et le reste se
déclare **non vérifié**.

### Liste de contrôle à dérouler avant de dire que c'est fait

1. barre d'outils : le segment reflète la forme courante, et la changer redessine
   la liste sans doubler de cellule ;
2. le bandeau « Vue » déplié depuis le titre et la barre d'outils **ne se
   contredisent pas** (mêmes libellés, même état) ;
3. le faux champ de recherche déclenche `#tbSearch`, et disparaît pendant que la
   vraie recherche est ouverte ; `Échap` referme comme avant ;
4. Collection → Cartes → Mosaïque → retour en Liste : en-tête de colonnes qui
   disparaît et revient, zéro cellule en double ;
5. déplier un aperçu (chevron) : le tiroir reste en `dens-dense`, non aligné sur
   les colonnes du dessus — c'est voulu ;
6. Ma pile en compact puis en galerie : aucune règle de tableau ne s'applique ;
7. ouvrir une fiche : `body` reprend sa gouttière droite, FAB et toast reculent ;
8. sélection par lot : la `.batchbar` va du rail au bord droit ;
9. **recharger à 1000 px** : aucun nœud de la surcouche visible en texte nu,
   l'écran est exactement le mobile ;
10. thème sombre : passer par `settings.theme=…; applyTheme();` (jamais par
    `setAttribute('data-theme')`, §5.3 de `CLAUDE.md`).

Chaque point se dit **passe** ou **ne passe pas**. « Non vérifié » est une
information utile ; « ça marche » sans preuve est une dette.

---

## 7. Décisions qui appartiennent à Guillaume

À poser, pas à trancher seul :

1. **la puce « Non classés »** — les trois issues du ticket B ;
2. **« À ranger » ou « Neufs »** comme libellé de colonne d'index ;
3. **la règle des neufs elle-même** — `FRESH_DAYS=7` et `SLEEP_DAYS=14` en tête
   de `desktop-v2.js`. C'est la décision produit qui reste depuis le ticket #8 ;
   si elle change, c'est `statsFor()` qui bouge, huit lignes.

---

## 8. À la fin

Écrire le compte rendu dans `docs/` (sur le modèle de
`passation-desktop-v2.md`) : ce qui a été fait, ce qui a été **mesuré**, ce qui
reste non vérifié, et les décisions encore ouvertes. Mettre à jour le §7 de
`CLAUDE.md` (« Où en est le chantier »). Ne pas commiter sans le demander.

**Prochaine étape structurelle, hors de cette roadmap** : fondre
`index-desktop.html` dans `index.html` (une seule page, la mise en page suit la
largeur) et dédoublonner le bloc de configuration présent en deux exemplaires.
Vérifié : les deux pages portent les mêmes 67 `id` dans le même ordre.
