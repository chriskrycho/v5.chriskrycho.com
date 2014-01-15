Title: Fontify!
Date: 2012-02-16 14:08
Author: chriskrycho
Slug: fontify

This bookmarklet generator will allow you to create a tool for your
bookmarks bar that will replace the fonts of any element on the page
with your specified font, as long as that font already resides on your
computer. For example, let's say you're a big fan of Book Antiqua (as I
am), and it's sitting there happily on your computer, but you can't put
it to use on the internet, because everyone specifies their own fonts.
Well, now you *can*, even if you're not technical. Use this bookmarklet,
supply the font you'd like to use (in quotes if it's more than one
word), the font size, and the parts of the page you want the font-change
applied to (usually just 'p'), and drag the resulting bookmarklet to
your bookmarks bar. Enjoy!

<form class="generator" style="padding-top: 1.333em;" action="http://www.chriskrycho.com/utilities/fontify-generator.php">
<fieldset>
<legend><span class="italic">Generate Fontify!
bookmarklet</span></legend>

<div>
<label for="font_family">Font family:</label>  

<input id="font_family" name="font_family" type="text" placeholder="“Times New Roman”"></input>

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
<input id="submit" name="submit" type="submit" value="Fontify!"></input>

</div>
</fieldset>
</form>

