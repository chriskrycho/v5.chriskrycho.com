---
title: Patterns for “Smart” Components in Ember
subtitle: …which generalize to other frameworks pretty well, too.
qualifiers:
  audience: >
    Other front-end web developers, especially (though not exclusively) Ember and Glimmer developers.
date: 2022-12-21T10:15:00-0700
tags:
  - JavaScript
  - web development
  - Ember
  - Glimmer
summary: >
  When you need to fetch data in a component, derive the API call as *data* from your arguments, instead of treating it as an “effect”.
templateEngineOverride: md

---

<section class='note' aria-label='note' aria-role='note'>

I’m experimenting with just publishing things I write up for work with only a minimum of extra context and editing so they live *somewhere* outside our work Slack account and have a chance of being useful to others. Expect these to be extra off-the-cuff!

</seciton>

There is a lot of legacy Ember Classic code out there which used “smart” components for data loading. In many cases, that initialization ran in an old `init` hook, or sometimes a `didReceiveAttrs` or similar hook. In all cases, this model is incompatible with the Ember Octane programming model (and with any strict “data down, actions up” or one-way data flow paradigm).

Instead of an observer-style “my arguments updated, so I need to *trigger new actions*” work-flow, one-way-data-flow models represent this kind of thing as “derived state”. The basic pattern is to use something like [ember-async-data](https://github.com/tracked-tools/ember-async-data) and [Ember's `@cached` decorator](https://api.emberjs.com/ember/4.7/functions/@glimmer%2Ftracking/cached) to produce data from remote <abbr title="application programming interface">API</abbr> calls in a safe way.

Here’s what that looks like in practice. Assume you have a component like this:

```js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

class BadTimes extends Component {
  @service store;

  @tracked a;
  @tracked b;

  constructor() {
    super(...arguments);
    this._fetchResults();
  }

  _fetchResults() {
    this.store
      .findRecord('some-type', this.args.id)
      .then((a) => {
        this.a = a;
        return this.store.findRecord('another', a.otherId);
      })
      .then((b) => {
        this.b = b;
      });
  }
}
```
```hbs
<p>{{if this.a.isResolved this.a.value '...'}}</p>
<p>{{if this.b.isResolved this.b.value '...'}}</p>
```

This has latent bugs, and in many cases will trigger deprecations as you migrate to Ember v4: if you happen to *read* `this.a` or `this.b` during rendering, Ember will correctly reject it entirely: that is a good way to end up infinitely rerendering.

Instead, you can do something like this:

```js
import Component from '@glimmer/component';
import { cached } from '@glimmer/tracking';
import TrackedAsyncData from 'ember-async-data';

class BadTimes extends Component {
  @cached get _a() {
    return this.store.findRecord('some-type', this.args.id);
  }

  @cached get _b() {
    return this._a.then((a) => this.store.findRecord('another', a.otherId));
  }

  get a() {
    return new TrackedAsyncData(this._a);
  }

  get b() {
    return new TrackedAsyncData(this._b);
  }
}
```

The `_a` and `_b` getters will each return a `Promise`. Since we use `@cached`, there will only ever be a single instance of each promise for any given `@id` argument, but we will automatically build a new one if `@id` changes. By wrapping each of those in a `TrackedAsyncData`, we can get an auto-tracked view into the state of the `Promise`s.

Two bonus notes:

1. If you don’t need to have, or want to avoid, a rendering cascade where you update your UI once when `_a` resolves and *again* when `_b` resolves, you can chain the promise together and wrap it in single `TrackedAsyncData`:

    ```js
    import Component from '@glimmer/component';
    import { cached } from '@glimmer/tracking';
    import TrackedAsyncData from 'ember-async-data';

    class BadTimes extends Component {
      @cached get data() {
        const promise = this.store
          .findRecord('some-type', this.args.id)
          .then((a) => {
            return this.store
              .findRecord('another', a.otherId)
              .then((b) => ({ a, b }))
          });

        return new TrackedAsyncData(promise);
      }
    }
    ```
    ```hbs
    <p>{{if this.data.isResolved this.data.a.value '...'}}</p>
    <p>{{if this.data.isResolved this.data.b.value '...'}}</p>
    ```

2. This *exact* same pattern works across most modern web frameworks—especially Vue, React, and Svelte. Instead of treating data loading as an ‘effect’, we can treat it as ‘data’.

I don’t necessarily *recommend* this pattern—I generally think you’re better off doing this kind of data loading at the route level, including “hoisting” the loading up to the top so that you avoid janky <abbr title="user interface">UI</abbr>s with lots of [layout shift](https://developer.mozilla.org/en-US/docs/Web/API/LayoutShift), by loading all your data together and thinking about how to avoid blocking/chaining <abbr>API</abbr> calls… but sometimes this is a useful tool for either migrating existing code *or* for places where you *do* want a lazy bit of data fetching.

