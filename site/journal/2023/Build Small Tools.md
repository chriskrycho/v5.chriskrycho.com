---
title: Build Small Tools
qualifiers:
  audience: >
    Other people who are comfortable writing (even very small!) scripts and programs.
tags:
  - software development
  - working effectively
  - Rust
date: 2023-01-013T10:44:00-0700
summary: >
  I increasingly choose to build my own little tools rather than trying to fit myself into the workflows other people design. It has a slightly higher up-front cost, but it lets me make my computing environment my own.

---

I built a tool last week which fully automates my process for archiving current set of notes to GitHub. The process is basically trivial in the first place: I could mostly do it with a single chained shell script invocation using `cp` and `rm` and `git`. But wrapping it up into an actual program I can invoke—in my case, written in [Rust][r] because that’s how I roll—made it a much nicer experience. (It could equally have been a shell script, but I really hate writing shell scripts.)

[r]: https://www.rust-lang.org

It’s a small thing, but I *love* that this workflow looks like this now:

```sh
$ notes-sync
Cleaning things up...
Copying from /Users/chris/Notes...
Committing changes, if any...
Pushing any new changes...
🎉
```

This is just *nice*. Much nicer than the output from the original shell output which did the same thing!

I had fun and learned something building that little tool (in this case, about [the gitoxide family of crates][g]). I also control the whole thing end to end, and have a foundation I can use to make further changes or improvements to that workflow over time. That means I am not subject to the opinions or changes made by some other tool author—there are, after all, [Obsidian][o] plugins which [do something similar][p], and that is great so far as it goes; but I want things to fit *my* workflow instead of adjusting my workflow to fit someone else’s ideas.

[g]: https://github.com/Byron/gitoxide
[o]: https://obsidian.md
[p]: https://github.com/denolehov/obsidian-git

I have increasingly started to come around to the idea that as a *rule* I will build small tools for myself this way. It sometimes takes more time… but I often find that it only takes more time *up front*, and often takes *less* time in the long term. It’s usually a fun way to learn some new <abbr title="application programming interface">API</abbr> or practice a new technique. Most of all: it makes my computing environment *mine*.[^tinkering]

If you can: build yourself your own small tools.

[^tinkering]: This is, in many ways, one of the very best thing about computers: you *can* make them into an environment which fits your own wants and needs. Different people love different parts of this. I do not care about tinkering with my desktop environment, _per se_; other people do. That itself is one of the small joys of modern computing, though: If you want to run in the constrained environment of iPadOS because it just does its thing with a minimum of fuss (whatever its limitations), you can; If you want to customize your tiling window manager to and font rendering stack on a custom fork of the Linux kernel, you can.
