---
title: |
    `isolatedDeclarations` and Zod
subtitle: |
    One strategy for using TypeScript’s `isolatedDeclarations` flag with inference-driven libraries like Zod.

image:
  cdn: zod-schema-isolated.png

date: 2025-08-01T09:14:00-0600

tags:
    - software development
    - TypeScript
    - Rust

qualifiers:
    audience: |
        TypeScript developers who already understand what [the `isolatedDeclarations` compiler option][compiler] is and why you would be interested in it, and [why it doesn’t work with Zod][issue].
        
        [compiler]: https://www.typescriptlang.org/tsconfig/#isolatedDeclarations
        [issue]: https://github.com/colinhacks/zod/issues/3751

---

I’ve been thinking for a while at [work][v] about how our code base, which is a heavy [Zod][zod] user, could flip on [TypeScript’s `isolatedDeclarations` flag][flag] to improve overall type checking performance. This is currently not possible to do *directly* from the schemas Zod generates, because Zod (like a lot of other libraries in <abbr title="JavaScript">JS</abbr>/<abbr title="TypeScript">TS</abbr> ecosystem) *starts* with runtime code and produces types from it:

[v]: https://www.vanta.com
[zod]: https://zod.dev
[flag]: https://www.typescriptlang.org/tsconfig/#isolatedDeclarations

```ts
import * as z from 'zod';

export const UserSchema = z.object({
  name: z.string().optional(),
  age: z.number().nonnegative(),
});

export type User = z.infer<typeof UserSchema>;
```

Because the types are inferred from the runtime code, `isolatedDeclarations` does not work here: for TypeScript to understand the public <abbr title="application programming interface">API</abbr> of the module, including to emit declarations, it *must* walk the full schema declaration to determine the resulting type: there is no other source of truth for it.

There is a deep tradeoff between this design and one like [Serde][serde]’s, which starts with the data type and creates the deserializer/parser from it:

[serde]: https://serde.rs

```rust
use serde::Deserialize;

#[derive(Deserialize)]
struct User {
    name: Option<String>,
    age: u8,
}
```

The tradeoff is this: with Zod, you have a very expressive <abbr title="domain-specific-language">DSL</abbr> for writing the deserialization/parsing logic, but have a harder time seeing what the resulting type is. It can also become arbitrarily expensive for the compiler to walk that <abbr>DSL</abbr>. With the Serde design, the type itself is right there and is a place you can do concrete design work, but at the cost of having to generate (potentially a *lot* of) code via Rust’s macro system. That generated code can be arbitrarily complex to generate and expensive to type check, too!

(I am still developing my thoughts on that tradeoff… but the rest of this post is one step in a direction I think is helpful.)

Working on [true-myth-zod][tmz] and thinking a bunch about separating “domain model” (i.e., the types that we think of as the source of truth for our “business logic”) from our <abbr>API</abbr> and persistence types gave me the idea simply to invert the way the declaration works:

[tmz]: https://github.com/true-myth/true-myth-zod

```ts
import * as z from 'zod';

export interface User {
  name?: string | undefined;
  age: number;
}

export const userSchema: z.ZodType<User> = z.object({
  name: z.string().optional(),
  age: z.number().nonnegative(),
});
```

You can see that this works in [the TypeScript playground][play] I just whipped up with that exact code and `isolatedDeclarations: true`.  

[play]: https://www.typescriptlang.org/play/?isolatedDeclarations=true#code/JYWwDg9gTgLgBAKjgQwM5wF5wGZQiOAcgwgBNCBuAKCoFMAPSWOYAOxlqm2QGNa4Aqqk5wA3lThxWyELQD8ALjioYUNgHM4AHzgBXVqVrY2tUtUnJ1tJa10gARp2oBfGgybweEVir3CoAMo8ABa0IMhKGAB0AFpkACoAnmC0ADxCnAB8cAC8mFEQ9gBWtDwwABTiktKykVEqaqzq5QCUBWAwwN7IADatADQSKFZ1tg6crVGs3qy06sidAG60A1TOLdRAA

This has an additional benefit for authoring and maintaining this code. We get to write the type we want as the *target* for, rather than the *output* of, the Zod schema. This makes it much easier for us to be sure that the schema generates the type that we want! This also means that we can evolve the *type* first when we want to make a change and then update our schema to match. As good as Zod’s <abbr>DSL</abbr> is, I think it is much easier for most people to write a type that expresses what they want correctly and then check that a schema conforms to it than to make sure that their authored schema has the type they want by exploring it via hover in their text editor or <abbr title="integrated development environment">IDE</abbr>.

You can also extend this pretty easily with tools like [neverthrow][n] or [True Myth][tm]. Here’s a nice little utility for writing a Zod parser that produces a True Myth `Result`, and exporting the resulting types:

[n]: https://github.com/supermacro/neverthrow
[tm]: https://github.com/true-myth/true-myth

```ts
import type { Result } from 'true-myth';
import { parserFor } from 'true-myth-zod';
import * as z from 'zod';

// This uses `z.core.$ZodError` so that it can be used with either the
// full Zod library or Zod Mini.
type ParseResult<T> = Result<T, z.core.$ZodError>;

type ParserFor<T> = (data: unknown) => ParseResult<T>;

export interface User {
  name?: string | undefined;
  age: number;
}

export const parseUser: ParserFor<User> = parserFor(z.object({
  name: z.string().optional(),
  age: z.number().nonnegative(),
}));
```

This is also fully compatible with `isolatedDeclarations` ([playground][play2]). I will probably ship this directly in `true-myth-zod` shortly, and I will definitely be using this pattern for my own parsers using Zod going forward!

[play2]: https://www.typescriptlang.org/play/?isolatedDeclarations=true#code/JYWwDg9gTgLgBDAnmApnA3nASigzgVwBt4BfOAMyghDgHIYp8UBaERGAC1oG4AoUSLAxwwAQyi4UUAGLQ4ZStToMmrdh2YAvCABMe-cNHgAqOKNxxNFKjVra9fXgHoncACodgF-JIsADTQA6AGNoFECAEgAtXQBRKCooPzhcCAQOUXhgeGDRADs4ACM0HxQdOAB3bI44FGqpdJRnV3IiQjgY8sJgQqhxRDg5TrgAWWA84EDeJFQ4AAVxSRwCYgAeNwA+OABebDwiGHWAGksQsMjO+MSNxxm0BYkpWSh1rd2ACh1M0QAuOHw8gBrPIQCp5ACUOy2DyW+zWm0cKAAHoIsnkYFJyKJgmgAKqSKAYXhwOB5UQgFAAfj+uAY4wA5nAAD7-PI6FDkcZlPgk0T0lB-PL4EDFKB8Ei8XjI1FwUJ5Wn-AkwqR-ZUyaCrfFSN4iRZPaDvIIQQoAKxQwRg73QxNJ5IFp1pUAZ73BgQgYBgwAgZMILqONr59qCQpFUhdgRBeTyKHpmWAADcUH7eCRweC+EA

