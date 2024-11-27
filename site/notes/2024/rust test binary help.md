---
title: Rust test binary help output
date: 2024-11-27T08:52:00-0700
tags:
    - Rust

summary: >
    Hard-to-discover but super useful: `cargo test -- --help` gives help output for Rust test binaries, which has a bunch of useful options.

---

Working on some issue and pull request triage for [the Rust book][trpl] yesterday, I ended up learning about `cargo test -- --help` and visiting [the rustc book][rustc-book] for the first time ever—9½ years into using the language! (I’m [not the only one][mas] who had never seen the latter!)

[trpl]: https://github.com/rust-lang/book/
[rustc-book]: https://doc.rust-lang.org/rustc/index.html
[mas]: https://hachyderm.io/@ekuber/113552712127887620

The `cargo test -- --test` thing gets filed under the small but exceptionally annoying category “basically-undiscoverable things in Rust”. It turns out that `cargo test --help` will show you help options for `cargo test` but not for the test binary `cargo test` invokes; `cargo test -- --help` shows you those. It’s documented… barely, and not obviously! The test binary itself is mentioned briefly in <cite>The Rust Programming Language</cite>, but only really documented [in the rustc book][rustc-tests].

[rustc-tests]: https://doc.rust-lang.org/rustc/tests/index.html

To be fair, the help output *does* say:

> Run `cargo test -- --help` for test binary options.

But there’s no indication there of what “test binary” means. There’s no way to know when that’s the thing you ought to ask!

Now, again, to be fair: this kind of discoverability is a very difficult problem to solve.

My general takeaway here is it’s a really weird distinction that (a) has a good reason to exist, because it is important that the test binary, like rustc itself, be able to be invoked by tools which are not cargo but (b) is nonetheless a significant negative for folks trying to learn their tools!

{% note %}

I’m trying something new: call it macro-microblogging? Basically, the kind of quick notes I see from [Tom Macwright][tm] or [Simon Willison][sw]. Not quite microblogging, but quick, short notes of the same sort I post to [Bluesky][b] etc.—unpolished, just notes on things I hit during the day, so that they can be useful to folks reading along via this site! Let me know what you think.

[tm]: https://macwright.com/micro/
[sw]: https://simonwillison.net
[b]: https://bsky.app/profile/chriskrycho.com

{% endnote %}
