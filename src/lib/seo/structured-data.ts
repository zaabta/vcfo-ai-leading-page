import type {
  Article,
  BreadcrumbList,
  FAQPage,
  Organization,
  SoftwareApplication,
  WebSite,
  WithContext,
} from "schema-dts";
import { siteConfig } from "@/lib/site";

/**
 * Structured-data (JSON-LD) builders.
 *
 * Rule: only emit schemas that accurately describe visible page content.
 * Organization + WebSite are emitted once in the root layout; page-level
 * schemas (FAQPage, SoftwareApplication, BreadcrumbList, BlogPosting) are
 * emitted by the pages that actually render that content.
 */

export function createOrganizationSchema(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: "VCFO",
    url: siteConfig.url,
    logo: `${siteConfig.url}/favicon.svg`,
    description: siteConfig.description.en,
    sameAs: [`${siteConfig.url}/ar`, `${siteConfig.url}/en`, "https://wa.me/905354569184"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      availableLanguage: ["Arabic", "English"],
      url: "https://wa.me/905354569184",
    },
  };
}

export function createWebsiteSchema(locale: "ar" | "en"): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: `${siteConfig.url}/${locale}`,
    name: siteConfig.name,
    description: siteConfig.description[locale],
    inLanguage: locale === "ar" ? "ar-SA" : "en-US",
    publisher: { "@id": `${siteConfig.url}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/${locale}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
      // `query-input` follows Google's documented SearchAction format;
      // schema-dts doesn't model it, so this one property is asserted.
    } as WebSite["potentialAction"],
  };
}

export function createSoftwareApplicationSchema(
  locale: "ar" | "en",
  canonical: string,
): WithContext<SoftwareApplication> {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: siteConfig.description[locale],
    url: canonical,
    inLanguage: locale === "ar" ? "ar-SA" : "en-US",
    offers: {
      "@type": "Offer",
      priceCurrency: "SAR",
      price: "349",
      availability: "https://schema.org/InStock",
    },
    featureList: [
      "Financial Truth",
      "Financial statements",
      "Analytics and KPIs",
      "Data validation",
      "Multi-company and multi-branch reporting",
    ],
  };
}

export function createFaqSchema(
  items: { question: string; answer: string }[],
): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

type BreadcrumbItem = { name: string; path?: string };

export function createBreadcrumbSchema(
  locale: "ar" | "en",
  items: BreadcrumbItem[],
): WithContext<BreadcrumbList> {
  const crumbs = [{ name: locale === "ar" ? "الرئيسية" : "Home", path: "" }, ...items];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path !== undefined
        ? { item: `${siteConfig.url}/${locale}${item.path ? `/${item.path}` : ""}` }
        : {}),
    })),
  };
}

export function createArticleSchema(
  locale: "ar" | "en",
  post: {
    slug: string;
    title: string;
    description: string;
    featuredImage?: string;
    publishedAt: string;
    updatedAt?: string;
    category: string;
    author?: string;
  },
): WithContext<Article> {
  const canonical = `${siteConfig.url}/${locale}/blog/${post.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonical}#article`,
    headline: post.title,
    description: post.description,
    image: `${siteConfig.url}${post.featuredImage ?? `/og/blog/${post.slug}-${locale}.png`}`,
    url: canonical,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    inLanguage: locale === "ar" ? "ar-SA" : "en-US",
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    mainEntityOfPage: { "@id": canonical },
    author: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: post.author ?? siteConfig.name,
    },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    articleSection: post.category,
  };
}
