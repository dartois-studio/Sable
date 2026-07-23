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
   v2.16 — sélection : plus de décalage vertical à l'entrée (la barre de sélection recouvre le fil d'Ariane, la recherche reste en place) ; case à cocher en gouttière au lieu de recouvrir le contenu (liste & grandes cartes), pastille en coin en galerie */
const APP_VERSION="v2.16";
{const _v=document.getElementById("appVer");if(_v)_v.textContent=APP_VERSION;}
/* Icônes : sprite unique icons.svg (voir ce fichier). icon('trash') renvoie le
   markup <use> ; la taille/couleur restent pilotées par le CSS selon le contexte. */
function icon(name,cls){return '<svg class="ic'+(cls?' '+cls:'')+'" aria-hidden="true"><use href="icons.svg#'+name+'"/></svg>';}
const KEY_ITEMS="brain:v1:items";
const KEY_BATCH="brain:v1:batch";
const KEY_SETTINGS="brain:v1:settings";
const DEFAULT_SETTINGS={startTab:"surface",theme:"auto",batchSize:5,lastTab:"surface",density:"compacte",iconRecents:[],pileView:"feed",lastView:"feed",anim:"sheen",catPins:[],catIcons:{},cats:[]};
let settings={...DEFAULT_SETTINGS};
const BATCH_SIZE=()=>settings.batchSize;
const KEY_THEME="brain:v1:theme";
const KEY_MEDIA="brain:v1:media:";
const MEDIA_MAX=4800000;

let items=[];
let batch={date:"",ids:[],idx:0};
let pileLoc=null;      /* null = accueil de Ma pile ; sinon "all"|"none"|"archived"|"trashed"|nom de domaine */
let pileQuery="";
let catEditMode=false;
let typeFilter="all";
let sourceFilter="all";
let sortMode="recent";
let tagFilter="";
let selMode=false;const selIds=new Set();   /* sélection par lot dans Ma pile */
let pileView="feed";
let lastTrashed=null;

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
function hasTag(it,t){return (it.tags||[]).some(x=>tagKey(x)===tagKey(t));}
function fmtDay(ts){try{return new Date(ts).toLocaleDateString("fr-FR",{day:"numeric",month:"long",year:"numeric"});}catch(e){return"";}}
function toDateInput(ts){const d=new Date(ts);return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");}
/* badges de liste : les tags et la date de remontee, s'il y en a */
function tagMinis(it){return (it.tags||[]).map(t=>`<span class="mini tag">#${esc(t)}</span>`).join("");}
function whenMini(it){return it.surfaceAfter?`<span class="mini when">pas avant le ${esc(fmtDay(it.surfaceAfter))}</span>`:"";}
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
function normalizeItem(it){if(!Array.isArray(it.tags))it.tags=[];it.tags=it.tags.map(normTag).filter(Boolean);if(it.surfaceAfter===undefined)it.surfaceAfter=null;if(!it.type)it.type=it.url?detectType(it.url).type:"note";if(it.hasMedia===undefined)it.hasMedia=false;if(it.title===undefined)it.title=null;if(it.title)it.title=decodeEnt(it.title);if(it.preview===undefined)it.preview=null;if(it.note===undefined)it.note="";if(!Array.isArray(it.previews))it.previews=[];if(it.iconTint===undefined)it.iconTint="ocre";if(it.preview&&isIcon(it.preview))it.preview=iconBase(it.preview);it.previews=it.previews.map(u=>u&&isIcon(u)?iconBase(u):u);return it;}
function slotIntoBatch(it){if(batch.date===todayStr()&&!batch.ids.includes(it.id)){batch.ids.splice(batch.idx,0,it.id);saveBatch();}}
async function getMedia(id){if(id in mediaCache)return mediaCache[id];try{const r=await window.storage.get(KEY_MEDIA+id);mediaCache[id]=r&&r.value?r.value:null;}catch(e){mediaCache[id]=null;}return mediaCache[id];}
async function setMedia(id,data){try{const ok=await window.storage.set(KEY_MEDIA+id,data);mediaCache[id]=data;return !!ok;}catch(e){console.error(e);return false;}}
function fileToDataUrl(file){return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=()=>rej(new Error("read"));r.readAsDataURL(file);});}
function fileToImage(file,maxDim,q){return new Promise((res,rej)=>{const url=URL.createObjectURL(file);const img=new Image();img.onload=()=>{let w=img.naturalWidth,h=img.naturalHeight;const s=Math.min(1,maxDim/Math.max(w,h));w=Math.round(w*s);h=Math.round(h*s);const c=document.createElement("canvas");c.width=w;c.height=h;c.getContext("2d").drawImage(img,0,0,w,h);URL.revokeObjectURL(url);try{res(c.toDataURL("image/jpeg",q));}catch(e){rej(e);}};img.onerror=()=>{URL.revokeObjectURL(url);rej(new Error("img"));};img.src=url;});}

/* ---------- resurfacing algorithm: variety across domains + unclassified ---------- */
function buildBatch(){
  const active=items.filter(i=>i.status==="active");
  const groups={};
  for(const it of active){(groups[it.domain||"__none__"]??=[]).push(it);}
  for(const k in groups){
    groups[k].sort((a,b)=>(a.lastSurfaced||0)-(b.lastSurfaced||0)); // least-recently-seen first
    // light randomness within the top of each group
    const top=groups[k].splice(0,Math.min(4,groups[k].length));
    groups[k]=shuffle(top).concat(groups[k]);
  }
  const keys=shuffle(Object.keys(groups));
  const out=[];let progress=true;
  while(progress&&out.length<BATCH_SIZE()){
    progress=false;
    for(const k of keys){if(groups[k].length){out.push(groups[k].shift());progress=true;if(out.length>=BATCH_SIZE())break;}}
  }
  batch={date:todayStr(),ids:out.map(i=>i.id),idx:0};
  saveBatch();
}
function ensureBatch(){
  const active=items.filter(i=>i.status==="active");
  if(batch.date!==todayStr()||(batch.ids.length===0&&active.length>0)){buildBatch();}
}
function currentCardId(){
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
  let title=null;
  if(meta&&meta.title){const t=String(meta.title).trim();if(t&&t!==v)title=t;}
  const it=normalizeItem({id:uid(),type:d.type,mime:"",hasMedia:false,content:v,url:d.url,domain:null,title,preview:null,
    createdAt:Date.now(),lastSurfaced:null,surfaceCount:0,status:"active"});
  items.unshift(it);slotIntoBatch(it);
  await saveItems();renderAll();
  savedFeedback();
  toast(d.type==="youtube"?"Grain YouTube gardé.":"Grain gardé.",{label:"annoter",fn:()=>openGrainSheet(it.id)});
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
    toast("Export téléchargé ("+items.length+" grains).");
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
    toast(added+" grain"+(added>1?"s":"")+" importé"+(added>1?"s":"")+".");
  }catch(e){toast("Import impossible (fichier illisible).");}
}
async function markSurfaced(id){
  const it=items.find(i=>i.id===id);if(it){it.lastSurfaced=Date.now();it.surfaceCount++;}
}
async function keepCard(id){await markSurfaced(id);advance();await saveItems();renderStage();updateCounts();haptic(14);toast("Gardé en pile.");}
async function archiveCard(id){const it=items.find(i=>i.id===id);if(it)it.status="archived";advance();await saveItems();renderAll();toast("Mis de côté.");}
async function trashCard(id){const it=items.find(i=>i.id===id);if(it){it.status="trashed";lastTrashed=id;}advance();await saveItems();renderAll();toast("Jeté.",true);}
async function classifyCard(id,dom){const it=items.find(i=>i.id===id);if(it){it.domain=dom;await markSurfaced(id);}advance();await saveItems();renderAll();toast("Classé dans “"+dom+"”.");}
function advance(){batch.idx++;saveBatch();}

async function undoTrash(){if(!lastTrashed)return;const it=items.find(i=>i.id===lastTrashed);if(it)it.status="active";lastTrashed=null;await saveItems();renderAll();}
async function deleteRow(id){const it=items.find(i=>i.id===id);if(it){it.status="trashed";lastTrashed=id;}await saveItems();renderAll();toast("Jeté.",true);}
async function restoreRow(id){const it=items.find(i=>i.id===id);if(it)it.status="active";await saveItems();renderAll();toast("Remis en pile.");}
async function purgeRow(id){
  if(!confirm("Supprimer définitivement ce grain ? C'est irréversible."))return;
  const it=items.find(i=>i.id===id);
  if(it&&it.hasMedia){try{await setMedia(id,null);}catch(e){}}
  items=items.filter(i=>i.id!==id);
  await saveItems();renderAll();toast("Supprimé définitivement.");
}
async function emptyTrash(){
  const trashed=items.filter(i=>i.status==="trashed");
  if(!trashed.length){toast("La corbeille est déjà vide.");return;}
  if(!confirm("Vider la corbeille ? "+trashed.length+" grain(s) supprimés définitivement."))return;
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
function rowThumb(it){
  if(it.preview)return `<img class="thumb${isIcon(it.preview)?' iconcov':''}" src="${esc(coverSrc(it))}" alt="" loading="lazy">`;
  if(it.type==="image")return it.hasMedia?`<div class="thumb-ic" data-media="${it.id}" data-kind="image" data-thumb="1">•</div>`:`<img class="thumb" src="${esc(it.url)}" alt="" loading="lazy">`;
  if(it.type==="youtube"){const yid=ytId(it.url);return yid?`<img class="thumb" src="https://img.youtube.com/vi/${yid}/default.jpg" alt="" loading="lazy">`:"";}
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

function renderStage(){
  ensureBatch();
  const stage=document.getElementById("stage");
  const active=items.filter(i=>i.status==="active");
  if(active.length===0){
    stage.innerHTML=`<div class="rest"><div class="big">Ta pile est vide</div>
      <div class="sub">Colle ton premier lien, ta première idée ou ta typo là-haut. Elle te reviendra toute seule.</div></div>`;
    return;
  }
  const id=currentCardId();
  if(!id){
    stage.innerHTML=`<div class="rest"><div class="big">C’est fait pour aujourd’hui</div>
      <div class="sub">Tu as passé en revue ta sélection du jour. Reviens demain, ou fais remonter un truc au hasard maintenant.</div>
      <button class="pull" id="pullNow">Faire remonter une carte</button></div>`;
    document.getElementById("pullNow").onclick=pullExtra;
    return;
  }
  const it=items.find(i=>i.id===id);
  const domBadge=it.domain?`<span class="badge">${esc(it.domain)}</span>`:`<span class="badge none">non classé</span>`;
  const seen=it.surfaceCount>0?`<span class="badge time">déjà remonté ${it.surfaceCount}×</span>`:"";
  const pips=batch.ids.map((_,i)=>`<span class="pip ${i<batch.idx?'done':i===batch.idx?'now':''}"></span>`).join("");
  stage.innerHTML=`
    <div class="card">
      <button class="card-edit" data-a="edit" aria-label="Voir / modifier ce grain" title="Voir / modifier">${icon('pencil')}</button>
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
      <div class="progress">${pips}</div>
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

function pullExtra(){
  const active=items.filter(i=>i.status==="active"&&!batch.ids.slice(0,batch.idx).includes(i.id));
  const pool=active.filter(i=>i.id!==currentCardId());
  if(pool.length===0){toast("Rien d’autre à faire remonter.");return;}
  const pick=pool[Math.floor(Math.random()*pool.length)];
  batch.ids.splice(batch.idx,0,pick.id);saveBatch();renderStage();
}

/* ---------- Ma pile : accueil (grille de domaines) + collections ---------- */
const TYPE_FILTERS=[["all","Tous"],["note","Notes"],["link","Liens"],["youtube","YouTube"],["media","Photos & médias"]];
const SORTS=[["recent","Ajouts récents d’abord"],["oldest","Plus anciens d’abord"],["forgotten","Les plus oubliés d’abord"]];
function typeMatch(it){if(typeFilter==="all")return true;if(typeFilter==="media")return isMediaType(it.type);return it.type===typeFilter;}
function domCounts(){const c={};for(const i of items){if(i.status==="active"&&i.domain)c[i.domain]=(c[i.domain]||0)+1;}return c;}
function coverFor(list){
  const cand=list.find(i=>i.preview||i.type==="youtube"||i.type==="image")||list[0];
  return cand?galleryThumb(cand):ICON_NOTE;
}
function collectionName(f){return f==="all"?"Toute la pile":f==="none"?"Non classés":f==="archived"?"Mis de côté":f==="trashed"?"Corbeille":f;}
const pinSvg=icon('pin');
function catIconCover(name){const m=(settings.catIcons||{})[name];if(!m||!m.base)return null;return `<img class="iconcov" src="${esc(iconUrl(m.base,m.tint||'ocre'))}" alt="">`;}
function renderRoot(){
  const grid=document.getElementById("domGrid");
  const counts=domCounts();
  const active=items.filter(i=>i.status==="active");
  const none=active.filter(i=>!i.domain);
  const pins=settings.catPins||[];
  const doms=allCats().sort((a,b)=>{const pa=pins.includes(a),pb=pins.includes(b);if(pa!==pb)return pa?-1:1;return (counts[b]||0)-(counts[a]||0)||a.localeCompare(b,"fr");});
  const card=(name,f,l,pin)=>`<button class="dcard${catEditMode?' editing':''}" data-f="${esc(f)}" data-name="${esc(name)}">${catEditMode&&f!=="none"?`<span class="dedit">${pencilSvg}</span>`:""}${pin?`<span class="dpin">${pinSvg}</span>`:""}<div class="dcover">${f==="none"?coverFor(l):(catIconCover(name)||coverFor(l))}</div><div class="dbody"><span class="dname">${esc(name)}</span><span class="dcount">${l.length}</span></div></button>`;
  let html="";
  if(catEditMode)html+=`<div class="cathint">Touchez une catégorie pour la renommer, fusionner, épingler, lui donner une icône ou la supprimer.</div>`;
  html+=`<button class="dcard addcard" data-add="1"><div class="dcover addcov">+</div><div class="dbody"><span class="dname">Nouvelle catégorie</span></div></button>`;
  if(none.length)html+=card("Non classés","none",none,false);
  html+=doms.map(d=>card(d,d,active.filter(i=>i.domain===d),pins.includes(d))).join("");
  grid.innerHTML=html;
  grid.querySelectorAll(".dcard").forEach(b=>b.onclick=()=>{
    if(b.dataset.add){addCatPrompt();return;}
    if(catEditMode&&b.dataset.f!=="none")openCatManageSheet(b.dataset.name);
    else enterCollection(b.dataset.f);
  });
  document.getElementById("archN").textContent=items.filter(i=>i.status==="archived").length;
  document.getElementById("trashN").textContent=items.filter(i=>i.status==="trashed").length;
  const ce=document.getElementById("catEdit");if(ce)ce.textContent=catEditMode?"Terminé":"Éditer";
  hydrateMedia(grid);
}
const pencilSvg=icon('pencil');
function addCatPrompt(){
  const n=(prompt("Nom de la nouvelle catégorie :")||"").trim();
  if(!n)return;
  settings.cats=settings.cats||[];
  if(!settings.cats.includes(n)&&!domains().includes(n))settings.cats.push(n);
  saveSettings();renderRoot();toast("Catégorie « "+n+" » créée.");
}
function enterCollection(f){catEditMode=false;pileLoc=f;typeFilter="all";sourceFilter="all";tagFilter="";pileQuery="";const p=document.getElementById("pileSearch");if(p)p.value="";const s=document.getElementById("searchInput");if(s)s.value="";selectTab("pile");}
function renderCategories(){renderRootSearch();renderRoot();}
async function renameCat(oldN,newN){
  items.forEach(i=>{if(i.domain===oldN)i.domain=newN;});
  const p=settings.catPins||[];const idx=p.indexOf(oldN);if(idx>-1)p[idx]=newN;settings.catPins=p;
  settings.cats=[...new Set((settings.cats||[]).map(c=>c===oldN?newN:c))];
  if(settings.catIcons&&settings.catIcons[oldN]){settings.catIcons[newN]=settings.catIcons[oldN];delete settings.catIcons[oldN];}
  saveSettings();await saveItems();renderAll();toast("Catégorie renommée.");
}
async function mergeCat(src,dst){
  items.forEach(i=>{if(i.domain===src)i.domain=dst;});
  settings.catPins=(settings.catPins||[]).filter(x=>x!==src);
  settings.cats=(settings.cats||[]).filter(x=>x!==src);
  if(settings.catIcons)delete settings.catIcons[src];
  saveSettings();await saveItems();renderAll();toast("Fusionné dans « "+dst+" ».");
}
async function deleteCat(name){
  items.forEach(i=>{if(i.domain===name)i.domain=null;});
  settings.catPins=(settings.catPins||[]).filter(x=>x!==name);
  settings.cats=(settings.cats||[]).filter(x=>x!==name);
  if(settings.catIcons)delete settings.catIcons[name];
  saveSettings();await saveItems();renderAll();toast("Catégorie supprimée.");
}
function togglePin(name){const p=settings.catPins||[];const i=p.indexOf(name);if(i>-1)p.splice(i,1);else p.unshift(name);settings.catPins=p;saveSettings();renderCategories();}
function setCatIcon(name,base,tint){settings.catIcons=settings.catIcons||{};settings.catIcons[name]={base:iconBase(base),tint:tint||"ocre"};saveSettings();renderCategories();}
function openCatManageSheet(name){
  document.getElementById("sheetTitle").textContent="Catégorie · "+name;
  const list=document.getElementById("sheetList");
  const pinned=(settings.catPins||[]).includes(name);
  const others=Object.keys(domCounts()).filter(d=>d!==name);
  const hasIcon=!!((settings.catIcons||{})[name]&&settings.catIcons[name].base);
  const merge=others.length?`<div class="ssec">Fusionner dans…</div><div class="schips">`+others.map(d=>`<button class="chip" data-merge="${esc(d)}">${esc(d)}</button>`).join("")+`</div>`:"";
  list.innerHTML=
    `<button class="srow" data-act="rename"><span>Renommer</span></button>`+
    `<button class="srow" data-act="pin"><span>${pinned?"Désépingler":"Épingler en tête"}</span></button>`+
    `<button class="srow" data-act="icon"><span>${hasIcon?"Changer l'icône":"Choisir une icône"}</span></button>`+
    (hasIcon?`<button class="srow" data-act="unicon"><span>Retirer l'icône</span></button>`:"")+
    merge+
    `<button class="srow danger" data-act="delete"><span>Supprimer la catégorie</span></button>`+
    `<div id="catIconPick"></div>`;
  list.querySelector('[data-act="rename"]').onclick=()=>{const nn=(prompt("Nouveau nom de la catégorie :",name)||"").trim();if(nn&&nn!==name){renameCat(name,nn);closeSheet();}};
  list.querySelector('[data-act="pin"]').onclick=()=>{togglePin(name);closeSheet();};
  list.querySelector('[data-act="icon"]').onclick=()=>{editTint="ocre";openIconSearch(document.getElementById("catIconPick"),(base)=>{setCatIcon(name,base,editTint);closeSheet();});};
  const un=list.querySelector('[data-act="unicon"]');if(un)un.onclick=()=>{if(settings.catIcons)delete settings.catIcons[name];saveSettings();renderCategories();closeSheet();};
  list.querySelectorAll("[data-merge]").forEach(b=>b.onclick=()=>{mergeCat(name,b.dataset.merge);closeSheet();});
  list.querySelector('[data-act="delete"]').onclick=()=>{if(confirm("Supprimer la catégorie « "+name+" » ? Ses grains repasseront en « Non classé » (ils ne sont pas supprimés)."))  {deleteCat(name);closeSheet();}};
  showSheet();
}
function renderTypeChips(){
  const el=document.getElementById("typeChips");
  el.innerHTML=TYPE_FILTERS.map(([k,l])=>`<button class="chip ${typeFilter===k?'active':''}" data-t="${k}">${l}</button>`).join("");
  el.querySelectorAll(".chip").forEach(b=>b.onclick=()=>{typeFilter=b.dataset.t;renderPileTab();});
}
function renderPileTab(){
  const isAll=(pileLoc===null||pileLoc==="all");
  document.getElementById("crumbBack").hidden=isAll&&!tagFilter;
  document.getElementById("crumbCur").textContent=tagFilter?("#"+tagFilter):(isAll?"Toute la pile":collectionName(pileLoc));
  const fb=document.getElementById("filterBtn"); if(fb)fb.classList.toggle("on",typeFilter!=="all"||sourceFilter!=="all");
  const sb=document.getElementById("selBtn"); if(sb)sb.hidden=(pileLoc==="trashed");
  const ps=document.getElementById("pileSearch"); if(ps&&ps.value!==pileQuery)ps.value=pileQuery;
  renderList();
  updateSelUI();
  renderNudge();
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
function enterTag(t){catEditMode=false;pileLoc="all";typeFilter="all";sourceFilter="all";pileQuery="";tagFilter=normTag(t);const p=document.getElementById("pileSearch");if(p)p.value="";const s=document.getElementById("searchInput");if(s)s.value="";selectTab("pile");}
function renderRootSearch(){
  const raw=document.getElementById("searchInput").value.trim();
  const res=document.getElementById("rootResults"),browse=document.getElementById("rootBrowse");
  if(!raw){res.hidden=true;browse.hidden=false;res.innerHTML="";_sLastQ="";return;}
  if(raw!==_sLastQ){_sExpC=false;_sExpT=false;_sLastQ=raw;}
  browse.hidden=true;res.hidden=false;
  res.className="dens-"+(settings.density||"compacte");
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
    html+=`<div class="sec"><div class="sechead"><span class="lbl">Grains</span><span class="n">${grains.length}</span></div>`+grains.map(rowHTML).join("")+`</div>`;
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
  const q=(pileQuery||"").trim().toLowerCase();
  if(q)rows=rows.filter(i=>(displayText(i)||"").toLowerCase().includes(q)||(i.content||"").toLowerCase().includes(q)||(i.domain||"").toLowerCase().includes(q)||(i.note||"").toLowerCase().includes(q)||(i.tags||[]).some(t=>tagKey(t).includes(tagKey(q))));
  if(sortMode==="recent")rows.sort((a,b)=>b.createdAt-a.createdAt);
  else if(sortMode==="oldest")rows.sort((a,b)=>a.createdAt-b.createdAt);
  else if(sortMode==="forgotten")rows.sort((a,b)=>(a.surfaceCount-b.surfaceCount)||((a.lastSurfaced||0)-(b.lastSurfaced||0))||(a.createdAt-b.createdAt));
  return rows;
}
const restoreSvg=icon('restore');
const trashSvg=icon('trash');
function gcardHTML(it){
  const arch=it.status==="archived";
  const t=esc(displayText(it));
  const titleEl=it.url?`<a class="gtitle" href="${esc(it.url)}" target="_blank" rel="noopener">${t}</a>`:`<div class="gtitle">${t}</div>`;
  const dom=it.domain?`<span class="mini">${esc(it.domain)}</span>`:`<span class="mini none">non classé</span>`;
  const del=`<button class="gdel" title="${arch?'Remettre':'Jeter'}" data-${arch?'restore':'del'}="${it.id}">${arch?restoreSvg:trashSvg}</button>`;
  return `<div class="gcard" data-id="${it.id}"><div class="gmedia">${galleryThumb(it)}</div>${del}<div class="gbody">${titleEl}<div class="gsub"><span class="mini">${typeLabel(it)}</span>${dom}${tagMinis(it)}${whenMini(it)}</div>${it.note?`<div class="gnote">${esc(it.note)}</div>`:""}</div></div>`;
}
function rowHTML(it){
  const arch=it.status==="archived";
  const body=(it.type==="youtube"||it.type==="link")?`<a href="${esc(it.url)}" target="_blank" rel="noopener">${esc(displayText(it))}</a>`:isMediaType(it.type)?esc(it.hasMedia?it.content:displayText(it)):esc(it.content);
  const thumb=rowThumb(it);
  const dom=it.domain?`<span class="mini">${esc(it.domain)}</span>`:`<span class="mini none">non classé</span>`;
  const act=it.status==="trashed"
    ? `<button class="rowbtn" title="Restaurer" data-restore="${it.id}">${restoreSvg}</button><button class="rowbtn purge" title="Supprimer définitivement" data-purge="${it.id}">${trashSvg}</button>`
    : `<button class="rowbtn" title="${arch?'Remettre en pile':'Jeter'}" data-${arch?'restore':'del'}="${it.id}">${arch?restoreSvg:trashSvg}</button>`;
  return `<div class="row" data-id="${it.id}">${thumb}<div class="body"><div class="txt ${arch?'arch':''}">${body}</div>
  <div class="sub"><span class="mini">${typeLabel(it)}</span>${dom}${tagMinis(it)}${whenMini(it)}<span>gardé ${ago(it.createdAt)}</span>${it.surfaceCount?`<span>revu ${it.surfaceCount}×</span>`:""}</div>${it.note?`<div class="rownote">${esc(it.note)}</div>`:""}</div>${act}</div>`;
}
function feedMedia(it){
  if(it.preview)return `<div class="fmedia"><img class="zoomable${isIcon(it.preview)?' iconcov':''}" data-full="${esc(coverSrc(it))}" src="${esc(coverSrc(it))}" alt="" loading="lazy"></div>`;
  if(it.type==="image"&&it.hasMedia)return `<div class="fmedia"><div class="ph" data-media="${it.id}" data-kind="image">chargement…</div></div>`;
  if(it.type==="image"&&it.url)return `<div class="fmedia"><img class="zoomable" data-full="${esc(it.url)}" src="${esc(it.url)}" alt="" loading="lazy"></div>`;
  return "";
}
function feedHTML(it){
  const arch=it.status==="archived";
  const media=feedMedia(it);
  const t=esc(displayText(it));
  const titleEl=it.url?`<a class="ftitle" href="${esc(it.url)}" target="_blank" rel="noopener">${t}</a>`:`<div class="ftitle">${t}</div>`;
  const dom=it.domain?`<span class="mini">${esc(it.domain)}</span>`:`<span class="mini none">non classé</span>`;
  const del=`<button class="rowbtn fdel" title="${arch?'Remettre':'Jeter'}" data-${arch?'restore':'del'}="${it.id}">${arch?restoreSvg:trashSvg}</button>`;
  return `<div class="fcard ${arch?'arch':''}" data-id="${it.id}">${media}<div class="fbody"><div class="ftop">${titleEl}${del}</div><div class="fsub"><span class="mini">${typeLabel(it)}</span>${dom}${tagMinis(it)}${whenMini(it)}<span>gardé ${ago(it.createdAt)}</span>${it.surfaceCount?`<span>revu ${it.surfaceCount}×</span>`:""}</div>${it.note?`<div class="rownote">${esc(it.note)}</div>`:""}</div></div>`;
}
/* ---------- zoom plein écran (lightbox) ---------- */
function openLightbox(src){
  if(!src)return;
  const lb=document.getElementById("lightbox");
  lb.innerHTML=`<button class="lb-x" aria-label="Fermer">✕</button><img src="${esc(src)}" alt="">`;
  lb.hidden=false;
  lb.onclick=()=>closeLightbox();
}
function closeLightbox(){const lb=document.getElementById("lightbox");lb.hidden=true;lb.innerHTML="";}
function wireRowButtons(scope){
  scope.querySelectorAll("[data-del]").forEach(b=>b.onclick=()=>deleteRow(b.dataset.del));
  scope.querySelectorAll("[data-restore]").forEach(b=>b.onclick=()=>restoreRow(b.dataset.restore));
  scope.querySelectorAll("[data-purge]").forEach(b=>b.onclick=e=>{e.stopPropagation();purgeRow(b.dataset.purge);});
  scope.querySelectorAll(".row,.gcard,.fcard").forEach(el=>el.addEventListener("click",e=>{
    if(e.target.closest("a,button")||e.target.closest(".zoomable"))return;
    const id=el.getAttribute("data-id");if(id)openGrainSheet(id);
  }));
}
function renderList(){
  const list=document.getElementById("pileList");
  const rows=collectionRows();
  const cnt=document.getElementById("crumbCnt");if(cnt)cnt.textContent=rows.length;
  const trashHdr=(pileLoc==="trashed")?`<button class="emptytrash" id="emptyTrashBtn">Vider la corbeille</button>`:"";
  if(rows.length===0){list.className="";list.innerHTML=trashHdr+`<div class="empty-list">${pileLoc==="trashed"?"La corbeille est vide.":"Rien ici pour l’instant."}</div>`;}
  else{
    const trash=(pileLoc==="trashed");
    list.className=(!trash&&pileView==="grid")?"gallery":(!trash&&pileView==="feed")?"feed":("dens-"+(settings.density||"compacte"));
    const body=(!trash&&pileView==="grid")?rows.map(gcardHTML).join(""):(!trash&&pileView==="feed")?rows.map(feedHTML).join(""):rows.map(rowHTML).join("");
    list.innerHTML=trashHdr+body;
    wireRowButtons(list);
    hydrateMedia(list);
    if(selMode)decorateSel(list);
  }
  const e=document.getElementById("emptyTrashBtn");if(e)e.onclick=emptyTrash;
}
/* ---------- sélection & actions par lot ---------- */
const selCheckSvg=icon('check');
function decorateSel(list){
  const grid=(pileView==="grid");
  list.querySelectorAll("[data-id]").forEach(el=>{
    const on=selIds.has(el.getAttribute("data-id"));
    if(on)el.classList.add("sel");
    const c=document.createElement("span");c.className="rcheck"+(on?" on":"");c.innerHTML=selCheckSvg;
    if(grid){el.classList.add("selgrid");el.appendChild(c);}
    else{const w=document.createElement("div");w.className="selwrap";el.parentNode.insertBefore(w,el);w.appendChild(c);w.appendChild(el);}
  });
}
function updateSelUI(){
  document.body.classList.toggle("selecting",selMode);
  document.body.classList.toggle("hasSel",selMode&&selIds.size>0);
  if(!selMode)return;
  const n=selIds.size,rows=collectionRows();
  const sn=document.getElementById("selN");if(sn)sn.textContent=n+" sélectionné"+(n>1?"s":"");
  const sa=document.getElementById("selAll");if(sa)sa.textContent=(n>0&&n===rows.length)?"Aucun":"Tout";
}
function enterSel(){selMode=true;selIds.clear();renderPileTab();}
function exitSel(){selMode=false;selIds.clear();renderPileTab();}
function toggleSel(id){selIds.has(id)?selIds.delete(id):selIds.add(id);renderList();updateSelUI();}
function renderNudge(){
  const mount=document.getElementById("pileNudge");if(!mount)return;
  if(pileLoc!=="none"&&pileLoc!=="all"&&pileLoc!==null){mount.innerHTML="";return;}
  const c={};collectionRows().forEach(it=>{if(it.domain)return;const s=sourceOf(it);if(s)c[s]=(c[s]||0)+1;});
  let top=null;for(const k in c)if(!top||c[k]>c[top])top=k;
  if(!top||c[top]<4){mount.innerHTML="";return;}
  mount.innerHTML=`<button class="srcnudge" id="srcNudge"><span class="sn-ic">${icon('grid')}</span><span class="sn-tx"><b>${c[top]} grains viennent de ${esc(top)}</b><span>Les sélectionner et leur donner une catégorie</span></span><span class="sn-go">→</span></button>`;
  document.getElementById("srcNudge").onclick=()=>{
    selMode=true;selIds.clear();
    collectionRows().forEach(it=>{if(!it.domain&&sourceOf(it)===top)selIds.add(it.id);});
    renderPileTab();openBatchCatSheet();
  };
}
function openBatchCatSheet(){
  if(!selIds.size)return;
  const n=selIds.size;
  document.getElementById("sheetTitle").textContent="Classer "+n+" grain"+(n>1?"s":"");
  const list=document.getElementById("sheetList");
  list.innerHTML=`<div class="picklist"><input id="bCatQ" placeholder="Chercher ou créer une catégorie…" autocomplete="off"><div class="pickscroll" id="bCatRes"></div></div>`;
  const q=list.querySelector("#bCatQ"),res=list.querySelector("#bCatRes"),counts=domCounts();
  const draw=()=>{
    const v=q.value.trim(),k=tagKey(v);
    const hits=allCats().filter(d=>!k||tagKey(d).includes(k)).sort((a,b)=>(counts[b]||0)-(counts[a]||0)||a.localeCompare(b,"fr"));
    const exact=hits.some(d=>tagKey(d)===k);
    res.innerHTML=hits.map(d=>`<button class="pickrow" data-d="${esc(d)}"><span>${esc(d)}</span><span class="n">${counts[d]||0}</span></button>`).join("")
      +(v&&!exact?`<button class="pickrow new" data-new="1"><span>Créer « ${esc(v)} »</span><span class="n">+</span></button>`:"");
    res.querySelectorAll("[data-d]").forEach(b=>b.onclick=()=>applyBatchCat(b.dataset.d));
    const nb=res.querySelector("[data-new]");if(nb)nb.onclick=()=>applyBatchCat(v);
  };
  q.addEventListener("input",draw);draw();showSheet();
}
async function applyBatchCat(cat){
  cat=(cat||"").trim();if(!cat)return;
  if(!domains().includes(cat)){settings.cats=settings.cats||[];if(!settings.cats.includes(cat)){settings.cats.push(cat);saveSettings();}}
  const n=selIds.size;items.forEach(it=>{if(selIds.has(it.id))it.domain=cat;});
  await saveItems();closeSheet(true);exitSel();renderAll();
  toast(n+" grain"+(n>1?"s":"")+" classé"+(n>1?"s":"")+" dans « "+cat+" »");
}
function openBatchTagSheet(){
  if(!selIds.size)return;
  const n=selIds.size;let picked=[];
  document.getElementById("sheetTitle").textContent="Taguer "+n+" grain"+(n>1?"s":"");
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
    toast(picked.length+" tag"+(picked.length>1?"s":"")+" ajouté"+(picked.length>1?"s":"")+" à "+n2+" grain"+(n2>1?"s":""));
  };
  drawSug();drawPicked();showSheet();
}
/* ---------- panneau bas : tri & réglages ---------- */
function showSheet(){document.getElementById("sheetOverlay").classList.add("open");document.getElementById("appSheet").classList.add("open");}
/* Fermer un panneau ne doit jamais faire perdre une correction : la fiche branche
   ici son enregistrement silencieux. closeSheet(true) = fermer sans repasser par lui
   (le geste a deja enregistre, ou le grain vient d'etre jete). */
let onSheetClose=null;
function closeSheet(skipSave){
  if(!skipSave&&onSheetClose){const f=onSheetClose;onSheetClose=null;f();}
  onSheetClose=null;
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
function openSortSheet(){
  document.getElementById("sheetTitle").textContent="Trier";
  const list=document.getElementById("sheetList");
  const ck=icon('check','ck');
  list.innerHTML=SORTS.map(([k,l])=>`<button class="srow ${sortMode===k?'active':''}" data-s="${k}"><span>${l}</span>${ck}</button>`).join("");
  list.querySelectorAll(".srow").forEach(b=>b.onclick=()=>{sortMode=b.dataset.s;closeSheet();renderPileTab();});
  showSheet();
}
function openAddSheet(){
  document.getElementById("sheetTitle").textContent="Ajouter";
  const list=document.getElementById("sheetList");
  list.innerHTML=`<button class="srow" data-a="photo"><span>Prendre une photo</span></button>`+
    `<button class="srow" data-a="file"><span>Joindre un fichier</span></button>`+
    `<button class="srow" data-a="paste"><span>Coller le presse-papiers</span></button>`;
  list.querySelector('[data-a="photo"]').onclick=()=>{closeSheet();document.getElementById("fPhoto").click();};
  list.querySelector('[data-a="file"]').onclick=()=>{closeSheet();document.getElementById("fFile").click();};
  list.querySelector('[data-a="paste"]').onclick=async()=>{closeSheet();try{const t=await navigator.clipboard.readText();if(t&&t.trim()){const inp=document.getElementById("captureInput");inp.value=t.trim();inp.focus();}else toast("Presse-papiers vide.");}catch(e){toast("Colle directement dans le champ.");document.getElementById("captureInput").focus();}};
  showSheet();
}
function openFilterSheet(){
  document.getElementById("sheetTitle").textContent="Filtrer";
  const list=document.getElementById("sheetList");
  const chips=(opts,cur,attr)=>`<div class="schips">`+opts.map(([k,l])=>`<button class="chip ${String(cur)===k?'active':''}" data-${attr}="${k}">${l}</button>`).join("")+`</div>`;
  const srcSet=[...new Set(items.filter(i=>i.status!=="trashed").map(sourceOf).filter(Boolean))].sort((a,b)=>a.localeCompare(b,"fr"));
  const srcOpts=[["all","Toutes"],...srcSet.map(s=>[s,s])];
  const active=(typeFilter!=="all"||sourceFilter!=="all");
  list.innerHTML=`<div class="ssec">Type de grain</div>`+chips(TYPE_FILTERS,typeFilter,"tf")
    +(srcSet.length?`<div class="ssec">Source</div>`+chips(srcOpts,sourceFilter,"sf"):"")
    +(active?`<button class="srow" data-act="reset"><span>Réinitialiser les filtres</span></button>`:"");
  list.querySelectorAll("[data-tf]").forEach(b=>b.onclick=()=>{typeFilter=b.dataset.tf;closeSheet();renderPileTab();});
  list.querySelectorAll("[data-sf]").forEach(b=>b.onclick=()=>{sourceFilter=b.dataset.sf;closeSheet();renderPileTab();});
  const rb=list.querySelector('[data-act="reset"]');if(rb)rb.onclick=()=>{typeFilter="all";sourceFilter="all";closeSheet();renderPileTab();};
  showSheet();
}
function openViewSheet(){
  document.getElementById("sheetTitle").textContent="Affichage";
  const list=document.getElementById("sheetList");
  const chips=(opts,cur,attr)=>`<div class="schips">`+opts.map(([k,l])=>`<button class="chip ${String(cur)===k?'active':''}" data-${attr}="${k}">${l}</button>`).join("")+`</div>`;
  list.innerHTML=`<div class="ssec">Trier</div>`+chips(SORTS,sortMode,"so")+
    `<div class="ssec">Vue</div>`+chips([["feed","Grandes cartes"],["grid","Galerie"],["list","Liste"]],pileView,"vw")+
    `<div class="ssec">Densité (liste)</div>`+chips([["confortable","Confortable"],["compacte","Compacte"],["dense","Dense"]],settings.density,"de");
  list.querySelectorAll("[data-so]").forEach(b=>b.onclick=()=>{sortMode=b.dataset.so;renderPileTab();openViewSheet();});
  list.querySelectorAll("[data-vw]").forEach(b=>b.onclick=()=>{pileView=b.dataset.vw;settings.lastView=pileView;saveSettings();renderList();openViewSheet();});
  list.querySelectorAll("[data-de]").forEach(b=>b.onclick=()=>{settings.density=b.dataset.de;saveSettings();renderList();openViewSheet();});
  showSheet();
}
function openSettingsSheet(){
  document.getElementById("sheetTitle").textContent="Réglages";
  const list=document.getElementById("sheetList");
  const chips=(opts,cur,attr)=>`<div class="schips">`+opts.map(([k,l])=>`<button class="chip ${String(cur)===k?'active':''}" data-${attr}="${k}">${l}</button>`).join("")+`</div>`;
  list.innerHTML=
    `<div class="ssec">Au démarrage, ouvrir</div>`+
    chips([["surface","Surface"],["pile","Pile"],["last","Le dernier onglet ouvert"]],settings.startTab,"st")+
    `<div class="ssec">Thème</div>`+
    chips([["auto","Auto (système)"],["light","Clair"],["dark","Sombre"]],settings.theme,"th")+
    `<div class="ssec">Cartes remontées par jour</div>`+
    chips([["3","3"],["5","5"],["8","8"]],settings.batchSize,"bs")+
    `<div class="ssec">Densité de la liste</div>`+
    chips([["confortable","Confortable"],["compacte","Compacte"],["dense","Dense"]],settings.density,"dn")+
    `<div class="ssec">Vue de la pile</div>`+
    chips([["feed","Grandes cartes"],["grid","Galerie"],["list","Liste"],["last","La dernière utilisée"]],settings.pileView,"pv")+
    `<div class="ssec">Animation du titre</div>`+
    chips([["sheen","Reflet"],["breathe","Respiration"],["trait","Trait"],["none","Aucune"]],settings.anim,"an")+
    `<div class="sdiv"></div><div class="ssec">Données</div>`+
    `<div class="schips"><button class="chip" id="setExport">Exporter ma pile (JSON)</button><button class="chip" id="setImport">Importer</button></div>`+
    `<div class="sdiv"></div><div class="ssec">À propos</div>`+
    `<a class="srow" href="mailto:sable@dartois.studio?subject=%5BSable-Bug%5D%20">Signaler un bug</a>`+
    `<a class="srow" href="mailto:sable@dartois.studio?subject=%5BSable-Enhancement%5D%20">Proposer une amélioration</a>`+
    `<div class="ssec" style="text-transform:none;letter-spacing:.01em;user-select:text;-webkit-user-select:text">Sable ${APP_VERSION} · sable@dartois.studio</div>`+
    `<div class="sdiv"></div><button class="srow" id="setSignout" style="color:var(--red)">Se déconnecter</button>`+
    `<div class="ssec" style="text-transform:none;letter-spacing:.01em">Réglages mémorisés sur cet appareil.</div>`;
  list.querySelectorAll("[data-st]").forEach(b=>b.onclick=()=>{settings.startTab=b.dataset.st;saveSettings();openSettingsSheet();});
  list.querySelectorAll("[data-th]").forEach(b=>b.onclick=()=>{settings.theme=b.dataset.th;applyTheme();saveSettings();openSettingsSheet();});
  list.querySelectorAll("[data-bs]").forEach(b=>b.onclick=()=>{settings.batchSize=+b.dataset.bs;saveSettings();buildBatch();renderStage();openSettingsSheet();});
  list.querySelectorAll("[data-dn]").forEach(b=>b.onclick=()=>{settings.density=b.dataset.dn;saveSettings();renderPileTab();openSettingsSheet();});
  list.querySelectorAll("[data-pv]").forEach(b=>b.onclick=()=>{settings.pileView=b.dataset.pv;saveSettings();applyPileView();renderPileTab();openSettingsSheet();});
  list.querySelectorAll("[data-an]").forEach(b=>b.onclick=()=>{settings.anim=b.dataset.an;saveSettings();applyAnim();openSettingsSheet();});
  document.getElementById("setExport").onclick=()=>{exportData();};
  document.getElementById("setImport").onclick=()=>document.getElementById("fImport").click();
  document.getElementById("setSignout").onclick=async()=>{try{await _sb.auth.signOut();}catch(e){}location.reload();};
  showSheet();
}

function updateCounts(){
  const n=items.filter(i=>i.status==="active").length;
  document.getElementById("pileCount").textContent=n;
  const ch=document.getElementById("capHint"); if(ch)ch.style.display=(n===0)?"":"none";
}
function renderAll(){updateCounts();renderStage();renderPileTab();renderCategories();uiReady=true;}

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
  document.getElementById("sheetTitle").textContent="Grain · "+typeLabel(it);

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
      m.innerHTML=`<div class="gfld" style="padding-top:10px"><label><b>Titre</b></label><input id="gTitle" value="${esc(it.title||"")}" placeholder="Titre du grain" autocomplete="off"></div>`;
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
      <div class="whensum">${when?("Ce grain ne ressortira pas avant le "+esc(fmtDay(when))+"."):"Sans date, il peut remonter n’importe quand."}</div>
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
  onSheetClose=()=>{if(dirty){commit();toast("Grain mis à jour.");}};

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
    await commit();closeSheet(true);haptic(14);toast("Grain mis à jour.");
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
document.getElementById("captureBtn").onclick=()=>{const i=document.getElementById("captureInput");addItem(i.value);i.value="";i.focus();};
document.getElementById("captureInput").addEventListener("keydown",e=>{if(e.key==="Enter"){addItem(e.target.value);e.target.value="";}});
document.getElementById("searchInput").addEventListener("input",renderRootSearch);
document.getElementById("btnAdd").onclick=openAddSheet;
document.getElementById("fPhoto").onchange=e=>{routeFile(e.target.files[0]);e.target.value="";};
document.getElementById("fFile").onchange=e=>{Array.from(e.target.files).forEach(routeFile);e.target.value="";};
document.addEventListener("paste",e=>{const cd=e.clipboardData;if(!cd)return;for(const it of cd.items){if(it.type&&it.type.startsWith("image/")){const f=it.getAsFile();if(f){e.preventDefault();addImageFile(f);return;}}}});
document.getElementById("fImport").onchange=e=>{if(e.target.files[0])importData(e.target.files[0]);e.target.value="";};
function selectTab(name){
  selMode=false;selIds.clear();document.body.classList.remove("selecting","hasSel");
  document.querySelectorAll(".tabs button").forEach(x=>x.classList.toggle("active",x.dataset.tab===name));
  document.getElementById("tab-surface").hidden=name!=="surface";
  document.getElementById("tab-pile").hidden=name!=="pile";
  document.getElementById("tab-categories").hidden=name!=="categories";
  settings.lastTab=name;saveSettings();
  if(name==="pile")renderPileTab();
  else if(name==="categories")renderCategories();
}
document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>{if(b.dataset.tab==="pile"){pileLoc="all";pileQuery="";typeFilter="all";sourceFilter="all";tagFilter="";}selectTab(b.dataset.tab);});
/* ---- sélection par lot : boutons + gestes conteneur ---- */
document.getElementById("selBtn").onclick=enterSel;
document.getElementById("selCancel").onclick=exitSel;
document.getElementById("selAll").onclick=()=>{const rows=collectionRows();if(selIds.size===rows.length)selIds.clear();else rows.forEach(it=>selIds.add(it.id));renderPileTab();};
document.getElementById("batchCat").onclick=openBatchCatSheet;
document.getElementById("batchTag").onclick=openBatchTagSheet;
(function(){
  const pl=document.getElementById("pileList");
  let lpFired=false;
  /* tap sur une carte en mode sélection = cocher (on intercepte avant l'ouverture de la fiche) */
  pl.addEventListener("click",e=>{if(!selMode)return;const w=e.target.closest(".selwrap");const card=w?w.querySelector("[data-id]"):e.target.closest("[data-id]");if(!card)return;e.preventDefault();e.stopPropagation();if(lpFired){lpFired=false;return;}toggleSel(card.getAttribute("data-id"));haptic(8);},true);
  /* appui long = entrer en sélection (accélérateur ; le bouton reste le chemin garanti) */
  let t=null,y=0,moved=false;
  pl.addEventListener("touchstart",e=>{const card=e.target.closest("[data-id]");if(!card)return;moved=false;lpFired=false;y=e.touches[0].clientY;const id=card.getAttribute("data-id");t=setTimeout(()=>{if(moved)return;lpFired=true;if(!selMode)selMode=true;selIds.add(id);renderPileTab();haptic(14);},450);},{passive:true});
  pl.addEventListener("touchmove",e=>{if(Math.abs(e.touches[0].clientY-y)>10){moved=true;clearTimeout(t);}},{passive:true});
  pl.addEventListener("touchend",()=>clearTimeout(t));
  pl.addEventListener("contextmenu",e=>{const card=e.target.closest("[data-id]");if(!card)return;e.preventDefault();if(!selMode)selMode=true;selIds.add(card.getAttribute("data-id"));renderPileTab();});
})();
function applyPileView(){
  pileView=(settings.pileView==="last")?(settings.lastView||"feed"):(settings.pileView||"feed");
  document.querySelectorAll(".vseg").forEach(x=>x.classList.toggle("active",x.dataset.v===pileView));
}
document.querySelectorAll(".vseg").forEach(b=>b.onclick=()=>{
  pileView=b.dataset.v;
  settings.lastView=pileView;saveSettings();
  document.querySelectorAll(".vseg").forEach(x=>x.classList.toggle("active",x.dataset.v===pileView));
  renderList();
});
document.getElementById("filterBtn").onclick=openFilterSheet;
document.getElementById("viewBtn").onclick=openViewSheet;
document.getElementById("settingsBtn").onclick=openSettingsSheet;
document.getElementById("crumbBack").onclick=()=>{if(tagFilter){tagFilter="";renderPileTab();}else selectTab("categories");};
document.getElementById("openArch").onclick=()=>enterCollection("archived");
document.getElementById("catEdit").onclick=()=>{catEditMode=!catEditMode;renderRoot();};
document.getElementById("openTrash").onclick=()=>enterCollection("trashed");
document.getElementById("pileSearch").oninput=e=>{pileQuery=e.target.value;renderList();};
/* Defiler = parcourir : on retire le clavier pour rendre la hauteur d'ecran.
   Petit seuil (~10 px) pour ne pas hacher l'inertie au premier pixel. Les champs
   de recherche restant en haut, un tap les rappelle. */
(function(){const THR=10;let ty=null;
  const drop=()=>{const a=document.activeElement;if(a&&(a.id==="searchInput"||a.id==="pileSearch"))a.blur();};
  addEventListener("touchstart",e=>{ty=e.touches[0].clientY;},{passive:true});
  addEventListener("touchmove",e=>{if(ty!=null&&Math.abs(e.touches[0].clientY-ty)>THR)drop();},{passive:true});
  addEventListener("wheel",drop,{passive:true});
})();
document.querySelectorAll(".sable-ink").forEach(el=>{
  el.addEventListener("click",()=>{el.classList.remove("tapping");void el.offsetWidth;el.classList.add("tapping");});
  el.addEventListener("animationend",ev=>{if(ev.animationName==="sableTap")el.classList.remove("tapping");});
});
document.getElementById("sheetOverlay").onclick=()=>closeSheet();
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
    if(created.length>1)toast(created.length+" grains gardés.");
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
  if(it.type==="link")return ICON_LINK;
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
function savedFeedback(){
  haptic(14);
  const c=document.querySelector(".capture");
  if(c){c.classList.remove("flash");void c.offsetWidth;c.classList.add("flash");setTimeout(()=>c.classList.remove("flash"),560);}
}
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
  document.getElementById("stage").innerHTML=`<div class="rest"><div class="sub">Chargement de ta pile…</div></div>`;
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
  renderAll();
  selectTab(settings.startTab==="last"?(settings.lastTab||"surface"):settings.startTab);
  items.filter(i=>i.status==="active"&&i.url&&(!i.title||!i.preview)).slice(0,25).forEach(i=>enrich(i.id));
  await consumeSharedContent();
}
