---
title: Noticing, and Solving, Technical Problems in a Codebase
subtitle: And a requisite aside about large language models.
date: 2026-03-17T20:24:00-0600

qualifiers:
  audience: |
    Software developers interested in the long-term health of their codebases.

tags:
  - software development

---

There comes a point when you first notice that a given technical choice is not working particularly well. Maybe it is within minutes of making it; maybe it takes months or years to show up as a problem. When it happens, you should immediately note it—probably literally write it down—, and then see whether it keeps showing up. If it catches your attention again as a point of friction or pain, note that. If you hit it a third time, stop and figure out what you need to do to get rid of that friction.

Why change it, if it’s “just” friction? Because friction compounds. It makes it that much harder to work in that part of the codebase. And if that spot where there is friction becomes (or has become) load-bearing, the longer you wait to change it, the harder it gets to change. When you have found making a change in a given area hard a handful of times, it’s unlikely that it’s going to get *easier* to change over the life of the codebase.

Why three times? Well, it’s a heuristic: not a commandment, but a good guide. Noticing it once or even twice is a hint that there *may* be something worth changing. But if you hit something twice in a year and never hit it again… it’s probably fine. If you hit something three times in *any* span of time, you’re probably going to hit it again. Maybe the number for one particular problem is five. Maybe the number for another is just two, because it’s so obviously painful. Three is a decent rule of thumb.

If you don’t stop at three, or five, or *sometime* early, you’ll find yourself years down the line paying literally orders of magnitude more to fix it. Yes, sometimes you can afford that. But imagine how much better (and indeed how much more profitable) it would be to spend that time on making your software do more for the people who use it instead of cleaning up messes you left for yourself!

---

**Addendum:** a few <abbr title="large language model">LLM</abbr>-related notes here—

1. The inability to *notice* the friction because making changes is so “cheap” with <abbr>LLM</abbr>s is one reason I have concerns about the long-term maintainability of many of these codebases! The counter-argument is that it *is* cheap, but I think this underestimates just how hard these things can become over time—most especially in those load-bearing situations. I just spent a good part of a week chasing down one of the *simplest* ones of these in Vanta’s  codebase, and the existence of <abbr>LLM</abbr>s made a few parts of it easier… but not most of it.

2. <abbr>LLM</abbr>s are incredibly effective at pattern-matching, which means that they will absolutely reflect the state of your code. If your codebase has even a few examples of a particular pattern, it becomes much more likely that <abbr>LLM</abbr>s will reproduce it. This falls naturally out of how these systems work. I sometimes joke/not-joke that particular parts of the Vanta codebase basically act as “context poisoning” for <abbr>LLM</abbr>s, because the existence of those patterns in the codebase has a much larger effect on what the <abbr>LLM</abbr>s generate than all of our lint rules and `AGENTS.md` files combined do.

3. That goes double for architectural questions. <abbr>LLM</abbr>s have observably made significant strides in local correctness over the past few years. They continue not to have good taste or judgment, and will happily spit out massive amounts of (mostly, apparently) working code that add up to a classic big ball of mud.

4. A fundamental rule of automation [as applied to <abbr>LLM</abbr>s][talk]: The better <abbr>LLM</abbr>s get—the more they boost velocity by generating working code—the harder it will be notice when they get things wrong.

[talk]: https://v5.chriskrycho.com/elsewhere/substrate-engineering/#:~:text=And%20when%20you%20put%20those%20factors%20together%2C%20it%20has%20a%20result%20that%20might%20be%20counterintuitive:%20The%20better%20LLMs%20get%E2%80%89—%E2%80%89the%20more%20they%20boost%20velocity%20by%20generating%20working%20code%E2%80%89—%E2%80%89the%20harder%20it%20will%20be%20notice%20when%20they%20get%20things%20wrong.
