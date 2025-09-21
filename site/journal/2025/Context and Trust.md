---
title: "Context and Trust, or: Test Suites Reflect Teams"
subtitle: |
  A mild rejoinder to [Brandur](https://brandur.org)’s recent [mini-rant on testing speed](https://brandur.org/nanoglyphs/043-rails-world-2025), and a meditation on scaling groups of people and products.
  
qualifiers:
  audience: |
    Software developers broadly familiar with automated testing.

tags:
  - software development
  - testing

summary: >
  Brandur pokes hard at some big tech companies’ test suite times with 37Signals as his example. I’m not so sure. Why? Context and trust.

date: 2025-09-21T15:25:00-0600

---

I like [this newsletter issue][issue] about [Rails World 2025][rw] from [Brandur][site] for its reminder that the things large software teams often take as necessities when it comes to our test suites… may not be. Citing [<abbr title="David Heinemeir Hansson">DHH</abbr>][dhh]’s keynote, Brandur notes the many upsides of 70-second test suites that only run locally: no cloud <abbr title="continuous integration">CI</abbr> system, just a local script that signs off on a commit that the test run passed. That sounds extremely attractive![^work]

[issue]: https://brandur.org/nanoglyphs/043-rails-world-2025
[rw]: https://rubyonrails.org/world/2025
[site]: https://brandur.org
[dhh]: https://world.hey.com/dhh

[^work]: My number one focus at work right now is working on our test suite. The thought of a 70-second test run that can just happen locally and be merged on that basis is pretty compelling compared to the 15-minute runs on only-mostly-reliable cloud infrastructure we actually have. I expect to spend some time this week chatting with folks about some of the questions Brandur raised.

When I read this paragraph, though—

> 70 seconds test times for a large real world app. That’s better than Google, better than Apple, better than Dropbox, better than Netflix, and better than Stripe, likely by 10-100x. A test suite that fast keeps developers happy and productivity high. And all in Ruby! One of the world’s slowest programming languages.

—and especially when I read Brandur’s follow-on comment about transitioning to cloud <abbr>CI</abbr> systems from running locally—

> I can’t say exactly how senior engineers rationalize the change, but I can imagine how the conversation goes. Something along the lines of, “We’re just too smart/too sophisticated/have too many special requirements to be running things on laptops now. We are web scale. We have to use the cloud.”

—a few rejoinders come to mind.

First, note the _ad hominem_: engineers who make this decision must be justifying it in self-congratulatory terms about the complexities of their systems. Well… maybe. Maybe not. The rhetorical move here does a lot of work in the rest of the piece, and you should account for that in reading the rest of Brandur’s post.

Second, the size of both your organization and your codebase matter a great deal for what your test suite *can* be like. <abbr>DHH</abbr> is talking about his experience working on the apps at [37Signals][37s]: mostly Basecamp and <span class='all-smcp'>HEY</span>, these days. Those are relatively small apps, with relatively small teams working on them. They are not necessarily comparable to the apps Brandur compares them with.

[37s]: https://37signals.com

If you are inclined to reply that more products should be built with small teams and with restraint in their feature set, you will get no argument from me. [I agree][product-size], vehemently. Nonetheless, not all products should or even can be built that way. I am not sure Vanta could, for example. Certainly the version of Vanta that could be built that way would have a wildly different position in its market. Most plausibly it would simply not survive against its well-funded competitors if it operated that way. Some products are very complex by nature, and however much one aims to keep the *model* as simple as it can be, the domain itself often resists simplification. [Reality has a surprising amount of detail.][salvatier] Thus, some software *will* have a larger and more complicated feature set, with correspondingly larger groups of people developing them.

[salvatier]: http://johnsalvatier.org/blog/2017/reality-has-a-surprising-amount-of-detail

Processes that work well in smaller teams or on smaller apps often fare poorly when applied to larger teams or apps. The reason is the same for both team size and app size: the exponential growth of system complexity. A good test suite must change in scale and makeup to handle the resulting combinatorial explosion of interactions.

[product-size]: https://v5.chriskrycho.com/journal/mozilla-and-pocket/

Third, and closely related: As team size grows, context drops and therefore trust does likewise. I do not mean that people will always or even usually *mistrust* each other. Rather, big groups nearly always lack the active, positive trust born of working closely with someone. This is not a failing of software teams in particular; it is true of all large projects. This is why politics (in the most general sense) exists: we need mechanisms beyond personal cachet to coordinate in environments where we do *not* share that kind of context.

[dunbar]: https://en.wikipedia.org/wiki/Dunbar%27s_number

Concretely: I do not use any kind of linter on my personal TypeScript projects, but/and I think linting is essential for large teams with uneven distribution of skill. The distribution element here matters: if you could guarantee that every subteam had someone with high skill and the leadership chops both to level up their team and enforce high quality, then those people can act as the nodes in a smaller high-trust network. Very few organizations have that kind of even distribution, though. Thus, tools and practices like linting end up being essential for sharing knowledge and best practices,[^teaching] as well as for enforcing norms and providing guardrails to prevent certain problems.

[^teaching]: I use linting a *lot* to teach across an organization that is larger than I can single-handedly mentor, or even than I can effectively mentor via mentees.

We can use this to evaluate <abbr>DHH</abbr>’s comments about how 37Signals tests their code. 37Signals is a small, high-cohesion team with consistently high expertise. That gives them options for the design of their test suite that other teams may not have. They likely need fewer tests and of a different mix of test kinds than does a larger organization. The same goes (and even more obviously) for the size of their application. By the same token, we can similarly evaluate the claims Brandur criticizes from larger organizations: maybe, given their broader organizational dynamics, these longer-running and slower test suites *are* at least within an order of magnitude of what they can do.

Again, I fully grant that these are in fact strong arguments for keeping your team small and even for limiting the size of your product! But thinking this way might give us reason to suspect that Stripe’s test suite is not large and slow *only* because no one cared to (or believed that they could) make it really fast.

To reiterate, I *like* the reminder that things can be faster and better than we often allow. It is very useful to ask, “What would it take to make our test suite 10× faster than it is? What would it take to make it *100×* faster?*” Very often we end up with much worse systems than we could have simply because we take the _status quo_ as a given. There is often a great deal of [low-hanging performance fruit][dl0]. But there are also very often a lot of [hidden complexities][dl1] involved in [even the most seemingly “basic” things][dl2], and for the complexity of those systems [large sets of tests can be invaluable][dl3]. And at the top of the list is the sheer size and structure of an organization.

[dl0]: https://danluu.com/metrics-analytics/
[dl1]: https://danluu.com/sounds-easy/
[dl2]: https://danluu.com/file-consistency/
[dl3]: https://danluu.com/tests-v-reason/
