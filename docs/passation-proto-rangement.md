# Passation — proto desktop « rangement »

Ticket #8 (desktop) · base v3.03 · doc écrit le 11 août 2026.
**Ce fichier suffit à reprendre le travail. Rien d'autre à lire d'abord.**

---

## 1. Où on en est, en une phrase

Un proto jouable et vérifié ajoute **deux choses** au desktop existant : les **états
d'une ligne de catégorie** (vide / endormie / non-rangé) et un **parcours de rangement
au clavier**. Rien n'est intégré dans l'app — le proto est un fichier séparé.

---

## 2. Lancer le proto

```bash
node .claude/serve.js
```

Puis ouvrir **http://localhost:5599/proto-rangement.html** dans une fenêtre de **1100 px
minimum** (sous ce seuil, la coque 3 colonnes de `styles-desktop.css` ne s'active pas et
le proto affiche un avertissement).

| Fichier | Rôle |
|---|---|
| `proto-rangement.html` | Le proto. Autonome (données en dur, ni `app.js` ni Supabase). |
| `.claude/serve.js` | Serveur statique minimal, lecture seule, port 5599. |
| `.claude/launch.json` | Config du serveur pour l'outil de prévisualisation. |

**Le proto charge `styles.css` et `styles-desktop.css`.** Donc vrais tokens, vraie
typographie Geist, vraie coque 3 colonnes. Vérifié en session : `--accent` résout à
`#AE7127`, le rail fait 236 px en `fixed`, `body` porte `padding-left:236px` /
`padding-right:360px`, et **il n'existe aucun conteneur scrollable dans `#app`**.

Tous les ajouts du proto sont préfixés **`dkr-`** (desktop rangement) et vivent dans un
`<style>` en tête du fichier. Aucun token n'y est redéfini.

---

## 3. Ajout n° 1 — les trois états d'une ligne de catégorie

Onglet **Collection**. Du CSS pur posé sur la carcasse `.crow` / `.cline` / `.cgo`
existante. C'est le portage le moins risqué.

| État | Rendu | Classe |
|---|---|---|
| **Contient du non-rangé** | pastille `--accent` de 6 px après le nom | `.dkr-todo` |
| **Endormie** (≥ 14 j) | `opacity:.55`, retour à plein au survol | `.crow.dkr-sleep` |
| **Vide** | la ligne écrit « Vide — rien encore rangé ici » au lieu d'un « 0 » muet | `.dkr-none` |

S'y ajoute `.dkr-scent` : une ligne de contexte en mono sous le nom (dernier item + date
de mise à jour). Aujourd'hui la ligne ne donne qu'un compteur, qui ne dit pas si la
catégorie est vivante.

Trois états sur **trois canaux distincts** (couleur / opacité / texte) : ils se cumulent
sans se brouiller. Voir *Lecture* (vide) et *z_Bavière* (endormie) dans le proto.

**Intégration :** `styles-desktop.css` pour le CSS, et la fonction qui rend `#domGrid`
dans `app.js` pour les trois classes conditionnelles. Aucun champ nouveau requis :
`status`, `surfaceAfter` et les compteurs existants suffisent à dériver les trois états.

---

## 4. Ajout n° 2 — le parcours de rangement au clavier

Le seul écran vraiment neuf. Monté sur la **coque `.rise`** — celle de la remontée
(v2.39) : même surface invoquée, même `.risebar`, même `.riseprog`, même compteur
`n / N`. C'est le bon précédent architectural, pas une structure nouvelle.

### Grammaire clavier

| Touche | Action |
|---|---|
| `R` | entrer dans le parcours (depuis l'app) |
| `1`–`6` | ranger dans la catégorie N — **la suggérée est toujours en 1** |
| `↑` `↓` | parcourir les catégories, `Entrée` valide |
| `C` | chercher parmi toutes les catégories |
| `T` | ajouter des tags |
| `S` | **pas maintenant** — voir §5 |
| `X` | jeter |
| `→` | passer (l'item retourne en fin de file) |
| `U` | **annuler la dernière action** |
| `Échap` | quitter |

**Aucune collision** avec le clavier existant de `desktop.js` (`↑↓`, `Entrée`, `/`, `Échap`).

**L'annulation est le pilier.** Sans `U`, on n'ose pas aller vite, et un parcours rapide
perd tout son intérêt. `U` rembobine **aussi la position dans la file** (`qi`), pas
seulement l'état de l'item — et décrémente le compteur de la catégorie touchée.

---

## 5. La décision à retenir : « Mis de côté » n'est PAS une date

C'est le point où ce proto corrige une erreur commise plus tôt dans la session.

**Une première recommandation disait de fusionner « Mis de côté » avec le champ
*Remontée*. Elle était fausse.** Le code montre deux mécanismes **distincts** :

| Mécanisme | Code | Sémantique |
|---|---|---|
| `status="archived"` | `archiveCard()` — `app.js:678`, libellé via `collectionName()` — `app.js:1525` | « Mis de côté » : rangé, **sans date**, sorti de la pile et du tirage. Tu iras le rechercher. |
| `surfaceAfter` | champ de date, piloté par la remontée | L'item **revient tout seul** à la date posée. |

`app.js:481` liste les exclus du tirage : « corbeille · mis de côté · sourdine ·
**surfaceAfter future** · non mûrs ». Les deux y figurent **côte à côte** — ce sont bien
deux intentions différentes. Les fusionner **supprimerait une capacité réelle**.

**Ce que fait le proto :** `S` ouvre une superposition à **quatre issues**, dans les deux
cas après avoir rangé l'item dans la catégorie sélectionnée :

- `1` `2` `3` → « Le faire revenir demain / cette semaine / dans un mois » → pose `wake`
  (→ `surfaceAfter`), `arch` reste faux ;
- `4` → « Mettre de côté » → pose `arch` (→ `status="archived"`), **sans date**.

Le bilan de fin de parcours compte les quatre issues séparément : **rangés · datés ·
de côté · jetés**.

**Ce qui restait juste du raisonnement initial :** « Mettre de côté » n'a pas sa place
dans une barre d'**actions groupées** — reporter cinq items d'un coup n'est pas un geste
réel. Et de fait, l'app ne propose que `batchCat` et `batchTag`. C'était déjà tranché
dans le code.

---

## 6. Ne pas refaire : ça existe déjà

Vérifié dans le code. Toute proposition d'UI dans ces domaines doit partir de l'existant.

| Fonction | Où |
|---|---|
| Tiroir de catégorie (chevron → aperçu de 3 items) | v2.38, chantier 19 · `.crow` / `.cchev` / `.peek` |
| Tri de l'index (Taille / A→Z / Z→A, défaut **A→Z**) | `indexSort`, v2.49 |
| Bascule liste / grille de l'index | `indexView`, v2.38 — par attribut, jamais par reconstruction |
| Vue galerie | `.gallery`, `minmax(150px,1fr)` |
| Sélection par lot + actions groupées | `body.selecting` · `.batchbar` · `#batchCat` · `#batchTag` |
| Bandeau de filtre (type / source, avec compteurs) | v2.68 |
| Épingler une catégorie (reste en tête dans les trois ordres) | v2.38 |
| Clavier `↑↓` / `Entrée` / `/` / `Échap` | `desktop.js:124-154` |
| Trois lentilles d'index : Catégories / Tags / Sources | v2.59 |

> **Le journal de version en tête d'`app.js` (v1.1 → v3.03) documente chaque décision
> ET son motif.** C'est la source de vérité produit. Le lire avant de dessiner.

---

## 7. Contraintes non négociables à l'intégration

1. **`body` reste le défileur.** `styles-desktop.css:13-16` : la sentinelle d'en-tête
   (v2.33), le verrou `body.sheetlock` (v2.89) et l'observation du mini-FAB en dépendent
   tous. Un conteneur de colonne scrollable « les aurait tous rendus muets, **sans erreur
   visible** ». Le proto respecte ça (vérifié : 0 conteneur scrollable dans `#app`).
2. **Passer par `closeSheet()` avant d'ouvrir une autre fiche.** Elle porte
   l'enregistrement silencieux (`onSheetClose`, v2.66) : ouvrir par-dessus perd une saisie
   en cours, sans rien dire. Voir `desktop.js:63-71`.
3. **Réutiliser les gardes de `desktop.js`** : `typing(target)` (input / textarea /
   contenteditable) et `busy()` (remontée ouverte, sélection, glissé). Le rangement ne
   doit capter aucune touche pendant une saisie ni pendant le rituel de remontée.
   *Le proto implémente `typing()` mais **pas** `busy()` — à ajouter au portage.*
4. **N'écrire aucune cote CSS depuis JS** (leçon v2.47). On pose des attributs / classes,
   le CSS fait le reste.
5. **`index-desktop.html` est une copie du DOM de `index.html`.** Si l'un bouge, l'autre
   doit être resynchronisé — `app.js` câble ses `id` au chargement, un `id` manquant fait
   tomber tout le fichier.

---

## 8. Ce qui a été vérifié, et comment

Exécuté dans le navigateur, sur le proto servi en local :

| Test | Résultat |
|---|---|
| Chargement, erreurs console | aucune erreur |
| Tokens réels appliqués | `--bg #F7F2E9` · `--accent #AE7127` · `--text #20190F` · police **Geist** |
| Coque 3 colonnes | rail 236 px `fixed`, `body` padding 236 / 360 |
| `body` défileur, 0 conteneur scrollable | conforme |
| `1` → ranger | item classé, compteur catégorie +1, `1/7` → `2/7`, toast correct |
| `U` → annuler | retour à `1/7`, catégorie effacée, compteur −1, bilan remis à zéro |
| `S` puis `2` → date | `wake="cette semaine"`, `arch=false`, bilan `datés:1` |
| `S` puis `4` → de côté | `arch=true`, `wake=null`, bilan `de côté:1` |
| `C` + recherche + `Entrée` | rangé dans la catégorie cherchée, une seule fois |

**Un bug a été trouvé et corrigé pendant ces tests** : les touches des superpositions
remontaient jusqu'au gestionnaire global, qui les retraitait après que `closeOv()` ait
remis `modal=null` — une frappe déclenchait **deux** actions. Corrigé par
`e.stopPropagation()` en tête des trois gestionnaires de superposition. **À reproduire au
portage** : c'est un piège structurel dès qu'une modale et un gestionnaire global se
partagent le clavier.

**Non vérifié :** aucune capture d'écran n'a pu être prise (le panneau navigateur n'était
pas affiché). Le rendu visuel — proportions, densité, équilibre de la surface de
rangement — **reste à juger à l'œil**.

---

## 9. Les trois prochaines étapes

### Étape 1 — Juger le proto à l'œil, et trancher deux points ouverts
Rien à coder. Ouvrir le proto, faire un parcours complet, et décider :
- la **suggestion de catégorie** : sur quoi la fonder ? Le proto utilise un champ `sugg`
  en dur. En vrai il faut une règle (source ? mots du titre ? dernière catégorie
  utilisée ?) — **c'est la décision produit la plus importante qui reste**, parce que
  toute la vitesse du parcours en dépend : si `1` est presque toujours juste, le
  rangement coûte une frappe.
- `→` **passer** : le proto remet l'item en fin de file, sans limite — on peut boucler
  indéfiniment. Poser un compteur de passes, ou le sortir du parcours au 2ᵉ passage.

### Étape 2 — Porter les trois états de catégorie
Le moins risqué, et utile tout seul. CSS dans `styles-desktop.css`, trois classes
conditionnelles dans le rendu de `#domGrid`. Aucun champ nouveau. Voir §3.

### Étape 3 — Porter le parcours de rangement
Dans l'ordre : brancher sur la vraie coque `.rise` → recâbler les actions sur les
fonctions réelles (`archiveCard`, le champ `surfaceAfter`, `resolveCat`) → ajouter la
garde `busy()` → reproduire le `stopPropagation()` de §8.

Respecter §7 en entier, en particulier `closeSheet()` avant tout changement de fiche.

---

## Annexe — À ne pas toucher

- La **palette sable** : distinctive et mûre.
- Le **squelette rail · liste · fiche**, et surtout **la méthode qui l'obtient** : aucun
  nœud ajouté autour de l'app, le rail *est* `nav.tabs`, le panneau *est* `#appSheet`.
- **« Pourquoi tu l'as gardé »** : la meilleure idée produit de l'app. Le parcours de
  rangement l'affiche en exergue sous le titre — c'est ce qui permet de décider vite.
- Le **journal de version d'`app.js`** : un actif de conception, pas de la dette.
