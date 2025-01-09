---
title: True Myth v8.3.0
subtitle: >
    Lots of async combinators, a new `Result` helper… and some deprecations.

date: 2025-01-09T21:00:00-0700

tags:
    - TypeScript
    - open-source software
    - software development

summary: >
    Adding all the bits we didn’t have in the first Task release… and deprecating some mistakes, too.

image:
    cdn: true-myth-v8.3.0.png

qualifiers:
    audience: |
        TypeScript developers with an interesting in *even safer* typed programming with a functional flair.

---

Like the title says, I just released [True Myth v8.3.0][8.3.0]! Some highlights of this latest release:

- All the missing `Task` combinators that weren’t part of v8.3.0: `all`, `allSettled`, `any`, `race`, as well as fancy new `timer` and `timeout` functions.
- New `safe` functions in the `Result` and `Task` modules, for transforming a throwing function into one you can call safely and get a `Result` or `Task` instead.
- Module-scope versions of all the major `Task` constructors.
- A new name for the `wrapReturn` function in the `Maybe` module, `safe`, to match the same function in the `Result` and `Task` modules

Lowlights of this release: it deprecates a bunch of the static methods on the `Task` class, because they are not tree-shake-able, and recommends using module-scoped functions instead. We will cut a 9.0.0 release fairly soon which removes those and cleans up some of the naming choices we had to make as a result.

There are actually a couple more nice features, too! See [the release][8.3.0] for all the details.

As usual, you can get it by installing it with your favorite package manager:

| Package manager | Command                     |
| --------------- | --------------------------- |
| npm             | `npm add true-myth@^8.3.0`  |
| yarn            | `yarn add true-myth@^8.3.0` |
| pnpm            | `pnpm add true-myth@^8.3.0` |
| bun             | `bun add true-myth@^8.3.0`  |

---

As a meta note, I am really happy to be getting this out the door not all that long after shipping the initial release. I *do* wish I had caught the mistakes that led to the deprecations *before* we shipped 8.2.0, but it is not the end of the world. I *am* happy to be keeping up my [year of shipping][shipping]. Momentum!

[8.3.0]: https://github.com/true-myth/true-myth/releases/tag/v8.3.0
[8.2.0]: https://github.com/true-myth/true-myth/releases/tag/v8.2.0
[shipping]: https://v5.chriskrycho.com/notes/year-of-shipping/