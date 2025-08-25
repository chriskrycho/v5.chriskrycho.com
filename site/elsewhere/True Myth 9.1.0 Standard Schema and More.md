---
title: "True Myth 9.1.0: Standard Schema and More!"
subtitle: >
    Doing my best to keep making True Myth more useful in more places.

summary: >
    Easy, drop-in integration with third-party schema libraries, support for round-tripping JSON, and more.

qualifiers:
    audience: |
        TypeScript developers with an interest in even safer typed programming with a functional flair.

date: 2025-08-24T19:45:00-0600

tags:
    - TypeScript
    - True Myth
    - Year of Shipping
    - software development
    - open-source software

---

I just published [v9.1.0][v9.1.0] of [True Myth][tm]: a TypeScript library that provides safe, idiomatic null, error, and async code handling, with `Maybe`, `Result`, and `Task` types that are *really nice*. The headline features for this release:

[v9.1.0]: https://github.com/true-myth/true-myth/releases/tag/v9.1.0
[tm]: https://true-myth.js.org

- [Standard Schema](https://standardschema.dev) support ([Guide](https://true-myth.js.org/guide/understanding/standard-schema.html) | [API Docs](https://true-myth.js.org/api/standard-schema/)).
- New [`transposeAll`](https://true-myth.js.org/api/result/functions/transposeAll.html) and [`transposeAny`](https://true-myth.js.org/api/result/functions/transposeAny.html) helpers for dealing with arrays of results.
- New `fromJSON` functions for [`Maybe`](https://true-myth.js.org/api/maybe/functions/fromJSON.html) and [`Result`](https://true-myth.js.org/api/result/functions/fromJSON.html) to support round-tripping.
- Constraining `Maybe` to accept only non-nullable types at construction, rather than only in the return types.
- More documentation cleanup!

I think the Standard Schema integration is probably the most important of these: it means you can use True Myth’s `Result` and `Task` types transparently with the schema types from [a huge swath][libs] of the TypeScript schema parsing libraries out there. (Literally A to Z with [Arktype][arktype] and [Zod][zod] as two of the major contributors!) For a little taste of that, here’s an example of the True Myth integration:

[libs]: https://github.com/standard-schema/standard-schema?tab=readme-ov-file#what-schema-libraries-implement-the-spec
[arktype]: https://arktype.io
[zod]: https://zod.dev


- With Arktype:

    ```ts
    import { parserFor } from 'true-myth';
    import { type } from 'arktype';
    
    const personSchema = type({
      age: "number >= 0",
      "name?": "string",
    });
    
    const personParserZod = z.object({
      age: z.number().nonnegative(),
      name: z.string().optional(),
    });
    
    const parsePerson = parserFor(personSchema);
    ```

- With Zod:

    ```ts
    import { parserFor } from 'true-myth';
    import * as z from 'zod';
    
    const personSchema = z.object({
      age: z.number().nonnegative(),
      name: z.string().optional(),
    });
    
    const parsePerson = parserFor(personSchema);
    ```

Then you can use *either* of those `parsePerson` definitions identically:

```ts
parsePerson(someUnknownData).match({
  Ok: (user) => {
    console.log(`${person.name ?? "someone"} is ${person.age} years old`);
  },
  Err: (error) => {
    console.error("Could not parse into person type:", error.issues);
  },
});
```

This should make True Myth that much easier to use with your favorite schema library. (This implementation may remind you of my recent note on [`isolatedDeclarations` and Zod][idz]—and rightly so! Thinking through that gave me the push to get this done, though I had been thinking about it for a while.)

[idz]: https://v5.chriskrycho.com/notes/isolated-declarations-and-zod/

The other features are just nice quality of life improvements, but those add up. I am happy to see True Myth continuing to improve and to pick up more users across the ecosystem!
