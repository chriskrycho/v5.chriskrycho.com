---
title: Supernote, Dropbox, and Transmit
subtitle: >
  A handy little flow for getting documents onto and off of the SuperNote via Dropbox… without having Dropbox installed locally.
tags:
  - working effectively
  - note-taking
  - macOS
qualifiers:
  audience: >
    macOS users who have or are interested in [Supernote](https://supernote.com), don’t want to use Supernote’s China-based sync service, and also don’t have *or want* Dropbox on their local system. (Bonus: works just dandy with [reMarkable 2](https://remarkable.com) as well.)
date: 2022-12-12T20:35:00-0700
image: https://cdn.chriskrycho.com/file/chriskrycho-com/images/droplet.png
summary: >
  I have a Supernote A5X but no desire to use Supernote Cloud, and a Dropbox account but no desire to have Dropbox on my machine… so it’s good that I also have a copy of Panic’s Transmit app.

---

I picked up a [Supernote A5X](https://supernote.com/collections/devices/products/supernote) late this spring, interested in using it for note-taking, paper-reading-and-annotating, and more. I may have more to say about the device itself at some point in the future. For today, I just want to share a handy little workflow I put together for getting <abbr title="portable document format">PDF</abbr>s and other such documents and materials onto the Supernote.

However, I am not a huge fan of data services which run through Chinese data servers—to put it mildly!—so using Ratta’s Supernote Cloud service was a non-starter for me. (The Ratta folks themselves seem to be 100% above-board; but there is no company in the world which manages to say “no” when the Chinese government comes knocking on the door of their servers.) Supernote has a perfectly solid story for transferring docs via physical cable, via the partner app and a WiFi connection, or via third-party apps like Dropbox.

I decided after only a little consideration that I would prefer to get documents onto the device as easily as possible using a relatively standard “cloud service” flow, even if Supernote Cloud wasn’t option. I have had a Dropbox account for a *very* long time, and have no interest in trying out *other* cloud drive services. But I also don’t love Dropbox and uninstalled it from my system many years ago: I consistently found it to be a very poor and untrustworthy citizen of my file system.

The web upload UI for Dropbox is, of course, *fine* for this purpose. But I don’t love it. I really just want to be able to take a downloaded <abbr>PDF</abbr>—say, a <abbr title="computer science">CS</abbr> paper I’m reading—and just upload it to Dropbox *without* opening the web <abbr title="user interface">UI</abbr>, just as conveniently as if I *did* have Dropbox installed.

I haven’t quite gotten it to be *that* easy, but I got really, really close: it turns out [Panic](https://panic.com)’s fantastic app [Transmit](https://panic.com/transmit/) has a Dropbox <abbr title="application programming interface">API</abbr> integration, because *of course it does*. (It also supports <abbr title="secure file transfer protocol">SFTP</abbr>, S3, Backblaze, Google Drive, OneDrive, and plenty of others. It does *everything.*) Transmit *also* has a handy little feature called [Droplets](https://help.panic.com/transmit/transmit5/servers/#creating-droplets):

> A droplet is a small application icon onto which you can drop files and folders. The droplet then opens Transmit and automatically uploads the dropped items to the location configured in the droplet.
>
> Droplets are a convenient way for non-technical users to upload files to a pre-set location.

Well, I’m a fairly technical user, but this also has something *else* going for it: considerable convenience! I created a Droplet targeting the Dropbox folder I made for unread items on my Supernote, so now all I have to do is drop a <abbr>PDF</abbr> onto the Droplet “application” I created and the document goes straight to that folder. The next time I sync my Supernote, the document is there.

Hope this is helpful to the 7 of you out there with a similar workflow and similar compunctions about various cloud services![^aa]



[^aa]: This is, after all, what [Assumed Audiences](https://v4.chriskrycho.com/2018/assumed-audiences.html) are for.