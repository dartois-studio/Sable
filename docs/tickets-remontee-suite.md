# Tickets #10 à #13 — la remontée après la revue, et ce qu'elle pourrait porter

Écrits après la mise en ligne de la v3.13 (PR #8 mergée, testée : le glissé, la
fusion, les deux réglages d'onglets fonctionnent). Trois observations au pouce,
plus une dette laissée ouverte à la session précédente.

**Ordre proposé :** #10 d'abord (c'est un bug, les deux autres sont des ajouts),
puis #13 (deux lignes), puis #11, puis #12 — #12 dépend de #11 pour la place
qu'il occupe à l'écran.

---

## Ticket #10 — l'onglet Remontée reste sur la liste d'avant après la revue

**Observation.** « Juste après avoir fait la revue, une fois que c'est fini et
qu'on retrouve l'onglet Remontée, la liste avec le bouton “Commencer la revue”
est toujours là. J'ai besoin de changer d'onglet et de revenir pour voir
apparaître “C'est fait pour aujourd'hui”. »

**La cause est nommée, et elle tient en une ligne.** `closeRemontee()`
(`app.js` l.1016) finit par `renderBadges()`. Cet appel a été posé en v3.01
pour une raison qui était juste **à l'époque** : « revenir du rituel, c'est
revoir le cadre ». Mais depuis le ticket #1, la remontée n'est plus un cadre
dans l'en-tête, c'est une **section d'onglet**, et `renderBadges()` ne redessine
que la pastille du compte (`paintRiseTab`, par l'enveloppe posée sur elle) —
**jamais le corps de la section**, qui est rendu par `renderRiseTab()`. Le seul
autre appelant de `renderRiseTab` étant `selectTab`, il faut effectivement
quitter l'onglet et y revenir.

C'est la même famille que le défaut réparé en v3.01, reproduite par le
changement de contenant : le point de sortie est bon, ce qu'il repeint ne l'est
plus.

1. **Fichiers touchés.** `app.js` seul, dans `closeRemontee()`.
2. **D'où viennent les données.** D'aucune part de neuf. `renderRiseTab()` relit
   `riseFrameIds()` et `batch`, tous deux déjà à jour à ce moment-là — c'est
   précisément ce qui fait que l'écran devient juste au retour sur l'onglet.
   **Aucun champ, aucune migration.**
3. **Comment on l'enlève.** Retirer l'appel ajouté.
4. **Ce que ça casse ailleurs.** Le risque est de rendre une section qui n'est
   pas à l'écran : `renderRiseTab()` écrit aussi `settings.frameDay` (regarder
   la page vaut « vu »). Le rendre depuis `closeRemontee` alors qu'on est sur
   Collection consommerait donc la journée sans que rien n'ait été montré.
   **L'appel doit donc être gardé par `curTab==="rise"`**, et c'est le seul
   piège du ticket. À écrire avant de coder, comme ici.

⚠ **À vérifier au pouce, pas seulement au banc :** les quatre sorties du rituel
(les trois gestes de carte, et l'abandon en cours) passent bien par
`closeRemontee`. Si l'une d'elles sort autrement, elle gardera le défaut.

---

## Ticket #11 — les non classés dans l'onglet Remontée

**Demande.** « Dans l'onglet remontée on pourrait aussi avoir les non-classés. »

**Ce qui existe déjà, et qu'il ne faut pas dupliquer.** `unfiledDue()`
(`app.js` l.1043) compte les items actifs sans catégorie, et `renderBadges()`
peint déjà une ligne `#openUnfiled` **au pied de l'index de Collection** — c'est
la place que le ticket « porte basse » leur avait donnée, avec un argument
explicite : « ce n'est pas de la remontée, c'est du rangement ».

**La demande revient donc sur cette décision, et c'est légitime** — mais elle
doit être tranchée, pas empilée : deux portes vers la même chose, c'est
exactement ce que la v3.09 avait refusé en supprimant `#inboxBtn`. Trois formes,
et il faut en choisir UNE :

1. **Déplacer** la ligne : elle quitte le pied de Collection pour la remontée.
   Cohérent (une porte, une seule), mais on perd le rangement là où on range.
2. **Un bloc distinct** en bas de la remontée, sous le tirage, visuellement
   séparé et nommé « À ranger » — la remontée devient l'écran du rituel *et* de
   l'arriéré. C'est un changement de définition de l'onglet, à assumer comme tel.
3. **Seulement quand le tirage est vide** : le jour où rien ne remonte, l'écran
   propose de ranger plutôt que d'expliquer son silence. C'est la forme la moins
   coûteuse et la plus honnête — l'écran vide devient utile sans que l'onglet
   change de sens les autres jours.

**Ma recommandation : la forme 3**, et garder la ligne au pied de Collection.

1. **Fichiers touchés.** `app.js` (le bloc `renderRiseTab`), `styles.css` si le
   bloc a besoin d'une forme propre — sinon il réutilise `.rline`.
2. **D'où viennent les données.** `unfiledDue()` et un filtre sur `items` :
   **dérivé, aucun champ, aucune migration** (§ 3).
3. **Comment on l'enlève.** Le bloc est un `if` dans une seule fonction.
4. **Ce que ça casse ailleurs.** `riseVoidReason()` explique aujourd'hui le vide ;
   il faudra décider si la phrase reste au-dessus du bloc « À ranger » ou cède
   sa place. Et attention à la promesse du ticket #3 (« ouvrir sur la remontée
   un jour vide ») : l'écran d'accueil deviendrait un écran de rangement.

---

## Ticket #12 — « en remonter d'autres »

**Demande.** « Et peut-être un bouton pour demander si on veut en remonter
d'autres. »

**Ce que la mécanique permet déjà.** `riseAdHoc` existe (`closeRemontee` le
remet à zéro, l.1022) : c'est la « porte de secours » qui fait passer un rituel
sur des ids choisis hors tirage, sans rien écrire. Le ticket consiste donc à lui
donner une **entrée**, pas à inventer un mécanisme.

**Les deux questions à trancher avant de coder, et elles sont de fond :**

- **Combien, et lesquels ?** Le tirage du jour est plafonné par `batchSize`
  (1 / 3 / 5, défaut 3) — un plafond posé délibérément en v2.23 : « un rituel de
  8 cartes ne se termine pas ». Un bouton qui en sert d'autres à volonté défait
  ce plafond. La forme qui ne le défait pas : **un second lot de la même
  taille**, une fois, avec un libellé qui le dit (« Encore N »).
- **Est-ce que ça consomme la journée ?** Non, à mon sens : le tirage du jour
  est un rituel, le rab est un extra. Donc `batch` n'est pas réécrit et
  `settings.frameDay` reste posé — c'est exactement ce que `riseAdHoc` fait déjà.

**Ce qui rend le bouton lisible :** il n'apparaît qu'**après** la revue,
c'est-à-dire sur l'écran « C'est fait pour aujourd'hui » — donc il dépend du
ticket #10, sans lequel cet écran ne s'affiche pas au bon moment.

1. **Fichiers touchés.** `app.js` (une fonction de tirage complémentaire à côté
   de `riseFrameIds`, et le bouton dans `renderRiseTab`), `styles.css` s'il ne
   réutilise pas `.rsgo`.
2. **D'où viennent les données.** `items` filtrés comme le tirage, en excluant
   ceux déjà servis aujourd'hui : **dérivé, aucun champ**. Attention à respecter
   la maturation de 30 j, le plancher de 60 j et les sourdines — sinon le bouton
   sert ce que la règle avait écarté, ce qui vide la règle de son sens.
3. **Comment on l'enlève.** Retirer le bouton ; `riseAdHoc` reste, il a déjà un
   autre usage.
4. **Ce que ça casse ailleurs.** Le risque est de **rendre le plafond
   décoratif** : si l'on peut toujours en redemander, `batchSize` ne règle plus
   rien. Un seul rab, et pas de bouton sur l'écran de rab.

---

## Ticket #13 — les deux boutons flottants sur la remontée

**Dette de la session précédente, jamais traitée.** Sur l'onglet Remontée, le
`+` de capture et `#fabJump` sont visibles. Le second n'a rien à proposer —
`gotoTargets()` n'a aucune ancre sur cette section — et le premier invite à
capturer sur l'écran d'un rituel de revue.

1. **Fichiers touchés.** `app.js` (`updateJumpFab`, et la garde du `+`).
2. **D'où viennent les données.** `curTab`. Rien de neuf.
3. **Comment on l'enlève.** Retirer les deux conditions.
4. **Ce que ça casse ailleurs.** Rien : ce sont deux masquages de plus dans des
   fonctions qui en tiennent déjà cinq chacune.

---

## Ticket #14 — le glissé meurt encore, sous une remontée soldée

**Écrit après le rapport au pouce sur la v3.14 en ligne.** « Quand la remontée
est faite et que j'ai la phrase "C'est fait pour aujourd'hui", le slide vers
l'autre onglet ne fonctionne pas si je glisse dans le vide sous la phrase. Ça
fait deux fois que j'ai ce bug, la dernière fois c'était sous le bouton
"Commencer la revue". Il faut que le slide soit bien sur toute la page remontée,
comme pour Catégorie et Pile. »

**La demande nomme la vraie cible : la surface, pas le cas.** C'est le troisième
rapport sur le même geste et la même cause — la zone d'écoute du glissé est la
boîte de `#tabViewport`, et cette boîte ne couvre pas la page :

| | ce qui a été posé | ce que ça laissait passer |
|---|---|---|
| #8 | `min-height:60dvh` | le contenu plus haut que la boîte |
| #9 | `padding-bottom:var(--navclear)` + marge négative | **le contenu très court** |
| #14 | `min-height:calc(100dvh - var(--hdrh))` | — |

**Pourquoi deux correctifs avant de viser juste.** `60dvh` était une valeur
**choisie** (« franchement sous la hauteur de l'écran »), c'est-à-dire au jugé.
Une valeur au jugé règle le cas qu'on a sous les yeux, pas la classe de défaut.
La cote n'est plus choisie, elle est **calculée** : tout ce qui reste sous
l'en-tête.

1. **Fichiers touchés.** `styles.css` seul, plus les deux lignes d'`app.js` que
   la règle de version impose (§ 3 du CLAUDE.md).
2. **D'où viennent les données.** D'aucune part : `--hdrh` est la **somme
   nommée** de tokens déjà là (`env(safe-area-inset-top) + --s2 + --tap + --s2`),
   soit la composition que `.topbar` écrit déjà dans son padding. Et `.topbar` la
   **consomme** en `min-height` — sans ce verrou, la somme mentirait au premier
   réglage de l'en-tête, et une somme qui ment se paye en bande morte, donc par un
   quatrième rapport.
3. **Comment on l'enlève.** Reposer une valeur en `dvh` sur `.viewport`.
4. **Ce que ça casse ailleurs.** Rien, et ça se vérifie au crayon : la
   contribution au flux vaut `min-height` + padding − marge négative =
   (100dvh − `--hdrh`), l'en-tête au-dessus vaut `--hdrh`, total **un écran
   exactement**. La page ne s'allonge pas d'un pixel.

⚠ **Ce n'est pas une rechute `--tbh` (v2.47).** Celle-là était **mesurée en JS**
et nourrissait un `position:sticky`. Celle-ci ne quitte jamais le CSS, et aucune
ligne de JS ne la lit.
