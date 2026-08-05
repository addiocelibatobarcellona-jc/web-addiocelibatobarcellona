import { readFileSync } from "fs";
import { join } from "path";
import { client } from "@/sanity/lib/client";

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
// JSON fallback
// ─────────────────────────────────────────────────────────────────────────────

function getJsonContent(): SiteContent {
  const filePath = join(process.cwd(), "public", "data.json");
  const raw = readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as SiteContent;
}

// ─────────────────────────────────────────────────────────────────────────────
// Sanity query — siteSettings only (global nav/footer/contacts)
// Page-specific content still comes from data.json
// ─────────────────────────────────────────────────────────────────────────────

const SITE_SETTINGS_QUERY = `*[_id == "siteSettings"][0]{
  site_email,
  site_whatsapp,
  site_instagram,
  site_facebook,
  navbar_logo_line1,
  navbar_logo_line2,
  navbar_cta_label,
  navbar_links[]{ label, href, children[]{ label, href } },
  footer_tagline,
  footer_description,
  footer_links_services[]{ label, href },
  footer_links_info[]{ label, href },
}`;

export async function getContent(): Promise<SiteContent> {
  const base = getJsonContent();

  try {
    const s = await client.fetch(SITE_SETTINGS_QUERY, {}, { next: { revalidate: 60 } });
    if (!s) return base;

    return {
      ...base,
      site: {
        ...base.site,
        email: s.site_email ?? base.site.email,
        whatsapp: s.site_whatsapp ?? base.site.whatsapp,
      },
      navbar: {
        logo_line1: s.navbar_logo_line1 ?? base.navbar.logo_line1,
        logo_line2: s.navbar_logo_line2 ?? base.navbar.logo_line2,
        cta_label: s.navbar_cta_label ?? base.navbar.cta_label,
        links: s.navbar_links?.length ? s.navbar_links : base.navbar.links,
      },
      footer: {
        ...base.footer,
        logo_line1: s.footer_tagline ?? base.footer.logo_line1,
        description: s.footer_description ?? base.footer.description,
        activity_links: s.footer_links_services?.length
          ? s.footer_links_services
          : base.footer.activity_links,
        legal_links: s.footer_links_info?.length
          ? s.footer_links_info
          : base.footer.legal_links,
      },
    };
  } catch {
    return base;
  }
}
