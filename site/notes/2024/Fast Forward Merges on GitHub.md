---
title: Fast Forward “Merges” on GitHub
subtitle: >
    This should be built in, but it isn’t, so this is of limited use. But not none!

date: 2024-12-16T15:48:00-0700
updated: 2024-12-20T09:52:00-0700
updates:
    - at: 2024-12-20T09:52:00-0700
      changes: |
         I remembered that the “correct” way to do this in Git is by doing `git merge --ff-only`, so updated the post accordingly.

tags:
    - version control
    - Git

---

GitHub has refused to implement [fast-forward merges][ff] for years, *insisting* that you can only have rebases or merge commits (including squash merge commits). I have no idea why. However, on projects where you have enough control over the merge flow, you can have your fast forward cake and eat it too:

1. Check out the branch locally (including, if you like with `gh pr checkout` using [the `gh` <abbr>CLI</abbr> tool][gh]).
2. Fast forward the trunk branch to the commit that is the tip of that <abbr title="pull request">PR</abbr>.
	
	The “correct” way:
        1. Check out your trunk branch again.
        2. Do a fast-forward-only merge.

	```sh
    git checkout main
    git merge --ff-only target-branch
    git branch --delete target-branch
    git push
    ```

	The “why isn’t this easier” way: forcibly move your trunk branch to the tip of the checked out branch (which is what a fast-forward merge is anyway).[^move]

    ```sh
    git branch --force main target-branch
    git branch --delete target-branch
    git push
    ```

On GitHub, this will mark the PR for `target-branch` as merged. Neat!

Caveats:

- This only works if you don’t protect your default branch (`main`/`trunk`/`master`/etc.) from pushes, because you won’t be able to push to it if you do.
- Nothing will stop you from merging something which did not pass your continuous integration this way.

Net, you may not *want* to do this in certain repos. (It sure would be nice if GitHub supported it nicely, wouldn’t it?) However, it is totally the kind of thing you could automate if you wanted to: a GitHub Action “bot” could do this. On small repos where you find PRs useful but also would like a linear history where “merges” aren’t relevant, I highly recommend it.

[ff]: https://git-scm.com/docs/git-merge#Documentation/git-merge.txt---ff-only
[gh]: https://cli.github.com

[^move]: Moving the branch is just `jj bookmark move --to target` in Jujutsu. No `--force` needed! There is no “fast forward merge” or indeed any other formal notion of merging in jj, because merges are just changes which happen to have multiple parents.
