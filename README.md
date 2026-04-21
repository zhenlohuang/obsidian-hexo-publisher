# Obsidian Hexo Publisher

An [Obsidian](https://obsidian.md/) plugin that lets you create Hexo drafts and publish notes directly to your [Hexo](https://hexo.io/) blog.

[中文文档](README.zh-CN.md)

## Features

- **Create Hexo Draft** — Run the `Create New Hexo Post` command, enter a title, and a Markdown file with pre-filled frontmatter (`title`, `date`, `tags`, `categories`, `publish: false`) is generated and opened automatically.
- **Publish to Hexo** — Notes with `publish: true` in frontmatter are synced to your Hexo site's `_posts` directory via the `Publish Posts` command or the ribbon icon.
- **Image Handling** — Obsidian-style image embeds (`![[image.png]]`) are converted to standard Markdown (`![image](/images/image.png)`) and copied to Hexo's `/images` directory.
- **Annotation Conversion** — Obsidian footnote-style annotations (`^[comment]`) are converted to HTML comments.

## Installation

1. Download `main.js` and `manifest.json` from the [latest release](https://github.com/zhenlohuang/obsidian-hexo-publisher/releases).
2. In your vault, create the folder `.obsidian/plugins/hexo-publisher/`.
3. Place both files into that folder.
4. Enable **Hexo Publisher** in Obsidian Settings > Community Plugins.

## Configuration

| Setting | Description | Default |
|---------|-------------|---------|
| **Git Repo** | Absolute path to your local Hexo site repository | — |
| **Source Dir** | Hexo source directory name | `source` |
| **Default Draft Directory** | Directory for new drafts, relative to vault root | *(vault root)* |

## Usage

### Create a Draft

1. Open the command palette and run **Create New Hexo Post**.
2. Enter the post title and press Enter.
3. A file named `YYYY-MM-DD-slug.md` is created in your draft directory and opened automatically.

### Publish Notes

1. Add `publish: true` to a note's frontmatter.
2. Run the **Publish Posts** command or click the ribbon icon.
3. The plugin writes converted Markdown and images to `{gitRepo}/{sourceDir}/_posts/` and `{gitRepo}/{sourceDir}/images/`.

## Requirements

- Desktop version of Obsidian (not supported on mobile)
- A local Hexo site git repository

## License

[MIT](LICENSE)
