---
title: |
    An Ice Cold Take on <abbr>CI</abbr> Config Systems
subtitle: |
    My opinion on <abbr title="Yet Another Markup Language">YAML</abbr> probably won’t surprise you.

qualifiers:
  audience: |
    People familiar at a basic level with <abbr>YAML</abbr> and its use in continuous integration and deployment systems like GitHub Actions.

date: 2026-05-11T07:40:00-0600

tags:
  - software development

---

<abbr title="Yet Another Markup Language">YAML</abbr> pipelines are a pit of failure for <abbr title="continuous integration">CI</abbr>/<abbr title="continuous delivery">CD</abbr> pipelines. They attract people because they seem declarative and the syntax is “easy”, and they have become “standard”, but everyone ends up encoding subroutines and data flow into them—and <abbr>YAML</abbr> is a terrible programming language!

---

I posted this on social media ([Bluesky][b], [Mastodon][m], [LinkedIn][li]) and it generated some good discussions. Most of all: what’s the alternative? Nothing *super* mainstream, but I find [Pkl][pkl] and [Dhall][dhall] both quite interesting, and both of them can spit out <abbr>YAML</abbr>, <abbr title="JavaScript object notation">JSON</abbr>, etc., which means you can use them *with* your existing <abbr>CI</abbr> system if you so desire. That doesn’t address the other problems with most of today’s <abbr>CI</abbr> systems, but it’s a good step and adopting one of them *does* address many of the problems of <abbr>YAML</abbr> while maintaining many of the benefits of a more declarative/limited language.

[b]: https://bsky.app/profile/chriskrycho.com/post/3mlj5ses4lo2u
[m]: https://mastodon.social/@chriskrycho/116551171174373355
[li]: https://www.linkedin.com/feed/update/urn:li:activity:7459274954757398528/
[pkl]: https://pkl-lang.org
[dhall]; https://dhall-lang.org

Other things to read about that suggest interesting alternatives in the <abbr>CI</abbr> space itself:

- Alexey Kladov’s [<abbr>CI</abbr> Dream][dream] and [<abbr>CI</abbr> in a Box][box] posts
- Gregory Szorc’s [Modern <abbr>CI</abbr> is Too Complicated and Misdirected][modern-ci]
- [<span class="all-smcp">RWX</span>][rwx], which *uses* <abbr>YAML</abbr> but with some better/more sensible primitives than most of the major <abbr>CI</abbr> providers
- [Build Systems à la Carte][systems], arguably *the* canonical paper on the subject

[dream]: https://matklad.github.io/2023/12/24/ci-dream.html
[box]: https://matklad.github.io/2026/02/06/ci-in-a-box.html
[modern-ci]: https://gregoryszorc.com/blog/2021/04/07/modern-ci-is-too-complex-and-misdirected/
[rwx]: https://www.rwx.com
[systems]: https://simon.peytonjones.org/build-systems-a-la-carte-theory-and-practice/

