"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeLabel } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/site";

/**
 * Language switcher: switches locale in-place (preserving the current page)
 * via the localized router — no ?lang= query parameters, clean /ar /en URLs.
 */
export function LangSwitch({ compact = false }: { compact?: boolean }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface-2 p-0.5",
        compact ? "text-xs" : "text-[13px]",
      )}
      role="group"
      aria-label={t("Nav.langSwitch")}
    >
      {(["ar", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          aria-pressed={locale === l}
          onClick={() => router.replace(pathname, { locale: l })}
          className={cn(
            "rounded-full px-3 py-1 font-medium transition-colors",
            locale === l
              ? "bg-ink text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {localeLabel(l)}
        </button>
      ))}
    </div>
  );
}
