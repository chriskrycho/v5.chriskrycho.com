---
title: Wacky Tricks We Use in Publishing TypeScript Types (for Ember.js)
subtitle: >
  A walkthrough of the *shenanigans* we have to do to make TypeScript understand how to import `@ember` packages from `ember-source`.
tags:
  - TypeScript
  - Ember
summary: >
  Courtesy of the split between Ember's npm package name (`ember-source`) and the packages it presents as its API (`@ember/*`), we have to get up to some wild shenanigans to make its native TypeScript support work.
link: https://youtu.be/VuF3GY-Ho-s
date: 2022-12-16T09:35:00-0700

---

On Wednesday, fellow LinkedIn-er [Asa Kusuma](https://www.linkedin.com/in/asakusuma/) set up some time with me to understand the work involved in publishing [Ember][e]’s [TypeScript][ts] types. This isn’t an issue for most packages, but Ember’s situation is complicated: It lives on [npm] as [the `ember-source` package][es], but its public API is to import from packages like `@ember/utils`.

[e]: https://emberjs.com
[ts]: https://www.typescriptlang.org
[npm]: https://www.npmjs.com
[es]: https://www.npmjs.com/package/ember-source

Ember’s own CLI tooling handles that difference when building Ember apps or libraries, but TypeScript doesn’t know a thing about it, and *no* type-publishing tooling out there works for us—“out of the box” or with any amount of tweaking. (If that sounds like a problem, I agree, but that’s a topic for a different day!)

Since Asa and I were on a Zoom call anyway, he suggested we record it so this would be useful to others—an excellent idea!—so here it is:

<figure class='embed'>

<div class='embed__wrapper'>

<iframe class='embed__content' src="https://www.youtube.com/embed/VuF3GY-Ho-s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

</div>

<figcaption><a href="https://youtu.be/VuF3GY-Ho-s">Wacky Tricks We Use in Publishing TypeScript Types (for Ember.js)</figcaption>

</figure>

<div class="callout">

Thoughts, comments, or questions? Discuss on [Hacker News][hn] or [lobste.rs][l], or [send me an email](mailto:hello@chriskrycho.com?subject=Wacky%20Tricks%20for%20TS%20Types%20for%20Ember)!

[hn]: https://news.ycombinator.com/item?id=34016320
[l]: https://lobste.rs/s/lucxxu/wacky_tricks_we_use_publishing

</div>
