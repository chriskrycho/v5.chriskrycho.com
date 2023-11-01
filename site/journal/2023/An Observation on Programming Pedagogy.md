---
title: An Observation on Programming Pedagogy
subtitle: >
  One reason textbooks can be frustrating for practitioners.
date: 2023-11-02T10:10:00-0600
tag:
  - software development
  - learning
  - teaching
qualifiers:
  audience: >
    People interested in and broadly familiar with the state of software pedagogy.

---

I have long found programming *textbooks* rather difficult to deal with. Distinctly textbooks, as distinct from books aimed at practitioners. I realized one major reason for this frustration while continuing my journey through [<cite>Programming Languages: Application and Interpretation</cite>](https://plai.org) (<cite><abbr title="Programming Languages: Application and Interpretation>PLAI</abbr></cite>). After spending a couple chapters working through its macro system, <cite><abbr title="Programming Languages: Application and Interpretation">PLAI</abbr></cite> moves into defining and working with objects and classes, with this transition:

<figure class="quotation">

> …Therefore, even though a real implementation may well have at least parts of objects (especially the parts needed for efficiency) in the core language, we are going to build objects entirely through desugaring, using macros. In fact, in this book, we will do something even simpler: **we will give concrete examples of what programs desugar to. Figuring out the general desugaring will be left as an exercise for you.** To aid in that process, we will write code in as stylized a form as possible, not using any short-cuts that might obscure the macro rules.

<figcaption>—<cite><abbr title="Programming Languages: Application and Interpretation">PLAI</abbr></cite> v. 3.2.2, Shriram Krishnamurthi, emphasis mine</figcaption>

</figure>

In the chapter that follows, the book tosses the reader into the deep end. Up to this point, the book had walked the reader fairly carefully through each step. While it rarely provided the *whole* solution, it usually provided enough of the key parts to make it easy to get unstuck if I was hung up on something. Here, though, the book switched to a mode where it provided a single concrete example and then asks the reader to generalize from that single example into a robust macro which can handle *all* such cases.

This pattern is extremely common in textbooks in my experience. And even with the earlier parts of the book, where there was *enough* to work out the gaps myself, I noted that the book approached that content in a very different way from materials aimed at practitioners—whether websites or books. Materials aimed at practitioners basically never do this. They always walk fully through each part of the material.[^parsers] They might have points to pause and try things out; they might even [take advantage of spaced repetition to help you learn](https://www.executeprogram.com). But they always make sure they cover the ground fully.

There are likely many reasons for these differences, but one of the biggest occurred to me this morning: precisely the [assumed audience](https://v4.chriskrycho.com/2018/assumed-audiences.html). Materials aimed at college students can assume the available of <abbr title="teaching assistant">TA</abbr>s, office hours with the professor, and a community of peers working through the same materials. If one student gets stuck, she has *many* sources of help besides the book itself. Much of the structure of college pedagogy is oriented around, and implicitly or explicitly assumes, those other factors as support structures for the process of learning. Materials aimed at practitioners must assume that the learner is working alone, with *no* support structure, likely in spare time carved out between a day job and whatever other responsibilities she has in life. A textbook does not have to, and as usually deployed indeed should not, provide all of the help and feedback required for learning along the way. Materials written for the solitary learner must make just the opposite choice.

We could really use more materials which cover the same ground as textbooks like <cite><abbr title="Programming Languages: Application and Interpretation>PLAI</abbr></cite> but which take the practitioner approach pedagogically!


[^parsers]: Except for materials on parsers. Those always have a [“Now draw the rest of the f–––ing owl”](https://knowyourmeme.com/memes/how-to-draw-an-owl) attitude for some reason.
