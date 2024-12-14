---
title: Reading “A Functional Programming Language with Versions”
subtitle: >
  The first academic research I’m aware of which actually takes Semantic Versioning seriously!
qualifiers:
  audience: >
    Other computer science nerds with a bent toward type theory and an interest in industrial applications thereof.
  epistemic: >
    Way out of my depth on the formal type theory, but with *lots* of experience and well-formed opinions on the industrial applications of SemVer. So: very mixed.
date: 2021-11-18T21:43:00-0700
feedId: library/reading-papers/functional-programming-language-with-versions/
tags:
  - Rust
  - TypeScript
  - programming languages
  - computer science
  - type systems
  - functional programming
  - learning
paper:
  title: A Functional Programming Language with Versions
  journal: The Art, Science, and Engineering of Programming
  volume: 6
  issue: 1
  authors:
    - Yudai Tanabe
    - Luthfan Anshar Lubis
    - Tomoyuki Aotani
    - Hidehiko Masuhara

---

[A Functional Programming Language with Versions][paper], in [<cite>The Art, Science, and Engineering of Programming</cite>][journal], [Volume 6, Issue 1][issue]; Yudai Tanabe, Luthfan Anshar Lubis, Tomoyuki Aotani, and Hidehiko Masuhara

[paper]: https://programming-journal.org/2022/6/5/
[journal]: https://programming-journal.org
[issue]: https://programming-journal.org/2022/6/issue1/

---

Prompted by a conversation with a colleague this evening as I was finishing up one of the final bits needed on [the Semantic Versioning for TypeScript Types <abbr title="request for comments">RFC</abbr>][semver-rfc], I ran a web search for `"dependent types" "semantic versioning"` again. This site has been on first page of results for that searchsince I first shared that <abbr>RFC</abbr>, which is both amusing and somewhat disheartening: as far as I can tell, I am one of the few people working on rigorously applying [SemVer][semver]. But today, when I ran the search, I found something new: a paper which was published since the last time I looked! If the title alone weren’t enough to catch my interest, the abstract certainly was (emphasis mine):

> While modern software development heavily uses versioned packages, programming languages rarely support the concept of versions in their semantics, which makes software updates more bulky and unsafe. This paper proposes a programming language that intrinsically supports versions. The main goals are to design core language features to support multiple versions in one program and establish a proper notion of type safety with those features. The proposed core calculus, called Lambda VL, has versioned values, each containing different values under different versions. We show the construction of the type system as an extension of coeffect calculus by mapping versions to computational resources. The type system guarantees the existence of a valid combination of versions for a program. The calculus enables programming languages to use multiple versions of a package within a program. **It will serve as a basis for designing advanced language features like module systems and semantic versioning.**

[semver-rfc]: https://github.com/emberjs/rfcs/pull/730
[semver]: https://semver.org

So in this first (and who knows: maybe only ever!) entry in my [Reading Papers in Public][rpip], I’m going to walk through my thoughts from reading the paper. This is a list of bullet points because this is a list of notes and thoughts from reading the paper, nothing more and nothing less! I’m not going to *explain* the paper (though if I had time to do something like [The Morning Paper][tmp] that would be lovely) so much as I am going to *react* to it.

[rpip]: https://v5.chriskrycho.com/library/reading-papers/
[tmp]: https://blog.acolyer.org

- From the outset, the authors note that they think of this approach as an increase in granularity of the same sort of increased versioning flexibility as provided by other computing tools: for OS-level features by virtualization, for libraries linked to a program by dynamic linking, and from packages to their proposal. On the one hand, I see the attraction of the analogy. On the other hand, it’s not *totally* clear at the outset that it holds?

- They correctly identify the problem space: “dependency hell” where you end up with either intractable conflicts between the versions of packages you depend on *or* with cases where you have to jump through hoops to safely interoperate between two versions of some library… where the thing you’re making interoperate is *the same*, but not in a way that’s visible to the type system. (Dynamic typing advocates might argue that this isn’t a problem they have; I would answer that it *is* a problem they have: but with no help from a compiler to resolve it or even be aware of until something goes wrong at runtime.)

- Their overall solution is to more or less reject package-level versioning. This gives them a “solution” to the problem they ID, but it comes at the cost of much-increased *granularity*, and as far as I can see at this point in the paper, end users of the language have to pay that cost granularity-wise in terms of annotating their programs.

    That isn’t *necessarily* a bad thing—you could argue that this is exactly the kind of cost [Rust][rust] asks its users to pay in exchange for memory management. But Rust is also famously more difficult to pick up than a lot of other modern languages, even if it rewards you for the effort.

    And to be fair, this is a research paper, not even *trying* to tackle the ergonomics questions so much as to just show that something is useful. You need [Cyclone][cyclone] before Rust can happen.

- Their discussion also assumes nominal types in the type checking. (In fact, it more or less seems to basically take the Rust model as the _de facto_ baseline.) This makes a certain amount of sense, because *most* languages out there are like this, and the name-mangling approach Rust takes is common for resolve package versioning discrepancies. But one major alternative in the problem space is structural typing _a la_ TypeScript, where the kinds of compatibility problems they describe as fundamental… aren’t. It’s not that it solves all the problems here, but it *does* solve the name-mangling problem: Two versions of a library with structurally-compatible types have no conflict for that type when doing structural type checking.

    Though at that point, I think the “granularity” question becomes interesting in a different way? That is, it’s not an interesting problem because of name mangling, but because the level of type-checking involved *itself* is quite granular, and while the kind of tagging they do to get this granularity isn’t necessary, the type checking itself can grow in a fairly unbounded way. This is a problem TypeScript has, full stop.

    The net is that the increase in granularity *allows* the type checker to work on a per-type basis while also keeping nominal semantics. Switching from the Rust-style name-mangling scheme to this kind of tagging. Thinking about the Rust lifetimes analogy: I could see this working reasonably well if it were opt-in when you as an author wanted to preserve continuity between types, but with a default of *not* doing it and falling back to name-mangling instead; or if the compiler could infer it when publishing a new version of a type, something like Rust’s lifetime elision rules. It would quickly become laborious if there weren’t some good tooling like that put into a productionized version of this design.

- They offer up <abbr title="versioned language">VL</abbr>, a “hypothetical surface language” which “is designed to bridge the usual programming style and [their] proposal”—where “the usual programming style” means versioned packages. Their syntax lets them “tag” a given type or expression with a version of the package it works for. Where a non-version-annotated type might look like this:

    ```
    pub type Something = ...;
    ```

    …the version-annotated type would look like this:

    ```
    pub type Something = {PackageV1: ..., PackageV2: ...}
    ```

    Actually using it would declare which version it was actually using:

    ```
    fn do_something -> Something = { PackageV2: ... }
    ```

    With this in place, a given declaration of an item can *cross versions*. A type in a package at version 2 can say it works the same in versions 1 and 2 and then consumers can say which version they use, and then you’re just in the same kind of version-solving problem that the constraint-solving tools employed by [npm][npm], [yarn][yarn], [Cargo][cargo], etc. already do—though, again, at a far more granular level.

    Again, I don’t think this surface syntax is *great*, but I’m willing to go with it for the sake of the paper’s argument, which is interested in whether this is *possible*, not what it would take for it to be productionized.

- This is the point in the paper where my ability to follow it well starts to degrade slightly, because it’s the point in the paper where they shift into formal <abbr title="computer science">CS</abbr> language and notation: “…an extension of the coeffect calculus” is a phrase that I have no doubt is perfectly meaningful to their intended audience, but which is completely lost on me.

    (The reference seems to be to [this paper](http://tomasp.net/academic/papers/structural/coeffects-icfp.pdf), with names I recognize from *other* papers I’ve read over the years. But I have roughly the same problem with *that* paper. Maybe if I’d spent a few years in <abbr>CS</abbr> grad school absorbing the formal and symbolic language…)

- That ignorance notwithstanding, I’m still able to follow this section *somewhat*. The other fundamental idea here is *delayed computation*—under the idea of “suspensions.” The obvious analogy here to me is late binding: one of the major points of which is to deal with exactly this kind of problem. This is like if late-binding/dependency injection were lifted up to the type level.

- The kind of type-level reasoning required once you start pushing this information through function signatures and applications reminds me of (a) the way that dependently-typed data and proofs work and (b) [the “colored function” problem][color] with language-level tools like `async`/`await` or, again, Rust's lifetime annotations.

    (a) makes a fair bit of sense to me. This is basically setup to do a kind of proof in the end, after all—something something Howard-Curry isomorphism something package resolution is just constraint-solving.

    (b) is interesting, though. Once you introduce this kind of tracing/tagging of versioning, it propagates up through everything else which uses it until you can resolve it to something which handles both versions without needing to further propagate it. But experience with even types like `Option` or `Result` shows that that can end up being pervasive if you’re not careful to [parse instead of validating][parse] your data. You’d probably have to apply a similar strategy here, pushing the handling to the “edges” of the system.

    That makes sense, though, and it matches the intuitions I’ve slowly been building up around doing something similar using macro systems (e.g. with Babel in <abbr title="JavaScript">JS</abbr> or Rust‘s feature/config-based procedural macros). You’d want, in general, to figure out what versions of things to call in as isolated a way as possible so that the rest of the internals of your consuming library or program doesn’t have to reason about it.

    Which brings to mind another analogy: Rust’s `unsafe`, which has many of these same properties as well. Just like providing a safe interface for `unsafe` functionality is the standard practice in Rust, I think a language which used these ideas effectively would have to develop the same kind of norms.

- And indeed, their mechanic for “extracting” a concrete value (rather than leaving it “suspended” between versions) forces the issue: once you do that, it resolves the type and stops propagating. And by the same token, because it’s carrying it around as type information, it can check when a user does that “extraction”: does the intersection of all the relevant versions for these values actually produce a non-empty set of values such that this *can* be resolved?

    This implicitly makes the point that they’re not *fundamentally* solving the version-mismatch problem. They’re just narrowing it a *lot*. And that’s actually fine, I think! In my experience, “just” radically narrowing the scope of a problem can be incredibly powerful in its own right, and is often worth doing. What’s more, “just” narrowing the scope of a problem in this way can mean that it *is* effectively solved for a large number of use cases.

- Then comes the section called ”The Lambda VL Type System.” If I was able to hang with the previous section all right, here my comprehension goes off a cliff. I just don’t have the requisite knowledge. I’m skimming it. (“Version resource semiring? Nope. Someday I’ll know what that means, but not today!) So sections 4 and 5 are just not useful to me at this point. I believe they probably prove what they say they do, but I literally can’t read the proofs. That’s fine for now!

- The last couple sections are extra interesting to me in terms of future reading and research—there are a bunch of things here I hadn’t heard of, in the usual “academia and industry talk about these things in totally different language with a tragic lack of overlap” way. (That’s part of what made this paper so exciting to me!) Things I plan to dig into/papers I plan to read that they reference include:

    - Delta-oriented programming, which at least in theory unlocks the ability to calculate “compatibility information in the context of program analysis”—but of course that makes me wonder if these folks are familiar with the fact that languages used in industry (even if to a fairly small degree) already do this: looking at Elm, in particular, which integrates this kind of version analysis into its package publishing workflow!

    - Coeffect calculus: a more general subject area (which I referenced above), and which seems like it’s in my general interest area as well. It’s been applied in the context of [Granule][granule], which I had come across independently the *last* time I was looking at this space. (I think someone mentioned it to me on Twitter, but I don’t recall; if that was you, thank you!) Granule’s authors includes one of the authors of this paper, so there’s definitely some overlap here.

- The authors suggest that their future directions include: catching up to the kinds of compatibility ranges that tools like npm and Cargo understand, i.e. the full SemVer spec; and making the language efficient enough to be useful. To that I would add: they should think very hard about the ergonomics of *using* such a language!

Net, this is a very cool paper, which I enjoyed reading (my inability to understand the technical sections notwithstanding), and it re-energized me to think more about the problem space of “dependency hell.” I’ve had some thoughts simmering for the last six months about dependencies, especially peer dependencies (alluded to above), and hopefully I can flesh some of those out over the next year or so.

[rust]: https://www.rust-lang.org
[cyclone]: http://cyclone.thelanguage.org
[npm]: https://www.npmjs.com
[yarn]: https://yarnpkg.com
[cargo]: https://doc.rust-lang.org/cargo/
[color]: https://journal.stuffwithstuff.com/2015/02/01/what-color-is-your-function/
[parse]: https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/
[granule]: https://granule-project.github.io

---

This was fun! Maybe I’ll do it again sometime!
