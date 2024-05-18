import { App, TFile } from 'obsidian';

export class ObsidianHelper {
    private app: App;

    constructor(app: App) {
        this.app = app;
    }

    public getFileByPath(name: string): TFile | undefined {
        let files = this.app.vault.getFiles();
        let file = files.find(file => file.name === name);
        return file;
    }

    public getPublishedPosts(): TFile[] {
        const markdownFiles = this.app.vault.getMarkdownFiles();
        console.log(`Found ${markdownFiles.length} markdown files`);

        const publishedPosts = []
        for (const file of markdownFiles) {
            const metadataCache = app.metadataCache.getFileCache(file);
            if (metadataCache && metadataCache.frontmatter && metadataCache.frontmatter.publish === true) {
                publishedPosts.push(file);
            }
        }

        return publishedPosts;
    }
}