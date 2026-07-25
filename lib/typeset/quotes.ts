import type { TextNode } from 'htmlparser2';
import { isElement, textOf } from './dom.ts';

/**
   Straight quotes to typographic quotes, plus primes.

   Direction depends on what surrounds a quote character, and that context may
   live in a *different* text node — `he said <em>“this”</em> loudly` is three
   nodes, and the rules below look across the whole run to decide whether a
   given `'` opens, closes, or is a prime. So inside a paragraph the rules are
   applied to the parent's entire text and this node's span is taken back out of
   the result.

   Taking that span back out is the whole difficulty: the rules can *shorten*
   the string (`'''` becomes one character), so an offset into the parent's
   untransformed text does not index the transformed text. See `spanOf`.
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
         let start = 0;
         for (const sibling of parent.children) {
            if (sibling === node) break;
            start += textOf(sibling).length;
         }

         return spanOf(parentText, start, start + text.length);
      }
   }

   return replace(text);
}

/**
   The rules, in order. Kept as data so that `replace` and `trace` cannot drift
   apart: they must apply exactly the same rules in exactly the same order for
   the offset mapping to describe the string `replace` actually produces.

   Every rule is length-preserving or length-*reducing*; none expands. That is
   relied on in `spanOf`, and asserted by the tests.
 */
const RULES: ReadonlyArray<readonly [RegExp, string]> = [
   [/(\W|^)"([^\s\!\?:;\.,‽»])/dg, '$1“$2'], // beginning "
   [/(“[^"]*)"([^"]*$|[^“"]*“)/dg, '$1”$2'], // ending "
   [/([^0-9])"/dg, '$1”'], // remaining " at end of word
   [/(\W|^)'(\S)/dg, '$1‘$2'], // beginning '
   [/([a-z])'([a-z])/dgi, '$1’$2'], // conjunction's possession
   [/((‘[^']*)|[a-z])'([^0-9]|$)/dgi, '$1’$3'], // ending '
   [/(‘)([0-9]{2}[^’]*)(‘([^0-9]|$)|$|’[a-z])/dgi, '’$2$3'], // abbrev. years like '93
   [/(\B|^)‘(?=([^’]*’\b)*([^’‘]*\W[’‘]\b|[^’‘]*$))/dgi, '$1’'], // backwards apostrophe
   [/'''/dg, '‴'], // triple prime
   [/("|'')/dg, '″'], // double prime
   [/'/dg, '′'],

   // Allow escaped quotes
   [/\\“/dg, '"'],
   [/\\”/dg, '"'],
   [/\\’/dg, "'"],
   [/\\‘/dg, "'"],
];

/**
   Every rule needs the `d` flag. `trace` reads `match.indices` to give captured
   text its own provenance, and without it there is no way to know where a
   capture came from. That failure is silent rather than loud — it degrades to
   attributing a whole match to its start, which moves text across inline
   element boundaries and quietly corrupts published output — so it is checked
   here, at load, where dropping a flag fails immediately and obviously.
 */
for (const [pattern] of RULES) {
   if (!pattern.hasIndices) {
      throw new Error(
         `typeset: quotes rule ${String(pattern)} is missing the \`d\` flag`,
      );
   }
}

/**
   A replacement template split into the two kinds of output it produces: the
   literal punctuation a rule writes, and the text it carries over from capture
   groups. `trace` has to treat them differently, so they are separated once
   here rather than on every match.

   A `string` is literal text; a `number` is a capture group index.
 */
type Segment = string | number;

const TEMPLATES: ReadonlyArray<readonly Segment[]> = RULES.map(([, template]) => {
   const segments: Segment[] = [];
   let literal = '';

   for (let i = 0; i < template.length; i++) {
      const character = template[i];
      const following = template[i + 1];

      if (
         character === '$' &&
         following !== undefined &&
         following >= '0' &&
         following <= '9'
      ) {
         if (literal !== '') segments.push(literal);
         literal = '';
         segments.push(Number(following));
         i += 1;
      } else {
         literal += character;
      }
   }

   if (literal !== '') segments.push(literal);
   return segments;
});

export function replace(text: string): string {
   let result = text;
   for (const [pattern, template] of RULES) {
      pattern.lastIndex = 0;
      result = result.replace(pattern, template);
   }
   return result;
}

/**
   Apply the rules to `text` in full, then return the piece of the result that
   came from `[from, to)` of the input.

   The fast path is the interesting one. Because no rule expands, a result the
   same length as its input proves that no rule shortened anything, which in
   turn means nothing moved and the input offsets index the output directly.
   That covers effectively every paragraph, and makes this identical to a plain
   slice; only the rare shortening case pays for the offset mapping.
 */
function spanOf(text: string, from: number, to: number): string {
   const replaced = replace(text);
   if (replaced.length === text.length) return replaced.slice(from, to);

   const { value, origin } = trace(text);
   return value.slice(indexOfOrigin(origin, from), indexOfOrigin(origin, to));
}

/**
   Re-apply the rules, recording where each character of the result came from:
   `origin[i]` is the index in `text` of the character that produced the result's
   `i`th character.

   Most of a rule's output is not new. `'$1”$2'` writes one new character and
   carries the rest over from capture groups, and those groups can be long —
   the "ending &quot;" rule's `$2` reaches to the end of the paragraph. Carried
   characters therefore keep the provenance of where they were captured from;
   only the literal punctuation a rule writes is attributed to the match. Doing
   otherwise collapses every source position inside a match onto its start, and
   any node boundary falling within a match then resolves past the end of the
   run — which swallows the following nodes' text into this one.

   The result is non-decreasing, which is what lets `indexOfOrigin` bisect it.
 */
function trace(text: string): { value: string; origin: number[] } {
   let value = text;
   let origin = Array.from({ length: text.length }, (_, index) => index);

   for (const [rule, [pattern]] of RULES.entries()) {
      const segments = TEMPLATES[rule] ?? [];
      let next = '';
      const nextOrigin: number[] = [];
      let copiedTo = 0;

      pattern.lastIndex = 0;
      let match = pattern.exec(value);

      while (match !== null) {
         next += value.slice(copiedTo, match.index);
         copyOrigins(origin, nextOrigin, copiedTo, match.index);

         // Walks the match's own source range as the template is expanded, so
         // that a literal is attributed to the characters it stands in for —
         // the `”` in `'$1”$2'` replaces the quote *between* the two groups,
         // not anything at the start of the match.
         let cursor = match.index;

         for (const segment of segments) {
            if (typeof segment === 'string') {
               next += segment;
               const source = origin[cursor] ?? origin[value.length - 1] ?? 0;
               for (let i = 0; i < segment.length; i++) nextOrigin.push(source);
               continue;
            }

            const captured = match[segment];
            if (captured === undefined) continue;

            const at = match.indices?.[segment];

            // A group that matched always has indices, given the `d` flag
            // checked at load, so this is unreachable. It is an error rather
            // than a fallback on purpose: guessing here would silently produce
            // wrong output, which is the failure mode this whole mapping exists
            // to prevent.
            if (at === undefined) {
               throw new Error(
                  `typeset: no match indices for group ${segment} of ${String(pattern)}`,
               );
            }

            next += captured;
            copyOrigins(origin, nextOrigin, at[0], at[1]);
            if (at[1] > cursor) cursor = at[1];
         }

         copiedTo = match.index + match[0].length;
         if (match[0].length === 0) pattern.lastIndex += 1;
         match = pattern.exec(value);
      }

      next += value.slice(copiedTo);
      copyOrigins(origin, nextOrigin, copiedTo, value.length);

      value = next;
      origin = nextOrigin;
   }

   return { value, origin };
}

function copyOrigins(from: number[], into: number[], start: number, end: number): void {
   for (let i = start; i < end; i++) {
      const source = from[i];
      if (source !== undefined) into.push(source);
   }
}

/**
   The first result index whose source is at or past `sourceIndex`.

   Using the same rule for both ends of every span means the spans of a
   paragraph's text nodes tile the result exactly, with no gaps or overlaps.
 */
function indexOfOrigin(origin: number[], sourceIndex: number): number {
   let low = 0;
   let high = origin.length;

   while (low < high) {
      const middle = (low + high) >>> 1;
      if ((origin[middle] ?? 0) < sourceIndex) low = middle + 1;
      else high = middle;
   }

   return low;
}
