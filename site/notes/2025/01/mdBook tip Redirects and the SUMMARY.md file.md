---
title: "mdBook tip: Redirects and the `SUMMARY.md` file"
subtitle: |
    The “helpful” creation of files named in `SUMMARY.md` might trip you up.

summary:
     If you are redirecting mdBook chapters, make sure you update links in `SUMMARY.md`, or else your redirects will not work.

tags:
     - tools
     - writing

date: 2025-01-22T11:01:00-0700

qualifiers:
    audience: |
        People who use [mdBook](https://rust-lang.github.io/mdBook/).

---

Yesterday I went to fix a long-standing chapter numbering quirk in the online version of <cite>The Rust Programming Language</cite>: section 19.2 had the file name `ch19-03-advanced-traits.html`, and sections 19.3–19.5 were similarly off by one. I noticed this quirk when renumbering the chapters to insert a new Chapter 17 on async and await: 19.1 needed to become 20.1 and so on, and that made it easy to spot that there was no `ch19-02-*` (now `ch20-02-*`) file.

I finally had a chance to fix it yesterday. I renamed the files, updated internal references within the text, and added [redirects][redirects]. With that, I thought I was done… but no.

[redirects]: https://rust-lang.github.io/mdBook/format/configuration/renderers.html#outputhtmlredirect

Running `mdbook build` produced errors like this:

```sh
$ mdbook build
2025-01-21 16:34:23 [INFO] (mdbook::book): Book building has started
2025-01-21 16:34:24 [INFO] (mdbook::book): Running the html backend
2025-01-21 16:34:24 [ERROR] (mdbook::utils): Error: Rendering failed
2025-01-21 16:34:24 [ERROR] (mdbook::utils): 	Caused By: Unable to emit redirects
2025-01-21 16:34:24 [ERROR] (mdbook::utils): 	Caused By: Not redirecting "/Users/chris/dev/rust-lang/book/dev/book/ch20-03-advanced-traits.html" to "ch20-02-advanced-traits.html" because it already exists. Are you sure it needs to be redirected?
```

The problem was that I had missed updating the link references in the `SUMMARY.md` file. That file defines the structure of an mdBook’s output, and mdBook has a nice feature: if you reference a Markdown source file for the book that does not yet exist, mdBook will create it for you. I call it “a nice feature” because I can imagine that it is helpful when working on a new book, but in fact it is a bit of a misfeature for me, in that I have repeatedly tripped over it! Here, for example: because I had missed updating the references in `SUMMARY.md`, mdBook helpfully created empty stubs at the old file locations. That in turn resulted in the error message I showed above.

So: if you are restructuring an mdBook, make sure you update all the links in `SUMMARY.md` as well as adding the `redirects` values, or you will have this same kind of bad time.