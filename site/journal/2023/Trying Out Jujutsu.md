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
updated: 2023-07-02T18:35:00-0600
updates:
  - at: 2023-07-02T18:35:00-0600
    changes: >
      Added some initial notes about initial setup bumps.

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

- I have yet to figure out how to see the equivalent of `git log`’s full commit message; when I `jj log`, it prints only the summary line, and the `jj log --help` output did not give me any hints about what I am missing!
- The log only includes the information since initializing Jujutsu in a given directory. I do not see a way yet to “slurp in” the Git log history, though I imagine there must be one.

{% note %}

For all of these kinds of initial notes, I will update them/rewrite them as I figure them out; but I will *not* do is pretend like they were not issues. At some point I expect the above to read something like:

> - It was not initially clear to me how to see the equivalent of…
> - The `jj log` output only shows the summary by default, and it took me a while to figure out how to see the full message: …

{% endnote %}


[^mac-pro-tip]: Pro tip for Mac users: add `.DS_Store` to your `~/.gitignore_global` and live a much less annoyed life.

### Working on projects

==TODO: notes as I go!==
