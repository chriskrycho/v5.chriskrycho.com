---
title: >
  RFC: Semantic Versioning for TypeScript Types
subtitle: >
  In which years of thinking and months of design come to fruition.
summary: >
  With help from many friends, I’ve proposed a robust (if not-yet-finished!) design for Semantic Versioning for TypeScript types: some legitimately original work. I’ve spent the last four years thinking about this problem, and while we’re not done yet, I’m quite proud of this already.
link: https://github.com/emberjs/rfcs/pull/730
qualifiers:
  audience:
    Software developers, especially front-end devs, extra especially other TypeScript developers!
  epistemic:
    Mostly pretty confident we got this one right. Mostly.
thanks: >
  This <abbr>RFC</abbr> is the result of many long and detailed conversations with the other members of the [Typed Ember](https://github.com/typed-ember) team—in the last couple years, especially [Dan Freeman](https://github.com/dfreeman) and [James C. Davis](https://github.com/jamescdavis), as well as [Mike North](https://github.com/mike-north) in 2018–2019. It also profited enormously from many conversations with [Chris Garrett (@pzuraq)](https://github.com/pzuraq) and [Rob Jackson (@rwjblue)](https://github.com/rwjblue) over the years. Any mistakes are mine; much of what is good in this is theirs.
image: https://cdn.chriskrycho.com/file/chriskrycho-com/images/typescript.jpeg
date: 2021-03-23T21:30:00-0600
tags:
  - software development
  - Ember
  - TypeScript
  - Semantic Versioning

---

Earlier today, I published [Ember <abbr title="request for comments">RFC</abbr> #0730: Semantic Versioning for TypeScript Types][RFC #0730]. This <abbr>RFC </abbr> represents years of thinking about the problem space and having friendly conversations and arguments with collaborators and colleagues, and many weeks of writing effort over the last year. From the summary:

> This RFC proposes a definition of [Semantic Versioning][semver] for managing changes to TypeScript types, including when the TypeScript compiler makes breaking changes in its type-checking and type emit across a “minor” release.(Note that this RFC addresses *only* type checking and type emit, *not* the “transpilation” mode of the TypeScript compiler.)
>
> While this RFC is being authored in the context of Ember.js’ [adoption of TypeScript as a first-class supported language][RFC #0724], its recommendations are intentionally general, in hopes that these recommendations can be widely adopted by the broader TypeScript community.

[semver]: https://semver.org
[RFC #0724]: https://github.com/emberjs/rfcs/pull/724
[RFC #0730]: https://github.com/emberjs/rfcs/pull/730

If you’re in the TypeScript community, or you care about SemVer, I’d love it if you gave [the proposal][RFC #0730] a read and help us polish it up and fix any issues I missed along the way!

---

This is one of the biggest technical efforts of my career to date, and I think it has the *potential* to have a significant impact on the front-end community. I’m quite proud of it! TypeScript is an unusual language as mainstream languages go:

- It provides a [structural type system](https://en.wikipedia.org/wiki/Structural_type_system), whereas most other typed languages in general use have [nominal type systems](https://en.wikipedia.org/wiki/Nominal_type_system).

- It is [gradually typed](https://en.wikipedia.org/wiki/Gradual_typing), with explicit opt-outs for things which would be baked into the language inescapably in most other contexts and a wide range of compiler options to tune the strictness of the language.

- It has a whole host of type system features that exceed anything else in a language in widespread use (pushing right up into the edges of [dependent types](https://en.wikipedia.org/wiki/Dependent_type)!)

- It releases new language and compiler versions roughly once a quarter, and every change may be breaking in small or big ways.

Writing a definition of SemVer for TypeScript, which can absorb all of that and help package authors provide stable types for their consumers… was a lot of work! A friend asked me yesterday, “How long did it take you to write this?” Long-time collaborator [James Davis](https://github.com/jamescdavis) (who, along with our *other* long-time collaborator [Dan Freeman](https://github.com/dfreeman), is a huge part of why this is good if it is!), quipped:

> That's when you ask: "do you mean putting words on the page or figuring out what even needs to be said?"

That’s exactly right: this is literally years of thinking, condensed into a few thousand words, written over the course of several intense weeks last May and June, with off-and-on revision ever since. I hope—very much!—that it ends up being useful to and therefore adopted by *many* TypeScript authors across the whole JavaScript ecosystem. Regardless, I’m just happy to have it out in the world… even if (or maybe especially because!) [the development lead for TypeScript](https://github.com/RyanCavanaugh) promptly found 8 issues to iterate on. (Truth be told, that’s better than I could have hoped, on many levels: only 8 problems?!? And: Ryan Cavanaugh took time to comment on it!!!) Here’s to the *next* phase for TypeScript with Ember—and hopefully for TypeScript users in general.