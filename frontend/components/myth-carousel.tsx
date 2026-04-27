"use client";

import { useEffect, useMemo, useState } from "react";

import { MythCard } from "@/components/myth-card";
import type { MythCard as MythCardContent } from "@/types/content";

type MythCarouselProps = {
  myths: MythCardContent[];
  intervalMs?: number;
};

type CarouselPosition = "center" | "left" | "right";

const positionClasses: Record<CarouselPosition, string> = {
  center: "left-1/2 z-30 -translate-x-1/2 scale-100 opacity-100",
  left: "left-[18%] z-20 -translate-x-1/2 scale-[0.88] opacity-70",
  right: "left-[82%] z-20 -translate-x-1/2 scale-[0.88] opacity-70",
};

function getPosition(index: number, activeIndex: number): CarouselPosition {
  if (index === activeIndex) {
    return "center";
  }

  if (index === (activeIndex + 1) % 3) {
    return "right";
  }

  return "left";
}

export function MythCarousel({
  myths,
  intervalMs = 6000,
}: MythCarouselProps) {
  const visibleMyths = useMemo(() => myths.slice(0, 3), [myths]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldRotate = visibleMyths.length >= 3;

  useEffect(() => {
    if (!shouldRotate || isPaused) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % visibleMyths.length);
    }, intervalMs);

    return () => window.clearInterval(intervalId);
  }, [intervalMs, isPaused, shouldRotate, visibleMyths.length]);

  if (!shouldRotate) {
    return (
      <div className="grid gap-5 md:grid-cols-3">
        {visibleMyths.map((myth) => (
          <MythCard key={myth.slug} myth={myth} />
        ))}
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="grid gap-5 md:hidden">
        {visibleMyths.map((myth) => (
          <MythCard key={myth.slug} myth={myth} />
        ))}
      </div>

      <div className="relative mx-auto hidden min-h-[550px] overflow-hidden md:block">
        {visibleMyths.map((myth, index) => {
          const position = getPosition(index, activeIndex);

          return (
            <div
              key={myth.slug}
              className={[
                "absolute top-0 w-[42%] cursor-pointer transition-all duration-700 ease-in-out",
                positionClasses[position],
              ].join(" ")}
              onClick={() => {
                if (position !== "center") {
                  setActiveIndex(index);
                }
              }}
            >
              <MythCard myth={myth} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
