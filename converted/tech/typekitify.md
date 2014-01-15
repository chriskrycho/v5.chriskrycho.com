Title: Typekitify!
Date: 2012-02-08 21:21
Author: chriskrycho
Slug: typekitify

To generate a Typekitify bookmarklet, you need to have a [Typekit][]
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

<form class="generator" style="padding-top: 1.333em;" action="http://www.chriskrycho.com/utilities/typekitify-generator.php">
<fieldset>
<legend><span class="italic">Generate Typekitify!
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
<input id="submit" name="submit" type="submit" value="Typekitify!"></input>

</div>
</fieldset>
</form>
While the bookmarklet does not currently support attaching unique styles
to different kinds of elements, you can generate multiple bookmarklets
to achieve the same effect, and rename them to differentiate them. For
example, if you wanted header elements to be in FF Meta Serif and
paragraphs to be in Myriad, you might make an FFMetafy! and a
Myriadify!.

  [Typekit]: https://typekit.com/
