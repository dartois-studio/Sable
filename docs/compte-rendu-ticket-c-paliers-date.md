# Compte rendu — ticket C, l'habillage des paliers de date

Écrit le 12 août 2026, à la suite des tickets A et B. **CSS seul**, une seule
règle refinée dans `desktop-v2.css`. Aucun JS, aucun `id`, ni `app.js` ni
`styles.css` touchés. `sw.js` déjà à v98 (session).

---

## 1. Ce qui a été fait

La classe réelle du séparateur, trouvée dans le DOM rendu avant d'écrire quoi que
ce soit : `<div class="tier" id="ptier-{k}">` dans `#pileList`, émis par `app.js`
(l. 3054), sous la garde `tiersOn()` (tri par date, hors corbeille). Cinq paliers
sur le corpus : Aujourd'hui · Cette semaine · Ce mois · juillet 2026 · juin 2026.

La **typographie de la maquette y était déjà** — `.tier` (styles.css l. 1675)
porte mono, graisse 500, interlettrage .11em, capitales, texte-3. On ne repose
donc que ce qui manquait :

- le **corps à 10 px** (le natif est à 10,5) — celui des deux en-têtes de colonnes
  du bureau (`.dkr-head`, `.dkr-thead`), pour que tous les libellés mono de la page
  s'accordent ;
- la **géométrie du bandeau** : `min-height:34px`, `padding:8px 4px 0` (8 px de
  respiration au-dessus), `gap:12px` entre le mot et le filet.

Le **filet** existait déjà (section 3, ajouté avec Ma pile) : `::after`, `flex:1`,
`height:1px`. Conservé tel quel. La règle a été **refinée en place** plutôt que
dupliquée — deux cotes pour un même sélecteur, c'est la dernière qui gagne en
silence (leçon v2.48 de styles.css).

---

## 2. Ce qui a été mesuré (à 1400 px, sur `index-desktop.html`)

Sur le premier palier « Aujourd'hui », `getComputedStyle` :

| Propriété | Mesuré | Maquette (§5) |
|---|---|---|
| police | `"Geist Mono"` | mono |
| corps | `10px` | 10 px |
| graisse | `500` | 500 |
| interlettrage | `1.1px` (= .11em à 10 px) | .11em |
| casse | `uppercase` | capitales |
| couleur | `rgb(156,143,121)` = `--text-3` | texte-3 |
| hauteur rendue | `34px` (`min-height:34px`) | 34 px |
| marge haute | `padding-top:8px` | 8 px |
| gouttière | `gap:12px` | 12 px |
| filet `::after` | `flex-grow:1`, `height:1px`, `--border`, largeur 1010 px | 1 px, largeur restante |
| étendue | `x=264` → `right=1372` (gouttière 28) | sur la colonne |

Tous les points **passent**. Console : aucune erreur (deux 404 d'icônes
préexistants, sans rapport).

---

## 3. Divergence assumée

Le filet emprunte le token `--border` (`#E7DDCB`), pas le `#EFE7D8` « filet de
ligne » de la maquette. Ce hex n'a **pas de token** dans `:root`, et l'invariant
interdit la couleur en dur comme la redéfinition d'un token. `--border` est le
token sémantique de filet, déjà porté par le bord bas des en-têtes de colonnes du
bureau : un seul token de ligne pour tout le tableau se lit plus net que les deux
tons de la maquette. Divergence délibérée, notée ici.

---

## 4. Non vérifié, déclaré

- **Thème sombre** : juste par construction (que des tokens), confirmation au
  pixel bloquée par l'artefact n°3.
- **Sous 1100 px** : la règle vit dans `@media (min-width:1100px)` ; en dessous,
  `.tier` reprend son habillage natif mobile par simple cascade — déterministe,
  non testé au runtime.

---

## 5. Fichier touché

- `desktop-v2.css` — section 3, la règle `#pileList .tier` refinée (corps 10 px,
  `min-height:34px`, `padding:8px 4px 0`). Le `::after` du filet inchangé.

Prochaine étape : ticket D (le détail des lignes — `⋯` en colonne, étoile
d'épinglage si le champ existe, « Mis de côté »/« Corbeille » côte à côte, et le
libellé « À ranger »/« Neufs » à trancher avec Guillaume).
