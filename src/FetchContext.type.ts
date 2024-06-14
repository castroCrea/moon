export type SOURCE_TYPE = [
  'Podcast',
  'Music',
  'Notes',
  'Slack',
  'Message',
  'TikTok',
  'Youtube',
]

export type SOURCE_TYPE_THAT_CLIP = [
  'LinkedIn - DM',
  'LinkedIn - Post',
  'Tweet',
  'Whatsapp',
  'Recipe',
  'Notion',
  'AI Chat',
  'Medium',
  'Article',
  'Twitter',
  'Substack Note',
  'Newsletter',
  'Mail',
]

export interface PluginPlaygroundItem {
  value: string[]
  /** @returns html */
  render: Array<{
    background?: string
    color?: string
    title?: string
    logoProps?: {
    /** svg or url */
      logo?: string
      name: string
    }
  }>
}
export type ParentPluginPlaygroundItem = Record<string, PluginPlaygroundItem>

/**
 * Create:
 *  - [[Note]]:
 *    - [[Source]]
 *    - Author: [[Person]]
 *    - [[Keyword]]
 *  - [[Source]]:
 *    - Author: [[Person]]
 *    - SourceURL: string
 *    - SourceTitle: string
 *    - SourceDescription: string
 *    - Image: string
 *    - timestamp: string
 *    - [[Keyword]]
 *    - content of the context
 *  -  [[Person]]:
 *    - authorJob: string
 *    - email: string
 *    - linkedin: string
 *    - twitter: string
 *    - [[Source]]
 *  - [[Keyword]]:
 *    - [[Source]]
 *    - [[Note]]
 */
export interface Context {
  people: Array<{
    name: string
    picture?: string
    job?: string
    email?: string
    about?: string
    linkedin?: string[]
    twitter?: string[]
    tiktok?: string[]
    instagram?: string[]
    substack?: string[]
    github?: string[]
    mastodon?: string[]
    youtube?: string[]
    website?: string[]
    names?: string[]
    anchor?: string
  }>
  keywords: Topics
  source: {
    title?: string
    url?: string
    canonical?: string
    image?: string
    description?: string
    content?: string
    published?: string
    timestamp?: Array<{
      timestamp?: string
      url?: string
    }>
    appName?: string // can be many
    type?: SOURCE_TYPE_THAT_CLIP | SOURCE_TYPE | string // can be many
    dmContent?: Array<{ content?: string, published?: string }>
    ttr?: number
    text?: string
    icon?: string
    price?: string
    rating?: string
    recipeIngredient?: string[] | string
    recipeInstructions?: string[] | string
    startDate?: string
    endDate?: string
    location?: string
  }
  other?: {
    duration?: number
    creationDate?: string
    aiTitle?: string
  }
  isFinished?: boolean
  error?: string
  loader?: boolean
  clipContent?: boolean
  pluginPlayground?: Record<string, ParentPluginPlaygroundItem>
}

export interface Topics {
  subject: string[]
  collections: string[]
  organizations: string[]
  places: string[]
  people: string[]
  hashTags: string[]
  emails: string[]
  atMentions: string[]
  urls: string[]
  phoneNumbers: string[]
  acronyms: string[]
  quotations: string[]
}
