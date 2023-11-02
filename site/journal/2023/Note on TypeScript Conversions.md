---
title: >
  Note: On TypeScript Conversions
subtitle: >
  Addressing a very common question: do-it-as-you-go or follow the dependency graph?
qualifiers:
  audience: >
    Software developers working with JavaScript and TypeScript, or thinking about and working with gradual type systems in other languages. In particularly: I am not arguing *for* TypeScript or Python `types` or Ruby’s Sorbet etc.; I am talking to people who are already interested in adopting them.
  epistemic: >
    I led the conversion of a 150,000-line-of-code app to strictly-typed TypeScript back in 2017–2018, and was the primary “subject matter expert” for LinkedIn’s adoption of TypeScript across its millions of lines of library and application JavaScript.

image: https://cdn.chriskrycho.com/images/Ackbar-trap.jpeg

started: 2023-05-16T07:55:00-0600
updated: 2023-11-04T13:00:00-0600
updates:
  - at: 2023-11-04T13:00:00-0600
    changes: >
      Continued filling out the piece, including the Ackbar trap reference and elaborating on the change-many-files-repeatedly dynamic.

draft: true

---

One of the most common questions I get from people interested in converting their JavaScript applications to TypeScript is: *How should I approach this?* There are two approaches people tend to think of:

- A relatively relaxed approach: setting `compilerOptions: false` initially, converting files as you touch them, and gradually increasing the robustness of the types by enabling individual strictness flags until you have them all turned on—or some combination of these.

- A more rigorous approach: setting `compilerOptions.strict: true`, and very carefully converting the codebase in a “leaves-first” order, where no module is converted without first having types for all of its dependencies. Making explicit what “more rigorous” probably already implies: this is my preferred approach.

Most developers (myself included, the first time I did this!) are *very* much tempted to do the “just convert a file when you touch it, in loose mode or with lots of `// @ts-expect-error` and `any` scattered around” thing—for at least the three following reasons:

1. That pattern *usually* works with other kinds of migrations.

2. It feels more tractable, in that you can just do it “as you go”.

3. It actually works pretty well for sufficiently-small codebases—it’s very good for <1,000LOC and pretty good for <10,000LOC.

Accordingly, it is also the approach I see most often recommended to people starting out on converting a TypeScript codebase.

Unfortunately…

![It’s a trap!](https://cdn.chriskrycho.com/images/Ackbar-trap.jpeg "image of Star Wars character Admiral Ackbar saying 'It’s a Trap!'")

You will encounter two big problems when you take the more relaxed, intuitive, much-recommended approach. On smaller codebases, these problems may not matter all that much, but the bigger your codebase is, the more they will hurt.

First, you will end up having to propagate changes to various files over and over and over again:

- Each time you enable another strictness setting, you will see new type errors in many modules. The biggest of these will be `strictNullChecks` and `noImplicitAny`, but *all* of the strictness settings will catch things missed without them: that is why the settings exist, after all. These are not usually spurious errors, either.[^not-spurious] Thus, you will have to do *another* pass “fixing the types” for the module each time you enable a new strictness setting.

- If you convert a module but have not converted the modules it depends on, all the types from those dependency modules will be `any`. When you convert those files, you very often find mistakes in the way you were using their APIs. Just like with strictness settings, this means you often end up having to “fix the types” for other modules each time you make this kind of change.

    <!-- TODO: illustrate it -->

{% note %}

I scare-quoted “fix the types” here because it is usually “write the types and *fix the bugs*”—but it can *feel* like the problem is TypeScript. As I have [written before][to-rach-smith], though:

> …in many cases the complexity was already present in the code base. The TypeScript conversion did not create that complexity: It exposed it. Real-world JavaScript code is often incredibly complicated—indeed, *clever*—in ways that only become obvious when we try to express in types the contracts the code already invisibly assumes. As a result, conversions from JavaScript require complex types far more than code written in TypeScript from the start. Much of the complexity is (permanently!) implicit in JavaScript, while writing out the contracts in TypeScript makes it explicit. That enables better choices: does this particular API actually warrant some complicated types, or should we just keep it simple? Usually: the latter.

[to-rach-smith]: https://v5.chriskrycho.com/journal/is-typescript-good/

Even though we are actually *fixing our code* when doing this kind of conversion, though, it can *feel* like we are just fixing TypeScript issues over and over again, and I think it is important to acknowledge that.

{% endnote %}

This kind of thing can be quite demoralizing at a personal level, as you work to “fix types” ==TODO: carry on here!==

Second, and maybe even worse, you *cannot* rely on the things you have already converted actually being safe when taking this approach. They *feel* safer than JS types-wise because they are in TS… but they are not, because they have lots of `// @ts-expect-error` and `any` scattered around. It can end up being quite demoralizing and frustrating to have errors coming out of your “but we already converted this!” modules. It can be a super frustrating thing to explain to other stakeholders, too: *Well, yeah, we converted this to TypeScript, but not all the way, so it still has these issues…*

The “walk the dependency graph leaves-in with maximum strictness” approach avoids that set of problems entirely. There is no free lunch, though, of course. Avoiding those problems requires being a bit more disciplined—you need to carve out some dedicated time to do the work by tackling a couple modules each week or something like that. Ultimately, though, it means that you neither have to revisit already-converted modules nor have the extremely annoying experience of getting errors TS *can and should* catch coming from already(-but-only-partially)-converted modules.

One additional note here: you can sometimes do a mix of *both* of these approaches quite effectively. If you have a larger app/etc. broken into a set of smaller packages, you *can* do the “iteratively work within a small library” approach within the packages, while avoiding publishing the types until you get them to full strictness. That ends up having some of the advantages and disadvantages of *both* approaches.



[^not-spurious]: It is true that there are sometimes type errors where the runtime code is safe. This is less and less common over time with TypeScript, though, and in my experience the *vast** majority of the type errors surfaced by enabling new strictness flags indicate real bugs in the code.
