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
import { CTA, FAQ, Footer } from "@/components/vcfo/sections-e";

const title = "VCFO — منصة ذكاء مالي تحوّل بياناتك إلى قرارات";
const description =
  "VCFO منصة ذكاء مالي تحوّل بياناتك المحاسبية إلى قوائم مالية موثوقة، مؤشرات واضحة، وتحليلات تساعدك على اتخاذ القرار بثقة.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
          <FinancialTruth />
          <Statements />
          <CashFlow />
          <Analytics />
          <HealthScore />
          <MultiCompany />
          <DataQuality />
          <ErrorResolution />
          <Security />
          <AICfo />
          <AICapabilities />
          <Scenarios />
          <Forecast />
          <CTA />
          <FAQ />
        </main>
        <Footer />
      </div>
    </LangProvider>
  );
}
