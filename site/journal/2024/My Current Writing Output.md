---
title: On My Current Writing Output
subtitle: >
    Or, why mostly only “Read the Manual” posts lately.

date: 2024-11-16T08:49:00-0700

tags:
    - site meta
    - blogging
    - writing

summary: >
    I have lately only managed to publish my “Read the Manual” posts. Why: job searching, working on The Rust Programming Language Book, and more!

qualifiers:
    audience: >
        Readers, old and new, curious about the current and future direction of the site.

---

I realized, looking at [the archive][archive] of this site earlier and realized that I have published almost solely [Read the Manual][rtm] posts for the past two months. The only major exceptions were [race][race1] [reports][race2], my [recommendation of Foodnoms][foodnoms], my note on [not having as much time][time], and last night's [reflection][social-media] on how I do and do not use social media and, to some extent, this site.[^1] I have also managed my monthly music newsletter updates. But those Read the Manual posts *really* stand out as the one thing I am doing consistently in these pages. I thought it might be worth pausing briefly to write about why I have prioritized those, and why you haven't seen progress on or publication of other essays here for a bit, because this site is not usually quite so focused on, well, man pages.

[archive]: https://v5.chriskrycho.com/archive/
[rtm]: https://v5.chriskrycho.com/journal/read-the-manual/
[race1]: https://v5.chriskrycho.com/journal/2024-boulderthon-race-report/
[race2]: https://v5.chriskrycho.com/journal/2024-longview-half-marathon-race-report/
[foodnoms]: https://v5.chriskrycho.com/journal/foodnoms/
[time]: https://v5.chriskrycho.com/journal/time/
[social-media]: https://v5.chriskrycho.com/journal/note-on-social-media-topics/

There are a few major reasons for this shift:

Most importantly, one of my major ongoing projects has been writing a new chapter on async Rust for <cite>The Rust Programming Language</cite>, and revising other parts of the book for the upcoming Rust 2024 Edition. The new chapter is *only* ~15,600 words excluding all the code samples. (Only!) Some days along the way I have been working on supporting infrastructure for the book, but *many* days I spent my time writing. Spending hours a day nearly every work day writing has meant I do not have nearly as much writing energy left as I do on days when I spend my time coding instead. (The inverse is true, too: I *have* had more energy left for code; more on that below.)

Second, for a good chunk of this year, I have been focused on *other* writing projects of various sorts: preparing three different talks ([two][lambdaconf-1] for [LambdaConf][lambdaconf-2] and one for [StaffPlus][staffplus]), one [book review][tgc-review] at <cite><abbr title="The Gospel Coalition">TGC</abbr></cite>, and one other hopefully-forthcoming essay for another publication. Thus, even when I *have* been writing, it has often not been for this site.

[lambdaconf-1]: https://v5.chriskrycho.com/elsewhere/cutting-edge-of-versioning/ "The Cutting Edge of Versioning (LambdaConf 2024)"
[lambdaconf-2]: https://v5.chriskrycho.com/elsewhere/seeing-like-a-programmer/ "Seeing Like a Programmer (LambdaConf 2024)"
[staffplus]: https://v5.chriskrycho.com/elsewhere/substrate-engineering/ "StaffPlus NY 2024: Substrate Engineering"
[tgc-review]: https://www.thegospelcoalition.org/reviews/quiet-mind-suffer/ "Review: A Quiet Mind to Suffer With"

Third, I have been working on finding a new full-time job. This year’s various kinds of consulting have been great, but it has been apparent for quite some time that a more traditional full-time role is a better fit for me and for our family. Finding a job is an enormous amount of work and I have found it incredibly mentally draining even beyond the amount of time it takes. When I get to the end of a day full of consulting, job applications, and interview practice, I often feel quite wrung out—and the more so after then spending a bunch of (generally very good, but not necessarily rejuvenating) time with family, doing household chores, and so on.

Fourth, as I noted above, because a fair bit of my consulting work has been writing, when I *do* have extra mental energy at the end of the day, I have often wanted to spend it on coding instead. Some of that has been working on experiments around programming language implementation. Some of it has been chipping away very slowly at building my own bespoke website generator. Some of it has been random bits of open source maintenance. None of those things, though, are writing either traditional journal-type entries or long-form essays for this site!

Long story short, then: I have done a lot of writing this year, but (it feels like) less of it *here* than usual; and I have done a lot of other kinds of work with my non-work time in the evenings and weekends instead.

Why have the Read the Manual entries stuck, then (as my weekly updates did not)? Largely because while I do not have a *ton* of time or energy available for blogging, I do want to keep it  up, and I love “learning in public.” It has been a great discipline for me to get to know the tools on my system a bit better, and I think and hope it has been a legitimately useful series for other folks as well. Keeping that kind of project on a schedule—keeping myself “honest” as it were by committing to publish it week in and week out—helps me not drop the habit entirely, as it would be all too easy to do. How long will I keep it up? Hard to say! Certainly through the end of the year, and perhaps longer, but only as long as I deem it a good use of my time and your attention.

I do have a couple of good long essays bubbling, and I do make progress on them here and there. If, as I hope, I land a more traditional full time job here shortly, I expect my mental space first to all-but-evaporate as I take on learning a new domain, and then later to settle back down into something more resembling older versions of this site, as I hopefully end up spending a lot more time building software and a lot less writing.[^2] Given the number of variations and iterations this site has seen over the years, though, I expect I will surprise even myself with the details.

---

One funny note as an aside: I *feel* like I have written less than usual this year. It turns out I have already written more words in 2024 than I did in 2023![^3]



[^1]: actually largely pulled over *from* social media

[^2]: For all that I have *loved* working on <cite><abbr title="The Rust Programming Language">TRPL</abbr></cite>, I have also learned that *purely* focusing on writing is not my favorite. I like a much higher mix of writing code and then writing words as a secondary task!

[^3]: I ran `rg -l0 'date: 2024' | xargs -0 count-md` in the root of the repo for this site, using my [count-md][c-md] tool.

[c-md]: https://v5.chriskrycho.com/elsewhere/count-md/
