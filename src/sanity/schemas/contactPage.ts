import { defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contatti",
  type: "document",
  groups: [
    { name: "hero", title: "Hero",    default: true },
    { name: "form", title: "Modulo" },
    { name: "seo",  title: "SEO" },
  ],
  fields: [
    // ── HERO ─────────────────────────────────────────────────────────────────
    defineField({ name: "hero_headline",       title: "Headline",           type: "string", group: "hero" }),
    defineField({ name: "hero_headline_accent",title: "Parola in evidenza", type: "string", group: "hero" }),
    defineField({ name: "hero_subheadline",    title: "Subheadline",        type: "string", group: "hero" }),

    // ── MODULO ────────────────────────────────────────────────────────────────
    defineField({ name: "form_intro",        title: "Testo intro modulo",    type: "text",   group: "form", rows: 3 }),
    defineField({ name: "form_cta_label",    title: "Label bottone invio",   type: "string", group: "form" }),
    defineField({ name: "form_success_msg",  title: "Messaggio successo",    type: "text",   group: "form", rows: 2 }),

    // ── SEO ───────────────────────────────────────────────────────────────────
    defineField({ name: "metaTitle", title: "Meta title", type: "string", group: "seo", validation: (r) => r.max(70) }),
    defineField({ name: "metaDesc",  title: "Meta desc",  type: "text",   group: "seo", rows: 2, validation: (r) => r.max(160) }),
  ],
});
