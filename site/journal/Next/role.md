---
title: "Next: Role?"
subtitle: Ratchets over levers.
series:
    part: 1

date: 2023-11-12T21:45:01-0700

tags:
    - software development
    - career

qualifiers:
    audience: >
        Anyone interested in my thoughts on the next phase of my career—but *especially* anyone who might want to work with me.

summary: >
    Software keeps “eating the world”—so quality matters! We must build, and teach people how to use, ratchets: to permanently raise the bar.

image: https://cdn.chriskrycho.com/images/ratchet.jpg

---

{% callout %}

Part of a series on what’s next for me:

1. [**Next: Role?**](/journal/next/role/) (this post): for those curious about where I am heading next… including folks who might want to hire me.
2. [Now: Sabbatical](/journal/next/sabbatical/): for those interested in how I am spending this sabbatical.
3. [Past: Leaving LinkedIn](/journal/next/leaving-linkedin/): for those interested in why I am on this new path.

{% endcallout %}

I love building software. I did not expect this when I started, and I did not come to this career with a great deal of purpose at first. Programming was just a good-enough job I could land with a physics degree in hand straight out of college. It has become a lasting passion, though. I told my wife recently: I can imagine a world where I worked full time as a composer… but in that world I would be still writing software as a hobby on the side, because it is such a joy to me.

Software is also incredibly important to the world as it is—whether you like it or not. I think often of Marc Andreessen’s line that “software is eating the world”: for so it is. Where a venture capitalist sees that primarily in terms of the enormous piles of money it represents, though, I see it in terms of the many people who use software not by choice but necessity. For every person like me who really enjoys digital technologies and puts them at the center of their work, there are many others for whom computing is at best ancillary to their actual work, indeed for whom it might just be in the *way* of doing their real work.

Think of the person cutting your hair: the software in the point-of-sale system. Think of a single parent wrangling school activity schedules through Facebook. Think of the Uber driver. Think of people making a living selling craft-work on Etsy. Think of the small businesses who have to advertise on Instagram. Think of the people just trying to pay for parking on the way to do something else.

Those of us who practice software engineering owe it to all of those people to make software which works well, which works *for them*. Period.

“Solving” the problem of poor software craft is an impossible problem. I mean that: *impossible*. Poor craft is the result of massive systemic problems as well as many individual failures. It will always exist, because people will remain people: sometimes lazy or unmotivated or just stressed out by other things going on in their lives, sometimes greedy and short-sighted and foolish.

We can make it *better*, though.

I increasingly value tools and processes which do one of two things:

- “Raise the floor”: cutting down both the number and severity of bugs we ship.
- “Raise the ceiling” by making it possible to deliver more interesting features.

There are many such: processes like code review, techniques like <abbr title="test-driven development">TDD</abbr> and <abbr title="domain-driven design">DDD</abbr>, and correct-by-construction <abbr title="application programming interface">API</abbr> designs; tools like formal modeling; improvements in our programming languages; formal verification; and so on.

Unfortunately, many of these techniques enable and sustain progress only so long as everyone can operate like a very senior engineer on her best days. All of us should strive for that kind of excellence—but not one of us is always at our best. What is more, many of us have a long way to go before we are even able to operate that way. Every one of us started out as a junior engineer, after all.

The real wins, then, are tools which do not require everyone to be at their best at every moment: *ratchets*, not *levers*. Levers let you move things, but if you are holding something up with a lever, you have to keep holding it—forever. A ratchet lets you drive forward motion *without* slipping back as soon as you let up on the pressure.

This is why I care so much about [Rust](https://www.rust-lang.org). This is why I spent so much of the past decade working on [TypeScript](https://typescriptlang.org) adoption. This is even why I invested in the work I did on Ember Octane and [produced so much material about it](https://v5.chriskrycho.com/topics/ember). Each of those was (and is!) just such a ratchet, albeit to varying degrees and in various contexts. Rust is a particularly good example: it lets us ship faster software[^1] with fewer bugs in areas that really matter, and it enables a *lot* more people to do that kind of work than were able to do so (especially: to do so *safely* for their users) with C and C++. You can trust a junior to ship high-performance “close-to-the-metal” code written in Rust without worrying about memory safety; your team can focus more on architecture than on running valgrind. It is a ratchet.

Ratchets are incremental improvements, not silver bullets. So was structured programming, though. A change does not have to be a silver bullet to be valuable. It just has to make for better software—and critically, better software that does not require you to be always at your best. Fewer `SEGFAULT`s and fewer vulnerabilities as a result of memory safety is good. Fewer cases of “`undefined` is not a function” is good. [Faster cycle times](https://v4.chriskrycho.com/2018/scales-of-feedback-time-in-software-development.html) on identifying and fixing bugs is good.

So what I am doing next? Hopefully, making a ratchet—and teaching people how to use it, because that combination of craft and education is what I love most, and what I am best at.

If that’s the kind of thing you’re building—big company or startup, big idea or small-but-awesome—[say hello](mailto:hello@chriskrycho.com?subject=Ratchets)!

[^1]:	And fast software is [the best software](https://craigmod.com/essays/fast_software/ "“Fast Software, the Best Software: On the benefits of speedy software, and how it affects user perception of engineering quality and overall usability”, by Craig Mod").
