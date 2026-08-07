/**
 * Migra public/activities-detail.json → Sanity (tipo: activity)
 * Uso: node scripts/migrate-activities.mjs
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

// notturne → night, pomeridiane → daytime, nubilato → nubilato
function mapCategory(cat) {
  if (cat === "notturne") return "night";
  if (cat === "pomeridiane") return "daytime";
  return "nubilato";
}

// Merge all activities: celibato (notturne/pomeridiane) + nubilato
const allActivities = [
  ...activities,
  ...nubilatoActivities.map((a) => ({
    ...a,
    category: "nubilato",
    images: a.image ? [a.image] : [],
  })),
];

async function run() {
  console.log(`Migrando ${allActivities.length} actividades (${activities.length} celibato + ${nubilatoActivities.length} nubilato)...`);
  let ok = 0;
  let skip = 0;

  for (const act of allActivities) {
    const existing = await client.fetch(
      `*[_type == "activity" && slug.current == $slug][0]._id`,
      { slug: act.slug }
    );
    if (existing) {
      console.log(`  → skip (ya existe): ${act.slug}`);
      skip++;
      continue;
    }

    const doc = {
      _type: "activity",
      name: act.name,
      slug: { _type: "slug", current: act.slug },
      category: mapCategory(act.category),
      price: act.price ?? null,
      intro: act.intro ?? null,
      includes: act.includes ?? [],
      description: act.description ?? null,
      notes: act.notes ?? null,
      body_html: act.body_html ?? null,
      meta_title: act.meta_title ?? null,
      meta_desc: act.meta_desc ?? null,
      images: act.images ?? [],
    };

    await client.create(doc);
    console.log(`  ✓ creado: ${act.slug}`);
    ok++;
  }

  console.log(`\nListo: ${ok} creados, ${skip} ya existían.`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
