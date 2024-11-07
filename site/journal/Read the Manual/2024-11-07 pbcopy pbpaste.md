---
title: "Read the Manual: pbcopy and pbpaste"
tool: "pbcopy, pbpaste"
date: 2024-11-07T11:40:00-0700
subtitle: >
    Two of my favorite command line tools: copy and paste to the macOS clipboard. (Actually to one of… several clipboards?)

---

In today’s Read the Manual, we’ll look at two of my favorite macOS CLI tools, `pbcopy` and `pbpaste`. Why both? Because `man pbcopy` and `man pbpaste` launch the same manual page: together they “provide copying and pasting to the pasteboard (the Clipboard) from command line”.

- `pbcopy` takes whatever is on standard input—whether you pipe it there or type it in—and puts it on “the specified pasteboard”, by default the “general” pasteboard. It copies as plain text by default unless it’s Encapsulated PostScript (EPS) or Rich Text Format (RTF).

- `pbpaste` pops whatever is on the specified pasteboard and puts it on standard output—if and only if the pasteboard has plain text, EPS, or RTF available. Otherwise, it’s “produces no output”.

I use these multiple times every day. It’s a super handy way of getting the contents of a file into my clipboard—if I don’t have the file open already in a text editor, I can `pbcopy < path/to/the-file` and then paste it (a chat, a Gist, a text editor, etc.) with OS shortcuts.

The two things I did *not* know about this before reading the manual were:

- That it supports EPS and RTF as well as plain text.
- That it supports rendering to multiple pasteboards.

The latter in part because I only vaguely knew that macOS *had* multiple pasteboards.

The man page ends with a See Also referencing pages in “ADC Reference Library”: “Cocoa > Interapplication Communication > Copying and Pasting”. In theory it should still be online, just [archived][archive] In practice, this document is nowhere to be found. Worse, when you go looking for docs in Apple’s *current* API docs, the result is… mixed. Hey, [there’s a `Pasteboard` class][pasteboard]! Spoilers: there’s absolutely nothing there. It literally just has the declaration of the class itself. Otherwise: a blank page.

[archive]: https://developer.apple.com/library/archive/navigation/index.html
[pasteboard]: https://developer.apple.com/documentation/applicationservices/pasteboard/

There *are* other docs (e.g. for Core Transferable), which is great, but those old docs had something Apple’s current approach does not—a way to understand not just the APIs but the system, including the operating system and its view of the world, the *why* behind the APIs. Net, there’s no good way from the man page, and no easy way in Apple’s docs, to figure out what the other pasteboards besides `general` are for. Their names (`ruler`, `find`, and `font`) don’t tell me much, unfortunately!

Still, I learned something today, and I hope you did too.
