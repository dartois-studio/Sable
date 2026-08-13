# Fusion `index-desktop.html` → `index.html` — une seule page

13 août 2026. L'étape structurelle annoncée au §7 de `CLAUDE.md`. Elle est faite,
et l'ancienne page est supprimée (décision de Guillaume : suppression franche,
pas de redirection).

---

## 1. Ce qui a été fait

Cinq greffes dans `index.html`, reprises telles quelles de la page bureau :

| Greffe | Où |
|---|---|
| `data-shell="desktop"` sur `<html>` | ligne 8 |
| `styles-desktop.css` + `desktop-v2.css` | après `styles.css` |
| `.dk-railhead` + `.dk-keys` | dans `nav.tabs` |
| `#dkClose` + `#dkEmpty` | frères de `#appSheet`, **après** lui |
| `desktop.js` + `desktop-v2.js` | après `app.js`, avant la config |

Puis : `index-desktop.html` supprimé, le lien de `proto-rangement.html` redirigé,
les quatre en-têtes de fichiers qui disaient « Chargée UNIQUEMENT par
index-desktop.html » corrigés, `sw.js` passé en `sable-app-v99`.

**Le bloc de configuration Supabase n'existe plus qu'en un exemplaire.** C'était
la seconde moitié de l'étape : il était recopié à l'identique dans les deux pages,
avec un commentaire demandant de penser à les synchroniser à la main.

---

## 2. Deux points qui ne sont pas de la simple recopie

### `data-shell` change de sens

Il ne dit plus « on est sur un bureau » mais « la couche bureau est chargée ». Il
est posé à toute largeur.

Ce n'est pas un détail cosmétique : **la garde repose désormais entièrement sur la
requête de média.** Vérifié avant de fusionner — `styles-desktop.css` et
`desktop-v2.css` n'ont aucune règle hors `@media (min-width:1100px)`, et
`styles.css` ne contient aucune occurrence de `data-sheet` ni de `.dk-`.

Il aurait été plus propre de renommer l'attribut. Il ne l'a pas été : ~250
sélecteurs le portent, le renommer produisait un très grand diff pour aucun gain
de comportement. La contrainte est écrite dans les invariants à la place.

### Les JS bureau tournent maintenant sur téléphone

Leur garde d'entrée est `if(html.getAttribute("data-shell")!=="desktop")return;` —
elle ne mord plus. Les deux fichiers s'exécutent donc partout.

C'est sans conséquence **parce que** tout ce qu'ils font de visible est gardé une
seconde fois par `if(!DK.matches)` (matchMedia 1100 px). Une seule chose ne l'est
pas : `desktop.js` recâble `fabAdd`, `batchCat`, `batchTag` et `settingsBtn`.
Vérifié dans `app.js` — les quatre fonctions visées (`openCaptureSheet`,
`openBatchCatSheet`, `openBatchTagSheet`, `openSettingsSheet`) ne prennent aucun
paramètre et ne lisent pas `this`. Le recâblage est strictement équivalent.

**Conséquence pour la suite :** tout ajout à `desktop.js` / `desktop-v2.js` doit
être gardé par `DK.matches`, ou prouvé sans effet. Ce n'était pas vrai avant.

---

## 3. Le défaut que la mesure a trouvé

La fusion **cassait l'interrupteur d'arrêt**, et ça ne se voyait pas.

Avant : les quatre nœuds propres au bureau vivaient dans `index-desktop.html`.
Retirer la surcouche de `index.html` rendait l'app mobile, forcément — la page ne
les contenait pas.

Après : ils sont dans le gabarit commun. Retirer les deux `<link>` aurait laissé
`.dk-railhead`, `.dk-keys`, `#dkClose` et `#dkEmpty` **visibles en texte nu**, à
toute largeur — le wordmark du rail et la liste des raccourcis empilés au bas de
la barre d'onglets. La sortie de secours ne sortait plus.

Mesuré, pas deviné : en coupant les deux feuilles bureau à 390 px, 5 différences
apparaissaient sur 17 éléments.

**Correction** — `styles.css` masque les quatre par défaut :

```css
.dk-railhead,.dk-keys,.dk-close,.dk-empty{display:none}
```

et `styles-desktop.css` les rétablit au-dessus de 1100 px. Trois des quatre
posaient déjà leur `display:` explicitement ; `.dk-railhead` était le seul à s'en
remettre au défaut du `<div>` — il reçoit `display:block`. C'est l'invariant
« une règle `display:` sur une cible masquable réclame son annulation », appliqué
dans l'autre sens.

Le bloc `@media (max-width:1099px)` de `styles-desktop.css` qui masquait les quatre
est **supprimé** : il faisait double emploi, et deux endroits qui garantissent la
même chose finissent toujours par diverger.

---

## 4. Liste de contrôle

Mesures prises en rechargeant à chaque largeur (artefact n°4 : redimensionner
n'émet aucun événement, la voie « fenêtre étirée à la main » reste non vérifiée).

| # | Contrôle | Résultat |
|---|---|---|
| 1 | Les 70 `id` de l'ancienne page bureau sont sur la page fusionnée | ✅ 70/70, aucun manquant, aucun en trop |
| 2 | Aucun `id` en double (fatal en HTML) | ✅ 0 |
| 3 | Les 5 fichiers bureau se chargent | ✅ tous en 200 |
| 4 | Erreurs console | ✅ aucune (2× 404 sur `__dev/fixture.json` — le harnais cherche l'export perso absent, sans rapport) |
| 5 | **Mobile 390 px vs avant fusion** | ✅ **0 différence** sur 17 éléments × 17 propriétés calculées + géométrie |
| 6 | **Interrupteur coupé à 390 px vs avant fusion** | ✅ **0 différence** (était 5 avant la correction du §3) |
| 7 | **Bureau 1440 px vs ancienne page** | ✅ **1 différence sur 23**, voulue : `.dk-keys` fait 25 px de moins (lien « Version mobile » retiré — il aurait pointé sur lui-même) |
| 8 | Rail, en-têtes de colonnes, barre d'outils, tableau de pile à 1440 px | ✅ présents ; rail fixe 236 px, `.dk-railhead` `block` dans le rail, `.dk-keys` `grid` à 16 px du bas |
| 9 | L'app rend vraiment (les deux largeurs) | ✅ 48 items, 17 catégories, 53 lignes de pile |
| 10 | Aucune référence à `index-desktop.html` dans le code | ✅ (reste une mention historique, dans un commentaire) |

**Non vérifié, et il faut le dire :**

- **Aucune capture d'écran.** L'artefact n°1 s'est produit — le volet Navigateur
  n'était pas affiché, la page ne compositait pas. Tout ci-dessus est mesuré au
  `getBoundingClientRect` et au `getComputedStyle`, jamais regardé.
- **Le franchissement du seuil à la souris** (fenêtre étirée de 1000 à 1200 px).
  Invérifiable par cet outil, artefact n°4.
- **Aucun parcours interactif** : ouvrir une fiche, entrer dans un périmètre,
  lancer la remontée, sélectionner par lot. Seul le rendu initial est mesuré.
- **Le rendu sur un vrai téléphone.** 390 px dans un navigateur de bureau n'est
  pas un iPhone : ni le clavier virtuel, ni les zones sûres, ni le tactile.

---

## 5. Observation, sans rapport avec la fusion

À 1440 px, `body` a `overflow-y:hidden` alors que `#rise` est bien `hidden` et que
la règle qui le pose (`:has(#rise:not([hidden]))`) ne devrait pas s'appliquer.

**L'ancienne page bureau a exactement le même comportement** — vérifié en la
rejouant depuis git. Ce n'est donc pas une régression de la fusion, et ça n'a pas
été corrigé ici. À regarder un jour : soit le `:has()` se comporte autrement que
lu, soit la règle a un autre chemin. L'invariant « `body` reste le défileur » mérite
qu'on tranche.

---

## 6. Comment on l'enlève

`git revert` du commit suffit : la fusion est un seul commit, et le fichier
supprimé revient avec.

À la main, si besoin : retirer les deux `<link>` et les deux `<script>` de la
couche bureau dans `index.html`. Grâce au §3, l'app redevient exactement la
version mobile à toute largeur — c'est mesuré (contrôle n°6). Les quatre nœuds
restent dans le DOM, inertes et invisibles.
