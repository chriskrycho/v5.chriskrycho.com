---
title: >
    count-md: a New Rust Tool and Library
subtitle: >
    Counting words in a Markdown files in a way that actually makes sense.
qualifiers:
    audience: >
        People who write in Markdown and need to count the words
date: 2024-08-02T17:06-0600
tags:
    - software development
    - Rust
    - Markdown
link: https://github.com/chriskrycho/count-md

---

I just published v0.1.0 of [count-md]: a little Rust-powered tool for counting words in a Unicode-aware, <abbr title="HyperText Markup Language">HTML</abbr>-aware, Markdown-aware way. It’s *very* fast—it counts this very website’s 434 files and 269,627 words in under 5ms on my M1 Max MacBook Pro.

[count-md]: https://github.com/chriskrycho/count-md

To get the command line tool, you’ll need to have Rust installed, and then you can do `cargo install count-md`.

`count-md` is:

- Unicode-aware: it uses Unicode-aware word boundary splitting, so it works across languages.

- <abbr>HTML</abbr>-aware: it does not count <abbr>HTML</abbr> tags!

- Markdown-aware: it does not count Markdown syntax either: `> > ## Heading 2 in a Nested Quote` is 6 words, not 9.

`count-md` is also *configurable*. It ships with good defaults (at least: good in my view, matching my own opinions) but it also lets you include or exclude a lot of different semantic elements. Want to skip headings but include <abbr title="Yet Another Markup Language">YAML</abbr> metadata? There are flags for that.

It also ships a Rust library of the same name, so everything you can do on the command line you can do via library. (I hope to publish C bindings for that as well, once I have the unsafe code vetted to my own satisfaction, so you can use this from other languages!)

This is a 0.1.0 release because there are a handful things it does not support correctly yet, including GitHub style admonitions, task lists, embedded LaTeX math, and some edges cases around block <abbr>HTML</abbr>. I already use it all the time, though!

For more, check out [the repository][repo]![^history]

[repo]: https://github.com/chriskrycho/count-md

[^history]: If you are curious why the repo history is full of "Publish count-md with latest changes from core" messages: that’s because this is extracted from a private project. I mucked around with [josh](josh-project.github.io/josh/) etc., but found them all annoying. Maybe eventually!

