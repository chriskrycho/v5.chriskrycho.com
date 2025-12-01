---
title: True Myth 9.3.0
subtitle: |
  A new `inspect` method, some bug fixes, and some documentation fixes.

date: 2025-11-25T12:30:00-0700
updated: 2025-11-30T19:55:00-0700

tags:
  - Year of Shipping
  - software development
  - TypeScript
  - True Myth
  - open-source software

link: https://github.com/true-myth/true-myth/releases/tag/v9.3.0

qualifiers:
  audience: |
    TypeScript developers with an interest in even safer typed programming with a functional flair. Assumes a fair bit of types knowledge, but you can get the high level without that!

---

Just released: [True Myth v9.3.0]({{link}})… and [v9.3.1](https://github.com/true-myth/true-myth/releases/tag/v9.3.0), because I thought it had not published correctly to npm, because npm was lagging and didn’t show the <span class="all-smcp">README</span> for several minutes after publication… and then suddenly *did*. Love it. You can install either version and functionality will be identical, in any case.

This release comes with bug fixes, docs fixes, and a family of `inspect` helper functions and methods so you can perform side effects like logging or tracing easily on a `Maybe`, `Result`, or `Task`, including in both chains and with standalone values. There are `inspect` functions and methods for each core type, along with `inspectErr` for `Result` and `inspectRejected` for `Task`.

Using `inspect` with a (contrived) `Maybe` example looks like this:

```ts
import Maybe from 'true-myth/maybe';

const log = (value: unknown) => console.log("The value:", value);
const randomInteger = () => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);

const finalMaybe = Maybe.of(randomInteger())
  .inspect(log)
  .map((n) => n % randomInteger())
  .inspect(log)
  .andThen((n) => n % 2 === 0 ? Maybe.just(n / 2) : Maybe.nothing())
  .inspect(log);
```

For any given run, this will always log two values; it will also log a third when the modulo check passes. The resulting `finalMaybe` is just the normal `Maybe` value.

v9.3.0 also has an important bug fix for the types for `result.all`, `result.any`, and `result.transposeAll`. An interesting case where the types were complicated enough that <abbr title="TypeScript">TS</abbr> just straight up did not catch the errors, even though no casts were involved—yikes! Fixed, now, though, thanks to a user report.
