import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/vcfo/page-shell";
import { Section, useT } from "@/components/vcfo/lang";
import { blogPosts, getPost } from "@/lib/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) return {};
    return {
      meta: [
        { title: `${post.titleAr} | VCFO` },
        { name: "description", content: post.excerptAr },
        { property: "og:title", content: `${post.titleAr} | VCFO` },
        { property: "og:description", content: post.excerptAr },
        { property: "og:url", content: `https://vcfo-ai.com/blog/${post.slug}` },
      ],
      links: [{ rel: "canonical", href: `https://vcfo-ai.com/blog/${post.slug}` }],
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const t = useT();
  const body = t(post.titleAr, post.titleEn) === post.titleEn ? post.bodyEn : post.bodyAr;

  return (
    <PageShell>
      <Section>
        <Link to="/blog" className="text-[13px] font-semibold text-teal">
          {t("← كل المقالات", "← All articles")}
        </Link>
        <p className="mt-6 text-[12.5px] text-muted-foreground">
          {t(post.categoryAr, post.categoryEn)} · {post.date} · {post.readMin} {t("دقائق قراءة", "min read")}
        </p>
        <h1 className="mt-3 max-w-[22ch] text-[32px] leading-[1.35] font-bold text-ink sm:text-[42px]">
          {t(post.titleAr, post.titleEn)}
        </h1>
        <p className="mt-5 max-w-[66ch] text-[17px] leading-8 text-muted-foreground">
          {t(post.excerptAr, post.excerptEn)}
        </p>

        <div className="mt-10 max-w-[68ch] space-y-6">
          {body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="text-[16px] leading-8 text-ink/85">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-14 border-t border-hairline pt-8">
          <p className="text-[13px] font-semibold text-muted-foreground">
            {t("مقالات أخرى", "More articles")}
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {blogPosts
              .filter((item) => item.slug !== post.slug)
              .slice(0, 2)
              .map((item) => (
                <Link
                  key={item.slug}
                  to="/blog/$slug"
                  params={{ slug: item.slug }}
                  className="card-soft p-5 transition-colors hover:bg-surface-2"
                >
                  <span className="text-[12px] text-muted-foreground">
                    {t(item.categoryAr, item.categoryEn)}
                  </span>
                  <span className="mt-2 block text-[15px] font-semibold text-ink">
                    {t(item.titleAr, item.titleEn)}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
