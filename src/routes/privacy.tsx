import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/vcfo/page-shell";
import { Section, useT } from "@/components/vcfo/lang";

const title = "سياسة الخصوصية | VCFO";
const description = "كيف يجمع VCFO البيانات ويعالجها ويحميها على الموقع التعريفي والمنصة.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://vcfo-ai.com/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://vcfo-ai.com/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const t = useT();

  const sections = [
    {
      ar: "ما الذي نجمعه",
      en: "What we collect",
      bodyAr:
        "على الموقع التعريفي قد نجمع بيانات تقنية محدودة مثل عنوان IP التقريبي، نوع المتصفح، الصفحات التي تزورها، ونقرات أزرار التواصل. إذا تواصلت معنا عبر واتساب فستُعالَج رسالتك وفق سياسة واتساب أيضًا.",
      bodyEn:
        "On the marketing site we may collect limited technical data such as approximate IP address, browser type, pages visited, and CTA clicks. If you contact us on WhatsApp, that conversation is also processed under WhatsApp’s policies.",
    },
    {
      ar: "التحليلات",
      en: "Analytics",
      bodyAr:
        "نستخدم Google Analytics 4 لفهم استخدام الموقع وتحسينه. نفعّل إخفاء عنوان IP ولا نستخدم بياناتك المالية لتدريب نماذج. يمكنك حظر التتبع عبر إعدادات المتصفح أو إضافات منع التتبع.",
      bodyEn:
        "We use Google Analytics 4 to understand and improve site usage. IP anonymization is enabled, and we never use your financial data to train models. You can block tracking via browser settings or privacy extensions.",
    },
    {
      ar: "بيانات المنصة",
      en: "Product data",
      bodyAr:
        "إذا أصبحت عميلًا، تبقى بياناتك المالية ملكك. نعزل بيانات كل شركة، ونشفّرها أثناء النقل والتخزين، ولا نبيعها، ولا نستخدمها لتدريب أي نماذج ذكاء اصطناعي.",
      bodyEn:
        "If you become a customer, your financial data remains yours. Each company is isolated, data is encrypted in transit and at rest, and we do not sell it or use it to train AI models.",
    },
    {
      ar: "حقوقك",
      en: "Your rights",
      bodyAr:
        "يمكنك طلب الاطلاع على بياناتك أو تصحيحها أو حذفها. للتواصل: واتساب فريق VCFO أو عبر صفحة تواصل معنا.",
      bodyEn:
        "You can request access, correction, or deletion of your data. Contact the VCFO team on WhatsApp or via the contact section.",
    },
  ];

  return (
    <PageShell>
      <Section>
        <p className="text-[13px] font-semibold tracking-wide text-teal">
          {t("قانوني", "Legal")}
        </p>
        <h1 className="mt-3 text-[34px] leading-[1.3] font-bold text-ink sm:text-[44px]">
          {t("سياسة الخصوصية", "Privacy policy")}
        </h1>
        <p className="mt-4 text-[13.5px] text-muted-foreground">
          {t("آخر تحديث: 13 أغسطس 2026", "Last updated: 13 August 2026")}
        </p>
        <div className="mt-10 space-y-8">
          {sections.map((s) => (
            <section key={s.en}>
              <h2 className="text-[20px] font-semibold text-ink">{t(s.ar, s.en)}</h2>
              <p className="mt-3 max-w-[72ch] text-[15px] leading-8 text-muted-foreground">
                {t(s.bodyAr, s.bodyEn)}
              </p>
            </section>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
