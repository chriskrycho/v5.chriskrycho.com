---
title: Options for `libc` with Rust
subtitle: Summarizing a bunch of good social media responses in one place.

date: 2025-02-10T16:31:00
updated: 2025-02-11T08:50:00

qualifiers:
    audience: |
        Rust developers who might want or need to know about more approaches to getting the right libc version one way or another.

summary: >
    Rust binaries are generally quite portable, except that they usually dynamically link libc. What are the options for solving this?

image:
    cdn: render-glibc-error.png

thanks: |
    All the folks who responded to my threads on [Bluesky][b] and [Mastodon][m].

    [b]: https://bsky.app/profile/chriskrycho.com/post/3lhrszf46l22q
    [m]: https://mastodon.social/@chriskrycho/113976612382848867

---

- Use [musl][musl]. By default, just by configuring it in your Rust toolchain. As a bonus, you might want to use a custom allocator to avoid the performance hit from using musl’s built-in allocator, which is well-known to be rather slow—because musl’s goal is *not* first of all speed but being small and portable and statically linkable.

- Match the build <abbr title="operating system">OS</abbr> to the target <abbr title="operating system">OS</abbr> so. Variants of this:

    - Get a build machine set up with whatever <abbr title="operating system">OS</abbr> you are using. On GitHub Actions, this might mean specifying (e.g.) `ubuntu-20.04` if that's what your project actually runs on (using `ubuntu-latest` is a recipe for breaking), or at least a version of Linux at least as old as the version on your target machine.

    - Use [cross][cross] to cross-compile to a given target. This uses Docker under the hood, which makes it relatively straightforward to use… but also requires installing Docker, so it’s not *small* by any means.

    - Build and deploy a dedicated Docker image with the required bits. This is sort of a variant on the previous item. It involves getting thoroughly into the weeds with Docker, but also means you have total control.

- Use [cargo-zigbuild][cz] to use Zig as the linker for the project and then specify the exact glibc version you want.[^zig]

- Manually pick your glibc at runtime, if you control how it is loaded. [(Whoa!)](https://mastodon.social/@robo9k/113978557733917996)

For the little project that motivated the question, I’m debating between actually going full Docker (more yak shaving! But also, more familiarity with a useful tool that I have barely ever touched directly, and that over half a decade ago) and “just” picking a matching version of the <abbr title="operating system">OS</abbr> and moving on.

[musl]: https://musl.libc.org
[cross]: https://github.com/cross-rs/cross
[cz]: https://github.com/rust-cross/cargo-zigbuild

[^zig]: I hypothesize that all the good stuff Zig is doing around linking and libc may end up being its most significant contribution long-term!
