import { applyToTextNodes, type Transform } from './dom.ts';
import hangingPunctuation from './hanging-punctuation.ts';
import punctuation from './punctuation.ts';
import quotes from './quotes.ts';
import spaces from './spaces.ts';

/**
   The order is load-bearing, and each pass is a separate parse/serialize round
   trip because the passes communicate through the serialized HTML:
   `punctuation` emits entity references that `hangingPunctuation` matches
   against, and the `<span>`s `hangingPunctuation` injects only become real
   elements — and so only become ignorable — once reparsed for `spaces`.

   This is `typeset` with `smallCaps`, `hyphenate`, and `ligatures` disabled,
   which is the only configuration the site uses; those transforms are simply
   not vendored rather than being disabled at runtime.
 */
const TRANSFORMS: Transform[] = [quotes, punctuation, hangingPunctuation, spaces];

/**
   Apply typographic transforms to a fragment of rendered HTML.

   A vendored replacement for `typeset@0.3.5`, which spent most of its time in
   cheerio 0.22's per-node wrapper allocation rather than in the transforms
   themselves. Output is byte-for-byte identical; see `typeset.test.ts`.
 */
export default function typeset(html: string): string {
   let result = html;
   for (const transform of TRANSFORMS) result = applyToTextNodes(result, transform);
   return result;
}
