import { Badge } from "@/components/badge";
import { getMythVerdictLabel } from "@/lib/content-labels";
import type { MythCard as MythCardContent } from "@/types/content";

type MythCardProps = {
  myth: MythCardContent;
};

export function MythCard({ myth }: MythCardProps) {
  return (
    <article className="rounded-lg border border-[#dde6d8] bg-[#fffdf7] p-5 shadow-sm">
      <div className="mb-3 flex flex-wrap gap-2">
        <Badge tone="amber">{getMythVerdictLabel(myth.verdict)}</Badge>
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
