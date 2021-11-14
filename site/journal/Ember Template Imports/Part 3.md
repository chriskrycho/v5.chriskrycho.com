---
title: >
  Ember.js Template Imports: Part 3
subtitle: >
  Evaluating the tradeoffs of template language designs for *tooling*.
series:
  part: 3
image: https://cdn.chriskrycho.com/file/chriskrycho-com/images/template-imports/part-3-table.png
date: 2021-11-09T16:50:00-0700
updated: 2021-11-14T15:45:00-0700
updates:
  - at: 2021-11-12T15:35:00-0700
    changes: >
      Added [a section](#server-side) on server-side use of `hbs`.
  - at: 2021-11-13T10:30:00-0700
    changes: >
      Updated [that same new section](#server-side) to reflect a *serious* miss on my part—how scoping completely fails there.
  - at: 2021-11-14T15:45:00-0700
    changes: >
      Extended the discussion around language servers to include comments on interop with the existing TypeScript Language Service.
templateEngineOverride: md

---

In this, the third of a planned five-part [series][series] on Ember’s *template imports*, I am digging into the implications of each of the designs for ecosystem tooling. Previously:

- [Part 1][p1]: <i>Introducing the series and walking through the formats.</i>
- [Part 2][p2]: <i>Which template imports design has the biggest set of wins for teaching and understanding components?</i>

[series]: https://v5.chriskrycho.com/journal/ember-template-imports/
[p1]: https://v5.chriskrycho.com/journal/ember-template-imports/part-1/
[p2]: https://v5.chriskrycho.com/journal/ember-template-imports/part-2/

Recall from those posts that there are four basic formats under discussion:

- `<template>` tags with a custom file extension (currently `.gjs` and `.gts`)
- template literals using an `hbs` literal
- something like Svelte’s and Vue’s SFC format
- an imports-only extension of the current format

<section class="note" aria-label="Note">

In those previous posts, I said Part 3 was going to be about **Scaling**. However, I think it’s more useful to talk about **Tooling** here. As I have kept working on this series, I’m not actually persuaded that there are particularly meaningful differences between these approaches for scaling codebases which aren’t subsumed in the other topics—especially teaching and testing. So: tooling it is!

</section>

- [Overview](#overview)
- [Syntax](#syntax)
- [Lint tooling](#lint-tooling)
- [Formatter tooling](#formatter-tooling)
- [Language server tooling](#language-server-tooling)
- [Server-side](#server-side)
- [Summary](#summary)

## Overview

There are (at least) five broad categories to consider in evaluating the impact of these formats in terms of tooling:[^categories]

- basic editor integration, e.g. syntax highlighting, code folding, etc.
- lint tooling, e.g. [ESLint][eslint] and [ember-template-lint][etl] support
- formatter support, e.g. [Prettier][prettier] integration
- language server tooling, including [<abbr title="ember language server">ELS</abbr>][els] and [Glint][glint], and interactions with existing TypeScript support
- running the components in a server-side context like [Fastboot][fastboot]

(Notice that TypeScript support cuts across several of these in various ways, but is most pronounced in the final point.)

Spoilers for this post: there aren’t actually any *great* outcomes here, my preferred `<template>` included. All of them have pretty significant downsides. The “good news” is that the same thing is true for the formats chosen by Vue and Svelte, and that hasn’t been a serious hindrance to either of them. The problem is tractable for us, too—but it’s probably *not* tractable unless we pick one format and commit to it, simply because there *is* a lot of work to be done and we are a fairly small community.

<aside>

React also has a custom syntax extension, but has had support for it built natively into the single two highest impact tools for web developers over the last half decade: the TypeScript Language Service and Visual Studio Code. I strongly suspect *all* the non-React tool maintainers wish that system were pluggable! For the sake of this particular post, I take the _status quo_ as a given, though. It hasn’t changed in the last half decade, and I don’t expect it to any time soon.

</aside>

[eslint]: https://eslint.org
[etl]: https://github.com/ember-template-lint/ember-template-lint
[prettier]: https://prettier.io
[els]: https://github.com/suchitadoshi1987/ember-language-server
[Glint]: https://github.com/typed-ember/glint
[fastboot]: https://github.com/ember-fastboot/ember-cli-fastboot

[^categories]: I provide *examples* here in terms of things like ESLint and Prettier, but it’s important to recognize that these are *categorical* costs. If we choose at some point to switch our linting over to something like [RSLint][rslint] for the sake of its speed, we would have to pay any costs associated with a given format there as well.

[rslint]: https://github.com/rslint/rslint


## Syntax

There already exists a *basic* degree of support for all of these formats in terms of syntax highlighting and and code folding—albeit with some important caveats.

- The imports-only format “works” in all editors I have tried, but without any JS-specific formatting for the imports section. It is simply presented as plain text.

- SFCs get syntax highlighting “out of the box” by VS Code if you use a `.hbs` extension, which makes sense: the Handlebars syntax highlighting is an extension of basic <abbr title="HyperText Markup Language">HTML</abbr> highlighting, and VS Code’s <abbr>HTML</abbr> highlighter has built-in support for embedded langauges in `<script>` and `<style>` tags. Other editors—including Vim, Sublime Text, and IntelliJ—generally work similarly here, and for the same reason.

- Both`hbs` and `<template>` have at least some degree of syntax highlighting support via various editor extensions, e.g. [vscode-glimmer][vscode-glimmer] for VS Code, which also adds support for treating `.gjs` and `.gts` as aliases for the <abbr title="JavaScript">JS</abbr> and <abbr title="TypeScript">TS</abbr> syntaxes respectively.

    (Notably, however, for reasons I will cover below, just aliasing to <abbr>JS</abbr> and <abbr>TS</abbr> is actually *not* a great move for `.gjs` and `.gts` files, for reason I discuss below under [Lint tooling](#lint-tooling). If you try this today, you will see red squiggles *everywhere* in VS Code and possibly other editors.)

In sum, as far as the most basic editor integration goes, these are all basically a wash.

The same rough mix of support for existing syntax highlighting tooling exists on GitHub, GitLab, and Bitbucket. You can see this in practice by taking a look at [how GitHub renders Part 2 of this series][part-2-gh]. It works surprisingly well already across the board. The `hbs` and imports-only modes coming out *worst* in that they just parse as strings and get no highlighting. Both <abbr>SFC</abbr>s and `<template>` highlight reasonably well.[^template-highlighting]

[^template-highlighting]: That `<template>` more or less works surprised me; it appears to be a function of the overloading of `<template>` discussed as a downside in the last post. Supporting something like `<Template>` or `<Glimmer>` would require more work: it highlights more or less reasonably (though not necessarily “correctly”) until the closing `</Glimmer>`, which does *not* highlight correctly—but content after it highlights correctly again.

[vscode-glimmer]: https://marketplace.visualstudio.com/items?itemName=chiragpat.vscode-glimmer
[part-2-gh]: https://github.com/chriskrycho/v5.chriskrycho.com/blob/deb94185567ec677496930cf5381999942d1e3ad/site/journal/Ember%20Template%20Imports/Part%202.md


## Lint tooling

When we come to lint tooling—specifically, ESLint and ember-template-lint—the long and short of it is that *nothing* works particularly well, but <abbr>SFC</abbr>s and template literals come out slightly better in one specific way, imports-only basically neutral, and `<template>` slightly worse.

Out of the box, the existing linting tools simply do not understand template imports. In this regard, it’s a level playing field: all of the approaches on offer will have to implement custom handling. In particular, all of them incorrectly flag anything used only in the template as an unused value. That includes the imports-only mode! For example, in this lightly-modified version of an example from Part 2, the `Greet` and `WeatherSummary` components here will both be marked as unused imports, and `isBirthday` will be flagged as defined but never used.

```js
import { hbs } from '@glimmer/component';
import Greet from './greet.js';
import WeatherSummary from './weather-summary.js';

function isBirthday(dateOfBirth) {
  // ...
}

export default hbs`
  <Greet @name={{@user.name}} />
  {{#if (isBirthday @user.dob)}}
    <p>Happy birthday!</p>
  {{/if}}
  <WeatherSummary />
`;
```

Likewise, in the backing class for this variation on the `WeatherSummary` component from Part 2, the `getCurrentTemp` method and the `isSet` helper function will both be flagged as unused:

```js
import Component, { hbs } from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

const isSet = (val) => val != null;

export default class WeatherSummary extends Component {
  @tracked currentTemp;
  
  getCurrentTemp = () => {
    this.currentTemp = Math.floor(Math.random() * 100));
  };

  static template = hbs`
    <button
      type='button'
      {{on "click" this.getCurrentTemp}}
    >
      Check the weather
    </button>

    {{#if (isSet this.currentTemp)}}
      <p>The current temperature is {{this.currentTemp}}</p>
    {{/if}}
  `;
}
```

We’d see exactly the same warnings about unused code in an <abbr>SFC</abbr> format, and for the same basic reasons: we have to inform the JavaScript and template linters about values in the *other* language.

Now, all of the options other than the imports-only format work more or less correctly for all of the parts of any given module which *aren’t* related to templates. (The imports-only format simply doesn’t connect the two layers at all at present, so there are no false positives… but I don’t think we can call that a win.) Perhaps surprisingly, `<template>` actually *appears* to do slightly better than the others in terms of recognizing that we are actually using values in module scope—but this is because it’s attempting to parse `<template>` and the contents of it as <abbr title="JavaScript XML">JSX</abbr>. This means that editors which use the TypeScript Language Service (including for their JavaScript support) get *very* confused and report syntax errors everywhere, because Glimmer templates and <abbr>JSX</abbr> aren't compatible.

The net here is that we have to implement a custom parsing layer for *any* of these formats to have usable linting integration.


## Formatter tooling

The story is similar for existing formatter tooling with Prettier: *none* of the formats work well across the board.

- Out of the box, Prettier basically works for the *template* side of <abbr>SFC</abbr>s, but doesn’t work at all for the <abbr>JS</abbr> side.

- Exactly the inverse is true for template literals: Prettier works for the JavaScript side but not at all for the content between `hbs`, which it treats as a string (no surprise there: remember from Part 2 that that's exactly what it is semantically!).

- For the `<template>` proposal, Prettier simply fails to parse, and so formatting does not work at all.

- With the imports-only proposal, like <abbr>SFC</abbr>s, Prettier works for the template side, but doesn’t format the imports section at all.

In sum, as with the lint tooling, we actually need to implement custom language support to make *any* of these work correctly. However, it’s worth acknowledging that the template literals and <abbr>SFC</abbr> proposals are halfway there, whereas (in very different ways) the `<template>` and imports-only proposals are much worse off.


## Language server tooling

Finally, we come to language server tooling and integration. Most of the JavaScript ecosystem uses the TypeScript Language Service to support features like documentation-on-hover, go-to-definition, and refactoring. That includes React, since <abbr>TS</abbr> has built-in support for <abbr>JSX</abbr>; Vue, Angular, and Svelte via custom language server integrations; and Ember/Glimmer, via the various experimental <abbr title="Ember Language Server">ELS</abbr> implementations and [Glint][glint] (which it itself used by some of the other language servers). With any of the proposed formats, we would need to create a language server which understood the format and could connect it to the <abbr title="TypeScript Language Service">TS LS</abbr>.

Per Dan Freeman and James Davis, who built and maintain Glint, there is very little difference in effort in supporting `hbs` vs. `<template>`, and because these all compile to the same primitives, even <abbr>SFC</abbr>s are tractable. The main challenge there is handling the same custom scoping semantics with the default export as I described as odd in Part 2. However, that is the same basic issue as supporting Glimmer components in Ember apps *today*: something Glint and the experimental <abbr>ELS</abbr>s already do.

Notably, Glint also supports [GlimmerX][glimmer-x], which uses the same syntax as the template literals proposal. This means that we get the integration “for free” (really, for Dan’s and James’ hard work in 2019–2020). To get the same support for `<template>`, we would need to update the implementation of the Babel transform for `<template>` to provide some data about the original string, so that we can map invocations, error messages, and so on. We would have to build something similar for <abbr>SFC</abbr>s (albeit from scratch, since no implementation exists whatsoever yet for them).

However, there’s a problem here that’s easy to miss: because we’re [giving new semantics to template literal strings][p2], we have to override existing TypeScript’s existing understanding of what <abbr>JS</abbr> and <abbr>TS</abbr> files mean. In all cases, this is *work*.

- For the case of the `<template>` and <abbr>SFC</abbr> proposals, this is somewhat tractable and there are a variety of ways to approach it: the custom language integration means we can potentially leave “normal” <abbr>TS</abbr> files alone and just *add* information to TypeScript via something like Glint. Doing it that way requires doing a build pass to provide the info, though. The alternative is to disable the <abbr>TS LS</abbr> in favor of something like Glint.

- In the case of imports-only, we *have* to disable the <abbr>TS LS</abbr>, because we have to stitch the script and template files together to create the correct context. Otherwise, the backing classes will always and unavoidably report that there is no usage of anything which is only used in templates.

- For the template literals proposal, it might initially seem like we could just integrate with the <abbr>TS LS</abbr> plugin tooling. After all, the docs [say][ts-docs] that one of the intended uses for plugins is:

    > Enable new errors or completions in string literals for a custom templating language

    Unfortunately, they also specify that one of the things language plugins cannot do is:
    
    > Customize the type system to change what is or isn't an error when running `tsc`
    
    The net of this is that we can *add* errors in a standard <abbr>TS LS</abbr> plugin, but we cannot *remove* them. We’re stuck with all those warnings about unused values! What’s more, “plugins aren't loaded during normal commandline typechecking or emitting.” This is why Glint works the way it does today: as a custom language server and <abbr title="command line interface">CLI</abbr>). To get consistent behavior between our build/<abbr title="continuous integration">CI</abbr> environments and our editors, we still need to run everything through a custom pipeline. That would leave us with the downside of having two separate paths for type-checking vs. editor support… or with the alternative of disabling existing TypeScript support for those files.

Net, the `hbs` implementation initially appears to have a very small edge on language server implementation, because it already exists in support of GlimmerX—but we should not take this as a particularly important constraint: it’s basically just slight variations on the same underlying sets of tradeoffs. (Once again, everyone who isn’t using <abbr>JSX</abbr> *really* wishes that the syntax extensions part of <abbr>TS</abbr> were pluggable. Alas.)

[glint]: https://github.com/typed-ember/glint
[glimmer-x]: https://github.com/glimmerjs/glimmer-experimental
[ts-docs]: https://github.com/microsoft/TypeScript/wiki/Writing-a-Language-Service-Plugin


## Server-side

One common reason a few people have suggested we ought to prefer `hbs` is that they think it makes it easier to support running Glimmer templates in server-side environments—that is, that it would make it viable to use `hbs` as an actual import which works without needing any compilation step.

Unfortunately, while that sounds appealing, it isn’t actually true, at least today! The problem is the mismatch in semantics discussed in [Part 2][p2]:

1. The scoping semantics are wrong, because `hbs` literals aren’t actually string literals.[^thanks] Remember: if you write this code…

    ```hbs
    const Greeting = hbs`<p>Hello, {{@name}}!</p>`

    const Summary = hbs`
      <Greeting @name={{user.name}}>
      {{! ... }}
    `;
    ```

    …it *does not work without a transform*. `Greeting` isn’t “in scope” for the `Summary` component! While we could work around this by introducing some other invocation form for `hbs` where it also takes the scope as an argument, that makes the ergonomics *much* worse—close, in fact, to the original `precompileTemplate` invocation that *is* the compile target.

2. Additionally, remember that the scoping semantics are *also* wrong when you switch to a component with a backing class, because of the mismatch between a `static` class field and the semantics of component templates. If you want the `this` value to work correctly, you *have* to introduce some degree of processing. At a minimum, we would need to rewrite the internals of `getComponentTemplate` to go look up that static field—not an impossible hurdle, by any means, but a real and significant change to the current design. (As to whether it’s otherwise well-motivated, I refer you to the rest of the series!)

Moreover, I’ll go further here and say that I don’t think there’s any particular value to being able to run a Glimmer component without any build step. Having a build pipeline is *extremely* normal for both client- and server-side code—and it can even be done fairly transparently and on demand for server-side code, e.g. with [`@babel/node`][babel-node] or [`ts-node`][ts-node]. If someone wants to run Glimmer component code natively in a Node runtime, they can precompile it using our standard build tools *or* they can simply use `@babel/node` to integrate the transform automatically.

[babel-node]: https://babeljs.io/docs/en/babel-node
[ts-node]: https://typestrong.org/ts-node/

Net, I take this to be something of a non-issue for the design choice here, as it requires *some* non-zero degree of extra work compared to today’s baseline regardless and there are straightforward options for this regardless of the design chosen.

[^thanks]: [Dan Freeman](https://dfreeman.io) pointed this out on the Ember Discord in response to the update where I added this section. I knew this, and in my <abbr>COVID</abbr>-recovery-induced mental haze, I totally forgot it. Thanks, Dan!


## Summary

In this particular comparison, the template literals proposal clearly comes out with a *small* edge. In most categories, it’s the same or slightly better than the other options, as we can see in this table:

<div class='table-container'>
  <table>
    <thead>
      <th scope='col'>Consideration</th>
      <th><code>&lt;template&gt;</code></th>
      <th>Template literals</th>
      <th><abbr>SFC</abbr>s</th>
      <th>Imports-only</th>
    </thead>
    <tbody>
      <tr>
        <th scope='col' colspan='5'>Syntax</th>
      </tr>
      <tr>
        <th scope='row'><abbr>JS</abbr></th>
        <td>working</td>
        <td>working</td>
        <td>working</td>
        <td>not working</td>
      </tr>
      <tr>
        <th scope='row'>templates</th>
        <td>working</td>
        <td>working</td>
        <td>working</td>
        <td>working</td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th scope='col' colspan='5'>Linting</th>
      </tr>
      <tr>
        <th scope='row'><abbr>JS</abbr></th>
        <td>partial</td>
        <td>partial</td>
        <td>partial</td>
        <td>no</td>
      </tr>
      <tr>
        <th scope='row'>templates</th>
        <td>no</td>
        <td>no</td>
        <td>no</td>
        <td>yes</td>
      </tr>
      <tr>
        <th scope='row'>needs custom parser</th>
        <td><strong>yes</strong></td>
        <td><strong>yes</strong></td>
        <td><strong>yes</strong></td>
        <td><strong>yes</strong></td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th scope='col' colspan='5'>Formatting</th>
      </tr>
      <tr>
        <th scope='row'><abbr>JS</abbr></th>
        <td>no</td>
        <td>partial</td>
        <td>partial</td>
        <td>no</td>
      </tr>
      <tr>
        <th scope='row'>templates</th>
        <td>no</td>
        <td>partial</td>
        <td>partial</td>
        <td>no</td>
      </tr>
      <tr>
        <th scope='row'>needs custom parser</th>
        <td><strong>yes</strong></td>
        <td><strong>yes</strong></td>
        <td><strong>yes</strong></td>
        <td><strong>yes</strong></td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th scope='row'><abbr>LS</abbr> effort</th>
        <td>small</td>
        <td>none</td>
        <td>medium</td>
        <td>small</td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th scope='row'>Server-side requires compilation</th>
        <td>yes</td>
        <td>yes</td>
        <td>yes</td>
        <td>yes</td>
      </tr>
    </tbody>
  </table>
</div>

These differences are very small, though. Accordingly, I still believe `<template>` is the best choice—because the small deltas here are fairly straightforward to tackle, and because I think the issues around **Teaching** described in [Part 2][p2] and around **Testing** as I will describe in [Part 4][p4] *profoundly* outweigh these small tooling differences.

[p4]: https://v5.chriskrycho.com/journal/ember-template-imports/part-4/
