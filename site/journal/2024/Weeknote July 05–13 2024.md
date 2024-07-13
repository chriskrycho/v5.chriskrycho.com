---
title: "Weeknote: July 6–13, 2024"
date: 2024-07-13T16:55:00-0600

tags:
    - software development
    - writing
    - reading
    - public speaking
    - theology
    - weeknotes

summary: >
    The most important talk I have given, open source software work, a book review at TGC, some progress toward a job, and one short blog post.

---


## Speaking

My second LambdaConf talk was published: [Seeing Like a Programmer: Resiliency, Limits, And Moral Hazards In Software Engineering][slp].

This is the best talk I have ever given, and also by far the most important. You don’t need to be a software engineer or even to know all that much about software to appreciate this talk. (Some of the people I think need to hear it most are people who work *with* software engineers but who are not themselves software engineers!) I hope you will take the time to [watch it][slp]!

[slp]: https://www.youtube.com/watch?v=k7Jer1wwoDw

## Software development

- I landed a bunch of small-but-useful improvements to [Volta](https://github.com/volta-cli/volta/) this week. They ranged from getting [a useful debugging build](https://github.com/volta-cli/volta/pull/1784) up for [a particularly *weird* issue](https://github.com/volta-cli/volta/issues/1744) to [landing long-blocked pull requests](https://github.com/volta-cli/volta/pull/1292) to [simplifying some of our dependency infrastructure](https://github.com/volta-cli/volta/pull/1794) to [improving the <abbr title="user experience">UX</abbr> of certain failure cases](https://github.com/volta-cli/volta/pull/1786). Nothing ground-breaking, to be sure, but a lot of incremental progress! Hopefully we’ll be able to coordinate releasing the 2.0 in the next week or two (nothing too exciting there, just dropping support for some now end-of-life Linux distros!).

- I also made some improvements to the little `count-md` tool I built a little while back, so it performs even better than it did before, and started working out how to open source it. Right now its code is part of a larger project which I intend to keep *mostly* closed-source, but this little <abbr title="command line interface">CLI</abbr> tool is a perfect candidate for open-sourcing. The main tools on the table are [`git subtree`](https://manpages.debian.org/bookworm/git-man/git-subtree.1.en.html) and [josh workspaces](https://josh-project.github.io/josh/guide/workspaces.html). That’ll need some time to muck around with in its own right, though!

- I added the ability to post feed-only items to this site, which never appear directly on the site, including in the archives.[^1] The [approach I took](https://github.com/chriskrycho/v5.chriskrycho.com/commit/dbf0bd3b) is a bit janky, but I am trying not to invest *too* much in this site infrastructure when I would prefer to spend that time working on my own site builder.[^2]

## Music

Another nothing-to-report week. I might get to some composing this evening? We’ll see! Mostly a case here of deciding I needed to focus *hard* on job-hunting, and so dedicating the hours outside consulting to working on finding or applying to jobs *or* to open source software that can help make my case for me (see above!). That leaves evenings and weekends, just like when I had a full time “day job”. I am going to be working to find a good rhythm for it so it does not get lost!

## Writing

- My [review](https://www.thegospelcoalition.org/reviews/quiet-mind-suffer/) of <cite>A Quiet Mind to Suffer With</cite> went live at <cite>The Gospel Coalition</cite>. I actually wrote this months ago, but editorial takes time! You might also be interested in [my additional commentary](https://v5.chriskrycho.com/elsewhere/quiet-mind-to-suffer-with/) on the review. I have a *lot* more thoughts on the subject of the book; but doing it in a book review would only have worked at 3–4× the length and in a very different venue, I think!

- I finished my first round of revisions on the new chapter on async Rust I wrote for <cite>The Rust Programming Language</cite>! This was a huge bit of work, but I can safely say the revision is *much* stronger than the first pass. It is both much less flabby and at the same time actually covers more ground. Now to get other folks’ eyes on it!

- I got out one other short blog post earlier today, [Fast Tools are Wonderful](https://v5.chriskrycho.com/journal/fast-tools-are-wonderful/).

## Reading

Back to my <cite>The Lord of the Rings</cite> reread on the fiction front and my slow push through the <cite>Stanford Encyclopedia of Philosophy</cite> [entry](https://plato.stanford.edu/entries/aristotle-metaphysics/) on Aristotle’s metaphysics.

## Career/etc.

Made some *really* promising forward motion on one role, and had multiple other companies I had applied to reach out to schedule interviews. Next week is going to be *full* on this front, if the current schedule stands! This was a really encouraging, particularly coming as it did after a patch which had *not* been particularly encouraging.

One thing I can say for sure: cold emails *do* sometimes work—and I have had more luck on that front than I have with “through the front door” applications on the various normal job boards.




[^1]: They do have <abbr title="hypertext markup language">HTML</abbr> pages on the site so they can be deep linked, shared, indexed, etc.; but they aren’t accessible via normal *browsing*.

[^2]: Eleventy is… fine. I do not love it and never will, I think.
