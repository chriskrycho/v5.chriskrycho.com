---
title: jj init
subtitle: >
  What if we actually *could* replace Git? Jujutsu might give us a real shot.

qualifiers:
  audience: >
    People who have worked with Git or other modern version control systems like Mercurial, Darcs, Pijul, Bazaar, etc., and have at least a basic idea of how they work.

summary: >
  Jujutsu (`jj`) is a new version control system from a software developer at Google. I have been using it full time for 6 months. Here’s why you should switch, too.

thanks: >
  [Waleed Khan (@arxanas)](https://github.com/arxanas), [Joy Reynolds (@joyously)](https://github.com/joyously), and [Isabella Basso (@isinyaaa)](https://github.com/isinyaaa) all took time to read and comment on earlier drafts of this mammoth essay, and it is substantially better for their feedback!

tags:
  - software development
  - tools
  - version control
  - Jujutsu
  - Git

image: https://cdn.chriskrycho.com/images/unlearn.jpg

discuss:
  hn: https://news.ycombinator.com/item?id=39232456
  lobsters: https://lobste.rs/s/pvvbhm/jj_init
  li: https://www.linkedin.com/feed/update/urn:li:activity:6923287174180212736/
  twitter: https://twitter.com/chriskrycho/status/1753489910600712246?s=20
  mastodon: https://mastodon.social/@chriskrycho/111863369362392797
  bluesky: https://bsky.app/profile/chriskrycho.com/post/3kkhe5pxuek27
  threads: https://www.threads.net/@chriskrycho/post/C22w19OgBJV

date: 2024-02-02T11:30:00-0700
started: 2023-07-01T18:42:00-0600

updated: 2024-02-04T15:17:00-0700
updates:
  - at: 2024-02-04T15:17:00-0700
    changes: >
      Filled out the section on Git interop. (How did I miss that before publishing?!?)
  
  - at: 2024-02-03T10:25:00-0700
    changes: >
      Added an example of the `log` format right up front in that section.

  - at: 2024-02-02T08:35:00-0700
    changes: >
      Reworked section on revsets and prepared for publication!

  - at: 2024-02-01T17:25:00-0700
    changes: >
      Finished a draft! Added one and updated another asciinema for some of the basics, finished up the tooling section, and made a bunch of small edits.

  - at: 2024-01-31T08:05:00-0700
    changes: >
      Finished describing first-class conflicts and added asciinema recordings showing conflicts with merges and rebases.

  - at: 2024-01-30T09:55:00-0700
    changes: >
      Added a ton of material on branches and on CLI design.

  - at: 2024-01-29T13:05:00-0700
    changes: >
      Wrote up a section on “changing changes”, focused on the `squash` and `move` commands.

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

---

[Jujutsu][jj] is a new version control system from a software engineer at Google, where it is on track to replace Google’s existing version control systems (historically: Perforce, Piper, and Mercurial). I find it interesting both for the approach it takes and for its careful design choices in terms of both implementation details and user interface. It offers one possible answer to a question I first started asking [most of a decade ago][next-gen-vcs]: *What might a next-gen version control system look like—one which actually learned from the best parts of all of this generation’s systems, including Mercurial, Git, Darcs, Fossil, etc.?*

[jj]: https://github.com/martinvonz/jj#command-line-completion
[next-gen-vcs]: https://v4.chriskrycho.com/2014/next-gen-vcs.html

To answer that question, it is important to have a sense of what those lessons are. This is trickier than it might seem. Git has substantially the most “mind-share” in the current generation; most software developers learn it and use it not because they have done any investigation of the tool and its alternatives but because it is a _de facto_ standard: a situation which arose in no small part because of its “killer app” in the form of GitHub. Developers who have been around for more than a decade or so have likely seen more than one version control system—but there are many, *many* developers for whom Git was their first and, so far, last <abbr title="version control system">VCS</abbr>.

The problems with Git are many, though. Most of all, its infamously terrible command line interface results in a terrible user experience. In my experience, very few working  developers have a good mental model for Git. Instead, they have a handful of commands they have learned over the years: enough to get by, and little more. The common rejoinder is that developers ought to learn how Git works internally—that everything will make more sense that way.

This is nonsense. Git’s internals are *interesting* on an implementation level, but frankly add up to an incoherent mess in terms of a user mental model. This is a classic mistake for software developers, and one I have fallen prey to myself any number of times. I do not blame the Git developers for it, exactly. No one should have to understand the internals of the system to use it well, though; that is a simple failure of software design. Moreover, even those internals do not particularly *cohere*. The index, the number of things labeled “-ish” in the glossary, the way that a “detached `HEAD`” interacts with branches, the distinction between tags and branches, the important distinctions between commits, refs, and objects… It is not that any one of those things is bad in isolation, but as a set they do not amount to a mental model I can describe charitably. Put in programming language terms: One of the reasons the “surface syntax” of Git is so hard is that its semantics are a bit confused, and that *inevitably* shows up in the interface to users.

Still, a change in a system so deeply embedded in the software development ecosystem is not cheap. Is it worth the cost of adoption?  Well, Jujutsu has a trick up its sleeve: there is no adoption cost. You just install it—`brew install jj` will do the trick on macOS—and run a single command in an existing Git repository, and… that’s it. (“There is no step 3.”) I expect that mode will always work, even though there will be a migration step at some point in the future, when Jujutsu’s own, non-Git backend becomes a viable—and ultimately the recommended—option. I am getting ahead of myself though. The first thing to understand is what Jujutsu is, and is not.

Jujutsu is two things:

1. **It is a new front-end to Git.** This is *by far* the less interesting of the two things, but in practice it is a substantial part of the experience of using the tool today. In this regard, it sits in the same notional space as something like [gitoxide](https://github.com/Byron/gitoxide). Jujutsu’s `jj` is far more usable for day to day work than gitoxide’s `gix` and `ein` so far, though, and it also has very different aims. That takes us to:

2. **It is a new design for distributed version control.** This is by far the more interesting part. In particular, Jujutsu brings to the table a few key concepts—none of which are themselves novel, but the combination of which is *really* nice to use in practice:

    - *Changes* are distinct from *revisions*: an idea borrowed from Mercurial, but quite different from Git’s model.
    - Conflicts are first-class items: an idea borrowed from [Pijul][pijul] and [Darcs][darcs].
    - The user interface is not only reasonable but actually *really good*: an idea borrowed from… literally every <abbr>VCS</abbr> other than Git.

[pijul]: https://pijul.org
[darcs]: https://darcs.net

The combo of those means that you can use it today in your existing Git repos, as I have been for the past six months, and that it is a *really good* experience using it that way. (Better than Git!) Moreover, given it is being actively developed at and by Google for use as a replacement for its current custom <abbr>VCS</abbr> setup, it seems like it has a good future ahead of it. Net: at a minimum you get a better experience for using Git with it. At a maximum, you get an incredibly smooth and shallow on-ramp to what I earnestly hope is the future of version control.

Jujutsu is *not* trying to do every interesting thing that other Git-alternative <abbr>DVCS</abbr> systems out there do. Unlike [Pijul][pijul], for example, it does not work from a theory of patches such that the order changes are applied is irrelevant. However, as I noted above and show in detail below, jj *does* distinguish between *changes* and *revisions*, and has first-class support for conflicts, which means that many of the benefits of Pijul’s handling come along anyway. Unlike [Fossil][fossil], Jujutsu is also not trying to be an all-in-one tool. Accordingly: It does not come with a replacement for GitHub or other such “forges”. It does not include bug tracking. It does not support chat or a forum or a wiki. Instead, it is currently aimed at just doing the base <abbr title="version control system">VCS</abbr> operations well.

[fossil]: https://fossil-scm.org/home/doc/trunk/www/index.wiki

Finally, there is a thing Jujutsu is not *yet*: a standalone <abbr>VCS</abbr> ready to use *without* Git. It supports its own, “native” back end for the sake of keeping that door open for future capabilities, and the test suite exercises both the Git and the “native” back end, but the “native” one is not remotely ready for regular use. That said, this one I do expect to see change over time!

One of the really interesting bits about picking up Jujutsu is realizing just how weirdly Git has wired your brain, and re-learning how to think about how a version control system can work. It is one thing to believe—very strongly, in my case!—that Git’s <abbr title="user interface">UI</abbr> design is deeply janky (and its underlying model just so-so); it is something else to experience how much better a <abbr title="version control system">VCS</abbr> <abbr title="user interface">UI</abbr> can be (even without replacing the underlying model!).

<img src="https://cdn.chriskrycho.com/images/unlearn.gif" alt="Yoda saying “You must unlearn what you have learned.”">

Time to become a Jedi Knight. Jujutsu Knight? Jujutsu Master? Jujutsu apprentice, at least. Let’s dig in!

<details><summary>Outline</summary>

- [Using Jujutsu](#using-jujutsu)
    - [Revisions and revsets](#revisions-and-revsets)
    - [Changes](#changes)
    - [Split](#split)
    - [First-class conflicts](#first-class-conflicts)
    - [Changing changes](#changing-changes)
    - [Branches](#branches)
    - [Git interop](#git-interop)
    - [Is it ready?](#is-it-ready)
- [Conclusion](#conclusion)
- [Appendix: Kaleidoscope setup and tips](#appendix-kaleidoscope-setup-and-tips)

</details>


## Using Jujutsu

That is all interesting enough philosophically, but for a tool that, if successful, will end up being one of a software developer’s most-used tools, there is an even more important question: *What is it actually like to use?*

Setup is painless. Running `brew install jj` did everything I needed. As with most modern Rust-powered <abbr title="command line interface">CLI</abbr> tools,[^rust] Jujutsu comes with great completions right out of the box. I did make one post-install tweak, since I am going to be using this on existing Git projects: I updated my `~/.gitignore_global` to ignore `.jj` directories anywhere on disk.[^mac-pro-tip]

Using Jujutsu in an existing Git project is also quite easy.[^hiccup] You just run `jj init --git-repo <path to repo>`. That’s the entire flow. After that you can use `git` and `jj` commands alike on the repository, and everything Just Works™, right down to correctly handling `.gitignore` files. I have since run `jj init` in every Git repository I am actively working on, and have had no issues in many months. It is also possible to initialize a Jujutsu copy of a Git project *without* having an existing Git repo, using `jj git clone`, which I have also done, and which works well.

<figure>

<script async id="asciicast-635735" src="https://asciinema.org/a/635735.js"></script>

<figcaption>Cloning <a href="https://true-myth.js.org">true-myth</a> and initializing it as a Jujutsu repo</figcaption>

</figure>

Once a project is initialized, working on it is fairly straightforward, though there are some significant adjustments required if you have deep-seated habits from Git!

[^mac-pro-tip]: Pro tip for Mac users: add `.DS_Store` to your `~/.gitignore_global` and live a much less annoyed life—whether using Git or Jujutsu.

[^rust]: Yes, it is written in Rust, and it is pretty darn fast. But Git is written in C, and is *also* pretty darn fast. There are of course some safety upsides to using Rust here, but Rust is not particularly core to Jujutsu’s “branding”. It was just a fairly obvious choice for a project like this at this point—which is exactly what I have long hoped Rust would become!

[^hiccup]: I did have [one odd hiccup][init-issue] along the way due to a bug (already fixed, though not in a released version) in how Jujutsu handles a failure when initializing in a directory. While confusing, the problem was fixed in the next release… and this is what I expected of still-relatively-early software.

[init-issue]: https://github.com/martinvonz/jj/issues/1794


### Revisions and revsets

One of the first things to wrap your head around when first coming to Jujutsu is its approach to its *revisions* and *revsets*, i.e. “sets of revision”. Revisions are the fundamental elements of changes in Jujutsu, not “commits” as in Git. [Revsets][revsets] are then expressions in a functional language for selecting a set of revisions. Both the idea and the terminology are borrowed directly from Mercurial, though the implementation is totally new. (Many things about Jujutsu borrow from Mercurial—a decision which makes me quite happy.) The vast majority of Jujutsu commands take a `--revision`/`-r` command to select a revision. So far that might not sound particularly different from Git’s notion of commits and commit ranges, and they are indeed similar at a surface level. However, the differences start showing up pretty quickly, both in terms of working with revisions and in terms of how revisions are a different notion of *change* than a Git commit.

[revsets]: https://github.com/martinvonz/jj/blob/f3d6616057fb3db3f9227de3da930e319d29fcc7/docs/revsets.md

The first place you are likely to experience how revisions and revsets are different—and neat!—is with the `log` command, since looking at the commit log is likely to be something you do pretty early in using  a new version control tool. (Certainly it was for me.) When you clone a repo and initialize Jujutsu in it and then run `jj log`, you will see something rather different from what `git log` would show you—indeed, rather different from anything I even know *how* to get `git log` to show you. For example, here’s what I see today when running `jj log` on the Jujutsu repository, limiting it to show just the last 10 revisions:

```
> jj log --limit 10
@  ukvtttmt hello@chriskrycho.com 2024-02-03 09:37:24.000 -07:00 1a0b8773
│  (empty) (no description set)
◉  qppsqonm essiene@google.com 2024-02-03 15:06:09.000 +00:00 main* HEAD@git bcdb9beb
·  cli: Move git_init() from init.rs to git.rs
· ◉  rzwovrll ilyagr@users.noreply.github.com 2024-02-01 14:25:17.000 -08:00
┌─┘  ig/contributing@origin 01e0739d
│    Update contributing.md
◉  nxskksop 49699333+dependabot[bot]@users.noreply.github.com 2024-02-01 08:56:08.000
·  -08:00 fb6c834f
·  cargo: bump the cargo-dependencies group with 3 updates
· ◉  tlsouwqs jonathantanmy@google.com 2024-02-02 21:26:23.000 -08:00
· │  jt/missingop@origin missingop@origin 347817c6
· │  workspace: recover from missing operation
· ◉  zpkmktoy jonathantanmy@google.com 2024-02-02 21:16:32.000 -08:00 2d0a444e
· │  workspace: inline is_stale()
· ◉  qkxullnx jonathantanmy@google.com 2024-02-02 20:58:21.000 -08:00 7abf1689
┌─┘  workspace: refactor for_stale_working_copy
◉  yyqlyqtq yuya@tcha.org 2024-01-31 09:40:52.000 +09:00 976b8012
·  index: on reinit(), delete all segment files to save disk space
· ◉  oqnvqzzq martinvonz@google.com 2024-01-23 10:34:16.000 -08:00
┌─┘  push-oznkpsskqyyw@origin 54bd70ad
│    working_copy: make reset() take a commit instead of a tree
◉  rrxuwsqp stephen.g.jennings@gmail.com 2024-01-23 08:59:43.000 -08:00 57d5abab
·  cli: display which file's conflicts are being resolved
```

Here’s the output for the same basic command in Git—note that I am not trying to get a *similar* output from Git, just asking what it shows by default (and warning: wall of log output!):

```
> git log -10
commit: bcdb9beb6ce5ba625ae73d4839e4574db3d9e559     HEAD -> main, origin/main
date:   Mon, 15 Jan 2024 22:31:33 +0000
author: Essien Ita Essien <essiene@gmail.com>

    cli: Move git_init() from init.rs to git.rs

    * Move git_init() to cli/src/commands/git.rs and call it from there.
    * Move print_trackable_remote_branches into cli_util since it's not git specific,
      but would apply to any backend that supports remote branches.
    * A no-op change. A follow up PR will make use of this.

commit: 31e4061bab6cfc835e8ac65d263c29e99c937abf
date:   Mon, 8 Jan 2024 10:41:07 +0000
author: Essien Ita Essien <essiene@gmail.com>

    cli: Refactor out git_init() to encapsulate all git related work.

    * Create a git_init() function in cli/src/commands/init.rs where all git related work is done.
      This function will be moved to cli/src/commands/git.rs in a subsequent PR.

commit: 8423c63a0465ada99c81f87e06f833568a22cb48
date:   Mon, 8 Jan 2024 10:41:07 +0000
author: Essien Ita Essien <essiene@gmail.com>

    cli: Refactor workspace root directory creation

    * Add file_util::create_or_reuse_dir() which is needed by all init
      functionality regardless of the backend.

commit: b3c47953e807bef202d632c4e309b9a8eb814fde
date:   Wed, 31 Jan 2024 20:53:23 -0800
author: Ilya Grigoriev <ilyagr@users.noreply.github.com>

    config.md docs: document `jj config edit` and `jj config path`

    This changes the intro section to recommend using `jj config edit` to
    edit the config instead of looking for the files manually.

commit: e9c482c0176d5f0c0c28436f78bd6002aa23a5e2
date:   Wed, 31 Jan 2024 20:53:23 -0800
author: Ilya Grigoriev <ilyagr@users.noreply.github.com>

    docs: mention in `jj help config edit` that the command can create a file


commit: 98948554f72d4dc2d5f406da36452acb2868e6d7
date:   Wed, 31 Jan 2024 20:53:23 -0800
author: Ilya Grigoriev <ilyagr@users.noreply.github.com>

    cli `jj config`: add `jj config path` command


commit: 8a4b3966a6ff6b9cc1005c575d71bfc7771bced1
date:   Fri, 2 Feb 2024 22:08:00 -0800
author: Ilya Grigoriev <ilyagr@users.noreply.github.com>

    test_global_opts: make test_version just a bit nicer when it fails


commit: 42e61327718553fae6b98d7d96dd786b1f050e4c
date:   Fri, 2 Feb 2024 22:03:26 -0800
author: Ilya Grigoriev <ilyagr@users.noreply.github.com>

    test_global_opts: extract --version to its own test


commit: 42c85b33c7481efbfec01d68c0a3b1ea857196e0
date:   Fri, 2 Feb 2024 15:23:56 +0000
author: github-actions[bot] <41898282+github-actions[bot]@users.noreply.github.com>

    cargo: bump the cargo-dependencies group with 1 update

    Bumps the cargo-dependencies group with 1 update: [tokio](https://github.com/tokio-rs/tokio).


    Updates `tokio` from 1.35.1 to 1.36.0
    - [Release notes](https://github.com/tokio-rs/tokio/releases)
    - [Commits](https://github.com/tokio-rs/tokio/compare/tokio-1.35.1...tokio-1.36.0)

    ---
    updated-dependencies:
    - dependency-name: tokio
      dependency-type: direct:production
      update-type: version-update:semver-minor
      dependency-group: cargo-dependencies
    ...

    Signed-off-by: dependabot[bot] <support@github.com>
commit: 32c6406e5f04d2ecb6642433b0faae2c6592c151
date:   Fri, 2 Feb 2024 15:22:21 +0000
author: github-actions[bot] <41898282+github-actions[bot]@users.noreply.github.com>

    github: bump the github-dependencies group with 1 update

    Bumps the github-dependencies group with 1 update: [DeterminateSystems/magic-nix-cache-action](https://github.com/determinatesystems/magic-nix-cache-action).


    Updates `DeterminateSystems/magic-nix-cache-action` from 1402a2dd8f56a6a6306c015089c5086f5e1ca3ef to eeabdb06718ac63a7021c6132129679a8e22d0c7
    - [Release notes](https://github.com/determinatesystems/magic-nix-cache-action/releases)
    - [Commits](https://github.com/determinatesystems/magic-nix-cache-action/compare/1402a2dd8f56a6a6306c015089c5086f5e1ca3ef...eeabdb06718ac63a7021c6132129679a8e22d0c7)

    ---
    updated-dependencies:
    - dependency-name: DeterminateSystems/magic-nix-cache-action
      dependency-type: direct:production
      dependency-group: github-dependencies
    ...

    Signed-off-by: dependabot[bot] <support@github.com>
```

What’s happening in the Jujutsu log output? Per [the tutorial][tutorial]’s note on the `log` command specifically:

> By default, `jj log` lists your local commits, with some remote commits added for context. The `~` indicates that the commit has parents that are not included in the graph. We can use the `-r` flag to select a different set of revisions to list.

[tutorial]: https://martinvonz.github.io/jj/v0.13.0/tutorial/

What `jj log` *does* show by default was still a bit non-obvious to me, even after that. *Which* remote commits added for context, and why? The answer is in the `help` output for `jj log`’s `-r`/`--revisions` option:

> Which revisions to show. Defaults to the `ui.default-revset` setting, or `@ | ancestors(immutable_heads().., 2) | heads(immutable_heads())` if it is not set

I will come back to this revset in a moment to explain it in detail. First, though, this shows a couple other interesting features of Jujutsu’s approach to revsets and thus the `log` command. First, it treats some of these operations as *functions* (`ancestors()`, `immutable_heads()`, etc.). There is a whole list [of these functions][functions]! This is not a surprise if you think about what “expressions in a functional language” implies… but it was a surprise to me because I had not yet read that bit of documentation. Second, it makes “operators” [a first-class idea][operators]. Git *has* operators, but this goes a fair bit further:

- It includes `-` for the parent and `+` for a child, and these stack and compose, so writing `@-+-+` is the same as `@` as long as the history is linear. ([That is an important distinction!][distinction])

- It supports union `|`, intersection `&`, and difference `~` operators.

- A leading `::`, which means “ancestors”. A trailing `::` means “descendants”. Using `::` between commits gives a view of the directed acyclic graph range between two commits. Notably, `<id1>::<id2>` is just `<id1>:: & ::<id2>`.

- There is also a `..` operator, which also composes appropriately (and, smartly, is the same as `..` in Git when used between two commits, `<id1>..<id2>`). The trailing version, `<id>..`, is interesting: it is “revisions that are not ancestors of `<id>`”. Likewise, the leading version `..<id>` is all revisions which *are* ancestors of `<id>`

Now, I used `<id>` here, but throughout these actually operate on revsets, so you could use them with any revset. For example, `..tags()` will give you the ancestors of all tags. This strikes me as *extremely* interesting: I think it will dodge a lot of pain in dealing with Git histories, because it lets you ask questions about the history in a compositional way using normal set logic. To make that concrete: back in October, Jujutsu contributor @aseipp [pointed out][gh-pages] how easy it is to use this to get a log which excludes `gh-pages`. (Anyone who has worked on a repo with a `gh-pages` branch knows how annoying it is to have it cluttering up your view of the rest of your Git history!) First, you define an alias for the revset that only includes the `gh-pages` branch: `'gh-pages' = 'remote_branches(exact:"gh-pages")'`. Then you can *exclude* it from other queries with the `~` negation operator: `jj log -r "all() ~ ancestors(gh-pages)"` would give you a log view for every revision with `all()` and then exclude every ancestor of the `gh-pages` branch.

[functions]: https://github.com/martinvonz/jj/blob/main/docs/revsets.md#functions
[operators]: https://github.com/martinvonz/jj/blob/main/docs/revsets.md#operators
[distinction]: https://github.com/martinvonz/jj/discussions/1905#discussioncomment-6533386
[gh-pages]: https://discord.com/channels/968932220549103686/969291218347524238/1169016692651864144

Jujutsu also provides a really capable [templating system][templates], which uses “a functional language to customize output of commands”. That functional language is built on top of the functional language that the whole language uses for describing revisions (described in brief above!), so you can use the same kinds of operators in templates for output as you do for navigating and manipulating the repository. The template format is still evolving, but you can use it to customize the output today… while being aware that you may have to update it in the future. Keywords include things like `description` and `change_id`, and these can be customized in Jujutsu’s config. For example, I made this tweak to mine, overriding the built-in `format_short_id` alias:

```toml
[template-aliases]
'format_short_id(id)' = 'id.shortest()'
```

This gives me super short names for changes and commits, which makes for a *much* nicer experience when reading and working with both in the log output: Jujutsu will give me the shortest unique identifier for a given change or commit, which I can then use with commands like `jj new`. Additionally, there are a number of built-in templates. For example, to see the equivalent of Git’s `log --pretty` you can use Jujutsu’s `log -T builtin_log_detailed` (`-T` for “template”; you can also use the long from `--template`). You can define your own templates in a `[templates]` section, or add your own `[template-aliases]` block, using the template language and any combination of further functions you define yourself.

[templates]: https://martinvonz.github.io/jj/v0.10.0/templates/

That’s all well and good, but even with reading the docs for the revset language and the templating language, it still took me a bit to actually quite make sense out of the default output, much less to get a handle on how to customize the output. Right now, the docs have a bit of a flavor of <i>explanations for people who already have a pretty good handle on version control systems</i>, and the description of what you get from `jj log` is a good example of that. As the project gains momentum, it will need other kinds of more-introductory material, but the current status is totally fair and reasonable for the stage the project is at. And, to be fair to Jujutsu, both the revset language and the templating language are *incredibly* easier to understand and work with than the corresponding Git materials.

Returning to the difference between the default output from `jj log` and `git log`, the key is that unless you pass `-r`, Jujutsu uses the `ui.default-revset` selector to provide a much more informative view than `git log` does. Again, the default is `@ | ancestors(immutable_heads().., 2) | heads(immutable_heads())`. Walking through that:

- The `@` operator selects the current head revision.
- The `|` union operator says “or this other revset”, so this will show `@` itself *and* the result of the other two queries.
- The `immutable_heads()` function gets the list of head revisions which are, well, [immutable][immutable-heads]. By default, this is `trunk() | tags()`, so whatever the trunk branch is (most commonly `main` or `master`) and also any tags in the repository.
- Adding `..` to the first `immutable_heads()` function selects revisions which are not ancestors of those immutable heads. This is basically asking for branches which are not the trunk and which do not end at a tag.
- Then `ancestors(immutable_heads().., 2)` requests the ancestors of those branches, but only two deep.
- Finally, `heads()` gets the tips of all branches which appear in the revset passed to it: a head is a commit with no children. Thus, `heads(immutable_heads())` gets *just* the branch tips for the list of revisions computed by `immutable_heads()`.[^heads]

[immutable-heads]: https://martinvonz.github.io/jj/v0.13.0/config/#set-of-immutable-commits

When you put those all together, your log view will always show your current head change, all the open branches which have not been merged into your trunk branch, and whatever you have configured to be immutable—out of the box, trunk and all tags. That is *vastly* more informative than `git log`’s default output, even if it is a bit surprising the first time you see it. Nor is it particularly possible to get that in a single `git log` command. By contrast, getting the equivalent of `git log` is trivial.

To show the full history for a given change, you can use the `::` ancestors operator. Since `jj log` always gives you the identifier for a revision, you can follow it up with `jj log --revision ::<change id>`, or `jj log -r ::<change id>` for short. For example, in one repo where I am trying this, the most recent commit identifier starts with `mwoq` (Jujutsu helpfully highlights the segment of the change identifier you need to use), so I could write `jj log -r ::mwoq`, and this will show all the ancestors of `mwoq`, or `jj log -r ..mwoq` to get all the ancestors of the commit except the root. (The root is uninteresting.) Net, the equivalent command for “show me all the history for this commit” is:

```sh
$ jj log -r ..@
```

Revsets are very powerful, very flexible, and yet much easier to use than Git’s operators. That is in part because of the language used to express them. It is also in part because revsets build on a fundamentally different view of the world than Git commits: Jujutsu’s idea of *changes*.

[^first-log-experience]:  I initially thought that the `jj log` only included the information since initializing Jujutsu in a given directory, rather than the whole Git history, which was quite surprising. In fact, the view I was seeing was entirely down to a default behavior of `jj log`, totally independent of Git: the specific revset it chooses to display.

[^heads]: This is not quite the same as Git’s `HEAD` or as Mercurial’s “tip”—there is only one of either of those, and they are not the same as each other!


### Changes

In Git, as in Subversion and Mercurial and other version control systems before them, when you finish with a change, you *commit* it. In Jujutsu, there is no first-class notion of “committing” code. This took me a fair bit to wrap my head around! Instead, Jujutsu has two discrete operations:  `describe` and `new`. `jj describe` lets you provide a descriptive message for any change. `jj new` starts a new change. You can think of `git commit --message "something I did"` as being equivalent to `jj describe --message "some I did" && jj new`. This falls out of the fact that `jj describe` and `jj new` are orthogonal, and much more capable than `git commit` as a result.

The `describe` command works on *any* commit. It defaults to the commit that is the current working copy. If you want to rewrite a message earlier in your commit history, though, that is not a special operation like it is in Git, where you have to perform an interactive rebase to do it. You just call `jj describe` with a `--revision`  (or `-r` for short, as everywhere in Jujutsu) argument. For example:

```sh
# long version
$ jj describe --revision abcd --message "An updated message."

# short version
$ jj describe -r abcd -m "An updated message."
```

That's it. How you choose to integrate that into your workflow is a matter for you and your team to decide, of course. Jujutsu understands that some branches should not have their history rewritten this way, though, and lets you specify what the “immutable heads” revset should be accordingly. This actually makes it safer than Git, where the tool itself does not understand that kind of immutability and we rely on forges to protect certain branches from being targeted by a force push.

The `new` command is the core of creating any new change, and it does not require there to be only a single parent. You can create a new change with as many parents as is appropriate! Is a given change logically the child of four other changes, with identifiers `a`, `b`, `c`, and `d`? `jj new a b c d`. That's it. One neat consequence that falls out of this: a merge in Jujutsu is just `jj new` with the requirement that it have at least two parents. (“At least two parents” because having multiple parents for a merge is not a special case as with Git’s “octopus” merges.) Likewise, you do not need a `commit` command, because you can describe a given change at any time with `describe`, and you can create a new change at any time with `new`. If you already know the next thing you are going to do, you can even describe it by passing `-m`/`--message` to `new` when creating the new change![^legacy-commands]

<figure>

<script async id="asciicast-635739" src="https://asciinema.org/a/635739.js"></script>

<figcaption>A demo of using <code>jj new</code> to create a three-parent merge</figcaption>

</figure>

Most of the time with Git, I am doing one of two things when I go to commit a change:

- Committing everything that is in my working copy: `git commit --all`[^ci-a-alias] is an *extremely* common operation for me.
- Committing a subset of it, not by using Git's `-p` to do it via that atrocious interface, but instead opening [Fork][fork] and doing it with Fork’s staging <abbr>UI</abbr>.

In the first case, Jujutsu’s choice to skip Git’s “index” looks like a very good one. In the second case, I was initially skeptical. Once I got the hang of working this way, though, I started to come around. My workflow with [Fork][fork] looks an *awful* lot like the workflow that Jujutsu pushes you toward with actually using a diff tool. With Jujutsu, though, *any* diff tool can work. Want to use Vim? [Go for it.][vim-diff]

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

[^legacy-commands]: If you look at the `jj help` output today, you will notice that Jujutsu has `checkout`, `merge`, and `commit` commands. Each is just an alias for a behavior using `new`, `describe`, or both, though:

    - `checkout` is just an alias for `new`
    - `commit` is just a shortcut for `jj describe -m "<some message>" && jj new`
    - `merge` is just `jj new` with an implicit `@` as the first argument.

    All of these are going to go away in the medium term with both documentation and output from the <abbr title="command line interface">CLI</abbr> that teach people to use `new` instead.

[^ci-a-alias]: Actually it is normally `git ci -am "<message>"` with `-a` for “all” (`--all`) and `-m` for the message, and smashed together to avoid any  needless extra typing.

[^obslog]: The name is from Mercurial’s [evolution](https://www.mercurial-scm.org/doc/evolution/) feature, where it refers to changes which have become *obsolescent*, thus `obslog` is the “obsolescent changes log”. I recently suggested to the Jujutsu maintainers that renaming this might be helpful, because it took me six months of daily use to discover this incredibly helpful tool.

### Split

This also leads to another significant difference with Git: around breaking up your current set of changes on disk. As I noted above, Jujutsu treats the working copy itself as a commit instead of having an “index” like Git. Git really *only* lets you break apart a set of changes with the index, using `git add --patch`. Jujutsu instead has a `split` command, which launches a diff editor and lets you select what you want to incorporate—rather like `git add --patch` does. As with all of its commands, though, `jj split` works exactly the same way on *any* commit; the working copy commit gets it “for free”.

Philosophically, I really like this. Practically, though, it is a slightly bumpier experience for me than the Git approach at the moment. Recall that I do not use `git add --patch` directly. Instead, I always stage changes into the Git index using a graphical tool like [Fork][fork]. That workflow is slightly nicer than editing a diff—at least, as Jujutsu does it today. In Fork (and similar tools), you start with *no* changes and add what you want to the change set you want. By contrast, `jj split` launches a diff view with *all* the changes from a given commit present: splitting the commit involves *removing* changes from the right side of the diff so that it has only the changes you want to be present in the first of two new commits; whatever is *not* present in the final version of the right side when you close your diff editor ends up in the second commit.

If this sounds a little complicated, that is because it is—at least for today. That qualifier is important, because a lot of this is down to tooling, and we have about as much dedicated tooling for Jujutsu as Git had in 2007, which is to say: not much. Qualifier notwithstanding, and philosophical elegance notwithstanding, the complexity is still real here in early 2024. There are two big downsides as things stand. First, I find it comes with more cognitive load. It requires thinking in terms of negation rather than addition, and the “second commit” becomes less and less visible over time as you remove it from the first commit. Second, it requires you to repeat the operation when breaking up something into more than two commits. I semi-regularly take a single bucket of changes on disk and chunk it up into *many* more than just 2 commits, though! That significantly multiplies the cognitive overhead.

Now, since I started working with Jujutsu, the team has switched the default view for working with these kinds of diffs to using `scm-diff-editor`, a <abbr title="textual user interface">TUI</abbr> which has a first-class notion of this kind of workflow.[^meld] That <abbr>TUI</abbr> works reasonably well, but is much less pleasant to use than something like the nice <abbr>GUI</abbr>s of [Fork][fork]  or [Tower][tower].

[meld]: https://meld.app
[gtk]: https://www.gtk.org
[meld-crash]: https://github.com/yousseb/meld/issues/147
[tower]: https://www.git-tower.com/mac

The net is: when I want to break apart changes, at least for the moment I find myself quite tempted to go back to Fork and Git’s index. I do not think this problem is intractable, and I think the *idea* of `jj split` is right. It just—“just”!—needs some careful design work. Preferably, the `split` command would make it straightforward to generate an arbitrary number of commits from one initial commit, and it would allow progressive creation of each commit from a “vs. the previous commit” baseline. This is the upside of the index in Git: it does actually reflect the reality that there are three separate “buckets” in view when splitting apart a change: the baseline before all changes, the set of all the changes, and the set you want to include in the commit. Existing diff tools do not really handle this—other than the integrated index-aware diff tools in Git clients, which then have their own oddities when interacting with Jujutsu, since it ignores the index.

### First-class conflicts

Another huge feature of Jujutsu is its support for *first-class conflicts*. Instead of a conflict resulting in a nightmare that has to be resolved before you can move on, Jujutsu can incorporate both the merge and its resolution (whether manual or automatic) directly into commit history. Just having the conflicts in history does not seem that weird. “Okay, you committed the text conflict markers from git, neat.” But: having the conflict and its resolution in history, especially when Jujutsu figured out how to do that resolution for you, as part of a rebase operation? That is just plain *wild*.

A while back, I was working on a change to [a library][true-myth] I maintain[^fun] and decided to flip the order in which I landed two changes to `package.json`. Unfortunately, those changes were adjacent to each other in the file and so flipping the order they would land in seemed likely to be painfully difficult. It was actually trivial. First of all, the flow itself was great: instead of launching an editor for interactive rebase, I just explicitly told Jujutsu to do the rebases: `jj rebase --revision <source> --destination <target>`. I did that for each of the items I wanted to reorder and I was done. (I could also have rebased a whole series of commits; I just did not need to in this case.) Literally, that was it: because Jujutsu had agreed with me that <abbr>JSON</abbr> is a terrible format for changes like this and committed a merge conflict, then *resolved* the merge conflict via the next rebase command, and simply carried on.

[true-myth]: https://github.com/true-myth/true-myth

At a mechanical level, Jujutsu will add conflict markers to a file, not unlike those Git adds in merge conflicts. However, unlike Git, those are not just markers in a file. They are part of a system which understands what conflicts are semantically, and therefore also what *resolving* a conflict is semantically. This not only produces nice automatic outcomes like the one I described with my library above; it also means that you have more options for how to accomplish a resolution, and for how to treat a conflict. Git trains you to see a conflict between two branches as a problem. It requires you to solve that problem before moving on. Jujutsu *allows* you to treat a conflict as a problem which much be resolved, but it does not *require* it. Resolving conflicts in merges in Git is often quite messy. It is even worse when rebasing. I have spent an incredibly amount of time attempting merges only to give up and `git reset --hard <before the merge>`, and possibly even more time trying to resolve a conflicting in a rebase only to bail with `git rebase --abort`. Jujutsu allows you to create a merge, leave the conflict in place, and then introduce a resolution in the *next* commit, telling the whole story with your change history.

<figure>

<script async id="asciicast-Uyfv9qcPTfVeNyoVCINpq5Qfq" src="https://asciinema.org/a/Uyfv9qcPTfVeNyoVCINpq5Qfq.js"></script>

<figcaption>Conflict resolution with merges</figcaption>

</figure>

Likewise with a rebase: depending on whether you require all your intermediate revisions to be able to be built or would rather show a history including conflicts, you could choose to rebase, leave all the intermediate changes conflicted, and resolve it only at the end.

<figure>

<script async id="asciicast-k5pFEM07wX1F9ZxcQsLnMTGCd" src="https://asciinema.org/a/k5pFEM07wX1F9ZxcQsLnMTGCd.js"></script>

<figcaption>Conflict resolution with rebases</figcaption>

</figure>


Conflicts are inevitable when you have enough people working on a repository. Honestly: conflicts happen when I am working *alone* in a repository, as suggested by my anecdote above. Having this ability to keep working with the repository even in a conflicted state, as well as to resolve the conflicts in a more interactive and iterative way is something I now find difficult to live without.

[^fun]: Yes, this is what I do for fun on my time off. At least: partially.

[^meld]: They also enabled support for a three-pane view in [Meld][meld], which allegedly makes it somewhat better. However, Meld is pretty janky on macOS (as [GTK][gtk] apps basically always are), and it has a *terrible* startup time for reasons that are unclear at this point, which means this was not a great experience in the first place… and Meld [crashes on launch][meld-crash] on the current version of macOS.


### Changing changes

There are a few other niceties which fall out of Jujutsu’s distinction between changes and commits, especially when combined with first-class conflicts.

First up, `jj squash` takes all the changes in a given commit and, well, *squashes* them into the parent of that commit.[^amend-alias] Given a working copy with a bunch of changes, you can move them straight into the parent by just typing `jj squash`. If you want to squash some change besides the one you are currently editing, you just pass the `-r`/`--revision` flag, as with most Jujutsu commands: `jj squash -r abc` will squash the change identified by `abc` into its parent. You can also use the `--interactive` (`-i` for short) argument to move just a part of a change into its parent. Using that flag will pop up your configured diff editor just like `jj split` will and allow you to select which items you want to move into the parent and which you want to keep separate. Or, for an even faster option, if you have specific files to move while leaving others alone, and you do not need to handle subsections of those files, you can pass them as the final arguments to the command, like `jj squash ./path/a ./path/c`.

As it turns out, this ability to  move part of one change into a different change is a really useful thing to be able to do in general. I find it particularly handy when building up a set of changes where I want each one to be coherent—say, for the sake of having a commit history which is easy for others to review. You *could* do that by doing some combination of `jj split` and `jj new --after <some change ID>` and then doing `jj rebase` to move around the changes… but as usual, Jujutsu has a better way. The `squash` command is actually just a shortcut for Jujutsu’s `move` command with some arguments filled in. The `move` command has `--from` and `--to` arguments which let you specify which revisions you want to move between. When you run `jj squash` with no other arguments, that is the equivalent of `jj move --from @ --to @-`. When you run `jj squash -r abc`, that is the equivalent of `jj move --from abc --to abc-`. Since it takes those arguments explicitly, though, `move` lets you move changes around between *any* changes. They do not need to be anywhere near each other in history.

<figure>

<script async id="asciicast-634399" src="https://asciinema.org/a/634399.js"></script>

<figcaption>A demo of using <code>jj move</code></figcaption>

</figure>

This eliminates another entire category of places I have historically had to reach for `git rebase --interactive`. While there are still a few times where I think Jujutsu could use something akin to Git’s interactive rebase mode, they are legitimately *few*, and mostly to do with wanting to be able to do batch reordering of commits. To be fair, though, I only want to do that perhaps a few times a year.

[^amend-alias]: For people coming from Git, there is also an `amend` alias, so you can use `jj amend` instead, but it does the same thing as `squash` and in fact the help text for `jj amend` makes it clear that it just *is* `squash`.

### Branches

Branches are another of the very significant differences between Jujutsu and Git—another place where Jujutsu acts a bit more like Mercurial, in fact. In Git, everything happens on named branches. You *can* operate on anonymous branches in Git, but it will yell at you constantly about being on a “detached `HEAD`”. Jujutsu inverts this. The normal working mode in Jujutsu is just to make a series of changes, which then naturally form “branches” in the change graph, but which do not require a name out of the gate. You can give a branch a name any time, using `jj branch create`. That name is just a pointer to the change you pointed it at, though; it does not automatically “follow” you as you do `jj new` to create new changes. (Readers familiar with Mercurial may recognize that this is very similar to its [bookmarks][hg-bookmark]), though without the notion of “active” and “inactive” bookmarks.)

[hg-bookmark]: https://wiki.mercurial-scm.org/Bookmarks

To update what a branch name points to, you use the `branch set` command.  To completely get rid of a branch, including removing it from any remotes you have pushed the branch to, you use the `branch delete` command. Handily, if you want to forget all your *local* branch operations (though not the changes they apply to), you can use the `branch forget` command. That can come in useful when your local copy of a branch has diverged from what is on the remote and you don’t want to reconcile the changes and just want to get back to whatever is on the remote for that branch. No need for `git reset --hard origin/<branch name>`, just `jj branch forget <branch name>` and then the next time you pull from the remote, you will get back its view of the branch!

<figure class='embed'>

<div class='embed__wrapper'>

<iframe class='embed__content' src="https://social.jvns.ca/@b0rk/111851540697408119/embed" allowfullscreen="allowfullscreen" sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms"></iframe>

</div>

<figcaption>It’s not just me who wants this!</figcaption>

</figure>

Jujutsu’s defaulting to anonymous branches took me a bit to get used to, after a decade of doing all of my work in Git and of necessity having to do my work on named branches. As with so many things about Jujutsu, though, I have very much come to appreciate this default. In particular,I find this approach makes really good sense for all the steps where I am not yet sharing a set of changes with others. Even once I *am* sharing the changes with others, Git’s requirement of a branch name can start to feel kind of silly at times. Especially for the case where I am making some small and self-contained change, the name of a given branch is often just some short, [snake-case][snake-case]-ified version of the commit message. The default log template shows me the current set of branches, and their commit messages are usually sufficiently informative that I do not need anything else.

[snake-case]: https://en.wikipedia.org/wiki/Snake_case

However, there are some downsides to this approach in practice, at least given today’s ecosystem. First, the lack of a “current branch” makes for some extra friction when working with tools like GitHub, GitLab, Gitea, and so on. The GitHub model (which other tools have copied) treats branches as the basis for all work. GitHub displays warning messages about commits which are not on a branch, and will not allow you to create a pull request from an anonymous branch. In many ways, this is simply because Git itself treats  branches as special and important. GitHub is just following Git’s example of loud warnings about being on a “detached `HEAD`” commit, after all.

What this means in practice, though, is that there is an extra operation required any time you want to push your changes to GitHub or a similar forge. With Git, you simply `git push` after making your changes. (More on Git interop below.) Since Git keeps the current branch pointing at the current `HEAD`, Git aliases `git push` with no arguments to `git push <configured remote for current branch> <current branch>`. Jujutsu does not do this, and given how its branching model works today, *cannot* do this, because named branches do not “follow” your operations. Instead, you must first explicitly set the branch to the commit you want to push. In the most common case, where you are pushing your latest set of changes, that is just `jj branch set <branch name>`; it takes the current change automatically. Only then can you run `jj git push` to actually get an update. This is only a paper cut, but it is a paper cut. It is one extra command every single time you go to push a change to share with others, or even just to get it off of your machine.[^off-machine] That might not seem like a lot, but it adds up.

There is a real tension in the design space here, though. On the one hand, the main time I use branches in Jujutsu at this point is for pushing to a Git forge like GitHub. I rarely feel the need for them for just working on a set of changes, where `jj log` and `jj new <some revision>` give me everything I need. In that sense, it seems like having the branch “follow along” with my work would be natural: if I have gone to the trouble of creating a name for a branch and pushing it to some remote, then it is very likely I want to keep it up to date as I add changes to the branch I named. On the other hand, there is a big upside to not doing that automatically: pushing changes becomes an intentional act. I cannot count the number of times I have been working on what is essentially just an experiment in a Git repo, forgotten to change from the `foo-feature` to a new `foo-feature-experiment` branch, and then done a `git push`. Especially if I am collaborating with others on `foo-feature`, now I have to force push back to the previous to reset things, and let others know to wait for that, etc. That never happens with the Jujutsu model. Since updating a named branch is always an intentional act, you can experiment to your heart’s content, and know you will never *accidentally* push changes to a branch that way. I go back and forth: Maybe the little bit of extra friction when you *do* want to push a branch is worth it for all the times you do not have to consciously move a branch backwards to avoid pushing changes you are not yet ready to share.

(As you might expect, the default of anonymous branches has some knock-on effects for how it interacts with Git tooling in general; I say more on this below.)

Jujutsu also has a handy little feature for when you have done a bunch of work on an anonymous branch and are ready to push it to a Git forge. The `jj git push` subcommand takes an optional `--change`/`-c` flag, which creates a branch based on your current change <abbr title="identifier">ID</abbr>. It works really well when you only have a single change you are going to push and then continually work on, or any time you are content that your current change will remain the tip of the branch. It works a little *less* well when you are going to add further changes later, because you need to then actually use the branch name with `jj branch set push/<change ID> -r <revision>`.

Taking a step back, though, working with branches in Jujutsu is *great* overall. The `branch` command is a particularly good lens for seeing what a well-designed <abbr title="command line interface">CLI</abbr> is like and how it can make your work easier. Notice that the various commands there are all of the form `jj branch <do something>`. There are a handful of other `branch` subcommands not mentioned so far: `list`, `rename`, `track`, and `untrack`. Git has slowly improved its design here over the past few years, but still lacks the straightforward coherence of Jujutsu’s design. For one thing, all of these are *subcommands* in Jujutsu, not like Git’s mishmash of flags which can be combined in some cases but not others, and have different meanings depending on where they are deployed. For another, as with the rest of Jujutsu’s <abbr title="command line interface">CLI</abbr> structure, they use the same options to mean the same things. If you want to list all the branches which point to a given set of revisions, you use the `-r`/`--revisions` flag, exactly like you do with any other command involving revisions in Jujutsu. In general, Jujutsu has a very strong and careful distinction between *commands* (including subcommands) and *options*. Git does not. The `track` and `untrack` subcommands are a perfect example. In Jujutsu, you track a remote branch by running a command like `jj branch track <branch>@<remote>`. The corresponding Git command is `git branch --set-upstream-to <remote>/<branch>`. But to *list and filter* branches in Git, you also pass flags, e.g. `git branch --all` is the equivalent of `jj branch list --all`. The Git one is shorter, but also notably less coherent; there is no way to build a mental model for it. With Jujutsu, the mental model is obvious and consistent: `jj <command> <options>` or `jj <context> <command> <options>`, where `<context>` is something like `branch` or `workspace` or `op` (for operation).

[^off-machine]: If that sounds like paranoia, well, you only have to lose everything on your machine once due to someone spilling a whole cup of water on it at a coffee shop to learn to be a bit paranoid about having off-machine backups of everything. I `git push` all the time.


### Git interop

Jujutsu’s native back end exists, and every feature has to work with it, so it will some day be a real feature of the <abbr>VCS</abbr>. Today, though, the Git backend is the only one you should use. So much so that if you try to run `jj init` without passing `--git`, Jujutsu won’t let you by default:

```sh
> jj init
Error: The native backend is disallowed by default.
Hint: Did you mean to pass `--git`?
Set `ui.allow-init-native` to allow initializing a repo with the native backend.
```

In practice, you are going to be using the Git backend. In practice, I have been using the Git backend for the last seven months, full time, on every one of my personal repositories and all the open source projects I have contributed to. With the sole exception of someone watching me while we pair, no one has noticed, because the Git integration is that solid and robust. This interop means that adoption can be very low friction. Any individual can simply run `jj init --git-repo .` in a given Git repository, and start doing their work with Jujutsu instead of Git, and all that work gets translated directly into operations on the Git repository.

Interoperating with Git also means that there is a two way-street between Jujutsu and Git. You can do a bunch of work with `jj` commands, and then if you hit something you don’t know how to do with Jujutsu yet, you can flip over and do it the way you already know with a `git` command. When you next run a `jj` command, like `jj status`, it will (very quickly!) import the updates from Git and go back about its normal business. The same thing happens when you run commands like `jj git fetch` to get the latest updates from a Git remote. All the explicit Git interop commands live under a `git` subcommand: `jj git push`, `jj git fetch`, etc. There are a handful of these, including the ability to explicitly ask to synchronize with the Git repository, but the only ones I use on a day to day basis are `jj git push` and `jj git fetch`. Notably, there is no `jj git pull`, because Jujutsu keeps a distinction between getting the latest changes from the server and changing your local copy’s state. I have not missed `git pull` at all.

This clean interop does *not* mean that Git sees everything Jujutsu sees, though. Initializing a Jujutsu repo adds a `.jj` directory to your project, which is where it stores its extra metadata. This, for example, is where Jujutsu keeps track of its own representation of changes, including how any given change has evolved, in terms of the underlying revisions. In the case of a Git repository, those revisions just are the Git commits, and although you rarely *need* to work with or name them directly, they have the same <abbr title="secure hash algorithm">SHA</abbr>s, so any time you would name a specific Git commit, you can reference it directly as a Jujutsu revision as well. (This is particularly handy when bouncing between `jj` commands and Git-aware tools which know nothing of Jujutsu’s change identifiers.) The `.jj` directory also includes the operation log, and in the case of a fresh Jujutsu repo (not one created from an existing Git repository), is where the backing Git repo lives.

This Git integration currently runs on `libgit2`, so there is effectively no risk of breaking your repo because of a Jujutsu–Git interop issue. To be sure, there can be bugs in Jujutsu itself, and you can do things using Jujutsu that will leave you in a bit of a mess, but the same is true of *any* tool which works on your Git repository. The risk might be very slightly higher here than with your average <abbr>GUI</abbr> Git client, since Jujutsu is mapping different semantics onto the repository, but I have extremely high confidence in the project at this point, and I think you can too.


### Is it ready?

Unsurprisingly, given the scale of the problem domain, there are still some rough edges and gaps. For example: commit signing with <abbr title="GNU Privacy Guard">GPG</abbr> or <abbr title="secure shell">SSH</abbr> does not yet work. There is an open <abbr title="pull request">PR</abbr> for the basics of the feature with <abbr title="GNU Privacy Guard">GPG</abbr> support, and <abbr title="secure shell">SSH</abbr> support will be straightforward to add once the basics, but landed it has not.[^signing] The list of actual gaps or missing features is getting short, though. When I started using Jujutsu back in July 2023, there was not yet any support for sparse checkouts or for workspaces (analogous to Git worktrees). Both of those landed in the interval, and there is consistent forward motion from both Google and non-Google contributors. In fact, the biggest gap I see as a regular user in Jujutsu itself is the lack of the kinds of capabilities that will hopefully come once work starts in earnest on the native back end.

The real gaps and rough edges at this point are down to the lack of an ecosystem of tools around Jujutsu, and the ways that existing Git tools interact with Jujutsu’s design for Git interop. The lack of tooling is obvious: no one has built the equivalent of [Fork][fork] or [Tower][tower], and there is no native integration in <abbr title="integrated development environment">IDE</abbr>s like IntelliJ or Visual Studio or in editors like <abbr title="Visual Studio">VS</abbr> Code or Vim. Since Jujutsu currently works primarily in terms of Git, you will get *some* useful feedback. All of those tools expect to be working in terms of Git’s index and not in terms of a Jujutsu-style working copy, though. Moreover, most of them (unsurprisingly!) share Git’s own confusion about why you are working on a detached `HEAD` nearly all the time. On the upside, viewing the history of a repo generally works well, with the exception that some tools will not show anonymous branches/detached `HEAD`s other than one you have actively checked out. Detached heads also tend to confuse tools like GitHub’s `gh`; you will often need to do a bit of extra manual argument-passing to get them to work. (`gh pr create --web --head <name>` is has been showing up in my history a lot for exactly this reason.)

Some of Jujutsu’s very nice features also make other parts of working on mainstream Git forges a bit wonky. For example, notice what each of these operations has in common:

- Inserting changes at arbitrary points.
- Rewording a change description.
- Rebasing a series of changes.
- Splitting apart commits.
- Combining existing commits.

They are all changes to history. If you have pushed a branch to a remote, doing any of these operations with changes on that branch and pushing to a remote again will be a *force push*. Most mainstream Git forges handle force pushing pretty badly. In particular, GitHub has some support for showing diffs between force pushes, but it is very basic and loses all conversational context. As a result, any workflow which makes heavy use of force pushes will be bumpy. Jujutsu is not to blame for the gaps in those tools, but it certainly does expose them.[^patch-stacks-etc.] Nor do I not blame GitHub for the quirks in interop, though. It is not JujutsuLab after all, and Jujutsu is doing things which do not perfectly map onto the Git model. Since most open source software development happens on forges like GitHub and GitLab, though, these things do  regularly come up and cause some friction.

The biggest place I feel this today is in the lack of tools designed to work with Jujutsu around splitting, moving, and otherwise interactively editing changes. Other than [@arxanas](https://github.com/arxanas)’ excellent `scm-diff-editor`, the <abbr title="text user interface">TUI</abbr>, which Jujutsu bundles for editing diffs on the command line, there are zero *good* tools for those operations. I mean it when I say `scm-diff-editor` is excellent, but I also do not love working in a <abbr title="text user interface">TUI</abbr> for this kind of thing, so  I have cajoled both [Kaleidoscope][kaleidoscope] and BBEdit into working to some degree. As I noted when describing how `jj split` works, though, it is not a particularly good experience. These tools are simply not designed for this workflow. They understand an index, and they do not understand splitting apart changes. Net, we are going to want new tooling which actually understands Jujutsu.

There are opportunities here beyond implementing the same kinds of capabilities that *many* editors, <abbr title="integrated development environment">IDE</abbr>s, and dedicated <abbr title="version control system">VCS</abbr> viewers provide today for Git. Given a tool which makes rebasing, merging, re-describing changes, etc. are all normal and easy operations, <abbr title="graphical user interface">GUI</abbr> tools could make all of those much easier. Any number of the Git <abbr title="graphical user interface">GUI</abbr>s have tried, but Git’s underlying model simply makes it clunky. That does not have to be the case with Jujutsu. Likewise, surfacing things like Jujutsu’s operation and change evolution logs should be much easier than surfacing the Git reflog, and provide easier ways to recover lost work or simply to change one’s mind.

[^signing]:  I care about about this feature and have some hopes of helping get it across the line myself here in February 2024, but we will see!

[^patch-stacks-etc.]: There are plenty of interesting arguments out there about the GitHub collaboration design, alternatives represented by the Phabricator or Gerrit review models, and so on. This piece is long enough without them!


## Conclusion

Jujutsu has become my version control tool of choice since I picked it up over the summer. The rough edges and gaps I described throughout this write-up notwithstanding, I *much* prefer it to working with Git directly. I do not hesitate to recommend that you try it out on personal or open source projects. Indeed, I actively recommend it! I have used Jujutsu almost exclusively for the past seven months, and I am not sure what would make me go back to using Git other than Jujutsu being abandoned entirely. Given its apparently-bright future at Google, that seems unlikely.[^death-by-google] Moreover, because using it in existing Git repositories is transparent, there is no inherent reason individual developers or teams cannot use it today. (Your corporate security policy might have be a different story.)

Is Jujutsu ready for you to roll out at your Fortune 500 company? Probably not. While it is improving at a steady clip—most of the rough edges I hit in mid-2023 are long since fixed—it is still undergoing breaking changes in design here and there, and there is effectively no material out there about how to use it yet. (This essay exists, in part, as an attempt to change that!) Beyond Jujutsu itself, there is a lot of work to be done to build an ecosystem around it. Most of the remaining rough edges are squarely to do with the lack of understanding from other tools.  The project is marching steadily toward a 1.0 release… someday. As for when that might be, there are as far as I know no plans: there is still too much to do. Above all, I am very eager to see what a native Jujutsu backend would look like. Today, it is “just” a much better model for working with Git repos. A world where the same level of smarts being applied to the front end goes into the back end too is a world well worth looking forward to.

{% callout %}

Thoughts, comments, or questions? Discuss:

- [Hacker News]({{discuss.hn}})
- [lobste.rs]({{discuss.lobsters}})
- [LinkedIn]({{discuss.li}})
- [Mastodon]({{discuss.mastodon}})
- [Threads]({{discuss.threads}})
- [Bluesky]({{discuss.bluesky}})
- [Twitter/X]({{discuss.twitter}})


{% endcallout %}

[^death-by-google]: Google is famous for killing *products*, but less so developer tools.

## Appendix: Kaleidoscope setup and tips

As alluded to above, I have done my best to make it possible to use [Kaleidoscope][kaleidoscope], my beloved diff-and-merge tool, with Jujutsu. I have had only mixed success. The appropriate setup that gives the best results so far:

1. Add the following to your Jujutsu config (`jj config edit --user`) to configure Kaleidoscope for the various diff and merge operations:

    ```toml
    [ui]
    diff-editor = ["ksdiff", "--wait", "$left", "--no-snapshot", "$right", "--no-snapshot"]
    merge-editor = ["ksdiff", "--merge", "--output", "$output", "--base", "$base", "--", "$left", "--snapshot", "$right", "--snapshot"]
    ```

    I will note, however, that I have still not been 100% successful using Kaleidoscope this way. In particular, `jj split` does not give me the desired results; it often ends up reporting “Nothing changed” when I close Kaleidoscope.

2. When opening a *file* diff, you must <kbd>Option</kbd><kbd>⎇</kbd>-double-click, *not* do a normal double-click, so that it will preserve the `--no-snapshot` behavior. That `--no-snapshot` argument to `ksdiff` is what makes the resulting diff editable, which is what Jujutsu needs for its just-edit-a-diff workflow. I have been in touch with the Kaleidoscope folks about this, which is how I even know about this workaround; they are evaluating whether it is possible to make the normal double-click flow preserve the `--no-snapshot` in this case so you do not *have* to do the workaround.
