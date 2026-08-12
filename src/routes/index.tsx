import { createFileRoute } from "@tanstack/react-router";
import { LangProvider } from "@/components/vcfo/lang";
import { Navbar } from "@/components/vcfo/nav";
import { Hero, TrustBar } from "@/components/vcfo/hero";
import { Problem, Solution, HowItWorks, FinancialTruth } from "@/components/vcfo/sections-a";
import {
  Statements,
  CashFlow,
  Analytics,
  HealthScore,
  MultiCompany,
} from "@/components/vcfo/sections-b";
import { DataQuality, ErrorResolution, Security } from "@/components/vcfo/sections-c";
import { AICfo, AICapabilities, Scenarios, Forecast } from "@/components/vcfo/sections-d";
import { Pricing } from "@/components/vcfo/pricing";
import { Compliance, Testimonials } from "@/components/vcfo/trust";
import { CTA, FAQ, Footer } from "@/components/vcfo/sections-e";

const title = "VCFO | ذكاء مالي | Financial Intelligence Platform";
const description =
  "VCFO منصة ذكاء مالي للشركات تساعدك على تنظيف البيانات المالية، إنشاء Financial Truth، وتحويل الأرقام إلى مؤشرات وتحليلات واضحة لاتخاذ قرارات أسرع وأذكى.";
const keywords =
  "VCFO, ذكاء مالي, Financial Intelligence, Financial Truth, تحليل مالي, مؤشرات مالية, قوائم مالية, إدارة الشركات, CFO dashboard, business intelligence, financial reporting, forecasting, data validation";
const canonicalUrl = "https://vcfo-ai.com";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "ما هو VCFO؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "VCFO منصة ذكاء مالي تحوّل البيانات المحاسبية إلى قوائم مالية موثوقة ومؤشرات وتحليلات تساعد الشركات على اتخاذ القرار بثقة.",
      },
    },
    {
      "@type": "Question",
      name: "هل يمكن رفع ملفات Excel أو CSV؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "نعم، يمكنك رفع ملفات Trial Balance وChart of Accounts بصيغة Excel أو CSV داخل المنصة.",
      },
    },
    {
      "@type": "Question",
      name: "هل يدعم VCFO إدارة الفروع والشركات؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "نعم، يدعم VCFO إدارة الشركات المتعددة والفروع مع مقارنة الأداء والمؤشرات في واجهة موحدة.",
      },
    },
  ],
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "VCFO",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: description,
  url: canonicalUrl,
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "keywords", content: keywords },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "author", content: "VCFO" },
      { name: "application-name", content: "VCFO" },
      { name: "theme-color", content: "#0b1110" },
      { name: "color-scheme", content: "light dark" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "VCFO" },
      { property: "og:url", content: canonicalUrl },
      { property: "og:locale", content: "ar_SA" },
      { property: "og:image", content: "https://vcfo-ai.com/og-image.svg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: "https://vcfo-ai.com/og-image.svg" },
      { name: "twitter:site", content: "@VCFO" },
    ],
    links: [
      { rel: "canonical", href: canonicalUrl },
      { rel: "alternate", href: canonicalUrl, hreflang: "ar" },
      { rel: "alternate", href: canonicalUrl, hreflang: "en" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
    script: [
      { type: "application/ld+json", children: JSON.stringify(softwareSchema) },
      { type: "application/ld+json", children: JSON.stringify(faqSchema) },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <LangProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <TrustBar />
          <Problem />
          <Solution />
          <HowItWorks />
          {/* <FinancialTruth /> */}
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
      </div>
    </LangProvider>
  );
}
