import { ArticleCard } from "@/components/article-card";
import { SectionHeader } from "@/components/section-header";
import { getArticlesByCategory } from "@/lib/articles";

export default function SafetyPage() {
  const articles = getArticlesByCategory("food_safety");

  return (
    <main className="flex-1 bg-[#f8f7f0] px-6 py-12 text-[#1f3326] sm:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <SectionHeader
          eyebrow="内容导航"
          title="食品安全"
          description="解释食品安全风险从哪里来、风险有多大，以及普通人如何降低风险。"
        />
        <div className="grid gap-4 md:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              href={`/safety/${article.slug}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
