Title: Floating Point Math is Hard (i)
Date: 2013-12-06 20:21
Author: chriskrycho
Category: Posts
Tags: development, floating-point math, order of operations, programming, Python
Slug: floating-point-math-hard

I'm working a piece of legacy software, and in performing a code review
came  
across what appeared to be some extraneous parentheses. I've renamed
the terms  
as generically as possible because my employer would prefer it that
way, but we  
have a calculation that in its original form looks like this, where
every term  
is a floating point value:

    calculated_value = a * (b * (c * d + e * f)) + g

Since multiplication is associative, the outermost set of parentheses
*should*  
be redundant. Thinking that would be the case, a coworker and I rewrote
the  
calculation so:

    calculated_value = a * b * (c * d + e * f) + g

This does *not* always return the same results, though. I have tested
this on  
both 2.7.4 and 3.3.1, and for a certain set of values, these two forms
of the  
calculation definitely return different results. Here is a small,
complete  
program that produces different results between the two forms of the
calculation  
on both 2.7.4 and 3.3.1:

    # test.py
    def with_parens(a, b, c, d, e, f, g):
        return (a * (b * (c * d + e * f)) + g)

    def without_parens(a, b, c, d, e, f, g):
        return (a * b * (c * d + e * f) + g)

    the_values = (1.1523070658790489, 1.7320508075688772, 0.14068856789641426, 0.5950026782638391, 0.028734293347820326, 21.523030539704976, 2.282302370324546)

    result_with = with_parens(*the_values)
    result_without = without_parens(*the_values)
    print((result_with == result_without), result_with, result_without)

The results:

    » python test.py
    (False, 3.68370978406535, 3.6837097840653494)

    » python3 test.py
    False 3.68370978406535 3.6837097840653494

It is fairly obvious that there is a precision difference here. I am
familiar  
with the ways that floating point math can be odd, but I would not
expect the  
loss of associativity to be one of them. And of course, it isn't. It
just took me  
this long in writing up what was originally going to be a post on  
[comp.lang.python][] to see it.

What is actually going on here is that Python respects order of
operations (as  
well it should!), and floating point math is imprecise. In the first
case,  
`a * b * (<everything else>)`, the *first* thing that happens is `a`
is  
multiplied by `b` and the result is then multiplied by everything else.
In the  
second case, `a * (b * <everything else>)`, `b` is multiplied by
everything else  
and the result is multiplied by `a` at the end. Many times, this
doesn't matter,  
but sometimes there is a slight difference in the results because of
the loss of  
precision when performing floating point operations.

Lesson learned (*again*): floating point math is hard, and will trick
you. What  
happens here is *functionally* a loss of the [associative property][]
of  
multiplication. The two calculations are in a pure mathematical sense
equivalent.  
But floating point math is not the same as pure math. Not even close.

  [comp.lang.python]: https://groups.google.com/forum/#!newtopic/comp.lang.python
  [associative property]: http://en.wikipedia.org/wiki/Associative_property
