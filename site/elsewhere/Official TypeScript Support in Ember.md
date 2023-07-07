---
title: Official TypeScript Support in Ember
subtitle: >
  6½ years after I started down this path, we have something great.
link: https://blog.emberjs.com/stable-typescript-types-in-ember-5-1
summary: >
  In December 2016, I started working on unofficial support for TypeScript in Ember. This week, official support landed. In this post: a reflection on that journey and what it has meant to me personally and professionally.
date: 2023-07-08T13:25:00-0600
tags:
  - Ember
  - TypeScript
qualifiers:
  audience: >
    People with at least a passing interesting in one of: TypeScript or long-term open source software development. No technical knowledge required, and particularly no Ember knowledge or interest required.

draft: true

---

In December 2016, I started working on unofficial support for TypeScript in Ember. This week, some 6½ years later, we crossed a really remarkable milestone: *official* support for TypeScript in Ember has landed and is “stable”. I wrote up details for Ember users [in the announcement blog post][announcement]; *this* blog post is focused on a bit of meta-level reflection about the journey here.

[announcement]: {{link}}

When I started working on TypeScript support for Ember, I was distinctly not “qualified” for the job. I had been working in Ember for less than a year, and I had been writing TypeScript *at all* for a whopping two or three months. I was not coming from nowhere, to be fair: unlike many folks in the front-end world, I had spent a lot of time over the first five years of my career writing a mix of typed languages (including C, C++, and Fortran—yes, Fortran), and since 2015 had been mucking around with Rust, Haskell, Elm, PureScript, F^#^, and so on. Types were not new to me. But TypeScript was!

It was less ego than desperation, though. I *knew*—from Rust and Elm especially—that there were many, many bugs in our app that simply did not have to be there. I also knew, from my attempt starting a few months earlier to add types to our app using [Flow][flow], that these languages could catch a *lot* of low-hanging fruit in terms of those kinds of bugs. I was sick to death of the bugs that I knew Flow or TypeScript could catch. So I just… started.

[flow]: http://flow.org

I had no idea—really, no idea—how much work I had signed myself up for; I also had no idea just how satisfying it would be, or how much it would change the trajectory of my career.

<aside>

I started out looking at Flow instead of TypeScript because, when I started looking at it, Flow had features <abbr>TS</abbr> did not that were hard necessities for Ember support—and because, unlike TS, it did actually aim to be a sound type system. But I concluded, once TS got the relevant features, that between Microsoft and Facebook, Microsoft was the team to bet on in terms of successfully driving a programming language forward. Facebook’s track record was already a bit spotty on that front, whereas Microsoft had decades of experience in exactly that space. That choice looks obviously correct in retrospect—but it was distinctly not obvious at the time: Flow was a real competitor and some of its choices really pushed TypeScript to reevaluate some of its earlier decisions.

</aside>

