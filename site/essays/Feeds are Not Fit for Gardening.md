---
title: Feeds are Not Fit for Gardening
subtitle: >
  —at least, in their current instantiations with <abbr>RSS</abbr>, Atom, <abbr>JSON</abbr> Feed, etc.
qualifiers:
  audience: >
    Tinkerers, spec-writers, protocol-builders, gardeners: people willing to walk down [new avenues](https://www.robinsloan.com/lab/new-avenues/) in 2023—people, that is, who are up for revisiting some of the assumptions which have governed the web for the past few decades.
  context: >
    Reading Maggie Appleton’s essay [A Brief History & Ethos of the Digital Garden](https://maggieappleton.com/garden-history) and Mike Caufield’s talk–essay [The Garden and the Stream: A Technopastoral](https://hapgood.us/2015/10/17/the-garden-and-the-stream-a-technopastoral/).
draft: true
---

==TODO: write an introduction!==

A thought I’ve had bouncing around for a while, most of all since starting to think about [Obsidian Publish][op] and similar:

<div class=callout>

*All existing feed systems broadly assume “streams”, and are difficult if not impossible to use with “gardens”.*

</div>

Here’s what I mean by that: <abbr title="really simple syndication">RSS</abbr>, Atom, and [<abbr title="JavaScript Object notation">JSON</abbr> Feed][json-feed] all notionally include the idea of being able to mark items as having been updated, but in practice that ability is little-used, deeply hobbled, and therefore largely irrelevant. That in turn means that the existing feed specifications serve reasonably well to publish *new items* but very poorly to notify subscribers about changes to *existing items*. They are therefore very poorly suited for “gardens” in the sense described by Appleton, Caufield, and others.

[op]: https://obsidian.md/publish
[garden]: https://maggieappleton.com/garden-history
[and-stream]: https://hapgood.us/2015/10/17/the-garden-and-the-stream-a-technopastoral/
[json-feed]: https://jsonfeed.org


## Feeds today

There are a host of basic, ecosystem-wide specification/protocol-level reasons why this is so.

First, not all feed readers make active use of that information even when it is available. A real-world example: [Feedbin][feedbin]—long my preferred feed reader service—*does* correctly handle updates, even having a dedicated section in its sidebar for it; but [NetNewsWire][nnw], my current go-to app for reading the feeds I subscribe to in Feedbin does *not*. While NetNewsWire will update the text it displays for a given item, it provides no signal at all that the item has changed, and therefore that you might want to revisit it. Notably, NetNewsWire is normal here; Feedbin is the outlier.

[feedbin]: https://feedbin.com
[nnw]: https://netnewswire.com

Second, many publishing systems do not use updates meaningfully anyway. Well behaved feed generators *can* update old items, including an "updated at" time stamp, but they don’t have to, and not all do. That concomitantly decreases the value of implementing support for handling updates. This reinforces the tendency for feed reader applications to ignore updates.

Third, the existing feed specifications all handle updates differently. <abbr>RSS</abbr> has a single `pubDate` value and Atom a single `updated` value, the idea in both cases apparently being that the distinction between when an item was first published and when it was most recently updated doesn't matter (The specs don’t say *why*, though, so that’s just my hypothesizing.) <abbr>JSON</abbr> Feed sensibly supplies both `date_published` and `date_modified`.

That means that a feed reader service or application like Feedbin or NetNewsWire needs to be a lot smarter, though. It cannot rely on having <abbr>JSON</abbr> Feed items (still by far the minority), nor on those items correctly using `date_modified` (since both `date_published` and `date_modified` are optional). Net, the reader service has to keep track of previous versions itself using some kind of caching mechanism.

This further increases the cost of implementing handling for updates for feed readers, which again decreases the likelihood they will do so.

Fourth, the updates pushed out to a feed item are often trivial. While some changes are important, many are incidental: correcting a typo, updating the phrasing in a particular paragraph, etc.—the kinds of things which may help a bit with *polish* but don’t fundamentally affect the *argument* of a given post/essay/etc.

This is so notwithstanding the specifications’ own allowances for just this issue! The <abbr title="World Wide Web Consortiom">W3C</abbr> [description][atom-w3c] for the Atom `<updated>` tag makes this explicit:

> This value need not change after a typo is fixed, only after a substantial modification.

[atom-w3c]: https://validator.w3.org/feed/docs/atom.html#optionalEntryElements

However, tools have to support the distinction between “a typo” and “a substantial modification”. Most do not. Indeed, *no* publishing system I am aware of has any native mechanics for this distinction—no doubt in part because it is irrelevant to nearly all consumers, given reader apps’ general lack of support for the feature.

Fifth, there are no mechanics for specifying exactly what changed in a given update. As with the divergence between the specs , this means that feed readers have to do extra work to be able to provide their users with info about what actually changed. They need to cache the previous version of the story and then do some kind of reasonably useful word-by-word diff between the various revisions.

Finally, many consumers of feeds—a feed reader, a podcast app, [IndieWeb][iw] tools built on feeds, and so on—implicitly or explicitly reject feeds which are too large. This is generally a simple practical consideration: If you run a service which consumes many feeds, the sheer bandwidth involved becomes prohibitively expensive. (The original <abbr>RSS</abbr> 1.0 spec also explicitly recommended a maximum of 15 items per feed, and its pre-1.0 versions *mandated* that. Although those decades-old specs are hardly binding today, norms like that change only slowly, if at all.) *This* website’s untruncated feed is over 2<abbr>MB</abbr> and it has only a few hundred entries.[^truncate] A more active or larger website would blow past those limits in a matter of months, if not weeks. Even if I wanted to use the limited ecosystem support for updates, in practice I cannot.

[iw]: https://indieweb.org

In sum, then, the current feed ecosystem—specifications and implementations alike—thus has only the barest support for “updates”. They feel bolted on, an afterthought. There is poor support for generating them, reading them, and even—perhaps most fundamentally—for transmitting them.

This systemic gap falls out—mostly implicitly—from the design of the specifications. <abbr>RSS</abbr> and <abbr>JSON</abbr> Feed both make their update fields optional, while Atom requires each `<entry>` to have an `<update>` value; but *all* of them implicitly assume a temporal stream, and reading their specs makes this obvious.

We can start with <abbr>RSS</abbr>, the progenitor of all later feed specs. The name gives it away from the start: <abbr>RSS</abbr> is “really simple syndication”—syndication’s long history being about sharing *news items* to multiple publications. Thus, [the spec][rss] describes its `<item>` tag like this:

> A channel may contain any number of \<item\>s. An item may represent a \"story\" \-\- much like a story in a newspaper or magazine; if so its description is a synopsis of the story, and the link points to the full story.

[rss]: https://www.rssboard.org/rss-specification

This does not mandate a stream, but it deeply implies one. We see the same in the Atom spec: it is likewise defined as [The Atom Syndication Format][atom]: syndication again. As with <abbr>RSS</abbr>, the spec explicitly states its stream-oriented purpose:

> The primary use case that Atom addresses is the syndication of Web content such as weblogs and news headlines to Web sites as well as directly to user agents.

[atom]: https://validator.w3.org/feed/docs/rfc4287.html

No surprise, [the <abbr>JSON</abbr> Feed spec][json-feed] has a similar blurb:

> Think of a blog or microblog, Twitter or Facebook timeline, set of commits to a repository, or even a server log. These are all lists, and each could be described by a feed.

Notice that these are all—more or less explicitly—temporal streams. This focus is perfectly reasonable; it was not a failing of the specifications’ authors but rather a success. Feeds do the job they were designed for, and do it well. But that job was syndication of streams, not invitations to come see how a garden has changed and grown.

[^truncate]: A few years ago, I had to [start truncating][sha] the feeds from my own sites just to make them work with [micro.blog][mb], which has an unofficial 1<abbr title="megabyte">MB</abbr> limit on the size of the feeds it would consume.

[sha]: https://github.com/chriskrycho/v5.chriskrycho.com/commit/50f7423d
[mb]: https://micro.blog


## Hacks

- publishing an item which represents links to the most recent set of updates, with author/publisher control over what goes into it
  - Obsidian Publish could potentially do this; there may be plugins which *do*?
- splitting up the feeds:
  - “garden” entries
    - hack the size by making the body primarily a pointer back to the content, with an explanation of *why* (“this is garden” content), along with a summary of the most recent changes, allowing more items before hitting size limits
    -
  - “stream” entries
    - always full text
    - minimal or no expectation of updates
    - it’s okay for them to “fall out” of the update window

## A New Kind of Feed

Should we even call this new thing a “feed”? Perhaps not.
