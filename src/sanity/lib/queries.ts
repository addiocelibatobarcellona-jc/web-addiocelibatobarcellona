import { groq } from "next-sanity";
import { client } from "./client";

const REVALIDATE = { next: { revalidate: 60 } } as const;

// ── SEO helper ────────────────────────────────────────────────────────────────

/** Fetch metaTitle + metaDesc + metaKeywords from any singleton page document. */
export async function fetchPageSeo(type: string): Promise<{ metaTitle: string | null; metaDesc: string | null; metaKeywords: string[] | null }> {
  const data = await client.fetch<{ metaTitle?: string; metaDesc?: string; metaKeywords?: string[] } | null>(
    groq`*[_type == $type][0]{ metaTitle, metaDesc, metaKeywords }`,
    { type },
    REVALIDATE
  );
  return {
    metaTitle: data?.metaTitle ?? null,
    metaDesc: data?.metaDesc ?? null,
    metaKeywords: data?.metaKeywords?.length ? data.metaKeywords : null,
  };
}

// ── Site Settings ─────────────────────────────────────────────────────────────

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    site,
    navbar,
    hero,
    activities,
    notturne,
    pomeridiane,
    perche,
    footer
  }
`;

// ── Home Page ─────────────────────────────────────────────────────────────────

export const HOME_PAGE_QUERY = groq`
  *[_type == "homePage"][0] {
    hero_headline,
    hero_headline_accent,
    hero_subheadline,
    perche_headline,
    perche_items,
    metaTitle,
    metaDesc,
    metaKeywords
  }
`;

// ── Activities ────────────────────────────────────────────────────────────────

const ACTIVITY_FIELDS = groq`
  "slug": slug.current,
  category,
  name,
  price,
  intro,
  includes,
  description,
  notes,
  images,
  coverImage,
  gridImage,
  body_html,
  meta_title,
  meta_desc,
  keywords
`;

export const ALL_ACTIVITIES_QUERY = groq`
  *[_type == "activity" && category in ["night", "daytime"]] | order(name asc) {
    ${ACTIVITY_FIELDS}
  }
`;

export const ALL_NUBILATO_ACTIVITIES_QUERY = groq`
  *[_type == "activity" && category == "nubilato"] | order(name asc) {
    ${ACTIVITY_FIELDS}
  }
`;

export const ACTIVITY_BY_SLUG_QUERY = groq`
  *[_type == "activity" && slug.current == $slug][0] {
    ${ACTIVITY_FIELDS}
  }
`;

export const ACTIVITY_SLUGS_QUERY = groq`
  *[_type == "activity"] { "slug": slug.current, category }
`;

// ── Cookie Banner ─────────────────────────────────────────────────────────────

export const COOKIE_BANNER_QUERY = groq`
  *[_type == "cookieConsent"][0] {
    title,
    description,
    policy_label,
    policy_href,
    btn_configure,
    btn_reject,
    btn_accept
  }
`;

export async function fetchCookieBanner(): Promise<{
  title: string; description: string; policy_label: string;
  policy_href: string; btn_configure: string; btn_reject: string; btn_accept: string;
} | null> {
  try {
    return await client.fetch(COOKIE_BANNER_QUERY, {}, REVALIDATE);
  } catch {
    return null;
  }
}

// ── Activities Page ───────────────────────────────────────────────────────────

export const ACTIVITIES_PAGE_QUERY = groq`
  *[_type == "activitiesPage"][0] {
    all_meta_title,
    all_meta_desc,
    all_seo_text,
    night_meta_title,
    night_meta_desc,
    night_seo_text,
    daytime_meta_title,
    daytime_meta_desc,
    daytime_seo_text,
  }
`;

// ── Blog ──────────────────────────────────────────────────────────────────────

export const ALL_BLOG_POSTS_QUERY = groq`
  *[_type == "blogPost"] | order(date desc) {
    title,
    "slug": slug.current,
    date,
    metaDescription,
    featuredImage,
    bodyMarkdown
  }
`;

export const BLOG_POST_BY_SLUG_QUERY = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    date,
    metaDescription,
    featuredImage,
    bodyMarkdown
  }
`;

export const BLOG_SLUGS_QUERY = groq`
  *[_type == "blogPost"] { "slug": slug.current }
`;
