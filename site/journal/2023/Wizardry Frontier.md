---
title: The Wizardry Frontier
subtitle: >
    On the idea that accessibility and reliability (or other such dichotomies) must remain at odds in programming languages.

date: 2023-12-07T10:40:00-0700

summary: >
    For 75 years, programming languages have steadily raised the baseline of what “normal” programmers can express in their languages. They can still.

qualifiers:
    audience: >
        People with an interest, and at least a “lay-level” understanding of, programming languages.

tags:
    - software development
    - programming languages
    - Rust
    - Lean
    - ratchets

discuss:
    hn: https://news.ycombinator.com/item?id=38559661
    lobsters: https://lobste.rs/s/6eizz1/wizardry_frontier

---

Niko Matsakis just published a post in which he [floated some Rust design axioms](https://smallcultfollowing.com/babysteps/blog/2023/12/07/rust-design-axioms/?utm_source=Chris%20Krycho%20sent%20me). If you are interested in either Rust or programming language design in general, I think it is worth your time. Here, I want to pick up on a contrast he introduces between two axioms:

> Consider reliability: that is a core axiom of Rust, no doubt, but is it the most important? I would argue it is not. If it were, we wouldn’t permit unsafe code, or at least not without a safety proof. I think our core axiom is actually that Rust [is] meant to be used, and used for building a particular kind of program.…
>
> When it comes to safety, I think Rust’s approach is eminently practical. We’ve designed a safe type system that we believe covers 90-95% of what people need to do, and we are always working to expand that scope. [To] get that last 5-10%, we fallback to unsafe code. Is this as safe and reliable as it could be? No. That would be requiring 100% proofs of correctness. There are systems that do that, but they are maintained by a [small handful of experts](http://web1.cs.columbia.edu/~junfeng/09fa-e6998/papers/sel4.pdf), and that idea – that systems programming is just for “wizards” – is exactly what we are trying to get away from.
>
> To express this in our axioms, we put **accessible** as the top-most axiom. It defines the mission overall. But we put **reliability** as the second in the list, since that takes precedence over everything else.

Let me say up front that I think this was and is the right design choice for Rust. What follows is not about Rust at all. Instead, I am interested in thinking about an implication of Niko’s point here for languages in general.

One way of describing the history of programming languages over the past 75 years is: They have steadily raised the baseline of what “normal” programmers can express in their languages. I say “steadily” and not “consistently” because there have been plenty of false starts along the way and many a popular language that is a sidestep at best. Even so, “steadily” captures the reality well. We can and occasionally still do write machine code or assembly, when appropriate. In general, though, we tend to write at a level of abstraction that would have been astonishing to the first few generations of programmers, courtesy of advances in programming language design *and* implementation. That is, advanced type systems *and* high-performance garbage collectors, safe dynamic programming *and* <abbr title="just-in-time (compilers)">JIT</abbr>s—and so on.[^1]

When Niko writes that “we are trying to get away from” the idea “that systems programming is just for ‘wizards’” I vigorously agree with him. Folks in the Rust community sometimes like to say that one of its key ideas is that “we can have nice things”, that performance and usability can go together. That framing for Rust is, as far as I know, [originally from me](https://newrustacean.com/show_notes/bonus/_4/)! Sign me up, then, for getting away from “only for wizards” framings. There is more to say, though.

Grant that proving safety is only accessible to “wizards” today. Twenty years ago, though, most of Rust’s type system was reserved for the “wizards” who worked with Haskell or OCaml or other “esoteric” or research languages. That certainly includes the affine types that make up the ownership system, but also its deployment of sum types and Hindley-Milner-style inference. Now, many of those ideas are table stakes for new programming languages, and are even being [back-ported](https://www.baeldung.com/java-switch-pattern-matching) to very mainstream, rather staid languages like Java. Even the most cutting-edge bits around affine types look reasonably likely to become far more widespread in new languages in the decade ahead. Rust itself is increasingly popular among not only people who particularly need low-level code but also people building regular applications, tools for other languages, you name it. It has “gone mainstream”.

You can see the same dynamic play out in other languages that came up in the 2010s. TypeScript in particular is a good example of a language whose type system can of necessity perform some extraordinary contortions (“because JavaScript”). Some of its type system features, especially [conditional types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html), its very advanced approach to [“type narrowing”](https://www.typescriptlang.org/docs/handbook/2/narrowing.html), and [other forms of type-level programming](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html), otherwise exist only in far more obscure languages like [Haskell](https://www.haskell.org), [Racket](https://racket-lang.org), and [Idris](https://www.idris-lang.org). If you had told anyone a decade ago that many ordinary front-end web developers would be writing conditional types, verging on a subset of dependent typing, you would have been laughed out of the room. Yet here we are.

Proving the safety guarantees of the things Rust requires us to wrap in `unsafe` blocks might be wizardry today, reserved for the handful of half-programmer-half-mathematician magicians who can roll up their sleeves and work through proof tactics in [F\*](https://fstar-lang.org/) or [Lean](https://lean-lang.org/). Yes, accessibility and reliability are still in tension. It need not stay that way, though. It *has not* stayed that way over the past fifty years; we have made it far better. We can follow the same hard path we have so many times before and make the tools more usable, the knowledge more comprehensible and accessible, the applications more achievable. We can figure out what it would mean to merge *progressive disclosure of complexity* with *proof tactics*.

Things that were Merlin-class exploits yesterday are now part of the undergrad curriculum.  We can move the wizardry frontier.

[^1]:	Some of the abstraction that comes along with this leads [some folks](https://web.archive.org/web/20160408150158/https://handmade.network/manifesto) to decry a corresponding degradation of performance—a somewhat legitimate critique. The reasons are complicated, though, and do not merely come down to too much abstraction but rather the wrong abstractions and misaligned incentives. But that is for another post.
