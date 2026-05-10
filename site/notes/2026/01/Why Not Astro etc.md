---
title: Why Not Astro (etc.)?
subtitle: >
  A reasonable question I get asked regularly when I mention I’m slowly building my own site generator/engine.

date: 2026-01-02T10:48:00-0700
updated: 2026-05-10T17:02:00-0600

qualifiers:
  audience: |
    People who know what static site generators and website builders in general and specifically tools Astro, 11ty, etc. are.

tags:
  - software development
  - site meta

---

Nearly any time I mention my slow but steady progress on building my own tool for building my website, I get questions of the form, “Why not <some existing tool>?” Most recently, for example, “Why not use Astro?”; in the past, “Why move off of 11ty?”; and so on. These are invariably written kindly and from a place of reasonable curiosity, so I don’t begrudge them a bit. Here’s what I wrote in reply to the most recent such email:

Astro is great, and is one of the tools I would recommend to other folks who want to build their own <abbr title="content management system">CMS</abbr> or similar. For my part, this somewhat quixotic journey is one I have been slowly walking for a decade. A big part of it is the fact that I simply always find the limits of every other tool, often in part because of its need for generality. One of the wins of building your own tool is that it can be as narrow and specific as make sense for your own purposes, and that’s helpful for me. I also really enjoy having it be written in Rust end-to-end, both because of the performance benefits and because if I’m going to work on a project like this, I would much rather write Rust than <abbr title="JavaScript">JS</abbr>/<abbr title="TypeScript">TS</abbr>.

---

To this I’ll add: I am and have been using 11ty successfully for over 6 years now, and I used Pelican for a similar span before that. I *think* I’ll probably be able to use my own generator for everything by the end of this year—an exciting prospect. But it obviously hasn’t been a hard blocker for me to be using off-the-shelf tools.
