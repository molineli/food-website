import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ArticleBody } from "@/components/article-body";
import { Badge } from "@/components/badge";
import { SourceCard } from "@/components/source-card";
import { getArticleBySlug, getAllArticles } from "@/lib/articles";
import {
  getAttentionLevelLabel,
  getContentCategoryLabel,
  getEvidenceLevelLabel,
} from "@/lib/content-labels";
import { getSourcesByIds } from "@/lib/sources";

const defaultDisclaimer =
  "本站内容仅用于食品科学科普，不替代医生、营养师或监管部门的专业建议。涉及疾病、过敏、特殊膳食或食品安全事件时，请咨询专业人士或以官方信息为准。";

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

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "文章不存在",
    };
  }

  const description = article.description || article.summary;

  return {
    title: article.title,
    description,
    openGraph: article.image
      ? {
          title: article.title,
          description,
          images: [
            {
              url: article.image.src,
              alt: article.image.alt,
            },
          ],
        }
      : undefined,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const sources = getSourcesByIds(article.sourceIds ?? []);

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

        <section className="mt-10">
          <ArticleBody content={article.content} />
        </section>

        {article.mythClarifications?.length ? (
          <section className="mt-10 rounded-2xl border border-[#eadfbf] bg-[#fff8e5] p-6">
            <h2 className="text-xl font-semibold tracking-normal text-[#1f3326]">
              误区澄清
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[#6b5a2a]">
              {article.mythClarifications.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b58a2a]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {article.advice?.length ? (
          <section className="mt-8 rounded-2xl border border-[#dde6d8] bg-[#fffdf7] p-6">
            <h2 className="text-xl font-semibold tracking-normal text-[#1f3326]">
              普通人建议
            </h2>
            <ol className="mt-4 space-y-3 text-sm leading-6 text-[#526158]">
              {article.advice.map((item, index) => (
                <li key={item} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2f6b3c] text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        <section className="mt-10">
          <h2 className="text-xl font-semibold tracking-normal text-[#1f3326]">
            参考来源
          </h2>
          {sources.length > 0 ? (
            <div className="mt-4 space-y-3">
              {sources.map((source) => (
                <SourceCard key={source.id} source={source} />
              ))}
            </div>
          ) : (
            <p className="mt-4 rounded-2xl border border-[#dde6d8] bg-[#fffdf7] p-5 text-sm text-[#526158]">
              暂无可展示的参考来源。
            </p>
          )}
        </section>

        <section className="mt-8 rounded-2xl border border-[#dde6d8] bg-[#f1f1ea] p-5 text-sm leading-6 text-[#526158]">
          <h2 className="text-base font-semibold tracking-normal text-[#1f3326]">
            免责声明
          </h2>
          <p className="mt-2">{article.disclaimer ?? defaultDisclaimer}</p>
        </section>
      </article>
    </main>
  );
}
