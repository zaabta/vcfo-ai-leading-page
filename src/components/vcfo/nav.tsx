import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from "@/lib/whatsapp";
import { useLang, useT } from "./lang";

function LangSwitch({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLang();
  return (
    <div
      className={`inline-flex items-center rounded-full border border-border bg-surface-2 p-0.5 ${compact ? "text-xs" : "text-[13px]"}`}
    >
      {/* {(["ar", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`rounded-full px-3 py-1 font-medium transition-colors ${
            lang === l ? "bg-ink text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {l === "ar" ? "العربية" : "English"}
        </button>
      ))} */}
    </div>
  );
}

export function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-ink">
        <span className="block h-3 w-3 rounded-[3px] border-2 border-teal-soft border-b-teal border-s-teal" />
      </span>
      <span className="text-[17px] font-bold tracking-tight text-ink">VCFO</span>
    </a>
  );
}

const links = [
  { href: "#top", ar: "الرئيسية", en: "Home" },
  { href: "#how", ar: "كيف يعمل", en: "How it works" },
  { href: "#features", ar: "المزايا", en: "Features" },
  { href: "#analytics", ar: "التحليلات", en: "Analytics" },
  { href: "#aicfo", ar: "المستشار المالي", en: "AI CFO" },
  { href: "#pricing", ar: "الأسعار", en: "Pricing" },
  { href: "#faq", ar: "الأسئلة الشائعة", en: "FAQ" },
];

export function Navbar() {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const getStartedUrl = getWhatsAppUrl(WHATSAPP_MESSAGES.getStarted);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-hairline bg-background/85 backdrop-blur-xl"
          : "border-transparent bg-background/0"
      }`}
    >
      <div
        className={`mx-auto grid max-w-[1180px] grid-cols-[auto_1fr_auto] items-center gap-4 px-5 transition-all duration-300 sm:px-8 ${
          scrolled ? "h-14" : "h-[72px]"
        }`}
      >
        <Logo />

        <nav className="hidden justify-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-[13.5px] font-medium text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
            >
              {t(l.ar, l.en)}
            </a>
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
            className="hidden rounded-lg bg-ink px-4 py-2 text-[13.5px] font-semibold text-primary-foreground transition-transform hover:-translate-y-px sm:inline-flex"
          >
            {t("ابدأ الآن", "Get started")}
          </a>
          <button
            aria-label="menu"
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
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm font-medium text-muted-foreground"
              >
                {t(l.ar, l.en)}
              </a>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between gap-3 border-t border-hairline pt-3">
            <LangSwitch compact />
            <a
              href={getStartedUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-lg bg-ink px-4 py-2 text-[13.5px] font-semibold text-primary-foreground"
            >
              {t("ابدأ الآن", "Get started")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}