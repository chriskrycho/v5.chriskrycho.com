---
title: "2023 in Review: Professional"
date: 2023-12-28T16:25:04-0700
series:
    part: 5

tags:
    - career development
    - LinkedIn
    - learning
    - TypeScript
    - Ember

summary: >
    This year was *wild* for me professionally. I started the year cautiously optimistic… and ended it by quitting my job and moving on in open source.

---

This year was *wild* for me professionally. I started the year cautiously optimistic:

> I will be very curious to see how I feel come the end of 2023! For now, I will simply close by noting how delightful it is to be a matter of weeks from my 4-year anniversary of starting at LinkedIn: this is already substantially the longest I have stayed at any job. I no longer feel like I am “just getting started” but I do still feel like there is a lot of opportunity ahead, and indeed more opportunity than there was when I started, thanks to the work my colleagues and I have done over the years in between. That is a really nice spot to be.

Eight months later, I quit LinkedIn, having barely avoided both rage-quitting in the early spring or burning out in the fall. It turned out that when I returned to work 2 weeks after publishing those words, I dropped right into a fire that got significantly worse before it got better: memory leaks in server infrastructure related to the web client. I spent the first three months of the year leading a team of a dozen engineers to fix that—and, critically, fixing it far more robustly than had similar efforts in the past. We added layers of resilience *and* observability to the server components of the system. We implemented lints in our client-side code to rule out whole swaths of failure modes we had identified. Our retro/postmortem was incredibly thorough and robust.

And I came out of it (a) exhausted by the work itself, which was not the kind of work I love, and (b) frustrated by the way the broader organization failed to recognize, still less to value appropriately, the work we had done. That combination was, to say the least, demoralizing. When the company decided shortly thereafter to subject my team to a fairly nasty re-org, then to embark on what I still judge to be one of the more obviously wrongheaded technical directions I have seen in my nearly 15 years of writing software professionally—and I have *seen* some things before this—well…

I also had an illuminating conversation with my now-former boss (hey Adam!) at my mid-year review. He noted that despite my oft-stated interest in our being more innovative, I was unenthusiastic about a lot of notionally innovative efforts floating around the company—e.g. the various big pushes for <abbr title="large language model">LLM</abbr>-based features. As I put it to him then: I am motivated specifically by innovations which raise the quality floor, ceiling, or preferably both. I care, as I put it in [Next: Role?](https://v5.chriskrycho.com/journal/next/role/), about ratchets. None of the things on offer at LinkedIn looked like ratchets.

Put those pieces together, and there is a reason I started allocating budget early in the year to afford myself a sabbatical and some time to look for a job which is a better fit next time around.

----

Reviewing my work notebook over the past hour was quite illuminating.

As I wrote in my work notebook one day in May:

> What the heck do I even want to do? What actively brings me joy in programming? I *like* building things, but not “features” so much as libraries. I *like* teaching. I *like* FP. I like trying to improve the *craft* of our discipline. I *like* having time to think deeply about problems and solve them *well*—so they *stay* solved. I *like* caring about and being able to celebrate & support the product I work on. I *like* learning. I *like* type systems. I *like* helping mainstream/popularize newer ideas more than trying to push forward JS/Java/etc. I *dislike* management-heavy/-run orgs. I *dislike* *pure* profit-maximizer companies. I *dislike* places which reward political savvy over competence in the domain and excellence in the craft.

(Yes, too much emphasis. But that’s what I wrote.)

As I put it to a friend a few days ago, there are limits to how good we can make things with the limits of technologies like Java or JavaScript. That does not mean they are not worth investing in. But their technical limitations and affordances produce both cultural and creative limitations and affordances. We can improve them to a real degree—but only so far. There is a real shift in going from C++ to Rust, or from C^♯^ to F^♯^, in terms of our ability to raise the floor or the ceiling quality-wise.[^1] Floor-and-ceiling-raising is what gets me up in the morning, though. As I put it in that quote from my notebook above: solving problems so they stay solved.

----

This was the year we—at last—published stable types for Ember.js. I spent a non-trivial chunk of my time after that memory leak mess getting that capability across the line. It meant everything from massive internal refactors to the framework, needful for half a decade or more, to building an absolutely horrific pile of nightmare fuel as a “build script”. But a well-documented horrific pile of nightmare fuel, which will be easy to delete if Ember ever gets around to paying off the related tech debt which necessitated it. (If I had tried to fix *that*, I would still be working on it.)

When I started working on TypeScript support for Ember all the way back in December 2016, I was distinctly not “qualified” for the job. I had been working in Ember for less than a year, and I had been writing TypeScript *at all* for a whopping two or three months. I was not coming from nowhere, to be fair: unlike many folks in the front-end world, I had spent a lot of time over the first five years of my career writing a mix of typed languages (including C, C++, and Fortran—yes, Fortran), and since 2015 had been mucking around with Rust, Haskell, Elm, PureScript, F^♯^, and so on. Types were not new to me. But TypeScript was!

It was not ego but desperation driving me, though. I *knew*—from Rust and Elm especially—that there were many, many bugs in our app that simply did not have to be there. I also knew, from my attempt starting a few months earlier to add types to our app using [Flow](http://flow.org), that these languages could catch a *lot* of low-hanging fruit in terms of those kinds of bugs.[^2] I was sick to death of the bugs that I knew Flow or TypeScript could catch. So I just… started.

I had no idea—really, no idea—how much work I had signed myself up for. I also had no idea just how satisfying it would be, or how much it would change the trajectory of my career. I ended up on the Ember Framework team largely because of that work (and [the related efforts it motivated](https://v5.chriskrycho.com/journal/ember-template-imports/)). I ended up at LinkedIn because of that work, and it was a significant part of the case for my promotion to Senior Staff in 2021. I learned an incredible amount technically, plumbing depths of type systems arcana I could not have imagined when I started. I also learned a huge amount about what it means to lead in the kind of incoherent, <i>ad hoc</i> community that any open source project ultimately is.

I am incredibly glad to have done it. I am also, honestly, relieved to have it behind me. I left the Ember Framework team in May and the Ember TypeScript team in September. I do not expect to use Ember going forward, nor to contribute to it in any way. Although I am grateful for all I learned in that little ecosystem, I am very much ready to focus my attention and efforts elsewhere. I still check in on the Discord and on GitHub every once in a while to see if there is any area where my specific knowledge is needed, but less and less frequently. A chapter closed.

----

I feel good about the work I did in 2023, both internally and in open source. I also feel good about the decision to leave LinkedIn. Not happy, to be clear—but good. I wanted LinkedIn to be a place I could stay longer and grow more. Alas! I am proud of my tenure there, proud especially of the number of engineers who told me that I inspired them or helped them grow, proud most of all of the recurring refrain that I had made the technical culture of “the big app” far friendlier and more welcoming—a place where anyone could safely ask a question and not be made to feel dumb but rather encouraged and helped.

And now? Something new. Here’s to 2024.

[^1]:	I wrote another version of this take [all the way back in 2018](https://v4.chriskrycho.com/2018/javascript-is-c.html). I am nothing if not consistent!

[^2]:	I started out looking at Flow instead of TypeScript because, when I started looking at it, Flow had features <abbr>TS</abbr> did not that were hard necessities for Ember support—and because, unlike TS, it did actually aim to be a sound type system. But I concluded, once TS got the relevant features, that between Microsoft and Facebook, Microsoft was the team to bet on in terms of successfully driving a programming language forward. Facebook’s track record was already a bit spotty on that front, whereas Microsoft had decades of experience in exactly that space. That choice looks obviously correct in retrospect—but it was distinctly not obvious at the time: Flow was a real competitor and some of its choices really pushed TypeScript to reevaluate some of its earlier decisions.
