type ArticleBodyProps = {
  content?: string;
};

export function ArticleBody({ content }: ArticleBodyProps) {
  const paragraphs = content
    ?.split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (!paragraphs?.length) {
    return null;
  }

  return (
    <div className="space-y-5 text-base leading-8 text-[#526158]">
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}
