import { type Context } from './FetchContext.type'
import { type HtmlToMarkdown } from './Fn.type'
// import type fs from 'fs'
// import type path from 'path'

export * from './FetchContext.type'
export * from './Fn.type'

export type PluginSettingsDescription = Record<string, {
  type: 'string' | 'path'
  required: boolean
  label: string
  description: string
}>

export type MoonPluginSettings = Record<string, string>

export interface PluginHelpers {
  fs: any
  path: any
  htmlToMarkdown: HtmlToMarkdown
}

export interface MoonPluginConstructorProps<T extends MoonPluginSettings> {
  settings?: T
  helpers: PluginHelpers
}

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
   * saveSettings - Save the settings to the plugin's settings file
   *
   * @param settings
   * @param writeSettings
   *        @param settings
   *        @param settingsFileName - The name with no extension, by default will take the name of the plugin from settings
   */
  async saveSettings ({ settings, writeSettings }: {
    settings: MoonPluginSettings
    writeSettings: <MoonPluginSettings>({ settings, settingsFileName }: {
      settings: MoonPluginSettings
      settingsFileName: string
    }) => void
  }): Promise<void> {
    writeSettings({ settings, settingsFileName: this.name })
    this.settings = settings
  }

  /**
   * If you want to add a new integration, you can add it here
   *
   * This will be called on output
   */
  async integration (props: {
    html: string
    markdown: string
    context: Context
  }): Promise<boolean> {
    console.log('MoonPlugin integration')
    return false
  }

  /**
   * If you want to add a new context, you can add it here
   *
   * This will be called on input and added to context
   *
   * @return Context
   */
  async context (): Promise<Partial<Context>> {
    console.log('MoonPlugin integration')
    return { people: [], source: {} }
  }
}
