import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "Chi Siamo",
  type: "document",
  groups: [
    { name: "hero",   title: "Hero",    default: true },
    { name: "stats",  title: "Stats" },
    { name: "storia", title: "Storia" },
    { name: "seo",    title: "SEO" },
  ],
  fields: [
    // ── HERO ─────────────────────────────────────────────────────────────────
    defineField({ name: "hero_headline",       title: "Headline",        type: "string", group: "hero" }),
    defineField({ name: "hero_headline_accent",title: "Parola in evidenza", type: "string", group: "hero" }),
    defineField({ name: "hero_subheadline",    title: "Subheadline",     type: "string", group: "hero" }),

    // ── STATS ─────────────────────────────────────────────────────────────────
    defineField({
      name: "stats",
      title: "Statistiche",
      type: "array",
      group: "stats",
      of: [{ type: "object", fields: [
        defineField({ name: "value", type: "string", title: "Valore (es. 20+)" }),
        defineField({ name: "label", type: "string", title: "Etichetta" }),
      ]}],
    }),

    // ── STORIA ────────────────────────────────────────────────────────────────
    defineField({ name: "storia_headline",  title: "Titolo sezione storia", type: "string", group: "storia" }),
    defineField({ name: "storia_body",      title: "Testo storia",          type: "text",   group: "storia", rows: 8 }),
    defineField({ name: "bcn_headline",     title: "Titolo sezione BCN",    type: "string", group: "storia" }),
    defineField({ name: "bcn_body",         title: "Testo BCN",             type: "text",   group: "storia", rows: 6 }),

    // ── SEO ───────────────────────────────────────────────────────────────────
    defineField({ name: "metaTitle", title: "Meta title", type: "string", group: "seo", validation: (r) => r.max(70) }),
    defineField({ name: "metaDesc",  title: "Meta desc",  type: "text",   group: "seo", rows: 2, validation: (r) => r.max(160) }),
  ],
});
