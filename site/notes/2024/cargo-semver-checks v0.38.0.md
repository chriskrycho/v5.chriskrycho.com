---
title: cargo-semver-checks v0.38.0
subtitle: >
   More lints for the sake of fewer SemVer issues in Rust libraries!

image:
    cdn: cargo-semver-checks-v0.38.png

date: 2024-12-11T12:27:00-0700

link: https://github.com/obi1kenobi/cargo-semver-checks/releases/tag/v0.38.0

tags:
    - Rust
    - Semantic Versioning

---

[Twelve new lints]({{link}}) for the tool, which helps catch SemVer breaking changes. Predrag (the primary author of the tool) shares my [passion][posts] for [making SemVer more useful][lc] both via [specs][semver-ts] and, where possible, tooling. Twelve more lints means twelve more edge cases where [the Rust SemVer guidelines][rust-semver] can be followed *automatically*.

If you’re a Rust library author and you are *not* yet using cargo-semver-checks, you should integrate it with your <abbr title="continuous integration">CI</abbr> setup <abbr title="as soon as possible">ASAP</abbr>. If you’re using GitHub Actions, it’s this simple:

```yaml
- name: Check semver
  uses: obi1kenobi/cargo-semver-checks-action@v2
```

It’s also straightforward to install other ways; check out [the repo][csc] for more details on setup and configuration.

[posts]: https://v5.chriskrycho.com/topics/semantic-versioning
[semver-ts]: https://www.semver-ts.org/
[lc]: https://v5.chriskrycho.com/elsewhere/cutting-edge-of-versioning/
[rust-semver]: https://doc.rust-lang.org/cargo/reference/semver.html
[csc]: https://github.com/obi1kenobi/cargo-semver-checks
