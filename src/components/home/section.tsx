import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

/**
 * Standard page section — server component. The reveal animation is handled
 * by the client <Reveal> leaf; all content stays server-rendered.
 */
export async function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Reveal
      as="section"
      id={id}
      className={cn("mx-auto w-full max-w-[1180px] px-5 py-16 sm:px-8 md:py-20", className)}
    >
      {children}
    </Reveal>
  );
}

/** Small uppercase pill label used above section headings. */
export async function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
      {children}
    </span>
  );
}

/** "Soon" badge for upcoming capabilities. */
export async function SoonBadge() {
  const t = await getTranslations("Home");
  return (
    <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-foreground">
      {t("soon")}
    </span>
  );
}
