// Type definitions for MarkdownItFootnote (markdown-it-footnote) 4.0
// Project: https://github.com/markdown-it/markdown-it-footnote
// Definitions by: Chris Krycho <https://github.com/chriskrycho>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

import MarkdownIt = require('markdown-it')

declare module 'markdown-it-footnote' {
   export default function footnote(md: MarkdownIt): void
}
