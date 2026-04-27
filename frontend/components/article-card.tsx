import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/badge";
import {
  getAttentionLevelLabel,
  getContentCategoryLabel,
  getEvidenceLevelLabel,
} from "@/lib/content-labels";
import type { ArticleContent } from "@/types/content";

type ArticleCardProps = {
  article: ArticleContent;
  href?: string;
};

export function ArticleCard({ article, href }: ArticleCardProps) {
  const articleHref = href ?? `/articles/${article.slug}`;
  return (
    <Link
      href={articleHref}
      className="group block rounded-2xl border border-[#dde6d8] bg-[#fffdf7]/90 p-5 shadow-sm transition-all duration-200 ease-out hover:-translate-y-1.5 hover:border-[#8fc49a] hover:bg-white hover:shadow-xl hover:shadow-[#1f3326]/10"
    >
      {article.image ? (
        <div className="mb-5 aspect-video overflow-hidden rounded-xl bg-[#edf4e9]">
          <Image
            src={article.image.src}
            alt={article.image.alt}
            width={640}
            height={360}
            unoptimized
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
        </div>
      ) : null}
      <div className="mb-3 flex flex-wrap gap-2">
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
      <h3 className="text-lg font-semibold tracking-normal text-[#1f3326] transition-colors group-hover:text-[#2f6b3c]">
        {article.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-[#526158]">
        {article.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
      {article.updatedAt ? (
        <p className="mt-4 text-xs text-[#6f7c72]">更新于 {article.updatedAt}</p>
      ) : null}
    </Link>
  );
}
