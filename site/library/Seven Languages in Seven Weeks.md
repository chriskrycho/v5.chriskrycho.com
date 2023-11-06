---
title: Seven Languages in Seven Weeks
subtitle: >
    A now-classic read for software developers. How did it age?
date: 2023-11-06T14:30:00-0700
tags:
    - book reviews
    - software development
    - programming languages
summary: >
    Any working software engineer who does not already have a wide exposure to different programming languages should read Bruce Tate’s book!

book:
    title: "Seven Languages in Seven Weeks: A Pragmatic Guide to Learning Programming Languages"
    cover: https://cdn.chriskrycho.com/images/books/7lang7weeks.jpg
    review:
        rating: Recommended
        summary: >
          Tate’s language choices have aged unevenly—in ways that are interesting to think about in their own right!—but the book itself has not: it remains an excellent introduction to a bunch of different ways of thinking about programming. If you have never dipped your toes into the waters outside mainstream languages like Java, JavaScript, Python, etc., this book is worth reading.
    year: 2010
    link: https://bookshop.org/a/21126/9781934356593

qualifiers:
    audience: >
        Software developers—any and all!—who have not yet read this book.


---

A few years ago, I picked up and started reading through Bruce Tate’s 2010 book [<cite>{{book.title}}</cite>][book]. I had heard quite a few people I respect refer to it (and its sequel, [<cite>Seven More Languages in Seven Weeks][sequel]) as having significantly altered the trajectory of their careers. I did not tackle it in a single 7-week stretch, because: life. I have made slow but steady progress on it since then: every so often picking it up and working through one of the chapters—one of the languages!—and I finished it today.

[book]: {{book.link}}
[sequel]: https://bookshop.org/a/21126/9781941222157

It is easy to see why it made such a dent in the industry. Back in 2010, the current wave of new programming languages was perhaps on the horizon for those who knew where to look—Tate himself being a good example of such connoisseurs—but by and large we were living in a world *profoundly* dominated by Java and C♯, with the alternatives being some mix of scripting languages: <span class="smcp">PHP</span>, JavaScript, Ruby, Python. When this book came out, [Rust][rust] was still a relatively early-phase research project inside Mozilla. [Swift][swift] was *just* getting going inside Apple, [TypeScript][ts] at Microsoft, and [Kotlin][kotlin] at Jetbrains. (Something must have been in the water in 2010!) Plenty of people were doing interesting things in other languages, but the scene was nothing like it is today. Tate’s book, from a well-respected press, was thus able to make a big dent in the landscape.

[rust]: https://www.rust-lang.org
[swift]: https://www.swift.org
[ts]: https://www.typescriptlang.org
[kotlin]: https://kotlinlang.org

For my part, I learned a few things along the way, but the book was not revolutionary. I think if I had read it in the first five to seven years of my career it would have been mind-blowing, but at this point in my career it was largely things I already knew. That is in no small part, though, because of the indirect influence of Tate’s book! Many of the languages here I had looked at already precisely because I had heard of them from other people who *have* read it. Others were less novel because I have used languages influenced by them. The major exception was [Prolog][prolog]: I knew that logic programming existed, and went to a *fascinating* talk on [Mercury][mercury] back at LambdaConf 2017, but that was it! And to be fair, Clojure *would* have been largely unfamiliar to me if I were not neck-deep in [Racket][racket] for [other reasons][plai]!

[prolog]: https://www.swi-prolog.org
[mercury]: https://mercurylang.org
[racket]: https://racket-lang.org
[plai]: https://www.plai.org

Even with that caveat, this is definitely a book I think every working software engineer should work through when 3–5 years into a career (unless they happened to have a *particularly* good undergraduate computer science education which exposed them to all of this). Seeing how different languages can offer up different semantics *and* different syntax for similar semantics is a really important part of learning to program well, even if you spend your whole career in mainstream languages.

The choice of languages has definitely aged in uneven ways:

- [Ruby](https://www.ruby-lang.org/en/) (on [Rails](https://rubyonrails.org)) is no longer the language of choice for every hot new startup, but it indelibly stamped the way web development works, and it remains a widely-used and much-loved language. It may have “peaked”—but the history of Python, of much the same vintage and having made significantly greater blunders than Ruby, shows that any such prognostication is apt to go wrong, because language popularity is so [path dependent](https://en.wikipedia.org/wiki/Path_dependence).[^pd]

- [Io](https://iolanguage.org) was niche when Tate wrote about it, and it is niche today, but it also continues to be *interesting*—and maintained! Though it is also “done” in a real way. It is message-passing-and-prototypal-objects all the way down, and made some really good choices syntactically for those semantics, so it *feels* really nice.

- [Prolog][prolog] is probably the “oddest” language in the book in that logic programming as a discipline remains largely untapped, in part because its application to “business problems” is less obvious than other programming paradigms. Unlike Io, it is niche because its entire world is niche, rather than because it did not catch on as a bigger thing.

- [Scala](https://scala-lang.org) was probably at the very peak of its popularity to date as the book came out. Many of the Bay Area tech companies were adopting it as a Java replacement, leaning into its hybrid model which mixed object-oriented and functional idioms.[^less-novel] Unfortunately, the combination of a slow compiler, poor data structure performance in the early days, and the reality that most programmers just ended up using it as Java with a really weird syntax meant that it ended up with a bad reputation in the Valley and receded to a niche space for functional programming enthusiasts who needed or wanted to run on the <abbr title="Java virtual machine">JVM</abbr>. The folks who preferred <abbr title="object oriented">OO</abbr> had a much smaller learning curve and more familiar syntax to just use [Kotlin]

- [Erlang](https://www.erlang.org) itself does not seem to have grown much in popularity as a language, though it definitely had a nice little spike of interest when people realized just how effective it was for pre-acquisition WhatsApp.[^rewrite] However, the [<span class="smcp">BEAM</span>](https://www.erlang.org/blog/a-brief-beam-primer/) <abbr title="virtual machine">VM</abbr> has become and increasingly popular target for *other* languages, starting with Elixir but now including quite a few others. Somewhat bizarrely to  me, despite the boom in microservices in the 2010s, relatively few people seem to have taken a serious look at what Erlang and the <span class="smcp">BEAM</span> bring to the table.

- [Clojure](https://clojure.org) had a bit of a boom at the same time and for a few years after the book came out. Growth seems to have leveled off, in part I suspect because the aforementioned Kotlin took a lot of the energy in the <abbr title="Java virtual machine">JVM</abbr> world, and with a far lower “activation energy” than jumping into a Lisp—even a well-designed one. It has not gone anywhere, but like Ruby seems to have stabilized (and perhaps peaked), at least for now—but as with Ruby, the future is unclear.

- [Haskell](https://www.haskell.org) seems to have made some more inroads over the 2010s, both propelled by and contributing to an uptick in functional programming in general. It has seen production use at Facebook and GitHub and plenty of other. Arguably it continues to have its most significant impact indirectly, though, via its home as the dominant incubator for many ideas in typed programming—and via the contributions of its descendant language [Elm](https://elm-lang.org), which did more to change how programming language developers approach compiler interactions than perhaps any other language in modern history.

It was always unlikely that any of those languages would surge to be completely mainstream, of course. However, many of the new languages which *have* become mainstream in the interval owe a good deal to those mentioned here. Too, these remain worth knowing something about in their own right. This is a good book, still worth a read.



[^pd]: The effect of path dependence on language adoption (or even framework adoption) is something I think about a *lot*. Might be an essay there, eventually.

[^less-novel]: This was less novel than its proponents (…or language designers) claimed; OCaml (then Objective Caml) had been public for half a decade when work on Scala started! And… OCaml does it a *lot* better.

[^rewrite]: My understanding is that Facebook rewrote it entirely at some point after acquisition.
