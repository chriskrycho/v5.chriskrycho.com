---
title: "True Myth Releases: 8.6, 9.0, and a New Docs Site!"
subtitle: >
  Continuing the year of shipping with more True Myth goodies.

summary: >
  A minor release, a major release, and a spiffy new documentation site all in one day!

qualifiers:
  audience: |
    TypeScript developers with an interest in even safer typed programming with a functional flair. Assumes a fair bit of types knowledge in some of the deep dive bits, but you can get the high level without that!

date: 2025-04-15T21:00:00-0600
updated: 2025-04-16T06:45:00-0600
updates:
  - at: 2025-04-16T06:45:00-0600
    changes: >
      Fixed some incomplete sentences and tweaked wording and added a link.

tags:
  - TypeScript
  - True Myth
  - Year of Shipping
  - software development
  - open-source software

---

Just like it says on the tin, I shipped three things for [True Myth][tm] today:

- v8.6
- v9.0
- A shiny new documentation site

[tm]: https://true-myth.js.org
[8.6]: https://github.com/true-myth/true-myth/releases/tag/v8.6.0
[9.0]: https://github.com/true-myth/true-myth/releases/tag/v9.0.0
[docs]: https://true-myth.js.org

In this post, I’ll cover each of those in turn!

{% callout %}

If you’re unfamiliar with True Myth, it’s a TypeScript library that provides *really nice* `Maybe`, `Result`, and `Task` types to handle null, error, and async code in a way that is both safe and idiomatic. My friend [Ben][ben] and I created it back in 2017, and we’ve been keeping it up ever since.

[ben]: https://benmakuh.com

{% endcallout %}

There’s a bunch here, so I have tucked away some of the details in disclosure sections, and you can also use this outline to hop around:

- [v8.6](#v86)
- [v9.0](#v90)
	- [Breaking changes](#breaking-changes)
	- [No more `unknown` in `Maybe`](#no-more-unknown-in-maybe)
    - [Changes to `first` and `last`](#changes-to-first-and-last)	
    - [Re-exported namespaces](#re-exported-namespaces)
- [The New Documentation](#the-new-documentation)

## v8.6

The last minor release in the v8.x series! Which I have said multiple times this year! But in this case I think it’s actually true, because we *also* released v9.0 and unless there’s a horrible bug (which would be a v8.6.1), we’re done with v8.x releases. There are only two things in v8.6:

- A small bug fix for the little-used but handy `maybe.get` function.
- A feature that makes type inference work much more nicely when using the `andThen` or `orElse` functions and methods.

That’s the short version; for the long version, toggle open the details view below or [see the implementing pull request][1010].

[1010]: https://github.com/true-myth/true-myth/pull/1010

 <details><summary>The long version</summary>

The fundamental goal here is to make it so that when a user returns a type that is technically a union of the class, `Maybe<A> | Maybe<B>`, we instead produce a union of the type parameter, `Maybe<A | B>`. This can come up quite easily when a user is building up a safe abstraction in idiomatic TS. For example (in line with the user issue that showed us the need for this change), you might be building up a pre-configured web “client” that simply returns object types inline:

```ts
import * as task from 'true-myth/result';

let fetch = safe(window.fetch, (cause) => ({
  kind: 'NetworkError' as const,
  cause,
}));

let get = (url: string) =>
  fetch(new URL(url)).andThen((response) => {
    if (response.status >= 400 && response.status < 500) {
      return Task.reject({
        kind: 'ClientError' as const,
        response,
      });
    }

    if (response.status >= 500 && response.status < 600) {
      return Task.reject({
        kind: 'ServerError' as const,
        response,
      });
    }

    return Task.resolve(response);
  });

let taskForGet = get('https://true-myth.js.org');
```

Prior to this change, the type collapsed to `Task<unknown, unknown>` unless constrained explicitly at the `andThen` call site, because the type returned here as TypeScript sees it is not a single `Task` with a union of the custom error object types, but rather multiple distinct `Task` types: one for each custom error object type as well as the version for the response when it resolves successfully! This is technically *accurate*, but in practice is not what people expect. Because we constrain the return type to be a `Task`, it is always safe in practice for people to treat it as `Task<A | B>` instead of `Task<A> | Task<B>`. Exactly the same holds true for the equivalent `Maybe` and `Result` types.

We can get the desired behavior with [distributive conditional types][dct]. By using a constrained type parameter for the whole returned wrapper type, rather than the fixed type parameters for the wrapper type, we can distribute unions back into the type. For example, with `Task`:

[dct]: https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types

```ts
class Task<T, E> {
  // ...
  
  andThen<R extends Task<unknown, unknown>>(
    fn: (t: T) => R
  ): R extends Task<infer U, infer F> ? Task<U, E | F> : never;
}
```

This type will always safely and correctly produce a `Task<U, E | F>` because of the initial constraint, and indeed will allow gathering up additional types as it goes along with the original error type, but both the `U` and `F` types produced here will be distributed over any union (explicit or implicit) in the return type of the passed `fn`.

Unfortunately, that code as written *does not work* because we define the types *not* as the classes but instead as the union of types derived from them.[^why-union] With `Task`, for example:

```ts
export interface Pending<T, E> extends Omit<TaskImpl<T, E>, 'value' | 'reason'> {
  get isPending(): true;
  get isResolved(): false;
  get isRejected(): false;
  get state(): typeof State.Pending;
}

export interface Resolved<T, E> extends Omit<TaskImpl<T, E>, 'reason'> {
  get isPending(): false;
  get isResolved(): true;
  get isRejected(): false;
  get state(): typeof State.Resolved;
  get value(): T;
}

export interface Rejected<T, E> extends Omit<TaskImpl<T, E>, 'value'> {
  get isPending(): false;
  get isResolved(): false;
  get isRejected(): true;
  get state(): typeof State.Rejected;
  get reason(): E;
}

export type Task<T, E> = Pending<T, E> | Resolved<T, E> | Rejected<T, E>;
```

[^why-union]: This pattern is the best thing we’ve come up with for keeping the actual runtime behavior for any given `Task`, `Result`, or `Maybe` instance monomorphic while allowing type narrowing to work.

If we now try to define the return type of `MaybeImpl.prototype.andThen` with this definition of `Maybe`, TypeScript will complain about circular definition of the `Maybe` type, and likewise for `Result` and `Task`.

To work around that, introduce a small bit of additional type machinery:

- Type-only (i.e. `declare`-only) symbols, `IsMaybe`, `IsResult`, and `IsTask`, that are attached to the `Maybe`, `Result`, and `Task` classes respectively, using `declare` syntax, and attaching the type parameters for the classes to the .

- Corresponding `SomeMaybe`, `SomeResult`, and `SomeTask` types that use the declared symbols with their associated use of the type parameters to carry all of the relevant type information *without* any additional runtime overhead *and* without introducing circularity in the type definitions.
  
- A type utility to pluck the type parameters out of those definitions, e.g. `TypesFor<S extends AnyTask>`. This provides enough information to get the required output for `andThen` and `orElse` without any circularity in the definition.

Those changes look like this in the `task` module (but with a bunch of extra explanatory comments for the sake of this post!):

```ts
// This does not exist at runtime.
declare const IsTask: unique symbol;

// It just exists so we can use *this* type to identify any type that has
// had the symbol applied to it somehow.
type SomeTask<T, E> = { [IsTask]: [T, E] };

type AnyTask = Task<unknown, unknown>;

// The type utility that lets us get `T` or `E` off any `Task` type while
// only referring to the `IsTask` symbol, *not* the class. It uses an
// object type with named fields to make it clear what is going on when
// we use it below.
type TypesFor<S extends AnyTask> = S extends SomeTask<infer T, infer E>
  ? { resolution: T; rejection: E }
  : never;

// As described above, this is the implementation type, from which the
// `Pending`, `Resolved`, and `Rejected` types are derived, and then
// combined into the `Task<T, E>` type that is exported.
class TaskImpl<T, E> {
  // This wires up the `IsMaybe` symbol so that every instance of `Task`
  // is an instance of the `SomeTask` type.
  declare readonly [IsTask]: [T, E];
  
  // We define `andThen` with a constraint on the return type: it must be
  // a `Task`. The `Task` we create may include new rejection types, and
  // it will also include the *original* rejection type. That way, it
  // acts the way users expect, just “gathering” the union types as they
  // are added. However, the new resolution type does *not* include the
  // original resolution type, because the whole point of `andThen` is to
  // transform that resolved into a new `Task` type. It would be quite
  // annoying if we kept producing the original `T` here.
  andThen<R extends AnyTask>(
    fn: (value: T) => R
  ): Task<TypesFor<R>['resolution'], E | TypesFor<R>['rejection']> {
    // ...
  }

  // `orElse` acts exactly like `andThen`, but with the rules inverted
  // for what gets included in the final union, because its job is to
  // transform an `E` into some new rejection type.
  orElse<R extends AnyTask>(
    fn: (reason: E) => R
  ): Task<T | TypesFor<R>['resolution'], TypesFor<R>['rejection']> {
    // ...
  }
  
  // the rest of the class...
}
```

Not shown here: those definitions for `andThen` and `orElse` are actually overloads. We keep the original definitions for the simple case where the caller *does* produce just a single new type.

Because all of those new types are private and not used in a way that is actually exposed anywhere, none of this “leaks” to end users of the library, but it gives us a relatively cheap way to preserve our existing way of approaching these union types while also having inference work the way users expect. 

</details>

## v9.0

The main thing v9.0 does is get rid of deprecated code and drop support for old versions of Node and TypeScript, and making some small changes afforded thereby.[^ember] A look at [the release notes][9.0] might suggest a lot is happening, but most of what is in there is actually for the *next* item. There are only two *interesting* changes that I chose to pull forward into v9.0 rather than waiting for a 9.1, both of which were gated on newer versions of TypeScript.[^full-ember] There is also one additional change: to naming of the re-exported namespaces.

### Breaking changes

There are just a handful of significant breaking changes in the release:

1. We now require at least TypeScript 5.3 (and continue to support up through 5.8 and nightly). That version came out two years ago, so this should be a pretty solid support window!

2. We now require at least Node 20. As a consequence, **we no longer ship a CommonJS (<abbr>CJS</abbr>) build**, because Node 20 and later can import <abbr title="ECMAScript Modules">ESM</abbr> into <abbr>CJS</abbr> directly.[^finally]

3. Removing deprecated code: I made a handful of mistakes in my initial pass implementing the `task` module, and had to turn around and deprecate those <abbr>API</abbr>s rather quickly—mostly just bad naming choices, but in a few cases more substantially. (See the [v8.3.0 release notes][v8.3] for details.)

4. Changes to the <abbr>API</abbr> for the `first` and `last` helpers in the `maybe` module, on which [see below](#changes-to-first-and-last).

5. Changes to the namespaces as exported from the root. In the past, we exported the modules with namespace re-exports as `MaybeNS`, `ResultNS`, and `TaskNS`. This was: gross. We fixed it in v9 so modules are now exported with a sensible module-as-lowercase-name convention, and all modules are exported that way. I cover this more [below](#re-exported-namespaces) as well, but wanted to flag it up here as a breaking change.

[v8.3]: https://github.com/true-myth/true-myth/releases/tag/v8.3.0

[^finally]: **_FINALLY!!!_**

### No more `unknown` in `Maybe`

In earlier versions of True Myth, if you passed a value whose type was `unknown` to `Maybe.of`, we would dutifully pass it along so you would end up with `Maybe<unknown>`. This was technically correct, but it could be annoying, because it was dropping information. We know that by construction, the type wrapped in a `Maybe` can *never* be `null` or `undefined`. That’s the whole point, after all! You should *never* have to write code like this:

```ts
import Maybe from 'true-myth/maybe';

function handle(value: unknown) {
  let theMaybe = Maybe.of(value);
  if (theMaybe.isJust) {
    if (theMaybe.value != null) {
      console.log(theMaybe.value.toString());
    } else {
      console.error("it was null or undefined");
    }
  } else {
    console.log("it was Nothing");
  }
}
```

In v8 and earlier, though, you *did* have to do that if you wanted to do anything which treated the wrapped value as actually being defined, even though we *know* that it can never be `null` or `undefined`, because passing in a `null` or `undefined` value means we create a `Nothing`!

Thus, v9 updates the type signatures for `Maybe` so that if you construct a `Maybe` with a value of type `unknown`, the resulting `Maybe` will have the type `Maybe<{}>`, which is just “a `Maybe` of some non-null type”. Now you can safely write that code withough the extra `null` check:

```ts
import Maybe from 'true-myth/maybe';

function handle(value: unknown) {
  let theMaybe = Maybe.of(value);
  if (theMaybe.isJust) {
    console.log(theMaybe.value.toString());
  } else {
    console.log("it was Nothing");
  }
}
```

This would have been possible to port back to v8, and a legal improvement under SemVer [as I helped spec it for TypeScript][semver-ts], but it *will* introduce some places where folks have to make changes to their code, even if just to do less, so in this case it made sense to roll it into the major.

[semver-ts]: https://www.semver-ts.org

### Changes to `first` and `last`

Second, there is a significant change to the signatures of the `first` and `last` functions in the `maybe` module. Previously, they both returned `Maybe<T>`. Now they return `Maybe<Maybe<T>>`. That might seem annoying, and… honestly, it *is* annoying, but JavaScript can be an annoying language! We need this because we need to be able to distinguish between these two cases when we ask for the first item in an array:

```ts
import { first } from 'true-myth/maybe';

let empty: Array<string> = [];
let notEmptyButNull: Array<string | null> = [null];
let notEmptyAndNotNull: Array<string> = ["hello"];

let firstEmpty = first(empty);
let firstNotEmptyButNull = first(notEmptyButNull);
let firstNotEmptyAndNotNull = first(notEmptyAndNotNull);
```

In v8 and earlier, those produced `Maybe<string>`. The last one produced `Just("hello")`, while the first two both produced `Nothing`—even though they are clearly different cases! In v9, those produce `Maybe<Maybe<string>>`, and the results are:

- `firstEmpty`: `Nothing`
- `firstNotEmptyButNull`: `Just(Nothing)`
- `firstNotEmptyAndNotNull`: `Just(Just("hello"))`

You can always get back the behavior from v8 and earlier by calling `andThen` on the result of calling v9’s version of `first` or `last`:

```ts
import { first } from 'true-myth/maybe';

let empty = first([]).andThen((v) => v); // Nothing
let hasUndef = first([undefined]).andThen((v) => v); // Nothing
```

But now you can actually distinguish those cases, which can be important sometimes!

[^ember]: This is the Ember.js way of doing breaking changes, and I still believe it’s basically the “right” way of doing breaking changes.

[^full-ember]: The “full Ember” here would have separated those, but we don’t have a release cadence, so that would have just been churn for the sake of it.

### Re-exported namespaces

For the last few versions, True Myth has had top-level namespace re-exports for the sake of CommonJS interop and to support versions of Node that did not understand [export maps][em]. Given we no longer have CommonJS interop to worry about, though, and all our supported versions of Node support export maps, we no longer *recommend* these, but we don’t expect they’ll go anywhere.

[em]: https://nodejs.org/api/packages.html#package-entry-points

We did update them to [use lowercase names][lyn] for the re-exported modules, though:

[lyn]: https://v5.chriskrycho.com/journal/lowercase-your-namespaces/

```diff
-import { Maybe, MaybeNS } from 'true-myth';
+import { Maybe, maybe } from 'true-myth';
```

The whole library uses this convention internally and in all of its documentation now, and if you *really like* namespaces, you can access any part of the library that way:

```ts
import * as tm from 'true-myth';

let myDelay = tm.task.delay.exponential({ from: 10, withFactor: 10 });
```

Again, this isn’t necessarily the *recommended* way to do things… but it’s supported, not going anywhere, and a lot nicer than `tm.TaskNS.DelayNS.exponential` or something like that!

## The new documentation

We saw a bit of an uptick in folks discovering and using the project over the past year, and one of the natural consequences of that was a bunch more issues filed about our documentation. This was extremely well-justified: when I put together a docs site years and years ago, I just used the out-of-the-box output from [TypeDoc][typedoc]. TypeDoc is great, and we’re still using it, but it’s really designed for *<abbr title="application programming interface">API</abbr> documentation*, not for *all* documentation.

[typedoc]: https://typedoc.org

We had no good home for tutorials or guides or other “explainer”-style material, and the landing pages for the library and the main modules were overwhelming because they were far too long. At the same time, we had spent a *lot* of time over the years beefing up the materials in the <abbr>API</abbr> docs, so I wanted to make sure we kept all of that. What we needed was something that could ingest that material—preferably using our existing TypeDoc-based infrastructure with minimal changes—and put out a nice documentation site.

I spent a bit of time poking around at options and fairly quickly landed on the combination of [VitePress][vp] and the [typedoc-plugin-markdown][tpm] and [typedoc-vitepress-theme][tvt]. That made it fairly easy to keep around <abbr>API</abbr> docs and the config that builds them, while integrating them into a [new, much more robust documentation site][docs] that now *does* include a guide.

[vp]: https://vitepress.dev
[tpm]: https://typedoc-plugin-markdown.org
[tvt]: https://typedoc-plugin-markdown.org/plugins/vitepress

The [guide][guide] has dedicated sections for [setup][setup], two distinct introductions to the library (a [tour][tour] and a [tutorial][tutorial]), [deep dives][understanding] on how the types work and more, and [background][background] material. Most of that existed before, and is just organized in a more useful way now—but some is totally new!

[guide]: https://true-myth.js.org/guide/introduction/
[setup]: https://true-myth.js.org/guide/introduction/getting-started.html
[tour]: https://true-myth.js.org/guide/introduction/tour/
[tutorial]: https://true-myth.js.org/guide/introduction/tutorial/
[understanding]: https://true-myth.js.org/guide/understanding/
[background]: https://true-myth.js.org/guide/background/

It is also not completely *done*. There are swaths of it that could use to be rewritten or updated, particularly in the deep dives on how to think about the types, and the tutorial material is incomplete and could use to cover many more of the combinators in the library, and honestly it could use substantially more rethinking of the structure. All of that actually feels *tractable* now in a way that it didn’t when we were shoehorning everything into <abbr>API</abbr> docs, though!

---

I’m really happy to have this out in the world this evening: it is good to keep up the Year of Shipping.