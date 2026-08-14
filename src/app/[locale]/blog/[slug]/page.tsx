import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/lib/site";
import { createBlogMetadata } from "@/lib/seo/blog";
import { JsonLd } from "@/components/seo/json-ld";
import { createArticleSchema } from "@/lib/seo/structured-data";
import { PageShell } from "@/components/layout/page-shell";
import { Section } from "@/components/home/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Link } from "@/i18n/navigation";
import {
  blogPosts,
  getPost,
  getCategoryLabel,
  getPostBody,
  getPostDescription,
  getPostExcerpt,
  getPostTitle,
} from "@/content/blog";

type BlogPostPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

/** Every article × every locale is statically generated. */
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    blogPosts.map((post) => ({ locale, slug: post.slug })),
  );
}

/** Fully independent SEO metadata per article and per locale. */
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const localeTyped = locale as Locale;

  return createBlogMetadata(localeTyped, {
    slug: post.slug,
    title: getPostTitle(post, localeTyped),
    description: getPostDescription(post, localeTyped),
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    category: getCategoryLabel(post.category, localeTyped),
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const post = getPost(slug);
  if (!post) notFound();

  const localeTyped = locale as Locale;
  const t = await getTranslations("Blog");
  const title = getPostTitle(post, localeTyped);
  const body = getPostBody(post, localeTyped);
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <PageShell>
      <Section>
        <Breadcrumbs items={[{ label: t("eyebrow"), href: "/blog" }, { label: title }]} />

        <Link href="/blog" className="mt-8 inline-block text-[13px] font-semibold text-teal">
          {t("back")}
        </Link>
        <p className="mt-6 text-[12.5px] text-muted-foreground">
          {getCategoryLabel(post.category, localeTyped)} · {post.publishedAt} · {post.readMin}{" "}
          {t("minRead")}
        </p>
        <h1 className="mt-3 max-w-[22ch] text-[32px] leading-[1.35] font-bold text-ink sm:text-[42px]">
          {title}
        </h1>
        <p className="mt-5 max-w-[66ch] text-[17px] leading-8 text-muted-foreground">
          {getPostExcerpt(post, localeTyped)}
        </p>

        <article className="mt-10 max-w-[68ch] space-y-6">
          {body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="text-[16px] leading-8 text-ink/85">
              {paragraph}
            </p>
          ))}
        </article>

        <aside className="mt-14 border-t border-hairline pt-8">
          <p className="text-[13px] font-semibold text-muted-foreground">{t("moreArticles")}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="card-soft p-5 transition-colors hover:bg-surface-2"
              >
                <span className="text-[12px] text-muted-foreground">
                  {getCategoryLabel(item.category, localeTyped)}
                </span>
                <span className="mt-2 block text-[15px] font-semibold text-ink">
                  {getPostTitle(item, localeTyped)}
                </span>
              </Link>
            ))}
          </div>
        </aside>

        {/* BlogPosting / BreadcrumbList structured data for the article. */}
        <JsonLd
          data={createArticleSchema(localeTyped, {
            slug: post.slug,
            title,
            description: getPostDescription(post, localeTyped),
            publishedAt: post.publishedAt,
            updatedAt: post.updatedAt,
            category: getCategoryLabel(post.category, localeTyped),
          })}
        />
      </Section>
    </PageShell>
  );
}
