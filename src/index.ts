import { type Context } from './FetchContext.type'
import { type HtmlToMarkdown } from './Fn.type'
import { type shortcutAction, type DoNotificationWindowProps, type PluginMentionItem } from './types'

export * from './FetchContext.type'
export * from './Fn.type'
export * from './params'
export * from './types'
export * from './editor.type'

export type PluginSettingsInput = {
  type: 'number'
  required: boolean
  label: string
  description: string
  default?: number
} | {
  type: 'string' | 'path' | 'file' | 'text'
  required: boolean
  label: string
  description: string
  default?: string
} | {
  type: 'boolean'
  required: boolean
  label: string
  description: string
  default?: boolean
} | {
  type: 'json'
  required: boolean
  label: string
  description: string
  dataDescription: Record<
  string,
  { title: string, type: 'string' | 'template' }
  >
  default?: Array<Record<string, string>>
} | {
  type: 'shortcut'
  required: boolean
  label: string
  description: string
  /** Cmd, Alt, Ctrl, Shift, Enter. ex: Alt+Enter */
  default?: string
}

export interface PluginSettingsButton {
  type: 'button'
  callback: () => void
  label: string
  description: string
}
export interface GetPluginSettingsButton {
  type: 'button'
  callback: string
  label: string
  description: string
}

export type PluginSettingsDescription = Record<string, PluginSettingsInput>

export type MoonPluginSettingsValue = string | Array<Record<string, string>>
export type MoonPluginSettings = Record<string, MoonPluginSettingsValue >

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
  name?: string
  repoUrl?: string
  packageName: string // '@castrocrea/moon-obsidian-plugin'
  description?: string
  fromPath?: boolean // use installFromPath
  devMode?: boolean // use to auto refresh when developing a plugin
  status?: 'activated' | 'deactivated'
  isMoonPrivate?: boolean
  link?: string
  icon?: string
}

export interface EndpointCallbackItem {
  /**
   * Url that will trigger the callback
   */
  endpoint: string
  /**
   * Callback that will be executed when then endpoint will be called
   */
  callback: ((props: {
    url: string
    doNotification: (DoNotificationWindowProps: DoNotificationWindowProps) => void
    saveSettings: (props: { key: string, value: MoonPluginSettingsValue }) => void
  }) => void)
}

export type PluginsManages = PluginManagerCredentials[]

export class MoonPlugin {
  /**
   * name - The name of the plugin
   */
  name: string = 'Plugin name'

  /**
   * logo - The logo of the plugin
   * Can be a URL or an svg string starting by <svg
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

  private _settingsButtons: PluginSettingsButton[] = []

  /**
   * If you want to add a call to action as a button inside the settings (ex: Auth open url)
   */
  get settingsButtons (): GetPluginSettingsButton[] {
    return this._settingsButtons.map(button => ({ ...button, callback: button.callback.toString() }))
  }

  set settingsButtons (value: PluginSettingsButton[]) {
    this._settingsButtons = value
  }

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
  integration: undefined | {
    callback: ((props: {
      html: string
      markdown: string
      context: Context
    }) => Promise<boolean | { url: string }>)
    /**
     * If set, a button icon will be shown to trigger integration callback
     */
    buttonIconUrl?: string
  }

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

  /**
   * Not implemented yet
   */
  shortcutActions: undefined | shortcutAction[]

  /**
   * If you want to trigger an action from moonjot:// protocol
   */
  endpointCallbacks: undefined | EndpointCallbackItem[]

  // /**
  //  * Add an action to the editor (use for AI integration)
  //  */
  // insertIntoEditor: undefined | {
  //   /**
  //    * The shortcut to trigger the functionality is by default ⌥↩︎, you can set a specif shortcut for this one
  //    * Ex: e.altKey && e.key === 'Enter'
  //    */
  //   shortcut?: (e: KeyboardEvent) => boolean
  //   callback: (props: {
  //     editorContent: string
  //     context: Context
  //   }) => string
  //   options: {
  //     /** By default, it’s restoring the cursor position (and text selection). Pass a position to move the cursor to. */
  //     insertAt: 'start' | 'end' | 'all' | number | boolean | null
  //     /** Defines whether to scroll to the cursor when focusing. Defaults to true. */
  //     scrollIntoView: boolean
  //   }
  // }
}
