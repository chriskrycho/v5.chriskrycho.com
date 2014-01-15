Title: Ligatures Plus (jQuery)
Date: 2012-02-09 19:56
Author: chriskrycho
Slug: ligatures-plus-js

<div class="toc">
#### Table of Contents ([show][][hide][show])

1.  [Overview][]
2.  [Get the script][]
3.  [Using the script][]
    -   [Basics][]
    -   [Typekit][]

4.  [Known issues][]
    -   [Flash when text restyles][]
    -   [Changing HTML internals][]
    -   [Default system fonts][]
    -   [Internet Explorer][]
    -   [Font faces][]
    -   [Reporting issues][]

5.  [Planned improvements][]
    -   [Proper jQuery style][]
    -   [Plugins][]
    -   [Font events][]

6.  [Background][]

</div>
<div class="content hyphenate">
### ligatures-plus.js {#overview}

Extending the work done by [Chip Cullen][] for his [ligatures.js][] and
relying on some of the code from [whatfont.js][] by [Chengyin Liu][],
this script identifies which of the standard Unicode ligature characters
are available in the displayed font, and activates only those ligatures.

Since not all fonts support all ligatures (in fact, almost no fonts
support all the available ligatures), and CSS3 support for automatic use
of OpenType characters is (at the time of initial release) limited to
Firefox 4+, this allows typography-sensitive designers to implement some
or all of the common ligatures on their site, with the assurance that
the ligatures will continue to display correctly even if fallback fonts
come into play.

This page is kept up to date with the latest version and corresponding
notes.

### Getting the script {#get}

Enabling the script on your site is straightforward. You'll need jQuery
running; you can download it [here][] or use one of several [content
delivery networks][] if you'd prefer not to host it on your own site.

Once you have jQuery running, include the ligatures-plus.js file. You
can get it here:

-   [Development version][]
-   [Minified version][]
-   [Google Code][] (with SVN [repository][])

### Using the script {#use}

#### Basics

Once you have included the file, you'll just need to call the new jQuery
function, presumably after the page has loaded. A typical usage might be
as follows:

~~~~ {lang="javascript"}
$(document).ready() function({
   $().ligatureTest();
});
~~~~

Note that by default, the script checks against *all* available unicode
ligatures. If you want to check against a subset, you can change the
value of `var WHICH_LIGATURES`. Available options are `COMMON` (ff, fi,
fl), `RARE` (fff, ffi, ffl, ij, IJ, st), and `ALL` (all of the above).

You'll also want to set the elements to run against. In the same
section, set `var ELEMENT = '[comma-separated list]'` for the elements
you want to use ligatures on.

#### Typekit

Because the content may be loaded before Typekit or Google Fonts finish
loading the fonts, it's in your best interests to delay running the test
until all your fonts have loaded. Gladly, Typekit and Google [have made
it easy][] to trigger functions on a webfont load event. Just run the
ligature function in the handler for the Typekit font active event (as
well as inactive, if you want), like so:

~~~~ {lang="javascript"}
try {
   Typekit.load({
      active: function() {
         $().ligatureTest();
      },
      inactive: function() { ... }
   });
} catch(e) {}
~~~~

### Known issues

#### Flash when text restyles {#flash}

Because the script is replacing HTML content, there is a flash similar
to the one that occurs when loading a web-font (so you may actually get
two flashes).

#### Changing HTML internals {#internals}

If your selectors are too broad, you can mess up the internals of HTML.
For example, if you run the script to include paragraph content, any
link is subject to revision. For example, if you have a link like
`<a href="#first">link</a>`, the
"f<span style="display:inline-block;width:0;visibility:hidden;"> </span>i"
in first may get converted to "ﬁ" instead. The workaround now is to only
use elements that do not have internal links or other HTML content that
will get broken by the substitutions. Also, you can wrap your anchors
around the tags to which you wish to add ligature support.

Obviously neither of these are optimal; I hope to use some pattern
matching to prevent this issue in the future, but it's a bit tricky
because of some of the limitations in Javascript's regular expression
set. The lack of lookbehinds is particularly vexing in situations like
this; it forces you to use negative lookaheads instead.

#### Default system fonts {#system-fonts}

By dint of the way the script works, you will *not* be able to render
ligatures in the system default serif or sans-serif fonts.
Unfortunately, I have yet to figure out a good way around this, because
the system default fonts vary widely - they're different on Windows,
Mac, and Linux. Without doing some sort of additional processing
involving OS sniffing (something I'd prefer to stay far away from), I
have not yet discovered any good way to render ligatures in those fonts
reliably.

#### Internet Explorer {#IE}

Internet Explorer support is lacking at this point for all versions
before IE9. Unfortunately, there will never be a solution for this one.
No older version of IE supports the canvas element, and the one project
that aimed to deliver canvas support stalled or got stuck on some of the
problems, one of the biggest being rendering fonts in the generated
canvas elements. The function degrades gracefully, however: it simply
won't display *any* ligatures, so the page will look normal to the user.

#### Font faces {#size}

The last potential stumbling block is *size*. The ligatures file itself
is small, but font sets that actually include ligatures are *not*. Many
of the fonts supplied by Typekit include two versions of their character
set - one usually has ligatures and alternate glyphs; the other is the
basic set. The extended set is often five to ten times larger than the
other. The same will be true if you're using @font-face embedding.

For that reason, you'll want to be quite particular about which fonts
and which elements you actually care about. On this site, for example,
I'd love to have *all* the text supported, and I could: the fonts I've
chosen all support ligatures. Unfortunately, if I included the extra
character sets for all the headings and paragraphs, the font files would
be over 2.5Mb, and that's just much too large. I'm probably pushing it
as is with support for just the headings.

#### Reporting issues {#reporting}

If you find a bug, please let me know by sending me an email:
<a class="email-link web" title="web|@|chriskrycho.com">chriskrycho.com
@ web</a>.

### Planned improvements {#improvements}

#### Proper jQuery style {#jquerify}

The first thing I want to do is fix this so that whatever tags are
passed to the jQuery object are the tags used to pick ligatures. I may
also add an optional parameter to the function to allow users to specify
which ligatures to test for more easily. The other high-priority goal is
to regular expressions to prevent the script from dealing with the
internals of html tags.

#### Plugins

Once I have those things done, I'll think about turning into a full-on
jQuery plugin, as well as potentially creating Wordpress and Blogger
plugins for other, less technically savvy people to use.

#### Font events

At some point, I hope to add create some events that will prevent a
flash from substituting the text, similar to the way [Typekit does][]
for loading webfonts. (As an aside, you can skip this problem if you
*are* using Typekit's events; the code I supplied above shouldn't have
this issue.)

### Background

<p>
I borrowed heavily from Chengyin Liu's work on [whatfont.js][]. The
script creates a canvas, renders the ligatures in both the
user-specified font and the default system serif/sans-serif font and
compares them. If the system font ligature does *not* match the
user-specified font, the ligature is rendered; otherwise it is ignored.
At the end of the test, the canvas is removed.

</div>

  [show]: #
  [Overview]: #overview
  [Get the script]: #get
  [Using the script]: #use
  [Basics]: #basics
  [Typekit]: #typekit
  [Known issues]: known-issues
  [Flash when text restyles]: flash
  [Changing HTML internals]: internals
  [Default system fonts]: system-fonts
  [Internet Explorer]: IE
  [Font faces]: size
  [Reporting issues]: reporting
  [Planned improvements]: #improvements
  [Proper jQuery style]: jquerify
  [Plugins]: plugins
  [Font events]: font-events
  [Background]: #background
  [Chip Cullen]: http://chipcullen.com/
  [ligatures.js]: http://chipcullen.com/ligatures/
  [whatfont.js]: http://chengyinliu.com/whatfont.html
  [Chengyin Liu]: http://chengyinliu.com/index.html
  [here]: http://jquery.com/ "jQuery.com"
  [content delivery networks]: http://docs.jquery.com/Downloading_jQuery#CDN_Hosted_jQuery
    "Downloading jQuery - CDN Hosted jQuery"
  [Development version]: http://www.chriskrycho.com/downloads/lig/ligatures-plus.js
  [Minified version]: http://www.chriskrycho.com/downloads/lig/ligatures-plus.min.js
  [Google Code]: http://code.google.com/p/ligatures-plus/
  [repository]: http://code.google.com/p/ligatures-plus/source/checkout
  [have made it easy]: http://blog.typekit.com/2010/11/11/font-events-using-javascript-callbacks/
    "Font events: Using JavaScript callbacks @Typekit blog"
  [Typekit does]: http://blog.typekit.com/2010/10/29/font-events-controlling-the-fout/
