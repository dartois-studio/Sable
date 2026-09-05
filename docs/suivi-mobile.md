# Suivi mobile

Journal de travail côté mobile. Une entrée par session : ce qui a été demandé,
ce qui a été trouvé, ce qui a été livré (ou pas). Les comptes rendus de fond
restent dans les fichiers `compte-rendu-*.md` ; ici on garde le fil.

---

## 2026-09-05 — Question : la règle de tri des catégories et des tags

**Demande.** « Quand je crée un nouvel item, on dirait que les catégories et les
tags proposés sont triés chronologiquement, mais pas vraiment. »

**Ce que dit le code.** Il n'y a AUCUN tri chronologique nulle part sur les
catégories ni sur les tags. Deux ordres seulement coexistent, et c'est
délibéré (`app.js`, entrée de journal v2.49) :

| Ordre | Fonctions | Où il sert |
|---|---|---|
| **Fréquence** (nb d'items, puis alphabétique en cas d'égalité) | `tagLib()` l.415, `srcLib()` l.421, et les `sort` locaux sur `allCats()` | Sélecteur de catégorie de la fiche (l.4260), sélecteur de tags (l.4274), suggestions de capture (l.3558), suggestions de tag (l.3309 et 3313), classement par lot (l.3281), fusion de catégorie (l.2701) |
| **Réglage `indexSort`** (Taille · A→Z · Z→A, défaut A→Z), épingles en tête | `idxCmp()` l.1571, appelée par `catOrder()` l.2388 et `idxEntries()` l.1714 | Uniquement l'index / Collection |

Détails qui expliquent l'impression de « chronologique mais pas vraiment » :

- La fréquence **change à chaque item ajouté** : ranger trois items dans une
  catégorie la fait remonter. Comme on range souvent d'affilée, la liste
  ressemble à un ordre « récent » — mais c'est un compteur, pas une date.
- `domCounts()` (l.1579) ne compte que les items `active` : mettre de côté ou
  jeter fait **redescendre** une catégorie, ce qu'aucun ordre chronologique ne
  ferait.
- Une catégorie **vide** (créée mais jamais utilisée, ou vidée) tombe à 0 et
  se retrouve reléguée en fin de liste, avec les autres à 0 rangées
  alphabétiquement.
- À la recherche (l.2985/2990), un troisième critère passe DEVANT la
  fréquence : `pref()` remonte ce qui **commence** par la frappe avant ce qui
  la contient.
- Vrac est épinglé en tête du classement par lot, hors tri (l.3277-3281).

**Livré.** Rien : question, pas d'implémentation. Ce fichier créé.

**Ouvert.** Si l'ordre par fréquence ne convient pas à la saisie, la piste la
moins chère est un critère « dernier usage » dérivé de `items` (max de
`createdAt` par catégorie / par tag) — donc sans champ nouveau ni migration
(§ 3 de CLAUDE.md). À ne poser que dans les sélecteurs de saisie, jamais dans
`tagLib()`/`srcLib()` (leçon v2.49).

---

## 2026-09-05 (suite) — Tri « dernier usage » + bouton de tri (ticket #26)

> **Sur branche, pas encore déployé — le numéro de version n'est donc pas posé.**
> Voir « À faire au passage en main » à la fin de cette entrée.

**Demande.** Ajouter le tri par dernier usage dans les sélecteurs de saisie, et
proposer un bouton de tri (alphabétique, usage…).

**Livré.**

- `catLastUse()` / `tagLastUse()` : date d'une catégorie ou d'un tag = `createdAt`
  du plus récent item qui la porte. **Dérivé de `items`, aucun champ, aucune
  migration.** Les corbeillés sont écartés.
- Réglage `pickSort` — **Récents · Usage · A → Z**, défaut « Récents » —
  distinct d'`indexSort`, qui continue de commander l'index seul.
- Deux portes uniques, `pickCats()` / `pickTags()`, qui remplacent six tris
  écrits en clair et presque identiques.
- Un segment `.seg` dans la couche de choix (`opt.sortable`), entre le champ et
  la sélection, hors zone de défilement. Un tap redessine la seule liste.
- Suivent le réglage sans porter le bouton : suggestions de la capture (coupées
  à 6), suggestions de tag du lot (coupées à 8), classement par lot, fusion.
- Gardent leur ordre, volontairement : la **recherche** (le préfixe bat tout) et
  l'**index** (`indexSort`).

**Fichiers.** `app.js`, `styles.css`. `index.html` n'est pas touché ; `sw.js`
ne le sera qu'au déploiement (voir ci-dessous).

**Comment on l'enlève.** Retirer `pickSort` de `DEFAULT_SETTINGS` et rendre les
deux portes au tri par fréquence : les six appelants ne bougent pas.

**Vérifié.** Banc Node sur les fonctions extraites (8 assertions vertes) : les
trois ordres sur catégories et tags, l'exclusion des corbeillés, un archivé qui
garde sa date mais perd son compteur, les replis à égalité, et `pickCats` qui ne
mute pas sa source. `node --check` sur `app.js` et `sw.js`.

**NON vérifié.** Rien n'a été jugé au pouce ni mesuré : le segment sous le champ
et sa hauteur dans une couche déjà chargée, et surtout l'effet réel de
« Récents » sur une vraie pile — le corpus de test a des `createdAt` synthétiques.

**Limite assumée.** Reclasser un vieil item ne remonte pas sa catégorie : le
rangement n'est pas horodaté, seule la capture l'est. L'horodater coûterait un
champ par item et une migration ; « Usage » reste à un tap.

**À FAIRE AU PASSAGE EN MAIN — le numéro de version se pose là, pas avant.**
`APP_VERSION` suit le DÉPLOIEMENT (§ 3 de CLAUDE.md, ticket #23) : tant que ce
travail vit sur une branche il n'est servi à personne, et un numéro posé
d'avance annoncerait une version que le Web ne rend pas — ou entrerait en
collision avec la livraison qui fusionne avant celle-ci. Trois gestes, un seul
commit, le jour de la mise en ligne :

1. `app.js` — `APP_VERSION` : `v3.07` → le suivant.
2. `app.js` — le titre de l'entrée de journal, qui dit encore
   `vNEXT (À NUMÉROTER AU PASSAGE EN MAIN)` : y mettre ce même numéro.
3. `sw.js` — `APP_CACHE` : `sable-app-v105` → `v106`. Sans ce cran, la coquille
   en cache ne se renouvelle pas.

Puis vérifier sur `dartois.studio/Sable/` que Réglages affiche bien le nouveau
numéro : c'est le seul usage de cette constante, dire « la nouvelle version est
bien servie ».
