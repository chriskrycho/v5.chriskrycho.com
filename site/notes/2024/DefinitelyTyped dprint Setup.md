---
title: The DefinitelyTyped dprint Setup
subtitle: >
    Much, much simpler than I expected!

date: 2024-12-02T15:45:00-0700
tags:
    - software development
    - Rust

image: https://cdn.chriskrycho.com/images/dprint-setup.png

qualifiers:
    audience: >
        Software developers; this is about an auto-formatting tool for an open source repository (though not limited to open source).

---

I was just [investigating][i] integrating [dprint][dprint] to auto-format the Markdown files in the repository for <cite>The Rust Programming Language</cite> book, because doing it manually is a pain in the neck. Setting it up is the easy bit: `dprint init` and you’re off to the races. The slightly trickier bit is: I don’t really want to require contributors to do that, and I also don’t want [Carol][carol] or myself to have to think about doing it after the fact if we keep our current policy of not requiring formatting to match to merge changes.

[i]: https://github.com/rust-lang/book/issues/3922
[dprint]: https://dprint.dev/
[carol]: https://github.com/carols10cents

What I actually want is for commits to be able to land and then immediately get auto-formatted, so contributors don’t have to think about it, and *neither do maintainers*. Auto-formatting is best when it just works and stays out of your way.

I knew the [DefinitelyTyped][dt] repository—for third—party TypeScript type definitions—had a bot wired up to do just this, so I took a few minutes today and figured out exactly *how*. The TS team set up DefinitelyTyped to [report][report] dprint issues using their [Danger][danger] configuration,[^danger] and they have a [merge bot][merge] which does the actual merges, so I had assumed it was wired up with one of those, presumably the merge bot.

[dt]: https://github.com/DefinitelyTyped/DefinitelyTyped
[report]: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/c3632cc0b02e7cc2f037eab56acaf879de24ef8e/dangerfile.ts#L91-L118
[danger]: https://danger.systems/js/
[merge]: https://github.com/microsoft/DefinitelyTyped-tools/tree/main/packages/mergebot

They just have [a *very* simple GitHub action][action] which checks out the code, makes sure <abbr title="continuous integration">CI</abbr>, uses the date to configure a cache key, runs `dprint fmt` on anything which has changed, and commits the change. The end. That’s the whole thing.

[action]: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/c3632cc0b02e7cc2f037eab56acaf879de24ef8e/.github/workflows/format-and-commit.yml#L13

I am not yet *committed* to wiring this up on <cite>The Rust Programming Language</cite>, but I am an awful lot closer to doing it given the only thing I would need to wrangle is an email address for the commit. And I will probably do it on *other* projects going forward (the same thing would work with [`rustfmt`][rustfmt] or [Prettier][prettier] or [Ruff][ruff]!) since it makes it so much easier for contributors.

[rustfmt]: https://rust-lang.github.io/rustfmt/
[prettier]: https://prettier.io
[ruff]: https://astral.sh/ruff


[^danger]: I might write up notes on Danger some other time; it’s a nice little bot
