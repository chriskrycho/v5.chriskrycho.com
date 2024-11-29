---
title: "New Tool: jj-gpc"
subtitle: Making nicer branch names on the fly.

date: 2024-11-28T11:50:00-0700

qualifiers:
    audience: >
        People who use (or are interested in) jj and/or little command line tools in general.

image: https://cdn.chriskrycho.com/images/jj-gpc.png

updated: 2024-11-28T21:54:00-0700
updates:
    - at: 2024-11-28T21:30:00-0700
      changes: >
        Added actual examples of the output, thanks to [reader feedback](https://bsky.app/profile/necauq.ua/post/3lc2huylx3k2x)!
    - at: 2024-11-28T21:54:00-0700
      changes: >
        Added several more examples from real-world uses of the tool.

---

Last night and this morning I built a tiny new tool for my own purposes, called `jj-gpc`, where `gpc` is short for `git push --create`.

[Jujutsu][jj] is a modern, Git-compatible version control system. (I wrote [a nice long introduction][jj-init] to it early this year—a few details are outdated, but the big picture is as it was then, but even nicer.) It supports, and I primarily use, anonymous branches for development. Since Git, and thus all Git-based “forges” (GitHub, GitLab, Bitbucket, etc.) require branch names, though, you need to give a branch name when you push your changes for others to work with.

[jj]: https://github.com/martinvonz/jj
[jj-init]: https://v5.chriskrycho.com/essays/jj-init/

Jujutsu has native support making this easy. If you run `jj git push --change <change ID>`,it creates a Jujutsu bookmark (which it maps to Git branches) and then pushes that newly created bookmark. The bookmark names it creates are of the form `push-<change id>`, though. Those are not especially attractive to most collaborators!

This tiny tool is one “solution”: it generates a bookmark name based on the messages associated with the changes you tell it to use—by default, `trunk()..@`, or “everything between my current working copy and whatever the ‘trunk’ is for this project (usually `main` or `master`”).

I had the idea for this a few days ago while working on some revisions and fixes to <cite>The Rust Programming Language</cite>, as I created a bunch of branches like `push-tskzrxpsrmox` ([a real example][eg] from yesterday!). I remain mildly “bearish” on most of the places generative <abbr title="artificial intelligence">AI</abbr> is getting shoved, but this is a perfect use case.

[eg]: https://github.com/rust-lang/book/pull/4118

The way I name branches/bookmarks is basically always just a few words summarizing the gist of the change. <abbr title="large language model">LLM</abbr>s are pretty good at that. Unlike commit messages and pull request descriptions, which are important parts of both my planning and my communication about any given change, branch names are rarely all that important. I would *not* generate commit descriptions or pull/merge request descriptions this way, because they are load-bearing. Branch/bookmark names are *not* generally load-bearing in that way: they are really only “important” as an artifact of Git‘s requirement that branches be named. So: generate them!

A few implementation notes:

`jj-gpc` invokes `jj` by spawning a child process to get the commit messages, then uses [ollama][ol] with [llama3.2][model] to generate a 2–4 word branch names from those. Currently it just uses the top-line summaries for the commits, because those should usually be high-enough signal to get a useful-*enough* branch name. The prompt is really simple:

[ol]: https://ollama.com
[model]: https://ollama.com/library/llama3.2

> Summarizing *all* of these messages in a single phrase. The phrase should consist of 2–4-words, all lowercase. Do not mention branches. Do not include more words. Reply with only the phrase.

After I get the result, I replace all spaces with single `-` characters, and that’s it. That proved much more consistent than getting the model to reply with `-` characters. I also found it was helpful to turn down the `top_k` setting on the generation to get more consistent results while still getting semi-descriptive phrases out of it, whereas turning down temperature produced phrases that were too “blah” for me.

I built it in Rust because I like Rust and it was a good excuse to play around with some of the <abbr title="artificial intelligence">AI</abbr> libraries in the ecosystem. It uses [ollama-rs][ol-rs], which Just Worked™ (though it requires you to use it with [tokio][tokio]) for generating this kind of thing.

[ol-rs]: https://github.com/pepperoni21/ollama-rs
[tokio]: https://tokio.rs

I was originally using [the `qwen2.5-coder` model][q] but found it a bit slow. I switched to `llama3.2` because it promised to be super fast and optimized for local text generation, and it seems good enough at that. I’d like to see if I can find a model trained in obviously-legal ways that is comparably fast—it doesn’t even have to be *that* fast, it just shouldn’t take an extra 10 seconds, which `qwen2.5-coder` was!

[q]: https://ollama.com/library/qwen2.5-coder

Anyway, it might be useful to you, but it will *definitely* be useful for me, and it was a really fun little bit of Thanksgiving holiday hacking!

---

A reader quite reasonably [noted][bsky] that it would be handy to show some example branch names, so I ran it against some work I am doing in a branch in the repo for <cite>The Rust Programming Language</cite> book. The summary messages fed to the <abbr title="large language model">LLM</abbr> on this branch were:

[bsky]: https://bsky.app/profile/necauq.ua/post/3lc2huylx3k2x

```
infra: use new version of pulldown-cmark-to-cmark
Ch. 17: ignore internal links
infra: fix output for nostarch book listings
infra: remove extra leading `>` in nostarch output
infra: update dependencies for mdbook preprocessors
Add Chris Krycho (me!) to the nostarch book.toml authors
infra: decouple preprocessors from current mdbook version
infra: create mdbook-trpl-figure preprocessor
infra: use anyhow for error reporting
infra: share infrastructure for mdbook preprocessors
```

I ran it three times against that list and it produced the following branch names:

- `update-infra-issues`
- `update-mdbook-dependencies`
- `software-updates-implemented`

I then ran it on a different repo (some not-yet public work) three times and over those runs it spit out:

- `cleaning-and-fixes`
- `small-bug-fixes`
- `small-code-updates`

Then I checked what it would have spit out for the commits in [this PR][pr] to my [True Myth][tm] types library, and it gave these pretty solid examples:

- `bump-typescript-version`
- `support-ts-versions`

The summary messages that went into that:

```
Explicitly support TS 5.6 and 5.7 in CI and docs
build(deps-dev): bump typescript from 5.6.3 to 5.7.2
```

[pr]: https://github.com/true-myth/true-myth/pull/868
[tm]: https://github.com/true-myth/true-myth

Are any of those *great*? No. Are all of them more reasonable-seeming than `push-ynuuvsuttuqu`? Undoubtedly. In the latter case in particular, they also aren’t really representative of the nature of the work. This gets at an obvious issue with this tool: every commit message gets the same weight. A handful of small fixes or refactors that are simply “tidying up” before making a change are treated as equally important to the actual substantive change.

For my purposes with this tool, that is fine. After all, the point is simply that for most changes, most of the time, the branch name really does not matter. And of course, I can probably improve it later, by telling it to ignore certain messages, or by passing it the full commit message instead of just summaries. In cases where I actually *do* care, I can choose a name myself.
