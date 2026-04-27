import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/badge";
import { getContentCategoryLabel } from "@/lib/content-labels";
import type { ArticleContent } from "@/types/content";

type FeaturedArticleProps = {
  article: ArticleContent;
  href: string;
};

export function FeaturedArticle({ article, href }: FeaturedArticleProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-[#dde6d8] bg-[#fffdf7]/95 shadow-sm transition-all duration-200 ease-out hover:-translate-y-1.5 hover:border-[#8fc49a] hover:bg-white hover:shadow-xl hover:shadow-[#1f3326]/10">
      <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
        {article.image ? (
          <div className="aspect-video overflow-hidden bg-[#edf4e9] lg:aspect-auto">
            <Image
              src={article.image.src}
              alt={article.image.alt}
              width={720}
              height={480}
              unoptimized
              className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
            />
          </div>
        ) : null}
        <div className="flex flex-col justify-center p-6 sm:p-8">
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge tone="green">{getContentCategoryLabel(article.category)}</Badge>
            {article.updatedAt ? (
              <Badge tone="gray">更新于 {article.updatedAt}</Badge>
            ) : null}
          </div>
          <h2 className="text-2xl font-semibold tracking-normal text-[#1f3326] sm:text-3xl">
            {article.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-[#526158]">
            {article.summary ?? article.description}
          </p>
          {article.conclusion ? (
            <p className="mt-5 rounded-xl bg-[#edf4e9] px-4 py-3 text-sm leading-6 text-[#2f6b3c]">
              {article.conclusion}
            </p>
          ) : null}
          <Link
            href={href}
            className="mt-6 inline-flex w-fit items-center rounded-full bg-[#2f6b3c] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#255b31]"
          >
            查看解读
          </Link>
        </div>
      </div>
    </article>
  );
}
