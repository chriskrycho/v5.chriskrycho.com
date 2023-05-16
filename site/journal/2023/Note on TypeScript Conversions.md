---
title: >
  Note: On TypeScript Conversions
subtitle: >
  Addressing a very common question: do-it-as-you-go or follow the dependency graph?
qualifiers:
  audience: >
    Software developers working with JavaScript and TypeScript, or thinking about and working with gradual type systems in other languages. In particularly: I am not arguing *for* TypeScript or Python `types` or Ruby’s Sorbet etc.; I am talking to people who are already interested in adopting them.
  epistemic: >
    I led the conversion of a 150,000-line-of-code app to strictly-typed TypeScript back in 2017–2018, and am the primary “subject matter expert” for LinkedIn’s adoption of TypeScript across its millions of lines of library and application JavaScript.
date: 2023-05-16T07:55:00-0600
draft: true

---

One of the most common questions I get from people interested in converting their JavaScript applications to TypeScript is: *How should I approach this?* There are two approaches people tend to think of:

- ==TODO: some variety of `strict: false` and/or convert-files-you-touch==
- ==TODO: leaves-in, `strict: true`==

Most developers (myself included, the first time I did this!) are *very* much tempted to do the “just convert a file when you touch it, in loose mode or with lots of `// @ts-expect-error` and `any` scattered around” thing—for at least the three following reasons:

1. That pattern *usually* works with other kinds of migrations.

2. It feels more tractable, in that you can just do it “as you go”.

3. It actually works pretty well for sufficiently-small codebases—it’s very good for <1,000LOC and pretty good for <10,000LOC.

Unfortunately, it is a trap. When working on a codebase of any significant size, it actually means that you will end up having to propagate changes to various files over and over and over again. (I have a mediocre illustration of this I made a while back that I will try to dig up.) Worse, you *cannot* rely on the things you have already converted actually being safe: They *feel* safer than JS types-wise because they are in TS… but they are not, because they have lots of `// @ts-expect-error` and `any` scattered around. It can end up being quite demoralizing and frustrating to have errors coming out of your “but we already converted this!” modules. It can be a super frustrating thing to explain to other stakeholders, too: *Well, yeah, we converted this to TypeScript, but not all the way, so it still has these issues…*

The “walk the dependency graph leaves-in with maximum strictness” approach avoids that set of problems entirely. There is no free lunch, though, of course. Avoiding those problems requires being a bit more disciplined—you need to carve out some dedicated time to do the work by tackling a couple modules each week or something like that. Ultimately, though, it means that you neither have to revisit already-converted modules nor have the extremely annoying experience of getting errors TS *can and should* catch coming from already(-but-only-partially)-converted modules.

One additional note here: you can sometimes do a mix of *both* of these approaches quite effectively. If you have a larger app/etc. broken into a set of smaller packages, you *can* do the “iteratively work within a small library” approach within the packages, while avoiding publishing the types until you get them to full strictness. That ends up having some of the advantages and disadvantages of *both* approaches.
