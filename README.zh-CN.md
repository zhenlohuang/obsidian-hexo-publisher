# Obsidian Hexo Publisher

一款 [Obsidian](https://obsidian.md/) 插件，帮助你在 Obsidian 中创建 Hexo 草稿并一键发布笔记到 [Hexo](https://hexo.io/) 博客。

[English](README.md)

## 功能

- **创建 Hexo 草稿** — 执行 `Create New Hexo Post` 命令，输入标题后自动生成带有 frontmatter（`title`、`date`、`tags`、`categories`、`publish: false`）的 Markdown 文件并打开。
- **发布到 Hexo** — frontmatter 中标记 `publish: true` 的笔记，通过 `Publish Posts` 命令或侧边栏图标同步到 Hexo 站点的 `_posts` 目录。
- **图片处理** — Obsidian 格式的图片引用（`![[image.png]]`）自动转换为标准 Markdown（`![image](/images/image.png)`），并将图片复制到 Hexo 的 `/images` 目录。
- **注释转换** — Obsidian 脚注式注释（`^[comment]`）自动转换为 HTML 注释。

## 安装

1. 从 [最新发布](https://github.com/zhenlohuang/obsidian-hexo-publisher/releases) 下载 `main.js` 和 `manifest.json`。
2. 在 Vault 中创建文件夹 `.obsidian/plugins/hexo-publisher/`。
3. 将两个文件放入该文件夹。
4. 在 Obsidian 设置 > 第三方插件中启用 **Hexo Publisher**。

## 配置

| 设置项 | 说明 | 默认值 |
|--------|------|--------|
| **Git Repo** | Hexo 站点本地仓库的绝对路径 | — |
| **Source Dir** | Hexo source 目录名 | `source` |
| **Default Draft Directory** | 新草稿保存目录，相对于 Vault 根目录 | *（Vault 根目录）* |

## 使用方法

### 创建草稿

1. 打开命令面板，执行 **Create New Hexo Post**。
2. 输入文章标题，按回车。
3. 在草稿目录中自动创建 `YYYY-MM-DD-slug.md` 文件并打开。

### 发布笔记

1. 在笔记的 frontmatter 中添加 `publish: true`。
2. 执行 **Publish Posts** 命令或点击侧边栏图标。
3. 插件将转换后的 Markdown 和图片写入 `{gitRepo}/{sourceDir}/_posts/` 和 `{gitRepo}/{sourceDir}/images/`。

## 环境要求

- 桌面版 Obsidian（不支持移动端）
- 本地 Hexo 站点 git 仓库

## 许可证

[MIT](LICENSE)
