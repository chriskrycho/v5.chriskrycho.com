Title: Modular scales: fantastic, but don't overdo it
Date: 2013-06-04 00:15
Author: chriskrycho
Category: Posts
Tags: modular scale, typography
Slug: modular-scales-fantastic-but-dont-overdo-it

I'm a huge fan of the [Modular Scale][] tool Tim Brown put together a
few years ago, and I've used it on a number of projects to help me set
up good vertical and horizontal rhythms on a number of sites I've
designed. As soon as I read Brown's [original article at A List Apart][]
(Off the top of my head, I know I used a scale on [chriskrycho.com][],
[independentclauses.com][], [jaimiekrycho.com][],
[theinvitedbirth.com][], and [step-stool.io][] -- which is to say, every
site I've done a full design on in the last two years. Again: I'm a
fan.)

That said, the modular scale can get away from you pretty easily if
you're not careful. I'm working on a couple different designs at the
moment -- the one for [Step Stool][step-stool.io] and one for the
simple, clean theme I'll be distributing *with* Step Stool for anyone
who cares to download and use it. (Wouldn't that be fun -- to discover
one of my designs on some random blog or site? I can see where WordPress
theme designers get their kicks.) In both cases, the modular scales I've
generated have been pretty robust.^[1][]^ As a result, I ended up with a
rather ridiculous SASS file with the modular scale embedded for both of
them, with tons of sizes that I'll never use.

More importantly, though, most of those sizes I *should* never use. This
struck me tonight as I was looking at the [Typeplate framework][]. One
of the neat little SASS mixins they have defines a limited set of
heading sizes -- just nine sizes total, in fact. By contrast, the
modular scale tool will happily spit out a table with 36 different
values on it. Let's be honest: if I use all 36 of those values, or even
if I don't choose from among them discerningly, my site is going to be
just as much of a mess as if I eyeballed it. (Probably more.)

The trick, then, is to use the *principles* of good typography with the
*tools* available to make good choices about which sizes from the scale
to use. (Limitations are often one of the most powerful tools in any
creative process.) As the folks over at Typecast [put it][]:

> Limiting your typographic scale can improve your typography
> considerably. And rather than arbitrarily plucking type sizes out of
> the air, ratios will ensure your intervals are consistent and your
> scale harmonious.

The modular scale tool gives you the latter bit. Limiting the number of
pieces from the scale, and choosing those elements sensibly? That, you
have to do yourself.

* * * * *

### More reading

-   ["More Meaningful Typography,"][original article at A List Apart]
    Tim Brown, *A List Apart*
-   ["Scale and Rhythm,"][] Iain Lamb -- itself both an essay and a tool
    for demonstrating both scale and rhythm
-   ["Contrast Through Scale,"][put it] Christopher Murphy, *Typecast*

<div class="footnotes">

* * * * *

1.  In case you're curious: [the Step Stool scale][] and the [Clean
    theme scale][]. [↩][]

</div>

  [Modular Scale]: http://modularscale.com/
  [original article at A List Apart]: http://alistapart.com/article/more-meaningful-typography
    "More Meaningful Typography"
  [chriskrycho.com]: http://2012-2013.chriskrycho.com/
  [independentclauses.com]: http://independentclauses.com/
  [jaimiekrycho.com]: http://jaimiekrycho.com/
  [theinvitedbirth.com]: http://theinvitedbirth.com/
  [step-stool.io]: http://step-stool.io/
  [1]: #fn:1
  [Typeplate framework]: http://typeplate.com/
  [put it]: http://typecast.com/blog/contrast-through-scale
  ["Scale and Rhythm,"]: http://lamb.cc/typograph/
  [the Step Stool scale]: http://modularscale.com/scale/?px1=18&px2=128&ra1=1.5&ra2=0
  [Clean theme scale]: http://modularscale.com/scale/?px1=20&px2=28&ra1=1.5&ra2=0
  [↩]: #fnref:1
