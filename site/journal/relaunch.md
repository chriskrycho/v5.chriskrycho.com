---
title: A sympolymathesy
subtitle: Relaunching chriskrycho.com for 2020 and beyond!
date: 2019-11-16 20:00:00

---

Welcome to the fifth version of this website! Long-time readers will no doubt notice that it newly has a *title*, as well as a fresh look—albeit one closely connected in many ways to the previous design. Nerds who follow the link to the source of this blog post may notice  What follows are some comments on each of the above!

1. [New Site Title](#1-new-site-title)
2. [New Site Design](#2-new-site-design)
3. [New Site Tech](#3-new-site-tech)

## 1. New Site Title

For a long time, I did not actually plan to *have* a site title other than “Chris Krycho.” That’s how the previous version of the site was titled, and it worked just fine. However, a few things pushed me to go ahead and add a title to this version.

First, I just kind of *like* sites which have titles. There’s a delightful bit of whimsy to it, and it communicates something interesting about the author. When you come to a website whose title is nothing other than a person’s name, you learn that… you are at the website of a particular person. When you come to a website titled [Irrational Exuberance], or [one][reda] with sections titled “Unredacted” and “Wide Gamut”—well, then you *do* learn something about the author.

Second, a long time ago, on [a previous version of this site][v3], I split the various interests which make up the site into sub-sites with their own titles. The main page was <i>Chris Krycho</i>, but below that lived <i>Designgineering</i>, <i>Ardent Fidelity</i>, <i>Ars Artis</i>, and <i>From the Hearth</i>. I liked the character that added to the site (and I quite enjoyed the art direction I added to give each of those sections its own character), but I ultimately found that there was too much overlap. I could not separate my thoughts on technology from those on art, nor those on art from those on my faith, nor those on my faith from its applications to my work in technology. Accordingly, I pulled those back together when I relaunched the site in 2014. But I miss the interesting titles! So here we are, with an interesting title for the *whole* site!

So about that title!

[v3]: https://v3.chriskrycho.com
[Irrational Exuberance]: https://lethain.com/about/
[reda]: https://redalemeden.com

“Sympolymathesy” is the nerdiest (and therefore most perfect) title imaginable for my site: a Greek-derived neologism extending [someone *else’s* nerdy Greek-derived neologism][symmathesy]. Its three parts are _sym_, together; _poly_, many; _mathesy_, learning.

[symmathesy]: https://norabateson.wordpress.com/2015/11/03/symmathesy-a-word-in-progress

First of all, I am learning in public, so hopefully you who read and I who write are learning together. Even more so when you [send me an email][email] or trigger a [Webmention] and, by adding your voice to mine, turn my offerings on this site into a conversation.

Second, as I noted [a few years ago][z1], this site has served and will continue to serve as something of a public [Zettelkasten][z2]. A Zettelkasten, as a system of notes that grows organically and helps you derive new connections between ideas over time, is *itself* a sympolymathesy.

Finally, a clarification: “polymath” has the connotations of brilliance about it. I’m not particularly interested in claiming that for myself (the arrogance!). To the contrary, in fact. For one thing _sym_ is the more essential of theese modifiers. For another, I have chosen _-polymathy_, not _polymath_, because this site is for me a way of learning about many things. In no way does it represent the state of being one *already* learned about many things.

[email]: mailto:hello@chriskrycho.com
[Webmention]: TODO
[z1]: https://v4.chriskrycho.com/2018/blog-as-note-taking-tool.html
[z2]: https://v4.chriskrycho.com/2019/what-is-a-zettelkasten.html

## 2. New Site Design

The previous design of my site lasted me for a solid five years, and I quite liked it. However, I increasingly ran into a issues with it—issues that I have run into with *every* design of my website so far. I have many different interests (as suggested by my site title!) and on every previous iteration of the site I attempted to segment my content by *subject*. But while *some* pieces clearly belonged in one category and not another—a post about some TypeScript code was definitely in *Tech* and not *Theology*—a great many of my posts were *not* so easily bracketed. Under which category should I file an essay on a Christian ethic of tech?

The primary mandate for this redesign, then, was to accomodate that variety. I am now sectioning the site by *medium*, instead of by *subject*:

- General blog posts (of whatever length) go in [Journal](/journal)
- Essays—actual essays!—go in [Essays](/essays)
- Book reviews, quotes, and the like go in [Library](/library)
- Information about my podcasting lives at [Podcasts](/podcasts)
- Photos go under [Photography](/photography)
- Ongoing projects, series, etc. will be displayed under [Projects](/projects)
- I have a dedicated page for speaking, being on other podcasts, etc.: [Appearances](/appearances)

As an orthogonal layer of taxonomy over this, I have *tags*. This means I can still 

Once I had started down the road of designing this new information hierarchy, I took the opportunity to rethink the basic navigation and layout of the site. While I liked a lot about the typography of the previous design, it was showing its age. Although I had made some tweaks along the way, I had beeng working with the same underlying structure and layout since [v3], back in 2012! That design looks good, and I still quite like it. But I like the new look *much* better. It takes many of the same basic elements of typography (including the two main typefaces from [v4])

[v4]: https://v4.chriskrycho.com

## 3. New Site Tech

In the midst of the refresh, I also switched up the ways I'm building and deploying the site.

### Build

The previous version of the site was built on [Pelican]. This version is built on [Eleventy]. Long-time readers will recall that once upon a time, ages ago (that is: in 2016) I set out to build [my own static site generator][lx]. My aspirations for that project, much deferred, ended up substantially delaying my ultimate work to relaunch this site: because my goal all along was to be able to relaunch using my own tool. That dream is not dead. But it is deferred. I have a lot of thoughts about what a tool in this space can and should look like. Eleventy gets a lot right! It also has a few (significant-to-me) frustrations.

I'll cover those more in the future. At this point I'm *satisfied* with Eleventy, and I can make it do the things I need it to. That's more than I've been able to say for Pelican for the last few years! Note that this isn't a criticism of Pelican: it's a perfectly solid tool. The problem is twofold: first, it doesn't *easily* fit certain things I want to do with it; and second, I'm no longer writing Python at all, so hacking on it to make improvements has very little appeal to me. Those are both problems with *me*, though—not Pelican!

As part of this work, I have also invested in some pieces related to the open-source side of Eleventy, which I'll be blogging about more over the coming weeks. Perhaps of particular interest to folks here: I have written TypeScript type definitions for nearly the entire public <abbr title="application programming interface">API</abbr> surface of the project! I also did the work to figure out how to write *all* of an Eleventy configuration in TypeScript. In the meantime, if you're curious, you can just take a look at [the project repo][gh]. Before the end of the year, each post will actually include a direct link to its source on GitHub, along with a "Suggest an edit" link that will allow people to send in corrections for typos and the like.

[Pelican]: https://github.com/getpelican/pelican
[Eleventy]: https://www.11ty.io
[lx]: https://www.github.com/chriskrycho/lightning-rs
[gh]: https://github.com/chriskrycho/v5.chriskrycho.com

### Deploy

That last bit was always possible in principle on the previous version of the site. However, there were two reasons it wasn't really all that practical:

1. It *required* the person submitting the fix to have a GitHub account. This is not the end of the world, but it meant that I never even bothered to set it up: while some of my readers and potential correctors would already have that, it would just be another hoop to jump through for most.

2. The build process did not, and unfortunately *could* not, run on any of the normal static site build and deploy tools (like Netlify).[^custom-pelican-setup] Even if someone *did* submit a correction, I had to pull it down to my machine, rebuild, and push it back up to [GitHub Pages][ghp].

I am now not only deploying the site via Netlify, but also *building* it there. That lets me solve both of these quite handily! <!-- TODO: elaborate -->

[ghp]: https://pages.github.com

[^custom-pelican-setup]: I probably could have wrangled a *normal* Pelican setup into building on Netlify, not just deploying there. Unfortunately, [my setup] was not exactly normal: it required having [pandoc] installed along with a custom fork of a non-core plugin, and running all the site content through *that*.

[my setup]: https://github.com/chriskrycho/v4.chriskrycho.com/blob/master/pelicanconf.py
[pandoc]: https://pandoc.org