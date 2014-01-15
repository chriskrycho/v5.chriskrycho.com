Title: OS X: A Few Much-Needed Improvements
Date: 2013-06-23 14:03
Author: chriskrycho
Category: Posts
Slug: os-x-a-few-much-needed-improvements

A good friend of mine has been making the transition to Mac from Windows
recently, and the experience has highlighted a couple of things that
Apple really ought to do different and better with OS X:

1.  Turn the Dashboard off by default.
2.  Provide information about app installation and uninstallation.

<!--more-->

### Turn the Dashboard off by default.

Apple hasn't been actively supporting Dashboard widgets for years now.
The feature was launched with OS X 10.4 Tiger, way back in spring 2005.
By the time 10.6 Snow Leopard came around, they were definitely a
back-burner item, and the part of 2011-- the year 10.7 released -- saw
Apple stop accepting Dashboard widget submissions entirely. It's thus
been over two years since new Dashboard widgets were available, and the
download site has been [broken][] off and on. Dashboard widgets are
clearly not a high priority for Apple.

Making it a default part of users' experience -- especially *new* users
-- is just a bad idea. It leads to unnecessary confusion during the
setup process, as users are likely to go looking for widgets only to
find both that there aren't that many really quality ones, and that new
ones are not being submitted. (Most small utilities that would have gone
on the Dashboard at one point have since become menubar items -- a
change which has some positives, but has also left my menubar
increasingly cluttered.) Apple could, and should, leave the
functionality in place for those users who rely on it,^[1][]^ but turn
it off for new users and simply add an option in the Preferences Panel
to enable it.

### Teach people how application installation works.

App installation from non-App Store sources is *not* obvious. Most
installer windows don't have words; some don't even have the standard
arrow-to-Application Folder shortcut. The app will happily launch from
within the `.dmg` file. (What's a `.dmg` file?) To a new OS X user,
especially one coming from Windows, this is possibly the most confusing
area of the OS. Windows users are accustomed to installation
*procedures*, not "drag this wherever you want it and have a nice day."
The simplicity is grand -- it's one of the little details that I love,
and one of the niceties of being on a Unix-based system. It is, however,
not *intuitive*. It may "just work," but it isn't *obvious*.

Likewise, Windows users expect application uninstallation to be
substantially more complicated than it is. For at least 95% of the
applications I've ever used on OS X, uninstallation simply consists of
moving the app to the Trash. Again: this is *enormously* better than
Windows' complicated Add/Remove programs scheme and the accompanying
registry and DLL hells that have plagued Windows since time
immemorial.^[2][]^ The problem isn't the process; it's the fact that
it's not obvious -- a simple explanation would go a long ways.

Unfortunately, neither installation nor uninstallation are covered by
Apple's [transition materials][] as far as I can tell, and in any case
they remain opaque to *many* transitioning users of all stripes. My
fairly tech-savvy-but-not-technical mom was confused by this when
transitioning eight years ago, I was confused when I switched five years
ago, and one of my best friends -- a professional software developer --
required an explanation this weekend. The system is great; the available
information, not so much.

A small tutorial that is available on first setup of a computer would be
enormously helpful in making these transitions. Allow the user to access
it at the completion of the setup process if they wish, and make it
available under Finder's Help menu, preferably as a distinct menu item
(something like 'New user tutorials' would do the trick nicely).

<div class="footnotes">

* * * * *

1.  I realized in the course of writing this article that *I* don't
    really need or use it, and accordingly [disabled][] it
    entirely. [↩][]
2.  Okay, so, just for the last fifteen, twenty and thirty years,
    respectively. Close enough, in computer terms, right? Or, in other
    words, since the heyday of [AOL][], since the launch of [Mosaic][],
    and since a year after the original Apple Macintosh came out. Like I
    said: close enough. [↩][3]

</div>

  [broken]: http://www.macrumors.com/2013/05/31/apples-dashboard-widget-download-site-for-os-x-broken/
  [1]: #fn:1
  [2]: #fn:2
  [transition materials]: http://support.apple.com/kb/HT2514
  [disabled]: https://discussions.apple.com/thread/4255523?start=0&tstart=0
  [↩]: #fnref:1
  [AOL]: http://en.wikipedia.org/wiki/AOL
  [Mosaic]: http://en.wikipedia.org/wiki/Mosaic_%28web_browser%29
  [3]: #fnref:2
