import { NextResponse } from "next/server";

const BASE = "https://www.addioalcelibato-barcellona.it";

export const dynamic = "force-static";

export function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE}/sitemap-pages.xml</loc>
    <lastmod>2026-06-10T12:48:52+00:00</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE}/sitemap-nubilato.xml</loc>
    <lastmod>2026-05-22T13:10:13+00:00</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE}/sitemap-blog.xml</loc>
    <lastmod>2026-06-10T00:00:00+00:00</lastmod>
  </sitemap>
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
