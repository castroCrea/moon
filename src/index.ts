import { type Context } from './FetchContext.type'
import { type HtmlToMarkdown } from './Fn.type'
import { PluginMentionItem } from './types'
// import type fs from 'fs'
// import type path from 'path'

export * from './FetchContext.type'
export * from './Fn.type'
export * from './params'
export * from './types'

export type PluginSettingsDescription = Record<string, {
  type: 'string' | 'path' | 'boolean' | 'number'
  required: boolean
  label: string
  description: string
}>

export type MoonPluginSettings = Record<string, string>

export interface PluginHelpers {
  moonLog: (log: string) => void
  htmlToMarkdown: HtmlToMarkdown
}

export interface MoonPluginConstructorProps<T extends MoonPluginSettings> {
  settings?: T
  helpers: PluginHelpers
}

export interface NpmRegistryAuthToken {
  token: string
}
export interface NpmRegistryAuthBasic {
  username: string
  password: string
}

export interface NpmRegistryConfig {
  auth?: NpmRegistryAuthToken | NpmRegistryAuthBasic
  userAgent?: string
}

export interface PluginManagerCredentials {
  id: number
  packageName: string // '@castrocrea/moon-obsidian-plugin'
  description?: string
  fromPath?: boolean // use installFromPath
  devMode?: boolean // use to auto refresh when developing a plugin
  npmRegistryUrl: string
  npmRegistryConfig: NpmRegistryConfig
}

export type PluginsManages = PluginManagerCredentials[]

export class MoonPlugin {
  /**
   * name - The name of the plugin
   */
  name: string = 'Plugin name'

  /**
   * logo - The logo of the plugin
   */
  logo: string = 'https://www.image.so/images/favicon.ico'

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
  settingsDescription: PluginSettingsDescription = {}

  /**
   * settings - The settings of the plugin
   */
  settings: MoonPluginSettings = {}

  /**
   * All helpers you need to build your plugin
   */
  helpers: PluginHelpers | undefined

  /**
   * constructor - Create a new instance of the plugin
   *
   * @param settings - The settings of the plugin
   */
  constructor (props?: MoonPluginConstructorProps<MoonPluginSettings>) {
    if (props == null) return
    if (props.settings) this.settings = props.settings
    this.helpers = props.helpers
  }

  /**
   * If you want to add a new integration, you can add it here
   *
   * This will be called on output
   */
  integration: undefined | ((props: {
    html: string
    markdown: string
    context: Context
  }) => Promise<boolean>)

  /**
   * If you want to add a new context, you can add it here
   *
   * This will be called on input and added to context
   *
   * @return Context
   */
  context: undefined | ((props: {
    html: string | undefined
    context: Context
  }) => Promise<Context>)

  /**
   * Add a mention to the text editor and execute a command on action
   */
  mention: undefined | (() => PluginMentionItem[])
}
