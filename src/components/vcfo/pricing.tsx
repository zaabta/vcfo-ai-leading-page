import { useState } from "react";
import { Check, Minus } from "lucide-react";
import { Section, Eyebrow, useT } from "./lang";

type Cycle = "monthly" | "yearly";

const plans = [
  {
    id: "starter",
    name: "الأساسية",
    en: "Starter",
    desc: "لشركة واحدة تبدأ في تنظيم بياناتها المالية.",
    monthly: 349,
    yearly: 279,
    features: [
      "شركة واحدة · فرع واحد",
      "رفع Trial Balance (Excel / CSV)",
      "قائمة الدخل والميزانية العمومية",
      "المؤشرات المالية الأساسية",
      "التحقق من سلامة البيانات",
    ],
    cta: "ابدأ الآن",
  },
  {
    id: "growth",
    name: "النمو",
    en: "Growth",
    desc: "للشركات متعددة الفروع التي تحتاج تحليلات أعمق.",
    monthly: 899,
    yearly: 719,
    popular: true,
    features: [
      "حتى 3 شركات · فروع غير محدودة",
      "قائمة التدفقات النقدية",
      "التحليلات والمقارنات (MoM · YoY)",
      "مؤشر الصحة المالية",
      "مقارنة الفروع و All Branches",
      "صلاحيات حسب الدور",
    ],
    cta: "ابدأ التجربة",
  },
  {
    id: "enterprise",
    name: "المؤسسات",
    en: "Enterprise",
    desc: "لمجموعات الشركات التي تحتاج حوكمة ودعمًا مخصصًا.",
    monthly: null,
    yearly: null,
    features: [
      "شركات وفروع غير محدودة",
      "عزل كامل للبيانات وسجل تدقيق",
      "التوقعات وتحليل السيناريوهات",
      "المستشار المالي الذكي (قريبًا)",
      "دعم مخصص و SLA",
    ],
    cta: "تواصل مع المبيعات",
  },
];

const matrix: { label: string; values: (boolean | string)[] }[] = [
  { label: "عدد الشركات", values: ["1", "3", "غير محدود"] },
  { label: "عدد الفروع", values: ["1", "غير محدود", "غير محدود"] },
  { label: "القوائم المالية", values: [true, true, true] },
  { label: "قائمة التدفقات النقدية", values: [false, true, true] },
  { label: "التحليلات والمقارنات", values: [false, true, true] },
  { label: "مؤشر الصحة المالية", values: [false, true, true] },
  { label: "التوقعات والسيناريوهات", values: [false, false, true] },
  { label: "سجل التدقيق والصلاحيات", values: [false, true, true] },
  { label: "المستشار المالي الذكي", values: [false, false, "قريبًا"] },
  { label: "الدعم", values: ["بريد إلكتروني", "أولوية", "مخصص + SLA"] },
];

function Cell({ v }: { v: boolean | string }) {
  if (v === true) return <Check className="mx-auto h-4 w-4 text-teal" />;
  if (v === false) return <Minus className="mx-auto h-4 w-4 text-hairline" />;
  return <span className="num text-[12.5px] font-medium text-ink">{v}</span>;
}

export function Pricing() {
  const t = useT();
  const [cycle, setCycle] = useState<Cycle>("yearly");

  return (
    <Section id="pricing">
      <Eyebrow>{t("الأسعار", "Pricing")}</Eyebrow>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
        <div>
          <h2 className="max-w-[24ch] text-[28px] leading-[1.35] font-bold text-ink sm:text-[36px]">
            خطة واضحة لكل مرحلة من مراحل شركتك
          </h2>
          <p className="mt-4 max-w-[58ch] text-[15px] leading-8 text-muted-foreground">
            جميع الخطط تشمل رفع البيانات، التحقق من سلامتها، وبناء Financial Truth. بدون رسوم إعداد.
          </p>
        </div>

        <div className="inline-flex items-center rounded-full border border-hairline bg-surface-2 p-1 text-[13px]">
          {(
            [
              { k: "monthly", l: "شهري" },
              { k: "yearly", l: "سنوي · وفّر 20%" },
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
                  الأكثر اختيارًا
                </span>
              )}
              <div className="flex items-baseline justify-between gap-3">
                <h3 className={`text-[17px] font-bold ${p.popular ? "" : "text-ink"}`}>{p.name}</h3>
                <span
                  className={`num text-[11px] font-semibold tracking-widest uppercase ${
                    p.popular ? "text-teal-soft" : "text-teal"
                  }`}
                >
                  {p.en}
                </span>
              </div>
              <p
                className={`mt-2 text-[13.5px] leading-7 ${p.popular ? "opacity-70" : "text-muted-foreground"}`}
              >
                {p.desc}
              </p>

              <div className="mt-6 flex items-end gap-2">
                {price === null ? (
                  <span className={`text-[28px] font-bold ${p.popular ? "" : "text-ink"}`}>
                    حسب الطلب
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
                      <span className="num">SAR</span> / شهريًا
                    </span>
                  </>
                )}
              </div>
              {price !== null && cycle === "yearly" && (
                <p
                  className={`mt-1.5 text-[12px] ${p.popular ? "opacity-60" : "text-muted-foreground"}`}
                >
                  تُدفع سنويًا
                </p>
              )}

              <ul className="mt-6 grid gap-3 border-t pt-6 text-[13.5px] leading-6"
                  style={{ borderColor: p.popular ? "rgba(255,255,255,0.12)" : "var(--hairline)" }}>
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${p.popular ? "text-teal-soft" : "text-teal"}`}
                    />
                    <span className={p.popular ? "opacity-85" : "text-ink/80"}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#cta"
                className={`mt-8 block rounded-lg px-5 py-3 text-center text-[14px] font-semibold transition-transform hover:-translate-y-px ${
                  p.popular
                    ? "bg-primary-foreground text-ink"
                    : "border border-ink bg-surface text-ink hover:bg-surface-2"
                }`}
              >
                {p.cta}
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
                    {p.name}
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
          <h3 className="text-[16px] font-semibold text-ink">لست متأكدًا أي خطة تناسبك؟</h3>
          <p className="mt-1.5 text-[13.5px] leading-7 text-muted-foreground">
            ارفع ملفًا واحدًا وسنريك الصورة المالية لشركتك قبل أن تدفع أي شيء.
          </p>
        </div>
        <a
          href="#cta"
          className="shrink-0 rounded-lg bg-ink px-6 py-3 text-[14px] font-semibold text-primary-foreground transition-transform hover:-translate-y-px"
        >
          {t("ابدأ مجانًا", "Start free")}
        </a>
      </div>
    </Section>
  );
}
