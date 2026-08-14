import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

export type Lang = "ar" | "en";

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "ar",
  setLang: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    // Check URL query parameter first
    const params = new URLSearchParams(window.location.search);
    const queryLang = params.get("lang");
    
    if (queryLang === "ar" || queryLang === "en") {
      setLangState(queryLang);
      window.localStorage.setItem("vcfo-lang", queryLang);
      
      // Remove lang parameter from URL if it's the default (Arabic)
      if (queryLang === "ar") {
        params.delete("lang");
        const newUrl = params.toString() 
          ? `${window.location.pathname}?${params.toString()}`
          : window.location.pathname;
        window.history.replaceState(null, "", newUrl);
      }
    } else {
      // Fall back to localStorage
      const saved = window.localStorage.getItem("vcfo-lang");
      if (saved === "ar" || saved === "en") {
        setLangState(saved);
      } else {
        // Default to Arabic
        setLangState("ar");
        window.localStorage.setItem("vcfo-lang", "ar");
      }
      
      // Clean up URL if it has lang parameter
      if (params.has("lang")) {
        params.delete("lang");
        const newUrl = params.toString() 
          ? `${window.location.pathname}?${params.toString()}`
          : window.location.pathname;
        window.history.replaceState(null, "", newUrl);
      }
    }
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    window.localStorage.setItem("vcfo-lang", next);
    
    // Update URL query parameter
    const params = new URLSearchParams(window.location.search);
    
    // Remove lang parameter if it's the default (Arabic)
    if (next === "ar") {
      params.delete("lang");
    } else {
      params.set("lang", next);
    }
    
    const newUrl = params.toString() 
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    window.history.replaceState(null, "", newUrl);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  // Handle hash navigation - remove lang param when navigating to anchors
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a[href^='#']");
      
      if (link) {
        const href = link.getAttribute("href");
        if (href?.startsWith("#")) {
          e.preventDefault();
          
          // Navigate to hash without lang parameter
          const params = new URLSearchParams(window.location.search);
          params.delete("lang");
          
          const newUrl = params.toString() 
            ? `${window.location.pathname}?${params.toString()}${href}`
            : `${window.location.pathname}${href}`;
          
          window.history.pushState(null, "", newUrl);
          
          // Scroll to the element
          const element = document.querySelector(href);
          element?.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

/** Pick an Arabic/English string based on the active language. */
export function useT() {
  const { lang } = useLang();
  return (ar: string, en?: string) => (lang === "en" && en ? en : ar);
}

/** Reveal-on-scroll helper. */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const revealIfVisible = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        setVisible(true);
        return true;
      }
      return false;
    };

    if (revealIfVisible()) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, visible };
}

/** Count-up number that starts when visible. */
export function CountUp({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1100,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const { ref, visible } = useReveal<HTMLSpanElement>();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, to, duration]);

  return (
    <span ref={ref} className="num">
      {prefix}
      {val.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLElement>();
  return (
    <section
      id={id}
      ref={ref}
      data-visible={visible}
      className={`reveal mx-auto w-full max-w-[1180px] px-5 py-16 sm:px-8 md:py-20 ${className}`}
    >
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
      {children}
    </span>
  );
}

export function SoonBadge() {
  const t = useT();
  return (
    <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-foreground">
      {t("قريبًا", "Soon")}
    </span>
  );
}