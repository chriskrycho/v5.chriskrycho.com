---
title: Curriculum Vitae
subtitle: >
    A senior engineering leader, lately focused on frameworks and languages as ratchets: tools which help other developers to build better software.

summary: >
    A senior engineering leader, lately focused on frameworks and languages as ratchets: tools which help other developers to build better software.

---

[My résumé][resume] has the short version. This page is the *long* version. Why? Because even the best résumés leave a lot to be desired: they lack context and narrative. If you’d like a better idea of how I work, I think you’ll find the rest of this page a lot more helpful.

[resume]: https://cdn.chriskrycho.com/resume.pdf

Interested in working with me? Take a look at [the services I offer][services] or feel free to [say hello][email]!

[services]: /services
[email]: mailto:hello@chriskrycho.com?subject=Read%20your%20CV

- [<i>About Me</i>](#about-me)
    - [Philosophy: Ratchets, Not Levers](#philosophy-ratchets-not-levers)
    - [Education](#education)
- [<i>Work</i>](#work)—not just where I’ve worked and the tech I used, but what I brought to the table and the difference I made:
    - [2024: Writing and Consulting](#2024-writing-and-consulting)
    - [2023–2024: Mini-Sabbatical](#2023-2024-mini-sabbatical)
    - [2019–2023: LinkedIn](#2019-2023-linkedin)
    - [2016–2018: Olo](#2016-2018-olo)
    - [2014–2015: HolyBible.com](#2014-2015-holybiblecom)
    - [2012–2015: Quest Consultants](#2012–2015-quest-consultants)
    - [2010–2015: Miscellaneous Consulting](#2010-2015-miscellaneous-consulting)
    - [2009–2012: Northrop Grumman](#2009-2012-northrop-grumman)
- [<i>Projects</i>](#projects):
    - [Podcasts](#podcasts)
    - [Open Source Software](#open-source-software)
    - [Talks](#speaking)

---

## About Me

I am senior software engineering leader, lately focused on programming language adoption, web framework development, and developer productivity and experience. Other long-running professional interests include <abbr title="user interface">UI</abbr>, typography, functional programming, and ethical software development.

Prior to my recent focus on developer experience, I have a long history with full-stack web development, spent a half decade doing systems-level programming (including avionics software and computational physics models), and earned an [undergraduate degree in physics](#undergrad) and a [master’s degree in theology](#masters). That combo has led me to care—very deeply—about the impact of software on the people who use it.

### Philosophy: Ratchets, Not Levers

Software is incredibly important to the world as it is—whether you like it or not. I think often of Marc Andreessen’s line that “software is eating the world”: for so it is. Where a venture capitalist sees that primarily in terms of the enormous piles of money it represents, though, I see it in terms of the many people who use software not by choice but necessity. For every person like me who really enjoys digital technologies and puts them at the center of their work, there are many others for whom computing is at best ancillary to their actual work, indeed for whom it might just be in the *way* of doing their real work.

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

This is why I care so much about [Rust](https://www.rust-lang.org). This is why I spent so much of the past decade working on [TypeScript](https://typescriptlang.org) adoption. This is even why I invested in the work I did on Ember Octane and [produced so much material about it](https://v5.chriskrycho.com/topics/ember). Each of those was (and is!) just such a ratchet, albeit to varying degrees and in various contexts. Rust is a particularly good example: it lets us ship faster software with fewer bugs in areas that really matter, and it enables a *lot* more people to do that kind of work than were able to do so (especially: to do so *safely* for their users) with C and C++. You can trust a junior to ship high-performance “close-to-the-metal” code written in Rust without worrying about memory safety; your team can focus more on architecture than on running valgrind. Rust is a ratchet.

Ratchets are incremental improvements, not silver bullets. So was structured programming, though. A change does not have to be a silver bullet to be valuable. It just has to make for better software—and critically, better software that does not require you to be always at your best. Fewer `SEGFAULT`s and fewer vulnerabilities as a result of memory safety is good. Fewer cases of “`undefined` is not a function” is good. [Faster cycle times](https://v4.chriskrycho.com/2018/scales-of-feedback-time-in-software-development.html) on identifying and fixing bugs is good.

### Education

<a name=masters></a>I earned a **Master of Divinity** with honors from **Southeastern Baptist Theological Seminary** in **May 2017**, after 4½ years simultaneously pursuing the degree and working as a software developer. I am not a pastor by profession, but I care deeply about the ethical, social and, yes, spiritual implications of the software I build.

<a name=undergrad></a>I graduated *magna cum laude* with a **Bachelor of Science in Physics** from **The University of Oklahoma** in **May 2009**, having been a regular departmental award winner. My senior thesis, a project in computational neurophysics (in Fortran 90!), led me into programming—but/and I still miss doing physics and math on a regular basis.

## Work

### 2024: Writing and Consulting

Starting in March 2024, I have been working as an independent consultant (you can [hire me!][services]). A few notable engagements:

- I have written a new chapter on concurrent programming with `async` and `await` for [<cite>The Rust Programming Language</cite>][trpl], the official Rust book (currently in revision) and have taken over co-maintainership of the book project.
- I successfully helped [Subsplash][subsplash] develop a front-end technical strategy for their large and successful application.
- I worked with [Pydantic][pydantic] on internal prototypes.

[trpl]: https://doc.rust-lang.org/book
[subsplash]: https://www.subsplash.com
[pydantic]: https://pydantic.dev

### 2023–2024: Mini-Sabbatical

From **October–December 2023**, I took a small sabbatical, focused on spending time with my family, [composing][music] contemporary classical music, and learning how to build programming languages.

[music]: https://music.chriskrycho.com

In **January–March 2024**, I spent time actively reconnecting with old colleagues and acquaintances and meeting new people across the field, working to identify next steps for my career and interesting people to work with.

### 2019–2023: LinkedIn

From **January 2019–October 2023**, I worked as an infrastructure engineer at [LinkedIn], focused on developer productivity and application performance for LinkedIn's flagship web app.

#### 2021.09–2023.10: Senior Staff Software Engineer

*TypeScript domain expert and Flagship web app tech lead.*

- As the primary TypeScript subject-matter expert at LinkedIn:
    - I solved the most challenging technical challenges, e.g. enabling type-safe event tracking.
    - I coached LinkedIn’s TypeScript track leads.
    - I authored [a spec][semver-ts] for Semantic Versioning for TypeScript types.
    - I forged consensus in the Ember.js open source community on key TypeScript gaps and blockers:
        - A novel, backwards-compatible [strategy][migration] to migrate away from DefinitelyTyped, which I also [implemented][pr].
        - A new [component authoring format][template], resolving a years-long stalemate in the community.

- I led a team to fix site-down memory leaks in our <abbr title="server-side rendering">SSR</abbr> stack, and identified and resolved major resiliency gaps in internal Node.js infrastructure.

- I designed a migration strategy away from Ember. (We did not use it—ask me!)

- I mentored a half dozen engineers, ranging from Apprentice to Staff.

[semver-ts]: https://semver-ts.org
[migration]: https://rfcs.emberjs.com/id/0800-ts-adoption-plan#migration-from-definitelytyped
[pr]: https://github.com/emberjs/ember.js/pull/20449
[template]: https://rfcs.emberjs.com/id/0779-first-class-component-templates

#### 2019.01–2021.09: Staff Software Engineer

*Transforming a multi-million line-of-code app… without disrupting product velocity.*

- I developed a business case for TypeScript adoption which was key to the company's choice to fully support TypeScript for our JavaScript libraries and applications.

- I dramatically improved developer experience and productivity across the organization as the tech lead for the adoption of [Ember Octane][octane] across the application. Additionally, as one of a handful of primary technical experts on Octane—at LinkedIn or anywhere else—I support many other teams rewriting existing code into Octane idioms and teams building brand new experiences Octane-first.

- I led efforts to update the app to the current versions of Ember.js, unblocking adoption of Octane.

- I helped build, and continue to support, [Volta], an open-source, cross-platform tool (written in Rust!) for managing Node.js environments in a reproducible, reliable way.

[LinkedIn]: https://www.linkedin.com/feed/
[octane]: https://emberjs.com/editions/octane
[Volta]: https://volta.sh

### 2016–2018: Olo

*From individual contributor to a project lead with organization-wide influence.*

From **January 2016 – January 2019**, I was a front-end-focused software engineer at [**Olo**][olo], a scale-up-phase startup which is the leading provider of online ordering for large restaurant brands.

[olo]: https://www.olo.com

As a **Software Engineer** (January 2016–May 2017), I was a productive individual contributor even while working 30-hour weeks as I completed my M. Div.:

- I led the adoption of a **test-driven development** approach in a greenfield **Ember.js** rewrite of the mobile web <abbr>UI</abbr>.
- I introduced JavaScript type systems to the application (landing on **TypeScript** after an initial experiment with Flow)
- I helped the team achieve **full AA [<abbr title="Web Content Accessibility Guidelines">WCAG</abbr>][WCAG] accessibility**.

[WCAG]: https://www.w3.org/WAI/standards-guidelines/wcag/

As a **Senior Software Engineer** (May 2017–January 2019):

- I led a team effort to expand the mobile web <abbr>UI</abbr> into a **responsive web <abbr>UI</abbr>** to reduce our maintenance burden, improve overall UX, and decrease the cost of launching new features.

- I designed a new technical strategy for white-labeling (including the adoption of **CSS Modules**), enabling the business to support more brands by way of better tooling.

- I pioneered Olo's use of **Requests for Comments (<abbr>RFC</abbr>s)**, modeled on the RFC processes from the Rust and Ember communities, as a tool for architecture design and documentation. I began by using <abbr>RFC</abbr>s for several important initiatives in my own team. The success of those initiatives validated <abbr>RFC</abbr>s' utility when I later introduced them to the broader engineering organization. They are now Olo’s standard tool for documenting architectural changes and a prerequisite for all new internal services.

- I finished the app's conversion to a fully strictly-type-checked TypeScript application.

*[CSS]: cascading style sheets
*[UX]: user experience
*[RFC]: request for comments

Throughout my time at Olo, I:

- led the community effort to **integrate TypeScript with Ember.js**
- helped launch a shared component library for future rich client projects
- delivered over a dozen internal tech talks on subjects including managing technical costs, Ember.js basics, functional programming techniques, and introductions to Rust and Elm
- substantially reshaped front-end engineering practices and tooling choices as an informal leader among our front-end engineering group

I matured significantly as both an individual contributor and a leader in my time at Olo. For the first time, I was able to make a substantial difference at the team level, at the organizational level, and at the level of the broader technical community.

### 2014–2015: HolyBible.com

*A formative experience: a technical success but a product design failure.*

[HolyBible.com][hb] is a beautiful interface for reading the King James Version of the Bible and the [Reformation Heritage Study Bible][sb] materials online, built for [Puritan Reformed Theological Seminary][prts]. The MVP launched in **December 2014**, with approximately 30 months of small bug fixes and feature enhancements following.

[hb]: https://holybible.com
[sb]: https://kjvstudybible.org
[prts]: https://prts.edu

*[MVP]: minimum viable product

I worked closely with a designer to create the visual language for the app before diving into the implementation. The app uses **AngularJS**, **Express/Node.js**, and **PostgreSQL**; I also did a great deal of XML-mashing in **Python** for the Bible source text and study Bible integration.

*[XML]: extensible markup language

The project was a *substantial technical success*: it has rarely crashed and had no bugs reported since spring 2017. I’m doubly proud of the project because it was only the second time in my career I’d built an entire non-trivial web application from scratch, and the first time I did so solo.

On the other hand, the project was a *product design failure*. The site is beautiful and functional, but it failed to meet the seminary’s goals for driving more traffic to the seminary landing page. My failure to establish what "success" meant to the seminary led me to deliver a technically-solid piece of software… that solved the wrong problem.

### 2012–2015: Quest Consultants

*Collaborating across disciplines; transitioning to remote work.*

From **May 2012–January 2016**, I worked (first as a full-time employee, then remotely as a half-time consultant) for [**Quest Consultants, Inc.**][quest]. During that time:

- I improved the performance of one existing computational hazard model by a factor of 7.
- I rewrote another computational model in **C** (from Fortran 77).
- I supported another rewrite effort (again from Fortran 77) to **Python 3**.
- I helped the team adopt Mercurial for version control and JIRA for bug tracking software.

[quest]: http://www.questconsult.com

Those efforts taught me a great deal about communicating effectively with domain experts, working remotely (as I did beginning in January 2013), testing effectively, refactoring legacy codebases safely, and wrangling large software development efforts over time.


### 2010–2015 Miscellaneous Consulting

*Teaching myself web development.*

**Beginning in January 2010**, I taught myself web programming, beginning with PHP and jQuery and the LAMP stack. Having a good working knowledge of <abbr title="hypertext markup language">HTML</abbr> and <abbr title="cascading style sheets">CSS</abbr> from designing my own blog in college, I decided to learn web development. I began by building church websites and blogs for friends in WordPress. Later, while working as a subcontracting consultant for [Innova Computing][innova], I developed a custom <abbr title="content management system">CMS</abbr> for the Oklahoma Board of Medical Licensure.

[innova]: https://innovacomputing.com

My goal throughout was not merely to make some extra money, nice though that was. Rather, I aimed to transition from the world of C and Fortran where I began my career to working full time in <abbr>UI</abbr>-focused web development.


### 2009–2012: Northrop Grumman

*Learning the basics of software engineering.*

From **July 2009–May 2012**, I worked as a **Software Engineer I** on the B-2 program at [**Northrop Grumman**][ng]. My work included writing **C** (targeting a real-time operating system) and developing requirements for a modernized message bus architecture. My basic implementation of the Sparse A\* Search Algorithm[^sasa] was used as a performance baseline for route-finding software on the platform.

[ng]: http://www.northropgrumman.com/Pages/default.aspx

[^sasa]: IEEE Transactions on Aerospace and Electronic Systems Vol. 36, No. 3 July 2000

Over those three years I acquired a good dose of humility and basic knowledge of software engineering, including the use of bug trackers and source control, strategies for testing, and patterns for writing maintainable code.


## Projects

I am also a prolific writer, podcaster, and open source software contributor.


### Podcasts

- [**Winning Slowly**][ws] (January 2014–November 2021): cohosted with [Stephen Carradini][stephen], a show about taking the long view on technology, religion, ethics and art. Stephen described it (accurately) as a show focused on tech, but from the angles of religion, ethics, and art. I described it (also accurately) as our excuse to talk about whatever we want, since "technology, religion, ethics and art" pretty much touches on all of human existence. For a good sample of the way I approach **software and ethics**, check out [6.06: A Kind of Blindness,][ws-6.06] on smart cities, "big data", and the meaninglessness of mere information.

- [**New Rustacean**][nr] (September 2015–May 2019): a show about the **Rust** programming language—dedicated primarily to *teaching* people Rust. Initially a way of helping myself stay motivated to keep up with learning the language, New Rustacean became one of the most popular resources for people learning Rust and inspired a few other teaching-programming-languages podcasts.

[ws]: https://winningslowly.org
[stephen]: https://stephencarradini.com
[ws-6.06]: https://winningslowly.org/6.06/
[nr]: https://newrustacean.com


### Open Source Software

#### TypeScript and Ember.js

I founded the Ember.js TypeScript team in 2017 and led it until I resigned in September 2023. I was part of the Ember.js Framework team February 2022–May 2023. The efforts of the Ember TypeScript team ultimately led to the adoption of TypeScript as an officially supported language for Ember, including the development of a [Semantic Versioning for TypeScript Types spec](https://www.semver-ts.org), a [best-in-class language server](https://github.com/typed-ember/glint), and the only attempted gradual migration path from [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) to natively-published types.

#### Volta

As part of my work at LinkedIn, I helped develop and continue to maintain [Volta][Volta], an open-source, cross-platform tool (written in Rust!) for managing Node.js environments in a reproducible, reliable way.

#### True Myth

In the **fall of 2017**, [a friend][ben] and I developed [True Myth][tm]: a **TypeScript**-targeted library with `Maybe` and `Result` types. Several existing libraries in the space work excellently but had a number of downsides, including second-class support for TypeScript, runtime overhead, and an API designed to mirror Haskell or Scala rather than idiomatic JavaScript. True Myth was our attempt to fill that gap. It takes advantage of TypeScript to supply an **idiomatic JavaScript API** with **zero runtime overhead** (beyond the inherent cost of the container types themselves).

[ben]: https://benmakuh.com
[tm]: https://github.com/chriskrycho/true-myth
*[API]: application programming interface

True Myth is largely [complete][stable-libraries], with a full set of features and [extensive documentation][tm-docs], though we continue to maintain and expand the library with additional helpers and tooling as TypeScript has supported more capabilities.

[stable-libraries]: https://v4.chriskrycho.com/2018/stable-libraries.html
[tm-docs]: https://true-myth.js.org/
[tm-C#]: https://github.com/true-myth/true-myth-csharp "True Myth C♯"

### Speaking

I also have a long history of public speaking. Check out [the dedicated page](/speaking) for more!
