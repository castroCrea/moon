import { type Context } from './FetchContext.type'

export interface PluginMentionItem {
  name: string
  char: string
  htmlClass: string
  allowSpaces: boolean
  getListItem: ({ query }: { query: string }) => string[]
  onSelectItem: ({ item, addMention, editor }: {
    item: string
    setContext: (context: Context) => void
    context: Context
    addMention: (item: string) => void
    editor: {
      commands: {
        setContent: (content: string) => boolean
      }
    }
  }) => void
}
