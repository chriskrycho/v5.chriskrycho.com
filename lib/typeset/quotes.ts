import type { TextNode } from 'htmlparser2';
import { isElement, textOf } from './dom.ts';

/**
   Straight quotes to typographic quotes, plus primes.

   Direction depends on what surrounds a quote character, which may sit in a
   different text node — `it's <em>fine</em>` is three nodes. So inside a
   paragraph the replacement runs against the parent's *entire* text and this
   node's span is sliced back out of the result.
 */
export default function quotes(text: string, node: TextNode): string {
   const parent = node.parent;

   if (
      parent !== null &&
      isElement(parent) &&
      (parent.name === 'p' || parent.name === 'blockquote')
   ) {
      const parentText = textOf(parent);

      if (parentText !== text) {
         const replaced = replace(parentText);

         let start = 0;
         for (const sibling of parent.children) {
            if (sibling === node) break;
            start += textOf(sibling).length;
         }

         return replaced.slice(start, start + text.length);
      }
   }

   return replace(text);
}

function replace(text: string): string {
   const replaced = text
      .replace(/(\W|^)"([^\s\!\?:;\.,‽»])/g, '$1“$2') // beginning "
      .replace(/(“[^"]*)"([^"]*$|[^“"]*“)/g, '$1”$2') // ending "
      .replace(/([^0-9])"/g, '$1”') // remaining " at end of word
      .replace(/(\W|^)'(\S)/g, '$1‘$2') // beginning '
      .replace(/([a-z])'([a-z])/gi, '$1’$2') // conjunction's possession
      .replace(/((‘[^']*)|[a-z])'([^0-9]|$)/gi, '$1’$3') // ending '
      .replace(/(‘)([0-9]{2}[^’]*)(‘([^0-9]|$)|$|’[a-z])/gi, '’$2$3') // abbrev. years like '93
      .replace(/(\B|^)‘(?=([^’]*’\b)*([^’‘]*\W[’‘]\b|[^’‘]*$))/gi, '$1’') // backwards apostrophe
      .replace(/'''/g, '‴') // triple prime
      .replace(/("|'')/g, '″') // double prime
      .replace(/'/g, '′');

   // Allow escaped quotes
   return replaced
      .replace(/\\“/g, '"')
      .replace(/\\”/g, '"')
      .replace(/\\’/g, "'")
      .replace(/\\‘/g, "'");
}
