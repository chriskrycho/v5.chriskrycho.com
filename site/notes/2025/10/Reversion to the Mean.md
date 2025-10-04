---
title: Reversion to the Mean
subtitle: |
  A problem with using <abbr title="large language models">LLM</abbr>s as editors.

date: 2025-10-04T17:07:00-0600

tags:
  - AI and ML
  - writing

---

I try to keep an eye on what <abbr title="large language model">LLM</abbr>s[^not-ai] generally behave like, both because it is relevant to my job and because I think it is *interesting*. For all that there are a lot of ways to go completely off the rails with <abbr>LLM</abbr>s, there are also some very interesting ways to deploy them that seem quite unobjectionable from a technological point of view: transcription, for example. (Other objections there are aplenty: my point is that *if* we had legally- and ethically-trained models, using them for transcription seems great.)

One mode where I have been curiously observing the capabilities of new models over the past few years is what you might think of as “editorial feedback”: What happens if you prompt an <abbr>LLM</abbr> to provide critical feedback on a blog post or essay? A couple weeks ago, I did exactly that again with [my post about testing][testing-post]. I dropped this prompt into the Claude <abbr title="user interface">UI</abbr>:

[testing-post]: https://v5.chriskrycho.com/journal/context-and-trust/

> Here’s a short blog post. Identify any structural issues. Keep it to the point—no compliments.

(The last bit is annoyingly necessary. Sycophancy is baked *obnoxiously* deeply into these models.)

Here’s what it responded with:

> The post has several structural problems:
>
> **Weak opening:** You spend too much time summarizing the newsletter before stating your actual thesis or position.
> 
> **Buried lede:** Your main argument about organizational size affecting test suite design doesn't emerge clearly until deep into the piece.
>
> **Meandering transitions:** The "First, second, third" structure works locally but creates choppy flow between major sections.
> 
> **Conclusion lacks punch:** You end with hedging ("there are also very often...") rather than a clear takeaway about when fast local tests work vs. when they don't.
> 
> **Consider restructuring:**
>
> 1. Lead with your core insight about team/codebase size driving test complexity
> 2. Use the DHH/37Signals example as supporting evidence
> 3. Address the counter-arguments more directly
> 4. End with actionable guidance about evaluating your own context
> 
> The content is solid but the current structure makes readers work too hard to extract your key points.

Now, I could make a case that this is decent feedback. But I won’t, because I don’t think it is. If I followed that advice, I would have had a much *worse* blog post. This feedback is only good if your goal is to strip away my authorial voice, the context of my blog (and indeed blogs and the like generally) as an ongoing conversation in public about points of interest, and indeed anything distinctive about the post. The way in which a post rewritten on those terms would be “stronger” is exactly and only that it would be more like your average bit of writing on Medium or dev.to. Boring, average, something like the version of “good writing” you might get from a high school English class. No shade at high school English classes, but I think prose can be better than that, and that blog posts can be more interesting than that. I think a good meander is a good thing sometimes.

It is no a surprise that the default guidance an <abbr>LLM</abbr> gives is best labeled “reversion to the mean”. That is what the training distribution biases toward, both implicitly in that its training distribution is by definition dominated by what is average and explicitly in that it has consumed an awful lot of writing advice like this. The advice you are most likely to get without a *lot* of prompting work is always going to push your writing to be less distinctive and more boring.

You may still be able to something useful out of them for editorial feedback, with sufficient prodding. But remember this.

[^not-ai]: Remember: [not <abbr title="artificial intelligence">AI</abbr>][not-ai] around these parts. 

[not-ai]: https://v5.chriskrycho.com/notes/naming-policy-large-language-models-not-artificial-intelligence/
