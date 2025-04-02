---
title: Lowercase Your Namespaces
subtitle: >
  A mild proposal for making JavaScript and TypeScript namespace imports nicer to work with.

qualifiers:
  audience: |
    Other programmers; assumes you know the basics of how JavaScript and other langauges’ modules work.

date: 2025-04-02T11:58:00-0600
updates:
  - at: 2025-04-02T13:05:00-0600
    changes: Fixing a variety of typos and incomplete thoughts.

---

As I have been working on some updates to [True Myth][tm]’s documentation, I once again ran into one of my biggest annoyances with the design of JavaScript’s (and thus TypeScript’s) module system: the fact that modules and other values live in the same namespace.

[tm]: https://true-myth.js.org

Briefly, what I mean: Given a module `foo.ts`, like this:

```ts
export class Foo {
  constructor(public neato: boolean) {}
}

export default Foo; // we’ll come back to this!

export function helpWith(foo: Foo): string {
  return `foo is neat? ${foo.neato ? "yep" : "nope"}`;
}
```

If I want to import everything in the module, I can do that using a “namespace”-style import, like this:

```ts
import * as Foo from './foo.js';
```

Using the values off that import starts to look a bit funky, though:

```ts
let someFoo = new Foo.Foo(true);
console.log(Foo.helpWith(someFoo)); // "foo is neat? yep
```

That `new Foo.Foo` is… rough. We could also write `new Foo.default`, but that’s even weirder. The alternative is to import the values individually:

```ts
import Foo, { helpWith } from './foo.js';

let someFoo = new Foo(true);
console.log(helpWith(someFoo)); // "foo is neat? yep
```

That’s actually *fine* in this case—we’ll come back to it in a moment. First, though, we need to see what I *wish* I could do, and cannot:

```ts
import Foo, * as Foo from './foo.js';
```

In my dream world, this would work because the default import `Foo` and the `* as Foo` would be different kinds of things, living in different namespaces. They’re not, though, of course: they’re both just JavaScript values. If you try to write that code, TypeScript will complain that you cannot bind the same name to two different values like this:

> Duplicate identifier 'Foo'.

And if you try to *run* it, JavaScript will produce the same kind of error at runtime:

> SyntaxError: Identifier 'Foo' has already been declared

The actual motivating example for this feeling of frustrating, the `Task` type in True Myth, we supply a bunch of functions with names that are nice to use hanging off the namespace: `Task.withRetries`, for example. `withRetries` does not read particularly well alone. Here is a real example from the docs I have been writing:

```ts
import { withRetries, fromPromise } from 'true-myth/task';

let fetcher = () => fromPromise(fetch("https://true-myth.js.org"));
let fetchTask = withRetries(fetcher);
```

That’s… fine, I guess, but especially as those pile up, and you’re dealing with lots of helpers from across the library, and possibly others from other libraries, it just *doesn’t* feel nice anymore. It’s nicer like this:

```ts
import * as Task from 'true-myth/task';
import * as Delay from 'true-myth/task/delay';

let fetcher = () => Task.fromPromise(fetch("https://true-myth.js.org"));
let fetchTask = Task.withRetries(fetcher, Delay.exponential().take(10));
```

But now if I want to construct a `Task` directly, I’m back to `new Task.Task(…)`. Eww.

{% note %}

You might think this particular bit could be solved by making `fromPromise`, `withRetries`, and so on static methods on `Task`. There is a very good reason *not* to attach those as static properties on the `Task` class, though: it cannot easily be “tree-shaken”, i.e. dead code elimination isn’t viable.

{% endnote %}

You can re-export with different names, like the convention to use `T` as the shorthand for a default export matching the name of the module that some libraries use:

```ts
export Foo as T;
```

```ts
import * as Foo from './foo.js';

let someFoo = new Foo.T(true);
console.log(Foo.helpWith(someFoo));
```

You can also name the namespace *as* a namespace explicitly:

```ts
import Foo, * as FooNS from "./foo.js";

let someFoo = new Foo(true);
console.log(FooNS.helpWith(someFoo));
```

`FooNS` (or `TaskNS`!) is, once again, just kind of gross.

I was just stumped and frustrated. There doesn’t seem to be a great way to do this.

And then I thought about how I would do it in Rust. It would look something like this:

```rust
mod foo;

use foo::Foo;

fn main() {
    let some_foo = Foo::new(true);
    println!("{}", foo::help_with(some_foo));
}
```

Rust has the same restriction that a module is a kind of value, so it could not be `mod Foo` and `use Foo::Foo`. The details are different in some ways from JavaScript, but it comes out to the same thing. But it doesn’t matter, because modules are always lowercase in Rust: `foo`, not `Foo`. So you can import `Foo` and still use `foo` and there is no naming conflict.

Modules in JavaScript are just values—frozen values, but ultimately values like ang othet. So… why not use the Rust idiom in naming them? From the opening example:

```ts
import Foo, * as foo from './foo.js';

let someFoo = new Foo(true);
console.log(foo.helpWith(someFoo));
```

Or, to use a more extended real-world example, where we race the `fetch` promise against a custom 1-second timeout, and retry it up to 10 times with exponential backoff:

```ts
import Task, * as task from 'true-myth/task';
import * as delay from 'true-myth/task/delay';

let customTimeout = (ms: number) =>
  new Task<never, number>((_, reject) => {
    setTimeout(() => reject(ms), ms);
  });

let fetcher = () =>
  task.race([
    task.fromPromise(fetch('https://true-myth.js.org')),
    customTimeout(1_000),
  ]);

let fetchTask = task.withRetries(fetcher, delay.exponential().take(10));
```

This is actually just really nice. I think it would make a great convention. It does mean you cannot use that same name for some local variable—you couldn’t write `let task = task.withRetries(…)`—but I think that tradeoff is probably just fine. The same thing is true in Rust, and that has never bothered me.

I think [the next version][pr] of True Myth’s docs are going to use this exact pattern, and I encourage you to try it out as well! Lowercase your namespaces!

[pr]: https://github.com/true-myth/true-myth/pull/989
