# Tickets — ce qui reste après la v3.23

Ouvert le 06/09/2026, à la suite de l'audit (`docs/audit-donnees-et-sauvegardes.md`)
et de la livraison des sauvegardes en ligne (v3.23, ticket #33).

Quatre tickets. Les trois premiers sont les trois trous nommés au § 5 de
l'audit ; le quatrième vient d'une question posée après coup — « l'app ne
pourrait-elle pas proposer de faire des exports régulièrement ? ».

**Aucun n'est implémenté.** Ce fichier est la file d'attente, pas un compte rendu.
Chacun répond aux quatre questions du § 2 du CLAUDE.md : les fichiers touchés,
d'où viennent les données, comment on l'enlève, ce que ça casse.

**Ordre de livraison conseillé : #37, #34, #35, #36.** Il ne suit pas la gravité
mais le rapport valeur/coût : le #37 est celui qui protège du sinistre le plus
grave (perdre le compte) pour le coût le plus faible, et le #36 est un chantier
d'une autre taille que les trois autres réunis.

---

## Ticket #34 — les catégories et les réglages entrent dans les sauvegardes

**Le trou (C6 de l'audit).** `brain:v1:settings` vit dans le `localStorage` de
l'appareil et **n'est nulle part ailleurs**. Il porte les catégories (`cats`), les
icônes (`catIcons`), les images de catégorie (`catCovers`), les épingles
(`catPins`), les vues épinglées, les sourdines, et tous les réglages. Un vidage
des données de site les emporte tous.

Pire, et c'est ce qui rend le ticket nécessaire plutôt que confortable :
**l'export fichier ne les contient pas non plus.** `exportData()` écrit `items`
et `media`, rien d'autre. Quelqu'un qui restaure un export sur un appareil neuf
retrouve donc ses items **rangés dans des catégories qui n'existent plus comme
objets** — les noms survivent dans `item.domain`, mais les icônes, les images et
l'ordre sont perdus.

**Périmètre.** `app.js` seul.

**Ce qui change.**

1. `exportData()` ajoute `settings` à l'objet écrit ; `importData()` le relit et
   le fusionne (`{...DEFAULT_SETTINGS, ...importé}`), puis `saveSettings()`.
2. Un miroir en base : `saveSettings()` écrit AUSSI `brain:v1:settings` dans
   `kv`, et `loadSettings()` va le chercher si le `localStorage` est vide.
3. `autoSnap()` emporte `settings` dans l'instantané du jour — une ligne de plus
   dans le même objet, aucun coût.

**D'où viennent les données.** Aucun champ nouveau. `settings` existe, `kv`
existe, l'instantané existe. Rien à migrer.

**Comment on l'enlève.** Trois ajouts indépendants, chacun retirable seul. La
clé `kv` en trop se supprime en SQL.

**Ce que ça casse — les quatre points trouvés en lisant.**

1. **`saveSettings()` est appelé ~90 fois et est SYNCHRONE** (v2.76). Il rend un
   booléen que `setCatCover` lit. Y ajouter une écriture réseau le rendrait
   asynchrone, donc changerait le contrat de 90 appelants. **La seule forme
   acceptable est une écriture différée et coalescée** — un `setTimeout` qui
   recopie l'état courant quelques secondes plus tard, comme `_wrPend` le fait
   déjà pour les items (v2.88). Le booléen continue de ne parler que du
   `localStorage`.
2. **`catCovers` contient des images en base64.** C'est ce qui fait qu'un
   `saveSettings` peut dépasser le quota (raison d'être du booléen de la v2.76).
   Les recopier en base à chaque changement de réglage serait un gros blob de
   plus, souvent. **À trancher : exclure `catCovers` du miroir en base et de
   l'instantané**, en le disant dans l'écran (« les images de catégorie ne sont
   pas sauvegardées »), ou l'accepter et mesurer d'abord la taille réelle.
   Je penche pour l'exclure du MIROIR et le garder dans l'EXPORT fichier.
3. **Deux appareils, deux `settings`.** Le miroir en base fait que le dernier
   appareil qui règle quelque chose gagne — y compris `lastTab` et `frameDay`,
   qui sont des états d'appareil et non des préférences. **Il faut une liste
   explicite de ce qui se recopie** (les catégories, les icônes, les épingles,
   les préférences) et de ce qui reste local (`lastTab`, `frameDay`,
   `lastExportAt`, `iconRecents`). Sans cette liste, le ticket importe le
   problème du #36 dans les réglages.
4. **Un import ne doit pas écraser les réglages sans le dire.** `importData`
   annonce aujourd'hui « N items importés » ; il devra dire qu'il a aussi
   remplacé les catégories, et probablement le demander.

---

## Ticket #35 — récupérer les médias orphelins

**C'est l'ancien ticket #30**, ouvert depuis la perte du 06/09 et jamais écrit.

**Le trou (C8 de l'audit).** Cinq lignes `brain:v1:media:<id>` ont survécu à la
destruction de la pile **sans item pour les porter**. Les photos sont en base,
intactes, et rien ne les affiche. Elles portent leur `id` d'item d'origine et
leur date d'écriture (`updated_at`).

**Périmètre.** `app.js` seul. Une ligne dans Réglages → Données, sur le modèle
exact de « Raccourcir les titres importés » (v3.04) : **la ligne n'apparaît que
s'il y a à faire, et disparaît une fois passée.**

**Ce qui change.**

1. `storage.list(KEY_MEDIA)` donne toutes les clés de média ; la différence avec
   les `id` d'items connus donne les orphelins.
2. La ligne annonce le compte. Un `confirm()` dit ce qu'on récupère **et ce
   qu'on ne récupère pas** : l'image oui, la date d'origine oui ; le titre, la
   catégorie, les tags, l'URL, non — ils étaient dans le blob détruit.
3. Un item est recréé par média : `type` déduit du préfixe base64,
   `hasMedia:true`, `createdAt` tiré d'`updated_at`, `domain:null` (donc « non
   classé », donc visible là où on range), `content` = un libellé neutre.

**D'où viennent les données.** Rien de nouveau : les médias sont en base, les
items sont un blob JSON où une clé de plus n'est qu'une clé de plus. Aucune
migration.

**Comment on l'enlève.** La ligne et sa fonction. Les items recréés restent —
ce sont des items ordinaires, jetables à la main.

**Ce que ça casse — les points à traiter.**

1. **`storage.list` ne rend que les clés, pas `updated_at`.** Il faut soit
   étendre `list` (index.html, donc le gabarit — à éviter), soit accepter de
   dater les items recréés d'aujourd'hui et le DIRE. **À trancher.** Dater
   d'aujourd'hui est plus honnête qu'une fausse date, mais fait remonter cinq
   vieilles photos en tête de pile.
2. **Idempotence.** Deux passages ne doivent pas créer dix items : la seconde
   passe ne trouve plus d'orphelin, par construction — mais il faut le vérifier
   plutôt que le supposer.
3. **Les lignes à `null`.** Deux lignes `media:` valent `null` en base (ticket
   #29). Elles ne sont pas des orphelins et ne doivent pas fabriquer un item
   vide : filtrer sur la valeur, pas seulement sur la clé.
4. **`saveItems()` est attendu avant toute annonce** (v2.66), et la garde
   d'effondrement de la v3.23 n'est pas concernée — on ajoute, on ne retire pas.

---

## Ticket #36 — deux appareils qui écrivent, et le dernier qui gagne

**Le trou (C3 de l'audit).** Deux appareils ouverts, chacun avec son état en
mémoire. Le second qui enregistre écrase les gestes du premier. `kv` n'a ni
version ni comparaison : le dernier `upsert` gagne, **en silence**.

**C'est le plus gros des quatre tickets, et le seul qui touche `index.html`.**
À ne pas ouvrir en même temps qu'un autre.

**Périmètre.** `index.html` (la couche `window.storage`) et `app.js`.

**Ce qui change.** Un jeton d'écriture, relu avant d'écrire.

1. `storage.get` sélectionne `value, updated_at` au lieu de `value` seul — la
   colonne **existe déjà**, elle est écrite par `set` depuis le premier jour et
   n'a jamais été lue.
2. `loadState` mémorise l'`updated_at` reçu.
3. Avant d'écrire, `_writeItems` relit l'`updated_at` de la ligne. S'il a bougé,
   **un autre appareil est passé** : on n'écrase pas — on prévient, et on
   propose de recharger.

**D'où viennent les données.** Aucun champ nouveau, aucune migration :
`updated_at` est une colonne existante, écrite et jamais lue. C'est la raison
pour laquelle ce ticket est faisable ; sans elle, il aurait fallu changer le
format du blob.

**Comment on l'enlève.** Le `select` revient à `value`, la comparaison saute.
Aucune donnée écrite ne devient invalide.

**Ce que ça casse — et il y a de quoi.**

1. **Un aller-retour de plus AVANT chaque écriture**, donc à chaque geste. C'est
   le coût réel du ticket, et il est payé sur le lien du téléphone que la v2.88
   a passé du temps à désencombrer. **Piste : ne relire que si la dernière
   écriture date de plus de N secondes** — deux gestes d'affilée sur le même
   appareil ne peuvent pas se concurrencer eux-mêmes.
2. **La coalescence de la v2.88 doit suivre.** `_wrPend` fait qu'une écriture en
   attente couvre les appels arrivés pendant la précédente ; le jeton doit être
   relu par l'écriture qui part réellement, pas par celle qui a été absorbée.
3. **Que fait-on du conflit ?** Écraser est ce qui se passe aujourd'hui.
   Recharger perd le geste en cours. Fusionner est un vrai chantier (il faut un
   horodatage par item, donc un champ, donc une migration). **À trancher au
   pouce, et probablement : prévenir et proposer de recharger**, ce qui est déjà
   infiniment mieux qu'un écrasement muet.
4. **Le cas normal doit rester silencieux.** Un appareil seul ne voit jamais son
   propre jeton bouger, et ne doit donc rien afficher, jamais.

---

## Ticket #37 — l'app propose de faire un export, de temps en temps

**L'observation, mot pour mot :** « je me demandais si l'app ne pouvait pas
proposer de faire des exports régulièrement ».

**Pourquoi ce ticket compte plus que sa taille ne le suggère.** L'export fichier
est la **seule** copie qui sorte de l'infrastructure — la seule qui survive à la
perte du compte ou à un incident du projet Supabase (C5), et la seule qui
contienne les médias. C'est donc la sauvegarde la plus précieuse des trois, et
c'est la seule qui dépende d'un geste que personne ne pense à faire. La v3.23 a
rendu son âge visible ; ce ticket va au bout : **c'est l'app qui y pense.**

**Et la limite technique, dite d'emblée, parce qu'elle décide de la forme.** Un
navigateur **n'écrit pas sur le disque sans un geste de l'utilisateur** : un
téléchargement déclenché sans clic est bloqué ou silencieusement ignoré, et sur
iOS en PWA c'est pire encore. L'app ne peut donc pas « faire des exports
automatiquement ». Elle peut **proposer**, et le clic est à un doigt. Ce n'est
pas un pis-aller : le problème n'a jamais été la difficulté du geste, c'est qu'on
n'y pense pas.

**Périmètre.** `app.js` seul.

**Ce qui change.**

1. Un réglage **Rappel d'export** dans Réglages → Données : `Jamais · Mensuel ·
   Trimestriel`, défaut **Mensuel**.
2. Au lancement, si `settings.lastExportAt` est plus vieux que le rythme choisi,
   l'app le dit **une fois**, et propose le geste en un tap.
3. Faire l'export met à jour `lastExportAt` (déjà écrit en v3.23), donc éteint le
   rappel pour la période suivante. « Plus tard » repousse d'une semaine.

**D'où viennent les données.** Un champ de `settings` pour le rythme, et
`lastExportAt` qui existe déjà (v3.23). Un second pour la date de report.
**Tout est dans `localStorage` : aucune migration, rien en base.**

**Comment on l'enlève.** Le réglage retiré de `DEFAULT_SETTINGS` et l'appel
retiré de `startApp` : la ligne d'âge de l'export (v3.23) reste et suffit.

**Ce que ça casse — les cinq points, et le troisième est le vrai sujet.**

1. **La file du lancement est déjà chargée.** `startApp` enchaîne l'onboarding,
   le partage entrant, et le cadre du matin (`announceRise`), lequel s'abstient
   déjà sur un partage et pendant la présentation. **Le rappel doit s'abstenir
   aux MÊMES conditions, et passer APRÈS le cadre du matin** — deux choses qui
   s'ouvrent seules le même matin, c'est une de trop.
2. **Le verrou « une fois » existe déjà, en modèle.** `settings.frameDay` porte
   le jour déjà servi par le cadre (v2.84) : le rappel prend la même forme, une
   date en clair, avec la même propriété — l'avoir vu vaut « vu », même si on
   n'a pas fait l'export.
3. **Quelle FORME, et c'est à trancher au pouce, pas d'avance.** Trois candidats,
   par ordre d'intrusion croissante : (a) une simple pastille sur la ligne des
   Réglages — honnête, mais invisible à qui n'ouvre pas les Réglages, donc
   probablement inutile ; (b) un **toast** avec une action « Exporter » — le
   composant existe, coût quasi nul, mais un toast s'efface et peut ne pas être
   vu ; (c) une **bande** dans l'écran, façon cadre du matin — vue à coup sûr,
   mais c'est un objet d'UI nouveau pour un événement qui arrive douze fois par
   an. **Mon avis : (b), et (a) en permanence à côté.** Le toast est le seul des
   trois qui n'invente rien et se retire en une ligne. Si le pouce trouve qu'il
   passe inaperçu, (c) reste ouvert — mais on l'aura constaté au lieu de le
   supposer.
4. **Un rappel qu'on ne peut pas honorer est pire que pas de rappel.** Si
   l'export échoue (`toast("Export impossible ici")` existe déjà), le rappel ne
   doit **pas** se marquer comme servi. Et il doit s'abstenir quand la pile n'a
   jamais été lue (`stateReady` faux) : proposer d'exporter une pile qu'on n'a
   pas su lire produirait un fichier vide, ce qui est exactement le genre de
   fausse sécurité que tout ce chantier combat.
5. **Le premier lancement.** `lastExportAt` vaut 0 pour tout le monde
   aujourd'hui : le rappel se déclencherait au premier démarrage suivant le
   déploiement, sur une pile de trois items comme sur une pile de deux cents.
   **À trancher : n'armer le rappel qu'au-delà d'un nombre d'items** (dix ?), ou
   poser `lastExportAt` à la date d'installation au premier chargement. Je
   penche pour le seuil d'items — il dit la vraie condition, « tu as maintenant
   quelque chose à perdre ».

⚠ **Ce que ce ticket ne fait PAS, et qu'il ne faut pas lui prêter.** Il ne crée
aucune sauvegarde automatique de plus : il transforme un geste qu'on ne fait
jamais en un geste qu'on fait douze fois par an. La sauvegarde automatique hors
infrastructure, la vraie, reste hors du dépôt — export planifié côté serveur, ou
plan Supabase payant (§ 4 de l'audit).
