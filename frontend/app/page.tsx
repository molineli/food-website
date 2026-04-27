import { CategoryEntryCard } from "@/components/category-entry-card";
import { CompactArticleItem } from "@/components/compact-article-item";
import { FeaturedArticle } from "@/components/featured-article";
import { FeaturedArticleCard } from "@/components/featured-article-card";
import { MythCarousel } from "@/components/myth-carousel";
import { SectionHeader } from "@/components/section-header";
import { SearchBox } from "@/components/search-box";
import { getLatestArticles, getTodayHotTopicArticle } from "@/lib/articles";
import { getHotMyths } from "@/lib/myths";

const categoryEntries = [
  {
    title: "食品安全",
    description: "看懂风险来源、风险大小和日常避险方法",
    href: "/safety",
    marker: "安",
  },
  {
    title: "食品营养",
    description: "了解营养标签、膳食结构和常见营养误区",
    href: "/nutrition",
    marker: "养",
  },
  {
    title: "热点解读",
    description: "解释食品热点事件背后的科学问题",
    href: "/hot-topics",
    marker: "热",
  },
  {
    title: "标签识读",
    description: "学会看配料表、营养成分表和食品宣称",
    href: "/label-reader",
    marker: "签",
  },
  {
    title: "谣言澄清",
    description: "用证据判断网传食品说法是否可靠",
    href: "/myths",
    marker: "辨",
  },
];

export default function Home() {
  const todayHotTopic = getTodayHotTopicArticle();
  const hotMyths = getHotMyths(3);
  const latestArticles = getLatestArticles(4);
  const [featuredLatestArticle, ...compactLatestArticles] = latestArticles;

  return (
    <main className="flex-1 bg-[#f8f7f0] text-[#1f3326]">
      <section className="px-6 pb-14 pt-10 sm:px-8 sm:pt-12">
        <div className="mx-auto w-full max-w-3xl text-center">
          <p className="text-lg leading-8 text-[#526158]">
            面向普通消费者，帮助用户看懂食品安全、食品营养、食品标签与食品热点
          </p>
          <SearchBox />
        </div>
      </section>

      {todayHotTopic ? (
        <section className="px-6 pb-16 sm:px-8">
          <div className="mx-auto max-w-6xl space-y-6">
            <SectionHeader
              title="今日热点解读"
              description="聚焦近期常见食品话题，用证据解释问题本质。"
            />
            <FeaturedArticle
              article={todayHotTopic}
              href={`/articles/${todayHotTopic.slug}`}
            />
          </div>
        </section>
      ) : null}

      <section className="px-6 pb-16 sm:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <SectionHeader
            title="热门谣言澄清"
            description="拆解常见食品说法，帮助你区分事实、误导和证据不足。"
          />
          <MythCarousel myths={hotMyths} />
        </div>
      </section>

      {featuredLatestArticle ? (
        <section className="px-6 pb-16 sm:px-8">
          <div className="mx-auto max-w-6xl space-y-6">
            <SectionHeader
              title="最新科普文章"
              description="持续更新食品安全、营养、标签与热点解读内容。"
            />
            <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <FeaturedArticleCard
                article={featuredLatestArticle}
                href={`/articles/${featuredLatestArticle.slug}`}
              />
              <div className="grid gap-4">
                {compactLatestArticles.map((article) => (
                  <CompactArticleItem
                    key={article.slug}
                    article={article}
                    href={`/articles/${article.slug}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-6 pb-16 sm:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <SectionHeader
            title="按主题探索食品知识"
            description="围绕安全、营养、标签、热点与谣言澄清，快速进入你关心的内容。"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categoryEntries.map((entry) => (
              <CategoryEntryCard
                key={entry.href}
                title={entry.title}
                description={entry.description}
                href={entry.href}
                marker={entry.marker}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
