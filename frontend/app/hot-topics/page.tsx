import { ArticleCard } from "@/components/article-card";
import { SectionHeader } from "@/components/section-header";
import { getArticlesByCategory } from "@/lib/articles";

export default function HotTopicsPage() {
  const articles = getArticlesByCategory("hot_topics");

  return (
    <main className="flex-1 bg-[#f8f7f0] px-6 py-12 text-[#1f3326] sm:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <SectionHeader
          eyebrow="内容导航"
          title="热点解读"
          description="把食品热点事件拆解为事实、标准、风险、误区和普通人建议。"
        />
        <div className="grid gap-4 md:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              href={`/hot-topics/${article.slug}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
