declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID = (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "").trim();

export const isAnalyticsEnabled = /^G-[A-Z0-9]+$/.test(GA_MEASUREMENT_ID);

export type AnalyticsEventParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(name: string, params: AnalyticsEventParams = {}) {
  if (!isAnalyticsEnabled || typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", name, params);
}

export function trackPageView(path: string) {
  trackEvent("page_view", {
    page_path: path,
    page_title: document.title,
    page_location: window.location.href,
  });
}

export function trackCtaClick(label: string, location: string, href?: string) {
  trackEvent("cta_click", {
    event_category: "engagement",
    event_label: label,
    cta_location: location,
    link_url: href,
  });
}
