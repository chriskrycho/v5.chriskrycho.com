---
title: LambdaConf 2024—Two Talks!
subtitle: >
    One technical deep dive on versioning, one philosophical exploration of our limits as software engineers.

tags:
    - software development
    - talks
    - public speaking
    - Semantic Versioning
    - programming languages

date: 2024-01-09T08:45:00-0700

---

I am excited to announce that I will be giving not one but two talks at [LambdaConf 2024][lc]! These two talks represent some of the most important parts of my thinking and work over the past several years. They are also profoundly different from one another: one sweepingly philosophical, the other deep in the weeds of a specific technical challenge. They have in common, though, a concern for the human dynamics of software development—the social and cultural realities of the field. I look forward to sharing them with you!

[lc]: https://www.lambdaconf.us

## I.

When I first read Peter Naur’s [Programming as Theory-Building][patb], it summed up beautifully one of the deep tensions I have seen in the industry throughout my career so far: between how “management” *wants* software development to work and how it actually *does* work. When I read James C. Scott’s increasingly-influential book <cite>Seeing Like a State</cite>, I immediately started [mulling][example] on applications to software: the same kinds of limits that modernist schemes face in trying to bend the world into a legible, “rationalized” shape apply to this discipline in particular. This talk about the intersection of those two themes has been bubbling ever since.
    
<figure>
<video src="https://cdn.chriskrycho.com/videos/seeing-like-a-programmer-promo.mov" controls allowfullscreen playsinline>
</video>
</figure>

“Seeing Like a Programmer” – Resiliency, Limits, and Moral Hazards in Software Engineering
: Engineering is building systems which both reduce mistakes and safely absorbing the mistakes which do occur. In software engineering specifically, we  should apply test-driven development (TDD) and adopt domain-driven design (DDD), use types systems to make illegal states unrepresentable, model what kinds of effects are legal in languages like Unison, and formally model and even prove how parts of our systems work: all tools for more effective “theory-building”, to borrow Peter Naur’s term.

    But we also have two serious problems: (1) the limits of translating our thoughts into code; and (2) the limits of translating any human activity into software systems. Many “schemes to improve the human condition have failed”, as James C. Scott observes. We should learn from those failures.

    We should not give up on software—or on software engineering! But great engineers know not only when and how to apply their tools, but also the limits of their tools and their whole trade.

## II.

The second talk pulls together many of the threads of my work at LinkedIn on versioning constraints for TypeScript (including [the SemVer for TS Types][semver-ts] spec I developed) with more general considerations about the state of the art in this problem space.

<figure>
<video src="https://cdn.chriskrycho.com/videos/cutting-edge-of-versioning-promo.mov" controls allowfullscreen playsinline>
</video>
</figure>

The Cutting Edge of Versioning
: Versioning sits at the intersection of contract and communications: what our languages and tools can enforce, and what we want to tell the people using our software.

    Semantic Versioning is one answer to this: a sociotechnical contract which lets us define breaking changes. Because it is social as well as technical, though, it is ambiguous. Members of the Rust and TypeScript communities offer one kind of answer to this challenge: specification and tooling. Elm has offered another: baking it into a language-aware package manager. Unison lets evolution and versioning coexist. One group of researchers even baked type evolution into a functional programming language. Other languages and ecosystems have just thrown up their hands in the face of the inevitable edge cases and failure modes. We can do better!

    How can new languages include versioning semantics in their design constraints? What tooling should we build for existing ecosystems? Above all, what should you do in your own projects?


[patb]: https://cdn.chriskrycho.com/resources/naur1985programming.pdf
[example]: https://v5.chriskrycho.com/library/necessarily-simple-abstractions/
[semver-ts]: https://semver-ts.org
