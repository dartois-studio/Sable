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

## Ticket #2 — l'écart entre l'onglet courant et les autres

**Observation 2.** Périmètre : `styles.css` seul. Mockup :
https://claude.ai/code/artifact/ac39de1f-6e8a-4459-baab-5df96db5883e

**Ce que la mesure dit, et qui contredit la demande telle qu'elle est formulée.**
Les contrastes, calculés sur `--surface` (le fond réel de la barre, pas `--bg`) :

| | inactif | actif |
|---|---|---|
| **Clair** (`#FFFDF9`) | `--text-3` #736959 → **5,31** | `--accent-deep` #87571D → **6,06** |
| **Sombre** (`#1D1913`) | `--text-3` #908671 → **4,86** | `--accent-deep` #D8A25A → **7,69** |

**En thème clair, éclaircir l'inactif réduit encore un écart déjà mince, et casse AA très vite.**
Le libellé fait 11 px, donc du petit texte, donc 4,5 minimum :

- `#7E7362` → **4,58** — la dernière valeur qui passe ;
- `#857A68` → **4,15** — hors AA, et c'est ce que les tickets #9, #10 et #15 ont payé.

**En thème sombre, c'est l'inverse** : éclaircir *augmente* le contraste (4,86 → 6,31). Le gain
y est gratuit.

**D'où quatre variantes, dont une prend le problème par l'autre bout** : au lieu de baisser
l'inactif, **lever l'actif** avec le fond `--accent-soft`. Zéro contraste perdu, et le rail bureau
le fait déjà (`styles-desktop.css:67`) — c'est le mobile qui l'annule.
**Recommandation : la variante C** (les deux), qui aligne au passage la barre sur le rail.

**En attente du choix** avant écriture.

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
