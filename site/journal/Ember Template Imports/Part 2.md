---
title: >
   Ember.js Template Imports: Part 2
subtitle: >
    Which template imports design has the biggest set of wins for teaching and understanding components?
series:
    part: 2
date: 2021-10-29T16:35:00-0600
templateEngineOverride: md

---

In this second part of my [series on Ember Template Imports](https://v5.chriskrycho.com/journal/ember-template-imports/), I am tackling the subject of **Teaching and Understanding**. The [first part](https://v5.chriskrycho.com/journal/ember-template-imports/part-1/ "Part 1: Introducing the series and walking through the formats.") introduced the series and the options on the table. In future posts, I will look at each option in terms of **Scaling** and in terms of **Testing**, before wrapping up with a conclusion.

---

As a reminder, the four formats under discussion are:

- `<template>` tags with a custom file extension (currently `.gjs` and `.gts`)
- template literals using an `hbs` literal
- something like Svelte’s and Vue’s <abbr>SFC</abbr> format
- an imports-only extension of the current format

I will also be assuming the [Definitions](https://v5.chriskrycho.com/journal/ember-template-imports/part-1/#definitions) and using the same examples as in the introductory post in the series:

- a template-only `Greeting` component
- a stateful component for setting a user’s name
- a component which uses built-in helpers and modifiers
- a component which assembles all of these pieces

However, unlike in the first post, where I simply aimed to get all the options on the table clearly, I will *not* be repeating the same examples with each different format. Instead, this post is structured as an *argument* in favor of my preferred format: `<template>` tags.

---

- [Prefatory comments](#prefatory-comments)
    - [On motivation](#on-motivation)
    - [On design principles](#on-design-principles)
- [Analysis](#analysis)
    - [Imports-only](#imports-only)
    - [The other options](#the-other-options)
        - [Template-only](#template-only)
        - [Introducing imports](#introducing-imports)
        - [Dynamic functionality](#dynamic-functionality)
        - [Class-backed components](#class-backed-components)
        - [Pulling components into a single file](#pulling-components-into-a-single-file)
    - [Scope semantics](#scope-semantics)
    - [On `<template>` semantics](#on-template-semantics)
- [Summary](#summary)

---

## Prefatory comments

One of the most important aspects of a decision about the design of a language or an <abbr title="application programming interface">API</abbr> is how it impacts developers’ ability to learn it and to develop a correct mental model for it. The design of template imports sits right at the boundary between programming language and <abbr>API</abbr> design, because it is a way of expressing the relationship between two programming languages: JavaScript and the Glimmer templating language.

It’s worth remembering, too, that the relationship between host language and some sort of templating language is a fundamental decision in the design space for application programming of all sorts which render <abbr title="HyperText Markup Language">HTML</abbr>. This is not a concern only of client-side-rendered applications or <abbr title="single page application">SPA</abbr>s: it applies equally to Rails and <abbr title="Embedded RuBy">ERB</abbr> or to <abbr>PHP</abbr> or to C<sup>♯</sup> apps with Razor templates.

### On motivation

Historically, Glimmer templates have been *almost* completely separated from JavaScript, with very specific and explicit bridges: component backing classes, helpers, and modifiers. That narrow boundary has helped Ember keep a strong “separation of concerns” between <abbr>HTML</abbr> and <abbr title="JavaScript">JS</abbr>, and this has been a real win—both for being able to optimize the rendering layer and for being able to statically analyze and therefore *lint* the rendering layer.

At the same time, every Glimmer template have had implicit access to *every single* component, helper, or modifier throughout an app and its addons, which has made it difficult to perform many *other* kinds of optimizations and analyses. Full dead code elimination, for example, has been effectively intractable; and features like go-to-definition or refactoring have been *much* harder to support than they would . Supporting developer discoverability—whether has been significantly 

Adopting strict mode inherently solves this second problem: it requires that components, helpers, and modifiers[^1] be imported and available in lexical scope—specifically, with *JavaScript*’s lexical scoping rules.

lexical scoping
: Access to any given binding is defined by rules defined in terms of the *definition* of a given block (including functions, class methods, if statements, etc.). Things in the same block or a parent scope are available; things in child or sibling blocks are not.

This is in contrast to dynamic scoping, where the *invocation* of a given function defines what variables it has access to.

This is great! It enables tools like [Glint](https://typed-ember/glint) or [<abbr title="Ember Language Server">ELS</abbr>](https://github.com/suchitadoshi1987/ember-language-server) to work much more easily, and to take advantage of existing tooling which understands JavaScript’s semantics. But precisely *because* this works by requiring *some* values used in templates to be available in lexical scope, it raises the question: *Why shouldn’t templates have access to **other** values in JavaScript lexical scope? Why should this be limited to imports? Wouldn’t it be useful for other things, too?*

Each of the `<template>` tags, `hbs` tagged literals, and Svelte/Vue-style <abbr>SFC</abbr> designs answers that templates *should* have access to other kinds of values in scope in some kind of JavaScript context. The imports-only/“front matter” does what the name says: it sticks to imports only.

### On design principles

I also take it as a given for this design that we should embrace a key idea in both teaching specifically and <abbr>API</abbr> design more generally: [progressive disclosure of complexity](https://www.interaction-design.org/literature/book/the-glossary-of-human-computer-interaction/progressive-disclosure).

progressive disclosure of complexity
: a design principle for <abbr title="user interface">UI</abbr>s, including <abbr>API</abbr>s, which says we should only require a user of the <abbr>API</abbr> to do or even understand the *minimum* amount required to accomplish the task at hand.

As suggested by the definition, there are two similar but not identical ways that that progressive disclosure of complexity shows up here.

1. How many concepts does accomplishing a task require the user to *understand*?
2. How many concepts does accomplishing a task require the user to *use*?

In both cases, it’s generally preferable to minimize the number of concepts in play, and in particular to design our <abbr>API</abbr>s to avoid introducing concepts which aren’t directly required for the task at hand—both because that introduces learning overhead and because it introduces more places a user can get confused or make mistakes when using the <abbr>API</abbr>.

At the same time, we have to hold that principle in tension with another constraint: trying to uphold the [principle of least surprise](https://en.wikipedia.org/wiki/Principle_of_least_astonishment).

principle of least surprise
: So far as possible, a design should behave in the way that users will generally *expect* it to behave.

That is: if there are existing (especially if there are well-established) reasons for a user to expect a given <abbr>API</abbr> to have certain semantics or meaning, our design should usually follow that. This makes it easier to learn and to remember, and it also helps prevent mistakes even for experienced developers: because they don’t have to remember “Oh, right, it’s different for this case!”

---

So: which of the template import designs is the best move for us in terms of teaching and learning, especially when keeping in mind the idea of progressive disclosure of complexity and the principle of least astonishment?

<section class="note" aria-label="note">

In the discussion which follows, I’m using `.js` in every import, and I’ll be going back to update part 1 in the post to do this as well. This might be surprising, but there’s a reason for it: this matches the <abbr title="ECMAScript">ES</abbr> Modules spec as implemented in Node 12+, and is therefore what ecosystem tooling (including the TypeScript Language Server) expects. We may choose as a community to layer on custom tooling to reinterpret other extensions to resolve and therefore be less surprising! However, that carries some risks as well as additional implementation effort, and this also serves to highlight some of the tradeoffs in this space nicely.

</section>

## Analysis

### Imports-only

Let’s start with a quick evaluation of the imports-only/“front matter” design, as the odd one out. Out of the box, this has incredibly low overhead. Our simplest possible `<Greeting>` component is “just <abbr>HTML</abbr>:

```handlebars
<p>Hello, {{@name}}!</p>
```

Introducing imports, say into a `UserOverview` component, only extends this a little bit:

```handlebars
---
import Greeting from './greeting.js';
import WeatherSummary from './weather-summary.js';
---

<div>
  <Greeting @name="Chris" />
  <WeatherSummary />
</div>
```

Per my comments above, this uses `.js` for the import, because even standalone files are ultimately compiled to `.js`. We could certainly build tooling which enables us to use `./greeting.hbs` here. However, notice that in that case, as soon as we introduce a class-backed component, users would also need to update all of their `import` statements which reference it, changing them to `.js` at that time, because importing just the `.hbs` file would become invalid. This in turn would produce the very awkward situation where importing a `.hbs` file is valid *sometimes*—requiring extra explanation. Fundamentally, Glimmer templates aren’t pure <abbr>HTML</abbr>: they always compile to <abbr>JS</abbr>.

You can see how this would look if we assume that the `WeatherSummary` component is class-backed (because it has some internal state from checking the weather regularly), and `Greeting` is still template-only:

```js
import Component from '@glimmer/component';

export default class WeatherSummary extends Component {
  @tracked currentTemp;

  interval;

  getWeather = () => {
    this.currentTemp = // something
  }

  constructor(owner, args) {
    super(owner, args);
    this.interval = setInterval(this.getWeather, 10000);
  }

  willDestroy() {
    super.willDestroy();
    clearInterval(this.interval);
  }
}
```

```handlebars
---
import { gt, lt } from '@glimmer/helper';
---

<p>
  The current temperature is {{this.currentTemp}}!
  {{#if (lt 50 this.currentTemp)}}
    Brr! 🥶
  {{else if (gt 80 this.currentTemp)}}
    Yikes! 🥵
  {{/if}}
</p>
```

Then we would end up with this very weird usage:

```handlebars
---
import Greeting from './greeting.hbs';
import WeatherSummary from './weather-summary.js';
---

<div>
  <Greeting @name="Chris" />
  <WeatherSummary />
</div>
```

This is just weird!

Additionally, this design indicates to existing JavaScript developers that the space between the `---` has JavaScript semantics… because it *does* have JavaScript semantics, but only for imports! It will naturally lead people to ask whether they can do *other* JavaScript things in that space, like defining a [helper with a function](https://github.com/emberjs/rfcs/pull/756):

```handlebars
---
import Greeting from './greeting.js';
import WeatherSummary from './weather-summary.js';
import Celebration from './celebration.js'

function isBirthday(dateOfBirth) {
  const now = new Date();
  return (
    dateOfBirth.getDate() === now.getDate() &&
    dateOfBirth.getMonth() === now.getMonth()
  );
}
---

<div>
  <Greeting @name={{@user.name}} />
  {{#if (isBirthday @user.dateOfBirth)}}
    <Celebration type='birthday' />
  {{/if}}
  <WeatherSummary />
</div>
```

This seems quite natural and indeed desirable: it keeps the separation between templates and JavaScript which many developers highly value, while still making it easy to provide local functionality. This is exactly the intuition which leads to Svelte/Vue-style <abbr>SFC</abbr>s, which are just a strict superset of the design, and which furthermore are much easier to get at least nice syntax highlighting for (as we’ll see below). ***But this isn’t allowed in this design.*** Even if there’s no reason for the function to exist *other* than this particular component, we still have to put it in its own file and import it:

```js
export default function isBirthday(dateOfBirth) {
  const now = new Date();
  return (
    dateOfBirth.getDate() === now.getDate() &&
    dateOfBirth.getMonth() === now.getMonth()
  );
}
```

```handlebars
---
import Greeting from './greeting.js';
import WeatherSummary from './weather-summary.js';
import isBirthday from './is-birthday.js'
---

<div>
  <Greeting @name={{@user.name}} />
  {{#if (isBirthday @user.dateOfBirth)}}
    <Celebration type='birthday' />
  {{/if}}
  <WeatherSummary />
</div>
```

We *are* using JavaScript semantics, but only for `import` statements. This design doesn’t allow developers to lean on their intuitions about JavaScript, and indeed it requires us to explicitly teach *more* special semantics for templates.[^2] The primary upside here is for *existing* Ember developers, for whom this is the smallest change compared to the existing design. However, even there, it has a quirky wrinkle with class-backed components: the set of things in scope for a component template becomes:

- all values available on the backing class
- whatever values are explicitly imported in the template

That first point means that there *is* a way to get a standalone helper or modifier in scope without exposing it to other modules. You just have to write it in the JavaScript file for a backing class and then attach it to the class somehow:

```js
import Component from '@glimmer/component';

function isBirthday(dateOfBirth) {
  const now = new Date();
  return (
    dateOfBirth.getDate() === now.getDate() &&
    dateOfBirth.getMonth() === now.getMonth()
  );
}

export default class Summary extends Component {
  isBirthday = isBirthday;
}
```

Then we can use the helper in the template, as before:

```handlebars
---
import Greeting from './greeting.js';
import WeatherSummary from './weather-summary.js';
import Celebration from './celebration.js'
---

<div>
  <Greeting @name={{@user.name}} />
  {{#if (this.isBirthday @user.dateOfBirth)}}
    <Celebration type='birthday' />
  {{/if}}
  <WeatherSummary />
</div>
```

In this case, it would also be fine for `isBirthday` to be a getter, but even then it’s introducing a backing class when there’s no need for a class at all *except* to get around the fact that the design here doesn’t give any other way to provide a simple helper.

Now, this does maintain the advantages of a very strict separation of concerns: JavaScript is only ever defined in dedicated JavaScript files, and <abbr>HTML</abbr> is only ever defined in dedicated `.hbs` files. However, the *point* of that separation of concerns is not separate files, but the ability to *reason about* and *work with* those concerns discretely. As we’ll see below, we can maintain that without this specific limitation on what can and cannot be defined adjacent to a template.

In sum, the imports-only/front matter design appears simple, and is the smallest change relative to today’s baseline, but it actually has some pretty significant quirks for teaching developers new to Ember around file extensions and around the semantics of the “scope” available to templates—and at least some of those scope concerns are weird for *existing* Ember users as well.

In my view, this approach simply doesn’t pay for itself in terms of teaching and ability to develop a robust mental model. For all that it initially appears to be the simplest, it requires us to teach a fair bit about JavaScript module semantics *and* to explain that it’s really still just compiling to <abbr>JS</abbr>. For another, if we adopted it, we would immediately have people clamoring for the Svelte/Vue-style <abbr>SFC</abbr> superset of its functionality—and rightly so! Given which: let’s dig into the other options on the table.

### The other options

#### Template-only

Let’s start by looking at `Greeting`, our simple component which just says “Hello” to the user. The simplest of the remaining options is a Svelte/Vue-style <abbr>SFC</abbr>:

```handlebars
<p>Hello, {{@name}}!</p>
```

By contrast, there’s a bit more overhead with the `<template>` tags design: it requires us to immediately introduce a wrapping `<template>` tag. (Recall from the first post that a single, top-level `<template>` tag is equivalent to writing `export default <template>...</template>`.)

```js
<template>
  <p>Hello, {{@name}}!</p>
</template>
```

That’s not a *lot* of extra teaching, but it is a real difference. The <abbr>SFC</abbr> design has *no* overhead here. In both cases, though, we have something that at first blush looks roughly like “just <abbr>HTML</abbr>”. By contrast, though, the template literals format requires us to introduce a *lot* more ideas right out of the box:

```js
import { hbs } from '@glimmer/component';

export default hbs`
  <p>Hello, {{@name}}!</p>
`;
```

Notice all the additional concepts that presents:

- module imports
- default module exports
- template string syntax

The overhead of these additional concepts isn’t a deal-breaker by itself, but it’s worth recognizing the jump in complexity for this form. While we shouldn’t over-optimize for the simplest case—after all, very few components in our apps and libraries are this simple!—we also shouldn’t disregard the simple cases. (There’s also another important point here, on the *semantics* of template literals in JavaScript; I cover that in [Scope semantics](#scope-semantics) below.)

Right out of the gate, we can see that <abbr>SFC</abbr>s do best, template literals worst, and `<template>` tags right in the middle on the scale for progressive disclosure on the *simplest* case.

#### Introducing imports

Once we introduce imports, the dynamics start to change. We’ll start once again with <abbr>SFC</abbr>s, since they were the “winner” of the first round. To add imports, we need to introduce a `<script>` tag, and add the imports within its body. Here, again, with our `UserOverview` component:

```handlebars
<script>
  import Greeting from './greeting.js';
  import WeatherSummary from './weather-summary.js';
</script>

<div>
  <Greeting @name="Chris" />
  <WeatherSummary />
</div>
```

So far, this seems quite reasonable. The scoping rules aren’t *quite* the same as in normal JavaScript and <abbr>HTML</abbr>, but that’s really only because regular <abbr>HTML</abbr> doesn’t have any notion of components. The import rules *are* the same (except that we would technically need to write `<script type="module">` rather than simply `<script>`). Once again, <abbr>SFC</abbr>s look pretty good!

Turning next to `<template>` tags and tagged template literals, we see that they share tradeoffs with each other. This makes sense: they’re both basically a special kind of JavaScript. First up, with `<template>`:

```js
import Greeting from './greeting.js';
import WeatherSummary from './weather-summary.js';

<template>
  <div>
    <Greeting @name="Chris" />
    <WeatherSummary />
  </div>
</template>
```

And now the same with the template strings:

```js
import { hbs } from '@glimmer/component';
import Greeting from './greeting.js';
import WeatherSummary from './weather-summary.js';

export default hbs`
  <div>
    <Greeting @name="Chris" />
    <WeatherSummary />
  </div>
`;
```

There is one significant point in favor of `hbs` here: since this file is “just” JavaScript, the imports all match what you would see on disk (or, in the case of TypeScript, the same thing you would see for any other <abbr title="TypeScript">TS</abbr> file). With the <abbr>SFC</abbr> and `<template>` tag formats, we would presumably have different on-disk authoring extensions (perhaps `.gbs` for <abbr>SFC</abbr>s and `.gjs` for `<template>`).

#### Dynamic functionality

Next up, we can introduce dynamic behavior into this component, with our `isBirthday` helper. I noted above that the <abbr>SFC</abbr> format is basically just the natural extension of the imports-only proposal, and that’s most obvious here:

```handlebars
<script>
  import Greeting from './greeting.js';
  import WeatherSummary from './weather-summary.js';
  import Celebration from './celebration.js'

  function isBirthday(dateOfBirth) {
    const now = new Date();
    return (
      dateOfBirth.getDate() === now.getDate() &&
      dateOfBirth.getMonth() === now.getMonth()
    );
  }
</script>

<div>
  <Greeting @name={{@user.name}} />
  {{#if (isBirthday @user.dateOfBirth)}}
    <Celebration type='birthday' />
  {{/if}}
  <WeatherSummary />
</div>
```

This Just Works™, exactly the way we would expect—very much *unlike* in our imports-only flow. And again, it has the basic semantics we would expect from a `<script>` tag. The same is true for both our <abbr>JS</abbr> formats: we can just introduce a function in local scope, and it’s available to use. So, with `<template>`:

```
import Greeting from './greeting.js';
import WeatherSummary from './weather-summary.js';

function isBirthday(dateOfBirth) {
  const now = new Date();
  return (
    dateOfBirth.getDate() === now.getDate() &&
    dateOfBirth.getMonth() === now.getMonth()
  );
}

<template>
  <div>
    <Greeting @name="Chris" />
    {{#if (isBirthday @user.dateOfBirth)}}
      <Celebration type='birthday' />
    {{/if}}
    <WeatherSummary />
  </div>
</template>
```

With`hbs`:

```js
import { hbs } from '@glimmer/component';
import Greeting from './greeting.js';
import WeatherSummary from './weather-summary.js';

function isBirthday(dateOfBirth) {
  const now = new Date();
  return (
    dateOfBirth.getDate() === now.getDate() &&
    dateOfBirth.getMonth() === now.getMonth()
  );
}

export default hbs`
  <div>
    <Greeting @name="Chris" />
    {{#if (isBirthday @user.dateOfBirth)}}
      <Celebration type='birthday' />
    {{/if}}
    <WeatherSummary />
  </div>
`;
```

In each of these cases, things basically “just work” exactly the way we would expect: a function declared in a way appropriate for the format is available to the template to invoke, with no caveats about only supporting imports! Spaces which *look* like JavaScript *are* JavaScript, and therefore spaces which seem like they *should* have JavaScript semantics *do* have JavaScript semantics.

#### Class-backed components

When we turn to class-backed components, the dynamics shift dramatically. The `<template>` and `hbs` designs come off pretty well here, so I’ll start by showing the `WeatherSummary` component in each. With `hbs`:

```js
import Component, { hbs } from '@glimmer/component';
import { gt, lt } from '@glimmer/helper';

export default class WeatherSummary extends Component {
  @tracked currentTemp;

  interval;

  getWeather = () => {
    this.currentTemp = // something
  }

  constructor(owner, args) {
    super(owner, args);
    this.interval = setInterval(this.getWeather, 10000);
  }

  willDestroy() {
    super.willDestroy();
    clearInterval(this.interval);
  }

  static template = hbs`
    <p>
      The current temperature is {{this.currentTemp}}!
      {{#if (lt 50 this.currentTemp)}}
        Brr! 🥶
      {{else if (gt 80 this.currentTemp)}}
        Yikes! 🥵
      {{/if}}
    </p>
  `;
}
```

And with `<template>`:

```js
import Component from '@glimmer/component';
import { gt, lt } from '@glimmer/helper';

export default class WeatherSummary extends Component {
  @tracked currentTemp;

  interval;

  getWeather = () => {
    this.currentTemp = // something
  }

  constructor(owner, args) {
    super(owner, args);
    this.interval = setInterval(this.getWeather, 10000);
  }

  willDestroy() {
    super.willDestroy();
    clearInterval(this.interval);
  }

  <template>
    <p>
      The current temperature is {{this.currentTemp}}!
      {{#if (lt 50 this.currentTemp)}}
        Brr! 🥶
      {{else if (gt 80 this.currentTemp)}}
        Yikes! 🥵
      {{/if}}
    </p>
  </template>
}
```

Here, there is a clear and consistent connection between the class and the template for the class.  (There are problems with the static field definition and `hbs` here, but I will return to those below.) And as I’ll demonstrate in the next section, this works consistently even if we have multiple components in the same file. Unfortunately, things aren’t quite a nice for <abbr>SFC</abbr>s. We end up with something like this:

```handlebars
<script>
  import Component from '@glimmer/component';
  import { gt, lt } from '@glimmer/helper';

  export default class WeatherSummary extends Component {
    @tracked currentTemp;

    interval;

    getWeather = () => {
      this.currentTemp = // something
    }

    constructor(owner, args) {
      super(owner, args);
      this.interval = setInterval(this.getWeather, 10000);
    }

    willDestroy() {
      super.willDestroy();
      clearInterval(this.interval);
    }
  }
</script>

<p>
  The current temperature is {{this.currentTemp}}!
  {{#if (lt 50 this.currentTemp)}}
    Brr! 🥶
  {{else if (gt 80 this.currentTemp)}}
    Yikes! 🥵
  {{/if}}
</p>
```

Up to this point, the scope semantics for the <abbr>SFC</abbr> style all more or less matched those from normal <abbr>HTML</abbr> and <abbr>JS</abbr>. Here, though, there’s special-casing for this `export default class`: it magically becomes the `this` of the component. And unlike the `import` statements, where the module semantics more or less match normal <abbr>HTML</abbr>, the *export* statements *don’t* match. There is nothing at all to indicate that a default export from a given `<script>` tag should have anything to do with the context—we just have to teach it as a bare fact.

We could make other named exports work, but (as I will cover in more detail in the next section) *not as components*. This isn’t without precedent in JavaScript frameworks; both Svelte and Vue have special, non-native-<abbr>HTML</abbr> semantics for their scoping too, with Svelte in particular doing very unusual things with the semantics of `export`. Given that we’re designing this from scratch, though, and that the other options *don’t* have this issue, I count this a significant mark against <abbr>SFC</abbr>s.

#### Pulling components into a single file

As we come to the final part of our worked example, this problem gets *much worse*. When we go to build up the `UserOverview` component, both `<template>` and `hbs` allow us to make our choices about where each component should live, while the <abbr>SFC</abbr> design does not. For example, if the `Greeting` component isn’t used anywhere else, and we really only want to extract it for simplicity of working with as a concrete thing of its own (just like we do all the time with functions and classes in <abbr>JS</abbr>), we can do that with `<template`—

```js
import WeatherSummary from './weather-summary.js';

const Greeting = <template>
  <p>Hello, {{@name}}!</p>
</template>;

function isBirthday(dateOfBirth) {
  const now = new Date();
  return (
    dateOfBirth.getDate() === now.getDate() &&
    dateOfBirth.getMonth() === now.getMonth()
  );
}

<template>
  <div>
    <Greeting @name="Chris" />
    {{#if (isBirthday @user.dateOfBirth)}}
      <Celebration type='birthday' />
    {{/if}}
    <WeatherSummary />
  </div>
</template>
```

—or with `hbs`—

```js
import { hbs } from '@glimmer/component';
import WeatherSummary from './weather-summary.js';

const Greeting = <template>
  <p>Hello, {{@name}}!</p>
</template>;

function isBirthday(dateOfBirth) {
  const now = new Date();
  return (
    dateOfBirth.getDate() === now.getDate() &&
    dateOfBirth.getMonth() === now.getMonth()
  );
}

export default hbs`
  <div>
    <Greeting @name="Chris" />
    {{#if (isBirthday @user.dateOfBirth)}}
      <Celebration type='birthday' />
    {{/if}}
    <WeatherSummary />
  </div>
`;
```

—but *not* with an <abbr>SFC</abbr>. This is the fallout of two design constraints:

- having the template be the root primitive, with JavaScript added in via `<script>` tag
- having, as a corollary, special-cased the the default export from the `<script>` tag to become the `this` for class-backed components

Both of these mean that a given <abbr>SFC</abbr> can always and only define exactly one component—even if there are perfectly good reasons to define multiple components in a single file. The result is that, not unlike JavaScript functionality in the imports-only design, <abbr>SFC</abbr>s are somewhat arbitrarily hobbled here.

### Scope semantics

This leads directly into one of the key tradeoffs for the design: how each of these deals with scoping, and particularly around the mental model we have of scoping.

I suggested this above but it’s important to emphasize again: scope semantics is *the* biggest weak point of <abbr>SFC</abbr>s for teaching and mental model.[^3] This is also where the downsides of the `hbs` design really show up: While it uses template literal *syntax*, it does not have template literal *semantics*. Any [normal template literal](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) string in JavaScript can use expression interpolation, including tagged template literals. Accordingly, this is perfectly legal syntax for any `.js` (or `.ts`) file:

```js
import { hbs } from '@glimmer/component';

const BREAKFAST = 'Waffles are yummy';

const Breakfast = hbs`<p>${BREAKFAST}</p>`;
```

Unfortunately, this example doesn’t work in Glimmer or Ember apps; in fact, it is a build error! You will something like this:

```plain
path/to/app/app/components/breakfast.js: placeholders inside a tagged template string are not supported
  4 |
  5 | const Breakfast = hbs`<div>${somethingInScope}</div>`;
  6 |                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
```

This is because `hbs` is *not* a template literal, but a compile-time macro, which repurposes template literal string syntax for something with totally different semantics. While we could explain that Glimmer and Ember special-case this particular template string and compile it out, it will surprise developers coming from other frameworks (or from no framework at all).

It doesn’t stop there, either. Recall our definition of a class-backed `WeatherSummary` component from above:

```js
import Component, { hbs } from '@glimmer/component';
import { gt, lt } from '@glimmer/helper';

export default class WeatherSummary extends Component {
  // the rest of the class...

  static template = hbs`
    <p>
      The current temperature is {{this.currentTemp}}!
      {{#if (lt 50 this.currentTemp)}}
        Brr! 🥶
      {{else if (gt 80 this.currentTemp)}}
        Yikes! 🥵
      {{/if}}
    </p>
  `;
}
```

This definition provides the template as a static class field syntactically, but that’s a mismatch: The `this` value of a static field is *not* an instance, but rather the class itself, so `this.currentTemp` is *wrong* for a static field. You can see this with a very simple example:

```js
class Example {
  anInstanceProp = 123;

  static demoStatic =
    `this.anInstanceProp (static) = ${this.anInstanceProp}`;

  demoInstance =
    `this.anInstanceProp (instance) = ${this.anInstanceProp}`;
}

console.log(Example.demoStatic);
console.log(new Example().demoInstance);
```

This will print:

```
this.anInstanceProp (static) = undefined
this.anInstanceProp (instance) = 123
```

It only works in Glimmer components because the build rewrites the declaration into [a relationship in a `WeakMap`](https://github.com/glimmerjs/glimmer-vm/blob/4f1bef0d9a8a3c3ebd934c5b6e09de4c5f6e4468/packages/%40glimmer/manager/lib/public/template.ts).[^4] This means, again, that developers coming to Ember cannot use their existing JavaScript knowledge to understand these semantics—indeed, their existing <abbr>JS</abbr> knowledge will *actively mislead them* here, as it does with `hbs`’s altered semantics.

What’s more, as I’ll cover in Part 4 of the series, this is a significant (though solvable) challenge for some ecosystem tooling for the same reason: `static` doesn’t actually have the right semantics.

The net of these is that `<template>` actually has a substantial advantage over both <abbr>SFC</abbr>s and `hbs` here. Things in lexical scope are available in the body of the `<template>`. However, unlike with template strings, there is no possibility of confusion with the existing semantics of JavaScript—neither for how to include values from the surrounding scope nor for how the template is connected to backing class. The use of the `<template>` tag (as well as a dedicated file extension) makes obvious that there is a language shift: this isn’t JavaScript anymore.

### On `<template>` semantics

As a counter to that last point, though, it’s important to note that `<template>` *also* has [established semantics](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) from <abbr>HTML</abbr>. Quoting [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template):

> The `<template>` HTML element is a mechanism for holding HTML that is not to be rendered immediately when a page is loaded but may be instantiated subsequently during runtime using JavaScript.
> 
> Think of a template as a content fragment that is being stored for subsequent use in the document. While the parser does process the contents of the `<template>` element while loading the page, it does so only to ensure that those contents are valid; the element's contents are not rendered, however.

As with `hbs`, this is a kind of “uncanny valley” problem. Our proposed use of `<template>` looks *similar* to the platform use, but is different enough that any existing knowledge is inapplicable and indeed misleading. I suspect most working front-end developers are unfamiliar with `<template>`,[^5] which *reduces* the impact from the overlap… but the overlap really does exist, and it could result in very odd code in the rare cases where a Glimmer developer needs to use the *actual* `<template>` tag:

```js
const ComponentWithActualTemplate = <template>
  <template id="actual-template">
  </template>
</template>
```

One option here is to consider a name or design for this which *isn’t* `template`—or even to capitalize it: `<Template>` is, for parsing purposes, distinct from `<template>`, which is one of the reasons that most front-end libraries now use it for component invocation. There are other options here, as well, like `<Glimmer>`. None of those are without their own downsides, including that existing apps might already be using whatever name chosen, and would need to refactor to switch.

Net, though, I don’t think the overlap with `<template>` is intractable. This is in contrast to the use of tagged template literals, which are impossible to make compatible with <abbr>JS</abbr> developers’ existing knowledge and expectations.

## Summary

This post has covered a *lot* of ground, so I’m going to wrap up with an overview table which summarizes my take on it. (I’m trying very hard to be fair to each of the options available here, so feel free to let me know if you think I’m unfairly categorizing the tradeoffs!)

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
      <th scope="row">Progressive Disclosure</th>
      <td>Good</td>
      <td>Bad</td>
      <td>Very good</td>
      <td>Good</td>
    </tr>
    <tr>
      <th scope="row">JavaScript semantics</th>
      <td>Good</td>
      <td>Good</td>
      <td>Good</td>
      <td>Very bad</td>
    </tr>
    <tr>
      <th scope="row">Scope semantics</th>
      <td>Very good</td>
      <td>Bad</td>
      <td>Okay</td>
      <td>Good</td>
    </tr>
    <tr>
      <th scope="row">Semantic mismatch</th>
      <td>Yes/<abbr>HTML</abbr>/tractable</td>
      <td>Yes/<abbr>JS</abbr>/intractable</td>
      <td>No</td>
      <td>No</td>
    </tr>
  </tbody>
</table>

Looking at the whole picture like this, I would go so far as to say that for a single component with no backing class (and leaving aside considerations about testing we’ll get to later in the series, especially around testing), the <abbr>SFC</abbr> approach is the best design choice. It starts with plain <abbr>HTML</abbr>, and then adds dynamicism via a `<script>` tag—just like the code we would write if we were targeting the browser with no compile step, even including the scoping rules.

Notably, `<template>` is close behind here, though. The only additional factor in the base case is the wrapping `<template>` tag—whereas `hbs` *immediately* introduces full JavaScript semantics. What’s more, when we add in the constraint of trying to minimize *surprise*, the <abbr>SFC</abbr> design ends up falling down in a couple key areas, particularly around the relationship with the scope and export rules; and the `hbs` design has even worse semantic mismatches with JavaScript. I think it’s fair to call `<template>` the winner here. It’s not that it’s perfect: it’s only the absolute winner in one category, and has its own quirk with existing <abbr>HTML</abbr> semantics. But it averages out much better across the board than any of the others.

I’ll add in conclusion here: this summary isn’t just my justification for my preferred design. Rather, it was thinking through exactly these tradeoffs which *made* this my preferred design.

---

Next time: the impact on **Scaling**, both for individual codebases and for ecosystem tooling! In the meantime, I welcome your feedback: via email, [on Ember Discuss][discuss], [in `#st-template-imports` on Ember Discord][discord], or even (though I’ll be slowest to respond there) on Twitter or Micro.blog.

[discuss]: https://discuss.emberjs.com/t/template-imports-part-2/19221
[discord]: https://discord.com/channels/480462759797063690/518154533143183377/903776252106801242



[^1]: and possible future features like [Resources and Effects](https://www.pzuraq.com/introducing-use/ "Introducing @use")

[^2]: This was actually [my objection](https://github.com/emberjs/rfcs/pull/367#issuecomment-423981359) when Sam Selikoff [first proposed](https://github.com/emberjs/rfcs/pull/367#issuecomment-423839940) using JS import semantics to deal with the problems of the  design. Sam was absolutely right about use of JS imports, but I still think I was right about the problems of the `---` design!

[^3]: The other big weak point is around testing, and it’s actually closely related to this dynamic, as I will cover in detail in Part 4.

[^4]: This is a key point we will also return to in our discussion of tooling impact in the next post, and it’s one reason why I’m unpersuaded that the template literal string syntax makes the story better for running without compilation.

[^5]: I didn’t even know `<template>` existed until it came up in early discussions with pzuraq and the Typed Ember team as we played with different designs and experimented with it in the Glint alpha period!