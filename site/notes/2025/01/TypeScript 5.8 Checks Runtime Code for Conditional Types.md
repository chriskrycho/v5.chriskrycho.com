---
title: TypeScript 5.8 Checks Runtime Code for Conditional Types!
subtitle: One of those “if you know, you *know*” releases.

summary: >
    Historically, conditional types only gave you type safety on the caller side. Now, for a key subset, they give you safety within a function, too.

date: 2025-01-29T13:35:00-0700

qualifiers:
    audience: |
        Advanced TypeScript developers who understand its [conditional types][ct] feature.
        
        [ct]: https://www.typescriptlang.org/docs/handbook/2/conditional-types.html

tags:
    - software development
    - TypeScript

---

The TypeScript 5.8 beta [just dropped][post], and it has a huge feature in it. Right there at the top of the blog post: **Checked Returns for Conditional and Indexed Access Types**. From the perspective of a library author—particularly, a library author working on code which predates the library’s adoption of TypeScript—this solves one of the biggest pain points I have had historically.

[post]: https://devblogs.microsoft.com/typescript/announcing-typescript-5-8-beta/

Having conditional return types checked against the bodies of functions which use them is an absolutely massive win. Since their introduction, conditional types have been useful for writing standalone types for existing libraries (we did it a fair bit for Ember!), because a lot of JavaScript out there acts like this: the input determines the output, in statically-knowable but fairly dynamic ways.[^conditional] However, there was no connection to the runtime code that implemented that, so if you were working on the library code itself[^ember] they were not only useless but actually required you to write *more* code that could be *wrong*.

[^conditional]: Now that runtime checking works, you can combine this with other corners of TypeScript to get some absolutely *bonkers* levels of type-driven programming. It is not remotely the same dependently-typed programming… but it might *remind* you of it.

The reason this is so useful with <abbr title="JavaScript">JS</abbr> is because a lot of <abbr title="JavaScript">JS</abbr> <abbr title='application programming interface'>API</abbr>s were like this to start with: the types [exposed the complexity][exposed] that was [already present][present]. Most of the time, you actually want to avoid this kind of code when starting from scratch. But not always! There are a few spots in [True Myth][tm], for example, where we take advantage of this (or of similar techniques with overloads) to produce more useful types while still having fairly straightforward internal code.

[exposed]: https://v5.chriskrycho.com/journal/essence-of-successful-abstractions/
[present]: https://v5.chriskrycho.com/journal/is-typescript-good/#:~:text=In%20software%2C%20the,of%20the%20system.
[tm]: https://github.com/true-myth/true-myth

The <abbr title="TypeScript">TS<abbr> 5.8 beta announcement [post][post] covers this in some detail, including example code, so give it a read. I’m excited, even though the [SemVer policy][semver-ts] policy I use on True Myth (the only library I currently actively maintain) means it’ll be a *while* before we can use it. The day we can will be a good day, though!

[semver-ts]: https://semver-ts.org

[^ember]: Say: because you want to [generate types][ember] from the library instead of authoring them by hand)

[ember]: https://github.com/emberjs/ember.js/pull/20449