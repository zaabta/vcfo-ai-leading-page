"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, visible };
}

/** Applies a staggered fade/slide-in to its direct children when visible. */
export function StaggerRows({ children, className }: { children: ReactNode; className?: string }) {
  const { ref, visible } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className={className}>
      {Children.map(children, (child, i) =>
        isValidElement(child)
          ? cloneElement(child as ReactElement<{ className?: string; style?: CSSProperties }>, {
              className: cn(
                (child.props as { className?: string }).className,
                "transition-all duration-500",
                visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
              ),
              style: { transitionDelay: `${i * 110}ms` },
            })
          : child,
      )}
    </div>
  );
}

/** Animated bar chart (revenue/profit/expense trend). */
export function Bars() {
  const { ref, visible } = useInView<HTMLDivElement>();
  const data = [42, 55, 48, 63, 58, 72, 68, 81];

  return (
    <div ref={ref} className="flex h-28 items-end gap-2" aria-hidden="true">
      {data.map((v, i) => (
        <div key={i} className="flex-1 rounded-t-[3px] bg-surface-2">
          <div
            className="w-full rounded-t-[3px] bg-teal/70 transition-[height] duration-700"
            style={{ height: visible ? `${v}px` : "0px", transitionDelay: `${i * 60}ms` }}
          />
        </div>
      ))}
    </div>
  );
}

/** Semi-circular financial-health gauge. */
export function Gauge({ score, label }: { score: number; label: string }) {
  const { ref, visible } = useInView<HTMLDivElement>();
  const r = 68;
  const c = Math.PI * r;
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1100;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(score * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, score]);

  return (
    <div ref={ref} className="relative w-full max-w-[240px]">
      <svg viewBox="0 0 160 92" className="w-full" role="img" aria-label={`${label}: ${score}/100`}>
        <path
          d="M12 84 A68 68 0 0 1 148 84"
          fill="none"
          stroke="var(--surface-2)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M12 84 A68 68 0 0 1 148 84"
          fill="none"
          stroke="var(--teal)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={visible ? c * (1 - score / 100) : c}
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1)" }}
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 text-center">
        <div dir="ltr" className="text-[34px] leading-none font-bold text-ink">
          <span className="num">{Math.round(val).toLocaleString("en-US")}</span>
          <span className="text-[16px] text-muted-foreground"> / 100</span>
        </div>
      </div>
    </div>
  );
}

/** Animated horizontal score bars for the financial-health breakdown. */
export function HealthBars({ parts }: { parts: { label: string; value: number }[] }) {
  const { ref, visible } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className="grid content-center gap-5">
      {parts.map((p, i) => (
        <div key={p.label}>
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-ink">{p.label}</span>
            <span className="num font-semibold text-ink">{p.value}</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
            <div
              className="h-full rounded-full bg-ink transition-[width] duration-1000"
              style={{ width: visible ? `${p.value}%` : "0%", transitionDelay: `${i * 120}ms` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
