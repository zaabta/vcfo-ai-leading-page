"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from "@/lib/whatsapp";
import { Logo } from "./logo";
import { LangSwitch } from "./lang-switch";
import { cn } from "@/lib/utils";

type NavLink = {
  href: string;
  label: "home" | "how" | "features" | "analytics" | "pricing" | "blog" | "faq";
};

const links: NavLink[] = [
  { href: "/#top", label: "home" },
  { href: "/#how", label: "how" },
  { href: "/#features", label: "features" },
  { href: "/#analytics", label: "analytics" },
  { href: "/#pricing", label: "pricing" },
  { href: "/blog", label: "blog" },
  { href: "/#faq", label: "faq" },
];

/**
 * Sticky site navigation. Client component only for scroll state and the
 * mobile menu — everything else is plain server-rendered markup.
 */
export function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const getStartedUrl = getWhatsAppUrl(WHATSAPP_MESSAGES.getStarted);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation (render-time state adjustment).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-hairline bg-background/85 backdrop-blur-xl"
          : "border-transparent bg-background/0",
      )}
    >
      <div
        className={cn(
          "mx-auto grid max-w-[1180px] grid-cols-[auto_1fr_auto] items-center gap-4 px-5 transition-all duration-300 sm:px-8",
          scrolled ? "h-14" : "h-[72px]",
        )}
      >
        <Link href="/" aria-label="VCFO" className="text-ink no-underline">
          <Logo />
        </Link>

        <nav aria-label={t("Nav.primary")} className="hidden justify-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-[13.5px] font-medium text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
            >
              {t(`Nav.${l.label}`)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <div className="hidden md:block">
            <LangSwitch compact={scrolled} />
          </div>
          <a
            href={getStartedUrl}
            target="_blank"
            rel="noreferrer noopener"
            data-cta="get_started"
            data-cta-loc="navbar"
            className="hidden rounded-lg bg-ink px-4 py-2 text-[13.5px] font-semibold text-primary-foreground transition-transform hover:-translate-y-px sm:inline-flex"
          >
            {t("Nav.getStarted")}
          </a>
          <button
            type="button"
            aria-label={t("Nav.menu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-hairline bg-background px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm font-medium text-muted-foreground"
              >
                {t(`Nav.${l.label}`)}
              </Link>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between gap-3 border-t border-hairline pt-3">
            <LangSwitch compact />
            <a
              href={getStartedUrl}
              target="_blank"
              rel="noreferrer noopener"
              data-cta="get_started"
              data-cta-loc="navbar_mobile"
              className="rounded-lg bg-ink px-4 py-2 text-[13.5px] font-semibold text-primary-foreground"
            >
              {t("Nav.getStarted")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
