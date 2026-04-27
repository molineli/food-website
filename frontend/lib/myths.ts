import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import type { MythCard } from "@/types/content";

const mythsPath = path.join(process.cwd(), "data", "myths.json");

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
