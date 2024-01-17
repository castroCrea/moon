import { type Context } from './FetchContext.type';
import { type HtmlToMarkdown } from './Fn.type';
export * from './FetchContext.type';
export * from './Fn.type';
export type PluginSettingsDescription = Record<string, {
    type: 'string' | 'path' | 'boolean' | 'number';
    required: boolean;
    label: string;
    description: string;
}>;
export type MoonPluginSettings = Record<string, string>;
export interface PluginHelpers {
    fs: any;
    path: any;
    htmlToMarkdown: HtmlToMarkdown;
}
export interface MoonPluginConstructorProps<T extends MoonPluginSettings> {
    settings?: T;
    helpers: PluginHelpers;
}
export interface NpmRegistryAuthToken {
    token: string;
}
export interface NpmRegistryAuthBasic {
    username: string;
    password: string;
}
export interface NpmRegistryConfig {
    auth?: NpmRegistryAuthToken | NpmRegistryAuthBasic;
    userAgent?: string;
}
export interface PluginManagerCredentials {
    id: number;
    packageName: string;
    description?: string;
    fromPath?: boolean;
    npmRegistryUrl: string;
    npmRegistryConfig: NpmRegistryConfig;
}
export type PluginsManages = PluginManagerCredentials[];
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
     * All helpers you need to build your plugin
     */
    helpers: PluginHelpers | undefined;
    /**
     * constructor - Create a new instance of the plugin
     *
     * @param settings - The settings of the plugin
     */
    constructor(props?: MoonPluginConstructorProps<MoonPluginSettings>);
    /**
     * If you want to add a new integration, you can add it here
    *
    * This will be called on output
    */
    integration: undefined | ((props: {
        html: string;
        markdown: string;
        context: Context;
    }) => Promise<boolean>);
    /**
     * If you want to add a new context, you can add it here
     *
     * This will be called on input and added to context
     *
     * @return Context
     */
    context: undefined | (() => Promise<Partial<Context>>);
}
