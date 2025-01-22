---
title: "Two Quotes and a Question on Software Engineering and <abbr title='artificial intelligence'>AI<abbr>"
subtitle: >
    What should we make of generative <abbr>AI</abbr> systems in software engineering?

date: 2025-01-20T11:18:00-0700
updated: 2025-01-21T18:10:00-0700
updates:
    - at: 2025-01-21T18:10:00-0700
      changes: Inlined the footnote.

tags:
    - software engineering
    - AI and ML
    - quotes

---

## I. 

Annie Vella, in [Dear Software Engineer][dse], December 2024:

> I think we’re rapidly moving into an era where humans no longer write code by hand. Instead, we instruct agentic AI systems that use LLMs to do it for us. But it’s not just about one-on-one interaction with AI - the future might look more like managing an entire AI development team.… In other words, <abbr title="Chat-Oriented Programming">CHOP</abbr> is just the beginning. With <abbr title="Bot-Assisted Task OrchestratioN">BATON</abbr>, a software engineer’s role shifts from coding line-by-line to orchestrating and overseeing multiple AI “team members,” each responsible for different chunks of work. This represents a fundamental change in what it means to be a software engineer - and a clear signal that we need to expand our skill sets beyond just writing code.

[dse]: https://annievella.com/posts/dear-software-engineer/

## II.

Peter Naur, [Programming as Theory-Building][ptb], 1985:

> 1) The programmer having the theory of the program can explain how the solution relates to the affairs of the world that it helps to handle. Such an explanation will have to be concerned with the manner in which the affairs of the world, both in their overall characteristics and their details, are, in some sense, mapped into the program text and into any additional documentation. Thus the programmer must be able to explain, for each part of the program text and for each of its overall structural characteristics, what aspect or activity of the world is matched by it. Conversely, for any aspect or activity of the world the programmer is able to state its manner of mapping into the program text. By far the largest part of the world aspects and activities will of course lie outside the scope of the program text, being irrelevant in the context. However, the decision that a part of the world is relevant can only be made by someone who understands the whole world. This understanding must be contributed by the programmer.
>
> 2) The programmer having the theory of the program can explain why each part of the program is what it is, in other words is able to support the actual program text with a justification of some sort. The final basis of the justification is and must always remain the programmer’s direct, intuitive knowledge or estimate. This holds even where the justification makes use of reasoning, perhaps with application of design rules, quantitative estimates, comparisons with alternatives, and such like, the point being that the choice of the principles and rules, and the decision that they are relevant to the situation at hand, again must in the final analysis remain a matter of the programmer’s direct knowledge.
> 
> 3) The programmer having the theory of the program is able to respond constructively to any demand for a modification of the program so as to support the affairs of the world in a new manner. Designing how a modification is best incorporated into an established program depends on the perception of the similarity of the new demand with the operational facilities already built into the program. The kind of similarity that has to be perceived is one between aspects of the world. It only makes sense to the agent who has knowledge of the world, that is to the programmer, and cannot be reduced to any limited set of criteria or rules, for reasons similar to the ones given above why the justification of the program cannot be thus reduced.

[ptb]: https://cdn.chriskrycho.com/resources/naur1985programming.pdf

## A question

I actually agree with a fair bit of the *advice* Vella offers—but for the reasons Naur suggests, rather than anything to do with <abbr title="artificial intelligence">AI</abbr>, and I think she draws an extremely silly false dichotomy between “specialising as a code writer” and “product engineers” and paints a picture completely out of step with my own experience of software developers over the past 15 years. However:

If the second quote is a true and accurate picture of the actual work of programming (as I believe it is), what do we make of the claim in the first quote? If the claim in the first quote is accurate and obviates or falsifies the claims in the second, how does it do so?