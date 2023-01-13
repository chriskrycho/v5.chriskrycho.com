---
title: Feeds are Not Fit for Gardening
subtitle: >
  —at least, in their current instantiations with <abbr>RSS</abbr>, Atom, <abbr>JSON</abbr> Feed, etc.
qualifiers:
  audience: >
    Tinkerers, spec-writers, protocol-builders, gardeners: people willing to walk down [new avenues](https://www.robinsloan.com/lab/new-avenues/) in 2023—people, that is, who are up for revisiting some of the assumptions which have governed the web for the past few decades.
  context: >
    Reading Maggie Appleton’s essay [A Brief History & Ethos of the Digital Garden](https://maggieappleton.com/garden-history) and Mike Caufield’s talk–essay [The Garden and the Stream: A Technopastoral](https://hapgood.us/2015/10/17/the-garden-and-the-stream-a-technopastoral/).
thanks: >
  Essays and blog posts over the years by [Alan Jacobs](http://ayjay.org), [Robin Sloan](https://www.robinsloan.com), and [Maggie Appleton](https://maggieappleton.com) provided many of the specific ingredients in [this particular stew](http://v3.chriskrycho.com/art/and-the-stew-tastes-good/), and you can think of this as a response to (perhaps an entry in?) Robin’s call for [New Avenues in 2023](https://www.robinsloan.com/lab/new-avenues/) in particular. I am indebted to many others whose own writing is no doubt part of the mix as well. The current generation of feed tools, though criticized as unfit for one particular purpose here, have done a great deal to move the open web ecosystem forward, so credit especially to [Dave Winer](http://scripting.com) for <abbr>RSS</abbr>, the unruly group behind Atom, and [Manton Reece](https://www.manton.org) and [Brent Simmons](https://inessential.com) for <abbr>JSON</abbr> Feed. [Stephen Carradini](https://stephencarradini.com) provided helpful feedback on early drafts.
draft: true
---

==TODO: write an introduction!==

A thought I’ve had bouncing around for a while, most of all since starting to think about [Obsidian Publish][op] and similar:

<div class=callout>

*All existing feed systems broadly assume “streams”, and are difficult if not impossible to use with “gardens”.*

</div>

Here’s what I mean by that: <abbr title="really simple syndication">RSS</abbr>, Atom, and [<abbr title="JavaScript Object notation">JSON</abbr> Feed][json-feed] all notionally include the idea of being able to mark items as having been updated, but in practice that ability is little-used, deeply hobbled, and therefore largely irrelevant. That in turn means that the existing feed specifications serve reasonably well to publish *new items* but very poorly to notify subscribers about changes to *existing items*. They are therefore very poorly suited for “gardens” in the sense described by Appleton, Caufield, and others.

[op]: https://obsidian.md/publish
[json-feed]: https://jsonfeed.org


## Feeds today

There are a host of basic, ecosystem-wide specification/protocol-level reasons why this is so.

First, not all feed readers make active use of that information even when it is available. A real-world example: [Feedbin][feedbin]—long my preferred feed reader service—*does* correctly handle updates, even having a dedicated section in its sidebar for it; but [NetNewsWire][nnw], my current go-to app for reading the feeds I subscribe to in Feedbin does *not*. While NetNewsWire will update the text it displays for a given item, it provides no signal at all that the item has changed, and therefore that you might want to revisit it. Notably, NetNewsWire is normal here; Feedbin is the outlier.

[feedbin]: https://feedbin.com
[nnw]: https://netnewswire.com

This has a significant downside even for stream-type content. News publishers and blog authors alike regularly make meaningful edits to their content. Many a news story bears the stamp of changes—sometimes changes critical to key points in the story!—after publishing:

> A previous version of this article said… It has been corrected to say… We apologize for the error.

Unless you happen to come back to the article, though, it is unlikely you will see that—and all the more so if you read it via a feed, because such changes are often not surfaced *at all*, still less highlighted.

Second, many publishing systems do not use updates meaningfully anyway. Well behaved feed generators *can* update old items, including an "updated at" time stamp, but they do not have to, and not all do. (This is another reason that you are unlikely to see corrections appear in your news reader.) That concomitantly decreases the value of implementing support for handling updates. This reinforces the tendency for feed reader applications to ignore updates.

Third, the existing feed specifications all handle updates differently. <abbr>RSS</abbr> has a single `pubDate` value and Atom a single `updated` value, the idea in both cases apparently being that the distinction between when an item was first published and when it was most recently updated doesn't matter (The specs don’t say *why*, though, so that’s just my hypothesizing.) <abbr>JSON</abbr> Feed sensibly supplies both `date_published` and `date_modified`.

That means that a feed reader service or application like Feedbin or NetNewsWire needs to be a lot smarter, though. It cannot rely on publishers updating `pubDate` in <abbr>RSS</abbr> or `updated` in Atom; nor on having <abbr>JSON</abbr> Feed items, since they are still by far the minority; nor on those items correctly using `date_modified`, since both `date_published` and `date_modified` are optional. Net, the reader service has to keep track of previous versions itself using some kind of caching mechanism.

This further increases the cost of implementing handling for updates for feed readers, which again decreases the likelihood they will do so.

Fourth, the updates pushed out to a feed item are often trivial. While some changes are important, many are incidental: correcting a typo, updating the phrasing in a particular paragraph, etc.—the kinds of things which may help a bit with *polish* but don’t fundamentally affect the *argument* of a given post/essay/etc.

This is so notwithstanding the specifications’ own allowances for just this issue! The <abbr title="World Wide Web Consortiom">W3C</abbr> [description][atom-w3c] for the Atom `<updated>` tag makes this explicit:

> This value need not change after a typo is fixed, only after a substantial modification.

[atom-w3c]: https://validator.w3.org/feed/docs/atom.html#optionalEntryElements

However, tools have to support the distinction between “a typo” and “a substantial modification”. Most do not. Indeed, *no* publishing system I am aware of has any native mechanics for this distinction—no doubt in part because it is irrelevant to nearly all consumers, given reader apps’ general lack of support for the feature.

Fifth, there are no mechanics for specifying exactly what changed in a given update. As with the divergence between the specs , this means that feed readers have to do extra work to be able to provide their users with info about what actually changed. They need to cache the previous version of the story and then do some kind of reasonably useful word-by-word diff between the various revisions.

Finally, many consumers of feeds—a feed reader, a podcast app, [IndieWeb][iw] tools built on feeds, and so on—implicitly or explicitly reject feeds which are too large. This is generally a simple practical consideration: If you run a service which consumes many feeds, the sheer bandwidth involved becomes prohibitively expensive. (The original <abbr>RSS</abbr> 1.0 spec also explicitly recommended a maximum of 15 items per feed, and its pre-1.0 versions *mandated* that. Although those decades-old specs are hardly binding today, norms like that change only slowly, if at all.) *This* website’s untruncated feed is over 2<abbr>MB</abbr> and it has only a few hundred entries.[^truncate] A more active or larger website would blow past those limits in a matter of months, if not weeks. Even if I wanted to use the limited ecosystem support for updates, in practice I cannot.

[iw]: https://indieweb.org

<aside>

This problem is exacerbated by tensions around the portion of each item included in the feed. A feed is most useful to readers when each entry contains the full content, because they do not have to leave the reader app to read the article. At the same time, providing excerpts dramatically reduces the size, which again is potentially important for reducing the bandwidth costs to both publisher and consumer of the feed. For some kinds of publishers, providing excerpts can also have a secondary benefit: it prompts users to click through to the publication’s own site, which is often important for the publication’s ability to make money on “traditional” ad-supported models. This tension has provoked a small battle between reader services and publishing sites—a microcosm of the greater fight across the web ecosystem—where reader services often attempt to pull the full content of a linked item even when the feed itself includes only a summary, and publications make it more or less difficult to retrieve that content programmatically. Alternative funding models like subscriptions allow alternative solutions to these problems, including pay-walled feeds with full content.

Even for publishers who are not trying to make money off their writing, there are reasons to want a user to click through. That might be as simple as care for the presentation of a given work, ranging to full-on per-entry art direction. Consider, for example: this paragraph is part of an *aside*, and is presented in a way designed to call attention to its distinctive relationship to the rest of the text. Many readers do not render `<aside>` at all! That goes even further for my "note" blocks, which are set off as visually distinct (with affordances for screen readers and other accessibility tools) in their own way on my site; all of that is lost entirely in feed readers. Those considerations also might go further into things feed readers not only do not but *cannot* do. Some of the best of what digital media offer over print comes in the form of embedded illustrations or animations which take advantage of the ability to run *programs* as part of a document. Consider for example [Bartoz Ciechanowski](https://ciechanow.ski)’s essays, which make extensive use of some of the most advanced capabilities of modern web browsers. Well-behaved reader apps do not *and should not* run arbitrary JavaScript, though.

</aside>

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

Notice that these are all—more or less explicitly—designed for temporal streams. This focus is perfectly reasonable; it was not a failing of the specifications’ authors but rather a success. Feeds do the job they were designed for, and do it well. But that job was syndication of streams, not invitations to come see how a garden has changed and grown.

This is one reason that even many blogs whose authors explicitly think of them as [gardens][ayjay] are effectively write-only. Each entry is atomic—not (only) in the [Zettelkasten][z] sense that they represent just
a single discrete idea, but also in the sense that they represent only a single point in time. That temporal atomicity can make a stream-style site useful for tracing the development of an author’s thought, if one is so inclined. (More on that below.) It necessarily means, though, that individual atoms are not *sprouts*, growing into more fully-formed versions of the thought themselves.

[ayjay]: https://blog.ayjay.org/the-blog-garden/
[z]: https://zettelkasten.de

[^truncate]: A few years ago, I had to [start truncating][sha] the feeds from my own sites just to make them work with [micro.blog][mb], which has an unofficial 1<abbr title="megabyte">MB</abbr> limit on the size of the feeds it would consume. notably, this is *only* for the current (`v5`) version of the site, which launched in November 2019. You can imagine how much larger the feed would be if it included the earlier iterations of the site.

[sha]: https://github.com/chriskrycho/v5.chriskrycho.com/commit/50f7423d
[mb]: https://micro.blog


## A New Kind of Feed

As useful as these kinds of hacks might be, though, the fact that we have to hack them in this way in the first place is suggestive. What would a protocol for updates which treats “gardens” as a top priority look like?

==TODO: actually sketch out these changes!==

Note that these changes are *not* the same as the set of changes which would make updates more useful for stream-like content, but they have some overlap. ==TODO: what overlap?==

Should we even call this new thing a “feed”? Perhaps not.

==TODO: keep going!==


## Hacks

Even assuming that the vision I outlined is appealing, it will take time for these ideas to percolate, time for specs to be written and implemented, time for readers to add better support. What might we do in the meantime? How can we hack better support in *now*, using the existing infrastructure? Some ideas:

### Links to updates

***Publish items which are just a collection of links to recently updated items in the garden.*** This approach has a number of things going for it. First, and most important, it is easy to “bolt onto” the existing feed ecosystem. Feed readers do not need to change anything. Publishing tools only need to add the ability to identify changed items and generate a list. For a traditional <abbr title="content management system">CMS</abbr> with dynamic content, this is just a matter of noticing that an item already exists in the database and flagging it as a change accordingly. Notes-publishing tools like [Obsidian Publish][op] could integrate the same capability along similar lines.

The problem is slightly more complex for tooling built on static site generators ([Jekyll][j], [Hugo][h], [Zola][z], [Pelican][p], [11ty][11] etc.), in that they tend to be single-shot build systems—at most with a build cache, and require no particular versioning or deployment strategy. In practice, however, static site generators are very often used with version control systems. Scripting the generation of new “updates” sections is therefore possible, if not necessarily straightforward; the fact that it is a bit more fiddly is simply par for the course for static site generators.

[j]: https://github.com/jekyll/jekyll
[h]: https://gohugo.io
[z]: https://www.getzola.org
[p]: https://getpelican.com
[11]: https://www.11ty.dev

Some degree of interactivity here would be helpful. Authors should be able to opt individual posts in or out of that list of updates, to avoid the “it was just a typo fix” updates. They should also be able to summarize the changes, or to customize how much of the content surrounding the change is included—even if there are good defaults—so that the published updates can be presented in a way that is most helpful to readers.

### Split the feeds

Another useful move might be to split up a site’s feeds between “garden” and “stream” content. Stream entries might continue to be a simple queue of items, with some relatively low limit on the number of entries in the feed and the expectation that readers will be unlikely to be notified about changes after the fact. They could continue to be full text or not as makes sense for the publication in question. Garden entries might be shaped quite differently; in particular, they would default to including only a summary of and any recent changes to each item. A garden feed would thus primarily serve as an up-to-date list of ideas “growing” in the garden. (Here, the incentive to either click through or actively ask for the full text would be a necessary workaround for the limitations of existing feed reader apps.) Embracing this split should allow the garden feed to include *all* the entries, for most kinds of sites: no matter how large any individual part of the garden grew, the reference to it in the feed would be a few kilobytes at most—more comparable to the

Making this split would, for good and for ill, intensify the existing tendency to treat stream entries as one-and-done.

This approach could also work in tandem with the "Links to updates" approach suggested above. Indeed, it would likely be necessary: We will have to take it as a given, at least initially, that most readers will not make use of the information about any given item’s having been updated. Accordingly, it might make sense to keep all item garden items in the list, for the sake of the rare reader apps which do support rendering updates, and *also* to publish update entries.

<section class=callout aria-role=note>

**Hypothesis:** In this model, having *many* recent updates in the feed may not make sense. Instead, the feed could—potentially—publish only a single “recent updates” entry at a time (always with a unique <abbr title="identifier">ID</abbr>), replacing it whenever updates are published. This would also help with keeping the summary small.

</section>

Supporting this split would also require new publishing infrastructure and tools. The challenge is not in splitting out garden content vs. stream content into different feeds: many existing <abbr>CMS</abbr>s already handle this correctly, and could be extended to support different rendering patterns for different kinds of feeds. (I could build this for this site’s feeds in 15 minutes or so, for example.) No, the work to be done is in enabling authors and publishers to describe their updates—*easily*.

<aside>

I initially thought this would mean being smart enough to avoid showing trivial typo fixes, but as I was drafting this section I realized that does not always work: What about typos which substantially change the meaning of a sentence? For example, ==TODO==

> A

==TODO==

> B

</aside>



==TODO: more ideas==

- splitting up the feeds:
    - build publishing infrastructure which allows you to easily incorporate information about which changes you want to highlight.
      - make it smart enough to not flag typos by default
      - make it a default to show an interface when making changes which lets the author/publisher easily flag yes/no/yes/yes/no for what gets emitted as a "change"?
      - provide the ability to summarize changes
  - “stream” entries
    - always full text
    - minimal or no expectation of updates
    - it’s okay for them to “fall out” of the update window
