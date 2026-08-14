import { Fragment } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { createBreadcrumbSchema } from "@/lib/seo/structured-data";
import type { Locale } from "@/lib/site";

export type Crumb = { label: string; href?: string };

/**
 * Visible breadcrumb trail + matching BreadcrumbList structured data.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const locale = useLocale() as Locale;
  const t = useTranslations();

  const crumbs: Crumb[] = [{ label: t("Breadcrumbs.home"), href: "/" }, ...items];

  return (
    <>
      <nav aria-label={t("Breadcrumbs.label")} className="mt-10">
        <ol className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-muted-foreground">
          {crumbs.map((crumb, i) => {
            const last = i === crumbs.length - 1;
            return (
              <Fragment key={`${crumb.label}-${i}`}>
                {i > 0 && (
                  <span aria-hidden="true" className="text-hairline">
                    /
                  </span>
                )}
                <li>
                  {last || !crumb.href ? (
                    <span aria-current="page" className="font-medium text-ink">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link href={crumb.href} className="transition-colors hover:text-teal">
                      {crumb.label}
                    </Link>
                  )}
                </li>
              </Fragment>
            );
          })}
        </ol>
      </nav>
      <JsonLd
        data={createBreadcrumbSchema(
          locale,
          crumbs.slice(1).map((c) => ({
            name: c.label,
            ...(c.href ? { path: c.href.replace(/^\//, "") } : {}),
          })),
        )}
      />
    </>
  );
}
