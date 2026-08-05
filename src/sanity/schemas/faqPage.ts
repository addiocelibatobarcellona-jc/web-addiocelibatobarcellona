import { defineField, defineType } from "sanity";

export const faqPage = defineType({
  name: "faqPage",
  title: "Domande Frequenti",
  type: "document",
  groups: [
    { name: "content", title: "Contenuto", default: true },
    { name: "seo",     title: "SEO" },
  ],
  fields: [
    // ── CONTENUTO ────────────────────────────────────────────────────────────
    defineField({ name: "headline",       title: "Headline",        type: "string", group: "content" }),
    defineField({ name: "headline_accent",title: "Parola in evidenza", type: "string", group: "content" }),
    defineField({ name: "subheadline",    title: "Subheadline",     type: "string", group: "content" }),
    defineField({
      name: "faqs",
      title: "Domande e risposte",
      type: "array",
      group: "content",
      of: [{ type: "object", fields: [
        defineField({ name: "question", type: "string", title: "Domanda", validation: (r) => r.required() }),
        defineField({ name: "answer",   type: "text",   title: "Risposta", rows: 4, validation: (r) => r.required() }),
      ]}],
    }),

    // ── SEO ───────────────────────────────────────────────────────────────────
    defineField({ name: "metaTitle", title: "Meta title", type: "string", group: "seo", validation: (r) => r.max(70) }),
    defineField({ name: "metaDesc",  title: "Meta desc",  type: "text",   group: "seo", rows: 2, validation: (r) => r.max(160) }),
  ],
});
