# Ticket — La remontée : une porte en bas, une phrase par jour, une feuille lisible

**État :** implémenté en trois commits, **liste de contrôle non déroulée** (§ 5) — rien n'a
encore été ouvert dans un navigateur.
**Branche :** `claude/remontee-ui-alternatives-4sw2nl`
**Origine :** rapport au pouce, 06/09/2026 — « je ne suis pas très satisfait du slide du bas
pour afficher la remontée, car c'est un geste utilisé pour actualiser les app. De plus le fait
d'avoir ce bandeau remontée à l'ouverture donne l'impression d'un bug de l'app. »
**Maquette validée :** https://claude.ai/code/artifact/1fc80fb3-db58-494b-8113-cb784daa8cb7

---

## 1. Le diagnostic : trois griefs, trois causes séparables

Le rapport en énonce deux et en implique un troisième. Ils ne partagent aucune cause, et
c'est ce qui rend le ticket découpable.

1. **Le geste.** Le tirage vers le bas (`RF_DAMP`/`RF_OPEN`/`RF_GRIP`, l'IIFE `/* ── le tirage ── */`
   d'`app.js`) mime le *pull-to-refresh*. Le réglage était bon — ferme, 310 px de course, aucune
   ouverture accidentelle — mais un geste juste dans une grammaire fausse reste faux.
2. **L'auto-ouverture.** `maybeOpenFrame()` déplie le cadre une fois par jour, ce qui **pousse le
   contenu** de la page à froid. Un objet qui apparaît seul en haut d'écran et décale tout se lit
   comme une panne, pas comme une attention.
3. **La lisibilité.** `renderRiseFrame` pose trois vignettes 3/4 **sans texte** — le titre ne vit
   qu'en `aria-label`. Le commentaire de `styles.css` l'assume (« à trois de front elle fait
   ~100 px, soit dix-huit caractères ») ; la conclusion tombe dès qu'on change la géométrie.
   Pire : `galleryThumb()` rend `""` pour un item sans média ni type reconnu — d'où un carré
   **vide et muet**, incompréhensible.

Un quatrième défaut, non signalé mais trouvé en route : **la remontée n'a jamais affiché l'âge
de ce qu'elle remonte.** Or c'est sa raison d'être — rappeler de *vieux* enregistrements.

---

## 2. Les décisions arrêtées

| Décision | Ce qui est retenu | Ce qui est écarté, et pourquoi |
|---|---|---|
| **Le canal** | Une **porte fixe** dans la barre d'onglets | Le cadre en haut de page : il pousse le contenu, c'est le grief n°2 |
| **La position** | **En bas à gauche** — « à gauche évoque ce qui est avant » | Le milieu : il déplaçait « Ma pile », l'onglet le plus fréquent |
| **L'ordre** | Remontée · Collection · Ma pile | — |
| **Le contenu** | Une **feuille** (`.sheet`), une ligne horizontale par item | Le carrousel : `overflow-x` heurte l'invariant « `body` reste le défileur » |
| **L'annonce** | Un **toast** une fois par jour, avec action « revoir » | Le dépliage automatique du cadre |
| **Le terme** | **« La remontée »**, conservé | « Le lever », « Le vent », « La fouille » — écartés au rapport : « la remontée évoque que l'app remonte ; la fouille, c'est quand on cherche nous-même, c'est pas ça » |
| **L'icône** | `circle-arrow-up` (Lucide), sous un id **neuf** | Écraser `#rise` : la flèche sert encore au kicker « remonté à la surface » de `renderStage` |
| **Une porte, jamais deux** | `#inboxBtn` **supprimé** de l'en-tête | Le garder : deux adresses pour une destination, le doublon que le projet paie depuis le début |

---

## 3. Le lot, en trois commits

Découpé pour que chaque morceau se révoque seul. **L'ordre compte** : le 3 supprime ce que le 1
remplace, donc le 1 doit être jugé avant.

### Commit 1 — la surcouche (réversible en deux lignes)

Motif « surcouche + interrupteur d'arrêt » du CLAUDE.md § 4. Deux fichiers **neufs**, chargés
après les existants ; aucun fichier en place n'est modifié sauf `index.html` (deux balises) et
`icons.svg` (un symbole).

**Fichiers neufs**

- `remontee.css` — la porte, la ligne, le repli sans image, la pastille du compte.
  ⚠ **Rien hors média** pour ce qui touche le rail : la règle bureau va sous
  `@media (min-width:1100px)` (invariant § 3).
- `remontee.js` — `openRiseSheet()`, `riseAgeLabel()`, `maybeAnnounce()`, le câblage de la porte.
  Chargé **après** `app.js` : il lit `riseFrameIds`, `items`, `riseVoidReason`, `openRemontee`.

**Fichiers touchés**

- `index.html` — le `<link>` et le `<script>` de la surcouche ; le 3ᵉ bouton en **tête** de `.tabs`.
- `icons.svg` — le symbole `resurface`, à la facture du sprite (24×24, `fill:none`, trait 2,
  bouts ronds) :

  ```html
  <symbol id="resurface" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="m16 12-4-4-4 4"/><path d="M12 16V8"/>
  </symbol>
  ```

**Le balisage de la porte** — le point le plus piégeux du lot :

```html
<button id="riseTab" class="risetab" aria-haspopup="dialog" aria-expanded="false">
  <svg class="ic"><use href="icons.svg#resurface"/></svg>Remontée
  <span class="rcnt" hidden></span>
</button>
```

⚠ **Pas de `data-tab`.** `selectTab()` (`app.js:4840`) pose `.active` d'après `dataset.tab`, et
`paintTabs()` translate le rail vers une fente indexée par `TAB_ORDER`. Un `data-tab="rise"`
ferait chercher une **troisième fente** dans `#tabTrack`, qui n'en a que deux — c'est le bug
exact de la v2.57, par l'autre bord. Sans l'attribut, `querySelectorAll(".tabs button")` de
`selectTab` retire simplement `.active` du bouton (`undefined !== name`), ce qui est le
comportement voulu.

### Commit 2 — l'écran

Le contenu de la feuille, la ligne, l'annonce. Vit dans les deux fichiers neufs du commit 1 ;
séparé pour que la forme se juge sans que la suppression soit déjà faite.

**La ligne** — quatre informations, aucune image obligatoire :

| Information | Source | Note |
|---|---|---|
| Vignette 52 px | `galleryThumb(it)` | **Repli obligatoire** : `srcTile(it)` puis le type en toutes lettres. Une vignette ne peut plus être muette. |
| Titre, 2 lignes | `displayText(it)` | `-webkit-line-clamp:2` — ~46 caractères contre 18 |
| Provenance | `hostOf(it.url)` ou `typeLabel(it)` | |
| **L'âge** | dérivé de `it.createdAt` | « il y a 3 ans », « il y a 8 mois ». **Aucun champ nouveau** (invariant § 3). |
| « 2× » | `it.surfaceCount` | en coin de vignette, seulement si > 1 |

**L'annonce** — `maybeAnnounce()` remplace `maybeOpenFrame()` : mêmes gardes (`settings.frameDay`,
seuil horaire `frameMins()`), même contrat, autre sortie.

```js
toast(`${n} item${n>1?"s":""} remonte${n>1?"nt":""} aujourd'hui`,
      {label:"revoir", fn:openRiseSheet});
```

`settings.frameDay` et `settings.frameMins` **gardent leur sens** — le réglage « heure d'arrivée »
survit intact, ce que les variantes D et E de l'étude lui retiraient.
⚠ L'annonce se tait si `riseOpen()` — on n'annonce pas un rituel déjà ouvert.

### Commit 3 — la dépose

La seule partie non réversible en deux lignes, donc isolée.

**`app.js`** — suppression de : `renderRiseFrame`, `riseFrameIds`*, `riseOpenAt`*, `armFrameIO`,
`commitTuck`, `untuckFrame`, `frameScrollTop`, `hintFrame`, `pingDot`, `toggleRiseFrame`,
`maybeOpenFrame`, `rearmFrame`, l'IIFE du tirage, et les constantes `RF_DAMP`/`RF_OPEN`/`RF_GRIP`
+ l'état `frameTucked`/`frameH`/`frameIO`/`frameAuto`/`frameAnim`.
*\* `riseFrameIds` et `riseOpenAt` **survivent, et restent dans `app.js`** — écart assumé par
rapport à la première rédaction de ce ticket, qui les déplaçait dans la surcouche. Elles lisent
et réordonnent `batch` : c'est de la logique de **tirage**, pas d'interface, et elle reste chez
sa donnée. La surcouche les appelle.*

**`index.html`** — `#riseFrame` et `#inboxBtn` retirés.
**`styles.css`** — le bloc v2.84/v2.85 (`.rfwrap` … `.rfhint`, `.bdg.ping`, `@keyframes bdgping`).
**Le chemin « N à ranger »** — il vivait en pied de cadre et dans la moitié « non classés » de
la pastille déposée ; il se reloge en ligne nommée au bas de l'index (`#openUnfiled` +
`#unfiledN`), à côté de « Mis de côté », et n'apparaît que s'il y a à ranger.
`enterCollection("none")` est inchangé.

**`app.js` + `sw.js`** — `APP_VERSION` **v3.08 → v3.09**, cache **`sable-app-v106` → v107**, et la
ligne de journal en tête d'`app.js` (invariant § 3 : le bump suit le déploiement).

---

## 4. Les quatre réponses du CLAUDE.md § 2

**1. Quels fichiers.**
Touchés : `index.html`, `icons.svg`, `app.js`, `styles.css`, `sw.js`, `desktop-v2.css`.
Neufs : `remontee.css`, `remontee.js`.
**Pas touchés** : `#rise`/`renderStage` (le rituel plein écran est hors périmètre), `desktop.js`,
`desktop-fiche.*`, `onboarding.*`, `styles-desktop.css`.

**2. D'où viennent les données.**
`riseFrameIds()`, `title`/`displayText`, `url`→`hostOf`, `type`→`typeLabel`, `createdAt`,
`surfaceCount`, `settings.frameDay`, `settings.frameMins` — **tous existants**.
**Aucun champ nouveau, aucune migration, rien à écrire en base.**

**3. Comment on l'enlève.**
Commits 1 et 2 : retirer les deux balises de `remontee.css`/`remontee.js` et le bouton de `.tabs`.
Commit 3 : `git revert` d'un commit isolé, qui rend `#riseFrame` et `#inboxBtn`.
Le symbole `resurface` peut rester dans le sprite — un symbole non référencé ne coûte rien.

**4. Ce que ça casse.**

- **Le rail bureau — point levé.** `styles-desktop.css:61` stylise `.tabs button` **génériquement**
  (`flex-direction:row`, `width:100%`, `padding:11px 12px`) : le 3ᵉ bouton hérite de la forme du
  rail **sans une ligne de plus**. Seule la pastille du compte, posée en `absolute` à `left:50%`
  pour la barre du bas, doit passer à droite du libellé dans la colonne — un bloc de ~4 lignes
  dans `desktop-v2.css`, sous `@media (min-width:1100px)`.
- **`selectTab` / `paintTabs`** — couverts par l'absence de `data-tab` (§ 3, commit 1).
- **L'invariant de la page unique** — un `id` retiré d'`index.html` fait tomber tout `app.js`.
  `#inboxBtn` est lu par `paintBadge`, `renderBadges`, `paintHeaderBtns` et `toggleRiseFrame` :
  les quatre lecteurs partent dans le **même commit** que la balise, jamais après.
- **Le réglage « heure d'arrivée »** — conservé et fonctionnel, il pilote maintenant l'annonce.
- **`body` reste le défileur** — rien dans ce lot ne crée de conteneur défilant. `.sheet` a son
  `overflow-y` interne, comme les six feuilles existantes.

---

## 5. Liste de contrôle, à dérouler avant de dire que c'est fait

Écrite **avant** l'implémentation, comme le veut le CLAUDE.md § 5.

**Mobile (< 1100 px)**

- [ ] La barre montre trois portes dans l'ordre Remontée · Collection · Ma pile.
- [ ] La porte porte l'icône `resurface` et le **chiffre** du jour ; à zéro, le chiffre disparaît
      mais **la porte reste**.
- [ ] Un tap ouvre la feuille ; le scrim, « Plus tard », Échap et le retour Android la ferment
      **par le même chemin** (`pushLayer`/`popLayer`, invariant v2.44).
- [ ] Chaque ligne montre vignette + titre sur 2 lignes + provenance + âge.
- [ ] **Un item sans image montre le blason de sa source**, jamais un carré vide. *(le grief n°3)*
- [ ] « Commencer la revue » ouvre le rituel ; la feuille se ferme d'abord.
- [ ] Taper une ligne ouvre le rituel **sur cet item** (`riseOpenAt`, comportement conservé).
- [ ] Un jour sans remontée : la feuille dit **pourquoi** (`riseVoidReason()`, ses quatre causes).
- [ ] L'annonce passe **une fois** par jour, après l'heure réglée, et **jamais** si le rituel est
      déjà ouvert.
- [ ] `#riseFrame` n'existe plus dans le DOM ; aucun tirage vers le bas ne déclenche quoi que ce soit.
- [ ] Le geste de piste (glissé horizontal entre onglets) est **intact** — c'est lui que le
      tirage concurrençait.
- [ ] Aucune erreur console au chargement : **le test qui prouve qu'aucun `id` n'a été perdu.**

**Bureau (≥ 1100 px, rechargé à cette largeur — artefact n°4)**

- [ ] La porte prend la forme du rail (ligne, icône à gauche, libellé à droite).
- [ ] La pastille du compte est à droite du libellé, pas au milieu.
- [ ] Le wordmark (`.dk-railhead`) et les raccourcis (`.dk-keys`) sont à leur place.

**Interrupteur d'arrêt**

- [ ] Les deux balises retirées → l'écran d'avant, sans erreur. *(à faire avant le commit 3)*

**Version**

- [ ] `APP_VERSION` v3.09, cache v107, ligne de journal écrite en tête d'`app.js`.
- [ ] `node --check app.js && node --check sw.js`.

---

## 6. Ce qui restera non vérifié

À écrire dans le compte rendu, pas à taire (CLAUDE.md § 5) :

- **Le franchissement des 1100 px à la fenêtre étirée.** `resize_window` n'émet aucun événement :
  seul le rendu initial à chaque largeur est testable. La bascule à chaud reste non vérifiée.
- **Le rendu sur un vrai téléphone.** Le proto local juge la forme, pas la zone du pouce ni la
  safe-area réelle. La position basse-gauche se juge à la main, pas au ruban.
- **L'annonce du lendemain.** Le seuil horaire ne se teste qu'en déplaçant l'heure du réglage ;
  le passage naturel d'un jour à l'autre ne sera vu qu'à l'usage.

---

## 7. Ce que ce ticket ne fait pas

- Il ne touche **pas** au rituel plein écran (`#rise`, `renderStage`, les quatre gestes de carte).
- Il ne touche **pas** à la mécanique du tirage du jour (`ensureBatch`, maturation 30 j,
  plancher 60 j, sourdine) : *ce qui* remonte ne change pas, seulement *comment ça s'annonce*.
- Il ne renomme **pas** « la remontée ». Le mot reste, à trois endroits (libellé de la porte,
  kicker de la feuille, kicker de la carte). Le symbole s'appelle `resurface` — un nom neutre
  qui survivra à un renommage éventuel, pour ne pas toucher le sprite deux fois.
- Il ne fond **pas** la surcouche dans les fichiers définitifs. Une surcouche est un échafaudage
  (CLAUDE.md § 4) : la fusion est un ticket à part, une fois la forme validée au pouce.
