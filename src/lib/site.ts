/**
 * Central site configuration — single source of truth for canonical URLs,
 * brand metadata and locale wiring. Never derive these values per page.
 */
export const siteConfig = {
  name: "VCFO",
  url: "https://vcfo-ai.com",
  locales: ["ar", "en"] as const,
  defaultLocale: "ar" as const,
  twitter: "@VCFO",
  themeColor: "#0b1110",
  ogImage: "/og/default.png",
  /**
   * Organization description used for Organization/WebSite structured data.
   */
  description: {
    ar: "VCFO منصة ذكاء مالي للشركات تساعدك على تنظيف البيانات المالية، إنشاء Financial Truth، وتحويل الأرقام إلى مؤشرات وتحليلات واضحة لاتخاذ قرارات أسرع وأذكى.",
    en: "VCFO is a financial intelligence platform that helps companies clean their financial data, build a Financial Truth layer, and turn numbers into clear metrics and analysis for faster, smarter decisions.",
  },
} as const;

export type Locale = (typeof siteConfig.locales)[number];

export function isLocale(value: string): value is Locale {
  return (siteConfig.locales as readonly string[]).includes(value);
}

export function otherLocale(locale: Locale): Locale {
  return locale === "ar" ? "en" : "ar";
}

export function localeLabel(locale: Locale): string {
  return locale === "ar" ? "العربية" : "English";
}
