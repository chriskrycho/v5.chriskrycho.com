---
title: jj v0.24
subtitle: My daily-driver version control tool keeps getting better.
date: 2024-12-05T10:45:00-0700

image:
    cdn: jj-v0.24.png

tags:
    - version control
    - software development
    - Jujutsu
    - tools

---

The [Jujutsu (`jj`)][jj] team has just released [v0.24][v0.24]. On macOS, `brew update jj` if you already have it or `brew install jj` if you have yet to install and try it! (See the repo for details for other operating systems.) A few highlights from the new release—

[jj]: https://github.com/martinvonz/jj

It adds an `absorb` command, inspired by the same command in Mercurial. This is one of those things that I never knew how badly I wanted it until I had it. Here’s the description from the docs:

> Move changes from a revision into the stack of mutable revisions
>
> This command splits changes in the source revision and moves each change to the closest mutable ancestor where the corresponding lines were modified last. If the destination revision cannot be determined unambiguously, the change will be left in the source revision.

For Git folks, this is like `git rebase` and `git add --patch` gone mad with power. Instead of taking your working copy and manually staging in changes to individual changes with `fixup` command, you just type `jj absorb` and it does that for you smartly, or bails out if it cannot do it smartly (at which point you can still do what the staging area lets you do, but more directly, with `jj squash --interactive`). The “immutable” bit is Jujutsu very helpfully making sure you don’t try to rewrite history that you shouldn’t: by default, whatever the “trunk” is for your repo, but it’s customizable so you can also make it “trunk or anything I have already pushed”.

Net, if you have a branch with a well-organized set of changes you’ve made, and then you realize you need to make a bunch of bits of cleanup, you just make the changes in your working copy and run `jj absorb` and… that’s it; there is no step three. I used this already this morning and I love it.

There’s a preview of improved shell completions, which you can [opt into][docs]. This is one of the last little things I have missed from Git: auto-completion of bookmark names (like Git branch names). It also works for revisions and files (and more), which will be super handy. This came out of work being done on [clap][clap] to support this better for the whole Rust ecosystem, including e.g. for [Cargo][cargo].

[docs]: https://martinvonz.github.io/jj/latest/install-and-setup/#command-line-completion
[clap]: https://docs.rs/clap/latest/clap/index.html
[cargo]: https://doc.rust-lang.org/cargo/

There are also a ton of little quality-of-life improvements, like making `log` always show the working copy branch first, handling some flags more consistently and in some cases allowing them to be invoked with the “short” version (`-f` for `--from`, for example).

Finally, this release also got rid of some deprecated features: `move`, `merge`, and `checkout`. If you’re thinking, “Wait, a version control system without merge and checkout? How would that even work?” then I encourage you to check out my jj init [essay][essay] or [video][video], which dig into why you don’t need dedicated commands for that in jj. Long story short: `merge` and `checkout` are handled by `jj new` and `jj edit` already, and those commands work with any change.

[v0.24]: https://github.com/martinvonz/jj/releases/tag/v0.24.0
[essay]: https://v5.chriskrycho.com/essays/jj-init/
[video]: https://www.youtube.com/watch?v=2otjrTzRfVk
