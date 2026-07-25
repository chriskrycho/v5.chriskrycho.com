import serialize from 'dom-serializer';
import htmlparser2 from 'htmlparser2';
import type { ContainerNode, ElementNode, Node, TextNode } from 'htmlparser2';

const { parseDOM } = htmlparser2;

/**
   A text-level transform. `node` is supplied because two of the transforms
   need their surrounding structure, not just the string.
 */
export type Transform = (text: string, node: TextNode) => string;

/**
   The option set cheerio 0.22 passed to both htmlparser2 and dom-serializer:
   its own prototype defaults, merged with typeset's `decodeEntities: false`.

   Entity decoding must stay off in both directions. The transforms emit entity
   *references* (`&thinsp;`, `&mdash;`, `&nbsp;`) as literal text, and later
   passes match against those literal strings — `hangingPunctuation` looks for
   `&ldquo;` and friends at the start of a word. Decoding on either side would
   change what the subsequent passes see.
 */
const OPTIONS = {
   withDomLvl1: true,
   normalizeWhitespace: false,
   xmlMode: false,
   decodeEntities: false,
};

export const isElement = (node: Node): node is ElementNode =>
   node.type === 'tag' || node.type === 'script' || node.type === 'style';

/**
   typeset's default ignore list, hand-compiled from the selector

       head, code, pre, script, style, img, br, hr,
       [class^="pull-"], [class^="push-"], .small-caps

   Note the asymmetry, which is inherited rather than chosen: `^=` tests the
   whole attribute value, so `pull-`/`push-` are prefix matches against the
   entire `class` string, whereas `.small-caps` matches a whitespace-delimited
   token anywhere in it.

   The `pull-`/`push-` entries are what keep the spans injected by
   `hangingPunctuation` from being reprocessed by the pass that follows it.
 */
const IGNORED_TAGS = new Set([
   'head',
   'code',
   'pre',
   'script',
   'style',
   'img',
   'br',
   'hr',
]);

function isIgnored(node: ElementNode): boolean {
   if (IGNORED_TAGS.has(node.name)) return true;

   const className = node.attribs.class;
   if (className === undefined) return false;
   if (className.startsWith('pull-') || className.startsWith('push-')) return true;

   // Substring check first: this runs on every classed element, and splitting
   // is only worth it for the handful that could actually match.
   if (!className.includes('small-caps')) return false;
   return className.split(/\s+/).includes('small-caps');
}

/**
   The concatenated text of a node and its descendants, matching cheerio's
   `.text()`: comments contribute nothing, everything else recurses.
 */
export function textOf(node: Node): string {
   if (node.type === 'text') return node.data;
   if (node.type === 'comment' || node.type === 'directive') return '';

   let text = '';
   for (const child of node.children) text += textOf(child);
   return text;
}

/**
   Parse `html`, apply `transform` to every text node not under an ignored
   element, and serialize the result.
 */
export function applyToTextNodes(html: string, transform: Transform): string {
   const dom = parseDOM(html, OPTIONS);

   // cheerio's `$(':root')` matches top-level *elements* only, so text nodes at
   // the top level — the newlines markdown-it leaves between blocks — are never
   // visited at all.
   for (const node of dom) if (isElement(node)) visit(node, transform);

   return serialize(dom, OPTIONS);
}

function visit(node: ContainerNode, transform: Transform): void {
   if (isElement(node) && isIgnored(node)) return;

   // Iterate a snapshot: a transform may splice new nodes into the live child
   // list, and those must not themselves be visited.
   for (const child of node.children.slice()) {
      if (child.type === 'text') {
         const text = child.data.replace(/&#39;/g, "'").replace(/&quot;/g, '"');
         child.data = text;
         replaceTextNode(child, transform(text, child));
      } else if (child.type !== 'comment' && child.type !== 'directive') {
         visit(child, transform);
      }
   }
}

function replaceTextNode(node: TextNode, replacement: string): void {
   // With entity decoding off, a replacement containing no `<` always parses
   // back to exactly one text node holding exactly that string — so the
   // parse-and-splice round trip is pure overhead. Only `hangingPunctuation`,
   // which injects `<span>`s, needs the slow path. An empty replacement parses
   // to zero nodes and so must delete the node.
   if (replacement.length > 0 && !replacement.includes('<')) {
      node.data = replacement;
      return;
   }

   spliceIn(node, parseDOM(replacement, OPTIONS));
}

function spliceIn(node: TextNode, replacement: Node[]): void {
   const parent = node.parent;
   if (parent === null) return;

   const siblings = parent.children;
   const index = siblings.indexOf(node);
   if (index < 0) return;

   siblings.splice(index, 1, ...replacement);

   const before = index > 0 ? (siblings[index - 1] ?? null) : null;
   const after = siblings[index + replacement.length] ?? null;

   let previous = before;
   for (const inserted of replacement) {
      inserted.parent = parent;
      inserted.prev = previous;
      if (previous !== null) previous.next = inserted;
      previous = inserted;
   }

   if (previous !== null) previous.next = after;
   if (after !== null) after.prev = previous;

   node.parent = null;
   node.prev = null;
   node.next = null;
}
