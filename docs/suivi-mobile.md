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

---

## 2026-09-06 (suite) — Livré : les tickets #10 et #13 (v3.14)

**#10 — l'onglet Remontée reste sur la liste d'avant après la revue.** La cause
était nommée dans le ticket et elle était juste : `closeRemontee()` finissait par
`renderBadges()`, qui ne repeint que la pastille du compte. Le corps de la
section est rendu par `renderRiseTab()`, dont le seul autre appelant est
`selectTab` — d'où le « changer d'onglet et revenir ». L'appel est ajouté,
**gardé par `curTab==="rise"`** : sans la garde, rendre la section depuis
Collection consommerait `settings.frameDay`, donc la journée, sans rien montrer.

**Le piège annoncé n'existait pas, et c'est une bonne nouvelle.** Le ticket
demandait de vérifier que les quatre sorties du rituel passent par
`closeRemontee`. Relecture faite : les quatre gestes de carte ne referment
**rien** — ils avancent la séquence, et `renderStage` affiche l'écran de fin
*dans* la surface. Il n'y a donc que **deux** sorties, `#riseClose` et le retour
système (`pushLayer("surface",…)`), et toutes deux passent par `closeRemontee`.

**#13 — les deux boutons flottants quittent la remontée.** Le `+` par
`paintHeaderBtns`, `#fabJump` par la garde d'entrée de `updateJumpFab`. Détail
qui n'était pas dans le ticket : `#fabJump` n'était pas seulement inutile, il
était **actif** — `gotoTargets()` rendait la liste des catégories sur la
remontée, sa seconde branche se lisant « ni Ma pile ni Collection, et la lentille
est aux catégories », vraie par accident sur un troisième onglet qui n'existait
pas quand elle a été écrite.

**Un troisième défaut trouvé en écrivant les deux autres.** La remontée était le
seul onglet dont le rendu ne passait par **aucun** des deux propriétaires d'état
de l'en-tête (`renderRoot`, `renderPileTab`) : y arriver gardait les boutons de
l'onglet quitté — l'entonnoir de Ma pile compris, alors que le ticket #1 avait
justement nommé sa condition pour qu'il ne s'y montre pas. `renderRiseTab`
appelle donc `paintHeaderBtns()` et `scheduleJumpFab()`.

**La cote reste au CSS** (§ 3) : `.fab` pose un `display:flex`, qui bat
`[hidden]`. L'annulation `.fab[hidden]{display:none}` est écrite dans
`styles.css` — la même famille que `.peek`, `.rise`, `.tabs button` et `.jfab`.

**Vérifié.** `node --check` sur app.js et sw.js ; les deux sorties du rituel
relues une par une (ci-dessus) ; `renderRiseTab` reste idempotent (il réécrit
`innerHTML` et recâble ses `onclick`) ; aucune feuille bureau ne porte de règle
`display` sur `.fab` ou `#fabAdd` — les trois règles trouvées ne posent que
`right`/`bottom`, sous `@media (min-width:1100px)`.

**NON VÉRIFIÉ, et c'est la limite de cette livraison.** **Rien n'a été ouvert
dans un navigateur** : le harnais local et son corpus vivent dans `.claude/`,
absent de ce dépôt, et la session s'est faite sans lui. À juger au pouce : la
séquence complète « faire la revue jusqu'au bout, puis regarder l'onglet », et
l'absence des deux boutons sur la remontée **avec leur retour immédiat** sur les
deux autres onglets — c'est ce dernier point qui dirait qu'un masquage est resté
collé.

**#11 et #12 : rien de codé, la recommandation est redonnée plus bas dans la PR.**

---

## 2026-09-06 (fin) — Livré : les tickets #14, #11 et #12 (v3.15)

**#14 — le troisième rapport sur le même geste, et le correctif était au mauvais
endroit.** « Il faut que le slide soit bien sur toute la page remontée, comme
pour Catégorie et Pile » : la demande nomme la vraie cible, la **surface**, pas
le cas. Les tickets #8 et #9 avaient traité deux symptômes d'une même cause — la
boîte d'écoute du glissé est `#tabViewport`, et elle ne couvrait pas la page. Le
#8 avait posé `min-height:60dvh` ; c'est précisément ce `60dvh` qui laisse
passer le contenu d'**une ligne** : la boîte s'arrête à 60 % de l'écran, les
~25 % restants appartiennent à `#app`.

**Pourquoi deux correctifs avant de viser juste, et c'est la leçon à garder.**
`60dvh` était une valeur **choisie**, c'est-à-dire au jugé. Une valeur au jugé
règle le cas qu'on a sous les yeux, pas la classe de défaut. La cote est
maintenant **calculée** : `calc(100dvh - var(--hdrh))`, tout ce qui reste sous
l'en-tête. `--hdrh` est la somme nommée de tokens déjà là, et `.topbar` la
**consomme** en `min-height` — ce verrou est ce qui interdit à la somme et à
l'en-tête de dériver l'un de l'autre. Ce n'est **pas** une rechute `--tbh`
(v2.47) : celle-là était mesurée en JS et nourrissait un `sticky`.

**#11 — les non classés, forme 3.** Bloc « À ranger » sous la phrase, **le seul
jour où le tirage est vide**. La ligne `#openUnfiled` reste au pied de
Collection : ce n'est pas une seconde porte permanente (ce que la v3.09 avait
refusé), c'est une issue offerte à un écran qui n'a rien d'autre à dire. La
phrase de `riseVoidReason()` **reste au-dessus** — la cause, puis l'issue. Même
destination et **même appel** que sa jumelle, `enterCollection("none")`.

**#12 — « Encore N ».** Un lot, plafonné à `batchSize`, une fois par jour, et
**aucun bouton sur l'écran de rab** : c'est cette dernière moitié qui garde
debout le plafond de la v2.23. Le vivier repasse par `drawables()` et `fillPool`
**tels quels** — maturation 30 j, plancher 60 j, sourdines, dates à venir
intactes ; un rab qui puiserait ailleurs ferait de la règle un délai qu'un bouton
contourne. Le rab ne consomme pas la journée (`batch` non réécrit, `frameDay`
posé), comme la porte de secours l'a toujours fait.

**Le marqueur « une fois par jour » se dérive**, pas de `settings.extraDay` : un
rab servi laisse `lastSurfaced` sur un id qui n'est pas dans `batch.ids`. Limite
assumée et voulue — un rab **abandonné** sans qu'aucune carte soit gardée ou
classée ne laisse rien, donc le bouton revient : rien n'a été consommé.

**Vérifié.** `node --check` sur app.js et sw.js ; le calcul de hauteur refait au
crayon ; le DOM entre `</header>` et `.viewport` relu (rien qui prenne de la
hauteur au repos) ; `--hdrh` lu par **aucune** ligne de JS ; `.rsgo.ghost` bat
bien le `border:0` de `.rsgo` ; `--accent-deep` et `--border-2` présents dans les
deux thèmes ; `advance` sort sur `adhocOn()` avant `batch.idx++`, donc le rab
n'écrit pas le tirage.

**NON VÉRIFIÉ.** Rien n'a été ouvert dans un navigateur — le harnais et son
corpus vivent dans `.claude/`, absent du dépôt. Et le geste, en particulier, ne
se juge qu'au doigt : **la mesure à faire est le glissé depuis le bas de l'écran
sur une remontée soldée**, là où il mourait. À voir aussi au pouce : le rab servi
deux jours de suite, et le bloc « À ranger » un jour vide.

---

## 2026-09-06 (clôture) — v3.14 et v3.15 validées au pouce

**Les deux versions sont en ligne et testées sur le téléphone, sur de vraies
données.** Ce que les deux entrées précédentes rangeaient en « NON VÉRIFIÉ » l'a
été, et par la seule vérification qui compte ici : le glissé couvre bien toute la
page de la remontée, y compris sous une remontée soldée (ticket #14) ; l'onglet
se repeint à la sortie du rituel (#10) ; les deux boutons flottants ont quitté
l'écran (#13) ; le rab et le bloc « À ranger » se comportent comme prévu (#12,
#11).

**Les « NON VÉRIFIÉ » de ces deux entrées sont donc périmés** — ils disent ce qui
n'avait pas été mesuré *au moment de livrer*, pas un doute qui subsisterait. Ils
sont laissés en place plutôt que réécrits : une entrée de journal raconte l'état
d'une livraison à sa date, et la corriger après coup ferait croire que le banc
avait vu ce qu'il n'a pas vu. C'est cette ligne-ci qui fait foi.

**Rien d'ouvert sur la remontée.** Les tickets #10 à #14 sont soldés,
`docs/tickets-remontee-suite.md` n'a plus de point en attente.

**La seule note à laisser au suivant, et ce n'est pas une réserve sur v3.15 :**
si une zone morte réapparaissait un jour sur le glissé, ne pas redimensionner la
boîte une quatrième fois — déplacer le listener hors de `#tabViewport`, avec une
liste d'exclusions explicite. Trois correctifs sur la même boîte ont suffi à dire
que c'est le support qui est fragile, pas la cote.

---

## 2026-09-06 — Ticket #24 : la photo importée n'apparaît pas dans sa fiche

**Demande.** « Certaines images importées (ici Barre choco) : l'aperçu est
présent dans la liste ; quand j'ouvre la fiche, plus d'image. » Deux captures :
la liste Non classés, où la vignette de la barre chocolatée s'affiche ; la fiche
du même item, où il ne reste qu'un blason en pointillés et un pavé gris portant
une icône de fichier et le nom `1785405409341875230571420329172 8.jpg`.

**Ce que dit le code.** Une photo importée n'a **pas de `preview`**, et c'est
voulu. `addImageFile()` (app.js l.760) compresse, écrit le pixel dans le magasin
de médias — `setMedia(id, data)` — et fabrique un item avec `hasMedia:true`,
`preview` absent, `url:null`. Un data-URL de 1600 px n'a rien à faire dans le
blob des items.

Les listes connaissent cette division ; la fiche ne la connaissait pas :

| Surface | Fonction | Ce qu'elle fait d'un `hasMedia` |
|---|---|---|
| Ligne de liste | `rowThumb()` l.941 | pose un jeton `<div data-media>` |
| Carte de remontée | `mediaBlock()` l.918 | idem, en grand |
| Vignette de galerie | `galleryThumb()` l.5490 | idem |
| **Fiche** | `openGrainSheet()` l.4137 | **rien** |

`hydrateMedia()` (l.949) remplace ces jetons par l'image une fois le magasin lu,
et elle est appelée sur douze conteneurs — **jamais sur `#sheetList`**. La fiche,
elle, dérive son visuel de `chosenCover = it.preview || ytThumb`, donc `null` :
`drawIdent()` cachait `#gCover` et tombait sur le blason vide. Le seul rappel du
média y était le `.gfile`, c'est-à-dire le **nom** du fichier — la fiche affichait
la seule chose que l'item n'est pas.

**Livré (v3.16).**

- `mediaCover`, variable **d'affichage seulement**, lue une fois après le premier
  rendu par `getMedia(it.id)` puis rendue par un second `drawIdent()` : la fiche
  s'ouvre tout de suite, l'image arrive quand le magasin répond.
- `drawIdent()` calcule `face = chosenCover || mediaCover` et lui fait porter les
  cinq décisions qui dépendaient de `chosenCover` — couverture visible, source de
  l'image, blason posé dessus, blason seul, classe `nocov`.

**Le piège, et pourquoi la solution courte était la mauvaise.** Écrire l'image
dans `chosenCover` faisait deux lignes de moins et marchait à l'écran. Mais
`chosenCover` entre dans `snap()` et s'écrit dans `it.preview` au `commit()` :
une simple **ouverture** de fiche aurait allumé « Enregistrer » sur un item que
personne n'a touché, puis recopié l'image en base64 **dans le blob des items** à
la première sauvegarde — le média stocké deux fois, et un champ gonflé que le § 3
du CLAUDE.md interdit. `mediaCover` n'est lu par aucune des deux fonctions
d'écriture.

**Ce qui n'a pas été fait, et pourquoi.** Le vivier de la couche du visuel
(`cands`) n'est pas nourri : le média n'est pas un *candidat* de couverture, il
**est** l'item. Poser une couverture par-dessus reste possible et gagne — c'est
ce que dit l'ordre de `face`. Le pavé `.gfile` reste, il nomme le fichier, ce que
l'image ne fait pas. Les vidéos et les sons importés gardent leur pavé de nom
seul : la fiche n'a pas de lecteur, et ce ticket ne lui en invente pas un.

**Retrait.** `git revert` du commit : trois blocs dans `openGrainSheet`, aucun
fichier créé, aucun CSS touché. Le bureau est couvert sans une ligne de plus —
`desktop-fiche.js` **enveloppe** `openGrainSheet`, il ne la réécrit pas.

**Vérifié.** `node --check` sur app.js et sw.js ; les cinq usages de
`chosenCover` dans `drawIdent` basculés sur `face` et aucun autre (`setCover`,
`delCoverThumb`, `getCover`, `snap()`, `commit()` relus un par un, inchangés) ;
la garde `editingGrain!==id` empêche une réponse lente de repeindre une fiche
refermée ou rouverte sur un autre item.

**NON VÉRIFIÉ.** Rien n'a été ouvert dans un navigateur — le harnais et son
corpus vivent dans `.claude/`, absent du dépôt. À voir au pouce sur la vraie
pile : l'image dans la fiche de « Barre choco » ; la fiche qui doit toujours
annoncer « À jour » à l'ouverture, sans point de modification ; et une photo
importée **à laquelle on a posé une couverture**, où la couverture doit gagner.

**À remplacer :** `app.js`, `sw.js`. Cache v113 → v114.

---

## 2026-09-06 — Ticket #25 : la vidéo et le son importés, dans leur fiche

**Demande.** « Fais pareil pour les vidéos et les sons importés. » Suite
immédiate du #24, qui avait explicitement laissé ces deux types de côté.

**Même cause, autre réponse.** `addMediaFile()` (l.775) fait pour un son et une
vidéo ce que `addImageFile()` fait pour une photo : le fichier va dans le magasin
de médias, l'item garde `hasMedia:true` et `url:null`. La fiche ne montrait donc
là aussi que le pavé `.gfile`, c'est-à-dire le nom du fichier.

Mais **une photo a un visage, une vidéo a un lecteur**. Le #24 avait fait entrer
la photo dans `#gCover`, qui est un `<img>` et le porte-visuel de la fiche —
couverture, blason, couche du visuel. Y verser une vidéo aurait demandé soit une
balise `<video>` déguisée en couverture, soit une vignette extraite au canevas :
du travail et un champ pour *montrer* un objet qu'on veut regarder ou écouter.

**Livré (v3.17).** Un bloc `.gplay` sous le titre, au-dessus du pavé de nom —
même place et même ordre que dans la carte de remontée, où la forme a déjà été
jugée. Trois points :

- `#gCover` et `mediaCover` ne sont **pas** touchés : la garde du #24 reste
  `it.type==="image"`. Une vidéo n'a toujours pas de couverture par défaut, son
  blason en pointillés reste la porte vers la couche du visuel, et une couverture
  posée à la main s'affiche comme avant.
- Le média est lu **après le premier rendu**, comme la photo, et le jeton `.ph`
  est remplacé sur place par `<video controls playsinline>` ou `<audio controls>`.
- Le pavé `.gfile` **reste**, sous le lecteur : il nomme le fichier, ce qu'un
  lecteur ne fait pas. Même décision qu'au #24.

**Pourquoi `hydrateMedia()` n'est pas appelée ici**, alors qu'elle fait
exactement ce remplacement partout ailleurs : elle ne connaît pas la fiche, donc
pas la garde `editingGrain!==id`. Or `#sheetList` est **recyclé** d'un item à
l'autre (`innerHTML` réécrit) : une réponse lente du magasin peindrait un lecteur
dans une fiche refermée, ou rouverte sur un autre item. La course est réelle, pas
théorique. Pour la même raison le jeton ne porte ni `data-media` ni `data-kind` —
deux mécaniques qui se disputent le même nœud valent moins qu'une seule qui sait
où elle est.

**Aucune cote nouvelle.** `.sheet .ident .gplay` reprend ligne pour ligne la
géométrie de `.media` des cartes : même rayon, même bordure, `max-height:360px`,
`aspect-ratio:16/9` sur l'attente, pavé de 12 px pour le son. La classe s'appelle
`.gplay` et non `.gmedia` parce que `.gcard .gmedia` existe déjà et désigne autre
chose ; deux objets de même nom finissent par se prendre une règle l'un de
l'autre.

**Vérifié.** `node --check` sur app.js et sw.js ; les six règles ajoutées sont
hors de toute `@media` et scopées `.sheet .ident`, donc sans effet sur
`.gcard .gmedia` ni sur `.media` ; ni `snap()` ni `commit()` ne lisent ce nœud,
la fiche s'ouvre donc toujours sur « À jour » ; le cas « pas de média » dit
« média indisponible », comme `hydrateMedia`.

**NON VÉRIFIÉ.** Rien n'a été ouvert dans un navigateur. À voir au pouce : un son
et une vidéo lus depuis leur fiche ; la fiche qui annonce « À jour » à
l'ouverture ; et **la lecture qui doit s'arrêter à la fermeture de la feuille** —
c'est le comportement natif quand le nœud est retiré, mais c'est le seul point de
ce ticket qui ne se lit pas dans le code.

**À remplacer :** `app.js`, `styles.css`, `sw.js`. Cache v114 → v115.

---

## 2026-09-06 — Ticket #26 : le nom du fichier sous l'image

**Demande.** Le #24 est en ligne et la photo s'affiche. « Pourquoi j'ai l'image
au-dessus du texte et en dessous ce fichier .jpg dans une carte en gros avec une
icône fichier générique ? »

**Deux défauts superposés, et un seul est nouveau.**

**(a) L'icône géante est antérieure**, elle date de la v2.71 ; personne ne
l'avait vue parce que personne ne regardait ce pavé. `icon()` rend
`<svg class="ic">`, et **`.ic` n'a aucune taille par défaut** dans `styles.css` :
chaque contexte pose la sienne — on en compte une trentaine — et
`.sheet .ident .gfile` n'en posait pas. Le SVG prenait donc la taille par défaut
d'un élément remplacé sans dimensions, c'est-à-dire toute la largeur. C'est la
contrepartie exacte de l'invariant « aucune cote posée depuis JS » : les cotes
vivent dans le CSS, donc un contexte qui en oublie une n'obtient pas un défaut
raisonnable, il obtient le défaut du navigateur.

**(b) Le poids visuel était un contresens, et celui-là est de moi.** Le #24 avait
gardé le pavé en écrivant « il nomme le fichier, ce que l'image ne fait pas » :
vrai en soi, faux à l'écran. Une carte levée — fond, bordure, 10 px de padding —
placée sous l'image dit « regarde ce fichier » juste après qu'on a montré le
fichier. Et le nom d'un import d'appareil photo,
`1785405409341875230571420329172 8.jpg`, n'apprend rien à personne.

**Livré (v3.18).**

- Le pavé devient une **légende** : plus de fond, plus de bordure, une ligne mono
  12,5 px en `--text-3`, icône ramenée à 14 px et alignée.
- Il ne s'affiche plus **que s'il apprend quelque chose** : `hasMedia && !title`.
  Un item titré (« Barre choco ») ne montre plus le nom du fichier, son identité
  est déjà écrite au-dessus. Un item **sans titre** le garde — le champ titre est
  alors vide, et le nom du fichier est la seule chose qui nomme l'objet.

La condition est **statique**, pas liée au média affiché : elle ne dépend
d'aucune réponse asynchrone, donc aucun nœud n'apparaît ou ne disparaît une
demi-seconde après l'ouverture de la fiche.

**Ce que ça coûte, dit franchement.** Un item **titré** dont le média est
introuvable ne montre plus le nom du fichier : il montre le blason vide (photo)
ou « média indisponible » (son, vidéo). C'est le cas rare d'un stockage abîmé, et
l'information utile — le média manque — reste à l'écran.

**Vérifié.** `node --check` sur app.js et sw.js ; `.gfile` n'est rendu qu'à cet
endroit ; la règle jumelle `.sheet .gfld .gfile` (l.840) est du CSS mort d'une
fiche disparue et n'est pas touchée ici ; les deux règles ajoutées sont hors de
toute `@media`. Aucune valeur nouvelle.

**NON VÉRIFIÉ.** Rien n'a été ouvert dans un navigateur. À voir au pouce : la
fiche de « Barre choco » sans son pavé, et une photo **sans titre**, qui doit
garder sa ligne de nom.

**À remplacer :** `app.js`, `styles.css`, `sw.js`. Cache v115 → v116.

---

## 2026-09-06 — Ticket #27 : le titre contre le nom du fichier, dans la liste

**Demande.** Deux captures. Dans « Non classés », la ligne se lit
`17854054093418752305714203291728.jpg` ; la fiche du même item, ouverte juste
après, se lit « Barre choco ». Deux noms pour un seul item.

**La cause.** `rowHTML()` et `contentBlock()` ne passaient pas par
`displayText()` pour les types média : ils testaient
`it.hasMedia ? it.content : displayText(it)`. Dès qu'un média est stocké, le nom
du fichier gagne, titre ou pas. Le repli était juste, la **priorité** était
inversée. Le #26 avait tranché la même question dans la fiche (`!it.title`) ; la
liste n'avait pas reçu la règle.

**Livré (v3.19).** Une fonction, `mediaText(it)` — titre, sinon nom du fichier si
média, sinon `labelFor()` — appelée aux deux endroits. Un item titré porte son
titre partout ; un item sans titre garde son nom de fichier. Aucune écriture,
aucun champ, aucune migration : c'est une lecture.

**Vérifié.** `node --check` ; plus aucun site de code ne lit `it.content` sur un
type média ; `mediaText` est une déclaration, donc hissée avant ses appels situés
plus haut dans le fichier ; les vignettes ne bougent pas.

**NON VÉRIFIÉ.** Rien ouvert dans un navigateur.

**À remplacer :** `app.js`, `sw.js`. Cache v116 → v117.

---

## 2026-09-06 — LA PILE A ÉTÉ DÉTRUITE. Tickets #28, #29, #31

C'est l'entrée la plus importante de ce fichier. Elle est écrite au passé parce
que la perte a eu lieu, et qu'aucun correctif de cette session ne l'a réparée.

### Le rapport

« J'ai perdu tous mes items !!!! », 18:20 heure locale. Captures d'écran de la
pile normale à **18:03** et **18:04**, dans la même session.

### Ce qui s'est passé, établi par la base

Tout Sable tient dans une table `kv`, une ligne par `(user_id, key)`. Une lecture
de `brain:v1:%` a montré :

| Compte | `items` | taille | écrite le |
|---|---|---|---|
| `plaisantguillaume@gmail.com` | oui | **1 913** | **06/09 16:17 UTC** |
| `adeline.cordary@gmail.com` | oui | 16 159 | 25/08 06:16 UTC |

Puis, décisif : **aucune des deux lignes ne contient « Barre choco » ni
« dartois.studio »**, et **les deux contiennent les items de démonstration**. La
ligne du compte principal ne contient QUE l'amorçage. `auth.users` ne connaît que
ces deux comptes — il n'y a pas de troisième pile ailleurs.

La séquence est donc :

1. Vers 16:17 UTC (18:17 local), une lecture Supabase échoue — jeton périmé,
   réseau, ou refus RLS. Non observée directement : reconstituée.
2. `loadState()` avale l'erreur et pose `items=[]`.
3. `startApp()` voit `items.length===0`, amorce cinq items de démonstration et
   **appelle `saveItems()`**.
4. L'`upsert` remplace la valeur de `brain:v1:items`. La pile est perdue.
5. À 16:24:42, reconnexion — sept minutes trop tard, le mal est fait.

**Aucune restauration possible.** Plan gratuit Supabase : ni PITR, ni sauvegarde
quotidienne. Un `upsert` ne garde pas de version antérieure. La seule copie qui
aurait pu subsister était une page ouverte avant 16:17 et jamais rechargée : la
seule trouvée affichait la porte d'authentification, donc `startApp()` n'y avait
jamais tourné, donc rien en mémoire. Le cache du service worker ne contient que
la coquille, jamais les données.

**Ce qui survit.** Les médias sont sur des lignes séparées, une par fichier :
cinq lignes avec contenu (23/07, 30/07, 12/08, 03/09 ×2), intactes. Elles portent
les `id` de leurs items et leur date. Et `brain:v1:settings` vit dans le
`localStorage` de l'appareil — catégories et réglages y sont encore, à condition
de ne pas vider les données de site.

### Le malentendu qui a précédé le diagnostic, et qu'il faut consigner

Les deux comptes du foyer sont sur le même appareil. La connexion sans mot de
passe fabrique **un compte par adresse**, donc une adresse saisie autrement ouvre
une pile vide à côté de la vraie, sans rien détruire. C'était l'hypothèse la plus
probable au départ, et elle était fausse ici : la pile de 16 159 caractères est
celle de la seconde personne du foyer, et ne contient aucun item du rapporteur.
L'hypothèse a coûté deux échanges. Elle reste la bonne première question — mais
elle se tranche en lisant le CONTENU des lignes, pas leur taille.

### Ticket #28 — une lecture qui échoue n'est pas une pile vide (v3.20)

Trois défauts, par ordre de gravité.

**(a)** `loadState()` posait `items=[]` sur toute erreur, sans jamais le dire.
C'est le **symétrique** du défaut d'écriture réparé en v2.66 : la leçon n'avait
été appliquée qu'à une moitié du couple lecture/écriture.

**(b)** `startApp()` enchaînait l'amorçage **et son écriture**. Une lecture ratée
n'affichait donc pas seulement du vide : elle l'écrivait. C'est le défaut qui a
détruit la pile ; (a) seul n'aurait donné qu'un écran vide et réversible.

**(c)** Rien à l'écran ne disait avec quelle adresse on est connecté. Un mauvais
compte et une pile perdue se présentaient sous une forme identique.

**Livré.** `stateReady` ne passe à vrai qu'après une lecture **confirmée** ;
`_writeItems` refuse d'écrire tant qu'il est faux et rend `false`, que la chaîne
de la v2.66 fait déjà remonter jusqu'au toast ; `startApp` affiche
`showLoadFailure()` et **retourne**, donc l'amorçage n'est plus atteignable. La
garde est posée dans `_writeItems` **et nulle part ailleurs** : c'est le seul
point par lequel passent les deux chemins de `saveItems` (v2.88), donc aucun
appelant n'a à s'en souvenir. Un JSON illisible compte comme un échec, pas comme
un vide — le texte d'origine est intact en base, le jeter serait la seule perte
réelle. L'écran de panne est fabriqué en JS (aucun `id` ajouté au gabarit, § 3),
ses cotes vivent dans `styles.css` hors de toute `@media`, et il porte l'adresse
connectée plus une issue « Changer de compte ». Réglages : une ligne « Compte ».

### Ticket #29 — supprimer un média enlève sa ligne (v3.20)

Trouvé dans la même requête : deux lignes `brain:v1:media:…` à **`null`**,
écrites à 100 ms d'écart le 05/09 — signature d'une corbeille vidée. `purgeRow`
et `emptyTrash` appelaient `setMedia(id,null)`, qui écrit un null au lieu
d'enlever la ligne. Aucune donnée perdue par là, mais la base garde une ligne par
média disparu, et un plan gratuit se compte en lignes. `window.storage.delete`
existait depuis le premier jour **sans aucun appelant**. `delMedia()` l'appelle,
et **supprime** la clé du cache mémoire au lieu d'y poser null (`getMedia` teste
`id in mediaCache` : un null mémorisé serait une réponse définitive).

Les deux lignes déjà à null **ne sont pas nettoyées** par le code : ce serait une
écriture sur des données en ligne décidée depuis le dépôt (§ 6). Deux `delete` en
SQL, quand le propriétaire le voudra.

### Ticket #31 — le miroir local (v3.21)

La dette ouverte **depuis la v2.66**, en toutes lettres : « il n'y a AUCUN repli
local pour les items […] Un miroir localStorage est le chantier suivant ». Le
chantier suivant a attendu cinquante-cinq versions, et la pile est partie entre
les deux.

**Livré.** Une copie des items — **pas des médias** — dans `localStorage`, écrite
après chaque lecture ET chaque écriture **confirmée**, jamais sur un état non
chargé. Elle porte l'`uid` du compte : sans ce filtre, deux comptes sur le même
téléphone se serviraient mutuellement une copie fausse, ce qui est exactement la
configuration de ce foyer. Quota dépassé → le miroir est **effacé** plutôt que
gardé tronqué. Elle se voit sur l'écran « PILE NON LUE » et dans Réglages, avec
sa date et son compte ; quand il n'y a rien, la ligne dit « aucune » — un silence
se lirait comme « tout va bien ».

**La décision principale : elle ne se réinjecte JAMAIS toute seule en base**, et
rien ne la lit pour peupler l'app. Une panne de lecture est le plus souvent
passagère ; un miroir qui se recopierait à ce moment-là écraserait une pile
distante saine avec une copie plus ancienne — le sinistre de ce soir, à
l'identique, dans l'autre sens. Il rend un **fichier**, réimporté sur décision de
son propriétaire.

### Vérifié / non vérifié, pour les trois tickets

**Vérifié.** `node --check` sur app.js et sw.js ; plus aucun `setMedia(…,null)`
ni `hasMedia?it.content` en code ; `stateReady` écrit dans `loadState` seul, lu
dans `_writeItems` seul ; `saveMirror` appelé aux deux seuls sites confirmés ;
`readMirror` filtre sur l'`uid` ; aucune écriture Supabase ajoutée nulle part ;
règles CSS hors de toute `@media`, aucune valeur nouvelle.

**NON VÉRIFIÉ, et c'est le point faible.** Rien n'a été ouvert dans un
navigateur. **L'écran « PILE NON LUE » n'a jamais été vu** — le provoquer demande
une lecture Supabase qui échoue, que le harnais local ne sait pas simuler ; le
plus simple pour le juger au pouce est de couper le réseau au lancement. Le
comportement au **quota dépassé** du miroir n'est pas testé non plus.

### Ce que ça ne règle pas

- Le miroir ne protège que l'appareil qui l'a écrit, ne survit pas à un vidage
  des données de site, et n'a pas les médias. **Ce n'est pas une sauvegarde,
  c'est un dernier recours.** La vraie réponse est un instantané côté serveur —
  une ligne d'historique par écriture — non abordé ici.
- Rien n'empêche encore de créer un second compte par une faute de frappe dans
  l'adresse. Le seul garde-fou livré est qu'on peut enfin **lire** quel compte on
  utilise.
- Aucune sauvegarde n'existe côté Supabase, et le plan gratuit n'en propose pas.
  À trancher hors code : plan payant avec PITR, ou export périodique.

### Ouvert — ticket #30, le filet

« Récupérer les médias orphelins » dans Réglages → Données : lister les clés
`brain:v1:media:*` sans item correspondant et recréer un item par média — image
en place, date d'origine tirée d'`updated_at`, titre et catégorie à remettre à la
main. Ça rend cinq photos. Pas les liens, pas les notes, pas les titres, pas les
catégories. **Non écrit à ce jour.**

### Une dette de numérotation, constatée en écrivant ceci

Le numéro **#26** désigne deux choses dans ce dépôt : le tri « dernier usage »
(v3.08, plus haut dans ce fichier) et le nom du fichier sous l'image (v3.18). La
numérotation des tickets a été reprise à zéro en cours de route. Les numéros
#27 à #31 de cette session suivent la seconde série. À trancher un jour, avant
qu'un troisième #26 n'apparaisse.

---

## 2026-09-06 (suite) — Livré : les sauvegardes en ligne et la garde d'effondrement (v3.23, ticket #33)

**Demande.** « Un audit complet et des solutions infaillibles pour ne plus jamais
que ça se reproduise. Avoir des backup locale c'est bien mais un backup en ligne
serai pas mal aussi. Avec des enregistrements automatiques. »

**L'audit est un document à part** : `docs/audit-donnees-et-sauvegardes.md` — les
huit chemins par lesquels la pile peut disparaître, ce qui couvre chacun, et les
trois qui restent découverts. Le mot « infaillible » n'y figure dans aucune
conclusion, et c'est délibéré : le ticket #32 a établi qu'un filet livré,
affiché et jamais vérifié peut n'avoir jamais rien écrit pendant une version
entière. Un dispositif dont on connaît les trous vaut mieux qu'un dispositif
qu'on croit étanche.

**Livré, quatre choses.**

1. **Les instantanés en ligne.** Une ligne `brain:v1:snap:AAAA-MM-JJ` par jour
   d'usage, dans la MÊME table `kv`, sous le même compte : aucune migration,
   aucun schéma, rien à faire côté base. Quatorze jours gardés, rotation
   automatique. Ils **suivent le compte d'un appareil à l'autre**, ce que le
   miroir local ne saura jamais faire.
2. **La restauration**, dans Réglages → Données → « Sauvegardes en ligne » : la
   liste des jours, une copie choisie avec son compte d'items en face du compte
   actuel, « Enregistrer en fichier » puis « Restaurer ». Jamais automatique.
3. **La garde d'effondrement.** `_writeItems` refuse le passage d'au moins cinq
   items à zéro en une seule écriture.
4. **L'export fichier s'horodate**, et la ligne des Réglages porte son âge.

**Les deux décisions qui portent la valeur du dispositif**, et ce ne sont pas
celles que la demande suggérait.

- **Une copie par jour, pas une par écriture.** La note de la v3.21 disait « une
  ligne d'historique par écriture ». Une écriture d'items part à chaque geste :
  ce serait des centaines de copies du tableau ENTIER par semaine sur un plan qui
  se compte en lignes, pour une finesse dont le sinistre à couvrir n'a aucun
  besoin. Ce qu'on veut pouvoir rendre, c'est « la pile d'avant la bêtise », pas
  « celle d'il y a trois clics ».
- **La copie est prise à la LECTURE, pas à l'écriture.** C'est le point qui
  décide de tout. Une copie prise après une écriture est une copie de l'état
  **déjà abîmé** — c'est exactement ce qui aurait été sauvegardé le 06/09 à
  16:17, et elle n'aurait servi à rien. Le premier chargement du jour gagne : la
  copie du jour est l'état d'AVANT la session, un point fixe et non une moyenne
  mobile.

**Ce qui n'est PAS dans les copies automatiques, et il faut le savoir** : les
médias (ni le miroir ni les instantanés ne les portent — seul l'export fichier),
et les catégories et réglages (aucune sauvegarde, pas même l'export). Les
instantanés vivent sous le même compte que la pile : ils protègent d'une bêtise
de l'app, **pas** d'une perte du compte. Le geste qui vaut le plus aujourd'hui
reste **un export fichier de temps en temps**.

**Fichiers.** `app.js`, `sw.js` (cache v120 → v121). `index.html` et les CSS ne
sont PAS touchés : la feuille réutilise la grammaire des Réglages, aucun `id`
nouveau, aucune règle CSS ajoutée.

**Comment on l'enlève.** Retirer l'appel à `autoSnap()` dans `startApp` suffit à
arrêter les écritures ; la ligne des Réglages et la feuille se retirent
ensemble ; la garde d'effondrement est un `if` de quatre lignes dans
`_writeItems`. Les lignes `snap:` déjà en base se suppriment en SQL, quand leur
propriétaire le voudra (§ 6 du CLAUDE.md).

**Vérifié.** Banc Node de **27 assertions vertes**, sur du code EXTRAIT d'app.js
et non recopié, avec un `window.storage` de test : les trois refus d'`autoSnap`
(état non lu, pile vide, clé du jour déjà là), le contenu et l'horodatage de la
copie, le premier chargement du jour qui gagne, le tri et le filtrage de
`snapKeys`, la rotation à 14 avec suppression des plus anciennes, `_snapInfo`, la
garde d'effondrement dans ses cinq cas, `_lastN` qui suit l'écriture, et les
libellés qui ne se taisent jamais. Plus `node --check` sur app.js et sw.js, et un
grep : `storage.delete` n'a que deux appelants (`delMedia`, `snapRotate`), aucun
`id` nouveau, aucune règle CSS.

**NON VÉRIFIÉ, et c'est la même limite que les trois versions précédentes.** Rien
n'a été ouvert dans un navigateur : le harnais local vit dans `.claude/`, hors du
dépôt, et ne monte pas de session Supabase. **Le contrôle qui compte tient en une
phrase** : sur un appareil connecté, ouvrir Sable, aller dans Réglages → Données,
voir si « Sauvegardes en ligne » porte « 1 copie · <la date du jour> », ouvrir la
copie, l'enregistrer en fichier, **et regarder le fichier**. C'est le seul contrôle
qui prouve que la copie contient bien la pile. La restauration ne se teste pas sur
la vraie pile avant d'avoir ce fichier en main. La mise en page de la feuille et
l'écran de panne restent invérifiés, comme depuis la v3.20.

**Ouvert, et hors code** : le plan gratuit Supabase n'offre ni PITR ni sauvegarde
quotidienne. Les instantanés livrés ici sont une sauvegarde **applicative**, pas
d'infrastructure — la différence compte si c'est le projet lui-même qui tombe.
À trancher : plan payant, ou export planifié côté serveur. Restent ouverts aussi
le ticket #30 (les cinq médias orphelins du 06/09), l'écriture concurrente entre
deux appareils (C3 de l'audit), et les catégories absentes de toute sauvegarde
(C6).
