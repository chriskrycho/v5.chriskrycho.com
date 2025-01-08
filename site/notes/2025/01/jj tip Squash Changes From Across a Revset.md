---
title: "jj tip: Squash Changes From Across a Revset"
subtitle: Another quick and easy way to split up changes “after the fact”.

date: 2025-01-08T09:44:00-0700

summary: >
    You can use `jj squash --from` with a revset to move changes out of a set of commits into another commit. Handy for breaking up changes into small PRs!

image:
    cdn: jj-squash-from-revset.png

qualifiers:
    audience: |
        People using, or interested in what it is like to use, [Jujutsu (jj)][jj] as their version control system. Assumes basic knowledge of the concept of jj [revsets][revset].
        
        [jj]: https://github.com/jj-vcs/jj
        [revset]: https://jj-vcs.github.io/jj/latest/revsets/

tags:
    - Jujutsu
    - version control
    - tools

---

Today I learned, while trying to answer [a question][qa] on the [Jujutsu <abbr>VCS</abbr> Discord][jj-discord], that `jj squash` has powers I did not know about, so I figured I would share it! The user asking the question was working on a Go project and had a bunch of changes to their `vendor` directory scattered across a bunch of commits, which they handily shorthanded as “`r1` to `rN`”. They wanted to take those changes and move them all into a single commit they could use to create a dedicated <abbr title="pull request">PR</abbr> for just those changes, and then make a separate <abbr title="pull request">PR</abbr> for their other changes.

[qa]: https://discord.com/channels/968932220549103686/1326558798118256771
[jj-discord]: https://discord.gg/dkmfj3aGQN

It turns out this is super easy, because the `--from` flag for `jj squash` takes a [revset][revset] (I think `--from` basically *always* takes a revset, but I haven’t checked that!).

[revset]: https://jj-vcs.github.io/jj/latest/revsets/

Here’s how I would do this workflow, using `r1` and `rN` as the shorthand for the set of changes:

```sh 
# here, use whatever your trunk branch is where I have `main`
$ jj new main -m "Update `vendor` for reasons"
$ jj squash vendor --from r1::rN --into @
```

Note that the `@` here is optional, included only for full clarity. If you `squash --from` somewhere and do not specify `--into`, the default will be to squash *into* the current commit, and vice versa. Also, I used the revset `r1::rN` because that kind of series of changes is what the person was asking about, but *any* revset will work here. In real day-to-day work, I would actually type that command like this, using the `-f` short version of `--from`, and leaving off the `--into` entirely:

```sh
$ jj squash vendor -f r1::rN
```

That’s it. You now have all the changes to `vendor` from all changes between (inclusive of) `r1` and `rN` in that newly created commit, and they have been *removed* from all those intermediate changes.

I made a little demo of this to show this in practice:

<figure>

<script async id="asciicast-697535" src="https://asciinema.org/a/697535.js"></script>

<figcaption>Using <code>jj squash --from</code> with a revset to move all changes that affect a given directory out of that revset and into a target change</figcaption>

</figure>

I am *super* glad to know this works, and I fully expect to be using it.

If you’re wondering how or why you would prefer this over something like [the `jj absorb` workflow][absorb] I showed back in December: `absorb` will only do this if the affected lines have changes previously in mutable history. With something like these vendor changes, they might… or they might not! With `squash`, you are taking *all* of the relevant changes you specify, which can be:

- everything in the revsets, if no further arguments are passed
- a set of files, which can be as simple as an individual file or directory (like I showed here) or a much more complicated set produced by jj’s [fileset language][fileset]
- chunks selected interactively using `-i`/`--interactive`

[absorb]: https://v5.chriskrycho.com/journal/jujutsu-megamerges-and-jj-absorb/
[fileset]: https://jj-vcs.github.io/jj/latest/filesets/