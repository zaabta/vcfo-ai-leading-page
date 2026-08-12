import { useEffect, useState } from "react";
import { Section, Eyebrow, SoonBadge, CountUp, useT, useReveal } from "./lang";

export function AICfo() {
  const t = useT();
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const timers = [700, 1900, 3000].map((ms, i) =>
      setTimeout(() => setStep(i + 1), ms),
    );
    return () => timers.forEach(clearTimeout);
  }, [visible]);

  const bubble = (on: boolean) =>
    `transition-all duration-600 ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`;

  return (
    <div id="aicfo" className="bg-ink text-primary-foreground">
      <Section>
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center rounded-full border border-white/15 px-3 py-1 text-[11px] font-medium tracking-[0.14em] uppercase opacity-80">
            AI CFO
          </span>
          <SoonBadge />
        </div>

        <h2 className="mt-5 max-w-[26ch] text-[28px] leading-[1.4] font-bold sm:text-[36px]">
          وفي المرحلة التالية… لن تكتفي بقراءة الأرقام. ستتحدث معها.
        </h2>
        <p className="mt-4 text-[15px] opacity-70">المستشار المالي الذكي في VCFO</p>

        <div
          ref={ref}
          className="mt-10 overflow-hidden rounded-2xl border border-white/12 bg-white/[0.03]"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-[12px] opacity-70">
            <span>VCFO Advisor</span>
            <span className="num">Financial Truth · Acme · مارس 2026</span>
          </div>

          <div className="space-y-4 p-4 sm:p-6">
            <div className={`flex justify-start ${bubble(step >= 1)}`}>
              <p className="max-w-[80%] rounded-2xl rounded-ss-sm bg-white/[0.07] px-4 py-3 text-[13.5px] leading-7">
                لماذا انخفض صافي الربح هذا الشهر؟
              </p>
            </div>

            <div className={`flex justify-end ${bubble(step >= 2)}`}>
              <div className="max-w-[86%] rounded-2xl rounded-se-sm border border-teal/35 bg-teal/12 px-4 py-3">
                <p className="text-[13.5px] leading-8">
                  انخفض صافي الربح بنسبة <span className="num font-semibold">8.4%</span> مقارنة
                  بالشهر السابق، ويرجع ذلك بشكل أساسي إلى ارتفاع المصروفات التشغيلية بنسبة{" "}
                  <span className="num font-semibold">14%</span>، بينما بقيت الإيرادات شبه مستقرة.
                </p>
              </div>
            </div>

            <div className={`flex justify-end ${bubble(step >= 3)}`}>
              <div className="max-w-[86%] space-y-3">
                <p className="rounded-2xl rounded-se-sm border border-white/10 bg-white/[0.05] px-4 py-3 text-[13.5px] leading-7">
                  هل تريد أن أشرح لك أكثر المصروفات تأثيرًا؟
                </p>
                <div className="flex flex-wrap gap-2">
                  <button className="rounded-lg bg-primary-foreground px-3.5 py-2 text-[12.5px] font-semibold text-ink">
                    نعم، اعرض التفاصيل
                  </button>
                  <button className="rounded-lg border border-white/20 px-3.5 py-2 text-[12.5px] font-semibold">
                    قارن بالفترة السابقة
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 px-4 py-3 text-[11.5px] opacity-60">
            {t(
              "كل إجابة مبنية على Financial Truth، وليست تخمينًا.",
              "Every answer is grounded in Financial Truth, not guesswork.",
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}

const caps = [
  { t: "التحليل", q: "ما الذي يحدث؟" },
  { t: "تفسير الأسباب", q: "لماذا يحدث؟" },
  { t: "التوصيات", q: "ماذا يمكننا أن نفعل؟" },
  { t: "السيناريوهات", q: "ماذا لو؟" },
  { t: "التوقعات", q: "ماذا قد يحدث؟" },
  { t: "المحادثة", q: "اسأل بياناتك المالية مباشرة." },
];

export function AICapabilities() {
  const t = useT();
  const recommendations = [
    {
      title: "خفض المصروفات",
      body: "تحديد الأنشطة أو البنود التي يمكن تقليلها دون التأثير على الأداء المالي الأساسي.",
      impact: "تأثير: إمكانية خفض التكلفة التشغيلية بنسبة 6–10%",
      priority: "high",
      icon: "flame",
    },
    {
      title: "تعزيز الربحية",
      body: "تحديد فرص زيادة الهوامش أو تحسين كفاءة الإيرادات عبر المقارنات المالية.",
      impact: "تأثير: تحسين هامش الربح عبر تحسين مزيج الإيرادات",
      priority: "medium",
      icon: "arrow",
    },
    {
      title: "تحسين السيولة",
      body: "تقييم تدفق النقد وتحديد متى تحتاج الشركة إلى اتخاذ قرار تمويلي أو تشغيلي.",
      impact: "تأثير: تحسين إدارة النقد وتوقيت التمويل",
      priority: "low",
      icon: "leaf",
    },
  ] as const;

  const priorityStyles = {
    high: "border-[#eec6c6] bg-[#fbecec] text-destructive",
    medium: "border-[#ecd9b0] bg-[#fbf3e2] text-warning",
    low: "border-border bg-secondary/60 text-muted-foreground",
  } as const;

  const priorityLabels = {
    high: "أولوية عالية",
    medium: "أولوية متوسطة",
    low: "أولوية منخفضة",
  } as const;

  const iconMap = {
    flame: "🔥",
    arrow: "↗",
    leaf: "🌿",
  } as const;

  return (
    <Section>
      <div className="flex flex-wrap items-center gap-3">
        <Eyebrow>{t("قدرات مستقبلية", "Future capabilities")}</Eyebrow>
        <SoonBadge />
      </div>
      <h2 className="mt-4 text-[28px] leading-[1.35] font-bold text-ink sm:text-[36px]">
        من التقارير إلى المستشار المالي
      </h2>

      <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
        {caps.map((c) => (
          <div key={c.t} className="bg-surface p-6 transition-colors hover:bg-surface-2">
            <h3 className="text-[15.5px] font-semibold text-ink">{c.t}</h3>
            <p className="mt-2 text-[13.5px] leading-7 text-muted-foreground">“{c.q}”</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function ScenariosPage() {
  const [revenue, setRevenue] = useState(6);
  const [opex, setOpex] = useState(20);
  const [cogs, setCogs] = useState(0);

  const presets = [
    { label: "زيادة التسويق 20%", revenueDeltaPct: 6, opexDeltaPct: 20, cogsDeltaPct: 0 },
    { label: "خفض المصروفات 10%", revenueDeltaPct: 0, opexDeltaPct: -10, cogsDeltaPct: 0 },
    { label: "رفع الأسعار 5%", revenueDeltaPct: 5, opexDeltaPct: 0, cogsDeltaPct: 2 },
  ];

  const revenueImpact = revenue;
  const expensesImpact = -opex;
  const profitImpact = revenue - opex * 0.65 + cogs * 0.22;
  const cashImpact = revenue * 0.7 - opex * 0.4 - cogs * 0.2;
  const netCurrent = 612_400;
  const projectedNet = netCurrent * (1 + profitImpact / 100);

  return (
    <Section>
      <div className="flex flex-wrap items-center gap-3">
        <Eyebrow>What-if Analysis</Eyebrow>
        <SoonBadge />
      </div>
      <h2 className="mt-4 text-[28px] leading-[1.35] font-bold text-ink sm:text-[36px]">
        السيناريوهات — ماذا لو تغيّر شيء؟
      </h2>
      <p className="mt-4 max-w-[68ch] text-[15px] leading-8 text-muted-foreground">
        حرّك الافتراضات وشاهد الأثر المتوقع على الإيرادات والربح والسيولة قبل اتخاذ القرار.
      </p>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        <div className="card-soft p-5">
          <div className="flex items-center gap-2 text-[14px] font-semibold text-ink">
            <span className="text-lg">⚙️</span>
            افتراضات السيناريو
          </div>

          <div className="mt-5 space-y-5">
            {[
              { label: "نمو الإيرادات", value: revenue, set: setRevenue, min: -30, max: 30 },
              { label: "تغير المصروفات التشغيلية", value: opex, set: setOpex, min: -30, max: 30 },
              { label: "تغير تكلفة المبيعات", value: cogs, set: setCogs, min: -20, max: 20 },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-1.5 flex items-center justify-between text-[12px] text-muted-foreground">
                  <span>{item.label}</span>
                  <span className="num font-bold text-ink" dir="ltr">
                    {item.value > 0 ? "+" : ""}
                    {item.value}%
                  </span>
                </div>
                <input
                  type="range"
                  min={item.min}
                  max={item.max}
                  value={item.value}
                  onChange={(e) => item.set(Number(e.target.value))}
                  className="w-full accent-[#1f8578]"
                  dir="ltr"
                />
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-hairline pt-4">
            <div className="mb-2 text-[11px] font-semibold text-muted-foreground">سيناريوهات جاهزة</div>
            <div className="flex flex-wrap gap-2">
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => {
                    setRevenue(preset.revenueDeltaPct);
                    setOpex(preset.opexDeltaPct);
                    setCogs(preset.cogsDeltaPct);
                  }}
                  className="rounded-full border border-border bg-surface px-3 py-1.5 text-[11px] font-semibold text-ink transition-colors hover:border-teal hover:text-teal"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid gap-3 sm:grid-cols-4">
            <div className="card-soft p-4 text-center">
              <div className="text-[11px] text-muted-foreground">أثر الإيرادات</div>
              <div className="num mt-2 text-[20px] font-bold text-positive">{revenueImpact.toFixed(1)}%</div>
            </div>
            <div className="card-soft p-4 text-center">
              <div className="text-[11px] text-muted-foreground">أثر المصروفات</div>
              <div className="num mt-2 text-[20px] font-bold text-danger">{expensesImpact.toFixed(1)}%</div>
            </div>
            <div className="card-soft p-4 text-center">
              <div className="text-[11px] text-muted-foreground">أثر صافي الربح</div>
              <div className="num mt-2 text-[20px] font-bold text-positive">{profitImpact.toFixed(1)}%</div>
            </div>
            <div className="card-soft p-4 text-center">
              <div className="text-[11px] text-muted-foreground">أثر النقدية</div>
              <div className="num mt-2 text-[20px] font-bold text-positive">{cashImpact.toFixed(1)}%</div>
            </div>
          </div>

          <div className="card-soft overflow-hidden">
            <div className="border-b border-hairline bg-surface-2/70 px-5 py-3 text-[14px] font-semibold text-ink">
              المقارنة: الحالي مقابل السيناريو
            </div>
            <div className="grid gap-0 p-5 sm:grid-cols-3">
              {[
                ["الإيرادات", 4_820_000, revenueImpact],
                ["المصروفات التشغيلية", 1_122_800, expensesImpact],
                ["صافي الربح", 612_400, profitImpact],
              ].map(([label, current, delta]) => {
                const base = Number(current);
                const d = Number(delta);
                const scenarioValue = base * (1 + d / 100);

                return (
                  <div
                    key={String(label)}
                    className="border-b border-hairline py-3 text-center last:border-b-0 sm:border-b-0 sm:border-e sm:last:border-e-0"
                  >
                    <div className="text-[11px] text-muted-foreground">{String(label)}</div>
                    <div className="mt-2 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                      <div>
                        <div className="num text-[13px] font-bold text-ink">{base.toLocaleString()}</div>
                        <div className="text-[9px] text-muted-foreground">الحالي</div>
                      </div>
                      <div className="text-muted-foreground/50">←</div>
                      <div>
                        <div className={`num text-[13px] font-bold ${d >= 0 ? "text-positive" : "text-danger"}`}>
                          {scenarioValue.toLocaleString()}
                        </div>
                        <div className="text-[9px] text-muted-foreground">السيناريو</div>
                      </div>
                    </div>
                    <div className="num mt-1.5 text-[10px] text-muted-foreground" dir="ltr">
                      Δ {d > 0 ? "+" : ""}
                      {d.toFixed(1)}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card-soft border border-primary/25 bg-primary/5 p-4">
            <div className="flex items-start gap-3">
              <span className="text-lg">✨</span>
              <div>
                <div className="text-[12px] font-bold text-primary">تفسير السيناريو</div>
                <p className="mt-1 text-[13px] leading-relaxed text-ink/80">
                  عند تطبيق هذا السيناريو، يتوقع أن يصل صافي الربح إلى {projectedNet.toLocaleString()}، مع أثر إيجابي على الربحية والسيولة إذا استمر الاتجاه الحالي في الانخفاض أو التحسن.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export function Scenarios() {
  return <ScenariosPage />;
}

function ForecastChart() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const hist = [30, 36, 33, 42, 46, 44, 52, 58];
  const fut = [58, 63, 66, 72, 78];
  const pt = (arr: number[], offset: number, total: number) =>
    arr.map((v, i) => `${((i + offset) / (total - 1)) * 100},${100 - v}`).join(" ");
  const total = hist.length + fut.length - 1;
  return (
    <div ref={ref} className="h-[220px] w-full">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
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
          points={pt(hist, 0, total)}
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
          points={pt(fut, hist.length - 1, total)}
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

export function Forecast() {
  const t = useT();
  return (
    <Section>
      <div className="flex flex-wrap items-center gap-3">
        <Eyebrow>Forecasting</Eyebrow>
        <SoonBadge />
      </div>
      <h2 className="mt-4 text-[28px] leading-[1.35] font-bold text-ink sm:text-[36px]">
        لا تنظر إلى الماضي فقط
      </h2>

      <div className="card-soft mt-10 p-5 sm:p-7">
        <div className="flex flex-wrap items-center gap-5 text-[12px] text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <span className="h-0.5 w-6 bg-ink" /> Historical · Actual data
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-0.5 w-6 border-t-2 border-dashed border-teal" /> Forecast
          </span>
        </div>
        <div className="mt-4">
          <ForecastChart />
        </div>
        <div className="mt-5 grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-3">
          {[
            { l: "Revenue Forecast", v: 5.42, s: "M" },
            { l: "Profit Forecast", v: 0.78, s: "M" },
            { l: "Cash Forecast", v: 2.61, s: "M" },
          ].map((m) => (
            <div key={m.l} className="bg-surface px-4 py-4">
              <div className="num text-[11.5px] text-muted-foreground">{m.l}</div>
              <div className="mt-1.5 text-[18px] font-semibold text-ink">
                <CountUp to={m.v} decimals={2} suffix={m.s} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-[12.5px] text-muted-foreground">
        {t("Forecasting — قريبًا", "Forecasting — coming soon")}
      </p>
    </Section>
  );
}