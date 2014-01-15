Title: The Great Deglobalization
Date: 2013-08-31 18:06
Author: chriskrycho
Category: Posts
Tags: decorators, global variables, metaprogramming, Python, refactoring
Slug: great-deglobalization

For nearly all of August, I have been helping a colleague work on a
massive code refactoring project. The company I am consulting for relies
on a decades-old (though quite robust) piece of engineering modeling
software. The software was written in FORTRAN77 in the mid-to-late
1980s, as was common for such packages at the time. It is apparent that
it was *not* written by competent software developers, however: the
entire code-base smacks of fastest-way-to-get-it-to-work thinking. All
of the code---all 4,000+ lines of it---came in a single file. Every
variable in the program is global.^[1][]^

Yes, you read that right. *Every variable in the program is global.*

Since no one at the company is an expert in Fortran at this point---even
a modern dialect like Fortran 95^[2][]^---we have been translating the
whole thing to Python in order to start re-working pieces of it. (We're
using Python because that's the company's standard; we're reworking this
piece of code for reasons long and uninteresting.) The formal
translation step was completed in mid-July; since then we have been
working on refactoring the project so that we can actually *change*
things without breaking everything.

The trick, of course, is all those global variables. In order to be able
to begin making any other changes, we have to eliminate the global
state. Otherwise, a change in one module can (and often does) have
unexpected effects elsewhere.

Our strategy has been simple: take things in small steps, albeit often
very *time-consuming* small steps. In each of those steps we have aimed
to make single, incremental change that makes things more explicit and
safer. Often, this has simply meant passing and returning inordinate
numbers of variables back and forth to functions, simply so that the
behavior is explicit (not to say clear). At other times, this has meant
doing *very bad things* that would be intolerable under any other
circumstances, but were less bad than what we had before and allowed us
to step forward toward our ultimate goals. The prime example---and one
of which I'm fairly proud, though I hope never to have to use it
again---is leveraging Python's property decorators to allow us to begin
using struct-like objects for passing around large amounts of data
before all the global state involved in said structs was eliminated.

Basically, we created a stopgap wrapper that made struct access result
in changing global state. That way, functions could receive the struct
and act on it, with the global state invisible to them: from any
function's perspective, it is performing perfectly normal
access/mutation operations on the class fields. Behind the scenes, we
manipulated global state, until we were able to eliminate global
dependencies for that variable entirely, at which point we replaced the
quirky behavior with standard field initialization.

Here is the *awful* pattern my colleague and I used as part of that
transition, followed by some explanation. (Do not attempt at home!)

    class BasicallyAStruct():
        def __init__(self, some_field):
            global some_field_
            some_field_ = some_field

        @property
        def some_field(self):
            return some_field_

        @some_field.setter
        def some_field(self, value):
            global some_field_
            some_field = value

Here's how it works. For starters, we renamed every global variable to
end in an underscore (like `some_field_`) to make it easy to distinguish
between global and local variables. Then, we created a class that is
basically just a struct to hold data. (It can of course be expanded to
be a full-up class with methods later if that makes sense.) In the
constructor, we declare every global variable that the struct needs to
reference, and then assign it the value passed to the constructor. Then
we use Python's property decorators to specify the access and mutation
behavior: instead of storing the value to a class property like normal,
calling the setter or getter^[3][]^ actually returns or sets the value
in the global variable. The result:

    global some_field_  # set to some old value
    my_struct = BasicallyAStruct(some_field_)  # create the struct

    # Set
    my_struct.some_field = new_value  # assign just like normal
    print(some_field_)  # new_value

    # Get
    print(new_value == my_struct.some_field)  # True

Once we get to a point where we've completely eliminated the global
state, we change the class definition to look like a normal class
definition, completely removing the `global` declaration and the
`@property` and `@some_field.setter` decorators:

    class BasicallyAStruct():
        def __init__(self, some_field):
            self.some_field = some_field

From the functions using the struct, nothing has changed; they are
already using standard class property access notation.

It has worked like a charm, and it demonstrates the power of decorators
in a bit of an unusual situation. It is, of course, an *awful* use of
decorators, to the extent that I would call it an abuse in general. If I
ever found this in "final" code I would probably make a horrible noise
in outrage; it's a stupid thing to do. It is, however, *less* stupid
than keeping everything global, and it made for a good intermediate
solution that allowed us to minimize changes at each step along the way
and therefore minimized the potential number of places anything could
break as we refactored.^[4][]^

I'm happy to say that almost all of those global variables are gone, and
the classes are all looking pretty much like normal classes now. And the
calling functions never even noticed.

I'm incredibly happy with how that came out---and I hope never to do
anything like it again.

<div class="footnotes">

* * * * *

1.  Experienced FORTRAN programmers will recognize the pattern: all the
    variables are declared in a common block at the top of every single
    function, except for a couple subroutines. [↩][]
2.  A fun piece of trivia: my first software development project was all
    Fortran 95. Fortran was what the physics professor who helped a
    bunch of students get their projects off the ground knew, so Fortran
    is where I started. A bit strangely, that background has ended up
    being valuable to two of my three employers so far. [↩][5]
3.  Behind the scenes, Python's property access always calls getter and
    setter methods---which is why you can override them as we are here.
    It's a nifty bit of metaprogramming capability the language gives
    you. [↩][6]
4.  This is actually a pretty good example of the principle of
    information hiding put to a non-standard use. [↩][7]

</div>

  [1]: #fn:1
  [2]: #fn:2
  [3]: #fn:3
  [4]: #fn:4
  [↩]: #fnref:1
  [5]: #fnref:2
  [6]: #fnref:3
  [7]: #fnref:4
