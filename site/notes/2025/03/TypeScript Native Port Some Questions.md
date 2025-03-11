---
title: "TypeScript Native Port: Some Questions"
subtitle: Faster is good! The rest of this announcement is… strange.

date: 2025-03-11T09:02:00-0600

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

1. **Why Go?** Go is a solid language with a lot of real-world use, but it seems like a poor fit in some ways for the kind of thing that TS is and does, not least in that <abbr>JS</abbr>-Go interop is not especially clean and that Go is also not particularly easy to integrate with actually-native langauges (C, C++, Rust), and that its Wasm story is *early* to say the least.

2. **What is the migration story going to be for tools that patch TS?** This is closely related to the above. This might seem like a “tough, deal with it” other than the fact that “monkey-patch our public (if unstable) <abbr>API</abbr>)” has been the *Microsoft-recommended approach* for extending TypeScript, given the lack of extensibility in other ways. This is what Svelte, Ember’s Glint, and lots of other tools have had do do for years, and that approach very obviously will not work with Go. And directly related to the point above: does the <abbr>TS</abbr> team expect the community to rewrite all of those tools in Go?

3. **Will this at least come with a native Language Server Protocol implementation?** Some of the above factors could be mitigated by this, and it has been one of the longest-standing challenges for folks looking to integrate.

Suffice it to say I’ll be tuning into the <abbr>AMA</abbr> later this week on the <abbr>TS</abbr> Discord with considerable curiosity.

