"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { SectionClient, SoonBadge } from "./eyebrow-client";

/**
 * AI CFO conversational preview — bubbles appear sequentially when the
 * section becomes visible (client-only animation).
 */
export function AICfo() {
  const t = useTranslations("Home");
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const timers = [700, 1900, 3000].map((ms, i) => setTimeout(() => setStep(i + 1), ms));
    return () => timers.forEach(clearTimeout);
  }, [visible]);

  const bubble = (on: boolean) =>
    `transition-all duration-600 ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`;

  return (
    <div id="aicfo" className="bg-ink text-primary-foreground">
      <SectionClient onVisible={setVisible}>
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center rounded-full border border-white/15 px-3 py-1 text-[11px] font-medium tracking-[0.14em] uppercase opacity-80">
            AI CFO
          </span>
          <SoonBadge />
        </div>

        <h2 className="mt-5 max-w-[26ch] text-[28px] leading-[1.4] font-bold sm:text-[36px]">
          {t("aicfo.title")}
        </h2>
        <p className="mt-4 text-[15px] opacity-70">{t("aicfo.subtitle")}</p>

        <div className="mt-10 overflow-hidden rounded-2xl border border-white/12 bg-white/[0.03]">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-[12px] opacity-70">
            <span>VCFO Advisor</span>
            <span className="num">Financial Truth · Acme · {t("aicfo.month")}</span>
          </div>

          <div className="space-y-4 p-4 sm:p-6">
            <div className={`flex justify-start ${bubble(step >= 1)}`}>
              <p className="max-w-[80%] rounded-2xl rounded-ss-sm bg-white/[0.07] px-4 py-3 text-[13.5px] leading-7">
                {t("aicfo.question")}
              </p>
            </div>

            <div className={`flex justify-end ${bubble(step >= 2)}`}>
              <div className="max-w-[86%] rounded-2xl rounded-se-sm border border-teal/35 bg-teal/12 px-4 py-3">
                <p className="text-[13.5px] leading-8">
                  {t("aicfo.answer1")} <span className="num font-semibold">8.4%</span>{" "}
                  {t("aicfo.answer2")} <span className="num font-semibold">14%</span>
                  {t("aicfo.answer3")}
                </p>
              </div>
            </div>

            <div className={`flex justify-end ${bubble(step >= 3)}`}>
              <div className="max-w-[86%] space-y-3">
                <p className="rounded-2xl rounded-se-sm border border-white/10 bg-white/[0.05] px-4 py-3 text-[13.5px] leading-7">
                  {t("aicfo.followUp")}
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="rounded-lg bg-primary-foreground px-3.5 py-2 text-[12.5px] font-semibold text-ink"
                  >
                    {t("aicfo.yesDetails")}
                  </button>
                  <button
                    type="button"
                    className="rounded-lg border border-white/20 px-3.5 py-2 text-[12.5px] font-semibold"
                  >
                    {t("aicfo.comparePeriod")}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 px-4 py-3 text-[11.5px] opacity-60">
            {t("aicfo.footer")}
          </div>
        </div>
      </SectionClient>
    </div>
  );
}
