---
title: Fast Tools are Wonderful
subtitle: >
    A real-world example: Markdown-, HTML-, Unicode-aware word counting.

date: 2024-07-13T11:45:00-0600

tags:
    - software development
    - Rust

qualifiers:
    audience: >
        People interested in software performance (but not necessarily programmers).

---

I built a little [Rust][rust]-powered <abbr title="command line interface">CLI</abbr> tool back in early June that I use all the time now, which I hope to open source in the next week or two, called `count-md`. It’s like `wc`, but it’s Markdown-, <abbr title="HyperText Markup Language">HTML</abbr>-, and Unicode-aware, so it can accurately count the *words* in a Markdown text.

[rust]: https://www.rust-lang.org

For a very simple example of how this matters, given this text—

````markdown
# Heading 1
## Heading 2

This is text.

> This is a quote!

```rust
fn main() {
    println!("Hello!");
}
```
````

—running `wc -w` tool will report that there are 21 words.

There are *not* 21 words in that text, even if you count things like `fn` in the code block as words. There are at most something like 15 or 16 *words*, depending on how you count the programming language tokens.

By contrast, `count-md` in its default mode reports that there are just *7* words, because with the defaults I have configured for my own purposes, it ignores blockquotes and code blocks. So only “This is text” gets included! If I include everything with `count-md --all`, it counts 15 words, exactly as it should!

`count-md` also lets me specify what gets included in that count; it currently supports including or excluding block quotes, headings, tables, block code, inline code, <abbr title="Yet Another Markup Language">YAML</abbr> metadata, and block <abbr title="HyperText Markup Language">HTML</abbr>. That makes it *way* more useful than `wc` for seeing how many words are in a technical document!

Here’s my favorite part (besides just how nice it is to have the tool, given I have reasons for wanting all that functionality in its own right): Running it on the source for this very website, with its 400-some-odd posts, over 280,000 words,[^count] and a lot of complicated Markdown and some non-trivial <abbr title="HyperText Markup Language">HTML</abbr> in the mix along the way, finishes about 6.5× faster than `node --help`.[^speed]

Three takeaways:

1. Fast tools matter! In this case it’s just *nice*—and we shouldn’t undersell the value of “nice”!—, but in many cases, you can do things with sufficiently fast tools that you just wouldn’t even bother taking a swing at otherwise, because they would take too much time.

2. Moreover: it’s easy to treat performance as a thing that you only care about “when it matters”. But if you treat it that way, by the time it matters, it can be very difficult to identify where the parts that are slow actually are, and you never build the “muscles” for that kind of performance work.[^make-it-work]

3. It is *easy* to do this given the right foundations. This whole thing is under 350 lines of my own code (plus another 435 lines of test code), and it is simultaneously within spitting distance of `wc` *and* provides much more useful output because I am working with the semantics of the source—and building on top of *great* Rust libraries to do it.

I plan to extract this tool from the context where I originally wrote it and open source it sometime in the next week or two, so you’ll be able to use it fairly soon. I will update this post when that happens, as well as send out a feed-only update about it!

[^count]: Depending on how you count it, i.e. which flags I pass, of course. 😅

[^speed]: Using `hyperfine` with the latest Node <abbr title="long term support">LTS</abbr> release, on my 10-core M1 Max MacBook Pro with 64<abbr title="gigabytes">GB</abbr> <abbr title="random access memory">RAM</abbr>.

    ```sh
    $ hyperfine --warmup 100 "count-md ~/dev/chriskrycho/v5.chriskrycho.com/site/**/*.md" "node --help"
    Benchmark 1: count-md ~/dev/chriskrycho/v5.chriskrycho.com/site/**/*.md
      Time (mean ± σ):       5.1 ms ±   0.3 ms    [User: 8.7 ms, System: 3.8 ms]
      Range (min … max):     4.5 ms …   6.3 ms    404 runs

      Warning: Command took less than 5 ms to complete. Note that the results might be inaccurate because hyperfine can not calibrate the shell startup time much more precise than this limit. You can try to use the `-N`/`--shell=none` option to disable the shell completely.

    Benchmark 2: node --help
      Time (mean ± σ):      33.0 ms ±   0.6 ms    [User: 25.3 ms, System: 5.4 ms]
      Range (min … max):    32.2 ms …  35.1 ms    84 runs

    Summary
      count-md ~/dev/chriskrycho/v5.chriskrycho.com/site/**/*.md ran
        6.48 ± 0.41 times faster than node --help
    ```

    As an aside, credit to [bun](https://bun.sh) here, which is *substantially* faster on this operation than Node is.

[^make-it-work]: I have the deepest and sincerest *disdain* for the well-intended but ultimately completely misguided phrase, “Make it work, make it right, make it fast.” That entire framing presupposes a definition of “working” which does not include correctness or performance, and I wholeheartedly reject any such definition. More on that anon.
