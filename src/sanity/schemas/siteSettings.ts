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

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Impostazioni Sito",
  type: "document",
  groups: [
    { name: "site",  title: "Contatti",  default: true },
    { name: "navbar",title: "Navbar / Menu" },
    { name: "footer",title: "Footer" },
  ],
  fields: [
    // ── CONTATTI ─────────────────────────────────────────────────────────────
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
