"use client";

import Image from "next/image";
import { useState } from "react";

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
  const [isFlipped, setIsFlipped] = useState(false);
  const summary = myth.description || myth.title;
  const faceClasses =
    "absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-[#dde6d8] bg-[#fffdf7] p-5 shadow-sm transition-all duration-200 ease-out [backface-visibility:hidden] [-webkit-backface-visibility:hidden] group-hover:border-[#8fc49a] group-hover:shadow-xl group-hover:shadow-[#1f3326]/10";

  return (
    <article
      className="group h-[420px] [perspective:1200px] transition-transform duration-200 ease-out hover:-translate-y-1.5"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onFocus={() => setIsFlipped(true)}
      onBlur={() => setIsFlipped(false)}
    >
      <button
        type="button"
        aria-label={`${myth.claim}，查看科学解释和普通人建议`}
        className="relative h-full w-full rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-[#2f6b3c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8f7f0]"
      >
        <div
          className="absolute inset-0 rounded-2xl transition-transform duration-500 [transform-style:preserve-3d]"
          style={{
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          <div className={faceClasses}>
            {myth.image ? (
              <div className="mb-4 aspect-video shrink-0 overflow-hidden rounded-xl bg-[#edf4e9]">
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
            <h3 className="text-xl font-semibold leading-snug tracking-normal text-[#1f3326]">
              {myth.claim}
            </h3>
          </div>

          <div
            className={`${faceClasses} overflow-y-auto [transform:rotateY(180deg)]`}
          >
            <h3 className="text-lg font-semibold leading-snug tracking-normal text-[#1f3326]">
              科学解释是怎样的呢？
            </h3>
            <p className="mt-4 text-sm leading-7 text-[#526158]">
              {myth.explanation}
            </p>
            {myth.consumerAdvice ? (
              <div className="mt-5 rounded-md bg-[#edf4e9] px-4 py-3 text-sm font-medium leading-7 text-[#2f6b3c]">
                {myth.consumerAdvice}
              </div>
            ) : null}
          </div>
        </div>
      </button>
    </article>
  );
}
