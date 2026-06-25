import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "addioalcelibato-barcellona.it" },
    ],
  },
  turbopack: {
    root: path.resolve(__dirname),
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
