Title: Upgrading Wordpress manually
Date: 2012-02-20 12:31
Author: chriskrycho
Category: Posts
Tags: best practices, development, WordPress, WordPress plugins, WordPress themes
Slug: upgrading-wordpress-manually

I was recently hired to do some back end work on [Church of Christ the
King's website][]. (Note that the site design is not mine.) In this
case, the initial change I needed to make was small - trivial, even.
However, I noticed as I made the change that the site was running
WordPress 2.8.4. Unfortunately, that meant I was going to be upgrading
WordPress manually. <!--more-->

For those of you (read: almost everyone) who doesn't keep track of
WordPress releases, the software is currently at version 3.3.1; version
2.8.4 [was released][] back in August 2009. I suspected - and confirmed
with a little searching - that there is no direct upgrade path from
2.8.4 to 3.3.1. That's not a surprise; 2.8.4 is two and a half years old
and five versions out of date.

There are two available paths for upgrading WordPress. First, you can
automatically upgrade as each new version comes out. This is the easiest
and generally the best practice: many version updates provide both
better security and new functionality. The second option is to do the
upgrade manually. Upgrading WordPress manually is not hard, *per se*,
just potentially headache-inducing if you don't do it carefully. In some
cases, upgrading manually is the only option - as in this case, where
the install was years out of date and the automatic upgrade path was no
longer available within the application.

### Potential pitfalls

There are a number of things that can (and will) go wrong in *any*
upgrade:

-   Your theme may break.
-   Some plugins may break.

When performing a manual upgrade, however, things can get even more
interesting:

-   You can lose data if you don't export a backup carefully ahead of
    time.
-   You will *lose* all plugins and associated data.

In this particular upgrade, I took care of some the sorts of problems
that arise in an ordinary upgrade by creating a version of the site on
my local test server and checking the theme. I noticed that the plugins
had gone missing, but I mentally attributed this to being on a local
install and moved on. My assessment was accurate, but ignored the fact
that the conditions after upgrading the live site would be the same.
WordPress keeps plugins around when automatically upgrading, but when
upgrading manually, all plugins get deleted. Even if you include the
plugins in WordPress' plugins directory when uploading the application
files, the settings will be lost.

Thankfully, recovering the functionality of the website was fairly
simple. The site was only using a few plugins, and I ended up replacing
the old ones with slightly or dramatically better options.

### Upgrading the hard way

Note that the safest way to perform manual upgrades is still
incrementally, stepping from major release to major release. However,
seeing as there were *five* major releases to go through (2.8.4 → 2.9 →
3.00 → 3.1 → 3.2 → 3.3), I decided to take a look at the theme. Since
there were no major problems with the theme in relation to WordPress
3.3, it made sense to jump all the way at once.

There were other benefits to this approach, as well: for reasons beyond
me, there were over 50 different themes and quite a few plugins
installed, almost none of which were being used. The database was
undoubtedly very messy and the site structure was a mess. Upgrading
WordPress by doing a clean install eliminated all of that.

In general, I'd prefer *not* to do full removal and installations again.
Upgrading this way is a last-ditch approach, though it was necessary in
this case. It's much less of a hassle to follow the standard upgrade
path, and whenever possible users should keep upgrading. That means that
it's incumbent on theme and plugin authors to keep their themes up to
date. It may also require replacing plugins, changing designs, or paying
for maintenance to keep the site working correctly over time.

### Lessons for everyone (but especially professionals)

Regardless, whenever possible, users should keep their installations up
to date. That will make for better security and lower costs in the long
run. For many clients, however, this will not be intuitive, especially
in the world of bold prompts and automatic updates they are used to in
their operating systems.

It also might behoove all online application developers to make their
upgrade prompts a little more noticeable and a great deal more
informative, WordPress included. In any case, the onus is on designers
and developers to communicate with their clients, many of whom are
non-technical, the benefits of keeping the software up to date and the
potential costs of not upgrading it.

  [Church of Christ the King's website]: http://www.christthekingfortworth.org/
    "Church of Christ the King (Fort Worth)"
  [was released]: http://wordpress.org/news/2009/08/2-8-4-security-release/
    "2.8.4 Security Release blog post"
