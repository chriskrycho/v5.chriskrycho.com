---
title: Analytics for Sites With Tech-Savvy Audiences
subtitle: >
  I compared Netlify’s numbers with Fathom’s. They are… very different.

summary: >
  I set up a small natural experiment to compare the traffic I get to my website on Netlify (server-side analytics) and Fathom (client-side analytics). They are very different numbers.

qualifiers:
  audience: >
    Other people with highly-technical savvy audiences who want to understand what kind of traffic they actually have.
	  
date: 2023-08-12T14:04:00-0600
image: https://cdn.chriskrycho.com/images/analytics.png

---

At the end of July, I set up both [Fathom][f] and [Netlify Analytics][na] for this site, because I wanted to develop a sense of how big my ongoing audience is (setting aside big spikes from things like being on the first page of Hacker News for some article or another). I chose these two because they are both totally privacy-preserving. Fathom runs as <abbr title="JavaScript">JS</abbr> in the browser; Netlify runs on Netlify’s servers; but both track nothing about you—only the pages which got visited and what the source was if that information was sent along.

[f]: https://usefathom.com
[na]: https://www.netlify.com/products/analytics/

<aside>

I do not care *which* pieces get traffic, and will keep writing what I write because these are the things I care about—but I do sometimes like to check in on what kind of overall audience I do have. If at some point I decide to write a book, to actually focus on writing and teaching as a source of income, etc., that is useful info to have.

</aside>

The question I wanted to answer by setting up both Fathom and Netlify Analytics was straightforward: How much fall-off is there in using client vs. server-side analytics here? I expected there to be *some* difference between the two, because my writing skews to the technical and thus my audience to the kinds of folks who are likely to have a content-blocker installed. What I did not expect was just how large the difference would be.

Netlify measures *five times* as much traffic as Fathom does. Put another way: Fathom sees only 20% of what Netlify sees coming to my site—it is blind to 4 out of every 5 page views and visitors. (That holds equally for high-traffic days and normal-traffic days, and for high- and low-traffic pages.) My audience does not skew toward tech-savvy types with content blockers installed: it is *dominated* by them.

Your numbers likely look different from mine unless you have a similarly tech-dominant site. But you should check—especially if (unlike me) you actually make your living in any way directly related to the volume of traffic to your site.
