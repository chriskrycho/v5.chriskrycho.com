---
title: boundary-drawing and system design
subtitle: >
  Notes from <cite>Thinking in Systems</cite> which I find particularly applicable to software.

date: 2023-08-03T07:15:00-0600

tags:
  - reading notes
  - from my notes
  - quotes

summary: >
  Meadows cites the importance of reevaluating and redrawing boundaries on the regular. Boundaries are key to healthy software; but/and Meadows overstates things.

---

Quotes from, and notes on, bits from Donella Meadows, [<cite>Thinking in Systems</cite>]({{book.link}})—specifically on the subject of system boundaries:

> There is no single, legitimate boundary to draw around a system. We have to invent boundaries for clarity and sanity; and boundaries can produce problems when we forget that we’ve artificially created them.

<abbr title="application programming interface">API</abbr> and system design in software is in some sense the act of choosing to reify some boundaries and not to do so with others.

> The right boundary for thinking about a problem rarely coincides with the boundary of an academic discipline, or with a political boundary. Rivers make handy borders between countries, but the worst possible borders for managing the quantity and quality of the water. Air is worse than water in its insistence on crossing political borders. National boundaries mean nothing when it comes to ozone depletion in the stratosphere, or greenhouse gases in the atmosphere, or ocean dumping.
>
> Ideally, we would have the mental flexibility to find the appropriate boundary for thinking about each new problem. We are rarely that flexible. We get attached to the boundaries our minds happen to be accustomed to. ... It’s a great art to remember that boundaries are of our own making, and that they can and should be reconsidered for each new discussion, problem, or purpose. It’s a challenge to stay creative enough to drop the boundaries that worked for the last problem and to find the most appropriate set of boundaries for the next question. It’s also a necessity, if problems are to be solved well.

Our system boundaries—<abbr title="application programming interface">API</abbr> contracts within a monorepo, services in a service architecture, <abbr title="version control system">VCS</abbr> repository breakdown, structure of code within a repository, etc.—all tend to become static in just this way. We end up assuming the current system design *must be* what it is, that the boundaries *must be* what they are. That is not so much a conscious thing (at a conscious level, we know things could be different) as a behavioral default that emerges naturally. Meadows is right that it is valuable to be able to take a step back and reevaluate those boundaries: *Is this in fact the right breakdown between our systems?*

At the same time, it cannot be “for each new discussion, problem, or purpose”. That sounds nice, but careful consideration (and certainly experience) teaches us that redrawing boundaries all the time is extremely costly in its own right. As Meadows herself points out: systems are complicated dynamics which are deeply influenced by their boundaries, and attempting to restructure them by redrawing their boundaries is likely to have many unforeseen consequences. Moreover, people need some degree of stability to be able to learn the systems they are working in and co-creating, to be able to work effectively with (or to change) those systems. At a very practical level: spending all your time re-drawing organizational and/or programmatic boundaries is just plain expensive! Every “let’s just rewrite our (monolithic|microservice) architecture into (microservices|a monolith)” effort redraws boundaries, but comes with many unforeseen consequences, because the current system (including its boundaries!) encodes considerable tacit knowledge, many important-but-invisible working relationships, etc.

That does not imply that Meadows is wrong _per se_ about the necessity of reconsidering boundaries. It *does* mean that the statement of that necessity is over-strong.
