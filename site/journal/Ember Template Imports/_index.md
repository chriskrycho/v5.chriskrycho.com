---
title: >
    Ember Template Imports
subtitle: >
    My argument for `<template>`: a series in 5 parts.
summary: >
    The Ember/Glimmer community is experimenting with designs for single-file-components. This series is a deep dive and extended argument for the `<template>` design over alternatives.
image: https://cdn.chriskrycho.com/file/chriskrycho-com/images/template-imports-demo.png
permalink: /journal/ember-template-imports/
layout: archives.njk
standalonePage: true
date: 2021-11-12T21:00:00-0600
order: OLD_FIRST

---

The Ember and Glimmer community is currently experimenting with designs for components being available in the same file as supporting JavaScript—sometimes described as “single-file components” (or <abbr>SFC</abbr>s). There are some working implementations in the [ember-template-imports][eti] repository, and Ember’s community and leadership has already committed to making *some* move in this space [the strict mode templates <abbr title="request for comments">RFC</abbr>][strict].

[eti]: https://github.com/ember-template-imports/ember-template-imports
[strict]: https://emberjs.github.io/rfcs/0496-handlebars-strict-mode.html

<section class='note' aria-label='note' aria-role='note'>

It’s important to say before I jump in: these are *my* opinions. They’re *not* official LinkedIn positions, and in fact I have a number of colleagues who disagree with me about some of these things! I’m writing this series to persuade any and all members of the Ember community, including other people at LinkedIn.

</section>

While each of these has its own upsides and downsides, I believe `<template>` is far and away the best choice, because of its wins for teaching and understanding, scaling, and testing. In this series, I will do my best to present an even-handed analysis that shows how and why I came to that conclusion over the last few years of thinking about it.

In addition to the <abbr title="HyperText Markup Language">HTML</abbr> presentation here on my website, you can read this series offline:

- [<abbr title="electronic publication">EPUB</abbr>](https://cdn.chriskrycho.com/file/chriskrycho-com/resources/Ember%20Template%20Imports.epub)
- [<abbr title="portable document format">PDF</abbr>](https://cdn.chriskrycho.com/file/chriskrycho-com/resources/Ember%20Template%20Imports.pdf)
