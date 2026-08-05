/**
 * Migra public/data.json → Sanity (tipo: siteSettings, singleton)
 * Uso: node scripts/migrate-settings.mjs
 */
import { createClient } from "@sanity/client";
import data from "../public/data.json" assert { type: "json" };
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
});

const SINGLETON_ID = "siteSettings";

async function run() {
  const existing = await client.fetch(`*[_id == $id][0]._id`, { id: SINGLETON_ID });

  const doc = {
    _id: SINGLETON_ID,
    _type: "siteSettings",

    // site
    site_email: data.site.email,
    site_whatsapp: data.site.whatsapp,
    site_instagram: data.site.instagram ?? null,
    site_facebook: data.site.facebook ?? null,

    // navbar
    navbar_logo_line1: data.navbar.logo_line1,
    navbar_logo_line2: data.navbar.logo_line2,
    navbar_cta_label: data.navbar.cta_label,
    navbar_links: data.navbar.links,

    // hero
    hero_headline: data.hero.headline,
    hero_headline_accent: data.hero.headline_accent,
    hero_subheadline: data.hero.subheadline,
    hero_cta_primary: data.hero.cta_primary,
    hero_cta_secondary: data.hero.cta_secondary,

    // activities
    activities_all_headline: data.activities.all.headline,
    activities_all_meta_title: data.activities.all.meta_title,
    activities_all_meta_desc: data.activities.all.meta_desc,
    activities_all_seo_text: data.activities.all.seo_text,
    activities_night_headline: data.activities.night.headline,
    activities_night_meta_title: data.activities.night.meta_title,
    activities_night_meta_desc: data.activities.night.meta_desc,
    activities_night_seo_text: data.activities.night.seo_text,
    activities_daytime_headline: data.activities.daytime.headline,
    activities_daytime_meta_title: data.activities.daytime.meta_title,
    activities_daytime_meta_desc: data.activities.daytime.meta_desc,
    activities_daytime_seo_text: data.activities.daytime.seo_text,

    // notturne grid
    notturne_headline: data.notturne.headline,
    notturne_activities: data.notturne.activities,

    // pomeridiane grid
    pomeridiane_headline: data.pomeridiane.headline,
    pomeridiane_activities: data.pomeridiane.activities,

    // perche
    perche_headline: data.perche.headline,
    perche_items: data.perche.items,

    // footer
    footer_tagline: data.footer.tagline,
    footer_description: data.footer.description,
    footer_links_services: data.footer.links_services,
    footer_links_info: data.footer.links_info,
  };

  if (existing) {
    await client.createOrReplace(doc);
    console.log("✓ siteSettings actualizado.");
  } else {
    await client.createOrReplace(doc);
    console.log("✓ siteSettings creado.");
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
