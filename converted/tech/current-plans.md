Title: Current plans
Date: 2013-05-05 16:40
Author: chriskrycho
Category: Posts
Tags: database, Jinja2, Make, Markdown, PHP, Pyramid, Python, static site generator, WordPress, workflow, writing, XML
Slug: current-plans

Things currently on my near-term radar, web development-wise:

-   Finish up a web site that I'm doing pro bono for a friend. This
    one's been on the back burner since we [moved][], but I'd like to
    actually get it knocked out at the beginning of the summer.
    <!--more-->
-   Get a site build in the [Pyramid][] web framework. Just because I
    can; there's really nothing more to it than simply curiosity; I've
    never built anything in a Python web framework and I want to. I
    doubt the site will be public, as at the moment I don't even have a
    host that would support running it. (I also don't have a site in
    mind to use for it. This really is just a toy project for my own
    interest.)
-   Build my own [static site generator][]. A bit of a crazy idea, to be
    sure, but none of the ones I've looked at quite support all the
    pieces of my personal blogging/site paradigm -- at least, not
    easily, and not in a way that's straightforward to set up and
    maintain continuing with my current blog. There are a few advantages
    to writing my own:
    -   It'll do everything I want to it. Because I'm writing it.
    -   It won't have a lot of extra pieces floating around that I
        *don't* need, because I'm writing it. (Those pieces are
        undoubtedly great for other folks; I just don't need them.)
    -   As with Pyramid, it will increase my own familiarity with
        various Python tools.
        -   Pyramid uses [Mako][] (and Chameleon, but I'm not interested
            in that one at present) templates out of the box. I'll
            probably build whatever I build using [Jinja2][] initially,
            unless I've already fallen completely in love with Mako, in
            which case I'll just stick with that. In any case, my
            familiarity with Python templating languages will have
            increased substantially.
        -   I'll have some experience with pulling and handling the
            content from the WordPress database, probably using some of
            the Python tools for interacting with the database and/or
            XML content. This will be valuable professionally on both
            the WordPress and Python fronts.

    -   It'll simplify my actual *writing* workflow dramatically. (More
        on this below.)
    -   It'll get me out of a dependency on PHP. This is always a good
        plan, because [PHP is the worst][].
    -   It'll get me out of a dependency on WordPress. WordPress is
        great for what it is, but I don't really need the hand-holding
        or a lot of its power, and I get plenty of time with it working
        on other projects, so it's not like I need my own site to keep
        me fresh on it.
    -   These last two points together result in my not actually needing
        PHP or indeed *anything but HTML* supported by my webserver. If
        I decided to host everything locally, I could do that. This also
        minimizes the need for specialized caching setups, etc. -- if I
        ever get [Fireballed][] (probably not by Gruber, but by
        somebody), well, most servers do just fine handing out HTML
        pages; it's the constant regeneration of page content by PHP
        that gets you in trouble and requires you to have caching set up
        on any major WordPress site. This is, from my current standpoint
        at least, an unalloyed good: by and large, if the web server
        isn't on fire, you can probably get to my content.
    -   A non-trivial corollary to that: my site is no longer vulnerable
        to all the [nasty attacks][] on WordPress (and every other
        database-driven, dynamically generated CMS). It's just HTML.

### Workflow improvements

As promised, some comments on how building a static site generator will
improve my workflow. At present, my workflow is something like this:

1.  Create a post in Markdown using Byword. I have folders set up for
    each of my blogs (as well as for other projects) on my hard drive. I
    do this for three reasons.
    1.  I would *hate* to lose all my content because of a server crash.
        I like my [host][], and I make backups, but bad things happen.
    2.  I like the organization it provides, and like having all my
        content available in plain text.
    3.  I like being able to use [version control][] on my content; all
        my writing is additionally backed up by getting pushed to
        Bitbucket regularly. This post, too.

2.  Export the content -- either after exporting it via Byword's handy
    export HTML functionality, or copying over the Markdown directly.
3.  Switch over to Chrome and log in to the WordPress administration
    page for whichever blog I'm posting to, and paste the content in.
    Depending on whether I exported HTML or just kept the Markdown, I
    need to enable or disable Markdown processing for that post. (I try
    to be consistent, so now that I have the [Markdown on Save
    plugin][], I just copy over the Markdown.)
4.  Publish the post.

This isn't particularly onerous. Where it gets much worse is when I have
to edit anything, because if I want to keep my local copy in sync with
the version actually live on the web, I have to make sure I copy over
any changes I made. Before I had the Markdown on Save plugin installed,
this was especially painful: the changes had to come back over
*manually*: no copy-paste for me. It's a bit better now, but still
obnoxious.

By contrast, my new workflow (once I finish the generator) will look
something like this:

1.  Write the content in its own specific folder on my hard drive (just
    like I do now).
2.  Run a single command line script that will generate the finished
    file and push it to the web server.

That's it. All done. Moreover, if I want to edit the content, I just
change it in place and rerun the command line call. This reduces pain
points all along the way for me. It makes it easy -- trivial, even -- to
write, edit and publish my content anywhere that I have internet access,
even really *terrible* internet access. It matches my actual writing
workflow much better. It even makes it trivial to make sure the version
controlled content matches what's on the internet! (Yes, a nerdy concern
if ever there was one.)

So that'll be a fun summer project, and when I'm done, there'll be a
public repository up on Bitbucket that people will be free to clone and
fork as they desire. (As an acquaintance noted, that probably won't
happen much if at all: people are [opinionated][] about these sorts of
things. Case in point: here I am writing one of my own, despite the fact
that others exist.) So here's to the summer!

  [moved]: /family/from-north-carolina
  [Pyramid]: http://www.pylonsproject.org/
  [static site generator]: https://github.com/skx/static-site-generators#static-site-generators
  [Mako]: http://www.makotemplates.org/
  [Jinja2]: http://jinja.pocoo.org/
  [PHP is the worst]: http://me.veekun.com/blog/2012/04/09/php-a-fractal-of-bad-design/
  [Fireballed]: http://fireballed.org/
  [nasty attacks]: http://www.webmonkey.com/2013/04/massive-wordpress-attack-targets-weak-admin-passwords/
  [host]: http://www.stablehost.com/
  [version control]: http://mercurial.selenic.com/
    "Mercurial, of course!"
  [Markdown on Save plugin]: http://wordpress.org/extend/plugins/markdown-on-save/
  [opinionated]: https://alpha.app.net/fifthposition/post/5165233
