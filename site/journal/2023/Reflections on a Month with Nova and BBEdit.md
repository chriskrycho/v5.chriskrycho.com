---
title: Reflections on a Month with Nova and BBEdit
subtitle: >
  What works, what doesn’t, and where did this experiment lead me in the end?
summary: >
  (A WIP draft:) What works, what doesn’t, and where did this experiment lead me in the end?
tags:
  - software development
  - tools

date: 2023-07-04T19:00:00-0600
draft: true
---

As I [described][blog] at the start of the month, I have taken the opportunity of this downtime to revisit some of my longest-standing developer tool choices: I have made a point to do my writing and software development in [BBEdit][bb] and [Nova][nova] rather than my long-standing habit of using [Sublime Text][st] and [Visual Studio Code][code].

[bb]: https://www.barebones.com/products/bbedit/
[blog]: https://v5.chriskrycho.com/journal/trying-bbedit-and-nova/
[code]: http://code.visualstudio.com/
[nova]: https://nova.app
[st]: https://www.sublimetext.com

The rest of this post is structured as a series of journal entries authored as I reflected on my experience using the tools, with a concluding summary. If you want *just* the takeaway, jump to the summaries:

- [BBEdit](#summary)
- [Nova](#summary-1)

## BBEdit

### July 4

BBEdit feels *quite* good as a writing tool. I initially tried working with it as a replacement for Code, and… it did not work out. That was apparent within a day. While it added support for language servers a few years ago, that approach is very clearly a second-class one in the editor, and things I take for granted when working in Code I could only sort of—very jankily—make work in BBEdit. Renames work well. Go to definition works decently. Finding all references… when it works, it’s nice, but it did not, in general, *work*.

Writing is a different story. As I noted at the end of the post in which I proclaimed my intention to do this, it feels really, *really* good. The editor is fast and snappy and gets out of my way, and all of its affordances are *native affordances*.

There is one key thing I miss from Sublime when using BBEdit as a primary authoring tool, though. Amusingly, it is the thing which sold everyone on Sublime all those years ago: multiple cursors. I end up using that feature extensively for fast text transformations that do not require doing an actual find and replace—not least because I can *choose* whether to include a given selection in Sublime (or Code, which has the same ability).[^cmd-d] I suspect I may get used to just using a find-and-replace mechanic again, but it is the kind of thing I wish BBEdit would just add and make this a non-issue.

The only other issue I have is that BBEdit does not let me set certain view defaults on a per-language basis. When editing a Markdown file, for example, I *never* want to see line numbers. I can configure Sublime or Code to do that; I cannot find any way to configure BBEdit to do that. I therefore have to toggle it off manually every time I open a Markdown doc, and then it is persistent across *all* document types. Meh.

[^cmd-d]: Where <kbd>⌘</kbd><kbd>D</kbd> duplicates the cursor to the next instance of the same text, the sequence <kbd>⌘</kbd><kbd>K</kbd>, <kbd>⌘</kbd><kbd>D</kbd> *skips* the next instance of the same text. This makes the tool equally flexibile to a pure find-and-replace, which can accomplish the same by hitting **Next** instead of **Replace & Find**.


### Summary

==TODO: write it at the end of the month!==


## Nova

### July 4

At this point, I have been using Nova for a couple of days for my ongoing side project work in Rust (see comments above about why I ended up *not* trying to use BBEdit for this!). It feels… really, *really* good. I have hit only a few things where I could not do everything Code does. I hit one consistent crash—a case where [rust-analyzer][ra] seems to be crashing and Nova is not handling the crash well—but otherwise it has been incredibly snappy and reliable. More than that, when I had cause to reopen Code briefly (because of the aforementioned crash) it just felt… janky.

[ra]: https://rust-analyzer.github.io

### Summary

==TODO: write it at the end of the month!==
