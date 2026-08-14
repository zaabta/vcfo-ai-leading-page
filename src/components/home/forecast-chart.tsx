"use client";

import { useEffect, useRef, useState } from "react";

/** Historical + forecast line chart with draw-in animation. */
export function ForecastChart() {
  const hist = [30, 36, 33, 42, 46, 44, 52, 58];
  const fut = [58, 63, 66, 72, 78];
  const total = hist.length + fut.length - 1;
  const pt = (arr: number[], offset: number) =>
    arr.map((v, i) => `${((i + offset) / (total - 1)) * 100},${100 - v}`).join(" ");

  const ref = useRef<HTMLDivElement | null>(null);
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
      { threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-[220px] w-full">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="h-full w-full"
        role="img"
        aria-label="Revenue forecast: historical actuals and forecast"
      >
        {[20, 40, 60, 80].map((y) => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="var(--hairline)" strokeWidth="0.4" />
        ))}
        <line
          x1={((hist.length - 1) / (total - 1)) * 100}
          y1="0"
          x2={((hist.length - 1) / (total - 1)) * 100}
          y2="100"
          stroke="var(--hairline)"
          strokeWidth="0.6"
        />
        <polyline
          points={pt(hist, 0)}
          fill="none"
          stroke="var(--ink)"
          strokeWidth="1.4"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          style={{
            strokeDasharray: 300,
            strokeDashoffset: visible ? 0 : 300,
            transition: "stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
        <polyline
          points={pt(fut, hist.length - 1)}
          fill="none"
          stroke="var(--teal)"
          strokeWidth="1.4"
          strokeDasharray="4 3"
          vectorEffect="non-scaling-stroke"
          opacity={visible ? 1 : 0}
          style={{ transition: "opacity 0.9s 1s ease" }}
        />
      </svg>
    </div>
  );
}
