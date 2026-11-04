# 设计师级海报 Skill

[English](README.md) · **中文**

**在线使用：**[https://www.summagraph.com/poster](https://www.summagraph.com/poster)

一个海报生成 Agent Skill，能把任意形式的文本转化为生产级、设计师水准的海报。

![20 种海报风格，按 4 行 5 列网格排列](examples/poster-grid-zh.jpg)

输入文本可以是整理好的结构化信息，也可以是任意形式的文章，它会分析源内容、自动组织信息、推荐视觉风格、撰写精细的图像 prompt，然后调用宿主 agent 已具备的图像生成 skill 或工具来渲染最终海报。


---

## 特性

- **内容分析** —— 从 markdown、原始文本中提取标题、CTA、元信息、视觉主体、基调与信息优先级。
- **自动构图** —— 根据内容、内容密度、视觉主体、渠道和长宽比自动组织信息。
- **20 种视觉风格** —— 用户可以指定审美方向，未指定时会根据用户的文本内容推荐可选风格。
- **多语言** —— 支持中文、英文、日文等多种语言海报。
- **多比例** —— 支持 1:1、4:5、2:3、3:4、9:16、16:9。
- **全链路日志保留** —— 保留 `source.md -> analysis.md -> structured-content.md -> prompts/poster.md -> poster.png` 的产物链路，便于复盘与迭代。

---

## 环境要求

**宿主 agent 必须能调用至少一种图像生成能力**

---

## 在 Claude Code 中使用

### 1. 安装

将完整仓库克隆到 Claude Code 的 skills 目录：

```bash
git clone https://github.com/howardz27/poster-generator-skill.git \
  ~/.claude/skills/poster-generator
```

确保 Claude Code 也能访问[环境要求](#环境要求)中描述的图像生成 skill 或工具，然后重启 Claude Code 让 skill 被发现。

### 2. 调用

用自然语言描述你要什么，把内容直接贴给它：

```text
/poster-generator 帮我做一张这个活动的海报，竖版，中文
一、活动基本信息
举办时间：2026年6月26日-6月28日
...
```

或先不带内容调用，再粘贴要做成海报的文字：

```text
/poster-generator
```

Claude Code 会分析内容、自动组织信息、推荐几种视觉风格，向用户做一次合并确认，然后用可用的图像生成能力产出海报。

你可以在描述里直接说明想要的**风格**（20 种可选，见下文）、**长宽比**（如 1:1、4:5、2:3、3:4、9:16、16:9）和**语言**，例如"用 neo-brutalist 风格，竖版 9:16，中文"。不指定时，skill 会：风格从内容、受众、渠道自动推荐 3-5 个供你确认；长宽比默认 `2:3`；语言默认跟随输入内容的语言。

---

## 在 Codex 中使用

### 1. 安装

将完整仓库克隆到 Codex 的用户级 skills 目录：

```bash
git clone https://github.com/howardz27/poster-generator-skill.git \
  ~/.agents/skills/poster-generator
```

Codex 会自动检测本地 skill 变更。若 skill 没有出现在选择器里，重启 Codex。确保 Codex 环境也暴露了图像生成 skill、MCP 工具或其他可调用的图像生成工具。

### 2. 调用

在 Codex CLI 或 IDE 扩展里，输入 `$` 显式提及 skill，然后用自然语言说明：

```text
$poster-generator 帮我做一张活动海报，用下面这段文字，竖版中文。
一、活动基本信息
举办时间：2026年6月26日-6月28日
...
```

也可以在 skill 名后直接粘贴完整内容。当请求明确要求做海报时，Codex 可能自动触发该 skill，但 `$poster-generator` 是最稳定、最可预测的显式调用方式。

---

## 真实输入示例

你不需要整理成正式文档，也不需要给风格或设计说明——一段普通的活动通知、产品文案或随手写的文字就够了，skill 会自己完成内容分析、信息提炼、构图选择和风格推荐这一整条链路。例如，直接把下面这段活动通知贴给它：

```markdown
一、活动基本信息

举办时间：2026年6月26日-6月28日

举办地点：北京西北旺万象汇·沐风广场

入场方式：免费入场，无需购票

凭入场手环可享场内餐饮折扣

二、每日主题与阵容

6月26日（未来声浪/科技大厂嘉年华）：后浪乐队、涂瑶（软通动力）、老杆子乐队（百度&滴滴等）、chopchop（百度）、Holly（联想）、百度街舞社、诗人说梦乐队（百度）、红砖乐队

6月27日（青春声浪/高校毕业歌会）：Deadline乐队（人大）、乌曼莉斯乐队（北电/央民/北工商）、刘彦彤赵梓良（人大）、窦翊丹（农大）、灰色地带乐队（人大）、刘洋可可（北工商）、ok绷乐队（北电）、长命功夫乐队（首体）

6月28日（巅峰声浪）：特邀嘉宾海鸣威（代表作《老人与海》），以及逆向时钟乐队、王梵瑞&鼓楼先生乐队、女王公园乐队、荒草公园乐队
```

即使没有指定风格，skill 也会自动从内容中识别出三日日程结构、提炼出贯穿全文的主标题、把 25+ 组艺人裁剪到可读密度，再推荐合适的视觉风格供确认。所有偏好都可以用自然语言直接说，比如"竖版、中文、走年轻热闹的风格"。

---

## 风格（共 20 种）

在描述里直接说出想要的风格名即可（中英文都可以）；不指定时 skill 会推荐 3-5 个供你确认。下表为每种风格的一张代表输出（中文版，默认 2:3 比例）：

|  |  |  |
|:-:|:-:|:-:|
| <img src="examples/zh/swiss-editorial/poster-zh-gpt-image-2.jpg" width="220" alt="swiss-editorial" /> | <img src="examples/zh/neo-brutalist/poster-zh-gpt-image-2.jpg" width="220" alt="neo-brutalist" /> | <img src="examples/zh/luxury-minimal/poster-zh-gpt-image-2.jpg" width="220" alt="luxury-minimal" /> |
| 瑞士编辑<br />`swiss-editorial` | 新粗野主义<br />`neo-brutalist` | 奢华极简<br />`luxury-minimal` |
| <img src="examples/zh/constructivist-impact/poster-zh-gpt-image-2.jpg" width="220" alt="constructivist-impact" /> | <img src="examples/zh/bauhaus-modular/poster-zh-gpt-image-2.jpg" width="220" alt="bauhaus-modular" /> | <img src="examples/zh/pop-commercial/poster-zh-gpt-image-2.jpg" width="220" alt="pop-commercial" /> |
| 构成主义冲击<br />`constructivist-impact` | 包豪斯模块<br />`bauhaus-modular` | 波普商业<br />`pop-commercial` |
| <img src="examples/zh/cinematic-key-art/poster-zh-gpt-image-2.jpg" width="220" alt="cinematic-key-art" /> | <img src="examples/zh/data-editorial/poster-zh-gpt-image-2.jpg" width="220" alt="data-editorial" /> | <img src="examples/zh/organic-craft/poster-zh-gpt-image-2.jpg" width="220" alt="organic-craft" /> |
| 电影主视觉<br />`cinematic-key-art` | 数据编辑<br />`data-editorial` | 有机手作<br />`organic-craft` |
| <img src="examples/zh/futurist-gradient/poster-zh-gpt-image-2.jpg" width="220" alt="futurist-gradient" /> | <img src="examples/zh/editorial-collage/poster-zh-gpt-image-2.jpg" width="220" alt="editorial-collage" /> | <img src="examples/zh/japanese-ma/poster-zh-gpt-image-2.jpg" width="220" alt="japanese-ma" /> |
| 未来主义渐变<br />`futurist-gradient` | 编辑拼贴<br />`editorial-collage` | 日式留白<br />`japanese-ma` |
| <img src="examples/zh/monochrome-typographic/poster-zh-gpt-image-2.jpg" width="220" alt="monochrome-typographic" /> | <img src="examples/zh/art-deco-luxe/poster-zh-gpt-image-2.jpg" width="220" alt="art-deco-luxe" /> | <img src="examples/zh/risograph-zine/poster-zh-gpt-image-2.jpg" width="220" alt="risograph-zine" /> |
| 单色字体<br />`monochrome-typographic` | 装饰艺术奢华<br />`art-deco-luxe` | 孔版印刷小志<br />`risograph-zine` |
| <img src="examples/zh/glassmorphism-ui/poster-zh-gpt-image-2.jpg" width="220" alt="glassmorphism-ui" /> | <img src="examples/zh/surreal-3d-editorial/poster-zh-gpt-image-2.jpg" width="220" alt="surreal-3d-editorial" /> | <img src="examples/zh/retro-futurism/poster-zh-gpt-image-2.jpg" width="220" alt="retro-futurism" /> |
| 玻璃拟态<br />`glassmorphism-ui` | 超现实 3D 编辑<br />`surreal-3d-editorial` | 复古未来<br />`retro-futurism` |
| <img src="examples/zh/botanical-premium/poster-zh-gpt-image-2.jpg" width="220" alt="botanical-premium" /> | <img src="examples/zh/hyperreal-product/poster-zh-gpt-image-2.jpg" width="220" alt="hyperreal-product" /> |  |
| 植物高端<br />`botanical-premium` | 超写实产品<br />`hyperreal-product` |  |


> 示例中的场景名以及品牌/活动名均为虚构。这些海报仅作为 skill 输出示意，并非真实活动。

---

## 产物结构

每次运行会产出一个文件夹，可纳入版本控制或交给设计师：

```text
poster/{topic-slug}/
├── source-{slug}.{ext}      # 原始输入
├── analysis.md              # 提取字段与缺失信息策略
├── structured-content.md    # 海报化信息层级
├── prompts/poster.md        # 最终图像 prompt
└── poster.png               # 渲染出的海报
```

---

## 工作原理

1. **准备与分析** —— 可选地从 `EXTEND.md` 加载用户偏好，然后从源内容中提取海报相关字段。
2. **结构化** —— 把分析结果转化为标题、辅助文案、必显信息、CTA、元数据、视觉主体与品牌线索的层级。
3. **构图与推荐** —— 在内部选定构图方式，再根据目标、受众、渠道、基调推荐 3-5 种视觉风格。
4. **确认** —— 一次性确认 style、长宽比、语言和可用渲染能力；
5. **生成 prompt** —— 组合内部构图定义、所选风格、基础模板和结构化内容。
6. **渲染** —— 发现并调用 agent 可用的图像生成 skill 或工具。
7. **报告** —— 返回所选选项以及每个产物文件的路径。

完整工作流规则见 [`SKILL.md`](SKILL.md) 与 [`references/`](references/)。

---

## 个性化

在以下任一路径创建 `EXTEND.md`，定义偏好风格、默认长宽比、renderer、quality、语言、品牌约束或自定义风格：

```text
# 项目级
.baoyu-skills/poster-generator/EXTEND.md

# 用户级
~/.baoyu-skills/poster-generator/EXTEND.md
```

两个文件都不存在时，skill 按默认值运行，无需额外配置。出于向后兼容，legacy layout 偏好仍会被读取，但新配置应依赖自动构图。

---

## 贡献

欢迎贡献：新的 layout、style、选择启发式规则或示例海报。

1. Fork 仓库，创建 feature 分支，向 `main` 提 PR。
2. 新的内部 layout 与用户可见 style 必须遵循 `references/layouts/` 与 `references/styles/` 下的现有结构；添加任何一种时一并更新 selection guide。
3. reference 文件保持纯 markdown。

---

## License

[MIT](LICENSE)
