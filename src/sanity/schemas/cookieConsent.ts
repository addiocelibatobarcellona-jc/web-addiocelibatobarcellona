import { defineField, defineType } from "sanity";

export const cookieConsent = defineType({
  name: "cookieConsent",
  title: "Banner Cookie",
  type: "document",
  preview: { prepare() { return { title: "Banner Cookie" }; } },
  fields: [
    defineField({ name: "title",          title: "Titolo banner",          type: "string", description: 'Es. "La tua privacy ci interessa"' }),
    defineField({ name: "description",    title: "Testo descrittivo",      type: "text", rows: 3 }),
    defineField({ name: "policy_label",   title: "Label link Cookie Policy", type: "string", description: 'Es. "Cookie Policy"' }),
    defineField({ name: "policy_href",    title: "URL Cookie Policy",      type: "string", description: "Es. /addio-celibato-barcellona-cookie-policy" }),
    defineField({ name: "btn_configure",  title: "Bottone Configura",      type: "string", description: 'Es. "Configura"' }),
    defineField({ name: "btn_reject",     title: "Bottone Rifiuta",        type: "string", description: 'Es. "Rifiuta Tutto"' }),
    defineField({ name: "btn_accept",     title: "Bottone Accetta",        type: "string", description: 'Es. "Accetta Tutto"' }),
  ],
});
