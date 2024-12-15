---
title: Unmeasurable Costs and Benefits
subtitle: >
  One major reason standard advice about “demonstrating value (or impact)” does not work well for foundational software, including (but not only) open-source library code.
date: 2023-08-26T18:32:00-0600
updated: 2024-12-14T17:03:00-0700
qualifiers:
  audience: >
    Software developers and managers thinking about the costs and benefits of foundational ecosystem maintenance—riffing in particular on [this post by Graydon Hoare](https://graydon2.dreamwidth.org/306832.html) (which you should read first).
tags:
  - software development
  - open-source software
  - management
  - from my outbox
summary: >
  Everyone would be able to like to measure the impact of investing in software infrastructure. It is often impossible, though: you cannot measure a negative.

---

Graydon Hoare [wrote a good post][hoare] a few months ago about the importance of companies actually funding maintenance of foundational open source software (though much of it also applies to non-open source foundational software!), and it spawned [a small discussion on Hacker News][hn] today. One of the commenters there [suggested][hnc] a variation on a refrain I have heard more or less non-stop over the past half decade since coming to LinkedIn and joining an infrastructure team whose remit included, to various degrees, open source software contribution and maintenance:

> Imo number 1 thing that helps a maintainer on the resume is to say they brought in some number of revenue, and all their bug fixes (especially taking out the fires of the other engineers doing features) saves the company a dollar amount or guaranteed a dollar amount of <abbr title="annually-recurring revenue">ARR</abbr>.

[hoare]: https://graydon2.dreamwidth.org/306832.html
[hn]: https://news.ycombinator.com/item?id=37272929
[hnc]: https://news.ycombinator.com/item?id=37275431

This is a well-intended take, and as I said, it matches up closely with the standard corporate perspective on open source contribution and maintenance. *It does not work, though.* What follows are two of my comments ([1][1], [2][2]) explaining *why* it does not work, pulled together and very lightly edited.

[1]: https://news.ycombinator.com/item?id=37276939
[2]: https://news.ycombinator.com/item?id=37277772

---

The trick is that in many cases the value delivered is invisible and unmeasurable. How do you quantify “time saved by not having bugs”? But that is what great maintenance does. Or, the same for “time saved by a really well-designed <abbr title="application programming interface">API</abbr> that makes it easy to do the right thing and harder impossible to do the wrong thing”? Again: not measurable! ”Just put a number on it” is the kind of facile response I consistently get from too many folks in management when trying to have these kinds of discussions, and the annoying-but-inescapable reality is that it is not always possible to provide a monetary number on the value of this sort of work. Despite that value often very likely netting out in the millions or more every year!

The [natural rejoinder][hnc2] is: “Well, which is it? You say it cannot be measured and *also* assert that it’s likely millions of dollars a year!”

[hnc2]: https://news.ycombinator.com/item?id=37276988

This is a totally reasonable response! So let me elaborate a little on how these things can be true at the same time.

1. Imagine a scenario where there are two versions of an <abbr title="application programming interface">API</abbr>: one is bug-prone, the other is “correct by construction”—you literally *cannot* call it the wrong way.

2. Assume that for some percentage of the “invalid” versions of the bug-prone <abbr title="application programming interface">API</abbr> are called, the result is something that ends up going wrong in production and taking 3 developers an hour to resolve. (This kind of level-of-effort is not at all unusual in my experience dealing with on-call at both a mid-sized startup and at the scale of LinkedIn!) Let’s call it 10% to pick a reasonably small number: only 1 out of 10 bad invocations for this <abbr title="application programming interface">API</abbr> put us here.[^1]

3. Assume the <abbr title="application programming interface">API</abbr> is fundamental to some key library (a JS framework you use, for example), so the calls are proportional to the size of the code base. Again, pick a fairly low number: 1 mistaken call every 10,000 lines of code. If we are looking at LinkedIn’s front-end, that puts us on the order of well over 10 of these *that actively cause this problem* (over a million lines of code with a 0.1% “hit” rate and a 10% “blows up” rate).

4. Further take an average developer compensation of $150,000/year. (This is low for big tech, but again, it gives us a useful baseline.) This is ~$75/hour.

Put those together, and you’re talking about 100 incidents × 3 developers × 1 hour/incident × ~$75/hour/developer = $22,500. That’s *one* repeated bug over the lifetime of the program in question.[^2] That excludes the other potential business costs there: What happens if that also impacts revenue in some way—say, because it prevents sales, or means lots ad revenue, or results in an <abbr title="service-level agreement">SLA</abbr> violation? What is the cost of the postmortem? What is the opportunity cost of switching to deal with that bug instead of staying focused on some other task?

Add that up across the whole surface area of a codebase—dozens and dozens of bugs, across however many users and lines of code—and you’re talking real money. A million dollars is just 450 of those kinds of bugs with similar “blast radius” and occurence rate. This is the kind of rough mental math that leads me to talk about “netting out in the millions” benefit-wise. Thus far you could imagine “putting a number on it”.

Where it goes wrong: With the good version of that <abbr title="application programming interface">API</abbr>, *the bug never happens*.

There is nothing to measure, because our reasoning has to deal entirely in counterfactuals: “What would it have cost us if we had a bug in this particular part of the framework?” But you can do that *ad infinitum*.

More or less every part of a library can be more or less buggy, more or less easy to maintain, more or less amenable to scaling up to meet the needs of an application which uses it, more or less capable of adding new capabilities without requiring you to rewrite it, etc. The part that is impossible to measure is the benefit of all the “right” decisions along the way: the bugs you never saw, indeed never even had to think about because the <abbr title="application programming interface">API</abbr> just made them impossible in the first place.

Nor can you measure “this <abbr title="application programming interface">API</abbr> is easy to use and never breaks my flow” vs. “I spend at least a minute looking up the details every time I have to use it… and whoops, now I’m on Reddit because I switched to my browser from my code editor”. Nor can you measure the impact of “This <abbr title="application programming interface">API</abbr> makes me angry” vs. “This <abbr title="application programming interface">API</abbr> makes me actively happy” on velocity. The closest you get are proxy measures like <abbr title="net satisfaction">NSAT</abbr> surveys which tell you how developers feel overall and interviews where you can ask them what their papercuts are; but neither can be translated into dollar values in a meaningful way. And “putting on the imprecise number”[^3] is impossible for these kinds of things, because it is not a matter of precision or imprecision: *there is no number*.

[^1]: Lest you think I am gaming these numbers, I have real <abbr title="application programming interface">API</abbr>s we really deal with in mind which are so error prone that we deal with bugs like this *from that specific API* at least once a month, and which usually end up involving a half dozen well-paid engineers and managers. This is an underestimate.

[^2]: Off the top of my head, I can think of half a dozen <abbr title="application programming interface">API</abbr>s we use *very* actively in production which have these kinds of problems. I have eliminated a fair number of them in my tenure, but demonstrating the impact is… well, see above.

[^3]: as a different comment on the Hacker News thread [suggests][hnc3].

[hnc3]: https://news.ycombinator.com/item?id=37277730
