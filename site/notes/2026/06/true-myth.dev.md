---
title: true-myth.dev
subtitle: Giving this project its own proper home at last!
date: 2026-06-03T22:10:00-0600
image:
  cdn: true-myth-growth.png

tags:
  - software development
  - open-source software
  - TypeScript
  - True Myth

---

Took a bit of time this evening and got [true-myth.dev](https://true-myth.dev) up and working! It has lived at a [js.org](https://js.org) site for many years, and that was wonderful (seriously, much credit to those folks!) but as I’ve slowly pushed this project toward being a bit more “professional”, it felt right to give it its own home.

If you’re curious, the docs stack now:

- Registered at Hover
- Code still lives on GitHub (for now)
- Build and publish happens on Buildkite (where I expect to move *all* of True Myth’s CI over the next few weeks)
- The docs themselves are published to a Cloudflare Worker

([Separation of concerns!][separation])

[separation]: https://v5.chriskrycho.com/notes/separation-of-concerns/

The docs site itself is built with [Vitepress][vp], and I have some in-flight work to make that even better thanks to some great suggestions from users of the library (interactive syntax highlighting with Shiki, type checking all the code, etc.). It’s fun to see this project slowly gain traction!

[vp]: https://vitepress.dev
[shiki]: https://shiki.style

At no point has True Myth ever seen explosive growth. Just very slow and steady uptake since [Ben Makuh][ben] and I started building it all the way back in September 2017.

![True Myth’s slow-but-steady growth curve](https://cdn.chriskrycho.com/images/true-myth-growth.png "An npm-stats monthly download stats chart for true-myth from initial release in October 2017 to the present, with slow-but-steady growth uptick over time.")

[ben]: https://benmakuh.com

There was that funny little dip back in late 2023 (no idea what happened there), and it *has* seen a pretty significant bit of growth over the past year and a half—likely in part because I started putting significant work into it again—but still: a slow-burn success story!

(A *small* success, to be clear. If you pull up [the comparison](https://npm-stat.com/charts.html?package=true-myth&package=zod&from=2017-10-01&to=2026-05-31) with [Zod][zod], True Myth looks like a flat line, even with its recent uptick.)

[zod]: https://zod.dev