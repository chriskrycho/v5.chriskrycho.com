Title: YouTube Video Name trick
Date: 2013-05-18 22:10
Author: chriskrycho
Category: Posts
Tags: link structure, queries, sharing, social media, tricks, YouTube
Slug: youtube-video-name-trick

I discovered a fascinating, brilliant trick you can use with any YouTube
video name string while talking with [Stephen Carradini][] yesterday. I
shared a Doctor Who clip ([this one][], if you're curious), and it took
him a bit to get around to watching it because the URL didn't exactly
make it particularly clear what video I had sent him:

    http://www.youtube.com/watch?v=LakwV3P3qII

We started talking about how YouTube should tag the name onto the end of
the link, so that people could actually tell what video they were going
to see, and Stephen posted an example of how it could work:

    http://www.youtube.com/watch?v=LakwV3P3qII_drwhoblink

Lo and behold: *that link works*. I got curious and started poking
around at different videos on YouTube and quickly discovered that you
can append whatever text you want after the video ID; you'll end up at
the base URL again. All of YouTube's link IDs are 10 character strings,
with some mix of letters, numbers, and underscores allowed. Everything
after the tenth character gets stripped. (*Almost* everything, that
is...)

That's halfway to [fantastic][] -- but only halfway because, as noted,
you just get pushed down to that stripped URL. Thus, when I clicked on
Stephen's link, it truncated back down to the original link I sent him.
Fine and good for one person, but what if you wanted to re-share it? The
link has been changed, so you'd have to go back to where I originally
shared it with you, or you'd have to add it on yourself.

Knowing a whee little bit about how these things tend to work,^[1][]^ I
wondered what happens if you use an `&` to tell YouTube that you want to
add something to the query you're sending it.^[2][]^ As I suspected,
YouTube hangs onto that. Most likely, there are other queries that
include more than just the video name -- things like content source --
so those parts get left in. In our case, that means that we can add a
string to the link and it will be there for others to use if they want
to reshare the video themselves.

Anybody who curiously hovered over (or clicked to) the Doctor Who video
I referenced at the start of the post went to this link:

    http://www.youtube.com/watch?v=LakwV3P3qII&name=DoctorWhoWibblyWobblySpeech

It's like magic! You can see what the video is about, and even when you
click the link, you still have the name of the video to share with all
your friends!

And there ends your lesson in cool tricks with YouTube for the day,
kids.

<div class="footnotes">

* * * * *

1.  For the technically inclined (before you run away, note that
    footnote 2 is for those who are *not* technically inclined --
    confusing, I know): it looks like it's probably a straightforward
    hashing algorithm designed to produce 10-character strings in
    whatever subset of ASCII the YouTube engineers settled on. Because
    of that, they can safely ignore everything after the tenth
    character: every single YouTube video has the same length ID. Your
    video could be named "Joe" or "John Jacob Jingleheimer Schmidt" and
    the result would be a ten-character string. This is quite smart: it
    prevents intersections between video names (*your* video named "Joe"
    ends up having a different string than *my* video named "Joe"
    because of how the hashing algorithm works), and it means that
    YouTube video links are never all that long. [↩][]
2.  For the not-so-technically minded: in other words, the string at the
    end of the website tag is a question: Can I watch the video
    (`watch?v`) you know by *this* name (`={10 character string}`)? You
    can tell websites you want to ask another question at the same time
    by adding an ampersand character to it and extending the
    string. [↩][3]

</div>

  [Stephen Carradini]: http://stephencarradini.com
  [this one]: http://www.youtube.com/watch?v=LakwV3P3qII&name=DoctorWhoWibblyWobblySpeech
  [fantastic]: http://www.youtube.com/watch?v=rX2RKJIkwYw&name=DoctorWho_Fantastic
  [1]: #fn:1
  [2]: #fn:2
  [↩]: #fnref:1
  [3]: #fnref:2
