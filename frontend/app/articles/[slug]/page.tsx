import Image from "next/image";
import { notFound } from "next/navigation";

import { Badge } from "@/components/badge";
import { getArticleBySlug, getAllArticles } from "@/lib/articles";
import {
  getAttentionLevelLabel,
  getContentCategoryLabel,
  getEvidenceLevelLabel,
} from "@/lib/content-labels";

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
          {article.evidenceLevel ? (
            <Badge tone="blue">
              {getEvidenceLevelLabel(article.evidenceLevel)}
            </Badge>
          ) : null}
          {article.attentionLevel ? (
            <Badge tone="amber">
              {getAttentionLevelLabel(article.attentionLevel)}
            </Badge>
          ) : null}
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

        {article.description ? (
          <p className="mt-5 text-base leading-7 text-[#526158]">
            {article.description}
          </p>
        ) : null}

        {article.conclusion ? (
          <p className="mt-6 rounded-xl bg-[#edf4e9] px-4 py-3 text-sm leading-6 text-[#2f6b3c]">
            {article.conclusion}
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        {article.image ? (
          <div className="mt-8 overflow-hidden rounded-2xl border border-[#dde6d8] bg-[#edf4e9]">
            <Image
              src={article.image.src}
              alt={article.image.alt}
              width={960}
              height={540}
              priority
              unoptimized
              className="h-auto w-full object-cover"
            />
          </div>
        ) : null}
      </article>
    </main>
  );
}
