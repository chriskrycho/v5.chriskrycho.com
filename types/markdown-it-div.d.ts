// Type definitions for MarkdownItDiv (markdown-it-div) 2.0
// Project: https://github.com/kickscondor/markdown-it-div#readme
// Definitions by: Chris Krycho <https://github.com/chriskrycho>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

import MarkdownIt = require('markdown-it')
import Renderer = require('markdown-it/lib/renderer')
import Token = require('markdown-it/lib/token')

declare namespace markdownItContainer {
   interface ContainerOpts {
      marker?: string
      validate?(params: string): boolean
      render?(
         tokens: Token[],
         index: number,
         options: any,
         env: any,
         self: Renderer,
      ): void
   }

   // eslint-disable-next-line @typescript-eslint/camelcase
   function div_plugin(md: MarkdownIt, opts?: ContainerOpts): void
}

// eslint-disable-next-line @typescript-eslint/camelcase
declare const MarkdownItDiv: typeof markdownItContainer.div_plugin
export = MarkdownItDiv
