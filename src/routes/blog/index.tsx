import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/vcfo/page-shell";
import { Section, useT } from "@/components/vcfo/lang";
import { blogPosts } from "@/lib/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "المدونة | VCFO" },
      {
        name: "description",
        content: "مقالات VCFO عن الحقيقة المالية، التدفق النقدي، جودة البيانات، وتقارير الفروع.",
      },
      { property: "og:title", content: "المدونة | VCFO" },
      { property: "og:url", content: "https://vcfo-ai.com/blog" },
    ],
    links: [{ rel: "canonical", href: "https://vcfo-ai.com/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const t = useT();

  return (
    <PageShell>
      <Section>
        <p className="text-[13px] font-semibold tracking-wide text-teal">
          {t("المدونة", "Blog")}
        </p>
        <h1 className="mt-3 max-w-[22ch] text-[34px] leading-[1.3] font-bold text-ink sm:text-[44px]">
          {t("أفكار عملية عن الذكاء المالي", "Practical notes on financial intelligence")}
        </h1>
        <p className="mt-5 max-w-[62ch] text-[16px] leading-8 text-muted-foreground">
          {t(
            "مقالات قصيرة عن Financial Truth، التدفق النقدي، جودة البيانات، وكيف تقرأ أرقام شركتك بوضوح أكبر.",
            "Short essays on Financial Truth, cash flow, data quality, and how to read your company's numbers more clearly.",
          )}
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {blogPosts.map((post) => (
            <article key={post.slug} className="card-soft flex flex-col p-6">
              <div className="flex items-center justify-between gap-3 text-[12px] text-muted-foreground">
                <span>{t(post.categoryAr, post.categoryEn)}</span>
                <span className="num">
                  {post.date} · {post.readMin} {t("دقائق", "min")}
                </span>
              </div>
              <h2 className="mt-4 text-[20px] leading-8 font-semibold text-ink">
                <Link to="/blog/$slug" params={{ slug: post.slug }} className="hover:text-teal">
                  {t(post.titleAr, post.titleEn)}
                </Link>
              </h2>
              <p className="mt-3 flex-1 text-[14px] leading-7 text-muted-foreground">
                {t(post.excerptAr, post.excerptEn)}
              </p>
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="mt-5 text-[13.5px] font-semibold text-ink"
              >
                {t("اقرأ المقال ←", "Read article →")}
              </Link>
            </article>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
