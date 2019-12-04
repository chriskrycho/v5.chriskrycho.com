---
title: Color Schemes!
subtitle: >
    A few notes on pairing <code>prefers-color-scheme</code> and user configurability.
date: 2019-12-07T11:45
tags:
- JavaScript
- TypeScript
- CSS
- web design

---

When redesigning this site, I knew I wanted to take advantage of macOS' and Windows' recent ability to support dark mode in the website (with the new CSS media query [`prefers-color-scheme`]). However, I also knew that I wanted to make things user-configurable. As same time I publish this post, I have also added a tiny bit of JavaScript to the site that lets users override their operating system default to view the site in its light or dark theme as they please.

[`prefers-color-scheme`]: TODO

*[CSS]: cascading style sheets

As is my habit when I deal with a question of how to implement something like this, I built out a table to capture how this should work:

| `prefers-color-scheme` | explicit preference | result |
| ---------------------- | ------------------- | ------ |
| none                   | none                | light  |
| none                   | light               | light  |
| none                   | dark                | light  |
| light                  | none                | light  |
| light                  | light               | light  |
| light                  | dark                | dark   |
| dark                   | none                | dark   |
| dark                   | light               | light  |
| dark                   | dark                | dark   |

This isn't complicated, <i>per se</i>… but it it *does* require some thought to make sure it works just right and that the CSS and JS interact correctly.

*[JS]: JavaScript

## CSS

On the CSS side of things, it was important that there be *one* definition of what the light and dark color schemes are, and then that the `prefers-color-scheme` and a CSS class both use that same definition. That way, I don't have to try to keep multiple definitions in sync.

To make this work, I combined the power of [CSS Custom Properties] and an [SCSS] mixin. The custom properties define the set of colors in play throughout the site: foreground, background, borders, link colors, etc. The mixin then applies those custom properties to the style selectors. As a simplified example:

```scss
@mixin light {
    --bg: #FEFEFE;
    --fg: #333333;
}

@mixin dark {
    --bg: #333333;
    --fg: #FEFEFE;
}
```

Then for the slightly tricky bit—applying these to the appropriate selectors. First, we handle the case where the user hasn't defined a preference. This corresponds to the `none` for `prefers-color-scheme` in our table.

```scss
:root,
.light:root {
    @include light;
}

.dark:root {
    @include dark;
}
```

[CSS Custom Properties]: TODO
[SCSS]: TODO

*[SCSS]: TODO

## JavaScript

Because I did the hard work of pushing all the complexity into the CSS, the JS ends up being very simple. It only really has two responsibilities:

1. setting or clearing the `.light` or `.dark` classes when the user interacts with the UI element
2. if the user has specified an override, storing that decision somewhere to look it up when the site loads

*[UI]: user interface

### Responding to the user setting

There are three states the user can specify:

- light
- dark
- system

I chose to represent this with a radio toggle, and the JavaScript is fairly simple. (You can check out the entire implementation [here][ts]. I chose to make it *slightly* more robust than it needed to be, but the whole thing is under a kilobyte.)

[ts]: TODO

There's no need to do anything fancy in terms of making this actually work; I just set it up on the HTML directly:

```html
<form>
  <label for='system'>system</label>
  <input
    type='radio'
    name='theme'
    id='system'
    value='system'
    oninput='setTheme'
    checked
  >
  <label for='light'>light</label>
  <input
    type='radio'
    name='theme'
    id='light'
    value='light'
    oninput='setTheme'
  >
  <label for='dark'>dark</label>
  <input
    type='radio'
    name='theme'
    id='dark'
    value='dark'
    oninput='setTheme'
  >
</form>
```

### Storing the user's decision

Modern browsers—anything newer than IE8!—all give us easy access to the `localStorage` API, which is perfect for this kind of thing.[^graceful-degradation]

[progressive enhancement]: TODO

*[IE8]: Internet Explorer 8
*[API]: application programming interface

[^graceful-degradation]: If the user happens to be in an environment where it *doesn't* exist or work for some reason, it's fine: it just falls back to matching the operating system, with a default of the light mode.

