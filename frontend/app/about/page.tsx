import { SectionHeader } from "@/components/section-header";
import { SourceCard } from "@/components/source-card";
import { getSources } from "@/lib/sources";

export default function AboutPage() {
  const sources = getSources();

  return (
    <main className="flex-1 bg-[#f8f7f0] px-6 py-12 text-[#1f3326] sm:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        <SectionHeader
          eyebrow="关于我们"
          title="食品科学科普平台"
          description="本站面向普通消费者，用审慎、清楚、可追溯的方式解释食品安全、食品营养、热点解读、标签识读和谣言澄清内容。"
        />
        <section className="rounded-lg border border-[#dde6d8] bg-[#fffdf7] p-6 shadow-sm">
          <h3 className="text-lg font-semibold tracking-normal text-[#1f3326]">
            内容定位
          </h3>
          <p className="mt-3 text-sm leading-7 text-[#526158]">
            本站不是食品安全决策系统，也不提供个人化风险评分或医疗营养建议。内容会尽量区分科学解释和消费者建议，并对儿童、孕妇、老年人和免疫功能较弱人群使用更保守的表述。
          </p>
        </section>
        <section className="space-y-4">
          <SectionHeader
            title="权威来源说明"
            description="示例内容优先参考国家标准、监管部门资料、专业机构资料和公共卫生机构资料。"
          />
          <div className="grid gap-4 md:grid-cols-2">
            {sources.map((source) => (
              <SourceCard key={source.id} source={source} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
