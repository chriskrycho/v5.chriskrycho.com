---
title: >
  2025 in Review: Professional
subtitle: |
  Getting things going at Vanta and shipping a lot in my Year of Shipping.

date: 2025-12-31T16:09:00-0700

tags:
  - software development
  - career

qualifiers:
  audience: |
    People who like reading year-in-review summaries. (I always assume that’s mostly just me, a few years in the future!)

  context: |
    For many years now, I have made it my habit to write up one of these summaries. In this case, I have tried to make it a bit more digestible by breaking into smaller chunks. All of the posts are available at the [2025 in Review][series] series page.
    
    [series]: https://v5.chriskrycho.com/journal/2025-in-review/

---

This year, I had two major areas of “professional” work: [joining Vanta](https://v5.chriskrycho.com/journal/next-vanta/) in April and my [year of shipping](https://v5.chriskrycho.com/topics/year-of-shipping/). Both of these went pretty well overall.

Joining Vanta was, of course, a big change from what I had spent the preceding year and a half doing, and a big change even from my time at LinkedIn. There's a huge difference between doing the same basic kind of work at a megacorporation and doing it at a hypergrowth startup. I wrote a bit [about joining Vanta](https://v5.chriskrycho.com/journal/next-vanta/) when I started, and I noted that “hypergrowth” through the 1,000 employee mark represented “a new set of challenges and opportunities” and that has certainly proven out.

Most of my work this year has been focused on making both our codebase and our processes scale. That meant everything from getting into nitty gritty details of our use of TypeScript in the codebase and solving nasty type checking performance problems to leading one of our cross-cutting all-engineering initiatives. I have done all sorts of other things along the way, too, unsurprisingly, from mentoring other engineers, to doing design and architecture sessions with other teams as they tackle rewrites of important parts of the application, to an awful lot of interviews. It has been *busy*.

Perhaps the most striking part of these first 8 months at Vanta was looking around and realizing that I am not only a leader, but one of the most senior and experienced leaders at the company. I have been writing software professional since some of my colleagues were in elementary and middle school. There comes a point in all of our lives where we find that we are not just grown-ups, but indeed the people on whose shoulders much of the responsibility falls, because there is no one else who is going to solve any given set of problems. Often no one else even has the experience and context to *see* the problems, still less to figure out how to fix them. That point is one well-taken in general for folks in this age bracket! (More on this some other time soon!)

My “year of shipping” went better and further along some axis than I expected at the start of the year, while seeing much less progress than I might’ve hoped to along others. Unsurprising! This was always going to be an area where I was going to do what I could, when I could, and that often meant following my fancy where it led me, given that it had to come in after work and other commitments. Mainly, then, I did a lot of incremental work on [True Myth][tm], the library a friend and I wrote now eight years ago for safer and more robust handling of errors, nothing, and as of late last year also synchrony in TypeScript.

[tm]: https://true-myth.js.org

Since the start of the year, True Myth releases have included:

- a new `Task` type for fallible asynchronous operations, with full parity for the built-in `Promise` in JavaScript as well as an <abbr title="application programming interface">API</abbr> for retries that I really like.

- a *bunch* of new utilities and tools across the `Result`, `Maybe`, and `Task` types.

- a brand new documentation site with many fixes for the existing documentation, though there are sadly still a bunch of broken examples—getting that fixed is one of my personal hopes for 2026.

- a dedicated integration with [Zod](https://zod.dev) and out of the box [Standard Schema](https://standardschema.dev) integration.

I also published a couple other very small things. The first was a tiny little tool called `jj-gcp` that I built (and still use off and on) that uses <abbr>LLM</abbr>s to generate a branch name for an anonymous `jj` branch before pushing it with `jj git push`. The second was a simple [BBEdit](https://www.barebones.com/products/bbedit/) syntax [definition](https://github.com/chriskrycho/bbedit-jj-syntax "a tiny little bit of software") for [Jujutsu](https://www.jj-vcs.dev/latest/) commit messages.

<aside>

Yes, I continue to use Jujutsu as my main version control tool. Every single commit I have written at Vanta has been done with `jj`, and it has been absolutely invaluable. I do a *lot* of sets of big cross-cutting refactors that I then split into smaller chunks to land independently, and I use the workflow I described [here](https://v5.chriskrycho.com/journal/jujutsu-megamerges-and-jj-absorb/) pretty much constantly. I have plausibly worked more on “megamerge” topologies than “normal” branch topologies this year!

</aside>

If you want to poke at any of the details, they’re all listed under [my Year of Shipping topic](https://v5.chriskrycho.com/topics/year-of-shipping).

Looking forward, I hope to make 2026 another such year of shipping, though likely with less focus on True Myth and more on other side projects. I have made a *lot* of progress on getting my extremely bespoke and personal site generator working the way I want, for example, and only have one last yak to shave (I think!)… but it is a very large one. That said, it is also one that I expect to yield dividends for me in a bunch of areas only tangentially related at most to building websites, so I am excited to spend a chunk of the year shaving that last big yak.

In any case, having this explicit goal was good for me this year. Much like my commitment to publishing my music newsletter every month, it was both focusing and motivating for me, because I had publicly committed myself to getting things out into the world.
