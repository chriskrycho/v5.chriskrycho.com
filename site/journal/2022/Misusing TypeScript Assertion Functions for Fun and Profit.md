---
title: Misusing TypeScript Assertion Functions for Fun and Profit
subtitle: >
  A horrible (but very useful) hack I came up with yesterday for adding types to some old code.
tags:
  - TypeScript
  - software development
summary: >
  TypeScript’s assertions functions (`asserts`) can be mis-used to good effect when modeling unfortunate mutation-driven APIs. But “misuse” is the right word.
date: 2022-04-28T08:30:00-0600
image: https://cdn.chriskrycho.com/file/chriskrycho-com/images/ts-asserts-oh-my.png

---

Yesterday, a colleague working on adding types to one of our core libraries at LinkedIn asked me how to deal with an old (and no longer recommended!) pattern, and one thing we tried was misusing an [assertion function][af]. That didn’t do quite what we needed in the end,[^example] but I still think the pattern is interesting, so I’m writing it up!

[af]: https://devblogs.microsoft.com/typescript/announcing-typescript-3-7/#assertion-functions

The motivation is: let's say you have an old JavaScript <abbr title="application programming interface">API</abbr> which depends on *mutating* an object passed in. In idiomatic TypeScript, I would recommend creating a new object entirely, using some form of composition—decoration, delegation, etc.—, or otherwise  to implement this kind of thing. However, in some cases you cannot change without breaking lots of consumers, and need to provide a useful <abbr title="TypeScript">TS</abbr> <abbr>API</abbr> for it *anyway* (possibly while providing a better <abbr>API</abbr> to migrate to). In that case, you can use an `asserts` function to model this behavior in the type system.


## Assertion functions

Assertions functions allow <abbr>TS</abbr> to model functions which do some kind of validation on their arguments and *throw an error* if those validations don’t pass. Node’s [`assert`](https://nodejs.org/api/assert.html#assertvalue-message) is the canonical example:

```js
assert(someCondition, "Message if it fails");
```

In this case, if `someCondition` isn’t truthy, the function will throw an error instead of returning. <abbr>TS</abbr> lets us model this by saying that the function *asserts* the condition represented here by `someCondition`:

```ts
declare function assert(value: unknown, error: string | Error): asserts value;
```

That is, it *asserts* that the `value` argument is "true", and won’t return otherwise. Combined with TypeScript’s flow control analysis, after calling `assert`, TS knows whether the predicate you passed in is true. You can use this with all sorts of predicates to get more information about the types you’re dealing with:

```ts
function rejectNonStrings(value: unknown) {
  assert(typeof value === 'string', "It wasn't a string!");
  // Now this type checks because TS knows `value` is a `string` here:
  console.log(value.length);
}
```

This basic outline is enough for the purposes of this post: we now have enough information to see how to misuse `asserts` to solve a *totally different* problem. If you want to take a deeper dive, though, check out the [release blog post][release] and [Marius Schutlz’s deep dive][ms].

[release]: https://devblogs.microsoft.com/typescript/announcing-typescript-3-7/#assertion-functions
[ms]: https://mariusschulz.com/blog/assertion-functions-in-typescript


## Misuse

For a simplified example, I will use a base `Person` class and a function which mutates it to add an address. In <abbr title="JavaScript">JS</abbr>:

```js
class Person {
  constructor(age, name) {
    this.age = age;
    this.name = name;
  }
}

function addAddress(person, address) {
  person.address = address;
}

let me = new Person(34, 'Chris');
addAddress(me, '1234 Some St., Example City, CO 00000');
console.log(me.address);
```

When we initially convert this to TypeScript, the compiler will let us know that the `addAddress` implementation is unsafe.

```ts
class Person {
  age: number;
  name?: string | undefined;

  constructor(age: number, name?: string | undefined) {
    this.age = age;
    this.name = name;
  }
}

function addAddress(person: Person, address: string): void {
  person.address = address;
  //     ^^^^^^^ Property 'address' does not exist on type 'Person'.
}

let me = new Person(34, 'Chris');
addAddress(me, '1234 Some St., Example City, CO 00000');
console.log(me.address);
//             ^^^^^^^ Property 'address' does not exist on type 'Person'.
```

We can introduce an interface which represents a `Person` with the address added and do a safe "widening" type cast:

```ts
class Person {
  // sample implementation
}

interface PersonWithAddress extends Person {
  address: string;
}

function addAddress(person: Person, address: string) {
  // SAFETY: TS only allows this if `person` *can* be narrowed or widened to
  // this type. Narrowing would be unsafe; widening is actually strictly safe,
  // just not in a way that TS supports. This only remains safe because we fully
  // initialize the new fields immediately, though!
  (person as PersonWithAddress).address = address;
}
```

This works! …but only works within the body of the function. On the calling side, we still don’t have any visibility into the fact that the `Person` item now has an `address` field:

```ts
console.log(me.address);
//             ^^^^^^^ Property 'address' does not exist on type 'Person'.
```

This is where we get to the `asserts` trick which motivates this post. We can update `addAddress` to assert that the `person` passed in is actually the `PersonWithAddress` type:

```ts
function addAddress(
  person: Person,
  address: string
): asserts person is PersonWithAddress {
  (person as PersonWithAddress).address = address;
}
```

Now, when we call `addAddress`, <abbr>TS</abbr> recognizes that the `address` field exists:

```ts
addAddress(me, '1234 Some St., Example City, CO 00000');
console.log(me.address);
```

That is because we *asserted* that calling `addAddress` means `me` has an address field. Note that this isn’t exactly true… but this does actually convey the correct semantics. You can check this example out live in [this <abbr>TS</abbr> playground][p1] if you’d like to play with it yourself.

[p1]: https://www.typescriptlang.org/play?#code/MYGwhgzhAEAKCmAnCB7AdtA3gKGtMA5vAFzRoCuAtgEZIDcuZYl8A-KRAC6ICWaBDRsHRdE5YJxSIAFIRJkqtRABomLdtFF8CASiyM8nABY8IAOjnQAvPiIM8hk+bTN41tfHvQAvtl-Y+TiQAMzBgNwRkdAB1HmMAQQATRMR4KGh4AA8gtESYSNQMHDwwZNSoDm5tBn9g8jQJHnR8ZKSUtIhpRgAHJELSAvRlRlL2is0q-mwdUkgIJE4YXqiMUzg+mLijNvKYYuhpZcL8fI20WISyjp0LK-SbUd2a7GxhNC5oFnc0eAB3dZW0gAzAAWVQAcgAwkZeBBwTpBAB6RHQAACiwAtFlehIsYhEFJoBiMWQUC0xjBgjx4CBEtAAJ7wTgAQmZrxEKBA8DMIBQBGkLFuFIR0GR0HqiXgVJ+iReox2HQF8AhAEYAEyg6AAZRQXy1nDMqgAoplmN0udBIXF6apIQB5aAABmdzvhSJRABUnKT-px6b0McAjPBgABrCBst6oLk8vlKoW7BHYIA


## Caveats

First, and most important: ***this is unsafe!*** The compiler will not check your work. This is *always* true of assertion functions (as well as type guard functions), but it is worth being explicit about here. We are establishing a norm at LinkedIn that we annotate these kinds of things with `// SAFETY: ...` comments—an idea borrowed from the Rust community’s approach to `unsafe` blocks. (You can see this in the code above.) The rule is: if it involves a cast, it needs a good explanation of why that cast is legitimate so that future maintainers can uphold those invariants. And of course, if you can avoid casts in other ways, do so—but at minimum, *isolate* them and comment the heck out of them.

Second, this only helps if the function which `asserts` is part of your ordinary control flow. Type-level mutations like this don’t “stick around” across the life of the object the way the runtime values do. For example, if you have two class methods and one of them uses an assertion function to update `this`, the other method will not know anything about that:

```ts
class Person {
  // existing implementation...

  addAddress(address: string): this is PersonWithAddress {
    this.address = address;
  }

  addHobbies(hobbies: string[]): this is PersonWithHobbies {
    this.hobbies = hobbies;
  }

  describe(): string {
    let base = `${this.name} is a ${this.age}-year-old`;
    let location = `living in ${this.address}`;
    //                               ^^^^^^^ does not exist!

    let listFormatter =
      new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
    let hobbies = listFormatter.format(this.hobbies);
    //                                      ^^^^^^^ does not exist!

    return `${base} ${location}, who likes to do ${hobbies}`;
  }
}
```

Third, mutating objects like this tends not to be great for performance: the JavaScript <abbr title="virtual machines">VM</abbr>s are all best able to optimize objects with consistent shapes, and this is very much making the object *not* have a consistent shape.

In sum, the *only* reason to reach for this is to model existing <abbr>API</abbr>s you have which behave this way and *which you cannot change* for some reason.


## Bonus: more misuse?

We can actually generalize this to a utility representing these kinds of mutation-based extension operations:

```ts
function extend<T extends object, U extends object>(
  value: T,
  extension: U
): asserts value is T & U {
  Object.assign(value, extension);
}
```

This lets us work with *any* object types this way:

```ts
let person = {
  name: 'Chris',
  age: 34,
};

// This works! 🎉
extend(person, { hobbies: ['running', 'composing', 'writing'] });
console.log(person.hobbies);
```

Seems nice, right? Wellllll there are some problems (see this in a [<abbr>TS</abbr> playground][p2]):

[p2]: https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABAUwB5WWAJgHgCorqZYDOicARgFbLQA0iAqoRtmZTdAHwAUAUIkQA3AIYAbEMgBciPHQEtMJeGBmM+AShkiSJZACcoZUROSIYZAgDImiAN4KA8tVpQAdDuUBzMDxOSGNFZlBA0Abj4AXz4+MWQoRAAHAxIERABeewUwEQBbaUQAIgBhAAt9C0L5QREvAoBmABZ5SIi+AHp22VKLRAB3OH0AaxIAQkRAHg3ASP3EPiDiHmT9VLAGO0RSygoYZBIZAG0Acgg4XMS4ZTAvQ4ZD-XAwGCubxEO+ithngF1ESPC+E5gVJxNxiOBeRYpBBuTYUba7f4dLpuFEUEAJVKILBwXaIKA9MaIQC8G4AaPbmRGwkOWCDWiFqBUK5ygIigcEKv3+nUQ4FgYn6Zig+gAnni4Ny9OYoAwwHA+ogAAb0+XmMjysDIIQGeV8JYrDx1GJclEebB4gl4oXJRAQUq0EaiuCjcmsLBUla02HwvaIACMACZ6hykYg0QkvDBNWQQGR8QLLWZ5SRBU8vPsfjYwCBchQtQw+j0bSrEDKgUpkDqoWAYVsdmQANSIP0V6lVz21tzAJ6ungkDQZLiIMjpYevPosw7-IA

```ts
// This type checks too! 😬
extend(person, { age: "potato" });
// until we try to use it, now `age` is `never`
person.age

// ...and this type checks too!
extend(person, { hobbies: 123 })
// but gives us the type `string[] & number`, which is nonsense
person.hobbies + 2
person.hobbies.find((s) => s === 'wat');

// and this "works"... but adds the array values at their numeric indices
extend(person, ['a', 'b', 'c'])
console.log(person[0]); // 'a' 🙃
```

Net: while this general `extend` pattern is tempting, you shouldn’t do it. It’ll seem nice… right up until you’re trying to figure out why `age` is `never` or any number of other weird results that <abbr>TS</abbr> will blithely ignore!


<div class="callout">

Thoughts, comments, or questions? Discuss on [LinkedIn][li], [Hacker News][hn], [lobste.rs][l], or [Twitter][t]!

[li]: https://www.linkedin.com/posts/chriskrycho_misusing-typescript-assertion-functions-for-activity-6925453808487522304-aj9i
[hn]: https://news.ycombinator.com/item?id=31255935
[l]: https://lobste.rs/s/pjyjnp/misusing_typescript_assertion
[t]: https://twitter.com/chriskrycho/status/1519688307482890240

</div>



[^example]: In our case, this was our web tracking library—not the creepy kind of tracking, but the kind that lets us analyze how features are being used, run A/B tests, etc.—which was written against versions of [Ember](https://emberjs.com) from half a decade ago. It worked by mutating an instance of Ember’s legacy [Component](https://api.emberjs.com/ember/4.3/classes/Component) <abbr>API</abbr> during setup. You inject the service, then during `init()` (Ember Classic’s post-`constructor` initialization hook), call the service’s `setupComponent` method with the component instance as its argument:

    ```js
    import Component from '@ember/component';
    import { service } from '@ember/service';

    export default class SomeComponent extends Component {
      @service tracking;

      init() {
        super.init();
        this.tracking.setupComponent(this);
      }
    }
    ```

    Then the tracking service method sets event listeners and adds or mutates a bunch of fields to the component:

    ```js
    import Service from '@ember/service';
    import { set } from '@ember/object';

    export default class TrackingService extends Service {
      // lots of other stuff
      setupComponent(componentInstance) {
        const attributeBindings = component.attributeBindings || [];
        set(
          component,
          'attributeBindings',
          attributeBindings.concat(['data-control-name', 'data-control-id'])
        );

        component.on('didInsertElement', () => {
          // ...
        });
      }
    }
    ```

    In this case, the design I show in the rest of the article doesn’t actually work or help here, because it does not participate in the control flow in the way we would need it to. (This is one of *many* reasons not to design <abbr>API</abbr>s that require mutating objects to work!)
