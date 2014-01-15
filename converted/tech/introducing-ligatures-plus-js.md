Title: Introducing: Ligatures-plus.js
Date: 2012-02-07 08:39
Author: chriskrycho
Category: Tools
Tags: development, ligatures, typography, web design
Slug: introducing-ligatures-plus-js

A few months ago I ran across Chip Cullen's absolutely fantastic
[ligatures.js][] - a very simple jQuery function that manually replaces
character pairs or triplets with their corresponding unicode ligature.
There was just one problem: to use the function, you had to manually
test each of the characters you wanted to use against the target font.
This is potentially a *lot* of work, especially if you have multiple
custom fonts on your page. <!--more-->

So I built a wrapper that tests each of a user-selected set of ligatures
against the font in a user-specified set of elements!

### Get it & use it

Enabling the script on your site is straightforward. You'll need jQuery
running; you can download it [here][] or use one of several content
delivery networks - [Google][] ([Documentation][]), [Microsoft][]
([Documentation][1]), or [jQuery CDN][] - if you'd prefer not to host it
on your own site.

Once you have jQuery running, include the ligatures-plus.js file. You
can get it here:

-   [Development version][]
-   [Minified version][]
-   [Google Code][] (with SVN [repository][])

#### General usage

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

### How it works

I borrowed heavily from Chengyin Liu's work on [whatfont.js][]. The
script creates a canvas, renders the ligatures in both the
user-specified font and the default system serif/sans-serif font and
compares them. If the system font ligature does *not* match the
user-specified font, the ligature is rendered; otherwise it is ignored.
At the end of the test, the canvas is removed.

### Known issues

#### Flash when text restyles

Because the script is replacing HTML content, there is a flash similar
to the one that occurs when loading a web-font (so you may actually get
two flashes).

#### Changing HTML internals

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

#### Default system fonts

By dint of the way the script works, you will *not* be able to render
ligatures in the system default serif or sans-serif fonts.
Unfortunately, I have yet to figure out a good way around this, because
the system default fonts vary widely - they're different on Windows,
Mac, and Linux. Without doing some sort of additional processing
involving OS sniffing (something I'd prefer to stay far away from), I
have not yet discovered any good way to render ligatures in those fonts
reliably.

#### Internet Explorer

Internet Explorer support is lacking at this point for all versions
before IE9. Unfortunately, it doesn't look like there will ever be a
solution for this one. No older version of IE supports the canvas
element, and the one project that aimed to deliver canvas support
stalled or got stuck on some of the problems, one of the biggest being
rendering fonts in the generated canvas elements. The function degrades
gracefully, however: it simply won't display *any* ligatures, so the
page will look normal to the user.

#### Font families

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

#### Reporting issues

If you find a bug, please let me know by sending me an email:
<a class="email-link web" title="web|@|chriskrycho.com">chriskrycho.com
@ web</a>.

### The future

#### My work

The first thing I want to do is fix this so that whatever tags are
passed to the jQuery object are the tags used to pick ligatures. I may
also add an optional parameter to the function to allow users to specify
which ligatures to test for more easily. Once I have those things done,
I'll think about turning into a full-on jQuery plugin, as well as
potentially creating Wordpress and Blogger plugins for other, less
technically savvy people to use.

At some point, I hope to add create some events that will prevent a
flash from substituting the text, similar to the way [Typekit does][]
for loading webfonts. (As an aside, you can skip this problem if you
*are* using Typekit's events; the code I supplied above shouldn't have
this issue.)

#### Browser updates

Within the next two to three years, I hope to see the need for this
script largely disappear. Firefox 4 and later already have some basic
support to render OpenType font variants including ligatures (using
[`-moz-font-feature-settings`][]). Hopefully Webkit (both Safari and
Chrome), IE, and Opera will all add support in the near future as well,
at which point this tool can be happily retired.

Regardless of how the rendering technology develops, size constraints
will still be an issue. I hoped that over the next few years, font
providers will start enabling finer-grained control over which
characters are included in the set. In my case, the *only* additional
characters I am interested in right now are ligatures... but I get
nearly a full megabyte worth of extra characters beyond that just to get
them. Hopefully Typekit, Google Fonts, FontFont, and other font CDNs
will take note, as will publishers of web font families. Optimally, web
designers and developers should have fine-grained control - right down
to the individual character.

  [ligatures.js]: http://chipcullen.com/ligatures/
  [here]: http://jquery.com/ "jQuery.com"
  [Google]: http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
  [Documentation]: http://code.google.com/apis/ajaxlibs/documentation/index.html#jquery
  [Microsoft]: http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.1.min.js
  [1]: http://www.asp.net/ajaxlibrary/cdn.ashx
  [jQuery CDN]: http://code.jquery.com/jquery-1.7.1.min.js
  [Development version]: http://www.chriskrycho.com/downloads/lig/ligatures-plus.js
  [Minified version]: http://www.chriskrycho.com/downloads/lig/ligatures-plus.min.js
  [Google Code]: http://code.google.com/p/ligatures-plus/
  [repository]: http://code.google.com/p/ligatures-plus/source/checkout
  [have made it easy]: http://blog.typekit.com/2010/11/11/font-events-using-javascript-callbacks/
    "Font events: Using JavaScript callbacks @Typekit blog"
  [whatfont.js]: http://chengyinliu.com/whatfont.html
  [Typekit does]: http://blog.typekit.com/2010/10/29/font-events-controlling-the-fout/
  [`-moz-font-feature-settings`]: https://developer.mozilla.org/en/CSS/-moz-font-feature-settings
