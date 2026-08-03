import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "addioalcelibato-barcellona.it" },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000,
  },
  compress: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
  async headers() {
    return [
      // ── Security + defaults (all routes) ──────────────────────────────────
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",  value: "nosniff" },
          { key: "X-Frame-Options",         value: "SAMEORIGIN" },
          { key: "Referrer-Policy",         value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control",  value: "on" },
          // HSTS — 2 years, includeSubDomains. Remove if not on HTTPS.
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          // Block browser features not used by this site
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
        ],
      },

      // ── Fonts — immutable (content-hashed by Next.js) ─────────────────────
      {
        source: "/(.*)\\.(woff2|woff|ttf)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },

      // ── Static images in /public/images/ ─────────────────────────────────
      {
        source: "/images/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" },
        ],
      },

      // ── Next.js optimized images (/\_next/image) ──────────────────────────
      // minimumCacheTTL controls CDN; this header adds browser cache (default is 60s)
      {
        source: "/_next/image(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=2592000" },
        ],
      },

      // ── JS / CSS bundles — immutable (content-hashed by Next.js) ─────────
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },

      // ── SEO / LLM text files ──────────────────────────────────────────────
      {
        source: "/(sitemap.xml|robots.txt|llms.txt|llms-full.txt)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=3600" },
        ],
      },

      // ── favicon + other static assets ────────────────────────────────────
      {
        source: "/(.*)\\.(ico|svg|webmanifest)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
        ],
      },
    ];
  },
  async redirects() {
    const CONTACT = "/addio-al-celibato-barcellona-contatti";
    const NIGHT    = "/attivita/notturne";
    const DAY      = "/attivita/pomeridiane";

    const make301 = (source: string, destination: string) => [
      { source, destination, permanent: true },
      { source: `${source}/`, destination, permanent: true },
    ];

    return [
      // ── Root-level WP pages no longer in Next.js ──────────────────────────
      ...make301("/addio-al-celibato-tutti-al-mare",                   DAY),
      ...make301("/addio-al-celibato-barcellona-collettivo",           `${NIGHT}/addio-al-celibato-collettivo`),
      ...make301("/addio-celibato-barcellona-spogliarello-limousine-silver", `${NIGHT}/addio-al-celibato-con-spogliarellista-e-limousine`),
      ...make301("/addio-al-celibato-barcellona-bunny",                CONTACT),
      ...make301("/body-sushi",                                        `${NIGHT}/body-sushi`),
      ...make301("/recensioni",                                        "/chi-siamo-idee-per-laddio-al-celibato"),
      ...make301("/scrivi-una-recensione",                             CONTACT),
      ...make301("/conferma",                                          "/"),
      ...make301("/addio-al-celibato-barcellona-privacy",              "/addio-celibato-barcellona-cookie-policy"),
      ...make301("/migliori-discoteche-barcellona",                    "/addio-al-nubilato/migliori-discoteche-barcellona"),
      // ── Daytime WP pages without dedicated Next.js activity page ──────────
      ...make301(`${DAY}/addio-al-celibato-paintball-indoor`,         `${DAY}/addio-al-celibato-paintball-outdoor`),
      ...make301(`${DAY}/addio-al-celibato-laser-combat-outdoor`,     CONTACT),
      ...make301(`${DAY}/addio-al-celibato-archery-tag`,              CONTACT),
      ...make301(`${DAY}/addio-al-celibato-quad-revolution`,          CONTACT),
      ...make301(`${DAY}/addio-al-celibato-altre-attivita`,           DAY),
      ...make301(`${DAY}/segway-barcellona-tour`,                     CONTACT),
      // ── Night WP pages without dedicated Next.js activity page ────────────
      ...make301(`${NIGHT}/cocktail-lab-barcellona`,                  CONTACT),
      ...make301(`${NIGHT}/night-club-di-barcellona`,                 CONTACT),
      ...make301(`${NIGHT}/migliori-discoteche-barcellona`,           "/addio-al-nubilato/migliori-discoteche-barcellona"),
      ...make301(`${NIGHT}/addio-al-celibato-barcellona-bunny`,       CONTACT),
    ];
  },
  async rewrites() {
    // Each WordPress URL needs both with and without trailing slash
    const wpRoutes = [
      { wp: "/attivita",            next: "/activities" },
      { wp: "/attivita/notturne",   next: "/activities/night" },
      { wp: "/attivita/pomeridiane",next: "/activities/daytime" },
      { wp: "/addio-al-nubilato",   next: "/nubilato" },
      { wp: "/chi-siamo-idee-per-laddio-al-celibato", next: "/about" },
      { wp: "/addio-al-celibato-barcellona-contatti",  next: "/contact" },
      { wp: "/addio-celibato-barcellona-cookie-policy",next: "/legal" },
    ];

    return [
      // Flat routes — with and without trailing slash
      ...wpRoutes.flatMap(({ wp, next }) => [
        { source: wp,        destination: next },
        { source: `${wp}/`,  destination: next },
      ]),
      // Nubilato activity detail slugs
      { source: "/addio-al-nubilato/:slug",    destination: "/nubilato/:slug" },
      { source: "/addio-al-nubilato/:slug/",   destination: "/nubilato/:slug" },
      // Activity detail slugs
      { source: "/attivita/notturne/:slug",    destination: "/activities/night/:slug" },
      { source: "/attivita/notturne/:slug/",   destination: "/activities/night/:slug" },
      { source: "/attivita/pomeridiane/:slug", destination: "/activities/daytime/:slug" },
      { source: "/attivita/pomeridiane/:slug/",destination: "/activities/daytime/:slug" },
    ];
  },
};

export default nextConfig;
