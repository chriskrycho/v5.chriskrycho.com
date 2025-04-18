---
title: "TypeScript Native Port: Some Questions"
subtitle: Faster is good! The rest of this announcement is… strange.

date: 2025-03-11T09:02:00-0600
updated: 2025-03-11T09:55:00-0600
updates:
  - at: 2025-03-11T09:21:00-0600
    changes: Added some footnotes and deployed `<abbr>` a few places.
  - at: 2025-03-11T09:45:00-0600
    changes: Added a hypothesis about why the team chose this direction.
  - at: 2025-03-11T09:55:00-0600
    changes: Added a link which bears out that hypothesis.

qualifiers:
  audience: |
    Folks who use TypeScript—and especially those with an eye to extensions and integrations with TypeScript.

summary: >
    The TypeScript team is rewriting the compiler for speed. This is great! But they chose Go. That’s… weird. Really, really weird.

tags:
  - software development
  - TypeScript
  - programming languages

---

On the one hand, [this announcement][ts] is a valuable one: the speed of type checking TypeScript code bases can be a significant hurdle for adoption. I am glad to see the team prioritizing this, because it is really important!

[ts]: https://devblogs.microsoft.com/typescript/typescript-native-port/

Some questions that immediately come to mind, however:

1. **Why Go?** Go is a solid language with a lot of real-world use, but it seems like a poor fit in some ways for the kind of thing that <abbr title="TypeScript">TS</abbr> is and does, not least in that <abbr>JS</abbr>-Go interop is not especially clean and that Go is also not particularly easy to integrate with actually-native langauges (C, C++, Rust, Zig), and that its Wasm story is *early* to say the least.

2. **What is the migration story going to be for tools that patch <abbr>TS</abbr>?** This is closely related to the above. This might seem like a “tough, deal with it” other than the fact that “monkey-patch our public (if unstable) <abbr title="application programming interface">API</abbr>)” has been the *Microsoft-recommended approach* for extending <abbr>TS</abbr>, given the lack of extensibility in other ways. This is what Svelte, Ember’s Glint, and lots of other tools have had do do for years,[^jsx] and that approach very obviously will not work with Go. And directly related to the point above: does the <abbr>TS</abbr> team expect the community to rewrite all of those tools in Go?[^momentum]

3. **Will this at least come with a native Language Server Protocol implementation?** Some of the above factors could be mitigated by this, and it has been one of the longest-standing challenges for folks looking to integrate.

Suffice it to say I’ll be tuning into the <abbr title="ask me anything">AMA</abbr> later this week on the <abbr>TS</abbr> Discord with considerable curiosity.

---

*Edit, 2025-03-11 09:45am:* A hypothesis about why the team chose this (zero inside info, just a guess): they could *port* to Go, keeping the overall architecture basically unchanged for this initial work. Moving to something like Rust would have been a *rewrite*. I would guess a Rust rewrite would have forced them to revisit their architecture—in many cases significantly so. “Garbage collection or not?” ends up being a really big deal in terms of how your program can naturally be structured.

*Edit, 2025-03-11 09:55am:* [this post](https://github.com/microsoft/typescript-go/discussions/411) seems to bear out my above hypothesis pretty cleanly!


[^jsx]: Because the <abbr>TS</abbr> team built in native support for <span class="all-smcp">JSX</span> and provided no extensibility for parsing, so everybody who had a different templating layer had to build their own—including Vue, Svelte, Angular, and Ember.

[^momentum]: When the momentum now is very much toward Rust, and many of those tools are using Rust already?