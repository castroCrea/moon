import { type Context } from './FetchContext.type'

export type MentionItem = {
  title: string
} & Record<string, unknown>

export interface PluginMentionItem {
  name: string
  char: string
  htmlClass: string
  allowSpaces: boolean
  getListItem: ({ query }: {
    query: string
  }) => MentionItem[]
  onSelectItem: (props: {
    item: MentionItem
    setContext: (context: Context) => void
    context: Context
    addMention: (text: string) => void
    editor: {
      commands: {
        setContent: (content: string) => boolean
      }
    }
  }) => void
}
