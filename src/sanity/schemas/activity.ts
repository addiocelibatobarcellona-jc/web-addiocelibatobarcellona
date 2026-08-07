import { defineField, defineType } from "sanity";

export const activity = defineType({
  name: "activity",
  title: "Attività",
  type: "document",
  groups: [
    { name: "content", title: "Contenuto", default: true },
    { name: "seo",     title: "SEO" },
    { name: "media",   title: "Immagini" },
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
      title: "Titolo SEO",
      type: "string",
      group: "seo",
      description: "Max 70 caratteri. Es: «Spicy Mix Barcellona | Addio al Celibato»",
      validation: (r) => r.max(70),
    }),
    defineField({
      name: "meta_desc",
      title: "Meta descrizione",
      type: "text",
      rows: 3,
      group: "seo",
      description: "Max 160 caratteri. Appare nel risultato Google sotto il titolo.",
      validation: (r) => r.max(160),
    }),
    defineField({
      name: "keywords",
      title: "Parole chiave (keywords)",
      type: "array",
      of: [{ type: "string" }],
      group: "seo",
      description: "Es: addio al celibato barcellona, spogliarellista, limousine",
      options: { layout: "tags" },
    }),

    // ── MEDIA ─────────────────────────────────────────────────────────────────
    defineField({
      name: "coverImage",
      title: "Immagine copertina (CDN Sanity)",
      type: "image",
      group: "media",
      options: { hotspot: true },
      description: "Carica qui per usare il CDN Sanity. Se vuoto usa la prima immagine legacy.",
    }),
    defineField({
      name: "gridImage",
      title: "Immagine card griglia (CDN Sanity)",
      type: "image",
      group: "media",
      options: { hotspot: true },
      description: "Thumbnail nel grid attività. Se vuoto usa la copertina.",
    }),
    // Legacy: path strings from WordPress import — kept for backward compat
    defineField({
      name: "images",
      title: "Immagini pagina legacy (path /images/...)",
      type: "array",
      of: [{ type: "string" }],
      group: "media",
      description: "Path immagini importate da WordPress. Usa i campi sopra per nuove immagini.",
    }),
  ],

  preview: {
    select: { title: "name", subtitle: "category", media: "coverImage" },
    prepare({ title, subtitle, media }) {
      const cat = subtitle === "night" ? "🌙 Notturna" : subtitle === "daytime" ? "☀️ Pomeridiana" : "💍 Nubilato";
      return { title, subtitle: cat, media };
    },
  },
});
