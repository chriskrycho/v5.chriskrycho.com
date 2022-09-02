---
title: Open Source
subtitle: >
  Notes on the sheer scale of recently-completed open source efforts of mine.

tags:
  - TypeScript
  - open-source software
  - Ember

date: 2022-09-01T23:35:00-0600

qualifiers:
  audience: >
    People thinking about the economics of open source software. Or, you know: just people who *use* open source software!

---

A thing I think is really, *really* easy to overlook when thinking about open source software is just *how* much work it can take. “[Move types][pr] from the DefinitelyTyped repo to the Ember repo” seems easy, right? “It’s just a simple move operation!” But: it wasn’t, for many reasons.

[pr]: https://github.com/emberjs/ember.js/pull/20180

For one thing, we *intentionally* didn’t do some of this TypeScript work on the types in DefinitelyTyped to avoid breaking people—we wanted to give people a chance to *opt into* breaking changes, rather than be implicitly *opted in*. That meant that there were a lot of changes!

For another, we couldn’t use the same infrastructure to *test* these type definitions as we had when they were in DefinitelyTyped. Moving them meant doing an enormous amount of “grunt work” to switch that over to the library we have committed to using within @emberjs. That switch caught bugs. Real bugs, some of which were literally ten years old. Fixing those uncovered *more* bugs. The combination of catching previously unknown errors and making some (very necessary!) breaking changes produced a cascade of work unseen at the outset.

The result was that when I wrote “a couple weeks” in [a celebratory tweet][tweet] last night, I didn’t mean “hacking in the evenings for a couple weeks.” I meant “This was my full time job for a couple weeks.” Yes, modulo meetings, etc.: but I easily spent 40+ hours on this. And I helped write these types, and have helped maintain them for *years*! I [designed the migration strategy][rfc]. I have as much context as it is possible to have. This is as fast as this could possibly have gone.

[tweet]: https://twitter.com/chriskrycho/status/1565182254443216897
[rfc]: https://rfcs.emberjs.com/id/0800-ts-adoption-plan/

Two weeks of full time work, mixed in with 1:1s and planning etc.

The fact that this got done at all, ever, is purely a function of the fact that LinkedIn values our developer experience enough to spend my time on that, full time, for weeks. Now *tons* of people benefit. But it was very costly.

Many open source projects are like this.

There is often a “why don’t you just…?” that seems like the easy win for open source maintenance. As with software maintenance in general, the reality is often far trickier—far more annoying. That goes double for infrastructure code other software depends on. 

So next time you think, “Dang, why is that open source project so slow about \[fixing bugs|implementing new features|doing that refactor|etc.]” remember: the answer is probably because no one is paying for it, and it’s likely multiple full-time jobs to do it all.
