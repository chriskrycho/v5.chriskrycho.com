---
title: Async Rust Complexity
subtitle: >
    One reason things “feel hard” in this part of the ecosystem.

date: 2024-03-11T13:45:00-0600
updates:
    - at: 2024-03-11T19:05:00-0600
      changes: >
          Fixed a “wordo” which completely inverted the intended meaning in a footnote. Thanks to [Brian Kung](https://briankung.dev) for catching it!

qualifiers:
    audience: >
        Other people in the Rust ecosystem (or interested lookers-on), especially those in a position to improve on the current baseline.

    epistemic: >
        Experiential.

tags:
    - Rust
    - programming languages

summary: >
    Why is async “hard” in Rust, especially compared to other topics which are theoretically thornier? A hypothesis.

---

I have spent a good part of the last week or so trying to get my head around as much of the Rust async ecosystem, as part of working on a new chapter for <cite>The Rust Programming Language</cite> on the subject (!). There is a lot to like. There are also some bumps and hurdles, though. It feels harder to *learn* than other parts of Rust—not in the sense that the ideas themselves is harder than the other parts, but in that there is not a single coherent thing to learn, but rather a core set of ideas and then a total mishmash of an ecosystem which is *required* to use those ideas.

This claim [from the async-std book](https://book.async.rs/concepts) is interesting in this context:

> [Rust Futures](https://en.wikipedia.org/wiki/Futures_and_promises) have the reputation of being hard. We don't think this is the case. They are, in our opinion, one of the easiest concurrency concepts around and have an intuitive explanation.
>
> However, there are good reasons for that perception. Futures have three concepts at their base that seem to be a constant source of confusion: deferred computation, asynchronicity and independence of execution strategy.

One thing this misses: it is also hard because there are a *lot* of options in the space. “Just use Tokio” is a really good and reasonable default as far as I can tell, but the lack of opinions and clear documentation on what to do *from the Rust project* (as well as the mixed story around maturity/stability from many of these) makes it substantially harder for people to get their heads around.

Here’s a prime example: you cannot do non-blocking I/O without adding *some* library:

- Tokio’s `tokio::fs`
- Smol’s `async-fs` subcrate (`smol::fs`)
- async-std’s `async_std::fs`

This *also* causes significant complexity for people learning: there is no “progressive disclosure of complexity” here. Instead, you *have* to get your head around a bunch of pieces before you can do *anything* meaningful. At a minimum, you have to pick a runtime, and that immediately prompts you to ask: “But what runtime do I pick? What are the differences?” That in turn immediately exposes you to all of the complexity in the space.

I actually agree with the claim from the `async-std` book that the basic design for `Future` is reasonably straightforward and makes a lot of sense.[^lazy] However, there is no other part of Rust where the standard library gives you *so little to work with*. This is particularly noteworthy in contrast with other languages working on concurrency (especially [structured concurrency][sc], e.g. especially [in Swift][swift-sc]), where there is a built-in “runtime”.[^swift-executor] Rust has a good reason to support multiple runtimes, but the difficulty level is dramatically increased for someone *just* getting started.

[sc]: https://en.wikipedia.org/wiki/Structured_concurrency
[swift-sc]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/concurrency/

Rust’s general approach is not to paper over complexity, but to try to (a) expose it in reasonable ways, (b) improve on the state of the art where possible, and (c) provide a good developer experience. Here, I think Rust is succeeding reasonably well at (a), and in part at (b) in terms of mechanics and implementation—but not much at all on (c), especially the “out of the box” usability. At the end of the day, this comes down to the fact that there *is no default*.

I understand why. What defaults do you pick, and why, and how does that impact the ecosystem? (Does picking something imply other approaches are bad—even if no one intends that?) But: it is still a problem from the perspective of someone trying to learn this part of the language.

The difference between *can choose* and *must choose* is really, really significant. We should figure out what it would look like to ship a reasonable default executor so that the out of the box experience is *good*, and people can opt into other choices *when they need them*.

Of course, having a good chapter in the official book might also help, so I will now get back to working on that.


[^lazy]: I have some still-developing thoughts on how the laziness of the type is related to some of the difficulties people have, even if well-motivated. Much of Rust is an eager language, but there are key exceptions like `Iterator`, and people do not seem to struggle with those. More to mull on here.

[^swift-executor]: Swift implemented support for custom executors in its most recent release, Swift 5.9, with *similar* aims to how Rust has approached the space, but notably Swift ships a default executor out of the box, and only allows opt-in custom executors for performance. This is exactly the right choice for Swift, and *not* a perfect match for what Rust would need, but it is suggestive of the right direction.
