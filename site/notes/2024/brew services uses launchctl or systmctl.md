---
title: brew services uses launchctl or systmctl
date: 2024-12-02T07:45:00-0700
tags:
    - software development
    - macOS
    - command line tools

---

I just installed [atuin][a] to try it out as I do my work this week, and when `brew install atuin` finished, it came with a note I had not seen before:

[a]: https://atuin.sh

```
To start atuin now and restart at login:
  brew services start atuin
```

My immediate reaction was *What the heck is `brew services`?* It’s pretty much exactly what I expected:

> Manage background services with macOS' launchctl(1) daemon manager or Linux's
systemctl(1) service manager.

These seem to be scoped to `homebrew.mxcl`, so any activated services will be . Notably, `brew services` clearly also has some layer sitting on top of `launchctl` (and presumably `systemctl` on Linux): `brew services list` will show services that are not listed by `launchctl list`.
