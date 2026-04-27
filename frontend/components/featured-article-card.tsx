import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/badge";
import {
  getAttentionLevelLabel,
  getContentCategoryLabel,
  getEvidenceLevelLabel,
} from "@/lib/content-labels";
import type { ArticleContent } from "@/types/content";

type FeaturedArticleCardProps = {
  article: ArticleContent;
  href: string;
};

export function FeaturedArticleCard({
  article,
  href,
}: FeaturedArticleCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-[#dde6d8] bg-[#fffdf7]/95 shadow-sm transition-all duration-200 ease-out hover:-translate-y-1.5 hover:border-[#8fc49a] hover:bg-white hover:shadow-xl hover:shadow-[#1f3326]/10">
      {article.image ? (
        <div className="aspect-video overflow-hidden bg-[#edf4e9]">
          <Image
            src={article.image.src}
            alt={article.image.alt}
            width={720}
            height={405}
            unoptimized
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
        </div>
      ) : null}
      <div className="p-6">
        <div className="mb-4 flex flex-wrap gap-2">
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
        </div>
        <h3 className="text-2xl font-semibold tracking-normal text-[#1f3326]">
          {article.title}
        </h3>
        <p className="mt-4 text-sm leading-6 text-[#526158]">
          {article.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {article.tags.slice(0, 3).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {article.updatedAt ? (
            <p className="text-xs text-[#6f7c72]">更新于 {article.updatedAt}</p>
          ) : null}
          <Link
            href={href}
            className="inline-flex w-fit items-center rounded-full bg-[#2f6b3c] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#255b31]"
          >
            阅读文章
          </Link>
        </div>
      </div>
    </article>
  );
}
