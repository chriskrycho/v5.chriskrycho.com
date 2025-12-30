---
title: “Invalid Email Address” Error in Apple Mail
subtitle: |
  Talk about poor <abbr title="user interface">UI</abbr> design!
date: 2025-12-30T11:23:00-0700
tags:
  - Apple
  - software development

---

Back in November, I had cause to update my password in Apple Mail on my iPhone,[^mail] and ended up seeing a thoroughly inscrutable error: “Invalid Email Address”. Seeing as I had not changed the email address used for the account settings, only the password, this made absolutely no sense.

The problem, it turned out, was that I had aliases set up with which I can reply, because I have multiple domains that run through the same email account transparently. The solution was to remove all of the aliases and retain only the main email address for the account, confirm the password change, and then add back the aliases.

This is a terrible error message, and frankly a dumb design(I would just call it a bug, in fact!), But hopefully this explanation and work around will help someone else out there.

[^mail]: I’d also love to have a better email app but for my purposes—using <abbr title="Internet Message Access Protocol">IMAP</abbr> with [Fastmail](https://join.fastmail.com/4dcac080) (_n.b._: affiliate link)—or <abbr title="JSON Meta Application Protocol">JMAP</abbr> even!—nothing I have tried is better and most are worse. Alas, we find ourselves in a world of stagnant app development.
