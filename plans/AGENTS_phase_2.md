# AGENTS.md

## Project

This is a Chinese food popular science website.

The website has five main modules:

1. 食品安全
2. 食品营养
3. 热点解读
4. 标签识读
5. 谣言澄清

The project is not a food safety decision system.
Do not implement risk decision engines, user-specific risk scoring, medical diagnosis, or personalized medical nutrition advice.

## Current Stage

Current stage: Phase 2 - Homepage and content pages.

In this phase, implement a usable content browsing experience based on the Phase 1 foundation.

Phase 2 includes:

- Homepage modules:
  - 搜索入口
  - 今日热点解读
  - 五大模块入口
  - 热门谣言澄清
  - 最新科普文章
  - 权威来源说明入口
- List pages:
  - 食品安全
  - 食品营养
  - 热点解读
- Article detail pages, including:
  - 标题
  - 副标题
  - 一句话结论
  - 文章标签
  - 关注等级
  - 证据等级
  - 正文
  - 误区澄清
  - 普通人建议
  - 参考来源
  - 更新时间
  - 免责声明

## Tech Stack and Scope

Use:

- Next.js
- TypeScript
- Tailwind CSS
- Local Markdown / MDX files under `content/`
- Local JSON files under `data/`

Do not add:

- Database
- Authentication
- AI API
- OCR
- Complex backend services
- Large UI component libraries
- User-specific health or risk scoring systems

## Phase 2 Development Rules

1. Work inside `frontend/` unless the task explicitly requires root-level files.
2. Modify only files related to the current task.
3. Do not rewrite the entire project.
4. Prefer small, composable components.
5. Reuse Phase 1 types, data readers, and display components whenever possible.
6. Keep content models in `types/content.ts`.
7. Keep local data in `data/`.
8. Keep article content in `content/`.
9. Keep reusable components in `components/`.
10. Keep data reading utilities in `lib/`.
11. Keep route-level page composition in `app/` or `src/app/`, following the existing project structure.
12. Do not duplicate content data inside pages when the same data can be read from `content/` or `data/`.
13. Do not introduce new dependencies unless clearly necessary and lightweight.

## Homepage Requirements

The homepage should act as an entry page, recommendation page, and trust-building page.

It should include:

1. Hero section with the existing site positioning.
2. Search entrance UI.
3. Popular search keyword chips.
4. 今日热点解读 module.
5. 五大模块入口 module.
6. 热门谣言澄清 module.
7. 最新科普文章 module.
8. 权威来源说明入口 or 内容依据与可信度 module.

Search behavior can remain UI-only in Phase 2 unless a task explicitly asks for functional search.
Do not build a full search engine in Phase 2.

## List Page Requirements

The following pages should display category-specific articles:

- `/safety`
- `/nutrition`
- `/hot-topics`

Each list page should include:

1. Page title.
2. Page description.
3. Article count.
4. Article card list.
5. Empty state when no content exists.

Data should come from local content readers such as `getArticlesByCategory(category)`.

## Article Detail Page Requirements

Article detail pages should use a slug-based route, preferably:

```txt
/articles/[slug]
```

Each article detail page should include:

1. Category.
2. Title.
3. Subtitle, if available.
4. Description or summary.
5. One-sentence conclusion.
6. Tags.
7. Attention level.
8. Evidence level.
9. Updated date.
10. Hero image, if available.
11. Article body.
12. Myth clarification section, if available.
13. Consumer advice section, if available.
14. Reference sources matched from `sourceIds`.
15. Disclaimer.

If an article slug does not exist, use the framework's standard not-found behavior.

## Content Data Rules

1. Article metadata should remain compatible with local Markdown / MDX frontmatter.
2. Phase 2 article fields may include optional fields such as:
   - `subtitle`
   - `summary`
   - `conclusion`
   - `image`
   - `featured`
   - `mythClarifications`
   - `advice`
   - `disclaimer`
3. Keep these fields optional unless a task explicitly requires otherwise.
4. Do not break existing Phase 1 content.
5. Use `sourceIds` to connect articles with entries in `data/sources.json`.
6. If a field is missing, pages should degrade gracefully instead of throwing errors.

## Component Guidelines

Prefer reusable components for:

- Article cards
- Myth cards
- Source cards
- Section headers
- Badges
- Category entry cards
- Featured article blocks
- Search entrance UI

Card hover effects should be visible but not excessive:

- Slight upward movement.
- Stronger shadow.
- Subtle green border change.
- Smooth transition around 180-300ms.
- No layout shift.

For `next/image`:

1. Use meaningful `alt` text.
2. Use `priority` only for above-the-fold LCP images.
3. Do not set `priority` on every card image.
4. Use stable dimensions to avoid layout shift.

## Visual Direction

Maintain the current visual identity:

- Chinese food science popularization style.
- Green and warm off-white color palette.
- Clear card-based layout.
- Calm, trustworthy, non-sensational tone.
- Good spacing without leaving the homepage empty.
- Mobile-first responsive behavior.

## Content Principles

1. Avoid sensational food safety claims.
2. Avoid medical treatment advice.
3. Avoid unsupported health claims.
4. Use conservative wording for children, pregnant women, older adults, and immunocompromised people.
5. Always distinguish between scientific explanation and consumer advice.
6. Explain risk by dose, scenario, population, and evidence level where relevant.
7. Prefer practical, executable advice for ordinary consumers.
8. Always show reference sources and update dates on article detail pages when available.
9. Include a disclaimer on article detail pages.

Default disclaimer:

```txt
本站内容仅用于食品科学科普，不替代医生、营养师或监管部门的专业建议。涉及疾病、过敏、特殊膳食或食品安全事件时，请咨询专业人士或以官方信息为准。
```

## Testing Requirements

After completing each task, run:

```bash
npm run build
```

If the project has a lint script, also run:

```bash
npm run lint
```

For Phase 2, manually verify at least:

1. `/`
2. `/safety`
3. `/nutrition`
4. `/hot-topics`
5. `/myths`
6. `/label-reader`
7. `/about`
8. At least one `/articles/[slug]` page.

## Output Requirements

After completing a task, always report:

1. Files changed.
2. What was implemented.
3. How to run.
4. How to test.
5. Known limitations.

For Phase 2 tasks, also report:

1. Which data readers were used or added.
2. Whether the feature uses real data from `content/` or `data/`.
3. Whether any UI is placeholder-only.
4. Whether `npm run build` passed.
