---
title: The `twitter:label` and `twitter:data` meta tags
subtitle: >
    I have never seen these documented, but they are useful!

date: 2025-02-03T20:12:00-0700
updated: 2025-02-03T21:16:00-0700

image:
    cdn: twitter-meta-tags.png

tags:
    - social media
    - writing

qualifiers:
    audience: |
        The kinds of people who build their own websites.

---

Today I learned about the `twitter:label` and `twitter:data` meta tags. They’re useful not just for X/Twitter/whatever but also for e.g. Slack, where they render like this for the values on this site as of earlier today:

![](https://cdn.chriskrycho.com/images/{{image.cdn}} "A screenshot of a Slack media unfurl, with a red arrow pointing to a red box around two bits of metadata: 'Author: Chris Krycho' and 'Length: About 4,000 words'")

They are numbered and go in a pair. For example, for the author and post length info in the screenshot above, I supply these tags:

```html
<meta name="twitter:label1" content="Author" />
<meta name="twitter:data1" content="Chris Krycho" />
<meta name="twitter:label2" content="Length" />
<meta name="twitter:data2" content="About 4,000 words" />
```

Note the `1` and `2` in the two pairs. Does this extend out to more? Maybe! I have no idea, actually! The only documentation I have found for it is [on this third-party site](https://zhead.dev/meta/), which has as a top-level bullet point describing the site “⚡ 101+ Meta Tags many which have difficult to find documentation.” Sounds about right.
