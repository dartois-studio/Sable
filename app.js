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
   v2.38 — grappe Collection du cap 10 (chantiers 17, 18, 19, 28), intégration de la maquette sable-nav-1 validée au pouce. #17 Collection devient l'accueil : startTab passe de "surface" à "categories" (valeur "surface" migrée au chargement, comme batchSize en v2.23), la liste du réglage devient Collection · Ma pile · Dernier onglet, et les deux libellés d'onglet en retard partent avec (Parcourir → Collection, Pile → Ma pile). #18 l'axe d'affichage entre dans l'index : second réglage indexView, distinct de pileView — basculer l'index ne bascule pas Ma pile ; la bascule se fait par attribut sur le conteneur (#domGrid[data-view]), jamais par reconstruction, c'est ce qui préserve les dépliages ouverts et la position de défilement ; liste par défaut, et le libellé « CATÉGORIES » de la .cathead cède sa ligne au .seg puisque l'index juste au-dessus dit déjà le même mot. #19 la ligne de catégorie à trois cibles : chevron dans une gouttière de 42 px séparée par un filet (déplie un aperçu de 3 items), le corps entre, le ⋯ dans la gouttière droite ouvre la gestion ; le pied du dépliage dit « Tout voir dans {cat} (N) → », ou « Entrer dans {cat} → » sous 4 items ; en grille pas de dépliage, et passer en grille referme ce qui était ouvert. #28 gestion des catégories : catEditMode supprimé (mode, crayon, bandeau d'aide et ligne « Éditer / réordonner » avec lui), chaque ligne et chaque carte porte son ⋯ ; épingler déplace le nœud en place au lieu de reconstruire l'index (piège v2.20). Correctif de vocabulaire au passage : deux chaînes visibles disaient encore « grains » (état vide de l'index, toast de « faire remonter ») — le chantier 16 n'était pas fini. Les trois fichiers touchés
   v2.39 — vague du cap 11 (chantiers 22, 26, 20, 25). #22 la remontée devient une surface invoquée : la barre du bas passe à deux onglets, Collection · Ma pile, et Collection prend la tête de la piste (elle était l'accueil depuis la v2.38 mais occupait la troisième place, on ouvrait l'app tout à droite du glissé). L'onglet Surface disparaît — il en portait déjà tous les signes : il s'effaçait quand la remontée était éteinte, sa pastille tombait à la fin du rituel, et hors jour de tirage il affichait un écran de repos, c'est-à-dire un écran qui annonce qu'il n'a rien à dire. À sa place, une ligne sur l'accueil, qui n'existe que s'il y a un tirage et disparaît quand le rituel est fini ; elle ouvre une surface plein écran qui porte sa progression, son compteur n / N, la carte, les quatre boutons et deux cartes décalées derrière la courante — la seule mécanique de jeu dont un rituel a besoin : on voit que ça va finir. Arrivée de la carte : une montée de 180 ms, et rien d'autre. Fin du renommage du cap 09 : « Surface » quitte l'UI pour « la remontée », dernier mot du tableau de vocabulaire. La grande carte gagne enfin le repli de la v2.35 (tuile dérivée quand un lien n'a pas d'image). #26 « À trier » remonte juste après Général : c'est un groupe d'où l'on agit, pas où l'on règle. La porte de secours du rituel y entre — « Faire remonter un item maintenant » — et elle n'écrit PLUS batch.date : utiliser la porte ne doit pas coûter le rituel du lendemain. La carte à la demande vit en mémoire seule (riseAdHoc), elle ne s'écrit nulle part. #20 Ma pile devient un historique : paliers collants Aujourd'hui · Cette semaine · Ce mois · {Mois année}, et A → Z / Z → A quittent l'historique pour ne rester que dans une collection ouverte, où chercher un nom a un sens. Le collant est isolé dans une seule règle CSS et se colle sous la hauteur REPLIÉE de l'en-tête, publiée en variable : c'est la seule qui vaille, puisque rien n'est collé tant qu'on n'a pas défilé. #25 broutilles : la recherche de pile devient un axe (puce retirable, vue épinglable) ; la feuille de filtre ne propose que ce qui existe dans la collection ouverte, avec les compteurs, sources triées par taille ; l'index Sources disparaît quand une source dépasse 70 % de la pile (il n'apprend alors rien) ; ménage de pileView:"feed", lastView et density, et l'axe d'affichage des items se mémorise enfin comme celui de l'index. Les trois fichiers touchés
   v2.40 — correctif de la v2.39, écran blanc au démarrage. Le chantier 22 a passé Collection en tête de TAB_ORDER sans déplacer les <section> dans index.html : paintTabs positionne la piste par le rang dans TAB_ORDER (indexOf → translation de -i × largeur) alors que la piste, elle, empile ses sections dans l'ordre du DOM. Collection calculait donc l'offset 0, qui montrait la première section du DOM — Ma pile — laquelle a height:0 tant qu'elle n'est pas .tabcur : écran vide, et une page longue parce que la section courante, elle, gardait sa hauteur hors champ. Exactement le décalage d'un cran de la v2.22, que ce cap avait pourtant consigné. Deux corrections, pas une : les sections sont remises dans l'ordre, ET orderTrack() réordonne le DOM sur TAB_ORDER au démarrage — le markup ne peut plus contredire la constante, la classe de bug est fermée. Le banc de démarrage ne l'avait pas vu parce que jsdom n'a pas de mise en page : vp.clientWidth vaut 0 et paintTabs sort avant de translater ; il stube désormais la largeur et vérifie que la section réellement en face de la fenêtre est bien la courante. index.html et app.js touchés
   v2.41 — correctif graphique de la v2.39, trois points relevés au pouce. (a) Le champ de la feuille « Classer N items » n'avait jamais eu de boîte : la règle `.picklist input` n'écrivait que de quoi effacer une bordure, sans largeur ni remplissage ni police, si bien que l'<input> tombait sur sa largeur intrinsèque — une vingtaine de caractères, d'où le libellé coupé — avec la police du navigateur, hors du système. Il prend la boîte des lignes qu'il filtre. (b) Le cadre de sélection était un liseré, pas un cadre : une ligne n'ayant ni bordure ni rayon, recolorer `border-color` ne touchait que son filet du bas et le `box-shadow` sortant dessinait un rectangle à angles vifs posé par-dessus la boîte, passant sous les lignes voisines et rogné au bord de la liste. Cadre rentrant, rayon, fond teinté, et `margin-inline:-8px` / `padding-inline:12px` pour lui donner de l'air sans décaler le contenu d'un pixel. (c) Les deux cartes décalées derrière la carte du rituel sont retirées : l'intention était juste mais une pile de cartes dans un écran de revue promet un swipe que le produit refuse sur cette carte, la finitude était déjà dite deux fois au-dessus (pastilles + compteur n / N), et ce troisième énoncé couvrait « Une de plus ». Le bouton, seul dans sa barre, se centre. app.js et styles.css touchés
   v2.42 — chantier de l'en-tête consolidé (maquette sable-nav-6, validée au pouce). Un retrait, pas un ajout : l'en-tête passe à UNE ligne — titre-menu, loupe, réglages — et les deux bandes de contrôle qui vivaient sous lui disparaissent. Le titre EST le menu de vue : sur Collection il dit l'index courant (Catégories ▾ / Tags ▾ / Sources ▾), sur Ma pile il dit « Ma pile ▾ », et un tap ouvre la feuille « Vue » — « Grouper par » (browseIdx, ex-#idxSeg) et « Voir en » (indexView, ex-.cathead) sur Collection ; « Trier » (sortMode) et « Voir en » (pileView) sur Ma pile, qui quittent donc la barre d'axes : les laisser aux deux endroits aurait ajouté au lieu de retirer, et il ne reste dans la barre que « Filtrer », là où vivent les puces. Aucun état nouveau, aucune migration : la feuille ne change QUE l'endroit où se règlent quatre états déjà persistés. La lentille est adaptative — Tag n'est proposé que s'il y a des tags, Source que si srcIndexUseful(), et « Grouper par » disparaît quand il ne reste qu'une lentille. La recherche redevient une loupe : #searchInput n'est plus permanent, le champ révélé remplace la ligne du titre et se ferme par une croix ; zéro hauteur au repos, l'état body.searching et renderRootSearch sont inchangés. Le ⋯ de Collection est tranché par soustraction (jugement ouvert depuis la v2.38) : son unique choix devient une ligne fantôme nommée « Nouvelle catégorie » en pied de l'index des catégories — jamais un second `+`. Le wordmark quitte l'en-tête pour la tête des Réglages, où l'animation qu'on y règle se regarde vraiment ; l'écran de connexion garde le sien. Conséquence heureuse sur la zone la plus chère du projet : l'en-tête ne change plus de hauteur au défilement, donc --tbh est constante et la boucle d'ancrage des v2.32/v2.33 ne peut plus exister — .shrunk ne pose plus que le filet. Ménage des résidus du cap 12 au passage : .vseg (4 règles mortes depuis la v2.29), renderTypeChips() (rendait dans un #typeChips disparu) et le conteneur vide #pileNudge. Les trois fichiers touchés
   v2.43 — trois retours du pouce sur la v2.42. (a) L'EXPLORATEUR DEVIENT HOMOGÈNE : les trois index se voient dans les trois formes. Jusqu'ici seul l'index Catégories avait un axe d'affichage, et la v2.42 lui avait même retiré Compact en suivant la passation au mot — un retrait non décidé, réparé ici. Tags et Sources gagnent la galerie : une carte par entrée, visage dérivé (monogramme ou #, teinte stable par hash) puisqu'un tag n'a pas de couverture. La liste dense ne change PAS de visage (puce ou # comme avant, « une puce de couleur au plus », chantier 15) : c'est la forme qui s'ajoute, pas le décor. La bascule reste un attribut posé sur le conteneur puis un redessin nœud par nœud (repaintIdxNodes), jamais une reconstruction — le défilement ne bouge pas. `indexView` reste UN seul réglage partagé par les trois lentilles : deux réglages symétriques doivent se mémoriser pareil, trois auraient été trois. (b) INTERRUPTEUR DE COMPARAISON, provisoire : « Galerie sur tous les index » dans Général. Éteint, la galerie n'existe que pour les catégories (la lecture stricte du chantier 15) ; allumé, elle existe partout. Il sert à trancher sur le corpus réel et doit être soldé après : c'est un banc dans l'app, pas un réglage. Quand il s'éteint alors que la galerie est posée sur Tags, l'affichage retombe en liste SANS toucher au réglage mémorisé — un état posé par le doigt survit à tout ce qui n'est pas sa disparition. (c) DEUX REDONDANCES RETIRÉES, toutes deux nées de la v2.42. Le fil d'Ariane de Ma pile disait « Toute la pile » sous un titre qui dit déjà « Ma pile » : hors périmètre ouvert il ne dit plus que le compte. Et « Non classés » était resté le gabarit d'alerte système que le cap avait condamné pour l'invitation en v2.39 — rectangle teinté, icône encadrée, deux lignes, bouton plein — si bien que deux grammaires différentes s'empilaient en tête de Collection. Il adopte la grammaire de l'invitation : une ligne, un chiffre, un chemin, et « Ranger » dans une gouttière droite avec son filet. Même géométrie que l'invitation, encre plus calme : la remontée garde l'accent, elle est la seule chose qui se termine. Les trois fichiers touchés
   v2.44 — le bouton retour d'Android, et un bug de six versions. (a) PILE DE NAVIGATION. Jusqu'ici l'app n'avait AUCUN pushState : le retour système quittait l'app même avec une feuille ouverte, un périmètre posé ou la surface dépliée. Une pile de couches nommées la remplace, avec un seul invariant : fermer par l'UI et reculer par le système empruntent le MÊME chemin. Chaque ouverture pousse une entrée d'historique ; chaque fermeture rend les entrées qu'elle occupait ; le gestionnaire de popstate ne compte rien, il RÉCONCILIE sur la profondeur lue dans l'état (`{sable:n}`). C'est ce qui rend l'opération idempotente : un navigateur qui émet un popstate ou trois pour un même history.go(-n) donne le même résultat, et deux appuis rapides ne défont pas une couche de trop. Sept couches, dans l'ordre où elles peuvent s'empiler : onglet hors onglet de départ, périmètre (collection ou tag), recherche, sélection, surface, feuille, visionneuse. Au tout premier niveau — onglet de départ, rien d'ouvert — le retour rend la main au système : une app dont on ne peut pas sortir par le retour est un piège, pas une app. (b) LE CHEVRON RETOUR DE MA PILE NE SE CACHAIT JAMAIS. `crumbBack.hidden` était juste depuis toujours, mais `.crumb .back` pose `display:flex` sans annuler `[hidden]` : la règle d'auteur gagne. SIXIÈME occurrence du piège du cap. Corrigé, avec trois annulations prophylactiques posées d'un coup (.fstate, .riseinv, .unfline) — toutes des règles `display:flex` sur des éléments qu'un futur `hidden` masquerait mal. (c) LE BANC QUI VALIDAIT CE BUG. Le contrôle `[hidden]` du banc de style lisait getComputedStyle sous jsdom, or jsdom fait gagner `[hidden]` là où un vrai navigateur fait gagner la règle d'auteur : le contrôle ne POUVAIT pas échouer, il rassurait sans rien vérifier depuis qu'il existe. Remplacé par un audit textuel du CSS : pour chaque règle qui pose un `display:` sur une cible masquée par `hidden`, l'annulation explicite doit exister. C'est ce qui a trouvé (b) en une passe. Les trois fichiers touchés
   v2.45 — chantier de l'en-tête chargé (maquette sable-nav-7, directions B et F validées au pouce). L'en-tête devient la SEULE surface de contrôle, et tout ce qui vivait sous lui disparaît. Collection : les deux lignes d'état — l'invitation à la remontée (ch. 22) et « Non classés » — deviennent deux pastilles à point dans l'en-tête, plus un réveil qui monte une fois par jour au premier passage et n'insiste jamais (deux lignes, un tap chacune, « Plus tard » et il ne revient plus avant demain ; `settings.wakeSeen` porte la date). Un point ne réclame rien, il signale — c'est la seule forme d'alerte que ce produit s'autorise, puisque rien ne s'y consomme. Avec #idxSeg et .cathead partis en v2.42, il ne reste RIEN entre l'en-tête et la première catégorie. Ma pile : le fil d'Ariane est supprimé en entier. Le chevron (bug de six versions, corrigé en v2.44, et désormais sans emploi), le compte (déjà retiré une fois de l'en-tête au ch. 11, pour la même raison : personne ne le lit) et le ✓ qui disait « il faut choisir quelque chose » à quelqu'un venu lire — la sélection entre par l'appui long, qui existe depuis la v2.19, et par une entrée du menu du titre. La barre d'axes disparaît aussi : « Filtrer » devient une icône d'en-tête. Et le second champ de recherche est supprimé : la loupe cherche DANS LE PÉRIMÈTRE COURANT — toute la pile sur Collection, la liste affichée sur Ma pile. Une seule loupe, une seule phrase : « chercher ici ». Le périmètre devient une PUCE RETIRABLE dans la rangée qui porte déjà les puces de filtre (ch. 8) : entrer dans une catégorie, c'est poser une puce ; la retirer, c'est sortir. Aucune grammaire nouvelle, et le retour d'Android la retire aussi (couche « scope » de la v2.44). Style de la puce emprunté à la ligne qu'elle remplace — nom en graisse de titre, compte en mono, filet sous la rangée — parce qu'un périmètre n'est pas un filtre de plus : c'est l'endroit où l'on est. Gain mesuré au banc : le premier contenu remonte d'environ 96 px sur Collection et 150 px sur Ma pile. Les quatre fichiers touchés
   v2.46 — correctif de la v2.45. RÉGRESSION PROUVÉE : `#filterState` restait AFFICHÉ ET VIDE sur l'accueil de Ma pile. Avant la v2.45 il contenait toujours la barre d'axes, donc `el.hidden=false` inconditionnel ne coûtait rien ; en retirant la barre j'ai laissé un conteneur `display:flex` avec `padding:2px 4px 12px` qui ne montre rien et prend de la place. Même faute de raisonnement que le bandeau vide de la v2.36 : un élément d'état doit se masquer quand il n'a pas d'état à dire, et « vide » n'est pas « absent ». Il se masque maintenant dès qu'il n'y a ni périmètre ni puce — et le banc l'affirme, ce qu'il ne faisait pas. DURCISSEMENT DE --tbh : `publishHdrH()` n'était appelée qu'au démarrage et aux bascules de la recherche. Depuis que l'en-tête change de contenu selon l'onglet (v2.45), une valeur en retard décale le palier collant de l'historique, qui se pose alors trop bas et laisse une bande vide entre l'en-tête et la liste. Elle est republiée à chaque peinture de l'en-tête, et une fois de plus à la frame suivante — la mesure d'un élément qu'on vient de modifier n'est fiable qu'après la mise en page. Les deux fichiers touchés
   v2.47 — la vraie cause de la bande sous l'en-tête, et une variable de moins. Le palier de date était collant par `top:var(--tbh)`. Or `.viewport` porte `overflow:hidden` — il lui faut, pour la piste horizontale — et un ancêtre en `overflow:hidden` EST le conteneur de défilement d'un élément collant : le palier se collait au haut de `.viewport`, dont le sommet est déjà sous l'en-tête, si bien que `top` ajoutait la hauteur de l'en-tête une SECONDE fois. Le doublon date de la v2.33, mais `--tbh` valait alors la hauteur repliée de l'en-tête (~8 px) et personne ne pouvait le voir. La v2.42, en rendant l'en-tête non rétractable, l'a fait passer à la hauteur pleine (~64 px) ; la v2.45 a retiré tout ce qui masquait encore le décalage. Trois versions pour qu'une faute de v2.42 devienne visible, et deux correctifs (v2.46) tirés à côté avant de trouver — le premier corrigeait une vraie régression (un conteneur affiché et vide), mais pas celle-là. La règle est retirée, ce que le cap avait pré-autorisé mot pour mot pour cette ligne précise : les paliers redeviennent de simples séparateurs, le découpage par date ne dépendait pas d'elle. Conséquence : `--tbh` n'a plus aucun consommateur, et `publishHdrH()` disparaît avec ses deux écouteurs et ses six points d'appel. Plus une seule mesure JS dans le chemin d'un positionnement CSS — la variable qui a coûté les correctifs v2.31, v2.32, v2.33 et celui-ci n'existe plus. LEÇON POUR LE CAP, la plus importante de la série : jsdom ne calcule AUCUNE mise en page, donc aucun des trois bancs ne peut voir une bande vide, un chevauchement ou un décalage. Tout ce qui est géométrie se juge au pouce ou pas du tout, et un banc qui passe ne dit rien sur la mise en page. Les deux fichiers touchés
   v2.48 — le titre de Collection était tronqué en « Catégori… ». Pas un bug de logique : une faute de TRANSCRIPTION. La maquette sable-nav-7, validée au pouce, portait des boutons d'en-tête de 44 pt et un écart de 2 ; l'intégration a réutilisé `.btn.icon` (48 pt) et `--s1` (4 pt), ce qui reprend 24 pt sur les quatre boutons de Collection — exactement de quoi faire mordre l'ellipse sur un titre de dix lettres. La maquette avait donc raison, et le calcul annoncé à la livraison de la v2.45 (« 348 px sur 354 disponibles ») portait sur les cotes de la maquette, pas sur celles du code livré. Les cotes validées sont transcrites, et seulement dans l'en-tête : `.btn.icon` garde 48 pt partout ailleurs. LEÇON : une maquette valide des DIMENSIONS autant que des idées ; les reprendre au jugé annule le test. Le banc de style les affirme maintenant en toutes lettres. Et comme les cotes transcrites laissaient encore une marge de quelques points seulement sur un écran de 360 pt — parier sur une marge de quelques points est exactement ce qui a produit l'ellipse — la taille du titre suit désormais la largeur : `font-size:clamp(20px,5.6vw,24px)`, 24 px partout où il y a la place, jamais moins de 20 px, aucune mesure JS. Marge positive vérifiée de 360 à 412 pt. Un seul fichier touché
   v2.49 — l'index gagne un ordre choisi, et la sélection change de porte. (a) TRI DE L'INDEX. Reproche du pouce : « il y a des catégories qui ne sont pas triées, je n'ai aucune main là-dessus ». Le diagnostic n'est pas l'absence d'ordre — catOrder() triait par taille depuis la v2.38 — c'est que cet ordre est ILLISIBLE : décroissant sur un compteur qu'on ne lit pas, il est indistinguable du désordre. Un ordre dérivé qu'on ne peut pas relire ne remplit pas l'office d'un ordre. Nouveau réglage indexSort, UN SEUL pour les trois lentilles (leçon v2.43 : trois réglages symétriques auraient été deux bugs qui attendent), persisté comme indexView, trois valeurs — Taille, A → Z, Z → A — rendues par un groupe « Trier » dans la feuille « Vue », entre « Grouper par » et « Voir en » : grouper, puis ordonner, puis la forme. DÉFAUT A → Z, changement assumé du comportement existant : le travail de l'index est de retrouver un nom, et une seule ligne (DEFAULT_SETTINGS) le ramène à "size" si le pouce dit le contraire. Les épingles restent EN TÊTE dans les trois ordres — une épingle est un ancrage, pas un rang, et c'est elle qui répond à « avoir la main » sans coûter un ordre manuel. Le tri s'applique dans catOrder() et idxEntries(), JAMAIS dans tagLib() ni srcLib() : ces deux-là nourrissent aussi les suggestions de tag et le sélecteur de catégorie de la fiche, où l'ordre de fréquence est le bon — un slice(0,8) alphabétique aurait rendu des suggestions absurdes. Changer d'ordre DÉPLACE les nœuds (reorderNodes : validation complète des clés AVANT le premier déplacement, puis un DocumentFragment), il n'en reconstruit aucun : aperçus ouverts, médias chargés et défilement survivent, comme moveCatNode le fait pour l'épingle depuis la v2.38. (b) LA PORTE DE LA SÉLECTION DÉMÉNAGE. Jugement ouvert n° 7 du cap 13 tranché : l'entrée « Sélectionner des items » quittait la feuille « Vue », qui ne doit contenir que de l'état d'affichage — une action y était un corps étranger. Elle devient « Sélectionner » dans le ⋯ de l'item, et elle entre en sélection AVEC CET ITEM COCHÉ : le jumeau visible exact de l'appui long, au même endroit. Solde de surface neutre, une ligne change de feuille. La classe .sp part avec elle (markup mort, aucune règle CSS). (c) DÉFAUT TROUVÉ EN DÉPLAÇANT LA PORTE : selAddFromGesture() posait selMode=true SANS pushLayer("sel"). Entrer en sélection par l'appui long ne poussait donc aucune couche — le retour d'Android quittait l'onglet au lieu de sortir de la sélection, et exitSel() appelait popLayer sur une couche jamais empilée (retour silencieux, la pile restait fausse). L'invariant du chantier 31 était rompu depuis la v2.44 sur le seul chemin que le banc ne pouvait pas emprunter, faute de géométrie tactile. Deux fichiers touchés
   v2.50 — chantier 34, les accès directs (+ réglage peekSize). Entrée manquante, ajoutée rétroactivement en v2.51 : la livraison avait bumpé APP_VERSION sans écrire sa ligne de journal, ce qui retire au numéro son seul usage — dire ce qui a changé. Un mini-FAB en surface (pas accent : le + reste l'action primaire) s'empile au-dessus du + et ouvre une feuille « Aller à » — entrer dans une catégorie sur l'index Catégories, sauter à un palier de date sur Ma pile. Le déclencheur s'OBSERVE : visible au-delà de ~1,6 écran de contenu, masqué sous ~1,3, hystérésis comme la sentinelle d'en-tête v2.33. Réglage peekSize (3/5/8) dans Général, et le pied d'un aperçu porte deux gestes — « Entrer » et « Voir tout (N) » qui étend sur place (catPeekAll, en mémoire seule). Quatre fichiers touchés
   v2.51 — correctif de la v2.50 : le mini-FAB des accès directs ne se réévaluait presque jamais. updateJumpFab() n'était appelée que par renderAll(), un défilement, un redimensionnement et les trois bascules d'aperçu — or elle se masque dès que layerOn("sheet") est vrai, et closeSheet() ne la rappelait pas. Ouvrir les Réglages pour vérifier la version puis refermer suffisait donc à faire disparaître le bouton jusqu'au prochain défilement : exactement le chemin que prend quelqu'un qui vient tester une nouvelle version. Même trou sur selectTab (changer d'onglet gardait l'état de l'autre), sur le changement de lentille ou de forme (renderRoot), sur la sortie de recherche et sur la sortie de sélection. LA MESURE N'EST PAS TOUCHÉE — le seuil 1,6/1,3 est inchangé : c'est un défaut de déclenchement, pas de calibrage. La réévaluation passe par un scheduleJumpFab() DIFFÉRÉ D'UNE IMAGE, et le différé n'est pas de la coquetterie : le banc a montré qu'un appel synchrone dans exitSel() lisait encore la classe `selecting`, que updateSelUI() ne retire que deux lignes plus bas — un propriétaire d'état écrit sa classe au milieu de sa fonction, jamais à la fin, donc on lit à l'image suivante. Il fusionne aussi les appels d'un même tick (une passe de rendu = UNE lecture de scrollHeight au lieu de trois) et il autorise l'appel au SOMMET d'une fonction à plusieurs sorties, ce qui évite de garder chaque `return` de renderRoot. Sept points d'appel, un par propriétaire d'état : pushLayer, popLayer, popstate, renderRoot, renderPileTab, updateSelUI, renderRootSearch, plus les bascules d'aperçu qui prennent la même porte. L'appel de renderAll() est retiré, ses deux enfants le font. Deux défauts de plus, trouvés par le banc en écrivant le correctif : (d) la garde du rituel testait une classe `rising` que PERSONNE ne pose — elle ne pouvait pas être vraie, et le mini-FAB ne se trouvait masqué pendant la remontée que par le z-index (35 > 31), donc par accident ; elle lit maintenant layerOn("surface"), qui est la vérité du chantier 31. (e) la fin d'un glissé ne réévaluait rien : un glissé ANNULÉ (qui ne change pas d'onglet, donc ne passe pas par selectTab) laissait le bouton éteint, puisque le JS avait posé hidden=true pendant le geste. stop() appelle le planificateur. Aucun des trois bancs ne pouvait voir ce défaut sans stub : la visibilité dépend de scrollHeight, que jsdom rend à 0 — et un banc qui ne peut pas échouer ne vérifie rien. Deux fichiers touchés
   v2.52 — trois retours du pouce sur la v2.51. (a) LE DÉCLENCHEUR DU MINI-FAB N'EST PLUS GÉOMÉTRIQUE. Le seuil de 1,6 écran demandait une vingtaine de catégories pour se déclencher : sur le corpus réel le bouton n'existait jamais, et le rapport était « je ne vois pas le mini-FAB ». Il ne compte plus des pixels mais des ANCRES — visible dès que gotoTargets() en rend au moins deux, sur les deux écrans qui en ont. Deux, parce qu'openGotoSheet() refuse déjà de s'ouvrir en dessous et qu'un bouton visible qui n'ouvre rien est une affordance qui ment (leçon de la fausse pile, v2.41). C'est une SOUSTRACTION : le test de contexte qui doublonnait gotoTargets(), le ratio, l'hystérésis, la lecture de scrollHeight et les deux écoutes défilement/redimensionnement partent ensemble. Bénéfice principal, et la vraie raison de préférer un compte à une hauteur : un compte de DONNÉES est vérifiable par un banc, une géométrie ne l'est pas — cette condition sort de l'angle mort du projet. Deux boutons flottants sont désormais permanents, ce qui est un pari contre « un seul bouton flottant dans toute l'app » : le mini-FAB reste en surface et non en accent, la hiérarchie tient, et si l'empilement gêne la sortie est la variante C de sable-nav-7, une pastille agrégée. (b) L'ACTION DU TOAST N'A JAMAIS ÉTÉ CLIQUABLE. #toast porte pointer-events:none et #toast.show ne le relevait pas : « annoter » après une capture, « voir » du dédoublonnage et « annuler » de la corbeille étaient morts tous les trois, depuis leur écriture. C'est pour ça qu'ajouter un item semblait n'ouvrir aucun chemin vers une catégorie. Le corps du toast reste transparent aux taps — il flotte par-dessus la liste et la zone du +, le rendre tapable ferait avaler des taps du contenu — et seul le mot reprend les événements, un descendant pouvant relever ce que son ancêtre a coupé. Le mot devient « classer », celui que l'app emploie déjà pour le lot : « annoter » désignait la note et envoyait chercher au mauvais endroit. (c) CATÉGORIE ET TAG À LA CAPTURE, FACULTATIFS. Deux champs entre le champ principal et « Ajouter », dans cet ordre pour que « Ajouter » reste à un tap du collage. Entorse assumée à « entrer ne coûte rien » — la feuille d'import en avait le droit parce qu'une décision prise une fois pour N items est bon marché, ce qui n'est pas le cas d'une décision par item — mais les deux champs disent « facultatif », ils ne bloquent rien, et un item sans catégorie ni tag ni titre reste parfaitement valide. Nouveau garde-fou resolveCat() : les catégories se comparent par chaîne exacte, contrairement aux tags, donc taper « fonts » aurait fabriqué une jumelle de « Fonts » et l'index en aurait montré deux — une saisie retombe sur la catégorie existante, casse et accents pliés. Utilisé aussi par l'import en masse, qui avait le même trou. Trois fichiers touchés
   v2.53 — trois retours du pouce sur la v2.52, et le premier est un défaut d'invariant, pas de calibrage. (a) « ALLER À » N'EMMENAIT NULLE PART. Taper une catégorie dans la feuille ne faisait rien : l'app entrait bien dans la catégorie, puis en ressortait 200 ms plus tard. Cause : le gestionnaire de popstate comparait le popstate qui arrive à layers.length COURANT pour décider s'il était le nôtre. Or `closeSheet(true); enterCollection(n)` — les deux dans le même tick, ce qu'est UN tap — dépile la couche `sheet` (recul demandé vers 0, history.go est asynchrone) puis empile `tab` et `scope`. À l'arrivée du popstate, layers.length valait 2 : le test `0 >= 2` échouait, notre propre recul passait pour un appui de l'utilisateur, et les deux couches neuves étaient dépilées. La réconciliation par profondeur était la bonne idée, mais elle comparait la MAUVAISE profondeur : on mémorise désormais `syncAim`, la profondeur visée au moment où le recul a été DEMANDÉ. Le défaut touchait tout chemin qui ferme une feuille et ouvre une couche d'un autre nom dans le même tick, pas seulement le mini-FAB — c'était le seul endroit du code qui le faisait, ce qui explique qu'il ait vécu depuis la v2.44. Et il faut le noter : le banc de la v2.51 l'avait vu, il rendait « layers vide » sur une séquence non espacée, et j'ai conclu à un artefact de banc en espaçant les actions. Un banc qui montre un défaut qu'on explique par le banc lui-même est un défaut qu'on classe sans suite. Le palier de date, lui, n'avait rien : `.tier{scroll-margin-top:64px}` existait déjà et le saut tombe juste. (b) LE MINI-FAB PASSE À 40 px DE DISQUE, 48 px DE CIBLE. Deux boutons flottants de même poids se disputaient l'œil. Le dessin descend, la cible ne descend pas : l'écart est pris par un ::before en inset:-4px, qui agrandit la zone de survol sans agrandir le dessin. Le `right` passe de 22 à 26 px pour que les deux CENTRES restent alignés — aligner les bords aurait décalé les centres de 4 px, ce qui se voit sur deux disques empilés. (c) LES DEUX CHAMPS DE CAPTURE PROPOSENT L'EXISTANT. Une rangée de puces sous chaque champ, à partir de la PREMIÈRE LETTRE — sur un champ vide ce serait un menu, et un menu à la capture rendrait obligatoire ce qui est facultatif. Ordre de FRÉQUENCE et pas ordre d'index (leçon v2.49 : une fonction dérivée n'hérite pas de l'ordre de l'écran qui l'appelle), coupé à six pour que la rangée ne passe pas à deux lignes et ne pousse pas « Ajouter » sous le clavier. Aucune primitive nouvelle : ce sont les puces de `.tagsug` de la fiche. Un tap remplace la frappe par le nom complet, ce qui rend resolveCat() presque inutile — presque, parce qu'on peut toujours taper le nom en entier. Trois fichiers touchés
   v2.54 — un périmètre devient une SURFACE d'un seul cran au-dessus de Collection, et le retour retrouve son sens. Défaut d'origine : entrer dans une catégorie faisait selectTab("pile") — qui empile la couche `tab` — PUIS pushLayer("scope"), soit DEUX crans entre Collection et la catégorie. Le retour système en consomme un à la fois : il fermait `scope` d'abord (→ Ma pile, all), et seulement au deuxième appui `tab` (→ Collection). L'arrêt intermédiaire sur « Ma pile, toute la pile » était structurel, et illogique à l'usage : on entre depuis Collection, on doit y revenir. La tentation était de rattraper ça en réutilisant la couche `tab` à la sortie — mais `startTab` est réglable (Collection · Ma pile · Dernier onglet) : si Ma pile est l'accueil, `selectTab("pile")` fait `name===startTab()` donc dépile `tab` au lieu de l'empiler, et il n'y a AUCUNE couche pour porter le retour. Un raccourci qui dépend de l'onglet de départ n'en est pas un. La vraie forme est celle que le concept dit depuis toujours : un périmètre n'est pas un onglet, c'est une surface par-dessus l'accueil, comme la remontée. Un drapeau `enteringSurface` empêche selectTab de pousser la couche `tab` le temps de l'entrée ; seule la couche `scope` est empilée, un cran, et sa fermeture — puce ×, retour système, n'importe quel appel — passe par le MÊME `exitScope`, qui remet la section pile à l'historique et rend Collection. L'invariant « fermer par l'UI et reculer par le système empruntent le même chemin » tient maintenant quel que soit l'onglet de départ, et le cas `archived/trashed` séparé disparaît : toute sortie de périmètre est la même. La source gagne au passage sa couche `scope`, qu'elle n'avait jamais eue (entrer par la lentille Sources laissait `sourceFilter` posé après un retour système). CE QUI N'EST PAS FAIT, ET C'EST VOULU : le VISUEL reste le glissé de piste vers Ma pile scopée + la puce de périmètre. La peau glissée validée en maquette (nav-11 : surface plein écran par-dessus Collection, en-tête propre, tri dans la page) est la livraison suivante, isolée — elle touche le fixed-overlay, la géométrie des paliers collants (piège v2.47) et le chaînage de défilement (v2.25/v2.26), donc elle ne se juge qu'au pouce, sur un vrai navigateur, ce qu'aucun banc ne voit. app.js et sw.js touchés. RIEN À VÉRIFIER AU BANC POUR LA GÉOMÉTRIE : ce fix est de la logique de couches, il se lit sur le texte et se tranche au pouce sur le retour.
   v2.55 — la PEAU du périmètre : il devient une surface glissée par-dessus Collection, avec son en-tête propre, comme la maquette nav-11 validée au pouce. La v2.54 avait posé le corps (un périmètre = une couche `scope`, sortie en un pas vers Collection quel que soit l'onglet de départ) mais gardait le visuel du glissé de piste vers Ma pile scopée. Ici on présente #tab-pile en surface sur le modèle de .rise : position fixed, z-index 35, défilement interne, en-tête propre (#scopeHead : retour · titre du périmètre · tri), onglets et boutons flottants masqués pendant la page. Points d'ingénierie : (1) `curTab` reste "pile" pendant la page — c'est ce qui garde justes le rendu (#pileList), l'en-tête et surtout le menu de tri, puisque drawViewMenu lit curTab pour montrer le tri des ITEMS (Récents · Anciens · A → Z · Z → A) plutôt que celui de l'index. (2) On ne touche NI à paintTabs (le rail ne bouge pas, Collection reste l'onglet courant DESSOUS, invisible car la surface est opaque) NI à la couche `tab` : la seule couche est `scope`, un cran, et retour système / bouton retour / puce × la ferment tous par le même exitScope. (3) La sortie glisse la surface dehors (retrait de la classe `scopein`), rend Collection par selectTab("categories") — qui remet en-tête, onglets et rail au propre — et démonte la surface à la fin de la transition (transitionend, filet 340 ms) ; le contenu n'est pas re-rendu pendant la sortie, il glisse tel quel sans clignoter. (4) `enteringSurface` de la v2.54 est retiré, devenu sans objet : la surface ne passe plus par selectTab. (5) La puce de périmètre est masquée en surface — le nom est déjà dans l'en-tête — mais les puces de filtre (type/source/tri/recherche) restent. (6) Un glissé vers la droite ferme la page, en imitant le retour système (bord gauche refusé, vertical refusé), au seuil, sans suivi en direct pour l'instant. CE QUE LES BANCS NE VOIENT PAS, à juger au pouce : le glissé d'entrée et sa durée (260 ms), le retour et la sortie (Collection réapparaît-elle proprement ?), les zones sûres de l'en-tête (safe-area haut, gouttière 18 px), le tri qui s'ouvre bien sur les items, et le glissé-pour-fermer (seuil, conflit éventuel avec un défilement). Trois fichiers touchés : index.html (#scopeHead), styles.css (la surface), app.js (openScopePage, exitScope réécrit, entrées, câblage, geste). RESTE POUR PLUS TARD : suivi en direct du glissé (doigt collé à la page), et l'ajout d'items depuis la page (FAB masqué pour l'instant).
   v2.56 — deux finitions de la surface de périmètre. (a) LE GLISSÉ-POUR-FERMER SUIT LE DOIGT. La v2.55 n'avait qu'un seuil au relâchement ; ici la page est collée au doigt (transform inline pendant le touchmove, transition coupée), et au relâchement soit elle finit sa sortie depuis la position atteinte (dx > min(32 % de la largeur, 120 px) → exitScope), soit elle revient à zéro via .scopein. L'axe horizontal est confirmé avant de saisir le geste (|dx| > |dy|×1,4 et dx > 0), le bord gauche reste au retour système (< 24 px ignorés), le vertical est laissé au défilement. Le touchmove est en passive:false pour pouvoir retenir le défilement UNE FOIS le glissé horizontal engagé — jamais avant. `exitScope` nettoie le transform inline à la fin de la transition, sinon la prochaine ouverture démarrerait décalée. (b) LE + REVIENT DANS LA PAGE. Le FAB d'ajout (#fabAdd) était masqué en surface ; il repasse au-dessus (z-index 36 > 35) pour capturer sans sortir du périmètre. La capture reste sans décision (elle ne préremplit pas la catégorie du périmètre — c'est l'esprit du cap, capturer d'abord, ranger plus tard ou jamais). Le jump-FAB reste masqué (il sert le fil de Ma pile, pas une page scopée). À juger au pouce : la fluidité du suivi, le seuil de complétion, et l'absence de conflit entre le glissé horizontal et le défilement vertical de la liste. styles.css et app.js touchés.
   v2.57 — les trois bugs de la surface de périmètre, une seule cause. Le geste inter-onglets (#tabViewport) restait ARMÉ pendant body.scoped : #tab-pile, sorti du rail en position:fixed mais resté descendant DOM de #tabViewport, laissait son touchstart bubbler jusqu'au listener de piste. Un balayage déclenchait donc DEUX gestes — le glissé-pour-fermer de la surface ET le glissé de piste, qui lit curTab="pile" (i=1) et translate le rail vers la fente pile, VIDE puisque #tab-pile est en fixed hors rail. D'où le double mouvement disgracieux, l'écran vide, et la sensation d'« aller dans Ma pile » au lieu d'ouvrir la sous-catégorie. Sur un tap propre openScopePage laissait pourtant Collection .tabcur et le rail à 0 : le comportement était juste, seul le geste le cassait. Correctif en deux gardes, et AUCUNE dans paintTabs — exitScope l'appelle via selectTab("categories") alors que body.scoped est encore posée (retirée au transitionend), une garde là re-casserait la sortie. (A) le touchstart de #tabViewport sort d'emblée si body.scoped. (B) resize et orientationchange ne repeignent le rail que hors surface. L'écran vide au retour (bug 2) était une conséquence du rail désynchronisé par le geste : exitScope sur config par défaut est structurellement sain (popLayer("scope") retire la couche, selectTab("categories") remet .tabcur sur Collection et le rail à 0), donc rien à y changer. Aucune géométrie nouvelle, aucun banc ne le voit — à trancher au pouce sur les trois gestes. app.js seul touché, cache bumpé.
   v2.58 — entrer dans un périmètre ne met PLUS dans Ma pile. Retour à nav-11 : une catégorie/tag/source est une PAGE distincte (comme #pane-page dans le proto), pas l'onglet Ma pile habillé. La faute de fond était openScopePage qui forçait curTab="pile" : navTitleText renvoyait alors « Ma pile » (aperçu au glissé d'entrée), et toute la logique se croyait dans la pile. curTab reste désormais "categories" (Collection est l'onglet courant DESSOUS, exactement comme le proto pose la page par-dessus Collection) ; seul l'en-tête de la surface (#scopeTitle) porte le NOM du périmètre. Les cinq lecteurs de curTab==="pile" qui devaient rester vrais en page lisent maintenant scopeActive() (= body.scoped) en plus : le menu de tri montre les items (Récents · Anciens · A→Z · Z→A) et « Voir en » applique le mode pile, la recherche cible la liste de la page, et les paliers de date s'affichent aussi dans un périmètre de tag/source (qui n'est pas inCollection). renderList ne dépendait déjà pas de curTab (il lit les filtres), donc la surface se peuple sans changement. exitScope inchangé : selectTab("categories") remet tout au propre, no-op sur curTab déjà juste. app.js seul touché. À juger au pouce : le titre de la page est le nom du périmètre du premier pixel du glissé (plus de « Ma pile »), le tri ouvre bien sur les items, la recherche cherche dans la page.
   v2.59 — Tags et Sources gagnent le tiroir des catégories. Le reproche du pouce : le chevron qui déplie un aperçu de 3 items (chantier 19) n'existait que sur l'index Catégories ; Tags et Sources restaient des lignes sèches à une cible. Ils passent à la ligne à DEUX cibles — chevron | corps — sur EXACTEMENT la carcasse de la catégorie (.crow / .cline / .cchev / .peek), sans sa troisième gouttière : un tag et une source ne se gèrent pas (ni ⋯ ni épingle), ils s'ouvrent. Le corps reste le `.idxrow` de la v2.30 (son visage à une puce — # pour un tag, un point teinté pour une source —, son compteur, son compact), glissé dans .cline ; il perd sa largeur pleine et son filet, que .crow porte désormais. Le tiroir réutilise peekBodyHTML à un détail près, idxPeekBodyHTML : « Entrer » route vers enterTag / enterSource (pas enterCollection), et la population suit le COMPTEUR de la ligne (status!==\"trashed\", comme tagCount/srcCount) et non l'actif-seul des catégories, sinon « Voir tout (N) » mentirait le N affiché à côté. État d'ouverture dans idxOpen / idxPeekAll, jumeaux de catOpen / catPeekAll, mais CLÉS PRÉFIXÉES PAR LE GENRE (`tag:` / `src:`) : un tag et une source de même nom ne partagent pas leur tiroir, et la purge d'une entrée disparue ne touche que la lentille courante (l'autre, invisible, ne se juge pas ici). toggleIdxPeek / expandIdxPeek sont les jumeaux exacts de leurs versions catégorie — ils ne redessinent QUE le tiroir concerné (jamais un render() complet, piège v2.20), rewirent ses lignes d'item et hydratent ses médias ; repaintIdxNodes rewire les tiroirs restés ouverts après une bascule liste ↔ compact ; passer en grille les referme (idxOpen.clear, comme catOpen). peekSize est partagé, aucun réglage nouveau. En grille, pas de chevron — une carte n'a pas de tiroir, comme pour les catégories. app.js et styles.css touchés, cache bumpé. NOTE DE CADRAGE (à trancher au cap, que je n'ai pas ici) : le chantier 15 posait « Tags et Sources ne sont pas des lieux, ce sont des index — une puce de couleur au plus ». Le tiroir est un contrôle de divulgation, pas un visage (la puce reste unique), et la v2.43 avait déjà donné à ces index la carte de galerie « sans seconde grammaire » — donc ceci prolonge cette parité plutôt qu'il ne la rompt. Mais c'est un pas de plus vers l'équivalence catégorie / axe transversal ; si le cap la refuse, c'est cette livraison qu'on annule. À JUGER AU POUCE (aucun banc ne le voit) : le déplié/replié et sa rotation de chevron, le retrait du tiroir (padding gauche var(--s6)), « Voir tout / Réduire », « Entrer » qui ouvre bien le bon périmètre, et le compact (chevron 38 px, ligne 40 px).
   v2.60 — « Aller à » un palier de date ne défilait pas dans Ma pile. Le saut appelait `el.scrollIntoView({block:"start"})`, mais le palier vit sous `.viewport{overflow:hidden}` — le conteneur qui porte la piste horizontale — et un ancêtre en `overflow:hidden` EST, pour le navigateur, le conteneur de défilement de son descendant (le piège des `sticky`, v2.47). scrollIntoView tenait donc le palier pour « déjà visible » dans un conteneur qui ne défile pas, et ne remontait jamais jusqu'au vrai défileur, le document. Symptôme exact du pouce : taper « Ce mois » ne bougeait rien. Le même « Aller à » vers une CATÉGORIE marchait, lui, parce qu'il ne défile pas — il appelle enterCollection ; seule la branche palier, qui a besoin de défiler, tombait à plat, et aucun banc ne le voit (jsdom ne calcule aucune mise en page). Le fix vise le bon défileur À LA MAIN, sans scrollIntoView : hors surface c'est le document (window.scrollTo), en surface de périmètre c'est #tab-pile (fixed, overflow-y:auto). L'en-tête collant (topbar, ou #scopeHead en surface) est mesuré au moment du saut pour poser le palier juste dessous — le `scroll-margin-top:64px` du CSS ne servait qu'à scrollIntoView, qu'on n'appelle plus ici (règle laissée en place, sans emploi sur ce chemin, inoffensive). Ce n'est PAS la rechute --tbh (v2.47) : lire une position pour DÉFILER est le métier légitime du JS ; l'interdit ne vise qu'une mesure JS qui pilote un positionnement CSS. À JUGER AU POUCE (aucun banc ne le voit) : taper un palier dans « Aller à » depuis Ma pile pose bien ce palier sous l'en-tête ; le premier palier (« Aujourd'hui ») remonte en tête sans négatif ; en surface de périmètre le même saut vise #tab-pile (chemin peu atteignable, le jump-FAB y étant masqué, mais la branche est juste). app.js seul touché, cache bumpé.
   v2.61 — correctif du v2.60, qui avait CHANGÉ le symptôme sans le régler : « je clique sur Ce mois, mais le chapitre n'existe même pas ». Le v2.60 remplaçait `scrollIntoView` par `window.scrollTo`, en supposant que le document défile. Il ne défile pas : le modèle du projet, posé en v2.26 et confirmé en v2.32 (`body{overflow-anchor:none}`), c'est `body{height:100%}` au-dessus d'`#app{min-height:100%}` qui déborde, avec `body{overflow-x:hidden}` — donc overflow-y calculé à `auto`, et c'est BODY le conteneur de défilement, pas `documentElement`. `window.scrollTo` et `window.scrollY` portent sur documentElement, dont le scrollTop reste 0 : le saut était un pur no-op, l'écran ne bougeait pas d'un pixel, d'où l'impression que le palier n'existe pas. La faute est d'avoir SUPPOSÉ le défileur au lieu de le TROUVER. Nouveau `scrollerFor(el)` : il remonte depuis le palier et rend le premier ancêtre réellement défilant (scrollHeight > clientHeight) dont l'`overflow-y` est auto/scroll — ou body, que le projet désigne explicitement comme SON défileur. Il saute `.viewport` sans y penser (overflow:hidden ⇒ pas auto/scroll, et de toute façon scrollHeight == clientHeight, il ne défile pas), trouve #tab-pile en surface de périmètre (fixed, overflow-y:auto) et body partout ailleurs ; filet sur `document.scrollingElement` si un jour la racine devient le défileur. Le calcul de position est le même pour tous : `sc.scrollTop + (palier.top − sc.top) − hauteur d'en-tête`, l'en-tête (topbar, ou #scopeHead en surface) mesuré au saut. Le `scroll-margin-top:64px` du CSS reste sans emploi sur ce chemin (plus de scrollIntoView), inoffensif. À JUGER AU POUCE (aucun banc ne le voit) : depuis Ma pile, taper un palier dans « Aller à » l'amène bien juste sous l'en-tête ; « Aujourd'hui » remonte en tête sans butée ; le défilement doux part sans accroc. app.js seul touché, cache bumpé.
   v2.62 — « Aller à » une catégorie la LOCALISE au lieu de l'ouvrir. Depuis la v2.50, taper une catégorie dans la feuille « Aller à » appelait enterCollection : le menu qui promet de « se rendre à » un endroit ouvrait en fait sa PAGE, un changement de contexte. On aligne la catégorie sur le palier de date de Ma pile (v2.60/61) : « Aller à » défile jusqu'à la ligne de la catégorie dans l'index ET ouvre son tiroir d'aperçu (chantier 19), sans entrer. Entrer reste à un tap — le pied du tiroir porte « Entrer dans {cat} → » — donc on ajoute un repérage sans retirer le chemin. Mise en œuvre : `jumpToAnchor` est refactorisé en `jumpToEl(el)` (le calcul de saut de la v2.61, qui trouve le vrai défileur — body ici — et pose la cible sous l'en-tête collant), et `gotoCat(name)` ouvre puis défile. Trois soins : (1) le tiroir n'existe qu'en LISTE (une carte de grille n'en a pas, v2.59) — on interroge le NŒUD pour son chevron `.cchev` au lieu de lire `indexView`, c'est le rendu réel qui tranche ; en grille on défile seulement. (2) On OUVRE le tiroir AVANT de mesurer — il pousse la mise en page — puis on défile à l'image suivante, quand la position de la ligne reflète le tiroir déployé (double rAF). (3) Déjà ouverte, on ne la referme pas : on s'y rend. Ouvrir ne pousse aucune couche, comme le chevron ordinaire (toggleCatPeek) — un aperçu est une divulgation, pas un état de navigation, et le retour système n'a donc rien à défaire ici. enterCollection reste l'action du corps de la ligne et du bouton du tiroir ; seul le chemin « Aller à » change. À JUGER AU POUCE (aucun banc ne le voit) : taper une catégorie dans « Aller à » l'amène sous l'en-tête, tiroir ouvert dessous ; en grille, défilement seul ; une catégorie déjà dépliée n'est pas refermée ; le double rAF pose bien la ligne APRÈS l'expansion (sinon elle tomberait trop haut). app.js seul touché, cache bumpé.
   v2.63 — cinq finitions demandées. (1) Réglages : « Actualiser l'application » (+ version) monte tout en haut, juste sous le wordmark, avant les groupes de réglage — c'est la seule ligne qu'on vient parfois chercher vite. (2) Appui long (~460 ms) sur un chevron d'index = tout déplier / tout replier la lentille courante (catégories, tags, sources) ; le tap ordinaire garde son office. Un garde temporel global (_peekAllAt) avale le clic de synthèse qui suit le relâchement, fiable même quand le tout-déplier remplace les nœuds sous le doigt (repaintCatNodes / repaintIdxNodes, jamais un render() complet — piège v2.20). Ma pile n'a pas de chevron : le geste n'y a pas de cible. (3) Le réglage « Animation du titre » disparaît des Réglages ; l'animation elle-même reste au défaut (Reflet), applyAnim() et settings.anim intacts — seule la primitive de choix part. (4) Les deux pastilles d'en-tête (la remontée + non classés) fondent en UN bouton « À trier » (icône inbox neuve dans icons.svg) : un tap ouvre un menu où l'on choisit la destination. À la différence du réveil (openWake, qui ne montre que ce qui attend), ce menu montre TOUJOURS les deux, chacune avec son compte calme ; la remontée n'y figure que si elle est allumée. Le point de la pastille signale toujours qu'il y a quelque chose (riseDue||unfiledDue), il ne dit plus quoi. (5) Le lien « Site » des Réglages pointe sur dartois.studio/Sable/. À JUGER AU POUCE (aucun banc ne le voit) : le seuil de l'appui long et l'absence de faux déclenchement au défilement ; le clic de synthèse bien avalé après un tout-déplier ; le menu « À trier » qui s'ouvre et route vers la bonne destination ; l'ordre des Réglages et l'aspect du bouton inbox (clair/sombre). Quatre fichiers touchés (index.html, styles.css, app.js, icons.svg) ; sw.js bumpé.
   v2.64 — la surface de périmètre ne défilait plus et laissait passer l'en-tête de Collection. Une cause UNIQUE, cousine du piège sticky/overflow (v2.47, v2.60) : #tab-pile, présenté en surface (position:fixed ; inset:0 ; z-index:35) depuis la v2.55, vit DANS #tabTrack, qui porte will-change:transform. Or will-change:transform — exactement comme transform — fait de .track à la fois (a) le bloc conteneur des descendants fixed et (b) un contexte d'empilement. La « surface plein écran » n'était donc pas calée sur le viewport mais sur le rail : rognée par .viewport{overflow:hidden} — le défilement de la liste était mangé par l'overflow de l'ancêtre, le doigt ne déclenchait rien, exactement le symptôme du pouce —, et son z-index:35 confiné dans le rail, incapable de passer au-dessus de la topbar (z-index:25), d'où l'en-tête « Catégories » resté visible et #scopeHead masqué derrière. .rise emploie le MÊME motif (fixed, inset:0, z35) sans jamais ce bug, et c'est le tell : elle vit HORS du rail, enfant direct de #app. Le fix rend #tab-pile à ce statut le temps de la page — body.scoped .track{will-change:auto}. Pendant un périmètre le rail est immobile (onglets masqués, geste inter-onglets désarmé depuis la v2.57), donc le hint ne sert à rien alors ; le retirer libère #tab-pile pour qu'il soit fixe au viewport comme .rise : plein écran, non rogné, au-dessus de la topbar. AUCUN banc ne le voit — jsdom ne calcule aucune mise en page, c'est pourquoi ça a pu vivre depuis la v2.55, cette géométrie ne se jugeant qu'au pouce. À JUGER AU POUCE : entrer dans une catégorie / tag / source montre bien la surface plein écran avec #scopeHead en tête (retour · nom · tri) ; le défilement de la liste part sans accroc jusqu'en bas ; le retour (bouton / système / glissé-pour-fermer) ramène à Collection proprement. styles.css seul touché pour le fix ; app.js (version + ce changelog) et sw.js (cache) bumpés ; index.html inchangé.
   v2.66 — LA FICHE D'UN ITEM POUVAIT NE RIEN ENREGISTRER SANS LE DIRE. `saveItems()` avalait toute erreur de `window.storage.set` — la couche Supabase — dans un `catch` muet : réseau coupé, session périmée, refus RLS, tout rendait la main comme une écriture réussie. `commit()` posait alors `dirty=false` AVANT même d'appeler l'écriture, `#gSave` fermait la feuille et le toast disait « Item mis à jour » sur un enregistrement qui n'avait jamais eu lieu. Symptôme exact du pouce : on ajoute une icône ou une catégorie, on tape Enregistrer, on rouvre la fiche et le bouton dit « À jour » sur l'ancien état. C'est le pire mode de panne d'une app de capture — elle promet d'avoir gardé. `saveItems()` rend désormais un booléen ; `commit()` ne solde `base`/`dirty` et ne rend `true` qu'après confirmation ; `#gSave`, `#gArch` et `#gTrash` ne ferment plus la feuille sur un échec, et les deux derniers REMETTENT le statut mémoire dans sa position d'origine — sans ça l'écran montrerait un archivage que la base ignore. `onSheetClose` attend enfin sa promesse au lieu de toaster à l'aveugle. Deux défauts de la même fonction partent avec : (a) la branche « Créer » de `drawPick()` n'appelait pas `resolveCat()`, contrairement à la capture et à l'import — taper « fonts » à côté d'un « Fonts » existant fabriquait la jumelle que le garde-fou de la v2.52 devait empêcher ; (b) une catégorie créée depuis la fiche n'entrait pas dans `settings.cats`, donc elle disparaissait de l'index dès que son dernier item la quittait. Elle s'y inscrit maintenant, mais seulement une fois l'écriture confirmée. Reste ouvert, et c'est le vrai manque : il n'y a AUCUN repli local pour les items (seuls les réglages passent par localStorage), donc hors réseau l'app ne peut toujours rien garder — elle le dit, c'est tout. Un miroir localStorage rejoué au retour du réseau est le chantier suivant. app.js et sw.js touchés, cache bumpé
   v2.67 — REFONTE DE LA FICHE D'UN ITEM. Ce qui cassait : les morceaux ont été posés l'un après l'autre depuis la v1.1, et la fiche en portait les coutures. (a) Une icône s'affichait dans le contenant d'une photo — `.gprev` en pleine largeur, 60vh de haut : un pictogramme de 24 px étiré sur la moitié de l'écran, alors qu'une icône est une marque, pas une image. (b) Icône et couverture partageaient le champ `preview` : poser l'une effaçait l'autre, et « les deux » ou « ni l'un ni l'autre » n'étaient pas exprimables. (c) La catégorie ouvrait sa liste SOUS la ligne des pastilles, donc valider renvoyait le choix hors écran — il fallait remonter pour voir ce qu'on venait de poser ; les tags avaient le défaut jumeau, chips au-dessus du champ. Ce qui change. Modèle : `it.icon` est un champ neuf, distinct de `it.preview` qui redevient une photo et rien d'autre ; `normalizeItem` migre l'existant (un `preview` Iconify devient `icon`, les icônes sortent du vivier `previews`). Les quatre états sont désormais atteignables : icône, couverture, les deux, rien. Vues de la pile : elles n'ont qu'une case d'image, `faceOf()` tranche — la photo passe devant, l'icône sert de visage à défaut, exactement le rendu d'avant. Fiche : trois blocs (identité · Rangement · Contexte) au lieu d'une suite de champs. L'identité montre la couverture en 16/9 à ratio réservé et l'icône dans un blason de 56 px, posé en bas à gauche de la couverture s'il y en a une, à gauche du titre sinon. Un seul bouton « Média » ouvre un atelier à deux volets (`.seg`), un par objet, chacun avec son « Retirer » : c'est là que se décide la combinaison. Catégorie et tags deviennent deux lignes `.frow` qui AFFICHENT leur valeur ; le choix se fait dans `openPickLayer()`, une couche qui glisse par-dessus la fiche — recherche, création et liste complète au même endroit, sélection épinglée sous le champ — et qui rend la main pile où on était. Elle s'empile comme couche nommée, donc le retour système la ferme avant la fiche. Le pied et l'en-tête de la feuille, `commit()`, `saveItems()` et le garde-fou `resolveCat()` de la v2.66 sont inchangés. Reste ouvert : le blason sur une couverture sombre n'a pas été jugé au pouce ; « Retirer la couverture » ne supprime pas les vignettes candidates (elles restent dans le vivier, c'est voulu — on rechange d'avis) ; et le repli local des items manque toujours (v2.66). index.html, app.js, styles.css touchés, cache bumpé
   v2.68 — FILTRER DEVIENT UN BANDEAU, PAS UN TIROIR. Ce qui cassait : « Filtrer » est une icône d'en-tête depuis la v2.45, mais elle ouvrait un tiroir venu du BAS de l'écran. Le doigt appuie en haut, la réponse arrive en bas, et un voile recouvre la liste qu'on est précisément en train de régler — la cause et l'effet n'ont aucun lien visuel, et l'on ne voit pas ce que le filtre fait pendant qu'on le pose. Pourquoi : la zone du pouce avait justifié le tiroir, et elle a raison pour une FEUILLE (une tâche, on valide, on sort) ; « Filtrer » n'est pas ça. C'est un réglage direct, sans validation, dont le résultat est la liste elle-même : il doit vivre là où il agit. Ce qui change : (a) LE BANDEAU. Un conteneur entre l'en-tête et la liste (#filterBand, à côté de #filterState) s'ouvre sous l'entonnoir et POUSSE la liste ; hauteur animée par grid-template-rows 0fr→1fr, donc la valeur d'arrivée est le contenu et non un max-height au jugé. Il porte les deux rangées de la feuille, compteurs et ordres inchangés (types en ordre canonique, sources par taille, la valeur posée toujours proposée même à zéro). Un choix repeint tout — y compris les compteurs de l'autre axe — et NE REFERME RIEN : on pose un type puis une source. Aucun bouton de validation : le filtrage est direct, un « OK » laisserait croire le contraire. (b) LES FERMETURES, ET DEUX QUE J'AI RETIRÉES. L'entonnoir bascule, et le retour d'Android referme par le même chemin (couche nommée « band », invariant de la v2.44) ; changer d'onglet, entrer dans une page de périmètre ou en sortir le ferment aussi. Le proto validé au pouce en avait deux de plus, écartées à l'intégration : refermer au DÉFILEMENT ferait sauter la liste sous le doigt puisque le bandeau est dans le flux et remonte le contenu en se fermant ; refermer au TAP HORS ZONE volerait un tap destiné à un item, ici toute la liste est cliquable. Deux gestes de moins, aucune ambiguïté. (c) LA FEUILLE EST SUPPRIMÉE, `openFilterSheet` avec elle. Sa ligne « Réinitialiser les filtres » ne suit pas : « Tous » et « Toutes » sont dans le bandeau, « Tout effacer » reste dans la rangée d'état — trois chemins pour un retour en arrière, c'en était un de trop. (d) PAS DE DOUBLON D'ÉTAT. Bandeau ouvert, `renderFilterState` ne pousse plus les puces `type` et `source` : elles sont déjà dites en doré, deux lignes plus haut. Le périmètre, la recherche, le tri et l'état ne sont pas dans le bandeau, ils restent. Corollaire heureux : dans une page de périmètre, où le nom vit dans #scopeHead et non dans une puce (v2.55), ouvrir le bandeau n'ajoute AUCUNE bande — le feuilleté que je craignais n'existe que hors périmètre. (e) LA RANGÉE D'ACTIONS SE DÉTACHE DES PUCES. Elle était conditionnée à leur présence ; comme (d) les fait disparaître, « Épingler cette vue » s'évanouissait à l'instant où l'on venait de composer une vue à épingler. Elle s'affiche maintenant dès qu'un filtre est actif. Deux liens ne sont pas une bande vide au sens de la v2.46 : ils font quelque chose. (f) UN `.on` QUI NE PEIGNAIT RIEN, DEPUIS LA v2.45. `renderBadges()` posait `.on` sur #filterBtn, mais aucune règle `.btn.on` n'a jamais existé dans styles.css : un filtre posé était INVISIBLE dans l'en-tête dès que la liste avait défilé, puisque ses puces partent avec elle. La règle manquante est écrite, dans le vocabulaire de `.sortbtn.on` (teinte, jamais un chiffre — v2.45), et l'état couvre aussi le bandeau ouvert : un entonnoir allumé dit « j'ai quelque chose à dire », pas deux choses selon le cas. Huitième annulation de `[hidden]` posée d'avance sur `.fband`, l'audit du banc la réclamant. Ce qui reste ouvert : le TRI est dans #scopeHead en périmètre et derrière le titre (feuille « Vue ») dans Ma pile — deux endroits pour un même geste, à trancher ; `.pinnedrow` + bandeau + `.fstate` peuvent encore faire trois bandes hors périmètre, à juger au pouce avec de vraies vues épinglées ; et « À trier » reste un tiroir venu du bas alors que c'est un menu de navigation — le popover ancré attend son tour. Les quatre fichiers touchés
   v2.69 — LES DEUX TIROIRS QUI RESTAIENT, ET UNE TEINTE QUI DÉBORDAIT. Ce qui cassait : (1) `.btn.icon.on`, écrite en v2.68 pour l'entonnoir, visait TOUS les boutons d'en-tête — or `paintBadge()` pose le même `.on` sur #inboxBtn dès qu'il y a quelque chose à trier. L'enveloppe se retrouvait teintée EN PLUS de son point : deux signaux pour un seul fait, exactement ce que la v2.45 avait tranché en écrivant « un point, jamais un chiffre ». Régression visible sur la première capture qui a suivi la livraison. (2) « Vue » et « À trier » ouvraient encore des tiroirs venus du bas, avec le défaut de causalité corrigé pour Filtrer : on appuie en haut, la réponse arrive en bas. Pourquoi ces deux-là ne se règlent pas pareil : « Vue » est un RÉGLAGE — trois axes qu'on pose à la suite, sans validation, dont le résultat est la liste en dessous ; « À trier » est un MENU DE NAVIGATION — deux destinations, un tap, on est parti. Le premier veut un bandeau qui pousse, le second un panneau qui se pose. Les traiter pareil aurait été le confort de l'uniformité contre la nature des objets. Ce qui change : (a) LA TEINTE EST RESTREINTE à `#filterBtn.on`. Le titre, lui, ne se teinte pas — `.navtitle` est en `flex:1`, un fond peindrait toute la largeur de la ligne : il dit qu'il est déplié en PIVOTANT son chevron, piloté en CSS depuis `aria-expanded`. Celui qui pointait vers le bandeau pointe vers le titre. (b) « VUE » DEVIENT UN BANDEAU, sur le modèle exact de la v2.68 : `viewSeg` n'est pas touché d'un caractère, `.sortsheet`/`.sortlbl`/`.seg` étaient déjà globaux, seule la gouttière passe à 4 px pour tomber sur la verticale des pastilles de Filtrer. DEUX FENTES, une par onglet (#viewBandCat hors de #rootBrowse pour qu'un rendu de l'index ne l'emporte pas, #viewBandPile au-dessus de celle de Filtrer), parce que les deux sections vivent côte à côte dans le rail ; une seule est servie à la fois. Un choix règle et ne referme rien. Couche nommée « view ». UN SEUL PANNEAU OUVERT À LA FOIS, structurellement : ouvrir Filtrer ferme Vue et l'inverse — deux bandeaux dépliés au-dessus d'une liste, ce serait la barre d'axes de la v2.29 revenue par la fenêtre. (c) LE ⇅ DE LA SURFACE OUVRE CE MÊME BANDEAU. Le jugement laissé ouvert en v2.68 se règle tout seul : #scopeSort appelait déjà openViewMenu, il appelle maintenant la bascule du bandeau. Le tri ne vit plus à deux endroits. (d) « À TRIER » DEVIENT UN POPOVER ANCRÉ, posé sous l'enveloppe, flèche sur son centre. Position MESURÉE (getBoundingClientRect de l'ancre), jamais devinée : l'en-tête n'a pas de hauteur fixe — safe-area, corps du titre en `clamp` — et la caler en CSS serait le pari qui a coûté les v2.32/v2.33. Il vit au niveau de #app, hors des pistes, pour ne pas être rogné par l'`overflow:hidden` du rail (piège v2.64). Son voile est TRANSPARENT : il n'assombrit rien, il n'attrape que le tap du dehors — ce qu'un menu ancré doit accepter, à la différence du bandeau dont toute la liste en dessous est cliquable. Couche « pop », `placePop` rappelée au resize et à la rotation. Le balisage `.wake`/`.wline` ne change pas : c'est la même liste, ailleurs. (e) BUG TROUVÉ AU BANC, PAS AU DOIGT. `toggleInboxPop` lisait `pop.hidden` pour savoir s'il était ouvert, mais la fermeture attend la fin de la transition (200 ms) avant de masquer : pendant ce temps `hidden` est faux, et revenir sur l'enveloppe dans la seconde REFERMAIT au lieu d'ouvrir — un tap mort. Remplacé par un état explicite `popOn`. L'état d'un panneau ne se déduit pas de son habillage. `openViewMenu`, `drawViewMenu`, `viewMenuOn` et le corps de tiroir de « À trier » sont supprimés. LA GRAMMAIRE QUI EN SORT, et qui vaut pour la suite : l'en-tête ouvre VERS LE BAS, SUR PLACE — bandeau pour un réglage, popover pour un menu ; le bas de l'écran reste aux feuilles qui demandent une tâche ou une validation (la fiche d'un item, les Réglages, la gestion des catégories), là où la zone du pouce a raison. Ce qui reste ouvert : le bandeau « Vue » de Collection fait trois rangées segmentées, c'est haut pour un réglage qu'on pose une fois puis qu'on oublie — à compacter si le pouce le dit ; `.pinnedrow` + bandeau + `.fstate` peuvent toujours faire trois bandes hors périmètre ; et les feuilles restantes n'ont pas été relues à l'aune de la grammaire ci-dessus. Les quatre fichiers touchés
   v2.70 — CHANTIER 24 : L'ÉCHELLE DES CONTRÔLES, ET LE SOUS-TITRE D'UNE LIGNE. Ce qui cassait : rapport au pouce, captures à l'appui — « les pastilles sont énormes, pas homogènes ». Le relevé donne la vraie mesure : NEUF familles de pastilles dans styles.css, SIX hauteurs (18/33/36/37/38/42), CINQ corps (10/12,5/13/13,5/14,5) et SIX rayons pour UN SEUL rôle. Le plus visible : `.seg button` à 42 px côtoyait `.chip` à 38 — plus grand que sa voisine sans rien dire de plus, ce qui faisait lire les trois rangées du bandeau « Vue » comme une masse. Pourquoi : aucune de ces cotes n'était DÉRIVÉE, chacune s'est décidée au jugé au moment où sa famille a été écrite, et deux doublons de sélecteur y ont survécu — le piège que la v2.48 avait nommé était encore là, deux fois. Ce qui change : (a) UNE ÉCHELLE EN TOKENS. `--h-ctl:32px`, `--fs-ctl:13px`, `--px-ctl`, `--gap-ctl`, `--r-pill`, `--pad-seg`, plus `--fs-meta`/`--r-meta` pour ce qui se lit sans se toucher. Une hauteur, un corps, une gouttière pour TOUT ce qui se touche et se pose : pastille, segment, filtre posé, périmètre, tag, catégorie, sourdine. `--r-pill` est un nom neuf à côté de `--r-ctl` déjà pris par les boutons et les boîtes : deux noms parce que deux rôles, et parce que `--ctl-r`/`--r-ctl` aurait été le prochain piège. (b) LA FORME RESTE PORTEUSE DE SENS. Seules la hauteur et le corps rejoignent l'échelle ; le rayon 999 de `.fchip` est CONSERVÉ, parce que dans ce fichier le rectangle arrondi CHOISIT et la gélule SE RETIRE. Unifier les formes aurait effacé une distinction vraie au nom de l'uniformité. Le rail d'un segment devient concentrique à ses boutons (rayon + son propre retrait) au lieu d'être coté à part. (c) TROIS RÈGLES MORTES SUPPRIMÉES, trouvées en cherchant les cotes. `.chip` ligne 166 : même spécificité que la pastille canonique écrite 700 lignes plus bas, qui gagnait donc sur CHACUNE de ses propriétés, `:hover` compris. `.setwrap .seg` + son `button`/`.on`/`:active` : le chantier 13 avait sorti `.seg` des Réglages pour en faire « une seule primitive de choix » SANS retirer l'original. Le banc a CORRIGÉ mon diagnostic ici, et la vraie histoire est plus instructive : ce doublon ne posait pas de `min-height`, donc les 42 px du global s'appliquaient aux Réglages aussi ; son `padding:9px` vertical était inerte (42 en border-box dominait un contenu de 36) ; son corps et son rayon recopiaient le global à l'identique. Seul son retrait horizontal de 3 px différait vraiment. Un doublon presque entièrement MORT est plus dangereux qu'un doublon vivant : il donne à croire que les Réglages ont leur propre cote de contrôle, on vient l'éditer, et rien ne bouge. J'avais d'abord écrit que les Réglages tenaient une cote à eux de ~36 px — c'était faux, ils étaient à 42 comme tout le reste. `.capsug .chip{font-size:13px}` : devenu un no-op. (d) LA CIBLE TACTILE NE BOUGE PAS. `.chip::before` ne pose plus `-5px` en dur mais `calc((var(--h-ctl) - var(--tap)) / 2)` — une soustraction, pas une division par -2 : la cote visible peut maigrir, la zone au doigt reste à 48 par construction et non par coïncidence arithmétique. C'est ce découplage, déjà présent dans le fichier, qui AUTORISE tout le reste. (e) LE SOUS-TITRE D'UNE LIGNE. LIEN, GRAPHIC DESIGN et #font portaient trois cadres identiques : trois faits de valeur très inégale au même poids, et la ligne se lisait comme un tableau. Le type est déjà dit par la vignette et par le titre, il perd son cadre ; le tag aussi, le `#` suffit ; la CATÉGORIE garde le seul cadre restant, parce qu'elle est la seule à être un LIEU où l'on peut aller. `.mini.none` occupe la même fente et s'en distingue en POINTILLÉ — c'est ce que le pointillé dit déjà ailleurs dans ce fichier (`.chip.ghost`, `.tagsug`) : « à poser ». Un fond plein aurait fait croire à une catégorie nommée « non classé ». `.mini.when` GARDE son cadre : ce n'est pas une métadonnée mais un état d'exception, et il est désormais la seule chose colorée de la ligne — c'est voulu. (f) BUG TROUVÉ EN CHEMIN, jamais rapporté : le sélecteur était `.row .mini`, il ne touchait donc PAS les cartes de galerie, où le même type et la même catégorie tombaient en texte nu, sans police mono ni cadre. Même fait, deux allures selon la vue. Le sélecteur se dé-scope de `.row` et les deux vues s'accordent. Côté app.js, la fente catégorie prend la classe `cat` aux deux endroits qui la produisent (carte de galerie et ligne de liste) : sans elle, le CSS ne pouvait pas distinguer le type de la catégorie, tous deux en `.mini` nu. UNE SEULE EXCEPTION EST GARDÉE, et documentée sur place : `.fchip.schip` conserve son corps de 14,5 px, parce que ce n'est pas l'étiquette d'un filtre mais le nom du lieu où l'on se trouve. Une exception documentée n'est pas une dérive ; le fichier n'a plus le droit d'en avoir d'autres. Ce qui reste ouvert : ceci unifie la COTE, pas la QUANTITÉ — le bandeau « Vue » fait toujours trois rangées segmentées pour un réglage qu'on pose une fois puis qu'on oublie, exactement la question laissée ouverte par la v2.69, et elle est d'un ordre supérieur : elle se réglera en retirant des rangées, pas en les rapetissant. `.pinchip` reste HORS échelle : c'est une carte à deux lignes déguisée en pastille, elle mérite son propre barreau. `.badge` de la carte de remontée n'a pas été relu — c'est une autre grammaire, celle du rituel, et la mélanger à celle des listes serait le prochain doublon. Le mode compact n'a pas été revu au doigt après le changement de hauteur. UN AJUSTEMENT VENU DU BANC, pas du dessin : le retrait horizontal de `.seg button` passe de 8 px à 4. Dans une grille de colonnes `1fr` le texte est déjà centré, le retrait ne sert qu'à l'écarter du rail, et 8 px tronquaient « Chaque semaine » sur un écran de 360 px dès que le corps est monté à 13. L'`overflow:hidden;text-overflow:ellipsis` du fichier avait anticipé le cas ; il vaut mieux ne pas l'atteindre. Deux fichiers touchés, plus sw.js pour le cache.
   v2.71 — LES DEUX FICHES D'ÉDITION : HIÉRARCHIE, UNE SEULE FAMILLE DE CONTRÔLE, ET LA BANQUE D'ICÔNES SORT DU BAS DE LA FEUILLE. Ce qui cassait : rapport au pouce sur les captures, « ça manque de hiérarchie, ça manque d'homogénéité », et un défaut précis — on cherchait une icône sans jamais voir les icônes. `openIconSearch()` GREFFAIT sa banque dans un conteneur au bas de la liste de la feuille : le champ de recherche se retrouvait sous deux grilles (Récents, Suggérées), ses résultats s'écrivaient dans un troisième conteneur encore plus bas, et le clavier finissait de couvrir ce qui restait. Le geste « je tape deux lettres et je regarde » exigeait de faire défiler à l'aveugle. Pourquoi : la banque avait été écrite en v2.2 comme un bloc à monter n'importe où, et ce « n'importe où » est devenu le bas d'une feuille de plus en plus longue ; la couche de choix de la v2.67, elle, avait déjà réglé le même problème pour les catégories et les tags — deux réponses au même défaut cohabitaient, l'ancienne survivait par inertie. Deuxième cause, structurelle : NEUF familles de contrôle ouvraient « un choix » dans ces deux fiches (`srow`, `frow`, `chip`, `covbtn`, `mediabtn`, `linkbtn`, `schips`, `pickrow`, `gpick`), et TROIS formes d'étiquette disaient la même chose (`gsplit`, `ssec`, `fbox>label b`). Ce qui change : (a) LA COUCHE DU VISUEL. `openIconSearch` disparaît, `openVisuelLayer` la remplace : une surface plein écran (#icLayer, sœur de #pkLayer — deux éléments et non un réécrit sous lui-même, sinon le retour système se perd), où le champ, les teintes et le segment vivent HORS de la zone qui défile, et où taper REMPLACE les bandes au lieu de s'empiler dessous. Trois états, jamais deux à la fois : les bandes au repos, une phrase à une lettre, les résultats seuls à partir de deux. La recherche n'écrit que dans son propre conteneur, donc le champ ne se déplace jamais sous le doigt pendant qu'on tape, et une réponse plus lente qu'une frappe plus récente est jetée. Un seul objet pour deux protocoles : `panes:["icon"]` pour une catégorie, `["icon","cover"]` pour un item. (b) LA FEUILLE D'UNE CATÉGORIE, TROIS NIVEAUX. Le nom et la pastille montent sur le papier nu, en taille de titre : ce sont les deux actions les plus fréquentes et elles quittent la liste. Renommer se fait SUR le nom — `prompt()` part avec, c'était le dernier endroit où le navigateur parlait à la place de Sable. Les bascules descendent dans une carte levée (`.setbox` des Réglages, v2.21) et MONTRENT leur état : un interrupteur allumé dit « épinglée », « Désépingler » n'annonçait que ce qui arriverait. Le nuage de N pastilles « Fusionner dans… » — quatre rangées de défilement sur vingt-sept catégories — devient UNE rangée qui ouvre la couche de choix, avec `noCreate` : sans ce filet, taper un nom inconnu aurait fabriqué une catégorie vide puis versé la source dedans, soit un renommage déguisé en fusion. « Supprimer » passe en texte sous la carte : la hiérarchie dit le risque au lieu de le peindre en rouge à hauteur d'un réglage. (c) LA FICHE D'UN ITEM, MÊME DOCTRINE. Le bouton « Média » et son atelier sont supprimés : c'était un accordéon dans la feuille, contenant un segment, contenant la banque greffée en bas — quatre niveaux d'imbrication pour un objet qu'on REGARDE. Le visuel se touche là où il se voit : la couverture, le blason posé dessus, ou le blason seul, qui existe DÉSORMAIS TOUJOURS (en pointillés quand l'item est nu — sinon il n'y aurait plus aucune porte au moment précis où l'on veut en poser une). Rangement devient une carte de trois rangées, et la remontée programmée en est la troisième : elle était un accordéon de six éléments (« Programmer une remontée… », trois pastilles, un champ date, un résumé, un lien de retrait) dont rien ne se lisait tant qu'on n'avait pas déplié — on ouvrait donc une fiche sans savoir si une date était posée. Elle affiche sa valeur et ouvre une couche, comme Catégorie et Tags. Les cinq petits boutons gris de la couverture (Galerie, Coller, Lien, Rafraîchir, Retirer) deviennent des rangées dans la couche, et le vivier passe en 16/9 : il était en cases carrées de 64 px, où une photo panoramique ne montre rien de ce qu'elle est. La suppression d'une vignette survit au déménagement. La note de contexte perd sa boîte grise posée sur une feuille grise. « Jeter » quitte l'en-tête, où il était le jumeau visuel de « Mettre de côté » alors que l'un vide la fiche et l'autre se défait d'un tap. (d) LE PIÈGE QUE LE DÉMÉNAGEMENT AURAIT POSÉ, VU AVANT LIVRAISON. `snap()` lisait le vivier DANS LE DOM (`#gPicker .gpick`). Ça marchait tant que le panneau était toujours monté ; dans une couche, il ne l'est plus, et une image ajoutée puis la couche refermée passait pour « rien à enregistrer » — la fiche aurait promis « À jour » sur un ajout perdu, exactement le mode de panne de la v2.66. `cands` devient la source de vérité. (e) LE MÉNAGE. 75 règles CSS mortes retirées (`mediabtn`, `matelier`, `mpane`, `mcur`, `mthumb`, `mlbl`, `covsrc`, `covbtn`, `covrow`, `iconres`, `iconcell`, `icontray`, `traylbl`, `iconhint`, `gpicker`, `gpick`, `gpickdel`, `tintrow`, `tintsw`, `whensum`, `chiprow`, `gsplit`, `ssec`, `schips`, `pickempty`, `frow`, `fbox`), et une étiquette unique (`.eyebrow`) remplace les trois. Aucune valeur nouvelle : tout dérive des tokens du chantier 24. 9 symboles ajoutés au sprite. Reste ouvert : la bascule « Remonte en surface » lit `mutedCats` À L'ENVERS — l'UI dit l'état, le champ dit la négation, et le nom du champ n'a pas été migré ; « Une date précise » est un `input[type=date]` natif, donc à l'apparence du système et non à celle de Sable ; le champ URL, une fois ouvert, ne se replie plus ; et le repli local des items manque toujours (v2.66). index.html, app.js, styles.css, icons.svg touchés, cache bumpé
   v2.72 — LES DEUX FICHES NE SE RESSEMBLAIENT TOUJOURS PAS, ET LA CAUSE ÉTAIT UNE GOUTTIÈRE. Ce qui cassait : rapport au pouce sur la livraison v2.71, captures à l'appui — « ça manque encore d'homogénéité entre les fiches catégorie et item, la fiche catégorie est mieux réussie ». Le jugement est juste et la cause est mécanique, pas esthétique. La feuille d'une catégorie recevait `.sheet.eyeb .slist{padding:0 var(--s4) 22px}` ; la fiche d'un item, elle, hérite de `.sheet.tall .slist{padding:0 0 10px}` — ZÉRO gouttière. Sa couverture, sa carte de rangement, son eyebrow « RANGEMENT » et sa note allaient donc bord à bord de la feuille, quand la catégorie respirait de 16 px. J'avais écrit la gouttière pour UNE des deux fiches et pas pour l'autre : deux classes disaient la même intention, une seule la tenait. Pourquoi ce genre d'écart survit : `.eyeb` avait été introduite pour un seul besoin (l'encre de l'en-tête d'une feuille courte), puis la fiche d'item est restée sur `.tall`, qui est une HAUTEUR et n'a jamais eu à dire ce qu'est une fiche. Ce qui change : (a) UNE SEULE CLASSE, `.fiche`, portée par les DEUX feuilles. Elle porte tout ce qui fait une fiche d'édition : l'encre mono de l'en-tête, l'ABSENCE de filet sous cet en-tête (la catégorie n'en avait pas, l'item en avait un — un trait qui traverse, exactement ce que la v2.71 avait retiré partout ailleurs), la gouttière de 16 px, et le poids d'un bouton d'en-tête. Les blocs qui posaient leur propre retrait horizontal le rendent à `.slist` (`.ident`, `.gsrc`, `.gtitle`, `.gtext`), sinon la gouttière se serait ajoutée à un retrait de 14 px déjà là — et 14 à côté de 16 est le genre d'écart qu'on ne nomme pas mais qu'on voit. `.tall` redevient ce qu'elle a toujours été, une hauteur, et les autres feuilles hautes (Réglages, Corbeille, Importer) ne bougent pas d'un pixel. (b) LE BOUTON D'EN-TÊTE SORT DE SA BOÎTE. `.sheadbtn` est un carré plein avec fond et bordure ; sur une fiche où la catégorie n'a AUCUN bouton d'en-tête, il faisait de « mettre de côté » l'objet le plus lourd du haut de l'écran — plus lourd que le nom de l'item, qui est le sujet. Fond et bordure retirés sur `.fiche`, le fond ne revient qu'à l'appui. (c) LE BLASON D'UN ITEM PREND LA COTE DE LA PASTILLE D'UNE CATÉGORIE. Ils différaient de 6 px (56 contre 62), de 4 px de rayon (14 contre 18), de fond (surface-2 contre accent-soft) et d'affordance (rien contre une bulle au crayon) — alors que ce sont deux objets qui ouvrent LA MÊME couche par LE MÊME geste. Ils se ressemblent maintenant. Exception assumée : posé sur une photo, le blason reste petit, clair et sans bulle — là il est POSÉ, il n'est pas offert, et une bulle sur une image serait un troisième objet dans un coin déjà chargé. (d) LES DEUX PUCES DE VALEUR AVAIENT DEUX RECETTES, côte à côte dans la même colonne de la même carte : la catégorie en accent-soft plein, le tag en contour accent sur fond transparent. Deux taches dorées de nature différente pour deux réponses de même nature — c'est ce que la capture montre le plus crûment. Une seule recette (papier, filet, encre), et seule la glyphe `#` garde la couleur. Le contour accent du tag conserve son sens ailleurs, dans `.tagsel`, où il veut dire « sélectionné » : la correction est portée par `.vwrap` et ne touche pas cet usage. (e) LE CRAYON DE LA SOURCE PASSE APRÈS L'HÔTE. Le nom d'une catégorie porte le sien à droite ; la source le portait à gauche, si bien que deux libellés corrigeables au même geste ne commençaient pas sur la même verticale. (f) MÉNAGE DE LA LIVRAISON PRÉCÉDENTE : six lignes de `styles.css` avaient été recollées par la suppression des 75 règles mortes de la v2.71 (une règle et le commentaire de la suivante sur la même ligne). Aucun effet de rendu, mais le fichier devenait illisible à l'endroit exact où l'on viendra relire. Rien de nouveau côté valeurs : tout dérive toujours des tokens du chantier 24. Reste ouvert, inchangé : « Remonte en surface » lit `mutedCats` à l'envers (l'UI dit l'état, le champ dit la négation, le nom du champ n'est pas migré) ; « Une date précise » reste un `input[type=date]` natif, donc à l'apparence du système ; le champ URL, une fois ouvert, ne se replie plus ; le repli local des items manque toujours (dette v2.66). app.js et styles.css touchés, cache bumpé
   v2.73 — LA SURFACE D'UN PÉRIMÈTRE SORTAIT PAR LE HAUT DÈS QUE LA PAGE ÉTAIT DÉFILÉE, ET LA PAGE DEVENAIT UNE IMPASSE. Ce qui cassait : depuis le menu « À trier » de l'en-tête, taper « Non classés » donnait un écran figé — les items non classés bien là, cochables, mais pas d'en-tête de page, pas de barre de sélection, pas d'onglets, et rien qui défile. Aucune porte de sortie : ni retour, ni Annuler, ni Collection. Pourquoi : la v2.64 avait diagnostiqué le bon mécanisme — #tab-pile est présenté en `position:fixed` alors qu'il vit dans #tabTrack — mais n'a désarmé qu'UNE des deux sources du bloc conteneur, le `will-change:transform` du fichier CSS. La seconde est écrite EN LIGNE par paintTabs à chaque changement d'onglet, et un `transform`, même `translate3d(0px,0,0)`, fait bloc conteneur et contexte d'empilement au même titre que le hint. La surface restait donc calée sur le RAIL et non sur la fenêtre. Ce qui a caché le défaut un an : au sommet de Collection le haut du rail est juste sous l'en-tête, l'erreur valait quelques dizaines de pixels et le résultat passait pour juste. Le menu « À trier » vit dans l'en-tête, qui est COLLANT : c'est le seul chemin qui s'emprunte couramment depuis le BAS d'une longue liste. Là, le haut du rail est au-dessus de l'écran, et la surface avec lui : #scopeHead (retour · nom · tri) et #pileSelbar sortaient par le haut, la topbar de Collection repassait par-dessus (son z-index 25 gagne sur un 35 confiné dans le rail), et le doigt tombait sur le défileur interne d'une liste de trois items, qui n'a rien à défiler. Le défaut n'est donc pas dans le menu ni dans la sélection : il est dans la position, et il touchait AUSSI l'entrée dans une catégorie ou un tag depuis une position défilée. Ce qui change : une seule déclaration, `transform:none!important` ajoutée à `body.scoped .track`. `!important` est la forme juste et non un raccourci — il faut battre un style en ligne — et l'accrocher à la classe `scoped` le fait tomber tout seul à la fermeture, sans que personne ait à réécrire la translation du rail. Le bloc conteneur reste la fenêtre pendant TOUTE la sortie, y compris après le paintTabs que selectTab("categories") déclenche avant le transitionend : sinon la surface aurait sauté au milieu de son glissé. Aucun JS touché, aucune géométrie nouvelle. Ce que ça ne règle pas : ouvrir un périmètre depuis Ma pile (par un tag, via la fiche d'un item) remet le rail à zéro d'un coup, donc c'est Collection et non Ma pile qu'on aperçoit derrière pendant les 260 ms du glissé d'entrée — cosmétique, et cohérent avec le fait que la sortie ramène de toute façon sur Collection. « Non classés » entre toujours directement en mode sélection : c'est voulu (on vient pour ranger), mais ça reste à juger au pouce maintenant qu'on voit enfin la barre. Et aucun banc ne voit ce correctif — il est de la géométrie, il se tranche sur un vrai navigateur, page défilée. styles.css seul touché, cache bumpé.
   v2.74 — « NON CLASSÉS » S'OUVRAIT EN MODE SÉLECTION, ET PERSONNE NE L'AVAIT DEMANDÉ. Ce qui cassait : la v2.73 ayant rendu la page visible, on a enfin pu voir ce qu'elle faisait — taper « Non classés » dans le menu « À trier » posait la page ET entrait d'office en sélection, six cases à cocher et une barre « 0 sélectionné » avant d'avoir lu une seule ligne. Pourquoi : la v2.63 avait écrit `enterCollection("none");enterSel();` en supposant l'intention — on vient pour ranger, autant armer le lot. C'est exactement le raisonnement que la v2.45 avait DÉJÀ tranché en retirant le ✓ de l'en-tête de Ma pile : « il faut choisir quelque chose » dit à quelqu'un venu regarder. La supposition avait survécu parce qu'on ne la voyait pas — l'en-tête de la page et sa barre de sélection sortaient de l'écran (v2.73), donc le mode s'installait en silence et le seul symptôme visible était des ronds à la place des ⋯. Un défaut caché par un autre. Ce qui change : les TROIS portes vers « Non classés » — le menu « À trier », le réveil du matin (openWake) et la ligne des Réglages — laissent tomber `enterSel()`. Une porte ouvre un LIEU, elle ne présume pas du geste qu'on y fera. La sélection garde ses deux entrées, toutes deux avec l'item sous le doigt déjà coché : l'appui long (v2.19) et « Sélectionner » dans le ⋯ de l'item (v2.49) — donc rien n'est perdu, et le chemin du lot est le même ici que partout ailleurs. Les trois portes sont corrigées ensemble et non la seule signalée : elles mènent au même endroit, et deux comportements pour une destination est le doublon que ce fichier passe son temps à payer. Ce que ça ne règle pas : `enterDormant()` (ligne « Dormants » des Réglages) force TOUJOURS la sélection, volontairement laissé — c'est une autre destination, jamais jugée au pouce, et la solder au passage aurait été une décision non demandée. « Non classés » reste en outre un périmètre comme un autre, sans aucune affordance de classement par lot en propre : ranger six items suppose encore de les cocher un à un. app.js seul touché, cache bumpé.
   v2.75 — LES DEUX BANDEAUX S'OUVRAIENT HORS DU CHAMP DÈS QUE LA LISTE ÉTAIT DÉFILÉE. Ce qui cassait : rapport au pouce, captures à l'appui — en bas de l'index des catégories, taper le titre « Catégories » pour atteindre Grouper / Trier / Voir en ne montre RIEN ; il faut deviner qu'il faut remonter toute la liste. Même défaut sur l'entonnoir de Ma pile. Pourquoi : les v2.68/v2.69 ont eu raison de sortir Filtrer et Vue des tiroirs venus du bas — un réglage doit vivre là où il agit — mais elles les ont posés en TÊTE de leur section, dans le flux, tandis que leur déclencheur vit dans un en-tête COLLANT qui suit le doigt. À dix rangées du haut, le panneau se déplie à 2000 px au-dessus du regard : l'écran ne bouge pas, le tap paraît mort. C'est exactement le défaut de causalité que ces deux versions croyaient avoir soldé, à l'envers — la réponse n'arrive plus en bas, elle arrive hors cadre. Ce qui change : (a) OUVRIR UN BANDEAU AMÈNE LE REGARD À LUI. `revealBand()` mesure la position du panneau après le rendu, et s'il n'est pas déjà sous l'en-tête, défile jusqu'à lui. Pas une ligne de géométrie nouvelle : il appelle `jumpToEl` (v2.60/v2.61), qui TROUVE son défileur au lieu de le supposer — body hors périmètre, #tab-pile en surface — et pose la cible sous l'en-tête collant. Le bandeau n'est PAS rendu collant : il recouvrirait la liste qu'il règle, et rejouerait le piège sticky/overflow des v2.47 et v2.64. Ce n'est pas une rechute --tbh non plus : lire une position pour DÉFILER est le métier du JS, l'interdit ne vise qu'une mesure JS qui nourrit un positionnement CSS. (b) ON REND LA PLACE. Perdre son point de lecture dans un index long pour un coup d'œil au tri serait un troc perdant, donc `bandBack` retient le défileur et son offset, et refermer y ramène. Sous DEUX conditions, toutes deux nécessaires : la fermeture doit être DEMANDÉE (le titre, l'entonnoir, le ⇅ de la surface, le retour d'Android — d'où le paramètre `back`, faux pour les fermetures de contexte de selectTab / openScopePage / exitScope, où il n'y a plus de place à rendre) ; et l'on ne doit RIEN avoir posé (`bandTouched()` sur chaque pastille des deux bandeaux) — un tri ou un filtre change la liste, et un décalage mesuré sur l'ancienne n'y désigne plus rien. Passer de Vue à Filtrer sans refermer transmet le point de départ (`keep`), les deux bandeaux n'en font qu'un pour ce calcul. (c) `stickyHeadH()` factorise la mesure de l'en-tête collant que `jumpToEl` faisait en ligne — expression identique, comportement inchangé. AUCUN BANC NE LE VOIT : jsdom ne calcule aucune mise en page, tous les rectangles y sont nuls, donc `revealBand` y prend toujours la branche « rien à faire » — ce qui est aussi la garantie qu'il n'y casse rien. À JUGER AU POUCE : en bas de l'index des catégories, taper le titre remonte et montre le bandeau ; refermer sans rien toucher redescend là où l'on était ; poser un tri puis refermer laisse en haut ; l'entonnoir de Ma pile, le ⇅ d'une page de périmètre et le retour d'Android suivent le même chemin. Ce qui reste ouvert : deux défilements doux pour un aller-retour, c'est du mouvement que personne n'a demandé — si le pouce le trouve bavard, c'est le retour (b) qu'on retire, pas l'aller ; et le bandeau « Vue » de Collection fait toujours trois rangées segmentées, haut pour un réglage qu'on pose une fois. app.js seul touché, cache bumpé
   v2.76 — UNE CATÉGORIE PEUT ENFIN CHOISIR SA COUVERTURE. Ce qui manquait : depuis le chantier 12 (v2.24) la couverture d'une catégorie est FIGÉE sur son premier item — décision juste à l'époque, contre une vignette qui changeait de visage à chaque capture, mais c'est une dérivation SANS PORTE : la seule main qu'on avait sur le visage d'une catégorie était son icône, et pour changer sa photo il fallait ranger un autre item plus ancien. Pourquoi ça se règle ici et pas ailleurs : la couche du visuel de la v2.71 sait DÉJÀ tout faire — deux volets, un vivier en 16/9, galerie / coller / lien, un pied « Retirer » — et elle n'était appelée qu'avec `panes:["icon"]` pour une catégorie. Il n'y avait pas une fonctionnalité à écrire, il y avait un protocole à brancher. Ce qui change : (a) LE VIVIER NE S'INVENTE PAS. `catShots(name)` rend les photos des items de la catégorie, du plus ancien au plus récent, en y ajoutant les vignettes CANDIDATES de chacun (`previews`) — celles que le site proposait et qu'aucun item n'a retenues redeviennent des candidates légitimes pour la catégorie. Ce sont des URL déjà en pile : elles ne coûtent rien à garder. Les icônes sont écartées du vivier (`isIcon`) — une marque n'est pas une photo, c'est l'invariant de la v2.67 et il vaut aussi ici. (b) UN CHOIX PRÉCÈDE LA DÉRIVATION, IL NE LA REMPLACE PAS. `settings.catCovers[nom]` gagne quand il existe, sinon `catCover()` fait exactement ce qu'elle faisait. « Retirer la couverture » rend donc la catégorie à son premier item, jamais au vide — un retrait ne fabrique pas un trou. (c) LA BOÎTE 16/9 ENTRE DANS LA FICHE, la MÊME que celle d'un item (`.gcover`) : deux fiches, un contenant, la suite de la v2.72. Elle est là même vide — c'est la porte, et sans elle il faudrait deviner que la couverture se trouve derrière le blason. (d) LA COUCHE S'OUVRE SUR LE VOLET DU GESTE. Nouveau `opt.pane` : toucher la couverture ouvre « Couverture », toucher le blason ouvre « Icône ». Sans ça, poser une photo demandait un tap de plus sur un segment qu'il fallait d'abord remarquer. La fiche d'un item n'est pas touchée : ses trois déclencheurs montrent la même chose, ils continuent d'ouvrir la même chose. (e) L'ÉCRITURE PEUT ÉCHOUER, ET ELLE LE DIT. Les réglages vivent dans localStorage, et une image venue de la galerie y va en dataURL : elle a un poids, le quota existe. `saveSettings()` rend désormais un booléen — son `catch` était muet, la faute exacte de la v2.66 dans une autre fonction — et `setCatCover` REMET la valeur d'avant puis le dit, au lieu de promettre. Aucun appelant existant n'est touché : ils ignorent tous la valeur de retour. (f) `renameCat` / `mergeCat` / `deleteCat` emportent la couverture comme ils emportaient déjà l'icône. Ce que ça ne règle pas : la couverture choisie ne se voit QUE sur la carte de grille et dans la fiche — l'index est en LISTE par défaut, où une catégorie n'a jamais montré que son visage de 32 px, donc le choix ne se lit pas là où l'on passe le plus de temps, et l'en-tête d'une page de périmètre ne la montre pas non plus. Elle vit dans les réglages, donc dans localStorage : elle ne SUIT PAS d'un appareil à l'autre alors que les items, eux, passent par Supabase — la même dette que le repli local des items (v2.66), prise par l'autre bout. Et un dataURL de galerie est gardé tel quel, sans plafond de poids autre que le quota : quelques couvertures collées et le refus arrive, honnêtement mais tard. Aucun banc ne juge la boîte vide ni le vivier — c'est de la mise en page et du corpus. À JUGER AU POUCE : la boîte vide se lit-elle comme une porte ; le vivier propose-t-il assez d'images sur une vraie catégorie ; le retour au premier item après « Retirer » est-il compris. app.js et styles.css touchés, cache bumpé
   v2.77 — LA COUCHE DU VISUEL NE DÉFILAIT PAS, ET SA PUCE D'EN-TÊTE MENTAIT. Ce qui cassait : rapport au pouce sur la livraison v2.76, capture à l'appui — sur « Graphic Design » et ses treize couvertures, la grille sort de la feuille, passe sous la barre système et RIEN ne défile ; la carte « Ajouter » (galerie · coller · lien) est donc inatteignable, et avec elle le seul chemin vers une image qui ne vient pas des items. Pourquoi : `.pkscroll` est écrite dans le JS depuis la v2.71 et n'existait NULLE PART dans styles.css. Sans règle, ce n'est pas une zone de défilement mais un `div` ordinaire dans une colonne flex : il déborde. Le défaut est donc de la v2.71, pas de la v2.76 — mais il ne pouvait pas se voir avant elle. Les trois contenus qui passaient par là tenaient tous à l'écran : les deux bandes d'icônes défilent à l'HORIZONTALE et sont de hauteur fixe, le vivier d'un item compte trois ou quatre vignettes, et la couche de la remontée (`openWhenLayer`, qui emprunte la même carcasse) a quatre rangées. Un vivier de catégorie en donne treize d'un coup. Ce qui l'a caché plus sûrement encore : la couche de choix, sa jumelle, nomme sa zone `.pklist` et porte la règle depuis toujours — deux noms pour un rôle, et l'un des deux n'était pas servi. La règle est écrite (`flex:1`, `min-height:0`, `overflow-y:auto`, `overscroll-behavior:contain`, retrait bas en zone sûre), donc les TROIS couches en profitent, pas seulement celle qui a signalé. Deuxième défaut, du même écran : LA PUCE EN HAUT À DROITE. Elle affichait l'ICÔNE quelle que soit le volet ouvert — dans « Couverture », un carré barré (`nocover`) posé au-dessus d'une grille de treize images, qui se lit comme une erreur de chargement et non comme un état. Elle dit maintenant l'état du VOLET OUVERT : la couverture choisie dans « Couverture », l'icône dans « Icône », et RIEN quand il n'y a rien — un élément d'état absent vaut mieux qu'un élément d'état vide, c'est la leçon de la v2.46, et la sélection du vivier est déjà dite en dessous par son cadre. La puce d'une couverture prend un ratio panoramique et REMPLIT, là où une icône est contenue : un carré aurait menti sur ce qu'on vient de choisir (leçon du vivier passé en 16/9, v2.71). Deux règles mortes partent avec, `.pkcur svg` et `.pkcur.none`, qui n'avaient plus d'émetteur. Ce que ça ne règle pas : le symbole `nocover` reste dans icons.svg sans aucun appelant — c'est du vocabulaire, pas une règle de style, et je ne touche pas au sprite pour ça ; le volet « Couverture » d'une catégorie n'a toujours pas de pied tant qu'aucune couverture n'est posée, donc rien ne dit là qu'on peut revenir à la dérivation ; et le défilement de la couche ne se juge qu'au pouce, aucun banc ne calcule de mise en page (jsdom rend toutes ses hauteurs à zéro) — ce qui est vérifié ici, c'est que la classe est bien émise et que la règle existe, pas qu'elle défile. app.js et styles.css touchés, cache bumpé
   v2.80 — LA RECHERCHE D'IMAGE EST RETIRÉE. Elle n'a pas cassé : elle n'a pas mérité sa place, et c'est un motif de retrait suffisant. Ce qui a été essayé, en deux temps : la v2.78 a branché une recherche Unsplash dans le volet « Couverture » de la couche du visuel — quatrième source après la galerie, le presse-papier et le lien, la seule qui n'exige pas de posséder déjà l'image ; la v2.79 a tenté de sauver l'idée en réglant les deux reproches du pouce (la clé rangée sur un seul appareil, l'inscription en péage à l'entrée) : la clé passait dans le bloc CONFIG et Wikimedia Commons devenait une banque par défaut sans compte. Pourquoi ça part quand même. (a) LE COÛT D'ENTRÉE NE SE DÉPLACE PAS, IL EXISTE. Unsplash veut une application « démo » créée à la main sur un site tiers ; déplacer la clé de `settings` vers `index.html` réduit le geste à une fois pour toutes, mais UNE FOIS reste plus que ZÉRO, et aucune autre fonction de Sable ne demande d'aller s'inscrire ailleurs pour exister. (b) LA BANQUE SANS CLÉ NE TENAIT PAS LA PROMESSE. Commons rend des images justes et rarement belles : c'est un fonds documentaire, pas une banque de couvertures. Proposer deux banques dont l'une demande une inscription et l'autre ne donne pas ce qu'on cherche, c'est offrir un choix entre deux insuffisances — et faire porter au doigt un arbitrage que le code aurait dû trancher. (c) LE CRÉDIT NE SURVIVAIT PAS AU CHOIX, dette notée aux deux livraisons et jamais réglée. Sur Unsplash c'était une entorse aux conditions de l'API ; sur Commons, où la licence change à chaque fichier, une entorse à la LICENCE. Garder une fonction en sachant qu'elle n'est pas conforme, et que la rendre conforme demande un champ de modèle plus une décision sur l'endroit où il s'affiche, c'était s'endetter pour un usage non démontré. (d) LE VOLET RESTE ENTIER SANS ELLE. Galerie, presse-papier, lien : trois sources, et le vivier de la v2.76 qui propose déjà les vignettes candidates de la catégorie. La v2.78 partait du constat qu'il fallait sortir de l'app pour trouver une image — c'est vrai, et un navigateur fait ça mieux que Sable, puis « Coller une image » rentre le résultat en un geste. Ce qui change, concrètement : app.js, index.html et styles.css reviennent à l'identique de la v2.77 — pas une règle CSS orpheline, pas un symbole d'icône ajouté, pas une constante de configuration morte. `UNSPLASH_KEY` quitte le bloc CONFIG. Le seul code NOUVEAU de cette version est un ménage : `loadSettings()` supprime `unsplashKey` et `imgBank`. `settings` se recharge par étalement de ce qui est stocké, donc une clé que plus personne ne lit serait réécrite à chaque `saveSettings()`, et `unsplashKey` est une clé d'API qui n'aurait plus aucune UI pour la retirer — un réglage sans lecteur doit disparaître du stockage, pas y dormir. Sans effet pour qui n'a jamais déployé les v2.78/v2.79 : on supprime une clé absente. Ce que ça ne règle pas : le besoin qui a lancé le chantier EST RÉEL et redevient ouvert — une catégorie neuve n'a pas d'image, et son visage reste dérivé du premier item ou de son blason tant qu'on ne colle rien. Si le sujet revient, la question à poser d'abord n'est pas « quelle banque » mais « où vit le crédit d'une couverture dans le modèle » : c'est elle qui a bloqué deux fois. Reste ouvert, inchangé depuis la v2.77 : `enterDormant()` force encore le mode sélection ; la hauteur du bandeau Vue sur Collection ; l'empilement `.pinnedrow` + bandeau + `.fstate` hors périmètre ; « Remonte en surface » lit `mutedCats` à l'envers ; « Une date précise » reste un `input[type=date]` natif ; le champ URL ne se replie plus une fois ouvert ; et le repli local des items manque toujours (dette v2.66). État réel du dépôt vérifié au moment du retrait : la v2.78 A ÉTÉ déployée (app.js, styles.css, sw.js en cache v71), la v2.79 non — index.html n'a donc jamais reçu `UNSPLASH_KEY` et n'a rien à recevoir ici. À remplacer : app.js, styles.css (elle porte les cinq règles de la v2.78, `unscred`, `unsdoc`, `unskey`, `unsnote`, `pksearch input:disabled`, qui n'auraient plus d'émetteur — une règle morte est une dette de lecture, pas un octet perdu) et sw.js, cache v71 → v73. Le ménage de `loadSettings()` n'est PAS un no-op dans ce cas : la v2.78 a tourné, une clé a pu être collée, et `settings.unsplashKey` serait resté en stockage sans plus aucune UI pour l'en sortir. Cache bumpé
   v2.81 — LA LOUPE DU CHAMP DE RECHERCHE FLOTTAIT AU MILIEU DE LA FEUILLE. Ce qui cassait : capture à l'appui sur la couche du visuel d'une catégorie — le champ « Chercher une icône » est vide à gauche, et une loupe orpheline est posée SOUS la bande « Récents », à cheval sur l'étiquette « Suggérées ». Elle se lit comme un bouton qu'on n'a pas su placer, ou comme un résidu de rendu. Pourquoi : `.pksearch .mag` et `.pksearch .clr` sont en `position:absolute` avec des retraits écrits POUR le champ (`left:calc(var(--s3) + 13px)` = le retrait de la boîte plus celui de l'input), mais `.pksearch` n'a jamais déclaré `position`. Un élément absolu se cale sur son plus proche ancêtre POSITIONNÉ : faute de bloc de positionnement ici, les deux remontaient jusqu'à `.pklayer`, qui est en `position:fixed` — donc `top:50%` de la FEUILLE ENTIÈRE, pas du champ. C'est le pendant exact de la leçon de la v2.73, prise par l'autre bout : là un `transform` en ligne CRÉAIT un bloc de positionnement non voulu et piégeait un enfant `fixed` ; ici l'absence de bloc voulu LAISSE PARTIR un enfant `absolute`. Dans les deux cas la faute n'est pas dans l'enfant, elle est dans ce que le parent déclare — ou ne déclare pas. Ce qui l'a caché : la croix d'effacement ne s'affiche qu'en `.filled`, donc un seul des deux orphelins est visible au repos, et la loupe est assez discrète pour passer pour un élément de la bande des récents. Ce qui change : `.pksearch` prend `position:relative`. Les retraits, eux, ne bougent pas — ils étaient JUSTES, ils n'avaient simplement pas de référentiel. Second défaut du même bloc, trouvé en le lisant : `.pksearch input{padding:0 40px}` était écrit SANS PORTÉE et gagnait sur le `0 13px` de la règle de base. Il s'appliquait donc aussi au champ de la couche de CHOIX (`pkQ`, « Chercher… »), qui n'a ni loupe ni croix : quarante pixels de vide de chaque côté du texte, une dérive silencieuse jamais signalée parce qu'un champ trop creux ne ressemble pas à un bug. La règle devient `.pksearch .mag+input` — le retrait suit la loupe, pas le nom de la classe. Le sélecteur est exact : la couche du visuel émet le `span.mag` immédiatement avant son `input`, et c'est le seul émetteur de `.mag` du dépôt. Vérifié : banc jsdom qui parse la feuille et pose trois invariants — tout enfant `absolute` de `.pksearch` exige un bloc de positionnement sur `.pksearch` ; le retrait de 40px ne vise qu'un champ à loupe ; le champ de la couche de choix garde `0 13px`. Les trois échouent sur la feuille d'avant, les trois passent après. Ce que ça ne règle pas : AUCUN banc ne juge des pixels — jsdom ne calcule pas de mise en page, il ne fait que lire les déclarations, donc que la loupe tombe bien dans l'axe vertical du champ RESTE À JUGER AU POUCE. L'invariant vérifié n'est pas propagé : rien n'empêche la même faute ailleurs, et je n'ai pas audité les autres parents d'enfants absolus de la feuille — c'est un correctif ponctuel, pas une passe. `app.js` n'est touché que par cette entrée et le numéro de version ; le correctif est entier dans `styles.css`. À remplacer : app.js, styles.css et sw.js, cache v73 → v74. Reste ouvert, inchangé depuis la v2.80 : `enterDormant()` force encore le mode sélection ; la hauteur du bandeau Vue sur Collection ; l'empilement `.pinnedrow` + bandeau + `.fstate` hors périmètre ; « Remonte en surface » lit `mutedCats` à l'envers ; « Une date précise » reste un `input[type=date]` natif ; le champ URL ne se replie plus une fois ouvert ; le repli local des items manque toujours (dette v2.66) ; et une catégorie neuve n'a pas d'image à elle tant qu'on ne colle rien. Cache bumpé
   v2.82 — LA REMONTÉE NE REMONTAIT PLUS RIEN, ET TROIS CAUSES SE CACHAIENT L'UNE L'AUTRE. Ce qui cassait : rapport au pouce, « j'ai l'impression que la fonction pour remonter les items n'est pas fonctionnelle ». Elle ne l'était pas, et pour trois raisons distinctes qui donnaient le même écran muet. (a) UNE DATE ÉCHUE N'ÉTAIT JAMAIS CONSOMMÉE. `surfaceAfter` est un SEUIL — « pas avant le X » — mais la porte du tirage (v2.19, règle 1 du chantier 21) le lisait comme un TICKET DE PRIORITÉ, et personne ne déchirait le ticket : `markSurfaced` pose `lastSurfaced` et incrémente `surfaceCount`, jamais elle n'efface la date. Une date passée reste passée, donc l'item repassait en tête de CHAQUE tirage, indéfiniment. Le tri `a.surfaceAfter-b.surfaceAfter` étant stable et les dates souvent égales, c'étaient littéralement les mêmes trois cartes chaque matin : on garde, on revient le lendemain, elles sont là. Ce qui a rendu le défaut massif : `bringForward()` — la ligne « Jamais remontés » des Réglages — pose la MÊME date échue sur TOUS les items jamais remontés d'un coup. Un tap sur cette ligne gelait le rituel sur les trois premiers items du tableau, à vie, et posait au passage un « pas avant le … » sur toute la pile (`whenMini`). Le correctif : `advance(id)` consomme la date échue de la carte qu'on quitte. C'est le seul point que les quatre gestes du rituel traversent tous (garder, classer, mettre de côté, jeter), et il tombe AVANT le `saveItems()` de chacun, donc l'effacement est persisté sans écriture nouvelle. Une date À VENIR n'est pas touchée : ce n'est pas la même chose de tenir une promesse et de l'annuler. (b) UN TIRAGE VIDE DE PLEIN DROIT PASSAIT POUR UN TIRAGE RATÉ, ET SE REJOUAIT SANS FIN. `ensureBatch()` tenait sa PROPRE lecture de l'éligibilité — échu ou sans date, hors sourdine, et rien d'autre — quand `buildBatch()` applique en plus la maturation de 30 j et le plancher de re-remontée de 60 j. Deux lectures d'une même règle, le doublon que ce fichier passe son temps à payer. Conséquence exacte : rien de mûr (ou tout revu depuis moins de 60 j) ⇒ `buildBatch` rend zéro carte ⇒ `ensureBatch` voit un tirage vide avec des « éligibles » en pile ⇒ elle reconstruit ⇒ zéro carte, et ainsi de suite à CHAQUE passe de rendu, avec un `saveBatch()` — c'est-à-dire une écriture Supabase — par passe. Mesuré au banc : 5 écritures pour 5 passes, contre 0 après. La règle est désormais énoncée UNE fois, dans `drawables()`, que `buildBatch` consomme et que `ensureBatch` compte ; la branche de réparation ne se déclenche plus que si le tirage est vide ALORS QU'il y avait de quoi le remplir. (c) LA CAUSE N'ÉTAIT DITE NULLE PART. Un tirage vide est LÉGITIME — maturation, plancher, sourdine, date à venir — mais il ne se distinguait en rien d'une fonction cassée : `riseDue()` rend 0, donc pas de pastille, pas de réveil, pas d'invitation, et « La remontée » dans « À trier » répondait « Rien ne remonte aujourd'hui. » pour tout verdict. C'est vrai et ça n'apprend rien. `riseVoidReason()` dit LAQUELLE des quatre portes est fermée, la dominante d'abord puisqu'un tirage n'est vide que si toutes le sont à la fois ; le toast la porte, et l'écran de fin de la surface gagne une TROISIÈME vérité — il n'en avait que deux, « c'est fait pour aujourd'hui » et « Voilà. Cet item est reparti dans ta pile. », cette dernière servant aussi au tirage vide où elle ne parlait d'aucun item. La pastille, elle, ne change pas : rien à dire ⇒ ne rien dire, doctrine v2.45 inchangée. Vérifié : banc jsdom qui charge le vrai app.js avec un stockage en mémoire et rejoue le tirage sur quatre corpus — mûr, jeune, tout-revu, dates à venir. Sur le dépôt d'avant, trois invariants échouent (mêmes cartes au tirage suivant, date non effacée, 5 écritures pour 5 passes) ; après, les huit passent, y compris la non-régression du corpus mûr et du secours au-delà de 60 j. Ce que ça ne règle pas : LE CALIBRAGE N'EST PAS TOUCHÉ, et c'est peut-être lui le vrai sujet — 30 j de maturation et 60 j de plancher sur une petite pile veulent dire que le rituel s'épuise puis se taise des semaines, ce qui est maintenant EXPLIQUÉ mais pas résolu ; les deux seuils sont des constantes, sans réglage, et ce serait une décision de cap. `bringForward()` continue de poser la même date sur TOUS les jamais-remontés au lieu d'en dater une poignée : le rituel ne gèle plus, mais le premier tirage qui suit reste arbitraire et toute la pile affiche « pas avant le … » jusqu'à ce qu'elle soit passée en revue. Aucune migration n'efface les dates déjà posées par un `bringForward()` antérieur : elles se consommeront au fil du rituel, une par carte, ce qui est le comportement juste mais demande N tours pour se solder. Et `enterDormant()` force toujours le mode sélection, la hauteur du bandeau Vue sur Collection, l'empilement `.pinnedrow` + bandeau + `.fstate` hors périmètre, « Remonte en surface » qui lit `mutedCats` à l'envers, « Une date précise » en `input[type=date]` natif, le champ URL qui ne se replie plus, le repli local des items (dette v2.66) et l'image propre d'une catégorie neuve : tout cela reste ouvert, inchangé. À remplacer : app.js et sw.js, cache v74 → v75.
   v2.83 — LES QUATRE DETTES DE LA v2.82, SOLDÉES. La v2.82 avait débloqué la remontée en disant honnêtement ce qu'elle ne réglait pas ; voici les quatre points, dans l'ordre du risque croissant. (a) LE PLANCHER DE 60 j ÉTAIT LE MAUVAIS OUTIL. C'était un proxy TEMPOREL pour une règle de COUVERTURE : son intention est « ne me remontre pas les mêmes têtes », et l'expression qui ne dépend pas de la taille de la pile est « pas avant que tout le reste soit passé ». 60 jours en dur suppose une pile d'au moins 180 items (3 cartes × 60 jours) ; en dessous, le rituel épuise ses jamais-remontés puis se taît des semaines, par salves — et une pile de 40 items, ce qui est une pile NORMALE, était condamnée à ce régime. Le plancher est remplacé par une ROTATION : le vivier de secours se pioche par dernière remontée la plus ancienne, et le plancher devient ÉMERGENT — un tour complet du vivier, 13 jours sur 40 items, 60 sur 180, sans qu'aucun chiffre ne le décide. Deux soins. `fillPool` reçoit une CLÉ DE ROTATION optionnelle (`createdAt` par défaut, `lastSurfaced` pour le secours) : sans ce second ordre, « un tour complet » ne veut rien dire, on repasserait toujours par les plus vieilles captures. Et il survit un plancher MINIMUM de 14 j, sans quoi une pile de cinq items deviendrait un tapis roulant — c'est ce minimum, et non plus une constante de calibrage, qui protège les petites catégories. La maturation de 30 j n'est PAS touchée : elle est adossée à quelque chose de visible, la borne « Ce mois » de l'historique ; elle n'était pas fausse, elle était muette, et la v2.82 l'a fait parler. (b) « JAMAIS REMONTÉS » NE DATE PLUS RIEN. Elle posait une date échue sur TOUS les jamais-remontés d'un coup pour n'en faire passer que trois : dater N items pour en montrer B est une erreur de catégorie, et le prix était lourd — toute la pile portait « pas avant le … », et la date n'étant jamais consommée avant la v2.82, le rituel restait gelé à vie sur les trois premiers items du tableau. Or ce qu'elle veut est EXACTEMENT ce que la porte de secours sait faire depuis la v2.39 : montrer maintenant, hors rituel, sans rien écrire. Deux réponses au même besoin cohabitaient, la plus ancienne survivait par inertie — le motif que ce fichier paie à chaque version. Elle remplit donc `riseAdHoc` avec les jamais-remontés les plus anciennement capturés, et le tirage du jour reste intact. La sourdine est respectée : une porte qui ne parle pas de sourdine ne doit pas l'outrepasser, seule une date posée à la main l'emporte (invariant v2.19) — et si tout est en sourdine, elle le dit au lieu de ne rien faire. (c) UN BUG TROUVÉ EN CHERCHANT LA MIGRATION. `whenMini` testait `it.surfaceAfter` SANS le comparer à maintenant : une date échue affichait « pas avant le 3 mars » pour toujours, et depuis la v2.70 ce badge est la seule chose colorée de la ligne. Le badge disparaît dès la date passée — elle ne contraint plus rien, et ne rien dire vaut mieux que dire une contrainte qui n'existe plus. La FICHE, elle, continue de montrer la valeur stockée même échue (c'est l'éditeur : sans ça on ne pourrait plus la retirer) mais elle ajoute « · échue », sinon la rangée promettrait ce que la liste n'affiche plus. (d) LES DATES DÉJÀ POSÉES : UNE PORTE, PAS UNE MIGRATION. Rien ne permet de distinguer une date posée à la main d'une date posée en lot — les deux tombent à 9 h — et l'heuristique qui les séparerait (N items à la milliseconde identique) serait une dette irréversible dans `normalizeItem`, pire que le symptôme. Nouvelle ligne comptée dans « À trier » : « Dates échues — elles ne contraignent plus rien : les retirer ». `clearDueDates` ne touche QUE les dates passées : une date passée est une promesse TENUE, le seuil est franchi, elle est dépensée ; une date à venir n'a pas encore servi. Elle respecte le contrat de la v2.66 — pas de toast de succès sans écriture confirmée. (e) DÉFAUT DE COMPTAGE, TROUVÉ AU BANC EN ÉCRIVANT (b). `renderStage` écrivait le total de la séquence à la demande EN DUR à 1, alors que la porte de secours n'a jamais été limitée à une carte : « Une de plus » appelle `pullNow` DANS une séquence à la demande, donc deux cartes s'annonçaient déjà « 1 / 1 » — et (b) l'aurait fait mentir sur trois. `seqCount(ids,from)` compte une séquence quelconque ; `riseLeft` et `riseTotal` s'y replient, et la séquence à la demande est comptée par la même fonction. Un seul comptage, deux séquences. Vérifié : second banc jsdom sur le vrai app.js, huit groupes — rotation sur une pile de 9 items tous vus il y a 20 à 28 jours (0 carte avant, 3 après), ordre du moins récemment vu par catégorie, plancher minimum à 5 jours (tirage vide, et c'est voulu), deux tirages consécutifs sans recouvrement, `whenMini` échue/à venir, `bringForward` sans aucune écriture d'items et sans toucher `batch`, comptage d'une séquence à la demande de trois cartes, et solde des dates échues qui épargne les dates à venir. Le banc de la v2.82 est rejoué en entier, sans régression. Ce que ça ne règle pas : LA ROTATION EST PAR CATÉGORIE, PAS GLOBALE. `fillPool` prend un item par catégorie dans un ordre de catégories TIRÉ AU SORT (variété, chantier 21) : la garantie « pas avant que le reste soit passé » tient donc DANS une catégorie et seulement approximativement entre elles — une catégorie de cinq items tourne plus vite qu'une de cent, jusqu'à ce que le plancher minimum de 14 j la mette au repos. C'est le prix de la variété, et je le paie sciemment plutôt que de trancher entre deux règles validées au pouce. Les 14 j et les 30 j restent des CONSTANTES sans réglage : elles ne se jugent qu'à l'usage, sur plusieurs semaines, et aucun banc ne le fera. La rotation ne se voit pas non plus en un jour — c'est la seule des cinq corrections dont l'effet demande d'attendre. Et « Jamais remontés » compte toujours les items en sourdine que sa propre porte écarte : le nombre affiché peut donc dépasser ce qu'elle montrera. Reste ouvert, inchangé : `enterDormant()` force le mode sélection ; la hauteur du bandeau Vue sur Collection ; l'empilement `.pinnedrow` + bandeau + `.fstate` hors périmètre ; « Remonte en surface » lit `mutedCats` à l'envers ; « Une date précise » est un `input[type=date]` natif ; le champ URL ne se replie plus ; le repli local des items (dette v2.66) ; et une catégorie neuve n'a pas d'image à elle. À remplacer : app.js et sw.js, cache v75 → v76.
   v2.84 — LE CADRE DE LA REMONTÉE, ET LA MORT DU POPOVER. Point de départ : « j'ai l'impression que la fonction pour remonter les items n'est pas fonctionnelle » (v2.82), puis « comment savoir si ça fonctionne ». Les v2.82 et v2.83 ont réparé le TIRAGE ; il restait que la remontée n'ARRIVE jamais — elle attend derrière un point qui ne dit pas de quoi il parle. Ce qui change. (a) UN CADRE, AU-DESSUS DE L'EN-TÊTE. Trois vignettes du tirage du jour, un libellé mono, un pied « à ranger ». Sa PLACE est la décision principale et elle s'est trouvée par élimination, maquette après maquette : posé SOUS « Catégories », il décolle le titre de sa grille, et un titre nomme ce qui est dessous. C'est ce décollement qui donnait la sensation d'hybride, pas la forme du cadre — vérifié en écrivant un test de continuité qui demande simplement s'il y a quelque chose entre le titre et la grille. Sur les quatre emplacements essayés (au-dessus, dans la chrome collante, sous le titre, titre déplacé), un seul échoue : celui d'en dessous. Le cadre vit donc hors du rail #tabViewport (sinon rogné par son overflow, piège v2.64) et sous #hdrSentinel (sinon la sentinelle d'en-tête fausse ses 120 px, leçon v2.33). (b) LE POPOVER « À TRIER » EST SUPPRIMÉ, avec `openInboxMenu`, `showPop`, `placePop`, `closeInboxPop`, `toggleInboxPop`, l'état `popOn`, la couche « pop », les écoutes de resize et d'orientation, le balisage #inboxPop/#popScrim et les règles .pop/.popscrim. Il disait « La remontée · 3 » et « Non classés · 7 » ; le cadre dit exactement la même chose AVEC LES IMAGES. Deux réponses à une seule question, c'était le doublon que ce fichier paie depuis le début — et un chiffre ne donne envie de rien, trois vignettes si. L'enveloppe BASCULE désormais le cadre. Elle n'apparaît que sur Collection (`on("inboxBtn",cat)`, v2.46), donc rien ne se perd sur l'autre onglet ; « Non classés » ne vit plus que dans le pied du cadre, et y mène par le même `enterCollection("none")` qu'avant. (c) IL S'OUVRE SEUL, UNE FOIS PAR JOUR. C'est le rôle que `maybeWake()` (v2.45) devait tenir et n'a JAMAIS tenu : la fonction est définie et appelée par personne, vérifié sur les vingt derniers commits — écrite, jamais branchée, et `settings.wakeSeen` jamais écrit. Le réveil ne pouvait donc pas se contenter d'être rallumé : son balisage `.wake`/`.wline` est celui que la v2.69 avait DÉPLACÉ dans le popover (« c'est la même liste, ailleurs »), donc le brancher aurait ressuscité une feuille venue du bas que la v2.69 avait abolie, contre sa propre grammaire. `settings.frameDay` porte le jour déjà servi ; l'ouverture s'abstient sur un partage entrant et pendant la présentation, aux mêmes conditions que l'onboarding juste au-dessus dans `boot()`. Un tap sur l'enveloppe vaut « vu » : il marque le jour, donc le cadre ne se rouvrira pas tout seul après avoir été fermé à la main. (d) TROIS RÈGLES DE FORME, tenues et testées. UNE seule voix nouvelle dans le design system — le libellé mono ; pas de titre, pas de chapô, le mot « remontée » n'est écrit qu'une fois par écran (les maquettes précédentes l'écrivaient trois fois et empilaient trois tailles de gras, 27/25/19 px : aucune harmonie n'y survivait). AUCUN TEXTE sous les vignettes : à trois de front elles font ~100 px, soit dix-huit caractères sur deux lignes — un titre y devient une bouillie rognée par la bordure, constaté sur capture ; l'image fait le travail et le titre survit en `aria-label`. La vignette EMPRUNTE la carte de galerie (`galleryThumb`, .gcard/.gmedia) au lieu d'inventer un second composant d'image, seul le ratio change (3/4 debout). (e) TAPER UNE VIGNETTE N'ÉGARE RIEN. `riseOpenAt` ne saute pas les cartes précédentes et ne consomme rien : il DÉPLACE l'item tapé en tête de la séquence restante, puis ouvre le rituel. Accès direct sans perte. (f) UN JOUR SANS REMONTÉE, LE CADRE S'OUVRE QUAND MÊME ET DIT POURQUOI, en réutilisant `riseVoidReason()` (v2.82). C'est la réponse à la question d'origine, enfin posée au bon endroit : un tirage vide est légitime — maturation de 30 j, rotation, sourdine — mais muet il ne se distingue en rien d'une panne. Vérifié : banc jsdom sur le vrai app.js et le vrai index.html, 26 assertions — mort du popover, une seule voix mono, aucun titre concurrent, absence de texte sous les vignettes, pied dans le cadre et nulle part ailleurs, cadre absent de Ma pile, bascule et `aria-expanded` dans les deux sens, réordonnancement sans perte d'item, ouverture matinale une seule fois puis le lendemain, cadre explicatif à tirage vide, et silence complet quand la remontée est éteinte. Les bancs des v2.82 et v2.83 sont rejoués en entier, sans régression. Ce que ça ne règle pas : LE CADRE NE BOUGE PAS. Pas d'escamotage au défilement, pas de tirage pour le rappeler, pas de surgissement — c'est la v2.85, séparée exprès. La raison est de méthode : le prototype construit tout le défilement sur `window.scrollY`, or ce projet a pour défileur BODY (posé v2.26, confirmé v2.32, et déjà payé une fois en v2.60/v2.61) — `window.scrollY` y reste à zéro, l'escamotage ne se déclencherait jamais et le tirage se croirait armé partout. Il faudra passer par `scrollerFor()`, compenser l'effondrement à la main puisque `body{overflow-anchor:none}` (v2.32) désactive la compensation du navigateur, et s'effacer devant le geste de piste de #tabViewport. Trois pièges connus, aucun visible au banc : livrer ça dans la même version aurait été indéfendable. Restent ouverts, inchangés : `maybeWake`/`openWake`/`wakeItems` sont maintenant du code MORT sans aucun appelant — à supprimer dans une passe dédiée, avec les règles .wake/.wline si plus rien ne les sert ; `enterDormant()` force le mode sélection ; la hauteur du bandeau Vue sur Collection ; l'empilement `.pinnedrow` + bandeau + `.fstate` ; « Remonte en surface » lit `mutedCats` à l'envers ; « Une date précise » en `input[type=date]` natif ; le champ URL qui ne se replie plus ; le repli local des items (dette v2.66) ; l'image propre d'une catégorie neuve. À JUGER AU POUCE, aucun banc ne le voit : la hauteur réelle du cadre au-dessus de l'en-tête sur un écran de téléphone, le rendu des vignettes 3/4 sur ta vraie pile (notes sans image, tuiles de source), et le fait que le cadre ne pousse pas trop la grille vers le bas. À remplacer : app.js, index.html, styles.css et sw.js, cache v76 → v77.
   v2.85 — LE CADRE S'ESCAMOTE, ET SE RAPPELLE AU TIRAGE. Suite directe de la v2.84, séparée exprès : elle touche le défilement et les gestes, les deux zones les plus chères du dépôt, et une livraison qui casserait là devrait pouvoir se défaire seule. Modèle emprunté aux archives de Telegram, validé au pouce sur cinq maquettes. (a) LE DÉPART SUIT LE POUCE, IL N'A PLUS DE SEUIL. Première maquette : un seuil à 20 px et le cadre partait d'un coup, alors qu'il était encore en pleine vue — sec, et arbitraire. Il n'y a plus de seuil du tout : le cadre est au-dessus de l'en-tête, il défile donc naturellement vers le haut comme n'importe quel contenu, et on ne fait qu'accompagner ce départ. Il s'efface à mesure qu'il sort du champ SANS SE DÉFORMER — ni rétrécissement de largeur, ni dérive latérale vers l'enveloppe : un objet qui rapetisse sous le doigt est un mouvement que personne n'a demandé, reproche du pouce sur la maquette précédente. L'escamotage ne se solde qu'une fois le cadre ENTIÈREMENT hors de vue, et par le haut seulement (`boundingClientRect.bottom <= 0`) : sortir par le bas, c'est remonter, et ce n'est pas la même chose. (b) COMMENT ON OBSERVE, ET POURQUOI PAS AUTREMENT. Le prototype bâtissait tout sur `window.scrollY`. Ici le défileur est BODY (posé v2.26, confirmé v2.32, déjà payé une fois en v2.60/v2.61) : `scrollY` reste à zéro, l'escamotage ne se serait JAMAIS déclenché et le tirage se serait cru armé partout. La parade est déjà écrite dans ce fichier depuis la v2.25 et affinée en v2.33 — on n'ÉCOUTE pas le défilement, on OBSERVE : le cadre devient sa propre sentinelle, et quel que soit le scroller il sort du champ. Vingt et un paliers d'`IntersectionObserver` suffisent à doser l'effacement sans un seul écouteur de défilement. `scrollerFor()` (v2.61) ne sert plus qu'à ce que l'observation ne peut pas faire : ÉCRIRE une position. (c) LA COMPENSATION, À LA MAIN. `body{overflow-anchor:none}` (v2.32) : le navigateur ne compensera pas l'effondrement du cadre, donc on retire sa hauteur au défilement nous-mêmes, dans la même image. Rien ne saute parce que ce qu'on retire n'était déjà plus visible. Mesuré au banc : hauteur 168, défilement 200 → 32. C'est la boucle de tremblement des v2.32/v2.33 croisée par l'autre bord, et la garde « au-dessus du champ seulement » est ce qui empêche d'y retomber. (d) LE RETOUR SE MÉRITE, ET IL SUIT LE DOIGT. Remonter en haut ne rappelle RIEN : il faut TIRER. Le cadre se découvre à mesure du tirage, amorti, plafonné à une poignée de 76 px — chez Telegram on ne tire pas le bloc entier, on sort une RANGÉE, elle se verrouille, et le reste suit. Une première maquette révélait tout d'un coup ; le pouce a préféré le suivi progressif, réversible en cours de route. Réglage retenu après avoir comparé cinq lois (souple, proportionnel, élastique, cranté, ferme) : FERME — résistance 0,20, seuil 62 px de découverte, soit ~310 px de course de doigt. C'est long, c'est voulu : aucune ouverture accidentelle possible. LEÇON DE CALIBRAGE, notée parce qu'elle a coûté deux allers-retours : mes premiers seuils étaient en PIXELS ABSOLUS, or la rangée d'archives de Telegram fait ~72 px et ce cadre ~168 — un seuil de 58 px vaut 80 % de l'une et 34 % de l'autre. Le chiffre comparable n'est ni la résistance ni le seuil, c'est la COURSE DE DOIGT ; c'est elle qu'on a réglée. (e) LE SEUIL SE DIT, IL NE SE DEVINE PAS. Passé le seuil, l'indice sous le cadre change de mot — « tirer pour revoir » devient « relâcher pour ouvrir » —, passe en couleur d'accent, et le téléphone donne un coup, UNE SEULE FOIS, au franchissement. Un seuil qu'on ne peut que deviner n'est pas un seuil, c'est un piège. (f) LE TIRAGE S'EFFACE DEVANT LE GESTE DE PISTE. #tabViewport écoute déjà touchstart/touchmove : le tirage ne se saisit qu'une fois l'axe VERTICAL confirmé (dy > |dx|×1,4, le test de la v2.56 pris à l'envers), et un glissé franchement horizontal le désarme au lieu de lui disputer l'événement. Il ne s'arme pas non plus si une couche est ouverte, si l'on n'est pas sur Collection, ou si le défileur n'est pas à zéro. (g) L'ENVELOPPE FAIT RESSORTIR, ELLE NE REFERME PAS DEUX FOIS. Trois états à l'écran (déployé, escamoté, absent), deux seulement à décider : rangé par le défilement, un tap sur l'enveloppe le fait ressortir — et s'il faut d'abord remonter, on ATTEND d'être en haut en observant le défileur, jamais en pariant sur une durée. C'est le bug signalé sur maquette : depuis le milieu de la liste, un délai fixe de 260 ms déclenchait l'ouverture pendant que la page bougeait encore, la sentinelle voyait le cadre sortir du champ et le rangeait aussitôt — on remontait un peu et rien n'apparaissait. (h) UN RENDU NE RESSUSCITE PAS UN CADRE RANGÉ : `renderRiseFrame` réapplique l'état puis réarme la sentinelle, qui s'abstient si l'on est rangé. Le point de l'enveloppe TRESSAILLE au moment où le cadre y rentre — on sait où il est parti, et l'enveloppe cesse d'être un point muet. Défaut trouvé au banc, pas au doigt : la sentinelle était réarmée à la FIN de l'animation de déploiement, laissant 360 ms pendant lesquelles le cadre n'était plus observé du tout — descendre dans cet intervalle le laissait déployé jusqu'au prochain rendu. Elle est réarmée immédiatement, et c'est un drapeau `frameAnim` qui protège l'opacité pendant que la hauteur croît, pas l'absence d'observateur. Un état ne se garde jamais en débranchant ce qui l'observe. Vérifié : banc jsdom sur le vrai app.js, 24 assertions pour cette version en plus des 26 de la v2.84 — effacement dosé à mi-course sans aucune transformation posée, refus de ranger quand le cadre sort par le bas, solde et compensation exacte du défilement, tressaillement du point, survie de l'état à un re-rendu, courses de tirage mesurées (100 px → 20, 300 px → 60 sous le seuil, 320 px → armé, plafond à 76), les deux issues du relâchement, désarmement sur glissé horizontal puis reprise sur vertical, refus de s'armer en cours de défilement et hors de Collection, et l'enveloppe depuis 500 px qui remonte ET déploie. Les bancs des v2.82, v2.83 et v2.84 sont rejoués, sans régression. Ce que ça ne règle pas : LA GÉOMÉTRIE NE SE JUGE PAS AU BANC. jsdom ne calcule aucune mise en page — toutes les hauteurs y sont nulles, le banc travaille sur une hauteur SIMULÉE de 168 px et une sentinelle pilotée à la main. Trois choses restent donc à trancher au pouce, et elles sont exactement celles qui peuvent gâcher la version : le contenu tressaute-t-il au moment précis où la compensation s'applique ; les ~310 px de course sont-ils justes sur ton écran, ou faut-il remonter la résistance ; et l'effacement progressif se lit-il comme un départ ou comme un scintillement. Les trois constantes RF_DAMP / RF_OPEN / RF_GRIP sont groupées en tête du module, sans réglage d'interface : c'est un calibrage, pas un goût, et il n'y aura pas de curseur. Restent ouverts, inchangés : `maybeWake`/`openWake`/`wakeItems` toujours morts sans appelant, à supprimer dans une passe dédiée avec les règles .wake/.wline ; `enterDormant()` force le mode sélection ; la hauteur du bandeau Vue sur Collection ; l'empilement `.pinnedrow` + bandeau + `.fstate` ; « Remonte en surface » lit `mutedCats` à l'envers ; « Une date précise » en `input[type=date]` natif ; le champ URL qui ne se replie plus ; le repli local des items (dette v2.66) ; l'image propre d'une catégorie neuve. À remplacer : app.js, styles.css et sw.js, cache v77 → v78. index.html n'est PAS touché.
   v2.86 — LE TIRAGE NE MARCHAIT QU'APRÈS AVOIR OUVERT LE CADRE À LA MAIN. Ce qui cassait : rapport au pouce sur la v2.85 — « j'essaye de faire le tirage pour ouvrir la remontée, ça ne fonctionne pas ; si j'affiche la remontée grâce au bouton, que je défile vers le bas pour cacher et que je tire, ça fonctionne ». La description contenait le diagnostic entier : le tirage ne trouvait rien à tirer parce que LE CADRE N'EXISTAIT PAS ENCORE DANS LA PAGE. Pourquoi : j'ai porté le prototype avec TROIS états là où l'objet n'en a que deux. `frameOn` disait « le cadre est posé dans le document », `frameTucked` disait « il y est mais replié à zéro ». Au lancement, `maybeOpenFrame()` s'abstient si le jour est déjà servi (`settings.frameDay`) — ce qui est le comportement voulu, le matin est un événement — donc `frameOn` restait faux, `#riseFrame` restait VIDE, `frameWrap()` rendait null, et la garde `ready()` du geste sortait immédiatement. Le seul chemin qui marchait était celui décrit : ouvrir au bouton (frameOn devient vrai, le cadre est posé), défiler (frameTucked devient vrai), tirer — le cadre existait enfin. Le troisième état n'était pas une nuance, c'était un trou. Ce qui change : `frameOn` est SUPPRIMÉ. Le cadre est désormais TOUJOURS posé dès qu'il y a quelque chose à dire — un tirage du jour, des non classés, ou seulement la raison pour laquelle rien ne remonte — et `frameTucked` seul décide s'il se voit. C'est le modèle des archives de Telegram pris à la lettre, et je l'avais sous les yeux depuis le début : la rangée est là, rangée ; le tirage la découvre. Elle n'a pas à être « allumée » d'abord. Conséquences, toutes des soustractions : (a) l'état initial de `frameTucked` passe à VRAI — replié par défaut, sans quoi un simple rendu redéploierait le cadre à chaque passe et le matin cesserait d'être un événement ; (b) `renderRiseFrame` ne teste plus que l'onglet et le contenu, et réapplique la hauteur nulle quand on est replié ; (c) `toggleRiseFrame` ne fait plus qu'UNE chose selon un seul état — replié, il déploie (en remontant d'abord s'il faut) ; déployé, il range par le même chemin que le défilement. Le cas « rien du tout à montrer » y garde un filet : si même le cadre explicatif ne peut pas être posé (remontée éteinte ET rien à ranger), l'enveloppe dit la raison au lieu de ne rien faire. (d) `aria-expanded` suit `frameTucked` et non plus l'existence du nœud. Ce que ça coûte, et je le paie sciemment : le cadre replié est dans le document en permanence sur Collection, donc ses trois vignettes sont construites même invisibles. C'est trois `galleryThumb` et un `hydrateMedia` par rendu — le même travail que trois cartes de l'index juste en dessous, sur des images déjà en cache. Le gain est qu'un tirage découvre INSTANTANÉMENT un cadre déjà peint, sans temps de rendu au milieu du geste. Vérifié : le banc gagne le cas À FROID, celui qui échouait — jour déjà marqué, page fraîche, aucun cadre déployé ; le cadre est posé et replié dès le rendu, le tirage s'arme sans l'avoir ouvert avant, et il décide de déployer. Deux assertions de la v2.85 étaient par ailleurs COMPLAISANTES et sont corrigées : elles lisaient une hauteur posée à l'image SUIVANTE (le déploiement est une animation) et l'une d'elles s'en sortait par un `||` qui la rendait toujours vraie — une assertion qui ne peut pas échouer ne vérifie rien. On vérifie maintenant la DÉCISION tout de suite et la géométrie après, avec un cycle complet qui laisse les animations finir et contrôle que la hauteur est rendue au flux et l'opacité nettoyée. 61 assertions au total sur les v2.84 à v2.86 ; les bancs des v2.82 et v2.83 sont rejoués, sans régression. Ce que ça ne règle pas : les trois points à juger au pouce de la v2.85 restent entiers et ne bougent pas d'ici — le tressautement éventuel au moment de la compensation, la justesse des ~310 px de course sur un vrai écran, et la lisibilité de l'effacement progressif. Restent ouverts, inchangés : `maybeWake`/`openWake`/`wakeItems` morts sans appelant ; `enterDormant()` force le mode sélection ; la hauteur du bandeau Vue sur Collection ; l'empilement `.pinnedrow` + bandeau + `.fstate` ; « Remonte en surface » lit `mutedCats` à l'envers ; « Une date précise » en `input[type=date]` natif ; le champ URL qui ne se replie plus ; le repli local des items (dette v2.66) ; l'image propre d'une catégorie neuve. À remplacer : app.js et sw.js, cache v78 → v79. index.html et styles.css ne sont PAS touchés.
   v2.87 — LA BANDE FANTÔME AU-DESSUS DE « CATÉGORIES ». Ce qui cassait : une bande de 8 px, vide, coincée entre la barre d'état et le titre « Catégories », absente de « Ma pile ». Vue à l'œil sur capture, invisible à tout banc. Pourquoi : le cadre replié a bien une hauteur nulle, mais son CONTENEUR portait `margin:var(--s2) 0 0`, et une marge survit à sa propre hauteur nulle. L'écart entre les deux onglets disait déjà où chercher — « Ma pile » ne rend pas le cadre, donc pas de conteneur, donc pas de marge. Ce qui est instructif, c'est que la v2.85 avait posé cette marge LÀ EXPRÈS, avec un commentaire qui expliquait pourquoi : « un enfant à marge haute dans un conteneur qu'on effondre laisse sa marge dehors ». Le raisonnement était faux dans les deux sens. `overflow:hidden` crée un contexte de formatage : la marge d'un enfant ne s'échappe PAS et se laisse rogner avec le reste — c'était donc une protection contre un danger inexistant, qui a introduit le vrai. Ce qui change : la marge descend d'un cran, sur `.rframe`, à l'intérieur du conteneur rogné. L'apparence déployée est identique au pixel près ; replié, il ne reste rien. RÈGLE GÉNÉRALE, notée pour la prochaine fois : ce qu'on effondre ne doit avoir AUCUNE hauteur propre en dehors de son contenu — ni marge, ni bordure, ni remplissage. L'espacement appartient à ce qu'il y a dedans. Vérifié : le banc gagne un invariant STATIQUE qui lit styles.css et refuse toute déclaration de marge, remplissage ou bordure sur `.rfwrap` et `.rfhint`, et contrôle que `.rframe` porte bien l'espacement à l'intérieur. C'est le seul type de test qui pouvait attraper ce défaut : jsdom ne calcule aucune mise en page, donc aucune assertion dynamique n'aurait vu ces 8 px — il fallait interroger la FEUILLE, pas le DOM. 64 assertions, bancs des v2.82 à v2.86 rejoués sans régression. Ce que ça ne règle pas : les trois points à juger au pouce de la v2.85 tiennent toujours — tressautement éventuel au moment de la compensation du défilement, justesse des ~310 px de course sur un vrai écran, lisibilité de l'effacement progressif. Restent ouverts, inchangés : `maybeWake`/`openWake`/`wakeItems` morts sans appelant ; `enterDormant()` force le mode sélection ; la hauteur du bandeau Vue sur Collection ; l'empilement `.pinnedrow` + bandeau + `.fstate` ; « Remonte en surface » lit `mutedCats` à l'envers ; « Une date précise » en `input[type=date]` natif ; le champ URL qui ne se replie plus ; le repli local des items (dette v2.66) ; l'image propre d'une catégorie neuve. À remplacer : app.js, styles.css et sw.js, cache v79 → v80. index.html n'est PAS touché.
   v2.88 — DEUX ATTENTES QUI N'AVAIENT AUCUNE RAISON D'ÊTRE. Rapport au pouce : « garder en pile » met longtemps à réagir, et un item ajouté par le partage met très très longtemps à se créer. Ce ne sont pas deux lenteurs, c'est deux fois la même — DU CODE QUI ATTEND UN ALLER-RETOUR SUPABASE POUR PEINDRE UN ÉCRAN QUI N'EN DÉPEND PAS. Le stockage de ce projet est une table `kv` : chaque `saveItems()` remonte le TABLEAU ENTIER en un seul upsert. C'est acceptable tant que personne ne l'attend. (a) GARDER EN PILE ATTENDAIT L'ÉCRITURE. `keepCard` faisait `await saveItems()` AVANT `renderStage()`. Or ce geste n'écrit qu'une comptabilité — `lastSurfaced`, `surfaceCount`, la date échue consommée en v2.82 — dont rien à l'écran ne dépend : la carte suivante était retenue pour une donnée que personne ne regarde. Elle avance maintenant tout de suite, la synchro suit, et un échec se dit. C'est la capture optimiste du chantier 11, appliquée au rituel. Les TROIS AUTRES GESTES CONTINUENT D'ATTENDRE, et c'est délibéré : mettre de côté, jeter et classer changent le STATUT de l'item, et la v2.66 interdit d'annoncer un archivage que la base ignore. La distinction n'est pas la fréquence, c'est qu'un « j'ai vu » perdu se répare tout seul au tirage suivant. (b) LE PARTAGE ATTENDAIT SIX SECONDES, ET IL ATTENDAIT DANS UNE FILE DE VINGT-CINQ. Deux causes superposées, dont la seconde est la vraie. `afterShare` retenait la fiche derrière une course `enrich` / 6 s (le commentaire au-dessus annonçait 4 s : preuve que personne n'a jamais pu tenir le compte). Mais surtout `startApp` lançait le rattrapage d'aperçus AVANT `consumeSharedContent`, à VINGT-CINQ requêtes de front — vingt-cinq invocations d'Edge Function, chacune suivie d'un `await saveItems()` du tableau entier et d'un `renderAll()`. Le lien du téléphone était saturé au moment précis où l'item qu'on venait de partager avait besoin de son propre aperçu : ce qu'on subissait n'était pas l'attente d'UNE requête, c'était celle de la vingt-sixième dans la file. Le rattrapage attend donc que le partage soit servi et n'avance plus qu'à trois de front — même travail total, il cesse simplement de disputer la ligne à ce qu'on regarde. (c) L'ATTENTE DE SIX SECONDES CONTOURNAIT UN MANQUE, C'EST LUI QUI EST RÉGLÉ. La fiche est un INSTANTANÉ pris à l'ouverture : un aperçu arrivé après coup ne s'y voyait pas, et pire, `commit()` aurait recollé ce vide par-dessus le titre et la couverture trouvés entre-temps. D'où le délai — on attendait l'aperçu parce qu'on ne savait pas le recevoir. `_enrich` repeint désormais la fiche ouverte, sous trois gardes : elle porte bien cet item, elle n'a AUCUNE modification en cours (sinon on effacerait ce qui est en train d'être tapé), et rien n'est empilé par-dessus. C'est exactement le geste que `refreshPreview` fait depuis toujours, à l'initiative de l'aperçu au lieu du doigt. Un miroir `grainDirty` sort le `dirty` de sa fermeture, seule addition d'état. (d) DEUX MÉCANIQUES DE FOND, QUI SERVENT LES DEUX SYMPTÔMES. `saveItems` SÉRIALISE : une écriture en vol, une seule en attente. Comme la charge est toujours l'état courant AU MOMENT DE L'ENVOI, une écriture en attente couvre tous les appels arrivés pendant la précédente — ils reçoivent le résultat d'une écriture qui contient bien leur mutation, donc le contrat booléen de la v2.66 est intact. Et `renderSoon()` coalesce le rendu complet sur l'image suivante, au lieu de reconstruire la pile et l'index une fois par item enrichi. Défaut trouvé en passant : le `.catch()` d'`addItem` était MORT depuis la v2.66 — `saveItems` avale l'erreur et rend `false`, donc un échec de synchro à la capture était parfaitement silencieux, exactement le mode de panne que la v2.66 prétendait fermer. Il lit le booléen. Vérifié : banc jsdom sur le vrai app.js. Coalescence — 12 appels concurrents donnent 2 écritures, chacune contient bien la mutation de son appelant, et tous les booléens sont vrais ; `keepCard` — le stage est rendu AVANT que l'écriture ne rende la main (l'inverse échoue sur le dépôt d'avant), et un échec toaste ; rattrapage — jamais plus de 3 enrichissements en vol sur 25, et aucun ne part avant que le partage n'ait rendu ; fiche — repeinte quand l'aperçu arrive, PAS repeinte si un champ a été touché, PAS repeinte si une couche est ouverte par-dessus. Non-régression rejouée dans le même banc : la date échue consommée de la v2.82, une date à venir épargnée, la capture optimiste et son dédoublonnage de la v2.37, et « Mettre de côté » qui écrit ET attend toujours. Les bancs des versions précédentes n'étaient pas conservés dans le dépôt : ils n'ont PAS été rejoués, et je le dis plutôt que de le laisser croire. CE QUE ÇA NE RÈGLE PAS, et il faut le lire : la cause de fond reste entière — un item modifié réécrit TOUT LE TABLEAU, donc la durée d'une écriture croît avec la pile, et aucun de ces correctifs ne la raccourcit ; ils la mettent hors du chemin de l'œil, ce qui n'est pas la même chose. La vraie réponse est le repli local (dette v2.66) doublé d'une écriture par item, et c'est un chantier de modèle, pas un correctif. Les trois autres gestes du rituel restent bloquants. Le premier rendu après un partage attend toujours la session Supabase puis le chargement complet des items : ce délai-là est intouché, et sur une grosse pile c'est peut-être maintenant le plus visible. La repeinte de la fiche fait perdre le focus si le curseur était dans un champ VIDE (aucun `input` émis, donc rien de sale à protéger) — cas rare, non traité. Et LES DURÉES NE SE MESURENT PAS AU BANC : jsdom compte des appels et un ordre, il ne chronomètre rien ; que le geste soit devenu immédiat au doigt reste à juger au pouce. Restent ouverts, inchangés : `maybeWake`/`openWake`/`wakeItems` morts sans appelant ; `enterDormant()` force le mode sélection ; la hauteur du bandeau Vue sur Collection ; l'empilement `.pinnedrow` + bandeau + `.fstate` ; « Remonte en surface » lit `mutedCats` à l'envers ; « Une date précise » en `input[type=date]` natif ; le champ URL qui ne se replie plus ; l'image propre d'une catégorie neuve. À remplacer : app.js et sw.js, cache v80 → v81. index.html et styles.css ne sont PAS touchés.
   v2.89 — LA FEUILLE D'AJOUT CLIGNOTE QUAND ON TAPE DANS UN CHAMP. Signalé au pouce sur « Ajouter » (champs Catégorie et Tag), mais le défaut n'appartient pas à cette feuille : il appartient à TOUTES, et il vient de deux choses qui n'ont jamais été branchées l'une sur l'autre — le clavier logiciel et le défileur du projet. (a) CE QUI SE PASSE, DANS L'ORDRE. `index.html` porte `interactive-widget=resizes-content` : le clavier ne recouvre pas la page, il REDIMENSIONNE le viewport de mise en page. Toucher un champ en émet donc une rafale — l'animation d'ouverture du clavier, puis la barre d'auto-remplissage de Chrome qui paraît une fraction de seconde plus tard, puis se règle. À chaque cran, le navigateur refait son travail d'accueil du focus : amener l'<input> dans le champ de vision, en remontant TOUTE la chaîne de défilement. Ici cette chaîne est `.slist`, puis BODY. Or la feuille est `position:fixed` : défiler body ne la déplace pas d'un pixel, la demande n'est donc jamais satisfaite et la page derrière part faire un aller-retour pour rien, sous un voile semi-opaque où ça se voit. `body{overflow-anchor:none}` (v2.32) retire au passage le seul frein que le navigateur aurait posé tout seul. (b) LE VERROU, ET POURQUOI IL NE COÛTE RIEN ICI. `showSheet()` pose `body.sheetlock`, `closeSheet()` le retire ; la règle vaut `overflow-y:hidden`. Le verrou de modale est d'ordinaire une opération chère — sauver le scrollTop, poser `position:fixed` sur body, tout restaurer à la fermeture, et un défaut de restitution renvoie la page en haut. RIEN DE TOUT ÇA N'EST NÉCESSAIRE, parce que le défileur de ce projet n'est pas la fenêtre : c'est BODY (`height:100%` + `overflow-x:hidden`, qui fait calculer `overflow-y` en `auto` — c'est de là que vient le « le défileur est body » posé en v2.26 et payé en v2.60/61). Passer l'overflow d'une boîte de `auto` à `hidden` lui laisse sa boîte, sa hauteur ET son scrollTop : rien ne saute, il n'y a aucune position à sauver. Body sort simplement de la chaîne, `.slist` reste — et `.slist` est le seul des deux qui puisse réellement révéler le champ. L'overflow de body ne se propage pas au viewport : html porte déjà `overflow-x:hidden`, il n'est donc pas `visible` et la règle de report legacy ne s'applique pas. Effet de bord assumé, et qui est une correction : la page ne défile plus derrière une feuille ouverte. (c) DEUXIÈME MOITIÉ : LE RAIL SE REPEIGNAIT POUR RIEN. L'écouteur `resize` appelait `paintTabs` sans condition. `paintTabs` ne dépend que d'UNE mesure, `vp.clientWidth` — une resize de HAUTEUR n'a donc rien à repeindre. Sur la rafale du clavier, chaque cran écrivait `hidden` sur les deux sections, basculait deux classes et reposait un `transform` IDENTIQUE : un recalcul de style sur tout l'arbre par image, pour zéro pixel de différence. On garde la dernière largeur et on sort tôt. On compare `vp.clientWidth`, pas `innerWidth` : c'est la mesure que la fonction lit vraiment, et la seule qui bouge quand une barre de défilement paraît. Vérifié : banc jsdom sur le vrai app.js — la classe posée à l'ouverture et retirée à la fermeture, une feuille qui enchaîne sur une autre (« Importer une liste… ») qui garde le verrou, la règle `body.sheetlock{overflow-y:hidden}` présente dans styles.css, et le compteur de `paintTabs` qui ne bouge pas sur trois resize de hauteur pure puis s'incrémente une fois sur un changement de largeur. Ce que ça NE RÈGLE PAS, et il faut le dire : LE SAUT DE LA FEUILLE ELLE-MÊME RESTE. `.sheet` est cotée `max-height:93dvh` et `bottom:0` — sous `resizes-content`, `dvh` suit le clavier, donc la feuille se re-mesure et `.slist` re-borne son scrollTop à chaque cran de la rafale. Le corriger demanderait de figer une hauteur mesurée en JS au moment de l'ouverture, ce que la leçon `--tbh` (v2.47) interdit : aucune cote CSS n'est pilotée en JS. Reste donc à trancher au pouce si le clignotement subsiste après cette version — et si oui, la vraie question n'est pas la cote mais le MODE : `resizes-content` contre `resizes-visual`, qui supprimerait la rafale entière au prix d'une feuille qui peut passer sous le clavier. Ni le banc ni jsdom ne peuvent en juger : jsdom ne calcule aucune mise en page et n'a pas de clavier logiciel. Restent ouverts, inchangés : `maybeWake`/`openWake`/`wakeItems` toujours morts sans appelant ; `enterDormant()` force le mode sélection ; la hauteur du bandeau Vue sur Collection ; l'empilement `.pinnedrow` + bandeau + `.fstate` ; « Remonte en surface » lit `mutedCats` à l'envers ; « Une date précise » en `input[type=date]` natif ; le champ URL qui ne se replie plus ; le repli local des items (dette v2.66) ; l'image propre d'une catégorie neuve. À remplacer : app.js, styles.css et sw.js, cache v81 → v82. index.html n'est PAS touché.
   v2.90 — LE CLIGNOTEMENT DE LA v2.89 N'ÉTAIT PAS OÙ JE L'AI CHERCHÉ. Deuxième rapport au pouce, et le mot qui a tout changé : « comme si elle se reconstruisait entièrement à chaque clic ». Un panneau qui SAUTE, c'est de la mise en page ; un panneau qui SE RECONSTRUIT, c'est du TRAMAGE — une couche composée que le moteur jette et refait. La v2.89 avait traité le coût JS (la rafale de `resize` qui repeignait le rail pour rien) et le défileur de la fenêtre. Elle n'a pas touché à ce qui coûte VRAIMENT cher : le rail est promu en couche composée EN PERMANENCE, et il contient toute la liste. (a) DEUX PROMOTIONS, POSÉES INDÉPENDAMMENT, JAMAIS RELUES ENSEMBLE. `.track` portait `will-change:transform` dans styles.css, et `paintTabs` lui écrit EN LIGNE `translate3d(...)`. Chacune suffit à faire du rail une couche à part ; deux règles écrites à des mois d'écart, chacune juste dans son coin. Le rail n'est pas un petit objet : c'est le rang des deux sections, donc Ma pile entière, vignettes comprises — une couche de plusieurs milliers de pixels de haut. À chaque changement de taille de la fenêtre, cette couche est invalidée et doit être re-tramée ; sous pression mémoire, le moteur la LÂCHE d'abord et la refait ensuite, et c'est ce blanc-là qu'on voit. Or le clavier logiciel provoque une rafale de redimensionnements par champ touché (`interactive-widget=resizes-content`, mécanisme détaillé en v2.89). Trois ou quatre re-tramages complets en trois cents millisecondes : ça ne saute pas, ça clignote. (b) CE QUI CHANGE, ET CE QUI NE CHANGE SURTOUT PAS. `will-change` ne vit plus qu'au temps du geste — `.track.dragging`, que `stop()` retire déjà à la fin du glissé. C'est le mode d'emploi de la propriété, qu'on annonce juste avant une animation et qu'on retire après ; posée à demeure elle ne demande pas une optimisation, elle demande une couche pour toujours. La transition `.snap` n'en a pas besoin : un `transform` en transition est promu tout seul, le temps de sa transition. Et `paintTabs` écrit `translateX(...)` au lieu de `translate3d(...,0,0)` — même translation, même pixel, mais la 2D ne force plus la couche. CE QUI NE CHANGE PAS, et c'est le point à ne pas rater : `translateX` RESTE un transform, donc `.track` reste bloc conteneur des descendants `position:fixed` et contexte d'empilement. Les correctifs v2.64 et v2.73 reposent exactement là-dessus et tiennent sans y toucher — `body.scoped .track{will-change:auto;transform:none!important}` est inchangé, et son `will-change:auto` devient simplement redondant plutôt que nécessaire. (c) UNE SOURCE DE RAFALE EN MOINS. `inputmode="url"` quitte le champ principal de la capture. Il changeait de CLAVIER — donc de hauteur de fenêtre, donc de rafale — dès qu'on passait de ce champ à Catégorie ou à Tag, ce qui explique que le clignotement se déclenche au CLIC et pas seulement à l'ouverture du clavier. Il était de toute façon mal posé : le champ prend « un lien OU une idée », et le clavier d'URL d'Android troque la barre d'espace contre « / » et « .com ». Les trois champs partagent maintenant le même clavier. Vérifié : banc jsdom sur le vrai app.js — `paintTabs` écrit bien `translateX(-Npx)` et plus aucun `translate3d` (repos, glissé et animation), la translation reste au pixel identique à l'ancienne formule sur quatre largeurs, `.track{will-change}` a disparu du repos et n'existe plus que sous `.dragging`, `body.scoped .track` conserve ses deux déclarations, et le champ `#capIn` ne porte plus `inputmode`. Les bancs des v2.83 à v2.89 sont rejoués sans régression. Ce que ça NE RÈGLE PAS, et il faut le redire : la feuille se re-mesure toujours. `.sheet` est cotée `max-height:93dvh` et `bottom:0` ; sous `resizes-content`, le contenu de la capture est plus haut que la place restante une fois le clavier levé, donc la feuille passe de « à sa hauteur, sans défileur » à « bornée, avec défileur », et `.slist` se recale sur le champ. C'est un SAUT, un seul, et il est correct — la feuille DOIT tenir au-dessus du clavier. Si après cette version il reste un saut net à l'ouverture du clavier mais plus de clignotement répété, le diagnostic est bon et le reste est le prix du mode `resizes-content`. S'il clignote encore à l'identique, alors la couche coupable n'est pas le rail et la prochaine chose à regarder est `body::before` (dégradé `fixed` plein écran) puis, en dernier recours, le mode lui-même : `resizes-visual` supprime la rafale entière, au prix d'une feuille qui peut passer sous le clavier — c'est le compromis que `resizes-content` avait justement acheté, on ne le défait pas sans le vouloir. Ni jsdom ni aucun banc ne peuvent trancher : le tramage n'existe que dans un vrai moteur, et jsdom ne calcule aucune mise en page. Restent ouverts, inchangés : `maybeWake`/`openWake`/`wakeItems` morts sans appelant ; `enterDormant()` force le mode sélection ; la hauteur du bandeau Vue sur Collection ; l'empilement `.pinnedrow` + bandeau + `.fstate` ; « Remonte en surface » lit `mutedCats` à l'envers ; « Une date précise » en `input[type=date]` natif ; le champ URL qui ne se replie plus ; le repli local des items (dette v2.66) ; l'image propre d'une catégorie neuve. À remplacer : app.js, styles.css et sw.js, cache v82 → v83. index.html n'est PAS touché.
   v2.91 — DEUX SOURCES DE VÉRITÉ POUR LA MÊME GÉOMÉTRIE : `bottom:0` ET `max-height:vh`. Troisième rapport, et cette fois une capture vidéo, qui a réglé la question en une mesure. Mes deux diagnostics précédents étaient plausibles et FAUX ; ce qui les a démentis n'est pas un raisonnement mais un décompte image par image. (a) CE QUE LA VIDÉO DIT, ET CE QU'ELLE INTERDIT DE CROIRE. 102 images, 5,5 s, la feuille d'ajout ouverte, le clavier levé, le doigt qui passe d'un champ à l'autre. Sur cinq images — CINQ images isolées, jamais deux de suite, séparées d'une vingtaine — la feuille est plus COURTE de 132 px appareil, puis revient. Le reste du temps elle ne bouge pas d'un pixel. Or son BAS ne bouge JAMAIS : 1440 px appareil sur les 102 images, y compris sur les cinq. C'est ce chiffre-là qui tranche. Si la vue avait changé de taille, `bottom:0` aurait suivi et le bas se serait déplacé. Il ne se déplace pas. Donc la vue de mise en page est STABLE, le clavier ne se redimensionne pas, et toute la v2.89 (rafale de `resize`) comme toute la v2.90 (re-tramage d'une couche composée) visaient un phénomène qui n'a pas lieu. Ce qui bouge est la seule autre cote de la règle : la hauteur passe de 1264 à 1132, soit 87,8 % puis 78,6 % de la vue. 87,8 %, c'est `max-height:88vh` — et non `93dvh` : le moteur de cet appareil n'applique pas `dvh`, il retombe sur la ligne précédente, ce que personne ne pouvait deviner sans mesurer. Et 1132 / 0,88 = 1286 : sur ces images, `vh` se résout contre une vue de 1286 pendant que `bottom` se résout contre une vue de 1440. Cent-cinquante-quatre pixels d'écart, soit à peu près la barre d'auto-remplissage de Chrome. (b) POURQUOI CET ÉCART EXISTE, ET POURQUOI IL EST STRUCTUREL. `bottom:0` se résout contre le BLOC CONTENEUR de l'élément — pour un `position:fixed`, la vue elle-même. `max-height:88vh` se résout contre une VALEUR D'UNITÉ, calculée à part et republiée par le moteur à son propre rythme. Ce sont deux chemins différents vers la même grandeur, et rien ne garantit qu'ils soient d'accord au même pas de rendu. Tant que rien ne bouge ils le sont ; dès que le widget interactif est réévalué — et il l'est à chaque champ touché, même quand sa taille finale est identique — ils divergent le temps d'une image. La feuille se raccourcit de 132 px par le haut, découvre le palier « Aujourd'hui » derrière elle, et revient. Cinq fois. C'est exactement ce qu'on voit, et c'est exactement le motif que ce journal a déjà nommé deux fois ailleurs : v2.73 et v2.81, deux pannes issues de la même famille — une cote lue dans un référentiel, une autre dans un second. (c) LE CORRECTIF TIENT EN UN JETON. `max-height:88vh;max-height:93dvh` devient `max-height:93%`, et `.sheet.tall{height:93dvh}` devient `height:93%`. Pour un `position:fixed`, un pourcentage se résout contre le bloc conteneur, c'est-à-dire contre LA BOÎTE EXACTE que `bottom:0` utilise déjà. Les deux cotes cessent d'être deux mesures pour devenir deux lectures de la même : elles ne peuvent plus diverger, par construction — ce n'est pas une atténuation, c'est la suppression du degré de liberté. Effet secondaire heureux : la doublette 88/93 disparaît. `88vh` était la retombée pour les moteurs sans `dvh`, volontairement plus basse parce que `vh` se mesure sur la GRANDE vue, barre d'adresse rétractée — 88 était une marge de sécurité contre une barre qui n'est pas là. Le pourcentage se mesure sur la vue RÉELLE du moment : la marge n'a plus d'objet, et la valeur voulue depuis le début, 93, s'applique enfin partout. Sur cet appareil la feuille gagne donc 5 % de hauteur, ce qui est la correction d'un défaut et non un changement de dessin. Vérifié : mesure image par image ré-effectuée sur la capture (bas constant, hauteur binaire 1264/1132, cinq occurrences) ; banc jsdom — plus aucune unité de vue dans la règle `.sheet`, `max-height:93%` et `.sheet.tall{height:93%}` présents, `bottom:0` et `max-width:540px` intacts ; bancs v2.89 et v2.90 rejoués sans régression. Ce que ça NE RÈGLE PAS. Deux cotes du MÊME défaut restent en `vh`/`dvh`, et sciemment : `.sheet .pickscroll{max-height:34dvh}` et `.imparea{max-height:44vh}`. Toutes deux sont des descendants STATIQUES de la feuille — leur bloc conteneur n'est plus la vue mais `.slist`, dont la hauteur vient du flex et n'est pas garantie définie partout. Un pourcentage y vaudrait `none` sur un moteur qui juge la boîte indéfinie, et une zone de saisie sans plafond est un défaut pire que le clignotement qu'on corrige. Elles peuvent donc encore sauter d'une image dans la couche de choix et dans la feuille d'import — moins visiblement (34 % et 44 % au lieu de 88 %), mais par le même mécanisme. À trancher séparément, en mesurant. Ce que je retire de mes deux versions précédentes : rien, mais il faut dire ce qui reste vrai et ce qui ne l'est plus. Le verrou de défilement (v2.89) et le `will-change` limité au geste (v2.90) se défendent seuls — une modale ne doit pas laisser défiler la page dessous, et un indice d'animation posé à demeure demande une couche pour toujours. En revanche la raison invoquée pour retirer `inputmode="url"` (v2.90) est ANNULÉE par la mesure : le clavier ne change pas de taille entre les champs, le bas de la feuille le prouve. Le retrait tient encore sur son autre motif — le champ prend « un lien OU une idée » et le clavier d'URL troque la barre d'espace contre « / » et « .com » — mais c'est désormais un choix d'ergonomie assumé, plus un correctif, et il se rétablit en un mot si le pouce préfère l'ancien. Restent ouverts, inchangés : `maybeWake`/`openWake`/`wakeItems` morts sans appelant ; `enterDormant()` force le mode sélection ; la hauteur du bandeau Vue sur Collection ; l'empilement `.pinnedrow` + bandeau + `.fstate` ; « Remonte en surface » lit `mutedCats` à l'envers ; « Une date précise » en `input[type=date]` natif ; le champ URL qui ne se replie plus ; le repli local des items (dette v2.66) ; l'image propre d'une catégorie neuve. À remplacer : styles.css, app.js (journal et version) et sw.js, cache v83 → v84. index.html n'est PAS touché.
   v2.92 — J'ARRÊTE DE DEVINER : UNE SONDE. Trois versions, trois causes avancées, trois échecs — v2.89 (rafale de `resize` du clavier), v2.90 (re-tramage d'une couche composée), v2.91 (désaccord entre `bottom:0` et `max-height:vh`). Chacune était raisonnée, chacune était plausible, et la mesure a démenti les deux premières pendant que la troisième n'a rien changé. Ce n'est plus un problème de correctif, c'est un problème de MÉTHODE : je raisonne à la place de l'appareil sur une géométrie que ni jsdom ni aucun banc ne peuvent calculer. Cette version ne corrige donc rien. Elle instrumente. (a) CE QUE LA VIDÉO PERMET ENCORE D'AFFIRMER, ET QUI SURVIT À TOUT. Sur 102 images, cinq — isolées, jamais deux de suite — montrent la feuille plus courte de 132 px appareil. Deux faits tiennent quelle que soit la cause. Le BAS ne bouge sur aucune des 102 images : la boîte est bien ancrée en bas et rétrécit par le HAUT. Et le contenu suit rigidement le bord haut : comparaison ligne à ligne du contenu de l'image normale décalé de 132 px contre celui de l'image sautée, erreur moyenne 2,4 sur 285 lignes, avec des écarts UNIQUEMENT là où l'anneau de focus diffère ; aligné sur le bas, l'erreur monte à 32,6. Aucun élément n'apparaît ni ne disparaît : le contenu est identique, il descend avec la boîte, et ses 132 derniers pixels passent sous le bord. Donc une CONTRAINTE DE HAUTEUR s'arme le temps d'une image, à 1140 px alors que le contenu en fait 1272. Reste à savoir laquelle, et c'est là que le raisonnement s'arrête : 132 px appareil, c'est 48 px CSS au facteur de cet écran, soit exactement la hauteur de la barre de navigation à trois boutons visible sur la capture — mais aussi une valeur compatible avec plusieurs autres lectures, et je ne trancherai pas entre elles depuis un conteneur Linux sans clavier logiciel. (b) LA SONDE. `capDiag()` s'accroche à l'ouverture de la feuille d'ajout. Deux précautions qui font toute sa valeur. Elle vit HORS de la feuille — `position:fixed`, posée sur la zone voilée — donc elle n'entre dans la hauteur d'AUCUNE des boîtes qu'on mesure : une sonde qui déplace ce qu'elle observe ne vaut rien, et greffée dans la feuille elle aurait pu à elle seule armer ou désarmer la contrainte cherchée. Et elle relève les EXTRÊMES image par image, pas la valeur courante : le saut ne dure qu'une image sur vingt, un afficheur instantané ne le montrerait jamais. Chaque grandeur est écrite « min→max » ; celle qui ne bouge pas est innocente, celle qui saute de 48 est la coupable, et il n'y en aura qu'une. On relève la hauteur de mise en page, la vue visuelle et son décalage haut, la `max-height` CALCULÉE de la feuille, sa hauteur réelle et son bord haut, et `safe-area-inset-bottom` lue sur une éprouvette. La `max-height` calculée fait office de second témoin : elle doit valoir environ 93 % de la hauteur de vue. Si elle en vaut 88 %, c'est que styles.css v2.91 n'est pas servi — le cache du service worker, avec un remplacement fichier par fichier, est une hypothèse qu'il faut écarter avant toute autre, et cette ligne l'écarte sans rien demander de plus. (c) CE QU'IL FAUT FAIRE. Ouvrir la feuille d'ajout, toucher les trois champs l'un après l'autre pour provoquer le clignotement, puis une capture d'écran. Une seule suffit : les extrêmes sont cumulés depuis l'ouverture. La version s'affiche en fin de ligne. Ce que ça NE RÈGLE PAS : rien, et c'est volontaire. Le bandeau noir en haut de l'écran est laid et assumé — il part à la version suivante, avec `capDiag()`, sa règle `.capdiag` et cette entrée. Ce que je NE retire pas non plus, faute de preuve dans un sens ou dans l'autre : le verrou de défilement (v2.89), le `will-change` limité au geste (v2.90) et la `max-height` en pourcentage (v2.91) restent en place — aucun n'a nui, chacun se défend sur son propre motif, et les retirer maintenant ajouterait trois variables à une mesure qui n'en veut aucune. Restent ouverts, inchangés : `maybeWake`/`openWake`/`wakeItems` morts sans appelant ; `enterDormant()` force le mode sélection ; la hauteur du bandeau Vue sur Collection ; l'empilement `.pinnedrow` + bandeau + `.fstate` ; « Remonte en surface » lit `mutedCats` à l'envers ; « Une date précise » en `input[type=date]` natif ; le champ URL qui ne se replie plus ; le repli local des items (dette v2.66) ; l'image propre d'une catégorie neuve ; `.pickscroll` et `.imparea` encore en unités de vue (v2.91). À remplacer : app.js, styles.css et sw.js, cache v84 → v85. index.html n'est PAS touché.
   v2.93 — LA CAUSE EST TROUVÉE, ET ELLE N'EST PAS DANS SABLE : LA BARRE D'AUTO-REMPLISSAGE DE CHROME. Trouvée au pouce, confirmée par la sonde de la v2.92 en une capture. Relevé : `vue 488→756 · vis 489→756/0 · max 93 · feuil 454→472 · haut 34→780 · bas 0`. Cinq lectures, et chacune ferme une porte. `bas 0` : `safe-area-inset-bottom` ne vaut jamais autre chose que zéro — la barre de navigation est innocente. `vis .../0` : le décalage haut de la vue visuelle ne bouge jamais, donc rien ne se déplace visuellement, c'est bien la vue de MISE EN PAGE qui change de taille. `max 93` : la `max-height` calculée vaut « 93% » et non « 88vh » — styles.css v2.91 EST servi, le cache du service worker est écarté sans avoir eu à le tester. Restent les deux qui comptent. `vue 488→756` : la vue passe de 756 (clavier baissé) à 488 (clavier levé ET barre d'auto-remplissage présente) ; la barre pèse 60 px CSS, soit 180 px appareil au facteur 3 de cet écran — exactement la bande blanche mesurée sur la première capture entre le bas de la feuille et le haut du clavier. `feuil 454→472` : la feuille bascule entre 454 et 472. Ces deux nombres disent tout. 454, c'est 93 % de 488 — la feuille est PLAFONNÉE. 472, c'est sa hauteur de CONTENU — elle ne l'est plus. La feuille d'ajout mesure 472 px de contenu, et le plafond vaut 454 avec la barre, 509 sans elle : le contenu tombe PILE ENTRE LES DEUX. À chaque apparition ou disparition de la barre, la feuille bascule d'un régime à l'autre, et son bord haut saute de 42 px CSS — les 132 px appareil mesurés image par image sur la première capture. Ce n'est donc ni une rafale de `resize` (v2.89), ni un re-tramage (v2.90), ni un désaccord d'unités (v2.91) : c'est un SEUIL, et la barre le franchit dans les deux sens plusieurs fois par saisie. (a) POURQUOI ON NE PEUT PAS ÉTEINDRE LA BARRE. Elle n'appartient pas à la page : c'est une pièce de Chrome, commandée par les réglages d'auto-remplissage de l'appareil, et aucun attribut HTML ne la refuse — `autocomplete="off"` est déjà posé sur les trois champs et ne la retient pas. Elle s'éteint dans Chrome (Réglages → Modes de paiement, Adresses, Mots de passe), mais c'est un réglage d'utilisateur, pas un correctif qu'on livre. (b) POURQUOI AUCUNE VALEUR CSS NE MET LA FEUILLE À L'ABRI, ET LE CHIFFRAGE QUI LE MONTRE. Avec un contenu de 472 et une vue qui vaut 488 (barre) ou 548 (sans), l'écart du bord haut vaut : 42 px en `max-height:93%` — l'état actuel ; 60 px en `max-height:100%`, donc PIRE, parce qu'une feuille jamais plafonnée suit intégralement le bas de la vue ; 9 px en `max-height:85%`, où le contenu reste au-dessus du plafond dans les DEUX états — mais cette valeur ne tient que pour ce contenu-là, le seuil se déplace avec lui et une feuille plus courte le refranchirait ; 4 px en `height:93%`, plafond IMPOSÉ, seule forme indépendante du contenu ; 0 en `interactive-widget=resizes-visual`, où la vue de mise en page ne change plus du tout. Il n'existe donc pas de constante à écrire : les deux seules issues indépendantes du contenu changent le comportement de l'app, et ce n'est pas à un correctif de les choisir. (c) CE QUE FAIT CETTE VERSION. Elle retire la sonde — `capDiag()`, la règle `.capdiag`, le bandeau noir — et livre `proto.html`, un essai qui reprend les cotes RÉELLES de la feuille (48 px de champ, 16 px de rayon, 18 px en tête, 540 px de large, mêmes marges) pour que le contenu retombe au même endroit par rapport au seuil : un prototype plus court ou plus long ne franchirait pas le même seuil et ne prouverait rien. Trois modes commutables : A, l'état actuel ; B, `height:93%` ; C, `resizes-visual`. (Rectifié en v2.94 : la première livraison commutait par LIENS, `?m=b`, ce qui dépendait de l'URL et du service worker qui intercepte les navigations, et posait les boutons EN BAS de l'écran — c'est-à-dire là où arrivent le clavier, la feuille et la barre. Les modes sont passés dans le bandeau du haut et récrivent la balise de vue à chaud, sans navigation.) Le relevé affiche en permanence l'ÉCART du bord haut, qui est la mesure du défaut : on ouvre la feuille, on touche les trois champs, et on lit. A doit donner un écart de l'ordre de 40, B de l'ordre de 5, C zéro. Ce que ça NE RÈGLE PAS : rien n'est corrigé dans l'app, et c'est délibéré — B rend TOUTES les feuilles pleine hauteur, y compris une feuille de trois lignes, et C laisse le bas de la feuille passer sous le clavier en comptant sur le navigateur pour amener le champ visé à l'écran. Ce sont deux compromis de dessin, ils se tranchent au pouce, et le prototype existe pour ça. Les trois correctifs précédents restent en place : aucun n'a nui, chacun se défend sur son propre motif — le verrou de défilement sous une modale (v2.89), l'indice d'animation limité au geste (v2.90), la cote de hauteur résolue contre le même bloc conteneur que la position (v2.91). Restent ouverts, inchangés : `maybeWake`/`openWake`/`wakeItems` morts sans appelant ; `enterDormant()` force le mode sélection ; la hauteur du bandeau Vue sur Collection ; l'empilement `.pinnedrow` + bandeau + `.fstate` ; « Remonte en surface » lit `mutedCats` à l'envers ; « Une date précise » en `input[type=date]` natif ; le champ URL qui ne se replie plus ; le repli local des items (dette v2.66) ; l'image propre d'une catégorie neuve ; `.pickscroll` et `.imparea` encore en unités de vue. À remplacer : app.js, styles.css, sw.js (cache v85 → v86) et proto.html, nouveau. index.html n'est PAS touché.
   v2.94 — LA VUE PASSE EN `resizes-visual`. Tranché au pouce sur `proto.html`, cotes réelles : mode C. Ce qui cassait, pour mémoire et parce qu'il a fallu six versions pour le tenir : la barre d'auto-remplissage de Chrome — mots de passe, cartes, adresses — apparaît et disparaît au-dessus du clavier à chaque champ touché. En `interactive-widget=resizes-content`, elle REDIMENSIONNE la vue de mise en page, de 60 px CSS. La feuille d'ajout mesure 472 px de contenu ; son plafond valait 454 avec la barre et 509 sans elle. Le contenu tombait PILE ENTRE LES DEUX, donc la feuille basculait de « plafonnée » à « libre » et retour, et son bord haut sautait de 42 px CSS — les 132 px appareil mesurés image par image. Ce qui change : un seul jeton dans index.html, `resizes-content` devient `resizes-visual`. La vue de mise en page ne change alors PLUS JAMAIS — ni pour le clavier, ni pour la barre, ni pour la bande de suggestions du clavier, ni pour un changement de disposition. Ce n'est pas une atténuation du seuil : c'est la suppression de la variable qui le faisait franchir. Le navigateur fait désormais glisser la vue VISUELLE pour amener le champ visé sous les yeux, comme sur iOS. CE QUE ÇA COÛTE, ET IL FAUT LE JUGER À L'USAGE, PAS ICI : la feuille est ancrée au bas d'une vue de mise en page qui garde toute sa hauteur, donc son bas peut passer SOUS le clavier. Sur la feuille d'ajout, « Ajouter » est juste sous le champ Tag — s'il faut faire glisser pour l'atteindre après avoir tapé un tag, c'est le prix, et il se renégocie en un mot. Le verrou de défilement de la v2.89 travaille ici DANS LE BON SENS, ce qui n'était pas prévu : body étant figé sous la feuille, le navigateur ne peut plus perdre du temps à faire défiler une page qui ne rapprochera jamais un champ posé dans un `position:fixed` — il lui reste à faire glisser la vue visuelle, c'est-à-dire la seule chose qui marche. Ce qui NE change pas : `max-height:93%` reste (v2.91) — la cote est juste, et elle devient simplement stable puisque plus rien ne fait bouger le bloc conteneur ; le `will-change` limité au geste reste (v2.90) ; l'écouteur `resize` gardé sur la largeur reste (v2.89) et ne se déclenchera tout simplement plus au clavier. SUR LA QUESTION POSÉE — peut-on empêcher la barre elle-même ? Oui, et la réponse était dans la capture : le champ de saisie de Claude n'en déclenche pas parce que ce N'EST PAS un contrôle de formulaire. L'auto-remplissage de Chrome ne s'accroche qu'aux `input`, `textarea` et `select` ; un élément `contenteditable` lui est invisible, il n'a donc ni barre ni proposition. Passer les trois champs de la capture en `contenteditable="plaintext-only"` ferait disparaître la barre en `resizes-content` comme en `resizes-visual`. Ce n'est PAS livré ici, et délibérément : ça touche le collage (il faut forcer le texte brut), le texte de substitution (plus d'attribut `placeholder`, il passe en `::before`), la lecture des valeurs (`textContent` au lieu de `value`), le câblage des suggestions, l'accessibilité (`role="textbox"`, `aria-label`) et la feuille d'import — soit six chantiers greffés sur un changement de mode de vue qu'on veut justement pouvoir juger seul. Une chose à la fois : on regarde d'abord si `resizes-visual` tient à l'usage. Ce que ça NE RÈGLE PAS : la barre continue d'apparaître, elle ne fait simplement plus bouger la mise en page ; si elle gêne à l'œil, le chantier `contenteditable` ci-dessus est la suite. `.pickscroll` et `.imparea` restent en unités de vue (v2.91) — sans danger désormais, puisque la vue de mise en page est fixe. Et rien de tout ceci ne se vérifie sur un banc : jsdom n'a ni clavier logiciel ni vue visuelle, le correctif se juge au pouce. Rectifié au passage : la clause de la v2.93 qui décrivait un prototype commutant par liens. Restent ouverts, inchangés : `maybeWake`/`openWake`/`wakeItems` morts sans appelant ; `enterDormant()` force le mode sélection ; la hauteur du bandeau Vue sur Collection ; l'empilement `.pinnedrow` + bandeau + `.fstate` ; « Remonte en surface » lit `mutedCats` à l'envers ; « Une date précise » en `input[type=date]` natif ; le champ URL qui ne se replie plus ; le repli local des items (dette v2.66) ; l'image propre d'une catégorie neuve. `proto.html` peut être supprimé du dépôt, il a servi. À remplacer : index.html, app.js et sw.js, cache v86 → v87. styles.css n'est PAS touché.
   v2.95 — RETOUR EN ARRIÈRE SUR `resizes-visual`, ET HAUTEUR IMPOSÉE À LA CAPTURE. La v2.94 a tenu sa promesse et manqué la cible : le clignotement a bien disparu, et la feuille est devenue inutilisable. Rapport au pouce, sans appel : « les champs sont cachés par le clavier, l'UX est naze ». (a) POURQUOI `resizes-visual` NE POUVAIT PAS MARCHER ICI, ET J'AURAIS DÛ LE VOIR AU PROTOTYPE. En `resizes-visual` la vue de mise en page garde toute sa hauteur — c'est précisément ce qui supprime le défaut. Mais la feuille est ancrée au BAS de cette vue : son bas se retrouve donc sous le clavier, et avec lui « Ajouter », « Photo », « Fichier », « Importer ». Le navigateur est censé faire glisser la vue visuelle pour amener le champ visé sous les yeux ; il le fait pour le champ, pas pour ce qui le suit. Second effet, plus vicieux et signalé aussi : le glissé ne défilait pas DEPUIS la feuille, seulement depuis la page derrière. `.slist` n'avait plus rien à déborder — la feuille tenait entière dans la vue, elle était seulement OCCULTÉE par le clavier — donc le glissé tombait dans un défileur qui n'avait rien à défiler, pendant qu'`overscroll-behavior:contain` l'empêchait de le rendre à la vue visuelle qui, elle, aurait pu glisser. Une zone qui capte un geste sans pouvoir y répondre et sans le rendre : c'est le pire des trois états. Le prototype montrait tout cela — je l'ai livré en mesurant l'écart du bord haut, qui vaut bien zéro en mode C, sans jamais faire regarder ce qui restait ATTEIGNABLE. Une mesure juste sur la mauvaise grandeur. (b) CE QUI CHANGE. index.html revient à `interactive-widget=resizes-content` : la vue s'arrête au-dessus du clavier, la feuille tient entière dedans, le défilement interne redevient possible parce qu'il y a de nouveau quelque chose à déborder. Et le seuil qui causait le clignotement est traité là où il est, dans la feuille : c'est le mode B du prototype. La feuille de capture mesure 472 px de contenu ; son plafond vaut 454 barre d'auto-remplissage levée, 509 barre baissée. Le contenu tombait PILE ENTRE LES DEUX, donc elle basculait de « plafonnée » à « libre » et retour à chaque apparition de la barre, et son bord haut sautait de 42 px. En hauteur IMPOSÉE il n'y a plus qu'un seul régime, donc plus de bascule : écart mesuré au pouce sur le prototype, de ~40 px à ~5. Elle ne perd rien au change — à 472 de contenu pour 454 de plafond, elle était déjà à sa hauteur maximale. (c) POURQUOI UNE CLASSE NEUVE ET NON `tall`. `tall` impose exactement la même hauteur et son propre commentaire la présente comme « une hauteur ». C'est faux dans le fichier : `.sheet.tall .shead` prend un filet et `.sheet.tall h2` passe en mono capitales 11 px. La poser sur la capture aurait changé « Ajouter » en étiquette — un effet de bord typographique sans aucun rapport avec le défaut corrigé. On sépare : `.hfix` est la hauteur seule, `.tall` garde sa grammaire de fiche. Élargir un mot qui ment déjà aurait coûté moins cher aujourd'hui et plus cher ensuite. `closeSheet()` retire les trois classes. Ce que ça NE RÈGLE PAS, et c'est à juger au pouce. Il reste ~5 px de saut : la barre change encore la vue, la feuille suit encore son bas, simplement elle ne change plus de régime. La feuille s'ouvre désormais à 93 % de la vue CLAVIER BAISSÉ, puis se resserre quand le clavier monte : le mouvement est concomitant au glissé d'entrée et devrait passer inaperçu, mais c'est le premier endroit à regarder si quelque chose danse à l'ouverture. Et c'est le mode B, celui que le pouce avait classé DERRIÈRE le C — je le livre parce que le coût du C s'est révélé rédhibitoire, pas parce qu'il a gagné. LA VRAIE SORTIE RESTE `contenteditable`, et elle est meilleure sur tous les axes : l'auto-remplissage de Chrome ne s'accroche qu'aux `input`, `textarea` et `select`, jamais à un `contenteditable` — d'où l'absence de barre dans le champ de saisie de Claude. Sans barre, la vue ne vaut plus qu'une seule valeur, le seuil n'est plus jamais franchi, la feuille peut REDEVENIR à hauteur de contenu (donc `.hfix` sauterait), et elle reste au-dessus du clavier. Le coût est du travail, pas un compromis : collage à forcer en texte brut, texte de substitution en `::before`, `textContent` au lieu de `value`, câblage des suggestions, `role="textbox"` et `aria-label`, et la feuille d'import. À faire ensuite, seul, pour qu'il soit jugeable seul. Restent ouverts, inchangés : `maybeWake`/`openWake`/`wakeItems` morts sans appelant ; `enterDormant()` force le mode sélection ; la hauteur du bandeau Vue sur Collection ; l'empilement `.pinnedrow` + bandeau + `.fstate` ; « Remonte en surface » lit `mutedCats` à l'envers ; « Une date précise » en `input[type=date]` natif ; le champ URL qui ne se replie plus ; le repli local des items (dette v2.66) ; l'image propre d'une catégorie neuve ; `.tall` qui porte une typographie sous un nom de hauteur. À remplacer : index.html, app.js, styles.css et sw.js, cache v87 → v88.
   v2.96 — LE TREMBLEMENT RÉSIDUEL : UN ÉCART EXPRIMÉ EN POURCENTAGE. La v2.95 a supprimé la bascule de régime et laissé 5 px annoncés ; ils étaient là, et ils se mesurent. Capture au pouce, 68 images, 2,2 s : le bord haut de la feuille oscille entre 176 et 189 px appareil — 13 px, quatre fois, une par champ touché. Le bas, lui, ne bouge que de 10 px et il est de toute façon sous la barre. (a) LE MODÈLE, VÉRIFIÉ À L'UNITÉ. La vue commence à 77 px appareil, sous la barre d'état ; elle mesure 1373 px barre d'auto-remplissage levée, 1553 baissée — la barre pèse 180 px appareil, exactement la bande blanche mesurée entre le bas de la feuille et le haut du clavier. La feuille valant `height:93%`, son bord haut vaut « haut de vue + 7 % de la vue » : 77 + 96 = 173 dans un cas, 77 + 109 = 186 dans l'autre. Écart prédit 13, écart mesuré 13. Le modèle est juste, et il dit où est la faute : ce n'est pas la HAUTEUR qui est mal exprimée, c'est l'ÉCART. (b) UN ÉCART N'EST PAS UNE PROPORTION. Le rôle de cette bande au-dessus de la feuille est de MONTRER qu'il y a une page derrière — de dire « ceci se pose sur autre chose », pas « ceci occupe quatre-vingt-treize pour cent ». Ce rôle ne dépend pas de la taille de la vue : il vaut autant sur un petit écran que sur un grand, clavier levé ou baissé. Écrit en pourcentage, il se met à respirer avec tout ce qui fait respirer la vue — et la barre d'auto-remplissage la fait respirer quatre fois par saisie. Écrit en constante, il ne bouge plus : `calc(100% - 36px)` ancre le bord haut une fois pour toutes, et seul le bas suit la vue, là où personne ne le voit. 36 px reprend l'écart que `7 %` produisait déjà clavier levé — 32 px — arrondi vers le haut pour dégager franchement la barre d'état ; clavier baissé la feuille gagne 6 px de haut, ce qui n'est visible que pendant les deux cents millisecondes du glissé d'entrée. (c) LES TROIS COTES CHANGENT ENSEMBLE. `.sheet{max-height}`, `.sheet.tall{height}` et `.sheet.hfix{height}` portaient le même `93%` et le même défaut de nature. Les corriger séparément aurait laissé trois écritures pour une seule idée, et la fiche du grain — qui a des champs, donc la même barre, donc le même tremblement — aurait gardé le défaut qu'on venait de nommer. C'est la v2.70 qui vaut ici : une cote se règle par mesure et par famille, pas au cas par cas. Ce que ça NE RÈGLE PAS. Les feuilles SANS hauteur imposée épousent leur contenu : leur bord haut vaut « vue moins contenu », il suit donc le bas de la vue EN ENTIER, soit 60 px CSS quand la barre paraît. Le changement d'unité ne les protège pas — il les rend seulement cohérentes. Elles ne tremblent pas aujourd'hui parce que la barre ne paraît que sur un champ de saisie et qu'elles n'en ont pas ; une feuille de menu à laquelle on ajouterait un champ de recherche ramènerait le défaut, et la parade serait `hfix`. À surveiller, pas à corriger d'avance. Et le fond reste entier : la barre continue d'apparaître et de changer la vue. LA SORTIE PROPRE RESTE `contenteditable` — l'auto-remplissage de Chrome ne s'accroche qu'aux `input`, `textarea` et `select`, jamais à un `contenteditable`, d'où son absence dans le champ de saisie de Claude. Sans barre, la vue ne vaut plus qu'une seule valeur : plus de seuil, plus d'écart qui respire, `hfix` peut sauter et la feuille redevient à hauteur de contenu. Coût : collage à forcer en texte brut, texte de substitution en `::before`, `textContent` au lieu de `value`, câblage des suggestions, `role="textbox"` et `aria-label`, et la feuille d'import. Du travail, pas un compromis. Restent ouverts, inchangés : `maybeWake`/`openWake`/`wakeItems` morts sans appelant ; `enterDormant()` force le mode sélection ; la hauteur du bandeau Vue sur Collection ; l'empilement `.pinnedrow` + bandeau + `.fstate` ; « Remonte en surface » lit `mutedCats` à l'envers ; « Une date précise » en `input[type=date]` natif ; le champ URL qui ne se replie plus ; le repli local des items (dette v2.66) ; l'image propre d'une catégorie neuve ; `.tall` qui porte une typographie sous un nom de hauteur. À remplacer : styles.css, app.js et sw.js, cache v88 → v89. index.html n'est PAS touché.
   v2.97 — LE CADRE ATTEND UNE HEURE, ET LE JOUR DEVIENT LOCAL. Point de départ : « ce matin je l'ai pas eu, je ne sais pas pourquoi ». Le diagnostic a rendu quatre suspects et j'en corrige trois, plus le réglage demandé. (a) UNE HEURE D'ARRIVÉE, ET CE QU'ELLE PEUT VRAIMENT ÊTRE. Sable ne tourne que quand il est ouvert : pas de processus de fond, pas de tâche planifiée, donc AUCUN réglage ne peut faire apparaître quoi que ce soit à 7 h sur un téléphone dans une poche — il faudrait une notification, donc du Push serveur, qui est un autre chantier. Ce qui est livré est donc un SEUIL et non un réveil : le cadre arrive à la première ouverture APRÈS l'heure dite, au lieu de la première ouverture du jour. C'est exactement l'outil du défaut signalé — jusqu'ici une ouverture à 5 h dépensait l'événement, et on le retrouvait replié à 9 h sans savoir pourquoi. Le libellé du réglage dit « attend cette heure », jamais « arrive à », parce que la seconde formule serait un mensonge. Réglage `frameHour`, 0 à 23, défaut 7. (b) TOUTES LES ABSTENTIONS SORTENT SANS MARQUER LE JOUR. C'est la condition qui fait tenir (a) : si l'heure n'est pas venue, si une couche est ouverte, si le cadre n'a rien à dire ou s'il ne peut pas être VU, on sort sans écrire `frameDay`. Un seuil qui consommerait la journée en s'abstenant ne décalerait pas l'arrivée, il la supprimerait. Le cas « pas vu » mérite son nom : déployer un cadre alors que le défileur n'est pas en haut le fait ranger par sa PROPRE sentinelle (v2.85) dans la foulée — jour dépensé, rien à l'écran. On attend d'être en haut, et la relecture de l'heure repassera. (c) L'HEURE SE REGARDE, ELLE NE SE PROGRAMME PAS. Un `setTimeout` calé sur l'heure dite ne survit ni à la mise en veille, ni à un changement d'heure, ni à une reprise : il se réveille en retard ou jamais. On relit donc l'heure à la minute — `maybeOpenFrame` sort à sa deuxième ligne une fois le jour servi, c'est deux comparaisons — et à chaque RETOUR AU PREMIER PLAN. Ce second branchement vaut à lui seul le chantier, et il est probablement la vraie cause du matin manquant : `startApp` ne rejoue PAS sur une PWA simplement reprise de l'arrière-plan, `maybeOpenFrame` n'avait qu'un seul appelant, au démarrage à froid. Une app jamais tuée ne voyait jamais le matin. (d) LE JOUR PASSE EN LOCAL. `todayStr` rendait le jour UTC (`toISOString`) : à Paris la date basculait à 01 h l'hiver et 02 h l'été, donc une session de nuit consommait le lendemain avant qu'il ait commencé. Un seul formateur, `dayKey`, sert désormais `todayStr` ET les deux dates de `nextSurfaceDate`/`nextSurfaceLabel` : deux notions de « jour » auraient été le doublon que ce fichier passe son temps à payer, et le seuil horaire l'aurait rendu invisible sans le supprimer. Le jour de TIRAGE bascule donc aussi à minuit local, ce qui est ce que tout le monde croyait déjà. (e) UN DOUBLON DE RÈGLE, ET LE MATIN MUET QU'IL CAUSAIT. `maybeOpenFrame` tenait sa propre lecture du contenu — `!riseFrameIds().length && !unfiledDue()` — quand `renderRiseFrame` en tient une autre, qui inclut la RAISON du vide dès que la remontée est allumée. Conséquence exacte : un tirage vide de plein droit (rotation de 14 j, maturation de 30 j, sourdine, jour hors rythme) construisait bien le cadre explicatif, mais il restait replié — le seul matin où l'on veut une explication était précisément celui où rien n'arrivait, contre la promesse (f) de la v2.84. La règle n'est plus énoncée qu'à un endroit : on rend, et on regarde si un cadre a été posé. C'est le même geste que la v2.82 avait fait pour `drawables()`. (f) LA FORME DU RÉGLAGE. Vingt-quatre heures dans la primitive `.seg` existante, six par rangée : la grille de colonnes `1fr` la replie d'elle-même en quatre lignes, aucune voix nouvelle dans le design system, et `.seg.hrs` rejoint `.seg.days` dans les deux règles qui les cotent — deux membres d'un jeu, pas deux règles. Pas d'`input[type=time]` : le fichier traîne déjà « Une date précise » en natif comme une dette, et les minutes n'ont aucun sens pour un seuil franchi une fois par jour. Vérifié : banc jsdom sur le vrai app.js, storage en mémoire. Avant l'heure — aucun déploiement ET `frameDay` intact ; à l'heure — déployé et jour marqué ; le lendemain avant l'heure — de nouveau silencieux, ce qui prouve que la veille n'avait pas mangé le jour suivant ; défileur à 300 px — pas de déploiement, jour intact, puis déploiement une fois revenu en haut ; couche ouverte — silence, jour intact ; tirage vide avec remontée allumée — le cadre explicatif s'ouvre et porte `riseVoidReason` (il échoue sur le dépôt d'avant) ; remontée éteinte et rien à ranger — silence complet ; `dayKey` contrôlé sur les deux bords de minuit local et sur une date où le jour UTC diffère du jour local ; bornage de `frameHour` sur une valeur absente, négative, à 99 et non entière. Ce que ça NE RÈGLE PAS, et il faut le lire avant de juger la version. SI TU N'OUVRES PAS L'APP APRÈS L'HEURE, IL N'Y A PAS DE CADRE : aucun réglage ne peut changer ça, seule une notification le pourrait. Le seuil ne rattrape rien non plus — il n'existe pas de « tu ne l'as pas vu hier », le cadre d'hier est perdu. Reposer une heure DÉJÀ passée depuis les Réglages ne sert pas dans la seconde : `maybeOpenFrame` s'abstient sous une couche, il faut refermer la feuille et attendre la relecture, au pire une minute. La relecture à la minute est un intervalle et non un branchement sur l'horloge : le cadre peut arriver jusqu'à soixante secondes après l'heure ronde, ce qui est sans importance ici mais se verrait si quelqu'un attendait 7 h 00 pile. Et deux des quatre suspects du diagnostic restent debout, faute de preuve : le démarrage sur Ma pile (`startTab` ou « Dernier onglet ») fait toujours sortir `maybeOpenFrame` à sa première ligne — mais la relecture le rattrape désormais dès qu'on revient sur Collection, ce qui est peut-être la vraie réponse et se jugera à l'usage ; et une restauration de défilement au lancement est maintenant SANS danger, puisque le jour n'est plus consommé dans ce cas. Restent ouverts, inchangés : `maybeWake`/`openWake`/`wakeItems` morts sans appelant ; `enterDormant()` force le mode sélection ; la hauteur du bandeau Vue sur Collection ; l'empilement `.pinnedrow` + bandeau + `.fstate` ; « Remonte en surface » lit `mutedCats` à l'envers ; « Une date précise » en `input[type=date]` natif ; le champ URL qui ne se replie plus ; le repli local des items (dette v2.66) ; l'image propre d'une catégorie neuve ; `.tall` qui porte une typographie sous un nom de hauteur. À remplacer : app.js, styles.css et sw.js, cache v89 → v90. index.html n'est PAS touché.
   v2.98 — L'HEURE D'ARRIVÉE DEVIENT UN PAS À PAS SAISISSABLE. Ce qui n'allait pas n'était pas un défaut mais une DISPROPORTION : la v2.97 avait posé les vingt-quatre heures dans `.seg`, six par rangée, et la grille se repliait en quatre lignes de pastilles. Rien n'y était faux — la primitive était la bonne, aucune voix nouvelle n'avait été inventée — mais elle donnait au réglage le plus RARE de la feuille son plus gros bloc, environ 140 px de contrôle sous un libellé empilé. Trois formes ont été prototypées et jugées au pouce : molette à deux colonnes (abandonnée — 132 px, et une colonne de minutes qui ne pilote rien est un mensonge), rail horizontal aimanté (44 px, écarté), pas à pas (retenu). (a) CE QUI CHANGE, ET POURQUOI C'EST LE VRAI GAIN. `setHours` rend désormais `− 07:00 +`, et la rangée passe de `setStack` à `setRow` : le contrôle tient sur la LIGNE du libellé au lieu de s'empiler dessous. C'est là qu'est l'économie, pas dans la largeur du contrôle. (b) LE CHAMP N'EST PAS UN `input`, ET C'EST LE POINT DE LA VERSION. Les chiffres se touchent et s'écrivent au clavier, dans un `contenteditable="plaintext-only"`. L'auto-remplissage de Chrome ne s'accroche qu'aux `input`, `textarea` et `select` : sur un `contenteditable` il n'y a NI barre NI proposition, donc pas de vue qui respire, donc pas le tremblement que les v2.89 à v2.96 ont mis six versions à border. C'est la sortie annoncée en v2.94, redite en v2.95 et en v2.96, repoussée trois fois parce qu'elle traînait six chantiers greffés sur la feuille de capture. Elle est essayée ici sur DEUX CHIFFRES — pas de collage à forcer, pas de texte de substitution, pas de suggestions à recâbler — pour la juger seule avant de la faire porter à la capture. Le repli n'est pas supposé : on repose l'attribut, on RELIT `contentEditable`, et si le moteur ne l'a pas retenu on retombe sur `true` ; le champ ne fait que deux chiffres et `input` les filtre déjà. (c) LES RÈGLES DE SAISIE, ET CELLE QUI ÉCONOMISE UN APPUI SUR DEUX. Appui = tout sélectionné, clavier numérique. Deux chiffres valident seuls. Un premier chiffre >= 3 ne peut plus être une dizaine d'heures : il vaut pour lui-même, 5 devient 05 h sans attendre — c'est la règle des sélecteurs d'heure natifs. Hors bornes ramené dans 0–23, non-numérique refusé à `beforeinput`, Entrée valide, Échap rend la valeur d'avant. Un champ VIDÉ n'est pas une demande de minuit : on repeint l'ancienne valeur. Les flèches restent, et elles ne sont pas décoratives — lever le clavier pour passer de 7 h à 8 h coûterait plus que le pas économisé ; appui long = répétition, bouclage 23 -> 0 comme une horloge. (d) SEULES LES HEURES SE SAISISSENT. « :00 » est un nœud à part, sans `contenteditable`, qui ne reçoit jamais le curseur. C'est la promesse « pas de minutes » tenue par la STRUCTURE au lieu d'être répétée dans une aide — un seuil franchi une fois par jour n'a pas de minutes, et la v2.97 l'avait déjà écrit. (e) DEUX FAUTES D'ALIGNEMENT, TROUVÉES AU PROTOTYPE, ET ELLES SE CUMULAIENT. `align-items:baseline` dans une boîte plus haute que son contenu ne centre RIEN : l'alignement par ligne de base pose le groupe au bord de DÉPART de l'axe transversal, donc en haut — la valeur montait d'environ cinq pixels pendant que les flèches, elles, étaient centrées par le conteneur. Et le filet de saisie ne vivait que sous les heures, avec son propre retrait bas : les deux travées n'avaient donc pas la même hauteur de boîte, et une fois centrées leurs lignes de base auraient divergé de deux pixels. On donne la MÊME boîte aux deux et on ne colore que celle qui se saisit. Les glyphes des flèches passent en boîte flex, la hauteur de ligne d'un signe mathématique variant d'un moteur à l'autre. Le défaut se voyait sur les DEUX rangées de la capture, ce qui désignait la règle et non la rangée. (f) LA FORME, ET POURQUOI ELLE RESTE SCOPÉE. `.stp` vit sous `.setwrap` et n'en sort pas, contrairement à `.seg` qui est une primitive de toute l'app : il n'a qu'un seul appelant, et promouvoir un composant sur un seul appelant est précisément la façon dont ce fichier a fabriqué ses doublons (v2.70). Rail, rayon et hauteur sont ceux de `.seg` — même primitive, autre grammaire : une valeur qu'on ajuste, non un choix parmi n. Si « Items par tirage » le rejoint, il montera d'un cran ; pas avant. Et `.hrs` QUITTE les deux sélecteurs de styles.css qui le citaient avec `.days` : la grille n'existe plus, garder son nom dans une règle vivante ferait croire qu'une seconde famille s'y règle encore. Vérifié : banc jsdom sur le vrai app.js, storage en mémoire, feuille Réglages rendue pour de bon. Rendu initial à l'heure enregistrée, zéro-comblée ; `− `/`+` écrivent bien `settings.frameHour` et bouclent 23 -> 0 -> 23 ; saisie « 19 » validée seule, « 5 » validé seul, « 1 » attendu puis validé au flou, « 99 » ramené à 23, champ vidé qui rend l'ancienne valeur, lettres refusées, Échap qui restitue ; le nœud des minutes ne porte AUCUN `contenteditable` ; la feuille ne contient plus aucune pastille `.seg.hrs` et la rangée n'est plus `stack` ; `frameHour()` relu depuis les réglages après chaque geste ; `.hrs` absent de toute règle CSS vivante. Ce que ça NE RÈGLE PAS. Ni jsdom ni aucun banc ne mesurent un alignement : jsdom ne calcule aucune mise en page, la correction du (e) est un diagnostic, pas une mesure, et elle se juge au pouce. Le clavier CONTINUE de réduire la vue en `resizes-content` — ce que `contenteditable` supprime est la barre d'auto-remplissage, pas le clavier ; la feuille Réglages porte `.tall`, donc une hauteur imposée, donc son bord haut est déjà ancré (v2.96) et c'est ce qui rend ce champ sûr ICI, mais une feuille SANS hauteur imposée à laquelle on ajouterait un champ retrouverait le défaut, et la parade resterait `hfix`. Le reste de la promesse de la v2.97 est inchangé et vaut d'être redit : si tu n'ouvres pas l'app après l'heure, il n'y a pas de cadre, et reposer une heure déjà passée ne sert pas dans la seconde — `maybeOpenFrame` s'abstient sous une couche, il faut refermer la feuille et attendre la relecture, au pire une minute. Le champ n'a pas de sélection de minutes et n'en aura pas. Restent ouverts, inchangés : `maybeWake`/`openWake`/`wakeItems` morts sans appelant ; `enterDormant()` force le mode sélection ; la hauteur du bandeau Vue sur Collection ; l'empilement `.pinnedrow` + bandeau + `.fstate` ; « Remonte en surface » lit `mutedCats` à l'envers ; « Une date précise » en `input[type=date]` natif ; le champ URL qui ne se replie plus ; le repli local des items (dette v2.66) ; l'image propre d'une catégorie neuve ; `.tall` qui porte une typographie sous un nom de hauteur ; les trois champs de la capture toujours en `input`, donc toujours porteurs de la barre. À remplacer : app.js, styles.css et sw.js, cache v90 -> v91. index.html n'est PAS touché.
   v2.99 — LES MINUTES DU SEUIL, ET UNE PHRASE QUE JE RETIRE. Il faut commencer par là : la v2.97 puis la v2.98 ont écrit, mot pour mot, que « les minutes n'ont aucun sens pour un seuil qu'on franchit une fois par jour ». La phrase était fausse, et elle l'était pour une raison précise qu'il vaut mieux nommer que gommer. Ce que je défendais réellement, c'était de ne pas ajouter une COLONNE de choix aux minutes — une molette de soixante crans, ou vingt-quatre pastilles multipliées par douze, pour une valeur qu'on repose une fois l'an. Cet argument-là tient encore. Mais depuis la v2.98 les chiffres se TAPENT, et deux chiffres de plus au clavier ne coûtent ni bloc, ni rangée, ni geste supplémentaire à qui n'en veut pas. « 7 h 30 » est une préférence ordinaire ; refuser de l'écrire au motif d'un argument qui visait autre chose, c'était laisser un raisonnement survivre à son objet. (a) LE MODÈLE. Réglage `frameMin`, 0 à 59, défaut 0 — un réglage EXISTANT vaut donc exactement ce qu'il valait, aucune version n'est réinterprétée, et `loadSettings` étale déjà les défauts sur le JSON stocké, il n'y a pas de migration à écrire. `frameMins()` rend l'heure dite en minutes, et c'est le SEUL endroit où la comparaison est écrite : `maybeOpenFrame` lit désormais heures x 60 + minutes des deux côtés. Deux notions de « l'heure dite » auraient été le doublon que ce fichier passe son temps à payer, et celui-là aurait été invisible tant que les minutes valent zéro — le pire des doublons, celui qui attend. (b) DEUX TRAVÉES, UN SEUL CÂBLAGE. Les champs n'ont que trois choses à eux : leur borne haute, le réglage qu'ils écrivent, le champ vers lequel ils passent la main. Tout le reste — sélection à l'entrée, filtrage à `beforeinput`, validation, Échap, champ vidé qui rend la valeur d'avant — est écrit UNE fois et posé deux. Un second bloc recopié se serait vu au premier correctif, appliqué d'un côté et pas de l'autre. (c) LE SEUIL DE VALIDATION N'EST PLUS UN NOMBRE ÉCRIT À LA MAIN. Il se DÉDUIT de la borne : un premier chiffre au-delà de la dizaine maximale ne peut plus être une dizaine, il vaut donc pour lui-même. 3 pour les heures (23), 6 pour les minutes (59), et la règle se réénoncerait seule sur une troisième travée. C'est celle des sélecteurs d'heure natifs, et elle économise un appui sur deux. (d) LA MAIN SE PASSE, MAIS PAS N'IMPORTE QUAND. Deux chiffres tapés dans les heures amènent aux minutes, clavier levé, tout sélectionné — le geste attendu de n'importe quel champ d'heure. Le passage n'a lieu QUE sur une validation au CLAVIER : sortir en touchant ailleurs ne doit pas rouvrir un champ que personne n'a demandé, et c'est la distinction que la version tient à ne pas rater. (e) LES FLÈCHES NE TOUCHENT QUE L'HEURE, ET C'EST DEMANDÉ. Elles servent au voisin immédiat — lever le clavier pour passer de 7 h à 8 h coûterait plus que le pas économisé — pendant que les minutes, qu'on ne parcourt pas une à une, restent au clavier. Elles laissent les minutes intactes, bouclent 23 -> 0 comme une horloge, et gardent la répétition à l'appui long. (f) DEUX CHANGEMENTS DE FORME QUI SONT DES CORRECTIONS DE NOM. `.stpm` devient `.stpc` : la classe voulait dire « minutes », les minutes sont maintenant un champ, et ce qui reste sous ce nom n'est plus qu'un deux-points. Garder le mot aurait fabriqué exactement la dette que ce fichier traîne sous `.tall`, un nom qui décrit autre chose que ce qu'il fait. Et la marque de saisie descend du GROUPE au CHAMP : avec deux travées, allumer le groupe entier ne dirait plus laquelle reçoit la frappe, or c'est la seule chose qu'on ait besoin de savoir à cet instant. Fond et liseré, sans retrait ajouté — une cote qui changerait au focus ferait danser le contrôle à chaque passage d'un champ à l'autre. Vérifié : banc jsdom sur le vrai app.js, storage en mémoire, feuille Réglages rendue en entier. Les deux champs se saisissent et pas le deux-points ; « 30 » dans les minutes écrit `frameMin` sans toucher `frameHour`, et réciproquement ; deux chiffres dans les heures passent la main aux minutes, un flou ne la passe PAS ; « 9 » validé seul dans les heures (>= 3) mais ATTENDU dans les minutes (< 6), ce qui est le coeur du (c) et échoue sur tout seuil écrit en dur ; « 75 » ramené à 59 et « 99 » à 23 ; champ vidé qui rend la valeur d'avant, des deux côtés ; Échap qui restitue l'heure ET les minutes ; les flèches qui bouclent 23 -> 0 -> 23 en laissant les minutes intactes ; `frameMins()` contrôlé sur 07:00, 07:30 et 23:59 ; le seuil de `maybeOpenFrame` comparé aux deux bords d'une minute — s'abstient à 07:29, sert à 07:30, ce qui échoue sur la v2.98 dont la comparaison ne connaissait que les heures ; `frameMin` absent des réglages stockés rendu à 0 ; valeur négative, à 99, non entière, bornées. Ce que ça NE RÈGLE PAS. La relecture reste un INTERVALLE d'une minute et non un branchement sur l'horloge : le cadre peut arriver jusqu'à soixante secondes après l'heure dite. C'était déjà vrai en v2.97, c'était sans importance à l'heure ronde, et ça devient VISIBLE maintenant qu'on peut demander 7 h 30 — régler 7 h 31 pour un cadre à 7 h 30 n'aurait aucun sens, mais il faut savoir que la seconde n'est pas tenue. Rien d'autre ne change au fond : si tu n'ouvres pas l'app après l'heure il n'y a pas de cadre, aucun réglage ne peut y faire, seule une notification le pourrait ; le seuil ne rattrape pas le cadre d'hier ; reposer une heure déjà passée depuis les Réglages ne sert pas dans la seconde, `maybeOpenFrame` s'abstient sous une couche. Et jsdom ne calcule aucune mise en page : l'alignement des trois travées est un diagnostic, pas une mesure, il se juge au pouce. Restent ouverts, inchangés : `maybeWake`/`openWake`/`wakeItems` morts sans appelant ; `enterDormant()` force le mode sélection ; la hauteur du bandeau Vue sur Collection ; l'empilement `.pinnedrow` + bandeau + `.fstate` ; « Remonte en surface » lit `mutedCats` à l'envers ; « Une date précise » en `input[type=date]` natif ; le champ URL qui ne se replie plus ; le repli local des items (dette v2.66) ; l'image propre d'une catégorie neuve ; `.tall` qui porte une typographie sous un nom de hauteur ; les trois champs de la capture toujours en `input`, donc toujours porteurs de la barre d'auto-remplissage. À remplacer : app.js, styles.css et sw.js, cache v91 -> v92. index.html n'est PAS touché.
   v3.00 — L'HEURE REPOSÉE NE POUVAIT RIEN SERVIR LE JOUR MÊME. Rapport au pouce : « j'ai beau changer l'heure de la remontée, je ne vois jamais le bandeau s'ouvrir ; je mets 14 h 47, quand arrive l'heure ça ne fonctionne pas ». Le réglage était juste, la comparaison de la v2.99 était juste, et pourtant rien ne pouvait arriver : le seuil horaire est testé APRÈS le verrou du jour servi. (a) LA CAUSE, ET POURQUOI ELLE ÉTAIT INVISIBLE À LA LECTURE. `maybeOpenFrame` sort à sa deuxième ligne dès que `settings.frameDay` vaut aujourd'hui. Or le cadre du matin, reçu à l'heure par défaut — ou un simple tap sur l'enveloppe, qui vaut « vu » depuis la v2.84 — a déjà écrit ce jour. Reposer 14 h 47 à 14 h 45 ne rencontrait donc jamais le test de l'heure : la journée était consommée depuis 7 h. Le commentaire de `put` promettait pourtant, mot pour mot depuis la v2.99, que « reposer une heure DÉJÀ passée doit pouvoir servir le jour même » — il décrivait un chemin que le verrou fermait deux lignes plus haut. Aucun banc ne l'a vu parce que tous partaient d'un `frameDay` vide : ils vérifiaient le seuil sur une journée NEUVE, c'est-à-dire dans le seul état où le défaut ne se produit pas. (b) CE QUI CHANGE : POSER UNE HEURE ENCORE À VENIR REND LA JOURNÉE. `rearmFrame()` efface le jour servi si et seulement si le nouveau seuil est encore DEVANT nous, et il est appelé par `put`, donc par les deux champs et par les deux flèches. La règle ne rend que ce qui n'a pas encore eu lieu : poser une heure DÉJÀ passée ne réarme rien de force — elle retombe dans la sémantique ordinaire du seuil, « à la première ouverture après l'heure dite », qui est la promesse de la v2.97 et ce que le libellé dit toujours. L'ordre de frappe n'a aucune importance puisque la règle est réévaluée sur la valeur COMPLÈTE à chaque écriture : taper 14 puis 47 réarme au second chiffre, taper 47 puis 14 réarme au second aussi. Et la fonction n'enregistre PAS : `put` pose les trois valeurs d'un seul `saveSettings`, sinon on écrirait le réglage deux fois par frappe. (c) UN SECOND DÉFAUT, TROUVÉ EN CHERCHANT LE PREMIER, ET CELUI-LÀ FERMAIT LA PORTE À VIE. La garde `if(layers.length)return` comptait la couche « tab » — qui n'est pas une couche posée par-dessus l'écran mais l'écriture de la v2.44 pour que le retour ramène à l'onglet de départ, donc présente EN PERMANENCE dès qu'on n'est pas sur cet onglet-là. Une installation dont l'onglet de départ est « Ma pile », ou « Dernier onglet » retombé dessus, empilait « tab » en arrivant sur Collection : le cadre n'avait alors plus aucune occasion de s'ouvrir, aucun jour, jamais, et le réglage de l'heure y était parfaitement sans effet. On ne s'efface plus que devant ce qui occupe vraiment l'écran. C'est le suspect que la v2.97 avait laissé debout faute de preuve ; il en avait une, elle était juste ailleurs que là où je la cherchais. (d) DEUX LATENCES RÉDUITES, ET AUCUNE N'EST UN MINUTEUR. La relecture passe de 60 s à 15 s : « à 14 h 47 » devient au pire 14 h 47 et quinze secondes au lieu d'une minute pleine, pour quatre comparaisons par minute au lieu d'une — le corps sort à sa deuxième ligne une fois le jour servi. Et revenir sur Collection relit l'heure tout de suite, ce qui ne pouvait pas fonctionner tant que (c) tenait. Le refus du `setTimeout` calé sur l'heure dite est inchangé et vaut d'être redit : il ne survit ni à la veille, ni à un changement d'heure, ni à une reprise. Vérifié : banc jsdom sur le vrai index.html et le vrai app.js, storage en mémoire, horloge pilotée, 23 assertions dont HUIT échouent sur le dépôt d'avant. Le parcours signalé en entier — cadre reçu à 7 h 30, seuil reposé à 14 h 47 à 14 h 45, silence à 14 h 45 et à 14 h 46, cadre à 14 h 47, plus rien à 14 h 50 ; seuil reposé à 06:00 à 16 h qui ne réarme pas et n'ouvre rien ; les deux ordres de frappe, avec l'abstention à 09:29 et le service à 09:30 ; couche « tab » seule qui n'empêche plus rien, vraie feuille qui s'abstient toujours SANS manger le jour et qui sert dès qu'elle est refermée ; le lendemain qui repart. Ce que ça NE RÈGLE PAS. La règle du (b) ne rend la journée que si le seuil est à venir : régler une heure déjà passée pour « rattraper » le cadre du matin ne le rattrapera pas, et c'est voulu — sinon le cadre s'ouvrirait à la seconde où l'on referme les Réglages, ce que personne n'a demandé. La relecture reste un INTERVALLE et non un branchement sur l'horloge : quinze secondes de retard possible, et régler 14 h 46 pour un cadre à 14 h 47 n'aurait aucun sens. Le fond ne bouge pas d'un pouce : SI TU N'OUVRES PAS L'APP APRÈS L'HEURE, IL N'Y A PAS DE CADRE — aucun réglage ne peut y faire, seule une notification le pourrait ; le seuil ne rattrape pas le cadre d'hier ; et le cadre ne vit que sur Collection. Restent ouverts, inchangés : `maybeWake`/`openWake`/`wakeItems` morts sans appelant ; `enterDormant()` force le mode sélection ; la hauteur du bandeau Vue sur Collection ; l'empilement `.pinnedrow` + bandeau + `.fstate` ; « Remonte en surface » lit `mutedCats` à l'envers ; « Une date précise » en `input[type=date]` natif ; le champ URL qui ne se replie plus ; le repli local des items (dette v2.66) ; l'image propre d'une catégorie neuve ; `.tall` qui porte une typographie sous un nom de hauteur ; les trois champs de la capture toujours en `input`, donc toujours porteurs de la barre d'auto-remplissage. À remplacer : app.js et sw.js, cache v92 -> v93. index.html et styles.css ne sont PAS touchés.
   v3.01 — LE CADRE MONTRAIT ENCORE LA CARTE QU'ON VENAIT DE GARDER, ET LE JOURNAL AVAIT PERDU SON ORDRE. Rapport au pouce, deux captures à l'appui : « je viens de m'occuper de la remontée, j'ai passé toute la liste, l'écran dit c'est fait pour aujourd'hui — et de retour dans mes catégories le bandeau montre encore le dernier item, celui que j'avais pourtant gardé ». (a) LA CAUSE : UN SEUL DES QUATRE GESTES NE REPEINT PAS LE CADRE. Depuis la v2.88, « Garder en pile » n'attend plus l'écriture et ne rend que la scène et les pastilles — à dessein, le geste n'écrit qu'une comptabilité que personne ne regarde. Les trois autres (classer, mettre de côté, jeter) passent par `renderAll`, qui rend le cadre au passage. Terminer le rituel par un « Garder » — c'est-à-dire le terminer normalement, puisque c'est le geste par défaut — laissait donc dans le DOM les vignettes construites AVANT le rituel, et `closeRemontee` ne repeignait que les pastilles. Le cadre n'était pas en retard d'un état : il était resté au sien. Le défaut se voit d'autant mieux que le rituel est bien fait, ce qui est le pire des signaux. (b) CE QUI CHANGE : ON REPEINT À LA SORTIE, PAS À CHAQUE GESTE. `closeRemontee` appelle `renderRiseFrame`. C'est le seul point que les quatre gestes traversent tous — le même raisonnement qu'`advance` en v2.82 — et il couvre trois parcours d'un coup : le rituel soldé, le rituel abandonné en cours (le cadre montre alors ce qui reste, dans l'ordre restant), et le réordonnancement de `riseOpenAt`, qui déplace une vignette en tête de séquence sans que rien ne le redise ensuite. Ajouter le rendu dans `keepCard` aurait été le doublon habituel, et il aurait peint un cadre caché sous la surface plein écran. (c) UNE TROISIÈME VÉRITÉ DANS LE CADRE, exactement celle que l'écran de fin a reçue en v2.82. Un tirage SOLDÉ n'est pas un tirage vide : le cadre ne dit plus « Rien ne remonte aujourd'hui » à quelqu'un qui vient de passer sa sélection en revue, il dit « C'est fait pour aujourd'hui » et la date de la prochaine. Le test n'est pas `riseTotal()`, qui retombe à zéro dès qu'on a tout archivé, mais l'existence du tirage DU JOUR — un fait qui ne dépend d'aucun statut d'item. Un jour sans tirage garde sa phrase d'explication, inchangée. (d) LE JOURNAL EST REMIS EN ORDRE. Les entrées v2.38 à v3.00 avaient été empilées à l'ENVERS, la plus récente en tête, au milieu d'un fichier qui lit du plus ancien au plus récent depuis la v1.0 : deux sens de lecture dans un même bloc, et l'œil ne sait plus si le numéro qu'il cherche est au-dessus ou en dessous. Ordre croissant partout, aucune ligne réécrite, aucune supprimée. Vérifié : banc jsdom sur le vrai index.html et le vrai app.js, storage en mémoire, 11 assertions dont QUATRE échouent sur le dépôt d'avant — cadre à deux vignettes au départ, rituel mené à son terme par deux « Garder », écran de fin affiché, `riseFrameIds()` à zéro, puis après fermeture : aucune vignette dans le cadre, aucune rangée, la phrase « c'est fait pour aujourd'hui » et l'absence de « rien ne remonte » ; abandon après une carte sur trois, qui laisse EXACTEMENT les deux bonnes vignettes et dans le bon ordre (c'est celle-là qui prouve que le cadre est recalculé et non simplement vidé) ; dernière carte mise de côté ; et un jour sans tirage qui conserve sa raison. Ce que ça NE RÈGLE PAS. Le cadre ne se REPLIE pas tout seul quand le rituel est fini : il reste déployé s'il l'était, avec sa ligne « c'est fait » et son pied « N à ranger », et c'est voulu — le pied reste utile, et refermer sous le doigt un objet qu'on vient de quitter serait un mouvement que personne n'a demandé. `currentCardId` continue d'avancer `batch.idx` par-dessus les items disparus SANS `saveBatch` : rien ne se perd, la position se recalcule au rendu suivant, mais l'écriture n'est pas là où on la croirait. Et rien ne change au tirage lui-même. Restent ouverts, inchangés : `maybeWake`/`openWake`/`wakeItems` morts sans appelant ; `enterDormant()` force le mode sélection ; la hauteur du bandeau Vue sur Collection ; l'empilement `.pinnedrow` + bandeau + `.fstate` ; « Remonte en surface » lit `mutedCats` à l'envers ; « Une date précise » en `input[type=date]` natif ; le champ URL qui ne se replie plus ; le repli local des items (dette v2.66) ; l'image propre d'une catégorie neuve ; `.tall` qui porte une typographie sous un nom de hauteur ; les trois champs de la capture toujours en `input`. À remplacer : app.js et sw.js, cache v93 -> v94. index.html et styles.css ne sont PAS touchés.
   v3.02 — CHANTIER : L'AXE « VOIR EN » DE COLLECTION SE REFORMULE. CARTES À LARGEUR RÉGLABLE, MOSAÏQUE, LISTE — ET LE COMPACT MEURT. Rapport au pouce, deux captures à l'appui : « les affichages liste et compact sont très proches ». Ils l'étaient : le compact de l'index n'était que la liste MOINS son compteur, à 40 px au lieu de 48 — six règles CSS pour une différence que l'œil ne tient pas. Une forme qui ne se distingue pas d'une autre n'est pas une forme, c'est un doublon avec un nom. (a) DEUX AXES, DEUX CONSTANTES. `VIEWS` servait les DEUX onglets, ce qui revenait à jurer que l'index et la pile ont les mêmes formes. Ils ne les ont pas : une mosaïque montre le CONTENU d'une catégorie et un item n'a pas de contenu ; le compact de Ma pile, lui, change vraiment la densité de ses lignes (`dens-dense` contre `dens-confortable`) et il RESTE, intact. `PILE_VIEWS` / `PILE_KEYS` d'un côté, `IDX_VIEWS` / `IDX_KEYS` de l'autre. Le fichier tenait `indexView` et `pileView` séparés depuis le chantier 18 ; la constante rattrape son retard sur le réglage. (b) GRILLE ET CARTES FUSIONNENT EN UNE FORME ET UN RÉGLAGE. « Grille » n'était que « Cartes à deux colonnes » : au lieu de deux entrées qui se ressemblent, une entrée et sa DENSITÉ — 1, 2 ou 3 colonnes, `indexCols`. La couverture passe en 16/9 (elle était en 2/1) et garde ce format AUX TROIS LARGEURS : le cadrage ne dépend pas du nombre de colonnes, sinon changer la densité rechangerait aussi le cadrage de chaque image, deux effets pour un seul geste. (c) OÙ VIT LA LARGEUR — la décision principale, prise sur maquette et pas au jugé. Trois placements essayés en situation, l'écran entier reconstruit avec la vraie chrome : sur la ligne du libellé, sous la pastille « Cartes », en quatrième rangée. Les Réglages ont été ÉCARTÉS malgré le précédent de `peekSize` : un aperçu de catégorie est caché dans un tiroir qu'on ne regarde pas, la largeur des cartes n'a QUE la liste comme retour, et une feuille venue du bas couvre exactement ce qu'on règle. Retenu : SOUS LA PASTILLE. La sous-rangée reprend la grille de `.seg` — trois colonnes 1fr, même gouttière, même retrait, bord compris — donc le sélecteur tombe exactement sous « Cartes » et se lit comme une précision de ce bouton-là, pas comme un axe de plus. Elle n'a PAS de libellé : elle ne nomme rien de neuf, et sous un tiers d'écran un mot plus trois cibles ne tiennent pas ensemble. Des CHIFFRES et non un dessin : trois glyphes de grille de hauteurs différentes se lisent comme trois objets, et leur donner la même empreinte les rendait muets sur ce qu'ils changent — essayé, montré, écarté. Cote visible 24 px, cible à `--tap` par SOUSTRACTION (`calc((24px - var(--tap)) / 2)`), la mécanique de `.chip::before` posée en v2.70. (d) LA MOSAÏQUE, ET CE QU'ELLE MONTRE. Elle prend la carcasse de la LIGNE — papier nu, filet dessous, gouttière du ⋯ à droite — et non celle d'une carte : deux formes calmes ne doivent pas parler deux langues. Elle ajoute trois vignettes de 30 px qui ne se regardent pas mais se comptent. Ce sont les items les plus récents QUI ONT UN VISUEL, jamais simplement les plus récents : une catégorie de notes montrerait trois carrés de couleur et la forme ne servirait plus à rien. Le test du visuel est celui de `catCover` — ni deux définitions, ni deux résultats. Trois fentes, trois vérités : une vignette quand un item visuel la remplit, un aplat teinté quand la place correspond à un item sans image, un cadre EN POINTILLÉ au-delà du compte — le pointillé dit « à poser » partout ailleurs dans ce fichier. Pas de chevron : les vignettes disent déjà ce qu'il y a dedans, un tiroir sous une preuve de contenu serait la même chose dite deux fois. (e) L'INTERRUPTEUR PROVISOIRE EST SOLDÉ, comme la v2.43 s'y était engagée — « c'est un banc dans l'app, pas un réglage ». Verdict : les trois lentilles héritent des trois formes. `idxAllForms` quitte le code ET le stockage (`settings` se recharge par étalement, une clé sans lecteur serait réécrite à chaque `saveSettings()` — leçon v2.80), la ligne des Réglages disparaît avec son handler, et `allForms`, `galleryAllowed` et `effIndexView` sont supprimées : la forme effective EST `indexView`, et une fonction qui rend son argument est une dette de lecture. Trois endroits lisaient `indexView` BRUT là où les autres lisaient `effIndexView()` — catNodeHTML, repaintCatNodes, la punaise ; l'incohérence ne mordait pas (elle ne concernait que les catégories, où la galerie était toujours permise) mais elle dormait. (f) LA MIGRATION NE CHANGE RIEN À L'ÉCRAN, ET C'EST LE POINT. `indexView:"grid"` devient « Cartes » à DEUX colonnes, c'est-à-dire exactement le rendu d'hier : on ne migre pas vers un défaut plus beau, on migre vers l'identique. `"compact"` retombe en liste, la forme dont il n'était que la version serrée. Le bloc tourne dans `loadSettings` avec ses listes écrites EN CLAIR, comme la v2.38 l'impose — un code de migration ne cite pas une constante définie mille lignes plus bas. `pileView` n'est pas touché. (g) LA LARGEUR NE REDESSINE RIEN. Elle repose un attribut `data-cols` sur le conteneur et le CSS fait le reste : aucun nœud remplacé, le défilement ne bouge pas. Piège évité de justesse, et il a coûté une maquette : la grille lisait d'abord sa largeur dans une variable CSS que le JS ne posait jamais, elle retombait donc sur sa valeur de repli et le réglage paraissait mort alors que le bouton s'allumait bien. La largeur se lit sur l'ATTRIBUT, celui que le code pose vraiment. (h) LE ⋯ DE LA CARTE MAIGRIT, ET C'EST LA MÊME COTE AUX TROIS LARGEURS : 36 px mangeaient un tiers d'une carte à trois colonnes, mais deux cotes selon la largeur auraient rendu un contrôle plus petit « parce qu'il y a moins de place », c'est-à-dire pour une raison qui ne le concerne pas. 28 px partout, cible à 48 par soustraction. Vérifié : banc jsdom sur le vrai app.js et le vrai index.html, storage en mémoire, 35 assertions — les deux constantes séparées, les quatre chemins de migration (grid, compact, largeur absurde, valeurs déjà justes) plus le pileView épargné, le sélecteur de largeur (trois cibles, la courante marquée, des chiffres, aucun libellé), le bandeau qui garde le MÊME nombre de rangées nommées sous les trois formes et ne gagne sa sous-rangée que sous Cartes, les trois formes offertes aussi aux Tags, les trois carcasses (.ccard sans chevron, .mrow sans chevron mais avec sa gouttière, .crow avec le sien), les trois vérités d'une fente de mosaïque sur trois corpus (deux visuels + une note, deux notes, catégorie vide), les aperçus refermés au passage en mosaïque, les deux attributs posés sur le conteneur, la largeur mémorisée et une largeur hors barème refusée. Le banc s'arrête net sur le dépôt d'avant : six assertions rouges puis `colsSubrowHTML` introuvable. CE QUE ÇA NE RÈGLE PAS. La sous-rangée APPARAÎT ET DISPARAÎT : passer de Cartes à Liste fait sauter le bandeau d'environ 30 px sous le doigt. C'est le prix de l'ancrage sous la pastille, il a été mesuré sur maquette et préféré aux ~55 px d'une quatrième rangée — mais aucun banc ne dit si le pouce le pardonne. Le bandeau garde donc ses trois rangées nommées et la dette de la v2.69 n'est pas soldée, seulement pas aggravée. La mosaïque appelle `idxItemsFor` PAR LIGNE sur les lentilles Tag et Source : c'est un balayage de la pile par entrée, sans effet visible sur un corpus ordinaire mais linéaire en items × entrées, et personne ne l'a chronométré. À trois colonnes, une couverture 16/9 fait environ 62 px de haut et le blason y occupe beaucoup : à juger au pouce, aucun banc ne le voit. Le vivier `catCovers` n'est pas relu ici : une catégorie neuve reste sans image propre. Restent ouverts, inchangés : `maybeWake`/`openWake`/`wakeItems` morts sans appelant ; `enterDormant()` force le mode sélection ; l'empilement `.pinnedrow` + bandeau + `.fstate` ; « Remonte en surface » lit `mutedCats` à l'envers ; « Une date précise » en `input[type=date]` natif ; le champ URL qui ne se replie plus ; le repli local des items (dette v2.66) ; `.tall` qui porte une typographie sous un nom de hauteur ; les trois champs de la capture toujours en `input`. À remplacer : app.js, styles.css et sw.js, cache v94 → v95. index.html n'est PAS touché.
   v3.03 — UNE ZONE MORTE SUR LE BOUTON DE LA FICHE, APRÈS UN PARTAGE. Rapport au pouce, capture vidéo à l'appui : on partage un lien depuis une autre app, la fiche de l'item s'ouvre, et le bouton du pied — « À jour » ou « Enregistrer » — ne répond pas. Pas partout : à gauche il répond, au milieu-droit il ne répond pas. (a) LA CAUSE, MESURÉE SUR LA VIDÉO. Trois appuis successifs allument un rectangle bleu de surbrillance TOUJOURS AU MÊME ENDROIT — 582 à 735 px appareil, 2080 à 2175 — soit un élément en `position:fixed` de 56 x 35 px CSS, ancré à 13 px du bas de la vue, posé PAR-DESSUS le bouton. Le quatrième appui, à 425 px, tombe hors de ce rectangle : la feuille se ferme dans l'image qui suit. Ce n'est donc pas le bouton qui est sourd, c'est autre chose qui prend le tap. Cet autre chose est le mot « classer » du toast « Item ajouté. », émis par `addItem` au moment du partage. Le toast s'efface au bout de 4,6 s en perdant sa classe `.show`, ce qui le rend transparent — mais `#toast` est un `position:fixed` à 26 px du bas qui n'est JAMAIS VIDÉ, et la v2.52 avait posé `pointer-events:auto` sur `#toast .u` sans le conditionner à `.show`. Le corps du toast reste inerte, comme voulu ; le mot, lui, garde ses événements pour toujours. Le calcul recolle à deux pixels près : toast centré, « Item ajouté. » puis 10 px de marge, le mot commence à 213 px CSS — le rectangle mesuré commence à 211. (b) POURQUOI ÇA NE SE VOIT QU'APRÈS UN PARTAGE. Il faut un toast À ACTION (« classer », « voir », « annuler ») SUIVI d'une surface qui pose un bouton à cette hauteur exacte. Le partage est le seul parcours qui enchaîne les deux tout seul : `addItem` toaste, `afterShare` ouvre la fiche par-dessus, et le pied de la fiche vient se garer sous le fantôme. En capture manuelle, le toast est le dernier mot du geste et rien ne se pose dessus ; le défaut existait depuis la v2.52, il n'avait simplement personne à gêner. (c) CE QUI CHANGE. `#toast.show .u{pointer-events:auto}` : le mot ne reprend les événements que tant que le toast est VISIBLE. La règle suit désormais ce que l'œil voit, ce qui était l'intention de la v2.52 et non ce qu'elle avait écrit. Et `toast()` VIDE son nœud 400 ms après l'effacement — au-delà des 280 ms de la transition d'opacité, donc jamais sur un toast encore en train de se fondre. La règle CSS suffirait ; on retire quand même le nœud, parce qu'un `position:fixed` qui traîne en bas d'écran est une cible en attente d'une règle distraite. Jeton de séquence obligatoire, sinon la purge d'un toast expiré effacerait celui qui l'a remplacé entre-temps — c'est le motif de toutes les mécaniques minutées de ce fichier. Vérifié : banc jsdom sur le vrai app.js et le vrai index.html, storage en mémoire. Le mot d'action existe et porte son `onclick` tant que `.show` est là ; il a disparu après l'expiration ; `#toast` est vide et ne contient plus aucun `.u` ; un second toast émis pendant le délai de purge du premier n'est PAS effacé ; le toast sans action ne laisse rien non plus ; l'action reste appelée quand on tape le mot. Sur le dépôt d'avant, l'assertion « plus aucun `.u` après expiration » échoue — les deux sens sont joués. Et lecture directe de styles.css : `pointer-events:auto` n'apparaît plus que sous `#toast.show`. CE QUE ÇA NE RÈGLE PAS. Un banc ne mesure aucune géométrie : jsdom ne calcule pas de mise en page, il ne peut pas dire qu'un élément en recouvre un autre. La démonstration est la vidéo et le calcul, pas le banc — que le bouton réponde partout reste à juger au pouce, en repartageant un lien. Le toast continue de flotter à 26 px du bas PENDANT qu'il s'affiche : si une feuille pose un bouton là et qu'un toast à action est levé au même instant, le mot est légitimement devant et il prendra le tap. C'est le comportement voulu, pas le défaut corrigé ; si ça gêne à l'usage, la réponse est de remonter le toast au-dessus du pied des feuilles, pas de lui reprendre ses événements. Restent ouverts, inchangés : `maybeWake`/`openWake`/`wakeItems` morts sans appelant ; `enterDormant()` force le mode sélection ; la hauteur du bandeau Vue sur Collection ; l'empilement `.pinnedrow` + bandeau + `.fstate` ; « Remonte en surface » lit `mutedCats` à l'envers ; « Une date précise » en `input[type=date]` natif ; le champ URL qui ne se replie plus ; le repli local des items (dette v2.66) ; l'image propre d'une catégorie neuve ; `.tall` qui porte une typographie sous un nom de hauteur ; les trois champs de la capture toujours en `input`. À remplacer : app.js, styles.css et sw.js, cache v95 -> v96. index.html n'est PAS touché.
   v3.04 — LE TITRE LONG, COUPÉ À LA SOURCE. ENTRÉE ÉCRITE RÉTROACTIVEMENT (voir v3.05, ticket #23) : la livraison du 13/08/2026 a posé ses marqueurs `v3.04` dans app.js et dans styles.css, mais n'a bumpé ni `APP_VERSION` ni écrit sa ligne ici — le miroir exact de l'oubli confessé en v2.51, qui avait bumpé le numéro sans écrire le journal. Ce qui a été livré, en deux temps le même jour. (a) LA DÉCOUPE. Une capture Instagram rapporte la LÉGENDE ENTIÈRE dans le champ titre : 9 titres au-delà de 150 caractères sur la vraie pile, jusqu'à 1301. Et `displayText()` alimente les listes, l'index, la recherche ET la remontée — un titre de 1301 caractères ne pollue donc pas la fiche, il pollue l'app entière. `splitLongTitle()` coupe à la première unité de sens ; `body`, champ NOUVEAU initialisé à `null` par `normalizeItem` (coût de migration nul : les items sont un seul blob JSON, une clé de plus n'est qu'une clé de plus), reçoit le texte d'origine ENTIER, préfixe d'auteur compris — on garde le tout, pas le reste, sinon un titre retouché à la main rendrait la légende irrécupérable. La règle a été corrigée TROIS fois, chaque fois par un contre-exemple des vraies données : frontière cherchée AVANT d'aplatir les sauts de ligne (dans une légende, le retour à la ligne EST souvent la seule fin de phrase) ; saut de ligne et fin de phrase mis à ÉGALITÉ, la plus proche gagne ; seuil `MIN=15` et découpe réservée aux légendes sociales ou aux titres de plus de 90 caractères, faute de quoi « Great. Street musicians in Munich » devenait « Great. ». La traîne de hashtags part aussi — testée avant d'être intégrée : elle améliore 4 titres et n'en abîme aucun. Le piège traité : `body` entre dans les DEUX filtres (recherche globale et filtre de Ma pile), sans quoi la découpe serait une PERTE. Affichage en `details` natif, replié, non modifiable — c'est le texte rapporté par la capture, pas celui de l'utilisateur — et sa zone tactile est passée de 19 px à `--tap`. (b) LA RÉPARATION DE L'EXISTANT, ajoutée après coup parce que regarder la liste a tranché autrement que raisonner. La pile vit derrière une connexion : personne ne peut la réparer de l'extérieur, on livre donc le BOUTON et c'est son propriétaire qui l'actionne — Réglages, Données, « Raccourcir les titres importés ». La ligne n'apparaît que s'il y a à faire et disparaît une fois passée ; `repairTitles(true)` rend la liste sans rien écrire, ce qui permet d'annoncer un compte ET trois exemples avant/après dans le `confirm()` natif ; `body` est écrit AVANT le titre et n'écrase jamais un `body` existant ; `saveItems()` est attendu avant toute annonce (leçon v2.66) ; l'opération est idempotente. Mesuré dans le proto local sur la vraie pile, jamais sur les données en ligne : 1301 -> 88 caractères, 9 titres de plus de 150 -> 0, 23 items touchés, 20 ayant gagné un « Texte d'origine », et rien de perdu — vérifié par la recherche sur des mots partis du titre. Compte rendu complet, liste de contrôle et non-vérifiés compris : docs/compte-rendu-ticket-f-titre-long.md. À remplacer, à l'époque : app.js, styles.css et sw.js, cache v99 -> v100.
   v3.05 — LE NUMÉRO DE VERSION AVAIT CESSÉ DE SUIVRE LES LIVRAISONS, ET SEPT TICKETS SONT PASSÉS SOUS UN NUMÉRO IMMOBILE. Rapport (ticket #23) : « il y a eu plein de tickets traités dans le suivi récemment, et je remarque que le numéro de version dans l'app n'a pas changé. Est-ce parce que l'application n'a pas été réactualisée, ou c'est un oubli ? ». C'est un oubli. Il est DOUBLE, et aucune des deux moitiés n'est un accident : chacune vient d'une propriété du dispositif. (a) PREMIÈRE MOITIÉ — UNE LIVRAISON QUI A ÉCRIT SON NUMÉRO PARTOUT SAUF LÀ OÙ IL SE LIT. Le ticket F (13/08/2026) a semé cinq marqueurs `v3.04` dans app.js et un dans styles.css, bumpé le cache du worker v99 -> v100 — et laissé `APP_VERSION` à « v3.03 », sans ligne de journal. Le code annonçait donc une version que l'écran des Réglages n'a jamais affichée, et que ce journal ne connaissait pas : trois sources, deux vérités. L'entrée v3.04 ci-dessus répare ce trou, et elle est marquée rétroactive parce qu'une entrée qui ne dit pas qu'elle a été écrite après coup est une entrée à laquelle on ne peut plus se fier. (b) SECONDE MOITIÉ — SIX TICKETS QUI NE POUVAIENT PAS, MÉCANIQUEMENT, BOUGER LE NUMÉRO. #9 et #10 (la rampe de texte et le bouton primaire passent AA : `--text-2`, `--text-3` et `--accent` réespacés dans les deux thèmes), #11 (Geist auto-hébergée, quatre woff2 dans fonts/, plus aucun appel à Google Fonts — donc une typo qui survit hors ligne), #13 (l'accent lisible sur sa propre pastille, token `--accent-deep`), #15 (l'accent ne peint plus JAMAIS de lettres : un seul token qui tient AA sur les quatre fonds, 40 règles basculées), #14 (la coquille servie hors ligne EN ENTIER : la garde `endsWith` qui interceptait tout GET de même origine, `SHELL` qui ne citait ni styles.css ni app.js, et le passage en réseau d'abord). Ils ont touché styles.css, styles-desktop.css, desktop-v2.css, desktop-fiche.css, index.html, sw.js et fonts/ — et JAMAIS app.js. Or `APP_VERSION` est une constante d'app.js. Un déploiement qui ne touche pas ce fichier ne peut pas bouger le numéro, quelle que soit la quantité de code réellement servie : l'oubli n'est pas de la distraction, c'est la conséquence de l'endroit où vit la constante. (c) LA RÉPONSE À LA QUESTION POSÉE : CE N'EST PAS UN DÉFAUT DE FRAÎCHEUR. Depuis #14 la coquille est en RÉSEAU D'ABORD, chaque réponse valide rafraîchissant sa copie de cache. Un visiteur en ligne a donc bien reçu le CSS neuf de #13 et de #15 pendant que les Réglages continuaient d'annoncer v3.03. Le numéro ne mentait pas sur le cache — il mentait sur lui-même, ce qui est pire, puisque son unique usage est de dire « la nouvelle version est bien servie ». Rien n'est à réactualiser : ce qui est en ligne est à jour, c'est l'étiquette qui était en retard. (d) DEUX ÉTIQUETTES FAUSSES DANS styles.css, trouvées en cherchant celle-ci. Les blocs de commentaire de #13 et #15 se datent « v2.92 » et « v2.93 » — deux numéros qui EXISTENT déjà et qui désignent, dans ce journal, la sonde et le diagnostic de la barre d'auto-remplissage de Chrome, en août. Un lecteur de styles.css daterait donc `--accent-deep` de six semaines avant son écriture. Ils citent désormais leur TICKET (#13, #15) au lieu d'un numéro de version : un numéro de ticket ne peut pas entrer en collision avec un autre, et il reste vrai même si la numérotation des versions dérive à nouveau. (e) CE QUE FAIT CETTE VERSION, ET CE QU'ELLE REFUSE DE FAIRE. Elle écrit l'entrée v3.04 manquante, porte `APP_VERSION` à v3.05 et range les six tickets du (b) sous CE numéro. Elle NE les rejoue PAS en six numéros rétroactifs : chacun de ces déploiements a réellement été servi sous v3.03, fabriquer v3.05 à v3.10 après coup donnerait six repères que personne n'a jamais vus à l'écran — or un journal dont les numéros ne correspondent à rien de servi ne sert plus à vérifier quoi que ce soit. Un numéro, six tickets nommés, c'est ce qui s'est passé. (f) LA RÈGLE QUI EMPÊCHE LA RÉCIDIVE, et pourquoi elle est écrite dans CLAUDE.md plutôt qu'ici. Elle est courte : le bump suit le DÉPLOIEMENT, pas le fichier app.js — une livraison de CSS pur bumpe quand même, et touche donc app.js pour cette seule ligne plus sa ligne de journal. Elle vit dans les invariants du dépôt parce que c'est le seul texte lu à l'ouverture de chaque session ; l'écrire uniquement dans ce journal la mettrait à la fin d'un bloc de 115 lignes que personne ne relit avant de livrer. Vérifié : `node --check` sur app.js et sw.js après insertion — le bloc de commentaire n'a pas été refermé par accident, aucune entrée ne contient de terminateur ; `APP_VERSION` défini une seule fois, à v3.05, et lu à trois endroits (le bouton « Actualiser l'application », le pied des Réglages, et `desktop.js` qui le pose dans `#dkVer` du rail) ; les six commits relus un par un pour établir qu'aucun ne touche app.js ; `v2.92` et `v2.93` ne subsistent dans styles.css sous aucune forme, et restent intacts dans ce journal où ils désignent les vraies versions d'août. CE QUE ÇA NE RÈGLE PAS. Rien n'est OUTILLÉ : la règle du (f) est écrite, pas vérifiée par une machine. Un prochain oubli reste possible et se verra de la même façon, c'est-à-dire tard et par le pouce. Un crochet de pré-commit refusant un commit qui touche du code servi sans toucher la ligne d'`APP_VERSION` a été envisagé et écarté ici : il vit dans `.claude/`, donc hors du dépôt, donc il ne protégerait que cette machine — à trancher, pas à bricoler dans un ticket de numérotation. `refreshApp()` prérécupère une liste de CINQ fichiers — index.html, app.js, styles.css, icons.svg, sw.js — qui n'est plus la coquille : styles-desktop.css, desktop-v2.css, desktop-fiche.css, onboarding.css, onboarding.js, les trois JS bureau et les quatre fontes n'y sont pas. Sans conséquence, puisque la fonction vide d'abord tous les caches hors partage et que le rechargement refait toutes les requêtes ; mais la liste ment sur ce qu'elle croit couvrir, et elle est le troisième endroit du dépôt qui énumère la coquille après `SHELL` et les balises d'index.html. Non corrigé ici : ce n'est pas le sujet du ticket. Restent ouverts, inchangés : `maybeWake`/`openWake`/`wakeItems` morts sans appelant ; `enterDormant()` force le mode sélection ; la hauteur du bandeau Vue sur Collection ; l'empilement `.pinnedrow` + bandeau + `.fstate` ; « Remonte en surface » lit `mutedCats` à l'envers ; « Une date précise » en `input[type=date]` natif ; le champ URL qui ne se replie plus ; le repli local des items (dette v2.66) ; l'image propre d'une catégorie neuve ; `.tall` qui porte une typographie sous un nom de hauteur ; les trois champs de la capture toujours en `input` ; et, côté suivi, les tickets #12, #16, #17, #18, #19 et #22 de la passe de goût. À remplacer : app.js, styles.css et sw.js, cache v102 -> v103. index.html n'est PAS touché.
   v3.06 — LE BANDEAU NOIR EN HAUT DE L'APP (ticket #24). Rapport : « dans l'app web en ligne v3.05 tout en haut il y a un bandeau noir ou foncé qui cache l'heure, la date etc (qui sont en couleur noire aussi) ». MESURE AVANT DIAGNOSTIC, sur la capture jointe au ticket (945×2048, Android/Samsung, PWA installée, sans barre d'adresse) : le bandeau vaut #14110C aux quatre points relevés — c'est `--bg` SOMBRE au pixel près — pendant que la première ligne de l'app sous lui vaut #F6F2E9, soit `--bg` CLAIR. Les glyphes de l'OS y sont peints en noir, parce que l'OS, lui, est en mode clair. Le défaut n'est donc pas « une couleur mal choisie » : c'est un écran qui rend le thème clair sous une barre d'état qui annonce le thème sombre, et le système qui, ne connaissant que son propre réglage, écrit du noir sur ce noir. (a) LA VRAIE SOURCE, ET POURQUOI ELLE ÉTAIT FAUSSE DEUX FOIS. `manifest.webmanifest` portait `theme_color` et `background_color` à #14110C. En PWA installée sur Android, c'est CE fichier qui peint la barre d'état — le WebAPK fige la valeur, il n'y a pas de barre d'outils de navigateur à recolorer, et les <meta> de la page n'y arbitrent rien de fiable. Les deux valeurs passent au clair, #F7F2E9. Le manifeste n'est volontairement PAS mis en cache par le worker (commentaire en tête de sw.js) : la nouvelle valeur part donc au réseau dès le prochain chargement, sans attendre un bump. (b) LE MÊME DÉFAUT, UN CRAN PLUS BAS, DANS LA PAGE. Les deux <meta name="theme-color"> d'index.html se règlent sur `prefers-color-scheme` — le thème de l'OS. Or le thème rendu est `settings.theme`, réglable dans les Réglages (Auto / Clair / Sombre). Les deux ne coïncident que pour un utilisateur resté en « Auto » ; toute personne ayant choisi Clair sur un OS sombre, ou l'inverse, reproduisait exactement le bandeau du rapport dans un simple onglet. `paintStatusBar()` remet une source unique : après la pose de `data-theme`, il LIT `--bg` sur `document.documentElement` et écrit cette valeur dans les DEUX balises. Rien n'est recopié en JS — styles.css reste seul maître de la palette, conformément à l'invariant des tokens ; changer `--bg` un jour recolore la barre d'état sans qu'on ait à y penser. Les deux balises reçoivent la même valeur plutôt qu'une chacune : ça rend leur `media` inerte après le boot et évite de parier sur l'arbitrage du navigateur, pendant qu'AVANT le boot elles restent la meilleure devinette possible (l'OS, qui est précisément ce que vaut le défaut « auto »). L'appel vit dans `applyTheme()`, seul écrivain de `data-theme` dans tout le dépôt — donc il couvre le démarrage, le bouton de thème de l'en-tête, le sélecteur des Réglages, et le changement de mode de l'OS pour un utilisateur en « auto », sans un seul point d'accroche de plus. (c) POURQUOI `--bg` ET PAS LA COULEUR COMPOSITÉE. En thème sombre, `body::before` pose un halo d'accent (`rgba(216,162,90,.14)`) au CENTRE HAUT de la page, là même où elle touche la barre d'état : la couleur effective du haut du document n'est pas `--bg` mais ~#2F2517. La leçon du banc de contraste (« le fond effectif se composite ») aurait donc pu imposer cette valeur-là. Elle ne s'applique pas ici, et c'est vérifiable en une ligne : `.topbar` est `position:sticky;top:0` avec `background:var(--bg)` OPAQUE — c'est elle, pas le halo, qui occupe la rangée de pixels collée à la barre d'état. La capture le confirme dans l'autre thème : la ligne mesurée juste sous le bandeau vaut bien `--bg` clair. (d) CE QUE ÇA NE TOUCHE PAS. Aucune cote, aucune règle de mise en page, aucun rendu : `theme-color` n'existe que pour la barre d'état du système. Rien au-dessus de 1100 px — les navigateurs de bureau l'ignorent. Aucun champ nouveau, aucune migration : la couleur est dérivée d'un token qui existe déjà. Pour l'enlever : retirer `paintStatusBar()` et son appel, et remettre les deux valeurs du manifeste — deux gestes, aucun autre appelant. NON VÉRIFIÉ, ET IL FAUT LE DIRE. Le correctif n'a PAS été constaté sur le téléphone qui a produit la capture : le harnais local sert la page dans un onglet de bureau, où la barre d'état n'existe pas. Ce qui est vérifié tient dans le banc : `node --check` sur app.js et sw.js, le manifeste toujours du JSON valide, `paintStatusBar()` appelé une fois et par le seul écrivain de `data-theme`, et surtout la valeur écrite RELEVÉE dans les deux thèmes en passant par `settings.theme=…; applyTheme();` — jamais par `setAttribute` sur `data-theme`, qui sert des valeurs calculées périmées (artefact n° 3 du volet Navigateur). Reste à confirmer au pouce, et il faut savoir que le WebAPK d'une PWA DÉJÀ INSTALLÉE ne relit pas son manifeste immédiatement : Chrome le rafraîchit de lui-même, mais avec du retard. Si le bandeau noir persiste après cette livraison, ce n'est pas que le correctif a manqué — c'est le WebAPK d'hier ; désinstaller puis réinstaller le raccourci tranche la question tout de suite. Le (b), lui, agit sans délai dans un onglet. RESTE OUVERT, MÊME DÉFAUT SUR L'AUTRE PLATEFORME : `apple-mobile-web-app-status-bar-style` vaut « black-translucent », ce qui sur iOS glisse le contenu SOUS la barre d'état et en force les glyphes en blanc — donc blanc sur papier crème en thème clair, la version iOS exacte du bug d'ici. Non corrigé : la valeur travaille de pair avec `viewport-fit=cover` et les `env(safe-area-inset-*)`, en changer décalerait toute la mise en page verticale, et aucun appareil iOS n'est disponible pour le mesurer. À ouvrir comme ticket à part plutôt qu'à deviner ici. À remplacer : index.html, app.js, manifest.webmanifest et sw.js, cache v103 -> v104.
   v3.07 — LE « × » D'UN FILTRE POSÉ (ticket #16). Le seul nœud que #13 avait laissé derrière lui, et volontairement : `.fchip .fx`, le bouton rond qui retire un filtre, posait un lavis d'accent `rgba(174,113,39,.14)` sur `--accent-soft` — composé #E9D6B9 — et y écrivait son glyphe en `--accent` à 15 px. 3,24:1, sous AA. (a) LE DÉFAUT ÉTAIT DANS LE FOND, PAS DANS LE TEXTE, et c'est ce qui le distingue des six tickets précédents de la passe. Basculer la couleur en `--accent-deep`, le geste qui a réglé #13 et #15, ne donne ici que 4,33 — toujours sous le seuil. Et le lavis lui-même ne repasse au-dessus de 4,5 qu'à alpha .01, c'est-à-dire invisible : il ne peut donc PAS rester un lavis d'accent, quelle que soit son opacité. (b) UNE PISTE ÉCARTÉE PAR LA MESURE, PAS PAR LE GOÛT. Un lavis blanc `rgba(255,255,255,.2)` compose #F5ECDA en clair, où `--accent-deep` donne 4,74 — il tient. Mais le MÊME lavis compose #564E43 en sombre et fait TOMBER l'accent à 3,60, alors qu'il y est aujourd'hui à 5,80. Il aurait fallu un token de lavis à deux valeurs pour un seul glyphe : une entrée de plus dans la palette pour un rond de 21 px. Refusé. (c) CE QUI EST LIVRÉ : LE LAVIS EST RETIRÉ. Le × repose directement sur `--accent-soft`, et sa couleur passe à `--accent-deep`. Une déclaration changée, une couleur changée, aucun token nouveau, et surtout UNE SEULE valeur pour les deux thèmes — c'est ce qui distingue cette réponse de celle du (b). Le fond est mis à `none` explicitement plutôt que supprimé : `.fx` est un `<button>`, sans déclaration le fond de l'agent utilisateur revient. (d) L'EFFET DE BORD, CHERCHÉ AVANT D'ÊTRE SUBI. `.fchip.schip .fx` — le × qui fait sortir d'une catégorie ou d'un tag — redéclare sa taille, son corps et sa couleur, mais JAMAIS son fond : il héritait donc du même lavis d'accent, posé cette fois sur `--surface`, sous une encre `--text-2`. Un rond teinté d'accent derrière un texte neutre, ce que personne n'avait décidé. Il le perd avec l'autre, et son ratio MONTE : 7,09 → 8,36 en clair, 7,12 → 8,34 en sombre. Le ticket disait « ne pas toucher `.fchip.schip .fx` » ; la règle n'est en effet pas touchée, mais le nœud change d'aspect, et c'est voulu — les deux ronds perdent leur cerne ensemble plutôt que d'en garder un chacun de son côté. (e) MESURÉ DANS L'APP, PAS SUR LE PAPIER. Banc écrit pour l'occasion : il remonte les ancêtres de chaque nœud en compositant les alphas pour obtenir le fond EFFECTIF, purge les animations avant de lire (artefact n°2 du volet Navigateur) et change de thème par `settings.theme=…; applyTheme()`, jamais par `setAttribute` (artefact n°3). Le filtre est posé par un VRAI clic sur « Notes », donc par le vrai chemin de rendu. Relevé : le × à 5,03 en clair et 6,86 en sombre ; le × de périmètre à 8,36 et 8,34. Le banc a été validé À L'ENVERS — en réinjectant l'ancienne règle par une surcouche temporaire, il redonne EXACTEMENT le 3,24 du ticket. Note au passage : le ticket promettait 4,55 en clair, on obtient 5,03, parce que #15 a depuis approfondi `--accent-deep` de #905D20 à #87571D. (f) CE QU'ON PERD, ET CE QUE LA CAPTURE EN DIT. Le rond perd son cerne et ne se lit plus comme une cible distincte du reste de la gélule. La comparaison avant/après au ruban montre que la perte est plus petite que redoutée : à alpha .14 le disque était déjà à la limite du visible — c'est précisément pour ça que le foncer ne servait à rien. Le × reste lisible parce qu'il est à la fin de la gélule, à la place conventionnelle. Si l'usage dit le contraire, la cible se redira par la FORME — 1 px de `--accent`, qui est à 3,75 sur `--accent-soft` et n'a besoin que de 3:1 puisque c'est du non-texte — et jamais par un fond. (g) NON VÉRIFIÉ, et il faut le dire. `resize_window` est resté INERTE une fois de plus (fenêtre demandée à 430 px, `innerWidth` toujours à 2174) : le relevé est donc pris à largeur bureau. Ça vaut ici, et seulement ici, parce que `.fchip .fx` vit hors de toute `@media` et qu'aucune des trois feuilles bureau ne le redéclare — vérifié par recherche sur les cinq CSS. Le rendu au doigt sur un vrai téléphone n'a pas été fait. Le chip de PÉRIMÈTRE n'était pas atteignable par l'UI dans l'état du corpus : son balisage a été injecté à l'identique dans le vrai conteneur, donc dans la vraie cascade — le style mesuré est réel, le déclencheur ne l'est pas. Restent ouverts dans la passe : #17 (le lien du toast, sur un fond peint EN DUR), #18 (les teintes de catégorie), #12 (les tokens d'étiquette), #19 (onboarding.css) et #22 (le CDN Supabase hors ligne). À remplacer : styles.css, app.js et sw.js, cache v104 -> v105. index.html n'est PAS touché. 
   v3.08 — LE TRI DES SÉLECTEURS DE SAISIE : « DERNIER USAGE », ET UN BOUTON POUR EN CHANGER (ticket #26). Rapport : « la règle de tri des catégories et des tags, quand je dois en ajouter en créant un item — on dirait que c'est chronologique, mais pas vraiment ». Le diagnostic d'abord, parce qu'il commande le reste : RIEN n'était chronologique, nulle part. Deux ordres seulement coexistaient — la FRÉQUENCE dans tout ce qui sert à saisir (sélecteur de catégorie et de tags de la fiche, suggestions de la capture, classement et taguage par lot, fusion), et le réglage `indexSort` dans l'index seul. L'impression de chronologie venait du compteur : ranger trois items d'affilée fait remonter leur catégorie, donc le « récemment employé » monte VRAIMENT — mais par sa taille, ce qui n'est pas la même chose et se trahit dès qu'on met de côté ou qu'on jette (`domCounts()` ne compte que les actifs, la catégorie REDESCEND) ou dès qu'une catégorie neuve, à 0, tombe en fin de liste. Un ordre qui coïncide avec l'attendu neuf fois sur dix et le contredit la dixième est plus coûteux qu'un ordre franchement autre : on ne peut pas s'y fier, donc on relit toute la liste à chaque fois. (a) LE DERNIER USAGE EST UNE DÉRIVATION, PAS UN CHAMP. `catLastUse()` et `tagLastUse()` rendent, par nom, le `createdAt` du plus récent item qui le porte. Aucune migration, rien à écrire en base (§ 3 de CLAUDE.md) — la donnée existait, elle n'était pas exploitée, exactement comme `srcLib()` en v2.55. Les corbeillés sont écartés : une catégorie ne doit pas remonter grâce à ce qu'on a jeté. LIMITE ASSUMÉE, à dire plutôt qu'à cacher : reclasser un vieil item ne remonte pas sa catégorie, parce que le RANGEMENT n'est pas horodaté — seule la capture l'est. L'horodater coûterait un champ par item et une migration pour un écart que le compteur d'usage rattrape déjà, et « Usage » reste à un tap. (b) UN SECOND RÉGLAGE, ET IL DOIT ÊTRE SECOND. `pickSort` (Récents · Usage · A → Z) est distinct d'`indexSort` et ne le remplace pas : l'index sert à RETROUVER un nom, la saisie sert à REPOSER la case qu'on vient d'employer. Deux écrans, deux travaux. C'est la leçon v2.49 prise par l'autre bout — elle interdisait à `tagLib()` d'hériter de l'ordre de l'index, elle n'interdisait pas à la saisie d'avoir le sien. DÉFAUT « Récents », changement assumé du comportement d'avant : c'est ce que le pouce croyait déjà voir, et une seule ligne (DEFAULT_SETTINGS) le ramène à « Usage » si le jugement s'inverse. Les deux ordres retombent l'un sur l'autre puis sur l'alphabet — sans ces replis, tout ce qui n'a jamais servi (compteur 0, date 0) changerait de place au gré de l'ordre d'insertion. (c) DEUX PORTES UNIQUES, ET C'EST LÀ QUE SE JOUE LA TENUE. `pickCats()` et `pickTags()` remplacent SIX tris écrits en clair et presque identiques, semés dans autant de fonctions — c'est ce presque qui les rendait dangereux, chacun se corrigeant sans les autres. Tout sélecteur de saisie passe désormais par l'une des deux : le bouton commande partout la même chose, et un septième appelant ne peut plus réinventer un ordre à lui. `tagCounts()` est extrait de `tagLib()` au passage, qui le comptait pour son propre compte. CE QUI NE CHANGE PAS D'ORDRE, et le refus est aussi net que l'ajout : la RECHERCHE garde le sien, où `pref()` remonte ce qui COMMENCE par la frappe avant ce qui la contient — un critère qui bat la fréquence et qui battrait aussi la date ; et l'INDEX garde `indexSort`. (d) LE BOUTON EST DANS LA COUCHE, PAS DANS LES RÉGLAGES. L'ordre d'une liste se juge SUR la liste : une feuille venue du bas couvrirait exactement ce qu'on règle — le motif écarté en v3.02 pour la largeur des cartes, repris ici. Le segment (`.pksort`, la grammaire `.seg` du chantier 24, aucune cote propre) vit HORS de la zone qui défile, entre le champ et la sélection, comme les teintes de la couche du visuel en v2.71 : il ne part donc jamais sous le doigt pendant qu'on tape. Il ne s'affiche que sur `opt.sortable` — les couches qui choisissent une catégorie ou un tag ; un sélecteur à trois entrées n'a pas besoin d'un ordre. Un tap redessine LA SEULE liste (`draw()`, qui la reconstruit déjà à chaque frappe) : rien d'autre à repeindre, et surtout pas `renderAll`. Les suggestions de la capture et du lot, elles, n'ont pas de bouton — elles sont coupées à six et à huit, un segment y pèserait plus que ce qu'il ordonne — mais elles SUIVENT le réglage, sinon deux endroits diraient deux vérités sur la même pile. (e) COMMENT ON L'ENLÈVE (§ 2.3) : `pickSort` retiré de DEFAULT_SETTINGS et les deux portes rendues au tri par fréquence — les six appelants ne changent pas, ils appellent déjà `pickCats`/`pickTags`. NON VÉRIFIÉ, et il faut le nommer : rien n'a été jugé au pouce ni mesuré au banc — le segment sous le champ, sa hauteur dans une couche déjà chargée, et l'effet réel de « Récents » sur une vraie pile (le corpus de test a des `createdAt` synthétiques, il ne dit rien de l'ordre qu'un vrai usage produit) restent à juger. À remplacer au déploiement : app.js, styles.css et sw.js, cache v105 -> v106. index.html n'est PAS touché.
   v3.09 — LA REMONTÉE CHANGE DE PORTE (ticket « porte basse »). Rapport au pouce : « je ne suis pas très satisfait du slide du bas pour afficher la remontée, car c'est un geste utilisé pour actualiser les app. De plus le fait d'avoir ce bandeau remontée à l'ouverture donne l'impression d'un bug de l'app. » Deux griefs énoncés, un troisième impliqué (« juste 3 visuels, sans les textes, c'est souvent compliqué de comprendre ce qu'est l'item, c'est même incompréhensible si l'image est absente »), et trois causes indépendantes — c'est ce qui a rendu le lot découpable. (1) LE GESTE. Tirer vers le bas est le geste d'ACTUALISER dans la grammaire des applications. Le réglage de la v2.85 était bon (résistance .20, seuil 62 px, ~310 px de course, aucune ouverture accidentelle) ; un geste juste dans une grammaire fausse reste faux. L'IIFE du tirage, RF_DAMP/RF_OPEN/RF_GRIP et hintFrame sont déposés. (2) L'AUTO-OUVERTURE. maybeOpenFrame dépliait 130 px AU-DESSUS de l'en-tête une fois par jour, donc poussait la page à froid : un objet qui apparaît seul et décale tout se lit comme une panne, jamais comme une attention. Il devient riseMaybeAnnounce — MÊMES GARDES (jour servi, seuil horaire, aucune couche ouverte hors « tab », tirage non vide), plus une (on n'annonce pas un rituel déjà ouvert) — et sort en TOAST avec action « revoir ». Le toast est en position:fixed : il ne pousse rien. settings.frameDay et settings.frameMins gardent leur sens, donc le réglage « heure d'arrivée » et rearmFrame survivent intacts. (3) LES VIGNETTES MUETTES. Le cadre posait trois vignettes 3/4 sans texte, et son commentaire l'assumait (« à trois de front elle fait ~100 px, soit dix-huit caractères ») : raisonnement juste, conclusion qui ne survit pas au changement de géométrie. La feuille pose une LIGNE horizontale par item — vignette 52 px, titre sur deux lignes (~46 caractères), provenance, et l'ÂGE. L'âge répare un défaut que personne n'avait signalé : la remontée sert à revoir du VIEUX, or ni le cadre ni ses vignettes n'ont jamais dit l'âge de ce qu'ils remontaient. Dérivé de createdAt, paliers grossiers et arrondis vers le BAS (« il y a 437 jours » est un relevé, « il y a plus d'un an » est un souvenir) : AUCUN CHAMP NOUVEAU, aucune migration. Et la vignette ne peut plus être muette — repli sur srcTile puis sur l'icône du type, un repli n'ayant pas le droit d'échouer (leçon v2.39). LA PORTE. Troisième bouton de nav.tabs, EN TÊTE : « à gauche évoque ce qui est avant », et c'est le premier geste de la journée. Il porte le CHIFFRE du tirage, pas un point — le point de la v2.45 disait « il y a quelque chose », ce qui ne donne envie de rien. PAS de data-tab : selectTab/paintTabs translatent #tabTrack vers une fente indexée par TAB_ORDER, qui n'en a que deux, et l'attribut ferait chercher une troisième fente inexistante (le bug de la v2.57 par l'autre bord) ; sans lui, le querySelectorAll(".tabs button") de selectTab lui retire simplement .active, ce qui est le comportement voulu. UNE PORTE, JAMAIS DEUX : #inboxBtn est déposé, et la moitié « non classés » de sa pastille descend en ligne nommée au pied de l'index (#openUnfiled), auprès de « Mis de côté » — ce n'est pas de la remontée, c'est du rangement. LA SURCOUCHE. remontee.css et remontee.js, neufs, chargés après tout le reste (§ 4) ; les trois branchements laissés dans app.js sont gardés sur window.riseMaybeAnnounce, donc trois no-op sans elle. La surcouche lit items, batch et settings PAR LEUR NOM et non via window : ce sont des `let` de premier niveau, donc des liaisons de l'environnement lexical global, partagées entre scripts classiques mais absentes de window — une garde écrite sur window.items serait fausse. Le compte de la porte se repeint en ENVELOPPANT renderBadges() plutôt qu'en posant un appel chez ses quinze appelants : c'est le point que tous les chemins traversent, et ça garde la surcouche amovible. riseFrameIds et riseOpenAt RESTENT dans app.js — c'est de la logique de tirage, pas d'interface : elles lisent et réordonnent batch, elles restent chez leur donnée. L'icône entre dans icons.svg sous un id NEUF, `resurface` : #rise, la flèche nue, sert encore au kicker « remonté à la surface » de renderStage, et deux rôles ne partagent pas un symbole ; le nom est neutre pour survivre à un renommage de « la remontée ». CE QUI N'EST PAS TOUCHÉ : la mécanique du tirage (ensureBatch, maturation 30 j, plancher 60 j, sourdine) et le rituel plein écran — CE QUI remonte ne change pas, seulement COMMENT ça s'annonce. Vérifié : node --check sur app.js, sw.js et remontee.js ; aucune référence survivante à renderRiseFrame, maybeOpenFrame, toggleRiseFrame, frameTucked ou inboxBtn hors journal ; le bloc CSS v2.84/v2.85 retiré en entier ; SHELL du worker complété des deux fichiers neufs. NON VÉRIFIÉ, et nommé comme tel : rien n'a été ouvert dans un navigateur — ni le rendu de la porte, ni la feuille, ni l'annonce, ni le rail bureau au-delà de 1100 px. La liste de contrôle est écrite dans docs/ticket-remontee-porte-basse.md et reste ENTIÈREMENT à dérouler au pouce. À remplacer : index.html, app.js, styles.css, icons.svg, sw.js, et les deux fichiers neufs remontee.css / remontee.js. Cache v106 -> v107.
   v3.10 — LA REMONTÉE DEVIENT UN VRAI TROISIÈME ONGLET, ET LA BARRE SE LIT SANS LA COULEUR (tickets #1 à #4 du journal de suivi, docs/log-suivi-remontee.md). Quatre observations au pouce au retour de la v3.09 en ligne. (1) REVIREMENT ASSUMÉ DE LA v3.09, et il doit être écrit comme tel : cette version-là avait délibérément fait de la remontée une PORTE et pas un onglet — « pas de data-tab, selectTab/paintTabs translatent #tabTrack vers une fente indexée par TAB_ORDER, qui n'en a que deux ». Le raisonnement était juste POUR CE QU'ON LUI DEMANDAIT ALORS, une porte vers une feuille. Trois des quatre observations le périment d'un coup, et toutes pour la même raison de fond : elles traitent la remontée comme un PAIR des deux autres onglets — on ne glisse pas vers une feuille, on n'ouvre pas l'app « sur une feuille », on ne réordonne pas un bouton parmi deux onglets. Une <section id="tab-rise"> entre dans la piste, le bouton reçoit data-tab, TAB_ORDER passe à trois entrées, et le corps de la feuille v3.09 devient renderRiseTab() ligne pour ligne : le CONTENANT change, pas la forme validée au pouce. Le glissé entre onglets n'est pas touché d'une ligne — il lisait déjà tabOrder() et la largeur de la fenêtre, il traverse trois fentes dès que la liste en a trois. Cinq points traités au passage : paintTabs BOUCLAIT sur TAB_ORDER en translatant d'après tabOrder() (inoffensif tant que c'était le même objet, décalage d'un cran dès que l'ordre dérive d'un réglage) ; le titre d'en-tête dit « La remontée » et cesse d'être un menu (navTitleIsMenu, lue par updateNavTitle ET par toggleViewBand, jamais réécrite deux fois) ; l'entonnoir NOMME sa condition (« pile ou périmètre ») au lieu de nier Collection, ce qui était vrai à deux onglets et faux à trois ; l'annonce en toast et la pastille du compte se taisent quand l'onglet est AFFICHÉ ; et counts() de desktop-v2.js ne prend plus la remontée pour Collection. (2) L'ONGLET ACTIF SE DISTINGUE SANS LA COULEUR. La demande était « éclaircir l'inactif » ; la vraie cause est venue après trois échelles de gris — « même le 4 j'ai des difficultés, à cause de mon daltonisme ». Le bon indicateur n'est pas le contraste de chaque état avec le fond mais celui des DEUX ÉTATS l'un par rapport à l'autre : 1,58 en sombre et ça convient, 1,14 en clair et ça ne convient pas. En thème clair l'actif et l'inactif ont la même CLARTÉ, leur seule différence est la teinte — exactement l'axe qu'un œil daltonien ne lit pas ; le thème sombre fonctionnait par accident, son accent étant franchement plus clair que son gris. AUCUNE valeur de gris ne pouvait régler ça (l'échelon le plus clair testé monte l'écart à 1,82) : il fallait un canal qui ne soit pas la couleur. L'actif prend un APLAT --accent plein et son libellé passe en --accent-ink, dans les deux thèmes — renversement de clarté, donc information portée par la forme et la luminance. Pastille contre barre : 4,51 en clair, 7,69 en sombre, et ça survit au test en niveaux de gris. L'inactif s'éclaircit comme demandé au départ (#8E8371 clair, #9C917B sombre) mais ne porte plus la distinction. Les TROIS feuilles qui écrivent l'état actif le disent pareil : styles.css pour la barre du bas et pour le rail de 900 px, styles-desktop.css pour celui de 1100 — le rail posait un lavis --accent-soft, soit le canal que le daltonisme ne lit pas, et le défaut était le même à 400 px et à 1200. Aucun token nouveau, aucune cote changée. (3) OUVRIR L'APP SUR LA REMONTÉE. startTab() filtrait DÉJÀ sur TAB_ORDER : « rise » y étant entré, le réglage l'accepte sans une ligne de code — meilleure preuve que le revirement était la bonne décision. Restait le JOUR VIDE, qui ne se tranchait pas seul : ouvrir sur un écran qui explique pourquoi rien ne remonte est honnête mais terne, basculer ailleurs trahit la consigne donnée à l'app. Question posée au pouce, réponse : ça se règle. D'où riseVoidStart (« Rester » par défaut / « Aller à Collection »), une ligne qui n'apparaît que sur « Remontée », et bootTab() qui devient le SEUL endroit résolvant l'onglet de démarrage — la règle vaut donc aussi pour « Dernier onglet » au lieu d'être vraie par un chemin et fausse par l'autre. Corollaire : selectTab compare à `homeTab` (l'onglet sur lequel l'app s'est RÉELLEMENT ouverte) et non à startTab() (ce qui est réglé), sans quoi un jour vide empilerait une couche de retour sur l'écran d'accueil lui-même. (4) CHOISIR L'ORDRE DES ONGLETS. settings.tabOrder est la seule exception du lot à « pas de champ nouveau sans nécessité », et elle est justifiée : un ordre choisi ne se dérive de rien ; migration nulle, les réglages sont un blob JSON. LE PIÈGE ÉTAIT ÉCRIT AVANT DE CODER, et c'est lui qui a commandé la relecture : TAB_ORDER est lu directement à une dizaine d'endroits, et n'en corriger qu'une partie rejouerait EXACTEMENT le décalage d'un cran des v2.22 et v2.39 — la seule classe de bug que ce dépôt ait payée deux fois. Audit fait, ligne à ligne : startTab(), bootTab() et selectTab() valident l'APPARTENANCE (le nom est-il un onglet connu) et sont donc justes par construction ; orderTrack() et le glissé lisaient déjà tabOrder() ; paintTabs bouclait sur la constante et a été corrigé au ticket #1. tabOrder() ne rend jamais autre chose qu'une permutation COMPLÈTE de TAB_ORDER — on garde ce qui appartient à la constante, on jette les doublons, on complète avec ce qui manque : une valeur absente, tronquée, dupliquée ou orpheline (« surface ») ne peut plus produire une piste dont le rang contredit le DOM. orderTabsBar() est le pendant d'orderTrack() sur les BOUTONS (sans lui l'ordre réglé serait vrai dans le glissé et faux sous le pouce), et il insère avant .dk-keys, ce qui laisse les deux nœuds propres au bureau à leur place. Le geste est celui demandé — appui long, puis glissé — avec trois précautions : pas de saisie si le doigt a bougé de plus de 10 px (on défilait la feuille), touchmove annulé au niveau du document une fois la ligne prise (changer touch-action en cours de geste n'a aucun effet), et ↑/↓ au clavier parce qu'un contrôle qui n'a qu'un geste tactile n'existe pas au bureau. Aucune cote n'est écrite en JS : le pas est MESURÉ entre deux lignes rendues, et la seule propriété posée est un transform — la même exception que paintTabs. VÉRIFIÉ, ET CETTE FOIS DANS UN NAVIGATEUR : la liste de contrôle de docs/ticket-remontee-porte-basse.md § 5, écrite en v3.09 et JAMAIS déroulée, l’a été ici sur la forme onglet — 29 points au banc (Chromium piloté, 390×844 puis 1280×900 rechargé à la largeur voulue), tous au vert. Deux défauts n’ont été trouvés QUE parce qu’on mesurait au lieu de regarder. (a) EN THÈME SOMBRE, L’ONGLET ACTIF GARDAIT L’ENCRE DE L’INACTIF : `:root[data-theme="dark"] .tabs button` pèse (0,2,2) contre (0,2,1) pour `.tabs button.active` et gagnait donc la couleur du texte — contraste relevé 1,37 au lieu de 7,53, soit l’INVERSE exact de ce que le ticket #2 cherchait, et parfaitement invisible à l’œil qui sait déjà où est l’onglet courant ; `:not(.active)` referme la règle. (b) SELECTTAB COMPARAIT À startTab() ET NON À L’ONGLET RÉELLEMENT OUVERT, si bien qu’un jour vide réglé sur « Aller à Collection » empilait une couche de retour sur l’écran d’accueil lui-même. Les six contrastes de la planche sont retrouvés dans le navigateur (clair 4,58 · 4,51 · 3,73 ; sombre 7,53 · 7,69 · 5,50), et une valeur de tabOrder abîmée en base — vide, tronquée, dupliquée, orpheline (« surface »), non-tableau — rend bien une permutation complète dans les cinq cas. L’INTERRUPTEUR D’ARRÊT A CHANGÉ DE NATURE, et il faut le dire plutôt que de laisser le § 4 du CLAUDE.md le promettre encore : retirer les deux balises de remontee.css / remontee.js ne rend plus « l’écran d’avant » mais un TROISIÈME ONGLET VIDE — la section, l’entrée de TAB_ORDER et le data-tab vivent désormais dans les fichiers de base. Vérifié quand même, parce que la nuance compte : sans la surcouche l’app démarre, ne lève AUCUNE erreur, et Collection comme Ma pile rendent normalement. Le retrait du ticket #1 est un `git revert` de son commit, comme le journal de suivi l’annonçait. Aussi vérifié : node --check sur app.js, sw.js, remontee.js et desktop-v2.js, et l’audit exhaustif des lectures de TAB_ORDER. NON VÉRIFIÉ, et nommé comme tel : le franchissement des 1100 px à la fenêtre étirée (resize_window n'émet aucun événement), le rendu sur un vrai téléphone, le passage naturel d'un jour à l'autre pour l'annonce, et le rendu réel pour l'œil du rapporteur — la forme de la pastille a été validée au pouce sur la planche, ce qui est la seule vérification qui vaille. À remplacer : index.html, app.js, styles.css, styles-desktop.css, desktop-v2.js, remontee.js, remontee.css, sw.js. Cache v107 -> v108.
   v3.11 — LE GLISSÉ DEPUIS LA REMONTÉE ÉTAIT MORT, ET LA CAUSE N'EST PAS DANS LE GESTE (ticket #8). Rapport au pouce : « le slide entre remontée vers catégorie ne fonctionne pas ». Aucune garde du chantier 5 ne le refusait — le geste n'était jamais VU. Le glissé écoute `#tabViewport`, or ce conteneur n'a aucune hauteur propre : `.track > section:not(.tabcur){height:0}` fait que seule la section courante en porte, donc la zone d'écoute vaut exactement la hauteur du CONTENU. La remontée est la première section de la piste à pouvoir être courte — une phrase, les jours où rien ne remonte — et plus courte encore quand elle est vide ; le doigt se posait alors sur le body, hors du viewport, et le `touchstart` n'arrivait pas. Collection et Ma pile rendent des listes longues : le défaut existait depuis le chantier 5 et n'avait jamais eu l'occasion de se voir. Correctif d'une ligne, en CSS et non en JS (§ 3) : `min-height:60dvh` sur `.viewport`, une valeur franchement sous la hauteur d'écran une fois l'en-tête et la barre du bas déduits, donc qui donne une surface à saisir sans ALLONGER la page. À remplacer : styles.css, app.js (ces deux lignes), sw.js. Cache v108 -> v109. NON VÉRIFIÉ : rien n'a été ouvert dans un navigateur — le harnais local vit dans `.claude/`, absent de ce dépôt. La mesure à faire au pouce est la bonne : sur la remontée un jour vide, le glissé vers Collection doit partir depuis le milieu de l'écran, pas seulement depuis la phrase.
   v3.12 — LE GLISSÉ ÉTAIT ENCORE MORT SOUS LE CONTENU (ticket #9, suite du #8). Rapport au pouce sur la v3.11 : « si on glisse en ayant le doigt sous le bouton Commencer la revue, le glissé ne fonctionne pas ». Même cause de fond que le ticket #8 — la zone d'écoute du geste est la boîte de `#tabViewport` — mais par l'AUTRE bord : le `min-height:60dvh` ne peut rien quand le contenu est PLUS HAUT que 60 dvh, puisque le viewport s'arrête alors à son dernier pixel. Les ~142 px qui suivent sont le `padding-bottom` de #app, la garde de la barre du bas : le doigt s'y posait sur #app, hors du listener. Le padding est désormais donné AUSSI au viewport et repris en marge négative de la même valeur — la boîte couvre la bande, la hauteur de page ne bouge pas d'un pixel. La cote est sortie en variable `--navclear` portée par #app : elle était écrite en clair à deux endroits, elle l'est maintenant une fois et ce qui la recouvre la lit. Vérifié au ruban (page témoin, Chromium 390 × 844, contenu de 692 px suivi d'un bouton) : `elementFromPoint` 40 px sous le bouton et à 800 px passe de `#app` à `#tabViewport`, `scrollHeight` inchangé à 844. NON VÉRIFIÉ : rien sur un vrai téléphone ; le geste lui-même n'a pas changé d'une ligne. À remplacer : styles.css, app.js (ces deux lignes), sw.js. Cache v109 -> v110.
   v3.13 — LA SURCOUCHE EST FONDUE, ET LES DEUX RÉGLAGES D'ONGLETS SONT REFORMÉS (tickets #5, #6, #7). (5) LA FUSION, ET CE QU'ELLE RÉPARE. remontee.js / remontee.css entrent dans app.js / styles.css et sont supprimés. Motif du § 4 tenu jusqu'au bout — la forme a été validée au pouce en v3.09 puis v3.10, une surcouche est un échafaudage. Ce qui a forcé la date : depuis le ticket #1 la section #tab-rise, l'entrée de TAB_ORDER et le data-tab vivaient dans les fichiers de base tandis que le RENDU vivait dans la surcouche — deux fichiers couplés version à version dont la divergence ne lève AUCUNE erreur et rend un écran vide. C'est exactement ce qui a été observé en ligne : onglet vide au glissé, tiroir au tap, soit un app.js v3.10 servi avec un remontee.js v3.09 resté en cache HTTP (le worker, lui, est en réseau d'abord). Les trois gardes `window.renderRiseTab && …` deviennent des appels directs : une garde sur une fonction du même fichier ne protège de rien et ferait croire à une absence possible. L'IIFE est conservée telle quelle (état privé, mêmes fonctions publiées). Cascade vérifiée avant de déplacer : aucune feuille bureau ne porte de règle sur .risetab, .rcnt, .rline, .rs*, .rage ni .tcv. (6) « AU DÉMARRAGE, OUVRIR » TIENT SUR UNE LIGNE. Quatre choix étaient sur deux lignes parce que « Dernier onglet » ne tenait pas dans un quart de ligne. Le libellé devient « Dernier » (valeur stockée inchangée, "last", aucune migration) — mais la MESURE a dit que ça ne suffisait pas : à quatre colonnes « Collection » déborde de 2 px à 390 px et de 9 px à 360 px au corps de 13 px du segment. D'où `.seg.four` à 11,5 px, la même sorte de variante que `.seg.days` qui descend déjà à 11 px pour aligner sept jours ; et sous 360 px, où aucun corps ne tient, une règle de média rend les deux lignes plutôt qu'un libellé tronqué — un réglage qu'on ne peut pas lire est un réglage qu'on ne peut pas choisir. Aucune décision de largeur en JS. (7) L'ORDRE DES ONGLETS RESSEMBLE ENFIN À CE QU'IL ORDONNE. Rapport au pouce : « plutôt que de faire une liste verticale, on va reproduire les tabs, pour pouvoir faire le drag and drop, plus logique ». Juste, et la raison est nommable — ce qu'on ordonne est HORIZONTAL, une liste verticale demande de traduire « en haut » en « à gauche » à chaque geste. Le contrôle devient trois onglets côte à côte, icône au-dessus du libellé, l'onglet courant en pastille pleine (ticket #2, la distinction ne passe pas par la teinte). AUCUNE mécanique réécrite : applyTabOrder, tabOrder, orderTrack et orderTabsBar reçoivent un tableau de trois noms, d'où qu'il vienne ; seul l'axe change — pas mesuré sur `left` au lieu de `top`, translateX, ←/→ au clavier au lieu de ↑/↓. Les deux précautions du ticket #4 restent : seuil de 10 px sur les deux axes avant saisie, et touchmove annulé au niveau du document une fois l'onglet pris. Le pas reste MESURÉ entre deux nœuds rendus, jamais écrit en JS (§ 3). VÉRIFIÉ, au navigateur et au ruban : l'app démarre sans AUCUNE erreur de page une fois la surcouche fondue (seule subsiste l'erreur attendue de Supabase, hors ligne) ; renderRiseTab, riseTabPaint et riseMaybeAnnounce existent, .rcnt reçoit bien ses règles ; le segment à quatre choix ne tronque à aucune largeur de 360 à 430 px et repasse à deux lignes à 320 px ; la barre d'ordre rend trois onglets sans troncature de 320 à 430 px, cible de 52 px, pas mesuré cohérent (99 / 112 / 122 / 135 px). NON VÉRIFIÉ : le glissé de réordonnancement lui-même n'a pas été rejoué au doigt (le banc mesure la géométrie, pas le geste), rien n'a été vu sur un vrai téléphone, et le rendu de la remontée avec de vraies données n'est pas rejugé — le corpus de test vit dans .claude/, absent de ce dépôt. À remplacer : index.html, app.js, styles.css, sw.js ; SUPPRIMER remontee.js et remontee.css. Cache v110 -> v111.
   v3.14 — L'ONGLET REMONTÉE SE REPEINT À LA SORTIE DU RITUEL, ET IL PERD SES DEUX BOUTONS FLOTTANTS (tickets #10 et #13). (10) LE DÉFAUT, ET SA CAUSE EN UNE LIGNE. Rapport au pouce : « juste après avoir fait la revue, la liste avec le bouton Commencer la revue est toujours là ; il faut changer d'onglet et revenir pour voir C'est fait pour aujourd'hui ». `closeRemontee` finissait par `renderBadges()`, posé en v3.01 pour une raison qui était juste À L'ÉPOQUE — revenir du rituel, c'est revoir le CADRE. Depuis le ticket #1 la remontée n'est plus un cadre d'en-tête mais une SECTION d'onglet : `renderBadges` ne repeint que la pastille du compte, jamais le corps, rendu par `renderRiseTab` dont le seul autre appelant est `selectTab`. Même famille de défaut que celui réparé en v3.01, reproduite par le changement de contenant : le point de sortie est bon, ce qu'il repeint ne l'est plus. Le correctif est un appel, GARDÉ PAR `curTab==="rise"`, et la garde n'est pas décorative : `renderRiseTab` écrit aussi `settings.frameDay` (regarder la page vaut « vu »), donc rendre la section depuis Collection consommerait la journée sans que rien n'ait été montré. Aucun champ, aucune migration — `riseFrameIds()` et `batch` sont déjà à jour à cet instant, c'est précisément ce qui rendait l'écran juste au retour sur l'onglet. (13) LES DEUX BOUTONS FLOTTANTS QUITTENT LA REMONTÉE. Le `+` invitait à capturer sur l'écran d'un rituel de revue, et `#fabJump` n'avait rien à proposer — sauf que `gotoTargets()` y rendait quand même la liste des catégories : sa seconde branche se lit « ni Ma pile ni Collection, et la lentille est aux catégories », vraie par accident sur un troisième onglet qui n'existait pas quand elle a été écrite. Le bouton s'ouvrait donc sur des cibles absentes de l'écran. Deux masquages de plus dans deux fonctions qui en tiennent déjà cinq chacune : `paintHeaderBtns` pour le `+`, la garde d'entrée de `updateJumpFab` pour le mini-FAB. UN TROISIÈME DÉFAUT TROUVÉ EN ÉCRIVANT LE PREMIER, et c'est lui qui a commandé la forme du correctif : la remontée était le seul onglet dont le rendu ne passait par AUCUN des deux propriétaires d'état de l'en-tête (`renderRoot`, `renderPileTab`), si bien qu'arriver dessus gardait les boutons de l'onglet quitté — l'entonnoir de Ma pile compris, alors que le ticket #1 avait justement nommé sa condition pour qu'il ne s'y montre pas. `renderRiseTab` appelle donc `paintHeaderBtns()` et `scheduleJumpFab()`, ce dernier avec le même différé d'une image qu'aux dix autres points d'appel (v2.51). LA COTE RESTE AU CSS (§ 3) : `.fab` pose un `display:flex`, qui bat `[hidden]` — l'annulation `.fab[hidden]{display:none}` est écrite dans styles.css, neuvième du genre après .peek, .rise, .tabs button, .jfab et les autres. VÉRIFIÉ : `node --check` sur app.js et sw.js ; les quatre sorties du rituel (les trois gestes de carte et l'abandon en cours) passent bien par `closeRemontee`, relues une par une — les quatre gestes de carte ne referment RIEN eux-mêmes (ils avancent la séquence et `renderStage` affiche l'écran de fin DANS la surface), si bien qu'il n'existe que deux sorties et qu'elles passent toutes deux par `closeRemontee` — `#riseClose` pour le bouton, `pushLayer("surface",()=>closeRemontee())` pour le retour système ; le ticket craignait une quatrième sortie qui garderait le défaut, il n'y en a pas ; `renderRiseTab` reste idempotent (il réécrit `innerHTML` et recâble ses `onclick`, il ne double aucune cellule) ; aucune règle bureau ne porte sur `.fab` ni `#fabAdd` hors `@media (min-width:1100px)`, vérifié au grep sur les quatre feuilles. NON VÉRIFIÉ, et nommé comme tel : RIEN N'A ÉTÉ OUVERT DANS UN NAVIGATEUR — le harnais local et son corpus vivent dans `.claude/`, absent de ce dépôt ; la séquence complète « faire la revue jusqu'au bout, puis regarder l'onglet » est donc à juger au pouce, ainsi que l'absence des deux boutons sur la remontée et leur retour immédiat sur les deux autres onglets. À remplacer : app.js, styles.css, sw.js. index.html n'est PAS touché. Cache v111 -> v112.
   v3.15 — LA BOÎTE DU GESTE COUVRE ENFIN LA PAGE, ET LA REMONTÉE PORTE DEUX ISSUES (tickets #14, #11, #12). (14) TROISIÈME RAPPORT SUR LE MÊME GESTE, ET C'EST LE CORRECTIF QUI ÉTAIT AU MAUVAIS ENDROIT. « Quand la remontée est faite et que j'ai la phrase C'est fait pour aujourd'hui, le slide vers l'autre onglet ne fonctionne pas si je glisse dans le vide sous la phrase. Ça fait deux fois que j'ai ce bug — la dernière fois c'était sous le bouton Commencer la revue. Il faut que le slide soit bien sur toute la page remontée, comme pour Catégorie et Pile. » La demande est la bonne, et elle nomme la vraie cible : la SURFACE, pas le cas. Les tickets #8 et #9 avaient traité deux symptômes d'une même cause — la zone d'écoute du glissé est la boîte de `#tabViewport`, et cette boîte ne couvrait pas la page. Le #8 avait posé `min-height:60dvh` (contenu court), le #9 un `padding-bottom` repris en marge négative (contenu plus haut que la boîte). Le #14 est ce que `60dvh` a laissé passer : sur un contenu d'UNE LIGNE, la boîte s'arrête à 60 % de l'écran et les ~25 % qui restent jusqu'à la barre du bas appartiennent à `#app`. Le doigt s'y pose hors du listener. Trois rapports, une seule cause, et deux correctifs tirés à côté avant de viser juste — parce que `60dvh` était une valeur CHOISIE (« franchement sous la hauteur de l'écran »), c'est-à-dire au jugé, et qu'une valeur au jugé règle le cas qu'on avait sous les yeux, pas la classe de défaut. LA COTE N'EST DONC PLUS CHOISIE, ELLE EST CALCULÉE : `min-height:calc(100dvh - var(--hdrh))`, soit tout ce qui reste sous l'en-tête. Avec le padding du #9 juste dessous, la boîte va du premier pixel sous l'en-tête au dernier pixel sous la barre du bas — la page entière, exactement ce que Collection et Ma pile ont toujours eu par la seule longueur de leurs listes, et exactement ce que le rapport demande. `--hdrh` est un token NEUF mais pas une cote de plus : c'est la SOMME NOMMÉE de tokens déjà là (`env(safe-area-inset-top) + --s2 + --tap + --s2`), soit la composition que `.topbar` écrit déjà dans son padding. Et `.topbar` la CONSOMME en `min-height`, ce qui interdit aux deux de dériver l'une de l'autre — sans ce verrou, la somme mentirait au premier réglage de l'en-tête, et une somme qui ment se paye en bande morte, c'est-à-dire par un quatrième rapport. CE N'EST PAS UNE RECHUTE `--tbh` (v2.47) : celle-là était MESURÉE EN JS et nourrissait un `position:sticky` ; celle-ci ne quitte jamais le CSS et aucune ligne de JS ne la lit (§ 3). ELLE N'ALLONGE PAS LA PAGE, et c'est vérifiable au crayon : la contribution au flux vaut min-height + padding − marge négative = (100dvh − --hdrh), l'en-tête au-dessus vaut --hdrh, total un écran exactement. Rien entre les deux : entre `</header>` et `.viewport` il n'y a que `#rootResults` (masqué hors recherche, et `body.searching` masque le viewport) et deux `input[type=file]` masqués. (11) LES NON CLASSÉS, LES JOURS OÙ LE TIRAGE EST VIDE — forme 3 des trois étudiées, validée au pouce. La ligne `#openUnfiled` RESTE au pied de Collection : deux portes PERMANENTES vers la même chose, c'est ce que la v3.09 avait refusé en supprimant `#inboxBtn`. Celle-ci n'est pas permanente — elle n'existe que le jour où l'écran n'a rien d'autre à dire, donc l'onglet ne change pas de sens les autres jours : c'est l'écran vide qui devient utile au lieu d'expliquer son silence. La phrase de `riseVoidReason()` RESTE au-dessus et ne cède pas la place — elle dit la cause, le bloc dit l'issue, et l'ordre est celui du sens. Même destination que sa jumelle et par le MÊME appel, `enterCollection("none")` : une fonction, deux appelants, jamais deux chemins qui divergeront. Dérivé d'`unfiledDue()` : aucun champ, aucune migration. (12) « EN REMONTER D'AUTRES » — un bouton « Encore N » sur l'écran « c'est fait », et rien d'autre. La mécanique existait (`riseAdHoc`, la porte de secours, qui joue une séquence hors tirage sans rien écrire dans `batch`) : il ne manquait qu'une entrée. LES DEUX QUESTIONS DE FOND, TRANCHÉES AVANT DE CODER. Combien : UN lot, plafonné à `BATCH_SIZE()`, une fois par jour, et AUCUN bouton sur l'écran de rab — c'est cette dernière moitié qui garde debout le plafond de la v2.23 (« un rituel de 8 cartes ne se termine pas ») ; un bouton qui se resert rendrait `batchSize` décoratif. Lesquels : ceux que la règle aurait servis DEMAIN, jamais ceux qu'elle a écartés — on repasse par `drawables()` et `fillPool` TELS QUELS, donc mêmes exclusions (maturation 30 j, plancher 60 j, sourdines, dates à venir), même variété, même rotation par âge ; on retire seulement ce qui a déjà été servi aujourd'hui. Un rab qui puiserait ailleurs ne serait pas un extra, il ferait de la règle un délai qu'un bouton contourne. Le rab NE CONSOMME PAS LA JOURNÉE : `batch` n'est pas réécrit et `settings.frameDay` reste posé — c'est déjà ce que fait la porte de secours, on ne lui invente pas un second comportement. LE MARQUEUR « UNE FOIS PAR JOUR » SE DÉRIVE, pas de `settings.extraDay` : un rab servi laisse `lastSurfaced` sur un id qui n'est PAS dans `batch.ids`, et ça suffit à le reconnaître (§ 3). La limite est assumée et c'est la bonne : un rab ouvert puis abandonné sans qu'aucune carte n'ait été gardée ou classée ne laisse aucune trace, donc le bouton revient — rien n'ayant été consommé, c'est le comportement voulu. Le bouton porte quatre gardes, une par raison : `solde` et non `!list.length` (proposer d'en remonter d'autres à quelqu'un dont le tirage est vide de plein droit serait proposer de contourner la règle qu'on vient de lui expliquer deux lignes plus haut), pas pendant un rab, pas deux fois dans la journée, et pas de bouton quand le vivier est vide — un bouton visible qui n'ouvre rien est une affordance qui ment (leçon v2.41). En contour et non en aplat : l'aplat d'accent reste à l'action du jour, et l'accent ne peint pas de lettres (`--accent-deep`). VÉRIFIÉ : `node --check` sur app.js et sw.js ; le calcul de hauteur refait au crayon (ci-dessus) et le DOM entre en-tête et viewport relu ligne à ligne ; `--hdrh` n'est lu par AUCUNE ligne de JS, vérifié au grep ; `.rsgo.ghost` bat bien le `border:0` de `.rsgo` (0,2,0 contre 0,1,0) ; `--accent-deep` et `--border-2` existent dans les DEUX thèmes ; `riseExtraIds` passe par `drawables()`/`fillPool` sans réécrire une seule règle d'exclusion ; le rab n'écrit ni `batch` ni `frameDay`, relu dans `advance` (`adhocOn()` sort avant `batch.idx++`). NON VÉRIFIÉ, ET C'EST LA LIMITE DE CETTE LIVRAISON : rien n'a été ouvert dans un navigateur — le harnais local et son corpus vivent dans `.claude/`, absent de ce dépôt. Le geste, en particulier, ne se juge qu'au doigt : la mesure à faire est le glissé depuis le BAS de l'écran sur la remontée soldée, là où il mourait. À replacer aussi au pouce : le rab servi deux jours de suite, et le bloc « À ranger » un jour vide. À remplacer : app.js, styles.css, sw.js. index.html n'est PAS touché. Cache v112 -> v113.
   v3.16 — LA PHOTO IMPORTÉE ÉTAIT VISIBLE DANS LA LISTE ET ABSENTE DE SA PROPRE FICHE (ticket #24). Rapport au pouce, captures à l'appui : sur « Barre choco » (type PHOTO, importée depuis la galerie), la vignette s'affiche bien dans Non classés ; la fiche ouverte ne montre qu'un blason en pointillés et un pavé « fichier » avec le nom du .jpg. LA CAUSE EST UNE DIVISION QUE LA FICHE N'AVAIT JAMAIS APPRISE. Une photo importée n'a PAS de `preview` : `addImageFile()` écrit le pixel dans le magasin de médias (`setMedia(id,data)`) et laisse `it.preview` à null, `it.url` à null, `hasMedia` à vrai — c'est délibéré, un data-URL de 1600 px n'a rien à faire dans le blob des items. Les listes le savaient : `rowThumb()` pose un JETON `<div data-media=…>` que `hydrateMedia()` remplace par l'image une fois le magasin lu, et `galleryThumb()` fait pareil. `openGrainSheet()` ne le savait pas : son visuel dérive de `chosenCover = it.preview || ytThumb`, donc null, donc `drawIdent()` cachait `#gCover` et montrait le blason vide ; `hydrateMedia` n'est jamais appelée sur `#sheetList`, et le seul rappel du média était le `.gfile` — le NOM du fichier. La fiche affichait donc la seule chose que l'item n'est pas. CE QUI CHANGE, ET CE QUI NE CHANGE PAS. `mediaCover` est une variable D'AFFICHAGE SEULEMENT, lue une fois après le premier rendu (`getMedia(it.id)`, qui a son propre cache mémoire) et rendue par un second `drawIdent()` : la fiche s'ouvre tout de suite, l'image arrive quand le magasin répond. `drawIdent()` calcule désormais un `face = chosenCover || mediaCover` et le fait porter les cinq décisions qui dépendaient de `chosenCover` (couverture visible, source de l'image, blason posé dessus, blason seul, classe `nocov`). LE PIÈGE ÉTAIT DE PASSER PAR `chosenCover` — deux lignes de moins et tout aurait marché à l'écran : mais `chosenCover` entre dans `snap()` et s'écrit dans `it.preview` au `commit()`. Une simple OUVERTURE de fiche aurait donc (a) allumé « Enregistrer » sur une fiche que personne n'a touchée, et (b) recopié l'image en base64 DANS le blob des items à la première sauvegarde — soit le média stocké deux fois, et le champ nouveau que le § 3 du CLAUDE.md interdit. `mediaCover` n'est lu par aucune des deux fonctions d'écriture : la fiche reste « À jour » en s'ouvrant, et rien n'est écrit en base. Le vivier de la couche du visuel n'est pas nourri non plus (`cands` inchangé) — le média n'est pas un CANDIDAT de couverture, il EST l'item ; poser une couverture par-dessus reste possible et gagne, c'est ce que `face` dit dans cet ordre. Le pavé `.gfile` reste : il nomme le fichier, ce que l'image ne fait pas. Le correctif couvre le bureau sans une ligne de plus — `desktop-fiche.js` ENVELOPPE `openGrainSheet`, il ne la réécrit pas. VÉRIFIÉ : `node --check` sur app.js ; les cinq usages de `chosenCover` dans `drawIdent` basculés sur `face` et aucun autre (`setCover`, `delCoverThumb`, `getCover`, `snap()`, `commit()` inchangés, relus un par un) ; `getMedia` déjà chargée bien avant `openGrainSheet` ; la garde `editingGrain!==id` empêche une réponse lente de repeindre une fiche refermée ou rouverte sur un autre item. NON VÉRIFIÉ : rien n'a été ouvert dans un navigateur — le harnais local et son corpus vivent dans `.claude/`, absent de ce dépôt. À voir au pouce sur la vraie pile : l'image dans la fiche de « Barre choco », le fait que la fiche annonce toujours « À jour » à l'ouverture, et le cas d'une photo importée À LAQUELLE on a posé une couverture (la couverture doit gagner). Les vidéos et les sons importés gardent leur pavé de nom seul : la fiche n'a pas de lecteur, et ce ticket ne lui en invente pas un. À remplacer : app.js, sw.js. index.html et les CSS ne sont PAS touchés. Cache v113 -> v114.
   v3.17 — LA VIDÉO ET LE SON IMPORTÉS SE LISENT DEPUIS LEUR FICHE (ticket #25). Suite immédiate du #24, demandée au pouce : « fais pareil pour les vidéos et les sons importés ». La cause est LA MÊME — `addMediaFile()` écrit le fichier dans le magasin de médias et laisse l'item avec `hasMedia:true`, `url:null` — mais la réponse ne pouvait pas être la même, et c'est tout l'intérêt du ticket. UNE PHOTO A UN VISAGE, UNE VIDÉO A UN LECTEUR. Le #24 avait fait entrer la photo dans `#gCover`, qui est un `<img>` et le porte-visuel de la fiche (couverture, blason, couche du visuel) : y verser une vidéo aurait voulu dire soit une balise `<video>` déguisée en couverture, soit une vignette extraite au canevas, c'est-à-dire un travail et un champ pour montrer un objet qu'on veut ÉCOUTER ou REGARDER. Le lecteur descend donc sous le titre, au-dessus du pavé de nom de fichier, dans un bloc `.gplay` — le même endroit et le même ordre que dans la carte de remontée, où la forme a déjà été jugée. Ce qui change, en trois points. (a) `#gCover` et `mediaCover` NE SONT PAS TOUCHÉS : la garde du #24 reste `it.type==="image"`, donc une vidéo n'a toujours pas de couverture et son blason en pointillés reste la porte vers la couche du visuel — poser une couverture sur une vidéo reste possible et l'affiche, comme avant. (b) LE MÉDIA EST LU APRÈS LE PREMIER RENDU, comme la photo, et le jeton `.ph` est remplacé sur place par `<video controls playsinline>` ou `<audio controls>`. `hydrateMedia()` fait exactement ce remplacement ailleurs dans l'app et n'est POURTANT PAS appelée ici : elle ne connaît pas la fiche, donc pas la garde `editingGrain!==id` qui empêche une réponse lente de peindre un lecteur dans une fiche refermée ou rouverte sur un autre item — et le nœud de la feuille est RECYCLÉ d'un item à l'autre (`#sheetList`, `innerHTML` réécrit), ce qui rend cette course réelle et non théorique. Pour la même raison le jeton ne porte NI `data-media` NI `data-kind` : deux mécaniques qui se disputeraient le même nœud valent moins qu'une seule qui sait où elle est. (c) LE PAVÉ `.gfile` RESTE, sous le lecteur : il nomme le fichier, ce qu'un lecteur ne fait pas — c'est la même décision qu'au #24 pour la photo. AUCUNE COTE NOUVELLE dans le CSS : `.sheet .ident .gplay` reprend ligne pour ligne la géométrie de `.media` des cartes (même rayon, même bordure, `max-height:360px`, `aspect-ratio:16/9` sur l'attente, le pavé de 12 px pour le son) — la fiche ne réinvente pas une géométrie déjà validée. La classe s'appelle `.gplay` et non `.gmedia` parce que `.gcard .gmedia` existe déjà et désigne autre chose : deux objets qui portent le même nom finissent par se prendre une règle l'un de l'autre. Rien n'est écrit en base : ni `snap()` ni `commit()` ne lisent ce nœud, la fiche s'ouvre donc toujours sur « À jour ». Le bureau est couvert sans une ligne de plus — `desktop-fiche.js` enveloppe `openGrainSheet`. VÉRIFIÉ : `node --check` sur app.js ; les six règles ajoutées sont hors de toute `@media` et scopées `.sheet .ident`, donc sans effet sur `.gcard .gmedia` ni sur `.media` ; `editingGrain` est bien réaffecté à chaque ouverture ; le cas `!d` dit « média indisponible » comme `hydrateMedia`. NON VÉRIFIÉ : rien n'a été ouvert dans un navigateur — le harnais et son corpus vivent dans `.claude/`, absent du dépôt. À voir au pouce : un son et une vidéo importés depuis leur fiche, la lecture qui doit s'arrêter à la fermeture de la feuille (comportement natif du navigateur quand le nœud est retiré — À CONTRÔLER, c'est le seul point de ce ticket qui ne se lit pas dans le code), et la fiche qui doit annoncer « À jour » à l'ouverture. À remplacer : app.js, styles.css, sw.js. index.html n'est PAS touché. Cache v114 -> v115.
   v3.18 — LE NOM DU FICHIER SOUS L'IMAGE : UNE CARTE QUI NE DEVAIT PAS EN ÊTRE UNE, ET UNE ICÔNE SANS COTE (ticket #26). Rapport au pouce dès le #24 en ligne : « ça marche, mais pourquoi j'ai l'image au-dessus du texte et en dessous ce fichier .jpg dans une carte en gros avec une icône fichier générique ? ». DEUX DÉFAUTS SUPERPOSÉS, ET UN SEUL EST NOUVEAU. (a) L'ICÔNE GÉANTE EST ANTÉRIEURE, elle date de la v2.71 et personne ne l'avait vue parce que personne ne regardait ce pavé. `icon()` rend `<svg class="ic">` et `.ic` N'A AUCUNE TAILLE PAR DÉFAUT dans styles.css : chaque contexte pose la sienne, on en compte une trentaine. `.sheet .ident .gfile` n'en posait pas — le SVG prenait donc la taille par défaut d'un élément remplacé sans dimensions, soit toute la largeur disponible. C'est la contrepartie exacte de l'invariant « aucune cote posée depuis JS » : les cotes vivent dans le CSS, donc un contexte qui en oublie une n'obtient pas un défaut raisonnable, il obtient le défaut du navigateur. (b) LE POIDS VISUEL ÉTAIT UN CONTRESENS, et celui-là est de moi. Le #24 avait gardé le pavé en écrivant « il nomme le fichier, ce que l'image ne fait pas » — vrai en soi, faux à l'écran : une carte levée (fond, bordure, 10 px de padding) placée SOUS l'image dit « regarde ce fichier » juste après qu'on a montré le fichier. Le nom d'un import d'appareil photo — `1785405409341875230571420329172 8.jpg` — n'apprend d'ailleurs rien à personne. CE QUI CHANGE. Le pavé devient une LÉGENDE : plus de fond, plus de bordure, une ligne en mono 12,5 px de `--text-3`, l'icône ramenée à 14 px et alignée. Et surtout il ne s'affiche PLUS QUE S'IL APPREND QUELQUE CHOSE — `it.hasMedia && !it.title`. Un item titré (« Barre choco ») ne montre plus le nom du fichier : son identité est déjà écrite au-dessus. Un item SANS titre le garde, parce qu'alors le champ titre est vide et que le nom du fichier est la seule chose qui nomme l'objet. La condition est STATIQUE et non liée au média affiché : elle ne dépend d'aucune réponse asynchrone, donc pas de nœud qui apparaît ou disparaît une demi-seconde après l'ouverture. CE QUE ÇA COÛTE, dit franchement : un item TITRÉ dont le média est introuvable ne montre plus le nom du fichier — il montre le blason vide (photo) ou « média indisponible » (son, vidéo). C'est le cas rare d'un stockage abîmé, et la fiche n'y perd pas l'information utile, qui est que le média manque. Aucune valeur nouvelle : `--s1`, `--s2`, `--text-3` et le 14 px de l'icône sont ceux du reste de la feuille. Rien n'est écrit en base ; `snap()` et `commit()` ne connaissent pas ce nœud. VÉRIFIÉ : `node --check` sur app.js ; `.gfile` n'est rendu QU'À CET ENDROIT (`grep`), la règle jumelle `.sheet .gfld .gfile` de la ligne 840 est du CSS mort d'une fiche disparue et n'est PAS touchée ici ; les deux règles ajoutées sont hors de toute `@media`. NON VÉRIFIÉ : rien n'a été ouvert dans un navigateur. À voir au pouce : la fiche de « Barre choco » sans son pavé, et une photo SANS titre, qui doit garder sa ligne de nom. À remplacer : app.js, styles.css, sw.js. index.html n'est PAS touché. Cache v115 -> v116.
   v3.19 — LA LISTE MONTRAIT LE NOM DU FICHIER LÀ OÙ L'ITEM AVAIT UN TITRE (ticket #27). Rapport au pouce, deux captures : dans Non classés, la ligne de la photo se lit « 1785405409341875230571420329172 8.jpg » ; sa fiche, ouverte juste après, se lit « Barre choco ». Deux noms pour un seul item, et c'est la liste qui a tort. LA CAUSE. `rowHTML()` et `contentBlock()` ne passaient PAS par `displayText()` pour les types média : ils testaient `it.hasMedia ? it.content : displayText(it)` — donc dès qu'un média est stocké, le nom du fichier gagne, titre ou pas. Le repli était juste, la priorité était inversée. Le #26 avait déjà tranché la même question DANS LA FICHE, où le nom du fichier ne s'affiche plus que si `!it.title` ; la liste n'avait pas reçu la règle. CE QUI CHANGE. Une seule fonction, `mediaText(it)` = titre, sinon nom du fichier si média, sinon `labelFor()` — appelée aux deux endroits. Un item titré porte son titre partout (liste, grande carte, fiche, index, recherche : ces trois derniers passaient déjà par `displayText`) ; un item SANS titre garde le nom du fichier, qui reste la seule chose qui le nomme. Rien de nouveau en base, aucun champ, aucune migration : c'est une lecture, pas une écriture. VÉRIFIÉ : `node --check` sur app.js ; les deux seuls sites qui lisaient `it.content` sur un type média sont bien les deux corrigés (`grep hasMedia?it.content`, plus aucune occurrence) ; `mediaText` est une déclaration de fonction, donc hissée avant ses appels situés plus haut dans le fichier ; `galleryThumb`/`rowThumb` ne sont pas touchés — le visuel ne change pas. NON VÉRIFIÉ : rien n'a été ouvert dans un navigateur. À voir au pouce : « Barre choco » dans Non classés, et une photo sans titre, qui doit garder son nom de fichier. À remplacer : app.js, sw.js. index.html et les CSS ne sont PAS touchés. Cache v116 -> v117.
   v3.20 — LA PILE A SEMBLÉ PERDUE, ET DEUX DÉFAUTS SE PARTAGEAIENT LA PEUR (tickets #28 et #29). Rapport au pouce, en majuscules : « J'ai perdu tous mes items !!!! ». Ils n'étaient pas perdus. LE DIAGNOSTIC, D'ABORD, PARCE QU'IL COMMANDE LE RESTE. Une requête de lecture sur la table `kv` a montré `brain:v1:items` en DEUX exemplaires — 16 159 caractères écrits le 25 août, et 1 913 caractères écrits le jour même. Or `kv` est unique sur `(user_id, key)` : deux lignes pour une clé, ce sont deux COMPTES. La connexion de Sable est sans mot de passe et fabrique un compte par adresse ; une adresse saisie autrement ouvre une pile vide à côté de la vraie, sans rien détruire. Rien n'avait été supprimé, et les lignes de média étaient toutes intactes. (28) CE QUI A RENDU CE MALENTENDU INDISCERNABLE D'UNE PERTE, ET CE QUI L'AURAIT TRANSFORMÉ EN PERTE RÉELLE. Trois choses, dans cet ordre de gravité. (a) `loadState()` avalait toute erreur de `window.storage.get` — réseau coupé, session périmée, refus RLS — dans un `catch(e){items=[]}`. L'app démarrait donc sur une pile vide, exactement comme un compte neuf, sans jamais dire qu'elle n'avait pas su lire. C'est le SYMÉTRIQUE du défaut réparé en v2.66, où c'était l'écriture qui mentait : la leçon n'avait été appliquée qu'à une moitié du couple. (b) Pire, `startApp()` enchaînait sur `if(items.length===0)` un amorçage de cinq items de démonstration SUIVI d'un `saveItems()`. Une lecture ratée ne se contentait donc pas d'afficher du vide : elle ÉCRIVAIT ce vide par-dessus la pile, en cinq items de démonstration. Les 1 913 caractères du second compte sont exactement ça — l'amorçage, sur un compte neuf, là où il est légitime. (c) Rien à l'écran ne disait AVEC QUELLE ADRESSE on est connecté : ni l'en-tête, ni les Réglages, ni le pied. Le seul écran qui parle de compte est le bouton « Se déconnecter ». Une pile vide et un mauvais compte se présentaient donc au pouce sous une forme rigoureusement identique. LE CORRECTIF TIENT EN UN DRAPEAU ET UN POINT D'ARRÊT. `stateReady` ne passe à vrai qu'après une lecture CONFIRMÉE ; `_writeItems` refuse d'écrire tant qu'il est faux et rend `false`, que la chaîne de la v2.66 fait déjà remonter jusqu'au toast ; `startApp` affiche `showLoadFailure()` et RETOURNE, donc l'amorçage n'est même pas atteint. La garde est posée dans `_writeItems` et nulle part ailleurs : c'est le seul point par lequel passent les deux chemins de `saveItems` (immédiat et en attente, v2.88), donc aucun appelant n'a à s'en souvenir. Un JSON illisible est traité comme un ÉCHEC et non comme un vide — le texte d'origine est intact en base, le jeter serait la seule perte réelle de toute l'histoire. L'écran de panne est fabriqué en JS et n'ajoute aucun `id` au gabarit commun (l'invariant des 70 `id` n'a pas à grossir pour un écran de panne) ; ses cotes vivent dans styles.css, hors de toute `@media` — une panne de lecture n'a pas de largeur. Il porte l'adresse connectée, parce que c'est la première chose à vérifier, et une issue « Changer de compte ». Enfin les Réglages affichent une ligne « Compte » au-dessus de « Se déconnecter ». (29) LA LIGNE DE MÉDIA QUI RESTAIT APRÈS SA SUPPRESSION. Trouvée en lisant la même requête : deux lignes `brain:v1:media:…` à valeur `null`, écrites à 100 ms d'écart le 5 septembre — la signature d'une corbeille vidée. `purgeRow` et `emptyTrash` appelaient `setMedia(id,null)`, ce qui écrit un null au lieu d'enlever la ligne. Aucune donnée n'est perdue par là, l'item était bien supprimé ; mais la base garde une ligne par média disparu, et un plan gratuit se compte en lignes. `window.storage.delete` existait depuis le premier jour dans index.html et n'avait AUCUN appelant — vérifié par `grep` sur tout le dépôt. `delMedia()` l'appelle, et vide la clé du cache mémoire au lieu d'y poser null : `getMedia` teste `id in mediaCache`, donc un null mémorisé serait une réponse « pas de média » qu'on ne pourrait plus corriger. Les deux lignes déjà à null dans la vraie base ne sont PAS nettoyées par cette livraison : ce serait une écriture sur des données en ligne décidée depuis le code, et le § 6 du CLAUDE.md dit que la pile appartient à son propriétaire — deux `delete` en SQL suffisent, quand il le voudra. VÉRIFIÉ : `node --check` sur app.js et sw.js ; `setMedia(…,null)` n'a plus aucune occurrence ; `stateReady` est lu dans `_writeItems` et écrit seulement dans `loadState` ; `showLoadFailure` est idempotent (garde sur `.loadfail` déjà présent) ; `USER` est bien lisible depuis app.js, comme `_sb` l'est déjà à la déconnexion ; les règles CSS ajoutées sont hors de toute `@media` et n'introduisent aucune valeur nouvelle. NON VÉRIFIÉ, ET C'EST LE POINT FAIBLE DE CETTE LIVRAISON : rien n'a été ouvert dans un navigateur, et surtout l'écran de panne n'a JAMAIS ÉTÉ VU — le provoquer demande une lecture Supabase qui échoue, ce que le harnais local ne sait pas simuler. Sa mise en page est donc à juger au pouce, et le plus simple pour le faire est de couper le réseau au lancement. À voir aussi : la ligne « Compte » dans les Réglages, et le fait qu'une pile qui se lit normalement ne montre évidemment rien de tout ça. CE QUE ÇA NE RÈGLE PAS. Il n'y a toujours AUCUN repli local des items (dette ouverte depuis la v2.66) : hors réseau, l'app ne peut ni lire ni garder — elle le dit désormais dans les deux sens, c'est tout. Et rien n'empêche encore de créer un second compte par une faute de frappe dans l'adresse : le seul garde-fou livré ici est qu'on peut enfin LIRE quel compte on utilise. À remplacer : app.js, styles.css, sw.js. index.html n'est PAS touché. Cache v117 -> v118.
   v3.21 — LE MIROIR LOCAL, ÉCRIT APRÈS COUP ET APRÈS LA PERTE (ticket #31). CE QUI S'EST RÉELLEMENT PASSÉ, PARCE QUE C'EST LA JUSTIFICATION DE CETTE VERSION. Le 06/09/2026, entre 18:03 et 18:17 heure locale, la pile du compte principal a été DÉTRUITE par le défaut réparé en v3.20 quelques minutes trop tard : une lecture Supabase a échoué en silence, `loadState` a posé `items=[]`, l'amorçage de `startApp` a écrit ses cinq items de démonstration, et l'`upsert` a remplacé la valeur. Établi par la base elle-même : la ligne `brain:v1:items` du compte fait 1 913 caractères, contient les items de démonstration et AUCUN des items vus sur les captures d'écran de 18:03. Deux comptes existent, aucun troisième, aucune sauvegarde — plan gratuit, ni PITR ni instantané. Il n'y a rien eu à restaurer. La v3.20 a fermé la porte ; ce ticket-ci répond à la question suivante, la seule qui restait : POURQUOI N'Y AVAIT-IL NULLE PART UNE COPIE ? La réponse était écrite depuis la v2.66, en toutes lettres, dans ce journal : « il n'y a AUCUN repli local pour les items (seuls les réglages passent par localStorage) […] Un miroir localStorage rejoué au retour du réseau est le chantier suivant ». Le chantier suivant a attendu cinquante-cinq versions. CE QUE FAIT LE MIROIR. Il vit dans `localStorage`, sur l'appareil, sous `brain:v1:mirror`, et s'écrit à DEUX moments, tous deux confirmés : après une lecture réussie et après une écriture réussie, jamais sur un état non chargé (`stateReady`, la garde de la v3.20, est la même ici). Il porte l'`uid` du compte qui l'a écrit, et `readMirror` rend null pour tout autre compte — sans ça, deux comptes sur le même téléphone, qui est EXACTEMENT la configuration de ce foyer, se serviraient mutuellement une copie fausse. Il ne contient QUE les items : les médias pèsent des centaines de Ko pièce et feraient sauter le quota de 5 Mo dès la troisième photo. Un quota dépassé EFFACE le miroir au lieu d'en garder un tronqué — une copie incomplète qui se présente comme complète est pire que pas de copie. CE QU'IL NE FAIT PAS, ET C'EST LA DÉCISION PRINCIPALE. Il ne se réinjecte JAMAIS tout seul dans Supabase, et rien ne le lit pour peupler l'app. Une panne de lecture est le plus souvent passagère — réseau, jeton périmé — et un miroir qui se recopierait en base à ce moment-là écraserait une pile distante en bonne santé avec une copie plus ancienne : le sinistre de ce soir, à l'identique, dans l'autre sens. Il ne sait donc faire qu'une chose : rendre un FICHIER, que son propriétaire réimporte s'il le veut, quand il l'a décidé, par le chemin d'import qui existe déjà. Un bouton, pas une automatisation. OÙ IL SE VOIT. Sur l'écran « PILE NON LUE » de la v3.20, qui annonce le nombre d'items et la date de la copie puis propose « Enregistrer la copie locale » — c'est le seul écran où elle compte vraiment. Et dans Réglages, Données, une ligne « Copie locale » qui porte en permanence son compte et sa date, et l'enregistre en un geste : une sauvegarde dont on ignore l'existence ne rassure personne et ne se vérifie jamais. Quand il n'y a rien, la ligne dit « aucune » plutôt que de se taire — un silence se lirait comme « tout va bien ». Le téléchargement est extrait d'`exportData` en `downloadJson()`, utilisé par les deux. VÉRIFIÉ : `node --check` sur app.js ; `saveMirror` n'est appelé qu'après `stateReady=true` (lecture) et après un `storage.set` résolu (écriture) — les deux seuls sites, relus ; `readMirror` filtre sur l'`uid` et sur `Array.isArray(items)` ; `mirrorLabel`, `readMirror` et `exportMirror` sont des déclarations, donc hissées avant leurs appels plus haut dans le fichier ; aucune écriture vers Supabase n'a été ajoutée nulle part (`grep` sur `storage.set` : deux appelants, inchangés). NON VÉRIFIÉ : rien n'a été ouvert dans un navigateur. Le comportement au QUOTA dépassé n'est pas testé — il demande une pile de plusieurs mégaoctets, et le chemin d'échec efface le miroir, ce qui est le seul comportement sûr mais reste non observé. L'écran de panne n'a toujours jamais été vu, v3.20 comprise. CE QUE ÇA NE RÈGLE PAS, dit franchement : le miroir ne protège que l'appareil qui l'a écrit, il ne survit pas à un vidage des données de site, et il ne contient pas les médias — ce n'est pas une sauvegarde, c'est un dernier recours. La vraie réponse serait un instantané côté serveur, une ligne d'historique par écriture, que ce ticket n'aborde pas. À remplacer : app.js, sw.js. index.html et les CSS ne sont PAS touchés — l'écran de panne réutilise `.lfbtn`, posé en v3.20. Cache v118 -> v119.
*/
const APP_VERSION="v3.21";
/* Icônes : sprite unique icons.svg (voir ce fichier). icon('trash') renvoie le
   markup <use> ; la taille/couleur restent pilotées par le CSS selon le contexte. */
function icon(name,cls){return '<svg class="ic'+(cls?' '+cls:'')+'" aria-hidden="true"><use href="icons.svg#'+name+'"/></svg>';}
const KEY_ITEMS="brain:v1:items";
const KEY_BATCH="brain:v1:batch";
const KEY_SETTINGS="brain:v1:settings";
/* Ticket #31 — LE MIROIR LOCAL. Il vit dans localStorage, sur l'APPAREIL, et ne
   contient QUE les items : pas les médias, qui pèsent des centaines de Ko pièce
   et feraient sauter le quota de 5 Mo dès la troisième photo. Il porte l'`uid`
   du compte qui l'a écrit — sans ça, deux comptes sur le même téléphone (le cas
   qui a coûté cette soirée) se serviraient mutuellement une copie fausse. */
const KEY_MIRROR="brain:v1:mirror";
/* Chantier 17 : le défaut n'est plus "surface". L'app s'ouvrait sur le pilier 4 —
   la remontée — alors que le pilier 2 est l'accueil. `indexView` (chantier 18) est
   un SECOND réglage d'affichage, volontairement distinct de `pileView` : l'index
   et une liste d'items n'ont pas la même nature, basculer l'un ne bascule pas
   l'autre.
   Ménage du chantier 25 : `density` et `lastView` sont partis, et `pileView` ne
   vaut plus "feed" ni "last" — c'est désormais l'axe stocké, exactement comme
   `indexView`. Ce que le doigt a choisi survit au rechargement. */
const DEFAULT_SETTINGS={startTab:"categories",theme:"auto",batchSize:3,lastTab:"categories",iconRecents:[],catCovers:{},pileView:"list",indexView:"list",indexCols:2,indexSort:"az",pickSort:"recent",peekSize:3,anim:"sheen",catPins:[],catIcons:{},cats:[],pinnedViews:[],surfaceOn:true,surfaceFreq:"daily",surfaceDays:[0,1,2,3,4,5,6],mutedCats:[],frameDay:"",frameHour:7,frameMin:0,riseVoidStart:"stay"};
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
/* v2.97 — l'heure d'arrivée du cadre. C'est un SEUIL local, pas un réveil :
   rien ne tourne quand l'app est fermée. Bornée ici plutôt qu'à l'écriture,
   pour qu'une valeur aberrante venue du stockage ne puisse pas fermer la porte
   à vie. */
const frameHour=()=>{const h=Math.trunc(+settings.frameHour);return Number.isFinite(h)?Math.max(0,Math.min(23,h)):7;};
/* v2.99 — les minutes du seuil. Défaut 0 : un réglage existant vaut donc
   exactement ce qu'il valait, la v2.98 n'est pas réinterprétée. `frameMins`
   existe pour que la COMPARAISON ne soit écrite qu'une fois — deux notions
   de « l'heure dite » seraient le doublon que ce fichier passe son temps à
   payer, et celui-là serait invisible tant que les minutes valent 0. */
const frameMin=()=>{const m=Math.trunc(+settings.frameMin);return Number.isFinite(m)?Math.max(0,Math.min(59,m)):0;};
const frameMins=()=>frameHour()*60+frameMin();
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
    const k=dayKey(d);
    if(!batch.date||dayGap(batch.date,k)>=SURF_GAP[surfaceFreq()])return d;
  }
  return null;
}
function nextSurfaceLabel(){
  const d=nextSurfaceDate();if(!d)return"";
  const k=dayKey(d);
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
/* v2.59 : mêmes tiroirs pour Tags et Sources. Clés préfixées par le genre
   (`tag:` / `src:`) : un tag et une source de même nom ne partagent pas leur
   état d'ouverture, même si l'index n'en montre qu'une lentille à la fois. */
const idxOpen=new Set();
let idxPeekAll=new Set();
const idxKey=e=>e.kind+":"+e.k;
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
let indexCols=2;        /* v3.02 : la largeur des cartes, 1 / 2 / 3 — sans objet hors « cards » */
/* v2.49 : l'ORDRE de l'index, distinct de sa FORME. Un seul pour les trois
   lentilles — voir IDX_SORTS. */
let indexSort="az";
/* ticket #26 : l'ordre des sélecteurs de saisie, distinct de celui de l'index
   — voir PICK_SORTS. */
let pickSort="recent";
let lastTrashed=null;
let curTab="categories";   /* onglet affiché — porte la position de la piste (chantier 5) */

/* ---------- theme ---------- */
function effTheme(){return settings.theme==="auto"?((window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches)?"dark":"light"):settings.theme;}
let uiReady=false;
/* Ticket #24 — LA BARRE D'ÉTAT PREND LA COULEUR DU THÈME RENDU.
   Rapport : en v3.05, sur téléphone, un bandeau noir en haut de l'app avale
   l'heure et la date. Mesuré sur la capture — le bandeau vaut #14110C au pixel
   (`--bg` sombre) pendant que l'app rend #F6F2E9 (`--bg` clair) : la barre
   d'état annonçait un thème que l'écran ne rendait pas, et l'OS, lui, était en
   clair, donc il y peignait ses glyphes en NOIR. Noir sur noir.
   La cause n'est pas une couleur fausse, c'est une SOURCE fausse : les <meta>
   d'index.html se règlent sur `prefers-color-scheme`, c'est-à-dire sur le thème
   de l'OS, alors que le thème rendu est `settings.theme` — deux valeurs qui ne
   coïncident que par accident. (Et en PWA installée, la couleur vient d'abord du
   `theme_color` du manifeste, figé à la valeur sombre : c'est lui qui peignait
   ce noir-là. Il est passé au clair dans manifest.webmanifest.)
   Ici, la source redevient unique : la couleur est LUE sur le token `--bg` après
   la pose de `data-theme`, jamais recopiée en JS — styles.css reste seul maître
   de la palette. Les deux balises reçoivent la même valeur, ce qui rend leur
   `media` inerte après boot et évite de parier sur l'arbitrage du navigateur.
   `getPropertyValue` rend bien la NOUVELLE valeur dans le même tour que
   `setAttribute` — c'est la couleur PEINTE qui retarde, pas la variable.
   Pour l'enlever : supprimer cette fonction et son appel dans `applyTheme()`. */
function paintStatusBar(){
  const bg=getComputedStyle(document.documentElement).getPropertyValue("--bg").trim();
  if(!bg)return; /* feuille absente : mieux vaut la devinette des <meta> qu'une couleur vide */
  document.querySelectorAll('meta[name="theme-color"]').forEach(m=>m.setAttribute("content",bg));
}
function applyTheme(){document.documentElement.setAttribute("data-theme",effTheme());paintStatusBar();if(uiReady)renderAll();}
function applyAnim(){document.documentElement.setAttribute("data-anim",settings.anim||"sheen");}
function loadSettings(){
  try{
    const raw=localStorage.getItem(KEY_SETTINGS);
    if(raw)settings={...DEFAULT_SETTINGS,...JSON.parse(raw)};
    else{const legacy=localStorage.getItem(KEY_THEME);if(legacy)settings.theme=legacy;} /* migration ancien reglage theme */
    /* migration v2.23 : les valeurs de batchSize passent de 3/5/8 à 1/3/5 —
       un réglage sur 8 retombe sur 5, toute autre valeur hors jeu sur le défaut. */
    if(![1,3,5].includes(settings.batchSize))settings.batchSize=settings.batchSize>5?5:3;
    /* migration v2.50 : peekSize borné à {3,5,8}. Clé absente → défaut 3, par
       symétrie avec batchSize ; toute valeur hors jeu retombe sur 3. */
    if(![3,5,8].includes(settings.peekSize))settings.peekSize=3;
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
       bien avant `PILE_KEYS` : la liste est écrite en clair, comme la leçon de
       la v2.38 l'impose (le code de migration doit être autonome). */
    const VK=["list","grid","compact"];
    if(!VK.includes(settings.pileView))settings.pileView=VK.includes(settings.lastView)?settings.lastView:"list";
    /* v3.02 — L'INDEX ET MA PILE N'ONT PLUS LES MÊMES FORMES. Même discipline
       qu'au-dessus : les listes sont écrites en clair, ce bloc tourne bien
       avant IDX_KEYS. « Grille » devient « Cartes » à DEUX colonnes — c'est
       exactement le rendu d'hier, donc personne ne voit rien changer ; on ne
       migre pas vers un défaut plus beau, on migre vers l'identique. Et
       « Compact » retombe en liste, la forme dont il n'était que la version
       serrée. `idxAllForms` disparaît du STOCKAGE et pas seulement du code :
       `settings` se recharge par étalement, une clé sans lecteur serait
       réécrite à chaque `saveSettings()` (leçon v2.80). */
    if(settings.indexView==="grid"){settings.indexView="cards";if(settings.indexCols==null)settings.indexCols=2;}
    else if(settings.indexView==="compact")settings.indexView="list";
    const IV=["cards","mosaic","list"];
    if(!IV.includes(settings.indexView))settings.indexView="list";
    if([1,2,3].indexOf(settings.indexCols)<0)settings.indexCols=2;
    delete settings.idxAllForms;
    /* v2.49 : l'ordre de l'index. Même discipline — la liste est écrite en clair,
       ce bloc tourne avant IDX_SORT_KEYS. Une installation d'avant la v2.49 n'a
       pas la clé : elle prend le défaut, il n'y a rien à migrer. */
    const IS=["size","az","za"];
    if(!IS.includes(settings.indexSort))settings.indexSort="az";
    /* ticket #26 : l'ordre de la saisie. Même discipline — liste en clair, ce
       bloc tourne avant PICK_SORT_KEYS. Une installation d'avant n'a pas la
       clé : elle prend le défaut, il n'y a rien à migrer. */
    const PS=["recent","used","az"];
    if(!PS.includes(settings.pickSort))settings.pickSort="recent";
    delete settings.lastView;delete settings.density;
    /* Ménage v2.80 : la recherche d'image des v2.78/v2.79 est retirée. `settings`
       est rechargé par étalement de ce qui est stocké (`...JSON.parse(raw)`),
       donc une clé que plus personne ne lit serait RÉÉCRITE à chaque
       `saveSettings()` — et `unsplashKey` est une clé d'API qui n'aurait plus
       aucune UI pour la retirer. Un réglage sans lecteur doit disparaître du
       stockage, pas y dormir. Sans effet sur une installation qui n'a jamais vu
       ces versions : on supprime une clé absente. */
    delete settings.unsplashKey;delete settings.imgBank;
  }catch(e){}
  applyTheme();applyAnim();
}
/* v2.76 — rend un booléen. Le catch était muet : un quota dépassé passait pour
   une écriture réussie, exactement la faute que la v2.66 a corrigée dans
   saveItems(). Les ~90 appelants existants ignorent la valeur de retour, ils ne
   changent donc pas de comportement ; seul setCatCover la lit, parce que lui
   seul écrit quelque chose d'assez lourd pour se faire refuser. */
function saveSettings(){try{localStorage.setItem(KEY_SETTINGS,JSON.stringify(settings));return true;}catch(e){return false;}}
/* ---------- ticket #31 : le miroir local ----------
   CE QU'IL EST, ET CE QU'IL N'EST PAS. Il est une COPIE DE SECOURS, pas une
   source : rien ne lit le miroir pour peupler l'app, et il ne se réécrit JAMAIS
   tout seul dans Supabase. C'est délibéré. Une panne de lecture est le plus
   souvent passagère (réseau, jeton périmé) ; un miroir qui se recopierait en
   base à ce moment-là écraserait une pile distante en bonne santé avec une
   copie plus ancienne — exactement le sinistre qu'on répare, dans l'autre sens.
   Il ne sait donc faire qu'une chose, et elle suffit : rendre un FICHIER, que
   son propriétaire réimporte s'il le veut, quand il l'a décidé.
   Il s'écrit à deux moments, tous deux CONFIRMÉS : après une lecture réussie et
   après une écriture réussie. Jamais sur un état non chargé — `stateReady` est
   la même garde qu'en v3.20. */
function saveMirror(){
  if(!stateReady)return false;
  let uid=null; try{uid=(window.USER&&USER.id)||null;}catch(e){}
  if(!uid)return false;
  try{
    localStorage.setItem(KEY_MIRROR,JSON.stringify({at:Date.now(),uid,n:items.length,items}));
    return true;
  }catch(e){
    /* Quota dépassé : on ne garde pas un miroir tronqué, qui serait pire qu'aucun
       — il rendrait un export incomplet en se présentant comme complet. */
    try{localStorage.removeItem(KEY_MIRROR);}catch(e2){}
    console.error("[saveMirror]",e);
    return false;
  }
}
/* Le miroir d'un AUTRE compte n'est pas une copie de secours, c'est un piège :
   il est rendu null plutôt que servi. */
function readMirror(){
  let uid=null; try{uid=(window.USER&&USER.id)||null;}catch(e){}
  try{
    const raw=localStorage.getItem(KEY_MIRROR); if(!raw)return null;
    const m=JSON.parse(raw);
    if(!m||!Array.isArray(m.items))return null;
    if(!uid||m.uid!==uid)return null;
    return m;
  }catch(e){return null;}
}
/* Le libellé de la ligne des Réglages : une date lisible, ou l'aveu qu'il n'y a
   rien — jamais un silence, qui se lirait comme « tout va bien ». */
function mirrorLabel(){
  const m=readMirror();
  if(!m)return "aucune";
  return m.items.length+" items · "+new Date(m.at).toLocaleDateString("fr-FR");
}
function exportMirror(){
  const m=readMirror(); if(!m)return false;
  try{
    downloadJson({app:"sable",version:1,exportedAt:new Date().toISOString(),
      mirroredAt:new Date(m.at).toISOString(),items:m.items,media:{}},
      "sable-copie-locale-"+new Date(m.at).toISOString().slice(0,10)+".json");
    return true;
  }catch(e){console.error("[exportMirror]",e);return false;}
}
function toggleTheme(){settings.theme=effTheme()==="dark"?"light":"dark";applyTheme();saveSettings();}
loadSettings();
if(window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").addEventListener){
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{if(settings.theme==="auto")applyTheme();});
}

/* ---------- storage ---------- */
/* Ticket #28 — UNE LECTURE QUI ÉCHOUE N'EST PAS UNE PILE VIDE. `loadState`
   avalait toute erreur de `window.storage.get` — réseau, session périmée, refus
   RLS — dans un `catch` qui posait `items=[]`. L'app démarrait alors sur une
   pile vide indiscernable d'un compte neuf, et la PREMIÈRE écriture (celle de
   l'amorçage juste en dessous, ou n'importe quel enregistrement) partait
   écraser la ligne `brain:v1:items` avec ce vide. C'est le symétrique exact du
   défaut d'ÉCRITURE réparé en v2.66 : là c'était l'écriture qui mentait, ici
   c'est la lecture. `stateReady` ne passe à vrai qu'après une lecture
   CONFIRMÉE ; tant qu'il est faux, aucune écriture d'items ne part (garde dans
   `_writeItems`) et l'app refuse de démarrer (`showLoadFailure`). Un JSON
   illisible est traité comme un échec, pas comme un vide : le texte d'origine
   est intact en base, le jeter serait la seule perte réelle. */
let stateReady=false;
async function loadState(){
  let raw=null;
  try{const r=await window.storage.get(KEY_ITEMS); raw=r&&r.value?r.value:null;}
  catch(e){console.error("[loadState] lecture",e);stateReady=false;return false;}
  try{items=raw?JSON.parse(raw):[];}
  catch(e){console.error("[loadState] JSON",e);stateReady=false;return false;}
  items=items.map(normalizeItem);
  stateReady=true;
  saveMirror();   /* ticket #31 : une lecture confirmée est une copie de bonne foi */
  try{const r=await window.storage.get(KEY_BATCH); if(r&&r.value)batch=JSON.parse(r.value);}
  catch(e){}
  return true;
}
/* v2.66 — une écriture qui échoue doit se voir. saveItems avalait toute erreur
   Supabase (réseau coupé, session périmée, refus RLS) et rendait la main comme
   si de rien n'était : l'appelant fermait la feuille et disait « Item mis à
   jour » sur un enregistrement qui n'avait jamais eu lieu. Elle rend désormais
   un booléen ; les chemins qui soldent un état (dirty, fermeture, toast) le
   consultent avant de solder. */
/* v2.88 — UNE ÉCRITURE À LA FOIS, UNE SEULE EN ATTENTE. Chaque appel envoie le
   tableau ENTIER en un aller-retour Supabase. Dix appels rapprochés (le
   rattrapage d'aperçus au démarrage en lance jusqu'à 25) c'étaient dix
   aller-retours concurrents du même gros JSON, qui se disputaient le lien du
   téléphone et pouvaient s'écraser dans le désordre. Comme la charge est
   TOUJOURS l'état courant au moment de l'envoi, une écriture en attente suffit
   à couvrir tous les appels arrivés pendant celle qui est en vol : ils reçoivent
   le résultat de la suivante, donc d'une écriture qui contient bien leur
   mutation. Le contrat de la v2.66 est intact — le booléen dit toujours si CE
   qu'on a modifié est parti. */
let _wrBusy=false,_wrPend=null;
function saveItems(){
  if(_wrBusy){
    if(!_wrPend){let r;const p=new Promise(x=>{r=x;});_wrPend={p,done:r};}
    return _wrPend.p;
  }
  _wrBusy=true;
  return _writeItems().then(ok=>{
    _wrBusy=false;
    const pend=_wrPend;_wrPend=null;
    if(pend)saveItems().then(pend.done);
    return ok;
  });
}
/* Ticket #28 — LA GARDE EST ICI, au seul endroit qui écrit la pile entière :
   les deux chemins de `saveItems` (immédiat et en attente) y passent, et aucun
   appelant n'a à s'en souvenir. Refuser rend `false`, que la v2.66 fait déjà
   remonter jusqu'au toast — l'app dit qu'elle n'a pas enregistré au lieu de
   détruire en silence. */
async function _writeItems(){
  if(!stateReady){console.error("[saveItems] refusé : la pile n'a jamais été lue");return false;}
  try{await window.storage.set(KEY_ITEMS,JSON.stringify(items));saveMirror();return true;}catch(e){console.error("[saveItems]",e);return false;}
}
const SAVE_FAIL_MSG="Pas enregistré — réseau ou session.";
/* Un rendu complet coalescé sur l'image suivante : le rattrapage d'aperçus
   appelait renderAll() une fois par item enrichi, soit N reconstructions de la
   pile ET de l'index pour un seul écran qu'on ne voit qu'une fois peint. */
let _rsQ=false;
function renderSoon(){if(_rsQ)return;_rsQ=true;requestAnimationFrame(()=>{_rsQ=false;renderAll();});}
async function saveBatch(){try{await window.storage.set(KEY_BATCH,JSON.stringify(batch));}catch(e){}}

/* ---------- helpers ---------- */
/* v2.97 — LE JOUR EST LOCAL. `toISOString` rend le jour UTC : à Paris la date
   basculait à 01 h l'hiver et 02 h l'été, donc une session de nuit consommait
   le lendemain. Un seul formateur pour tout le fichier — deux notions de
   « jour » seraient le doublon que ce fichier passe son temps à payer. */
const dayKey=d=>{const p=n=>String(n).padStart(2,"0");return d.getFullYear()+"-"+p(d.getMonth()+1)+"-"+p(d.getDate());};
const todayStr=()=>dayKey(new Date());
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
/* v2.52 — un nom de catégorie SAISI ne doit pas fabriquer une jumelle. Les
   catégories se comparent par chaîne exacte, contrairement aux tags que `tagKey`
   plie : « fonts » créerait une seconde case à côté de « Fonts » et l'index en
   montrerait deux. On retombe sur l'existante quand elle existe — casse et
   accents pliés — et on garde la frappe telle quelle sinon : c'est l'utilisateur
   qui nomme. À utiliser partout où une catégorie est TAPÉE, jamais où elle est
   choisie dans une liste. */
function resolveCat(raw){
  const v=String(raw||"").trim();
  if(!v)return null;
  const k=tagKey(v);
  return allCats().find(c=>tagKey(c)===k)||v;
}
/* bibliotheque de tags : derivee des grains, triee par frequence. Aucun reglage. */
function tagLib(){
  const c=tagCounts();
  return Object.keys(c).sort((a,b)=>c[b]-c[a]||a.localeCompare(b,"fr"));
}
/* Bibliothèque des sources, dérivée comme celle des tags : rien à régler,
   rien à stocker. La donnée existait déjà, elle n'était pas exploitée. */
function srcLib(){
  const c={};items.forEach(i=>{if(i.status!=="trashed"){const s=sourceOf(i);if(s)c[s]=(c[s]||0)+1;}});
  return Object.keys(c).sort((a,b)=>c[b]-c[a]||a.localeCompare(b,"fr"));
}
function srcCount(s){return items.filter(i=>i.status!=="trashed"&&sourceOf(i)===s).length;}
/* ---------- ticket #26 : le DERNIER USAGE d'une catégorie, d'un tag ----------
   Entièrement DÉRIVÉ de `items` : la date d'une catégorie est le `createdAt` du
   plus récent item qui la porte. Aucun champ, aucune migration (§ 3 de
   CLAUDE.md). Limite assumée et à dire : reclasser un vieil item ne remonte pas
   sa catégorie, parce que le RANGEMENT n'est pas horodaté — seule la capture
   l'est. L'horodater coûterait un champ par item et une migration pour un
   écart que le compteur d'usage rattrape déjà.
   Les corbeillés sont écartés comme partout ailleurs : une catégorie ne doit
   pas remonter grâce à ce qu'on a jeté. */
function catLastUse(){const m={};for(const i of items){if(i.status==="trashed"||!i.domain)continue;const t=i.createdAt||0;if(t>(m[i.domain]||0))m[i.domain]=t;}return m;}
function tagLastUse(){const m={};for(const i of items){if(i.status==="trashed")continue;const t=i.createdAt||0;for(const g of(i.tags||[]))if(t>(m[g]||0))m[g]=t;}return m;}
function tagCounts(){const c={};items.forEach(i=>{if(i.status!=="trashed")(i.tags||[]).forEach(t=>{c[t]=(c[t]||0)+1;});});return c;}
function enterSource(src){
  pileLoc="all";typeFilter="all";tagFilter="";pileQuery="";sourceFilter=src;dormantFocus=false;
  const s=document.getElementById("searchInput");if(s)s.value="";
  openScopePage();          /* v2.55 — surface, comme catégorie et tag */
}
function hasTag(it,t){return (it.tags||[]).some(x=>tagKey(x)===tagKey(t));}
function fmtDay(ts){try{return new Date(ts).toLocaleDateString("fr-FR",{day:"numeric",month:"long",year:"numeric"});}catch(e){return"";}}
function toDateInput(ts){const d=new Date(ts);return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");}
/* badges de liste : les tags et la date de remontee, s'il y en a */
function tagMinis(it){return (it.tags||[]).map(t=>`<span class="mini tag">#${esc(t)}</span>`).join("");}
/* v2.83 — une date ÉCHUE ne contraint plus rien, elle ne doit donc plus rien
   afficher. Le test ne comparait pas la date à maintenant : « pas avant le
   3 mars » restait posé pour toujours, et depuis la v2.70 ce badge est la seule
   chose colorée de la ligne. La date se consomme au rituel (v2.82) ; d'ici là,
   ne rien dire vaut mieux que dire une contrainte qui n'existe plus. */
function whenMini(it){return (it.surfaceAfter&&it.surfaceAfter>Date.now()&&surfaceOn())?`<span class="mini when">pas avant le ${esc(fmtDay(it.surfaceAfter))}</span>`:"";}
/* État de la pile — buckets disjoints par âge, tout calculé à la volée (aucun
   historique stocké). « Jamais remontés » = jamais vus ET capturés depuis moins
   de 6 mois (Surface va y venir). « Dormants » = 6 mois et plus sans jamais
   resurgir. Disjoints par l'âge : un même grain ne compte jamais deux fois. */
const SIX_MO=182*86400000;
/* Échelle du tirage (chantier 21) : maturation 30 j (sorti de « Ce mois » de
   l'historique, donc plus sous les yeux) · plancher de re-remontée 60 j · dormant
   180 j (SIX_MO, déjà utilisé). Aucun champ nouveau, tout calculé à la volée. */
const MATURE_MS=30*DAY_MS;
/* v2.83 — LE PLANCHER DEVIENT UNE ROTATION. 60 j en dur supposait une pile d'au
   moins 180 items (3 cartes × 60 jours) ; en dessous, le rituel épuisait ses
   jamais-remontés puis se taisait des semaines, par salves. La vraie règle n'est
   pas temporelle mais de COUVERTURE — « pas avant que tout le reste soit passé »
   —, et elle s'obtient en piochant par dernière remontée la plus ancienne : le
   plancher devient alors ÉMERGENT et suit la taille du vivier, 13 jours sur 40
   items, 60 sur 180, sans qu'aucun chiffre ne le décide. Ne survit qu'un
   plancher MINIMUM, pour qu'une pile de cinq items se taise au lieu de devenir
   un tapis roulant. */
const RESURFACE_MIN_MS=14*DAY_MS;
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
function normalizeItem(it){if(!Array.isArray(it.tags))it.tags=[];it.tags=it.tags.map(normTag).filter(Boolean);if(it.surfaceAfter===undefined)it.surfaceAfter=null;if(!it.type)it.type=it.url?detectType(it.url).type:"note";if(it.hasMedia===undefined)it.hasMedia=false;if(it.title===undefined)it.title=null;if(it.title)it.title=decodeEnt(it.title);if(it.preview===undefined)it.preview=null;if(it.note===undefined)it.note="";if(!Array.isArray(it.previews))it.previews=[];if(it.iconTint===undefined)it.iconTint="ocre";/* v2.67 — icone et couverture sont deux champs. Migration : un preview
     Iconify etait une icone qui occupait la place de la photo, il devient
     it.icon ; le vivier previews ne garde que des photos. */
  /* v3.04 — `body` : le texte d'origine d'une capture dont le titre a été
     raccourci (voir splitLongTitle). Absent sur tout ce qui précède la v3.04 —
     c'est voulu, la découpe ne réécrit pas l'existant. Aucune migration : les
     items sont un seul blob JSON, un champ de plus n'est qu'une clé de plus. */
  if(it.body===undefined)it.body=null;
  if(it.icon===undefined)it.icon=null;
  if(it.icon)it.icon=iconBase(it.icon);
  if(it.preview&&isIcon(it.preview)){if(!it.icon)it.icon=iconBase(it.preview);it.preview=null;}
  it.previews=it.previews.filter(u=>u&&!isIcon(u));
  return it;}
function slotIntoBatch(it){if(batch.date===todayStr()&&!batch.ids.includes(it.id)){batch.ids.splice(batch.idx,0,it.id);saveBatch();}}
async function getMedia(id){if(id in mediaCache)return mediaCache[id];try{const r=await window.storage.get(KEY_MEDIA+id);mediaCache[id]=r&&r.value?r.value:null;}catch(e){mediaCache[id]=null;}return mediaCache[id];}
async function setMedia(id,data){try{const ok=await window.storage.set(KEY_MEDIA+id,data);mediaCache[id]=data;return !!ok;}catch(e){console.error(e);return false;}}
/* Ticket #29 — SUPPRIMER, C'EST SUPPRIMER LA LIGNE. Les deux chemins de
   suppression définitive appelaient `setMedia(id,null)` : la ligne `kv` restait,
   avec une valeur nulle. Trouvé dans la vraie base, deux lignes
   `brain:v1:media:…` à `null` écrites à 100 ms d'écart — la trace d'une
   corbeille vidée. Ce n'est pas une perte (l'item était bien supprimé) mais
   c'est un mensonge de comptage : la base garde une ligne pour un média qui
   n'existe plus, et le quota du plan se compte sur des lignes. `storage.delete`
   existe depuis toujours dans index.html et n'avait AUCUN appelant. Le cache
   mémoire est vidé par `delete`, pas mis à null : `getMedia` teste `id in
   mediaCache`, donc un null en cache est une réponse mémorisée « pas de média »
   — juste ici, mais qui empêcherait de reprendre le même id plus tard. */
async function delMedia(id){
  try{await window.storage.delete(KEY_MEDIA+id);delete mediaCache[id];return true;}
  catch(e){console.error("[delMedia]",e);return false;}
}
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
   4. Rotation par dernière remontée (v2.83, remplace le plancher de 60 j) : les
      déjà-vus repassent du moins récemment vu au plus récemment vu, jamais avant
      un plancher minimum de 14 j. Un item ne revient donc qu'une fois tout le
      reste passé, à n'importe quelle taille de pile. Si les candidats manquent,
      c'est la taille du tirage qui cède, jamais le plancher minimum.
   Exclus : corbeille · mis de côté · sourdine · surfaceAfter future · non mûrs ·
   remontés depuis moins de 14 j. */
/* v2.82 — CE QUE LE TIRAGE PEUT VOIR, ÉNONCÉ UNE SEULE FOIS. Les quatre règles
   ci-dessus vivaient dans buildBatch ; ensureBatch, elle, en tenait sa PROPRE
   version — échu ou sans date, hors sourdine, et rien d'autre. Elle ignorait
   donc la maturation et le plancher de 60 j, si bien qu'un tirage LÉGITIMEMENT
   vide (rien de mûr, ou tout revu récemment) lui paraissait raté : sa branche
   de réparation le reconstruisait à chaque passe de rendu, une écriture de
   `batch` par passe, sans jamais converger. Deux lectures d'une même règle,
   c'était le doublon que ce fichier passe son temps à payer. */
function drawables(){
  const now=Date.now();
  const active=items.filter(i=>i.status==="active");
  // 1. Les échus d'abord.
  const due=active.filter(i=>i.surfaceAfter&&i.surfaceAfter<=now);
  // Vivier commun : mûrs, sans date future, hors sourdine.
  const mature=active.filter(i=>!i.surfaceAfter&&!isMuted(i)&&(now-i.createdAt)>=MATURE_MS);
  // Primaire : jamais remontés. Secours : les déjà-vus, en rotation, au besoin seulement.
  return {due,
          fresh:mature.filter(i=>i.surfaceCount===0),
          again:mature.filter(i=>i.surfaceCount>0&&(now-(i.lastSurfaced||0))>=RESURFACE_MIN_MS)};
}
const drawableCount=()=>{const d=drawables();return d.due.length+d.fresh.length+d.again.length;};
function buildBatch(){
  const d=drawables();
  const out=d.due.sort((a,b)=>a.surfaceAfter-b.surfaceAfter).slice(0,BATCH_SIZE());
  fillPool(out,d.fresh);
  /* Le vivier de secours ne se trie PAS par âge de capture : sa clé de rotation
     est la dernière remontée. Sans ce second ordre, « un tour complet » ne veut
     rien dire — on repasserait toujours par les plus vieilles captures. */
  if(out.length<BATCH_SIZE())fillPool(out,d.again,it=>it.lastSurfaced||0);
  batch={date:todayStr(),ids:out.map(i=>i.id),idx:0};
  saveBatch();
}
/* Remplit `out` depuis un vivier en gardant la variété — une catégorie, puis une
   source, avant de se répéter — et en remontant le temps : plus ancienne capture
   d'abord dans chaque catégorie. Pas de hasard dans l'ordre : la rotation par âge
   est le sens même du chantier 21 ; seule la catégorie de tête est tirée au sort. */
function fillPool(out,pool,key){
  if(out.length>=BATCH_SIZE()||!pool.length)return;
  const rank=key||(it=>it.createdAt||0);
  const groups={};
  for(const it of pool){(groups[it.domain||"__none__"]??=[]).push(it);}
  for(const k in groups)groups[k].sort((a,b)=>rank(a)-rank(b)); // le plus ancien selon la clé de rotation
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
  /* La branche de réparation ne se déclenche plus que si le tirage du jour est
     vide ALORS QU'il y avait de quoi le remplir — même règle que buildBatch,
     donc un tirage vide de plein droit reste vide et ne se réécrit pas. */
  if(batch.date===todayStr()){if(batch.ids.length===0&&drawableCount()>0)buildBatch();return;}
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
/* ═══ v3.04 — LE TITRE LONG, COUPÉ À LA SOURCE ═══════════════════════════
   Une capture Instagram rapporte la LÉGENDE ENTIÈRE dans le titre. Mesuré sur
   une vraie pile (73 items) : 9 titres dépassent 150 caractères, jusqu'à 1301.
   Et `displayText()` alimente les listes, l'index, la recherche et la remontée
   — un titre de 1301 caractères pollue donc TOUTE l'app, pas seulement la fiche.

   Les 9 cas suivent le MÊME motif, sans exception : `Auteur on Instagram: "…"`.
   La règle peut donc être précise au lieu d'être approximative.

   CE QU'ELLE FAIT : le titre devient la première phrase de la légende (90 car.
   au plus, coupés au mot) ; `body` reçoit la légende ENTIÈRE, préfixe d'auteur
   compris. On garde le tout, pas le reste : un titre modifié à la main ne doit
   jamais rendre le texte d'origine irrécupérable.

   CE QU'ELLE NE FAIT PAS : toucher aux items déjà en pile. La découpe n'a lieu
   qu'à la capture. Réparer l'existant est une écriture dans les données de
   quelqu'un — ça se décide à part, et ça n'est pas décidé.                   */
const SOCIAL_RE=/^(.{1,80}?)\s+on\s+(Instagram|Threads|X|Facebook|TikTok|LinkedIn)\s*:\s*[«"'"'']?\s*/i;
const TITLE_MAX=90;
function splitLongTitle(raw){
  const full=String(raw||"").trim();
  if(!full)return null;
  const m=full.match(SOCIAL_RE);
  /* corps = la légende sans le préfixe d'auteur, guillemet fermant retiré */
  /* Les sauts de ligne sont CONSERVÉS à ce stade : dans une légende, un retour
     à la ligne EST une fin de phrase, souvent la seule (« …au monde\nBien cuire
     sur une poêle… » n'a pas de point). Les écraser avant de chercher la
     frontière détruisait justement ce qu'on cherche. */
  const corps=m?full.slice(m[0].length).replace(/[»"'"'']\s*$/,"").trim():full;
  const plat=s=>s.replace(/\s+/g," ").trim();
  /* La découpe par frontière ne s'applique QU'aux légendes sociales et aux
     titres trop longs. Un titre de page ordinaire — « Hop.Earth - Play the
     World! » — n'a rien à se faire couper à son premier point. */
  const decoupable=!!m||plat(corps).length>TITLE_MAX;
  /* DEUX frontières, et elles n'ont pas le même statut — c'est ce que les vrais
     titres ont appris :
       · le RETOUR À LA LIGNE sépare l'accroche du bloc de hashtags
         (« Motion editors are COOKED \n\n#motion #video »). On coupe toujours
         là : ce qui suit n'a jamais sa place dans un titre. Sauf si ce qui
         précède est trop maigre pour nommer quoi que ce soit.
       · la FIN DE PHRASE n'est qu'un RECOURS, quand le texte ne tient pas.
         L'appliquer systématiquement donnait « Great. » sur une légende de
         33 caractères qui tenait entière. */
  const MIN=15;
  /* ponctuation forte, éventuellement collée au mot suivant (« obsessed!This »),
     d'où la majuscule acceptée comme frontière */
  const pp=corps.search(/[.!?…](\s|$|[A-ZÀ-Ý])/);
  const pn=corps.search(/\n/);
  /* Les deux candidates sont à ÉGALITÉ et la PLUS PROCHE gagne. Donner la
     priorité au saut de ligne coupait « …obsessed! » au milieu de la phrase
     suivante, parce que le bloc de hashtags venait 170 caractères plus loin.
     Le seuil MIN écarte les frontières trop précoces : sans lui, « Great.
     Street musicians in Munich » — qui tient entier — devenait « Great. ». */
  const bornes=decoupable?[pp>=MIN?pp+1:-1,pn>=MIN?pn:-1].filter(x=>x>0):[];
  let court=bornes.length?plat(corps.slice(0,Math.min(...bornes))):plat(corps);
  if(court.length>TITLE_MAX){
    const c=plat(corps).slice(0,TITLE_MAX),sp=c.lastIndexOf(" ");
    court=((sp>40?c.slice(0,sp):c).trim())+"…";
  }
  /* La traîne de hashtags part toujours — elle n'informe pas, elle encombre,
     et c'est exactement la « pollution visuelle » qu'on vient corriger. Elle
     survit dans `body`, donc la recherche la retrouve. Le garde-fou MIN évite
     de vider un titre qui ne serait QUE des hashtags. */
  const sansTags=court.replace(/(\s*#[^\s#]+)+\s*$/u,"").trim();
  if(sansTags.length>=MIN)court=sansTags;
  if(!court||court===full)return null;   /* rien n'a changé : ne rien toucher */
  /* le texte d'origine ne tenait pas dans le titre : on le garde à côté.
     On garde le TOUT, pas le reste — un titre modifié à la main ne doit jamais
     rendre la légende d'origine irrécupérable. */
  const garde=court.replace(/…$/,"").length<plat(corps).length;
  return {title:court,body:garde?full:null};
}

/* Réparation de l'existant. La découpe n'agit qu'à la capture : les items déjà
   en pile gardent leur titre d'origine, et sur une pile constituée ça saute aux
   yeux — des lignes entières de légende Instagram dans la liste.
   `dry` rend la liste des items concernés SANS rien écrire : c'est ce qui permet
   d'annoncer un compte et des exemples avant de demander confirmation. */
function repairTitles(dry){
  const touches=[];
  items.forEach(it=>{
    if(!it.title)return;
    const s=splitLongTitle(it.title);
    if(!s)return;
    touches.push({it,avant:it.title,apres:s.title,body:s.body});
  });
  if(dry)return touches;
  touches.forEach(t=>{
    /* `body` d'abord, titre ensuite : si l'écriture échoue on n'aura pas perdu
       le texte d'origine en cours de route. Et jamais d'écrasement d'un body
       existant — il vaut toujours mieux que ce qu'on recalculerait. */
    if(t.body&&!t.it.body)t.it.body=t.body;
    t.it.title=t.apres;
  });
  return touches;
}

async function addItem(raw,meta){
  const v=raw.trim();if(!v)return;
  const d=detectType(v);
  /* Déjà en pile : pas de second item, un chemin vers l'existant. La vérif est un
     balayage synchrone — elle ne retarde pas la capture optimiste des cas neufs. */
  if(d.url){const dup=findDup(d.url);if(dup){toast("Déjà en pile.",{label:"voir",fn:()=>openGrainSheet(dup.id)});return dup.id;}}
  let title=null,body=null;
  if(meta&&meta.title){const t=String(meta.title).trim();if(t&&t!==v)title=t;}
  /* v3.04 — la découpe, ici et nulle part ailleurs : c'est le seul endroit où
     un titre rapporté par fetchMeta entre dans la pile. */
  if(title){const s=splitLongTitle(title);if(s){title=s.title;body=s.body;}}
  /* v2.52 — catégorie et tag FACULTATIFS à la capture. Les deux peuvent être
     absents : un item sans catégorie, sans tag et sans titre reste parfaitement
     valide, c'est la première propriété du concept. Ce qui change, c'est qu'on
     PEUT décider tout de suite au lieu de devoir y revenir. */
  const cat=resolveCat(meta&&meta.cat);
  const tg=(meta&&meta.tag)?normTag(meta.tag):null;
  const it=normalizeItem({id:uid(),type:d.type,mime:"",hasMedia:false,content:v,url:d.url,domain:cat,title,body,preview:null,
    tags:tg?[tg]:[],createdAt:Date.now(),lastSurfaced:null,surfaceCount:0,status:"active"});
  /* Une catégorie tapée à la main est une catégorie créée à la main : elle entre
     dans settings.cats, donc elle survit au déplacement de son premier item. */
  if(cat){settings.cats=settings.cats||[];if(!settings.cats.includes(cat)){settings.cats.push(cat);saveSettings();}}
  /* Capture optimiste (chantier 11) : le grain est à l'écran tout de suite,
     la synchro suit. « Zéro friction » ne survit pas à un spinner. */
  items.unshift(it);slotIntoBatch(it);
  renderAll();savedFeedback();
  /* v2.88 — ce `.catch` ne s'est jamais déclenché : `saveItems` avale l'erreur
     et rend `false` depuis la v2.66. Un échec de synchro à la capture était donc
     parfaitement silencieux. On lit le booléen. */
  saveItems().then(ok=>{if(!ok)toast("Ajouté ici, pas encore synchronisé — ça repartira à la reconnexion.");});
  toast(d.type==="youtube"?"Item YouTube ajouté.":"Item ajouté.",{label:"classer",fn:()=>openGrainSheet(it.id)});
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
    items.unshift(it);slotIntoBatch(it);await saveItems();renderAll();toast("Photo gardée.",{label:"classer",fn:()=>openGrainSheet(id)});
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
    items.unshift(it);slotIntoBatch(it);await saveItems();renderAll();toast(lbl+" gardé.",{label:"classer",fn:()=>openGrainSheet(id)});
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
    downloadJson(out,"sable-"+new Date().toISOString().slice(0,10)+".json");
    toast("Export téléchargé ("+items.length+" items).");
  }catch(e){toast("Export impossible ici.");}
}
/* Ticket #31 — le téléchargement est extrait ici parce que l'export du miroir en
   a besoin AUSSI, et qu'il doit marcher sur un écran où l'app n'a pas démarré. */
function downloadJson(obj,name){
  const blob=new Blob([JSON.stringify(obj)],{type:"application/json"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");a.href=url;a.download=name;
  document.body.appendChild(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),3000);
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
/* v2.88 — « Garder en pile » ATTENDAIT L'ÉCRITURE AVANT DE BOUGER. Le geste
   n'écrit pourtant qu'une comptabilité (lastSurfaced, surfaceCount, la date
   échue consommée) : rien de ce que l'écran montre n'en dépend. La carte
   suivante était donc retenue le temps d'un aller-retour Supabase — le tableau
   entier remonté — pour une information que personne ne regarde. On avance
   maintenant tout de suite et la synchro suit, comme la capture optimiste du
   chantier 11. Si l'écriture échoue, on le dit ; le pire cas est que la carte
   revienne au prochain tirage, ce qui est exactement ce que doit faire un « j'ai
   vu » qui n'est pas parti. Les trois autres gestes du rituel continuent
   d'attendre : eux changent le STATUT de l'item, et la v2.66 interdit d'annoncer
   un archivage ou une mise à la corbeille que la base ignore. */
async function keepCard(id){
  await markSurfaced(id);advance(id);
  haptic(14);renderStage();renderBadges();toast("Gardé en pile.");
  saveItems().then(ok=>{if(!ok)toast(SAVE_FAIL_MSG);});
}
async function archiveCard(id){const it=items.find(i=>i.id===id);if(it)it.status="archived";advance(id);await saveItems();renderAll();toast("Mis de côté.");}
async function trashCard(id){const it=items.find(i=>i.id===id);if(it){it.status="trashed";lastTrashed=id;}advance(id);await saveItems();renderAll();toast("Jeté.",true);}
async function classifyCard(id,dom){const it=items.find(i=>i.id===id);if(it){it.domain=dom;await markSurfaced(id);}advance(id);await saveItems();renderAll();toast("Classé dans “"+dom+"”.");}
/* Avancer, c'est avancer la séquence en cours : le tirage du jour, ou la carte
   à la demande. La porte de secours ne touche donc jamais `batch`. */
function advance(id){
  /* v2.82 — AVANCER CONSOMME LA DATE. `surfaceAfter` est un SEUIL (« pas avant
     le X »), mais le tirage le lisait comme un TICKET DE PRIORITÉ que personne
     ne déchirait jamais : une date échue reste échue, donc l'item repassait en
     tête de CHAQUE tirage, indéfiniment. La date se consomme ici, au moment où
     l'on quitte la carte — c'est le seul point que les quatre gestes du rituel
     traversent tous, et il tombe avant le saveItems() de chacun. */
  const it=id?items.find(i=>i.id===id):null;
  if(it&&it.surfaceAfter&&it.surfaceAfter<=Date.now())it.surfaceAfter=null;
  if(adhocOn()){riseIdx++;return;}batch.idx++;saveBatch();}

async function undoTrash(){if(!lastTrashed)return;const it=items.find(i=>i.id===lastTrashed);if(it)it.status="active";lastTrashed=null;await saveItems();renderAll();}
async function deleteRow(id){const it=items.find(i=>i.id===id);if(it){it.status="trashed";lastTrashed=id;}await saveItems();renderAll();toast("Jeté.",true);}
async function restoreRow(id){const it=items.find(i=>i.id===id);if(it)it.status="active";await saveItems();renderAll();toast("Remis en pile.");}
async function purgeRow(id){
  if(!confirm("Supprimer définitivement cet item ? C'est irréversible."))return;
  const it=items.find(i=>i.id===id);
  if(it&&it.hasMedia)await delMedia(id);   /* ticket #29 : la ligne part, pas seulement sa valeur */
  items=items.filter(i=>i.id!==id);
  await saveItems();renderAll();toast("Supprimé définitivement.");
}
async function emptyTrash(){
  const trashed=items.filter(i=>i.status==="trashed");
  if(!trashed.length){toast("La corbeille est déjà vide.");return;}
  if(!confirm("Vider la corbeille ? "+trashed.length+" item(s) supprimés définitivement."))return;
  for(const it of trashed){if(it.hasMedia)await delMedia(it.id);}   /* ticket #29 */
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
/* v2.67 — les vues de la pile (liste, grille, grande carte) n'ont qu'UNE case
   d'image, alors qu'un item peut desormais porter une photo ET une icone. La
   photo passe devant ; l'icone sert de visage quand il n'y a pas de photo.
   C'est exactement ce que ces vues rendaient avant la separation. */
function faceOf(it){if(!it)return null;if(it.preview)return it.preview;if(it.icon)return iconUrl(it.icon,it.iconTint);return null;}
function faceIsIcon(it){return !!it&&!it.preview&&!!it.icon;}
function coverSrc(it){return faceOf(it)||"";}
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
  if(it.type==="link"&&faceOf(it))return `<div class="media"><img class="zoomable${faceIsIcon(it)?' iconcov':''}" data-full="${esc(coverSrc(it))}" src="${esc(coverSrc(it))}" alt="" loading="lazy"></div>`;
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
  if(isMediaType(it.type))return `<div class="filename">${esc(mediaText(it))}</div>`;
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
  if(faceOf(it))return `<img class="thumb${faceIsIcon(it)?' iconcov':''}" src="${esc(coverSrc(it))}" alt="" loading="lazy">`;
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
/* v2.83 — UNE seule fonction de comptage, DEUX séquences. Le tirage du jour et
   la carte à la demande se comptaient différemment : `riseTotal`/`riseLeft`
   pour l'un, un `1` ÉCRIT EN DUR dans renderStage pour l'autre. Or la porte de
   secours n'a jamais été limitée à une carte — « Une de plus » appelle pullNow
   dans une séquence à la demande — donc le compteur annonçait « 1 / 1 » sur
   deux cartes, et il aurait menti plus fort encore avec bringForward (v2.83). */
function seqCount(ids,from){
  let n=0;
  for(let i=from;i<ids.length;i++){const it=items.find(x=>x.id===ids[i]);if(it&&it.status==="active")n++;}
  return n;
}
function riseLeft(){return batch.date!==todayStr()?0:seqCount(batch.ids,batch.idx);}
function riseTotal(){return batch.date!==todayStr()?0:seqCount(batch.ids,0);}
/* v2.82 — POURQUOI RIEN NE REMONTE. Un tirage vide est légitime — maturation de
   30 j, plancher de re-remontée de 60 j, sourdine, date à venir — mais il ne se
   distinguait EN RIEN d'une fonction cassée : pas de pastille, pas de réveil,
   et « Rien ne remonte aujourd'hui » pour tout verdict. La porte a quatre
   raisons de se fermer, elle dit laquelle. Ordre des causes : la dominante
   d'abord, puisque le tirage est vide seulement si toutes valent à la fois. */
function riseVoidReason(){
  const now=Date.now();
  const active=items.filter(i=>i.status==="active");
  if(!active.length)return "Ta pile est vide.";
  const seen=active.filter(i=>!i.surfaceAfter&&!isMuted(i)&&(now-i.createdAt)>=MATURE_MS).length;
  const green=active.filter(i=>!i.surfaceAfter&&!isMuted(i)&&(now-i.createdAt)<MATURE_MS).length;
  const held=active.filter(i=>i.surfaceAfter&&i.surfaceAfter>now).length;
  const muted=active.filter(i=>isMuted(i)).length;
  if(seen)return "Tout ce qui est mûr a remonté il y a moins de 14 jours.";
  if(green)return green>1?(green+" items n\u2019ont pas encore 30 jours de pile."):"Ton seul item n\u2019a pas encore 30 jours de pile.";
  if(held)return "Les dates posées sur tes items sont toutes à venir.";
  if(muted)return "Toutes tes catégories sont en sourdine.";
  return "Rien de mûr aujourd\u2019hui.";
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
  /* v3.01 — REVENIR DU RITUEL, C'EST REVOIR LE CADRE. `keepCard` ne repeint que
     la scène et les pastilles (v2.88, à dessein : le geste n'écrit qu'une
     comptabilité) ; les trois autres gestes passent par `renderAll`, qui rend
     le cadre. Un rituel soldé « Garder » laissait donc dans le DOM les
     vignettes d'avant, sous l'écran de fin — on refermait sur « c'est fait » et
     le cadre montrait encore la carte qu'on venait de garder. La règle n'est
     pas de rendre à chaque geste mais de rendre à la SORTIE : c'est le seul
     point que les quatre gestes traversent, et il couvre aussi l'abandon en
     cours de rituel et le réordonnancement de `riseOpenAt`. */
  renderBadges();
  /* Ticket #10 — ET LE CORPS DE LA SECTION, PAS SEULEMENT SA PASTILLE. L'appel
     ci-dessus était juste quand la remontée était un CADRE (v3.01) ; depuis le
     ticket #1 c'est une SECTION d'onglet, et `renderBadges` ne repeint que le
     compte. Le corps est rendu par `renderRiseTab`, dont le seul autre appelant
     est `selectTab` — il fallait donc quitter l'onglet et y revenir pour voir
     « C'est fait pour aujourd'hui ». Même famille de défaut que la v3.01,
     reproduite par le changement de contenant : le point de sortie est bon, ce
     qu'il repeint ne l'est plus.
     LA GARDE N'EST PAS DÉCORATIVE. `renderRiseTab` écrit aussi
     `settings.frameDay` (regarder la page vaut « vu ») : rendre la section
     depuis Collection consommerait la journée sans que rien n'ait été montré. */
  if(curTab==="rise")renderRiseTab();
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
  /* Ticket « porte basse » — la ligne « À ranger » du pied de l'index. Elle
     remplace la moitié « non classés » de la pastille déposée. Elle n'existe
     que s'il y a à ranger : une destination toujours affichée à zéro devient
     un meuble, et le cap n'en veut pas. Le compte est un CHIFFRE ici, à la
     différence de l'ancienne pastille — au pied d'un index, à côté de « Mis de
     côté » et « Corbeille », c'est la forme de ses voisines qui décide. */
  const uf=document.getElementById("openUnfiled");
  if(uf){
    const u=unfiledDue();
    uf.hidden=!u;
    const n=document.getElementById("unfiledN");
    if(n)n.textContent=u?String(u):"";
  }
  const f=document.getElementById("filterBtn");
  /* v2.68 — ce `.on` ne peignait RIEN : aucune règle `.btn.on` n'existait dans
     styles.css depuis la v2.45, donc un filtre posé était invisible dans
     l'en-tête dès que la liste avait défilé (ses puces partent avec elle). La
     règle manquante est écrite ; l'état couvre aussi le bandeau ouvert — un
     entonnoir allumé veut dire « j'ai quelque chose à dire », pas deux choses
     différentes selon le cas. Un point, jamais un chiffre : rien de chiffré ici. */
  if(f){f.classList.toggle("on",bandOn||anyFilterActive());f.setAttribute("aria-expanded",bandOn?"true":"false");}
}
/* Les deux pastilles n'existent que sur Collection, le filtre que sur Ma pile :
   même emplacement, jamais les deux à la fois. Un en-tête qui garde des boutons
   inertes ment sur ce qu'on peut y faire. */
function paintHeaderBtns(){
  const on=(id,v)=>{const b=document.getElementById(id);if(b)b.hidden=!v;};
  /* Ticket #1 — l'entonnoir appartient à Ma pile (et aux pages de périmètre).
     Il se lisait « tout sauf Collection », ce qui était vrai avec DEUX onglets
     et faux dès qu'il y en a trois : il serait apparu sur la remontée, qui n'a
     rien à filtrer. On nomme la condition au lieu de la nier. */
  on("filterBtn",curTab==="pile"||scopeActive());
  /* Ticket #13 — LE + N'A RIEN À FAIRE SUR LA REMONTÉE. Capturer, c'est ajouter
     à la pile ; l'écran d'un rituel de revue est l'endroit où l'on s'occupe de
     ce qui y est déjà. Le bouton n'était masqué pendant le rituel lui-même que
     par le z-index (la surface est à 35, le FAB à 31) — jamais sur la section.
     La cote reste au CSS : `hidden` seul serait battu par le `display:flex` de
     `.fab`, d'où l'annulation `.fab[hidden]` écrite dans styles.css (§ 3). */
  on("fabAdd",curTab!=="rise");
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
                 s:"à ranger quand tu veux",go:()=>{enterCollection("none");}});
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
/* v2.63 — le menu du bouton d'en-tête « À trier ». Il fond les deux anciennes
   pastilles en un choix : la remontée et les non classés. À la différence du
   réveil (openWake), qui ne montre que ce qui attend et disparaît sinon, ce
   menu est un CHOIX de destination : il montre toujours les deux, chacune avec
   son compte calme, pour qu'on puisse s'y rendre même à zéro. La remontée n'y
   figure que si elle est allumée — éteinte, ce n'est pas une destination. */
/* ══ v2.84 — LE CADRE DE LA REMONTÉE ═══════════════════════════════════════
   Il remplace le popover « À trier » de la v2.69, supprimé avec `openInboxMenu`,
   `showPop`, `placePop`, `closeInboxPop`, `toggleInboxPop` et l'état `popOn`.
   Le popover disait « La remontée · 3 » et « Non classés · 7 » ; le cadre dit la
   même chose AVEC LES IMAGES. Deux réponses à une seule question, c'était le
   doublon habituel — et un chiffre ne donne envie de rien, trois vignettes si.

   TROIS DÉCISIONS PORTÉES PAR CE CODE :
   (a) IL VIT AU-DESSUS DE L'EN-TÊTE. Un titre nomme ce qui est dessous : posé
       SOUS « Catégories », le cadre décollait le titre de sa grille. C'est ça
       qui se sentait comme un hybride, pas sa forme.
   (b) UNE SEULE VOIX NOUVELLE — le libellé mono. Pas de titre, pas de chapô :
       le mot « remontée » n'est écrit qu'une fois par écran.
   (c) IL S'OUVRE SEUL, UNE FOIS PAR JOUR. C'est ce que `maybeWake` (v2.45)
       devait faire et n'a jamais fait, faute d'appelant. `settings.frameDay`
       porte le jour déjà servi ; l'enveloppe le bascule le reste du temps. */
/* v2.86 — DEUX ÉTATS, PLUS TROIS. `frameOn` disait « le cadre existe dans la
   page » et `frameTucked` « il y est mais replié à zéro ». Trois états pour un
   objet qui n'en a que deux, et le troisième était un piège : à froid, le cadre
   N'EXISTAIT PAS, donc le tirage n'avait rien à trouver — il ne fonctionnait
   qu'après l'avoir ouvert au bouton puis rangé au défilement. Le cadre est
   maintenant TOUJOURS posé dès qu'il y a quelque chose à dire ; seul
   `frameTucked` décide s'il se voit. C'est le modèle des archives de Telegram
   pris à la lettre : la rangée est là, rangée, et le tirage la découvre. */

/* Ce que le cadre montre : ce qu'il RESTE du tirage du jour, dans son ordre. */
function riseFrameIds(){
  if(!surfaceOn()||batch.date!==todayStr())return [];
  const out=[];
  for(let i=batch.idx;i<batch.ids.length;i++){
    const it=items.find(x=>x.id===batch.ids[i]);
    if(it&&it.status==="active")out.push(it.id);
  }
  return out;
}
/* ══ Ticket #12 — LE RAB ═════════════════════════════════════════════════════
   « Peut-être un bouton pour demander si on veut en remonter d'autres. » La
   mécanique existait déjà : `riseAdHoc` est la porte de secours, une séquence
   d'ids jouée hors tirage qui n'écrit RIEN dans `batch`. Il ne manquait qu'une
   entrée. Les deux questions de fond ont été tranchées avant de coder :

   COMBIEN — UN SEUL LOT, DE LA MÊME TAILLE. Le plafond `batchSize` a été posé
   en v2.23 sur un argument qui tient toujours (« un rituel de 8 cartes ne se
   termine pas ») ; un bouton qui sert à volonté le rend décoratif. D'où : un
   rab plafonné à `BATCH_SIZE()`, une fois par jour, et AUCUN bouton sur l'écran
   de rab — c'est la moitié qui garde le plafond debout.

   LESQUELS — CEUX QUE LA RÈGLE AURAIT SERVIS DEMAIN, JAMAIS CEUX QU'ELLE A
   ÉCARTÉS. C'est le vrai piège : un rab qui puise ailleurs que dans le vivier
   ordinaire viderait de leur sens la maturation de 30 j, le plancher de 60 j et
   les sourdines — la règle ne serait plus qu'un délai qu'un bouton contourne.
   On repasse donc par `drawables()` et `fillPool`, TELS QUELS : mêmes exclusions,
   même variété, même rotation par âge. On retire seulement ce qui a déjà été
   servi aujourd'hui.
   Aucun champ nouveau : le vivier est dérivé, comme tout le reste (§ 3). */
function riseExtraIds(){
  if(!surfaceOn())return [];
  const served=new Set(batch.date===todayStr()?batch.ids:[]);
  const rid=a=>a.filter(i=>!served.has(i.id));
  const d=drawables();
  const out=rid(d.due).sort((a,b)=>a.surfaceAfter-b.surfaceAfter).slice(0,BATCH_SIZE());
  fillPool(out,rid(d.fresh));
  if(out.length<BATCH_SIZE())fillPool(out,rid(d.again),it=>it.lastSurfaced||0);
  return out.map(i=>i.id);
}
/* UNE FOIS PAR JOUR, ET LE MARQUEUR SE DÉRIVE. Un `settings.extraDay` aurait
   fait l'affaire, mais l'invariant est clair : ce qui se dérive d'`items` se
   dérive. Un rab servi laisse une trace — `markSurfaced` pose `lastSurfaced` —
   et cette trace se distingue du tirage du jour parce qu'elle porte sur un id
   qui n'est PAS dans `batch.ids`.
   LA LIMITE EST ASSUMÉE, et c'est la bonne : un rab OUVERT PUIS ABANDONNÉ sans
   qu'aucune carte soit gardée ou classée ne laisse rien, donc le bouton
   revient. C'est exactement ce qu'on veut — rien n'a été consommé. */
function riseExtraDone(){
  const d=todayStr();
  const inBatch=new Set(batch.date===d?batch.ids:[]);
  return items.some(i=>i.lastSurfaced&&dayKey(new Date(i.lastSurfaced))===d&&!inBatch.has(i.id));
}
function riseExtraStart(){
  const ids=riseExtraIds();
  if(!ids.length)return;
  /* `batch` n'est PAS réécrit et `settings.frameDay` reste posé : le tirage du
     jour est un rituel, le rab est un extra. C'est déjà ce que fait la porte de
     secours, on ne lui invente pas un second comportement. */
  riseAdHoc=ids;riseIdx=0;
  openRemontee();
}
/* Taper une vignette ouvre le rituel SUR ELLE, sans rien perdre : l'item passe
   en tête de la séquence restante au lieu que les précédents soient sautés. */
function riseOpenAt(id){
  const i=batch.ids.indexOf(id);
  if(i>batch.idx){const [x]=batch.ids.splice(i,1);batch.ids.splice(batch.idx,0,x);saveBatch();}
  openRemontee();
}
/* ══ ticket « porte basse » — LE CADRE EST DÉPOSÉ ═══════════════════════════
   Ce qui vivait ici : `frameDay`, `renderRiseFrame`, l'escamotage (`armFrameIO`,
   `commitTuck`, `untuckFrame`, `frameScrollTop`, `pingDot`), le TIRAGE vers le
   bas (RF_DAMP/RF_OPEN/RF_GRIP et son IIFE) et `toggleRiseFrame`.
   Les trois défauts qui les emportent, tous relevés au pouce :
   (1) LE GESTE. Tirer vers le bas est, dans la grammaire des applications, le
       geste d'ACTUALISER. Le réglage retenu en v2.85 était bon — ferme, ~310 px
       de course, aucune ouverture accidentelle — mais un geste juste dans une
       grammaire fausse reste faux.
   (2) L'AUTO-OUVERTURE. Le cadre se dépliait seul une fois par jour et POUSSAIT
       la page à froid : « le fait d'avoir ce bandeau remontée à l'ouverture
       donne l'impression d'un bug de l'app ». Un objet qui apparaît seul en haut
       d'écran et décale tout se lit comme une panne, jamais comme une attention.
       Il devient un toast — en position:fixed, il ne pousse rien.
   (3) LES TROIS VIGNETTES MUETTES. Sans titre, et vides quand l'image manque.
   Ce qui les remplace est le bloc « LA REMONTÉE » en fin de fichier — d'abord
   une surcouche, fondu ici au ticket #5. `riseFrameIds` et `riseOpenAt` sont
   restées à cette place parce qu'elles sont de la logique de TIRAGE et non
   d'interface : elles lisent et réordonnent `batch`, elles vivent chez leur
   donnée. */
/* v3.00 — REPOSER L'HEURE RÉARME LA JOURNÉE, ET C'EST LE CŒUR DU DÉFAUT.
   Le jour servi est un verrou ANTÉRIEUR au seuil : une fois `frameDay` écrit,
   l'annonce sort à sa deuxième ligne quelle que soit l'heure demandée
   ensuite. Poser 14 h 47 à 14 h 45 après un cadre reçu le matin ne pouvait donc
   RIEN produire — le réglage était juste, le verrou le rendait muet.
   La règle ne rend QUE ce qui n'a pas encore eu lieu : on efface le jour servi
   si et seulement si le nouveau seuil est encore DEVANT nous. Poser une heure
   déjà passée ne rouvre rien de force — elle est simplement retombée dans la
   sémantique ordinaire du seuil (« à la première ouverture APRÈS l'heure
   dite »), qui est ce que le réglage a toujours promis.
   N'ÉCRIT PAS : l'appelant enregistre, une seule fois, juste après. */
function rearmFrame(){
  const n=new Date();
  if(settings.frameDay===todayStr()&&n.getHours()*60+n.getMinutes()<frameMins())settings.frameDay="";
}
/* Le déclencheur de l'annonce. L'HEURE SE REGARDE, ELLE NE SE PROGRAMME PAS
   (v2.97, dont le principe est conservé mot pour mot) : un `setTimeout` calé
   sur 07 h 00 ne survit ni à la veille, ni à un changement d'heure, ni à une
   reprise. On relit l'heure à intervalle régulier et à chaque RETOUR AU PREMIER
   PLAN — ce second point vaut à lui seul le chantier, `startApp` ne rejouant
   pas sur une PWA simplement reprise de l'arrière-plan.
   Le corps sort à sa deuxième ligne une fois le jour servi : quatre
   comparaisons par minute, et rien d'autre.
   Ticket #5 — les trois branchements étaient gardés sur `window.riseMaybeAnnounce`,
   l'interrupteur d'arrêt de la surcouche. Elle est fondue : la garde tomberait
   sur une fonction du même fichier, elle ne protégeait plus de rien. */
const announceRise=()=>{if(uiReady)riseMaybeAnnounce();};
setInterval(announceRise,15000);
addEventListener("visibilitychange",()=>{if(!document.hidden)announceRise();});
addEventListener("pageshow",announceRise);
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
    /* v2.82 — TROIS VÉRITÉS, PAS DEUX. « Voilà. Cet item est reparti dans ta
       pile. » servait aussi bien à la carte à la demande qu'à un tirage vide,
       où elle ne parlait d'aucun item et laissait croire à une panne. */
    const fini=riseTotal()>0;
    const ad=riseAdHoc.length>0;
    const big=fini?"C’est fait pour aujourd’hui":(ad?"Voilà.":"Rien ne remonte");
    const sub=fini?("Tu as passé en revue ta sélection du jour."+quand)
             :ad?("Cet item est reparti dans ta pile."+quand)
             :riseVoidReason();
    stage.innerHTML=`<div class="rest"><div class="big">${big}</div>
      <div class="sub">${sub}</div></div>`;
    return;
  }
  const it=items.find(i=>i.id===id);
  const ad=adhocOn();
  const tot=ad?seqCount(riseAdHoc,0):riseTotal();
  const done=tot-(ad?seqCount(riseAdHoc,riseIdx):riseLeft());
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
/* v3.02 — DEUX AXES, DEUX CONSTANTES. `VIEWS` servait les deux onglets, ce qui
   revenait à jurer que l'index et la pile ont les mêmes formes. Ils ne les ont
   pas : une mosaïque montre le CONTENU d'une catégorie, et un item n'a pas de
   contenu ; un compact d'items change vraiment leur densité, un compact de
   catégories n'était que la liste moins son compteur — le reproche du pouce.
   Le fichier tient déjà `indexView` et `pileView` séparés depuis le chantier
   18 ; la constante rattrape simplement son retard sur le réglage. */
const PILE_VIEWS=[["list","Liste","pile"],["grid","Grille","grid"],["compact","Compact","compact"]];
const PILE_KEYS=PILE_VIEWS.map(v=>v[0]);
const IDX_VIEWS=[["cards","Cartes"],["mosaic","Mosaïque"],["list","Liste"]];
const IDX_KEYS=IDX_VIEWS.map(v=>v[0]);
const IDX_COLS=[1,2,3];
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
/* ---------- ticket #26 : l'ordre des SÉLECTEURS DE SAISIE ----------
   Distinct de `indexSort`, et il DOIT l'être : l'index sert à retrouver un nom
   (l'alphabet y gagne), la saisie sert à reposer la case qu'on vient
   d'employer. Deux écrans, deux travaux, deux réglages — c'est la leçon v2.49
   prise par l'autre bout : elle interdisait à `tagLib()` d'hériter de l'ordre
   de l'index, elle n'interdisait pas à la saisie d'avoir le sien.
   Trois valeurs, la grammaire `.seg` en veut trois. DÉFAUT « Récents » :
   changement assumé du comportement d'avant, où l'ordre était la fréquence.
   Une seule ligne (DEFAULT_SETTINGS) le ramène à "used" si le pouce le dit.
   « Usage » retombe sur l'alphabet à égalité, et « Récents » retombe sur
   l'usage puis l'alphabet — sans ces replis, tout ce qui n'a jamais servi
   (compteur 0, date 0) changerait de place au gré de l'ordre d'insertion. */
const PICK_SORTS=[["recent","Récents"],["used","Usage"],["az","A → Z"]];
const PICK_SORT_KEYS=PICK_SORTS.map(s=>s[0]);
function pickCmp(a,b,na,nb,la,lb){
  if(pickSort==="az")return a.localeCompare(b,"fr");
  if(pickSort==="used")return (nb-na)||a.localeCompare(b,"fr");
  return (lb-la)||(nb-na)||a.localeCompare(b,"fr");
}
/* Les deux portes uniques. Tout sélecteur de SAISIE passe par l'une des deux :
   c'est ce qui garantit que le bouton de tri commande partout la même chose,
   et qu'un septième appelant ne réinvente pas un ordre à lui. */
function pickCats(names){
  const c=domCounts(),l=catLastUse();
  return names.slice().sort((a,b)=>pickCmp(a,b,c[a]||0,c[b]||0,l[a]||0,l[b]||0));
}
function pickTags(names){
  const c=tagCounts(),l=tagLastUse();
  return names.slice().sort((a,b)=>pickCmp(a,b,c[a]||0,c[b]||0,l[a]||0,l[b]||0));
}
/* Le tri se relit comme `indexSort` et s'écrit comme lui. Il ne redessine
   AUCUN écran : il n'ordonne que des listes reconstruites à chaque ouverture
   de couche ou à chaque frappe — donc rien à repeindre, et surtout pas
   renderAll (§ 3). */
function setPickSort(v){
  if(!PICK_SORT_KEYS.includes(v)||v===pickSort)return false;
  pickSort=v;settings.pickSort=v;saveSettings();return true;
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
/* v2.76 — un choix explicite PRÉCÈDE la dérivation, il ne la remplace pas :
   retirer la couverture rend la catégorie à son premier item, jamais au vide. */
function catCover(name,list){
  const p=catPick(name);
  if(p)return `<img src="${esc(p)}" alt="" loading="lazy">`;
  const byAge=list.slice().sort((a,b)=>(a.createdAt||0)-(b.createdAt||0));
  const cand=byAge.find(i=>faceOf(i)||i.type==="youtube"||i.type==="image");
  return cand?galleryThumb(cand):null;
}
function catPick(name){return ((settings.catCovers||{})[name])||null;}
/* Le vivier d'une catégorie ne s'invente pas : ce sont les photos de ses items,
   du plus ancien au plus récent, PLUS les vignettes candidates de chacun — ce
   que le site proposait et qu'aucun item n'a retenu redevient une candidate
   légitime pour la catégorie. Des URL déjà en pile : rien à garder, rien à
   téléverser. Une icône n'entre jamais dans un vivier photo (invariant v2.67). */
function catShot(it){
  if(!it)return null;
  if(it.preview&&!isIcon(it.preview))return it.preview;
  if(it.type==="youtube"){const y=ytId(it.url);return y?"https://img.youtube.com/vi/"+y+"/hqdefault.jpg":null;}
  if(it.type==="image"&&it.url&&!it.hasMedia)return it.url;
  return null;
}
function catShots(name){
  const out=[];
  const push=u=>{if(u&&!isIcon(u)&&out.indexOf(u)<0&&out.length<30)out.push(u);};
  items.filter(i=>i.status==="active"&&i.domain===name)
    .sort((a,b)=>(a.createdAt||0)-(b.createdAt||0))
    .forEach(i=>{push(catShot(i));(i.previews||[]).forEach(push);});
  return out;
}
/* Une image venue de la galerie part en dataURL dans localStorage : elle a un
   poids, le quota existe, donc l'écriture peut être refusée. On remet la valeur
   d'avant et on le DIT — une app de capture ne promet pas d'avoir gardé. */
function setCatCover(name,u){
  settings.catCovers=settings.catCovers||{};
  const was=settings.catCovers[name]||null;
  if(u)settings.catCovers[name]=u;else delete settings.catCovers[name];
  if(!saveSettings()){
    if(was)settings.catCovers[name]=was;else delete settings.catCovers[name];
    saveSettings();
    toast("Image trop lourde : couverture non gardée.");
    return false;
  }
  renderCategories();
  return true;
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
/* v3.02 — L'INTERRUPTEUR DE COMPARAISON EST SOLDÉ, comme la v2.43 s'y était
   engagée : « c'est un banc dans l'app, pas un réglage ». Verdict rendu — les
   trois lentilles héritent des trois formes. `allForms`, `galleryAllowed` et
   `effIndexView` disparaissent avec lui : la forme effective EST `indexView`,
   et une fonction qui rend son argument est une dette de lecture. Les six
   appelants lisent maintenant `indexView` directement. */
function idxFace(e,size){
  return `<span class="cface ${size}" style="--ci-h:${catHue(e.k)};--ci-t:${catTone(e.k)}">`+
    (e.kind==="tag"?"#":esc(catInitial(e.k)))+`</span>`;
}
/* v2.59 — le tiroir d'un tag / d'une source. Même grammaire que l'aperçu de
   catégorie (peekBodyHTML) : les mêmes lignes d'item, le même pied. Ce qui
   change tient en deux points — la population suit le COMPTEUR de la ligne
   (`status!=="trashed"`, comme tagCount/srcCount, sinon « Voir tout (N) »
   mentirait le N affiché à côté), et « Entrer » route vers enterTag/enterSource
   plutôt que enterCollection. Pas de ⋯ ni d'épingle : un tag et une source ne
   sont pas des lieux qu'on gère, seulement des index qu'on ouvre (chantier 15). */
function idxItemsFor(e){
  return items.filter(i=>i.status!=="trashed" && (e.kind==="tag"?hasTag(i,e.k):sourceOf(i)===e.k));
}
function idxPeekBodyHTML(e,list){
  const size=[3,5,8].includes(settings.peekSize)?settings.peekSize:3;
  const expanded=idxPeekAll.has(idxKey(e));
  const sorted=list.slice().sort((a,b)=>(b.createdAt||0)-(a.createdAt||0));
  const top=expanded?sorted:sorted.slice(0,size);
  const overflow=list.length>size;
  const key=esc(e.k),lbl=esc(e.kind==="tag"?("#"+e.k):e.k);
  const sec=(overflow&&!expanded)
      ?`<button class="peekall" data-iallall="${key}">Voir tout (${list.length})</button>`
      :(expanded?`<button class="peekall" data-iless="${key}">Réduire</button>`:"");
  return `<div class="dens-dense">${top.map(rowHTML).join("")}</div>`+
    `<div class="peekfoot"><button class="peekgo" data-igo="${key}">Entrer dans ${lbl} →</button>${sec}</div>`;
}
function idxNodeHTML(e,view){
  const key=esc(e.k),lbl=esc(e.kind==="tag"?("#"+e.k):e.k);
  if(view==="mosaic"){
    /* v3.02 — Tags et Sources héritent de la mosaïque comme ils avaient hérité
       de la galerie (v2.43) : c'est la FORME qui s'ajoute, pas le décor. Le
       visage reste celui de la v2.30 — un # ou une puce, « une puce de couleur
       au plus » (chantier 15) — et ce sont les vignettes, pas lui, qui portent
       le contenu. Pas de gouttière : un tag ne se gère pas, il s'ouvre. */
    return `<div class="mrow" data-ix="${key}" data-ik="${e.kind}">`+
      `<button class="cgo mgo" data-igo="${key}">`+
        idxFace(e,"l")+
        `<span class="mmid"><span class="cnm">${esc(e.k)}</span>`+
          `<span class="msub"><span class="ccnt">${e.n}</span></span></span>`+
        mosaicTilesHTML(idxItemsFor(e),catHue(e.k))+
      `</button>`+
    `</div>`;
  }
  if(view==="cards"){
    /* Même carcasse que la carte de catégorie : aucune seconde grammaire.
       Une carte n'a pas de tiroir — pas de chevron ici, comme pour les cats. */
    return `<div class="ccard" data-ix="${key}" data-ik="${e.kind}">`+
      `<button class="cgo" data-igo="${key}">`+
        `<span class="dcover plain" style="--ci-h:${catHue(e.k)};--ci-t:${catTone(e.k)}">${idxFace(e,"l")}</span>`+
        `<span class="dbody"><span class="dname">${lbl}</span><span class="dcount">${e.n}</span></span>`+
      `</button></div>`;
  }
  /* Liste et compact : la ligne à DEUX cibles — chevron | corps. Elle emprunte
     la carcasse de la catégorie (.crow / .cline / .cchev / .peek) sans sa
     troisième gouttière : le corps reste le `.idxrow` de la v2.30 (donc son
     visage à une puce, son compteur, son compact), le chevron déplie le
     tiroir. La donnée d'ouverture est portée par la ligne (`.crow.open`). */
  const mark=e.kind==="tag"
    ? `<span class="ihash">#</span>`
    : `<span class="idot" style="--ci-h:${catHue(e.k)}"></span>`;
  const open=idxOpen.has(idxKey(e));
  return `<div class="crow${open?" open":""}" data-ix="${key}" data-ik="${e.kind}">`+
    `<div class="cline">`+
      `<button class="cchev" data-ichev="${key}" aria-expanded="${open?"true":"false"}" aria-label="Aperçu de ${lbl}">${icon('chevron-left')}</button>`+
      `<button class="idxrow" data-igo="${key}">${mark}<span class="inm">${esc(e.k)}</span><span class="icnt">${e.n}</span></button>`+
    `</div>`+
    `<div class="peek"${open?"":" hidden"}>${open?idxPeekBodyHTML(e,idxItemsFor(e)):""}</div>`+
  `</div>`;
}
function wireIdxNodes(scope){
  scope.querySelectorAll("[data-igo]").forEach(b=>{
    const node=b.closest("[data-ik]")||b;
    b.onclick=()=>{ node.getAttribute("data-ik")==="tag" ? enterTag(b.dataset.igo) : enterSource(b.dataset.igo); };
  });
  const kindOf=b=>{const n=b.closest("[data-ik]");return n&&n.getAttribute("data-ik");};
  scope.querySelectorAll("[data-ichev]").forEach(b=>{
    b.onclick=e=>{e.stopPropagation();if(peekJustAll())return;toggleIdxPeek(kindOf(b),b.dataset.ichev);};
    attachPeekLongPress(b,setAllIdxPeeks);
  });
  scope.querySelectorAll("[data-iallall]").forEach(b=>b.onclick=e=>{e.stopPropagation();expandIdxPeek(kindOf(b),b.dataset.iallall,true);});
  scope.querySelectorAll("[data-iless]").forEach(b=>b.onclick=e=>{e.stopPropagation();expandIdxPeek(kindOf(b),b.dataset.iless,false);});
}
/* Jumeaux exacts de toggleCatPeek / expandCatPeek, sur le conteneur #idxList.
   Ne redessinent QUE le tiroir concerné — jamais un render() complet, qui
   ferait remonter l'écran et refermerait les autres (piège v2.20). */
function toggleIdxPeek(kind,key){
  const wrap=document.querySelector("#idxList .idxlist");if(!wrap)return;
  const node=wrap.querySelector('[data-ix="'+cssq(key)+'"]');if(!node)return;
  const e={k:key,kind},ik=idxKey(e);
  const peek=node.querySelector(".peek"),chev=node.querySelector(".cchev");
  if(idxOpen.has(ik)){
    idxOpen.delete(ik);idxPeekAll.delete(ik);
    node.classList.remove("open");
    if(chev)chev.setAttribute("aria-expanded","false");
    if(peek){peek.hidden=true;peek.innerHTML="";}
    scheduleJumpFab();
    return;
  }
  idxOpen.add(ik);
  node.classList.add("open");
  if(chev)chev.setAttribute("aria-expanded","true");
  if(peek){
    peek.innerHTML=idxPeekBodyHTML(e,idxItemsFor(e));
    peek.hidden=false;
    wireRowButtons(peek);wireIdxNodes(peek);hydrateMedia(peek);
  }
  haptic(10);scheduleJumpFab();
}
function expandIdxPeek(kind,key,on){
  const e={k:key,kind},ik=idxKey(e);
  if(on)idxPeekAll.add(ik);else idxPeekAll.delete(ik);
  const wrap=document.querySelector("#idxList .idxlist");if(!wrap)return;
  const node=wrap.querySelector('[data-ix="'+cssq(key)+'"]');if(!node)return;
  const peek=node.querySelector(".peek");if(!peek)return;
  peek.innerHTML=idxPeekBodyHTML(e,idxItemsFor(e));
  wireRowButtons(peek);wireIdxNodes(peek);hydrateMedia(peek);
  haptic(8);scheduleJumpFab();
}
/* Un choix d'affichage ne reconstruit pas la liste : il pose l'attribut et
   redessine les nœuds un par un, dans le conteneur existant (même discipline
   que repaintCatNodes). Le défilement ne bouge pas, rien ne clignote. */
function repaintIdxNodes(){
  const wrap=document.querySelector("#idxList .idxlist");
  if(!wrap||wrap.dataset.built!==browseIdx)return false;
  const view=indexView;
  wrap.setAttribute("data-view",view);
  wrap.setAttribute("data-cols",indexCols);
  const by={};idxEntries().forEach(e=>{by[e.k]=e;});
  wrap.querySelectorAll("[data-ix]").forEach(node=>{
    const e=by[node.getAttribute("data-ix")];if(!e)return;
    const tmp=document.createElement("div");
    tmp.innerHTML=idxNodeHTML(e,view);
    node.replaceWith(tmp.firstElementChild);
  });
  wireIdxNodes(wrap);
  /* Les lignes d'un tiroir resté ouvert sont des nœuds neufs : sans ça, taper
     un item de l'aperçu ne ferait plus rien après une bascule liste ↔ compact. */
  wrap.querySelectorAll(".peek:not([hidden])").forEach(p=>wireRowButtons(p));
  hydrateMedia(wrap);
  return true;
}
function renderIdxList(){
  const el=document.getElementById("idxList");if(!el)return;
  if(browseIdx==="cats"){el.hidden=true;el.innerHTML="";return;}
  el.hidden=false;
  const view=indexView,list=idxEntries();
  /* Un tiroir ne survit pas à la disparition de son entrée (tag effacé, source
     retombée sous le seuil). On ne purge QUE la lentille courante : l'état de
     l'autre lentille, invisible, ne se juge pas ici. */
  const kind=browseIdx==="tags"?"tag":"src",present=new Set(list.map(e=>idxKey(e)));
  [...idxOpen].forEach(k=>{if(k.indexOf(kind+":")===0&&!present.has(k)){idxOpen.delete(k);idxPeekAll.delete(k);}});
  if(!list.length){
    el.innerHTML=`<div class="empty-list">`+(browseIdx==="tags"
      ? `Aucun tag pour l'instant. Un tag est transversal : il traverse les catégories au lieu de ranger.`
      : `Aucune source pour l'instant. Elle se déduit de l'adresse d'un lien — une note n'en a pas.`)+`</div>`;
    return;
  }
  el.innerHTML=`<div class="idxlist" data-view="${view}" data-cols="${indexCols}" data-built="${esc(browseIdx)}">`+
    list.map(e=>idxNodeHTML(e,view)).join("")+`</div>`;
  wireIdxNodes(el);
  /* Un tiroir rendu déjà ouvert (idxOpen survit à un renderRoot, ex. après une
     capture) porte des lignes d'item neuves : sans ça, taper l'une d'elles ne
     ferait rien. Même filet que repaintCatNodes pour les catégories. */
  el.querySelectorAll(".peek:not([hidden])").forEach(p=>wireRowButtons(p));
  hydrateMedia(el);
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
  if(curTab==="rise"&&!scopeActive())return "La remontée";
  return curTab==="pile" ? "Ma pile" : (LENS_TITLE[browseIdx]||"Catégories");
}
/* Ticket #1 — LE TITRE N'EST PAS UN MENU SUR LA REMONTÉE. Il l'est sur les deux
   autres onglets (il ouvre le bandeau de vue), mais la remontée n'a ni tri ni
   axe d'affichage : un chevron qui n'ouvre rien est un mensonge de deux pixels.
   La règle est écrite une fois ici, et lue par `updateNavTitle` comme par
   `toggleViewBand` — jamais deux fois, sinon les deux divergeront. */
function navTitleIsMenu(){return !(curTab==="rise"&&!scopeActive());}
function updateNavTitle(){
  const t=document.getElementById("navTitleTxt");
  if(t)t.textContent=navTitleText();
  /* v2.69 — le titre est le déclencheur d'un panneau : il dit s'il est déplié.
     Pas de teinte (il est en `flex:1`, un fond peindrait toute la ligne) — son
     chevron pivote, et c'est le CSS qui le fait depuis `aria-expanded`. */
  const b=document.getElementById("navTitle");
  if(b){
    const menu=navTitleIsMenu();
    b.classList.toggle("nomenu",!menu);
    b.setAttribute("aria-expanded",(menu&&viewOn)?"true":"false");
    if(menu)b.setAttribute("aria-controls",(curTab==="pile"||scopeActive())?"viewBandPile":"viewBandCat");
    else b.removeAttribute("aria-controls");
  }
}
/* v2.69 — « Vue » quitte la feuille pour un BANDEAU, sur le modèle de Filtrer
   (v2.68) : trois axes qu'on règle à la suite, aucune validation, et le résultat
   est la liste juste en dessous. Il s'ouvre sous le titre qui l'appelle — le
   chevron du titre pointait déjà vers lui — et POUSSE le contenu.
   Deux fentes, une par onglet (#viewBandCat, #viewBandPile), parce que les deux
   sections vivent côte à côte dans le rail. Une seule est servie à la fois.
   Un bandeau ouvert à la fois, et c'est structurel : ouvrir « Vue » ferme
   « Filtrer », et l'inverse. Les taps internes redessinent en place, ils ne
   ré-empilent aucune couche. */
let viewOn=false;
function viewSeg(id,cur,opts,sub){
  return `<div class="sortgrp"><span class="sortlbl">${esc(id)}</span>`+
    `<div class="seg" style="--n:${opts.length}" data-vg="${esc(id)}">`+opts.map(([k,l])=>
      `<button data-vv="${k}"${cur===k?' class="on"':''}>${esc(l)}</button>`).join("")+
    `</div>${sub||""}</div>`;
}
/* v3.02 — LA LARGEUR DES CARTES, SOUS SA PASTILLE. La sous-rangée reprend la
   grille du segment (trois colonnes 1fr, même gouttière, même retrait) : le
   sélecteur tombe donc exactement sous « Cartes ». Elle n'a PAS de libellé —
   elle ne nomme rien de neuf, elle précise le bouton du dessus, et sous un
   tiers d'écran un mot plus trois cibles ne tiennent pas ensemble.
   Des chiffres et non un dessin : trois glyphes de grille se lisent comme
   trois objets tant qu'ils n'ont pas la même empreinte, et l'empreinte
   constante rendait le dessin muet sur ce qu'il change. */
function colsSubrowHTML(){
  return `<div class="subrow"><span class="wsel">`+IDX_COLS.map(n=>
    `<button data-vcol="${n}"${n===indexCols?' class="on"':''} aria-label="${n} colonne${n>1?"s":""}">${n}</button>`
  ).join("")+`</span></div>`;
}
function viewBandEl(){
  return document.getElementById((curTab==="pile"||scopeActive())?"viewBandPile":"viewBandCat");
}
function renderViewBand(){
  const cat=document.getElementById("viewBandCat"),pile=document.getElementById("viewBandPile");
  const list=viewBandEl(); if(!list)return;
  [cat,pile].forEach(el=>{if(el&&el!==list){el.classList.remove("open");el.innerHTML="";}});
  list.classList.toggle("open",viewOn);
  if(!viewOn){list.innerHTML="";return;}          /* fermé, il ne coûte pas un nœud */
  let h="";
  if(curTab==="pile"||scopeActive()){
    /* « Trier » et « Voir en » quittent la barre d'axes pour venir ici : les
       garder aux deux endroits aurait AJOUTÉ de la surface, contre l'esprit du
       chantier. La barre ne garde que « Filtrer », là où vivent ses puces.
       Le groupe « Titre » n'existe que dans une collection ouverte (ch. 20). */
    const groups=inCollection()?SORT_GROUPS:SORT_GROUPS.filter(([g])=>g!=="Titre");
    h+=groups.map(([g,keys])=>viewSeg(g==="Date"?"Trier":g,sortMode,keys.map(k=>[k,SORT_LABEL[k]]))).join("");
    if(pileLoc!=="trashed")h+=viewSeg("Voir en",pileView,PILE_VIEWS.map(([k,l])=>[k,l]));
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
    /* v3.02 — les trois formes, les mêmes sur les trois lentilles. La largeur
       des cartes se pose SOUS sa pastille et nulle part ailleurs : le bandeau
       garde ses trois rangées nommées, et le réglage se lit comme une
       précision du bouton au-dessus de lui, pas comme un axe de plus. */
    h+=viewSeg("Voir en",indexView,IDX_VIEWS,indexView==="cards"?colsSubrowHTML():"");
  }
  list.innerHTML=`<div class="sortsheet">${h}</div>`;
  list.querySelectorAll("[data-vg]").forEach(g=>{
    const grp=g.dataset.vg;
    g.querySelectorAll("[data-vv]").forEach(b=>b.onclick=()=>{
      const v=b.dataset.vv;
      bandTouched();   /* v2.75 — un réglage posé : plus de retour à la place d'avant */
      if(grp==="Grouper par"){browseIdx=v;renderRoot();}
      else if(grp==="Voir en"){ (curTab==="pile"||scopeActive()) ? setPileView(v) : setIndexView(v); }
      /* « Trier » existe sur les deux onglets et ne règle pas la même chose :
         sur Collection l'ordre de l'index, sur Ma pile celui des items (où le
         groupe « Titre » tombe dans la même branche, comme avant). */
      else if(curTab!=="pile"){ setIndexSort(v); }
      else { sortMode=v; renderPileTab(); }
      haptic(8);
      renderViewBand();
    });
  });
  /* La largeur ne change pas de FORME : elle ne redessine aucun nœud, elle
     repose un attribut sur le conteneur. Le défilement ne bouge pas. */
  list.querySelectorAll("[data-vcol]").forEach(b=>b.onclick=()=>{
    bandTouched();
    setIndexCols(parseInt(b.dataset.vcol,10));
    haptic(8);
    renderViewBand();
  });
}
/* ---- v2.75 — AMENER LE REGARD AU PANNEAU ------------------------------------
   Les deux bandeaux naissent en TÊTE de leur section, mais on les ouvre depuis
   un en-tête COLLANT qui suit le doigt : à dix rangées du haut, le panneau se
   déplie hors du champ et l'écran ne bouge pas d'un pixel. Le tap paraît mort,
   et rien ne dit qu'il faut remonter. Le défaut est le jumeau exact de celui
   que la v2.68 avait corrigé pour la feuille venue du bas : la cause et l'effet
   n'ont aucun lien visuel.
   On ne déplace pas le bandeau (le rendre collant le ferait recouvrir la liste
   qu'il règle, et rejouerait le piège sticky/overflow des v2.47/v2.64) : on
   défile jusqu'à lui, avec l'outil qui existe déjà — jumpToEl, qui TROUVE son
   défileur au lieu de le supposer (v2.61) et pose la cible sous l'en-tête.
   Et on retient d'où l'on venait, pour ne pas perdre sa place dans un index
   long au prix d'un coup d'œil au tri. */
let bandBack=null;
function stickyHeadH(){
  const head=document.body.classList.contains("scoped")
    ?document.getElementById("scopeHead"):document.querySelector(".topbar");
  return (head&&head.getBoundingClientRect().height)||0;
}
function revealBand(el,keep){
  bandBack=keep||null;
  if(!el)return;
  const sc=scrollerFor(el);
  const dy=el.getBoundingClientRect().top-sc.getBoundingClientRect().top;
  if(dy>=stickyHeadH())return;   /* déjà sous l'en-tête : le panneau se voit, on ne bouge rien */
  bandBack={sc,top:sc.scrollTop,touched:false};
  jumpToEl(el);
}
/* Le retour n'a lieu QUE si l'on n'a rien posé : un tri ou un filtre change la
   liste, et un décalage mesuré sur l'ancienne n'y désigne plus rien. Il n'a lieu
   que sur une fermeture DEMANDÉE (le titre, l'entonnoir, le ⇅, le retour
   d'Android) ; un changement d'onglet ou d'écran referme sans rendre la place,
   il n'y a plus de place à rendre. */
function restoreBand(){
  const b=bandBack;bandBack=null;
  if(!b||b.touched)return;
  b.sc.scrollTo({top:b.top,behavior:"smooth"});
}
const bandTouched=()=>{if(bandBack)bandBack.touched=true;};
/* Couche nommée « view » : le retour d'Android referme par le MÊME chemin que le
   titre (invariant v2.44). Les deux bandeaux s'excluent l'un l'autre. */
function openViewBand(){
  if(viewOn)return;
  const keep=bandBack;          /* passer d'un bandeau à l'autre ne perd pas le point de départ */
  closeFilterBand();
  viewOn=true;pushLayer("view",()=>closeViewBand(true));
  (curTab==="pile"||scopeActive())?renderPileTab():renderRoot();
  revealBand(viewBandEl(),keep);
}
function closeViewBand(back){
  if(!viewOn)return;
  viewOn=false;popLayer("view");
  (curTab==="pile"||scopeActive())?renderPileTab():renderRoot();
  back?restoreBand():(bandBack=null);
}
function toggleViewBand(){if(!navTitleIsMenu())return;viewOn?closeViewBand(true):openViewBand();}
function setPileView(v){
  if(!PILE_KEYS.includes(v)||v===pileView)return;
  pileView=v;settings.pileView=v;saveSettings();renderPileTab();
}
/* v3.02 — la largeur ne touche à AUCUN nœud : elle repose un attribut sur les
   deux conteneurs possibles, et le CSS fait le reste. Redessiner ici aurait
   été le réflexe coûteux — et le défilement l'aurait payé. */
function applyIndexCols(){
  const g=document.getElementById("domGrid");
  if(g)g.setAttribute("data-cols",indexCols);
  const w=document.querySelector("#idxList .idxlist");
  if(w)w.setAttribute("data-cols",indexCols);
}
function setIndexCols(n){
  if(IDX_COLS.indexOf(n)<0||n===indexCols)return;
  indexCols=n;settings.indexCols=n;saveSettings();applyIndexCols();
}
function setIndexView(v){
  if(!IDX_KEYS.includes(v)||v===indexView)return;
  indexView=v;settings.indexView=v;saveSettings();
  /* Ni la carte ni la mosaïque n'ont de tiroir : seule la liste en a un.
     On oublie franchement les dépliages plutôt que de les garder en réserve —
     revenir en liste sur trois aperçus qu'on ne se rappelle pas avoir ouverts
     serait un état surprise. v3.02 : le test porte sur « ce n'est pas la
     liste » et non sur une forme nommée, sinon la mosaïque aurait hérité d'un
     tiroir que son balisage ne porte pas. */
  if(v!=="list"){catOpen.clear();catPeekAll.clear();idxOpen.clear();idxPeekAll.clear();}
  const grid=document.getElementById("domGrid");
  if(grid&&grid.dataset.built==="cats"){
    grid.setAttribute("data-view",v);
    grid.setAttribute("data-cols",indexCols);
    if(v!=="list")grid.querySelectorAll(".peek").forEach(p=>{p.hidden=true;});
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
/* ---------- v3.02 : les trois vignettes de la mosaïque ----------
   Les items les plus récents QUI ONT UN VISUEL, jamais simplement les plus
   récents : une catégorie de notes montrerait trois carrés de couleur et la
   forme ne servirait plus a rien — elle n'est là que pour dire, sans être lue,
   ce qu'il y a dedans. Le test du visuel est celui de `catCover` : ni deux
   définitions, ni deux résultats.
   Trois fentes, trois vérités distinctes. Une vignette quand un item visuel la
   remplit ; un aplat teinté quand la catégorie a bien un item à cette place
   mais qu'il n'a pas d'image ; un cadre en pointillé quand il n'y a pas d'item
   du tout — le pointillé dit « à poser » partout ailleurs dans ce fichier
   (`.chip.ghost`, `.tagsug`, `.mini.none`), il le dit encore ici. */
const mosaicVisual=i=>!!(faceOf(i)||i.type==="youtube"||i.type==="image");
function mosaicTilesHTML(list,hue){
  const vis=list.filter(mosaicVisual).sort((a,b)=>(b.createdAt||0)-(a.createdAt||0)).slice(0,3);
  let h="";
  for(let i=0;i<3;i++){
    if(vis[i])h+=`<span class="mtile">${galleryThumb(vis[i])}</span>`;
    else if(i<list.length)h+=`<span class="mtile plain" style="--ci-h:${hue}"></span>`;
    else h+=`<span class="mtile void"></span>`;
  }
  return `<span class="mtiles">${h}</span>`;
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
  if(indexView==="mosaic"){
    /* La mosaïque emprunte la GOUTTIÈRE de la ligne (le ⋯ à droite, son filet)
       et le corps large de la carte : tout le reste entre. Elle n'a pas de
       chevron — les trois vignettes disent déjà ce qu'il y a dedans, et un
       tiroir sous une preuve de contenu serait la même chose dite deux fois. */
    return `<div class="mrow" data-cat="${esc(name)}" data-f="${esc(f)}">`+
      `<button class="cgo mgo" data-cgo="${esc(f)}">`+
        catFace(name,"l")+
        `<span class="mmid"><span class="cnm">${esc(name)}</span>`+
          `<span class="msub">${pin?`<span class="cpin">${pinSvg}</span>`:""}<span class="ccnt">${n}</span></span>`+
        `</span>`+
        mosaicTilesHTML(list,catHue(name))+
      `</button>`+
      `<div class="cgut">${dots}</div>`+
    `</div>`;
  }
  if(indexView==="cards"){
    /* Le visage se fait petit quand il se pose SUR une couverture, grand quand
       il EST la couverture : le contenant ne varie jamais, le remplissage oui. */
    const cov=catCover(name,list);
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
/* Étendu SUR PLACE par « Voir tout » — en mémoire seule, comme catOpen : c'est
   une position de lecture, pas un réglage (v2.50). */
let catPeekAll=new Set();
function peekBodyHTML(name,f,list){
  const size=[3,5,8].includes(settings.peekSize)?settings.peekSize:3;
  const expanded=catPeekAll.has(name);
  const sorted=list.slice().sort((a,b)=>(b.createdAt||0)-(a.createdAt||0));
  const top=expanded?sorted:sorted.slice(0,size);
  const overflow=list.length>size;
  /* Deux gestes distincts au pied, chacun sa gouttière. « Voir tout » étend
     l'aperçu SUR PLACE, en texte compact — on reste dans l'index. « Entrer »
     ouvre la catégorie, le plan de travail. Sous le seuil, l'aperçu montre déjà
     tout : il n'y a rien à « voir », le second geste disparaît (v2.50, il
     remplace l'ancien « Tout voir (N) » qui gonflait l'index entier au réglage). */
  const sec=(overflow&&!expanded)
      ?`<button class="peekall" data-callall="${esc(name)}">Voir tout (${list.length})</button>`
      :(expanded?`<button class="peekall" data-calless="${esc(name)}">Réduire</button>`:"");
  return `<div class="dens-dense">${top.map(rowHTML).join("")}</div>`+
    `<div class="peekfoot"><button class="peekgo" data-cgo="${esc(f)}">Entrer dans ${esc(name)} →</button>${sec}</div>`;
}
/* Les nœuds sont redessinés un par un, dans le conteneur existant : le
   défilement ne bouge pas et rien ne clignote. */
function repaintCatNodes(){
  const grid=document.getElementById("domGrid");if(!grid)return;
  grid.setAttribute("data-view",indexView);
  grid.setAttribute("data-cols",indexCols);
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
/* v2.63 — appui long sur un chevron d'index = tout déplier / tout replier la
   lentille courante. Le tap ordinaire garde son office (déplier UNE ligne) ;
   le geste rare est l'appui tenu (~460 ms) ou le clic droit au bureau. Un
   garde temporel global avale le clic de synthèse qui suit le relâchement —
   fiable même quand le tout-déplier remplace les nœuds sous le doigt. */
let _peekAllAt=0;
function attachPeekLongPress(btn,runAll){
  let t=null;
  const clr=()=>{if(t){clearTimeout(t);t=null;}};
  btn.addEventListener("touchstart",()=>{clr();t=setTimeout(()=>{t=null;_peekAllAt=Date.now();haptic(14);runAll();},460);},{passive:true});
  btn.addEventListener("touchmove",clr,{passive:true});   /* un glissé annule */
  btn.addEventListener("touchend",clr,{passive:true});
  btn.addEventListener("touchcancel",clr,{passive:true});
  btn.addEventListener("contextmenu",e=>{e.preventDefault();_peekAllAt=Date.now();haptic(14);runAll();});
}
const peekJustAll=()=>Date.now()-_peekAllAt<600;
/* Peupler (ou vider) le Set d'ouverture puis REPEINDRE les nœuds un par un :
   repaintCatNodes/repaintIdxNodes lisent le Set et recâblent les tiroirs
   ouverts — jamais un render() complet (piège v2.20). */
function setAllCatPeeks(){
  const grid=document.getElementById("domGrid");if(!grid)return;
  const names=[...grid.querySelectorAll("[data-cat]")].map(n=>n.getAttribute("data-cat"));
  if(!names.length)return;
  const allOpen=names.every(n=>catOpen.has(n));
  catOpen.clear();catPeekAll.clear();
  if(!allOpen)names.forEach(n=>catOpen.add(n));
  repaintCatNodes();scheduleJumpFab();
}
function setAllIdxPeeks(){
  const wrap=document.querySelector("#idxList .idxlist");if(!wrap)return;
  const ents=[...wrap.querySelectorAll("[data-ix]")].map(n=>({k:n.getAttribute("data-ix"),kind:n.getAttribute("data-ik")}));
  if(!ents.length)return;
  const allOpen=ents.every(e=>idxOpen.has(idxKey(e)));
  const kind=browseIdx==="tags"?"tag":"src";
  [...idxOpen].forEach(k=>{if(k.indexOf(kind+":")===0){idxOpen.delete(k);idxPeekAll.delete(k);}});
  if(!allOpen)ents.forEach(e=>idxOpen.add(idxKey(e)));
  repaintIdxNodes();scheduleJumpFab();
}
function wireCatNodes(scope){
  scope.querySelectorAll("[data-cgo]").forEach(b=>b.onclick=e=>{e.stopPropagation();enterCollection(b.dataset.cgo);});
  scope.querySelectorAll("[data-cdots]").forEach(b=>b.onclick=e=>{e.stopPropagation();openCatManageSheet(b.dataset.cdots);});
  scope.querySelectorAll("[data-cchev]").forEach(b=>{
    b.onclick=e=>{e.stopPropagation();if(peekJustAll())return;toggleCatPeek(b.dataset.cchev);};
    attachPeekLongPress(b,setAllCatPeeks);
  });
  scope.querySelectorAll("[data-callall]").forEach(b=>b.onclick=e=>{e.stopPropagation();expandCatPeek(b.dataset.callall,true);});
  scope.querySelectorAll("[data-calless]").forEach(b=>b.onclick=e=>{e.stopPropagation();expandCatPeek(b.dataset.calless,false);});
}
/* « Voir tout » / « Réduire » : redessine le SEUL aperçu concerné, comme
   toggleCatPeek — jamais un render() complet (piège v2.20). */
function expandCatPeek(name,on){
  if(on)catPeekAll.add(name);else catPeekAll.delete(name);
  const grid=document.getElementById("domGrid");if(!grid)return;
  const node=grid.querySelector('[data-cat="'+cssq(name)+'"]');if(!node)return;
  const peek=node.querySelector(".peek");if(!peek)return;
  const f=node.getAttribute("data-f");
  peek.innerHTML=peekBodyHTML(name,f,items.filter(i=>i.status==="active"&&i.domain===name));
  wireRowButtons(peek);wireCatNodes(peek);hydrateMedia(peek);
  haptic(8);scheduleJumpFab();
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
    catPeekAll.delete(name);scheduleJumpFab();
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
  haptic(10);scheduleJumpFab();
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
    /* v3.02 : seule la carte pose sa punaise EN COIN, sur la couverture ; la
       ligne et la mosaïque la posent dans le corps, avant le compteur. */
    s.className=(indexView==="cards")?"dpin":"cpin";
    s.innerHTML=pinSvg;
    if(indexView==="cards")node.insertBefore(s,node.querySelector(".cgut"));
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
  scheduleJumpFab();                      /* v2.51 — différé — les DEUX sorties sont couvertes */
  /* L'invitation vit sur l'accueil, donc au-dessus des trois index et non dans
     l'un d'eux : elle ne dépend pas de ce qu'on est en train de parcourir. */
  renderBadges();
  guardLens();
  updateNavTitle();
  paintHeaderBtns();
  renderViewBand();
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
  grid.setAttribute("data-cols",indexCols);
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
function enterCollection(f){pileLoc=f;typeFilter="all";sourceFilter="all";tagFilter="";pileQuery="";dormantFocus=false;const s=document.getElementById("searchInput");if(s)s.value="";
  /* v2.55 — un périmètre s'ouvre en SURFACE glissée par-dessus Collection, pas en
     bascule d'onglet. « Toute la pile » n'est pas un périmètre : garde-fou. */
  if(inCollection())openScopePage();else selectTab("pile");}

/* Actions d'« État de la pile ». Elles réutilisent la machinerie existante :
   la sélection par lot (chantier 3), le focus visible « dormants », et pour
   « jamais remontés » on pose une date échue (chantier 7) plutôt qu'un tirage
   forcé — ça les fait passer devant au prochain tirage sans voler le rituel. */
function enterDormant(){pileLoc="all";typeFilter="all";sourceFilter="all";tagFilter="";pileQuery="";sortMode="oldest";dormantFocus=true;const s=document.getElementById("searchInput");if(s)s.value="";selectTab("pile");enterSel();}
/* v2.83 — « JAMAIS REMONTÉS » NE DATE PLUS RIEN. Elle posait une date échue sur
   TOUS les jamais-remontés d'un coup pour n'en faire passer que trois : dater N
   items pour en montrer B est une erreur de catégorie, et le prix était lourd —
   toute la pile portait « pas avant le … », et comme la date n'était jamais
   consommée (défaut corrigé en v2.82), le rituel restait gelé sur les trois
   premiers items du tableau, à vie. Or ce qu'elle veut est exactement ce que la
   porte de secours (riseAdHoc, chantier 26) sait faire depuis la v2.39 : montrer
   MAINTENANT, hors rituel, sans rien écrire. Deux réponses au même besoin
   cohabitaient, la plus ancienne survivait par inertie — le motif que ce fichier
   paie à chaque version. Elle remplit donc la séquence à la demande avec les
   jamais-remontés les plus anciens, et le tirage du lendemain n'est pas touché.
   La sourdine est respectée : une porte qui ne parle pas de sourdine ne doit pas
   l'outrepasser (seule une date posée à la main l'emporte, invariant v2.19). */
function bringForward(){
  const pool=items.filter(i=>neverSurfacedYoung(i)&&!isMuted(i))
                  .sort((a,b)=>(a.createdAt||0)-(b.createdAt||0))
                  .slice(0,BATCH_SIZE());
  if(!pool.length){toast("Rien à faire remonter — ces items sont en sourdine.");return;}
  riseAdHoc=pool.map(i=>i.id);riseIdx=0;
  openRemontee();
}
/* v2.83 — solder les dates échues. Une date passée est une promesse TENUE : le
   seuil « pas avant le X » est franchi, elle est dépensée. On ne touche jamais
   une date à venir — celle-là n'a pas encore servi. */
async function clearDueDates(){
  const now=Date.now();
  let n=0;items.forEach(i=>{if(i.status==="active"&&i.surfaceAfter&&i.surfaceAfter<=now){i.surfaceAfter=null;n++;}});
  if(!n)return;
  if(!await saveItems()){toast(SAVE_FAIL_MSG);return;}
  renderAll();
  toast(n>1?`${n} dates échues retirées.`:"1 date échue retirée.");
}
function renderCategories(){renderRootSearch();renderRoot();}
async function renameCat(oldN,newN){
  items.forEach(i=>{if(i.domain===oldN)i.domain=newN;});
  const p=settings.catPins||[];const idx=p.indexOf(oldN);if(idx>-1)p[idx]=newN;settings.catPins=p;
  settings.cats=[...new Set((settings.cats||[]).map(c=>c===oldN?newN:c))];
  if(settings.catIcons&&settings.catIcons[oldN]){settings.catIcons[newN]=settings.catIcons[oldN];delete settings.catIcons[oldN];}
  if(settings.catCovers&&settings.catCovers[oldN]){settings.catCovers[newN]=settings.catCovers[oldN];delete settings.catCovers[oldN];}
  settings.mutedCats=[...new Set((settings.mutedCats||[]).map(c=>c===oldN?newN:c))];
  saveSettings();await saveItems();renderAll();toast("Catégorie renommée.");
}
async function mergeCat(src,dst){
  items.forEach(i=>{if(i.domain===src)i.domain=dst;});
  settings.catPins=(settings.catPins||[]).filter(x=>x!==src);
  settings.cats=(settings.cats||[]).filter(x=>x!==src);
  settings.mutedCats=(settings.mutedCats||[]).filter(x=>x!==src);
  if(settings.catIcons)delete settings.catIcons[src];
  if(settings.catCovers)delete settings.catCovers[src];
  saveSettings();await saveItems();renderAll();toast("Fusionné dans « "+dst+" ».");
}
async function deleteCat(name){
  items.forEach(i=>{if(i.domain===name)i.domain=null;});
  settings.catPins=(settings.catPins||[]).filter(x=>x!==name);
  settings.cats=(settings.cats||[]).filter(x=>x!==name);
  settings.mutedCats=(settings.mutedCats||[]).filter(x=>x!==name);
  if(settings.catIcons)delete settings.catIcons[name];
  if(settings.catCovers)delete settings.catCovers[name];
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
/* ---------- v2.71 : la feuille d'une catégorie ----------
   Avant : cinq rangées de même poids, un nuage de N pastilles « Fusionner
   dans… » qui poussait tout le reste hors champ, et la banque d'icônes greffée
   au bas de la même liste. Aucune hiérarchie : renommer, épingler et supprimer
   se ressemblaient trait pour trait.
   Trois niveaux maintenant. (1) L'IDENTITÉ sur le papier nu : le nom porte la
   taille de titre et se touche pour se corriger, la pastille se touche pour
   changer d'icône. Ce sont les deux actions les plus fréquentes, et elles
   quittent la liste. (2) LES BASCULES dans une carte levée — la grammaire des
   Réglages (v2.21) : c'est le bloc qui groupe, plus un filet qui traverse la
   feuille. Elles montrent leur ÉTAT au lieu de l'annoncer au futur : un
   interrupteur allumé dit « épinglée », « Désépingler » ne disait que ce qui
   arriverait. (3) LE GESTE IRRÉVERSIBLE en texte sous la carte : la hiérarchie
   dit le risque, elle ne le peint plus en rouge à hauteur d'un réglage. */
function openCatManageSheet(name){
  const sh=document.getElementById("appSheet");
  sh.classList.add("fiche");
  document.getElementById("sheetTitle").textContent="Catégorie";
  const list=document.getElementById("sheetList");
  const n=(domCounts()[name]||0);
  const pinned=(settings.catPins||[]).includes(name);
  const muted=(settings.mutedCats||[]).includes(name);
  const others=Object.keys(domCounts()).filter(d=>d!==name);
  const face=(settings.catIcons||{})[name];
  const hasIcon=!!(face&&face.base);
  const tint=(face&&face.tint)||"ocre";

  /* v2.76 — le vivier est calculé UNE fois à l'ouverture puis tenu en mémoire :
     une image ajoutée depuis la galerie n'appartient à aucun item, elle n'a donc
     aucun moyen de revenir d'un recalcul. Même leçon que `cands` en v2.71. */
  let shots=catShots(name);

  const draw=()=>{
    const f=(settings.catIcons||{})[name];
    const has=!!(f&&f.base);
    /* La couverture montre le CHOIX s'il existe, sinon la dérivation qu'on
       verra sur la carte — la fiche ne montre pas autre chose que l'index.
       Vide, la boîte reste : c'est la porte, et sans elle il faudrait deviner
       que la couverture se trouve derrière le blason. */
    const cu=catPick(name)||shots[0]||null;
    list.innerHTML=
      `<div class="gcover ccov" id="catCov">`
      +(cu?`<img src="${esc(cu)}" alt="">`:`<span class="cvempty">${icon("image")}Ajouter une couverture</span>`)
      +`<button class="cvtap" id="catCovTap" aria-label="Changer la couverture"></button></div>`
      +`<div class="cident">`
      +`<button class="idbadge${has?"":" none"}" id="catIcon" aria-label="Changer l'icône">`
      +(has?`<img src="${esc(iconUrl(f.base,f.tint||"ocre"))}" alt="">`:icon("image"))
      +`<span class="cog">${icon("pencil")}</span></button>`
      +`<div class="idmain"><div id="catName"></div>`
      +`<div class="idmeta">${n} item${n>1?"s":""}</div></div></div>`
      +`<div class="acard">`
      +`<button class="arow${pinned?" on":""}" data-act="pin">${icon("pin","ai")}`
        +`<span class="lbl">Épinglée en tête<small>Reste au-dessus des autres catégories</small></span>`
        +`<span class="sw"></span></button>`
      /* la sourdine n'existe que si la remontée existe : une bascule qui ne
         commande rien est un mensonge de plus dans la carte. */
      +(surfaceOn()?`<button class="arow${muted?"":" on"}" data-act="mute">${icon("mute","ai")}`
        +`<span class="lbl">Remonte en surface<small>Ses items entrent dans le tirage du jour</small></span>`
        +`<span class="sw"></span></button>`:"")
      +(others.length?`<button class="arow" data-act="merge">${icon("merge","ai")}`
        +`<span class="lbl">Fusionner dans une autre…</span>`
        +`<span class="val">${others.length}</span>${icon("chevron-left","chev")}</button>`:"")
      +`</div>`
      +`<button class="dngr" data-act="delete">Supprimer la catégorie`
      +`<small>Ses ${n} item${n>1?"s repassent":" repasse"} en non classés</small></button>`;
    drawName();
    wire();
  };
  /* Renommer se fait SUR le nom, pas dans une boîte de dialogue du navigateur.
     `prompt()` sortait de l'app, perdait le contexte et n'était pas stylable —
     c'était le dernier endroit où Sable laissait parler le navigateur. */
  let renaming=false;
  function drawName(){
    const m=list.querySelector("#catName");if(!m)return;
    if(!renaming){
      m.innerHTML=`<button class="idname" id="catRen"><span>${esc(name)}</span>${icon("pencil")}</button>`;
      m.querySelector("#catRen").onclick=()=>{renaming=true;drawName();};
      return;
    }
    m.innerHTML=`<input class="idinput" id="catRenIn" value="${esc(name)}" `
      +`autocomplete="off" enterkeyhint="done" aria-label="Nom de la catégorie">`;
    const inp=m.querySelector("#catRenIn");
    inp.focus();inp.select();
    const commit=async()=>{
      if(!renaming)return;                       /* déjà validé : pas deux fois */
      renaming=false;
      const nn=(inp.value||"").trim();
      if(nn&&nn!==name){await renameCat(name,nn);openCatManageSheet(nn);return;}
      drawName();
    };
    inp.onkeydown=e=>{
      if(e.key==="Enter"){e.preventDefault();commit();}
      if(e.key==="Escape"){renaming=false;drawName();}
    };
    inp.onblur=commit;
  }
  function wire(){
    /* v2.76 — une seule couche, deux portes : le blason ouvre « Icône », la
       couverture ouvre « Couverture ». `delCover` n'est PAS passé — le vivier
       est dérivé des items, on n'y retire rien depuis ici. */
    const openVis=(pane)=>{
      let t=((settings.catIcons||{})[name]||{}).tint||"ocre";
      openVisuelLayer({
        sub:name,panes:["icon","cover"],pane:pane,
        covLabel:"Dans cette catégorie",
        getIcon:()=>(((settings.catIcons||{})[name]||{}).base)||null,
        getTint:()=>t,
        setTint:(k)=>{t=k;const cur=((settings.catIcons||{})[name]||{}).base;
          if(cur)setCatIcon(name,cur,k);draw();},
        setIcon:(b)=>{
          if(b)setCatIcon(name,b,t);
          else{if(settings.catIcons)delete settings.catIcons[name];saveSettings();renderCategories();}
          draw();
        },
        covs:()=>shots.slice(),
        getCover:()=>catPick(name),
        setCover:(u)=>{setCatCover(name,u||null);draw();},
        addCover:(u)=>{
          if(!u||isIcon(u))return;                 /* une marque ne rejoint pas le vivier photo */
          if(shots.indexOf(u)<0)shots.unshift(u);
          setCatCover(name,u);draw();
        }
      });
    };
    list.querySelector("#catCovTap").onclick=()=>openVis("cover");
    list.querySelector("#catIcon").onclick=()=>openVis("icon");
    const pin=list.querySelector('[data-act="pin"]');
    if(pin)pin.onclick=()=>{togglePin(name);closeSheet();};
    const mu=list.querySelector('[data-act="mute"]');
    if(mu)mu.onclick=()=>{toggleMute(name);closeSheet();};
    const mg=list.querySelector('[data-act="merge"]');
    if(mg)mg.onclick=()=>{
      const counts=domCounts();
      openPickLayer({
        title:"Fusionner « "+name+" » dans…",
        placeholder:"Chercher une catégorie…",
        single:true,noCreate:true,
        options:()=>pickCats(others).map(d=>[d,counts[d]||0]),
        sortable:true,
        apply:sel=>{
          const dst=sel[0];if(!dst)return;
          if(!confirm("Déplacer les "+n+" items de « "+name+" » dans « "+dst+" » ? « "+name+" » disparaît."))return;
          mergeCat(name,dst);closeSheet();
        }
      });
    };
    list.querySelector('[data-act="delete"]').onclick=()=>{
      if(confirm("Supprimer la catégorie « "+name+" » ? Ses items repasseront en « Non classé » (ils ne sont pas supprimés).")){
        deleteCat(name);closeSheet();
      }
    };
  }
  draw();
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
  renderViewBand();
  renderFilterBand();
  renderFilterState();
  renderList();
  updateSelUI();
  scheduleJumpFab();                      /* v2.51 */
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
  /* v2.55 — en surface, le nom est déjà dans l'en-tête de la page : la puce ferait
     doublon. Hors surface (Ma pile scopée par un chemin sans page), elle reste. */
  if(scopeName&&!document.body.classList.contains("scoped"))chips.push(schip(scopeName,scopeRows().length));
  /* v2.68 — le bandeau dit déjà type et source, en doré, deux lignes plus haut :
     les répéter ici ferait deux fois la même phrase. Le PÉRIMÈTRE, la recherche,
     le tri et l'état ne sont pas dans le bandeau — ils restent. */
  if(!bandOn){
  if(typeFilter!=="all")   chips.push(fchip("type",TFILT_LABEL[typeFilter]||typeFilter,()=>{typeFilter="all";}));
  if(sourceFilter!=="all") chips.push(fchip("source",sourceFilter,()=>{sourceFilter="all";}));
  }
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
  /* v2.68 — la rangée d'actions ne dépend plus des puces. Bandeau ouvert avec un
     filtre posé, il n'y a PLUS de puce (elles seraient un doublon) : garder la
     condition d'avant aurait fait disparaître « Épingler cette vue » à l'instant
     précis où l'on vient de composer une vue à épingler. Deux liens ne sont pas
     une bande vide au sens de la v2.46 — ils font quelque chose. */
  const acts=chips.length||(bandOn&&anyFilterActive());
  if(!chips.length&&!acts&&!bar){el.hidden=true;el.innerHTML="";return;}
  el.hidden=false;
  el.innerHTML=bar+(chips.length?`<div class="fchips${scopeName?" hasscope":""}">${chips.join("")}</div>`:"")
    +(acts?`<div class="facts">${pinAct}<button class="fclear" data-clear="1">Tout effacer</button></div>`:"");
  const sx=el.querySelector("[data-sx]"); if(sx)sx.onclick=exitScope;
  fstateHandlers.forEach((fn,i)=>{const b=el.querySelector('[data-fx="'+i+'"]');if(b)b.onclick=()=>{fn();renderPileTab();};});
  const cl=el.querySelector("[data-clear]");if(cl)cl.onclick=()=>{clearFilters();renderPileTab();};
  const pn=el.querySelector("[data-pin]");if(pn)pn.onclick=pinCurrentView;
  const up=el.querySelector("[data-unpin]");if(up)up.onclick=()=>unpinView(up.dataset.unpin);
}

/* ---- v2.68 — le bandeau de filtrage (ex-feuille « Filtrer ») ----------------
   Il s'ouvre SOUS l'entonnoir qui l'appelle et POUSSE la liste : le filtre vit
   là où il agit, et l'on voit les résultats bouger sans qu'un voile recouvre ce
   qu'on est en train de régler. Il ne se referme pas sur un choix — on pose un
   type PUIS une source — et il n'a pas de bouton de validation : le filtrage
   est direct, un « OK » laisserait croire le contraire.
   Les compteurs et l'ordre des deux axes sont ceux de la feuille, mot pour mot :
   les types gardent leur ordre canonique (taxonomie fixe, la trier par taille
   la rendrait mouvante d'un jour à l'autre), les sources se trient par taille
   (liste longue, aucun ordre propre). La valeur posée reste proposée même à
   zéro, sinon on ne pourrait plus la retirer d'ici. */
let bandOn=false;
function renderFilterBand(){
  const el=document.getElementById("filterBand"); if(!el)return;
  el.classList.toggle("open",bandOn);
  if(!bandOn){el.innerHTML="";return;}                /* fermé, il ne coûte pas un nœud */
  const scope=scopeRows();
  const nType=k=>k==="all"?scope.length:scope.filter(i=>k==="media"?isMediaType(i.type):i.type===k).length;
  const tOpts=TYPE_FILTERS.filter(([k])=>k==="all"||k===typeFilter||nType(k)>0)
                          .map(([k,l])=>[k,k==="all"?l:l+" · "+nType(k)]);
  const sc={};scope.forEach(i=>{const sr=sourceOf(i);if(sr)sc[sr]=(sc[sr]||0)+1;});
  if(sourceFilter!=="all"&&!sc[sourceFilter])sc[sourceFilter]=0;
  const sKeys=Object.keys(sc).sort((a,b)=>sc[b]-sc[a]||a.localeCompare(b,"fr"));
  const srcOpts=sKeys.length?[["all","Toutes"],...sKeys.map(sr=>[sr,sr+" · "+sc[sr]])]:[];
  const chips=(opts,cur,attr)=>`<div class="fbchips">`+opts.map(([k,l])=>
    `<button class="chip ${String(cur)===k?"active":""}" data-${attr}="${esc(String(k))}">${esc(l)}</button>`).join("")+`</div>`;
  el.innerHTML=`<div class="fbin"><div class="fbpad">`
    +`<div class="fbsec">Type d’item</div>`+chips(tOpts,typeFilter,"btf")
    +(srcOpts.length?`<div class="fbsec">Source</div>`+chips(srcOpts,sourceFilter,"bsf"):"")
    +`</div></div>`;
  /* Un choix repeint tout (compteurs de l'autre axe compris) mais ne ferme rien. */
  el.querySelectorAll("[data-btf]").forEach(b=>b.onclick=()=>{bandTouched();typeFilter=b.dataset.btf;haptic(8);renderPileTab();});
  el.querySelectorAll("[data-bsf]").forEach(b=>b.onclick=()=>{bandTouched();sourceFilter=b.dataset.bsf;haptic(8);renderPileTab();});
}
/* Une couche nommée, comme tout ce qui s'ouvre ici : le retour d'Android le
   referme par le MÊME chemin que l'entonnoir (invariant de la v2.44). */
function openFilterBand(){
  if(bandOn)return;
  const keep=bandBack;        /* v2.75 — idem : l'échange Vue ↔ Filtrer garde le point de départ */
  closeViewBand();            /* v2.69 — une fente, un panneau */
  bandOn=true;pushLayer("band",()=>closeFilterBand(true));
  renderPileTab();
  revealBand(document.getElementById("filterBand"),keep);
}
function closeFilterBand(back){
  if(!bandOn)return;
  bandOn=false;popLayer("band");
  renderPileTab();
  back?restoreBand():(bandBack=null);
}
function toggleFilterBand(){bandOn?closeFilterBand(true):openFilterBand();}

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
function enterTag(t){pileLoc="all";typeFilter="all";sourceFilter="all";pileQuery="";tagFilter=normTag(t);dormantFocus=false;const s=document.getElementById("searchInput");if(s)s.value="";
  if(tagFilter)openScopePage();else selectTab("pile");}   /* v2.55 — surface */
function renderRootSearch(){
  const raw=document.getElementById("searchInput").value.trim();
  const res=document.getElementById("rootResults"),browse=document.getElementById("rootBrowse");
  /* Le champ est désormais dans l'en-tête, donc valable partout : ses résultats
     recouvrent la piste au lieu de vivre dans un seul onglet. */
  scheduleJumpFab();                      /* v2.51 — et ICI que vit `searching` */
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
    /* v3.04 — `body` DOIT être ici. Sans lui, raccourcir un titre rendrait
       introuvables les mots partis dans le texte d'origine : la découpe
       deviendrait une perte. Idem dans le filtre de Ma pile, plus bas. */
    (i.domain||"").toLowerCase().includes(q)||(i.note||"").toLowerCase().includes(q)||(i.body||"").toLowerCase().includes(q)||
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
  if(q)rows=rows.filter(i=>(displayText(i)||"").toLowerCase().includes(q)||(i.content||"").toLowerCase().includes(q)||(i.domain||"").toLowerCase().includes(q)||(i.note||"").toLowerCase().includes(q)||(i.body||"").toLowerCase().includes(q)||(i.tags||[]).some(t=>tagKey(t).includes(tagKey(q))));
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
  const dom=it.domain?`<span class="mini cat">${esc(it.domain)}</span>`:`<span class="mini none">non classé</span>`;
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
  const body=(it.type==="youtube"||it.type==="link")?`<a href="${esc(it.url)}" target="_blank" rel="noopener">${esc(displayText(it))}</a>`:isMediaType(it.type)?esc(mediaText(it)):esc(it.content);
  const thumb=rowThumb(it);
  const dom=it.domain?`<span class="mini cat">${esc(it.domain)}</span>`:`<span class="mini none">non classé</span>`;
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
        if(t.k!==cur){cur=t.k;body+=`<div class="tier" id="ptier-${esc(t.k)}">${esc(t.l)}</div>`;}
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
  scheduleJumpFab();                      /* v2.51 — c'est ICI que vit la classe `selecting` */
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
    const hits=pickCats(allCats().filter(d=>tagKey(d)!=="vrac").filter(d=>!k||tagKey(d).includes(k)));
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
  const drawSug=()=>{const k=tagKey(q.value);if(!k){sug.innerHTML="";return;}const hits=pickTags(tagLib().filter(t=>!picked.some(p=>tagKey(p)===tagKey(t))).filter(t=>tagKey(t).includes(k))).slice(0,8);sug.innerHTML=hits.map(t=>`<button class="chip" data-t="${esc(t)}"><span class="taghash">#</span>${esc(t)}</button>`).join("");sug.querySelectorAll("[data-t]").forEach(b=>{b.addEventListener("pointerdown",()=>{guard=true;});b.onclick=()=>{guard=false;add(b.dataset.t);};});};
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
/* v2.53 — LA PROFONDEUR VISÉE par le recul en vol. Sans elle, le gestionnaire de
   popstate comparait le popstate qui arrive à `layers.length` COURANT — or entre
   la demande de recul et son arrivée, l'app a le droit d'empiler autre chose.
   C'est exactement ce que fait un tap sur une ligne de la feuille « Aller à » :
   `closeSheet(true)` puis `enterCollection(n)` dans le même tick. Le recul visait
   0, `layers` valait déjà 2 à l'arrivée, `0 >= 2` était faux, et notre propre
   recul passait pour un appui de l'utilisateur : les deux couches neuves étaient
   dépilées 200 ms après le tap. Effet visible : entrer dans une catégorie depuis
   « Aller à » ne faisait RIEN. */
let syncAim=0;
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
      syncing=true;syncAim=layers.length;
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
  scheduleJumpFab();                      /* v2.51 — la pile change, le mini-FAB se relit */
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
  scheduleJumpFab();                      /* v2.51 — idem : fermer une feuille le rend */
}
window.addEventListener("popstate",e=>{
  const target=(e.state&&typeof e.state.sable==="number")?e.state.sable:0;
  /* Notre recul visait `syncAim`, la profondeur au moment où il a été DEMANDÉ —
     pas celle d'aujourd'hui. Un popstate qui arrive à cette profondeur est le
     nôtre ; un qui arrive plus bas est l'utilisateur qui a appuyé sur retour
     entre-temps (taper ✕ puis reculer aussitôt, un geste ordinaire). Le
     distinguer par la profondeur plutôt que par un drapeau reste la bonne idée ;
     v2.53 corrige seulement la profondeur qu'on compare — `layers.length` avait
     déjà bougé. On se recale ensuite : si la pile a grandi, syncHistory() repousse
     les crans manquants, et l'opération est idempotente. */
  if(syncing&&target>=syncAim){
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
  scheduleJumpFab();                      /* v2.51 — le retour systeme defait aussi */
});
/* L'entrée racine porte la profondeur 0. Sans elle, `e.state` serait null au
   premier retour et on ne saurait pas jusqu'où réconcilier. Au niveau 0 —
   onglet de départ, rien d'ouvert — le retour rend la main au système : une app
   dont on ne peut pas sortir par le retour est un piège, pas une app. */
try{history.replaceState({sable:0},"");}catch(e){}
const startTab=()=>TAB_ORDER.includes(settings.startTab)?settings.startTab:"categories";
/* Ticket #3 du journal de suivi — OUVRIR L'APP SUR LA REMONTÉE.
   `startTab()` filtrait DÉJÀ sur TAB_ORDER : « rise » y étant entré au ticket
   #1, le réglage l'accepte sans une ligne de plus. C'est la meilleure preuve
   que le revirement était la bonne décision — trois observations, une cause.

   RESTE LE JOUR VIDE, et il ne se tranche pas seul : ouvrir sur un écran qui
   explique pourquoi rien ne remonte est honnête mais terne, basculer ailleurs
   trahit la consigne qu'on a donnée à l'app. La question est allée au pouce, et
   la réponse est qu'elle se règle — donc `riseVoidStart`, deux valeurs.
   `bootTab()` est le SEUL endroit qui résout l'onglet de démarrage : la règle du
   jour vide vaut aussi pour « Dernier onglet », sinon elle serait vraie par un
   chemin et fausse par l'autre. */
/* L'onglet sur lequel l'app s'est RÉELLEMENT ouverte. `startTab()` dit ce qui
   est réglé, `homeTab` dit ce qui s'est passé — voir la couche « tab ». */
let homeTab="categories";
function bootTab(){
  let n=settings.startTab==="last"?(settings.lastTab||"categories"):startTab();
  if(!TAB_ORDER.includes(n))n="categories";
  if(n==="rise"&&settings.riseVoidStart==="categories"){
    try{ensureBatch();}catch(e){}
    if(!riseDue())n="categories";
  }
  return n;
}

/* v2.89 — LE DÉFILEUR SE VERROUILLE PENDANT QU'UNE FEUILLE EST OUVERTE. Ce
   n'est pas un raffinement de modale : c'est ce qui sortait BODY de la chaîne
   de défilement du champ qui vient de prendre le focus. Voir le journal. Le
   verrou ne mémorise rien et ne restaure rien — body EST le défileur (height
   100 % + overflow-x hidden, qui fait calculer overflow-y en auto), donc
   passer son overflow à `hidden` lui garde sa boîte ET son scrollTop : rien
   ne saute, il n'y a pas de position à sauver. */
function showSheet(){pushLayer("sheet",()=>closeSheet());document.body.classList.add("sheetlock");document.getElementById("sheetOverlay").classList.add("open");document.getElementById("appSheet").classList.add("open");}
/* Fermer un panneau ne doit jamais faire perdre une correction : la fiche branche
   ici son enregistrement silencieux. closeSheet(true) = fermer sans repasser par lui
   (le geste a deja enregistre, ou le grain vient d'etre jete). */
let onSheetClose=null;
function closeSheet(skipSave){
  popLayer("sheet");
  if(!skipSave&&onSheetClose){const f=onSheetClose;onSheetClose=null;f();}
  onSheetClose=null;
  document.getElementById("sheetOverlay").classList.remove("open");
  const sh=document.getElementById("appSheet");
  sh.classList.remove("open");
  document.body.classList.remove("sheetlock");   /* v2.89 — showSheet() le repose si un autre panneau enchaîne */
  setTimeout(()=>{
    if(sh.classList.contains("open"))return;   /* un autre panneau a deja repris la main */
    sh.classList.remove("tall","fiche","hfix");  /* v2.71 — l'encre et la gouttière d'une fiche ne survivent pas à la feuille ; v2.95 — la hauteur imposée non plus */
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
    /* v2.90 — `inputmode="url"` retiré. Deux raisons qui vont dans le même sens.
       (1) Le champ prend « un lien OU une idée » : le clavier d'URL d'Android
       remplace la barre d'espace par « / » et « .com », ce qui rend la moitié
       de l'usage annoncé pénible. (2) Il changeait de CLAVIER — donc de HAUTEUR
       de fenêtre — dès qu'on passait de ce champ à Catégorie ou Tag, ce qui
       relançait à chaque fois la rafale de redimensionnement de la v2.89. Les
       trois champs partagent maintenant le même clavier. */
    `<div class="capfield"><input id="capIn" placeholder="Colle un lien, ou note une idée" autocomplete="off" enterkeyhint="done" aria-label="Ajouter à ta pile"></div>`+
    `<button class="chip cappaste" id="capPaste">Coller le presse-papier</button>`+
    /* v2.52 — les deux champs sont FACULTATIFS et le disent. Placés APRÈS le champ
       principal et AVANT « Ajouter » : l'ordre de lecture est celui du geste, et
       « Ajouter » reste à un tap du collage pour qui ne range pas. */
    `<div class="capopt">`+
      `<div class="capfield"><input id="capCat" placeholder="Catégorie (facultatif)" autocomplete="off" enterkeyhint="done" aria-label="Catégorie"></div>`+
      `<div class="capsug" id="capCatSug"></div>`+
      `<div class="capfield"><input id="capTag" placeholder="Tag (facultatif)" autocomplete="off" autocapitalize="off" enterkeyhint="done" aria-label="Tag"></div>`+
      `<div class="capsug" id="capTagSug"></div>`+
    `</div>`+
    `<button class="btn solid capgo" id="capGo">${icon('plus')}Ajouter</button>`+
    `<div class="capalt"><button class="btn ghost" id="capPhoto">Photo</button><button class="btn ghost" id="capFile">Fichier</button></div>`+
    `<button class="btn ghost capbulk" id="capBulk">Importer une liste…</button>`+
  `</div>`;
  /* v2.95 — HAUTEUR IMPOSÉE, exactement le mode B du prototype. La feuille de
     capture mesurait 472 px de contenu pour un plafond de 454 (barre
     d'auto-remplissage levée) ou 509 (barre baissée) : le contenu tombait PILE
     ENTRE LES DEUX, donc elle basculait de « plafonnée » à « libre » et retour
     à chaque apparition de la barre, et son bord haut sautait de 42 px. En
     hauteur imposée il n'y a plus qu'UN régime, donc plus de bascule : mesuré
     au pouce sur le prototype, l'écart tombe de ~40 px à ~5. Elle ne perd rien
     au change — à 472 px de contenu pour 454 de plafond, elle était déjà à sa
     hauteur maximale. On pose `hfix` et NON `tall` : `tall` impose la même
     hauteur mais emporte avec elle la typographie de fiche (filet sous
     l'en-tête, titre en mono capitales), ce qui aurait changé « Ajouter » en
     étiquette. `closeSheet()` retire les deux. */
  document.getElementById("appSheet").classList.add("hfix");
  const inp=list.querySelector("#capIn");
  const fCat=list.querySelector("#capCat"), fTag=list.querySelector("#capTag");
  const go=()=>{const v=(inp.value||"").trim();if(!v){inp.focus();return;}
    const m={cat:fCat.value,tag:fTag.value};closeSheet();addItem(v,m);};
  list.querySelector("#capGo").onclick=go;
  /* Entrée valide depuis n'importe lequel des trois champs : on ne force pas un
     aller-retour vers le bouton pour un geste à une main. */
  [inp,fCat,fTag].forEach(el=>el.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();go();}}));
  /* v2.53 — SUGGESTIONS. Elles n'existent qu'à partir de la première lettre : une
     rangée de puces sur un champ vide, c'est un menu, et un menu à la capture
     rendrait obligatoire ce qui est facultatif. L'ORDRE EST CELUI DE LA FRÉQUENCE,
     pas celui de l'index (leçon v2.49 : une fonction dérivée n'hérite pas de
     l'ordre d'affichage de l'écran qui l'appelle). Ticket #26 : c'est
     désormais l'ordre CHOISI pour la saisie (pickCats/pickTags), le même qu'en
     couche de choix — ici comme là-bas on veut la case la plus probable en
     premier, et « la plus probable » est ce que le bouton de tri décide. Coupé à six : au-delà, la rangée passe à deux lignes et
     pousse « Ajouter » sous le clavier. Un tap REMPLACE la frappe par le nom
     complet, comme la suggestion de tag de la fiche depuis la v2.14. */
  const wireSug=(field,box,pool,hash)=>{
    const draw=()=>{
      const k=tagKey(field.value);
      if(!k){box.innerHTML="";return;}
      const hits=pool().filter(x=>tagKey(x).includes(k)&&tagKey(x)!==k).slice(0,6);
      box.innerHTML=hits.map(x=>`<button class="chip" data-s="${esc(x)}">${hash?`<span class="taghash">#</span>`:""}${esc(x)}</button>`).join("");
      box.querySelectorAll("[data-s]").forEach(b=>b.onclick=()=>{field.value=b.dataset.s;box.innerHTML="";field.focus();});
    };
    field.addEventListener("input",draw);
  };
  wireSug(fCat,list.querySelector("#capCatSug"),()=>pickCats(allCats()),false);
  wireSug(fTag,list.querySelector("#capTagSug"),()=>pickTags(tagLib()),true);
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
  cat=resolveCat(cat)||"";tag=(tag||"").trim();   /* v2.52 — pas de jumelle de casse */
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
/* v2.68 — `openFilterSheet` est supprimée : ses deux rangées de pastilles et
   ses compteurs vivent maintenant dans `renderFilterBand()`, sous l'entonnoir.
   Sa ligne « Réinitialiser les filtres » ne suit pas : « Tous » et « Toutes »
   sont dans le bandeau, à portée du pouce, et « Tout effacer » reste dans la
   rangée d'état — trois chemins pour un retour en arrière, c'en était un de
   trop. */
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
/* Ticket #4 — LE RÉORDONNANCEMENT. Trois onglets font six ordres : un sélecteur
   à six entrées est illisible, et nommer « le premier » ne dit rien des deux
   autres. Le geste juste est celui qu'on fait sur une liste — appui long pour
   saisir, glissé pour poser — et c'est celui qui a été demandé.
   TROIS PRÉCAUTIONS, toutes payées ailleurs dans ce fichier :
   (a) l'appui long ne se déclenche pas si le doigt a bougé de plus de 10 px —
       sans ce seuil, on saisirait une ligne en voulant défiler la feuille
       (c'est le verrou de direction du chantier 5, en plus court) ;
   (b) une fois saisi, `touchmove` est annulé au niveau du document : changer
       `touch-action` en cours de geste n'a AUCUN effet sur le geste en cours,
       et la feuille défilerait sous la ligne qu'on déplace ;
   (c) le clavier fait le même travail par ↑ et ↓ — un contrôle qui n'a qu'un
       geste tactile n'existe pas au bureau, où le rail est justement la forme
       la plus visible de cette barre.
   Aucune cote n'est écrite ici : le pas du déplacement est MESURÉ entre deux
   lignes rendues, et la seule propriété posée depuis le JS est un `transform`,
   la même exception que `paintTabs` (§ 3). */
const TAB_LABEL={rise:"Remontée",categories:"Collection",pile:"Ma pile"};
/* Ticket #7 — LE CONTRÔLE RESSEMBLE À SA CIBLE. Le ticket #4 avait choisi une
   liste VERTICALE parce que c'est la grammaire connue du réordonnancement.
   Rapport au pouce : « plutôt que de faire une liste verticale, on va reproduire
   les tabs, pour pouvoir faire le drag and drop, plus logique ». C'est juste, et
   la raison est nommable : ce qu'on ordonne est HORIZONTAL, donc une liste
   verticale demande de traduire « en haut » en « à gauche » à chaque geste.
   Le contrôle reprend donc l'icône, le libellé et la pastille pleine de la barre
   du bas (ticket #2) — sans la pastille il ressemblerait à la barre sans en être
   une lecture fidèle.
   RIEN DE LA MÉCANIQUE N'A ÉTÉ RÉÉCRIT : `applyTabOrder`, `tabOrder`,
   `orderTrack` et `orderTabsBar` reçoivent un tableau de trois noms, d'où qu'il
   vienne. Seul l'AXE change dans `wireTabOrder`. */
const TAB_ICON={rise:"resurface",categories:"grid",pile:"pile"};
function setTabOrder(){
  const id=_setId("to");
  _setWire.push(()=>wireTabOrder(id));
  return `<div class="taborder" id="${id}">`+tabOrder().map((n,i)=>
    `<div class="tordrow${n===curTab?" on":""}" data-t="${n}" tabindex="0" role="button" `+
    `aria-label="${esc(TAB_LABEL[n]||n)}, position ${i+1} sur 3. Flèches gauche et droite pour déplacer.">`+
    icon(TAB_ICON[n]||"grid")+`<span class="tordn">${esc(TAB_LABEL[n]||n)}</span></div>`
  ).join("")+`</div>`;
}
function wireTabOrder(id){
  const box=document.getElementById(id); if(!box)return;
  const rows=[].slice.call(box.children);
  if(rows.length<2)return;
  let drag=null,timer=null,startY=0,startX=0;
  const block=e=>{if(drag)e.preventDefault();};
  const names=()=>rows.map(r=>r.getAttribute("data-t"));
  function commit(from,to){
    if(from===to)return;
    const o=names();const[x]=o.splice(from,1);o.splice(to,0,x);
    applyTabOrder(o);haptic(8);
    openSettingsSheet();          /* la barre se redessine dans son nouvel ordre */
  }
  /* Ticket #7 — LE PAS EST MESURÉ, JAMAIS ÉCRIT. Il l'était déjà au ticket #4,
     sur `top` ; il l'est ici sur `left`. Aucune cote ne descend du CSS vers le
     JS, et changer la largeur des onglets ne demande rien à ce fichier (§ 3). */
  function paint(dx){
    const {row,from,step}=drag;
    let to=from+(step?Math.round(dx/step):0);
    to=Math.max(0,Math.min(rows.length-1,to));
    drag.to=to;
    rows.forEach((r,i)=>{
      if(r===row){r.style.transform="translateX("+dx+"px)";return;}
      let sh=0;
      if(from<to&&i>from&&i<=to)sh=-step;
      else if(from>to&&i>=to&&i<from)sh=step;
      r.style.transform=sh?"translateX("+sh+"px)":"";
    });
  }
  function end(ok){
    const d=drag;drag=null;
    document.removeEventListener("touchmove",block);
    box.classList.remove("dragging");
    rows.forEach(r=>{r.classList.remove("grab");r.style.transform="";});
    if(ok&&d)commit(d.from,d.to);
  }
  rows.forEach(row=>{
    row.addEventListener("pointerdown",e=>{
      if(drag)return;
      startY=e.clientY;startX=e.clientX;
      timer=setTimeout(()=>{
        timer=null;
        try{row.setPointerCapture(e.pointerId);}catch(_){}
        const i=rows.indexOf(row);
        const step=rows[1].getBoundingClientRect().left-rows[0].getBoundingClientRect().left;
        drag={row,from:i,to:i,step};
        box.classList.add("dragging");row.classList.add("grab");haptic(12);
        /* Une fois la barre saisie, `touchmove` est annulé au niveau du DOCUMENT :
           changer `touch-action` en cours de geste n'a aucun effet, et la feuille
           défilerait sous l'onglet qu'on déplace (précaution du ticket #4). */
        document.addEventListener("touchmove",block,{passive:false});
        paint(0);
      },350);
    });
    row.addEventListener("pointermove",e=>{
      /* Le seuil de 10 px vaut sur LES DEUX axes, et c'est volontaire : partir
         en diagonale doit rendre le geste à la feuille, pas saisir un onglet. */
      if(timer&&(Math.abs(e.clientY-startY)>10||Math.abs(e.clientX-startX)>10)){clearTimeout(timer);timer=null;}
      if(drag&&drag.row===row)paint(e.clientX-startX);
    });
    row.addEventListener("pointerup",()=>{
      if(timer){clearTimeout(timer);timer=null;return;}
      if(drag&&drag.row===row)end(true);
    });
    row.addEventListener("pointercancel",()=>{
      if(timer){clearTimeout(timer);timer=null;}
      if(drag&&drag.row===row)end(false);
    });
    /* Ticket #7 — ↑/↓ deviennent ←/→ : le clavier suit l'axe qu'il voit. Un
       contrôle qui n'a qu'un geste tactile n'existe pas au bureau (ticket #4). */
    row.addEventListener("keydown",e=>{
      const i=rows.indexOf(row);
      if(e.key==="ArrowLeft"&&i>0){e.preventDefault();commit(i,i-1);}
      else if(e.key==="ArrowRight"&&i<rows.length-1){e.preventDefault();commit(i,i+1);}
    });
  });
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
/* v2.98 — le pas à pas saisissable. La grille de vingt-quatre pastilles a
   disparu : elle donnait au réglage le plus rare le plus gros bloc de la
   feuille. Le champ est un `contenteditable="plaintext-only"`, JAMAIS un
   `input` : l'auto-remplissage de Chrome ne s'accroche qu'aux
   `input`/`textarea`/`select`, donc pas de barre, donc pas de vue qui respire.
   v2.99 — LES MINUTES DEVIENNENT UN SECOND CHAMP. Deux travées saisissables
   séparées par un deux-points de décor, et les flèches ne touchent QUE l'heure.
   Le câblage est écrit UNE fois et posé deux : les deux champs n'ont que trois
   choses à eux — leur borne haute, le réglage qu'ils écrivent, et le champ vers
   lequel ils passent la main. Un second bloc recopié aurait été le doublon
   habituel, et il se serait vu au premier correctif. */
function setHours(){
  const id=_setId("sh");
  _setWire.push(()=>{
    const el=document.getElementById(id); if(!el)return;
    const fH=el.querySelector(".stpn.h"), fM=el.querySelector(".stpn.m");
    if(!fH||!fM)return;
    let live=false, prev=null;
    const p2=n=>(n<10?"0":"")+n;
    const paint=()=>{fH.textContent=p2(frameHour());fM.textContent=p2(frameMin());};
    const put=(h,m)=>{
      settings.frameHour=Math.max(0,Math.min(23,h|0));
      settings.frameMin=Math.max(0,Math.min(59,m|0));
      /* v3.00 — poser une heure ENCORE À VENIR rend la journée : sans ça, un
         cadre déjà reçu ce matin verrouillait `frameDay` et le nouveau seuil ne
         pouvait rien produire avant le lendemain. La règle est écrite une seule
         fois, dans `rearmFrame`, et n'enregistre pas — c'est le `saveSettings`
         ci-dessous qui pose les trois valeurs d'un coup. */
      rearmFrame();
      saveSettings();paint();
      /* Reposer une heure DÉJÀ passée doit pouvoir servir le jour même : la
         relecture de l'heure s'en charge dans les quinze secondes, une fois
         cette feuille refermée (l'annonce s'abstient sous une couche). */
    };
    const range=(n,end)=>{try{const r=document.createRange();r.selectNodeContents(n);
      if(end)r.collapse(false);
      const s=getSelection();s.removeAllRanges();s.addRange(r);}catch(e){}};

    /* Un seul câblage pour les deux travées.
       `max` borne la valeur ; `thr` en découle et n'est pas un nombre magique :
       un premier chiffre au-delà de la dizaine maximale ne PEUT plus être une
       dizaine, il vaut donc pour lui-même — 3 pour les heures (23), 6 pour les
       minutes (59). C'est la règle des sélecteurs d'heure natifs, et elle
       économise un appui sur deux.
       `next` fait passer la main : deux chiffres tapés dans les heures amènent
       aux minutes, clavier levé, tout sélectionné. La main ne se passe QUE sur
       une validation au clavier — sortir en touchant ailleurs ne doit pas
       rouvrir un champ que personne n'a demandé. */
    const wire=(f,max,write,next)=>{
      const thr=Math.floor(max/10)+1;
      f.setAttribute("contenteditable","plaintext-only");
      /* `plaintext-only` peut ne pas être reconnu : on REGARDE ce que le moteur
         a retenu au lieu de le supposer, et on retombe sur `true` — le champ ne
         fait que deux chiffres et `input` les filtre déjà. */
      if(f.contentEditable!=="plaintext-only")f.setAttribute("contenteditable","true");
      f.addEventListener("focus",()=>{
        prev={h:frameHour(),m:frameMin()};live=true;f.classList.add("on");range(f,false);
      });
      f.addEventListener("blur",()=>{
        live=false;f.classList.remove("on");
        const t=f.textContent.replace(/\D/g,"");
        /* Un champ vidé n'est pas une demande de zéro : on rend la valeur d'avant. */
        if(!t){paint();return;}
        write(Math.max(0,Math.min(max,+t)));haptic(8);
      });
      f.addEventListener("beforeinput",e=>{
        if(e.inputType==="insertLineBreak"||e.inputType==="insertParagraph"){e.preventDefault();f.blur();return;}
        if(e.inputType&&e.inputType.indexOf("insert")===0&&!/^\d*$/.test(e.data||""))e.preventDefault();
      });
      f.addEventListener("input",()=>{
        const raw=f.textContent, t=raw.replace(/\D/g,"").slice(0,2);
        if(t!==raw){f.textContent=t;range(f,true);}
        if(t.length===2||(t.length===1&&+t>=thr)){f.blur();if(next)next.focus();}
      });
      f.addEventListener("keydown",e=>{
        if(e.key==="Escape"){e.preventDefault();const p=prev;f.blur();if(p)put(p.h,p.m);}
      });
    };
    wire(fM,59,m=>put(frameHour(),m),null);
    wire(fH,23,h=>put(h,frameMin()),fM);

    /* Les flèches ne touchent QUE l'heure, et c'est demandé : elles servent au
       voisin immédiat — lever le clavier pour passer de 7 h à 8 h coûterait plus
       que le pas économisé — pendant que les minutes, qu'on ne parcourt pas une
       à une, restent au clavier. Le bouclage 23 -> 0 est celui d'une horloge. */
    el.querySelectorAll("button[data-d]").forEach(b=>{
      const d=+b.dataset.d;
      const step=()=>{if(live)return;put((frameHour()+d+24)%24,frameMin());haptic(8);};
      let acc=null,rep=null;
      const stop=()=>{clearTimeout(acc);clearInterval(rep);acc=rep=null;};
      b.addEventListener("click",step);
      b.addEventListener("pointerdown",()=>{acc=setTimeout(()=>{rep=setInterval(step,110);},420);});
      ["pointerup","pointerleave","pointercancel"].forEach(ev=>b.addEventListener(ev,stop));
    });
    paint();
  });
  const p2=n=>(n<10?"0":"")+n;
  const f=(cls,lab,v)=>`<span class="stpn ${cls}" inputmode="numeric" enterkeyhint="done" role="textbox"`
    +` aria-label="${lab}" spellcheck="false" autocapitalize="off">${p2(v)}</span>`;
  return `<div class="stp" id="${id}">`
    +`<button class="stpb" data-d="-1" aria-label="Une heure de moins">−</button>`
    +`<span class="stpv">`
    +f("h","Heure d’arrivée, heures, de 0 à 23",frameHour())
    +`<span class="stpc">:</span>`
    +f("m","Heure d’arrivée, minutes, de 0 à 59",frameMin())
    +`</span>`
    +`<button class="stpb" data-d="1" aria-label="Une heure de plus">+</button>`
    +`</div>`;
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

  /* v2.63 — « Actualiser l'application » monte tout en haut. C'est la seule
     ligne des Réglages qu'on vient parfois chercher vite — voir la version,
     forcer la mise à jour du PWA — donc elle passe devant les groupes de réglage. */
  h+=setBox("Application",
     `<button class="setact" id="setRefresh">Actualiser l'application<em>${esc(APP_VERSION)}</em></button>`);

  h+=setBox("Général",
     /* Ticket #3 — quatre choix sur DEUX lignes, parce que « Dernier onglet » ne
        tenait pas dans un quart de ligne à 360 px, et qu'un libellé tronqué est
        un réglage qu'on ne peut pas choisir.
        Ticket #6 — le réglage est compacté, et ce n'est pas la grille qui
        change : c'est le LIBELLÉ. « Dernier onglet » devient « Dernier », les
        trois autres font 8 à 10 caractères, et la ligne unique redevient
        tenable. Le mot perd un peu de sens isolé — le titre de la ligne (« Au
        démarrage, ouvrir ») le lui rend, et c'est la seule des trois formes
        étudiées qui ne coûte pas un aller-retour à l'usage.
        La VALEUR stockée reste "last" : aucune migration.
        LE LIBELLÉ N'A PAS SUFFI, ET C'EST LA MESURE QUI L'A DIT. À quatre
        colonnes, « Collection » déborde de 2 px à 390 px et de 9 px à 360 px
        même avec « Dernier » : le corps de 13 px du segment est trop grand pour
        un quart de ligne. D'où `.seg.four`, un corps de 11,5 px — la même sorte de
        variante que `.seg.days`, qui descend déjà à 11 px pour tenir sept jours
        sur une ligne, donc aucune voix nouvelle dans le système. Et sous 360 px,
        où aucun corps ne tient, la variante REPASSE à deux colonnes : c'est
        une règle de média dans styles.css, aucune décision prise en JS (§ 3).
        Mesuré avant de livrer (§ 5), et c'est la seule chose qui décidait :
        `scrollWidth` contre `clientWidth` sur les quatre boutons, à 320 et
        360 px — aucun débordement, alors que « Dernier onglet » en produisait.
        Un changement de valeur redessine la feuille (défilement conservé) parce
        que la ligne suivante n'existe QUE sur « Remontée » — motif des sourdines. */
     setStack("Au démarrage, ouvrir",null,setSeg(
        [["rise","Remontée"],["categories","Collection"],["pile","Ma pile"],["last","Dernier"]],
        settings.startTab,
        v=>{settings.startTab=v;saveSettings();openSettingsSheet();},4,"four"))
    +(settings.startTab==="rise"?setStack("Un jour sans remontée",
        "Quand le tirage du jour est vide.",setSeg(
        [["stay","Rester"],["categories","Aller à Collection"]],settings.riseVoidStart||"stay",
        v=>{settings.riseVoidStart=v;saveSettings();},2)):"")
    +setStack("Ordre des onglets","Appui long sur un onglet, puis glisser.",setTabOrder())
    +setStack("Thème",null,setSeg(
        [["auto","Auto"],["light","Clair"],["dark","Sombre"]],settings.theme,
        v=>{settings.theme=v;applyTheme();saveSettings();}))
    /* v2.50 — combien d'items l'aperçu montre quand on déplie une catégorie.
       Trois valeurs fermées (3/5/8), la grammaire de batchSize : un réglage
       qui coûte une ligne et rien à l'usage. « Tout » n'y est pas — il vit au
       pied de l'aperçu (« Voir tout »), par catégorie, pas globalement. */
    +setStack("Aperçu des catégories",null,setSeg(
        [["3","3"],["5","5"],["8","8"]],settings.peekSize,
        v=>{settings.peekSize=parseInt(v,10);saveSettings();repaintCatNodes();})));

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
  /* v2.83 — les dates échues laissées par un `bringForward()` d'avant la v2.82.
     Elles se consomment une par carte au fil du rituel, ce qui est le
     comportement juste mais demande N tours ; cette ligne les solde d'un tap.
     Une porte comptée et explicite plutôt qu'une migration silencieuse : rien
     ne permet de distinguer une date posée à la main d'une date posée en lot
     (même heure, 9 h), donc c'est au doigt de trancher, pas à une heuristique. */
  const nDueOld=items.filter(i=>i.status==="active"&&i.surfaceAfter&&i.surfaceAfter<=Date.now()).length;
  const muted=(settings.mutedCats||[]).length;
  const statLine=(id,l,hint,n)=>`<button class="setact statline" id="${id}"><span class="setlbl">${esc(l)}<small>${esc(hint)}</small></span><span class="statright">${n==null?"":`<span class="statn">${n}</span>`}<span class="chev">›</span></span></button>`;
  let stat="";
  if(nUnfiled)              stat+=statLine("stUnfiled","Non classés","À ranger dans une catégorie.",nUnfiled);
  if(surfaceOn()&&nNever)   stat+=statLine("stNever","Jamais remontés","La remontée ne les a pas encore montrés.",nNever);
  if(nDormant)              stat+=statLine("stDormant","Dormants","6 mois et plus sans jamais resurgir.",nDormant);
  if(nDueOld)               stat+=statLine("stDueOld","Dates échues","Elles ne contraignent plus rien : les retirer.",nDueOld);
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
    /* Le libellé dit un SEUIL, pas un réveil : promettre une arrivée à heure
       fixe serait mentir, rien ne tourne quand l'app est fermée. */
    /* v2.98 — `setRow` et non `setStack` : le pas à pas tient sur la ligne du
       libellé, la grille ne le pouvait pas. C'est tout le gain de la version. */
    surf+=setRow("Heure d’arrivée","Le cadre attend cette heure. Avant, la journée n’est pas dépensée.",setHours());
  }
  /* Dernier mot du tableau de vocabulaire du cap 09 : « Surface » quitte l'UI.
     Il partait avec ce chantier, pas avant — renommer un onglet la veille de le
     supprimer coûtait deux passes sur les mêmes lignes. */
  h+=setBox("La remontée",surf);

  /* Le groupe « Ma pile » a disparu (chantier 13) : la vue et la densité se
     changent en contexte, elles vivent dans la barre d'axes — et les trois
     densités ont fondu dans liste / compact. */
  /* v3.04 — la réparation n'apparaît QUE s'il y a quelque chose à réparer, et
     elle disparaît d'elle-même une fois passée : une action qui ne fait rien
     n'a pas à occuper une ligne de réglages pour toujours. */
  const _rep=repairTitles(true).length;
  h+=setBox("Données",
     /* Ticket #31 — la copie locale se VOIT. Une sauvegarde dont on ignore
        l'existence ne rassure personne et ne se vérifie jamais ; celle-ci dit sa
        date et son compte, et s'enregistre en un geste. */
     `<button class="setact" id="setMirror">Copie locale<em>${esc(mirrorLabel())}</em></button>`
    +`<button class="setact" id="setExport">Exporter ma pile<em>JSON</em></button>`
    +`<button class="setact" id="setImport">Importer un export<span class="chev">›</span></button>`
    +(_rep?`<button class="setact" id="setFixTitles">Raccourcir les titres importés<em>${_rep}</em></button>`:""));

  /* v2.65 — la présentation ne se consomme pas une fois : elle enseigne un
     geste (partager sur Android, copier-coller sur iOS) qu'on oublie, et la
     seule chose qu'on cherche alors est « où était-ce déjà ? ». Elle vit donc
     dans « À propos », en tête : c'est la ligne d'aide de cette app. */
  h+=setBox("À propos",
     `<button class="setact" id="setReplayOb">Revoir la présentation<span class="chev">›</span></button>`
    +`<a class="setact" href="mailto:sable@dartois.studio?subject=%5BSable-Bug%5D%20">Signaler un bug<span class="chev">›</span></a>`
    +`<a class="setact" href="mailto:sable@dartois.studio?subject=%5BSable-Enhancement%5D%20">Proposer une amélioration<span class="chev">›</span></a>`
    +`<a class="setact" href="https://dartois.studio/Sable/" target="_blank" rel="noopener">Site<em>dartois.studio/Sable/</em></a>`
    +`<a class="setact" href="https://github.com/dartois-studio/Sable" target="_blank" rel="noopener">Code source<em>GitHub</em></a>`);

  /* Ticket #28 — QUI SUIS-JE. Rien à l'écran ne disait sur quel compte on est,
     et la connexion sans mot de passe fabrique un compte par adresse : une
     adresse saisie autrement ouvre une pile vide À CÔTÉ de la vraie, sans rien
     détruire — indiscernable d'une perte. L'adresse se lit donc au-dessus du
     bouton qui en change. */
  const _who=currentEmail();
  h+=`<div class="setfoot">Sable ${APP_VERSION} · sable@dartois.studio<br>Fait par Dartois Studio · réglages mémorisés sur cet appareil</div>`
    +`<div class="setbox">`
    +(_who?`<div class="setrow setwho"><span>Compte</span><em>${esc(_who)}</em></div>`:"")
    +`<button class="setact danger" id="setSignout">Se déconnecter</button></div>`;

  h+=`</div>`;
  L.innerHTML=h;
  _setWire.forEach(f=>f());
  wireInk(L);

  const rob=document.getElementById("setReplayOb");
  if(rob)rob.onclick=()=>{
    /* La feuille part avant : l'onboarding est une couche plein écran, et deux
       couches ouvertes laisseraient les Réglages sous lui au retour. Le délai
       est celui de la fermeture de la feuille, pas un chiffre au hasard. */
    closeSheet();
    setTimeout(()=>openOnboarding("settings"),260);
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
  bindStat("stUnfiled",()=>{enterCollection("none");});
  bindStat("stNever",bringForward);
  bindStat("stDormant",enterDormant);
  bindStat("stPull",pullNow);
  bindStat("stDueOld",clearDueDates);
  const rf=document.getElementById("setRefresh"); if(rf)rf.onclick=refreshApp;
  document.getElementById("setExport").onclick=()=>{exportData();};
  document.getElementById("setMirror").onclick=()=>{
    const m=readMirror();
    if(!m){toast("Aucune copie locale sur cet appareil.");return;}
    toast(exportMirror()?"Copie locale enregistrée.":"Enregistrement impossible ici.");
  };
  document.getElementById("setImport").onclick=()=>document.getElementById("fImport").click();
  const _fx=document.getElementById("setFixTitles");
  if(_fx)_fx.onclick=async()=>{
    const t=repairTitles(true);
    if(!t.length){toast("Aucun titre à raccourcir.");return;}
    /* Trois exemples plutôt qu'un compte seul : un nombre ne dit pas si la
       découpe tombe juste, trois titres avant/après le disent d'un coup. */
    const ex=t.slice(0,3).map(x=>"· "+x.avant.slice(0,58)+"…\n  → "+x.apres).join("\n\n");
    if(!confirm(t.length+" titre(s) seront raccourcis. Le texte d'origine est conservé "
      +"en entier dans la fiche, sous « Texte d'origine », et la recherche continue "
      +"de le parcourir.\n\n"+ex+"\n\nAppliquer ?"))return;
    repairTitles(false);
    /* v2.66 : on n'annonce rien avant que l'écriture soit confirmée. */
    const ok=await saveItems();
    if(!ok){toast(SAVE_FAIL_MSG);return;}
    renderAll();
    toast(t.length+" titre(s) raccourcis.");
    openSettingsSheet();   /* la ligne disparaît : il n'y a plus rien à réparer */
  };
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
function renderAll(){ensureBatch();if(riseOpen())renderStage();renderPileTab();renderCategories();
  renderRiseTab();   /* ticket #5 — la garde de surcouche est tombée : la fonction vit dans ce fichier */
  uiReady=true;}

/* ---------- fiche d'un grain (édition) ----------
   Deux blocs : en haut le grain tel qu'il est, en bas son rangement.
   Tout ce qui ne sert pas en permanence (couverture, lien, remontée
   programmée, liste complète des catégories) est replié derrière un
   seul bouton — sinon la fiche redevient un mur de pastilles. */
let editingGrain=null;
/* v2.88 — miroir hors fermeture du `dirty` de la fiche : un aperçu qui arrive
   en arrière-plan doit savoir si la feuille porte une modification en cours. */
let grainDirty=false;
let editTint="ocre";
function openGrainSheet(id){
  const it=items.find(i=>i.id===id); if(!it)return;
  editingGrain=id;
  editTint=it.iconTint||"ocre";
  const isNote=it.type==="note";
  const isLink=it.type==="youtube"||it.type==="link";
  const ytThumb=(it.type==="youtube"&&ytId(it.url))?("https://img.youtube.com/vi/"+ytId(it.url)+"/hqdefault.jpg"):null;
  /* v2.67 — le vivier ne contient plus que des PHOTOS. Une icone n'y a jamais eu
     sa place : ce sont deux objets, et la banque Iconify est deja son propre
     vivier (recents + recherche). */
  const cands=[];
  (it.previews||[]).forEach(u=>{if(u&&!isIcon(u)&&!cands.includes(u))cands.push(u);});
  if(it.preview&&!cands.includes(it.preview))cands.unshift(it.preview);
  if(ytThumb&&!cands.includes(ytThumb))cands.push(ytThumb);
  let chosenCover=it.preview||ytThumb||null;
  /* Ticket #24 — LA PHOTO IMPORTÉE N'A PAS DE `preview`. Son pixel vit dans le
     magasin de médias (`getMedia`), pas dans l'item : la liste le savait
     (`rowThumb` pose un jeton `data-media` que `hydrateMedia` remplace), la
     fiche ne le savait pas. `mediaCover` est un visuel D'AFFICHAGE SEULEMENT :
     il n'entre ni dans `snap()` ni dans `commit()`, donc la fiche ne se croit
     pas modifiée en l'affichant et `it.preview` ne reçoit jamais une image en
     base64 — ce serait recopier le média dans le blob des items. */
  let mediaCover=null;
  let chosenIcon=it.icon||null;
  let pickedDom=it.domain||"";
  let pickedTags=[...(it.tags||[])];
  let when=it.surfaceAfter||null;
  let whenOpen=!!when;
  let titleOpen=!!it.title;

  const sh=document.getElementById("appSheet");
  sh.classList.add("tall","fiche");   /* v2.72 — « tall » est une hauteur, « fiche » est une grammaire */
  document.getElementById("sheetTitle").textContent="Item · "+typeLabel(it);

  /* v2.71 — l'en-tête ne garde QU'UNE action. « Mettre de côté » et « Jeter »
     y étaient deux icônes jumelles, de même taille et de même place, alors que
     l'une est fréquente et réversible d'un tap et que l'autre vide la fiche.
     Deux poids différents demandent deux places différentes : « Jeter » descend
     en pied de liste, en texte. La règle de la v2.67 tient toujours — l'action
     rare reste atteignable sans défiler, et jamais collée à Enregistrer. */
  document.getElementById("sheetHeadAct").innerHTML=
    `<button class="sheadbtn" id="gArch" title="${it.status==="archived"?"Remettre en pile":"Mettre de côté"}" aria-label="${it.status==="archived"?"Remettre en pile":"Mettre de côté"}">${icon(it.status==="archived"?"restore":"archive")}</button>`;

  /* pied : l'action principale, toujours sous le pouce */
  const F=document.getElementById("sheetFoot");
  F.hidden=false;
  F.innerHTML=`<button class="gsave clean" id="gSave"><span class="dot"></span><span id="gSaveLbl">À jour</span></button>`;

  /* v2.67 — trois blocs. IDENTITÉ (ce qu'est l'item : son visage, son titre, sa
     source), RANGEMENT (où il vit), CONTEXTE (pourquoi on l'a gardé, quand le
     revoir). Avant, tout se suivait dans l'ordre d'écriture des fonctionnalités. */
  const L=document.getElementById("sheetList");
  L.innerHTML=`
    <div class="ident">
      <div class="gcover" id="gCover" hidden>
        <img class="zoomable" id="gCoverImg" data-full="" src="" alt="">
        <button class="cvtap" id="gCovTap" aria-label="Changer le visuel"></button>
        <button class="gbadge on" id="gBadgeOn" hidden><img id="gBadgeOnImg" alt=""></button>
      </div>
      <div class="identrow" id="identRow">
        <button class="gbadge" id="gBadgeOff"><img id="gBadgeOffImg" alt=""><span class="ph" id="gBadgePh">${icon("image")}</span><span class="cog">${icon("pencil")}</span></button>
        <div class="identmain">
          ${isNote?`<div id="titleMount"></div>`:`<textarea class="gtitle" id="gTitle" rows="1" placeholder="Sans titre">${esc(it.title||"")}</textarea>`}
          ${isLink?`<div id="urlMount"></div>`:""}
        </div>
      </div>
      ${isNote?`<textarea class="gtext" id="gContent" rows="1" placeholder="Ta note…">${esc(it.content||"")}</textarea>`:""}
      ${(it.hasMedia&&(it.type==="video"||it.type==="audio"))?`<div class="gplay${it.type==="audio"?" aud":""}"><div class="ph">chargement…</div></div>`:""}
      ${(it.hasMedia&&!it.title)?`<div class="gfile">${icon("note")}<span>${esc(it.content||"")}</span></div>`:""}
    </div>

    ${it.body?`<details class="gbody"><summary>Texte d'origine</summary><div class="gbodytxt">${esc(it.body)}</div></details>`:""}

    <div class="sect"><div class="eyebrow">Rangement</div></div>
    <div class="acard">
      <button class="arow" id="rowCat" type="button">${icon("folder","ai")}
        <span class="lbl">Catégorie</span><span class="vwrap" id="catVal"></span>${icon("chevron-left","chev")}
      </button>
      <button class="arow" id="rowTags" type="button">${icon("hash","ai")}
        <span class="lbl">Tags</span><span class="vwrap" id="tagVal"></span>${icon("chevron-left","chev")}
      </button>
      <button class="arow" id="rowWhen" type="button">${icon("clock","ai")}
        <span class="lbl">Remontée</span><span class="vwrap" id="whenVal"></span>${icon("chevron-left","chev")}
      </button>
    </div>

    <div class="sect"><div class="eyebrow">Pourquoi tu l'as gardé</div></div>
    <div class="notefld">
      <textarea id="gNote" rows="2" placeholder="Un contexte, une intention, la phrase qui t'a arrêté…">${esc(it.note||"")}</textarea>
      <div class="rule"></div>
    </div>

    <button class="dngr" id="gTrash">Jeter<small>Récupérable depuis la corbeille</small></button>`;

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
    chosenCover||"",chosenIcon||"",editTint,
    /* v2.71 — le vivier ne vit plus dans la feuille : `cands` est la source de
       vérité, plus le DOM d'un panneau qui n'existe qu'une fois déplié. Lire le
       DOM marchait tant que le panneau était TOUJOURS monté ; depuis que le
       vivier est dans la couche, il ne l'est plus, et une image ajoutée puis la
       couche refermée passait pour « rien à enregistrer ». */
    cands.join("|")]);
  let base=snap(),dirty=false;grainDirty=false;
  function touch(){
    dirty=(snap()!==base);grainDirty=dirty;
    const b=F.querySelector("#gSave");if(!b)return;
    b.classList.toggle("clean",!dirty);
    const lbl=F.querySelector("#gSaveLbl");if(lbl)lbl.textContent=dirty?"Enregistrer":"À jour";
  }
  L.addEventListener("input",touch);

  const iconSrcNow=(u)=>u?iconUrl(u,editTint):"";
  /* ================= identité : deux objets, deux places =================
     La couverture est une image, elle prend une boîte 16/9. L'icône est une
     marque, elle tient dans un blason — posé SUR la couverture quand les deux
     existent, à gauche du titre sinon. Une icône n'occupe jamais la place d'une
     photo : c'était le premier défaut signalé, et il reste réglé.
     v2.71 — ce qui change : le visuel se touche LÀ OÙ IL SE VOIT. Le bouton
     « Média » et son atelier disparaissent. C'était un accordéon dans la
     feuille, contenant un segment, contenant la banque d'icônes greffée en bas :
     quatre niveaux d'imbrication pour un objet qu'on regarde. Le blason (ou la
     couverture) ouvre la couche ; le blason existe donc TOUJOURS, en pointillés
     quand il n'y a rien — sinon il n'y aurait plus aucune porte quand l'item est
     nu, et c'est précisément le moment où l'on veut lui en poser une. */
  function drawIdent(){
    const cov=L.querySelector("#gCover"),cimg=L.querySelector("#gCoverImg");
    const bOn=L.querySelector("#gBadgeOn"),bOff=L.querySelector("#gBadgeOff");
    const row=L.querySelector("#identRow");
    /* le visuel montré est la couverture choisie, ou à défaut le média gardé */
    const face=chosenCover||mediaCover;
    cov.hidden=!face;
    if(face){cimg.src=face;cimg.setAttribute("data-full",face);}
    bOn.hidden=!(face&&chosenIcon);
    /* sans couverture le blason reste, avec ou sans icône : c'est la porte. */
    bOff.hidden=!!face;
    bOff.classList.toggle("none",!chosenIcon);
    row.classList.toggle("nocov",!face);
    const ph=L.querySelector("#gBadgePh");
    if(ph)ph.hidden=!!chosenIcon;
    const s2=chosenIcon?iconSrcNow(chosenIcon):"";
    const oi=L.querySelector("#gBadgeOnImg"),fi=L.querySelector("#gBadgeOffImg");
    oi.src=s2;fi.src=s2;fi.hidden=!chosenIcon;
  }
  const setTint=(k)=>{editTint=k;drawIdent();touch();};
  const setCover=(u)=>{chosenCover=u||null;drawIdent();touch();};
  const setIcon=(u)=>{chosenIcon=u?iconBase(u):null;drawIdent();touch();};
  const addCoverThumb=(u)=>{
    if(!u)return;
    if(isIcon(u)){setIcon(u);return;}          /* filet : une icône ne rejoint jamais le vivier photo */
    if(!cands.includes(u))cands.unshift(u);
    setCover(u);
  };
  const delCoverThumb=(u)=>{
    const i2=cands.indexOf(u); if(i2>-1)cands.splice(i2,1);
    if(chosenCover===u)chosenCover=cands[0]||null;
    drawIdent();touch();
  };
  /* Une seule porte, trois déclencheurs : la couverture, le blason posé dessus,
     le blason seul. Ils montrent la même chose, ils ouvrent la même chose. */
  const openVisuel=()=>openVisuelLayer({
    sub:it.title||hostOf(it.url)||typeLabel(it),
    panes:["icon","cover"],
    getIcon:()=>chosenIcon, setIcon:setIcon,
    getTint:()=>editTint,   setTint:setTint,
    covs:()=>cands.filter(Boolean),
    getCover:()=>chosenCover, setCover:setCover,
    addCover:addCoverThumb,   delCover:delCoverThumb,
    onRefresh:isLink?(async()=>{
      popLayer("visuel");closeVisuelLayer();
      if(dirty)await commit();
      refreshPreview(id);
    }):null
  });
  ["#gCovTap","#gBadgeOn","#gBadgeOff"].forEach(sel=>{
    const b=L.querySelector(sel); if(b)b.onclick=e=>{e.stopPropagation();openVisuel();};
  });

  /* ---- titre d'une note : facultatif, donc absent tant qu'il n'existe pas ---- */
  function drawTitleOpt(){
    const m=L.querySelector("#titleMount");if(!m)return;
    if(!titleOpen){
      m.innerHTML=`<button class="linkbtn tight" id="addTitle">Ajouter un titre…</button>`;
      m.querySelector("#addTitle").onclick=()=>{titleOpen=true;drawTitleOpt();const t=gTitle();if(t)t.focus();};
    }else{
      m.innerHTML=`<textarea class="gtitle" id="gTitle" rows="1" placeholder="Titre de l’item">${esc(it.title||"")}</textarea>`;
      wireGrow(gTitle());
    }
  }
  if(isNote)drawTitleOpt();

  /* ---- lien : replié derrière son domaine, il ne sert qu'à corriger ---- */
  let urlOpen=false;
  function drawUrl(){
    const m=L.querySelector("#urlMount");if(!m)return;
    if(!urlOpen){
      /* v2.72 — le crayon passe APRÈS l'hôte. Le nom d'une catégorie porte le sien
           à droite ; la source le portait à gauche, si bien que deux libellés
           corrigeables au même geste ne commençaient pas sur la même verticale. */
      m.innerHTML=`<button class="gsrc" id="urlEdit"><span>${esc(hostOf(it.url)||it.url||"")}</span>${icon("pencil")}</button>`;
      m.querySelector("#urlEdit").onclick=()=>{urlOpen=true;drawUrl();};
    }else{
      m.innerHTML=`<input class="gurl" id="gUrl" value="${esc(it.url||"")}" inputmode="url" autocapitalize="off" autocomplete="off" spellcheck="false">`;
      const i2=m.querySelector("#gUrl");if(i2)i2.focus();
    }
  }
  if(isLink)drawUrl();

  /* ================= rangement : deux lignes qui montrent leur valeur =========
     v2.67 — avant, la liste des catégories s'ouvrait SOUS la ligne de pastilles :
     valider renvoyait le choix hors écran, il fallait remonter pour le voir. Le
     choix passe dans une couche (openPickLayer) qui glisse par-dessus la fiche et
     rend la main exactement là où on était, la valeur affichée sur la ligne. */
  function drawRows(){
    const cv=L.querySelector("#catVal"),tv=L.querySelector("#tagVal"),wv=L.querySelector("#whenVal");
    cv.innerHTML=pickedDom?`<span class="catchip">${catFace(pickedDom,"xs")}${esc(pickedDom)}</span>`:`<span class="none">Aucune</span>`;
    tv.innerHTML=pickedTags.length?pickedTags.map(t=>`<span class="tagchip"><span class="taghash">#</span>${esc(t)}</span>`).join(""):`<span class="none">Aucun</span>`;
    /* v2.71 — la remontée dit sa valeur sur sa rangée, comme les deux autres.
       Avant, elle vivait dans un accordéon : « Programmer une remontée… », puis
       trois pastilles, un champ date, un résumé et un lien de retrait, dépliés
       DANS la feuille. Six éléments pour une donnée, et rien de tout ça ne se
       lisait tant qu'on n'avait pas déplié — donc on ne savait pas, en ouvrant
       une fiche, si une date était posée. */
    /* v2.83 — la fiche est l'ÉDITEUR : elle montre la valeur stockée même échue,
       sinon on ne pourrait plus la retirer. Mais elle dit son état, sinon la
       rangée promet une contrainte que la liste (whenMini) n'affiche plus. */
    wv.innerHTML=when?`<span class="wv">${esc(fmtDay(when))}${when<=Date.now()?" · échue":""}</span>`:`<span class="none">Sans contrainte</span>`;
  }
  L.querySelector("#rowCat").onclick=()=>{
    const counts=domCounts();
    openPickLayer({
      title:"Catégorie · une seule",
      placeholder:"Chercher ou créer une catégorie…",
      single:true,
      selected:pickedDom?[pickedDom]:[],
      options:()=>pickCats(allCats()).map(d=>[d,counts[d]||0]),
      sortable:true,
      /* v2.66 — resolveCat, comme la capture et l'import : taper « fonts » à côté
         d'un « Fonts » existant ne doit pas fabriquer la jumelle. */
      resolve:v=>resolveCat(v)||v,
      apply:sel=>{pickedDom=sel[0]||"";drawRows();touch();}
    });
  };
  L.querySelector("#rowTags").onclick=()=>{
    openPickLayer({
      title:"Tags · autant que tu veux",
      placeholder:"Chercher ou créer un tag…",
      hash:true,
      selected:[...pickedTags],
      /* ticket #26 : l'ordre vient de pickTags, commandé par le bouton de tri
         de la couche — plus de l'ordre de fréquence figé de tagLib(). */
      options:()=>pickTags(tagLib()).map(t=>[t,tagCount(t)]),
      sortable:true,
      resolve:v=>normTag(v),
      same:(a,b)=>tagKey(a)===tagKey(b),
      apply:sel=>{pickedTags=sel.map(normTag).filter(Boolean);drawRows();touch();}
    });
  };
  /* ---- remontée programmée : une donnée, pas encore une fonctionnalité.
         Le tirage la consultera au chantier 7 ; ici on la pose seulement. ---- */
  const plusM=m=>{const d=new Date();d.setMonth(d.getMonth()+m);d.setHours(9,0,0,0);return d.getTime();};
  const sameDay=(a,b)=>a&&b&&Math.abs(a-b)<432e5;
  L.querySelector("#rowWhen").onclick=()=>openWhenLayer();
  /* La couche de la remontée emprunte la carcasse de la couche de choix : même
     en-tête, même retour, mêmes rangées cochées. Une valeur unique parmi cinq,
     donc choisir referme — exactement comme une catégorie. */
  function openWhenLayer(){
    const lay=document.getElementById("pkLayer");
    if(!lay||layerOn("pick"))return;
    const opts=[[0,"Sans contrainte"],[1,"Dans 1 mois"],[3,"Dans 3 mois"],[6,"Dans 6 mois"]];
    lay.hidden=false;
    const paint=()=>{
      const cur=opts.find(([m])=>m?sameDay(when,plusM(m)):!when);
      lay.innerHTML=`<div class="pkhead">`
        +`<button class="pkback" id="wBack" aria-label="Retour">${icon("chevron-left")}</button>`
        +`<div class="pkt"><div class="eyebrow">Remontée</div><b>Ne pas remonter avant…</b></div></div>`
        +`<div class="pkscroll">`
        +`<div class="sect"><div class="eyebrow">Délai</div></div><div class="acard">`
        +opts.map(([m,l])=>`<button class="arow${cur&&cur[0]===m?" sel":""}" data-m="${m}">`
          +`<span class="ck">${icon("check")}</span><span class="lbl">${l}</span></button>`).join("")
        +`</div>`
        +`<div class="sect"><div class="eyebrow">Ou une date précise</div></div>`
        +`<div class="acard"><div class="arow static">${icon("clock","ai")}`
        +`<span class="lbl">Choisir le jour</span>`
        +`<input type="date" id="wDate" value="${when?toDateInput(when):""}"></div></div>`
        +`<div class="ichint">${when?("Cet item ne ressortira pas avant le "+esc(fmtDay(when))+"."):"Sans date posée, il peut remonter n\u2019importe quand."}</div>`
        +`</div>`;
      const done=()=>{popLayer("pick");closePickLayer();};
      lay.querySelector("#wBack").onclick=done;
      lay.querySelectorAll("[data-m]").forEach(b=>b.onclick=()=>{
        const m=+b.dataset.m;when=m?plusM(m):null;
        whenOpen=!!when;drawRows();touch();haptic(10);done();});
      lay.querySelector("#wDate").onchange=e=>{
        const v=e.target.value;when=v?new Date(v+"T09:00:00").getTime():null;
        whenOpen=!!when;drawRows();touch();paint();};
    };
    paint();
    pkApply=null;
    pushLayer("pick",closePickLayer);
    const seq=++pkSeq;
    requestAnimationFrame(()=>{if(seq===pkSeq)lay.classList.add("open");});
  }
  drawRows();
  drawIdent();
  /* Ticket #24 — le média est lu APRÈS le premier rendu : la fiche s'ouvre tout
     de suite, l'image arrive quand le magasin répond. La garde `editingGrain`
     évite qu'une réponse lente ne repeigne une fiche déjà refermée ou déjà
     rouverte sur un autre item. `getMedia` a son propre cache mémoire. */
  if(it.hasMedia&&it.type==="image"){
    getMedia(it.id).then(d=>{
      if(!d||editingGrain!==id)return;
      mediaCover=d;drawIdent();
    });
  }
  /* Ticket #25 — la vidéo et le son n'ont pas de visage, ils ont un LECTEUR.
     Même chemin que la photo — le magasin lu après le premier rendu, la même
     garde `editingGrain` — mais le jeton est remplacé sur place par la balise
     qui convient, comme le fait `hydrateMedia` ailleurs. On ne l'appelle pas
     ici : elle ne connaît pas la fiche, donc pas la fiche qu'on a pu refermer
     ou rouvrir sur un autre item pendant la lecture. Rien n'est écrit : ni
     `snap()` ni `commit()` ne lisent ce nœud. */
  if(it.hasMedia&&(it.type==="video"||it.type==="audio")){
    getMedia(it.id).then(d=>{
      if(editingGrain!==id)return;
      const n=L.querySelector(".gplay .ph"); if(!n)return;
      if(!d){n.textContent="média indisponible";return;}
      n.outerHTML=it.type==="video"
        ?`<video controls playsinline src="${d}"></video>`
        :`<audio controls src="${d}"></audio>`;
    });
  }

  /* ---- enregistrement ---- */
  async function commit(){
    /* v2.66 — une catégorie créée depuis la fiche s'inscrit dans settings.cats,
       comme le font déjà la capture (addItem) et le classement par lot. Sans
       ça elle n'existait que tant qu'un item la portait : la retirer du dernier
       item la faisait disparaître de l'index. Relevé AVANT l'écriture de
       it.domain, sinon domains() la contient déjà et le test ne voit rien. */
    const newCat=(pickedDom&&!allCats().includes(pickedDom))?pickedDom:null;
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
      it.previews=cands.filter(Boolean);
      it.preview=chosenCover||null;
    }
    /* v2.67 — l'icone est un champ a part : elle survit au remplacement du lien,
       parce que c'est une marque posee a la main, pas un aperçu derive de l'URL. */
    it.icon=chosenIcon||null;
    it.iconTint=editTint;
    /* v2.66 — on ne solde ni le dirty ni la feuille avant la confirmation. */
    const ok=await saveItems();
    if(!ok)return false;
    if(newCat){settings.cats=settings.cats||[];if(!settings.cats.includes(newCat)){settings.cats.push(newCat);saveSettings();}}
    base=snap();dirty=false;grainDirty=false;
    renderAll();
    if(it.url&&(!it.preview||!it.title))enrich(it.id);
    return true;
  }
  /* fermer le panneau ne doit jamais faire perdre une correction */
  onSheetClose=()=>{if(dirty)commit().then(ok=>toast(ok?"Item mis à jour.":SAVE_FAIL_MSG));};

  /* v2.66 — les trois actions qui écrivent attendent la confirmation avant de
     fermer. Un échec laisse la feuille ouverte : la correction reste sous les
     yeux, et l'état mémoire est remis dans la position qu'il avait, sinon
     l'écran montrerait un archivage que la base ignore. */
  document.getElementById("gArch").onclick=async()=>{
    if(dirty&&!await commit()){toast(SAVE_FAIL_MSG);return;}
    const cur=items.find(i=>i.id===id);
    const prev=cur?cur.status:null;
    if(cur)cur.status=cur.status==="archived"?"active":"archived";
    if(!await saveItems()){if(cur)cur.status=prev;toast(SAVE_FAIL_MSG);return;}
    renderAll();closeSheet(true);
    toast(cur&&cur.status==="archived"?"Mis de côté.":"Remis en pile.");
  };
  document.getElementById("gTrash").onclick=async()=>{
    const cur=items.find(i=>i.id===id);
    const prev=cur?cur.status:null;
    if(cur){cur.status="trashed";lastTrashed=id;}
    if(!await saveItems()){if(cur)cur.status=prev;lastTrashed=null;toast(SAVE_FAIL_MSG);return;}
    renderAll();closeSheet(true);toast("Jeté.",true);
  };
  F.querySelector("#gSave").onclick=async()=>{
    if(!dirty){closeSheet(true);return;}
    if(!await commit()){toast(SAVE_FAIL_MSG);return;}
    closeSheet(true);haptic(14);toast("Item mis à jour.");
  };

  touch();
  showSheet();
}
/* ---------- v2.67 : la couche de choix (catégorie, tags) ----------
   Avant, la liste s'ouvrait SOUS la ligne des pastilles : elle poussait le
   formulaire, et valider renvoyait le choix hors écran — il fallait remonter
   pour voir ce qu'on venait de poser. Ici une surface glisse par-dessus la
   fiche : liste complète, recherche et création au même endroit, sélection
   épinglée sous le champ, et fermer rend la main pile où on était.
   Elle s'empile comme couche NOMMÉE au-dessus de « sheet » : le retour système
   la ferme avant la fiche, et fermer la fiche la ferme avec elle (popLayer
   défait les couches posées au-dessus).
   Le retour ET « Terminé » appliquent tous les deux. Deux portes pour un même
   geste, parce que RIEN ne s'écrit ici : le pied de la fiche reste le seul
   endroit où l'on enregistre.
   Pas de focus automatique sur le champ : le clavier mangerait la moitié de la
   liste, alors que le motif dominant est « je choisis dans ce qui existe ». */
let pkApply=null,pkSeq=0;
function closePickLayer(){
  const lay=document.getElementById("pkLayer");
  if(!lay||lay.hidden)return;
  if(pkApply){const f=pkApply;pkApply=null;try{f();}catch(e){}}
  /* invalide une ouverture encore en vol : sans ça, une fermeture immédiate
     (choix à valeur unique) verrait la trame suivante REPOSER la classe open,
     et la couche resterait affichée sur une sélection déjà appliquée. */
  pkSeq++;
  lay.classList.remove("open");
  setTimeout(()=>{if(!lay.classList.contains("open")){lay.hidden=true;lay.innerHTML="";}},240);
}
function openPickLayer(opt){
  const lay=document.getElementById("pkLayer");
  if(!lay||layerOn("pick"))return;
  const same=opt.same||((a,b)=>a===b);
  const hash=opt.hash?`<span class="taghash">#</span>`:"";
  let sel=[...(opt.selected||[])];
  pkApply=()=>{if(opt.apply)opt.apply(sel);};
  lay.hidden=false;
  lay.innerHTML=`
    <div class="pkhead"><button class="pkback" id="pkBack" aria-label="Retour">${icon("chevron-left")}</button><h3>${esc(opt.title)}</h3></div>
    <div class="pksearch"><input id="pkQ" placeholder="${esc(opt.placeholder||"Chercher…")}" autocomplete="off" autocapitalize="off" enterkeyhint="done"></div>
    ${opt.sortable?`<div class="pksort"><div class="seg" style="--n:${PICK_SORTS.length}" id="pkSort">`+PICK_SORTS.map(([k,l])=>`<button data-ps="${k}"${pickSort===k?' class="on"':''}>${esc(l)}</button>`).join("")+`</div></div>`:""}
    <div class="pksel" id="pkSel"></div>
    <div class="pklist" id="pkList"></div>
    <div class="pkfoot"><button class="pkdone" id="pkDone">Terminé</button></div>`;
  const q=lay.querySelector("#pkQ"),selBox=lay.querySelector("#pkSel"),list=lay.querySelector("#pkList");
  /* ticket #26 — LE TRI EST UNE PASTILLE DANS LA COUCHE, PAS UNE LIGNE DE
     RÉGLAGES. L'ordre d'une liste se juge SUR la liste : une feuille venue du
     bas couvrirait exactement ce qu'on règle (le motif écarté en v3.02 pour la
     largeur des cartes). Le segment vit HORS de la zone qui défile, sous le
     champ, comme les teintes de la couche du visuel (v2.71) — il ne part donc
     jamais sous le doigt quand on tape. Un tap ne reconstruit QUE la liste :
     `draw()` la redessine déjà à chaque frappe, il n'y a rien de plus à
     repeindre et surtout pas renderAll. */
  const sortBox=lay.querySelector("#pkSort");
  if(sortBox)sortBox.querySelectorAll("[data-ps]").forEach(b=>b.onclick=()=>{
    if(!setPickSort(b.dataset.ps))return;
    sortBox.querySelectorAll("[data-ps]").forEach(x=>x.classList.toggle("on",x.dataset.ps===pickSort));
    draw();
  });
  const done=()=>{popLayer("pick");closePickLayer();};
  const pick=(n)=>{
    /* une seule valeur : le tap suffit, on referme. Plusieurs : on reste. */
    if(opt.single){sel=(sel.length&&same(sel[0],n))?[]:[n];q.value="";draw();done();return;}
    sel=sel.some(x=>same(x,n))?sel.filter(x=>!same(x,n)):[...sel,n];
    q.value="";draw();
  };
  function draw(){
    const v=q.value.trim(),k=tagKey(v);
    const opts=opt.options()||[];
    const hits=opts.filter(([n])=>!k||tagKey(n).includes(k));
    const exact=opts.some(([n])=>tagKey(n)===k)||sel.some(n=>tagKey(n)===k);
    selBox.innerHTML=sel.map(n=>`<span class="tagchip">${hash}${esc(n)}<button class="x" data-rm="${esc(n)}" aria-label="Retirer ${esc(n)}">✕</button></span>`).join("");
    selBox.querySelectorAll("[data-rm]").forEach(b=>b.onclick=()=>{sel=sel.filter(x=>!same(x,b.dataset.rm));draw();});
    const ck=`<span class="ck">${icon("check")}</span>`;
    list.innerHTML=
      (v&&!exact&&!opt.noCreate?`<button class="pkrow new" data-new="1">${ck}<span class="nm">Créer « ${esc(v)} »</span><span class="n">+</span></button>`:"")
      +hits.map(([n,c])=>`<button class="pkrow${sel.some(x=>same(x,n))?" on":""}" data-n="${esc(n)}">${ck}<span class="nm">${hash}${esc(n)}</span><span class="n">${c}</span></button>`).join("")
      +(!hits.length&&!v?`<div class="pkempty">Rien ici pour l'instant. Tape un nom pour en créer un.</div>`:"");
    list.querySelectorAll("[data-n]").forEach(b=>b.onclick=()=>pick(b.dataset.n));
    const nb=list.querySelector("[data-new]");
    if(nb)nb.onclick=()=>{const r=opt.resolve?opt.resolve(v):v;if(r)pick(r);};
  }
  /* v2.71 — `noCreate` : la fusion choisit une cible EXISTANTE. Sans ce filet,
     taper un nom inconnu aurait fabriqué une catégorie vide puis versé la
     source dedans — un renommage déguisé en fusion. */
  const create=()=>{if(opt.noCreate)return;const v=q.value.trim();if(!v)return;const r=opt.resolve?opt.resolve(v):v;if(r)pick(r);};
  q.addEventListener("input",draw);
  q.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();create();}});
  lay.querySelector("#pkBack").onclick=done;
  lay.querySelector("#pkDone").onclick=done;
  draw();
  pushLayer("pick",closePickLayer);
  const seq=++pkSeq;
  requestAnimationFrame(()=>{if(seq===pkSeq)lay.classList.add("open");});
}
/* ---------- v2.71 : la couche du VISUEL (icône, couverture) ----------
   Avant, la banque d'icônes se GREFFAIT au bas de la feuille : le champ de
   recherche se retrouvait sous deux grilles, ses résultats s'écrivaient encore
   plus bas, et le clavier finissait de les couvrir. On tapait sans rien voir.
   Ici la même grammaire que le choix d'une catégorie (v2.67) : une couche
   glisse par-dessus la feuille, le champ et les teintes vivent HORS de la zone
   qui défile, et taper REMPLACE les bandes au lieu de s'empiler dessous.
   Un seul objet pour deux protocoles : `panes` vaut ["icon"] pour une
   catégorie, ["icon","cover"] pour un item — la couverture n'existe pas sur une
   catégorie, et le segment ne s'affiche donc que s'il a deux choses à dire. */
let icOpt=null,icPane="icon",icQ="",icSeq=0,icT=null;
function closeVisuelLayer(){
  const lay=document.getElementById("icLayer");
  if(!lay||lay.hidden)return;
  clearTimeout(icT);
  icOpt=null;icSeq++;
  lay.classList.remove("open");
  setTimeout(()=>{if(!lay.classList.contains("open")){lay.hidden=true;lay.innerHTML="";}},240);
}
function openVisuelLayer(opt){
  const lay=document.getElementById("icLayer");
  if(!lay||layerOn("visuel"))return;
  icOpt=opt;icQ="";
  /* v2.76 — `opt.pane` ouvre la couche sur le volet du GESTE qui l'a appelée :
     toucher une couverture ouvre « Couverture », toucher un blason ouvre
     « Icône ». Sans ça, poser une photo demandait un tap de plus sur un segment
     qu'il fallait d'abord remarquer. Sans `pane`, on garde le dernier volet
     visité — le comportement des trois déclencheurs de la fiche d'un item, qui
     montrent la même chose et doivent continuer d'ouvrir la même chose. */
  const pn=opt.panes||["icon"];
  icPane=pn.includes(opt.pane)?opt.pane:(pn.includes(icPane)?icPane:"icon");
  if(!pn.includes("cover"))icPane="icon";
  lay.hidden=false;
  drawVisuel();
  pushLayer("visuel",closeVisuelLayer);
  const seq=++icSeq;
  requestAnimationFrame(()=>{if(seq===icSeq)lay.classList.add("open");});
}
/* Un seul point de redessin : la couche se réécrit en entier à chaque geste.
   Elle n'a pas d'état propre à préserver — la sélection vit chez l'appelant —
   et un redessin complet coûte moins qu'une mécanique de mise à jour partielle
   qui finirait par diverger, comme l'atelier de la v2.67 avait divergé. */
function drawVisuel(){
  const lay=document.getElementById("icLayer"),o=icOpt;
  if(!lay||!o)return;
  const panes=o.panes||["icon"];
  const cur=o.getIcon(),tint=o.getTint?o.getTint():"ocre";
  const cell=(base,on)=>`<button class="iccell${on?" on":""}" data-base="${esc(base)}" `
    +`title="${esc(base.replace(/^https?:\/\/api\.iconify\.design\//,"").replace(/\.svg.*$/,""))}">`
    +`<img src="${esc(iconUrl(base,tint))}" alt="" loading="lazy"></button>`;
  const tray=(list)=>`<div class="icband"><div class="ictray">`
    +list.map(b=>cell(b,iconBase(b)===iconBase(cur||""))).join("")+`</div></div>`;
  const blbl=(t,n)=>`<div class="icblbl"><span class="eyebrow">${esc(t)}</span>`
    +(n?`<em>${n}</em>`:``)+`</div>`;

  /* v2.77 — la puce d'en-tête disait TOUJOURS l'icône, y compris dans le volet
     « Couverture » : un carré barré posé en haut à droite d'une grille de treize
     couvertures, qui se lit comme une erreur et non comme un état. Elle dit
     maintenant l'état du VOLET OUVERT, et disparaît quand il n'y a rien à dire —
     un élément d'état absent vaut mieux qu'un élément d'état vide (v2.46), et la
     sélection du vivier est déjà signalée en dessous par son cadre. */
  const shotNow=(icPane==="cover"&&o.getCover)?o.getCover():null;
  const chip=icPane==="cover"
    ?(shotNow?`<span class="pkcur shot"><img src="${esc(shotNow)}" alt=""></span>`:"")
    :(cur?`<span class="pkcur"><img src="${esc(iconUrl(cur,tint))}" alt=""></span>`:"");
  const head=`<div class="pkhead">`
    +`<button class="pkback" id="icBack" aria-label="Retour">${icon("chevron-left")}</button>`
    +`<div class="pkt"><div class="eyebrow">${panes.length>1?"Visuel":"Icône"}</div>`
    +`<b>${esc(o.sub||"")}</b></div>`
    +chip+`</div>`;
  const seg=panes.length>1
    ?`<div class="seg icseg" style="--n:2">`
      +`<button data-p="icon"${icPane==="icon"?' class="on"':''}>Icône</button>`
      +`<button data-p="cover"${icPane==="cover"?' class="on"':''}>Couverture</button></div>`
    :"";

  let pinned="",scroll="",foot="";
  if(icPane==="icon"){
    pinned=`<div class="pksearch${icQ?" filled":""}">`
      +`<span class="mag">${icon("search")}</span>`
      +`<input id="icQ" value="${esc(icQ)}" placeholder="Chercher une icône" `
      +`autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="search">`
      +`<button class="clr" id="icClr" aria-label="Effacer">${icon("close")}</button></div>`
      +`<div class="ictint">`+ICON_TINT_ORDER.map(k=>
        `<button class="ictsw${k===tint?" on":""}" data-tint="${k}" `
        +`title="${ICON_TINT_LABEL[k]}" style="color:${tintHex(k)}"></button>`).join("")+`</div>`;
    /* trois états, jamais empilés : au repos les bandes, en frappe courte une
       phrase, en frappe utile les résultats SEULS. C'est tout le correctif. */
    if(icQ.trim().length>=2){
      scroll=`<div class="icres" id="icRes">`+blbl("Recherche")
        +`<div class="ichint">Recherche…</div></div>`;
    }else if(icQ.trim()){
      scroll=`<div class="ichint"><b>Encore une lettre.</b>`
        +`La recherche part à deux caractères.</div>`;
    }else{
      const rec=(settings.iconRecents||[]);
      scroll=(rec.length?blbl("Récents")+tray(rec):"")
        +blbl("Suggérées",ICON_SUGGEST.length)
        +tray(ICON_SUGGEST.map(ic=>"https://api.iconify.design/"+ic+".svg?height=240"));
    }
    if(cur)foot=`<div class="pkfoot"><button class="pkrm" id="icRm">Retirer l'icône</button></div>`;
  }else{
    const covs=o.covs?o.covs():[];
    const sel=o.getCover?o.getCover():null;
    /* v2.76 — l'étiquette du vivier se dit par l'appelant : « Dans cet item »
       pour un item, « Dans cette catégorie » pour une catégorie. Et la croix de
       retrait n'existe que si l'appelant sait retirer : le vivier d'une
       catégorie est DÉRIVÉ de ses items, en retirer une vignette ne voudrait
       rien dire — au mieux ça ne tiendrait pas, au pire ça toucherait l'item. */
    scroll=blbl(o.covLabel||"Dans cet item",covs.length||"")
      +(covs.length
        ?`<div class="icband"><div class="icshots">`+covs.map(u=>
          `<div class="icshotw"><button class="icshot${u===sel?" on":""}" data-u="${esc(u)}">`
          +`<img src="${esc(u)}" alt="" loading="lazy"></button>`
          +(o.delCover?`<button class="icshotdel" data-del="${esc(u)}" aria-label="Retirer cette image">`
          +icon("close")+`</button>`:"")+`</div>`).join("")+`</div></div>`
        :`<div class="ichint"><b>Aucune image proposée.</b>`
          +`Ajoute-en une ci-dessous, ou laisse la tuile dérivée faire son travail.</div>`)
      +blbl("Ajouter")
      +`<div class="acard">`
      +`<button class="arow" data-src="gallery">${icon("image","ai")}`
        +`<span class="lbl">Depuis la galerie</span>${icon("chevron-left","chev")}</button>`
      +`<button class="arow" data-src="paste">${icon("clipboard","ai")}`
        +`<span class="lbl">Coller une image</span>${icon("chevron-left","chev")}</button>`
      +`<button class="arow" data-src="link">${icon("link","ai")}`
        +`<span class="lbl">Depuis un lien…</span>${icon("chevron-left","chev")}</button>`
      +(o.onRefresh?`<button class="arow" data-src="refresh">${icon("refresh","ai")}`
        +`<span class="lbl">Rafraîchir l'aperçu<small>Redemande l'image au site</small></span>`
        +icon("chevron-left","chev")+`</button>`:"")
      +`</div><div id="icExtra"></div>`
      +`<input type="file" id="icFile" accept="image/*" hidden>`;
    if(sel)foot=`<div class="pkfoot"><button class="pkrm" id="icCvRm">Retirer la couverture</button></div>`;
  }
  lay.innerHTML=head+seg+pinned+`<div class="pkscroll">${scroll}</div>`+foot;

  const done=()=>{popLayer("visuel");closeVisuelLayer();};
  lay.querySelector("#icBack").onclick=done;
  lay.querySelectorAll("[data-p]").forEach(b=>b.onclick=()=>{icPane=b.dataset.p;icQ="";drawVisuel();});
  lay.querySelectorAll("[data-tint]").forEach(b=>b.onclick=()=>{
    if(o.setTint)o.setTint(b.dataset.tint);drawVisuel();});
  const pick=(base)=>{const b=iconBase(base);pushIconRecent(b);o.setIcon(b);done();};
  lay.querySelectorAll("[data-base]").forEach(b=>b.onclick=()=>pick(b.dataset.base));
  const rm=lay.querySelector("#icRm");
  if(rm)rm.onclick=()=>{o.setIcon(null);drawVisuel();};
  const crm=lay.querySelector("#icCvRm");
  if(crm)crm.onclick=()=>{o.setCover(null);drawVisuel();};
  lay.querySelectorAll("[data-u]").forEach(b=>b.onclick=()=>{o.setCover(b.dataset.u);done();});
  lay.querySelectorAll("[data-del]").forEach(b=>b.onclick=e=>{
    e.stopPropagation();if(o.delCover)o.delCover(b.dataset.del);drawVisuel();});

  const q=lay.querySelector("#icQ");
  if(q){
    q.addEventListener("input",()=>{
      const at=q.selectionStart,was=icQ.trim().length>=2;
      icQ=q.value;
      /* on ne réécrit la couche que si l'ÉTAT change (bandes → phrase →
         résultats). Réécrire à chaque frappe volerait le focus et le curseur. */
      if((icQ.trim().length>=2)!==was||!icQ.trim()||icQ.trim().length<2){
        drawVisuel();
        const n=document.getElementById("icQ");
        if(n){n.focus();try{n.setSelectionRange(at,at);}catch(e){}}
      }
      clearTimeout(icT);
      if(icQ.trim().length>=2)icT=setTimeout(runIconSearch,320);
    });
    lay.querySelector("#icClr").onclick=()=>{icQ="";drawVisuel();};
    if(icQ.trim().length>=2)runIconSearch();
  }
  const fi=lay.querySelector("#icFile");
  if(fi)fi.onchange=async()=>{
    const f=fi.files&&fi.files[0];fi.value="";if(!f)return;
    try{o.addCover(await fileToImage(f,900,.72));drawVisuel();}catch(e){toast("Image illisible.");}
  };
  lay.querySelectorAll("[data-src]").forEach(b=>b.onclick=()=>wireCoverSrc(b.dataset.src));
}
/* La recherche écrit dans son seul conteneur : la zone qui défile ne bouge pas,
   donc le champ ne se déplace jamais sous le doigt pendant qu'on tape. */
async function runIconSearch(){
  const lay=document.getElementById("icLayer"),o=icOpt;
  if(!lay||!o||icPane!=="icon")return;
  const res=lay.querySelector("#icRes");if(!res)return;
  const term=icQ.trim();if(term.length<2)return;
  const tint=o.getTint?o.getTint():"ocre";
  try{
    const r=await fetch("https://api.iconify.design/search?query="+encodeURIComponent(term)+"&limit=48");
    const j=await r.json();const icons=(j&&j.icons)||[];
    if(icQ.trim()!==term)return;                 /* frappe plus récente : on jette */
    if(!icons.length){
      res.innerHTML=`<div class="ichint"><b>Rien sous « ${esc(term)} ».</b>`
        +`Essaie un mot anglais : coffee, book, plane.</div>`;
      return;
    }
    res.innerHTML=`<div class="icblbl"><span class="eyebrow">Résultats</span>`
      +`<em>${icons.length}</em></div><div class="icband"><div class="ictray">`
      +icons.map(ic=>{const b="https://api.iconify.design/"+ic+".svg?height=240";
        return `<button class="iccell" data-base="${esc(b)}" title="${esc(ic)}">`
          +`<img src="${esc(iconUrl(b,tint))}" alt="" loading="lazy"></button>`;}).join("")
      +`</div></div>`;
    res.querySelectorAll("[data-base]").forEach(b=>b.onclick=()=>{
      const bb=iconBase(b.dataset.base);pushIconRecent(bb);o.setIcon(bb);
      popLayer("visuel");closeVisuelLayer();});
  }catch(e){
    res.innerHTML=`<div class="ichint"><b>Recherche indisponible.</b>`
      +`Le réseau ne répond pas — les suggérées, elles, marchent hors ligne.</div>`;
  }
}
/* Les trois sources d'une couverture. Elles étaient cinq petits boutons gris
   dans la feuille ; ce sont maintenant trois rangées dans la couche, la même
   forme que « Catégorie » ou « Tags ». Un rôle, une forme. */
async function wireCoverSrc(src){
  const lay=document.getElementById("icLayer"),o=icOpt;
  if(!lay||!o)return;
  if(src==="gallery"){const f=lay.querySelector("#icFile");if(f)f.click();return;}
  if(src==="refresh"){if(o.onRefresh)o.onRefresh();return;}
  if(src==="paste"){
    try{
      const cis=await navigator.clipboard.read();
      for(const ci of cis){
        const t=ci.types.find(x=>x.startsWith("image/"));
        if(t){const f=new File([await ci.getType(t)],"collee",{type:t});
          o.addCover(await fileToImage(f,900,.72));drawVisuel();return;}
      }
      toast("Aucune image dans le presse-papier.");
    }catch(e){toast("Collage non autorisé par le navigateur.");}
    return;
  }
  if(src==="link"){
    const ex=lay.querySelector("#icExtra");if(!ex)return;
    ex.innerHTML=`<div class="iclink"><input id="icLink" placeholder="https://…/image.jpg" `
      +`inputmode="url" autocapitalize="off" autocomplete="off" spellcheck="false">`
      +`<button class="chip" id="icLinkOk">OK</button></div>`;
    const inp=ex.querySelector("#icLink");inp.focus();
    ex.querySelector("#icLinkOk").onclick=()=>{
      const v=(inp.value||"").trim();
      if(!/^https?:\/\//i.test(v)){toast("Lien d'image invalide.");return;}
      o.addCover(proxImg(v)||v);drawVisuel();
    };
  }
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

/* ---------- toast ----------
   v3.03 — le toast se VIDE une fois fondu. La règle CSS suffit à rendre le mot
   inerte ; on retire quand même le nœud, parce qu'un élément `position:fixed`
   qui traîne au bas de l'écran est une cible en attente d'une règle distraite.
   Le jeton de séquence est obligatoire : sans lui, la purge d'un toast expiré
   effacerait le toast affiché entre-temps — le motif des animations minutées
   de ce fichier. */
let toastT,toastPurge,toastSeq=0;
function toast(msg,action){
  const t=document.getElementById("toast");
  let label=null,fn=null,long=false;
  if(action===true){label="annuler";fn=undoTrash;long=true;}
  else if(action&&typeof action==="object"){label=action.label;fn=action.fn;long=true;}
  t.innerHTML=esc(msg)+(label?`<span class="u" id="toastAct">${esc(label)}</span>`:"");
  t.classList.add("show");
  const seq=++toastSeq;
  const hide=()=>{
    if(seq!==toastSeq)return;
    t.classList.remove("show");
    clearTimeout(toastPurge);
    /* 400 ms > les 280 ms de la transition d'opacité : on ne vide jamais un
       toast encore en train de se fondre. */
    toastPurge=setTimeout(()=>{if(seq===toastSeq&&!t.classList.contains("show"))t.innerHTML="";},400);
  };
  if(label){document.getElementById("toastAct").onclick=()=>{hide();if(fn)fn();};}
  clearTimeout(toastT);toastT=setTimeout(hide,long?4600:2200);
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
  closeFilterBand();          /* v2.68 — il vit sous l'entonnoir de Ma pile, pas ailleurs */
  closeViewBand();   /* v2.69 — idem pour les deux autres panneaux d'en-tête */
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
  else if(name==="rise")renderRiseTab();
  /* v2.44 — l'onglet est une couche, mais une seule : quitter l'onglet de départ
     empile un cran, y revenir le rend. C'est la convention Android (le retour
     ramène à l'onglet de départ avant de sortir), et c'est ce qui fait qu'un
     retour depuis Ma pile ne quitte plus l'app. */
  /* Ticket #4 — `homeTab` ET NON `startTab()`. Depuis le ticket #3 les deux
     peuvent différer : un jour vide avec « Aller à Collection » ouvre sur
     Collection alors que le réglage dit « Remontée ». Le retour Android doit
     ramener là où l'app S'EST OUVERTE, pas là où elle avait promis de s'ouvrir —
     sinon il empile un cran sur l'écran d'accueil lui-même. */
  if(name===homeTab)popLayer("tab");
  else pushLayer("tab",()=>selectTab(homeTab));
  /* v3.00 — le cadre ne vit que sur Collection : y arriver est une occasion de
     relire l'heure, sans attendre le prochain tour de l'intervalle. C'était le
     suspect laissé debout par la v2.97 (« démarrage sur Ma pile »), et il ne
     pouvait pas se refermer tant que la garde de couche comptait « tab ». */
  if(name==="categories")announceRise();
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
/* Ticket #1 du journal de suivi — TROIS ONGLETS, et la remontée en tête.
   « À gauche évoque ce qui est avant » : c'est la place que la v3.09 avait déjà
   donnée à sa porte dans la barre, on ne fait que la lui rendre en tant qu'onglet.
   TAB_ORDER n'est plus l'ordre AFFICHÉ (le ticket #4 le fait dériver d'un
   réglage) : il est l'ENSEMBLE des onglets connus et leur ordre PAR DÉFAUT.
   Toute validation doit porter sur l'appartenance à cette liste, jamais sur le
   rang qu'on y occupe — c'est la leçon des deux écrans blancs v2.22 et v2.39. */
const TAB_ORDER=["rise","categories","pile"];
/* Ticket #4 du journal de suivi — L'ORDRE DES ONGLETS SE RÈGLE.
   `settings.tabOrder` est la SEULE exception du lot à l'invariant « pas de champ
   nouveau sans nécessité », et elle est justifiée : un ordre choisi ne se dérive
   de rien. Coût de migration nul — les réglages sont un blob JSON, une clé de
   plus n'est qu'une clé de plus.

   LE FILTRE EST ÉCRIT ICI, ET NULLE PART AILLEURS. Une valeur venue du stockage
   peut être n'importe quoi : une chaîne, un tableau vide, un nom d'onglet mort
   (« surface »), un doublon, une liste de deux entrées. Chacun de ces cas
   rendrait une piste dont le rang ne coïncide plus avec le DOM — le décalage
   d'un cran des v2.22 et v2.39, les deux seuls écrans blancs que ce dépôt ait
   payés, et la seule classe de bug qu'il ait payée DEUX FOIS.
   On ne valide donc pas « est-ce le bon ordre » mais « est-ce une permutation
   complète des onglets connus » : on garde ce qui appartient à TAB_ORDER, on
   jette les doublons, on complète avec ce qui manque dans l'ordre par défaut.
   La sortie a toujours exactement les mêmes membres que TAB_ORDER, quoi qu'il y
   ait en base. */
function tabOrder(){
  const raw=(typeof settings!=="undefined"&&settings&&Array.isArray(settings.tabOrder))?settings.tabOrder:null;
  if(!raw)return TAB_ORDER;
  const out=[];
  raw.forEach(n=>{if(TAB_ORDER.includes(n)&&!out.includes(n))out.push(n);});
  TAB_ORDER.forEach(n=>{if(!out.includes(n))out.push(n);});
  return out;
}
/* LA BARRE SUIT LA PISTE. `orderTrack()` réaligne les sections ; sans son
   pendant sur les boutons, l'ordre réglé serait vrai dans le glissé et faux
   sous le pouce. Les deux nœuds propres au bureau encadrent les boutons
   (.dk-railhead en tête, .dk-keys en pied) : on insère AVANT les raccourcis,
   ce qui les laisse tous les deux à leur place. */
function orderTabsBar(){
  const nav=document.querySelector(".tabs"); if(!nav)return;
  const keys=nav.querySelector(".dk-keys");
  tabOrder().forEach(n=>{
    const b=nav.querySelector('.tabs button[data-tab="'+n+'"]');
    if(b)keys?nav.insertBefore(b,keys):nav.appendChild(b);
  });
}
/* Le point unique par lequel un ordre neuf entre en vigueur : le DOM des
   sections, celui des boutons, puis la translation. Rien d'autre à repeindre —
   le contenu des trois sections n'a pas bougé d'une ligne. */
function applyTabOrder(order){
  settings.tabOrder=order;saveSettings();
  orderTrack();orderTabsBar();paintTabs(curTab,0,false);
}
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
  /* Ticket #4 — CETTE BOUCLE LISAIT `TAB_ORDER` DIRECTEMENT. Tant que l'ordre
     était une constante les deux étaient le même objet ; dès qu'il dérive d'un
     réglage, boucler sur la constante et translater d'après `o` est EXACTEMENT
     le décalage d'un cran qui a coûté deux écrans blancs. On boucle sur `o`. */
  o.forEach(n=>{
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
  /* v2.90 — `translateX` ET NON `translate3d`. Un transform 3D promeut son
     élément en COUCHE COMPOSÉE de façon permanente : ici c'est le rail, donc
     toute la liste, une couche de plusieurs milliers de pixels que le moteur
     doit re-tramer à chaque changement de taille de la fenêtre. Le clavier en
     provoque une rafale (voir v2.89) — d'où le clignotement. En 2D la couche
     n'est plus forcée ; `will-change` la rend le temps du glissé, et la
     transition `.snap` est promue toute seule pour sa durée. La géométrie est
     identique, et le transform reste un transform : le bloc conteneur des
     descendants `fixed` ne change pas, les correctifs v2.64/v2.73 tiennent. */
  track.style.transform="translateX("+(-i*w+(dx||0))+"px)";
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
  function stop(){live=false;dir=null;track.classList.remove("dragging");document.body.classList.remove("dragging");
    scheduleJumpFab();}                   /* v2.51 — un glissé annulé ne relançait rien */

  vp.addEventListener("touchstart",e=>{
    /* v2.57 — surface de périmètre ouverte : le rail est mort. #tab-pile est sorti
       du rail en position:fixed mais reste descendant DOM de #tabViewport, donc son
       touchstart bubble jusqu'ici ; sans cette sortie, le glissé de piste (curTab=
       "pile" → fente pile VIDE) se combinait au glissé-pour-fermer. Seul ce dernier
       (listener sur #tab-pile) doit opérer en surface. */
    if(document.body.classList.contains("scoped")){stop();return;}
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
  /* v2.57 — hors surface seulement : en surface curTab vaut "pile" et un
     paintTabs(curTab) translaterait le rail vers la fente pile vide. */
  /* v2.89 — LA RAFALE DU CLAVIER NE REPEINT PLUS LE RAIL. paintTabs ne dépend
     que d'UNE mesure, `vp.clientWidth` ; une resize de HAUTEUR n'a donc rien à
     repeindre. Or `interactive-widget=resizes-content` (index.html) en émet une
     rafale à chaque champ touché — animation du clavier, puis apparition de la
     barre d'auto-remplissage de Chrome —, et chaque appel écrivait `hidden`,
     basculait deux classes et reposait un `transform` IDENTIQUE : un recalcul de
     style sur tout l'arbre par image, pour zéro pixel de différence. On compare
     la mesure que la fonction lit vraiment, pas `innerWidth` : c'est
     `vp.clientWidth` qui bouge quand une barre de défilement paraît. */
  let lastRW=vp.clientWidth;
  addEventListener("resize",()=>{
    const w=vp.clientWidth;
    if(w===lastRW)return;
    lastRW=w;
    if(!document.body.classList.contains("scoped"))paintTabs(curTab,0,false);
  });
  addEventListener("orientationchange",()=>setTimeout(()=>{if(!document.body.classList.contains("scoped"))paintTabs(curTab,0,false);},120));
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
  if(!PILE_KEYS.includes(pileView))pileView="list";
  /* Chantier 18 : deux réglages, pas un. L'axe de l'index est le sien — il ne se
     lit pas comme une liste d'items, et basculer l'un ne doit pas basculer
     l'autre. Liste par défaut : 27 catégories dont la médiane est 2 sont
     illisibles en grille deux colonnes. */
  indexView=settings.indexView||"list";
  if(!IDX_KEYS.includes(indexView))indexView="list";
  /* v3.02 : la largeur se relit comme la forme. Deux réglages du même axe qui
     ne se relisent pas pareil, c'est l'un des deux qui est un bug qui attend
     (leçon v2.39). */
  indexCols=settings.indexCols;
  if(IDX_COLS.indexOf(indexCols)<0)indexCols=2;
  /* v2.49 : l'ordre de l'index se mémorise comme sa forme. Deux réglages
     symétriques doivent se relire de la même façon, sinon l'un des deux est un
     bug qui attend (leçon v2.39, pileView contre indexView). */
  indexSort=settings.indexSort||"az";
  if(!IDX_SORT_KEYS.includes(indexSort))indexSort="az";
  /* ticket #26 : deux réglages symétriques se relisent de la même façon,
     sinon l'un des deux est un bug qui attend (leçon v2.39). */
  pickSort=settings.pickSort||"recent";
  if(!PICK_SORT_KEYS.includes(pickSort))pickSort="recent";
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
/* v2.54 — TOUS les axes de périmètre retombent d'un coup : quitter un périmètre,
   c'est le quitter entièrement. */
function clearScope(){pileLoc="all";typeFilter="all";sourceFilter="all";tagFilter="";sortMode="recent";dormantFocus=false;pileQuery="";}
/* v2.55 — le titre de la surface : le nom du périmètre, lu sans le chercher. */
function scopeTitleText(){
  if(inCollection())return collectionName(pileLoc);
  if(tagFilter)return "#"+tagFilter;
  if(sourceFilter!=="all")return sourceFilter;
  return "Toute la pile";
}
/* v2.55 — OUVRIR un périmètre = présenter #tab-pile en SURFACE par-dessus
   Collection, pas basculer d'onglet. `curTab` reste "pile" pour que le rendu, le
   menu de tri (drawViewMenu lit curTab) et l'en-tête restent justes ; mais on ne
   touche NI à `paintTabs` (le rail ne bouge pas, Collection reste dessous) NI à la
   couche `tab`. La seule couche empilée est `scope`, un cran : retour système,
   bouton retour et puce × la ferment tous par exitScope, et tombent sur Collection
   en un pas — l'invariant du cap. */
function openScopePage(){
  closeSearch();
  closeFilterBand();          /* v2.68 — on entre dans une page : le bandeau de la précédente n'a rien à y faire */
  closeViewBand();
  popLayer("sel");selMode=false;selIds.clear();document.body.classList.remove("selecting","hasSel");
  /* v2.58 — curTab N'EST PLUS forcé à "pile". Une page de périmètre n'EST pas
     l'onglet Ma pile : dans nav-11, #pane-page est une surface DISTINCTE, et
     Collection reste l'onglet courant dessous. Sans ça, navTitleText renvoyait
     « Ma pile » (visible au glissé d'entrée) et l'app se croyait dans la pile.
     Le tri des items, la recherche et les paliers lisent maintenant scopeActive()
     en plus de curTab, pour garder leur comportement de « page ». */
  document.querySelectorAll(".tabs button").forEach(x=>x.classList.remove("active")); /* une page n'a pas d'onglet actif */
  document.body.classList.add("scoped");   /* AVANT le rendu : renderFilterState lit cette classe pour masquer la puce */
  renderPileTab();                         /* #pileList + filterState + en-tête (couvert) */
  const st=document.getElementById("scopeTitle");if(st)st.textContent=scopeTitleText();
  const pile=document.getElementById("tab-pile");if(pile)pile.scrollTop=0;
  requestAnimationFrame(()=>document.body.classList.add("scopein")); /* déclenche le glissé d'entrée */
  pushLayer("scope",()=>exitScope());
}
/* FERMER : un seul chemin (puce ×, bouton retour, retour système), et il ramène à
   Collection. `popLayer("scope")` est un no-op quand le recul système a déjà retiré
   la couche (garde `unwinding`). On glisse la surface dehors (retrait de `scopein`),
   on rend Collection dessous par selectTab("categories") — qui remet l'en-tête, les
   onglets et le rail au propre —, puis on démonte la surface à la fin de la
   transition. Le contenu n'est pas re-rendu pendant la sortie : il glisse dehors tel
   quel, sans clignoter, et sera refait au prochain usage de l'onglet Ma pile. */
function exitScope(){
  closeFilterBand();          /* v2.68 — avant de dépiler le périmètre : sa couche est AU-DESSUS */
  closeViewBand();
  popLayer("scope");
  clearScope();
  document.body.classList.remove("scopein");
  const pile=document.getElementById("tab-pile");
  if(pile){
    const done=()=>{document.body.classList.remove("scoped");pile.style.transform="";pile.style.transition="";pile.removeEventListener("transitionend",done);};
    pile.addEventListener("transitionend",done);
    setTimeout(done,340);                  /* filet si la transition n'émet pas */
  }else document.body.classList.remove("scoped");
  selectTab("categories");
}
document.getElementById("openUnfiled").onclick=()=>enterCollection("none");
document.getElementById("openArch").onclick=()=>enterCollection("archived");
document.getElementById("openTrash").onclick=()=>enterCollection("trashed");
document.getElementById("navTitle").onclick=toggleViewBand;
/* v2.55 — en-tête de la surface : retour ferme la page (même chemin qu'un retour
   système), tri ouvre le menu de vue (curTab vaut "pile" pendant la page, donc
   drawViewMenu montre bien le tri des ITEMS : Récents · Anciens · A → Z · Z → A). */
(function(){
  const b=document.getElementById("scopeBack"),so=document.getElementById("scopeSort");
  if(b)b.onclick=exitScope;
  if(so)so.onclick=toggleViewBand;   /* v2.69 — le ⇅ de la surface ouvre le MÊME bandeau : le tri ne vit plus à deux endroits */
  /* Glissé vers la droite pour fermer, doigt collé à la page (v2.56). Bord gauche
     refusé (retour système), vertical laissé au défilement. On confirme l'axe
     horizontal avant de saisir le geste ; sous le seuil au relâchement, la page
     revient en place ; au-dessus, elle finit sa sortie depuis la position du doigt. */
  const pile=document.getElementById("tab-pile");
  let x0=0,y0=0,w=0,track=false,drag=false;
  if(pile){
    pile.addEventListener("touchstart",e=>{
      if(!document.body.classList.contains("scoped")||e.touches.length!==1){track=false;return;}
      const t=e.touches[0];
      if(t.clientX<24){track=false;return;}
      x0=t.clientX;y0=t.clientY;w=pile.clientWidth||window.innerWidth;track=true;drag=false;
    },{passive:true});
    pile.addEventListener("touchmove",e=>{
      if(!track)return;
      const t=e.touches[0],dx=t.clientX-x0,dy=t.clientY-y0;
      if(!drag){
        if(Math.abs(dx)<8&&Math.abs(dy)<8)return;
        if(dx>0&&Math.abs(dx)>Math.abs(dy)*1.4){drag=true;pile.style.transition="none";}
        else{track=false;return;}      /* geste vertical : on laisse défiler */
      }
      pile.style.transform="translateX("+Math.max(0,dx)+"px)";
      if(e.cancelable)e.preventDefault();
    },{passive:false});
    pile.addEventListener("touchend",e=>{
      if(!track)return;track=false;
      if(!drag)return;drag=false;
      const dx=e.changedTouches[0].clientX-x0;
      pile.style.transition="";                  /* la transition CSS reprend */
      if(dx>Math.min(w*0.32,120)){pile.style.transform="translateX(100%)";exitScope();}
      else pile.style.transform="";              /* revient à 0 via .scopein */
    },{passive:true});
  }
})();
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
function scopeActive(){return document.body.classList.contains("scoped");}
function searchInPile(){return curTab==="pile"||scopeActive();}
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
document.getElementById("filterBtn").onclick=toggleFilterBand;
/* Un panneau ancré à une mesure doit se replacer quand la mesure change. */
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
/* Après un partage : si UN seul item est créé, on ouvre sa fiche pour éditer
   titre / catégorie / note tout de suite. Plusieurs items d'un coup : on reste
   discret, pas de fiche imposée.
   v2.88 — LA FICHE N'ATTEND PLUS L'APERÇU. Elle était retenue derrière une
   course `enrich` / 6 s : sur un site lent, ou simplement au démarrage à froid
   d'une Edge Function, le partage restait SIX SECONDES sur un écran qui ne
   disait rien — et le commentaire annonçait 4 s, preuve que personne n'a jamais
   pu tenir le compte. Le délai était un contournement d'un manque : la feuille
   est un instantané, donc l'aperçu arrivé après coup ne s'y voyait pas. C'est
   ce manque qui est réglé (`_enrich` repeint une fiche non modifiée), et
   l'attente n'a plus de raison d'être. `addItem` a déjà lancé l'enrichissement ;
   `enrich` dédoublonne, donc rien n'est demandé deux fois. */
async function afterShare(created){
  if(created.length!==1){
    if(created.length>1)toast(created.length+" items gardés.");
    return;
  }
  const id=created[0];
  const it=items.find(i=>i.id===id);
  openGrainSheet(id);
  if(it&&it.url&&(!it.title||!it.preview))enrich(id);
}
function displayText(it){return it.title?it.title:labelFor(it);}
/* Ticket #27 — le TITRE d'abord, le nom de fichier en repli. La liste et le
   bloc de contenu affichaient `it.content` dès que l'item portait un média,
   c'est-à-dire le nom du fichier importé, même quand l'item avait un titre :
   « Barre choco » se lisait « 1785405409341875230571420329172 8.jpg ». Le nom
   du fichier reste le repli quand il n'y a pas de titre — c'est alors la seule
   chose qui nomme l'objet, comme dans la fiche depuis le #26. */
function mediaText(it){return it.title?it.title:(it.hasMedia?it.content:labelFor(it));}
const ICON_LINK=icon('link');
const ICON_NOTE=icon('note');
function galleryThumb(it){
  if(faceOf(it))return `<img class="${faceIsIcon(it)?'iconcov':''}" src="${esc(coverSrc(it))}" alt="" loading="lazy">`;
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
    if(changed){
      saveItems();renderSoon();
      /* v2.88 — L'APERÇU QUI ARRIVE DANS LE DOS D'UNE FICHE OUVERTE LA REPEINT.
         Sans ça, ouvrir la fiche avant la fin de l'enrichissement montrait un
         item nu pour toujours — et pire, `commit()` aurait recollé ce vide
         par-dessus le titre et la couverture trouvés entre-temps, puisque la
         feuille est un instantané pris à l'ouverture. Trois gardes : la fiche
         porte bien CET item, elle n'a AUCUNE modification en cours (sinon on
         effacerait ce qui est en train d'être tapé), et rien n'est empilé
         par-dessus (une couche ouverte est une intention en cours). C'est le
         même geste que `refreshPreview` depuis toujours, à l'initiative de
         l'aperçu au lieu du doigt. */
      const top=layers[layers.length-1];
      if(editingGrain===id&&!grainDirty&&top&&top.name==="sheet")openGrainSheet(id);
    }
  }catch(e){}
}
function cleanShareUrl(){try{history.replaceState({},"",location.pathname);}catch(e){}}

/* ---------- boot ---------- */
/* ═══════════════════════════════════════════════════════════════════════════
   ONBOARDING — L'UNIQUE POINT DE CONTACT (chantier B, v2.65)

   Trente lignes, un seul sens de dépendance : l'app appelle l'onboarding,
   l'onboarding ne connaît pas l'app. Il vit dans le shadow root de son propre
   élément (onboarding.js + onboarding.css) ; aucun de ses sélecteurs ne peut
   toucher styles.css, aucun de ses états ne peut toucher items/settings/batch.
   Supprimer les deux fichiers et ce bloc laisse Sable exactement comme avant.

   Ce que l'app prête à l'onboarding, et rien de plus :
     onAddLink → addItem, donc le premier item du dernier écran est un VRAI item
                 (dédoublonné, capturé en optimiste, enrichi comme les autres) ;
     onFinish  → c'est l'APP qui décide de l'atterrissage. « done » emmène sur
                 Ma pile, là où l'item vient de tomber : la présentation promet
                 « Découvrir ma pile », on ne peut pas rendre la main sur
                 Collection. « skipped » ne déplace rien — qui passe la
                 présentation ne demande pas non plus qu'on le déménage.

   La présentation est un événement de PREMIER LANCEMENT, donc posée après le
   premier rendu (un onboarding par-dessus une app vide ne montre rien) et après
   la connexion : addItem écrit dans window.storage, qui a besoin d'un USER.
   Le drapeau « déjà vu » appartient au module (localStorage, sur l'appareil) ;
   il n'entre pas dans settings, qui est synchronisé et migré.
   ═══════════════════════════════════════════════════════════════════════════ */
function openOnboarding(mode){
  const OB=window.SableOnboarding;
  if(!OB){toast("Présentation indisponible.");return;}
  OB.open({
    mode:mode||"first",
    onAddLink:async url=>{
      const id=await addItem(url);
      return id||false;               /* false = l'onboarding garde son bouton */
    },
    onFinish:reason=>{
      if(reason==="done"&&mode!=="settings")selectTab("pile");
    }
  });
}

/* Ticket #28 — L'ÉCRAN QUI DIT LA VÉRITÉ. Il ne se contente pas d'informer :
   il OCCUPE la place de l'app, donc il empêche le geste (ajouter, enregistrer)
   qui écraserait la pile. Le nœud est fabriqué ici et non dans index.html —
   l'invariant des 70 `id` du gabarit commun n'a pas à grossir pour un écran de
   panne, et aucune cote n'est posée depuis ce JS : `.loadfail` vit dans
   styles.css. L'adresse connectée y figure, parce que la cause la plus probable
   d'une pile qui semble vide n'est pas la panne, c'est le mauvais compte. */
function currentEmail(){try{return (window.USER&&USER.email)||null;}catch(e){return null;}}
function showLoadFailure(){
  if(document.querySelector(".loadfail"))return;
  const who=currentEmail();
  /* Ticket #31 — LA COPIE LOCALE S'ANNONCE ICI, et c'est le seul écran où elle
     compte vraiment. Elle ne se réinjecte pas toute seule : elle rend un fichier
     (voir la note de `saveMirror`). */
  const m=readMirror();
  const d=document.createElement("div");
  d.className="loadfail";
  d.innerHTML=`<div class="lfbox"><div class="lfmono">PILE NON LUE</div>`
    +`<p>Sable n'a pas pu lire ta pile. <b>Tes items ne sont pas perdus</b> : ils sont en base, `
    +`et l'app refuse d'écrire tant qu'elle ne les a pas relus — c'est ce qui les protège.</p>`
    +(who?`<p class="lfwho">Connecté avec <b>${esc(who)}</b>. Si ce n'est pas ton adresse habituelle, c'est l'explication : chaque adresse a sa propre pile.</p>`:"")
    +(m?`<p class="lfwho">Une copie locale de <b>${m.items.length} item(s)</b> existe sur cet appareil, datée du ${esc(new Date(m.at).toLocaleString("fr-FR"))}. Elle ne contient pas les médias.</p>`:"")
    +`<div class="lfacts"><button class="lfbtn" id="lfRetry">Réessayer</button>`
    +(m?`<button class="lfbtn ghost" id="lfSave">Enregistrer la copie locale</button>`:"")
    +`<button class="lfbtn ghost" id="lfOut">Changer de compte</button></div></div>`;
  document.body.appendChild(d);
  d.querySelector("#lfRetry").onclick=()=>location.reload();
  d.querySelector("#lfOut").onclick=async()=>{try{await _sb.auth.signOut();}catch(e){}location.reload();};
  const sv=d.querySelector("#lfSave");
  if(sv)sv.onclick=()=>{sv.textContent=exportMirror()?"Copie enregistrée":"Enregistrement impossible ici";};
}
async function startApp(){
  /* Ticket #28 — LE POINT D'ARRÊT. Sans ce test, l'amorçage juste en dessous
     est le pire chemin possible : cinq items de démonstration ÉCRITS par-dessus
     une pile qu'on n'a pas su lire. */
  if(!await loadState()){showLoadFailure();return;}
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
  orderTabsBar();          /* ticket #4 — la barre prend l'ordre réglé, comme la piste */
  homeTab=bootTab();       /* résolu UNE fois : la couche de retour ne doit pas changer d'avis en cours de journée */
  selectTab(homeTab);
  /* Un partage entrant est une intention explicite : la présentation ne se met
     pas en travers, elle attendra le prochain lancement ordinaire. */
  const shared=/share-target/.test(location.search);
  const onb=!shared&&window.SableOnboarding&&SableOnboarding.shouldShow();
  if(onb)openOnboarding("first");
  /* v2.84 — LE MATIN. Le cadre s'ouvre seul une fois par jour, au lancement.
     Deux abstentions, aux mêmes conditions que la présentation juste au-dessus :
     pas sur un partage entrant (l'intention est ailleurs) et pas pendant
     l'onboarding (on ne se met pas en travers d'une première fois). C'est le
     rôle que `maybeWake` (v2.45) n'a jamais tenu, faute d'appelant. */
  if(!shared&&!onb)announceRise();
  /* v2.88 — LE RATTRAPAGE D'APERÇUS PASSE APRÈS LE PARTAGE, ET IL FAIT LA QUEUE.
     Il partait AVANT `consumeSharedContent`, et à VINGT-CINQ requêtes de front :
     vingt-cinq invocations d'Edge Function, chacune suivie d'une écriture du
     tableau entier et d'un renderAll. Le lien du téléphone était saturé au
     moment précis où l'item qu'on vient de partager avait besoin de son propre
     aperçu — l'attente qu'on subissait n'était pas celle d'UNE requête, c'était
     celle de la vingt-sixième dans la file. Il attend donc que le partage soit
     servi, et n'avance plus qu'à trois de front. Le total reste 25 : ce n'est
     pas moins de travail, c'est le même travail qui cesse de disputer la ligne
     à ce qu'on regarde. */
  const share=consumeSharedContent();
  share.catch(()=>{}).then(()=>backfillPreviews(25,3));
  await share;
}
/* File d'enrichissement bornée : `limit` items au total, `par` en vol. */
function backfillPreviews(limit,par){
  const q=items.filter(i=>i.status==="active"&&i.url&&(!i.title||!i.preview)).slice(0,limit).map(i=>i.id);
  let n=0;
  const next=()=>{if(n>=q.length)return;const id=q[n++];enrich(id).catch(()=>{}).then(next);};
  for(let k=0;k<Math.min(par,q.length);k++)next();
}

/* ═══════════════════════════════════════════════════════════════════════════
   v2.50 — ACCÈS DIRECTS. Un mini-FAB au-dessus du + ouvre une feuille « Aller
   à » : entrer dans une catégorie (index Collection), ou sauter à un palier de
   date (Ma pile).

   v2.52 — LE DÉCLENCHEUR N'EST PLUS GÉOMÉTRIQUE, et c'est une soustraction. Il
   lisait un ratio de hauteur (visible au-delà de ~1,6 écran, masqué sous ~1,3,
   avec hystérésis). Sur le corpus réel ce seuil demandait une vingtaine de
   catégories : le bouton n'existait jamais. Trois raisons de compter des ANCRES
   plutôt que des pixels, et la troisième est la plus solide. (1) La valeur du
   bouton est de sauter ENTRE des ancres — s'il n'y en a qu'une, la hauteur de la
   page n'y change rien. (2) Un ratio dépend de la forme d'affichage, de l'écran
   et des couvertures chargées : il varie sans que rien de significatif ait
   changé. (3) Un compte de DONNÉES est vérifiable par un banc, une géométrie ne
   l'est pas — jsdom ne calcule aucune mise en page. Cette condition sort donc de
   l'angle mort documenté du projet.
   `gotoTargets()` portait déjà le contexte (elle rend [] hors des deux écrans à
   ancres) : le test de contexte, le ratio, l'hystérésis, la lecture de
   `scrollHeight` et les écoutes défilement/redimensionnement disparaissent tous
   ensemble. Visibilité seulement, jamais de positionnement : aucune cote CSS
   n'est pilotée en JS (leçon --tbh, v2.47).

   v2.51 — OÙ CETTE FONCTION EST APPELÉE, et c'est l'autre moitié du travail. La
   v2.50 ne la rappelait qu'au défilement et depuis renderAll() : comme elle se
   masque quand une feuille est ouverte, refermer les Réglages laissait le bouton
   éteint. Règle unique : TOUT CE QUI CHANGE UN DES ÉTATS LUS CI-DESSOUS APPELLE
   scheduleJumpFab(). Onze points d'appel, un par propriétaire d'état : pushLayer,
   popLayer et le gestionnaire de popstate (feuille, sélection, recherche,
   surface, périmètre — toutes les sorties passent par la pile de couches depuis
   le chantier 31), renderRoot, renderPileTab, updateSelUI (la classe `selecting`
   vit là), renderRootSearch (`searching` vit là), les trois bascules d'aperçu, et
   le stop() du glissé (`dragging`). Une condition ajoutée sans son point d'appel
   ne se lira jamais.
   Le différé d'une image n'est pas de la coquetterie : `exitSel()` dépile la
   couche AVANT que `updateSelUI()` ne retire la classe, donc un appel synchrone
   lirait un état déjà faux — un propriétaire d'état écrit sa classe au milieu de
   sa fonction, jamais à la fin. Il fusionne aussi les appels d'un même tick et
   autorise l'appel au SOMMET d'une fonction à plusieurs sorties.
   ═══════════════════════════════════════════════════════════════════════════ */
let _jumpRaf=0;
function scheduleJumpFab(){
  if(_jumpRaf)return;
  _jumpRaf=requestAnimationFrame(()=>{_jumpRaf=0;updateJumpFab();});
}
function updateJumpFab(){
  const fab=document.getElementById("fabJump");if(!fab)return;
  /* Masqué comme le + : rituel, feuille, sélection, glissé, recherche. La vérité
     du rituel et de la feuille est dans la pile de couches, pas dans une classe —
     `rising` n'était posée par personne (v2.51). */
  const b=document.body.classList;
  if(layerOn("surface")||layerOn("sheet")||b.contains("selecting")||b.contains("dragging")||b.contains("searching")){
    fab.hidden=true;return;}
  /* Ticket #13 — ET LA REMONTÉE, qui n'a aucune ancre. `gotoTargets()` y rendait
     pourtant la liste des catégories : sa seconde branche se lit « ni Ma pile ni
     Collection, et la lentille est aux catégories » — vrai par accident sur un
     troisième onglet qui n'existait pas quand elle a été écrite. Le bouton
     s'ouvrait donc sur des cibles absentes de l'écran. */
  if(curTab==="rise"){fab.hidden=true;return;}
  /* DEUX ancres, c'est le minimum pour que « sauter » veuille dire quelque chose.
     En dessous, `openGotoSheet()` refuserait de s'ouvrir sur une liste à une ligne
     ou vide — et un bouton visible qui n'ouvre rien est une affordance qui ment
     (leçon de la fausse pile de cartes, v2.41). */
  fab.hidden=gotoTargets().length<2;
}
function gotoTargets(){
  if((curTab==="pile"||inCollection()||scopeActive())&&tiersOn()){
    return [...document.querySelectorAll(".tier[id^='ptier-']")]
      .map(el=>({kind:"tier",id:el.id,label:(el.textContent||"").trim()}));
  }
  if(curTab!=="pile"&&!inCollection()&&browseIdx==="cats"){
    const active=items.filter(i=>i.status==="active");
    return catOrder().map(name=>({kind:"cat",name,n:active.filter(i=>i.domain===name).length}));
  }
  return [];
}
function openGotoSheet(){
  const list=document.getElementById("sheetList");if(!list)return;
  const tg=gotoTargets();
  if(!tg.length)return;                 /* pas de feuille vide */
  document.getElementById("sheetTitle").textContent="Aller à";
  list.innerHTML=`<div class="gotolist">`+tg.map(t=>t.kind==="cat"
    ?`<button class="gorow" data-gocat="${esc(t.name)}">${catFace(t.name,"s")}<span class="gonm">${esc(t.name)}</span><span class="gocnt">${t.n}</span><span class="gochev">›</span></button>`
    :`<button class="gorow" data-gotier="${esc(t.id)}"><span class="gohash">›</span><span class="gonm">${esc(t.label)}</span><span class="gochev">›</span></button>`
  ).join("")+`</div>`;
  list.querySelectorAll("[data-gocat]").forEach(x=>x.onclick=()=>{const n=x.dataset.gocat;closeSheet(true);gotoCat(n);});
  list.querySelectorAll("[data-gotier]").forEach(x=>x.onclick=()=>{const id=x.dataset.gotier;closeSheet(true);
    requestAnimationFrame(()=>jumpToAnchor(id));});
  showSheet();
}
/* v2.60 — « Aller à » un palier ne défilait pas dans Ma pile. Le saut passait par
   `el.scrollIntoView()`, mais l'ancêtre `.viewport{overflow:hidden}` — indispensable
   à la piste horizontale — EST, aux yeux du navigateur, le conteneur de défilement
   du palier : exactement le piège v2.47 des `sticky`. scrollIntoView le tenait donc
   pour « déjà visible » dans un conteneur qui ne défile pas, et ne remontait jamais
   au vrai défileur.
   v2.61 — le v2.60 visait `window`, mais ce n'est PAS lui qui défile. Le modèle du
   projet (v2.26 / v2.32) est explicite : `body{height:100%}` + `#app{min-height:100%}`
   qui déborde, `body{overflow-x:hidden}` ⇒ overflow-y auto ⇒ c'est BODY qui défile,
   pas `documentElement`. `window.scrollTo`/`scrollY` portent sur documentElement, à
   scrollTop 0 constant : le saut ne bougeait rien, d'où « le chapitre n'existe même
   pas ». On ne SUPPOSE plus le défileur, on le TROUVE en remontant depuis le palier —
   #tab-pile en surface (fixed, overflow-y:auto), body sinon — et on lit sa position
   pour poser le palier sous l'en-tête collant, mesuré au saut. Lire une position pour
   DÉFILER est le métier du JS ; l'interdit --tbh ne vise qu'une mesure JS qui nourrit
   un positionnement CSS. */
function scrollerFor(el){
  for(let n=el.parentElement;n&&n!==document.documentElement;n=n.parentElement){
    if(n.scrollHeight-n.clientHeight>1){
      const oy=getComputedStyle(n).overflowY;
      if(oy==="auto"||oy==="scroll"||n===document.body)return n;   /* body EST le défileur du projet */
    }
  }
  return document.scrollingElement||document.documentElement;      /* filet : si un jour c'est la racine */
}
function jumpToEl(el){
  if(!el)return;
  const sc=scrollerFor(el);
  const off=stickyHeadH()+6;   /* sous l'en-tête collant (v2.75 : mesure partagée avec revealBand) */
  const top=sc.scrollTop+(el.getBoundingClientRect().top-sc.getBoundingClientRect().top)-off;
  sc.scrollTo({top:Math.max(0,top),behavior:"smooth"});
}
function jumpToAnchor(id){jumpToEl(document.getElementById(id));}
/* v2.62 — « Aller à » une catégorie LOCALISE au lieu d'ENTRER. La v2.50 faisait
   enterCollection : « Aller à » ouvrait la page du périmètre — un changement de
   contexte là où le nom du menu promet de SE RENDRE quelque part. Comme le palier
   de Ma pile, une catégorie se REJOINT : on défile jusqu'à sa ligne dans l'index ET
   on ouvre son tiroir d'aperçu (chantier 19). Entrer reste à un tap, par le
   « Entrer dans {cat} → » du pied du tiroir — on ne perd rien, on ajoute une étape
   de repérage. Le tiroir n'existe qu'en LISTE (une carte de grille n'en a pas,
   v2.59) : le nœud est interrogé pour son chevron `.cchev` plutôt que l'état lu à
   `indexView`, c'est le rendu réel qui décide ; en grille, on défile seulement.
   On OUVRE avant de MESURER — le tiroir pousse la mise en page — puis on défile à
   l'image suivante, quand la position de la ligne reflète le tiroir déployé. Déjà
   ouverte, on ne la referme pas : on s'y rend, c'est tout. Ouvrir ne pousse aucune
   couche, exactement comme le chevron ordinaire — un aperçu est une divulgation,
   pas un état de navigation. */
function gotoCat(name){
  const grid=document.getElementById("domGrid");if(!grid)return;
  const node=grid.querySelector('[data-cat="'+cssq(name)+'"]');if(!node)return;
  requestAnimationFrame(()=>{
    if(node.querySelector(".cchev")&&!catOpen.has(name))toggleCatPeek(name);   /* liste seule */
    requestAnimationFrame(()=>jumpToEl(node));
  });
}
function wireJumpFab(){
  const fab=document.getElementById("fabJump");
  if(fab)fab.onclick=openGotoSheet;
  /* v2.52 — plus aucune écoute de défilement ni de redimensionnement : le
     déclencheur ne dépend plus de la géométrie, seulement du nombre d'ancres, et
     celui-là ne change qu'à un rendu ou à un changement de couche — tous couverts. */
  updateJumpFab();
}
if(document.readyState!=="loading")wireJumpFab();
else document.addEventListener("DOMContentLoaded",wireJumpFab);


/* ══════════════════════════════════════════════════════════════════════════════
   LA REMONTÉE — bloc fondu depuis remontee.js (ticket #5)
   Même mouvement que le bloc CSS jumeau de styles.css : la surcouche a fait son
   travail, la forme est validée, elle entre dans le fichier définitif (§ 4).
   CE QUE LA FUSION RÉPARE, ET C'EST TOUT LE TICKET : le rendu de la remontée et
   la section qui l'accueille ne peuvent plus être servis en versions
   différentes. Le défaut observé en ligne — onglet vide au glissé, tiroir au
   tap — était exactement ça, et il ne levait aucune erreur.
   L'IIFE est conservée telle quelle : elle garde son état privé, et les trois
   fonctions qu'elle publie sur `window` gardent leurs appelants. Ce qui change
   chez eux : les gardes `window.renderRiseTab && …`, qui étaient
   l'interrupteur d'arrêt de la surcouche, deviennent des appels directs — une
   garde sur une fonction du même fichier ne protège plus de rien et ferait
   croire à une absence possible.
   Les liaisons `items`, `batch` et `settings` étaient lues PAR LEUR NOM depuis
   l'environnement lexical global ; elles sont maintenant dans le même fichier,
   ce qui ne change rien à leur lecture mais supprime la subtilité.
   ══════════════════════════════════════════════════════════════════════════════ */
(function(){
  "use strict";

  /* ── L'ONGLET ─────────────────────────────────────────────────────────────
     Ticket #1 : ce bouton porte `data-tab="rise"` et n'est plus câblé ici. Le
     `.tabs button` d'app.js lui pose son `onclick=selectTab(dataset.tab)` comme
     aux deux autres, et `selectTab` lui pose `.active` tout seul. Ne PAS lui
     reposer un `onclick` depuis cette surcouche : ce serait un second chemin
     vers la même destination, et il divergerait au premier changement. */
  function riseTabEl(){return document.getElementById("riseTab");}

  /* Le compte est REPEINT, jamais reconstruit : on pose un texte et un attribut,
     le CSS tient la forme (invariant § 3 — aucune cote posée depuis JS). */
  function paintRiseTab(){
    var b=riseTabEl(); if(!b)return;
    var c=b.querySelector(".rcnt"); if(!c)return;
    var n=0;
    try{n=riseDue();}catch(e){n=0;}
    /* Ticket #1 — LE COMPTE SE TAIT SUR L'ONGLET COURANT. Il annonçait « il y a
       N choses à voir » ; sur l'écran qui les montre, il annonce ce qu'on est en
       train de regarder. La porte reste, le chiffre s'en va — exactement ce qui
       se passait déjà quand le tirage est vide. */
    var here=false;
    try{here=(curTab==="rise");}catch(e0){}
    c.hidden=!n||here;
    c.textContent=n?String(n):"";
    /* La porte RESTE quand il n'y a rien : une porte qui disparaît est pire
       qu'une porte vide — on ne saurait plus où la chose habite. Seul le
       chiffre s'en va, et la feuille dira pourquoi. */
    b.setAttribute("aria-label",n
      ? n+" item"+(n>1?"s":"")+" remonte"+(n>1?"nt":"")+" aujourd’hui"
      : "La remontée");
  }
  /* Le point d'accroche d'app.js : partout où le cadre était rendu, app.js
     appelle maintenant `window.riseTabPaint && riseTabPaint()`. Surcouche
     retirée, la garde est un no-op — c'est l'interrupteur d'arrêt. */
  window.riseTabPaint=paintRiseTab;

  /* LE COMPTE SUIT L'APP SANS QU'ELLE AIT À LE SAVOIR. `renderBadges()` est
     déjà le point que TOUS les chemins traversent quand le tirage bouge (geste
     de carte, sortie du rituel, changement d'onglet, rendu complet) : on
     l'enveloppe plutôt que d'aller poser un appel dans chacun de ses quinze
     appelants. C'est aussi ce qui garde la surcouche amovible — app.js n'a
     aucune ligne à retirer pour ça.
     L'enveloppe est possible parce que `renderBadges` est une DÉCLARATION de
     fonction : elle vit sur `window`, et ses appelants lisent la liaison
     globale, donc ils passent par l'enveloppe. */
  if(typeof window.renderBadges==="function"&&!window.renderBadges.__rise){
    var base=window.renderBadges;
    var wrapped=function(){base.apply(this,arguments);paintRiseTab();};
    wrapped.__rise=true;              /* idempotent : deux chargements n'empilent pas deux enveloppes */
    window.renderBadges=wrapped;
  }

  /* ── L'ÂGE ────────────────────────────────────────────────────────────────
     LA SEULE INFORMATION NEUVE DE TOUT LE TICKET, et le défaut qu'elle répare
     n'avait pas été signalé : la remontée sert à revoir du VIEUX, or ni le
     cadre ni ses vignettes n'ont jamais dit l'âge de ce qu'ils remontaient.
     Trois images muettes ne disent pas « ça date de 2021 » — c'est pourtant
     tout l'intérêt de la chose.
     Dérivé de `createdAt`, déjà en base : aucun champ nouveau, aucune migration
     (invariant § 3, « tout ce qui peut se dériver de items se dérive »).
     Les paliers sont grossiers À DESSEIN. « il y a 437 jours » est un relevé ;
     « il y a plus d'un an » est un souvenir. On arrondit vers le BAS — annoncer
     deux ans pour dix-neuf mois serait un mensonge, dans le sens qui flatte. */
  function riseAge(ts){
    if(!ts)return "";
    var d=Math.floor((Date.now()-ts)/86400000);
    if(d<0)d=0;
    if(d<7)return "cette semaine";
    if(d<31)return "il y a "+Math.max(1,Math.floor(d/7))+" sem.";
    if(d<365){var m=Math.max(1,Math.floor(d/30));return "il y a "+m+" mois";}
    var y=Math.floor(d/365);
    return "il y a "+y+" an"+(y>1?"s":"");
  }

  /* ── LA VIGNETTE, ET SON REPLI ────────────────────────────────────────────
     LE TROISIÈME GRIEF : « c'est même incompréhensible si l'image est absente ».
     `galleryThumb()` couvre l'image, la vidéo, l'audio et le lien, mais rien ne
     garantit qu'elle rende quelque chose — et un carré vide n'apprend rien.
     Une vignette ne peut plus être muette : à défaut d'image, le blason de la
     source (`srcTile`, écrit en v2.35 et jamais pris en défaut depuis), et à
     défaut de source, l'icône du type. Un repli n'a pas le droit d'échouer,
     c'est toute sa raison d'être (leçon v2.39). */
  function riseThumb(it){
    var h="";
    try{h=galleryThumb(it)||"";}catch(e){h="";}
    if(!h){
      try{h=srcTile(it,"srctile",false);}catch(e2){h=icon("note");}
    }
    var n=(it.surfaceCount>1)?'<span class="rseen">'+it.surfaceCount+'×</span>':"";
    return '<span class="rthumb">'+h+n+'</span>';
  }

  /* La provenance : l'hôte quand il y en a un, le type sinon. Les deux
     fonctions existent et sont utilisées partout ailleurs — on ne réinvente
     pas un troisième vocabulaire pour dire d'où vient un item. */
  function riseSrc(it){
    var s="";
    try{s=hostOf(it.url)||"";}catch(e){s="";}
    if(!s){try{s=typeLabel(it);}catch(e2){s="";}}
    return s;
  }

  function riseLine(it){
    var age=riseAge(it.createdAt), src=riseSrc(it), t="";
    try{t=displayText(it)||"";}catch(e){t=it.title||"";}
    return '<button class="rline" data-rl="'+esc(it.id)+'">'+
      riseThumb(it)+
      '<span class="rtx"><b>'+esc(t)+'</b>'+
        '<span class="rmeta">'+
          (src?'<span class="rsrc">'+esc(src)+'</span>':"")+
          (src&&age?'<span class="rdot">·</span>':"")+
          (age?'<span class="rage">'+esc(age)+'</span>':"")+
        '</span>'+
      '</span></button>';
  }

  /* ── LA FEUILLE ───────────────────────────────────────────────────────────
     Elle n'est pas un panneau neuf : c'est #appSheet, la feuille UNIQUE de
     l'app. Même ouverture, même `sheetlock`, même couche, donc même retour
     Android et même fermeture au scrim (invariant v2.44 : on ne referme jamais
     par un second chemin). Rien de neuf à câbler, rien de neuf à casser. */
  function riseSheetDay(){
    try{return new Date().toLocaleDateString("fr-FR",{weekday:"short",day:"numeric",month:"short"});}
    catch(e){return "";}
  }
  /* Le titre change de ton avec la PROFONDEUR du tirage : c'est là que la chose
     devient un jeu plutôt qu'une corvée, et ça ne coûte pas un pixel de bruit.
     Une phrase, jamais une animation. */
  function riseHeadline(list){
    var n=list.length;
    if(!n)return "Rien ne remonte aujourd’hui";
    var oldest=0;
    for(var i=0;i<n;i++)if(list[i].createdAt&&(!oldest||list[i].createdAt<oldest))oldest=list[i].createdAt;
    var years=oldest?Math.floor((Date.now()-oldest)/31536000000):0;
    if(years>=2)return "Un souvenir de "+new Date(oldest).getFullYear()+" refait surface";
    if(n===1)return "Une chose que tu avais gardée";
    return n+" choses que tu avais gardées";
  }

  /* ── LA PAGE ──────────────────────────────────────────────────────────────
     C'était `riseOpenSheet` en v3.09 : le MÊME contenu, dans #appSheet. Le
     ticket #1 le déverse dans la section #tab-rise. Rien du corps ne change —
     kicker, phrase, lignes, pied — seul l'endroit où il s'écrit change, et
     l'ouverture n'est plus `showSheet()` mais `selectTab("rise")`, décidé par
     app.js.
     Le pied ne peut plus être `#sheetFoot` (il appartient à la feuille) : il
     devient la dernière ligne de la page. */
  function renderRiseTab(){
    try{ensureBatch();}catch(e){}
    var ids=[];
    try{ids=riseFrameIds();}catch(e2){ids=[];}
    var list=[];
    for(var i=0;i<ids.length;i++){
      var it=items.find(function(x){return x.id===ids[i];});
      if(it)list.push(it);
    }

    var el=document.getElementById("riseTabBody");
    if(!el)return;

    var kick='<div class="rskick"><b>La remontée</b><span>'+esc(riseSheetDay())+'</span></div>';
    /* Le titre de l'en-tête dit déjà « La remontée » (navTitleText) : le kicker
       garde la DATE, qui n'est écrite nulle part ailleurs, et le mot une seule
       fois — il porte la marque typographique du rituel, pas une redite. */
    var body;
    if(list.length){
      body='<p class="rslede">'+esc(riseHeadline(list))+
           ' — la plus ancienne d’abord.</p>'+
           list.map(riseLine).join("")+
           '<div class="rsfoot"><button class="rsgo" id="riseGo">Commencer la revue</button></div>';
    }else{
      /* UN TIRAGE VIDE EST LÉGITIME, ET IL DOIT LE DIRE. C'est la question
         d'origine de la v2.82 : maturation de 30 j, plancher de 60 j, sourdine
         ou date à venir sont des raisons valables, mais muettes elles ne se
         distinguent EN RIEN d'une fonction cassée. `riseVoidReason()` donne la
         cause dominante ; on la garde telle quelle. */
      var why="";
      try{why=riseVoidReason();}catch(e3){why="";}
      var solde=false;
      try{solde=surfaceOn()&&batch.date===todayStr()&&batch.ids.length>0;}catch(e4){}
      var nx="";
      try{nx=solde?(nextSurfaceLabel()||""):"";}catch(e5){nx="";}
      body='<p class="rsvoid">'+(solde
        ? "C’est fait pour aujourd’hui."+(nx?" Prochaine remontée "+esc(nx)+".":"")
        : "Rien ne remonte aujourd’hui. "+esc(why))+'</p>';

      /* Ticket #12 — LE RAB, ET SEULEMENT SUR L'ÉCRAN « C'EST FAIT ». Le bouton
         ne se lit que là : proposer « en remonter d'autres » à quelqu'un dont le
         tirage est vide de plein droit (rien de mûr, tout en sourdine) serait
         proposer de contourner la règle qu'on vient de lui expliquer deux lignes
         plus haut. D'où `solde` en garde, et non `!list.length`.
         Trois autres gardes, chacune pour une raison : pas pendant un rab
         (`adhocOn()` — c'est ce qui empêche le plafond de devenir décoratif),
         pas deux fois dans la journée (`riseExtraDone()`), et pas de bouton qui
         n'ouvre rien (le vivier peut être vide — un bouton visible qui ne fait
         rien est une affordance qui ment, leçon v2.41). */
      var xtra=[];
      try{if(solde&&!adhocOn()&&!riseExtraDone())xtra=riseExtraIds();}catch(e8){xtra=[];}
      if(xtra.length){
        body+='<div class="rsfoot"><button class="rsgo ghost" id="riseMore">Encore '+
              xtra.length+'</button>'+
              '<p class="rshint">Un seul rab par jour — le tirage du jour reste le rituel.</p></div>';
      }

      /* Ticket #11 — LES NON CLASSÉS, LES JOURS OÙ LE TIRAGE EST VIDE. Forme 3
         des trois étudiées, et la ligne `#openUnfiled` RESTE au pied de
         Collection : deux portes permanentes vers la même chose, c'est ce que
         la v3.09 avait refusé en supprimant `#inboxBtn`. Ici la porte n'est pas
         permanente — elle n'existe QUE le jour où l'écran n'a rien d'autre à
         dire. L'onglet ne change donc pas de sens les autres jours : c'est
         l'écran vide qui devient utile au lieu d'expliquer son silence.
         LA PHRASE DE `riseVoidReason()` RESTE AU-DESSUS, elle ne cède pas la
         place : elle dit pourquoi rien ne remonte, le bloc dit ce qu'on peut
         faire à la place. L'ordre est celui du sens — la cause, puis l'issue.
         Dérivé de `unfiledDue()`, aucun champ, aucune migration. */
      var uf=0;
      try{uf=unfiledDue();}catch(e9){uf=0;}
      if(uf&&!xtra.length){
        body+='<div class="rstidy">'+
              '<p class="rstlede">Rien à revoir — mais il y a de quoi ranger.</p>'+
              '<button class="rstgo" id="riseTidy"><span>À ranger</span>'+
              '<span class="n">'+uf+'</span></button></div>';
      }
    }
    el.innerHTML=kick+body;

    el.querySelectorAll("[data-rl]").forEach(function(b){
      b.onclick=function(){
        /* Plus de `closeSheet(true)` : on n'est plus dans une feuille, il n'y a
           rien à refermer. Le rituel s'ouvre par-dessus la page, et la refermer
           rend la page — c'est `closeRemontee` qui repeint (renderBadges). */
        riseOpenAt(b.getAttribute("data-rl"));
      };
    });
    var go=document.getElementById("riseGo");
    if(go)go.onclick=function(){openRemontee();};
    var more=document.getElementById("riseMore");
    if(more)more.onclick=function(){riseExtraStart();};
    /* Ticket #11 — MÊME DESTINATION QUE LA LIGNE DU PIED DE COLLECTION, par le
       MÊME appel : `enterCollection("none")`. Deux chemins qui divergeraient au
       premier changement, c'est le doublon que ce fichier passe son temps à
       payer — il n'y a ici qu'une seule fonction, appelée de deux endroits. */
    var tidy=document.getElementById("riseTidy");
    if(tidy)tidy.onclick=function(){enterCollection("none");};
    /* Les images en base locale ne sont pas dans le HTML : elles s'hydratent
       après coup, exactement comme partout ailleurs. */
    try{hydrateMedia&&hydrateMedia(el);}catch(e6){}

    /* Regarder la page vaut « vu » : l'annonce ne repassera pas aujourd'hui.
       C'est le même contrat qu'en v3.09, où c'était l'ouverture de la feuille. */
    try{
      if(settings.frameDay!==todayStr()){settings.frameDay=todayStr();saveSettings();}
    }catch(e7){}

    paintRiseTab();
    /* Ticket #13 — la remontée est le seul onglet dont le rendu ne passait par
       AUCUN des deux propriétaires d'état de l'en-tête (`renderRoot`,
       `renderPileTab`) : arriver ici gardait donc les boutons de l'onglet
       quitté. `paintHeaderBtns` y remet l'entonnoir et le +, `scheduleJumpFab`
       le mini-FAB — le même différé d'une image qu'aux dix autres points
       d'appel (v2.51). */
    try{paintHeaderBtns();}catch(e8){}
    try{scheduleJumpFab();}catch(e9){}
  }
  window.renderRiseTab=renderRiseTab;

  /* ── L'ANNONCE ────────────────────────────────────────────────────────────
     Elle remplace `maybeOpenFrame()` : MÊMES GARDES, autre sortie. Le cadre
     dépliait 130 px au-dessus de l'en-tête et POUSSAIT la page — « le fait
     d'avoir ce bandeau à l'ouverture donne l'impression d'un bug ». Une phrase
     de 4,6 s en `position:fixed` ne pousse rien et ne peut pas se lire comme
     une panne.
     `settings.frameDay` et `settings.frameMins` GARDENT leur sens : le réglage
     « heure d'arrivée » survit intact et pilote maintenant l'annonce. C'est ce
     que les variantes plus radicales de l'étude lui retiraient.
     Le toast porte une ACTION (« revoir ») — cliquable depuis la v2.52, quand
     `pointer-events` a été rendu au mot seul. */
  function riseMaybeAnnounce(){
    try{
      if(settings.frameDay===todayStr())return;
      var n=new Date();
      if(n.getHours()*60+n.getMinutes()<frameMins())return;   /* pas avant l'heure dite */
      if(riseOpen())return;          /* on n'annonce pas un rituel déjà ouvert */
      /* Ticket #1 — NI UN ONGLET DÉJÀ AFFICHÉ. Annoncer « 3 items remontent »
         à quelqu'un qui les a sous les yeux est le degré zéro de l'attention.
         En v3.09 la question ne se posait pas : la remontée n'était pas un écran. */
      if(curTab==="rise")return;
      /* Une couche ouverte occupe l'écran : on ne se met pas en travers. « tab »
         n'en est pas une au sens usuel — c'est l'écriture de la v2.44 pour que
         le retour ramène à l'onglet de départ, présente en permanence dès qu'on
         n'est pas sur cet onglet-là. La v3.00 avait payé cette confusion : une
         installation démarrant sur « Ma pile » n'a JAMAIS vu son cadre. */
      if(layers.some(function(l){return l.name!=="tab";}))return;
      ensureBatch();
      var c=riseDue();
      if(!c)return;                  /* rien à dire : on ne dit rien */
      settings.frameDay=todayStr();saveSettings();
      paintRiseTab();
      toast(c+" item"+(c>1?"s":"")+" remonte"+(c>1?"nt":"")+" aujourd’hui",
            {label:"revoir",fn:function(){selectTab("rise");}});
    }catch(e){}
  }
  window.riseMaybeAnnounce=riseMaybeAnnounce;

  function wire(){
    /* Le clic appartient à app.js (`data-tab`). Il ne reste ici que la peinture
       du compte, et un premier rendu de la section : `selectTab` n'est appelé au
       démarrage que pour l'onglet de départ, or la piste montre les trois
       sections pendant un glissé (`.track.dragging`) — arriver sur une section
       vide en glissant serait un écran blanc de plus, par un chemin neuf. */
    if(!riseTabEl())return;
    paintRiseTab();
    try{renderRiseTab();}catch(e){}
  }

  if(document.readyState==="loading")
    document.addEventListener("DOMContentLoaded",wire);
  else wire();
})();
