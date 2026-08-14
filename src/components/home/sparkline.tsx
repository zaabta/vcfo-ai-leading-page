"use client";

import { useEffect, useRef, useState } from "react";

/**
 * SVG sparkline with a draw-in animation (preserved from the original).
 * Runs only on the client; the SVG itself is server-rendered via children.
 */
export function Sparkline() {
  const pts = [22, 30, 26, 38, 34, 46, 42, 56, 62, 58, 70, 78];
  const d = pts.map((p, i) => `${(i / (pts.length - 1)) * 100},${100 - p}`).join(" ");
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
    <div ref={ref} className="h-[110px] w-full">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="h-full w-full"
        role="img"
        aria-label="Revenue trend"
      >
        <defs>
          <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--teal)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--teal)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[25, 50, 75].map((y) => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="var(--hairline)" strokeWidth="0.4" />
        ))}
        <polygon points={`0,100 ${d} 100,100`} fill="url(#sparkFill)" />
        <polyline
          points={d}
          fill="none"
          stroke="var(--teal)"
          strokeWidth="1.4"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 400,
            strokeDashoffset: visible ? 0 : 400,
            transition: "stroke-dashoffset 1.6s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </svg>
    </div>
  );
}
