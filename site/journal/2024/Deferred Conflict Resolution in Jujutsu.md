---
title: Deferred Conflict Resolution in Jujutsu
subtitle: Doesn’t that just make things *worse* somehow?

date: 2024-12-26T13:22:00-0700

qualifiers:
    audience: |
        People interested in and with *some* context on [Jujutsu (jj)][jj]—assumes you are familiar with the idea of rebases in Git and at least vaguely aware of Jujutsu’s differences on that front. (But only vaguely!)
        
        [jj]: https://jj-vcs.github.io/jj/latest/

    context: |
        Extracted and expanded from [a discussion thread on lobste.rs](https://lobste.rs/s/zgs3uo/jujutsu_megamerges_jj_absorb#c_19ghj3).

tags:
    - Jujutsu
    - version control
    - tools

---

One thing Jujutsu advertises is that it makes conflicts “first class” and does not require you to resolve them before finishing a rebase. This often initially strikes people as quite odd: that leaves conflict markers in the files, which would mean they would not run or compile. “Why in the world would I want that?” is a perfectly reasonable response coming from Git, and it is how I felt at first as well.

*If* things worked the way they did in Git, it would be correct, because indeed you cannot run or compile your code in the conflicted commits. There are two key bits that are likely not obvious there, though:

First, you do not have to fix it *while in the middle of a rebase*, whether that's an explicit rebase or one happening implicitly because of editing a commit in the middle of a branch. (I will come back to “editing a commit in the middle of a branch” below.) This is a big difference from Git. In Jujutsu, rebases happen transparently and frequently with many common workflows, whereas in Git you only end up with rebase-caused conflicts while explicitly doing a rebase and *cannot* proceed until you fix them. At first blush, that might sound like a point in Git’s favor: that was my initial impression! But because Jujutsu doesn’t force you to deal with conflicts right away, having conflicts “downstream” of a change ends up being *fine* in a way it is not in Git.

This is ultimately a consequence of the fact that Git basically requires you to work on the tip of a branch all the time, and does *not* have any kind of auto-rebasing. Jujutsu will let you work on any non-immutable commit you like at any time, because no commit is “special” in Jujutsu.

That takes us to the second bit: depending on where the conflict is and what commit you are working on, you may not be working on a conflicted commit. This is a huge difference from Git that is mostly invisible until you’re actually used to using Jujutsu a bit. Given that `@` is “where I am *at* right now”, this is a totally normal and reasonable state to be in when using Jujutsu:

```
A -- B -- C -- D
    (@)
```

So is this:

```
A -- B -- C -- D
      \
       Q
      (@)
```

This means that you might have conflicts and `C` and `D` but it doesn’t matter while you’re working on `B` or `Q`! You can then go fix up the conflict in `C` (which in many cases will *also* fix whatever is wrong in `D`!) at your leisure, *after* you finish working on `B` or `Q` or both.

Both of these are topologies which can appear in Git, but with a key difference. In Git, if you modify `B`, producing `B′`, the `C -- D` branch will not be attached to that new `B′`. Instead, it will still be on the original `B`. The branches will have diverged and you will have to manually rebase them later to get things “back in sync”. This *defers* the appearance of the conflicts, but does not prevent them from appearing. Because Jujutsu automatically rebases the `C -- D` branch onto that new `B′`, the conflict becomes visible immediately, but you do not have to *resolve* it immediately.

The analogy here is that you did the following in Git, assuming an original branch name of `some-work` at `D` in the diagram above:

```sh
$ git checkout --branch work-on-B <hash for B>
# make some changes in the repo
$ git commit --all --amend
$ git rebase work-on-B some-work
```

You can also still get the Git workflow if you want to, but it is something you would *opt into* by doing something like this:

```sh
$ jj duplicate B  # produces new change `K`
$ jj rebase --branch C --destination K
$ jj new B  # produces `Q`
```

You would end up with this topology:

```
  K -- C -- D
 /
A
 \
  B -- Q
      (@)
```

That is the equivalent of doing this Git workflow, again assuming `some-work` is at `D`:

```sh
$ git checkout --branch work-on-B <hash for B>
# make some changes in the repo
$ git commit --all --amend
```

Notice that, as usual with Jujutsu, you can do what Git does, but you can also do things Git does not support. In my experience, both before I adopted Jujutsu and certainly since then, rebasing continually the downstream is nearly always what I want. Given I *can* get the Git behavior when I need it  (it has not happened to me in the past 18 months, but that is not to say it *could not* happen!), I like the default in Jujutsu!
