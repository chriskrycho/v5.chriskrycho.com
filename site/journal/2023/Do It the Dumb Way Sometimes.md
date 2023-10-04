---
title: Do It the Dumb Way Sometimes
subtitle: >
  Simple tools for small, well-scoped problems, please!
date: 2023-10-03T20:47:00-0600
tags:
  - software development
summary: >
  Sometimes with software you can get away with using incredibly simple approaches—approaches that would be dumb or bad or ill-advised in other contexts.
---

I have recently been going back and adding nice little notices to the tops of the previous versions of my website,[^1] which read something like:

> This version of the site is now archived. See the next version at [v5.chriskrycho.com][3].

I had the idea to add this affordance a few years ago, and a [former colleague][4][^2] noted that it had tripped up him and several other folks recently, so I decided to go ahead and fix it once and for all. When I first had this idea, I thought I would tackle it by writing a script that could actually go find all the relevant places to insert comments using an actual <abbr title="hypertext markup language">HTML</abbr> parser, and thereby do it “right”. After all, [you cannot parse <abbr title="hypertext markup language">HTML</abbr> with regex][5], right?

Well. No. You cannot. But that is not what I needed to do here. All I needed to do here was something incredibly simple and dumb, and the right way to do it was a *dumb* way: with a regular expression. You see, I am not dealing with arbitrary content, or documents which may be ill-formed, or any of the other many good reasons why you actually should not use a regular expression for general-purpose <abbr title="eXtensible Markup Language">XML</abbr> or <abbr title="hypertext markup language">HTML</abbr> document handling. Instead, I was dealing with a very simple find-and-replace operation on <abbr title="hypertext markup language">HTML</abbr> documents who structure I knew to be identical, because I was the sole author of those documents, and created them with well-structured templates.[^3]

So I opened [BBEdit][9], my [tool of choice][10] these days for this kind of text transformation or editing, wrote a little not-even-a-regex search query for the tag I wanted to insert the new element in front of, and a replacement text consisting of the new <abbr title="hypertext markup language">HTML</abbr> element and its contents and associated styles. Then I ran **Replace All**, checked that things had worked the way I wanted, and repeated the process in conjunction with some judicious deployment of `jj restore --from main`.[^4] The details varied a little bit depending on the site in question, but those were the broad strokes. The whole thing took me maybe 20 minutes per site.

The lesson here is not “you should always do the dumb thing with a regex”. It is, rather, “sometimes you should do the dumb thing with a regex”, because that is all it takes to get the job done, and you won’t be revisiting it in the future. If either of those things is *not* true—if there is a more general problem to be solved, or if you expect to revisit it in the future—then build something more capable, more amenable to future revision. Otherwise… don’t.

This is what <abbr title="ya ain’t gonna need it">YAGNI</abbr> is really about, in the end. Build what you need to do the job in front of you, *aware* of the future but not *for* the future.

[^1]: You may notice that this particular post appears at `v5.chriskrycho.com`—for good reason: because I decided long ago that [I never want to have to do <abbr title="universal resource location">URL</abbr> rewrites again][1]. I version the site and its content, and that means the history of my writing is spread out across subdomains, but it also means my <abbr>URL</abbr>s are [*cool*][2], because they don’t change.

[^2]: More details on the “former” bit there forthcoming in a blog post later this week!

[^3]: Some in [WordPress][6]’s “loop”, some in [Jinja2][7] for [Pelican][8].

[^4]: [My write-up on using Jujutsu][11] is still coming, and will hopefully get finished over the sabbatical I started yesterday!

[1]: https://v4.chriskrycho.com/2019/my-final-round-of-url-rewrites-ever.html
[2]: https://www.w3.org/Provider/Style/URI
[3]: https://v5.chriskrycho.com
[4]: https://www.linkedin.com/in/jordanhawker/
[5]: https://stackoverflow.com/a/1732454/564181
[6]: https://wordpress.org
[7]: https://jinja.palletsprojects.com/en/3.1.x/
[8]: https://getpelican.com
[9]: https://www.barebones.com/products/bbedit/
[10]: https://v5.chriskrycho.com/journal/reflections-on-a-month-with-bbedit-and-nova/
[11]: https://v5.chriskrycho.com/journal/jj-init/
