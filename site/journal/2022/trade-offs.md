---
title: Trade-offs
subtitle: >
  They are real; but too often offered as an excuse to avoid thinking rather than a reason to think harder.
date: 2022-10-06T20:20:00-0600
updated: 2022-10-08T16:45:00-0700
updates:
  - at: 2022-10-08T16:45:00-0700
    changes: >
      Added a better explanation around machine code and the Rust example for showing how investment can change trade-offs.
tags:
  - software development

---

Developers like to talk a lot about trade-offs, and they are not *wrong* to do so, but it is also an easy out, in at least two ways—

1. The actual work of software is about *choosing between trade-offs*. Simply to say “Well, there are tradeoffs” does not help identify (a) what the trade-offs are, (b) how they interact with each other, or (c) why one might choose to come down on one side or another of any given trade.

2. Not all tradeoffs are equal! It is truly the case that some things are *better* than other things. The language of “trade-offs” often obscures this. (Indeed: it is often deployed for precisely this reason.) A modern, high-level programming language is better than laboriously hand-authored machine code for nearly every purpose. Real exceptions exist, so it *is* a trade-off, but 99.999% of the time that trade-off lands in one spot.

Trade-offs are thus (a) contextual and (b) subject to change over time, as conditions change. Hand-authored machine code was the *right* side of that trade-off for many applications for a long time, but that is no longer true (and has not been for decades). It is sometimes possible to shift the balance between two or more trade-offs with targeted investments of time or energy or both. Even for cases where the trade-offs might appear insurmountable, like the historical hard necessity of memory unsafety for low-level, high-performance code, decades of research and engineering effort can change the trade-off—as Rust has, and other languages will likely do yet more.

Put another way: “All things being equal, *A* and *B* have comparable upsides and downsides, just different ones” and *leaving it there* has two problems: All things are *never* equal; and: The differences do in fact matter.

Responsible software engineering is about identifying what things are not equal and the way those differences matter, making decisions accordingly, and then living with the consequences.
