---
title: |
    PSA: Default to `cargo install --locked`
subtitle: |
    There are reasons this is not the default, but you can make it *your* default.

image: https://cdn.chriskrycho.com/images/cargo-install-locked.png

summary: |
    `cargo install` defaults to ignoring the lockfile for the package being installed. You probably want to invert that by using `--locked`.

date: 2024-12-04T09:45:00-0700
tags:
    - Rust
    - software development

---

We just [fixed][pr] an issue with [Volta][v]’s continuous integration tests—and, I think, also with the project “for real”!—where our Windows build was failing because the version of [cargo-wix][wix] we were using was transitively depending on some packages which have started using a more recent [<abbr title="minimum supported Rust version">MSRV</abbr>][msrv] than ours.

[pr]: https://github.com/volta-cli/volta/pull/1955
[v]: https://volta.sh
[wix]: https://github.com/volks73/cargo-wix
[msrv]: https://github.com/rust-lang/rfcs/pull/3537

By default, `cargo install` does *not* use the lock file from the package being installed (per [the docs][docs]). There are reasons for this, some of them historical and some of them contentious, but as a practical matter, using `--locked` avoids a lot of the kinds of problems we saw with `cargo-wix` on Volta this week.

You should probably use `--locked` with `cargo install` by default for tools you install locally, because that guarantees you are getting the same thing that the author used and presumably tested against. It is also a reasonably good default for your <abbr title="continuous integration">CI</abbr> tests. That said, you may also want to have a <abbr title="continuous integration">CI</abbr> job which does  *not* use `--locked` to give you early signal about whether you will be in for a bad time at some point in the future.

[docs]: https://doc.rust-lang.org/cargo/commands/cargo-install.html#dealing-with-the-lockfile
