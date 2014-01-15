Title: Don't Confuse Your Semantics
Date: 2013-01-08 11:03
Author: chriskrycho
Category: Posts
Tags: best practices, links, semantics
Slug: dont-confuse-your-semantics

I was reading an article on [Foreign Policy][], and encountered a lovely
little design decision that I thought I'd highlight as something *not*
to do. Their visual cuing for links sets a different color for the text
(quite normal) and bolds it (not so normal). This latter change, in my
view, breaks the user's expectations on semantics in some really
unfortunate ways.

Here's what I mean: we expect **bold** text to indicate increased
importance, and with a few decades of experience we expect altered color
to indicate a link. The problem here is that both are in play. You can
occasionally get away with breaking the user's expectations, but in this
case the result is that every time there's a link I interpreted the text
as being emphasized. It wasn't; it was just bolded because it was a
link.

The lesson here is simple: keep your semantics clean and distinct. If
you have a reason to override the user's normal expectations, that's
okay, but you should have a *very* good reason for it. The rest of the
time, don't use **bold** when you really mean [link][]. Similarly, you
shouldn't normally use color or underlines for emphasis; those have
established semantic meaning on the web; when you use them to other
purposes it's just confusing.

  [Foreign Policy]: http://www.foreignpolicy.com/
  [link]: 
