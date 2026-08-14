import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { Section } from "@/components/home/section";

/** Localized 404 for unknown paths inside a valid locale. */
export default async function LocaleNotFound() {
  const t = await getTranslations("NotFound");

  return (
    <PageShell>
      <Section>
        <div className="mx-auto max-w-md py-10 text-center">
          <h1 className="num text-7xl font-bold text-foreground">{t("title")}</h1>
          <h2 className="mt-4 text-xl font-semibold text-foreground">{t("subtitle")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t("body")}</p>
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {t("backHome")}
            </Link>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
