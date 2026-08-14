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
    path: "about",
    title: t("about.title"),
    description: t("about.description"),
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("About");

  const values = [
    { title: t("values.truth.title"), body: t("values.truth.body") },
    { title: t("values.clarity.title"), body: t("values.clarity.body") },
    { title: t("values.built.title"), body: t("values.built.body") },
  ];

  return (
    <PageShell>
      <Section>
        <Breadcrumbs items={[{ label: t("title") }]} />
        <p className="mt-10 text-[13px] font-semibold tracking-wide text-teal">{t("eyebrow")}</p>
        <h1 className="mt-3 max-w-[20ch] text-[34px] leading-[1.3] font-bold text-ink sm:text-[44px]">
          {t("title")}
        </h1>
        <p className="mt-5 max-w-[68ch] text-[16px] leading-8 text-muted-foreground">
          {t("intro")}
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {values.map((item) => (
            <div key={item.title} className="card-soft p-6">
              <h2 className="text-[16px] font-semibold text-ink">{item.title}</h2>
              <p className="mt-2 text-[14px] leading-7 text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
