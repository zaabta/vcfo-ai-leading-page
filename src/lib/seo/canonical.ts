import { siteConfig, type Locale } from "@/lib/site";

/**
 * Builds an absolute canonical URL for a page inside a locale.
 * The home page of a locale renders as `/ar` or `/en` (no trailing slash).
 */
export function buildCanonical(locale: Locale, path: string): string {
  const segments = [locale, ...path.split("/").filter(Boolean)];
  return `${siteConfig.url}/${segments.join("/")}`;
}

/**
 * hreflang alternates: every indexable page references its sibling locale.
 * x-default points at the default (Arabic) locale.
 */
export function buildLanguageAlternates(
  locale: Locale,
  path: string,
): {
  canonical: string;
  languages: Record<string, string>;
} {
  const canonical = buildCanonical(locale, path);
  const languages: Record<string, string> = {};
  for (const l of siteConfig.locales) {
    languages[l] = buildCanonical(l, path);
  }
  languages["x-default"] = buildCanonical(siteConfig.defaultLocale, path);
  return { canonical, languages };
}
