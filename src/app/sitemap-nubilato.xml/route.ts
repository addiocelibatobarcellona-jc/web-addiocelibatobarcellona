import { NextResponse } from "next/server";

const BASE = "https://www.addioalcelibato-barcellona.it";

const NUBILATO: Array<{ slug: string; lastmod: string; image?: string }> = [
  { slug: "addio-al-nubilato-con-spogliarellista-a-barcellona", lastmod: "2026-02-02", image: "/images/2026-cena-strip-disco-nubilato-1.png" },
  { slug: "addio-nubilato-spogliarello-limousine-barcellona",   lastmod: "2024-02-27", image: "/images/2017-CENALIMODISCO-S.jpg" },
  { slug: "addio-nubilato-spogliarellista-limousine-barcellona",lastmod: "2024-03-21", image: "/images/2017-All-Inclusive-Gold-Nubilato.jpg" },
  { slug: "addio-nubilato-spogliarellista-show-barcellona",     lastmod: "2024-02-27", image: "/images/2017-Stri-show-nubilato-S.jpg" },
  { slug: "addio-al-nubilato-collettivo-barcellona",            lastmod: "2025-05-12", image: "/images/2017-ADDIO-SPICY-MIX-S.jpg" },
  { slug: "cheeky-butler-barcellona",                           lastmod: "2026-05-06", image: "/images/2018-Cheeky-Butler-3.jpg" },
  { slug: "caccia-al-tesoro-addio-nubilato-barcellona",         lastmod: "2024-03-31", image: "/images/2024-journey-1130732_1280.jpg" },
  { slug: "addio-al-nubilato-barcellona-limobus",               lastmod: "2024-02-27", image: "/images/2017-Limobus-S.jpg" },
  { slug: "addio-nubilato-giretto-limo",                        lastmod: "2024-02-27", image: "/images/2017-GIRETTO-IN-LIMO.jpg" },
  { slug: "escape-room-game-nubilato-barcellona",               lastmod: "2025-05-12", image: "/images/2018-Escape-Room-Barcellona-Celibato.jpg" },
  { slug: "migliori-discoteche-barcellona",                     lastmod: "2025-05-12", image: "/images/2017-migliori-discoteche-di-barcellona-2.jpg" },
  { slug: "addio-nubilato-bodysushi-barcellona",                lastmod: "2024-02-19", image: "/images/2017-bodysushi2.jpg" },
  { slug: "addio-al-nubilato-barcellona-marines",               lastmod: "2024-02-27", image: "/images/2017-Barcellona-Marines.jpg" },
];

function urlEntry(slug: string, lastmod: string, image?: string): string {
  const loc = `${BASE}/addio-al-nubilato/${slug}/`;
  const imgTag = image
    ? `\n    <image:image><image:loc>${BASE}${image}</image:loc></image:image>`
    : "";
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.65</priority>${imgTag}
  </url>`;
}

export const dynamic = "force-static";

export function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${NUBILATO.map((a) => urlEntry(a.slug, a.lastmod, a.image)).join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
