Title: Four Theses on Responsive Design
Date: 2012-10-08 08:00
Author: chriskrycho
Category: Posts
Tags: ad placement, best practices, design, layout, responsive design
Slug: four-theses-on-responsive-design

A friend and fellow web designer and developer (indeed, someone who gets
to do a lot more front-end design) recently asked me,

> Chris—what do you think of "responsive" layouts? I'm not a big fan. In
> theory, it's a good idea. But it makes it difficult for ad placement,
> and in practice, I don't know that anyone really needs five different
> "views" for a site based on browser width/height.

So, some thoughts from a guy who's done a lot of reading, a lot of
watching, and - alas - a lot less actual implementation than he'd like
in the last year. (In other words: take these words with a grain of
salt; they're observations on watching others in the process as much as
they are born of my own experience.)

I think responsive design is a great idea, but it has to be done
carefully and thoughtfully, especially when considering ad placement.
<!--more-->The thoughtless implementations that prevail in a lot of
bandwagon-riders' sites are *not* good patterns: they don't tend to work
particularly well, they're a lot of extra work, and thus the
cost-benefit analysis doesn't come out in their favor. A really good
responsive design, on the other hand, is really delightful to use, and
it actually shouldn't be much more work—though it does require modifying
the workflow; see point 3 below.

Another way of putting this: good design is good design (whether
responsive or not), and bad design is bad design (whether responsive or
not). There are lots of good designers not yet doing responsive design -
though I suspect they will be soon - and lots of bad designers doing
responsive design (to everyone's chagrin).

Now, four theses born from my own experience (see [the rest of this
site][] for an implementation that I think works well, but not as well
as it could - also [The Invited Birth][] and [Independent Clauses][]):

1.  Responsive is often coupled to fluid; this isn't necessarily the
    best choice. Fixed widths with various breakpoints can work a lot
    better—especially for ad-positioning! Most responsive sites I've
    seen in the last year are also fluid (my own included), but I've
    seen a couple that are coming at things a bit more sensibly and
    choosing fixed widths but with *different* fixed widths at the
    various `@media` breaks. For a site like the one my friend just put
    up, that would make much, much more sense.
2.  Choosing your breakpoints sensibly is pretty much everything. Me,
    I'd probably pick one at around `520px` (do it [in `ems`][]! use a
    [scale][]!), and then potentially another at about `800px` (give or
    take a little on each). You then have three layouts, rather than
    five. I actually have four on this site, because I like letting the
    font size bump up again for much larger/higher-res screens; it just
    makes for a more pleasant reading experience. You can easily get
    away with just two (see the [Dallas Theological Seminary site][] for
    a really great example of this approach): one for particularly small
    screens, one for everything else—essentially, a phone layout and an
    everything else layout, since tablets can handle regular desktop
    sites just fine. Were I doing design for a client like the one my
    friend just finished - whose site inspired this conversation - I
    think I'd take the same approach [John Dyer][] did with the DTS
    site: a single breakpoint is pretty much perfect.
3.  Especially when thinking about ads, it really helps to think about
    responsive reflow right at stage 1 of the design process. It's much,
    much harder to add on at the end once the design is already done.
    When it's there in the beginning, you can think about the way blocks
    of content relate to each other and how they should be placed at
    each size, and then handle your content structure accordingly (where
    wrapper divs go, etc.). When you do it right up front, you also have
    a chance to discuss with the client how and where to prioritize the
    ad placement at various view sizes. I think we can all agree that
    having ads first in the content flow for a mobile page is
    terrible—but in terms of usability, so is having a full desktop
    site, which is just hard to navigate on a phone.
4.  It's *way* better than the alternative of mobile-specific sites,
    which inevitably drop major parts of the content. I cringe every
    time my phone gets redirected to `m.some-site.com`, because I know
    I'll inevitably want the full version of the site at some point. (I
    often end up using the "request desktop version of site" option in
    Chrome for Android.) Having a responsive layout means you never
    skimp on the content, just display it in a different way that makes
    more sense for the viewport.

    On a closely related note, you don't have to deal with thinking
    about messy canonical URL markers on every page for a mobile site
    that point search robots back to the "real" page. While this isn't
    too bad if you're built your back end carefully, it's one more piece
    of overhead I'm glad not to have to manage.

Some of the best writing I've seen on the subject has come out of the
folks at [Paravel][] - Dave Rupert, who I linked in a previous comment
on retina images, being one of their guys—and there's some great stuff
by [Trent Walton][] (another of their guys), as well.

  [the rest of this site]: http://chriskrycho.com
  [The Invited Birth]: http://www.theinvitedbirth.com
  [Independent Clauses]: http://independentclauses.com
  [in `ems`]: http://www.alistapart.com/articles/howtosizetextincss/
  [scale]: http://www.alistapart.com/articles/more-meaningful-typography/
  [Dallas Theological Seminary site]: http://www.dts.edu
  [John Dyer]: http://johndyer.name
  [Paravel]: http://paravelinc.com/
  [Trent Walton]: http://trentwalton.com
