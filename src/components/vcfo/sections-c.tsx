import { Section, Eyebrow, useT } from "./lang";

const states = [
  { s: "✓ VALID", cls: "border-positive/35 bg-positive/8 text-positive" },
  { s: "⚠ WARNING", cls: "border-warning/40 bg-warning/10 text-warning" },
  { s: "⚠ REVIEW REQUIRED", cls: "border-warning/40 bg-warning/10 text-warning" },
  { s: "✕ FAILED", cls: "border-danger/35 bg-danger/8 text-danger" },
];

export function DataQuality() {
  const t = useT();
  return (
    <Section>
      <Eyebrow>{t("جودة البيانات", "Data quality")}</Eyebrow>
      <h2 className="mt-4 max-w-[30ch] text-[28px] leading-[1.35] font-bold text-ink sm:text-[36px]">
        {t(
          "قبل أن نخبرك بما يحدث، نتأكد أن البيانات صحيحة",
          "Before we tell you what is happening, we make sure the data is right",
        )}
      </h2>
      <p className="mt-4 max-w-[68ch] text-[15px] leading-8 text-muted-foreground">
        {t(
          "VCFO لا يحاول إخفاء المشاكل في البيانات. عندما يجد خطأ، يخبرك أين المشكلة وما الذي يحتاج إلى مراجعة.",
          "VCFO does not hide data problems. When it finds an issue, it tells you where it is and what needs review.",
        )}
      </p>

      <div className="mt-8 flex flex-wrap gap-2.5">
        {states.map((s) => (
          <span
            key={s.s}
            className={`num rounded-lg border px-3 py-1.5 text-[12px] font-semibold ${s.cls}`}
          >
            {s.s}
          </span>
        ))}
      </div>

      <div className="card-soft mt-8 overflow-hidden">
        <div className="grid gap-4 p-5 sm:grid-cols-3 sm:p-6">
          <div>
            <div className="text-[11.5px] text-muted-foreground">{t("الحساب", "Account")}</div>
            <div className="mt-1.5 text-[14px] font-semibold text-ink">
              <span className="num">5100</span> — {t("مصروفات تشغيلية", "Operating expenses")}
            </div>
          </div>
          <div>
            <div className="text-[11.5px] text-muted-foreground">{t("الحالة", "Status")}</div>
            <div className="mt-1.5 text-[14px] font-semibold text-danger">
              {t("غير موجود في دليل الحسابات", "Not found in the chart of accounts")}
            </div>
          </div>
          <div>
            <div className="text-[11.5px] text-muted-foreground">{t("الإجراء", "Action")}</div>
            <div className="mt-1.5 text-[14px] font-semibold text-ink">
              {t("مراجعة المطابقة", "Review mapping")}
            </div>
          </div>
        </div>
        <div className="border-t border-hairline bg-surface-2/60 px-5 py-3.5 sm:px-6">
          <button className="rounded-lg bg-ink px-4 py-2 text-[13px] font-semibold text-primary-foreground transition-transform hover:-translate-y-px">
            {t("مراجعة الخطأ", "Review issue")}
          </button>
        </div>
      </div>
    </Section>
  );
}

const issues = [
  { n: "01", ar: "حساب غير موجود", en: "Missing account", ref: "1205" },
  { n: "02", ar: "حساب غير مطابق", en: "Unmapped account", ref: "5100" },
  { n: "03", ar: "قيمة غير صحيحة", en: "Invalid value", ref: "Row 84" },
  { n: "04", ar: "حساب مكرر", en: "Duplicate account", ref: "4100" },
];

export function ErrorResolution() {
  const t = useT();
  return (
    <Section>
      <Eyebrow>{t("معالجة الأخطاء", "Error resolution")}</Eyebrow>
      <h2 className="mt-4 text-[28px] leading-[1.35] font-bold text-ink sm:text-[36px]">
        {t("الأخطاء واضحة وقابلة للمراجعة", "Issues are visible and reviewable")}
      </h2>

      <div className="card-soft mt-10 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline bg-surface-2/70 px-5 py-3.5">
          <span className="text-[13.5px] font-semibold text-ink">
            {t("تم اكتشاف", "Found")} <span className="num">4</span> {t("مشاكل في الملف.", "issues in the file.")}
          </span>
          <span className="num rounded-md border border-danger/30 bg-danger/8 px-2.5 py-1 text-[11px] font-semibold text-danger">
            ✕ FAILED
          </span>
        </div>
        <div className="divide-y divide-hairline">
          {issues.map((i) => (
            <div key={i.n} className="flex items-center gap-4 px-5 py-4">
              <span className="num text-[12px] font-semibold text-teal">{i.n}</span>
              <span className="min-w-0 flex-1 truncate text-[14px] text-ink">{t(i.ar, i.en)}</span>
              <span className="num shrink-0 rounded-md bg-surface-2 px-2 py-1 text-[12px] font-semibold text-ink">
                {i.ref}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t border-hairline px-5 py-4">
          <button className="rounded-lg bg-ink px-4 py-2 text-[13px] font-semibold text-primary-foreground transition-transform hover:-translate-y-px">
            {t("مراجعة المشاكل", "Review issues")}
          </button>
        </div>
      </div>

      <p className="mt-5 max-w-[70ch] text-[13.5px] leading-7 text-muted-foreground">
        {t(
          "يمكنك تعديل الملف وإعادة رفعه، أو معالجة الحالات التي يسمح النظام بمعالجتها من داخل المنصة.",
          "You can edit the file and re-upload it, or handle the cases that the system allows you to handle within the platform."
        )}
      </p>
    </Section>
  );
}

export function Security() {
  const t = useT();
  const items = [
    "Tenant Isolation",
    "Role-Based Access",
    "Audit Logs",
    "Financial Data Lineage",
    "Processing History",
  ];
  return (
    <div className="border-y border-hairline bg-surface-2/50">
      <Section>
        <Eyebrow>{t("الأمان والحوكمة", "Security & governance")}</Eyebrow>
        <h2 className="mt-4 max-w-[30ch] text-[28px] leading-[1.35] font-bold text-ink sm:text-[36px]">
          بياناتك المالية تحتاج أكثر من مجرد واجهة جميلة
        </h2>
        <p className="mt-4 max-w-[68ch] text-[15px] leading-8 text-muted-foreground">
          كل عملية مهمة يمكن تتبعها، وكل شركة وبياناتها معزولة عن الشركات الأخرى.
        </p>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.05fr_1fr]">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2">
            {items.map((i) => (
              <div key={i} className="num bg-surface px-5 py-5 text-[13px] font-semibold text-ink">
                {i}
              </div>
            ))}
          </div>

          <div className="card-soft p-5">
            <div className="text-[11.5px] font-semibold tracking-widest text-muted-foreground uppercase">
              Audit log
            </div>
            <div className="mt-4 flex items-start gap-3">
              <span className="num grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-[12px] font-semibold text-primary-foreground">
                AL
              </span>
              <div className="min-w-0">
                <p className="text-[13.5px] leading-7 text-ink">
                  <span className="font-semibold">Ali</span> قام بإعادة رفع Trial Balance
                </p>
                <div className="mt-2 grid gap-1 text-[12.5px] text-muted-foreground">
                  <span>الشركة: Acme</span>
                  <span>الفترة: مارس 2026</span>
                  <span className="num">الوقت: 10:42 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}