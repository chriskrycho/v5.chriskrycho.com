---
title: Reasoning About Reference Cycles
subtitle: >
  Rust’s lifetime types are challenging, but they bring a capability I miss all the time in other languages.
date: 2022-12-09T11:22:00-0700
tags:
  - Rust
  - software development
  - JavaScript
summary: >
  Rust makes it possible to reason explicitly about reference cycles… by forbidding them, and making ownership explicit. That has a cost, but I miss the capability often in other languages.
updated: 2022-12-09T21:39:00-0700
updates:
  - at: 2022-12-09T21:39:00-0700
    changes: >
      Elaborated on how real-world leaks from reference cycles are often *much* harder to see than the example code might suggest, and fixed some typos.
qualifiers:
  audience: >
    Software developers who want (or at least are willing!) to understand a bit more about how Rust’s making ownership explicit can genuinely change what is possible to understand about a piece of software.

---

I’ve spent a large chunk of the last year thinking about memory, and in particular memory leaks, in JavaScript applications. In talking with a friend just now about a project he’s working on, I was asking whether and how he’d managed to avoid reference cycles in a particular chunk of the code. It turns out: there absolutely *are* cycles in that code, just as there were in the memory leak I spent 6 months slowly chasing down a year ago. Whether the cycles in my friend’s code will result in leaks is an open question, and he’ll need to do some pretty careful tuning and checking to avoid those leaks.

I noted to him—

> I assume you’re thinking about that, but it’s annoyingly hard to reason about in almost any language that isn’t Rust.

Because: Rust makes it *possible* to reason about this in a way that no other language I’m familiar with does. The famously difficult learning curve associated with lifetimes and ownership, enforced by the borrow checker—

<aside>

Hold on. I need to say this. People talk a *lot* about how hard the borrow checker is. It’s true that there’s a learning curve, but:

1. That learning curve is *way* lower than it was a few years ago, and it gets lower and lower all the time as the Rust language and compiler team continue investing in making things work more naturally. There is plenty of room to continue to improve here, but the reputation is worse than reality, by a lot.

2. The main challenge is simply that you’re learning to think about something *new*. When I learned how higher-order functions worked in JavaScript (hey, jQuery, you were great!), my head hurt for a month. The same thing when, years before that, I first wrapped my head around how pointers and references worked in C. Learning new things is *always* challenging, but it’s easy to forget that about tools we have already grown comfortable with.

</aside>

The ~~famously difficult~~ learning curve associated with lifetimes and ownership, enforced by the borrow checker, is a matter of making something explicit which is usually left implicit in mainstream programming languages. When writing a program in JavaScript or Java, *most* of the time memory cycles don’t come up. When they do, you “just” figure out how to introduce a weak reference—literally a `WeakReference` in Java or `WeakRef` in JavaScript, or the higher-level weak primitives built on them. The same goes for Swift, C<sup>♯</sup>, etc.

In Rust, lifetimes and ownership are front and center. You cannot avoid thinking about them for very long. JavaScript (or TypeScript) will happily let you write a mutually-recursive data structure like a doubly-linked list:

```js
class Node {
  prev?: Node;
  next?: Node;

  constructor({ prev, next } = {}) {
    this.prev = prev;
    this.next = next;
  }
}

// We have a cycle!
let a = new Node();
let b = new Node({ prev: a });
a.next = b;
```

Here’s a relatively naïve direct translation of that code into Rust:

```rust
struct Node< {
    prev: Option<Box<Node>>,
    next: Option<Box<Node>>,
}

impl Node {
    fn new(prev: Option<Box<Node>>, next: Option<Box<Node>>) -> Node {
        Node {
            prev,
            next
        }
    }
}

fn main() {
    let mut a = Node::new(None, None);
    let mut b = Node::new(Some(Box::new(a)), None);
    a.next = Some(Box::new(b));
}
```

Rust… will simply reject this outright.[^why] The cycles that could (and all too often *do*) result in memory leaks in the JavaScript code are not even possible in Rust.

On the one hand, that might seem annoying. This is, for good reason, the canonical example of a thing that is impossible to write in safe Rust without some tricky bits of indirection. ([For example][example], and of course [the canonical writeup][too-many].) Unlike in the JavaScript example—or a Java or C++ example you could write just as easily—where the ownership and lifetimes of these items are totally implicit, Rust tracks them with as *types*, checked by the compiler, and the compiler rejects this cycle where two items own each other.

[example]: https://rcoh.me/posts/rust-linked-list-basically-impossible/
[too-many]: https://rust-unofficial.github.io/too-many-lists/

The cycle is fine right up until you want to *mutate* one of them. Shared mutable state == bugs. Sometimes “just” logical bugs; but sometimes serious memory safety bugs, especially data races. Thus, on the other hand, this “annoyance” about Rust is actually preventing really, really serious issues. Issues of the sort that cost me months hunting them down—in far gnarlier JavaScript code in late 2021–early 2022.

<aside>

A thing which is often missed, because it is easy to miss, in discussing these things: the problem is the “far gnarlier” bit of that last sentence.

It is easy to see the cycle in the doubly-linked list code snippet above. It is not easy to figure out how to guarantee your fix to it is *correct*, but at least you can easily see it. But many, perhaps even *most*, of the real-world places that reference cycles and the memory leaks they produce show up are hardly this obvious. Fixing “the bug” I refer to here ultimately meant fixing *multiple* different bugs, and the last one involved four of the most senior JavaScript engineers at LinkedIn mob-debugging the leak for hours on end, after one of us finally managed to isolate it after months of narrowing it down. I do not have words to express how awfully difficult the process of finding and fixing that last leak was.

And I say “last leak”, but: we *know* there is at least one more, which we *cannot* find, and which we have only patched our way around. 

</aside>

Again, lifetimes and ownership are present in basically every mainstream programming language, but because they’re implicit, it’s hard to *learn* to reason about them. Rust *makes* you reason about them, the same way jQuery *made* you learn higher-order functions.

But, to return to the start of the post, it also gives you an incredibly useful *capability*. All your opportunities for memory cycles are: (1) explicit in the code and/or (2) checked by the compiler. In JavaScript or Java or any other mainstream garbage-collected language, if you want to reason about the memory semantics of a given piece of code, the answer is roughly: “Good luck, have fun manually tracing through this code and looking at heap dumps and memory profiles.” The same goes for C or C++ (yes, even modern C++ with smart pointers) or even Zig or Odin.

On balance, I think it makes a lot of sense to just use garbage collection for many, perhaps even a majority, of use cases in programming. Particularly for “application” code. But when you *really* need to care about things like reference cycles and the possibility of memory leaks, Rust’s explicitness is not just a nice-to-have: it is literally the only mainstream language which makes it *possible* to reason about them explicitly in the code.



[^why]: It points out that you’re trying to mutate `a.next` after handing `a` to `b`, violating the single owner principle at the root of Rust’s memory safety guarantees.