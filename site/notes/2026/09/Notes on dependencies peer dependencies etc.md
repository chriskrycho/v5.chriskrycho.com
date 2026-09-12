---
title: Notes on dependencies, peer dependencies, etc.
subtitle: |
    Most developers get this wrong, in my experience… and I don’t blame them!

date: 2026-09-12T14:00:00-0700
tags:
    - software development
    - TypeScript
    - JavaScript

qualifiers:
    context: |
        I wrote this up on social media in the middle of the week, and wanted to make sure it got its usual permanent home here.

    audience: |
        Software developers who know at least a *little* about versioning and package management.

---

I was looking at a bunch of our `package.json` files internally this past week and considering the extent to which they’re actually just *wrong* on the strict semantics of our packages, but also considering how hard it is to have the *right* mental model for this—and monorepos make it harder by “absorbing” wrongness.

A classic example: if you have a package that is designed to work with Vitest, but which is a library, it should explicitly include Vitest in `peerDependencies`. If it also uses Vitest for its own tests (which it probably should), it should *also* specify it in `devDependencies`. Consuming packages should then *also* specify it in their own `devDependencies`, so that they resolve it correctly for their own tests. The same basic dynamic holds for libraries with runtime (not dev) dependencies, _mutatis mutandis_ for `dependencies`. 

In a monorepo, the difference “doesn’t matter”: the deps are usually all shared and often intentionally resolved to the same version anyway. The problem, though, is that it can and will cause weird resolution issues—things like not resolving some *other* package’s peer dependencies the way you expect—, because pnpm _et al._ want  you to, well, be accurate.

I don’t really blame working engineers for not understanding any of this. I had to learn it by thinking very deeply about the intersection of framework and library development with TypeScript types packages on DefinitelyTyped. If you haven’t had that particular punishing experience… good luck.

It does highlight to me that for all the progress a bunch of ecosystems have made in this area over (especially) the past ~20 years (yes, Perl nerds, I know <abbr title="Comprehensive Perl Archive Network">CPAN</abbr> is much older than that!), there is still an awful lot we could do to make it better.

---

One thing that catches my attention in thinking about all of this: you really do need the package manager to be closely integrated with the code itself to help you catch this stuff. You need to know whether it’s a “library” or “app” package, and how it *uses* the dependency. To my knowledge, *no* package manager out there tries to integrate/synthesize that information! And trying to express it in <abbr title="JavaScript">JS</abbr> land is rough—roughly “keep knip and your package manager in sync and… uhh… audit your deps?”

Aside: this isn’t a new theme for me! I [said][quote] exactly this [in a talk back in 2024][talk]!

> Bake the concept of peer dependencies into your language and package tooling. Make it easy for library authors to check their compatibility with a whole array of different versions of a framework, and for application developers to pick one of those supported versions, and for all of this to be automate-able. No ecosystem has really solved this yet. If you get it right, though, it will make it much easier for your ecosystem to evolve over time.

[quote]: https://v5.chriskrycho.com/elsewhere/cutting-edge-of-versioning/#:~:text=Bake%20the%20concept,evolve%20over%20time

[talk]: https://www.youtube.com/watch?v=0Pyyy-BAIYQ
