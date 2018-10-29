+++
title = "True Myth 2.2"
# subtitle = """
# `Maybe` helpers for safe object lookup and `Result` helpers for exception-throwing code.
# """
# [taxonomies]
# topics = [tech, typescript, true myth, open source software, functional programming]
# date = 2018-10-27T17:00:00-07:00
# 
# [extra]
# summary = "True Myth 2.2 adds two `Maybe` helpers for safe object lookup and two `Result` helpers for handling exception-throwing code."

+++

I just released v2.2[^1] of True Myth, with two new pairs of helpers to deal with [safe JavaScript object property lookup with `Maybe`s](#safe-java-script-object-property-lookup) and [handling exception-throwing code with `Result`s](#handling-exception-throwing-functions).

##  Safe JavaScript object property lookup

We often deal with *optional properties* on JavaScript objects, and by default JavaScript just gives us `undefined` if a property doesn't exist on an object and we look it up:

```ts
type Person = {
  name?: string;
};

let me: Person = { name: 'Chris' };
console.log(me.name); // Chris

let anonymous: Person = {};
console.log(anonymous.name); // undefined
```

We can already work around that with `Maybe.of`, of course:

```ts
function printName(p: Person) {
  let name = Maybe.of(p.name);
  console.log(name.unwrapOr('<anonymous>'));
}
```

But this is a *really* common pattern! `Maybe.property` is a convenience method for dealing with this:

```ts
function printName(p: Person) {
  let name = Maybe.property('name', p);
  console.log(name.unwrapOr('<anonymous>'));
}
```

At first blush, this might be a head-scratcher: after all, it's actually slightly *longer* than doing it with `Maybe.of`. However, it ends up showing its convenience when you're using the curried form in a functional pipeline. For example, if we had a *list* of people, and wanted to get a list of just the people's names (ignoring anonymous people), we might do this:

```ts
function justNames(people: Person[]): string[] {
  return people
    .map(Maybe.property('name'))
    .filter(Maybe.isJust)
    .map(Just.unwrap);
}
```

Another common scenario is dealing with the same kind of lookup, but in the context of a `Maybe` of an object. Prior to 2.2.0, we could do this with a combination of `Maybe.of` and `andThen`:

```ts
function getName(maybePerson: Maybe<Person>): string {
  return maybePerson.andThen(p => Maybe.of(p.name));
}
```

This is harder to compose than we might like, and we *can't* really write it in a "point free" style, even if that's more convenient. We also end up repeating the `andThen` invocation every time we go down a layer if we have a more deeply nested object than this. Accordingly, 2.2.0 also adds another convenience method for dealing with deeply nested lookups on objects in a type-safe way: `Maybe.get` (and the corresponding instance methods).

```ts
// Function version:
function getNameFn(maybePerson: Maybe<Person>): string {
  return Maybe.get('name', maybePerson);
}

// Method version
function getNameM(maybePerson: Maybe<Person>): string {
  return maybePerson.get('name');
}
```

Again, since the function version is curried, we can use this to create other little helper functions along the way:

```ts
const getName = Maybe.get('name');

function getAllNames(people: Maybe<Person>[]): string[] {
  return people
    .map(getName)
    .filter(Maybe.isJust)
    .map(Just.unwrap);
}
```

And if our object is a deeper type:

```ts
type ComplicatedPerson = {
  name?: {
    first?: string;
    last?: string;
  };
};

let none: Maybe<ComplicatedPerson> = Maybe.nothing();
console.log(none.get('name').toString());
// Nothing
console.log(none.get('name').get('first').toString());
// Nothing

let nameless: Maybe<ComplicatedPerson> = Maybe.just({});
console.log(nameless.get('name').toString());
// Just([object Object]);
console.log(nameless.get('name').get('first').toString());
// Nothing

let firstOnly: Maybe<ComplicatedPerson> = Maybe.just({
  name: {
    first: 'Chris',
  },
});
console.log(firstOnly.get('name').toString());
// Just([object Object]);
console.log(firstOnly.get('name').get('first').toString());
// Just(Chris);
```

Note that in these cases, since the type we're dealing with is some kind of object with specific keys, if you try to pass in a key which doesn't existing on the relevant object type, you'll get a type error. (Or, if you're using the curried version, if you try to pass an object which doesn't have that key, you'll get a type error.) However, we also often use JavaScript objects as *dictionaries*, mapping from a key to a value (most often, but not always, a *string* key to a specific value type). `Maybe.property` and `Maybe.get` both work with dictionary types as well.

```ts
type Dict<T> = { [key: string]: T };

let ages: Dict<number> = {
  'chris': 31,
};

console.log(Maybe.property('chris', ages)); // Just(31)
console.log(Maybe.property('joe', ages)); // Nothing

let maybeAges: Maybe<Dict<number>> = Maybe.of(ages);
console.log(ages.get('chris')); // Just(31)
console.log(ages.get('joe')); // Nothing
```

Hopefully you'll find these helpful! I ran into the motivating concerns for them pretty regularly in the codebase I work with each day, so I'm looking forward to integrating them into that app!

## Handling exception-throwing functions

The other big additions are the `Result.tryOr` and `Result.tryOrElse` functions. Both of these help us deal with functions which throw exceptions. Since JavaScript doesn't have any *native* construct like `Result`, idiomatic JavaScript *does* often throw exceptions. And that can be frustrating you want to have a value type like a `Result` to deal with instead.

Sometimes, you don't care *what* the exception was; you just want a default value (or a value constructed from the local state of your program, but either way just one value) you can use as the error to keep moving along through your program. In that case, you wrap a function which throws an error in `Result.tryOr`. Let's assume we have a function either returns a number of throws an error, which we'll just call `badFunction` because the details here don't really matter.

```ts
const err = 'whoops! something went wrong!';
const result = Result.tryOr(err, badFunction());
```

The `result` value has the type `Result<number, string>`. If `badFunction` through an error, we have an `Err` with the value `'whoops! something went wrong!'` in it. If it *didn't* throw an error, we have an `Ok` with the number returned from `badFunction` in it. Handy!

Of course, we often want to *do something* with the exception that gets thrown. For example, we might want to log an error to a bug-tracking service, or display a nice message to the user, or any number of other things. In that case, we can use the `Result.tryOrElse` function. Let's imagine we have a function `throwsHelpfulErrors` which returns a `number` or does just what it says on the tin: it throws a bunch of different kinds of errors, which are helpfully distinct and carry around useful information with them. Note that the type of the error-handling callback we pass in is `(error: unknown) => E`, because JS functions can throw *anything* as their error.

```ts
const handleErr = (e: unknown): string => {
  if (e instanceof Error) {
    return e.message;
  } else if (typeof e === 'string') {
    return e;
  } else if (typeof e === 'number') {
    return `Status code: ${e}`;
  } else {
    return 'Unknown error';
  }
}

const result = Result.tryOrElse(handleErr, throwsHelpfulErrors);
```

Here, `result` is once again a `Result<number, string>`, but the error side has whatever explanatory information the exception provided to us, plus some massaging we did ourselves. This is particularly handy for converting exceptions to `Result`s when you have a library which uses exceptions extensively, but in a carefully structured way. (You could, in fact, just use an identity function to return whatever error the library throws—as long as you write your types carefully and accurately as a union of those error types for the `E` type parameter! However, doing that would require you to explicitly opt into the use of `any` to write it as a simple identity function, so I'm not sure I'd *recommend* it. If you go down that path, do it with care.)

---

And that's it for True Myth 2.2! Enjoy, and of course please [open an issue][GH] if you run into any bugs!

[GH]: https://github.com/true-myth/true-myth/issues

Thanks to [Ben Makuh][ben] for implementing `Result.tryOr` and `Result.tryOrElse`. Thanks to Ben and also [Frank Tan][frank] for helpful input on the `Maybe.get` and `Maybe.property` <abbr>API</abbr> design!

[ben]: https://github.com/bmakuh
[frank]: https://github.com/tansongyang

---

[^1]: I published both `2.2.0` and `2.2.1`, because once again I missed something along the way. This time it was making sure all the new functions were optionally curried to support partial application.