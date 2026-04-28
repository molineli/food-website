# Phase 3：特色交互功能构建任务拆解

本阶段目标是为食品科普网站加入更具差异化的交互功能，包括食品标签识读互动页、谣言澄清卡片页，以及全站搜索与分类筛选能力。建议按任务顺序逐步推进，每完成一个任务后运行构建和基础交互测试，避免一次性修改过多文件导致问题难以定位。

> 当前仓库的实际 Next.js 项目位于 `frontend/` 目录下，因此本计划中的 App Router、组件、类型、数据、public 静态资源路径均以 `frontend/` 为根。构建命令统一在 `frontend` 目录执行：`cd frontend && npm run build`。
>
> 标签识读模块保留两层页面：`/label-reader` 是现有标签识读卡片列表页；`/label-tutorial` 是用户从某张标签识别卡片点入后的交互式详情/教程页。两者职责不同，不互相替代。

---

## Task 3.1：修改谣言澄清卡片展示样式

### 目标

将谣言澄清卡片从原本所有内容都展示在静态卡片里的样式，改为可翻转卡片。卡片正面用于快速浏览核心判断，背面用于阅读解释和普通消费者建议，同时调整文字位置、字号、间距和卡片高度，确保列表页与复用场景都保持清晰、稳定、可访问。

### 建议修改文件

- `frontend/components/myth-card.tsx`
- 必要时检查 `frontend/app/myths/page.tsx`
- 必要时检查 `frontend/components/myth-carousel.tsx`

### 展示与交互要求

- 卡片正面展示图片、`verdict`、`evidenceLevel`、`attentionLevel`、标签、`claim`，以及 `title` 或 `description` 的简短说明。
- 卡片背面展示 `explanation` 和 `consumerAdvice`。
- `explanation` 和 `consumerAdvice` 不再直接铺在静态卡片正面。
- 翻转交互需要支持桌面端 hover、键盘 focus-within，并兼顾移动端点击或聚焦查看背面。
- 卡片中应有可聚焦元素或按钮用于承载交互，focus-visible 样式必须明显。
- 不要用纯 `div` 伪装按钮，不要破坏屏幕阅读器读取核心内容。
- 正面内容层级更清晰，`claim` 更醒目，badge 区域不要过度拥挤。
- 背面说明文字使用适合阅读的行高和字号，`consumerAdvice` 使用醒目的浅色提示块。
- 固定或稳定卡片高度，避免翻转时页面跳动；移动端不能出现文字溢出、遮挡或卡片过高失控。
- 不引入额外 UI 库，不使用 `any`，不重构无关代码。

### 验收标准

- `/myths` 页面卡片正面不再一次性展示全部解释和建议。
- hover 或聚焦卡片后能看到 `explanation` 和 `consumerAdvice`。
- 键盘 Tab 可访问卡片交互，focus 样式明显。
- 移动端布局不溢出、不遮挡。
- `MythCarousel` 复用 `MythCard` 时展示正常。
- `cd frontend && npm run build` 通过

### Codex Prompt

```text
我正在开发一个基于 Next.js + TypeScript + Tailwind CSS 的食品科普网站。现在需要修改 Phase 3 的谣言澄清卡片展示样式。

请修改 frontend/components/myth-card.tsx，将原本所有内容都展示在静态卡片里的样式，改为翻转卡片。

要求如下：

1. 保持现有 MythCard 组件的 props 和数据来源不变，不要修改 myths.json 的字段结构。
2. 卡片正面展示：
- myth.image
- verdict badge
- evidenceLevel badge
- attentionLevel badge
- tags
- myth.claim
- myth.title 或 myth.description 的简短说明

3. 卡片背面展示：
- 每个卡片背面标题为“科学解释是怎样的呢？”
- myth.explanation
- myth.consumerAdvice
- 除这三部分之外不要添加其他任何元素

4. explanation 和 consumerAdvice 必须从正面移到背面，不要再直接铺在静态卡片正面。
5. 翻转交互需要支持：
- hover 翻转，鼠标位于卡片区域内即进行翻转

6. 卡片必须保持可访问性：
- 卡片中应有可聚焦元素或按钮用于触发/承载交互
- focus-visible 样式明显
- 不要用纯 div 伪装按钮
- 不要破坏屏幕阅读器读取核心内容

7. 样式调整要求：
- 不要调整卡片的现有外观样式，只需要文字的布局和大小
- 正面内容层级更清晰，claim 更醒目
- 背面 explanation 使用适合阅读的行高和字号
- consumerAdvice 使用醒目的浅色提示块
- 固定或稳定卡片高度，避免翻转时页面跳动
- 移动端不能出现文字溢出、遮挡或卡片过高失控

8. 检查 frontend/app/myths/page.tsx 和 frontend/components/myth-carousel.tsx，确保 MythCard 改成翻转卡片后，在谣言列表页和首页轮播/复用场景中都能正常显示。
9. 不引入额外 UI 库。
10. 不使用 any。
11. 不重构无关代码。
12. 修改完成后运行 cd frontend && npm run build，确保构建通过。
```

---

# Phase 3 完成后的预期效果

完成后，网站应新增以下能力：

- 用户可以进入食品标签互动教程页，点击食品标签中的重点区域学习标签识读方法。
- 用户可以浏览食品谣言澄清卡片，快速看到流行说法、结论、解释和行动建议。
- 用户可以按模块、标签、难度、证据等级和关注等级搜索内容。
- 新增页面能从导航入口访问，并具有基础 SEO metadata。
- 交互功能具备基本移动端适配和可访问性支持。
