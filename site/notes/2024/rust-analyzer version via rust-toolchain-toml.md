---
title: rust-analyzer version via rust-toolchain.toml
subtitle: If you use an older toolchain, this will make for a better developer (and contributor!) experience.
date: 2024-12-20T15:34:00-0700
qualifiers:
    audience: |
        Rust developers who know how to use [rustup] and rust-toolchain files.
        
        [rustup]: https://rustup.rs
        [overrides]: https://rust-lang.github.io/rustup/overrides.html

image:
    cdn: rust-analyzer-toolchain.png

summary: >
    You can use the `components` field of `rust-toolchain.toml` to specify which version of `rust-analyzer` to use in a project.

tags:
    - Rust
    - software development

---

A follow-on to my note [a couple days ago][prev-note] about configuring [Zed][zed] to use a specific version of [`rust-analyzer`][ra]: I learned today [from this thread on GitHub][gh] that `rust-analyzer` will use the `rust-toolchain.toml` as a source of overrides if the `rust-analyzer` component is present in the toolchain file. For example, a toolchain file like this would make use the versions of both `rust-analyzer` and [`clippy`][clippy] which shipped with Rust 1.83.0:

```toml
[toolchain]
channel = "1.83.0"
components = ["rust-analyzer", "clippy"]
```

At the moment, I do not believe this is expressly or clearly documented anywhere, but I believe the folks who maintain `rust-analyzer` will be working on [fixing that][fix-issue]!

This should make this work nicely for *any* tool which uses rust-analyzer, whereas my previous tip would only apply to Zed, and likewise any similar configuration you might apply for VS Code or Neovim or whatever other tool would only apply to those. If you maintain a project which pins to a specific version, you probably should not include the `rust-analyzer` component this way *by default*, for the sake of good developer experience for folks contributing: let them get the best version of `rust-analyzer` that works with your code. By the same token, though, you probably *should* pin the component as soon as you become aware that `rust-analyzer` has stopped explicitly supporting whatever version you have pinned!

[prev-note]: https://v5.chriskrycho.com/notes/configure-zed-to-use-the-projects-rust-analyzer/
[ra]: https://rust-analyzer.github.io
[zed]: https://zed.dev
[gh]: https://github.com/rust-lang/rust-analyzer/issues/18705#issuecomment-2557621262
[clippy]: https://rust-lang.github.io/rust-clippy/
[fix-issue]: https://github.com/rust-lang/rust-analyzer/issues/18730