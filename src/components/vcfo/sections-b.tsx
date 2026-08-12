import { Section, Eyebrow, CountUp, useT, useReveal } from "./lang";

function StatementCard({
  title,
  rows,
  footer,
}: {
  title: string;
  rows: { label: string; value: string; strong?: boolean }[];
  footer?: string;
}) {
  return (
    <div className="card-soft min-w-[280px] flex-1 overflow-hidden">
      <div className="border-b border-hairline bg-surface-2/70 px-4 py-3 text-[13px] font-semibold text-ink">
        {title}
      </div>
      <div className="divide-y divide-hairline">
        {rows.map((r) => (
          <div
            key={r.label}
            className={`flex items-center justify-between gap-4 px-4 py-3 text-[13px] ${
              r.strong ? "bg-surface-2/50 font-semibold text-ink" : "text-muted-foreground"
            }`}
          >
            <span className="min-w-0 truncate">{r.label}</span>
            <span className="num shrink-0 text-ink">{r.value}</span>
          </div>
        ))}
      </div>
      {footer && (
        <div className="border-t border-hairline px-4 py-2.5 text-[11.5px] text-muted-foreground">
          {footer}
        </div>
      )}
    </div>
  );
}

export function Statements() {
  const t = useT();
  return (
    <Section>
      <Eyebrow>{t("القوائم المالية", "Financial statements")}</Eyebrow>
      <h2 className="mt-4 text-[28px] leading-[1.35] font-bold text-ink sm:text-[36px]">
        افهم الوضع المالي لشركتك فورًا
      </h2>

      <div className="-mx-5 mt-10 flex snap-x gap-4 overflow-x-auto px-5 pb-3 sm:mx-0 sm:px-0 lg:overflow-visible">
        <StatementCard
          title="قائمة الدخل"
          rows={[
            { label: "الإيرادات", value: "4,820,000" },
            { label: "تكلفة المبيعات", value: "(3,084,800)" },
            { label: "مجمل الربح", value: "1,735,200", strong: true },
            { label: "المصروفات", value: "(1,122,800)" },
            { label: "صافي الربح", value: "612,400", strong: true },
          ]}
          footer="SAR · مارس 2026"
        />
        <StatementCard
          title="الميزانية العمومية"
          rows={[
            { label: "الأصول", value: "9,410,000", strong: true },
            { label: "الأصول المتداولة", value: "4,120,000" },
            { label: "الالتزامات", value: "3,860,000", strong: true },
            { label: "الالتزامات المتداولة", value: "2,238,000" },
            { label: "حقوق الملكية", value: "5,550,000", strong: true },
          ]}
          footer="Assets = Liabilities + Equity ✓"
        />
        <StatementCard
          title="المؤشرات المالية"
          rows={[
            { label: "هامش الربح", value: "36.0%" },
            { label: "هامش التشغيل", value: "18.4%" },
            { label: "هامش صافي الربح", value: "12.7%" },
            { label: "Current Ratio", value: "1.84" },
            { label: "Working Capital", value: "1,882,000" },
          ]}
          footer="محسوبة من Financial Truth"
        />
      </div>
    </Section>
  );
}

export function CashFlow() {
  const t = useT();
  const { ref, visible } = useReveal<HTMLDivElement>();
  const activities = [
    {
      t: "التدفقات النقدية من الأنشطة التشغيلية",
      s: "Operating",
      d: "اعرف مقدار النقد الناتج عن النشاط الأساسي للشركة.",
      v: "+ 1,240,000",
      pos: true,
    },
    {
      t: "التدفقات النقدية من الأنشطة الاستثمارية",
      s: "Investing",
      d: "تابع النقد المستخدم أو الناتج عن الاستثمارات وشراء وبيع الأصول.",
      v: "(480,000)",
      pos: false,
    },
    {
      t: "التدفقات النقدية من الأنشطة التمويلية",
      s: "Financing",
      d: "افهم تأثير القروض، التمويل، رأس المال، والتوزيعات على السيولة.",
      v: "(210,000)",
      pos: false,
    },
  ];
  const flows = [
    { l: "التدفق النقدي التشغيلي", v: "1,240,000" },
    { l: "التدفق النقدي الاستثماري", v: "(480,000)" },
    { l: "التدفق النقدي التمويلي", v: "(210,000)" },
    { l: "صافي التغير في النقد", v: "550,000", strong: true },
  ];

  return (
    <Section id="cashflow">
      <Eyebrow>{t("قائمة التدفقات النقدية", "Cash flow statement")}</Eyebrow>
      <h2 className="mt-4 max-w-[26ch] text-[28px] leading-[1.35] font-bold text-ink sm:text-[36px]">
        اعرف من أين يأتي النقد وإلى أين يذهب.
      </h2>
      <p className="mt-4 max-w-[64ch] text-[15px] leading-8 text-muted-foreground">
        لا يكفي أن تعرف أن شركتك تحقق أرباحًا. التدفق النقدي يوضح لك كيف تتحرك السيولة الفعلية داخل
        الشركة، وما إذا كانت العمليات تحقق نقدًا أم تستهلكه.
      </p>

      <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline lg:grid-cols-3">
        {activities.map((a) => (
          <div key={a.s} className="bg-surface p-6">
            <div className="num text-[11px] font-semibold tracking-widest text-teal uppercase">
              {a.s}
            </div>
            <h3 className="mt-2 text-[15px] leading-7 font-semibold text-ink">{a.t}</h3>
            <p className="mt-2 text-[13.5px] leading-7 text-muted-foreground">{a.d}</p>
            <div
              className={`num mt-4 text-[18px] font-semibold ${a.pos ? "text-positive" : "text-danger"}`}
            >
              {a.v}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="card-soft flex flex-col justify-center p-6 sm:p-8">
          <div className="text-[13px] font-semibold text-ink">صافي التدفق النقدي</div>
          <p dir="rtl" className="mt-3 text-[14px] leading-8 text-muted-foreground">
            النقد الداخل <span className="num">−</span> النقد الخارج = صافي التغير في النقد
          </p>
          <p className="mt-5 border-s-2 border-teal ps-4 text-[14px] leading-7 font-semibold text-ink">
            اربط الأرباح بالسيولة، واعرف ما إذا كانت الشركة تولّد نقدًا فعليًا من نشاطها.
          </p>
        </div>

        <div ref={ref} className="card-soft overflow-hidden">
          <div className="border-b border-hairline bg-surface-2/70 px-4 py-3 text-[13px] font-semibold text-ink">
            {t("صافي التدفق النقدي", "Net cash flow")}
          </div>
          <div className="divide-y divide-hairline">
            {flows.map((f, i) => (
              <div
                key={f.l}
                className={`flex items-center justify-between gap-4 px-4 py-3.5 text-[13px] transition-all duration-500 ${
                  f.strong ? "bg-surface-2/50 font-semibold text-ink" : "text-muted-foreground"
                } ${visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
                style={{ transitionDelay: `${i * 110}ms` }}
              >
                <span className="min-w-0 truncate">{f.l}</span>
                <span className="num shrink-0 text-ink">{f.v}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-hairline px-4 py-2.5 text-[11.5px] text-muted-foreground">
            SAR · محسوبة من Financial Truth
          </div>
        </div>
      </div>
    </Section>
  );
}

function Bars() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const data = [42, 55, 48, 63, 58, 72, 68, 81];
  return (
    <div ref={ref} className="flex h-28 items-end gap-2">
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

export function Analytics() {
  const t = useT();
  return (
    <Section id="analytics">
      <Eyebrow>{t("التحليلات", "Analytics")}</Eyebrow>
      <h2 className="mt-4 text-[28px] leading-[1.35] font-bold text-ink sm:text-[36px]">
        لا تكتفِ بمعرفة الرقم. افهم اتجاهه.
      </h2>

      <div className="mt-10 grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <div className="card-soft p-5">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-ink">
              {t("اتجاه الإيرادات والربح", "Revenue & profit trend")}
            </span>
            <span className="num text-[11.5px] text-muted-foreground">Revenue · Profit · Expense</span>
          </div>
          <div className="mt-5">
            <Bars />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 border-t border-hairline pt-4">
            {[
              { l: "Revenue trend", v: 9.2 },
              { l: "Profit trend", v: 4.6 },
              { l: "Expense trend", v: 12.0 },
            ].map((m, i) => (
              <div key={m.l}>
                <div className="num text-[11px] text-muted-foreground">{m.l}</div>
                <div
                  className={`mt-1 text-[15px] font-semibold ${i === 2 ? "text-danger" : "text-positive"}`}
                >
                  {i === 2 ? "+" : "+"}
                  <CountUp to={m.v} decimals={1} suffix="%" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { t: "المقارنة الشهرية", s: "MoM", d: "قارن الأداء بين شهر وآخر." },
            { t: "المقارنة السنوية", s: "YoY", d: "قارن الفترة بنفس الفترة من العام السابق." },
            { t: "تحليل الاتجاهات", s: "Trends", d: "Revenue · Profit · Expense trend." },
            {
              t: "تحليل المصروفات",
              s: "Expenses",
              d: "ما الذي يرتفع؟ ما الذي ينخفض؟ ما الذي يؤثر على الربحية؟",
            },
          ].map((c) => (
            <div key={c.t} className="card-soft p-5">
              <div className="num text-[11px] font-semibold tracking-widest text-teal uppercase">
                {c.s}
              </div>
              <h3 className="mt-2 text-[15px] font-semibold text-ink">{c.t}</h3>
              <p className="mt-1.5 text-[13px] leading-6 text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Gauge({ score }: { score: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const r = 68;
  const c = Math.PI * r;
  return (
    <div ref={ref} className="relative w-full max-w-[240px]">
      <svg viewBox="0 0 160 92" className="w-full">
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
          <CountUp to={score} />
          <span className="text-[16px] text-muted-foreground"> / 100</span>
        </div>
        <div className="mt-1 text-[13px] font-semibold text-positive">جيدة</div>
      </div>
    </div>
  );
}

export function HealthScore() {
  const t = useT();
  const parts = [
    { l: "الربحية", v: 82 },
    { l: "السيولة", v: 74 },
    { l: "النمو", v: 71 },
    { l: "كفاءة المصروفات", v: 85 },
  ];
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <Section>
      <Eyebrow>{t("الصحة المالية", "Financial health")}</Eyebrow>
      <h2 className="mt-4 text-[28px] leading-[1.35] font-bold text-ink sm:text-[36px]">
        كيف تبدو صحة شركتك المالية؟
      </h2>

      <div className="card-soft mt-10 grid gap-8 p-6 sm:p-9 lg:grid-cols-[auto_minmax(0,1fr)]">
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="text-[13px] font-semibold text-muted-foreground">الصحة المالية</span>
          <Gauge score={78} />
        </div>

        <div ref={ref} className="grid content-center gap-5">
          {parts.map((p, i) => (
            <div key={p.l}>
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-ink">{p.l}</span>
                <span className="num font-semibold text-ink">{p.v}</span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                <div
                  className="h-full rounded-full bg-ink transition-[width] duration-1000"
                  style={{ width: visible ? `${p.v}%` : "0%", transitionDelay: `${i * 120}ms` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-5 text-[13px] leading-7 text-muted-foreground">
        هذا التقييم يعتمد على مؤشرات مالية قابلة للتفسير، وليس على تخمينات الذكاء الاصطناعي.
      </p>
    </Section>
  );
}

export function MultiCompany() {
  const t = useT();
  const levels = ["مجموعة الشركات", "الشركة", "الفروع", "الفترات المالية", "البيانات المالية"];
  const caps = [
    "إدارة عدة شركات",
    "إدارة الفروع",
    "عزل البيانات بين الشركات",
    "إدارة الفترات المالية",
    "مقارنة الفترات المالية",
    "عرض جميع الفترات المالية",
    "مقارنة جميع الفترات المالية",
    "مقارنة جميع الشركات والفروع",
  ];
  return (
    <Section>
      <Eyebrow>{t("الشركات والفروع", "Companies & branches")}</Eyebrow>
      <h2 className="mt-4 text-[28px] leading-[1.35] font-bold text-ink sm:text-[36px]">
        كل شركاتك وفروعك في مكان واحد
      </h2>

      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="card-soft p-5">
          {levels.map((l, i) => (
            <div key={l} style={{ paddingInlineStart: `${i * 18}px` }} className="py-1.5">
              <div className="flex items-center gap-2.5">
                {i > 0 && <span className="text-hairline">└</span>}
                <span
                  className={`rounded-lg border px-3 py-2 text-[13px] ${
                    i === 0
                      ? "border-ink bg-ink font-semibold text-primary-foreground"
                      : "border-hairline bg-surface text-ink"
                  }`}
                >
                  {l}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2">
          {caps.map((c) => (
            <div key={c} className="bg-surface px-5 py-5 text-[13.5px] font-medium text-ink">
              {c}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}