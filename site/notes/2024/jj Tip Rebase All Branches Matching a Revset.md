---
title: "jj Tip: Rebase All Branches Matching a Revset"

summary: >
    You can rebase all branches matching a revset using the `all:` modifier. Incredibly powerful, and super easy to use.

date: 2024-12-11T21:46:00-0700

tags:
    - command line tools
    - Jujutsu
    - version control
    - software development
    - tools

image:
    cdn: jj-rebase-all-branches.png

qualifiers:
    audience: |
        Software developers who use jj for version control (or are curious about it) looking to add new tricks to their toolkit. Assumes the Jujutsu bits; see [the docs][docs] if this is confusing but you want to make it happen for you!
        
        [docs]: https://martinvonz.github.io/jj/latest/

---

A thing I just learned how to do tonight with Jujutsu (jj): rebase *all* branches matching a given revset onto a target branch in a single command. Given a revset named `wip` which matches some disparate set of branches, you can rebase every matching branch onto a target change, e.g. the bookmark `main`, simply by prefixing the revset with `all:`, like so:

```sh
$ jj rebase --branch all:wip --destination main
```

Or, as I actually typed it:

```sh
$ jj rebase -b all:wip -d main
```

This rebased seven different work-in-progress branches all at once! This is part of what I love about Jujutsu: this was something I might historically have thought of as a “power user” move, and jj makes it *easy*.

---

If you’re curious about the `wip` revset alias, here’s how I have it defined in my jj config:

```toml
[revset-aliases]
'wip' = 'description(regex:"^\\[(wip|WIP|todo|TODO)\\]|(wip|WIP|todo|TODO):?")'
```

It is only so complicated because I am really undisciplined about how I label changes like that. It will pick up any of `[wip]`, `[WIP]`, `[todo]`, `[TODO]`, `wip:`, `WIP:`, `todo:`, and `TODO:`, because I use all of those at times.

---

Bonus: I knew Jujutsu had a way to do this, but I couldn’t remember *how*, so I did the closest thing I could think of: just try to rebase all branches using the `-b` flag directly:

```sh
$ jj rebase -b wip -d main
```

That didn’t work, of course, because it needs the `all` modifier. However, the help output was just *astonishingly* good:[^spoilers]

```
Error: Revset "wip" resolved to more than one revision
Hint: The revset "wip" resolved to these revisions:
  tt b01060f0 WIP: Ordinal Society review
  x a13f5386 [wip] Journal: Read the Manual: networkQuality
  pq 8f8cb63b [WIP] Notes: Dorico workflow
  msv d79a2ef3 WIP: 2024 in Review
  rm 61f080b3 push-rmxolutsxlvx* | [WIP] Boring Tech = Local Maxima
  ...
Hint: Prefix the expression with 'all:' to allow any number of revisions (i.e. 'all:wip').
```

This is a common pattern for me with jj: Try the thing which may or may not work the way I want. If it does, awesome. If it doesn’t, (a) it is not destructive because I know I can *always* `jj undo`, and (b) jj will *often* tell me what I should do instead.

[^spoilers]: Yes, you can see from this some of the things I have as work-in-progress items for this site. I may even publish some of them some day!
