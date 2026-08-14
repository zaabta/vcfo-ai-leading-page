import type { MetadataRoute } from "next";
import { siteConfig, type Locale } from "@/lib/site";
import { buildCanonical } from "@/lib/seo/canonical";
import { blogPosts } from "@/content/blog";

type SitemapEntry = MetadataRoute.Sitemap[number];

/**
 * Dynamic sitemap — public pages for both locales plus every blog article
 * (both locales). New articles are included automatically.
 * Private areas (dashboard/auth/admin/api) are excluded by design.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths: {
    path: string;
    priority: number;
    changeFrequency: SitemapEntry["changeFrequency"];
  }[] = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "about", priority: 0.6, changeFrequency: "monthly" },
    { path: "blog", priority: 0.7, changeFrequency: "weekly" },
    { path: "privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "terms", priority: 0.3, changeFrequency: "yearly" },
  ];

  const entries: SitemapEntry[] = [];

  for (const locale of siteConfig.locales as readonly Locale[]) {
    for (const p of staticPaths) {
      entries.push({
        url: buildCanonical(locale, p.path),
        lastModified: new Date("2026-08-13"),
        changeFrequency: p.changeFrequency,
        priority: p.path === "" ? p.priority : p.priority,
      });
    }

    for (const post of blogPosts) {
      entries.push({
        url: buildCanonical(locale, `blog/${post.slug}`),
        lastModified: new Date(post.updatedAt ?? post.publishedAt),
        changeFrequency: "monthly",
        priority: post.featured ? 0.7 : 0.6,
      });
    }
  }

  return entries;
}
