/* =====================================================================
   Sable — ticket E · le panneau de fiche en LECTURE D'ABORD (bureau).
   Chargée par index.html, APRÈS desktop-v2.js. Le raisonnement et les
   mesures qui ont mené à ce parti sont en tête de desktop-fiche.css.

   MÉTHODE, la même que desktop.js et desktop-v2.js : app.js n'est pas
   modifié. On enveloppe openGrainSheet, on pose UN attribut sur <html> et
   on injecte UN bouton. Aucune cote CSS depuis le JS — les hauteurs du
   mode lecture vivent dans desktop-fiche.css (leçon v2.47).

   CE FICHIER S'EXÉCUTE AUSSI SUR TÉLÉPHONE — sa garde d'entrée porte sur
   data-shell, posé à toute largeur depuis la fusion du 13 août 2026. Tout
   ce qui est visible est donc gardé une seconde fois par `if(!DK.matches)`.
   ===================================================================== */
(function(){
  var html=document.documentElement;
  if(html.getAttribute("data-shell")!=="desktop")return;

  var DK=window.matchMedia("(min-width:1100px)");

  /* ---------- l'état, en un attribut ----------
     "read" (défaut à chaque ouverture) ou "edit". Il vit sur <html> comme
     data-sheet de desktop.js : c'est le CSS qui en tire les conséquences. */
  function setMode(m){html.setAttribute("data-fiche",m);}

  function btn(){return document.querySelector(".dkf-mode");}

  function apply(){
    var b=btn();if(!b)return;
    var edit=html.getAttribute("data-fiche")==="edit";
    b.classList.toggle("on",edit);
    b.setAttribute("aria-pressed",edit?"true":"false");
    b.title=edit?"Revenir à la lecture":"Modifier cette fiche";
    b.setAttribute("aria-label",b.title);
  }

  /* ---------- la bascule, dans l'en-tête de la feuille ----------
     app.js réécrit #sheetHeadAct.innerHTML à CHAQUE ouverture (app.js:3898) :
     le bouton est donc reposé après coup, pas une fois pour toutes. Le
     marqueur data-dkf rend l'opération idempotente — un double rendu ne
     doublera jamais le bouton. */
  function mount(){
    if(!DK.matches)return;
    var act=document.getElementById("sheetHeadAct");
    if(!act||act.querySelector("[data-dkf]"))return;
    var b=document.createElement("button");
    b.className="sheadbtn dkf-mode";
    b.setAttribute("data-dkf","1");
    b.setAttribute("aria-pressed","false");
    b.innerHTML=(typeof icon==="function")
      ? icon("pencil")
      : '<svg class="ic"><use href="icons.svg#pencil"/></svg>';
    b.onclick=function(){
      setMode(html.getAttribute("data-fiche")==="edit"?"read":"edit");
      apply();
    };
    /* en tête des actions : c'est le geste qui commande les autres */
    act.insertBefore(b,act.firstChild);
    apply();
  }

  /* ---------- chaque ouverture repart en lecture ----------
     Volontaire : une fiche laissée en édition contaminerait la suivante,
     et le parcours au clavier (↑ ↓ de desktop.js) enchaîne les ouvertures. */
  var orig=window.openGrainSheet;
  if(typeof orig==="function"){
    window.openGrainSheet=function(){
      var r=orig.apply(this,arguments);
      if(DK.matches){setMode("read");mount();}
      return r;
    };
  }

  /* ---------- sous le seuil ----------
     Même précaution que desktop-v2.js : le CSS est inerte sous 1100 px, mais
     un bouton injecté AU-DESSUS du seuil resterait en place si la fenêtre
     rétrécit. On le replie par `hidden`, la même clé que les bascules de
     forme. (Rappel : resize n'émet aucun événement dans le volet Navigateur
     de Claude Code — ce chemin-ci n'est vérifiable qu'à la main.) */
  function paint(){
    var b=btn();if(!b)return;
    b.hidden=!DK.matches;
  }
  DK.addEventListener("change",paint);
})();
