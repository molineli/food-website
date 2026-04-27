import Link from "next/link";

type CategoryEntryCardProps = {
  title: string;
  description: string;
  href: string;
  marker: string;
};

export function CategoryEntryCard({
  title,
  description,
  href,
  marker,
}: CategoryEntryCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-[#dde6d8] bg-[#fffdf7]/95 p-5 shadow-sm transition-all duration-200 ease-out hover:-translate-y-1.5 hover:border-[#8fc49a] hover:bg-white hover:shadow-xl hover:shadow-[#1f3326]/10"
    >
      <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#edf4e9] text-sm font-semibold text-[#2f6b3c] transition-colors group-hover:bg-[#2f6b3c] group-hover:text-white">
        {marker}
      </span>
      <h3 className="text-lg font-semibold tracking-normal text-[#1f3326] transition-colors group-hover:text-[#2f6b3c]">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-[#526158]">{description}</p>
    </Link>
  );
}
