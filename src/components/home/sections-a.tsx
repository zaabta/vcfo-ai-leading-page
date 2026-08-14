import { getTranslations } from "next-intl/server";
import { Section, Eyebrow } from "./section";

const problems = [
  { n: "01", title: "problems.excel.title", body: "problems.excel.body" },
  { n: "02", title: "problems.mismatch.title", body: "problems.mismatch.body" },
  { n: "03", title: "problems.manual.title", body: "problems.manual.body" },
  { n: "04", title: "problems.unclear.title", body: "problems.unclear.body" },
] as const;

export async function Problem() {
  const t = await getTranslations("Home");

  return (
    <Section>
      <Eyebrow>{t("problem.eyebrow")}</Eyebrow>
      <h2 className="mt-4 max-w-[20ch] text-[28px] leading-[1.35] font-bold text-ink sm:text-[36px]">
        {t("problem.title")}
      </h2>
      <p className="mt-4 max-w-[62ch] text-[15px] leading-8 text-muted-foreground">
        {t("problem.subtitle")}
      </p>

      <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
        {problems.map((p) => (
          <div key={p.n} className="group bg-surface p-6 transition-colors hover:bg-surface-2">
            <span className="num text-[12px] font-semibold text-teal">{p.n}</span>
            <h3 className="mt-3 text-[15.5px] font-semibold text-ink">{t(p.title)}</h3>
            <p className="mt-2 text-[13.5px] leading-7 text-muted-foreground">{t(p.body)}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export { Solution } from "./solution";
export { HowItWorks } from "./how-it-works";
export { FinancialTruth } from "./financial-truth";
