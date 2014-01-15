Title: Good Programming in 3 Simple Rules
Date: 2012-07-03 21:53
Author: chriskrycho
Category: Posts
Tags: best practices, development, DRY, maintenance, object-oriented, programming
Slug: good-programming-in-3-simple-rules

In the last few years, I have seen a little great code, some good code,
a lot of mediocre code, and overwhelming amounts of bad code. (A
shocking amount of my own code from previous years – especially when I
was just starting – goes in the last two categories, alas.) The longer I
have been at it and the more I have read (whether random articles on the
web or the excellent [<cite>Code Complete</cite>][]), the more I have
concluded that good programming is simple. Incredibly hard, but simple.
In fact, it is so simple, that you can sum it up in three short, easy to
remember rules:

1.  Write code for people, not for computers.
2.  Don’t repeat yourself.
3.  Only do one thing at a time.

<!--more-->

If you can remember to practice each of these things, you can write good
code. The problem is that they’re all *hard*. They require discipline,
and the latter two in particular sometimes require careful thought. But
if you get them right, you can write good software in any language, in
any paradigm.

### Write code for people, not for computers

This is the most important of the three rules, and the foundation
underpinning the latter two. Write your code in such a way that people
can understand it. Use meaningful variable names. Don’t use a
complicated program flow where a simple one will do. Break your logic
down into discrete chunks. Don’t “golf” and try to cram as much into a
single line as possible. Use a code style that has some white space in
it, that breathes a little. If your files start getting painfully long
to scroll through, break them apart into separate files. Make it easy on
people and let the computer do the hard bits.

Many programmers try to write for computers. They try to do things in a
way they think will be faster, or that reduces the size of the
application, or any number of other computer goals. Those can be
admirable aims, but they should always be secondary. Your first aim –
always – should be to write code that people can understand.

Your compiler or interpreter will handle quite a variety of styles of
code. It will interpret `n` and `numOfObjects` equally happily. Humans,
on the other hand, will not. And humans will be reading your code for a
long time. This is true even of little tool scripts you write for
yourself. Say you move on and then come back to it in a few years, but
need to tweak it a little; which would you rather read: a well-commented
script with meaningful method and variable names, or one without
comments and with meaningless names?

So write for people. Write for the people who will be maintaining the
code – either your future self, or others. Make it easy to understand
what you’re doing. If you have to do something clever to optimize a
particular piece of code, write clear comments explaining *exactly* what
your optimization does and why so that someone who comes along later
will know what in the world is going on.

And remember that, in most cases, you won’t be able to out-optimize the
compiler or interpreter anyway. A simple reality: compilers and
interpreters are smarter than you. That’s not up for debate; its a
simple fact. They’ve been improved over the course of decades by some
absolutely brilliant thinkers and enormous amounts of hard work. There
are exceptions to this rule, but it remains a rule nonetheless.

Write code for people, not for computers.

### Don’t repeat yourself

I can’t count the number of times I’ve found the same chunk of code
repeated in different places. Just today, I was working through a large
function in legacy code and saw precisely the same pattern in two
different parts of a conditional structure. I double-checked that there
wasn’t anything weird going on, and then I promptly moved it out of the
conditional.

When you repeat the same code in multiple places, you make it harder to
maintain. Without fail, you’ll go back to make a change and miss one or
more of the places you have that code. So instead of repeating yourself,
find a way to put the code in one place and just reuse it. Make a
function, or a class method, that you can just call whenever you need
that functionality. If you call the same set of methods over and over
again in the same way, wrap that pattern up in its own function.

This not only prevents you from making mistakes when you make changes,
it also makes it easier to understand the code. Consider: is it easier,
reading through a program for the first time (or the first time in a
while) to understand a 30-line section deciding how to deallocate a
block of memory, or to just call `clearMapVariableMemory()`? I can tell
you which I’d prefer: the latter, every single time. You can always go
look at the details later, but even then, it’s much easier to understand
when it’s a standalone function.

The same principle can be applied to data as well as functions. If there
is a set of variables you’re acting on frequently, instead of declaring
them over and over again individually, or passing them around to methods
repeatedly, encapsulate them in a class or a type and use that instead.
Then, any changes to those data elements get captured universally – no
need to go refactor in a dozen different places in the code.

Don’t repeat yourself. Your code will be much easier to maintain and
understand.

### Only do one thing at a time

Last but not least, and building on each of the two principles outlined
above: each piece of your code should only do one thing at a time. This
is true at every level: statements, functions and methods, and classes
and objects.

A few years ago, another software developer showed me a buggy piece of
code that had taken him several hours to sort out. He eventually traced
the problem down to compiler-specific behavior on post-increment
operators on pointers in C. (As it turns out, the C standard is
nonspecific about the very unusual corner case he had discovered.) Fresh
off reading [<cite>Code Complete</cite>][], though, I noted that the
real problem wasn’t the murky order of operations. It was that the
statement in question was doing too many things at once.

As I recall, the single line of code in question was part of a ternary
statement that performed multiple steps of pointer arithmetic to compute
the conditional, then multiple other steps of pointer arithmetic
including that pesky post-increment operator depending on the outcome of
that conditional. It was, first and foremost, a case of writing for the
computer instead of another human: there’s no way anyone could know what
the line did by reading it three times, much less once.

More than that, it was a case of trying to do too many things at once.
Had he simply separated out the logic so that the arithmetic leading to
the conditional received its own statement, the conditional check its
own statement, and the results their own statements – rather than
combining them into a single, multi-line operation – the problem never
would have come up in the first place.

Keep it simple. Do one thing at a time. Make each line of code
comprehensible on its own. Make each function something you can describe
in a sentence. Don’t get and change and set data in the same function.
Make each object represent a single entity, even if that entity is a
composition of other entities. This keeps things comprehensible for
people. None of us can hold all of a 2000-line method in our heads, and
we shouldn’t have to, either: there’s never a good reason for a
2000-line method, instead of a series of smaller methods that make up
the various parts of that big method.

To be sure, you can get carried away with this, as with anything. Doing
one thing at a time will mean writing plenty of methods that include
many other methods. The point of each part of the code should be clear,
though. The moment it isn’t, your comprehensibility goes down,
maintainability goes down, and costs go up.

Only do one thing at a time.

### Good programming in practice

Good programming is hard work. I’ve been programming for four years now
– not long, in the grand scheme of things, but long enough to see quite
a few problems, my own not least. In that span, it’s become clear to me
that we make good programming harder by not sticking to these simple
rules. Getting them right is hard enough; it is not always obvious where
to draw the line in a class or method. This is a skill; programmers have
to invest real time and thought to be *good* programmers. But if we
don’t follow these simple, we make all our tasks that much harder.

Write code for people, not for computers.

Don’t repeat yourself.

Only do one thing at a time.

  [<cite>Code Complete</cite>]: http://www.amazon.com/Code-Complete-Practical-Handbook-Construction/dp/0735619670/?tag=designgineering-20
