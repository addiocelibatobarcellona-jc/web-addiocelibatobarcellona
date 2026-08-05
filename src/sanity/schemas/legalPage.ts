import { defineField, defineType } from "sanity";

export const legalPage = defineType({
  name: "legalPage",
  title: "Pagina Legale",
  type: "document",
  groups: [
    { name: "content", title: "Contenuto", default: true },
    { name: "seo",     title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Titolo pagina",
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
      name: "lastUpdated",
      title: "Ultimo aggiornamento",
      type: "date",
      group: "content",
    }),
    defineField({
      name: "bodyMarkdown",
      title: "Contenuto (Markdown)",
      type: "text",
      rows: 30,
      group: "content",
      description: "Usa # per H1, ## per H2, **grassetto**, ecc.",
    }),

    // ── SEO ───────────────────────────────────────────────────────────────────
    defineField({
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      group: "seo",
      validation: (r) => r.max(70),
    }),
    defineField({
      name: "metaDesc",
      title: "Meta descrizione",
      type: "text",
      rows: 2,
      group: "seo",
      validation: (r) => r.max(160),
    }),
  ],

  preview: {
    select: { title: "title", subtitle: "slug.current" },
    prepare({ title, subtitle }) {
      return { title, subtitle: `/${subtitle}` };
    },
  },
});
