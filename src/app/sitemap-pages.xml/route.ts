import { NextResponse } from "next/server";
import activitiesDetail from "../../../public/activities-detail.json";

const BASE = "https://www.addioalcelibato-barcellona.it";

type ActivityDetail = { slug: string; category: string; images: string[] };

// ── WP lastmod dates per activity slug ─────────────────────────────────────
const ACTIVITY_DATES: Record<string, string> = {
  "addio-al-celibato-con-limousine":               "2024-02-27",
  "addio-al-celibato-con-spogliarellista":         "2026-05-22",
  "addio-al-celibato-collettivo":                  "2025-05-12",
  "addio-al-celibato-con-spogliarellista-e-limousine": "2026-05-22",
  "addio-al-celibato-spogliarellista-show":        "2026-02-02",
  "xxx-show-trasgressione-massima":                "2024-02-27",
  "body-sushi":                                    "2024-02-27",
  "addio-al-celibato-barcellona-limobus":          "2024-02-27",
  "addio-al-celibato-giretto-in-limo":             "2024-02-27",
  "cocktail-lab-barcellona":                       "2026-04-14",
  "addio-al-celibato-catamarano-barcellona":       "2026-05-22",
  "addio-al-celibato-in-barca-a-vela-privata":     "2024-03-31",
  "addio-al-celibato-beerbike":                    "2026-05-22",
  "addio-al-celibato-bubble-football":             "2024-02-27",
  "addio-al-celibato-paintball-outdoor":           "2025-05-12",
  "escape-room-barcellona":                        "2024-03-31",
  "vespa-gps":                                     "2024-03-31",
  "camp-nou-experience":                           "2024-02-27",
  "addio-celibato-paddle-surf-barcellona":         "2024-03-31",
  "addio-al-nubilato-in-catamarano-a-barcellona":  "2026-05-22",
  "addio-nubilato-beerbike-barcellona":            "2026-05-22",
  "night-club-di-barcellona":                      "2026-08-05",
  "addio-al-celibato-archery-tag":                 "2026-05-06",
  "segway-barcellona-tour":                        "2026-05-06",
  "addio-al-celibato-altre-attivita":              "2026-05-06",
  "addio-celibato-tutti-al-mare-barcellona":       "2026-08-05",
};

// ── Extra images (for activities whose JSON images array is empty) ──────────
const EXTRA_IMAGES: Record<string, string[]> = {
  "addio-al-celibato-con-spogliarellista":         ["/images/2017-ADDIO-CLASSICO-S.jpg"],
  "addio-al-celibato-con-spogliarellista-e-limousine": ["/images/2017-CENALIMOSTRIPPERDISCO.jpg"],
  "addio-al-celibato-spogliarellista-show":        ["/images/2017-ADDIO-SPICY-MIX-S.jpg"],
  "xxx-show-trasgressione-massima":                ["/images/2017-XXX-SHOW-copy.jpg"],
  "body-sushi":                                    ["/images/2017-bodysushi2.jpg"],
  "addio-al-celibato-giretto-in-limo":             ["/images/2017-GIRETTO-IN-LIMO.jpg"],
  "cocktail-lab-barcellona":                       ["/images/2017-cocktail-lab.jpg"],
};

function imgs(srcs: string[]): string {
  return srcs
    .map((s) => `\n    <image:image><image:loc>${BASE}${s}</image:loc></image:image>`)
    .join("");
}

function urlEntry(
  loc: string,
  lastmod: string,
  changefreq: string,
  priority: string,
  images: string[] = [],
): string {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${imgs(images)}
  </url>`;
}

export const dynamic = "force-static";

export function GET() {
  const EXCLUDED_SLUGS = new Set(["xxx-show-trasgressione-massima", "body-sushi"]);
  const activities = (activitiesDetail as ActivityDetail[])
    .filter((a) => !EXCLUDED_SLUGS.has(a.slug))
    .map((a) => {
      const loc = `${BASE}/attivita/${a.category}/${a.slug}/`;
      const lastmod = ACTIVITY_DATES[a.slug] ?? "2026-08-05";
      const images = a.images.length > 0 ? a.images : (EXTRA_IMAGES[a.slug] ?? []);
      return urlEntry(loc, lastmod, "monthly", "0.7", images);
    });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlEntry(`${BASE}/`, "2026-06-10", "weekly", "1.0", ["/images/2026-addio-nubilato-home-size-ok.jpg"])}
${urlEntry(`${BASE}/attivita/`, "2024-02-27", "weekly", "0.9")}
${urlEntry(`${BASE}/attivita/notturne/`, "2026-05-06", "weekly", "0.85", ["/images/2017-ADDIO-CLASSICO-S.jpg"])}
${urlEntry(`${BASE}/attivita/pomeridiane/`, "2026-05-06", "weekly", "0.85", ["/images/2017-ALTRE-ATTIVITA.jpg"])}
${urlEntry(`${BASE}/addio-al-nubilato/`, "2026-05-22", "weekly", "0.85", ["/images/2026-addio-nubilato-home-size-ok.jpg"])}
${urlEntry(`${BASE}/addio-al-celibato-barcellona-contatti/`, "2024-02-27", "monthly", "0.8")}
${urlEntry(`${BASE}/chi-siamo-idee-per-laddio-al-celibato/`, "2024-02-27", "monthly", "0.6", ["/images/2017-ADDIO-CLASSICO-S.jpg"])}
${urlEntry(`${BASE}/addio-al-celibato-barcellona-blog/`, "2026-06-10", "weekly", "0.75")}
${urlEntry(`${BASE}/domande-frequenti-addio-al-celibato/`, "2026-08-04", "monthly", "0.65")}
${urlEntry(`${BASE}/addio-celibato-barcellona-cookie-policy/`, "2017-02-16", "yearly", "0.2")}
${activities.join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
