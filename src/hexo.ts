import * as path from 'path';
import * as fs from 'fs';

export class Hexo {
    root: string
    sourceDir: string
    postFolder: string
    imageFolder: string

    constructor(root: string, sourceDir: string = 'source') {
        this.root = root;
        this.sourceDir = sourceDir;
        this.postFolder = path.join(sourceDir, "_posts");
        this.imageFolder = path.join(sourceDir, "images");;
    }

    getPostFolderPath(): string {
        return path.join(this.root, this.postFolder);
    }

    getImageFolderPath(): string {
        return path.join(this.root, this.imageFolder);
    }

    getPostPath(name: string): string {
        return path.join(this.getPostFolderPath(), name);
    }

    getImagePath(name: string): string {
        return path.join(this.getImageFolderPath(), name);
    }

    normalizeMarkdown(markdown: string): string {
        let normalizedMarkdown = markdown;
        const imageFolder = this.imageFolder.replace(this.sourceDir, '/');

        // 替换形如 ^[comment] 的注释
        normalizedMarkdown = normalizedMarkdown.replace(/\^\[([^\]]+)\]/g, '<!-- $1 -->');

        // 替换形如 ![alt text](filename) 的图片链接
        normalizedMarkdown = normalizedMarkdown.replace(/!\[([^\]]+)\]\(([^)]+)\)/g, `![$1](/${imageFolder}/$2)`);

        // 替换形如 ![[filename]] 的图片链接
        normalizedMarkdown = normalizedMarkdown.replace(/!\[\[([^\]]+)\]\]/g, '![$1](/images/$1)');

        return normalizedMarkdown;
    }

    async writePost(name: string, content: string): Promise<void> {
        const postPath = this.getPostPath(name);

        try {
            await fs.promises.mkdir(path.dirname(postPath), { recursive: true });
            await fs.promises.writeFile(postPath, content, 'utf8');
            console.log(`Post written to: ${postPath}`);
        } catch (error) {
            console.error(`Error writing post: ${error}`);
        }
    }

    async writeImage(name: string, content: ArrayBuffer): Promise<void> {
        const imagePath = this.getImagePath(name);

        try {
            await fs.promises.mkdir(path.dirname(imagePath), { recursive: true });
            await fs.promises.writeFile(imagePath, Buffer.from(content));
            console.log(`Image written to: ${imagePath}`);
        } catch (error) {
            console.error(`Error writing image: ${error}`);
        }
    }
}
