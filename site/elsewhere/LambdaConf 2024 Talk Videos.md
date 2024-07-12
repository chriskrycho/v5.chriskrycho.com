---
title: LambdaConf 2024 Talk Videos Released!
date: 2024-07-11T20:11:00-0600
feedOnly: true
summary: >
    You can now watch my LambdaConf 2024 talks: “Seeing Like a Programmer” and “The Cutting Edge of Versioning”.

---

As was foretold (?) both of my LambdaConf 2024 videos have at last been released on YouTube!

- [Seeing Like a Programmer: Resiliency, Limits, and Moral Hazards in Software Engineering][seeing]—the best talk I have ever given, and also by far the most important. You don’t need to be a software engineer or even to know all that much about software to appreciate this talk, and some of the people I think need to hear it most are people who work *with* software engineers but who are not themselves software engineers. If you find it helpful or thought-provoking, I would really love it if you shared it!

    The abstract for the talk was:

    > Engineering is building systems which both reduce mistakes and safely absorbing the mistakes which do occur. In software engineering specifically, we  should apply test-driven development (TDD) and adopt domain-driven design (DDD), use types systems to make illegal states unrepresentable, model what kinds of effects are legal in languages like Unison, and formally model and even prove how parts of our systems work: all tools for more effective “theory-building”, to borrow Peter Naur’s term.
    >
    > But we also have two serious problems: (1) the limits of translating our thoughts into code; and (2) the limits of translating any human activity into software systems. Many “schemes to improve the human condition have failed”, as James C. Scott observes. We should learn from those failures.
    >
    > We should not give up on software—or on software engineering! But great engineers know not only when and how to apply their tools, but also the limits of their tools and their whole trade.

- [The Cutting Edge of Versioning: Semantic Versioning, library & framework evolution,
programming language design, type systems, and you][versioning]—aimed much more squarely at software developers, and much more an in-the-weeds exploration of a nitty-gritty topic in day-to-day software engineering.

    Here was the abstract for this one:

    > Versioning sits at the intersection of contract and communications: what our languages and tools can enforce, and what we want to tell the people using our software.
    >
    > Semantic Versioning is one answer to this: a sociotechnical contract which lets us define breaking changes. Because it is social as well as technical, though, it is ambiguous. Members of the Rust and TypeScript communities offer one kind of answer to this challenge: specification and tooling. Elm has offered another: baking it into a language-aware package manager. Unison lets evolution and versioning coexist. One group of researchers even baked type evolution into a functional programming language. Other languages and ecosystems have just thrown up their hands in the face of the inevitable edge cases and failure modes. We can do better!
    >
    > How can new languages include versioning semantics in their design constraints? What tooling should we build for existing ecosystems? Above all, what should you do in your own projects?

[seeing]: https://www.youtube.com/watch?v=k7Jer1wwoDw
[versioning]: https://www.youtube.com/watch?v=Mt7v-VbFjxk
