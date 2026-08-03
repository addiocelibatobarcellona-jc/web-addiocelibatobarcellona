import { NextResponse } from "next/server";
import blogPosts from "../../../public/blog-posts.json";

const BASE = "https://www.addioalcelibato-barcellona.it";

type BlogPost = { slug: string; date: string; featuredImage?: string | null };

function parseDate(raw: string): string {
  const d = new Date(raw);
  if (!isNaN(d.getTime())) return d.toISOString().split("T")[0];
  // Try "Month DD, YYYY" format
  const m = raw.match(/(\w+)\s+(\d+),?\s+(\d{4})/);
  if (m) {
    const months: Record<string, string> = {
      Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
      Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12",
    };
    const mo = months[m[1].slice(0, 3)] ?? "01";
    return `${m[3]}-${mo}-${m[2].padStart(2, "0")}`;
  }
  return "2024-01-01";
}

export const dynamic = "force-static";

export function GET() {
  const entries = (blogPosts as BlogPost[]).map((p) => {
    const loc = `${BASE}/${p.slug}/`;
    const lastmod = parseDate(p.date);
    const imgTag =
      p.featuredImage && typeof p.featuredImage === "string"
        ? `\n    <image:image><image:loc>${BASE}${p.featuredImage}</image:loc></image:image>`
        : "";
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>${imgTag}
  </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
