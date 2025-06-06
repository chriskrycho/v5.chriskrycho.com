---
title: git commit headers (not log headers)
subtitle: Something I learned because of a neat new jj feature!

summary: >
  To show the details of a commit, not its commit message, you need `git cat-file`.

date: 2025-06-06T08:05:00-0600

tags:
  - version control
  - Git
  - Jujutsu
  - things I learned

qualifiers:
  audience: |
    People who use, and want to know at least a tiny bit more about, version control systems—specifically Git and Jujutsu.

---

[Jujutsu (jj) v0.30.0][v0.30.0] now attaches a `change-id` header to Git commit objects (as you can see in [this <abbr title="pull request">PR</abbr>][pr], which makes it possible in principle for jj to keep track of which Git commimt corresponds to which jj “change” even when sharing them via Git forges that have no idea what jj is. This is neat!

[v0.30.0]: https://github.com/jj-vcs/jj/releases/tag/v0.30.0

jj does this by attaching the data as a “commit header”. If you look that up, though, you’ll find… basically nothing, because every reference is about *message* headers. From [the implementing <abbr>PR</abbr>][pr], and *only* from that so far, I was able to learn how to see that commit header, though: `git cat-file`. For example, then, for the commit in the repo for this very blog on the commit for my previous post, this is the output:

```sh
$ git cat-file commit e594be04
tree 0cfbf6e3c70327afebbc1c188932079bda8808e4
parent 8a21909d8397ea0afed462dbe7845681a5971c62
author Chris Krycho <hello@chriskrycho.com> 1749218059 -0600
committer Chris Krycho <hello@chriskrycho.com> 1749218130 -0600
change-id mwyosuvoswmkponquzmrkrtkyqqwsorp

Notes: History and Disposition
```

Note the `change-id mwyosuvoswmkponquzmrkrtkyqqwsorp` bit! Neat!

Thanks to jj contributor [Philip Metzger][pm] for linking me to that <abbr>PR</abbr> so I could learn this!

[pr]: https://github.com/jj-vcs/jj/pull/6162
[pm]: https://philipmetzger.github.io