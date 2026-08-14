import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo/metadata";
import { PageShell } from "@/components/layout/page-shell";
import { Section } from "@/components/home/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });

  return createPageMetadata({
    locale: locale as Locale,
    path: "terms",
    title: t("terms.title"),
    description: t("terms.description"),
  });
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("Terms");

  const sections = [
    { title: t("acceptance.title"), body: t("acceptance.body") },
    { title: t("nature.title"), body: t("nature.body") },
    { title: t("account.title"), body: t("account.body") },
    { title: t("pricing.title"), body: t("pricing.body") },
  ];

  return (
    <PageShell>
      <Section>
        <Breadcrumbs items={[{ label: t("title") }]} />
        <p className="mt-10 text-[13px] font-semibold tracking-wide text-teal">{t("eyebrow")}</p>
        <h1 className="mt-3 text-[34px] leading-[1.3] font-bold text-ink sm:text-[44px]">
          {t("title")}
        </h1>
        <p className="mt-4 text-[13.5px] text-muted-foreground">{t("updated")}</p>
        <div className="mt-10 space-y-8">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="text-[20px] font-semibold text-ink">{s.title}</h2>
              <p className="mt-3 max-w-[72ch] text-[15px] leading-8 text-muted-foreground">
                {s.body}
              </p>
            </section>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
