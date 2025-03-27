---
title: Downie + Overcast
subtitle: Turning video into podcasts.

date: 2025-03-27T16:42:00-0600

tags:
  - tools

qualifiers:
  audience: |
    macOS and iOS users who listen to podcasts, audiobooks, etc., and who also sometimes watch YouTube videos or the like… and who might want to put those together somehow.

---

For years, I have used the command-line utility `yt-dlp` (previously `youtube-dl`) to download video from various sources (not just YouTube!) as audio streams [^dl] that I then upload using [Overcast][o]’s Uploads feature. This lets me listen to a lot of material otherwise only available in video form—and it turns out that many videos make for perfectly good audio content, especially if the presenter does a good job of making the video “channel” a kind of [progressive enhancement][pe] to the “audio” channel—whether intentionally or otherwise! For example, many good conference talks fit this bill quite nicely.

This is one of Overcast’s few premium features, but I use it so much that this feature alone would be enough to get me to pay the $15/year subscription—never mind the developer’s consistent work to keep it fresh and powerful and even, a decade into its life, adding new features.

[o]: https://overcast.fm/

Recently, I discovered the excellent [Downie][d] app, which does the same thing `yt-dlp` does but in a far, *far* less fussy way. You open a webpage with a video on it in Safari with the Downie extension enabled, or in Downie’s built-in browser view (more on this in a moment), and simply choose what to download:

[d]: https://software.charliemonroe.net/downie/

<figure>

<picture>
<source srcset="https://cdn.chriskrycho.com/images/downie-light.png" media="(prefers-color-scheme: light)" />
<source srcset="https://cdn.chriskrycho.com/images/downie-dark.png" media="(prefers-color-scheme: dark)" />
<img src="https://cdn.chriskrycho.com/images/downie-dark.png" />
</picture>

<figcaption>Downie’s browser pointed at this site’s page for my StaffPlus New York 2024 talk</figcaption>

</figure>

This is handy enough for snagging the regular YouTube video of a conference talk—certainly much *nicer* than doing the same with `yt-dlp` and trying to remember in particular what exact invocation is required to extract audio or trying to sort through the various streams listed in its output.[^cli] The real magic, though, comes in when you want to snag a download from some other site where you may need to be logged in to access the video.

{% note %}

I don’t have piracy in mind here! You could obviously use this for that, but I don’t and I don’t think you should. The only way I am using this is for “context shifting”.

{% endnote %}

For example, I am working through the excellent [Master the Marathon][mtm] course offered (for free!) by [80/20 Endurance][8020]. Many weeks, I have attended the call. Other weeks, I have not been able to, though, but still wanted to catch up on the material. *When better to do that,* I thought the other day, *than on a training run for a marathon?* So I opened Downie, logged into the course, and selected the relevant stream. I told it to save only the audio, and renamed it to something useful, and when it finished, I uploaded it to Overcast, and: boom, multiple weeks that I had missed now in my ears as I ran!

[mtm]: https://www.8020endurance.com/mastering-the-marathon/
[8020]: https://www.8020endurance.com


[^dl]: Bonus: I have also used this as a handy way to archive copies of talks I have given so they aren’t lost if the hosting channel ever decides to pull them.

[^cli]: It turns out that <abbr title="graphical user interface">GUI</abbr>s are nice, and that even those of us who are thoroughly proficient with <abbr title="command line interface">CLI</abbr>s can also profit from <abbr>GUI</abbr>s!
