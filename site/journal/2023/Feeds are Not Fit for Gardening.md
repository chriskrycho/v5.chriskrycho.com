---
title: Feeds are Not Fit for Gardening
subtitle: >
  —at least, in their current instantiations with <abbr>RSS</abbr>, Atom, <abbr>JSON</abbr> Feed, etc.
draft: true
---

Reading Maggie Appleton’s essay [A Brief History & Ethos of the Digital Garden][garden] brought back to the top of my mind a thought I’ve had bouncing around for a while, most of all since starting to think about [Obsidian Publish][op] and similar:

*All existing feed systems broadly assume “streams”, and are difficult if not impossible to use with “gardens”.*

Here’s what I mean by that: <abbr title="really simple syndication">RSS</abbr>, Atom, and [<abbr title="JavaScript Object notation">JSON</abbr> Feed][json-feed] all notionally include the idea of being able to mark items as having been updated, but in practice that ability is little-used and therefore largely irrelevant. That in turn means that the existing feed specifications serve reasonably well to publish *new items* but very poorly to notify subscribers about changes to *existing items*. They are therefore very poorly suited for “gardens” in the sense described by Appleton.

Put

In the rest of this post, I want to dig into two questions:

1. Why, and how, are existing feed specifications biased so strongly toward streams?
2. What kinds of changes in the design of these protocols would be necessary to support “garden”-style work?


## The existing specifications

First, there are a host of basic, ecosystem-wide specification/protocol-level reasons why this is so:

1. *Not all feed readers make active use of that information even when it is available.* A real-world example: [Feedbin][feedbin]—long my preferred feed reader service—*does* correctly handle updates, even having a dedicated section in its sidebar for it; but [NetNewsWire][nnw], my current go-to app for reading the feeds I subscribe to in Feedbin does *not*. While NetNewsWire will update the text it displays for a given item, it provides no signal at all that the item has changed, and therefore that you might want to revisit it. Notably, NetNewsWire is normal here; Feedbin is the outlier.

2. *Some publishing systems do not use updates meaningfully anyway.* Well behaved feed generators *can* update old items, including an "updated at" time stamp, but they don’t have to, and not all do. That concomitantly decreases the value of implementing support for handling updates. This reinforces (1).

3. *The existing feed specifications all handle updates differently.* <abbr>RSS</abbr> has a single `pubDate` value and Atom a single `updated` value, the idea in both cases apparently being that the distinction between when an item was first published and when it was most recently updated doesn't matter (The specs don’t say *why*, though, so that’s just my hypothesizing.) <abbr>JSON</abbr> Feed sensibly supplies both `date_published` and `date_modified`.

    That means that a feed reader service or application like Feedbin or NetNewsWire needs to be a lot smarter, though. It cannot rely on having JSON Feed items (still by far the minority), nor on those items correctly using `date_modified` (since both `date_published` and `date_modified` are optional). Net, the reader service has to keep track of previous versions itself using some kind of caching mechanism.

    This further increases the cost of implementing handling for updates for feed readers, which again serves to reinforce (1).

4. *The updates are often trivial.* While some changes are important, many are incidental: correcting a typo, updating the phrasing in a particular paragraph, etc.—the kinds of things which may help a bit with *polish* but don’t fundamentally affect the *argument* of a given post/essay/etc.

    This is so notwithstanding the specifications’ allowances for just this issue! The description for an Atom feed’s `entry.updated` field explicitly notes: “This value need not change after a typo is fixed, only after a substantial modification.” However, tools have to support that, and most do not. Indeed, *no* publishing system I am aware of has any native mechanics for this distinction—but that is no doubt in part because it is irrelevant to nearly all consumers, given (1).

5. *There are no mechanics for specifying exactly what changed in a given update.* As with (3), this means that feed readers have to do extra work to be able to provide their users with info about what actually changed. They need to cache the previous version of the story and then do some kind of reasonably useful word-by-word diff between the various revisions.

So just at the level of the specifications and their normal implementations, “updates” to items are barely a feed. Then, as I said at the otp

More important than any of those (very real) issues at the level of the specifications, though, is that the feed systems assume a date-ordered list of entries. <abbr>RSS</abbr> and Atom make this explicit in their specifications. Each Atom `<entry>`. The original <abbr>RSS</abbr> 1.0 spec also explicitly recommended a maximum of 15 items per feed, and its pre-1.0 versions *mandated* that. Although those decades-old specs are hardly binding today, they set a norm for the ecosystem which is still widely followed—not least because feeds can otherwise become extremely large.[^truncate]


[garden]: https://maggieappleton.com/garden-history
[op]: https://obsidian.md/publish
[json-feed]: https://jsonfeed.org
[feedbin]: https://feedbin.com
[nnw]: https://netnewswire.com

[^truncate]: A few years ago, I had to [start truncating][sha] the feeds from my own sites just to make them work with [micro.blog][mb], which has an unofficial 2 megabyte limit on the size of the feeds it would consume.

[sha]: https://github.com/chriskrycho/v5.chriskrycho.com/commit/50f7423d
[mb]: https://micro.blog


## Alternative protocol designs
