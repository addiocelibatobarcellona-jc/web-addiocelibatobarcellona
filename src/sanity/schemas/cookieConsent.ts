import { defineField, defineType } from "sanity";

export const cookieConsent = defineType({
  name: "cookieConsent",
  title: "Banner Cookie",
  type: "document",
  groups: [
    { name: "banner",     title: "Testi Banner",   default: true },
    { name: "categories", title: "Categorie" },
    { name: "links",      title: "Link" },
  ],
  fields: [
    // ── TESTI BANNER ─────────────────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Titolo banner",
      type: "string",
      group: "banner",
      description: 'Es. "Utilizziamo i cookie"',
    }),
    defineField({
      name: "description",
      title: "Testo descrittivo",
      type: "text",
      rows: 4,
      group: "banner",
      description: "Spiegazione breve dell'uso dei cookie.",
    }),
    defineField({
      name: "btnAcceptAll",
      title: "Bottone Accetta tutti",
      type: "string",
      group: "banner",
    }),
    defineField({
      name: "btnRejectAll",
      title: "Bottone Rifiuta tutti",
      type: "string",
      group: "banner",
    }),
    defineField({
      name: "btnSavePrefs",
      title: "Bottone Salva preferenze",
      type: "string",
      group: "banner",
    }),
    defineField({
      name: "btnManage",
      title: "Link gestione preferenze",
      type: "string",
      group: "banner",
      description: 'Es. "Gestisci preferenze"',
    }),

    // ── CATEGORIE ────────────────────────────────────────────────────────────
    defineField({
      name: "categoryNecessary",
      title: "Necessari — Titolo",
      type: "string",
      group: "categories",
    }),
    defineField({
      name: "categoryNecessaryDesc",
      title: "Necessari — Descrizione",
      type: "text",
      rows: 3,
      group: "categories",
    }),
    defineField({
      name: "categoryAnalytics",
      title: "Analitici — Titolo",
      type: "string",
      group: "categories",
    }),
    defineField({
      name: "categoryAnalyticsDesc",
      title: "Analitici — Descrizione",
      type: "text",
      rows: 3,
      group: "categories",
    }),
    defineField({
      name: "categoryMarketing",
      title: "Marketing — Titolo",
      type: "string",
      group: "categories",
    }),
    defineField({
      name: "categoryMarketingDesc",
      title: "Marketing — Descrizione",
      type: "text",
      rows: 3,
      group: "categories",
    }),

    // ── LINK ─────────────────────────────────────────────────────────────────
    defineField({
      name: "linkCookiePolicy",
      title: "URL Cookie Policy",
      type: "string",
      group: "links",
    }),
    defineField({
      name: "linkPrivacyPolicy",
      title: "URL Privacy Policy",
      type: "string",
      group: "links",
    }),
  ],
});
