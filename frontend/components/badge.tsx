import type { ReactNode } from "react";

type BadgeTone = "green" | "blue" | "amber" | "gray";

type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
};

const toneClasses: Record<BadgeTone, string> = {
  green: "border-[#cfe3c9] bg-[#edf4e9] text-[#2f6b3c]",
  blue: "border-[#c8dee2] bg-[#edf4f6] text-[#2f6470]",
  amber: "border-[#eadfbf] bg-[#f8efd8] text-[#7a5a18]",
  gray: "border-[#deded4] bg-[#f1f1ea] text-[#526158]",
};

export function Badge({ children, tone = "gray" }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium",
        toneClasses[tone],
      ].join(" ")}
    >
      {children}
    </span>
  );
}
