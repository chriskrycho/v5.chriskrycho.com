Title: You'll pay more tomorrow
Date: 2012-05-07 16:23
Author: chriskrycho
Category: Posts
Tags: best practices, cost, development, maintenance
Slug: youll-pay-more-tomorrow

I've spent a fair bit of time recently working on a project that, all
things considered, really shouldn't be that difficult. A client wanted a
change made to his web application, a change that is simple in concept
and - in theory, at least - should be equally simple in execution.

But it isn't, and it's not because of any hidden complexity in the task
itself. Rather, the problem is that the code base for the web
application is, to put it bluntly and without a hint of hyperbole,
*awful*. I've worked on a fair amount of legacy code on various
projects, in various languages, over the last few years. This one is the
worst.

Individual functions hundreds (perhaps thousands) of lines long. No
comments. No object orientation to speak of. Hackish solutions to
problems all over the place.

But this isn't a complaint post. It's a *request* to the thousands of
people in the world who are tempted to say, "Well, this will work for
now..." Some of you are developers yourselves; others are simply
dabblers. Whoever you are, whatever your context, whatever your project:
there is a problem with "This will work for now," and that problem is
called *tomorrow*. <!--more-->

### To the developers

I don't care if you're developing an internal app for a company or
building the next Facebook. If you think right now is the only time that
matters for your software, you are in for a world of hurt in the future.

The vast majority of time I have spent on the project I mentioned above
has nothing to do with the actual upgrade I am trying to perform.
Rather, it has been spent trying to understand an impossibly complex
function into which this behavior must be inserted, and to test my
(almost always false) guesses about the way in which this piece of
software works. The cost to the client is much higher than it needs to
be, than it would be if this were well-designed, well-organized,
well-commented code.

I don't care if you're writing in Lisp, Fortran, Python, C++, or F\#. I
don't care if you're writing a one-off piece of code to automate some
small task for your company, or building out a complex
model-view-controller interface. I don't care whether your client is a
mom-and-pop corner shop or The Bank of America. If you build something
sloppily, you or whoever comes after you will pay for your laziness.
Your code doesn't have to be perfect, but it has to be comprehensible,
because otherwise even you won't know how it works when you come back to
perform maintenance or make an upgrade in a month or a year.

### To clients

Don't go with cheap and easy hacks. If your software is in bad shape and
you know it - or a developer you trust tells you, or especially if
*multiple* developers you trust tell you - think hard about whether
you're better off trying to fix what you have or to write something from
scratch to replace it. When the problems are big enough, it may cost you
less to start over than to keep maintaining bad code. There is no point
in throwing good money after bad.

And that time may not be when your code isn't working. It may be when
your code works just fine, but is completely incomprehensible to the
people you've hired to maintain or upgrade it. (I'm assuming, of course,
that you've hired competent developers. That's an important assumption,
and you need to be sure it's valid.)

Also: if you don't know what you're doing, have the humility to admit
it. By which I mean: not just verbally. Recognize your limitations and
pay the price - perhaps literally - to make sure things get done right.
If you know just enough to cause trouble, don't cause trouble. Hire
someone who knows what he or she is doing. It may seem convenient to
just do it yourself, but trust me: if you don't know what you're doing,
you will just hurt yourself in the long run with that approach.

I don't mean you shouldn't try to understand the software and learn how
to improve it yourself. Most of what I have learned in the last few
years of software has been self-taught, and a great deal of it has come
from reading other people's code (good and bad). Do that. But if you're
on a tight budget, don't spend it fixing your own mistakes; spend it
getting good product in the first place.

### To everyone

Maintenance and upgrades are often the largest part of budget spent on
software. This is true of almost all projects; rare is the piece of code
that runs perfectly from day one and never needs any new functionality.
Accordingly, it's important to put yourself in a position where
maintenance and upgrades will have low friction and low cost. That means
making sure the code is quality, not a mass of kludges, and it means
making sure that it's well designed and well-commented.

That's hard and costly, of course, but it's unavoidable: maintaining a
product costs money. And you'll pay more for it tomorrow than today.
