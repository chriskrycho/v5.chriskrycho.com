---
title: Friendly Little Wrapper Types
subtitle: |
  What you can do with a “thing” in your system really, really matters!

qualifiers:
  audience: |
    Software developers. Assumes basic knowledge of wrapper types and uses some [Domain-Driven Design][ddd] concepts; discusses about software services and assumes a fair bit about large systems. You’ll follow along fine without knowing much about either, though, as long as you know some basics of software.
    
    [ddd]: https://martinfowler.com/bliki/DomainDrivenDesign.html

date: 2025-12-27T15:13:00-0700

tags:
  - software development
  - type systems
  - TypeScript
  - Rust

---

A while back I was having a friendly debate with a colleague about whether there’s value in providing an opaque “wrapper” type around things like identifiers—a user <abbr title="identifier">ID</abbr>, for example—in a service that doesn’t treat those as a core concern.

What I mean by an opaque wrapper type is something like this in TypeScript:

```typescript
class UserId {
  #value: string;

  constructor(value: string) {
    this.#value = value;
  }

  serialize(): string {
    return this.#value;
  }
}
```

Or like this in Rust:[^transparent]

```rust
struct UserId { value: String }

impl UserId {
    fn new(value: String) -> UserId {
        UserId { value }
    }
    
    fn serialize(self) -> String {
        self.value
    }
}
```

Types like this get your code away from “primitive obsession”: the software design anti-pattern of leaving many (all too often *most*) types in the system as just the primitives supplied by the programming language—numbers, strings, booleans, and so on. Even though the underlying data may be just one of those primitives, the *semantics* of the data are not necessarily the same as those. The classic example is an email that has been tested to conform to [the specification][email-spec] (<abbr title="request for comments">RFC</abbr> 5322). You can reduce—quite dramatically—what the rest of your system has to concern itself with if you [isolate][v5] parsing the email to just one part of your system, and use the tools of your programming language to [capture that fact][pdv].

For example, you might write something like this for email parsing in Rust, to capture the fact that not all strings are valid emails, and to let the rest of the system reliably *know* that it has a carefully-parsed email:

```rust
struct Email { value: String }

impl TryFrom<String> for Email {
    type Error = ParseError;

    fn try_from(s: String) -> Result<Email, ParseError> {
        // actual complicated email parsing
    }
}

enum ParseError {
    MissingLocalPart,
    MissingAmpersat,
    MissingDomain,
    InvalidLocalPart,
    InvalidDomain,
    // ...
}
```

[email-spec]: https://datatracker.ietf.org/doc/html/rfc5322#section-3.4.1
[v5]: https://v5.chriskrycho.com/journal/where-dry-applies/#:~:text=Repetition%20of%20the,in%20a%20codebase.
[pdv]: https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/

My colleague’s contention was that while this is obviously valuable in the case of something like email parsing, it’s just needless complexity in contexts where all you have is a simple identifier that isn’t relevant to the service in question—people will just pass it through anyway, right?

An obvious first rejoinder might be that we actually *don’t* know what people will do with a given item in the system. Long experience has taught me that other developers (including my future self running on insufficient sleep: a situation in which I have sadly found myself a few times this year!) will do all sorts of silly things they shouldn’t. Wrapping a user identifier into a type does not make it *impossible* for someone to do those silly things, but it adds some real friction: the kinds of things that are likelier to catch someone’s attention in code review or, for that matter, when writing the code in the first place. “Why *can’t* I just use this as a string here?” is a really good question to prompt someone to ask, after all!

My contention here is a much more fundamental design heuristic, though:

{% callout %}

The choice of representation should not be visible to other users of some piece of data when the underlying data does not have the same semantics as the item being represented.

{% endcallout %}

Viewed through that lens, this kind of abstraction is no more and no less valuable in a service that merely shuttles a user identifier along than in a service where users are core concerns for the domain. In both cases: the fact that a user ID is a string (or number, or…) under the hood is besides the point. Relevance to the domain is actually irrelevant!

That is: once you have constructed a `UserId`, you should not be able to check the length of the string that represents it, or concatenate it with some other string, or get a subslice of it, or to call `String.prototype.splice` on it and mutate its contents. None of those are meaningful things to do with an identifier. To the contrary: the only semantics associated with the item are its use *as an identifier*, passed around as a token that other operations can reliably depend on because they can trust it to represent the user and not to behave like a string.

<aside>

This is also one of my favorite parts of the Rust design I showed above. It uses ownership so that the only way to get a `UserId` is to give up access to the original string, and the only way to get access to a string representation of it is to give up access to the `UserId`. If you want to work with the thing in a raw form, you can no longer use it as an identifier—and *vice versa*!

</aside>

Not all abstractions “pay for their weight” all the time. Some rarely do—you should only reach for deep and “fancy” type abstractions when you’re getting something really significant for their cost—some deeply important constraint there is no other, lighter way to express: Think of a formally-proven [implementation][verified] of <abbr title="transport layer security">TLS</abbr> written in [F\*][fstar]. Most sit on some middle ground—the normal tradeoffs of do-I-or-don’t-I that we all use in deciding how to build software. Very, very few are the abstractions that are *so cheap* and their value *so high* that it basically always makes sense reach for them. This sort of little wrapper type is one of those few.

[fstar]: https://fstar-lang.org
[verified]: https://github.com/project-everest/mitls-fstar?tab=readme-ov-file

It is clean and clear. It takes away all the hooks and handles from the underlying representation that the domain object shouldn’t have. It lets you provide to users of the thing just what they should have, while still giving you total freedom to do with the underpinnings what you will. It gives you all of those benefits for almost nothing: a tiny runtime wrapper—or, with the right incantations in some languages, no runtime cost at all[^transparent]; a tiny bit of compile-time overhead—or, with the right incantations in some languages, *less* compile-time cost than using the “primitive” underneath, because the comparisons are simpler.[^ts-assignability]

Go forth and use little wrapper types like this. They’re cheap-as-free and they’ll make your life much easier in general—and where they add a little friction, it’s for very good reason.

[^transparent]: In Rust I would actually use `#[repr(transparent)]` to make this truly zero-cost at runtime—no wrapper type at all, at runtime, just the checking at compile time.

[^ts-assignability]: Looking at you, TypeScript assignability checks with union types.
