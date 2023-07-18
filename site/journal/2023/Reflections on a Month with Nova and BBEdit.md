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
updated: 2023-07-08T14:45:00-0600
updates:
  - at: 2023-07-08T14:45:00-0600
    changes: >
      An extended entry on how much Nova has impressed me as I have worked basically exclusively with it on a Rust side project.

  - at: 2023-07-18T15:00:00-0600
    changes: >
      Added an entry for what it has felt like to use BBEdit as my primary “just for basic text work” editor for the past few weeks. Also switched (at least for now?) to using `<details>` tags for the journal sections.

  - at: 2023-07-22T12:55:00-0700
    changes: >
      I bought Nova.

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

### Journal

<details><summary>A blow-by-blow description of, which you can skip in favor of the summary below if you like; click to expand and read on if you want the details!</summary>

#### July 4

BBEdit feels *quite* good as a writing tool. I initially tried working with it as a replacement for Code, and… it did not work out. That was apparent within a day. While it added support for language servers a few years ago, that approach is very clearly a second-class one in the editor, and things I take for granted when working in Code I could only sort of—very jankily—make work in BBEdit. Renames work well. Go to definition works decently. Finding all references… when it works, it’s nice, but it did not, in general, *work*.

Writing is a different story. As I noted at the end of the post in which I proclaimed my intention to do this, it feels really, *really* good. The editor is fast and snappy and gets out of my way, and all of its affordances are *native affordances*.

There is one key thing I miss from Sublime when using BBEdit as a primary authoring tool, though. Amusingly, it is the thing which sold everyone on Sublime all those years ago: multiple cursors. I end up using that feature extensively for fast text transformations that do not require doing an actual find and replace—not least because I can *choose* whether to include a given selection in Sublime (or Code, which has the same ability).[^cmd-d] I suspect I may get used to just using a find-and-replace mechanic again, but it is the kind of thing I wish BBEdit would just add and make this a non-issue.

The only other issue I have is that BBEdit does not let me set certain view defaults on a per-language basis. When editing a Markdown file, for example, I *never* want to see line numbers. I can configure Sublime or Code to do that; I cannot find any way to configure BBEdit to do that. I therefore have to toggle it off manually every time I open a Markdown doc, and then it is persistent across *all* document types. Meh.


[^cmd-d]: Where <kbd>⌘</kbd><kbd>D</kbd> duplicates the cursor to the next instance of the same text, the sequence <kbd>⌘</kbd><kbd>K</kbd>, <kbd>⌘</kbd><kbd>D</kbd> *skips* the next instance of the same text. This makes the tool equally flexibile to a pure find-and-replace, which can accomplish the same by hitting **Next** instead of **Replace & Find**.

### July 18

I have continued to use BBEdit as my go-to text editor over the past few weeks, and I continue to really like it. I recognize that I have barely tapped its power, and that I am still largely using it the same way I have used Sublime Text for the past six or seven years (since first Atom and then <abbr title="Visual Studio">VS</abbr> Code took over as my “daily driver”): for light and fast text editing with a minimum of fuss. In that role, I am finding that it is indeed noticeably better than Sublime in some ways, most of all in the ways that I hoped when I set out to do this experiment in the first place: feeling native and at home on macOS. The text editing itself is comparably nice in both, which is a testament to how well Sublime works—but the text rendering definitely feels like it *fits* more correctly on macOS.

Certainly the rest of the user interface does: it has a normal (meaning: mostly graphical!) settings panel—though that settings panel allows far *more* customization than most other Mac text editors. It lets you set *which menu items* you want, for goodness’ sake! The counterpoint here is that setting the “advanced”—BBEdit calls them “Expert”—settings requires writing [plist][plist] values from the command line with `defaults write com.barebones.bbedit.<some preference> <some value>`.

<aside>

This prompted me to actually go read the `man` page for `defaults` for the first time. Despite having *used* `defaults write` off and on for over a decade, I had never dug into it. It is a nicely-documented little utility. My favorite bit is the **Bugs** section:

> Defaults can be structured in very complex ways, making it difficult for the user to enter them with this command.

This is: accurate.

</aside>

[plist]: TODO

The quibbles I noted above about per-document-type settings remain mildly annoying. Other issues I hit along the way were apparently at least partly of my own making. For example, I regularly create Markdown links by selecting some text and hitting <kbd>[</kbd> with the expectation that it will wrap the selected text with a matching `]`, after which I can just <kbd>Ctrl</kbd><kbd>F</kbd> it and hit <kbd>(</kbd> and then <kbd>⌘</kbd><kbd>V</kbd> to paste in the link.[^ctrl] BBEdit apparently supports this behavior out of the gate: the manual says it is the default behavior. I somehow turned it off and was going to write it down here as a gap, and then thought, *Nah, there must to be a preference for that, right?* Sure enough, the incredibly extensive User Manual told me what to change, and things are as they should be.

</details>


[^ctrl]: Pro tip for people who might like to learn and use some of these Emacs-inspired CoreText shortcuts, or otherwise just get some actual utility out of the <kbd>Ctrl</kbd> key: swap it with the <kbd>Caps Lock</kbd> key, which most of us only very rarely use on a day-to-day basis. On macOS Ventura, open **System Settings** and then navigate to **Keyboard** > **Keyboard Shortcuts** > **Modifier Keys**. There, you can set

### Summary

==TODO: write it at the end of the month!==


## Nova

### Journal

<details><summary>A blow-by-blow description of, which you can skip in favor of the summary below if you like; click to expand and read on if you want the details!</summary>

#### July 4

At this point, I have been using Nova for a couple of days for my ongoing side project work in Rust (see comments above about why I ended up *not* trying to use BBEdit for this!). It feels… really, *really* good. I have hit only a few things where I could not do everything Code does. I hit one consistent crash—a case where [rust-analyzer][ra] seems to be crashing and Nova is not handling the crash well—but otherwise it has been incredibly snappy and reliable. More than that, when I had cause to reopen Code briefly (because of the aforementioned crash) it just felt… janky.

[ra]: https://rust-analyzer.github.io

### July 8

Over the past couple of days, I finished a major milestone in one of my side projects—a project written entirely in Rust, and with all of this work carried out entirely in Nova. This was a pretty good stress test for Nova: while the rust-analyzer language server does in fact implement the normal [Language Server Protocol][lsp], the rust-analyzer project is also explicit that the [<abbr title="Visual Studio">VS</abbr> Code][code] extension is the primary target, and it gets attention and sometimes even features other editors do not as a result. How well, I wondered, would Nova stack up?

[lsp]: https://microsoft.github.io/language-server-protocol/
[code]: https://code.visualstudio.com

The answer, I was delighted to find, is: *smashingly*. Although I hit a number of little bugs and gaps along the way, none of them were remotely show-stoppers, and the overall experience is frankly *so* much better than the experience of using Code that I am now finding it somewhat difficult to imagine going back. As I said above, Code just feels kind of janky by contrast. As I noted in [my original explanation][original] for why I am running this experiment in the first place: every single thing about an Electron app is just a little bit *off*. Not so with Nova.

[original]: https://v5.chriskrycho.com/journal/trying-bbedit-and-nova/

Most of these kinds of small quality-of-life details were also true the last time I looked at Nova. There was another problem then, though: the ecosystem around the editor. While still not massive, the ecosystem is much larger than it was 12–18 months ago. More important than there simply being more extensions is that the territory covered by those extensions has grown dramatically. There *were* Rust and TypeScript extensions back then; they are *good* now. Indeed, the ecosystem which exists for Nova appears generally to be fairly high quality.

The net is that, a week into this experiment, I am *really* liking Nova and I am very likely to end up switching to it as my “daily driver” editor going forward.


### July 22

I just bought Nova. I think that tells you the status of this experiment. Since I have been using it as my go-to editor/<abbr title="integrated development environment">IDE</abbr> for Rust, TypeScript, etc. for the past three weeks, I have hit the point where I actively want *not* to open <abbr title="Visual Studio">VS</abbr> Code. I do not miss it. As described above, I have a handful of small things I miss (and might contribute to the ecosystem), and I will have some work to do to make it viable as my editor for the mammoth repo I mostly work on for my daily work (rather than personal work), but I call this part of the experiment a smashing success.

There is very little to say here beyond what I said above in terms of the reasons. I just hit the point today where I knew that I had no more doubts. The question was not “Am I going to buy this?” but simply “When do I get around to buying it?” Given that Panic is a *great* developer—one with a long history of shipping some of the best apps on the Mac, including [Transmit][transmit], of which I am also a very happy customer—I just decided the answer was: *Today*. I am happy to have switched, full stop.

[transmit]: https://panic.com/transmit/


</details>


### Summary

==TODO: write it at the end of the month!==
