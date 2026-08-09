import { ArrowLeft, Play, ShieldCheck, GitBranch, CheckCircle2, Lock, ScrollText } from "lucide-react";
import { CountUp, useT, useReveal } from "./lang";

function Metric({
  label,
  value,
  delta,
  positive = true,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  label: string;
  value: number;
  delta: string;
  positive?: boolean;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  return (
    <div className="rounded-xl border border-hairline bg-surface p-3.5">
      <div className="text-[11px] font-medium tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-1.5 text-[19px] font-semibold text-ink">
        <CountUp to={value} prefix={prefix} suffix={suffix} decimals={decimals} />
      </div>
      <div
        className={`mt-1 text-[11px] font-medium num ${positive ? "text-positive" : "text-danger"}`}
      >
        {delta}
      </div>
    </div>
  );
}

function Sparkline() {
  const pts = [22, 30, 26, 38, 34, 46, 42, 56, 62, 58, 70, 78];
  const d = pts
    .map((p, i) => `${(i / (pts.length - 1)) * 100},${100 - p}`)
    .join(" ");
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="h-[110px] w-full">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
        <defs>
          <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--teal)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--teal)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[25, 50, 75].map((y) => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="var(--hairline)" strokeWidth="0.4" />
        ))}
        <polygon points={`0,100 ${d} 100,100`} fill="url(#sparkFill)" />
        <polyline
          points={d}
          fill="none"
          stroke="var(--teal)"
          strokeWidth="1.4"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 400,
            strokeDashoffset: visible ? 0 : 400,
            transition: "stroke-dashoffset 1.6s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </svg>
    </div>
  );
}

export function DashboardPreview() {
  const t = useT();
  return (
    <div className="card-soft overflow-hidden" style={{ boxShadow: "var(--shadow-lift)" }}>
      <div className="flex items-center justify-between gap-3 border-b border-hairline bg-surface-2/70 px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="h-2 w-2 shrink-0 rounded-full bg-positive" />
          <span className="shrink-0 text-[12.5px] font-semibold text-ink">Financial Truth</span>
          <span className="hidden truncate text-[11.5px] text-muted-foreground sm:inline">
            Acme Group · {t("مارس ٢٠٢٦", "March 2026")}
          </span>
        </div>
        <span className="shrink-0 rounded-md border border-hairline bg-surface px-2 py-0.5 text-[10.5px] font-semibold text-positive">
          ✓ VALID
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5 p-3.5 sm:grid-cols-3 sm:p-4">
        <Metric label={t("الإيرادات", "Revenue")} value={4820000} delta="+9.2% MoM" />
        <Metric label={t("مجمل الربح", "Gross Profit")} value={1735200} delta="+14.1% MoM" />
        <Metric label={t("صافي الربح", "Net Profit")} value={612400} delta="-3.4% MoM" positive={false} />
        <Metric label={t("النقدية", "Cash")} value={2140000} delta="+5.0% MoM" />
        <Metric label="Current Ratio" value={1.84} decimals={2} delta="+0.12" />
        <Metric
          label={t("المصروفات التشغيلية", "Operating Expenses")}
          value={1122800}
          delta="+12.0% MoM"
          positive={false}
        />
      </div>

      <div className="grid gap-3 border-t border-hairline p-3.5 sm:p-4 lg:grid-cols-[1.35fr_1fr]">
        <div className="rounded-xl border border-hairline bg-surface p-3.5">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[12px] font-semibold text-ink">
              {t("اتجاه الإيرادات", "Revenue trend")}
            </span>
            <span className="text-[11px] text-muted-foreground">12M</span>
          </div>
          <Sparkline />
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="rounded-xl border border-warning/35 bg-warning/8 p-3">
            <div className="mb-1 text-[10.5px] font-semibold tracking-widest text-warning uppercase">
              Insight
            </div>
            <p className="text-[12.5px] leading-6 text-ink">
              ارتفعت المصروفات التشغيلية بنسبة <span className="num font-semibold">12%</span> مقارنة
              بالفترة السابقة.
            </p>
          </div>
          <div className="rounded-xl border border-positive/30 bg-positive/8 p-3">
            <div className="mb-1 text-[10.5px] font-semibold tracking-widest text-positive uppercase">
              Insight
            </div>
            <p className="text-[12.5px] leading-6 text-ink">
              هامش الربح الإجمالي تحسن من <span className="num font-semibold">31%</span> إلى{" "}
              <span className="num font-semibold">36%</span>.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto border-t border-hairline bg-surface-2/60 px-4 py-2.5 text-[11px] text-muted-foreground">
        <span className="shrink-0 num">Raw Data</span>
        <span className="shrink-0 text-hairline">———</span>
        <span className="shrink-0 num font-semibold text-ink">Financial Truth</span>
        <span className="shrink-0 text-hairline">———</span>
        <span className="shrink-0 num">Intelligence</span>
      </div>
    </div>
  );
}

export function Hero() {
  const t = useT();
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-lines [mask-image:radial-gradient(70%_60%_at_50%_0%,#000,transparent)]" />
      <div
        ref={ref}
        data-visible={visible}
        className="reveal relative mx-auto grid max-w-[1180px] items-center gap-12 px-5 pt-14 pb-8 sm:px-8 md:pt-20 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]"
      >
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-[12px] font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            Financial Intelligence Platform
          </span>

          <h1 className="mt-5 text-[34px] leading-[1.25] font-bold text-ink sm:text-[44px] lg:text-[52px]">
            {t("حوّل بياناتك المالية إلى ", "Turn your financial data into ")}
            <span className="relative whitespace-nowrap">
              {t("قرارات أذكى", "smarter decisions")}
              <span className="absolute inset-x-0 -bottom-1 h-[6px] rounded-full bg-teal-soft" />
            </span>
          </h1>

          <p className="mt-6 max-w-[54ch] text-[15.5px] leading-8 text-muted-foreground">
            {t(
              "VCFO منصة ذكاء مالي تساعدك على تحويل بياناتك المحاسبية إلى قوائم مالية موثوقة، مؤشرات واضحة، وتحليلات تساعدك على فهم ما يحدث في شركتك واتخاذ القرار بثقة.",
              "VCFO is a financial intelligence platform that turns your accounting data into trusted financial statements, clear metrics, and analysis that helps you understand your company and decide with confidence.",
            )}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#cta"
              className="inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-3 text-[14px] font-semibold text-primary-foreground transition-transform hover:-translate-y-px"
            >
              {t("ابدأ الآن مجانًا", "Start for free")}
              <ArrowLeft className="h-4 w-4 rtl:rotate-0 ltr:rotate-180" />
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-3 text-[14px] font-semibold text-ink transition-colors hover:bg-surface-2"
            >
              <Play className="h-3.5 w-3.5" />
              {t("شاهد كيف يعمل", "See how it works")}
            </a>
          </div>

          <p className="mt-5 text-[12.5px] leading-6 text-muted-foreground">
            بياناتك المالية <span className="text-hairline">←</span> حقيقة مالية موثوقة{" "}
            <span className="text-hairline">←</span> تحليل <span className="text-hairline">←</span>{" "}
            قرارات أفضل
          </p>
        </div>

        <DashboardPreview />
      </div>
    </div>
  );
}

const trust = [
  { icon: GitBranch, ar: "بيانات منظمة", en: "Structured data" },
  { icon: CheckCircle2, ar: "تحقق تلقائي", en: "Automated validation" },
  { icon: ScrollText, ar: "تتبع كامل للبيانات", en: "Full data lineage" },
  { icon: Lock, ar: "صلاحيات آمنة", en: "Secure permissions" },
  { icon: ShieldCheck, ar: "سجل تدقيق", en: "Audit log" },
];

export function TrustBar() {
  const t = useT();
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      data-visible={visible}
      className="reveal mx-auto mt-10 w-full max-w-[1180px] border-y border-hairline px-5 py-7 sm:px-8"
    >
      <p className="text-center text-[12.5px] font-medium tracking-wide text-muted-foreground">
        {t(
          "مصمم لبناء مصدر واحد موثوق للحقيقة المالية",
          "Built to create one trusted source of financial truth",
        )}
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {trust.map((i) => (
          <span key={i.ar} className="inline-flex items-center gap-2 text-[13px] text-ink/75">
            <i.icon className="h-4 w-4 shrink-0 text-teal" />
            {t(i.ar, i.en)}
          </span>
        ))}
      </div>
    </div>
  );
}