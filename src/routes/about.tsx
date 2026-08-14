import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/vcfo/page-shell";
import { Section, useT } from "@/components/vcfo/lang";

const title = "من نحن | VCFO";
const description =
  "VCFO منصة ذكاء مالي تبني Financial Truth واحدة للشركات، وتحوّل البيانات المحاسبية إلى قوائم ومؤشرات وتحليلات يمكن الاعتماد عليها.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://vcfo-ai.com/about" },
    ],
    links: [{ rel: "canonical", href: "https://vcfo-ai.com/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const t = useT();

  return (
    <PageShell>
      <Section>
        <p className="text-[13px] font-semibold tracking-wide text-teal">
          {t("الشركة", "Company")}
        </p>
        <h1 className="mt-3 max-w-[20ch] text-[34px] leading-[1.3] font-bold text-ink sm:text-[44px]">
          {t("نبني مصدرًا واحدًا للحقيقة المالية", "We build one source of financial truth")}
        </h1>
        <p className="mt-5 max-w-[68ch] text-[16px] leading-8 text-muted-foreground">
          {t(
            "VCFO منصة ذكاء مالي للشركات. لا نستبدل نظام المحاسبة، بل نبني طبقة فوق بياناتك: ننظفها، نوحّدها، نتحقق منها، ثم نحوّلها إلى قوائم مالية ومؤشرات وتحليلات يمكن لصانع القرار الاعتماد عليها.",
            "VCFO is a financial intelligence platform for companies. We do not replace your accounting system. We sit on top of your data: clean it, unify it, validate it, then turn it into statements, metrics, and analysis leadership can trust.",
          )}
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            {
              ar: "الحقيقة أولاً",
              en: "Truth first",
              dAr: "يُحسب الرقم مرة واحدة داخل Financial Truth، ثم تستخدمه كل الشاشات والتقارير.",
              dEn: "Each number is calculated once inside Financial Truth, then reused across every screen and report.",
            },
            {
              ar: "وضوح بدل التخمين",
              en: "Clarity over guesswork",
              dAr: "المؤشرات مبنية على قواعد مالية قابلة للتفسير، وليست على إجابات ذكاء اصطناعي مبهمة.",
              dEn: "Metrics are built on explainable financial rules, not opaque AI answers.",
            },
            {
              ar: "مصمم للشركات",
              en: "Built for companies",
              dAr: "شركات متعددة، فروع، فترات مالية، صلاحيات، وسجل تدقيق — من اليوم الأول.",
              dEn: "Multi-company, branches, periods, permissions, and an audit trail from day one.",
            },
          ].map((item) => (
            <div key={item.en} className="card-soft p-6">
              <h2 className="text-[16px] font-semibold text-ink">{t(item.ar, item.en)}</h2>
              <p className="mt-2 text-[14px] leading-7 text-muted-foreground">
                {t(item.dAr, item.dEn)}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
