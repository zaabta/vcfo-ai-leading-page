"use client";

import { useState } from "react";
import { Check, Minus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from "@/lib/whatsapp";
import { SectionClient, Eyebrow } from "./eyebrow-client";
import type { Locale } from "@/lib/site";

type Cycle = "monthly" | "yearly";

type Plan = {
  id: "starter" | "growth" | "enterprise";
  nameKey: string;
  descKey: string;
  monthly: number | null;
  yearly: number | null;
  popular?: boolean;
  featuresKey: string;
  ctaKey: string;
};

const plans: Plan[] = [
  {
    id: "starter",
    nameKey: "pricing.starter",
    descKey: "pricing.starterDesc",
    monthly: 349,
    yearly: 279,
    featuresKey: "pricing.starterFeatures",
    ctaKey: "pricing.starterCta",
  },
  {
    id: "growth",
    nameKey: "pricing.growth",
    descKey: "pricing.growthDesc",
    monthly: 899,
    yearly: 719,
    popular: true,
    featuresKey: "pricing.growthFeatures",
    ctaKey: "pricing.growthCta",
  },
  {
    id: "enterprise",
    nameKey: "pricing.enterprise",
    descKey: "pricing.enterpriseDesc",
    monthly: null,
    yearly: null,
    featuresKey: "pricing.enterpriseFeatures",
    ctaKey: "pricing.enterpriseCta",
  },
];

const matrixKeys = [
  { label: "pricing.matrix.companies", values: ["1", "3", "pricing.unlimited"] },
  { label: "pricing.matrix.branches", values: ["1", "pricing.unlimited", "pricing.unlimited"] },
  { label: "pricing.matrix.statements", values: [true, true, true] },
  { label: "pricing.matrix.cashflow", values: [false, true, true] },
  { label: "pricing.matrix.analytics", values: [false, true, true] },
  { label: "pricing.matrix.health", values: [false, true, true] },
  { label: "pricing.matrix.forecasts", values: [false, false, true] },
  { label: "pricing.matrix.audit", values: [false, true, true] },
  { label: "pricing.matrix.aiAdvisor", values: [false, false, "pricing.soon"] },
  {
    label: "pricing.matrix.support",
    values: ["pricing.email", "pricing.priority", "pricing.dedicated"],
  },
] as const;

function Cell({ v }: { v: boolean | string }) {
  if (v === true) return <Check className="mx-auto h-4 w-4 text-teal" />;
  if (v === false) return <Minus className="mx-auto h-4 w-4 text-hairline" />;
  return <span className="num text-[12.5px] font-medium text-ink">{v}</span>;
}

/**
 * Pricing section — client component for the monthly/yearly toggle and the
 * localized plan matrix (interactive pricing controls).
 */
export function Pricing() {
  const t = useTranslations("Home");
  const locale = useLocale() as Locale;
  const [cycle, setCycle] = useState<Cycle>("yearly");
  const getStartedUrl = getWhatsAppUrl(WHATSAPP_MESSAGES.getStarted);
  const salesUrl = getWhatsAppUrl(WHATSAPP_MESSAGES.sales);

  return (
    <SectionClient id="pricing">
      <Eyebrow>{t("pricing.eyebrow")}</Eyebrow>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
        <div>
          <h2 className="max-w-[24ch] text-[28px] leading-[1.35] font-bold text-ink sm:text-[36px]">
            {t("pricing.title")}
          </h2>
          <p className="mt-4 max-w-[58ch] text-[15px] leading-8 text-muted-foreground">
            {t("pricing.subtitle")}
          </p>
        </div>

        <div className="inline-flex items-center rounded-full border border-hairline bg-surface-2 p-1 text-[13px]">
          {(
            [
              { k: "monthly", l: t("pricing.monthly") },
              { k: "yearly", l: t("pricing.yearly") },
            ] as const
          ).map((o) => (
            <button
              key={o.k}
              type="button"
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
                  {t("pricing.mostPopular")}
                </span>
              )}
              <div className="flex items-baseline justify-between gap-3">
                <h3 className={`text-[17px] font-bold ${p.popular ? "" : "text-ink"}`}>
                  {t(p.nameKey)}
                </h3>
                <span
                  className={`num text-[11px] font-semibold tracking-widest uppercase ${
                    p.popular ? "text-teal-soft" : "text-teal"
                  }`}
                >
                  {p.id === "starter" ? "Starter" : p.id === "growth" ? "Growth" : "Enterprise"}
                </span>
              </div>
              <p
                className={`mt-2 text-[13.5px] leading-7 ${p.popular ? "opacity-70" : "text-muted-foreground"}`}
              >
                {t(p.descKey)}
              </p>

              <div className="mt-6 flex items-end gap-2">
                {price === null ? (
                  <span className={`text-[28px] font-bold ${p.popular ? "" : "text-ink"}`}>
                    {t("pricing.custom")}
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
                      <span className="num">SAR</span> / {t("pricing.perMonth")}
                    </span>
                  </>
                )}
              </div>
              {price !== null && cycle === "yearly" && (
                <p
                  className={`mt-1.5 text-[12px] ${p.popular ? "opacity-60" : "text-muted-foreground"}`}
                >
                  {t("pricing.billedAnnually")}
                </p>
              )}

              <ul
                className="mt-6 grid gap-3 border-t pt-6 text-[13.5px] leading-6"
                style={{ borderColor: p.popular ? "rgba(255,255,255,0.12)" : "var(--hairline)" }}
              >
                {(t.raw(p.featuresKey) as string[]).map((f) => (
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
                data-cta={p.id === "enterprise" ? "enterprise_sales" : `plan_${p.id}`}
                data-cta-loc="pricing"
                className={`mt-8 block rounded-lg px-5 py-3 text-center text-[14px] font-semibold transition-transform hover:-translate-y-px ${
                  p.popular
                    ? "bg-primary-foreground text-ink"
                    : "border border-ink bg-surface text-ink hover:bg-surface-2"
                }`}
              >
                {t(p.ctaKey)}
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
                <th scope="col" className="p-4 text-start text-[13px] font-semibold text-ink">
                  {t("pricing.comparison")}
                </th>
                {plans.map((p) => (
                  <th
                    key={p.id}
                    scope="col"
                    className="p-4 text-center text-[13px] font-semibold text-ink"
                  >
                    {t(p.nameKey)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {matrixKeys.map((row) => (
                <tr key={row.label} className="bg-surface transition-colors hover:bg-surface-2/50">
                  <th scope="row" className="p-4 text-start font-normal text-muted-foreground">
                    {t(row.label)}
                  </th>
                  {row.values.map((v, i) => {
                    const value = typeof v === "string" && v.startsWith("pricing.") ? t(v) : v;
                    return (
                      <td key={i} className="p-4 text-center">
                        <Cell v={value as boolean | string} />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-hairline bg-surface-2/60 p-6 sm:flex-row sm:items-center sm:p-8">
        <div>
          <h3 className="text-[16px] font-semibold text-ink">{t("pricing.bannerTitle")}</h3>
          <p className="mt-1.5 text-[13.5px] leading-7 text-muted-foreground">
            {t("pricing.bannerBody")}
          </p>
        </div>
        <a
          href={getStartedUrl}
          target="_blank"
          rel="noreferrer noopener"
          data-cta="start_free"
          data-cta-loc="pricing_banner"
          className="shrink-0 rounded-lg bg-ink px-6 py-3 text-[14px] font-semibold text-primary-foreground transition-transform hover:-translate-y-px"
        >
          {t("pricing.startFree")}
        </a>
      </div>
      <span className="hidden">{locale}</span>
    </SectionClient>
  );
}
