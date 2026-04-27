import { ArticleCard } from "@/components/article-card";
import { SectionHeader } from "@/components/section-header";
import { getArticlesByCategory } from "@/lib/articles";

export default function SafetyPage() {
  const articles = getArticlesByCategory("safety");

  return (
    <main className="flex-1 bg-[#f8f7f0] px-6 py-12 text-[#1f3326] sm:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            title="食品安全"
            description="解释食品安全风险从哪里来、风险有多大，以及普通人如何降低风险。"
          />
          <p className="text-sm font-medium text-[#4f7f58]">
            共 {articles.length} 篇文章
          </p>
        </div>
        {articles.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-[#dde6d8] bg-[#fffdf7] p-6 text-sm text-[#526158]">
            暂无内容，后续会继续更新。
          </p>
        )}
      </div>
    </main>
  );
}
