import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Analytics } from "@vercel/analytics/react";
import type { Viewport } from "next";
import { routing } from "@/i18n/routing";
import { isLocale, siteConfig, type Locale } from "@/lib/site";
import { sansArabic, sansLatin, mono } from "@/lib/fonts";
import { JsonLd } from "@/components/seo/json-ld";
import { createOrganizationSchema, createWebsiteSchema } from "@/lib/seo/structured-data";
import { ThemeScript } from "@/components/shared/theme-script";
import { GoogleAnalytics } from "@/components/shared/google-analytics";
import { AnalyticsTracker } from "@/components/shared/analytics-tracker";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  colorScheme: "light dark",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale) || !hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enables static rendering for all pages that call setRequestLocale.
  setRequestLocale(locale as Locale);

  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${sansArabic.variable} ${sansLatin.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ThemeScript />
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        <AnalyticsTracker />
        <GoogleAnalytics />
        <Analytics />
        {/* Site-wide structured data: Organization + WebSite (per locale). */}
        <JsonLd data={createOrganizationSchema()} />
        <JsonLd data={createWebsiteSchema(locale as Locale)} />
      </body>
    </html>
  );
}
