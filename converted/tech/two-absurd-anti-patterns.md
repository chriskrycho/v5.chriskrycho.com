Title: Two (absurd) anti-patterns
Date: 2013-02-12 09:00
Author: chriskrycho
Category: Posts
Tags: development, DRY, maintenance, programming, worst practices
Slug: two-absurd-anti-patterns

A pair of anti-patterns I’ve run into recently in my software
development work, both of which are absolutely *awful*, though in
completely different (and quite distinct) ways. I thought I'd share *The
Empty If* and *Wash, Rinse, Repeat*, just so the world can share a bit
of my pain. <!--more-->

### The Empty “if”

This is the smaller and more trivial of the two, but I see it
*frequently* in certain parts of the code base I’m working on.

~~~~ {lang="c"}
if (someVar == 0 && someOtherVar == 0) {
    // do nothing
} else {
    someFunction(someVar, someOtherVar);
    // ... lots of other things
}
~~~~

Of course, as anyone who’s spent any time thinking about this can see,
there’s a *much* more elegant solution:

~~~~ {lang="c"}
if (someVar != 0 || someOtherVar != 0) {
    someFunction(someVar, someOtherVar);
    // ... lots of other things
}
~~~~

In fact, you can even go a step further! Without losing a hint of
clarity, you can write it like this:[^1^][]

~~~~ {lang="c"}
if (someVar || someOtherVar) {
    someFunction(someVar, someOtherVar);
    // ... lots of other things
}
~~~~

Why this pattern is so common, I have *no* idea. But common it is.

The takeaway: think about your logic setup so you don’t end up with
empty blocks. Gladly, most compilers these days (and any I’m using!) are
smart enough that those things usually get optimized away. As I’ve [said
before][], program for people, not computers.

### Wash, Rinse, Repeat

I was working on one set of related programs recently, each of which
performs a similar task. Most of the code hasn’t been touched in quite
some time—anywhere from a year to, in a few cases, a decade or more—so
it needed to be rebuilt with our current toolchain. I took the
opportunity to clean up the code a little—no functional changes, but
running an auto-formatter over it to match current code style, and then
cleaning up deprecated code that had been commented out, etc.

As I worked through this set of about a dozen executables, I soon
discovered that they had been constructed as follows:

1.  Find a program that does something similar to what we want to do
    with this program.
2.  Copy the contents of that program over in a new source file
    wholesale.
3.  Make a couple changes so that it reads and writes different files on
    the file system and accounts for some small differences in the
    formatting of those files.
4.  Build.
5.  Release.

Note that, across these dozen or so programs, each of which was
approximately 250–300 lines long when I was done cleaning it up, at
least fully *one half* of the code was duplicated. As a result, there
are roughly 1400 lines of extra code to maintain, that could all be
extracted into a common module—probably in a library—that all of these
other pieces could link against. Indeed, where possible in other parts
of this software package, I’ve made precisely that move.

The takeaway here is fairly simple. *Don’t use copy and paste.* (I’ve
said this [before][said before], too.) If, as a programmer, you find
yourself using copy and paste, you should take a step back and
reevaluate your approach; there is almost certainly a better—as in, more
maintainable, less work for everyone in the medium and certainly in the
long term—way of doing whatever it is you’re doing. Extract common
behavior into common functions. *Don’t repeat yourself.*

* * * * *

<section class="footnotes">
1.  Thanks to [Montana Rowe][] for [flagging][] a silly mistake I'd made
    here. [↩][]

</section>

  [^1^]: #fn1
  [said before]: /web/good-programming-in-3-simple-rules
    "Good Programming in 3 Simple Rules"
  [Montana Rowe]: https://twitter.com/calcnerd256
  [flagging]: https://twitter.com/calcnerd256/status/301343884892594176
  [↩]: #fnref1
