---
title: Versioning and Big Binary Blob Art Files
subtitle: >
  Sharing my *ad hoc* version management for writing musical scores. (It works for Photoshop just as well!)
date: 2023-10-30T12:12:00-0600
tags:
  - music
  - composing
  - Dorico
  - software development
qualifiers:
  audience: >
    Other artists—writers, composers, etc.—working with digital files.  And software developers! While I use Dorico projects as the example here, this is equally applicable to all other "big binary blob of data" files used in art etc.
summary: >
  I do manual “version control” for Dorico projects. The same basic approach works for Logic Pro or Procreate or Photoshop or any other “big binary blob” format.

---

I have been working for the past 2½ years on a large orchestral composition. The project ebbs and flows over time, but making major progress on it is one of the major goals of my current sabbatical.[^1] When working on a project this large, I want to keep a history of what I have done. It gives me a way to go back and look at how something was at an earlier point in time. That in turn lets me retrieve ideas, orchestrations, etc. that I may have given up and then decided I wanted after all.[^2]

This basic idea has been a commonplace of good software development for many decades. We use version control systems to track both major changes to the code we write and, in healthy software projects, many of the little intermediate steps as well. Nothing helps with fixing a bug in software like being able to figure out *exactly* when it got introduced, and that in turn is much easier when you are looking at a change that was just a few lines of code rather than one involving thousands.

Unfortunately, while tools exist to make this quite doable (not to say easy!) for software development, there is basically nothing of the sort for things like music scores. They are just big binary blobs of data, inscrutable to version control systems![^3] However, having the record is still handy, so I implement it manually. While the process I describe below is a bit annoying, it has saved my bacon repeatedly on not only this project but earlier works as well.

The workflow is straightforward: Each day, when I go to work on the project, I create a new copy of the project. The file name for each new copy is the date plus the project name. The date is formatted in the [ISO8601](https://en.wikipedia.org/wiki/ISO_8601) format: the 4-digit year, then the 2-digit month, then the 2-digit day. Today, for example, is `2023-10-30`. Formatting dates that way means they are easy to sort by date, which makes it much easier to navigate around through the history of the project on the file system. By contrast, using the standard American `<day>/<month>/<year>` format does *not* sort correctly, because `1/20/24` will end up right next to both `1/13/23` and `1/10/22`. No good!

Once I finish the day’s work, I put the project itself and any associated files—scans of hand-written notes, exported MP3 files, exported <abbr title='portable document format'>PDF</abbr>s, etc.—in a folder which is named the same way.

Additionally, I occasionally create a second copy on the same day. Usually this happens when I am trying out something which I think might be a fork in the road—throwing away a section and trying to replace it with something else, for example. If the section where I am trying that was already present, I will already have a copy from the previous day, so I do not need this extra step. If it is newly composed on the same day, though, I need the extra backup. In that case, I will add a letter to the end of the date: `2023-10-30b`. This makes sorting continue to working just the same.

The result is that, for the Dorico directory in this large project,[^4] I end up with a file structure that looks like this:

```sh
My Project
├── 2021
│   ├── 2021-05-30
│   │   └── 2021-05-30 - The Project.dorico
│   ├── 2021-07-13
│   │   ├── 2021-07-13 The Project.dorico
│   │   ├── 2021-07-13b The Project.dorico
│   │   └── 2021-07-13b The Project.mp3
...
│   └── 2021-12-25
│       └── 2021-12-25 Project Subpart.dorico
├── 2022
│   ├── 2022-01-17
│   │   └── 2022-01-17 Project Subpart.dorico
...
│   └── 2022-12-03
│       └── 2022-12-03 The Project.dorico
├── 2023
│   ├── 2023-01-04
│   │   ├── 2023-01-04 The Project.dorico
│   │   ├── 2023-01-04b The Project.mp3
│   │   └── 2023-01-04b The Project.dorico
│   ├── 2023-01-05
│   │   ├── 2023-01-05 Full score – The Project.pdf
│   │   ├── 2023-01-05 The Project.mp3
│   │   └── 2023-01-05 The Project.dorico
...
│   └── 2023-10-27
│       ├── 2023-10-27 The Project.mp3
│       └── 2023-10-27 The Project.dorico
└── 2023-10-30 The Project.dorico
```

This is very much worse than what version control software gives me, because it is *so* much less granular. When writing software, I can create a check point as often as I like: after making a single-character change, or after a hundred massive changes scattered across dozens of related files.

Doing that with Dorico files would be prohibitively expensive in terms of both time and sheer file size: Making a new copy of big project like the one I am working on takes 5–10 seconds before it is usable again, and every copy of the file is over 3 megabytes of data at this point. (They *started out* at 800 kilobytes and went up from there. It turns out writing for mammoth orchestras just takes a lot of data!) Version control software, by contrast, tends to store on the differences between files—or the moral equivalents therefore—which can be much, much smaller. Given Dorico’s robust “undo” support, though, this is usually “good enough”.

Hopefully other artists can benefit from this strategy, since it works equally well for a Procreate project blob as it does for a Dorico project blob!

---- 

A bonus note for software developers—

There is a huge hole for this kind of capability outside software development. Some apps build in this kind of capability themselves, like Adobe’s Lightroom <abbr title="Creative Cloud">CC</abbr>. There is nothing that works across apps, though. That means that multimedia projects which cross the boundary between different applications and thus file formats are stuck with the kind of manual management I describe here.

The problem is fundamentally difficult, because by definition “big binary blobs” like these are harder to deal with for our version control systems as they exist today. Each application *has* to do the work implementing its own versioning system as a result. I suspect the only path forward here is for someone to design a versioning protocol for arbitrary binary formats. Such a protocol would be difficult to design, to say the least. It is not for nothing that existing version control systems are largely built on top of the existing “protocol” that is plain text formats.

Still: an interesting set of things to consider—

- What would such a protocol entail?
- How might it gain adoption?
- What techniques would it use for storage and compression?
- How might it interoperate with software development-focused tools like Git?
- What would “hosting” (like GitHub, GitLab, etc.) look like?

[^1]:	I am much rejuvenated by doing creative projects and learning!

[^2]:	When I actually finish this, I would like to (but make no promises to!) publish a little mini-site documenting the history of the project to show people what it looks like to do this kind of thing start to finish.

[^3]:	Yes, yes, [LilyPond](https://lilypond.org) users, I know: you can repurpose tools like Git to work with LilyPond since it is a textual format. I do that for writing, too! But I have reasons to prefer tools like Dorico and Logic, and so do the vast majority of working composers.

[^4]:	I also have dedicated directories for Logic Pro and Staffpad. Although I am not using Staffpad much at this point, I used it extensively at the beginning of the project. Similarly, I use Logic Pro primarily when sketching out new ideas—melodic, harmonic, or orchestration—so it has not gotten much use in the last year or so while I have just been plugging away at parts where I already have those basics nailed down. Having the distinction between these directories is quite handy, though!
