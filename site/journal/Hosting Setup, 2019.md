---
title: Hosting Setup, 2019
summary: All the elements of my delivering this site to you!
tags:
- web design
audience: >
    People interested in the slightly nerdy details of how to get a website like this up and running. “Slightly nerdy” because this is *not* the 

---

On seeing the new site launch, my friend [John Shelton](https://sites.google.com/site/iamjohnshelton/home) asked if I had anywhere I’d listed out the whole of my setup for hosting this site. The answer is: I hadn’t, but as of *now* I have!

First up, an overview of the end-to-end stack, then a quick discussion of my costs for the site. (Also, keep your eyes open: I’m working on a post for [Mere Orthodoxy] 

[Mere Orthodoxy]: https://mereorthodoxy.com

* domain name at  [Hover.com][Hover] 
* DNS at  [Cloudflare.com][Cloudflare] 
* Built with  [11ty.io][11ty], content written in [Markdown]
* Fonts from  [Fonts.com](http://fonts.com/)  (purchased and self-hosted) and  [fonts.adobe.com](http://fonts.adobe.com/)  (hosted)
* Content lives on  [GitHub.com][gh]  and deployed via  [Netlify.com][netlify]
* I am using [Forestry.io] as a <abbr title=" content management system ">CMS</abbr> when it’s useful
* I actually draft the content with a(n ever-changing) mix of text editors, currently primarily [1Writer] on iOS and [Byword] and [Caret] on macOS.

I should clarify, before I go any further: this is *not* a stack I would recommend to anyone else who’s not a total nerd, though this same basic *kind* of stack is workable with a much lower degree of effort than I put in. You need to be willing to do a *small* amount of semi-technical work; you *don’t* have to build an entire site from scratch like I did. (I’ll tackle the details of the actual site tech in more detail in another post in the future.) The support for normal CMS interfaces to this kind of setup has grown enormously in the past few years, and it can actually be a really good, very lightweight experience.[^cms]

[Hover]: https://hover.com/
[Cloudflare]: https://cloudflare.com/
[11ty]: https://11ty.io/
[gh]: https://github.com/
[netlify]: https://netlify.com/
[Forestry.io]: https://forestry.io
[1Writer]: http://1writerapp.com/
[Byword]: https://www.bywordapp.com 
[Caret]:  https://caret.io/

### Domain Registrar

At this point I use [Hover] for every one of my domains.[^except-one] I’ve been using them for probably half a decade now, and have had nothing

### <abbr>DNS<abbr>

[^cms]: I’m currently experimenting with [Forestry] and [Netlify <abbr title="content management system">CMS</abbr>]. As I mentioned in my relaunch announcement post, I’m leaning toward Netlify <abbr>CMS</abbr> because it *should* allow me to allow *anyone* to suggest edits to my site—more on that as it develops.

## Costs

My costs are pretty low for this setup. I pay $15/year for the domain. Cloudflare is free for setups like mine. GitHub is free for setups like mine. Netlify is free for setups like mine. (Sensing a theme here?) I paid a few hundred dollars to perpetually license the Sabon fonts (the body text) a few years ago—both for the web and for desktop work. I pay $10/month for Adobe’s Lightroom package, which includes Adobe Fonts—the piece here that stings the most in terms of ongoing costs, but Lightroom is *fabulous*.

[^except-one]: This is technically not true, because I accidentally registered `writings.tools` instead of `writing.tools`, at Name.com. I am not currently *using* that domain, and will let it expire, because, well, accidental plural much? _le sigh_