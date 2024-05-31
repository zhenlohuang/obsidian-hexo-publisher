import { App, TFile } from 'obsidian';

export class ObsidianHelper {
    private app: App;

    constructor(app: App) {
        this.app = app;
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