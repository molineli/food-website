import Image from "next/image";

import { Badge } from "@/components/badge";
import {
  getAttentionLevelLabel,
  getEvidenceLevelLabel,
  getMythVerdictLabel,
} from "@/lib/content-labels";
import type { MythCard as MythCardContent } from "@/types/content";

type MythCardProps = {
  myth: MythCardContent;
};

export function MythCard({ myth }: MythCardProps) {
  return (
    <article className="group rounded-2xl border border-[#dde6d8] bg-[#fffdf7]/90 p-5 shadow-sm transition-all duration-200 ease-out hover:-translate-y-1.5 hover:border-[#8fc49a] hover:bg-white hover:shadow-xl hover:shadow-[#1f3326]/10">
      {myth.image ? (
        <div className="mb-5 aspect-video overflow-hidden rounded-xl bg-[#edf4e9]">
          <Image
            src={myth.image.src}
            alt={myth.image.alt}
            width={640}
            height={360}
            unoptimized
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
        </div>
      ) : null}
      <div className="mb-3 flex flex-wrap gap-2">
        <Badge tone="amber">{getMythVerdictLabel(myth.verdict)}</Badge>
        {myth.evidenceLevel ? (
          <Badge tone="blue">{getEvidenceLevelLabel(myth.evidenceLevel)}</Badge>
        ) : null}
        {myth.attentionLevel ? (
          <Badge tone="green">{getAttentionLevelLabel(myth.attentionLevel)}</Badge>
        ) : null}
        {myth.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
      <h3 className="text-lg font-semibold tracking-normal text-[#1f3326]">
        {myth.claim}
      </h3>
      <p className="mt-3 text-sm leading-6 text-[#526158]">{myth.explanation}</p>
      {myth.consumerAdvice ? (
        <div className="mt-4 rounded-md bg-[#edf4e9] px-4 py-3 text-sm leading-6 text-[#2f6b3c]">
          {myth.consumerAdvice}
        </div>
      ) : null}
    </article>
  );
}
