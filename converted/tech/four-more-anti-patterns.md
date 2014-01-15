Title: Four more anti-patterns
Date: 2013-02-18 09:00
Author: chriskrycho
Category: Posts
Tags: C, development, programming, worst practices
Slug: four-more-anti-patterns

Another set of absolutely lovely gems we found this week: an empty
`for`, the almost-impossible `if`, `continue` just because, and source
that doesn't match the executable. Oh my!

### The empty `for`

I'd seen this before, but we found it again while trying to diagnose an
(unrelated) infinite loop bug in our source (more on that
below):<!--more-->

~~~~ {lang="c"}
for (;;) {
   // lots of things
   if (someCondition) {
      break;
   }
}
~~~~

Not sure why a `while` loop wouldn't have sufficed... Wait, it
*does*---that's what I replaced it with! My solution looked roughly like
this:

~~~~ {lang="c"}
bool doneSearching = false;
while (!doneSearching) {
   // lots of things
   if (someCondition) {
      doneSearching = true;
   }
}
~~~~

Of course, as usual, that's a good deal less obscure and contrived than
the original. (The first time I saw the original, my eyes about bugged
out. It's not something I'd ever considered doing, especially since
there is no reason to *ever* do it that way.)

### The almost-impossible `if`

In the same section of code, we discovered this fun guy:

~~~~ {lang="c"}
if (h < 0.1 * h)
   h *= 0.1
~~~~

I have no idea what that is supposed to accomplish; the only time it
would ever work is if `h` is negative---and you couldn't pick a less
clear way to pull that off without some serious effort. But since we
have no idea what the code is trying to do---there are no comments, and
it's implementing an undocumented and unremembered algorithm---we've
left it as is.

### Say `continue` just because

Another module in the same program has the following program flow:

~~~~ {lang="c"}
int i;
for (i = 0; i < someNum; i++) {
   // bunches of things
   if (someCondition) {
      // a few things
      continue;
   } else {
      // a few other things
   }
}
~~~~

That's it. For some reason, the previous developer decided he needed to
make sure the `for` loop continued executing immediately after the `if`
statement finished. Of course, it does that anyway. Perhaps it was left
after other code that used to follow the conditional block was
(re)moved; who knows? In any case, it made for an amusing example.

### Working executable, broken source

The single most frustrating "anti-pattern" we ran into this week was
finding two separate executables that clearly work differently than our
current source does. This probably sounds crazy, and it may not even
make sense, so allow me to elaborate.

In the first case we found, there is a version of the program used in
house that works basically as expected. As with any piece of production
software, it has some bugs, but for the most part it runs normally and
gives the desired results. When we built it again this week in
preparation for making some changes, we discovered to our horror that it
gets caught in an infinite loop. Given that the version used internally
works as expected, this was a shock, to say the least. Apparently, at
some point someone started changing the program but never finished.
Fixing it will be... fun.

The second example is a launcher program that spools off a set of other
related executables in order to accomplish various tasks. Beyond the
first-order frustration that it can only be build in [Visual Studio
6.0][] (from *June 1998*, and yes that is almost 15 years ago), the list
of programs to spool off is out of date and inaccurate. We don't know
how this came to be, either.

In both cases, we'll get past it; we have the know-how, and while it
might be painful, we can gather enough information to fix things. But it
hammers home again the value of writing code carefully and maintainably.

Or, as a friend of mine put it recently:

> Always code as if the person who ends up maintaining your code is a
> violent psychopath who knows where you live.

  [Visual Studio 6.0]: http://en.wikipedia.org/wiki/Microsoft_Visual_Studio#Visual_Studio_6.0_.281998.29
