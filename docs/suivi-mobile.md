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

---

## 2026-09-06 (suite) — Ouvert : trois observations sur la v3.10 en ligne

**Demande.** Trois retours au premier usage de la v3.10 : la remontée est
incohérente (glissé → écran vide, tap → tiroir) et doit passer en plein écran ;
« Au démarrage, ouvrir » doit être compacté ; l'ordre des onglets doit se régler
sur une reproduction des onglets, et non sur une liste verticale.

**Instruit, pas implémenté.** Le détail, les quatre réponses du § 2 et les
pièges nommés sont dans **`docs/tickets-plein-ecran-reglages.md`** — trois
tickets, #5 (la remontée), #6 (le démarrage), #7 (l'ordre), à livrer dans cet
ordre.

**La trouvaille qui change la nature de l'observation 1.** Les deux
comportements décrits **ne peuvent pas coexister dans une seule version**. Le
tiroir est le rendu de `remontee.js` **v3.09** (son `wire()` posait un `onclick`
sur `#riseTab` et rendait dans `#appSheet`) ; l'écran vide est `app.js`
**v3.10**, dont `selectTab` appelle `window.renderRiseTab && renderRiseTab()` —
garde muette si la surcouche est vieille. Les Réglages affichent bien v3.10 :
c'est donc **un `app.js` v3.10 servi avec un `remontee.js` v3.09**, très
probablement par le cache HTTP de GitHub Pages, le service worker étant en
réseau d'abord. Le plein écran demandé **est déjà livré** ; ce qu'il faut
réparer est la possibilité même du décalage.

D'où la décision proposée au ticket #5 : **fondre la surcouche** (`remontee.js`
et `remontee.css`) dans `app.js` et `styles.css`. C'est ce que le § 4 du
CLAUDE.md prescrit une fois la forme validée — « une surcouche est un
échafaudage, pas une adresse permanente » — et le journal de la v3.10 notait
déjà que l'interrupteur d'arrêt ne rendait plus l'écran d'avant mais un onglet
vide. Deux fichiers couplés version à version dont la divergence rend un écran
vide sans lever d'erreur : c'est la classe de bug la plus chère du dépôt.

**Livré.** Rien : trois tickets écrits, et le diagnostic ci-dessus.

**Ouvert, et à reconstater sur une version cohérente (rechargement sans cache).**
Les deux boutons flottants visibles sur la remontée (le `+` et `#fabJump`, dont
`gotoTargets()` n'a aucune ancre à proposer sur cette section) et le chevron
encore présent à côté du titre « La remontée » alors que `navTitleIsMenu` a été
mise à faux en v3.10 — si le chevron survit à un rechargement propre, c'est un
bug distinct ; sinon c'est un second symptôme du même décalage.

---

## 2026-09-06 (suite) — Livré : le glissé depuis la remontée (v3.11, ticket #8)

**Demande.** « Le slide entre remontée vers catégorie ne fonctionne pas. »

**Diagnostic.** La cause n'est pas dans le geste : aucune garde du chantier 5 ne
le refusait, il n'était jamais **vu**. Le glissé écoute `#tabViewport`, qui n'a
aucune hauteur propre — seule la section courante en porte
(`.track > section:not(.tabcur){height:0}`), donc la zone d'écoute vaut la
hauteur du contenu. La remontée est la première section de la piste à pouvoir
être courte (une phrase les jours vides, rien du tout tant que la surcouche est
en retard, cf. ticket #5) : le doigt se posait hors du viewport. Défaut présent
depuis le chantier 5, invisible tant que les deux seules sections rendaient des
listes longues.

**Livré.** `min-height:60dvh` sur `.viewport`, en CSS et non en JS (§ 3).
`styles.css`, `app.js` (version + journal), `sw.js` (cache v108 → v109).

**Vérifié au ruban** (page témoin, Chromium 390 × 844, section réduite à une
phrase) : hauteur du viewport 23 px → 506 px, `elementFromPoint` au milieu de
l'écran `#app` → `#tabViewport`, et `body.scrollHeight` inchangé à 844 — la
règle donne une surface à saisir sans allonger la page.

**NON vérifié.** Rien sur un vrai téléphone ni dans l'app complète (le harnais
vit dans `.claude/`, absent du dépôt). Le geste lui-même n'a pas été rejoué : il
n'a pas changé d'une ligne.

**Ne remplace pas le ticket #5.** Sur ta version actuelle la section est
**vide**, pas courte : le glissé redeviendra possible, mais il te mènera d'un
écran vide à Collection. La fusion de la surcouche reste à faire.

---

## 2026-09-06 (suite) — Livré : la bande morte sous le contenu (v3.12, ticket #9)

**Demande.** « Correctif du glissé OK, sauf que si on glisse en ayant le doigt
sous le bouton “Commencer la revue”, le glissé ne fonctionne pas. »

**Diagnostic.** Même cause que le ticket #8 — la zone d'écoute est la boîte de
`#tabViewport` — mais par l'autre bord. Le `min-height:60dvh` traite le contenu
COURT ; quand le contenu est plus HAUT que 60 dvh, le viewport s'arrête à son
dernier pixel et les ~142 px suivants sont le `padding-bottom` de `#app`, la
garde de la barre du bas.

**Livré.** La cote sort en variable `--navclear` (elle était écrite en clair à
deux endroits) ; `.viewport` la prend en `padding-bottom` et la reprend en marge
négative : la boîte couvre la bande, la hauteur de page ne bouge pas.

**Vérifié au ruban** (Chromium 390 × 844, contenu de 692 px + bouton) :
`elementFromPoint` 40 px sous le bouton et à 800 px passe de `#app` à
`#tabViewport` ; `scrollHeight` inchangé à 844.

**NON vérifié.** Rien sur un vrai téléphone ; le geste n'a pas changé d'une ligne.

**Leçon à retenir, elle vaut au-delà de ces deux tickets.** Deux fois de suite,
la surface d'écoute d'un geste a été la hauteur d'une boîte que personne ne
regardait. Tout listener posé sur un conteneur dont la hauteur suit le contenu a
ce défaut latent.

---

## 2026-09-06 (suite) — Livré : les tickets #5, #6 et #7 (v3.13)

**Ticket #5 — la surcouche est fondue.** `remontee.js` et `remontee.css` entrent
dans `app.js` et `styles.css`, et sont **supprimés**. Les trois gardes
`window.renderRiseTab && …` deviennent des appels directs. Ce que ça répare :
le rendu de la remontée et la section qui l'accueille ne peuvent plus être
servis en deux versions différentes — c'était la cause de l'onglet vide au
glissé et du tiroir au tap. Cascade vérifiée au grep avant de déplacer : aucune
feuille bureau ne porte de règle sur `.risetab`, `.rcnt`, `.rline`, `.rs*`,
`.rage` ni `.tcv`.

**Ticket #6 — « Au démarrage, ouvrir » tient sur une ligne.** « Dernier onglet »
devient « Dernier » (valeur stockée inchangée). La mesure a dit que le libellé
ne suffisait pas : à quatre colonnes, « Collection » déborde de 2 px à 390 px et
de 9 px à 360 px au corps de 13 px. D'où `.seg.four` à 11,5 px — la même sorte
de variante que `.seg.days`, déjà à 11 px pour aligner sept jours — et, sous
360 px, un retour à deux lignes par règle de média plutôt qu'un libellé tronqué.

**Ticket #7 — l'ordre des onglets est une barre d'onglets.** Trois onglets côte
à côte, icône au-dessus du libellé, l'onglet courant en pastille pleine. Aucune
mécanique réécrite (`applyTabOrder`, `tabOrder`, `orderTrack`, `orderTabsBar`
sont intacts) : seul l'axe change — pas mesuré sur `left`, `translateX`, ←/→ au
clavier. Les deux précautions du ticket #4 tiennent (seuil de 10 px, `touchmove`
annulé au document).

**Vérifié.**

- L'app démarre sans **aucune** erreur de page une fois la surcouche fondue (la
  seule erreur restante est Supabase, attendue hors ligne) ; `renderRiseTab`,
  `riseTabPaint` et `riseMaybeAnnounce` existent, `.rcnt` reçoit ses règles.
- Segment à quatre choix : aucune troncature de 360 à 430 px, deux lignes à
  320 px.
- Barre d'ordre : aucune troncature de 320 à 430 px, cible de 52 px, pas mesuré
  cohérent (99 / 112 / 122 / 135 px).

**NON vérifié.** Le glissé de réordonnancement au doigt (le banc mesure la
géométrie, pas le geste), le rendu sur un vrai téléphone, et la remontée sur de
vraies données — le corpus de test vit dans `.claude/`, absent du dépôt.

**Reste ouvert.** Sur la remontée, le `+` de capture et `#fabJump` sont visibles
alors qu'aucun des deux n'a de sens sur cet écran (`gotoTargets()` n'y a aucune
ancre). Non traité ici : c'est une décision d'UI, pas un correctif.

---

## 2026-09-06 (fin de session) — v3.13 en ligne, et quatre tickets ouverts

**Ce qui est en ligne.** PR #8 mergée, testée au pouce : v3.11 → v3.13. Le
glissé entre onglets fonctionne depuis la remontée (tickets #8 et #9), la
surcouche `remontee.js` / `remontee.css` est fondue et supprimée (#5), « Au
démarrage, ouvrir » tient sur une ligne (#6), et l'ordre des onglets se règle
sur une barre d'onglets (#7).

**Trois observations neuves, plus une dette. Instruites, pas implémentées** —
le détail et les quatre réponses du § 2 sont dans
**`docs/tickets-remontee-suite.md`**.

- **#10, un bug.** Après la revue, l'onglet Remontée garde la liste et le bouton
  « Commencer la revue » ; il faut changer d'onglet et revenir pour voir
  « C'est fait pour aujourd'hui ». **Cause trouvée :** `closeRemontee()` finit
  par `renderBadges()`, posé en v3.01 quand la remontée était un CADRE. Depuis
  le ticket #1 c'est une SECTION, et `renderBadges` ne repeint que la pastille
  du compte — le corps est rendu par `renderRiseTab()`, dont le seul autre
  appelant est `selectTab`. Le correctif est un appel, **gardé par
  `curTab==="rise"`** : sans cette garde, rendre la section hors écran
  consommerait `settings.frameDay`, donc la journée, sans rien montrer.
- **#11, les non classés dans la remontée.** Ils ont déjà une porte au pied de
  Collection (`#openUnfiled`), posée avec un argument explicite : « ce n'est pas
  de la remontée, c'est du rangement ». La demande rouvre cette décision — elle
  se tranche, elle ne s'empile pas (deux portes vers la même chose, c'est ce que
  la v3.09 avait refusé). Trois formes étudiées ; je recommande la troisième :
  les non classés n'apparaissent que **les jours où le tirage est vide**.
- **#12, « en remonter d'autres ».** La mécanique existe déjà (`riseAdHoc`, la
  porte de secours) : il ne manque qu'une entrée. Deux questions de fond à
  trancher — un rab ne doit pas rendre `batchSize` décoratif (plafond posé en
  v2.23, « un rituel de 8 cartes ne se termine pas »), et il ne doit pas servir
  ce que la maturation, le plancher de 60 j et les sourdines avaient écarté.
  Dépend de #10 : le bouton vit sur l'écran « c'est fait », qui ne s'affiche pas
  au bon moment tant que #10 n'est pas livré.
- **#13, dette.** Le `+` de capture et `#fabJump` restent visibles sur la
  remontée, où ni l'un ni l'autre n'a de sens.

**Livré cette entrée.** Rien de code : les quatre tickets et ce suivi.
