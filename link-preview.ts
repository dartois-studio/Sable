// ─────────────────────────────────────────────────────────────────────────────
// Sable · Edge Function "link-preview"
// Récupère le titre + l'image d'aperçu d'une URL CÔTÉ SERVEUR (comme le fait
// WhatsApp), pour ne plus dépendre d'un service tiers ni se faire bloquer par
// les règles CORS du navigateur.
//
// DÉPLOIEMENT (mobile, sans terminal) :
//   Tableau de bord Supabase → Edge Functions → "Deploy a new function"
//   → "Via Editor" → nomme-la exactement  link-preview  → colle TOUT ce fichier
//   → Deploy. (Laisse "Verify JWT" activé : seule ton app connectée pourra
//   l'appeler, pas n'importe qui.)
//
// Ensuite, dans index.html (bloc CONFIG), mets :  const SELF_META_FN = "link-preview";
// ─────────────────────────────────────────────────────────────────────────────

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// UA de robot "poli" : la plupart des sites (dont Reddit) servent l'Open Graph aux robots identifiés.
const UA = "Mozilla/5.0 (compatible; SableBot/1.0; +https://dartois.studio/Sable/)";

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&").replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'").replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ");
}

// Lit une balise <meta property|name="..." content="..."> (ordre des attributs indifférent)
function meta(html: string, ...names: string[]): string | null {
  for (const n of names) {
    const esc = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re1 = new RegExp(`<meta[^>]+(?:property|name)=["']${esc}["'][^>]*content=["']([^"']*)["']`, "i");
    const re2 = new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]*(?:property|name)=["']${esc}["']`, "i");
    const m = html.match(re1) || html.match(re2);
    if (m && m[1]) return decodeEntities(m[1].trim());
  }
  return null;
}

// Reddit expose un JSON public — plus fiable que scraper l'Open Graph.
async function fromReddit(url: string) {
  const clean = url.split("#")[0].split("?")[0].replace(/\/$/, "");
  const r = await fetch(clean + "/.json", { headers: { "User-Agent": UA, Accept: "application/json" } });
  if (!r.ok) return null;
  const j = await r.json();
  const post = j?.[0]?.data?.children?.[0]?.data;
  if (!post) return null;
  let image: string | null = null;
  const src = post?.preview?.images?.[0]?.source?.url;
  if (src) image = decodeEntities(src);
  else if (typeof post.url_overridden_by_dest === "string" && /\.(jpe?g|png|gif|webp)$/i.test(post.url_overridden_by_dest)) image = post.url_overridden_by_dest;
  else if (typeof post.thumbnail === "string" && /^https?:/.test(post.thumbnail)) image = post.thumbnail;
  return { title: post.title || null, image };
}

// Cas général : on récupère le HTML et on lit les balises Open Graph / Twitter.
async function fromHtml(url: string) {
  const r = await fetch(url, { headers: { "User-Agent": UA, Accept: "text/html,application/xhtml+xml,*/*" }, redirect: "follow" });
  if (!r.ok) return null;
  const html = (await r.text()).slice(0, 600000); // on borne la lecture (les balises meta sont dans le <head>)
  let title = meta(html, "og:title", "twitter:title");
  if (!title) { const t = html.match(/<title[^>]*>([^<]*)<\/title>/i); if (t) title = decodeEntities(t[1].trim()); }
  let image = meta(html, "og:image:secure_url", "og:image", "twitter:image", "twitter:image:src");
  if (image) { try { image = new URL(image, url).href; } catch (_e) { /* garde tel quel */ } }
  return { title: title || null, image: image || null };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json" } });

  try {
    let url = "";
    if (req.method === "POST") { const b = await req.json().catch(() => ({})); url = ((b as { url?: string })?.url || "").trim(); }
    else url = (new URL(req.url).searchParams.get("url") || "").trim();

    if (!/^https?:\/\//i.test(url)) return json({ error: "url manquante ou invalide" }, 400);

    let data: { title: string | null; image: string | null } | null = null;
    let host = "";
    try { host = new URL(url).hostname; } catch (_e) { /* */ }

    if (/(^|\.)reddit\.com$/i.test(host)) { try { data = await fromReddit(url); } catch (_e) { /* on tentera le HTML */ } }
    if (!data || (!data.title && !data.image)) { try { data = await fromHtml(url); } catch (_e) { /* */ } }

    return json(data || { title: null, image: null });
  } catch (e) {
    // On répond 200 avec des champs vides : l'app gère l'absence d'aperçu proprement.
    return json({ title: null, image: null, error: String(e) });
  }
});