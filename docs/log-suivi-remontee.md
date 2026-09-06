# Journal de suivi — la remontée, après mise en ligne

Ouvert le 06/09/2026, au retour du premier usage réel de la v3.09
(ticket « porte basse », PR #5, mergé et en ligne).

Quatre observations au pouce, transcrites telles quelles, puis instruites.
**Aucune n'est encore implémentée** — ce fichier est la file d'attente, pas un
compte rendu.

---

## Les observations, mot pour mot

> 1. Le slide droite gauche pour passer entre pile et catégories fonctionne. Il faut le faire
>    également pour passer entre catégorie et remontée.
> 2. Les icônes de catégories, pile ou remontées, sont un peu trop sombre, en mode pas
>    sélectionné. Les rendre légèrement plus clair pour que la différence soit plus voyante entre
>    l'icône en mode sélectionné et l'icône highlights.
> 3. Dans les settings on peut maintenant aussi choisir à l'ouverture la remontée.
> 4. Et on va aussi dans settings pouvoir choisir l'ordre des tabs entre pile, catégories et
>    remontée.

---

## Ce que l'instruction a trouvé, et qui change le découpage

**Les observations 1, 3 et 4 ne sont pas trois tickets : elles sont une seule décision
d'architecture, plus deux écrans de réglage.**

La v3.09 a délibérément fait de la remontée **une porte et non un onglet** :

> PAS de `data-tab` : `selectTab`/`paintTabs` translatent `#tabTrack` vers une fente indexée par
> `TAB_ORDER`, qui n'en a que deux, et l'attribut ferait chercher une troisième fente inexistante.

Ce raisonnement était juste **pour ce que le ticket demandait alors** — une porte vers une
feuille. Les trois observations d'aujourd'hui le périment toutes les trois, et chacune pour la
même raison de fond : **elles traitent la remontée comme une PAIRE des deux onglets**, pas comme
un bouton à côté d'eux.

- On ne glisse pas vers une feuille (obs. 1) : on glisse vers une **section de la piste**.
- On n'ouvre pas l'app « sur une feuille » (obs. 3) : `startTab` nomme une **fente de piste**.
- On ne réordonne pas un bouton parmi deux onglets (obs. 4) : on réordonne **trois pairs**.

**La décision, donc : la remontée devient un vrai troisième onglet.** La feuille livrée en v3.09
devient le contenu de la section `#tab-rise`. C'est un revirement assumé de la v3.09, à écrire
comme tel dans le journal d'`app.js` — un ticket qui renverse une décision de trois semaines
sans le dire est un piège pour le prochain lecteur.

**Ce que ça NE change pas** : le rituel plein écran (`#rise`, `renderStage`), la mécanique du
tirage, l'annonce en toast, l'âge, la ligne. Tout le contenu de la v3.09 est repris tel quel ;
seul son **contenant** change.

**Une bonne nouvelle mesurée dans le code** : `paintTabs` lit déjà `tabOrder()` et non `TAB_ORDER`
directement, et `orderTrack()` réaligne déjà le DOM sur la constante au démarrage (leçon des
écrans blancs v2.22 et v2.39). L'indirection nécessaire à l'observation 4 **existe donc déjà** :
il reste à la faire dépendre des réglages plutôt que d'une constante.

L'observation 2 est indépendante des trois autres et se livre séparément.

---

## Ticket #1 — la remontée devient un onglet, et le glissé la rejoint

**Observation 1.** Périmètre : `index.html`, `app.js`, `remontee.js`, `remontee.css`.

**Ce qui change.** Une `<section id="tab-rise">` entre dans `#tabTrack` ; `TAB_ORDER` passe à
trois entrées ; la porte reçoit `data-tab="rise"` et redevient un onglet ordinaire ; le contenu de
la feuille (`riseOpenSheet`) devient un **rendu de page** (`renderRiseTab`). Le glissé entre
onglets n'est **pas touché d'une ligne** : il lit `tabOrder()` et la largeur de la fenêtre, donc
il traversera trois fentes dès que la constante en aura trois.

**D'où viennent les données.** Aucune donnée nouvelle : le contenu est celui de la v3.09.

**Comment on l'enlève.** Le revirement est un commit unique ; le contenu de la feuille est
inchangé et se remettrait dans `#appSheet` en rebranchant `riseOpenSheet`.

**Ce que ça casse — les cinq points à traiter, tous trouvés en lisant :**

1. **`orderTrack()` doit voir la section**, sinon on rejoue l'écran blanc de la v2.39 : la piste
   empile ses sections dans l'ordre du DOM, `paintTabs` translate d'après le rang dans
   `TAB_ORDER`, et les deux doivent coïncider. La fonction existe et le fait déjà — il faut
   seulement que la section soit dans le markup.
2. **`selectTab` pose `.active` d'après `dataset.tab`** : avec l'attribut, la porte s'allume et
   s'éteint toute seule. La règle `.tabs button.active` s'applique alors à elle — c'est voulu.
3. **`riseMaybeAnnounce` s'abstient sous une couche** en excluant `"tab"`. Avec trois onglets, la
   remontée AFFICHÉE rend l'annonce absurde : ajouter une garde `curTab!=="rise"`.
4. **La pastille du compte** (`.rcnt`) n'a plus lieu d'être quand on EST dans l'onglet : à
   masquer sur l'onglet courant, sinon elle annonce ce qu'on regarde.
5. **Le rail bureau** — `styles-desktop.css` stylise `.tabs button` génériquement, donc rien à
   faire ; mais `desktop-v2.js` observe le franchissement des 1100 px et devra être relu pour la
   troisième section.

⚠ **La liste de contrôle de la v3.09 n'a jamais été déroulée** (`docs/ticket-remontee-porte-basse.md`
§ 5). Ce ticket la remet en jeu : la dérouler ici, sur la forme onglet.

---

## Ticket #2 — l'onglet actif doit se distinguer SANS la couleur

**Observation 2**, et c'est celle qui a le plus changé en cours d'instruction.
Périmètre : `styles.css` seul. Planche :
https://claude.ai/code/artifact/ac39de1f-6e8a-4459-baab-5df96db5883e

### Le diagnostic : ce n'était pas la valeur du gris

La demande était « éclaircir l'inactif ». Trois échelles de gris plus tard, le rapport a donné
la vraie cause : **« même le 4 j'ai des difficultés, à cause de mon daltonisme »**.

Le bon indicateur n'est pas le contraste de chaque état avec le fond, mais **celui des deux états
l'un par rapport à l'autre** :

| | inactif | actif | écart |
|---|---|---|---|
| **Sombre** | `#908671` | `#D8A25A` | **1,58** — et ça convient |
| **Clair** | `#736959` | `#87571D` | **1,14** — et ça ne convient pas |

En thème clair, l'actif et l'inactif ont **quasiment la même clarté** : leur seule différence est
la **teinte**, exactement l'axe qu'un œil daltonien ne lit pas. Le thème sombre fonctionne parce
que son accent est franchement plus *clair* que le gris — l'information y passe par la luminance,
sans que personne l'ait décidé.

**Aucune valeur de gris ne pouvait donc régler le défaut** : l'échelon le plus clair testé ne
monte l'écart qu'à 1,82. Il fallait un canal qui ne soit pas la couleur. C'est le genre de
correctif qu'on ne trouve pas en regardant — seulement en mesurant, et seulement après avoir
écouté quelqu'un dire qu'il ne voit pas ce qu'on lui montre.

### La décision : la pastille pleine, dans les deux thèmes

L'onglet actif reçoit un **fond `--accent` plein** et son libellé passe en `--accent-ink`.
C'est un **renversement de clarté** : là où l'inactif est une encre sombre sur papier clair,
l'actif devient une encre claire sur aplat sombre. L'information ne passe plus par la teinte mais
par la **forme** et la **luminance** — les deux canaux que le daltonisme laisse intacts.

Mesures de la forme retenue :

| | encre sur pastille | pastille vs barre | inactif vs encre active |
|---|---|---|---|
| **Clair** | 4,58 | **4,51** | 3,73 |
| **Sombre** | 7,53 | **7,69** | 5,50 |

La colonne du milieu est celle qui compte : **l'aplat lui-même se détache du papier**, donc
l'onglet courant se repère avant même qu'on lise son libellé — et il survit au test en niveaux de
gris, le plus sévère des trois simulateurs de la planche.

**Les deux thèmes prennent la même forme.** Le sombre n'en avait pas besoin, mais une barre qui
change de grammaire selon le thème est une divergence qu'on paierait un jour ; et la mesure y est
meilleure encore.

**L'inactif s'éclaircit aussi**, comme demandé au départ — `#8E8371` en clair, `#9C917B` en
sombre. Ce n'est plus lui qui porte la distinction, donc le plafond AA cesse d'être le facteur
limitant : c'est la pastille qui porte l'information, et elle est au-dessus de 4,5 dans les deux
thèmes.

### Le chemin d'implémentation

**Fichiers.** `styles.css` seul — `.tabs button` et `.tabs button.active`. Le rail bureau
(`styles-desktop.css:67`) pose DÉJÀ un fond sur l'actif (`--accent-soft`) : il faudra décider s'il
s'aligne sur la pastille pleine ou garde le sien. **À trancher au pouce, pas d'avance.**

**Données.** Aucune. Aucun champ, aucune migration, aucun token nouveau : `--accent` et
`--accent-ink` existent et servent déjà au bouton primaire.

**Retrait.** Deux déclarations à retirer.

**Ce que ça casse.** Rien de mécanique. Deux points à regarder :
1. **La pastille du compte de la remontée** (`.rcnt`) porte un liseré `box-shadow:0 0 0 2px
   var(--surface)` qui la découpe du glyphe. Sur un onglet actif à fond plein, ce liseré devient
   faux — il doit prendre la couleur de la pastille, ou disparaître.
2. **La hauteur de la barre ne change pas** : le fond se pose sur un bouton qui a déjà
   `--tap` (48 px) et son rayon. Rien à recoter.

⚠ **Non vérifiable ici** : le rendu réel pour l'œil du rapporteur. Le simulateur de la planche est
une matrice appliquée en sRGB, pas un modèle perceptuel. La forme a été **validée au pouce sur la
planche** — c'est la seule vérification qui vaille, et elle a eu lieu.

---

## Ticket #3 — ouvrir l'app sur la remontée

**Observation 3.** Périmètre : `app.js` (l'écran des Réglages). **Dépend du ticket #1.**

`startTab()` filtre déjà sur `TAB_ORDER` :

```js
const startTab=()=>TAB_ORDER.includes(settings.startTab)?settings.startTab:"categories";
```

Une fois `"rise"` dans la constante, le réglage l'accepte **sans une ligne de code** : il ne reste
qu'à ajouter le choix dans l'écran. C'est la meilleure preuve que le ticket #1 est la bonne
décision — trois observations, une seule cause.

**Ce que ça casse.** Un `settings.startTab` valant `"rise"` sur une installation où la surcouche
serait retirée retomberait sur `"categories"` par le filtre : le repli est déjà écrit.
**Aucun champ nouveau** — `settings.startTab` existe.

⚠ **Un point à trancher** : ouvrir sur la remontée un jour où rien ne remonte donne un écran qui
explique pourquoi (`riseVoidReason`). C'est honnête, mais c'est un accueil terne. Alternative à
peser : basculer sur Collection quand le tirage est vide. Je penche pour **ne pas** basculer —
une app qui n'ouvre pas où on lui a dit est pire qu'un écran calme.

---

## Ticket #4 — choisir l'ordre des onglets

**Observation 4.** Périmètre : `app.js`, `index.html` (l'écran des Réglages). **Dépend du #1.**

**L'indirection existe déjà.** `paintTabs` lit `tabOrder()`, pas la constante ; `orderTrack()`
réaligne le DOM sur elle au démarrage. Le ticket consiste à faire dériver `tabOrder()` d'un
réglage, et à réappeler `orderTrack()` + `paintTabs()` au changement.

**D'où viennent les données.** `settings.tabOrder`, **champ nouveau** — et c'est la seule
exception du lot à l'invariant « pas de champ nouveau sans nécessité ». Elle est justifiée : un
ordre choisi ne se dérive de rien. Coût de migration **nul** (les réglages sont un blob JSON dans
`localStorage`, une clé de plus n'est qu'une clé de plus), avec repli sur l'ordre par défaut si la
valeur est absente ou invalide.

**Ce que ça casse — le piège, écrit avant de coder :** `TAB_ORDER` est lu **directement** (et non
via `tabOrder()`) à quatre endroits au moins, dont `paintTabs` lui-même pour la boucle
`.tabcur` et `selectTab` pour la validation du nom. Un ordre dynamique qui n'en corrigerait que
trois rejouerait **exactement** le décalage d'un cran des v2.22 et v2.39 — deux écrans blancs, la
seule classe de bug que ce dépôt ait payée deux fois. La validation doit porter sur
l'**appartenance** (le nom est-il un onglet connu), jamais sur le **rang**.

⚠ **À trancher** : trois onglets font six ordres possibles. Un sélecteur à six entrées est
illisible ; trois pastilles qu'on réordonne au tap est le geste juste mais c'est du travail.
Proposition : **un segment à trois positions qui nomme le PREMIER onglet**, les deux autres
gardant leur ordre relatif. Trois choix au lieu de six, et c'est la seule question qu'on se pose
vraiment (« qu'est-ce que je veux voir en premier »).

---

## L'ordre de livraison

`#1` d'abord — il porte la décision d'architecture dont `#3` et `#4` dépendent.
`#2` est indépendant et peut partir à tout moment, y compris avant.
`#3` est presque gratuit une fois `#1` posé.
`#4` en dernier : c'est le seul qui introduit un champ, et le seul qui puisse rendre un écran blanc.
