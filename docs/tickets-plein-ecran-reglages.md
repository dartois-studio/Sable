# Tickets #5 à #7 — la remontée en plein écran, et deux réglages à reformer

Suite de `docs/log-suivi-remontee.md` (tickets #1 à #4, livrés en v3.10). Trois
observations au pouce sur la v3.10 en ligne, un ticket chacune. Rien n'est
implémenté ici : ce fichier instruit, il ne livre pas.

Ordre de livraison : **#5 d'abord** (il contient un diagnostic qui peut rendre
les deux autres observations plus lisibles), puis #6 et #7, indépendants.

---

## Ticket #5 — LIVRÉ (v3.13) — la remontée en plein écran, et l'incohérence glissé / tap

**Observation.** « Quand je slide à gauche, j'ai un écran vide. Quand je clique,
un tiroir. On va passer la remontée en plein écran. »

### Le diagnostic, avant toute décision d'UI

Les deux comportements décrits **ne peuvent pas coexister dans une seule
version du code**, et c'est ça l'information :

| Ce qui est observé | Ce qui le produit |
|---|---|
| Glisser vers la gauche → section vide | `app.js` **v3.10** : `selectTab("rise")` appelle `window.renderRiseTab && renderRiseTab()` (l.4777). La garde est l'interrupteur d'arrêt : si la fonction n'existe pas, la section reste vide **sans erreur**. |
| Taper l'onglet → tiroir par le bas | `remontee.js` **v3.09** : son `wire()` posait `b.onclick=riseOpenSheet` sur `#riseTab`, et le rendu vivait dans `#appSheet`. |

Autrement dit : **un `app.js` v3.10 servi avec un `remontee.js` v3.09.** La
v3.10 a justement retiré cet `onclick` (le clic appartient à `app.js` via
`data-tab`) et déplacé le rendu dans `renderRiseTab()`. La capture d'écran des
Réglages confirme le premier terme : `APP_VERSION` y affiche bien **v3.10**.

Le service worker est en **réseau d'abord** (`sw.js`, `reseauDAbord`), donc il
n'est pas le coupable évident ; le suspect restant est le cache HTTP du
navigateur sur `remontee.js` (GitHub Pages sert du `max-age`), qui n'a aucune
raison d'expirer en même temps que celui d'`app.js`.

**Conséquence pour le ticket : la première chose à faire n'est pas de dessiner,
c'est de recharger sans cache et de reconstater.** Si l'écran redevient
cohérent, l'observation d'UI tombe (le plein écran est déjà livré) et il ne
reste que la cause structurelle, ci-dessous, qui vaut à elle seule le ticket.

### La cause structurelle : deux fichiers qui doivent bouger ensemble

`app.js` et `remontee.js` sont **couplés version à version** depuis le ticket
#1 : la section `#tab-rise`, l'entrée de `TAB_ORDER` et le `data-tab` vivent
dans les fichiers de base, le rendu vit dans la surcouche. Une divergence entre
les deux ne casse rien bruyamment — elle rend un **écran vide**, la classe de
bug la plus coûteuse de ce dépôt. Le CLAUDE.md § 4 le dit déjà :
« une surcouche est un échafaudage, pas une adresse permanente », et le journal
de la v3.10 note que l'interrupteur d'arrêt a changé de nature.

**Décision proposée : fondre `remontee.js` / `remontee.css` dans `app.js` /
`styles.css`.** La forme est validée au pouce depuis deux versions, la surcouche
a fait son travail, et fondre supprime la possibilité même du décalage.

1. **Fichiers touchés.** `app.js` (les ~250 lignes de `remontee.js` entrent
   auprès de `renderPileTab` / `renderCategories`, les trois gardes
   `window.riseTabPaint &&` / `window.renderRiseTab &&` deviennent des appels
   directs), `styles.css` (le bloc de `remontee.css`), `index.html` (les deux
   balises retirées), `sw.js` (les deux entrées de `CODE`, et bump du cache).
   **Non touchés :** `riseFrameIds`, `riseOpenAt`, `riseDue`, `riseVoidReason`,
   `openRemontee`, `ensureBatch` — la mécanique du tirage ne bouge pas.
2. **D'où viennent les données.** D'aucune part de neuf : déplacement de code à
   l'identique. **Aucun champ, aucune migration.**
3. **Comment on l'enlève.** `git revert` du commit de fusion. L'interrupteur
   d'arrêt « retirer deux balises » disparaît, mais il ne rendait déjà plus
   l'écran d'avant depuis la v3.10 : il rendait un onglet vide. On échange une
   sortie de secours qui mentait contre une classe de bug fermée.
4. **Ce que ça casse ailleurs.** Rien sur mobile si la fusion est littérale.
   Le risque réel est la **fusion partielle** : une fonction laissée derrière
   redevient exactement le décalage diagnostiqué ci-dessus. Contrôle :
   `grep -n "remontee" index.html sw.js` doit ne plus rien rendre, et
   `grep -n "window.renderRiseTab\|window.riseTabPaint\|window.riseMaybeAnnounce"`
   non plus.

### Trois points à vérifier une fois la version cohérente

- **Les deux boutons flottants sont visibles sur la remontée** (capture n° 1) :
  le `+` de capture et `#fabJump`. Capturer depuis l'écran du rituel est
  douteux, et `gotoTargets()` n'a aucune ancre à proposer sur cette section —
  `updateJumpFab()` ne teste pas `curTab==="rise"`. À trancher : masquer les
  deux sur la remontée. Une ligne dans `updateJumpFab` + la garde du `+`.
- **Le chevron du titre.** `navTitleIsMenu` a été mise à faux pour la remontée
  en v3.10 ; la capture montre encore un chevron à côté de « La remontée ».
  À reconstater sur une version cohérente : si le chevron survit, c'est un
  second symptôme du même décalage, pas un bug distinct.
- **La liste de contrôle de `docs/ticket-remontee-porte-basse.md` § 5** a été
  déroulée en v3.10 au banc Chromium. Elle est à redérouler après la fusion :
  c'est le même écran, servi par un autre fichier.

---

## Ticket #6 — LIVRÉ (v3.13) — compacter « Au démarrage, ouvrir »

**Observation.** « Dans les settings, on va compacter “au démarrage ouvrir”. »

**Ce qu'il y a aujourd'hui** (`app.js` l.3821-3826) : quatre choix — Remontée ·
Collection · Ma pile · Dernier onglet — dans `setSeg(..., 2)`, donc **deux
colonnes sur deux lignes**, plus une cinquième ligne conditionnelle (« Un jour
sans remontée ») quand « Remontée » est choisi. Le commentaire de la v3.10
justifie les deux colonnes : « Dernier onglet » ne tient pas dans un quart de
ligne sur un écran de 360 px, et un libellé tronqué est un réglage qu'on ne peut
pas choisir. **Ce raisonnement reste vrai** : compacter ne peut donc pas être
« passer à quatre colonnes ».

**Trois formes possibles, par coût croissant :**

1. **Raccourcir le quatrième libellé.** « Dernier onglet » → « Dernier ».
   Quatre colonnes redeviennent tenables (les trois autres font 8 à 10
   caractères). Une chaîne changée, rien d'autre. Le mot perd un peu de sens
   isolé, que le titre de la ligne (« Au démarrage, ouvrir ») rattrape.
2. **Le réglage devient une ligne libellé + valeur** qui ouvre un choix, comme
   les autres lignes d'action des Réglages. Gain vertical maximal, coût : un
   aller-retour pour changer une valeur qu'on ne change presque jamais.
3. **Réutiliser les onglets eux-mêmes** — cohérent avec le ticket #7, où l'ordre
   se règle sur une barre d'onglets. « Au démarrage » deviendrait alors le fait
   de *désigner* un onglet dans cette même barre, ce qui fusionnerait deux
   réglages en un objet. Séduisant, et **à ne pas décider ici** : deux réglages
   distincts fondus en un contrôle qui fait deux choses est précisément ce que
   le § 3 appelle un doublon de règle.

**Recommandation : la forme 1**, et rien de plus tant que le ticket #7 n'est pas
livré — la forme 3 se jugera mieux avec la barre sous les yeux.

1. **Fichiers touchés.** `app.js` seul (deux chaînes : le libellé, et le `2` de
   `setSeg` qui passe à `4`). Ni `index.html`, ni `styles.css`.
2. **D'où viennent les données.** `settings.startTab`, existant. La valeur
   stockée reste `"last"` : **seul le libellé change**, aucune migration.
3. **Comment on l'enlève.** Remettre les deux valeurs. Une ligne.
4. **Ce que ça casse ailleurs.** Le risque unique est la **troncature à 360 px**,
   qui est exactement la raison pour laquelle le réglage est à deux colonnes
   aujourd'hui. **À mesurer, pas à regarder** (§ 5) : `scrollWidth` contre
   `clientWidth` sur les quatre boutons, à 360 px et à 320 px. Si ça déborde, la
   forme 1 est morte et on passe à la 2. La ligne conditionnelle « Un jour sans
   remontée » n'est pas touchée.

---

## Ticket #7 — LIVRÉ (v3.13) — l'ordre des onglets se règle sur une barre d'onglets

**Observation.** « Ordre des onglets : plutôt que de faire une liste verticale,
on va reproduire les tabs, pour pouvoir faire le drag and drop, plus logique. »

**L'observation est juste, et elle porte sur la bonne chose.** Le ticket #4
avait choisi la liste verticale parce que c'est la grammaire connue du
réordonnancement (appui long, glissé). Mais **ce qu'on ordonne est horizontal** :
une liste verticale demande de traduire mentalement « en haut » en « à gauche ».
Un contrôle qui ressemble à sa cible n'a rien à traduire.

**Ce qui rend le ticket peu coûteux : rien de la mécanique n'est à réécrire.**
`wireTabOrder()` (`app.js` l.3579) mesure déjà son pas **entre deux lignes
rendues** au lieu de l'écrire en dur (§ 3) — la même mesure sur un axe
horizontal donne le pas entre deux onglets. `applyTabOrder()`, `tabOrder()`,
`orderTrack()` et `orderTabsBar()` ne sont pas touchés : ils reçoivent un
tableau de trois noms, d'où qu'il vienne.

**Le travail réel est de trois natures :**

- **L'axe.** `paint(dy)` et `commit(from,to)` passent en `dx`, le pas se mesure
  sur `getBoundingClientRect().left`, le `transform` devient `translateX`. Le
  seuil de 10 px avant saisie et l'annulation de `touchmove` au niveau du
  document restent tels quels (les deux précautions du ticket #4).
- **Le rendu.** Trois « onglets » côte à côte, reprenant l'icône et le libellé de
  la barre du bas, dont **la pastille pleine de l'onglet actif** (ticket #2) —
  sans quoi le contrôle ressemble à la barre sans en être une lecture fidèle.
- **Le clavier.** ↑/↓ deviennent ←/→. À garder : un contrôle qui n'a qu'un
  geste tactile n'existe pas au bureau (ticket #4), et le rail de 1100 px rend
  cette barre verticale — le contrôle, lui, reste horizontal, ce qui est
  assumé : il représente l'ORDRE, pas la géométrie de l'écran courant.

1. **Fichiers touchés.** `app.js` (`setTabOrder` et `wireTabOrder`, réécrits),
   `styles.css` (le bloc `.taborder` / `.tordrow` / `.tgrip` passe en rangée).
   `index.html` n'est **pas** touché — le contrôle est produit par
   `openSettingsSheet()`.
2. **D'où viennent les données.** `settings.tabOrder`, champ posé au ticket #4.
   **Aucun champ nouveau, aucune migration**, et `tabOrder()` continue de rendre
   une permutation complète pour toute valeur abîmée.
3. **Comment on l'enlève.** `git revert` : le contrôle est une paire
   fonction + bloc CSS, ses appelants ne bougent pas.
4. **Ce que ça casse ailleurs.** Deux risques nommés, tous deux mesurables.
   (a) **La largeur.** Trois onglets dans la feuille des Réglages, marges
   comprises, sont plus étroits que dans la barre du bas : le libellé
   « Collection » doit tenir sans troncature à 320 px — à mesurer avant de
   livrer. (b) **Le conflit de gestes.** Un glissé horizontal dans une feuille
   ouverte ne croise pas le glissé entre onglets (`layerOn("sheet")` le refuse
   déjà), mais il croise le **défilement horizontal** si la barre déborde :
   raison de plus pour qu'elle ne déborde pas. Le glissé de piste et la barre du
   bas ne sont **pas** touchés.

⚠ **À trancher en cours d'implémentation.** L'appui long reste-t-il nécessaire ?
Sur une liste verticale il protège le défilement de la feuille ; sur trois
onglets larges, une saisie immédiate au doigt est plus directe et le seuil de
10 px suffit peut-être à protéger le défilement vertical. À juger au pouce, sur
l'appareil — c'est un réglage de sensation, pas une décision de code.

---

## Ticket #8 — LIVRÉ (v3.11) — le glissé depuis la remontée était mort

**Observation.** « Le slide entre remontée vers catégorie ne fonctionne pas. »

**La cause n'est pas dans le geste.** Aucune garde du chantier 5 ne le refusait :
le geste n'était jamais **vu**. Le glissé écoute `#tabViewport`, or ce conteneur
n'a aucune hauteur propre — `.track > section:not(.tabcur){height:0}` fait que
seule la section courante en porte. La zone d'écoute vaut donc exactement la
hauteur du **contenu**. La remontée est la première section de la piste à
pouvoir être **courte** (une phrase les jours vides, rien du tout tant que la
surcouche est en retard, cf. ticket #5) : le doigt se posait sur le body, hors
du viewport, et le `touchstart` n'arrivait pas. Collection et Ma pile rendent
des listes longues — le défaut existait depuis le chantier 5 sans jamais avoir
eu l'occasion de se voir.

1. **Fichiers touchés.** `styles.css` (une règle), `app.js` (`APP_VERSION` et sa
   ligne de journal, rien d'autre), `sw.js` (cache v108 → v109).
2. **D'où viennent les données.** D'aucune part : une cote de mise en page.
   Posée en **CSS**, jamais depuis le JS (§ 3).
3. **Comment on l'enlève.** Retirer `min-height:60dvh` de `.viewport`.
4. **Ce que ça casse ailleurs.** Rien de mesurable : `min-height` ne peut
   qu'agrandir une section plus courte que 60 dvh, et 60 dvh reste franchement
   sous la hauteur d'écran une fois l'en-tête et la barre du bas déduits — la
   page n'est donc pas allongée. Sur Collection et Ma pile, dont le contenu
   dépasse, la règle est inerte.

**Vérifié**, et mesuré plutôt que regardé (§ 5) : page témoin portant `styles.css`
et le squelette réel de la piste, Chromium piloté à 390 × 844, section courante
réduite à une phrase.

| | Hauteur de `#tabViewport` | `elementFromPoint(195, 400)` | `body.scrollHeight` |
|---|---|---|---|
| Sans la règle | **23 px** | `#app` — hors du listener | 844 |
| Avec la règle | **506 px** | `#tabViewport` | 844 |

La troisième colonne est la preuve que la page n'est pas allongée, et la
deuxième est le défaut lui-même : au milieu de l'écran, le doigt ne touchait pas
la piste.

**NON vérifié.** Rien n'a été ouvert sur un vrai téléphone ni dans l'app
complète — le harnais local vit dans `.claude/`, absent de ce dépôt. Le geste
lui-même (verrou de direction, seuil, lancer) n'a pas été rejoué : il n'a pas
changé d'une ligne. À juger au pouce : sur la remontée un jour vide, le glissé
vers Collection doit partir du **milieu de l'écran**, pas seulement de la phrase.

---

## Ticket #9 — LIVRÉ (v3.12) — la bande morte sous le contenu

**Observation.** « Le correctif du glissé est OK, sauf que si on glisse en ayant
le doigt sous le bouton “Commencer la revue”, le glissé ne fonctionne pas. »

**Même cause que le ticket #8, par l'autre bord.** La zone d'écoute du geste est
la boîte de `#tabViewport`. Le `min-height:60dvh` du #8 traite le contenu
**court** ; il ne peut rien quand le contenu est plus **haut** que 60 dvh, le
viewport s'arrêtant alors à son dernier pixel. Les ~142 px qui suivent sont le
`padding-bottom` de `#app` — la garde de la barre du bas : le doigt s'y posait
sur `#app`, hors du listener.

1. **Fichiers touchés.** `styles.css` (la cote sort en variable `--navclear` sur
   `#app`, et `.viewport` reçoit `padding-bottom:var(--navclear)` +
   `margin-bottom:calc(-1 * var(--navclear))`), `app.js` (version + journal),
   `sw.js` (cache v109 → v110).
2. **D'où viennent les données.** Aucune : mise en page, en CSS (§ 3).
3. **Comment on l'enlève.** Retirer les deux propriétés de `.viewport`.
4. **Ce que ça casse ailleurs.** Rien de mesurable : le padding et la marge
   négative s'annulent, la hauteur de page est identique au pixel près. La bande
   couverte est vide par construction — c'est la garde de la barre du bas.

**Vérifié au ruban** (page témoin, Chromium 390 × 844, contenu de 692 px suivi
d'un bouton) :

| `elementFromPoint(195, y)` | 40 px sous le bouton | à 800 px | `scrollHeight` |
|---|---|---|---|
| Sans la règle | `#app` — hors du listener | `#app` | 844 |
| Avec la règle | `#tabViewport` | `#tabViewport` | 844 |

**NON vérifié.** Rien sur un vrai téléphone. Le geste lui-même n'a pas changé
d'une ligne.
