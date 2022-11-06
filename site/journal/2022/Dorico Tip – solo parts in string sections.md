---
title: >
    Dorico Tip: Solo Parts in String Sections
subtitle: >
    This was a bit subtle, so I'm writing it down for myself in the future (and maybe others, too!).
tags:
    - music
    - composing
    - Dorico
date: 2022-11-06T09:40-0700
qualifiers:
    audience: >
        Other composers working with Dorico.

---

I'm working on a bit of orchestration where, briefly, both of the first chair violins play solo lines and the rest of the sections are totally silent. I want to notate this the way Elaine Gould describes in <cite>Behind Bars</cite>:

> Individual players are labelled *solo* or *player: 1 solo*, *2 solo*, (or *solo 1*, *solo 2*) or *player 1*, *player 2*, etc.
> 
> Two or more solo players together are marked *2 soli*, *3 soli*, etc., or *2 players*, *3 players*, etc.
> 
> ![](https://cdn.chriskrycho.com/file/chriskrycho-com/images/2022/music%20notation/Behind%20Bars%20p.%20429.png "image from Behind Bars p. 429")
> 
> …
> 
> Tutti ('all') indicates that the whole section should play together after one or more players has been silent:
> 
> ![](https://cdn.chriskrycho.com/file/chriskrycho-com/images/2022/music%20notation/Behind%20Bars%20p.%20430a.png "image from Behind Bars p. 430")
> 
> *Unis.* indicates that the whole section should play together after a division of either equal lines or *soli* + *gli altri* (see next example).
> 
> Where one or more players has been silent and the rest of the section divided, a return to a single line requires a tutti as well as a *unis.* instruction:
> 
> ![](https://cdn.chriskrycho.com/file/chriskrycho-com/images/2022/music%20notation/Behind%20Bars%20p.%20430b.png "image from Behind Bars p. 430")

[Dorico][d] does this easily enough, but it wasn't obvious to me how to do it—the excellent and extensive Dorico [documentation][dd] has enough info to figure it out, but it doesn’t cover this specific example. (Covering every possible variation would be an impossible burden!) The key is to use its *divisi* feature and introduce *only* a solo instrument for the new divisi.

[d]: https://www.steinberg.net/dorico/
[dd]: https://steinberg.help/dorico_pro/v4/en/dorico/topics/notation_reference/notation_reference_divisi/notation_reference_divisi_c.html

1. Add a new *divisi* section where you want the solo to start, with **Edit** > **Notations** > **Staff*** > **Change Divisi** (or trigger the [Jump Bar][j] and type “Change Divisi”).

2. Click the **Add Solo Division** button.

3. Select the “gli altri” division Dorico automatically adds, and delete it.

4. Click the **OK** button to save the change.

5. Select the bar where you want to end the solo/return to section play. Select **Edit** > **Notations** > **Staff** > **Restore Unison** (or trigger the the Jump Bar and type “Restore Unison”).

The result will be formatted just as Gould shows, at least for a single soloist out of the section. I’ve yet to work out how to get some of the *other* variants she shows to work with the *divisi* notation tools in Dorico, but I expect it’s possible.

[j]: https://steinberg.help/dorico_pro/v4/en/dorico/topics/user_interface/user_interface_jump_bar_r.html

---

The other thing you might want to do is get your sample library to automatically change instruments. As of Dorico 4.2, this doesn’t happen automatically, and I’m still figuring out the best way to do it. If I get that worked out to my satisfaction, I will write a follow-up post and link it here!



