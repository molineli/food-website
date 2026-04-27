# AGENTS.md

本文件用于指导 Codex 或其他 AI coding agent 在本项目中进行开发。当前重点阶段为 **Phase 3：特色交互功能**，包括食品标签识读交互页、谣言澄清卡片页、统一搜索与分类筛选能力。

---

## 1. 项目背景

本项目是一个食品科普网站，主要面向普通用户，目标是用清晰、可信、易交互的方式解释食品安全、营养标签、食品谣言与日常饮食判断方法。

Phase 3 的核心目标是增强网站的差异化体验：

- 食品标签识读交互页：通过可点击热点区域帮助用户学习配料表、营养成分表、保质期、储存条件等信息。
- 谣言澄清卡片页：用“流行说法、结论、为什么、普通人怎么做”的结构解释常见食品安全与营养误区。
- 搜索与分类筛选：支持按模块、标签、难度、证据等级、关注等级筛选内容。

---

## 2. 技术栈约定

默认技术栈：

- Next.js App Router
- TypeScript
- Tailwind CSS
- React Client Components for interactive UI

开发时应遵守：

- 不引入额外 UI 库，除非明确要求。
- 不使用 `any`。
- 优先复用现有组件、布局、类型和样式体系。
- 不重构无关代码。
- 不破坏已有页面、导航和数据结构。
- 每完成一个任务后运行 `npm run build`。

---

## 3. 目录与文件约定

Phase 3 推荐使用以下结构。若项目已有等价结构，应优先复用现有位置，而不是重复创建。

```text
src/
  app/
    label-tutorial/
      page.tsx
    myths/
      page.tsx
    search/
      page.tsx

  components/
    label-learning/
      LabelTutorial.tsx
      LabelImage.tsx
      LabelHotspot.tsx
      LabelInfoPanel.tsx
      LabelCaseTabs.tsx

    myths/
      MythCard.tsx
      MythCardGrid.tsx
      MythFilters.tsx

    search/
      SearchPanel.tsx
      SearchFilters.tsx
      SearchResultCard.tsx

  data/
    labelCases.ts
    myths.ts
    searchIndex.ts

  lib/
    search.ts

  types/
    content.ts

public/
  images/
    labels/
      .gitkeep
```

---

## 4. 内容与版权约束

食品标签互动案例必须使用虚拟食品案例，不应使用真实品牌、真实厂家、真实商标或真实条码。

允许使用的案例方向：

- 风味酸奶
- 果味饮料
- 膨化薯片
- 速冻水饺

食品标签数据可以参考真实标签结构，但必须重写为虚拟内容。图片路径可以先使用占位路径：

```text
/images/labels/yogurt-label.png
/images/labels/beverage-label.png
/images/labels/chips-label.png
/images/labels/frozen-dumpling-label.png
```

如果图片暂未提供，页面必须有缺图兜底，不得崩溃。

---

## 5. 类型定义要求

所有 Phase 3 相关类型应集中维护在：

```text
src/types/content.ts
```

需要支持或补充以下类型：

- `EvidenceLevel`
- `AttentionLevel`
- `DifficultyLevel`
- `ContentModule`
- `FilterOption`
- `LabelHotspot`
- `LabelTutorialCase`
- `MythCard`
- `SearchableContent`
- `SearchFilters`

若已有相似类型，优先复用并保持向后兼容。不要随意删除、重命名或改变已有字段。

---

## 6. 食品标签互动页开发要求

### 6.1 页面路径

食品标签互动页路径：

```text
/label-tutorial
```

页面文件：

```text
src/app/label-tutorial/page.tsx
```

页面应包含：

- 页面标题：食品标签互动阅读教程
- 简短说明
- `<LabelTutorial />` 组件
- 基础 SEO metadata

### 6.2 组件要求

核心组件：

```text
src/components/label-learning/LabelTutorial.tsx
src/components/label-learning/LabelImage.tsx
src/components/label-learning/LabelHotspot.tsx
src/components/label-learning/LabelInfoPanel.tsx
```

功能要求：

- 使用食品包装示意图作为交互主体。
- 在图片上用百分比定位渲染热点区域。
- 鼠标 hover 或点击热点时，右侧解释卡片同步更新。
- 支持多个案例切换。
- 切换案例时重置当前选中热点。
- 桌面端建议左图右文，移动端上下排列。

### 6.3 热点交互要求

`LabelHotspot` 必须使用 `button`，不能使用纯 `div` 充当按钮。

热点区域必须支持：

- `aria-label`
- Tab 聚焦
- Enter 或 Space 触发
- 明显 hover 样式
- 明显 active 样式
- 明显 focus-visible 样式

推荐样式方向：

```text
hover:scale-105
hover:shadow-lg
focus-visible:ring-2
focus-visible:ring-green-600
focus-visible:ring-offset-2
transition-all duration-300
```

---

## 7. 谣言澄清页开发要求

### 7.1 页面路径

谣言澄清页路径：

```text
/myths
```

页面文件：

```text
src/app/myths/page.tsx
```

页面应包含：

- 页面标题：食品谣言澄清
- 页面简介
- 谣言澄清卡片列表
- 分类筛选
- 基础 SEO metadata

### 7.2 数据要求

谣言数据文件：

```text
src/data/myths.ts
```

至少包含 8 条中文谣言澄清内容。推荐主题：

- 隔夜菜一定不能吃吗
- 食品添加剂都不安全吗
- 无糖饮料可以无限喝吗
- 牛奶越香越好吗
- 颜色鲜艳的食品一定有害吗
- 冷冻食品没有营养吗
- 果汁可以替代水果吗
- 低脂食品一定更健康吗

每条内容应包含：

- `id`
- `slug`
- `claim`
- `verdict`
- `explanation`
- `actionTips`
- `category`
- `tags`
- `difficulty`
- `evidenceLevel`
- `attentionLevel`
- `sources`

内容表达应面向普通用户，结论明确但不过度绝对化。避免医学诊断、治疗建议或恐吓式表达。

### 7.3 卡片结构

每张谣言卡片应展示：

- 流行说法
- 结论
- 为什么
- 普通人怎么做
- 分类
- 标签
- 证据等级
- 关注等级

视觉要求：

- `verdict` 需要醒目。
- `evidenceLevel` 和 `attentionLevel` 使用 badge 样式。
- `actionTips` 使用简短列表。
- 列表使用响应式网格。

---

## 8. 搜索与筛选开发要求

### 8.1 页面路径

统一搜索页路径：

```text
/search
```

页面文件：

```text
src/app/search/page.tsx
```

页面应包含：

- 搜索框
- 模块筛选
- 标签筛选
- 难度筛选
- 证据等级筛选
- 关注等级筛选
- 搜索结果列表
- 空状态提示
- 基础 SEO metadata

### 8.2 搜索工具函数

搜索逻辑文件：

```text
src/lib/search.ts
```

应实现纯函数，不依赖 React：

- `normalizeText(input: string): string`
- `matchesKeyword(item, keyword)`
- `filterByModule(items, module)`
- `filterByTag(items, tag)`
- `filterByDifficulty(items, difficulty)`
- `filterByEvidenceLevel(items, evidenceLevel)`
- `filterByAttentionLevel(items, attentionLevel)`
- `filterContents(items, filters)`

搜索范围至少覆盖：

- title
- summary
- tags
- category

### 8.3 搜索索引

统一搜索索引文件：

```text
src/data/searchIndex.ts
```

至少整合：

- `src/data/myths.ts`
- `src/data/labelCases.ts`

若项目已有文章或知识库数据，也应接入；如果没有，不要强行创建假文章数据。

---

## 9. 导航接入要求

Phase 3 新增页面必须接入网站导航：

- `/label-tutorial`：标签教程
- `/myths`：谣言澄清
- `/search`：搜索

修改前应先搜索现有导航文件，例如：

```text
Header
Navbar
Navigation
nav
layout
```

要求：

- 不重复创建新的 Header。
- 保持现有导航风格。
- 桌面端不要过度拥挤。
- 如果已有内容较多，可放入“内容导航”或“学习工具”下拉菜单。
- 移动端也必须能访问新增页面。

---

## 10. 空状态与兜底要求

所有 Phase 3 页面都必须具备基础兜底能力。

食品标签互动页：

- `labelCases` 为空时显示：暂无食品标签案例。
- 当前案例没有 `hotspots` 时显示：该案例暂无可交互区域。
- 图片缺失时显示：标签示意图待补充。

谣言澄清页：

- `mythCards` 为空时显示：暂无谣言澄清内容。
- 筛选无结果时显示明确空状态。

搜索页：

- `searchIndex` 为空时显示：暂无可搜索内容。
- 搜索无结果时显示：没有找到符合条件的内容。

不得因为数据为空或图片缺失导致运行时报错。

---

## 11. SEO metadata 要求

新增页面应补充 metadata。

推荐值：

```ts
// /label-tutorial
title: "食品标签互动阅读教程 | 食品科普"
description: "通过交互式食品标签案例学习配料表、营养成分表、保质期和储存条件的阅读方法。"

// /myths
title: "食品谣言澄清 | 食品科普"
description: "汇总常见食品安全与营养谣言，用结论、原因和行动建议帮助用户科学判断。"

// /search
title: "搜索食品科普内容 | 食品科普"
description: "按模块、标签、难度、证据等级和关注等级搜索食品安全与营养科普内容。"
```

---

## 12. 推荐执行顺序

请按以下顺序推进 Phase 3，避免功能之间依赖混乱：

1. 统一 Phase 3 类型定义
2. 建立食品标签互动案例数据
3. 实现食品标签互动基础组件
4. 新增食品标签互动页面
5. 支持多个食品标签案例切换
6. 实现谣言澄清数据
7. 实现谣言澄清卡片列表页
8. 实现谣言澄清分类筛选
9. 实现统一搜索与多条件筛选工具函数
10. 构建统一搜索索引
11. 实现搜索与分类筛选页面
12. 为标签教程、谣言澄清、搜索增加导航入口
13. 增强食品标签互动页的可访问性与移动端体验
14. 补充空状态、错误兜底和缺图兜底
15. Phase 3 集成测试与构建检查

---

## 13. 构建与测试要求

每完成一个任务后，至少运行：

```bash
npm run build
```

Phase 3 完成后需要检查：

```text
/label-tutorial
/myths
/search
首页导航
移动端布局
```

具体检查项：

- 页面是否能正常打开。
- 标签案例切换是否正常。
- 热点 hover/click 是否正常。
- 解释卡片是否同步更新。
- 谣言分类筛选是否正常。
- 搜索关键词与多条件筛选是否正常。
- 搜索结果链接是否可点击。
- 图片缺失时是否有兜底。
- 筛选无结果时是否有空状态。
- 控制台是否存在明显错误。
- TypeScript 是否报错。

---

## 14. Codex 执行约束

执行任务时请遵守：

- 先阅读现有项目结构，再修改文件。
- 不要一次性重构大量无关代码。
- 不要删除已有内容类型或已有数据字段。
- 不要引入真实品牌标签图。
- 不要引入额外依赖。
- 不要使用 `any`。
- 不要忽略移动端。
- 不要只做 UI，不接入真实数据。
- 不要只新增页面而不接入导航。
- 不要在没有兜底的情况下假设数据一定存在。

---

## 15. 完成标准

Phase 3 完成后，网站应具备以下能力：

- 用户可以在 `/label-tutorial` 中通过点击食品标签热点学习标签识读方法。
- 用户可以在 `/myths` 中浏览并筛选食品谣言澄清卡片。
- 用户可以在 `/search` 中按关键词、模块、标签、难度、证据等级和关注等级搜索内容。
- 新增页面可以从导航访问。
- 新增页面具备基础 SEO metadata。
- 页面具有移动端适配、键盘可访问性和空状态兜底。
- `npm run build` 通过。
