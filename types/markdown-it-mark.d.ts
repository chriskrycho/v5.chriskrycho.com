// Type definitions for markdown-it-mark (markdown-it-mark) 3.0
// Project: https://github.com/markdown-it/markdown-it-mark
// Definitions by: Chris Krycho <https://github.com/chriskrycho>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

import MarkdownIt = require('markdown-it');

declare module 'markdown-it-mark' {
   export default function mark(md: MarkdownIt): void;
}
