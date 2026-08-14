import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo/metadata";
import { PageShell } from "@/components/layout/page-shell";
import { Section } from "@/components/home/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Link } from "@/i18n/navigation";
import { blogPosts, getCategoryLabel, getPostExcerpt, getPostTitle } from "@/content/blog";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });

  return createPageMetadata({
    locale: locale as Locale,
    path: "blog",
    title: t("blog.title"),
    description: t("blog.description"),
  });
}

export default async function BlogIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("Blog");
  const localeTyped = locale as Locale;

  const posts = [...blogPosts].sort(
    (a, b) =>
      Number(b.featured ?? false) - Number(a.featured ?? false) ||
      b.publishedAt.localeCompare(a.publishedAt),
  );

  return (
    <PageShell>
      <Section>
        <Breadcrumbs items={[{ label: t("eyebrow") }]} />
        <p className="mt-10 text-[13px] font-semibold tracking-wide text-teal">{t("eyebrow")}</p>
        <h1 className="mt-3 max-w-[22ch] text-[34px] leading-[1.3] font-bold text-ink sm:text-[44px]">
          {t("title")}
        </h1>
        <p className="mt-5 max-w-[62ch] text-[16px] leading-8 text-muted-foreground">
          {t("intro")}
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <article key={post.slug} className="card-soft flex flex-col p-6">
              <div className="flex items-center justify-between gap-3 text-[12px] text-muted-foreground">
                <span>{getCategoryLabel(post.category, localeTyped)}</span>
                <span className="num">
                  {post.publishedAt} · {post.readMin} {t("minutes")}
                </span>
              </div>
              <h2 className="mt-4 text-[20px] leading-8 font-semibold text-ink">
                <Link href={`/blog/${post.slug}`} className="hover:text-teal">
                  {getPostTitle(post, localeTyped)}
                </Link>
              </h2>
              <p className="mt-3 flex-1 text-[14px] leading-7 text-muted-foreground">
                {getPostExcerpt(post, localeTyped)}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-5 text-[13.5px] font-semibold text-ink"
              >
                {t("readArticle")}
              </Link>
            </article>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
