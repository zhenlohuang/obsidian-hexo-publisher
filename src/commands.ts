import { App, Notice, TFile } from 'obsidian';
import { Hexo } from './hexo'
import { ObsidianHelper } from './helpers'
import { Utils } from './utils';

export function syncCommand(app: App, settings: HexoPublisherPluginSettings) {
    return {
        id: 'publish-command',
        name: 'Publish Posts',
        callback: () => {
            publishPosts(app, settings)
        }
    }
}

export async function publishPosts(app: App, settings: HexoPublisherPluginSettings) {
    const helpers = new ObsidianHelper(app);

    const publishedPosts = await helpers.getPublishedPosts();
    console.log(`Found ${publishedPosts.length} published posts`);

    if (publishedPosts.length === 0) {
        new Notice('No published posts found');
        return;
    }

    const hexo = new Hexo(settings.gitRepo);

    for (const mdFile of publishedPosts) {
        try {
            const content = await mdFile.vault.read(mdFile);
            const images = Utils.extractImages(content);
            if (images.length > 0) {
                console.log(`Found ${images.length} images in ${mdFile.name}`);
                for (const image of images) {
                    const imageFile = helpers.getFileByPath(image);
                    if (imageFile?.path) {
                        const imageContent = await imageFile.vault.readBinary(imageFile);
                        await hexo.writeImage(image, imageContent);
                    }
                }
            }

            const normalized = hexo.normalizeMarkdown(content);
            await hexo.writePost(mdFile.name, normalized);
        } catch (error) {
            console.error(`Failed to read file ${mdFile}：${error}`);
        }
    }

    new Notice(`Synced ${publishedPosts.length} posts`);
}
