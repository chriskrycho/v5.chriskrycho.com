---
title: >
    Data Constructors, Part 2: Better TypeScript
subtitle: A deep dive on more idiomatic TypeScript implementations of the concept covered in the previous post.
summary: TODO
qualifiers:
    audience: >
        Software developers who already know TypeScript, and want to dig a little deeper. And *preferably* developers who have read the [yesterday’s post](/journal/what-is-a-data-constructor/)!
tags:
    - functional programming
    - programming languages
    - TypeScript
series:
    name: Data Constructors
    part: 2
date: 2020-08-10T08:00:00-0600

---

Yesterday’s discussion covered everything you need to know to understand what’s happening in “data constructors” in languages in the Standard ML (SML) lineage. However, I intentionally used a minimal subset of TypeScript’s features to make it as approachable as possible for readers coming from other languages like Java or C^♯^. TypeScript provides tools we can use to implement the same idea more robustly *and* with better performance, though. In this post, I’ll explore two of those—with the hope that you come out with a better idea of how to do interesting things with some pieces of TypeScript’s type system:

1. [A variation on the theme](#a-variation-on-the-theme): an implementation that is very similar to the one we built in the previous post, but with better performance *and* more type safety.
2. [Something totally different](#something-totally-different): the more idiomatic implementation you would see in most TypeScript codebases—equally type-safe, and with very *different* performance characteristics.

*[SML]: Standard ML
*[TS]: TypeScript

### A variation on the theme

We can make this existing implementation lighter-weight *and* more robustly type-safe by leaning into a set of “fancy” features in TypeScript: const enums,[^1] literal types, tuple types, and union types.

Here’s the final version we’ll end up with:

```ts
const enum CabbageColor {
  Red,
  Green,
}

const enum VeggieKind {
  Broccoli,
  Cabbage,
  Squash
}

type VeggieData =
  | [VeggieKind.Broccoli]
  | [VeggieKind.Cabbage, CabbageColor]
  | [VeggieKind.Squash];

class Veggie {
  private data: VeggieData;

  private constructor(data: VeggieData) {
    this.data = data;
  }

  static Squash = new Veggie([VeggieKind.Squash]);

  static Cabbage(color: CabbageColor): Veggie {
    return new Veggie([VeggieKind.Cabbage, color]);
  }

  static Broccoli = new Veggie([VeggieKind.Broccoli]);

  match<Output>(matcher: {
    squash: Output,
    cabbage: (color: CabbageColor) => Output,
    broccoli: Output,
  }): Output {
    switch (this.data[0]) {
      case VeggieKind.Squash:
        return matcher.squash;
      case VeggieKind.Cabbage:
        return matcher.cabbage(this.data[1]);
      case VeggieKind.Broccoli:
        return matcher.broccoli;
    }
  }
}
```

Let’s break that down, using the differences from our first implementation to explain each of the new concepts we’re covering:

1. Const enums
2. Tuple types
3. Literal types
4. Union types
5. Putting it together

#### 1. Const enums

A `const enum` declaration works much the same as a normal `enum` declaration in Typescript, but it has one critical difference: normal `enum` declarations have a (surprisingly complicated) compiled output that still exists at runtime, while `const enum`s are compiled out of existence entirely, replaced by the constant value they represent. (By default, that’s a number, though you can give it a string value as well.)

Given this `const enum` declaration and usage—

```ts
const enum ConstEnum { A, B }

function useConstEnum(x: ConstEnum) {
  console.log(x);
}

useConstEnum(ConstEnum.A);
```

—here’s the compiled output (as of TS 3.9.2):

```js
function useConstEnum(x) {
    console.log(x);
}

useConstEnum(0 /* A */);
```

Here is the exact same code implemented with a plain `enum` instead of a `const enum`:

```ts
enum RegularEnum { A, B }

function useRegularEnum(x: RegularEnum) {
  console.log(x);
}

useRegularEnum(RegularEnum.A);
```

And here is the corresponding output from TS 3.9.2:

```js
var RegularEnum;
(function (RegularEnum) {
    RegularEnum[RegularEnum["A"] = 0] = "A";
    RegularEnum[RegularEnum["B"] = 1] = "B";
})(RegularEnum || (RegularEnum = {}));

function useRegularEnum(x) {
    console.log(x);
}

useRegularEnum(RegularEnum.A);
```

Notice that there is much more code present at runtime for the plain `enum`. Most obviously, it comes with a declaration of a fancy object type. (This is makes it so that you can write `RegularEnum.A` and get out `0` *or* type `RegularEnum[0]` and get out `"A"`.[^2]) Second, note that the call `useRegularEnum(RegularEnum.A)` still refers to that fancy object type:

```js
useRegularEnum(RegularEnum.A);
```

Recall that the compiled call looked like this instead for the `const enum`:

```js
useConstEnum(0 /* A */);
```

This is how TypeScript gets rid of the runtime object representing a `const enum`—it just substitutes in the concrete values each lookup represents. This means that we can have a *much* lower cost for the enums we’re using for `CabbageColor` and `VeggieKind`. They will ultimately just be integers used inline, which means they will have extremely low memory costs, and using them does not involve an object lookup!

So the initial `*Kind` declarations in the implementation now look like this:

```ts
const enum CabbageColor {
  Red,
  Green,
}

const enum VeggieKind {
  Broccoli,
  Cabbage,
  Squash
}
```

The compiled output for *those* is nothing! When we use them later, they’ll just be integers: `0` for `CabbageColor.Red` and `1` for `CabbageColor.Green` and so on.[^3]

#### 2. Tuple types

#### 3. Literal types

#### 4. Union types

#### 5. Putting it together

### Something totally different

[^1]:	Note: only available when using TS to compile your code! If you’re using Babel to compile and only using TS to type-check, this doesn’t work. Compiling out `const enum` declarations requires having information about more than one file; Babel explicitly only works to transform the syntax of a single file.

[^2]:	Why this is necessary, I don’t know. I have never found a compelling use case for it!

[^3]:	You might worry about whether this means that you can also substitute `VeggieKind.Broccoli` for `CabbageColor.Red`, since they’d both just have the value `0` at runtime. The answer is *no*: unlike most places in TypeScript, where the ultimate “shape” is the only thing which matters, enums are treated as distinct types based on their *name*. You can see this distinction in practice in [this playground](https://www.typescriptlang.org/play?#code/MYewdgzgLgBApmArgWxgeTHGBvGBBAGhgCEYBfAKFElgRRgBUB3EHfI0yigM0TGCgBLcDG4gQACgAeALnSYAlDkq9+QkQCMAhgCdpc5iCXYuYyYYB0eBQG4K2vRjhXbFIA).