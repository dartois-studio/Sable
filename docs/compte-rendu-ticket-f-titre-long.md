# Ticket F — le titre long, coupé à la source

13 août 2026. Premier changement de la journée qui **n'est pas** une surcouche
bureau : il touche `app.js`, donc le téléphone aussi. Et le premier fondé sur la
**vraie pile** de Guillaume (73 items actifs), pas sur le corpus synthétique.

---

## 1. Le problème, et pourquoi il dépasse la fiche

Une capture Instagram rapporte la **légende entière** dans le champ titre.
Mesuré sur la vraie pile : 9 titres dépassent 150 caractères, jusqu'à **1301**.

Et `displayText()` (app.js) alimente **les listes, l'index, la recherche et la
remontée**. Un titre de 1301 caractères ne gêne donc pas seulement le panneau de
fiche — il pollue toute l'app. C'est ce que Guillaume a formulé : « pas polluer
visuellement mes fiches, les listes, etc. »

**Le fait qui rend la règle possible** : les 9 cas suivent le même motif, sans
exception — `Auteur on Instagram: "légende"`. Une règle précise devient
possible là où il aurait fallu une heuristique.

---

## 2. La règle, et ce que les vrais titres lui ont appris

`splitLongTitle()` — le titre devient la première unité de sens ; `body` reçoit
le texte d'origine **entier**, préfixe d'auteur compris.

Elle a été corrigée **trois fois**, chaque fois par un contre-exemple des données :

| Version | Ce qui clochait | Correction |
|---|---|---|
| 1 | Les sauts de ligne étaient écrasés en espaces AVANT la recherche de frontière — or dans une légende, le retour à la ligne EST souvent la seule fin de phrase (« …au monde\nBien cuire… ») | Chercher la frontière avant d'aplatir |
| 2 | Le saut de ligne primait sur la fin de phrase : « …obsessed! » était coupé au milieu de la phrase suivante parce que les hashtags venaient 170 caractères plus loin | Les deux frontières à égalité, **la plus proche gagne** |
| 3 | La 1re phrase s'appliquait toujours : « Great. Street musicians in Munich » (33 car., qui tenait entier) devenait « **Great.** » | Seuil `MIN=15` sur la frontière, et découpe réservée aux légendes sociales ou aux titres > 90 car. |

S'y ajoute le retrait de la **traîne de hashtags** — testé avant d'être intégré :
il améliore 4 titres et n'en abîme aucun.

**On garde le tout, pas le reste.** `body` contient le texte d'origine complet,
pas seulement ce qui n'a pas tenu : un titre modifié à la main ne doit jamais
rendre la légende irrécupérable.

---

## 3. Résultat sur la vraie pile

| | Avant | Après |
|---|---|---|
| Titre le plus long | **1301 car.** | **88 car.** |
| Titres modifiés | — | 22 / 57 |
| Titres intacts | — | 35 / 57 |
| Longueur moyenne des modifiés | — | 55 car. |

Exemples : `1301 → « 🚨 Le motion design est en train de changer… »` ·
`1008 → « Like this post and comment "Repo"… »` ·
`259 → « Avoir de l'épargne, c'est une première étape. »`

⚠️ **Ces chiffres sont une PROJECTION.** La découpe ne s'applique qu'aux
**nouvelles** captures. Les 73 items existants sont **intacts** — décision de
Guillaume : capture d'abord, réparation de l'existant plus tard, si la règle
convient à l'usage. Rien n'a été écrit dans sa pile.

---

## 4. Le piège, et comment il est traité

`body` **devait** entrer dans la recherche. Sans lui, raccourcir un titre rendrait
introuvables les mots partis dans le texte d'origine : la découpe deviendrait une
**perte**. Deux endroits filtrent (recherche globale + filtre de Ma pile), les
deux sont étendus. Vérifié : un mot présent uniquement dans `body` retrouve bien
son item.

---

## 5. Le coût de migration : zéro

Les items sont **un seul blob JSON** (`storage.set(KEY_ITEMS, JSON.stringify(items))`).
Un champ de plus n'est qu'une clé de plus — rien à changer côté Supabase.
`normalizeItem()` l'initialise à `null`, exactement comme `it.icon` en v2.67 :
le précédent existait déjà.

---

## 6. L'affichage : un `<details>` natif

Le texte d'origine s'affiche dans la fiche sous « Texte d'origine », **replié par
défaut**. `<details>` plutôt qu'un bloc maison, pour trois raisons : replié il
coûte une ligne au lieu de neuf cents pixels, il s'ouvre **sans une ligne de JS**,
et il est accessible au clavier et aux lecteurs d'écran sans rien câbler.

**Il n'est pas modifiable** — c'est le texte rapporté par la capture, pas celui de
l'utilisateur ; ce qu'il écrit vit dans « Pourquoi tu l'as gardé ». Le rendre
éditable obligerait à entrer dans le suivi de modifications de la fiche
(`snap()` / `commit()`), qui porte l'enregistrement silencieux — pas gratuit,
et pas nécessaire ici.

---

## 7. Liste de contrôle

| # | Contrôle | Résultat |
|---|---|---|
| 1 | Les 9 titres > 150 car. sont traités | ✅ 9/9 |
| 2 | Titre le plus long après règle | ✅ 88 car. |
| 3 | Titres ordinaires épargnés | ✅ 35/57 intacts (`Hop.Earth - Play the World!`, `xTool M2 : Graveur Laser…`) |
| 4 | Capture de bout en bout | ✅ titre 44 car., `body` 303 car. complet (auteur + hashtags) |
| 5 | **Recherche sur un mot du seul `body`** | ✅ trouvé |
| 6 | Ce qu'affiche la liste | ✅ le titre court |
| 7 | Items sans `body` : pas de bloc | ✅ 73/73 |
| 8 | `body` initialisé à `null` partout, aucun titre cassé | ✅ |
| 9 | Bloc replié / ouvert (bureau) | ✅ 32 px / 222 px — fiche 364 px puis 555 px, sur 780 dispo |
| 10 | **Zone tactile du résumé (mobile)** | ⚠️ **19 px trouvé → corrigé à 48 px** (`--tap`), texte inchangé à 10,5 px |
| 11 | Ouverture/fermeture au clic | ✅ |
| 12 | Débordement horizontal du texte | ✅ aucun |
| 13 | Les 8 fichiers se chargent | ✅ tous en 200 |

**Non vérifié, et il faut le dire :**

- **Aucune capture d'écran** (artefact n°1). Rien n'a été *regardé* — le rendu du
  bloc « Texte d'origine » reste à juger à l'œil.
- **Aucune capture réelle depuis Instagram.** Les tests passent par `addItem()`
  avec une légende recopiée ; le chemin `fetchMeta` → vrai partage n'est pas éprouvé.
- **Un vrai téléphone**, et le partage entrant (Web Share Target).
- **Les items existants** : la projection dit ce que la règle FERAIT, elle ne
  prouve pas ce qu'elle fera sur les captures à venir.

---

## 7 bis. La réparation de l'existant — ajoutée après coup

**Ce qui a déclenché ça** : Guillaume a regardé sa liste et a répondu « c'est pas
possible d'avoir des titres aussi longs ». Il avait choisi « capture d'abord,
réparation ensuite » — et voir le résultat a tranché la question autrement. C'est
exactement à quoi sert de regarder plutôt que de raisonner.

**Contrainte à ne pas oublier** : la pile vit dans Supabase, derrière une
connexion. Personne ne peut la réparer de l'extérieur. On livre donc le BOUTON,
et c'est son propriétaire qui l'actionne, dans son app connectée.

Réglages → Données → **« Raccourcir les titres importés »**, avec son compte.

- **La ligne n'apparaît que s'il y a à faire**, et disparaît une fois passée :
  une action inerte n'a pas à occuper un réglage pour toujours.
- **`repairTitles(true)`** rend la liste sans rien écrire. C'est ce qui permet
  d'annoncer un compte ET trois exemples avant/après dans la confirmation — un
  nombre ne dit pas si la découpe tombe juste, trois titres le disent.
- **`confirm()` natif**, comme les quatre autres actions irréversibles de l'app.
  Pas de nouvelle UI pour un geste qu'on fait une fois.
- **`body` est écrit AVANT le titre**, et n'écrase jamais un `body` existant.
- **Leçon v2.66 respectée** : `saveItems()` est attendu, et rien n'est annoncé
  avant que l'écriture soit confirmée. En cas d'échec, `SAVE_FAIL_MSG`.
- **Idempotent** : un titre déjà raccourci ne redéclenche rien (vérifié — le
  bouton disparaît après le passage, et `repairTitles(true)` rend 0).

### Mesuré sur la vraie pile (dans le proto local, jamais sur les données en ligne)

| | Avant | Après |
|---|---|---|
| Titre le plus long | **1301 car.** | **88 car.** |
| Titres > 150 car. | 9 | **0** |
| Items concernés | — | 23 |
| Items ayant gagné un « Texte d'origine » | — | 20 |
| Longueur moyenne affichée en liste | — | 65 car. |

**Rien n'est perdu, vérifié par la recherche** : « poêle » (parti du titre) → 2
résultats · « storyboards » → 1 · « michaeljackson » (hashtag retiré) → 1 ·
un mot inexistant → 0.

## 8. Comment on l'enlève

Retirer l'appel à `splitLongTitle()` dans `addItem()` : les nouvelles captures
reprennent le titre entier. Le champ `body` peut rester, inerte.

**Ce qui ne se défait pas tout seul** : un item déjà capturé sous la nouvelle
règle garde son titre court. `body` contient le texte d'origine complet, donc
rien n'est perdu — mais recoller demanderait une opération inverse. C'est le
point le moins réversible de la journée, et c'est pourquoi l'existant n'a pas
été touché.
