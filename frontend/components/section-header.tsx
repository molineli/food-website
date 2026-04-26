type SectionHeaderProps = {
  title: string;
  description?: string;
  eyebrow?: string;
};

export function SectionHeader({
  title,
  description,
  eyebrow,
}: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="mb-2 text-sm font-medium text-[#4f7f58]">{eyebrow}</p>
      ) : null}
      <h2 className="text-2xl font-semibold tracking-normal text-[#1f3326] sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-base leading-7 text-[#526158]">{description}</p>
      ) : null}
    </div>
  );
}
