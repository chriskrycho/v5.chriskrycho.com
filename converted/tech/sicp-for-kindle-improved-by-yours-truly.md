Title: SICP for Kindle – improved by yours truly
Date: 2012-11-21 12:48
Author: chriskrycho
Category: Projects
Tags: GitHub, Kindle, MIT Press, Ruby, Structure and Interpretation of Computer Programs
Slug: sicp-for-kindle-improved-by-yours-truly

I was looking for a Kindle version of the MIT Press classic text on
computer programming, <cite>Structure and Interpretation of Computer
Programs</cite>, which is (delightfully!) available online in its
entirety [here][] as an HTML book. (MIT is awesome like that.) I found
one, by [twcamper on GitHub][].

Unfortunately, I discovered that he had eliminated paragraph indentation
- apparently Kindle was doing that automatically at some point, but they
have since stopped - so I forked it, thinking I'd just add it in,
rebuild the `.mobi` file, and be on my way. Alas, it wasn't that simple:
his documentation skipped a few things (it looks like it was more a way
of storing his personal project than meant for public consumption), so I
spent a good chunk of the morning figuring out how the project worked,
making some tweaks to get it to work the way *I* wanted it to, and
updating the documentation so others could follow my steps themselves if
they wanted to make their own tweaks to the CSS file.

You can get the updated book directly [from the Downloads page][]. If
you want the Ruby code used to generate it, you can get that direct from
the main [GitHub page for the project][], which also has a (much
improved, in my opinion) writeup on how to actually use it. Enjoy!

  [here]: http://mitpress.mit.edu/sicp/full-text/book/book.html
  [twcamper on GitHub]: https://github.com/twcamper/sicp-kindle
  [from the Downloads page]: https://github.com/chriskrycho/sicp-kindle/downloads
  [GitHub page for the project]: https://github.com/chriskrycho/sicp-kindle
