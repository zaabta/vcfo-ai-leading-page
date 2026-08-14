"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { SectionClient, Eyebrow, SoonBadge } from "./eyebrow-client";

/**
 * What-if analysis playground — the interactive sliders and preset scenario
 * buttons are intentionally client-side (the "interactive pricing controls"
 * category). Everything else about the section is server-rendered markup.
 */
export function Scenarios() {
  const t = useTranslations("Home");
  const [revenue, setRevenue] = useState(6);
  const [opex, setOpex] = useState(20);
  const [cogs, setCogs] = useState(0);

  const presets = [
    { label: t("scenarios.preset1"), revenueDeltaPct: 6, opexDeltaPct: 20, cogsDeltaPct: 0 },
    { label: t("scenarios.preset2"), revenueDeltaPct: 0, opexDeltaPct: -10, cogsDeltaPct: 0 },
    { label: t("scenarios.preset3"), revenueDeltaPct: 5, opexDeltaPct: 0, cogsDeltaPct: 2 },
  ];

  const revenueImpact = revenue;
  const expensesImpact = -opex;
  const profitImpact = revenue - opex * 0.65 + cogs * 0.22;
  const cashImpact = revenue * 0.7 - opex * 0.4 - cogs * 0.2;
  const netCurrent = 612_400;
  const projectedNet = netCurrent * (1 + profitImpact / 100);

  return (
    <SectionClient>
      <div className="flex flex-wrap items-center gap-3">
        <Eyebrow>What-if Analysis</Eyebrow>
        <SoonBadge />
      </div>
      <h2 className="mt-4 text-[28px] leading-[1.35] font-bold text-ink sm:text-[36px]">
        {t("scenarios.title")}
      </h2>
      <p className="mt-4 max-w-[68ch] text-[15px] leading-8 text-muted-foreground">
        {t("scenarios.subtitle")}
      </p>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        <div className="card-soft p-5">
          <div className="flex items-center gap-2 text-[14px] font-semibold text-ink">
            <span className="text-lg" aria-hidden="true">
              ⚙️
            </span>
            {t("scenarios.assumptions")}
          </div>

          <div className="mt-5 space-y-5">
            {[
              {
                label: t("scenarios.revenueGrowth"),
                value: revenue,
                set: setRevenue,
                min: -30,
                max: 30,
              },
              { label: t("scenarios.opexChange"), value: opex, set: setOpex, min: -30, max: 30 },
              { label: t("scenarios.cogsChange"), value: cogs, set: setCogs, min: -20, max: 20 },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-1.5 flex items-center justify-between text-[12px] text-muted-foreground">
                  <label htmlFor={`slider-${item.label}`}>{item.label}</label>
                  <span className="num font-bold text-ink" dir="ltr">
                    {item.value > 0 ? "+" : ""}
                    {item.value}%
                  </span>
                </div>
                <input
                  id={`slider-${item.label}`}
                  type="range"
                  min={item.min}
                  max={item.max}
                  value={item.value}
                  onChange={(e) => item.set(Number(e.target.value))}
                  className="w-full accent-[#1f8578]"
                  dir="ltr"
                />
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-hairline pt-4">
            <div className="mb-2 text-[11px] font-semibold text-muted-foreground">
              {t("scenarios.presets")}
            </div>
            <div className="flex flex-wrap gap-2">
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setRevenue(preset.revenueDeltaPct);
                    setOpex(preset.opexDeltaPct);
                    setCogs(preset.cogsDeltaPct);
                  }}
                  className="rounded-full border border-border bg-surface px-3 py-1.5 text-[11px] font-semibold text-ink transition-colors hover:border-teal hover:text-teal"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid gap-3 sm:grid-cols-4">
            <div className="card-soft p-4 text-center">
              <div className="text-[11px] text-muted-foreground">{t("scenarios.revImpact")}</div>
              <div className="num mt-2 text-[20px] font-bold text-positive">
                {revenueImpact.toFixed(1)}%
              </div>
            </div>
            <div className="card-soft p-4 text-center">
              <div className="text-[11px] text-muted-foreground">{t("scenarios.expImpact")}</div>
              <div className="num mt-2 text-[20px] font-bold text-danger">
                {expensesImpact.toFixed(1)}%
              </div>
            </div>
            <div className="card-soft p-4 text-center">
              <div className="text-[11px] text-muted-foreground">{t("scenarios.profitImpact")}</div>
              <div className="num mt-2 text-[20px] font-bold text-positive">
                {profitImpact.toFixed(1)}%
              </div>
            </div>
            <div className="card-soft p-4 text-center">
              <div className="text-[11px] text-muted-foreground">{t("scenarios.cashImpact")}</div>
              <div className="num mt-2 text-[20px] font-bold text-positive">
                {cashImpact.toFixed(1)}%
              </div>
            </div>
          </div>

          <div className="card-soft overflow-hidden">
            <div className="border-b border-hairline bg-surface-2/70 px-5 py-3 text-[14px] font-semibold text-ink">
              {t("scenarios.comparison")}
            </div>
            <div className="grid gap-0 p-5 sm:grid-cols-3">
              {(
                [
                  [t("scenarios.revenue"), 4_820_000, revenueImpact],
                  [t("scenarios.opex"), 1_122_800, expensesImpact],
                  [t("scenarios.netProfit"), 612_400, profitImpact],
                ] as const
              ).map(([label, current, delta]) => {
                const base = Number(current);
                const d = Number(delta);
                const scenarioValue = base * (1 + d / 100);

                return (
                  <div
                    key={label}
                    className="border-b border-hairline py-3 text-center last:border-b-0 sm:border-b-0 sm:border-e sm:last:border-e-0"
                  >
                    <div className="text-[11px] text-muted-foreground">{label}</div>
                    <div className="mt-2 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                      <div>
                        <div className="num text-[13px] font-bold text-ink">
                          {base.toLocaleString()}
                        </div>
                        <div className="text-[9px] text-muted-foreground">
                          {t("scenarios.current")}
                        </div>
                      </div>
                      <div className="text-muted-foreground/50" aria-hidden="true">
                        ←
                      </div>
                      <div>
                        <div
                          className={`num text-[13px] font-bold ${d >= 0 ? "text-positive" : "text-danger"}`}
                        >
                          {scenarioValue.toLocaleString()}
                        </div>
                        <div className="text-[9px] text-muted-foreground">
                          {t("scenarios.scenario")}
                        </div>
                      </div>
                    </div>
                    <div className="num mt-1.5 text-[10px] text-muted-foreground" dir="ltr">
                      Δ {d > 0 ? "+" : ""}
                      {d.toFixed(1)}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card-soft border border-primary/25 bg-primary/5 p-4">
            <div className="flex items-start gap-3">
              <span className="text-lg" aria-hidden="true">
                ✨
              </span>
              <div>
                <div className="text-[12px] font-bold text-primary">
                  {t("scenarios.explanation")}
                </div>
                <p className="mt-1 text-[13px] leading-relaxed text-ink/80">
                  {t("scenarios.explanationBody", {
                    projected: projectedNet.toLocaleString("en-US"),
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionClient>
  );
}
