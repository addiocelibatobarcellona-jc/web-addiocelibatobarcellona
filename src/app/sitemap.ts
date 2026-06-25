import type { MetadataRoute } from "next";
import activitiesDetail from "../../public/activities-detail.json";

const BASE = "https://www.addioalcelibato-barcellona.it";

export default function sitemap(): MetadataRoute.Sitemap {
  const activityUrls: MetadataRoute.Sitemap = (activitiesDetail as Array<{ slug: string; category: string }>).map((a) => ({
    url: `${BASE}/attivita/${a.category}/${a.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: `${BASE}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE}/attivita/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/attivita/notturne/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE}/attivita/pomeridiane/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE}/addio-al-nubilato/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE}/chi-siamo-idee-per-laddio-al-celibato/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE}/addio-al-celibato-barcellona-contatti/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...activityUrls,
  ];
}
