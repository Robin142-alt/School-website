import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { notFound } from "next/navigation";

import { buildMetadata } from "@/lib/metadata";
import {
  getAllNewsFromStore,
  getLatestNewsFromStore,
  getNewsBySlugFromStore,
} from "@/lib/repositories/content";
import { formatDate } from "@/lib/utils";

type NewsPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllNewsFromStore();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: NewsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsBySlugFromStore(slug);

  if (!article) {
    return buildMetadata({
      title: "News article | St. Clare's Maragoli Girls School",
      description: "School news article",
    });
  }

  return buildMetadata({
    title: `${article.title} | St. Clare's Maragoli Girls School`,
    description: article.excerpt,
    path: `/news/${article.slug}`,
  });
}

export default async function NewsArticlePage({ params }: NewsPageProps) {
  const { slug } = await params;
  const article = await getNewsBySlugFromStore(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = (await getLatestNewsFromStore(4)).filter(
    (item) => item.slug !== article.slug,
  );

  return (
    <section className="section-shell py-10 sm:py-14">
      <Link
        href="/community"
        className="inline-flex items-center gap-2 text-sm font-semibold text-brand-forest"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to community
      </Link>

      <article className="mt-6 grid gap-10 xl:grid-cols-[1fr_0.4fr]">
        <div className="rounded-[2rem] border border-brand-forest/10 bg-white/84 p-6 sm:p-8">
          <div className="space-y-5">
            <span className="inline-flex rounded-full bg-brand-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-forest">
              {article.category}
            </span>
            <h1 className="font-display max-w-4xl text-4xl leading-tight text-balance text-brand-ink sm:text-5xl lg:text-6xl">
              {article.title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-muted">
              <CalendarDays className="h-4 w-4 text-brand-gold" />
              {formatDate(article.publishedAt)}
            </div>
            <p className="text-lg leading-8 text-muted">{article.excerpt}</p>
          </div>

          <div className="mt-8 space-y-5">
            {article.body.map((paragraph) => (
              <p key={paragraph} className="text-base leading-8 text-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[1.9rem] border border-brand-forest/10 bg-brand-ink p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold">
              Why this matters
            </p>
            <p className="mt-4 text-sm leading-7 text-white/78">
              Every article on the site should either build trust, highlight school life, or make a
              parent&apos;s next step clearer.
            </p>
          </div>

          <div className="rounded-[1.9rem] border border-brand-forest/10 bg-white/84 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-forest">
              Related stories
            </p>
            <div className="mt-5 grid gap-4">
              {relatedArticles.map((item) => (
                <Link
                  key={item.slug}
                  href={`/news/${item.slug}`}
                  className="rounded-[1.4rem] bg-brand-sage/30 px-4 py-4"
                >
                  <p className="text-sm font-semibold text-brand-ink">{item.title}</p>
                  <p className="mt-2 text-sm leading-7 text-muted">{item.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </article>
    </section>
  );
}
