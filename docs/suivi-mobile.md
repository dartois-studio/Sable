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
