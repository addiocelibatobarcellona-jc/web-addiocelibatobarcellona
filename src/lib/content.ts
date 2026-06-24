import { readFileSync } from "fs";
import { join } from "path";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface NavLink {
  href: string;
  label: string;
}

export interface Activity {
  emoji: string;
  name: string;
  desc: string;
  price: string;
  href: string;
  tag: string | null;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface PercheItem {
  icon: string;
  title: string;
  desc: string;
}

export interface Testimonial {
  name: string;
  city: string;
  stars: number;
  text: string;
}

export interface SiteContent {
  site: {
    name: string;
    tagline: string;
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
    founded: string;
  };
  navbar: {
    logo_line1: string;
    logo_line2: string;
    cta_label: string;
    links: NavLink[];
  };
  hero: {
    badge: string;
    headline_line1: string;
    headline_line2: string;
    headline_accent: string;
    subheadline: string;
    description: string;
    description_strong: string;
    cta_primary: string;
    cta_secondary: string;
    trust_badges: string[];
  };
  marquee: string[];
  stats: Stat[];
  notturne: {
    section_label: string;
    section_title_line1: string;
    section_title_accent: string;
    cta_all: string;
    cta_all_href: string;
    activities: Activity[];
  };
  pomeridiane: {
    section_label: string;
    section_title_line1: string;
    section_title_accent: string;
    cta_all: string;
    cta_all_href: string;
    activities: Activity[];
  };
  perche: {
    section_label: string;
    section_title_line1: string;
    section_title_accent: string;
    highlight_text: string;
    highlight_cta: string;
    items: PercheItem[];
  };
  testimonials: {
    section_label: string;
    section_title_line1: string;
    section_title_accent: string;
    items: Testimonial[];
    rating_google: string;
    rating_trustpilot: string;
  };
  cta_banner: {
    label: string;
    headline_line1: string;
    headline_accent: string;
    description: string;
    description_strong: string;
    cta_primary: string;
    cta_secondary: string;
  };
  footer: {
    logo_line1: string;
    logo_line2: string;
    description: string;
    activity_links: NavLink[];
    legal_links: NavLink[];
    copyright: string;
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Data source
// When you add Sanity, replace this function body with a Sanity fetch:
//
//   import { createClient } from 'next-sanity'
//   const client = createClient({ projectId, dataset, apiVersion })
//   export async function getContent(): Promise<SiteContent> {
//     return client.fetch(`*[_type == "siteContent"][0]`)
//   }
// ─────────────────────────────────────────────────────────────────────────────

export function getContent(): SiteContent {
  const filePath = join(process.cwd(), "public", "data.json");
  const raw = readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as SiteContent;
}
