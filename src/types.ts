import { type Context } from './FetchContext.type'

export interface PluginMentionItem {
  name: string
  char: string
  htmlClass: string
  allowSpaces: boolean
  getListItem: ({ query }: {
    query: string
  }) => Array<{ title: string } & Record<string, unknown>>
  onSelectItem: (props: {
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
