---
title: Re-packaging Existing Content, Transformation, or Both?
subtitle: >
    Some technical notes for thinking about the legal and ethical questions around “generative” <abbr>AI</abbr> systems.

date: 2025-01-29T12:55:00-0700

tags:
    - Q&A
    - AI and ML

---

This morning, [a friend][arbo] asked in a group Slack we’re a part of:

[arbo]: https://www.linkedin.com/in/matthewarbo?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BFpU0sI30QdWmK99CTbcj8Q%3D%3D

> why isn't A.I. treated fundamentally as an algorithmic re-packaging of already existing content? If its "generative" only in the sense that it selects and applies content but doesn't 'create,' how is that distinguishable from rote plagiarism? Even the naming of specific functions seem designed to shield it from the accusations that it doesn't really do those things. A cynical part of me wants to say that A.I. companies and investors know this is precisely what's happening and assume the financial stakes are now so high it all but eliminates the likelihood of legal challenges or political curtailment. But I also really struggle to understand the operational principals of A.I., so perhaps I just needs straightening out.

Here’s what I wrote in response (no edits, and just adding a couple links!):

This is exactly the basis of the ongoing lawsuits, and [the Copyright Office’s memo][copyright] on it from last year would seem to suggest that at least one major part of the government agrees with you. The question around [Fair Use][fu] basically comes down to: *nearly everything* is a “remix” in some sense, so at what point does the generation of new materials that is admittedly sourced from, albeit in a fairly complicated mathematical way, existing materials constitute something *novel*?

[copyright]: https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-1-Digital-Replicas-Report.pdf
[fu]: https://fairuse.stanford.edu/overview/fair-use/what-is-fair-use/

The “is it ‘transformative’?” test is key, and part of what makes this tricky is that (a) it was absolutely trained on copyrighted material; (b) it can clearly regurgitate that material *very* directly, i.e. the “training” approach definitely constitutes a kind of “memorization” in many cases; but (c) *most* output is *not* purely regurgatative, but in fact can produce new material appropriate to a new context on the basis of the prompts.

So the argument from folks in support of these tools falling under Fair Use is that non-regurgatative use is primary and that users who *try* to get it to regurgitate text (e.g. setting up a prompt for which the most likely continuation is, uhh, the rest of a given <abbr title="New York Times">NYT</abbr> article, to pick the most prominent lawsuit/example) are actually the ones liable, in much the same way that it’s perfectly legal (if annoying) to write a a post that summarizes someone else’s reporting but *not* legal to simply reproduce it as if it is your own.

So to get very directly at the point of your question—

> why isn’t A.I. treated fundamentally as an algorithmic re-packaging of already existing content? If its “generative” only in the sense that it selects and applies content but doesn’t ‘create,’ how is that distinguishable from rote plagiarism?

—it *is* an “algorithmic repackaging”, but in such a way that *most* content it emits bears no *direct* resemblance to any specific original piece of content. Rather, it’s sort of like the statistical average of *all* of the original content in the mathematical relationship of “this word is similar to that one in key ways it is used”, which in turn is why it can be *generative* in the sense of generating something that has not specifically appeared before, but very much *not generative* in the sense of actual creativity.
