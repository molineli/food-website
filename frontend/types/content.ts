/** Evidence strength used to describe how well a content claim is supported. */
export type EvidenceLevel = "A" | "B" | "C" | "D" | "E";

/** Attention marker for conservative consumer guidance, not risk scoring. */
export type AttentionLevel = "low" | "medium" | "high" | "watching";

/** Main information architecture categories for the food science site. */
export type ContentCategory =
  | "food_safety"
  | "nutrition"
  | "hot_topics"
  | "label_reading"
  | "myth_busting";

/** Supported content formats for local Markdown, MDX, and JSON content. */
export type ContentFormat =
  | "article"
  | "comic"
  | "video"
  | "infographic"
  | "myth_card"
  | "label_case"
  | "interactive";

/** Image displayed on content cards and listing pages. */
export type ContentImage = {
  src: string;
  alt: string;
};

/** External or local source used to support a content item. */
export type SourceEntry = {
  id: string;
  title: string;
  url?: string;
  publisher?: string;
  publishedAt?: string;
  accessedAt?: string;
  note?: string;
};

/** Shared metadata for every publishable content item. */
export type BaseContentMeta = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  category: ContentCategory;
  format: ContentFormat;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  coverImage?: string;
  evidenceLevel?: EvidenceLevel;
  attentionLevel?: AttentionLevel;
  image?: ContentImage;
  featured?: boolean;
  sourceIds?: string[];
  sources?: SourceEntry[];
  draft?: boolean;
};

/** Long-form science explanation or consumer education article. */
export type ArticleContent = BaseContentMeta & {
  format: "article";
  readingMinutes?: number;
  summary?: string;
  conclusion?: string;
  mythClarifications?: string[];
  advice?: string[];
  disclaimer?: string;
  difficulty?: "入门" | "进阶" | "专业";
};

/** Comic-style content with ordered panels and optional local script text. */
export type ComicContent = BaseContentMeta & {
  format: "comic";
  panels: {
    image: string;
    caption?: string;
    alt: string;
  }[];
  transcriptPath?: string;
};

/** Video content metadata for embedded or locally hosted educational videos. */
export type VideoContent = BaseContentMeta & {
  format: "video";
  videoUrl: string;
  durationSeconds?: number;
  transcriptPath?: string;
  posterImage?: string;
};

/** Static or scrollable infographic content with optional structured sections. */
export type InfographicContent = BaseContentMeta & {
  format: "infographic";
  image: string;
  alt: string;
  sections?: {
    title: string;
    description: string;
  }[];
};

/** Rumor clarification card that separates claim, explanation, and advice. */
export type MythCard = BaseContentMeta & {
  format: "myth_card";
  claim: string;
  verdict: "false" | "misleading" | "partly_true" | "unverified";
  explanation: string;
  consumerAdvice?: string;
};

/** A region on a food label used by label reading cases. */
export type LabelRegion = {
  id: string;
  label: string;
  description: string;
  image?: string;
  coordinates?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

/** Label reading case that explains selected regions of a food package label. */
export type LabelCase = BaseContentMeta & {
  format: "label_case";
  productName: string;
  labelImage: string;
  regions: LabelRegion[];
  takeaway?: string;
};

/** Interactive learning content such as quizzes, mini tools, or guided explainers. */
export type InteractiveContent = BaseContentMeta & {
  format: "interactive";
  interactionType: "quiz" | "calculator" | "simulation" | "guided_explainer";
  entryComponent?: string;
  configPath?: string;
  estimatedMinutes?: number;
};

/** Union of all content item shapes supported by the first version. */
export type ContentItem =
  | ArticleContent
  | ComicContent
  | VideoContent
  | InfographicContent
  | MythCard
  | LabelCase
  | InteractiveContent;
