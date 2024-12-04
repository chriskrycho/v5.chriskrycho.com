---
title: On `cargo install` Not Defaulting to `--locked`
subtitle: |
    A few details, as I best I know them, because a friend asked after reading my last post!

date: 2024-12-04T15:57:00-0700

image: https://cdn.chriskrycho.com/images/cargo-locked-history.png

tags:
    - Rust
    - software development
    - Semantic Versioning

---

After reading [my last note][prev], a friend asked:

[prev]: https://v5.chriskrycho.com/notes/psa-default-to-cargo-install-locked/

> you alluded to reasons why this wasn't made the default.. can you expand on that? …I'm surprised Rust would intentionally go against \[reproducibility].

My lightly edited and expanded response:

If I recall correctly (and I may not fully!), the historical reason is that there was a sense early in the project (which was also current in Ruby and Node circles at the time) that lock files should only be used for development but not distribution of a package/binary/etc. I’m not actually sure where that came from originally; but I think the idea was that it was an easy way to end up with a “works exactly as is but is fragile” situation. Which… uhh… that’s the point of a lock file, folks! Everyone eventually realized that, so the default/norm shifted across at least the Node and Rust communities no longer act that way.

<aside>

The way to solve that problem is to use a lock file but to test regularly against whatever your package manager will resolve based on your existing constraints… or to go a completely different direction and resolve *lowest* compatible instead of *highest* compatible, the way Go does; but that has its own trade-offs: you won’t get even critical bug fixes that way!

</aside>

I think switching the default for binaries via `cargo install` is still slightly contentious because the thought is that if there are (compatible) bug fixes, you want to get them, esp. if they fix security issues.

That’s roughly the same reason that when you first go from `Cargo.toml` to `Cargo.lock`, you generate constraints based only on the constraints specified in `Cargo.toml` files directly or transitively, not on the `Cargo.lock` files of your dependencies—you ultimately want the end project to be as free as possible to resolve those constraints. (The same thing goes, *mutatis mutandis*, for `package.json` and the lock file for whatever package manager you’re using in Node.)

I’m sympathetic, and mostly `cargo install` *should* just work without `--locked`… the exception being that there is not a widely-accepted standard about changing Minimum Supported Rust Version (<abbr>MSRV</abbr>): most libraries do not treat that as a breaking change, but as in the case which motivated my first post, it obviously can and will break consumers. Perhaps unsurprisingly from someone who has done [the work][semver-ts] I have [around SemVer][talk], I disagree with the general stance in the Rust ecosystem on this!

[semver-ts]: https://semver-ts.org
[talk]: https://v5.chriskrycho.com/elsewhere/cutting-edge-of-versioning/

(If you are reading this and know more/better than me, please let me know and I’ll happily publish a further update with more and more accurate details!)
