/**
 * Parchea meta_title y meta_desc en todos los documentos activity de Sanity.
 * Usa los valores del JSON si existen, o genera un default legible.
 * Seguro ejecutar múltiples veces: solo escribe si el campo está vacío en Sanity.
 * Uso: node scripts/patch-seo.mjs
 */
import { createClient } from "@sanity/client";
import activities from "../public/activities-detail.json" assert { type: "json" };
import nubilatoActivities from "../public/nubilato-activities.json" assert { type: "json" };
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
});

// Build lookup map slug → { meta_title, meta_desc, name, intro }
const jsonMap = new Map();
for (const a of activities) {
  jsonMap.set(a.slug, { meta_title: a.meta_title, meta_desc: a.meta_desc, name: a.name, intro: a.intro, isNubilato: false });
}
for (const a of nubilatoActivities) {
  jsonMap.set(a.slug, { meta_title: a.meta_title, meta_desc: a.meta_desc, name: a.name, intro: a.intro, isNubilato: true });
}

function buildDefaultTitle(name, isNubilato) {
  const suffix = isNubilato ? "Addio al Nubilato Barcellona" : "Addio al Celibato Barcellona";
  return `${name} | ${suffix}`;
}

function buildDefaultDesc(intro) {
  if (!intro) return null;
  return intro.length > 160 ? intro.slice(0, 157) + "..." : intro;
}

async function run() {
  const sanityDocs = await client.fetch(
    `*[_type == "activity"]{ _id, "slug": slug.current, meta_title, meta_desc, name }`
  );
  console.log(`Documentos en Sanity: ${sanityDocs.length}`);

  let patched = 0;
  let skipped = 0;

  for (const doc of sanityDocs) {
    // Already has both fields → skip
    if (doc.meta_title && doc.meta_desc) {
      skipped++;
      continue;
    }

    const json = jsonMap.get(doc.slug);
    const isNubilato = json?.isNubilato ?? false;

    const newTitle = json?.meta_title || buildDefaultTitle(doc.name, isNubilato);
    const newDesc  = json?.meta_desc  || buildDefaultDesc(json?.intro) || null;

    const patch = {};
    if (!doc.meta_title && newTitle) patch.meta_title = newTitle;
    if (!doc.meta_desc  && newDesc)  patch.meta_desc  = newDesc;

    if (Object.keys(patch).length === 0) {
      skipped++;
      continue;
    }

    await client.patch(doc._id).set(patch).commit();
    console.log(`  ✓ ${doc.slug}`);
    if (patch.meta_title) console.log(`      title: ${patch.meta_title}`);
    patched++;
  }

  console.log(`\nListo: ${patched} parcheados, ${skipped} ya tenían SEO.`);
}

run().catch((err) => { console.error(err); process.exit(1); });
