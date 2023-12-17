---
title: Why Not Type-Based Overloading in Rust?
subtitle: >
    Too much spooky action at a distance.

date: 2023-12-16T16:20:00-0700
tags:
    - Rust
    - programming languages
    - type systems

qualifiers:
    audience: >
        People who already have a decent baseline understanding of Rust and of the idea of type-based overloading/dispatch. (I won’t be explaining either in any detail!)

summary: >
    While it would be possible and even safe to add type-based function overloads in Rust, it would be a bad design move. Too much spooky action at a distance!

---

I was talking with a friend yesterday about a particular <abbr>API</abbr> in a Rust library I was working with, and he was noting that it would be nice to have support for overloading based on types, [arity](https://en.wikipedia.org/wiki/Arity), etc.—something you see in Java, C#, C++, Swift, and even (depending on how you squint) <abbr title="JavaScript">JS</abbr> and <abbr title="TypeScript">TS</abbr> and the like. You can imagine how that might be nice! These days, you often end up with something like this:

```rust
struct Foo { ... }
struct Bar { ... }
struct Baz { ... }

impl Foo {
    fn new() -> Foo { ... }
    fn new_with_bar(bar: Bar) -> Foo { ... }
    fn new_with_baz(baz: Baz) -> Foo { ... }
    fn new_with_everything(bar: Bar, baz: Baz) -> Foo { ... }
}
```

Invoking this can get pretty noisy:

```rust
let foo1 = Foo::new();
let foo2 = Foo::new_with_bar(some_bar);
let foo3 = Foo::new_with_baz(some_baz);
let foo4 = Foo::new_with_everything(some_bar, some_baz);
```

If you had overloading, you could write something like this instead: nstead of having a bunch of different functions with names indicating their differences, you could have something where the types informed what to call:

```rust
impl Foo {
    fn new() -> Foo { ... }
    fn new(bar: Bar) -> Foo { ... }
    fn new(baz: Baz) -> Foo { ... }
    fn new(bar: Bar, baz: Baz) -> Foo { ... }
}
```

Then invoking it could be a bit nicer:

```rust
let foo1 = Foo::new();
let foo2 = Foo::new(some_bar);
let foo3 = Foo::new(some_baz);
let foo4 = Foo::new(some_bar, some_baz);
```

This is not exactly novel technology: as noted above, *lots* of languages do this! So… why not Rust?

I was thinking on that question on my run today, and one particular reason *not* to do that stood out to me. If you have type-directed dispatch to different overloads, the simple cases above would be nicer, yes, but then you would lose a really key signal that is really important in Rust: “What are the ownership semantics of this?” Rust today *requires* you to have separate functions for borrowing, borrowing mutably, or moving an item.—and each of those is a different *type*.

```rust
struct TheseAreDifferentTypes {
    fn do_something_borrow(&self) { ... }
    fn do_something_borrow_mutably(&mut self) { ... }
    fn do_something_move(self) { ... }
}
```

I used `self` here, but the same goes for *any* kind of overload-by-type:

```rust
fn do_something_borrow_foo(foo: &Foo) { ... }
fn do_something_borrow_foo_mutable(foo: &mut Foo) { ... }
fn do_something_move_foo(foo: Foo) { ... }
```

If we had type-based overloading in Rust, it would be really tempting to write those like this instead:

```rust
struct TheseAreDifferentTypes {
    fn do_something(&self) { ... }
    fn do_something(&mut self) { ... }
    fn do_something(self) { ... }
}
fn do_something(foo: &Foo) { ... }
fn do_something(foo: &mut Foo) { ... }
fn do_something(foo: Foo) { ... }
```

At first blush, that might also seem really convenient. After all, it would just be up to the caller to specify, and the caller *would* still have to specify how an item is being passed:

```rust
do_something(&foo);
do_something(&mut foo);
do_something(foo);
```

Unfortunately, it would make it really easy to end up in situations where you get compiler errors far away from the *actual* mistake you made. Notably, that is true even in a fairly simple case, where you have local ownership of a type. More importantly, it would make it so that changes in one spot could *cascade* in surprising ways and then produce those errors-far-from-the-change. Consider a function like this:

```rust
fn look_at_the_arg(foo: &Foo) {
    do_something(foo);
    do_something_else(foo);
}
```

Assume that `do_something` is exactly like I defined it above, and that `do_something_else` has the same kinds of overloads.

As it stands, we have a function which borrows `foo`—that is, takes it  by immutable reference—and then calls `do_something(foo)` and `do_something_else(foo)` directly. Implied here is that `do_something` and `do_something_else` both take `foo` by reference as well: `&Foo`. What if we change the function signature for `look_at_the_arg` to take `foo` by *move* instead of by *reference*?

```rust
fn look_at_the_arg(foo: Foo) {
    do_something(foo);
    do_something_else(foo);
}
```

Now we have a type error on the call to `do_something_else`:

```
error[E0382]: use of moved value: `foo`
 --> src/main.rs:3:23
  |
1 | fn look_at_the_arg(foo: Foo) {
  |                    --- move occurs because `foo` has type `Foo`, which does not implement the `Copy` trait
2 |     do_something(foo);
  |                  --- value moved here
3 |     do_something_else(foo);
  |                       ^^^ value used here after move
  |
note: consider changing this parameter type in function `do_something` to borrow instead if owning the value isn't necessary
 --> src/main.rs:6:22
  |
6 | fn do_something(foo: Foo) {}
  |    ------------      ^^^ this parameter takes ownership of the value
  |    |
  |    in this function
```

Yes, we can fix that, and yes it is fairly obvious what is going on in this *very* short function. But even here, it is an annoying little paper cut that the error message shows up at the call site for `do_something_else` when the reality is that you almost certainly wanted to continue calling *both* `do_something` and `do_something_else` with a reference to `foo`. That is, it is very unlikely you *wanted* to move it into `do_something` simply because `look_at_the_arg` now takes `Foo` by reference. By making one change, you got a *significant and invisible* change in the behavior and semantics of the program *somewhere else*. This is generally not great! In a longer function, that type error could be much harder to figure out, too.

This could also change other semantics in surprising ways. For example, it could invisibly change the timing of `Drop` calls. Consider, again, this function definition:

```rust
fn drop_example(foo: &Foo) {
    do_something(foo);
    // other stuff...
}
```

Again, assume that `do_something` is overloaded as shown above. What happens if we change `drop_example` here to take `Foo` instead of `&Foo`? Now `do_something` also takes ownership of `Foo`, and therefore the `Drop` implementation for `Foo` runs as soon as `do_something` ends. Depending on what you are doing in the rest of `drop_example` and how expensive the `Drop` implementation for `Foo` is, that might be fine—or it might be surprising and *very* unwanted! Again, you may or may not have wanted to change the semantics of the call to `do_something` just because you changed the semantics of `drop_example`… but if we had this kind of type-based overloading, that would be exactly what you are saddled with.

That is not 100% conclusive, of course. You could make the case that Rust does lots of things “implicitly” rather than “explicitly” for the sake of convenience to the user—and that this should be one of them. In particular, this does not introduce any new *safety* hazards, because the compiler would always catch all the same kinds of errors it does today in terms of ownership in this world. The only kinds of changes it would introduce would be the sort described above. What is more, you would not even need an [Edition](https://doc.rust-lang.org/edition-guide/editions/index.html) change to support it, because the behavior here would be purely additive and always something authors would have to opt into.

I think that is a perfectly reasonable argument, but I ultimately do not agree with it here. Mutability and ownership are very core to the basic mental model for Rust. Having to differentiate between `do_something` and `do_something_mut` seems *net good* to me. It is a small extra bit of overhead when initially writing some code, but pays for itself substantially when either reading or especially editing code later. In general, it is preferable that the distance—the actual distance on screen, but also the distance in “program time”—between an *edit* and *any changes it results in* be as small as possible. Adding type-based overloading to Rust would significantly violate that heuristic.
