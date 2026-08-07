import { groq } from "next-sanity";
import { client } from "./client";

const SEO_REVALIDATE = { next: { revalidate: 60 } } as const;

/** Fetch metaTitle + metaDesc from any singleton page document. Returns nulls if not set. */
export async function fetchPageSeo(type: string): Promise<{ metaTitle: string | null; metaDesc: string | null }> {
  const data = await client.fetch<{ metaTitle?: string; metaDesc?: string } | null>(
    groq`*[_type == $type][0]{ metaTitle, metaDesc }`,
    { type },
    SEO_REVALIDATE
  );
  return { metaTitle: data?.metaTitle ?? null, metaDesc: data?.metaDesc ?? null };
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

// ── Activities ────────────────────────────────────────────────────────────────

export const ALL_ACTIVITIES_QUERY = groq`
  *[_type == "activity"] | order(name asc) {
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
    meta_desc
  }
`;

export const ACTIVITY_BY_SLUG_QUERY = groq`
  *[_type == "activity" && slug.current == $slug][0] {
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
    meta_desc
  }
`;

export const ACTIVITY_SLUGS_QUERY = groq`
  *[_type == "activity"] { "slug": slug.current, category }
`;

// ── Blog ─────────────────────────────────────────────────────────────────────

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
