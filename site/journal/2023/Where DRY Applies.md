---
title: Where <abbr>DRY</abbr> Applies
subtitle: >
  The rule is taught early and often, but its application is subtler than most introductions or explanations allow.

summary: >
  Software developers are taught “Don’t Repeat Yourself” early and often, but the key is actually 

tags:
  - software development

qualifiers:
  audience: >
    Software developers of any and every skill level.

  epistemic: >
    There are not many things I hold about software with supreme confidence—but this is one of them.
	  
started: 2023-07-29T12:43:00-0600
draft: true

---

In [a recent post][unsafe], I wrote:

> Having only one place in the code base which must uphold a given invariant means it is far easier to test and to debug when there are failures. It means the code base does not rely on people fully internalizing the rules for each API by reading all of its comments (and those comments being correct and exhaustive!) and then being sufficiently careful everywhere they use that API. “Don’t Repeat Yourself” is most important, and most applicable, when it comes to upholding the invariants in a codebase.

This is a far more general principle than the context in which I applied it in that post, though, so here I am giving it its own home.

[unsafe]: https://v5.chriskrycho.com/journal/unsafe/
