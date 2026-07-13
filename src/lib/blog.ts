import rawPosts from "../../public/blog-posts.json";

export interface BlogPost {
  title: string;
  slug: string;
  url: string;
  date: string;
  metaDescription: string | null;
  featuredImage: string | null;
  bodyMarkdown: string;
}

const ALL_POSTS = rawPosts as BlogPost[];

export const POSTS_PER_PAGE = 10;

export function getAllPosts(): BlogPost[] {
  return ALL_POSTS;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return ALL_POSTS.find((p) => p.slug === slug);
}

export function getPaginatedPosts(page: number) {
  const total = ALL_POSTS.length;
  const totalPages = Math.ceil(total / POSTS_PER_PAGE);
  const start = (page - 1) * POSTS_PER_PAGE;
  return {
    posts: ALL_POSTS.slice(start, start + POSTS_PER_PAGE),
    totalPages,
    total,
    page,
  };
}

export function getAllPostSlugs(): string[] {
  return ALL_POSTS.map((p) => p.slug);
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
