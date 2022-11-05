---
title: Organizing Many Software Projects
subtitle: >
  How I lay out my file system and how I tweak Git for working on literally dozens of different repositories.
date: 2022-11-04T21:05:00-0600
tags:
  - software development
  - working effectively
  - Git
qualifiers:
  audience: >
    Other software developers who work on more than one or two software projects at a time.

---

Yesterday, a colleague who is dipping his toes into more open source work asked how I approach the sheer organizational challenge of working on both LinkedIn and open source projects. That is a real challenge! At any given time, I will have dozens of repositories checked out on my personal *or* my work laptops. (At the time of writing, for example, I have 63 separate repos checked out on my personal laptop!) I also generally commit to open source projects with my personal email but *must* commit to internal projects with my work email.[^pgp]

I long ago made this more tractable by making two tweaks to my working setup:

## 1. Folder organization

I put all my repositories in a folder in my home directory, which I name `dev` by convention.[^name] Within that directory, though, I do *not* have 63 separate projects all in a jumble. Instead, I organize them by the “organization” they come from—in the case of GitHub or GitLab, literally the “organization” or “group” respectively; in the case of LinkedIn, LinkedIn itself. That means my layout on disk looks something like this right now (showing just a tiny subset):

```
~/
  dev/
    chriskrycho/
      v5.chriskrycho.com/
      ember-async-data/
    DefinitelyTyped/
      DefinitelyTyped/
    ember.js/
      emberjs/
      rfcs/
    linkedin/
      flagship-web/
      i18n/
      tracked-queue/
    microsoft/
      DefinitelyTyped-tools
      TypeScript/
    true-myth/
      true-myth/
```

This means that I still have a *lot* of top-level folders: on my personal machine, I have projects checked out from 29 different organizations/groups. However, that’s a lot fewer than 63! Also, it means related code tends to live together, which I also find helpful for navigating around. As a practical example: there are a handful of key [Ember](https://emberjs.com) projects which live in the broader [Ember.js org on GitHub](https://github.com/emberjs), rather than part of the [Ember monorepo](https://github.com/emberjs/ember.js). When I’m working on those things, they are literally right next to each other in the file system, and that’s quite useful.

Add in tools like [the GitHub `gh` <abbr title="command line interface">CLI</abbr> tool](https://github.com/cli/cli) tool, and cloning new repos by org becomes *incredibly* easy. To get my blog, for example, I just `cd` into `~/dev` and then:

```sh
gh repo clone chriskrycho/v5.chriskrycho.com  chriskrycho/v5.chriskrycho.com
```

Whether or not `~/dev/chriskrycho` exists yet, that will “just work”, which is great.

[^name]: My job is not one where I am apt to confuse `~/dev` with `/dev`, but if I hadn’t established this convention long before I even *knew* about `/dev` I would probably use `~/code` instead, so that’s what I recommend if you’re setting this up for the first time!


## 2. Git config tweaks

Git’s [config system][config] allows you to [specify other files to include][include]: unconditionally with an `[include]` section, [conditionally][cond] with an `[includeIf]` section. The `[includeIf]` section allows you to choose whether to use the included additional config based on the directory a Git repo lives in, the name of the branch a repo has checked out, or whether a given remote is matched.

[config]: https://git-scm.com/docs/git-config
[include]: https://git-scm.com/docs/git-config#_includes
[cond]: https://git-scm.com/docs/git-config#_conditional_includes

I *could* use the `remote` config to make sure I always use my LinkedIn details for internal projects, but given the folder organization I chose above, I have an even easier solution: I just use the Git repo location flag instead. I just check whether the project is in `~/dev/linkedin`:

```toml
[includeIf "gitdir:~/dev/linkedin"]
  path = .gitconfig-li
```

That file itself is *super* lightweight: it just contains a different `[user]` section, to override the bits which I use for all my public work:

```toml
[user]
    email = ckrycho@linkedin.com
    signingkey = <key ID>
```

With that in place on top of the folder organization, I don’t really have to think about managing my repos that much.


[^pgp]: This also goes, by necessary implication, for my <abbr title="Pretty Good Privacy">PGP</abbr> keys: they are tied to email address.