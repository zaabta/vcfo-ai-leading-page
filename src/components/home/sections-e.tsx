import { getTranslations } from "next-intl/server";
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from "@/lib/whatsapp";
import { Section } from "./section";
import { FaqAccordion } from "./faq";

export async function CTA() {
  const t = await getTranslations("Home");
  const getStartedUrl = getWhatsAppUrl(WHATSAPP_MESSAGES.getStarted);
  const salesUrl = getWhatsAppUrl(WHATSAPP_MESSAGES.sales);

  return (
    <Section id="cta">
      <div className="relative overflow-hidden rounded-3xl border border-hairline bg-ink px-6 py-16 text-center text-primary-foreground sm:px-12 sm:py-20">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-[0.35] [mask-image:radial-gradient(60%_60%_at_50%_50%,#000,transparent)]" />
        <div className="relative mx-auto max-w-[46ch]">
          <h2 className="text-[28px] leading-[1.4] font-bold sm:text-[38px]">{t("cta.title")}</h2>
          <p className="mt-5 text-[14.5px] leading-8 opacity-70">{t("cta.subtitle")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={getStartedUrl}
              target="_blank"
              rel="noreferrer noopener"
              data-cta="get_started"
              data-cta-loc="cta"
              className="rounded-lg bg-primary-foreground px-6 py-3 text-[14px] font-semibold text-ink transition-transform hover:-translate-y-px"
            >
              {t("cta.getStarted")}
            </a>
            <a
              href={salesUrl}
              target="_blank"
              rel="noreferrer noopener"
              data-cta="talk_to_team"
              data-cta-loc="cta"
              className="rounded-lg border border-white/25 px-6 py-3 text-[14px] font-semibold transition-colors hover:bg-white/[0.06]"
            >
              {t("cta.talkToTeam")}
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}

export async function FAQ() {
  const t = await getTranslations("Home");

  const faqs = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") },
    { q: t("faq.q6"), a: t("faq.a6") },
    { q: t("faq.q7"), a: t("faq.a7") },
    { q: t("faq.q8"), a: t("faq.a8") },
    { q: t("faq.q9"), a: t("faq.a9") },
    { q: t("faq.q10"), a: t("faq.a10") },
  ];

  return (
    <Section id="faq">
      <h2 className="text-[28px] leading-[1.35] font-bold text-ink sm:text-[36px]">
        {t("faq.title")}
      </h2>
      <div className="mt-10 border-y border-hairline">
        <FaqAccordion faqs={faqs} />
      </div>
    </Section>
  );
}
