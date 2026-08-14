import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { Section, Eyebrow } from "./section";

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
  aside?: ReactNode;
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

export async function HowItWorks() {
  const t = await getTranslations("Home");
  const tStep = (key: string) => t(`how.${key}` as never);

  return (
    <Section id="how">
      <Eyebrow>{t("how.eyebrow")}</Eyebrow>
      <h2 className="mt-4 max-w-[28ch] text-[28px] leading-[1.35] font-bold text-ink sm:text-[36px]">
        {t("how.title")}
      </h2>

      <div className="mt-12 space-y-px overflow-hidden rounded-2xl border border-hairline bg-hairline">
        <Step
          n="01"
          title={tStep("step1.title")}
          body={tStep("step1.body")}
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
        <Step n="02" title={tStep("step2.title")} body={tStep("step2.body")} />
        <Step
          n="03"
          title={tStep("step3.title")}
          body={tStep("step3.body")}
          aside={
            <div className="flex flex-wrap items-center gap-3 rounded-xl border border-hairline bg-surface-2 p-3 text-[12.5px]">
              <span className="num font-semibold text-ink">1200</span>
              <span className="text-ink">{t("how.step3.cash")}</span>
              <span className="text-hairline">←</span>
              <span className="num rounded-md bg-surface px-2 py-1 font-semibold text-teal">
                Cash &amp; Cash Equivalents
              </span>
            </div>
          }
        />
        <Step
          n="04"
          title={tStep("step4.title")}
          body={tStep("step4.body")}
          list={[
            t("how.step4.balance"),
            t("how.step4.missing"),
            t("how.step4.unmapped"),
            t("how.step4.duplicates"),
            t("how.step4.period"),
            t("how.step4.equation"),
          ]}
        />
        <Step
          n="05"
          title={tStep("step5.title")}
          body={tStep("step5.body")}
          list={[
            t("how.step5.income"),
            t("how.step5.balance"),
            t("how.step5.kpis"),
            t("how.step5.analytics"),
            t("how.step5.forecasts"),
            t("how.step5.intelligence"),
          ]}
        />
      </div>
    </Section>
  );
}
