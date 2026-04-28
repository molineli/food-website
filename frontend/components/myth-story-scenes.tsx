"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import type { MythStoryImage } from "@/lib/myths";
import type { ContentImage, StoryScene } from "@/types/content";

type RenderedStoryScene = {
  id: string;
  title: string;
  narration: string;
  image?: ContentImage;
};

type MythStoryScenesProps = {
  scenes: StoryScene[];
  images: MythStoryImage[];
  fallbackImage?: ContentImage;
  fallbackExplanation: string;
  fallbackAdvice?: string;
};

function buildRenderedScenes({
  scenes,
  images,
  fallbackImage,
  fallbackExplanation,
  fallbackAdvice,
}: MythStoryScenesProps): RenderedStoryScene[] {
  const sceneCount = Math.max(scenes.length, images.length, 1);

  return Array.from({ length: sceneCount }, (_, index) => {
    const scene = scenes[index];
    const image = images[index];
    const fallbackNarration =
      index === sceneCount - 1 && fallbackAdvice
        ? fallbackAdvice
        : fallbackExplanation;

    return {
      id: scene?.id ?? `scene-${index + 1}`,
      title: scene?.title ?? `第 ${index + 1} 幕`,
      narration: scene?.narration ?? fallbackNarration,
      image: image
        ? {
            src: image.src,
            alt: image.alt,
          }
        : fallbackImage,
    };
  });
}

export function MythStoryScenes({
  scenes,
  images,
  fallbackImage,
  fallbackExplanation,
  fallbackAdvice,
}: MythStoryScenesProps) {
  const renderedScenes = useMemo(
    () =>
      buildRenderedScenes({
        scenes,
        images,
        fallbackImage,
        fallbackExplanation,
        fallbackAdvice,
      }),
    [fallbackAdvice, fallbackExplanation, fallbackImage, images, scenes],
  );
  const sceneRefs = useRef<Array<HTMLElement | null>>([]);
  const [visibleSceneIds, setVisibleSceneIds] = useState<Set<string>>(
    () => new Set(),
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const sceneId = entry.target.getAttribute("data-scene-id");

          if (!sceneId) {
            return;
          }

          setVisibleSceneIds((current) => {
            if (current.has(sceneId)) {
              return current;
            }

            const next = new Set(current);
            next.add(sceneId);
            return next;
          });
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.18,
      },
    );

    sceneRefs.current.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [renderedScenes]);

  return (
    <div className="space-y-8">
      {renderedScenes.map((scene, index) => {
        const isVisible = visibleSceneIds.has(scene.id);

        return (
          <section
            key={scene.id}
            ref={(element) => {
              sceneRefs.current[index] = element;
            }}
            data-scene-id={scene.id}
            className={[
              "overflow-hidden rounded-2xl border border-[#dde6d8] bg-[#fffdf7] shadow-sm transition-all duration-700 ease-out",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0",
            ].join(" ")}
          >
            {scene.image ? (
              <div className="aspect-[16/9] bg-[#edf4e9]">
                <Image
                  src={scene.image.src}
                  alt={scene.image.alt}
                  width={1280}
                  height={720}
                  priority={index === 0}
                  unoptimized
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="flex aspect-[16/9] items-center justify-center bg-[#edf4e9] px-6 text-sm font-medium text-[#526158]">
                展示图片待补充
              </div>
            )}
            <div className="p-5 sm:p-6">
              <p className="text-sm font-medium text-[#4f7f58]">
                Scene {index + 1}
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-normal text-[#1f3326] sm:text-2xl">
                {scene.title}
              </h2>
              <p className="mt-4 text-base leading-8 text-[#526158]">
                {scene.narration}
              </p>
            </div>
          </section>
        );
      })}
    </div>
  );
}
