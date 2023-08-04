---
title: Stay Curious About Your Tools
subtitle: >
  I have lately enjoyed digging further into Unix and macOS fundamentals—and it has reminded me to stay curious about my tools!

summary: >
  I have lately enjoyed digging further into Unix and macOS fundamentals—and it has reminded me to stay curious about my tools! 

tags:
  - Apple
  - software development
  - learning

qualifiers:
  audience: >
    This one is applicable to everyone but the examples are going to be a bit technical; it focuses on Mac tools and my own personal history.
    
date: 2023-08-05T19:23:00

---

I have lately been digging into, and trying to understand better, many of the fundamentals of my operating system. I have been using macOS since it was Mac OS X 10.4 Tiger.[^middle-school] I got the hang of the basics pretty quickly, but my focus initially was just on using the machine to get music composed and class papers written. I started using the command line in 2008 or so, writing Fortran programs for my senior capstone project in physics at <abbr title="The University of Oklahoma">OU</abbr>. Reading `man gfortran` was my introduction to much of how Unix systems work. But I was so far in over my head in those early years that I never *really* slowed down to understand more deeply the system I was using. I learned enough to get by, and tried to understand those parts that I did learn *well*, but I did not dig deeper than whatever was sufficient to the task at hand. I simply did not have time: I was learning how to program, how to write <abbr title="HyperText Markup Language">HTML</abbr> and <abbr title="Cascading Style Sheets">CSS</abbr>, how to run a debugger (`gdb`!), how to use version control (lots of time with Subversion!).

At some point, I had sufficient familiarity with the shell to dig in a *little* bit deeper: to customize things a bit, to write some small scripts, to switch from first from [bash][bash] to [zsh][zsh] (with [oh-my-zsh][omz]) and then to [fish][fish]. I learned a *lot* of <abbr title="command line interface">CLI</abbr> tools over the years, and how to wire them together effectively.[^papers] That was still about as far as it had gone, though: my focus was still primarily on learning programming languages and frameworks and working to deepen my knowledge and ability to use them effectively and to communicate about them to others effectively. The shell and most shell utilities remained largely in “know enough to get my job done, call it good” mode.

[bash]: https://www.gnu.org/software/bash/
[zsh]: https://www.zsh.org
[omz]: https://ohmyz.sh
[fish]: https://fishshell.com

The same was true, by and large, of a lot of long-time Mac capabilities and behaviors. I have done some mild customization off and on over the years, and I have long appreciated a lot of the Mac design decisions (the menu bar! Still great!), but in many ways I never deeply learned the operating system’s abilities around windowing, nor deeply understood the capabilities of the Unix system utilities, or had any idea about some of the neat ways the two can interact.[^man-example]

Until lately! 16 years into using a Mac as my full-time computer, and 15 years since I first started learning to use it, and I am now embracing the Mac-ness of the Mac. (Whether Apple itself understands the goodness of the Mac *as the Mac* is unclear! I think some parts of it definitely do *not*.) This includes [a redoubled devotion][editors] to Mac-native tools. It includes doubling down on nice features: <kbd>⌘</kbd><kbd>H</kbd> and <kbd>⎇</kbd>-clicking away to hide apps (or <kbd>⌘</kbd><kbd>⎇</kbd><kbd>H</kbd> to hide *all* others) instead of minimizing them or closing their windows, Windows-style, to take just a couple examples. It also includes actually learning a lot of the lower layers of the system. For example: not just how to use `defaults` but understanding what it *does* by reading its manual; not just *using* `man` to read man pages but actually figuring out (at last!) what in the world the [difference][man-diff] between `man(1)` and `man(6)` is; etc.; not just giving up when hitting an annoyance in my `.gitconfig` but reading the manual and experimenting in shell scripts till I knew where things had gone wrong and *fixing it*.

[man-diff]: https://superuser.com/questions/297702/what-do-the-parentheses-and-number-after-a-unix-command-or-c-function-mean

It feels: nice! Knowing one’s tools better is a good thing.

I do not regret that I only got here now. We all have limited time, and the path I have taken was a good one. But I am glad that I *am* here now, that I *am* learning these parts of the system better. Most of all: I am glad that all these years along, I am still interested in computing, still interested in going one layer further down into how these things actually work. Staying curious about your tools is good!


[editors]: https://v5.chriskrycho.com/journal/reflections-on-a-month-with-bbedit-and-nova/

[^middle-school]: I also used Mac OS 9 working on the middle school yearbook when I was in 8th grade. I barely remember it; but I do remember that it felt *weird* compared to the Windows machines we ran at home… but not bad.

[^papers]: Nearly every paper I wrote for my M. Div. ran through [pandoc](https://pandoc.org), for example.

[^man-example]: For example: that `man` can pop open a dedicated window for built-in tools by doing `open x-man-page://<tool>`, or as a <abbr title="Portable Document Format">PDF</abbr> (albeit with [some annoying hoops](https://gist.github.com/joeybaumgartner/f3675fc2861ca3e47c8ccc29bdfc306e) as of Ventura).
