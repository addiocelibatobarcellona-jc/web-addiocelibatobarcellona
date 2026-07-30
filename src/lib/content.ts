import { readFileSync } from "fs";
import { join } from "path";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface NavLink {
  href: string;
  label: string;
  children?: { label: string; href: string }[];
}

export interface Activity {
  icon: string;
  name: string;
  desc: string;
  price: string;
  href: string;
  tag: string | null;
  image?: string;
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

export interface ActivityCategory {
  headline: string;
  headline_accent: string;
  meta_title: string;
  meta_desc: string;
  seo_text: string;
}

export interface SiteContent {
  site: {
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
  };
  navbar: {
    logo_line1: string;
    logo_line2: string;
    cta_label: string;
    links: NavLink[];
  };
  hero: {
    headline_line1: string;
    headline_accent: string;
    subheadline: string;
    description: string;
  };
  activities: {
    all: ActivityCategory;
    night: ActivityCategory;
    daytime: ActivityCategory;
  };
  notturne: {
    activities: Activity[];
  };
  pomeridiane: {
    cta_all_href: string;
    activities: Activity[];
  };
  perche: {
    section_title_line1: string;
    section_title_accent: string;
    highlight_text: string;
    items: PercheItem[];
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
