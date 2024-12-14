---
title: Reading Settings!
subtitle: >
    A few notes on pairing `prefers-color-scheme` and user configurability, as well as adding a little reading mode switch.
date: 2021-12-31T20:35:00-0700
updated: 2022-01-01T08:26:00-0700
updates:
  - at: 2021-12-31T21:05:00-0700
    changes: Corrected the overhead from Svelte’s runtime.
  - at: 2022-01-01T08:26:00-0700
    changes: >
      Fixed an error in the table (thanks to [Ben Makuh](https://benmakuh.com) for pointing it out!).
tags:
    - JavaScript
    - TypeScript
    - CSS
    - design
    - site meta
qualifiers:
  audience: >
    Web designers and developers interested in site setting tweaks which respect user preferences.

---



When redesigning this site, I knew I wanted to take advantage of macOS’ and Windows’ then-recently-added ability to support dark mode in the website (with the new <abbr title="cascading style sheets">CSS</abbr> media query [`prefers-color-scheme`]). However, I also knew that I wanted to make it user-configurable. It took me a couple of years to actually get around to it, but at last—at the same time as same time I publish this post—I have also added a tiny bit of JavaScript to the site that lets users override their operating system default to view the site in its light or dark theme as they please. Since I was already at it, I also added a “reading mode” view to hide the navigation.

[`prefers-color-scheme`]: http://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme

As is my habit when I deal with a question of how to implement something like this, I built out a table to capture how this should work:

<div class='table-container'>

| `prefers-color-scheme` | explicit preference | result |
| ---------------------- | ------------------- | ------ |
| `none`                 | none                | light  |
| `none`                 | light               | light  |
| `none`                 | dark                | dark   |
| `light`                | none                | light  |
| `light`                | light               | light  |
| `light`                | dark                | dark   |
| `dark`                 | none                | dark   |
| `dark`                 | light               | light  |
| `dark`                 | dark                | dark   |

</div>

This isn't complicated, <i>per se</i>… but it it *does* require some thought to make sure it works just right and that the <abbr>CSS</abbr> and <abbr title="JavaScript">JS</abbr> interact correctly.


## <abbr>CSS</abbr>

On the <abbr>CSS</abbr> side of things, it was important that there be *one* definition of what the light and dark color schemes are, and then that the `prefers-color-scheme` and a <abbr>CSS</abbr> class both use that same definition. That way, I don't have to try to keep multiple definitions in sync.

To make this work, I combined the power of [<abbr>CSS</abbr> Custom Properties][custom-properties] and an [<abbr title="sassy CSS">SCSS</abbr>][SCSS] mixin. The custom properties define the set of colors in play throughout the site: foreground, background, borders, link colors, etc. The mixin then applies those custom properties to the style selectors. As a simplified example:

[custom-properties]: http://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
[SCSS]: https://sass-lang.com

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

Then I used the same mixin to integrate with <abbr>OS</abbr>-level preferences, using the `@media (prefers-color-scheme: light)` check:

```scss
@media (prefers-color-scheme: light) {
   :root {
      @include light();
   }

   .dark:root {
      @include dark();
   }
}

@media (prefers-color-scheme: dark) {
   :root {
      @include dark();
   }

   .light:root {
      @include light();
   }
}
```

The way to think about this is:

- The first `:root` condition handles the case when a reader has not specified a preference *and* their operating system is not indicating anything to the browser, in which case they get the light theme.

- The `.light:root` and `.dark:root` declarations override that for 

- The `:root` declarations within the `prefers-color-scheme` checks make sure the default behavior for a reader whose <abbr>OS</abbr> is explicitly telling the browser to use a light or dark theme.

- Finally, the `.dark:root` within `prefers-color-scheme: light` and the `.light:root` within `prefers-color-scheme: dark` account for the case where the reader has overridden the system-level prefernce for this site.

These couple dozen simple lines of code are genuinely all there is to it; you can check out the current implementation [here][css] to confirm that! If you do, you may notice that I also use this as a way of integrating the style sheets for the syntax highlighting themes used in light and dark mode—which, combined with the choice do my syntax-highlighting as part of the build, means there’s minimal overhead to that for end users as well.

[css]: https://github.com/chriskrycho/v5.chriskrycho.com/blob/cf5ca7f4/site/_includes/styles/_color-scheme.scss#L122-L155

<aside>

I actually implemented this all the way back when I launched the site originally, since I needed to for dark mode support—I had hacked out a working, but janky, version of the same feature I pushed today all the way back in 2019. It has just never made it to the top of my priority list to finish it up until today, when I could do it more or less in the background of taking care of a sick wife and keeping an eye on our kids.

</aside>


## JavaScript

Because I did the hard work of pushing all the complexity into the <abbr>CSS</abbr>, the <abbr>JS</abbr> ends up being fairly simple. It only really has three responsibilities:

- setting or clearing the `.light` or `.dark` classes when the user interacts with the <abbr title="user interface">UI</abbr> element
- if the user has specified an override, storing that decision somewhere to look it up when the site loads
- checking for that decision when the site loads


### Responding to the user setting

There are three states the user can specify:

- light
- dark
- system

There was no need to do anything fancy in terms of making this actually work; I just set it up on the HTML directly this with a radio toggle:

```html
<form>
  <label for='system'>system</label>
  <input
    type='radio'
    name='theme'
    id='system'
    value='system'
  >
  <label for='light'>light</label>
  <input
    type='radio'
    name='theme'
    id='light'
    value='light'
  >
  <label for='dark'>dark</label>
  <input
    type='radio'
    name='theme'
    id='dark'
    value='dark'
  >
</form>
```

This in turn, I wired up with bog standard event handlers with `Element.addEventListener`. That event listener in turn updates a few classes on the <abbr title="Document Object Model">DOM</abbr> and stores the reader’s decision.


### Storing the reader's decision

Modern browsers—anything newer than <abbr title="Internet Explorer 8">IE8</abbr>!—all give us easy access to the `localStorage` <abbr title="application programming interface">API</abbr>, which is perfect for this kind of thing.[^graceful-degradation] I simply defined a key, `'sympolymathesy:theme'`, and then set the value corresponding to the user’s choice. If the reader chooses to follow the system, after having set a different preference at some point, I just remove the value entirely. This makes for *super* easy setup: if there is no value in local storage, I can always assume the reader should be defaulted into the system setting—either because they are just visiting the site for the first time, in which case I should respect their <abbr title="operating system">OS</abbr>-level preferences, or because they have chose to opt back into that mode explicitly. There is no need to distinguish between the two!

[^graceful-degradation]: If the reader happens to be in an environment where it *doesn't* exist or work for some reason, it's fine: it just falls back to matching the operating system, with a default of the light mode.


## Hiding the sidebar navigation

I also added a setting to allow users to hide the nav sidebar on larger screens (it is already pushed below the content on smaller screens)—a sort of dedicated “reading mode”. This was implemented in basically the exact same way as the color scheme handling, except for using a checkbox instead of a set of radio toggles. The only interesting bit is that I simply hide that control in the case when the reader is on a smaller screen, since it does nothing—all with a simple media query.

As for why—well, I personally really like having the ability to just focus on the text and hide everything else away, and one of the things I have occasionally missed from v4 of this site is that the average view of any given page was *just the text*. While I like the new design much better overall, larger screen views don’t have *quite* as nice a reading experience as smaller screens or the old version of the site do—so I have now fixed that for anyone who, like me, wants a just-the-content view!


## On vanilla JavaScript

As noted above, I implemented all of this using only “vanilla” JavaScript. While I used TypeScript (because I *always* use TypeScript) and I do have a tiny build tool (Rollup is great for this kind of thing), the result is not very different from what I would have written by hand. It just had a slightly nicer authoring experience along the way, including being able to get much faster feedback both in my editor and in the browser *without* impacting end users at all.

(You can check out the entire implementation [here][ts]. I chose to make it *slightly* more robust than it absolutely “needed” to be, but the whole thing is well under a kilobyte even so.)

[ts]: https://github.com/chriskrycho/v5.chriskrycho.com/tree/0174ded9/scripts

This is the part of the story where, per many of the folks out there, I’m supposed to tell you how vanilla JavaScript is awesome. And in terms of the size of the JavaScript I ship down to support this, doing it with vanilla <abbr>JS</abbr> rather than pulling in a framework was indeed the right move. But… it’s a bit more complicated than “vanilla <abbr>JS</abbr> is better.”

I ran an experiment around this time last year in doing this with [Svelte][svelte], which is aimed at pretty much exactly this kind of use case. I liked it, and enjoyed learning Svelte—and authoring it that way was a *much* better experience than doing it in vanilla JavaScript the way I did today. It involved a lot less code and was a lot less error-prone. I shipped the non-Svelte version because I measured the result, and Svelte’s runtime cost 4× as much as the version written by hand. For *this specific use case*, that didn’t make sense.

[svelte]: https://svelte.dev

However, as I currently hope to elaborate on in a future piece, that’s really *only* because I was only authoring a single component here. The frameworks provide a *lot* of value in terms of authoring—and, just as importantly, when you scale past about three components built by hand like this, you end up starting to build your own little framework. (Spoilers: I was already ending up doing a lot of that here, and it’s *one UI component*!) The frameworks don’t come for *free*, but I strongly suspect based on this experience that the cost in size is more than amortized across any web page which uses more than a few components—and more than amortized in *bug count* as well.

But more on that in the future!
