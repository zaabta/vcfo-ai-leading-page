import { ShieldCheck, Lock, KeyRound, FileCheck2, Server, EyeOff, Quote } from "lucide-react";
import { Section, Eyebrow, useT } from "./lang";

const pillars = [
  {
    icon: ShieldCheck,
    t: "حماية البيانات",
    d: "بيانات كل شركة معزولة تمامًا عن غيرها، مع نسخ احتياطي دوري وخطة استرجاع واضحة.",
    tags: ["Tenant Isolation", "Daily Backups", "Disaster Recovery"],
  },
  {
    icon: Lock,
    t: "التشفير",
    d: "تشفير البيانات أثناء النقل وأثناء التخزين، وإدارة آمنة لمفاتيح التشفير.",
    tags: ["TLS 1.3", "AES-256 at rest", "Managed Keys"],
  },
  {
    icon: KeyRound,
    t: "سياسات الوصول والصلاحيات",
    d: "صلاحيات دقيقة حسب الدور والشركة والفرع، مع مبدأ أقل امتياز والتحقق بخطوتين.",
    tags: ["RBAC", "SSO / 2FA", "Least Privilege"],
  },
  {
    icon: FileCheck2,
    t: "التدقيق والامتثال",
    d: "سجل تدقيق كامل لكل عملية، وتتبع مصدر كل رقم مالي حتى الملف الأصلي.",
    tags: ["Audit Logs", "Data Lineage", "Retention Policy"],
  },
  {
    icon: Server,
    t: "استضافة موثوقة",
    d: "بنية تحتية سحابية مع مراقبة مستمرة، وخيار استضافة البيانات داخل المنطقة.",
    tags: ["Regional Hosting", "Monitoring", "99.9% Uptime"],
  },
  {
    icon: EyeOff,
    t: "الخصوصية",
    d: "بياناتك ملكك. لا تُستخدم بياناتك المالية لتدريب أي نماذج، ويمكنك حذفها في أي وقت.",
    tags: ["No Model Training", "Data Deletion", "PDPL Aligned"],
  },
];

const controls = [
  "التحقق بخطوتين (2FA)",
  "تسجيل الدخول الموحد (SSO)",
  "صلاحيات حسب الدور",
  "عزل البيانات بين الشركات",
  "سجل تدقيق قابل للتصدير",
  "مراجعة دورية للصلاحيات",
];

export function Compliance() {
  const t = useT();
  return (
    <Section id="compliance">
      <Eyebrow>{t("الأمان والامتثال للشركات", "Enterprise security & compliance")}</Eyebrow>
      <h2 className="mt-4 max-w-[28ch] text-[28px] leading-[1.35] font-bold text-ink sm:text-[36px]">
        أمان بمستوى المؤسسات لبياناتك المالية
      </h2>
      <p className="mt-4 max-w-[66ch] text-[15px] leading-8 text-muted-foreground">
        البيانات المالية من أكثر بيانات الشركة حساسية. لذلك بُني VCFO على ضوابط واضحة لحماية
        البيانات، والتشفير، وإدارة الصلاحيات، وتتبع كل عملية.
      </p>

      <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
        {pillars.map((p) => (
          <div key={p.t} className="bg-surface p-6 transition-colors hover:bg-surface-2/60">
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-hairline bg-surface-2">
              <p.icon className="h-[18px] w-[18px] text-teal" />
            </span>
            <h3 className="mt-4 text-[15.5px] font-semibold text-ink">{p.t}</h3>
            <p className="mt-2 text-[13.5px] leading-7 text-muted-foreground">{p.d}</p>
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
          <h3 className="text-[15px] font-semibold text-ink">ضوابط الوصول داخل المنصة</h3>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {controls.map((c) => (
              <li key={c} className="flex items-start gap-2 text-[13.5px] leading-6 text-ink/80">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-hairline bg-ink p-6 text-primary-foreground sm:p-7">
          <div className="text-[11.5px] font-semibold tracking-widest uppercase opacity-60">
            مصفوفة الوصول
          </div>
          <div className="mt-4 divide-y divide-white/10 text-[13px]">
            {[
              { r: "المالك", s: "كامل الصلاحيات" },
              { r: "المدير المالي", s: "رفع البيانات والاعتماد" },
              { r: "المحلل", s: "عرض التحليلات فقط" },
              { r: "المراجع", s: "قراءة + سجل التدقيق" },
            ].map((x) => (
              <div key={x.r} className="flex items-center justify-between gap-4 py-3">
                <span className="num font-semibold">{x.r}</span>
                <span className="opacity-70">{x.s}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 border-s-2 border-teal ps-4 text-[13px] leading-7 opacity-80">
            كل تغيير في الصلاحيات يُسجَّل ويمكن مراجعته لاحقًا.
          </p>
        </div>
      </div>
    </Section>
  );
}

const quotes = [
  {
    q: "كنا نقضي أسبوعًا كاملاً في إعداد القوائم الشهرية. الآن نرفع الميزان ونحصل على الصورة كاملة في دقائق.",
    n: "سارة العتيبي",
    r: "مديرة مالية · مجموعة تجزئة",
  },
  {
    q: "أهم ما تغيّر أن الجميع أصبح يناقش نفس الأرقام. لم يعد لكل تقرير نسخة مختلفة من الحقيقة.",
    n: "خالد المنصور",
    r: "الرئيس التنفيذي",
  },
  {
    q: "مقارنة أداء الفروع كانت أصعب جزء في عملنا. أصبحت اليوم شاشة واحدة نفتحها في بداية كل اجتماع.",
    n: "نورة الحربي",
    r: "مديرة عمليات · 12 فرعًا",
  },
  {
    q: "التحقق من سلامة البيانات وفّر علينا أخطاء كانت تظهر متأخرة. النظام يخبرك أين المشكلة بالضبط.",
    n: "عبدالله الشمري",
    r: "محاسب قانوني",
  },
  {
    q: "قائمة التدفقات النقدية غيّرت طريقة تخطيطنا للسيولة. صرنا نعرف مبكرًا متى نحتاج تمويلًا.",
    n: "ريم القحطاني",
    r: "مؤسِّسة شركة تقنية",
  },
];

export function Testimonials() {
  const t = useT();
  return (
    <div className="border-y border-hairline bg-surface-2/40">
      <Section id="testimonials">
        <Eyebrow>{t("آراء العملاء", "Testimonials")}</Eyebrow>
        <h2 className="mt-4 max-w-[26ch] text-[28px] leading-[1.35] font-bold text-ink sm:text-[36px]">
          فرق مالية تعتمد على VCFO في قراراتها
        </h2>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {quotes.map((c, i) => (
            <figure
              key={c.n}
              className={`card-soft flex flex-col p-6 ${i === 0 ? "lg:col-span-2" : ""}`}
            >
              <Quote className="h-5 w-5 shrink-0 text-teal" />
              <blockquote
                className={`mt-4 flex-1 leading-8 text-ink ${
                  i === 0 ? "text-[17px] font-semibold sm:text-[19px]" : "text-[14.5px]"
                }`}
              >
                {c.q}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-hairline pt-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-[12.5px] font-semibold text-primary-foreground">
                  {c.n.slice(0, 1)}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[13.5px] font-semibold text-ink">{c.n}</span>
                  <span className="block truncate text-[12.5px] text-muted-foreground">{c.r}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>
    </div>
  );
}
