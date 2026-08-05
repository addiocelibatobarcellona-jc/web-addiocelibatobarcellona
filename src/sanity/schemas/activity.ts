import { defineField, defineType } from "sanity";

export const activity = defineType({
  name: "activity",
  title: "Attività",
  type: "document",
  groups: [
    { name: "content", title: "Contenuto", default: true },
    { name: "seo", title: "SEO" },
    { name: "media", title: "Immagini" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Nome attività",
      type: "string",
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug URL",
      type: "slug",
      group: "content",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Notturne", value: "night" },
          { title: "Pomeridiane", value: "daytime" },
          { title: "Nubilato", value: "nubilato" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "price",
      title: "Prezzo (es. €42 / persona)",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "intro",
      title: "Intro (primo paragrafo e meta desc fallback)",
      type: "text",
      rows: 4,
      group: "content",
    }),
    defineField({
      name: "includes",
      title: "Cosa include",
      type: "array",
      of: [{ type: "string" }],
      group: "content",
    }),
    defineField({
      name: "description",
      title: "Descrizione completa",
      type: "text",
      rows: 6,
      group: "content",
    }),
    defineField({
      name: "notes",
      title: "Note (opzionale)",
      type: "text",
      rows: 3,
      group: "content",
    }),
    defineField({
      name: "body_html",
      title: "Contenuto HTML (importato da WP)",
      type: "text",
      rows: 10,
      group: "content",
      description: "HTML dal vecchio sito WordPress. Modificabile in HTML grezzo.",
    }),

    // ── SEO ───────────────────────────────────────────────────────────────────
    defineField({
      name: "meta_title",
      title: "Titolo SEO (Yoast)",
      type: "string",
      group: "seo",
      validation: (r) => r.max(70),
    }),
    defineField({
      name: "meta_desc",
      title: "Meta descrizione SEO",
      type: "text",
      rows: 2,
      group: "seo",
      validation: (r) => r.max(160),
    }),

    // ── MEDIA ─────────────────────────────────────────────────────────────────
    defineField({
      name: "imageGrid",
      title: "Immagine card (griglia)",
      type: "string",
      group: "media",
      description: "Thumbnail per il grid delle attività. Se vuoto usa la prima immagine della pagina.",
    }),
    defineField({
      name: "images",
      title: "Immagini pagina (path /images/...)",
      type: "array",
      of: [{ type: "string" }],
      group: "media",
      description: "Prima immagine = copertina della pagina attività.",
    }),
  ],

  preview: {
    select: { title: "name", subtitle: "category", media: "images.0" },
    prepare({ title, subtitle }) {
      const cat = subtitle === "night" ? "🌙 Notturna" : subtitle === "daytime" ? "☀️ Pomeridiana" : "💍 Nubilato";
      return { title, subtitle: cat };
    },
  },
});
