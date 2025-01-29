// Type definitions for markdown-it-mark (markdown-it-mark) 3.0
// Project: https://github.com/markdown-it/markdown-it-mark
// Definitions by: Chris Krycho <https://github.com/chriskrycho>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

declare module 'markdown-it-mark' {
   import MarkdownIt = require('markdown-it');

   export default function mark(md: MarkdownIt): void;
}
