---
title: Finding where an environment variable came from in fish
subtitle: |
    Because I often wonder this, and because fish makes it easy, and because writing it down here might help you and will definitely help me remember it!

date: 2026-09-29T10:40:00-0600

tags:
    - software development
    - things I learned

qualifiers:
    audience: |
        Other software developers who use [fish shell](https://fishshell.com).

---

Last night, I was trying to figure out where a particular environment variable had come from, and went searching[^ask] for a way to figure that out. I was delighted, as I often am, to find that fish makes it incredibly easy. If you want to know where and how `SOME_ENVIRONMENT_VARIABLE` was set, you just type:

```fish
$ set --show SOME_ENVIRONMENT_VARIABLE
```

Fish will helpfully print out something like this (assuming `SOME_ENVIRONMENT_VARIABLE` was set to the string `cool-beans`, and was set with `set -Ux SOME_ENVIRONMENT_VARIABLE cool-beans`):

```fish
$SOME_ENVIRONMENT_VARIABLE: set in universal scope, exported, with 1 elements
$SOME_ENVIRONMENT_VARIABLE[1]: |cool-beans|
```

This is one of those things that feels obvious once you first see it in action, and yet…

As far as I know—and I’d be happy to be informed otherwise, and will update this if someone tells me otherwise—there’s no *good* way to do this in bash or zsh! Indeed, fish only got this capability a few years ago (in 3.6.0). You can read more in [the fish docs][docs].

[docs]: https://fishshell.com/docs/current/cmds/set.html#:~:text=With%20%2D%2Dshow%2C%20set,values%20and%20options.



[^ask]: I used [Kagi][k]’s [`?`-triggered Quick Answer][qa] feature to have it run a search query in <abbr>LLM</abbr> mode, which I often find to be the most effective way of searching these days. Kagi in turn sourced that info from [the Unix StackExchange][use], which I clicked into and upvoted both question and answer.

[k]: https://kagi.com
[qa]: https://help.kagi.com/kagi/ai/quick-answer.html#:~:text=If%20you%20add,results%20have%20loaded.
[use]: https://unix.stackexchange.com/questions/749171/where-a-variable-inherit-from-fishshell
