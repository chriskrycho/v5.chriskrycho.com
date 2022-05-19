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
image: https://cdn.chriskrycho.com/file/chriskrycho-com/images/modifiers.png
updated: 2022-05-19T09:22:00-0600
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

To conditionally apply a modifier in a template:

1. You must import the modifier and set it as a property on the backing class on the component. (Ember did not implement support for string-based resolution with `helper` and `modifier`; I will discuss the reasons why and the future direction here below.)

2. You must then reference that modifier using the `modifier` helper in the template, with a conditional in the template or with a getter to return the modifier or not based on your logic.

Returning to our example from above, we can imagine that we only want to track the *first* time someone clicks the add to cart button for a given item. In that case, we'll introduce some tracked state to indicate whether the item has been clicked, and an action to update it, which we will wire up with another `{{on}}` modifier.

```js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import TrackInteraction from 'my-tracking-lib/modifiers/track-impression';

export default class Item extends Component {
  @tracked hasBeenClicked = false;

  get trackInteraction() {
    return !this.hasBeenClicked ? TrackInteraction : null;
  }

  markAsClicked = () => {
    this.hasBeenClicked = true;
  };

  customizeClickData = (trackingData) => {
    // use backing class state to customize tracking event...
  };
}
```

Then we can invoke that modifier directly using the `modifier` helper:

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

There are two key things to notice here:

1. The `modifier` invocation is wrapped in "extra" parentheses: `{{(modifier ...)}}`. This is not a mistake. The parentheses here are the syntax for immediately invoking a helper when rendering. We need to do that because `modifier` is a *helper*, but it is appearing here in the position of a *modifier*. Ember will throw a build error if you don't include the parentheses, because helpers aren't allowed there.

     The value *produced* by the `modifier` helper is a modifier, so Ember will run the helper and get out the modifier needed for using it in this position to be valid. Put another way, `modifier` is a higher-order function which *returns* a modifier instance using on the modifier definition you supply it.

2. We pass `this.trackInteraction` directly to `modifier`. Just like `component`, `modifier` and `helper` handle `null` and `undefined` by simply ignoring them. That is, when you call `{{(modifier null)}}`, the result is a no-op modifier.

Those two pieces combine such that you can also work with conditionals directly in the template with `modifier` invocations if you so choose. Instead of the getter which produces the modifier or `null`, you could also write your component like this:

```hbs
<button
  type="button"
  {{on "click" @addToCart}}
  {{on "click" this.markAsClicked}}
  {{(unless
    this.hasBeenClicked
    (modifier
      this.trackInteraction "click" customizeData=this.customizeClickData
    )
  )}}
>
  Add to Cart
</button>
```

Or this:

```hbs
<button
  type="button"
  {{on "click" @addToCart}}
  {{(modifier
    (unless this.hasBeenClicked this.trackInteraction)
    "click"
    customizeData=this.customizeClickData
  )}}
>
  Add to Cart
</button>
```

Which you choose depends on the use case:

-   the `{{(unless ...` version is handy if you just want to pick between having a modifier or not.
-   the `{{(modifier (unless ...` version is handy if you want to pick between modifiers to dispatch to with the same args (unusual but not impossible!)
-   the getter version is handy for the cases where you have more “interesting” logic to determine what to do

## The future

As mentioned briefly above, Ember has not implemented support for the classic string-based resolver used to look up components, helpers, and modifiers directly. That is, while you can do `{{component "some-component"}}`, you cannot do `{{modifier "some-modifier"}}`. This is because we are in the process of rolling out support for a much nicer and easier-to-use design: [First-Class Component Templates][fcct], i.e. `<template>` tags.

[fcct]: https://rfcs.emberjs.com/id/0779-first-class-component-templates

`<template>` tags, among their [many other benefits][series], make this use case much simpler. We won’t need to do as much of the dance with the backing class—instead, normal <abbr title="JavaScript">JS</abbr> imports will just work:

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
- You can use this *today* but passing in the modifier or helper you want using a backing class.
- You will be able to do this much more elegantly in the future using `<template>` tags and native <abbr>JS</abbr> imports.

This solves a number of annoyances which existed in Ember before. Hopefully this helps you take advantage of the new capabilities!
