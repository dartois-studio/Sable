/* ═══════════════════════════════════════════════════════════════════════════
   SABLE — ONBOARDING (module autonome)                              ob-v1.0

   Ce fichier ne connaît RIEN de l'app : ni items, ni onglets, ni réglages, ni
   Supabase. Il ne lit ni n'écrit aucune donnée de Sable. Il reçoit deux
   fonctions de l'hôte et rend un compte rendu — c'est tout le contrat :

     SableOnboarding.open({
       mode      : "first" | "settings",     // défaut "first"
       platform  : "auto" | "ios" | "android",
       onAddLink : async url => id | false,  // l'app ajoute vraiment l'item
       onFinish  : (reason, info) => {}      // "done" | "skipped" | "closed"
     });
     SableOnboarding.shouldShow()   // vrai si jamais vu sur cet appareil
     SableOnboarding.close()        // fermeture programmée
     SableOnboarding.markSeen()     // marquer vu sans l'afficher

   ISOLATION (point 6). Tout le DOM vit dans le shadow root de l'élément
   <sable-onboarding>, et onboarding.css n'y est chargé que là. Les sélecteurs
   très génériques de la maquette (.it, .pile, .sheet, .device, .finger…) ne
   peuvent donc pas atteindre l'app, et styles.css ne peut pas déformer la
   maquette. En revanche les VARIABLES CSS traversent la frontière : l'onboarding
   hérite de la palette de l'app et suit data-theme="dark" gratuitement. C'est
   pourquoi ce module ne redéclare aucun token de couleur.

   PLATEFORME (point 3). Détectée, jamais choisie : iOS apprend copier → coller
   (le Web Share Target n'existe pas pour les PWA sur iOS), Android apprend le
   partage natif. Un seul jeu de textes par plateforme, aucun réglage visible.
   ═══════════════════════════════════════════════════════════════════════════ */
(function (global) {
  "use strict";

  const VERSION  = "ob-v1.0";
  const SEEN_KEY = "sable:onboarding:seen";
  const CSS_HREF = new URL("./onboarding.css", document.baseURI).href;

  const TPL = `<section id="ob" role="region" aria-label="Bienvenue dans Sable">
    <div class="ob-top">
      <button class="obback hide" id="obback" aria-label="Étape précédente"><svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg></button>
      <span class="spacer"></span>
      <button class="skip" id="skip">Passer</button>
    </div>

    <div class="prog" id="prog" aria-hidden="true">
      <button data-d="0"><i></i></button>
      <button data-d="1"><i></i></button>
      <button data-d="2"><i></i></button>
      <button data-d="3"><i></i></button>
      <button data-d="4"><i></i></button>
    </div>

    <p class="sr-only" id="liveStep" aria-live="polite"></p>

    <div class="ob-view">
      <div class="ob-track" id="track">

        <!-- ============ 1 · Le problème ============ -->
        <div class="screen calm" id="screen-0" tabindex="-1">
          <div class="thread" aria-hidden="true">
            <div class="bub f1"><div class="u">https://un-truc-genial.com/…</div><div class="d">il y a 4 mois</div></div>
            <div class="bub f2 pic"><span class="thumb"></span><span class="col"><span class="u">IMG_4820.jpg</span><span class="d">il y a 6 semaines</span></span></div>
            <div class="bub"><div class="u txt">« penser à relire le chapitre 3 »</div><div class="d">hier</div></div>
          </div>
          <span class="wordmark live">Sable</span>
          <h2>Tu t'envoies des trucs à toi-même. Tu n'y reviens jamais.</h2>
          <p>Liens, notes, images&nbsp;: Sable les garde — et te les remet sous les yeux.</p>
        </div>

        <!-- ============ 2 · Faire entrer (démo adaptée à l'appareil) ============ -->
        <div class="screen" id="screen-1" tabindex="-1">

          <!-- Android / navigateur avec cible de partage -->
          <div class="device" id="devAnd" data-beat="0" aria-hidden="true">
            <div class="dscreen">
              <div class="layer brow">
                <div class="minibar"><span class="dotm"></span><span class="mburl">typographie-suisse.com</span></div>
                <div class="art">
                  <div class="h"></div><div class="img"></div>
                  <div class="l w1"></div><div class="l w2"></div><div class="l w3"></div>
                </div>
                <div class="browtools">
                  <span class="btic"><svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg></span>
                  <span class="btic"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></span>
                  <span class="btic share"><svg viewBox="0 0 24 24"><path d="M12 15V4M12 4l-3 3M12 4l3 3"/><path d="M6 11H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-1"/></svg></span>
                  <span class="btic"><svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h10"/></svg></span>
                </div>
              </div>

              <div class="layer sheet">
                <div class="sh-h">Partager vers</div>
                <div class="tiles">
                  <div class="tile"><span class="sq">M</span><span class="nm">Msg</span></div>
                  <div class="tile"><span class="sq">✉</span><span class="nm">Mail</span></div>
                  <div class="tile sable"><span class="sq real"><svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="s2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#EFE0BE"/><stop offset="1" stop-color="#D9BF93"/></linearGradient></defs><rect x="2" y="2" width="60" height="60" rx="14" fill="url(#s2)"/><path fill="#20190F" d="M43.91 36.13Q44.58 37.23 44.58 40.48Q44.58 43.73 43.24 45.98Q42.03 47.74 38.08 50.87Q34.13 54 32.24 54Q28.90 54 24.59 50.51Q20.27 47.01 19.12 42.82L25.86 38.20Q26.83 41.06 28.96 43.43Q31.09 45.80 31.97 45.80Q32.85 45.80 33.85 45.22Q34.86 44.64 35.40 44.03Q36.19 43.06 36.19 40.99Q36.19 38.93 35.22 38.44Q34.01 37.41 30.51 35.71Q27.02 34.01 24.04 32.03Q21.06 30.06 20.24 28.17Q19.42 26.29 19.42 23.28Q19.42 20.27 20.76 18.02Q21.97 16.26 25.92 13.13Q29.87 10 31.76 10Q35.10 10 39.41 13.49Q43.73 16.99 44.88 21.18L38.14 25.86Q37.17 23.01 35.04 20.60Q32.91 18.20 32.03 18.20Q31.15 18.20 30.12 18.75Q29.08 19.30 28.44 20.12Q27.81 20.94 27.81 22.91Q27.81 24.89 29.02 25.56Q29.99 26.41 33.46 28.23Q42.33 33.09 43.91 36.13Z"/></svg></span><span class="nm">Sable</span></div>
                  <div class="tile"><span class="sq">N</span><span class="nm">Notes</span></div>
                </div>
                <div class="sh-more">··· Plus</div>
              </div>

              <div class="layer pile slidein">
                <div class="ph">Ma pile</div>
                <div class="tierm">Aujourd'hui</div>
                <div class="it new"><span class="th">t</span><span class="tx"><span class="t1">typographie-suisse.com</span><span class="t2"><span class="chip">sans catégorie</span>lien · à l'instant</span></span></div>
                <div class="it"><span class="th pic"></span><span class="tx"><span class="t1">IMG_4820.jpg</span><span class="t2">image · hier</span></span></div>
                <div class="it"><span class="th">”</span><span class="tx"><span class="t1 dim">« relire le chapitre 3 »</span><span class="t2">note · hier</span></span></div>
                <div class="ptabs">
                  <span class="tb tb-col"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="6" rx="2"/><rect x="3" y="14" width="18" height="6" rx="2"/></svg>Collection</span>
                  <span class="tb tb-pile on"><svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h10"/></svg>Ma pile</span>
                </div>
              </div>

              <div class="mtoast">Ajouté à Sable</div>
              <div class="finger" id="fingerAnd"></div>
            </div>
          </div>

          <!-- iOS / copier-coller -->
          <div class="device" id="devIOS" data-beat="0" aria-hidden="true" hidden>
            <div class="dscreen">
              <div class="layer brow">
                <div class="minibar"><span class="dotm"></span><span class="mburl">typographie-suisse.com</span></div>
                <div class="art">
                  <div class="h"></div><div class="img"></div>
                  <div class="l w1"></div><div class="l w2"></div><div class="l w3"></div>
                </div>
                <div class="browtools">
                  <span class="btic"><svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg></span>
                  <span class="btic"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></span>
                  <span class="btic share"><svg viewBox="0 0 24 24"><path d="M12 15V4M12 4l-3 3M12 4l3 3"/><path d="M6 11H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-1"/></svg></span>
                  <span class="btic"><svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h10"/></svg></span>
                </div>
              </div>

              <div class="layer isheet">
                <div class="ih">
                  <span class="fav"></span>
                  <span class="itx"><span class="ttl">Les grilles de Karl Gerstner</span><span class="dom">typographie-suisse.com</span></span>
                </div>
                <div class="irow copyr"><span class="ic"><svg viewBox="0 0 24 24"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/></svg></span>Copier</div>
                <div class="irow dimr"><span class="ic"><svg viewBox="0 0 24 24"><path d="M12 3v13M12 16l-4-4M12 16l4-4"/><path d="M4 19h16"/></svg></span>Ajouter à la liste de lecture</div>
                <div class="irow dimr"><span class="ic"><svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h10"/></svg></span>Modifier les actions…</div>
              </div>

              <div class="layer sable">
                <div class="sh">Ma pile</div>
                <div class="tierm">Hier</div>
                <div class="it"><span class="th pic"></span><span class="tx"><span class="t1">IMG_4820.jpg</span><span class="t2">image · hier</span></span></div>
                <div class="it"><span class="th">”</span><span class="tx"><span class="t1 dim">« relire le chapitre 3 »</span><span class="t2">note · hier</span></span></div>
                <div class="fab"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></div>
                <div class="pastebar">
                  <span class="pv"><span class="p1">Dans le presse-papier</span><span class="p2">typographie-suisse.com</span></span>
                  <span class="pb">Coller</span>
                </div>
                <div class="ptabs">
                  <span class="tb tb-col"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="6" rx="2"/><rect x="3" y="14" width="18" height="6" rx="2"/></svg>Collection</span>
                  <span class="tb tb-pile on"><svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h10"/></svg>Ma pile</span>
                </div>
              </div>

              <div class="layer pile slidein">
                <div class="ph">Ma pile</div>
                <div class="tierm">Aujourd'hui</div>
                <div class="it new"><span class="th">t</span><span class="tx"><span class="t1">typographie-suisse.com</span><span class="t2"><span class="chip">sans catégorie</span>lien · à l'instant</span></span></div>
                <div class="it"><span class="th pic"></span><span class="tx"><span class="t1">IMG_4820.jpg</span><span class="t2">image · hier</span></span></div>
                <div class="it"><span class="th">”</span><span class="tx"><span class="t1 dim">« relire le chapitre 3 »</span><span class="t2">note · hier</span></span></div>
                <div class="ptabs">
                  <span class="tb tb-col"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="6" rx="2"/><rect x="3" y="14" width="18" height="6" rx="2"/></svg>Collection</span>
                  <span class="tb tb-pile on"><svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h10"/></svg>Ma pile</span>
                </div>
              </div>

              <div class="mtoast">Ajouté à Sable</div>
              <div class="finger" id="fingerIOS"></div>
            </div>
          </div>

          <p class="caption" id="cap1" aria-hidden="true"></p>

          <div class="slotx">
            <div class="defpair" id="def1" aria-hidden="true">
              <div class="dl"><span class="dt">Ma pile</span><span class="dd">tout ce qui arrive</span></div>
              <div class="dl"><span class="dt">Collection</span><span class="dd">ce que tu as rangé</span></div>
            </div>
            <p class="subhint ctx" id="hint1"></p>
          </div>

          <div class="demofoot">
            <span class="dprog" id="dbar1"></span>
            <button class="rewatch" id="rewatch1"><svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 1-3-6.7M21 4v4h-4"/></svg>Revoir</button>
          </div>
          <div class="sr-only" id="sr1"></div>
        </div>

        <!-- ============ 3 · Pourquoi (la remontée) ============ -->
        <div class="screen calm" id="screen-2" tabindex="-1">
          <span class="eyebrow">Pourquoi Sable</span>
          <div class="resurf" aria-hidden="true">
            <div class="notif">
              <span class="ni"><svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="s1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#EFE0BE"/><stop offset="1" stop-color="#D9BF93"/></linearGradient></defs><rect x="2" y="2" width="60" height="60" rx="14" fill="url(#s1)"/><path fill="#20190F" d="M43.91 36.13Q44.58 37.23 44.58 40.48Q44.58 43.73 43.24 45.98Q42.03 47.74 38.08 50.87Q34.13 54 32.24 54Q28.90 54 24.59 50.51Q20.27 47.01 19.12 42.82L25.86 38.20Q26.83 41.06 28.96 43.43Q31.09 45.80 31.97 45.80Q32.85 45.80 33.85 45.22Q34.86 44.64 35.40 44.03Q36.19 43.06 36.19 40.99Q36.19 38.93 35.22 38.44Q34.01 37.41 30.51 35.71Q27.02 34.01 24.04 32.03Q21.06 30.06 20.24 28.17Q19.42 26.29 19.42 23.28Q19.42 20.27 20.76 18.02Q21.97 16.26 25.92 13.13Q29.87 10 31.76 10Q35.10 10 39.41 13.49Q43.73 16.99 44.88 21.18L38.14 25.86Q37.17 23.01 35.04 20.60Q32.91 18.20 32.03 18.20Q31.15 18.20 30.12 18.75Q29.08 19.30 28.44 20.12Q27.81 20.94 27.81 22.91Q27.81 24.89 29.02 25.56Q29.99 26.41 33.46 28.23Q42.33 33.09 43.91 36.13Z"/></svg></span>
              <span class="nt">
                <span class="n1">Sable <span>maintenant</span></span>
                <span class="n2">Tu avais gardé ça. Toujours envie&nbsp;?</span>
              </span>
            </div>
            <div class="slot"></div>
            <div class="gcard">
              <span class="gt"></span>
              <span class="gtx">
                <span class="g1">Les grilles de Karl Gerstner</span>
                <span class="g2">typographie-suisse.com · 3 semaines</span>
              </span>
            </div>
          </div>
          <h2>Ah&nbsp;oui,&nbsp;ça&nbsp;!</h2>
          <p>Ce que tu gardes s'enfouit. De temps en temps, Sable te le fait <b>remonter</b>.</p>
        </div>

        <!-- ============ 4 · Ranger (catégorie + #tag → Collection) ============ -->
        <div class="screen" id="screen-3" tabindex="-1">
          <span class="eyebrow">Facultatif</span>

          <div class="device" id="devSort" data-beat="0" aria-hidden="true">
            <div class="dscreen">
              <div class="layer pile">
                <div class="ph">Ma pile</div>
                <div class="tierm">Aujourd'hui</div>
                <div class="it new"><span class="th">t</span><span class="tx"><span class="t1">typographie-suisse.com</span>
                  <span class="t2">
                    <span class="chip nocat">sans catégorie</span>
                    <span class="chip cat on">Design</span>
                    <span class="chip tag">#grilles</span>
                    lien
                  </span></span></div>
                <div class="it"><span class="th pic"></span><span class="tx"><span class="t1">IMG_4820.jpg</span><span class="t2"><span class="chip">Design</span>image</span></span></div>
                <div class="it"><span class="th">”</span><span class="tx"><span class="t1 dim">« relire le chapitre 3 »</span><span class="t2">note</span></span></div>
                <div class="ptabs">
                  <span class="tb tb-col"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="6" rx="2"/><rect x="3" y="14" width="18" height="6" rx="2"/></svg>Collection</span>
                  <span class="tb tb-pile on"><svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h10"/></svg>Ma pile</span>
                </div>
              </div>

              <div class="layer esheet">
                <div class="eh">typographie-suisse.com</div>
                <div class="el">Catégorie</div>
                <div class="cchips">
                  <span class="cch"><span class="dot" style="background:hsl(28 42% 46%)"></span>Dev</span>
                  <span class="cch design"><span class="dot" style="background:hsl(198 42% 46%)"></span>Design</span>
                  <span class="cch"><span class="dot" style="background:hsl(96 42% 46%)"></span>Recettes</span>
                </div>
                <div class="el">Tags</div>
                <div class="tagfield"><span class="tg t-a">#grilles</span><span class="tg t-b">#typo</span><span class="cur"></span>ajouter…</div>
              </div>

              <div class="layer coll">
                <div class="ch"><span class="bk"><svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg></span>Collection <span class="sep">·</span> Design</div>
                <div class="filt"><span class="f-g">#grilles</span><span>#typo</span><span>#couleur</span></div>
                <div class="it new"><span class="th">t</span><span class="tx"><span class="t1">typographie-suisse.com</span><span class="t2">lien · #grilles</span></span></div>
                <div class="it"><span class="th pic"></span><span class="tx"><span class="t1">IMG_4820.jpg</span><span class="t2">image · #grilles</span></span></div>
                <div class="it notag"><span class="th">d</span><span class="tx"><span class="t1">dribbble.com</span><span class="t2">lien · #couleur</span></span></div>
                <div class="ptabs">
                  <span class="tb tb-col on"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="6" rx="2"/><rect x="3" y="14" width="18" height="6" rx="2"/></svg>Collection</span>
                  <span class="tb tb-pile"><svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h10"/></svg>Ma pile</span>
                </div>
              </div>

              <div class="finger" id="fingerSort"></div>
            </div>
          </div>

          <p class="caption" id="cap2" aria-hidden="true"></p>

          <div class="slotx">
            <div class="defpair" id="def2" aria-hidden="true">
              <div class="dl"><span class="dt">Catégorie</span><span class="dd">une seule</span></div>
              <div class="dl"><span class="dt">#Tags</span><span class="dd">autant que tu veux</span></div>
            </div>
          </div>

          <div class="demofoot">
            <span class="dprog" id="dbar2"></span>
            <button class="rewatch" id="rewatch2"><svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 1-3-6.7M21 4v4h-4"/></svg>Revoir</button>
          </div>
          <div class="sr-only" id="sr2"></div>
        </div>

        <!-- ============ 5 · Ton premier lien (action) ============ -->
        <div class="screen" id="screen-4" tabindex="-1">
          <span class="eyebrow">Ton premier item</span>
          <h2>On essaie tout de suite&nbsp;?</h2>
          <p>Copie n'importe quel lien, puis touche le bouton. Trois secondes.</p>

          <div class="firstbox">
            <button class="pastebtn" id="pasteBtn">
              <svg viewBox="0 0 24 24"><rect x="8" y="8" width="13" height="13" rx="2"/><path d="M4 16V5a2 2 0 0 1 2-2h9"/></svg>
              Coller mon premier lien
            </button>
            <div class="manual" id="manual">
              <input id="manualInput" type="url" inputmode="url" placeholder="colle ou tape un lien" aria-label="Lien à garder">
              <button id="manualGo">Garder</button>
            </div>
            <div class="okcard" id="okcard" role="status">
              <span class="ot"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg></span>
              <span class="otx"><span class="o1">Premier item gardé</span><span class="o2" id="okUrl"></span></span>
            </div>
          </div>

          <p class="privacy">Ta pile reste à toi. Pour la retrouver sur tous tes appareils, Sable t'envoie un <b>lien de connexion par email</b> — pas de mot de passe à retenir.</p>
        </div>

      </div>
    </div>

    <div class="ob-foot">
      <button class="cta" id="cta">Continuer</button>
      <button class="later" id="later">Je le ferai plus tard</button>
    </div>
  </section>`;

  let host = null, inst = null, opts = {}, prevOverflow = "";

  function shouldShow(){
    try { return !localStorage.getItem(SEEN_KEY); } catch (e) { return true; }
  }
  function markSeen(){
    try { localStorage.setItem(SEEN_KEY, VERSION + "@" + new Date().toISOString()); } catch (e) {}
  }

  function open(o){
    if (host) close("replaced");
    opts = Object.assign({ mode:"first", platform:"auto", onAddLink:null, onFinish:null }, o || {});

    host = document.createElement("sable-onboarding");
    host.setAttribute("role", "dialog");
    host.setAttribute("aria-modal", "true");
    host.setAttribute("aria-label", "Bienvenue dans Sable");
    /* La feuille du module arrive par le réseau (ou le cache du worker) : sans
       cette attente, on verrait une demi-seconde de HTML nu par-dessus l'app. */
    host.style.cssText = "position:fixed;inset:0;z-index:95;visibility:hidden";

    const root = host.attachShadow({ mode:"open" });
    const link = document.createElement("link");
    link.rel = "stylesheet"; link.href = CSS_HREF;
    const reveal = () => { host && (host.style.visibility = "visible"); };
    link.addEventListener("load", reveal);
    link.addEventListener("error", reveal);   /* CSS absent : mieux vaut nu que rien */
    setTimeout(reveal, 1200);
    root.appendChild(link);
    root.appendChild(document.createRange().createContextualFragment(TPL));

    prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.appendChild(host);

    inst = boot(root, opts, report);
    return api;
  }

  /* Une seule sortie, quel qu'en soit le déclencheur. `reason` remonte tel quel
     à l'hôte : c'est LUI qui décide où atterrir, pas l'onboarding. */
  function report(reason, info){
    if (reason !== "replaced" && (reason === "done" || reason === "skipped")) markSeen();
    const cb = opts.onFinish;
    const dying = host;
    if (inst) { try { inst.destroy(); } catch (e) {} }
    inst = null; host = null;
    document.body.style.overflow = prevOverflow;
    /* on laisse jouer la sortie du voile avant de retirer le nœud */
    setTimeout(() => dying && dying.remove(), 380);
    if (typeof cb === "function") { try { cb(reason, info || {}); } catch (e) { console.error(e); } }
  }

  function close(reason){
    if (!host) return;
    const r = root_of();
    const ob = r && r.querySelector("#ob");
    if (ob) ob.classList.add("gone");
    report(reason || "closed", {});
  }
  function root_of(){ return host && host.shadowRoot; }

  /* ───────────────────────── le cœur, inchangé sauf indication ───────────── */
  function boot(root, opts, finish){
    const $id = id => root.querySelector("#" + id);


  const N = 5;
  const STEPS = ["Le problème", "Faire entrer", "Pourquoi Sable", "Ranger", "Ton premier item"];

  const track   = $id("track");
  const screens = [...root.querySelectorAll(".screen")];
  const cta     = $id("cta");
  const later   = $id("later");
  const skip    = $id("skip");
  const obback  = $id("obback");
  const ob      = $id("ob");
  const live    = $id("liveStep");
  const progBtns= [...root.querySelectorAll("#prog button")];
  const reduce  = matchMedia("(prefers-reduced-motion: reduce)").matches;

  let i = 0, seen = 0, pasted = false, firstUrl = null;
  const done = new Set();                      /* écrans dont le pas-à-pas a été vu en entier */
  const mode = (opts.mode === "settings") ? "settings" : "first";
  const plat = (opts.platform === "ios" || opts.platform === "android") ? opts.platform : detectPlatform();

  /* iOS ne supporte pas le Web Share Target pour les PWA : on enseigne
     le chemin qui fonctionne (copier → coller) au lieu du partage natif. */
  function detectPlatform(){
    const ua = navigator.userAgent || "";
    const iOS = /iPad|iPhone|iPod/.test(ua) ||
                (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    return iOS ? "ios" : "android";
  }

  /* ================= moteur de démo (réutilisable) ================= */
  /* Petit retour haptique au moment exact du tap simulé.
     Sans effet sur iOS Safari, qui n'implémente pas l'API Vibration. */
  function haptic(pattern){
    if (reduce) return;
    try { if (navigator.vibrate) navigator.vibrate(pattern); } catch (e) {}
  }

  /* Les démos n'avancent plus au minuteur : c'est le lecteur qui décide.
     Les valeurs `ms` des beats restent en place si tu veux un jour
     réactiver une lecture automatique. */
  function createDemo(cfg){
    let b = -1, done = false;

    function setCtl(){
      cfg.ctl.classList.toggle("on", done);     /* « Revoir » n'existe qu'à la fin */
      if (cfg.onChange) cfg.onChange();         /* le bouton principal change de libellé */
    }

    /* Le pointeur est ancré à un élément réel de la maquette, mesuré après
       que les couches ont fini de glisser. Des pourcentages en dur se
       décalaient dès que la taille du téléphone ou le contenu changeait. */
    function paintFinger(sel){
      const f = cfg.finger;
      if (!f) return;
      clearTimeout(f._t); clearTimeout(f._t2);
      if (!sel){ f.classList.remove("show", "tap"); return; }
      f.classList.remove("show", "tap");
      const settle = reduce ? 0 : 360;
      f._t = setTimeout(() => {
        const scr = cfg.dev.querySelector(".dscreen");
        const el  = cfg.dev.querySelector(sel);
        if (!scr || !el) return;
        const a = el.getBoundingClientRect(), b = scr.getBoundingClientRect();
        if (!b.width || !b.height) return;
        f.style.left = ((a.left + a.width  / 2 - b.left) / b.width  * 100) + "%";
        f.style.top  = ((a.top  + a.height / 2 - b.top ) / b.height * 100) + "%";
        f.classList.add("show");
        f._t2 = setTimeout(() => {
          f.classList.add("tap");
          haptic(10);
          setTimeout(() => f.classList.remove("tap"), 300);
        }, reduce ? 0 : 240);
      }, settle);
    }

    function setBeat(n){
      b = n;
      cfg.dev.dataset.beat = n;
      cfg.cap.innerHTML = cfg.beats[n].t;
      [...cfg.bar.children].forEach((seg, k) => seg.classList.toggle("on", k <= n));
      paintFinger(cfg.beats[n].sel);
      /* la paire de définitions n'arrive qu'à la fin : c'est la conclusion, pas un décor */
      if (cfg.def)  cfg.def.classList.toggle("on", n === cfg.beats.length - 1);
      /* l'indice de rattrapage n'apparaît qu'au temps où il sert */
      if (cfg.hint) cfg.hint.classList.toggle("on", (cfg.hintAt || []).indexOf(n) !== -1);
    }

    function setSource(src){          /* changement de plateforme sans réinstancier */
      cfg.dev = src.dev; cfg.finger = src.finger;
      cfg.beats = src.beats; cfg.hintAt = src.hintAt;
    }

    function start(atEnd){
      cfg.sr.innerHTML = "<ol>" + cfg.beats.map(x => "<li>" + x.t.replace(/<[^>]+>/g, "") + "</li>").join("") + "</ol>";
      if (cfg.bar.children.length !== cfg.beats.length){
        cfg.bar.innerHTML = cfg.beats.map(() => "<i></i>").join("");
      }
      if (reduce){                       /* aucune animation : état final + étapes écrites */
        done = true;
        setBeat(cfg.beats.length - 1);
        cfg.cap.innerHTML = cfg.beats.map((x, k) => (k + 1) + ". " + x.t).join("<br>");
        setCtl();
        return;
      }
      /* Retour arrière sur un écran déjà parcouru : on le rouvre à sa
         conclusion, pas au premier temps. Refaire subir les quatre taps à
         quelqu'un qui revient d'un pas en arrière serait une punition. */
      if (atEnd){
        done = true;
        setBeat(cfg.beats.length - 1);
        setCtl();
        return;
      }
      done = false;
      setBeat(0);
      setCtl();
    }

    function advance(){
      if (done || b >= cfg.beats.length - 1){ start(); return; }
      setBeat(b + 1);
      if (b >= cfg.beats.length - 1) done = true;
      setCtl();
    }

    function stop(){ /* plus de minuteur à annuler ; conservé pour l'API */ }

    cfg.ctl.addEventListener("click", e => { e.stopPropagation(); start(); });  /* Revoir */
    return { start, stop, advance, setSource, isDone: () => done };
  }

  /* ---------- écran 3 : faire entrer ---------- */
  const devAnd = $id("devAnd");
  const devIOS = $id("devIOS");
  const hint1  = $id("hint1");

  const ENTER = {
    android: {
      dev: devAnd, finger: $id("fingerAnd"),
      hint: "Pas de Sable dans la liste&nbsp;? <b>··· Plus</b> pour l'épingler.", hintAt: [1, 2],
      beats: [
        { t:"Tu trouves quelque chose.",   sel:null },
        { t:"Touche <b>Partager</b>.",     sel:".btic.share" },
        { t:"Choisis <b>Sable</b>.",       sel:".tile.sable .sq" },
        { t:"C'est dans <b>Ma pile</b>.",  sel:null }
      ]
    },
    ios: {
      dev: devIOS, finger: $id("fingerIOS"),
      hint: "Sur iPhone, pas de Sable dans le partage&nbsp;: on passe par <b>Copier</b>.", hintAt: [1],
      beats: [
        { t:"Tu trouves quelque chose.",                    sel:null },
        { t:"Touche <b>Partager</b>, puis <b>Copier</b>.",  sel:".irow.copyr" },
        { t:"Ouvre Sable et touche <b>+</b>.",              sel:".fab" },
        { t:"Collé. C'est dans <b>Ma pile</b>.",            sel:null }
      ]
    }
  };

  /* Une seule instance : les deux maquettes partagent légende, barre et bouton,
     donc deux instances écrivaient toutes les deux dedans (légende iOS sur
     maquette Android, barre déjà remplie). On change de source, pas d'instance. */
  const enterDemo = createDemo({
    dev: ENTER[plat].dev, finger: ENTER[plat].finger, beats: ENTER[plat].beats,
    hintAt: [1, 2],
    cap: $id("cap1"),
    bar: $id("dbar1"),
    ctl: $id("rewatch1"),
    sr:  $id("sr1"),
    def: $id("def1"),
    hint: $id("hint1"),
    onChange: () => paintCta()
  });
  [devAnd, devIOS].forEach(d => d.addEventListener("click", () => enterDemo.advance()));

  function paintPlatform(){
    devAnd.hidden = (plat !== "android");
    devIOS.hidden = (plat !== "ios");
    hint1.innerHTML = ENTER[plat].hint;
    enterDemo.setSource(ENTER[plat]);
  }

  /* ---------- écran 4 : ranger ---------- */
  const devSort = $id("devSort");
  const sortDemo = createDemo({
    dev: devSort,
    finger: $id("fingerSort"),
    cap: $id("cap2"),
    bar: $id("dbar2"),
    ctl: $id("rewatch2"),
    sr:  $id("sr2"),
    def: $id("def2"),
    onChange: () => paintCta(),
    beats: [
      { t:"Un item arrive sans catégorie.",                  sel:null },
      { t:"Touche-le.",                                      sel:".pile .it.new" },
      { t:"Une <b>catégorie</b> : une seule.",               sel:".cch.design" },
      { t:"Des <b>#tags</b> : autant que tu veux.",          sel:".tagfield" },
      { t:"Il est dans <b>Collection · Design</b>.",         sel:null },
      { t:"<b>#grilles</b> retrouve tout — même une image.", sel:".filt .f-g" }
    ]
  });

  function demoFor(n){
    if (n === 1) return enterDemo;   /* « Faire entrer » est désormais l'écran 2 */
    if (n === 3) return sortDemo;
    return null;
  }

  /* ================= dernier écran : action réelle ================= */
  const pasteBtn    = $id("pasteBtn");
  const manual      = $id("manual");
  const manualInput = $id("manualInput");
  const manualGo    = $id("manualGo");
  const okcard      = $id("okcard");
  const okUrl       = $id("okUrl");

  function looksLikeUrl(v){
    v = (v || "").trim();
    if (!v || /\s/.test(v)) return false;
    return /^https?:\/\/\S+\.\S+/i.test(v) || /^[\w-]+(\.[\w-]+)+(\/\S*)?$/i.test(v);
  }

  /* POINT 4 — L'ITEM EST RÉEL. L'onboarding ne sait pas ranger un item : il
     confie l'URL à l'hôte (opts.onAddLink → addItem côté app) et n'affiche la
     confirmation qu'une fois l'ajout accepté. En cas d'échec, on ne ment pas :
     le bouton reste, avec un mot. */
  async function accept(v){
    pasteBtn.disabled = true;
    let ok = true;
    try {
      if (typeof opts.onAddLink === "function") ok = (await opts.onAddLink(v)) !== false;
    } catch (e) { ok = false; }
    pasteBtn.disabled = false;
    if (!ok){
      manual.classList.add("on");
      manualInput.value = v;
      okUrl.textContent = "";
      return;
    }
    pasted = true;
    firstUrl = v;
    okUrl.textContent = v.replace(/^https?:\/\//i, "");
    okcard.classList.add("on");
    haptic([14, 50, 22]);
    pasteBtn.style.display = "none";
    manual.classList.remove("on");
    render();
  }

  pasteBtn.addEventListener("click", async () => {
    try {
      const txt = await navigator.clipboard.readText();
      if (looksLikeUrl(txt)) { accept(txt); return; }
      manual.classList.add("on");
      manualInput.value = (txt || "").trim();
      manualInput.focus();
    } catch (e) {
      manual.classList.add("on");
      manualInput.focus();
    }
  });
  manualGo.addEventListener("click", () => {
    const v = manualInput.value.trim();
    if (looksLikeUrl(v)) accept(v);
    else { manualInput.focus(); manualInput.select(); }
  });
  manualInput.addEventListener("keydown", e => { if (e.key === "Enter") manualGo.click(); });

  /* ================= navigation ================= */
  function finalWord(){
    if (mode === "settings") return "Fermer";
    return "Découvrir ma pile";
  }

  /* Un seul bouton « avancer » dans tout l'écran : tant que le pas-à-pas
     n'est pas terminé, il fait avancer la démonstration ; ensuite il fait
     passer à l'écran suivant. Impossible de sauter l'explication sans le voir. */
  function stepping(){
    const d = demoFor(i);
    return !!d && !d.isDone();
  }

  function paintCta(){
    if (i === N - 1){ cta.textContent = finalWord(); return; }
    cta.textContent = stepping() ? "Suivant" : "Continuer";
  }

  function render(){
    track.style.transform = "translateX(-" + (i * 20) + "%)";

    screens.forEach((s, k) => {
      const off = (k !== i);
      s.setAttribute("aria-hidden", off ? "true" : "false");
      if (off) s.setAttribute("inert", ""); else s.removeAttribute("inert");
    });

    progBtns.forEach((b, k) => b.classList.toggle("done", k <= i));

    paintCta();
    skip.classList.toggle("hide", i === N - 1);
    obback.classList.toggle("hide", i === 0);

    /* Sur le dernier écran, le bouton principal ne doit pas concurrencer
       « Coller mon premier lien » : il n'apparaît qu'une fois le lien gardé. */
    const soloAction = (i === N - 1 && !pasted && mode !== "settings");
    cta.style.display = soloAction ? "none" : "";
    cta.classList.toggle("celebrate", i === N - 1 && pasted);
    later.classList.toggle("on", soloAction);

    live.textContent = "Étape " + (i + 1) + " sur " + N + " : " + STEPS[i];
  }

  function go(n){
    const prev = demoFor(i);
    if (prev && prev.isDone()) done.add(i);
    enterDemo.stop();
    sortDemo.stop();
    i = Math.max(0, Math.min(N - 1, n));
    seen = Math.max(seen, i);
    render();
    const d = demoFor(i);
    if (d) d.start(done.has(i));
    const s = screens[i];
    if (s) s.focus({ preventScroll:true });
  }

  /* POINT 1 — LE SEUL CHEMIN VERS L'AVANT. Le bouton, le glissé du pouce, la
     flèche du clavier et le tap sur la maquette entrent tous ici : tant qu'il
     reste un temps à jouer sur l'écran courant, on joue ce temps ; sinon on
     change d'écran. Aucun geste ne peut donc sauter une sous-étape — c'était
     le défaut du glissé, qui appelait go(i+1) directement. */
  function forward(){
    if (i === N - 1){ finishFromCta(); return; }
    if (stepping()){ demoFor(i).advance(); return; }
    go(i + 1);
  }
  function back(){ if (i > 0) go(i - 1); }

  cta.addEventListener("click", forward);
  later.addEventListener("click", () => close("done"));   /* le lien viendra plus tard, l'onboarding est vu */
  skip.addEventListener("click", () => close("skipped"));
  obback.addEventListener("click", back);
  /* Une pastille ne peut pas servir de raccourci vers un écran jamais atteint :
     ce serait la même fuite que l'ancien glissé. Elle ne fait que revenir. */
  progBtns.forEach(b => b.addEventListener("click", () => {
    const n = +b.dataset.d;
    if (n <= seen) go(n);
  }));

  /* POINT 5 — DEUX FINS, UN SEUL CHEMIN. « done » = l'onboarding a été mené au
     bout (l'hôte marque « vu » et emmène sur Ma pile) ; « skipped » = passé ;
     « closed » = refermé depuis les Réglages, où il n'y a rien à conclure. */
  function close(reason){
    enterDemo.stop();
    sortDemo.stop();
    ob.classList.add("gone");
    finish(reason || "closed", { url: firstUrl, platform: plat, mode:mode });
  }
  function finishFromCta(){ close(mode === "settings" ? "closed" : "done"); }

  /* swipe — avec contrôle d'intention verticale */
  let sx = 0, sy = 0;
  const view = root.querySelector(".ob-view");
  view.addEventListener("touchstart", e => {
    sx = e.changedTouches[0].screenX; sy = e.changedTouches[0].screenY;
  }, { passive:true });
  view.addEventListener("touchend", e => {
    const dx = e.changedTouches[0].screenX - sx;
    const dy = e.changedTouches[0].screenY - sy;
    if (Math.abs(dx) < 50 || Math.abs(dy) > Math.abs(dx)) return;
    if (dx < 0) forward();          /* même porte que « Suivant » */
    else back();
  }, { passive:true });

  /* clavier — handler nommé : il vit sur window, donc il doit pouvoir mourir */
  function onKey(e){
    if (ob.classList.contains("gone")) return;
    if (e.target && /INPUT|TEXTAREA/.test(e.target.tagName)) return;
    if (e.key === "ArrowRight") forward();
    if (e.key === "ArrowLeft")  back();
    if (e.key === "Escape" && mode === "settings") close("closed");
  }
  window.addEventListener("keydown", onKey);


  paintPlatform();
  go(0);

  return {
    /* Tout ce qui a été posé hors du shadow root doit être repris ici, sinon
       une relecture depuis les Réglages empile les écouteurs de clavier. */
    destroy(){ window.removeEventListener("keydown", onKey); }
  };
  }

  const api = { open, close, shouldShow, markSeen, VERSION };
  global.SableOnboarding = api;
})(window);
