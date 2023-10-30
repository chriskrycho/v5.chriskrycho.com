---
title: Unsafe
subtitle: >
  On a common meme: “Rust would not help because we would have to use a lot of `unsafe`”.

summary: >
  I semi-regularly hear developers who claim that using Rust would not gain them anything because they would have to use `unsafe`. But this is not true. Local reasoning matters.

tags:
  - software development
  - Rust
  - Val
  - Vala
  - Swift
  - C++
  - Zig
  - Odin

qualifiers:
  audience: >
    People at least vaguely familiar with the tradeoffs around memory safety in “systems” languages like Rust, C++, Zig, Odin, etc.

thanks: >
  [Dan Freeman](https://dfreeman.io) and [Ben Makuh](https://benmakuh.com) reviewed drafts of this post before publication and it is better for their input! (Mistakes and infelicities remain all my own, of course.)

discuss:
  hn: https://news.ycombinator.com/item?id=36970305
  lobsters: https://lobste.rs/s/kuq1ha/unsafe_on_rust_still_being_helpful_even

image: https://cdn.chriskrycho.com/images/unsafe.png

date: 2023-08-02T06:52:00-0600
started: 2023-07-29T10:05:00-0600
updates:
  - at: 2023-07-29T12:35:00-0600
    changes: >
      Rewrote a section after re-reading the post end-to-end several times and getting feedback from Dan Freeman.

  - at: 2023-07-29T21:03:00-0600
    changes: >
      Restructured the piece after getting further feedback from Ben Makuh.

  - at: 2023-07-30T13:21:00-0600
    changes: >
      Did another pass with restructuring and editing with fresh eyes. Improved the flow of the argument and avoided chunking up the piece quite as much.

  - at: 2023-08-02T06:52:00-0600
    changes: >
      A final round of revisions for polish, clarity, flow of the argument, etc.

---

I semi-regularly hear from developers who claim that using Rust for their systems-level code would not gain them anything because they would have to use `unsafe` extensively in their code base. But this is not true. Even in software which makes extensive use of Rust’s `unsafe` keyword and features, including for <abbr title="foreign function interface">FFI</abbr>, low-level bit-twiddling, and so on, the ability to distinguish between safe and unsafe code comes with non-trivial benefits.

{% callout %}

This is not a “Rust is always the best” manifesto. There may be other ways to achieve Rust’s goals of memory safety with lower cognitive load than Rust imposes. If so, that will be great, because Rust’s cognitive load is significant. [Val][val] and [Vale][vale] (no relation to each other!) both look interesting here, for example, and so does [Swift][swift]’s still-<abbr title="work-in-progress">WIP</abbr> [ownership system][swift-ownership]. I do not take Rust to be remotely the final word in this space. It is the *first* memory safe systems language to be successful at industrial scale—not the last!

[val]: https://www.val-lang.dev
[vale]: https://vale.dev
[swift]: https://www.swift.org
[swift-ownership]: https://github.com/apple/swift/blob/main/docs/OwnershipManifesto.md

Rather, this is a critique of one very specific misunderstanding I see floating around—even from some really sharp developers. Please read it as such!

{% endcallout %}


## 1

The motivating intuition behind the claim that “we would have to use tons of `unsafe` anyway, so Rust would not help us” is simple and reasonable: Rust comes with significant mental overhead as the price of getting memory safety, so if you are not getting those benefits, why pay the costs?

Having *any* meaningful chunk of your code be reliably “safe” is useful, though. When trying to learn a system, and especially when trying to understand where things went wrong in a system, it is incredibly helpful to be able to know where you should start looking—and where you do not have to waste time looking. Assume 70% of your code base is wrapped in `unsafe`: That is still 30% of your code base where you do not have to think about memory safety! This is no small thing; C, C++, Zig, Odin, etc. offer no such guarantees. In those languages, all memory safety invariants are upheld implicitly; all isolation is done by choice alone.[^improved]

Put another way: Some safety is better than no safety. The question is: *How much better? When does it pay for the cognitive overhead of using a language which slows you down up front when dealing with `unsafe`?*[^cards] Is it 30:70 safe:unsafe? Maybe not (though I personally would take that trade every time!). Is it 50:50? I think most developers would admit that the trade is worth it: that is a *lot* of increased safety. What about 70:30—inverting the original proportions? Certainly: the vast majority of the program is safe at that point. And even the programs I hear discussed in this vein are much closer to the 70:30 safe:unsafe ratio (indeed: likely *even less* unsafe code than that).

Granted that people do sometimes manage memory safety (mostly-)effectively in memory-unsafe languages. In practice, that seems to work when:

- There is only person, or only a *very* small group, working on it—likely not more than 3 or 4.
- All maintainers have very high continuity with the software over time, neither stepping away from it nor seeing significant changes in the group membership.
- All maintainers are expert enough to keep the whole program in their heads at all times.
- The code base has an incredibly extensive (and always-growing) test suite, and is required to be valid through multiple layers of static analysis.

While maybe *just* possible in those contexts, this is very difficult to sustain over time. Most importantly: Our ability to keep a program in our head degrades both as the program grows and with any time spent away from it, and providing that same level of understanding to another person is [difficult at best][naur]. The larger a program grows, the longer we work on it, and the more people who are working on it, the more valuable any improvement in program-level safety becomes.

The value of the safety even in that 30:70 safe:unsafe split is obvious in the context of a team with half a dozen non-expert developers, especially if there is any amount of turnover. Even for a long-running solo project, though, I think Rust’s safety guarantees, and its distinction between safe and unsafe code in particular, is valuable: because it makes the program as a whole far easier to understand—to which I now turn.

[naur]: https://cdn.chriskrycho.com/resources/naur1985programming.pdf

## 2

By providing the safe-`unsafe` distinction, Rust enables us to provide genuinely safe <abbr title="application programming interface">API</abbr>s which themselves *wrap* unsafe code. As a result, in practice, few if any idiomatic Rust libraries or programs would have a 30:70 ratio of safe:unsafe code. (The practice of wrapping `unsafe` code in safe abstractions is a learned habit, though, so I can see how people who have not internalized this mechanic could fairly readily end up there.) Those safe wrappers both *uphold* and *isolate* the key invariants for memory safety. Upholding and isolating invariants are both important, and they are closely related to each other.

When dealing in unsafe code—whether in Rust `unsafe` blocks or in all the code in languages like C and C++[^modern-cpp]—the responsibility falls to the programmer to write code which is still safe. This is possible! It is simply very difficult. They key is that if we want to have memory safety, some place in our code must actually *check* that safety. Best of all is when that can be done by the compiler (think of bounds checks on arrays/vectors <em style="letter-spacing: -1.5px">&c</em>.). A close second is explicitly encoding those checks into the types in our system ([Parse, Don’t Validate][pdv]). A third runner-up is dynamically checking the invariants at runtime and crashing noisily and eagerly if they are violated: this is always better than the kinds of problems that come from memory corruption.[^cycle-time] A safe wrapper around an unsafe <abbr title="application programming interface">API</abbr> can follow either of the latter two approaches, and both are significant improvements over *not* explicitly upholding the contract.

[pdv]: https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/

The dynamic here is similar to providing a pure functional interface in a language which is implemented with mutable data under the hood (which pattern is particularly common in languages like OCaml and F^♯^, but available in nearly any language). Mutating a new array in place can be far more efficient than using even a well-optimized persistent data structure, but providing a purely functional interface means callers do not have to care about the implementation details and still get the benefits of referential transparency.

Granted, again, that Rust’s memory safety benefits do not come for free. There remains no free lunch! But unless *every line* of the program in wrapped in `unsafe`—which would be extraordinary!—Rust’s distinction between safe and unsafe code is still valuable, and the more so as you isolate your enforcement of memory safety behind safe wrapping <abbr title="application programming interface">API</abbr>s. Why? Because it significantly improves your ability to *reason locally*: When in non-`unsafe` blocks, you do not have to think about memory safety bugs. When in `unsafe` blocks you *do*, but with a clear idea of where the boundary is.

Having only one place in the code base which must uphold a given invariant means it is far easier to test and to debug when there are failures. It means the code base does not rely on people fully internalizing the rules for each <abbr title="application programming interface">API</abbr> by reading all of its comments (and those comments being correct and exhaustive!) and then being sufficiently careful everywhere they use that <abbr title="application programming interface">API</abbr>. “Don’t Repeat Yourself” is most important, and most applicable, when it comes to upholding the invariants in a program.

That goes for memory safety most of all.

{% from 'components/post-reply.njk' import reply %}
{{ reply(title, discuss) }}

[^modern-cpp]: This is still true in modern C++, even with tools like unique pointers, precisely because there is no way to exhaustively check the code base for all possible variations of safety invariant violations. You cannot search for `unsafe` in a language which does not make that distinction!

[^cycle-time]: Notice also that the first two can be caught *much* earlier than the third, because they can be caught by a compiler and do not require running the code. This is a good reason to push these kinds of invariants into a type system where possible; it brings it into [an earlier and *faster* feedback time scale][time-scale].

[time-scale]: https://v4.chriskrycho.com/2018/scales-of-feedback-time-in-software-development.html

[^improved]: Zig and Odin make some real improvements on C and C++, to be sure; but they ultimately allow comparable degrees of memory unsafety.

[^cards]: Cards on the table: I am a “slow down up front because it speeds you up later” thinker. I [run][80-20] this way, I write this way, I program this way; as much as possible I *live* this way. Not everyone agrees. So far as I can, I am writing this to people who may well disagree, and firmly, at least when it comes to code!

[80-20]: https://www.8020endurance.com
