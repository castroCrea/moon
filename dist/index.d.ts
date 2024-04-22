import { type Context } from './FetchContext.type';
import { type HtmlToMarkdown } from './Fn.type';
import { type PluginMentionItem } from './types';
export * from './FetchContext.type';
export * from './Fn.type';
export * from './params';
export * from './types';
export * from './editor.type';
export type PluginSettingsDescription = Record<string, {
    type: 'string' | 'path' | 'boolean' | 'number';
    required: boolean;
    label: string;
    description: string;
}>;
export type MoonPluginSettings = Record<string, string>;
export interface PluginHelpers {
    moonLog: (log: string) => void;
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
    name?: string;
    repoUrl?: string;
    packageName: string;
    description?: string;
    fromPath?: boolean;
    devMode?: boolean;
    status?: 'activated' | 'deactivated';
    isMoonPrivate?: boolean;
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
    integration: undefined | {
        callback: ((props: {
            html: string;
            markdown: string;
            context: Context;
        }) => Promise<boolean>);
        /**
         * The shortcut to save to all integration is by default ⌘↩︎, you can set a specif shortcut for this one
         * @deprecated to hard to put in place and to understand
         */
        shortcut?: (e: KeyboardEvent) => boolean;
        /**
         * If set, a button icon will be shown to trigger integration callback
         */
        buttonIconUrl?: string;
    };
    /**
     * If you want to add a new context, you can add it here
     *
     * This will be called on input and added to context
     *
     * @return Context
     */
    context: undefined | ((props: {
        html: string | undefined;
        context: Context;
    }) => Promise<Context>);
    /**
     * Add a mention to the text editor and execute a command on action
     */
    mention: undefined | (() => PluginMentionItem[]);
    /**
     * Add an action to the editor (use for AI integration)
     */
    insertIntoEditor: undefined | {
        /**
         * The shortcut to trigger the functionality is by default ⌥↩︎, you can set a specif shortcut for this one
         * Ex: e.altKey && e.key === 'Enter'
         */
        shortcut?: (e: KeyboardEvent) => boolean;
        callback: (props: {
            editorContent: string;
            context: Context;
        }) => string;
        options: {
            /** By default, it’s restoring the cursor position (and text selection). Pass a position to move the cursor to. */
            insertAt: 'start' | 'end' | 'all' | number | boolean | null;
            /** Defines whether to scroll to the cursor when focusing. Defaults to true. */
            scrollIntoView: boolean;
        };
    };
}
