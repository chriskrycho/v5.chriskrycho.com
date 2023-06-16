---
title: Writing Tools
subtitle: >
  Obsidian, Bear, high-quality native apps vs. cross-platform Electron apps…
date: 2023-06-15T20:08:00-0600
tags:
  - writing
  - tools
  - software development

---

I sent a spate of text messages to a friend just a few minutes ago:

> Every time I use Bear, I want it to work for me.
> 
> Every time I use Obsidian, I am mildly annoyed by its many Electron-isms.
> 
> And yet.
> 
> Every time I use Bear, I just want some dang files on disk (and folders! Let me have folders, dang-it!).
> 
> Every time I use Obsidian, I am glad I can just work with the text files *as text files*.

[Bear](https://bear.app) was my notes app of choice for years—half a decade, perhaps? The v2 currently in beta is even nicer than the first version. It works *incredibly* well and is *incredibly* pleasant to use. It is a well-behaved native app on Mac, iOS, and iPadOS.[^visionOS] The only problems with it are the ones I mentioned in that flurry of messages: Bear keeps all your notes in an app-specific database, and it only allows one kind of taxonomy: tags. That combo makes it *very* difficult for me to work with it.

[Obsidian](https://obsidian.md) has been my go-to app for the past year. It answers both of Bear's problems in a very direct way: It keeps its notes as files on disk, and it lets you use both folders and tags for structuring your notes (as well as any other metadata, if you want to get into plugins to extract and use that info). But… it is a cross-platform Electron app, and it shows at every turn.[^obsidian] Its <abbr>UI</abbr> is non-native from the settings panel to the text editing experience, and no amount of CSS tweaking makes it act 100% right.

In both cases, I understand why the apps make the tradeoffs they do. Obsidian’s approach enables a very small team to target many platforms. Bear’s approach lets them deliver a particularly polished experience. Neither really satisfies me, though; I keep wanting something which delivers on the best of both. Maybe—maybe—someday I will build it.

[^visionOS]: I will be surprised if the Shiny Frog folks do *not* ship a nice native version for Apple's Vision Pro (though I will not be buying it!).

[^obsidian]: A pet peeve that drives me nuts every time—which would be funny if it were not such an appalling lack of attention to the kinds of detail I care about: the iPad app's "Loading" view is jankily off up in the top left corner instead of appropriately centered.