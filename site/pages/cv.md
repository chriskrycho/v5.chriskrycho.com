---
title: Curriculum Vitae
subtitle: >
    A Senior Staff Software Engineer at LinkedIn, lately focused on frameworks and languages as tools to help other developers to build better software.
summary: >
    I am a Senior Staff Software Engineer at LinkedIn, lately focused on frameworks and languages as tools to help other developers to build better software. You can have my traditional résumé, but this page will tell you a lot more about whether we might work well together.

---

[My résumé][resume] has the short version. This page is the *long* version. Why? Because even the best résumés leave a lot to be desired: they lack context and narrative. If you’d like a better idea of how I work, I think you’ll find the rest of this page a lot more helpful.

[resume]: https://cdn.chriskrycho.com/file/chriskrycho-com/resume.pdf

Interested in working with me? Feel free to [say hello][email]!

[email]: mailto:hello@chriskrycho.com?subject=Read%20your%20CV

- [<i>About Me</i>](#about-me)—my philosophy of software development and my slightly unusual educational background, featuring a [Master of Divinity](#masters) and a [Bachelor of Science in Physics](#undergrad)

- [<i>My Work</i>](#my-work)—not just where I’ve worked and the tech I used, but what I brought to the table and the difference I made:
    - [Current: LinkedIn](#current-linkedin)
    - [Earlier Work](#earlier-work)

- [<i>My Projects</i>](#my-projects)—including podcasts I produce, talks I've given, and open-source software I’ve developed or contributed to:
    - [Podcasts](#podcasts)
    - [Open Source Software](#open-source-software)
    - [Talks](#speaking)

---

## About Me

I am senior software engineering leader, lately focused on programming language adoption, web framework development, and developer productivity and experience. Other long-running professional interests include <abbr title="user interface">UI</abbr>, typography, functional programming, and ethical software development.

Prior to my recent focus on developer experience engineering, I have a long history with full-stack web development, spent a half decade doing systems-level programming (including avionics software and computational physics models), and earned an [undergraduate degree in physics](#undergrad) and a [master’s degree in theology](#masters). That combo has led me to care—very deeply—about building the *right things* in the *right way*.

Building the *right things* means I am not interested in companies whose vision at either "tear down an existing industry" or "applying software will solve all our problems." I would much rather work for a company with both a vision for how its product improves human lives and a recognition of the limits of technology. Tech is not a panacea for human ills and too often simply reinforces the worst of our existing failings.

Building things the *right way* means I am not interested in slapdash product development and rushed delivery. Software development as a field consistently underinvests in product quality and maintainability. It is the responsibility of engineers to raise that bar.

### Education

<a name=masters></a>I earned a **Master of Divinity** with honors from **Southeastern Baptist Theological Seminary** in **May 2017**, after 4½ years simultaneously pursuing the degree and working as a software developer. I am not a pastor by profession, but I care deeply about the ethical, social and, yes, spiritual implications of the software I build.

<a name=undergrad></a>I graduated *magna cum laude* with a **Bachelor of Science in Physics** from **The University of Oklahoma** in **May 2009**, having been a regular departmental award winner. My senior thesis, a project in computational neurophysics (in Fortran 90!), led me into programming—but/and I still miss doing physics and math on a regular basis.

## My Work

### Current: LinkedIn


*A lead client infrastructure engineer for one of the largest social networks in the world.*

Since **January 2019**, I have worked as an infrastructure engineer at [LinkedIn], focused on developer productivity and application performance for LinkedIn's flagship web app.

Since **September 2021**, as a **Senior Staff Software Engineer**:

- I led a team to fix site-down memory leaks in our <abbr title="server-side rendering">SSR</abbr> stack, and identified and resolved major resiliency gaps in internal Node.js infrastructure.
- As the primary TypeScript subject-matter expert at LinkedIn:
    - I solved the most challenging technical blockers, e.g. type-safe event tracking.
    - I coached LinkedIn’s TypeScript track leads.
    - I authored [a spec][semver-ts] for Semantic Versioning for TypeScript types.
    - I forged consensus in the Ember.js open source community on key <abbr title="TypeScript">TS</abbr> blockers:
        - A novel, backwards-compatible [strategy][migration] to migrate away from DefinitelyTyped, which I also [executed][pr].
        - A new [authoring format][template], resolving a years-long stalemate.
- Designed a migration strategy away from Ember. (We did not use it—ask me!)
- Mentored a half dozen engineers, ranging in seniority from Apprentice to Staff.

[semver-ts]: https://semver-ts.org
[migration]: https://rfcs.emberjs.com/id/0800-ts-adoption-plan#migration-from-definitelytyped
[pr]: https://github.com/emberjs/ember.js/pull/20449
[template]: https://rfcs.emberjs.com/id/0779-first-class-component-templates

From **January 2019–September 2021**, as a **Staff Software Engineer**:

- I developed a business case for TypeScript adoption which was key to the company's choice to fully support TypeScript for our JavaScript projects.
- I dramatically improved developer experience and productivity across the organization as the tech lead for the adoption of [Ember Octane][octane] across the application. Additionally, as one of a handful of primary technical experts on Octane—at LinkedIn or anywhere else—I support many other teams rewriting existing code into Octane idioms and teams building brand new experiences Octane-first.
- I led efforts to update the app to the current versions of Ember.js, unblocking adoption of Octane.
- I helped build, and continue to support, [Volta], an open-source, cross-platform tool (written in Rust!) for managing Node.js environments in a reproducible, reliable way.

[LinkedIn]: https://www.linkedin.com/feed/
[octane]: https://emberjs.com/editions/octane
[Volta]: https://volta.sh

### Earlier Work

*I am the developer and leader I am today because of many experiences **before** today.*

#### Olo

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

#### HolyBible.com

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

#### Quest Consultants, Inc.

*Collaborating across disciplines; transitioning to remote work.*

From **May 2012–January 2016**, I worked (first as a full-time employee, then remotely as a half-time consultant) for [**Quest Consultants, Inc.**][quest]. During that time:

- I improved the performance of one existing computational hazard model by a factor of 7.
- I rewrote another computational model in **C** (from Fortran 77).
- I supported another rewrite effort (again from Fortran 77) to **Python 3**.
- I helped the team adopt Mercurial for version control and JIRA for bug tracking software.

[quest]: http://www.questconsult.com

Those efforts taught me a great deal about communicating effectively with domain experts, working remotely (as I did beginning in January 2013), testing effectively, refactoring legacy codebases safely, and wrangling large software development efforts over time.

#### Northrop Grumman

*Learning the basics of software engineering.*

From **July 2009–May 2012**, I worked as a **Software Engineer I** on the B-2 program at [**Northrop Grumman**][ng]. My work included writing **C** (targeting a real-time operating system) and developing requirements for a modernized message bus architecture. My basic implementation of the Sparse A\* Search Algorithm[^sasa] was used as a performance baseline for route-finding software on the platform.

[ng]: http://www.northropgrumman.com/Pages/default.aspx

[^sasa]: IEEE Transactions on Aerospace and Electronic Systems Vol. 36, No. 3 July 2000

Over those three years I acquired a good dose of humility and basic knowledge of software engineering, including the use of bug trackers and source control, strategies for testing, and patterns for writing maintainable code.

#### Miscellaneous Consulting

*Teaching myself web development.*

**Beginning in January 2010**, I taught myself web programming, beginning with PHP and jQuery and the LAMP stack. Having a good working knowledge of <abbr title="hypertext markup language">HTML</abbr> and <abbr title="cascading style sheets">CSS</abbr> from designing my own blog in college, I decided to learn web development. I began by building church websites and blogs for friends in WordPress. Later, while working as a subcontracting consultant for [Innova Computing][innova], I developed a custom <abbr title="content management system">CMS</abbr> for the Oklahoma Board of Medical Licensure.

[innova]: https://innovacomputing.com

My goal throughout was not merely to make some extra money, nice though that was. Rather, I aimed to transition from the world of C and Fortran where I began my career to working full time in <abbr>UI</abbr>-focused web development. (Mission accomplished.)

## My Projects

Besides my family life, church participation, and day-to-day work, I am also a prolific writer, podcaster, and open source software contributor. My writing you can find primarily on this website; I focus primarily on technology, ethics, and faith (though if you want to read my so-so poetry, [that’s here too][poetry]).

[poetry]: https://v4.chriskrycho.com/poetry

### Podcasts

- [**Winning Slowly**][ws] (January 2014–November 2021): cohosted with [Stephen Carradini][stephen], a show about taking the long view on technology, religion, ethics and art. Stephen described it (accurately) as a show focused on tech, but from the angles of religion, ethics, and art. I described it (also accurately) as our excuse to talk about whatever we want, since "technology, religion, ethics and art" pretty much touches on all of human existence. For a good sample of the way I approach **software and ethics**, check out [6.06: A Kind of Blindness,][ws-6.06] on smart cities, "big data", and the meaninglessness of mere information.

- [**New Rustacean**][nr] (September 2015–May 2019): a show about the **Rust** programming language—dedicated primarily to *teaching* people Rust. Initially a way of helping myself stay motivated to keep up with learning the language, New Rustacean became one of the most popular resources for people learning Rust and inspired a few other teaching-programming-languages podcasts.

[ws]: https://winningslowly.org
[stephen]: https://stephencarradini.com
[ws-6.06]: https://winningslowly.org/6.06/
[nr]: https://newrustacean.com

### Open Source Software

#### TypeScript and Ember.js

I am presently a member of the Ember.js Framework and Typed Ember core teams, the latter of which I founded in 2017. The efforts of the Typed Ember Core team ultimately led to the adoption of TypeScript as an officially supported language for Ember, including the development of a [Semantic Versioning for TypeScript Types spec](https://www.semver-ts.org), a [best-in-class language server](https://github.com/typed-ember/glint), and the only attempted gradual migration path from [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) to natively-published types.

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

The Road to TypeScript
: EmberConf, March 2022 – [video](https://www.youtube.com/watch?v=UOw7TydAT_s)


Keep It Local: Or (part of) what “reasoning about your code” really means
: EmberConf 2021, March 2021 – [video](https://www.youtube.com/watch?v=Mt7v-VbFjxk) | [script](https://v5.chriskrycho.com/elsewhere/keep-it-local/)


Don’t Go Bankrupt: Managing Technical Costs
: All Things Open, October 2019


Supercharging Ember Octane with TypeScript
: EmberConf Workshop, March 2019

: <b>Abstract:</b>

    > You’ve heard about the benefits of TypeScript. But what is it? How hard is it to get started? How can you use it with Ember? What does it have to do with Ember Octane? This training will give you the tools you need to start using TypeScript effectively in your Ember app or addon—and show you how it can supercharge your developer experience with Ember Octane.

: Materials: although the workshop was not recorded, the teaching materials are all available online:

    - [slides](https://github.com/chriskrycho/emberconf-2019-slides) for the introduction to TypeScript and overview of using it in Ember
    - [sample code repository](https://github.com/chriskrycho/emberconf-2019), where each commit is a discrete step in the process of the conversion


CSS Modules lightning talk
: Denver Ember.js Meetup, December 2018


Rust and WebAssembly
: Denver/Boulder Rust Meetup, May 2018


TypeScript and Ember.js: Why And How

: Ember <abbr title="Austin, Texas">ATX</abbr> Meetup, April 2018 – [video](https://youtube.com/watch?v=fFzxbBrvytU)

    I also delivered a slightly shorter version of this same material at the Denver Ember.js Meetup in June 2018.)

: <b>Abstract:</b>
    > A three-part look at Ember.js and TypeScript today: What are the benefits to me as an Ember developer for using TypeScript? What are the tradeoffs if I adopt TypeScript? Where are things going from here?


TypeScript Up Your Ember.js App

: EmberConf Workshop, March 2018

: <b>Abstract:</b>

    > An introduction to TypeScript and how to use it with Ember.js, with a worked example of converting part of the Ember.js <span class='smcp'>TODO</span> <abbr title="model-view-controller">MVC</abbr> app from JavaScript to TypeScript.

: The workshop was not recorded, but the teaching materials are all available online:

    - [slides](https://github.com/chriskrycho/emberconf-2018-slides/) and [script](https://github.com/chriskrycho/emberconf-2018-slides/blob/master/talk.md) for the introduction to TypeScript and overview of using it in Ember
    - [sample code repository](https://github.com/chriskrycho/emberconf-2018), where each commit is a discrete step in the process of the conversion


Becoming a Contributor
: Rust Belt Rust 2017, October 2017 – [video](https://youtube.com/watch?v=Abu2BNixXak)

: <b>Abstract:</b>

    > So, you’re new to the Rust community. (Or any community, really!) And you want to help, but, well, you’re new. So how exactly do you start contributing? What kinds of contributions are valuable? We’ll talk about everything from asking questions to writing documentation, from pitching in on forums and chat to writing blog posts, and from starting your own projects to contributing to other open-source projects.


*Tolle Lege!* Designing Readable Bibles With Digital Typography
: BibleTech 2015, May 2015 – [video](https://m.youtube.com/watch?v=cDAh35IwJsE)

: <b>Abstract:</b>

    > The Bible has always been a challenging text to display, whether copied by hand or printed on a Gutenberg press, and the task has only grown more complicated in the era of digital text. The challenges are not insurmountable, though. We have the tools to solve them: the principles of good typography, especially careful page design and the deliberate choice and skillful use of appropriate typefaces (fonts). When we apply those principles to the Scriptures—whether in an app or on the web—we can provide people with digital Bibles that are both readable and beautiful.
