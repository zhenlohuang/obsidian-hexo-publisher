
import { App, PluginSettingTab, Setting } from 'obsidian';
import { HexoPublisher } from './plugin';

export interface HexoPublisherPluginSettings {
    enabledLocalRepo: boolean;
    gitRepo: string;
    hexoSourceDir: string;
}

export const DEFAULT_SETTINGS: HexoPublisherPluginSettings = {
    enabledLocalRepo: false,
    gitRepo: '',
    hexoSourceDir: 'source'
}


export class HexoPublisherPluginSettingTab extends PluginSettingTab {
    plugin: HexoPublisher;

    constructor(app: App, plugin: HexoPublisher) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;

        containerEl.empty();

        containerEl.createEl('h1', { text: 'Settings' });

        new Setting(containerEl)
            .setName('Git Repo')
            .setDesc('git repo path for hexo site.')
            .addText(text => text
                .setPlaceholder('Enter your git repo')
                .setValue(this.plugin.settings.gitRepo)
                .onChange(async (value) => {
                    this.plugin.settings.gitRepo = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Source Dir')
            .setDesc('Source dir for hexo site.')
            .addText(text => text
                .setPlaceholder('source')
                .setValue(this.plugin.settings.hexoSourceDir)
                .onChange(async (value) => {
                    this.plugin.settings.gitRepo = value;
                    await this.plugin.saveSettings();
                }));
    }
}