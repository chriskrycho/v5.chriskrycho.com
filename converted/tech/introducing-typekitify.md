Title: Introducing: Typekitify!
Date: 2012-02-13 10:54
Author: chriskrycho
Category: Tools
Tags: bookmarklet, Javascript, typography
Slug: introducing-typekitify

Occasionally, I'll be reading a website and just wish I could use
another, better font. I can, of course... I can go look up the element
on the page that I want to change, use the developer tools to
dynamically alter the page, and go back to my reading. This is a pain in
the neck, though, and sometimes I want to use fonts that I don't
necessarily have on my computer - like "Athelas," the font that
[Readability][] uses to display its body text, and which they get using
[Typekit][]. <!--more-->

Moreover, I realized that *lots* of people have the same issue, and lots
of people might want to change the fonts on their page easily. So, I
created this bookmarklet generator to do the trick for you. (A little
later this week, I'll be putting up a similar generator that doesn't use
Typekit, since you might be perfectly happy with the fonts on your own
computer.)

From the permanent [project landing page][]:

To generate a Typekitify! bookmarklet, you need to have a [Typekit][]
account and create a kit with the fonts you want and the domain(s) you
want to use. (If you're on a free account, you can only point at one
website at a time.) Grab the Embed Code snipped from the Kit Editor and
copy the part that looks like this:

~~~~ {lang="html4strict"}
http://use.typekit.com/[characters].js
~~~~

Then click the "Using fonts in CSS" link in your Kit and copy the name
it supplies for the font family field (you can add fallback fonts, if
you so desire). Add font size and list the elements you want to apply
the font to (you can be as specific as you like), and away you go!

<form class="generator" style="padding-top: 1.333em;">
<fieldset>
<legend><span class="italic">Generate Typekit
bookmarklet</span></legend>

<div>
<label for="typekit_src">Typekit source:</label>  

<input id="typekit_src" name="typekit_src" type="text" placeholder="http://use.typekit.com/[characters].js"></input>

</div>
<div>
<label for="font_family">Font family:</label>  

<input id="font_family" name="font_family" type="text" placeholder="Athelas"></input>

</div>
<div>
<label for="font_size">Font size:</label>  

<input id="font_size" name="font_size" type="text" placeholder="18px"></input>

</div>
<div>
<label for="dom_elements">Elements:</label>  

<input id="dom_elements" name="dom_elements" type="text" placeholder="p"></input>

</div>
<div>
<input id="submit" name="submit" type="submit" value="Generate bookmarklet"></input>

</div>
</fieldset>
</form>
While the bookmarklet does not currently support attaching unique styles
to different kinds of elements, you can generate multiple bookmarklets
to achieve the same effect, and rename them to differentiate them. For
example, if you wanted header elements to be in FF Meta Serif and
paragraphs to be in Myriad, you might make an FFMetafy! and a
Myriadify!.

  [Readability]: http://www.readability.com/
  [Typekit]: https://typekit.com/
  [project landing page]: http://www.chriskrycho.com/web/projects/typekitify/
    "Typekitify!"
