import Link from "next/link";

import { Badge } from "@/components/badge";
import { getContentCategoryLabel } from "@/lib/content-labels";
import type { ArticleContent } from "@/types/content";

type CompactArticleItemProps = {
  article: ArticleContent;
  href: string;
};

export function CompactArticleItem({ article, href }: CompactArticleItemProps) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-[#dde6d8] bg-[#fffdf7]/95 p-5 shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:border-[#8fc49a] hover:bg-white hover:shadow-lg hover:shadow-[#1f3326]/10"
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Badge tone="green">{getContentCategoryLabel(article.category)}</Badge>
        {article.updatedAt ? (
          <span className="text-xs text-[#6f7c72]">更新于 {article.updatedAt}</span>
        ) : null}
      </div>
      <h3 className="text-base font-semibold tracking-normal text-[#1f3326] transition-colors group-hover:text-[#2f6b3c]">
        {article.title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-[#526158]">
        {article.summary ?? article.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {article.tags.slice(0, 2).map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
    </Link>
  );
}
