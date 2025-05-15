---
title: Seeing Like a Programmer (LambdaConf 2024)
subtitle: Resiliency, Limits, and Moral Hazards in Software Engineering

image:
    cdn: seeing-like-a-programmer.png

summary: >
    How do we make good software, and indeed, what makes software good: both as software, and in terms of its place in the world?

date: 2024-05-07T17:40:00-0600
updated: 2025-05-14T19:53:00-0600
updates:
    - at: 2024-07-11T20:10:00-0600
      changes: >
        Added the video link and a note about the talk at the top.

    - at: 2024-11-05T07:45:00-0700
      changes: >
        Tweaked the introduction a bit.

tags:
    - public speaking
    - software development
    - talks
    - James C. Scott
    - Donella Meadows
    - thinking

qualifiers:
    audience: >
        People interested in how we can make good software. In more than one sense of the phrase “good software”. **That means *not* just software engineers.**

featured: true

---

This is the second of two talks at LambdaConf 2024: exploring what we can do to make our software *better*… and also what to do to make *better software*. As the title might suggest, it explicitly draws on James C. Scott’s <cite>Seeing Like a State</cite>; it also draws extensively on Peter Naur’s “Programming as Theory-Building”, Donella Meadows’ <cite>Thinking in Systems</cite>, and more.

If you find this helpful or thought-provoking, I would love it if you shared it. You don’t need to be a software engineer or even to know all that much about software to appreciate this talk, and some of the people I think need to hear it most are people who work *with* software engineers but who are not themselves software engineers.

<figure class='embed'>

<div class='embed__wrapper'>
<iframe class='embed__content' src="https://www.youtube.com/embed/k7Jer1wwoDw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

<figcaption><a href="https://www.youtube.com/watch?v=k7Jer1wwoDw">Seeing Like a Programmer</figcaption>

</figure>

Here are the slides:

<figure class="embed"><div class="embed__wrapper">
<iframe class="embed__content speakerdeck-iframe" src="https://speakerdeck.com/player/07b6b710e90e44049e7a70d8113bb817" title="“Seeing Like a Programmer”—Resiliency, Limits, and Moral Hazards in Software Engineering (LambdaConf 2024)" allowfullscreen="true" data-ratio="1.7777777777777777"></iframe>
</div></figure>

And if you like, you can read the talk as I prepared it. (Note that this is a *script*, not a *transcript*, so you will note some differences from the video above!)

# Seeing Like a Programmer


## Introduction

Hello! This is “Seeing Like a Programmer: Resiliency, Limits, and Moral Hazards in Software Engineering”, and I am Chris Krycho. I have been a software engineer for about 15 years now, and I have worked on a bunch of things which really pushed me to consider, right from the start, the importance of software that *works well*:

- When you’re building software for aircraft, or a physics model to answer “What happens if there is an explosion in this oil refinery?” it is extremely obvious that *correctness* matters.

- Even for something more pedestrian, like ordering food from a restaurant, it matters that the order is correct, that you get charged the right amount of money.

- Most recently, I spent half a decade working on developer tools and web frameworks at LinkedIn. When any layer of the stack is not robust or resilient… it’s a bad time. The app breaks for users, developers get frustrated at their tools, product managers and designers wonder why *every. single. feature.* takes forever to implement.

And so I just keep thinking about this question:

> How do we make *good* software?

That's what this talk is about.

## Good Software

But to even begin to answer that question, we have to realized that there are two different things we might mean by “good software”.

One is what I just described: *Does the software itself work well?*

Second, though, is the software—

- *the right tool for the job at all?* (rather than assuming that computing is always good)
- *actually something people want?* (rather than something forced on them)

In short, is the software *good* not only in terms of its own internal characteristics but also as a thing-in-the-world?

### Key Themes

The big themes we are going to trace as we think about what it means to make “good’ software—in both of those senses—:

- **Engineering:** How do we make the software itself good?—and that goes beyond merely the code we write.

- **Modernity and intellectual *modernism*:** and specifically how software and computing are not only artifacts of modernity but are often instantiations of the intellectual project that is modernism and and why that might be a very bad thing.

- And therefore: **Humility!** Knowing the limits of our craft—both its own intrinsic limits and its limits as a thing-in-the-world—can equip us to make better choices in what we build, how we build it, and what we might need to say “no” to.

## What is software?

If we are going to talk seriously about this, we need to understand what software *is*. As Peter Naur put it in 40 years ago, in a paper we will return to often today:

> [It] is important to have an appropriate understanding of what programming is. If our understanding is inappropriate we will misunderstand the difficulties that arise in the activity and our attempts to overcome them will give rise to conflicts and frustrations.

—Peter Naur, “Programming as Theory-Building”, 1985

So what is software? I argue that it is two things: *artifact*, and *system*.

### Software as artifact

The first answer we tend to reach for when we ask what software is: “code”, the text we create. But the program text is a necessary but insufficient condition for *software*. It’s kind of like the score to a piece of music. As composer and conductor Eímear Noone put it recently:

> The score is potential energy. It’s the potential for music to happen, but it’s not the music.

You can study a musical score by itself. You can understand its intent, analyze the composer’s musical decisions, write a thesis on the artifact. But if you never hear it played, you are missing the point. The score is secondary; it exists in service of *making music*.

Software is similar. The textual source for a program, or even a compiled version of it, is just *potential* software until someone runs it. It is an inert *artifact*—which matters: there is no software without it—just like there is no orchestra performance without a score.

But again: You can read code to learn from it, or to understand some particular aspect of design, or to analyze the way that software works. But if you never run the program, you are missing the point.

### Software as system

And once you run the program, it starts interacting with things beyond itself. It gets input from users, has to deal with operating system interrupts, might run out of memory, could be subverted to hijack the system it is running on.

At one point in my time at LinkedIn, we had a growing set of memory leaks in Node servers we were unaware of, and eventually they got bad enough that they started knocking down the site every time we had a long weekend between deploys. As we dug in, we realized the cause was actually not “a cause” but a complex mix of factors:

- long-standing technical debt in how these servers worked
- gaps in observability
- increased load on the system, from both traffic growth and the application itself growing
- system configuration mistakes not caught by code review
- org-wide ‘right-sizing’ decreases to memory for the sake of efficiency
- a lack of resilience: there was only one place *anywhere* which could respond to an unhealthy node

And, critically: No one had a view of the system as a whole.

The original authors had moved on. Their attempts to explain the system were scattered around a presentation here, a document there—but even if they had documented it well, other teams had made reasonable-enough design decisions of their own which actually conflicted with the design of this system, because as important as this system was, it was only a tiny fraction of the whole, and they were—perfectly reasonably!—unaware of it.

Software is not just an artifact; it is the whole *system* which requires understanding, design, modeling, and—especially—ongoing observation. Until we built a theory of that whole *system*, and had added enough logging and tracing to see how it behaved as we made changes, we struggled mightily to make progress.

### Artifact *and* system

Software is both the artifact that produces the program and the running program in the real world. If we miss *either* of those, we will end up in a really confused place. And by the same token, if we want to make our software *good*, we have to tackle both parts.

## Good software artifacts

So what do we know about making good software artifacts?


### Domain-driven design

To start, I think Eric Evans’ <cite>Domain-Driven Design</cite> is one of our best tools.

The big idea is to explicitly use the language of whatever your software is working with. So the types and functions in your code should use the same nouns and verbs as the people who actually do the work.

To use an example from the excellent [ddd-by-example GitHub project](https://github.com/ddd-by-examples/library): if you are building *library* software, your code should be in terms of books, copies, holds, checkouts, catalogues, patrons, librarians; with functions to let a *patron* *place a hold* on a *book* from the *catalogue*, an event representing *a hold becoming available*, and *state* for the *status* of a *copy* of a *book* , and so on.


### Making Illegal States Unrepresentable

These days, “domain modeling” is increasingly common in everything from F♯ and Elm to Rust and Swift. The key moment, I think, was about a decade ago, in Ron Minsky’s talk “Make Illegal States Unrepresentable”, which showed how to combine types with DDD to make for a much more robust piece of software.


Here’s a classic example: a data type representing the state of an <abbr title="application programming interface">API</abbr> request, which can be loading, loaded, or in an error state. If it has loaded, it has the expected data associated with it, and if it is an error, it has some descriptive error. A naïve implementation simply puts those all on a single data structure, with booleans for the states and optional value and error fields:


This is easy to get wrong! You can end up with a `RequestData` which has `loading: true`, `is_loaded: false`, `is_error: true`, but which also has `value: Some("oh no")` and nothing set on the `error` field.


The type system will smile agreeably at you and let this go right by! Minsky’s insight was that we can, instead, use types which correctly capture the only *legal* states in the system and use tagged unions (or sum types) to represent this. Again, in Rust:

```rust
enum RequestData<Value> {
    Loading,
    Loaded(Value),
    Error(String),
}
```

With that change it’s impossible to have that invalid state.

```rust
let data = RequestData::Loaded("Phew!");
```

This is good! A lot of bugs just disappeared forever.

We can make our software *good* much more easily when we make its assumptions about the world explicit, and make the program structure and text *show* those assumptions. It is much harder when the load-bearing commitment are implicit.

### Proof

Going further than that, we can also formally prove correctness when it matters. If you are building a <abbr title="transport layer security">TLS</abbr> implementation, for example, you might reach for F\* or Lean, which let you take types much further and *prove* your implementation is correct. That is expensive, but perhaps worth it given how important it is *and* given the mathematical tractability of the problem.

### Formal modeling

Formal verification and proofs are on the “output” side of the process. We can also use formal methods on the *input* side of our software development process. Tools like TLA+ or Alloy let us formally model—specify—a design, and then they iterate over the “state space”: the combination of the possible inputs and possible interactions. By doing that search, they can figure out whether the rules we have written down always hold for those inputs and interactions. If not, we know we missed something: time to revisit the design! And if so, when we go to *implement* the program, we have something we *know* is reliable that we are trying to implement: the spec.

### Testing

Finally, the old standby.

One of my standard moves (especially but not only in open source) is to introduce a commit with a failing test for a bug I am trying to fix—and nothing else. Then a *later* commit can add the fix.

Test-driven design can also be really helpful, especially when you run it “outside-in”. It exposes coupling in your system, and coupling is one of the great enemies of robustness *over time*.

I also love a point Hillel Wayne made recently: You can *combine* testing with other method to get a much more robust piece of software than you could with either of the techniques alone. For example, if you *prove*—in a formal mathematical sense—that anything which holds for one input holds for some set of other inputs in your function, then you only have to test one input to prove that for all of them.


Net, when we add in benchmarking and property-based testing and all the other kinds of testing, we can work on the *behavior* of our software—which takes us to systems.

## Good software systems

A program has some *sequence* to it—even if a complicated, asynchronous one. Systems don’t. As Donella Meadows puts it:

> Systems happen all at once. They are connected not just in one direction, but in many directions simultaneously.
—<cite>Thinking in Systems</cite>

This can be hard to get our heads around, because software *construction* is the production of a static artifact, and because some of our best tools for making any individual software artifact are *static* tools (types, static analysis, formal modeling, and so on) it is easy for us to try to make the running system good by making it more static, and therefore amenable to those same kinds of tools. But—Meadows again:

> Resilience is not the same thing as being static or constant over time. Resilient systems can be very dynamic. Short-term oscillations, or periodic outbreaks, or long cycles of succession, climax, and collapse may in fact be the normal condition, which resilience acts to restore!
>
> And, conversely, systems that are constant over time can be unresilient.
—<cite>Thinking in Systems</cite>

So building good software systems means thinking about how the system behaves *dynamically* in time and space—including what happens when it breaks!

Because we cannot build systems that *never* break. Hard drives go bad, the network fails… a cosmic ray flips a bit in memory. No amount of formal modeling and domain-driven design and type rigor applied to the artifact itself can account for *everything* in the system. As one developer I know puts it: at the end of the day physics wins.

The question, then, is how well our artifacts can handle inevitable failures or unexpected conditions.

### Let it crash

Erlang’s model of “let it crash” is a very good starting point. Sometimes, the most robust system we can build is one full of software artifacts which know how to *stop* when things go wrong. “Shut it down and restart it” can help a lot by flushing out bad state.

### Handle crashiness well

Unfortunately, “just crash” can make things worse! We also have to make each component resilient when components around it fail. Otherwise, we end up in the situation Keunwoo Lee  describes:

> Your beautiful crash-only error handling strategy has nudged your system into a new equilibrium where the backend is continually receiving too much load. A local defect has been amplified into a global system outage. Even if you remove the crashing defect, the flood of retrying startup queries may persist as a [metastable failure mode](http://charap.co/metastable-failures-in-distributed-systems/) of your system.

Our systems should build in exponential backoff for retries and similar mitigations. (This might seem obvious to some of you, but I saw someone try to roll out a brand new system for core functionality at LinkedIn just a couple years ago without exponential backoff for its retries. It went badly!)

### What is the system doing?

We also need to be able to understand the behavior of our system in all its dynamic glory over time. That means we need visibility into that behavior.

If a system is increasingly unhealthy but no one knows it, the system can go from working to completely falling over in *very* short order. That’s exactly what happened with those memory leaks at LinkedIn: everything seemed fine… until the site was down. And fixing that problem involved a lot of experimenting: What happens when we make this change? Can the system support its real-world load if we do that instead? To do that, we needed way better observability.

Tracing and monitoring are not *sufficient* to building or operating stable systems, but they are *necessary* for both—and they are invaluable for diagnosing a broken system, and for keeping it healthy long-term.

## Programming as Theory-Building

So far, so good. We have some reasonably good ideas about how to create robust software artifacts, and we have gotten better at writing resilient software system that can work, or at least recover gracefully, in the face of the unexpected conditions of the real world.

But let’s look at `RequestData` again.


What state transitions are legal here? The code does not say. What’s more: Even if we *did* manage to encode all of that that (and I can show you how later)… why not a `NotStarted` state, or a `Retrying` state?

*Why did we choose this representation and not another?*


Presumably we have reasons, and we could document them somewhere… but even that can only do so much. Even when I worked on airplane software, in the most “waterfall” software process I have seen—even there, we did not write down *every* design decision. We couldn’t. There are too many.

Even just *commenting* every design decision would take an impossible amount of time. Why a `for` loop instead of a `.map()` call here? Is that load-bearing? Is it a performance optimization related to the specific version of the compiler used? Or is it just because I prefer imperative programming?

Many of these things just necessarily live in our heads.

Because when we build software, we have in our minds some model of the thing we are trying to do. That model is usually incomplete—it’s fuzzy around the edges—and it is usually implicit. Any attempt to make it fully explicit is always lossy.

Naur made this exact point in “Programming as Theory-Building”, all the way back in 1985!

> …the theory built by the programmers has primacy over such other products as program texts, user documentation, and additional documentation such as specifications… in at least three essential areas:
>
> 1. The programmer… can explain how the solution relates to the affairs of the world that it helps to handle.…
> 2. … can explain why each part of the program is what it is, in other words is able to support the actual program text with a justification of some sort.…
> 3. …is able to respond constructively to any demand for a modification of the program so as to support the affairs of the world in a new manner.


What’s more, while comments and design documents might help a bit, it’s not like design documents are *new.* On the *first page* of Naur’s paper, he writes:

> In several major cases it turned out that the solutions suggested by group *B* [(not the original authors)] were found by group *A* [(the original authors)] to make no use of the facilities that were not only inherent in the structure of the existing [program] but were discussed at length in its documentation.

*That* rings true. How many of you have carefully read all the source code and all the docs around some unfamiliar bit of code you were trying to add a feature to, and opened a change request… and had the people who knew the code say “Oh, no, that’s not how to solve this, you should solve it by doing *this other thing* instead”?

That happens because the authors know the intended structure of the program—but even when they *tried* to communicate it, that communication is somehow incomplete.

This is one of the reasons everyone hates working on “legacy code”—because “legacy code” actually  usually just means “code someone else wrote”… and therefore code I don’t have a mental model for.

(As an aside: if you want to “get good” at software, practice reading and working on “legacy” code. The more inscrutable the better.)


So: An `ARCHITECTURE.md` file is not the model. Comments are not the model. A five-hour YouTube video series walking through the internals is not the model. And the code is not the model. It is our best attempt to implement the model, but it is not the model.

The model is in our minds.

And it turns out this is directly related to what makes building good software hard.

## *Mētis*

When you are building something, you make a lot of decisions:

- to capture a business rule with an `enum` or a `struct`
- to use an `Optional` or to reject a missing value at the boundary of your system
- to use an interface, or to use a concrete type.

You could probably explain to a junior was sitting next to you: “Here’s why I chose this one this time…”

But. Could you write a *program to decide those things*?

Could you encode those decisions in an enum, or a chain of conditionals?


You could not. Nor could I. The knowledge is tacit; it is embedded in our experience; and even when we make it explicit, it remains *contextual*. It is often difficult to generalize. Even the heuristics we tend to share most confidently—“Don’t Repeat Yourself”—are contextual. They even get their own counter-aphorisms:

> Prefer duplication to the wrong abstraction.
—[Sandi Metz](https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction)

You *might* be able to come up with some set of rules, and encode them into some kind of decision tree, which other people could then follow mechanically. But we all know that the result of that **would not be *good software***.

That’s because, to quote Naur again:

> …if the exercise of intelligence depended on following rules there would have to be rules about how to follow rules, and about how to follow the rules about following rules, etc. in an infinite regress, which is absurd.

That is: the *decision* space is potentially infinite. It requires *judgment*.

In my experience, good judgment is *the* distinguishing characteristic of an actually senior engineer: Do we tackle this particular issue with a bit of process or a bit of code? Or do we judge it not a high enough risk to make *any* changes to our system, because the cost of those changes might be worse than the thing they are trying to prevent?

Seniority, in other words, is not just years on the job, but *growth in that kind of knowledge*.

This is what James C. Scott describes as *mētis*:

> …a wide array of practical skills and acquired intelligence in responding to a constantly changing natural and human environment.


This is a description of *what people do*, not just programming.

Scott’s classic example is how traditional farming communities knows not only when to let a field go fallow, but also what plants to put next to each other in that field when they till it again, what order to rotate the crops through year by year, how to plant something you would not *normally* plant when you notice a given crop having a problem…

This is not *just* the kind of thing people sometimes name as “folk wisdom”—things that local people know but scientific analysis has not caught up with (because every biome is a little bit different and would require decades of study to understand fully). Mētis *includes* that kind of thing, but it also includes things we all do—the things you cannot learn without doing them: the way you know how to stir the dough when baking bread, the way you know how to prop something on your leg while you swing open a door with your arms full of groceries, the way you know how to ride a bike!

And mētis is the kind of thing that bureaucracies—government and business alike—have had a bad tendency to stomp on, in the pursuit of *legibility*.

### Legibility

If some practice—some way of doing things in the world—is *legible* to you, you both understand and can articulate that practice. Most people’s own work and culture is fairly legible to them: they know how their world works. You can explain your design decisions to someone else on your team, for example.

The act of programming is—fundamentally, inescapably—an attempt to *systematize the world*: to make it *legible* to computer systems. That is *why* we use formal modeling and types and tests and domain-driven design. If we think back to the `RequestData` example from earlier—


—we can see that we are trying to make *our own* system legible to ourselves. It allows us to make our software artifacts more comprehensible, more malleable, more maintainable. Likewise for tracing and other forms of observability. It allows us to make our software systems more resilient and easier to operate.

So far, these are pure wins for anyone using our software. It just works better. That’s good—*unambiguously* good!

But legibility can also name the ability for a bureaucracy, a government, or—yes—a piece of software, to understand and categorize and “rationalizing” people’s practices. That can range from standardizing how people’s names work, to enforcing “scientific” management of forests (and thereby destroying them), to the destruction of local farming practices in the name of both Soviet communism and capitalist interventions in the 20th century—both in the name of “modernization”.


Stepping back, there are two ways we might approach legibility:

1. One is to *embrace* the fact that legibility is *limited*. Important, for pursuing some *good* goals! But limited.

2. The other is to try to force the world into a shape which is legible to us—smooth things out so they are regular and predictable and measurable and controllable.

### High modernism

That second path is where danger lies.

The desire to understand and improve the world—to raise people out of poverty, for example—is good. But it goes amiss is when it transmutes into a desire to *master* the world. That is what happens when we take the joy and goodness of scientific understanding, of tool-making, of building bigger things together than we could apart, and mistake those good things for *everything*.

The “high modernist” project was—and is—just such a twisted version of good ends. Scott describes it as:

> …a strong… version of the self-confidence about… the mastery of nature (including human nature), and, above all, the rational design of social order…


Or, as Donella Meadows comments in *Thinking in Systems*:

> People who are raised in the industrial world and who get enthused about systems thinking are likely to make a terrible mistake.… to assume that here, in systems analysis, in interconnection and complication… is the key to prediction and control.… because the mind-set of the industrial world assumes that there is a key to prediction and control.

If someone believes the world is amenable to control, indeed that it *should* be controlled—by them, of course!—, it is easy to justify doing all sorts of terrible things in the name of those good ends. Particularly: to “rationalize” things by eliding all the inconvenient local details.

And the high modernists had *power*. They could “rationalize” things without consulting the people affected. That meant that they missed out on an enormous amount of mētis—and *therefore* that they regularly ruined the lives of the people they were trying to help!

When you throw away generations upon generations of mētis about how the land works, at a minimum you will make a lot less money from the crops than you think you will… but at a maximum sometimes—horrifically—you end up with mass starvation. (That is not an exaggeration: it happened multiple times in the 20th century due to exactly this phenomenon.)

## Software *&* modernism

Now, again: legibility itself is good; it is *inherent in human life*. But as Scott puts it:

> The necessarily simple abstractions of large bureaucratic institutions… can never adequately represent the actual complexity of natural or social processes. The categories that they employ are too coarse, too static, and too stylized to do justice to the world that they purport to describe.


This is a potentially damning description of software artifacts and systems. It is hard *not* to build software like that!

For one thing, it is easy to forget how much we left out even of our *own* theory of the world in a particular set of design choices. Even in ‘purely software’ concerns like data fetching, we have *compressed* a great deal into just those three states.


So to build good software, we need to remember that programming is a kind of *lossy compression*. The “lossy” part is important!

Worse, it is easy to slip from the world of software, where we get to make all the choices, to the world beyond software (like that library example), where the choices are *not* ours to make—and not realize just *how much more* lossy the compression gets.

As John Salvatier put it in a memorable turn of phrase a few years ago:

> Reality has a surprising amount of detail.

The “edge cases” can be infinite, because the world is infinitely complex. That means it is *hard* to model with software!

We need that reminder because we are *constantly* tempted to indulge in the high modernist move. It is far easier—especially from the position of ascendancy software has at present—to force the world to fit our programs than to make our programs adaptable enough to fit the fuzzy edges of the real world and the real ways people work and play and live.

Concretely: It’s easy to define connection as simply good when you define it merely as the nodes in a social graph and fields in a database. It’s less easy when you realize that my local arts community and slavery are a kind of connection. “Connection” is too thin a concept to do justice to the differences between those. And yet that is what most social media graphs come down to. Mix in an algorithm that favors “engagement”—another idea too *coarse and stylized* to do justice to reality: hate-reading and delight are *not the same*—and you can end up with genocide.

I am not being cavalier when I use words like “slavery” and “genocide”. This kind of flattening and compression—this approach to legibility—is a real part of how we get trafficking of minors on Instagram, and a genocide in Myanmar.

Now, those two examples come from Meta, but I think they are mostly a function of scale. I think *most* companies working at the scale Meta is would have the same problems. Because mētis doesn’t scale. Legibility does not scale.

## Humility

As software practitioners, so our default answer to “Should we build this?” is usually “yes!”—especially if it involves some cool technical challenge. But we must—*must*—remember that with rare exceptions we are not building software for ourselves. We are building it for people out in the world, with their own goals, aims, interests, concerns. And most of the world is not, *and should not*, be about computing at all.

Listen: We software engineers *hate* it when capital-“M” Management tries to make us into interchangeable cogs. We hate it when people refuse to understand that building things just takes time. We hate it when the same person insists on rushing features out in a continual sprint and complains that it has gotten *harder* to deliver new capabilities and things are broken. We hate it.

So what gives us the right to do the exact same thing to other human endeavors?

^very. long. pause.

As software developers, we should sympathize, deeply, with other people whose fields are shaped deeply by *mētis*. The standing desire of management to regularize software development is the self-same desire as the high modernists who tried to impose a vision of regularity on crops and soil, shops and neighborhoods—and ruined all of the above in so doing.

As my friend, the architect Levi Wall, puts it:

> Disruptive logic often requires an oversimplification of a perceived problem.


We have to resist the temptation to make problems more “tractable” by flattening out the surprising detail of reality.

And we must be willing to push back against building software we have no business building, or in ways we have no business building. That is the difference demanded when we claim the title of ‘engineer’: a sense of responsibility for what we build, and therefore, sometimes, the refusal to build something wicked or foolish.

That will get you boxed out at some companies. It might lead you to quit a lucrative job rather than keep building something which is not good. But the only way we get to a world full of *good software* is by people like us consistently and indeed *insistently* asking:

**Is this software good?** Because if it is not, I *will. not. build it.*



### Ambition

That would be a depressing note to end on. So I’m going to leave you with a challenge instead: Let’s take all of that and look at it the other way around.

How do we build software which *serves* its users, rather than *subjecting them* to high modernism? In particular, how do we leave affordances in our systems for all the things we have not considered?

This is the underrated power of tools like spreadsheets: they are open-ended enough that you can do all sorts of ridiculous—incredible—things with them. Shove some macros into an Excel file and suddenly you’re using it as a database. As working programmers, we can often be really *bothered* by some of these approaches. They don’t scale, they are unmaintainable messes, they are kludges all the way down. Yes, yes, and yes.

But the person using a spreadsheet can do things with it the original creator never imagined: because spreadsheets are a sufficiently flexible tool to allow it. Whenever possible, we should be building software this way. We should be looking for how to make it possible for the users to put the tool to *many* purposes, some of which we will not think of.

Now, this is not trivial. Peter Naur (one last time):

> In including flexibility in a program we build into the program certain operational facilities that are not immediately demanded, but which are likely to turn out to be useful. Thus a flexible program is able to handle certain classes of changes of external circumstances without being modified.… **However, flexibility can in general only be achieved at a substantial cost.**

This is true. It is *particularly* true when we are trying to build *good* software: software which is robust and resilient from the outset ; software which respects the surprising amount of detail in reality; software that *reinforces* mētis; software which enables and empowers and elevates the people using it.

This is *hard*. Building a tool that allows many ways of using it, ways we have not even imagined, is much more difficult than building one that works in just one way. But we are all of us here today because computers themselves are just such a tool. And insofar as computers are part of nearly everyone’s world now, we owe it to them to build both hardware and software in ways that *afford room for mētis*.

That requires all our *rigor*: test-driven development and formal modeling and domain-driven design and type systems and tracing and monitoring and system design. It also requires *perseverance* for when we inevitably stumble along the way. And last but not least, it demands *imagination* to think of new ways to *apply* all that rigor to the endless strangeness and glorious illegibility of the world.

This is hard, no question. But that’s exactly what makes it a challenge worth pursuing.

## Thank you
