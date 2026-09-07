# Tickets — ce qui reste après la v3.23

Ouvert le 06/09/2026, à la suite de l'audit (`docs/audit-donnees-et-sauvegardes.md`)
et de la livraison des sauvegardes en ligne (v3.23, ticket #33).

Quatre tickets. Les trois premiers sont les trois trous nommés au § 5 de
l'audit ; le quatrième vient d'une question posée après coup — « l'app ne
pourrait-elle pas proposer de faire des exports régulièrement ? ».

**Aucun n'est implémenté.** Ce fichier est la file d'attente, pas un compte rendu.
Chacun répond aux quatre questions du § 2 du CLAUDE.md : les fichiers touchés,
d'où viennent les données, comment on l'enlève, ce que ça casse.

**Ajoutés le 07/09/2026, après le #36 :** le **#60** (livré en `v3.26` — le
garde-fou du #36 criait au conflit sur un appareil seul) et le **#61** (ouvert —
un conflit ne doit pas obliger à choisir entre perdre sa saisie et rester bloqué).
Tous deux en fin de fichier.

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

### Où en est ce ticket — CLOS, en ligne le 07/09/2026

**`v3.25`, PR #21, merge `36ddd9e`, Pages built.** Les trois étapes sont faites
**et vues au pouce dans les deux sens** — c'est le premier filet de ce chantier
dont on ait observé le fonctionnement au lieu de le déduire d'un banc.

| Contrôle | Résultat |
|---|---|
| Deux appareils, l'un enregistre puis l'autre | Le modal **est apparu** sur le téléphone |
| Un appareil seul, beaucoup d'enregistrements | **Aucun message** — mais le contrôle ne prouvait rien (voir ci-dessous) |

⚠ **RECTIFICATION DU 07/09/2026 AU SOIR — le second contrôle était vert pour la
mauvaise raison, et le ticket #60 en est sorti.** « Enchaîner cinq
enregistrements » les garde **tous dans les vingt secondes de grâce**,
c'est-à-dire dans le seul régime où l'on ne relit rien. Le protocole vérifiait
donc la moitié du dispositif en croyant le vérifier en entier : la comparaison de
jetons n'a jamais été exercée. Elle l'a été en usage réel trois jours de suite,
par le partage, et **elle criait au conflit sur un appareil seul**. Corrigé en
`v3.26`, ticket **#60** ci-dessous.

Ce qui reste vrai du tableau : le premier contrôle, lui, prouve bien ce qu'il
annonce — le modal apparaît quand deux appareils écrivent vraiment. Ce qui
devient faux : « aucune dérive d'horloge ne déclenche de faux conflit sur ce
parc » n'est **pas** établi par ces essais, et l'option (b) ne doit pas être
considérée comme écartée sur cette base.

**Le bon protocole pour un appareil seul**, celui à dérouler désormais :
enregistrer, **attendre plus de vingt secondes**, enregistrer à nouveau. Sans la
pause, on ne teste que la fenêtre de grâce.

Reste ouvert, en **#59** : le message est juste mais parle en vocabulaire de
synchronisation. Ce ticket-là ne touche que les mots, jamais le comportement.

- `storage.get` sélectionne `value, updated_at` et rend les deux ; `storage.set`
  rend l'horodatage qu'il vient d'écrire (`index.html`).
- `loadState` mémorise le jeton dans `_kvToken`, et chaque écriture réussie le
  rafraîchit (`app.js`).
- `_writeItems` le relit avant d'écrire, au-delà d'une fenêtre de grâce de 20 s.
  S'il a bougé : **on n'écrit pas**, un `confirm()` prévient une fois et propose
  de recharger, et le refus tient jusqu'au rechargement.
- Le shim du harnais horodate ses écritures sous une clé parallèle `@ts:<clé>`.
- Bancs : `.claude/bench-36.js` (27) et `.claude/bench-36-etape3.js` (39), sur du
  code découpé dans les fichiers et non recopié.

Le conflit ne se provoque pas depuis le harnais local — il demande deux appareils
connectés au même compte. Il a donc été jugé **au pouce, sur le parc réel**, une
fois la v3.25 en ligne, et les deux contrôles sont passés (tableau ci-dessus).
C'est cette observation qui vaut preuve ici, pas les bancs.

### La trouvaille, et ce qui a été tranché

**`updated_at` est écrit par le CLIENT, pas par Postgres.** `storage.set` passe
`new Date().toISOString()` dans son `upsert` : la valeur fournie gagne sur tout
`DEFAULT now()`. Le jeton ne vaut donc que ce que valent les horloges des
appareils — et c'est exactement la configuration que ce ticket vise. Deux
appareils qui divergent de quelques minutes rendent la comparaison peu fiable, et
deux écritures dans la même milliseconde rendent un jeton **identique**, donc un
conflit invisible.

**Tranché le 07/09/2026 : option (a), on accepte l'approximation.** Un
aller-retour réseau sépare deux écritures réelles, la collision à la milliseconde
est théorique. La dérive d'horloge, elle, ne l'est pas — c'est le prix payé.

L'option **(b)**, écartée pour l'instant et non pour toujours : rendre la colonne
autoritaire côté base, `DEFAULT now()` plus un trigger `BEFORE UPDATE`, et
`storage.set` cesse d'envoyer la valeur. C'est une écriture SQL sur la pile en
ligne : § 6 du `CLAUDE.md`, elle appartient à son propriétaire. À reprendre si le
modal se met à apparaître sur un appareil seul.

Les trois trappes de mise en œuvre, et comment elles ont été fermées :

1. **Toute écriture réussie RAFRAÎCHIT `_kvToken`** — sinon la deuxième écriture
   d'affilée se prend pour un conflit avec la première. Fermé par `storage.set`
   qui rend son horodatage, donc sans aller-retour de relecture.
2. **Le jeton est relu par l'écriture qui PART**, pas par celle que `_wrPend` a
   absorbée. Fermé par le PLACEMENT : la garde est dans `_writeItems`, où les
   appels absorbés n'arrivent jamais. Aucune ligne de code de coalescence.
3. **Un amorçage qui écrit hors de `storage.set` sème son horodatage**, sinon
   `null → date` se lit comme un conflit au premier enregistrement. Ne concernait
   que le harnais : en production une ligne `kv` naît toujours d'un `set`.

### Ce que ce ticket ne couvre pas

- **La fenêtre de 20 s** (`CONFLIT_GRACE_MS`) : un conflit qui tombe dedans est
  écrasé, sans un mot. C'est le prix de ne pas payer un aller-retour par geste.
- **Les médias.** `setMedia` écrit sa propre ligne par fichier, sans jeton. Le
  sinistre à couvrir était le blob unique où tout le reste est empilé.
- **La fusion.** Elle demanderait un horodatage par item, donc un champ, donc une
  migration. On prévient et on propose de recharger ; recharger perd le geste en
  cours, et le `confirm()` le dit.

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

---

## Ticket #60 — le garde-fou criait au conflit sur un appareil seul — **LIVRÉ `v3.26`**

**Le rapport au pouce, 07/09/2026.** « J'ai par trois fois ouvert mon app Sable et
ajouté un item via Threads ou Instagram en faisant Partager > Sable. Et j'ai eu le
message d'avertissement d'une autre session ouverte, donc j'ai dû faire OK, et
perdre l'ajout d'item que j'étais en train de faire. […] je n'avais ouvert Sable
que sur mon mobile, il n'y avait pas d'autres sessions actives. »

Il n'y en avait pas. Le garde-fou du #53 se déclenchait **contre l'appareil qui
venait d'écrire**.

**La cause : les deux jetons comparés ne viennent pas de la même plume.**
`_autreAppareilEstPasse` faisait `r.updated_at !== _kvToken`, un `!==` entre deux
**chaînes** :

| Origine du jeton | Écriture |
|---|---|
| Une **lecture** — PostgREST sérialise la colonne `timestamptz` | `2026-09-07T09:12:33.412+00:00` |
| Une **écriture** — `storage.set` fabrique la valeur avec `toISOString()` | `2026-09-07T09:12:33.412Z` |

Le **même instant**, écrit autrement. Le test est donc vrai à tous les coups dès
qu'une écriture a réussi dans la session : le deuxième enregistrement qui sort de
la fenêtre de grâce se déclare en conflit **avec lui-même**. C'est l'exact
contraire de l'exigence 4 du #53, « le cas normal doit rester silencieux ».

**Pourquoi le partage, et pas autre chose.** Il faut trois choses dans cet ordre :
une écriture réussie, une pause de plus de vingt secondes, une écriture. Le
partage les enchaîne tout seul — `addItem` écrit l'item par capture optimiste
(v2.88), `afterShare` ouvre la fiche, on la remplit (les vingt secondes passent
là), on enregistre. Un usage ordinaire le déclenche aussi, plus irrégulièrement.

**Pourquoi rien ne l'avait vu.** Deux angles morts, et c'est la vraie leçon :

1. **Les bancs ne pouvaient pas.** Le shim de `.claude/dev-harness.js` comme celui
   du banc rendent la chaîne qu'on leur a donnée, **à l'octet** — pas de Postgres
   au milieu, donc jamais de resérialisation. Les 39 assertions étaient vertes sur
   un monde où le défaut n'existe pas.
2. **Le contrôle au pouce non plus** — voir la rectification du #53 plus haut : cinq
   enregistrements d'affilée tiennent tous dans la fenêtre de grâce.

**Ce qui change (`app.js` seul).** On ne compare plus des textes mais **l'instant
qu'ils désignent** : `_jetonMs()` passe les deux côtés par `Date.parse`. Aucune
tolérance ajoutée — deux écritures réelles sont séparées par un aller-retour
réseau, donc par des millisecondes différentes ; la limite « même milliseconde =
conflit invisible » du #53 reste ce qu'elle était. Un horodatage illisible fait
**échouer ouvert**, comme la relecture ratée (décision (c) du #53), et c'est
étendu au jeton local.

**D'où viennent les données.** Aucun champ, aucune migration, rien côté base.

**Comment on l'enlève.** Retirer `_jetonMs` et remettre le `!==` sur les chaînes —
ce qui remet le défaut, donc on ne le fait pas.

**Ce que ça casse.** Rien : normaliser ne peut que rapprocher deux écritures du
même instant. Le sens inverse est joué au banc — un instant **différent** reste un
conflit et n'écrit rien.

**Vérifié, dans les deux sens.** `.claude/bench-36-etape3.js` passe de 39 à **47
assertions**, sur du code toujours découpé dans `app.js`. Le cas 13 rejoue la
production : jeton local en `…412Z`, ligne distante relue en `…412+00:00`, hors
fenêtre de grâce — l'écriture doit partir, sans modal. **Sur le `app.js` de la
v3.25 ce cas échoue** (6 assertions rouges, dont « aucun modal sur un appareil
SEUL ») ; sur celui-ci, 47 vertes. Plus `node --check` sur `app.js` et `sw.js`.

**Et vérifié dans un navigateur — une première dans ce chantier.** Le proto local
ne peut pas monter le défaut, mais il peut monter sa **cause** : `window.storage.get`
a été enrobé dans la page pour resérialiser `updated_at` de `…Z` vers `…+00:00`,
c'est-à-dire pour imiter ce que fait PostgREST. Trois mesures, sur 96 items :

| Mesure | Résultat |
|---|---|
| Après une écriture, ce que la couche rend | jeton mémorisé `2026-09-07T06:53:57.504Z`, ligne relue `2026-09-07T06:53:57.504+00:00` — **le défaut est bien celui-là**, pas une conjecture |
| Seconde écriture après **22 s d'attente réelle** (hors grâce) | elle part, `confirm` appelé **0 fois** — le symptôme du rapport au pouce est éteint |
| Ligne distante horodatée 60 s plus tard (conflit réel) | écriture **refusée**, `confirm` appelé **1 fois** avec le bon texte, `SAVE_FAIL_MSG` = « un autre appareil a modifié la pile » |

**Non vérifié.** Le vrai conflit à deux appareils connectés n'a pas été revu depuis
ce correctif — la troisième mesure l'imite fidèlement mais ne le remplace pas. À
juger au pouce, avec le bon protocole cette fois :

1. Sur le téléphone **seul** : enregistrer un item, **attendre plus de vingt
   secondes**, enregistrer un autre item → rien ne doit s'afficher. *C'est le
   contrôle qui échouait avant.*
2. Refaire un partage depuis Threads ou Instagram, remplir la fiche sans se
   presser, enregistrer → rien ne doit s'afficher.
3. Non-régression, à deux appareils : modifier un item sur le PC, attendre plus de
   vingt secondes, modifier un item sur le téléphone → le modal **doit**
   réapparaître.

**Ce que ça ne règle pas** : l'autre moitié du rapport au pouce, en **#61**.

---

## Ticket #61 — un conflit ne doit pas obliger à choisir entre perdre et rester bloqué

**Le rapport au pouce, même message que le #60.** « C'est ennuyeux, d'une part car
le message s'affiche que si on fait ajouter, donc après avoir rempli la fiche.
Aucun moyen de la garder. »

C'est exact, et ça reste vrai **même quand le conflit est réel** — le #60 supprime
les fausses alertes, pas ce défaut-là.

**Le trou.** Les deux issues du `confirm()` perdent le travail :

| Issue | Ce qui se passe |
|---|---|
| **OK — recharger** | La saisie en cours est jetée. Le message le dit, ce qui est honnête, mais ne la sauve pas. |
| **Annuler** | L'écran reste tel quel — la fiche est bien encore là (v2.66 : la feuille ne se ferme pas sur un échec). Mais **le refus ne s'épuise pas** : plus aucune écriture ne partira avant un rechargement. Donc le travail est perdu plus tard au lieu de tout de suite. |

**Le cas le plus fréquent est aussi le plus facile.** Un partage ajoute un item
**neuf**. L'insérer dans une pile relue n'est pas un conflit, c'est un **ajout** :
aucune décision à prendre, aucun horodatage par item, aucune migration. La fusion
générale (deux appareils qui modifient le **même** item) reste le chantier lourd
que le #53 a rangé de côté — ce ticket-ci ne la fait pas.

**Périmètre.** `app.js` seul.

**Ce qui change — la forme proposée, à trancher.** Au lieu de « recharger ou
rien » : relire la pile distante, **y rejouer les items dont l'`id` en est absent**
(donc les créations locales non encore parties), puis écrire. Les modifications
d'items **existants**, elles, restent perdues et le message doit le dire — mieux
vaut une promesse tenue à moitié et annoncée qu'une promesse entière et fausse.

**D'où viennent les données.** `item.id` existe depuis toujours et suffit à dire
« neuf » de « modifié ». Aucun champ nouveau.

**Comment on l'enlève.** La branche de réconciliation est un bloc dans
`_writeItems` ; le retirer redonne le `confirm()` à deux issues.

**Ce que ça casse — à instruire avant d'écrire une ligne.**

1. **La garde d'effondrement du #33** lit `_lastN`, qui parle de la pile en
   mémoire. Réinjecter une pile relue change ce compte : il faut décider ce que
   `_lastN` vaut après une réconciliation, sinon on rouvre le trou que le #33 a
   fermé.
2. **`_conflitVu` et le refus permanent** perdent leur sens si l'on sait
   réconcilier. À reprendre en entier, pas à retoucher.
3. **L'ordre de la pile.** Les items neufs sont en tête (`items.unshift`). Les
   rejouer sur une pile relue doit conserver cet ordre, sinon la capture la plus
   récente n'est plus la première.
4. **Le moment.** Réconcilier au moment de l'enregistrement, c'est faire attendre
   le doigt derrière deux allers-retours. À mesurer avant de trancher.
