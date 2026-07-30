/**
 * Downloads all WordPress images to /public/images/
 * and rewrites all references in src/ and public/ files.
 *
 * Usage: node scripts/download-images.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, createWriteStream } from "fs";
import { join, basename } from "path";
import https from "https";
import http from "http";
import { fileURLToPath } from "url";

const ROOT = join(fileURLToPath(import.meta.url), "../..");
const IMG_DIR = join(ROOT, "public", "images");
const WP_BASE = "https://addioalcelibato-barcellona.it/wp-content/uploads/";

mkdirSync(IMG_DIR, { recursive: true });

// ── Collect files recursively ─────────────────────────────────────────────────

function collectFiles(dir, exts) {
  const results = [];
  let entries;
  try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return results; }
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory() && !["node_modules", ".next", ".git"].includes(e.name)) {
      results.push(...collectFiles(full, exts));
    } else if (e.isFile() && exts.some(x => e.name.endsWith(x))) {
      results.push(full);
    }
  }
  return results;
}

const files = [
  ...collectFiles(join(ROOT, "src"), [".tsx", ".ts"]),
  ...collectFiles(join(ROOT, "public"), [".json"]),
];

// ── Extract all WP image URLs ─────────────────────────────────────────────────

const urlSet = new Set();
const wpRegex = /https:\/\/addioalcelibato-barcellona\.it\/wp-content\/uploads\/[^\s"'`)\]]+\.(?:jpg|jpeg|png|webp|gif|svg)/gi;

for (const f of files) {
  for (const m of readFileSync(f, "utf-8").matchAll(wpRegex)) {
    urlSet.add(m[0]);
  }
}

console.log(`\nFound ${urlSet.size} unique WordPress image URLs\n`);

// ── URL → local mapping ───────────────────────────────────────────────────────

function urlToLocal(url) {
  const path = url.replace(WP_BASE, "");     // "2017/01/ADDIO-CLASSICO-S.jpg"
  const year = path.split("/")[0];
  const file = basename(path);
  const localName = `${year}-${file}`;
  return { localName, localPath: join(IMG_DIR, localName), publicPath: `/images/${localName}` };
}

// ── Download with redirect support ───────────────────────────────────────────

function download(url, dest, redirects = 5) {
  return new Promise((resolve, reject) => {
    if (existsSync(dest)) { resolve("cached"); return; }
    const proto = url.startsWith("https") ? https : http;
    const out = createWriteStream(dest);

    proto.get(url, (res) => {
      if ((res.statusCode === 301 || res.statusCode === 302) && redirects > 0) {
        out.close();
        // delete incomplete file and follow redirect
        try { require("fs").unlinkSync(dest); } catch {}
        download(res.headers.location, dest, redirects - 1).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        out.close();
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      res.pipe(out);
      out.on("finish", () => { out.close(); resolve("downloaded"); });
      out.on("error", reject);
    }).on("error", (err) => { out.close(); reject(err); });
  });
}

// ── Download all images sequentially ─────────────────────────────────────────

const urlMap = new Map();
let dl = 0, cached = 0, failed = 0;

for (const url of urlSet) {
  const { localName, localPath, publicPath } = urlToLocal(url);
  try {
    const result = await download(url, localPath);
    urlMap.set(url, publicPath);
    if (result === "cached") { cached++; console.log(`  ↩  ${localName}`); }
    else { dl++; console.log(`  ✓  ${localName}`); }
  } catch (err) {
    failed++;
    urlMap.set(url, url); // keep original URL if download failed
    console.log(`  ✗  ${localName} — ${err.message}`);
  }
}

console.log(`\nDownloaded: ${dl}  Cached: ${cached}  Failed: ${failed}\n`);
if (failed > 0) console.log("Failed images keep their original URL.\n");

// ── Rewrite source files ──────────────────────────────────────────────────────

let updated = 0;

for (const f of files) {
  let content = readFileSync(f, "utf-8");
  let changed = false;

  for (const [orig, local] of urlMap) {
    if (local === orig) continue; // failed, keep original
    if (content.includes(orig)) {
      content = content.replaceAll(orig, local);
      changed = true;
    }
  }

  if (changed) {
    writeFileSync(f, content, "utf-8");
    updated++;
    console.log(`  Updated: ${f.replace(ROOT + "/", "")}`);
  }
}

console.log(`\nDone. ${updated} files rewritten.`);
console.log(`Images saved to public/images/ — commit and push when ready.`);
