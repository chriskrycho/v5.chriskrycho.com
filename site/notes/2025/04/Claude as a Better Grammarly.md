---
title: Claude as a Better Grammarly?
subtitle: >
  Results are mixed. Perhaps unsurprisingly.

date: 2025-04-16T07:27:00-0600

tags:
  - writing
  - AI and ML

qualifiers:
  audience: |
    People curious about how <abbr>LLM</abbr>s compare to standalone tools. Not trying to make a case one way or the other about them more generally in this post.

---

A while back, I tried out Grammarly, because I often find (and even more often *am informed about*) the occasional incomplete sentence or partially-finished edit in blog posts I publish. It didn’t really work for me, though. For one thing, it is too opinionated about matters of style; I spent a lot of time telling it a given piece of text was actually just fine. For another, its app is extremely intrusive—red squiggles everywhere all the time, with constant upsells to boot. I wanted something I could use on demand, *not* something that is in my face.

This morning, after another report of an incomplete sentence, I wondered: “What happens if I upload a file to Claude and have it check for these kinds of mistakes?”—not least because *in principle* it should be possible to get it to give only the kinds of output I am looking for by way of a well-written prompt.

I uploaded a file and gave it this prompt:

> Check this for grammar, incomplete sentences, and unfinished thoughts. No general grammar advice.

The first part of that hypothesis proved out. It did, in fact, generate an appropriate response given that prompt. Great! As per the usual with these kinds of tools, though, the output was… let’s call it *mixed*. It generated five bullet points. Taking each one in turn.

1. Correctly identified a mistake.
2. Made a completely incorrect assertion about the markup in my post.
3. Correctly identified a mistake.
4. Made a *different* completely incorrect assertion about the markup in my post.
5. Just repeated (3) but in a longer-winded way.

Still a net positive over Grammarly, and I may keep using this approach as a quick check before posting things. Not exactly a clean win, though. <abbr title="Large Language Model">LLM</abbr>s are such odd pieces of technology: really remarkable in what they can do, really *strange* in their failure modes.
