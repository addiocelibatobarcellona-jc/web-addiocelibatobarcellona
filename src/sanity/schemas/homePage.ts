import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home",
  type: "document",
  groups: [
    { name: "hero",       title: "Hero",         default: true },
    { name: "notturne",   title: "Grid Notturne" },
    { name: "pomeridiane",title: "Grid Pomeridiane" },
    { name: "perche",     title: "Perché noi" },
    { name: "seo",        title: "SEO" },
  ],
  fields: [
    // ── HERO ─────────────────────────────────────────────────────────────────
    defineField({ name: "hero_headline",       title: "Headline",        type: "string", group: "hero" }),
    defineField({ name: "hero_headline_accent",title: "Parola in evidenza", type: "string", group: "hero" }),
    defineField({ name: "hero_subheadline",    title: "Subheadline",     type: "string", group: "hero" }),
    defineField({ name: "hero_cta_primary",    title: "CTA primaria",    type: "string", group: "hero" }),
    defineField({ name: "hero_cta_secondary",  title: "CTA secondaria",  type: "string", group: "hero" }),

    // ── GRID NOTTURNE ─────────────────────────────────────────────────────────
    defineField({ name: "notturne_headline",   title: "Titolo sezione notturne",    type: "string", group: "notturne" }),

    // ── GRID POMERIDIANE ──────────────────────────────────────────────────────
    defineField({ name: "pomeridiane_headline",title: "Titolo sezione pomeridiane", type: "string", group: "pomeridiane" }),

    // ── PERCHÉ NOI ────────────────────────────────────────────────────────────
    defineField({ name: "perche_headline",     title: "Titolo sezione perché",      type: "string", group: "perche" }),
    defineField({
      name: "perche_items",
      title: "Items",
      type: "array",
      group: "perche",
      of: [{ type: "object", fields: [
        defineField({ name: "icon",  type: "string", title: "Icona (emoji)" }),
        defineField({ name: "title", type: "string", title: "Titolo" }),
        defineField({ name: "desc",  type: "text",   title: "Descrizione", rows: 2 }),
      ]}],
    }),

    // ── SEO ───────────────────────────────────────────────────────────────────
    defineField({ name: "metaTitle",    title: "Meta title",              type: "string", group: "seo", validation: (r) => r.max(70) }),
    defineField({ name: "metaDesc",     title: "Meta descrizione",        type: "text",   group: "seo", rows: 2, validation: (r) => r.max(160) }),
    defineField({ name: "metaKeywords", title: "Parole chiave (keywords)", type: "array",  group: "seo", of: [{ type: "string" }], options: { layout: "tags" }, description: "Es: addio al celibato barcellona, spogliarellista, limousine" }),
  ],
});
