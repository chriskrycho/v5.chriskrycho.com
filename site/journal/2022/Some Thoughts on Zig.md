---
title: Some Thoughts on Zig
subtitle: >
  A positive framing (of one part at least!) from someone who is distinctly *not* here for what the language is selling.
date: 2022-07-21T19:55:00-0600
tags:
  - Zig
  - Rust
  - programming languages
qualifiers:
  epistemic: >
    A hunch, but a pretty strong one.
  audience: >
    People interested in programming languages and the design thereof.
summary: >
  One of the biggest things Zig has going for it—especially compared to Rust—is that it is (relatively) small. That sits in tension with Rust’s approach to solving memory safety problems, and sets up a nice challenge for future programming language designers.

---

I looked at [Zig](https://ziglang.org) as soon as it started making waves. Of course I did: as a [huge fan][nr] of [Rust](https://www.rust-lang.org), a new programming language in the systems language/“C replacement” space was of immediate interest. Like many people who like Rust, I also immediately bailed on Zig, because a new systems programming language which doesn't meaningfully address memory safety[^option] just doesn't interest me. But:

[nr]: https://newrustacean.com

Zig is run by a sharp team, attracting a lot of attention, and generally proving to be at least moderately successful for a language its age… and I think there are some good reasons for that. I don't want what it's selling, but a lot of people clearly do, and it's worth understanding *why*. Accordingly, I want to offer a sympathetic take to one key aspect of Zig which I think is a big part of its appeal, and from that vantage point try to offer some thoughts on programming language design more generally.

Zig has a number of interesting features relative to its competition, most notably [its `comptime` feature](https://ziglang.org/documentation/master/#comptime) and its ability to interoperate cleanly with C and C++ code and indeed to compile them. But I think its biggest selling point over and against something like Rust is that it is *small*.

C is a small language which feels very elegant. You can learn it well enough to be dangerous (and I do mean that!) in a few weeks. You can learn in a matter of months how to write fast, memory-efficient algorithms which can run on almost any hardware in the world.[^doubt] The problem is all the parts that *aren’t* in the language—but which you still have to hold in your head. Any part that you miss (and there are many, and they are deep in the spec, and they might vary by compiler, and literally no one in the world remembers them all!) could result in a [<abbr title="Common Vulnerabilities and Exposures">CVE</abbr>](https://www.cve.org). It simply has *no* features for memory safety.

Rust is one attempt to address that problem. It does it by looking at *all* of the parts C makes you hold in your head and shoving them straight into the language itself. That works for some people. It works for me! But it doesn't work for everyone.

There is a good reason that C++ didn't seem like an actual improvement to a lot of C hackers, so much as a variation which grew language features like weeds. C++ is huge. For many C developers looking to upgrade their language, Rust looks a lot like a better C++, not a better C. “Sure, Rust's design is (so far) more coherent than C++'s, and its feature set more orthogonal,” a C developer might say. “But Rust is still a very large language, and only growing larger over time.” The C developer would be right.

When I wrapped up [New Rustacean][nr] in mid-2019, I had covered the vast majority of the language, and *even then* it was a large language. It took me over three years to teach through all of it—granted that the schedule wasn't all that regular and that I interspersed a lot of other kinds of material, it also just took a long time to cover all that ground in a reasonably effective way. And Rust has grown substantially since then: it added a whole massive chunk of the language around `async`/`.await`!

People struggle with Rust for a number of reasons, including that some of its concepts are deeply novel for anyone outside academia (hello, the borrow checker!)… but one reason is that it is just *so. very. large*. It is, accordingly, totally reasonable for C programmers to feel overwhelmed, and to feel that it isn't really a direct replacement for what they do now. (It wins over a lot of C programmers anyway, but it often takes some time, and that is fair in the same way.)

Zig looks a lot more like C. It is aiming to be substantially smaller than Rust—not only to start smaller, but to *stay* smaller. It is so far doing that in part by not solving some of the problems Rust solves. It makes you keep more of those in your head. That has some of the same downsides as C making you keep those things in your head did… but C programmers are used to those.

<aside>

That ambition not to be large is, I think, a good one for many programming languages to embrace! This is not just a "C programmers want a small language" problem. Rather, there is considerable appetite in the software industry for smaller languages in general.

A couple notable examples from the last decade: [Go](https://go.dev) has historically been much smaller than any of the languages it has substituted for (especially Java but also Python). For a very long time, it avoided almost all modern language features, most notably generics. [Elm](https://elm-lang.org) has had similar appeal in its corner in part because its creator has steadfastly refused to expand its scope. It has thereby earned its reputation as by *far* the easiest introduction to pure functional programming—especially by comparison to its closest neighbors in terms of programming language design, Haskell and PureScript.[^elm]

You can learn Go and Elm well enough to feel productive in a couple weekends. Rust or Haskell… not so much.

</aside>

The challenge, though, is how to actually solve the key problems Rust *does* solve and which Zig *does not*… in a small language. I think often of [Notes on a Smaller Rust](https://without.boats/blog/notes-on-a-smaller-rust/). I watch Swift's work to implement [its own ownership system](https://github.com/apple/swift/blob/01c22b718cfc80a10feaefaf598aa1087f3766c8/docs/OwnershipManifesto.md) with great interest. I recognize that this is an incredibly difficult problem space: Rust was the first production language to actually gain traction while solving these problems, and it has solved problems that even <abbr title="garbage collected">GC</abbr>'d languages have not manage to solve (data races!).

I think the very real appeal of Zig is indicative of a need in this space, though. What would it look like to have a systems-level language which is much smaller than Rust but which is memory safe end to end? I don't know, but I hope someone is working on it, because it's a really good idea.



[^option]: Its use of an optional type over null pointers and similar improvements over C are real wins, which will address at least *some* of the problems with C in the real world. But it's in a vastly different space from a garbage collected language or from Rust (or from what Swift is aiming to do).

[^small]: Leaving aside the way that `comptime` impacts the question of "language size," it is clear that Zig *wants* to be a smaller language.

[^elm]: Honorable mentions here to both F♯ and OCaml; neither is a *huge* language but both are significantly larger than Elm.

[^doubt]: This isn’t hypothetical: I did it learning on the job in my first gig out of college with nothing to build on besides a year of Fortran 90 physics code, a single semester of introductory Java, and a lot of terrible <abbr title="hypertext markup language">HTML</abbr> and <abbr title="cascading styel sheets">CSS</abbr> hackery.
