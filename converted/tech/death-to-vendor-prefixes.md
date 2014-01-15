Title: Death to vendor prefixes!
Date: 2012-02-08 08:00
Author: chriskrycho
Category: Posts
Tags: browsers, CSS, graceful degradation, progressive enhancement, standards, vendor prefixes, web design
Slug: death-to-vendor-prefixes

In the last few years, there has been an explosion of development in the
HTML and CSS specs, much of it driven by browser innovation. As early as
2007, Apple began pushing out vendor-specific prefixes to support CSS
properties not yet in the open specification. Other browser developers
have followed suit, so that there are now each of `-o` (Opera), `-ms`
(IE9+), `-moz` (Mozilla/Gecko rendering engine), and `-webkit` (Safari
and Chrome). <!--more-->

Early on, a number of commentators suggested that this was a bad idea,
that it would lead back down a nightmarish path that web design has been
down once before. In the late 1990s, websites were designed specifically
for Netscape or Internet Explorer. Then, after IE took over and had 95%
market share, it had an implementation that did not honor the ultimate
form of the CSS2 and CSS2.1 specs. The result was another "solution"
that proved to be less than helpful: Quirks Mode.

In both cases, many users chose to design the website to work as
effectively as possible for one specific audience, or relying on quirks
to achieve specific ends. In the case of Quirks Mode specifically, a
feature that was designed to allow graceful degradation ended up being
used in exactly the opposite fashion. The result was that all other
browsers then had to make a choice between the actual standard (in which
case these sites are left in a ghetto) and the *de facto* standard
created by widespread usage of these particular implementations.

Thankfully, aggressive evangelism for conformity with the specs over the
last few years has finally started to put a dent in these practices. And
then `-webkit` happened.

When these vendor-specific prefixes were proposed, the intent was to
allow browsers to implement proposed elements of the new CSS3
specification, or experimental features that might someday become a part
of a spec if they were successful. Historically minded thinkers
suggested - rightly, as it turns out, though I disagreed at the time -
that the result would be people relying on these for basic behavior of
their sites. The responsible designers all protested that the
implementations were explicitly created in a way that would encourage
using them only for [progressive enhancement][] or [graceful
degradation][]. (The age of that second link should make it clear: this
is not a new battle.)

The skeptics just pointed back at Quirks Mode. The good designers
carried the day. Fast forward a few years, and we're now in an era where
people are designing iPhone-specific websites relying heavily on
`-webkit` prefixes. Suddenly, we're back in the world of the late 90s,
wondering what happened to the hard-fought victory of standards and
universal accessibility. The skeptics were right. People are lazy, and
if something works in WebKit, well, they'll use it. Even if that breaks
the open web.

Those same lazy designers and developers are already applying the same
(lack of) principles to responsive design, even further breaking the
web. And this with an approach that was [proposed][] as the very
*definition* of progressive enhancement!

The long and short of it is: people are lazy, people are lazy, people
are lazy. Especially in the web design world. There are hundreds of
thousands of designers and developers out there, and many - perhaps even
a majority - of them don't care about standards. They care about what
works, and what works fastest.

There is hope, though, because the browser vendors recognize the
problem, as do some of the influential voices that have helped fight
this battle before. A few articles that are worth your time:

-   [Reading List: mobile development approaches][] - Bruce Lawson, who
    highlights the developing schism in this area and has a couple of
    helpful links. The two comments before mine on the article are also
    on target.
-   [Did we lose track of the big picture?][] - Thierry Koblentz. This
    is one of those links, and though I'd quibble with how he uses
    "responsive design," he's right that people are misusing and abusing
    the concept in precisely the way he outlines.
-   [CSS Working Group Minutes][] - scroll down to or search for "Vendor
    Prefixes." This is a long read, but well worth your time. The long
    and short of it? Prefixes are going to be deprecated *hard* after
    their necessity is ended, to keep users from relying on them. And
    that's a very, very good thing.

Hopefully, this time we'll learn the lesson. Any tool that can be abused
*will* be abused. The best developers and designers will follow best
practices; that's part of what makes them the best. The challenge is
everyone else. The only way to keep the crowd from breaking the open web
is to make best practices easy and everything else painful and hard,
because most people will always take cheap and easy over right.

A big hat tip on all of this to Mat "Wilto" Marquis ([@wilto][]), whose
[retweet][] got me rolling.

  [progressive enhancement]: http://www.alistapart.com/articles/understandingprogressiveenhancement
    "read about it @A List Apart"
  [graceful degradation]: http://webtips.dan.info/graceful.html
    "read about it @Dan's Web Tips"
  [proposed]: http://www.alistapart.com/articles/responsive-web-design/
    "read about it @A List Apart"
  [Reading List: mobile development approaches]: http://www.brucelawson.co.uk/2012/reading-list-mobile-development-approaches/
  [Did we lose track of the big picture?]: http://www.css-101.org/articles/the_power_of_the_web_is_in_its_universality/strive_to_make_content_accessible_to_all.php
  [CSS Working Group Minutes]: http://lists.w3.org/Archives/Public/www-style/2012Feb/0313.html
  [@wilto]: https://twitter.com/#!/wilto
  [retweet]: https://twitter.com/#!/brucel/status/166892158798934017
