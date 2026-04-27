import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

import type {
  ArticleContent,
  AttentionLevel,
  ContentImage,
  ContentCategory,
  EvidenceLevel,
} from "@/types/content";

const contentRoot = path.join(process.cwd(), "content");
const articleCategories: ContentCategory[] = [
  "food_safety",
  "nutrition",
  "hot_topics",
];

const categoryDirectories: Record<ContentCategory, string> = {
  food_safety: "safety",
  nutrition: "nutrition",
  hot_topics: "hot-topics",
  label_reading: "label-reader",
  myth_busting: "myths",
};

type FrontmatterValue = string | string[] | ContentImage | boolean;
type ArticleMeta = ArticleContent & {
  contentPath: string;
};

function parseFrontmatter(fileContent: string, filePath: string) {
  const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);

  if (!match) {
    throw new Error(`Missing frontmatter in article file: ${filePath}`);
  }

  const meta: Record<string, FrontmatterValue> = {};
  const lines = match[1].split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    if (!line.trim()) {
      continue;
    }

    const keyValueMatch = line.match(/^([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/);

    if (!keyValueMatch) {
      continue;
    }

    const [, key, rawValue] = keyValueMatch;
    const value = rawValue.trim();

    if (value === "") {
      if (
        lines[index + 1]?.startsWith("  ") &&
        !lines[index + 1]?.trimStart().startsWith("- ")
      ) {
        const objectValue: Record<string, string> = {};

        while (lines[index + 1]?.startsWith("  ")) {
          index += 1;

          const nestedMatch = lines[index]
            .trim()
            .match(/^([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/);

          if (nestedMatch) {
            objectValue[nestedMatch[1]] = stripQuotes(nestedMatch[2].trim());
          }
        }

        meta[key] = objectValue as ContentImage;
        continue;
      }

      const list: string[] = [];

      while (lines[index + 1]?.trimStart().startsWith("- ")) {
        index += 1;
        list.push(stripQuotes(lines[index].trimStart().slice(2).trim()));
      }

      meta[key] = list;
      continue;
    }

    meta[key] = parseScalarValue(value);
  }

  return meta;
}

function parseScalarValue(value: string) {
  const normalizedValue = stripQuotes(value);

  if (normalizedValue === "true") {
    return true;
  }

  if (normalizedValue === "false") {
    return false;
  }

  return normalizedValue;
}

function stripQuotes(value: string) {
  return value.replace(/^["']|["']$/g, "");
}

function optionalImage(meta: Record<string, FrontmatterValue>) {
  const image = meta.image;

  if (
    typeof image === "object" &&
    !Array.isArray(image) &&
    typeof image.src === "string" &&
    typeof image.alt === "string"
  ) {
    return image;
  }

  return undefined;
}

function optionalString(meta: Record<string, FrontmatterValue>, key: string) {
  const value = meta[key];

  return typeof value === "string" ? value : undefined;
}

function optionalStringArray(
  meta: Record<string, FrontmatterValue>,
  key: string,
) {
  const value = meta[key];

  return Array.isArray(value) ? value : undefined;
}

function optionalBoolean(meta: Record<string, FrontmatterValue>, key: string) {
  const value = meta[key];

  return typeof value === "boolean" ? value : undefined;
}

function requireString(
  meta: Record<string, FrontmatterValue>,
  key: string,
  filePath: string,
) {
  const value = meta[key];

  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`Missing required frontmatter field "${key}" in ${filePath}`);
  }

  return value;
}

function readArticleFile(filePath: string): ArticleMeta {
  const fileContent = readFileSync(filePath, "utf8");
  const meta = parseFrontmatter(fileContent, filePath);
  const slug = requireString(meta, "slug", filePath);
  const updatedAt = requireString(meta, "updatedAt", filePath);

  return {
    id: slug,
    slug,
    title: requireString(meta, "title", filePath),
    subtitle: optionalString(meta, "subtitle"),
    description: requireString(meta, "description", filePath),
    category: requireString(meta, "category", filePath) as ContentCategory,
    format: "article",
    tags: Array.isArray(meta.tags) ? meta.tags : [],
    evidenceLevel: requireString(meta, "evidenceLevel", filePath) as EvidenceLevel,
    attentionLevel: requireString(
      meta,
      "attentionLevel",
      filePath,
    ) as AttentionLevel,
    publishedAt:
      typeof meta.publishedAt === "string" ? meta.publishedAt : updatedAt,
    updatedAt,
    sourceIds: Array.isArray(meta.sourceIds) ? meta.sourceIds : [],
    image: optionalImage(meta),
    featured: optionalBoolean(meta, "featured"),
    summary: optionalString(meta, "summary"),
    conclusion: optionalString(meta, "conclusion"),
    mythClarifications: optionalStringArray(meta, "mythClarifications"),
    advice: optionalStringArray(meta, "advice"),
    disclaimer: optionalString(meta, "disclaimer"),
    contentPath: filePath,
  };
}

/** Reads all local MDX article metadata from the content directory. */
export function getArticles(): ArticleMeta[] {
  if (!existsSync(contentRoot)) {
    return [];
  }

  return articleCategories.flatMap((category) => getArticlesByCategory(category));
}

/** Reads local MDX article metadata for one content category. */
export function getArticlesByCategory(category: ContentCategory): ArticleMeta[] {
  const directoryName = categoryDirectories[category];
  const directoryPath = path.join(contentRoot, directoryName);

  if (!existsSync(directoryPath)) {
    return [];
  }

  return readdirSync(directoryPath)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => readArticleFile(path.join(directoryPath, fileName)));
}

/** Finds one local MDX article by slug. */
export function getArticleBySlug(slug: string): ArticleMeta | undefined {
  return getArticles().find((article) => article.slug === slug);
}
