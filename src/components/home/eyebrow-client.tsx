"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

/** Client-side eyebrow pill (for use inside client section components). */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
      {children}
    </span>
  );
}

/** Client-side "soon" badge (for use inside client section components). */
export function SoonBadge() {
  const t = useTranslations("Home");
  return (
    <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-foreground">
      {t("soon")}
    </span>
  );
}

/**
 * Client-side Section with an `onVisible` callback — used by client-only
 * animated sections (Solution, AI CFO). Renders identical markup to the
 * server Section component.
 */
export function SectionClient({
  id,
  children,
  className = "",
  onVisible,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  onVisible?: (visible: boolean) => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) onVisible?.(true);
  }, [visible, onVisible]);

  return (
    <Reveal
      as="section"
      id={id}
      onVisible={setVisible}
      className={cn("mx-auto w-full max-w-[1180px] px-5 py-16 sm:px-8 md:py-20", className)}
    >
      {children}
    </Reveal>
  );
}
