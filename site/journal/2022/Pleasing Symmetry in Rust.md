---
title: A Pleasing Symmetry in Rust
subtitle: >
  Appreciating how Rust `enum` variants are mirrors of its kinds of `struct`s.
date: 2022-07-08T12:43:00-0600
qualifiers:
  audience: >
    Software developers, especially who have an interest in (typed) programming languages.
tags:
  - Rust
  - Swift
  - programming languages
  - software development

---

I was mulling on some Rust and Swift code this morning, and it reminded me just how much I love a particular pleasing symmetry in Rust’s language design: specifically, how `enum` variants are mirrors of all the kinds of `struct` Rust supports.

There are three kinds of `struct`s in Rust:

- unit `struct`s:

    ```rust
    struct Empty;
    ```

- tuple `struct`s:

    ```rust
    struct Wrapped(String);

    struct MultiWrappedGeneric<T, U, V>(T, U, V);
    ```

- “named field” `struct`s (or “regular” `struct`s):

    ```rust
    struct Regular {
        some_field: Option<String>,
        another_field: u8,
    }

    struct RegularWithGeneric<T> {
        field: T,
    }
    ```

Each of these has its own uses, but for this post I’m going to leave aside the interesting bits about those and move right along to the thing which brought me here today: Rust's `enum`s have *exactly the same set of varieties* as its `struct`s do.[^plus-one] You can literally just copy the `struct` definitions into the body of an `enum` definition, move the generics up to the `enum` declaration itself, and everything "just works":

```rust
enum Example<T, U, V> {
    Empty,
    Wrapped(String),
    MultiWrappedGeneric(T, U, V),
    Regular {
        some_field: Option<String>,
        another_field: u8,
    },
    RegularWithGeneric {
        field: T,
    },
}
```

This is a small thing about the language, but it is a *really nice* small thing. It means that very often, there is no need to introduce additional type definitions for richer data structures. I always miss that when switching to Swift, because Swift's `enum`s *only* allow the "unit" and "tuple" varieties. The same code there would have both the `struct` and `enum` definitions:

```swift
struct Regular {
  var someField: String?
  var another_field: UInt8
}

struct RegularWithGeneric<T> {
  var field: T
}

enum Example<T, U, V> {
  case
    empty
  case
    wrapped(String)
  case
    multiWrappedGeneric(T, U, V)
  case
    regular(Regular)
  case
    regularWithGeneric(RegularWithGeneric<T>)
}
```

This isn't just a matter of increased verbosity for authoring, either: It also affects *access* patterns for the structured data.[^pattern]

Here's accessing the data nested in `RegularWithGeneric` in Rust:

```rust
let an_example = Example::<String, String, String>::RegularWithGeneric {
    field: "Hello".into()
};

match an_example {
    Example::RegularWithGeneric { field } => println!("The field is {field}"),
    _ => println!("Skipping"),
}
```

And here's the same in Swift:[^brevity]

```swift
let an_example = Example<String, String, String>.regularWithGeneric(
  RegularWithGeneric(field: "Hello")
)

switch an_example {
case .regularWithGeneric(let wrapped):
  print("The field is \(wrapped.field)")
default:
  print("Skipping")
}
```

Intuitively, I find this somewhat surprising: In general, Swift prioritizes brevity *much* higher than Rust. On reflection, though, Rust also values *symmetry* higher than Swift does, so it makes some sense that the language design keeps this mirroring. That also isn’t a criticism of Swift here, and as far as I know there isn’t any *principled* reason why Swift couldn’t add this in the future—though I also haven’t checked to see if it has been proposed as part of the Swift Evolution process in the past.

These are the kind of small features from Rust I have come to appreciate a *lot*—the kinds of things I really miss working in TypeScript day by day.



[^plus-one]: They also have one more variant, where a variant has a custom discriminant value, when (and only when) the `enum` has *only* the identifier/"unit `struct`" form, like `Empty`. These are basically analogous to just defining a `const` value instead of a unit struct.

[^pattern]: You can extend how pattern matching works by implementing `~=` for your type—see [this Swift by Sundell writeup](https://www.swiftbysundell.com/articles/defining-custom-patterns-in-swift/) for a great walkthrough—but this is what you get out of the box.

[^brevity]: `swiftformat` and `rustfmt` make substantially different choices here, which exaggerates the differences a bit.