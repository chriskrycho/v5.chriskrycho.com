---
title: Journaling, One Day Along
subtitle: >
  A progress report: It had the desired effect. I like it!
date: 2022-12-06T20:58:00-0700
tags:
  - working effectively
  - writing
  - learning
  - note-taking
summary: >
  I’m trying something out this week: making journaling a part of my daily routine.
qualifiers:
  audience: >
    Other folks interested in thinking about learning, note-taking, and working effectively (in the ways that *I* work effectively, at least).

---

Yesterday, I [wrote][yesterday] about my new approach to journaling, and I decided to do a quick follow-up note this evening after doing it for a second day. (This won’t be a new dedicated subsection to the site, don’t worry.) I found it quite helpful! In particular, as I thought likely, having the new **Notes** section proved useful as a prompt to actually take note of what I read in a way that will make it much more useful to me in the future! I finished reading a relatively long and detailed implementation report ([this one][code], if you’re curious) over lunch today, and this evening after we got the kids to bed I went to wrap up the day and realized I hadn’t written anything down for my “Notes” but that I absolutely *did* have something *worth* writing down.

[yesterday]: https://v5.chriskrycho.com/journal/journaling/
[code]: https://code.visualstudio.com/blogs/2018/03/23/text-buffer-reimplementation

The notes I wrote aren’t necessarily all that interesting in their own right, at least at this exact moment—

<details><summary>The full text of the note</summary>

> - Describes reimplementing the text buffer in JS/TS
>
> - Using native didn’t work: too much boundary hopping
>     - And that was with directly using Node’s [[Notes/programming languages/C++|C++]] bridge/bindings.
>     - Suggests my hypothesis around [[Notes/software/WASM|WASM]] may be right; the only way to do it is to stay *almost entirely* in that world.
>
> - Adopted a [[Notes/software/piece table|piece table]]
>
> - Faster than array-of-lines for sufficiently large sets of edits
>
> - Degenerate case is doing many random edits. They note that this primarily shows up when you do something like a mass find-and-replace or multi-cursor edit across a large file.
>
>    > A large file, with 1000s of edits, will lead to thousands or tens of thousands of nodes. Even though looking up a line is `O(log N)`, where `N` is the number of nodes, that is significantly more than `O(1)` which the line array enjoyed.
>
> The final shape of their piece table data structure:
>
> ```ts
> class Buffer {
>   value: string;
>   lineStarts: number[];
> }
>
> class BufferPosition {
>   index: number; // index in Buffer.lineStarts
>   remainder: number;
> }
>
> class PieceTable {
>   buffers: Buffer[];
>   rootNode: Node;
> }
>
> class Node {
>   bufferIndex: number;
>   start: number;
>   length: number;
>   lineStarts: number[];
>
>   left_subtree_length: number;
>   left_subtree_lfcnt: number;
>   left: Node;
>   right: Node;
>   parent: Node;
> }
> ```

</details>

—but that alone will save me a *ton* of time if I ever want to remember what this write up entailed, and generating a note about “piece tables” will also be handy if (when!) text editing comes back around to be a point of interest in my life.

In the future, I think I might like to add to this by including prompts for myself: about goals, wins, failures, learnings, etc. (David R. McIver's [Learning to Exercise Agency][agency] is a great resource on this; in particular see the section in that essay [Prompts for Agency][prompts]. As a bonus, writing up this reflection reminded me to make a note for *that*!) Those kinds of conscious triggers for reflection tend to go a long way for me. However, as I said at the end of yesterday’s post: one habit at a time!

[agency]: https://drmaciver.substack.com/p/learning-to-exercise-agency
[prompts]: https://drmaciver.substack.com/i/75221362/prompts-for-agency
