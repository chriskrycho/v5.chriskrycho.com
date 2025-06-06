---
title: History and Disposition
subtitle: |
    I have spent my career on large, legacy systems, and that informs an awful lot about me—including my views on <abbr title="large language model">LLM</abbr>s.

date: 2025-06-06T07:48:00-0600

tags:
  - software development
  - AI and ML

qualifiers:
  epistemic: Thinking out loud, soliciting responses.
  audience: People who aren’t already totally bought into a specific view of the goodness of these systems.

---

There are, no doubt, many factors contributing to why individuals like or dislike, grvitate toward or away from, <abbr>LLM</abbr>-based “<abbr title="artificial intelligence">AI</abbr>” tools for authoring software. Increasingly, though, I wonder if one of the biggest factors is simply this:

How much of your work has been, and is, about building new things vs. maintaining existing things? (For a very broad definition of “maintaining”: I do not mean stasis.)

Put another way, I strongly suspect that a great deal of my own suspicion of wide deployment of <abbr>LLM</abbr>-authored code and specifically of making that the *norm* is that I have spent nearly the entirety of my career working on large, complex existing systems. The ability to generate a lot of new code to deliver a feature has almost never been at a premium. The ability to deeply understand existing code, to make a targeted and narrow *just so* kind of fix or change that fixes a weird bug,[^debugging] to make a significant architectural change *and* bring along the people who have to work on the system after that change:[^after] those are the things my career has mostly been about.

That leaves me with a bit of a different disposition than many—not all—of the folks I know and respect who are most bullish about building software with <abbr>LLM</abbr>s. As I said at the top: there are many factors, so this isn’t a universal by any means. It does seem to recur a fair bit, though!

[^debugging]: Yes, I know that <abbr>LLM</abbr>s can help with debugging—there’s a reason I have written in this post about *authoring*.

[^after]: You can no doubt do some cool things with <abbr>LLM</abbr>s in conjunction with classic <abbr title="abstract syntax tree">AST</abbr>-based tooling to make major changes. But can you teach people how to *think* about that that way? No.
