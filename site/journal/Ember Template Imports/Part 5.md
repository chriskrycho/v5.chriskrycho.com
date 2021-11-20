---
title: >
  Ember.js Template Imports: Part 5
subtitle: >
  What about styles? (A bonus post!)
summary: >
  Styling and presentation are fundamental aspects of authoring user interfaces. So how does CSS work with the various Ember template imports proposals?

series:
  part: 5

tags:
  - CSS

date: 2021-11-15T10:05:00-0700

image: https://cdn.chriskrycho.com/file/chriskrycho-com/images/template-imports/part-5-styles.png

templateEngineOverride: md

---

Previously in [this series][s], I have covered [**Teaching and Understanding**][p2], [**Tooling**][p3], and [**Testing**][p4]. I had planned for this fifth post in the series to be the *final* post in the series, summarizing the tradeoffs and concluding my case for `<template>`. However, as a few folks have mentioned styles over the course of the last many months, I thought it would be helpful to add one extra post discussing <abbr title="Cascading Style Sheets">CSS</abbr> in particular.

[s]: https://v5.chriskrycho.com/journal/ember-template-imports/
[p2]: https://v5.chriskrycho.com/journal/ember-template-imports/part-2/
[p3]: https://v5.chriskrycho.com/journal/ember-template-imports/part-3/
[p4]: https://v5.chriskrycho.com/journal/ember-template-imports/part-4/

Fundamentally, there are two basic approaches available for styling in the modern front-end ecosystem—everything out there is a variation on one of these themes:

1. **Standalone style definitions.** This is the classic approach: defining styles in a completely separate context from the JavaScript and <abbr title="HyperText Markup Language">HTML</abbr>. This can be accomplished any number of ways, from a single monolithic <abbr>CSS</abbr> file to a bunch of files integrated together via a build step with [Sass][sass] or [PostCSS][postcss] to atomic styles like [Tailwind][tailwind] or [Tachyons][tachyons].

2. **Integrated style definitions.** This is the approach which became much more popular in the late 2010s: style definitions which are directly related in some way to <abbr title="user interface">UI</abbr> components. This includes [<abbr>CSS</abbr> Modules][css-modules], [styled components][styled], [Emotion][emotion], [vanilla-extract][vanilla], and no doubt more. Notably, many of these can *also* work with some of the preprocessing tools from the classic build approach. The big upsides to these are usually tooling integration and built-in per-component scoping.

[sass]: https://sass-lang.com
[postcss]: https://postcss.org
[tailwind]: https://tailwindcss.com
[tachyons]: https://tachyons.io
[css-modules]: https://github.com/css-modules/css-modules
[styled]: https://www.styled-components.com 
[emotion]: https://emotion.sh/docs/@emotion/css
[vanilla]: https://vanilla-extract.style

***All of these work perfectly well with any of the template imports proposals.*** This is the reason I originally left this aside, and it’s also the reason this is the shortest of the posts. The templating layer is a fundamental part of a front-end framework: it is *the* thing a front-end framework *must* do. By contrast, a framework can be styling-method-agnostic. Frameworks certainly can provide first-class primitives for it—as Vue and Svelte do—but it is not a necessary constraint for the integration of *state change* with *<abbr title="document object model">DOM</abbr> updates*, unlike templating.

<section class='note' aria-label="Note">

This is by no means to diminish the importance of styling, which I take to be an under-appreciated element of truly great web applications. It is rather to make clear and explicit what constraints it does and doesn’t face compared to templates.

</section>

There are certainly interesting moves we could make with styles in any of the proposals. It’s easy to imagine introducing a `<style>` block alongside the template and `<script>` tags in an <abbr title="single-file component">SFC</abbr> design, much as Svelte has done:

```hbs
<script>
  const isChristmas = date =>
    date.getMonth() === 11 &&
    date.getDate() === 25;
</script>

<style>
  .christmas {
    color: green;
    background: red;
  }
</style>

{{#if (isChristmas @today)}}
  <p class='christmas'>Merry Christmas!</p>
{{/if}}
```

Notice, however, that even here with an <abbr>SFC</abbr> design we do not *need* to use a `<style>` tag, because the semantics of template imports make JavaScript values available to the template. If we wanted to use [vanilla-extract][vanilla] instead, we could do that:

```hbs
<script>
  import { style } from '@vanilla-extract/css';
  
  const christmas = style({
    color: 'green',
    background: 'red',
  });

  const isChristmas = date =>
    date.getMonth() === 11 &&
    date.getDate() === 25;
</script>

{{#if (isChristmas @today)}}
  <p class={{christmas}}>Merry Christmas!</p>
{{/if}}
```

Exactly the same holds for the template literals and `<template>` designs: as long as we provide a value in a way that can be integrated into the `precompileTemplate` invocation which *all* of these formats compile to, it will “just work.”[^just-work] And indeed, that means that these even work with imports-only, though with the usual constraints:

```js
import { style } from '@vanilla-extract/css';
  
export const christmas = style({
  color: 'green',
  background: 'red',
});

export const isChristmas = date =>
  date.getMonth() === 11 &&
  date.getDate() === 25;
```

```hbs
---
import { isChristmas, christmas } from './christmas.js';
---

{{#if (isChristmas @today)}}
  <p class={{christmas}}>Merry Christmas!</p>
{{/if}}
```

In the case of the `<template>` design in particular, I can imagine that community members might want to implement a `<style>` element which compiles a CSS language declaration to a scoped value:

```js
const Style = <style>
  .christmas {
    color: 'green';
    background: 'red';
  }
</style>

const isChristmas = date =>
  date.getMonth() === 11 &&
  date.getDate() === 25;

<template>
  {{#if (isChristmas @today)}}
    <p class={{Style.christmas}}>Merry Christmas!</p>
  {{/if}}
</template>
```

This is quite nice! But again, the key point is that *this does not need to be built into the framework*: there is no fundamental coupling between the way we generate our styles and the rendering or state management layers. The upside to the template imports design is that any and all such solutions “just work.” It may even be that in the future, we as a community find one that we particularly prefer and therefore write an <abbr title="request for comments">RFC</abbr> to ship out-of-the-box support for it. But it simply isn’t a constraint in any way for the design of template imports. Next up: [the conclusion of the series](https://v5.chriskrycho.com/journal/ember-template-imports/part-6/), with a summary analysis of the tradeoffs!

[^just-work]: If you’d like to prove this to yourself, create a new app on Ember 3.28.4+, and make a component JavaScript file with this body and render it:

    ```js
    import { precompileTemplate } from '@ember/template-compilation';
    import { setComponentTemplate } from '@ember/component';
    import templateOnly from '@ember/component/template-only';
    import { helper } from '@ember/component/helper';

    const Style = {
      christmas: 'christmas_1234abcd',
      normal: 'normal_9876beef',
    };

    const isChristmas = helper(
      ([date]) =>
        date.getMonth() === 11 &&
        date.getDate() === 25
    );

    const now = helper(() => new Date());

    const template = precompileTemplate(
      `
      {{#if (isChristmas (now))}}
        <p class={{Style.christmas}}>Happy Christmas!</p>
      {{else}}
        <p class={{Style.normal}}>Have a nice day!</p>
      {{/if}}
      `,
      {
        scope: { Style, isChristmas, now },
      }
    );

    export default setComponentTemplate(template, templateOnly());
    ```
    
    Then you can check that it applies the correct class in the inspector.
