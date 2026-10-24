// markdown-it-anchor@10's declarations use the pre-v15 CommonJS type shape and
// private markdown-it/lib/* imports. Keep this local override on markdown-it's
// public v15 types instead.
import type { MarkdownIt, StateCore } from 'markdown-it';

type PermalinkOptions = {
   class?: string;
   symbol?: string;
   renderHref?: (slug: string, state: StateCore) => string;
   renderAttrs?: (slug: string, state: StateCore) => Record<string, string | number>;
};

type PermalinkGenerator = (
   slug: string,
   options: PermalinkOptions,
   state: StateCore,
   index: number,
) => void;

type AnchorOptions = {
   level?: number | number[];
   slugify?: (text: string) => string;
   permalink?: PermalinkGenerator;
};

declare const anchor: ((md: MarkdownIt, options?: AnchorOptions) => void) & {
   permalink: {
      headerLink(options?: PermalinkOptions & { safariReaderFix?: boolean }): PermalinkGenerator;
   };
};

export default anchor;
