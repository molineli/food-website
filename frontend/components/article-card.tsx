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
  const title = (
    <h3 className="text-lg font-semibold tracking-normal text-[#1f3326]">
      {article.title}
    </h3>
  );

  return (
    <article className="rounded-lg border border-[#dde6d8] bg-[#fffdf7] p-5 shadow-sm transition-shadow hover:shadow-md">
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
      {href ? (
        <Link href={href} className="hover:text-[#2f6b3c]">
          {title}
        </Link>
      ) : (
        title
      )}
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
    </article>
  );
}
