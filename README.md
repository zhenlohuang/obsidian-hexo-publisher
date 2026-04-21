# Hexo Publisher (Modified)

Forked from [zhenlohuang/obsidian-hexo-publisher](https://github.com/zhenlohuang/obsidian-hexo-publisher).  
Thanks to the original author zhenlohuang.

## New Features

- **Create Hexo draft**: Use command `Create New Hexo Post`, enter title, and a markdown file with frontmatter will be auto-generated in the configured directory.

## Existing Features

- Publish notes with `publish: true` in frontmatter to Hexo blog
- Auto copy local images to Hexo `/images` directory

## Installation

1. Download `main.js` and `manifest.json` from this repo
2. Create folder `hexo-publisher` under `.obsidian/plugins/` in your vault
3. Place both files into that folder
4. Enable the plugin in Obsidian settings

## Settings

- **Git Repo**: Absolute path to local Hexo site repo (e.g., `/Users/name/blog`)
- **Source Dir**: Hexo source directory name (default `source`)
- **Default Draft Directory**: Directory to save new drafts (relative to vault root, e.g., `_drafts`)

## Usage

### Create a draft
1. Run `Create New Hexo Post` command
2. Enter post title, press Enter
3. File is created and opened automatically, with `publish: false` in frontmatter

### Publish an existing note
1. Add `publish: true` to frontmatter
2. Run `Publish Posts` command or click ribbon icon
3. Plugin converts the note and writes to `{repo}/{sourceDir}/_posts/`

## Notes

- Desktop only
- Image format `![[image.png]]` will be converted to `![image](/images/image.png)`