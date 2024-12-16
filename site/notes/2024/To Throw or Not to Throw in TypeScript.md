---
title: To Throw or Not to Throw in TypeScript?
subtitle: >
    Taking a bit of inspiration from Rust and ending up with *much* more reliable TypeScript.

summary: >
    Reserve exceptions for exceptional behavior. Use a union type or a `Result` type for excepted errors!

date: 2024-12-16T15:38:00-0700

image:
    cdn: std-fs-read.png

tags:
    - Rust
    - TypeScript
    - software development

---

How I like to structure error handling in my TypeScript code: do what Rust does. What I mean by that is:

Idiomatic Rust <abbr title="application programming interface">API</abbr>s that are fallible by nature return `Result`, and `panic!` is reserved for cases where the thing which went wrong is not “normal” for that <abbr>API</abbr>. For example: `std::fs::read` returns a `Result<Vec<u8>, std::io::Error>`, because the file you are attempting to read from might not even exist![^toctou]

Thus, when I am writing TypeScript, expected errors should show up in the type signature for a function. That can be with a dedicated `Result` type or a simple union type:

```ts
function fallibleUsingUnion(): Valid | Invalid;
function fallibleUsingResult(): Result<Valid, Invalid>;
```

These have slightly different tradeoffs: a `Result` type can provide a lot of conveniences for working with the two paths, but it usually comes with a tiny bit of extra memory overhad and some increase in package size, but that can sometimes be balanced out by the fact that the return type is consistently a `Result` instance, which can sometimes help out the optimizer. (If performance is an issue, measure instead of assuming!)

Either way if it’s obvious that a given operation is fallible, that should appear in the type signature, and it should *not* throw an exception. Exceptions are reserved for *exceptional* behavior.

You can do this with any number of libraries, including:

- [True Myth][tm], the library with `Result` and `Maybe` types a friend and I have maintained for over 7 years now. The `tryOr` and `tryOrElse` functions are super handy: they take a function which can throw an error and turn it into one which produces a `Result` instead.

- [neverthrow][nt], a similar library which has also been around the block a bit (it started 5 years ago), and which currently has a nice `ResultAsync` type of the sort that I have wanted to build for True Myth for years but have never quite gotten to!

[tm]: https://github.com/true-myth/true-myth
[nt]: https://github.com/supermacro/neverthrow

Obviously I am a big fan of True Myth, but I would *far* rather you use neverthrow than not use anything at all.



[^toctou]: Checking for existence may not save you and so is an antipattern: see [TOCTOU](https://en.wikipedia.org/wiki/Time-of-check_to_time-of-use).
