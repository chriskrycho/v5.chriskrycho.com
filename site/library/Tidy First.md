---
title: Tidy First? A Personal Exercise in Empirical Software Design
subtitle: Kent Beck wrote a remarkably helpful little book.

date: 2025-02-06T21:04:00-0700

qualifiers:
    audience: |
        Other software developers: juniors looking to level up, or seniors looking for great resources to hand to juniors.

book:
    title: Tidy First?
    author: Kent Beck
    year: 2023
    link: https://bookshop.org/a/21126/9781098151249
    cover:
        cdn: books/tidy-first.jpg
    review:
        rating: 'Required'
        summary: |
            This little book might not be the *very* first thing I hand to a junior engineer trying to improve in the craft of software… but it would certainly be among the first few. Practical and thoughtful both.

---

I picked up Kent Beck’s <cite>{{book.title}}</cite> on audiobook and listened through it late in January; almost immediately afterward I messaged a friend who is just a couple years into his career and told him, “Run, don’t walk, to get a copy of this book.”

Beck presents a few dozen tips on how one might “tidy” code: tiny refactors that change the structure without ever changing the meaning at all, but that allow future work to be easier still. He also offers some really helpful advice about when to tidy; there is a reason the book’s title ends in a question mark. *Should* you tidy first, i.e., before starting work? Should you tidy after finishing the work? Should you tidy in the middle? Shoud you tidy *never*? He shows the tradeoffs clearly and gives good advice about the orders of magnitude of changes.

For example: if you can see clearly that tidying first means the whole thing will take less time, *do it*. Or again, if your “tidying” feels like it needs a week-long ticket, it might be a valuable investment, but it probably isn’t *tidying*.

The last chunk of the book dives just a little into Beck’s philosophy of investment in software, and “investment” is the right word. He borrows liberally from the world of finance and trading, leaning especially on the idea of optionality and discounted future value. It was an interesting way of putting it, and one that I think may resonate more with business folks than the common language of “tech debt”, especially as overused as the latter is.

Net, this book probably belongs on the shelf of most working software engineers: for more junior engineers (or really any engineer who hasn’t learned about or practiced this kind of tidying) to use as a helpful guide to tidying practices and philosophies, and for more senior engineers who can use it as a quick reference for helping more junior engineers learn. [Grab a copy]({{book.link}})!
