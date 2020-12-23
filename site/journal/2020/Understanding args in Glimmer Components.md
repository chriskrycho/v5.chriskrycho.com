---
title: Understanding `args` in Glimmer Components
subtitle: Clearing up a common confusion with a worked example.
date: 2020-12-22T21:05:00-0700
updated: 2020-12-22T21:12:00-0700
image: https://cdn.chriskrycho.com/file/chriskrycho-com/images/args.png
summary: >
  Many developer assume this is more magic going on with Glimmer components’ arguments than there really is. Let’s see how they actually work!
qualifiers:
  audience: >
    Software developers working with Ember Octane; also developers with a decent amount of JavaScript knowledge interested in deepening their understanding of modern JavaScript.

thanks: >
  A conversation with [Nathaniel Furniss](https://www.linkedin.com/in/nlfurniss/) helped me see the value of stripping out all the autotracking and Ember/Glimmer-isms for explaining this concept. [Chris Garrett](https://pzuraq.com) ([@pzuraq](https://github.com/pzuraq)) pointed me to the actual Glimmer implementation of the concepts discussed in this post, and he and [Ilya Radchenko](https://ilyaradchenko.com) reviewed its contents.

tags:
  - software development
  - Ember
  - JavaScript
  - mental models

templateEngineOverride: md

---

One of the most consistent confusions I see as I support the LinkedIn.com migration to [Ember Octane](https://emberjs.com/editions/octane/) is how to think about `args` in Glimmer components. In particular, I consistently see people struggling with how to understand *updates* to `args` what they can and cannot do with them. In this post, I hope to make it much clearer by working through an example of how `args` are passed from component to component, but in plain JavaScript: using a slightly simplified version of the `Component` API with no autotracking in sight. By the end of the post, you should have a clear handle on what will and won’t work in the body of a Glimmer component—and, more importantly, *why*.

*[API]: application programming interface

<aside>

I’ve already written [a deep dive](https://v5.chriskrycho.com/journal/autotracking-elegant-dx-via-cutting-edge-cs/) on how the autotracking system works, but that was genuinely a *deep* dive. You don’t need to understand any of that for this post: that’s the whole point, in fact.

</aside>

## Part I: Understanding

Let’s start by looking at [the actual Glimmer component API](https://api.emberjs.com/ember/3.23/modules/@glimmer%2Fcomponent) (using TypeScript syntax just to help see what each property is):

```ts
class Component {
  constructor(owner: Owner, args: object) { /* ... */ }

  willDestroy(): void { /* ... */ }

  isDestroying: boolean;
  isDestroyed: boolean;
}
```

This is already a pretty small surface area, but we can trim it down to get rid of the Ember-specific pieces—

- **Ember-specific:**
    - The `owner` is passed to the constructor make things like service injections possible: **an Ember-specific feature**.
    - The `willDestroy` hook, `isDestroying`, and `isDestroyed` are all lifecycle hooks managed by Ember.

- **Non-Ember-specific:** the `args` are passed to the constructor so that `args` can be available as `this.args` on component instances. This is the piece we care about!

Once we remove all of the Ember-specific pieces, here’s what we’re left with:

```ts
class Component {
  constructor(args: object) { /* ... */ }
}
```

The only thing this actually does is set `args` on the class. We could write that like this:

```ts
class Component {
  args: object;

  constructor(args: object) {
    this.args = args;
  }
}
```

However, the `args` object on a Glimmer component is read-only: you can’t do `this.args = { evil: 'yeah!' }`. We can make it a read-only property by hiding the actual storage as a [private class field](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields) and expose only a getter to access it:

```ts
class Component {
  #args: object;
  get args() {
    return this.#args;
  }

  constructor(args: object) {
    this.#args = args;
  }
}
```

With that in place, only the `Component` base class can change the value of `args`: private class fields are not accessible from child classes. This is all we need to see what patterns do and don’t work with `args` in Glimmer components!

Let’s imagine that we have some bucket of root state representing a user, with a name and an age. In a real app, this might correspond to data that comes from a [`Route` model hook](https://guides.emberjs.com/v3.22.0/routing/specifying-a-routes-model/), or which is stored on a service, or some other means. For our purposes, though, a simple class with some properties and methods to update them will do:

```js
class Root extends Component {
  user = {
    name: 'Chris Krycho';
    age: 33;
  };

  haveABirthday() {
    this.user.age++;
  }

  changeNameTo(newName) {
    this.user.name = newName;
  }
}
```

Now let’s create a `Profile` component class which we can use to manage displaying a user’s profile info.  Here we are just extending the component definition we supplied above.

```js
class Profile extends Component {
  constructor(args) {
    super(args);
  }

  get description() {
    return `${this.args.name} is ${this.args.age} years old`;
  }
}
```

Now we can create an instance of the `Root` and an instance of `Profile`, and pass the `user` in directly as the value for `args`. (There is a subtlety here in how this works in real Glimmer components when passing plain values rather than objects, which I cover in Part II below.)

```js
let root = new Root();
let profile = new Profile(root.user);
console.log(profile.description);
// -> "Chris Krycho is 33 years old"
```

Now if we change the values of the properties on `root` by calling its methods, when we ask for `description` again it will “automatically” have the right value:

```js
root.haveABirthday();
root.changeNameTo("C. D. Krycho");
console.log(profile.description);
// -> "C. D. Krycho Krycho is 34 years old"
```

But the “automatically” here is just normal JavaScript semantics: we passed in a reference to an object, so when we change the properties on that object and then invoke a getter which depends on those values, we get an updated value. While there are some differences in the specific details of the implementation (as I cover below in Part II), this is fundamentally how `args` works in Glimmer components. And notice: there’s no `@tracked` in sight, no template layer involved, and in fact nothing about Ember or Glimmer in sight. It is, as they say, *just JavaScript*™.

This also means that we can see why certain things *won’t* work. I often see people write code like this both when writing new Glimmer components from scratch and when migrating from Ember components:

```js
class Profile extends Component {
  constructor(args) {
    super(args);
    this.description =
      `${this.args.name} is ${this.args.age} years old`;
  }
}
```

In this case, changes to `name` or `age` on `root` won’t be reflected in the `Profile` instance:

```js
let root = new Root();
let profile = new Profile(root.user);
console.log(profile.description);
// -> "Chris Krycho is 33 years old"

root.haveABirthday();
root.changeNameTo("C. D. Krycho");
console.log(profile.description);
// -> "Chris Krycho is 33 years old"
```

Why not? Because assigning to an instance property in the `constructor` for `Profile` simply evaluates the values passed in and saves the result as a field, no different than writing `this.description = "hello"`. A getter, like `get description() { ... }` is re-executed when invoked as `profile.description`. A class field just has whatever value is has. Accordingly, changes to `root.user` cannot affect the value of `profile.description` in this approach.

This brings us to the key takeaway for working with `args` in these components:

<i>You should *never* assign from a property on `args` to a local class field in a Glimmer component—because changes to the parent will never be reflected in the component![^local-copy] Not because of anything special about Glimmer components or autotracking, but just because of how JavaScript works!</i>

So far so good—but in a real Glimmer Component, we don’t pass in the args blob directly ourselves. Instead, we usually pass named argument values, like `@name={{this.user.name}}`. What’s more, we don’t necessarily pass reference types. We might pass in strings, numbers, etc. too—just as with `name`. So how does this still work?

## Part II: The Real Implementation

The answer is that the template layer wires this up for us—but in a way that, once again, we can understand in terms of plain old JavaScript. When you write a component invocation like this:

```handlebars
<Profile
  @name={{this.user.name}}
  @age={{this.user.age}}
/>
```

…the template layer creates the args object with *references* to the `user.name` and `user.age` properties. Specifically, it creates a *thunk*: an anonymous function which can be called later to get the value. That’s something you can do yourself in JavaScript:

```js
let root = new Root();
let args = {
  name: () => root.name,
  age: () => root.age,
};

root.haveABirthday();
console.log(args.age()); // 34!
root.changeNameTo("C. D. Krycho");
console.log(args.name()); // "C. D. Krycho"
```

Unfortunately, as you can see from the example, you have to call `args.age()` as a function to make this work. To work around this, the template layer actually creates a proxy which intercepts requests for properties and executed the thunk if there is one:

```js
class ArgsHandler {
  #capturedArgs;  

  constructor(capturedArgs) {
    this.#capturedArgs = capturedArgs;
  }

  get(_target, prop) {
    const ref = this.#capturedArgs[prop];
    if (ref) {
      return ref();
    }
  }
};

function argsProxyFor(capturedArgs) {
  const target = Object.create(null);
  const handler = new ArgsHandler(capturedArgs);
  return new Proxy(target, handler);
}
```

The `capturedArgs` here is what we saw above when the template layer captures the args: the “thunks” to lazily get the values on demand. Here I’ve called this a `ref`, short for *reference*, because that’s what a thunk is: a lazy reference to a value. (That’s how Glimmer refers to them, too!) Now we have a way to take our set of “thunks”/refs and turn it into an an object which *behaves* like they a regular object—but which has reference semantics for value types like strings just the same as for object types.

```js
let root = new Root();
let args = argsProxyFor({
  name: () => root.user.name,
  age: () => root.user.age,
});

root.haveABirthday();
console.log(args.age); // 34
root.changeNameTo("C. D. Krycho");
console.log(args.name); // "C. D. Krycho"
```

We can also make `args` effectively immutable by intercepting `set` calls:

```js
class ArgsProxy {
  // the rest of the implementation

  set(_target, property) {
    throw new Error(
      `You attempted to set ${String(property)} on the arguments of a component, helper, or modifier, but arguments are immutable!`
    );
  }
};
```

Now if we try to set `name` directly on `args`, rather than updating it back in the root, we get an error:

```js
let root = new Root();
let args = argsProxyFor({
  name: () => root.user.name,
  age: () => root.user.age,
});

args.name = "C. D. Krycho";
// Error: You attempted to set name on the arguments of a component, helper, or modifier, but arguments are immutable!
```

With all the pieces put together now, we have something like this:

```handlebars
<Profile
  @name={{this.user.name}}
  @age={{this.user.age}}
/>
```

```js
let root = new Root();
let args = argsProxyFor({
  name: () => root.user.name,
  age: () => root.user.age,
});

let profile = new Profile(args);
console.log(profile.description); // "Chris Krycho is 33"

root.haveABirthday();
root.changeNameTo('C. D. Krycho');
console.log(profile.description); // "C. D. Krycho is 34"
```

You don’t have to take my word for it, either: you can copy [this gist][gist] and run it in Node locally, and you can (and should!) edit and play with it to see how the different pieces work together.

[gist]: https://gist.github.com/chriskrycho/2e8ccf037d4c87fff96c7a87bfd0f44e

In [the real implementation](https://github.com/glimmerjs/glimmer-vm/blob/819f196a6821bf5ba728f1ad87086741bd80fb94/packages/%40glimmer/manager/lib/util/args-proxy.ts), there is a good deal more happening, because these all integrate with the autotracking system, as I described in [Autotracking: Elegant DX via Cutting-Edge CS](https://v5.chriskrycho.com/journal/autotracking-elegant-dx-via-cutting-edge-cs/). For example, the *refs* from the template layer’s `capturedArgs` all notify the reactivity system when they’re used, just like `@tracked` properties on a backing class do. But all of the additional things happening there are implementation details about the template layer wires these pieces together and knows when to update—not the fundamentals of how the system works.

## Conclusion

The examples I’ve worked through here not only represent the right idea of how Glimmer component arguments work, they actually *are* how a Glimmer component works if you strip away all the reactivity and did just a single pass—say, in a server-side rendering approach with the same JavaScript <abbr>API</abbr>s. (That’s not just an interesting example: it’s how server-side rendering with Glimmer components *actually* works: a single pass to render everything, with no need to trigger updates!)

Autotracking, then, is just a thin layer on top of the JavaScript you would write *anyway*—a layer that connects your normal JavaScript to the template layer and runtime so it knows when it needs to re-execute your normal JavaScript.

<!--
<div class="callout">

Thoughts, comments, or questions? Discuss on [Hacker News][hn], [lobste.rs][l], or [the Ember forum][discuss]!

[hn]: TODO
[l]: TODO
[discuss]: TODO

</div>
-->

[^local-copy]: There are times when you want to create a local copy of an argument and let it diverge locally until updated by the parent, but we have [dedicated tools](https://github.com/pzuraq/tracked-toolbox/blob/master/addon/index.js "the tracked-toolbox library") to manage those situations.
