---
title: Runtime or Types?
subtitle: A false dichotomy! They always go together.

date: 2024-12-14T11:05:00-0700

summary: >
    Static types are *always* checking some (subset of) runtime behavior. The interesting question is: How much?

tags:
    - software development
    - type systems
    - TypeScript

qualifiers:
    audience: |
        Software developers who have some basic understanding of types. This post assumes, and does not explain, the basic TypeScript types involved.

---

A couple days ago, I wrote up the first part of the following notes in a discussion in a Slack I am a part of. I had helped someone see how to take a TypeScript object with a  bunch of possibly-`undefined` and produce a type where those fields are now *guaranteed* to be defined (as you can see in [this playground](https://www.typescriptlang.org/play/?#code/JYOwLgpgTgZghgYwgAgEIHsCuIAmBnZAbwChlkAbCGMALmREwFsAjaAblOTHQAc6GW7Ts3Rhujfk1ZQOZKMADmAC1r0pQgL7FiYAJ48UGbPlSZg5HNGQBeZAAU4UMMDjkAPEdx4AfB2IxsBGd0EGQYUFdgAC8IAApCCiowABpkeWUUrl5UkTF0RmQNOk8TMwtoAEpirC9kAB9kAFEoKHQoIk5kYBhkWMpqG2tbYypQCBwKtIgwTChQkAgAdyaWttiAchB0ROoAQnWK2TJu3vSVQeHcUYWJqZm5+iWV1qgNrbTFFX3DzpPY7h4F2QI3CN0mUGms3mT2aLze2wB3yOXR6sVy4iBILGtwh92hy1ha0223R+SRnVxUKIO0yZ0yAJyogxGg4WiAA). Another person argued that an answer I had given was wrong because it uses runtime checks rather than utilizing types to solve the issue. What follows is an elaboration on the answer I typed up!

---- 

That’s a false dichotomy: this uses runtime checks and types *together*. There is actually no way you can do `(T | undefined) -> T` (or `Maybe<T> -> T` etc.) *without* runtime checks. That doesn’t mean you’re not using types. Done correctly, it’s actually one of the most powerful ways of using types.

(This is basically [Parse, Don’t Validate](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/) in a narrow, local form.)

To wit: even if you were using a dependently typed language like Idris or F\* or Lean, you would still have to have the runtime check to prove the resulting type (and in those cases, “prove” is exactly the right word: it is actually a formal mathematical proof!), because *something* has to supply the evidence that the non-nullability holds.

Now, you can provide that proof via runtime check in different places—you could do some work to rewrite this entire flow into a state machine that traverses the set of original elements (probably repeatedly?) and generates a new type in the state machine which encodes that whether the resolved field has been initialized or not. But that still requires the runtime checks, they just get moved… and outside of Liquid Haskell, Lean, F\*, etc., you don’t actually have a way to write a type signature that can match that implementation over to the actual guarantee. (Off the top of my head, I can’t even come up with a good way to encode it using [typestate in Rust](https://cliffle.com/blog/rust-typestate/)).

Last note: if you click through to the playgrounds I shared, you’ll note that this *does* actually capture the runtime semantics in types at the compiler level—there’s a reason there is no cast `as number` at the end of the `finalize` function. TypeScript’s flow-based checking correctly sees that the function *always* returns an `Error` if any of the values are `undefined`, and so it actually *has* proven that `Bounds` is valid at that point. 

---

So far my original reply (which I left at that in the original Slack discussion). Extending that a bit further here, though:

I think the thing which throws people here is that they are used to seeing their program as a clean divide between static and dynamic behavior. TypeScript and some of the other languages I mentioned above do not enforce that as “cleanly” as folks coming from Java or C♯ or similar languages might be used to. TypeScript specifically uses “flow typing”[^1] to capture much more “static” information about the program than most other mainstream languages do. The example I opened with uses that to drive *static type checks* using *runtime information*.

But even in languages where this is not the case, this is far more common that we realize. When we use runtime behavior to encode an invariant—a classic maneuver in Domain-Driven Design,[^2] but also the thing we are doing every single time we parse anything, whether that is a wire protocol or a programming language or anything else—we are using runtime information in conjunction with the static types in our system! Sometimes the compiler can track more of those for us (TypeScript, Liquid Haskell, Lean, etc.), and sometimes we have to do the analysis ourselves and confirm via testing that we are upholding those invariants we think we are upholding. But this merely emphasizes that static types are not at odds with or distinct from runtime behavior; it is *always* on a spectrum of which parts of our runtime behavior are statically analyzed and which are not—ranging from “none” (machine code and assembly but also Python or Ruby) to “basically all of it” (dependent types).

[^1]: for which TypeScript alternative [Flow](https://flow.org) was named!

[^2]: See also: Hillel Wayne’s handy distinction of [Constructive vs. Predicative](https://www.hillelwayne.com/post/constructive/) data.
