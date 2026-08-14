import type { Metadata } from "next";
import { createPageMetadata } from "./metadata";
import { siteConfig, type Locale } from "@/lib/site";

type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  featuredImage?: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  author?: string;
};

/**
 * Dedicated, fully independent metadata for a blog article:
 * Article Open Graph type, published/modified times and authors.
 */
export function createBlogMetadata(locale: Locale, post: BlogPostMeta): Metadata {
  const base = createPageMetadata({
    locale,
    path: `blog/${post.slug}`,
    title: post.title,
    description: post.description,
    ogType: "article",
    ogImage: {
      url: post.featuredImage ?? `/og/blog/${post.slug}-${locale}.png`,
      width: 1200,
      height: 630,
      alt: post.title,
    },
  });

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author ?? siteConfig.name],
      section: post.category,
      tags: [post.category, siteConfig.name],
    },
  };
}
