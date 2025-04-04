---
title: Userscripts for macOS and iOS
subtitle: A handy little app for customizing JavaScript and <abbr title="cascading style sheets">CSS</abbr>.

date: 2025-04-04T10:58:00-0600

tags:
  - JavaScript
  - open web
  - web development

qualifiers:
  audience: |
    People interested in making the browser “their own”; assumes a little bit of knowledge (but only a little!) about JavaScript and <abbr title="cascading style sheets">CSS</abbr>.

---

One of the superpowers of the browser has always been the degree to which it allows the user to customize its behavior. The web in general, and browers specifically, have long baked this in, little though we think about it: a browser is a “user agent”. It does things on the user’s behalf, and at the user’s behest.

In [my previous note][prev], I showed how to use a particular JavaScript <abbr>API</abbr>, and mentioned that the motivation was fixing up the way the text was rendered on a particular website. Immediately after writing that up, I decided I wanted to make sure *any* time I read that website, it had that change applied. This, I have long known was the domain of “user scripts”—but I have never actually used a user script!

[prev]: https://v5.chriskrycho.com/notes/nodewalker-in-javascript/

Next move: search DuckDuckGo for “per-site user scripts safari”. The first page handily included a link to the open-source project [quoid/userscripts][qu], which is the source for a Safari web extension. Cool: I popped open [the App Store link][app], installed it, enabled the extension and gave it full permissions, and dropped the script from that previous post into the script with a `match` rule of the relevant website, and… that was it. Now to go install it on iOS and iPadOS, too!

[qu]: https://github.com/quoid/userscripts
[app]: https://itunes.apple.com/us/app/userscripts/id1463298887

Bonus note: I have used [Cascadea][c] for a few years for user styles on macOS, and it’s a nice little app, but there has never been an iOS version of it. I may be switching all my user styles over to the userstyles app instead, because it *does*, and I would love to be equally able to apply a user style on iOS as on macOS!

[c]: https://cascadea.app
