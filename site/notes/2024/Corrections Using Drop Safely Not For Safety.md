---
title: "Corrections: Using Drop *Safely*, Not *For Safety*"
subtitle: My note about using `Drop` in Rust last week had a serious error!
date: 2024-12-17T08:00:00-0700
tags:
    - Rust
    - errata

---

Last week I published [a post][post], then titled **Using Drop for Safety in Rust**, that contained a significant error—one I should have known about, because it is ancient Rust history! If you read that post, the main thing to take away is that it is always unsafe and therefore unsound to relly on a `Drop` imlpementation for safety or soundness, because Rust does not (and as a matter of fairly long-standing constraints on its design *cannot*) guarantee that a `Drop` implementation will be run. Thus, any `unsafe` code you write *must* not rely on the `Drop` implementation.

[post]: https://v5.chriskrycho.com/journal/read-the-code/using-drop-safely-in-rust/

In the case of the `std::vec::Drain` type specifically, soundness is preserved *at construction*. Specifically, it [truncates the original `Vec`][src] so that the underlying elements may be *leaked* but will never be illegally aliased.

[src]: https://github.com/rust-lang/rust/blob/1f3bf231e160b9869e2a85260fd6805304bfcee2/library/alloc/src/vec/mod.rs#L2621-L2622

This morning, I updated the post to account for that:

- I corrected the text itself, to say that `Drop` must *not* be responsible for upholding soundness and to clarify that it is only responsible to be sound *in its own* implementation, and explaining the correct-at-construction implementation instead.

- I changed the title to [**Using Drop Safely in Rust**][post], to convey the shift in meaning, updated the <abbr title="universal resource locator">URL</abbr> to match, and redirected the original post to the new location.

- I added a note explaining the mistake mid-text, and also flagged it in the Updates section at the end of the piece.
