---
title: Jujutsu Megamerges and `jj absorb`
subtitle: >
    A *really* handy approach for splitting apart changes into multiple branches but working on their combination.

date: 2024-12-24T15:01-0700

qualifiers:
    audience: |
        People already familiar with [Jujutsu][jj] *or* willing to go read the docs a bit to understand the fundamentals of what I am describing here—particularly around [the working copy][wc], [branching][b] and [merging][m].

        [jj]: https://jj-vcs.github.io/jj/latest/
        [wc]: https://jj-vcs.github.io/jj/latest/working-copy/
        [b]: https://jj-vcs.github.io/jj/latest/glossary/#branch
        [m]: https://steveklabnik.github.io/jujutsu-tutorial/branching-merging-and-conflicts/merging.html?highlight=merge#merging-branches

image:
    cdn: jj-absorb.png

tags:
    - Jujutsu
    - version control
    - tools

---

## I. The Merge Workflow

A workflow a number of [Jujutsu <abbr>VCS</abbr>][jj] users have landed on when you have multiple (possibly unrelated) streams of work active in a repository goes like this:

- Create a branch for each stream of work.[^anonymous]
- Create a *merge* commit (in Jujutsu, this is just `jj new <list of parents>`. If you have three branches whose tip commits are `c`, `n`, and `x`, you would write `jj new c n x`.
- Create a new commit *on top of* that merge, which will function as your “working area”. (You could treat the merge itself as your working are.)

[jj]: https://jj-vcs.github.io/jj/latest/

In that scenario, you might end up with a commit graph that looks something like:

```
       m --- n
      /       \
a -- b -- c -- [merge] -- [wip]
      \       /
       w --- x
```

You do all your work in the commit I labeled `[wip]`. Note that there is nothing special about that commit.[^wc] It is merely a convenient commit to do do your work, and if it makes more sense to you to have a series of commits, that will work just fine as well.

Then, whenever you have finished up some chunk of work, you squash it back into the appropriate parent using `jj squash`. In the graph above, for example, we might say that `c` is where `main` is presently, while `m`-`n` represents a new feature and `w`-`x` some documentation improvements you are doing as “back-burner” work. You can work on either the feature work *or* the documentation work in the `[wip]` commit. In fact, you can work on both at the same time. (That is especially easy if they are in different parts of the code base, but jj is good enough at managing merges and conflicts that they do not *need* to be.)

When you finish some chunk of work that is part of the feature, if everything in the `[wip]` commit is for the feature, you would run `jj squash --into n --keep-emptied`. That will keep around the `[wip]` commit, but all of that work which was part of it is now in `n` instead. The `[merge]` commit and the `[wip]` commit will both be rebased on top of that, while preserving their relationship to `c` and `x`.

Likewise, if you spot another documentation improvement, you simply make those changes locally along with whatever else you are doing. If `[wip]` contains both the new feature work *and* documentation work, you can pass the `-i`/`--interactive` flag when you squash, like `jj squash --interactive --into x`. Then you can select only the documentation changes. This will move those changes into `x`, and again, Jujutsu will automatically rebase `[merge]` and `[wip]` on top of that, maintaining.

---

Three “safety” dynamics you might be wondering about:

- If any of these squash operations causes a conflict, Jujutsu will record that, but it will not cause the squash *or* the ensuing rebase to fail! You can resolve conflicts at any time, rather than having to do it before completing a rebase.

- With all this rebasing, the underlying Git commits will be changing quite a bit. That’s not a problem from Jujutsu’s point of view, but it is something you should be aware of when collaborating! As a rule—and Jujutsu has good defaults which enforce this!—you should not rewrite commits on shared branches. Someday there may be “forges” which understand Jujutsu, and any such forge presumably *would* understand that a commit can be rewritten while preserving the change <abbr title="identifier">ID</abbr> and indeed the change *identity*.

- You can use [the `git.private-commits` configuration option][gpc] to make it so it is *impossible* to push these changes: just define an appropriate rule for the [revset][revset] that will work for you!

[gpc]: https://jj-vcs.github.io/jj/latest/config/#set-of-private-commits
[revset]: https://jj-vcs.github.io/jj/latest/revsets/

---

The *reason* to work in that `[wip]` is it makes it easy to see how all the streams of work fit together. The `[merge]` commit always integrates all of those streams, and your work on `[wip]` then builds on top of it. This means you can *know* whether those streams integrate successfully—in terms of both the actual merge and the state of your build and tests. In other words, this workflow unlocks the ability to straightforwardly separate out distinct “streams of work” as they emerge while you are working, without a lot of ceremony or overhead, while ensuring they continue to work well together.

I know some readers are shouting “Just don’t have multiple streams of work in flight!” That is a good default, but it does not always work! Two examples:

- When [working incrementally on a large, long-running upgrade][upgrade], having these kinds of parallel streams in flight is *how* you continually deliver incremental progress instead of having a massive change that will end up landing all at once in a much riskier way! If you read [that linked article][upgrade], you will see that former colleagues and I ended up doing something *very* similar to what I describe here, but with a good deal more hassle because Git does not make it nearly as easy as Jujutsu.

- I commonly find that one stream of work throws off others. For example, I have been using exactly this workflow while working on a new feature for [True Myth][tm] over the past couple days (more on the details very soon!). Working on the new feature has consistently exposed improvements to documentation for the `Maybe` and `Result` types in the library, but I do not want to land those in the same pull request as this new feature. They are not really part of the feature, after all. They should get their own pull requests, which will in turn roll up nicely into the `CHANGELOG.md` file via our [release tooling][release-it].

    I could just do a bunch of work to split them into separate commits and then manually rebase and squash those afterward, or I could try to tackle them in separate work trees… but I don’t have to. With this workflow, I can keep them as distinct streams of work while continuing to iterate on the result of both streams.

[upgrade]: https://v5.chriskrycho.com/journal/git-workflow-for-managing-long-running-upgrades-a/
[tm]: https://github.com/true-myth/true-myth
[release-it]: https://github.com/release-it/release-it


## II. Superpowers

This is already a *great* workflow for this kind of thing, but it really gets superpowers when you add in `jj absorb`, which was introduced in jj v0.24.[^from-hg] Here’s how the <abbr title="command-line interface">CLI</abbr> `--help` output describes `absorb`:

> Move changes from a revision into the stack of mutable revisions
>
> This command splits changes in the source revision and moves each change to the closest mutable ancestor where the corresponding lines were modified last. If the destination revision cannot be determined unambiguously, the change will be left in the source revision.

Above, I described using `jj squash`, including using its `--interactive` mode, to move the changes into the appropriate commits, and using `--keep-emptied` to avoid giving up. That works extremely well… but what works even better is simply to run `jj absorb`. In the example described above, instead of `jj squash -i --into x` for documentation changes and `jj squash -i --into n` for whatever feature changes are left, I would write `jj absorb` once and it would do that for me.

Here’s a demo:

<figure>

<script async id="asciicast-696032" src="https://asciinema.org/a/696032.js"></script>

<figcaption>Using <code>jj absorb</code> to incorporate changes into parents of a merge</figcaption>

</figure>

Notice the result of the `jj absorb` in that demo is exactly what I would have done manually with `squash`: moving the changes into the appropriate file. The implementation is also conservative; I do not need to worry about it going off the rails and messing up my history. Again, per the docs, if it is not truly unambiguous about where things should end up, it will choose not to do anything at all, rather than create a mess.[^error]

Thus, when I am making documentation changes in True Myth’s `result.ts` while also implementing this new feature in a different file, I can just run `jj absorb` when I hit a point where I want to integrate. If I want to absorb only a subset of the files, I can pass the target paths: `jj absorb src/result.ts` will automatically integrate changes to *only that file*. In this case, that means it will integrate them back into the documentation updates branch, leaving everything else unchanged, so I do not need to be at a “checkpoint” for *everything*, just for that particular bit of work. If I do choose to run `jj absorb` against everything, though, it also keeps the `[wip]` commit with its message automatically, so no need for `--keep-emptied`.

This is the kind of thing that makes me so excited about Jujutsu. It is not just that it has a nicer user interface than Git. It is that it makes it straightforward to do things that were painful enough that I only reached for them in exceptional circumstances—like [the long-running upgrade scenario][upgrade] I mentioned above. By contrast, I reaching for this all the time now even in relatively *small* sets of changes, because Jujutsu makes it easy, and that in turn makes it easier to get my work done. In the case of `jj absorb` specifically, I feel like my superpowers just got superpowers.



[^anonymous]: If you’re a Git user, remember that branches in jj are anonymous by default, so you do not have to name these!

[^wc]: It is, in this regard, quite different from Git’s “working copy” or “staging area”, which *are* special. This is just another commit!

[^from-hg]: The `absorb` command was inspired by similar work done for [Mercurial][hg].

[hg]: https://www.mercurial-scm.org

[^error]: One significant area `jj absorb` could be better: reporting *why* it did not do anything when it opts out!