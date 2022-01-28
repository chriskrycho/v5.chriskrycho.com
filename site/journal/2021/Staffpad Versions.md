---
title: StaffPad Versions
subtitle: >
    Making it *easy* to keep track of your composing history in [StaffPad](https://www.staffpad.net).
date: 2021-07-28T16:45:00-0600
tags:
    - music
    - composing
    - StaffPad

---

I have been doing a *bunch* of composing over the mini-sabbatical I have taken this July, mostly working in [StaffPad][s]. One of the things I care *deeply* about in projects like this is being able to keep track of previous versions of my work, in case I change my mind about something or simply want to be able to compare two different approaches.[^always]

StaffPad makes that pretty easy, thankfully: its built-in [versions][versions] functionality does exactly what I need. However, to make it *most* useful, I have found it helpful to use in a very specific way—which I am now sharing here in hopes that it will be useful to you as well!

[s]: https://www.staffpad.net
[vcs]: https://en.wikipedia.org/wiki/Version_control
[versions]: https://staffpad.zendesk.com/hc/en-us/articles/360005388577-Versions

1. Whenever I want to create a sort of “checkpoint” in my work, I go to the versions panel and create a new version.

2. I rename the previous version to the current date, formatted like `2021-07-28`. (I format all my dates this way, and so should you if you’re doing something like this: it makes them trivial to sort in a folder on a computer!)

3. I then rename the newly-created version from its default name of “Name” to “Current”. This makes it clear when I look at versions what I am actually actively working on.

4. I make sure that the new “Current” version is the active one. This is important! I have more than once accidentally left the previous version active, and then realized it later.[^recovery] This is all too easy to do when editing the version names, so double-check!

That’s it. It’s fairly simple, but it only occurred to me after a bit of trial and error, so hopefully this saves someone else some time.

[^always]: Yes, I have always been this way. Yes, having written software and therefore been able to use [version control systems][vcs] has taken an already-strong tendency and made it stronger.

[^recovery]: I managed to recover the desired previous version, thankfully; they just had mismatched names. But lesson learned the painful way!