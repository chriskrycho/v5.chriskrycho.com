---
title: Higher-Order Components in Ember.js
date: 2018-05-26 14:00:00
tags: [emberjs, javascript, typescript]
subtitle: >
    Components as arguments! Components getting yielded! Components everywhere!
summary: >
    Components as arguments! Components getting yielded! Components everywhere! A powerful way to make your Ember.js components more flexible and composeable.
modified: 2018-05-28 06:50:00
canonical: https://v4.chriskrycho.com/2018/higher-order-components-in-emberjs.html
templateEngineOverride: 'md' # needed b/c it tries to parse stuff wrong
---

One of the most powerful patterns in programming is the idea of *higher-order functions*: functions which can take other functions as arguments or return them as their return values. If you’ve spent much time at all working in JavaScript, you’ve certainly encountered these—whether you’re using `Array.map` to transform the values in an array, or passing a function as an argument to an event handler.

The same pattern is incredibly useful in building components, and most modern front-end frameworks support it—including Ember.js! (In React, the pattern as a whole is often known as the `renderProps` pattern, for the way you most often accomplish it. It's all the same idea, though!)

In this little post, I’ll show you how to build a small “higher-order component” in Ember.js, hopefully demystifying that term a little bit a long the way. (If you just want to see how the pieces fit together, you can see the finished app [in this repo](https://github.com/chriskrycho/ember-hoc-example).)

<aside>

I’m going to be using classes and decorators throughout. Both are very much ready-to-go in Ember, and I commend them to you! I’m also going to be using some of the new [optional features](https://emberjs.com/blog/2018/04/13/ember-3-1-released.html#toc_introducing-optional-features-3-of-4) available in Ember 3.1+ to use template-only components!

Note that one of the most important consequences of this is that arguments have to be referenced as `@theArgumentName` rather than just `theArgumentName` in templates. The reason is precisely that there is no backing JavaScript component. In old-school Ember.js components, `{{theArgumentName}}` is implicitly turned into `{{this.argumentName}}`, which does a lookup on the backing component. In Glimmer-style components—of which these are the first part—arguments live on a designated `args` property and are accessible in templates via `@theArgumentName` instead.

</aside>

## Higher-Order Components, What Are They

Just like with a “higher-order function,” all we mean when we talk about a “higher-order component” is a component which takes other components as arguments, returns other components itself (in Ember’s case via `yield` in a template), or both.

The thing we’re actually going to build here is a “modal” which accepts an optional button as an arguments, and which yields out a component for dividing the modal into sections visually so you can pass your own content in and have it look just right. This is closely based on a component my colleagues and I at Olo built recently, just with some of our specific details stripped away to get at the actually important bits. Here's what it looks like in practice:

<figure>
<img src="https://f001.backblazeb2.com/file/chriskrycho-com/images/hoc-rendered.png" alt="modal component with sections">
<figcaption>a modal with sectioned text and a close button</figcaption>
</figure>

The goal for the button arguments is to let the modal be able to render the button the caller passes in, while not being concerned with the *functionality* of the button. Otherwise, we’d have to tie the “API” of the modal to the details of button behavior, bind more actions into it, etc.

The goal for the yielded sectioning component is for whatever is rendering the modal itself to be able to pass content in and get it chunked up however the modal decides is appropriate—the modal can display its own styles, etc.—without having to worry about the details of applying classes or sectioning up the content itself.

In short, we want to *separate our concerns*: the modal knows how to lay out its contents and where to put buttons, but it doesn’t want to have to know *anything* about what the buttons do. The most complicated interaction in the world could be going on, and the modal won’t have to care. Likewise, things *using* the modal can pass content and buttons into it, and let the modal manage its own layout and so on without having to be concerned with the details of that. So what does that look like in practice?

The approach I use here builds on the "contextual components" pattern in Ember.js. The main new idea is that the *context* includes components!

## Implementing It

We have three components here:

- a button
- a modal
- a modal section

Since Ember.js still (for now!) requires component names to be at least two words separated by a dash, we’ll just call these `x-button`, `Modal`, and `ModalSection`.

### `Button`

The button component, we’ll keep pretty simple: it’s just a button element with a given label and an action bound to it:

```htmlbars
<button type='button' ...attributes {{on "click" @onClick}}>
  {{@label}}
</button>
```

### `Modal`

The `Modal` has the meat of the implementation.

```htmlbars
<div class='modal-backdrop'></div>
<div class='modal'>
  <div class='modal-content'>
    {{yield (hash section=(component 'modal-section'))}}
  </div>

  {{#if @button}}
    <@button class='modal-button' />
  {{/if}}
</div>
```

The two things two notice here are the `yield` and the `component`.

The `yield` statement yields a [`hash`](https://www.emberjs.com/api/ember/3.1/classes/Ember.Templates.helpers) with one property: `section`. Yielding a hash is a convenient pattern in general. Here, we’re doing it to make the <abbr>API</abbr> nicer for users of this component. It means that if we name the yielded value `|modal|` when we invoke this, we’ll be able to write `modal.section` to name this particular yielded item. (You’ll see exactly this below.)

We use the `component` helper twice: once as the value of the `section` key in the yielded hash, and once for the `button` below. In both cases, the helper does the same thing: invokes a component! While the most common way to render a component is with its name, inline—like `{{Modal}}`—you can always render it with the `component` helper and the name as a string: `{{component 'modal'}}`. This lets you render different components dynamically!

Let’s remember our initial analogy: the same way you can pass different functions to a higher-order function like `Array.prototype.map`, you can pass different components to a higher-order component like our `Modal` here. And just like you can *return* a function from a higher-order function, we can *yield* a component from a higher-order component. Just like higher-order functions, the function passed in or returned just has to have the right shape.

For example, the argument to `Array.prototype.map` needs to be a function which performs an operation on a single item in the array (and maybe also the index) and hands back the result of that operation. Similarly, the `button` argument to our `Modal` needs to accept a `buttonClass` component so that the modal can apply some styling to it. The same thing holds for the component being yielded back out: it has an <abbr>API</abbr> you should use to invoke it, just like any other.[^1]

All of this gets at something really important: you can think of components as just being *pure functions*: they take some input in the form of arguments, and give you the output of what they *render* and what they *yield*—and they always give you the same rendered <abbr>HTML</abbr> and the same yielded values for the same inputs. They're just functions!

### `ModalSection`

The `ModalSection` component is the simplest of all of these: it has no behavior, just some styling to actually chunk up the content:

```htmlbars
<div class='ModalSection'>
  {{yield}}
</div>
```

### Application controller and template

Now, let’s use in the context of the application template, where we can see how the pieces all fit together. First, let's see the application controller backing it—nothing unusual here, just a simple toggle to show or hide the modal.[^2]

```ts
import Controller from "@ember/controller";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class Application extends Controller {
  @tracked showModal = false;

  @action showIt() {
    this.showModal = true
  }

  @action hideIt() {
    this.showModal = false;
  }
}
```

Now for the interesting bit—the template where we invoke `Modal` and use its higher-order-component functionality:

```htmlbars
{{#if this.showModal}}
  <Modal
    @button={{component 'button'
      label='Close modal!'
      onClick=(fn this.hideIt)
    }}
    as |modal|
  >
    <modal.Section>
      Here is some content!
    </modal.Section>

    <modal.Section>
      Here is some other content.
    </modal.Section>

    <modal.Section>
      <p>The content can have its own sections, as you'd expect!</p>
      <p>Nothing crazy going on here. Just a normal template!</p>
    </modal.Section>
  </Modal>
{{/if}}

<button class='button' {{on "click" (fn this.showIt)}}>Show modal</button>

<!-- some other content on the page -->
```

We invoke the block form of `Modal` just like we would any block component, and we get back the thing it yields with `as |modal|`. However, one of the arguments we pass to it is a component. But `modal` is a `hash` (an object!) with a property named `section`, which is the `ModalSection` component.

Again, you can think of this like calling a function with one function as an argument and getting another function back as its return value—that returned function being something we could call over and over again once we had it.

Here, we "call the function"—invoke the `Modal` component—with `component 'x-button'` as its argument, and the returned `modal.section` is a component we can invoke like a normal component.[^3] We could even pass it into some *other* component itself if we so desired.

And that's really all there is to it!

##  Summary

"Higher-order components" aren't necessarily something you need all the time, but they're really convenient and very powerful when you *do* need them. They're also a lot less complicated than the name might seem! Components are just things you can pass around in the context of a component template—they're the *functions* of htmlbars.[^3]

Splitting things into components like this does increase complexity, and in particular it can increase the mental overhead of keeping track of how the pieces fit together. However, they also let us cleanly separate different pieces of functionality from each other. Doing it this way means that our modal can be concerned about *positioning* a button without needing to expose an <abbr>API</abbr> for all of the button's own mechanics for handling clicks and performing whatever actions necessary. That makes our modal *and* our button way more reusable across our application. The button can be used *wherever* a button is useful, and the modal doesn't need to know or care anything about it. Likewise, the button has no need to know anything about the context where it's being used; from the button component's perspective, it just gets wired up to some actions as usual. The same thing goes for the modal sections: they let us abstract over how the <abbr title='document object model'>DOM</abbr> is laid out, what classes are applied to it, and so on—they chunk up the modal, but the modal itself maintains responsibility for how that chunking up happens. And the caller doesn't even *have* to use that; it's just a tool that's available for that purpose.

To sum it all up, I'll just reiterate my earlier description: components are just like pure functions: the same inputs give you the same outputs—and, just like functions, those inputs and outputs can be other functions, that is, other components.



[^1]: If you want a good way to document the things a component `yield`s, check out [ember-cli-addon-docs](https://ember-learn.github.io/ember-cli-addon-docs/latest/docs/api/components/docs-demo), which can read an `@yield` JSDoc annotation.

[^2]: And it could just as well be a component; the top-level controller template is just where we put our main app functionality.

[^3]: If you're inclined to "well actually" me about *helpers* being the real functions of htmlbars templates: in the Glimmer <abbr>VM</abbr> world, helpers are just a kind of component.
