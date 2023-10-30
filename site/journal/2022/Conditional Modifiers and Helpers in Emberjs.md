---
title: Conditional Modifiers and Helpers in Ember
subtitle: A handy feature you can use in recent versions of Ember.
date: 2022-05-18T14:10:00-0600
tags:
  - Ember
  - JavaScript
  - web development
qualifiers:
  audience: >
    Ember.js developers—folks familiar with other frameworks may also benefit, but I assume familiarity with Ember throughout.
summary: >
  Ember.js 3.27 introduced the `helper` and `modifier` helpers to complement the `component` helper, allowing for conditional application of helpers and modifiers.
templateEngineOverride: md
image: https://cdn.chriskrycho.com/images/modifiers.png
updated: 2023-08-12T09:15:00-0600
updates:
  - at: 2022-05-19T09:01:00-0600
    changes: >
      Corrected the Ember version required for using the feature: it needs to be 3.27, not 3.25.
  - at: 2022-05-19T09:22:00-0600
    changes: >
      Fixed a bug in a code sample and update the text to match the code sample.
  - at: 2022-05-19T12:24:00-0600
    changes: >
      Fixed a typo/mismatch between code sample and the text.
  - at: 2022-07-23T14:05:00-0600
    changes: >
      Corrected an error in the original text about string-based lookup of helpers and modifiers.
  - at: 2023-08-12T09:15:00-0600
    changes: >
      Rewrote the section on conditional modifier application to account for Ember’s assertions forbidding dynamic strings as arguments to the `component`, `helper`, and `modifier` keywords in 3.28 and later.
thanks: >
  Rob Jackson let me know that we did ultimately add support for string-based invocations. Jarek Radosz let me know about the dynamic string assertion in Ember 3.28 and later.

---

[Ember 3.27][3-27] introduced two new template helpers: `modifier` and `helper`. These, like the `component` helper which has been around for years, allow you to work with modifiers and helpers _conditionally_ in your templates. This is particularly helpful for dealing with helpers and modifiers you don't own, where you cannot add conditional behavior to them for some reason, and need to only enable them in specific scenarios.

[3-27]: https://blog.emberjs.com/ember-3-27-released

For the rest of this post, I am going to focus on modifiers, because they are the most interesting use case here, but these same things all apply with appropriate tweaks to helpers.

## Why?

As a motivating scenario, consider a library you use to track interactions at the level of a given <abbr title="hypertext markup language">HTML</abbr> element. You might use this for A/B testing, for example: *I know that with the feature turned on, users clicked the Add to Cart button more often than with the feature turned off.* Using a modifier like that might look something like this in practice, say within an item for sale in an online store:

```hbs
<button
  type="button"
  {{on "click" @addToCart}}
  {{track-interaction "click" customizeData=this.customizeClickData}}
>
  Add to Cart
</button>
```

Here, the `{{track-interaction}}` modifier will fire off an event—presumably through a tracking service or something—when a user clicks the button. The `customizeData` argument allows the user to customize the data they send back to the server for any given click event:

```js
import Component from '@glimmer/component';

export default class Item extends Component {
  // the rest of the class

  customizeClickData = (trackingData) => {
    // use backing class state to customize tracking event...
  };
}
```

So far so good, but what if you need to decide *not* to track a click based on some condition? Up until Ember 3.27, you had to extract the condition to a conditional outside the targeted <abbr title="document object model">DOM</abbr> element and apply it:

```hbs
{{#if this.shouldTrack}}
  <button
    type="button"
    {{on "click" @addToCart}}
    {{track-interaction "click" customizeData=this.customizeClickData}}
  >
    Add to Cart
  </button>
{{else}}
  <button type="button" {{on "click" @addToCart}}>
    Add to Cart
  </button>
{{/if}}
```

This is not merely an annoyance, though it is certainly that! For sufficiently complicated templates, this could cause the templates to blow up size-wise. Worse, for some kinds of overlapping conditions, it could become literally impossible to cover all the conditions correctly. This was an obvious gap in the design of modifiers (and helpers!) so in Ember 3.27, Ember introduced the ability to apply a helper or modifier conditionally.

## How?

To conditionally apply a modifier in a template, you must reference that modifier using the `modifier` helper in the template, with a conditional in the template or with a getter to return the modifier or not based on your logic.


### The basics

Returning to our example from above, we can imagine that we only want to track the *first* time someone clicks the add to cart button for a given item. In that case, we'll introduce some tracked state to indicate whether the item has been clicked, and an action to update it, which we will wire up with another `{{on}}` modifier.

```js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class Item extends Component {
  @tracked hasBeenClicked = false;

  markAsClicked = () => {
    this.hasBeenClicked = true;
  };

  customizeClickData = (trackingData) => {
    // use backing class state to customize tracking event...
  };
}
```

Just like the `component` helper, the `modifier` and `helper` helpers handle `null` and `undefined` by simply ignoring them. In other words, when you call `{{(modifier null)}}`, the result is a no-op modifier. Thus, we can invoke the `track-interaction` modifier using the `modifier` helper along with the `unless` helper to only fire it when `this.hasBeenClicked` is not yet `true`:

```hbs
<button
  type="button"
  {{on "click" @addToCart}}
  {{on "click" this.markAsClicked}}
  {{(unless
    this.hasBeenClicked
    (modifier "track-interaction" "click" customizeData=this.customizeClickData)
  )}}
>
  Add to Cart
</button>
```

Notice that the `unless` invocation is wrapped in "extra" parentheses: `{{(unless ...)}}`. *This is not a mistake.* The parentheses here are the syntax for immediately invoking a helper when rendering. We need to do that because `unless` and `modifier` are both helpers, but are appearing here in the position of a modifier. Ember will throw a build error if you don't include the parentheses, because helpers aren't allowed there! When Ember runs the helper, though, the result is a modifier—exactly what we need to use it here. (Put another way, `modifier` is a higher-order function which *returns* a modifier instance using on the modifier definition you supply it.)

The order here is also important: we need to pass a static value to the `modifier` helper. Ember 3.28 and later forbid dynamically constructing strings passed to the `component`, `helper`, and `modifier` helpers so that the templates can be statically analyzed and are easier to migrate to strict-mode templates using `<template>`. This is also much friendlier to TypeScript analysis with [Glint](https://typed-ember.gitbook.io/glint)!


### By reference instead of by name

As part of the work on Ember's new strict mode templates, Ember 3.25 introduced the ability to invoke modifiers, helpers, and components by *reference*, not just by *name*. This was ultimately needed to unblock [first-class component templates][fcct] and the `<template>` tag—see below under [**The Future**](#the-future)—but it also means that we can use backing classes to accomplish some of the same things today.

```js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import TrackInteraction from 'my-tracking-lib/modifiers/track-impression';

export default class Item extends Component {
  @tracked hasBeenClicked = false;

  get trackInteraction() {
    return this.hasBeenClicked ? null : TrackInteraction;
  }

  markAsClicked = () => {
    this.hasBeenClicked = true;
  };

  customizeClickData = (trackingData) => {
    // use backing class state to customize tracking event...
  };
}
```

Now we can pass `this.trackInteraction` directly to `modifier` instead of referring to it by name:

```hbs
<button
  type="button"
  {{on "click" @addToCart}}
  {{on "click" this.markAsClicked}}
  {{(modifier
    this.trackInteraction
    "click"
    customizeData=this.customizeClickData
    onSuccess=this.hasBeenTracked
  )}}
>
  Add to Cart
</button>
```

This approach of using a getter version is especially handy for the cases where you have more “interesting” logic to determine what to do. It also points to the future, where in many cases we won't need a backing class at all.


## The future

As mentioned briefly above, we are in the process of rolling out support for a much nicer and easier-to-use design: [First-Class Component Templates][fcct], i.e. `<template>` tags. Among their [many other benefits][series], `<template>` tags make this use case much simpler. We won’t need to do as much of the dance with the backing class—instead, normal <abbr title="JavaScript">JS</abbr> imports will just work:

[fcct]: https://rfcs.emberjs.com/id/0779-first-class-component-templates
[series]: https://v5.chriskrycho.com/journal/ember-template-imports/

```js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import TrackInteraction from 'my-tracking-lib/modifiers/track-impression';

export default class Example extends Component {
  @tracked hasBeenClicked = false;

  markAsClicked = () => {
    this.hasBeenClicked = true;
  };

  customizeClickData = (trackingData) => {
    // use state to customize tracking event...
  };

  <template>
    <button
      type="button"
      {{on "click" @addToCart}}
      {{on "click" this.markAsClicked}}
      {{(unless
        this.hasBeenClicked
        (modifier
          TrackInteraction "click" customizeData=this.customizeClickData
        )
      )}}
    >
      Add to Cart
    </button>
  </template>
}
```

What’s more, in many cases this kind of thing can just be a simple template-only component:

```js
import TrackInteraction from 'my-tracking-lib/modifiers/track-impression';

function customizeData(someArg) {
  return (trackingData) => {
    // use `someArg` to customize the data instead of using a backing class...
    // ...
  };
}

<template>
  <button
    type="button"
    {{(unless
      @doNotTrack
      (modifier TrackInteraction "click" customizeData=(customizeData @someArg))
    )}}
  >
    Do something!
  </button>
</template>
```

## Summary

To wrap this all up nicely:

- As of Ember 3.27, you can use the new `helper` and `modifier` helpers to apply helpers and modifiers conditionally in Ember templates.
- When doing so, you will need to use the `{{(modifier ...)}}` syntax to immediately invoke the helper and get back the modifier instance it produces.
- You can use this *today* by using the string name or by passing in the modifier or helper you want by reference via a backing class.
- You will be able to do this much more elegantly in the future using `<template>` tags and native <abbr>JS</abbr> imports.

This solves a number of annoyances which existed in Ember before. Hopefully this helps you take advantage of the new capabilities!
