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

started: 2023-07-01T18:42:00-0600
updated: 2023-07-24T15:55:00-0700
updates:
  - at: 2023-07-02T21:43:00-0600
    changes: >
      Added some initial notes about initial setup bumps. And a *lot* of notes on the things I learned in trying to fix those!

  - at: 2023-07-03T07:27:00-0600
    changes: >
      Reorganized and clarified the existing material a bit.

  - at: 2023-07-03T10:45:00-0600
    changes: >
      Wrote up some experience notes on actually using `jj describe` and `jj new`: this is pretty wild, and I think I like it?

  - at: 2023-07-09T14:02:00-0600
    changes: >
      Rewrote the `jj log` section to incorporate info about revsets, rewrote a couple of the existing sections now that I have significantly more experience, and added a bunch of notes to myself about what to tackle next in this write-up.

  - at: 2023-07-12T21:08:00-0600
    changes: >
      Added a section on the experience of having first-class merging Just Work™, added an appendix about Kaleidoscope setup and usage, rewrote the paragraph where I previously mentioned the issues about Kaleidoscope, and iterated on the commit-vs.-change distinction.

  - at: 2023-07-13T08:04:00-0600
    changes: >
      Elaborated on the development of version control systems (both personally and in general!)… and added a bunch of `<abbr>` tags.

  - at: 2023-07-24T12:08:00-0700
    changes: >
      Describing my current feelings about the `jj split` and auto-committed working copy vs. `git add --patch` (as mediated by a <abbr>UI</abbr>).

  - at: 2023-07-24T15:55:00-0700
    changes: >
      Correcting my description of revision behavior per discussion with the maintainer.

  - at: 2023-07-31T21:07:00-0700
    changes: >
      Starting to do some work on the introduction.

draft: true

---

{% callout %}

Some background: Along with my experiment with [Mac-native text editors][experiment] over a recent extended stretch of time off, I spent some time learning [Jujutsu][jj]. Jujutsu is a new version control system from a software engineer at Google, which already (though tentatively) has a good future there as a next-gen development beyond Google’s history with Perforce, Piper, and Mercurial. I find it interesting both for the approach it takes and for its careful design choices in terms of both implementation details and user interface. Indeed, I think—hope!—it has a possible future as the [next generation of version control][next-gen-vcs].

[experiment]: https://v5.chriskrycho.com/journal/trying-bbedit-and-nova/
[jj]: https://github.com/martinvonz/jj#command-line-completion
[next-gen-vcs]: https://v4.chriskrycho.com/2014/next-gen-vcs.html

{% endcallout %}

{% note %}

Watch this space over the next month: I will update it with notes and comments about the experience, as well as expanding on these thoughts. This is a “garden”-style post and will grow organically over time!

{% endnote %}


## Overview

Jujutsu is one possible answer to a question I first started asking [most of a decade ago]([next-gen-vcs]): *What might a next-gen version control system look like—one which actually learned from the best parts of all of this generation’s systems, including Mercurial, Git, Darcs, Fossil, etc.?* To answer that question, it is important to have a sense of what those lessons are.

This is trickier than it might seem. Git has substantially the most “mind-share” in the current generation; most software developers learn it and use it not because they have done any investigation of the tool and its alternatives but because it is a _de facto_ standard: a situation which arose in no small part because of its “killer app” in the form of GitHub. Developers who have been around for more than a decade or so have likely seen more than one version control system—but there are many, *many* developers for whom Git was their first and, so far, last <abbr title="version control system">

==TODO: What is Jujutsu? Why is it interesting?==

- *change* as distinct from *revision*: borrowed from Mercurial
- first-class conflicts: borrowed from Pijul and Darcs
- a reasonable user interface (!!!)

==TODO: what is it *not*, and why?==

- Pijul-style “we have hard math to make all changes commute”


## Usage notes 

That is all interesting enough philosophically, but for a tool that, if successful, will end up being one of a software developer’s most-used tools, there is an even more important question: *What is it actually like to use?*

{% note %}

For all of these kinds of initial notes, I will update them/rewrite them as I figure them out; but I will *not* do is pretend like they were not issues. At some point I expect the notes throughout to read something like:

> - It was not initially clear to me how to see the equivalent of…

{% endnote %}

### Setup

Setup is, overall, quite easy: `brew install jj` did everything I needed. As with most modern Rust-powered <abbr title="command line interface">CLI</abbr> tools, Jujutsu comes with great completions right out of the box. I did make one post-install tweak, since I am going to be using this on existing Git projects: I updated my `~/.gitignore_global` to ignore `.jj` directories anywhere on disk.[^mac-pro-tip]

Using Jujutsu in an existing Git project is also quite easy.[^hiccup] You just run `jj init --git-repo <path to repo>`. That’s the entire flow. After that you can use `git` and `jj` commands alike on the repository, and everything Just Works™. I have since run `jj init` in every Git repository I am actively working on, and have had no issues. It is also possible to initialize a Jujutsu copy of a Git project *without* having an existing Git repo, using `jj git clone`, which I have also done, and which mostly works well. (For where it does *not* work all that well, see the detailed section on Git interop below!)

[^hiccup]: I did have [one odd hiccup][init-issue] along the way due to a bug (already fixed, though not in a released version) in how Jujutsu handles a failure when initializing in a directory. While confusing, the problem should be fixed in the next release… and this is what I expected of still-relatively-early software.

[init-issue]: https://github.com/martinvonz/jj/issues/1794

Notionally, Jujutsu understands local `.gitignore` files and uses them. As of my initial explorations (specifically, as of 2023-07-02), it is tracking files I do not want it to in a `node_modules` directory in one project where I am trying it out: there is [a bug][gitignore-issue], plain and simple. I was able to work around it in the end, but it stymied my initial attempts to commit anything there, because I really do not want *anything* from `node_modules` in history.

[gitignore-issue]: https://github.com/martinvonz/jj/issues/1785


### Learnings from `jj log`

One of the big things to wrap your head around when first coming to Jujutsu is its approach to its “revsets”, which are the fundamental elements of changes. It takes a somewhat different approach from the other <abbr title="distributed version control system">DVCS</abbr> tools I have used. Specifically: [revsets][revsets] are actually expressions in a functional language “for selecting a set of revisions”. The term and idea are borrowed directly from Mercurial (as is common in many things about Jujutsu, and about which I am quite happy).

[revsets]: https://github.com/martinvonz/jj/blob/f3d6616057fb3db3f9227de3da930e319d29fcc7/docs/revsets.md

The first place you are likely to run into this is in the `log` command, since `jj log` is likely to be something you do pretty early in trying it out: certainly it was for me. I initially thought that the `jj log` only included the information since initializing Jujutsu in a given directory, rather than the whole Git history, which was quite surprising. In fact, the view I was seeing was entirely down to a default behavior of `jj log`, totally independent of Git: the specific revset it chooses to display. Per [the tutorial][tutorial]’s note on the `log` command specifically:

> By default, `jj log` lists your local commits, with some remote commits added for context. The `~` indicates that the commit has parents that are not included in the graph. We can use the `-r` flag to select a different set of revisions to list.

To show the full revision history for a given commit, you can use a leading `:`, which indicates “parents”. (A trailing `:` indicates “children”.) Since `jj log` always gives you the identifier for a revision, you can follow it up with `jj log -r :<id>`. For example, in one repo where I am trying this, the most recent commit identifier starts with `mwoq` (Jujutsu helpfully highlights the segment of the identifier you need to use), so I could write `jj log -r :mwoq`, and this will show all the parents of `mwoq`. Like Git, `@` is a shortcut for “the current head commit”. Net, the equivalent command for “show me all the history for this commit” is:

```sh
$ jj log -r :@
```

What `jj log` *does* show by default was still a bit non-obvious to me, even after that. *Which* remote commits added for context, and why? The answer is in the `help` output for `jj log`’s `-r`/`--revisions` option:

> Which revisions to show. Defaults to the `ui.default-revset` setting, or `@ | (remote_branches() | tags()).. | ((remote_branches() | tags())..)-` if it is not set

This shows a couple other interesting features of `jj`’s approach to revsets and thus the `log` command:

1. It treats some of these operations as *functions* (`tags()`, `branches()`, etc.). I don’t have a deep handle on this yet, but I plan to come back to it. (There is a whole list [here][functions]!) This is not a surprise if you think about what “expressions in a functional language” implies… but it was a surprise to me because I had not yet read that bit of documentation.

2. It makes “operators” [a first-class idea][operators]. Git *has* operators, but this goes a fair bit further:

    - It includes `-` for the parent and `+` for a child, and these stack and compose, so writing `@-+-+` is the same as `@` as long as the history is linear. ([That is an important distinction!][distinction])
    
    - It supports union `|`, intersection `&`, and difference `~` operators.
    
    - The aforementioned `:<id>` for ancestors has a matching `<id>:` for descendants and `<id1>:<id2>` for a directed acyclic graph range between two commits. Notably, `<id1>:<id2>` is just `<id1>: & :<id2>`.

    - There is also a `..` operator, which also composes appropriately (and, smartly, is the same as `..` in Git when used between two commits, `<id1>..<id2>`). The trailing version, `<id>..`, is interesting: it is “revisions that are not ancestors of `<id>`”.

    This strikes me as *extremely* interesting: I think it will dodge a loooot of pain in dealing with Git histories, because it lets you ask questions about the history in a compositional way using normal set logic.

[functions]: https://github.com/martinvonz/jj/blob/main/docs/revsets.md#functions
[operators]: https://github.com/martinvonz/jj/blob/main/docs/revsets.md#operators
[distinction]: https://github.com/martinvonz/jj/discussions/1905#discussioncomment-6533386

That’s all well and good, but even with reading the operator and function guides, it still took me a bit to actually quite make sense out of the default output. Right now, the docs have a bit of a flavor of <i>explanations for people who already have a pretty good handle on version control systems</i>, and the description of what you get from `jj log` is a good example of that. If and as the project gains momentum, it will need other kinds of more-introductory material, but the current status is totally fair and reasonable for the stage the project is at.

I also have yet to figure out how to see the equivalent of `git log`’s full commit message; when I `jj log`, it prints only the summary line, and the `jj log --help` output did not give me any hints about what I am missing! There *is* a template language for log output, and there are hints here and there in the docs for how it works, but the format is explicitly unstable and intentionally undocumented. Happily, the Git interop means I can just run `git log` instead if I need to.

[^mac-pro-tip]: Pro tip for Mac users: add `.DS_Store` to your `~/.gitignore_global` and live a much less annoyed life.

### Working on projects

Once a project is initialized, working on it is fairly straightforward, though there are some significant adjustments required if you have deep-seated habits from Git!

Courtesy of the `node_modules` issue described above, I was initially not able even to commit the very update to this item where I am writing this sentence using Jujutsu, because I could not figure out how to get it configured with [Kaleidoscope][kaleidoscope], my go-to diff and merge tool. (This turned out to be a quirk with how to launch file diffs; see [the appendix][appendix] if you’re curious.) Once I worked around that, though, I quickly came to see the upside. Most of the time with Git, I am doing one of two things:

- Committing everything that is in my working copy: `git commit -a` is an *extremely* common operation for me.
- Committing a subset of it, not by using Git's `-p` to do it via that atrocious interface, but instead opening [Fork][fork] and doing it with Fork’s staging <abbr>UI</abbr>.

In the first case, Jujutsu’s choice to skip Git’s “index” looks like a very good one. In the second case, I was initially skeptical. Admittedly, my setup woes exacerbated my skepticism. Once I got things working, though, I started to come around. My workflow with Fork looks an *awful* lot like the workflow that Jujutsu pushes you toward with actually using a diff tool. With Jujutsu, though, *any* diff tool can work. Want to use Vim? [Go for it.][vim-diff]

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

Jujutsu flips all of that on its head. A *change*, not a *commit*, is the fundamental element of the mental and working model. That means that you can describe a change that is still “in progress” as it were. I discovered this while working on a little example code for a blog post I plan to publish later this month: you can describe the change you are working on *and then keep working on it*. The act of describing the change is distinct from the act of “committing” and thus starting a *new* change. This falls out naturally from the fact that the working copy state is something you can operate on directly: akin to Git’s index, but without its many pitfalls. (This simplification affects a lot of things, as I will discuss further below; but it is especially important for new learners. Getting my head around the index was one of those things I found quite challenging initially with Git a decade ago.) When you are ready to start a new change, you use either `jj commit` to “finalize” this commit with a message, or `jj new` to “Create a new, empty change and edit it in the working copy”. Implied: `jj commit` is just a convenience for `jj describe` and `jj new`. And a bonus: this means that rewording a message earlier in history does not involve some kind of rebase operation; you just `jj describe --revision <target>`.

This is also where merging comes in, and it comes with some other frankly astonishing abilities:

```
-A, --insert-after
      Insert the new change between the target commit(s) and their children

      [aliases: after]

-B, --insert-before
      Insert the new change between the target commit(s) and their parents

      [aliases: before]
```

You can do this using interactive rebasing with Git (or with history rewriting with Mercurial, though I am afraid my `hg` is rusty enough that I do not remember the details). What you cannot do in Git specifically is say “Start a new change at point *x*” without that being in the middle of a rebase operation, which makes it inherently somewhat fragile. I never use `git reflog` so much as when doing interactive rebases! Once I got the hang of this, it basically obviates most of the need for Git’s interactive rebase mode, especially when combined with Jujutsu’s support for “first-class conflicts”. There *is* still an escape hatch for mistakes, though: `jj op log` shows all the operations you have performed on the repo—and frankly, is much more useful and powerful than `git reflog`, because it logs *all* the operations.

This also leads to another significant difference with Git: around breaking up your current set of changes on disk. As I noted above, Jujutsu treats the working copy itself as a commit instead of having an “index” like Git. Git really *only* lets you break apart a set of changes with the index, using `git add --patch`. Jujutsu instead has a `split` command, which launches a diff editor and lets you select what you want to incorporate—rather like `git add --patch` does. As with all of its commands, though, `jj split` works exactly the same way on *any* commit; the working copy commit gets it “for free”.

Philosophically, I really like this. Practically, it is a slightly bumpier experience for me than the Git approach at the moment. Recall that I do not use `git add --patch` directly. Instead, I always stage changes into the Git index using a graphical tool like [Fork][fork]. That workflow is slightly nicer than editing a diff—at least, as Jujutsu does it today. In Fork (and similar tools), you start with *no* changes and add what you want to the change set you want. By contrast, `jj split` launches a diff view with *all* the changes from a given commit present: splitting the commit involves *removing* changes from the right side of the diff so that it has only the changes you want to be present in the first of two new commits; whatever is *not* present in the final version of the right side when you close your diff editor ends up in the second commit.

If this sounds a little complicated, that is because *it is*. There are two big downsides to this approach, philosophically elegant though it is. First, I find it comes with more cognitive load. It requires thinking in terms of negation rather than addition, and the “second commit” becomes less and less visible over time as you remove it from the first commit. Second, it requires you to repeat the operation when breaking up something into more than two commits. I semi-regularly take a single bucket of changes on disk and chunk it up into *many* more than just 2 commits, though! That significantly multiplies the cognitive overhead.

The net is: when I want to break apart changes, at least for the moment I find myself quite tempted to go back to Fork and Git’s index. I do not think this problem is intractable, and I think the *idea* of `jj split` is right. It just—“just”!—needs some careful design work. Preferably, the `split` command would make it straightforward to generate an arbitrary number of commits from one initial commit, and it would allow progressive creation of each commit from a “vs. the previous commit” baseline. This is the upside of the index in Git: it does actually reflect the reality that there are three separate “buckets” in view when splitting apart a change: the baseline before all changes, the set of all the changes, and the set you want to include in the *next* commit. Existing diff tools do not really handle this—other than the integrated index-aware diff tools in Git clients!

<!--
- ==TODO: on `jj amend`==
- ==TODO: on `jj merge`==
- ==TODO: on `jj squash`==
-->

Another huge feature of Jujutsu is it support for *first-class conflicts*. Instead of a conflict resulting in a nightmare that has to be resolved before you can move on, Jujutsu can incorporate both the merge and its resolution (whether manual or automatic) directly into commit history. Just having the conflicts in history does not seem that weird. “Okay, you committed the text conflict markers from git, neat.” But: having the conflict and its resolution in history, especially when Jujutsu figured out how to do that resolution for you, as part of a rebase operation? That is just plain *wild*.

I was working on a change to [a library][true-myth] I maintain[^fun] and decided to flip the order in which I landed two changes to `package.json`. Unfortunately, those changes were adjacent to each other in the file and so flipping the order they would land in seemed likely to be non-trivial. It was actually *extremely* trivial. First of all, the flow itself was great: instead of launching an editor for interactive rebase, I just explicitly told Jujutsu to do the rebases: `jj rebase --revision <source> --destination <target>`. I did that for each of the items I wanted to reorder and I was done. (I could also have rebased a whole series of commits; I just did not need to in this case.) Literally, that was it: because Jujutsu had agreed with me that <abbr>JSON</abbr> is a terrible format for changes like this and committed a merge conflict, then *resolved* the merge conflict via the next rebase command, and simply carried on.

[true-myth]: https://github.com/true-myth/true-myth

[^fun]: Yes, this is what I do for fun on my month off. At least: partially.


### Git Interop

==TODO: add some commentary and color here==

- ==TODO: branch behavior is a bit quirky-feeling at first, and definitely makes interacting with GitHub repos a bit weird==
- ==TODO: `jj git push` and friends do not always seem to work==
- ==TODO: tip: for successful workflow==

{% note %}

Jujutsu does this by using `libgit2`, so there is effectively no risk of breaking your repo because of a Jujutsu–Git interop issue. To be sure, there can be bugs in Jujutsu itself, and you can do things using Jujutsu that will leave you in a bit of a mess, but the same is true of *any* tool which works on your Git repository. The risk might be very slightly higher here than with your average <abbr>GUI</abbr> Git client, since Jujutsu is mapping different semantics onto the repository, but I have fairly high confidence in the project at this point, and I think you can too.

{% endnote %}

## Appendix: Kaleidoscope setup and tips

As noted in my overall write-up, there was a quirk in being able to use [Kaleidoscope][kaleidoscope], my beloved diff-and-merge tool, for the Jujutsu diff editor. However, you *can* use Kaleidoscope that way, and I wanted to document the appropriate setup here:

1. Add the following to your Jujutsu config (`jj config edit --user`) to configure Kaleidoscope for the various diff and merge operations:

    ```toml
    [ui]
    diff-editor = ["ksdiff", "--wait", "$left", "--no-snapshot", "$right", "--no-snapshot"]
    merge-editor = ["ksdiff", "--merge", "--output", "$output", "--base", "$base", "--", "$left", "--snapshot", "$right", "--snapshot"]
    ```
    
    I will note, however, that I have still not been 100% successful using Kaleidoscope this way. In particular, `jj split` does not give me the desired results; it often ends up reporting “Nothing changed” when I close Kaleidoscope.

2. When opening a *file* diff, you must <kbd>Option ⎇</kbd>-double-click, *not* do a normal double-click, so that it will preserve the `--no-snapshot` behavior. That `--no-snapshot` argument to `ksdiff` is what makes the resulting diff editable, which is what Jujutsu needs for its just-edit-a-diff workflow. I have been in touch with the Kaleidoscope folks about this, which is how I even know about this workaround; they are evaluating whether it is possible to make the normal double-click flow preserve the `--no-snapshot` in this case so you do not *have* to do the workaround.
