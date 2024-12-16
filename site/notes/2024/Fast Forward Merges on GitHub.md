---
title: Fast Forward “Merges” on GitHub
subtitle: >
    This should be built in, but it isn’t, so this is of limited use. But not none!

date: 2024-12-16T15:48:00-0700

tags:
    - version control
    - Git

---

GitHub has refused to implement [fast-forward merges][ff] for years, *insisting* that you can only have rebases or merge commits (including squash merge commits). I have no idea why. However, on projects where you have enough control over the merge flow, you can have your fast forward cake and eat it to. Check out the branch locally (including, if you like with `gh pr checkout` using [the `gh` <abbr>CLI</abbr> tool][gh]), update `main` to point to the target branch, and push:[^move]

```sh
git checkout target-branch
git branch --force main target-branch
git push
```

On GitHub, this will mark the PR for `target-branch` as merged. Neat!

Caveats:

- This only works if you don’t protect your default branch (`main`/`trunk`/`master`/etc.) from pushes, because you won’t be able to push to it if you do.
- Nothing will stop you from merging something which did not pass your continuous integration this way.

Net, you may not *want* to do this in certain repos. (It sure would be nice if GitHub supported it nicely, wouldn’t it?) However, it is totally the kind of thing you could automate if you wanted to: a GitHub Action “bot” could do this. On small repos where you find PRs useful but also would like a linear history where “merges” aren’t relevant, I highly recommend it.

[ff]: https://git-scm.com/docs/git-merge#Documentation/git-merge.txt---ff-only
[gh]: https://cli.github.com

[^move]: Moving the branch is just `jj bookmark move --to target` in Jujutsu. No `--force` needed!
