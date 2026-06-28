---
title: On the Rust Book Maintenance
subtitle: |
    It is indeed not optimal. Unfortunately, it is also hard to solve.

date: 2026-06-27T19:54:00-0600

tags:
    - software development
    - writing
    - Rust
    - open-source software

qualifiers:
    audience: |
        People at least broadly familiar with the Rust ecosystem and <cite>The Rust Programming Language Book</cite>’s role therein.

---

Thinking a lot about the comments in [The many journeys of learning Rust][post] about the perceived maintenance state of [The Book][book]:

> "We'd like to use [The Rust Programming Language/'the book'], but we've found that it's out of date, unfortunately. We've looked at the GitHub repo and found it's got a lot of unresolved issues and unmerged PRs" -- Principal Software Engineering work on Rust adoption in a regulated industry

There’s something to this: there are current 261 unresolved issues (many of which we haven’t even commented on) and 195 open pull requests (and we also haven’t even looked at many of those). Some of those are long-standing “this needs more time and effort to figure out how to tackle” kinds of things, some of them are typos, some of them are style arguments, some of them are valuable reports that a given teaching approach didn’t land for someone, some of them are pedantry, some of them are people with strong but wrong opinions… and it just takes a lot of time to wade through it all and stay on top of it. A classic open-source maintenance problem in other words, but applied to book.

We [disclaim in the <span class="all-smcp">README</span>][contributing] what the maintenance approach is, and why—time and print, both of which complicate maintenance on it a LOT—but it’s still not great to have so many open issues and PRs unaddressed. I’d love to change that. But also: Carol and I both have other full-time jobs and the book doesn’t have any ongoing funding! It’s a tough problem and I don’t know how to solve it.

[book]: https://doc.rust-lang.org/book/
[post]: https://blog.rust-lang.org/2026/06/25/vision-doc-journeys-to-learning-rust/
[contributing]: https://github.com/rust-lang/book/#contributing
