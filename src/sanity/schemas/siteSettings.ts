import { defineField, defineType } from "sanity";

const navLinkFields = [
  defineField({ name: "label", title: "Label", type: "string" }),
  defineField({ name: "href", title: "URL", type: "string" }),
];

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Impostazioni Sito",
  type: "document",
  groups: [
    { name: "site", title: "Contatti" },
    { name: "navbar", title: "Navbar" },
    { name: "hero", title: "Hero (Home)" },
    { name: "activities", title: "Attività (Grid)" },
    { name: "perche", title: "Perché noi" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    // ── SITE ──────────────────────────────────────────────────────────────────
    defineField({
      name: "site",
      title: "Info contatto",
      type: "object",
      group: "site",
      fields: [
        defineField({ name: "email", title: "Email", type: "string" }),
        defineField({ name: "phone", title: "Telefono", type: "string" }),
        defineField({ name: "whatsapp", title: "WhatsApp (solo numeri)", type: "string" }),
        defineField({ name: "address", title: "Indirizzo", type: "string" }),
      ],
    }),

    // ── NAVBAR ────────────────────────────────────────────────────────────────
    defineField({
      name: "navbar",
      title: "Navbar",
      type: "object",
      group: "navbar",
      fields: [
        defineField({ name: "logo_line1", title: "Logo riga 1", type: "string" }),
        defineField({ name: "logo_line2", title: "Logo riga 2", type: "string" }),
        defineField({ name: "cta_label", title: "Label CTA", type: "string" }),
        defineField({
          name: "links",
          title: "Link navbar",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                ...navLinkFields,
                defineField({
                  name: "children",
                  title: "Sottomenu",
                  type: "array",
                  of: [{ type: "object", fields: navLinkFields }],
                }),
              ],
            },
          ],
        }),
      ],
    }),

    // ── HERO ──────────────────────────────────────────────────────────────────
    defineField({
      name: "hero",
      title: "Hero Homepage",
      type: "object",
      group: "hero",
      fields: [
        defineField({ name: "headline_line1", title: "Headline riga 1", type: "string" }),
        defineField({ name: "headline_accent", title: "Headline accent", type: "string" }),
        defineField({ name: "subheadline", title: "Subheadline", type: "string" }),
        defineField({ name: "description", title: "Descrizione", type: "text", rows: 3 }),
      ],
    }),

    // ── ACTIVITIES LISTING ────────────────────────────────────────────────────
    defineField({
      name: "notturne",
      title: "Attività Notturne",
      type: "object",
      group: "activities",
      fields: [
        defineField({
          name: "activities",
          title: "Lista attività notturne",
          type: "array",
          of: [{ type: "object", fields: [
            defineField({ name: "icon", type: "string", title: "Icona (emoji)" }),
            defineField({ name: "name", type: "string", title: "Nome" }),
            defineField({ name: "desc", type: "text", title: "Descrizione breve", rows: 2 }),
            defineField({ name: "price", type: "string", title: "Prezzo (es. €42 / persona)" }),
            defineField({ name: "href", type: "string", title: "URL" }),
            defineField({ name: "tag", type: "string", title: "Tag (opzionale)" }),
            defineField({ name: "image", type: "string", title: "Immagine (path /images/...)" }),
          ]}],
        }),
      ],
    }),

    defineField({
      name: "pomeridiane",
      title: "Attività Pomeridiane",
      type: "object",
      group: "activities",
      fields: [
        defineField({ name: "cta_all_href", type: "string", title: "CTA URL" }),
        defineField({
          name: "activities",
          title: "Lista attività pomeridiane",
          type: "array",
          of: [{ type: "object", fields: [
            defineField({ name: "icon", type: "string", title: "Icona (emoji)" }),
            defineField({ name: "name", type: "string", title: "Nome" }),
            defineField({ name: "desc", type: "text", title: "Descrizione breve", rows: 2 }),
            defineField({ name: "price", type: "string", title: "Prezzo" }),
            defineField({ name: "href", type: "string", title: "URL" }),
            defineField({ name: "tag", type: "string", title: "Tag (opzionale)" }),
            defineField({ name: "image", type: "string", title: "Immagine (path /images/...)" }),
          ]}],
        }),
      ],
    }),

    defineField({
      name: "activities",
      title: "Meta categorie attività",
      type: "object",
      group: "activities",
      fields: [
        defineField({
          name: "all",
          title: "Tutte",
          type: "object",
          fields: [
            defineField({ name: "headline", type: "string" }),
            defineField({ name: "headline_accent", type: "string" }),
            defineField({ name: "meta_title", type: "string" }),
            defineField({ name: "meta_desc", type: "text", rows: 2 }),
            defineField({ name: "seo_text", type: "text", rows: 5 }),
          ],
        }),
        defineField({
          name: "night",
          title: "Notturne",
          type: "object",
          fields: [
            defineField({ name: "headline", type: "string" }),
            defineField({ name: "headline_accent", type: "string" }),
            defineField({ name: "meta_title", type: "string" }),
            defineField({ name: "meta_desc", type: "text", rows: 2 }),
            defineField({ name: "seo_text", type: "text", rows: 5 }),
          ],
        }),
        defineField({
          name: "daytime",
          title: "Pomeridiane",
          type: "object",
          fields: [
            defineField({ name: "headline", type: "string" }),
            defineField({ name: "headline_accent", type: "string" }),
            defineField({ name: "meta_title", type: "string" }),
            defineField({ name: "meta_desc", type: "text", rows: 2 }),
            defineField({ name: "seo_text", type: "text", rows: 5 }),
          ],
        }),
      ],
    }),

    // ── PERCHÉ ────────────────────────────────────────────────────────────────
    defineField({
      name: "perche",
      title: "Sezione Perché noi",
      type: "object",
      group: "perche",
      fields: [
        defineField({ name: "section_title_line1", type: "string" }),
        defineField({ name: "section_title_accent", type: "string" }),
        defineField({ name: "highlight_text", type: "string" }),
        defineField({
          name: "items",
          type: "array",
          of: [{ type: "object", fields: [
            defineField({ name: "icon", type: "string" }),
            defineField({ name: "title", type: "string" }),
            defineField({ name: "desc", type: "text", rows: 2 }),
          ]}],
        }),
      ],
    }),

    // ── FOOTER ────────────────────────────────────────────────────────────────
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      group: "footer",
      fields: [
        defineField({ name: "logo_line1", type: "string" }),
        defineField({ name: "logo_line2", type: "string" }),
        defineField({ name: "description", type: "text", rows: 3 }),
        defineField({
          name: "activity_links",
          title: "Link attività",
          type: "array",
          of: [{ type: "object", fields: navLinkFields }],
        }),
        defineField({
          name: "legal_links",
          title: "Link legali",
          type: "array",
          of: [{ type: "object", fields: navLinkFields }],
        }),
        defineField({ name: "copyright", type: "string" }),
      ],
    }),
  ],
});
