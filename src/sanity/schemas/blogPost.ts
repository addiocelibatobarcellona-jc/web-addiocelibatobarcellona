import { defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Articolo Blog",
  type: "document",
  groups: [
    { name: "content", title: "Contenuto", default: true },
    { name: "seo", title: "SEO & Media" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Titolo",
      type: "string",
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug URL",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      title: "Data pubblicazione",
      type: "datetime",
      group: "content",
    }),
    defineField({
      name: "bodyMarkdown",
      title: "Testo articolo (Markdown)",
      type: "text",
      rows: 20,
      group: "content",
    }),

    // ── SEO & MEDIA ───────────────────────────────────────────────────────────
    defineField({
      name: "metaDescription",
      title: "Meta descrizione",
      type: "text",
      rows: 2,
      group: "seo",
      validation: (r) => r.max(160),
    }),
    defineField({
      name: "featuredImage",
      title: "Immagine copertina (path /images/...)",
      type: "string",
      group: "seo",
      description: "Es. /images/2017-Bungee-Jumping.jpeg",
    }),
  ],

  orderings: [
    {
      title: "Data (più recente prima)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],

  preview: {
    select: { title: "title", subtitle: "date", media: "featuredImage" },
    prepare({ title, subtitle }) {
      return { title, subtitle };
    },
  },
});
