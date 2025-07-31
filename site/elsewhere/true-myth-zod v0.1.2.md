---
title: true-myth-zod v0.1.2
subtitle: |
    <abbr title="also known as">AKA</abbr> the first version that actually works.

summary: >
    A bugfix release of the `true-myth-zod` integration library that can actually run and be used for type checking… and a PSA about `files` in `package.json`.

date: 2025-07-31T07:28:00-0600
tags:
    - software development
    - open-source software
    - JavaScript
    - TypeScript
    - Year of Shipping

qualifiers:
    audience: |
        TypeScript developers with an interest in even safer typed programming with a functional flair.

---

The very short version: as of yesterday’s [v0.1.2][release] release, [`true-myth-zod`][tmz] actually, you know, works. With previous versions (v0.1.0 and v0.1.1) you could not actually run the distributed code or use its types. I manually confirmed in a completely fresh local test environment that it works now, though!

[release]: https://github.com/true-myth/true-myth-zod/releases/tag/v0.1.2
[tmz]: https://www.npmjs.com/package/true-myth-zod

---

As a refresher, `true-myth-zod` is a simple integration between [True Myth](https://true-myth.js.org) and [Zod](https://zod.dev). You can use it to combine Zod’s type-safe handling of untrusted data with True Myth’s type-safe handling of errors as first class values with `Result` and `Task`. Using it might look something like this:

```ts
import * as z from 'zod/v4';
import { parserFor } from 'true-myth-zod';

// 1. Create the Zod schema.
const UserSchema = z.object({
  age: z.number(),
  name: z.string().optional(),
});

// 2. Wrap it with `parserFor` to create a version that produces a True Myth
//    `Result` instead of Zod's
const parseUser = parserFor(UserSchema);

const input = "{\"age\":42,\"name\":\"Reference Guy\"}";

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

---

So how did this go wrong? Well, when I [published][pub] it originally, I thought I had everything lined up correctly, but I had made two mistakes. First, there’s a little line in `npm`’s docs about [the `files` field][npm-docs] in `package.json` files that is easy to forget:

> If there is a `.gitignore` file, and `.npmignore` is missing, `.gitignore`'s contents will be used instead.

[pub]: https://v5.chriskrycho.com/elsewhere/true-myth-zod/
[npm-docs]: https://docs.npmjs.com/cli/v11/configuring-npm/package-json#files

I had quite reasonably put the `dist` directory in my `.gitignore`[^jj] so that I would not commit the built artifacts. Having forgotten about this bit of trivia, I blissfully published the package after confirming that the *build* did the correct thing, and that linking the built version of the package worked fine. So, the first two lessons:

1. Test by using [the `npm pack` command][pack] to create the same bundle that `npm publish` would upload, and check that it has what you want.
2. Always set `files` explicitly to include everything you want in the distributed output; do *not* rely on what `npm` will automatically pick up.

[pack]: https://docs.npmjs.com/cli/v11/commands/npm-pack

The second mistake I made was copying over *most* but not *all* of the project configuration from True Myth itself—specifically, for the root `tsconfig.json`. Unfortunately, the root config in True Myth is designed to make local development and testing work nicely, and there is a dedicated secondary config file for *publishing*. I knew that, but I thought that I had made the appropriate tweaks to my workflow to handle it, and I had not. As a result, even once I fixed the `files` issue in `package.json`, the package still didn’t work correctly in v0.1.1, because the package ended up with a tree structure like this:

```
true-myth-zod/
    dist/
        src/
            index.js
        test/
            index.test.js
    src/
        index.ts
    test/
        index.test.ts
  package.json
  tsconfig.json
  README.md
```

Notice that `dist` reproduces the top-level layout with `src` and `test` in it, and only includes `.js` files, with no `.d.ts` type declaration files. Not what I wanted! The fix was to re-introduce a publishing-specific `tsconfig.json` that produced the correct output: just put the compiled contents of `src` in `dist` directly, *turn on source maps* do not include the `test` files at all:

```
true-myth-zod/
    dist/
        index.js
        index.js.map
        index.d.ts
        index.d.ts.map
    src/
        index.ts
    test/
        index.test.ts
  package.json
  tsconfig.json
  README.md
```

The lesson here is the same as with `npm`: always check that the output is as you expect, and moreover that the version you publish can actually be used by your consumers!

I hope this ends up being helpful to someone else; I know it will be helpful for me to reference next time I am publishing a new package.

---

Meta note: there sure are a lot of footguns in publishing an npm package. One more thing Cargo does better—not perfectly, of course, but much better.



[^jj]: I didn’t actually touch Git once during the process of building the library, but [Jujutsu][jj] understands and works correctly with `.gitignore` files.

[jj]: https://jj-vcs.github.io/jj/latest/