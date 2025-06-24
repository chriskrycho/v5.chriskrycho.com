---
title: Using `light-dark()` Instead of a Sass Mixin for Color Schemes
subtitle: >
  One fewer reason to use anything besides native <abbr title="">CSS</abbr>

date: 2025-06-23T18:55:00-0600

tags:
  - web development
  - CSS

thanks: >
  [Nathan Knowler](https://sunny.garden/@knowler/114733304046537864) told me about this on Mastodon!

---

Over the past few years, <abbr title="cascading style sheets">CSS</abbr> has improved so much that I do not need almost any of the capabilities provided by Sass/<abbr title="sassy cascading style sheets">SCSS</abbr>. One of the few places I have continued to use it is writing a `@mixin` to handle light and dark color schemes on my website, so that I can correctly support both the user’s system-level preference (with the `prefers-color-scheme` media query) and their manual preference via the tiny “settings” panel this site supplies in the upper right corner. The settings panel simply sets a top-level class on the `html` element. To support both of these, though, you historically need separate declarations:

```scss
// Assume the actual colors are defined elsewhere!
@mixin light {
  --fg: var(--gray-0);
  --bg: var(--gray-5);
  // ...
}

@mixin dark {
  --fg: var(--gray-5);
  --bg: var(--gray-1);
  // ...
}

:root,
.light:root {
  @include light();
}

.dark:root {
  @include dark();
}

@media screen and (prefers-color-scheme: light) {
  @include light();
}

@media screen and (prefers-color-scheme: dark) {
  @include dark();
}
```

Thanks to the relatively recent addition of the `light-dark()` function in <abbr>CSS</abbr>, though, you can now write this entirely with pure <abbr>CSS</abbr>!

```css
:root {
  color-scheme: light dark;
  --fg: light-dark(var(--gray-0), var(--gray-5));
  --bg: light-dark(var(--gray-5), var(--gray-1));
  // ...
}

.light {
  color-scheme: light;
}

.dark {
  color-scheme: dark;
}
```

Because the declared color scheme matches the color scheme definitions for light and dark mode on users’ operating systems, this *automatically* applies to the `prefers-color-scheme` queries as well. So that’s the whole thing, at least for this part!

The last couple bits I need to knock down to not need <abbr>SCSS</abbr> *at all* are:

- The equivalent of the nice `@use` directive. I think I might actually be able to use [Lightning <abbr>CSS</abbr>](https://lightningcss.dev) directly along with its interpretation of native `@import` for bundling and minification.
- Applying the same approach to the syntax highlighting theme shown above for the syntax highlighting theme, for which I also currently use a `@mixin` the same way.

I think both of those are quite doable. There’s a good chance that by the time I ship this particular project, there will be zero remaining lines of <abbr>SCSS</abbr>. A strange feeling after well over a decade!