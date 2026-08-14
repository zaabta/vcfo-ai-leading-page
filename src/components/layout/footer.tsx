import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "./logo";
import { LangSwitch } from "./lang-switch";

const cols = [
  {
    id: "product",
    items: [
      { id: "how", href: "/#how" },
      { id: "statements", href: "/#features" },
      { id: "analytics", href: "/#analytics" },
      { id: "aiCfo", href: "/#aicfo" },
      { id: "pricing", href: "/#pricing" },
    ],
  },
  {
    id: "company",
    items: [
      { id: "about", href: "/about" },
      { id: "contact", href: "/#cta" },
      { id: "blog", href: "/blog" },
      { id: "faq", href: "/#faq" },
    ],
  },
  {
    id: "legal",
    items: [
      { id: "privacy", href: "/privacy" },
      { id: "terms", href: "/terms" },
      { id: "security", href: "/#compliance" },
    ],
  },
] as const;

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="border-t border-hairline bg-surface-2/50">
      <div className="mx-auto max-w-[1180px] px-5 py-16 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)]">
          <div>
            <Link href="/" aria-label="VCFO" className="text-ink no-underline">
              <Logo />
            </Link>
            <p className="mt-4 max-w-[34ch] text-[13.5px] leading-7 text-muted-foreground">
              {t("Footer.tagline")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {cols.map((c) => (
              <nav key={c.id} aria-label={t(`Footer.${c.id}`)}>
                <h3 className="text-[13px] font-semibold text-ink">{t(`Footer.${c.id}`)}</h3>
                <ul className="mt-3 space-y-2.5">
                  {c.items.map((i) => (
                    <li key={i.id}>
                      <Link
                        href={i.href}
                        className="text-[13px] text-muted-foreground transition-colors hover:text-ink"
                      >
                        {t(`Footer.${i.id}`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-hairline pt-6 sm:flex-row sm:items-center">
          <p className="num text-[12.5px] text-muted-foreground">{t("Footer.copyright")}</p>
          <LangSwitch compact />
        </div>
      </div>
    </footer>
  );
}
