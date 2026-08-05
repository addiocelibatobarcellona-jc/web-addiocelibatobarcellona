/**
 * Migra public/blog-posts.json → Sanity (tipo: blogPost)
 * Uso: node scripts/migrate-blog.mjs
 */
import { createClient } from "@sanity/client";
import posts from "../public/blog-posts.json" assert { type: "json" };
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
});

function cleanBody(md) {
  return (md ?? "").replace(/\n*###\s*Invia commento[\s\S]*/i, "").trim();
}

function parseDate(raw) {
  const d = new Date(raw);
  return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

async function run() {
  console.log(`Migrando ${posts.length} posts...`);
  let ok = 0;
  let skip = 0;

  for (const post of posts) {
    const existing = await client.fetch(
      `*[_type == "blogPost" && slug.current == $slug][0]._id`,
      { slug: post.slug }
    );
    if (existing) {
      console.log(`  → skip (ya existe): ${post.slug}`);
      skip++;
      continue;
    }

    const doc = {
      _type: "blogPost",
      title: post.title,
      slug: { _type: "slug", current: post.slug },
      date: parseDate(post.date),
      metaDescription: post.metaDescription ?? null,
      featuredImage: post.featuredImage ?? null,
      bodyMarkdown: cleanBody(post.bodyMarkdown),
    };

    await client.create(doc);
    console.log(`  ✓ creado: ${post.slug}`);
    ok++;
  }

  console.log(`\nListo: ${ok} creados, ${skip} ya existían.`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
