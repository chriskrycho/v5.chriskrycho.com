---
title: Your Talk Slides Should Be Progressive Enhancement
subtitle: …because not everyone in the audience can *see*.
date: 2024-05-10T1925:00-0600
tags:
  - public speaking
  - progressive enhancement
qualifiers:
    audience: >
        Anyone who gives “talks” with slides: whether internally for a business, or at a conference, or otherwise.

---

In the world of web development, we sometimes[^1] use the language of “progressive enhancement” to describe an approach that starts out with the basic capabilities provided by a browser and then steadily improves on that experience based on the capabilities that a user might have: styles with <abbr>CSS</abbr>, client-side functionality (rather than needing to bounce to the server) with <abbr>JS</abbr>, and so on. This approach was something of a hard necessity for web sites to be widely useful in the early days of the web, when web browser consistency was something we could only dream of and many users were stuck on positively ancient versions of browsers anyway. I was stamped very deeply by the idea early in my career and it has stuck with me.[^2] And so, when I prepare talks, I think about my *slides* as progressive enhancement.

(There are good reasons not to have slides at all in many contexts. I would prefer a 6-page memo to a slide deck in nearly any context for presenting business ideas, for example. But there are also contexts where slides can be quite valuable. A “talk” at a conference is one such, though as the rest of this post covers, “quite valuable” and “essential” are not the same and must not be conflated.)

I take it as a rule that no part of my talk should *require* someone to be able to see the slides. The slides can make the talk better if someone can see them, can serve to *enhance* the experience. But they must not be *necessary*.

There are many reasons someone might not be able to see the slides. To name just a few (and I am sure you could think of others!):

- Perhaps most obviously, someone might be blind!
- Or perhaps she is off to the side to maintain a bit of discretion while nursing a baby and has no sightline to the slides.
- Or perhaps he is seated behind someone particularly tall and has no sightline to the slides.
- Or perhaps there is a problem with the projector and it keeps flickering in and out of focus.
- Or perhaps he has downloaded the audio and is listening to it on a run.[^3]
- Or perhaps she is reading a transcript of the talk.

If I hold myself to that rule, the content of the talk all has to be present in what I actually say. That is, after all, why I am “giving a talk” rather than handing out copies of essays for people to read. If there is code on a slide, I need to read it—not in a mechanical way, but in a way that conveys the contents to the people listening. As it turns out, this makes code examples much more approachable to everyone in the audience: they might not be familiar with the programming language, or with a particular idiom you use, even if they are programmers.[^4]

Likewise, if textual material appears on a slide, it should *reinforce* what I am saying; it should never say *more* than I am saying, and should never say something *different* from what I am saying. That way the slides are a help for people’s memory: a prompt to jot down a note, perhaps, or something which can jog their memory when reviewing the slides later. If there is material on the slides which I do not cover verbally, that may confuse or distract the people who *do* see the slides.

All the normal rules about the material on slides stands: no reading lengthy bullet points! No paragraphs of text other than (perhaps) quotes—which you should be reading in a way that conveys clearly when the quote starts and ends anyway. Say what you have to say in a way that makes sense as *talk* rather than as *text*, even if you (like me) like to give talks which sit adjacent to essays in structure and content. But all of these things get at the same underlying point: make the talk work as a talk, in service of those attending to it.

---- 

In my most recent talks, I got this about 98% right. As for that last 2%, there was one point in one of my talks when I paused and pointed to the code on the screen and asked the audience to consider something about it. It was code I had described aloud already, but I should have covered it verbally again, albeit more briefly, to make sure that anyone who can *for whatever reason* only hear the talk can still fully understand it. Doing so would have made the point that much clearer to everyone. My goal is to get to 100% next time.

---- 

I started this post many years ago, and in fact I wrote up a much shorter version of the same idea all the way back in May 2018, in [Delivering Talks a Bit More Accessibly](https://v4.chriskrycho.com/2018/delivering-talks-a-bit-more-accessibly.html). I wrote this version of it because I was thinking about this exact subject again over the past few weeks as I prepared my LambdaConf 2024 talks. After I finished drafting most of this post, I dug back through my archives and found that one. I don’t mind being on record saying the same idea twice!

[^1]:	Too rarely, but also too contentiously, these days!

[^2]:	I think folks enamored of the term and the idea can sometimes get a bit self-righteous about it and forget that the point was always to serve the people using our websites: working without JavaScript (for example) was never a good *in and of itself*, but rather as a recognition that some people’s browsers might not support JavaScript, or the version of JavaScript you are providing them, and that it is better if the web site can still serve them anyway.

[^3]:	Yes, I do this on the regular!

[^4]:	In fact, in many cases this can make programming talks more accessible to people with *no* programming background—which can broaden the possible audience for a talk, and can certainly make it more helpful to people new to the field.
