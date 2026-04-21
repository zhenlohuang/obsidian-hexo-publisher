import { App, Notice, TFile } from 'obsidian';
import { Hexo } from './hexo'
import { ObsidianHelper } from './helpers'
import { Utils } from './utils';
import { HexoPublisherPluginSettings } from './settings';

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
    console.log(`Found ${publishedPosts.length} posts need to publish.`);

    if (publishedPosts.length === 0) {
        new Notice('No posts need to publish.');
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

export function createNewPostCommand(app: App, settings: HexoPublisherPluginSettings) {
    return {
        id: 'create-new-hexo-post',
        name: 'Create New Hexo Post',
        callback: () => {
            createNewHexoPost(app, settings)
        }
    }
}

export async function createNewHexoPost(app: App, settings: HexoPublisherPluginSettings) {
    const title = await promptForTitle();
    if (!title) return;
    
    const fileName = generateFileName(title);
    const targetDir = settings.defaultDraftDir || '';
    const content = generateFrontMatterTemplate(title);
    
    await createDraftFile(app, fileName, content, targetDir);
    new Notice(`Created new Hexo post: ${fileName}`);
}

function generateFileName(title: string): string {
    const date = new Date().toISOString().split('T')[0];
    const slug = title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    return `${date}-${slug}.md`;
}

function generateFrontMatterTemplate(title: string): string {
    return `---
title: "${title}"
date: ${new Date().toISOString().replace('T', ' ').substring(0, 19)}
publish: false
tags: []
categories: []
---
`;
}

async function promptForTitle(): Promise<string | null> {
    return new Promise((resolve) => {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Enter post title';
        
        const container = document.createElement('div');
        container.appendChild(document.createTextNode('New Hexo Post Title:'));
        container.appendChild(input);
        
        const dialog = new Notice('', 0);
        // 使用类型断言解决类型不匹配问题
        dialog.setMessage(container as any);
        
        input.focus();
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                dialog.hide();
                resolve(input.value || null);
            } else if (e.key === 'Escape') {
                dialog.hide();
                resolve(null);
            }
        });
    });
}

async function createDraftFile(app: App, fileName: string, content: string, dir: string) {
    const path = dir ? `${dir}/${fileName}` : fileName;
    await app.vault.create(path, content);
    const file = app.vault.getAbstractFileByPath(path);
    if (file instanceof TFile) {
        await app.workspace.getLeaf().openFile(file);
    }
}