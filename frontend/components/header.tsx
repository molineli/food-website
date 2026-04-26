"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/safety", label: "食品安全" },
  { href: "/nutrition", label: "食品营养" },
  { href: "/hot-topics", label: "热点解读" },
  { href: "/label-reader", label: "标签识读" },
  { href: "/myths", label: "谣言澄清" },
  { href: "/about", label: "关于我们" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-[#dde6d8] bg-[#fffdf7]/95 text-[#1f3326]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <Link
          href="/"
          className="text-xl font-semibold tracking-normal text-[#2f6b3c]"
        >
          食识堂
        </Link>
        <nav aria-label="主导航">
          <ul className="flex flex-wrap gap-2 text-sm font-medium">
            {navItems.map((item) => {
              const active = isActivePath(pathname, item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "block rounded-full px-3 py-2 transition-colors",
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
        </nav>
      </div>
    </header>
  );
}
