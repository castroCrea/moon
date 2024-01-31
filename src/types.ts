export interface PluginMentionItem {
  name: string
  char: string
  htmlClass: string
  allowSpaces: boolean
  getListItem: () => string[]
  onSelectItem: ({ item, addMention, editor }: {
    item: string
    addMention: (item: string) => void
    editor: {
      commands: {
        setContent: (content: string) => boolean
      }
    }
  }) => void
}
