import type { BlogPost } from "./types";
import postsJson from "./posts.json";

/**
 * Blog content — the existing VCFO article set, kept as pure data
 * (posts.json) so it stays fully separated from presentation and can be
 * consumed both by Next.js and by build tooling (e.g. OG image generation).
 */
export const BLOG_AUTHOR = postsJson.author;

export type BlogCategoryId = "product" | "analysis" | "data-quality" | "companies";

export const blogPosts: BlogPost[] = postsJson.posts as BlogPost[];

/** Look up one article by its public slug. */
export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
