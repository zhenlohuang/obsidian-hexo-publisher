export class Utils {
    static extractImages(obsidianMarkdown: string): string[] {
        const images: string[] = [];
        const imageRegex = /!\[\[([^\]]+)\]\]/g;
        let match;

        while ((match = imageRegex.exec(obsidianMarkdown)) !== null) {
            images.push(match[1]);
        }

        return images;
    }
}