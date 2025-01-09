---
title: True Myth 8.1.0
subtitle: Adding some test helpers!
summary: |
    v8.1.0 introduces `true-myth/test-helpers`, with `unwrap` and `unwrapErr` functions for easier test-writing.

image: https://cdn.chriskrycho.com/images/true-myth-v8.1.0.png

date: 2024-12-03T17:26:00-0700
updated: 2025-01-08T17:59:00-0700

tags:
    - software development
    - open-source software
    - TypeScript

qualifiers:
    audience: |
        TypeScript developers with an interesting in *even safer* typed programming with a functional flair.

---

I just published [v8.1.0][release] of the [True Myth][tm] library my friend [Ben][ben] and I have maintained for the past 7 years (!). True Myth provides nice `Maybe` and `Result` types, very much inspired by Rust’s `Option` and `Result`, but with appropriate changes for TypeScript, and while it is not the *most* popular tool in its space, I still like it *best*, and it has quite a few users!

[release]: https://github.com/true-myth/true-myth/releases/tag/v8.1.0
[ben]: https://benmakuh.com
[tm]: https://github.com/true-myth/true-myth

v8.1.0 adds a new module just for test support, with two functions in it: `unwrap` and `unwrapErr`. You can now write this:

```ts
import { expect, test } from 'vitest'; // or your testing library of choice

import Maybe from 'true-myth/maybe';
import Result from 'true-myth/result';
import { unwrap, unwrapErr } from 'true-myth/test-helpers';

import { producesMaybe, producesResult } from 'my-library';

test('using this new helper', () => {
  expect(unwrap(producesMaybe())).toBe(true);
  expect(unwrap(producesResult('valid'))).toBe('cool');
  expect(unwrapErr(producesResult('invalid')).toBe('oh teh noes');
});
```

This feels pretty nice to me, while striking an important balance in terms of usability in tests and nudging people away from using this in non-test code: the name of the import *should* make most users feel bad about grabbing these for anything but testing! I chose to overload `unwrap` because it really does not add any particular complexity from a library maintenance point of view, and it makes it *much* nicer for someone writing tests like this.

---

Long ago, we had methods which did this:

- `Maybe.prototype.unsafelyUnwrap`
- `Result.prototype.unsafelyUnwrap`
- `Result.prototype.unsafelyUnwrapErr`

We removed these when we made it possible to directly access `.value` and (for `Result`) `.error` after narrowing, because that is always safe to do and guides users toward a happy path: the *only* ways to get at the wrapped value or error are either to do that check (the easy thing!) or to write an unsafe cast like `myResult as Ok<string, SomeError>` (the more annoying thing!).

A user recently [pointed out][issue], though, that it can be rather annoying for tests, not least for tests where “does this return the correct variant” is the thing under test!

In the interest of continuing to encourage the safe path as the happy path and to avoid adding any bloat to the payload for users who do *not* use these, I added `unwrap` and `unwrapErr` functions to a new `test-support` module. The `unwrap` function is polymorphic; it works correctly with both `Maybe` and `Result`. For obvious reasons, `unwrapErr` only applies to a `Result`.

[issue]: https://github.com/true-myth/true-myth/issues/817
