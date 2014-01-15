Title: Custom Fonts on Kindle
Date: 2012-10-07 10:18
Author: chriskrycho
Category: Posts
Tags: Calibre, Kindle, Kindle Collections, plugin, tutorial, typography, walkthrough
Slug: custom-fonts-on-kindle

The standard typeface for the Kindle, Caecilia, works well enough: it's
a well-designed, high contrast slab serif that matches the needs of the
low-contrast, low-resolution Kindle screens well. It's also not even
close to being a really great reading face. The new Kindle Paperwhite
has gorgeous typography, by all accounts, but if you have an older
Kindle, you don't have to buy a new one to start getting some of the
benefits of better typography.

I recently discovered that it is possible, with a fairly small amount of
effort, to put whatever fonts you like on your Kindle, *without
jailbreaking*. Here's how. <!--more-->

1.  First, find the font you want to use for your Kindle.
    1.  <span style="text-decoration: underline">Technical
        requirements:</span> It'll need to be either OpenType (`.otf`)
        or TrueType (`.ttf`) to start. You ultimately need it to be in
        `.ttf` format - some instructions I've seen suggest the Kindle
        will recognize even a `.otf` as long as the extension is
        changed, but I'm not sure if that's true. There are online
        converters you can use, and for best results if you have `.otf`
        files, you should [convert them][] to `.ttf` before continuing.

        *Make sure you're doing this legally*. Use a font that doesn't
        forbid conversion in its End User License Agreement. You can
        find lots of free fonts on the web, many of them with open
        licenses. You might start at [DaFont.com][] and
        [FontSquirrel][], which have very long lists of free fonts

    2.  <span style="text-decoration: underline">Appearance
        suggestion:</span> Find a medium weight (thickness) font.
        Thinner fonts won't display well and will be hard to read. Many
        of the free fonts you can find online include multiple weights;
        generally you'll want to use a **Medium** rather than
        **Regular** weight for the base. One great free font that might
        work well even in its normal weights is the free [Crimson][].

2.  You'll need font files named `[fontname]-Regular.ttf`,
    `[fontname]-Italic.ttf`, <code[fontname]-bold.ttf< code>, and
    `[fontname]-BoldItalic.ttf`. They don't have to have these names
    when you find them; all you really need to do is find the regular,
    italic, bold, and bold-italic versions of the font file, then rename
    them to match this format.

    One friend used Liberation Sans ([free at DaFont.com][]), so his
    fonts ended up being named `LiberationSans-Regular.ttf`,
    `LiberationSans-Italic.ttf`, `LiberationSans-Bold.ttf`, and
    `LiberationSans-BoldItalic.ttf` after renaming them.

3.  Connect your Kindle to the computer, and open it in Windows Explorer
    or Finder (depending on whether you're on Windows or a Mac). At the
    base directory of the Kindle (the same level where you'll see the
    `documents`, create a new folder called `fonts`. Put the font files
    you created in step 3 in the folder. **Note: you *must* have all
    four files outlined above.**
4.  From here, the steps differ depending on whether you're on a
    Keyboard, or a Touch or Paperwhite. (If some enterprising reader
    wants to tell me which category the base model with just a five-way
    fits into, that would be excellent.)
    -   **Kindle Keyboard:**

        1.  Install [Calibre][] (you can find the download for your
            operating system [here][]). Calibre is great general
            software to have for your Kindle anyway.
        2.  Once you have Calibre installed, you'll need to install the
            **Kindle Collections** plugin.
            1.  Go to the Plugins button (it may be in the extended part
                of the menu; there's a button on the right to enable
                it). If you click the drop down next to the Plugins
                button, you'll see the option **Get plugins to enhance
                Calibre**; choose that.
            2.  It should bring up a menu titled User Plugins, and just
                below that a drop down labeled **Filter list of
                plugins**. Make sure that **Not installed** is selected.
                Looking through the list, find **Kindle Collections**
                (it's third from the top on my list). Install it.
            3.  You'll be prompted to add the plugin to toolbars or
                windows. I'd add it to **The main toolbar when a device
                is connected** and **The menubar when a device is
                connected**.
            4.  It will prompt you to restart Calibre, do so.

        3.  Now, back to Calibre: if you have it up, it should note that
            your device is connected, and you should be able to look at
            all the books on it. You should also see the **Kindle
            Collections** button and menu item (again, it may be in the
            extended toolbar area). Click it and then select **Modify
            Kindle settings**.
        4.  Now, we'll actually enable the font on the Kindle:
            1.  Under **Font Family**, choose the new font you added
                (opt for the one with a regular name if there is one
                with an underscore or other strange character in there).
            2.  Check the box labeled **Allow using user font**.
            3.  Click **Save**. You'll be prompted to restart your
                Kindle. In case you miss the on-screen instructions on
                how to restart the Kindle, here's a quick walkthrough:
                1.  Eject it from the computer.
                2.  Once the Kindle comes up, go to the home screen
                    (click **Home**).
                3.  Click **Menu** and choose **Settings**.
                4.  Once the Settings menu is up, click **Menu** and
                    then choose **Restart**.

            4.  Once the Kindle comes back up up (and it'll take a few
                to come all the way back up and reload your library),
                load any book. Click the **Aa** key to change your font
                settings, and under Typeface choose **alt** if it's not
                already selected. Adjust your preferred font size, words
                per line, and line spacing as desired, and away you go.

    -   **Kindle Touch/Kindle Paperwhite**^[1][]^

        1.  Create a blank file called `USE_ALT_FONTS` at the root level
            of the Kindle (the same level where you created the `fonts`
            directory).

            -   If on Windows, launch Notepad and save a file with that
                name to the Kindle. *Make sure it has no extension.
                Delete the extension manually if necessary.*
            -   If on Mac or Linux, launch the Terminal (Mac:
                Applications → Utilities → Terminal) and create the file
                by typing `touch USE_ALT_FONTS`. The file will be
                created in your home directory; go ahead and move it to
                the root of the Kindle. (\*nix nerds can obviously do
                this the easy way.)

        2.  Eject the Kindle from the computer. Perform a full restart
            on it (Menu → Settings, Menu → Restart).
        3.  Open up a book or document, and try changing the font. You
            should see your font there.
        4.  If you do not, return to the home page, tap the search icon,
            and type in `;fc-cache` and hit the return key on the screen
            keyboard. Wait a few minutes; the Kindle will sort of flash
            the screen and then reset to the normal view. You should now
            be able to select the font you installed.

            *Note:* if you change the fonts by moving new ones into the
            font directory, this final step is the only one you need to
            do; you don't have to do a full restart each time.

And that's it! You should now be up and running with a typeface of your
choosing - enjoy your reading!

<section class="footnotes">

* * * * *

1.  Thanks to [commenter Craig][] for pointing out this solution.[↩][]

</section>

  [convert them]: http://www.freefontconverter.com/
  [DaFont.com]: http://www.dafont.com/
  [FontSquirrel]: http://www.fontsquirrel.com/
  [Crimson]: http://www.fontsquirrel.com/fonts/Crimson
  [free at DaFont.com]: http://www.dafont.com/search.php?q=liberation+serif
  [Calibre]: http://calibre-ebook.com
  [here]: http://calibre-ebook.com/download
  [1]: #fn1
  [commenter Craig]: #comment-1741
  [↩]: #fn1ret
