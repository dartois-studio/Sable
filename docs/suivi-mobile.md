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

## 2026-09-05 (suite) — Livré : tri « dernier usage » + bouton de tri (v3.08, ticket #26)

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

**Fichiers.** `app.js`, `styles.css`, `sw.js` (cache v105 → v106). `index.html`
n'est pas touché.

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

**Au déploiement.** Le numéro est posé — `APP_VERSION` v3.08 et le cache du
worker v106 — parce que c'est bien la prochaine version servie : aucune autre
livraison n'est en cours pour prendre le numéro. Vérifier sur
`dartois.studio/Sable/` que les Réglages affichent v3.08 : c'est le seul usage
de cette constante, dire « la nouvelle version est bien servie ».

---

## 2026-09-06 — Ouvert : quatre observations sur la remontée (v3.09 en ligne)

**Demande.** Quatre retours au premier usage réel de la porte basse : le glissé
entre onglets doit atteindre la remontée ; l'onglet inactif est trop sombre ;
pouvoir ouvrir l'app sur la remontée ; pouvoir choisir l'ordre des onglets.

**Instruit, pas implémenté.** Le détail, les quatre réponses du § 2 et les pièges
nommés sont dans **`docs/log-suivi-remontee.md`** — quatre tickets, à livrer dans
cet ordre : #1 (l'onglet), #2 (la pastille), #3 (l'ouverture), #4 (l'ordre).

**Les deux trouvailles qui ont changé le découpage.**

1. **Trois observations sur quatre sont une seule décision.** La v3.09 avait fait
   de la remontée une *porte* et non un onglet, à raison pour ce qu'on demandait
   alors. Le glissé, `startTab` et l'ordre la traitent tous les trois comme une
   **paire** des deux onglets : elle devient donc une vraie section de `#tabTrack`.
   Revirement assumé, à écrire comme tel dans le journal d'`app.js`.

2. **L'observation sur le gris n'était pas une observation sur le gris.** Le
   rapport a fini par donner la cause : « même le 4 j'ai des difficultés, à cause
   de mon daltonisme ». Mesuré : l'écart de contraste entre l'onglet actif et
   l'inactif vaut **1,14 en thème clair** contre 1,58 en sombre — les deux états
   y ont la même clarté, et leur seule différence est la **teinte**, l'axe
   précisément illisible. Aucune valeur de gris ne pouvait corriger ça (le plus
   clair testé plafonne à 1,82). **Retenu au pouce : la pastille pleine** —
   fond `--accent`, encre `--accent-ink`, dans les deux thèmes. L'aplat se
   détache du papier à **4,51** en clair et **7,69** en sombre, donc l'onglet
   courant se repère sans lire son libellé, et l'information survit en niveaux
   de gris.

**Livré.** Rien. Le journal, ses quatre tickets, et deux planches validées au
pouce : la maquette de la porte
(https://claude.ai/code/artifact/1fc80fb3-db58-494b-8113-cb784daa8cb7) et celle
des états d'onglet, simulateur de daltonisme compris
(https://claude.ai/code/artifact/ac39de1f-6e8a-4459-baab-5df96db5883e).

**Ouvert, et à trancher en cours d'implémentation.** Ouvrir sur la remontée un
jour vide (ne pas basculer sur Collection, à mon sens) ; la forme du réglage
d'ordre (trois choix nommant le premier onglet plutôt que six ordres) ; et le
sort du fond `--accent-soft` que le rail bureau pose déjà sur l'onglet actif.

⚠ **Dette reportée.** La liste de contrôle de la v3.09
(`docs/ticket-remontee-porte-basse.md` § 5) n'a jamais été déroulée : rien de
cette version n'a été vérifié dans un navigateur. Le ticket #1 la remet en jeu
sur la forme onglet, et c'est là qu'elle doit être payée.
