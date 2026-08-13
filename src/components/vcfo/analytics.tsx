import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { isAnalyticsEnabled, trackPageView } from "@/lib/analytics";

export function GoogleAnalytics() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const href = useRouterState({ select: (state) => state.location.href });

  useEffect(() => {
    if (!isAnalyticsEnabled) return;
    trackPageView(pathname);
  }, [pathname, href]);

  return null;
}
