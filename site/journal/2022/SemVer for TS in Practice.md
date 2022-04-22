---
title: SemVer for TS in Practice
subtitle: >
    Showing how the recommendations from [www.semver-ts.org](https://www.semver-ts.org) can actually work in the real world.
tags:
    - TypeScript
    - Semantic Versioning
    - software development
date: 2022-04-22T08:30:00-0600
qualifiers:
    audience: >
        Library maintainers in or adjacent to the TypeScript ecosystem, especially anyone skeptical of the practicality of the [Semantic Versioning for TypeScript Types](https://www.semver-ts.org) proposal.

---

Over the last couple weeks, I have been making some noise about the [Semantic Versioning for TypeScript Types](https://www.semver-ts.org) specification I authored as part of my work on TypeScript at LinkedIn. All well and good to talk about the value of that work in theory… but does it work in the real world? Well, I wouldn’t be writing this blog post if the answer were *no*.

In [TypeScript <abbr title="pull request">PR</abbr> #43183](https://github.com/microsoft/TypeScript/pull/43183), the TypeScript team introduced a breaking change, which is landing in TypeScript 4.7. The change, like most breaking changes in TypeScript, is a good one: it catches bugs which were not caught previously. However, it is a breaking change! I noticed because the <abbr title="TypeScript">TS</abbr> [nightly tests](https://github.com/true-myth/true-myth/blob/9d0cc3beb48889626a49e22b4a30af06fd691814/.github/workflows/Nightly.yml) for [True Myth](https://github.com/true-myth/true-myth) started failing a few weeks ago when the <abbr>PR</abbr> landed on <abbr>TS</abbr>.

This morning, I sat down with a cup of espresso at a local coffee shop and started working on the library. The actual failure case was fairly straightforward. The `Maybe` and `Result` types in True Myth implement `toString()` so that you get something like `Just(42)` out instead of `"[object Object]"` when calling `toString()` on the types. A while back, I had added a type constraint on the shared `toString()` function to make it type safe for True Myth’s types to call `.toString()` on their wrapped values directly:

```ts
function toString<T extends { toString(): string }>(maybe: Maybe<T>): string {
  // implementation...
}
```

In TypeScript 4.7, this stops working, because `T` *used to* implicitly get resolved to `extends object` further up the chain as part of <abbr>TS</abbr>’s inference, but it doesn’t anymore, which means that writing `Maybe.of(42)` now produces a type which *does not* satisfy this constraint. As a result, where the `Maybe` and `Result` classes’ `.toString()` methods called the standalone `toString()` function, TS was quite reasonably complaining that the types weren’t compatible:

```
    src/maybe.ts:244:21 - error TS2345: Argument of type 'Maybe<T>' is not assignable to parameter of type 'Maybe<{ toString(): string; }>'.
      Type 'Just<T>' is not assignable to type 'Maybe<{ toString(): string; }>'.
        Type 'Just<T>' is not assignable to type 'Just<{ toString(): string; }>'.
          Type 'T' is not assignable to type '{ toString(): string; }'.
    244     return toString(this);
                            ~~~~
      src/maybe.ts:53:17
        53 class MaybeImpl<T> {
                           ~
        This type parameter probably needs an `extends object` constraint.
```

I started by just that kind of type constraint to the type parameters for `Maybe` and `Result`, and that worked… but then there was *another* issue: it meant that I had to add type annotations at a couple points in the test suite to tell <abbr>TS</abbr> how to resolve the types in a way that was actually safe. That would work, but it would also be a breaking change! I got as far as writing a commit message which explained it before realizing there was no way I could justify making this and *not* calling it a breaking change.

One option would be to say that the current version only supports up through TS 4.6, and bundle it into a breaking change as part of the already-planned upcoming major release of the library. That feels bad, though: there is no *other* reason not to support <abbr>TS</abbr> 4.7 with the current version of the library. More, the result would be making the experience of working with those cases worse.

So I took a step back and thought about the problem a bit more. It occurred to me that if, instead of *adding* constraints to the class methods, I *removed* them from the standalone function type, the problem would go away. To make that work, I would need to make the implementation of the function slightly more generic, to handle any type at all, whether or not it has its own `.toString()` implementation… but that sounded like a net win. So that’s what I did: I re-implemented the `toString()` functions for `Maybe` and `Result` to do the right thing *regardless* of what the value they were dealing with was:

- If the wrapped value has a `toString()` method which does indeed return a string, return the string it produces.
- If the wrapped value doesn’t have a `toString()` method, use `JSON.stringify()` on the wrapped value.
- If the wrapped value has a `toString()` method but it returns something which isn’t a string, use `JSON.stringify()` on the wrapped value instead.[^ignoring-the-user]
- If the wrapped value has some *other* property named `toString` on it which isn’t a function at all, use `JSON.stringify()` on the wrapped value.

The result is an implementation which is much robust and more useful than what we had before—and it works on TypeScript 4.7. I published it as [True Myth 5.3.0](https://github.com/true-myth/true-myth/releases/tag/v5.3.0) just a few minutes ago. (Now, to see about fixing the other three libraries I maintain which have the same issue…)

The Semantic Versioning for TypeScript Types proposal works for real libraries in the real world. Following the guidance we came up with really does make it possible to insulate users from breaking changes in TypeScript. It’s a good feeling!

<div class="callout">

Thoughts, comments, or questions? Discuss on [LinkedIn][li], [Hacker News][hn], [lobste.rs][l], or [Twitter][t]!

[li]: https://www.linkedin.com/feed/update/urn:li:activity:6923287174180212736/
[hn]: https://news.ycombinator.com/item?id=31123315
[l]: https://lobste.rs/s/ljrj0f/semver_for_ts_practice_real_world_example
[t]: https://twitter.com/chriskrycho/status/1517520606287171584

</div>



[^ignoring-the-user]: You could make an argument that this is ignoring the design intent of the user who implemented a method like `toString() { return 123 }`. Fair enough. The only type safe option would be to call `JSON.stringify()` on the result of *that*, though: `123` isn’t a valid `string`! If you use True Myth and think we should use `JSON.stringify()` on the result of any `.toString()` implementation, rather than calling it on the original object, we’re open to being persuaded,s o open an issue or discussion!