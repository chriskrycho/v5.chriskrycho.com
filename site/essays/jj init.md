---
title: jj init
subtitle: >
  What if we actually *could* replace Git? Jujutsu might give us a real shot.
qualifiers:
  audience: >
    People who have worked with Git or other modern version control systems like Mercurial, Darcs, Pijul, Bazaar, etc., and have at least a basic idea of how they work.

summary: >
  Jujutsu (`jj`) is a new version control system from a software developer at Google. It seems promising, so I am giving it a try on a few personal projects.
tags:
  - software development
  - tools
  - version control
  - Jujutsu

image: https://cdn.chriskrycho.com/images/unlearn.jpg

started: 2023-07-01T18:42:00-0600
updated: 2024-01-29T08:05:00-0700
updates:
  - at: 2024-01-29T08:05:00-0700
    changes: >
      Added a section on `obslog`, and made sure the text was consistent on use of “Jujutsu” vs. `jj` for the name of the tool vs. command-line invocations.

  - at: 2024-01-18T15:25:00-0700
    changes: >
      Made some further structural revisions, removing some now-defunct copy about the original plan, expanded on the conclusion, and substantially expanded the conclusion.

  - at: 2024-01-16T20:48:00-0700
    changes: >
      `jj init` is an essay, and I am rewriting it—not a dev journal, but an essay introduction to the tool.

  - at: 2023-11-02T17:17:00-0600
    changes: >
      Added a first pass at a conclusion, and started on the restructuring this needs.

  - at: 2023-11-01T09:27:00-0600
    changes: >
      Describing a bit about how `jj new -A` works and integrates with its story for clean rebases.

  - at: 2023-10-31T11:24:00-0600
    changes: >
      Filling in what makes `jj` interesting, and explaining templates a bit.

  - at: 2023-08-07T21:10:00-0700
    changes: >
      A first pass at `jj describe` and `jj new`.

  - at: 2023-08-07T19:41:00-0700
    changes: >
      YODA! And an introduction to the “Rewiring your Git brain” section.

  - at: 2023-08-07T10:11:00-0700
    changes: >
      Adding more structure to the piece, and identifying the next pieces to write.

  - at: 2023-07-31T21:07:00-0700
    changes: >
      Starting to do some work on the introduction.

  - at: 2023-07-24T15:55:00-0700
    changes: >
      Correcting my description of revision behavior per discussion with the maintainer.

  - at: 2023-07-24T12:08:00-0700
    changes: >
      Describing my current feelings about the `jj split` and auto-committed working copy vs. `git add --patch` (as mediated by a <abbr>UI</abbr>).

  - at: 2023-07-13T08:04:00-0600
    changes: >
      Elaborated on the development of version control systems (both personally and in general!)… and added a bunch of `<abbr>` tags.

  - at: 2023-07-12T21:08:00-0600
    changes: >
      Added a section on the experience of having first-class merging Just Work™, added an appendix about Kaleidoscope setup and usage, rewrote the paragraph where I previously mentioned the issues about Kaleidoscope, and iterated on the commit-vs.-change distinction.

  - at: 2023-07-09T14:02:00-0600
    changes: >
      Rewrote the `jj log` section to incorporate info about revsets, rewrote a couple of the existing sections now that I have significantly more experience, and added a bunch of notes to myself about what to tackle next in this write-up.

  - at: 2023-07-03T10:45:00-0600
    changes: >
      Wrote up some experience notes on actually using `jj describe` and `jj new`: this is pretty wild, and I think I like it?

  - at: 2023-07-03T07:27:00-0600
    changes: >
      Reorganized and clarified the existing material a bit.

  - at: 2023-07-02T21:43:00-0600
    changes: >
      Added some initial notes about initial setup bumps. And a *lot* of notes on the things I learned in trying to fix those!

draft: true

---

{% callout %}

Some background: Along with an experiment with [Mac-native text editors][experiment] over a extended stretch of time off in July 2023, I spent some time learning [Jujutsu][jj]—and it became my daily driver for version control. Jujutsu is a new version control system from a software engineer at Google, which already has a good future there as a next-gen development beyond Google’s history with Perforce, Piper, and Mercurial. I find it interesting both for the approach it takes and for its careful design choices in terms of both implementation details and user interface. Indeed, I think—hope!—it has a possible future as the [next generation of version control][next-gen-vcs].

[experiment]: https://v5.chriskrycho.com/journal/trying-bbedit-and-nova/
[jj]: https://github.com/martinvonz/jj#command-line-completion
[next-gen-vcs]: https://v4.chriskrycho.com/2014/next-gen-vcs.html

{% endcallout %}

{% note %}

Watch this space: I will update and rewrite it with notes and comments about the experience, as well as expanding on these thoughts. This is a “garden”-style post and will grow organically over time!

{% endnote %}


<details><summary>Outline</summary>

<!-- TODO: generate outline once it’s done -->

</details>

## Overview

Jujutsu is one possible answer to a question I first started asking [most of a decade ago]([next-gen-vcs]): *What might a next-gen version control system look like—one which actually learned from the best parts of all of this generation’s systems, including Mercurial, Git, Darcs, Fossil, etc.?* To answer that question, it is important to have a sense of what those lessons are.

This is trickier than it might seem. Git has substantially the most “mind-share” in the current generation; most software developers learn it and use it not because they have done any investigation of the tool and its alternatives but because it is a _de facto_ standard: a situation which arose in no small part because of its “killer app” in the form of GitHub. Developers who have been around for more than a decade or so have likely seen more than one version control system—but there are many, *many* developers for whom Git was their first and, so far, last <abbr title="version control system">VCS</abbr>.

The problems with Git are many, though. Most of all, its infamously terrible command line interface results in a terrible user experience. In my experience, very few working  developers have a good mental model for Git. Instead, they have a handful of commands they have learned over the years: enough to get by, and little more. The common rejoinder is that developers ought to learn how Git works internally—that everything will make more sense that way.

This is nonsense. Git’s internals are are *interesting* on an implementation level, but frankly add up to an incoherent mess in terms of a user mental model. This is a classic mistake for software developers, and one I have fallen prey to myself any number of times. I do not blame the Git developers for it, exactly. No one should have to understand the internals of the system to use it well, though; that is a simple failure of software design. Moreover, even those internals do not particularly *cohere*. The index, the number of things labeled “-ish” in the glossary, the way that a “detached `HEAD`” interacts with branches, the distinction between tags and branches, the important distinctions between commits, refs, and objects… It is not that any one of those things is bad in isolation, but as a set they do not amount to a mental model I can describe charitably. Put in programming language terms: One of the reasons the “surface syntax” of Git is so hard is that its semantics are a bit confused, and that *inevitably* shows up in the interface to users.

Still, a change in a system so deeply embedded in the software development ecosystem is not cheap. Is it worth the cost of adoption?  Well, Jujutsu has a trick up its sleeve: there is no adoption cost. You just install it—`brew install jj` will do the trick on macOS—and run a single command in an existing Git repository, and… that’s it. (“There is no step 3.”) I expect that mode will always work, even though there will be a migration step at some point in the future, when Jujutsu’s own, non-Git backend becomes a viable—and ultimately the recommended—option. I am getting ahead of myself though. The first thing to understand is what Jujutsu is, and is not.

Jujutsu is two things:

1. **It is a new front-end to Git.** This is *by far* the less interesting of the two things, but in practice it is a substantial part of the experience of using the tool today. In this regard, it sits in the same notional space as something like [gitoxide](https://github.com/Byron/gitoxide). Jujutsu’s `jj` is far more usable for day to day work than gitoxide’s `gix` and `ein` so far, though, and it also has very different aims. That takes us to:

2. **It is a new design for distributed version control.** This is by far the more interesting part. In particular, Jujutsu brings to the table a few key concepts—none of which are themselves novel, but the combination of which is *really* nice to use in practice:

    - *Changes* are distinct from *revisions*: an idea borrowed from Mercurial, but quite different from Git’s model.
    - Conflicts are first-class items: an idea borrowed from [Pijul][pijul] and [Darcs][darcs].
    - The user interface is not only reasonable but actually *really good*: an idea borrowed from… literally every <abbr>VCS</abbr> other than Git.

[pijul]: https://pijul.org
[darcs]: https://darcs.net

The combo of those means that you can use it today in your existing Git repos, as I have been for the past six months, and that it is a *really good* experience using it that way. (Better than Git!) Moreover, given it is being actively developed at and by Google for use as a replacement for its current custom <abbr>VCS</abbr> setup, it seems like it has a good future ahead of it.

Net: at a minimum you get a better experience for using Git with it. At a maximum, you get an incredibly smooth and shallow on-ramp to what I earnestly hope is the future of version control.

Jujutsu is *not* trying to do every interesting thing that other Git-alternative <abbr>DVCS</abbr> systems out there do. Unlike [Pijul][pijul], for example, it does not work from a theory of patches such that the order changes are applied is irrelevant. However, as I noted above and show in detail below, jj *does* distinguish between *changes* and *revisions*, and has first-class support for conflicts, which means that many of the benefits of Pijul’s handling come along anyway.

Unlike [Fossil][fossil], Jujutsu is also not trying to be an all-in-one tool. Accordingly: It does not come with a replacement for GitHub or other such “forges”. It does not include bug tracking. It does not support chat or a forum or a wiki. Instead, it is currently aimed at just doing the base <abbr title="version control system">VCS</abbr> operations well.

[fossil]: https://fossil-scm.org/home/doc/trunk/www/index.wiki

Finally, there is a thing Jujutsu is not *yet*: a standalone <abbr>VCS</abbr> ready to use *without* Git. It supports its own, “native” back end for the sake of keeping that door open for future capabilities, and the test suite exercises both the Git and the “native” back end, but the “native” one is not remotely ready for regular use. That said, this one I do expect to see change over time!


## Using Jujutsu

That is all interesting enough philosophically, but for a tool that, if successful, will end up being one of a software developer’s most-used tools, there is an even more important question: *What is it actually like to use?*


### Setup

Setup is painless. Running `brew install jj` did everything I needed. As with most modern Rust-powered <abbr title="command line interface">CLI</abbr> tools, Jujutsu comes with great completions right out of the box. I did make one post-install tweak, since I am going to be using this on existing Git projects: I updated my `~/.gitignore_global` to ignore `.jj` directories anywhere on disk.[^mac-pro-tip]

Using Jujutsu in an existing Git project is also quite easy.[^hiccup] You just run `jj init --git-repo <path to repo>`. That’s the entire flow. After that you can use `git` and `jj` commands alike on the repository, and everything Just Works™, right down to correctly handling `.gitignore` files.[^gitignore] I have since run `jj init` in every Git repository I am actively working on, and have had no issues.[^gitignore] It is also possible to initialize a Jujutsu copy of a Git project *without* having an existing Git repo, using `jj git clone`, which I have also done, and which mostly works well. (For where it does *not* work all that well, see the detailed section on Git interop below!)

[^hiccup]: I did have [one odd hiccup][init-issue] along the way due to a bug (already fixed, though not in a released version) in how Jujutsu handles a failure when initializing in a directory. While confusing, the problem was fixed in the next release… and this is what I expected of still-relatively-early software.

[init-issue]: https://github.com/martinvonz/jj/issues/1794

[^gitignore]: Back during my initial explorations, this was not entirely true, and Jujutsu was tracking files I do not want it to deep in a `node_modules` directory in one project where I was trying it out. It turned out there was [a bug][gitignore-issue], plain and simple. I was able to work around it in the end, but it stymied my initial attempts to commit anything there, because I really do not want *anything* from `node_modules` in history. However, that bug got fixed fairly quickly. This tells you two things:

    - Jujutsu is still early, though of course it is much less early than it was six months ago when I had that problem.
    - The Jujutsu team is *great* about solving these kinds of issues, and in a timely way.

[gitignore-issue]: https://github.com/martinvonz/jj/issues/1785

[^mac-pro-tip]: Pro tip for Mac users: add `.DS_Store` to your `~/.gitignore_global` and live a much less annoyed life—whether using Git or Jujutsu.


### Revisions and revsets

One of the big things to wrap your head around when first coming to Jujutsu is its approach to its *revisions* and *revsets*, i.e. “sets of revision”. Revisions are the fundamental elements of changes in Jujutsu, not “commits” as in Git. [Revsets][revsets] are then expressions in a functional language for selecting a set of revisions. The term and idea of revsets are borrowed directly from Mercurial. (Indeed, many things about Jujutsu build on Mercurial’s choices—a decision which makes me quite happy.)

[revsets]: https://github.com/martinvonz/jj/blob/f3d6616057fb3db3f9227de3da930e319d29fcc7/docs/revsets.md

The first place you are likely to run into this is in the `log` command, since `jj log` is likely to be something you do pretty early in trying it out: certainly it was for me. I initially thought that the `jj log` only included the information since initializing Jujutsu in a given directory, rather than the whole Git history, which was quite surprising. In fact, the view I was seeing was entirely down to a default behavior of `jj log`, totally independent of Git: the specific revset it chooses to display. Per [the tutorial][tutorial]’s note on the `log` command specifically:

> By default, `jj log` lists your local commits, with some remote commits added for context. The `~` indicates that the commit has parents that are not included in the graph. We can use the `-r` flag to select a different set of revisions to list.

To show the full revision history for a given commit, you can use a leading `:`, which indicates “parents”. (A trailing `:` indicates “children”.) Since `jj log` always gives you the identifier for a revision, you can follow it up with `jj log -r :<id>`. For example, in one repo where I am trying this, the most recent commit identifier starts with `mwoq` (Jujutsu helpfully highlights the segment of the identifier you need to use), so I could write `jj log -r :mwoq`, and this will show all the parents of `mwoq`. Like Git, `@` is a shortcut for “the current head commit”. Net, the equivalent command for “show me all the history for this commit” is:

```sh
$ jj log -r :@
```

What `jj log` *does* show by default was still a bit non-obvious to me, even after that. *Which* remote commits added for context, and why? The answer is in the `help` output for `jj log`’s `-r`/`--revisions` option:

> Which revisions to show. Defaults to the `ui.default-revset` setting, or `@ | (remote_branches() | tags()).. | ((remote_branches() | tags())..)-` if it is not set

This shows a couple other interesting features of Jujutsu’s approach to revsets and thus the `log` command:

1. It treats some of these operations as *functions* (`tags()`, `branches()`, etc.). I don’t have a deep handle on this yet, but I plan to come back to it. (There is a whole list [here][functions]!) This is not a surprise if you think about what “expressions in a functional language” implies… but it was a surprise to me because I had not yet read that bit of documentation.

2. It makes “operators” [a first-class idea][operators]. Git *has* operators, but this goes a fair bit further:

    - It includes `-` for the parent and `+` for a child, and these stack and compose, so writing `@-+-+` is the same as `@` as long as the history is linear. ([That is an important distinction!][distinction])
    
    - It supports union `|`, intersection `&`, and difference `~` operators.
    
    - The aforementioned `:<id>` for ancestors has a matching `<id>:` for descendants and `<id1>:<id2>` for a directed acyclic graph range between two commits. Notably, `<id1>:<id2>` is just `<id1>: & :<id2>`.

    - There is also a `..` operator, which also composes appropriately (and, smartly, is the same as `..` in Git when used between two commits, `<id1>..<id2>`). The trailing version, `<id>..`, is interesting: it is “revisions that are not ancestors of `<id>`”.

    This strikes me as *extremely* interesting: I think it will dodge a lot of pain in dealing with Git histories, because it lets you ask questions about the history in a compositional way using normal set logic.

[functions]: https://github.com/martinvonz/jj/blob/main/docs/revsets.md#functions
[operators]: https://github.com/martinvonz/jj/blob/main/docs/revsets.md#operators
[distinction]: https://github.com/martinvonz/jj/discussions/1905#discussioncomment-6533386

That’s all well and good, but even with reading the operator and function guides, it still took me a bit to actually quite make sense out of the default output. Right now, the docs have a bit of a flavor of <i>explanations for people who already have a pretty good handle on version control systems</i>, and the description of what you get from `jj log` is a good example of that. If and as the project gains momentum, it will need other kinds of more-introductory material, but the current status is totally fair and reasonable for the stage the project is at.

I also have yet to figure out how to see the equivalent of `git log`’s full commit message; when I `jj log`, it prints only the summary line, and the `jj log --help` output did not give me any hints about what I am missing! There *is* a template language for log output, and there are hints here and there in the docs for how it works, but the format is explicitly unstable and intentionally undocumented. Happily, the Git interop means I can just run `git log` instead if I need to.

This is all managed via [a templating system][templates], which uses “a functional language to customize output of commands”. The format is still evolving, but you can use it to customize the output today… while being aware that you may have to update it in the future. Keywords include things like `description` and `change_id`, and these can be customized in Jujutsu’s config. For example, I made these tweaks to mine:

```toml
[template-aliases]
'format_short_id(id)' = 'id.shortest()'
```

This gives me super short names for changes and commits, which makes for a *much* nicer experience when reading and working with both in the log output: Jujutsu will give me the shortest unique identifier for a given change or commit, which I can then use with commands like `jj new`.

[templates]: https://martinvonz.github.io/jj/v0.10.0/templates/


## Workflow

Once a project is initialized, working on it is fairly straightforward, though there are some significant adjustments required if you have deep-seated habits from Git! One of the really interesting bits about picking up Jujutsu is realizing just how weirdly Git has wired your brain, and re-learning how to think about how a version control system can work. It is one thing to believe—very strongly, in my case!—that Git’s <abbr title="user interface">UI</abbr> design is deeply janky (and its underlying model just so-so); it is something else to experience how much better a <abbr title="version control system">VCS</abbr> <abbr title="user interface">UI</abbr> can be (even without replacing the underlying model!).

<img src="https://cdn.chriskrycho.com/images/unlearn.gif" alt="Yoda saying “You must unlearn what you have learned.”">


### Changes

In Git, as in Subversion and Mercurial and other version control systems before them, when you finish with a change, you *commit* it. In Jujutsu, there is no first-class notion of “committing” code.[^legacy-commit] This took me a fair bit to wrap my head around! Instead, Jujutsu has two discrete operations:  `describe` and `new`. `jj describe` lets you provide a descriptive message for any change. `jj new` starts a new change. You can think of `git commit --message "something I did"` as being equivalent to `jj describe --message "some I did" && jj new`. This falls out of the fact that `jj describe` and `jj new` are orthogonal, and much more capable than `git commit` as a result.

The `describe` command works on *any* commit. It defaults to the commit that is the current working copy. If you want to rewrite a message earlier in your commit history, though, that is not a special operation like it is in Git, where you have to perform an interactive rebase to do it. You just call `jj describe` with a `--revision`  (or `-r` for short, as everywhere in Jujutsu) argument. For example:

```sh
# long version
$ jj describe --revision abcd --message "An updated message."

# short version
$ jj describe -r abcd -m "An updated message."
```

That's it. How you choose to integrate that into your workflow is a matter for you and your team to decide, of course. Jujutsu understands that some branches should not have their history rewritten this way, though, and lets you specify what the “immutable heads” revset should be accordingly. This actually makes it safer than Git, where the tool itself does not understand that kind of immutability and we rely on forges to protect certain branches from being targeted by a force push.

The `new` command is the core of creating any new change, and it does not require there to be only a single parent. You can create a new change with as many parents as is appropriate! Is a given change logically the child of four other changes, with identifiers `a`, `b`, `c`, and `d`? `jj new a b c d`. That's it. One neat consequence that falls out of this: `jj merge` is just `jj new` with the requirement that it have at least two parents. Another is that while Jujutsu *has* a `checkout` command,[^legacy-checkout] it is just an alias for `new`.

==TODO: replace this with a better recording. I’m leaving it here for my own reference for what to do better next time, as well as the config options I want!==

<figure>

- <script async id="asciicast-SUJdMwnKJqjUqAKvkjyQT3HGe" src="https://asciinema.org/a/SUJdMwnKJqjUqAKvkjyQT3HGe.js" data-speed="1.5" data-theme="nord"></script>

<figcaption>A demo of using <code>jj new</code> to create a three-parent merge</figcaption>

</figure>

Most of the time with Git, I am doing one of two things:

- Committing everything that is in my working copy: `git commit --all`[^ci-a-alias] is an *extremely* common operation for me.
- Committing a subset of it, not by using Git's `-p` to do it via that atrocious interface, but instead opening [Fork][fork] and doing it with Fork’s staging <abbr>UI</abbr>.

In the first case, Jujutsu’s choice to skip Git’s “index” looks like a very good one. In the second case, I was initially skeptical. Admittedly, my setup woes exacerbated my skepticism. Once I got things working, though, I started to come around. My workflow with [Fork][fork] looks an *awful* lot like the workflow that Jujutsu pushes you toward with actually using a diff tool. With Jujutsu, though, *any* diff tool can work. Want to use Vim? [Go for it.][vim-diff]

[kaleidoscope]: https://kaleidoscope.app
[appendix]: #appendix-kaleidoscope-setup-and-tips
[fork]: https://git-fork.com
[vim-diff]: https://gist.github.com/ilyagr/5d6339fb7dac5e7ab06fe1561ec62d45

What is more, Jujutsu’s approach to the working copy results in a *really* interesting shift. In every version control system I have worked with previously (including [<abbr title="Concurrent Versions System">CVS</abbr>][cvs], [<abbr title="PVCS  Version Manager, originally Polytron Version Control System">PVCS</abbr>][pvcs], [<abbr title="Subversion">SVN</abbr>][svn]), the workflow has been some variation on:

- Make a bunch of changes.
- Create a commit and write a message to describe it.

[cvs]: https://cvs.nongnu.org
[pvcs]: https://en.wikipedia.org/wiki/PVCS
[svn]: https://subversion.apache.org

With both Mercurial and Git, it also became possible to rewrite history in various ways. I use Git’s `rebase --interactive` command *extensively* when working on large sets of changes. (I did the same with Mercurial's history rewriting when I was using it a decade ago.) That expanded the list of common operations to include two more:

- Possibly directly amend that set of changes and/or its description.
- Possibly restructure history: breaking apart changes, reordering them, rewriting their message, changing what commit they land on top of, and more.

Jujutsu flips all of that on its head. A *change*, not a *commit*, is the fundamental element of the mental and working model. That means that you can describe a change that is still “in progress” as it were. I discovered this while working on a little example code for a blog post I plan to publish later this month: you can describe the change you are working on *and then keep working on it*. The act of describing the change is distinct from the act of “committing” and thus starting a *new* change. This falls out naturally from the fact that the working copy state is something you can operate on directly: akin to Git’s index, but without its many pitfalls. (This simplification affects a lot of things, as I will discuss further below; but it is especially important for new learners. Getting my head around the index was one of those things I found quite challenging initially with Git a decade ago.)

When you are ready to start a new change, you use either `jj commit` to “finalize” this commit with a message, or `jj new` to “Create a new, empty change and edit it in the working copy”. Implied: `jj commit` is just a convenience for `jj describe` followed by `jj new`. And a bonus: this means that rewording a message earlier in history does not involve some kind of rebase operation; you just `jj describe --revision <target>`.

What is more, `jj new` lets you create a new commit anywhere in the history of your project, trivially:

```
-A, --insert-after
      Insert the new change between the target commit(s) and their children

      [aliases: after]

-B, --insert-before
      Insert the new change between the target commit(s) and their parents

      [aliases: before]
```

You can do this using interactive rebasing with Git (or with history rewriting with Mercurial, though I am afraid my `hg` is rusty enough that I do not remember the details). What you cannot do in Git specifically is say “Start a new change at point *x*” unless you are in the middle of a rebase operation, which makes it inherently somewhat fragile. To be extra clear: Git allows you to check out make a new change at any point in your graph, but it creates a branch at that point, and none of the descendants of that original point in your commit graph will come along without explicitly rebasing. Moreover, even once you do an explicit rebase and cherry-pick in the commit, the original commit is still hanging out, so you likely need to delete that branch. With `jj new -A <some change ID>`, you just insert the change directly into the history. Jujutsu will rebase every child in the history, including any merges if necessary; it “just works”. That does not guarantee you will not have conflicts, of course, but Jujutsu also handles conflicts better—way better—than Git. More on that below.

I never use `git reflog` so much as when doing interactive rebases. Once I got the hang of Jujutsu’s ability to `jj new` anywhere, it basically obviates most of the places I have needed Git’s interactive rebase mode, especially when combined with Jujutsu’s aforementioned support for “first-class conflicts”. There *is* still an escape hatch for mistakes, though: `jj op log` shows all the operations you have performed on the repo—and frankly, is much more useful and powerful than `git reflog`, because it logs *all* the operations, including whenever Jujutsu updates its view of your working copy via `jj status`, when it fetches new revisions from a remote.

Additionally, Jujutsu allows you to see how any change has evolved over time. This handily solves multiple pain points in Git. For example, if you have made changes in your working copy, and would like to split it into multiple changes, Git only has a binary state to let you tease those apart: staged, or not. As a result, that kind of operation ranges in difficulty from merely painful to outright impossible. With its `obslog` command,[^obslog] Jujutsu allows you to see how a change has evolved over time. Since the working copy is just one more kind of “change”, you can very easily [retrieve][obslog-rewrite] earlier state—any time you did a `jj status` check, or any other command which snapshotted the state of the repository (which is most of them). That applies equally to earlier changes. If you just rebased, for example, and realize you moved some changes to code into the wrong revision, you can use the combination of `obslog` and `new` and `restore` (or `move`) to pull it back apart into the desired sequence of changes. (This one is hard to describe, so I may put up a video of it later!)

[obslog-rewrite]: https://github.com/martinvonz/jj/blob/3d0b3d57d82c5fe77527704d008256b7d995209c/docs/FAQ.md#i-accidentally-amended-the-working-copy-how-do-i-move-the-new-changes-into-its-own-commit

[^legacy-commit]: Jujutsu *used* to have a `commit` command, but `jj commit --message "hello"` was just an alias for `jj describe --message "hello" && jj new`.

[^legacy-checkout]: For now, anyway! The current plan is to deprecate it and teach people, including via the <abbr title="command line interface">CLI</abbr> itself—to use `new` instead.

[^ci-a-alias]: Actually it is normally `git ci -am "<message>"` with `-a` for “all” (`--all`) and `-m` for the message, and smashed together to avoid any  needless extra typing.

[^obslog]: The name is from Mercurial’s [evolution](https://www.mercurial-scm.org/doc/evolution/) feature, where it refers to changes which have become *obsolescent*, thus `obslog` is the “obsolescent changes log”. I recently suggested to the Jujutsu maintainers that renaming this might be helpful, because it took me six months of daily use to discover this incredibly helpful tool.

### Split

This also leads to another significant difference with Git: around breaking up your current set of changes on disk. As I noted above, Jujutsu treats the working copy itself as a commit instead of having an “index” like Git. Git really *only* lets you break apart a set of changes with the index, using `git add --patch`. Jujutsu instead has a `split` command, which launches a diff editor and lets you select what you want to incorporate—rather like `git add --patch` does. As with all of its commands, though, `jj split` works exactly the same way on *any* commit; the working copy commit gets it “for free”.

Philosophically, I really like this. Practically, though, it is a slightly bumpier experience for me than the Git approach at the moment. Recall that I do not use `git add --patch` directly. Instead, I always stage changes into the Git index using a graphical tool like [Fork][fork]. That workflow is slightly nicer than editing a diff—at least, as Jujutsu does it today. In Fork (and similar tools), you start with *no* changes and add what you want to the change set you want. By contrast, `jj split` launches a diff view with *all* the changes from a given commit present: splitting the commit involves *removing* changes from the right side of the diff so that it has only the changes you want to be present in the first of two new commits; whatever is *not* present in the final version of the right side when you close your diff editor ends up in the second commit.

If this sounds a little complicated, that is because *it is*. There are two big downsides to this approach, philosophically elegant though it is. First, I find it comes with more cognitive load. It requires thinking in terms of negation rather than addition, and the “second commit” becomes less and less visible over time as you remove it from the first commit. Second, it requires you to repeat the operation when breaking up something into more than two commits. I semi-regularly take a single bucket of changes on disk and chunk it up into *many* more than just 2 commits, though! That significantly multiplies the cognitive overhead.

Now, since I started working with Jujutsu, the team has switched the default view for working with these kinds of diffs to using `scm-diff-editor`, a <abbr title="textual user interface">TUI</abbr> which has a first-class notion of this kind of workflow.[^meld] That <abbr>TUI</abbr> works reasonably well, but is much less pleasant to use than something like the nice <abbr>GUI</abbr>s of [Fork][fork]  or [Tower][tower].

[meld]: https://meld.app
[gtk]: https://www.gtk.org
[meld-crash]: https://github.com/yousseb/meld/issues/147
[tower]: https://www.git-tower.com/mac

The net is: when I want to break apart changes, at least for the moment I find myself quite tempted to go back to Fork and Git’s index. I do not think this problem is intractable, and I think the *idea* of `jj split` is right. It just—“just”!—needs some careful design work. Preferably, the `split` command would make it straightforward to generate an arbitrary number of commits from one initial commit, and it would allow progressive creation of each commit from a “vs. the previous commit” baseline. This is the upside of the index in Git: it does actually reflect the reality that there are three separate “buckets” in view when splitting apart a change: the baseline before all changes, the set of all the changes, and the set you want to include in the commit. Existing diff tools do not really handle this—other than the integrated index-aware diff tools in Git clients, which then have their own oddities when interacting with Jujutsu, since it ignores the index.

- ==TODO: on `jj amend`==
- ==TODO: on `jj merge`==
- ==TODO: on `jj squash`==

Another huge feature of Jujutsu is it support for *first-class conflicts*. Instead of a conflict resulting in a nightmare that has to be resolved before you can move on, Jujutsu can incorporate both the merge and its resolution (whether manual or automatic) directly into commit history. Just having the conflicts in history does not seem that weird. “Okay, you committed the text conflict markers from git, neat.” But: having the conflict and its resolution in history, especially when Jujutsu figured out how to do that resolution for you, as part of a rebase operation? That is just plain *wild*.

A while back, I was working on a change to [a library][true-myth] I maintain[^fun] and decided to flip the order in which I landed two changes to `package.json`. Unfortunately, those changes were adjacent to each other in the file and so flipping the order they would land in seemed likely to be painfully difficult. It was actually trivial. First of all, the flow itself was great: instead of launching an editor for interactive rebase, I just explicitly told Jujutsu to do the rebases: `jj rebase --revision <source> --destination <target>`. I did that for each of the items I wanted to reorder and I was done. (I could also have rebased a whole series of commits; I just did not need to in this case.) Literally, that was it: because Jujutsu had agreed with me that <abbr>JSON</abbr> is a terrible format for changes like this and committed a merge conflict, then *resolved* the merge conflict via the next rebase command, and simply carried on.

[true-myth]: https://github.com/true-myth/true-myth

[^fun]: Yes, this is what I do for fun on my time off. At least: partially.

[^meld]: They also enabled support for a three-pane view in [Meld][meld], which allegedly makes it somewhat better. However, Meld is pretty janky on macOS (as [GTK][gtk] apps basically always are), and it has a *terrible* startup time for reasons that are unclear at this point, which means this was not a great experience in the first place… and Meld [crashes on launch][meld-crash] on the current version of macOS.


### Branches

- ==TODO: describe branch behavior==
- ==TODO: in particular: you can `describe` and `branch set` and `push` without doing `new`!==

In practice, I find the choice makes perfect sense in local use. Especially for the case where I am making some small and self-contained change, the name of a given branch is often just some short, [snake-case][snake-case]-ified version of the commit message. The default log template described above shows me the current set of branches, and their commit messages are usually sufficiently informative that I do not need anything else. However, there are some downsides to this approach in practice.

First, the lack of a “current branch” makes for some extra friction when working with tools like GitHub, GitLab, Gitea, and so on. The GitHub model (which other tools have copied) treats branches as the basis for all work. GitHub displays warning messages about commits which are not on a branch, and will not allow you to create a pull request from an anonymous branch. In many ways, this is simply because Git itself treats  branches as special and important. GitHub is just following Git’s example of loud warnings about being on a “detached `HEAD`” commit, after all.

What this means in practice, though, is that there is an extra operation required any time you want to push your changes to GitHub or a similar forge. With Git, you simply `git push` after making your changes, and since Git keeps the current branch pointing at the current `HEAD`, Git aliases `git push` with no arguments to `git push <configured remote for current branch> <current branch>`. Jujutsu does not do this, and given how its branching model works today, *cannot* do this, because named branches do not “follow” your operations. Instead, you must first explicitly set the branch to the most recent commit, `jj branch set <current branch>`. Only then can you run `jj git push`. This is only a paper cut, but it is a paper cut. ==TODO: keep going==

Second, ==TODO: collaboration==

[snake-case]: TODO


### Git interop

==TODO: introduce this section==

{% note %}

Jujutsu does this by using `libgit2`, so there is effectively no risk of breaking your repo because of a Jujutsu–Git interop issue. To be sure, there can be bugs in Jujutsu itself, and you can do things using Jujutsu that will leave you in a bit of a mess, but the same is true of *any* tool which works on your Git repository. The risk might be very slightly higher here than with your average <abbr>GUI</abbr> Git client, since Jujutsu is mapping different semantics onto the repository, but I have fairly high confidence in the project at this point, and I think you can too.

{% endnote %}

### The rough edges

Unsurprisingly, given the scale of the problem domain, there are still some rough edges and gaps. <!-- TODO: enumerate them! -->

<!-- TODO: expand on this a bit, too -->We are going to want new tooling which actually understands Jujutsu. This will be a recurring theme in this section!


## Conclusion

Jujutsu has become my version control tool of choice since I picked it up over the summer. The rough edges and gaps I described throughout this write-up notwithstanding, I *much* prefer it to working with Git directly. I do not hesitate to recommend that you try it out on personal projects: indeed, I actively recommend it! Moreover, because using it in existing Git repositories is transparent, there is no inherent reason individual developers or teams cannot use it today. (Your corporate security policy might have be a different story.)

Is Jujutsu ready for you to roll out at your Fortune 500 company? Probably not. While it is improving at a steady clip—most of the rough edges I hit in mid-2023 are long since fixed—it is still undergoing breaking changes in design here and there, and there is effectively no material out there about how to use it yet. (This essay exists, in part, as an attempt to change that!) Beyond Jujutsu itself, there is a lot of work to be done to build an ecosystem around it. Most of the remaining rough edges are squarely to do with the lack of understanding from other tools.  The project is marching steadily toward a 1.0 release… someday. As for when that might be, there are as far as I know no plans: there is still too much to do. Above all, I am very eager to see what a native Jujutsu backend would look like. Today, it is “just” a much better model for working with Git repos. A world where the same level of smarts being applied to the front end goes into the back end too is a world well worth looking forward to.


## Appendix: Kaleidoscope setup and tips

<!-- TODO: do I even keep this at all? -->

As noted in my overall write-up, there was a quirk in being able to use [Kaleidoscope][kaleidoscope], my beloved diff-and-merge tool, for the Jujutsu diff editor. However, you *can* use Kaleidoscope that way, and I wanted to document the appropriate setup here:

1. Add the following to your Jujutsu config (`jj config edit --user`) to configure Kaleidoscope for the various diff and merge operations:

    ```toml
    [ui]
    diff-editor = ["ksdiff", "--wait", "$left", "--no-snapshot", "$right", "--no-snapshot"]
    merge-editor = ["ksdiff", "--merge", "--output", "$output", "--base", "$base", "--", "$left", "--snapshot", "$right", "--snapshot"]
    ```
    
    I will note, however, that I have still not been 100% successful using Kaleidoscope this way. In particular, `jj split` does not give me the desired results; it often ends up reporting “Nothing changed” when I close Kaleidoscope.

2. When opening a *file* diff, you must <kbd>Option ⎇</kbd>-double-click, *not* do a normal double-click, so that it will preserve the `--no-snapshot` behavior. That `--no-snapshot` argument to `ksdiff` is what makes the resulting diff editable, which is what Jujutsu needs for its just-edit-a-diff workflow. I have been in touch with the Kaleidoscope folks about this, which is how I even know about this workaround; they are evaluating whether it is possible to make the normal double-click flow preserve the `--no-snapshot` in this case so you do not *have* to do the workaround.
