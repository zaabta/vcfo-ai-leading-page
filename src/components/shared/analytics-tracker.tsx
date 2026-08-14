"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isAnalyticsEnabled, trackCtaClick, trackEvent } from "@/lib/analytics";

/**
 * Lightweight delegated analytics listener:
 *  - tracks page_view per route change (App Router),
 *  - tracks CTA clicks on any element carrying `data-cta` attributes.
 * Mounted once per locale layout; keeps all buttons server components.
 */
export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!isAnalyticsEnabled) return;

    trackEvent("page_view", {
      page_path: pathname,
      page_title: document.title,
      page_location: window.location.href,
    });

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const el = target?.closest<HTMLElement>("[data-cta]");
      if (!el) return;
      trackCtaClick(
        el.dataset.cta ?? "cta",
        el.dataset.ctaLoc ?? "unknown",
        (el as HTMLAnchorElement).href,
      );
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  return null;
}
