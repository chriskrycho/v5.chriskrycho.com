---
title: Boring Tech = Local Maxima
subtitle: >
    Thank God for everyone who chose exciting tech. We wouldn’t be here without them.

tags:
    - software development
    - programming languages

---

In 2015, Dan McKinley wrote [Choose Boring Technology][cbt]. McKinley’s key thesis[^attr] is that companies should not innovate *too* much, that innovation is risky:

[cbt]: https://mcfunley.com/choose-boring-technology

> Let’s say every company gets about three innovation tokens. You can spend these however you want, but the supply is fixed for a long while. You might get a few more after you achieve a certain level of stability and maturity, but the general tendency is to overestimate the contents of your wallet. Clearly this model is approximate, but I think it helps.
>
> If you choose to write your website in NodeJS, you just spent one of your innovation tokens. If you choose to use MongoDB, you just spent one of your innovation tokens. If you choose to use service discovery tech that’s existed for a year or less, you just spent one of your innovation tokens. If you choose to write your own database, oh god, you’re in trouble.
>
> Any of those choices might be sensible if you’re a javascript consultancy, or a database company. But you’re probably not. You’re probably working for a company that is at least ostensibly rethinking global commerce or reinventing payments on the web or pursuing some other suitably epic mission. In that context, devoting any of your limited attention to innovating ssh is an excellent way to fail. Or at best, delay success.

This sounds eminently sensible! And he aims it at a noble goal: “Optimize Globally”—your company needs the benefits that come from focus, from minimizing the cognitive overhead of. Individual teams might do better.

Cool, yes, great, I agree.

Except that he’s actually describing optimizing *extremely locally*, just a tiny fractional bit less locally than the team level. That is: for one company. Just one. Yours, of course.

The problem: this perfectly reasonable, indeed quite rational, advice is all well and good, unless everyone takes it. If everyone takes it, we get stuck in a local maximum. Whatever is boring today *stays boring forever*. Nothing new gets to *become* boring.

The people who chose Rust in 2017 were not choosing boring technology. The people who chose Ruby on Rails in 2007 were not choosing boring technology. The people choosing Java in 1997 were not choosing boring technology. The people choosing Objective-C in 1987 were not choosing boring technology. The people choosing structured programming in 1977 were not choosing boring technology. The people choosing compilers in 1967 were not choosing boring technology.

*Nothing that is a boring technology today was always boring.* We owe everything good about modern software development to the people who rejected the advice McKinley offers.

Now, look: McKinley’s advice is aimed at helping companies make tech choices that benefit their users. And McKinley’s version of the advice is better than the meme-ified version of it that gets passed around by folks in engineering leadership roles. His point, construed charitably and reasonably, is that a lot of engineers would love to have an excuse to work on interesting new technologies,[^good] and that indulging this choice is not necessarily good for a healthy and sustainable business.

This is true.

But if every company makes that perfectly economically rational choice, we are all screwed. It means we leave our hands in the fate of the megacorporations and the tech they deign to build, whether or not it is an appropriate solution for the job at hand.


[^attr]: Which he attributes largely to [Kellan Elliot-McCrea][kem].

[kem]: https://laughingmeme.org

[^good]: Let us be clear: these are by and large the engineers you want on your team, not the ones who couldn’t possibly care less about learning something new.
