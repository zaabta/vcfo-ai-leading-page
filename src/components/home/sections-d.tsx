import { getTranslations } from "next-intl/server";
import { Section, Eyebrow, SoonBadge } from "./section";
import { CountUp } from "@/components/shared/count-up";
import { AICfo } from "./ai-cfo";
import { Scenarios } from "./scenarios";
import { ForecastChart } from "./forecast-chart";

export async function AICapabilities() {
  const t = await getTranslations("Home");

  const caps = [
    { t: t("caps.analysis"), q: t("caps.q1") },
    { t: t("caps.rootCause"), q: t("caps.q2") },
    { t: t("caps.recommendations"), q: t("caps.q3") },
    { t: t("caps.scenarios"), q: t("caps.q4") },
    { t: t("caps.forecasts"), q: t("caps.q5") },
    { t: t("caps.conversation"), q: t("caps.q6") },
  ];

  const recommendations = [
    {
      title: t("caps.rec1.title"),
      body: t("caps.rec1.body"),
      impact: t("caps.rec1.impact"),
      priority: "high" as const,
      icon: "🔥",
      label: t("caps.priority.high"),
    },
    {
      title: t("caps.rec2.title"),
      body: t("caps.rec2.body"),
      impact: t("caps.rec2.impact"),
      priority: "medium" as const,
      icon: "↗",
      label: t("caps.priority.medium"),
    },
    {
      title: t("caps.rec3.title"),
      body: t("caps.rec3.body"),
      impact: t("caps.rec3.impact"),
      priority: "low" as const,
      icon: "🌿",
      label: t("caps.priority.low"),
    },
  ];

  const priorityStyles = {
    high: "border-[#eec6c6] bg-[#fbecec] text-destructive",
    medium: "border-[#ecd9b0] bg-[#fbf3e2] text-warning",
    low: "border-border bg-secondary/60 text-muted-foreground",
  } as const;

  return (
    <Section>
      <div className="flex flex-wrap items-center gap-3">
        <Eyebrow>{t("caps.eyebrow")}</Eyebrow>
        <SoonBadge />
      </div>
      <h2 className="mt-4 text-[28px] leading-[1.35] font-bold text-ink sm:text-[36px]">
        {t("caps.title")}
      </h2>

      <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
        {caps.map((c) => (
          <div key={c.t} className="bg-surface p-6 transition-colors hover:bg-surface-2">
            <h3 className="text-[15.5px] font-semibold text-ink">{c.t}</h3>
            <p className="mt-2 text-[13.5px] leading-7 text-muted-foreground">“{c.q}”</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {recommendations.map((item) => (
          <div key={item.title} className="card-soft p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[18px]" aria-hidden="true">
                {item.icon}
              </span>
              <span
                className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${priorityStyles[item.priority]}`}
              >
                {item.label}
              </span>
            </div>
            <h3 className="mt-4 text-[15px] font-semibold text-ink">{item.title}</h3>
            <p className="mt-2 text-[13.5px] leading-7 text-muted-foreground">{item.body}</p>
            <p className="mt-4 text-[12.5px] font-semibold text-ink/80">{item.impact}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export async function Forecast() {
  const t = await getTranslations("Home");

  return (
    <Section>
      <div className="flex flex-wrap items-center gap-3">
        <Eyebrow>Forecasting</Eyebrow>
        <SoonBadge />
      </div>
      <h2 className="mt-4 text-[28px] leading-[1.35] font-bold text-ink sm:text-[36px]">
        {t("forecast.title")}
      </h2>

      <div className="card-soft mt-10 p-5 sm:p-7">
        <div className="flex flex-wrap items-center gap-5 text-[12px] text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <span className="h-0.5 w-6 bg-ink" /> Historical · Actual data
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-0.5 w-6 border-t-2 border-dashed border-teal" /> Forecast
          </span>
        </div>
        <div className="mt-4">
          <ForecastChart />
        </div>
        <div className="mt-5 grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-3">
          {[
            { l: "Revenue Forecast", v: 5.42, s: "M" },
            { l: "Profit Forecast", v: 0.78, s: "M" },
            { l: "Cash Forecast", v: 2.61, s: "M" },
          ].map((m) => (
            <div key={m.l} className="bg-surface px-4 py-4">
              <div className="num text-[11.5px] text-muted-foreground">{m.l}</div>
              <div className="mt-1.5 text-[18px] font-semibold text-ink">
                <CountUp to={m.v} decimals={2} suffix={m.s} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-[12.5px] text-muted-foreground">{t("forecast.comingSoon")}</p>
    </Section>
  );
}

export { AICfo, Scenarios };
