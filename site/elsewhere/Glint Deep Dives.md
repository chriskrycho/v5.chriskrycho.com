---
title: Glint Deep Dives
subtitle: >
  A 6-part YouTube explainer series digging deep into [Glint](https://typed-ember.gitbook.io/glint)!
date: 2023-10-20T10:10:00-0600
link: https://www.youtube.com/playlist?list=PLelyiwKWHHApkoeXQjwKPHPAHgKXZyl3t
qualifiers:
  audience: >
    Software developers interested in how programming language tooling in editors works, especially (but not only!) for TypeScript.
summary: >
  A 6-part YouTube series on the tool that makes Ember’s templates type-check-able with TypeScript. There is nothing else like this!
tags:
  - video
  - TypeScript
  - Ember
updates:
  - at: 2023-10-20T10:40:00-0600
    changes: Incorporated my thoughts from [this Tweet thread](https://x.com/chriskrycho/status/1715403170606633247?s=20) into the post proper.

---

For the past six weeks or so, my long-time collaborator [Dan Freeman][df] and I have been working through a deep dive on [Glint][glint]: the tool we (mostly Dan!) built over the past many years to provide type safety for [Ember][ember]’s template language. In [this six-part (!) series][yt], we cover everything from  the high-level architecture to the nitty-gritty details of how Glint compiles Ember’s [Handlebars][hbs]-style [templates][templates] into something [TypeScript][ts] can understand, and from the <abbr title="command-line interface">CLI</abbr> to the language server integration.

[df]: https://dfreeman.io
[glint]: https://typed-ember.gitbook.io/glint
[ember]: https://emberjs.com
[yt]: {{link}}
[hbs]: https://handlebarsjs.com
[templates]: https://guides.emberjs.com/release/components/
[ts]: https://www.typescriptlang.org

There is, as far as I know, nothing like this kind of detailed deep dive for any other language server out there, so I hope that it is interesting not only to the Ember community but to other people who want to do similar work for other frameworks, languages, etc.! This also highlights (1) how much things like Rich Harris’ old [HTMLx][htmlx] idea would be *super* valuable for all the non-<span class='smcp'>JSX</span> view layers out there and (2) how nice it would be if TypeScript provided a better interface for those view layers to use.

[htmlx]: https://github.com/htmlx-org/HTMLx

I think <span class='smcp'>TSX</span> is an under appreciated part of the success of [React][react]; it is notable just how much effort every other front-end framework has had to put into building and maintaining their own versions of what React (and other [<span class='smcp'>JSX</span>][jsx]/<span class='smcp'>TSX</span> tools) get “for free” from TypeScript. I totally understand *why* the <abbr title='TypeScript'>TS</abbr> team does not want a general-purpose pluggable architecture for this kind of thing. At the same time, I think there is a real need here, and the sheer amount of duplicated work across Glint, [Volar][volar], [Svelte Language Tools][slt], etc. is evidence of that.

[react]: https://react.dev
[jsx]: http://facebook.github.io/jsx/
[volar]: https://volarjs.dev
[slt]: https://github.com/sveltejs/language-tools/releases

Medium-term, my own long-baked take is that the <abbr title='JavaScript'>JS</abbr>/<abbr title='TypeScript'>TS</abbr> community should push for both (a) a shared standard syntax—which means a lot of folks on frameworks will need to actually compromise to get there!—and (b) support for that single shared syntax from TypeScript. Having a single shared syntax for “<abbr title="hypertext markup language">HTML</abbr> semantics templates” would go a very long way to alleviating the very real concerns about a general plugin/extension architecture from the TypeScript team! It would also dramatically decrease the learning curve for the <abbr title='JavaScript'>JS</abbr> community!

