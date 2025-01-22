---
title: "jj tip: describe multiple revisions at once"
subtitle: Revsets and filesets remain mind-blowing.

summary: >
    You can pass a revset, including one that specifies a fileset, to `jj desc` and describe multiple commits at the same time. Cool!

date: 2025-01-22T09:43:00-0700

tags:
    - tools
    - command line tools
    - Jujutsu
    - version control
    - software development

qualifiers:
    audience: |
        People using, or interested in what it is like to use, [Jujutsu (jj)][jj] as their version control system. Assumes basic knowledge of the concept of jj [revsets][revset].
        
        [jj]: https://github.com/jj-vcs/jj
        [revset]: https://jj-vcs.github.io/jj/latest/revsets/

---

Yet another moment when I said “*What?!?*” out loud about a cool [Jujutsu][jj] feature: `jj desc` takes a revset. That means you can, for example, launch an editor to describe *all* the changes between your repo’s “trunk” and your current commit at the same time:

```sh
$ jj desc -r "trunk()..@"
```

Or if you have a bunch of different branches that need descriptions—possibly because you ran `jj parallelize` or a similar command—you could do this:

```sh
$ jj desc -r "trunk()..description('')"
```

That would launch your editor to describe all of the commits on top of trunk that have no description yet.

Similarly, you could use a fileset with the `files()` and `mutable()` revset functions to describe all the files matching a given selector in mutable revisions, like so:

```sh
$ jj desc -r "mutable() & files(lib)"
```

The ability to describe multiple commits at once is the kind of thing I do not expect to use *often*, but for which I will be very grateful when I can—and it’s a great example of something that falls out of Jujutsu’s choice to distinguish between describing and creating commits (`desc` and `new` respectively) and its powerful revset and fileset languages for choosing commits and files.

[jj]: https://jj-vcs.github.io/jj/latest/