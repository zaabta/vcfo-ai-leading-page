import { useEffect, useState } from "react";
import { Section, Eyebrow, useT, useReveal } from "./lang";

const problems = [
  {
    n: "01",
    ar: "ملفات Excel كثيرة",
    en: "Too many Excel files",
    dAr: "بيانات موزعة بين ملفات وتقارير مختلفة.",
    dEn: "Data is scattered across files and different reports.",
  },
  {
    n: "02",
    ar: "حسابات غير متطابقة",
    en: "Mismatched accounts",
    dAr: "اختلاف أسماء الحسابات والأكواد بين الأنظمة والفروع.",
    dEn: "Account names and codes differ across systems and branches.",
  },
  {
    n: "03",
    ar: "تحليل يدوي",
    en: "Manual analysis",
    dAr: "استخراج المؤشرات والمقارنات يحتاج وقتًا وجهدًا.",
    dEn: "Extracting metrics and comparisons takes time and effort.",
  },
  {
    n: "04",
    ar: "صعوبة معرفة ما يحدث فعليًا",
    en: "Hard to see what is really happening",
    dAr: "الأرقام موجودة، لكن القصة وراء الأرقام ليست واضحة.",
    dEn: "The numbers exist, but the story behind them is not clear.",
  },
];

export function Problem() {
  const t = useT();
  return (
    <Section>
      <Eyebrow>{t("المشكلة", "The problem")}</Eyebrow>
      <h2 className="mt-4 max-w-[20ch] text-[28px] leading-[1.35] font-bold text-ink sm:text-[36px]">
        {t("المشكلة ليست في نقص البيانات", "The problem is not a lack of data")}
      </h2>
      <p className="mt-4 max-w-[62ch] text-[15px] leading-8 text-muted-foreground">
        {t(
          "المشكلة أن البيانات المالية غالبًا تكون موزعة، غير منظمة، وصعبة التحويل إلى قرار واضح.",
          "The problem is that financial data is usually scattered, unstructured, and hard to turn into a clear decision.",
        )}
      </p>

      <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
        {problems.map((p) => (
          <div key={p.n} className="group bg-surface p-6 transition-colors hover:bg-surface-2">
            <span className="num text-[12px] font-semibold text-teal">{p.n}</span>
            <h3 className="mt-3 text-[15.5px] font-semibold text-ink">{t(p.ar, p.en)}</h3>
            <p className="mt-2 text-[13.5px] leading-7 text-muted-foreground">{t(p.dAr, p.dEn)}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

const pipeline = [
  { ar: "رفع البيانات", en: "Upload data" },
  { ar: "تنظيف وتوحيد البيانات", en: "Clean and unify data" },
  { ar: "مطابقة الحسابات", en: "Map accounts" },
  { ar: "التحقق من سلامة البيانات", en: "Validate data integrity" },
  { ar: "الحقيقة المالية (Financial Truth)", en: "Financial Truth" },
  { ar: "القوائم المالية", en: "Financial statements" },
  { ar: "التحليلات والمؤشرات", en: "Analytics and KPIs" },
  { ar: "المستشار المالي الذكي", en: "AI financial advisor" },
];

export function Solution() {
  const t = useT();
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [step, setStep] = useState(-1);

  useEffect(() => {
    if (!visible) return;
    let i = 0;
    const id = setInterval(() => {
      setStep(i);
      i += 1;
      if (i >= pipeline.length) clearInterval(id);
    }, 260);
    return () => clearInterval(id);
  }, [visible]);

  return (
    <Section id="features" className="!py-0">
      <div className="rounded-3xl border border-hairline bg-surface-2/60 p-6 sm:p-10">
        <Eyebrow>{t("الحل", "The solution")}</Eyebrow>
        <h2 className="mt-4 max-w-[26ch] text-[28px] leading-[1.35] font-bold text-ink sm:text-[36px]">
          {t("VCFO يبني طبقة ذكاء فوق بياناتك المالية", "VCFO builds an intelligence layer on your financial data")}
        </h2>

        <div ref={ref} className="mt-10 grid gap-3 md:grid-cols-4">
          {pipeline.map((item, i) => {
            const on = i <= step;
            const truth = i === 4;
            return (
              <div
                key={item.en}
                className={`relative rounded-xl border p-4 transition-all duration-500 ${
                  on
                    ? truth
                      ? "border-ink bg-ink text-primary-foreground"
                      : "border-teal/40 bg-surface"
                    : "border-hairline bg-surface/40 opacity-55"
                }`}
              >
                <div
                  className={`num text-[11px] font-semibold ${
                    truth && on ? "text-teal-soft" : "text-teal"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className={`mt-2 text-[13.5px] font-semibold ${truth && on ? "" : "text-ink"}`}>
                  {t(item.ar, item.en)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

export function HowItWorks() {
  const t = useT();
  return (
    <Section id="how">
      <Eyebrow>{t("كيف يعمل", "How it works")}</Eyebrow>
      <h2 className="mt-4 max-w-[28ch] text-[28px] leading-[1.35] font-bold text-ink sm:text-[36px]">
        {t(
          "من ملف Excel إلى صورة مالية واضحة في خطوات بسيطة",
          "From an Excel file to a clear financial picture in simple steps",
        )}
      </h2>

      <div className="mt-12 space-y-px overflow-hidden rounded-2xl border border-hairline bg-hairline">
        <Step
          n="01"
          title={t("ارفع بياناتك", "Upload your data")}
          body={t("ارفع Trial Balance أو Chart of Accounts.", "Upload a Trial Balance or Chart of Accounts.")}
          aside={
            <div className="flex gap-2">
              {["Excel", "CSV"].map((f) => (
                <span
                  key={f}
                  className="num rounded-md border border-hairline bg-surface-2 px-2.5 py-1 text-[11.5px] font-semibold text-ink"
                >
                  {f}
                </span>
              ))}
            </div>
          }
        />
        <Step
          n="02"
          title={t("VCFO ينظّم البيانات", "VCFO organizes the data")}
          body={t(
            "يقوم النظام بتنظيف وتوحيد البيانات تلقائيًا.",
            "The system cleans and unifies the data automatically.",
          )}
        />
        <Step
          n="03"
          title={t("مطابقة الحسابات", "Account mapping")}
          body={t(
            "يتم ربط حسابات شركتك بالتصنيف المالي الصحيح.",
            "Your company accounts are mapped to the correct financial classification.",
          )}
          aside={
            <div className="flex flex-wrap items-center gap-3 rounded-xl border border-hairline bg-surface-2 p-3 text-[12.5px]">
              <span className="num font-semibold text-ink">1200</span>
              <span className="text-ink">{t("النقدية", "Cash")}</span>
              <span className="text-hairline">←</span>
              <span className="num rounded-md bg-surface px-2 py-1 font-semibold text-teal">
                Cash &amp; Cash Equivalents
              </span>
            </div>
          }
        />
        <Step
          n="04"
          title={t("التحقق", "Validation")}
          body={t("يتحقق النظام من:", "The system checks:")}
          list={[
            t("توازن المدين والدائن", "Debit and credit balance"),
            t("الحسابات المفقودة", "Missing accounts"),
            t("الحسابات غير المطابقة", "Unmapped accounts"),
            t("البيانات المكررة", "Duplicate data"),
            t("صحة الفترة المالية", "Period integrity"),
            t("سلامة العلاقة بين الأصول والخصوم وحقوق الملكية", "Assets = liabilities + equity"),
          ]}
        />
        <Step
          n="05"
          title={t("احصل على الحقيقة المالية", "Get Financial Truth")}
          body={t(
            "يتم إنشاء طبقة مالية موحدة يمكن الاعتماد عليها لبناء:",
            "A single trusted financial layer is created and used to build:",
          )}
          list={[
            t("قائمة الدخل", "Income statement"),
            t("الميزانية العمومية", "Balance sheet"),
            t("المؤشرات", "KPIs"),
            t("التحليلات", "Analytics"),
            t("التوقعات", "Forecasts"),
            t("الذكاء المالي", "Financial intelligence"),
          ]}
        />
      </div>
    </Section>
  );
}

function Step({
  n,
  title,
  body,
  list,
  aside,
}: {
  n: string;
  title: string;
  body: string;
  list?: string[];
  aside?: React.ReactNode;
}) {
  return (
    <div className="grid gap-4 bg-surface p-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-8 sm:p-8">
      <div className="num text-[13px] font-semibold text-teal sm:w-12">{n}</div>
      <div className="min-w-0">
        <h3 className="text-[17px] font-semibold text-ink">{title}</h3>
        <p className="mt-2 text-[14px] leading-7 text-muted-foreground">{body}</p>
        {list && (
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((l) => (
              <li key={l} className="flex items-start gap-2 text-[13.5px] leading-6 text-ink/80">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                {l}
              </li>
            ))}
          </ul>
        )}
        {aside && <div className="mt-4">{aside}</div>}
      </div>
    </div>
  );
}

export function FinancialTruth() {
  const t = useT();
  const branches = [
    t("قائمة الدخل", "Income statement"),
    t("الميزانية العمومية", "Balance sheet"),
    t("المؤشرات", "KPIs"),
    "Dashboard",
    "Analytics",
    "AI CFO",
  ];
  return (
    <div className="bg-ink text-primary-foreground">
      <Section>
        <span className="inline-flex items-center rounded-full border border-white/15 px-3 py-1 text-[11px] font-medium tracking-[0.14em] uppercase opacity-80">
          Financial Truth
        </span>
        <h2 className="mt-4 text-[28px] leading-[1.35] font-bold sm:text-[36px]">
          {t("مصدر واحد للحقيقة المالية", "One source of financial truth")}
        </h2>
        <p className="mt-4 max-w-[70ch] text-[15px] leading-8 opacity-70">
          {t(
            "بدل أن يعيد كل تقرير أو شاشة حساب الأرقام بطريقته الخاصة، يقوم VCFO ببناء Financial Truth واحدة تعتمد عليها جميع أجزاء النظام.",
            "Instead of every report recalculating numbers its own way, VCFO builds one Financial Truth layer that the entire platform depends on.",
          )}
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-center">
          <div className="space-y-3">
            <div className="rounded-xl border border-white/12 bg-white/[0.04] p-4 text-[13.5px] font-semibold">
              Trial Balance
            </div>
            <div className="ps-4 text-white/30">↓</div>
            <div className="rounded-xl border border-teal/50 bg-teal/15 p-4 text-[14px] font-bold">
              Financial Truth
            </div>
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
            {branches.map((b) => (
              <div
                key={b}
                className="bg-ink px-4 py-6 text-center text-[13.5px] font-medium transition-colors hover:bg-white/[0.05]"
              >
                {b}
              </div>
            ))}
          </div>
        </div>

        <p className="mt-10 border-s-2 border-teal ps-4 text-[15px] font-semibold">
          {t(
            "يُحسب الرقم مرة واحدة، ثم تستخدمه المنصة بالكامل.",
            "Calculated once, used everywhere across the platform.",
          )}
        </p>
      </Section>
    </div>
  );
}
