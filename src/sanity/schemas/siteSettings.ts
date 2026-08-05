import { defineField, defineType } from "sanity";

const linkFields = [
  defineField({ name: "label", title: "Label", type: "string" }),
  defineField({ name: "href",  title: "URL",   type: "string" }),
];

const navLinkFields = [
  ...linkFields,
  defineField({
    name: "children",
    title: "Sottomenu (mobile accordion)",
    type: "array",
    of: [{ type: "object", fields: linkFields }],
  }),
];

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Impostazioni Sito",
  type: "document",
  // Fixed title in Studio — no longer shows the email
  preview: {
    prepare() {
      return { title: "Impostazioni Sito" };
    },
  },
  groups: [
    { name: "site",   title: "📞 Contatti",    default: true },
    { name: "navbar", title: "🔗 Menu / Navbar" },
    { name: "footer", title: "📄 Footer" },
  ],
  fields: [
    // ── CONTATTI ─────────────────────────────────────────────────────────────
    defineField({ name: "site_email",     title: "Email",         type: "string", group: "site" }),
    defineField({ name: "site_whatsapp",  title: "WhatsApp (solo numeri, es: 34673180796)", type: "string", group: "site" }),
    defineField({ name: "site_instagram", title: "Instagram URL", type: "string", group: "site" }),
    defineField({ name: "site_facebook",  title: "Facebook URL",  type: "string", group: "site" }),

    // ── NAVBAR + MENU MOBILE ─────────────────────────────────────────────────
    defineField({ name: "navbar_logo_line1", title: "Logo riga 1", type: "string", group: "navbar" }),
    defineField({ name: "navbar_logo_line2", title: "Logo riga 2", type: "string", group: "navbar" }),
    defineField({ name: "navbar_cta_label",  title: "CTA bottone (desktop + mobile)", type: "string", group: "navbar" }),
    defineField({
      name: "navbar_links",
      title: "Link menu (desktop e mobile — stessa lista)",
      description: "I link appaiono nel menu desktop e nel menu mobile a tutto schermo. Ogni link può avere un sottomenu che si mostra come accordion nel mobile.",
      type: "array",
      group: "navbar",
      of: [{ type: "object", fields: navLinkFields }],
    }),

    // ── FOOTER ────────────────────────────────────────────────────────────────
    defineField({ name: "footer_tagline",     title: "Nome/Tagline footer",  type: "string", group: "footer" }),
    defineField({ name: "footer_description", title: "Descrizione footer",   type: "text",   group: "footer", rows: 3 }),
    defineField({
      name: "footer_links_services",
      title: "Link colonna Servizi",
      type: "array",
      group: "footer",
      of: [{ type: "object", fields: linkFields }],
    }),
    defineField({
      name: "footer_links_info",
      title: "Link colonna Info / Legal",
      type: "array",
      group: "footer",
      of: [{ type: "object", fields: linkFields }],
    }),
  ],
});
