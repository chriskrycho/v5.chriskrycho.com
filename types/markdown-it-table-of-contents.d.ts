// Type definitions for MarkdownItAnchor (markdown-it-anchor) 4.0
// Project: https://github.com/valeriangalliat/markdown-it-anchor
// Definitions by: Chris Krycho <https://github.com/seryl>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

import MarkdownIt = require('markdown-it')

declare namespace tableOfContents {
   interface Options {
      /** Headings levels to use (2 for h2:s etc). Defaults to `[1, 2]` */
      includeLevel?: number[]

      /** The class for the container DIV. Defaults to `"table-of-contents"` */
      containerClass?: string

      /**
         A custom slugification function. Defaults to:

         ```ts
         (s: string) =>
            encodeURIComponent(
               String(s)
                  .trim()
                  .toLowerCase()
                  .replace(/\s+/g, '-')
            )
         ```
         
        */
      slugify?(s: string): string

      /**
         Regex pattern of the marker to be replaced with TOC.
         
         Defaults to `/^\[\[toc\]\]/im`.
       */
      markerPattern?: string | RegExp

      /** Type of list (`'ul'` for unordered, `'ol'` for ordered). Defaults to `'ul'`. */
      listType?: 'ul' | 'ol'

      /** 
         A function for formatting headings

         ```ts
         function format(headingAsString) {
            // manipulate the headings as you like here.
            return manipulatedHeadingString;
         }
         ```
       */
      format?: (heading: string) => string

      /**
         If `true`, renders all the headers in TOC, even if the headers are in incorrect
         order.
       */
      forceFullToc?: boolean

      /**
         Optional HTML string for container header. Defaults to:

         ```html
         <div class="toc-container-header">
           <!-- rendered contents -->
         </div>
         ```
       */
      containerHeaderHtml?: string

      /**
         Optional HTML string for container footer. Defaults to:

         ```html
         <div class="toc-container-footer">
           <!-- rendered contents -->
         </div>
         ```
       */
      containerFooterHtml?: string

      /** A function for transforming the TOC links. Defaults to `undefined`. */
      transformLink?: (link: unknown) => unknown
   }
}

declare function tableOfContents(md: MarkdownIt, opts?: tableOfContents.Options): void

export = tableOfContents
