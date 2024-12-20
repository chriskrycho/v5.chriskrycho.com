---
title: fish shell v4 beta 1
subtitle: A bunch of small nice improvements… and a rewrite in Rust!

date: 2024-12-20T09:11:00-0700
image:
    cdn: fish-v4-beta.png

qualifiers:
    audience: |
        People who at least sometimes use a command line and understand that there *are* differences between different shells.

tags:
    - command line tools
    - Rust
    - software development

---

My shell of choice for going on a decade now[^switch] has been [fish][fish], which has a bunch of built-in niceties that need user-authored code to get in bash, zsh, etc. A couple days ago, fish shipped the first beta of v4 of the shell, which they rewrote entirely from C++ to Rust. From [the blog post][blog]:

> We are quite proud of this upcoming release. It represents a staggering amount of work and includes some really nice changes for users, as well as foundational improvements that will pay off in the future.
>
> We consider this beta to be highly stable, and we use it as our primary shell. All existing fish scripts and commands are expected to keep working, with the exception of the items noted in the release notes. Whether you are an existing user, or curious to give fish a try, this is a great opportunity to contribute to fish-shell.
>
> …
>
> We will be publishing a follow-up post about the mechanics of the port from C++ to Rust: what went well, what could have gone better, and lessons learned.

[fish]: https://fishshell.com
[blog]: https://fishshell.com/blog/fish-4b/

I just installed it myself and everything Just Works™ right out of the box, which is exactly what you want for this kind of update. I am certainly looking forward to that blog post about the migration! A few highlights from [the release notes][rn] that caught my attention:

- Improved search when using <kbd>Control</kbd><kbd>r</kbd>—which was *already* very good.
- A number of improvements to compatibility with other <abbr title="Portable Operating System Interface">POSIX</abbr> shells.
- Improvements to fancy key combo support for XTerm and the kitty keyboard protocol. (I like to see that terminals are still working to improve from the weird baseline that is “how we had to do things 50 years ago”.)
- Better Windows support in a couple key areas. This doesn’t affect me, but it might be useful for some of you reading!
- Improved completions, including completing things with leading `.`, like `.gitignore`.

See [the blog post][blog] and [the release notes][rn] for further details on what's new and what changed, as well as how to install the beta.

[rn]: https://fishshell.com/docs/4.0b1/relnotes.html



[^switch]: I don't remember when I switched from zsh to fish, but it has been a *very* long time; I was a fish veteran when I went to LinkedIn and indeed one of the first things I shipped there was [fish support for Volta][volta-fish] (then still named Notion).

[volta-fish]: https://github.com/volta-cli/volta/pull/266