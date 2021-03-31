---
title: Keep It Local
subtitle: >
  Or: (part of) what “reasoning about your code” really means; being my EmberConf 2021 talk.
summary: >
  What do Steve McConnell’s variable scoping guidelines in Code Complete 2, pure functional programming, the data ownership system in Rust, classical object-oriented programming, the actor model in Erlang, and autotracking in Glimmer all have in common? Every one of them is aiming at the same key ingredient of robust, reliable software: the ability to “reason about your code.” But what does that actually mean?
qualifiers:
  audience: >
    Anyone interested in the theory and craft of software development.
  epistemic: >
    There are few things in software development I’m *extremely* confident about. This is one of them.
thanks: >
  This material is the fruit of many productive conversations with both [Ben Makuh](https://benmakuh.com) and [Chris Garrett](https://www.pzuraq.com) over the past several years, crystallized by the excellent questions the Flagship Web engineers at LinkedIn have asked me over the last year; and [Jaimie Krycho](https://jaimiekrycho.com) and [Yehuda Katz](https://yehudakatz.com) gave invaluable feedback on drafts and dry runs!
image: https://cdn.chriskrycho.com/file/chriskrycho-com/images/talks/keep-it-local-emberconf21.jpg
date: 2021-03-31T09:20:00-0600
featured: true
tags:
  - talks
  - public speaking
  - Rust
  - functional programming
  - JavaScript
  - TypeScript
  - software development
  - thinking
  - mental models

---

I’m delighted to present my EmberConf 2021 talk! Of any talk I have ever given, I am happiest with this one.

You may also find [the slides](https://slides.com/chriskrycho/keep-it-local-emberconf21) interesting. I have chosen *not* to embed them directly alongside the text for this talk, because the overlap between the content of the slides and the things I say is *very* high. It’s also worth noting that the content below is what I scripted for the talk, *not* a transcript; the YouTube video itself has an accurate transcript!

<figure class='embed'>

<div class='embed__wrapper'>

<iframe class='embed__content' src="https://www.youtube.com/embed/Mt7v-VbFjxk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

</div>

<figcaption><a href="https://www.youtube.com/embed/Mt7v-VbFjxk">Keep It Local</figcaption>

</figure>

## Introduction

Today, I’m going to start by telling you a story in three parts.

<a name='code-complete-2'></a>***Part one:***

When I started my first job in software, fresh out of college with a physics degree and some really terrible Fortran on my résumé, my new boss handed me two books to work through while I waited on government paperwork. One was Kernighan and Ritchie’s <cite>The C Programming Language</cite>: a classic, and if you get a chance to read it, I commend it to you—but it’s not that interesting for our purposes today. The other was Steve McConnell’s <cite>Code Complete 2</cite>.

There were a lot of good ideas in <cite>Code Complete 2</cite>, but the only one I really remember is: if you have some function, like this `doSomething` function which uses a loop to compute the sum of a range of numbers—

```js
function doSomething(anArg) {
  let i, total = 0, max, min;
  max = getMax(anArg);
  min = max < 100 ? 0 : 100;

  for (i = min; i < max; i++) {
    total += i;
  }
}
```

—then instead of declaring all of your variables at the top of a function, as I have here with `i` and `total` and `max` and `min`, declare them and initialize them right where you are actually going to do something with them, whatever that “something” is. Here, for example, we declare and initialize each of `max` and `min` right where we get their values, and we move `total` down to the loop which calculates it and initialize the counter *in* the loop.

```js
function doSomething(anArg) {
  let max = getMax(anArg);
  let min = max < 100 ? 0 : 100;

  let total = 0;
  for (let i = min; i < max; i++) {
    total += i;
  }
}
```

If you embrace this idea, it has all sorts of “knock-on” effects in your code structure, because it forces you to think about where something actually *should* start being used, what its ‘scope’ should be. McConnell points out that if you follow this rule, it’s much easier to make changes later. For example, it’s straightforward to extract the loop into its own function to build `total`:

```js
function doSomething(anArg) {
  let max = getMax(anArg);
  let min = max < 100 ? 0 : 100;
  let total = getTotal(min, max);
}

function getTotal(min, max) {
  let total = 0;
  for (let i = min; i < max; i++) {
    total += i;
  }
  return total;
}
```

It’s much harder to see how to do that in the original example. And this is a simple function! For more complicated functions, the problem is much worse.

<a name='rust'></a>***Part two*** of my story:

In the summer of 2015, I met my favorite programming language: Rust. As someone who had spent a huge chunk of my career working with Fortran, C, and C++, I loved its performance. But I also really liked its type system, which gave me niceties from functional programming languages like Haskell (and we’ll come back to that). But one of my very favorite things about it was (and is) its ownership model.

Rust’s ownership system—in type system terms, its use of “affine types”—is its secret sauce. It gives you memory safety like you would get in a language like JavaScript or C♯ *and* performance like C or C++.

This ownership model consists of a couple simple rules enforced by the compiler:

1. A piece of data always has one *owner*.
2. There is *no shared mutable data* in the system. It can be shared, or it can be mutable, but not both.
	- read-only data can be “lent out” (what Rust calls “borrowed”) to any number of functions and types which can read it
	- write-able data can only have one reference to it in the system: no reads, and only one writer.

Everything else in the language is a consequence of those rules. And while they’re conceptually simple, it’s not always easy to get your data into a shape where they cleanly follow those rules! But when you *do*, you end up with the amazing performance you want… even though you’re writing a language that mostly looks and feels like any other high-level modern language.

The key to the whole thing is that it *shrinks the scope where changes can happen*. There is no “shared mutable data” in the system, so you always know exactly where a piece of data might be changing.

<a name='pure-functional-programming'></a>***Part three*** of my story:

The same year I started learning Rust, I encountered another powerful idea: *pure functional programming*.

A pure function is a function which:

- only has access to its arguments—which means it:
    - cannot access global state
    - does not have access to *global* functions like `console.log`

    It can receive all sorts of things as arguments, including other functions, and it can *return* all sorts of things, including other functions—but its arguments are the *only* things it can work with.

- cannot *mutate* values in the system, period
    - not even its own arguments: it can only  hand back a copy with some transformation applied
    - not global state… because it doesn’t have access to it!

“Purity” here is like in chemistry, where a pure solution has nothing extra added in besides the ingredients you specified.

This has a number of benefits:

- Pure functions are stateless, and they never *directly* affect the rest of the system. In short: it’s just a straight line from input to output: given the same arguments, pure functions give you the same results—every time. So when you’re looking at a given function invocation, if it’s a *pure* function, you don’t have to think about anything anywhere else in the system to figure out what that function will do. You don’t even have to look at *local* state, because it doesn’t have any!

- You don’t think about mutation anymore *at all*, because there is none!

- Last but not least, you get a property called ‘referential transparency’, which just means that you could just replace calling the function with the value the function returns, and the program would behave exactly the same way. Think of it like math: anywhere you have “3 + 4” in any equation, you can replace it with “7” and it’s the same thing.

The result is that when you work on any given function, you can think about *just that function*! And when you’re using a language like Haskell or Elm or Idris which enforces functional purity *everywhere*, that applies to every single function in your program. Now, you might also wonder “But how do you *do* anything with that?” and that’s a good question, but suffice it to say there are answers, which they involve isolating those *effects* on the rest of the world. For today, though, I want to focus on a claim functional programming enthusiasts often make: that purity lets you “reason about your code” because it gives you these nice properties (and more). I think they’re right! But what is “reasoning about your code?”

## Local Reasoning

“Reasoning about your code” is understanding *what it will do* and *how it will do it*. And there are many things we want to understand about the code we write.

Some of them are the things we typically think about as “computer science” reasoning:

- What’s the algorithmic complexity—and therefore how will it handle large amounts of data?
- How much memory does it use—and so likewise, how will it scale to large amounts of data?

But there are others, too. For example, *what code do I have to change—*

- if there is a bug in it?
- if I need to improve its performance—including by tweaks around <abbr title="computer science">CS</abbr> reasoning?
- to make this do something *new*—to add a feature?
- to make it do something *different*—to change its feature?

And most importantly:

- Does this code work? Does it solve the problem it’s supposed to solve?

There are many tools and techniques we can use to think about these problems. But my thesis today is that if we want to understand our code along *any* axis, if we want to be able to answer any of those kinds of questions about our code, it helps enormously if we can reason *locally*. Or, as my wife put it when I described this idea to her: they let you *shrink the radius of things you have to think about*.

As different as those three ideas were, this is the common thread that ties them together:

- From McConnell and <cite>Code Complete 2</cite>: moving variable declarations to where they’re used lets us understand the loop by itself, and even extract it: comprehensibility and refactoring!

- From Rust: control over mutability lets us know where changes *can* happen to any given piece of data: comprehension, ability to refactor, and prevention of whole classes of bugs.

- From pure functional programming: purity and referential transparency let us ignore *all* the other functions in the system when we’re understanding this one: again, understanding this function, not introducing bugs in that function by changing this one, being able to extract a function or substitute its result without changing the program.

All of these improve our ability to understand our code—and therefore to work with our code—by making it easier to *reason locally*, to *shrink the radius of what we have to think about*.

## Case Studies

Now, if you’re feeling skeptical of my thesis, you might be thinking that I picked the handful of examples that happen to fit my narrative. I’m not! Improving local reasoning may be the closest thing we have to a “holy grail” in improving software quality. We've been chasing it for decades; it’s the foundation of several whole programming paradigms.

### Structured Programming

<a name='go-to-statement-considered-harmful'></a>Let’s start with Edgar Dijkstra’s 1968 paper “Go To Statement Considered Harmful”. He opens by arguing that 

> …our intellectual powers are rather geared to master static relations and… our powers to visualize processes evolving in time are relatively poorly developed. For that reason we should do (as wise programmers aware of our limitations) our utmost to shorten the conceptual gap between the static program and the dynamic process, to make the correspondence between the program (spread out in text space) and the process (spread out in time) as trivial as possible.

Notice here—this is exactly the same idea as *local reasoning*! We’re trying to…

> shorten the conceptual gap between the static program and the dynamic process, between the program… in text space… and the process… in time…

He traces this out in terms of the *coordinates* we use to describe the progress of the program, and specifically of the process the program represents. Those coordinates are textual markers (like line numbers!) or dynamic indexes in contexts like loops.

But, Dijkstra points out, no matter what *other* systems we have in place to help us reason about our program—variable names, control structures like `if` blocks and `while` loops, etc.—if we use `GOTO` statements throughout our program, those other tools break down.

What is the value of a while loop’s control index? Well, if you include `GOTO` in your toolbox, it depends on *everything else* that has happened in the flow of the program that led to that point—possibly including things *after* that loop in the text of the program! But if you *don’t* have `GOTO` statements, you can know that it represents exactly what it looks like when you read it. In other words, `GOTO` is a problem precisely because it completely defeats the other tools we have to make it possible to *reason locally*.

This isn’t a merely theoretical or purely historical concern for me—something from back in the 1960s. I mentioned earlier that I spent the years before I discovered Rust writing a mix of programming languages including Fortran and C. Several of those Fortran and C codebases made liberal use of `GOTO`, and, well, spoilers: Dijkstra was right: it was incredibly difficult to “find a meaningful set of coordinates in which to describe the process progress.”

The first task I did on those programs was slowly and laboriously reworking every one of those `GOTO` statements into actual functions and loops and so on. Doing that was extremely difficult and extremely error-prone. Sometimes I had to understand literally the whole program to be able to make any changes at all! But once I had done that hard work and gotten rid of `GOTO`, I could make further changes and improvements much more easily—because I knew much better what could cause changes *right here*, and what could *not*.

So replacing `GOTO` statements with structured programming  enables “reasoning about your code” by shrinking the radius of thought for *control flow*. Understanding how a conditional behaves no longer requires *global reasoning*, thinking about “the entire flow of the program”. Instead, you can reason *locally*: what an `if` block does can be understood simply by reading that one block.

<a name='global-mutable-state'></a>This is also the foundation of another rule most of us learn early: to avoid shared global variables. Global mutable variables have the same kind of problem as `GOTO` statements: to understand how a given piece of data can change over the life of a program, you have to read *the whole program*. Global variables can seem easier than explicitly passing around data when you’re first authoring a program… but explicitly passing around data means you can actually know where the data can be changed.

Even when you still have shared mutable state, reducing the scope of the sharing from *anywhere at any time* to *in these places at these times* shrinks the radius of what you have to think about.

### Object-Oriented Programming

<a name='encapsulation'></a>This is also one reason Object Oriented Programming emphasizes the idea of *encapsulation*. In a purely procedural program, where you just have a piece of data that is handed around and changed willy-nilly, you have to think about every piece of the system which interacts with it—every function you pass it to. If, on the other hand, data is wrapped up in an object which does not expose its internal state, and only exposes a handful of specific ways for outside callers to interact with its state, then even passing it to a function doesn’t allow arbitrary transformations of the data anymore. Only what your public methods allow. Now you can reason about methods! The thinking radius shrinks again.

<a name='solid'></a>And in fact, this goes for *many* of the principles we associate with good object-oriented design. Take the <abbr>SOLID</abbr> principles, for example, which are all about how we can design interfaces to improve maintainability:

- First, the **Single Responsibility Principle:** This one is perhaps the easiest to connect to the idea of local reasoning. When each object has just one responsibility, then when you’re looking at it you don’t have to think about *other* responsibilities in the system—and when you’re looking at other objects, you don’t have to concern yourselves with the details of how you manage *that* responsibility.

- The **Open-Closed Principle** says that objects should be “open for extension but closed for modification.” In other words, you should be able to add new functionality to a given type, but you shouldn’t be able to reach in and muck with its guts. When you’re working on the internals of a class built this way, you don’t have to care about what extensions are doing—and vice versa: extensions not only shouldn’t but at best *cannot* muck with and therefore cannot care about internals.

- The **Liskov Substitution Principle** says you ought to be able to use a subtype of a given type anywhere you can use the type itself. So if a function accepts an `Animal`, you should be able to pass a `Cat` to the function. Upholding this principle means we don’t have to care about implementation details of subtypes! 

- The **Interface Segregation Principle** says you should have lots of small interfaces specific to things which use them, instead of one giant blob interface which handles every possible interaction. If I only need one method, why should I have to care about 235 other methods other clients might need? Interface segregation means I *don’t* have to care about them!

- Finally, the **Dependency Inversion Principle** says that you should not depend on a specific class to handle a responsibility; instead, you should depend on an interface—whether that’s implicit as in JavaScript or Ruby, or explicit as in TypeScript or C♯. This forces you to rely on the intended contract, rather than on implementation details—and it even lets you swap out implementations of the interface, like we often do in tests!

### Other Disciplines

<a name='actor-model'></a>So we’ve seen that structured programming, object-oriented programming,  pure functional programming, even an ownership system like in Rust: all improve local reasoning. So do cross-paradigm approaches like the actor model—especially as you find it in Erlang and Elixir. In the actor model, we build systems out of many small “actors” which can pass messages to each other, and perhaps most importantly which can crash and recover independently from each other. That’s key because it forces you to design each piece of your system to be tolerant of faults elsewhere in the system. But another way of thinking about fault tolerance is: not having to *worry* about faults elsewhere in the system, because *this* actor isn’t coupled to *that* one.

<a name='types'></a>Another interesting tool for local reasoning is *types*. Let’s look at a small example from TypeScript.

We’ll start by defining a `User` class, which has a handful of properties: the user’s name, age, email, state of residence, etc.:

```js
class User {
  constructor(
    name: string,
    age: number,
    email: string,
    state: State,
  ) {}
}
```

Now let’s say we want to describe the user, just in terms of their name and age. We could write a `describe` function which accepts a `User` and returns a string built with the user’s name and age:

```js
function describe(user: User): string {
  return `${user.name} is ${user.age} years old`;
}
```

This works! But it has a downside: when I call `describe(someUser)`, I have to assume that `describe` might care about emails and states! What’s more, if `describe` were a bigger or more complicated function, it could end up *accidentally* depending on details of the `User` class. In both cases, the fact that we have a whole `User` means we have to keep more in our heads.

Now, TypeScript is a *structurally-typed* language, which means it only cares about the *shapes* of the objects you hand it. With `describe` for example, we can work with *any* object which has a `name: string` field and an `age: number` field:

```js
function describe(person: { name: string; age: number }): string {
  return `${person.name} is ${person.age} years old`;
}
```

We can still pass a `User` to this, because it has those fields—but we’re no longer *asking* for a whole `User`, with the `email` and `state` fields we don’t use need! And by doing this, we’ve improved our ability to reason locally:

- `describe` doesn’t know anything about `User`s, just a `name` and an `age`
- callers can pass a `User` or anything else which  meets the contract without worrying about whether other details of `User` will be used

Once again, we’ve decreased coupling; we’ve shunk the radius of thought.

### Autotracking

<a name='autotracking'></a>For our last case study, let’s look at the Glimmer autotracking system. With autotracking, we use the `@tracked` decorator (or, occasionally, the primitives it’s built on) to wire up pieces of data in our system to the reactivity layer: primarily the template layer, but also other reactive functions in our system. Other than some tools for backwards compatibility with classic Ember, autotracking is the *only* way to introduce reactivity into the system.

This is a significant difference from Ember classic as well as other observer-based systems. For today, I want to emphasize two differences in particular:

1. First, in Ember classic, the combination of dependent key observation and two-way binding meant anyone could *make* any piece of data in the system reactive. This made it impossible to know where a given piece of data was updated without reading *all* of the code which referred to the object at all. It also meant that reactivity was not a function of the data, but a function of who *used* the data, and how. I would say that this is the definition of defeating local reasoning about reactivity, except that the second piece was even *worse*!

2. That second problem was observers. An observer, like a computed property, could be triggered by changes to *any* data in the system… but then it could also go trigger *further* updates to state, or perform arbitrary tasks, or do… anything. With Ember’s classic observers system, it was impossible to know what all you were kicking off with a single `this.set`. Infamously, you could pretty easily get yourself into infinite loops where one `set` could trigger an observer which triggered another `set` and so on forever. What’s more, this wasn’t limited to explicit use of observers: the classic lifecycle hooks like `didReceiveAttrs` had exactly the same kinds of issues. And again: the only way to know was to read through every single place that the data was used in any way (direct or indirect). Good luck! 

When combined with stricter one-way data flow rules for Glimmer components, autotracking dodges both of these:

1. First, the owner of data is in control of reactivity. If a given piece of data is not `@tracked`, it isn’t reactive—period. This means we don’t have the problem of arbitrary consumers being able to make something reactive just by marking it with a dependent key. This makes it *much* clearer where and how reactive data can change—usually in just one place! 

2. Second, by removing observers and observer-like lifecycle hooks like `didReceiveAttrs`, and enforcing one-way data flow, we actually end up with many of the benefits of pure functional programming. We can no longer easily trigger arbitrary side effects in response to changes in reactive state. Nearly everything “downstream” of tracked data is simply a pure function of that data—whether that’s in native getters in JavaScript or in helper or component invocations in templates. For the cases where we *need* to do imperative or event-based work, like DOM APIs, we push that into modifiers. This means we no longer have to worry about arbitrary cascades of state changes getting triggered by a single update in our system. 

To return to two of my opening examples:

- Where Rust improves your ability to reason locally about mutability, autotracking improves your ability to reason locally about *reactivity*.
- Pure functional programming makes you isolate *mutation* in your system and gives you referential transparency in return; autotracking makes you isolate *reactivity* and then similarly gives you referential transparency elsewhere in return.

## Summary & Conclusion

So to sum up: one of the key aspects of “reasoning about your code” is the ability to reason *locally*. If I can understand *everything* about how a given piece of code behaves without reference to some other part of the program over there, then I can—

- fix bugs in this part of the system
- improve the performance of this part of the system
- refactor the internals of this part of the system

—and be confident: first, that I am not breaking things elsewhere; and second, that things elsewhere aren’t going to break this in ways that are invisible here.

And the history of software development, as we’ve seen today in brief, is in no small part a history of gathering techniques and creating tools which allow us to *reason locally*—better; and thereby to reason about our systems—better. That goes from “Go To Statement Considered Harmful” to affine type systems, and from the actor model in Erlang and Akka to Ember’s autotracking.

There’s no silver bullet here (or anywhere else); this is not the only good idea in software; and this is not the only way to improve our ability to “reason about our software”. But it *is* a profoundly useful idea, as those many connections show. So hopefully, sometime soon, we’ll find yet another way to shrink the radius of thought—to make our software more robust *and* more flexible, easier to write *and* easier to maintain.

Keep it local!

Thank you!

<div class="callout">

Thoughts, comments, or questions? Discuss on [Hacker News][hn] or [lobste.rs][l], or [send me an email](mailto:hello@chriskrycho.com?subject=Keep%20It%20Local)!

[hn]: https://news.ycombinator.com/item?id=26651020
[l]: https://lobste.rs/s/df9dzp/keep_it_local_part_what_reasoning_about

</div>
