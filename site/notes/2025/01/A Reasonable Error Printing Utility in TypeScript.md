---
title: A Reasonable Error Printing Utility in TypeScript
subtitle: >
    Something I want all the time in <abbr>JS</abbr>/<abbr>TS</abbr> now that I am used to it in Rust—thanks to [anyhow](https://docs.rs/anyhow/latest/anyhow/index.html)!

date: 2025-01-24T08:40:00-0700

tags:
    - TypeScript
    - JavaScript
    - software development

summary: >
    A very simple tool for getting structured chains of errors in JavaScript using the ES2022 `Error.prototype.cause` property.

qualifiers:
    audience: |
        TypeScript and JavaScript developers who might not yet be aware of [the `Error.prototype.cause` property][cause] and how to use it to get structured error chains.
        
        [cause]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause

---

Since September 2021, all modern browsers and server-side runtimes support a `cause` property on an `Error`. This is really handy when you have a lower-level error that you want to handle in some cases or bundle into a higher-level error in other cases. Using it might look something like this:

```ts
class Weird extends Error {
  name = 'Weird'
}

class Fancy extends Error {
  name = 'Fancy'
}

let weird = new Weird("something went wrong deep in the stack!");
let fancy = new Fancy("we handle it later", { cause: weird });
let topLevel = new Error("and handle *that* later too", { cause: fancy });
```

You can chain as many `Error` classes with a `cause` as you like, and this can provide *extremely* useful context for debugging.

Actually *using* that error `cause` effectively requires a bit of work. Most browsers print any attached causes in a reasonably nice cascade with `console.error` or similar. However, the string representation including the `cause` like this is *not* part of the specification for `cause`, so not everything supports it. Safari does not print the `cause` stack by default, for one.[^safari-pls] For another, existing logging infrastructure (especially if written by hand!) may not use it either.

Here’s a zero-dependencies[^deps] version of little TypeScript utility I wrote while working on a new feature for [True Myth][tm] yesterday:[^tm-feature]

[tm]: https://true-myth.js.org

```ts
function printError(error: Error): string {
  let maybeCause =
    error.cause instanceof Error ? printError(error.cause) :
    error.cause ? error.cause.toString() :
    null;

  let cause = maybeCause ? `\n\tcaused by: ${maybeCause}` : '';
  return `${error.name}: ${error.message}${cause}`;
}
```

Given the `topLevel` error shown above, you can now log it with this formatting:

```ts
console.log(printError(topLevel));
```

The output will look like this:

```
Error: and handle *that* later too
	caused by: Fancy: we handle it later
	caused by: Weird: something went wrong deep in the stack!
```

If you wanted to, you could make this, or something like it, the body of an `Error` subclass you enforce using as your library or application’s error type:[^getter]

```ts
class MyAppError extends Error {
  get name() {
    return 'MyAppError';
  }
  
  toString() {
    return printError(this);
  }
}
```

Now calling `toString()` on any instance of `MyAppError` or any of its subclasses will produce the same nicely printed stack of errors! If you’d like to play around with this further, check out [this TypeScript playground][play].

One final note: a `cause` can be *anything*. I tdoe snot have to be another `Error`. This is why the `printError` calls `toString()` on non-`Error` items. Note, however, that you will only get the level of nice formatting out of those objects that they support with their own `toString` implementations. A plain-old <abbr title="JavaScript">JS</abbr> object will show up as the not-so-helpful message `caused by: [object Object]`. This is just <abbr title="JavaScript">JS</abbr> being <abbr title="JavaScript">JS</abbr>, though!

[play]: https://www.typescriptlang.org/play/?target=9&jsx=0#code/GYVwdgxgLglg9mABABwE4zFAoq1dUAUAprvgFyI56oCUFAzlOmAOaIDeAUIogDZFREAWwCGATwBGRAMIiQ9IogC83HohLUAdBDkLEGRiMhE4wSqVSIA-CmbYLxC9t1EaiMqp4b8z+YpveqL4KmlBwAMpMGCwEbh5qiGAgvLwA3Jyq-II6fsrC4lKyuTYABgA6YGVQOQoAJogSYhQAJOyikjIuAL4l7ogA5P3pPKgCIKhIJa2BmmAiQkRdLewzC-T0IiyLrTWLJeldGRC8IuuIALJiAILIyFT46gAeUERgtfTm1ByqW4JzC7FvglRlBxkh+pcbncLENVIceKowpFmDE6IhGCigWoQWDbBh7NQCFAABYweg0YaIQ6HTjHU4fADqRBgqHqRGer3eF2ut3uli4PF+iXmRFiFH6TJZtX6WJGYwmA0lrNhPGpRxOZwAYkYIGIni83h9IbyLFihf9RWj+trIGIZQLsfLwTbdSqqZwaVlEAB3ZmsvJgIjexBK2oEABE9DgCxJ0R9r0E3rwrEQtSIRGQ+iQJMUhggAGsAIThimcL3AHV6pSJIOIF1iCO+xDEoy1fj6QQnF6ocMAGg4iF2FF9Uqppa9YWQABkiAA3Ii8AO143Qwnh1vN1vtgBUJJEUG3fH3JEQYTgfYHQ8QFdtY-StIQUf4mkCRLg07nC9CESirFiNE4IA

[^safari-pls]: Dear Safari team, if you read this, *please* add support for this. It’s a small thing but fixing it would make workign with Safari as a primary dev browser a much nicer experience!

[^deps]: The version I actually used in True Myth uses [our `Maybe` type][maybe] because why *wouldn’t* it?

[maybe]: https://true-myth.js.org/modules/maybe.html

[^tm-feature]: I know, I [said][8.4] `Task` was feature-complete. But then someone [asked about retries][retries] and off I went. I’ll probably have v8.5.0 out later today with a really nice <abbr title="application programming interface">API</abbr> for retrying tasks!

[8.4]: https://v5.chriskrycho.com/elsewhere/true-myth-v8.4.0/
[retries]: https://github.com/true-myth/true-myth/discussions/931

[^getter]: I use a getter here for `name` to avoid creating an additional instance property on every single `MyAppError`.