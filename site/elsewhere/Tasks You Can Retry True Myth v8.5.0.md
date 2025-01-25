---
title: >
    Tasks You Can Retry: True Myth v8.5.0
subtitle: >
    I know, I said we were done, but then someone had a good suggestion!

summary: >
    True Myth v8.5 adds a handy new function to allow you to retry any task—with good defaults, and also with great progressive disclosure of complexity.

image:
    cdn: true-myth-v8.5.0.png

date: 2025-01-24T20:41:00-0700

tags:
    - TypeScript
    - True Myth
    - Year of Shipping
    - software development


qualifiers:
    audience: |
        TypeScript developers with an interesting in *even safer* typed programming with a functional flair.

thanks: |
     As always, thanks to [Ben Makuh](https://benmakuh.com) for helping me with the design of this—it’s *far* better due to his input, as is the whole library!

---

I [said][8.4] a couple weeks ago that I thought we were done with the True Myth 8.x series, but here I am again: delivering v8.5.0, with a lovely (well, I think so anyway) new `Task.withRetries` <abbr title='application programming interface'>API</abbr>, which does exactly what it sounds like: retry a `Task` if it initially rejects.

[8.4]: https://v5.chriskrycho.com/elsewhere/true-myth-v8.4.0/

Although you *can* customize nearly every part of this, you do not *have* to customize any of it. By default, `withRetries` will immediately retry the callback up to three times:

```ts
let fetchTask = Task.withRetries(
  () => Task.fromPromise(fetch('https://true-myth.js.org'))
);
```

When combined with tools like `Task.safe` (which we shipped [in v8.4][8.4]), this can becomes a *very* concise abstraction:

```ts
const fetch = Task.safe(window.fetch);
let result = await Task.withRetries(() => fetch('https://true-myth.js.org'))
```

You can fully customize its behavior, however:

1. The retryable callback receives a status object which reports the number of retries and the elapsed time requested. You can use that to determine what actions to take depending on how long you have been trying an operation.

	<!-- this looks wrong indentation-wise but works correctly -->
	{% note %}

The `elapsed` value will always be greater than or equal to the requested elapsed time after the first try, because even calling `setTimeout(() => {}, 0)` will take at least one microtask queue tick, and JavaScript runtimes do not guarantee *exactly* the time it takes for promises to settle or `setTimeout` to resolve, and the resolution changes over time.
	
	{% endnote %}
 
2. You can by supplying a `Strategy` which is simply an iterable iterator which produces a number of milliseconds to wait to try again. When combined with iterator helpers (either manually authored via generator functions or via the new iterator built-ins in ES2025), this makes for a very straightforward way to build up custom retry behaviors, because an iterator—and in particular a generator function—is a very natural way to express a sequence of numbers produced on demand, potentially forever. (I got this idea, and modeled this <abbr title='application programming interface'>API</abbr>, fairly directly on the [the Rust `retry` crate][crate]: it’s a brilliant insight, but the insight was not mine!)

3. You can stop retrying at any time, using the supplied `stopRetrying()` function, which accepts a message describing why and an optional cause. Under the hood, this returns a custom `Error` subclass that can *only* be constructed by calling that function, so that the `withRetries` implementation can know that any instance of that error is a signal that it needs to stop all further retries immediately.

This next example show roughly the full <abbr title='application programming interface'>API</abbr> available, using the `exponential` delay strategy supplied by the library (there other supplied strategies are `fibonacci`, `fixed`, `immediate`, `linear`, and `none`):

```ts
import * as Task from 'true-myth/task';
import * as Delay from 'true-myth/task/delay';

let fetchTask = Task.withRetries(
  ({ count, elapsed }) => {
    if (elapsed > 100_000) {
      return Task.stopRetrying(`Went too long: ${elapsed}ms`);
    }

    return Task.fromPromise(fetch('https://true-myth.js.org'))
      .orElse((rejection) => {
        let wrapped = new Error(
          `fetch has rejected ${count} times`,
          { cause: rejection }
        );
        return Task.reject(wrapped);
      });
  },
  Delay.exponential({ from: 10, factor: 3 }).map(Delay.jitter).take(10),
);
```

All of the built-in retry delay strategies (`exponential`, `fibonacci`, `fixed`, `immediate`, `linear`, and `none`) have good defaults such that you can simply call them like `fibonacci()`. This ends up being a *great* example of “progressive disclosure of complexity”, I think: out of the box, it does something reasonable, and you can opt into customizing it with quite a few

Full credit to my co-maintainer [Ben Makuh][ben] for getting us to this design; my initial version was substantially less clean and required more configuration up front. And again, a huge hat tip here to the folks behind [the Rust `retry` crate][crate], because while this <abbr title='application programming interface'>API</abbr> has a few differences from that one, to fit better with True Myth and TypeScript more generally, it is *philosophically* the same. I find the use of an iterator for customizing the retry strategy to be a brilliant insight, and I doubt I would ever have come up with it myself!

[ben]: https://benmakuh.com
[crate]: https://docs.rs/retry/latest/retry/