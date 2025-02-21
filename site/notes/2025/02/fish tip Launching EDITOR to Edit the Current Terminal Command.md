---
title: >
    fish tip: Launching `$EDITOR` to Edit the Current Terminal Command
subtitle: Something I end up doing surprisingnly often!

date: 2025-02-20T21:16:00-0700

qualifiers:
  audience: |
    People who use the terminal on the regular.

tags:
    - software development
    - tools

---

On macOS when using [fish shell][fish], you can launch whatever is bound as your `EDITOR` command with whatever you have typed as your current command by triggering <kbd>Meta</kbd><kbd>E</kbd>. If you have set your editor to use <kbd>Option⎇</kbd> as <kbd>Meta</kbd> (and you should!) this means you just have to hit <kbd>⎇</kbd><kbd>E</kbd> to edit the current command before sending it.

This works in both Terminal and iTerm2, and I assume other editors as well but I have not tested it. I *think* this is a fish-ism, because it does not work in bash or zsh on my machine.

One of the big places I end up doing this is when writing a commit message: I might start thinking it is a one-liner, and then realize I want to add some context, and *don’t* want to think about manual line-wrapping to match [the usual commit message guidelines][lines]. So I’ll just hit <kbd>⎇</kbd><kbd>E</kbd> to pop up BBEdit, edit it *there*, using its handy line-wrapping tools, and then save and close it. That drops me back into the terminal with whatever edits I have made.

This will use whatever you have `$EDITOR` set to, and it’s probably important to use whatever the “wait to return” flag is for your editor of choice—usually `-`/`--wait`.

Also handy when you realize you want to build up a multiline command with `\`s separating each line and are concerned about accidentally hitting <kbd>Return ⤶</kbd> along the way!

[fish]: https://fishshell.com
[lines]: https://stackoverflow.com/questions/2290016/git-commit-messages-50-72-formatting 