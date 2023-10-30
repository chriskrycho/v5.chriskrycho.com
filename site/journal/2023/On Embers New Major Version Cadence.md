---
title: On Ember’s New Major Version Cadence
subtitle: >
  Not just how this one specific process for one JavaScript framework is changing, but *why*—and why I hope it will be useful to other projects as well!
date: 2023-06-23T09:40:00-0600
updated: 2023-06-23T11:15:00-0600
updates:
  - at: 2023-06-23T11:15:00-0600
    changes: >
      Added some more color via a footnotes. Polished the content a bit, too.
tags:
  - software development
  - open-source software
  - Ember
image: https://cdn.chriskrycho.com/images/ember-versions.png
summary: >
  Ember 5.0 just came out, and we used it as a chance to change how we do major versions. But the reasons are not Ember-specific at all—and I hope the thinking behind this change will be useful to other projects!
qualifiers:
  audience: >
    Not Ember-specific! If you are interested in thinking about evolving libraries, frameworks, and ecosystems, this is relevant to you. It does assume basic background knowledge of [Semantic Versioning](https://semver.org/).

---

We [released Ember.js v5.0](https://blog.emberjs.com/ember-5-0-released/) this week. This marks the start of a new approach to Ember's versioning strategy: like our minor versions, major versions now come on a predictable cadence: one every 12 minor releases (18 months). I championed and authored this strategy, so I wanted to talk about it a bit!

Ember historically released major versions irregularly: whenever the various teams agreed that it was time. That approach suffered from the same unpredictability as most projects’ minor releases: Ember 1.x had 14 releases, Ember 2.x had 19, and Ember 3.x had 29 (!). Even though Ember “only” does cleanup in major releases—removing deprecated code—29 minor releases meant a *lot* of deprecations.

Ember embraced a six-week cadence for minor releases almost a decade ago, borrowing the idea from Chrome and Firefox’s release trains: ship things when they’re ready, removing the pressure to get any given fix or feature in before the next big release goes out. We noticed, though, that we were having the inverse of that problem before major releases. Before each major release in recent memory—*especially* late in the 3.x cycle—we delayed cutting the new major version *and* rushed in a bunch of deprecations right at the end. Churntastic.

Why? Well, the exact same reason people rush in features when you have big bang release on an unpredictable cadence: “If we don’t deprecate this now, we might have to carry it around for *another* 3+ years and 20+ minor versions!” So… we solved it the same way we did for feature releases. By cutting a major version after every `.12`—so: every 13 minor releases, including the `.0`—we *know* when a major version is coming. It will be every 18 months, plain and simple. Lots of big wins fall out of this, benefiting both maintainers and users!

For maintainers:

- If a deprecation does not make one major version, you know you are not paying for that “miss” indefinitely.
- For the same reason, there is no reason to delay a major. Just target the next one.
- You can target later major versions and know when they are coming, too.

To elaborate a bit on that last point: while Ember is now on the 5.x train, nothing says a deprecation has to target 6.0 (~November 2024). It could target 7.0 (~May 2026) or even 8.0 (~November 2027)! That can tell people, “Start migrating away now, finish by ___.”

That leads directly into how this change is useful for *users* of Ember. Planning for a major version has always been a bit of a pain, for two reasons:

1. When is it even coming? How do we fit that into our sprint/quarterly/annual/etc. planning?
2. “Just” fixing deprecations can be hard![^ember-v4-li]

This change addresses both of those head-on. First, teams can *know* to plan for an Ember major version every 18 months. People targeting LTS releases (.4, .8, .12) can know that they should budget for minor upgrades every six months and majors every other fall or spring. 🎉 📆 Second, teams will have many fewer deprecations to tackle at any given major version—because the major version cycles are shorter *and* because there is less pressure to get deprecations in. This should make upgrades *much* easier.

Net, the goal is to use releasing more often and more predictably to smooth out the bumpiness and make maintenance of apps and libraries less burdensome, so developers can focus on making great software to serve their users.

Want even more details? The [<abbr title="request for comments">RFC</abbr>](https://rfcs.emberjs.com/id/0830-evolving-embers-major-version-process) has them! Prior art we drew on explicitly includes Angular, TypeScript, and Node, all of which release their major versions on regular cadences. (Side-eye at TS major versions, though. 😂)

---

LinkedIn Engineering funded the work to put Ember on this cadence; I spent a non-trivial chunk of my time on it in 2022.  We will be one of the biggest benefactors of this predictability, with dozens of apps and millions of lines of code affected—and we're happy to benefit the whole community with it!

[^ember-v4-li]: To wit, tackling the deprecations for the Ember v4 upgrade for the flagship app at LinkedIn will likely net out to something like 12–18 months of developer time when all is said and done. Granted: that is spread over a code base with 3 *million* lines of code, and includes all the work LinkedIn invested in upgrading key dependencies across the ecosystem to support Ember v4 as well. Still: a lot of work!