declare module 'typeset' {
   export type OptionName =
      | 'quotes'
      | 'hyphenate'
      | 'ligatures'
      | 'smallCaps'
      | 'punctuation'
      | 'hangingPunctuation'
      | 'spaces';

   export type Options = {
      ignore?: string;
      only?: string;
      disable?: OptionName[];
   };

   export default function typeset(html: string, options?: Options): string;
}
