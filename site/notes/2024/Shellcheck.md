---
title: Shellcheck
subtitle: Your best friend if you have to write shell scripts.
date: 2024-12-19T07:33:00-0700
tags:
    - tools
    - command line tools
    - scripting

summary: >
    If you want your shell scripting to be as bug-free and reliable as possible, use Shellcheck!

image:
    cdn: shellcheck.png

---

Any time I write a shell script, I use [Shellcheck][sc]: a free and open source shell script linter. It catches a *ton* of easy-to-make mistakes and bugs in shell scripts, and has fixes for many of them. If, like me, you only use shell scripts on rare occasions and in very limited ways, this will help you catch the most common mistakes. (When should you escape particulraly characters, and how? What’s that error handling thing you’re supposed to do at the top of a script again? etc.) Even if you are a Bash power user, though, there are edge cases *anyone* might forget, and Shellcheck will have your back.

On macOS, you can get it up and running with `brew install shellcheck`, and there are editor plugins for [Nova][p-nova], [Zed][p-zed] , [<abbr title="Visual Studio">VS</abbr> Code][p-vsc], and no doubt many others.

[sc]: https://www.shellcheck.net
[p-nova]: https://github.com/olly/nova-shellcheck
[p-zed]: https://github.com/d1y/bash.zed
[p-vsc]: https://github.com/vscode-shellcheck/vscode-shellcheck
