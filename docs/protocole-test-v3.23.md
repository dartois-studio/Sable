# Protocole de test — v3.23, sur téléphone connecté

Écrit le 06/09/2026. À dérouler **dans l'ordre**, sur ton téléphone, connecté à
ton compte. Compter **20 à 30 minutes**. Ne pas le faire à la va-vite : c'est la
première fois que quatre versions livrées d'affilée (v3.20 → v3.23) sont
regardées dans un navigateur.

**Pourquoi ça compte.** Le ticket #49 a prouvé qu'un filet de sécurité livré,
affiché à l'écran et jamais vérifié peut n'avoir **jamais rien écrit** pendant
une version entière — en affichant « aucune » comme si tout allait bien. Ce
protocole existe pour que ça ne recommence pas.

**Ce qui a déjà été vérifié le 06/09 sur PC, et que tu n'as pas à refaire :** la
copie du jour contient bien la pile (87 items réels, fichier ouvert et lu), la
garde d'effondrement refuse une pile qui s'écroule, et l'écran de panne s'affiche
avec l'écriture bloquée. Tout ça **sans Supabase**. Ce protocole couvre
exactement ce que le banc local ne pouvait pas voir : **le vrai compte, le vrai
réseau, le vrai téléphone.**

---

## ⚠ Avant de commencer — trois choses à savoir

**1. Tes compteurs vont être petits, et c'est normal.** Depuis le sinistre du
06/09, ta pile en ligne est très probablement les **5 items de démonstration**.
Donc « Sauvegardes en ligne » annoncera une copie de ~5 items, et « Copie
locale » ~5 items. **Ce n'est pas une panne** — c'est fidèlement ta pile
actuelle. Ce qu'on teste ici, c'est que la mécanique écrit ; pas ce qu'elle
contient.

**2. Ne touche à AUCUN bouton « Restaurer » avant l'étape 5.** Restaurer
**remplace** la pile — c'est son travail. Importer, en revanche, ne fait
qu'ajouter (voir la fin du document).

**3. Ne vide surtout pas les données du site.** Tes catégories, tes icônes et
tes épingles ne sont **nulle part ailleurs** que dans la mémoire de ce
téléphone (c'est le trou C6, ticket #51). Les vider serait une seconde perte, et
celle-là définitive.

**De quoi tu as besoin :** ton téléphone, ta connexion, et de quoi noter. Le plus
simple est de **photographier chaque écran** au fur et à mesure — une capture
vaut mieux qu'un souvenir.

---

## ÉTAPE 0 — s'assurer que la nouvelle version est vraiment servie

Sable est une app installée : elle peut te servir une **vieille coquille** gardée
en cache, même si le serveur a la neuve. C'est exactement l'incident de la v3.10,
où un fichier neuf tournait avec un fichier vieux et rendait un écran vide sans
la moindre erreur.

1. Ferme Sable **complètement** — pas juste revenir à l'accueil : ouvre la liste
   des applications ouvertes et **balaie Sable pour la fermer**.
2. Rouvre-la.
3. Referme-la complètement, et rouvre-la **une seconde fois**.

> **Pourquoi deux fois :** le service worker installe la nouvelle version au
> premier lancement, mais elle ne prend la main qu'au suivant.

---

## ÉTAPE 1 — le numéro de version  *(contrôle n° 1)*

**Où :** ouvre les **Réglages**, puis fais défiler **tout en bas**.

**Ce que tu dois voir :**

```
Sable v3.23 · sable@dartois.studio
Fait par Dartois Studio · réglages mémorisés sur cet appareil
```

| Ce que tu lis | Ce que ça veut dire | Ce que tu fais |
|---|---|---|
| **v3.23** | ✅ La bonne version est servie. | Continue à l'étape 2. |
| v3.19 ou moins | La vieille coquille est encore servie. | Désinstalle le raccourci Sable de ton écran d'accueil, rouvre `dartois.studio/Sable/` dans ton navigateur, puis réinstalle le raccourci. Reprends l'étape 0. |

> ⛔ **Si tu ne lis pas v3.23, ARRÊTE-TOI ICI.** Tout ce qui suit ne voudrait
> rien dire : tu testerais une autre version que celle qu'on croit tester.
> C'est le contrôle qui conditionne tous les autres.

---

## ÉTAPE 2 — la ligne « Compte »  *(contrôle n° 5)*

**Où :** au même endroit, **juste au-dessus du bouton rouge « Se déconnecter »**.
Attention : elle n'est **pas** dans la section « Données ».

**Ce que tu dois voir :** une ligne **Compte** portant ton adresse e-mail.

| Ce que tu vois | Ce que ça veut dire | Ce que tu fais |
|---|---|---|
| **Compte** + ton adresse habituelle | ✅ L'app sait qui tu es. Le correctif du #49 fonctionne. | Continue. |
| **Compte** + une **autre** adresse | Tu es sur un second compte créé par une faute de frappe. **Ta pile n'est pas perdue**, elle est sur l'autre adresse. | « Se déconnecter », puis reconnecte-toi avec la **bonne** adresse. Reprends à l'étape 1. |
| **la ligne n'existe pas du tout** | 🚨 **C'est la signature exacte du #49.** L'app ne sait pas qui est connecté ; le miroir local et l'écran de panne sont muets eux aussi. | ⛔ **ARRÊTE TOUT et dis-le-moi.** Ne livre rien par-dessus. |

> **Pourquoi cette ligne est le meilleur détecteur du dépôt :** elle ne
> s'affiche que si l'app arrive à lire le compte connecté. Sa seule présence
> prouve d'un coup que les trois fonctions cassées par le #49 sont réparées.

---

## ÉTAPE 3 — la copie locale  *(contrôle n° 4)*

**Où :** Réglages → section **Données** → ligne **« Copie locale »**.

**Ce que tu dois voir :** un nombre d'items et une date, par exemple
`5 items · 06/09/2026`.

| Ce que tu lis | Ce que ça veut dire | Ce que tu fais |
|---|---|---|
| `N items · une date` | ✅ Le miroir local écrit vraiment. **C'est la toute première fois que cette ligne est vérifiée.** | Continue. |
| **« aucune »** | 🚨 Le miroir n'écrit pas. Si l'étape 2 est passée, ce n'est pas le #49 mais autre chose. | ⛔ **Arrête-toi et dis-le-moi.** |

> **À savoir :** le miroir se remplit à la **première lecture réussie après le
> déploiement**, appareil par appareil. Sur ce téléphone, ça a dû se produire à
> l'étape 0. Il ne contient **pas** les médias, et ne survit pas à un vidage des
> données du site.

---

## ÉTAPE 4 — les sauvegardes en ligne  *(contrôle n° 2)*

**Où :** Réglages → **Données** → ligne **« Sauvegardes en ligne »**.

**Ce que tu dois voir :** `1 copie · ` suivi de **la date d'aujourd'hui**.

| Ce que tu lis | Ce que ça veut dire | Ce que tu fais |
|---|---|---|
| `1 copie · <aujourd'hui>` | ✅ L'instantané du jour a été écrit **sur ton compte**. | Continue à l'étape 5. |
| `N copies · <aujourd'hui>` | ✅ Encore mieux : tu as déjà plusieurs jours d'historique. | Continue. |
| **« aucune »** | 🚨 **C'est le scénario du #49 qui recommence** : la ligne s'affiche, et rien n'a été écrit. | ⛔ **ARRÊTE-TOI. Ne livre rien par-dessus. Dis-le-moi.** |
| `…` (trois points) | La liste est encore en train de charger. | Attends 2–3 s et regarde à nouveau. |

> **Rappel de l'étape 0 :** la copie du jour est prise **au premier chargement
> de la journée**, donc **avant** tout ce que tu fais ensuite. C'est voulu : une
> copie prise après une bêtise serait une copie de la bêtise.

---

## ÉTAPE 5 — 🎯 LE CONTRÔLE QUI COMPTE  *(contrôle n° 3)*

C'est **le seul** qui prouve que la copie contient ta pile et pas un objet vide.
Les quatre précédents ne prouvent que des affichages.

1. **Touche la ligne « Sauvegardes en ligne »** → une feuille s'ouvre, intitulée
   « Sauvegardes en ligne », avec un paragraphe d'explication puis une liste de
   jours.
2. **Touche la ligne du jour** (marquée « la plus récente »).
3. Tu arrives sur **« Copie du AAAA-MM-JJ »**. Elle affiche :
   - un grand nombre : **le nombre d'items dans la copie** ;
   - en dessous, une phrase : *« Ta pile en compte N aujourd'hui. »*

   👉 **Les deux nombres doivent être cohérents.** S'ils diffèrent beaucoup sans
   raison, note-le.

4. **Touche « Enregistrer en fichier »**.
5. 🔴 **OUVRE LE FICHIER.** C'est l'étape que personne ne fait, et c'est la seule
   qui compte.
   - Il s'appelle `sable-copie-AAAA-MM-JJ.json`, dans tes **Téléchargements**.
   - Ouvre l'appli **Fichiers**, touche-le. S'il refuse de s'ouvrir, envoie-le
     toi-même par mail et ouvre-le depuis l'ordinateur.
   - **À défaut, regarde au moins sa TAILLE.** Un fichier de quelques centaines
     d'octets est un fichier vide. Un fichier qui contient vraiment des items
     pèse plusieurs dizaines ou centaines de Ko.

**Ce que tu dois voir en l'ouvrant :** du texte en vrac, mais où tu **reconnais
des titres de tes items**. C'est tout ce qu'on demande.

| Ce que tu constates | Verdict |
|---|---|
| Le fichier existe et tu y reconnais tes items | ✅ **Le dispositif est prouvé de bout en bout.** |
| Le fichier existe mais est minuscule / vide | 🚨 La copie est creuse. **Dis-le-moi.** |
| Aucun fichier n'apparaît | Le téléchargement a été bloqué. Réessaie ; si ça persiste, note-le. |

> ⛔ **NE TOUCHE PAS à « Restaurer cette copie » sur cet écran.** Elle
> remplacerait ta pile actuelle par cette copie. On n'y touchera qu'après, et
> volontairement.

---

## ÉTAPE 6 — l'écran de panne, jamais vu sur un téléphone

Cet écran (« PILE NON LUE ») est **ce qui aurait empêché le sinistre du 06/09**.
Il n'a jamais été vu ailleurs que sur le banc local, ce matin.

**C'est sans danger** : dans cet état, l'app **refuse d'écrire quoi que ce soit**.
C'est précisément ce qu'on vérifie.

1. Active le **mode Avion**.
2. Ferme Sable **complètement** (balaie-la de la liste des apps).
3. Rouvre Sable.

**Deux résultats possibles, et les deux sont des informations utiles :**

| Ce que tu vois | Ce que ça veut dire |
|---|---|
| Un cadre **« PILE NON LUE »**, le texte *« Tes items ne sont pas perdus »*, et trois boutons : **Réessayer**, **Chercher une copie en ligne**, **Changer de compte** | ✅ Le garde-fou est en place sur téléphone. **Photographie l'écran.** |
| Rien : un écran blanc, ou l'app qui reste figée au démarrage | C'est le **ticket #22**, déjà connu et ouvert : hors ligne, l'app se bloque sur le CDN Supabase avant même de démarrer. **Ce n'est pas un nouveau bug** — mais c'est utile de le confirmer sur téléphone. Note-le. |

4. **Coupe le mode Avion.** Referme Sable complètement, rouvre-la.
5. Vérifie que ta pile est revenue normalement.

---

## ÉTAPE 7 — les trois versions médias jamais confirmées

Les v3.17, v3.18 et v3.19 sont en ligne et **n'ont jamais été jugées à l'œil**.

⚠ Ta pile actuelle n'a probablement plus d'item avec photo. **Fabrique-en un** :

1. Dans Sable, ajoute une **photo** depuis ta galerie.
2. Ouvre sa fiche, donne-lui un **titre** (par exemple `Test v3.23`), enregistre.

Puis vérifie les trois points :

| # | Version | Ce que tu dois voir |
|---|---|---|
| **7a** | v3.19 | Reviens à la **liste**. La ligne doit afficher **`Test v3.23`**, et surtout **pas** un nom de fichier du genre `17854054….jpg`. |
| **7b** | v3.18 | Rouvre la fiche. **L'image doit s'afficher**, et il ne doit y avoir **aucun pavé gris avec le nom du fichier** en dessous. |
| **7c** | v3.18 (l'autre moitié) | Ajoute une **seconde photo** et **ne lui donne pas de titre**. Dans sa fiche, une **petite ligne grise** portant le nom du fichier doit apparaître sous l'image — discrète, pas une carte. |
| **7d** | v3.17 | Ajoute une **vidéo** ou un **son**. Dans sa fiche, un **lecteur** doit apparaître. Lance la lecture, puis **ferme la fiche** : 👉 **le son doit s'arrêter net.** C'est le seul point de cette version qui ne se lit pas dans le code. |

Tu peux jeter ces items de test ensuite.

---

## Fiche de relevé

Recopie ceci et remplis-la — c'est ce dont j'ai besoin pour la suite.

```
ÉTAPE 1  version affichée ......... v_____        ✅ / ❌
ÉTAPE 2  ligne « Compte » ......... présente ? OUI / NON
         adresse affichée .........
ÉTAPE 3  « Copie locale » ......... _____________
ÉTAPE 4  « Sauvegardes en ligne » . _____________
ÉTAPE 5  nombre dans la copie ..... ____
         nombre dans la pile ...... ____
         fichier ouvert ? ......... OUI / NON
         on y reconnaît des items ? OUI / NON
ÉTAPE 6  écran « PILE NON LUE » ... VU / RIEN (ticket #22)
ÉTAPE 7a titre dans la liste ...... OK / KO
ÉTAPE 7b image dans la fiche ...... OK / KO
ÉTAPE 7c ligne grise sans titre ... OK / KO
ÉTAPE 7d lecteur + arrêt à la fermeture ... OK / KO
```

---

## Après les tests — et seulement après : l'export du 13/08

Ne fais ceci **que si l'étape 5 est passée**.

Il existe sur le PC un **vrai export de ta pile du 13/08/2026** : 87 items et
trois photos, mis à l'abri dans `C:\Users\Guillaume\Sauvegardes-Sable\`
(ticket #56).

**La bonne porte est « Importer un export », pas « Restaurer ».** La différence
est décisive :

| | Ce que ça fait |
|---|---|
| **Importer un export** | **AJOUTE.** Il saute les items déjà présents et **remet aussi les médias**. Il ne peut rien détruire. |
| **Restaurer cette copie** | **REMPLACE** toute la pile. Utile pour revenir à une date, dangereux ici. |

Donc : importer l'export du 13/08 **ajouterait tes 87 items à côté des 5 de
démonstration**, sans rien écraser, et rendrait les trois photos. C'est
réversible à la main (les items en trop se jettent un par un).

**Le plus simple est de le faire depuis l'ordinateur** : ouvre
`dartois.studio/Sable/` dans le navigateur du PC, connecte-toi avec ton adresse,
puis Réglages → Données → **Importer un export** → choisis
`sable-export-2026-08-13.json`.

Ce qui **ne** reviendra **pas** : les items créés entre le 13/08 et le 06/09
(~3 semaines et demie), et l'habillage des catégories — icônes, images, ordre —
qui n'est dans aucune sauvegarde (ticket #51). Les **noms** de catégorie, eux,
reviennent avec chaque item : ton rangement est préservé.

Les deux photos du 03/09, postérieures à cet export, ne sont récupérables que
par le **ticket #52**, qui n'est pas encore écrit.
