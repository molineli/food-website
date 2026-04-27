"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const contentNavItems = [
  { href: "/safety", label: "食品安全" },
  { href: "/nutrition", label: "食品营养" },
  { href: "/hot-topics", label: "热点解读" },
  { href: "/label-reader", label: "标签识读" },
  { href: "/myths", label: "谣言澄清" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const contentNavActive = contentNavItems.some((item) =>
    isActivePath(pathname, item.href),
  );
  const aboutActive = isActivePath(pathname, "/about");

  return (
    <header className="border-b border-[#dde6d8] bg-[#fffdf7]/95 text-[#1f3326]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <Link
          href="/"
          className="flex items-baseline gap-3 text-[#2f6b3c]"
        >
          <span className="text-xl font-semibold tracking-normal">食识堂</span>
          <span className="hidden text-sm font-medium text-[#6f8d75] sm:inline">
            食品科学科普平台
          </span>
        </Link>
        <nav aria-label="主导航">
          <ul className="flex flex-wrap items-center gap-2 text-sm font-medium">
            <li>
              <Link
                href="/"
                aria-current={pathname === "/" ? "page" : undefined}
                className={[
                  "block rounded-full px-3 py-2 transition-colors",
                  pathname === "/"
                    ? "bg-[#2f6b3c] text-white"
                    : "text-[#526158] hover:bg-[#edf4e9] hover:text-[#1f3326]",
                ].join(" ")}
              >
                首页
              </Link>
            </li>
            <li>
              <div className="group relative">
                <button
                  type="button"
                  className={[
                    "flex items-center gap-1 rounded-full px-3 py-2 transition-colors",
                    contentNavActive
                      ? "bg-[#2f6b3c] text-white"
                      : "text-[#526158] hover:bg-[#edf4e9] hover:text-[#1f3326]",
                  ].join(" ")}
                >
                  内容导航
                  <span
                    aria-hidden="true"
                    className="text-xs transition-transform group-hover:rotate-180"
                  >
                    ▼
                  </span>
                </button>
                <div className="invisible absolute left-0 top-full z-20 w-40 translate-y-1 rounded-lg border border-[#dde6d8] bg-[#fffdf7] p-2 opacity-0 shadow-lg transition-all duration-150 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <ul className="space-y-1">
                    {contentNavItems.map((item) => {
                      const active = isActivePath(pathname, item.href);

                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            aria-current={active ? "page" : undefined}
                            className={[
                              "block rounded-md px-3 py-2 transition-colors",
                              active
                                ? "bg-[#2f6b3c] text-white"
                                : "text-[#526158] hover:bg-[#edf4e9] hover:text-[#1f3326]",
                            ].join(" ")}
                          >
                            {item.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <Link
                href="/#category-filter"
                className="block rounded-full px-3 py-2 text-[#526158] transition-colors hover:bg-[#edf4e9] hover:text-[#1f3326]"
              >
                分类筛选
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                aria-current={aboutActive ? "page" : undefined}
                className={[
                  "block rounded-full px-3 py-2 transition-colors",
                  aboutActive
                    ? "bg-[#2f6b3c] text-white"
                    : "text-[#526158] hover:bg-[#edf4e9] hover:text-[#1f3326]",
                ].join(" ")}
              >
                关于我们
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
