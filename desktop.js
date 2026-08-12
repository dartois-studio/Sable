/* =====================================================================
   Sable — proto desktop (ticket #8) · colle entre app.js v3.03 et la mise en
   page 3 colonnes. Chargée UNIQUEMENT par index-desktop.html, après app.js et
   avant la config (donc avant startApp).

   app.js n'est pas modifié : on enveloppe des fonctions globales, on recâble
   quatre boutons, on n'écrit aucune cote CSS depuis JS (leçon v2.47).

   Ce qui est ajouté, et pourquoi :
     · la feuille a deux rôles à la souris — FICHE (colonne de droite, à demeure)
       ou MENU (modale centrée). On pose data-sheet sur <html>, styles-desktop.css
       fait le reste ;
     · un clic sur un item montre sa fiche dans le panneau au lieu d'ouvrir le
       lien. C'est LE choix du master/detail : le panneau est la prévisualisation,
       le lien reste à un geste (le titre est une ancre, Entrée aussi) ;
     · avant d'ouvrir une autre fiche, on FERME la précédente. closeSheet() porte
       l'enregistrement silencieux (onSheetClose, v2.66) : l'écraser en ouvrant
       par-dessus perdrait une correction en cours, sans rien dire ;
     · la ligne ouverte est marquée, et le marquage survit aux re-rendus.
   ===================================================================== */
(function(){
  var html=document.documentElement;
  if(html.getAttribute("data-shell")!=="desktop")return;

  var DK=window.matchMedia("(min-width:1100px)");
  var selId=null;

  /* ---------- rôle de la feuille ---------- */
  function setMode(m){html.setAttribute("data-sheet",m);}
  setMode("detail");

  var sheetEl=document.getElementById("appSheet");
  function sheetOpen(){return !!sheetEl&&sheetEl.classList.contains("open");}

  /* la fiche = mode fiche ; tout le reste = mode menu */
  var origGrainSheet=window.openGrainSheet;
  if(typeof origGrainSheet==="function"){
    window.openGrainSheet=function(id){
      setMode("detail");
      var r=origGrainSheet.call(this,id);
      selId=id;applySel();
      return r;
    };
  }
  ["openWake","openGrainMenu","openCatManageSheet","openPinManageSheet",
   "openBatchCatSheet","openBatchTagSheet","openCaptureSheet","openImportSheet",
   "openSettingsSheet","openGotoSheet"].forEach(function(name){
    var orig=window[name];
    if(typeof orig!=="function")return;
    window[name]=function(){setMode("menu");return orig.apply(this,arguments);};
  });

  /* Quatre boutons portent une RÉFÉRENCE directe, capturée à l'exécution
     d'app.js — avant nous. Les enveloppes ne les atteindraient pas. */
  [["fabAdd","openCaptureSheet"],["batchCat","openBatchCatSheet"],
   ["batchTag","openBatchTagSheet"],["settingsBtn","openSettingsSheet"]]
  .forEach(function(p){
    var el=document.getElementById(p[0]);
    if(el&&typeof window[p[1]]==="function")el.onclick=function(){return window[p[1]]();};
  });

  /* ---------- ouvrir une fiche sans perdre la précédente ---------- */
  function showFiche(id){
    if(!id)return;
    if(sheetOpen()){
      var cur=(typeof editingGrain!=="undefined")?editingGrain:null;
      if(cur===id)return;                  /* déjà là : ne pas casser une saisie */
      closeSheet();                        /* commit silencieux de la fiche en cours */
    }
    window.openGrainSheet(id);
  }

  /* Un clic sur une ligne montre la fiche ; il n'ouvre plus le lien ni la visionneuse.
     Le lien garde deux portes : l'ancre du titre, et Entrée sur la ligne choisie. */
  var origOpenGrain=window.openGrain;
  if(typeof origOpenGrain==="function"){
    window.openGrain=function(id){
      if(!DK.matches)return origOpenGrain.call(this,id);
      showFiche(id);
    };
  }

  /* ---------- marquage de la ligne ouverte ---------- */
  function cssEsc(v){return (window.CSS&&CSS.escape)?CSS.escape(v):String(v).replace(/["\\]/g,"\\$&");}
  function applySel(){
    var prev=document.querySelectorAll(".dk-sel");
    for(var i=0;i<prev.length;i++)prev[i].classList.remove("dk-sel");
    if(!selId)return;
    var els=document.querySelectorAll('[data-id="'+cssEsc(selId)+'"]');
    for(var j=0;j<els.length;j++)els[j].classList.add("dk-sel");
  }
  ["renderAll","renderList","renderRootSearch"].forEach(function(name){
    var orig=window[name];
    if(typeof orig!=="function")return;
    window[name]=function(){var r=orig.apply(this,arguments);applySel();return r;};
  });

  /* ---------- fermer le panneau ---------- */
  function closeDetail(){
    if(typeof closeSheet==="function")closeSheet();
    selId=null;applySel();
  }
  var closeBtn=document.getElementById("dkClose");
  if(closeBtn)closeBtn.onclick=closeDetail;

  /* ---------- clavier ---------- */
  function busy(){
    var rise=document.getElementById("rise");
    if(rise&&!rise.hidden)return true;                        /* la remontée est un rituel : on n'y navigue pas */
    var b=document.body.classList;
    return b.contains("selecting")||b.contains("dragging");
  }
  function rows(){
    var res=document.getElementById("rootResults");
    if(document.body.classList.contains("searching")&&res&&!res.hidden)
      return [].slice.call(res.querySelectorAll("[data-id]"));
    var pile=document.getElementById("tab-pile");
    if(pile&&!pile.hidden)
      return [].slice.call(document.getElementById("pileList").querySelectorAll("[data-id]"));
    return [];
  }
  function typing(t){return !!t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable);}

  document.addEventListener("keydown",function(e){
    if(!DK.matches||e.metaKey||e.ctrlKey||e.altKey)return;
    if(typing(e.target)){if(e.key==="Escape")e.target.blur();return;}

    if(e.key==="Escape"){if(sheetOpen())closeDetail();return;}
    if(busy())return;

    if(e.key==="/"){
      e.preventDefault();
      if(typeof openSearch==="function")openSearch();
      else{var si=document.getElementById("searchInput");if(si)si.focus();}
      return;
    }
    if(e.key==="Enter"){
      if(selId&&typeof origOpenGrain==="function"){e.preventDefault();origOpenGrain(selId);}
      return;
    }
    if(e.key==="ArrowDown"||e.key==="ArrowUp"){
      var list=rows();
      if(!list.length)return;
      e.preventDefault();
      var cur=-1;
      for(var i=0;i<list.length;i++)if(list[i].getAttribute("data-id")===selId){cur=i;break;}
      var next=(e.key==="ArrowDown")
        ? (cur<0?0:Math.min(cur+1,list.length-1))
        : (cur<0?0:Math.max(cur-1,0));
      var el=list[next];
      if(el.scrollIntoView)el.scrollIntoView({block:"nearest"});
      showFiche(el.getAttribute("data-id"));
    }
  });

  /* ---------- le numéro de version, dans le rail ---------- */
  var v=document.getElementById("dkVer");
  if(v&&typeof APP_VERSION!=="undefined")v.textContent=APP_VERSION;
})();
