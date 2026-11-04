# 已安装的设计类 Skills

| Skill | 来源 | 版本 (commit) | 许可 | 用途 |
|---|---|---|---|---|
| xiaoma-durex-copywriter | https://github.com/crawfordxx/xiaoma-durex-copywriter | d892bfb | MIT | 双层语义创意文案 + 海报 |
| poster-generator | https://github.com/howardz27/poster-generator-skill | fa2a40b | MIT | 20 种风格海报（出图需要图像生成工具） |
| huashu-design | https://github.com/alchaincyf/huashu-design | b2460b0 | MIT | HTML 设计：网页/PPT/信息图/小红书 |

## 精简说明

为控制仓库体积，安装时删除了：

- xiaoma-durex-copywriter：`examples/`、`evals/`、`assets/fonts/`（约 129M 字体；脚本会扫描系统字体目录，需要时从原仓库下载到 `~/.local/share/fonts/`）
- poster-generator：`examples/`（示例图）
- huashu-design：`demos/`、`assets/showcases/`、所有 `.mp3` 背景音乐（仅视频功能使用）

已检查脚本：联网功能均为可选，需要用户自己的 API Key（第三方生图、火山方舟、豆包 TTS）或抓取 Wikimedia 图片；huashu 的 hook 不会自动安装。
