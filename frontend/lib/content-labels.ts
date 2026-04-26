import type {
  AttentionLevel,
  ContentCategory,
  ContentFormat,
  EvidenceLevel,
  MythCard,
} from "@/types/content";

const contentCategoryLabels: Record<ContentCategory, string> = {
  food_safety: "食品安全",
  nutrition: "食品营养",
  hot_topics: "热点解读",
  label_reading: "标签识读",
  myth_busting: "谣言澄清",
};

const contentFormatLabels: Record<ContentFormat, string> = {
  article: "文章",
  comic: "漫画",
  video: "视频",
  infographic: "图解",
  myth_card: "谣言卡片",
  label_case: "标签识读案例",
  interactive: "互动内容",
};

const attentionLevelLabels: Record<AttentionLevel, string> = {
  low: "低关注",
  medium: "中关注",
  high: "高关注",
  watching: "持续关注",
};

const evidenceLevelLabels: Record<EvidenceLevel, string> = {
  A: "A｜国家标准 / 官方指南",
  B: "B｜权威机构资料",
  C: "C｜系统综述 / 高质量研究",
  D: "D｜单篇研究",
  E: "E｜新闻事件 / 专家观点",
};

const mythVerdictLabels: Record<MythCard["verdict"], string> = {
  false: "不实",
  misleading: "有误导",
  partly_true: "部分属实",
  unverified: "证据不足",
};

export function getContentCategoryLabel(category: ContentCategory) {
  return contentCategoryLabels[category];
}

export function getContentFormatLabel(format: ContentFormat) {
  return contentFormatLabels[format];
}

export function getAttentionLevelLabel(level: AttentionLevel) {
  return attentionLevelLabels[level];
}

export function getEvidenceLevelLabel(level: EvidenceLevel) {
  return evidenceLevelLabels[level];
}

export function getMythVerdictLabel(verdict: MythCard["verdict"]) {
  return mythVerdictLabels[verdict];
}
