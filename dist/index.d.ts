import { type Context } from './FetchContext.type';
import { type HtmlToMarkdown } from './Fn.type';
export * from './FetchContext.type';
export * from './Fn.type';
export type PluginSettingsDescription = Record<string, {
    type: 'string' | 'path';
    required: boolean;
    label: string;
    description: string;
}>;
export type MoonPluginSettings = Record<string, string>;
export declare class MoonPlugin {
    /**
     * name - The name of the plugin
     */
    name: string;
    /**
     * logo - The logo of the plugin
     */
    logo: string;
    /**
     * Describe the settings for the plugin that will appears in the settings modal
     *
     * example
     * {
     *   token: {
     *      type: 'string',
     *      required: true,
     *      label: 'Token',
     *      description: 'The Notion token_v2 cookie value. See <a href="https://developers.notion.com/reference/get-started#authentication" target="_blank">Notion API docs</a> *      for more information.'
     *   },
     * },
     */
    settingsDescription: PluginSettingsDescription;
    /**
     * settings - The settings of the plugin
     */
    settings: MoonPluginSettings;
    /**
     * constructor - Create a new instance of the plugin
     *
     * @param settings - The settings of the plugin
     */
    constructor(props?: {
        settings?: MoonPluginSettings;
    });
    /**
     * saveSettings - Save the settings to the plugin's settings file
     *
     * @param settings
     * @param writeSettings
     *        @param settings
     *        @param settingsFileName - The name with no extension, by default will take the name of the plugin from settings
     */
    saveSettings({ settings, writeSettings }: {
        settings: MoonPluginSettings;
        writeSettings: <MoonPluginSettings>({ settings, settingsFileName }: {
            settings: MoonPluginSettings;
            settingsFileName: string;
        }) => void;
    }): Promise<void>;
    /**
     * If you want to add a new integration, you can add it here
     *
     * This will be called on output
     */
    integration(props: {
        markdown: string;
        htmlToMarkdown: HtmlToMarkdown;
    }): Promise<boolean>;
    /**
     * If you want to add a new context, you can add it here
     *
     * This will be called on input and added to context
     *
     * @return Context
     */
    context(): Promise<Partial<Context>>;
}
