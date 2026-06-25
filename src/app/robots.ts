import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/addio-celibato-barcellona-cookie-policy/"],
      },
    ],
    sitemap: "https://www.addioalcelibato-barcellona.it/sitemap.xml",
  };
}
