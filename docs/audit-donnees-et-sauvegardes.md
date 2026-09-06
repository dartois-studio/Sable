# Audit — par où la pile peut disparaître, et ce qui la retient

Ouvert le 06/09/2026, après la destruction de la pile du compte principal
(le récit établi par la base est dans `docs/suivi-mobile.md`, entrée
« LA PILE A ÉTÉ DÉTRUITE »).

Demande : « un audit complet et des solutions infaillibles pour ne plus jamais
que ça se reproduise. Avoir des backup locale c'est bien mais un backup en ligne
serai pas mal aussi. Avec des enregistrements automatiques ».

**Le mot « infaillible » n'apparaîtra pas dans les conclusions.** Ce document
énumère les chemins de perte un par un, dit ce qui couvre chacun après la v3.23,
et nomme les trois qui restent découverts. Un dispositif dont on connaît les
trous est plus sûr qu'un dispositif qu'on croit infaillible : c'est exactement la
leçon du 06/09, où un miroir local livré et affiché n'avait jamais rien écrit
(ticket #32).

---

## 1. Où vivent les données, en une carte

| Donnée | Où | Sauvée par | Fragilité propre |
|---|---|---|---|
| **items** (toute la pile : titres, notes, URL, catégories, tags, statuts, dates) | UNE ligne `kv` : `brain:v1:items`, un seul blob JSON | miroir local (v3.21), instantanés en ligne (v3.23), export fichier | **un `upsert` de trop et tout part en même temps** |
| **médias** (photos, sons, vidéos) | une ligne `kv` par fichier : `brain:v1:media:<id>` | export fichier **seul** | aucune : une ligne par fichier, jamais réécrite en masse |
| **réglages, catégories, icônes, épingles** | `localStorage` de l'appareil : `brain:v1:settings` | rien | un vidage des données de site les emporte |
| **batch** (le tirage en cours) | `kv` : `brain:v1:batch` | rien | reconstructible, sans valeur |
| **instantanés** (v3.23) | `kv` : `brain:v1:snap:AAAA-MM-JJ`, 14 lignes max | — | même compte, même projet que la pile |

**Le fait structurant de tout ce document est dans la première ligne du
tableau** : la pile entière est un blob unique, réécrit en entier à chaque geste.
Les médias, eux, ont une ligne par fichier — c'est précisément pour ça qu'ils ont
survécu au 06/09 sans qu'on ait rien fait pour eux. Un blob unique concentre tout
le risque en un seul point d'écriture ; c'est aussi ce qui rend une sauvegarde
triviale à écrire. Les deux propriétés sont la même propriété.

---

## 2. Les huit chemins de perte

Numérotés par gravité constatée, pas par probabilité.

### C1 — Une lecture qui échoue, prise pour une pile vide, puis écrite

**C'est le chemin réellement emprunté le 06/09.** `loadState()` avalait l'erreur,
posait `items=[]`, l'amorçage de `startApp()` écrivait cinq items de démonstration
par-dessus 16 000 caractères, et l'`upsert` ne garde pas de version antérieure.

**Couvert depuis la v3.20 (ticket #28)**, à la racine : `stateReady` ne passe à
vrai qu'après une lecture confirmée, `_writeItems` refuse toute écriture tant
qu'il est faux, `startApp` s'arrête sur `showLoadFailure()` — l'amorçage n'est
plus **atteignable**. Un JSON illisible compte comme un échec et non comme un
vide.

**Reste** : rien. C'est le seul chemin de cette liste qui soit fermé *par
construction* et non seulement amorti.

### C2 — Toute AUTRE cause qui viderait `items` en mémoire

La v3.20 a fermé C1 et **seulement** C1. Un `filter` trop large dans un ticket
futur, une itération qui déborde, un import bancal : la lecture a réussi,
`stateReady` est vrai, et le vide part en base sans que rien s'y oppose.

**Couvert depuis la v3.23 (ticket #33)** par la garde d'effondrement :
`_writeItems` refuse le passage d'au moins cinq items à zéro en une seule
écriture. Volontairement grossier — le seul motif dont on puisse affirmer
qu'aucun geste ordinaire ne le produit. `purgeRow` et `emptyTrash`, les deux
seuls chemins qui ont le droit de tout emporter et qui sont tous deux derrière un
`confirm()`, lèvent un drapeau consommé par l'écriture.

**Reste** : une perte **partielle** (30 items → 3) passe la garde. Elle est
couverte par les instantanés, pas par un refus.

### C3 — Une écriture concurrente entre deux appareils

Deux appareils ouverts, chacun avec son état en mémoire ; le second qui écrit
écrase les gestes du premier. `kv` n'a ni version ni horodatage comparé : le
dernier `upsert` gagne, en silence.

**Non couvert.** Amorti seulement : l'instantané du jour contient l'état d'avant
la session, donc une journée écrasée est récupérable — pas les gestes du jour.

**Piste, non écrite** : un compteur de génération dans le blob, relu avant
d'écrire ; un écart déclenche un rechargement au lieu d'un écrasement. C'est le
chantier propre, et il n'est pas trivial (il change le format de la ligne).

### C4 — Un second compte créé par une faute de frappe

La connexion est sans mot de passe et fabrique **un compte par adresse**. Une
adresse saisie autrement ouvre une pile vide à côté de la vraie. **Rien n'est
détruit**, mais la présentation est celle d'une perte totale — c'est l'hypothèse
qui a coûté deux échanges le 06/09.

**Amorti depuis la v3.20** : les Réglages et l'écran de panne affichent l'adresse
connectée (réellement, depuis la correction de `window.USER` en v3.22 — pendant
une version, cette ligne était vide sans le dire).

**Reste** : rien n'empêche la faute de frappe. Une confirmation de l'adresse
avant l'envoi du lien serait le garde-fou ; non écrite.

### C5 — Perte du compte, ou incident du projet Supabase

Adresse e-mail perdue, projet suspendu, base corrompue, plan gratuit mis en
pause. **Les instantanés de la v3.23 ne couvrent PAS ce chemin** : ils vivent sous
le même `user_id`, dans le même projet, derrière la même RLS que la pile qu'ils
protègent. Une sauvegarde qui tombe avec ce qu'elle sauvegarde n'est pas une
sauvegarde d'infrastructure.

**Couvert seulement par l'export fichier**, qui est la seule copie sortant de
l'infrastructure — et qui est manuelle par nature (voir § 4).

**Hors code, à trancher** : le plan gratuit Supabase n'offre ni PITR ni
sauvegarde quotidienne. Un plan payant les donne. C'est une décision de budget,
pas de développement.

### C6 — Un vidage des données de site

Emporte `brain:v1:settings` (catégories, icônes, épingles, réglages) **et** le
miroir local. Les items en base ne bougent pas.

**Non couvert, et sous-estimé** : les catégories et les icônes ne sont dans
**aucune** sauvegarde automatique. L'export fichier ne les emporte pas non plus —
il contient `items` et `media`, pas `settings`.

**Piste, non écrite** : ajouter `settings` à l'export, et une ligne `kv`
`brain:v1:settings` en miroir du localStorage. Le coût est faible, le gain réel.

### C7 — La corbeille vidée par mégarde

`emptyTrash` est derrière un `confirm()` qui annonce le compte, et supprime
définitivement, médias compris (ticket #29).

**Amorti par les instantanés** : la pile d'avant la session du jour les contient
encore — mais **pas les médias**, dont les lignes sont réellement supprimées.

### C8 — Un média perdu sans son item, ou l'inverse

Deux lignes `brain:v1:media:` à `null` traînaient en base avant le ticket #29.
Et cinq lignes de média ont survécu au 06/09 **sans item pour les porter** : les
photos existent, rien ne les affiche.

**Non couvert.** C'est le ticket **#30** (« Récupérer les médias orphelins »),
toujours ouvert : lister les clés `media:*` sans item correspondant et recréer un
item par média. Il rendrait cinq photos.

---

## 3. Ce que chaque copie sait faire, côte à côte

| | Miroir local (v3.21) | Instantanés en ligne (v3.23) | Export fichier |
|---|---|---|---|
| **Automatique** | oui, à chaque lecture et écriture confirmée | **oui, une par jour d'usage** | non — impossible, voir § 4 |
| **Suit le compte d'un appareil à l'autre** | non | **oui** | non |
| **Historique** | non, une seule copie écrasée | **14 jours** | autant qu'on en fait |
| **Survit à un vidage des données de site** | non | **oui** | oui |
| **Survit à la perte du compte / du projet** | non | **non** | **oui** |
| **Contient les médias** | non | non | **oui** |
| **Contient les catégories et réglages** | non | non | non |
| **Se réinjecte tout seul** | jamais | jamais | jamais |

Les trois colonnes se lisent ensemble, et aucune ne rend les autres inutiles :
l'instantané couvre le sinistre probable (une bêtise de l'app), l'export couvre
le sinistre grave (la perte du compte), le miroir couvre le cas dégradé (la base
ne répond pas, on est devant son téléphone).

**La ligne la plus importante du tableau est la dernière.** Aucune copie ne se
réinjecte d'elle-même, et c'est une décision, pas un manque : une panne de lecture
est le plus souvent passagère, et une copie qui se recopierait à ce moment-là
écraserait une pile distante saine avec un état plus ancien — le sinistre du
06/09, à l'identique, dans l'autre sens.

---

## 4. Pourquoi l'« enregistrement automatique » demandé s'arrête aux copies en ligne

La demande dit « avec des enregistrements automatiques ». Deux des trois copies
le sont désormais, et la troisième ne peut pas l'être : **un navigateur n'écrit
pas sur le disque tout seul.** Il n'existe pas de chemin, dans une page web
servie par GitHub Pages, pour déposer un fichier périodiquement dans un dossier
sans un geste de l'utilisateur — et prétendre le contraire serait la promesse
creuse de cette livraison.

Ce qui est livré à la place : l'export fichier **s'horodate**, et la ligne des
Réglages porte son âge (« il y a 4 mois » plutôt qu'une date, au-delà de 60
jours, parce qu'une date n'alerte personne). C'est la seule chose utile qu'on
puisse faire pour une copie qu'on ne peut pas automatiser — la rendre
visiblement vieille.

Les deux voies qui *pourraient* automatiser cette copie sont hors du dépôt et
hors de cette livraison :

- **Un export périodique côté serveur** (une fonction planifiée qui lit `kv` et
  dépose un fichier ailleurs). C'est la vraie réponse à C5, et elle demande un
  secret de service — donc une décision d'infrastructure, pas un ticket d'UI.
- **Le plan Supabase payant**, dont le PITR couvre C5 sans une ligne de code.

Les deux sont à trancher hors code, et l'audit s'arrête là où le dépôt s'arrête.

---

## 5. Après la v3.23 : les trois trous, nommés

1. **C5, la perte du compte ou du projet.** Les instantanés vivent au même
   endroit que la pile. Seul l'export fichier en sort, et il est manuel. **Le
   geste qui vaut le plus, aujourd'hui, est un export fichier de temps en
   temps** — c'est aussi le seul qui emporte les médias.
2. **C6, les catégories et les réglages**, dans aucune sauvegarde, ni automatique
   ni manuelle. Le correctif est petit et n'est pas écrit.
3. **C3, l'écriture concurrente entre deux appareils.** Le dernier qui écrit
   gagne, en silence. Amorti par l'instantané du jour, pas empêché.

Et une dette de méthode, qui traverse les quatre dernières versions : **rien de
tout ce dispositif n'a jamais été observé dans un navigateur connecté.** Le
ticket #32 a établi qu'un filet livré, affiché et jamais vérifié peut n'avoir
jamais rien écrit pendant une version entière. La liste de contrôle de la v3.23
est dans son entrée de journal ; le contrôle qui compte tient en une phrase :
**ouvrir la copie du jour, l'enregistrer en fichier, et regarder le fichier.**
