
import { Plugin } from 'obsidian';
import { DEFAULT_SETTINGS, HexoPublisherPluginSettingTab } from './settings';
import { syncCommand, publishPosts } from './commands';

export class HexoPublisher extends Plugin {
    settings: HexoPublisherPluginSettings;

    async onload() {
        await this.loadSettings();

        this.addCommand(syncCommand(this.app, this.settings));

        this.addSettingTab(new HexoPublisherPluginSettingTab(this.app, this));

        this.addRibbonIcon("webhook", "Publish posts to hexo", () => {
            publishPosts(this.app, this.settings)
        });
    }

    onunload() {

    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}