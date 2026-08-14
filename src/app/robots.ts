import { siteConfig } from "@/lib/site";
import type { MetadataRoute } from "next";

/**
 * Static robots.txt — public marketing pages are discoverable, while
 * private/application areas are explicitly disallowed:
 *  - /api/* (internal handlers)
 *  - /dashboard/* (future authenticated application)
 *  - /admin/*, /auth/* (never public)
 * Legitimate AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
 * are allowed to read all public content for AI-search / GEO.
 */
export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/admin/", "/auth/"],
      },
      {
        // GEO: keep public content available to AI answer engines.
        userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"],
        allow: ["/$", "/ar/", "/en/", "/ar/blog/", "/en/blog/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
