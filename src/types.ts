import { type Context } from './FetchContext.type'
import { type ParseOptions, type Content } from './editor.type'

export type MentionItem = {
  title: string
  pluginName?: string
  color?: string
  background?: string
} & Record<string, unknown>

export interface PluginMentionItem {
  name: string
  char: string
  htmlClass: string
  allowSpaces: boolean
  startOfLine?: boolean
  getListItem: ({ query }: {
    query: string
  }) => Promise<MentionItem[]>
  onSelectItem: (props: {
    item: MentionItem
    setContext: (context: Context) => void
    context: Context
    addMention: (text: string) => void
    deleteMentionPlaceholder: () => void
    editor: {
      storage: {
        markdown: {
          getMarkdown: () => string
        }
      }
      commands: {
        setContent: (content: string) => boolean
        insertContent: (value: Content, options?: {
          parseOptions?: ParseOptions
          updateSelection?: boolean
        }) => void
      }
    }
  }) => void
}

/**
 * Not implemented yet
 */
export interface shortcutAction {
  shortcut: string
  callback: (props: {
    html: string
    markdown: string
    context: Context
    setContext: (context: Context) => void
    setContent: (content: string) => boolean
    insertContent: (value: Content, options?: {
      parseOptions?: ParseOptions
      updateSelection?: boolean
    }) => void
  }) => void
}

export interface DoNotificationWindowProps {
  body: string
  url?: string
  width?: number
  disabledDelay?: boolean
};
