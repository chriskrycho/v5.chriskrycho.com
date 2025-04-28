---
title: The Git “Invalid username or password” error
subtitle: >
  Spoilers: If you’re me, it’s probably your personal access token.

date: 2025-04-28T07:07:00-0600

qualifiers:
  audience: |
    People who use Git (or Jujutsu with colocated repos) for version control and have seen `Invalid username or password`. (Read: Likely mostly just future me!)

tags:
  - Git
  - version control
  - Jujutsu
  - software development
  - tools

---

Yesterday two things happened, and it took me an annoyingly long time to connect them:

- My [personal access token][pat] for GitHub expired.

- Trying to `git push` (including `jj git push`) from my machine stopped working, with this error:

    ```
    Invalid username or password.
    ```

These two things came together because as a rule, I use personal access tokens managed via [1Password’s shell integration][op] with [the GitHub <abbr>CLI</abbr>, `gh`][gh], using a `[credential]` setting in my `.gitconfig`:

```
[credential "https://github.com"]
      helper = 
      helper = !/opt/homebrew/bin/op plugin run -- gh auth git-credential
```

This means that if my personal access token has expired, I cannot `git push`, whether as a subprocess launched by `jj` for Git interop or directly from Git. I’ll see the error above. Normally, I regenerate the token when I see the email notice, but I was busy this weekend and didn’t get to it, and was thus confused when I went to publish [my note on `mise`][mise-note] yesterday evening. It took an embarrassingly long time to realize what the problem is. But now I’ve written this down for myself so (a) I will probably remember in the future and (b) if I don’t, this post will hopefully show up in the results when I go searching.

[pat]: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens
[op]: https://developer.1password.com/docs/cli/shell-plugins/github/
[gh]: https://cli.github.com
[mise-note]: https://v5.chriskrycho.com/notes/using-mise-en-place-for-dotfiles/