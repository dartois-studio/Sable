# Passation — desktop v2 « le plan de travail »

Surcouche prête à déposer, écrite le 11 août 2026 sur la base v3.03.
**Aucun fichier existant n'est modifié.** Deux fichiers neufs, deux lignes à ajouter.

---

## 1. Installer

Copier dans le repo, à côté de `styles-desktop.css` et `desktop.js` :

- `desktop-v2.css`
- `desktop-v2.js`

Puis dans `index-desktop.html`, deux lignes, chacune **après** son aînée :

```html
<link rel="stylesheet" href="./styles-desktop.css">
<link rel="stylesheet" href="./desktop-v2.css">   <!-- ← ajouter -->
```

```html
<script src="./desktop.js"></script>
<script src="./desktop-v2.js"></script>            <!-- ← ajouter -->
```

Et bumper le cache de `sw.js`. Retirer les deux lignes rend exactement l'écran d'avant :
c'est le seul mécanisme de retour arrière, et il suffit.

---

## 2. Ce que ça change, en trois décisions

**Le plafond de 760 px tombe.** `#app` prenait la largeur d'un téléphone au milieu d'un
écran de 1440. La colonne centrale occupe maintenant tout ce que le rail laisse. Le
panneau de droite ne réserve plus ses 374 px en permanence : `body` reprend son
`padding-right` **seulement** quand une fiche est ouverte, par `:has(#appSheet.open)` —
donc en CSS, sans que le JS ait à poser une cote. `.dk-empty` disparaît avec lui.

**L'index devient un tableau.** `.cline` passe en grille à sept colonnes : chevron ·
catégorie · dernier rangé · neufs · volume · maj · ⋯. Les quatre cellules neuves sont
posées par `desktop-v2.js`, qui les dérive de `items` — **aucun champ nouveau, aucune
migration**. Les trois états de la passation du ticket #8 arrivent avec : pastille accent
pour les neufs, `opacity:.55` pour une catégorie endormie (≥ 14 j), et « Vide — rien
encore rangé ici » à la place d'un « 0 » muet. Trois canaux distincts — couleur, opacité,
texte — donc ils se cumulent sans se brouiller.

**Ma pile aligne ses colonnes.** Le sous-titre en mono qui s'enroulait sous chaque titre
devient cinq colonnes sur la même verticale : item · catégorie · tags · type · gardé.
Le contenu ne change pas d'un caractère — `.body` et `.sub` passent en
`display:contents` et le JS regroupe les spans existants dans quatre cellules. La
catégorie perd son cadre (en colonne, la position dit déjà « ceci est un lieu ») et garde
sa puce teintée ; « non classé » garde son pointillé, c'est le seul état qui appelle une
action.

Lignes de 36 px au lieu de 48, méta en mono 10,5 px. Seule la **liste confortable** de Ma
pile devient un tableau : le compact, la galerie, les cartes, la mosaïque et les aperçus
de catégorie sont intouchés.

---

## 3. Les contraintes de §7 de la passation #8, une par une

1. **`body` reste le défileur** — aucun conteneur scrollable n'est créé. La sentinelle
   d'en-tête, `body.sheetlock` et l'observation du mini-FAB continuent de fonctionner.
2. **`closeSheet()`** — non concerné : `desktop-v2.js` ne touche à aucune feuille.
3. **Gardes clavier** — non concerné : aucun gestionnaire de touches ajouté.
4. **Aucune cote CSS depuis JS** — respecté. La barre de volume lit `data-fill` de 0 à 10,
   les onze largeurs vivent dans le CSS. La seule propriété posée depuis JS est `--ci-h`
   sur la puce de catégorie, exactement comme `catNodeHTML` le fait déjà.
5. **`index-desktop.html` copie du DOM de `index.html`** — respecté : les deux seules
   lignes ajoutées sont un `<link>` et un `<script>`, hors du corps de l'app. Aucun `id`
   nouveau, donc rien à resynchroniser.

Deux points d'attention repris de l'existant : les enrichissements sont **idempotents**
(marqueur `data-dkr`), et le JS s'accroche aussi à `repaintCatNodes` / `repaintIdxNodes` —
les repeintures partielles ne passent pas par `renderAll` (piège v2.20).

---

## 4. La décision qui reste à trancher

**La colonne « Neufs ».** Elle compte aujourd'hui les items arrivés depuis moins de
7 jours et jamais remontés (`!surfaceCount`). C'est une dérivation honnête des champs
existants, pas une vérité produit : la passation #8 disait déjà que la règle de
suggestion est la décision la plus importante qui reste. Les deux constantes sont
isolées en tête de `desktop-v2.js` :

```js
var SLEEP_DAYS=14;   /* endormie au-delà de 14 jours */
var FRESH_DAYS=7;    /* « neufs » : arrivés depuis moins d'une semaine */
```

Si la règle change, c'est `statsFor()` qui bouge — une fonction, huit lignes.

---

## 5. Vérifié — le 12 août 2026

> **Mise à jour.** Cette section disait « Non vérifié » : elle ne l'est plus. La surcouche
> a été posée et la liste ci-dessous déroulée contre l'app réelle (vrai `app.js`, vrai
> rendu, corpus d'amorce via le harnais local — voir `CLAUDE.md` §6). **Les six points
> passent.** Vérifié par mesure et non à l'œil (`getBoundingClientRect`,
> `gridTemplateColumns`) : en-tête et lignes partagent la même grille et les mêmes bords
> gauches, les cellules ne doublent sur aucune bascule de forme, le tiroir reste en
> `dens-dense`, `body` reprend ses 364 px à l'ouverture d'une fiche, aucune règle de
> tableau ne s'applique en compact ni en galerie, la `.batchbar` va du rail au bord droit.
> Idempotence tenue sur `renderAll`, `repaintCatNodes` et `renderList`.
>
> Deux défauts trouvés à cette occasion, et corrigés : `counts()` lisait
> `#tab-pile.hidden`, un signal que `paintTabs` a retiré (Collection ne montrait jamais
> son décompte de catégories) ; et sous 1100 px les deux en-têtes de colonnes injectés
> au-dessus du seuil restaient en texte nu.
>
> La maquette citée ci-dessous (`Sable desktop v2.dc.html`) **ne fait pas partie du
> dépôt** : elle vivait dans l'environnement de rédaction. Ne pas la chercher.

Le rendu avait d'abord été jugé sur maquette (`Sable desktop v2.dc.html`, 1440 × 900),
avec les vrais tokens et la vraie typographie, sans avoir tourné contre l'app réelle —
elle demandait une session connectée à Supabase, hors de portée à la rédaction. La liste
de contrôle, dans l'ordre :

1. l'index en liste : sept colonnes alignées, en-tête compris ;
2. basculer en Cartes puis en Mosaïque, et revenir : l'en-tête de colonnes disparaît et
   revient, aucune cellule en double ;
3. déplier un aperçu (chevron) : les lignes du tiroir restent en `dens-dense`, non
   alignées sur les colonnes du dessus — c'est voulu ;
4. ouvrir une fiche : `body` reprend sa gouttière droite, le FAB et le toast reculent ;
5. Ma pile en compact puis en galerie : aucune règle de tableau ne s'applique ;
6. sélection par lot : la `.batchbar` couvre bien du rail au bord droit.

---

## 6. Ce qui n'est pas fait, et devrait suivre

- **La barre d'outils permanente** (Liste / Cartes / Mosaïque, tri, chercher) : sur la
  maquette elle est dans l'en-tête ; ici le bandeau « Vue » existant fait le travail en un
  clic. Le porter demande de déplier `#viewBandCat` par défaut au bureau, donc de toucher
  au rendu du bandeau — un chantier à part.
- **Le bandeau de filtres de Ma pile** (Tout / Non classés / Liens / Notes) : même raison.
- **Le panneau de fiche** : inchangé. C'est le prochain morceau.
- **La colonne « revu N× »** : retirée de la ligne, elle reste dans la fiche.
