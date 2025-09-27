---
title: True Myth v9.2.0
subtitle: |
  Just one new, but nice, feature: `flatten` methods and functions!

qualifiers:
  audience: |
    TypeScript developers with an interest in even safer typed programming with a functional flair. Assumes a fair bit of types knowledge, but you can get the high level without that!

date: 2025-09-26T09:34:00-0600

tags:
  - Year of Shipping
  - software development
  - TypeScript
  - True Myth
  - open-source software

---

Last night I published [True Myth v9.2.0][release], with one nice new feature: `flatten` methods and helper functions for `Maybe`, `Result`, and `Task` types.

[release]: https://github.com/true-myth/true-myth/releases/tag/v9.2.0

{% callout %}

If you’re unfamiliar with True Myth, it’s a TypeScript library that provides *really nice* `Maybe`, `Result`, and `Task` types to handle null, error, and async code in a way that is both safe and idiomatic. My friend [Ben][ben] and I created it back in 2017, and we’ve been keeping it up ever since.

[ben]: https://benmakuh.com

{% endcallout %}

This kind of method—variously named `flatten` and `join` across other languages and libraries[^flat]—is quite useful when dealing with nested versions of data structures.

For example, if you end up with a nested `Maybe`, you could use its `flatten` method like this:

```ts
import Maybe from 'true-myth/maybe';

const wrapped = Maybe.of(Maybe.of(123));
console.log(wrapped.toString());  // Just(Just(123))

const flattened = wrapped.flatten();
console.log(flattened.toString()); // Just(123)
```

In the real world, you wouldn’t normally construct it that way directly, of course. You could, however, easily end up with nested `Result` or `Task` instances when composing together different combinations of fallible operations. In True Myth itself, you can easily end up with `Maybe<Maybe<SomeType>>` by using the `maybe.first` or `maybe.last` functions, which get the first or last elements from an `Array`—because arrays might include `null` or `undefined` items. That way you can distinguish between `maybe.first([])` and `maybe.first([null])`: those produce `Nothing` for “no first item at all” and `Just(Nothing)` for “the first item exists and is `null`” respectively.

We could also try to implement versions of `first` and `last` that avoid this, by dealing with arrays differently depending on whether the array’s contents are nullable or not. This gets *very* hairy *very* quickly, and it would result in inconsistent function signatures that require you to use the result of the function differently depending on the type of the input array. We chose consistency instead, and now those are even easier to work with: if you don’t care about the difference between “no items” and “first item is null”, you can just use `flatten`:

```ts
import { first } from 'true-myth/maybe';

let array = [null, 1, 2, undefined, 3];
let first = first(array).flatten(); // Nothing, not Just(Nothing)
```

The same thing works for nested instances of both `Result` and `Task`. Should be nice little quality-of-life win!

---

I noticed yesterday, when releasing v9.2.0, that it has been just over 8 years since we started working on this project! The first commit was September 21, 2017, which feels like a lifetime ago. (I still lived in a different state; it was three jobs ago; my kids were 5 and 3 instead of 13 and 11; I was still actively producing [New Rustacean][nr] and [Winning Slowly][ws]; I had yet to start [composing][] again!) My co-author and fellow maintainer [Ben Makuh][bm] and I had found ourselves frustrated by the lack of first class 
TypeScript support in existing libraries ([Folktale][f] and [Sanctuary][s]—both good libraries!) and also wanting a bit more idiomatic <abbr title="JavaScript">JS</abbr>/<abbr title="TypeScript">TS</abbr> code. So… we built it. And here we are, 8 years later, still going strong. That feels pretty good!

[nr]: https://newrustacean.com
[ws]: https://winningslowly.org
[f]: https://folktale.github.io
[s]: https://sanctuary.js.org


[^flat]: And, in JavaScript, `Array.prototype.flat`, courtesy of the language’s commitment (and need) to avoid breaking the web, plus poor choices with monkey-patching built-in types from very popular libraries in the late 2000’s.


