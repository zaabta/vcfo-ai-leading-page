import { useState } from "react";
import { Check, Minus } from "lucide-react";
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from "@/lib/whatsapp";
import { trackCtaClick } from "@/lib/analytics";
import { Section, Eyebrow, useT, useLang } from "./lang";

type Cycle = "monthly" | "yearly";

const plans = [
  {
    id: "starter",
    nameAr: "الأساسية",
    nameEn: "Starter",
    descAr: "لشركة واحدة تبدأ في تنظيم بياناتها المالية.",
    descEn: "For one company starting to organize its financial data.",
    monthly: 349,
    yearly: 279,
    featuresAr: [
      "شركة واحدة · فرع واحد",
      "رفع Trial Balance (Excel / CSV)",
      "قائمة الدخل والميزانية العمومية",
      "المؤشرات المالية الأساسية",
      "التحقق من سلامة البيانات",
    ],
    featuresEn: [
      "One company · one branch",
      "Upload Trial Balance (Excel / CSV)",
      "Income statement and balance sheet",
      "Core financial metrics",
      "Data validation",
    ],
    ctaAr: "ابدأ الآن",
    ctaEn: "Get started",
  },
  {
    id: "growth",
    nameAr: "النمو",
    nameEn: "Growth",
    descAr: "للشركات متعددة الفروع التي تحتاج تحليلات أعمق.",
    descEn: "For multi-branch companies that need deeper analysis.",
    monthly: 899,
    yearly: 719,
    popular: true,
    featuresAr: [
      "حتى 3 شركات · فروع غير محدودة",
      "قائمة التدفقات النقدية",
      "التحليلات والمقارنات (MoM · YoY)",
      "مؤشر الصحة المالية",
      "مقارنة الفروع و جميع الفروع",
      "صلاحيات حسب الدور",
    ],
    featuresEn: [
      "Up to 3 companies · unlimited branches",
      "Cash flow statement",
      "Analytics and comparisons (MoM · YoY)",
      "Financial health score",
      "Branch and all-branch comparison",
      "Role-based access",
    ],
    ctaAr: "ابدأ التجربة",
    ctaEn: "Start trial",
  },
  {
    id: "enterprise",
    nameAr: "المؤسسات",
    nameEn: "Enterprise",
    descAr: "لمجموعات الشركات التي تحتاج حوكمة ودعمًا مخصصًا.",
    descEn: "For groups that need governance and dedicated support.",
    monthly: null,
    yearly: null,
    featuresAr: [
      "شركات وفروع غير محدودة",
      "عزل كامل للبيانات وسجل تدقيق",
      "التوقعات وتحليل السيناريوهات",
      "المستشار المالي الذكي (قريبًا)",
      "دعم مخصص و SLA",
    ],
    featuresEn: [
      "Unlimited companies and branches",
      "Full isolation and audit log",
      "Forecasts and scenario analysis",
      "AI financial advisor (soon)",
      "Dedicated support and SLA",
    ],
    ctaAr: "تواصل مع المبيعات",
    ctaEn: "Talk to sales",
  },
];

function getMatrix(t: (ar: string, en?: string) => string) {
  const unlimited = t("غير محدود", "Unlimited");
  return [
    { label: t("عدد الشركات", "Companies"), values: ["1", "3", unlimited] },
    { label: t("عدد الفروع", "Branches"), values: ["1", unlimited, unlimited] },
    { label: t("القوائم المالية", "Financial statements"), values: [true, true, true] },
    { label: t("قائمة التدفقات النقدية", "Cash flow statement"), values: [false, true, true] },
    { label: t("التحليلات والمقارنات", "Analytics and comparisons"), values: [false, true, true] },
    { label: t("مؤشر الصحة المالية", "Health score"), values: [false, true, true] },
    { label: t("التوقعات والسيناريوهات", "Forecasts and scenarios"), values: [false, false, true] },
    { label: t("سجل التدقيق والصلاحيات", "Audit log and permissions"), values: [false, true, true] },
    { label: t("المستشار المالي الذكي", "AI financial advisor"), values: [false, false, t("قريبًا", "Soon")] },
    { label: t("الدعم", "Support"), values: [t("بريد إلكتروني", "Email"), t("أولوية", "Priority"), t("مخصص + SLA", "Dedicated + SLA")] },
  ] as { label: string; values: (boolean | string)[] }[];
}

function Cell({ v }: { v: boolean | string }) {
  if (v === true) return <Check className="mx-auto h-4 w-4 text-teal" />;
  if (v === false) return <Minus className="mx-auto h-4 w-4 text-hairline" />;
  return <span className="num text-[12.5px] font-medium text-ink">{v}</span>;
}

export function Pricing() {
  const t = useT();
  const { lang } = useLang();
  const [cycle, setCycle] = useState<Cycle>("yearly");
  const getStartedUrl = getWhatsAppUrl(WHATSAPP_MESSAGES.getStarted);
  const salesUrl = getWhatsAppUrl(WHATSAPP_MESSAGES.sales);
  const matrix = getMatrix(t);

  return (
    <Section id="pricing">
      <Eyebrow>{t("الأسعار", "Pricing")}</Eyebrow>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
        <div>
          <h2 className="max-w-[24ch] text-[28px] leading-[1.35] font-bold text-ink sm:text-[36px]">
            {t("خطة واضحة لكل مرحلة من مراحل شركتك", "A clear plan for every stage of your company")}
          </h2>
          <p className="mt-4 max-w-[58ch] text-[15px] leading-8 text-muted-foreground">
            {t(
              "جميع الخطط تشمل رفع البيانات، التحقق من سلامتها، وبناء Financial Truth. بدون رسوم إعداد.",
              "Every plan includes data upload, validation, and Financial Truth. No setup fees.",
            )}
          </p>
        </div>

        <div className="inline-flex items-center rounded-full border border-hairline bg-surface-2 p-1 text-[13px]">
          {(
            [
              { k: "monthly", l: t("شهري", "Monthly") },
              { k: "yearly", l: t("سنوي · وفّر 20%", "Yearly · save 20%") },
            ] as const
          ).map((o) => (
            <button
              key={o.k}
              onClick={() => setCycle(o.k)}
              className={`rounded-full px-4 py-1.5 font-medium transition-colors ${
                cycle === o.k
                  ? "bg-ink text-primary-foreground"
                  : "text-muted-foreground hover:text-ink"
              }`}
            >
              {o.l}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {plans.map((p) => {
          const price = cycle === "monthly" ? p.monthly : p.yearly;
          return (
            <div
              key={p.id}
              className={`relative flex flex-col rounded-2xl border p-6 sm:p-7 ${
                p.popular
                  ? "border-ink bg-ink text-primary-foreground shadow-xl"
                  : "border-hairline bg-surface"
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 inline-flex rounded-full bg-teal px-3 py-1 text-[11px] font-semibold text-ink">
                  {t("الأكثر اختيارًا", "Most popular")}
                </span>
              )}
              <div className="flex items-baseline justify-between gap-3">
                <h3 className={`text-[17px] font-bold ${p.popular ? "" : "text-ink"}`}>
                  {t(p.nameAr, p.nameEn)}
                </h3>
                <span
                  className={`num text-[11px] font-semibold tracking-widest uppercase ${
                    p.popular ? "text-teal-soft" : "text-teal"
                  }`}
                >
                  {p.nameEn}
                </span>
              </div>
              <p
                className={`mt-2 text-[13.5px] leading-7 ${p.popular ? "opacity-70" : "text-muted-foreground"}`}
              >
                {t(p.descAr, p.descEn)}
              </p>

              <div className="mt-6 flex items-end gap-2">
                {price === null ? (
                  <span className={`text-[28px] font-bold ${p.popular ? "" : "text-ink"}`}>
                    {t("حسب الطلب", "Custom")}
                  </span>
                ) : (
                  <>
                    <span
                      className={`num text-[36px] leading-none font-bold ${p.popular ? "" : "text-ink"}`}
                    >
                      {price}
                    </span>
                    <span
                      className={`text-[13px] ${p.popular ? "opacity-65" : "text-muted-foreground"}`}
                    >
                      <span className="num">SAR</span> / {t("شهريًا", "month")}
                    </span>
                  </>
                )}
              </div>
              {price !== null && cycle === "yearly" && (
                <p
                  className={`mt-1.5 text-[12px] ${p.popular ? "opacity-60" : "text-muted-foreground"}`}
                >
                  {t("تُدفع سنويًا", "Billed annually")}
                </p>
              )}

              <ul className="mt-6 grid gap-3 border-t pt-6 text-[13.5px] leading-6"
                  style={{ borderColor: p.popular ? "rgba(255,255,255,0.12)" : "var(--hairline)" }}>
                {(lang === "en" ? p.featuresEn : p.featuresAr).map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${p.popular ? "text-teal-soft" : "text-teal"}`}
                    />
                    <span className={p.popular ? "opacity-85" : "text-ink/80"}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={p.id === "enterprise" ? salesUrl : getStartedUrl}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() =>
                  trackCtaClick(
                    p.id === "enterprise" ? "enterprise_sales" : `plan_${p.id}`,
                    "pricing",
                    p.id === "enterprise" ? salesUrl : getStartedUrl,
                  )
                }
                className={`mt-8 block rounded-lg px-5 py-3 text-center text-[14px] font-semibold transition-transform hover:-translate-y-px ${
                  p.popular
                    ? "bg-primary-foreground text-ink"
                    : "border border-ink bg-surface text-ink hover:bg-surface-2"
                }`}
              >
                {t(p.ctaAr, p.ctaEn)}
              </a>
            </div>
          );
        })}
      </div>

      <div className="-mx-5 mt-12 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        <div className="min-w-[620px] overflow-hidden rounded-2xl border border-hairline">
          <table className="w-full border-collapse text-[13.5px]">
            <thead>
              <tr className="bg-surface-2/70">
                <th className="p-4 text-start text-[13px] font-semibold text-ink">
                  {t("مقارنة المزايا", "Feature comparison")}
                </th>
                {plans.map((p) => (
                  <th key={p.id} className="p-4 text-center text-[13px] font-semibold text-ink">
                    {t(p.nameAr, p.nameEn)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {matrix.map((row) => (
                <tr key={row.label} className="bg-surface transition-colors hover:bg-surface-2/50">
                  <td className="p-4 text-start text-muted-foreground">{row.label}</td>
                  {row.values.map((v, i) => (
                    <td key={i} className="p-4 text-center">
                      <Cell v={v} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-hairline bg-surface-2/60 p-6 sm:flex-row sm:items-center sm:p-8">
        <div>
          <h3 className="text-[16px] font-semibold text-ink">
            {t("لست متأكدًا أي خطة تناسبك؟", "Not sure which plan fits?")}
          </h3>
          <p className="mt-1.5 text-[13.5px] leading-7 text-muted-foreground">
            {t(
              "ارفع ملفًا واحدًا وسنريك الصورة المالية لشركتك قبل أن تدفع أي شيء.",
              "Upload one file and we will show you your company's financial picture before you pay anything.",
            )}
          </p>
        </div>
        <a
          href={getStartedUrl}
          target="_blank"
          rel="noreferrer noopener"
          onClick={() => trackCtaClick("start_free", "pricing_banner", getStartedUrl)}
          className="shrink-0 rounded-lg bg-ink px-6 py-3 text-[14px] font-semibold text-primary-foreground transition-transform hover:-translate-y-px"
        >
          {t("ابدأ مجانًا", "Start free")}
        </a>
      </div>
    </Section>
  );
}
