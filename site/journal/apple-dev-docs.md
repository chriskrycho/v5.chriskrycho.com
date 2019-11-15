---
title: Apple, Your Developer Documentation is… Missing
slug: apple-your-developer-documentation-is-garbage
subtitle: If you want developers to love your platform, then you need to take this seriously. If it isn’t documented, it isn’t done.
date: 2019-10-28 07:25:00
modified: 2019-10-28 08:10
tags: [Swift, iOS, macOS, software development]
summary: >
    The current state of Apple’s software documentation is the worst I’ve ever seen for any framework anywhere. Apple needs to fix this—now.
audience: practitioners or interested lookers-on for software development—and Apple itself.
canonical: https://v4.chriskrycho.com/2019/apple-your-developer-documentation-is-garbage.html

---

<i><b>[Assumed Audience][aa]:</b> practitioners or interested lookers-on for software development—and Apple itself.</i>

[aa]: https://v4.chriskrycho.com/2018/assumed-audiences.html

<i class=editorial><b>Edit:</b> some folks [rightly pointed out][hn] that my use of "garbage" suggests that the problem is the quality of the existing documentation; I've retitled the post to capture that the problem is the *massive absence* of documentation. You can see the original title by way of the slug.</i>

[hn]: https://news.ycombinator.com/item?id=21377100

Over the past few months, I have been trying to get up to speed on the Apple developer ecosystem, as part of working on my [<b><i>re</i>write</b>][rewrite] project. This means I have been [learning] Swift (again), SwiftUI, and (barely) the iOS and macOS <abbr title='application programming interface'>API</abbr>s.

It has been *terrible*. The number of parts of this ecosystem which are entirely undocumented is frankly shocking to me.

Some context: I have spent the last five years working very actively in the JavaScript front-end application development world, working in first AngularJS and then Ember.js. Ember’s docs once had a reputation of being pretty bad, but in the ~4 years I’ve been working with it, they’ve gone from decent to really good. On the other hand, when I was working in AngularJS 5 years ago, I often threw up my hands in quiet despair at the utter lack of explanation (or, occasionally, the *inane* explanations) of core concepts. I thought that would have to be the absolute worst a massive tech company (in that case, Google) providing public <abbr>API</abbr>s could possibly do.

I was wrong. The current state of Apple’s software documentation is the worst I’ve ever seen for any framework anywhere.

Swift itself is relatively well covered (courtesy of the well-written and well-maintained book). But that’s where the good news ends.[^not-just-me] Most of SwiftUI is entirely undocumented—not even a single line explanation of what a given type or modifier does. Swift Package Manager has *okay* docs, but finding out the limits of what it can or can’t do from the official docs is difficult to impossible; I got my ground truth from Stack Overflow questions. I’ve repeatedly been reduced to searching through <abbr title='World Wide Developer Conference'>WWDC</abbr> video transcripts to figure out where someone says something relevant to whatever I’m working on.[^transcripts]

This is, frankly, unacceptable. In the Ember ecosystem, we have a simple rule that code doesn’t get to ship unless it’s documented. The same goes in Rust (I should know: I [wrote][docs-rfc-PR] the <abbr title='request for comments'>RFC</abbr> [that made that official policy][docs-rfc-text]). Now, I understand that Apple’s <abbr>API</abbr> developers (often) work in a different context than these open source projects—especially in that they face crunches around releases which are tied to hardware products shipping.

But. At the end of the day, when you’re vending an <abbr>API</abbr>, it isn’t done until it’s documented. Full stop.

Given what I know of Apple’s approach to this, the problem is not individual engineers (who are not responsible for writing docs) or even the members of dedicated documentation teams (who *are* responsible for writing docs). But that does not make it any less a failure of Apple’s engineering *organization*. The job of an <abbr>API</abbr> engineering organization is to support those who will consume that <abbr>API</abbr>. I don’t doubt that many of Apples <abbr>API</abbr> engineers would *love* for all of these things to be documented. I likewise do not doubt that the documentation team is understaffed for the work they have to do. (If I’m wrong, if I *should* doubt that, because Apple’s engineering culture *doesn’t* value this, then that’s even worse an indictment of the engineering culture.) This kind of thing has to change at the level of the entire engineering organization.

Apple claims to be interested in building a platform that is accessible to everyone—from a brand new developer to the most experienced gray-haired folks who’ve been around since the NeXT days. Right now, they’re not even close. I have a decade of software development under my belt, a fair bit of it in languages with rich type systems and functional programming idioms, and some of this stuff is hard for *me* to figure out. I can’t imagine how mind-bogglingly terrible the experience would be for someone just starting in software, or coming over with experience only in languages like Ruby or Python or JavaScript. It would be completely impossible to learn.

Apple, if you want developers to love your platform—and you should, because good developers are your lifeblood—and if you don’t want them to flee for other platforms—and you should be worried about that, because the web is everywhere and Microsoft is coming for you—then you need to take this seriously. Adopt the mentality that has served other frameworks and languages so well: ***If it isn’t documented, it isn’t done.***

[learning]: https://v4.chriskrycho.com/2019/rewrite-dev-journal-how-progress-doesnt-feel.html
[rewrite]: https://rewrite.software
[docs-rfc-PR]: https://github.com/rust-lang/rfcs/pull/1636
[docs-rfc-text]: https://rust-lang.github.io/rfcs/1636-document_all_features.html

[^not-just-me]: I am not the only one who has noticed this. [No Overview Available](https://nooverviewavailable.com) summarizes the extent of documentation in Apple’s <abbr>API</abbr>s and… it’s not a good look. Hat tip to [Lobste.rs user wink](https://lobste.rs/u/wink) and my friend [Jeremy Sherman](https://jeremywsherman.com), who both noted this.

[^transcripts]: Credit where credit is due: it is genuinely excellent from an accessibility and general usability standpoint that Apple has these transcripts. However, they’re not a substitute for *documentation*!
