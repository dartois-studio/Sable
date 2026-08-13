# Ticket E — le panneau de fiche en lecture d'abord

13 août 2026. **Première tranche.** Le ticket n'est pas clos : ce qui est livré
est la tranche mince et complète qui vérifie le parti, pas le dessin entier.

---

## 1. Le diagnostic, mesuré avant d'écrire une règle

Le panneau de fiche (`#appSheet`) est la colonne de droite du bureau — ce que
`desktop.js` a apporté en maître-détail. Son **intérieur** n'avait jamais été
redessiné : c'est la mise en page mobile, une colonne verticale, posée dans une
fente de bureau.

Mesuré sur le corpus (48 items), à 1440 × 900 :

```
hauteur disponible ....... 780 px
socle fixe ............... 634 px   ← 81 %, AVANT tout contenu
reste pour le titre ...... 146 px   ← ~5 lignes
```

**7 items sur 48 (15 %) passaient sous le pli**, jusqu'à 234 px pour le pire.

Ce n'est pas une queue rare : la médiane des titres est de **41 caractères**, mais
le p90 est de **256** et le max de **311**. Un cas sur six.

Et le socle contenait deux choses discutables :

| | |
|---|---|
| « Pourquoi tu l'as gardé » | 58 px — champ vide dans **48 items sur 48** |
| « Jeter » | 59 px + 20 px de marge — une action destructrice à demeure |

---

## 2. Le parti (tranché par Guillaume)

> **Lire d'abord, modifier sur demande.** À largeur égale.

Le panneau est ouvert en permanence à côté de la liste. On le **parcourt**
beaucoup, on le **modifie** parfois. Il rend donc d'abord un item lisible ;
l'édition devient un geste explicite.

Largeur inchangée (`--dk-detail`, `clamp(360px,26vw,440px)`) : la liste de gauche
est ce qu'on parcourt le plus, elle ne devait pas payer.

---

## 3. Ce qui est livré

Une surcouche de deux fichiers, `desktop-fiche.css` + `desktop-fiche.js`, chargée
après `desktop-v2.*`, avec **son propre interrupteur d'arrêt** : retirer la ligne
de `<link>` et celle de `<script>` rend la fiche d'avant sans toucher au reste du
bureau.

- **`data-fiche`** sur `<html>` — `"read"` (défaut à chaque ouverture) ou `"edit"`.
  Même motif que `data-sheet` de `desktop.js` : le JS pose l'attribut, le CSS en
  tire les conséquences.
- **Une bascule ✎** dans `#sheetHeadAct`, réemployant `.sheadbtn` (donc sans
  diverger des boutons voisins posés par app.js). Reposée à chaque ouverture —
  app.js réécrit `#sheetHeadAct.innerHTML` (app.js:3898) — et **idempotente** par
  marqueur `data-dkf`.
- **En lecture** : la note **vide** se replie sur une ligne et son en-tête de
  section disparaît ; « Jeter » quitte la surface.
- **En édition** : rien n'est écrit. L'absence de `[data-fiche="read"]` rend les
  règles inopérantes et la fiche redevient exactement celle d'app.js. Le mode
  édition n'est pas une seconde mise en page à maintenir, c'est l'original.

### Le point qui rend la règle sûre

La note se replie **seulement quand elle est vide**, et la condition est
`:placeholder-shown` — c'est le champ lui-même qui décide, sans JS et sans nœud
ajouté. Une note écrite s'affiche toujours en entier.

C'est délibéré : le corpus synthétique n'a **aucune** note remplie (0/48) et on
ignore si la vraie pile en a. Le dessin marche dans les deux cas — il ne parie pas
sur une donnée dont on doute.

---

## 4. Le gain, mesuré

A/B sur le **même item**, même jauge, couche basculée à chaud :

| | Sans la couche | Avec |
|---|---|---|
| Contenu réel | 666 px | **511 px** |
| Socle fixe | 634 px | **479 px** |
| Marge pour le titre | 146 px | **301 px** |
| **Items qui débordent** | **7 / 48** | **0 / 48** |

Économie : **155 px**, soit le double de marge pour le titre.

### Une méthode qui a failli mentir

Les trois premières mesures ont donné des résultats absurdes (« le socle a
augmenté de 100 px »). Deux causes, notées ici parce qu'elles reviendront :

1. **`scrollHeight` est plafonné** à la hauteur de la boîte. Il ne peut pas mesurer
   un contenu plus court que son conteneur — donc il ne mesure que le débordement.
   La bonne jauge est le **bas du dernier enfant visible** moins le haut de la liste.
2. **Deux items différents ne sont pas comparables** : l'un avait une couverture,
   l'autre non, soit ~190 px d'écart sur le socle. Un A/B ne vaut que sur le même item.

S'y ajoute l'artefact n°2 connu (horloge d'animation gelée) : le champ titre se
mesure à 4 px si l'on ne rejoue pas l'autogrow avant de lire sa hauteur.

---

## 5. Liste de contrôle

| # | Contrôle | Résultat |
|---|---|---|
| 1 | Mode `read` posé à l'ouverture | ✅ |
| 2 | Bascule présente, visible, **unique** | ✅ 1 seul bouton sur 6 ouvertures + 4 flèches clavier |
| 3 | Aller-retour lecture ↔ édition | ✅ état strictement identique au retour |
| 4 | `aria-pressed` et libellé suivent le mode | ✅ |
| 5 | Fiche laissée en édition → l'ouverture suivante repart en lecture | ✅ |
| 6 | **Mobile 390 px : bouton injecté** | ✅ **0** (JS gardé par `DK.matches`) |
| 7 | **Mobile : attribut `data-fiche`** | ✅ jamais posé (`null`) |
| 8 | **Mobile : contenu avec vs sans la couche** | ✅ **identique** (675 px, note 47 px, « Jeter » visible) |
| 9 | Erreurs console | ✅ aucune (2× 404 sur `__dev/fixture.json`, sans rapport) |
| 10 | `openGrain` sur mobile ouvre toujours le lien | ✅ comportement d'origine préservé |

**Non vérifié, et il faut le dire :**

- **Aucune capture d'écran** (artefact n°1 : le volet ne compositait pas). Tout
  est mesuré, rien n'est regardé. **Le jugement esthétique reste entièrement à faire.**
- **Le franchissement du seuil à la souris** (artefact n°4). Le repli du bouton par
  `hidden` sous 1100 px est écrit et non éprouvé.
- **La saisie réelle** : écrire une note en mode édition, la voir persister, revenir
  en lecture. Seul le rendu est mesuré, pas le cycle d'enregistrement.
- **Un vrai téléphone.**

---

## 6. Ce qui reste ouvert

1. **Le corpus réel.** Le « 0/48 note » vient d'un jeu synthétique. Pour trancher,
   il faut l'export : Réglages → « Exporter ma pile » → `.claude/fixture.json`
   (prioritaire, et `.claude/` est ignoré par git). Tant qu'il manque, toute
   conclusion sur les habitudes de remplissage est une hypothèse.
2. **Le bloc visuel** (~190-236 px) — le plus gros poste restant du socle, intouché.
3. **Le bloc Rangement** (159 px, trois lignes) — intouché ; il se lit bien, mais
   c'est le prochain candidat.
4. **41 items sur 48 ont `title` identique à `content`.** Le panneau affiche donc
   potentiellement deux fois la même chose. À regarder — c'est peut-être un défaut
   du générateur de corpus, peut-être une redondance du modèle de données.

---

## 7. Comment on l'enlève

Retirer de `index.html` la ligne `<link rel="stylesheet" href="./desktop-fiche.css">`
et la ligne `<script src="./desktop-fiche.js"></script>`. La fiche redevient celle
d'app.js, au pixel. Les deux fichiers peuvent rester en place, inertes.

`git revert` du commit fait la même chose d'un coup.
