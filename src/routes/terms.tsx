import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/vcfo/page-shell";
import { Section, useT } from "@/components/vcfo/lang";

const title = "شروط الاستخدام | VCFO";
const description = "شروط استخدام الموقع التعريفي ومنصة VCFO.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://www.vcfo-ai.com/terms" },
    ],
    links: [{ rel: "canonical", href: "https://www.vcfo-ai.com/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  const t = useT();

  const sections = [
    {
      ar: "قبول الشروط",
      en: "Acceptance",
      bodyAr:
        "باستخدامك لموقع vcfo-ai.com أو طلب تجربة المنصة، فإنك توافق على هذه الشروط. إذا كنت تستخدم الخدمة نيابة عن شركة، فأنت تقر بأن لديك صلاحية إلزام تلك الشركة.",
      bodyEn:
        "By using vcfo-ai.com or requesting access to the product, you agree to these terms. If you use the service on behalf of a company, you confirm you have authority to bind that company.",
    },
    {
      ar: "طبيعة الخدمة",
      en: "Nature of the service",
      bodyAr:
        "VCFO أداة ذكاء مالي تساعد على تنظيم البيانات وبناء القوائم والمؤشرات. الخدمة لا تقدّم استشارة محاسبية أو ضريبية أو قانونية ملزمة، ولا تغني عن مراجع أو محاسب قانوني.",
      bodyEn:
        "VCFO is a financial intelligence tool that helps organize data and produce statements and metrics. It is not binding accounting, tax, or legal advice and does not replace a licensed accountant or auditor.",
    },
    {
      ar: "حسابك ومسؤوليتك",
      en: "Your account",
      bodyAr:
        "أنت مسؤول عن دقة الملفات التي ترفعها، وعن إدارة صلاحيات فريقك، وعن الحفاظ على سرية بيانات الدخول.",
      bodyEn:
        "You are responsible for the accuracy of files you upload, for managing your team’s permissions, and for keeping login credentials secure.",
    },
    {
      ar: "الأسعار والإلغاء",
      en: "Pricing and cancellation",
      bodyAr:
        "الأسعار المعروضة على الموقع قد تتغير. تفاصيل الفوترة والإلغاء تُحدَّد في اتفاقية الاشتراك أو عرض السعر الخاص بك.",
      bodyEn:
        "Listed prices may change. Billing and cancellation details are set in your subscription agreement or quote.",
    },
  ];

  return (
    <PageShell>
      <Section>
        <p className="text-[13px] font-semibold tracking-wide text-teal">
          {t("قانوني", "Legal")}
        </p>
        <h1 className="mt-3 text-[34px] leading-[1.3] font-bold text-ink sm:text-[44px]">
          {t("شروط الاستخدام", "Terms of use")}
        </h1>
        <p className="mt-4 text-[13.5px] text-muted-foreground">
          {t("آخر تحديث: 13 أغسطس 2026", "Last updated: 13 August 2026")}
        </p>
        <div className="mt-10 space-y-8">
          {sections.map((s) => (
            <section key={s.en}>
              <h2 className="text-[20px] font-semibold text-ink">{t(s.ar, s.en)}</h2>
              <p className="mt-3 max-w-[72ch] text-[15px] leading-8 text-muted-foreground">
                {t(s.bodyAr, s.bodyEn)}
              </p>
            </section>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
