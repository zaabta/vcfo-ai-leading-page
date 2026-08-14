import type { Locale } from "@/lib/site";

/** Shared blog content model. Content stays fully separated from presentation. */
export type BlogPost = {
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  readMin: number;
  category: "product" | "analysis" | "data-quality" | "companies";
  featured?: boolean;
  tags: string[];
  titleAr: string;
  titleEn: string;
  seoTitleAr: string;
  seoTitleEn: string;
  seoDescriptionAr: string;
  seoDescriptionEn: string;
  excerptAr: string;
  excerptEn: string;
  bodyAr: string[];
  bodyEn: string[];
};

export type BlogCategory = {
  id: BlogPost["category"];
  labelAr: string;
  labelEn: string;
};

export const blogCategories: BlogCategory[] = [
  { id: "product", labelAr: "المنتج", labelEn: "Product" },
  { id: "analysis", labelAr: "تحليل مالي", labelEn: "Analysis" },
  { id: "data-quality", labelAr: "جودة البيانات", labelEn: "Data quality" },
  { id: "companies", labelAr: "الشركات والفروع", labelEn: "Companies & branches" },
];

export function getCategoryLabel(id: BlogPost["category"], locale: Locale): string {
  const category = blogCategories.find((c) => c.id === id);
  return category ? (locale === "ar" ? category.labelAr : category.labelEn) : id;
}

export function getPostTitle(post: BlogPost, locale: Locale): string {
  return locale === "ar" ? post.titleAr : post.titleEn;
}

export function getPostSeoTitle(post: BlogPost, locale: Locale): string {
  return locale === "ar" ? post.seoTitleAr : post.seoTitleEn;
}

export function getPostDescription(post: BlogPost, locale: Locale): string {
  return locale === "ar" ? post.seoDescriptionAr : post.seoDescriptionEn;
}

export function getPostExcerpt(post: BlogPost, locale: Locale): string {
  return locale === "ar" ? post.excerptAr : post.excerptEn;
}

export function getPostBody(post: BlogPost, locale: Locale): string[] {
  return locale === "ar" ? post.bodyAr : post.bodyEn;
}

/** Machine-readable date for the active locale. */
export function formatDate(date: string, locale: Locale): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
