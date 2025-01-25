---
title: The Curse of Knowledge and True Myth’s Documentation
subtitle: Writing good introductory documentation and teaching materials is *hard*.

summary: >
    We heard that there are some big gaps in True Myth’s docs for `Task` in particular. It’s true! Some thoughts on why… and how I hope to fix it.

date: 2025-01-25T16:50:00-0700

image:
    cdn: diataxis.png

qualifiers:
    audience:
        Other people interested in teaching, especially but not only in the realm of software development.

tags:
    - teaching
    - learning
    - software development

---

Over the past month, I shipped a bunch of nice features in True Myth around its new `Task` type, and I went out of my way to document them extensively. I was feeling reasonably good about it, right up until someone opened a very polite issue on GitHub asking for some explanation about the basic gist of how to think about and use the library.

> I'm trying to get started with this library but I just cannot wrap my head around it. The documentation… doesn't provide a simple use case. For example, provide a code sample using plain promises and then convert that to use Task.

I realized immediately that they were right. The problem is the infamous [curse of knowledge](https://en.wikipedia.org/wiki/Curse_of_knowledge): when you know something really well, it is no longer obvious to you which parts of it might be difficult or confusing to a new user. For that matter, as this comment suggested, it might not be obvious to a new user why or how they would use it in a basic way—but  as the person building it, you have all that motivation in mind because otherwise you would not have built it in the first place.

That goes many times over for this particular feature. When I published the first version with `Task` (v8.2.0) a few weeks ago, I [noted][v8.2.0-post] that I had started thinking about this fully seven years ago, and that was not an exaggeration; I started thinking about it almost as soon as we had shipped the other core types in the library, and I opened [a discussion][idea-issue] about it over 6 years ago, in October 2018. I made my first unsuccessful attempt to implement it shortly thereafter, and tried again several more times after that.[^unsuccessful] I have been thinking about this off and on for *seven years*.

[v8.2.0-post]: https://v5.chriskrycho.com/elsewhere/true-myth-v8.2.0now-with-a-task-type/
[idea-issue]: https://github.com/true-myth/true-myth/discussions/215

Add on having spent most of the past year working on teaching async Rust in [The Book][trpl], and I am *well* out of the phase where the differences between a <abbr title="JavaScript">JS</abbr> `Promise` and other approaches to async need explaining or motivating. But that means I have to work that much harder to remember what it is like *not* to have spent a ton of time thinking about these things, *not* to have deeply internalized a bunch of tradeoffs and pitfalls and annoyances about `Promise` versus other approaches to async, and so on.

[trpl]: https://doc.rust-lang.com/book/

The curse of knowledge is not even something you *can* fully overcome. But if you want to teach people how to use your library well, you have to do your very best.

One obvious takeaway for me: True Myth has had fairly robust <abbr title='application programming interface'>API</abbr> documentation for a long time… but just insofar as it is starting to pick up some more users, it needs other kinds of documentation, too! The [four-document/Divio/Diátaxis][diataxis] model [may not be perfect][hw], but it is fairly well-suited to library documentation, is a lot better than the mostly-just-<abbr title='application programming interface'>API</abbr>-docs situation True Myth has today, and is at least a good starting point for thinking through how we might want to revamp things!

I obviously cannot make any commitments about *when* we will land that kind of work, but it is a kind of work that would be well worth doing as we keep trying to make True Myth more useful to more people.

[diataxis]: https://diataxis.fr
[hw]: https://www.hillelwayne.com/post/problems-with-the-4doc-model/

[^unsuccessful]: If you look at [that discussion][idea-issue], you may notice that the design I spitballed all the way back in 2018 is not all that different from what we ended up with. The problems I ran into were not the top-level <abbr title='application programming interface'>API</abbr>, but details about how to interoperate with `Promise` both directions, and in particular how to “leave” the `Task` (ultimately, you cannot leave the async computation context, but that was something I had to learn along the way, and to develop a better intuition for what that *meant*).