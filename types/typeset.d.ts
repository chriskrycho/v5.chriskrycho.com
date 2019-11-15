export type OptionName =
   | 'quotes'
   | 'hyphenate'
   | 'ligatures'
   | 'smallCaps'
   | 'punctuation'
   | 'hangingPunctuation'
   | 'spaces'

export type Options = {
   /** string of a CSS selector to skip */
   ignore?: string
   /** string of a CSS selector to only apply typeset */
   only?: string
   /** array of features to disable */
   disable?: OptionName[]
}

export default function typeset(html: string, options?: Options): string
