---
title: Special Null Syntax vs. Types and Functions
subtitle: >
  Why does `Maybe.map` feel better than `??` and friends to me? A sketch.
qualifiers:
  epistemic: >
    Basically thinking out loud about a thing I observed this weekend. I think I affirm the thing I took out of this experience.
date: 2023-01-08T19:29:00-0700
tags:
  - software development
  - functional programming
summary: >
  Tools like `Maybe.map` can be nicer to use than special syntax—even leaving aside neat ideas from category theory—because they compose nicely in ways that syntax sugar often does not.

---

I have been out of my [cage phase][cp] with typed functional programming for a while now[^calvinism] but there is a thing I still end up thinking about a *lot* (just now: because of doing some tweaks to my static site generator and using True Myth’s `Maybe`): The combination of a `Maybe` type and associated functions to work with them are just so much more *general* than special-case null-handling syntax like the optional chaining `?.` or nullish coalescing `??`, etc. operators which JavaScript, C#, and many other languages have sprouted over the past few years.

[cp]: https://heidelblog.net/2021/06/sometimes-upon-first-becoming-reformed-some-become-jerks/

That generality is true in at least two ways, one of which gets commented on a lot in the things I read, and one of which does not. The one which gets commented on a lot is the way that `map()` is the same basic operation whether it’s `Maybe` or `Array` or `Task` or something else: functors! applicatives! monads! category theory!

The one that gets commented on *less* is that a type with function operating over it is just plain more *useful*. I built a little function[^intl] for my static site generator today which did some string handling, and where I ultimately ended up using [True Myth][tm]'s `Maybe` type. I implemented it initially with a "null object" pattern: just returning an empty string for the case where its arguments did not have a sensible expansion. It was annoying to work with in different contexts, though; and so was returning `null`, which I also tried. Just returning a `Maybe<string>` instead of doing either a `null` return *or* a `''` “default case” return let me just `.map()` over the result and do different things in different contexts as appropriate, though. That was impossible with `''` and difficult with `null`, *even with nullish coalescing or optional chaining*, because the subsequent operations were shaped like functions, and the syntax doesn’t help with that.

It turns out that functions and types compose really nicely in a way that dedicated syntax does not (necessarily). This does not mean that dedicated syntax is *bad*—Lisp notwithstanding—so much as that specialization and generality do actually sit in tension with each other.

[tm]: https://true-myth.js.org

[^calvinism]: …though as with my Calvinism, that is mostly a function of it having become part of the bedrock of my thinking, and not at all because my affirmation has faded in intensity: to the contrary, even.

[^intl]: It uses [JavaScript’s recent `Intl.ListFormat` API](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat) to make nicely separated lists for display, e.g. to take in `["cool", "neat", "awesome"]` and produce `"cool, neat, and awesome"`.