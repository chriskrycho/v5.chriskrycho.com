Title: Eclipse Indigo, Subversive, and Connectors
Date: 2012-06-08 08:00
Author: chriskrycho
Category: Posts
Tags: bugs, Connectors, Eclipse, Public Service Announcements, Subversive, SVN
Slug: eclipse-indigo-subversive-and-connectors

This is apparently a pretty common issue, so I thought I'd write up the
solution to it. When using the suggested method of installing Subversive
- one of two standard SVN client plugins for Eclipse, the other being
Subclipse - the installation may fail (as it did for me). The Eclipse
error messages for the failure aren't incredibly informative, but I
managed to figure out the issue, so here it is: <!--more-->

At the time of posting, the most up-to-date versions of the Subversive
plugin available for automatic or direct download from the Eclipse
Marketplace site per the instructions on the plugin site are \_not\_ the
most current, and will \_not\_ work with the automatic downloads from
the Polarion source for the SVN connectors.

This is the root of the issue: Eclipse downloads the most up-to-date
version of each from the specified source, and the Connectors repository
has more recent versions than the Subversive repository. Since the
newest Connectors have the latest Subversive build as dependencies,
automatic installation fails. There are two options for a solution:

\# Download most up-to-date versions of both. You can get the most
current Connectors from the Marketplace or Install New Software menus,
or [directly from their site][]. Then download the [Subversive plugin
for Juno][]. Install the latter \_first\_.  
\# Download older version of the connectors after installing the older
version of the plugin either through INS or Market. Just check the date
of release for the plugin and make sure the Connectors release date
matches.

I recommend the first option, as you'll get the most up to date software
(which is particularly useful if you want to integrate with SVN 1.7; I
don't believe the older connectors support it). The installation process
should be pretty straightforward, and you shouldn't actually \_need\_
the manual connector installation once you get the Juno version of
Subversive running; the automatic connector finder will get and install
the new connectors just fine. On the off chance that it doesn't, though,
you'll have the files and you can install them manually.

The process for manual installation is simple: open the "Install New
Software" menu, click to Add a New Source, and choose either Local or
Archive (depending on whether you've extracted the files you downloaded
or not). Once that's selected, you should be able to install the files
just fine - including source if you want, and so forth.

Hopefully this saves someone else the headaches I went through last week
while getting this configured!

\_\_(editorial)Note that in the week since I wrote this draft, the
Connectors have gotten even further out of date. At the time of
publication, the most current set of Connectors publicly available are a
full release newer than the Subversive set. I haven't had a chance to
test that, so I have no idea what if any effect this has on the
dependency issues I highlighted above.\_\_

  [directly from their site]: http://community.polarion.com/projects/subversive/download/eclipse/2.0/builds/Subversive-connectors-2.3.0.I20120520-1700.zip
    "download the files"
  [Subversive plugin for Juno]: http://www.eclipse.org/downloads/download.php?file=/technology/subversive/0.7/builds/Subversive-incubation-0.7.9.I20120520-1700.zip
    "Download the files"
