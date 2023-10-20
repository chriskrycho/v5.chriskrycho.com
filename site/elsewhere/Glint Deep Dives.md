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

---

For the past six weeks or so, my long-time collaborator [Dan Freeman][df] and I have been working through a deep dive on [Glint][glint]: the tool we (mostly Dan!) built over the past many years to provide type safety for [Ember][ember]’s template language. In [this six-part (!) series][yt], we cover everything from  the high-level architecture to the nitty-gritty details of how Glint compiles Ember’s [Handlebars][hbs]-style [templates][templates] into something TypeScript can understand, and from the <abbr title="command-line interface">CLI</abbr> to the language server integration.

There is, as far as I know, nothing like this kind of detailed deep dive for any other language server out there, so I hope that it is interesting not only to the Ember community but to other people who want to do similar work for other frameworks, languages, etc.!

[df]: https://dfreeman.io
[glint]: https://typed-ember.gitbook.io/glint
[ember]: https://emberjs.com
[yt]: {{link}}
[hbs]: https://handlebarsjs.com
[templates]: https://guides.emberjs.com/release/components/
