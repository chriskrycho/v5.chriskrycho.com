---
title: Using `cargo tree` to Explain Dependencies
subtitle: >
    Or, the equivalent of `npm why`, `yarn why`, `pnpm why`, etc. that you might be looking for.
date: 2024-05-22T13:00:00-0600
tags:
    - Rust
    - software development
summary: >
    Use `cargo tree --invert` and possibly `--edges features` to figure out why you hve a dependency.
thanks: >
    I learned this today from [Daniel Imfield](https://x.com/dimfeld/status/1793342343208436061) and [Kornel Lesiński](https://mastodon.social/@kornel/112485992571365905)!

---

To figure out why a Rust package is in your dependencies list:

```sh
$ cargo tree --invert <package name>
```

We use `--invert` here because you want to see everything which leads to the named package, rather than see the whole tree of dependencies from the root, which might include that package multiple times via different paths.

If you need to see what set of [Cargo features][feat] cause the package to be pulled in, you can combine this with the `--edges` flag to specify the relevant dependency kind:

```sh
$ cargo tree --invert <package name> --edges features
```

[feat]: https://doc.rust-lang.org/cargo/reference/features.html

Putting those together, if you want to answer what dependency’s features are resuling in your having the `notify` crate in your dependencies, you would do:

```sh
$ cargo tree --invert notify --edges features
```

Or, for short:

```sh
$ cargo tree -i notify -e features
```

---

A tiny bit of background (which will hopefully help others find their way here via the magic of <abbr title="search engine optimization">SEO</abbr>): In the Node ecosystem, I am used to doing this with `pnpm why`, `yarn why`, or `npm why`. Today I was [resolving an issue][pr] for integrating some improvements I made to the way we publish <cite>The Rust Programming Language</cite> today, and needed to figure out why exactly `notify` kept ending up in my dependency chain. This was what got me over the last hurdle when it was coming in via a dependency I *thought* I had fixed, but had missed.
