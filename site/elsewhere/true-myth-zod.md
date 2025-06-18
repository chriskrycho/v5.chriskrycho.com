---
title: true-myth-zod
subtitle: The Year of Shipping continues!

summary: >
  A small, nice integration between True Myth and Zod: rich error handling tools for when an object cannot be parsed by a Zod schema.

date: 2025-06-14T20:20:00-0600
updated: 2025-06-18T09:26:00-0600
updates:
  - at: 2025-06-18T09:26:00-0600
    changes: |
      Added a link to the package right up front.

tags:
  - software development
  - TypeScript
  - Year of Shipping

qualifiers:
  audience: |
    TypeScript developers with an interest in even safer typed programming with a functional flair.

---

I just released [`true-myth-zod` v0.1.0][npm]. It’s a tiny little TypeScript library that integrates [True Myth][tm] with [Zod][zod]. If you’re unfamiliar with either or both:

- [True Myth][tm] provides nice `Result` and `Task` types that give you a really nice first class, type-safe way of handling *errors* in synchronous and asynchronous code respectively. Instead of dealing with try/catch everywhere, and at *best* having your errors be `unknown`, it lets you treat errors like any other value. (I maintain this library!)

- [Zod][zod] is a library for parsing unstructured or untrusted data into trusted data reliably. It takes in `unknown` or `string` or a `Record` type or lots of other types and gives back either the expected data type or a parse error that explains why the untrusted data cannot be parsed into the expected data type. (I have no relationship to this library; I just use it!)

`true-myth-zod` just pulls those two together in a nice way. You could easily write this code yourself (and honestly, I encourage you to do so!) but I wanted it myself for a while, and figured I would share it.

Here’s one way you could use this:

```ts
import * as z from 'zod/v4';
import { parserFor } from 'true-myth-zod';

// 1. Create the Zod schema.
const UserSchema = z.object({
  age: z.number(),
  name: z.string().optional(),
});

// 2. Wrap it with `parserFor` to create a version that produces a True Myth
//    `Result` instead of Zod's parse result. `parseUser` has the type
//    `(data: unknown) => Result<User, ZodError>`, where `User` is the type
//    produced by the Zod schema, `{ age: number, name?: string }`.
const parseUser = parserFor(UserSchema);

const input: unknown = { age: 42, name: "Reference Guy" };

// One convenient way we can work with `parseUser` is to use the `match`
// method on a `Result` to do different things depending on whether parsing
// succeeded or failed. TypeScript will require us to handle both cases!
parseUser(input).match({
  Ok: (user) => {
    console.log(user.name ?? "someone", "is", user.age);
  },
  Err: (parseError) => {
    console.error(
      `could not parse data: ${input}`,
      parseError.message,
      parseError.cause,
      ...parseError.issues,
    );
  },
});
```

Hopefully this will be useful to some of you! You can install it with any JS package manager, e.g. `pnpm install true-myth-zod`, and you can find the source code [on GitHub][gh]. Feedback welcome—try it out and let me know what you think!

[tm]: https://true-myth.js.org
[zod]: https://zod.dev
[npm]: https://www.npmjs.com/package/true-myth-zod
[gh]: https://github.com/true-myth/true-myth-zod/
