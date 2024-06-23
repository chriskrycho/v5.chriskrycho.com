---
title: The Cutting Edge of Versioning (LambdaConf 2024)
subtitle: >
    Semantic Versioning, library & framework evolution,
    programming language design, type systems, and you.

date: 2024-05-06T15:24:00-0600
updated: 2024-06-26T09:40:00-0600
updates:
    - at: 2024-06-26T09:40:00-0600
      changes: >
        Added a video embed with the recording of the talk.

tags:
    - public speaking
    - software development
    - talks
    - type systems
    - Elm
    - Ember
    - Rust
    - Semantic Versioning
    - TypeScript
    - Unison
qualifiers:
    context: >
        Today I gave the first of two talks at LambdaConf 2024. This one was particularly born out of [the work I did on SemVer for TypeScript types](https://v5.chriskrycho.com/elsewhere/semver-for-ts-types-beta/) and the work I did to [put Ember on a regular upgrade cadence](https://github.com/emberjs/rfcs/pull/830). The rest of this post consists of the slides and the script I wrote for the talk. I will add a post to my feeds when the video is up!
    audience: >
        Software developers

---

<figure class='embed'>

<div class='embed__wrapper'>
<iframe class='embed__content' src="https://www.youtube.com/embed/0Pyyy-BAIYQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

<figcaption><a href="https://www.youtube.com/watch?v=Mt7v-VbFjxk">The Cutting Edge of Versioning</figcaption>

</figure>

Here are the slides:

<figure class="embed"><div class="embed__wrapper">
<iframe class="embed__content speakerdeck-iframe" src="https://speakerdeck.com/player/a68bcf9849ce456a8ca86f93f7ffb7f4" title="The Cutting Edge Of Versioning (LambdaConf 2024)" allowfullscreen="true" data-ratio="1.7777777777777777"></iframe>
</div>
<figcaption>Slides for the talk</figcaption>
</figure>

And if you like, you can read the talk as I prepared it. (Note that this is a *script*, not a *transcript*, so you will note some differences from the video above!)

# The Cutting Edge of Versioning

## Introduction

Hello! I’m Chris Krycho, and this is “The Cutting Edge of Versioning”.

Briefly—

### About me

I have been writing software professionally for the past 15 years, and have done everything from writing avionics software to serving as the tech lead for LinkedIn’s desktop web app. As part of my work at LinkedIn, I spent a *lot* of time thinking about versions and how they affect ecosystem evolution, and especially how that intersects with programming languages, frameworks, and libraries.

So let’s get into it!


### Key points

When we come out of here today, I want you to have a better answer to three questions:

- What is versioning?
- What does it look like to take versioning seriously as a kind of programming?
- What should you be doing as a programmer who is *using* versioning?

# What is Versioning?

The answer, and the basis for the entire rest of the talk, is:

**Versioning is a *communication tool*.**

Specifically, it is a tool for communicating that something has changed:

- Did it get some new features?
- Does it add support for my operating system version?
- Did it fix that annoying bug that costs me time and work?

In short: “Does the upgrade get me something?”

Which leads to: “Am I willing to pay for it?” That might be actual money (for an app), or it might be the engineering cost for a library or tool upgrade.

# Versioning Strategies

So how might you use versions to communicate what you are getting and what it costs? Let’s look at some versioning strategies, including the tradeoffs with each.

## SemVer

The big one, and the *de facto* standard for much of the past decade and change, is Semantic Versioning, SemVer. Many of you are probably familiar with it, but I want to make sure we’re on the same page. In SemVer, you have a version specifier with five “slots” of information in it:

- Major version
- Minor version
- Patch version
- And optionally, pre-release and/or metadata at the end

So version `5.2.3` is major version 5, minor version 2, patch version 3. If it were  `5.2.3-beta.1+fun`, it would be a `beta.1` *pre-release* of that same version, with some additional `fun` metadata.

None of that was original to SemVer. Lots of people had used versioning schemes like that for years. So what was new?

1. First, SemVer codified those *terms*: major, minor, patch, etc., and that was a big win. Giving people common language to talk about things makes communication easier.

2. Second, SemVer gave *semantics* to those terms (thus the name):
	- “Patch” means *only backwards-compatible bug-fixes*.
	- “Minor” means features or deprecations, and maybe backwards-compatible bug-fixes
	- “Major” means breaking change, and maybe features, deprecations, or backwards-compatible bug fixes.

Now, a lot of the talk is going to be about the nuances of this scheme—and specifically: What is a breaking change? Does it count if the published API did not technically change, but the observable behavior of the system *did*, and maybe in a really meaningful way? Are the basic performance characteristics of a given API covered? For example, if a particular collection data type has always provided $O(1)$ access to items, and now it provides $O(n)$ access instead, it’s hard to say that *isn’t* a breaking change… but if you didn’t promise it explicitly anywhere, maybe it isn’t *technically* public API and maybe you can argue that people should not have been relying on that property?

The big challenge with SemVer is the semantics. You end up arguing about whether something is a breaking change or not! If you have been around a community which takes SemVer seriously and also has a sense of humor, you might have heard the phrase “SemVer lawyering”.


## SoloVer etc.

This has led a fair number of people to bail on SemVer. Skip the arguing and just increment the number! One, two, three… that’s it. As [SoloVer](https://beza1e1.tuxen.de/SoloVer) puts it:

> We intentionally do not try to communicate "backward compatibility" as there is no objective and satisfying definition anyways. As a provider, you should document changes properly. As a user, you should test anyways.

Despite emphasizing that they have just one number, many of these proposals include room for “additional metadata”. SoloVer allows “postfixes”, for example, so that you can release `1-beta` and `1-beta2` and so on. Major-minor-patch emerged for a reason: it communicates something!


## CalVer

Another approach is: use the release date. There are a lot of variations on this, but most commonly: four-digit year then two-digit month, or two-digit year then two-digit month, so `2024.05` or `24.05` for May 2024. Usually, these also allow patches, so you could have `24.04.1`, `24.04.2`, etc.

I see a lot of apps use the four-digit year approach; Ubuntu uses the two-digit year approach; and the upside is that release dates are really useful. The downside is that you lose a lot of the information SemVer tries to convey. What kinds of changes are in `2024.05` compared to `2024.03`? Check the release notes.


## Just count to 9!

One other variant floating around out there is what I call the “Just count to 9” strategy, or “TypeScriptVer”. Start at 1.0.0, and increment the minor version, from 0 up to 9, and then start over; but use patch versions like SemVer does. So 1.0, 1.1, … 1.8, 1.9, 2.0, but you can also have 1.1.4 and 1.2.2 and so on in between.

On its own, that’s perfectly compatible with SemVer: it just means breaking changes come at predictable intervals. That seems good, actually!

But TypeScript introduces breaking changes in “minor” releases like 3.5.0. In some random ecosystem, that might be fine, but TypeScript lives in the npm ecosystem, where all the tooling assumes Semantic Versioning. Ugh.

Why does TypeScript do this?


### TypeScript

There are two big reasons TypeScript uses this versioning scheme, at least from what the team has said publicly:

- One is **Marketing.** Someone higher up the chain at Microsoft wanted them to go from `1.9` to `2.0` for marketing reasons.

	Fine. It’s hard to fund programming language development. I am fine with this. And again, it’s not a problem for SemVer.

- The other is **Philosophy.** The TypeScript team does not believe SemVer makes sense for compilers. They argue—not incorrectly—that basically any change made to a compiler breaks someone. And *therefore*, they make breaking changes in what the rest of the ecosystem thinks of as minor releases.

	This one is more interesting. It is in some non-trivial sense *true*… but I am not persuaded, and I think this is a perfect place to stop and talk some more about philosophy.


## Hyrum’s Law

Let’s take a little detour, through Hyrum’s Law, from Hyrum Wright at Google:

> With a sufficient number of users of an API,
> it does not matter what you promise in the contract:
> all observable behaviors of your system
> will be depended on by somebody.


This is exactly what the TypeScript team is getting at. Basically any change they make makes someone’s code somewhere stop type checking. That includes some “bug fixes”, since those often mean the type checker was missing cases. It also includes a lot of “features”: TypeScript is types for JavaScript, which is full of shenanigans. Every time TypeScript adds a new strictness setting, like checking for nullability throughout your codebase, everyone who upgrades to that release suddenly sees a whole bunch of new type errors. Arguably, they were there before, just invisible—but now your code won’t compile.

Compilers for gradually typed languages are a particularly pathological case of this, but it happens everywhere. LinkedIn.com is a very large (couple million lines of code) Ember.js app, and although Ember tries to be really good about backward compatibility, whenever we would do an Ember minor version upgrade… 20,000 out of our 30,000 tests would break. Every. single. time.

Inevitably it was things like “we accidentally relied on the order these two *internal* async framework functions resolved in… and that changed. Now we need to figure out how to make the app use the new behavior.”

### “a sufficient number of users”

Also: Hyrum’s law says with “a sufficient number of users of an API”. The problem is: “sufficient number” is very, very low. Probably tens or dozens of users.

The software developers using your library just *do* use it in ways you will not expect, and there is no getting around that. We had hundreds of engineers making hundreds of changes a day on that big Ember app at LinkedIn. It’s easy to see how it happens there. But it also happens in the little TypeScript library a friend and I maintain, with its 2,340 lines of code—including tests. Internal refactors I thought were 100% backwards compatible minor releases… inevitably immediately had issues opened on how they broke someone’s code with our dozens of open source users.

So Hyrum’s Law is real. But that doesn’t mean we have to give up on using versions to communicate semantics.

## Versioning is a communication tool

That is because, again: **Versioning is a *communication tool*.**

SemVer is about communicating *what kinds of changes* happened in a given version. CalVer is about communicating *when* the version happened.  TypeScript is communicating… the decimal system?

This is the key issue.

When the TypeScript teams chooses to use the same numbering system to communicate something different from *every other package* in the ecosystem, that causes confusion! How could it not? It is as if I decided to use the word “blue” to mean “green”, and you now had to translate it mentally every time you heard me say “blue”.

But I think their philosophical point also misses something important, about the *kind of communication* that SemVer represents. Namely: it is a contract.

# Versioning as Contract

Contracts are communication tools which are designed to deal with these kinds of ambiguities. Contracts have their own issues, but they give a way to clearly articulate and even adjudicate challenging situations.

**Versioning is a *socio-technical contract*:**

- It is not purely social, and it is not purely technical. It sits squarely at the intersection of the two: people *and* computers.
- It is a contract. It is usually an *implicit* contract, and it is usually both communicated and enforced socially rather than technically, but it actually *just is* a contract. You can tell because when you break it, your users get really, really mad!

	So whatever versioning strategy you choose… *tell your users* what the contract is so they don’t think you have promised things you don’t intend to promise.

Partial credit to the TypeScript team here: Their contract is clear. And it could work reasonably well in a vacuum. The problem is… they’re not in a vacuum, and their contract works badly with the rest of the npm ecosystem.

Even more fundamentally, though: they don’t *have* to do this, even on their own terms.

TypeScript could say: *catching errors we did not catch before* is a bug fix; *adding new strictness settings* is a feature, *opting you into new strictness settings*—bundling them into `strict: true`—or *changing type inference* is a breaking change. That would be it. Everyone understands that bug fixes can “break” your code, and everyone *also* understands opt-in changes and updating defaults at major versions! Would this be harder, sometimes? Yes. But it’s *doable*.

This goes for Hyrum’s law more generally. As we have seen, the “law” is true! But that does not necessarily have particularly bad consequences outside a Google-style monorepo. Instead, you articulate your policy clearly and you do your best to live by it, and you deal with the hard cases when they come up, it mostly just works. More than that, it is really important to remember that in versioning as in the legal system, “hard cases make for bad law”!

To say that versioning is a *socio-technical contract*, then is to get specific about what *kind* of communication is happening with versioning. Not merely social, not merely technical, and—at its best—not merely some kind of vague hand-wave, but an actual contract… and one that involves both humans and computers.


# Versioning as Programming

But that’s just programming! When we write any program, we are both encoding instructions for the computer to execute and writing down something for another person to understand—even if “another person” is just ourselves.

So: **What does it look like to take versioning seriously as a kind of programming?**


## The rules

It means, at a minimum:

1. Defining the your versioning system in a machine-readable way. Everything we have seen so far does that.
2. Give semantics to that machine-readable format. (So: SemVer. Other versioning schemes can only communicate that semantic information via “side channels” like release notes.)
3. Map changes in your code to those semantics—particular, breaking changes. (This is the hard part! So let’s talk about it.)

### The shorthand

To start with: a good shorthand for “what is breaking?” is Postel’s Law, from the early days of designing TCP:

> Be conservative in what you do, be liberal in what you accept from others.


### The  mental model

If we apply that *over time*, we end up with a set of rules roughly like this:

| Non-breaking                     | Breaking                           | Reasoning                                                                                                                                                                                                                                                                                                                                                                                                      |
| -------------------------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Accept a looser set of input     | Requiring a stricter set of inputs | If I have a a function which used to require you to provide a number between 1 and 100, and now it allows all positive integers, that’s fine. All existing calls still work, and some new calls do, too. But if I used to let you give me any number, and now I blow up if you give me anything outside that range, that’s a breaking change.                                                                  |
| Provide a stricter set of output | Providing a looser set of outputs  | If I have a function which used to be able to *return* any integer, and now it only returns something in the range from 1 to 100, all the existing code which could handle *any* integer will still work. But if my function used to promise only to return positive integers and it now returns zero and negative integers too, any code which relied on the value being positive and non-zero can be broken. |
| Add entirely new APIs            | Removing existing APIs             | I can also usually add a brand new function, method, etc. to my public API. In most languages, no one can get broken by this unless they were doing some shenanigans in the first place. On the other hand, if I *remove* an API, that breaks whoever was using on it.                                                                                                                                         |
[Breaking vs. non-breaking changes]

But as I put it at [semver-ts.org](https://semver-ts.org):

> Note that this summary elides many important details, and those details may surprise you!


## Checking the contract

Now: How can we programmatically *check* that versioning contract?

So: SemVer.


## Vibes

The default mode here is not to check. As I heard Richard Feldman and Louis Milford say a while back, versioning is just *vibes*. And that might sound pejorative, but if versioning is solely about communicating with humans, then whether something is a breaking change or a bug fix is a judgment call, and that judgment is often going to be a reflection of *how it feels*. Because, going back to Hyrum’s Law, someone code *is* going to stop working when you fix that bug.

I don’t find this particularly satisfying, though. Treating versioning as a contract motivates me to be more precise, it makes me want to build tools which I can use to help with that. Granted that they’re never going to be 100%, we can do a  lot better than just “vibes”.


## Tests

The first communities I am aware of to really take SemVer seriously were Ruby and Node, and in both ecosystems there was and is a fairly heavy emphasis on testing, in part because they are using dynamically typed languages.

If you have a reasonably well-specified public API, and you have extensive test coverage for that public API, the act of changing your tests *always* tells you something:

- Adding tests usually tells you that you fixed a bug *or* added a new feature.
- Removing tests usually tells you that you removed a public API.

And for all the ambiguity inherent in the general case for the “bug fix or breaking change?” question, it actually is fairly clear *most* of the time in individual scenarios. “Oh, we dropped one of the overload signatures for this function! That’s a breaking change.”

The other thing that using tests can *help* with is some of the kinds of things which are not part of the *signature* of an API but may be part of its *contract*. If you have performance testing integrated, you can validate that $O(1)$ operations stay $O(1)$ and do not become $O(n)$ on accident. If you have good end-to-end/integration-style tests, you will have an easier time catching the kinds of subtle timing changes between different parts of the framework that often made things difficult for us in the Ember app at LinkedIn.

As with testing in general, you only get coverage for the parts you explicitly test. But, if you’re the kind of maintainer who *cares* about this, you probably already write tests for your public API. That gives you a ton of mileage.

But notice that while this provides *feedback* about the changes you are making, it does not actually let you *program* against those changes very easily. You could do some, maybe—but not much.


## Types

Types, on the other hand, are a great tool for versioning because the whole reason they exist is to communicate the contract for a given piece of code, both to humans and computers. And that’s exactly what we’re asking versions to do with SemVer! So let’s talk about the state of the art for using types to communicate SemVer.


### Elm

Elm does something wonderful: When you attempt to publish a new version of a package to the Elm package repository, the package manager runs the compiler against the old and new versions of the code, and uses that to determine what kind of change it might be. If you added a new API, it will require you to use a minor version; if you remove or change a type, it will require you to use a major.

Note, however, that  Elm’s checks are *purely* at the type level. As I noted a minute ago, that is *necessary* but not *sufficient*. Behavioral changes can also be breaking! Elm cannot catch that for us, though of course we can still do a major bump *manually*.

This highlights something important: Type-based enforcement is *necessary* but not *sufficient*. We do actually need tests to answer certain kinds of questions. As usual, it is not types *vs.* tests. Rather: use each for the thing it helps most with.

With that important caveat in place, let’s see some other languages!


### Rust

Next up: Rust, which *also* takes SemVer really seriously. Its package manager, Cargo, bakes SemVer constraints into its version resolver. The Cargo team has also documented—in almost 10,000 words of detail!—all the ways that you might end up with breaking changes.

![Note the tiny scroll handle!](Cargo%20SemVer%20guide.png)

Unlike Elm, it does not have language-level awareness baked into Cargo… *yet*. Thanks largely to the tireless work of Predrag Gruevski, though, that has been changing. He built a tool called cargo-semver-checks, which provides a Cargo subcommand that checks your project for what kinds of changes you have made.

Covering all the material in the Cargo book is taking a while, though, because it turns out that these kinds of things can be *really* tricky. For one *relatively* straightforward example (because we don’t have time for the really complicated ones!), if you have a `struct` with all public fields:

```rust
mod example {
    pub struct Person {
        pub age: u8,
        pub name: String,
    }
}
```

…and you add a private field:

```rust
mod example {
    pub struct Person {
        pub age: u8,
        pub name: String,
        id: Uuid,
    }
}
```

…this is a breaking change! In the first version, it was legal to write code that constructed the type directly in some other module:

```rust
let me = example::Person {
    name: String::from("Chris"),
    age: 36,
};
```

Once you add the private field, you are going to have to change it to some a module-public constructor or something like that, because you *cannot* name the `id` field outside the module which defined it. Things get a *lot* hairier than this when you start thinking about other parts of Rust’s type system: how do generics, lifetimes, and module scopes interact? `cargo-semver-checks`  is increasingly capturing those things. But it’s hard because it’s complicated!

It’s also hard is because it is kind of “bolted on”— to Rust’s documentation infrastructure, actually. In Elm, the package manager understands how to run the compiler to answer these questions directly. Elm could do that because the compiler and package manager were written by the same person and he could… *just make it do that*, whereas in Rust’s case there are a lot more contributors involved, and questions around public APIs, and so on.

Also, though, Elm is a *tiny* language compared to Rust. It’s way easier to figure out what all you have to cover. You don’t have to worry about mutability, or reference lifetimes, or traits, or associated types, or….


### TypeScript

And it turns out this generalizes: the more complicated your type system is, the harder *checking* SemVer gets. Because every interaction between type system features can change what is breaking and what is not. I learned this the hard way when I wrote a SemVer spec for TypeScript.

![](semver-ts.org.png)

Here’s just one of the challenges:

1. JavaScript’s collection types, like Arrays, are all mutable by default, and they’re hard to make *immutable*.
2. TypeScript has local type inference.
3. TypeScript has untagged union types, like `string | number`.

When you put these things together, it… basically breaks the heuristic I taught you earlier.

Consider this function:

```rust
function example(): string | number;
```

When we use it to construct an array, we end up with an array of that same type, `Array<string | number>`, and that array itself is mutable, so we can `.push()` both the number `123` and the string `"hello"` into it:

```ts
let myArray = [example()];   // Array<string | number>
myArray.push(123);           // ✅
myArray.push("hello");       // ✅
```

Now, in the mental model I gave you earlier, changing `example()` to only return a `number` *should* be fine.

```ts
function example(): number;
```

Everything “should” still work, because we returning a subset of what we returned before. But inference means that `myArray` is now just an `Array<number>`… which means that second `.push()` call no longer type checks.

```ts
let myArray = [example()];   // Array<number>
myArray.push(123);           // ✅
myArray.push("hello");       // ❌ string not assignable to number
```

These kinds of interactions are pervasive in TypeScript’s type system—and again, this is a simple example; there are much gnarlier ones—so… there are basically *no* API changes you can make in TypeScript code which are guaranteed to be backwards compatible all the time.

The suggested workaround we came up with for this specific case is: if you don’t want to be broken by changes like this when libraries make otherwise-“safe” updates, be explicit yourself about what you want that type to be:

```ts
let myArray: Array<string | number> = [example()];
```

This kind of stinks! But it’s indicative: the more things your language allows, the more any attempt to rigorously *check* your versioning is going to be difficult.


### Unison

Unison is a functional programming language with a *boatload* of interesting ideas: effect systems, distributed computing, and more. The relevant bit for our purposes today is: Unison code does not get stored as plain text. You *write* it as plain text, in a normal text file, but you also run the Unison Code Manager `ucm`, and when you tell it to `add` your definitions, it does most of the same things other programming languages do during compilation, including type checking and code generation, but it *also*:

1. generates an AST from your text (which is normal),
2. normalizes that AST into a canonical form (which is not normal),
3. *hashes* that AST (which is really not normal!),
4. and saves the normalized AST, with its hash, to an SQLite database.

What that means is that when you *reference* some definition, you normally reference it by name—but under the hood Unison is mapping that name to the corresponding hash. And what falls out of this is a really neat property: even huge sweeping refactors to your library never break your consumers! Never!

You removed an entire function from your library—sort of the canonical definition of a breaking change—? The old hash definition still exists, and they’re still referencing that. And that old version still references the rest of your old version of the library. Then you can upgrade individual references one at a time, and your whole code base keeps type checking. More than that, it largely keeps *working*, courtesy of Unison being a pure functional language: those different implementations cannot easily mess each other up. This combo makes upgrades much more incremental. You can still use SemVer, and you can still put tooling around it, just like we do for Elm and Rust.

Now, you also want ecosystem norms, and even company norms, about how you proceed through upgrades, because there is a hazard here: you could end up with even more cruft in your codebase. You don’t have the challenge of *having* to upgrade your whole codebase at once for a major change… but you also don’t *get* the forcing function of having to upgrade your whole codebase for a major change. And you can imagine that producing some *weird* interop issues. But it makes it possible to land an upgrade incrementally in a way that can be *very* difficult for other ecosystem strategies.


### Versioning as a type

When I was trying to understand the way TypeScript’s type system interacted with versioning, I went searching for research on the subject, and… there wasn’t much, if any! However, there are a couple folks at NOVA University of Lisbon who are doing *actual* cutting-edge research on exactly this. They published a paper a couple years ago on *exactly* this subject: “[A Deep Semantic Versioning for Evolution and Variability](https://dl.acm.org/doi/pdf/10.1145/3479394.3479416)”.

In this paper, they extend Java with a pure functional language which purely expresses versions.

So you might have this starting point for a little programming language—note the `version init` and `@init` annotations, which are what they have added:

```java
version init
class Expr extends Object {
    @init Expr() { super() }
    @init int eval() { return 0; };
}
class Num extends Expr {
    @init int n;
    @init Num(int n) { super(); this.n = n; }
    @init int eval() { return this.n; }
}
class Example {
    @init Expr expr() {
        return new Num(4);
    }
}
```

The `version` declaration and `@init` attributes say “these are all defined in this `init` version.” You can invoke version-specific implementations with those attributes:

```java
@init((new Example().expr())
```

Then adding a new, backwards-compatible feature might look like this—note the `version 1 upgrades init` and the `@v1` annotations:

```java
version v1 upgrades init
class Add extends Expr {
    @v1 Expr a, Expr b;
    @v1 Add(Expr a, Expr b) { super(); this.a = a; this.b = b; }
    @v1 int eval() { return this.a.eval() + this.b.eval(); }
}
```

Then you again use the version tag to say *which* one you want:

```java
@v1(new Add((new Example).expr(), (new Example).expr()))
```

This works even when working with the original data types: here we have a case where the original classes are being extended with new capabilities in a new `v2`:

```java
version v2 upgrades init
class Expr extends Object {
    @v2 string print() { return ""; }
}
class Num extends Expr {
    @v2 string print() { return "" + this.n; }
}
```

But we also need to be able to make breaking changes, so a version can also specify that it *replaces* another version—here `v3``v3` *upgrades* both `v1` and `v2`, but it *replaces* `init`, because the class definition changed in a non-backwards-compatible way to add this new `print` operation:

```java
version v3 upgrades v1, v2 replaces init
class Add extends Expr {
    @v3 string print() {
        return this.a.print() + " + " this.b.print();
    }
}
```

The big thing you get out of this is that you can update the behavior of the system *without changing old code*. Code which was authored as `v1` can work with code introduced as part of `v3` without having to change to be aware of it:

```java
@v1((new Example).expr().print())
```

The paper has a lot more, of course, and it is mostly a pretty approachable read. I like that they are working on this.

Now, this design is carries a lot of extra type checking even just basic *programming* complexity! But I think it is an important starting point for future work—literally the cutting edge—and I would love to see someone try to apply it to an “industrial” language, with more of a focus on usability.


## What should you do?

All right, we’ve covered the philosophy here, and we know what the options are. What should you do when you have to answer a question about versioning your own code?

### As an application developer?

Use something shaped like SemVer if you have a user-facing version. If you are dropping support for an old version of an operating system, or removing features, or even just fundamentally changing the user interface, call it what it is: a breaking change. Your users will appreciate it.

You should also think about the libraries and tools you use. What are their versioning policies?

- If they’re not spelled out anywhere, see if you can figure out what they normally do from their history. If they have been sloppy about shipping breaking changes in the past, they probably will in the future, too, so pay extra attention to those libraries when upgrading them.

- If they are spelled out somewhere, make a point to understand them and how they will affect you—and check the history: have their actions matched their policy in the past? If so, you can probably rely on them in the future, too.

As an aside: having a clear versioning policy is a decent proxy for “Do the maintainers care about how their choices affect their users?”

### As a library author

1. Number one: be thinking about versioning and clearly communicating to your users.
2. Number two, use the tools available to *help you do that*. Elm will force the issue, which is great, but in Rust, you get to choose. So *choose* to treat it as a requirement. Use `cargo-semver-checks`. If you’re in an ecosystem which doesn’t have these tools… think about building them. You’ll learn a ton, and it would be *incredibly* valuable for the rest of the ecosystem.
3. As much as possible, keep your upgrades *low-coupling*. Support multiple major versions simultaneously wherever possible.


### As a *framework* author

Frameworks are something of a special case of libraries, because they form the foundation of a whole ecosystem. A framework is a *peer* dependency of everything else in the ecosystem which uses it. So as a framework author, do everything you can to make it easy for your consumers to do that.

1. **Be explicit about versioning policies.** More even than you would in general. Everything which builds on top of your framework is affected by your choices. They have to build their policies to work on top of yours.

2. Design your policies with that in mind.

	- The *number one design constraint* is to ***allow* libraries which build on top of your framework to support more than one major version at a time,** so that users can upgrade them separately. Not getting that right is what made the Python 2 to 3 upgrade so painful.
	- Make your major versions both *relatively rare* and *predictable*.
	- Incorporate migration strategies! When you deprecate old features for removal, provide a path away—with codemods if possible.

### Aside: Peer dependency semantics

- Frameworks are *peer dependencies* of libraries (whether your package manager has this concept or not!).
- So libraries should *require* only the *lowest* version they support, but *test against* all the versions they support. (This is… a pain in a lot of ecosystems.)
- In Node, use `peerDependencies` and either use a package manager which correctly validates them (pnpm or Yarn), or use a tool like `validate-peer-dependencies` to catch mistakes.

### As a programming language builder


1. **Consider versioning explicitly in your language design.** Every type system feature you add increases the complexity of versioning with your language, and your module system really matters.

2. **Build version-aware tooling as soon as possible.** Trying to bolt it on later, like `cargo-semver-checks` is doing, is *hard*. If you expose it in a first-class way, that makes version-checking tools easier. And people might come up with *other* cool things if that data is available.

3. ** Bake the concept of peer dependencies into your language and package tooling.** Make it easy for library authors to check their compatibility with a whole array of different versions of a framework, and for application developers to pick one of those supported versions, and for all of this to be automate-able. No ecosystem has really solved this yet. If you get it right, though, it will make it much easier for your ecosystem to evolve over time.

# Summary

Philosophically, **Versioning is a form of communication.** Specifically, it is a **socio-technical contract**: a way of communicating to people about a technical reality, and also to machines in support of people.

Practically:

- Articulate clearly how you use SemVer.
- Enforce as much of it as you can, with whatever tools exist for your language: tests, types, automated tooling, all of it.
- Keep your upgrade coupling low.
- And: Build new things: keep pushing this forward!

# Thank you

Anyone have questions? Comments? Insights?
