---
title: React Hooks Are Indeed Not “Functional”
subtitle: >
    That is not a value judgment (I’ll save that for another time), but a statement of how they work.

date: 2024-11-30T16:33:00-0700

tags:
    - JavaScript
    - functional programming
    - React
    - Elm

qualifiers:
    audience: >
        People who care about JS frameworks, with some background in the history of React (and others’) approach to rendering, and who are also conversant in the ideas of functional programming.

---

Context: [Mark Erikson][me], noting on Bluesky that a lot of folks complain about [React][r] hooks not being particularly “functional”—

[me]: https://acemarke.dev
[r]: https://react.dev

<figure class="quotation">

> One common complaint about React I see is that "hooks violate Functional Programming, it's all hidden magic globals".
>
> I get that class components maybe _seemed_ more concrete in that you had class fields for some variables...
>
> but where did you think `this.state` actually came from?
>
> Components have always been a kind of facade over React's actual internal data structures.
> 
> With classes, React overwrote `this.state/props` before calling `render()`.
>
> With functions, `props` is passed in and state's read during hook calls.
>
> Either way it all came from the internal Fiber structure.

<figcaption>—<b>Mark Erikson (<a href="https://bsky.app/profile/acemarke.dev">@acemark.dev</a>)</b>, <a href="https://bsky.app/profile/acemarke.dev/post/3lc6vh357pk2h">1</a>, <a href="https://bsky.app/profile/acemarke.dev/post/3lc6vh35ji22h">2</a>, <a href="https://bsky.app/profile/acemarke.dev/post/3lc6vh35khc2h">3</a></figcaption>

</figure>

I [replied there][reply], but pulled those thoughts over here as well (and added a bit here and there), because it seems a good opportunity to write down things I have thought about hooks for a long time.

[reply]: https://bsky.app/profile/chriskrycho.com/post/3lc77nqs2rk2e

There are two key factors in people’s response. The first is that classes read as more “honest” about what’s going on: a big bag of state and effects. Yes, classes and closures are isomorphic to each other and you can represent either with the other; but the difference in presentation matters.[^tracked] The second is history: In the era when a lot of key people learned React initially, and thus when its culture formed, function-based components were functional and stateless. Hooks violated that long-standing and historically very clear distinction, arguably needlessly (lifecycle hooks are not required for classes!)

I don’t think anyone was ever under any misapprehensions about there being mutable state somewhere. That’s inevitable—even [Elm][elm] has it, just hidden behind the runtime! Lots of us, though, find value in isolating both for the sake of reasoning and control. Hooks do not help with that. (Indeed, they rather actively undermine it.) In and of itself, that does not tell you anything about the good or bad of hooks or <abbr title="application programming interface">API</abbr>s shaped that way. (I have Opinions™, but they’re not really relevant here!) It does go a long way toward explaining the intuitive “not functional” response people offer, though—and indeed rather thoroughly validates it, in my view!

[elm]: https://elm-lang.org

In particular: a pre-hooks function component actually *was* a pure function of its arguments, and (modulo hand-waves about ways you could hoist yourself on your own petard even in a function component render Because JavaScript™) that was something you could actually rely on.

No purely functional programming system avoids having mutation of state; indeed, that’s not really the point of it! The point is to *control* mutation of state—preferably, to isolate it to key points—to enable truly local reasoning everywhere else. *That* is the part hooks violate.


[^tracked]: In this regard, I actually very much think that something like Ember’s/Glimmer’s `@tracked` state on a class—basically [signals][s] making explicit their stateful nature—is more “honest” and a better fit for <abbr title="JavaScript">JS</abbr> that hooks-style <abbr title="application programming interface">API</abbr>s, whether React hooks, Vue’s [composition <abbr title="application programming interface">API</abbr>][v], or any other such. The exception I might allow is for [controlled effects in Unison][u].

[s]: https://docs.solidjs.com/concepts/signals
[v]: https://vuejs.org/guide/extras/composition-api-faq.html
[u]: https://share.unison-lang.org/@dfreeman/tv
