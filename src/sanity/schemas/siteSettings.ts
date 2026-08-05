import { defineField, defineType } from "sanity";

const linkFields = [
  defineField({ name: "label", title: "Label", type: "string" }),
  defineField({ name: "href",  title: "URL",   type: "string" }),
];

const navLinkFields = [
  ...linkFields,
  defineField({
    name: "children",
    title: "Sottomenu",
    type: "array",
    of: [{ type: "object", fields: linkFields }],
  }),
];

const activityFields = [
  defineField({ name: "icon",  type: "string", title: "Icona (emoji)" }),
  defineField({ name: "name",  type: "string", title: "Nome" }),
  defineField({ name: "desc",  type: "text",   title: "Descrizione", rows: 2 }),
  defineField({ name: "price", type: "string", title: "Prezzo" }),
  defineField({ name: "href",  type: "string", title: "URL" }),
  defineField({ name: "tag",   type: "string", title: "Tag (opzionale)" }),
  defineField({ name: "image", type: "string", title: "Immagine (/images/...)" }),
];

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Impostazioni Sito",
  type: "document",
  groups: [
    { name: "site",       title: "Contatti" },
    { name: "navbar",     title: "Navbar" },
    { name: "hero",       title: "Hero (Home)" },
    { name: "activities", title: "Attività Meta" },
    { name: "notturne",   title: "Notturne" },
    { name: "pomeridiane",title: "Pomeridiane" },
    { name: "perche",     title: "Perché noi" },
    { name: "footer",     title: "Footer" },
  ],
  fields: [
    // ── SITE ─────────────────────────────────────────────────────────────────
    defineField({ name: "site_email",     title: "Email",         type: "string", group: "site" }),
    defineField({ name: "site_whatsapp",  title: "WhatsApp",      type: "string", group: "site" }),
    defineField({ name: "site_instagram", title: "Instagram URL", type: "string", group: "site" }),
    defineField({ name: "site_facebook",  title: "Facebook URL",  type: "string", group: "site" }),

    // ── NAVBAR ────────────────────────────────────────────────────────────────
    defineField({ name: "navbar_logo_line1", title: "Logo riga 1", type: "string", group: "navbar" }),
    defineField({ name: "navbar_logo_line2", title: "Logo riga 2", type: "string", group: "navbar" }),
    defineField({ name: "navbar_cta_label",  title: "CTA label",   type: "string", group: "navbar" }),
    defineField({
      name: "navbar_links",
      title: "Link navbar",
      type: "array",
      group: "navbar",
      of: [{ type: "object", fields: navLinkFields }],
    }),

    // ── HERO ─────────────────────────────────────────────────────────────────
    defineField({ name: "hero_headline",        title: "Headline",        type: "string", group: "hero" }),
    defineField({ name: "hero_headline_accent",  title: "Headline accent", type: "string", group: "hero" }),
    defineField({ name: "hero_subheadline",      title: "Subheadline",     type: "string", group: "hero" }),
    defineField({ name: "hero_cta_primary",      title: "CTA primaria",    type: "string", group: "hero" }),
    defineField({ name: "hero_cta_secondary",    title: "CTA secondaria",  type: "string", group: "hero" }),

    // ── ACTIVITIES META ───────────────────────────────────────────────────────
    defineField({ name: "activities_all_headline",    title: "Tutte — Headline",    type: "string", group: "activities" }),
    defineField({ name: "activities_all_meta_title",  title: "Tutte — Meta title",  type: "string", group: "activities" }),
    defineField({ name: "activities_all_meta_desc",   title: "Tutte — Meta desc",   type: "text",   group: "activities", rows: 2 }),
    defineField({ name: "activities_all_seo_text",    title: "Tutte — SEO text",    type: "text",   group: "activities", rows: 5 }),

    defineField({ name: "activities_night_headline",   title: "Notturne — Headline",   type: "string", group: "activities" }),
    defineField({ name: "activities_night_meta_title", title: "Notturne — Meta title", type: "string", group: "activities" }),
    defineField({ name: "activities_night_meta_desc",  title: "Notturne — Meta desc",  type: "text",   group: "activities", rows: 2 }),
    defineField({ name: "activities_night_seo_text",   title: "Notturne — SEO text",   type: "text",   group: "activities", rows: 5 }),

    defineField({ name: "activities_daytime_headline",   title: "Pomeridiane — Headline",   type: "string", group: "activities" }),
    defineField({ name: "activities_daytime_meta_title", title: "Pomeridiane — Meta title", type: "string", group: "activities" }),
    defineField({ name: "activities_daytime_meta_desc",  title: "Pomeridiane — Meta desc",  type: "text",   group: "activities", rows: 2 }),
    defineField({ name: "activities_daytime_seo_text",   title: "Pomeridiane — SEO text",   type: "text",   group: "activities", rows: 5 }),

    // ── NOTTURNE GRID ─────────────────────────────────────────────────────────
    defineField({ name: "notturne_headline", title: "Headline notturne", type: "string", group: "notturne" }),
    defineField({
      name: "notturne_activities",
      title: "Lista attività notturne",
      type: "array",
      group: "notturne",
      of: [{ type: "object", fields: activityFields }],
    }),

    // ── POMERIDIANE GRID ──────────────────────────────────────────────────────
    defineField({ name: "pomeridiane_headline", title: "Headline pomeridiane", type: "string", group: "pomeridiane" }),
    defineField({
      name: "pomeridiane_activities",
      title: "Lista attività pomeridiane",
      type: "array",
      group: "pomeridiane",
      of: [{ type: "object", fields: activityFields }],
    }),

    // ── PERCHÉ ────────────────────────────────────────────────────────────────
    defineField({ name: "perche_headline", title: "Headline perché", type: "string", group: "perche" }),
    defineField({
      name: "perche_items",
      title: "Items",
      type: "array",
      group: "perche",
      of: [{ type: "object", fields: [
        defineField({ name: "icon",  type: "string", title: "Icona" }),
        defineField({ name: "title", type: "string", title: "Titolo" }),
        defineField({ name: "desc",  type: "text",   title: "Descrizione", rows: 2 }),
      ]}],
    }),

    // ── FOOTER ────────────────────────────────────────────────────────────────
    defineField({ name: "footer_tagline",     title: "Tagline",     type: "string", group: "footer" }),
    defineField({ name: "footer_description", title: "Descrizione", type: "text",   group: "footer", rows: 3 }),
    defineField({
      name: "footer_links_services",
      title: "Link servizi",
      type: "array",
      group: "footer",
      of: [{ type: "object", fields: linkFields }],
    }),
    defineField({
      name: "footer_links_info",
      title: "Link info",
      type: "array",
      group: "footer",
      of: [{ type: "object", fields: linkFields }],
    }),
  ],
});
