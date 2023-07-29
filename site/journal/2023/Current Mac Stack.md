---
title: My Current Mac Stack
subtitle: >
  The software I use every day, with commentary.

tags:
  - Apple
  - software development
  - composition

qualifiers:
  audience: >
    Folks interested in other people’s work environments and the reasons for it; people who care about quality software; other Mac users or Mac-curious types.

date: 2023-07-29T13:20:00-0600
updated: 2023-07-29T13:50:00-0600
updates:
  - at: 2023-07-29T13:50:00-0600
    changes: Added notes about my other tweaks to default Mac settings.

---


## Basics

- Web browsing:
	- **Safari**: the built-in browser is my default. It is fast, lightweight, low on memory usage, and stays out of my way. I even use it to a surprising degree for web development work.
		
		Bonus the major extensions I use for Safari:
		
		- [**Cascadea**](https://cascadea.app) for user styles in Safari. I do not do a *ton* of user style customization, but it makes a huge difference on the dozen or so sites where I do.
		
		- [**Hush**](https://oblador.github.io/hush/): blocks annoying cookie consent forms. The web feels dumb without this.
		
		- [**Save to Pocket**](https://apps.apple.com/us/app/save-to-pocket/id1477385213?mt=12): I use Pocket extensively for [its Kobo integration](https://help.kobo.com/hc/en-us/articles/360017763753-Use-the-Pocket-App-with-your-Kobo-eReader), and this is the main way articles find their way there.
		
		- [**Save to Reader**](https://apps.apple.com/us/app/save-to-reader/id1640236961?mt=12): I use Readwise as my web clipper and note-taking tool (for its integration with everything under the sun).
		
		- [**Noir**](https://noir.travel): automatic “dark mode” for websites. I leave it off by default but turn it on for particularly egregious websites.

	- [**Orion**](https://browser.kagi.com): a nice WebKit-powered alternative to Safari. I sometimes use this as a dedicated view of some development project I am working on, while letting Safari be the home for personal things—or whatever other breakdown happens to make sense on any given day. Even with lots of good tab and session management tools built into the various browsers, it is sometimes nice to just have a clear app-level distinction.

	- **Firefox**: the old standby; I bust it out in the same kind of secondary role I do for Orion, as well as to check cross-engine compatibility.

	- Some variety of Chromium. This rotates around: I have used Brave and Arc and a bunch of others, and I do not love any of them (albeit in different ways and for different reasons).

- [**1Password**](https://1password.com): password management. Still the best tool of its sort out there, though a bunch of costs to its Electronification frustrate me. (Text fields! I just want my text fields to work the way they should!) Bound to <kbd>⌃</kbd><kbd>⎇</kbd><kbd>P</kbd> (“password”).

- [Backblaze](https://secure.backblaze.com/r/01pi7n): cloud backup of my entire system. (That’s an affiliate link: we both get a month free if you use it!)

- **Messages**: most people in my immediate circles are on iOS, or just use basic SMS/MMS for messaging, and I have the built-in app set to integrate with my phone identity, so I actually do *most* of my texting of all varieties from my Mac.

- **Music**: while I am not a fan of the design, it does the job, and no other client I have tried does much better. (I have occasionally been tempted to just build what I want here myself—but there is, I think, not a particularly good market there!)

- [**NetNewsWire**](https://netnewswire.com): my feed reader app, hooked up to [Feedbin](https://feedbin.com).

- [**Things**](https://culturedcode.com/things/): still my to-do app of choice, though given how lightly I use it at this point I could probably drop it and switch to the built-in Reminders app and be fine.

- [**Telegram**](https://www.telegram.org): more messaging. I only use it with a handful of people, but I like it and would be happy to use it more generally.


## System enhancements

- [**Audio Hijack**](https://rogueamoeba.com/audiohijack/): every bit of audio recording I do, and all of my audio streaming for video calls, goes through Audio Hijack (in conjunction with some other Rogue Amoeba audio software).

- [**CleanShot X**](https://cleanshot.com): screen shots and video recording; I have even occasionally recorded a full-on screencast with it.

- [**Dato**](https://sindresorhus.com/dato): an inexpensive (and, critically, one-time-purchase) menu bar calendar integration. Not quite as nice as Fantastical, to be honest, but also a business model which fits my needs much better (I am not “enterprise” it turns out.) Bound to <kbd>⌃</kbd><kbd>⎇</kbd><kbd>C</kbd> (“calendar”).

- [**Finbar**](https://www.roeybiran.com/apps/finbar): The in-app quick-launcher idea coupled with macOS’ long-standing Help menu navigation. It’s *really* good. Bound to <kbd>⌘</kbd><kbd>⇧</kbd><kbd>K</kbd> (since <kbd>⌘</kbd><kbd>K</kbd> itself is commonly used in applications directly for similar functionality).

- [**Loopback**](https://rogueamoeba.com/loopback/): audio routing, like having a mixing board in software. Overkill for most folks, but super useful for me with the external microphone I use and my enjoyment of sometimes playing music into a virtual audio interface easily.

- [**Raycast**](https://www.raycast.com): a launcher in the family of Alfred, Launchbar, Quicksilver, etc., but with a much nicer extensibility model and a much more modern UI. As with the others, this can do a lot more than just launch things: I use it as my clipboard history manager and my “completely delete that app from my system” tool as well. Bound to <kbd>⌘</kbd><kbd>Space</kbd> (replacing Spotlight). The <abbr title="artificial intellicence">AI</abbr> chat integration is a neat idea and is well-implemented (though I am still pretty skeptical of the whole underlying tech).

- [**SoundSource**](https://rogueamoeba.com/soundsource/): another Rogue Amoeba audio tool—I use this for controlling audio levels of different apps, and it’s great. Mostly set-and-forget, but very handy.


## Writing

- [**BBEdit**](https://www.barebones.com/products/bbedit/): text editing, including the majority of my writing.

- [**Obsidian**](https://obsidian.md): note-taking. With regrets. It is an incredibly powerful app, but at the end of the day I do not actually *like* it, because it is such a janky cross-platform mess <abbr>UI</abbr>-wise.[^bear]


## Software development

- [**BBEdit**](https://www.barebones.com/products/bbedit/): also lives here as a secondary tool—every commit message I write goes here, for example, and I do also use it for some secondary tasks.

- [**Dash**](https://kapeli.com/dash): “docset” tool for quick access to API references—I have used this for ages and it is actually pretty hard for me to imagine working without it. Bound to <kbd>⌃</kbd><kbd>⎇</kbd><kbd>D</kbd> for easy access.

- [**Fork**](https://git-fork.com): Mac-native (and Windows-native! They do it right!) graphical Git client. Mostly used for a quick visual view of branch history and for interactively staging changes.

- **Git**: the current industry-standard <abbr title="version control system">VCS</abbr>. I mostly hate it, to be honest, but it gets the job done.

- **Homebrew**: my system-level package manager. It works well for me and stays out of my way. I do not use it to manage per-project dependencies, because I do not hate myself. For that, I use things like `rustup`, [Volta](https://volta.sh), etc.

- [**iTerm2**](https://iterm2.com): terminal. I like it, not love it, but it works well and is mostly fast enough now that I do not feel stymied by it. Side note: speed, for me, is about *typing latency*, not about *throughput*. I still look sideways at Terminal.app on the regular because it is still faster on that axis, but I like having built-in support for split panes, and take advantage of its integration with tmux for work.

- [**Jujutsu**](https://github.com/martinvonz/jj): a new version control system that I seriously hope is the future, because I like it *much* better than Git, and am already using it as the interface to all my personal Git repos.

- [**Kaleidoscope**](https://kaleidoscope.app): my preferred diff and merge tool. Beautiful, Mac-native, and fast.

- [**Nova**](https://nova.app): advanced code editor/lightweight IDE from [Panic](https://panic.com)—my daily driver for software development. Think VS Code but Mac native instead of Electron and *really* good.

- [**Transmit**](https://panic.com/transmit/): my go-to file transfer app, mostly used for uploading images and other such files to Backblaze B2, which I use in conjunction with Cloudflare as a <abbr title="content delivery network">CDN</abbr> for static content on my website.


## Music composition

- [**Dorico**](https://www.steinberg.net/dorico/): for the notation side of composing, which is the *majority* of it for me.

- [**Fission**](https://rogueamoeba.com/fission/): tiny and lightweight audio editor which I mostly use to do super speedy normalization of the mockups I get out of Dorico.

- **Logic Pro**: composing—the mucking around/throwing together things which I will not be notating side; I do not do a lot of that, but it is quite handy when I do.

- [**Meta**](https://www.nightbirdsevolve.com/meta/): for applying mp3 metadata to tracks I create. It has a decent interface and works really well!

- [**NotePerformer**](https://www.noteperformer.com): a musical “interpreter” for playback from Dorico and others—now supercharged by its playback engines, which let it apply the same musical smarts it has always had to sample libraries (which is what got me to actually use it).

- [**Spitfire Audio <abbr>BBC</abbr> Symphony Orchestra Pro**](https://www.spitfireaudio.com/bbc-symphony-orchestra): my primary sample library. Kind of large and heavy, but *really* good!


## Photography

- **Lightroom <abbr title="Creative Cloud">CC</abbr>**: currently my go-to photo editor. As a photo editor it is pretty good. As a photo management tool, I do not love it. As a “wait, you have to be actively connected to the internet to use key functionality like search”, I *hate* it. I am seriously considering switching away later this year. Currently still the home of all my raw photos, though, and the fact that I can just publish the albums is nice for sharing them in a way that people can use to *download* them.

- **Photos**: the built-in app is my other source of truth: all rendered images go here, and this is the primary vehicle I use for sharing images with family. Its editing tools are less capable than Lightroom <abbr title="Creative Cloud">CC</abbr>’s, while its library management tools are fairly comparable (good and bad in different ways), but all of those capabilities *work offline*, as they should.


## Miscellaneous

- [**Discord**](https://discord.com): mostly used for open source development communities and our <abbr title="Dungeons & Dragons">D&D</abbr> group.

- [**Flighty**](https://www.flightyapp.com): for tracking flights for travel. A *great* dedicated app. Simple-seeming but deep.

- [**Freedom**](https://freedom.to): productivity hack in the form of “block my access to distractions”. Paid for a lifetime license years ago and make consistent use of it, especially when composing.

- **iZotope RX 9**: incredibly good audio post-processing software, which I mostly use for its best-in-class denoiser.

- [**KeyCastr**](https://github.com/keycastr/keycastr): for showing my keyboard and mouse input when screen sharing or recording a screencast.

- [**Parcel**](https://parcelapp.net): for tracking packages. Does one thing super well.

- [**Slack**](https://slack.com): mostly for work, also for the [Mere Orthodoxy](https://mereorthodoxy.com) writers’ room.

- [**Tadam**](https://www.tadamapp.com): pomodoro timer app—purchased years ago, used constantly when I am unfocused and having a hard time getting things done.

- [**Unite**](https://www.bzgapps.com/unite): handy little utility for making dedicated “apps” out of web pages using WebKit (as I have for Strava, TrainingPeaks, Garmin Connect, [Glass](https://glass.photo), YNAB, my bank, and more). Will probably be replaced by Safari’s forthcoming capability once I upgrade to Sonoma.


## Bonus: other tweaks

I find macOS *way* nicer to use by enabling the following settings/tweaks in the **Settings** app:

- **Appearance:** set **Show scroll bars** to **Always**.

- **Accessibility** > **Pointer Control** > **Trackpad Options** > **Use for trackpad for dragging**, with **Dragging style** set to **Three Finger Drag**

- In **Accessibility** > **Display**, enable:
    - **Reduce transparency** (YMMV; I prefer it this way)
    - **Show window title icons**
    - **Show toolbar button shapes**

- **Keyboard** > **Keyboard Shortcuts** > **Modifier Keys**: set Caps Lock to act as Ctrl and vice versa



[^bear]: I would *like* my tool for this to be [Bear](https://bear.app), but Bear’s vehement rejection of folders and insistence that there be only one way of taxonomizing one’s notes combines with its insistence on keeping everything in a bespoke SQLite database and 
