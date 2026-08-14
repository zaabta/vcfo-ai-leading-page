import { getTranslations } from "next-intl/server";
import { Section } from "./section";

export async function FinancialTruth() {
  const t = await getTranslations("Home");

  const branches = [
    t("truth.branch.income"),
    t("truth.branch.balance"),
    t("truth.branch.kpis"),
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
          {t("truth.title")}
        </h2>
        <p className="mt-4 max-w-[70ch] text-[15px] leading-8 opacity-70">{t("truth.subtitle")}</p>

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-center">
          <div className="space-y-3">
            <div className="rounded-xl border border-white/12 bg-white/[0.04] p-4 text-[13.5px] font-semibold">
              Trial Balance
            </div>
            <div className="ps-4 text-white/30" aria-hidden="true">
              ↓
            </div>
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
          {t("truth.footer")}
        </p>
      </Section>
    </div>
  );
}
