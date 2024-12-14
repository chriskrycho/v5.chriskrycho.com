---
title: Initial Notes on Elicit
subtitle: >
  Playing around a bit with [the <abbr title='machine learning'>ML</abbr>-powered research tool](https://elicit.org) from the folks at [Ought.org](https://ought.org).
qualifiers:
  audience: >
    Folks thinking about <abbr title="artificial intelligence">AI</abbr> and <abbr title="machine learning">ML</abbr>, <abbr title="user interface">UI</abbr> design, and—especially!—their intersection.
  epistemic: >
    Test-driving a new tool, and by no means an expert in it: this is a first-run experience report.
  context: >
    I recently came across the [Elicit](https://elicit.org) research tool from the team at [Ought](https://ought.org), and thought it was one of the most interesting (maybe *the* most interesting) use of <abbr title="artificial intelligence">AI</abbr> and <abbr title="machine learning">ML</abbr> I’ve yet seen. I had the chance to chat a bit with Ought’s <abbr>COO</abbr> [Jungwon Byun](https://www.linkedin.com/in/jungwonbyun/) today after mentioning how interesting their work was on Twitter last week, and it got me pretty excited about the research possibilities for Elicit, so I finally made some time to play with it this evening. What follows are a stream of notes as I muck around.
summary: >
  This tool has a lot of promise: its UI design is absolutely pointed the right direction and has really wise defaults, the underlying model is deployed in a really smart way, and its failings are the failings of all current LLM-based systems.
date: 2023-01-10T19:13:00
tags:
  - AI and ML
---

One thing I *really* like right out of the gate is that it actively explains *how* it got the answers it does. Every single piece of data it surfaces links back to the content it refers to.

Directly related to that: the <abbr title="user interface">UI</abbr> design actively encourages *reading the paper*. The top level set of results you get when you ask a query is an interactive list. When you click an item, to dig in past its summary, you get *all* of the information that Elicit has, including the paper text itself if they have the ability to share it.

Combined with the first note, this means that the default behavior when using the tool is something like:

- Launch a search.
- See the paper titles and abstract summaries.
- Click into the paper.
- See how the model got all of the info surfaced at both the summary level and its detailed analysis *in the text of the paper*.

The papers it serves up are not necessarily all directly related to the question—if you do a query where the corpus does not have the info it needs, the <abbr>UI</abbr> surfaces papers which are indirectly related and then explicitly states:

> However, these papers do not explicitly address the question “...”.

This kind of transparency is *really* important; I would argue it is literally the most important thing about *any* <abbr>AI</abbr>/<abbr>ML</abbr> system, and the vast majority of existing systems *fail the test catastrophically*. Zero for effort. I’d be curious to see whether you could surface *even more* here, digging further into how the model actually derived it, but just seeing *where* the model derived its summary/answer from is a huge step that most models do not take. (Imagine GitHub Copilot being able to point to its corpora of related samples—that would make it a far more *illuminating* tool, rather than the opaque oracle it is at present.)

The *kinds* of data surfaced are also very helpful for evaluating the papers. Getting lists like this alone could be a huge boon as you’re trying to get your head around a new topic:

> Can I trust this paper?
>
> - No mention found of funding source
> - No mention found of participant count
> - No mention found of multiple comparisons
> - No mention found of intent to treat
> - No mention found of preregistration

Well, hey, this particular paper has now gone down *significantly* in my estimation of its likely validity, given that all of these are pretty important markers!

The flip side there is that the model, unsurprisingly given how systems like this work, can be kind of dumb. For example, I clicked into a paper it surfaced—a lit review—and it reported tha there were “5 participants.” I was curious how that worked given it was a lit review. It turns out that the model identified the participant count from one of the papers *cited by* the lit review in question. The model *did* correctly identify that it was a lit review, but did not adjust the rest of its reporting accordingly.

<aside>

This is suggestive of the importance of the thing you ask a model to do: if you want it to surface things which match a particular set of questions, it will—even if those questions need to be adapted significantly depending on context. The lack of understanding of that context is a hallmark of *all* current-generation <abbr title="large language model">LLM</abbr>s, so it’s not a surprise it shows up here. It’s possible (and in my view likely), though not yet removely proven, that this is a fundamental limitation of <abbr>LLM</abbr>s, given they are primarily *mimics*. Diving further into that is a whole different post; I mostly recommend reading [Gary Marcus](https://garymarcus.substack.com) on that front.

</aside>

As with *all* current <abbr>ML</abbr> systems, you cannot trust the model’s answer, but that does not make it useless. Because it points you into the paper source, thereby encouraging you to interact with the text yourself, it can still serve to enable your own reading and understanding. The defaults—I really cannot emphasize this enough—*matter*, and at least on this first pass with Elicit, the defaults are *good*. They bias toward “do the reading” and “understand this”, acting as a gateway and a useful way of surfacing materials, rather than as a shortcut *around* them.

Also, as with other current <abbr>ML</abbr>-driven systems, updating your query/input based on the results you get in the first round can be a productive exercise. Here, for example, I noticed that although Elicit reported that no papers specifically addressed the question I asked, several of the papers had adjacent phrases in their text, and so I did a *new* search using the phrase which seemed like they could be good prompts, and using those did indeed surface more useful data.

That is suggestive of one of the ways a tool like this could be particularly helpful (and matches one of the things Jungwon noted to me as we talked about this earlier): when you are first starting to learn about a field, you may not know what to ask, still less where to find the answers. You can ask a relatively naïve version of a question and then use the responses to refine your question to use the field’s jargon—because every field has jargon, but by definition you cannot know it as an outsider/newcomer!

The last thing I noticed in this evening’s pass: one of the pervasive problems with published literature like this is the frequency with which people cite papers *wrongly*—incorrectly summarizing the citation, sometimes even citing it as reporting the opposite of what it actually reports. The built-in list of citations of the paper makes it pretty easy to compare the citations to the actual paper’s argument—again, with a well-designed presentation. This is not itself a ground-breaking capability, and of course it is limited by the corpus fed into the model (another persistent challenge of these systems!), but it could be *very* helpful when trying to do archaeological/historical work on a given concept or claim.

---

That’s enough for now, but I think I will probably start making regular use of Elicit, and if/as I have more notes like this, I will write them up and share them. I may also put together a screen-cast on it once I have used it a bit more. So far, though, I really like it!
