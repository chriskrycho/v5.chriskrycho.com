---
title: "jj tip: cool revsets and per-repo aliases"
subtitle: 

date: 2025-07-10T20:51:00-0600

summary: >
  I build some new revsets useful for just one particular project, without disrupting my other project work. Here’s how you can do the same.

tags:
  - software development
  - version control
  - Jujutsu

qualifiers:
  audience: |
    People using, or interested in what it is like to use, [Jujutsu (jj)][jj] as their version control system. Assumes basic knowledge of the concept of [jj revsets][docs].
    
    [jj]: https://martinvonz.github.io/jj/latest/
    [docs]: https://jj-vcs.github.io/jj/latest/revsets/

---

I’m most of the way through a gnarly bit of refactoring at work, of the sort that simply cannot land as one clean <abbr title="pull request">PR</abbr> but *needs* to be broken up into a sequence of related <abbr>PR</abbr>s. (It is safer to land such a large change in pieces where possible, for one thing. For another, our change rate is so high that it ends up with conflicts within minutes of a push.) To do that, I need to create *new* branches with subsets of the work, that I can then use to create individual pull requests that can merge safely and easily.

To make that happen, I am using a bunch of the other techniques I have [written about][topic] here, but I also came up with a really handy new trick with [revsets][revsets]. For this particular bit of work, I really only care about a handful of branches, which I have associated with bookmarks for quick reference as I make changes to the underlying graph. I want to be able to view all of those in a single command. At any given point in time, I also care about both the ancestors and the descendants of those bookmarks. So I added revsets like this:

```toml
[revset-aliases]
"active(rev)" = "(ancestors(rev) | descendants(rev)) ~ immutable()"

work = "active(@) | active(prev)"
```

The `"active(rev)"` line defines a new Jujutsu revset function that accepts a revset and produces the union of all ancestors and descendants of that revset, including the revset itself. So if you had a graph like this, where `*` means the commit is immutable—

```
A -- B -- C -- D -- E
*    *
```

—and wrote `jj log -r "active(D)"`, you would get back a log that included `C`, `D`, and `E`.

The line defining `work` here defines a revset that only shows the “active” commits that correspond to the current commit (`@`) and things related to the `prev` bookmark, which is not special, just the relevant name of the branch. I could actually go a bit further and use bookmarks that match a prefix to make it “just work” as I introduce more branches with bookmarks pointing to them, like `my-project/a`, `my-project/b`, etc., and then track everything in *that* revset in the `work` revset:

```toml
project = bookmarks(regex:"^my-project/.*")
work = "active(@) | active(project)"
```

I also have muscle memory built up to write `jj l` to get my most commonly used view of the commit log. So I went one step further, and aliased that, too:

```toml
[aliases]
l = ["log", "-r", "work"]
```

[topic]: https://v5.chriskrycho.com/topics/jujutsu
[revsets]: https://jj-vcs.github.io/jj/latest/revsets/

But I don’t want these revsets anywhere *but* this one copy of this one repository. Well: `active` is useful enough that I may promote it to my set of default revsets! But definitely not the others. So I did this only in the per-repo configuration: `jj config edit --repo`.[^git] Everywhere else, `work` does not exist and `jj l` gives me my *normal* default log output. Once I finish this particular bit of work, I’ll go ahead and delete that `l` alias and the `work` revset from the repo config. In the meantime, though, this is making it *far* easier for me to pull this complicated set of changes apart into some smaller <abbr>PR</abbr>s!

[^git]: You can do this kind of thing in Git, too, of course! But these days I don’t use Git except as the storage mechanism for Jujutsu.