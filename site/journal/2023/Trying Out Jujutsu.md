---
title: jj init
subtitle: >
  What if we actually *could* replace Git? Jujutsu might give us a real shot.
qualifiers:
  audience: >
    People interested in personal toolkits, especially for software.
summary: >
  Jujutsu (`jj`) is a new version control system from a software developer at Google. It seems promising, so I am giving it a try on a few personal projects.
tags:
  - software development
  - tools

date: 2023-07-01T18:42:00-0600
updated: 2023-07-02T21:43:00-0600
updates:
  - at: 2023-07-02T21:43:00-0600
    changes: >
      Added some initial notes about initial setup bumps. And a *lot* of notes on the things I learned in trying to fix those!

draft: true

---

Along with my experiment with [Mac-native text editors][experiment] over this vacation, I am going to spend some time learning [Jujutsu][jj]. Jujutsu is a new version control system from a software engineer at Google, which already (though tentatively) has a good future there as a next-gen development beyond Google’s history with Perforce, Piper, and Mercurial. I find it interesting both for the approach it takes and for its careful design choices in terms of both implementation details and user interface.

[experiment]: https://v5.chriskrycho.com/journal/trying-bbedit-and-nova/
[jj]: https://github.com/martinvonz/jj#command-line-completion

{% note %}

Watch this space over the next month: I will update it with notes and comments about the experience, as well as expanding on these thoughts. This is a “garden”-style post and will grow organically over time!

{% endnote %}


## Overview

==TODO: What is Jujutsu? Why is it interesting?==


## Usage notes

### Setup

Setup is, overall, quite easy: `brew install jj` did everything I needed. As with most modern Rust-powered <abbr title="command line interface">CLI</abbr> tools, Jujutsu comes with great completions right out of the box. I did make one post-install tweak, since I am going to be using this on existing Git projects: I updated my `~/.gitignore_global` to ignore `.jj` directories anywhere on disk.[^mac-pro-tip]

Notionally, Jujutsu understands local `.gitignore` files and uses them. As of my initial explorations (specifically, as of 2023-07-02), it is tracking files I do not want it to in a `node_modules` directory in one project where I am trying it out. This means I have yet to commit anything there, because I really do not want *anything* from `node_modules` in history. Theoretically, `jj untrack` should handle this when combined with `.gitignore`’s already including `node_modules`, but so far: no dice.

Another couple “getting started” notes:

{% note %}

For all of these kinds of initial notes, I will update them/rewrite them as I figure them out; but I will *not* do is pretend like they were not issues. At some point I expect the above to read something like:

> - It was not initially clear to me how to see the equivalent of…

{% endnote %}

### Actually committing

Courtesy of the `node_modules` issue described above, I was not able even to commit the very update to this item where I am writing this sentence using Jujutsu, because I could not figure out how to get it configured with [Kaleidoscope][kaleidoscope], my go-to diff and merge tool. I suspect this is a combination of Kaleidoscope itself, Jujutsu’s relatively limited documentation at the time of writing, and possibly a bug somewhere in the mix. This is a case where Jujutsu’s choice—a good one, I think? But we will see—to skip Git’s “index” in favor of just having better tooling for working directly with commits in the working copy and rewriting history runs smack into a bunch of tooling which does not expect to be used that way.

[kaleidoscope]: https://kaleidoscope.app

### Learnings on `jj log`

I initially thought that the `jj log` only included the information since initializing Jujutsu in a given directory. This was because `jj log` takes a somewhat different approach from the other <abbr title="distributed version control system">DVCS</abbr> tools I have used. Per [the tutorial][tutorial]:

> By default, `jj log` lists your local commits, with some remote commits added for context. The `~` indicates that the commit has parents that are not included in the graph. We can use the `-r` flag to select a different set of revisions to list.

[tutorial]: https://github.com/martinvonz/jj/blob/main/docs/tutorial.md

I initially thought `jj log` was not including the Git history, but in fact the view I was seeing was entirely down to this default behavior of `jj log`, totally independent of Git.
    
To show the full revision history for a given commit, you can use a leading `:`, which indicates “parents”. (A trailing `:` indicates “children”.) Since `jj log` always gives you the identifier for a revision, you can follow it up with `jj log -r :<id>`. For example, in one repo where I am trying this, the most recent commit identifier starts with `mwoq` (Jujutsu helpfully highlights the segment of the identifier you need to use), so I could write `jj log -r :mwoq`, and this will show all the parents of `mwoq`. Like Git, `@` is a shortcut for “the current head commit”. Net, the equivalent command for “show me all the history for this commit” is:

```sh
$ jj log -r :@
```

What `jj log` *does* show by default was still a bit non-obvious to me, even after that. *Which* remote commits added for context, and why? The answer is in the `help` output for `jj log`’s `-r`/`--revisions` option:

> Which revisions to show. Defaults to the `ui.default-revset` setting, or `@ | (remote_branches() | tags()).. | ((remote_branches() | tags())..)-` if it is not set

This shows a couple other interesting features of `jj`’s approach to the `log` command:

1. It treats some of these operations as *functions* (`tags()`, `branches()`, etc.). I don’t have a deep handle on this yet, but I plan to come back to it. (There is a whole list [here][functions]!)

2. It makes “operators” [a first-class idea][operators]. Git *has* operators, but this goes a fair bit further:

    - It includes `-` for the parent and `+` for a child, and these stack and compose, so writing `@-+-+` is the same as `@`.
    
    - It supports union `|`, intersection `&`, and difference `~` operators.
    
    - The aforementioned `:<id>` for ancestors has a matching `<id>:` for descendants and `<id1>:<id2>` for a directed acyclic graph range between two commits. Notably, `<id1>:<id2>` is just `<id1>: & :<id2>`.

    - There is also a `..` operator, which also composes appropriately (and, smartly, is the same as `..` in Git when used between two commits, `<id1>..<id2>`). The trailing version, `<id>..`, is interesting: it is “revisions that are not ancestors of `<id>`”.

    This strikes me as *extremely* interesting: I think it will dodge a loooot of pain in dealing with Git histories, because it lets you ask questions about the history in a compositional way using normal set logic.

[functions]: https://github.com/martinvonz/jj/blob/main/docs/revsets.md#functions
[operators]: https://github.com/martinvonz/jj/blob/main/docs/revsets.md#operators

That’s all well and good, but even with reading the operator and function guides, I still can’t actually quite make sense out of the default output.

- ==I have yet to figure out how to see the equivalent of `git log`’s full commit message; when I `jj log`, it prints only the summary line, and the `jj log --help` output did not give me any hints about what I am missing!==


[^mac-pro-tip]: Pro tip for Mac users: add `.DS_Store` to your `~/.gitignore_global` and live a much less annoyed life.

### Working on projects

==TODO: notes as I go!==
