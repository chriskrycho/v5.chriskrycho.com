---
title: "PSA: Do Not Use Blockquotes for Admonitions"
subtitle: >
    Markdown leads you into this trap, but you don’t have to fall into it.
date: 2024-07-30T16:06:00-0600
tags:
    - accessibility

# This has a code sample of the shortcode in it. «sigh»
templateEngineOverride: md

---

Public service announcement: please do not use `blockquote` where you really mean some kind of admonition or callout. (This is the biggest accessibility consequence I can think of from Markdown’s limited vocabulary.) Use an actual admonition if your Markdown engine supports it, or custom <abbr title="HyperText Markup Language">HTML</abbr> otherwise.

Why? Because people reading your site with assistive technology like VoiceOver will not see the visual presentation of your block quote (however much it looks like an admonition); they will simply hear it narrated as a quote. (Yes, people who need to use screen readers are used to working around that. No, that does  not mean we should accept the _status quo_ as “good enough”.)

For an example of appropriate <abbr>HTML</abbr>, you can do something like [what I do][code] for my website’s rendering of “Note” callouts, or check how GitHub renders its admonitions. For example, this note—

<section class="note" aria-label="Note" aria-role="Note">
<p>This is some content to which I would like to draw your attention!</p>
</section>

—has this <abbr>HTML</abbr>:

```html
<section class="note" aria-label="Note" aria-role="Note">
  <p>This is some content to which I would like to draw your attention!</p>
</section>
```

`aria-label` and `aria-role` are good! Style it as you like; but don’t use `blockquote`!

This little <abbr title="public service announcement">PSA</abbr> was inspired by one particular blog I was just reading, but I am *intentionally* not mentioning which site: this is a general failure mode I see across *many* websites. Like I said: it falls out of Markdown’s limited vocabulary. Alas! But we can do better, even with the limitations of our tools.

---

If your Markdown engine does not support admonitions natively, and you find that extra <abbr>HTML</abbr> annoying to remember, see whether your blog engine lets you make a “shortcode” so you can create admonitions. I never write that out myself, because I do not remember the exact right set of attributes (I was always copying and pasting it!). I write this instead:

```markdown
{% note %}

This is some content to which I would like to draw your attention!

{% endnote %}
```

[code]: https://github.com/chriskrycho/v5.chriskrycho.com/blob/791ae4cd980fe8bf5d72660555535117128be7dd/eleventy/shortcodes.ts#L4-L7
