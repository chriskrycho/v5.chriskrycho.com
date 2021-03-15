---
title: Introducing “Heuristics for Good Software Design”
subtitle: >
  A series of posts in which I explain how I think about effective software design.
qualifiers:
  audience: >
    For the series: practitioners of software development interested in better their craft. For this particular post: also people interested in thinking, learning, intuitions, heuristics, and mental models.
  epistemic: null  # explicitly opt out of the series-level default status
tags:
  - software development
  - mental models
  - thinking
  - learning
series:
  title: Heuristics for Good Software Design
  part: 0
date: 2021-03-13T22:45:00-0700
permalink: journal/heuristics-for-good-software-design/introduction/
feedId: journal/heuristics-for-good-software-design/introducing-heuristics-for-good-software-design/
image: https://images.unsplash.com/photo-1553526777-5ffa3b3248d8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80
thanks: >
  Thanks to [Robert Horvick (@bubbafat)](https://unsplash.com/@bubbafat) for [the illustrative social media image](https://unsplash.com/photos/1R4uPYipCFM).

---

With this post, I am kicking off a new series on software development organized around the theme of *heuristics for good software design*. Each post in the series will cover an idea I return to consistently for designing robust, maintainable software. Each heuristic is an idea I have deeply internalized over the course of my career so far as a *useful mental tool* for [thinking about and solving problems][problem-solving] in software design.

[problem-solving]: https://v5.chriskrycho.com/journal/a-useful-approach-to-problem-solving/

There are a number of subject areas I already know I’ll dig into, including:

- general patterns for *all* software
    - robustness (especially in <abbr title="user interface">UI</abbr>)
    - maintainability
    - refactor-ability
- <abbr title="application programming interface">API</abbr> design
- test-writing
    - what to test, and what not to
    - how to test the things we test
- reactivity in user interfaces

Some of the heuristics are high-level and general: *prefer approaches which enable local reasoning*. Others are quite specific to certain families of programming languages (and over-the-top, to boot!): *setters are **evil**.*

This list is representative, not exhaustive. The set of both subject areas and specific intuitions I plan to cover is continually growing: Practicing the craft generates new insights, and teaching it to others helps me formalize those insights into useful and snappy phases and framings. (I often discover that I rely on a given intuition in the midst of providing design feedback to other developers. The ever-appropriate question “*Why* is that design preferable?” inevitably makes me dig around until I understand my own intuitive reasoning well enough to explain it.)

---

A key distinction (one which I will hammer on throughout the series): these ideas are heuristics, not rules. There is, as far as I can tell, exactly and only one *rule* of software development: ***There is no single rule you can apply in every circumstance in software development.*** There are, however, a lot of useful patterns we can learn to apply to problems when we recognize that they’re applicable, given a set of constraints.

Put another way: heuristics, by definition, are not replacements for actually deeply understanding the craft of software. To the contrary! A heuristic is a mental shortcut, an intuition developed over time through repetition.[^intuitions] But any such mental shortcut is only as dependable as the fundamentals on which it is built, and only insofar as it *does* accurately represent those fundamentals. Applying any intuition as a hard-and-fast rule is a fast path to failure. So is failing to revise or update a heuristic as you continue growing and learning.

[^intuitions]: Yes, intuitions can be built: intuitions are not *instincts*.

---

On publishing:

- I expect the series will grow indefinitely. As long as I find writing these posts to be profitable to me, I will keep at it!

- I will likely revisit [and revise][revise] these posts much more than others on the site—as is only appropriate given my comments on revising and updating heuristics! (I am still thinking on the best way to handle this terms of my Atom, <abbr title="JavaScript Object Notation">JSON</abbr>, and email feeds. I’d like to find some way to actively notify readers when I’ve significantly revised a piece on the site in general.)

- Posts will be published when I have a new heuristic to describe, rather than on any set schedule. In my experience, these sorts of things don’t really appear on command. Rather, they’re the fruit of many months spent working in a problem space *and* trying to explain things in that domain to others.

[revise]: https://v5.chriskrycho.com/notes/2020-11-24-1714/

The basic outline and approach for each post will be:

1. Introduce the heuristic.
2. Explain the fundamentals which make the heuristic useful.
3. Point out where the heuristic is useful and applicable—and where it is *not*.
4. Provide one or more worked examples.

The first post in the series proper (that is, tackling an actual heuristic, rather than just introducing the series) should appear sometime in the next few weeks. I look forward to hearing your thoughts and feedback!
