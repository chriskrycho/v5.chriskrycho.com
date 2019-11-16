// Type definitions for MarkdownItDeflist (markdown-it-implicit-figures) 0.9.0
// Project: https://github.com/arve0/markdown-it-implicit-figures
// Definitions by: Chris Krycho <https://github.com/chriskrycho>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

import MarkdownIt = require('markdown-it')

declare module 'markdown-it-implicit-figures' {
   export interface Options {
      /**
         Set `dataType` to `true` to declare the data-type being wrapped,  e.g.:
         `<figure data-type="image">`. This can be useful for applying special styling for
         different kind of figures.
       */
      dataType?: boolean

      /**
         Set `figcaption` to `true` to put the alternative text in a
         `<figcaption>`-block after the image. E.g.: `![text](img.png)` renders to

         ```html
         <figure>
            <img src="img.png" alt="text">
            <figcaption>text</figcaption>
         </figure>
         ```
       */
      figcaption?: boolean

      /**
         Set `tabindex` to `true` to add a `tabindex` property to each figure, beginning
         at `tabindex="1"` and incrementing for each figure encountered. Could be used
         with [this css-trick](https://css-tricks.com/expanding-images-html5/), which
         expands figures upon mouse-over.
       */
      tabindex?: boolean

      /**
         Put a link around the image if there is none yet. For example:

         ```html
         <a href="img.png"><img src="img.png"></a>
         ```
       */
      link?: boolean
   }

   /**
      Render images occurring by itself in a paragraph as `<figure><img ...></figure>`, similar to [pandoc's implicit figures](http://pandoc.org/README.html#images).

      Example input:

      ```md
      text with ![](img.png)

      ![](fig.png)

      works with links too:

      [![](fig.png)](page.html)
      ```

      Output:

      ```html
      <p>text with <img src="img.png" alt=""></p>
      <figure><img src="fig.png" alt=""></figure>
      <p>works with links too:</p>
      <figure><a href="page.html"><img src="fig.png" alt=""></a></figure>
      ```
    */
   export default function implicitFigures(md: MarkdownIt, options?: Options): void
}
