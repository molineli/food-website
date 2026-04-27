# Phase 2：首页与内容页面

请在当前项目的 `frontend/` 目录中开发前端。

当前阶段是 **Phase 2：首页与内容页面**。

## 阶段目标

- 实现首页：
  - 搜索入口
  - 今日热点解读
  - 五大模块入口
  - 热门谣言澄清
  - 最新科普文章
  - 权威来源说明入口
- 实现食品安全、食品营养、热点解读列表页。
- 实现文章详情页，包含：
  - 标题
  - 副标题
  - 一句话结论
  - 文章标签
  - 关注等级
  - 正文
  - 误区澄清
  - 普通人建议
  - 参考来源
  - 更新时间
  - 免责声明

## 总体原则

- 优先复用 Phase 1 已建立的类型、数据读取工具和组件。
- 继续使用本地 `content/` 与 `data/` 数据。
- 不接入数据库。
- 不接入 AI 功能。
- 不引入大型 UI 组件库。
- 保持当前绿色、米白色、食品科普风格。
- 每完成一个 Task 后运行：

```bash
npm run build
```

如果项目有 lint 脚本，也运行：

```bash
npm run lint
```

---

# Task 1：补齐 Phase 2 所需内容字段

## 目标

让现有内容类型和示例内容足以支撑首页推荐、列表页和文章详情页。

## 修改范围

优先检查：

```txt
types/content.ts
content/safety/*
content/nutrition/*
content/hot-topics/*
data/sources.json
```

## 具体要求

1. 检查 `types/content.ts` 中的内容类型。
2. 如缺少以下字段，请补充为可选字段：
   - `subtitle?: string`
   - `summary?: string`
   - `conclusion?: string`
   - `image?: { src: string; alt: string }`
   - `featured?: boolean`
   - `mythClarifications?: string[]`
   - `advice?: string[]`
   - `disclaimer?: string`
3. 不要把这些字段全部强制设为必填，避免破坏已有数据。
4. 检查三个文章目录中的 MDX 示例内容。
5. 每个分类至少准备 2 篇示例文章。
6. 每篇文章尽量包含：
   - slug
   - title
   - subtitle
   - description
   - summary
   - conclusion
   - category
   - tags
   - evidenceLevel
   - attentionLevel
   - updatedAt
   - sourceIds
   - image
   - featured
   - mythClarifications
   - advice
   - disclaimer
7. 本任务不实现页面 UI。

## 验收标准

- TypeScript 类型无报错。
- 示例内容足以支撑文章详情页。
- `npm run build` 通过。

## Codex Prompt

```text
请在当前项目的 frontend/ 目录中完成 Phase 2 的内容字段补齐任务。

目标：为首页推荐、列表页和文章详情页准备足够的数据字段，但不要实现 UI。

请检查并修改：
- types/content.ts
- content/safety/*
- content/nutrition/*
- content/hot-topics/*
- data/sources.json

要求：

1. 检查已有内容类型，重点关注：
   - BaseContentMeta
   - ArticleContent
   - ContentItem
   - SourceEntry

2. 如果当前类型中缺少以下字段，请在合适的类型中补充为可选字段：
   - subtitle?: string
   - summary?: string
   - conclusion?: string
   - image?: { src: string; alt: string }
   - featured?: boolean
   - mythClarifications?: string[]
   - advice?: string[]
   - disclaimer?: string

3. 不要把这些字段全部设为必填，避免破坏已有内容。

4. 检查 content/safety、content/nutrition、content/hot-topics 下的 MDX 示例文章。
   如果每个分类少于 2 篇文章，请补充示例文章。

5. 每篇示例文章尽量包含：
   - slug
   - title
   - subtitle
   - description
   - summary
   - conclusion
   - category
   - tags
   - evidenceLevel
   - attentionLevel
   - updatedAt
   - sourceIds
   - image
   - featured
   - mythClarifications
   - advice
   - disclaimer

6. 示例内容要面向普通消费者，符合食品科学科普网站定位。
7. 不要实现页面 UI。
8. 不要接入数据库。
9. 不要接入 AI 功能。
10. 不要引入大型依赖。

完成后运行：
npm run build

如果项目有 lint 脚本，也运行：
npm run lint

最后总结修改了哪些类型和哪些内容文件。
```

---

# Task 2：增强文章读取工具

## 目标

让页面可以读取全部文章、分类文章、最新文章、精选文章和单篇文章详情。

## 修改范围

```txt
lib/articles.ts
types/content.ts
content/*
```

## 具体要求

在 `lib/articles.ts` 中增加或完善：

```ts
getAllArticles()
getArticlesByCategory(category)
getArticleBySlug(slug)
getLatestArticles(limit)
getFeaturedArticles(limit)
```

要求：

1. `getAllArticles()` 读取 `content/` 下所有分类目录中的文章。
2. `getArticlesByCategory(category)` 支持：
   - safety
   - nutrition
   - hot-topics
3. `getArticleBySlug(slug)` 返回单篇文章；找不到时返回 `null` 或抛出清晰错误。
4. `getLatestArticles(limit)` 按 `updatedAt` 倒序返回。
5. `getFeaturedArticles(limit)` 优先返回 `featured: true` 的文章；没有时用最新文章兜底。
6. 如果当前只读取 frontmatter，请扩展为同时读取正文 `content`。
7. 不实现复杂 MDX 渲染。

## 验收标准

- 列表页能按分类读取文章。
- 详情页能按 slug 读取文章。
- `npm run build` 通过。

## Codex Prompt

```text
请增强当前项目的本地文章读取工具，为 Phase 2 的首页、列表页和文章详情页提供数据。

重点检查并修改：
- lib/articles.ts
- types/content.ts
- content/safety/*
- content/nutrition/*
- content/hot-topics/*

要求：

1. 保留 Phase 1 已有读取函数，不要随意删除或改名。

2. 在 lib/articles.ts 中增加或完善以下函数：
   - getAllArticles()
   - getArticlesByCategory(category)
   - getArticleBySlug(slug)
   - getLatestArticles(limit)
   - getFeaturedArticles(limit)

3. getAllArticles() 应读取 content/ 下所有分类目录中的 MDX 文章。

4. getArticlesByCategory(category) 至少支持：
   - safety
   - nutrition
   - hot-topics

5. getArticleBySlug(slug) 根据 slug 返回单篇文章详情。
   如果找不到文章，可以返回 null，或者抛出清晰错误。调用方式要清晰。

6. getLatestArticles(limit) 按 updatedAt 倒序返回最新文章。

7. getFeaturedArticles(limit) 优先返回 featured 为 true 的文章；如果没有，则返回最新文章作为兜底。

8. 如果当前工具只读取 frontmatter，请扩展为同时读取正文内容，至少返回 content 字符串。

9. 不要实现复杂 MDX 渲染。
10. 不要接入数据库。
11. 不要接入 AI 功能。
12. 不要引入大型依赖。若项目已经使用 gray-matter，可以继续使用。

完成后运行：
npm run build

如果项目有 lint 脚本，也运行：
npm run lint

最后总结新增了哪些读取函数，以及它们分别用于哪些页面。
```

---

# Task 3：实现首页搜索入口

## 目标

首页 Hero 区不再只有标题和简介，而是提供明确搜索入口。

## 修改范围

```txt
app/page.tsx
src/app/page.tsx
components/SearchBox.tsx
app/globals.css
```

## 具体要求

1. 保留现有首页品牌文案。
2. 增加搜索框。
3. 搜索框 placeholder：

```txt
搜索食品安全、营养标签、食品添加剂、隔夜菜……
```

4. 增加热门搜索词：
   - 隔夜菜
   - 食品添加剂
   - 配料表
   - 0糖饮料
   - 亚硝酸盐
   - 生熟分开
5. 本任务只实现 UI，不实现真实搜索。
6. 搜索框需要适配移动端。

## 验收标准

- 首页首屏不再空旷。
- 搜索入口清晰。
- `npm run build` 通过。

## Codex Prompt

```text
请改造首页 Hero 区，增加搜索入口 UI。

重点修改：
- app/page.tsx 或 src/app/page.tsx
- 必要时新增 components/SearchBox.tsx
- 必要时修改 app/globals.css 或 src/app/globals.css

要求：

1. 保留当前首页已有品牌文案：
   - 食品科学科普平台
   - 食识堂
   - 面向普通消费者，帮助用户看懂食品安全、食品营养、食品标签与食品热点。

2. 在 Hero 区下方增加搜索框。

3. 搜索框 placeholder 使用：
   “搜索食品安全、营养标签、食品添加剂、隔夜菜……”

4. 搜索框可以带“搜索”按钮，但本任务只要求 UI，不要求真实搜索功能。

5. 搜索框下方增加热门搜索词：
   - 隔夜菜
   - 食品添加剂
   - 配料表
   - 0糖饮料
   - 亚硝酸盐
   - 生熟分开

6. 热门搜索词使用小胶囊按钮样式，风格与当前绿色、米白色网站一致。

7. 移动端搜索框不能溢出。

8. 不要破坏 Header 和内容导航下拉菜单。
9. 不要接入数据库。
10. 不要接入 AI 功能。
11. 不要引入 UI 组件库。

完成后运行：
npm run build

如果项目有 lint 脚本，也运行：
npm run lint

最后总结首页 Hero 区新增了哪些元素。
```

---

# Task 4：实现首页“今日热点解读”

## 目标

首页展示 1 条重点热点内容，增强即时性和引导性。

## 修改范围

```txt
app/page.tsx
lib/articles.ts
components/ArticleCard.tsx
components/FeaturedArticle.tsx
```

## 具体要求

1. 首页新增模块：`今日热点解读`。
2. 从 `hot-topics` 分类中读取 1 篇文章。
3. 优先展示 `featured: true` 的热点文章。
4. 如果没有 `featured`，展示最新热点文章。
5. 展示：
   - 分类标签
   - 标题
   - 摘要
   - 一句话结论
   - 更新时间
   - 查看解读链接
6. 点击后进入文章详情页。

## 验收标准

- 数据来自 `content/hot-topics`。
- 不在首页硬编码完整文章。
- `npm run build` 通过。

## Codex Prompt

```text
请在首页实现“今日热点解读”模块。

重点修改：
- app/page.tsx 或 src/app/page.tsx
- lib/articles.ts
- components/ArticleCard.tsx
- 如有需要，新增 components/FeaturedArticle.tsx

要求：

1. 首页新增一个模块，标题为：
   今日热点解读

2. 从 hot-topics 分类文章中选择 1 篇展示。
   选择逻辑：
   - 如果存在 featured: true 的 hot-topics 文章，优先展示它；
   - 如果没有，则展示 updatedAt 最新的 hot-topics 文章。

3. 模块展示信息包括：
   - 分类标签
   - 标题
   - 摘要或 description
   - 一句话结论 conclusion
   - 更新时间 updatedAt
   - “查看解读”链接

4. 点击后进入文章详情页。
   推荐详情页路径为：/articles/[slug]
   如果项目已有其他详情页路径，请使用现有路径。

5. 样式要求：
   - 该模块应比普通卡片更醒目；
   - 保持绿色、米白色食品科普风格；
   - 移动端正常堆叠；
   - hover 动效与现有卡片保持一致。

6. 数据必须来自 content/hot-topics，不要在首页硬编码完整文章内容。
7. 不要接入数据库。
8. 不要接入 AI 功能。
9. 不要引入 UI 组件库。

完成后运行：
npm run build

如果项目有 lint 脚本，也运行：
npm run lint

最后总结该模块的数据来源和选择逻辑。
```

---

# Task 5：实现首页“五大模块入口”

## 目标

让首页成为内容分发入口。

## 修改范围

```txt
app/page.tsx
components/CategoryEntryCard.tsx
data/categories.json
```

## 具体要求

展示 5 个入口卡片：

| 模块 | 说明 | 推荐路径 |
|---|---|---|
| 食品安全 | 看懂风险来源、风险大小和日常避险方法 | `/safety` |
| 食品营养 | 了解营养标签、膳食结构和常见营养误区 | `/nutrition` |
| 热点解读 | 解释食品热点事件背后的科学问题 | `/hot-topics` |
| 标签识读 | 学会看配料表、营养成分表和食品宣称 | `/label-reader` |
| 谣言澄清 | 用证据判断网传食品说法是否可靠 | `/myths` |

## 验收标准

- 五个入口都可点击。
- 路由正确。
- `npm run build` 通过。

## Codex Prompt

```text
请在首页实现“五大模块入口”区。

重点修改：
- app/page.tsx 或 src/app/page.tsx
- 如有需要，新增 components/CategoryEntryCard.tsx
- 如已有 data/categories.json，可优先复用

要求：

1. 在首页新增模块，标题为：
   从分类开始了解食品

2. 展示 5 个入口卡片：
   - 食品安全：看懂风险来源、风险大小和日常避险方法
   - 食品营养：了解营养标签、膳食结构和常见营养误区
   - 热点解读：解释食品热点事件背后的科学问题
   - 标签识读：学会看配料表、营养成分表和食品宣称
   - 谣言澄清：用证据判断网传食品说法是否可靠

3. 每个入口卡片需要可以点击跳转。优先使用：
   - /safety
   - /nutrition
   - /hot-topics
   - /label-reader
   - /myths

4. 卡片需要包含：
   - 标题
   - 简短说明
   - 可选图标或文字标识

5. 样式要求：
   - 使用网格布局；
   - 移动端自动堆叠；
   - hover 时轻微上移、阴影增强、边框变绿；
   - 与当前网站绿色、米白色风格一致。

6. 不要删除 Header 中已有的内容导航。
7. 不要接入数据库。
8. 不要接入 AI 功能。
9. 不要引入新的 UI 组件库。

完成后运行：
npm run build

如果项目有 lint 脚本，也运行：
npm run lint

最后总结五个入口分别链接到哪里。
```

---

# Task 6：实现首页“热门谣言澄清”

## 目标

在首页展示 3 条谣言澄清，提升实用性。

## 修改范围

```txt
app/page.tsx
lib/myths.ts
components/MythCard.tsx
data/myths.json
```

## 具体要求

1. 首页新增模块：`热门谣言澄清`。
2. 从 `data/myths.json` 读取 3 条。
3. 展示：
   - 谣言说法
   - 结论
   - 简短解释
   - 关注等级或证据等级
4. 复用 `MythCard`。
5. 添加 `查看全部谣言澄清` 链接，跳转 `/myths`。

## 验收标准

- 数据来自 `data/myths.json`。
- 展示 3 条。
- `npm run build` 通过。

## Codex Prompt

```text
请在首页实现“热门谣言澄清”模块。

重点修改：
- app/page.tsx 或 src/app/page.tsx
- lib/myths.ts
- components/MythCard.tsx

要求：

1. 首页新增模块，标题为：
   热门谣言澄清

2. 从 data/myths.json 中读取 3 条谣言卡片展示。
   如果 lib/myths.ts 中已经有 getMyths()，请复用它。
   如有必要，可以新增 getFeaturedMyths(limit) 或 getHotMyths(limit)。

3. 每张卡片展示：
   - 谣言说法
   - 结论
   - 简短解释
   - 关注等级或证据等级，如果数据中存在

4. 优先复用已有 MythCard 组件。
   如 MythCard 样式过于简单，可以增强 hover 效果，但不要破坏其他页面。

5. 模块底部或标题右侧增加链接：
   查看全部谣言澄清
   链接到 /myths

6. 数据必须来自 data/myths.json，不要在首页硬编码完整谣言内容。
7. 不要创建复杂谣言详情页。
8. 不要接入数据库。
9. 不要接入 AI 功能。
10. 不要引入 UI 组件库。

完成后运行：
npm run build

如果项目有 lint 脚本，也运行：
npm run lint

最后总结展示数量、数据来源和跳转路径。
```

---

# Task 7：实现首页“最新科普文章”

## 目标

首页展示最新文章，形成持续更新感。

## 修改范围

```txt
app/page.tsx
lib/articles.ts
components/ArticleCard.tsx
```

## 具体要求

1. 首页新增模块：`最新科普文章`。
2. 使用 `getLatestArticles(limit)` 读取 4–6 篇。
3. 按 `updatedAt` 倒序展示。
4. 复用 `ArticleCard`。
5. 卡片点击进入详情页。
6. 添加“查看全部”或分类入口链接。

## 验收标准

- 数据来自 `content/`。
- 排序正确。
- `npm run build` 通过。

## Codex Prompt

```text
请在首页实现“最新科普文章”模块。

重点修改：
- app/page.tsx 或 src/app/page.tsx
- lib/articles.ts
- components/ArticleCard.tsx

要求：

1. 首页新增模块，标题为：
   最新科普文章

2. 使用 lib/articles.ts 中的 getLatestArticles(limit) 读取最新文章。
   如果该函数不存在，请先实现。

3. 展示 4–6 篇文章，按 updatedAt 倒序排列。

4. 每篇文章使用已有 ArticleCard 组件展示。
   ArticleCard 至少应展示：
   - 标题
   - 描述
   - 分类
   - 标签
   - 证据等级
   - 关注等级
   - 更新时间
   - 图片，如果数据存在

5. 每张文章卡片需要可以点击进入详情页。
   推荐路径：/articles/[slug]
   如项目已有其他详情页路径，请使用现有路径。

6. 模块标题右侧或底部增加“查看全部”入口。
   如果没有全部文章页面，可以链接到 /safety 或内容导航中的分类页。

7. 不要在首页硬编码文章数据。
8. 不要接入数据库。
9. 不要接入 AI 功能。
10. 不要引入 UI 组件库。

完成后运行：
npm run build

如果项目有 lint 脚本，也运行：
npm run lint

最后总结展示数量、排序规则和使用的读取函数。
```

---

# Task 8：实现首页“权威来源说明入口”

## 目标

首页建立可信度，说明内容依据。

## 修改范围

```txt
app/page.tsx
lib/sources.ts
components/SourceCard.tsx
data/sources.json
```

## 具体要求

1. 首页新增模块：`内容依据与可信度`。
2. 展示 3 个说明卡片：
   - 基于权威资料
   - 区分风险大小
   - 给出清晰建议
3. 添加 `查看权威来源` 链接，推荐跳转 `/about`。
4. 可选展示 3 个来源机构名称。

## 验收标准

- 首页有明确可信度说明。
- 链接可用。
- `npm run build` 通过。

## Codex Prompt

```text
请在首页实现“权威来源说明入口”模块，用于建立食品科普内容的可信度。

重点修改：
- app/page.tsx 或 src/app/page.tsx
- lib/sources.ts
- components/SourceCard.tsx，若需要

要求：

1. 首页新增模块，标题为：
   内容依据与可信度

2. 模块说明文案可以使用：
   我们优先参考国家标准、监管机构、指南和综述文献，并尽量把科学结论转化为普通用户能执行的行动建议。

3. 展示 3 个说明卡片：
   - 基于权威资料：优先参考国家标准、监管机构、指南和综述文献
   - 区分风险大小：说明剂量、场景和人群差异，而不是简单制造焦虑
   - 给出清晰建议：把科学结论转化成普通用户能执行的行动建议

4. 增加一个链接：
   查看权威来源
   推荐链接到 /about

5. 如果 data/sources.json 中已经有权威来源数据，可以在该模块中展示 3 个来源名称，但不是必须。

6. 样式要求：
   - 不要太重，适合作为首页靠后模块；
   - 保持绿色、米白色风格；
   - 移动端正常显示。

7. 不要接入数据库。
8. 不要接入 AI 功能。
9. 不要引入 UI 组件库。

完成后运行：
npm run build

如果项目有 lint 脚本，也运行：
npm run lint

最后总结模块新增了哪些可信度说明和跳转链接。
```

---

# Task 9：升级食品安全、食品营养、热点解读列表页

## 目标

让三个核心列表页具备完整页面结构。

## 修改范围

```txt
app/safety/page.tsx
app/nutrition/page.tsx
app/hot-topics/page.tsx
lib/articles.ts
components/ArticleCard.tsx
components/SectionHeader.tsx
```

## 具体要求

1. 三个页面分别使用：
   - `/safety` → `getArticlesByCategory("safety")`
   - `/nutrition` → `getArticlesByCategory("nutrition")`
   - `/hot-topics` → `getArticlesByCategory("hot-topics")`
2. 每个页面包含：
   - 页面小标题
   - 页面主标题
   - 页面说明
   - 当前分类文章数量
   - 文章卡片列表
   - 空状态提示
3. 暂时不实现真实筛选，但可以预留标签筛选 UI。
4. 每张卡片链接到文章详情页。

## 验收标准

- 三个列表页都能显示对应分类文章。
- 空状态不报错。
- `npm run build` 通过。

## Codex Prompt

```text
请升级食品安全、食品营养、热点解读三个列表页。

重点修改：
- app/safety/page.tsx 或 src/app/safety/page.tsx
- app/nutrition/page.tsx 或 src/app/nutrition/page.tsx
- app/hot-topics/page.tsx 或 src/app/hot-topics/page.tsx
- lib/articles.ts
- components/ArticleCard.tsx
- components/SectionHeader.tsx

要求：

1. 三个页面分别使用 getArticlesByCategory(category) 读取数据：
   - /safety 使用 safety
   - /nutrition 使用 nutrition
   - /hot-topics 使用 hot-topics

2. 每个页面顶部包含：
   - 页面小标题，例如“内容导航”
   - 页面主标题
   - 页面说明文案
   - 当前分类文章数量

3. 页面主标题与说明：
   - 食品安全：解释食品安全风险从哪里来、风险有多大，以及普通人如何降低风险。
   - 食品营养：帮助用户看懂营养信息、饮食结构和常见营养误区。
   - 热点解读：从科学证据出发，解释食品热点事件背后的真实问题。

4. 文章列表使用已有 ArticleCard 组件。

5. 每张文章卡片点击后进入文章详情页。
   推荐路径：/articles/[slug]
   如项目已有其他路径，请使用现有路径。

6. 如果某分类没有文章，显示空状态：
   暂无内容，后续会继续更新。

7. 可以预留标签筛选 UI，但本任务不要求实现真实筛选逻辑。

8. 保持页面样式与当前网站一致。
9. 不要接入数据库。
10. 不要接入 AI 功能。
11. 不要引入 UI 组件库。

完成后运行：
npm run build

如果项目有 lint 脚本，也运行：
npm run lint

最后总结三个页面分别读取了哪个分类的数据。
```

---

# Task 10：实现文章详情页基础路由

## 目标

建立 `/articles/[slug]` 动态详情页。

## 修改范围

```txt
app/articles/[slug]/page.tsx
lib/articles.ts
components/ArticleCard.tsx
components/Badge.tsx
```

## 具体要求

1. 新增或完善 `/articles/[slug]`。
2. 通过 `params.slug` 调用 `getArticleBySlug(slug)`。
3. 文章不存在时调用 `notFound()`。
4. 页面顶部展示：
   - 分类
   - 标题
   - 副标题
   - 描述
   - 一句话结论
   - 标签
   - 关注等级
   - 证据等级
   - 更新时间
5. 如果有主图，展示主图。
6. `ArticleCard` 点击进入对应详情页。

## 验收标准

- 从列表页可进入详情页。
- 不存在的 slug 显示 404。
- `npm run build` 通过。

## Codex Prompt

```text
请实现文章详情页路由与基础布局。

重点修改：
- app/articles/[slug]/page.tsx 或 src/app/articles/[slug]/page.tsx
- lib/articles.ts
- components/Badge.tsx
- components/ArticleCard.tsx，确保卡片链接到详情页

要求：

1. 新增或完善动态路由：
   /articles/[slug]

2. 页面通过 params.slug 调用 getArticleBySlug(slug) 获取文章。

3. 如果文章不存在，请使用 Next.js 的 notFound()。

4. 页面顶部展示以下信息：
   - 分类
   - 标题 title
   - 副标题 subtitle，如果存在
   - 描述 description，如果存在
   - 一句话结论 conclusion，如果存在
   - 标签 tags
   - 关注等级 attentionLevel
   - 证据等级 evidenceLevel
   - 更新时间 updatedAt

5. 如果文章有 image 字段，可以在页面顶部展示主图。
   使用 next/image。
   如果该图位于首屏，可以设置 priority。

6. 更新 ArticleCard，使卡片点击后链接到 /articles/[slug]。
   不要破坏已有列表页布局。

7. 样式要求：
   - 详情页最大宽度适合阅读，不要过宽；
   - 保持绿色、米白色食品科普风格；
   - 移动端正常显示。

8. 先不要求复杂 MDX 渲染，正文展示放到后续任务。
9. 不要接入数据库。
10. 不要接入 AI 功能。
11. 不要引入 UI 组件库。

完成后运行：
npm run build

如果项目有 lint 脚本，也运行：
npm run lint

最后总结详情页路径、找不到文章时的处理方式，以及 ArticleCard 的链接修改。
```

---

# Task 11：实现文章详情页正文、误区澄清和普通人建议

## 目标

让文章详情页具备完整科普文章结构。

## 修改范围

```txt
app/articles/[slug]/page.tsx
lib/articles.ts
types/content.ts
components/ArticleBody.tsx
```

## 具体要求

1. 展示正文 `content`。
2. 展示 `误区澄清` 模块。
3. 展示 `普通人建议` 模块。
4. 如果字段不存在，不渲染对应模块。
5. 正文先使用基础排版，不要求复杂 MDX 组件。

## 验收标准

- 详情页能看到正文。
- 误区澄清和建议模块正常显示。
- 字段缺失时不报错。
- `npm run build` 通过。

## Codex Prompt

```text
请完善文章详情页，展示正文、误区澄清和普通人建议。

重点修改：
- app/articles/[slug]/page.tsx 或 src/app/articles/[slug]/page.tsx
- lib/articles.ts
- types/content.ts
- 必要时新增 components/ArticleBody.tsx

要求：

1. 在文章详情页展示文章正文 content。
   如果 content 是 Markdown 或 MDX 原文，Phase 2 可以先用基础方式展示：
   - 保留段落换行；
   - 使用 prose 或自定义样式提高可读性；
   - 不要求实现复杂 MDX 组件。

2. 在正文后增加“误区澄清”模块。
   数据来自 article.mythClarifications。
   如果该字段不存在或为空，不渲染该模块。

3. 在正文后增加“普通人建议”模块。
   数据来自 article.advice。
   如果该字段不存在或为空，不渲染该模块。

4. “误区澄清”模块建议使用浅黄色或浅绿色提示卡片样式。

5. “普通人建议”模块建议使用列表或步骤卡片形式，强调可执行性。

6. 页面结构建议：
   - 顶部元信息
   - 一句话结论
   - 正文
   - 误区澄清
   - 普通人建议

7. 不要因为字段缺失导致页面报错。
8. 不要接入数据库。
9. 不要接入 AI 功能。
10. 不要引入大型依赖。

完成后运行：
npm run build

如果项目有 lint 脚本，也运行：
npm run lint

最后总结正文、误区澄清和普通人建议分别如何渲染。
```

---

# Task 12：实现参考来源与免责声明

## 目标

文章详情页底部展示参考来源和免责声明。

## 修改范围

```txt
app/articles/[slug]/page.tsx
lib/sources.ts
data/sources.json
components/SourceCard.tsx
```

## 具体要求

1. 根据文章 `sourceIds` 匹配 `data/sources.json`。
2. 展示参考来源列表。
3. 展示免责声明。
4. 如果文章没有自定义 disclaimer，使用默认免责声明：

```txt
本站内容仅用于食品科学科普，不替代医生、营养师或监管部门的专业建议。涉及疾病、过敏、特殊膳食或食品安全事件时，请咨询专业人士或以官方信息为准。
```

## 验收标准

- 参考来源正常显示。
- `sourceIds` 匹配不到时不报错。
- 免责声明始终存在。
- `npm run build` 通过。

## Codex Prompt

```text
请完善文章详情页底部的参考来源与免责声明。

重点修改：
- app/articles/[slug]/page.tsx 或 src/app/articles/[slug]/page.tsx
- lib/sources.ts
- data/sources.json
- components/SourceCard.tsx，若已有请复用

要求：

1. 文章详情页根据 article.sourceIds 从 data/sources.json 中匹配参考来源。

2. 如果 lib/sources.ts 中已有 getSources()，请复用。
   如有必要，新增：
   - getSourcesByIds(ids: string[])

3. 在文章底部增加“参考来源”模块。
   每个来源展示：
   - 名称
   - 类型或机构属性
   - 简短说明
   - 链接，如果存在

4. 如果 sourceIds 为空或匹配不到来源，不要报错。
   可以显示：
   暂无可展示的参考来源。

5. 在页面底部增加“免责声明”模块。
   优先使用 article.disclaimer。
   如果没有，则使用默认文案：
   本站内容仅用于食品科学科普，不替代医生、营养师或监管部门的专业建议。涉及疾病、过敏、特殊膳食或食品安全事件时，请咨询专业人士或以官方信息为准。

6. 样式要求：
   - 参考来源区域清晰但不要喧宾夺主；
   - 免责声明使用较轻的提示样式；
   - 移动端正常显示。

7. 不要接入数据库。
8. 不要接入 AI 功能。
9. 不要引入 UI 组件库。

完成后运行：
npm run build

如果项目有 lint 脚本，也运行：
npm run lint

最后总结来源匹配逻辑和默认免责声明逻辑。
```

---

# Task 13：补充详情页 SEO metadata 与静态参数

## 目标

让文章详情页具备基础 SEO 信息，并支持静态生成。

## 修改范围

```txt
app/articles/[slug]/page.tsx
lib/articles.ts
```

## 具体要求

1. 添加 `generateMetadata`。
2. `title` 使用文章标题。
3. `description` 使用 `description` 或 `summary`。
4. 如有 `image`，添加基础 openGraph 图片。
5. 添加 `generateStaticParams`。
6. 找不到文章时安全处理。

## 验收标准

- build 能生成详情页。
- metadata 正常。
- `npm run build` 通过。

## Codex Prompt

```text
请为文章详情页补充 SEO metadata 和静态参数生成。

重点修改：
- app/articles/[slug]/page.tsx 或 src/app/articles/[slug]/page.tsx
- lib/articles.ts

要求：

1. 在 /articles/[slug] 页面中实现 generateMetadata。

2. Metadata 规则：
   - title 使用 article.title
   - description 优先使用 article.description，其次使用 article.summary
   - 如果 article.image 存在，可以添加基础 openGraph image

3. 如果根据 slug 找不到文章，metadata 可以返回：
   - title: "文章不存在"

4. 实现 generateStaticParams。
   使用 getAllArticles() 返回所有文章 slug。

5. 确保 npm run build 时不会因为同步/异步写法错误而失败。

6. 不要接入数据库。
7. 不要接入 AI 功能。
8. 不要引入新依赖。

完成后运行：
npm run build

如果项目有 lint 脚本，也运行：
npm run lint

最后总结 generateMetadata 和 generateStaticParams 的实现逻辑。
```

---

# Task 14：统一首页、列表页和详情页视觉

## 目标

统一间距、标题层级、卡片样式和 hover 动效。

## 修改范围

```txt
app/page.tsx
app/safety/page.tsx
app/nutrition/page.tsx
app/hot-topics/page.tsx
app/articles/[slug]/page.tsx
components/*
app/globals.css
```

## 具体要求

1. 统一页面最大宽度。
2. 统一 SectionHeader。
3. 统一卡片 hover：
   - 上移 4–6px
   - 阴影增强
   - 边框变绿
   - 过渡时间 180–300ms
4. 统一 Badge 风格。
5. 减少首页大面积空白。
6. 检查移动端。

## 验收标准

- 主要页面视觉风格一致。
- hover 明显但不夸张。
- `npm run build` 通过。

## Codex Prompt

```text
请对 Phase 2 已完成的首页、列表页和文章详情页做一次视觉统一优化。

重点检查：
- app/page.tsx 或 src/app/page.tsx
- app/safety/page.tsx
- app/nutrition/page.tsx
- app/hot-topics/page.tsx
- app/articles/[slug]/page.tsx
- components/ArticleCard.tsx
- components/MythCard.tsx
- components/Badge.tsx
- components/SectionHeader.tsx
- app/globals.css 或 src/app/globals.css

要求：

1. 统一页面最大宽度。
   首页、列表页、详情页的主体内容应与 Header 视觉对齐。

2. 统一 SectionHeader。
   每个主要模块使用一致的标题、说明、顶部间距和底部间距。

3. 统一卡片 hover 效果：
   - hover 时整体上移 4–6px；
   - 阴影明显增强；
   - 边框颜色略微变绿；
   - 过渡时间 180–300ms；
   - 不产生布局抖动。

4. 统一 Badge 样式。
   分类、证据等级、关注等级应有稳定的颜色和圆角风格。

5. 减少首页大面积空白。
   保持留白，但不要让首屏显得内容不足。

6. 检查移动端：
   - 搜索框不溢出；
   - 卡片自动堆叠；
   - 详情页正文宽度适合阅读。

7. 不要改变数据读取逻辑。
8. 不要接入数据库。
9. 不要接入 AI 功能。
10. 不要引入 UI 组件库。

完成后运行：
npm run build

如果项目有 lint 脚本，也运行：
npm run lint

最后总结统一了哪些视觉规则。
```

---

# Task 15：Phase 2 整体验收

## 目标

确保首页、列表页、详情页形成完整浏览闭环。

## 检查范围

```txt
/
 /safety
 /nutrition
 /hot-topics
 /myths
 /label-reader
 /about
 /articles/[slug]
```

## 具体验收项

1. 首页包含：
   - 搜索入口
   - 今日热点解读
   - 五大模块入口
   - 热门谣言澄清
   - 最新科普文章
   - 权威来源说明入口
2. 五大模块入口链接正确。
3. 三个列表页能显示对应分类文章。
4. 文章卡片能进入详情页。
5. 详情页包含：
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
6. 字段缺失时页面安全降级。
7. `next/image` 不滥用 `priority`。
8. `npm run build` 通过。

## Codex Prompt

```text
请对 Phase 2 进行整体验收和缺陷修复。

检查范围：
- 首页 /
- /safety
- /nutrition
- /hot-topics
- /myths
- /label-reader
- /about
- /articles/[slug]

请逐项检查：

1. 首页是否包含以下模块：
   - 搜索入口
   - 今日热点解读
   - 五大模块入口
   - 热门谣言澄清
   - 最新科普文章
   - 权威来源说明入口

2. 首页五大模块入口是否链接正确：
   - 食品安全
   - 食品营养
   - 热点解读
   - 标签识读
   - 谣言澄清

3. 三个列表页是否能显示对应分类文章：
   - /safety
   - /nutrition
   - /hot-topics

4. 每张 ArticleCard 是否能点击进入文章详情页。

5. 文章详情页是否包含：
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

6. 字段缺失时页面是否能安全降级，不报错。

7. 检查 next/image：
   - 首屏 LCP 图片可以使用 priority；
   - 不要给所有图片都加 priority。

8. 检查 TypeScript 类型错误、构建错误和明显控制台报错。

9. 不要新增大型依赖。
10. 不要接入数据库。
11. 不要接入 AI 功能。

请运行：
npm run build

如果项目有 lint 脚本，也运行：
npm run lint

最后输出验收总结：
1. 已通过的页面；
2. 修复的问题；
3. 仍建议后续 Phase 处理的问题。
```

---

# Phase 2 完成标准

完成本阶段后，网站应具备以下能力：

1. 首页不再是空白欢迎页，而是具备搜索入口、热点内容、分类入口、谣言澄清、最新文章和可信度说明。
2. 食品安全、食品营养、热点解读三个核心列表页可以正常展示对应文章。
3. 用户可以从首页或列表页进入文章详情页。
4. 文章详情页具备完整科普文章结构。
5. 内容来源、更新时间和免责声明清晰可见。
6. 页面视觉风格统一，移动端基本可用。
7. `npm run build` 通过。

# Phase 2 暂不处理

以下内容留到后续阶段：

1. 真实全文搜索功能。
2. 复杂标签筛选和多条件筛选。
3. MDX 自定义组件体系。
4. 标签识读图片交互或 Canvas 标注。
5. 用户系统、收藏、评论、浏览量统计。
6. 数据库或 CMS 接入。
7. AI 问答或 AI 总结功能。
8. 后台管理系统。
