/**
 * Fetches missing blog posts from WordPress REST API and appends to blog-posts.json.
 * Usage: node scripts/fetch-missing-posts.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const POSTS_FILE = join(ROOT, "public", "blog-posts.json");
const WP_API = "https://addioalcelibato-barcellona.it/wp-json/wp/v2";
const BASE_URL = "https://addioalcelibato-barcellona.it";

const MISSING_SLUGS = [
  "arrampicata-un-addio-al-celibato",
  "videoclip-addio-celibato",
  "lezioni-di-surf-addio-celibato-barcellona",
  "paddle-surf-addio-celibato-barcellona",
  "vermut-a-barcellona",
  "giornata-di-pesca-barcellona",
  "cena-di-gruppo-addio-celibato",
  "bunjee-jumping-addio-al-celibato",
  "paracadute-addio-al-celibato",
  "attivita-acquatiche-per-il-tuo-addio-al-celibato-a-barcellona",
];

// ── HTML → Markdown (minimal, no external deps) ──────────────────────────────

function htmlToMarkdown(html) {
  return html
    .replace(/<h2[^>]*>(.*?)<\/h2>/gis, "\n\n## $1\n\n")
    .replace(/<h3[^>]*>(.*?)<\/h3>/gis, "\n\n### $1\n\n")
    .replace(/<h4[^>]*>(.*?)<\/h4>/gis, "\n\n#### $1\n\n")
    .replace(/<strong[^>]*>(.*?)<\/strong>/gis, "**$1**")
    .replace(/<b[^>]*>(.*?)<\/b>/gis, "**$1**")
    .replace(/<em[^>]*>(.*?)<\/em>/gis, "_$1_")
    .replace(/<i[^>]*>(.*?)<\/i>/gis, "_$1_")
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gis, "[$2]($1)")
    .replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gis, (_, inner) =>
      inner.replace(/<li[^>]*>(.*?)<\/li>/gis, "\n- $1")
    )
    .replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gis, (_, inner) => {
      let i = 1;
      return inner.replace(/<li[^>]*>(.*?)<\/li>/gis, () => `\n${i++}. $1`);
    })
    .replace(/<p[^>]*>(.*?)<\/p>/gis, "\n\n$1")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// ── Fetch with retry ──────────────────────────────────────────────────────────

async function fetchJSON(url) {
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`HTTP ${res.status} — ${url}`);
  return res.json();
}

// ── Main ──────────────────────────────────────────────────────────────────────

const existingPosts = JSON.parse(readFileSync(POSTS_FILE, "utf-8"));
const existingSlugs = new Set(existingPosts.map((p) => p.slug));

console.log(`\nExisting posts: ${existingPosts.length}`);
console.log(`Fetching ${MISSING_SLUGS.length} missing posts...\n`);

const newPosts = [];

for (const slug of MISSING_SLUGS) {
  if (existingSlugs.has(slug)) {
    console.log(`  ↩  ${slug} (already exists)`);
    continue;
  }
  try {
    const results = await fetchJSON(`${WP_API}/posts?slug=${slug}&_fields=id,slug,title,date,content,excerpt,yoast_head_json,featured_media`);
    if (!results.length) {
      console.log(`  ✗  ${slug} — not found via API`);
      continue;
    }
    const wp = results[0];

    // Try to get featured image
    let featuredImage = null;
    if (wp.featured_media) {
      try {
        const media = await fetchJSON(`${WP_API}/media/${wp.featured_media}?_fields=source_url`);
        featuredImage = media.source_url ?? null;
      } catch {}
    }

    // Meta description from Yoast
    const metaDescription =
      wp.yoast_head_json?.description ??
      wp.excerpt?.rendered?.replace(/<[^>]+>/g, "").trim() ??
      null;

    const post = {
      title: wp.title.rendered.replace(/&#8217;/g, "'").replace(/&#8220;/g, '"').replace(/&#8221;/g, '"'),
      slug: wp.slug,
      url: `${BASE_URL}/${wp.slug}/`,
      date: wp.date,
      metaDescription,
      featuredImage,
      bodyMarkdown: htmlToMarkdown(wp.content.rendered),
    };

    newPosts.push(post);
    console.log(`  ✓  ${slug} — "${post.title}"`);
  } catch (err) {
    console.log(`  ✗  ${slug} — ${err.message}`);
  }
}

if (newPosts.length) {
  const updated = [...existingPosts, ...newPosts];
  writeFileSync(POSTS_FILE, JSON.stringify(updated, null, 2), "utf-8");
  console.log(`\nAdded ${newPosts.length} posts. Total: ${updated.length}`);
} else {
  console.log("\nNo new posts to add.");
}
