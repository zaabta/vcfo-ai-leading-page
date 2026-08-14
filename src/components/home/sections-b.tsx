import { getTranslations } from "next-intl/server";
import { Section, Eyebrow } from "./section";
import { CountUp } from "@/components/shared/count-up";
import { Bars, Gauge, HealthBars, StaggerRows } from "./charts";

function StatementCard({
  title,
  rows,
  footer,
}: {
  title: string;
  rows: { label: string; value: string; strong?: boolean }[];
  footer?: string;
}) {
  return (
    <div className="card-soft min-w-[280px] flex-1 overflow-hidden">
      <div className="border-b border-hairline bg-surface-2/70 px-4 py-3 text-[13px] font-semibold text-ink">
        {title}
      </div>
      <div className="divide-y divide-hairline">
        {rows.map((r) => (
          <div
            key={r.label}
            className={`flex items-center justify-between gap-4 px-4 py-3 text-[13px] ${
              r.strong ? "bg-surface-2/50 font-semibold text-ink" : "text-muted-foreground"
            }`}
          >
            <span className="min-w-0 truncate">{r.label}</span>
            <span className="num shrink-0 text-ink">{r.value}</span>
          </div>
        ))}
      </div>
      {footer && (
        <div className="border-t border-hairline px-4 py-2.5 text-[11.5px] text-muted-foreground">
          {footer}
        </div>
      )}
    </div>
  );
}

export async function Statements() {
  const t = await getTranslations("Home");

  return (
    <Section>
      <Eyebrow>{t("statements.eyebrow")}</Eyebrow>
      <h2 className="mt-4 text-[28px] leading-[1.35] font-bold text-ink sm:text-[36px]">
        {t("statements.title")}
      </h2>

      <div className="-mx-5 mt-10 flex snap-x gap-4 overflow-x-auto px-5 pb-3 sm:mx-0 sm:px-0 lg:overflow-visible">
        <StatementCard
          title={t("statements.income")}
          rows={[
            { label: t("statements.revenue"), value: "4,820,000" },
            { label: t("statements.cogs"), value: "(3,084,800)" },
            { label: t("statements.grossProfit"), value: "1,735,200", strong: true },
            { label: t("statements.expenses"), value: "(1,122,800)" },
            { label: t("statements.netProfit"), value: "612,400", strong: true },
          ]}
          footer={t("statements.footerSar")}
        />
        <StatementCard
          title={t("statements.balanceSheet")}
          rows={[
            { label: t("statements.assets"), value: "9,410,000", strong: true },
            { label: t("statements.currentAssets"), value: "4,120,000" },
            { label: t("statements.liabilities"), value: "3,860,000", strong: true },
            { label: t("statements.currentLiabilities"), value: "2,238,000" },
            { label: t("statements.equity"), value: "5,550,000", strong: true },
          ]}
          footer="Assets = Liabilities + Equity ✓"
        />
        <StatementCard
          title={t("statements.metrics")}
          rows={[
            { label: t("statements.grossMargin"), value: "36.0%" },
            { label: t("statements.operatingMargin"), value: "18.4%" },
            { label: t("statements.netMargin"), value: "12.7%" },
            { label: "Current Ratio", value: "1.84" },
            { label: "Working Capital", value: "1,882,000" },
          ]}
          footer={t("statements.footerTruth")}
        />
      </div>
    </Section>
  );
}

export async function CashFlow() {
  const t = await getTranslations("Home");

  const activities = [
    {
      s: "Operating",
      title: t("cashflow.operating.title"),
      d: t("cashflow.operating.body"),
      v: "+ 1,240,000",
      pos: true,
    },
    {
      s: "Investing",
      title: t("cashflow.investing.title"),
      d: t("cashflow.investing.body"),
      v: "(480,000)",
      pos: false,
    },
    {
      s: "Financing",
      title: t("cashflow.financing.title"),
      d: t("cashflow.financing.body"),
      v: "(210,000)",
      pos: false,
    },
  ];

  const flows = [
    { l: t("cashflow.operatingFlow"), v: "1,240,000" },
    { l: t("cashflow.investingFlow"), v: "(480,000)" },
    { l: t("cashflow.financingFlow"), v: "(210,000)" },
    { l: t("cashflow.netChange"), v: "550,000", strong: true },
  ];

  return (
    <Section id="cashflow">
      <Eyebrow>{t("cashflow.eyebrow")}</Eyebrow>
      <h2 className="mt-4 max-w-[26ch] text-[28px] leading-[1.35] font-bold text-ink sm:text-[36px]">
        {t("cashflow.title")}
      </h2>
      <p className="mt-4 max-w-[64ch] text-[15px] leading-8 text-muted-foreground">
        {t("cashflow.subtitle")}
      </p>

      <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline lg:grid-cols-3">
        {activities.map((a) => (
          <div key={a.s} className="bg-surface p-6">
            <div className="num text-[11px] font-semibold tracking-widest text-teal uppercase">
              {a.s}
            </div>
            <h3 className="mt-2 text-[15px] leading-7 font-semibold text-ink">{a.title}</h3>
            <p className="mt-2 text-[13.5px] leading-7 text-muted-foreground">{a.d}</p>
            <div
              className={`num mt-4 text-[18px] font-semibold ${a.pos ? "text-positive" : "text-danger"}`}
            >
              {a.v}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="card-soft flex flex-col justify-center p-6 sm:p-8">
          <div className="text-[13px] font-semibold text-ink">{t("cashflow.netCashFlow")}</div>
          <p className="mt-3 text-[14px] leading-8 text-muted-foreground">
            {t("cashflow.cashIn")} <span className="num">−</span> {t("cashflow.cashOut")} ={" "}
            {t("cashflow.netChange")}
          </p>
          <p className="mt-5 border-s-2 border-teal ps-4 text-[14px] leading-7 font-semibold text-ink">
            {t("cashflow.note")}
          </p>
        </div>

        <div className="card-soft overflow-hidden">
          <div className="border-b border-hairline bg-surface-2/70 px-4 py-3 text-[13px] font-semibold text-ink">
            {t("cashflow.netCashFlow")}
          </div>
          <StaggerRows className="divide-y divide-hairline">
            {flows.map((f) => (
              <div
                key={f.l}
                className={`flex items-center justify-between gap-4 px-4 py-3.5 text-[13px] ${
                  f.strong ? "bg-surface-2/50 font-semibold text-ink" : "text-muted-foreground"
                }`}
              >
                <span className="min-w-0 truncate">{f.l}</span>
                <span className="num shrink-0 text-ink">{f.v}</span>
              </div>
            ))}
          </StaggerRows>
          <div className="border-t border-hairline px-4 py-2.5 text-[11.5px] text-muted-foreground">
            {t("cashflow.footer")}
          </div>
        </div>
      </div>
    </Section>
  );
}

export async function Analytics() {
  const t = await getTranslations("Home");

  return (
    <Section id="analytics">
      <Eyebrow>{t("analytics.eyebrow")}</Eyebrow>
      <h2 className="mt-4 text-[28px] leading-[1.35] font-bold text-ink sm:text-[36px]">
        {t("analytics.title")}
      </h2>

      <div className="mt-10 grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <div className="card-soft p-5">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-ink">{t("analytics.trend")}</span>
            <span className="num text-[11.5px] text-muted-foreground">
              Revenue · Profit · Expense
            </span>
          </div>
          <div className="mt-5">
            <Bars />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 border-t border-hairline pt-4">
            {[
              { l: "Revenue trend", v: 9.2 },
              { l: "Profit trend", v: 4.6 },
              { l: "Expense trend", v: 12.0 },
            ].map((m, i) => (
              <div key={m.l}>
                <div className="num text-[11px] text-muted-foreground">{m.l}</div>
                <div
                  className={`mt-1 text-[15px] font-semibold ${i === 2 ? "text-danger" : "text-positive"}`}
                >
                  +<CountUp to={m.v} decimals={1} suffix="%" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {(
            [
              { s: "MoM", t: t("analytics.mom.title"), d: t("analytics.mom.body") },
              { s: "YoY", t: t("analytics.yoy.title"), d: t("analytics.yoy.body") },
              { s: "Trends", t: t("analytics.trends.title"), d: t("analytics.trends.body") },
              { s: "Expenses", t: t("analytics.expenses.title"), d: t("analytics.expenses.body") },
            ] as const
          ).map((c) => (
            <div key={c.s} className="card-soft p-5">
              <div className="num text-[11px] font-semibold tracking-widest text-teal uppercase">
                {c.s}
              </div>
              <h3 className="mt-2 text-[15px] font-semibold text-ink">{c.t}</h3>
              <p className="mt-1.5 text-[13px] leading-6 text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export async function HealthScore() {
  const t = await getTranslations("Home");

  const parts = [
    { label: t("health.profitability"), value: 82 },
    { label: t("health.liquidity"), value: 74 },
    { label: t("health.growth"), value: 71 },
    { label: t("health.expenseEfficiency"), value: 85 },
  ];

  return (
    <Section>
      <Eyebrow>{t("health.eyebrow")}</Eyebrow>
      <h2 className="mt-4 text-[28px] leading-[1.35] font-bold text-ink sm:text-[36px]">
        {t("health.title")}
      </h2>

      <div className="card-soft mt-10 grid gap-8 p-6 sm:p-9 lg:grid-cols-[auto_minmax(0,1fr)]">
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="text-[13px] font-semibold text-muted-foreground">
            {t("health.scoreLabel")}
          </span>
          <Gauge score={78} label={t("health.scoreLabel")} />
          <div className="-mt-2 text-[13px] font-semibold text-positive">{t("health.good")}</div>
        </div>

        <HealthBars parts={parts} />
      </div>

      <p className="mt-5 text-[13px] leading-7 text-muted-foreground">{t("health.note")}</p>
    </Section>
  );
}

export async function MultiCompany() {
  const t = await getTranslations("Home");

  const levels = [
    { l: t("multi.levels.group") },
    { l: t("multi.levels.company") },
    { l: t("multi.levels.branches") },
    { l: t("multi.levels.periods") },
    { l: t("multi.levels.data") },
  ];

  const caps = [
    t("multi.caps.companies"),
    t("multi.caps.manageBranches"),
    t("multi.caps.isolate"),
    t("multi.caps.managePeriods"),
    t("multi.caps.comparePeriods"),
    t("multi.caps.viewPeriods"),
    t("multi.caps.compareAllPeriods"),
    t("multi.caps.compareAll"),
  ];

  return (
    <Section>
      <Eyebrow>{t("multi.eyebrow")}</Eyebrow>
      <h2 className="mt-4 text-[28px] leading-[1.35] font-bold text-ink sm:text-[36px]">
        {t("multi.title")}
      </h2>

      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="card-soft p-5">
          {levels.map((l, i) => (
            <div key={i} style={{ paddingInlineStart: `${i * 18}px` }} className="py-1.5">
              <div className="flex items-center gap-2.5">
                {i > 0 && (
                  <span className="text-hairline" aria-hidden="true">
                    └
                  </span>
                )}
                <span
                  className={`rounded-lg border px-3 py-2 text-[13px] ${
                    i === 0
                      ? "border-ink bg-ink font-semibold text-primary-foreground"
                      : "border-hairline bg-surface text-ink"
                  }`}
                >
                  {l.l}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2">
          {caps.map((c, i) => (
            <div key={i} className="bg-surface px-5 py-5 text-[13.5px] font-medium text-ink">
              {c}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
