"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Reveal-on-scroll wrapper — the only client-side piece of the animation
 * system. Content is fully server-rendered (crawlable, no JS needed); the
 * observer only adds `data-visible` when the element enters the viewport.
 * Reduced-motion is respected in CSS (animations are effectively disabled).
 */
export function Reveal({
  as: Tag = "div",
  className,
  children,
  id,
  onVisible,
  ...rest
}: {
  as?: ElementType;
  className?: string;
  children?: ReactNode;
  id?: string;
  onVisible?: (visible: boolean) => void;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const revealIfVisible = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        setVisible(true);
        onVisible?.(true);
        return true;
      }
      return false;
    };

    if (revealIfVisible()) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            onVisible?.(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [onVisible]);

  return (
    <Tag ref={ref} id={id} data-visible={visible} className={cn("reveal", className)} {...rest}>
      {children}
    </Tag>
  );
}
