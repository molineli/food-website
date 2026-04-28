import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

import type { MythCard } from "@/types/content";

const mythsPath = path.join(process.cwd(), "data", "myths.json");
const mythClarificationImagesRoot = path.join(
  process.cwd(),
  "public",
  "images",
  "myth_clarification",
);
const supportedStoryImageExtensions = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".svg",
]);

export type MythStoryImage = {
  src: string;
  alt: string;
  order: number;
};

function loadMythsFromJson(): MythCard[] {
  if (!existsSync(mythsPath)) {
    return [];
  }

  try {
    const data = JSON.parse(readFileSync(mythsPath, "utf8"));

    if (!Array.isArray(data)) {
      throw new Error("Expected an array");
    }

    return data as MythCard[];
  } catch (error) {
    throw new Error(`Failed to read myths data from ${mythsPath}: ${error}`);
  }
}

/** Reads all local myth clarification cards. */
export function getMyths(): MythCard[] {
  return loadMythsFromJson();
}

/** Finds one myth clarification card by slug. */
export function getMythBySlug(slug: string): MythCard | undefined {
  return getMyths().find((myth) => myth.slug === slug);
}

/** Returns the first local myth cards for homepage hot myth clarification. */
export function getHotMyths(limit: number): MythCard[] {
  return getMyths().slice(0, limit);
}

/** Reads numeric story images for one myth and sorts them by numeric filename. */
export function getMythStoryImages(slug: string): MythStoryImage[] {
  const directoryPath = path.join(mythClarificationImagesRoot, slug);

  if (!existsSync(directoryPath)) {
    return [];
  }

  return readdirSync(directoryPath, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => {
      const extension = path.extname(entry.name).toLowerCase();
      const basename = path.basename(entry.name, extension);
      const order = Number.parseInt(basename, 10);

      if (
        !supportedStoryImageExtensions.has(extension) ||
        !/^\d+$/.test(basename)
      ) {
        return undefined;
      }

      return {
        src: `/images/myth_clarification/${slug}/${entry.name}`,
        alt: `谣言澄清展示图 ${order}`,
        order,
      };
    })
    .filter((image): image is MythStoryImage => Boolean(image))
    .sort((first, second) => first.order - second.order);
}
