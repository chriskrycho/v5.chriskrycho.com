import type { TextNode } from 'htmlparser2';

const pull = (className: string, content = ''): string =>
   '<span class="pull-' + className + '">' + content + '</span>';

const push = (className: string, content = ''): string =>
   '<span class="push-' + className + '">' + content + '</span>';

const doubleWidth = [
   '&quot;',
   '"',
   '“',
   '„',
   '”',
   '&ldquo;',
   '&OpenCurlyDoubleQuote;',
   '&#8220;',
   '&#x0201C;',
   '&rdquor;',
   '&rdquo;',
   '&CloseCurlyDoubleQuote;',
   '&#8221;',
   '&ldquor;',
   '&bdquo;',
   '&#8222;',
];

const singleWidth = ["'", '&prime;', '&apos;', '&lsquo;', '&rsquo;', '‘', '’'];

/**
   Every candidate begins with one of these, so a word starting with anything
   else cannot match and can skip all 23 `startsWith` probes. This guard is what
   makes the pass cheap: the overwhelming majority of words fail it immediately.
 */
const CANDIDATE_FIRST_CHARS = new Set(
   [...singleWidth, ...doubleWidth].map((candidate) => candidate.charAt(0)),
);

/**
   Wraps leading quotes in `pull-*` spans, and the preceding word in a matching
   `push-*` span, so quotes can hang into the margin.

   Runs after `punctuation`, and depends on it: the candidate lists include
   entity references, which are what that pass leaves behind.
 */
export default function hangingPunctuation(text: string, node: TextNode): string {
   if (text.length < 2) return text;

   const words = text.split(' ');
   let touched = false;

   for (let i = 0; i < words.length; i++) {
      let word = words[i] ?? '';
      if (!CANDIDATE_FIRST_CHARS.has(word.charAt(0))) continue;

      for (const punctuation of singleWidth) {
         if (!word.startsWith(punctuation)) continue;

         let insert = pull('single', punctuation);
         const previous = i > 0 ? (words[i - 1] ?? '') : '';

         if (previous !== '') {
            words[i - 1] = previous + push('single');
         } else if (hasAdjacentText(node)) {
            insert = push('single') + insert;
         }

         word = insert + word.slice(punctuation.length);
         touched = true;
      }

      for (const punctuation of doubleWidth) {
         if (!word.startsWith(punctuation)) continue;

         let insert = pull('double', punctuation);
         const previous = i > 0 ? (words[i - 1] ?? '') : '';

         if (previous !== '') {
            words[i - 1] = previous + push('double');
         } else if (hasAdjacentText(node)) {
            insert = push('double') + insert;
         }

         word = insert + word.slice(punctuation.length);
         touched = true;
      }

      words[i] = word;
   }

   // Rejoining is a no-op when nothing matched, so skip the allocation.
   return touched ? words.join(' ') : text;
}

/**
   Whether text immediately precedes this node across an element boundary, in
   which case the `push-*` span has to go inside this node rather than being
   appended to a previous word that does not exist here.
 */
function hasAdjacentText(node: TextNode): boolean {
   const previous = node.prev;
   if (previous !== null && 'children' in previous && previous.children.length > 0) {
      const lastChild = previous.children[previous.children.length - 1];
      if (lastChild !== undefined && lastChild.type === 'text') return true;
   }

   const parent = node.parent;
   if (parent === null) return false;

   const parentPrevious = parent.prev;
   return (
      parentPrevious !== null &&
      parentPrevious.type === 'text' &&
      parentPrevious.data.trim() !== ''
   );
}
