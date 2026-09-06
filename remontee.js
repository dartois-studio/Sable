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
