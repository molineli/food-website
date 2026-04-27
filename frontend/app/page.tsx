import { FeaturedArticle } from "@/components/featured-article";
import { SearchBox } from "@/components/search-box";
import { getTodayHotTopicArticle } from "@/lib/articles";

export default function Home() {
  const todayHotTopic = getTodayHotTopicArticle();

  return (
    <main className="flex-1 bg-[#f8f7f0] text-[#1f3326]">
      <section className="px-6 py-16 sm:px-8">
        <div className="mx-auto w-full max-w-3xl text-center">
          <p className="mb-4 text-sm font-medium text-[#4f7f58]">
            食品科学科普平台
          </p>
          <h1 className="text-4xl font-semibold tracking-normal sm:text-5xl">
            食识堂
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#526158]">
            面向普通消费者，帮助用户看懂食品安全、食品营养、食品标签与食品热点。
          </p>
          <SearchBox />
        </div>
      </section>

      {todayHotTopic ? (
        <section className="px-6 pb-16 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="mb-5 text-sm font-medium text-[#4f7f58]">
              今日热点解读
            </p>
            <FeaturedArticle
              article={todayHotTopic}
              href={`/articles/${todayHotTopic.slug}`}
            />
          </div>
        </section>
      ) : null}
    </main>
  );
}
