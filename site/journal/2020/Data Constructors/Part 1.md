---
title: >
    Data Constructors, Part 1: What and How
subtitle: >
    Understanding an idea from Standard ML-like languages by implementing it in (boring) TypeScript.
summary: TODO
qualifiers:
    audience: >
        Software developers who already know a typed language with classes, such as Java, C#, or TypeScript, and who want to understand what’s happening in “type constructors”.
tags:
    - TypeScript
    - Elm
    - F#
    - Haskell
    - OCaml
    - ReasonML
    - Grain
    - functional programming
    - programming languages
    - type theory
series:
    name: Data Constructors
    part: 1
date: 2020-08-09T21:00:00-0600

---

Today’s topic: <i>What is a “type constructor” in languages like [Elm](https://elm-lang.org), [Haskell](https://www.haskell.org), [F^♯^](https://fsharp.org), [OCaml](https://ocaml.org)/[ReasonML](https://reasonml.github.io), [Grain](https://grain-lang.org), etc.? When you see syntax like this (taken from [the Grain docs](https://grain-lang.org/docs/guide/data_types), but using Elm syntax for the sake of having syntax highlighting), what does it mean, and what is it like from languages like Java, C^♯^, and TypeScript?</i>[^1]

```Elm
type CabbageColor = Green | Red

type Veggie
    = Squash
    | Cabbage CabbageColor
    | Broccoli

let redCabbage = Cabbage Red
```

Even to people with quite a bit of experience in a variety of programming languages, the syntax here is different enough from *all* the C-related languages most working developers use that it can be hard to wrap your head around. In fact, one of the smartest developers I know got stuck on trying to make sense of this syntax just yesterday. So in this post, I’m going to explain it using TypeScript, in the same terms that made it make sense to that developer. If you’re familiar with any modern language with classes, this will likely make sense to you!

We’re going to take this in two steps:

1. [What the Syntax Means](#what-the-syntax-means)
2. [Understanding the Syntax](#understanding-the-syntax)

If you get through the first section and still feel a bit confused, that’s okay—in fact, it’s almost the point. Take a breather, go get a drink and take a walk or something, and then come back and read the second section!

## What the Syntax Means

First, let’s get some terms defined: each of those `type ...` is declaring a type. The name of the two types are `CabbageColor` and `Veggie`. The items after the `=`, separated by `|` characters, are the *values* of the type, sometimes called the *variants*. This kind of type goes by a lot of names, including “sum types,” “union types,” “user-defined types,” “custom types,” and more. The key is that they define a type—`CabbageColor` or `Veggie`—where instances of that type are exactly and only one of the named values. So when we see this—

```Elm
type CabbageColor = Red | Green
```

—it just means that if you have a `CabbageColor`, you know it will be one of the values `Red` or `Green`. Those values *only* exist in the context of `CabbageColor` If you want to use the names `Red` and `Green` for values otherwise, you’ll need some way to specify *which* `Red`, like `CabbageColor.Red` in some languages. This is very similar to enums in C-descended languages. In at least some C-descended languages, the boolean type is defined pretty much exactly the same way that `CabbageColor` is here: an enum with variants named `true` and `false`.

Using a basic custom type like this is pretty much like you’d expect:

```Elm
colorOne = Red    -- type is CabbageColor
colorTwo = Green  -- type is *also* CabbageColor
```

We could write a type annotation on that to make it extra explicit, even though we don’t *need* to:

```Elm
colorOne : CabbageColor
colorOne = Red

colorTwo : CabbageColor
colorTwo = Green
```

So far, nothing too fancy 

Unlike enums in C-based languages, though, these types have a superpower: they can hold data. We can see this in the second type defined in the opening example

:::note

It took me quite a while for this all to make sense to me when I first encountered it! If your head is spinning a bit right now, that’s normal. Take a break and go enjoy some fresh air, drink some water, and let your brain relax for a few minutes. Or the rest of the day. Come back after that and read the next section, and things will probably click into place.

:::

## Understanding the Syntax

People with backgrounds in languages like Java, C^♯^, or TypeScript often find it hard to translate the syntax we’ve just walked through into concepts they know. That’s totally fair: it’s pretty different, and it’s not *just* new syntax, it’s also whole new language features tied to that syntax. In this section, we’ll see how we could implement the exact same semantics in a language that’s more familiar, and hopefully that will help make sense of things.

:::note

I’m using TypeScript here because it’s the language in this family I’m most familiar with, but I’m going to keep it to a minimal subset of TypeScript that is extremely close to what you might see in Java or C^♯^. I’ll be using footnotes here to talk about some details around TypeScript itself, where Typescript can let us more directly approximate the things happening in languages like Grain, Elm, etc. However, those are footnotes for a reason: you don’t *need* to read or understand them to get the point of the rest of this post!

:::

First, let’s see what it would look like to build a type that represents the `CabbageColor`. For this we can just use a standard `enum` type:

```ts
enum CabbageColor {
  Red,
  Green,
}
```

That’s it for that particular type. To get an instance of the type, we just do `CabbageColor.Red`:

```ts
let color = CabbageColor.Red;
```

As we’d expect, `red` is of type `CabbageColor`; we could easily have specified it (but don’t need to because of type inference in TypeScript):

```ts
let color: CabbageColor = CabbageColor.Red;
```

We can now use the normal `switch` statement semantics with this:[^2]

```ts
function describe(color: CabbageColor): string {
  switch (color) {
    case CabbageColor.Red:
      return "It's red!";
    case CabbageColor.Green:
      return: "It's green!";
}
```

We can’t do exactly this for the `Veggie` type, though: it would be fine for `Squash` and `Broccoli`, but `Cabbage` needs a `CabbageColor` to create it! That’s okay, though: we can still create a type that behaves the same way as the `Veggie` type does.



Now, the downside here is that we cannot use a `switch` statement to check this, because it’s too complicated a type. All the SML-related languages I mentioned at the top have a feature called *pattern-matching* which handles this for us.

```Elm
describeColor color =
    case color of
        Red ->
            "red"
        Green ->
            "green"

describe veggie =
    case veggie of
        Squash ->
            "It's a squash"
        Cabbage(color) ->
            "It's a " ++ (describeColor color) ++ " cabbage"
        Broccoli ->
            "It's broccoli"
```

:::note

The `(describeColor color)` bit in this example has the parentheses backwards from what you might expect in C-descended languages. In SML-related languages, everything is an *expression*, including functions, and you use parentheses to group those expressions.

:::



```ts
enum VeggieKind {
  Squash,
  Cabbage,
  Broccoli,
}

class Veggie {
  private kind: VeggieKind;
  private color?: CabbageColor;

  private constructor(kind: VeggieKind, color?: CabbageColor) {
    this.kind = kind;
    this.color = color;
  }

  static Squash = new Veggie(VeggieKind.Squash);

  static Cabbage = (color: CabbageColor) =>
    new Veggie(VeggieKind.Cabbage, color);

  static Broccoli = new Veggie(VeggieKind.Broccoli);
}
```

The private constructor makes it so the only way to create a `Veggie` is using one of its public, `static` fields. Critically, all three of of them are just values. In fact, we could actually use static method syntax for `Cabbage` here, but I intentionally used the static property function for `Cabbage` to make it more obvious that these are *all* just values attached to the class. `Veggie.Squash` and `Veggie.Broccoli` are values whose type is `Veggie`. `Veggie.Cabbage` is a value whose type is a function which accepts a `CabbageColor` and returns a `Veggie`. But even though one of those values is a function, they’re still all just values.

<aside>

This class doesn't actually have any state, or any way to change state! We're using it to capture the constraints of the data structure, and *only* that. I find classes enormously useful for this kind of data modeling, even though I'm not a huge fan of how classes often get used! One neat thing that falls out of this is that there is only ever one instance of `Squash` and one of `Broccoli` anywhere in our system. We can represent having multiple quantities of them by having more than one reference to them in a given array or other data structure, and because the type is stateless, that's totally fine. There will *never* be any bugs from having the same value used in different spots, exactly because it's immutable.

</aside>

Notice that `Veggie.Squash` and `Veggie.Broccoli` are static *values*, and `Veggie.Cabbage` is a static *method*. We can actually bind any of those directly to a value in local scope, though:

```ts
let squash = Veggie.Squash;     // Veggie
let broccoli = Veggie.Broccoli; // Veggie
let cabbage = Veggie.Cabbage;   // (color: CabbageColor) -> Veggie
```

The difference is the *type* each one has: `squash` and `broccoli` are already `Veggie` here, but `cabbage` is a function: `(color: CabbageColor) => Veggie`.

This same thing is true back in the ML languages, just with a different syntax:

```Elm
squash = Squash     -- Veggie
broccoli = Broccoli -- Veggie
cabbage = Cabbage   -- CabbageColor -> Veggie
```

The difference here is that, since this is the *normal* way of constructing these types in languages like Elm, you don’t need to use the scoped class for it. You can imagine that it’s as if we had used capital names for those letters in our bindings—`let Cabbage = Veggie.Cabbage`—and exported them all from a module:

```ts
export const Green = CabbageColor.Green;
export const Red = CabbageColor.Red;

export const Squash = Veggie.Squash;
export const Cabbage = Veggie.Cabbage;
export const Broccoli = Veggie.Broccoli;
```

Then we could import them and use them elsewhere:

```ts
import { Broccoli, Cabbage, Red } from 'veggies';

let broccoli = Broccoli;
let redCabbage = Cabbage(Red);
```

That’s exactly the same thing we’d see in Elm or any other ML-style language—just with TypeScript syntax instead!
  
Summarizing so far:

1. All of these variants are *values*. This is why we can bind them, export them, etc.
2. The difference is what *type* each value is. `Veggie.Squash` and `Veggie.Broccoli` are both already `Veggie`s. `Veggie.Cabbage` is a function you can use to *build* a `Veggie` if you also supply a `CabbageColor`.

The only real difference in what we’ve done in TypeScript and what we’d see in that original example from Grain is that Grain has built-in language support for these things because they’re the default instead of something we’re building on top of other language constructs.



Now we put it all together:

```ts
enum CabbageColor {
  Red,
  Green,
}

enum VeggieKind {
  Squash,
  Cabbage,
  Broccoli,
}

class Veggie {
  private kind: VeggieKind;
  private color?: CabbageColor;

  private constructor(kind: VeggieKind, color?: CabbageColor) {
    this.kind = kind;
    this.color = color;
  }

  static Squash = new Veggie(VeggieKind.Squash);

  static Cabbage = (color: CabbageColor) =>
    new Veggie(VeggieKind.Cabbage, color);

  static Broccoli = new Veggie(VeggieKind.Broccoli);

  match<Output>(matcher: {
    squash: Output,
    cabbage: (color: CabbageColor) => Output,
    broccoli: Output,
  }): Output {
    switch (this.kind) {
      case VeggieKind.Squash:
        return matcher.squash;
      case VeggieKind.Cabbage:
        return matcher.cabbage(this.color!);
      case VeggieKind.Broccoli:
        return matcher.broccoli;
    }
  }
}

let veggies = [
  Veggie.Squash,
  Veggie.Cabbage(CabbageColor.Red),
  Veggie.Broccoli
];

let veggiesDescribed = veggies
  .map((veggie) =>
    veggie.match({
      squash: "squash: yellow (usually)",
      cabbage: (color) => `cabbage: of the ${color} variety`,
      broccoli: "broccoli: always green",
    })
  )
  .join('\n');

console.log(veggiesDescribed);
// squash: yellow (usually)
// cabbage: of the red variety
// broccoli: always green
```

*[SML]: Standard ML

[^1]:	Note that pretty much everything I say here goes, with minor differences in details, for Swift’s and Rust’s `enum` types as well!

[^2]:	You may notice that I don’t have a `default` case here. That’s on purpose. Because I specify the return type of the function as `string`, TypeScript will actually tell me if I don’t cover all the cases in the switch statement. TypeScript is smart enough to know that if we *don’t* cover all the cases, it *won’t* return a string.