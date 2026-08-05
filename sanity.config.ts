import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";
import { dataset, projectId, apiVersion } from "./src/sanity/env";

const STUDIO_BASE_PATH = "/studio";

export default defineConfig({
  name: "addio-al-celibato-bcn",
  title: "Addio al Celibato BCN",
  basePath: STUDIO_BASE_PATH,
  projectId,
  dataset,
  apiVersion,
  schema: { types: schemaTypes },

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Contenuto")
          .items([
            // ── Configurazione ──────────────────────────────────────────────
            S.listItem()
              .title("⚙️ Configurazione Sito")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
            S.divider(),

            // ── Pagine ───────────────────────────────────────────────────────
            S.listItem()
              .title("📄 Pagine")
              .child(
                S.list()
                  .title("Pagine")
                  .items([
                    S.listItem().title("🏠 Home").id("homePage")
                      .child(S.document().schemaType("homePage").documentId("homePage")),
                    S.listItem().title("💍 Addio al Nubilato").id("nubilatoPage")
                      .child(S.document().schemaType("nubilatoPage").documentId("nubilatoPage")),
                    S.listItem().title("🎉 Attività (listado)").id("activitiesPage")
                      .child(S.document().schemaType("activitiesPage").documentId("activitiesPage")),
                    S.listItem().title("ℹ️ Chi Siamo").id("aboutPage")
                      .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
                    S.listItem().title("📞 Contatti").id("contactPage")
                      .child(S.document().schemaType("contactPage").documentId("contactPage")),
                    S.listItem().title("❓ Domande Frequenti").id("faqPage")
                      .child(S.document().schemaType("faqPage").documentId("faqPage")),
                  ])
              ),

            // ── Legal ─────────────────────────────────────────────────────────
            S.listItem()
              .title("⚖️ Legal")
              .child(
                S.list()
                  .title("Legal")
                  .items([
                    S.listItem().title("🍪 Banner Cookie").id("cookieConsent")
                      .child(S.document().schemaType("cookieConsent").documentId("cookieConsent")),
                    S.divider(),
                    S.documentTypeListItem("legalPage").title("📋 Pagine Legali"),
                  ])
              ),

            S.divider(),

            // ── Contenuto ────────────────────────────────────────────────────
            S.documentTypeListItem("activity").title("🎉 Attività"),
            S.documentTypeListItem("blogPost").title("📝 Articoli Blog"),
          ]),
    }),

    presentationTool({
      previewUrl: {
        origin:
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : "https://www.addioalcelibato-barcellona.it",
        draftMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),

    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
