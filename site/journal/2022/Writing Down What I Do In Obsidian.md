---
title: Writing Down What I Do—In Obsidian
subtitle: An update on my years-long habit, with a new tool.
tags:
    - working effectively
    - Obsidian

qualifiers:
    audience: >
        People who are interested in working effectively, particularly with an eye to keeping track of accomplishments, building “brag docs,” etc.

date: 2022-11-08T20:05:00-0700

templateEngineOverride: md

---

Over the past year or so, I have transitioned my note-taking out of [Bear][b] and into [Obsidian][o]. The piece of my notes system I took longest to transition over, for a variety of reasons, was my habit of writing down what I do (see [here][log-1] and [here][log-2] for previous write-ups). Getting [my basic Obsidian config][config] to a point where I was mostly satisfied with the typography meant I was comfortable enough with using it for work tracking.

[b]: https://bear.app
[o]: https://obsidian.md
[log-1]: https://v4.chriskrycho.com/2018/just-write-down-what-you-do.html
[log-2]: https://v4.chriskrycho.com/2019/update-writing-down-what-i-do.html

Sitting down last Friday to wrap up my week, I was doing my usual dance of copying over my daily summaries into the week-level note to help with my weekly review and *its* summary. This has been a fairly repetitive and error-prone process for me in the past. Sometimes writing up the summary of the week reminds me of something I did one of the days, which I want to include for posterity, so I have to write it up in both the week note *and* the daily note. It is easy for those to get out of sync. Yes, this is a function of my own fastidiousness about this note-keeping, but I genuinely find that very valuable when I look back at these for mid-year or annual reviews. But it is a pain in the neck to *do*.

Then I had a flash of inspiration: now that I’m using Obsidian, I never have to do this again.


## How my work notes work

My work notes have a fractal structure to them: Every view is just a more granular or more abstract view of what I’ve done over a given period of time, but by definition has the same structure, though possibly with additional *sub*-structure. Most importantly here, every single note has an **Outcomes** heading, with **Summary** and **Artifacts** subheadings. The **Summary** section is just what it sounds like, while **Artifacts** is a nice place to list out items I can actively share to represent my work to someone else—pull requests opened or reviewed, documents written or reviewed, etc.

Having that list of Artifacts is super helpful when putting together an annual review, info for a promotion, etc.—any time I need a [brag doc][brag]. I don’t always preserve the distinction between “Summary” and “Artifacts” but it is sometimes helpful in distinguishing between the gist of what I did and the *evidence* of what I did.

[brag]: https://jvns.ca/blog/brag-documents/

Each level of note above the daily note has links to the lower-level note which makes it up, so weekly notes link to daily notes, monthly notes to weekly, and so on. (There are links the other way for easy navigation, too, but those are not as relevant to the work of summarizing!) Historically, I just did that with links and copy-and-paste. A recent week might look like this, for example:

```markdown
## Outcomes

- [[Work/Tracking/2022.08.29|2022.08.29]]:
    - mostly 1:1s
    - made some progress on project q

- [[Work/Tracking/2022.08.30|2022.08.30]]:
    - did some things
    - more things
    - artifacts:
        - [some PR](link-to-github)
        - [some doc review](link-to-Google-Docs)

- [[Work/Tracking/2022.08.31|2022.08.31]]:
    - (etc.)

- [[Work/Tracking/2022.09.01|2022.09.01]]:
    - (etc.)

- [[Work/Tracking/2022.09.02|2022.09.02]]:
    - (etc.)
```

…and so on for the rest of the week. By copying this information over, I was able to build up a summary at the end of the week/month/quarter/year without drilling down into the child notes to figure out what I had done. But as I described above, it was a lot of error-prone work to do that, especially if I wanted to tweak a summary on rereading it! That meant it was easy to *not* do it instead.

Obsidian’s block embeds change that calculus entirely.


## Working with embeds

Obsidian has the fantastic idea of [block embedding][be].[^ideas] Block embeds are wiki-style links that embed the content of the corresponding part of the linked note. That works most directly and easily with headings, though Obsidian will also generate references for paragraphs, lists, etc. if you so choose.

[be]: https://help.obsidian.md/How+to/Link+to+blocks

You write a block embed to a heading like this:

```markdown
![[other-note-id#heading]]
```

Since I *already* structure my work notes with a heading for the bits I care about at the end of each level, under **Outcomes**, all I have to do is replace the manual copy-and-paste dance with a block embed instead.

Here's how that looks, given the same example weekly note:

```markdown
## Outcomes

- [[Work/Tracking/2022.08.29|2022.08.29]]: ![[Work/Tracking/2022.08.29#Outcomes|2022.08.29]]

- [[Work/Tracking/2022.08.30|2022.08.30]]: ![[Work/Tracking/2022.08.30#Outcomes|2022.08.30]]

- [[Work/Tracking/2022.08.31|2022.08.31]]: ![[Work/Tracking/2022.08.31#Outcomes|2022.08.31]]

- [[Work/Tracking/2022.09.01|2022.09.01]]: ![[Work/Tracking/2022.09.01#Outcomes|2022.09.01]]

- [[Work/Tracking/2022.09.02|2022.09.02]]: ![[Work/Tracking/2022.09.02#Outcomes|2022.09.02]]
```

This renders the contents of the **Outcomes** section of the daily work note directly in line. Including the full, absolute path (from the root of the notes “vault”) in the wikilink, like `[[Work/Tracking/2022.09.02|2022.09.02]]`, means these wiki-links work in *every* tool that understands wiki-links (for example: I use [iA Writer][ia] in conjunction with Obsidian quite a bit, especially on iPad) and still look nice. Then the block embeds simply get replaced with the relevant section from the target note.

[ia]: https://ia.net/writer

The result looks something like this:

<picture style="max-width: var(--max-width)">
    <source srcset="https://cdn.chriskrycho.com/file/chriskrycho-com/images/obsidian-workflow/2022-11-08@2x-dark.png" media="(prefers-color-scheme: dark)">
    <source srcset="https://cdn.chriskrycho.com/file/chriskrycho-com/images/obsidian-workflow/2022-11-08@2x-light.png" media="(prefers-color-scheme: light)">
    <img src="https://cdn.chriskrycho.com/file/chriskrycho-com/images/obsidian-workflow/2022-11-08@2x-dark.png">
</picture>

The result is that each work tracking note can be the source of truth for that particular day/week/month/etc.—the other note just *includes* it. I don’t have to copy back and forth to keep things in sync anymore. This is *fantastic*, and I recommend it highly!


## In practice

With that update to my workflow in place, things look *similar* to how they did when I [first wrote up][log-1] my daily notes approach a few years ago, but there are a number of other small tweaks—some from Obsidian and some just because my work looks *quite* different as a tech lead for LinkedIn than it did as a product engineer at Olo.

The basic workflow for me now is: At the start of each day, create a new note, and use the shortcut I have for inserting templates (<kbd>⌘</kbd><kbd>⎇</kbd><kbd>⇧</kbd><kbd>T</kbd>—“T” for “template”) to generate the body of the daily note. After creation, I make a few further tweaks:

- Update the link to the weekly note. (I can definitely use a templating plugin to make this happen automatically, but haven’t spent the time on that yet.)

- Write down my overall goals for the day, pulling from the goals I set at higher levels in the schedule.

- Note my meetings for the day. This is technically a duplicate of my calendar, but:

    1. Copying it over into my daily note helps me actually internalize the schedule in a way that looking at my calendar view does not. This is likely related to:

    2. I *hate* calendar apps. Not in the sense that I have a problem with any specific app, but rather in the sense that I dislike calendar apps as a way of managing my schedule. (Weird? Maybe, but it is a thing I have come to terms with about myself over the last five years.)

- Fill out what I do throughout the day, taking notes on the various chunks of time in the day. I am not currently in the habit of using a pomodoro timer most of the time, so I do not worry about that level of granularity as I did in the past—it’s more about the broad strokes and anything worth noting as an “artifact” I generated. (If I’m in a season where it matters, I will sometimes keep tracking of my working *time* throughout the day here, too.)

- At the end of the day, I summarize that work into the **Outcomes** section of the note: I summarize what I did in **Summary** and list out any interesting artifacts (documents, pull requests opened or reviewed, etc.) in **Artifacts**. This is the key bit that Obsidian unlocked for me, but it relies on the rest of it to be effective, at least for me!

At the start of each week, I do the same thing with a weekly note, again using the template command and just picking my weekly note template instead of the daily note template. Filling this out works nearly the same way as filling out the daily note does. I link to the monthly note and in my goals for the week based on my goals for the month. I do *not* copy over my schedule here, though I will note ahead of time if I have time off planned or if there is a company holiday or such. At the end of each week, I summarize it in the **Outcomes** section of the note. As with the daily notes, this automatically rolls up into the corresponding monthly note, courtesy of Obsidian’s.

I do the same for monthly notes at the start of each quarter, pulling my goals from my quarterly goals; and for quarterly notes, pulling my goals from my annual goals. In principle, I could further extend this if I get to a point where I want to be tracking at even longer terms than annual, but so far I have not really wanted or needed that.

In the future, I may make this even easier for myself using [the Templater plugin](https://github.com/SilentVoid13/Templater), which would eliminate the rest of the manual work involved after generating things from my templates—but as things stand I haven’t found it worth it yet to go mucking with the relevant bits of JavaScript. (I do enough of that for my actual day job!)


## Bonus: Templates

<details>

<summary>Daily note template</summary>

```markdown
---
aliases: ["{{date}}"]
---

**Week:** ==TODO==

## Goals

### Quarterly deliverables

- [ ] ==TODO==

### Miscellanies & administrivia

- [ ] ==TODO==


## Meetings


## Details

### Session 1

1. **Goal:** **Actual:**


## Outcomes

### Summary


### Artifacts


## Hours Standing

- [ ] 1
- [ ] 2
- [ ] 3
- [ ] 4
- [ ] 5

```

</details>

<details>

<summary>Weekly note template</summary>

```markdown
---
aliases: ["YYYY.MM.DD – YYYY.MM.DD"]
---

**Month:** ==TODO==

## Goals

### Quarterly deliverables

- [ ] ==TODO==

### Miscellanies & administrivia

- [ ] ==TODO==


## Details

- [[Work/Tracking/YYYY.MM.DD|YYYY.MM.DD]]: ![[Work/Tracking/YYYY.MM.DD#Outcomes|YYYY.MM.DD]]

- [[Work/Tracking/YYYY.MM.DD|YYYY.MM.DD]]: ![[Work/Tracking/YYYY.MM.DD#Outcomes|YYYY.MM.DD]]

- [[Work/Tracking/YYYY.MM.DD|YYYY.MM.DD]]: ![[Work/Tracking/YYYY.MM.DD#Outcomes|YYYY.MM.DD]]

- [[Work/Tracking/YYYY.MM.DD|YYYY.MM.DD]]: ![[Work/Tracking/YYYY.MM.DD#Outcomes|YYYY.MM.DD]]

- [[Work/Tracking/YYYY.MM.DD|YYYY.MM.DD]]: ![[Work/Tracking/YYYY.MM.DD#Outcomes|YYYY.MM.DD]]


## Outcomes

### Summary


### Artifacts

```

</details>

<details>

<summary>Monthly note template</summary>

```markdown
---
aliases: ["YYYY.MM"]
---

**Quarter:** ==TODO==

## Goals

### Quarterly Deliverables

- [ ] ==TODO==

### Miscellanies & administrivia

- [ ] ==TODO==


## Details

- [[Work/Tracking/YYYY.MM.DD – YYYY.MM.DD|YYYY.MM.DD – YYYY.MM.DD]]: ![[Work/Tracking/YYYY.MM.DD – YYYY.MM.DD#Outcomes|YYYY.MM.DD – YYYY.MM.DD]]

- [[Work/Tracking/YYYY.MM.DD – YYYY.MM.DD|YYYY.MM.DD – YYYY.MM.DD]]: ![[Work/Tracking/YYYY.MM.DD – YYYY.MM.DD#Outcomes|YYYY.MM.DD – YYYY.MM.DD]]

- [[Work/Tracking/YYYY.MM.DD – YYYY.MM.DD|YYYY.MM.DD – YYYY.MM.DD]]: ![[Work/Tracking/YYYY.MM.DD – YYYY.MM.DD#Outcomes|YYYY.MM.DD – YYYY.MM.DD]]

- [[Work/Tracking/YYYY.MM.DD – YYYY.MM.DD|YYYY.MM.DD – YYYY.MM.DD]]: ![[Work/Tracking/YYYY.MM.DD – YYYY.MM.DD#Outcomes|YYYY.MM.DD – YYYY.MM.DD]]


## Outcomes

### Summary


### Artifacts


```

</details>

<details>

<summary>Quarterly note template</summary>

```markdown
---
aliases: ["YYYY.MM – YYYY.MM"]
---

**Year:** ==TODO==

## Goals

- [ ] ==TODO==

## Details


- [[Work/Tracking/YYYY.MM|YYYY.MM]]: ![[Work/Tracking/YYYY.MM|YYYY.MM]]

- [[Work/Tracking/YYYY.MM|YYYY.MM]]: ![[Work/Tracking/YYYY.MM|YYYY.MM]]

- [[Work/Tracking/YYYY.MM|YYYY.MM]]: ![[Work/Tracking/YYYY.MM|YYYY.MM]]

## Outcomes

### Summary

### Artifacts


```

</details>

<details>

<summary>Annual note template</summary>

```markdown
---
aliases: ["YYYY (FY)"]
---

## Goals

- [ ] ==TODO==

## Details

- [[Work/Tracking/YYYY.MM – YYYY.MM|YYYY.MM – YYYY.MM]]: ![[Work/Tracking/YYYY.MM – YYYY.MM#Outcomes|YYYY.MM – YYYY.MM]]

- [[Work/Tracking/YYYY.MM – YYYY.MM|YYYY.MM – YYYY.MM]]: ![[Work/Tracking/YYYY.MM – YYYY.MM#Outcomes|YYYY.MM – YYYY.MM]]

- [[Work/Tracking/YYYY.MM – YYYY.MM|YYYY.MM – YYYY.MM]]: ![[Work/Tracking/YYYY.MM – YYYY.MM#Outcomes|YYYY.MM – YYYY.MM]]

- [[Work/Tracking/YYYY.MM – YYYY.MM|YYYY.MM – YYYY.MM]]: ![[Work/Tracking/YYYY.MM – YYYY.MM#Outcomes|YYYY.MM – YYYY.MM]]

```

</details>



[^ideas]: An aside: I had the *exact* same idea when working on [<b><i>re</i>write</b>][r]… but my idea never went anywhere, because I put that work on indefinite hiatus. Ideas are cheap. Execution is what counts.

[r]: https://rewrite.software
