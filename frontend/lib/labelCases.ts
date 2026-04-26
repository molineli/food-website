import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import type { LabelCase } from "@/types/content";

const labelCasesPath = path.join(process.cwd(), "data", "label_cases.json");

function readLabelCasesFile(): LabelCase[] {
  if (!existsSync(labelCasesPath)) {
    return [];
  }

  try {
    const data = JSON.parse(readFileSync(labelCasesPath, "utf8"));

    if (!Array.isArray(data)) {
      throw new Error("Expected an array");
    }

    return data as LabelCase[];
  } catch (error) {
    throw new Error(
      `Failed to read label case data from ${labelCasesPath}: ${error}`,
    );
  }
}

/** Reads all local label reading cases. */
export function getLabelCases(): LabelCase[] {
  return readLabelCasesFile();
}

/** Finds one label reading case by slug. */
export function getLabelCaseBySlug(slug: string): LabelCase | undefined {
  return getLabelCases().find((labelCase) => labelCase.slug === slug);
}
