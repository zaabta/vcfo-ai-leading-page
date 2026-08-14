"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { Eyebrow } from "./eyebrow-client";
import { cn } from "@/lib/utils";

const pipelineKeys = [
  "pipeline.upload",
  "pipeline.clean",
  "pipeline.map",
  "pipeline.validate",
  "pipeline.truth",
  "pipeline.statements",
  "pipeline.analytics",
  "pipeline.advisor",
] as const;

/**
 * "The solution" pipeline — steps light up one by one when the section
 * becomes visible (client-only animation, content is server-rendered).
 */
export function Solution() {
  const t = useTranslations("Home");
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(-1);

  useEffect(() => {
    if (!visible) return;
    let i = 0;
    const id = setInterval(() => {
      setStep(i);
      i += 1;
      if (i >= pipelineKeys.length) clearInterval(id);
    }, 260);
    return () => clearInterval(id);
  }, [visible]);

  return (
    <Reveal
      as="section"
      id="features"
      onVisible={setVisible}
      className="mx-auto w-full max-w-[1180px] px-5 py-0 sm:px-8 md:py-0"
    >
      <div className="rounded-3xl border border-hairline bg-surface-2/60 p-6 sm:p-10">
        <Eyebrow>{t("solution.eyebrow")}</Eyebrow>
        <h2 className="mt-4 max-w-[26ch] text-[28px] leading-[1.35] font-bold text-ink sm:text-[36px]">
          {t("solution.title")}
        </h2>

        <div className="mt-10 grid gap-3 md:grid-cols-4">
          {pipelineKeys.map((key, i) => {
            const on = i <= step;
            const truth = i === 4;
            return (
              <div
                key={key}
                className={cn(
                  "relative rounded-xl border p-4 transition-all duration-500",
                  on
                    ? truth
                      ? "border-ink bg-ink text-primary-foreground"
                      : "border-teal/40 bg-surface"
                    : "border-hairline bg-surface/40 opacity-55",
                )}
              >
                <div
                  className={cn(
                    "num text-[11px] font-semibold",
                    truth && on ? "text-teal-soft" : "text-teal",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div
                  className={cn("mt-2 text-[13.5px] font-semibold", !(truth && on) && "text-ink")}
                >
                  {t(key)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}
