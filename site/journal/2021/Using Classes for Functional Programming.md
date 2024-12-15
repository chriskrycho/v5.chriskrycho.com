---
title: Using Classes for Functional Programming
subtitle: >
  We tend to think classes are inherently for object-oriented programming, but they are much more flexible than that in JavaScript and TypeScript (and other languages too).
qualifiers:
  audience: >
    People interested in functional programming—perhaps *especially* people tempted to a kind of zealotry on the subject (as I was a few years ago!).
date: 2021-01-22T21:07:00-0700
updated: 2021-01-22T21:17:00-0700
image: https://cdn.chriskrycho.com/images/just.png
tags:
  - functional programming
  - TypeScript
  - JavaScript
  - programming languages
  - type systems

---

Classes in TypeScript look a lot like classes in traditional “object-oriented” programming languages like Java and C^♯^.  You *can* use them this way, to be sure (with all the qualifications about prototypal inheritance being very different from classical inheritance). It took me a bit over a year of writing TypeScript every day to realize that the fact that you *can* use them for <abbr title="object oriented programming">OOP</abbr> doesn’t mean you *can’t* use them for other things. Once I got over that mental bump, I started using them extensively for a *functional* programming style.

For example, when I wrote up [my introduction](https://v5.chriskrycho.com/journal/data-constructors-part-1-understanding-by-implementing/) to data constructors for sum types in <abbr>ML</abbr>-related languages using TypeScript, I used classes to model them. I even [ended up preferring classes](https://v5.chriskrycho.com/journal/data-constructors-part-2-better-typescript/#evaluation) over a non-class based solution for the implementation after experimenting with alternatives! Likewise, the `Maybe` and `Result` types in the [True Myth](https://github.com/true-myth/true-myth) library [Ben Makuh](https://benmakuh.com) and I built a couple years ago use classes under the hood.

One of our core commitments for True Myth was to provide data structures with <abbr title="application programming interface">API</abbr>s which are *impossible* to use in non-“purely functional” ways in TypeScript, but which still feel like idiomatic JavaScript. That is: make it pleasant and easy for developers to “do the right thing!” But in JavaScript and TypeScript, “pleasant and easy” both for end users and also (if less importantly) for us as authors meant using classes and class methods: they’re the fundamental primitives the language gives us!

I have reasonably high hopes that at some point in the not-too-distant future, we’ll see [true value types](https://github.com/tc39/proposal-record-tuple) land in JavaScript (and thus also in TypeScript). When we do, there will be a lot of places we *don’t* need to use classes anymore, because a record or tuple will be the appropriate tool for the job. Even then, though, there will also be a lot of utility baked into classes which *won’t* be there on records and tuples. In particular, there’s no hint of ever being able to implement your *own* methods on tuples or records: they’re not meant for sub-classing! So for building something like [True Myth](https://github.com/true-myth/true-myth), it would still most likely to make sense to use classes to make a nicely idiomatic <abbr title="JavaScript">JS</abbr>/<abbr title="TypeScript">TS</abbr> <abbr title="application programming interface">API</abbr>—though it might use tuples or records under the hood!

The big takeaway here is that functional programming isn’t about avoiding the `class` keyword. It is instead about embracing composition of pure functions as a key mechanic for building up your program, with the many benefits that come from doing so. The point of embracing good ideas from functional programming—as from logic programming or object-oriented programming or any other idiom—is to let us build better software. The point is expressly *not* to become ideological or dogmatic about our tools. So: if a class is the best way to represent one of the data structures your function deals with, great! Likewise, if a class method is a useful way of providing a functional interface, great! Use the tools in your language to make nice <abbr title="application programming interface">API</abbr> s which are easy to use correctly and hard (or even impossible!) to misuse. That’s the point.
