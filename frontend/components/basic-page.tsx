type BasicPageProps = {
  title: string;
  description: string;
  eyebrow?: string;
};

export function BasicPage({
  title,
  description,
  eyebrow = "食品科学科普平台",
}: BasicPageProps) {
  return (
    <main className="flex flex-1 items-center justify-center bg-[#f8f7f0] px-6 py-16 text-[#1f3326]">
      <section className="mx-auto max-w-3xl text-center">
        <p className="mb-4 text-sm font-medium text-[#4f7f58]">{eyebrow}</p>
        <h1 className="text-4xl font-semibold tracking-normal sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 text-lg leading-8 text-[#526158]">
          {description}
        </p>
      </section>
    </main>
  );
}
