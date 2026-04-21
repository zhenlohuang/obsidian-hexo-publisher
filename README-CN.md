# Hexo Publisher (修改版)

基于 [zhenlohuang/obsidian-hexo-publisher](https://github.com/zhenlohuang/obsidian-hexo-publisher) 修改。  
感谢原作者 zhenlohuang 提供的插件基础。

## 新增功能

- **创建Hexo草稿**：通过命令 `Create New Hexo Post`，输入标题后自动生成带frontmatter的md文件，保存在指定目录。

## 原有功能

- 通过 frontmatter 中 `publish: true` 标记笔记，同步到 Hexo 博客
- 本地图片自动复制到 Hexo 的 `/images` 目录

## 安装

1. 下载本仓库的 `main.js` 和 `manifest.json`
2. 在 Obsidian vault 的 `.obsidian/plugins/` 下新建文件夹 `hexo-publisher`
3. 将两个文件放入该文件夹
4. 在 Obsidian 设置中启用插件

## 配置

- **Git Repo**：Hexo 站点本地仓库的绝对路径（如 `/Users/name/blog`）
- **Source Dir**：Hexo 的 source 目录名（默认 `source`）
- **Default Draft Directory**：新草稿保存目录（相对于 vault 根目录，如 `_drafts`）

## 使用

### 创建草稿
1. 执行命令 `Create New Hexo Post`
2. 输入标题，按回车
3. 文件自动创建并打开，frontmatter 中 `publish: false`

### 发布已有笔记
1. 在笔记 frontmatter 中添加 `publish: true`
2. 执行命令 `Publish Posts` 或点击 ribbon 图标
3. 插件会将笔记转换为 Hexo 格式并写入 `{repo}/{sourceDir}/_posts/`

## 注意

- 仅支持桌面版 Obsidian
- 图片引用格式：`![[image.png]]` 会被转换为 `![image](/images/image.png)`