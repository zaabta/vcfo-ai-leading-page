import type { Metadata } from "next";
import { buildLanguageAlternates } from "./canonical";
import { siteConfig, type Locale } from "@/lib/site";

type OgImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

type PageSeoInput = {
  locale: Locale;
  /** Path inside the locale, e.g. "blog" or "" for home. */
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: OgImage;
  ogType?: "website" | "article";
  noIndex?: boolean;
};

/**
 * Creates a fully localized Metadata object for a page:
 * title, description, canonical URL, hreflang alternates, Open Graph and
 * Twitter/X cards. Every indexable page calls this with its own strings —
 * there is no single global metadata blob.
 */
export function createPageMetadata({
  locale,
  path,
  title,
  description,
  keywords,
  ogImage,
  ogType = "website",
  noIndex = false,
}: PageSeoInput): Metadata {
  const { canonical, languages } = buildLanguageAlternates(locale, path);
  const image: OgImage = ogImage ?? {
    url: siteConfig.ogImage,
    width: 1200,
    height: 630,
    alt: "VCFO — Financial Intelligence Platform",
  };
  const ogLocale = locale === "ar" ? "ar_SA" : "en_US";

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    ...(keywords?.length ? { keywords: keywords.join(", ") } : {}),
    authors: [{ name: siteConfig.name }],
    applicationName: siteConfig.name,
    alternates: { canonical, languages },
    openGraph: {
      type: ogType,
      url: canonical,
      siteName: siteConfig.name,
      locale: ogLocale,
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitter,
      title,
      description,
      images: [image.url],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}
