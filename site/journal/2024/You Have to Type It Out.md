---
title: You Have to Type It Out
subtitle: >
    A note on how learning works (in my experience, anyway).
qualifiers:
    audience: >
        People interested in learning—especially but not only math, programming languages, music, or engineering.

date: 2024-03-12T09:34:00-0600

summary: >
    For many kinds of learning, actually writing or typing out the exercises is an essential part of internalizing a mental model. You cannot skip it!

tags:
    - learning
    - software development
    - teaching
    - math
    - pedagogy
    - programming languages

related:
    - "[Small, Non-Trivial Projects for Learning](https://v5.chriskrycho.com/journal/small-non-trivial-projects-for-learning/)"
    - "[Being a Fast, Cogent Writer Is Useful](https://v5.chriskrycho.com/journal/writing-productivity/)"
    - "[A Useful Approach to Problem-Solving](https://v5.chriskrycho.com/journal/a-useful-approach-to-problem-solving/)"

---

For the past week or so, I have been working my way through large swaths of the Rust async ecosystem, trying to orient myself somewhat as I prep to write a new chapter of [<cite>The Rust Programming Language</cite>][trpl]. In particular, I have been working through every part of [the Tokio tutorial][tokio], actually implementing every single part of its example code myself and compiling and running it. Before that, I spent a good amount of time over the past five months working through [<cite>Programming Languages: Application and Interpretation</cite>][plai] and [<cite>Crafting Interpreters</cite>][ci], along with parts of other texts about building programming languages. In all of these cases, I have made a point to type out every part of every example I work through in the text.[^langs]

[trpl]: https://doc.rust-lang.org/book/
[tokio]: https://tokio.rs/tokio/tutorial
[plai]: https://www.plai.org
[ci]: https://craftinginterpreters.com

The reason I do this is simple: it is the only way I actually learn this kind of material—the same as actually doing the work by hand on paper is the only way I learned physics or math or music analysis in my undergraduate studies. There are many fields where the only way to actually learn the subject is to *do* it. You can and should read books which are *about* the practice, too; you will learn different things from those. But very often, literally making your hands do the relevant physical motions is a key part of making your brain do the relevant intellectual motions.[^keyboard]

I was reminded of this last night, while teaching someone how binary and other counting systems work, as well as how and why binary is useful in computing. The person I was teaching was initially struggling to understand the counting system (0, 1, 10, 11, 100, …). Their existing mental model for base 10 number systems was misleading, because it was incomplete: They had never fully internalized what the “places” actually meant. They also had never learned that our choice of base 10 is arbitrary in a purely mathematical sense. (Both of these are true for *most* math students who haven’t done either programming or college-level math work!) That made it easy for them to jump to wrong conclusions about what should happen in a different base numbering system.

The way forward, I found, was to have them just write out the counts in different base systems: “normal” counting in base 10; 0, 1, 2, 3, 10, 11, 12, 13, 20… for base 4; and so on. Any time they made a mistake in one of the non-base-10 systems, I would gently stop them and point out the mismatch between what they were doing in that system vs. what they would have done at the same point in base 10. That in turn allowed us to reinforce, slowly but steadily, what the “places” are (2’s place, 4’s place, 10’s place, etc.) and therefore the idea that we are “spelling” the same count in different ways depending on how many digits we allow ourselves in our number system. Writing it out—and more than once—was the key ingredient that made the explanation stick.

That somewhat mechanical approach might seem unintuitive if you have not taught a subject like math or programming before: Would it not make more sense to explain from first principles? Sometimes, for some learners, yes, that can be helpful—but usually, in my experience, *only once there is already enough intuition built up from correctly-targeted practice*. Many programmers pride themselves on learning things “bottom-up”, from first principles or seeing how the implementation actually works—and indeed many of us do learn well that way. Very few of us started that way, though. Most of us started by typing things into a computer and seeing what worked—even if following some programming book.

You might think this comes down to the difference between a true beginner and a false beginner (a fairly standard idea in pedagogy; you can hear a great discussion of it on [a recent episode of Software Unscripted][su]). To some extent, that is on the right track: The true beginner has no mental models for the thing, and in my experience the only way to build a mental model like that is by experience. The false beginner, by contrast, already has some mental models for the domain and will lean on them when building up a new skill. When those mental models are wrong, though, they can be deeply misleading. Quite often the best way to unlearn when you have the wrong mental model is also by combining instruction on the correct (or at least a *more* correct) mental model with actual practice that can help expose the gaps or misalignments in the existing mental model.

[su]: https://pod.link/1602572955/episode/7de37354dfa00eb3308e523467f410aa

Combining concrete practice with explanations of mental models is almost unreasonably effective. This is why memorizing and practicing your multiplication tables (or, for that matter, basic addition and subtraction) is actually helpful, if also insufficient, for developing other mathematical skills. Growing up, I learned most of my math up through high school geometry from [Saxon][saxon]—much beloved of homeschoolers everywhere. It uses the time-hallowed tradition of starting with rote repetition of important skills followed by explanation of the principles. As a result, I had the quadratic formula memorized “by accident” by the time the explanation arrived, and the explanation stuck because I was not trying to memorize the formula and what it meant at the same time. You can sometimes flip the order around or approach model and mechanics together. You really do need both, though.[^common-core]

[saxon]: https://www.hmhco.com/programs/saxon-math

Returning to the examples I opened with: this is why I typed out every single line of code in <cite><abbr title="Programming Languages: Application and Interpretation">PLAI</abbr></cite> and <cite>Crafting Interpreters</cite>. I knew that I could read about programming language interpretation as much as I wanted, but it would not stick in a practical way—that is, in a way that is actually usable in the real world—unless I actually typed it out.

[^langs]: Given how I approached that, that has meant doing it in three different languages: [Racket][racket], [TypeScript][ts], and [Rust][rust].

[racket]: https://racket-lang.org
[ts]: https://www.typescriptlang.org
[rust]: https://www.rust-lang.org

[^keyboard]: This is no less true of programming and its use of the keyboard than of writing longhand, though I also find that different kinds of thinking are best done in different media. I find paper preferable for working out algorithms, or working out the ideas for essays, or writing poetry. I do *not* find paper preferable for designing data structures, or for writing the substance of long-form essays. Much the inverse is true of typing.

[^common-core]: People raised purely on rote repetition sometimes complain about Common Core/“new math”, and sometimes that complaint is justified, though sometimes it is just down to the unfamiliarity of the approach. In my experience working with both of my daughters as they have gone through elementary school, though, I have been delighted to find at least one Common Core-targeted curriculum with a solid balance of work. Some of the exercises are designed to build mental models; others are the kind of rote repetition that is necessary to “drill home” those models.
