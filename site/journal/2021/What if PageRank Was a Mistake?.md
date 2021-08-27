---
title: What if PageRank Was a Mistake?
subtitle: >
    A provocation on our algorithmic present and a curational (curative?) alt-history.
qualifiers:
    audience: >
        People who care about the ethics and implications of technology—and fans of alternative histories.
    epistemic: >
        A provocation and a thought experiment.
tags:
    - software
    - technology
    - ethics
date: 2021-08-27T16:10:00-0600
updated: 2021-08-27T18:57:00-0600
summary: >
    In the early days of the web, PageRank seemed like magic: a clean win. But maybe it wasn’t. What kind of world did we lose when we walked away from curation?

---

In the early days of the web, [Page Rank][pr] seemed like magic: a clean win. What were the downsides? Open up Google, type in a query, and just like that you would see an *automatically* crowdsourced[^anac] set of results, based on how much other people linked to them. As more than a few people have noted recently, though,[^example] results (on Google in particular but also search engines in general) have degraded. Gamification of results started early and has only accelerated in the last decade. What if—and I know this is crazy, but stay with me—lists of links built by hand were actually better? Not in spite of, but precisely because of their inability to scale, and therefore to be *gamed* at scale?

[pr]: https://en.wikipedia.org/wiki/PageRank

I am left imagining a world where Larry and Sergey never had their idea, or never made it popular, and the algorithmic search engine never took off, and we lived instead in a world where [curation][sc] ruled: hand-tuned lists of the best places to find answers to the best question in an actual [web of links][surfing], as [Tim][tbl] (and [Ted][tn] and arguably even [Vannevar][vb]) intended?

[sc]: https://stephencarradini.com/curation-essay/
[surfing]: https://v4.chriskrycho.com/2014/the-end-of-surfing.html
[tbl]: https://en.wikipedia.org/wiki/Tim_Berners-Lee
[tn]: https://en.wikipedia.org/wiki/Ted_Nelson
[vb]: https://en.wikipedia.org/wiki/Vannevar_Bush

---

A web built first of all on curation would not have magically solved all our problems. If anything, it would have been that much easier to buy your way onto the “best of” lists and stay there. The whole point of PageRank was that it was a fair and impartial algorithm, not something which could be biased by conscious human choices. Until, of course, we realized that it *was* biased from the outset by the choices of its creators, and that those choices could in turn be exploited.

(*No* technology is unable to be exploited. This is why, when thinking about technologies we create, we should always ask not *if* it will be abused, but rather: by whom, and how.)

But the distortions would have been *different*. They would have been, in some sense, more traditional: the normal human foibles, expressed in `<a>` tags, magnified perhaps a little over the old idea of a physical directory (because space is no longer a limitation)—but not much. Not to the hubristic scale of [Google’s current dream][google]:

> Our mission is to organize the world’s information and make it universally accessible and useful.

[google]: https://web.archive.org/web/20210827171624/https://about.google/

The world’s information! All of it! And if that were not enough: to make it not only universally *accessible* (a debatable goal to say the least: *should* everything be accessible everywhere to everyone?) but *useful*: as if the utility of information were something to be determined, defined, and demarcated by a single megacorporate entity. Maybe hand-curated links would have been less stupid than that. Or at least: more distributedly-stupid, less powerfully-stupid, and therefore actually less *bad*.

I wonder.

---

**Update, evening of 2021/08/27:** a couple interesting bits from some colleagues after I shared this [on LinkedIn][li]:

[li]: https://www.linkedin.com/posts/chriskrycho_what-if--was-a-mistakesympolymathesy-activity-6837146261519499264-2p9x

- [Caitlin O’Connor][co] pointed out that [PageRank][pr] itself is fully general mathematically—it’s just *eigenvectors* after all![^eigenvectors]—so it’s the Google implementation (and decades-long elaboration) that’s particularly interesting here.

- [Adam Hobson][ah] reminded me of [Mahalo][m], which was an actual take at re-instantiating this alt-history back in the last 2000’s, and also shared [Benedict Evans’][be] 2016 dictum (from [Lists are the New Search][lists]):

    > All curation grows until it requires search. All search grows until it requires curation.

[co]: https://www.linkedin.com/in/caitlinoconnor723/detail/contact-info/
[ah]: https://adamhobson.com
[m]: https://en.wikipedia.org/wiki/Mahalo.com
[be]: https://www.ben-evans.com/
[lists]: https://www.ben-evans.com/benedictevans/2016/1/31/lists-are-the-new-search


[^anac]: This usage is, of course, something of an anachronism: the internet-age neologism “crowdsourcing” [was coined in 2005][coinage].

[coinage]: https://www.nytimes.com/2009/02/08/magazine/08wwln-safire-t.html

[^example]: See, for example, [this tweet thread][quality]—with a ThreadReader unroll [here][tr], though who knows for how long. Another provocation for another day: imagine if we, uhh, *blogged*?

[quality]: https://twitter.com/williamrblack/status/1429962733055881218
[tr]: https://threadreaderapp.com/thread/1429962733055881218.html

[^eigenvectors]: …which, like me, you might not remember from your linear algebra or physics. In an amusing bit of happenstance, I just re-taught myself what eigenvectors and eigenvalues were two nights ago, though!