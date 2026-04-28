import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/badge";
import { MythStoryScenes } from "@/components/myth-story-scenes";
import {
  getAttentionLevelLabel,
  getEvidenceLevelLabel,
  getMythVerdictLabel,
} from "@/lib/content-labels";
import { getMythBySlug, getMyths, getMythStoryImages } from "@/lib/myths";

type MythShowcasePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getMyths().map((myth) => ({
    slug: myth.slug,
  }));
}

export async function generateMetadata({
  params,
}: MythShowcasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const myth = getMythBySlug(slug);

  if (!myth) {
    return {
      title: "谣言展示内容不存在 | 食品科普",
    };
  }

  return {
    title: `${myth.title} 展示模式 | 食品科普`,
    description: myth.description,
    openGraph: myth.image
      ? {
          title: `${myth.title} 展示模式`,
          description: myth.description,
          images: [
            {
              url: myth.image.src,
              alt: myth.image.alt,
            },
          ],
        }
      : undefined,
  };
}

export default async function MythShowcasePage({
  params,
}: MythShowcasePageProps) {
  const { slug } = await params;
  const myth = getMythBySlug(slug);

  if (!myth) {
    notFound();
  }

  const storyImages = getMythStoryImages(slug);

  return (
    <main className="flex-1 bg-[#f8f7f0] px-6 py-12 text-[#1f3326] sm:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        <Link
          href="/myths"
          className="inline-flex items-center rounded-full border border-[#cfe3c9] bg-[#fffdf7] px-4 py-2 text-sm font-medium text-[#2f6b3c] transition-colors hover:bg-[#edf4e9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f6b3c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8f7f0]"
        >
          返回谣言澄清
        </Link>

        <section className="grid gap-8 rounded-2xl border border-[#dde6d8] bg-[#fffdf7] p-5 shadow-sm lg:grid-cols-[1fr_0.9fr] lg:p-8">
          <div className="flex flex-col justify-center">
            <div className="mb-5 flex flex-wrap gap-2">
              <Badge tone="amber">{getMythVerdictLabel(myth.verdict)}</Badge>
              {myth.evidenceLevel ? (
                <Badge tone="blue">
                  {getEvidenceLevelLabel(myth.evidenceLevel)}
                </Badge>
              ) : null}
              {myth.attentionLevel ? (
                <Badge tone="green">
                  {getAttentionLevelLabel(myth.attentionLevel)}
                </Badge>
              ) : null}
              {myth.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            <p className="text-sm font-medium text-[#4f7f58]">展示模式</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-normal sm:text-4xl">
              {myth.title}
            </h1>
            <p className="mt-5 text-lg font-semibold leading-8 text-[#1f3326]">
              {myth.claim}
            </p>
            <p className="mt-4 text-base leading-7 text-[#526158]">
              {myth.description}
            </p>
          </div>

          {myth.image ? (
            <div className="overflow-hidden rounded-2xl border border-[#dde6d8] bg-[#edf4e9]">
              <Image
                src={myth.image.src}
                alt={myth.image.alt}
                width={960}
                height={540}
                priority
                unoptimized
                className="h-full min-h-[260px] w-full object-cover"
              />
            </div>
          ) : (
            <div className="flex min-h-[260px] items-center justify-center rounded-2xl border border-[#dde6d8] bg-[#edf4e9] px-6 text-sm font-medium text-[#526158]">
              封面图待补充
            </div>
          )}
        </section>

        <section>
          <div className="mb-6 max-w-3xl">
            <p className="text-sm font-medium text-[#4f7f58]">Story Scenes</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">
              分镜式科学解读
            </h2>
            <p className="mt-3 text-base leading-7 text-[#526158]">
              通过图片和解说逐步理解这个食品说法为什么需要谨慎判断。
            </p>
          </div>
          <MythStoryScenes
            scenes={myth.storyScenes ?? []}
            images={storyImages}
            fallbackImage={myth.image}
            fallbackExplanation={myth.explanation}
            fallbackAdvice={myth.consumerAdvice}
          />
        </section>
      </div>
    </main>
  );
}
