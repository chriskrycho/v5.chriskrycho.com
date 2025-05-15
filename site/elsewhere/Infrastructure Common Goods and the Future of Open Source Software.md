---
title: Infrastructure, Common Goods, and the Future of Open Source Software
subtitle: My LambdaConf 2025 Opening Keynote

summary: >
  Open-source software is infrastructure—but weird infrastructure. It is high time we started treating it accordingly.

date: 2025-05-13T17:50:00-0600
updated: 2025-05-15T06:55:00-0600
updates:
    - at: 2025-05-15T06:55:00-0600
      changes: >
        Added a bunch of links and filled in some abbreviations.

qualifiers:
  audience: >
    People with a basic understanding of what open-source software is and how it works. I assume rather than explain it in this talk!

image:
  cdn: talks/lambdaconf-2025/001.png

featured: true

tags:
    - software development
    - talks
    - public speaking
    - open-source software

sources:
  chachra:
    author: Deb Chachra
    title: How Infrastructure Works
  websters:
    title: Webster’s Unabridged Dictionary
    year: "1913"
  jacobs:
    author: Alan Jacobs
    title: |
      Attending to Technology: Theses for Disputation
    year: 2016
    link: https://www.thenewatlantis.com/publications/attending-to-technology-theses-for-disputation

---

I was delighted to deliver the opening keynote at LambdaConf 2025 on May 12, 2025. What follows are the slides and script for the talk. I will also add a link to the video once it is available.

<details><summary>A note on slide image alt text</summary>

The slide images do not have any alt text associated with them. This is not an oversight: I [go out of my way][slides-pe] to ensure that slides are merely visual “progressive enhancement” for the verbal material of the content. If you rely on alt text to understand images, you can simply *skip* all the images in this. If you’re someone who relies on screen readers or other assistive tech, or an accessibility expert, let me know: is there a preferred way to approach this? I considered going further and making the images `aria-hidden` or similar, but did not want to thereby accidentally make things *worse*.

[slides-pe]: https://v5.chriskrycho.com/journal/progressively-enhanced-talks/

</details>

As always with my talks, the script below is what I wrote ahead of time, but I always end up extemporizing a bit when giving the talk live, so this is a *script* and not a *transcript*.

-----

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/001.png" loading="lazy">

</section>

<section class="slide">

## The Log4j Incident

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/002.png" loading="lazy">

Back in 2021, one of the worst security vulnerabilities that we've ever experienced hit the industry: Log4shell. What happened?

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/003.png" loading="lazy">

At a technical level: Log4j is a logging library. It’s been a foundational element of the Java ecosystem for decades. It was quite reasonably designed to let you send data off to a remote server, but there was a way that you could could exploit that to actually execute code on a remote machine. (Thus: “Log4*shell*.”) This was, to put it mildly, *very bad*.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/004.png" loading="lazy">

At a social level: an engineer or a group of engineers at Alibaba identified and reported the vulnerability to the team that maintains Log4j, and the details of the vulnerability also leaked to the public—it’s unclear how or why—and so as the maintainers were  fixing it, one of the engineers at Alibaba infamously said, “Please hurry up” to them. The Apache Logging Services team confirmed the bug and did eventually fix it.

At the time, the Apache Logging Services was a group of 16 unpaid volunteers. Many of them worked nights and over a long weekend to deliver a fix *even though* they were unpaid volunteers. This was not their job, but they did it anyway.

Then, once the fix was out, the broader ecosystem worked to patch that vulnerability, as we just said. This was a huge effort, because the vulnerability affected about 8% of packages on Maven, per a Google analysis—which meant that in many cases you had to take the time to update a package and then update its dependents and update their dependents and then finally be able to patch it in your own app.  It took a while—weeks, months in some cases. (There are probably still some unpatched systems out there!)

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/005.png" loading="lazy">

<b>Log4j</b> a (digital) kind of infrastructure.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/006.png" loading="lazy">

It is therefore a common good.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/007.png" loading="lazy">

But, Log4j was built and maintained by unfunded volunteers. That situation has changed a little since 2021 for Log4j in particular, largely because of this incident—but not so much for many other projects which are similarly, quietly, load-bearing.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/008.png" loading="lazy">

And “load-bearing” is the right phrase, because what this points us to is the reality that increasingly open-source software is *infrastructure*.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/009.png" loading="lazy">

But open-source software is not like other infrastructure, it is *weird* infrastructure.

So if we are going to make open-source software work for us as infrastructure, we have to understand *how infrastructure works*, and *how open-source software works*, so that we can see *how* open-source software is *weird* infrastructure: and use that to start charting a path forward.

</section>

## Infrastructure

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/010.png" loading="lazy">

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/011.png" loading="lazy">

To begin, then, what is infrastructure?

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/012.png" loading="lazy">

When you think of “infrastructure”, you probably think of bridges, canals, and roads. You might think of freight: trains, boats, aircraft… the occasional wagon. You might think of power plants and electrical stations, plumbing and sewage and water treatment plants. And of course, the computing systems that run them. Notice that all of those are mostly “out of sight and out of mind”.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/013.png" loading="lazy">

Indeed, Deb Chachra, in her excellent book <cite>How Infrastructure Works</cite> suggests that this is almost the definition of infrastructure:

{% quote source=sources.chachra, location="p. 10" %}

What makes infrastructure infrastructure?

“All of the stuff that you don't think about,” turns out to be a surprisingly good starting point. For something to be considered infrastructure, its presence and characteristics are taken as a given.

{% endquote %}

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/014.png" loading="lazy">

“Taken as a given”: like Log4j. Indeed: like many pieces of open-source software. The internet runs on open protocols; most web traffic runs on open-source web server frameworks and libraries and tools and operating systems: React, Django, Java, Nginx, Linux. If there is a critical vulnerability or a serious bug in *any* of those, or for that matter in open-source tools that are widely used with them, it can ground airlines, bring down the power grid, cost businesses a literal fortune, and lose people their money and time and in the worst case their lives.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/015.png" loading="lazy">

And this is everywhere.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/016.png" loading="lazy">

I wrote this in an app called [Ulysses](https://ulysses.app), and I’m presenting it with Apple’s [Keynote](https://apps.apple.com/us/app/keynote/id409183694?mt=12), and all of this is happening on [macOS](https://en.wikipedia.org/wiki/Macos). Large chunks of these applications were written in an open-source language, [Swift](https://www.swift.org), with a bunch of open-source libraries. The [Clang](https://clang.llvm.org) compiler for both Swift and Objective-C is open-source. It uses the open-source [<abbr title="originally “low-level virtual machine”, now just an “orphaned initialism”">LLVM</abbr>](https://llvm.org) infrastructure. macOS is closed source but has an open-source core derived from the open-source [<abbr title="Berkeley Software Distribution">BSD</abbr>](https://www.bsd.org) project and [<abbr title="X is Not Unix">XNU</abbr>](https://en.wikipedia.org/wiki/Mach_(kernel)) which derives from the open-source [Mach kernel](https://en.wikipedia.org/wiki/Mach_(kernel)).

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/017.png" loading="lazy">

What is more, many of these projects have *significant* contributors from outside Apple. For example <abbr>LLVM</abbr> and Clang have both had huge amounts contributed by everyone from indie developers to Google—one of Apple’s biggest competitors.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/018.png" loading="lazy">

This contribution pattern is *extremely* common in open-source software. All sorts of software developers, including out-and-out rivals, working on common good.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/019.png" loading="lazy">

But this is also a very strange way to build *infrastructure*.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/020.png" loading="lazy">

It wasn’t funded like infrastructure. Unlike a bridge or a tunnel, no part of this was directly commissioned for public good—even the parts that benefited from public funding in one way or another like <abbr>BSD</abbr>. There was no official project by the State of California or the City of Sunnyvale to build a competitor to <abbr title="GNU Compiler Collection">GCC</abbr>.

And these were also not built using traditional *market* dynamics. <abbr>LLVM</abbr> is not for sale, and never has been. You cannot buy a license to Clang. Some open-source software licenses involve exchanges of money… but most do not!

</section>

## How Open-Source Works

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/021.png" loading="lazy">

So let’s talk a little about how the sausage actually gets made.

- Who makes open-source software?
- Why do they make it?
- Do they get paid for it?

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/022.png" loading="lazy">

*Who makes it* ranges from individuals to groups. I have personally maintained libraries solo or with one or two other folks, and I have contributed to projects with a half dozen “core teams” and hundreds of contributors.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/023.png" loading="lazy">

*Why we are making it* ranges equally widely: from learning a new technology, to fixing a bug in something we use, to sharing a solution we implemented for our jobs, to—*maybe*—making enough money to feed and house our families.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/024.png" loading="lazy">

*Whether we get paid* is yet another axis. Most open-source has zero money attached. Some projects, especially large and important projects, *do* have some funding these days, whether that's Open Collective, or GitHub contributions, or corporate funding. One common version of this is a firm paying people to work on open-source dependencies—whether the company’s employees, or funding external maintainers to make sure the library is well supported.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/025.png" loading="lazy">

Let’s focus in on *companies* that produce open-source software, there are multiple models common today:

- Using open-source as a way to *commoditize a complement*. That is: taking something that’s not part of the core of their product and making it free to undercut competitors, because when a good enough open-source version of something exists, it becomes very difficult to charge for that capability.

- Using open-source as part of a company's “funnel”. A company might build an open-source library that then they also make easy to run on their infrastructure. There are good ways and bad ways of doing that, but the important bit for our purposes that they’re not selling open-source software, they’re selling a product *via* open-source software.

- Open source as *the core product itself*. Here we see models like “open core”, or free-for-non-commercial-entities, or free-for-small-businesses. (“If you have more than that, contact our enterprise sales team.”)

- Charging for support. Here, open-source is notionally the product, but it is actually the human time and effort we charge for.

None of these are bad models for selling software, but most of them are very poor fits for *infrastructure*. The first two incentivize *competitive* rather than *cooperative* behavior. The latter two do better on that front, but still centralize points of failure.

</section>

## The Infrastructure Assumption

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/026.png" loading="lazy">

Let’s go back to the Log4j incident. It illustrates nicely what I call *the infrastructure assumption*. Most companies who used Log4j “adopted it” the way we “adopt” roads. A road is infrastructure, and we expect infrastructure to “just work”.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/027.png" loading="lazy">

This is one of the major challenges for *all* infrastructure. When it is working well, it fades into invisibility. Chachra again:

{% quote source=sources.chachra, location="p. 10" %}

Infrastructural systems are famously boring because the best possible outcome is nothing happening, or at least nothing unexpected or untoward.

{% endquote %}

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/028.png" loading="lazy">

But the infrastructure assumption also implicitly carries along the expectation that someone is *responsible* for ongoing maintenance on the software.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/029.png" loading="lazy">

*And* that they will therefore be “on the hook” to fix it if it breaks in some important way.

After all: that is generally true (at least in principle) for physical infrastructure.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/030.png" loading="lazy">

But this runs smack into two other realities of open-source software:

- the standard “no warranty” clause in open-source licenses.
- the lack of a *shared responsibility* for the software in question.

Looking at each of those in turn:

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/031.png" loading="lazy">

No warranty clauses have been part of open-source software licenses from the time they appeared. The authors of those early licenses seem to have been keenly aware of the legal regime around implied warranties in the United States in the late 1950s and early 1960s, particularly after the adoption of [the Uniform Commercial Code](https://www.uniformlaws.org/acts/ucc) in 1951, and went out of their way to disclaim warranties as a result. What this means in practice is that every company using open-source software has agreed to *waive* all expectations that the software in question is free of key bugs or vulnerabilities, and furthermore not to hold the authors responsible for them. But of course, that legal agreement is one thing; the panicked reality in the face of a severe vulnerability is another. You might not be able to hold the authors liable *legally*, but the social pressure can be enormous.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/032.png" loading="lazy">

And this is because of the second reality: the lack of a *shared responsibility* for the software. In real-world infrastructure, we *do* have shared responsibility for the infrastructure. In most Western democracies, we usually express that through taxes funding public works projects—both creating them in the first place and maintaining them afterward. So when something slots into “infrastructure” in our mental model, we can easily assume that there is someone in that role.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/033.png" loading="lazy">

With open-source software, that’s not true. There’s a *perceived* responsibility on the authors. But authors generally have—

- first of all no idea who all is using their code because of its infinite reproducibility,
- and secondly no legal relationship between them and the people using their code other than that grant via the open-source license,
- and third, broadly also no financial relationship with those users.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/034.png" loading="lazy">

In principle, this *could* (and we might be inclined to say “should”) mean that when a Log4j vulnerability is discovered, companies that use it should respond by fixing it themselves. But “Everyone fix it yourself” undermines against one of the the major reasons open-source software is so productive *as infrastructure*: shared solutions to common problems. That’s why we use open-source.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/035.png" loading="lazy">

So maybe we should instead entering into explicit legal and financial relationships with the maintainers to see it resolved? That has its own problems: building legal and financial relationships on the fly is difficult at best and may conflict directly with the existing employment of the contributors.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/036.png" loading="lazy">

Moreover, it comes with a whole set of coordination problems:

- How much is a fix worth?
- Which companies should pay for the fix?
- How much should each of those companies be responsible to contribute to that?
- Who is responsible for managing the collection and distribution of those funds?

So the *users* of a project like Log4j implicitly think of it like infrastructure, and *benefit* from its infrastructure-like properties. But because of the ways we build open-source software, the *creators* of projects like Log4j have none of the support systems we usually employ for physical infrastructure—even compared to the all-too-common case of significant underinvestment in physical infrastructure!

</section>

## Value

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/037.png" loading="lazy">

Now, when we talk about how value works, it’s easy to get derailed by the way large businesses get far more value out of open-source than they contribute back to it through their own work. But this is not necessarily unjust. Nor should it surprise us.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/038.png" loading="lazy">

Infrastructure is a kind of *public good*. And I don’t mean that in a hand-wave-y way; I mean it in a very specific way.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/039.png" loading="lazy">

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/040.png" loading="lazy">

Quoting Chachra again:

{% quote source=sources.chachra, location="p. 105" %}

\[“Public good”] has a very specific and distinct meaning: in contrast to a private good, a public good is nonrivalrous and nonexcludable. “Nonrivalrous” means that one person having access to or enjoying a good does not preclude other people from doing the same. “Nonexcludable” means that people can't be prevented from using and benefiting from it.…

Private goods have an obvious business model. Make the thing, sell the thing. There’s generally much less incentive for the private sector to produce nonexcludable goods, because if you can't prevent people from receiving a benefit and they no longer have a reason to pay for it, they presumably won't—the “free rider” problem. Too many free riders and too few paying customers means that the provider won't be able to make a profit if their business model is based on selling access to that benefit.

{% endquote %}

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/041.png" loading="lazy">

This is not to say that people do not deserve to be paid for their labors. Quite the contrary. There *is* something amiss in the way that some of the largest corporations profit enormously from open-source software without contributing meaningfully to its funding. Notice, though, that companies like Apple or Google do also contribute *significantly* to open-source software in ways that do not redound directly to their bottom line. The fact that these things benefit them indirectly is not a reason to sneer, either. We all benefit from infrastructure; that is why we build it!

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/042.png" loading="lazy">

As Chachra comments a bit later:

{% quote source=sources.chachra, location="p. 120" %}

Infrastructural systems, by their nature, are more than just technical; they're inextricably social and political because they are intrinsically collective. … Because they incorporate nonmonetary externalities, both positive and negative, they can't easily be valued or assessed like a consumer good, where it’s “worth it” to buy something or not. So they don't lend themselves to decision-making that focuses solely on the costs or the returns on investment.

{% endquote %}

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/043.png" loading="lazy">

When we say that “open-source software generates massively more value than it captures”, we have already adopted a specific point of view. “Value captured” and “value generated” are not *value-neutral* terms. Rather, they reflect a *market* view.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/044.png" loading="lazy">

That’s fine so far as it goes—but not when it devolves into what thinker and writer Alan Jacobs [calls](https://blog.ayjay.org/tag/metaphysical-capitalism/) “metaphysical capitalism”: the re-conception of *every* act as a *market* act, indeed the reduction of every act to market acts. You don’t have to reject markets or indeed capitalism to think that treating everything in market terms is bad. No one should characterize a marriage in terms of value captured or value added!

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/045.png" loading="lazy">

What is striking and distinctive about open-source software is thus *not* the fact that it “creates much more value than anyone captures from it.” That is the norm for public goods like infrastructure! No, what is striking and distinctive are three ways open-source is created very differently from physical infrastructure:

- Without explicit coordination at a societal level, often with a minimum of coordination.

- Without public funding, and sometimes without any explicit funding at all.

- *How* the free rider problem shows up—not in the software itself, the thing we are ostensibly providing, but in the time required to create, and maintain that software.

That last bit deserves some expansion. Software—*all* software—is by definition a non-rivalrous good. It is infinitely replicable at effectively no cost. (No *marginal* cost.) And it is by default also non-excludable: we have to work to impose costs on its use. This goes double for open-source software. As a rule, it is provided for free: as such, it actively invites the free rider problem.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/046.png" loading="lazy">

Its dynamics are the same as those of normal infrastructure, but exaggerated. A water system is not infinitely replicable. Log4j is. In other words, software, especially open-source software, is *naturally* a common good. That is *remarkable*!

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/047.png" loading="lazy">

People’s time is exactly the inverse. It is completely rivalrous, completely excludable. It is not a resource that we manage! (Treating people as resources is metaphysical capitalism!) Our time, in a very real sense, is our *life*. It is as private as goods get. But it is maintainers’ time for which open-source software creates infinite demand. There is always another issue to triage, always another bug fix, always another feature request to implement.

This dynamic, too, is in play with normal infrastructure. A water system, though, we pay people to build and maintain. Log4j—well, at least in 2021—, we did not.

</section>

## Polity

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/048.png" loading="lazy">

This next bit is going to be political, but not in a narrow or partisan sense; rather, in the sense of *polity*. How groups of people work together. Polity is at the root of politics, not merely in some banal etymological sense, but in the sense that getting people to work together for mutual good is one fundamental part of what politics *is*. But the word “polity” also applies to many things outside our normal sense of “politics”. It’s the word for how churches are structured: do they have bishops, or are they ruled by the democracy of a congregation? Likewise, we could speak of the polity of a fraternal order, or of a social club.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/049.png" loading="lazy">

A polity, to quote an old dictionary (and look: I hate quoting dictionaries in talks, but sometimes *old* dictionaries are good!)—

{% quote source=sources.websters, location="“Polity”" %}

The form or constitution by which any institution is organized; the recognized principles which lie at the foundation of any human institution.

{% endquote %}

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/050.png" loading="lazy">

*Any* human institution.

Open source software *is* such an institution, though we often fail to recognize it as such. It has a polity. Indeed it has *many* little polities. But this is quite unlike our other polities.

</section>

## Anarchy and Anarchism

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/051.png" loading="lazy">

Because, in this polity, there is no central or organizing structure to most of these efforts. No *framework or organization*, at least at the grand scale.

There is no <abbr title="chief executive officer">CEO</abbr> of open-source. No one assigned me and my friend Ben the work of building a TypeScript library back in 2017, and if they had I would likely have long since stopped working on it when I left that employer! I recently decided to rebuild its documentation site… on a whim: a user complained (rightly!) that it was hard to learn the library, so I fixed it, because I felt like it. I don’t have a manager or a product owner.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/052.png" loading="lazy">

And even when we formalize things a bit more—the Rust project, for example, has benefited from starting to have folks in more formal project management seats, some of them even paid by the Rust Foundation—the basic contribution model is still: *show up and do things, if you want to*.

Even with corporate contributions, an enormous amount of what happens in open-source software is not solely or purely directed by the aims of capital-M Management.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/053.png" loading="lazy">

This way of doing things that we have stumbled into, this bazaar, this absolutely-not-a-cathedral—open-source software is a kind of *anarchy*. That is why it is so difficult for us to think about. We’re not used to working with anarchic systems.

On the one hand, that makes it radically unlike traditional, physical infrastructure projects, which require central coordination.

On the other it is also quite unlike “normal” capitalist markets. We don’t really coordinate open-source software development through market mechanisms.

Open source… is anarchic.

Time to pause and define the term, though, because when I talk about “anarchy”, it brings along an awful lot of history. We tend, not unreasonably, to think of anarchy as something destructive. For centuries now, we have thought of anarchy as something destructive:

- The Anabaptists running amok in Münster in the early days of the Protestant Reformation.
- The era of assassinations in the late 19th and early 20th century (and some since, as well).
- Ties with violent protest throughout the twentieth century, including especially (but not only) the destruction of property.

But anarchism as a political philosophy has always been conflicted on violence. The destructive anarchy of the Anabaptists at the start of the Reformation frightened Europe for over a hundred years, but if you say “Anabaptist” today, you are most likely thinking of some the most robustly pacifistic people in the world. And so it is very important when we talk about this that we be clear what we mean. I *do* mean a relationship between the people doing the work where no one person is “in charge”. But I do not mean—I vehemently reject—violence.

The kind of anarchy that is open-source software is *not* destructive but a kind of glorious flourishing. Benefiting from and building on each other's work, enjoying and appreciating each other's work, riffing on and challenging one another's work.

We cannot hope to see not only how <abbr>OSS</abbr> has worked, but how it *could* work if we don't come to terms with and grapple with that. We have to be clear-eyed about both the strengths and weaknesses of anarchy to understand the economic, the social, and the legal implications of this thing we have somewhat accidentally stumbled our way into building.

</section>

## Power

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/054.png" loading="lazy">

Of course, “just keep doing anarchy and unstructured things and it will work fine” is not a good plan.

First of all, as Jo Freeman’s noted from her vantage point within the feminist movement, in her brilliant and remarkable essay “The Tyranny of Structurelessness”, social hierarchies emerge no less in expressly unstructured, anti-hierarchical systems as in social systems with explicit hierarchies. You just have a much harder time dealing with or interacting with them because they are implicit. Deniable, even!

The same, you might notice, is true of open-source software projects. Few projects these days even claim that everyone has an equal seat at the decision-making table—but the interplay *between* projects can often be fraught because of hierarchies that are social and mostly implicit.

After all, there is no contract between open-source projects—neither a legal one nor even a *social* one.

That’s true even when one library or project depends on another. In JavaScript, for example: Redux does not strictly explicitly depend on React, but it's nearly always used with React. There’s no formal contract anywhere between React and Redux, but what React does shapes what Redux has to do if Redux is going to be a going concern.

React can completely break Redux, but not *vice versa*. That can have enormous ripple effects on the maintainers’ relationships. Even though they’re both “just doing the work they believe in”, that doesn’t mean there isn’t an important power dynamic between the two.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/055.png" loading="lazy">

This kind of inescapable power dynamic means we cannot simply say “Anarchy! Cool! We don’t have to think about those values!” It is not enough to say “The system is distributed” or “there is no one in charge”, just as it has not been enough to say “well, markets will sort it out.” Anarchic systems, on their own, are neither vicious nor virtuous. They are human systems and so can be either. It depends on *what we build* anarchically.

</section>

## Values

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/056.png" loading="lazy">

As Chachra comments,

{% quote source=sources.chachra, location="p. 39" %}

Like all technologies, these systems incorporate the values of their builders. Many infrastructural systems, like municipal water supplies, include ideals like serving the public good and universal provision, or meeting the basic needs of everyone in a community. But some of the values are far less laudable: the social and environmental costs of high-quality infrastructural systems for one group are often borne by others who are not in that group.

{% endquote %}

For example, your power plant might generate electricity for some people but make the air unbreathable for others: vicious. Or you might build a water system that eliminates cholera, because—and only because—it applies equally to the haves and the have-nots: virtuous.

We *will* encode our values in it: inescapably, unavoidably.

Bluntly: as much as some of the most-well-off along the way might have *wished* they could get away with paying for only their own water supply, leaving the poor to fester, the reality is that public water systems *only work* when they work *for everyone*. You don’t get rid of disease unless you get rid of it for your poor immigrant neighbor, too. It matters if our values are Nietzsche’s politics of power, or if they are the humble, self-sacrificing morality he called a “slave morality”: a phrase meant in insult that I will accept gladly if it means that I think it matters *most* what we do for “the least of these” and not only the greatest and most powerful.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/057.png" loading="lazy">

For open-source software to be good infrastructure, we must own the obligation that entails—an obligation that cuts across class and ethnicity, language and nation.

And so I assert that open-source works best when those values are the kind of profoundly egalitarian and communitarian norms that have implicitly governed open-source efforts from the outset: the norm that everyone is welcome both to contribute and to benefit, irrespective of nationality or language or ethnicity.

What I find perhaps *most* astonishing about open-source software is the degree to which this has been its mode from the beginning: generous in the extreme, defaulting to licenses and models that have inherently (if not inevitably) led to its nature as a *common good*. Freely available. Share alike. Contribute if you will, however you will, and we will accept it if we can. And if not, fork it, and change it to suit our own needs and carry on *using it*: that is not only allowed but *encouraged*.

But: how do we keep that up without crushing the authors of projects that have become infrastructure?

</section>

## The Future

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/058.png" loading="lazy">

To be honest: *I have very little idea. Honestly.* This talk is primarily a problem statement, not a solution statement. But I think that’s okay: we have to start somewhere. And this is a good place to start.

Our work in open-source software is a collective creation of infrastructure that is governed anarchically as a whole. It is, perhaps, the largest experiment in world history in anarchic governance—certainly in anarchic infrastructure—and it works. It works spectacularly well. That’s a massive triumph.

Except, as Log4shell shows us, that we don’t have a good idea how to coordinate when we need to, most especially to funding what ought to be funded.

We need to do the work of imagining, and trying, and sometimes failing, and trying, and trying, new models for funding and coordination. Models that are at the same time more explicit than they have been so far, and maintain what is good about this strange way of building digital infrastructure.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/059.png" loading="lazy">

I quoted Chachra earlier on how—

{% quote source=sources.chachra, location="p. 10" %}

Infrastructural systems are famously boring because the best possible outcome is nothing happening, or at least nothing unexpected or untoward.

{% endquote %}

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/060.png" loading="lazy">

—and the quote continues:

{% quote source=sources.chachra, location="p. 10" %}

But nothing happens and nothing continues to happen as a result of sufficient attention, specialized care, and unceasing oversight. “Nothing happening” is usually the result of careful inspection schedules, preventive maintenance, and planned replacement, all of which require resources to be devoted to what will be, at best, a null outcome.

{% endquote %}

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/061.png" loading="lazy">

Chachra is right to foreground *attention* here. Infrastructure neither gets built in the first place, nor continues to work reliably after it is built, without attention, and attention is not free. Indeed, it is precisely attention that the people who build open-source software spend, and attention that is not a common good.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/062.png" loading="lazy">

Almost a decade ago, Alan Jacobs suggested exactly this connection in “Attending to Technology: Theses for Disputation”:

{% quote source=sources.jacobs, location="" %}

If instead of thinking of the Internet in statist terms we apply the logic of subsidiarity, we might be able to imagine the digital equivalent of a Mondragon cooperative.

{% endquote %}

Jacobs was writing about the pseudo-commons of social media, but I think it can also help us think about the challenges for open-source software.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/063.png" loading="lazy">

Let's break down those terms. First, *statist*—that is, central state control. Open source is not like that, and shouldn’t be. Log4j didn’t require the government to fund it or coordinate it merely to come into existence or even to keep existing. Now, at least some governments have started taking open-source as infrastructure quite seriously. Log4j used to be an entirely volunteer project. Today, it is not: Germany’s Sovereign Tech Fund [invests](https://www.sovereign.tech/tech/Log4j) in the project, without attempting to direct it or orient it away from its anarchic governance model. But as that example shows, open-source software does not have to be *statist* even if it receives state funding.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/064.png" loading="lazy">

Second, *subsidiarity*. Subsidiarity is a principle that came out of Catholic social doctrine. It says the most local institution that can handle a given problem should. So if something can be handled by a family, the family should handle it. If a neighborhood can handle it, it should; if a subset of a city can handle it, it should; a city, a state, a nation, occasionally a supranational organization, —but we want to solve things at the lowest, most local area we can because that’s where we have the most context and will be least likely to create incidental harm in trying to solve the problem. That's subsidiarity. And at the broadest level, this is obviously in play with open-source software. In fact, if anything, we sometimes push too much down to the level of the individual or the governance team for some part of a project, and we actually need *more* coordination—but the principle is right, and we actually default to this more and better than most others.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/065.png" loading="lazy">

Third, the *Mondragon Cooperative* is a Spanish worker’s collective that was formed after the Second World War. It is a *business*, but it is owned and run by the workers who belong to it. It has, in *very* broad strokes, some points of contact with the kind of anarchic system we see: there is no “boss”! Those owner-employees have hired some management—but management is not “in charge”.

The Mondragon cooperative began explicitly as a kind of Christian anarchy: built on an ethos that sees each person in the company as equally meaningful and valuable. As a result, they find room in their business for people with physical and mental disabilities, and they work to be good for their communities. Imperfectly,  yes, but truly. And when you dig into the research on them they all do actually seem to have very good outcomes—better outcomes than the kind of classic corporation model we have, in fact. Perhaps unsurprising if you think about the ways that the classic corporation model can be captured by outside forces that demand short-term increases in profits with no regard for the long-term good of the communities in which a business is embedded.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/066.png" loading="lazy">

But this takes us to *imagine*, because the model that works for the Mondragon Cooperative can only inspire us, not tell us exactly what to do. For one, there aren't a lot of Mondragon-style cooperatives out there to model ourselves on—so they aren’t really part of our social or economic imaginary! For another, while we *do* share with cooperatives like that a collective ownership model, we lack something they have: a business. We’re not selling *things* in the classic sense. We’re building infrastructure. We’re asking people, companies, governments, to fund our attention.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/067.png" loading="lazy">

The two most promising moves I see in this space so far are foundations and collectives.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/068.png" loading="lazy">

Foundations are non-profits that work to help software get built sustainably: the Rust Foundation, the Zig Foundation, the Linux Foundation, the Apache Foundation—they are fundamentally responses to the *coordination problem* that emerges when you have anarchic contribution models, and especially when you have need to figure out how to distribute money that is coming in.

Because: People and companies *do* recognize the free-loader problem! But when someone says, “I want this to be funded because I want this to keep existing,” contributors may or may not be set up to take that money directly, and a foundation exists to help manage that, so that contributors in turn can work on it with the model that suits them best: whether as a consultant, or working full-time, or taking a short-term contract, or spending Saturdays doing that instead of doing something else.

</section>

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/069.png" loading="lazy">

*Collectives* are another take on this: sort of like mini-foundations that can have less overhead and support smaller projects. For example, the OpenCollective platform tries to make it easy for groups to work together on projects—with transparency for supporters and participants. It handles the administrative tedium that maintainers aren’t really interested in doing, so they can focus instead on… maintenance. It tends, in its current form, to emphasize many small cooperatives, rather than pooling larger communal efforts, because that’s how open-source projects work.

Critically, both foundations and collectives *modify* but do not *fundamentally change* the anarchic nature of open-source software distribution and contribution. They can layer on just enough coordination, or provide just enough backstop, to smooth over some of the bumps that exist in completely anarchic systems.

Neither of these is a “solution” to the challenge of funding and coordinating open-source as infrastructure. If they were, Log4j wouldn’t have been so striking an example: it is, after all, part of the Apache Foundation. Nor would so many other load-beating projects that are signed up for OpenCollective be still mostly unfunded. And I haven’t even talked about the challenge of the fact that most open-source projects do not need and would in fact be unable to use full-time funding! But even so, foundations and collectives and cooperatives are a good start. We can build on them—iterate on the design and the implementation both.

</section>

## Conclusion

<section class="slide">

<img src="https://cdn.chriskrycho.com/images/talks/lambdaconf-2025/070.png" loading="lazy">

Open source software has something beautiful to share with the rest of the world here. There is something profound and wonderful and good in the way that we can bring together people from any and every ethnicity and language and nation to build something greater than we could build alone—just for the sake of making something good and beautiful.

Let us not lose sight of that.

But let us figure out how to make it work: in ways that embody a commitment to “the least” among us by treating it as seriously as it deserves as critical infrastructure.

</section>
