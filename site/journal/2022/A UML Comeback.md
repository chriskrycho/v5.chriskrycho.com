---
title: A UML Comeback?
subtitle: >
  Because the tools are positioned for sketching, now?
date: 2022-12-09T21:21:00-0700
tags:
  - software development
qualifiers:
  epistemic: >
    Hypothesis-generation.
  audience: >
    Other software developers who might have an interest—historical or otherwise—in the value of *diagrams* for communicating. Specifically, people who have read these two posts (this post will make sense without those, but it will make a lot *more* sense with them, so please go read them):

    - [Why <abbr>UML</abbr> Really Died](https://buttondown.email/hillelwayne/archive/why-uml-really-died/), Hillel Wayne

    - [<abbr>UML</abbr>: My Part in Its Downfall](https://tratt.net/laurie/blog/2022/uml_my_part_in_its_downfall.html), Laurence Tratt

---

<abbr title="universal modeling language">UML</abbr> has been a joke among most software developers I know for years. In my first job I was subjected, briefly (but not briefly enough), to the last gasp of the 2000s-era dream of generating all the important code from modeling diagrams.[^ibm] Never wholly banished, <abbr>UML</abbr> persisted mostly in corners of software development best described, I think, as “enterprise-tastic”. I occasionally see it crop up in design documents and: laugh in mild disbelief.

And yet.

Last month I opened [a pull request][ember-pr] which made *extensive* use of <abbr>UML</abbr> in its description to clarify what in the world was going on. (It worked: a collaborator noted: “it was very very helpful for quickly building context here”.) A few months ago I [published][glint-pr] an [`ARCHITECTURE.md` for Glint][amd] which included sketch-style drawings[^excalidraw]. This fall, I built a similarly sketch-style diagram to explain the different layers of a modern web [meta-framework][framework] to non-web-specialist engineering leaders at LinkedIn.[^diagram] Only one of these was using <abbr>UML</abbr>, strictly speaking, but all of them were <abbr>UML</abbr>-adjacent, and the one which needed something like <abbr>UML</abbr> *really* needed something like <abbr>UML</abbr>.

[ember-pr]: https://github.com/emberjs/ember.js/pull/20271
[glint-pr]: https://github.com/typed-ember/glint/pull/420
[amd]: https://matklad.github.io/2021/02/06/ARCHITECTURE.md.html
[framework]: https://www.youtube.com/watch?v=860d8usGC0o

What changed, for me? Well… the combination of the existence of [Mermaid.js][mermaid] and its [integration][gh] with GitHub’s Markdown rendering, plus contexts which needed the illumination which only a diagram can bring. Sometimes, indeed, a picture is worth a thousand words. When I started writing up the pull request description where I ultimately ended up with a really horrifying <abbr>UML</abbr> diagram (not the diagram’s fault: it was representing a really horrifying bit of organically-grown type hierarchy in Ember.js), I realized that there was no way anyone would be able to follow it simply by reading the thousand words it would take to describe.


[mermaid]: https://mermaid-js.github.io/mermaid/#/
[gh]: https://github.blog/2022-02-14-include-diagrams-markdown-files-mermaid/

That’s not an exaggeration: In this case it would have *literally* taken a thousand words to describe it—I would know, because I started out by writing about a quarter of that before I bailed and made the diagram—and one picture did the trick!

Tratt writes:

> With the benefit of hindsight, I think <abbr>UML</abbr> had quite possibly reached not only its actual, but also its potential, peak in 2000: as a medium for software sketching, people only ever needed the basics from it.

<abbr>UML</abbr> is still a poor tool for a lot of the design ends to which I occasionally see it put (if a picture is worth a thousand words, a TypeScript `interface` declaration is often better than either!) but when all you need is a lightweight sketch of some relationships so people can understand what you’re talking about, rather than an end-to-end system design expressed in nauseating detail… <abbr>UML</abbr> is great, actually! And maybe it is set up to make a bit of a comeback, in the areas where it is fit for purpose, as I recently found.

All of which is to say two things about tools for software development—<abbr>UML</abbr> and others:

1. Pushing them past what they are actually good for not only does their users a disservice; it can make it hard for people who *could* benefit from them even to see their value.

2. All sorts of factors can bring a tool back around when it has fallen out of favor for whatever reason—good or bad. The work of a handful of hackers making Mermaid.js, and then GitHub adding support for it, might do more to spur (re)adoption of <abbr>UML</abbr> in the 2020s than all the standardization efforts of the 2000s did.



[^ibm]: The same era saw that same organization seriously flirting with [IBM Rational Rhapsody][irr]: a solution in search of a problem if ever I have seen one, but/and one directly tied to this same dream of <abbr>UML</abbr> everywhere. This was in 2010! Even most of the die-hards had given up by then. To call the organization I worked for at the time dysfunctional is to insult dysfunctional organizations everywhere. But this is a rant for another day.

[irr]: https://www.ibm.com/products/systems-design-rhapsody

[^excalidraw]: generated with [Excalidraw][ex], if you’re curious.

[ex]: https://excalidraw.com

[^diagram]: which I hope to publish both a blog post and a YouTube video about sometime in the spring