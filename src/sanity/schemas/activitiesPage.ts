import { defineField, defineType } from "sanity";

const metaFields = (prefix: string, label: string) => [
  defineField({ name: `${prefix}_headline`,   title: `${label} — Headline`,   type: "string" }),
  defineField({ name: `${prefix}_meta_title`, title: `${label} — Meta title`, type: "string", validation: (r) => r.max(70) }),
  defineField({ name: `${prefix}_meta_desc`,  title: `${label} — Meta desc`,  type: "text", rows: 2, validation: (r) => r.max(160) }),
  defineField({ name: `${prefix}_seo_text`,   title: `${label} — Testo SEO`,  type: "text", rows: 5 }),
];

export const activitiesPage = defineType({
  name: "activitiesPage",
  title: "Attività (listado)",
  type: "document",
  groups: [
    { name: "all",     title: "Tutte le attività", default: true },
    { name: "night",   title: "Notturne" },
    { name: "daytime", title: "Pomeridiane" },
  ],
  fields: [
    // ── TUTTE ────────────────────────────────────────────────────────────────
    ...metaFields("all", "Tutte").map((f) => ({ ...f, group: "all" })),

    // ── NOTTURNE ─────────────────────────────────────────────────────────────
    ...metaFields("night", "Notturne").map((f) => ({ ...f, group: "night" })),

    // ── POMERIDIANE ───────────────────────────────────────────────────────────
    ...metaFields("daytime", "Pomeridiane").map((f) => ({ ...f, group: "daytime" })),
  ],
});
