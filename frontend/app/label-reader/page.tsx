import Image from "next/image";

import { Badge } from "@/components/badge";
import { SectionHeader } from "@/components/section-header";
import { getLabelCases } from "@/lib/labelCases";

export default function LabelReaderPage() {
  const labelCases = getLabelCases();

  return (
    <main className="flex-1 bg-[#f8f7f0] px-6 py-12 text-[#1f3326] sm:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <SectionHeader
          title="标签识读"
          description="帮助用户读懂配料表、营养成分表、营养宣称和常见营销词。"
        />
        <div className="grid gap-4 md:grid-cols-2">
          {labelCases.map((labelCase) => (
            <article
              key={labelCase.slug}
              className="group rounded-2xl border border-[#dde6d8] bg-[#fffdf7]/90 p-5 shadow-sm transition-all duration-200 ease-out hover:-translate-y-1.5 hover:border-[#8fc49a] hover:bg-white hover:shadow-xl hover:shadow-[#1f3326]/10"
            >
              {labelCase.image ? (
                <div className="mb-5 aspect-video overflow-hidden rounded-xl bg-[#edf4e9]">
                  <Image
                    src={labelCase.image.src}
                    alt={labelCase.image.alt}
                    width={640}
                    height={360}
                    unoptimized
                    className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                </div>
              ) : null}
              <h3 className="text-lg font-semibold tracking-normal text-[#1f3326]">
                {labelCase.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#526158]">
                {labelCase.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {labelCase.regions.map((region) => (
                  <Badge key={region.id} tone="green">
                    {region.label}
                  </Badge>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
