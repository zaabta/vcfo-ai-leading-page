import { getTranslations } from "next-intl/server";
import { Section, Eyebrow } from "./section";

const states = [
  { s: "✓ VALID", cls: "border-positive/35 bg-positive/8 text-positive" },
  { s: "⚠ WARNING", cls: "border-warning/40 bg-warning/10 text-warning" },
  { s: "⚠ REVIEW REQUIRED", cls: "border-warning/40 bg-warning/10 text-warning" },
  { s: "✕ FAILED", cls: "border-danger/35 bg-danger/8 text-danger" },
];

export async function DataQuality() {
  const t = await getTranslations("Home");

  return (
    <Section>
      <Eyebrow>{t("quality.eyebrow")}</Eyebrow>
      <h2 className="mt-4 max-w-[30ch] text-[28px] leading-[1.35] font-bold text-ink sm:text-[36px]">
        {t("quality.title")}
      </h2>
      <p className="mt-4 max-w-[68ch] text-[15px] leading-8 text-muted-foreground">
        {t("quality.subtitle")}
      </p>

      <div className="mt-8 flex flex-wrap gap-2.5">
        {states.map((s) => (
          <span
            key={s.s}
            className={`num rounded-lg border px-3 py-1.5 text-[12px] font-semibold ${s.cls}`}
          >
            {s.s}
          </span>
        ))}
      </div>

      <div className="card-soft mt-8 overflow-hidden">
        <div className="grid gap-4 p-5 sm:grid-cols-3 sm:p-6">
          <div>
            <div className="text-[11.5px] text-muted-foreground">{t("quality.account")}</div>
            <div className="mt-1.5 text-[14px] font-semibold text-ink">
              <span className="num">5100</span> — {t("quality.opex")}
            </div>
          </div>
          <div>
            <div className="text-[11.5px] text-muted-foreground">{t("quality.status")}</div>
            <div className="mt-1.5 text-[14px] font-semibold text-danger">
              {t("quality.notFound")}
            </div>
          </div>
          <div>
            <div className="text-[11.5px] text-muted-foreground">{t("quality.action")}</div>
            <div className="mt-1.5 text-[14px] font-semibold text-ink">
              {t("quality.reviewMapping")}
            </div>
          </div>
        </div>
        <div className="border-t border-hairline bg-surface-2/60 px-5 py-3.5 sm:px-6">
          <button
            type="button"
            className="rounded-lg bg-ink px-4 py-2 text-[13px] font-semibold text-primary-foreground transition-transform hover:-translate-y-px"
          >
            {t("quality.reviewIssue")}
          </button>
        </div>
      </div>
    </Section>
  );
}

const issueKeys = [
  { n: "01", key: "missing", ref: "1205" },
  { n: "02", key: "unmapped", ref: "5100" },
  { n: "03", key: "invalid", ref: "Row 84" },
  { n: "04", key: "duplicate", ref: "4100" },
] as const;

export async function ErrorResolution() {
  const t = await getTranslations("Home");

  return (
    <Section>
      <Eyebrow>{t("errors.eyebrow")}</Eyebrow>
      <h2 className="mt-4 text-[28px] leading-[1.35] font-bold text-ink sm:text-[36px]">
        {t("errors.title")}
      </h2>

      <div className="card-soft mt-10 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline bg-surface-2/70 px-5 py-3.5">
          <span className="text-[13.5px] font-semibold text-ink">
            {t("errors.found1")} <span className="num">4</span> {t("errors.found2")}
          </span>
          <span className="num rounded-md border border-danger/30 bg-danger/8 px-2.5 py-1 text-[11px] font-semibold text-danger">
            ✕ FAILED
          </span>
        </div>
        <div className="divide-y divide-hairline">
          {issueKeys.map((i) => (
            <div key={i.n} className="flex items-center gap-4 px-5 py-4">
              <span className="num text-[12px] font-semibold text-teal">{i.n}</span>
              <span className="min-w-0 flex-1 truncate text-[14px] text-ink">
                {t(`errors.${i.key}`)}
              </span>
              <span className="num shrink-0 rounded-md bg-surface-2 px-2 py-1 text-[12px] font-semibold text-ink">
                {i.ref}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t border-hairline px-5 py-4">
          <button
            type="button"
            className="rounded-lg bg-ink px-4 py-2 text-[13px] font-semibold text-primary-foreground transition-transform hover:-translate-y-px"
          >
            {t("errors.review")}
          </button>
        </div>
      </div>

      <p className="mt-5 max-w-[70ch] text-[13.5px] leading-7 text-muted-foreground">
        {t("errors.note")}
      </p>
    </Section>
  );
}

/** Enterprise security summary (kept for parity with the original component set). */
export async function Security() {
  const t = await getTranslations("Home");
  const items = [
    "Tenant Isolation",
    "Role-Based Access",
    "Audit Logs",
    "Financial Data Lineage",
    "Processing History",
  ];

  return (
    <div className="border-y border-hairline bg-surface-2/50">
      <Section>
        <Eyebrow>{t("security.eyebrow")}</Eyebrow>
        <h2 className="mt-4 max-w-[30ch] text-[28px] leading-[1.35] font-bold text-ink sm:text-[36px]">
          {t("security.title")}
        </h2>
        <p className="mt-4 max-w-[68ch] text-[15px] leading-8 text-muted-foreground">
          {t("security.subtitle")}
        </p>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.05fr_1fr]">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2">
            {items.map((i) => (
              <div key={i} className="num bg-surface px-5 py-5 text-[13px] font-semibold text-ink">
                {i}
              </div>
            ))}
          </div>

          <div className="card-soft p-5">
            <div className="text-[11.5px] font-semibold tracking-widest text-muted-foreground uppercase">
              Audit log
            </div>
            <div className="mt-4 flex items-start gap-3">
              <span className="num grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-[12px] font-semibold text-primary-foreground">
                AL
              </span>
              <div className="min-w-0">
                <p className="text-[13.5px] leading-7 text-ink">
                  <span className="font-semibold">Ali</span> {t("security.auditAction")}
                </p>
                <div className="mt-2 grid gap-1 text-[12.5px] text-muted-foreground">
                  <span>{t("security.auditCompany")}</span>
                  <span>{t("security.auditPeriod")}</span>
                  <span className="num">{t("security.auditTime")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
