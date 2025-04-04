---
title: NodeWalker in JavaScript
subtitle: For tasks like “transform every text node”.

date: 2025-04-04T10:35:00-0600

tags:
  - JavaScript
  - things I learned

qualifiers:
  audience: |
    People with basic familiarity with JavaScript’s document <abbr title="application programming interface">API</abbr>s.

---

I wanted to fix up every single text node in a particular document I was reading just now (doing some research): replacing the old-school use of ` ``quoted'' ` with `“quoted”` so I could be less annoyed by it.[^yes] I knew I could write a little script that recursively walked every part of the <abbr title="document object model">DOM</abbr> tree using `querySelectorAll` and `Node.childNodes`, and doing something with the node *only* when it is a text node. I have done that before. It’s kind of annoying!

So I wondered: is there an easier way to do this? A quick search taught me that [the `Document.createTreeWalker` <abbr title="application programming interface">API</abbr>][api] exists, which makes this trivial!

[api]: https://developer.mozilla.org/en-US/docs/Web/API/Document/createTreeWalker

Here’s what I did:

```js
let walker = document.createTreeWalker(document, NodeFilter.SHOW_TEXT);
while (walker.nextNode()) {
  walker.currentNode.data = walker.currentNode.data
    .replace("''", "”")
    .replace("``", "“")
    .replace("'", "’")
    .replace("`", "‘");
}
```

It’s funny to me that despite my having written JavaScript for fifteen years, my having been a *specialist* in the language for most of a decade, and the language itself having a hilariously small standard library, I still find new <abbr>API</abbr>s like this all the time.

[^yes]: Yes, this is indeed a little window into my mind. Yes, it really is this persnickety in here.
