import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import htmlparser2 from 'htmlparser2';
import type { Node } from 'htmlparser2';

import { applyToTextNodes } from './dom.ts';
import typeset from './index.ts';
import quotes, { replace } from './quotes.ts';

/** Just the `quotes` pass, so its behaviour can be asserted without the rest. */
const quotePass = (html: string): string => applyToTextNodes(html, quotes);

/** Test-only: the inputs below have no attributes containing `>`. */
const textOnly = (html: string): string => html.replace(/<[^>]+>/g, '');

/** Each text node's data, in document order. */
function textNodesOf(html: string): string[] {
   const found: string[] = [];

   const walk = (nodes: Node[]): void => {
      for (const node of nodes) {
         if (node.type === 'text') found.push(node.data);
         else if (node.type !== 'comment' && node.type !== 'directive')
            walk(node.children);
      }
   };

   walk(htmlparser2.parseDOM(html, { decodeEntities: false }));
   return found;
}

/**
   Golden fixtures recorded from `typeset@0.3.5` before it was replaced, run
   with the site's options (`smallCaps`, `hyphenate`, and `ligatures` disabled).

   The site's rendered HTML is the contract here, so these are checked
   byte-for-byte. They are a record of the old package's behaviour, quirks
   included; if one of them ever needs to change, that is a deliberate change to
   the published output, not a refactor.

   Regenerate only against the original package, never against this
   implementation, or the test stops being independent of the code it covers.
 */
interface Fixture {
   name: string;
   input: string;
   expected: string;
}

const fixtures = JSON.parse(
   readFileSync(new URL('./__fixtures__/typeset.json', import.meta.url), 'utf8'),
) as Fixture[];

test('fixtures are present', () => {
   assert.ok(fixtures.length > 0, 'expected at least one fixture');
});

for (const fixture of fixtures) {
   test(fixture.name, () => {
      assert.equal(typeset(fixture.input), fixture.expected);
   });
}

test('quotes: length-changing replacement before inline sibling preserves sibling text', () => {
   assert.equal(typeset("<p>6'' <em>high</em></p>"), '<p>6″ <em>high</em></p>');
});

/*
   `quotes` decides quote direction from the whole paragraph, then takes each
   text node's span back out of the result. Two things have to hold at once:
   the context must stay complete, and the span must be located correctly even
   though the rules can shorten the string. The tests below pin down each.
 */

test('quotes: no rule expands its input', () => {
   // The offset mapping's fast path infers "nothing moved" from "length did not
   // change", which is only sound if no rule can ever make the string longer.
   for (const fixture of fixtures) {
      const text = textOnly(fixture.input);
      assert.ok(
         replace(text).length <= text.length,
         `${fixture.name}: replace() expanded its input`,
      );
   }
});

test('quotes: a shortening rule shifts a later node’s span', () => {
   // `''` collapses to one character, so everything after it in the paragraph
   // sits one place earlier in the result than in the source.
   assert.equal(quotePass("<p>6'' <em>high</em></p>"), '<p>6″ <em>high</em></p>');

   // Two shrinks, so the last node's span is displaced by two.
   assert.equal(
      quotePass("<p>6'' <em>high</em> 7'' <em>wide</em> ok</p>"),
      '<p>6″ <em>high</em> 7″ <em>wide</em> ok</p>',
   );
});

test('quotes: node spans tile the transformed paragraph exactly', () => {
   // No gaps, no overlaps, nothing duplicated across a boundary.
   //
   // `replace(wholeParagraph)` is only a valid expectation when the inline
   // elements hold text the rules leave alone and no rule is on the ignore
   // list, because otherwise those nodes are transformed independently of the
   // paragraph. Keep the inline content inert.
   const paragraphs = [
      "<p>He said 'x'' and <em>then</em> more 'y'</p>",
      "<p>'''triple''' <em>a</em> '' <em>b</em> tail</p>",
      "<p><em>lead</em> 6'' <em>mid</em> 7'' <em>trail</em></p>",
      '<p>plain <em>text</em> with no quotes at all</p>',
      // A match whose capture groups reach across the element, while another
      // rule shortens the paragraph.
      `<p>He said "<em>x</em>" 6'' end</p>`,
      `<p>"<em>a</em>" "<em>b</em>" 9'' "<em>c</em>"</p>`,
      `<p><em>lead</em>"quoted" 3'' <em>tail</em></p>`,
   ];

   for (const paragraph of paragraphs) {
      assert.equal(
         textOnly(quotePass(paragraph)),
         replace(textOnly(paragraph)),
         paragraph,
      );
   }
});

test('quotes: a substitution spanning an inline element keeps text in place', () => {
   // The "ending &quot;" rule's `$2` runs to the end of the paragraph, so its
   // match covers the `<em>` and everything after it. Attributing the whole
   // replacement to the match's start collapses every source position within
   // it, and the first node's span then swallows the rest of the paragraph.
   assert.equal(
      quotePass(`<p>He said "<em>x</em>" 6'' end</p>`),
      '<p>He said “<em>x</em>” 6″ end</p>',
   );
   assert.equal(
      quotePass(`<p>a "<em>b</em>" c 7'' d</p>`),
      '<p>a “<em>b</em>” c 7″ d</p>',
   );

   // Without a shortening rule the fast path handles it; same answer either way.
   assert.equal(
      quotePass(`<p>He said "<em>x</em>" plain end</p>`),
      '<p>He said “<em>x</em>” plain end</p>',
   );
});

/*
   Randomised paragraphs.

   `npm test` runs a small deterministic sweep; `npm run test:fuzz` runs a large
   one. Both are seeded, and the seed is reported on failure so any paragraph it
   finds can be reproduced:

       TYPESET_FUZZ=1000000 TYPESET_FUZZ_SEED=99 npm test

   Note what is *not* asserted here. `replace(wholeParagraph)` looks like the
   obvious expectation and is not a sound one for generated input: text inside
   an inline element is transformed on its own, because its parent is not the
   paragraph; `code` and `.small-caps` are ignored outright; and each text node
   is transformed in document order, so by the time a later one is reached the
   earlier ones have already changed underneath it. All three produce
   "failures" that are the oracle's fault. Tiling is asserted above, on curated
   paragraphs where it does hold. What is checked here holds unconditionally.
 */
const FUZZ_ITERATIONS = Number(process.env['TYPESET_FUZZ'] ?? 4000);
const FUZZ_SEED = Number(process.env['TYPESET_FUZZ_SEED'] ?? 24680);

function randomParagraphs(count: number, seed: number): string[] {
   let state = seed;
   const random = () => (state = (state * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
   const pick = <T>(options: readonly T[]): T =>
      options[Math.floor(random() * options.length)] as T;

   // Deliberately includes ignored elements, escaped quotes, number ranges, and
   // every character any rule reacts to.
   const atoms = [
      "'",
      '"',
      "''",
      "'''",
      'a',
      'ab',
      ' ',
      '6',
      '93',
      "it's",
      '.',
      ',',
      '\\"',
      '?',
      '!',
      '‘',
      '’',
      '“',
      '”',
      ' 12-15 ',
      '\\“',
   ];
   const inner = ['x', 'yz', "it's", '"q"', "6''", 'a b'];
   const tags = ['em', 'strong', 'a', 'code', 'span class="small-caps"'];

   const paragraphs: string[] = [];
   for (let iteration = 0; iteration < count; iteration++) {
      const wrapper = pick(['p', 'blockquote']);
      let html = `<${wrapper}>`;

      for (let i = 0, parts = 3 + Math.floor(random() * 10); i < parts; i++) {
         if (random() < 0.4) {
            const tag = pick(tags);
            html += `<${tag}>${pick(inner)}</${tag.split(' ')[0]}>`;
         } else {
            html += pick(atoms);
         }
      }

      paragraphs.push(`${html}</${wrapper}>`);
   }

   return paragraphs;
}

const elementsOf = (html: string): string => (html.match(/<[^>]+>/g) ?? []).join('');

test(`quotes: structure survives ${FUZZ_ITERATIONS} random paragraphs`, () => {
   // No node grows, no node appears or disappears, and the markup is untouched.
   //
   // Per-node length is the invariant that catches text moving across an
   // element boundary, and it has to be per-node: swallowing a sibling's text
   // leaves the paragraph's *total* length unchanged, so a total would miss it.
   // Sound because no rule expands — see the test above.
   const where = (html: string) => `seed ${FUZZ_SEED}, paragraph ${JSON.stringify(html)}`;

   for (const html of randomParagraphs(FUZZ_ITERATIONS, FUZZ_SEED)) {
      const transformed = quotePass(html);

      assert.equal(
         elementsOf(transformed),
         elementsOf(html),
         `markup changed: ${where(html)}`,
      );

      const before = textNodesOf(html);
      const after = textNodesOf(transformed);
      assert.equal(after.length, before.length, `node count changed: ${where(html)}`);

      for (const [i, text] of after.entries()) {
         const original = before[i] ?? '';
         assert.ok(
            text.length <= original.length,
            `text node grew: ${where(html)}\n  ${JSON.stringify(original)} -> ${JSON.stringify(text)}`,
         );
      }
   }
});

test('quotes: direction comes from the whole paragraph, not a prefix', () => {
   // The closing quote lives after the `<em>`. Judging the first text node on
   // its own would let the "backwards apostrophe" rule conclude the quote is
   // never closed and emit `’` instead of `‘`.
   const paragraph = "<p>simple: 'Jesus Christ <em>as attested</em> is the Word.'</p>";

   assert.equal(
      quotePass(paragraph),
      '<p>simple: ‘Jesus Christ <em>as attested</em> is the Word.’</p>',
   );

   // Guard the reason, so this cannot silently start passing for the wrong one.
   assert.equal(replace("simple: 'Jesus Christ ").includes('’'), true);
});

test('is idempotent over already-typeset output', () => {
   // Not a property of the transforms in general — `punctuation` will happily
   // re-process its own output — but it must hold for the pull/push spans,
   // which are ignored on a second pass. Guards the ignore-list compilation.
   for (const fixture of fixtures) {
      const once = typeset(fixture.input);
      assert.equal(typeset(once).includes('pull-single</span>'), false, fixture.name);
   }
});
