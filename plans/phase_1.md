请在当前项目的 frontend/ 目录中开发前端。

当前阶段是 Phase 1：项目基础与信息架构。

Task 1：初始化项目结构
Task 2：建立基础页面路由
Task 3：建立全局布局和顶部导航
Task 4：建立内容类型定义
Task 5：建立本地内容数据目录
Task 6：建立文章读取工具
Task 7：建立列表页通用组件
Task 8：建立基础样式和设计规范

Task4:


请为食品科普网站建立可扩展的内容类型定义。

背景：
本网站不只包含文章，还会包含漫画、视频、图解、谣言卡片、标签识读案例等多种内容形态。
因此不要把所有内容都统一为 Article。
请采用“统一基础元数据 + 不同内容类型扩展”的设计。

要求：

1. 在 types/content.ts 中定义基础类型：

   - EvidenceLevel
   - AttentionLevel
   - ContentCategory
   - ContentFormat
   - BaseContentMeta
2. 定义具体内容类型：

   - ArticleContent
   - ComicContent
   - VideoContent
   - InfographicContent
   - MythCard
   - LabelRegion
   - LabelCase
   - SourceEntry
3. 定义联合类型：

   - ContentItem
4. 类型要支持以下内容：

   文章，漫画、视频、图解、谣言卡片、标签识读案例等多种内容形态
5. 不要实现页面展示。
6. 不要写读取文件逻辑。
7. 不要接入数据库。
8. 不要接入 AI。
9. 保持类型适合第一版本地 Markdown / JSON 使用，同时保留后续扩展能力。

验收标准：

1. TypeScript 类型无报错。
2. 类型命名清晰。
3. 每个主要类型都有简短注释。
4. npm run build 可以通过。
5. 不要修改无关文件。

Task5:

请建立第一版本地内容数据目录和示例内容。

要求：

1. 在 content/ 下建立：
   - safety
   - nutrition
   - hot-topics
2. 每个目录下添加 1 篇示例 MDX 文章。
3. 每篇文章需要包含 frontmatter：
   - slug
   - title
   - description
   - category
   - tags
   - evidenceLevel
   - attentionLevel
   - updatedAt
   - sourceIds
4. 在 data/ 下新增：
   - myths.json
   - label_cases.json
   - sources.json
   - categories.json
5. myths.json 至少包含 3 条谣言卡片。
6. label_cases.json 至少包含 1 个标签识读案例，包含配料表、营养成分表、宣称语 3 个 region。
7. sources.json 至少包含 5 个权威来源条目。
8. 内容可以是简短示例，但结构必须完整。
9. 不要实现读取逻辑。
10. 不要实现页面展示。

验收标准：

1. 所有 JSON 文件格式合法。
2. MDX frontmatter 字段完整。
3. 示例内容符合食品科普网站定位。
4. npm run build 可以通过。

   Task6:

请实现本地内容读取工具。

要求：

1. 新增 lib/articles.ts，用于读取 content 下的 MDX 文章元数据。
2. 新增 lib/myths.ts，用于读取 data/myths.json。
3. 新增 lib/labelCases.ts，用于读取 data/label_cases.json。
4. 新增 lib/sources.ts，用于读取 data/sources.json。
5. 函数需要使用 types/content.ts 中的类型。
6. 暂时只需要读取元数据和 JSON，不需要完整渲染复杂 MDX 内容。
7. 如果读取失败，应返回空数组或抛出清晰错误。
8. 不要实现页面 UI。
9. 不要引入数据库。
10. 不要接入 AI。

验收标准：

1. TypeScript 类型检查通过。
2. npm run build 可以通过。
3. 每个工具文件至少导出 1–3 个清晰函数。
4. 请说明这些函数如何被页面使用。

Task7:

请建立食品科普网站的基础展示组件。

要求：

1. 新增 ArticleCard 组件，用于展示文章标题、描述、分类、标签、证据等级、关注等级、更新时间。
2. 新增 MythCard 组件，用于展示谣言说法、结论、解释、建议。
3. 新增 SourceCard 组件，用于展示权威来源名称、类型、说明和链接。
4. 新增 SectionHeader 组件，用于页面分区标题。
5. 新增 Badge 组件，用于展示分类、证据等级、关注等级等标签。
6. 使用 Tailwind CSS。
7. 不要引入 UI 组件库。
8. 不要实现页面数据读取。
9. 不要实现搜索和筛选。

验收标准：

1. 所有组件类型明确。
2. 组件可复用。
3. 样式统一。
4. npm run build 可以通过。

Task8:

请将本地内容显示到对应页面。

要求：

1. /safety 页面显示食品安全类文章。
2. /nutrition 页面显示食品营养类文章。
3. /hot-topics 页面显示热点解读类文章。
4. /myths 页面显示 myths.json 中的谣言卡片。
5. /label-reader 页面暂时显示 label_cases.json 中的案例标题列表，不实现图片交互。
6. /about 页面显示网站定位和权威来源说明。
7. 使用已有 ArticleCard、MythCard、SourceCard 组件。
8. 不要实现搜索。
9. 不要实现标签筛选。
10. 不要实现 AI 功能。
11. 不要实现标签识读 Canvas 交互。

验收标准：

1. 各页面能正确显示对应内容。
2. 页面没有硬编码重复数据。
3. 数据来自 content/ 或 data/。
4. npm run build 可以通过。
