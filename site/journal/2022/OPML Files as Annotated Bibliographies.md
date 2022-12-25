---
title: OPML Files as… Annotated Bibliographies?
subtitle: >
  What if feed readers let you you make these old <abbr>XML</abbr> files into blog rolls, too?
qualifiers:
  audience: >
    Other people thinking about how communicating on the web might work *better*, open to experiments, interested in [new avenues in 2023](https://www.robinsloan.com/lab/new-avenues/).
  epistemic: >
    Literally just came up with this idea. But I think it’s a good one? <abbr>RSS</abbr> could use to improve!
thanks: >
  [Matt Webb](https://interconnected.org)’s [blog](https://interconnected.org/home/) is full of this kind of idea-generation, which reminded me that I could just put this idea out there; [Robin Sloan](https://www.robinsloan.com)’s call for [*exploration*](https://www.robinsloan.com/lab/new-avenues/) again on the web in 2023 (linked in the text) got the gears spinning.
date: 2022-12-24T19:29:00-0700
tags:
  - new avenues
  - web development
  - ideas

---

I have a to-do item which pops up once a quarter:

> Update `subscriptions.opml`

It reminds me to go update [this file](https://cdn.chriskrycho.com/file/chriskrycho-com/subscriptions.opml), which has a list of all the feeds I’m subscribed to in my feed reader.[^1] You can, if you like, treat it as an old-school [blog roll](https://blogroll.org/what-are-blogrolls/); that’s sort of what it’s there for. But: it’s not a very good blog roll! Like a lot of things <abbr title="really simple syndication">RSS</abbr> and <abbr>RSS</abbr>-adjacent, <abbr title="outline processor markup language">OPML</abbr> files are clunky Web <span style="font-feature-settings: 'onum' 0;">1.0</span> artifacts—oriented for machines first, nerds second, normal people never.

It doesn’t *have* to be “normal people never”, though.

We *can* all hand-maintain our blog rolls and link gardens, of course. There’s something to that, too. Hand-maintained blog rolls would afford us the opportunity to engage in a great deal more careful [curation](https://v5.chriskrycho.com/journal/what-if-pagerank-was-a-mistake/), and to have a distinction between our private reading choices and our public recommendations. (“Retweet ≠ endorsement,” but for what we subscribe to.) That gets at the other half of this idea, though: it would be great if we could treat our subscription lists as annotated bibliographies, to say with them:

> These are the things I consistently read, and if you want to drink from the same wells I’m drinking from, this is a good start—and more than that, here’s *why* I drink from these wells.

Anyone who has ever come across a *good* annotated bibliography knows: it can often be just as important for really following along with a well-read thinker as reading whatever they have written themselves.[^2] Sometimes the most valuable thing in a book *is* its bibliography!

My <abbr>OPML</abbr> file doesn’t work for that right now. But… it *could*!There’s no reason a feed reader service couldn’t let you annotate your feeds and make them public. How cool would it be for me to be able to add little notes to any given feed so you can see what I think about it, why I think it’s worth reading? You can imagine that living at places like `chriskrycho.feedbin.com` or on custom domains like `annotated-blogroll.chriskrycho.com` or whatever.

Go a step further: acknowledge that some subscriptions *do* make sense to keep private. If you have the ability to publish this kind of thing, having one more column in your database to say “This feed is included in the annotated blog roll; that one is not” isn’t a big deal. It makes it possible for a single tool to do both of the jobs I want it to do: *This is what I read; and this is (therefore!) also the source of my list to share with others about what I read.*

<aside>

Sometimes, adding jobs to tools makes them worse at the job they already do. We should never forget that. In this case, though, I think it makes it *better* at both jobs: the blog-roll feature would encourage, by its very existence, a bit of thought about why you keep reading something. If you wouldn’t recommend it to others… maybe that’s fine, or maybe it’s worth dropping? Bonus: I think you could make this a backwards-compatible extension to the existing <abbr>OPML</abbr> design for exporting and importing feed subscription lists. That would make this capabilitiy *transferrable*—which is one of the best things about <abbr>RSS</abbr> and <abbr>OPML</abbr> today: you *aren’t* locked in.

</aside>

You have to think this through to do it well, of course. You have to pick good (meaning: user-friendly, not data-friendly) defaults and system behaviors: no one publishes their list without choosing to; the default is that every subscription is private by default; you have to jump through hoops to say “Yes, I really truly for sure want every feed to be public” if you don’t want to enable it on a per-subscription basis; etc.

Given all of those, though, wouldn’t it be neat if our existing tools could grow just a *little* bit of capability so that our subscriptions lists could work as annotated bibliographies?

---

If you build this, *please tell me.*



[^1]: For the better part of a decade now, my feed reader has been [Feedbin](https://feedbin.com). There are others, which are also good, but Feedbin has been rock solid and is a great price ($30/year or $3/month, no ads ever).

[^2]: I would love, eventually, to make my [library section](https://v5.chriskrycho.com/library/) act more like that. I need to figure out how to build that into the next revision of this site!