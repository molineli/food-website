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
Do not implement risk decision engines, user-specific risk scoring, or medical nutrition advice in this project.

## Current Stage

Current stage: Phase 1 - Project foundation and information architecture.

In this phase:

- Use Next.js + TypeScript + Tailwind CSS.
- Use local Markdown / MDX and JSON files as content sources.
- Do not add database.
- Do not add authentication.
- Do not add AI API.
- Do not add OCR.
- Do not add complex backend services.

## Development Rules

1. Modify only files related to the current task.
2. Do not rewrite the entire project.
3. Prefer small, composable components.
4. Keep content models in `types/content.ts`.
5. Keep local data in `data/`.
6. Keep article content in `content/`.
7. Keep reusable components in `components/`.
8. Keep data reading utilities in `lib/`.

## Content Principles

1. Avoid sensational food safety claims.
2. Avoid medical treatment advice.
3. Avoid unsupported health claims.
4. Use conservative wording for children, pregnant women, older adults, and immunocompromised people.
5. Always distinguish between scientific explanation and consumer advice.

## Output Requirements

After completing a task, always report:

1. Files changed.
2. What was implemented.
3. How to run.
4. How to test.
5. Known limitations.
