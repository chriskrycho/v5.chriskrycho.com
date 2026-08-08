---
title: Impressively Capable, Impressively Foolish
subtitle: |
    A little report on the state of contemporary <abbr title="large language model">LLM</abbr>-based tools.

tags:
    - AI and ML

date: 2026-08-07T21:12:00-0600

---

Yesterday, I decided to try to use Claude to automate a workflow I do a ton in my composing:

1. Export the mockup audio from my notation software as a <abbr title="Waveform Audio File Format">WAV</abbr> file
2. Import it into an audio editor and bump the gain a bit.
3. Export it as an <abbr title="MPEG Audio Layer-3">MP3</abbr>.
4. Add the relevant <abbr>ID3</abbr> tags.
5. Import it into Apple Music.
6. Fix one thing that the <abbr>ID3</abbr> tag editor I use doesn’t handle: setting the track to use “work name” rather than “title” as the primary field—pretty standard for classical works, but not something [my preferred <abbr>ID3</abbr> tag editor][meta] handles correctly.
7. Wait for it to finish syncing with my Cloud Library.
8. Update the playlist with the latest version of the 

[meta]: https://www.nightbirdsevolve.com

Much of the process of building out the plan went about like normal when working with one of these tools—lots of overcomplicated things to trim down, a fair few . But then when I started trying to figure out how to resolve the “work title” handling, everything went *completely* off the rails.

It started out fine. Claude (running Opus 5) couldn’t tell what the difference was between my Meta-tagged files and the files as stored in Music, so I nudged it to look at the other classical files in my library, and it noted a corresponding tag on <abbr title="MPEG-4 audio">M4A</abbr> files, did a web search to look up the corresponding <abbr>ID3</abbr> tag (it turns out there is one!) and reported it: `shwm` for <abbr>M4A</abbr>, `TXXX:SHOWMOVEMENT` for <abbr>ID3</abbr>. That would have been the point a human, or a reasonably designed tool, stopped. Reader, Claude did not stop there.

Instead, Claude started—and here I am directly quoting from its own summary of what it was doing—“grepping the Music binary and the dyld shared cache”, _i.e._, trying to parse the strings stored in the binary for the app. It was attempting, in other words—in a deeply misguided and ultimately completely failing fashion—to figure out where and how Music processes the <abbr>M4A</abbr> and corresponding <abbr>ID3</abbr> tags. This was an unbelievably wasteful approach in terms of tokens and time—I let it run because it was well within the limits of the cheap plan I pay for to understand these things and wanted to see just where it would end up.

It was unbelievably wasteful, I say, because the obvious way to figure out how Music.app handles the `TXXX:SHOWMOVEMENT` <abbr>ID3</abbr> tag is: add it to a file and import it and see what Music.app does. That’s it! You need the ability to add arbitrary tags, but courtesy of everything else I was going to do with this little bit of automation (and the fact that Meta doesn’t support this *or* have any scriptability, alas) I already had that capability ready to hand. Searching the binary is absurd.

This is a synecdoche for much of the current state of <abbr>LLM</abbr>-based tools. Remarkably capable in some ways, and still—unsurprisingly, if you understand what <abbr>LLM</abbr>s are and are not—utterly incapable of good judgment, and tuned [way too far][ayjay] in the direction of “autonomy”. The fact that you *can* point an <abbr>LLM</abbr> at a binary and have it search its strings or even outright decompile it is pretty neat. I don’t want to undersell that a bit. However, the fact that the current set of harnesses and models are so tuned to run off on their own, rather than to defer to a human being with a real sense of judgment is terrible.

[ayjay]: https://blog.ayjay.org/a-conversation-presented-without-comment/

You can see how the teams behind the tools get there. The tools are benchmarked on, and therefore their development aims squarely at, “task completion”. Too, the average user is not someone who has thought deeply about how the tools work, still less about how to use them without cognitive offloading or indeed cognitive surrender. The tuning these companies[^cos] are doing may be perfectly well-intented, to make the tools more successful as “agents” acting on behalf of their users. But in practice, this is a big part of what makes them [dangerous][hf] to “let loose” and a big part of what makes them rather *un*-[convivial tools of computing][cc].

[hf]: https://huggingface.co/blog/security-incident-july-2026
[cc]: https://v5.chriskrycho.com/essays/computing-convivially/

I don’t believe that unconviviality inheres in <abbr>LLM</abbr>s *per se*. I do believe that the way they are currently built and deployed is foolish. That folly produces tools that are  terribly frustrating for those of us who are determined to keep our agency, who prize our ability to think and decide for ourselves over some abstract notion of “tasks accomplished” or even the more concrete, banal, and possibly deadly-to-the-soul pursuit of profit.

[^cos]: Yes, as someone I know pointed out recently, just companies: not “labs”.