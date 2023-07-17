---
title: Is TypeScript Good?—A Reply to Rach Smith
subtitle: >
  Taking [a thoughtful post](https://rachsmith.com/is-typescript-good/) as an excuse to discuss software system dynamics through the lens of TypeScript.

summary: >
  Rach Smith asks: “Is TypeScript good, or am I just becoming familiar with it?” I come down solidly on the side of “good”—because of how a TypeScript conversion works in terms of system dynamics.

tags:
  - software development
  - TypeScript
  - systems thinking

qualifiers:
  audience: >
    JavaScript-forward folks open to hearing a take on why TypeScript might indeed be good. This neither assumes deep technical familiarity with TypeScript nor addresses philosophical objections; the emphasis is on the practical questions raised by the post to which this one is responding.

  epistemic: >
    I have lived and breathed TypeScript’s tradeoffs for the last 6½ years: it is not impossible that I would change my mind here, but these are not tentative or provisional thoughts.

date: 2023-07-17T16:32:00-0600

---

Rach Smith [writes](https://rachsmith.com/is-typescript-good/)—and I quote extensively for the sake of a robust response to her—:

> The Mere Exposure effect describes our tendency to develop preferences for things simply because we are familiar with them.…
>
> TypeScript. I really didn't like it at first. Writing it felt slow and clunky, and I couldn't see how it could benefit us as a team when 99% of the codebase was still JavaScript.
>
> But I stuck with it, and kept plodding through, learning how to type our codebase. I've been working with it for over six months, and I'm growing to like it. I'm still unsure if TypeScript is preferable to JavaScript or just the exposure effect at play. Do I like it just because I'm familiar with it?
>
> The part I like most is being able to "see what things are". Now I get frustrated when I hover over a function or variable in VSCode, expecting it to tell me its types, and it can't because it was imported from a JS file.
>
> The part that makes me wary is how clever it makes me feel. TypeScript… tickles my brain in a way I've learned to be wary of because whenever I get too clever, I write code that is harder for others (or me, in 6 months) to read. There's a real dopamine rush from successfully converting a gnarly JS file into a TS one, even though I've achieved basically nothing in reality. The product is doing the same thing.

I like reading Rach because she offers a perspective quite different to the one I am around most of the time in my day job, and she obviously thinks hard about how to build software well. No surprise then that her post here does a great job of capturing two things:

- an important question about what a TypeScript conversion does or does not accomplish
- a real and important tradeoff around the language and the complexity it can enable

In the tradition of old-school blogging,[^blogging] I thought I would respond… publicly! I am going to take these in reverse order, because on the tradeoff she highlights, I largely agree. On the value provided by a conversion, I both sympathize with her and also think there is more to say.


[^blogging]: As my friend Brad East [put it][brad] a while back (emphasis mine):

    > Blogging is the shaggy dog of internet writing. It’s playful, experimental, occasional, topical, provisional, personal, tentative. It is inexpert, even when written by experts. It is off the cuff, even when polished and thought through.
    > 
    > And *it is conversational*, at its origins and in its form. *It’s constantly linking, talking, referring, thinking out loud by bouncing ideas off of other ideas, typically found on other blogs.*
    
    That's what this post is.

[brad]: https://www.bradeast.org/blog/substack-vs-blogging


## Tradeoffs

The key challenge with TypeScript—perhaps with *any* language with a robust type system—is the one Rach highlights here:

> TypeScript… tickles my brain in a way I’ve learned to be wary of because whenever I get too clever, I write code that is harder for others (or me, in 6 months) to read.

Type systems often mash a puzzle-solving button in our brains. Figuring out how to get the types *just right* for a given design can lead an unwary developer (reader: I mean myself) into an hours-long maze. Getting out of one of those mazes with a good solution feels incredibly satisfying. But it is not always *worth* it. A simpler type might be a little less precise, might catch a couple fewer errors, might make the system mildly less robust at runtime, might make it possible for there to be runtime bugs the system could in principle have ruled out entirely by clever use of the type system… and be 100% worth those tradeoffs given the context.

This highlights a further issue, as well. Beyond the puzzle-solving, many software developers and engineers (like me!) deeply prioritize the correctness of the code we write.[^correctness] It is more than just the puzzle-solving aspect at play. *Correctness* is (a) on a spectrum and (b) not free. Software engineers like me often get sucked into a second trap of maximizing correctness even at the cost of time.

Now, there are times when absolutely maximizing correctness is the right tradeoff. For example: if you are implementing <abbr title="transport layer security">TLS</abbr>, you should be using every tool at your disposal to guarantee correctness: a memory-safe language, formal modeling, <abbr title="test-driven design">TDD</abbr>, formal verification, you name it. To a large degree, the same goes when you are writing foundational framework or library code; I do not regret one second spent on making the TypeScript types for LinkedIn’s i18n and tracking libraries, or [Ember’s TypeScript types][types], both correct and useful (brutal though those efforts were).

[types]: https://blog.emberjs.com/stable-typescript-types-in-ember-5-1

That does not mean that maximizing type-driven correctness is the right choice everywhere. I often shorthand this by saying: most TypeScript app code should have a minimal number of type annotations and close to zero “fancy” type definitions—because well-written libraries should absorb that type-level complexity and make it possible to mostly just rely on type inference. Put another way: good library code should make it so most app code can be written and read mostly like JavaScript.

{% note %}

This does not always hold for [conversions][conversions], because conversions tend to expose just how wild our JavaScript code really was. I say more on this in [the section on value](#value) below.

[conversions]: https://v5.chriskrycho.com/journal/note-on-typescript-conversions/

{% endnote %}

TypeScript can make these two traps of puzzle-solving and correctness-maximizing particularly alluring. It comes with type system features available in no other language deployed so widely and targeting such a mainstream audience; the only languages really deployed in “industrial” contexts with comparable or greater type system complexity (albeit along different axes) are Rust and Haskell.[^rust-haskell] Those features enable puzzle-solving and correctness-maximizing you simply cannot get trapped by in Java or C^♯^.

Long story short, I very much agree with Rach about the temptation to *cleverness* offered by TypeScript. All of the most advanced TypeScript code I have written—the well-motivated examples listed above—comes accompanied by an even greater amount of comments and documentation, because the complexity is real, and high, and difficult for anyone to maintain (myself included).


[^correctness]: And the code our code enables *others* to write!

[^rust-haskell]: I do not have in mind here features like sum types/tagged unions/”custom types”, which *ought* to be treated as non-negotiables in any modern language. Nor am I thinking even of generics, which are also fairly indispensable as far as I am concerned: it is telling that even Java has had some kind of generic types for ages now. Rather, I am thinking of things like [mapped types][mt], [conditional types][ct], and [template literal types][tlt], which combine to produce a type-level language which can literally *parse SQL in the type system*.

[mt]: https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
[ct]: https://www.typescriptlang.org/docs/handbook/2/conditional-types.html
[tlt]: https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html


## Value

I still think TypeScript is good. The reason is suggested by the one bit of Rach’s post I disagree with (emphasis mine):

> There's a real dopamine rush from successfully converting a gnarly <abbr title="JavaScript">JS</abbr> file into a <abbr title="TypeScript">TS</abbr> one, *even though I've achieved basically nothing in reality. The product is doing the same thing.*

I hear this sentiment quite often, and I think there is something real behind it. I also think it is not quite right.

The “something real” is this: the product as experienced by the user is usually largely the same as it was before the conversion. However: the qualifiers “usually” and “largely” here matter enormously. It is only “usually” and “largely” because converting to TypeScript very often exposes bugs. Fixing those bugs means the product is only “doing the same thing” if we are speaking purely in terms of features _per se_ and exclude the user experience of bugs as something which matters.

When I was researching the possible impact of TypeScript adoption on our apps at LinkedIn, I found that up to a quarter of all the JavaScript errors experienced by our members would be caught be even a minimal TypeScript conversion. Our experience so far bears that out: Despite a lot of very smart software developers doing their best, whenever we convert some significant chunk of code, we find and fix bugs. Likewise, the single worst and longest-standing bug in the app I converted at my previous job was flagged immediately by TypeScript when we converted the relevant parts of the codebase.[^flagged]

Those kinds of real changes to the product can go much further as you make more investments, too. For example, we have done a lot of work at LinkedIn to get type safety in our internationalization and tracking libraries, and that has paid real dividends. Untranslated strings are a big deal for our members! And from an internal perspective, the same goes for our tracking libraries: if your A–B test data is not reliable, it is very hard to know whether a given experimental feature is paying for itself or not.

Net, very often the result of a conversion is *not* a product which “does the same thing”, but one which actually works better than it did before.

But let us grant the basic claim for a moment, because there are times when converting a file requires some ingenuity but does genuinely leave all the end-user functionality unchanged. I still do not think we have “achieved basically nothing in reality” in those cases.

First, when Rach describes the “real dopamine rush from successfully converting a gnarly <abbr title="JavaScript">JS</abbr> file into a <abbr title="TypeScript">TS</abbr> one”, she indirectly highlights an important reality—that in many cases the complexity was already present in the code base. The TypeScript conversion did not create that complexity: It exposed it. Real-world JavaScript code is often incredibly complicated and indeed “clever”, in ways that only become obvious when we try to express in types the contracts the code already invisibly assumes. As a result, conversions from JavaScript require complex types far more than code written in TypeScript from the start. Much of the complexity is (permanently!) implicit in JavaScript, while writing out the contracts in TypeScript makes it explicit. That enables better choices: does this particular <abbr title="application programming interface">API</abbr> actually warrant some complicated types, or should we just keep it simple? Usually: the latter.

Second, I often think of [a post by Mark Seeman][seeman] on exactly this theme, and at a far more general level (emphasis his, strong emphasis mine):

> You can write quality software in many different languages, using various styles. When you evaluate the externally observable qualities of software, the code is invisible. It's not part of the evaluation.
> 
> It seems to me that some people try to make an erroneous conclusion from this premise. They'd say that since no employer, client, or end user evaluates the software based on the code that produced it, then no one cares about the code. ... It's easy to refute that argument. All you have to do is to come up with a counter-example. You just have to find one person who cares about the code. That's easy.
> 
> ***You* care about the code.…**
>
> I think every programmer cares about their code bases; if not in an active manner, then at least in a passive way. Bad code can seriously impede progress. I've seen more than one organisation effectively go out of business because of bad legacy code.
>
> **Code quality is when you care about the readability and malleability of the code… about the code's ability to *sustain* the business, not only today, but also in the future.…**
> 
> Yes, you should write code such that it produces software that provides value here and now, but you should also do your best to enable it to provide value in the future. This is *sustainable* code. It's code that can sustain the organisation during its lifetime.

[seeman]: https://blog.ploeh.dk/2019/03/04/code-quality-is-not-software-quality/

Even a TypeScript conversion which leaves all the end-user functionality untouched can meaningfully improve the sustainability of the code base. (I say “can” not “does” because the details always matter. That holds for any code we write, though.) The cost of the conversion is important, and so we have to watch out for the puzzle-solving and correctness-maximizing traps described above. When we get that balance right, though, we improve our ability to “deliver value” to our users going forward.

Third, then, a TypeScript conversion can be thought of as improving the *stocks* in a system: language I borrow from Donella Meadows’ [<cite>Thinking in Systems</cite>][tis]. A *stock* is the capacity from which the *flows* out of a system are drawn. The water in an aquifer is the stock, the running faucet a flow. We should not spend all our time on building the stock of a system; that becomes unhealthy: a stagnant pool not only does not benefit anyone, but in fact can cause active harm to the environment. However, a failure to invest in and sustain the stocks of a system can cause catastrophe: an empty aquifer is very bad news for the community which relies on it.

In software, the stock of a code base is its sustaining capacity to deliver the flow of new end-user capabilities over time.[^static] Those improved abilities to understand, to navigate, and to change our code are all improved stocks. Even making complexity visible rather than invisible, as in the case of many JavaScript-to-TypeScript conversions, is an improvement to a stock. Investing in these sorts of non-functional changes to code which make it easier to work with later is therefore not “achieving nothing”. It is, rather, investing in the future of the system.

As Rach herself put it:

> The part I like most is being able to “see what things are”. Now I get frustrated when I hover over a function or variable in VSCode, expecting it to tell me its types, and it can’t because it was imported from a JS file.

This is a stock: type information make the code base easier to understand, and things which make code easier to understand enable us to make changes more easily. The same goes for robust go-to-definition which just works, everywhere, all the time, instead of being flaky and incomplete (because driven by a fragile pile of heuristics which are often wrong).[^ls] We cannot successfully change code we do not understand: neither adding new abilities, nor improving existing abilities, nor even fixing bugs.[^naur]

Nor is the improved stock limited to better comprehensibility of the code. It also includes far more powerful and reliable refactoring. For one thing, many refactors can be done automatically. For another, many even of the changes which cannot be automated are still easier after a <abbr title="JavaScript">JS</abbr>-to-<abbr title="TypeScript">TS</abbr> conversion. Right up front, being able to accurately and instantaneously find all references to a given <abbr title="application programming interface">API</abbr> makes it far easier to design a sweeping change involving that code. Then, after making a change, the ability to “just follow the compiler errors” makes the change far more trustworthy, not least because it tends to expose knock-on effects which are easy to miss in the absence of the types.

In sum, smart use of types helps sustain the ability to add features or to change how existing features work. They enable future flows.

Not every investment pays for itself, and the right balance of investments in stocks against the delivery of flows (features and capabilities) is something every software developer and team has to consider carefully. That a change is an investment delivering value sometime besides *today* does not make it less valuable, though. Indeed, sometimes the exact opposite is true: in software as in life.

[tis]: https://bookshop.org/a/21126/9781603580557


[^flagged]: That conversion was actually a cautionary tale, and a deeply formative experience for me. I *ignored* the error TypeScript flagged: “No, I know better; this piece of data can never actually be `null` or `undefined` here for <reasons>.” I was wrong. It took another year and many more millions—literal millions!—of that error affecting end users for us to catch it, purely by happenstance, and realize that TypeScript was right and I was wrong; that particular field absolutely *could* be `null` there.

[^ls]: Insofar as it already “just works” in a lot of JavaScript code bases, TypeScript is to thank for that, too, since most of that is powered by the TypeScript Language Server!

[^static]: That types are a help to this rather than an impediment is of course a primary bone of contention between the static and dynamic typing camps. I can say only that I find types to *dramatically* improve the ability to change a system over time, comparable in degree though different in specifics to the effect of good tests.

[^naur]: On which I recommend that everyone working in software read Peter Naur’s still-completely-relevant [Programming as Theory-Building][theory-building] (though skip the introduction and “commentary” after the conclusion in that <abbr title="portable document format">PDF</abbr>).

[theory-building]: https://pablo.rauzy.name/dev/naur1985programming.pdf
