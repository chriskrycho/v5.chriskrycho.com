---
title: Autotracking, Getters, and Rerendering in the Glimmer VM
subtitle: >
  In which we learn that the ‘magic’ of how getters rerun ‘automatically’ with autotracking in Glimmer (including Ember Octane) is Just JavaScript™.
summary: >
  One of Ember Octane’s and Glimmer.js’ key features is autotracking: a lightweight reactivity system which lets you write “normal” JavaScript or TypeScript and have everything Just Work™.
qualifiers:
  audience:
    Software engineers interested in reactivity models in general and in web <abbr title="user interface">UI</abbr> and JavaScript in particular.

date: 2020-09-21T17:00:00-0600

tags:
  - Ember
  - Glimmer
  - JavaScript
  - autotracking
  - software development
  - web development
  - reactivity

templateEngineOverride: md

---

One of Ember Octane’s (and Glimmer.js’) key features is *autotracking*, a lightweight reactivity system which allows you to write code like this, and have it *Just Work™*:

```js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

const MAX_LENGTH = 10;

export default class PersonInfo extends Component {
  @tracked name = '';

  get nameLength() {
    return this.name.length;
  }

  get remaining() {
    return this.nameLength - MAX_LENGTH;
  }

  get showError() {
    return this.remaining < 0;
  }

  @action updateName({ target: { value } }) {
    this.myName = value;
  }
}
```

```handlebars
<div>
  <input {{on "input" this.updateName}} value={{this.myName}} />
  <p class='{{if this.showError "error"}}'>
    ({{this.nameLength}} remaining)
  </p>
</div>
```

There are a handful of interesting features to note about this code’s approach to reactivity. We decorate *one* piece of state, `name`, with `@tracked`, and the rest of the state updates automatically. The `showError` and `remaining` properties don’t even refer to `name` directly, but when you type into the `<input>`, their values both update “automatically.” All of this with a particularly light touch:

- There is no need to mark dependent keys on the getters (as in classic Ember components) and no need for a `computed` hash (as in Vue 2) for derived state: these are plain JavaScript getters.
- There is no need for a dedicated utility like `setState` like in React’s class-based components or `set` from Ember Classic; this code just uses standard JavaScript assignment to update the value of `myName`.
- This does not use two-way binding like *really old* Ember did or current day Angular or Vue do[^vue-2wb]—updates are explicit, but brief.

This can look like magic when you first encounter it—especially the way undecorated getters update on demand. In fact, though, it’s *Just JavaScript™*, built on ideas you’re probably already familiar with as a working developer. In the rest of this post, we’ll see how it works! When we’re done you should understand *why* getters re-run “automatically” and have a better grasp on autotracking.

## How getters work

First, let’s make sure we have a clear handle on how getters work in JavaScript in general. Once you understand this, seeing how autotracking works will be much easier. (If you already have a good understanding of the semantics and behavior of getters vs. assignment, feel free to [skip to the next section](#what-is-autotracking)!) We’ll start by looking at the exact same class we started with, but with all of the Glimmer and DOM details removed, and a constructor added:

```js
const MAX_LENGTH = 10;

export default class PersonInfo {
  name;

  constructor(name) {
    this.name = name;
  }

  get nameLength() {
    return this.name.length;
  }

  get remaining() {
    return this.nameLength - MAX_LENGTH;
  }

  get showError() {
    return this.remaining < 0;
  }

  updateName(value) {
    this.myName = value;
  }
}
```

Whenever we look up `nameLength` from somewhere else—

```js
let personInfo = new PersonInfo("Chris");
console.log(personInfo.nameLength); // 5
```

—what exactly happens?

Effectively, the `nameLength` property (technically an *accessor*) executes as if it were a function. Before JS had native getters, in fact, that’s how we would have written it, and in fact we still *could* write it that way:

```js
const MAX_LENGTH = 10;

export default class PersonInfo {
  name;

  constructor(name) {
    this.name = name;
  }

  nameLength() {
    return this.name.length;
  }

  remaining() {
    return this.nameLength - MAX_LENGTH;
  }

  showError() {
    return this.remaining < 0;
  }

  updateName(value) {
    this.myName = value;
  }
}

let personInfo = new PersonInfo();
console.log(personInfo.nameLength());
```

Notice the two differences here: `personInfo.nameLength()` instead of `personInfo.nameLength `, and `nameLength() { ... }` instead of `get nameLength() { ... }`. These are effectively the same: both are functions which compute a value.

The other thing to notice here is that method invocations and getter lookups are both “lazy:” they run on demand. Until you actually invoke the method or the getter, there is a reference to a function as part of the class, but there isn’t any value computed by it. This is different from assigning a property directly. For example, if we assigned the values of `nameLength`, `remaining`, and `showError` in the constructor, they would *initially* have the same values as in the lazy version, but it would immediately get out of sync if you *changed* the value of `name` later:

```js
const MAX_LENGTH = 10;

export default class PersonInfo {
  name;
  nameLength;
  remaining;
  showError;

  constructor(name) {
    this.name = name;
    this.nameLength = name.length;
    this.remaining = this.nameLength - MAX_LENGTH;
    this.showError = this.remaining < 0;
  }

  updateName(value) {
    this.myName = value;
  }
}

let personInfo = new PersonInfo("Chris");
console.log(personInfo.nameLength); // 5

personInfo.updateName("Chris Krycho");
console.log(personInfo.nameLength); // still 5 😭
```

Doing this “eagerly” means that we computed the values of `name`, `nameLength`, and `remaining` when we assigned each of the derived properties, `nameLength`, `remaining`, and `showError`. We did *not* create a function which references those properties, which we could use to evaluate their values at a later time. To do that in the constructor, we could define `nameLength`, `remaining`, and `showError` as arrow functions, taking advantage of the fact that closures get a reference to the values they use from their enclosing scope:[^hooks][^closures-classes]

```js
const MAX_LENGTH = 10;

export default class PersonInfo {
  name;
  nameLength;
  remaining;
  showError;

  constructor(name) {
    this.name = name;
    this.nameLength = () => this.name.length;
    this.remaining = () => this.nameLength - MAX_LENGTH;
    this.showError = () => this.remaining < 0;
  }

  updateName(value) {
    this.myName = value;
  }
}

let personInfo = new PersonInfo("Chris");
console.log(personInfo.nameLength); // 5

personInfo.updateName("Chris Krycho");
console.log(personInfo.nameLength); // 12
```

But calling `personInfo.nameLength()` like this looks awfully familiar. The only real difference between this and the class method version is that this version lives on the *instance* while the method lives on the *prototype*—so we get to pay for this function for every `Person` we create instead of just once.

And that brings us all the way back around. Whatever values a getter, method, or function references are only evaluated when the getter, method, or function is invoked. That in turn means that if we have a *chain* of getters (or methods or functions), *none* of them will be reinvoked until the one at the end of the chain is, and accordingly we won’t evaluate *any* of the values they reference until we access a getter which refers to them—so any time we evaluate a getter, we’ll always get an up-to-date version of all the values involved.

```js
class Person {
  age;
  name;

  constructor(age, name) {
    this.age = age;
    this.name = name;
  }

  get description() {
    console.log("evaluating `description`");
    let name = this.name ?? 'Someone';
    return `${name} is ${this.age} years old!`;
  }

  get descriptionLength() {
    console.log("evaluating `descriptionLength`");
    return this.description.length;
  }

  get doubledPlusOne() {
    console.log("evaluating `doubledPlusOne`");
    return this.descriptionLength * 2 + 1;
  }
}

let me = new Person(33, "Chris");
console.log(me.doubledPlusOne);

me.name = "Christopher";
me.age = 105;
console.log(description);
console.log(me.doubledPlusOne);
```

The console output here would read:

```
evaluating `doubledPlusOne`
evaluating `descriptionLength`
evaluating `description`
45
evaluating `description`
"Chris is 33 years old!"
evaluating `doubledPlusOne`
evaluating `descriptionLength`
evaluating `description`
59
```

The thing to remember here is that getters only evaluate when something *asks* for their value. This means they always get the current value of whatever they refer to in their bodies—unlike an assignment, which figures out those values once and just has a resulting value afterward, *not* a reference to the values.

In Ember or Glimmer apps, the *something* which asks for the getters’ value is the Glimmer VM, which uses Ember’s “autotracking” reactivity system to keep track of which items in the UI need to be updated in any render. When a given item in the UI needs to be updated, the VM calculates the value—so if that value is a getter, it reruns, just like any other JavaScript invocation of a getter. The key, then, is understanding how autotracking tells the VM which values need to be updated.

## Getters and autotracking

Autotracking is made up of three ideas:

1. Create a single “clock” which just uses a number to track how many times any “tracked” state in your system has changed. This clock is literally just a number which is always counting upwards.
2. “Track” each piece of data in your system that you care about reacting to. Whenever that piece of data is changed, increment the value in the global clock and associate that updated global clock value with the piece of data you just changed.
3. In *reactive contexts*,[^reactive-contexts] whenever you compute a value, store the clock value for the last update and the clock value for any tracked properties you compute along the way.

:::aside

These same ideas—which are used for Ember’s template layers today—can also be used to implement pay-as-you-go reactivity in totally different reactivity models. For example, you can use it to reimplement [MobX](https://github.com/pzuraq/trackedx) or [Redux](https://github.com/pzuraq/tracked-redux)!

:::

Once you have those three ideas, everything *Just Works™*! Here’s how it all comes together:

First, the *getters* themselves are just JavaScript getters: they rerun whenever you ask for their value, and only when you ask for their value. The *runtime* asks for the values when it needs them. The getters themselves neither know nor care what requested their values! Second, the *runtime* combines the three parts of autotracking—a global clock (1) which is connected to tracked state (2) to know when to recompute the values in reactive contexts (3).

The critical bit for getters here is that decorating a property as `@tracked` connects both *reads* and *writes* to the runtime. Decorating a property with `@tracked` sets up a getter and a setter for a tracked property, and both connect to the runtime. In other words, when you write this—

```js
import { tracked } from '@glimmer/tracking';

class Person {
  @tracked age;

  constructor(age) {
    this.age = age;
  }
}
```

—it turns into something which acts more like this (where `consume` says that a property was *used* and `dirtyTagFor` says it was *set*):

```js
// THESE IMPORTS ARE NOT REAL
import { consume, dirtyTagFor } from '@glimmer/...';

class Person {
  // THIS IMPLEMENTATION IS NOT THE REAL ONE EITHER
  #age;

  get age() {
    consumeTag(this, 'age');
    return this.#age;
  }

  set age(newValue) {
    dirtyTagFor(this, 'age');
    this.#age = newValue;
  }

  constructor(age) {
    this.age = age;
  }
}
```

This is *not* the actual implementation, and in fact the way `consumeTag` and `dirtyTagFor` are used in this snippet are totally inaccurate.[^5] This *is* the right mental model, though! Using a tracked property always invokes `consumeTag`, and setting it always invokes `dirtyTagFor`, just as we saw with our example code in the first section.

```js
let me = new Person(33); // -> `dirtyTagFor(me, 'age')`
console.log(me.age);     // -> `consumeTag(me, 'age')`
```

Critically, the exact same thing is true if we use getters which *refer* to the tracked property. If we add a getter named `isOld` which computes its value by referring to `this.age` and use that getter—

```js
import { tracked } from '@glimmer/tracking';

class Person {
  @tracked age;

  constructor(age) {
    this.age = age;
  }

  get isOld() {
    return this.age > 90;
  }
}

let me = new Person(33);
console.log(`I am ${me.isOld ? "old" : "not yet old"}`);
```

—that *also* causes `markAsUsed` to get run: First, `isOld` gets the value of `age`, which `@tracked` turned into a getter/setter pair. The getter for `age` first runs `consume(this, 'age')`, and then returns the actual value, stored in `#age`. This would remain true no matter how many getters we chained together: by the end, they would all end up using `age`, which would call `consume(this, 'age')`:

```js
class Person {
  @tracked age;

  constructor(age) {
    this.age = age;
  }

  get isOld() {
    return this.age > 90;
  }

  get description() {
    const desc = this.isOld
      ? "is ancient!"
      : "is just a whippersnapper... for now";

    return `This person ${desc}`;
  }
}

// Person.description ->
//   Person.isOld ->
//     Person.age ->
//       consumeTag
let { decription } = new Person(33);
```

At this point, even without understanding *exactly* how the internals connect, we can see how the system works as a whole. Using `@tracked` connects reactive properties to the Glimmer VM, which is also connected to values in the templates. When a property decorated with `@tracked` changes, the VM updates any properties in the template which *use* that property, directly or indirectly, and that makes the getters rerun—even though they don’t know anything about reactivity at all.

But how exactly *do* the internals connect?

## How autotracking works

When rendering templates,[^6] the runtime sets up what is called a “tracking frame” for each value used in the template. Each tracking frame is basically just a list of all the tracked values that got used while computing that particular value. Calling `consumeTag` adds an item and its current global clock value to the current tracking frame. In a normal JavaScript invocation, there is no active tracking frame, so calling `consumeTag` ends up being a no-op. When rendering, though, a tracking frame *does* exist, and it ends up populated with all the tracked properties used to calculate it along with their current clock values.

Each new “computation” in the UI—component, helper, or modifier invocations, uses of `{{#each}}`, etc.—gets its own frame. When a given tracking frame “closes”, as at the close of a component invocation, it computes its own clock value. This clock value is just the maximum clock value of the children of that particular piece of UI, computed with `Math.max`.[^7] The resulting data structure is a tree which corresponds exactly to the UI tree. Unlike the UI tree, though, the nodes in the tree of tracking frames do deal with the actual values in the system—only with the summaries clock values and a cache of the previous clock value.

As we saw above, changes enter the system by setting tracked properties. When you *set* a value on a tracked property used in the tree, it updates that clock value for the item you set, which bumps both the overall global clock value and the clock value for any frames which include that tracked value. Then it schedules a new render.[^8]

When the Glimmer VM re-renders, it can traverse the tree in a [depth-first search](https://medium.com/basecs/demystifying-depth-first-search-a7c14cccf056), comparing each frame’s current and cached clock values. If the clock value for a given frame hasn’t changed, nothing below it in the UI tree has changed, either—so we know we don’t need to re-render it. Checking whether that clock value has changed is literally just an integer equality check. At the nodes which *have* changed, the VM computes the new value using normal JavaScript semantics and updates the DOM with the result.

There are a handful of really delightful consequences of this system:

- Re-renders are about as cheap as they possibly can be: all the state computations are simple integer math.
- Intermediate, “derived” state gets computed on demand when the state it depends on changes—but with normal JavaScript semantics, without extra developer-facing boilerplate or end-user impact on performance.
- It’s trivial to layer your own caching or memoization on top of these semantics if you need them, but you only pay for what you need.
- All the “smarts” lives at the very edge of the system, in root state marked with `@tracked` and leaf values computed in reactive contexts like templates.

Hopefully this has give you a good idea how autotracking works in general, and specifically how it simultaneously enables most of our code to be “just JavaScript” *and* gives us a very low-cost reactivity.

:::callout

If you’d like to see some of the details of how these pieces are implemented, check out [the video](https://www.youtube.com/watch?v=BjKERSRpPeI&amp;feature=youtu.be) of my conversation with Ember core team member and Glimmer VM contributor [Chris Garrett][cg] ([@pzuraq](https://github.com/pzuraq/)). You can discuss this [on Ember Discuss](TODO), [Hacker News](TODO), or [lobste.rs](TODO)! Readers interested in the underpinnings of autotracking may want to take a look at [Adapton](http://adapton.org), the original research implementation of the idea of “incremental computation.” For another “real-world” implementation of the same ideas, check out [salsa](https://salsa-rs.github.io/salsa/): a [Rust](https://www.rust-lang.org) implementation of incremental computation which powers the [rust-analyzer](https://rust-analyzer.github.io) language server.

:::

[cg]: https://www.pzuraq.com
[invoke-helper]: https://emberjs.github.io/rfcs/0626-invoke-helper.html

*[API]: application programming interface

*[UI]: user interface

*[DOM]: document object model

[^vue-2wb]: Vue does not *require* two-way binding, but does make it *easy*.

[^hooks]: This is actually a critical part of how React Hooks work under the hood.

[^closures-classes]: It’s also worth seeing how closures are the [dual](https://en.wikipedia.org/wiki/Duality_(mathematics)) of classes! These two have *the same semantics* as far as an end user is concerned:

    ```js
    class PersonA {
      #age;
      #name;

      constructor(name, age) {
        this.#age = age;
        this.#name = name;
      }

      get description() {
        return `${this.#name} is ${this.#age} years old!`;
      }

      haveABirthday() {
        this.#age += 1;
      }

      changeNameTo(newName) {
        this.#name = newName;
      }
    }

    function PersonB(name, age) {
      let _name = name;
      let _age = age;

      return {
        get description() {
          return `${_name} is ${_age} years old!`;
        },

        haveABirthday() {
          _age += 1;
        },

        changeNameTo(newName) {
          _name = newName;
        },
      };
    }
    ```

[^reactive-contexts]: Today, the only reactive context Ember has is its template layer, where values you render or pass as arguments to components, modifiers, or helpers are all *reactive*. [Soon][invoke-helper], though, we will also have reactive functions available in JavaScript contexts, which will make the reactivity system fully general!

[^5]: For a walkthrough of the *actual* implementation, see the [Tracking in the Glimmer VM](https://www.youtube.com/watch?v=BjKERSRpPeI&amp;feature=youtu.be) video that [Chris Garrett][cg] and I recorded as he helped me fill in some of my gaps in understanding around all of this.

[^6]: or when using a “reactive function” via [the upcoming `invokeHelper` functionality][invoke-helper]

[^7]: There are some details about how it checks the tree and makes sure that it manages its internally state correctly, but it really is [using `Math.max`](https://github.com/glimmerjs/glimmer-vm/blob/e8e2fc6f39a60baac2b72c1a19aea9585b162c47/packages/%40glimmer/validator/lib/validators.ts#L130:L172)!

[^8]: The VM coalesces these bumps so if you set a bunch of values in response to user action or API responses or other inputs, it only triggers *one* re-render, not *many*.