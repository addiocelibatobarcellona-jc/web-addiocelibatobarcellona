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
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        source: "/(.*)\\.(woff2|woff|ttf)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/(.*)\\.(jpg|jpeg|png|webp|svg|ico|gif)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/(.*)\\.(js|css)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      { source: "/attivita", destination: "/activities" },
      { source: "/attivita/notturne", destination: "/activities/night" },
      { source: "/attivita/pomeridiane", destination: "/activities/daytime" },
      { source: "/addio-al-nubilato", destination: "/nubilato" },
      { source: "/attivita/notturne/:slug", destination: "/activities/night/:slug" },
      { source: "/attivita/pomeridiane/:slug", destination: "/activities/daytime/:slug" },
      {
        source: "/chi-siamo-idee-per-laddio-al-celibato",
        destination: "/about",
      },
      {
        source: "/addio-al-celibato-barcellona-contatti",
        destination: "/contact",
      },
      {
        source: "/addio-celibato-barcellona-cookie-policy",
        destination: "/legal",
      },
    ];
  },
};

export default nextConfig;
