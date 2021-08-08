---
title: MusicXML and Percussion Notation
subtitle: >
    Digging into How Dorico and StaffPad represent percussion differently.
date: 2021-08-07T21:05:00-0600
tags:
    - software development
    - Dorico
    - StaffPad
    - MusicXML
image: https://cdn.chriskrycho.com/file/chriskrycho-com/images/dorico-staffpad-musicxml/Dorico%20Wood%20Blocks%20view.png
qualifiers:
    audience: >
        People interested in the nitty-gritty details of music notation software transfer formats.

---

Last weekend I [noted](https://v5.chriskrycho.com/journal/staffpad-to-dorico-via-musicxml-alas-no/) that I had hit a number of frustrations in trying to jump back and forth between [StaffPad][s] and [Dorico][d], because the Music<abbr title="eXtensible Markup Language">XML</abbr> handoff between the two was frustrating particularly around percussion—and, spoilers, my orchestral writing makes pretty thorough use of percussion![^perc] While I’m still somewhat up in the air where I’ll ultimately land on one or the other as a primary tool—[recent news from Dorico][sn] having made that a yet more interesting consideration![^unlimited-parts]—but in the meantime I figured it would be interesting to dig into how and why the two differ.

[s]: https://www.staffpad.net
[d]: https://new.steinberg.net/dorico/
[sn]: https://www.scoringnotes.com/podcast/the-history-and-future-of-dorico-for-ipad/

For this post, I’m going to dig into the major ways the applications differ in how they represent a single percussion instrument: Wood Blocks. I picked Wood Blocks because they’re a bit move involved than something like a bass drum or snare drum:

- They are categorized as unpitched percussion, because they do not have *definite* pitches, but they do have *distinct* pitches across the blocks.

- They are always represented as some kind of multiline staff. However, different tools present that staff differently!

    - StaffPad uses by a traditional 5-line staff:

        <img src="https://cdn.chriskrycho.com/file/chriskrycho-com/images/dorico-staffpad-musicxml/StaffPad%20Wood%20Blocks%20view.png" alt="StaffPad view of Wood Blocks">

    - Dorico uses a line-per-block percussion-style staff:

        <img src="https://cdn.chriskrycho.com/file/chriskrycho-com/images/dorico-staffpad-musicxml/Dorico%20Wood%20Blocks%20view.png" alt="Dorico view of Wood Blocks">

- They are not a collection of *totally different* percussion instruments all grouped together as in a drum kit staff, but the blocks do also have distinct elements to strike in a way that differs from e.g. a piano or a glockenspiel.

<aside>

While the Dorico version is more in line with standard idiom, the StaffPad version isn’t *wrong* exactly: I have seen Wood Blocks notated exactly that way in published music out in the world. There is a theme here, though: what StaffPad does for things like this is usually *fine*, but what Dorico does is usually more close to “correct” insofar as such a thing exists in music notation.

</aside>

This set of differences means that looking at wood blocks will show us most of what we need to know about the underlying differences in the programs’ representations of percussion. We *can* safely generalize from what we’ll see below!

## Presentation

First, notice again the two different visual representations of the instrument:

StaffPad:

<img src="https://cdn.chriskrycho.com/file/chriskrycho-com/images/dorico-staffpad-musicxml/StaffPad%20Wood%20Blocks%20view.png" alt="StaffPad view of Wood Blocks">

Dorico:

<img src="https://cdn.chriskrycho.com/file/chriskrycho-com/images/dorico-staffpad-musicxml/Dorico%20Wood%20Blocks%20view.png" alt="Dorico view of Wood Blocks">

This gives us our first hint of how the two programs *model* the instruments differently: StaffPad is treating this as an unpitched instrument in some ways (notice the two-thick-bars start of the staff), but using a pitched-instrument-style staff to represent it. Dorico is doing something totally different, with a single line per block—as if it is representing each wood block as a distinct instrument, but grouped together into a single visual representation. As it turns out, that visual difference (apparent here as it is not necessarily in other, simpler percussion instruments we might have looked at) is *exactly* what is going on under the hood.

What’s more, I have actually cheated a bit here to make these appear more similar than they normally would. By default, Dorico actually presents these with the individual blocks named:

<img src="https://cdn.chriskrycho.com/file/chriskrycho-com/images/dorico-staffpad-musicxml/Dorico%20Wood%20Blocks%20default%20view.png" alt="Dorico view of Wood Blocks">

I went out of my way to create a [Group][perc-group] to get the notation as close as possible to StaffPad’s to highlight the difference in presentation of the musical staves, but with the default instrument naming in view it becomes that much more clear: Dorico thinks of each block as a distinct item on unpitched lines, whereas StaffPad thinks of them as a single instrument with unpitched blocks mapped to pitched stave lines, and they present them accordingly.

[perc-group]: https://steinberg.help/dorico_pro/v3.5/en/dorico/topics/setup_mode/setup_mode_percussion_kits_grid_groups_creating_t.html

So how does that translate into the Music<abbr>XML</abbr> each program generates?

## MusicXML Representation

There are a couple points of interest here. One is how the instruments themselves are defined. Both programs follow the Music<abbr>XML</abbr> spec here, but they represent the instrument quite differently—albeit in a rather unsurprising way, given what we saw above!

Here’s how StaffPad defines the Wood Blocks instrument:

```xml
<part-list>
  <score-part id="P1">
    <part-name>Wood Blocks</part-name>
    <score-instrument id="P1-I1">
      <instrument-name>Wood Blocks</instrument-name>
      <instrument-abbreviation>W.Blocks</instrument-abbreviation>
      <instrument-sound>wood.wood-block</instrument-sound>
    </score-instrument>
  </score-part>
</part-list>
```

And here’s how Dorico defines the Wood Blocks instrument:[^wb-def]

```xml
<part-list>
  <score-part id="P1">
    <part-name>Wood Blocks</part-name>
    <score-instrument id="P1-X1">
      <instrument-name>Wood Block 1</instrument-name>
    </score-instrument>
    <score-instrument id="P1-X2">
      <instrument-name>Wood Block 2</instrument-name>
    </score-instrument>
    <score-instrument id="P1-X3">
      <instrument-name>Wood Block 3</instrument-name>
    </score-instrument>
    <score-instrument id="P1-X4">
      <instrument-name>Wood Block 4</instrument-name>
    </score-instrument>
    <score-instrument id="P1-X5">
      <instrument-name>Wood Block 5</instrument-name>
    </score-instrument>
  </score-part>
</part-list>
```

The key things to notice here:

- StaffPad and Dorico both treat this instrument as a single `score-part`, and in fact it happens to have a matching part <abbr title="identifier">ID</abbr>

- In StaffPad, the Wood Blocks are represented as a *single* `score-instrument` within that top-level `score-part`. In Dorico, each wood block is a separate `score-instrument` and `instrument-name` within the `score-part`.

The result is what I found last week: The different *lines* from percussion instruments from StaffPad ended up mapped into multiple different *instruments* in Dorico.

This continues as we dig into the `<part>` section of the Music<abbr>XML</abbr> file. A `<part>` represents each *musical part* in the score, and holds all the measures which belong to that part. If we look at how the two programs represent the parts, we can see more of why it’s difficult to translate from one to the other.

StaffPad:

```xml
<part id="P1">
  <measure number="1">
    <attributes>
      <divisions>192</divisions>
      <key>
        <fifths>0</fifths>
        <mode>major</mode>
      </key>
      <time>
        <beats>4</beats>
        <beat-type>4</beat-type>
      </time>
      <staves>1</staves>
      <clef>
        <sign>percussion</sign>
      </clef>
      <staff-details>
        <staff-lines>5</staff-lines>
      </staff-details>
      <transpose>
        <diatonic>0</diatonic>
        <chromatic>0</chromatic>
        <octave-change>0</octave-change>
      </transpose>
    </attributes>
    <!-- ... <note>s... -->
  </measure>
</part>
```

Dorico:

```xml
<part id="P1">
  <measure number="1">
    <attributes>
      <divisions>4</divisions>
      <key number="1">
        <fifths>0</fifths>
        <mode>major</mode>
      </key>
      <time>
        <beats>4</beats>
        <beat-type>4</beat-type>
      </time>
      <staves>1</staves>
      <clef number="1">
        <sign>percussion</sign>
      </clef>
    </attributes>
    <!-- ... <note>s... -->
  </measure>
</part>
```

The first thing to notice[^first] is in the `staff-details` definition. Here’s a table showing a quick comparison:

| *Element*     | **StaffPad**   | **Dorico**   |
| ------------- | -------------- | ------------ |
| `clef`        | `percussion`   | `percussion` |
| `staves`      | `1`            | `1`          |
| `staff-lines` | `5`            | N/A          |
| `transpose`   | default values | N/A          |

Both use `percussion` for the `clef` (though Dorico explicitly also specifies a [clef `number` attribute][clef-num] here), and set `staves` to `1` for this part, as we would expect: *most* instruments other than a piano, harp, or similar will be single-stave instruments. Beyond this, the two diverge substantially. StaffPad specifies `staff-lines` (within the `staff-details` container), but while it *could* choose to use the `line-detail` element to represent this exactly the way Dorico does… it *doesn’t* do that. Instead, it just specifies that there are five staff lines and moves on. Meanwhile, Dorico skips this entirely, because it has encoded the representation of the blocks already: in the `part-list` at the top. Likewise, Dorico doesn’t specify transposition at all, because it’s not relevant information for this instrument.[^why-xml-output]

[clef-num]: https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/clef/

This pattern continues when we look at individual notes. Let’s see how each program represents the first note, the lowest wood block. (The rest of the notes are basically identical, just with differences around which block is being struck.)

First, StaffPad:

```xml
<note>
  <pitch>
    <step>G</step>
    <octave>4</octave>
  </pitch>
  <duration>192</duration>
  <voice>1</voice>
  <type>quarter</type>
</note>
```

Now Dorico:

```xml
<note>
  <unpitched>
    <display-step>E</display-step>
    <display-octave>4</display-octave>
  </unpitched>
  <duration>4</duration>
  <instrument id="P1-X5"/>
  <voice>1</voice>
  <type>quarter</type>
  <stem>up</stem>
  <staff>1</staff>
</note>
```

This time Dorico has far more information, but this is because it is encoding the wood blocks as genuinely unpitched and representing them as separate instruments, as we saw in the `part-list`. StaffPad is representing that first note as a pitched note: a “G4”. Dorico is representing it as an unpitched note which apperas in a particular display note-and-octave of “E4”. In this case, while StaffPad’s representation is not unknow of in published music, Dorico’s is definitely the more correct representation. You can also see that as a result of the choice to represent the blocks as individual instruments, Dorico needs to specify the `instrument` with an `id` attribute, and to specify the `staff` number on which the note is set. Those latter bits come “for free” for StaffPad because of its choice to use a pitched representation of the note, but at the cost of a representation which has technically-incorrect semantics.

It’s worth pausing here to note that a program could choose an alternative to Dorico’s representation which would *also* be correct. For example, you could use the `line-detail` element for the different lines within the stave, and take the same approach with `unpitched` notes and a `display-step` and `display-octave` as Dorico does. (The point is not that Dorico does it correctly—though I think it does—so much as that StaffPad does it slightly *incorrectly*.) But even so: the format is flexible enough that interop would be hard regardless. It is not obvious to me that Dorico’s import would work any better at all if StaffPad switched to the encoding I described here. This is just a hard problem!

---

If you're curious and want to dig in further yourself, I‘ve uploaded both of the Music<abbr>XML</abbr> files used in this discussion; feel free to take a look:

- [StaffPad](https://cdn.chriskrycho.com/file/chriskrycho-com/images/dorico-staffpad-musicxml/Wood%20Blocks!%20%E2%80%93%20Staffpad.xml)
- [Dorico](https://cdn.chriskrycho.com/file/chriskrycho-com/images/dorico-staffpad-musicxml/Wood%20Blocks!%20%E2%80%93%20Dorico.xml)

## So what?

As we come here to the end, you might be wondering what the point of all of that was. Well, for one thing I hope it’s helpful for other people besides me to see exactly what’s going on in this musical interchange format. Understanding the complexities of these kinds of things can make it easier for people to sympathize with software developers: whose work is very hard![^hard]

For another, I started digging into this to see how hard it would be to write a small tool to transform StaffPad’s output into something Dorico will understand. I think the answer is: not *too* hard! I would need to go through each kind of percussion instrument and make sure it transforms it correctly, but that’s the kind of thing I know how to do from other sorts of <abbr>XML</abbr>-mashing in the past.[^mash]

While I don’t *know* that I’ll do that, I now have a pretty good sense of what it would take. It would be some non-trivial amount of work, to be sure; but depending on what my ongoing workflow looks like, it might end up being worth it to me. If it does and I build that tool, I will of course share it here as well as in various forums for the software programs in question. (No promises, though, for real!)




[^perc]: A thing most readers likely don’t know: once upon a time back in high school, I played percussion in the wind ensemble. I enjoyed it and I learned a lot!

[^wb-def]: Folks knowledgeable about Dorico may be interested to know that this is true regardless of whether the wood blocks are in a [group][perc-group] in a percussion kit.

[^unlimited-parts]: [POWAHHHRR, UNLIMITED POWAAHHHHRRRR](https://images.squarespace-cdn.com/content/v1/5d65a3557e0ce00001fb2cd2/1580388942894-NLS5T1Z0ENBQBSAVV8RP/ke17ZwdGBToddI8pDm48kAdUfSdWV-R2c6ODuBXyhENZw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVEJBYk2YUaEMOiZW4Uj6Av3ljYXtqyeeJQ1qwVcgOPKezqWIIaSPh2v08GbKqpiV54/Gif+3.gif&f=1&nofb=1)—err, sorry, I meant unlimited *parts* on Dorico for iPad.

[^first]: You might also notice the difference in how `<divisions>`, `<key>`, and `<time>` are handled. This is interesting, and I *strongly suspect* it points to other deep-seated differences in how the two programs conceptualize/model music, but doesn’t matter for our purposes today.

[^why-xml-output]: This is almost certainly not a case of consciously choosing on some per-instrument basis what to do. Rather: the programs specify how to export the <abbr>XML</abbr> for a given bucket of data, and then it goes automatically. So, most likely, StaffPad has a representation of transpotioin for *every* instrument, even if it’s defaulted, as here, to *nothing-interesting, move along*; while Dorico likely doesn’t have it for the instruments like this at all. The <abbr>XML</abbr> export just reflects that internal representation.

[^hard]: I have a vested interest in that, even if I don’t (currently?) work in music notation software.

[^mash]: Turns out that working with the <abbr title="Open Scripture Information Standard">OSIS</abbr> representation of the <abbr title="King James Version">KJV</abbr> Bible back when I built [HolyBible.com][hbc] the better part of a decade taught me a *lot*.

[hbc]: https://www.holybible.com/gen.1.1