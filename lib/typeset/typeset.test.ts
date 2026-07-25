import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import typeset from './index.ts';

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

test('is idempotent over already-typeset output', () => {
   // Not a property of the transforms in general — `punctuation` will happily
   // re-process its own output — but it must hold for the pull/push spans,
   // which are ignored on a second pass. Guards the ignore-list compilation.
   for (const fixture of fixtures) {
      const once = typeset(fixture.input);
      assert.equal(typeset(once).includes('pull-single</span>'), false, fixture.name);
   }
});
