---
title: dprint for Nova
subtitle: >
    I like nice, fast tools, so [dprint](https://dprint.dev) and [Nova](https://nova.app) make a great pair.

summary: |
    I just published v0.1.0 of a dprint extension for the Nova text editor. It currently handles formatting files.

date: 2024-12-06T09:25:00-0700

tags:
    - software development
    - macOS
    - tools

---

Earlier this week, I [mentioned][dprev] that I have been switching a lot of my projects over to [dprint][dprint], and since summer 2023 I have [mostly been using][nova-writeup] Panic’s [Nova][nova] as my main programming text editor.[^editors] After wiring up dprint in both [<cite>The Rust Programming Language</cite>][trpl] book repo and [True Myth][tm] this week, I was motivated to get an old project across the line: [a dprint extension for Nova][nova-dprint].

[dprev]: https://v5.chriskrycho.com/notes/dprint/
[dprint]: https://dprint.dev
[nova-writeup]: https://v5.chriskrycho.com/journal/reflections-on-a-month-with-bbedit-and-nova/
[trpl]: https://github.com/rust-lang/book/pull/4125
[tm]: https://github.com/true-myth/true-myth
[nova]: https://nova.app
[nova-dprint]: https://github.com/chriskrycho/nova-dprint/tree/main

I just published [an initial release (v0.1.0)][release] of [that extension][extension], and if you have Nova installed you can install it directly by [clicking this link](nova://extension?id=chriskrycho.dprint) or by searching for it in Nova’s extension library. It currently supports formatting a whole file at once, including the ability to format on save.

[release]: https://github.com/chriskrycho/nova-dprint/releases/tag/v0.1.0
[extension]: https://extensions.panic.com/extensions/chriskrycho/chriskrycho.dprint/

Things I hope to do in the future (i.e. things it does not yet do):

- support for formatting selections rather than the whole file
- bundling a version of dprint so it can work “out of the box”
- support for formatting for buffers which have not yet been saved, but which do have a language, based on the open workspace

If you’re a Nova user, [try it out][extension] and let me know if you hit issues!

You may also notice that it uses the [Blue Oak Model License][blue-oak], which I [just mentioned][bo-post] I have been adopting for all such projects.

[blue-oak]: https://blueoakcouncil.org/license/1.0.0
[bo-post]: https://v5.chriskrycho.com/notes/blue-oak-model-license/

[^editors]: along with [BBEdit][bbedit] and some off and on experiments with [Zed][zed].

[bbedit]: https://www.barebones.com/products/bbedit/
[zed]: https://zed.dev
