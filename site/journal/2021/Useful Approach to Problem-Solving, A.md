---
title: A Useful Approach to Problem-Solving
permalink: /journal/a-useful-approach-to-problem-solving/
subtitle: "(It’s useful to *me*, at least.)"
summary: >
  (1) Write down the constraints. (2) Go away and do something else. (3) Subconsciously solve some or all of the problem. (4) Repeat!
qualifiers:
  audience: >
    People interested in thinking about thinking, especially problem-solving.
  epistemic: >
    This seems to work well for me. I have no idea how well it works in *general*, but I know it *does* work for people who *aren’t* me, so… try it?
date: 2021-02-13T17:10:00-0700
updated: 2021-02-13T19:35:00-0700
image: https://cdn.chriskrycho.com/file/chriskrycho-com/images/problem-solving-notebook.jpg
tags:
  - thinking
  - learning
  - software development
  - metacognition

---

I wrapped up my work week yesterday by working out a good solution to a fairly thorny problem a coworker had run into, and which initially stumped me. As I was talking with Jaimie later, I realized that the process I had used in solving is one I employ *all the time*, and that might be useful for others to read about. So: a process I use to solve hard problems—

1. ***Write down (preferably on paper!) the full scope of the problem.*** There are a bunch of key things I always try to identify when doing this exercise:
	- the actual problem to solve, whether that’s a <abbr title="user interface">UI</abbr> layout issue or a database table design
	- identify every *constraint* on the solution:
		- what *must* it do?
		- what must it *not* do?

2. ***Go away and do something else.*** This could be working on some other task. It could be taking a run, or doing the dishes, or going to sleep. The key is: it can’t be just thinking about the original problem.

3. ***Subconsciously solve (a subset of) the problem.*** Having set the problem down clearly, the solution space for problem usually snaps into better focus after some time away. Sometimes it’s a full-blown solution to the entire problem. Sometimes it’s a subset of the problem. Sometimes it’s just a better understanding of the problem space! The degree to which it snaps into focus, and the amount of time it takes to get there, is a function of several factors:

	- how complicated the problem itself is: *communication about layout constraints between <abbr title="user interface">UI</abbr> components in a rich web app* is a much smaller surface area than *generic, robust, interactive form handling*.

	- how well I actually understand the problem: first of all, if I don’t have a clear understanding of the problem, i.e. (1) above, it’s unlikely I’ll make progress in a reasonable amount of time. More, if I’m unfamiliar with the entire problem space (say: kernel bugs), it’s unlikely I’ll get anywhere.

	- how much “capacity” I have for these kinds of problems: if I already have a bunch of unrelated problems taking up mental space, I think I go slower on all of them, and adding more makes the problem worse. The counterpoint: if multiple problems all end up in the same rough space, solutions can end up cascading to clarify *many* of them all together.

4. ***Repeat until the whole problem is resolved.*** The process sometimes ends up with immediate clarity to the whole of a problem in the middle of a run. Just as often, though, it actually requires a few passes: each one adding clarity to the problem, nailing down part of the solution, or both. Every time, I just add the information to my notes and then walk away and let my subconscious go to work again.

Yesterday, the process took something like two hours start to finish and involved three cycles with paper and pen, and ultimately had that lovely knock-on effect where it helped me solve another problem I didn’t even realize I’d been mulling on. A few weeks ago, a different problem I was helping someone with took me a couple days to fully resolve, though it only took me one pass with paper and pen. Other problems I have spent months or even years on and generated many pages of notes on and don’t have a full answer to yet! Regardless of the number of cycles, the amount of ink and paper used, or the difficulty of the problem, the process does consistently help me make progress on problems I’m stuck on.

This isn’t magic. It is an extremely helpful way of going at things, though—so much so that it can sometimes *feel* like magic!

---

**Bonus:** a variant on this same process often works wonders for problem-solving in groups, whether that’s around a whiteboard or through an <abbr title="request for comments">RFC</abbr> process: *Do the hard work of getting everyone on the same page about the actual problem and its constraints (often the longest and hardest part). Give it some time. Try to write down a solution. If you fail to find a solution, make sure you capture the “failure” as additional constraints on the problem. Repeat until solved.*

---

**Addenda** (in the form of a couple notes based on feedback after sharing it):

- One reader asked:

    > Do you have any tricks for  insuring that the problem is actually "loaded" into your subconscious?

    This is a great question, and the key here for *me* is step 1. The act of writing things down is what firmly plants the problem in my subconscious with the right shape and kicks off the process of figuring it out.

- Another reader [commented][li] that he has done similar, but somewhat informally. I feel I should note that I have *also* been doing this informally. At no point do I think, “Ah, now I should do step (2)!” Rather, I realized that I *do* in fact go through this exact same process all the time, and so I made it explicit so I could share it with others.

[li]: https://www.linkedin.com/feed/update/urn:li:activity:6766513207768178688?commentUrn=urn%3Ali%3Acomment%3A%28activity%3A6766513207768178688%2C6766517229895897088%29

