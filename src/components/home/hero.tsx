import {
  ArrowLeft,
  Play,
  GitBranch,
  CheckCircle2,
  Lock,
  ScrollText,
  ShieldCheck,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from "@/lib/whatsapp";
import { CountUp } from "@/components/shared/count-up";
import { Reveal } from "@/components/shared/reveal";
import { Sparkline } from "./sparkline";

type MetricProps = {
  label: string;
  value: number;
  delta: string;
  positive?: boolean;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

function Metric({
  label,
  value,
  delta,
  positive = true,
  prefix = "",
  suffix = "",
  decimals = 0,
}: MetricProps) {
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

async function DashboardPreview() {
  const t = await getTranslations("Home");

  return (
    <div className="card-soft overflow-hidden" style={{ boxShadow: "var(--shadow-lift)" }}>
      <div className="flex items-center justify-between gap-3 border-b border-hairline bg-surface-2/70 px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="h-2 w-2 shrink-0 rounded-full bg-positive" />
          <span className="shrink-0 text-[12.5px] font-semibold text-ink">Financial Truth</span>
          <span className="hidden truncate text-[11.5px] text-muted-foreground sm:inline">
            Acme Group · {t("dashboard.month")}
          </span>
        </div>
        <span className="shrink-0 rounded-md border border-hairline bg-surface px-2 py-0.5 text-[10.5px] font-semibold text-positive">
          ✓ VALID
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5 p-3.5 sm:grid-cols-3 sm:p-4">
        <Metric label={t("dashboard.revenue")} value={4820000} delta="+9.2% MoM" />
        <Metric label={t("dashboard.grossProfit")} value={1735200} delta="+14.1% MoM" />
        <Metric
          label={t("dashboard.netProfit")}
          value={612400}
          delta="-3.4% MoM"
          positive={false}
        />
        <Metric label={t("dashboard.cash")} value={2140000} delta="+5.0% MoM" />
        <Metric label="Current Ratio" value={1.84} decimals={2} delta="+0.12" />
        <Metric label={t("dashboard.opex")} value={1122800} delta="+12.0% MoM" positive={false} />
      </div>

      <div className="grid gap-3 border-t border-hairline p-3.5 sm:p-4 lg:grid-cols-[1.35fr_1fr]">
        <div className="rounded-xl border border-hairline bg-surface p-3.5">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[12px] font-semibold text-ink">
              {t("dashboard.revenueTrend")}
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
              {t("dashboard.insightOpex1")} <span className="num font-semibold">12%</span>{" "}
              {t("dashboard.insightOpex2")}
            </p>
          </div>
          <div className="rounded-xl border border-positive/30 bg-positive/8 p-3">
            <div className="mb-1 text-[10.5px] font-semibold tracking-widest text-positive uppercase">
              Insight
            </div>
            <p className="text-[12.5px] leading-6 text-ink">
              {t("dashboard.insightMargin1")} <span className="num font-semibold">31%</span>{" "}
              {t("dashboard.to")} <span className="num font-semibold">36%</span>.
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

export async function Hero() {
  const t = await getTranslations("Home");
  const getStartedUrl = getWhatsAppUrl(WHATSAPP_MESSAGES.getStarted);

  return (
    <div id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-lines [mask-image:radial-gradient(70%_60%_at_50%_0%,#000,transparent)]" />
      <Reveal className="relative mx-auto grid max-w-[1180px] items-center gap-12 px-5 pt-14 pb-8 sm:px-8 md:pt-20 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-[12px] font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            Financial Intelligence Platform
          </span>

          <h1 className="mt-5 text-[34px] leading-[1.25] font-bold text-ink sm:text-[44px] lg:text-[52px]">
            {t("hero.title1")}{" "}
            <span className="relative whitespace-nowrap">
              {t("hero.title2")}
              <span className="absolute inset-x-0 -bottom-1 h-[6px] rounded-full bg-teal-soft" />
            </span>
          </h1>

          <p className="mt-6 max-w-[54ch] text-[15.5px] leading-8 text-muted-foreground">
            {t("hero.subtitle")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={getStartedUrl}
              target="_blank"
              rel="noreferrer noopener"
              data-cta="start_free"
              data-cta-loc="hero"
              className="inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-3 text-[14px] font-semibold text-primary-foreground transition-transform hover:-translate-y-px"
            >
              {t("hero.startFree")}
              <ArrowLeft className="h-4 w-4 rtl:rotate-0 ltr:rotate-180" />
            </a>
            <a
              href="#how"
              data-cta="see_how_it_works"
              data-cta-loc="hero"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-3 text-[14px] font-semibold text-ink transition-colors hover:bg-surface-2"
            >
              <Play className="h-3.5 w-3.5" />
              {t("hero.seeHow")}
            </a>
          </div>

          <p className="mt-5 text-[12.5px] leading-6 text-muted-foreground">
            {t("hero.flow1")} <span className="text-hairline">←</span> {t("hero.flow2")}{" "}
            <span className="text-hairline">←</span> {t("hero.flow3")}{" "}
            <span className="text-hairline">←</span> {t("hero.flow4")}
          </p>
        </div>

        <DashboardPreview />
      </Reveal>
    </div>
  );
}

const trust = [
  { icon: GitBranch, label: "trust.structured" },
  { icon: CheckCircle2, label: "trust.validation" },
  { icon: ScrollText, label: "trust.lineage" },
  { icon: Lock, label: "trust.permissions" },
  { icon: ShieldCheck, label: "trust.audit" },
] as const;

export async function TrustBar() {
  const t = await getTranslations("Home");

  return (
    <Reveal className="mx-auto mt-10 w-full max-w-[1180px] border-y border-hairline px-5 py-7 sm:px-8">
      <p className="text-center text-[12.5px] font-medium tracking-wide text-muted-foreground">
        {t("trust.tagline")}
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {trust.map((i) => (
          <span key={i.label} className="inline-flex items-center gap-2 text-[13px] text-ink/75">
            <i.icon className="h-4 w-4 shrink-0 text-teal" />
            {t(i.label)}
          </span>
        ))}
      </div>
    </Reveal>
  );
}
