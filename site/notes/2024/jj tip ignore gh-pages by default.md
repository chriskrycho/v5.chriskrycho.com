---
title: "jj tip: ignore `gh-pages` by default"
subtitle: |
    I want my log to show me only *useful* information. Revsets let me do that!

date: 2024-12-16T12:20:00-0700

summary: >
    I defined a revset and tweaked my defaults in Jujutsu so now I never have to think about `gh-pages` unless I actively want to.

tags:
    - software development
    - tools
    - version control
    - Jujutsu

qualifiers:
    audience: |
        People interested in improving their experience with version control, particularly with [Jujutsu (jj)][jj]—assumes basic knowledge of jj revsets and so on; see [the docs][jj] if you’re curious!
        
        [jj]: https://martinvonz.github.io/jj/latest/

image:
    cdn: jj-config-toml.png

---

I regularly work in a few repos—most especially [the one for <cite>The Rust Programming Language</cite>][trpl]—which have a `gh-pages` branch for deploying to [GitHub Pages][ghp].[^trpl-ghp] I also basically *never* want to see the history of the `gh-pages` branch when working in the repo, because in most cases, it is utterly uninteresting. Here’s how I set up [Jujutsu][jj] to

[trpl]: https://github.com/rust-lang/book/
[ghp]: https://pages.github.com
[jj]: https://martinvonz.github.io/jj/latest/

First, I created a [revset][revset] which grabs all changes which are ancestors of a local or remote `gh-pages` bookmark (which `jj` maps to Git branches; more on the difference in some other post). I put this in my user configuration for Jujutsu,[^wip] because I do not want to repeat it everywhere:

```toml
[revset-aliases]
ghp = 'ancestors(bookmarks(gh-pages) | remote_bookmarks(gh-pages))'
"immutable_heads()" = "builtin_immutable_heads() | ghp"
```

The second of those definitions defines the set of changes Jujutsu treats as “immutable”, i.e., the changes it will not let you alter without explicitly opting into it with `--ignore-immutable`. This is a handy bit of protection to avoid accidentally rebasing or otherwise editing `main` or a tag (something I have definitely missed in Git). [The `buildin_immutable_heads()` revset][bia] is just what it says: the default value for `immutable_heads()` that comes with Jujutsu. Presently, that is defined as:

```
buildin_immutable_heads() = "present(trunk()) | tags() | untracked_remote_bookmarks()"
```

[revset]: https://martinvonz.github.io/jj/latest/revsets/
[bia]: https://martinvonz.github.io/jj/latest/revsets/#built-in-aliases

That means by default, Jujutsu will not let you edit the `trunk()`, if it exists, or any tags, or any untracked remote bookmarks. Meanwhile `trunk()` will use `main`, `master`, or `trunk` bookmarks if they exist, or the default branch on the default remote if you are using a Git-backed repo.

Shipping `buildin_immutable_heads()` as a revset rather than defining `immutable_heads()` directly in terms of *definition* of `buildin_immutable_heads()` lets us refer to it this way and stay in sync if the project is able to land improvements to the definition of `buildin_immutable_heads()`.

I defined the `immutable_heads()` this way because that in turn lets me use `~immutable()` without having to remember to additionally exclude `ghp`—so if I want to rebase all my open, mutable branches, I can now just write this (see my post on [rebasing with `all:`][rebase-all] from last week):

```sh
jj rebase -b "all:(mine() ~ immutable())"
```

That, and anything else which uses `immutable()` will *inherently* exclude `ghp`… which is what I want, because I never, ever want to edit those changes!

I also have a couple aliases for checking out the log of my history, which I usually reach for instead of `jj log`:

```toml
[aliases]
l = ["log", "-r", "@ | ancestors(immutable_heads().., 2) ~ ghp | trunk()"]
lall = ["log", "-r", "..all() ~ ghp"]
```

The first of these, `l`, is the same as the normal revset used by `jj log`, except that it excludes my `ghp` revset. The second is the “show me everything” version of `jj log`… again, except automatically excluding `ghp`. I do this often *enough* that it was worth making an alias instead of typing `jj log -r "all() ~ ghp"`.

Between those couple of tweaks, I can now completely ignore the `gh-pages` branch/bookmark in all my normal use—but I can always get it back by asking for it directly, e.g. `jj log -r ghp`. Revsets are great!


[^trpl-ghp]: We sometimes use GitHub Pages for deploying previews to get feedback. For example, I did that when getting early technical reviews for the new chapter I wrote on async and await.

[^wip]: Right next to the `wip` alias I mentioned in my post about [rebasing all branches matching a revset][rebase-all].

[rebase-all]: https://v5.chriskrycho.com/notes/jj-tip-rebase-all-branches-matching-a-revset/
