---
title: A Feed ‘Bug’ I Keep Tripping Over
subtitle: Or, one of the limitations of using version-controlled plain text as a content management system.

date: 2025-12-29T09:32:00-0700

tags:
  - software development
  - web development
  - site meta

---

A little bit ago, I changed the <abbr title="universal resource locator">URL</abbr> for [a post][bad-post] I published on Saturday so the <abbr>URL</abbr> would match the title of the post. I renamed the source file, which my static site generator uses to generate the slug automatically, and added a redirect to my [Render][render] config. Unfortunately, I forgot one important step in the rename process: adding a bit of metadata to the renamed post (which I name `feedId`) to match the original slug so that it would not be treated a new feed entry by subscribers to the feed.

[bad-post]: https://v5.chriskrycho.com/journal/friendly-little-wrapper-types/
[render]: https://render.com

The net was that the same blog post showed up for any of you reading along in feed readers or via email subscription, for which I apologize!

The “bug” to which the title of this post refers is really a limitation of both the current implementation of my website and to a generally challenging design issue for website generators that use plain text files in a version controlled repository to build the site, rather than a more traditional <abbr title="content management system">CMS</abbr>. In a traditional <abbr>CMS</abbr>, most posts have a unique identifier living in a database—an identifier that is stable regardless of the title or slug of the post. In a well-behaved <abbr>CMS</abbr>’s feed generator that identifier (or one derived from it) is also the identifier for the feed item, which prevents this issue for showing up.

With plain text files on disk as the source of truth, though, no such stable identifier exists, at least by default! This makes it much harder to avoid accidentally doing what I did when renaming a file. I can certainly think of process- or tool-based ways to do it, including making your site generator smart enough to handle everything involved with this kind of rename and only conducting renames using the site generator. (This is probably what I will do with the next version of my site, with a generator I have built from scratch for my own purposes.) With a “general-purpose” site generator like [the one I currently use][11ty], though, this is a pretty difficult problem to solve robustly. I “just” have to remember.

[11ty]: https://www.11ty.dev

This post is thus three things:

- A _mea culpa_ for my readers.
- An explanation of the basics of the underlying issue for other folks out there.
- A way of trying to make this problem “stick” in my mind a bit better for as long as I am using my current site generator.
