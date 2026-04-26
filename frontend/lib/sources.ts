import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import type { SourceEntry } from "@/types/content";

const sourcesPath = path.join(process.cwd(), "data", "sources.json");

function readSourcesFile(): SourceEntry[] {
  if (!existsSync(sourcesPath)) {
    return [];
  }

  try {
    const data = JSON.parse(readFileSync(sourcesPath, "utf8"));

    if (!Array.isArray(data)) {
      throw new Error("Expected an array");
    }

    return data as SourceEntry[];
  } catch (error) {
    throw new Error(`Failed to read sources data from ${sourcesPath}: ${error}`);
  }
}

/** Reads all local source entries. */
export function getSources(): SourceEntry[] {
  return readSourcesFile();
}

/** Finds one source entry by id. */
export function getSourceById(id: string): SourceEntry | undefined {
  return getSources().find((source) => source.id === id);
}

/** Resolves source ids into source entries, preserving the requested order. */
export function getSourcesByIds(ids: string[]): SourceEntry[] {
  const sources = getSources();

  return ids
    .map((id) => sources.find((source) => source.id === id))
    .filter((source): source is SourceEntry => Boolean(source));
}
