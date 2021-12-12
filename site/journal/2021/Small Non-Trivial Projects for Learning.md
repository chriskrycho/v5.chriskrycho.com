---
title: Small, Non-Trivial Projects for Learning
subtitle: >
  For learning effectively, nothing is better than a real project which gives you a place to experiment and play.
date: 2021-12-12T14:40:00-0700
qualifiers:
  audience: >
    Other software developers interested in honing their craft.
tags:
  - software development
  - learning
summary: >
  Having small but non-trivial projects you work with over the span of years is incredibly valuable for learning.

---

Yesterday, after releasing (and [*not* releasing][spike]!) a couple small updates to [True Myth][tm], the library my friend [Ben Makuh][bm] and I built all the way back in 2017, I was reflecting on how incredibly valuable that one little library has been to my own growth as a software developer.

[releasing]: https://github.com/true-myth/true-myth/releases/tag/v5.1.0
[spike]: https://github.com/true-myth/true-myth/pull/245
[tm]: https://github.com/true-myth/true-myth
[bm]: https://benmakuh.com

I call it “little” because, per [tokei][tokei] True Myth is just over 820 lines of implementation (and another about 1,500 lines of tests) in TypeScript. It has two data types and a few dozen functions for working on them. While it is decently widely used (mostly transitively via a few other much bigger ecosystem tools), and while I got an enormous amount of direct bug-stopping value out of it back at Olo (where I *suspect* it’s still in use, but I have in fact no real idea), I haven't been *directly* using it day to day for a few years now.[^except]

[tokei]: https://github.com/XAMPPRocky/tokei

And yet: True Myth remains extremely valuable because it is a place where I can work out ideas, try out TypeScript features, and more. It’s small enough that even very significant changes are tractable, but large enough that it tends to expose the kinds of things that don’t tend to show up in “toy” projects but which *really* matter for end users.

[^except]: I did use it when building a bunch of local scripts for data analysis a year ago, because it was incredibly useful there. But then I *stopped* using it, because I got fed up with the lack of portability of Node scripts and went back to [using Rust for “scripting”][rust-scripts], which made my life much less annoying.

[rust-scripts]: https://v4.chriskrycho.com/2016/using-rust-for-scripting.html

## Examples

Two examples from recent work:

### Refactoring

I overhauled the internals substantially earlier this year. When Ben and I originally built it, we used individual classes implementing a shared interface for the “algebraic data types” (i.e. `Maybe<T> = Just<T> | Nothing` and `Result<T, E> = Ok<T> | Err<E>`). This meant a *lot* of duplication within the library. That was annoying from a maintenance perspective, but it was also a cost all our end users had to pay for in terms of bytes over the wire. It also had a subtler (but still meaningful) performance problem in that it required a lot of extra allocations and indirections.

So, earlier this year I updated it so that both `Maybe` and `Result` are both single classes which implement the full behavior of the underlying type for runtime. The exported types for `Just`, `Nothing`, `Ok`, and `Err` are type-only constructs which correctly represent the runtime behavior in a way that end users can take advantage of *without paying for extra runtime cost for them*. Under the hood, I also applied lessons I learned while building [ember-async-data][ead] to further improve the performance by maximizing the predictability of the data structure for JavaScript <abbr title="virtual machine">VM</abbr>s and eliminating a bunch of other allocations.

[ead]: https://github.com/chriskrycho/ember-async-data

Critically, I was also able to use that to prove that the tooling and mechanics I outlined in [RFC: Semantic Versioning for TypeScript Types][rfc] *work*: I was able to do all of that without breaking the public API *at all*. (We later chose to make some breaking changes because we knew we were going to drop some older TypeScript and Node versions from our support… but the type testing infrastructure let me know all about those, which was the point!) And all of that got done in not that much time: two or three evenings total.[^not-nothing]

[rfc]: https://github.com/chriskrycho/ember-rfcs/blob/semver-for-ts/text/0730-semver-for-ts.md

I did the same kind of internal performance work for yesterday’s release, leaning further into and thinking carefully about how to apply knowledge I’ve picked up doing <abbr title="JavaScript">JS</abbr> performance analysis work at LinkedIn this quarter. The net was, again, less code *and* faster code. Yesterday’s release, though, was all work that I did *yesterday*.

Both of those things got done because this is small. But both of them also let me flex a bunch of different muscles and learn a bunch of things along the way (as did the *other* changes I made yesterday, looking forward to an upcoming 6.0 release in May). I could pull that off in that time interval precisely and only because True Myth is less than a thousand lines of code, even while those lines of code represent something non-trivial.

[^not-nothing]: Let’s be very clear: I take it as a joy and do not take it for granted that I had some free evenings to be able to knock it out.

### Spiking

True Myth has also been a good place to run small experiments we may or may not ship if they don’t work out. For example, yesterday I [converted the whole thing into a monorepo][spike], with separate projects for `@true-myth/maybe` and `@true-myth/result` and a `true-myth` “façade” package which re-exported both and maintains today’s public <abbr title="application programming interface">API</abbr>. We aren’t shipping that change, because it doesn’t provide any actual value: modern tooling allows us to give end users all the benefits it might provide *without* adding all the additional complexity the monorepo-with-multiple-packages entails (see [here][toolbelt]).

[toolbelt]: https://github.com/true-myth/true-myth/pull/246

This exercise was, like the refactors we *did* ship, the kind of thing I could hack away at and get working end to end in a couple free hours on a weekend. From it, I got a way better handle on a bunch of things I have known about enough to get by (particularly Yarn’s monorepo tooling and TypeScript composite projects) but *not* enough to really deeply understand them and be able to support others with them. While I’m still not yet an expert, those few hours of ultimately-thrown-away work gave me a much better understanding of those tools: what works well, where their sharp edges are, peculiarities that aren’t problems but do require understanding, etc. That will serve me in good stead going forward!

## My takeaway

Having a small tool like True Myth—a tool which is actually useful and usable, and thus *not a toy*—has been incredibly valuable for me over the past four years. It is big enough (and used widely enough!) that we need to think about the things we do in it. If it has bad performance, that actually does matter. If a refactor will break its users, that actually does matter. And yet because it is small enough that I could rewrite all of the internal implementation in a couple hours, we can also use it as a place to carry out experiments that we don’t intend to ship, like yesterday’s exercise in converting it into five separate packages in a monorepo.

Toy projects are also good and can be a great way to learn *different* things than projects like True Myth teach you—and besides, they’re fun: that’s the point of a toy! But I commend the idea of building something small and useful like this. Small, because that lets you actually make progress when trying things out with it. But useful, because that requires you to really grapple with the outcomes of your work in a way that pure toys don’t.
