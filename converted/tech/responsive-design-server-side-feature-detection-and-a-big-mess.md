Title: Responsive Design, Server-Side Feature Detection, and a Big Mess
Date: 2012-02-23 08:00
Author: chriskrycho
Category: Posts
Tags: best practices, development, responsive design, standards, web applications, web design
Slug: responsive-design-server-side-feature-detection-and-a-big-mess

A couple days ago, Jason Gigsby ([@grigs][]) highlighted [this post][]
by Dave Olsen on responsive design from the server-side. The biggest
thing that caught my attention was his focus on user-agent detection for
altering the delivery of content.

There is some sensible stuff in there; it's worth your time. In
particular, I can see the value in delivering different kinds of
resources to different targets, especially in the case of video or
images, where resolution and bandwidth may be constrained.
<!--more-->That's a big part of what is driving the [responsive
`<picture>` discussion][], in fact. But a heavy emphasis or long-term
reliance on user-agent detection rubs me the wrong way.

Front end designers and developers have in the last few years finally
stopped relying on user-agent detection to make their sites behave in
particular ways. That's a *good* thing; user-agent detection is often
unreliable and finicky; it's certainly in a constant state of flux.
That's only going to be more true as more mobile browsers allow users to
set their user agent, and as browsers for mobile and desktops converge,
*a la* Chrome for Android.

There may be times when user-agent detection is an appropriate strategy
on the back end - I'm not sure what they might be, but I'm willing to
allow that there are situations in which it may make sense. However,
Olsen was explicitly talking about front-end design, albeit from the
perspective of back-end development. When someone starts talking about
serving different content based on user-agent, I can't see that working
out well for users in the long run. Olsen himself may be a good enough
developer to avoid doing stupid things with user-agent detection, but
are all other back end devs equally disciplined? In other words, it may
be just fine for him, but *evangelizing* for the practice may land us
all in a world of trouble down the line. After all, [it's happened
before][].

Then I read through the discussion, and this line in [Ronan Cremin's
comment][] stuck out:

> A great mobile experience needs to be designed for mobile from the
> outset, not a rejiggered version of an existing site. Any mobilization
> solution that utilizes the same basic chunk of HTML delivered to
> desktop and mobile is missing an opportunity.

The first half of that is quite right, of course; a great mobile
experience *does* need to be designed for mobile from the outset, and
rejiggering an existing site will never be optimal. (It is, I should
note, still a good step in the right direction for websites whose
proprietors can't afford an immediate full redesign.) I'm increasingly a
proponent of the "mobile first" paradigm of design: I consider mobile
from the very beginning of my design flow, and it's actually the first
CSS layout I build. Media queries progressively enhance the
functionality of larger screens just as other CSS properties
progressively enhance the functionality of more capable browsers.

The second half of this quote runs right up against the same thing that
was making me uncomfortable in Olsen's article, though. I *never* want
to prevent a user from getting access to certain content simply because
they're on a smaller screen (or an alternate format like a screenreader;
it's too easy to overlook the accessibility concerns inherent in
discussions like this). I *always* want to deliver the same content,
however vast the differences in presentation.

There is no question that data can and often should be displayed
differently to a user based on the size of their screen, their
bandwidth, etc., especially in the case of web *applications* as opposed
to ordinary websites. Reflowing the content, applying alternate styles
more friendly to touch, finding ways to deal with perceived relative
importance as proportions change - these are all good and even necessary
ways of responding to the vast differences between a smartphone, a 15"
notebook and a 27" 1080p monitor. Different contexts may demand
different presentation - but we should always let the user get the same
data.

Returning for a moment to the ongoing discussion of a proposed
`<picture>` element, one of the concerns I raised in a comment that has
since been raised by one of the leaders of the project is guaranteeing
that the user *can* get to the highest resolution of the image, even if
it's not the image originally loaded by the page. If I'm on my phone, I
may want a site to save me bandwidth and time by loading a
lower-resolution image that is appropriate to my screen. But I don't
want this to prevent me from getting to that high-resolution image if I
decide it would make a great wallpaper.

Schemes that rely on user-agent detection, instead of fixed standards,
seem to run a much greater risk of preventing agnostic access to all the
data on the site. For the record, I think that's a bad thing. Again,
there may be ways and places in which user-agent detection is helpful.
Some of the stopgap solutions people are putting in place while browsers
catch up to the needs of responsive design are great examples. But these
should not be understood to be long-term patterns or solutions.

Rather, we should be pushing for better browser capabilities and web
standards to support responsive design. If we need bandwidth data, we
should ask the browsers to provide it. If we need support for a
responsive image element, we should ask the browsers to provide it. The
beauty of web standards is that if you think of something beneficial and
lay out it carefully, you can submit it and see it get traction. Driving
the web towards standards-based approaches works in everyone's favor.

All that said, I'm still a newbie in a lot of ways, so hit me with your
best arguments why I'm wrong. We'll all come out smarter, perhaps me
most of all.

<ins datetime="2012-02-23T14:01:02+00:00">**Edit:** I just finished
reading an article Olsen linked, [RESS: Responsive Design + Server Side
Components][], by Luke Wroblewski. The original emphasis was much more
on web applications and vastly customized templates for design. This
article, with its narrower focus, I like a bit better, but I still have
some significant concerns with some of the ideas he tosses out (like
custom url structures). I can potentially see value in user-agent
detection for templating, but ultimately I still think it's a stopgap
measure.</ins>

<ins datetime="2012-02-23T14:01:02+00:00">In any case, the design
community should invest significantly more time in thinking about how to
handle responsive *templating*, which is what Luke W's article is really
driving at.</ins>

  [@grigs]: https://twitter.com/#!/grigs "@grigs on Twitter"
  [this post]: http://www.dmolsen.com/mobile-in-higher-ed/2012/02/21/ress-and-the-evolution-of-responsive-web-design/
    "RESS, Server-Side Feature-Detection and the Evolution of Responsive Web Design"
  [responsive `<picture>` discussion]: http://www.w3.org/community/respimg/
    "W3 Community: Responsive Images"
  [it's happened before]: http://www.chriskrycho.com/web/posts/death-to-vendor-prefixes/
    "Death to vendor prefixes!"
  [Ronan Cremin's comment]: http://www.dmolsen.com/mobile-in-higher-ed/2012/02/21/ress-and-the-evolution-of-responsive-web-design/#comment-2744
    "Ronan Cremin @xbs"
  [RESS: Responsive Design + Server Side Components]: http://www.lukew.com/ff/entry.asp?1392
    "RESS: Responsive Design + Server Side Components"
