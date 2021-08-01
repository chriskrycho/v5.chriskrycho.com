---
title: >
    StaffPad to Dorico via Music<abbr title="eXtensible Markup Language">XML</abbr>? Alas, no.
subtitle: >
    A tale of woe! …but with some tips for less woeful tales to sooth the bitter pill this is.

date: 2021-07-31T16:40:00-0600
tags:
    - StaffPad
    - Dorico
    - MusicXML
    - music
    - composition

qualifiers:
    audience: >
        People who care about music composition and notation software.

---

Over the course of the mini-sabbatical I have been on throughout July, I have spent a bunch of time composing in [StaffPad][s]. However, while I find StaffPad to be a pretty great piece of software for quickly entering ideas as I think of them, I really prefer [Dorico][d] as a source of truth for my scores. Dorico’s notion of what music is and how music works is [much better][note], and the documents it generates as output are much better as well.

[s]: https://www.staffpad.net/
[d]: https://new.steinberg.net/dorico/
[note]: https://v5.chriskrycho.com/notes/2021-07-29-1321/

The net is that I want Dorico to be the source of truth for my work. That makes me want to lean in and just use it as my digital sole tool (alongside a piano and paper and pen). However, I *cannot* use it in some of the contexts where StaffPad is particularly useful to me: or at least, not as easily. I have done a lot of my work this month just chilling on a couch or even lying abed. An iPad is a *fantastic* tool for that kind of thing: it is far more versatile than a laptop. Combine that with StaffPad’s good—if very imperfect—handwriting recognition, and that was a great way to work this month.

Dorico’s [just-released iPad version][d-ipad] might seem to fit the bill—but unfortunately does not (yet?) work for the kind of things I mostly compose. In particular, its 12-player limit is simply a non-starter for the kinds of large-scale orchestral works which are what I’m spending my time on right now. For example: my [Fanfare for a New Era of American Spaceflight][fanfare] has 33 “players” in the Dorico project. What I’m working on now has… *more*. Perhaps a future version with the equivalent of the full Dorico Pro feature set will give me everything I need in that regard: I’m by no means married to handwriting-based input. But I can’t use that future version now.

[d-ipad]: https://new.steinberg.net/dorico/ipad/
[fanfare]: https://v5.chriskrycho.com/elsewhere/fanfare-for-a-new-era-of-american-spaceflight/

I hoped, then, that [Music<abbr title="eXtensible Markup Language">XML</abbr>][music-xml] would let me have the best of both worlds: working quickly in random contexts with StaffPad, but taking that work back into Dorico regularly. That is the dream: to be able to use whichever tool is “right for the job” at any given moment, and have them seamlessly hand the relevant data between each other.

[music-xml]: https://www.musicxml.com

Unfortunately, as every software developer who has ever worked with interchange formats like this knows, this is an incredibly hard problem, and [it simply won’t work 100% of the time][forum]. With the complexity of the scores I’m writing, it’s honestly more effort than it’s worth to try to go back and forth this way: I will spend more time than I can justify just trying to match up the exports from the one in the import to the other.[^afternoon]

So now I need to decide whether Dorico or StaffPad will be my source of truth for the course of this particular composing effort. (My money is on Dorico, but we’ll see.) In the meantime, I have one big tip for getting your own Music<abbr title="eXtensible Markup Language">XML</abbr> transfers to work as well as possible:

Match up instrument names between your programs *exactly*. My first experiments here mostly foundered on exactly that point. In later passes, I got *much* better results because I made sure the names of the instruments in StaffPad and Dorico were identical. For example: always “Horn” in both rather than “French Horn” in one and “Horn (F)” in the other. A big qualification to that: Percussion is unlikely to work well, as far as I can tell. Mapping “Violins I” to “Violins I” is fairly straightforward. Not so with percussion: percussion notation is much more diverse even than the wide range of options which exist for other (Western) instruments. Accordingly, every program has its own custom way of handling percussion, and the interaction between StaffPad’s and Dorico’s ideas about how percussion ensembles work was catastrophically bad.

[forum]: https://forums.steinberg.net/t/manually-merge-instruments-after-musicxml-import/730002/2

[^afternoon]: No comment on whether this is exactly how I spent this afternoon. 😑