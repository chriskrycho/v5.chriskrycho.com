---
title: Superscript and Subscript Line Heights
subtitle: A tip for better typography.
date: 2020-04-08T07:30
summary: >
    Superscripts and subscripts should not affect the vertical rhythm of the text.
qualifiers:
    audience: People who want their websites, apps, etc. to look right.
tags:
    - typography
    - web design

---

Superscripts and subcripts should not affect the vertical rhythm of the text. As a prime example common in blogs and similar websites: the superscript style used for footnotes should not make lines with footnotes taller than lines *without* footnotes.

Here’s an exaggerated example of an *incorrect* layout—notice how the line with the superscript “1” is *much* taller than the surrounding lines:

<div style="sup { line-height: 3 }">

This is just some running text which includes a superscript. It doesn’t say anything meaningful, it is just designed to run long enough that in every layout,<sup>1</sup> the superscript appears in the middle of the running text, so that the way that the offset is visible is clear.

</div>

Of course, it’s not normally quite this obvious. Here’s how it more commonly looks:

<div style="sup { line-height: inherit }">

This is just some running text which includes a superscript. It doesn’t say anything meaningful, it is just designed to run long enough that in every layout,<sup>1</sup> the superscript appears in the middle of the running text, so that the way that the offset is visible is clear.

</div>

Notice that the line with the superscript is still pushed down and away from the preceding line, even if not quite as dramatically.

Now, here’s the same layout, using the *correct* styles:

<div style="sup { line-height: 0 }">

This is just some running text which includes a superscript. It doesn’t say anything meaningful, it is just designed to run long enough that in every layout,<sup>1</sup> the superscript appears in the middle of the running text, so that the way that the offset is visible is clear.

</div>

I normally accomplish this by setting the [CSS] property [`line-height`][lh] to 0 for `sub` and `sup` items:

```css
sub, sup {
  line-height: 0;
}
```

I usually combine that with *other* transformations to size, vertical position, and even font family. The smaller the value of the `line-height` for your running text, the more you have to take care with the size and vertical position of super- and subscripts, so that they don’t collide with preceding or following lines respectively.

Here’s how `sub` and `sup` items are defined today on this site:

```css
```

[CSS]: https://developer.mozilla.org/en-US/docs/Web/CSS 
[lh]: https://developer.mozilla.org/en-US/docs/Web/CSS/line-height

*[CSS]: cascading style sheets