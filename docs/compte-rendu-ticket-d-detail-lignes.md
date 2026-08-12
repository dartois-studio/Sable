# Compte rendu — ticket D, le détail des lignes

Écrit le 12 août 2026, à la suite des tickets A, B et C. Surcouche : une seule
règle CSS ajoutée dans `desktop-v2.css` (le pied de tableau). Le reste du ticket
était **déjà en place** — vérifié plutôt que refait. Aucun JS, ni `app.js` ni
`styles.css` touchés. `sw.js` à v98.

Le ticket a quatre points, dans l'ordre d'utilité de la roadmap.

---

## 1. Le `⋯` en bout de ligne (index ET Ma pile) — DÉJÀ FAIT

Vérifié dans le DOM, pas deviné :

- **Index** : `catNodeHTML` (app.js l. 2041) émet `<button class="cdots">` dans
  `.cgut`, câblé à `openCatManageSheet`. Au bureau, `.cgut` est la 7ᵉ colonne
  (36 px) et `.cdots` y est déjà stylé. Mesuré : présent, visible, 36×36, `x=1336`
  (bord droit de la colonne).
- **Ma pile** : `.rdots` dans `.rgut` (`grid-column:7`), 36×36, `x=1336`,
  cliquable. Présent et visible.

Le `⋯` de l'appui long (v2.49) est donc **déjà sorti en colonne** au bureau, aux
deux endroits. Rien à ajouter — en créer un second aurait été le doublon que la
roadmap voulait éviter.

## 2. L'étoile d'épinglage dans la ligne d'index — DÉJÀ FAIT (champ existant)

Le champ existe : `settings.catPins` (dans `DEFAULT_SETTINGS`). `catNodeHTML`
pose `<span class="cpin">` quand la catégorie y figure, et `desktop-v2.css` la
dimensionne (`.cpin svg{width:12px}`).

Vérifié en épinglant une catégorie à la volée (`settings.catPins=[cat]` +
`repaintCatNodes()`, puis défait) : l'étoile apparaît, **12 px, couleur
`rgb(174,113,39)` = `--accent`** — exactement la maquette (§5 : « 12 px, pleine,
en accent »). Rien inventé : le champ et le rendu préexistaient, on ne fait que
confirmer qu'ils tiennent au bureau. L'épinglage se pose/retire depuis le `⋯`
(feuille de gestion), comme avant — la ligne l'AFFICHE, elle ne l'ouvre pas.

## 3. « Mis de côté » / « Corbeille » côte à côte — FAIT (CSS seul)

C'était le seul travail réel. Les deux `.rowlink` (`#openArch`, `#openTrash`)
étaient deux rangées **pleine largeur empilées**, chacune barrée d'un
`border-top`. Passées en `inline-flex` largeur auto, `border-top:0`, elles
tiennent sur **une même rangée**. Pas de conteneur neuf : elles étaient déjà
voisines dans `#rootBrowse`.

Mesuré (1400 px) :

| | mesuré | maquette (§5) |
|---|---|---|
| même rangée | oui (`sameRow`) | côte à côte |
| écart | `28px` | gap 28 |
| corps du lien | `13px`, `--text-2` | 13 px texte-2 |
| filet du haut | `0px` | (retiré) |
| compte `.n` | mono, `11px`, `--text-3` | mono 11 texte-3 |
| départ | `x=264` (bord de colonne) | sous le tableau |

Note : l'écart de 28 px est obtenu par `margin-right:24px` + l'espace du source
HTML entre deux `inline-flex` (~4 px, mesuré). La cote est dans un commentaire du
CSS pour qui relira.

## 4. Le libellé « À ranger » / « Neufs » — DÉCIDÉ : on garde « Neufs »

C'est la décision produit du ticket. Guillaume a délégué (« décide pour moi »).
**Je garde « Neufs », et je refuse « À ranger ».** Raison, la même que la
passation signalait :

- la colonne compte les items **fraîchement arrivés et pas encore revus**
  (`statsFor` → `fresh` : `!surfaceCount && âge < FRESH_DAYS`). C'est de la
  **fraîcheur**, pas du rangement ;
- « À ranger » veut dire « à classer » = **sans catégorie**. C'est un AUTRE
  concept — celui que le ticket B vient nommer « Non classés » dans le bandeau de
  Ma pile. Coller « À ranger » sur la colonne de fraîcheur ferait lire son compte
  comme un compte de non-classés : faux, et faux silencieusement ;
- tout le chantier va dans l'autre sens : le ticket A a déjà changé « à ranger »
  → « non classés » dans le pied de la remontée, précisément pour tuer cette
  collision. Renommer la colonne « À ranger » la rouvrirait.

**Décision réversible en un mot** : le libellé vit dans `desktop-v2.js`
(`indexHead`, `<span class="h-todo">Neufs</span>`). Si Guillaume préfère un autre
mot de *fraîcheur* (« Récents », « Frais »…), c'est une ligne. Mais pas
« À ranger ».

---

## 5. Non vérifié, déclaré

- **Thème sombre** au pixel : le CSS n'emploie que des tokens → juste par
  construction ; confirmation bloquée par l'artefact n°3.
- **Sous 1100 px** : la règle du pied vit dans `@media (min-width:1100px)` ; en
  dessous, les `.rowlink` reprennent leur empilement pleine largeur natif par
  cascade — déterministe, non testé au runtime.
- **Capture** : le volet ne composite pas ; tout par la mesure.

---

## 6. Fichier touché

- `desktop-v2.css` — section 2, le pied de tableau : `#rootBrowse #openArch` /
  `#openTrash` en `inline-flex`, `border-top:0`, `margin-top:18px`, `margin-right`
  24 px sur le premier, et `.rowlink .n` à 11 px. Rien d'autre.

Avec D, les quatre tickets de `roadmap-desktop-v2-suite.md` sont traités. Restent,
hors de cette roadmap : le panneau de fiche, le parcours de rangement au clavier
(`proto-rangement.html`), et l'étape structurelle de fusion
`index-desktop.html` → `index.html`.
