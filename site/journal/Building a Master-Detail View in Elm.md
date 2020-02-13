---
title: Building a Master-Detail View in Elm
subtitle: A very basic implementation of a very common UI pattern.
date: 2020-02-15T21:00
tags:
    - Elm
    - UI
    - software development
    - rewrite.software
summary: >
    TODO
qualifiers:
    audience: >
        TODO

---

In my work on [rewrite], I needed to build a master-detail view for the web. It comes right out of the box for native iOS and macOS projects—whether as a “Master-Detail App” or via SwiftUI or via any of a number of built-in tools—but for the web, this is the kind of thing you always have to build yourself. Happily, Elm makes it *very* easy to build, and (importantly!) to build *correctly*. One of my commitments is to share the things I’m learning as I build rewrite, so here we go!

[rewrite]: https://rewrite.software

## What is a master-detail view?

A master-detail view is a fairly standard UI pattern: a list of items make up the “master” view, and when you select it (by tapping, clicking, or keyboard action), the detail view appears. This is how *lots* of apps work, including email clients like [Spark]—

<img src="https://cdn.chriskrycho.com/file/chriskrycho-com/images/master-detail/spark.png" alt="a master-detail view in Spark" style="max-width: var(--max-width)" />

—or notes apps like [Bear]—

<img src="https://cdn.chriskrycho.com/file/chriskrycho-com/images/master-detail/bear.png" alt="a master-detail view in Bear" style="max-width: var(--max-width)" />

—or many, many other apps.

[Spark]: https://sparkmailapp.com
[Bear]: https://bear.app

*[UI]: user interface