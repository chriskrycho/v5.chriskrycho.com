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

## 