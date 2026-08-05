import { defineField, defineType } from "sanity";

const linkFields = [
  defineField({ name: "label", title: "Label / testo", type: "string" }),
  defineField({ name: "href",  title: "URL (es. /attivita/notturne)", type: "string" }),
];

const navLinkFields = [
  ...linkFields,
  defineField({
    name: "children",
    title: "Voci sottomenu (accordion mobile)",
    description: "Queste voci appaiono come accordion espandibile nel menu mobile sotto questo link.",
    type: "array",
    of: [{ type: "object", fields: linkFields }],
  }),
];

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Impostazioni Sito",
  type: "document",
  preview: {
    prepare() {
      return { title: "Impostazioni Sito" };
    },
  },
  groups: [
    { name: "site",   title: "📞 Contatti",    default: true },
    { name: "navbar", title: "🖥️ Menu Desktop" },
    { name: "mobile", title: "📱 Menu Mobile" },
    { name: "footer", title: "📄 Footer" },
  ],
  fields: [
    // ── CONTATTI ─────────────────────────────────────────────────────────────
    defineField({ name: "site_email",     title: "Email",         type: "string", group: "site" }),
    defineField({ name: "site_whatsapp",  title: "WhatsApp (solo numeri, es: 34673180796)", type: "string", group: "site" }),
    defineField({ name: "site_instagram", title: "Instagram URL", type: "string", group: "site" }),
    defineField({ name: "site_facebook",  title: "Facebook URL",  type: "string", group: "site" }),

    // ── NAVBAR DESKTOP ────────────────────────────────────────────────────────
    defineField({ name: "navbar_logo_line1", title: "Logo riga 1", type: "string", group: "navbar" }),
    defineField({ name: "navbar_logo_line2", title: "Logo riga 2", type: "string", group: "navbar" }),
    defineField({ name: "navbar_cta_label",  title: "Testo bottone CTA", type: "string", group: "navbar" }),
    defineField({
      name: "navbar_links",
      title: "Voci menu",
      description: "Il desktop mostra le prime 5 voci. Tutte le voci appaiono nel menu mobile. Aggiungi 'Sottomenu' a ogni voce per creare l'accordion nel mobile.",
      type: "array",
      group: "navbar",
      of: [{ type: "object", fields: navLinkFields }],
    }),

    // ── MENU MOBILE (read-only info + mobile-specific CTA) ─────────────────────
    defineField({
      name: "mobile_cta_label",
      title: "Testo bottone CTA mobile",
      description: "Se vuoto usa lo stesso testo del CTA desktop. Appare in fondo al menu mobile come bottone WhatsApp.",
      type: "string",
      group: "mobile",
    }),
    defineField({
      name: "mobile_extra_links",
      title: "Link aggiuntivi solo mobile",
      description: "Link che appaiono SOLO nel menu mobile (non in navbar desktop). Es. link a social, telefono, orari.",
      type: "array",
      group: "mobile",
      of: [{ type: "object", fields: linkFields }],
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
