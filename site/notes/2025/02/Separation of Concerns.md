---
title: Separation of Concerns
subtitle: …for web domain management.

summary: >
    Keep domain registration, DNS, and (to a lesser degree) hosting separate from each other. You’ll be glad you did!

qualifiers:
  audience: |
    People who have their own domains and websites or services they run on them.

date: 2025-02-24T20:20:00-0700
updated: 2025-02-25T07:45:00-0700
updates:
   - at: 2025-02-25T07:45:00-0700
     changes: Added a note about email provider and added Hover and Fastmail affiliate links.

tags:
  - software development

---

A little tip for saving your future self potentially a lot of pain, via a lesson I learned over a decade ago: Keep your domain registrar distinct from your name servers (and thus <abbr title="domain name server">DNS</abbr> management). This means that if you ever need to move either on short notice—*especially* if you need to move a site from one registrar to another—you *only* have to move that part of it. You can export all your <abbr>DNS</abbr> entries and import them at another host before changing the nameservers records at your registrar, or you can keep the DNS the same and set the nameservers immediately as you transfer over a domain to a new registrar.

This also *broadly* applies to where you run your web sites and services, for much the same reasons. Today, I could move clone one of my sites and services to a new hosting provider and have a transparent cutover with no downtime, by simply waiting till the service was up and running before updating the <abbr>DNS</abbr>. The inverse is true, too: if I move off my current <abbr>DNS</abbr> provider, none of the actual apps should be affected or indeed be any the wiser. (Web apps and sites are, in this regard, a bit less of an issue than the registration/<abbr>DNS</abbr> split: I can move the <abbr>DNS</abbr> somewhere else and the apps not care!)

Equally critical to my mind: I do not run my email (hello@\<whichever domain> etc.) through my registrar *or* my <abbr>DNS</abbr> provider, but another service. In my case, that’s Fastmail, but it could be basically anything: Proton, Google Apps, Outlook, whatever. The point is that my email is, like every other part of this stack, *not* coupled to the other parts of it!

Today, I do all my domain registration through Hover, use Cloudflare as both <abbr title="content delivery network">CDN</abbr> and nameserver/<abbr>DNS</abbr> provider, and run my websites and services on a mix of GitHub Pages, Render, and Cloudflare Workers. I could split the <abbr>CDN</abbr> apart from <abbr>DNS</abbr> management if need be pretty easily for the same reason. No link in that chain is particularly strongly connected to any of the others.

---

If you found this post helpful and decide to use Hover or Fastmail, these affiliate links will get me a little off my next renewal and give you a small discount:

- [Hover](https://hover-affiliates.pxf.io/chriskrycho)
- [Fastmail](https://join.fastmail.com/4dcac080)

I put them down here rather than inline to be extra transparent!
