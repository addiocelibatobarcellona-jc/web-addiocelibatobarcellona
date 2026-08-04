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
            S.listItem()
              .title("⚙️ Impostazioni Sito")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
            S.divider(),
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
