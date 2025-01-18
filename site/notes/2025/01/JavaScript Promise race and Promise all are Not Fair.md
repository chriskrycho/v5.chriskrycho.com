---
title: JavaScript’s `Promise.race` and `Promise.all` Are Not “Fair”
subtitle: Just like life! And just like life, you just have to deal with it.

date: 2025-01-15T19:06:00-0700
updated: 2025-01-17T19:21:00-0700

qualifiers:
    audience: |
        This opens with a bit of background from my work teaching async in Rust, but this post doesn’t require you to know anything about Rust, and is aimed first of all at JavaScript developers, but you might still benefit from the concepts even if you’re writing something that isn’t JavaScript *or* Rust!

tags:
    - JavaScript
    - Rust
    - software development

---

In the midst of working through our publisher’s edits for [<cite>The Rust Programming Language</cite>][trpl], I got to thinking a bit about how a `race` function can be “fair” or “not fair”. That is: does the `race` function always prioritize one of its arguments, or does it poll them randomly so that if they actually both finish immediately (really: as soon as polled) the first argument doesn’t always win? Fairness is sometimes quite a useful property for when you want to make sure you are not biasing the outcome of a particular race between two futures simply by passing in one future ahead of another.

[trpl]: https://github.com/rust-lang/book/

One classic example here is network operations: if you have some set of calls you might need to try, you can end up starving out “later” branches if you `race` and the first async operation ends up “winning” often—even if just because it and the other async operations it is racing against all take about the same amount of time. There are lots of other places it can come up, too: you can cause nasty issues with resource contention with a non-fair implementation by repeatedly hammering away from whichever task gets to go first.

In the Rust context, [the `race` function][smol-race] supplied by [smol-rs][smol] and [the `tokio::select!` macro][tokio-select] are fair,[^tokio-select] while [the `futures::future::select` function][select] is not fair.

[smol-race]: https://docs.rs/smol/latest/smol/future/fn.race.html
[smol]: https://github.com/smol-rs/smol
[tokio]: https://tokio.rs
[select]: https://docs.rs/futures/latest/futures/future/fn.select.html
[tokio-select]: https://docs.rs/tokio/latest/tokio/macro.select.html#fairness

Because I *just* implemented [a `race` utility][tm-race] in [True Myth][tm], which uses `Promise.race` under the hood, I started wondering how the built-in JavaScript `Promise` handles this. (I just used `Promise.race` under the hood directly for `Task.race`, so I got the built-in `Promise` semantics automatically, which was the point!) It turns out: `Promise.race` is *not* fair, but instead if multiple items are resolved it will pick the first one in the order of the iterable supplied as an argument. The <abbr>MDN</abbr> docs *do* explain this, but without using the term “fair”:

> If the iterable [passed as argument to `Promise.race`] contains one or more non-promise values and/or an already settled promise, then `Promise.race()` will settle to the first of these values found in the iterable.

The key phrase there is “the first of these values found in the iterable”. If multiple values resolve at the same time,[^finish] the first one in the iterable passed to the `Promise` will always win. You can test this for yourself:

```js
test();

function test(n = 100) {
  const go = () => Promise.race([one_ms("a"), one_ms("b")]);

  let input = Array.from({ length: n }, go);
  Promise.all(input).then((results) => {
    let as = results.filter((value) => value == "a").length;
    let bs = results.length - as;

    console.log(`'a' won ${as} times`);
    console.log(`'b' won ${bs} times`);
  });
}

function one_ms(value) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), 1);
  });
}
```

[tm-race]: https://true-myth.js.org/functions/task.race.html
[tm]: https://github.com/true-myth/true-myth

The takeaway for JavaScript programmers: if fairness matters to you, including for things like handling network requests on a server (which a few of you out there might be doing, I hear!), `Promise.race()` is probably not the right tool. The same goes for `Promise.any()`, which has the same semantics as `Promise.race` when it comes to ordering.

If you want a *fair* race implementation, it isn’t especially complicated,[^roughly] but you will have to build it yourself.

[^tokio-select]: An aside: I think `tokio::select!` is not a great <abbr title="application programming interface">API</abbr> design, and in general would recommend away from using it. It does a *lot* of implicit work for you in ways that I find make debugging issues *quite* difficult.

[^finish]: In strict terms, no two operations in the single-threaded JavaScript run loop will ever finish at exactly the same time, and indeed truly finishing at “exactly the same time” is a very rare outcome in general. Two operations running on separate threads which are running on different processor cores *could* finish at the same time, but that is still exceedingly unlikely. For the purposes of this discussion, though, there *is* a definition of “the same time” that is actually correct: if two promises both resolve in the same tick of the microtask queue, they finish at the same time from the point of view of APIs like `Promise.race`.

[^roughly]: Roughly, use `Math.random()`. Slightly less roughly: use `Math.random()` as your sorting mechanism to generate a new array to hand to `Promise.race()`.