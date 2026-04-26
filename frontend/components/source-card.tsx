import type { SourceEntry } from "@/types/content";

type SourceCardProps = {
  source: SourceEntry;
  typeLabel?: string;
};

export function SourceCard({ source, typeLabel }: SourceCardProps) {
  return (
    <article className="rounded-lg border border-[#dde6d8] bg-[#fffdf7] p-5 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-base font-semibold tracking-normal text-[#1f3326]">
            {source.title}
          </h3>
          <p className="mt-1 text-sm text-[#526158]">
            {typeLabel ?? source.publisher ?? "权威来源"}
          </p>
        </div>
        {source.url ? (
          <a
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-[#2f6b3c] hover:text-[#1f3326]"
          >
            查看来源
          </a>
        ) : null}
      </div>
      {source.note ? (
        <p className="mt-4 text-sm leading-6 text-[#526158]">{source.note}</p>
      ) : null}
    </article>
  );
}
