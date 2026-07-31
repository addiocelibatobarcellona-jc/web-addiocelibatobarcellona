import type { MetadataRoute } from "next";
import blogPosts from "../../public/blog-posts.json";
import activitiesDetail from "../../public/activities-detail.json";

const BASE = "https://www.addioalcelibato-barcellona.it";
const NOW = new Date();

// Nubilato activity detail pages (mirror WordPress URL structure)
const NUBILATO_ACTIVITY_SLUGS = [
  "addio-nubilato-bodysushi-barcellona",
  "addio-al-nubilato-barcellona-marines",
  "addio-al-nubilato-barcellona-limobus",
  "addio-nubilato-spogliarello-limousine-barcellona",
  "addio-nubilato-giretto-limo",
  "addio-nubilato-spogliarellista-show-barcellona",
  "addio-nubilato-spogliarellista-limousine-barcellona",
  "caccia-al-tesoro-addio-nubilato-barcellona",
  "addio-al-nubilato-collettivo-barcellona",
  "escape-room-game-nubilato-barcellona",
  "migliori-discoteche-barcellona",
  "addio-al-nubilato-con-spogliarellista-a-barcellona",
  "cheeky-butler-barcellona",
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Activity detail pages — celibato (/attivita/notturne|pomeridiane/slug/)
  const activityUrls: MetadataRoute.Sitemap = (
    activitiesDetail as Array<{ slug: string; category: string }>
  ).map((a) => ({
    url: `${BASE}/attivita/${a.category}/${a.slug}/`,
    lastModified: NOW,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Activity detail pages — nubilato (/addio-al-nubilato/slug/)
  const nubilatoActivityUrls: MetadataRoute.Sitemap = NUBILATO_ACTIVITY_SLUGS.map((slug) => ({
    url: `${BASE}/addio-al-nubilato/${slug}/`,
    lastModified: NOW,
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  // Blog post pages — root-level slugs (/slug/)
  const postUrls: MetadataRoute.Sitemap = (
    blogPosts as Array<{ slug: string }>
  ).map((p) => ({
    url: `${BASE}/${p.slug}/`,
    lastModified: NOW,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [
    // ── Core pages ──────────────────────────────────────────────────────────
    { url: `${BASE}/`,                                           lastModified: NOW, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/attivita/`,                                  lastModified: NOW, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/attivita/notturne/`,                         lastModified: NOW, changeFrequency: "weekly",  priority: 0.85 },
    { url: `${BASE}/attivita/pomeridiane/`,                      lastModified: NOW, changeFrequency: "weekly",  priority: 0.85 },
    { url: `${BASE}/addio-al-nubilato/`,                         lastModified: NOW, changeFrequency: "weekly",  priority: 0.85 },
    { url: `${BASE}/addio-al-celibato-barcellona-contatti/`,     lastModified: NOW, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/addio-al-celibato-barcellona-blog/`,         lastModified: NOW, changeFrequency: "weekly",  priority: 0.75 },
    { url: `${BASE}/chi-siamo-idee-per-laddio-al-celibato/`,     lastModified: NOW, changeFrequency: "monthly", priority: 0.6 },

    // ── Special standalone pages ─────────────────────────────────────────────
    { url: `${BASE}/addio-al-celibato-tutti-al-mare/`,           lastModified: NOW, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/addio-celibato-paddle-surf-barcellona/`,     lastModified: NOW, changeFrequency: "monthly", priority: 0.6 },

    // ── Legal ────────────────────────────────────────────────────────────────
    { url: `${BASE}/addio-celibato-barcellona-cookie-policy/`,   lastModified: NOW, changeFrequency: "yearly",  priority: 0.2 },
    { url: `${BASE}/addio-al-celibato-barcellona-privacy/`,      lastModified: NOW, changeFrequency: "yearly",  priority: 0.2 },

    // ── Dynamic ──────────────────────────────────────────────────────────────
    ...activityUrls,
    ...nubilatoActivityUrls,
    ...postUrls,
  ];
}
