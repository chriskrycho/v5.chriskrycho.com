---
title: "minijinja tip: Template Values Must Round Trip"
subtitle: A general lesson about de/serialization applied in this specific context.

date: 2025-01-30T19:54:00-0700

qualifiers:
    audience: |
        Other Rust programmers using minijinja, mostly, though there is an important lesson here for any software developer working with serialization and deserialization.

summary: >
    Make sure your data structures safely make it through serialization-deserialization roundtrips and vice versa, or you will have a bad time!

tags:
    - software development
    - Rust

---

If you want to pass a complex data structure through a [minijinja][m] template to a [function][function] or [filter][filter] you have defined it must be both serializable, to render into the template, and deserializable, to use in the function or filter you have defined. That implies that any such value must go through a “round trip”: being first serialized and then deserialized back into the same value. (I have not yet dug into the reasons why the library uses this approach, but I expect they are good ones!)

If you have a value you are using in a template which seems to work just fine when you use individual values off of it, but produces a deserialization error when you try to pass the entire object into a custom function, the problem is very likely a mismatch between your serialization and deserialization logic. (This would be a problem in lots of cases besides minijinja!) To solve this, you need to make sure that serialization and the serialization are symmetric.

[m]: https://github.com/mitsuhiko/minijinja/
[function]: https://docs.rs/minijinja/latest/minijinja/functions/index.html
[filter]: https://docs.rs/minijinja/latest/minijinja/filters/index.html

For example, in a side project I am working on, I went out of my way a while back—and I mean back in 2016 or 2017 originally!—to parse emails into a structured form using a custom `Deserialize` implementation. At the start of today, this code (which I had not touched in the better part of a decade!) looked something like this:

```rust
#[derive(Debug, Serialize)]
pub struct Email {
   /// The username, the bit before the `@`
   local: String,
   /// The email host, the bit after the `@`
   host: String,
}

impl<'de> Deserialize<'de> for Email {
    // ....
}
```

That custom `Deserialize` implementation uses a custom `FromStr` implementation for the `Email` type, so that given a string input, I get out either a properly structured and (roughly-)correctly-formatted email,[^roughly] or a useful set of error messages describing how it was ill-formatted.[^overkill] (The details are not very interesting: just a regex and some pattern matching, so I am leaving them aside.) When I started hacking on this again today, though, I was getting slightly inscrutable error messages when trying to use another data type that contains `Email`:

```
Error: Build error: could not render template for [a particular file]

Caused by:
    0: could not render template for [a particular file]
    1: cannot deserialize: invalid type: map, expected a string (in head.jinja:5)
```

The first problem was that the second “cause” line of the error message told me nothing about *what* was expected to be a string but was in fact a map—a classic annoyance with Serde that you can solve with some helper crates. After some poking, I realized that `Email` was one of the only types on its parent object that *could* have this problem and I also remembered that I had a custom `Deserialize` implementation for `Email`… and sure enough, that was the problem. The input was `hello@chriskrycho.com`, but the output was `{ local: 'hello', host: 'chriskrycho.com' }`. That output was quite reasonably *not* being deserialized by my custom `Deserialize` implementation: it only supported strings![^could]

In other words, the problem was that I was taking a custom path for `Deserialize` but deriving `Serialize`, and getting concomittantly different results. I needed to make sure that serializing an `Email` produces the same output as it was deserialized from. (This is a good argument for *testing* that your `Serialize` and `Deserialize` functions  round-trip safely!) I fixed that by writing a custom `Serialize` implementation instead of deriving it:

```rust
impl Serialize for Email {
   fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
   where
      S: serde::Serializer,
   {
      serializer.serialize_str(&self.to_string())
   }
}
```

Combined with an `impl` for `std::fmt::Display` to automatically get the `to_string()`, my problem was solved, and things started working as I had expect them to work in the first place!

Takeaway: because minijinja currently *serializes* and *deserializes* values to send them through its templating layer, they need to be able to “round trip” successfully to the data types you are using.

[^roughly]: That “(roughly-)” is there because actually validating emails is pretty tricky!

[^overkill]: This was “overkill”: I don’t actually take advantage of the split between `local` and `host` at all, and a much simpler “newtype” pattern would actually make more sense:

    ```rust
    struct Email(String);

    impl std::str::FromStr for EmaiI {
        type Err = SomeErrorType;

        fn from_str(s: &str) -> Result<Self, Self::Err> {
            // do whatever parsing work here
        }
    }
    ```

    But this is a side project I have used for learning things, and when I built this ages ago, I hadn’t written this kind of custom deserialization logic before, and it was a nice place to practice [Parse, Don’t Validate][pdv] in a low-stakes, kind-of fun way. Once I finish up this little post, the next thing I do probably *will* be to replace the current version with exactly the version in this footnote.

[pdv]: https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/

[^could]: I *could* make that `Deserialize` implementation work with a “map” as well so that it could work with this object, but I have no reason ever to serialize this particular `Email` as anything but a `String`.
