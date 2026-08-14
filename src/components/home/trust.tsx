import { ShieldCheck, Lock, KeyRound, FileCheck2, Server, EyeOff, Quote } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Section, Eyebrow } from "./section";

const pillars = [
  {
    icon: ShieldCheck,
    title: "compliance.pillars.protection.title",
    body: "compliance.pillars.protection.body",
    tags: ["Tenant Isolation", "Daily Backups", "Disaster Recovery"],
  },
  {
    icon: Lock,
    title: "compliance.pillars.encryption.title",
    body: "compliance.pillars.encryption.body",
    tags: ["TLS 1.3", "AES-256 at rest", "Managed Keys"],
  },
  {
    icon: KeyRound,
    title: "compliance.pillars.access.title",
    body: "compliance.pillars.access.body",
    tags: ["RBAC", "SSO / 2FA", "Least Privilege"],
  },
  {
    icon: FileCheck2,
    title: "compliance.pillars.audit.title",
    body: "compliance.pillars.audit.body",
    tags: ["Audit Logs", "Data Lineage", "Retention Policy"],
  },
  {
    icon: Server,
    title: "compliance.pillars.hosting.title",
    body: "compliance.pillars.hosting.body",
    tags: ["Regional Hosting", "Monitoring", "99.9% Uptime"],
  },
  {
    icon: EyeOff,
    title: "compliance.pillars.privacy.title",
    body: "compliance.pillars.privacy.body",
    tags: ["No Model Training", "Data Deletion", "PDPL Aligned"],
  },
] as const;

export async function Compliance() {
  const t = await getTranslations("Home");

  return (
    <Section id="compliance">
      <Eyebrow>{t("compliance.eyebrow")}</Eyebrow>
      <h2 className="mt-4 max-w-[28ch] text-[28px] leading-[1.35] font-bold text-ink sm:text-[36px]">
        {t("compliance.title")}
      </h2>
      <p className="mt-4 max-w-[66ch] text-[15px] leading-8 text-muted-foreground">
        {t("compliance.subtitle")}
      </p>

      <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
        {pillars.map((p) => (
          <div key={p.title} className="bg-surface p-6 transition-colors hover:bg-surface-2/60">
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-hairline bg-surface-2">
              <p.icon className="h-[18px] w-[18px] text-teal" />
            </span>
            <h3 className="mt-4 text-[15.5px] font-semibold text-ink">{t(p.title)}</h3>
            <p className="mt-2 text-[13.5px] leading-7 text-muted-foreground">{t(p.body)}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.tags.map((g) => (
                <span
                  key={g}
                  className="num rounded-md border border-hairline bg-surface-2 px-2 py-1 text-[11px] font-semibold text-ink"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_1fr]">
        <div className="card-soft p-6 sm:p-7">
          <h3 className="text-[15px] font-semibold text-ink">{t("compliance.controls")}</h3>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {[
              t("compliance.control1"),
              t("compliance.control2"),
              t("compliance.control3"),
              t("compliance.control4"),
              t("compliance.control5"),
              t("compliance.control6"),
            ].map((c) => (
              <li key={c} className="flex items-start gap-2 text-[13.5px] leading-6 text-ink/80">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-hairline bg-ink p-6 text-primary-foreground sm:p-7">
          <div className="text-[11.5px] font-semibold tracking-widest uppercase opacity-60">
            {t("compliance.matrix")}
          </div>
          <div className="mt-4 divide-y divide-white/10 text-[13px]">
            {[
              { r: t("compliance.owner"), s: t("compliance.fullAccess") },
              { r: t("compliance.cfo"), s: t("compliance.uploadApprove") },
              { r: t("compliance.analyst"), s: t("compliance.analyticsOnly") },
              { r: t("compliance.reviewer"), s: t("compliance.readAudit") },
            ].map((x) => (
              <div key={x.r} className="flex items-center justify-between gap-4 py-3">
                <span className="num font-semibold">{x.r}</span>
                <span className="opacity-70">{x.s}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 border-s-2 border-teal ps-4 text-[13px] leading-7 opacity-80">
            {t("compliance.matrixNote")}
          </p>
        </div>
      </div>
    </Section>
  );
}

const quotes = [
  { q: "testimonials.q1", n: "testimonials.n1", r: "testimonials.r1" },
  { q: "testimonials.q2", n: "testimonials.n2", r: "testimonials.r2" },
  { q: "testimonials.q3", n: "testimonials.n3", r: "testimonials.r3" },
  { q: "testimonials.q4", n: "testimonials.n4", r: "testimonials.r4" },
  { q: "testimonials.q5", n: "testimonials.n5", r: "testimonials.r5" },
] as const;

export async function Testimonials() {
  const t = await getTranslations("Home");

  return (
    <div className="border-y border-hairline bg-surface-2/40">
      <Section id="testimonials">
        <Eyebrow>{t("testimonials.eyebrow")}</Eyebrow>
        <h2 className="mt-4 max-w-[26ch] text-[28px] leading-[1.35] font-bold text-ink sm:text-[36px]">
          {t("testimonials.title")}
        </h2>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {quotes.map((c, i) => (
            <figure
              key={c.n}
              className={`card-soft flex flex-col p-6 ${i === 0 ? "lg:col-span-2" : ""}`}
            >
              <Quote className="h-5 w-5 shrink-0 text-teal" aria-hidden="true" />
              <blockquote
                className={`mt-4 flex-1 leading-8 text-ink ${
                  i === 0 ? "text-[17px] font-semibold sm:text-[19px]" : "text-[14.5px]"
                }`}
              >
                {t(c.q)}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-hairline pt-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-[12.5px] font-semibold text-primary-foreground">
                  {t(c.n).slice(0, 1)}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[13.5px] font-semibold text-ink">
                    {t(c.n)}
                  </span>
                  <span className="block truncate text-[12.5px] text-muted-foreground">
                    {t(c.r)}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>
    </div>
  );
}
