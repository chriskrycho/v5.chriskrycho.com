---
title: Website Setup
subtitle: Explaining how I run this site—everything.
summary: Explaining how I run this site—everything.
date: 2020-02-09T13:10
qualifiers:
    audience: >
        People interested in the nerdy details of how to get a website like this up and running. Here I get into everything from getting a domain and setting up <abbr>DNS</abbr> to the TypeScript and templates and <abbr>CSS</abbr>!
tags:
    - web design
    - blogging

---

On seeing this site relaunch back in November, my friend [John Shelton](https://sites.google.com/site/iamjohnshelton/home) asked if I had anywhere I’d listed out the whole of my setup for hosting this site. The answer is: I hadn’t, but as of *now* I have!

First up, an overview of the end-to-end stack, then a quick discussion of my costs for the site. (Also, keep your eyes open: I’m working on a post for [Mere Orthodoxy] where I walk through why I think this actually *matters*.)

[Mere Orthodoxy]: https://mereorthodoxy.com

* The domain name is registered at [Hover][Hover].
* The DNS runs through [Cloudflare.com][Cloudflare].
* The site is generated with  [11ty][11ty], with—
    * a mix of [Nunjucks], JSON, and TypeScript for the templating
    * a *very* light use of [SCSS] to generate the CSS
    * a bunch of custom filters and plugins, also written in TypeScript
* The fonts are licensed from  [Fonts.com](http://fonts.com/) (purchased and self-hosted) and  [fonts.adobe.com](http://fonts.adobe.com/) (hosted).
* The content—written entirely in [Markdown]—lives in Git repositories which I maintain on copies of on all my machines as well as on [GitHub.com][gh].
* The site is deployed via [Netlify.com][netlify].
* I actually *write* using a(n ever-changing) mix of text editors, currently primarily [1Writer] on iOS and [Byword] and [Caret] on macOS.

I should clarify, before I go any further: this is *not* a stack I would recommend to anyone else who’s not a total nerd, though this same basic *kind* of stack is workable with a much lower degree of effort than I put in. You need to be willing to do a *small* amount of semi-technical work; you *don’t* have to build an entire site from scratch like I did. The support for normal CMS interfaces to this kind of setup has grown enormously in the past few years, and it can actually be a really good, very lightweight experience.[^cms]

[Hover]: https://hover.com/
[Cloudflare]: https://cloudflare.com/
[11ty]: https://11ty.io/
[Markdown]: https://daringfireball.net/projects/markdown/
[Nunjucks]: https://mozilla.github.io/nunjucks/
[SCSS]: https://sass-lang.com
[gh]: https://github.com/chriskrycho/v5.chriskrycho.com
[netlify]: https://netlify.com/
[1Writer]: http://1writerapp.com/
[Byword]: https://www.bywordapp.com 
[Caret]:  https://caret.io/ 

*[DNS]: domain name system
*[JSON]: JavaScript Object Notation
*[SCSS]: Sassy CSS
*[CSS]: Cascading Style Sheets
*[CMS]: content management system

[^cms]: I’ve experimented a bit with both [Forestry] and [Netlify CMS]. I mentioned in my relaunch announcement post that I was leaning toward Netlify CMS because it would in principle allow me to allow *anyone* to suggest edits to my site. That didn’t end up panning out; I explain why below.

[Forestry]: https://forestry.io
[Netlify CMS]: https://www.netlifycms.org

<!-- omit in toc -->
## Outline

- [Costs](#costs)
- [DNS: Cloudflare](#dns-cloudflare)
- [Domain registration](#domain-registration)
- [Site generator](#site-generator)
- [Fonts](#fonts)
- [Hosting](#hosting)
- [Deploying](#deploying)
- [CMS](#cms)
- [Writing](#writing)

## Costs

My costs are pretty low for this setup. I pay $15/year for the domain. Cloudflare is free for setups like mine. GitHub is free for setups like mine. Netlify is free for setups like mine. The code font, [Hack][hack], is *also* free. (Sensing a theme here?)

In terms of things I *do* actually pay for, though: I paid a few hundred dollars to perpetually license [Sabon][sabon] (the body text) a few years ago—both for the web and for desktop work. I get [Cronos][cronos] via my $10/month for Adobe’s Lightroom package, which includes Adobe Fonts. (This is the piece here that stings the most in terms of ongoing costs, but Lightroom is *fabulous*, so I’m just rolling with it at this point.)

[hack]: https://sourcefoundry.org/hack/
[sabon]: https://www.fonts.com/font/linotype/sabon
[cronos]: https://fonts.adobe.com/fonts/cronos

## DNS: Cloudflare

I just switched all of my DNS name servers to [Cloudflare] earlier this year. I had a longstanding goal of having my registration, my name servers, and my actual hosting and deployment in separate places for a few years now. I don’t remember where I first ran into the idea of keeping those separate, but it stuck—forcefully, by dint of experience.

At one point I was managing all three—registration, name servers, and hosting—through an old-school shared hosting provider ([Stablehost], still a pretty solid option in that space!)… and migrating *out* of that provider was incredibly painful. (It’s actually not 100% done! The hard parts are all done now, though, which is a relief.)

After doing a bunch of research back in late June, I migrated all of my DNS to Cloudflare. *All* of it. This took [a fair bit of work][rewrites] but it has made everything else since then *much* easier. Their domain name management control panel is really good—as good as any I’ve used—and in my experience it’s also incredibly *fast* to propagate the information around the web. That latter bit is particularly pleasant and important, as anyone who has ever had to mess with DNS knows!

<aside>

If you’re curious: yes, I *do* have thoughts on Cloudflare’s approach to deciding who to leave on the internet and who to kick off the internet, but I’ll save those for another day.

</aside>

[Stablehost]: https://www.stablehost.com
[rewrites]: https://v4.chriskrycho.com/2019/my-final-round-of-url-rewrites-ever.html

## Domain registration

## Site generator

## Fonts

## Hosting

## Deploying

## CMS

I don’t normally *need* a CMS, but I do like to have the option. Historically, there were not great options in terms of an interface for writing and managing content… unless you wanted a setup more like WordPress or Ghost: a server application with a database, and a server to run it on. I have a preference (admittedly a bit strange) for simple text files to be the “source of truth” for the content on my website.[^pdfs-etc] For the last few years, I got by managing everything just via command line tools and building everything on my home machine.

Two things have changed. First: as I noted above, I now deploy everything via Netlify, and I don’t *need* to build it on my local machine. Second, though, the last few years have seen the advent of some fairly nice CMSes for statically-generated sites like this one! <!-- TODO: keep going! -->

[^pdfs-etc]: I like being able to generate things which *aren’t* web pages from my content sometimes!

## Writing

These days I do my writing in a wild hodgepodge of tools. None of them thrill me, because all of them do *some* things really well… and leave others in a “ugh, not quite there” state. For example, this particular paragraph I’m drafting in [Byword]—my old standby, an app I’ve been using for over half a decade now. It remains a rock-solid, very lightweight and very *fast* editor with just the right level of minimal Markdown support, and I love it for that. If I’m just writing a blog post like this, and I’m on macOS, Byword is still the app I’m most likely to reach for.

However, when I am working on code samples, it leaves a few things to be desired. For that, I turn to [Caret]—a more recent discovery, and one that lacks Byword’s light weight and phenomenal performance, but which is tuned to the writing *programmer*. At this point I’m using the [latest beta][caret-beta] they released… about a year ago. They’ve since [declared][caret-tweet] their intention to build something new and better using some of the same tech that underpins Caret. The *big* downside for Caret is that it’s an [Electron] app, and that means that it just *is* slower and heavier than Byword—inevitably.

Also in the “unfortunately slower than Byword” are two other tools I reach for on both macOS and iOS: [iA Writer] and [Ulysses].

[Byword]: https://www.bywordapp.com
[Caret]: https://caret.io
[caret-beta]: https://github.com/careteditor/releases-beta/releases
[caret-tweet]: https://twitter.com/careteditor/status/1136198029357264896?s=20
[Electron]: https://www.electronjs.org
[iA Writer]: https://ia.net/writer
[Ulysses]: https://ulysses.app
