---
title: >
    Ember.js Template Imports: Part 4
subtitle: >
    Keeping, and improving on, one of Ember’s fundamental commitments—and biggest strengths: its integrated testing.
series:
  part: 4
image: https://cdn.chriskrycho.com/file/chriskrycho-com/images/template-imports/part-4-test.png
date: 2021-11-11T15:27:00-0700
tags:
  - testing

templateEngineOverride: md

---

Previously in [Ember Template Imports](https://v5.chriskrycho.com/journal/ember-template-imports/), I’ve [introduced the alternatives](https://v5.chriskrycho.com/journal/ember-template-imports/part-1/), discussed each approach’s [implications for **teaching and understanding**](https://v5.chriskrycho.com/journal/ember-template-imports/part-2/), and looked a bit at how the different approaches [might play out in terms of **tooling**](https://v5.chriskrycho.com/journal/ember-template-imports/part-3/). In this post, I turn to *testing*: something Ember has long focused on, and an area that it’s important to avoid regressing!

<aside>

With the Glimmer Component 2 <abbr title="application programming interface">API</abbr>, there is potentially an even broader range of testing options than Ember’s current support. For example, it would be straightforward to implement `@testing-library/glimmer` to match the other [testing-library](https://testing-library.com) approaches. However, *all of the concerns and constraints I lay out below hold in that case*: it would be an *expansion* of our current story, if we make the right choices. (The fact that other libraries and frameworks may not have a great story here doesn’t mean *we* shouldn’t.)

</aside>

---

Today, Ember allows you to author local snippets of template in tests, which makes certain kinds of component render testing *very* straightforward. This is the familiar inline `hbs` invocation:

```js
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { render } from '@ember/test-helpers';

module('Rendering | Component | MyComponent', function (hooks) {
  test('it renders and yields stuff!', async function (assert) {
    await render(hbs`
      <MyComponent as |mc|>
        <div data-test-hammer>{{mc.hammer}}</div>
      </MyComponent>
    `);

    assert.dom('[data-test-hammer]').hasText("Let's Get it Started");
  });
});
```

Notably, this means you can write a test at the level of an individual component, running it in the browser *without* having to spin up the whole application at the level of an end-to-end test. This is very useful for testing components in isolation and exercising *just* their own API, without testing everything else any given component may be integrated in. It lets us [test the interface][tti] for our components.

[tti]: https://v4.chriskrycho.com/2019/test-the-interface.html

**Both the template literals form and the `<template>` tag form would work well with this.** In the case of template literals, the only thing we would change for tests would be the import path for `hbs`, and in principle we wouldn’t even have to change that: the export from `ember-cli-htmlbars` could simply become a re-export from `@glimmer/component`:

```js
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from '@glimmer/component';
import { render } from '@ember/test-helpers';
import MyComponent from '../app/components/my-component';

module('Rendering | Component | MyComponent', function (hooks) {
  test('it renders and yields stuff!', async function (assert) {
    await render(hbs`
      <MyComponent as |mc|>
        <div data-test-hammer>{{mc.hammer}}</div>
      </MyComponent>
    `);

    assert.dom('[data-test-hammer]').hasText("Let's Get it Started");
  });
});
```

For `<template>` tags, we would simply drop the `hbs` import and replace its usage with `<template>`:

```js
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import MyComponent from '../app/components/my-component';

module('Rendering | Component | MyComponent', function (hooks) {
  test('it renders and yields stuff!', async function (assert) {
    await render(<template>
      <MyComponent as |mc|>
        <div data-test-hammer>{{mc.hammer}}</div>
      </MyComponent>
    </template>);

    assert.dom('[data-test-hammer]').hasText("Let's Get it Started");
  });
});
```

What’s more, because of the rest of the benefits available via strict mode, it becomes that much easier to introduce a test-only component. Historically, to do that we have had to use the registry to do this, with patterns like this:

```js
// imports and setup
this.owner.register(
  'component:test-dummy',
  setComponentTemplate(
    hbs`
      <button
        type='button'
        data-test-cool-button
        {{on "click" this.handleClick}}
      >
        Click!
      </button>
    `,
    class CustomButton extends Component {
      handleClick = () => {
        assert.ok(true, 'got clicked!');
      };
    }
  )
);
```

Once we have either the template literals or `<template>` proposals, this becomes much easier. It’s exactly the same as authoring a component in the first place! This is actually a bonus for our teaching story, which I intentionally skipped over in Part 2 because it’s such a key point of this part. Instead of needing to teach the “special sauce” for testing, authoring a local-only component is identical in app code and test code.

With `<template>`, for example:

```js
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import Component from '@glimmer/component';
import MyModal from '../app/components/my-modal';

module('Rendering | Component | MyComponent', function (hooks) {
  test('it renders and yields stuff!', async function (assert) {
    // one for rendering, one for interacting
    assert.expect(2);

    class CustomButton extends Component {
      handleClick = () => {
        assert.ok(true, 'got clicked!')
      }
      
      <template>
        <button
          type='button'
          data-test-cool-button
          {{on "click" this.handleClick}}
        >
          Click!
        </button>
      </template>
    }

    await render(<template>
      <MyModal @closeButton={{CustomButton}} />
    </template>);

    assert
      .dom('[data-test-cool-button]')
      .exists('the button gets rendered');

    // Trigger the button click, which will trigger the `handleClick` assertion
    // if the component is wired up correctly!
    await click('[data-test-cool-button]')
  });
});
```

This would be effectively identical with `hbs`, with the relevant substitution of `static template = hbs...`.

<details><summary>see it with <code>hbs</code></summary>

```js
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import Component, { hbs } from '@glimmer/component';
import MyModal from '../app/components/my-modal';

module('Rendering | Component | MyComponent', function (hooks) {
  test('it renders and yields stuff!', async function (assert) {
    // one for rendering, one for interacting
    assert.expect(2);

    class CustomButton extends Component {
      handleClick = () => {
        assert.ok(true, 'got clicked!')
      }
      
      static template = hbs`
        <button
          type='button'
          data-test-cool-button
          {{on "click" this.handleClick}}
        >
          Click!
        </button>
      `;
    }

    await render(hbs`
      <MyModal @closeButton={{CustomButton}} />
    `);

    assert
      .dom('[data-test-cool-button]')
      .exists('the button gets rendered');

    // Trigger the button click, which will trigger the `handleClick` assertion
    // if the component is wired up correctly!
    await click('[data-test-cool-button]')
  });
});
```

</details>

**This would be impossible with the Vue/Svelte-style <abbr title="single-file component">SFC</abbr> or with the imports-only proposal.** While you can absolutely test *existing* components with those formats by importing them and rendering them, you cannot author new ones locally. That means that to avoid regressing our existing test infrastructure—a non-negotiable—we would need to maintain a separate syntax used only in testing to support these kinds of tests.  It would, most likely, need to be something roughly the shape of the template literals proposal, in fact—that’s the lowest lift from where we are today.

The fallout here is pretty significant in my view:

- To make that a good experience, we would need to make the full investment in tooling described in Part 3… for *both* formats. That’s double the effort up front, and double the ongoing maintenance costs. The only alternative would be leaving testing a second-class experience, and I think that’s a non-starter.

- It would leave us in the position we are in today, where we have different behavior for tests than for runtime code—and have to teach accordingly. But one of the big potential upsides of template strict mode is that we can significantly reduce the number of concepts Ember and Glimmer developers need to learn to be productive. These kinds of opportunities don’t come along often; we shouldn’t squander this one.

- Experientially, we would be dangling in front of people the ability to author local components, and then telling them they can’t do it in app code. Personally, I would find that incredibly frustrating. More and worse, I cannot imagine trying to explain it to the hundreds of developers I support on the flagship app at LinkedIn!

From where I stand, this is *the* fundamental reason to use either `hbs` or `<template>` over a Vue- or Svelte-style <abbr title="single-file component">SFC</abbr> approach. Testing is a fundamental concern of building applications, and Ember has long done well to prioritize it. The design for template imports should take that as a fundamental constraint as well.

As for the differences between `hbs` and `<template>` here: there really aren’t any from a testing point of view. There *is* a migration cost if we use `<template>`, since all existing integration tests would have to be rewritten in terms of the new syntax. However, this cost is very low: it is straightforward to write a thorough and robust codemod for it. Any existing `render()` call with an `hbs` body can be replaced with one a `<template>` body instead. The semantics are identical, and both are equally flexible for defining local components. The tradeoffs besides migration reduce to those discussed in previous posts.

Thus, as with the **Tooling** discussion in Part 3, `hbs` has a slight edge over any other proposal simply in terms of existing usage. However, beyond that, both `<template>` and `hbs` both are *far* better than imports-only or <abbr>SFC</abbr>s in this case. For those keeping score, that makes my current evaluation:

- **Teaching:** `<template>` the winner across the board, followed by <abbr>SFC</abbr>s, then imports-only, then `hbs`
- **Tooling:** `hbs` only *slightly* better than the other options
- **Testing:** `hbs` slightly better than `<template>` because it has effectively no migration cost; but both far better than either the <abbr>SFC</abbr> or imports-only proposals

The net, as I’ll cover in a bit more detail in the final post in the series, is that even though `hbs` comes out slightly ahead in the tooling and testing categories, I think `<template>` remains the clear winner overall.