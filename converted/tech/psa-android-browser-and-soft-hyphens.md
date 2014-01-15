Title: PSA: Android browser and soft hyphens
Date: 2012-10-10 07:20
Author: chriskrycho
Category: Posts
Tags: Android, CSS3, hyphens, Javascript, mobile, PHP Typography, Public Service Announcements, typography, WordPress, wp-typography
Slug: psa-android-browser-and-soft-hyphens

The default Android browser does *not* love soft hyphens (Unicode:
`U+00AD`, HTML: `&#173;` or `&shy;`). This means, for anyone using the
good old [PHP Typography][] tool or its WordPress plugin equivalent,
[wp-typography][], that you're in trouble if you have mobile viewership
at all. While it's nice to have a sensible hyphenization algorithm at
play - the sort that can prevent widows - it's a bad idea to be running
anything that doesn't support mobile these days. <!--more-->

That's no skin off the backs of the folks who developed it; KINGdesk are
no doubt decent folks and their PHP code hit the streets before the
explosion of mobile that we've seen today - and, more importantly, the
real problem is in the rendering on the Android stock browser.
(Seriously? Doesn't support a standard typographic character, even by
just ignoring it entirely? Boggles. The. Mind.)

More bad news: there is a really solid Javascript implementation that
works nicely. You can get it [here][]. Unfortunately, it too uses soft
hyphens (added after the text has been rendered, instead of before, but
with the same net effect)... so your site still looks terrible on the
stock Android browser if you're running it.

Good news: Chrome for Android should be installed by default on most or
all Android devices in the coming years. My guess is, this just won't be
an issue for the vast majority of smartphones in use in the US by 2015,
seeing the regularity with which people upgrade their phones at this
point.

Even better news: within another couple years, you're not even going to
need even that sort of front end solution, because the CSS3 module
`hyphens` is coming along nicely in terms of browser support. (At the
time of writing, Firefox and Safari Webkit - but not Chrome - implement
it. Safari Webkit seems to include the iOS browser as well.)

Along with full support for `hyphens` should also come better support
for dealing with widows. No, that doesn't get you anywhere with older
browsers (and that really means everything before Firefox 4, IE9, and
Webkit browsers of similar vintage) - but let's be honest: good
typography is best taken as a case of progressive enhancement at the
moment. It's delightful, really delightful, when we can use it, but it's
not the end of the world when older browsers don't get it: that's just
the norm for how text looked on those browsers anyway.

Lesson learned: don't make use of soft hyphens on the web if you have
any mobile user base. Or, in other words (it being late 2012 and all):
*don't use soft hyphens on the web*. Yes, that stinks. But the
Javascript solution works well enough for now if you particularly want
your text to be a bit less ragged, and it's rare that you get major
problems with your typesetting that way.

  [PHP Typography]: http://kingdesk.com/projects/php-typography/
  [wp-typography]: http://wordpress.org/extend/plugins/wp-typography/
  [here]: http://code.google.com/p/hyphenator/
