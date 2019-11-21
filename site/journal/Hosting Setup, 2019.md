---
title: Hosting Setup, 2019
summary: All the elements of my delivering this site to you!
date: 2019-11-22T21:00:00
tags:
- web design
- blogging
audience: >
    People interested in the slightly nerdy details of how to get a website like this up and running. “Slightly nerdy” because this is *not* the post where I get into the really crazy details—this is just an overview of things like getting a domain, setting up DNS, etc.… not the TypeScript and templates and <abbr>CSS</abbr>!

---

On seeing the new site launch, my friend [John Shelton](https://sites.google.com/site/iamjohnshelton/home) asked if I had anywhere I’d listed out the whole of my setup for hosting this site. The answer is: I hadn’t, but as of *now* I have!

First up, an overview of the end-to-end stack, then a quick discussion of my costs for the site. (Also, keep your eyes open: I’m working on a post for [Mere Orthodoxy] 

[Mere Orthodoxy]: https://mereorthodoxy.com

* domain name at  [Hover.com][Hover] 
* <abbr title="domain name system">DNS</abbr> at  [Cloudflare.com][Cloudflare] 
* Built with  [11ty.io][11ty], content written in [Markdown]
* Fonts from  [Fonts.com](http://fonts.com/)  (purchased and self-hosted) and  [fonts.adobe.com](http://fonts.adobe.com/)  (hosted)
* Content lives on  [GitHub.com][gh]
* The site is deployed via [Netlify.com][netlify]
* I am using [Forestry.io] as a <abbr title="content management system">CMS</abbr> (when it’s useful)
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

[^cms]: I’m currently experimenting with [Forestry] and [Netlify <abbr>CMS</abbr>]. As I mentioned in my relaunch announcement post, I’m leaning toward Netlify <abbr>CMS</abbr> because it *should* allow me to allow *anyone* to suggest edits to my site—more on that as it develops.

### Domain Registrar: Hover

At this point I use [Hover] for every one of my domains.[^except-one] I’ve been using them for probably half a decade now, and have had universally positive experiences with them. I’ve almost never needed support, because their stuff really does just work—and the one time I did, for a slightly complicated transfer of a domain from another host to Hover, they were speedy and kind.

At this point, I basically don’t even shop around, because while other places do occasionally offer domains at lower prices, I’m fairly comfortable saying they essentially never compete on quality. So [chriskrycho.com] is at Hover, along with [krycho.com] and [winningslowly.org] and [newrustacean.com] and [massaffection.com] and [rewrite.software] and… no, I promise I don’t have a domain-name-buying problem, I promise. Really! I’ve even let some of my old registrations lapse when I realized I wasn’t going to use them!

[chriskrycho.com]: https://www.chriskrycho.com
[krycho.com]: https://krycho.com
[winningslowly.org]: https://www.winningslowly.org
[newrustacean.com]: https://newrustacean.com
[massaffection.com]: https://massaffection.com
[rewrite.software]: https://rewrite.software

[^except-one]: This is technically not true, because I accidentally registered `writings.tools` instead of `writing.tools`, at Name.com. I am not currently *using* that domain, and will let it expire, because, well, accidental plural much? _le sigh_

### <abbr>DNS<abbr>: Cloudflare

I just switched all of my <abbr>DNS</abbr> name servers to [Cloudflare] earlier this year. I had a longstanding goal of having my registration, my name servers, and my actual hosting and deployment in separate places for a few years now. I don’t remember where I first ran into the idea of keeping those separate, but it stuck—forcefully, by dint of experience.

At one point I was managing all three—registration, name servers, and hosting—through an old-school shared hosting provider ([Stablehost], still a pretty solid option in that space!)… and migrating *out* of that provider was incredibly painful. (It’s actually not 100% done! The hard parts are all done now, though, which is a relief.)

After doing a bunch of research back in late June, I migrated all of my <abbr>DNS</abbr> to Cloudflare. *All* of it. This took [a fair bit of work][rewrites] but it has made everything else since then *much* easier. Their domain name management control panel is really good—as good as any I’ve used—and in my experience it’s also incredibly *fast* to propagate the information around the web. That latter bit is particularly pleasant and important, as anyone who has ever had to mess with <abbr>DNS</abbr> knows!

<aside>

If you’re curious: yes, I *do* have thoughts on Cloudflare’s approach to deciding who to leave on the internet and who to kick off the internet, but I’ll save those for another day.

</aside>

[Stablehost]: https://www.stablehost.com
[rewrites]: https://v4.chriskrycho.com/2019/my-final-round-of-url-rewrites-ever.html

### Site generator

### Fonts

### Hosting

### Deploying

### <abbr>CMS</abbr>

I don’t normally *need* a <abbr>CMS</abbr>, but I do like to have the option. Historically, there were not great options in terms of an interface for writing and managing content… unless you wanted a setup more like WordPress: a server application with a database, and a server to run it on. I have a preference (admittedly a bit strange) for simple text files to be the “source of truth” for the content on my website.[^pdfs-etc] For the last few years, I got by managing everything just via command line tools and building everything on my home machine.

Two things have changed. First: as I noted above, I now deploy everything via Netlify, and I don’t *need* to build it on my local machine. Second, though, the last few years have seen the advent of some fairly nice <abbr>CMS</abbr>es for statically-generated sites like this one! <!-- TODO: keep going! -->

[^pdfs-etc]: I like being able to generate things which *aren’t* web pages from my content sometimes!

### Writing

## Costs

My costs are pretty low for this setup. I pay $15/year for the domain. Cloudflare is free for setups like mine. GitHub is free for setups like mine. Netlify is free for setups like mine. (Sensing a theme here?) I paid a few hundred dollars to perpetually license the Sabon fonts (the body text) a few years ago—both for the web and for desktop work. I pay $10/month for Adobe’s Lightroom package, which includes Adobe Fonts—the piece here that stings the most in terms of ongoing costs, but Lightroom is *fabulous*.
