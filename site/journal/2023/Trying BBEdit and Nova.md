---
title: Trying BBEdit and Nova
subtitle: >
  I am taking some time off, and this seems like a great time to mess with alternatives for my software stack.
qualifiers:
  audience: >
    People interested in personal toolkits, especially for software; and people who want to better understand detail-obsessed people like me who always talk about their preferences for platform-native software.
tags:
  - software development
  - tools
summary: >
  I am going to take some of my vacation time to try out some genuinely Mac-native text editors and see if either can truly replace VS Code as my daily driver. Because these things matter to me.
date: 2023-07-01T18:25:00-0600

---

For years, now, I have been frustrated with the “default” text editor options for software development on macOS. I have long used [Visual Studio Code][code]; before that I used [Atom][atom] and before that [Sublime Text][st]. But in all cases, I have been frustrated that they are not Mac-native apps.

The frustration is born of a thousand paper cuts rather than any one big thing. On the list:

- **The behavior of keyboard shortcuts.** All non-native apps are perennial offenders—as are apps which implement their own text renderers and inputs (including browsers like Firefox and Chrome). macOS has had extensive support for a variety of terminal/Emacs-like text navigation and manipulation shortcuts since Mac OS X arrived with its NeXT underpinnings: <kbd>Ctrl</kbd><kbd>F</kbd> to move forward by a character or <kbd>Ctrl</kbd><kbd>B</kbd> to move back by a character, for instance. There are many, many others. I use the majority of them literally every minute I use a text editor. I discovered these shortcuts back in 2009, during my brief but educational dalliance with Emacs. I have not touched Emacs in over a decade, but these shortcuts are burned into my brain. Any editor which breaks them *infuriates* me, because they are part of *all* of my text editing workflows. Which are not few! I am a programmer and writer: I spend the vast majority of my computer-using time doing some kind of text editing or another.[^other-activities]

- **Typography.** Use the native system fonts. Period. That does not mean *no* elements can have customized typography, but major design elements should use the standard type faces from the system. Similarly, they should default to using the standard control sizes from the operating system.

- **Controls.** Use native buttons, checkboxes, toggles, etc. No building your own just to match a mediocre cross-platform brand.

- **The behavior of windows.** New windows should open offset from the current window: down-and-to-the-left. (It took something like five years for VS Code to fix this!) They should support [document proxy icons][dpi], and those proxy icons should be well-behaved according to standard system behaviors. They should have usable title bars.

- **Tabs.** System-native tabs have consistent behavior. Tabs built in [Electron][electron] or some custom <abbr title="user interface">UI</abbr> layer do not. How can they be dragged? *Where* can they be dragged—only within a single window, or between windows?[^native-tabs] Some apps do not support tabs at all; this is more or less fine: the key is that if tabs *are* present, they should work like *native* tabs. That includes the size.

- **Scroll bars.** Native text editors use native scroll bars, and respect the system settings *and* system design of scroll bars. Scroll bars are an incredible affordance! They provide information and useful controls at the same time. They should look and work the same way in a text editor they do anywhere else. In many editors (including Code, Sublime Text, and Zed) they do not.

- **File open and close dialogs.** It is amazing how many editors get this wrong. VS Code and Sublime are reasonably well-behaved here, using the native window, but other editors are much less so. (Looking at you, [Zed][zed]!) A small detail that is *particularly* irksome to me is editors where a dialog to close a window prompts to save a file and does not accept keyboard shortcut input: <kbd>⌘</kbd><kbd>D</kbd> should trigger the “Don’t Save” action, but very rarely does.

- **General appearance quirks and behavior.** Everything else. Really. Text rendering is wrong, because it is going through *some* non-native pipeline, whether a custom renderer as in Zed or a Chromium renderer as in Atom and Code. Menus do not work the way native menus do. Application settings are rendered in some unholy <abbr title="hypertext markup language">HTML</abbr> interface,[^html] or a bunch of <abbr title="JavaScript Object Notation">JSON</abbr>, or some kind of custom <abbr title="user interface">UI</abbr> renderer. Nor is this non-native presentation limited to an aesthetic difference: not one of the editors I have tried here has any kind of reasonable organization to their preferences; in every case the *best* option is to use search and hope you can figure out what the relevant search term is.

I expect these kinds of things will simply not translate to most readers. These are the kinds of things which only a fairly small subset of the population does care about or ever has. There is a reason Macs were not that popular when these kinds of things were their only real differentiators. Most Mac-users do not actively notice them or care about them—even if, I would argue, they do benefit from them. They matter very much to me, though. They are a big part of what drew me to Macs in the first place, and they add up, all together, to an abiding appreciation of macOS (though diminished a little by Apple’s design team apparently forgetting that these part of what makes Mac great over the past decade). They add up, too, to an equally abiding frustration with other operating systems’ lack of these kinds of details. Most critically in this post: they add up to my equally abiding and very deep frustration with the state of available text editors on the Mac.

Switching up text editors is no small thing, though! It requires choosing either to relearn many existing habits and key commands or to try to reconfigure the editor into the shape of some *other* editor. It is therefore something I flirt with occasionally but never get around to actually doing: the cost of doing it during any ordinary work week is just too high. I care about doing my work quickly and efficiently. Since I now have several weeks in a row off, though, and plan to be doing a fair bit of side-project coding along the way, this seems like a good opportunity to try it. The worst that could happen is: it does not work out and I go back to VS Code, disappointed but resigned to my fate until someone decides to pick up the torch and make a genuinely *great* Mac-native competitor to Code.

With that in mind, I am going to give both [BBEdit][bbedit] and [Nova][nova] a good trial—likely a solid two weeks each. In both cases, I will be configuring my editor to work with them and mapping as many non-mapped keyboard shortcuts as I need. Where they have existing keyboard shortcuts, though, I will be attempting to learn and use those instead of simply remapping to my long-standing Sublime-/Atom-/Code-powered shortcuts. In both cases, the goal is to give the editor as fair a shake as possible. I want to answer the question honestly: *Is this a better tool on balance (for me specifically) than VS Code is?* The “honestly” qualifier is important! Just because it checks some boxes that matter to me does not mean it is genuinely better overall, given that I spend the vast majority of my working life in a text editor.

The main area I expect this to be a struggle: VS Code’s extension library is *phenomenal*, and I get great use out of it. BBEdit has very little in the way of this kind of general extensibility, and nothing at all comparable to the VS Code extension marketplace. Nova has something more comparable, but its selection is (unsurprisingly!) much more limited. These kinds of general ecosystem limitations—classic network effects—are unsurprising but genuinely limiting in some ways.[^contributing]

I drafted this whole post in BBEdit. It felt… good. Responsive in a way that I associate with Sublime and Zed, but also native in a way that neither is. Years ago, I used BareBones Software’s [TextWrangler][tw] for a lot of lightweight text editing, so it is no surprise that this feels like coming home: it is![^also] At the same time, even after configuring a language server for it, it feels somewhat less capable than VS Code *for the way I use it*. This balance makes a certain amount of sense: BBEdit is much more of a traditional (very powerful!) text editor; VS Code is something more like a cross-platform lightweight <abbr title="integrated development environment">IDE</abbr>.

[atom]: https://github.com/atom/atom
[bbedit]: https://www.barebones.com/products/bbedit/
[code]: http://code.visualstudio.com
[dpi]: https://daringfireball.net/2021/07/document_proxy_icons_macos_11_and_12
[electron]: https://www.electronjs.org
[nova]: https://nova.app
[st]: https://www.sublimetext.com
[tw]: https://www.barebones.com/products/textwrangler/
[zed]: https://zed.dev

[^other-activities]: Otherwise I am likely reading or composing.

[^native-tabs]: Native tabs have plenty of quirks, too. The advantage to using them, though, is that I only have to learn *one* set of quirks! They can even be styled in interesting ways, but they have to match the system behavior. 

[^html]: I have no objection to <abbr title="hypertext markup language">HTML</abbr> interfaces; indeed, I *love* the web. But. Not for a native application!

[^also]: Back in the day, also [Fraise](https://lifehacker.com/fraise-successor-to-smultron-continues-development-of-5569924) and [Smultron](https://www.peterborgapps.com/smultron/). Somehow I missed the [TextMate](https://macromates.com) train!

[^contributing]: Of course, one obvious rejoinder here is, “So help fix them!” If I land on one of them, I may very well end up doing just that. Or I may not: my time is limited and working on editor extensions is not (at present, anyway) anywhere near the top of my priority list.
