import { notFound } from "next/navigation";

import { Badge } from "@/components/badge";
import { getArticleBySlug, getAllArticles } from "@/lib/articles";
import { getContentCategoryLabel } from "@/lib/content-labels";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllArticles().map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="flex-1 bg-[#f8f7f0] px-6 py-12 text-[#1f3326] sm:px-8">
      <article className="mx-auto max-w-3xl">
        <div className="mb-5 flex flex-wrap gap-2">
          <Badge tone="green">{getContentCategoryLabel(article.category)}</Badge>
          {article.updatedAt ? (
            <Badge tone="gray">更新于 {article.updatedAt}</Badge>
          ) : null}
        </div>
        <h1 className="text-3xl font-semibold tracking-normal sm:text-4xl">
          {article.title}
        </h1>
        {article.subtitle ? (
          <p className="mt-4 text-lg leading-8 text-[#526158]">
            {article.subtitle}
          </p>
        ) : null}
        {article.conclusion ? (
          <p className="mt-6 rounded-xl bg-[#edf4e9] px-4 py-3 text-sm leading-6 text-[#2f6b3c]">
            {article.conclusion}
          </p>
        ) : null}
        <div className="mt-8 space-y-5 text-base leading-8 text-[#526158]">
          {(article.content ?? article.description)
            .split(/\n{2,}/)
            .map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
        </div>
      </article>
    </main>
  );
}
