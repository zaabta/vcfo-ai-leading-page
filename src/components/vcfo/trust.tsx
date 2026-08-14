import { ShieldCheck, Lock, KeyRound, FileCheck2, Server, EyeOff, Quote } from "lucide-react";
import { Section, Eyebrow, useT } from "./lang";

const pillars = [
  {
    icon: ShieldCheck,
    ar: "حماية البيانات",
    en: "Data protection",
    dAr: "بيانات كل شركة معزولة تمامًا عن غيرها، مع نسخ احتياطي دوري وخطة استرجاع واضحة.",
    dEn: "Each company's data is fully isolated, with daily backups and a clear recovery plan.",
    tags: ["Tenant Isolation", "Daily Backups", "Disaster Recovery"],
  },
  {
    icon: Lock,
    ar: "التشفير",
    en: "Encryption",
    dAr: "تشفير البيانات أثناء النقل وأثناء التخزين، وإدارة آمنة لمفاتيح التشفير.",
    dEn: "Data is encrypted in transit and at rest, with managed encryption keys.",
    tags: ["TLS 1.3", "AES-256 at rest", "Managed Keys"],
  },
  {
    icon: KeyRound,
    ar: "سياسات الوصول والصلاحيات",
    en: "Access and permissions",
    dAr: "صلاحيات دقيقة حسب الدور والشركة والفرع، مع مبدأ أقل امتياز والتحقق بخطوتين.",
    dEn: "Fine-grained permissions by role, company, and branch, with least privilege and 2FA.",
    tags: ["RBAC", "SSO / 2FA", "Least Privilege"],
  },
  {
    icon: FileCheck2,
    ar: "التدقيق والامتثال",
    en: "Audit and compliance",
    dAr: "سجل تدقيق كامل لكل عملية، وتتبع مصدر كل رقم مالي حتى الملف الأصلي.",
    dEn: "A full audit log for every action, and lineage from every number back to the source file.",
    tags: ["Audit Logs", "Data Lineage", "Retention Policy"],
  },
  {
    icon: Server,
    ar: "استضافة موثوقة",
    en: "Reliable hosting",
    dAr: "بنية تحتية سحابية مع مراقبة مستمرة، وخيار استضافة البيانات داخل المنطقة.",
    dEn: "Cloud infrastructure with continuous monitoring and a regional hosting option.",
    tags: ["Regional Hosting", "Monitoring", "99.9% Uptime"],
  },
  {
    icon: EyeOff,
    ar: "الخصوصية",
    en: "Privacy",
    dAr: "بياناتك ملكك. لا تُستخدم بياناتك المالية لتدريب أي نماذج، ويمكنك حذفها في أي وقت.",
    dEn: "Your data stays yours. We do not use financial data to train models, and you can delete it anytime.",
    tags: ["No Model Training", "Data Deletion", "PDPL Aligned"],
  },
];

export function Compliance() {
  const t = useT();
  return (
    <Section id="compliance">
      <Eyebrow>{t("الأمان والامتثال للشركات", "Enterprise security & compliance")}</Eyebrow>
      <h2 className="mt-4 max-w-[28ch] text-[28px] leading-[1.35] font-bold text-ink sm:text-[36px]">
        {t("أمان بمستوى المؤسسات لبياناتك المالية", "Enterprise-grade security for your financial data")}
      </h2>
      <p className="mt-4 max-w-[66ch] text-[15px] leading-8 text-muted-foreground">
        {t(
          "البيانات المالية من أكثر بيانات الشركة حساسية. لذلك بُني VCFO على ضوابط واضحة لحماية البيانات، والتشفير، وإدارة الصلاحيات، وتتبع كل عملية.",
          "Financial data is among a company's most sensitive assets. VCFO is built with clear controls for protection, encryption, access, and a full audit trail.",
        )}
      </p>

      <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
        {pillars.map((p) => (
          <div key={p.en} className="bg-surface p-6 transition-colors hover:bg-surface-2/60">
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-hairline bg-surface-2">
              <p.icon className="h-[18px] w-[18px] text-teal" />
            </span>
            <h3 className="mt-4 text-[15.5px] font-semibold text-ink">{t(p.ar, p.en)}</h3>
            <p className="mt-2 text-[13.5px] leading-7 text-muted-foreground">{t(p.dAr, p.dEn)}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.tags.map((g) => (
                <span
                  key={g}
                  className="num rounded-md border border-hairline bg-surface-2 px-2 py-1 text-[11px] font-semibold text-ink"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_1fr]">
        <div className="card-soft p-6 sm:p-7">
          <h3 className="text-[15px] font-semibold text-ink">
            {t("ضوابط الوصول داخل المنصة", "Access controls inside the platform")}
          </h3>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {[
              t("التحقق بخطوتين (2FA)", "Two-factor authentication (2FA)"),
              t("تسجيل الدخول الموحد (SSO)", "Single sign-on (SSO)"),
              t("صلاحيات حسب الدور", "Role-based permissions"),
              t("عزل البيانات بين الشركات", "Company data isolation"),
              t("سجل تدقيق قابل للتصدير", "Exportable audit log"),
              t("مراجعة دورية للصلاحيات", "Periodic access reviews"),
            ].map((c) => (
              <li key={c} className="flex items-start gap-2 text-[13.5px] leading-6 text-ink/80">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-hairline bg-ink p-6 text-primary-foreground sm:p-7">
          <div className="text-[11.5px] font-semibold tracking-widest uppercase opacity-60">
            {t("مصفوفة الوصول", "Access matrix")}
          </div>
          <div className="mt-4 divide-y divide-white/10 text-[13px]">
            {[
              { r: t("المالك", "Owner"), s: t("كامل الصلاحيات", "Full access") },
              { r: t("المدير المالي", "CFO"), s: t("رفع البيانات والاعتماد", "Upload and approve") },
              { r: t("المحلل", "Analyst"), s: t("عرض التحليلات فقط", "Analytics only") },
              { r: t("المراجع", "Reviewer"), s: t("قراءة + سجل التدقيق", "Read + audit log") },
            ].map((x) => (
              <div key={x.r} className="flex items-center justify-between gap-4 py-3">
                <span className="num font-semibold">{x.r}</span>
                <span className="opacity-70">{x.s}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 border-s-2 border-teal ps-4 text-[13px] leading-7 opacity-80">
            {t(
              "كل تغيير في الصلاحيات يُسجَّل ويمكن مراجعته لاحقًا.",
              "Every permission change is logged and can be reviewed later.",
            )}
          </p>
        </div>
      </div>
    </Section>
  );
}

const quotes = [
  {
    qAr: "كنا نقضي أسبوعًا كاملاً في إعداد القوائم الشهرية. الآن نرفع الميزان ونحصل على الصورة كاملة في دقائق.",
    qEn: "We used to spend a full week preparing monthly statements. Now we upload the trial balance and get the full picture in minutes.",
    nAr: "سارة العتيبي",
    nEn: "Sarah Al-Otaibi",
    rAr: "مديرة مالية · مجموعة تجزئة",
    rEn: "Finance director · retail group",
  },
  {
    qAr: "أهم ما تغيّر أن الجميع أصبح يناقش نفس الأرقام. لم يعد لكل تقرير نسخة مختلفة من الحقيقة.",
    qEn: "The biggest change is that everyone now debates the same numbers. No report has a different version of the truth.",
    nAr: "خالد المنصور",
    nEn: "Khalid Al-Mansour",
    rAr: "الرئيس التنفيذي",
    rEn: "Chief executive",
  },
  {
    qAr: "مقارنة أداء الفروع كانت أصعب جزء في عملنا. أصبحت اليوم شاشة واحدة نفتحها في بداية كل اجتماع.",
    qEn: "Comparing branch performance was the hardest part of our work. Today it is one screen we open at the start of every meeting.",
    nAr: "نورة الحربي",
    nEn: "Noura Al-Harbi",
    rAr: "مديرة عمليات · 12 فرعًا",
    rEn: "Operations director · 12 branches",
  },
  {
    qAr: "التحقق من سلامة البيانات وفّر علينا أخطاء كانت تظهر متأخرة. النظام يخبرك أين المشكلة بالضبط.",
    qEn: "Data validation saved us from errors that used to appear too late. The system tells you exactly where the problem is.",
    nAr: "عبدالله الشمري",
    nEn: "Abdullah Al-Shammari",
    rAr: "محاسب قانوني",
    rEn: "Certified accountant",
  },
  {
    qAr: "قائمة التدفقات النقدية غيّرت طريقة تخطيطنا للسيولة. صرنا نعرف مبكرًا متى نحتاج تمويلًا.",
    qEn: "The cash flow statement changed how we plan liquidity. We now know earlier when we will need funding.",
    nAr: "ريم القحطاني",
    nEn: "Reem Al-Qahtani",
    rAr: "مؤسِّسة شركة تقنية",
    rEn: "Tech founder",
  },
];

export function Testimonials() {
  const t = useT();
  return (
    <div className="border-y border-hairline bg-surface-2/40">
      <Section id="testimonials">
        <Eyebrow>{t("آراء العملاء", "Testimonials")}</Eyebrow>
        <h2 className="mt-4 max-w-[26ch] text-[28px] leading-[1.35] font-bold text-ink sm:text-[36px]">
          {t("فرق مالية تعتمد على VCFO في قراراتها", "Finance teams that rely on VCFO to decide")}
        </h2>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {quotes.map((c, i) => (
            <figure
              key={c.nEn}
              className={`card-soft flex flex-col p-6 ${i === 0 ? "lg:col-span-2" : ""}`}
            >
              <Quote className="h-5 w-5 shrink-0 text-teal" />
              <blockquote
                className={`mt-4 flex-1 leading-8 text-ink ${
                  i === 0 ? "text-[17px] font-semibold sm:text-[19px]" : "text-[14.5px]"
                }`}
              >
                {t(c.qAr, c.qEn)}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-hairline pt-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-[12.5px] font-semibold text-primary-foreground">
                  {t(c.nAr, c.nEn).slice(0, 1)}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[13.5px] font-semibold text-ink">{t(c.nAr, c.nEn)}</span>
                  <span className="block truncate text-[12.5px] text-muted-foreground">{t(c.rAr, c.rEn)}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>
    </div>
  );
}
