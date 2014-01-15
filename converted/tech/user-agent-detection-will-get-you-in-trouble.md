Title: User Agent Detection Will Get You In Trouble
Date: 2012-05-11 11:23
Author: chriskrycho
Category: Posts
Tags: best practices, graceful degradation, progressive enhancement, responsive design, web applications, web design
Slug: user-agent-detection-will-get-you-in-trouble

One of the joys of corporate IT policies is seeing how things break when
you're in an unusual configuration on the web. Like, say, running
Firefox behind a corporate proxy that tells every site out there that
you're actually running IE7. This morning, I paused from other tasks to
read an article on a well-known religious commentary website, and saw a
message at the top alerting me that I'm using an out-of-date version of
Internet Explorer (which I would be if I were running IE... but this is
on a relatively up-to-date version of Firefox).

Bad enough that for whatever reason our corporate IT has taken to
spoofing outgoing traffic this way when routing through their proxies.
(One wonders just how much of the reported IE6 or IE7 traffic on the web
comes from this sort of thing.) But the real problem is that the site I
visited was broken. Horribly, horribly broken.

That message - "You're using an outdated version of Internet Explorer" -
told me why. <!--more-->

The site, it seems, is supplying different content to browsers with
different user agents. I didn't get the standard CSS file I should have,
and the site was unusable. As in: almost completely. I managed to get
through the article, but I won't be back there anytime soon.

I've hit on this topic [before][], and while I came out of the ensuing
conversation with a respect for back-end developers who are thinking
through these issues, this right here - a real problem, out in the wild
- highlights my concerns with the approach, even when carefully
administered.

So, a plea for sanity: if you're going to do server-side user-agent
detection, fine. I was persuaded by the the [discussion][] that followed
that post that there really is a time and place for that sort of thing.
But we need to be extremely careful in *where* and *how* we rely on user
agent-detection to make decisions about the content we supply to users.

We should never - not ever! - actively punish a user for having an
out-of-date browser. If you don't want to actively support it, that's
one thing. Don't write IE6- or IE7-specific stylesheets. But for
goodness' sake, don't stop supply the *regular* stylesheet! Don't give
me completely unstyled content just because you think my browser is out
of date. However good user-agent detection gets, it will never be
perfectly reliable, and you do no one any good by penalizing them for
browser decisions that are often beyond their control.

This is one reason responsive layouts are, in my view, far better than
forced redirects to mobile versions of sites based on user agent. (If
you want users to be able to opt out of a responsive reflow, you can
still do that: give them a link that sets a cookie that tells the
browser to load a non-responsive stylesheet and call it a day.) But in
that case, the user still gets the content. Even if I am using IE7, I
still get all the images, some semblance of layout that is actually
readable, and so forth. When you withhold content on the basis of user
agent-detection, you're relying on a guess, however generally reliable,
that could prove to be very wrong.

So think about which elements you ought to be applying those decisions
to. Here's a hint: *stylesheets generally aren't one of them*. (If you
do make a decision to present reduced stylesheets, it should be for
mobile-only, and users should always be able to opt out of it.)
Server-side responsive decisions make sense for things like images or
video, where compression might be sensible, but not for layout or
restricting access to content.

All of that is basically a long way of saying: *please* remember the
importance of graceful degradation when you're making decisions about
responsive web development, *especially* if you're doing anything server
side. (It's also a demonstration of why I vastly prefer a progressive
enhancement approach over a graceful degradation approach, but that's a
post for another day.) And never, ever, actively penalize your users for
their choice in browser.

  [before]: http://www.chriskrycho.com/web/posts/responsive-design-server-side-feature-detection-and-a-big-mess/
    "Responsive Design, Server-Side Feature Detection, and a Big Mess"
  [discussion]: http://www.chriskrycho.com/web/posts/responsive-design-server-side-feature-detection-and-a-big-mess/#comments
    "comment thread"
