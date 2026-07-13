---
title: No Large Union Types in TypeScript, Please
subtitle: There are many other patterns that are nearly always better.

---

There are several ways to end up with these kinds of large unions. Two of the more common ones in my experience are 

A manual union is most often just a union of string types. For example, when writing down all the model providers in use in your codebase, you might write something like this in a `llm.ts` file:

```
export type Provider =
  | "OpenAI"
  | "Anthropic"
  | "AWSBedrock"
  | "GCPVertex"
  | "AzureAIFoundry"
  | "Qwen";
```

So far, this is no big deal. You could use it to constrain the types in your code to get a static record that maps from

```ts
export interface Config { /* ... */ }

export const Configs: Record<Provider, Config> = {
  OpenAI: { /* ... */ },
  Anthropic: { /* ... */ },
  // ...
};
```

This is pretty nice to use. You are guaranteed that if you add a member to the `Provider` type, the compiler will force you to update the definition of `Configs` to include it, and *vice versa* if you remove one.

So why is this post titled, “No Large Union Types in TypeScript, Please”? Because this pattern can quickly become a problem as your codebase grows.

## The problems

### 1. Union types are expensive to compare

TypeScript union types are sets of the elements of the union. What that means is that when you write this—

```ts
type MyUnion = 1 | 2 | 3;
```

—the resulting type is “the type of the literal `1` *or* the type of the literal `2` *or* the type of the literal `3`”. This is very powerful for representing the ways idiomatic JavaScript often works, and it expands to handle arbitrarily complicates sets, like “any string *or* any number *or* the type of the literal `true` *or* the type of an object that has only symbol keys and `BigInt64Array`s”:

```ts
type ArbitrarilyComplicated =
  | string
  | number
  | true
  | Record<symbol, BigInt64Array>;
```

That would be a strange type, but TypeScript would check that anything you assigned to a value of type `ArbitrarilyComplicated` got checked ([playground][1]).

```ts
let example: ArbitrarilyComplicated = {
  // ✅
  [Symbol("neato")]: 
}
```

When you do this, though, TypeScript has to compare the members of *this* union to *that* one. In some specific cases, it can see that they’re the same without doing a union check: when the union is *named* and TypeScript can see that the type annotation references the name:

```ts
type Named = "a" | "b";

function useNamed(named: Named): void {}

let x: Named = "a";
useNamed(x);
```

However, many unions in TypeScript are *not* named like this. Consider an extremely common union you might see: `string | null | undefined`.[^1] You might see this on the definition of an object type, for example:

```ts
interface Person {
  age: number;
  name: string | null | undefined;
}
```

Now say you somewhere else want to construct a `Person` instance and you have an item whose type is `string | null`, no `undefined` in sight:

```ts
function buildPerson(age: number, name: string | null): Person {
  return { age, name };
}
```

Here, TypeScript has two *anonymous* union types—unions with no name, just the constituent members of the union. One is `string | null`, from the function parameter. The other is `string | null | undefined`, from the type of the `name` field on the `Person` type. To check that the parameter `name` is assignable to the field name, TypeScript needs to go element by element through the union type and check that each type that makes up the source type is assignable to the types within the target type:

- `string` → `string`: yes
- `null` → `string`: no
- `null` → `null`: yes

Here, it never had to check against the target `undefined` type, but this is down to the order in which the elements get compared. The compiler can do less work *if* it gets lucky, but it may not always get lucky. What’s more, consider the case when we the parameter type includes `undefined` and the field type doesn’t:

```ts
interface Person {
  age: number;
  name: string | null;
}

function buildPerson(age: number, name: string | null | undefined): Person {
  return { age, name };
}
```

Here, to prove that the `name` parameter is not assignable to the `name` field, TypeScript has to do a lot more checks—in fact, when it gets to `undefined`, it has to check `undefined` against all the possibilities in the target type:

- `string` → `string`: yes
- `null` → `string`: no
- `null` → `null`: yes
- `undefined` → `string`: no
- `undefined` → `null`: no

This comparison is quadratic ($O(n^2)$), in other words: any union assignability operation that TypeScript cannot cache scales with the square of the number of elements in the unions. More strictly, it’s $O(m \times n)$ where $m$ and $n$ are the number of elements in the source and target union, but in a surprising number of cases $m$ and $n$are the same, or close to the same.

This is fine when the union type is small. When the union type is *large*, though, things get out of hand. If you are comparing a union of 100 elements to another union of 100 elements, that’s $100 \times 100=10,000$ comparisons you need to do. If it’s a 500-element unions and a 600-element union, that’s $500 \times 600 = 300,000$ comparison. This gets very, very bad for type checking performance in a hurry.

Now, you might be tempted to respond that having hundreds of elements in a union type seems a bit wild, and I would be tempted to agree, but… actually it’s pretty easy to end up there. Consider the built-in types for `EventTarget.prototype.addEventListener`, which need to provide type safe types

The types work by generating a large type whose keys are event names and whose values are the corresponding event type. Then `addEventListener` uses `keyof` to get the keys from that union so that when you call it with `"click"`, you get back a `PointerEvent`, not the root `Event` type. It’s defined roughly like this (not *exactly* this, because TypeScript is more specific about which events can be triggered on which types):

```ts
interface EventMap {
  "abort": UIEvent;
  "animationcancel": AnimationEvent;
  // ...
  "click": PointerEvent;
  // ...
}

interface EventSource {
  addEventListener<K extends keyof EventMap>(
    type: K,
    listener: (
      this: EventSource,
      ev: EventMap[K]
    ) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
}
```

Using `keyof` like this generates a union type consisting of every single key on `EventMap`. That’s not a small set—108 members for the map as applied to `HTMLButtonElement`, for example, and it varies by the target. I joked a while back with a colleague that this is probably fine, and that I was sure it never showed up in anyone’s profiles. I was wrong: a few weeks after that, I was using [Typeslayer][2] to poke around at the type checking performance of some of the simpler code in our codebase, and what showed up? The event source map and the comparisons to it! Not at a level that I take to be concerning, but still: a surprise that it shows up there at all.

### 2. Unions of literals are often the wrong design tool

For an <abbr>API</abbr> I was designing from scratch, I would *never* choose a string-based approach like this, though. Not, first and foremost, because they are expensive to type check, but because they are in most cases the wrong design.

First, although idiomatic JavaScript uses strings everywhere, they’re often standing in for something with quite different semantics. We forget this because it’s so common, but when you use the string `"pointermove"` to subscribe to a subset of `PointerEvent`s fired for a given target, you’re really naming a specific 

One of my design heuristics in these situations is to ask how I would model a similar <abbr>API</abbr> with Rust or F<sup>#</sup>—not because their type systems are necessarily *better* than TypeScript’s, but because they’re different in important ways.[^2] With Rust, if I were aiming for a type safe event <abbr>API</abbr> that was still shaped similarly to the JavaScript <abbr>API</abbr>, I would tend to write an <abbr>API</abbr> that would be used something like this (if you’re not familiar with Rust, don’t worry, I’ll walk through it):

```rust
document.add_event_listener::<PointerEv>(
    PointerEvType::Move,
    |ev| {
        // ...
    }
);
```

The `::<PointerEv>` here explicitly tells the Rust compiler that we want to add an event listener specifically for events of type `PointerEv`. With that constraint in place, we could also write the types so the handler `|ev| { ... }` will be typed safely and correctly. Critically, because types are actually part of the language in Rust, this will (a) check all the call sites to make sure all the types line up and (b) change what gets emitted. This is *not* what would happen if you tried to write the same kind of code in TypeScript:

```ts
document.addEventListener<PointerEvent>(
  PointerEventType.Move,
  (ev) => {
    // ...
  },
);
```

TypeScript never changes what code gets emitted based on the types you write. This is actually a *type assertion*

```rust
fn main() {
    let doc = Document { URL: String::from("https://example.com") };
}

struct Document {
    URL: String,
    // ...
}

impl Document {
    fn add_event_listener<E: Event>(
        ev_type: E::Type
        handle: Fn(&E)
    ) {
        // ...
    }
}

trait Event {
    
}
```



There are two basic patterns I 

<!-- TODO: link to wrapper types post -->

Why do people reach for them so often? Well, for one, sometimes the choice was made for us, long ago. I gave the example above of the `addEventListener` <abbr>API</abbr>—a long-standing, native JavaScript <abbr>API</abbr> that TypeScript simply needs to represent correctly and as safely as possible. There really aren’t many other good options for how to safely type that API. You could write a manual overload for each definition (with a simplified definition to get the point across):

```ts
interface EventSource {
  addEventListener(
    type: "abort",
listener: (ev: UIEvent) => any,
  ): void;
  addEventListener(
    type: "animationcancel",
    listener: (ev: AnimationEvent) => any,
  ): void;

  // ...

  addEventListener(
    type: "click",
    listener: (ev: PointerEvent) => any,
  ): void;

  // ...
}
```

Other than that, though, when dealing with 

### 3. Union types are


## The solutions

[^1]:	To be clear, I am not saying this is a *good* type, only that it is common.

[^2]:	I do mostly think that those types systems are preferable, because I think nominal types are a better default than structural types—but that’s irrelevant here!

[1]:	https://www.typescriptlang.org/play/?target=99#code/C4TwDgpgBAggTgIwJbDgQzkgNiAwgewFswskBjNYCAEygF4AoKKAHygGdUkA7AcydZRuAV0IIIcAW1TCIUqACUIZfHGoAediDH4sAGigAhJLwCS3YADYALPHQgAfAG4GDLBGBQIADzTF3AFywiCjomDgE-uSUNPRQAN4CAPRJUICg5AIA2gDK2gi6ABQARNwQlPhFAJQAukGlAO5GJuZWtnD2BZV6rswpUACq3CqEhBAWUMAAFhDs0MD4HBBzk5QT0yBQ1PjcAOSe9aoA1gB0PVB9gDLkHFx8UIcQIOxC+J5oWFj49TTJqdz4kHUII1jGYLDY7GgQJ1uj8oFcRKNMGQ7g8nn9Xu9Pt9eqkAAyA4HNMFtDpdM6XKAANzesiehGEnCg4igAAMQS1we1ISz2LCcnlCkUVLoqrUhEDgvZNDdeA5oQwAL4uBg+PwkaB0KBFaaYoouVX+DVQACMACYAMz63yGuIyCAuIA
[2]:	https://github.com/dimitropoulos/typeslayer
