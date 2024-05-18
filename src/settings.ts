
import { App, PluginSettingTab, Setting } from 'obsidian';
import { HexoPublisher } from './plugin';

export const DEFAULT_SETTINGS: HexoPublisherPluginSettings = {
    enabledLocalRepo: false,
    gitRepo: ''
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

        new Setting(containerEl)
            .setName('Git Repo')
            .setDesc('git repo path for hexo blog.')
            .addText(text => text
                .setPlaceholder('Enter your git repo')
                .setValue(this.plugin.settings.gitRepo)
                .onChange(async (value) => {
                    this.plugin.settings.gitRepo = value;
                    await this.plugin.saveSettings();
                }));
    }
}