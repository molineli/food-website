import { SearchBox } from "@/components/search-box";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center bg-[#f8f7f0] px-6 py-16 text-[#1f3326]">
      <section className="mx-auto w-full max-w-3xl text-center">
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
      </section>
    </main>
  );
}
