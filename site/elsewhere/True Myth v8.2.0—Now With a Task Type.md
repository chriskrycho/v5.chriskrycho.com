---
title: True Myth v8.2.0—Now With a `Task` Type!
subtitle: Literally seven years in the making. But it happened!

image:
    cdn: true-myth-v8.2.0.png

date: 2025-01-02T21:15:00-0700
updated: 2025-01-08T18:03:00-0700

tags:
    - open-source software
    - software development
    - TypeScript

summary: >
    True Myth now has a tool for safe async in TypeScript: a `Task` type, the glorious combination of a `Promise` and a `Result`.

qualifiers:
    audience: |
        TypeScript developers with an interesting in *even safer* typed programming with a functional flair.

---

The main thing right up front: I just released [True Myth v8.2.0][release], which includes a brand new `Task` type for type safe async code in TypeScript. It’s like a hybrid between `Promise` and `Result`, or *What `Promise` always should have been™*. You can get it by installing it with your favorite package manager:

| Package manager | Command                     |
| --------------- | --------------------------- |
| npm             | `npm add true-myth@^8.2.0`  |
| yarn            | `yarn add true-myth@^8.2.0` |
| pnpm            | `pnpm add true-myth@^8.2.0` |
| bun             | `bun add true-myth@^8.2.0`  |

[release]: https://github.com/true-myth/true-myth/releases/tag/v8.2.0

Now for a few more details:

1. When I said it is like a hybrid between a `Promise` and a `Result`, I meant it. Under the hood, `Task<T, E>` actually *uses* a `Promise<Result<T, E>>`. You never have to work or think about the fact that it is a `Promise<Result<T, E>>` unless you explicitly ask to do so by calling `someTask.toPromise()`. Instead, we provide nice <abbr title="application programming interface">API</abbr>s for interacting with it : `map`, `mapRejected`, `and`, `or`, `andThen`, `orElse`, `match`, and handy (slightly mind-blowing!) getters to let you introspect synchronously on the state of the async operation.

2. This `Task` type *can never throw an error* unless you go out of your way to throw an error in the middle of one of its methods. (At which point, uhh… yeah, you threw an error. Why did you do that?) Instead, it actively captures all resolutions as `Resolved` with a `T` value and rejections as `Rejected` with an `E` value. In other words, `Task<T, E>` is to `Promise<T>` for async operations as `Result<T, E>` is to `T` for synchronous operations.

3. Unlike the JavaScript/TypeScript `Promise` <abbr>API</abbr>, we make a clean distinction between `map` and `andThen`. The `Promise.prototype.then` method supports both mapping and… and-then-ing (binding, flat-mapping, etc.). While this is convenient and “pragmatic”, it also makes it hard to work in a robustly typed way. There is a significant difference between a `map`-type operation, which by definition does not trigger further asynchrony, and an `andThen`-type operation, which by definition *does*. In True Myth’s `Task`, these are thus distinct concepts.

4. Inspired by [neverthrow][neverthrow], another excellent library in the same overall space as True Myth, `Task` implements the `PromiseLike` interface for `Result<T, E>` (literally `Task<T, E> implements PromiseLike<Result<T, E>>`. This means you can `await someTask` and the result is a `Result`!

[neverthrow]: https://github.com/supermacro/neverthrow

If you are a long-time True Myth user, I think you will feel write at home with this library. Working with a `Task` feels a lot like working with a `Result`: they share the overall <abbr>API</abbr> design and our basic design sensibilities.

For a somewhat real-world example, see [this Gist][gist] showing how you could combine this new `Task` type with [Zod][zod] for a robustly type-safe boundary layer between your app or library and some untrusted data source.

[gist]: https://gist.github.com/chriskrycho/754dca84a72d3adf846469538f1ccab3
[zod]: https://zod.dev

Now, this is very much a *first release* of `Task`.

For one thing, the really handy combinators like `all`, `allSettled`, or `race` for combining `Task`s are missing. Everything we shipped in v8.2.0 is more or less sequential—ironically enough for a type which emphasizes concurrency!

For another, some of the useful combinators on `Result` are not present on `Task`, because we have some open design questions about them. For example: With `Result`, the `unwrapOr` method produces a value directly. With `Task`, by definition it *cannot* produce a value directly. It can at most only produce a `Promise` of that value. On the one hand, that might be fine, given you could then `await` or call `then` on the `Promise` and get at the value that way. On the other hand… it is not clear that implementing an `unwrapOr` which produces a `Promise` like that actually *gets* you anything. After all, given you can get a `Result` by awaiting a `Task`, you can do this instead:

```ts
let theValue = (await someTask).unwrapOr(aDefaultValue);
```
    
You can probably see why we have not decided we *absolutely must* ship something that lets you write this instead:
    
```ts
let theValue = await someTask.unwrapOr(aDefaultValue);
```
    
That second one is definitely nicer[^syntax]—but it is not *that* much nicer, and what you cannot see from the syntax sample alone is that it has also given away the guarantee that `Task` and `Result` uphold of never having to worry about exceptions. That is a *really* significant tradeoff.

Finally, there are some important convenience methods we need to make it *really* easy to work with `Task` and `Result` together. For example, the [demo code with `Task` and Zod][gist] currently uses an `andThen` and produces a new `Task` from the Zod `safeParse` call, but Zod’s `safeParse` is synchronous, so that should really use a `Result`. (Zod has a related async version of `safeParse` which would make perfect sense to combine with `Task`.) Right now, that would produce a `Task<Result<NestedT, NestedE>, E>`, though, which is *extremely* undesirable ergonomically. We will want to add methods which can flatten that nicely!

None of these will not be especially hard to add or fix, and in fact I already have a first pass done on some of them, but they are not ready to ship—and I *really* wanted to [ship this][year-of-shipping]. Shipping begets shipping. Momentum matters. Getting this version out the door got me excited, and I think it will be that much easier to turn around and get those other features out the door.

[year-of-shipping]: https://v5.chriskrycho.com/notes/year-of-shipping/

[^syntax]: This also highlights why Rust's choice of postfix keyword for `await`—much as I was initially surprised and somewhat turned off by it—was a very good one. In Rust, you would write the first version of that expression, assuming a `Future<Result<T, E>>` like this:

    ```rust
    let the_value = some_task.await.unwrap_or(a_default_value);
    ```
    
    There are other tradeoffs in play in Rust’s futures vs. TypeScript’s promise <abbr>API</abbr>—which I have spent a *lot* of time thinking about courtesy of literally writing the chapter on async in <cite>The Rust Programming Language</cite> book. But syntactically, that trailing `.await` cleans up a lot and I miss it whenever I go back to TypeScript from Rust!
