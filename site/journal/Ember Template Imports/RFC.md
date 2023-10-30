---
title: >
  Request for Comments: First-Class Component Templates
subtitle: >
  Given all the analysis from this series, a concrete proposal to move this forward!
date: 2021-12-03T16:35:00-0700
link: https://github.com/emberjs/rfcs/pull/779
image: https://cdn.chriskrycho.com/images/template-imports/rfc-0779.png
series:
  part: 7

---

I have now published the promised <abbr title="request for comments">RFC</abbr> for the design this series discussed as “Ember Template Imports”: [Ember RFC #0779: First-Class Component Templates](https://github.com/emberjs/rfcs/pull/779). The new name is intentional: I think it’s important to describe the value this feature delivers, not just one small piece of the feature. We spent years talking about “template imports” because the original motivation for this, half a decade ago, was the ability to import things in templates. But since then we saw an opportunity to do something much better and build something much richer—to make templates truly a first-class piece of the story of building Ember apps, in a way they never have been before.

I expect there to be a fair bit of discussion before we land this, and there may even be some more changes before we ship the final version of what I have proposed here—but I fundamentally believe that first-class component templates will make developing Ember apps *way* better. Let’s do this.