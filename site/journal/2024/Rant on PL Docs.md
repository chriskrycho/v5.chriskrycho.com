---
title: "Programming Language Learning: A Rant"
subtitle: >
    Or, what makes programming language learning materials so hard to do really well.

summary: >
    What makes programming language learning materials so hard to do really well, the state of the art, and where we should go from here.

date: 2024-10-10T12:05:00-0600

tags:
    - programming languages
    - learning
    - teaching
    - writing
    - Rust

image: https://cdn.chriskrycho.com/images/unison.png

---

One of the hardest challenges for providing great documentation and learning for a programming language is that it needs to do many different kinds of learning materials—language fundamentals, idioms, concepts, etc.—for many different audiences… and the challenge is fractal.

That is: you have that challenge for every part of the language itself, and again for the ecosystem at large. Example from Rust: teaching ownership, the stack and the heap, Cargo, and testing all need *wildly* different things for programmers coming from C vs. JavaScript.

And writing a good set of materials for *any one* of those audiences is hard! Moreover, you could often write a good book on many distinct subsets of the language. Async in Rust, for example: we have *and need* both my new chapter in [<cite>The Rust Programming Language</cite>][trpl], but also the dedicated [<cite>Asynchronous Programming in Rust</cite>][ab] book.

[trpl]: https://doc.rust-lang.org/book/
[ab]: https://rust-lang.github.io/async-book/

Now consider that folks coming from C or C++ would be best served learning-wise by very different materials on async programming than someone coming from <abbr title="JavaScript">JS</abbr> (Promises), Python (AsyncIO), or C♯ (the original async/await approach). And repeat that for the whole language.

You also need different kinds of teaching materials—introductions, cookbooks, tutorials, references, etc.—the [Divio][divio]/[Diátaxis][diataxis] 4-doc model, as well as all the bits that doesn’t hit, e.g. Hillel Wayne’s [notes][hw] on the gaps in that system.

[divio]: https://docs.divio.com/documentation-system/
[diataxis]: https://diataxis.fr
[hw]: https://www.hillelwayne.com/post/problems-with-the-4doc-model/

Not all of those needs quite as much tailoring for different audiences, but you do want/need (preferably easy) ways to tackle each for not only the language and its standard library, but also the surrounding library ecosystem. Rust and Elixir do better than average, but as far as I can tell, *no* language has a great story for doing this end to end. In Rust, for example, imagine if authoring “books” w/tutorial materials didn’t involve [hacks with rustdoc][clap], spinning up a domain for trying to incorporate [mdBook][mdbook], or building [a custom website][tokio]. 🤯

[clap]: https://docs.rs/clap/4.5.20/clap/_derive/_tutorial/chapter_0/index.html
[mdbook]: https://crates.io/crates/mdbook
[tokio]: https://tokio.rs/tokio/tutorial

(The best thing out there infra-wise is probably Swift, but where Apple *has* built the infrastructure, they haven’t done a great job of *using* it. They have improved a little since [I ranted about it][apple-docs] a few years ago, but they still have a long, long way to go. Whoops.)

[apple-docs]: https://v4.chriskrycho.com/2019/apple-your-developer-documentation-is-garbage.html

Building this stuff is not glamorous, but it makes a big difference in using and learning a language. I remember how revolutionary https://en.cppreference.com/w/ felt, and likewise then https://www.mkdocs.org when it came along. docs.rs and hex.pm were and are a really big step change, too! (I miss them in <abbr title="JavaScript">JS</abbr>/<abbr title="TypeScript">TS</abbr>!)

These days, I see [Unison][unison] pushing things [forward][ud] a fair bit, but that’s the main one. Consider this a call for other programming language ecosystems—new or established!—to keep iterating in this space, to see just how far we can push things quality-wise and accessibility-wise.

[unison]: https://www.unison-lang.org
[ud]: https://share.unison-lang.org

We aren’t going to solve *all* of those problems; some of it is just scarce time and energy, and that requires more systemic and structural changes. But we *can* make it easier along the way.

(Now, to figure out how to get “make Rust docs better along these axes” funded!)
