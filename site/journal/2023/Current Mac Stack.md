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

started: 2023-07-29T07:30:00 # todo: make this first-class!
draft: true

---




My current “stack” on macOS:

## Basics

- Web browsing:
	- Safari: the built-in browser is my default. It is fast, lightweight, low on memory usage, and stays out of my way. I even use it to a surprising degree for web development work.
		
		Bonus the major extensions I use for Safari:
		
		- [Cascadea](TODO) for user styles in Safari. I do not do a *ton* of user style customization, but it makes a huge difference on the dozen or so sites where I do.
		
		- [Hush](TODO)
		
		- [Save to Pocket](TODO)
		
		- [Readwise](TODO)
		
		- [Noir](TODO)

	- Orion: a nice WebKit-powered alternative to Safari. I sometimes use this as a dedicated view of some development project I am working on, while letting Safari be the home for personal things—or whatever other breakdown happens to make sense on any given day. Even with lots of good tab and session management tools built into the various browsers, it is sometimes nice to just have a clear app-level distinction.

	- Firefox: the old standby; I bust it out in the same kind of secondary role I do for Orion, as well as to check cross-engine compatibility.

	- some kind of Chromium. This rotates around: I have used Brave and Arc and a bunch of others, and I do not love any of them (albeit in different ways and for different reasons).

- 1Password: password management. Still the best tool of its sort out there, though a bunch of costs to its Electronification frustrate me. (Text fields! I just want my text fields to work the way they should!) Bound to <kbd>⌃</kbd><kbd>⎇</kbd><kbd>P</kbd> (“password”).

- Backblaze: cloud backup of my entire system.

- Messages: most people in my immediate circles are on iOS, or just use basic SMS/MMS for messaging, and I have the built-in app set to integrate with my phone identity, so I actually do *most* of my texting of all varieties from my Mac.

- Music: while I am not a fan of the design, it does the job, and no other client I have tried does much better. (I have occasionally been tempted to just build what I want here myself—but there is, I think, not a particularly good market there!)

- [NetNewsWire](TODO): my feed reader app, hooked up to [Feedbin](TODO).

- Things: still my to-do app of choice, though given how lightly I use it at this point I could probably drop it and switch to the built-in Reminders app and be fine.

- Telegram: more messaging. I only use it with a handful of people, but I like it and would be happy to use it more generally.

## System enhancements

- Audio Hijack

- CleanShot X

- [Dato](TODO): an inexpensive (and, critically, one-time-purchase) menu bar calendar integration. Not quite as nice as Fantastical, to be honest, but also a business model which fits my needs much better (I am not “enterprise” it turns out.) Bound to <kbd>⌃</kbd><kbd>⎇</kbd><kbd>C</kbd> (“calendar”).

- Finbar: ==TODO== Bound to <kbd>⌘</kbd><kbd>⇧</kbd><kbd>K</kbd> (since <kbd>⌘</kbd><kbd>K</kbd> itself is commonly used in applications directly for similar functionality).

- Raycast: a launcher in the family of Alfred, Launchbar, Quicksilver, etc., but with a much nicer extensibility model and a much more modern UI. As with the others, this can do a lot more than just launch things: I use it as my clipboard history manager and my “completely delete that app from my system” tool as well. Bound to <kbd>⌘</kbd><kbd>Space</kbd> (replacing Spotlight).

- SoundSource


## Writing

- BBEdit: text editing, including the majority of my writing.

- Obsidian: note-taking. With regrets. It is an incredibly powerful app, but at the end of the day I do not actually *like* it, because it is such a janky cross-platform mess <abbr>UI</abbr>-wise.


## Software development

- BBEdit: also lives here as a secondary tool—every commit message I write goes here, for example, and I do also use it for some secondary tasks.

- Dash: “docset” tool for quick access to API references—I have used this for ages and it is actually pretty hard for me to imagine working without it. Bound to <kbd>⌃</kbd><kbd>⎇</kbd><kbd>D</kbd> for easy access.

- Fork: Mac-native (and Windows-native! They do it right!) graphical Git client. Mostly used for a quick visual view of branch history and for interactively staging changes.

- Git

- Homebrew: my system-level package manager. It works well for me and stays out of my way. I do not use it to manage per-project dependencies, because I do not hate myself. For that, I use things like `rustup`, [Volta](TODO), etc.

- iTerm2: terminal. I like it, not love it, but it works well and is mostly fast enough that I do not notice it. (Side note: speed, for me, is about *typing latency*, not about *throughput*.)

- Jujutsu

- [Kaleidoscope](TODO)

- Nova: advanced text editor/lightweight IDE—my daily driver for software development. Think VS Code but Mac native instead of Electron and *really* good.

- Transmit

- Xcode


## Music composition

- Dorico: composing—the notation side, but that is the *majority* of it for me.

- Logic Pro: composing—the mucking around/throwing together things which I will not be notating side; I do not do a lot of that, but it is quite handy when I do.

- NotePerformer: a musical “interpreter” for playback from Dorico and others—now supercharged by its playback engines, which let it apply the same musical smarts it has always had to sample libraries (which is what got me to actually use it).

- Spitfire Audio <abbr>BBC</abbr> Symphony Orchestra Pro: my primary sample library. Kind of large and heavy, but *really* good!

- Meta: for applying mp3 metadata to tracks I create. It has a decent interface and works really well!


## Photography

- Lightroom <abbr>CC</abbr>: currently my go-to photo editor. As a photo editor it is pretty good. As a photo management tool, I do not love it. As a “wait, you have to be actively connected to the internet to use key functionality like search”, I *hate* it. I am seriously considering switching away later this year. Currently still the home of all my raw photos, though, and the fact that I can just publish the albums is nice for sharing them in a way that people can use to *download* them.

- Photos: the built-in app is my other source of truth: all rendered images go here, and this is the primary vehicle I use for sharing images with family.


## Miscellaneous

- Discord

- Freedom

- Flighty

- iZotope RX 9

- KeyCastr

- Parcel

- Slack

- Tadam

- Unite
