import { defineField, defineType } from "sanity";

export const nubilatoPage = defineType({
  name: "nubilatoPage",
  title: "Addio al Nubilato",
  type: "document",
  groups: [
    { name: "hero",  title: "Hero",          default: true },
    { name: "why",   title: "Perché noi" },
    { name: "strip", title: "Contact Strip" },
    { name: "seo",   title: "SEO" },
  ],
  fields: [
    // ── HERO ─────────────────────────────────────────────────────────────────
    defineField({ name: "hero_headline",       title: "Headline",           type: "string", group: "hero" }),
    defineField({ name: "hero_headline_accent",title: "Parola in evidenza", type: "string", group: "hero" }),
    defineField({ name: "hero_subheadline",    title: "Subheadline",        type: "string", group: "hero" }),
    defineField({ name: "hero_cta_primary",    title: "CTA primaria",       type: "string", group: "hero" }),

    // ── PERCHÉ ────────────────────────────────────────────────────────────────
    defineField({ name: "why_headline", title: "Titolo sezione", type: "string", group: "why" }),
    defineField({
      name: "why_items",
      title: "Motivi",
      type: "array",
      group: "why",
      of: [{ type: "object", fields: [
        defineField({ name: "icon",  type: "string", title: "Icona (emoji)" }),
        defineField({ name: "title", type: "string", title: "Titolo" }),
        defineField({ name: "desc",  type: "text",   title: "Descrizione", rows: 2 }),
      ]}],
    }),

    // ── CONTACT STRIP ────────────────────────────────────────────────────────
    defineField({ name: "strip_headline", title: "Headline strip contatto", type: "string", group: "strip" }),
    defineField({ name: "strip_cta",      title: "CTA strip",               type: "string", group: "strip" }),

    // ── SEO ───────────────────────────────────────────────────────────────────
    defineField({ name: "metaTitle", title: "Meta title", type: "string", group: "seo", validation: (r) => r.max(70) }),
    defineField({ name: "metaDesc",  title: "Meta desc",  type: "text",   group: "seo", rows: 2, validation: (r) => r.max(160) }),
  ],
});
