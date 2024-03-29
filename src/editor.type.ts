export declare type HTMLContent = string
export declare interface JSONContent {
  type?: string
  attrs?: Record<string, any>
  content?: JSONContent[]
  marks?: Array<{
    type: string
    attrs?: Record<string, any>
    [key: string]: any
  }>
  text?: string
  [key: string]: any
}
export declare type Content = HTMLContent | JSONContent | JSONContent[] | null

/**
These are the options recognized by the
[`parse`](https://prosemirror.net/docs/ref/#model.DOMParser.parse) and
[`parseSlice`](https://prosemirror.net/docs/ref/#model.DOMParser.parseSlice) methods.
*/
export interface ParseOptions {
  /**
    By default, whitespace is collapsed as per HTML's rules. Pass
    `true` to preserve whitespace, but normalize newlines to
    spaces, and `"full"` to preserve whitespace entirely.
    */
  preserveWhitespace?: boolean | 'full'
  /**
    The child node index to start parsing from.
    */
  from?: number
  /**
    The child node index to stop parsing at.
    */
  to?: number
}
