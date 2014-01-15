Title: Tools
Date: 2012-02-07 08:46
Author: chriskrycho
Slug: tools

Like any developer, I occasionally run into little corner cases for
which there isn't a good fix, or common problems in need of a common
solution. If I can come up with something that works, I share.

<div class="column left dont-hyphenate">
### Javascript

#### [ligatures-plus.js →][]

I noticed in late 2011 that while there were a few Javascript tools out
there that would substitute ligatures on a web page, none of them could
test whether the fonts being rendered actually supported those
ligatures. [This script][] provides a solution.

### Bookmarklets

#### [Typekitify! →][]

<p>
You want better fonts, and not just on the websites that already care
about better fonts. Typekit makes better fonts happen. This [bookmarklet
generator][] makes Typekit happen anywhere. *Awesome.*

</div>
<div class="column right dont-hyphenate">
### Python

#### [JIRA Commit Acceptance Plugin Tweaks][] →

JIRA's Commit Acceptance Plugin is great, but years out of date - I took
the liberty of [updating the Python script][] used by the
`pre-commit.bat` repository hook. You'll also find some notes on using
the pre-commit hook when you don't have a guarantee that your users have
Python installed.

### Windows Batch Files

#### [Run Executables on a Network Drive →][]

<p>
You may need to run an executable remotely. This isn't particularly
difficult to pull of on Linux or Unix systems, of course. It's much more
involved on Windows, because you can't count on everyone having the
network location mapped. This short batch file [fixes that problem][]
quite handily.

</div>

  [ligatures-plus.js →]: http://www.chriskrycho.com/web/tools/ligatures-plus-js/
  [This script]: http://www.chriskrycho.com/web/projects/ligatures-plus-js/
    "Ligatures-plus.js"
  [Typekitify! →]: http://www.chriskrycho.com/web/tools/typekitify/
  [bookmarklet generator]: http://www.chriskrycho.com/web/projects/typekitify/
    "Typekitify!"
  [JIRA Commit Acceptance Plugin Tweaks]: http://www.chriskrycho.com/web/tools/jira-commit-acceptance-plugin-tweaks/
  [updating the Python script]: http://www.chriskrycho.com/web/tools/jira-commit-acceptance-plugin-tweaks/
    "JIRA Commit Acceptance Plugin Tweaks"
  [Run Executables on a Network Drive →]: http://www.chriskrycho.com/web/tools/run-executable-on-a-network-drive-batch-file/
  [fixes that problem]: http://www.chriskrycho.com/web/tools/run-executable-on-a-network-drive-batch-file/
    "Run Executable on a Network Drive – Batch File"
