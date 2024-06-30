---
title: "Weeknote: June 22–29, 2024"
date: 2024-06-29T20:45:00-0600
tags:
    - software development
    - writing
    - composing
    - music
    - programming languages
    - weeknotes
    - reading
    - philosophy
summary: >
    Finishing a lot of first drafts: in music, in writing TRPL, and in talk preparation.

---


## Software development

I made some decent progress on my parser! My little toy learning language has function syntax that is kind of inspired by a mix of Rust, Elm, and Racket. At a syntactic level, it supports generic types, type constraints, function types, and more. For example—

A basic function signature:

```elm
fn greet (person: Person) -> String {
   // ...
}
```

A function with some unconstrained type params:

```elm
fn map A B (maybe: Maybe A, op: (A) -> B) -> Maybe B {
   // ...
}
```

A function with constrained type params (this would actually probably be a method, but I have not gotten there yet!):

```elm
fn set-in K V (map: Map K V, key: K, value: V) -> Maybe V
where
   K: Hashable
{
   // ...
}
```

I can parse all of that now! None of it hits a type-checker, much less actually gets executed. I haven’t even decided on what the compilation target will be![^1] But I can parse all of that, and that feels fantastic. A year ago, that felt completely out of reach. Now… it was work and thought, but it was extremely doable work, and some of the most plain *fun* I have had in ages.

## Music

Building on last week’s work, I managed to actually finish the first draft of the second out of four movements of a big orchestra piece! I did a bunch of revisions on what I wrote last week, filled out the orchestration, and did some revisions on the intro as well. I think, to my great delight, that I am ready to start on the third movement. Finishing this second movement was one of my personal goals for the whole year, so getting it done at the halfway point of the year feels *very* good.

## Writing

- I finished a draft—very much a *first draft*, and a rough one in need of a *lot* of editing, no doubt—of the new async/await chapter of <cite>The Rust Programming Language</cite>. At almost 15,000 words in this draft, it is *easily* the longest chapter in the book. I expect we will be able to cut it down a bit from there, but I also expect it will still be the longest chapter in the book when we are done. It was an enormous amount to cover, and I did it in a reasonably brief way. I am really, really proud of what I ended up with, even at this early point.

- Just after publishing [*last* week’s Weeknote](https://v5.chriskrycho.com/journal/weeknote-june-17-21-2024/), I also published [Pest.rs’ Syntax Tree is Very Low-Level](https://v5.chriskrycho.com/journal/pest.rs-syntax-tree-is-very-low-level/). I would like to do a lot more of that kind of blogging, more off-the-cuff notes as I go, turning little side conversations with friends into blog posts. That’s where that one came from: I typed up a little bit of it as a <abbr title="direct message">DM</abbr> to a friend, and realized it was a good germ of a post. So I finished it and then sent it to him, and had the conversation, but also put it out in the world for others to profit from as well. Need to do that more often!

## Speaking

I also finished a rough draft of my StaffPlus New York talk this week. It was a week for finishing drafts of things, it would seem! I will, Lord willing, do a dry-run of the talk this coming week, and use that to figure out all the big things that need tackling, and start revising.

## Reading

I have been working through the [Stanford Encyclopedia of Philosophy](https://plato.stanford.edu/)’s articles on [essentialism](https://plato.stanford.edu/entries/essential-accidental/) and Aristotelian metaphysics this week. Why? Because I was reading David S. Oderberg’s [<cite>Real Essentialism</cite>](https://bookshop.org/a/21126/9780415872126) and honestly just found myself lost in a fair bit of what Oderberg (quite reasonably!) takes for granted. (He is writing an argument in the middle of a very long-running debate.) I realized while reading Oderberg that I just have *massive* gaps in my philosophical education: Metaphysics? *What* metaphysics? I am not so far sure what I make of Aristotelian metaphysics—it certainly seems odd at a bunch of points!—but then I notice that we mostly just do not take metaphysics itself as seriously as I think we ought to. So: getting my bearings in the field.

[^1]:	If you are curious: I am considering <abbr title="Web Assembly">WASM</abbr>, <abbr title="JavaScript">JS</abbr>, or native Apple ARM. They would all be interesting in their own ways!
