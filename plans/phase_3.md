# Phase 3：特色交互功能构建任务拆解

本阶段目标是为食品科普网站加入更具差异化的交互功能，包括食品标签识读互动页、谣言澄清卡片页，以及全站搜索与分类筛选能力。建议按任务顺序逐步推进，每完成一个任务后运行构建和基础交互测试，避免一次性修改过多文件导致问题难以定位。

---

## Task 3.1：统一 Phase 3 所需类型定义

### 目标

在现有内容类型基础上，补充食品标签互动、谣言澄清、搜索筛选所需的 TypeScript 类型，避免后续组件中出现松散的 `any` 或重复定义。

### 建议修改文件

- `src/types/content.ts`

### 需要新增或检查的类型

- `LabelHotspot`
- `LabelTutorialCase`
- `MythCard`
- `FilterOption`
- `ContentModule`
- `DifficultyLevel`
- `EvidenceLevel`
- `AttentionLevel`

### 验收标准

- 类型定义集中放在 `src/types/content.ts`
- 食品标签互动、谣言澄清、筛选功能都能复用这些类型
- 不引入 `any`
- `npm run build` 通过

### Codex Prompt

```text
我正在开发一个基于 Next.js + TypeScript + Tailwind CSS 的食品科普网站。现在进入 Phase 3：特色交互功能阶段。请先统一补充 Phase 3 所需的类型定义。

请修改或新增 src/types/content.ts 中的类型定义，要求如下：

1. 检查是否已有 EvidenceLevel、AttentionLevel、ArticleCategory、ArticleMeta、MythCard、LabelCase、LabelRegion、SourceEntry 等类型。如果已有，请尽量复用并保持向后兼容，不要随意破坏已有字段。

2. 新增或补充食品标签互动相关类型：
- LabelHotspot
  - id: string
  - title: string
  - description: string
  - x: number
  - y: number
  - width: number
  - height: number
  - level?: AttentionLevel 或 "基础" | "注意" | "风险"
  - targetKey?: string
- LabelTutorialCase
  - id: string
  - slug: string
  - name: string
  - category: string
  - image: string
  - summary: string
  - difficulty: DifficultyLevel
  - tags: string[]
  - hotspots: LabelHotspot[]

3. 新增或补充搜索筛选相关类型：
- ContentModule: "文章" | "谣言澄清" | "标签教程" 或使用项目中已有的模块命名方式
- DifficultyLevel: "入门" | "进阶" | "专业"
- FilterOption
  - label: string
  - value: string
  - count?: number

4. MythCard 类型至少需要覆盖：
- id
- slug
- claim
- verdict
- explanation
- actionTips
- category
- tags
- difficulty
- evidenceLevel
- attentionLevel
- sources

5. 所有类型使用 export 导出。
6. 不要引入运行时代码，只做类型定义。
7. 保持现有项目命名风格。
8. 修改完成后运行 npm run build，确保类型没有破坏现有代码。
```

---

## Task 3.2：建立食品标签互动案例数据

### 目标

新增食品标签互动教程所需的数据文件，先用 4 个虚拟案例构建 MVP，避免直接使用真实品牌图片带来的版权和商标风险。

### 建议修改文件

- `src/data/labelCases.ts`
- `public/images/labels/`，预留图片路径

### 案例建议

- 风味酸奶
- 果味饮料
- 膨化薯片
- 速冻水饺

### 验收标准

- 每个案例都有完整热点区域
- 热点位置使用百分比定位
- 数据中不出现真实品牌、真实厂家或商标信息
- 后续组件可直接读取该数据渲染页面

### Codex Prompt

```text
请为 Phase 3 的“食品标签识读交互页”新增虚拟食品标签案例数据。

请创建或修改 src/data/labelCases.ts，并完成以下要求：

1. 从 src/types/content.ts 导入 LabelTutorialCase 类型。

2. 导出 labelCases: LabelTutorialCase[]。

3. 创建 4 个虚拟食品标签案例：
- 风味酸奶
- 果味饮料
- 膨化薯片
- 速冻水饺

4. 每个案例必须包含：
- id
- slug
- name
- category
- image
- summary
- difficulty
- tags
- hotspots

5. image 暂时使用以下路径：
- /images/labels/yogurt-label.png
- /images/labels/beverage-label.png
- /images/labels/chips-label.png
- /images/labels/frozen-dumpling-label.png

6. 每个案例至少包含 6 个热点区域，热点区域包括但不限于：
- 食品名称或产品类型
- 配料表
- 营养成分表
- 能量
- 蛋白质
- 脂肪
- 糖或碳水化合物
- 钠
- 保质期
- 储存条件
- 致敏原提示，适用于速冻水饺

7. 每个 hotspot 使用百分比定位：
- x
- y
- width
- height

8. 每个 hotspot 的 description 要体现食品科普价值，例如：
- 配料表通常按加入量从高到低排列
- 钠含量可以帮助判断高盐风险
- 每 100g 和每份含量需要区分
- 速冻食品要关注 -18℃ 储存条件和充分加热

9. 数据必须是中文，不使用真实品牌名、真实商标、真实厂家或真实条码。

10. 如果 public/images/labels/ 目录不存在，请创建目录并放入 .gitkeep 文件，方便后续添加图片。

11. 修改完成后运行 npm run build。
```

---

## Task 3.3：实现食品标签互动基础组件

### 目标

实现食品包装示意图、可点击高亮区域和解释卡片三部分，形成最小可用的标签识读交互模块。

### 建议新增文件

- `src/components/label-learning/LabelTutorial.tsx`
- `src/components/label-learning/LabelImage.tsx`
- `src/components/label-learning/LabelHotspot.tsx`
- `src/components/label-learning/LabelInfoPanel.tsx`

### 验收标准

- 能显示食品标签图片
- 鼠标悬停或点击热点区域时，高亮状态明显变化
- 右侧解释卡片同步更新
- 移动端布局可用
- 组件使用 TypeScript 类型约束

### Codex Prompt

```text
请实现 Phase 3 的食品标签识读交互基础组件。

技术栈：Next.js App Router + TypeScript + Tailwind CSS。

请新增目录：
src/components/label-learning/

并新增以下组件：

1. LabelTutorial.tsx
功能要求：
- 使用 "use client"
- 接收 caseItem?: LabelTutorialCase 作为可选 prop
- 如果没有传入 caseItem，则默认使用 labelCases[0]
- 使用 useState 保存 activeHotspotId
- 布局为响应式 grid：桌面端左侧图片、右侧解释卡片；移动端上下排列
- 渲染 LabelImage 和 LabelInfoPanel

2. LabelImage.tsx
功能要求：
- 接收 caseItem、activeHotspotId、onActivate
- 显示食品标签图片
- 图片容器使用 relative
- 在图片上 absolute 渲染所有 LabelHotspot
- 如果图片暂时不存在，不要导致页面崩溃，可以使用普通 img 或保留 alt 显示

3. LabelHotspot.tsx
功能要求：
- 接收 hotspot、isActive、onActivate
- 使用 button 实现热点区域
- 使用 style 设置 left/top/width/height，单位为百分比
- hover 和 active 状态需要明显：
  - 边框加深
  - 背景色增强
  - scale-105
  - shadow-lg
  - ring 效果
- 支持键盘访问，保留 aria-label

4. LabelInfoPanel.tsx
功能要求：
- 接收 activeHotspot
- 未选中时显示默认提示：点击或悬停标签区域，学习食品标签怎么看
- 选中时显示：level、title、description
- 不同 level 使用不同浅色标签样式：基础、注意、风险

5. 代码要求：
- 从 src/types/content.ts 导入类型
- 从 src/data/labelCases.ts 导入数据
- 不使用 any
- 不引入额外 UI 库
- 保持 Tailwind 风格与现有项目一致

6. 修改完成后运行 npm run build，修复所有类型错误。
```

---

## Task 3.4：新增食品标签识读交互页面

### 目标

创建独立的标签教程入口页面，让用户可以进入完整的交互式标签识读功能。

### 建议新增文件

- `src/app/label-tutorial/page.tsx`

### 验收标准

- 页面可通过 `/label-tutorial` 访问
- 页面包含标题、简介和 `LabelTutorial`
- 页面 SEO metadata 完整
- 移动端与桌面端展示正常

### Codex Prompt

```text
请为食品科普网站新增“食品标签互动阅读教程”页面。

请创建：
src/app/label-tutorial/page.tsx

功能要求：

1. 页面路径为 /label-tutorial。

2. 页面需要包含：
- 标题：食品标签互动阅读教程
- 简介：通过点击食品标签中的重点区域，学习如何理解配料表、营养成分表、保质期和储存条件等信息。
- 嵌入 <LabelTutorial /> 组件

3. 从 src/components/label-learning/LabelTutorial.tsx 导入组件。

4. 添加页面 metadata：
- title: 食品标签互动阅读教程 | 食品科普
- description: 通过交互式食品标签案例学习配料表、营养成分表、保质期和储存条件的阅读方法。

5. 页面样式要求：
- 使用 max-w-6xl 或与项目现有页面一致的容器宽度
- 保持页面上下留白
- 标题、说明文字和交互模块之间有清晰层级

6. 如果项目已有统一 PageHeader 或 SectionHeader 组件，优先复用。

7. 修改完成后运行 npm run build。
```

---

## Task 3.5：支持多个食品标签案例切换

### 目标

在标签教程页面中支持酸奶、饮料、薯片、速冻水饺等案例切换，提升互动页面的实用性。

### 建议修改文件

- `src/components/label-learning/LabelTutorial.tsx`
- 可选新增：`src/components/label-learning/LabelCaseTabs.tsx`

### 验收标准

- 用户可以切换不同案例
- 切换案例后，热点区域和解释卡片同步变化
- 切换时重置当前 activeHotspotId
- 当前案例有明显选中状态

### Codex Prompt

```text
请增强食品标签互动教程组件，使其支持多个标签案例切换。

请修改 src/components/label-learning/LabelTutorial.tsx，并视情况新增：
src/components/label-learning/LabelCaseTabs.tsx

功能要求：

1. 从 src/data/labelCases.ts 读取全部 labelCases。

2. 在 LabelTutorial 中增加 selectedCaseId 状态，用于记录当前选中的案例。

3. 页面上方显示案例切换按钮或 tabs，至少包括：
- 风味酸奶
- 果味饮料
- 膨化薯片
- 速冻水饺

4. 点击某个案例后：
- 更新当前 caseItem
- 重置 activeHotspotId 为 null
- 图片、热点区域、解释卡片同步更新

5. 当前选中的案例按钮需要有明显样式，例如：
- bg-green-600 text-white
- 或项目中已有的 active 样式

6. 保持移动端可用，tabs 在小屏幕下可以横向滚动或换行。

7. 不引入额外依赖。

8. 修改完成后运行 npm run build，并手动检查 /label-tutorial 页面交互是否正常。
```

---

## Task 3.6：实现谣言澄清卡片数据

### 目标

建立谣言澄清内容的数据源，为后续卡片页、筛选和详情页提供稳定数据。

### 建议新增或修改文件

- `src/data/myths.ts`
- `src/types/content.ts`

### 验收标准

- 至少包含 8 条谣言澄清内容
- 每条内容包含流行说法、结论、为什么、普通人怎么做
- 每条内容包含分类、标签、证据等级、关注等级
- 内容不做过度医学诊断或治疗建议

### Codex Prompt

```text
请为食品科普网站新增谣言澄清卡片数据。

请创建或修改：
src/data/myths.ts

要求：

1. 从 src/types/content.ts 导入 MythCard 类型。

2. 导出 mythCards: MythCard[]。

3. 至少创建 8 条中文谣言澄清内容，主题可以包括：
- 隔夜菜一定不能吃吗
- 食品添加剂都不安全吗
- 无糖饮料可以无限喝吗
- 牛奶越香越好吗
- 颜色鲜艳的食品一定有害吗
- 冷冻食品没有营养吗
- 果汁可以替代水果吗
- 低脂食品一定更健康吗

4. 每条 MythCard 至少包含：
- id
- slug
- claim，流行说法
- verdict，结论
- explanation，为什么
- actionTips，普通人怎么做，建议为 string[]
- category
- tags
- difficulty
- evidenceLevel
- attentionLevel
- sources

5. 内容写法要求：
- 面向普通用户
- 结论明确但不过度绝对化
- 尽量使用“通常”“需要结合摄入量和人群情况”等审慎表达
- 不提供疾病诊断或治疗建议

6. 如果 SourceEntry 类型中需要 title、url、publisher 等字段，请按现有类型补齐。

7. 修改完成后运行 npm run build。
```

---

## Task 3.7：实现谣言澄清卡片列表页

### 目标

创建谣言澄清模块页面，以卡片形式展示“流行说法、结论、为什么、普通人怎么做”。

### 建议新增文件

- `src/app/myths/page.tsx`
- `src/components/myths/MythCard.tsx`
- `src/components/myths/MythCardGrid.tsx`

### 验收标准

- `/myths` 页面可访问
- 谣言卡片清晰展示四个核心部分
- 卡片视觉上能区分证据等级和关注等级
- 页面有基础 SEO metadata

### Codex Prompt

```text
请实现 Phase 3 的“谣言澄清卡片页”。

请新增或修改以下文件：
- src/app/myths/page.tsx
- src/components/myths/MythCard.tsx
- src/components/myths/MythCardGrid.tsx

功能要求：

1. /myths 页面展示所有 mythCards。

2. 页面顶部包含：
- 标题：食品谣言澄清
- 简介：用清晰结论和证据等级，帮助用户判断常见食品安全说法是否可靠。

3. MythCard 组件展示以下内容：
- 流行说法 claim
- 结论 verdict
- 为什么 explanation
- 普通人怎么做 actionTips
- category
- tags
- evidenceLevel
- attentionLevel

4. 视觉要求：
- 使用卡片布局
- verdict 要醒目
- evidenceLevel 和 attentionLevel 使用 badge 样式
- actionTips 用简短列表展示

5. MythCardGrid 使用响应式网格：
- 移动端 1 列
- 平板 2 列
- 桌面端 3 列，或按现有设计风格调整

6. 添加页面 metadata：
- title: 食品谣言澄清 | 食品科普
- description: 汇总常见食品安全与营养谣言，用结论、原因和行动建议帮助用户科学判断。

7. 不引入额外依赖。

8. 修改完成后运行 npm run build。
```

---

## Task 3.8：实现谣言澄清分类筛选

### 目标

让用户可以按分类筛选谣言澄清卡片，例如食品安全、营养健康、食品添加剂、储存加工等。

### 建议修改文件

- `src/app/myths/page.tsx`
- `src/components/myths/MythFilters.tsx`
- `src/components/myths/MythCardGrid.tsx`

### 验收标准

- 支持全部分类与单分类筛选
- 筛选状态变化后卡片列表同步更新
- 无结果时显示空状态提示
- 移动端可用

### Codex Prompt

```text
请为谣言澄清卡片页增加分类筛选功能。

请修改或新增：
- src/components/myths/MythFilters.tsx
- src/app/myths/page.tsx
- 必要时修改 src/components/myths/MythCardGrid.tsx

功能要求：

1. 使用 "use client" 的客户端组件处理筛选状态。

2. 从 mythCards 中自动提取所有 category，生成筛选按钮。

3. 筛选按钮包括：
- 全部
- 每一个实际存在的 category

4. 点击某个分类后，只显示对应 category 的 MythCard。

5. 当前选中分类要有明显 active 样式。

6. 如果筛选后没有内容，显示空状态：暂无符合条件的谣言澄清内容。

7. 保持响应式布局，小屏幕下筛选按钮可以换行或横向滚动。

8. 不引入额外依赖。

9. 修改完成后运行 npm run build，并测试 /myths 页面筛选是否正常。
```

---

## Task 3.9：实现统一搜索与多条件筛选数据工具

### 目标

建立统一的搜索与筛选逻辑，为文章、谣言澄清、标签教程等模块提供可复用的数据处理能力。

### 建议新增文件

- `src/lib/search.ts`
- `src/types/content.ts`

### 验收标准

- 可按关键词搜索
- 可按模块筛选
- 可按标签筛选
- 可按难度筛选
- 可按证据等级筛选
- 可按关注等级筛选
- 搜索逻辑不依赖具体 UI 组件

### Codex Prompt

```text
请为食品科普网站实现统一搜索与多条件筛选的数据工具函数。

请新增：
src/lib/search.ts

功能要求：

1. 定义一个统一的 SearchableContent 数据结构，或者复用 src/types/content.ts 中已有类型。

2. SearchableContent 至少应包含：
- id
- title
- summary
- module
- href
- tags
- difficulty
- evidenceLevel，可选
- attentionLevel，可选
- category，可选

3. 在 src/lib/search.ts 中实现：
- normalizeText(input: string): string
- matchesKeyword(item, keyword): boolean
- filterByModule(items, module)
- filterByTag(items, tag)
- filterByDifficulty(items, difficulty)
- filterByEvidenceLevel(items, evidenceLevel)
- filterByAttentionLevel(items, attentionLevel)
- filterContents(items, filters)

4. filterContents 支持组合筛选：
- keyword
- module
- tag
- difficulty
- evidenceLevel
- attentionLevel

5. 搜索范围至少覆盖：
- title
- summary
- tags
- category

6. 代码要求：
- 使用 TypeScript
- 不使用 any
- 不依赖 React
- 保持纯函数，方便测试

7. 如果需要，请在 src/types/content.ts 中补充 SearchFilters 和 SearchableContent 类型。

8. 修改完成后运行 npm run build。
```

---

## Task 3.10：构建统一搜索内容索引

### 目标

将文章、谣言澄清、标签教程等数据转换成统一搜索索引，供搜索页调用。

### 建议新增文件

- `src/data/searchIndex.ts`

### 验收标准

- 至少整合谣言澄清和标签教程数据
- 每条搜索结果都有标题、摘要、模块、链接和标签
- 后续文章数据可继续接入

### Codex Prompt

```text
请为网站新增统一搜索索引数据文件。

请创建：
src/data/searchIndex.ts

功能要求：

1. 从以下数据源导入内容：
- src/data/myths.ts 中的 mythCards
- src/data/labelCases.ts 中的 labelCases
- 如果项目已有 articles 或 knowledge 数据，也请一并接入；如果没有，不要强行创建假文章数据。

2. 将不同数据源映射为统一的 SearchableContent[]。

3. 每条 SearchableContent 至少包含：
- id
- title
- summary
- module
- href
- tags
- difficulty
- evidenceLevel，可选
- attentionLevel，可选
- category，可选

4. 链接规则建议：
- 谣言澄清：/myths 或 /myths/[slug]，如果详情页还没有实现，暂时使用 /myths
- 标签教程：/label-tutorial 或 /label-tutorial/[slug]，如果详情页还没有实现，暂时使用 /label-tutorial

5. 导出 searchIndex。

6. 不要在这里写 UI 逻辑。

7. 修改完成后运行 npm run build。
```

---

## Task 3.11：实现搜索与分类筛选页面

### 目标

创建统一搜索页面，支持按模块、标签、难度、证据等级、关注等级进行筛选。

### 建议新增文件

- `src/app/search/page.tsx`
- `src/components/search/SearchPanel.tsx`
- `src/components/search/SearchResultCard.tsx`
- `src/components/search/SearchFilters.tsx`

### 验收标准

- `/search` 页面可访问
- 支持关键词搜索
- 支持模块、标签、难度、证据等级、关注等级筛选
- 筛选结果实时更新
- 搜索结果卡片能跳转到对应模块页面

### Codex Prompt

```text
请实现食品科普网站的统一搜索与分类筛选页面。

请新增或修改以下文件：
- src/app/search/page.tsx
- src/components/search/SearchPanel.tsx
- src/components/search/SearchResultCard.tsx
- src/components/search/SearchFilters.tsx

功能要求：

1. /search 页面展示统一搜索功能。

2. 从 src/data/searchIndex.ts 导入 searchIndex。

3. 从 src/lib/search.ts 导入 filterContents。

4. SearchPanel 使用 "use client"，管理以下筛选状态：
- keyword
- module
- tag
- difficulty
- evidenceLevel
- attentionLevel

5. 页面支持：
- 文本搜索框
- 按模块筛选
- 按标签筛选
- 按难度筛选
- 按证据等级筛选
- 按关注等级筛选

6. 筛选选项应尽量从 searchIndex 自动提取，避免手写重复数据。

7. SearchResultCard 展示：
- title
- summary
- module
- category
- tags
- difficulty
- evidenceLevel，如果有
- attentionLevel，如果有
- 点击后跳转到 href

8. 无结果时显示：没有找到符合条件的内容。

9. 添加页面 metadata：
- title: 搜索食品科普内容 | 食品科普
- description: 按模块、标签、难度、证据等级和关注等级搜索食品安全与营养科普内容。

10. 不引入额外依赖。

11. 修改完成后运行 npm run build，并测试 /search 页面。
```

---

## Task 3.12：为标签教程与谣言澄清增加导航入口

### 目标

将 Phase 3 新增页面接入网站导航，确保用户能从首页或 Header 进入这些模块。

### 建议修改文件

根据项目实际结构搜索并修改：

- `src/components/Header.tsx`
- `src/components/Navbar.tsx`
- `src/components/layout/Header.tsx`
- `src/app/page.tsx`

### 验收标准

- Header 或导航中可以进入 `/label-tutorial`
- Header 或导航中可以进入 `/myths`
- Header 或导航中可以进入 `/search`
- 移动端导航不溢出

### Codex Prompt

```text
请将 Phase 3 新增页面接入网站导航。

需要接入的页面：
- /label-tutorial，名称：标签教程
- /myths，名称：谣言澄清
- /search，名称：搜索

请先搜索项目中的导航相关文件，例如：
- Header
- Navbar
- Navigation
- nav
- layout

然后按现有项目结构修改对应组件。

要求：

1. 不要重复创建新的 Header，优先修改现有导航组件。
2. 保持现有导航风格。
3. 桌面端导航不应过度拥挤，如果已有内容较多，可以把 Phase 3 页面放入“内容导航”或“学习工具”下拉菜单中。
4. 移动端导航也要能访问这些页面。
5. 当前页面 active 状态如果项目已有实现，请补充对应路径。
6. 修改完成后运行 npm run build。
```

---

## Task 3.13：增强食品标签互动页的可访问性与移动端体验

### 目标

确保热点按钮、解释卡片和移动端触控体验可用，避免交互只适合桌面鼠标用户。

### 建议修改文件

- `src/components/label-learning/LabelHotspot.tsx`
- `src/components/label-learning/LabelImage.tsx`
- `src/components/label-learning/LabelInfoPanel.tsx`

### 验收标准

- 热点可以通过 Tab 聚焦
- Enter 或 Space 可以触发热点
- 移动端点击热点后解释卡片可读
- 热点区域有 aria-label
- 图片有合理 alt 文本

### Codex Prompt

```text
请增强食品标签互动页的可访问性和移动端体验。

请重点检查并修改：
- src/components/label-learning/LabelHotspot.tsx
- src/components/label-learning/LabelImage.tsx
- src/components/label-learning/LabelInfoPanel.tsx

要求：

1. 每个热点必须使用 button，而不是 div。

2. 每个热点必须有 aria-label，内容使用 hotspot.title。

3. button 支持键盘访问：
- Tab 可以聚焦
- Enter 或 Space 可以触发

4. focus 状态要明显，例如：
- focus-visible:ring-2
- focus-visible:ring-green-600
- focus-visible:ring-offset-2

5. 图片必须有 alt 文本，优先使用 caseItem.name。

6. 在移动端，热点点击后解释卡片内容要容易看到。如果当前布局中解释卡片在图片下方，请确保间距合理；如果需要，可以在激活热点后让解释卡片有明显边框或高亮。

7. 不要破坏原有 hover 和 active 动效。

8. 修改完成后运行 npm run build。
```

---

## Task 3.14：为 Phase 3 页面补充空状态、错误兜底和缺图兜底

### 目标

提升页面健壮性，避免数据为空、图片缺失、筛选无结果时出现空白页面或运行错误。

### 建议修改文件

- `src/components/label-learning/LabelImage.tsx`
- `src/components/label-learning/LabelTutorial.tsx`
- `src/components/myths/MythCardGrid.tsx`
- `src/components/search/SearchPanel.tsx`

### 验收标准

- labelCases 为空时有提示
- mythCards 为空时有提示
- searchIndex 为空时有提示
- 图片缺失时有视觉占位
- 不出现运行时崩溃

### Codex Prompt

```text
请为 Phase 3 相关页面补充空状态、错误兜底和缺图兜底。

涉及功能：
- 食品标签互动页
- 谣言澄清卡片页
- 搜索与筛选页

请检查并修改以下文件：
- src/components/label-learning/LabelImage.tsx
- src/components/label-learning/LabelTutorial.tsx
- src/components/myths/MythCardGrid.tsx
- src/components/search/SearchPanel.tsx

要求：

1. 如果 labelCases 为空，/label-tutorial 页面不要报错，应显示：暂无食品标签案例。

2. 如果某个 caseItem 没有 hotspots，应显示：该案例暂无可交互区域。

3. 如果图片无法正常显示，应有一个简洁占位区域，提示：标签示意图待补充。不要让页面崩溃。

4. 如果 mythCards 为空，/myths 页面显示：暂无谣言澄清内容。

5. 如果筛选后没有结果，显示明确空状态，不要只显示空白。

6. 如果 searchIndex 为空，/search 页面显示：暂无可搜索内容。

7. 所有兜底 UI 保持 Tailwind 风格，与现有视觉一致。

8. 修改完成后运行 npm run build。
```

---

## Task 3.15：Phase 3 集成测试与构建检查

### 目标

在 Phase 3 完成后进行一次系统性检查，确保新增交互功能不破坏既有页面。

### 建议检查内容

- `/label-tutorial`
- `/myths`
- `/search`
- 首页导航
- 移动端布局
- 构建结果

### 验收标准

- `npm run build` 通过
- 所有新增页面可访问
- 主要交互可用
- 控制台无明显错误
- 无 TypeScript 报错

### Codex Prompt

```text
请对 Phase 3 的新增功能做一次集成检查和修复。

检查范围：
- 食品标签互动页 /label-tutorial
- 谣言澄清卡片页 /myths
- 搜索与筛选页 /search
- Header 或导航入口
- 移动端布局

请执行以下步骤：

1. 运行 npm run build，记录并修复所有 TypeScript 或构建错误。

2. 检查 /label-tutorial：
- 页面是否能打开
- 案例切换是否正常
- 热点 hover/click 是否正常
- 解释卡片是否同步更新
- 图片缺失时是否有兜底

3. 检查 /myths：
- 卡片是否正常展示
- 分类筛选是否正常
- 证据等级和关注等级 badge 是否正常
- 无结果状态是否正常

4. 检查 /search：
- 关键词搜索是否正常
- 模块筛选是否正常
- 标签筛选是否正常
- 难度筛选是否正常
- 证据等级和关注等级筛选是否正常
- 搜索结果链接是否可点击

5. 检查导航：
- 桌面端可进入 /label-tutorial、/myths、/search
- 移动端可进入这些页面
- 不破坏现有导航样式

6. 不要重构无关代码。
7. 只修复 Phase 3 相关问题。
8. 最后再次运行 npm run build，确保通过。
```

---

# 推荐执行顺序

建议按以下顺序交给 Codex：

1. Task 3.1：统一类型定义
2. Task 3.2：建立标签案例数据
3. Task 3.3：实现标签互动基础组件
4. Task 3.4：新增标签教程页面
5. Task 3.5：支持多个标签案例切换
6. Task 3.6：实现谣言澄清数据
7. Task 3.7：实现谣言澄清列表页
8. Task 3.8：实现谣言澄清分类筛选
9. Task 3.9：实现搜索筛选工具函数
10. Task 3.10：构建统一搜索索引
11. Task 3.11：实现搜索页面
12. Task 3.12：增加导航入口
13. Task 3.13：增强可访问性与移动端体验
14. Task 3.14：补充空状态和兜底
15. Task 3.15：集成测试与构建检查

---

# Phase 3 完成后的预期效果

完成后，网站应新增以下能力：

- 用户可以进入食品标签互动教程页，点击食品标签中的重点区域学习标签识读方法。
- 用户可以浏览食品谣言澄清卡片，快速看到流行说法、结论、解释和行动建议。
- 用户可以按模块、标签、难度、证据等级和关注等级搜索内容。
- 新增页面能从导航入口访问，并具有基础 SEO metadata。
- 交互功能具备基本移动端适配和可访问性支持。
