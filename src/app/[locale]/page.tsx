import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations, getMessages } from "next-intl/server";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/json-ld";
import { createFaqSchema, createSoftwareApplicationSchema } from "@/lib/seo/structured-data";
import { buildCanonical } from "@/lib/seo/canonical";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero, TrustBar } from "@/components/home/hero";
import { Problem, Solution, HowItWorks, FinancialTruth } from "@/components/home/sections-a";
import {
  Statements,
  CashFlow,
  Analytics,
  HealthScore,
  MultiCompany,
} from "@/components/home/sections-b";
import { DataQuality, ErrorResolution } from "@/components/home/sections-c";
import { AICfo, AICapabilities, Scenarios, Forecast } from "@/components/home/sections-d";
import { Pricing } from "@/components/home/pricing";
import { Compliance, Testimonials } from "@/components/home/trust";
import { CTA, FAQ } from "@/components/home/sections-e";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });

  return createPageMetadata({
    locale: locale as Locale,
    path: "",
    title: t("home.title"),
    description: t("home.description"),
    keywords: t("home.keywords")
      .split(",")
      .map((k) => k.trim()),
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  // FAQ structured data must match the visible FAQ content — both are
  // sourced from the same locale messages.
  const messages = await getMessages();
  const faqMessages = (messages.Home?.faq ?? {}) as Record<string, string>;
  const faqItems = Array.from({ length: 10 }, (_, i) => {
    const question = faqMessages[`q${i + 1}`];
    const answer = faqMessages[`a${i + 1}`];
    return question && answer ? { question, answer } : null;
  }).filter((item): item is { question: string; answer: string } => item !== null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main">
        <Hero />
        <TrustBar />
        <Problem />
        <Solution />
        <HowItWorks />
        <FinancialTruth />
        <Statements />
        <CashFlow />
        <Analytics />
        <HealthScore />
        <MultiCompany />
        <DataQuality />
        <ErrorResolution />
        <Compliance />
        <AICfo />
        <AICapabilities />
        <Scenarios />
        <Forecast />
        <Pricing />
        <Testimonials />
        <CTA />
        <FAQ />
      </main>
      <Footer />

      {/* Page-level structured data: SoftwareApplication + FAQPage. */}
      <JsonLd
        data={createSoftwareApplicationSchema(
          locale as Locale,
          buildCanonical(locale as Locale, ""),
        )}
      />
      <JsonLd data={createFaqSchema(faqItems)} />
    </div>
  );
}
