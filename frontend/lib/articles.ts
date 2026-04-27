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

type ArticleCategoryInput = ContentCategory | "safety" | "hot-topics";
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
  const content = parseArticleContent(fileContent, filePath);
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
    content,
    contentPath: filePath,
  };
}

function parseArticleContent(fileContent: string, filePath: string) {
  const match = fileContent.match(/^---\r?\n[\s\S]*?\r?\n---/);

  if (!match) {
    throw new Error(`Missing frontmatter in article file: ${filePath}`);
  }

  return fileContent.slice(match[0].length).trim();
}

function normalizeArticleCategory(
  category: ArticleCategoryInput,
): ContentCategory {
  if (category === "safety") {
    return "food_safety";
  }

  if (category === "hot-topics") {
    return "hot_topics";
  }

  return category;
}

function sortByUpdatedAtDesc(articles: ArticleMeta[]) {
  return [...articles].sort((first, second) => {
    const firstDate = first.updatedAt ?? first.publishedAt;
    const secondDate = second.updatedAt ?? second.publishedAt;

    return secondDate.localeCompare(firstDate);
  });
}

/** Reads all local MDX articles from supported content category directories. */
export function getAllArticles(): ArticleMeta[] {
  if (!existsSync(contentRoot)) {
    return [];
  }

  return articleCategories.flatMap((category) => getArticlesByCategory(category));
}

/** Backward-compatible alias for reading all local MDX articles. */
export function getArticles(): ArticleMeta[] {
  return getAllArticles();
}

/** Reads local MDX articles for one content category or route segment. */
export function getArticlesByCategory(
  category: ArticleCategoryInput,
): ArticleMeta[] {
  const normalizedCategory = normalizeArticleCategory(category);
  const directoryName = categoryDirectories[normalizedCategory];
  const directoryPath = path.join(contentRoot, directoryName);

  if (!existsSync(directoryPath)) {
    return [];
  }

  return readdirSync(directoryPath)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => readArticleFile(path.join(directoryPath, fileName)));
}

/** Finds one local MDX article by slug, returning null when it is missing. */
export function getArticleBySlug(slug: string): ArticleMeta | null {
  return getAllArticles().find((article) => article.slug === slug) ?? null;
}

/** Returns the latest local MDX articles sorted by updatedAt descending. */
export function getLatestArticles(limit: number): ArticleMeta[] {
  return sortByUpdatedAtDesc(getAllArticles()).slice(0, limit);
}

/** Returns featured local MDX articles, falling back to latest articles if none are featured. */
export function getFeaturedArticles(limit: number): ArticleMeta[] {
  const featuredArticles = sortByUpdatedAtDesc(
    getAllArticles().filter((article) => article.featured),
  );

  if (featuredArticles.length === 0) {
    return getLatestArticles(limit);
  }

  return featuredArticles.slice(0, limit);
}
