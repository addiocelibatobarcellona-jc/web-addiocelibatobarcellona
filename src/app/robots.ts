import type { MetadataRoute } from "next";

const BASE = "https://www.addioalcelibato-barcellona.it";

// LLM crawlers that should have full access
const LLM_BOTS = [
  "GPTBot",          // OpenAI ChatGPT
  "ChatGPT-User",    // ChatGPT browsing
  "OAI-SearchBot",   // OpenAI search
  "ClaudeBot",       // Anthropic Claude
  "anthropic-ai",    // Anthropic general
  "PerplexityBot",   // Perplexity AI
  "Google-Extended", // Google Gemini / AI Overviews
  "Googlebot",       // Google Search (covers AI Overviews)
  "cohere-ai",       // Cohere Command
  "FacebookBot",     // Meta AI
  "Applebot",        // Apple AI
  "Bytespider",      // ByteDance / TikTok AI
  "YouBot",          // You.com AI search
  "CCBot",           // Common Crawl (used by many AI training runs)
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default — allow everything except legal utility pages
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/addio-celibato-barcellona-cookie-policy/",
          "/addio-al-celibato-barcellona-contatti/conferma/",
        ],
      },
      // Explicit full-access rules for LLM crawlers
      ...LLM_BOTS.map((bot) => ({
        userAgent: bot,
        allow: "/",
      })),
    ],
    sitemap: `${BASE}/sitemap_index.xml`,
    host: BASE,
  };
}
