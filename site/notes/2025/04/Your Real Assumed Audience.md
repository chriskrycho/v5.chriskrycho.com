---
title: Your Real Assumed Audience
subtitle: There’s who you think it is, and who it *actually* is.

date: 2025-04-17T19:42:00-0600

tags:
  - writing

qualifiers:
  audience: |
    People who are already familiar with the basic idea and, more importantly, the *point*, of my [assumed audience][aa] headers.
    
    [aa]: https://v4.chriskrycho.com/2018/assumed-audiences.html

---

The other day I wrote [a blog post][post] announcing updates to [the True Myth library][tm] that my friend Ben and I maintain. I put an assumed audience header on it, like I do on most posts—

[post]: https://v5.chriskrycho.com/elsewhere/true-myth-releases-8.6-9.0-and-a-new-docs-site/
[tm]: https://true-myth.js.org

> TypeScript developers with an interest in even safer typed programming with a functional flair. Assumes a fair bit of types knowledge in some of the deep dive bits, but you can get the high level without that!

—and I thought that header was accurate. It wasn't.

A conversation I had in a community Slack made it really obvious that the pitch for True Myth wasn't clear to a lot of potential readers. That conversation made me realize that my assumed audience was actually people who are already familiar with the library or libraries like it, and therefore know why they would be using it. The average *TypeScript developer with an interest in functional programming and extra safety* could read that whole post and still have have *no idea* why they would actually use this library. This post didn't make that pitch at all, because that wasn’t the audience I was actually writing to.

Two quick takeaways:

1. It's one thing to have the idea of an assumed audience when publishing a post in some general sense. It's something else entirely to know who you're *actually* writing to, who it is that you have implicitly in mind when you put the words on the page. Lesson learned. Again.

2. Release blog posts for libraries are really hard, because they really need to speak clearly to two very different audiences: people just coming to the library for the first time via the blog post, and people who already know the library and just want the updates.
