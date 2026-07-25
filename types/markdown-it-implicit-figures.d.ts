declare module 'markdown-it-implicit-figures' {
   import type MarkdownIt from 'markdown-it';

   export interface Options {
      dataType?: boolean;
      figcaption?: boolean;
      tabindex?: boolean;
      link?: boolean;
   }

   export default function implicitFigures(md: MarkdownIt, options?: Options): void;
}
