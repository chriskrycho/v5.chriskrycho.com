---
title: True Myth v8.4.0
subtitle: >
    Probably the last 8.x release: `Task` is feature complete!

date: 2025-01-11T12:13:00-0700

summary: >
    The `Task` type is now feature complete. So where does the library go from here?

image:
    cdn: true-myth-v8.4.0.png

qualifiers:
    audience: |
        TypeScript developers with an interesting in *even safer* typed programming with a functional flair. Assumes a fair bit of types knowledge in the latter half.

tags:
    - open-source software
    - software development
    - TypeScript

thanks: |
    I am, as ever, grateful to my long-time collaborator [Ben Makuh][ben] for code reviews, discussions, and design input on this library.
    
    [ben]: https://benmakuh.com

---

Speaking of [momentum][momentum]: I just released what I *think* will probably be the last 8.x version of True Myth (unless we need a bug fix release, of course), [v8.4.0][8.4.0]. 

[momentum]: https://v5.chriskrycho.com/notes/momentum/
[8.4.0]: https://github.com/true-myth/true-myth/releases/tag/v8.4.0

With this, `Task` has all the methods and functions we *definitely* want it to have! I can think of other things that might be convenient, but none of them are strictly *necessary*.[^flatten] It is feature complete. Given we started thinking about a `Task` type seven years ago, and the three or four false starts I had, this feels *great*.

Now, what’s next? Well, we deprecated some things in v8.3.0, and if we update our TS support version range, we can clean up some janky things we do internally to work correctly across the whole range of TypeScript versions we support—currently that is 4.7–5.7, which is quite a large range!

I am also thinking about whether we might want to ship an *integration* package to make [Zod][zod] integration Just Work™. We *could* include that in True Myth itself, but we could also ship a `@true-myth/zod` package or similar. There are definitely some practical tradeoffs around managing multiple packages, and it would be slightly strange to have `true-myth` but also `@true-myth/zod`. We could add a `@true-myth/core`, but why? Every import would just have an extra thing to type! In any case, that is not coupled to the 8.x series.

[zod]: https://zod.dev

We’re also thinking about a slightly larger change, between 9.0 (immediately upcoming) and 10.0 (sometime a bit further out): dropping the “auto-curried” form. As of today, you can do this:

```ts
import Result, { map } from 'true-myth/result';

let length = (s: string) => s.length;
let toLength = map(length);

let okString = Result.ok("hello") satisfies Result<string, Error>;
let lengthResult = toLength(okString);
```

The `lengthResult` type here is *not* what you might hope or expect, a `Result<number, Error>`. (You can see this yourself in [this TypeScript playground][p1].) The `E` type, where `Error` was, has been lost, and it is now just `unknown`. The only way around that is to explicitly set the type when calling `map`:

[p1]: https://www.typescriptlang.org/play/?moduleResolution=99&target=10&jsx=0&module=199#code/JYWwDg9gTgLgBAJQKYGcCuAbGAaOBvOEAQzDgF84AzKCEOAchijSQFoQBPGACwHopUmGPQDcAKDEYk8KQDsA5jzgBeOAAoUALjgomwBQEoVAPh0A6OYu7ip8GBAAySBUtXEwayzwPjJ0uBAA1gDKegoqiIJYZkFqAETcSBgYEHFGKEQwwCiUwKiR6FgAPLpQ+vK4AKJQNFDGNv5e3MiF8Kr2Ti7cakGhZYbivLxwcAB6APxiQA

```ts
let toLength = map<string, number, Error>(length);
```

Unfortunately, that bakes in the `Err` type of the `Result` as `Error`, which is almost never what you want: the main point of this kind of curried invocation is to have a function you can use with *any* `Result<string, E>`, where it doesn’t have to match any particular `E` type, because `map` itself only cares about the `T` in a `Result`.

This is how it has *always* worked in True Myth, because the form we chose is the one that you would see in [Elm][e], [F#][fs], [OCaml][o], [Haskell][h], etc., and we built True Myth for folks who liked those sorts of languages (most of all ourselves!). The problem is that TypeScript’s type inference has never and, given the language’s goals, very likely *will never* support that kind of inference. Given that, though, there is not much value in having the curried forms around. Cutting them out would let us drop our package size a bit, though, and would almost certainly improve the performance by getting rid of a bunch of extra function calls and conditional checks. While we do not think the current performance is *bad* given what we are doing, there is a real sense in which True Myth is *all* overhead—valuable, worthwhile overhead for the amount of correctness it can give you, but overhead nonetheless.

[e]: https://elm-lang.org
[fs]: https://fsharp.org
[o]: https://ocaml.org
[h]: https://www.haskell.org

Were we to ship such a change, though, I would want to make sure we also built and delivered a codemod, so that people could upgrade *easily*.[^codemod] However much code out there *is* using the curried form should be able to just keep working, because the auto-curried version we have here is always trivially substitutable with a manually curried version. In the example above, for example, a non-curried `map` would have this signature:

```ts
function map<T, U, E>(result: Result<T, E>, mapFn: (t: T) => U): Result<U, E>;
```

Then calling using it with the curried form like today would mean writing the type out explicitly in a new “manually” curried form:

```ts
let toLength = <E>(result: Result<string, E>) => map(result, length);
```

You can see how this works in [this updated version of the TypeScript playground][p2] from above. One interesting consequence of the change is that this version, unlike the version shipping in True Myth today, is that it plays much more nicely with TypeScript’s type inference, because of how the types “flow” through the functions—in particular, how we can “preserve” the `E` type while “fixing” the `T` type to `string` at the point where we actually call `map`. The version shipping in True Myth today does not have any way to name that type, so it just “falls back” to `unknown`.

In other words, we expect that changing how this works will only *improve* things in practice, even though it is a bit more to write out.

[p2]: https://www.typescriptlang.org/play/?moduleResolution=99&target=10&jsx=0&module=199#code/JYWwDg9gTgLgBAJQKYGcCuAbeAzKERwDkMUaSAtCAJ4wAWA9FKpjIQNwBQH2aAdgMYxgEXnBABDMAB4AKgBo4AVQUBRAHwAKJuiwAuRMyyzVahRLAAxXvo0x9MgJRwAvGqUP9yHTCnK46uABvDjhQuCYYNChRbRYAOnMNcysHTgBfLgwkeCzeAHM6FzgNFH0UEmB8p1c4FDjcgtpOLPgYCAAZJHzC5zgpdS1DOwNvKXKoSryTardE2KwFBrpUzOy4CABrAGUK-KKveM2NACJaJAwMCGOnFHEhFGxgVBGWMd2p-yg8KDVmtaXaAcsEU2p1urQNJsdhMqpx6PRQgA9AD8HCAA

If you use True Myth today and have thoughts or feedback on that tentative plan, we would love to hear from you! In the meantime, enjoy v8.4.0 and the ~~fully argumed and operational battle station~~ feature-complete version of `Task`!



[^flatten]: Helpers for flattening `Result<Result<T, E>, F>` or `Task<Result<T, E>, F>` or similar would be nice, but they would only be *nice*, and any method to do that comes at a cost because it is not tree-shakeable if it is a class method. Users can implement those pretty trivially by calling `.andThen(identity)` or `.orElse(identity)`, where `identity` is just `function identity<T>(t: T): T { return t; }`.

[^codemod]: Not just because writing codemods is fun. It *is*, but this really does come down to wanting to serve any and all of our users.