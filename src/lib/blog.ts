import { sanityFetch } from "@/sanity/lib/fetch";
import {
  ALL_BLOG_POSTS_QUERY,
  BLOG_POST_BY_SLUG_QUERY,
  BLOG_SLUGS_QUERY,
} from "@/sanity/lib/queries";

export interface BlogPost {
  title: string;
  slug: string;
  url?: string;
  date: string;
  metaDescription: string | null;
  featuredImage: string | null;
  bodyMarkdown: string;
}

export const POSTS_PER_PAGE = 10;

function cleanBody(post: BlogPost): BlogPost {
  return {
    ...post,
    bodyMarkdown: post.bodyMarkdown
      ?.replace(/\n*###\s*Invia commento[\s\S]*/i, "")
      .trim() ?? "",
  };
}

// ── JSON fallback (build-time / env not set) ──────────────────────────────────

function loadJsonPosts(): BlogPost[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const raw = require("../../public/blog-posts.json") as BlogPost[];
  return raw.map(cleanBody);
}

// ── Public API ────────────────────────────────────────────────────────────────

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return loadJsonPosts();
  }
  try {
    const posts = await sanityFetch<BlogPost[]>({
      query: ALL_BLOG_POSTS_QUERY,
      tags: ["blogPost"],
    });
    return (posts ?? []).map(cleanBody);
  } catch {
    return loadJsonPosts();
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return loadJsonPosts().find((p) => p.slug === slug);
  }
  try {
    const post = await sanityFetch<BlogPost | null>({
      query: BLOG_POST_BY_SLUG_QUERY,
      params: { slug },
      tags: [`blogPost:${slug}`],
    });
    return post ? cleanBody(post) : undefined;
  } catch {
    return loadJsonPosts().find((p) => p.slug === slug);
  }
}

export async function getPaginatedPosts(page: number) {
  const all = await getAllPosts();
  const total = all.length;
  const totalPages = Math.ceil(total / POSTS_PER_PAGE);
  const start = (page - 1) * POSTS_PER_PAGE;
  return {
    posts: all.slice(start, start + POSTS_PER_PAGE),
    totalPages,
    total,
    page,
  };
}

export async function getAllPostSlugs(): Promise<string[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return loadJsonPosts().map((p) => p.slug);
  }
  try {
    const slugs = await sanityFetch<{ slug: string }[]>({
      query: BLOG_SLUGS_QUERY,
      tags: ["blogPost"],
    });
    return slugs.map((s) => s.slug);
  } catch {
    return loadJsonPosts().map((p) => p.slug);
  }
}

export function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("it-IT", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}
