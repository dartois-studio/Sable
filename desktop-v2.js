/* =====================================================================
   Sable — desktop v2 · colle entre app.js v3.03 et la mise en page en
   tableau. Chargée par index.html — la page unique depuis la fusion — APRÈS
   desktop.js.

   MÉTHODE, la même que desktop.js : app.js n'est pas modifié. On enveloppe
   les fonctions de rendu globales et on ENRICHIT le DOM qu'elles viennent
   d'écrire — on ajoute des nœuds porteurs de classes et d'attributs, jamais
   une cote CSS (leçon v2.47). La barre de volume en est l'exemple : le JS
   pose `data-fill` de 0 à 10, les onze largeurs vivent dans desktop-v2.css.

   Trois raisons de faire l'enrichissement ICI plutôt que dans catNodeHTML :
     · mobile et bureau partagent un seul gabarit — la fusion l'a rendu littéral,
       il n'y a plus qu'une page. Une colonne de plus dans catNodeHTML serait donc
       à masquer sur mobile, dans un fichier qui n'a pas à la connaître ;
     · toutes les données affichées se DÉRIVENT de `items` : aucun champ neuf,
       aucune migration, rien à écrire en base ;
     · c'est réversible. Retirer les deux lignes de <link>/<script> rend
       exactement l'écran d'avant.

   Les enrichissements sont IDEMPOTENTS (marqueur data-dkr) : un double rendu
   ne double aucune cellule.
   ===================================================================== */
(function(){
  var html=document.documentElement;
  if(html.getAttribute("data-shell")!=="desktop")return;

  var DK=window.matchMedia("(min-width:1100px)");
  var DAY=86400000;
  var SLEEP_DAYS=14;   /* §3 de la passation : endormie au-delà de 14 jours */
  var FRESH_DAYS=7;    /* « neufs » : arrivés depuis moins d'une semaine    */

  function el(tag,cls){var n=document.createElement(tag);if(cls)n.className=cls;return n;}
  function active(){return (typeof items!=="undefined"?items:[]).filter(function(i){return i.status==="active";});}
  function txtOf(it){
    var t=(typeof displayText==="function")?displayText(it):(it.content||"");
    return String(t||"").slice(0,80);
  }

  /* ═══ 1 — l'index de Collection ═══════════════════════════════════════
     Quatre cellules par ligne. Ce qu'elles disent, et pourquoi :
       · CONTEXTE — le dernier item rangé. Un compteur ne dit pas si la
         catégorie est vivante ; un titre le dit d'un coup d'œil.
       · NEUFS — ce qui est arrivé depuis moins d'une semaine et n'a pas
         encore été revu. C'est la seule colonne dont la RÈGLE reste à
         trancher (voir la passation) : elle est isolée ici, une ligne.
       · VOLUME — la taille relative à la plus grosse catégorie. Le nombre
         seul ne se compare pas de ligne en ligne, la barre si.
       · MAJ — la date du dernier rangement, par `ago()` d'app.js.
     ═══════════════════════════════════════════════════════════════════ */

  function statsFor(list){
    var now=Date.now(),last=null,maxTs=0,fresh=0;
    list.forEach(function(i){
      var ts=i.createdAt||0;
      if(ts>maxTs){maxTs=ts;last=i;}
      if(!i.surfaceCount&&(now-ts)<FRESH_DAYS*DAY)fresh++;
    });
    return {n:list.length,last:last,maxTs:maxTs,fresh:fresh,
            sleep:!!list.length&&(now-maxTs)>SLEEP_DAYS*DAY};
  }

  function indexHead(grid){
    var head=document.querySelector(".dkr-head");
    if(!head){
      head=el("div","dkr-head");
      head.innerHTML='<span></span><span class="h-nm">Catégorie</span>'+
        '<span>Dernier rangé</span><span class="h-todo">Neufs</span>'+
        '<span class="h-vol">Volume</span><span class="h-maj">Maj</span><span></span>';
      grid.parentNode.insertBefore(head,grid);
    }
    head.hidden=(grid.getAttribute("data-view")!=="list")||!grid.querySelector("[data-cat]");
  }

  function enrichIndex(){
    var grid=document.getElementById("domGrid");
    if(!grid||grid.hidden)return;
    indexHead(grid);
    if(grid.getAttribute("data-view")!=="list")return;

    var act=active();
    var rows=[].slice.call(grid.querySelectorAll(".crow[data-cat]"));
    var counts=rows.map(function(r){
      return act.filter(function(i){return i.domain===r.getAttribute("data-cat");}).length;
    });
    var max=Math.max.apply(null,counts.concat([1]));

    rows.forEach(function(row,ix){
      var cline=row.querySelector(".cline");
      if(!cline||cline.getAttribute("data-dkr")==="1")return;
      var name=row.getAttribute("data-cat");
      var st=statsFor(act.filter(function(i){return i.domain===name;}));
      var gut=cline.querySelector(".cgut");

      var scent=el("span","dkr-cell dkr-scent");
      if(st.n===0){scent.classList.add("dkr-none");scent.textContent="Vide — rien encore rangé ici";}
      else scent.textContent=txtOf(st.last);

      var todo=el("span","dkr-cell dkr-todo");
      if(st.fresh){
        var pill=el("span","dkr-pill");
        pill.appendChild(el("span","dkr-dot"));
        pill.appendChild(document.createTextNode(st.fresh));
        todo.appendChild(pill);
      }

      var vol=el("span","dkr-cell dkr-vol");
      var bar=el("span","dkr-bar");
      bar.setAttribute("data-fill",String(Math.round(st.n/max*10)));
      bar.appendChild(el("span","dkr-fill"));
      var num=el("span","dkr-n");num.textContent=st.n;
      vol.appendChild(bar);vol.appendChild(num);

      var maj=el("span","dkr-cell dkr-maj");
      maj.textContent=st.n?ago(st.maxTs):"—";

      cline.insertBefore(scent,gut);
      cline.insertBefore(todo,gut);
      cline.insertBefore(vol,gut);
      cline.insertBefore(maj,gut);

      /* Endormie : l'opacité est portée par la LIGNE (elle vaut pour tout ce
         qu'elle contient), le mot par le corps — deux canaux, un seul fait. */
      row.classList.toggle("dkr-sleep",st.sleep);
      if(st.sleep&&!cline.querySelector(".dkr-sleepy")){
        var badge=el("span","dkr-sleepy");badge.textContent="endormie";
        var cnm=cline.querySelector(".cnm");
        if(cnm&&cnm.parentNode)cnm.parentNode.insertBefore(badge,cnm.nextSibling);
      }
      cline.setAttribute("data-dkr","1");
    });
  }

  /* ═══ 2 — Ma pile en colonnes ═════════════════════════════════════════
     Le sous-titre existant contient déjà tout : type, catégorie, tags,
     remontée programmée, « gardé … ». Il s'enroulait sous le titre en une
     ligne de mono. On ne CHANGE rien de son contenu — on regroupe ses spans
     dans quatre cellules, et le CSS les met en colonnes (.sub passe en
     display:contents, donc aucun niveau de boîte en plus).
     ═══════════════════════════════════════════════════════════════════ */

  function pileHead(list){
    var head=document.querySelector(".dkr-thead");
    if(!head){
      head=el("div","dkr-thead");
      head.innerHTML='<span></span><span>Item</span><span>Catégorie</span>'+
        '<span>Tags</span><span>Type</span><span class="h-kept">Gardé</span><span></span>';
      list.parentNode.insertBefore(head,list);
    }
    head.hidden=!list.classList.contains("dens-confortable")||!list.querySelector(".row");
  }

  function enrichPile(){
    var list=document.getElementById("pileList");
    if(!list)return;
    pileHead(list);
    if(!list.classList.contains("dens-confortable"))return;

    [].slice.call(list.querySelectorAll(".row")).forEach(function(row){
      if(row.getAttribute("data-dkr")==="1")return;
      var sub=row.querySelector(".sub");
      if(!sub){row.setAttribute("data-dkr","1");return;}

      var cCat=el("span","dkr-c dkr-c-cat"),
          cTags=el("span","dkr-c dkr-c-tags"),
          cType=el("span","dkr-c dkr-c-type"),
          cKept=el("span","dkr-c dkr-c-kept");

      [].slice.call(sub.children).forEach(function(s){
        var c=s.classList;
        if(c.contains("cat")||c.contains("none"))cCat.appendChild(s);
        else if(c.contains("tag")||c.contains("when"))cTags.appendChild(s);
        else if(c.contains("mini"))cType.appendChild(s);
        else if(!cKept.children.length&&!cKept.textContent){
          /* « gardé il y a 3 j » → « il y a 3 j » : l'en-tête de colonne dit
             déjà « gardé », le répéter à chaque ligne coûte 40 px de colonne. */
          cKept.textContent=(s.textContent||"").replace(/^gardé\s+/,"");
          s.remove();
        }
        else s.remove();   /* « revu N× » : il vit dans la fiche, pas en colonne */
      });

      /* La puce teintée de la catégorie : même teinte de hash que son visage
         dans l'index, posée comme app.js le fait déjà (--ci-h). */
      var catEl=cCat.querySelector(".mini.cat");
      if(catEl&&typeof catHue==="function"){
        var sw=el("span","dkr-swatch");
        sw.style.setProperty("--ci-h",catHue(catEl.textContent.trim()));
        cCat.insertBefore(sw,catEl);
      }

      sub.appendChild(cCat);sub.appendChild(cTags);sub.appendChild(cType);sub.appendChild(cKept);
      row.setAttribute("data-dkr","1");
    });
  }

  /* ═══ 3 — les chiffres dans l'en-tête ═════════════════════════════════
     La largeur libérée sert d'abord à dire l'état de la pile là où on le
     cherche : à côté du titre. Rien de cliquable — un fait, pas un contrôle.
     ═══════════════════════════════════════════════════════════════════ */

  function counts(){
    var row=document.getElementById("tbRow"),nav=document.getElementById("navTitle");
    if(!row||!nav)return;
    var box=row.querySelector(".dkr-count");
    if(!box){box=el("span","dkr-count");row.insertBefore(box,nav.nextSibling);}
    var act=active();
    /* L'onglet courant se lit sur `.tabcur`, PAS sur `hidden` : paintTabs remet
       `hidden=false` sur toutes les sections et ne marque que la courante
       (« l'attribut du markup ne sert qu'au tout premier rendu »). Le test sur
       `hidden` prenait toujours la branche « Ma pile », donc Collection n'a
       jamais montré son décompte de catégories. */
    var pile=document.getElementById("tab-pile");
    if(pile&&pile.classList.contains("tabcur")){
      var un=act.filter(function(i){return !i.domain;}).length;
      box.innerHTML=act.length+" items"+(un?" · <b>"+un+" non classés</b>":"");
    }else{
      var cats=(typeof allCats==="function")?allCats().length:0;
      var fresh=act.filter(function(i){return !i.surfaceCount&&(Date.now()-(i.createdAt||0))<FRESH_DAYS*DAY;}).length;
      box.innerHTML=cats+" catégories · "+act.length+" items"+(fresh?" · <b>"+fresh+" neufs</b>":"");
    }
  }

  /* ═══ 4 — le bandeau de la remontée ═══════════════════════════════════
     Le cadre du haut montrait trois carrés muets. Deux causes, l'une dans le
     CSS (mesurée : 570 px pour trois vignettes de 355), l'autre ICI :

       styles.css assume de ne PAS écrire le titre sous la vignette — « à trois
       de front elle fait ~100 px, soit dix-huit caractères sur deux lignes, une
       bouillie rognée par la bordure. L'image fait le travail ; le titre survit
       en aria-label ». Le raisonnement est juste POUR UN TÉLÉPHONE, et il tombe
       deux fois au bureau : la carte y fait 350 px, et surtout L'IMAGE NE FAIT
       PAS LE TRAVAIL — une note n'en a aucune. Relevé sur le corpus : deux
       items sur trois remontaient sans titre ni image, donc en carré vide,
       alors que leur texte était là, dans `content`, depuis le début.

     Rien n'est ajouté aux données : `txtOf` est celui des lignes de l'index.
     ═══════════════════════════════════════════════════════════════════ */

  function byId(id){
    var l=(typeof items!=="undefined"?items:[]).filter(function(i){return i.id===id;});
    return l[0]||null;
  }

  function enrichFrame(){
    var frame=document.querySelector("#riseFrame .rframe");
    if(!frame)return;
    /* Repasser au-dessus du seuil rend leur place aux nœuds repliés par paint(). */
    [].slice.call(frame.querySelectorAll(".dkr-rft,.dkr-rfn,.dkr-rfx"))
      .forEach(function(n){n.hidden=false;});
    if(frame.getAttribute("data-dkr")==="1")return;

    var vigs=[].slice.call(frame.querySelectorAll(".rfvig"));

    /* (a) COMBIEN REMONTENT, dans le libellé. Sans ce chiffre, le seul nombre
       du bandeau était celui du bas — « 3 à ranger » — et il parle d'AUTRE
       CHOSE (les non classés, `unfiledDue`). Deux comptes distincts, dont l'un
       seulement était écrit : on lisait forcément « ces trois-là sont à
       ranger ». C'est faux, et ça l'est silencieusement. */
    var lab=frame.querySelector(".rflab");
    if(lab&&vigs.length&&!lab.querySelector(".dkr-rfn")){
      var cnt=el("span","dkr-rfn");
      cnt.textContent="· "+vigs.length+(vigs.length>1?" items":" item");
      var b=lab.querySelector("b");
      lab.insertBefore(cnt,b?b.nextSibling:lab.firstChild);
    }

    /* (b) CHAQUE VIGNETTE DIT CE QU'ELLE EST. */
    vigs.forEach(function(v){
      if(v.querySelector(".dkr-rft"))return;
      var it=byId(v.getAttribute("data-rf")), t=it?txtOf(it):"";
      if(!t)return;                       /* rien d'honnête à écrire : on s'abstient */
      var s=el("span","dkr-rft");
      s.textContent=t;
      v.appendChild(s);
    });

    /* (c) « à ranger » DEVIENT « non classés ». Le mot était le second piège de
       la collision : « ranger » est justement ce qu'on fait DANS le rituel, et
       il désignait ici les items sans catégorie. Le compte ne bouge pas, il
       est relu sur place — on ne rappelle pas `unfiledDue`. */
    var fb=frame.querySelector(".rffoot b");
    if(fb){
      var m=(fb.textContent||"").match(/^\s*(\d+)/);
      if(m)fb.textContent=m[1]+" non classé"+(+m[1]>1?"s":"");
    }

    /* (d) UNE SORTIE VISIBLE. Le bandeau se déploie seul une fois par jour et
       le geste qui le range est tactile : à la souris il ne restait que
       #inboxBtn, dont l'étiquette dit « À trier ». On passe par
       `toggleRiseFrame` et non par `commitTuck` — lui seul marque la journée
       comme vue, donc range POUR DE BON au lieu de laisser le cadre revenir. */
    if(!frame.querySelector(".dkr-rfx")){
      var x=el("button","dkr-rfx");
      x.type="button";
      x.setAttribute("aria-label","Ranger la remontée");
      x.title="Ranger";
      x.textContent="✕";
      x.onclick=function(e){
        e.stopPropagation();
        if(typeof toggleRiseFrame==="function")toggleRiseFrame();
      };
      frame.appendChild(x);
    }

    frame.setAttribute("data-dkr","1");
  }

  /* ═══ 5 — la barre d'outils permanente de l'en-tête ═══════════════════
     Ticket A. À droite du titre et du décompte : un faux champ « Chercher »,
     le segment des trois formes, et la roue crantée — celle qui existe DÉJÀ
     (#settingsBtn), qu'on laisse en place. Rien de neuf côté logique : chaque
     contrôle DÉLÈGUE à une fonction d'app.js.

       · le champ délègue à #searchBtn (openSearch). Il n'a PAS de `kbd /` :
         aucun gestionnaire « / » n'existe dans app.js (vérifié), et en ajouter
         un serait un gestionnaire clavier neuf, hors surcouche.
       · le segment lit ses clés et libellés dans IDX_VIEWS / PILE_VIEWS et
         réemploie la primitive `.seg` (même `.on`, mêmes tokens) : il ne PEUT
         pas diverger du bandeau « Vue », qui l'emploie aussi.
       · l'état courant se lit sur indexView / pileView, et paint() étant
         accroché à setIndexView / setPileView / renderList…, le segment se
         remet à jour tout seul.

     Le vrai #searchBtn est masqué en CSS au bureau : le faux champ le déclenche
     par `.click()`, qui marche même sur un élément `display:none`.
     ═══════════════════════════════════════════════════════════════════ */

  function onPileSide(){
    return (typeof curTab!=="undefined"&&curTab==="pile")
        || (typeof scopeActive==="function"&&scopeActive());
  }

  function buildSeg(seg,side){
    var views=side?(typeof PILE_VIEWS!=="undefined"?PILE_VIEWS:[])
                  :(typeof IDX_VIEWS!=="undefined"?IDX_VIEWS:[]);
    /* Même balisage que viewSeg (app.js) : `--n` porte le nombre de colonnes,
       exactement comme le fait `style="--n:…"` de la feuille de tri. */
    seg.setAttribute("data-side",side?"pile":"idx");
    seg.setAttribute("style","--n:"+views.length);
    seg.innerHTML="";
    views.forEach(function(v){
      var b=el("button");
      b.type="button";
      b.setAttribute("data-v",v[0]);
      b.textContent=v[1];
      b.onclick=function(){
        if(side){if(typeof setPileView==="function")setPileView(v[0]);}
        else    {if(typeof setIndexView==="function")setIndexView(v[0]);}
      };
      seg.appendChild(b);
    });
  }

  function tools(){
    var row=document.getElementById("tbRow");
    if(!row)return;
    var box=row.querySelector(".dkr-tools");
    if(!box){
      box=el("div","dkr-tools");
      box.setAttribute("data-dkr","1");

      var search=el("button","dkr-search");
      search.type="button";
      search.setAttribute("aria-label","Chercher");
      search.innerHTML='<svg class="ic" aria-hidden="true"><use href="icons.svg#search"/></svg>'+
                       '<span class="dkr-sph">Chercher</span>';
      search.onclick=function(){var b=document.getElementById("searchBtn");if(b)b.click();};
      box.appendChild(search);

      box.appendChild(el("div","seg dkr-seg"));

      /* Devant #searchBtn : la roue (#settingsBtn) reste la dernière, comme dans
         la maquette (champ · segment · roue). */
      var anchor=document.getElementById("searchBtn");
      row.insertBefore(box,anchor||null);
    }
    box.hidden=false;

    var seg=box.querySelector(".dkr-seg"),side=onPileSide();
    if(seg.getAttribute("data-side")!==(side?"pile":"idx"))buildSeg(seg,side);
    var cur=side?(typeof pileView!=="undefined"?pileView:"")
               :(typeof indexView!=="undefined"?indexView:"");
    [].slice.call(seg.children).forEach(function(b){
      b.classList.toggle("on",b.getAttribute("data-v")===cur);
    });
  }

  /* ═══ 6 — le bandeau de filtres de Ma pile ════════════════════════════
     Ticket B. Sous l'en-tête, au-dessus de la liste : les puces de type avec
     leurs compteurs, et à droite « Trié par » + le tri courant. Mêmes axes,
     mêmes compteurs et même geste que renderFilterBand() (app.js) : une puce
     posée fait `typeFilter=k; renderPileTab()`, exactement comme l'entonnoir
     natif. Les libellés sont ceux de TYPE_FILTERS — l'entonnoir reste
     accessible pour la source, et les deux ne peuvent pas se contredire
     puisqu'ils lisent le MÊME `typeFilter`.

     Le contrôle de tri délègue à `toggleViewBand()` : c'est le panneau où vit
     déjà « Trier » (celui du titre et du ⇅ de la surface). Aucun menu neuf.

     DEUX PUCES DE LA MAQUETTE NE SONT PAS ICI, faute de chemin d'implémentation
     dans la surcouche — décision à poser (voir le compte rendu) :
       · « Non classés » : ce n'est pas un axe de type, c'est le périmètre
         `pileLoc="none"` (#inboxBtn). Le brancher demande un choix produit.
       · « + Tag » : aucun axe de filtre par tag n'existe dans Ma pile (seuls
         type et source). L'inventer sortirait du mandat.
     Le nœud `.dkr-fbar` vit dans #tab-pile : il ne se voit que quand cet onglet
     est courant (les sections non-courantes sont à hauteur nulle), donc rien à
     masquer côté Collection.
     ═══════════════════════════════════════════════════════════════════ */

  var CHEV='<svg class="dkr-chv" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';

  function pileBar(){
    var list=document.getElementById("pileList");
    if(!list||!list.parentNode)return;
    var bar=document.querySelector(".dkr-fbar");
    if(!bar){
      bar=el("div","dkr-fbar");
      bar.setAttribute("data-dkr","1");
      bar.appendChild(el("div","dkr-fchips"));
      var sort=el("div","dkr-fsort");
      var slab=el("span","dkr-fsort-l");slab.textContent="Trié par";
      var sbtn=el("button","dkr-fsort-b");sbtn.type="button";
      sbtn.setAttribute("aria-label","Changer le tri");
      sbtn.innerHTML='<span class="dkr-fsort-v"></span>'+CHEV;
      sbtn.onclick=function(){if(typeof toggleViewBand==="function")toggleViewBand();};
      sort.appendChild(slab);sort.appendChild(sbtn);
      bar.appendChild(sort);
      list.parentNode.insertBefore(bar,list);
    }
    bar.hidden=false;

    var scope=(typeof scopeRows==="function")?scopeRows():[];
    var tf=(typeof typeFilter!=="undefined")?typeFilter:"all";
    function nType(k){
      return k==="all"?scope.length:scope.filter(function(i){
        return k==="media"?(typeof isMediaType==="function"&&isMediaType(i.type)):i.type===k;
      }).length;
    }
    /* Comme l'entonnoir : la valeur posée reste proposée même à zéro (sinon on ne
       pourrait plus la retirer), les autres n'apparaissent qu'avec un compte. */
    var opts=(typeof TYPE_FILTERS!=="undefined"?TYPE_FILTERS:[]).filter(function(o){
      return o[0]==="all"||o[0]===tf||nType(o[0])>0;
    });
    var chips=bar.querySelector(".dkr-fchips");
    chips.innerHTML="";
    opts.forEach(function(o){
      var k=o[0],l=o[1];
      var b=el("button","dkr-fchip");
      b.type="button";
      b.setAttribute("data-tf",k);
      if(String(tf)===k)b.classList.add("active");
      b.appendChild(document.createTextNode(l));
      if(k!=="all"){var n=el("span","dkr-fc-n");n.textContent=nType(k);b.appendChild(n);}
      b.onclick=function(){
        if(typeof bandTouched==="function")bandTouched();
        typeFilter=k;
        if(typeof haptic==="function")haptic(8);
        if(typeof renderPileTab==="function")renderPileTab();
      };
      chips.appendChild(b);
    });

    /* « NON CLASSÉS » — décidé le 12 août 2026 (Guillaume a délégué) : issue 1 de
       la roadmap. Ce n'est pas un axe de TYPE mais un PÉRIMÈTRE — `pileLoc="none"`,
       celui qu'ouvrent déjà l'index de Collection, la surface « à ranger » et la
       tuile de stats, tous via `enterCollection("none")`. On réemploie ce chemin :
       aucun mensonge (compteurs, état vide et sélection restent ceux d'un vrai
       périmètre), aucune ligne dans app.js. La puce est donc un RACCOURCI de
       navigation, pas une bascule de filtre — d'où sa place à part (juste après
       « Tous »), sa teinte distincte (`.dkr-fchip-scope`) et sa sortie par le
       bouton de retour de la surface, comme n'importe quelle collection ouverte.
       On ne l'affiche qu'aux endroits où elle a un sens : l'accueil de la pile et
       le périmètre « none » lui-même — pas au milieu d'une catégorie ou d'un tag,
       où un compte global de non-classés n'aurait rien à voir. */
    var loc=(typeof pileLoc!=="undefined")?pileLoc:null;
    if(loc==null||loc==="all"||loc==="none"){
      var nb=el("button","dkr-fchip dkr-fchip-scope");
      nb.type="button";
      nb.setAttribute("data-scope","none");
      if(loc==="none")nb.classList.add("active");
      nb.appendChild(document.createTextNode("Non classés"));
      var un=(typeof unfiledDue==="function")?unfiledDue():0;
      var nn=el("span","dkr-fc-n");nn.textContent=un;nb.appendChild(nn);
      nb.onclick=function(){
        if(typeof bandTouched==="function")bandTouched();
        if(loc!=="none"&&typeof enterCollection==="function")enterCollection("none");
      };
      /* Deuxième position, juste après « Tous » (ordre de la maquette). */
      if(chips.children.length>1)chips.insertBefore(nb,chips.children[1]);
      else chips.appendChild(nb);
    }

    var sm=(typeof sortMode!=="undefined")?sortMode:"recent";
    var lbl=(typeof SORT_LABEL!=="undefined"&&SORT_LABEL[sm])?SORT_LABEL[sm]:sm;
    bar.querySelector(".dkr-fsort-v").textContent=lbl;
  }

  function paint(){
    if(!DK.matches){
      /* Sous 1100 px le CSS est inerte, mais les nœuds déjà injectés au-dessus
         du seuil restent en place : les en-têtes de colonnes, la barre d'outils
         et le bandeau de filtres s'afficheraient en texte nu, mots collés. On les
         replie — c'est l'attribut `hidden`, la même clé que les bascules de forme. */
      document.querySelectorAll(".dkr-head,.dkr-thead,.dkr-tools,.dkr-fbar,.dkr-rft,.dkr-rfn,.dkr-rfx")
        .forEach(function(h){h.hidden=true;});
      return;
    }
    try{enrichIndex();enrichPile();enrichFrame();counts();tools();pileBar();}
    catch(e){console.warn("[desktop-v2]",e);}
  }

  /* Les mêmes points d'accroche que desktop.js, plus les repeintures
     partielles de l'index (v2.20 : elles ne passent PAS par renderAll). */
  /* `renderRiseFrame` réécrit tout l'intérieur du cadre : il est le seul point
     par lequel passent la sortie du rituel (closeRemontee) et le premier dépôt
     du cadre par toggleRiseFrame — sans lui, le bandeau redeviendrait muet
     après une revue. */
  ["renderAll","renderList","renderRoot","renderRootSearch","renderRiseFrame",
   "repaintCatNodes","repaintIdxNodes","applyIndexCols","setIndexView",
   "setIndexCols","setPileView","toggleCatPeek","expandCatPeek"].forEach(function(name){
    var orig=window[name];
    if(typeof orig!=="function")return;
    window[name]=function(){var r=orig.apply(this,arguments);paint();return r;};
  });

  DK.addEventListener("change",paint);
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",paint);
  else paint();
})();
