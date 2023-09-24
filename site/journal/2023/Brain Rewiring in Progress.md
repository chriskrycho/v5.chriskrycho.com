---
title: Brain Rewiring in Progress
subtitle: Learning Racket is making my head hurt in the best way.
date: 2023-09-24T20:50:00-0600
tags:
  - software development
  - programming languages
  - Racket
  - Lisp
qualifiers:
  audience:
    People who like thinking about learning, and who are up for some programming languages talk. Lots of programming languages talk.
summary: >
  I am—finally—learning Racket, as a tool for learning to build programming languages. It is rewiring my brain, in the best way. It feels good.

---

I am slowly, in evenings here and weekends there, working on picking up [Racket][r]: a member of the [Lisp][l] family. I have bounced off of Lisps repeatedly over the past 15 years of writing software; I managed a tiny bit of [Emacs Lisp][el] back when I used Emacs as a “daily driver” editor at my first job but that was it.[^handlebars] I have thought for a few years that I would like to actually learn a language in this family, seeing as it is an integral part of programming language history and that Lisps continue to be incredibly influential in the development of *new* programming language capabilities. And, frankly: too many people I respect enormously use and love (or have used and loved) Lisps for me to dismiss the value of the linguistic tree.[^hype]

However, my best efforts notwithstanding, I have bounced off previous attempts to pick up [Clojure][c] or [Scheme][s]—including trying, a decade ago, to work through [<cite>Structure and Interpretation of Computer Programs</cite>][sicp]: trying *and failing*. I needed a reason to learn the language besides mere interest—something to which I could apply the learnings where I was not already using a *different* language.[^mostly]

[r]: https://racket-lang.org
[l]: https://en.wikipedia.org/wiki/Lisp_(programming_language)
[el]: https://en.wikipedia.org/wiki/Emacs_Lisp
[s]: https://www.scheme.org
[c]: https://clojure.org
[sicp]: https://mitpress.mit.edu/9780262510875/structure-and-interpretation-of-computer-programs/

This time, I am using it as a tool—particularly appropriately, as it turns out—for learning how to build programming languages. This is an itch I have wanted to scratch for many, *many* years now. (I recall tweeting self-deprecatingly about parsers intimidating me back five years ago, before coming to LinkedIn, for example.) I have done many things in the build-a-language-adjacent space, most of all in my contributions to the design of [Glint][g] and [Ember.js’][ember] new component authoring format with `<template>` tags embedded in JavaScript. I have never actually written a parser, though, still less a full compiler.

[g]: https://github.com/typed-ember/glint
[ember]: https://emberjs.com

<aside>

This is one of the downsides of having a “non-traditional” entry to the field: It means that I never took a compilers class.[^os] I feel that lack quite keenly and quite often. I love that software development is open to people who do not have formal education in computer science, and many of the very best software engineers I have worked with have *not* had formal <abbr title="computer science">C.S.</abbr> training. But I also think that can sometimes lead us to devalue the importance of <abbr title="computer science">C.S.</abbr>, and even sometimes devolves into a kind of anti-credentialism that actively hurts the field. I am glad to be afforded the opportunity to succeed despite my lack of formal training and lack of credentials; and I am also aware that my lack of training has left me with significant gaps that I now have to try to fill mid-way through my career, trading progress on those gaps against hobbies or time with my family or friends.

</aside>

I picked up two books to that end: [Jeremy Siek][siek]’s [<cite>Essentials of Compilation: An Incremental Approach in Racket</cite>][eoc] and [Shriram Krishnamurthi][sk]’s [<cite>Programming Languages: Application and Interpretation</cite>][plai], and am sloooowly working through them both. Although the Siek volume is available in both Racket and Python versions, I chose Racket, because I think it is far more interesting for me personally… *and* because I have some Opinions™ about Python at this point and was pretty sure I would be frustrated implementing it that way… and besides, it would not give me the opportunity to rewire my brain the way Racket is.[^python]

[siek]: https://wphomes.soic.indiana.edu/jsiek/
[eoc]: https://mitpress.mit.edu/9780262047760/essentials-of-compilation/
[sk]: https://cs.brown.edu/~sk/
[plai]: https://www.plai.org

*Rewiring my brain*, I say—indeed, I thus title this post—because the feeling of a language where everything is built on the same constructs all the way down is very odd. To be clear: the *feeling* is odd. The language itself is not! (I of all people have no right to complain about an overabundance of parentheses.[^rhombus]) I spent some time in DrRacket a few weeks ago just following the chain of definitions of all the different forms back down to their roots in the Racket kernel, and it was honestly somewhat astonishing to see them all boiled down to those handful of “special forms” that make up the root of the thing. It is one thing to know in principle that nearly every part of the language is built in terms of those core primitives, including conditionals and so on; it is another entirely to see it in practice.

Similarly, this evening I spent some time thinking about how scoping and evaluation works in Racket (led in part by [the “tutors” for <cite><abbr title="Programming Languages: Application and Interpretation">PLAI</abbr></cite>][tutors]), and it was as if I could feel the gears grinding away in my mind, new things slotting into place. (Eager left-to-right, top-to-bottom evaluation + rigorously defined lexical scoping + closures = *Ohhhhhh!* None of this was wholly novel, but some of the consequences which fall out of that combination initially surprised me—and then slotted into that spot labeled “This is obviously correct and everything should work this way” despite the momentary surprise. Indeed: my most-commonly-used language—JavaScript/TypeScript—*does* work the same way way; but the shift in syntax forced me to deal explicitly with it, where it had previously been implicit.) I associate this feeling of grinding of gears and then things slotting into place with *actually learning*, and it is a feeling I have been trained since childhood to love. It feels mentally the same way a hard run or a good workout does bodily. It feels good. It makes me excited to keep working through these books—learning Racket, and learning how to build programming languages, and seeing where that takes me.

[tutors]: https://www.plai.org/#direct-links-to-the-tutor

Here’s to rewiring the brain.



[^handlebars]: And no, despite being very “Lispy”, I do not count all the [Handlebars][h]-based templates I have written over the past 7 years of working with [Ember.js][ember].

[h]: https://handlebarsjs.com

[^hype]: I set aside here the kind of Lisp-hype you might read from Peter Seibel or Paul Graham (though I grant more credence to Seibel than Graham). But this does not mean that (e.g.) Clojure is *not* a better language than Java; I rather think it almost certainly *is*. Why and how that might be, and the impact it does or does not have on developers’ productivity *or* business outcomes, I leave aside entirely here, though I may very well come back to those themes in future posts.

[^mostly]: Mostly, let us be honest: [Rust][r].

[r]: https://www.rust-lang.org

[^os]: or an operating systems class: the other big one I miss on the regular

[^python]: If I were to use that version of the book, I would probably implement with [TypeScript][ts] or [Rust][r] instead. Python is not a terrible language by any stretch, but I have no interest in going back to it.

[ts]: https://www.typescriptlang.org

[^rhombus]: Though, in truth, it is a lot of parentheses, and [Rhombus][rhombus] is particularly attractive for example that reason.

[rhombus]: https://2023.splashcon.org/details/splash-2023-oopsla/52/Rhombus-A-New-Spin-on-Macros-Without-All-the-Parentheses
