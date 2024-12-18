---
title: Configure Zed to Use the Project’s rust-analyzer
subtitle: Because it is not nice for your editor tooling to stop working!
date: 2024-12-18T16:27:00-0700
tags:
    - Rust
    - tools
    - software development

image:
    cdn: zed-lsp-ra.png

summary: >
    Upsides and downsides of configuring your editor to always use the version of rust-analyzer which came with the version of Rust you are using.

---

I was just doing a tiny bit of work on a project which ran into [an issue][issue] using the most recent version of [rust-analyzer][ra], and realized that the solution is to make sure my editor uses the same version of the Rust toolchain as the project in question has specified—in its case, via a `rust-toolchain.toml` file. The solution in [Zed][zed]’s case is pretty straightforward, thanks to [a change][pr] earlier this year: specify the path you want in `lsp.rust-analyzer.binary.path`.

[issue]: https://github.com/rust-lang/rust-analyzer/issues/18705
[ra]: https://rust-analyzer.github.io
[zed]: https://zed.dev
[pr]: https://github.com/zed-industries/zed/pull/9293

You can do that in project-specific settings like this:

```json
{
  "lsp": {
    "rust-analyzer": {
      "binary": {
        "path": "/Users/chris/.cargo/bin/rust-analyzer"
      }
    }
  }
}
```

You could set the same in your application-wide settings… and you might want to. Why? Well, something interesting to notice about the `path` I set there is that it is *not* pointing to a specific version, but to `~/.cargo/bin/rust-analyzer`. That is a symlink managed by [rustup][rustup], and that symlink is actually just a pointer back to `rustup` itself. Under the hood, `rustup` will check what it was invoked *as* and where it was invoked *from*, and use that to dispatch to the right

[rustup]: https://rustup.rs

That means it always matches whatever the appropriate version of a given tool—`rustc`, `cargo`, or (as here) `rust-analyzer` is for the directory in question. That means if you like you can set up Zed to *always* use the version of rust-analyzer that was bundled with the version you are using in a given project, by putting those `lsp` settings in your editor-wide configuration instead of just your project configuration. Neat!

One downside here is you will not get new features or bug fixes for `rust-analyzer`. The big upside is that anything that worked when you chose that version of Rust will *continue* to work, even if a newer version `rust-analyzer` drops support for older versions.
