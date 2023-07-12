---
title: Je ne sais quoi
subtitle: >
  Programming languages, cameras, computers, and other technologies—and *feel*.

tags:
  - programming languages
  - photography
  - software development
  - Leica
  - Rust
  - TypeScript
  - Elm
  - Unison
  - Postgres

summary: >
  There are tools whose goodness you cannot find words to describe. For me, the list includes: Rust, the Mac (and native Mac apps), Leica, great typefaces, and more. Here, I muse on how I cannot explain.

qualifiers:
  audience: >
    People with an interest in tools and their aesthetics. This post discusses, but does not assume any particular familiarity with, programming languages.
  epistemic: >
    Feeling this one out in real time. But “real time” is a long time at this point.

date: 2023-07-11T20:56:00-0600
updates:
  - at: 2023-04-23T19:45:00-0600
    changes: >
      A first draft.
  - at: 2023-07-02T18:39:00-0600
    changes: >
      Some wording and some links.
  - at: 2023-07-11T20:50:00-0600
    changes: >
      Finished the piece, connecting it to my native Mac apps experiment and adding the bits about Leica, macOS, Postgres, etc.

image: https://images.unsplash.com/photo-1526417429346-b5835066f54e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=yusuf-evli-Q0PjP8pVXV8-unsplash.jpg&w=2400

---

I have been writing a bunch of Rust again over the past couple months, working slowly to implement pieces of what I *hope* will become the next version of this site.[^v5] Every time I sit down and work with Rust in earnest for any length of time—ten minutes or ten hours spread across a weekend—I have the same feeling I did when I first started messing with it all the way back in the summer of 2015: *This is really good.*

It is not that Rust lacks for issues. I have small quibbles and significant complaints. The syntax is not pretty by any stretch. There are still, eight years since 1.0, rough edges in both the language itself and the surrounding ecosystem. And yet: it feels *good* in a way I find difficult to put into words.

Rust is not the only programming language that makes me feel this way. I have much the same experience working in [Elm][elm] and [Unison][unison]. Not so with [TypeScript][ts], even if I find it a surpassingly useful and capable tool. Certainly not so with Java nor C♯ nor C++: languages whose contributions I can appreciate but the experience of writing which infuriates me. Not <abbr>PHP</abbr> nor JavaScript nor Ruby nor Python. Not even a language which at first blush *ought* to feel like Rust and Elm, and which I still very much like, such as F♯. Try as I might, I find it impossible to explain exactly what distinguishes the ones I love from those I simply find usable and useful.

[elm]: https://elm-lang.org
[unison]: https://www.unison-lang.org
[ts]: https://www.typescriptlang.org

There is just something about building a program in Rust which transcends the individual parts of it (good though those individual parts are), or even the mere composition of those parts (generally very wise-composed though their integration is!). It ends up feeling—somehow—elegant and joyful and satisfying.

"Just something about it": We, amusingly and ironically, end up using the French <i>je ne sais quois</i> because it conveys the sense better. “Just something about it” gets part of the way there, but lacks, well… that <i>je ne sais quois</i>. The language switch *itself* does something to convey the idea: it is not that we actually cannot put the idea itself into words (clearly we can), so much as that leaving the words untranslated actually conveys the *feel* of the idea more accurately than the same phrase in one’s native tongue.

I noticed the same like about [Leica][leica] when using a Q2 last Christmas, and when trying out an M11 in the <abbr>NYC</abbr> Leica store last fall: they are very different from Sony or Canon or Nikon. I noticed the same thing about [the difference between PostgreSQL and MySQL][postgres] a decade ago. I noticed it when switching from Windows to macOS—back when it was Mac OS X 10.5 and I adopted it—for reasons unrelated to *feel*, originally: but the feel of it hooked me immediately. I noticed it about type faces in high school, unable to put up with Times New Roman (and offended, precociously, by Comic Sans).

[leica]: https://v5.chriskrycho.com/essays/the-leica-q2/
[postgres]: https://v4.chriskrycho.com/2014/feels-right.html
[native]: https://v5.chriskrycho.com/journal/trying-bbedit-and-nova/

But at the end of the day, none of that translates. I can explain till I am blue in the face [what makes native apps better][native]; if you do not see it, you do not see it. More than that: if you do not *feel* it, you do not feel it. I see it; I feel it.

This is, in a word, *taste*: famously difficult to pin down, and even more famously not to be accounted for. This is that experience for which we even reach for another language to try to convey the feeling: of not being able to put the seeing, the feeling, into words. That <i>je ne sais quois</i>.


[^v5]: It has been about five years since I started working in earnest on the current revision, though working in fits and starts as I did it took me until late 2019 to actually get it to a point I was happy with and launch it. This v6 version is a case where I *hope* to build some technical underpinnings that will last me a decade or more, even if I evolve the design over that time. I expect it to take me another year or two to finish getting it to the point where I can launch it because the underpinnings are—ambitious, to say the least, and the time I have to spend on it is split with other things like family activities, music composition, photography, running, cycling, and so on.