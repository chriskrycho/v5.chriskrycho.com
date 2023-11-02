---
title: Where <abbr>DRY</abbr> Applies
subtitle: >
  The rule is taught early and often, but it ought to come with a clarification.

summary: >
  Software developers are taught “Don’t Repeat Yourself” early and often, but the key is actually not repeating the program’s invariants.

tags:
  - software development

qualifiers:
  audience: >
    Software developers of any and every skill level.

  epistemic: >
    There are not many things I hold about software with supreme confidence—but this is one of them.

date: 2023-11-02T17:01:00-0600	  
started: 2023-07-29T12:43:00-0600

discuss:
  hn: https://news.ycombinator.com/item?id=38121669
  lobsters: https://lobste.rs/s/leor0x/where_dry_applies

---

Having only one place in the code base which must uphold a given invariant means it is far easier to test and to debug when there are failures. It means the code base does not rely on people fully internalizing the rules for each <abbr title="application programming interface">API</abbr> by reading all of its comments (and those comments being correct and exhaustive!) and then being sufficiently careful everywhere they use that <abbr title="application programming interface">API</abbr>. “Don’t Repeat Yourself” is most important, and most applicable, when it comes to upholding the invariants in a codebase.

This means that “don’t repeat yourself” is not an “always” kind of rule. There are many kinds of repetition which are actually *better*. Some kinds of boilerplate make code easier to maintain, or easier to write tooling around. Writing similar (or even the same!) functions or types in a couple different places in a code base (or across code bases) can actually be better for performance if that means you can keep your module graph simpler. It can also allow those functions to evolve separately from each other if that is appropriate. Repetition is not the root of all evil.

Repetition of the program’s rules in multiple places, though: that will cause you all sorts of pain. When those get out of sync, you have bugs, plain and simple. Often very bad bugs. Anything which your program needs to rely on always being true everywhere in the codebase—every *invariant*—should be as <abbr title="don't repeat yourself">DRY</abbr> as you can make it. So, again: “Don’t Repeat Yourself” is most important, and most applicable, when it comes to upholding the invariants in a codebase.

{% callout %}

I originally wrote the first paragraph of this as part of [a different post][unsafe]. This is a far more general principle than the context in which I applied it in that post, though, so here I am giving it its own home.

[unsafe]: https://v5.chriskrycho.com/journal/unsafe/

{% endcallout %}
