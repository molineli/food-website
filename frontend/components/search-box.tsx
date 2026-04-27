const hotSearchTerms = [
  "隔夜菜",
  "食品添加剂",
  "配料表",
  "0糖饮料",
  "亚硝酸盐",
  "生熟分开",
];

export function SearchBox() {
  return (
    <div className="mx-auto mt-10 w-full max-w-2xl">
      <div className="flex w-full flex-col gap-3 rounded-2xl border border-[#dde6d8] bg-[#fffdf7] p-3 shadow-sm sm:flex-row sm:rounded-full">
        <input
          type="search"
          placeholder="搜索食品安全、营养标签、食品添加剂、隔夜菜……"
          className="min-w-0 flex-1 rounded-full bg-white px-5 py-3 text-sm text-[#1f3326] outline-none placeholder:text-[#8a978d] focus:ring-2 focus:ring-[#8fc49a]/40"
          aria-label="搜索食品科普内容"
        />
        <button
          type="button"
          className="rounded-full bg-[#2f6b3c] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#255b31]"
        >
          搜索
        </button>
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {hotSearchTerms.map((term) => (
          <button
            key={term}
            type="button"
            className="rounded-full bg-[#edf4e9] px-3 py-1.5 text-xs font-medium text-[#2f6b3c] transition-colors hover:bg-[#dcebd7]"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}
