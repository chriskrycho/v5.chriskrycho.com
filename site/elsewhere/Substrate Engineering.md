---
title: >
    StaffPlus NY 2024: Substrate Engineering
subtitle: Engineering Foundations in a World of LLMs

featured: true
image: https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/001.png

summary: >
    Our engineering systems are not ready for a world of pervasive large language models. How can we do better?

qualifiers:
    audience: >
        People thinking about the interaction between classical software engineering “foundations” and large language models.

tags:
    - software development
    - talks
    - public speaking
    - AI
    - leadership

date: 2024-09-09T12:30:00-0600
updated: 2024-09-18T16:58:00-0600
updates:
    - at: 2024-10-07T20:21:00-0600
      changes: >
        Switched over to linking and embedding the YouTube video instead, since it is now available.
    - at: 2024-09-18T16:58:00-0600
      changes: >
        Added a link to the recording.
    - at: 2024-09-14T14:40:00-0600
      changes: >
        Added the meta content I wrote when sharing this on social media.

---

This past Thursday (September 5, 2024), I spoke at the excellent [StaffPlus New York][conf] conference—one of the best-run conferences I have attended or spoken at—on the subject of <abbr title="large language model">LLM</abbr>s and how they intersect with our engineering foundations. You can watch the video [here][yt]:

[yt]: https://www.youtube.com/watch?v=VkSGJdPyLxQ

<figure class='embed'>

<div class='embed__wrapper'>
<iframe class='embed__content' src="https://www.youtube.com/embed/VkSGJdPyLxQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

<figcaption><a href="https://www.youtube.com/watch?v=VkSGJdPyLxQ">Substrate Engineering</figcaption>

</figure>

Below are my slides and script! What follows is not a word-for-word transcript but my speaker notes and slides.

[conf]: https://leaddev.com/staffplus-new-york/agenda

Before the content itself, though, a meta note about this talk: I am, as a lot of folks out there know, not exactly bullish on <abbr title="large language model">LLM</abbr>s in general. I think most of the hype is nonsense—even while I think some of their capabilities are really astonishing!—but I do think they’re here to stay. So:

First of all, if we’re going to be working in a world where people are authoring code with <abbr title="large language model">LLM</abbr>s (Copilot etc.) and using them to “do things” as agent-based systems, the world of inputs to the models matters, as do the environments in which they run. They matter a *lot*!

Second, I think a lot of engineering organizations pretty consistently underinvest in foundations, because of the simple realities that many kinds of foundations projects take longer and have a less direct/measurable connection to profitability. They just do, no way around it.

Third, then, what are the ways that engineering leaders—including managers, but especially Staff+ engineers—can mitigate the risks of <abbr title="large language model">LLM</abbr>s and improve the chances that they are net neutral or even positive, rather than negative, for software quality, UX, and business outcomes?

Secretly (and yes, I am saying it out loud now!) it is predicated on my belief that ***these are the things we should be doing anyway***… but this is a moment when we have a really obvious reason how and why these things matter, with which we can make that case to decision-makers.

And because these are the things we should be doing anyway, an organization which uses this <abbr title="large language model">LLM</abbr>-hype-moment to improve the foundations on which we run <abbr title="large language model">LLM</abbr>-related systems… will be in a better spot two years from now *even if the <abbr title="large language model">LLM</abbr> ecosystem craters*. Seems like a win.

---

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/001.png" alt="Slide reading 'Substrate Engineering: Engineering Foundations in a World of LLMs, Chris Krycho – StaffPlus New York 2024'">

Good afternoon! It’s almost lunch-time, so let’s get into it!

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/002.png" alt="Slide showing a screenshot of a search for all the C and C++ code on GitHub">

Show of hands: How many of you think that all the C and C++ on GitHub is free of memory vulnerabilities and correctly implements thread safety?

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/003.png" alt="Slide reading 'Substrate Engineering: Who do you trust to write memory- and thread-safe code in C? – Yourself? – A new junior on your team? – GitHub Copilot?'">

Again, show of hands: who do you trust to write memory- and thread-safe code in C? Yourself? A new junior on your team who has never written C before? GitHub Copilot?

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/004.png" alt="Slide reading 'Substrate Engineering: Who do you trust to write memory- and thread-safe code in (safe) Rust? – Yourself? – A new junior on your team? – GitHub Copilot?'">

Same question, but now we’re talking about (safe) Rust. Now I can trust all three of these, because the compiler will check it.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/005.png" alt="Slide reading 'Our systems are not ready for a world of pervasive LLMs.'">

This is not a talk about C and Rust. It is a talk about engineering systems, and how we think about them in a world where <abbr title="large language model">LLM</abbr>s are pervasive, for good and for ill. Because my thesis is that our engineering systems are simply not ready for a world of pervasive <abbr title="large language model">LLM</abbr>s.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/006.png" alt="Slide reading 'If you are a big fan of LLMs: this talk is about making them better.'">

If you are a big fan of <abbr title="large language model">LLM</abbr>s: this talk is about making them better.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/007.png" alt="Slide reading 'If you are skeptical of LLMs: this talk is about good safeguards.'">

If you (like me) are a bit more skeptical of <abbr title="large language model">LLM</abbr>s: this talk is about good safeguards—about giving ourselves a shot (not a guarantee!) at not just making things much worse with <abbr title="large language model">LLM</abbr>s. Because we *really* cannot afford that. Software quality is bad enough as it is!

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/008.png" alt="Slide reading 'Prompt engineering: An emerging discipline? – Specific choices in wording. – The amount of context to include. – The scope of the task you are giving it. – Creativity levels. – What not to bother with because it tends to go sideways there. – Meta prompts, like my favorite: including “no blabbing”.'">

One of the most common phrases we have all heard batted around about AI over the past few years is “prompt engineering”—the idea of learning how to get the best results out of a large language model by way of the specific ways you prompt it—

- Specific choices in wording.
- The amount of context to include.
- The scope of the task you are giving it.
- Creativity levels, or “temperature”.
- What not to bother with because it tends to go sideways there.
- Meta prompts, like my favorite: including “no blabbing”. (Try it, if you haven’t! It’s way less chatty and annoying this way!)

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/009.png" alt="Slide reading 'Problem: LLMs have been trained on real-world code.'">

</section>

No matter how good your prompting skills are, though, there’s a problem: <abbr title="large language model">LLM</abbr>s have been trained on real-world code. There is no other way to train them. Now, some of you might be thinking, “Wellll, we can train them on their own outputs, or with adversarial cycles with other <abbr title="large language model">LLM</abbr>s”—and yes: there are many techniques which can help somewhat, but. At the end of the day, all the code <abbr title="large language model">LLM</abbr>s have been trained on is… in that bucket. No amount of prompt engineering changes what C is, or what the real-world C codebases are like. Telling Copilot “No vulnerabilities please” will. not. make it. true! (It might help! But it won’t solve the problem.)

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/010.png" alt="Slide reading 'Prompt engineering is not enough.'">

So: prompt engineering is all well and good, but it will always be constrained by the foundational limits of these systems. It is not enough.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/011.png" alt="Slide reading 'Prompt engineering will never be enough.'">

More than that: It will *never* be enough.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/012.png" alt="Slide reading 'Why?'">

That’s a strong claim. Why do I think prompt engineering will never be enough?

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/013.png" alt="Slide reading 'A substrate is a layer that sits below the thing we are interested in.'">

To answer that, I am going to take a detour through a definition:

A substrate is a layer that sits below the thing we are (notionally) interested in.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/014.png" alt="Slide showing a ladybug on a leaf and reading 'Substrates: Biology: – Where an organism grows – Possibly what it eats – Where it lives. Everything about its existence!'">

In biology, it is the material an organism grows on, maybe what it eats, where it lives. The organism is the active agent, but everything about its existence is shaped by its substrate.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/015.png" alt="Slide showing a silicon wafer and reading 'Substrates: Chip manufacturing: Silicon wafer “does nothing”. But no wafer? No useful chip.'">

Likewise, in chip manufacturing, the substrate is the silicon wafer that all the actual circuitry gets printed on. The circuitry is active and the silicon is passive—it “does nothing”—but good luck making a useful circuit without an appropriate substrate.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/016.png" alt="Slide showing Zed editor with a model selector above a prompte for a Rust program to find prime numbers efficiently (showing a not-particularly efficient result), which also reads 'Substrates: Large language models: – Training data (input) – Engineering systems (output)'">

With large language models, the *substrates* are their training data and our engineering systems—their inputs and their outputs—the context in which they actually operate. That means that those two factors absolutely dominate any amount of prompt engineering when it comes to the results we will get from <abbr title="large language model">LLM</abbr>s.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/017.png" alt="Slide reading 'Automation and Attention'">

There is another problem, too, at the intersection of automation and attention.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/018.png" alt="Slide reading 'Automation and Attention' and showing images of an airplane cockpit and a Tesla vehicle in “self-driving” mode.">

Decades of research on automation, including aircraft autopilot and automated driving, have taught us an incredibly important lesson: human beings cannot pay attention only when we need to. When autopilot works really well, people disengage. And in fact, many of the worst accidents are situations where people are perfectly competent, but lose focus. But there are also long-term impacts: being able to rely on autopilot degrades pilots’ competence unless they go out of their way to stay in practice.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/019.png" alt="Slide reading 'The better automation works, the less we attend to it.'">

In fact: as a rule, the better automation works, the less we attend to whatever is being automated. I am going to repeat that: the better automation works, the less we attend to whatever is being automated. When the self-driving works really well, that is when terrible car accidents happen. You take your eyes off the road because the car is handling things just fine. And then you need to pay attention… and it’s too late.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/020.png" alt="Slide reading 'Automation and Attention' and showing images of an airplane cockpit and a Tesla vehicle in “self-driving” mode and the VS Code extension for GitHub Copilot.">

There is absolutely no reason to think this does not apply to writing software. And yes, the consequences of taking a prompt result from ChatGPT or Copilot will tend to be less immediate. But that does not mean they will be less serious. In fact, it increases the difficulty, especially when we combine it with another reality we know empirically about software development.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/021.png" alt="Slide reading 'Challenge: Code Review and Debugging'">

Namely: that reviewing code is hard. Writing code is much, much easier than reading code later and understanding it, still less spotting bugs in it. Spotting a bug is a challenge even when you know there is a bug: that’s what debugging is, and it’s hard. And when you prompt Copilot or Cody, and use the code it provides, code review is exactly what we are doing.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/022.png" alt="Slide reading 'The better LLMs get—the more they boost velocity, by generating working code—the harder it will be to notice when they get things wrong.'">

And when you put those factors together, it has a result that might be counterintuitive: The *better* <abbr title="large language model">LLM</abbr>s get—the *more* they **boost velocity** by generating **working code**—the *harder* it will be notice when they get things ***wrong***.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/023.png" alt="Slide reading 'Automation and Attention: What do we do? – “Defense in depth” for software foundations'">

Our software foundations need to get much better, across the board, or else widespread use of <abbr title="large language model">LLM</abbr>s is going to make our software quality much worse. Our only chance is to double down on defense in depth: in making all of our software foundations better.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/024.png" alt="The same slide, but now including another bullet point, reading 'Judgment about where LLMs should and should not be allowed'">

It also means making firm judgment calls about where <abbr title="large language model">LLM</abbr>s should and should not be allowed. To wit: an <abbr title="large language model">LLM</abbr> has no business anywhere near configuration for medical hardware, because of the challenges with attention and code review. But it also means: internal engineering tools are one thing—maybe a way you can get an internal refactor done that you would never get funded otherwise. Decision-making that affects users is something else. Offering health advice? Offering *legal* advice? Making *legal decisions*? These are off the table!

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/025.png" alt="Slide reading 'Problem: Hallucination'">

Finally, we need to talk about the elephant in the room: the big problem with <abbr title="large language model">LLM</abbr>s: hallucination.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/026.png" alt="Slide reading 'Hallucination is not a solvable problem'">

And that’s because “hallucination” is not a “solvable problem.”

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/027.png" alt="Slide reading 'Hallucination is the wrong word'">

In fact, “hallucination” is the wrong word. It suggests that <abbr title="large language model">LLM</abbr>s sometimes don’t hallucinate. And that is exactly backwards.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/028.png" alt="Slide reading 'Hallucination is just what LLMs are.'">

Hallucination is what <abbr title="large language model">LLM</abbr>s *are*. It’s the whole thing. When ChatGPT gives you the right answer, and when it gives you the wrong answer… it’s doing the same thing.

And that’s fine, actually: as long as we understand it!

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/029.png" alt="Slide reading 'We can (and must) build our software and social systems accordingly.'">

Because if we understand that reality, then we actually can (and must!) build software systems appropriately—and we can build our socio-technical systems appropriately, too.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/030.png" alt="Slide reading 'Substrate Engineering'">

So: let’s do some substrate engineering.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/031.png" alt="Slide reading 'Substrate Engineering: Key constraints: – Substrate/environment – Automation and attention – How LLMs actually work'">

Whether that’s authoring code with them or deploying them as “agent systems” where they go do tasks for us, we need to design our engineering systems with these constraints in mind: the overwhelming influence of substrates, the effect of automation on attention, and how LLMs actually work.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/032.png" alt="Slide reading 'Substrate Engineering: The territory – Tooling and configuration – Languages – API design – Testing – Agents – Package managers – Operating systems'">

The territory for substrate engineering is, well, all of our engineering foundations. And yeah, it would be interesting to think about these things! How *does* “correct by construction” <abbr title="application programming interface">API</abbr> design help? What does it mean if we are generating our tests instead of using them for design? Should our package managers be able to run arbitrary code on installation? (No!) Can we leverage “capabilities” systems in our operating systems? (Yes!)

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/033.png" alt="Slide reading 'Substrate Engineering: The territory we have time to cover: – Tooling and Configuration'">

But that would be a very long talk, so I am going to to focus on the design of our tooling and configuration, and trust you to apply the same kinds of thinking to the rest of them!

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/034.png" alt="Slide reading 'Tooling and Configuration'">

I am focusing on tooling and configuration for two reasons.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/035.png" alt="Slide reading 'Tooling and Configuration: a disproportionate impact on user & developer experience'">

First because they have a disproportionate impact on both our user and our developers, and therefore on business outcomes—because tooling and configuration sit at critical points in our software systems. They are key parts of developer workflows, and they also sit at points that determine whether our systems stay up or go down. And that’s true regardless of <abbr title="large language model">LLM</abbr>s!

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/036.png" alt="Slide reading 'Tooling and Configuration: Now add LLMs into the mix. These kinds of tools and configuration languages are: – Extremely amenable to use with LLM-based systems – Extremely vulnerable to the failure modes of LLMs'">

Second, these kinds of tools and configuration languages are both extremely amenable to use with <abbr title="large language model">LLM</abbr>-based systems and also extremely vulnerable to the failures modes of <abbr title="large language model">LLM</abbr>s.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/037.png" alt="The same slide, but with 'Extremely amenable to use with LLM-based systems' emphasized by fading out everything else">

They are *amenable* to them because the configuration systems are often extremely regular and predictable. Claude or Copilot or any other tool like that will ***probably*** generate them correctly, because there are so many valid GitHub Actions configs out there for them to have been trained on.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/038.png" alt="The same slide, but with 'Extremely vulnerable to the failure modes of LLM-based systems' emphasized by fading out everything else">

But tooling and configuration are *vulnerable* to the kinds of problems LLMs have because of how easy it is to get configuration wrong. “Hallucination” means we can never be confident in the outputs from those tools *on their own*.

So let’s think about how to make them better.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/039.png" alt="Slide reading 'Tooling and Configuration: A broken GitHub Actions config', with a code sample showing a YAML with a `jobs` key with a list in it">

Here is a GitHub Actions config, written in YAML. It has a single job named “Test”; there two steps in that job; and it specifies that it should run on the “push” and “release” events.

This config is wrong. But from just looking at it, I cannot see how. (I mean, I can *now*, because I wrote this slide, but two weeks ago? Nope.)

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/040.png" alt="The same slide, but with the job definition underlined with dotted red lines, and a message describing the error">

But if our editor can underling the error and give us an error describing what’s wrong—‘"jobs" section is sequence node but mapping node is expected’—we have a shot at actually fixing it.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/041.png" alt="The same slide, but with the job fixed to be a key-value pair instead of a list">

I mean: it’s not a great error messages, but… \[thinking face, muttering to myself about sequence node and mapping node], oh, okay, the fix is that it needs to be a key-value pair, not a list. Cool. I can fix it.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/042.png" alt="The slide with the underlined error and message again">

Dare I say it: we know how to do better with programming languages than [<abbr title="JavaScript Object Notation">JSON</abbr> Schema][json-schema]-based validation for <abbr title="Yet another markup language">YAML</abbr> configuration files!

[json-schema]: http://json-schema.org

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/043.png" alt="Slide reading 'Tooling and Configuration: Investing in ops languages'">

One move, which people are already doing for other reasons, is to use full-on programming languages here! Pulumi lets you use most any programming language for “infrastructure as code” and, for that matter, you have been able to write your build tooling end to end in [F♯’s <span class="all-smcp">FAKE</span> <abbr title="domain-specific language">DSL</abbr>][fake] for years!

[fake]: https://fake.build

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/044.png" alt="Slide reading 'Problem: “Full” programming languages can do anything.'">

But the upside and the downside of full programming languages is that they can do *anything*… which means we have all the *peril* and all the *problems* that come with that. At the disposal of <abbr title="large language model">LLM</abbr>s.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/045.png" alt="Slide reading 'Tooling and Configuration: Investing in ops language: – Infinite loops during installation – `undefined` is not a function during deployment – Throwing `java.lang.NullPointerException` in CI'">

For example: they can go into infinite loops during install. Neither is “`undefined` is not a function” during deploy. Or `NullPointerExceptions` during <abbr title="continuous integration">CI</abbr> runs.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/046.png" alt="Slide reading 'Tooling and Configuration: Investing in ops languages: useful properties: – Soundness: with sub-bullets reading: – no undefined is not a function – no NullPointerExceptions'">

What we want, then, are properties that are relatively rare in most mainstream programming languages. The first is soundness. This is the property that means that if your program type checks, you don’t end up with “undefined is not a function” or null pointer exceptions. Logic bugs yes, type errors, no.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/047.png" alt="The same slide, but dropping the sub-bullets from “Soundness” and adding 'Termination: guaranteeing the program will end'">

The second property we want is termination: the ability to guarantee that your program finishes running. If you’re thinking “But the Halting Problem!”: well, that’s only a problem we have to care about if we have a “full” programming language. We actually can prove that many programs do halt… if we restrict what the programming language can do.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/048.png" alt="Another variation on the slide, now adding sub-bullets for termination: '– totality: every input has an output, even things like n/0 – purity: same input = same output, no side effects – no general recursion: no while (true) { … } or equivalents'">

To get termination, we need the functions in our language to have one property, *totality*, and not to have another, *general recursion*. Totality means that every input has an output—so if you’re doing division, you need to handle the divide-by-zero case; that way you can be sure the rest of your program’s logic is not invalidated by a panic. Totality is much easier if we also have *purity*, which means you get the same inputs for the same outputs, and no other state in the system gets mutated (no “side effects”). And then we need to get rid of *general* recursion—while true or anything equivalent, any recursion we cannot prove is total itself. Then we can be sure that our program *will* stop, with *meaningful results*.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/049.png" alt="Another variation on the slide, this time removing sub-bullets from 'Termination' and adding a new bullet 'Rich type system: – Discriminated union/sum/algebraic data types `type Track = IndividualContributor | Manager` – Guaranteed inference'">

The third property we want is related to the first one: we want a *rich* type system. More like F♯ or Swift or TypeScript than like Java or Go historically have been. We want to be able to express things like “Individual contributor or manager” directly and clearly (without subtyping shenanigans). We also want type inference to *just work*, so that it is as easy to write a language like this as it is a language like Python or Starlark—but with all the help and affordances that a good compiler can provide. We want error messages like the ones from Elm and Rust.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/050.png" alt="A final variation on the slide, identical to the previous but reading 'Rich type system (but not too rich)'">

That last point is suggestive: we don’t want a language which has too rich of a type system. That cuts against other goals: ease of use, predictability, the ability to guarantee that inference always works, and so on.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/051.png" alt="Slide titled 'Tooling and Configuration: Investing in ops languages: the wins:' with bullet points '– Faster feedback loops for people writing configuration with or without LLMs – LLM training data would be much more correct.' and paragraph text 'A much higher chance of getting it right from the outset. Not a silver bullet. But having the right tools in the toolbox matters.'">

So if we had a language like that, what would it give us? Well, right up front, better and faster feedback loops for people writing configuration. If you think DevOps is good, that means every engineer. And this is true with or without LLMs in the mix! Second, though, a language *trained* on this kind of thing would be much more likely to be correct consistently, because it could not be *incorrect* in certain key ways.

Now: it is no magic bullet. It does not solve the “we put in a number, but the number was insensible here” problem. But it could give us tools which do help with that, and make them easier to use, and therefore more viable. Having the right tools in the toolbox matters!

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/052.png" alt="Slide with the same title, but now 'Investing in ops languages: candidate languages' and a bullet reading 'Starlark (née Skylark): build language used by Bazel and Buck/Buck2' with a sub-bullets: a red box beside 'Soundness', an orange box beside 'Termination', and a red box beside 'Rich type system (but not too rich)">

There are, to my knowledge, only two languages taking any serious swings in this space. So let’s talk about them and grade them on these goals! First up, Starlark, Bazel and Buck’s build language. It doesn’t do types—Facebook’s work-in-progress maybe-someday project notwithstanding—so soundness is out. On termination, it does better than a normal programming language by forbidding recursion, but since it doesn’t have types, it doesn’t have a way to statically say “please handle division by zero” or similar. So: it’s better than just using Python, but with some significant caveats.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/053.png" alt="The same slide, including all the same content, but now adding a bullet for 'Dhall' with sub-bullets: a green box beside 'Soundness', a yellow box beside 'Termination', and a green box beside 'Rich type system (but not too rich)'">

The second interesting language here is Dhall—it compiles to JSON, YAML, etc. so you can use it as a more robust way to author existing configuration targets like GitHub Actions. It does a lot better than Starlark on these criteria: it has a sound type system and requires totality, so it can do pretty well on termination—though nothing can save you from looping from one to a billion—, and it has a nicely-balanced type system with good inference but not too many features. It’s pretty interesting and good, and I encourage you to try it out if you haven’t.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/054.png" alt="Slide reading ''">

Of course, there’s another huge difference between these, which is adoption. I would guess at least 10× as many of you have heard of Starlark as have heard of Dhall before just now. And I think “a Python-like language that came from Google” is probably an easier sell than “A Haskell or Elm-like language from some folks in open source” for a lot of organizations. But I would like to get the things Dhall has on offer! So I think folks should think about trying Dhall and investing in its success.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/055.png" alt="Slide reading ''">

But if we take this space seriously—and we should!—I think there is room to build a language that has a lot of what Starlark has going for it in terms of familiarity and accessibility, but which also pulls in the good ideas from Dhall’s type system. And then we could see: does it work well? Where does it fall down? And does it in fact help with providing useful guardrails for using LLMs? I don’t know: it’s a hypothesis. But we should try it!

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/056.png" alt="Slide reading 'Conclusion'">

I think LLM-based tools are here to stay. But we are the ones responsible for how they get deployed. It is on software engineers, especially the kinds of engineering leaders in this room, to make sure that we are deploying them safely and wisely—if we deploy them at all.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/057.png" alt="Slide reading 'Put all of our software engineering on better foundations'">

That means putting *all* of our software engineering on better foundations: better tooling , better frameworks, better languages.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/058.png" alt="Slide reading 'Engineering foundtions are the substrates for all software engineering'">

Because, to say it one more time: these are the substrates for all of our software development. That means that thinking well about how to make better substrates for where and how we deploy LLMs will have a compounding effect. It will make our software better for the people building the software. Even more importantly, it will make our software better for the people using the software.

</section>

<section class="slide">

<img class="slide-image" src="https://cdn.chriskrycho.com/images/talks/substrate-engineering-2024/059.png" alt="Slide reading 'Thank you! I appreciate your attention. Read: chriskrycho.com, Email: hello@chriskrycho.com, Follow: (@)chriskrycho(.com), and Calendly with a QR code'">

Thank you!

</section>
