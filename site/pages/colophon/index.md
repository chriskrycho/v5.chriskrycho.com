---
title: Colophon
subtitle: Or, how this site is made.
permalink: /colophon/index.html
layout: colophon.njk
---

## Implementation

I built this version of the site with [Eleventy]. You can find the entirety of the implementation (and indeed the entire *history* of the implementation) [on GitHub][repo]. I'm using it with the following plugins:

- <b>typeset:</b> my own implementation of a plugin for [typeset], heavily inspired by [eleventy-plugin-typeset]

- <b>[markdown-it] plugins:</b>
    - [anchor](https://github.com/valeriangalliat/markdown-it-anchor)
    - [definition list](https://github.com/markdown-it/markdown-it-deflist)
    - [footnote](https://github.com/markdown-it/markdown-it-footnote)
    - [superscript](https://github.com/markdown-it/markdown-it-sup)

- <b>spacewell:</b> a little tool I built a few years ago to insert hair spaces around em dashes and thin spaces with non-breaking spans around number-separating en dashes; the source is colocated with the rest of the site

[Eleventy]: https://www.11ty.io
[repo]: https://github.com/chriskrycho/v5.chriskrycho.com
[typeset]: https://typeset.lllllllllllllllll.com
[eleventy-plugin-typeset]: https://github.com/johanbrook/eleventy-plugin-typeset
[markdown-it]: https://github.com/markdown-it/markdown-it

## Typography

| Context  | Typeface |
| -------- | -------- |
| Body text | [Sabon], designed by Jan Tschichold in the mid-1960s as a Garamond revival. Arguably the most beautiful Garamond in existence. Licensed via [Fonts.com]. |
| Headings  | [Cronos], designed by Robert Slimbach in 1996. A nice contrast to Sabon with its digital-era, Adobe-sponsored roots. Licensed via [Fonts.com]. |
| Code      | [Hack], designed by Chris Simpkins in 2015. Licensed in parts under the MIT License, the public domain, and Bitstream Vera License (see details [here][hack-license]). |

[Sabon]: https://www.myfonts.com/fonts/linotype/sabon/
[Fonts.com]: https://www.fonts.com
[Cronos]: https://www.myfonts.com/fonts/adobe/cronos/
[Hack]: https://sourcefoundry.org/hack/
[hack-license]: https://github.com/source-foundry/Hack/blob/master/LICENSE.md
