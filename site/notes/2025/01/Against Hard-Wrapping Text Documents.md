---
title: Against Hard-Wrapping Text Documents
subtitle: >
    Let your text editor do the work for you instead. *Please.*

summary: >
    Yes, it makes things look nicer in a very few, very specific places. But it makes it that much worse everywhere else.

date: 2025-01-12T20:22:00-0700

tags:
    - writing
    - tools

qualifiers:
    audience: |
        People who write with plain-text formats like Markdown, especially programmers, *especially* those of you who like to hard-wrap at 80 characters.

---

Working on <cite>The Rust Programming Language</cite> materials for the past year has reinforced something I have believed for a very long time: hard-wrapped lines of text are *the worst*.

There are three big reasons that I dislike hard-wrapping by character width:

First, it makes it impossible to use a font for writing that is *not* a monospaced font, and likewise anything but a programming text editor. Maybe that is your preference, in which case: fair enough. However, it is not *my* preference. I am writing this little Note in [Byword][byword], for example, as I do with [many of them][byword-post]. If I am working on the documentation for a project, I would prefer to be able to use *any* good text editor to work with it, and any font as well.

[byword]: https://www.bywordapp.com/
[byword-post]: https://v5.chriskrycho.com/notes/byword/

Second, it makes editing extremely annoying. Nearly every change you make requires rewrapping lines. ([Trust me.][rust-book-1]) Then, reviewing those changes (say, on GitHub or GitLab) requires disentangling the *actual* changes.[^formatting] I can say [from *considerable* experience][rust-book-2] that this makes an equally awful experience as authoring this way does.

[rust-book-1]: https://github.com/rust-lang/book/pulls?q=is%3Apr+author%3A%40chriskrycho+is%3Amerged+
[rust-book-2]: https://github.com/rust-lang/book/pulls?q=is%3Apr+reviewed-by%3A%40chriskrycho+is%3Aclosed

The long and short of it is: manually-wrapped lines have a single, very small upside in the form of looking nice in a user interface that doesn’t support line wrapping *and* is wider than the line width at which you manuually wrapped them. Everything else is downside, in my book.

[^formatting]: Cf. Joshua Goldberg's great post today: [Split Out Unrelated Changes][goldberg]. Formatting-only changes obscure semantic changes!

[goldberg]: https://www.joshuakgoldberg.com/blog/split-out-unrelated-changes/

---

What to do instead? There are two options:

1. Do “semantic” wrapping, where you wrap after every sentence. This solves the editing problem, but does not make for a particularly pleasant experience.

2. Don't wrap your lines! Trust your tools to wrap them for you as appropriate. This is by far my own preferred approach.

Pick either. Preferably (2), but seriously, either will do. Just… please, for the love of everyone else in the world, stop hard-wrapping your text. Please.
