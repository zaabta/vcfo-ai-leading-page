import { useState } from "react";
import { Plus } from "lucide-react";
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from "@/lib/whatsapp";
import { trackCtaClick } from "@/lib/analytics";
import { Section, useT, useLang } from "./lang";
import { Logo } from "./nav";

export function CTA() {
  const t = useT();
  const getStartedUrl = getWhatsAppUrl(WHATSAPP_MESSAGES.getStarted);
  const salesUrl = getWhatsAppUrl(WHATSAPP_MESSAGES.sales);

  return (
    <Section id="cta">
      <div className="relative overflow-hidden rounded-3xl border border-hairline bg-ink px-6 py-16 text-center text-primary-foreground sm:px-12 sm:py-20">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-[0.35] [mask-image:radial-gradient(60%_60%_at_50%_50%,#000,transparent)]" />
        <div className="relative mx-auto max-w-[46ch]">
          <h2 className="text-[28px] leading-[1.4] font-bold sm:text-[38px]">
            {t("ابدأ ببناء الصورة المالية الواضحة لشركتك", "Start building a clear financial picture of your company")}
          </h2>
          <p className="mt-5 text-[14.5px] leading-8 opacity-70">
            {t(
              "ارفع بياناتك المالية، دع VCFO ينظمها ويتحقق منها، ثم ابدأ بفهم أرقام شركتك بطريقة أفضل.",
              "Upload your financial data, let VCFO organize and validate it, then start understanding your numbers more clearly.",
            )}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={getStartedUrl}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => trackCtaClick("get_started", "cta", getStartedUrl)}
              className="rounded-lg bg-primary-foreground px-6 py-3 text-[14px] font-semibold text-ink transition-transform hover:-translate-y-px"
            >
              {t("ابدأ الآن", "Get started")}
            </a>
            <a
              href={salesUrl}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => trackCtaClick("talk_to_team", "cta", salesUrl)}
              className="rounded-lg border border-white/25 px-6 py-3 text-[14px] font-semibold transition-colors hover:bg-white/[0.06]"
            >
              {t("تحدث مع فريقنا", "Talk to our team")}
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}

const faqs = [
  {
    qAr: "ما هو VCFO؟",
    qEn: "What is VCFO?",
    aAr: "VCFO منصة ذكاء مالي تحوّل بياناتك المحاسبية إلى قوائم مالية موثوقة ومؤشرات وتحليلات تساعدك على اتخاذ القرار.",
    aEn: "VCFO is a financial intelligence platform that turns accounting data into trusted statements, metrics, and analysis that help you decide.",
  },
  {
    qAr: "ما نوع الملفات التي يمكنني رفعها؟",
    qEn: "What files can I upload?",
    aAr: "يمكنك رفع Trial Balance أو Chart of Accounts بصيغة Excel أو CSV.",
    aEn: "You can upload a Trial Balance or Chart of Accounts as Excel or CSV.",
  },
  {
    qAr: "هل أحتاج إلى تغيير نظام المحاسبة الخاص بي؟",
    qEn: "Do I need to replace my accounting system?",
    aAr: "لا. VCFO يعمل فوق مخرجات نظامك الحالي دون الحاجة إلى استبداله.",
    aEn: "No. VCFO sits on top of your current system's outputs. You do not need to replace it.",
  },
  {
    qAr: "هل يمكنني إدارة أكثر من شركة؟",
    qEn: "Can I manage more than one company?",
    aAr: "نعم، يمكنك إدارة عدة شركات مع عزل كامل للبيانات بين كل شركة وأخرى.",
    aEn: "Yes. You can manage multiple companies with full data isolation between them.",
  },
  {
    qAr: "هل يدعم الفروع؟",
    qEn: "Does it support branches?",
    aAr: "نعم، يدعم إدارة الفروع وعرض جميع الفروع ومقارنة الفروع ضمن نفس الشركة.",
    aEn: "Yes. You can manage branches, view all branches, and compare them within the same company.",
  },
  {
    qAr: "كيف يتعامل النظام مع الأخطاء في الملفات؟",
    qEn: "How does the system handle file errors?",
    aAr: "يعرض النظام قائمة واضحة بالمشاكل مع الحساب أو الصف المتأثر، ويمكنك تعديل الملف وإعادة رفعه أو معالجة الحالات المسموح بها داخل المنصة.",
    aEn: "It shows a clear list of issues with the affected account or row. You can fix the file and re-upload it, or resolve allowed cases in-app.",
  },
  {
    qAr: "ما هي Financial Truth؟",
    qEn: "What is Financial Truth?",
    aAr: "هي طبقة مالية موحدة يُحسب فيها الرقم مرة واحدة، ثم تعتمد عليها القوائم والمؤشرات والتحليلات في المنصة بالكامل.",
    aEn: "It is a single financial layer where each number is calculated once, then used by statements, metrics, and analytics across the platform.",
  },
  {
    qAr: "هل البيانات المالية آمنة؟",
    qEn: "Is financial data secure?",
    aAr: "نعم، مع عزل بين المستأجرين، صلاحيات حسب الدور، سجل تدقيق، وتتبع كامل لمصدر البيانات.",
    aEn: "Yes. Tenant isolation, role-based access, an audit log, and full data lineage are built in.",
  },
  {
    qAr: "هل VCFO يستخدم الذكاء الاصطناعي؟",
    qEn: "Does VCFO use AI?",
    aAr: "المؤشرات والتقييمات مبنية على قواعد مالية قابلة للتفسير. طبقة الذكاء الاصطناعي التفسيرية قادمة في مرحلة لاحقة.",
    aEn: "Metrics and scores are based on explainable financial rules. The interpretive AI layer is coming later.",
  },
  {
    qAr: "هل يمكنني التحدث مع المستشار المالي؟",
    qEn: "Can I talk to the financial advisor?",
    aAr: "المستشار المالي الذكي ميزة قادمة قريبًا، وستعتمد إجاباته على Financial Truth الخاصة بشركتك.",
    aEn: "The intelligent financial advisor is coming soon, and its answers will be grounded in your company's Financial Truth.",
  },
];

export function FAQ() {
  const t = useT();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq">
      <h2 className="text-[28px] leading-[1.35] font-bold text-ink sm:text-[36px]">
        {t("الأسئلة الشائعة", "FAQ")}
      </h2>
      <div className="mt-10 divide-y divide-hairline border-y border-hairline">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.qEn}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-start"
              >
                <span className="text-[15px] font-semibold text-ink">{t(f.qAr, f.qEn)}</span>
                <Plus
                  className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                />
              </button>
              <div
                className="grid overflow-hidden transition-all duration-400"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="min-h-0">
                  <p className="pb-5 text-[14px] leading-8 text-muted-foreground">{t(f.aAr, f.aEn)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

const cols = [
  {
    title: "المنتج",
    enTitle: "Product",
    items: [
      { ar: "كيف يعمل", en: "How it works", href: "/#how" },
      { ar: "القوائم المالية", en: "Statements", href: "/#features" },
      { ar: "التحليلات", en: "Analytics", href: "/#analytics" },
      { ar: "المستشار المالي", en: "AI CFO", href: "/#aicfo" },
      { ar: "الأسعار", en: "Pricing", href: "/#pricing" },
    ],
  },
  {
    title: "الشركة",
    enTitle: "Company",
    items: [
      { ar: "من نحن", en: "About", href: "/about" },
      { ar: "تواصل معنا", en: "Contact", href: "/#cta" },
      { ar: "المدونة", en: "Blog", href: "/blog" },
      { ar: "الأسئلة الشائعة", en: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "قانوني",
    enTitle: "Legal",
    items: [
      { ar: "الخصوصية", en: "Privacy", href: "/privacy" },
      { ar: "الشروط", en: "Terms", href: "/terms" },
      { ar: "الأمان", en: "Security", href: "/#compliance" },
    ],
  },
];

export function Footer() {
  const { lang, setLang } = useLang();
  return (
    <footer className="border-t border-hairline bg-surface-2/50">
      <div className="mx-auto max-w-[1180px] px-5 py-16 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-[34ch] text-[13.5px] leading-7 text-muted-foreground">
              {lang === "en"
                ? "Financial intelligence that helps you make better decisions."
                : "ذكاء مالي يساعدك على اتخاذ قرارات أفضل."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {cols.map((c) => (
              <div key={c.title}>
                <h3 className="text-[13px] font-semibold text-ink">
                  {lang === "en" ? c.enTitle : c.title}
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {c.items.map((i) => (
                    <li key={i.href}>
                      <a
                        href={i.href}
                        className="text-[13px] text-muted-foreground transition-colors hover:text-ink"
                      >
                        {lang === "en" ? i.en : i.ar}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-hairline pt-6 sm:flex-row sm:items-center">
          <p className="num text-[12.5px] text-muted-foreground">
            © 2026 VCFO. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-2 text-[12.5px]">
            {(["ar", "en"] as const).map((l, idx) => (
              <span key={l} className="flex items-center gap-2">
                {idx === 1 && <span className="text-hairline">|</span>}
                <button
                  onClick={() => setLang(l)}
                  className={`transition-colors ${
                    lang === l ? "font-semibold text-ink" : "text-muted-foreground hover:text-ink"
                  }`}
                >
                  {l === "ar" ? "العربية" : "English"}
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}