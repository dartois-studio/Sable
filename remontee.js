/* ══════════════════════════════════════════════════════════════════════════════
   remontee.js — LA PORTE DE LA REMONTÉE (ticket « porte basse »)

   Surcouche au sens du CLAUDE.md § 4, chargée APRÈS app.js. Retirer sa balise
   <script> et celle de remontee.css rend l'écran d'avant.

   POURQUOI ELLE PEUT LIRE L'ÉTAT DE L'APP SANS QUE RIEN NE SOIT EXPORTÉ.
   `items`, `batch` et `settings` sont des `let` de PREMIER NIVEAU dans app.js.
   Un `let` de premier niveau dans un script classique ne devient pas une
   propriété de `window` — mais il crée une liaison dans l'environnement lexical
   GLOBAL, partagée par tous les scripts classiques de la page. Ce fichier les
   lit donc par leur nom, sans `window.`, et c'est l'ordre de chargement qui le
   garantit : app.js d'abord, cette surcouche ensuite.
   Corollaire à ne pas oublier : `window.items` est `undefined`. Toute garde
   écrite sur `window.` serait fausse.

   CE QU'ELLE N'INVENTE PAS. Le tirage du jour (`ensureBatch`, maturation 30 j,
   plancher 60 j, sourdine), `riseFrameIds()`, `riseOpenAt()`, `riseDue()`,
   `riseVoidReason()`, `openRemontee()` et la feuille `#appSheet` existent et ne
   sont pas touchés : CE QUI remonte ne change pas, seulement COMMENT ça
   s'annonce.
   ══════════════════════════════════════════════════════════════════════════════ */
(function(){
  "use strict";

  /* ── LA PORTE ─────────────────────────────────────────────────────────────
     Elle remplace le point de l'en-tête (`#inboxBtn`, supprimé) : une porte,
     jamais deux. Elle vit dans la barre d'onglets sans être un onglet — pas de
     `data-tab`, parce que `selectTab`/`paintTabs` translatent le rail vers une
     fente indexée par TAB_ORDER, et que #tabTrack n'en a que deux. Un
     `data-tab="rise"` ferait chercher une troisième fente inexistante : c'est
     le bug de la v2.57 pris par l'autre bord.
     Sans l'attribut, le `querySelectorAll(".tabs button")` de `selectTab` lui
     retire simplement `.active` (`undefined !== name`), ce qui est exactement
     le comportement voulu — la porte n'est jamais « l'onglet courant ». */
  function riseTabEl(){return document.getElementById("riseTab");}

  /* Le compte est REPEINT, jamais reconstruit : on pose un texte et un attribut,
     le CSS tient la forme (invariant § 3 — aucune cote posée depuis JS). */
  function paintRiseTab(){
    var b=riseTabEl(); if(!b)return;
    var c=b.querySelector(".rcnt"); if(!c)return;
    var n=0;
    try{n=riseDue();}catch(e){n=0;}
    c.hidden=!n;
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

  function riseOpenSheet(){
    try{ensureBatch();}catch(e){}
    var ids=[];
    try{ids=riseFrameIds();}catch(e2){ids=[];}
    var list=[];
    for(var i=0;i<ids.length;i++){
      var it=items.find(function(x){return x.id===ids[i];});
      if(it)list.push(it);
    }

    var head=document.getElementById("sheetTitle");
    if(head)head.textContent="La remontée";
    var el=document.getElementById("sheetList");
    if(!el)return;

    var kick='<div class="rskick"><b>La remontée</b><span>'+esc(riseSheetDay())+'</span></div>';
    var body;
    if(list.length){
      body='<p class="rslede">'+esc(riseHeadline(list))+
           ' — la plus ancienne d’abord.</p>'+
           list.map(riseLine).join("");
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
    }
    el.innerHTML=kick+body;

    el.querySelectorAll("[data-rl]").forEach(function(b){
      b.onclick=function(){
        var id=b.getAttribute("data-rl");
        /* `true` : rien à enregistrer, la feuille n'édite rien. Sans lui on
           déclencherait l'enregistrement silencieux d'une fiche qui n'existe pas. */
        closeSheet(true);
        riseOpenAt(id);        /* l'item passe en tête de séquence, puis le rituel */
      };
    });
    /* Les images en base locale ne sont pas dans le HTML : elles s'hydratent
       après coup, exactement comme partout ailleurs. */
    try{hydrateMedia&&hydrateMedia(el);}catch(e6){}

    var ft=document.getElementById("sheetFoot");
    if(ft){
      if(list.length){
        ft.hidden=false;
        ft.innerHTML='<button class="rsgo" id="riseGo">Commencer la revue</button>';
        var go=document.getElementById("riseGo");
        if(go)go.onclick=function(){closeSheet(true);openRemontee();};
      }else{ft.hidden=true;ft.innerHTML="";}
    }

    /* Un tap vaut « vu » : l'annonce ne repassera pas aujourd'hui. */
    try{
      if(settings.frameDay!==todayStr()){settings.frameDay=todayStr();saveSettings();}
    }catch(e7){}

    showSheet();
    paintRiseTab();
  }
  window.riseOpenSheet=riseOpenSheet;

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
            {label:"revoir",fn:riseOpenSheet});
    }catch(e){}
  }
  window.riseMaybeAnnounce=riseMaybeAnnounce;

  function wire(){
    var b=riseTabEl(); if(!b)return;
    b.onclick=function(){
      if(window.riseOpenSheet)riseOpenSheet();
      else openRemontee();      /* repli : la porte mène toujours quelque part */
    };
    paintRiseTab();
  }

  if(document.readyState==="loading")
    document.addEventListener("DOMContentLoaded",wire);
  else wire();
})();
