import { ArticleCard } from "@/components/article-card";
import { SectionHeader } from "@/components/section-header";
import { getArticlesByCategory } from "@/lib/articles";

export default function NutritionPage() {
  const articles = getArticlesByCategory("nutrition");

  return (
    <main className="flex-1 bg-[#f8f7f0] px-6 py-12 text-[#1f3326] sm:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <SectionHeader
          eyebrow="内容导航"
          title="食品营养"
          description="用食品科学和膳食指南解释日常饮食选择，避免夸大和医疗化表达。"
        />
        <div className="grid gap-4 md:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </main>
  );
}
