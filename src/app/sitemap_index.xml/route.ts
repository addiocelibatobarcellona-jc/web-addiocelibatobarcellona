import { NextResponse } from "next/server";

// Canonical sitemap index is /sitemap.xml — redirect old URL permanently
export function GET() {
  return NextResponse.redirect(
    "https://www.addioalcelibato-barcellona.it/sitemap.xml",
    { status: 301 }
  );
}
