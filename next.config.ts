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
      // Activity detail slugs
      { source: "/attivita/notturne/:slug",    destination: "/activities/night/:slug" },
      { source: "/attivita/notturne/:slug/",   destination: "/activities/night/:slug" },
      { source: "/attivita/pomeridiane/:slug", destination: "/activities/daytime/:slug" },
      { source: "/attivita/pomeridiane/:slug/",destination: "/activities/daytime/:slug" },
    ];
  },
};

export default nextConfig;
