/* Numéro affiché à côté de « Sable ». Incrémente-le à chaque déploiement,
   et note en une ligne ce qui change — c'est ton mini-changelog + un repère
   pour vérifier qu'une nouvelle version est bien servie (pas le vieux cache).
   v1.0 — base : capture, résurgence, pile/collections, thèmes, partage entrant
   v1.1 — aperçus de liens (Open Graph) + notes + fiche d'édition d'un grain
   v1.2 — la fiche s'ouvre automatiquement après un partage (si 1 seul grain)
   v1.3 — numéro de version affiché dans le titre
   v1.4 — aperçus via Microlink (allorigins lâchait) + image passée par un cache (wsrv.nl)
   v1.5 — images non recadrées + zoom plein écran + vue « Étendu » + Reddit/X via Exabase (option clé)
   v1.6 — correctif largeur : la barre de progression débordait quand le lot grossissait
   v1.7 — aperçu « maison » possible via une Edge Function Supabase (comme WhatsApp, sans service tiers)
   v1.8 — branché sur la fonction Supabase déployée (clever-action)
   v1.9 — retour de confirmation à l'enregistrement (vibration + pulsation)
   v2.0 — 3 onglets (Surface/Pile/Catégories), grandes cartes par défaut, choix de l'image de couverture
   v2.1 — titres décodés (fini le charabia d'entités) + suppression de vignettes d'aperçu
   v2.2 — couverture multi-sources : images aspirées, galerie, coller, lien, ou icône (banque Iconify)
   v2.3 — icônes : teinte au choix (6 couleurs clair/sombre), tray suggéré + récents, rendu corrigé en vue liste ; densité de liste réglable (Confortable/Compacte/Dense)
   v2.4 — vraie correction du rendu icône en liste (padding fixe) ; densités revues (Compacte serrée, Dense = une ligne) ; vue de la pile mémorisable dans les Réglages ; wordmark épuré (sans point) + légère animation périodique
   v2.5 — animation du titre corrigée (le texte reste visible au repos) + choix de l'animation dans les Réglages (Reflet / Respiration / Trait / Aucune)
   v2.6 — refonte structure (passe 1) : navigation en bas, en-tête épuré (thème rangé dans Réglages), capture sur une ligne avec bouton +, contrôles de la pile regroupés en Filtrer / Affichage
   v2.7 — refonte (passe 2a) : tap sur le titre = animation ; Corbeille (voir / restaurer / vider / supprimer) ; recherche dans la Pile
   v2.8 — refonte (passe 2b) : gestion des catégories (renommer / fusionner / épingler / supprimer / icône) ; correction de la taille des icônes dans la recherche
   v2.9 — découpage en 3 fichiers (index.html + styles.css + app.js) pour des mises à jour plus légères ; aucun changement de comportement
   v2.10 — catégories : création (« Nouvelle catégorie »), édition clarifiée (badge + astuce) ; filtres par source auto (Instagram, Telegram, blog, site web…)
   v2.11 — desktop (rail latéral + pile multi-colonnes) ; favicon « S » ; icônes de l'app externalisées dans un sprite SVG (icons.svg) au lieu d'être écrites en dur
   v2.12 — fiche du grain refondue : tags (plusieurs, libres) et remontée programmée (surfaceAfter) ; panneau plus haut avec en-tête et pied fixes ; catégories sur une ligne qui défile + recherche/création unifiées ; couverture et lien repliés ; enregistrement conservé à la fermeture
   v2.13 — recherche unifiée : un seul champ propose catégories + tags + grains, groupés et navigables (tap catégorie → sa pile ; tap tag → pile filtrée par ce tag, via un axe de filtrage dédié affiché en tête et effaçable d'un geste) ; barre figée en haut ; clavier retiré au défilement (seuil 10 px)
   v2.14 — correctif : cliquer une suggestion de tag ajoute le tag proposé en entier (avant, le blur du champ ajoutait les lettres déjà tapées avant que le clic n'aboutisse)
   v2.15 — sélection & actions par lot dans Ma pile : bouton « Sélectionner » ou appui long, cocher plusieurs grains puis assigner catégorie ou tag en une fois ; bandeau « N grains viennent de {source} » pour classer un arriéré d'un geste
   v2.16 — sélection : plus de décalage vertical à l'entrée (la barre de sélection recouvre le fil d'Ariane, la recherche reste en place) ; case à cocher en gouttière au lieu de recouvrir le contenu (liste & grandes cartes), pastille en coin en galerie
   v2.17 — sélection sans reconstruction de la liste (fini le scintillement au cochage/entrée) ; barre d'outils de la pile en icônes seules pour ne plus déborder sur le titre
   v2.18 — grappe A : état de filtrage unique (une barre sous le fil d'Ariane montre type/source/tag/tri en puces retirables + « Tout effacer ») ; vues épinglées (régler ses filtres → « Épingler cette vue » → carte en tête de la pile, applicable d'un tap, re-tap sur la vue active pour renommer/désépingler)
   v2.19 — grappe B : le tirage consulte enfin surfaceAfter (les grains échus passent devant, une date future exclut du tirage) ; variété de source en plus de la variété de catégorie ; Surface paramétrable (interrupteur, cartes par tirage, rythme quotidien/un jour sur deux/hebdomadaire, jours actifs) — éteinte, l'onglet Surface disparaît ; sourdine par catégorie depuis le menu de la catégorie, listée dans les Réglages, qu'une date posée sur un grain outrepasse
   v2.20 — Réglages remis à plat : titres de groupe + lignes libellé/contrôle sur filets, une seule primitive de choix en N colonnes égales (fini les pastilles qui reviennent à la ligne), vrai interrupteur pour Surface, les 7 jours sur une seule ligne ; un choix simple ne reconstruit plus la feuille et ne fait plus remonter l'écran ; « À propos » complété (site, code source, mention)
   v2.21 — Réglages : les groupes redeviennent des cartes et le choix retrouve un fond levé. La mise à plat rangeait bien mais supprimait le contraste — un choix beige sur une feuille beige ne se voit plus. Hiérarchie, primitive de choix et conservation du défilement inchangées ; « Animation du titre » repasse sur une seule ligne, « Auto (système) » raccourci en « Auto »
   v2.22 — chantier 5 : glissé entre onglets. Accélérateur seulement — la barre du bas reste le chemin garanti. Le geste est refusé s'il part du bord de l'écran (retour système Android), pendant une sélection par lot, et dans les rangées qui défilent horizontalement (pastilles, vues épinglées, galerie de couvertures) ; verrou de direction pour ne jamais voler le défilement vertical. Les trois sections vivent désormais côte à côte dans une piste : le glissé suit le doigt et ne valide qu'au seuil, ou au lancer
   v2.23 — deux incohérences en attente tranchées. Grains par tirage : les valeurs passent de 3/5/8 à 1/3/5, défaut 3 — 8 dépassait le plafond annoncé et un rituel de 8 cartes ne se termine pas ; les réglages existants sur 8 retombent sur 5. Arrivée sur Ma pile : le tap sur l'onglet n'efface plus silencieusement pileLoc/type/source/tag/recherche, il fait exactement ce que fait le glissé — un geste copie un bouton, et effacer les filtres a déjà son bouton visible (« Tout effacer », chantier 8)
   v2.24 — grappe C : la coque. Chantier 10, le système visuel — une seule famille de boutons (icône / plein / fantôme / pastille), cible tactile de 48 px partout, une échelle d'espacement 4-8-12-16-24, un rayon, un jeu d'états dont le focus clavier ; l'accent brun ne sert plus qu'à l'interactif, tout le décoratif redescend en neutre ; états vides écrits ; must-have PWA (safe-area, overscroll-behavior, touch-action, boîtes à ratio réservé). Chantier 11, en-tête et capture — la recherche occupe la ligne et devient globale, le titre se rétracte au défilement, le compteur « N en pile » est supprimé, la barre de capture cède la place à un bouton flottant qui ouvre une feuille (champ + « Coller » + Ajouter), capture optimiste, et « Garder » ne veut plus dire deux choses : Ajouter à la capture, Garder à Surface. Chantier 12, identité des catégories — icône dérivée du nom (initiale + teinte de hash), jamais demandée à la création ; couverture figée sur le premier grain et non plus sur le dernier capturé ; contenant invariant ; « Non classés » sort de la grille et devient une ligne pleine largeur ; « Nouvelle catégorie » et « Éditer » passent dans le ⋯
   v2.25 — correctif : le défilement de Ma pile et de la galerie était mort. Deux causes, toutes deux introduites en v2.24. `body{overflow-x:clip}` retirait au body sa qualité de conteneur de défilement alors que `html,body{height:100%}` plafonne la page à l'écran — plus rien à faire défiler ; et `overscroll-behavior:contain` posé sur `#pileList`/`.setwrap`, qui ne défilent pas, coupait sur Android le chaînage du geste vers le scroller parent. L'en-tête rétractable ne lit plus `scrollY` (nul quand c'est le body qui défile) : il observe une sentinelle
   v2.26 — correctif, suite et fin : le défilement restait mort dans la piste. Cause réelle, distincte de celles de la v2.25 — `overscroll-behavior:contain` sur `.viewport`. Ce conteneur a `overflow:hidden`, donc le navigateur le tient pour un conteneur de défilement, mais un conteneur incapable de défiler ; `contain` lui faisait retenir le geste sans pouvoir s'en servir, et le doigt qui partait dans Ma pile ou la galerie ne déclenchait plus rien. La règle ne reste que sur le body, seul élément qui défile vraiment
   v2.27 — grappe D, premier morceau. Chantier 14 : taper un grain ouvre le lien, et rien d'autre. La carte est une cible unique, bord à bord ; tout le reste passe par un ⋯ posé dans une gouttière — à droite, côté pouce, décidé sur maquette. La case à cocher de la v2.16 déménage dans cette même colonne : elle prend la place du ⋯ à l'entrée en sélection, donc toujours zéro décalage, et la sélection n'a plus besoin d'envelopper les cartes dans un `.selwrap`. Les boutons d'action posés sur chaque carte (jeter, restaurer) disparaissent au profit du menu. Tri : deux valeurs de plus, A → Z et Z → A, rendues dans la feuille avec la grammaire `.seg`, en deux rangées d'un même groupe (Date, Titre) — cinq colonnes égales seraient illisibles et 3+2 ferait le bord en dents de scie que cette grammaire interdit. `.seg` sort au passage des Réglages et devient la primitive de choix de toute l'app, comme le prévoit le chantier 13
   v2.28 — correctif : on entrait dans une catégorie sans pouvoir revenir à toute la pile. Le bouton retour appelait selectTab("categories") en laissant `pileLoc` posé ; on repassait donc dans Parcourir, puis l'onglet Ma pile — qui depuis la v2.23 ne réinitialise plus rien, à raison — ramenait dans la catégorie. Le retour redevient ce que le cap décrit : le premier maillon du fil d'Ariane. Il remonte d'un cran (catégorie → toute la pile) et ne change plus d'onglet ; « Mis de côté » et « Corbeille », qui sont d'autres collections et non des filtres, continuent de rendre la main à Parcourir
   v2.29 — chantier 13 : les axes se rassemblent dans une barre unique sous le fil d'Ariane — affichage, Filtrer, Trier — et les deux pastilles isolées du fil d'Ariane disparaissent. L'affichage passe de « grandes cartes / galerie / liste » × trois densités, soit neuf formes pour un seul axe, à trois : liste (défaut), grille, compact. « Vue par défaut » et « Densité » quittent les Réglages, le groupe « Ma pile » avec ; les réglages existants migrent vers la liste. Ajout d'un bouton « Actualiser l'application » : une PWA installée peut rester des jours sur une version périmée, le worker gardant la coquille et le cache HTTP gardant app.js et styles.css, qui ne passent même pas par le worker
   v2.30 — chantier 15, fin de la grappe D : l'onglet Catégories devient Parcourir et porte trois index — Catégories · Tags · Sources — dans l'ordre du degré d'intention. La catégorie est un rangement délibéré, le tag est transversal mais choisi, la source est subie : dérivée de l'URL sans que personne ne la décide, sa place à droite dit ce qu'elle est. Sources sort de son statut de filtre caché et devient navigable, sur une donnée qui existait déjà (sourceOf). Pas de quatrième onglet pour les tags : il leur donnerait le poids visuel des catégories, contre le modèle, et la piste de la v2.22 doit rester à trois sections. L'index Tags n'apparaît que s'il y a des tags, sinon le sélecteur passe à deux colonnes. Tags et Sources en liste dense triée par taille, jamais en cartes-couvertures, et aucune affectation de tag depuis l'index
   v2.31 — correctif chantier 15 : en index Tags et Sources, la grille de catégories et l'en-tête « Catégories » (+ le ⋯) restaient affichés par-dessus la liste dense. renderRoot() posait pourtant `hidden` sur les deux, mais `.domgrid{display:grid}` et `.cathead{display:flex}` — règles d'auteur — l'emportaient sur l'attribut `[hidden]` de la feuille du navigateur, exactement le piège déjà réglé pour `.tabs button[hidden]`. Ajout de `.domgrid[hidden],.cathead[hidden]{display:none}`. styles.css seul touché
   v2.32 — correctif : l'en-tête rétractable vibrait au défilement vers le bas. Il ne s'agissait ni d'un mauvais seuil ni d'un scintillement de rendu : la boucle venait de l'ancrage de défilement du navigateur. Poser `.shrunk` fait passer `.tbtitle` de 56 px à 0 ; le contenu au-dessus du pli rétrécit d'autant, et l'ancrage baisse `scrollY` de ~56 px pour garder le visible en place — plus que la bande de 28 px de #hdrSentinel, si bien que la sentinelle repassait dans le champ, l'en-tête regrandissait, l'ancrage repoussait, et ça recommençait à chaque image (56 > 28, donc systématique). `body{overflow-anchor:none}` coupe cette compensation sur le seul élément qui défile ; les couvertures ont déjà des boîtes à ratio réservé, l'ancrage ne servait rien ici. styles.css seul touché
   v2.33 — correctif : le tremblement de l'en-tête subsistait sur les index courts (Tags, Sources). La v2.32 avait coupé la boucle d'ancrage, visible surtout sur Ma pile (longue) ; il restait une seconde boucle, plus faible, sur les pages courtes : replier l'en-tête rend 56 px au document, ce qui peut suffire à faire tenir la page dans l'écran et forcer `scrollY` à 0 — donc redéployer, réallonger, re-scroller… Le seuil unique de la sentinelle (28 px) était plus étroit que ces 56 px, il se faisait retraverser. Passage à une hystérésis : sentinelle portée à 120 px, l'observer lit son ratio visible et replie à ≤ 2 % (~118 px défilés), ne redéploie qu'à ≥ 98 % (~2 px). ~116 px de bande morte, plus large que le repli, qu'aucun recalage ne franchit ; et sur une page trop courte pour défiler jusque-là, l'en-tête reste simplement déployé. app.js et styles.css touchés
   v2.34 — « État de la pile » (broutille) : un groupe dans les Réglages, chaque ligne un chiffre + un chemin, rien de décoratif, tout calculé à la volée. Non classés → sélection par lot pré-armée ; Jamais remontés (jamais vus, moins de 6 mois) → posés échus pour passer en tête du prochain tirage, sans voler le rituel ; Dormants (6 mois et plus sans jamais resurgir) → pile filtrée sur un focus visible et retirable, plus vieux d'abord, sélection armée. Buckets disjoints par âge (pas de double compte). Une ligne à zéro n'apparaît pas ; tout à zéro → « Rien à trier ». Les sourdines quittent le groupe Surface pour ce seul foyer. app.js et styles.css touchés
   v2.35 — #3 tuiles de source : un lien sans image n'affiche plus du vide. Tuile dérivée (monogramme + teinte stable de la source, comme l'icône de catégorie du chantier 12) en repli dans la liste (vignette) et la grille (couverture). Aucun réseau, jamais d'échec ; YouTube garde sa vraie vignette dérivée de l'URL. Pas d'Edge Function ni de scraping OG : Instagram rend vide même côté serveur, et il faudrait la tuile de repli de toute façon. La grande carte de Surface n'est pas encore traitée (repli suivant). app.js et styles.css touchés
   v2.36 — abandon du bandeau « N grains viennent de {source} » de la sélection par lot (chantier 3). Il présumait une intention de rangement par source qui n'existe pas — quatre grains d'une même source vont le plus souvent dans quatre catégories différentes — et s'imposait sur la meilleure ligne de la pile. Appel, fonction renderNudge et CSS .srcnudge retirés ; le conteneur vide #pileNudge reste dans index.html (aucun rendu). La sélection par lot reste ouverte au bouton et à l'appui long. app.js et styles.css touchés
   v2.37 — vague mécanique du cap 09 (chantiers 21, 23, 24, 27, 16), avant toute UI de navigation. #21 porte du tirage : maturation 30 j (éligible après createdAt+30 j), rotation par âge de capture (le plus ancien d'abord — le rituel remonte le temps) au lieu de lastSurfaced, plancher de re-remontée 60 j (les déjà-vus ne repassent qu'après 60 j) ; les échus (surfaceAfter posé) restent devant tout ; si les candidats manquent, c'est la taille du tirage qui cède, jamais le plancher ; variété par catégorie puis par source conservée, extraite dans fillPool ; aucun champ nouveau. #23 import en masse : feuille « Importer une liste » (coller N liens un par ligne, ou un export .txt), une catégorie et un tag appliqués au lot ; antidatage du lot non daté (une archive posée au-delà de la maturation, ex æquo départagés au hasard) sinon la maturation bloquerait tout ; vraies dates conservées quand un export WhatsApp les porte ; dédoublonnage à l'import. #24 dédoublonnage à la capture : URL déjà en pile → pas de second item, un chemin « voir » vers l'existant, sans bloquer la capture optimiste. #27 Vrac : catégorie assumée, épinglée à un seul tap en tête du classement par lot. #16 vocabulaire : grain → item dans toute l'UI, « État de la pile » → « À trier » (Parcourir → Collection et Surface → la remontée renommés avec leurs chantiers de structure). index.html, app.js, styles.css touchés
   v2.49 — l'index gagne un ordre choisi, et la sélection change de porte. (a) TRI DE L'INDEX. Reproche du pouce : « il y a des catégories qui ne sont pas triées, je n'ai aucune main là-dessus ». Le diagnostic n'est pas l'absence d'ordre — catOrder() triait par taille depuis la v2.38 — c'est que cet ordre est ILLISIBLE : décroissant sur un compteur qu'on ne lit pas, il est indistinguable du désordre. Un ordre dérivé qu'on ne peut pas relire ne remplit pas l'office d'un ordre. Nouveau réglage indexSort, UN SEUL pour les trois lentilles (leçon v2.43 : trois réglages symétriques auraient été deux bugs qui attendent), persisté comme indexView, trois valeurs — Taille, A → Z, Z → A — rendues par un groupe « Trier » dans la feuille « Vue », entre « Grouper par » et « Voir en » : grouper, puis ordonner, puis la forme. DÉFAUT A → Z, changement assumé du comportement existant : le travail de l'index est de retrouver un nom, et une seule ligne (DEFAULT_SETTINGS) le ramène à "size" si le pouce dit le contraire. Les épingles restent EN TÊTE dans les trois ordres — une épingle est un ancrage, pas un rang, et c'est elle qui répond à « avoir la main » sans coûter un ordre manuel. Le tri s'applique dans catOrder() et idxEntries(), JAMAIS dans tagLib() ni srcLib() : ces deux-là nourrissent aussi les suggestions de tag et le sélecteur de catégorie de la fiche, où l'ordre de fréquence est le bon — un slice(0,8) alphabétique aurait rendu des suggestions absurdes. Changer d'ordre DÉPLACE les nœuds (reorderNodes : validation complète des clés AVANT le premier déplacement, puis un DocumentFragment), il n'en reconstruit aucun : aperçus ouverts, médias chargés et défilement survivent, comme moveCatNode le fait pour l'épingle depuis la v2.38. (b) LA PORTE DE LA SÉLECTION DÉMÉNAGE. Jugement ouvert n° 7 du cap 13 tranché : l'entrée « Sélectionner des items » quittait la feuille « Vue », qui ne doit contenir que de l'état d'affichage — une action y était un corps étranger. Elle devient « Sélectionner » dans le ⋯ de l'item, et elle entre en sélection AVEC CET ITEM COCHÉ : le jumeau visible exact de l'appui long, au même endroit. Solde de surface neutre, une ligne change de feuille. La classe .sp part avec elle (markup mort, aucune règle CSS). (c) DÉFAUT TROUVÉ EN DÉPLAÇANT LA PORTE : selAddFromGesture() posait selMode=true SANS pushLayer("sel"). Entrer en sélection par l'appui long ne poussait donc aucune couche — le retour d'Android quittait l'onglet au lieu de sortir de la sélection, et exitSel() appelait popLayer sur une couche jamais empilée (retour silencieux, la pile restait fausse). L'invariant du chantier 31 était rompu depuis la v2.44 sur le seul chemin que le banc ne pouvait pas emprunter, faute de géométrie tactile. Deux fichiers touchés
   v2.48 — le titre de Collection était tronqué en « Catégori… ». Pas un bug de logique : une faute de TRANSCRIPTION. La maquette sable-nav-7, validée au pouce, portait des boutons d'en-tête de 44 pt et un écart de 2 ; l'intégration a réutilisé `.btn.icon` (48 pt) et `--s1` (4 pt), ce qui reprend 24 pt sur les quatre boutons de Collection — exactement de quoi faire mordre l'ellipse sur un titre de dix lettres. La maquette avait donc raison, et le calcul annoncé à la livraison de la v2.45 (« 348 px sur 354 disponibles ») portait sur les cotes de la maquette, pas sur celles du code livré. Les cotes validées sont transcrites, et seulement dans l'en-tête : `.btn.icon` garde 48 pt partout ailleurs. LEÇON : une maquette valide des DIMENSIONS autant que des idées ; les reprendre au jugé annule le test. Le banc de style les affirme maintenant en toutes lettres. Et comme les cotes transcrites laissaient encore une marge de quelques points seulement sur un écran de 360 pt — parier sur une marge de quelques points est exactement ce qui a produit l'ellipse — la taille du titre suit désormais la largeur : `font-size:clamp(20px,5.6vw,24px)`, 24 px partout où il y a la place, jamais moins de 20 px, aucune mesure JS. Marge positive vérifiée de 360 à 412 pt. Un seul fichier touché
   v2.47 — la vraie cause de la bande sous l'en-tête, et une variable de moins. Le palier de date était collant par `top:var(--tbh)`. Or `.viewport` porte `overflow:hidden` — il lui faut, pour la piste horizontale — et un ancêtre en `overflow:hidden` EST le conteneur de défilement d'un élément collant : le palier se collait au haut de `.viewport`, dont le sommet est déjà sous l'en-tête, si bien que `top` ajoutait la hauteur de l'en-tête une SECONDE fois. Le doublon date de la v2.33, mais `--tbh` valait alors la hauteur repliée de l'en-tête (~8 px) et personne ne pouvait le voir. La v2.42, en rendant l'en-tête non rétractable, l'a fait passer à la hauteur pleine (~64 px) ; la v2.45 a retiré tout ce qui masquait encore le décalage. Trois versions pour qu'une faute de v2.42 devienne visible, et deux correctifs (v2.46) tirés à côté avant de trouver — le premier corrigeait une vraie régression (un conteneur affiché et vide), mais pas celle-là. La règle est retirée, ce que le cap avait pré-autorisé mot pour mot pour cette ligne précise : les paliers redeviennent de simples séparateurs, le découpage par date ne dépendait pas d'elle. Conséquence : `--tbh` n'a plus aucun consommateur, et `publishHdrH()` disparaît avec ses deux écouteurs et ses six points d'appel. Plus une seule mesure JS dans le chemin d'un positionnement CSS — la variable qui a coûté les correctifs v2.31, v2.32, v2.33 et celui-ci n'existe plus. LEÇON POUR LE CAP, la plus importante de la série : jsdom ne calcule AUCUNE mise en page, donc aucun des trois bancs ne peut voir une bande vide, un chevauchement ou un décalage. Tout ce qui est géométrie se juge au pouce ou pas du tout, et un banc qui passe ne dit rien sur la mise en page. Les deux fichiers touchés
   v2.46 — correctif de la v2.45. RÉGRESSION PROUVÉE : `#filterState` restait AFFICHÉ ET VIDE sur l'accueil de Ma pile. Avant la v2.45 il contenait toujours la barre d'axes, donc `el.hidden=false` inconditionnel ne coûtait rien ; en retirant la barre j'ai laissé un conteneur `display:flex` avec `padding:2px 4px 12px` qui ne montre rien et prend de la place. Même faute de raisonnement que le bandeau vide de la v2.36 : un élément d'état doit se masquer quand il n'a pas d'état à dire, et « vide » n'est pas « absent ». Il se masque maintenant dès qu'il n'y a ni périmètre ni puce — et le banc l'affirme, ce qu'il ne faisait pas. DURCISSEMENT DE --tbh : `publishHdrH()` n'était appelée qu'au démarrage et aux bascules de la recherche. Depuis que l'en-tête change de contenu selon l'onglet (v2.45), une valeur en retard décale le palier collant de l'historique, qui se pose alors trop bas et laisse une bande vide entre l'en-tête et la liste. Elle est republiée à chaque peinture de l'en-tête, et une fois de plus à la frame suivante — la mesure d'un élément qu'on vient de modifier n'est fiable qu'après la mise en page. Les deux fichiers touchés
   v2.45 — chantier de l'en-tête chargé (maquette sable-nav-7, directions B et F validées au pouce). L'en-tête devient la SEULE surface de contrôle, et tout ce qui vivait sous lui disparaît. Collection : les deux lignes d'état — l'invitation à la remontée (ch. 22) et « Non classés » — deviennent deux pastilles à point dans l'en-tête, plus un réveil qui monte une fois par jour au premier passage et n'insiste jamais (deux lignes, un tap chacune, « Plus tard » et il ne revient plus avant demain ; `settings.wakeSeen` porte la date). Un point ne réclame rien, il signale — c'est la seule forme d'alerte que ce produit s'autorise, puisque rien ne s'y consomme. Avec #idxSeg et .cathead partis en v2.42, il ne reste RIEN entre l'en-tête et la première catégorie. Ma pile : le fil d'Ariane est supprimé en entier. Le chevron (bug de six versions, corrigé en v2.44, et désormais sans emploi), le compte (déjà retiré une fois de l'en-tête au ch. 11, pour la même raison : personne ne le lit) et le ✓ qui disait « il faut choisir quelque chose » à quelqu'un venu lire — la sélection entre par l'appui long, qui existe depuis la v2.19, et par une entrée du menu du titre. La barre d'axes disparaît aussi : « Filtrer » devient une icône d'en-tête. Et le second champ de recherche est supprimé : la loupe cherche DANS LE PÉRIMÈTRE COURANT — toute la pile sur Collection, la liste affichée sur Ma pile. Une seule loupe, une seule phrase : « chercher ici ». Le périmètre devient une PUCE RETIRABLE dans la rangée qui porte déjà les puces de filtre (ch. 8) : entrer dans une catégorie, c'est poser une puce ; la retirer, c'est sortir. Aucune grammaire nouvelle, et le retour d'Android la retire aussi (couche « scope » de la v2.44). Style de la puce emprunté à la ligne qu'elle remplace — nom en graisse de titre, compte en mono, filet sous la rangée — parce qu'un périmètre n'est pas un filtre de plus : c'est l'endroit où l'on est. Gain mesuré au banc : le premier contenu remonte d'environ 96 px sur Collection et 150 px sur Ma pile. Les quatre fichiers touchés
   v2.44 — le bouton retour d'Android, et un bug de six versions. (a) PILE DE NAVIGATION. Jusqu'ici l'app n'avait AUCUN pushState : le retour système quittait l'app même avec une feuille ouverte, un périmètre posé ou la surface dépliée. Une pile de couches nommées la remplace, avec un seul invariant : fermer par l'UI et reculer par le système empruntent le MÊME chemin. Chaque ouverture pousse une entrée d'historique ; chaque fermeture rend les entrées qu'elle occupait ; le gestionnaire de popstate ne compte rien, il RÉCONCILIE sur la profondeur lue dans l'état (`{sable:n}`). C'est ce qui rend l'opération idempotente : un navigateur qui émet un popstate ou trois pour un même history.go(-n) donne le même résultat, et deux appuis rapides ne défont pas une couche de trop. Sept couches, dans l'ordre où elles peuvent s'empiler : onglet hors onglet de départ, périmètre (collection ou tag), recherche, sélection, surface, feuille, visionneuse. Au tout premier niveau — onglet de départ, rien d'ouvert — le retour rend la main au système : une app dont on ne peut pas sortir par le retour est un piège, pas une app. (b) LE CHEVRON RETOUR DE MA PILE NE SE CACHAIT JAMAIS. `crumbBack.hidden` était juste depuis toujours, mais `.crumb .back` pose `display:flex` sans annuler `[hidden]` : la règle d'auteur gagne. SIXIÈME occurrence du piège du cap. Corrigé, avec trois annulations prophylactiques posées d'un coup (.fstate, .riseinv, .unfline) — toutes des règles `display:flex` sur des éléments qu'un futur `hidden` masquerait mal. (c) LE BANC QUI VALIDAIT CE BUG. Le contrôle `[hidden]` du banc de style lisait getComputedStyle sous jsdom, or jsdom fait gagner `[hidden]` là où un vrai navigateur fait gagner la règle d'auteur : le contrôle ne POUVAIT pas échouer, il rassurait sans rien vérifier depuis qu'il existe. Remplacé par un audit textuel du CSS : pour chaque règle qui pose un `display:` sur une cible masquée par `hidden`, l'annulation explicite doit exister. C'est ce qui a trouvé (b) en une passe. Les trois fichiers touchés
   v2.43 — trois retours du pouce sur la v2.42. (a) L'EXPLORATEUR DEVIENT HOMOGÈNE : les trois index se voient dans les trois formes. Jusqu'ici seul l'index Catégories avait un axe d'affichage, et la v2.42 lui avait même retiré Compact en suivant la passation au mot — un retrait non décidé, réparé ici. Tags et Sources gagnent la galerie : une carte par entrée, visage dérivé (monogramme ou #, teinte stable par hash) puisqu'un tag n'a pas de couverture. La liste dense ne change PAS de visage (puce ou # comme avant, « une puce de couleur au plus », chantier 15) : c'est la forme qui s'ajoute, pas le décor. La bascule reste un attribut posé sur le conteneur puis un redessin nœud par nœud (repaintIdxNodes), jamais une reconstruction — le défilement ne bouge pas. `indexView` reste UN seul réglage partagé par les trois lentilles : deux réglages symétriques doivent se mémoriser pareil, trois auraient été trois. (b) INTERRUPTEUR DE COMPARAISON, provisoire : « Galerie sur tous les index » dans Général. Éteint, la galerie n'existe que pour les catégories (la lecture stricte du chantier 15) ; allumé, elle existe partout. Il sert à trancher sur le corpus réel et doit être soldé après : c'est un banc dans l'app, pas un réglage. Quand il s'éteint alors que la galerie est posée sur Tags, l'affichage retombe en liste SANS toucher au réglage mémorisé — un état posé par le doigt survit à tout ce qui n'est pas sa disparition. (c) DEUX REDONDANCES RETIRÉES, toutes deux nées de la v2.42. Le fil d'Ariane de Ma pile disait « Toute la pile » sous un titre qui dit déjà « Ma pile » : hors périmètre ouvert il ne dit plus que le compte. Et « Non classés » était resté le gabarit d'alerte système que le cap avait condamné pour l'invitation en v2.39 — rectangle teinté, icône encadrée, deux lignes, bouton plein — si bien que deux grammaires différentes s'empilaient en tête de Collection. Il adopte la grammaire de l'invitation : une ligne, un chiffre, un chemin, et « Ranger » dans une gouttière droite avec son filet. Même géométrie que l'invitation, encre plus calme : la remontée garde l'accent, elle est la seule chose qui se termine. Les trois fichiers touchés
   v2.42 — chantier de l'en-tête consolidé (maquette sable-nav-6, validée au pouce). Un retrait, pas un ajout : l'en-tête passe à UNE ligne — titre-menu, loupe, réglages — et les deux bandes de contrôle qui vivaient sous lui disparaissent. Le titre EST le menu de vue : sur Collection il dit l'index courant (Catégories ▾ / Tags ▾ / Sources ▾), sur Ma pile il dit « Ma pile ▾ », et un tap ouvre la feuille « Vue » — « Grouper par » (browseIdx, ex-#idxSeg) et « Voir en » (indexView, ex-.cathead) sur Collection ; « Trier » (sortMode) et « Voir en » (pileView) sur Ma pile, qui quittent donc la barre d'axes : les laisser aux deux endroits aurait ajouté au lieu de retirer, et il ne reste dans la barre que « Filtrer », là où vivent les puces. Aucun état nouveau, aucune migration : la feuille ne change QUE l'endroit où se règlent quatre états déjà persistés. La lentille est adaptative — Tag n'est proposé que s'il y a des tags, Source que si srcIndexUseful(), et « Grouper par » disparaît quand il ne reste qu'une lentille. La recherche redevient une loupe : #searchInput n'est plus permanent, le champ révélé remplace la ligne du titre et se ferme par une croix ; zéro hauteur au repos, l'état body.searching et renderRootSearch sont inchangés. Le ⋯ de Collection est tranché par soustraction (jugement ouvert depuis la v2.38) : son unique choix devient une ligne fantôme nommée « Nouvelle catégorie » en pied de l'index des catégories — jamais un second `+`. Le wordmark quitte l'en-tête pour la tête des Réglages, où l'animation qu'on y règle se regarde vraiment ; l'écran de connexion garde le sien. Conséquence heureuse sur la zone la plus chère du projet : l'en-tête ne change plus de hauteur au défilement, donc --tbh est constante et la boucle d'ancrage des v2.32/v2.33 ne peut plus exister — .shrunk ne pose plus que le filet. Ménage des résidus du cap 12 au passage : .vseg (4 règles mortes depuis la v2.29), renderTypeChips() (rendait dans un #typeChips disparu) et le conteneur vide #pileNudge. Les trois fichiers touchés
   v2.41 — correctif graphique de la v2.39, trois points relevés au pouce. (a) Le champ de la feuille « Classer N items » n'avait jamais eu de boîte : la règle `.picklist input` n'écrivait que de quoi effacer une bordure, sans largeur ni remplissage ni police, si bien que l'<input> tombait sur sa largeur intrinsèque — une vingtaine de caractères, d'où le libellé coupé — avec la police du navigateur, hors du système. Il prend la boîte des lignes qu'il filtre. (b) Le cadre de sélection était un liseré, pas un cadre : une ligne n'ayant ni bordure ni rayon, recolorer `border-color` ne touchait que son filet du bas et le `box-shadow` sortant dessinait un rectangle à angles vifs posé par-dessus la boîte, passant sous les lignes voisines et rogné au bord de la liste. Cadre rentrant, rayon, fond teinté, et `margin-inline:-8px` / `padding-inline:12px` pour lui donner de l'air sans décaler le contenu d'un pixel. (c) Les deux cartes décalées derrière la carte du rituel sont retirées : l'intention était juste mais une pile de cartes dans un écran de revue promet un swipe que le produit refuse sur cette carte, la finitude était déjà dite deux fois au-dessus (pastilles + compteur n / N), et ce troisième énoncé couvrait « Une de plus ». Le bouton, seul dans sa barre, se centre. app.js et styles.css touchés
   v2.40 — correctif de la v2.39, écran blanc au démarrage. Le chantier 22 a passé Collection en tête de TAB_ORDER sans déplacer les <section> dans index.html : paintTabs positionne la piste par le rang dans TAB_ORDER (indexOf → translation de -i × largeur) alors que la piste, elle, empile ses sections dans l'ordre du DOM. Collection calculait donc l'offset 0, qui montrait la première section du DOM — Ma pile — laquelle a height:0 tant qu'elle n'est pas .tabcur : écran vide, et une page longue parce que la section courante, elle, gardait sa hauteur hors champ. Exactement le décalage d'un cran de la v2.22, que ce cap avait pourtant consigné. Deux corrections, pas une : les sections sont remises dans l'ordre, ET orderTrack() réordonne le DOM sur TAB_ORDER au démarrage — le markup ne peut plus contredire la constante, la classe de bug est fermée. Le banc de démarrage ne l'avait pas vu parce que jsdom n'a pas de mise en page : vp.clientWidth vaut 0 et paintTabs sort avant de translater ; il stube désormais la largeur et vérifie que la section réellement en face de la fenêtre est bien la courante. index.html et app.js touchés
   v2.39 — vague du cap 11 (chantiers 22, 26, 20, 25). #22 la remontée devient une surface invoquée : la barre du bas passe à deux onglets, Collection · Ma pile, et Collection prend la tête de la piste (elle était l'accueil depuis la v2.38 mais occupait la troisième place, on ouvrait l'app tout à droite du glissé). L'onglet Surface disparaît — il en portait déjà tous les signes : il s'effaçait quand la remontée était éteinte, sa pastille tombait à la fin du rituel, et hors jour de tirage il affichait un écran de repos, c'est-à-dire un écran qui annonce qu'il n'a rien à dire. À sa place, une ligne sur l'accueil, qui n'existe que s'il y a un tirage et disparaît quand le rituel est fini ; elle ouvre une surface plein écran qui porte sa progression, son compteur n / N, la carte, les quatre boutons et deux cartes décalées derrière la courante — la seule mécanique de jeu dont un rituel a besoin : on voit que ça va finir. Arrivée de la carte : une montée de 180 ms, et rien d'autre. Fin du renommage du cap 09 : « Surface » quitte l'UI pour « la remontée », dernier mot du tableau de vocabulaire. La grande carte gagne enfin le repli de la v2.35 (tuile dérivée quand un lien n'a pas d'image). #26 « À trier » remonte juste après Général : c'est un groupe d'où l'on agit, pas où l'on règle. La porte de secours du rituel y entre — « Faire remonter un item maintenant » — et elle n'écrit PLUS batch.date : utiliser la porte ne doit pas coûter le rituel du lendemain. La carte à la demande vit en mémoire seule (riseAdHoc), elle ne s'écrit nulle part. #20 Ma pile devient un historique : paliers collants Aujourd'hui · Cette semaine · Ce mois · {Mois année}, et A → Z / Z → A quittent l'historique pour ne rester que dans une collection ouverte, où chercher un nom a un sens. Le collant est isolé dans une seule règle CSS et se colle sous la hauteur REPLIÉE de l'en-tête, publiée en variable : c'est la seule qui vaille, puisque rien n'est collé tant qu'on n'a pas défilé. #25 broutilles : la recherche de pile devient un axe (puce retirable, vue épinglable) ; la feuille de filtre ne propose que ce qui existe dans la collection ouverte, avec les compteurs, sources triées par taille ; l'index Sources disparaît quand une source dépasse 70 % de la pile (il n'apprend alors rien) ; ménage de pileView:"feed", lastView et density, et l'axe d'affichage des items se mémorise enfin comme celui de l'index. Les trois fichiers touchés
   v2.38 — grappe Collection du cap 10 (chantiers 17, 18, 19, 28), intégration de la maquette sable-nav-1 validée au pouce. #17 Collection devient l'accueil : startTab passe de "surface" à "categories" (valeur "surface" migrée au chargement, comme batchSize en v2.23), la liste du réglage devient Collection · Ma pile · Dernier onglet, et les deux libellés d'onglet en retard partent avec (Parcourir → Collection, Pile → Ma pile). #18 l'axe d'affichage entre dans l'index : second réglage indexView, distinct de pileView — basculer l'index ne bascule pas Ma pile ; la bascule se fait par attribut sur le conteneur (#domGrid[data-view]), jamais par reconstruction, c'est ce qui préserve les dépliages ouverts et la position de défilement ; liste par défaut, et le libellé « CATÉGORIES » de la .cathead cède sa ligne au .seg puisque l'index juste au-dessus dit déjà le même mot. #19 la ligne de catégorie à trois cibles : chevron dans une gouttière de 42 px séparée par un filet (déplie un aperçu de 3 items), le corps entre, le ⋯ dans la gouttière droite ouvre la gestion ; le pied du dépliage dit « Tout voir dans {cat} (N) → », ou « Entrer dans {cat} → » sous 4 items ; en grille pas de dépliage, et passer en grille referme ce qui était ouvert. #28 gestion des catégories : catEditMode supprimé (mode, crayon, bandeau d'aide et ligne « Éditer / réordonner » avec lui), chaque ligne et chaque carte porte son ⋯ ; épingler déplace le nœud en place au lieu de reconstruire l'index (piège v2.20). Correctif de vocabulaire au passage : deux chaînes visibles disaient encore « grains » (état vide de l'index, toast de « faire remonter ») — le chantier 16 n'était pas fini. Les trois fichiers touchés */
const APP_VERSION="v2.49";
/* Icônes : sprite unique icons.svg (voir ce fichier). icon('trash') renvoie le
   markup <use> ; la taille/couleur restent pilotées par le CSS selon le contexte. */
function icon(name,cls){return '<svg class="ic'+(cls?' '+cls:'')+'" aria-hidden="true"><use href="icons.svg#'+name+'"/></svg>';}
const KEY_ITEMS="brain:v1:items";
const KEY_BATCH="brain:v1:batch";
const KEY_SETTINGS="brain:v1:settings";
/* Chantier 17 : le défaut n'est plus "surface". L'app s'ouvrait sur le pilier 4 —
   la remontée — alors que le pilier 2 est l'accueil. `indexView` (chantier 18) est
   un SECOND réglage d'affichage, volontairement distinct de `pileView` : l'index
   et une liste d'items n'ont pas la même nature, basculer l'un ne bascule pas
   l'autre.
   Ménage du chantier 25 : `density` et `lastView` sont partis, et `pileView` ne
   vaut plus "feed" ni "last" — c'est désormais l'axe stocké, exactement comme
   `indexView`. Ce que le doigt a choisi survit au rechargement. */
const DEFAULT_SETTINGS={startTab:"categories",theme:"auto",batchSize:3,lastTab:"categories",iconRecents:[],pileView:"list",indexView:"list",indexSort:"az",idxAllForms:true,anim:"sheen",catPins:[],catIcons:{},cats:[],pinnedViews:[],surfaceOn:true,surfaceFreq:"daily",surfaceDays:[0,1,2,3,4,5,6],mutedCats:[]};
let settings={...DEFAULT_SETTINGS};
const BATCH_SIZE=()=>settings.batchSize;
/* ---------- Surface : allumage, rythme, sourdine (chantiers 6 & 7) ----------
   Aucune notification, aucun serveur : le tirage a lieu à l'ouverture de l'app.
   Les jours actifs ne valent que pour le rythme quotidien ; pour les autres, la
   cadence se déduit du dernier tirage (sinon deux réglages se contredisent). */
const SURF_GAP={daily:1,every2:2,weekly:7};
const DAY_MS=86400000;
const surfaceOn=()=>settings.surfaceOn!==false;
const surfaceFreq=()=>SURF_GAP[settings.surfaceFreq]?settings.surfaceFreq:"daily";
const surfaceDays=()=>Array.isArray(settings.surfaceDays)&&settings.surfaceDays.length?settings.surfaceDays:[0,1,2,3,4,5,6];
function isSurfaceDay(d){return surfaceFreq()!=="daily"?true:surfaceDays().includes(d.getDay());}
function dayGap(aStr,bStr){return Math.round((new Date(bStr+"T00:00:00")-new Date(aStr+"T00:00:00"))/DAY_MS);}
/* « Non classés » ne peut pas etre mis en sourdine : c'est un des meilleurs services de Surface. */
const isMuted=it=>!!it.domain&&(settings.mutedCats||[]).includes(it.domain);
function surfaceDue(){
  if(!surfaceOn())return false;
  if(!isSurfaceDay(new Date()))return false;
  if(!batch.date)return true;
  return dayGap(batch.date,todayStr())>=SURF_GAP[surfaceFreq()];
}
function nextSurfaceDate(){
  if(!surfaceOn())return null;
  for(let n=1;n<=60;n++){
    const d=new Date(Date.now()+n*DAY_MS);
    if(!isSurfaceDay(d))continue;
    const k=d.toISOString().slice(0,10);
    if(!batch.date||dayGap(batch.date,k)>=SURF_GAP[surfaceFreq()])return d;
  }
  return null;
}
function nextSurfaceLabel(){
  const d=nextSurfaceDate();if(!d)return"";
  const k=d.toISOString().slice(0,10);
  if(dayGap(todayStr(),k)===1)return"demain";
  try{return d.toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long"});}catch(e){return"";}
}
const KEY_THEME="brain:v1:theme";
const KEY_MEDIA="brain:v1:media:";
const MEDIA_MAX=4800000;

let items=[];
let batch={date:"",ids:[],idx:0};
let pileLoc=null;      /* null = accueil de Ma pile ; sinon "all"|"none"|"archived"|"trashed"|nom de domaine */
let pileQuery="";
/* Index affiché dans Collection : "cats" | "tags" | "srcs". En mémoire, pas
   dans les Réglages — c'est une position de lecture, pas une préférence. */
let browseIdx="cats";
/* Chantier 19 : quelles catégories ont leur aperçu déplié. En mémoire pour la
   même raison que browseIdx, et surtout : c'est ce Set qui permet de rebâtir
   l'index sans refermer ce que le doigt venait d'ouvrir. */
const catOpen=new Set();
let typeFilter="all";
let sourceFilter="all";
let sortMode="recent";
let tagFilter="";
let selMode=false;const selIds=new Set();   /* sélection par lot dans Ma pile */
let dormantFocus=false;   /* focus transitoire « dormants », posé depuis État de la pile ; visible et retirable comme un axe */
let pileView="list";
/* Chantier 26 : la carte tirée par la porte de secours. En mémoire SEULEMENT —
   elle ne s'écrit ni dans `batch` ni dans le stockage, c'est tout l'objet de la
   règle « un tirage à la demande n'écrit pas batch.date ». */
let riseAdHoc=[];
let riseIdx=0;
let indexView="list";   /* chantier 18 : l'affichage de l'index, distinct de celui des listes d'items */
/* v2.49 : l'ORDRE de l'index, distinct de sa FORME. Un seul pour les trois
   lentilles — voir IDX_SORTS. */
let indexSort="az";
let lastTrashed=null;
let curTab="categories";   /* onglet affiché — porte la position de la piste (chantier 5) */

/* ---------- theme ---------- */
function effTheme(){return settings.theme==="auto"?((window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches)?"dark":"light"):settings.theme;}
let uiReady=false;
function applyTheme(){document.documentElement.setAttribute("data-theme",effTheme());if(uiReady)renderAll();}
function applyAnim(){document.documentElement.setAttribute("data-anim",settings.anim||"sheen");}
function loadSettings(){
  try{
    const raw=localStorage.getItem(KEY_SETTINGS);
    if(raw)settings={...DEFAULT_SETTINGS,...JSON.parse(raw)};
    else{const legacy=localStorage.getItem(KEY_THEME);if(legacy)settings.theme=legacy;} /* migration ancien reglage theme */
    /* migration v2.23 : les valeurs de batchSize passent de 3/5/8 à 1/3/5 —
       un réglage sur 8 retombe sur 5, toute autre valeur hors jeu sur le défaut. */
    if(![1,3,5].includes(settings.batchSize))settings.batchSize=settings.batchSize>5?5:3;
    /* migration v2.38, chantier 17 : « ouvrir sur Surface » n'est plus une option.
       L'onglet disparaît au chantier 22 ; la valeur part avant lui, sinon l'app
       s'ouvrirait sur une section qui n'existe plus. `lastTab` n'est pas migré :
       tant que l'onglet Surface existe, y être revenu reste un fait vrai. */
    if(settings.startTab==="surface")settings.startTab="categories";
    /* migration v2.39, chantier 22 : l'onglet Surface n'existe plus. `lastTab`
       n'était volontairement pas migré en v2.38 — « y être revenu » restait un
       fait vrai tant que l'onglet existait. Il ne l'est plus, et un `lastTab`
       orphelin ouvrirait l'app sur une section absente. */
    if(settings.lastTab==="surface")settings.lastTab="categories";
    /* Ménage v2.39, chantier 25. Ce code tourne au niveau racine du fichier,
       bien avant `VIEW_KEYS` : la liste est écrite en clair, comme la leçon de
       la v2.38 l'impose (le code de migration doit être autonome). */
    const VK=["list","grid","compact"];
    if(!VK.includes(settings.pileView))settings.pileView=VK.includes(settings.lastView)?settings.lastView:"list";
    if(!VK.includes(settings.indexView))settings.indexView="list";
    /* v2.49 : l'ordre de l'index. Même discipline — la liste est écrite en clair,
       ce bloc tourne avant IDX_SORT_KEYS. Une installation d'avant la v2.49 n'a
       pas la clé : elle prend le défaut, il n'y a rien à migrer. */
    const IS=["size","az","za"];
    if(!IS.includes(settings.indexSort))settings.indexSort="az";
    delete settings.lastView;delete settings.density;
  }catch(e){}
  applyTheme();applyAnim();
}
function saveSettings(){try{localStorage.setItem(KEY_SETTINGS,JSON.stringify(settings));}catch(e){}}
function toggleTheme(){settings.theme=effTheme()==="dark"?"light":"dark";applyTheme();saveSettings();}
loadSettings();
if(window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").addEventListener){
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{if(settings.theme==="auto")applyTheme();});
}

/* ---------- storage ---------- */
async function loadState(){
  try{const r=await window.storage.get(KEY_ITEMS); items=r&&r.value?JSON.parse(r.value):[];}
  catch(e){items=[];}
  items=items.map(normalizeItem);
  try{const r=await window.storage.get(KEY_BATCH); if(r&&r.value)batch=JSON.parse(r.value);}
  catch(e){}
}
async function saveItems(){try{await window.storage.set(KEY_ITEMS,JSON.stringify(items));}catch(e){console.error(e);}}
async function saveBatch(){try{await window.storage.set(KEY_BATCH,JSON.stringify(batch));}catch(e){}}

/* ---------- helpers ---------- */
const todayStr=()=>new Date().toISOString().slice(0,10);
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const isUrl=s=>/^https?:\/\//i.test(s.trim());
function labelFor(it){
  if(it.url){try{const u=new URL(it.url);return u.hostname.replace(/^www\./,"")+(u.pathname.length>1?u.pathname:"");}catch(e){return it.url;}}
  return it.content;
}
function ago(ts){
  const d=Math.floor((Date.now()-ts)/86400000);
  if(d<=0)return"aujourd’hui";
  if(d===1)return"hier";
  if(d<7)return"il y a "+d+" j";
  if(d<30)return"il y a "+Math.floor(d/7)+" sem";
  return"il y a "+Math.floor(d/30)+" mois";
}
function domains(){return[...new Set(items.filter(i=>i.status!=="trashed"&&i.domain).map(i=>i.domain))];}
function allCats(){const s=new Set(domains());(settings.cats||[]).forEach(c=>{if(c)s.add(c);});return[...s].sort((a,b)=>a.localeCompare(b,"fr"));}
function hostOf(u){try{return new URL(u).hostname.replace(/^www\./,"").toLowerCase();}catch(e){return"";}}
/* ---------- tags ----------
   Un tag est stocke en minuscules, sans #, espaces compactes, 24 caracteres max.
   tagKey() plie les accents : « À lire » et « a lire » ne font qu'un seul tag,
   sans qu'on ait jamais a le dire a l'utilisateur. */
function normTag(s){return String(s||"").trim().replace(/^#+/,"").replace(/\s+/g," ").toLowerCase().slice(0,24);}
function tagKey(s){return normTag(s).normalize("NFD").replace(/[\u0300-\u036f]/g,"");}
/* bibliotheque de tags : derivee des grains, triee par frequence. Aucun reglage. */
function tagLib(){
  const c={};items.forEach(i=>{if(i.status!=="trashed")(i.tags||[]).forEach(t=>{c[t]=(c[t]||0)+1;});});
  return Object.keys(c).sort((a,b)=>c[b]-c[a]||a.localeCompare(b,"fr"));
}
/* Bibliothèque des sources, dérivée comme celle des tags : rien à régler,
   rien à stocker. La donnée existait déjà, elle n'était pas exploitée. */
function srcLib(){
  const c={};items.forEach(i=>{if(i.status!=="trashed"){const s=sourceOf(i);if(s)c[s]=(c[s]||0)+1;}});
  return Object.keys(c).sort((a,b)=>c[b]-c[a]||a.localeCompare(b,"fr"));
}
function srcCount(s){return items.filter(i=>i.status!=="trashed"&&sourceOf(i)===s).length;}
function enterSource(src){
  pileLoc="all";typeFilter="all";tagFilter="";pileQuery="";sourceFilter=src;dormantFocus=false;
  
  const s=document.getElementById("searchInput");if(s)s.value="";
  selectTab("pile");
}
function hasTag(it,t){return (it.tags||[]).some(x=>tagKey(x)===tagKey(t));}
function fmtDay(ts){try{return new Date(ts).toLocaleDateString("fr-FR",{day:"numeric",month:"long",year:"numeric"});}catch(e){return"";}}
function toDateInput(ts){const d=new Date(ts);return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");}
/* badges de liste : les tags et la date de remontee, s'il y en a */
function tagMinis(it){return (it.tags||[]).map(t=>`<span class="mini tag">#${esc(t)}</span>`).join("");}
function whenMini(it){return (it.surfaceAfter&&surfaceOn())?`<span class="mini when">pas avant le ${esc(fmtDay(it.surfaceAfter))}</span>`:"";}
/* État de la pile — buckets disjoints par âge, tout calculé à la volée (aucun
   historique stocké). « Jamais remontés » = jamais vus ET capturés depuis moins
   de 6 mois (Surface va y venir). « Dormants » = 6 mois et plus sans jamais
   resurgir. Disjoints par l'âge : un même grain ne compte jamais deux fois. */
const SIX_MO=182*86400000;
/* Échelle du tirage (chantier 21) : maturation 30 j (sorti de « Ce mois » de
   l'historique, donc plus sous les yeux) · plancher de re-remontée 60 j · dormant
   180 j (SIX_MO, déjà utilisé). Aucun champ nouveau, tout calculé à la volée. */
const MATURE_MS=30*DAY_MS;
const RESURFACE_MS=60*DAY_MS;
function neverSurfacedYoung(i){return i.status==="active"&&i.surfaceCount===0&&(Date.now()-i.createdAt)<SIX_MO;}
function isDormant(i){return i.status==="active"&&(Date.now()-i.createdAt)>=SIX_MO&&(!i.lastSurfaced||(Date.now()-i.lastSurfaced)>=SIX_MO);}
function sourceOf(it){
  if(it.type==="youtube")return "YouTube";
  if(it.type!=="link"||!it.url)return null;
  const h=hostOf(it.url);if(!h)return null;
  const map=[["instagram.","Instagram"],["t.me","Telegram"],["telegram.","Telegram"],["x.com","X"],["twitter.","X"],["reddit.","Reddit"],["pinterest.","Pinterest"],["tiktok.","TikTok"],["facebook.","Facebook"],["fb.watch","Facebook"],["linkedin.","LinkedIn"],["vimeo.","Vimeo"],["youtube.","YouTube"],["youtu.be","YouTube"],["threads.","Threads"],["bsky.","Bluesky"],["medium.com","Blog"],["substack.com","Blog"],["wordpress.","Blog"],["blogspot.","Blog"],["ghost.io","Blog"]];
  for(const[frag,label]of map){if(h.includes(frag))return label;}
  return "Site web";
}
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

/* ---------- media helpers ---------- */
const mediaCache={};
function ytId(u){if(!u)return null;const m=String(u).match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);return m?m[1]:null;}
function mediaExt(u){const m=String(u).split(/[?#]/)[0].toLowerCase().match(/\.(jpg|jpeg|png|gif|webp|avif|svg|mp3|wav|ogg|m4a|aac|flac|mp4|webm|mov|m4v)$/);if(!m)return null;const e=m[1];if(["jpg","jpeg","png","gif","webp","avif","svg"].includes(e))return"image";if(["mp3","wav","ogg","m4a","aac","flac"].includes(e))return"audio";return"video";}
function detectType(v){if(!isUrl(v))return{type:"note",url:null};const url=v.trim();if(ytId(url))return{type:"youtube",url};return{type:mediaExt(url)||"link",url};}
/* Dédoublonnage (chantier 24) : deux URLs se valent si elles ne diffèrent que par
   le protocole, un www., la casse, un fragment #, ou un slash final. */
function urlKey(u){if(!u)return"";return String(u).trim().toLowerCase().replace(/^https?:\/\//,"").replace(/^www\./,"").replace(/#.*$/,"").replace(/\/+$/,"");}
function findDup(url){if(!url)return null;const k=urlKey(url);return items.find(i=>i.status!=="trashed"&&i.url&&urlKey(i.url)===k)||null;}
function normalizeItem(it){if(!Array.isArray(it.tags))it.tags=[];it.tags=it.tags.map(normTag).filter(Boolean);if(it.surfaceAfter===undefined)it.surfaceAfter=null;if(!it.type)it.type=it.url?detectType(it.url).type:"note";if(it.hasMedia===undefined)it.hasMedia=false;if(it.title===undefined)it.title=null;if(it.title)it.title=decodeEnt(it.title);if(it.preview===undefined)it.preview=null;if(it.note===undefined)it.note="";if(!Array.isArray(it.previews))it.previews=[];if(it.iconTint===undefined)it.iconTint="ocre";if(it.preview&&isIcon(it.preview))it.preview=iconBase(it.preview);it.previews=it.previews.map(u=>u&&isIcon(u)?iconBase(u):u);return it;}
function slotIntoBatch(it){if(batch.date===todayStr()&&!batch.ids.includes(it.id)){batch.ids.splice(batch.idx,0,it.id);saveBatch();}}
async function getMedia(id){if(id in mediaCache)return mediaCache[id];try{const r=await window.storage.get(KEY_MEDIA+id);mediaCache[id]=r&&r.value?r.value:null;}catch(e){mediaCache[id]=null;}return mediaCache[id];}
async function setMedia(id,data){try{const ok=await window.storage.set(KEY_MEDIA+id,data);mediaCache[id]=data;return !!ok;}catch(e){console.error(e);return false;}}
function fileToDataUrl(file){return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=()=>rej(new Error("read"));r.readAsDataURL(file);});}
function fileToImage(file,maxDim,q){return new Promise((res,rej)=>{const url=URL.createObjectURL(file);const img=new Image();img.onload=()=>{let w=img.naturalWidth,h=img.naturalHeight;const s=Math.min(1,maxDim/Math.max(w,h));w=Math.round(w*s);h=Math.round(h*s);const c=document.createElement("canvas");c.width=w;c.height=h;c.getContext("2d").drawImage(img,0,0,w,h);URL.revokeObjectURL(url);try{res(c.toDataURL("image/jpeg",q));}catch(e){rej(e);}};img.onerror=()=>{URL.revokeObjectURL(url);rej(new Error("img"));};img.src=url;});}

/* ---------- resurfacing algorithm: variety across domains + unclassified ---------- */
/* Porte du tirage (chantier 21) — quatre règles, aucun champ nouveau :
   1. Les échus d'abord : une date explicite (surfaceAfter <= maintenant) passe
      devant tout, sourdine comprise.
   2. Maturation 30 j : un item n'est éligible qu'après createdAt + 30 j. Tant
      qu'il est dans « Ce mois » de l'historique, il est encore sous les yeux.
   3. Rotation par âge de capture : parmi les mûrs jamais remontés, du plus ancien
      au plus récent — le rituel remonte le temps.
   4. Plancher de re-remontée 60 j : on ne repioche un item déjà vu qu'après 60 j.
      Si les candidats manquent, c'est la taille du tirage qui cède, jamais le
      plancher (revoir les mêmes têtes tue le rituel).
   Exclus : corbeille · mis de côté · sourdine · surfaceAfter future · non mûrs ·
   remontés depuis moins de 60 j. */
function buildBatch(){
  const now=Date.now();
  const active=items.filter(i=>i.status==="active");
  // 1. Les échus d'abord.
  const out=active.filter(i=>i.surfaceAfter&&i.surfaceAfter<=now)
                  .sort((a,b)=>a.surfaceAfter-b.surfaceAfter)
                  .slice(0,BATCH_SIZE());
  // Vivier commun : mûrs, sans date future, hors sourdine.
  const mature=active.filter(i=>!i.surfaceAfter&&!isMuted(i)&&(now-i.createdAt)>=MATURE_MS);
  // Primaire : jamais remontés. Secours : re-remontables (>= 60 j), au besoin seulement.
  const fresh=mature.filter(i=>i.surfaceCount===0);
  const again=mature.filter(i=>i.surfaceCount>0&&(now-(i.lastSurfaced||0))>=RESURFACE_MS);
  fillPool(out,fresh);
  if(out.length<BATCH_SIZE())fillPool(out,again);
  batch={date:todayStr(),ids:out.map(i=>i.id),idx:0};
  saveBatch();
}
/* Remplit `out` depuis un vivier en gardant la variété — une catégorie, puis une
   source, avant de se répéter — et en remontant le temps : plus ancienne capture
   d'abord dans chaque catégorie. Pas de hasard dans l'ordre : la rotation par âge
   est le sens même du chantier 21 ; seule la catégorie de tête est tirée au sort. */
function fillPool(out,pool){
  if(out.length>=BATCH_SIZE()||!pool.length)return;
  const groups={};
  for(const it of pool){(groups[it.domain||"__none__"]??=[]).push(it);}
  for(const k in groups)groups[k].sort((a,b)=>(a.createdAt||0)-(b.createdAt||0)); // plus ancien d'abord
  const keys=shuffle(Object.keys(groups));
  const srcs=new Set(out.map(i=>sourceOf(i)||"__none__"));
  const held=[];
  for(const k of keys){
    if(out.length>=BATCH_SIZE())break;
    if(!groups[k].length)continue;
    const it=groups[k].shift();
    const sk=sourceOf(it)||"__none__";
    if(srcs.has(sk)){held.push(it);continue;}
    out.push(it);srcs.add(sk);
  }
  // La variété de source cède avant la variété de catégorie.
  for(const it of held){if(out.length>=BATCH_SIZE())break;out.push(it);}
  // Dernier recours : repasser sur des catégories déjà servies.
  let progress=true;
  while(progress&&out.length<BATCH_SIZE()){
    progress=false;
    for(const k of keys){
      if(out.length>=BATCH_SIZE())break;
      if(groups[k].length){out.push(groups[k].shift());progress=true;}
    }
  }
}
function ensureBatch(){
  if(!surfaceOn())return;
  const active=items.filter(i=>i.status==="active");
  const eligibles=active.filter(i=>isMuted(i)?false:(!i.surfaceAfter||i.surfaceAfter<=Date.now()));
  if(batch.date===todayStr()){if(batch.ids.length===0&&eligibles.length>0)buildBatch();return;}
  if(surfaceDue())buildBatch();
}
function currentCardId(){
  if(batch.date!==todayStr())return null;   // hors jour de tirage, rien ne remonte
  while(batch.idx<batch.ids.length){
    const it=items.find(i=>i.id===batch.ids[batch.idx]);
    if(it&&it.status==="active")return it.id;
    batch.idx++;
  }
  return null;
}

/* ---------- actions ---------- */
async function addItem(raw,meta){
  const v=raw.trim();if(!v)return;
  const d=detectType(v);
  /* Déjà en pile : pas de second item, un chemin vers l'existant. La vérif est un
     balayage synchrone — elle ne retarde pas la capture optimiste des cas neufs. */
  if(d.url){const dup=findDup(d.url);if(dup){toast("Déjà en pile.",{label:"voir",fn:()=>openGrainSheet(dup.id)});return dup.id;}}
  let title=null;
  if(meta&&meta.title){const t=String(meta.title).trim();if(t&&t!==v)title=t;}
  const it=normalizeItem({id:uid(),type:d.type,mime:"",hasMedia:false,content:v,url:d.url,domain:null,title,preview:null,
    createdAt:Date.now(),lastSurfaced:null,surfaceCount:0,status:"active"});
  /* Capture optimiste (chantier 11) : le grain est à l'écran tout de suite,
     la synchro suit. « Zéro friction » ne survit pas à un spinner. */
  items.unshift(it);slotIntoBatch(it);
  renderAll();savedFeedback();
  saveItems().catch(()=>toast("Ajouté ici, pas encore synchronisé — ça repartira à la reconnexion."));
  toast(d.type==="youtube"?"Item YouTube ajouté.":"Item ajouté.",{label:"annoter",fn:()=>openGrainSheet(it.id)});
  if(it.url)enrich(it.id);
  return it.id;
}
async function addImageFile(file){
  toast("Compression de l’image…");
  try{
    let data=await fileToImage(file,1600,.85);
    if(data.length>MEDIA_MAX)data=await fileToImage(file,1100,.7);
    if(data.length>MEDIA_MAX){toast("Image trop lourde pour être gardée.");return;}
    const id=uid();
    const it={id,type:"image",mime:"image/jpeg",hasMedia:true,content:file.name||"Photo",url:null,domain:null,note:"",
      createdAt:Date.now(),lastSurfaced:null,surfaceCount:0,status:"active"};
    if(!await setMedia(id,data)){toast("Stockage plein.");return;}
    items.unshift(it);slotIntoBatch(it);await saveItems();renderAll();toast("Photo gardée.",{label:"annoter",fn:()=>openGrainSheet(id)});
    return id;
  }catch(e){toast("Impossible de lire l’image.");}
}
async function addMediaFile(file,type){
  const lbl=type==="video"?"Vidéo":"Audio";
  toast("Lecture du fichier…");
  try{
    const data=await fileToDataUrl(file);
    if(data.length>MEDIA_MAX){toast(lbl+" trop lourd (~5 Mo max). Pour du lourd, colle plutôt un lien.");return;}
    const id=uid();
    const it={id,type,mime:file.type||"",hasMedia:true,content:file.name||type,url:null,domain:null,note:"",
      createdAt:Date.now(),lastSurfaced:null,surfaceCount:0,status:"active"};
    if(!await setMedia(id,data)){toast("Stockage plein.");return;}
    items.unshift(it);slotIntoBatch(it);await saveItems();renderAll();toast(lbl+" gardé.",{label:"annoter",fn:()=>openGrainSheet(id)});
    return id;
  }catch(e){toast("Fichier illisible.");}
}
function routeFile(f){
  if(!f)return;
  if(f.type.startsWith("image/"))addImageFile(f);
  else if(f.type.startsWith("audio/"))addMediaFile(f,"audio");
  else if(f.type.startsWith("video/"))addMediaFile(f,"video");
  else toast("Type de fichier non pris en charge.");
}

/* ---------- export / import ---------- */
async function exportData(){
  toast("Préparation de l’export…");
  const out={app:"sable",version:1,exportedAt:new Date().toISOString(),items,media:{}};
  for(const it of items){if(it.hasMedia){const d=await getMedia(it.id);if(d)out.media[it.id]=d;}}
  try{
    const blob=new Blob([JSON.stringify(out)],{type:"application/json"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");a.href=url;a.download="sable-"+new Date().toISOString().slice(0,10)+".json";
    document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),3000);
    toast("Export téléchargé ("+items.length+" items).");
  }catch(e){toast("Export impossible ici.");}
}
async function importData(file){
  try{
    const data=JSON.parse(await file.text());
    if(!data||!Array.isArray(data.items)){toast("Fichier d’import invalide.");return;}
    const have=new Set(items.map(i=>i.id));let added=0;
    if(data.media){for(const id in data.media){await setMedia(id,data.media[id]);}}
    for(const raw of data.items){if(!have.has(raw.id)){items.push(normalizeItem(raw));have.add(raw.id);added++;}}
    items.sort((a,b)=>(b.createdAt||0)-(a.createdAt||0));
    await saveItems();renderAll();
    toast(added+" item"+(added>1?"s":"")+" importé"+(added>1?"s":"")+".");
  }catch(e){toast("Import impossible (fichier illisible).");}
}
async function markSurfaced(id){
  const it=items.find(i=>i.id===id);if(it){it.lastSurfaced=Date.now();it.surfaceCount++;}
}
async function keepCard(id){await markSurfaced(id);advance();await saveItems();renderStage();renderBadges();haptic(14);toast("Gardé en pile.");}
async function archiveCard(id){const it=items.find(i=>i.id===id);if(it)it.status="archived";advance();await saveItems();renderAll();toast("Mis de côté.");}
async function trashCard(id){const it=items.find(i=>i.id===id);if(it){it.status="trashed";lastTrashed=id;}advance();await saveItems();renderAll();toast("Jeté.",true);}
async function classifyCard(id,dom){const it=items.find(i=>i.id===id);if(it){it.domain=dom;await markSurfaced(id);}advance();await saveItems();renderAll();toast("Classé dans “"+dom+"”.");}
/* Avancer, c'est avancer la séquence en cours : le tirage du jour, ou la carte
   à la demande. La porte de secours ne touche donc jamais `batch`. */
function advance(){if(adhocOn()){riseIdx++;return;}batch.idx++;saveBatch();}

async function undoTrash(){if(!lastTrashed)return;const it=items.find(i=>i.id===lastTrashed);if(it)it.status="active";lastTrashed=null;await saveItems();renderAll();}
async function deleteRow(id){const it=items.find(i=>i.id===id);if(it){it.status="trashed";lastTrashed=id;}await saveItems();renderAll();toast("Jeté.",true);}
async function restoreRow(id){const it=items.find(i=>i.id===id);if(it)it.status="active";await saveItems();renderAll();toast("Remis en pile.");}
async function purgeRow(id){
  if(!confirm("Supprimer définitivement cet item ? C'est irréversible."))return;
  const it=items.find(i=>i.id===id);
  if(it&&it.hasMedia){try{await setMedia(id,null);}catch(e){}}
  items=items.filter(i=>i.id!==id);
  await saveItems();renderAll();toast("Supprimé définitivement.");
}
async function emptyTrash(){
  const trashed=items.filter(i=>i.status==="trashed");
  if(!trashed.length){toast("La corbeille est déjà vide.");return;}
  if(!confirm("Vider la corbeille ? "+trashed.length+" item(s) supprimés définitivement."))return;
  for(const it of trashed){if(it.hasMedia){try{await setMedia(it.id,null);}catch(e){}}}
  items=items.filter(i=>i.status!=="trashed");
  await saveItems();renderAll();toast("Corbeille vidée.");
}

/* ---------- rendering ---------- */
function esc(s){return s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
function decodeEnt(s){
  if(!s||s.indexOf("&")<0)return s;
  return s.replace(/&#x([0-9a-f]+);/gi,(m,h)=>{try{return String.fromCodePoint(parseInt(h,16));}catch(e){return m;}})
          .replace(/&#(\d+);/g,(m,d)=>{try{return String.fromCodePoint(parseInt(d,10));}catch(e){return m;}})
          .replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&apos;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&nbsp;/g," ");
}
function isIcon(u){return !!u&&u.indexOf("api.iconify.design")>-1;}
/* --- couvertures-icônes : teinte résolue selon le thème (clair/sombre) --- */
const ICON_TINTS={ocre:["#AE7127","#D8A25A"],rouille:["#B04A2F","#E08363"],sauge:["#5B7A4F","#8CB07A"],petrole:["#2E7D74","#5FB3A8"],indigo:["#4E5B9E","#8E97D6"],prune:["#8A4A73","#C285AB"]};
const ICON_TINT_ORDER=["ocre","rouille","sauge","petrole","indigo","prune"];
const ICON_TINT_LABEL={ocre:"Ocre",rouille:"Rouille",sauge:"Sauge",petrole:"Bleu-vert",indigo:"Indigo",prune:"Prune"};
const ICON_SUGGEST=["lucide:lightbulb","lucide:pencil","lucide:book-open","lucide:message-square","lucide:sticky-note","lucide:film","lucide:music","lucide:camera","lucide:image","lucide:headphones","lucide:link","lucide:shopping-bag","lucide:tag","lucide:globe","lucide:bookmark","lucide:map-pin","lucide:plane","lucide:mountain","lucide:star","lucide:heart","lucide:flame","lucide:coffee","lucide:calendar","lucide:sparkles"];
function tintHex(key){const t=ICON_TINTS[key]||ICON_TINTS.ocre;return effTheme()==="dark"?t[1]:t[0];}
function iconBase(u){if(!u)return u;let s=u.split("#")[0].replace(/([?&])color=[^&]*/gi,"$1").replace(/\?&/,"?").replace(/&&/g,"&").replace(/[?&]$/,"");if(!/[?&]height=/.test(s))s+=(s.indexOf("?")>-1?"&":"?")+"height=240";return s;}
function iconUrl(base,tintKey){return iconBase(base)+"&color="+encodeURIComponent(tintHex(tintKey||"ocre"));}
function coverSrc(it){const u=it&&it.preview;if(!u)return u;return isIcon(u)?iconUrl(u,it.iconTint):u;}
function coverSrcU(u,tint){return u?(isIcon(u)?iconUrl(u,tint):u):"";}
function pushIconRecent(base){if(!base)return;const b=iconBase(base);const r=(settings.iconRecents||[]).filter(x=>iconBase(x)!==b);r.unshift(b);settings.iconRecents=r.slice(0,8);saveSettings();}
function contentHTML(it,big){
  if(it.url){const lbl=esc(labelFor(it));return `<a class="link" href="${esc(it.url)}" target="_blank" rel="noopener">${lbl}</a>`;}
  return esc(it.content);
}

const TYPE_LABEL={note:"note",link:"lien",youtube:"youtube",image:"photo",audio:"audio",video:"vidéo"};
function typeLabel(it){return TYPE_LABEL[it.type]||"note";}
function isMediaType(t){return t==="image"||t==="audio"||t==="video";}
const ICON_AUDIO=icon('audio');
const ICON_VIDEO=icon('video');
function mediaBlockBig(it){
  if(it.type==="youtube"){const yid=ytId(it.url);return yid?`<div class="media"><iframe src="https://www.youtube-nocookie.com/embed/${yid}" loading="lazy" allow="accelerometer;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe></div>`:"";}
  if(it.type==="link"&&it.preview)return `<div class="media"><img class="zoomable${isIcon(it.preview)?' iconcov':''}" data-full="${esc(coverSrc(it))}" src="${esc(coverSrc(it))}" alt="" loading="lazy"></div>`;
  /* Dette de la v2.35 soldée (chantier 22) : `srcTile` traitait la vignette de
     liste et la couverture de grille, pas la grande carte — un lien sans image
     y montrait donc du vide, à l'endroit le plus visible de l'app. */
  if(it.type==="link")return `<div class="media">${srcTile(it,"bigtile srctile",true)}</div>`;
  if(it.type==="image")return it.hasMedia?`<div class="media"><div class="ph" data-media="${it.id}" data-kind="image" data-big="1">chargement…</div></div>`:`<div class="media"><img class="zoomable" data-full="${esc(it.url)}" src="${esc(it.url)}" alt="" loading="lazy"></div>`;
  if(it.type==="video")return it.hasMedia?`<div class="media"><div class="ph" data-media="${it.id}" data-kind="video" data-big="1">chargement…</div></div>`:`<div class="media"><video controls playsinline src="${esc(it.url)}"></video></div>`;
  if(it.type==="audio")return it.hasMedia?`<div class="media audioblock"><div class="ph" data-media="${it.id}" data-kind="audio">chargement…</div></div>`:`<div class="media audioblock"><audio controls src="${esc(it.url)}"></audio></div>`;
  return "";
}
function contentBlock(it){
  if(it.type==="youtube"||it.type==="link")return `<div class="content islink"><a class="link" href="${esc(it.url)}" target="_blank" rel="noopener">${esc(displayText(it))}</a></div>`;
  if(isMediaType(it.type))return `<div class="filename">${esc(it.hasMedia?it.content:labelFor(it))}</div>`;
  return `<div class="content">${esc(it.content)}</div>`;
}
/* #3 — tuile de source dérivée. Quand un lien n'a pas d'image, on n'affiche pas
   du vide, ni une image cassée, ni un spinner : un monogramme sur une teinte
   stable de la source, dans l'esprit de l'icône dérivée d'une catégorie
   (chantier 12). Aucun réseau, jamais d'échec. YouTube garde sa vraie vignette,
   dérivée de l'URL sans fetch. */
function srcTile(it,box,withName){
  /* Correctif v2.39 : `sourceOf()` rend null si l'URL est illisible (host vide).
     Avec le nom affiché, `esc(null)` levait une exception — latent depuis la
     v2.35 en grille, et la grande carte en aurait fait un plantage visible. Un
     repli n'a pas le droit d'échouer, c'est toute sa raison d'être. */
  const s=sourceOf(it)||"Lien";
  return `<div class="${box}" style="--sth:${catHue(s)}"><span class="stmono">${esc(catInitial(s))}</span>${withName?`<span class="stname">${esc(s)}</span>`:""}</div>`;}
function rowThumb(it){
  if(it.preview)return `<img class="thumb${isIcon(it.preview)?' iconcov':''}" src="${esc(coverSrc(it))}" alt="" loading="lazy">`;
  if(it.type==="image")return it.hasMedia?`<div class="thumb-ic" data-media="${it.id}" data-kind="image" data-thumb="1">•</div>`:`<img class="thumb" src="${esc(it.url)}" alt="" loading="lazy">`;
  if(it.type==="youtube"){const yid=ytId(it.url);return yid?`<img class="thumb" src="https://img.youtube.com/vi/${yid}/default.jpg" alt="" loading="lazy">`:"";}
  if(it.type==="link")return srcTile(it,"thumb-ic srctile",false);
  if(it.type==="video")return `<div class="thumb-ic">${ICON_VIDEO}</div>`;
  if(it.type==="audio")return `<div class="thumb-ic">${ICON_AUDIO}</div>`;
  return "";
}
async function hydrateMedia(root){
  const nodes=Array.from(root.querySelectorAll("[data-media]"));
  for(const n of nodes){
    const id=n.getAttribute("data-media"),kind=n.getAttribute("data-kind");
    const data=await getMedia(id);
    if(!data){n.textContent="média indisponible";continue;}
    if(kind==="image"){const t=n.getAttribute("data-thumb")==="1";n.outerHTML=t?`<img class="thumb" src="${data}" alt="">`:`<img class="zoomable" data-full="${data}" src="${data}" alt="">`;}
    else if(kind==="audio")n.outerHTML=`<audio controls src="${data}"></audio>`;
    else if(kind==="video")n.outerHTML=`<video controls playsinline src="${data}"></video>`;
  }
}

/* ---------- chantier 22 : la remontée invoquée ----------
   La surface plein écran lit UNE séquence, qu'elle vienne du tirage du jour
   (`batch`, persisté) ou de la porte de secours (`riseAdHoc`, en mémoire).
   La carte, les quatre boutons et la progression ne connaissent pas la
   différence : deux sources, un seul écran. */
const adhocOn=()=>riseIdx<riseAdHoc.length;
function riseCurrentId(){
  while(adhocOn()){
    const it=items.find(i=>i.id===riseAdHoc[riseIdx]);
    if(it&&it.status==="active")return it.id;
    riseIdx++;
  }
  return currentCardId();
}
/* Ce qui reste à voir, et le total : on ne compte que ce qui existe encore —
   un item jeté en cours de rituel n'est pas une étape. C'est `riseLeft()` qui
   fait disparaître l'invitation à la fin du rituel. */
function riseLeft(){
  if(batch.date!==todayStr())return 0;
  let n=0;
  for(let i=batch.idx;i<batch.ids.length;i++){const it=items.find(x=>x.id===batch.ids[i]);if(it&&it.status==="active")n++;}
  return n;
}
function riseTotal(){
  if(batch.date!==todayStr())return 0;
  let n=0;
  for(const id of batch.ids){const it=items.find(x=>x.id===id);if(it&&it.status==="active")n++;}
  return n;
}
function riseOpen(){const el=document.getElementById("rise");return !!el&&!el.hidden;}
function openRemontee(){
  pushLayer("surface",()=>closeRemontee());
  const el=document.getElementById("rise");if(!el)return;
  el.hidden=false;el.scrollTop=0;
  renderStage();
}
function closeRemontee(){
  popLayer("surface");
  const el=document.getElementById("rise");if(!el)return;
  el.hidden=true;
  /* La porte de secours ne laisse rien derrière elle : sa carte n'a jamais été
     écrite nulle part, la refermer suffit à l'oublier. */
  riseAdHoc=[];riseIdx=0;
  renderBadges();
}
/* L'invitation n'est pas un bandeau : rectangle teinté + rond coloré + deux
   lignes + chevron est le gabarit exact d'une alerte système. Une ligne, un
   chiffre, un chemin — et elle n'existe que s'il y a un tirage. */
/* v2.45 — l'invitation devient une PASTILLE. Le raisonnement du chantier 22
   tenait (« une ligne, un chiffre, un chemin ») mais il payait 48 px à chaque
   ouverture pour un fait qui tient dans un point. Un point ne réclame rien : il
   signale, et c'est la seule forme d'alerte que ce produit s'autorise puisque
   rien ne s'y consomme. Le détail vit dans le réveil, une fois par jour. */
function riseDue(){return surfaceOn()?riseLeft():0;}
function unfiledDue(){return items.filter(i=>i.status==="active"&&!i.domain).length;}
function paintBadge(id,n){
  const b=document.getElementById(id);if(!b)return;
  const d=b.querySelector(".bdg");if(d)d.hidden=!n;
  b.classList.toggle("on",!!n);
}
function renderBadges(){
  paintBadge("riseBtn",riseDue());
  paintBadge("unfiledBtn",unfiledDue());
  const f=document.getElementById("filterBtn");
  if(f)f.classList.toggle("on",anyFilterActive());
}
/* Les deux pastilles n'existent que sur Collection, le filtre que sur Ma pile :
   même emplacement, jamais les deux à la fois. Un en-tête qui garde des boutons
   inertes ment sur ce qu'on peut y faire. */
function paintHeaderBtns(){
  const on=(id,v)=>{const b=document.getElementById(id);if(b)b.hidden=!v;};
  const cat=(curTab==="categories");
  on("riseBtn",cat);on("unfiledBtn",cat);on("filterBtn",!cat);
  renderBadges();
  /* v2.46 — l'en-tête change de contenu selon l'onglet depuis la v2.45 : une
     `--tbh` en retard décale le palier collant, qui se pose trop bas et laisse
     une bande vide sous l'en-tête. On republie ici, puis une fois de plus à la
     frame suivante : mesurer un élément qu'on vient de modifier n'est fiable
     qu'après la mise en page. */
}
/* ---- le réveil : une fois par jour, au premier passage, et jamais deux ----
   Le cap a déjà tué un bandeau pour intrusion (v2.36). Celui-ci s'en distingue
   sur trois points : il ne bloque rien, il ne revient pas dans la journée, et
   il ne parle que de choses qui attendent vraiment. S'il n'y a rien, il n'existe
   pas — c'est ce qui l'empêche de devenir une corvée quotidienne. */
function wakeItems(){
  const out=[];
  const r=riseDue();
  if(r)out.push({k:"rise",ic:"rise",t:`${r} item${r>1?"s":""} remonte${r>1?"nt":""}`,
                 s:"les plus anciens d’abord",go:openRemontee});
  const u=unfiledDue();
  if(u)out.push({k:"unfiled",ic:"note",t:`${u} item${u>1?"s":""} sans catégorie`,
                 s:"à ranger quand tu veux",go:()=>{enterCollection("none");enterSel();}});
  return out;
}
function maybeWake(){
  if(settings.wakeSeen===todayStr())return;
  const list=wakeItems();
  if(!list.length)return;                 /* rien à dire : on ne dit rien */
  settings.wakeSeen=todayStr();saveSettings();
  openWake(list);
}
function openWake(list){
  list=list||wakeItems();
  if(!list.length)return;
  document.getElementById("sheetTitle").textContent="Aujourd’hui";
  const el=document.getElementById("sheetList");
  el.innerHTML=`<div class="wake">`+list.map((w,i)=>
    `<button class="wline" data-w="${i}"><span class="wico">${icon(w.ic)}</span>`+
    `<span class="wtx"><b>${esc(w.t)}</b><small>${esc(w.s)}</small></span>`+
    `<span class="wchev" aria-hidden="true">→</span></button>`).join("")+
    `<button class="wlater" data-later="1">Plus tard</button></div>`;
  el.querySelectorAll("[data-w]").forEach(b=>b.onclick=()=>{
    const w=list[+b.dataset.w];closeSheet();w.go();});
  el.querySelector("[data-later]").onclick=()=>closeSheet();
  showSheet();
}
function renderStage(){
  ensureBatch();
  const stage=document.getElementById("stage");if(!stage)return;
  const prog=document.getElementById("riseProg"),cntEl=document.getElementById("riseN");
  const paint=(pips,label)=>{if(prog)prog.innerHTML=pips;if(cntEl)cntEl.textContent=label;};
  const active=items.filter(i=>i.status==="active");
  if(active.length===0){
    paint("","");
    stage.innerHTML=`<div class="rest"><div class="big">Ta pile est vide</div>
      <div class="sub">Colle ton premier lien, ta première idée ou ta typo là-haut. Elle te reviendra toute seule.</div></div>`;
    return;
  }
  const id=riseCurrentId();
  /* Écran de fin, écrit une fois. Ce n'est plus l'écran de repos de l'ancien
     onglet : on ne peut plus arriver ici sans avoir été appelé, donc il ne
     reste que deux vérités à dire — le rituel est fini, ou la carte à la
     demande est traitée. Le bouton « faire remonter » a déménagé dans « À
     trier » (chantier 26). */
  if(!id){
    paint("","");
    const nx=nextSurfaceLabel();
    const quand=nx?" Prochaine remontée "+esc(nx)+".":"";
    const fini=riseTotal()>0;
    stage.innerHTML=`<div class="rest"><div class="big">${fini?"C’est fait pour aujourd’hui":"Voilà."}</div>
      <div class="sub">${fini?"Tu as passé en revue ta sélection du jour.":"Cet item est reparti dans ta pile."}${quand}</div></div>`;
    return;
  }
  const it=items.find(i=>i.id===id);
  const ad=adhocOn();
  const tot=ad?1:riseTotal(), done=ad?0:(tot-riseLeft());
  paint(Array.from({length:tot},(_,i)=>`<span class="pip ${i<done?"done":i===done?"now":""}"></span>`).join(""),
        tot?(Math.min(done+1,tot)+" / "+tot):"");
  const domBadge=it.domain?`<span class="badge">${esc(it.domain)}</span>`:`<span class="badge none">non classé</span>`;
  const seen=it.surfaceCount>0?`<span class="badge time">déjà remonté ${it.surfaceCount}×</span>`:"";
  stage.innerHTML=`
    <div class="card">
      <button class="card-edit" data-a="edit" aria-label="Voir / modifier cet item" title="Voir / modifier">${icon('pencil')}</button>
      <div class="kicker">${icon('rise','rise')}remonté à la surface</div>
      ${mediaBlockBig(it)}
      ${contentBlock(it)}
      ${it.note?`<div class="grain-note">${esc(it.note)}</div>`:""}
      <div class="meta"><span class="badge type">${typeLabel(it)}</span>${domBadge}${(it.tags||[]).map(t=>`<span class="badge">#${esc(t)}</span>`).join("")}${seen}<span class="badge time">gardé ${ago(it.createdAt)}</span></div>
      <div class="actions">
        <button class="act-keep" data-a="keep">Garder dans ma pile</button>
        <div class="act-more">
          <button class="act-file" data-a="file">Classer</button>
          <button class="act-archive" data-a="archive">Mettre de côté</button>
          <button class="act-trash" data-a="trash">Jeter</button>
        </div>
      </div>
      <div id="classifyMount"></div>
    </div>
    <div class="batch-bar">
      <button class="pull" id="pullExtra">Une de plus</button>
    </div>`;
  const card=stage.querySelector(".card");
  card.querySelector('[data-a="keep"]').onclick=()=>keepCard(id);
  card.querySelector('[data-a="archive"]').onclick=()=>archiveCard(id);
  card.querySelector('[data-a="trash"]').onclick=()=>trashCard(id);
  card.querySelector('[data-a="file"]').onclick=()=>openClassify(id);
  card.querySelector('[data-a="edit"]').onclick=()=>openGrainSheet(id);
  document.getElementById("pullExtra").onclick=pullExtra;
  hydrateMedia(card);
}

function openClassify(id){
  const mount=document.getElementById("classifyMount");
  const doms=allCats();
  const chips=doms.map(d=>`<button class="chip" data-d="${esc(d)}">${esc(d)}</button>`).join("")||"";
  mount.innerHTML=`<div class="classify">
    <p>Range-le dans un domaine — ou tape-en un nouveau.</p>
    ${chips?`<div class="chips">${chips}</div>`:""}
    <div class="newdom"><input id="newDom" placeholder="Nouveau domaine (ex. Cuisine, Dev, À lire)" autocomplete="off"><button id="newDomBtn">OK</button></div>
  </div>`;
  mount.querySelectorAll(".chip").forEach(c=>c.onclick=()=>classifyCard(id,c.dataset.d));
  const inp=mount.querySelector("#newDom");
  const go=()=>{const v=inp.value.trim();if(v)classifyCard(id,v);};
  mount.querySelector("#newDomBtn").onclick=go;
  inp.onkeydown=e=>{if(e.key==="Enter")go();};
  inp.focus();
}

/* Le vivier d'une carte supplémentaire : actif, hors sourdine, pas déjà passé
   aujourd'hui, pas la carte à l'écran. */
function risePool(){
  const cur=riseCurrentId();
  const seen=(batch.date===todayStr())?batch.ids.slice(0,batch.idx):[];
  return items.filter(i=>i.status==="active"&&!isMuted(i)&&i.id!==cur
    &&!seen.includes(i.id)&&!riseAdHoc.includes(i.id));
}
/* « Une de plus », DANS le rituel : le tirage du jour existe forcément, on
   insère la carte à la position courante. La branche qui posait
   `batch={date:todayStr(),…}` a disparu — elle ne pouvait être atteinte que
   depuis l'écran de repos, qui n'existe plus (chantier 22), et c'était elle
   qui faisait compter le jour comme tiré. */
function pullExtra(){
  if(batch.date!==todayStr()||adhocOn()){pullNow();return;}
  const pool=risePool();
  if(pool.length===0){toast("Rien d’autre à faire remonter.");return;}
  const pick=pool[Math.floor(Math.random()*pool.length)];
  batch.ids.splice(batch.idx,0,pick.id);saveBatch();renderStage();renderBadges();
}
/* Porte de secours (chantier 26), appelée depuis « À trier ». Elle n'écrit
   JAMAIS `batch.date` : utiliser la porte ne doit pas coûter le rituel du
   lendemain. La carte vit dans `riseAdHoc`, en mémoire seule, et disparaît en
   refermant la surface. */
function pullNow(){
  const pool=risePool();
  if(!pool.length){toast("Rien à faire remonter.");return;}
  riseAdHoc.push(pool[Math.floor(Math.random()*pool.length)].id);
  openRemontee();
}

/* ---------- Ma pile : accueil (grille de domaines) + collections ---------- */
const TYPE_FILTERS=[["all","Tous"],["note","Notes"],["link","Liens"],["youtube","YouTube"],["media","Photos & médias"]];
/* Cinq tris, deux familles. Les libellés sont courts : ils vivent dans un
   `.seg`, où tronquer est interdit. */
const VIEWS=[["list","Liste","pile"],["grid","Grille","grid"],["compact","Compact","compact"]];
const VIEW_KEYS=VIEWS.map(v=>v[0]);
/* ---------- v2.49 : l'ordre de l'index ----------
   Trois valeurs, pas cinq : la grammaire `.seg` interdit le bord en dents de
   scie, et trois colonnes sont déjà la forme des deux autres groupes de la
   feuille. UN SEUL réglage pour les trois lentilles (leçon v2.43).
   « Taille » garde le mot du compteur qu'il ordonne ; « A → Z » garde les
   flèches des tris de Ma pile, puisque c'est le même geste. */
const IDX_SORTS=[["size","Taille"],["az","A → Z"],["za","Z → A"]];
const IDX_SORT_KEYS=IDX_SORTS.map(s=>s[0]);
/* Le comparateur des trois lentilles. La taille reste décroissante et retombe
   sur l'alphabet à égalité — sans ce repli, deux catégories de 3 items
   changeraient de place au gré de l'ordre d'insertion. */
function idxCmp(a,b,na,nb){
  if(indexSort==="az")return a.localeCompare(b,"fr");
  if(indexSort==="za")return b.localeCompare(a,"fr");
  return (nb-na)||a.localeCompare(b,"fr");
}
const SORTS=[["recent","Récents"],["oldest","Anciens"],["forgotten","Oubliés"],["az","A → Z"],["za","Z → A"]];
const SORT_GROUPS=[["Date",["recent","oldest","forgotten"]],["Titre",["az","za"]]];
function typeMatch(it){if(typeFilter==="all")return true;if(typeFilter==="media")return isMediaType(it.type);return it.type===typeFilter;}
function domCounts(){const c={};for(const i of items){if(i.status==="active"&&i.domain)c[i.domain]=(c[i.domain]||0)+1;}return c;}
/* ---------- chantier 12 : le visage d'une catégorie ----------
   L'icône n'est jamais une question posée : elle est dérivée du libellé
   (initiale + teinte tirée d'un hash), donc stable, jamais vide, et sans
   migration — rien n'est stocké. Un choix explicite la remplace ensuite,
   il ne la précède jamais. La teinte est posée en variable CSS : elle suit
   le thème toute seule, sans re-rendu.
   La couverture, elle, est FIGÉE sur le premier grain de la catégorie.
   Avant, elle suivait la dernière capture — une catégorie n'avait jamais
   deux jours de suite le même visage, exactement ce sur quoi l'œil
   s'appuie pour retrouver sa case. */
/* Hash FNV-1a, puis choix dans une roue de douze teintes franchement séparées.
   Un hash étalé sur 360° continus donnait des voisins à 2° d'écart (Design 182,
   Cuisine 180) : deux catégories de la même couleur, donc pas d'identité du
   tout. Douze crans valent mieux qu'un dégradé qu'on ne sait pas lire. */
const CAT_HUES=[8,32,52,88,140,168,192,212,238,266,292,326];
function catHash(name){
  const k=String(name||"?");let h=2166136261;
  for(let i=0;i<k.length;i++){h^=k.charCodeAt(i);h=Math.imul(h,16777619);}
  return Math.abs(h);
}
function catHue(name){return CAT_HUES[catHash(name)%CAT_HUES.length];}
/* Second axe : douze teintes seules se percutaient trop vite (Design et Cuisine
   tombaient sur la même). Une profondeur claire/soutenue par-dessus donne
   vingt-quatre visages, et deux catégories qui partagent une teinte ne
   partagent plus le même ton. L'initiale fait le reste. */
function catTone(name){return (catHash(name)>>5)%2;}
function catInitial(name){const c=[...String(name||"?").trim()][0]||"?";return c.toUpperCase();}
function catFace(name,size){
  const m=(settings.catIcons||{})[name];
  const inner=(m&&m.base)?`<img src="${esc(iconUrl(m.base,m.tint||'ocre'))}" alt="">`:esc(catInitial(name));
  return `<span class="cface ${size||'s'}" style="--ci-h:${catHue(name)};--ci-t:${catTone(name)}">${inner}</span>`;
}
function catCover(list){
  const byAge=list.slice().sort((a,b)=>(a.createdAt||0)-(b.createdAt||0));
  const cand=byAge.find(i=>i.preview||i.type==="youtube"||i.type==="image");
  return cand?galleryThumb(cand):null;
}
function collectionName(f){return f==="all"?"Toute la pile":f==="none"?"Non classés":f==="archived"?"Mis de côté":f==="trashed"?"Corbeille":f;}
const pinSvg=icon('pin');
/* ---------- chantier 15 : Parcourir, trois index ----------
   Pas d'onglet Tags : un quatrième onglet leur donnerait le poids visuel des
   catégories, alors que le modèle dit l'inverse — et ferait lire « deux
   systèmes de classement », donc une hésitation de plus à chaque capture.
   La piste de la v2.22 reste à trois sections, en prime.
   L'index Tags n'existe que s'il y a des tags ; sans eux le sélecteur passe à
   deux colonnes, Sources restant en dernier dans les deux cas. */
/* Chantier 25 — l'index Sources ne s'affiche que s'il sert. Sur un corpus de
   liens ordinaires, `sourceOf()` renvoie « Site web » pour la quasi-totalité :
   un index dont une entrée pèse 70 % n'apprend rien et coûte une colonne. Le
   seuil se juge sur les données, pas sur une préférence — d'où la règle plutôt
   qu'un réglage. Le FILTRE par source, lui, reste : c'est l'index qui ment,
   pas l'axe. */
function srcIndexUseful(){
  const srcs=srcLib();
  if(!srcs.length)return false;
  const tot=items.filter(i=>i.status!=="trashed"&&sourceOf(i)).length;
  if(tot<8)return true;                       /* trop peu pour conclure quoi que ce soit */
  return Math.max(...srcs.map(srcCount))/tot<=.7;
}
function browseCols(){
  const cols=[["cats","Catégories"]];
  if(tagLib().length)cols.push(["tags","Tags"]);
  if(srcIndexUseful())cols.push(["srcs","Sources"]);
  return cols;
}
/* v2.42 : la bande de sélection d'index (#idxSeg) est supprimée — son réglage
   vit derrière le titre. Ne reste que la GARDE : une lentille qui n'est plus
   disponible (le dernier tag effacé, une source qui passe les 70 %) ne peut pas
   rester posée, sinon l'index affiche un vide que rien ne permet de quitter. */
function guardLens(){
  const cols=browseCols();
  if(!cols.some(([k])=>k===browseIdx))browseIdx="cats";
  return cols;
}
/* Tags et Sources en liste dense, triés par taille, jamais en cartes-
   couvertures : ce ne sont pas des lieux, ce sont des index. Le rangement a un
   visage, les axes transversaux n'en ont pas — une puce de couleur au plus.
   Et aucune affectation de tag depuis ici : sinon catégorie et tag deviennent
   équivalents, et on recrée une décision au moment de la capture. */
/* ---------- v2.43 : l'explorateur est homogène ----------
   Les trois index se voient dans les trois formes. Ce que le chantier 15
   interdisait, c'était de donner un VISAGE aux entrées de la liste dense —
   « une puce de couleur au plus » — et cette règle tient : la liste ne change
   pas. Ce qui s'ajoute, c'est la FORME. Une galerie sans visage n'existe pas,
   donc la carte en dérive un (monogramme ou #, teinte stable par hash), comme
   partout ailleurs dans l'app : le défaut est aussi bon que le réglé.
   `indexView` reste UN réglage partagé par les trois lentilles. Trois réglages
   symétriques auraient été deux bugs qui attendent. */
/* v2.49 : le tri se fait ICI, jamais dans tagLib() ni srcLib(). Ces deux
   bibliothèques nourrissent aussi les suggestions de tag de la fiche et de la
   capture, qui les coupent à 8 : là-bas l'ordre de fréquence EST le bon, et un
   ordre alphabétique aurait rendu huit tags rares. Une fonction dérivée n'hérite
   pas de l'ordre d'affichage de l'écran qui l'appelle. */
function idxEntries(){
  const l=browseIdx==="tags"
    ? tagLib().map(t=>({k:t,kind:"tag",n:tagCount(t)}))
    : srcLib().map(s=>({k:s,kind:"src",n:srcCount(s)}));
  return l.sort((a,b)=>idxCmp(a.k,b.k,a.n,b.n));
}
/* La galerie n'existe pour Tags et Sources que si l'interrupteur de
   comparaison est allumé (Réglages › Général). Elle existe TOUJOURS pour les
   catégories, qui ont une vraie couverture. */
const allForms=()=>settings.idxAllForms!==false;
function galleryAllowed(lens){return lens==="cats"||allForms();}
/* On ne réécrit JAMAIS `indexView` : un état posé par le doigt survit à tout ce
   qui n'est pas sa disparition. Si la galerie n'est pas offerte ici, on
   l'affiche en liste et le réglage attend son retour. */
function effIndexView(){
  return (indexView==="grid"&&!galleryAllowed(browseIdx))?"list":indexView;
}
function idxFace(e,size){
  return `<span class="cface ${size}" style="--ci-h:${catHue(e.k)};--ci-t:${catTone(e.k)}">`+
    (e.kind==="tag"?"#":esc(catInitial(e.k)))+`</span>`;
}
function idxNodeHTML(e,view){
  const key=esc(e.k),lbl=esc(e.kind==="tag"?("#"+e.k):e.k);
  if(view==="grid"){
    /* Même carcasse que la carte de catégorie : aucune seconde grammaire. */
    return `<div class="ccard" data-ix="${key}" data-ik="${e.kind}">`+
      `<button class="cgo" data-igo="${key}">`+
        `<span class="dcover plain" style="--ci-h:${catHue(e.k)};--ci-t:${catTone(e.k)}">${idxFace(e,"l")}</span>`+
        `<span class="dbody"><span class="dname">${lbl}</span><span class="dcount">${e.n}</span></span>`+
      `</button></div>`;
  }
  /* Liste et compact : le markup de la v2.30, inchangé. Le compact se fait en
     CSS (le compteur est masqué, jamais retiré du DOM). */
  const mark=e.kind==="tag"
    ? `<span class="ihash">#</span>`
    : `<span class="idot" style="--ci-h:${catHue(e.k)}"></span>`;
  return `<button class="idxrow" data-ix="${key}" data-ik="${e.kind}" data-igo="${key}">${mark}`+
    `<span class="inm">${esc(e.k)}</span><span class="icnt">${e.n}</span></button>`;
}
function wireIdxNodes(scope){
  scope.querySelectorAll("[data-igo]").forEach(b=>{
    const node=b.closest("[data-ik]")||b;
    b.onclick=()=>{ node.getAttribute("data-ik")==="tag" ? enterTag(b.dataset.igo) : enterSource(b.dataset.igo); };
  });
}
/* Un choix d'affichage ne reconstruit pas la liste : il pose l'attribut et
   redessine les nœuds un par un, dans le conteneur existant (même discipline
   que repaintCatNodes). Le défilement ne bouge pas, rien ne clignote. */
function repaintIdxNodes(){
  const wrap=document.querySelector("#idxList .idxlist");
  if(!wrap||wrap.dataset.built!==browseIdx)return false;
  const view=effIndexView();
  wrap.setAttribute("data-view",view);
  const by={};idxEntries().forEach(e=>{by[e.k]=e;});
  wrap.querySelectorAll("[data-ix]").forEach(node=>{
    const e=by[node.getAttribute("data-ix")];if(!e)return;
    const tmp=document.createElement("div");
    tmp.innerHTML=idxNodeHTML(e,view);
    node.replaceWith(tmp.firstElementChild);
  });
  wireIdxNodes(wrap);
  return true;
}
function renderIdxList(){
  const el=document.getElementById("idxList");if(!el)return;
  if(browseIdx==="cats"){el.hidden=true;el.innerHTML="";return;}
  el.hidden=false;
  const view=effIndexView(),list=idxEntries();
  if(!list.length){
    el.innerHTML=`<div class="empty-list">`+(browseIdx==="tags"
      ? `Aucun tag pour l'instant. Un tag est transversal : il traverse les catégories au lieu de ranger.`
      : `Aucune source pour l'instant. Elle se déduit de l'adresse d'un lien — une note n'en a pas.`)+`</div>`;
    return;
  }
  el.innerHTML=`<div class="idxlist" data-view="${view}" data-built="${esc(browseIdx)}">`+
    list.map(e=>idxNodeHTML(e,view)).join("")+`</div>`;
  wireIdxNodes(el);
}
function tagCount(t){return items.filter(i=>i.status!=="trashed"&&hasTag(i,t)).length;}
/* ---------- v2.42 : le titre EST le menu de vue ----------
   Chantier 18 (l'axe d'affichage) et chantier 15 (le sélecteur d'index)
   avaient chacun leur bande sous l'en-tête. Le problème n'était aucun des deux
   contrôles : c'était leur ADDITION en hauteur. Un contrôle rare ne mérite pas
   le loyer d'un bandeau permanent — les deux passent derrière le titre, qui
   porte un chevron pour le dire.
   La bascule ne reconstruit toujours RIEN : elle pose un attribut sur le
   conteneur (piège v2.20). Seul l'endroit du réglage change. */
const LENS_TITLE={cats:"Catégories",tags:"Tags",srcs:"Sources"};
function navTitleText(){
  return curTab==="pile" ? "Ma pile" : (LENS_TITLE[browseIdx]||"Catégories");
}
function updateNavTitle(){
  const t=document.getElementById("navTitleTxt");
  if(t)t.textContent=navTitleText();
}
/* Le menu ne se ré-empile pas : ouvrir pousse une fois, les taps internes
   redessinent la feuille en place. `viewMenuOn` sert à ça, et à savoir s'il
   faut redessiner quand un choix change l'état sous-jacent. */
let viewMenuOn=false;
function viewSeg(id,cur,opts){
  return `<div class="sortgrp"><span class="sortlbl">${esc(id)}</span>`+
    `<div class="seg" style="--n:${opts.length}" data-vg="${esc(id)}">`+opts.map(([k,l])=>
      `<button data-vv="${k}"${cur===k?' class="on"':''}>${esc(l)}</button>`).join("")+
    `</div></div>`;
}
function drawViewMenu(){
  const list=document.getElementById("sheetList");if(!list)return;
  document.getElementById("sheetTitle").textContent="Vue";
  let h="";
  if(curTab==="pile"){
    /* « Trier » et « Voir en » quittent la barre d'axes pour venir ici : les
       garder aux deux endroits aurait AJOUTÉ de la surface, contre l'esprit du
       chantier. La barre ne garde que « Filtrer », là où vivent ses puces.
       Le groupe « Titre » n'existe que dans une collection ouverte (ch. 20). */
    const groups=inCollection()?SORT_GROUPS:SORT_GROUPS.filter(([g])=>g!=="Titre");
    h+=groups.map(([g,keys])=>viewSeg(g==="Date"?"Trier":g,sortMode,keys.map(k=>[k,SORT_LABEL[k]]))).join("");
    if(pileLoc!=="trashed")h+=viewSeg("Voir en",pileView,VIEWS.map(([k,l])=>[k,l]));
    /* v2.49 — « Sélectionner des items » quitte cette feuille pour le ⋯ de
       l'item. Une feuille qui s'appelle « Vue » ne porte que de l'état
       d'affichage ; une action y était un corps étranger, et le pouce l'a dit.
       La porte visible de l'appui long est maintenant à côté de la ligne qu'on
       vise, pas derrière le titre. */
  } else {
    /* « rien n'apparaît tant que ça ne sert pas », appliqué au switch : une
       seule lentille disponible, et « Grouper par » ne s'affiche pas du tout. */
    const cols=guardLens();
    if(cols.length>1)h+=viewSeg("Grouper par",browseIdx,cols);
    /* v2.49 — grouper, puis ordonner, puis la forme. C'est l'ordre des trois
       questions qu'on se pose devant un index, et c'est déjà celui de Ma pile
       (Trier au-dessus de Voir en). Le groupe existe pour les trois lentilles :
       chercher un nom a un sens sur une catégorie, sur un tag et sur une
       source — c'est le même besoin, il ne mérite pas trois réglages.
       « Rien n'apparaît tant que ça ne sert pas » s'applique ici aussi : sous
       deux entrées, il n'y a pas d'ordre à choisir. */
    const nIdx=(browseIdx==="cats"?catOrder():idxEntries()).length;
    if(nIdx>1)h+=viewSeg("Trier",indexSort,IDX_SORTS.map(([k,l])=>[k,l]));
    /* Les trois formes, sur les trois index (v2.43). « Galerie » se retire des
       lentilles Tag et Source quand l'interrupteur de comparaison est éteint —
       et c'est la seule chose que cet interrupteur change. */
    const forms=VIEWS.filter(([k])=>k!=="grid"||galleryAllowed(browseIdx))
      .map(([k,l])=>[k,k==="grid"?"Galerie":l]);
    h+=viewSeg("Voir en",effIndexView(),forms);
  }
  list.innerHTML=`<div class="sortsheet">${h}</div>`;
  list.querySelectorAll("[data-vg]").forEach(g=>{
    const grp=g.dataset.vg;
    g.querySelectorAll("[data-vv]").forEach(b=>b.onclick=()=>{
      const v=b.dataset.vv;
      if(grp==="Grouper par"){browseIdx=v;renderRoot();}
      else if(grp==="Voir en"){ curTab==="pile" ? setPileView(v) : setIndexView(v); }
      /* « Trier » existe sur les deux onglets et ne règle pas la même chose :
         sur Collection l'ordre de l'index, sur Ma pile celui des items (où le
         groupe « Titre » tombe dans la même branche, comme avant). */
      else if(curTab!=="pile"){ setIndexSort(v); }
      else { sortMode=v; renderPileTab(); }
      drawViewMenu();
    });
  });
}
function openViewMenu(){
  viewMenuOn=true;
  drawViewMenu();
  showSheet();
}
function setPileView(v){
  if(!VIEW_KEYS.includes(v)||v===pileView)return;
  pileView=v;settings.pileView=v;saveSettings();renderPileTab();
}
function setIndexView(v){
  if(!VIEW_KEYS.includes(v)||v===indexView)return;
  indexView=v;settings.indexView=v;saveSettings();
  /* Une carte n'a pas de tiroir : passer en grille referme les dépliages.
     On les oublie franchement plutôt que de les garder en réserve — revenir
     en liste sur trois aperçus qu'on ne se rappelle pas avoir ouverts serait
     un état surprise. */
  if(v==="grid")catOpen.clear();
  const grid=document.getElementById("domGrid");
  if(grid&&grid.dataset.built==="cats"){
    grid.setAttribute("data-view",v);
    if(v==="grid")grid.querySelectorAll(".peek").forEach(p=>{p.hidden=true;});
    /* La grille et la liste n'ont pas la même carcasse : seule la grille porte
       une couverture. Le passage grille ↔ liste redessine donc les nœuds, mais
       en place et sans toucher au conteneur ni au défilement. */
    repaintCatNodes();
    return;
  }
  /* Tags et Sources depuis la v2.43 : même discipline, autre conteneur. */
  if(browseIdx!=="cats"&&repaintIdxNodes())return;
  renderRoot();
}
/* ---------- v2.49 : changer d'ordre déplace, ne reconstruit pas ----------
   `appendChild` sur un nœud déjà dans le document le DÉPLACE. Les aperçus
   ouverts, les médias hydratés et la position de défilement survivent donc,
   exactement comme pour l'épingle depuis la v2.38 (`moveCatNode`).
   Les clés sont toutes vérifiées AVANT le premier déplacement : détacher la
   moitié des nœuds puis renoncer laisserait un index à moitié vide, et un repli
   n'a pas le droit d'échouer. En cas de doute on rend `false`, et l'appelant
   redessine franchement. */
function reorderNodes(wrap,attr,order){
  if(!wrap)return false;
  const by=new Map();
  wrap.querySelectorAll("["+attr+"]").forEach(n=>by.set(n.getAttribute(attr),n));
  if(by.size!==order.length||!order.every(k=>by.has(k)))return false;
  const frag=document.createDocumentFragment();
  order.forEach(k=>frag.appendChild(by.get(k)));
  wrap.appendChild(frag);
  return true;
}
function setIndexSort(v){
  if(!IDX_SORT_KEYS.includes(v)||v===indexSort)return;
  indexSort=v;settings.indexSort=v;saveSettings();
  if(browseIdx==="cats"){
    const grid=document.getElementById("domGrid");
    if(grid&&grid.dataset.built==="cats"&&reorderNodes(grid,"data-cat",catOrder()))return;
  }else{
    const wrap=document.querySelector("#idxList .idxlist");
    if(wrap&&wrap.dataset.built===browseIdx&&reorderNodes(wrap,"data-ix",idxEntries().map(e=>e.k)))return;
  }
  renderRoot();
}
/* ---------- chantier 19 : la ligne de catégorie à trois cibles ----------
   chevron | corps | ⋯ — chacun sa gouttière et son filet. Le filet SEUL
   suffit à les séparer : jugé au pouce sur sable-nav-1, la version retenue est
   celle sans coloration des zones. La délimitation est une affaire de
   structure, pas de teinte, et l'accent brun reste réservé à l'interactif.
   Le chevron déplie un aperçu de 3 items ; le corps entre ; le ⋯ gère. */
function catNodeHTML(name,f,list,pin){
  const n=list.length;
  const open=catOpen.has(name);
  const dots=`<button class="cdots" data-cdots="${esc(name)}" aria-label="Gérer ${esc(name)}">${dotsSvg}</button>`;
  if(indexView==="grid"){
    /* Le visage se fait petit quand il se pose SUR une couverture, grand quand
       il EST la couverture : le contenant ne varie jamais, le remplissage oui. */
    const cov=catCover(list);
    return `<div class="ccard" data-cat="${esc(name)}" data-f="${esc(f)}">`+
      `<button class="cgo" data-cgo="${esc(f)}">`+
        `<span class="dcover${cov?"":" plain"}" style="--ci-h:${catHue(name)};--ci-t:${catTone(name)}">${cov||""}${catFace(name,cov?"s":"l")}</span>`+
        `<span class="dbody"><span class="dname">${esc(name)}</span><span class="dcount">${n}</span></span>`+
      `</button>`+
      (pin?`<span class="dpin">${pinSvg}</span>`:"")+
      `<div class="cgut">${dots}</div>`+
    `</div>`;
  }
  /* Le pied du dépliage ENTRE : « voir les N autres » et « entrer » disaient la
     même chose, donc un des deux contrôles devait disparaître. Sous 4 items
     l'aperçu montre déjà tout, il n'y a plus rien à « voir » — le libellé le
     dit autrement plutôt que de mentir avec un compte. */
  return `<div class="crow${open?" open":""}" data-cat="${esc(name)}" data-f="${esc(f)}">`+
    `<div class="cline">`+
      `<button class="cchev" data-cchev="${esc(name)}" aria-expanded="${open?"true":"false"}" aria-label="Aperçu de ${esc(name)}">${icon('chevron-left')}</button>`+
      `<button class="cgo" data-cgo="${esc(f)}">${catFace(name,"s")}<span class="cnm">${esc(name)}</span>${pin?`<span class="cpin">${pinSvg}</span>`:""}<span class="ccnt">${n}</span></button>`+
      `<div class="cgut">${dots}</div>`+
    `</div>`+
    `<div class="peek"${open?"":" hidden"}>${open?peekBodyHTML(name,f,list):""}</div>`+
  `</div>`;
}
/* L'aperçu réutilise la ligne d'item de Ma pile : même grammaire, mêmes
   gouttières, mêmes handlers. Trois items, les plus récemment gardés — c'est
   un aperçu, pas une liste, et l'ordre d'arrivée est le seul qui n'a pas
   besoin d'être expliqué. */
function peekBodyHTML(name,f,list){
  const top=list.slice().sort((a,b)=>(b.createdAt||0)-(a.createdAt||0)).slice(0,3);
  return `<div class="dens-dense">${top.map(rowHTML).join("")}</div>`+
    `<button class="peekgo" data-cgo="${esc(f)}">${list.length>3?`Tout voir dans ${esc(name)} (${list.length}) →`:`Entrer dans ${esc(name)} →`}</button>`;
}
/* Les nœuds sont redessinés un par un, dans le conteneur existant : le
   défilement ne bouge pas et rien ne clignote. */
function repaintCatNodes(){
  const grid=document.getElementById("domGrid");if(!grid)return;
  grid.setAttribute("data-view",indexView);
  const active=items.filter(i=>i.status==="active");
  const pins=settings.catPins||[];
  grid.querySelectorAll("[data-cat]").forEach(node=>{
    const name=node.getAttribute("data-cat");
    const f=node.getAttribute("data-f");
    const tmp=document.createElement("div");
    tmp.innerHTML=catNodeHTML(name,f,active.filter(i=>i.domain===name),pins.includes(name));
    node.replaceWith(tmp.firstElementChild);
  });
  wireCatNodes(grid);
  /* Les lignes d'items d'un aperçu resté ouvert sont des nœuds neufs : elles
     ont besoin de leurs handlers, sinon taper un item de l'aperçu ne fait
     plus rien après une bascule liste ↔ compact. */
  grid.querySelectorAll(".peek:not([hidden])").forEach(p=>wireRowButtons(p));
  hydrateMedia(grid);
}
function wireCatNodes(scope){
  scope.querySelectorAll("[data-cgo]").forEach(b=>b.onclick=e=>{e.stopPropagation();enterCollection(b.dataset.cgo);});
  scope.querySelectorAll("[data-cdots]").forEach(b=>b.onclick=e=>{e.stopPropagation();openCatManageSheet(b.dataset.cdots);});
  scope.querySelectorAll("[data-cchev]").forEach(b=>b.onclick=e=>{e.stopPropagation();toggleCatPeek(b.dataset.cchev);});
}
/* Déplier ne reconstruit que la ligne concernée. Un render() complet ferait
   remonter l'écran et refermerait les autres aperçus (piège v2.20). */
function toggleCatPeek(name){
  const grid=document.getElementById("domGrid");if(!grid)return;
  const node=grid.querySelector('[data-cat="'+cssq(name)+'"]');if(!node)return;
  const peek=node.querySelector(".peek");
  const chev=node.querySelector(".cchev");
  if(catOpen.has(name)){
    catOpen.delete(name);
    node.classList.remove("open");
    if(chev)chev.setAttribute("aria-expanded","false");
    if(peek){peek.hidden=true;peek.innerHTML="";}
    return;
  }
  catOpen.add(name);
  node.classList.add("open");
  if(chev)chev.setAttribute("aria-expanded","true");
  if(peek){
    const f=node.getAttribute("data-f");
    peek.innerHTML=peekBodyHTML(name,f,items.filter(i=>i.status==="active"&&i.domain===name));
    peek.hidden=false;
    wireRowButtons(peek);
    wireCatNodes(peek);
    hydrateMedia(peek);
  }
  haptic(10);
}
/* Épingler réordonne, donc DÉPLACE le nœud — il ne le reconstruit pas. Un
   render() complet coûterait la position de défilement et les aperçus
   ouverts, pour une action qui ne change qu'un rang. */
function moveCatNode(name){
  const grid=document.getElementById("domGrid");
  if(!grid||grid.dataset.built!=="cats")return false;
  const node=grid.querySelector('[data-cat="'+cssq(name)+'"]');if(!node)return false;
  const order=catOrder();
  const i=order.indexOf(name);if(i<0)return false;
  const before=order[i+1];
  const ref=before?grid.querySelector('[data-cat="'+cssq(before)+'"]'):null;
  if(ref)grid.insertBefore(node,ref);else grid.appendChild(node);
  /* La punaise est le seul pixel qui change dans la ligne : on la pose ou on
     la retire à la main plutôt que de redessiner le nœud. */
  const pinned=(settings.catPins||[]).includes(name);
  const host=node.querySelector(".cgo")||node;
  const cur=node.querySelector(".cpin,.dpin");
  if(pinned&&!cur){
    const s=document.createElement("span");
    s.className=(indexView==="grid")?"dpin":"cpin";
    s.innerHTML=pinSvg;
    if(indexView==="grid")node.insertBefore(s,node.querySelector(".cgut"));
    else host.insertBefore(s,host.querySelector(".ccnt"));
  } else if(!pinned&&cur)cur.remove();
  return true;
}
/* Épinglées en tête, puis l'ordre choisi (v2.49). Toujours pas d'ordre libre :
   un ordre complet est une décision à maintenir à chaque création. Ce que la
   v2.49 accorde, c'est de CHOISIR la règle, pas d'en écrire une à la main.
   Les épingles restent en tête dans les trois ordres, y compris A → Z : une
   épingle est un ancrage, pas un rang — la trier alphabétiquement avec le reste
   la viderait de son seul effet.
   N'EST APPELÉE QUE PAR L'INDEX (renderCats, moveCatNode). Le sélecteur de
   catégorie de la fiche et la recherche trient de leur côté, par fréquence :
   c'est le bon ordre là-bas, et il ne doit pas suivre celui-ci. */
function catOrder(){
  const counts=domCounts();
  const pins=settings.catPins||[];
  return allCats().sort((a,b)=>{
    const pa=pins.includes(a),pb=pins.includes(b);
    if(pa!==pb)return pa?-1:1;
    return idxCmp(a,b,counts[a]||0,counts[b]||0);
  });
}
/* Un nom de catégorie est saisi par l'utilisateur : il peut contenir un
   guillemet, et il finit dans un sélecteur CSS. On l'échappe. */
function cssq(s){return String(s).replace(/["\\]/g,"\\$&");}
function renderRoot(){
  /* L'invitation vit sur l'accueil, donc au-dessus des trois index et non dans
     l'un d'eux : elle ne dépend pas de ce qu'on est en train de parcourir. */
  renderBadges();
  guardLens();
  updateNavTitle();
  paintHeaderBtns();
  renderIdxList();
  const grid=document.getElementById("domGrid");
  const catsOn=(browseIdx==="cats");
  grid.hidden=!catsOn;
  /* La ligne « Nouvelle catégorie » appartient à l'index Catégories : on ne
     crée pas un tag ni une source, elles se déduisent. */
  renderNewCatLine(catsOn);
  if(!catsOn){
    delete grid.dataset.built;
    document.getElementById("archN").textContent=items.filter(i=>i.status==="archived").length;
    document.getElementById("trashN").textContent=items.filter(i=>i.status==="trashed").length;
    return;}
  const active=items.filter(i=>i.status==="active");
  const none=active.filter(i=>!i.domain);
  const pins=settings.catPins||[];
  const doms=catOrder();
  /* Un dépliage ne survit pas à la disparition de sa catégorie. */
  [...catOpen].forEach(n=>{if(!doms.includes(n))catOpen.delete(n);});
  grid.setAttribute("data-view",indexView);
  grid.dataset.built="cats";
  grid.innerHTML=doms.map(d=>catNodeHTML(d,d,active.filter(i=>i.domain===d),pins.includes(d))).join("");
  wireCatNodes(grid);
  grid.querySelectorAll(".peek:not([hidden])").forEach(p=>{wireRowButtons(p);wireCatNodes(p);});
  /* v2.45 : « Non classés » est parti dans l'en-tête, en pastille. Sa dernière
     forme (une ligne, v2.43) était juste, mais deux lignes d'état au-dessus d'un
     index restaient deux lignes de moins pour l'index. Le raisonnement de la
     v2.38 tient toujours — ce n'est pas un rangement, c'est un état du système —
     et un état du système est exactement ce qu'une pastille sait dire. */
  if(!doms.length&&!none.length)grid.innerHTML=`<div class="empty-list">Aucune catégorie pour l'instant. Le rangement vient après la capture : garde d'abord des items, tu leur donneras une case quand elles s'imposeront.</div>`;
  document.getElementById("archN").textContent=items.filter(i=>i.status==="archived").length;
  document.getElementById("trashN").textContent=items.filter(i=>i.status==="trashed").length;
  hydrateMedia(grid);
}
/* v2.42 — le jugement ouvert depuis la v2.38 est tranché par SOUSTRACTION.
   Le ⋯ de Collection n'avait plus qu'un choix, « Nouvelle catégorie » : une
   feuille à une seule entrée est une odeur. Les deux issues envisagées par le
   cap étaient d'y ajouter des actions (il n'y en a toujours aucune) ou d'en
   faire un `+` — interdit dans l'esprit, l'app a déjà un bouton flottant et
   deux `+` se lisent comme deux boutons d'ajout. Donc une action NOMMÉE : une
   ligne fantôme en pied de l'index, découvrable sans menu, et le ⋯ disparaît. */
function renderNewCatLine(on){
  const el=document.getElementById("newCatLine");if(!el)return;
  if(!on){el.hidden=true;el.innerHTML="";return;}
  el.hidden=false;
  el.innerHTML=`<button class="newcat" id="newCatBtn"><span class="ncp">+</span>Nouvelle catégorie</button>`;
  el.querySelector("#newCatBtn").onclick=addCatPrompt;
}
const pencilSvg=icon('pencil');
function addCatPrompt(){
  const n=(prompt("Nom de la nouvelle catégorie :")||"").trim();
  if(!n)return;
  settings.cats=settings.cats||[];
  if(!settings.cats.includes(n)&&!domains().includes(n))settings.cats.push(n);
  saveSettings();renderRoot();toast("Catégorie « "+n+" » créée.");
}
function enterCollection(f){pileLoc=f;typeFilter="all";sourceFilter="all";tagFilter="";pileQuery="";dormantFocus=false;const s=document.getElementById("searchInput");if(s)s.value="";selectTab("pile");
  /* Après selectTab, jamais avant : l'onglet est la couche du dessous. Et
     « Toute la pile » n'est pas un périmètre — c'est l'historique, on n'en sort
     pas puisqu'on n'y est pas entré. */
  if(inCollection())pushLayer("scope",()=>exitScope());}

/* Actions d'« État de la pile ». Elles réutilisent la machinerie existante :
   la sélection par lot (chantier 3), le focus visible « dormants », et pour
   « jamais remontés » on pose une date échue (chantier 7) plutôt qu'un tirage
   forcé — ça les fait passer devant au prochain tirage sans voler le rituel. */
function enterDormant(){pileLoc="all";typeFilter="all";sourceFilter="all";tagFilter="";pileQuery="";sortMode="oldest";dormantFocus=true;const s=document.getElementById("searchInput");if(s)s.value="";selectTab("pile");enterSel();}
async function bringForward(){
  const d=new Date();d.setHours(9,0,0,0);const ts=d.getTime();   /* échu dès 9 h, comme la fiche du grain */
  let n=0;items.forEach(i=>{if(neverSurfacedYoung(i)){i.surfaceAfter=ts;n++;}});
  if(!n)return;
  await saveItems();
  batch={date:"",ids:[],idx:0};saveBatch();   /* forcer un tirage frais qui verra les échus */
  renderAll();openRemontee();
  toast(n>1?`${n} items posés en tête du tirage.`:`1 item posé en tête du tirage.`);
}
function renderCategories(){renderRootSearch();renderRoot();}
async function renameCat(oldN,newN){
  items.forEach(i=>{if(i.domain===oldN)i.domain=newN;});
  const p=settings.catPins||[];const idx=p.indexOf(oldN);if(idx>-1)p[idx]=newN;settings.catPins=p;
  settings.cats=[...new Set((settings.cats||[]).map(c=>c===oldN?newN:c))];
  if(settings.catIcons&&settings.catIcons[oldN]){settings.catIcons[newN]=settings.catIcons[oldN];delete settings.catIcons[oldN];}
  settings.mutedCats=[...new Set((settings.mutedCats||[]).map(c=>c===oldN?newN:c))];
  saveSettings();await saveItems();renderAll();toast("Catégorie renommée.");
}
async function mergeCat(src,dst){
  items.forEach(i=>{if(i.domain===src)i.domain=dst;});
  settings.catPins=(settings.catPins||[]).filter(x=>x!==src);
  settings.cats=(settings.cats||[]).filter(x=>x!==src);
  settings.mutedCats=(settings.mutedCats||[]).filter(x=>x!==src);
  if(settings.catIcons)delete settings.catIcons[src];
  saveSettings();await saveItems();renderAll();toast("Fusionné dans « "+dst+" ».");
}
async function deleteCat(name){
  items.forEach(i=>{if(i.domain===name)i.domain=null;});
  settings.catPins=(settings.catPins||[]).filter(x=>x!==name);
  settings.cats=(settings.cats||[]).filter(x=>x!==name);
  settings.mutedCats=(settings.mutedCats||[]).filter(x=>x!==name);
  if(settings.catIcons)delete settings.catIcons[name];
  saveSettings();await saveItems();renderAll();toast("Catégorie supprimée.");
}
/* Épingler ne change qu'un rang : le nœud se déplace, l'index ne se reconstruit
   pas. Reconstruire coûterait la position de défilement — le piège de la v2.20,
   relevé sur la maquette où un render() complet passait inaperçu sur douze
   fausses catégories et sauterait sur vingt-sept vraies. Repli sur le rendu
   complet si le nœud est introuvable (index non bâti, ou autre onglet). */
function togglePin(name){
  const p=settings.catPins||[];const i=p.indexOf(name);
  if(i>-1)p.splice(i,1);else p.unshift(name);
  settings.catPins=p;saveSettings();
  if(!moveCatNode(name))renderCategories();
}
/* La sourdine se pose sur la catégorie elle-même, comme on coupe une conversation
   depuis la conversation — les Réglages ne font que lister les muettes. */
function toggleMute(name){
  const m=settings.mutedCats||[];const i=m.indexOf(name);
  if(i>-1)m.splice(i,1);else m.push(name);
  settings.mutedCats=m;saveSettings();
  pruneBatch();
  renderAll();
  toast(i>-1?("« "+name+" » remontera à nouveau."):("« "+name+" » ne remontera plus."));
}
/* Retire du tirage du jour ce qui vient d'être mis en sourdine, sans rejouer les
   cartes déjà passées : on ne reconstruit pas, on coupe la queue. */
function pruneBatch(){
  if(batch.date!==todayStr())return;
  const tail=batch.ids.slice(batch.idx).filter(id=>{const it=items.find(i=>i.id===id);return it&&!isMuted(it);});
  batch.ids=batch.ids.slice(0,batch.idx).concat(tail);saveBatch();
}
function setCatIcon(name,base,tint){settings.catIcons=settings.catIcons||{};settings.catIcons[name]={base:iconBase(base),tint:tint||"ocre"};saveSettings();renderCategories();}
function openCatManageSheet(name){
  document.getElementById("sheetTitle").textContent="Catégorie · "+name;
  const list=document.getElementById("sheetList");
  const pinned=(settings.catPins||[]).includes(name);
  const muted=(settings.mutedCats||[]).includes(name);
  const others=Object.keys(domCounts()).filter(d=>d!==name);
  const hasIcon=!!((settings.catIcons||{})[name]&&settings.catIcons[name].base);
  const merge=others.length?`<div class="ssec">Fusionner dans…</div><div class="schips">`+others.map(d=>`<button class="chip" data-merge="${esc(d)}">${esc(d)}</button>`).join("")+`</div>`:"";
  list.innerHTML=
    `<button class="srow" data-act="rename"><span>Renommer</span></button>`+
    `<button class="srow" data-act="pin"><span>${pinned?"Désépingler":"Épingler en tête"}</span></button>`+
    `<button class="srow" data-act="icon"><span>${hasIcon?"Changer l'icône":"Choisir une icône"}</span></button>`+
    (surfaceOn()?`<button class="srow" data-act="mute"><span>${muted?"Remonter à nouveau":"Ne plus faire remonter"}</span></button>`:"")+
    (hasIcon?`<button class="srow" data-act="unicon"><span>Retirer l'icône</span></button>`:"")+
    merge+
    `<button class="srow danger" data-act="delete"><span>Supprimer la catégorie</span></button>`+
    `<div id="catIconPick"></div>`;
  list.querySelector('[data-act="rename"]').onclick=()=>{const nn=(prompt("Nouveau nom de la catégorie :",name)||"").trim();if(nn&&nn!==name){renameCat(name,nn);closeSheet();}};
  list.querySelector('[data-act="pin"]').onclick=()=>{togglePin(name);closeSheet();};
  const mu=list.querySelector('[data-act="mute"]');if(mu)mu.onclick=()=>{toggleMute(name);closeSheet();};
  list.querySelector('[data-act="icon"]').onclick=()=>{editTint="ocre";openIconSearch(document.getElementById("catIconPick"),(base)=>{setCatIcon(name,base,editTint);closeSheet();});};
  const un=list.querySelector('[data-act="unicon"]');if(un)un.onclick=()=>{if(settings.catIcons)delete settings.catIcons[name];saveSettings();renderCategories();closeSheet();};
  list.querySelectorAll("[data-merge]").forEach(b=>b.onclick=()=>{mergeCat(name,b.dataset.merge);closeSheet();});
  list.querySelector('[data-act="delete"]').onclick=()=>{if(confirm("Supprimer la catégorie « "+name+" » ? Ses items repasseront en « Non classé » (ils ne sont pas supprimés)."))  {deleteCat(name);closeSheet();}};
  showSheet();
}
/* Une collection ouverte : une catégorie, « Non classés », « Mis de côté »,
   « Corbeille ». L'accueil de Ma pile n'en est pas une — c'est l'historique. */
function inCollection(){return !(pileLoc===null||pileLoc==="all");}
function renderPileTab(){
  /* Chantier 20 : A → Z et Z → A n'existent que dans une collection ouverte.
     On ne laisse pas un tri orphelin posé en revenant à l'historique — sinon
     la puce reste, le tri agit, et aucune feuille ne permet de le retirer. */
  if(!inCollection()&&(sortMode==="az"||sortMode==="za"))sortMode="recent";
  const isAll=(pileLoc===null||pileLoc==="all");
  /* v2.45 : le fil d'Ariane n'existe plus. Le périmètre se dit dans sa puce,
     juste sous l'en-tête, et se retire de la même façon qu'un filtre. */
  updateNavTitle();
  paintHeaderBtns();
  renderPinnedRow();
  renderFilterState();
  renderList();
  updateSelUI();
}

/* ===================== Grappe A ===================== *
 * Chantier 8 — état de filtrage UNIQUE, visible et effaçable d'un geste.
 *   Une seule barre montre tous les axes posés PAR-DESSUS la collection
 *   (type, source, tag, tri) en puces retirables, + « Tout effacer ».
 *   La collection (catégorie) reste le fil d'Ariane, sa sortie = le bouton
 *   retour. On réutilise l'état existant (typeFilter/sourceFilter/tagFilter/
 *   sortMode) : rien n'est dupliqué.
 * Chantier 4 — vues épinglées : un instantané nommé de cet état, rangé dans
 *   settings.pinnedViews, affiché en cartes en tête de la pile. Réutilise
 *   toute la mécanique de filtrage ci-dessus.
 * ---------------------------------------------------------------- */
const TFILT_LABEL=Object.fromEntries(TYPE_FILTERS);
const SORT_LABEL=Object.fromEntries(SORTS);
/* Chantier 25 — la recherche de pile devient un axe comme les autres : elle
   entre dans l'état de filtrage, donc dans la puce retirable, dans « Tout
   effacer » et dans une vue épinglable. Elle était le seul filtre invisible de
   la barre, alors qu'elle en est le plus restrictif. */
const qNorm=()=>(pileQuery||"").trim();
function anyFilterActive(){return typeFilter!=="all"||sourceFilter!=="all"||!!tagFilter||sortMode!=="recent"||dormantFocus||!!qNorm();}
function clearFilters(){typeFilter="all";sourceFilter="all";tagFilter="";sortMode="recent";dormantFocus=false;pileQuery="";}
function currentView(){return {loc:(pileLoc==null?"all":pileLoc),type:typeFilter,source:sourceFilter,tag:tagFilter,sort:sortMode,q:qNorm()};}
function samePin(a,b){return a.loc===b.loc&&a.type===b.type&&a.source===b.source&&a.tag===b.tag&&a.sort===b.sort&&(a.q||"")===(b.q||"");}
function matchedPin(){const v=currentView();return (settings.pinnedViews||[]).find(p=>samePin(p,v))||null;}
function cap1(s){return s?s.charAt(0).toUpperCase()+s.slice(1):s;}
function viewSummary(v){
  const b=[];
  if(v.loc&&v.loc!=="all")b.push(collectionName(v.loc));
  if(v.tag)b.push("#"+v.tag);
  if(v.type&&v.type!=="all")b.push(TFILT_LABEL[v.type]||v.type);
  if(v.source&&v.source!=="all")b.push(v.source);
  if(v.sort&&v.sort!=="recent")b.push((SORT_LABEL[v.sort]||v.sort).toLowerCase());
  if(v.q)b.push("« "+v.q+" »");
  return b.join(" · ")||"Toute la pile";
}

/* ---- barre d'état (ch.8) ---- */
let fstateHandlers=[];
function fchip(k,v,onRemove){
  const i=fstateHandlers.push(onRemove)-1;
  return `<span class="fchip"><span class="fk">${esc(k)}</span>${esc(v)}<button class="fx" data-fx="${i}" aria-label="Retirer le filtre ${esc(k)}">×</button></span>`;
}
/* v2.45 — la puce de PÉRIMÈTRE. Même carcasse qu'une puce de filtre (une seule
   grammaire), mais l'encre de la ligne qu'elle remplace : le nom en graisse de
   titre, le compte en mono. Un périmètre n'est pas un filtre de plus, c'est
   l'endroit où l'on est — et on doit le lire sans le chercher. Pas de préfixe
   « périmètre : » : le nom d'une catégorie se reconnaît tout seul. */
function schip(name,n){
  return `<span class="fchip schip"><span class="sn">${esc(name)}</span>`+
    `<span class="sc">${n}</span>`+
    `<button class="fx" data-sx="1" aria-label="Sortir de ${esc(name)}">×</button></span>`;
}
/* ---------- chantier 13 : la barre d'axes ----------
   Une seule porte d'entrée pour tous les axes, et l'affichage y vit aussi :
   il se change souvent et en contexte, il n'a rien à faire dans les Réglages.
   C'est une propriété d'une liste de grains — la même partout, ni par onglet
   ni par catégorie. La deuxième rangée n'existe que si un axe est posé. */
function renderFilterState(){
  fstateHandlers=[];
  const el=document.getElementById("filterState"); if(!el)return;
  /* v2.42 : l'axe d'affichage et « Trier » sont passés derrière le titre, dans
     la feuille « Vue ». Les garder ici AUSSI aurait ajouté au lieu de retirer.
     « Filtrer » reste : c'est le seul des trois qui vit avec les puces qu'il
     pose, et sa feuille ne se réduit pas à une rangée de choix. */
  /* v2.45 — la barre d'axes disparaît : « Filtrer » est devenu une icône
     d'en-tête. Ce qui reste ici, ce sont les puces — et le PÉRIMÈTRE en est une.
     Entrer dans une catégorie, c'est poser une puce ; la retirer, c'est sortir.
     Aucune grammaire nouvelle, et le retour d'Android la retire aussi (couche
     « scope », v2.44). Elle porte le style de la ligne qu'elle remplace, parce
     qu'un périmètre n'est pas un filtre de plus : c'est l'endroit où l'on est. */
  const bar="";
  const chips=[];
  const scopeName=inCollection()?collectionName(pileLoc):(tagFilter?("#"+tagFilter):"");
  if(scopeName)chips.push(schip(scopeName,scopeRows().length));
  if(typeFilter!=="all")   chips.push(fchip("type",TFILT_LABEL[typeFilter]||typeFilter,()=>{typeFilter="all";}));
  if(sourceFilter!=="all") chips.push(fchip("source",sourceFilter,()=>{sourceFilter="all";}));
  if(sortMode!=="recent")  chips.push(fchip("tri",SORT_LABEL[sortMode]||sortMode,()=>{sortMode="recent";}));
  if(dormantFocus)         chips.push(fchip("état","dormants",()=>{dormantFocus=false;}));
  if(qNorm())              chips.push(fchip("recherche",qNorm(),()=>{pileQuery="";}));
  const saved=matchedPin();
  const pinAct=saved
    ? `<button class="fpin" data-unpin="${saved.id}">Désépingler cette vue</button>`
    : `<button class="fpin" data-pin="1">Épingler cette vue</button>`;
  /* v2.46 — « vide » n'est pas « absent ». Tant que la barre d'axes vivait ici,
     ce conteneur avait toujours quelque chose à montrer ; depuis la v2.45 il
     pouvait rester affiché et vide, et un `display:flex` avec du padding qui ne
     montre rien est une bande fantôme. C'est la faute du bandeau de la v2.36,
     refaite à l'envers. */
  if(!chips.length&&!bar){el.hidden=true;el.innerHTML="";return;}
  el.hidden=false;
  el.innerHTML=bar+(chips.length?`<div class="fchips${scopeName?" hasscope":""}">${chips.join("")}</div>`
    +`<div class="facts">${pinAct}<button class="fclear" data-clear="1">Tout effacer</button></div>`:"");
  const sx=el.querySelector("[data-sx]"); if(sx)sx.onclick=exitScope;
  fstateHandlers.forEach((fn,i)=>{const b=el.querySelector('[data-fx="'+i+'"]');if(b)b.onclick=()=>{fn();renderPileTab();};});
  const cl=el.querySelector("[data-clear]");if(cl)cl.onclick=()=>{clearFilters();renderPileTab();};
  const pn=el.querySelector("[data-pin]");if(pn)pn.onclick=pinCurrentView;
  const up=el.querySelector("[data-unpin]");if(up)up.onclick=()=>unpinView(up.dataset.unpin);
}

/* ---- vues épinglées (ch.4) ---- */
function renderPinnedRow(){
  const el=document.getElementById("pinnedRow"); if(!el)return;
  const pins=settings.pinnedViews||[];
  if(!pins.length||pileLoc==="trashed"){el.hidden=true;el.innerHTML="";return;}  /* n'existe que si on en crée */
  const active=matchedPin();
  el.hidden=false;
  el.innerHTML=`<div class="pinscroll">`+pins.map(p=>
    `<button class="pinchip${active&&active.id===p.id?" on":""}" data-apply="${p.id}">`
    +`<span class="pinname">${esc(p.name)}</span>`
    +`<span class="pinsum">${esc(viewSummary(p))}</span>`
    +`</button>`).join("")+`</div>`;
  el.querySelectorAll("[data-apply]").forEach(b=>{
    const pv=pins.find(p=>p.id===b.dataset.apply);
    b.onclick=()=>{ (active&&active.id===pv.id) ? openPinManageSheet(pv) : applyView(pv); };
  });
}
function pinCurrentView(){
  if(matchedPin())return;
  const v=currentView();
  const suggested=cap1(viewSummary(v));
  const name=((prompt("Nom de la vue épinglée :",suggested)||"").trim()||suggested).slice(0,32);
  const pv={id:"pv"+Date.now().toString(36),name,...v};
  settings.pinnedViews=[...(settings.pinnedViews||[]),pv];
  saveSettings();renderPileTab();toast("Vue « "+name+" » épinglée.");
}
function unpinView(id){
  settings.pinnedViews=(settings.pinnedViews||[]).filter(p=>p.id!==id);
  saveSettings();renderPileTab();toast("Vue désépinglée.");
}
function applyView(pv){
  pileLoc=(pv.loc==="all")?"all":pv.loc;
  typeFilter=pv.type||"all";sourceFilter=pv.source||"all";tagFilter=pv.tag||"";sortMode=pv.sort||"recent";dormantFocus=false;
  pileQuery=pv.q||"";
  selectTab("pile");
}
function openPinManageSheet(pv){
  document.getElementById("sheetTitle").textContent="Vue · "+pv.name;
  const list=document.getElementById("sheetList");
  list.innerHTML=
    `<button class="srow" data-a="rename"><span>Renommer</span></button>`+
    `<button class="srow danger" data-a="unpin"><span>Désépingler</span></button>`;
  list.querySelector('[data-a="rename"]').onclick=()=>{
    const nn=(prompt("Nouveau nom :",pv.name)||"").trim();
    if(nn){pv.name=nn.slice(0,32);saveSettings();renderPileTab();}
    closeSheet();
  };
  list.querySelector('[data-a="unpin"]').onclick=()=>{unpinView(pv.id);closeSheet();};
  showSheet();
}
/* Recherche unifiee : un seul champ propose, groupes par nature,
   les CATEGORIES et TAGS correspondants (entites navigables) puis les GRAINS.
   Loi maison : une section vide ne s'affiche jamais. Tri par pertinence
   (prefixe d'abord) puis par taille — aucun reglage. */
let _sExpC=false,_sExpT=false,_sLastQ=null;
function hlMatch(s,q){const raw=String(s==null?"":s);if(!q)return esc(raw);const i=raw.toLowerCase().indexOf(q);if(i<0)return esc(raw);return esc(raw.slice(0,i))+"<mark>"+esc(raw.slice(i,i+q.length))+"</mark>"+esc(raw.slice(i+q.length));}
/* Tap sur un tag : ouvre la pile filtree sur ce tag via un axe de filtrage
   dedie (tagFilter), au meme titre que le type et la source. Le tag s'affiche
   en tete de pile ; le bouton retour l'efface (sortie evidente). */
function enterTag(t){pileLoc="all";typeFilter="all";sourceFilter="all";pileQuery="";tagFilter=normTag(t);dormantFocus=false;const s=document.getElementById("searchInput");if(s)s.value="";selectTab("pile");
  if(tagFilter)pushLayer("scope",()=>exitScope());}
function renderRootSearch(){
  const raw=document.getElementById("searchInput").value.trim();
  const res=document.getElementById("rootResults"),browse=document.getElementById("rootBrowse");
  /* Le champ est désormais dans l'en-tête, donc valable partout : ses résultats
     recouvrent la piste au lieu de vivre dans un seul onglet. */
  document.body.classList.toggle("searching",!!raw);
  if(!raw){
    res.hidden=true;browse.hidden=false;res.innerHTML="";_sLastQ="";
    /* la piste vient de retrouver une largeur : on la remet en face du bon onglet */
    requestAnimationFrame(()=>paintTabs(curTab,0,false));
    return;
  }
  if(raw!==_sLastQ){_sExpC=false;_sExpT=false;_sLastQ=raw;}
  browse.hidden=true;res.hidden=false;
  res.className="dens-confortable";
  const q=raw.toLowerCase(),fq=tagKey(raw);
  const active=items.filter(i=>i.status==="active");
  const counts=domCounts();
  const pref=k=>tagKey(k).startsWith(fq)?1:0;
  let cats=allCats().filter(c=>tagKey(c).includes(fq))
    .sort((a,b)=>(pref(b)-pref(a))||(counts[b]||0)-(counts[a]||0)||a.localeCompare(b,"fr"));
  const noneN=active.filter(i=>!i.domain).length;
  const noneMatch=noneN>0&&tagKey("non classés").includes(fq);
  const tcount={};items.forEach(i=>{if(i.status!=="trashed")(i.tags||[]).forEach(t=>{tcount[t]=(tcount[t]||0)+1;});});
  let tags=Object.keys(tcount).filter(t=>tagKey(t).includes(fq))
    .sort((a,b)=>(pref(b)-pref(a))||tcount[b]-tcount[a]||a.localeCompare(b,"fr"));
  const grains=items.filter(i=>i.status!=="trashed").filter(i=>
    (displayText(i)||"").toLowerCase().includes(q)||(i.content||"").toLowerCase().includes(q)||
    (i.domain||"").toLowerCase().includes(q)||(i.note||"").toLowerCase().includes(q)||
    (i.tags||[]).some(t=>tagKey(t).includes(fq))).sort((a,b)=>b.createdAt-a.createdAt);

  const CAPC=6,CAPT=8,GRID_IC=icon('grid');
  const CHEV_R='<svg class="echev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>';
  const entCat=(name,f,n)=>`<button class="ent" data-cat="${esc(f)}"><span class="eic">${GRID_IC}</span><span class="enm">${hlMatch(name,q)}</span><span class="ecnt">${n}</span>${CHEV_R}</button>`;
  const entTag=(t,n)=>`<button class="ent" data-tag="${esc(t)}"><span class="eic tag">#</span><span class="enm">${hlMatch(t,q)}</span><span class="ecnt">${n}</span>${CHEV_R}</button>`;

  const catItems=[];
  if(noneMatch)catItems.push(entCat("Non classés","none",noneN));
  cats.forEach(c=>catItems.push(entCat(c,c,counts[c]||0)));
  let html="";
  if(catItems.length){
    const shown=_sExpC?catItems:catItems.slice(0,CAPC);
    html+=`<div class="sec"><div class="sechead"><span class="lbl">Catégories</span><span class="n">${catItems.length}</span></div>`+shown.join("");
    if(catItems.length>CAPC&&!_sExpC)html+=`<button class="smore" data-more="c">+ ${catItems.length-CAPC} autre${catItems.length-CAPC>1?"s":""}</button>`;
    html+=`</div>`;
  }
  if(tags.length){
    const shown=_sExpT?tags:tags.slice(0,CAPT);
    html+=`<div class="sec"><div class="sechead"><span class="lbl">Tags</span><span class="n">${tags.length}</span></div>`+shown.map(t=>entTag(t,tcount[t])).join("");
    if(tags.length>CAPT&&!_sExpT)html+=`<button class="smore" data-more="t">+ ${tags.length-CAPT} autres</button>`;
    html+=`</div>`;
  }
  if(grains.length){
    html+=`<div class="sec"><div class="sechead"><span class="lbl">Items</span><span class="n">${grains.length}</span></div>`+grains.map(rowHTML).join("")+`</div>`;
  }
  if(!catItems.length&&!tags.length&&!grains.length)html=`<div class="empty-list">Rien ne correspond.</div>`;
  res.innerHTML=html;
  res.querySelectorAll(".ent[data-cat]").forEach(b=>b.onclick=()=>enterCollection(b.dataset.cat));
  res.querySelectorAll(".ent[data-tag]").forEach(b=>b.onclick=()=>enterTag(b.dataset.tag));
  const mc=res.querySelector('.smore[data-more="c"]');if(mc)mc.onclick=()=>{_sExpC=true;renderRootSearch();};
  const mt=res.querySelector('.smore[data-more="t"]');if(mt)mt.onclick=()=>{_sExpT=true;renderRootSearch();};
  wireRowButtons(res);
  hydrateMedia(res);
}
function collectionRows(){
  let rows;
  if(pileLoc==="trashed"){rows=items.filter(i=>i.status==="trashed");}
  else{
    rows=items.filter(i=>i.status!=="trashed");
    if(pileLoc==="archived")rows=rows.filter(i=>i.status==="archived");
    else{rows=rows.filter(i=>i.status==="active");
      if(pileLoc==="none")rows=rows.filter(i=>!i.domain);
      else if(pileLoc!=="all"&&pileLoc!==null)rows=rows.filter(i=>i.domain===pileLoc);}
  }
  rows=rows.filter(typeMatch);
  if(sourceFilter!=="all")rows=rows.filter(i=>sourceOf(i)===sourceFilter);
  if(tagFilter)rows=rows.filter(i=>hasTag(i,tagFilter));
  if(dormantFocus)rows=rows.filter(isDormant);
  const q=(pileQuery||"").trim().toLowerCase();
  if(q)rows=rows.filter(i=>(displayText(i)||"").toLowerCase().includes(q)||(i.content||"").toLowerCase().includes(q)||(i.domain||"").toLowerCase().includes(q)||(i.note||"").toLowerCase().includes(q)||(i.tags||[]).some(t=>tagKey(t).includes(tagKey(q))));
  if(sortMode==="recent")rows.sort((a,b)=>b.createdAt-a.createdAt);
  else if(sortMode==="oldest")rows.sort((a,b)=>a.createdAt-b.createdAt);
  else if(sortMode==="forgotten")rows.sort((a,b)=>(a.surfaceCount-b.surfaceCount)||((a.lastSurfaced||0)-(b.lastSurfaced||0))||(a.createdAt-b.createdAt));
  /* Tri alphabétique sur le texte affiché, pas sur l'URL : c'est ce que l'œil
     lit. localeCompare pour que É se range avec E et pas après Z. */
  else if(sortMode==="az"||sortMode==="za"){
    const k=i=>(displayText(i)||i.content||"").trim();
    rows.sort((a,b)=>k(a).localeCompare(k(b),"fr",{sensitivity:"base",numeric:true}));
    if(sortMode==="za")rows.reverse();
  }
  return rows;
}
/* ---------- chantier 20 : Ma pile devient un historique ----------
   Quatre paliers, dans l'ordre de la date : Aujourd'hui · Cette semaine ·
   Ce mois · {Mois année}. L'ordre ÉTANT la date, il n'y a aucun palier
   variable à dériver — c'est ce qui rend le découpage sûr.
   Les deux premières fenêtres sont glissantes et non calendaires : un lundi,
   « Cette semaine » vide avec la veille rangée dans « Ce mois » serait faux à
   l'œil. La récence gagne sur le calendrier.
   Point d'attention (v2.37) : un import antidaté pose ses items à J-31, donc
   dans {Mois année} et non dans « Ce mois ». C'est voulu — une archive n'est
   pas une arrivée — mais le palier doit rester lisible avec des dizaines
   d'items dedans, ce qui se juge au pouce sur le corpus réel. */
const MONTHS_FR=["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];
function tierOf(ts){
  const d=new Date(ts),n=new Date();
  if(d.getFullYear()===n.getFullYear()&&d.getMonth()===n.getMonth()&&d.getDate()===n.getDate())return{k:"d",l:"Aujourd’hui"};
  if(Date.now()-ts<7*DAY_MS)return{k:"w",l:"Cette semaine"};
  if(d.getFullYear()===n.getFullYear()&&d.getMonth()===n.getMonth())return{k:"m",l:"Ce mois"};
  return{k:"m"+d.getFullYear()+"-"+d.getMonth(),l:MONTHS_FR[d.getMonth()]+" "+d.getFullYear()};
}
/* Les paliers n'ont de sens que si l'ordre EST la date. « Oubliés » trie par
   nombre de remontées, A → Z par titre : y coller des dates mentirait. */
function tiersOn(){return (sortMode==="recent"||sortMode==="oldest")&&pileLoc!=="trashed";}
const restoreSvg=icon('restore');
const dotsSvg=icon('dots');
const trashSvg=icon('trash');
function gcardHTML(it){
  const arch=it.status==="archived";
  const t=esc(displayText(it));
  const titleEl=it.url?`<a class="gtitle" href="${esc(it.url)}" target="_blank" rel="noopener">${t}</a>`:`<div class="gtitle">${t}</div>`;
  const dom=it.domain?`<span class="mini">${esc(it.domain)}</span>`:`<span class="mini none">non classé</span>`;
  const del=rgut(it);
  return `<div class="gcard" data-id="${it.id}"><div class="gmedia">${galleryThumb(it)}</div>${del}<div class="gbody">${titleEl}<div class="gsub"><span class="mini">${typeLabel(it)}</span>${dom}${tagMinis(it)}${whenMini(it)}</div>${it.note?`<div class="gnote">${esc(it.note)}</div>`:""}</div></div>`;
}
/* ---------- chantier 14 : un grain, une cible ----------
   La carte entière ouvre le lien. Tout le reste passe par le ⋯, qui vit dans
   une gouttière à droite — la même colonne que la case à cocher, qui vient
   l'y remplacer en mode sélection : rien ne bouge d'un pixel à l'entrée.
   Le ⋯ coupe la propagation, sinon on ouvrirait le lien en visant le menu. */
function rgut(it){
  return `<div class="rgut"><button class="rdots" data-menu="${it.id}" aria-label="Actions sur cet item">${dotsSvg}</button><span class="rcheck">${selCheckSvg}</span></div>`;
}
function rowHTML(it){
  const arch=it.status==="archived";
  const body=(it.type==="youtube"||it.type==="link")?`<a href="${esc(it.url)}" target="_blank" rel="noopener">${esc(displayText(it))}</a>`:isMediaType(it.type)?esc(it.hasMedia?it.content:displayText(it)):esc(it.content);
  const thumb=rowThumb(it);
  const dom=it.domain?`<span class="mini">${esc(it.domain)}</span>`:`<span class="mini none">non classé</span>`;
  const act=rgut(it);
  return `<div class="row" data-id="${it.id}">${thumb}<div class="body"><div class="txt ${arch?'arch':''}">${body}</div>
  <div class="sub"><span class="mini">${typeLabel(it)}</span>${dom}${tagMinis(it)}${whenMini(it)}<span>gardé ${ago(it.createdAt)}</span>${it.surfaceCount?`<span>revu ${it.surfaceCount}×</span>`:""}</div>${it.note?`<div class="rownote">${esc(it.note)}</div>`:""}</div>${act}</div>`;
}
function openLightbox(src){
  pushLayer("lightbox",()=>closeLightbox());
  if(!src)return;
  const lb=document.getElementById("lightbox");
  lb.innerHTML=`<button class="lb-x" aria-label="Fermer">✕</button><img src="${esc(src)}" alt="">`;
  lb.hidden=false;
  lb.onclick=()=>closeLightbox();
}
function closeLightbox(){popLayer("lightbox");const lb=document.getElementById("lightbox");lb.hidden=true;lb.innerHTML="";}
function wireRowButtons(scope){
  scope.querySelectorAll("[data-del]").forEach(b=>b.onclick=()=>deleteRow(b.dataset.del));
  scope.querySelectorAll("[data-restore]").forEach(b=>b.onclick=()=>restoreRow(b.dataset.restore));
  scope.querySelectorAll("[data-purge]").forEach(b=>b.onclick=e=>{e.stopPropagation();purgeRow(b.dataset.purge);});
  scope.querySelectorAll("[data-menu]").forEach(b=>b.onclick=e=>{
    e.preventDefault();e.stopPropagation();          /* viser le menu n'ouvre pas le lien */
    if(!selMode)openGrainMenu(b.dataset.menu);
  });
  scope.querySelectorAll(".row,.gcard,.fcard").forEach(el=>el.addEventListener("click",e=>{
    if(e.target.closest("a,button")||e.target.closest(".zoomable"))return;
    const id=el.getAttribute("data-id");if(id)openGrain(id);
  }));
}
/* « Mes trouvailles ne meurent pas » ne se solde qu'au moment où on rouvre la
   trouvaille : taper un grain ouvre le lien, hors de l'app, jamais en webview.
   Aucun changement d'état au passage — pas de « déjà lu », pas de compteur.
   Une note n'a pas de lien : sa fiche EST son contenu, elle s'ouvre. Un média
   s'agrandit. */
function openGrain(id){
  const it=items.find(x=>x.id===id);if(!it)return;
  if(it.url&&(it.type==="link"||it.type==="youtube")){window.open(it.url,"_blank","noopener");return;}
  if(it.type==="image"){const src=coverSrc(it)||it.url;if(src){openLightbox(src);return;}}
  openGrainSheet(id);
}
/* Le menu du ⋯ : tout ce que la carte ne fait plus. */
function openGrainMenu(id){
  const it=items.find(x=>x.id===id);if(!it)return;
  document.getElementById("sheetTitle").textContent=displayText(it).slice(0,44)||"Item";
  const L=document.getElementById("sheetList");
  const row=(a,l,cls)=>`<button class="srow${cls?" "+cls:""}" data-a="${a}"><span>${l}</span></button>`;
  L.innerHTML=(it.status==="trashed")
    ? row("restore","Restaurer")+row("purge","Supprimer définitivement","danger")
    : row("edit","Ouvrir la fiche")+row("cat","Classer")+row("tag","Tags")+
      row(it.status==="archived"?"restore":"arch",it.status==="archived"?"Remettre en pile":"Mettre de côté")+
      /* v2.49 — la porte visible de la sélection, venue de la feuille « Vue ».
         Elle est ici parce qu'on y est déjà : on vise l'item qu'on veut, et
         l'entrée le coche. C'est le jumeau exact de l'appui long de la v2.19,
         au même endroit et avec le même effet — un geste n'est jamais le seul
         moyen de faire une action. */
      row("sel","Sélectionner")+
      row("del","Jeter","danger");
  const go=fn=>{closeSheet();setTimeout(fn,180);};
  const act={
    edit:()=>openGrainSheet(id), cat:()=>openGrainSheet(id), tag:()=>openGrainSheet(id),
    sel:()=>selAddFromGesture(id),
    arch:()=>archiveCard(id), restore:()=>restoreRow(id), del:()=>deleteRow(id), purge:()=>purgeRow(id)
  };
  L.querySelectorAll("[data-a]").forEach(b=>b.onclick=()=>go(act[b.dataset.a]));
  showSheet();
}
function renderList(){
  const list=document.getElementById("pileList");
  const rows=collectionRows();
  /* v2.45 : le compteur est supprimé. Le chantier 11 avait déjà retiré « N en
     pile » de l'en-tête pour la même raison — il n'était pas consulté — et le
     remettre plus bas ne l'avait pas rendu plus utile. Le compte du périmètre
     vit dans sa puce, là où il sert à décider si on y entre. */
  const trashHdr=(pileLoc==="trashed")?`<button class="emptytrash" id="emptyTrashBtn">Vider la corbeille</button>`:"";
  if(rows.length===0){list.className="";list.innerHTML=trashHdr+`<div class="empty-list">${pileLoc==="trashed"?"La corbeille est vide.":"Rien ici pour l’instant."}</div>`;}
  else{
    const trash=(pileLoc==="trashed");
    /* Trois formes, pas neuf. « Grandes cartes » et les trois densités
       formaient un produit 3 × 3 pour un seul axe ; le chantier 13 le ramène
       à grille / liste / compact, défaut liste. */
    list.className=(!trash&&pileView==="grid")?"gallery":("dens-"+(pileView==="compact"?"dense":"confortable"));
    const one=(!trash&&pileView==="grid")?gcardHTML:rowHTML;
    let body="";
    if(tiersOn()){
      let cur=null;
      for(const it of rows){
        const t=tierOf(it.createdAt);
        if(t.k!==cur){cur=t.k;body+=`<div class="tier">${esc(t.l)}</div>`;}
        body+=one(it);
      }
    } else body=rows.map(one).join("");
    list.innerHTML=trashHdr+body;
    wireRowButtons(list);
    hydrateMedia(list);
    if(selMode)decorateSel(list);
  }
  const e=document.getElementById("emptyTrashBtn");if(e)e.onclick=emptyTrash;
}
/* ---------- sélection & actions par lot ---------- */
/* Tout se fait par manipulation du DOM sur place : entrer, cocher, tout
   sélectionner et sortir ne reconstruisent jamais la liste (sinon les médias
   se rechargent → scintillement). */
const selCheckSvg=icon('check');
/* La case à cocher n'est plus insérée dans le DOM à l'entrée en sélection :
   elle est déjà là, dans la gouttière, sous le ⋯. `body.selecting` échange
   simplement lequel des deux s'affiche. Zéro insertion, zéro décalage, et la
   liste n'est toujours pas reconstruite. */
function decorateSel(list){
  list.querySelectorAll("[data-id]").forEach(el=>{
    const on=selIds.has(el.getAttribute("data-id"));
    el.classList.toggle("sel",on);
    const c=el.querySelector(".rcheck");if(c)c.classList.toggle("on",on);
  });
}
function undecorateSel(list){
  list.querySelectorAll("[data-id]").forEach(el=>el.classList.remove("sel","selgrid"));
  list.querySelectorAll(".rcheck.on").forEach(c=>c.classList.remove("on"));
}
function cardEl(id){try{return document.querySelector('#pileList [data-id="'+CSS.escape(id)+'"]');}catch(e){return null;}}
function markSel(card,on){
  if(!card)return;card.classList.toggle("sel",on);
  const c=card.querySelector(".rcheck");if(c)c.classList.toggle("on",on);
}
function updateSelUI(){
  document.body.classList.toggle("selecting",selMode);
  document.body.classList.toggle("hasSel",selMode&&selIds.size>0);
  if(!selMode)return;
  const n=selIds.size,rows=collectionRows();
  const sn=document.getElementById("selN");if(sn)sn.textContent=n+" sélectionné"+(n>1?"s":"");
  const sa=document.getElementById("selAll");if(sa)sa.textContent=(n>0&&n===rows.length)?"Aucun":"Tout";
}
function enterSel(){if(pileLoc==="trashed")return;pushLayer("sel",()=>exitSel());selMode=true;selIds.clear();decorateSel(document.getElementById("pileList"));updateSelUI();}
function exitSel(){popLayer("sel");selMode=false;selIds.clear();undecorateSel(document.getElementById("pileList"));updateSelUI();}
function toggleSel(id){const on=!selIds.has(id);on?selIds.add(id):selIds.delete(id);markSel(cardEl(id),on);updateSelUI();}
function selAllToggle(){
  const rows=collectionRows(),all=selIds.size===rows.length;
  selIds.clear();if(!all)rows.forEach(it=>selIds.add(it.id));
  document.getElementById("pileList").querySelectorAll("[data-id]").forEach(el=>markSel(el,selIds.has(el.getAttribute("data-id"))));
  updateSelUI();
}
/* v2.49 — `pushLayer` manquait ici. Entrer en sélection par l'appui long (ou,
   depuis cette version, par le ⋯) ne poussait AUCUNE couche : le retour
   d'Android quittait l'onglet au lieu de sortir de la sélection, et `exitSel()`
   appelait `popLayer("sel")` sur une couche jamais empilée — retour silencieux,
   pile fausse. L'invariant du chantier 31 (fermer par l'UI et reculer par le
   système empruntent le même chemin) était rompu depuis la v2.44 sur le seul
   chemin d'entrée que le banc ne peut pas emprunter, faute de doigt. */
function selAddFromGesture(id){
  /* Le même refus que `enterSel` : la corbeille n'a pas de sélection, et les
     deux portes ne peuvent pas répondre différemment à la même question. */
  if(pileLoc==="trashed")return;
  const first=!selMode;
  if(first){pushLayer("sel",()=>exitSel());selMode=true;selIds.clear();}
  selIds.add(id);
  const pl=document.getElementById("pileList");
  if(first)decorateSel(pl);
  markSel(cardEl(id),true);
  updateSelUI();
}
/* Bandeau « N grains viennent de {source} » abandonné en v2.36 : il présumait
   une intention de rangement par source qui n'existe pas (quatre grains d'une
   même source vont le plus souvent dans quatre catégories différentes) et
   s'imposait sur la meilleure ligne de la pile. La sélection par lot reste
   ouverte à l'appui long et par le menu du titre (v2.45). */
function openBatchCatSheet(){
  if(!selIds.size)return;
  const n=selIds.size;
  document.getElementById("sheetTitle").textContent="Classer "+n+" item"+(n>1?"s":"");
  const list=document.getElementById("sheetList");
  list.innerHTML=`<div class="picklist"><input id="bCatQ" placeholder="Chercher ou créer une catégorie…" autocomplete="off"><div class="pickscroll" id="bCatRes"></div></div>`;
  const q=list.querySelector("#bCatQ"),res=list.querySelector("#bCatRes"),counts=domCounts();
  const draw=()=>{
    const v=q.value.trim(),k=tagKey(v);
    /* Vrac est épinglé en tête, toujours à un seul tap : répondre « je ne rangerai
       pas ça » doit coûter aussi peu que ranger. C'est une catégorie comme les
       autres — applyBatchCat la crée si elle n'existe pas encore (chantier 27). */
    const vracHit=!k||tagKey("vrac").includes(k);
    const hits=allCats().filter(d=>tagKey(d)!=="vrac").filter(d=>!k||tagKey(d).includes(k)).sort((a,b)=>(counts[b]||0)-(counts[a]||0)||a.localeCompare(b,"fr"));
    const exact=tagKey(v)==="vrac"||hits.some(d=>tagKey(d)===k);
    const vracRow=vracHit?`<button class="pickrow" data-vrac="1"><span>Vrac</span><span class="n">${counts["Vrac"]||0}</span></button>`:"";
    res.innerHTML=vracRow+hits.map(d=>`<button class="pickrow" data-d="${esc(d)}"><span>${esc(d)}</span><span class="n">${counts[d]||0}</span></button>`).join("")
      +(v&&!exact?`<button class="pickrow new" data-new="1"><span>Créer « ${esc(v)} »</span><span class="n">+</span></button>`:"");
    res.querySelectorAll("[data-d]").forEach(b=>b.onclick=()=>applyBatchCat(b.dataset.d));
    const vb=res.querySelector("[data-vrac]");if(vb)vb.onclick=()=>applyBatchCat("Vrac");
    const nb=res.querySelector("[data-new]");if(nb)nb.onclick=()=>applyBatchCat(v);
  };
  q.addEventListener("input",draw);draw();showSheet();
}
async function applyBatchCat(cat){
  cat=(cat||"").trim();if(!cat)return;
  if(!domains().includes(cat)){settings.cats=settings.cats||[];if(!settings.cats.includes(cat)){settings.cats.push(cat);saveSettings();}}
  const n=selIds.size;items.forEach(it=>{if(selIds.has(it.id))it.domain=cat;});
  await saveItems();closeSheet(true);exitSel();renderAll();
  toast(n+" item"+(n>1?"s":"")+" classé"+(n>1?"s":"")+" dans « "+cat+" »");
}
function openBatchTagSheet(){
  if(!selIds.size)return;
  const n=selIds.size;let picked=[];
  document.getElementById("sheetTitle").textContent="Taguer "+n+" item"+(n>1?"s":"");
  const list=document.getElementById("sheetList");
  list.innerHTML=`<div class="gfld" style="padding-top:6px"><input id="bTagQ" placeholder="Ajouter un tag…" autocomplete="off" autocapitalize="off"><div class="tagsug" id="bTagSug"></div><div class="tagsel" id="bTagPick"></div></div>`;
  const foot=document.getElementById("sheetFoot");if(foot){foot.hidden=false;foot.innerHTML=`<button class="act-keep" id="bTagApply">Appliquer</button>`;}
  const q=list.querySelector("#bTagQ"),sug=list.querySelector("#bTagSug"),pk=list.querySelector("#bTagPick");
  let guard=false;
  const drawPicked=()=>{pk.innerHTML=picked.map(t=>`<span class="tagchip"><span class="taghash">#</span>${esc(t)}<button class="x" data-rm="${esc(t)}" aria-label="Retirer">✕</button></span>`).join("");pk.querySelectorAll("[data-rm]").forEach(b=>b.onclick=()=>{picked=picked.filter(x=>x!==b.dataset.rm);drawPicked();});};
  const drawSug=()=>{const k=tagKey(q.value);if(!k){sug.innerHTML="";return;}const hits=tagLib().filter(t=>!picked.some(p=>tagKey(p)===tagKey(t))).filter(t=>tagKey(t).includes(k)).slice(0,8);sug.innerHTML=hits.map(t=>`<button class="chip" data-t="${esc(t)}"><span class="taghash">#</span>${esc(t)}</button>`).join("");sug.querySelectorAll("[data-t]").forEach(b=>{b.addEventListener("pointerdown",()=>{guard=true;});b.onclick=()=>{guard=false;add(b.dataset.t);};});};
  const add=raw=>{const t=normTag(raw);if(t&&!picked.some(p=>tagKey(p)===tagKey(t)))picked.push(t);q.value="";drawPicked();drawSug();q.focus();};
  q.addEventListener("input",drawSug);
  q.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===","){e.preventDefault();add(q.value);}});
  q.addEventListener("blur",()=>{if(guard){guard=false;return;}if(q.value.trim())add(q.value);});
  document.getElementById("bTagApply").onclick=async()=>{
    if(q.value.trim())add(q.value);
    if(!picked.length){closeSheet(true);return;}
    const n2=selIds.size;items.forEach(it=>{if(selIds.has(it.id)){it.tags=it.tags||[];picked.forEach(t=>{if(!it.tags.some(x=>tagKey(x)===tagKey(t)))it.tags.push(t);});}});
    await saveItems();closeSheet(true);exitSel();renderAll();
    toast(picked.length+" tag"+(picked.length>1?"s":"")+" ajouté"+(picked.length>1?"s":"")+" à "+n2+" item"+(n2>1?"s":""));
  };
  drawSug();drawPicked();showSheet();
}
/* ---------- panneau bas : tri & réglages ---------- */
/* ═══════════════════════════════════════════════════════════════════════════
   v2.44 — PILE DE NAVIGATION : le retour d'Android défait, il ne quitte pas.
   L'app n'avait aucun pushState : une feuille ouverte, un périmètre posé, la
   surface dépliée — le retour système sortait de l'app dans tous les cas.

   Un seul invariant, et c'est lui qui rend la chose tenable : FERMER PAR L'UI
   ET RECULER PAR LE SYSTÈME EMPRUNTENT LE MÊME CHEMIN. Une couche s'ouvre en
   poussant une entrée d'historique ; elle se ferme en rendant les entrées
   qu'elle occupait ; et le gestionnaire de popstate ne compte RIEN — il lit la
   profondeur inscrite dans l'état et réconcile jusqu'à elle.
   Ne rien compter est le point important. Un `history.go(-2)` émet un popstate
   dans certains moteurs et deux dans d'autres ; un compteur d'événements se
   désynchronise au premier appui rapide. Réconcilier sur une profondeur est
   idempotent : le deuxième popstate n'a plus rien à faire, il ne casse rien.
   ═══════════════════════════════════════════════════════════════════════════ */
const layers=[];        /* [{name, close}] — du plus bas au plus haut. LA vérité. */
let unwinding=false;    /* popstate est en train de défaire : le tour est à lui */
let syncing=false;      /* un recul que NOUS avons demandé est en vol */
function layerOn(name){return layers.some(l=>l.name===name);}

/* La profondeur inscrite dans l'entrée d'historique courante. */
function histDepth(){
  const st=history.state;
  return (st&&typeof st.sable==="number")?st.sable:0;
}
/* Le cœur : recaler l'historique sur `layers`, jamais l'inverse. Appelée après
   CHAQUE changement de pile, et de nouveau après chaque popstate.
   Elle doit être idempotente, parce que `history.go()` est ASYNCHRONE : entre
   la demande de recul et son arrivée, l'app continue de tourner. Le motif
   dominant du code est `closeSheet(); openAutreChose()` — les deux dans le même
   tick. Avec un recul posé en direct, l'entrée neuve se faisait rembobiner par
   le recul de la précédente. Ici, la fermeture ne recule rien tant que la
   réouverture rétablit la même profondeur : il n'y a plus rien à faire. */
let syncWatch=null;
function syncHistory(){
  /* TANT QU'UN RECUL EST EN VOL, ON NE TOUCHE À RIEN — ni recul, ni poussée.
     C'est la leçon la plus chère de ce chantier. Deux reculs demandés donnent
     deux popstate pour un seul drapeau, et le second passe pour un appui de
     l'utilisateur. Pire : une POUSSÉE glissée pendant qu'un recul est en vol
     décale l'historique pour de bon, et plus rien ne se recale ensuite.
     Le gestionnaire de popstate rappelle syncHistory() en arrivant, avec un
     état frais : tout ce qui a été demandé entre-temps est rattrapé là. */
  if(syncing)return;
  const cur=histDepth();
  if(cur===layers.length)return;
  try{
    if(cur<layers.length){
      for(let d=cur+1;d<=layers.length;d++)history.pushState({sable:d},"");
    }else{
      syncing=true;
      /* Filet : si un moteur avale le popstate, le drapeau resterait levé et
         la pile ne se recalerait plus jamais. On le relâche de force. */
      clearTimeout(syncWatch);
      syncWatch=setTimeout(()=>{if(syncing){syncing=false;syncHistory();}},400);
      history.go(layers.length-cur);
    }
  }catch(e){syncing=false;}
}
function pushLayer(name,close){
  if(layerOn(name))return;                /* une couche par nom, jamais deux */
  layers.push({name,close});
  syncHistory();
}
/* Fermeture demandée par l'UI (croix, overlay, choix dans un menu). Les couches
   empilées PAR-DESSUS sont fermées, pas seulement oubliées : une couche
   orpheline laisserait son état posé — un périmètre encore filtré, une sélection
   encore active — sans plus rien pour en sortir. La couche nommée, elle, est
   fermée par son appelant : c'est lui qui sait comment. */
function popLayer(name){
  if(unwinding)return;                    /* le défilement de popstate a déjà le tour */
  const i=layers.findIndex(l=>l.name===name);
  if(i<0)return;
  const above=layers.splice(i+1);
  layers.length=i;
  if(above.length){
    unwinding=true;
    try{ above.reverse().forEach(l=>{try{l.close();}catch(e){}}); }
    finally{ unwinding=false; }
  }
  syncHistory();
}
window.addEventListener("popstate",e=>{
  const target=(e.state&&typeof e.state.sable==="number")?e.state.sable:0;
  /* Notre recul vise EXACTEMENT `layers.length`. Un popstate qui arrive plus
     bas que ça pendant notre recul n'est donc pas le nôtre : c'est l'utilisateur
     qui a appuyé sur retour entre-temps — taper ✕ puis reculer aussitôt, ce qui
     est un geste ordinaire. Le distinguer par la profondeur au lieu de faire
     confiance au drapeau, c'est ce qui empêche d'avaler son appui. */
  if(syncing&&target>=layers.length){
    clearTimeout(syncWatch);
    syncing=false;
    syncHistory();
    return;
  }
  clearTimeout(syncWatch);
  syncing=false;
  if(layers.length>target){
    unwinding=true;
    try{
      while(layers.length>target){
        const l=layers.pop();
        try{l.close();}catch(err){}
      }
    } finally { unwinding=false; }
  }
  syncHistory();                          /* et on se recale, quoi qu'il arrive */
});
/* L'entrée racine porte la profondeur 0. Sans elle, `e.state` serait null au
   premier retour et on ne saurait pas jusqu'où réconcilier. Au niveau 0 —
   onglet de départ, rien d'ouvert — le retour rend la main au système : une app
   dont on ne peut pas sortir par le retour est un piège, pas une app. */
try{history.replaceState({sable:0},"");}catch(e){}
const startTab=()=>TAB_ORDER.includes(settings.startTab)?settings.startTab:"categories";

function showSheet(){pushLayer("sheet",()=>closeSheet());document.getElementById("sheetOverlay").classList.add("open");document.getElementById("appSheet").classList.add("open");}
/* Fermer un panneau ne doit jamais faire perdre une correction : la fiche branche
   ici son enregistrement silencieux. closeSheet(true) = fermer sans repasser par lui
   (le geste a deja enregistre, ou le grain vient d'etre jete). */
let onSheetClose=null;
function closeSheet(skipSave){
  popLayer("sheet");
  if(!skipSave&&onSheetClose){const f=onSheetClose;onSheetClose=null;f();}
  onSheetClose=null;viewMenuOn=false;
  document.getElementById("sheetOverlay").classList.remove("open");
  const sh=document.getElementById("appSheet");
  sh.classList.remove("open");
  setTimeout(()=>{
    if(sh.classList.contains("open"))return;   /* un autre panneau a deja repris la main */
    sh.classList.remove("tall");
    const ha=document.getElementById("sheetHeadAct");if(ha)ha.innerHTML="";
    const ft=document.getElementById("sheetFoot");if(ft){ft.hidden=true;ft.innerHTML="";}
  },300);
}
/* v2.42 : `openSortSheet` n'existe plus. Le tri se règle dans la feuille
   « Vue », derrière le titre de Ma pile, à côté de l'axe d'affichage — deux
   rangées d'un même groupe, la grammaire `.seg` de la v2.21 est inchangée. */
/* ---------- chantier 11 : la feuille de capture ----------
   Une seule surface de capture, deux portes d'entrée : ce flottant et la
   cible de partage Android — sinon les deux chemins divergent.
   Contenu, dans cet ordre : champ, pastille « Coller », bouton d'action.
   Rien d'autre : pas de catégorie, pas de tag, le classement se fait plus
   tard. Le presse-papier n'est jamais lu tout seul : la pastille se tape
   (le lire demande une permission Android et se comporte mal). */
function openCaptureSheet(){
  document.getElementById("sheetTitle").textContent="Ajouter";
  const list=document.getElementById("sheetList");
  list.innerHTML=`<div class="capsheet">`+
    `<div class="capfield"><input id="capIn" placeholder="Colle un lien, ou note une idée" autocomplete="off" inputmode="url" enterkeyhint="done" aria-label="Ajouter à ta pile"></div>`+
    `<button class="chip cappaste" id="capPaste">Coller le presse-papier</button>`+
    `<button class="btn solid capgo" id="capGo">${icon('plus')}Ajouter</button>`+
    `<div class="capalt"><button class="btn ghost" id="capPhoto">Photo</button><button class="btn ghost" id="capFile">Fichier</button></div>`+
    `<button class="btn ghost capbulk" id="capBulk">Importer une liste…</button>`+
  `</div>`;
  const inp=list.querySelector("#capIn");
  const go=()=>{const v=(inp.value||"").trim();if(!v){inp.focus();return;}closeSheet();addItem(v);};
  list.querySelector("#capGo").onclick=go;
  inp.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();go();}});
  list.querySelector("#capPaste").onclick=async()=>{
    try{
      const t=(await navigator.clipboard.readText()||"").trim();
      if(t){inp.value=t;inp.focus();}else toast("Presse-papier vide.");
    }catch(e){toast("Colle directement dans le champ.");inp.focus();}
  };
  list.querySelector("#capPhoto").onclick=()=>{closeSheet();document.getElementById("fPhoto").click();};
  list.querySelector("#capFile").onclick=()=>{closeSheet();document.getElementById("fFile").click();};
  list.querySelector("#capBulk").onclick=()=>openImportSheet();
  showSheet();
  setTimeout(()=>{try{inp.focus();}catch(e){}},80);
}
/* Import en masse (chantier 23) — le chantier qui fait entrer le vrai corpus.
   Coller N liens (un par ligne) ou l'export .txt d'une conversation ; une
   catégorie et un tag s'appliquent au lot. Deux pièges traités :
   1. Un collage de masse est une ARCHIVE : sans antidatage les N items partagent
      le même createdAt, la maturation les bloque tous 30 jours et la rotation par
      âge n'a plus de sens. On antidate le lot au-delà de la maturation et on
      départage les ex æquo au hasard.
   2. Un export WhatsApp porte ses vraies dates : on les conserve quand le format
      les donne (ces items-là ne sont pas antidatés). */
function parseWaLine(line){
  const m=line.match(/^\[?\s*(\d{1,2})[\/.](\d{1,2})[\/.](\d{2,4})[,\s]+(?:à\s*)?(\d{1,2})[:h](\d{2})(?::(\d{2}))?\s*\]?\s*(?:[-–]\s*)?(.*)$/);
  if(!m)return null;
  let d=+m[1],mo=+m[2],y=+m[3];
  if(y<100)y+=2000;
  if(mo>12&&d<=12){const t=d;d=mo;mo=t;}          // c'était MM/JJ, on rétablit JJ/MM
  const dt=new Date(y,mo-1,d,+m[4],+m[5],+(m[6]||0));
  const ts=dt.getTime();
  if(isNaN(ts)||ts>Date.now())return null;
  return {ts,rest:m[7]||""};
}
function pickTextFile(cb){
  const inp=document.createElement("input");inp.type="file";inp.accept=".txt,text/plain";
  inp.onchange=()=>{const f=inp.files&&inp.files[0];if(!f)return;const r=new FileReader();r.onload=()=>cb(String(r.result||""));r.onerror=()=>toast("Fichier illisible.");r.readAsText(f);};
  inp.click();
}
function openImportSheet(){
  document.getElementById("sheetTitle").textContent="Importer une liste";
  const list=document.getElementById("sheetList");
  list.innerHTML=`<div class="capsheet impsheet">`+
    `<div class="imphint">Colle une liste de liens (un par ligne) ou l’export .txt d’une conversation. La catégorie et le tag s’appliquent à tout le lot.</div>`+
    `<textarea id="impText" class="imparea" placeholder="https://…&#10;https://…" autocomplete="off" autocapitalize="off" spellcheck="false"></textarea>`+
    `<div class="capfield"><input id="impCat" placeholder="Catégorie pour le lot (facultatif)" autocomplete="off"></div>`+
    `<div class="capfield"><input id="impTag" placeholder="Tag pour le lot (facultatif)" autocomplete="off" autocapitalize="off"></div>`+
    `<button class="btn solid capgo" id="impGo">${icon('plus')}Importer</button>`+
    `<button class="btn ghost" id="impFile">Depuis un fichier .txt</button>`+
  `</div>`;
  const ta=list.querySelector("#impText");
  const grab=()=>({txt:ta.value||"",cat:list.querySelector("#impCat").value,tag:list.querySelector("#impTag").value});
  list.querySelector("#impGo").onclick=()=>{const g=grab();if(!g.txt.trim()){ta.focus();return;}closeSheet();importBulk(g.txt,g.cat,g.tag);};
  list.querySelector("#impFile").onclick=()=>{const g=grab();pickTextFile(t=>{closeSheet();importBulk(t,g.cat,g.tag);});};
  showSheet();
  setTimeout(()=>{try{ta.focus();}catch(e){}},80);
}
async function importBulk(text,cat,tag){
  const urlRe=/(https?:\/\/[^\s<>()"']+)/g;
  const entries=[];                       // {url, ts|null}
  for(const line of String(text).split(/\r?\n/)){
    const wa=parseWaLine(line);
    const src=wa?wa.rest:line, ts=wa?wa.ts:null;
    const found=src.match(urlRe);
    if(found)for(const u of found)entries.push({url:u.replace(/[.,;:)\]]+$/,""),ts});
  }
  if(!entries.length){toast("Aucun lien trouvé à importer.");return;}
  cat=(cat||"").trim();tag=(tag||"").trim();
  const tg=tag?normTag(tag):null;
  const now=Date.now();
  const undated=entries.filter(e=>e.ts==null);
  /* Antidatage : le lot non daté est posé au-delà de la maturation (plus mûr,
     donc éligible tout de suite), le premier collé le plus ancien, ex æquo
     départagés par un léger bruit. */
  const anchor=now-MATURE_MS-DAY_MS, step=60000;
  let ui=0, added=0, skipped=0;
  const seen=new Set();
  for(const e of entries){
    const k=urlKey(e.url);
    if(seen.has(k)){skipped++;continue;}seen.add(k);
    if(findDup(e.url)){skipped++;continue;}
    const d=detectType(e.url);
    const ca=e.ts!=null?e.ts:(anchor-(undated.length-1-ui++)*step+Math.floor(Math.random()*1000));
    items.push(normalizeItem({id:uid(),type:d.type,mime:"",hasMedia:false,content:e.url,url:d.url,domain:cat||null,title:null,note:"",tags:tg?[tg]:[],preview:null,createdAt:ca,lastSurfaced:null,surfaceCount:0,status:"active"}));
    added++;
  }
  if(cat&&!domains().includes(cat)){settings.cats=settings.cats||[];if(!settings.cats.includes(cat))settings.cats.push(cat);saveSettings();}
  items.sort((a,b)=>(b.createdAt||0)-(a.createdAt||0));   // la pile reste ordonnée par date
  await saveItems();renderAll();
  toast(added?`${added} lien${added>1?"s":""} importé${added>1?"s":""}${skipped?` · ${skipped} déjà en pile`:""}`:"Tout était déjà en pile.");
}
/* Le périmètre de la collection ouverte, AVANT tout axe. C'est lui que la
   feuille de filtre décrit : filtrer par type ne doit pas vider la liste des
   sources, et proposer une source absente de la collection ouverte est une
   case morte qu'on tape une fois pour rien. */
function scopeRows(){
  if(pileLoc==="trashed")return items.filter(i=>i.status==="trashed");
  const r=items.filter(i=>i.status!=="trashed");
  if(pileLoc==="archived")return r.filter(i=>i.status==="archived");
  const a=r.filter(i=>i.status==="active");
  if(pileLoc==="none")return a.filter(i=>!i.domain);
  if(pileLoc!=="all"&&pileLoc!==null)return a.filter(i=>i.domain===pileLoc);
  return a;
}
function openFilterSheet(){
  document.getElementById("sheetTitle").textContent="Filtrer";
  const list=document.getElementById("sheetList");
  const chips=(opts,cur,attr)=>`<div class="schips">`+opts.map(([k,l])=>`<button class="chip ${String(cur)===k?'active':''}" data-${attr}="${esc(String(k))}">${esc(l)}</button>`).join("")+`</div>`;
  /* Chantier 25 — la feuille n'offre que ce qui existe, avec les compteurs.
     Les types gardent leur ordre canonique (c'est une petite taxonomie fixe,
     la trier par taille la rendrait mouvante d'un jour à l'autre) ; les
     sources, elles, sont triées par taille : leur liste est longue et n'a pas
     d'ordre propre. La valeur posée reste toujours proposée, même à zéro,
     sinon on ne pourrait plus la retirer d'ici. */
  const scope=scopeRows();
  const nType=k=>k==="all"?scope.length:scope.filter(i=>k==="media"?isMediaType(i.type):i.type===k).length;
  const tOpts=TYPE_FILTERS.filter(([k])=>k==="all"||k===typeFilter||nType(k)>0)
                          .map(([k,l])=>[k,k==="all"?l:l+" · "+nType(k)]);
  const sc={};scope.forEach(i=>{const sr=sourceOf(i);if(sr)sc[sr]=(sc[sr]||0)+1;});
  if(sourceFilter!=="all"&&!sc[sourceFilter])sc[sourceFilter]=0;
  const sKeys=Object.keys(sc).sort((a,b)=>sc[b]-sc[a]||a.localeCompare(b,"fr"));
  const srcOpts=sKeys.length?[["all","Toutes"],...sKeys.map(sr=>[sr,sr+" · "+sc[sr]])]:[];
  const active=(typeFilter!=="all"||sourceFilter!=="all");
  list.innerHTML=`<div class="ssec">Type d’item</div>`+chips(tOpts,typeFilter,"tf")
    +(srcOpts.length?`<div class="ssec">Source</div>`+chips(srcOpts,sourceFilter,"sf"):"")
    +(active?`<button class="srow" data-act="reset"><span>Réinitialiser les filtres</span></button>`:"");
  list.querySelectorAll("[data-tf]").forEach(b=>b.onclick=()=>{typeFilter=b.dataset.tf;closeSheet();renderPileTab();});
  list.querySelectorAll("[data-sf]").forEach(b=>b.onclick=()=>{sourceFilter=b.dataset.sf;closeSheet();renderPileTab();});
  const rb=list.querySelector('[data-act="reset"]');if(rb)rb.onclick=()=>{typeFilter="all";sourceFilter="all";closeSheet();renderPileTab();};
  showSheet();
}
function setSeg(opts,cur,onPick,cols,cls){
  const id=_setId("sg");
  _setWire.push(()=>{
    const el=document.getElementById(id); if(!el)return;
    el.querySelectorAll("button").forEach(b=>b.onclick=()=>{
      el.querySelectorAll("button").forEach(x=>x.classList.remove("on"));
      b.classList.add("on");haptic(8);onPick(b.dataset.k);
    });
  });
  return `<div class="seg${cls?" "+cls:""}" style="--n:${cols||opts.length}" id="${id}">`
    +opts.map(([k,l])=>`<button data-k="${esc(String(k))}" class="${String(cur)===String(k)?"on":""}">${esc(l)}</button>`).join("")
    +`</div>`;
}
function setDays(){
  const id=_setId("sd");
  _setWire.push(()=>{
    const el=document.getElementById(id); if(!el)return;
    el.querySelectorAll("button").forEach(b=>b.onclick=()=>{
      const d=+b.dataset.d,a=surfaceDays().slice(),i=a.indexOf(d);
      /* on ne peut pas décocher le dernier jour : éteindre Surface a UN seul interrupteur */
      if(i>-1){if(a.length===1){toast("Pour tout arrêter, utilise l’interrupteur « Remonter des items ».");return;}a.splice(i,1);}
      else a.push(d);
      settings.surfaceDays=a;saveSettings();renderStage();
      b.classList.toggle("on");haptic(8);
    });
  });
  return `<div class="seg days" style="--n:7" id="${id}">`
    +[[1,"Lun"],[2,"Mar"],[3,"Mer"],[4,"Jeu"],[5,"Ven"],[6,"Sam"],[0,"Dim"]].map(([d,l])=>
      `<button data-d="${d}" class="${surfaceDays().includes(d)?"on":""}">${l}</button>`).join("")+`</div>`;
}
function setMutes(){
  const id=_setId("sm");
  _setWire.push(()=>{
    const el=document.getElementById(id); if(!el)return;
    el.querySelectorAll("button").forEach(b=>b.onclick=()=>{toggleMute(b.dataset.m);openSettingsSheet();});
  });
  return `<div class="setmutes" id="${id}">`+(settings.mutedCats||[]).map(c=>
    `<span class="mutechip">${esc(c)}<button data-m="${esc(c)}" aria-label="Réactiver ${esc(c)}">✕</button></span>`).join("")+`</div>`;
}
/* Réintroduits : ces deux lignes vivaient collées sous openViewSheet et sont
   parties avec elle. _setId nomme les contrôles de la feuille Réglages,
   _setWire garde leurs câblages jusqu'au rendu. */
let _setWire=[];
const _setId=p=>p+Math.random().toString(36).slice(2,7);
const setBox=(t,inner)=>`<div class="setgrp">${esc(t)}</div><div class="setbox">${inner}</div>`;
const setRow=(l,h,c)=>`<div class="setrow"><div class="setlbl">${esc(l)}${h?`<small>${esc(h)}</small>`:""}</div>${c}</div>`;
const setStack=(l,h,c)=>`<div class="setrow stack"><div class="setlbl">${esc(l)}${h?`<small>${esc(h)}</small>`:""}</div>${c}</div>`;

function openSettingsSheet(){
  document.getElementById("sheetTitle").textContent="Réglages";
  document.getElementById("appSheet").classList.add("tall");
  const ha=document.getElementById("sheetHeadAct"); if(ha)ha.innerHTML="";
  const ft=document.getElementById("sheetFoot"); if(ft){ft.hidden=true;ft.innerHTML="";}
  const L=document.getElementById("sheetList");
  const keep=L.scrollTop;
  _setWire=[];

  let h=`<div class="setwrap">`;

  /* v2.42 — le wordmark quitte l'en-tête et vient ici. Ce n'est pas un
     déménagement de commodité : son animation (Reflet / Respiration / Trait)
     n'a de sens que REGARDÉE, et personne ne fixe son en-tête — elle y était
     bruit ou invisible. En tête des Réglages, elle est l'aperçu vivant de ce
     qu'on règle trois lignes plus bas. Le numéro de version ne le suit pas :
     la feuille le dit déjà deux fois (« Actualiser l'application » et le pied),
     et un fait dit deux fois n'a pas besoin d'une troisième forme. */
  h+=`<div class="setwm"><span class="sable-ink">Sable</span></div>`;

  h+=setBox("Général",
     setStack("Au démarrage, ouvrir",null,setSeg(
        [["categories","Collection"],["pile","Ma pile"],["last","Dernier onglet"]],settings.startTab,
        v=>{settings.startTab=v;saveSettings();}))
    +setStack("Thème",null,setSeg(
        [["auto","Auto"],["light","Clair"],["dark","Sombre"]],settings.theme,
        v=>{settings.theme=v;applyTheme();saveSettings();}))
    +setStack("Animation du titre",null,setSeg(
        [["sheen","Reflet"],["breathe","Respiration"],["trait","Trait"],["none","Aucune"]],settings.anim,
        v=>{settings.anim=v;saveSettings();applyAnim();}))
    /* PROVISOIRE (v2.43) — un banc dans l'app, pas un réglage. Il sert à
       trancher sur le corpus réel si la galerie a un sens pour des index qui
       n'ont pas de couverture. Une fois le jugement rendu, il se solde : on
       garde la forme retenue et cette ligne disparaît. Un réglage ne se
       justifie que si deux personnes raisonnables voudraient vraiment
       l'inverse — ici, une seule personne veut comparer. */
    +setRow("Galerie sur tous les index",
        allForms()?"Tags et Sources peuvent s’afficher en galerie."
                  :"La galerie n’existe que pour les catégories.",
        `<button class="swtch${allForms()?" on":""}" id="swIdxForms" role="switch" aria-checked="${allForms()}" aria-label="Galerie sur tous les index"></button>`));

  /* ---------- chantier 26 : « À trier » remonte juste après Général ----------
     C'est un groupe d'où l'on AGIT — un chiffre, un chemin — pas un groupe où
     l'on règle. Rangé en troisième position derrière un nom passif, son propre
     auteur ne savait pas qu'il était là (corollaire du cap 09).
     Chaque ligne se calcule à la volée, aucun historique stocké. Une ligne à
     zéro n'apparaît pas ; tout à zéro, le groupe se réduit à une ligne calme.
     Les sourdines (état délibéré) y ont leur seul foyer. */
  const nUnfiled=items.filter(i=>i.status==="active"&&!i.domain).length;
  const nNever=items.filter(neverSurfacedYoung).length;
  const nDormant=items.filter(isDormant).length;
  const muted=(settings.mutedCats||[]).length;
  const statLine=(id,l,hint,n)=>`<button class="setact statline" id="${id}"><span class="setlbl">${esc(l)}<small>${esc(hint)}</small></span><span class="statright">${n==null?"":`<span class="statn">${n}</span>`}<span class="chev">›</span></span></button>`;
  let stat="";
  if(nUnfiled)              stat+=statLine("stUnfiled","Non classés","À ranger dans une catégorie.",nUnfiled);
  if(surfaceOn()&&nNever)   stat+=statLine("stNever","Jamais remontés","La remontée ne les a pas encore montrés.",nNever);
  if(nDormant)              stat+=statLine("stDormant","Dormants","6 mois et plus sans jamais resurgir.",nDormant);
  if(muted)                 stat+=setStack("En sourdine","Elles ne remontent pas ; une date posée sur un item l’emporte quand même.",setMutes());
  if(!stat)                 stat=`<div class="setempty"><span class="setok">✓</span>Rien à trier — tout est à jour.</div>`;
  /* La porte de secours du rituel entre ici : elle vivait sur l'écran de repos
     de l'onglet Surface, écran parti avec l'onglet (chantier 22). Sans elle, un
     rituel fini fermerait la seule entrée de la remontée jusqu'au lendemain. */
  if(surfaceOn()&&risePool().length)
    stat+=statLine("stPull","Faire remonter un item maintenant","Hors rituel : le tirage du lendemain n’est pas touché.",null);
  h+=setBox("À trier",stat);

  let surf=setRow("Remonter des items",
      surfaceOn()?"Un tirage à l’ouverture de l’app.":"Plus rien ne remonte, et l’accueil n’en parle plus.",
      `<button class="swtch${surfaceOn()?" on":""}" id="swSurface" role="switch" aria-checked="${surfaceOn()}" aria-label="Remonter des items"></button>`);
  if(surfaceOn()){
    surf+=setRow("Items par tirage","Un rituel court se termine.",setSeg(
        [["1","1"],["3","3"],["5","5"]],settings.batchSize,
        v=>{settings.batchSize=+v;saveSettings();buildBatch();renderStage();renderBadges();},3,"num"))
      +setStack("Rythme",null,setSeg(
        [["daily","Chaque jour"],["every2","Un jour sur 2"],["weekly","Chaque semaine"]],surfaceFreq(),
        v=>{settings.surfaceFreq=v;saveSettings();renderBadges();openSettingsSheet();}));
    /* Les jours actifs ne valent que pour le rythme quotidien : pour les autres
       la cadence se déduit du dernier tirage, sinon deux réglages se contredisent. */
    if(surfaceFreq()==="daily")surf+=setStack("Jours actifs",null,setDays());
  }
  /* Dernier mot du tableau de vocabulaire du cap 09 : « Surface » quitte l'UI.
     Il partait avec ce chantier, pas avant — renommer un onglet la veille de le
     supprimer coûtait deux passes sur les mêmes lignes. */
  h+=setBox("La remontée",surf);

  /* Le groupe « Ma pile » a disparu (chantier 13) : la vue et la densité se
     changent en contexte, elles vivent dans la barre d'axes — et les trois
     densités ont fondu dans liste / compact. */
  h+=setBox("Données",
     `<button class="setact" id="setExport">Exporter ma pile<em>JSON</em></button>`
    +`<button class="setact" id="setImport">Importer un export<span class="chev">›</span></button>`);

  h+=setBox("Application",
     `<button class="setact" id="setRefresh">Actualiser l'application<em>${esc(APP_VERSION)}</em></button>`);

  h+=setBox("À propos",
     `<a class="setact" href="mailto:sable@dartois.studio?subject=%5BSable-Bug%5D%20">Signaler un bug<span class="chev">›</span></a>`
    +`<a class="setact" href="mailto:sable@dartois.studio?subject=%5BSable-Enhancement%5D%20">Proposer une amélioration<span class="chev">›</span></a>`
    +`<a class="setact" href="https://dartois.studio" target="_blank" rel="noopener">Site<em>dartois.studio</em></a>`
    +`<a class="setact" href="https://github.com/dartois-studio/Sable" target="_blank" rel="noopener">Code source<em>GitHub</em></a>`);

  h+=`<div class="setfoot">Sable ${APP_VERSION} · sable@dartois.studio<br>Fait par Dartois Studio · réglages mémorisés sur cet appareil</div>`
    +`<div class="setbox"><button class="setact danger" id="setSignout">Se déconnecter</button></div>`;

  h+=`</div>`;
  L.innerHTML=h;
  _setWire.forEach(f=>f());
  wireInk(L);

  const swf=document.getElementById("swIdxForms");
  if(swf)swf.onclick=()=>{
    settings.idxAllForms=!allForms();
    saveSettings();
    renderRoot();          /* l'index retombe en liste si la galerie s'en va */
    openSettingsSheet();   /* la précision de la ligne change avec l'état */
  };

  const sw=document.getElementById("swSurface");
  if(sw)sw.onclick=()=>{
    settings.surfaceOn=!surfaceOn();
    if(settings.surfaceOn){batch={date:"",ids:[],idx:0};saveBatch();}   // rallumé = un tirage est dû
    saveSettings();
    /* Éteinte, la remontée n'a plus d'onglet à masquer (chantier 22) : elle
       n'a plus qu'une invitation à retirer de l'accueil, et une surface à
       refermer si elle était ouverte. */
    if(!surfaceOn())closeRemontee();
    renderAll();openSettingsSheet();
  };
  const bindStat=(id,fn)=>{const b=document.getElementById(id);if(b)b.onclick=()=>{closeSheet(true);fn();};};
  bindStat("stUnfiled",()=>{enterCollection("none");enterSel();});
  bindStat("stNever",bringForward);
  bindStat("stDormant",enterDormant);
  bindStat("stPull",pullNow);
  const rf=document.getElementById("setRefresh"); if(rf)rf.onclick=refreshApp;
  document.getElementById("setExport").onclick=()=>{exportData();};
  document.getElementById("setImport").onclick=()=>document.getElementById("fImport").click();
  document.getElementById("setSignout").onclick=async()=>{try{await _sb.auth.signOut();}catch(e){}location.reload();};

  L.scrollTop=keep;   /* on ne remonte jamais l’écran tout seul */
  showSheet();
}
/* Le compteur « N en pile » est supprimé (chantier 11) : information non
   consultée, sur la meilleure ligne de l'app. Ce qui mérite d'être compté
   le sera dans « État de la pile », où chaque chiffre porte un chemin. */
/* La surface n'est plus une section de la piste : on ne la redessine que si
   elle est ouverte. Le tirage, lui, a toujours lieu à l'ouverture de l'app —
   `ensureBatch()` remonte donc ici, sinon une invitation pourrait s'afficher
   avant que le tirage du jour n'existe. */
function renderAll(){ensureBatch();if(riseOpen())renderStage();renderPileTab();renderCategories();uiReady=true;}

/* ---------- fiche d'un grain (édition) ----------
   Deux blocs : en haut le grain tel qu'il est, en bas son rangement.
   Tout ce qui ne sert pas en permanence (couverture, lien, remontée
   programmée, liste complète des catégories) est replié derrière un
   seul bouton — sinon la fiche redevient un mur de pastilles. */
let editingGrain=null;
let editTint="ocre";
function openGrainSheet(id){
  const it=items.find(i=>i.id===id); if(!it)return;
  editingGrain=id;
  editTint=it.iconTint||"ocre";
  const isNote=it.type==="note";
  const isLink=it.type==="youtube"||it.type==="link";
  const ytThumb=(it.type==="youtube"&&ytId(it.url))?("https://img.youtube.com/vi/"+ytId(it.url)+"/hqdefault.jpg"):null;
  const cands=[];
  (it.previews||[]).forEach(u=>{if(u&&!cands.includes(u))cands.push(u);});
  if(it.preview&&!cands.includes(it.preview))cands.unshift(it.preview);
  if(ytThumb&&!cands.includes(ytThumb))cands.push(ytThumb);
  let chosenPreview=it.preview||ytThumb||cands[0]||null;
  let pickedDom=it.domain||"";
  let pickedTags=[...(it.tags||[])];
  let when=it.surfaceAfter||null;
  let whenOpen=!!when;
  let titleOpen=!!it.title;

  const sh=document.getElementById("appSheet");
  sh.classList.add("tall");
  document.getElementById("sheetTitle").textContent="Item · "+typeLabel(it);

  /* en-tête : actions rares, mais atteignables sans défiler — et jamais collées à Enregistrer */
  document.getElementById("sheetHeadAct").innerHTML=
    `<button class="sheadbtn" id="gArch" title="${it.status==="archived"?"Remettre en pile":"Mettre de côté"}" aria-label="${it.status==="archived"?"Remettre en pile":"Mettre de côté"}">${icon(it.status==="archived"?"restore":"archive")}</button>`+
    `<button class="sheadbtn danger" id="gTrash" title="Jeter" aria-label="Jeter">${icon("trash")}</button>`;

  /* pied : l'action principale, toujours sous le pouce */
  const F=document.getElementById("sheetFoot");
  F.hidden=false;
  F.innerHTML=`<button class="gsave clean" id="gSave"><span class="dot"></span><span id="gSaveLbl">À jour</span></button>`;

  const L=document.getElementById("sheetList");
  L.innerHTML=`
    <div class="gprev" id="gPrevWrap"${chosenPreview?"":" hidden"}><img class="zoomable${isIcon(chosenPreview)?' iconcov':''}" id="gPrevImg" data-full="${esc(coverSrcU(chosenPreview,editTint))}" src="${esc(coverSrcU(chosenPreview,editTint))}" alt=""></div>
    <div class="covline"><button class="covedit" id="covToggle">${icon("pencil")}${chosenPreview?"Changer l'image":"Ajouter une image"}</button></div>
    <div id="covMount" hidden>
      <div class="gfld" style="padding-top:10px">
        <div class="gpicker" id="gPicker">${cands.map(u=>`<div class="gpickwrap"><button class="gpick${u===chosenPreview?' active':''}${isIcon(u)?' gpickicon':''}" data-u="${esc(u)}"><img src="${esc(coverSrcU(u,editTint))}" alt="" loading="lazy"></button><button class="gpickdel" data-del="${esc(u)}" aria-label="Retirer">✕</button></div>`).join("")}<button class="gpick gpicknone${chosenPreview?'':' active'}" data-u="" title="Aucune couverture">${icon('nocover')}</button></div>
        <div class="tintrow" id="gTintRow"${isIcon(chosenPreview)?"":" hidden"}></div>
        <div class="covsrc">
          <button class="covbtn" data-src="gallery">Galerie</button>
          <button class="covbtn" data-src="paste">Coller</button>
          <button class="covbtn" data-src="link">Lien</button>
          <button class="covbtn" data-src="icon">Icône</button>
          ${isLink?`<button class="covbtn" id="gRefresh">Rafraîchir</button>`:""}
        </div>
        <div id="covExtra"></div>
        <input type="file" id="covFile" accept="image/*" hidden>
      </div>
    </div>
    ${isNote
      ? `<textarea class="gtext" id="gContent" rows="1" placeholder="Ta note…">${esc(it.content||"")}</textarea><div id="titleMount"></div>`
      : `<textarea class="gtitle" id="gTitle" rows="1" placeholder="Sans titre">${esc(it.title||"")}</textarea>`}
    ${isLink?`<div id="urlMount"></div>`:""}
    ${it.hasMedia?`<div class="gfld" style="padding-top:10px"><span>Fichier</span><div class="gfile">${esc(it.content||"")}</div></div>`:""}

    <div class="gsplit"><b>Rangement</b></div>

    <div class="gfld bleed"><label class="pad"><b>Catégorie</b><i>une seule</i></label>
      <div class="scrollrow" id="domRow"></div>
      <div class="pad" id="domPick"></div>
    </div>

    <div class="gfld"><label><b>Tags</b><i>autant que tu veux</i></label>
      <div class="tagsel" id="tagSel"></div>
      <input id="tagInput" placeholder="Ajouter un tag…" autocomplete="off" autocapitalize="off" enterkeyhint="done">
      <div id="tagSug"></div>
    </div>

    <div class="gfld"><label><b>Note</b></label>
      <textarea id="gNote" rows="3" placeholder="Pourquoi tu l'as gardé, un contexte, une intention…">${esc(it.note||"")}</textarea>
    </div>

    <div id="whenMount"></div>`;

  const gTitle=()=>L.querySelector("#gTitle");
  const gContent=L.querySelector("#gContent");
  const gNote=L.querySelector("#gNote");
  const autogrow=el=>{if(!el)return;el.style.height="auto";el.style.height=(el.scrollHeight+2)+"px";};
  const wireGrow=el=>{if(!el)return;autogrow(el);el.addEventListener("input",()=>autogrow(el));};
  wireGrow(gTitle());wireGrow(gContent);

  /* ---- suivi des modifications : le bouton dit s'il y a quelque chose à enregistrer ---- */
  const snap=()=>JSON.stringify([
    gTitle()?gTitle().value.trim():(it.title||""),
    gContent?gContent.value.trim():"",
    L.querySelector("#gUrl")?L.querySelector("#gUrl").value.trim():(it.url||""),
    gNote.value.trim(),pickedDom,pickedTags.join("|"),when,
    chosenPreview||"",editTint,
    [...L.querySelectorAll(".gpick:not(.gpicknone)")].map(b=>b.dataset.u).join("|")]);
  let base=snap(),dirty=false;
  function touch(){
    dirty=(snap()!==base);
    const b=F.querySelector("#gSave");if(!b)return;
    b.classList.toggle("clean",!dirty);
    const lbl=F.querySelector("#gSaveLbl");if(lbl)lbl.textContent=dirty?"Enregistrer":"À jour";
  }
  L.addEventListener("input",touch);

  /* ---- couverture : toute la machinerie existante, repliée derrière un bouton ---- */
  const covMount=L.querySelector("#covMount"),covToggle=L.querySelector("#covToggle");
  covToggle.onclick=()=>{covMount.hidden=!covMount.hidden;if(!covMount.hidden)covMount.scrollIntoView({block:"nearest",behavior:"smooth"});};
  const iconSrcNow=(u)=>coverSrcU(u,editTint);
  const refreshTintRow=()=>{
    const row=L.querySelector("#gTintRow");if(!row)return;
    const show=isIcon(chosenPreview);row.hidden=!show;
    if(!show){row.innerHTML="";return;}
    row.innerHTML=ICON_TINT_ORDER.map(k=>`<button class="tintsw${k===editTint?' active':''}" data-tint="${k}" title="${ICON_TINT_LABEL[k]}" style="color:${tintHex(k)}">${icon('tint')}</button>`).join("");
    row.querySelectorAll(".tintsw").forEach(b=>b.onclick=()=>setTint(b.dataset.tint));
  };
  const setTint=(k)=>{
    editTint=k;
    const img=L.querySelector("#gPrevImg");
    if(img&&isIcon(chosenPreview)){const s2=iconSrcNow(chosenPreview);img.src=s2;img.setAttribute("data-full",s2);}
    L.querySelectorAll("#gPicker .gpick").forEach(b=>{const u=b.dataset.u||"";if(isIcon(u)){const im=b.querySelector("img");if(im)im.src=iconSrcNow(u);}});
    L.querySelectorAll("#covExtra img[data-base]").forEach(im=>{im.src=iconBase(im.getAttribute("data-base"))+"&color="+encodeURIComponent(tintHex(editTint));});
    L.querySelectorAll("#gTintRow .tintsw").forEach(b=>b.classList.toggle("active",b.dataset.tint===editTint));
    touch();
  };
  const setCover=(u)=>{
    chosenPreview=u||null;
    const wrap=L.querySelector("#gPrevWrap"),img=L.querySelector("#gPrevImg");
    if(chosenPreview){if(img){const s2=iconSrcNow(chosenPreview);img.src=s2;img.setAttribute("data-full",s2);img.classList.toggle("iconcov",isIcon(chosenPreview));}if(wrap)wrap.hidden=false;}
    else if(wrap)wrap.hidden=true;
    L.querySelectorAll(".gpick").forEach(b=>b.classList.toggle("active",(b.dataset.u||"")===(chosenPreview||"")));
    refreshTintRow();touch();
  };
  const wireThumb=(wrap,u)=>{
    wrap.querySelector(".gpick").onclick=()=>setCover(u);
    wrap.querySelector(".gpickdel").onclick=e=>{e.stopPropagation();wrap.remove();if(chosenPreview===u){const first=L.querySelector(".gpick:not(.gpicknone)");setCover(first?(first.dataset.u||""):"");}else touch();};
  };
  const addCoverThumb=(u)=>{
    if(!u)return;const picker=L.querySelector("#gPicker");if(!picker)return;
    const key=isIcon(u)?iconBase(u):u;
    const exist=[...picker.querySelectorAll(".gpick")].find(b=>(b.dataset.u||"")===key);
    if(exist){setCover(key);return;}
    const wrap=document.createElement("div");wrap.className="gpickwrap";
    wrap.innerHTML=`<button class="gpick${isIcon(key)?' gpickicon':''}" data-u="${esc(key)}"><img src="${esc(iconSrcNow(key))}" alt="" loading="lazy"></button><button class="gpickdel" data-del="${esc(key)}" aria-label="Retirer">✕</button>`;
    picker.insertBefore(wrap,picker.querySelector(".gpicknone"));
    wireThumb(wrap,key);setCover(key);
  };
  L.querySelectorAll("#gPicker .gpickwrap").forEach(w=>{const b=w.querySelector(".gpick");if(b)wireThumb(w,b.dataset.u||"");});
  const noneBtn=L.querySelector(".gpicknone"); if(noneBtn)noneBtn.onclick=()=>setCover("");
  refreshTintRow();
  const extra=L.querySelector("#covExtra"),covFile=L.querySelector("#covFile");
  if(covFile)covFile.onchange=async()=>{const f=covFile.files&&covFile.files[0];covFile.value="";if(!f)return;try{addCoverThumb(await fileToImage(f,900,.72));}catch(e){toast("Image illisible.");}};
  L.querySelectorAll(".covbtn").forEach(b=>b.onclick=async()=>{
    const src=b.dataset.src;
    if(!src)return;
    if(src==="gallery"){if(covFile)covFile.click();return;}
    if(src==="paste"){
      try{
        const cis=await navigator.clipboard.read();
        for(const ci of cis){const t=ci.types.find(x=>x.startsWith("image/"));if(t){const f=new File([await ci.getType(t)],"collee",{type:t});addCoverThumb(await fileToImage(f,900,.72));return;}}
        toast("Aucune image dans le presse-papier.");
      }catch(e){toast("Collage non autorisé par le navigateur.");}
      return;
    }
    if(src==="link"){
      extra.innerHTML=`<div class="covrow"><input id="covLink" placeholder="https://…/image.jpg" inputmode="url" autocapitalize="off" autocomplete="off" spellcheck="false"><button class="chip" id="covLinkOk">OK</button></div>`;
      const inp=extra.querySelector("#covLink");inp.focus();
      extra.querySelector("#covLinkOk").onclick=()=>{const v=(inp.value||"").trim();if(!/^https?:\/\//i.test(v)){toast("Lien d'image invalide.");return;}addCoverThumb(proxImg(v)||v);extra.innerHTML="";};
      return;
    }
    if(src==="icon"){openIconSearch(extra,addCoverThumb);return;}
  });
  const rf=L.querySelector("#gRefresh"); if(rf)rf.onclick=async()=>{if(dirty)await commit();refreshPreview(id);};

  /* ---- titre d'une note : facultatif, donc absent tant qu'il n'existe pas ---- */
  function drawTitleOpt(){
    const m=L.querySelector("#titleMount");if(!m)return;
    if(!titleOpen){
      m.innerHTML=`<button class="linkbtn" id="addTitle" style="padding-top:8px">Ajouter un titre…</button>`;
      m.querySelector("#addTitle").onclick=()=>{titleOpen=true;drawTitleOpt();const t=gTitle();if(t)t.focus();};
    }else{
      m.innerHTML=`<div class="gfld" style="padding-top:10px"><label><b>Titre</b></label><input id="gTitle" value="${esc(it.title||"")}" placeholder="Titre de l’item" autocomplete="off"></div>`;
    }
  }
  if(isNote)drawTitleOpt();

  /* ---- lien : replié derrière son domaine, il ne sert qu'à corriger ---- */
  let urlOpen=false;
  function drawUrl(){
    const m=L.querySelector("#urlMount");if(!m)return;
    if(!urlOpen){
      m.innerHTML=`<button class="gsrc" id="urlEdit">${icon("pencil")}<span>${esc(hostOf(it.url)||it.url||"")}</span></button>`;
      m.querySelector("#urlEdit").onclick=()=>{urlOpen=true;drawUrl();};
    }else{
      m.innerHTML=`<div class="gfld" style="padding-top:12px"><label><b>Lien</b></label><input id="gUrl" value="${esc(it.url||"")}" inputmode="url" autocapitalize="off" autocomplete="off" spellcheck="false"></div>`;
      const i2=m.querySelector("#gUrl");if(i2)i2.focus();
    }
  }
  if(isLink)drawUrl();

  /* ---- catégorie : 6 pastilles sur une ligne, tout le reste derrière une porte ---- */
  const domRow=L.querySelector("#domRow"),domPick=L.querySelector("#domPick");
  function drawDom(){
    const counts=domCounts();
    let all=allCats().slice().sort((a,b)=>(counts[b]||0)-(counts[a]||0)||a.localeCompare(b,"fr"));
    if(pickedDom)all=[pickedDom,...all.filter(d=>d!==pickedDom)];
    domRow.innerHTML=all.slice(0,6).map(d=>`<button class="chip${d===pickedDom?" on":""}" data-d="${esc(d)}">${esc(d)}</button>`).join("")
      +`<button class="chip ghost" id="catAll">Toutes…</button>`;
    domRow.querySelectorAll("[data-d]").forEach(b=>b.onclick=()=>{
      pickedDom=(b.dataset.d===pickedDom)?"":b.dataset.d;domPick.innerHTML="";drawDom();touch();haptic(10);});
    domRow.querySelector("#catAll").onclick=()=>drawPick();
  }
  /* parcourir et créer sont le même geste : on tape, on choisit ou on crée */
  function drawPick(){
    domPick.innerHTML=`<div class="picklist">
      <input id="catQ" placeholder="Chercher ou créer une catégorie…" autocomplete="off">
      <div class="pickscroll" id="catRes"></div></div>`;
    const q=domPick.querySelector("#catQ"),res=domPick.querySelector("#catRes");
    const counts=domCounts();
    const draw=()=>{
      const v=q.value.trim(),k=tagKey(v);
      const hits=allCats().filter(d=>!k||tagKey(d).includes(k));
      const exact=hits.some(d=>tagKey(d)===k);
      res.innerHTML=hits.map(d=>`<button class="pickrow${d===pickedDom?" on":""}" data-d="${esc(d)}"><span>${esc(d)}</span><span class="n">${counts[d]||0}</span></button>`).join("")
        +(v&&!exact?`<button class="pickrow new" data-new="1"><span>Créer « ${esc(v)} »</span><span class="n">+</span></button>`:"")
        +(!hits.length&&!v?`<div class="pickempty">Aucune catégorie pour l'instant.</div>`:"");
      res.querySelectorAll("[data-d]").forEach(b=>b.onclick=()=>{pickedDom=b.dataset.d;domPick.innerHTML="";drawDom();touch();haptic(10);});
      const nb=res.querySelector("[data-new]");
      if(nb)nb.onclick=()=>{pickedDom=v;domPick.innerHTML="";drawDom();touch();haptic(10);};
    };
    q.addEventListener("input",draw);
    draw();q.focus();
  }
  drawDom();

  /* ---- tags : plusieurs, libres, transversaux ---- */
  const tagSel=L.querySelector("#tagSel"),tagInput=L.querySelector("#tagInput"),tagSug=L.querySelector("#tagSug");
  let tagPickGuard=false;   /* vrai le temps d'un tap sur une suggestion, pour que le blur ne vole pas le clic */
  function addTag(raw){
    const t=normTag(raw);if(!t)return;
    if(pickedTags.some(x=>tagKey(x)===tagKey(t)))return;   /* même à la casse et aux accents près */
    pickedTags.push(t);drawTags();touch();haptic(10);
  }
  function removeTag(t){pickedTags=pickedTags.filter(x=>x!==t);drawTags();touch();}
  function drawTags(){
    tagSel.innerHTML=pickedTags.map(t=>`<span class="tagchip"><span class="taghash">#</span>${esc(t)}<button class="x" data-rm="${esc(t)}" aria-label="Retirer ${esc(t)}">✕</button></span>`).join("");
    tagSel.querySelectorAll("[data-rm]").forEach(b=>b.onclick=()=>removeTag(b.dataset.rm));
    drawSug();
  }
  function drawSug(){
    /* au repos : rien. La liste des tags déjà utilisés ne sert qu'une fois qu'on tape. */
    const q=tagKey(tagInput.value);
    if(!q){tagSug.innerHTML="";return;}
    const hits=tagLib().filter(t=>!pickedTags.some(x=>tagKey(x)===tagKey(t))).filter(t=>tagKey(t).includes(q)).slice(0,8);
    if(!hits.length){tagSug.innerHTML="";return;}
    tagSug.innerHTML=`<div class="tagsug">${hits.map(t=>`<button class="chip" data-t="${esc(t)}"><span class="taghash">#</span>${esc(t)}</button>`).join("")}</div>`;
    tagSug.querySelectorAll("[data-t]").forEach(b=>{
      b.addEventListener("pointerdown",()=>{tagPickGuard=true;});
      b.onclick=()=>{tagPickGuard=false;addTag(b.dataset.t);tagInput.value="";tagInput.focus();drawSug();};
    });
  }
  tagInput.addEventListener("input",drawSug);
  tagInput.addEventListener("keydown",e=>{
    if(e.key==="Enter"||e.key===","){e.preventDefault();addTag(tagInput.value);tagInput.value="";drawSug();}
    else if(e.key==="Backspace"&&!tagInput.value&&pickedTags.length){removeTag(pickedTags[pickedTags.length-1]);}
  });
  tagInput.addEventListener("blur",()=>{if(tagPickGuard){tagPickGuard=false;return;}if(tagInput.value.trim()){addTag(tagInput.value);tagInput.value="";drawSug();}});
  drawTags();

  /* ---- remontée programmée : une donnée, pas encore une fonctionnalité.
         Le tirage la consultera au chantier 7 ; ici on la pose seulement. ---- */
  const whenMount=L.querySelector("#whenMount");
  const plusM=m=>{const d=new Date();d.setMonth(d.getMonth()+m);d.setHours(9,0,0,0);return d.getTime();};
  function drawWhen(){
    if(!whenOpen){
      whenMount.innerHTML=`<button class="linkbtn" id="whenOpen">Programmer une remontée…</button>`;
      whenMount.querySelector("#whenOpen").onclick=()=>{whenOpen=true;drawWhen();};
      return;
    }
    const opts=[[1,"Dans 1 mois"],[3,"Dans 3 mois"],[6,"Dans 6 mois"]];
    whenMount.innerHTML=`<div class="gfld"><label><b>Ne pas remonter avant</b></label>
      <div class="chiprow">${opts.map(([m,l])=>`<button class="chip${(when&&Math.abs(when-plusM(m))<432e5)?" on":""}" data-m="${m}">${l}</button>`).join("")}</div>
      <input type="date" id="whenDate" value="${when?toDateInput(when):""}">
      <div class="whensum">${when?("Cet item ne ressortira pas avant le "+esc(fmtDay(when))+"."):"Sans date, il peut remonter n’importe quand."}</div>
    </div>
    <button class="linkbtn" id="whenClear">Retirer la remontée programmée</button>`;
    whenMount.querySelectorAll("[data-m]").forEach(b=>b.onclick=()=>{when=plusM(+b.dataset.m);drawWhen();touch();haptic(10);});
    whenMount.querySelector("#whenDate").onchange=e=>{const v=e.target.value;when=v?new Date(v+"T09:00:00").getTime():null;drawWhen();touch();};
    whenMount.querySelector("#whenClear").onclick=()=>{when=null;whenOpen=false;drawWhen();touch();};
  }
  drawWhen();

  /* ---- enregistrement ---- */
  async function commit(){
    const t=gTitle();
    if(t)it.title=(t.value.trim())||null;
    if(gContent){const c=gContent.value.trim();if(c)it.content=c;}
    const gu=L.querySelector("#gUrl");
    let urlChanged=false;
    if(gu){const nu=gu.value.trim(); if(nu&&nu!==it.url){urlChanged=true;const d=detectType(nu);it.url=d.url||nu;it.type=d.type;it.content=nu;it.preview=null;it.previews=[];}}
    it.note=gNote.value.trim();
    it.domain=pickedDom||null;
    it.tags=pickedTags.map(normTag).filter(Boolean);
    it.surfaceAfter=when||null;
    /* un lien remplace repart de zero cote apercu : on ne recolle pas l'ancienne image */
    if(!urlChanged){
      if(L.querySelector("#gPicker"))it.previews=[...L.querySelectorAll(".gpick:not(.gpicknone)")].map(b=>b.dataset.u).filter(Boolean);
      it.preview=chosenPreview||null;
    }
    it.iconTint=editTint;
    base=snap();dirty=false;
    await saveItems();renderAll();
    if(it.url&&(!it.preview||!it.title))enrich(it.id);
  }
  /* fermer le panneau ne doit jamais faire perdre une correction */
  onSheetClose=()=>{if(dirty){commit();toast("Item mis à jour.");}};

  document.getElementById("gArch").onclick=async()=>{
    if(dirty)await commit();
    const cur=items.find(i=>i.id===id);
    if(cur)cur.status=cur.status==="archived"?"active":"archived";
    await saveItems();renderAll();closeSheet(true);
    toast(cur&&cur.status==="archived"?"Mis de côté.":"Remis en pile.");
  };
  document.getElementById("gTrash").onclick=async()=>{
    const cur=items.find(i=>i.id===id);
    if(cur){cur.status="trashed";lastTrashed=id;}
    await saveItems();renderAll();closeSheet(true);toast("Jeté.",true);
  };
  F.querySelector("#gSave").onclick=async()=>{
    if(!dirty){closeSheet(true);return;}
    await commit();closeSheet(true);haptic(14);toast("Item mis à jour.");
  };

  touch();
  showSheet();
}
function openIconSearch(container,onPick){
  const col=()=>encodeURIComponent(tintHex(editTint));
  const idOf=(base)=>base.replace(/^https?:\/\/api\.iconify\.design\//,"").replace(/\.svg.*$/,"");
  const cell=(base)=>`<button class="iconcell" data-base="${esc(base)}" title="${esc(idOf(base))}"><img data-base="${esc(base)}" src="${esc(iconBase(base))}&color=${col()}" alt="" loading="lazy"></button>`;
  const recents=(settings.iconRecents||[]);
  const sugg=ICON_SUGGEST.map(ic=>"https://api.iconify.design/"+ic+".svg?height=240");
  container.innerHTML=
    (recents.length?`<div class="traylbl">Récents</div><div class="icontray recents">${recents.map(cell).join("")}</div>`:"")
    +`<div class="traylbl">Suggérées</div><div class="icontray">${sugg.map(cell).join("")}</div>`
    +`<div class="covrow" style="margin-top:10px"><input id="iconQ" placeholder="Chercher une autre icône (coffee, book…)" autocomplete="off" autocapitalize="off"></div>`
    +`<div class="iconres" id="iconRes"></div>`;
  const pick=(base)=>{const b=iconBase(base);pushIconRecent(b);onPick(b);};
  container.querySelectorAll(".icontray .iconcell").forEach(b=>b.onclick=()=>pick(b.dataset.base));
  const q=container.querySelector("#iconQ"),res=container.querySelector("#iconRes");
  let t;
  const run=async()=>{
    const term=q.value.trim();
    if(term.length<2){res.innerHTML="";return;}
    res.innerHTML=`<div class="iconhint">Recherche…</div>`;
    try{
      const r=await fetch("https://api.iconify.design/search?query="+encodeURIComponent(term)+"&limit=48");
      const j=await r.json();const icons=(j&&j.icons)||[];
      if(!icons.length){res.innerHTML=`<div class="iconhint">Aucune icône trouvée.</div>`;return;}
      res.innerHTML=`<div class="icontray">`+icons.map(ic=>cell("https://api.iconify.design/"+ic+".svg?height=240")).join("")+`</div>`;
      res.querySelectorAll(".iconcell").forEach(b=>b.onclick=()=>pick(b.dataset.base));
    }catch(e){res.innerHTML=`<div class="iconhint">Recherche indisponible (réseau).</div>`;}
  };
  q.addEventListener("input",()=>{clearTimeout(t);t=setTimeout(run,320);});
}
async function refreshPreview(id){
  const it=items.find(i=>i.id===id); if(!it||!it.url){toast("Aucun lien à rafraîchir.");return;}
  it.preview=null; it.previews=[]; await saveItems();
  toast("Recherche de l'aperçu…");
  await enrich(id);
  const cur=items.find(i=>i.id===id);
  if(cur&&!cur.preview)toast("Aperçu introuvable (le site bloque peut-être les robots).");
  if(editingGrain===id)openGrainSheet(id);
}

/* ---------- toast ---------- */
let toastT;
function toast(msg,action){
  const t=document.getElementById("toast");
  let label=null,fn=null,long=false;
  if(action===true){label="annuler";fn=undoTrash;long=true;}
  else if(action&&typeof action==="object"){label=action.label;fn=action.fn;long=true;}
  t.innerHTML=esc(msg)+(label?`<span class="u" id="toastAct">${esc(label)}</span>`:"");
  t.classList.add("show");
  if(label){document.getElementById("toastAct").onclick=()=>{t.classList.remove("show");if(fn)fn();};}
  clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove("show"),long?4600:2200);
}

/* ---------- wiring ---------- */
document.getElementById("searchInput").addEventListener("input",onSearchInput);
document.getElementById("fabAdd").onclick=openCaptureSheet;
document.getElementById("fPhoto").onchange=e=>{routeFile(e.target.files[0]);e.target.value="";};
document.getElementById("fFile").onchange=e=>{Array.from(e.target.files).forEach(routeFile);e.target.value="";};
document.addEventListener("paste",e=>{const cd=e.clipboardData;if(!cd)return;for(const it of cd.items){if(it.type&&it.type.startsWith("image/")){const f=it.getAsFile();if(f){e.preventDefault();addImageFile(f);return;}}}});
document.getElementById("fImport").onchange=e=>{if(e.target.files[0])importData(e.target.files[0]);e.target.value="";};
/* `applySurfaceTab()` a disparu avec l'onglet (chantier 22) : il n'y a plus de
   section conditionnelle à masquer, donc plus de `hidden` à faire coller à
   `tabOrder()`. C'est le bénéfice structurel du chantier — le décalage d'un
   cran dans la piste, qui a coûté un écran blanc en v2.22, ne peut plus se
   produire du tout. */
function selectTab(name){
  if(!TAB_ORDER.includes(name))name="categories";
  /* La recherche est globale, mais son champ occupe la ligne du titre : le
     laisser ouvert en changeant d'onglet cacherait le titre du nouvel onglet,
     donc son menu. Changer d'onglet la referme. */
  closeSearch();
  popLayer("sel");
  selMode=false;selIds.clear();document.body.classList.remove("selecting","hasSel");
  document.querySelectorAll(".tabs button").forEach(x=>x.classList.toggle("active",x.dataset.tab===name));
  curTab=name;paintTabs(name,0,true);
  settings.lastTab=name;saveSettings();
  updateNavTitle();
  if(name==="pile")renderPileTab();
  else if(name==="categories")renderCategories();
  /* v2.44 — l'onglet est une couche, mais une seule : quitter l'onglet de départ
     empile un cran, y revenir le rend. C'est la convention Android (le retour
     ramène à l'onglet de départ avant de sortir), et c'est ce qui fait qu'un
     retour depuis Ma pile ne quitte plus l'app. */
  if(name===startTab())popLayer("tab");
  else pushLayer("tab",()=>selectTab(startTab()));
}
/* ---------- chantier 5 : glissé entre onglets ----------
   Accélérateur, rien d'autre : aucun geste n'est le seul moyen de faire une
   action, la barre du bas fait toujours la même chose.
   Le geste est refusé d'emblée s'il part du bord de l'écran (c'est le retour
   système sur Android), pendant une sélection par lot, ou s'il naît dans une
   rangée qui défile horizontalement — le contenu passe avant l'accélérateur.
   Rien n'est décidé avant 10 px : en dessous, on ne sait pas encore si le doigt
   défile ou change d'onglet. Au-delà, |dx| doit dépasser |dy| × 1,6, sinon le
   geste est rendu au défilement vertical, et définitivement. */
/* Collection en TÊTE (chantier 22) : elle est l'accueil depuis la v2.38 mais
   occupait encore la troisième place, si bien qu'on ouvrait l'app tout à droite
   du glissé. Deux sections, aucune conditionnelle : `tabOrder()` reste, mais il
   ne filtre plus rien. */
const TAB_ORDER=["categories","pile"];
function tabOrder(){return TAB_ORDER;}
/* La piste est un rail : la position horizontale d'une section est son RANG DANS
   LE DOM, pas sa place dans `TAB_ORDER`. Les deux doivent coïncider, et deux
   fichiers ne peuvent pas se tenir d'accord tout seuls — c'est ce décalage d'un
   cran qui a coûté un écran blanc en v2.22, et un second en v2.39 : `TAB_ORDER`
   passait Collection en tête sans que les sections bougent dans `index.html`,
   si bien que l'app se calait sur Ma pile, qui a `height:0` quand elle n'est pas
   la courante. On aligne donc le DOM sur `TAB_ORDER` au démarrage : le markup
   n'a plus à être dans le bon ordre, il ne PEUT plus se tromper. */
function orderTrack(){
  const track=document.getElementById("tabTrack");if(!track)return;
  tabOrder().forEach(n=>{const p=document.getElementById("tab-"+n);if(p)track.appendChild(p);});
}
function paintTabs(name,dx,animate){
  const o=tabOrder();
  TAB_ORDER.forEach(n=>{
    const p=document.getElementById("tab-"+n);
    if(!p)return;
    p.hidden=false;                          /* plus rien n'est conditionnel ; l'attribut du
                                                markup ne sert qu'au tout premier rendu */
    p.classList.toggle("tabcur",n===name);   /* seule la courante occupe de la hauteur */
  });
  const track=document.getElementById("tabTrack"),vp=document.getElementById("tabViewport");
  if(!track||!vp)return;
  const i=Math.max(0,o.indexOf(name)),w=vp.clientWidth;
  /* Piste masquée (recherche ouverte) : sa largeur vaut 0, et repeindre
     mettrait la translation à zéro — on rouvrirait sur la mauvaise section
     en quittant la recherche. Même famille de bug que l'écran blanc v2.22. */
  if(!w)return;
  track.classList.toggle("snap",!!animate);
  track.style.transform="translate3d("+(-i*w+(dx||0))+"px,0,0)";
}
(function(){
  const vp=document.getElementById("tabViewport"),track=document.getElementById("tabTrack");
  if(!vp||!track)return;
  const THR=.30, LOCK=1.6, EDGE=24, START=10, FLICK_D=44, FLICK_V=.45, RUBBER=.34;

  /* une rangée qui défile garde son geste : on remonte les parents et on
     regarde le débordement réel, pour ne dépendre d'aucune liste de classes */
  function hscroll(el){
    for(let n=el;n&&n!==track;n=n.parentElement){
      if(n.nodeType!==1)continue;
      const ox=getComputedStyle(n).overflowX;
      if((ox==="auto"||ox==="scroll")&&n.scrollWidth>n.clientWidth+2)return true;
    }
    return false;
  }
  let sx=0,sy=0,st=0,dx=0,dy=0,dir=null,live=false;
  function stop(){live=false;dir=null;track.classList.remove("dragging");document.body.classList.remove("dragging");}

  vp.addEventListener("touchstart",e=>{
    if(e.touches.length!==1){stop();return;}
    const t=e.touches[0];
    if(selMode||document.body.classList.contains("selecting")){stop();return;}
    if(t.clientX<EDGE||t.clientX>innerWidth-EDGE){stop();return;}
    if(hscroll(e.target)){stop();return;}
    live=true;dir=null;dx=dy=0;sx=t.clientX;sy=t.clientY;st=performance.now();
    track.classList.remove("snap");
  },{passive:true});

  vp.addEventListener("touchmove",e=>{
    if(!live)return;
    const t=e.touches[0];
    dx=t.clientX-sx;dy=t.clientY-sy;
    if(dir===null){
      if(Math.abs(dx)<START&&Math.abs(dy)<START)return;
      if(Math.abs(dx)>Math.abs(dy)*LOCK){dir="h";track.classList.add("dragging");document.body.classList.add("dragging");}
      else{dir="v";live=false;return;}       /* rendu au défilement, sans retour possible */
    }
    if(dir==="h"){
      e.preventDefault();
      const o=tabOrder(),i=Math.max(0,o.indexOf(curTab));
      let d=dx;
      if((i<=0&&d>0)||(i>=o.length-1&&d<0))d*=RUBBER;   /* résistance en bout de course */
      paintTabs(curTab,d,false);
    }
  },{passive:false});

  function release(){
    if(!live||dir!=="h"){stop();paintTabs(curTab,0,true);return;}
    const o=tabOrder(),i=Math.max(0,o.indexOf(curTab)),w=vp.clientWidth||1;
    const v=Math.abs(dx)/Math.max(1,performance.now()-st);
    const go=(Math.abs(dx)>w*THR)||(Math.abs(dx)>FLICK_D&&v>FLICK_V);
    const next=o[i+(dx<0?1:-1)];
    stop();
    /* le glissé n'efface pas les filtres : contrairement au tap sur l'onglet,
       il ramène Ma pile telle qu'on l'avait laissée */
    if(go&&next){selectTab(next);haptic(8);}
    else paintTabs(curTab,0,true);
  }
  vp.addEventListener("touchend",release,{passive:true});
  vp.addEventListener("touchcancel",release,{passive:true});
  addEventListener("resize",()=>paintTabs(curTab,0,false));
  addEventListener("orientationchange",()=>setTimeout(()=>paintTabs(curTab,0,false),120));
})();
/* Le tap sur un onglet ne fait rien de plus que le glissé : il change d'onglet.
   Il effaçait pileLoc/type/source/tag/recherche, donc revenir dans Ma pile par le bas
   détruisait le filtre en cours sans le dire, alors que le glissé le gardait — deux
   chemins, deux états. Effacer reste accessible, mais par le bouton prévu pour ça
   (« Tout effacer » de la barre de filtres) et par le fil d'Ariane. */
document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>selectTab(b.dataset.tab));
/* ---- sélection par lot : boutons + gestes conteneur ---- */
document.getElementById("selCancel").onclick=exitSel;
document.getElementById("selAll").onclick=selAllToggle;
document.getElementById("batchCat").onclick=openBatchCatSheet;
document.getElementById("batchTag").onclick=openBatchTagSheet;
(function(){
  const pl=document.getElementById("pileList");
  let lpFired=false;
  /* tap sur une carte en mode sélection = cocher (on intercepte avant l'ouverture de la fiche) */
  pl.addEventListener("click",e=>{if(!selMode)return;const card=e.target.closest("[data-id]");if(!card)return;e.preventDefault();e.stopPropagation();if(lpFired){lpFired=false;return;}toggleSel(card.getAttribute("data-id"));haptic(8);},true);
  /* appui long = entrer en sélection (accélérateur ; le bouton reste le chemin garanti) */
  let t=null,y=0,moved=false;
  pl.addEventListener("touchstart",e=>{const card=e.target.closest("[data-id]");if(!card)return;moved=false;lpFired=false;y=e.touches[0].clientY;const id=card.getAttribute("data-id");t=setTimeout(()=>{if(moved)return;lpFired=true;selAddFromGesture(id);haptic(14);},450);},{passive:true});
  pl.addEventListener("touchmove",e=>{if(Math.abs(e.touches[0].clientY-y)>10){moved=true;clearTimeout(t);}},{passive:true});
  pl.addEventListener("touchend",()=>clearTimeout(t));
  pl.addEventListener("contextmenu",e=>{const card=e.target.closest("[data-id]");if(!card)return;e.preventDefault();selAddFromGesture(card.getAttribute("data-id"));});
})();
/* ---------- actualiser l'app installée ----------
   Une PWA installée peut rester des jours sur une version périmée : le
   service worker garde la coquille, et le cache HTTP du navigateur garde
   app.js et styles.css, qui ne passent même pas par le worker. Ce bouton
   force les deux : on redemande le worker et on lui fait prendre la main
   sans attendre, on refait passer chaque fichier par le réseau en écrasant
   l'entrée de cache (`cache:"reload"`), puis on recharge.
   Les grains ne sont pas concernés : ils vivent dans Supabase et dans le
   stockage local, pas dans un cache. Le cache de partage est épargné — il
   peut contenir un partage entrant pas encore consommé. */
async function refreshApp(){
  if(navigator.onLine===false){toast("Hors ligne : rien à aller chercher.");return;}
  toast("Mise à jour…");
  try{
    if("serviceWorker" in navigator){
      const reg=await navigator.serviceWorker.getRegistration();
      if(reg){await reg.update();if(reg.waiting)reg.waiting.postMessage({type:"SKIP_WAITING"});}
    }
    if(self.caches){
      const keys=await caches.keys();
      await Promise.all(keys.filter(k=>k.indexOf("share")<0).map(k=>caches.delete(k)));
    }
    await Promise.all(["./index.html","./app.js","./styles.css","./icons.svg","./sw.js"]
      .map(u=>fetch(u,{cache:"reload"}).catch(()=>{})));
  }catch(e){}
  location.reload();
}
function applyPileView(){
  /* Chantier 25 : un seul réglage stocké par axe, et il se mémorise — comme
     `indexView` depuis la v2.38. Avant, l'axe choisi dans la barre partait dans
     `lastView`, que rien ne relisait à moins que `pileView` vaille "last" :
     ce que le doigt avait posé ne survivait pas au rechargement, contre le
     principe du cap 11. */
  pileView=settings.pileView||"list";
  if(!VIEW_KEYS.includes(pileView))pileView="list";
  /* Chantier 18 : deux réglages, pas un. L'axe de l'index est le sien — il ne se
     lit pas comme une liste d'items, et basculer l'un ne doit pas basculer
     l'autre. Liste par défaut : 27 catégories dont la médiane est 2 sont
     illisibles en grille deux colonnes. */
  indexView=settings.indexView||"list";
  if(!VIEW_KEYS.includes(indexView))indexView="list";
  /* v2.49 : l'ordre de l'index se mémorise comme sa forme. Deux réglages
     symétriques doivent se relire de la même façon, sinon l'un des deux est un
     bug qui attend (leçon v2.39, pileView contre indexView). */
  indexSort=settings.indexSort||"az";
  if(!IDX_SORT_KEYS.includes(indexSort))indexSort="az";
}
document.getElementById("settingsBtn").onclick=openSettingsSheet;
/* Le bouton retour est le premier maillon du fil d'Ariane : il remonte d'un
   cran, il ne change pas d'onglet. Une catégorie est une pile filtrée, son
   parent est « Toute la pile ». « Mis de côté » et « Corbeille » ne sont pas
   des filtres mais d'autres collections : leur parent est Parcourir.
   Sans ça, on entrait dans une catégorie sans pouvoir en sortir — depuis la
   v2.23 le tap sur l'onglet ne rétablit plus rien, à raison, et le retour
   menait à Parcourir en laissant `pileLoc` posé. */
/* v2.44 : la sortie de périmètre devient une fonction nommée, parce qu'elle a
   maintenant DEUX appelants — le chevron et le retour d'Android — et qu'ils
   doivent faire exactement la même chose. */
function exitScope(){
  popLayer("scope");
  if(tagFilter){tagFilter="";renderPileTab();return;}
  /* Quitter une collection, c'est toujours la quitter : `pileLoc` retombe sur
     « all » dans tous les cas. Sans ça, revenir de la Corbeille par Parcourir
     laissait la collection posée, et l'onglet Ma pile y ramenait — le
     cul-de-sac déplacé d'un cran, pas supprimé. */
  const ailleurs=(pileLoc==="archived"||pileLoc==="trashed");
  pileLoc="all";
  renderPileTab();                       /* le fil se remet à jour même hors écran :
                                            avec la piste v2.22 la section voisine
                                            est visible pendant le glissé */
  if(ailleurs)selectTab("categories");   /* on rend la main d'où l'on venait */
}
document.getElementById("openArch").onclick=()=>enterCollection("archived");
document.getElementById("openTrash").onclick=()=>enterCollection("trashed");
document.getElementById("navTitle").onclick=openViewMenu;
/* ---------- v2.42 : la recherche redevient une loupe ----------
   Le champ n'est plus permanent : il ne coûte plus 48 px de hauteur à chaque
   écran pour un usage qui n'est pas celui de chaque écran. Il remplace la
   ligne du titre quand on l'ouvre, et rend sa place à l'annulation.
   L'état `body.searching` et `renderRootSearch` ne changent pas d'un caractère :
   seule change la mise en scène du champ (masqué → révélé). */
function searchOpen(){const s=document.getElementById("tbSearch");return !!s&&!s.hidden;}
/* v2.45 — une seule loupe, une seule phrase : « chercher ici ». Sur Collection,
   « ici » est toute la pile (les résultats recouvrent la piste, inchangé) ; sur
   Ma pile, « ici » est la liste affichée — c'est ce que faisait le second champ,
   qui coûtait 60 px en permanence pour un usage occasionnel. */
function searchInPile(){return curTab==="pile";}
function openSearch(){
  if(searchOpen())return;
  pushLayer("search",()=>closeSearch());
  const i=document.getElementById("searchInput");
  if(i){
    i.placeholder=searchInPile()?"Chercher dans cette pile…":"Chercher dans toute ta pile…";
    i.value=searchInPile()?(pileQuery||""):"";
  }
  document.getElementById("tbRow").hidden=true;
  document.getElementById("tbSearch").hidden=false;
  if(i){try{i.focus();}catch(e){}}
}
function closeSearch(){
  if(!searchOpen())return;
  popLayer("search");
  const onPile=searchInPile();
  const i=document.getElementById("searchInput");
  if(i){i.value="";try{i.blur();}catch(e){}}    /* pas de clavier fantôme */
  document.getElementById("tbSearch").hidden=true;
  document.getElementById("tbRow").hidden=false;
  if(onPile){pileQuery="";renderPileTab();}
  else renderRootSearch();                      /* rend la piste et repeint */
}
function onSearchInput(e){
  if(searchInPile()){pileQuery=e.target.value;renderPileTab();}
  else renderRootSearch();
}
document.getElementById("searchBtn").onclick=openSearch;
document.getElementById("filterBtn").onclick=openFilterSheet;
document.getElementById("riseBtn").onclick=()=>{ riseDue()?openRemontee():toast("Rien ne remonte aujourd’hui."); };
document.getElementById("unfiledBtn").onclick=()=>{
  if(!unfiledDue()){toast("Tout est rangé.");return;}
  enterCollection("none");enterSel();
};
document.getElementById("searchCancel").onclick=closeSearch;
/* La recherche est un axe (chantier 25) : elle repeint donc la barre d'état, pas
   seulement la liste — sinon sa puce n'apparaîtrait qu'au prochain rendu. Le
   champ vit dans le markup, il n'est jamais reconstruit : le focus tient. */
/* Defiler = parcourir : on retire le clavier pour rendre la hauteur d'ecran.
   Petit seuil (~10 px) pour ne pas hacher l'inertie au premier pixel. Les champs
   de recherche restant en haut, un tap les rappelle. */
(function(){const THR=10;let ty=null;
  const drop=()=>{const a=document.activeElement;if(a&&a.id==="searchInput")a.blur();};
  addEventListener("touchstart",e=>{ty=e.touches[0].clientY;},{passive:true});
  addEventListener("touchmove",e=>{if(ty!=null&&Math.abs(e.touches[0].clientY-ty)>THR)drop();},{passive:true});
  addEventListener("wheel",drop,{passive:true});
})();
/* Le wordmark n'est plus dans le markup de départ (v2.42) : il naît avec la
   feuille Réglages et avec l'écran de connexion. Le câblage du tap devient donc
   une fonction, appelée sur chaque scope qui en fabrique un. */
function wireInk(scope){
  (scope||document).querySelectorAll(".sable-ink").forEach(el=>{
    if(el.dataset.ink)return;el.dataset.ink="1";
    el.addEventListener("click",()=>{el.classList.remove("tapping");void el.offsetWidth;el.classList.add("tapping");});
    el.addEventListener("animationend",ev=>{if(ev.animationName==="sableTap")el.classList.remove("tapping");});
  });
}
wireInk(document);
document.getElementById("sheetOverlay").onclick=()=>closeSheet();
{const rc=document.getElementById("riseClose");if(rc)rc.onclick=closeRemontee;}
/* v2.47 — `publishHdrH()` et `--tbh` sont supprimées. Leur unique consommateur
   était le palier collant, retiré parce qu'un ancêtre en `overflow:hidden`
   faisait compter la hauteur de l'en-tête deux fois (voir styles.css). Mesurer
   en JS pour alimenter un positionnement CSS a coûté quatre correctifs à ce
   projet ; il n'en reste rien. */
/* En-tête : au défilement il ne se replie plus (v2.42), il pose seulement son
   filet — le titre-menu est le contrôle principal de l'écran, l'effacer
   cacherait l'affordance du menu. `.shrunk` ne change donc plus AUCUNE hauteur,
   et l'hystérésis n'a plus rien à protéger : elle est gardée telle quelle parce
   qu'elle coûte zéro et qu'un seuil unique ferait clignoter le filet.
   (Le mécanisme qui vibrait en v2.31/v2.32 était le repli de 56 px rendu au
   document ; il n'existe plus. `body{overflow-anchor:none}` reste : la règle est
   juste pour d'autres raisons, et rien ne demande de la reprendre.) */
(function(){
  const tb=document.querySelector(".topbar"),sen=document.getElementById("hdrSentinel");
  if(!tb||!sen||!window.IntersectionObserver)return;
  /* Sentinelle plutôt qu'un écouteur de défilement : selon le navigateur le
     scroller est la fenêtre OU le body, et `scrollY` reste alors à zéro. La
     sentinelle, elle, sort du champ dans les deux cas.
     Hystérésis (v2.33) : un seuil unique se faisait retraverser par les 56 px
     que le repli rend au document — l'en-tête vibrait, surtout sur les index
     courts (Tags, Sources), où replier peut suffire à faire tenir la page dans
     l'écran et forcer `scrollY` à 0, ce qui redéploie aussitôt. On lit donc le
     ratio visible de la sentinelle (120 px) : replier quand elle a presque
     disparu (≤ 2 %, ~118 px défilés), ne redéployer que revenu tout en haut
     (≥ 98 %, ~2 px). Entre les deux, on ne touche à rien : ~116 px de bande
     morte, qu'aucun recalage de 56 px ne peut franchir. */
  new IntersectionObserver(([e])=>{
    const r=e.intersectionRatio;
    if(r<=.02)tb.classList.add("shrunk");
    else if(r>=.98)tb.classList.remove("shrunk");
  },{threshold:[0,.02,.98,1]}).observe(sen);
})();
/* Tap sur une image « zoomable » → plein écran (capture pour passer avant l'ouverture de la fiche/lien) */
document.addEventListener("click",e=>{
  const z=e.target.closest(".zoomable");
  if(z&&z.getAttribute("data-full")){e.preventDefault();e.stopPropagation();openLightbox(z.getAttribute("data-full"));}
},true);

/* ---------- Web Share Target : ingestion des partages entrants ---------- */
const SHARE_CACHE="sable-share-v1";
const SHARE_META="/__sable_share/meta";
const SHARE_FILE="/__sable_share/file_";
if("serviceWorker" in navigator){
  window.addEventListener("load",()=>{navigator.serviceWorker.register("sw.js").catch(()=>{});});
}
async function routeFileAsync(f){
  if(!f)return null;
  if(f.type&&f.type.startsWith("image/"))return await addImageFile(f);
  else if(f.type&&f.type.startsWith("audio/"))return await addMediaFile(f,"audio");
  else if(f.type&&f.type.startsWith("video/"))return await addMediaFile(f,"video");
  toast("Type de fichier non pris en charge.");return null;
}
async function ingestText(url,text,title){
  const link=(url||"").trim(),body=(text||"").trim(),ttl=(title||"").trim();
  const v=link||body||ttl;
  if(!v)return null;
  return await addItem(v,{title:ttl||body});
}
async function consumeSharedContent(){
  const params=new URLSearchParams(location.search);
  const isPost=params.has("share-target");
  const created=[];
  // Partage GET (texte/lien) : title/text/url directement en query
  if(!isPost){
    if(params.get("url")||params.get("text")||params.get("title")){
      const id=await ingestText(params.get("url"),params.get("text"),params.get("title"));
      if(id)created.push(id);
      cleanShareUrl();
      await afterShare(created);
    }
    return;
  }
  cleanShareUrl();
  if(!("caches" in window)){toast("Partage non pris en charge ici.");return;}
  try{
    const cache=await caches.open(SHARE_CACHE);
    const metaRes=await cache.match(SHARE_META);
    let meta={files:0};
    if(metaRes){meta=await metaRes.json();await cache.delete(SHARE_META);}
    const nfiles=typeof meta.files==="number"?meta.files:0;
    for(let i=0;i<nfiles;i++){
      const res=await cache.match(SHARE_FILE+i);
      if(!res)continue;
      const blob=await res.blob();
      const name=decodeURIComponent(res.headers.get("x-name")||("partage-"+i));
      const type=res.headers.get("content-type")||blob.type||"application/octet-stream";
      const id=await routeFileAsync(new File([blob],name,{type}));
      if(id)created.push(id);
      await cache.delete(SHARE_FILE+i);
    }
    if(meta.url||meta.text||meta.title){const id=await ingestText(meta.url,meta.text,meta.title);if(id)created.push(id);}
    if(created.length===0)toast("Partage reçu, mais vide.");
    else await afterShare(created);
  }catch(e){toast("Partage impossible à lire.");}
}
/* Après un partage : si UN seul grain est créé, on attend l'aperçu (borné à 4 s)
   puis on ouvre sa fiche pour éditer titre / catégorie / note tout de suite.
   Plusieurs grains d'un coup : on reste discret, pas de fiche imposée. */
async function afterShare(created){
  if(created.length!==1){
    if(created.length>1)toast(created.length+" items gardés.");
    return;
  }
  const id=created[0];
  const it=items.find(i=>i.id===id);
  if(it&&it.url&&(!it.title||!it.preview)){
    toast("Aperçu en cours…");
    try{await Promise.race([enrich(id),new Promise(r=>setTimeout(r,6000))]);}catch(e){}
  }
  openGrainSheet(id);
}
function displayText(it){return it.title?it.title:labelFor(it);}
const ICON_LINK=icon('link');
const ICON_NOTE=icon('note');
function galleryThumb(it){
  if(it.preview)return `<img class="${isIcon(it.preview)?'iconcov':''}" src="${esc(coverSrc(it))}" alt="" loading="lazy">`;
  if(it.type==="image"&&it.hasMedia)return `<div class="ph" data-media="${it.id}" data-kind="image">chargement…</div>`;
  if(it.type==="image"&&it.url)return `<img src="${esc(it.url)}" alt="" loading="lazy">`;
  if(it.type==="youtube"){const y=ytId(it.url);return y?`<img src="https://img.youtube.com/vi/${y}/hqdefault.jpg" alt="" loading="lazy">`:ICON_VIDEO;}
  if(it.type==="video")return ICON_VIDEO;
  if(it.type==="audio")return ICON_AUDIO;
  if(it.type==="link")return srcTile(it,"srctile stcover",true);
  return ICON_NOTE;
}
function parseOG(html,baseUrl){
  try{
    const doc=new DOMParser().parseFromString(html,"text/html");
    const g=(sel,at)=>{const e=doc.querySelector(sel);return e?e.getAttribute(at):null;};
    let t=g('meta[property="og:title"]','content')||g('meta[name="twitter:title"]','content');
    if(!t){const tt=doc.querySelector('title');t=tt?tt.textContent:null;}
    let img=g('meta[property="og:image"]','content')||g('meta[property="og:image:secure_url"]','content')||g('meta[name="twitter:image"]','content')||g('meta[name="twitter:image:src"]','content')||g('link[rel="image_src"]','href');
    if(img){img=img.trim();try{img=new URL(img,baseUrl||undefined).href;}catch(e){}}
    return {title:t?t.trim():null,image:img||null};
  }catch(e){return {title:null,image:null};}
}
/* ---------- retour de confirmation à l'enregistrement ---------- */
function haptic(p){try{navigator.vibrate&&navigator.vibrate(p);}catch(e){}}
/* La barre de capture n'existe plus (chantier 11) : la confirmation, c'est
   le grain qui apparaît en tête de pile, plus le toast. Reste le retour
   haptique, seul signal que l'œil n'a pas à aller chercher. */
function savedFeedback(){haptic(14);}
function proxImg(u){
  if(!u)return null;
  if(!IMG_PROXY)return u;
  if(u.indexOf("wsrv.nl")>-1||u.indexOf("weserv")>-1)return u; // déjà proxifiée
  return IMG_PROXY+encodeURIComponent(u);
}
function proxImgs(arr){return (arr||[]).map(proxImg).filter(Boolean);}
async function fetchMeta(url){
  // A) Aperçu maison : notre Edge Function Supabase (côté serveur, comme WhatsApp) — priorité
  if(typeof SELF_META_FN!=="undefined"&&SELF_META_FN){
    try{
      const {data,error}=await _sb.functions.invoke(SELF_META_FN,{body:{url}});
      if(!error&&data&&(data.title||data.image||(data.images&&data.images.length))){
        const imgs=proxImgs(data.images);const main=proxImg(data.image||null)||imgs[0]||null;
        return {title:((data.title||"").trim())||null,image:main,images:imgs.length?imgs:(main?[main]:[])};
      }
    }catch(e){}
  }
  // 0) Exabase (si clé) : rotation de proxys + rendu JS → franchit l'anti-bot (Reddit, X…)
  if(typeof META_EXABASE_KEY!=="undefined"&&META_EXABASE_KEY){
    try{
      const r=await fetch("https://api.exabase.io/v2/link-preview?q="+encodeURIComponent(url),{headers:{Authorization:"Bearer "+META_EXABASE_KEY}});
      if(r.ok){const j=await r.json();const img=proxImg((j&&j.image)||null);const t=((j&&j.title)||"").trim()||null;if(t||img)return {title:t,image:img,images:img?[img]:[]};}
    }catch(e){}
  }
  // 1) Microlink : navigateur headless, CORS ok → titre + image normalisés
  if(META_API){
    try{
      const r=await fetch(META_API+encodeURIComponent(url));
      if(r.ok){
        const j=await r.json();
        if(j&&j.status==="success"&&j.data){
          const img=proxImg((j.data.image&&j.data.image.url)||(j.data.logo&&j.data.logo.url)||null);
          const t=(j.data.title||"").trim()||null;
          if(t||img)return {title:t,image:img,images:img?[img]:[]};
        }
      }
    }catch(e){}
  }
  // 2) Repli : proxy HTML + Open Graph
  if(LINK_PROXY){
    try{
      const r=await fetch(LINK_PROXY+encodeURIComponent(url));
      if(r.ok){const og=parseOG(await r.text(),url);const img=proxImg(og.image);if(og.title||img)return {title:og.title,image:img,images:img?[img]:[]};}
    }catch(e){}
  }
  return null;
}
/* enrich() dédoublonne les appels concurrents (même id) pour ne pas gaspiller le quota */
const enriching=new Map();
function enrich(id){
  if(enriching.has(id))return enriching.get(id);
  const p=_enrich(id).finally(()=>enriching.delete(id));
  enriching.set(id,p);
  return p;
}
async function _enrich(id){
  const it=items.find(x=>x.id===id);
  if(!it||!it.url)return;
  let changed=false;
  try{
    const yid=ytId(it.url);
    if(yid){
      if(!it.preview){it.preview="https://img.youtube.com/vi/"+yid+"/hqdefault.jpg";changed=true;}
      if(!it.title){try{const r=await fetch("https://www.youtube.com/oembed?format=json&url="+encodeURIComponent(it.url));if(r.ok){const j=await r.json();if(j&&j.title){it.title=j.title;changed=true;}}}catch(e){}}
    }else{
      if(it.title&&it.preview&&it.previews&&it.previews.length)return;
      const meta=await fetchMeta(it.url);
      if(meta){
        if(meta.title&&!it.title){it.title=decodeEnt(meta.title);changed=true;}
        if(meta.images&&meta.images.length&&(!it.previews||!it.previews.length)){it.previews=meta.images;changed=true;}
        if(meta.image&&!it.preview){it.preview=meta.image;changed=true;}
      }
    }
    if(changed){await saveItems();renderAll();}
  }catch(e){}
}
function cleanShareUrl(){try{history.replaceState({},"",location.pathname);}catch(e){}}

/* ---------- boot ---------- */
async function startApp(){
  await loadState();
  // seed a couple of examples on very first run so the mechanic is visible
  if(items.length===0){
    const now=Date.now();
    items=[
      normalizeItem({id:uid(),type:"youtube",url:"https://youtu.be/aqz-KE-bpKQ",content:"https://youtu.be/aqz-KE-bpKQ",hasMedia:false,domain:"À regarder",createdAt:now-5*864e5,lastSurfaced:null,surfaceCount:0,status:"active"}),
      normalizeItem({id:uid(),type:"link",content:"https://exemple.com/typographie-inter",url:"https://exemple.com/typographie-inter",hasMedia:false,domain:"Design",createdAt:now-6*864e5,lastSurfaced:null,surfaceCount:0,status:"active"}),
      normalizeItem({id:uid(),type:"note",content:"Tester la Web Share Target API pour recevoir les partages Insta",url:null,hasMedia:false,domain:"Dev",createdAt:now-3*864e5,lastSurfaced:null,surfaceCount:0,status:"active"}),
      normalizeItem({id:uid(),type:"note",content:"Ce resto ramen à tester quand je repasse dans le quartier",url:null,hasMedia:false,domain:null,createdAt:now-864e5,lastSurfaced:null,surfaceCount:0,status:"active"}),
      normalizeItem({id:uid(),type:"note",content:"Idée : app qui te fait remonter tes favoris oubliés",url:null,hasMedia:false,domain:null,createdAt:now-2*3600e3,lastSurfaced:null,surfaceCount:0,status:"active"})
    ];
    await saveItems();
  }
  applyPileView();
  orderTrack();
  renderAll();
  selectTab(settings.startTab==="last"?(settings.lastTab||"categories"):settings.startTab);
  items.filter(i=>i.status==="active"&&i.url&&(!i.title||!i.preview)).slice(0,25).forEach(i=>enrich(i.id));
  await consumeSharedContent();
}
