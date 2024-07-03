---
title: An Observation on Constructor Syntax
subtitle: >
    From debating whether to implement them in my little programming language.
date: 2024-07-02T21:12:00-0600
updated: 2024-07-03T07:13:00-0600
updates:
    - at: 2024-07-03T07:13:00-0600
      changes: >
        Corrected the code sample for `static fn new`, and added a note on control flow and initialization.

tags:
    - programming languages
    - Rust
    - Swift
    - software development

thanks: >
    [Dan Freeman](https://dfreeman.io) very gently and kindly pointed out that I had missed some important bits in my write-up on the `static fn` alternative *and* on control flow analysis for initialization.

---

I am continuing to work on building and parsing a little programming language, purely for my own edification.[^toy] This evening, I was thinking about constructors for the struct/record types in this little language, and mulling on whether I want special-case syntax for it. (*Lots* of languages, especially most languages in or even vaguely adjacent to the Java lineage, have some special syntax for constructors.)

Here’s what it would look like if I *do* special-case it:[^syntax]

```
struct Person {
   name: Maybe String,
   age: UInt,

   new (name: Maybe String, age: UInt) {
      self.name = name
      self.age = age
   }

   fn regular-method () -> SomeType {/* … */}

   static fn static-method () -> AnotherType {/* … */}
}
```

—vs. something like this if I do *not* special case it (I already have parsing support for `static fn` declarations):

```
struct Person {
   name: Maybe String,
   age: UInt,

   static fn new (name: Maybe String, age: UInt) -> Person {
      Person {
         name: name,
         age: age,
      }
   }

   fn regular-method () -> SomeType {/* … */}

   static fn static-method () -> AnotherType {/* … */}
}
```

The `static fn new` is *morally equivalent* to what Rust does, in that it is the difference between explicit and implicit `self` showing up in the type signature. In Rust, “static methods” are just functions implemented on a type which *do not* take `self` as the first parameter, whereas regular methods *do* take `self` as a first parameter (by reference or otherwise):

```rust
impl SomeStruct {
    fn static_method() {}
    fn regular_method(self) {}
}
```

What’s interesting there is that it makes regular methods noisier than “static” methods, which is what I was trying to avoid with this design; but that leads you quite directly to the “new is a special case” dynamic, because constructors are *the* most common static methods.

Two thoughts which emerge from that:

1. The Rust version makes a ton of sense for Rust because it lets you be explicit about how you are taking `self`:

    - Owned: `self`
    - Borrowed immutably: `&self`
    - Borrowed mutably: `&mut self`
    - Behind a smart pointer: `self: Box<Self>` etc.

    You could imagine solving that with special syntax on the method declaration or something, but that would get *very* noisy very quickly.

2. This exact dynamic may be, along with the long history of constructors in C++, part of how Swift ended up with its approach to `init`. I would love to hear from Swift people who know!

3. If you do a traditional constructor, i.e. my “special case” version you need to validate that the control flow through the body of that does in fact initialize the entire type correctly. The `static fn` version does *not* have that problem. It does require you to have syntax for constructing a struct directly, as the example above shows!

For my purposes, I am going to start by just special-casing `new` and moving on, I think. But I reserve the right to change my mind. After all, the whole point here is to play around and learn about the tradeoffs *by building the thing*. More anon!

[^toy]: I would like to work on programming languages for *more* than my own edification at some point, but: this language is not that!

[^syntax]: That’s right, folks: I am building a language which syntactically draws on:

    - Elm
    - Rust
    - Lisp

    And it uses 3-space indents and 90-space line-widths. It’s my language! Who’s going to stop me?
