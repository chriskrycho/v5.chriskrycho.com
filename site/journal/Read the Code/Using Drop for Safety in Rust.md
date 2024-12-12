---
title: "Read the Code: Using Drop for Safety in Rust"
subtitle: |
    A deep dive into Rust’s `vec::Drain` and its `Drop` implementation as an example of how ownership prevents subtle bugs—memory and otherwise!

date: 2024-12-12T12:05:00-0700

tags:
    - Rust
    - software development
    - reading code

image:
    cdn: drain-drop.png

qualifiers:
    audience: |
        People who can read Rust and have a basic (and I do mean basic!) understanding of its ownership semantics and [its `Drop` trait][drop].

        [drop]: https://doc.rust-lang.org/1.82.0/std/ops/trait.Drop.html

thanks: |
    [Rob Jackson][rwjblue], [Chris Freeman][cf], and [Dan Freeman][df] (no relation!) read and provided helpful feedback on this before publication. All errors and infelicities are, of course, my own.

    [rwjblue]: https://github.com/rwjblue/
    [cf]: https://github.com/cafreeman/
    [df]: https://github.com/dfreeman

discuss:
    hn: https://news.ycombinator.com/item?id=42402280
    lobsters: https://lobste.rs/s/zeys16/read_code_using_drop_for_safety_rust

---

As I was working on some revisions to <cite>The Rust Programming Language</cite> book,[^whoa] I had cause to look at [the `Vec::drain` method][drain-method-docs], and that led me down a rabbit hole—the rabbit hole we are now going to traverse together.

If you are not familiar with `Vec::drain`, you can use it like this to “drain” items out of a `Vec` (there are similar methods for `String`, `HashMap`, and a bunch of other collection types):

```rust
let mut values = vec![1, 2, 3, 4, 5];
for val in values.drain(1..3) {
    println!("Removed: {val}");
}
println!("Remaining: {values:?}");
```

The output from that code would be:

```
Removed: 2
Removed: 3
Remaining: [1, 4, 5]
```

Here’s how [the docs][drain-method-docs] describe `Vec::drain` as of Rust 1.83 (emphasis mine):

> Removes the specified range from the vector in bulk, returning all removed elements as an iterator. If the iterator is dropped before being fully consumed, it drops the remaining removed elements.
>
> The returned iterator *keeps a mutable borrow* on the vector to optimize its implementation.

[drain-method-docs]: https://doc.rust-lang.org/1.83.0/std/vec/struct.Vec.html#method.drain

That last sentence, particularly the bit I bolded, caught my attention and got me digging into the implementation.

After all, there is a totally reasonable way you could do this: take in the `Vec`, copy out all the elements to be removed and place them into a new `Vec`, update the original `Vec` to remove all of those elements, and return an iterator backed by that newly allocated `Vec`.

That could potentially be a *lot* of work for the computer to do right up front, though. If you have a large `Vec` (thousands or millions of elements) and are operating on some chunk in the middle of it, that is a lot of extra memory to allocate and a lot of copy operations to do before we even know if we are going to use any of those values.

So Rust does something totally different here instead: it *keeps* a mutable reference to the original `Vec`, and it only ever reads from and updates the original storage. It can do that because of Rust’s ownership rules: nothing else is allowed to get read or write access to the original `Vec` as long as the iterator produced by `Vec::drain` exists, so nothing can ever get into a buggy state by invalidating the iterator or its backing storage (for example, by mutating the values in the `Vec`, changing its length, etc.).

Rust does this [by creating a new data structure][drain-method-impl], quite reasonably named [`Drain`][drain-struct-docs], which [holds onto][drain-struct-impl] that mutable reference to the original `Vec` and an iterator for accessing the values of the `Vec` by using a slice of the `Vec`. When you then use iterator methods on `Drain`, it forwards to an iterator over the slice. This means it does not have to implement the iteration itself, but can use the exact same (well-optimized!) implementation as any other iteration over a slice would. The one differences, and it is a critical one, is that `drain` immediately returns the values from the slice via an unsafe `std::ptr::read` call.

[drain-method-impl]: https://github.com/rust-lang/rust/blob/1f3bf231e160b9869e2a85260fd6805304bfcee2/library/alloc/src/vec/mod.rs#L2603-L2631
[drain-struct-docs]: https://doc.rust-lang.org/1.83.0/std/vec/struct.Drain.html
[drain-struct-impl]: https://github.com/rust-lang/rust/blob/1f3bf231e160b9869e2a85260fd6805304bfcee2/library/alloc/src/vec/drain.rs#L22-L34

That *would* be unsound if it were possible for someone to get access to the values in the `Vec` during or after the `Drain` iterator had access to it. As I noted above, though, nothing can get access to it while the `Drain` iterator has access, because it takes `self` by mutable reference. So far, this probably seems pretty straightforward if you are familiar with Rust—the `std::ptr::read` bit is the only unusual part.

What about *after* you finish with the draining iterator, though? How does Rust guarantee that part of the contract?

This is where it gets interesting.

When the iterator is dropped—either because you hit the end of a `for` loop over it or because you drop it after iterating over some subset of elements—the `Drain` type’s implementation of [the `Drop` trait][drop-docs] takes over. That means that `impl Drop for Drain` is responsible for making sure that `Drain` is sound. This is a common pattern in Rust, well worth understanding, and it is also really *neat*, so let’s walk through it—all of it, every last line!

{% note %}

I am going to leave off the extra type parameter for the `Allocator`, but otherwise, this post includes every bit of code in [the implementation][drop-impl] (in this case, as of Rust 1.85 nightly). Even so, you may want to pull up that code side by side with this post to make it easy to see all of it in context!

[drop-impl]: https://github.com/rust-lang/rust/blob/1f3bf231e160b9869e2a85260fd6805304bfcee2/library/alloc/src/vec/drain.rs#L173-L240

{% endnote %}

[drop-docs]: https://doc.rust-lang.org/1.83.0/std/ops/trait.Drop.html

We’ll start with the boilerplate for the trait implementation:

```rust
impl<T> Drop for Drain<'_, T> {
    fn drop(&mut self) {
        // ...
    }
}
```

The thing to notice about this is that `drop` takes `&mut self`. This means we cannot do anything which requires *ownership* of `self`, which in turn motivates the next thing that we’ll see:

```rust
/// Moves back the un-`Drain`ed elements to restore the original `Vec`.
struct DropGuard<'r, 'a, T>(&'r mut Drain<'a, T>);
```

This is an internal data structure, a type *only* available in the body of this particular function. As the documentation comment explains, the purpose of this is to provide a way to guarantee that this implementation will always move all the contents of the original `Vec` back into that `Vec`, with the correct locations. It does that, as its name might imply…

```rust
impl<'r, 'a, T> Drop for DropGuard<'r, 'a, T> {
    fn drop(&mut self) {
        // the body of the implementation (which we’re about to see!)
    }
}
```

…by way of its *own* implementation of `Drop`! This is a *relatively* straightforward implementation, and it is therefore relatively easy to check for safety, but it *is* doing a bunch of things that have to be done in an `unsafe` block because this is all valid if and only if it happens in the context where you have `&mut self` access to the `DropGuard` and therefore also to the `Drain` struct.

The first thing this does is check whether there is anything to do at all by checking the `tail_len`:

```rust
if self.0.tail_len > 0 {
    // ...
}
```

The “tail” whose length is calculated here is the set of elements which come after the end of the range specified when calling `Vec::drain`. Returning to the example code I showed at the beginning:

```rust
let mut values = vec![1, 2, 3, 4, 5];
for val in values.drain(1..3) {
    println!("Removed: {val}");
}
println!("Remaining: {values:?}");
```

The tail here are the values `4` and `5`, which are not drained.

The `tail_len` value is set only once, when the struct is initialized in `Vec::drain`, along with `tail_start`:

```rust
pub fn drain<R>(&mut self, range: R) -> Drain<'_, T>
where
    R: RangeBounds<usize>,
{
    // Memory safety
    //
    // When the Drain is first created, it shortens the length of
    // the source vector to make sure no uninitialized or moved-from elements
    // are accessible at all if the Drain's destructor never gets to run.
    //
    // Drain will ptr::read out the values to remove.
    // When finished, remaining tail of the vec is copied back to cover
    // the hole, and the vector length is restored to the new length.
    //
    let len = self.len();
    let Range { start, end } = slice::range(range, ..len);

    unsafe {
        // set self.vec length's to start, to be safe in case Drain is leaked
        self.set_len(start);
        let range_slice = slice::from_raw_parts(self.as_ptr().add(start), end - start);
        Drain {
            tail_start: end,
            tail_len: len - end,
            iter: range_slice.iter(),
            vec: NonNull::from(self),
        }
    }
}
```

Here you can see that `tail_start` and `tail_end` represent anything *after* the section you are pulling out with `drain`, with a special bit of handling to guarantee memory safety when dealing with the original `Vec`’s contents.

Thus, in my example code, `tail_start` will be `3` and `tail_end` will be `4`: `..` *excludes* the end of the range, with the values `4` and `5`, exactly as I described above.

If there is a tail, the `DropGuard` relocates each of those items using [the `std::ptr::copy` function][ptr-copy], which is similar to the C function `memmove`. It gets a mutable reference to the original `Vec`, and again only copies over the values if the tail is not already at the end of the original `Vec`.

```rust
if self.0.tail_len > 0 {
    unsafe {
        let source_vec = self.0.vec.as_mut();
        // memmove back untouched tail, update to new length
        let start = source_vec.len();
        let tail = self.0.tail_start;
        if tail != start {
            let src = source_vec.as_ptr().add(tail);
            let dst = source_vec.as_mut_ptr().add(start);
            ptr::copy(src, dst, self.0.tail_len);
        }
        source_vec.set_len(start + self.0.tail_len);
    }
}
```

Finally, this implementation updates the length of the original `Vec`. This is an unsafe operation because it does not even bother trying to uphold the normal invariants about a `Vec`: that it contains no uninitialized memory, that the new length is less than or equal to the total allocated capacity of the `Vec`, and so on. Here, we can see that it is safe by inspection because we guarantee at construction that the `tail_len` is bounded by the length of the original vector—but we can (and Rust *does*) also do a bunch of extra dynamic analysis with the [Miri][miri] tool to *make sure* that is true via extensive testing.

[miri]: https://github.com/rust-lang/miri

<details><summary>A bit more about Miri (click to expand!)</summary>

Per its <span class='all-smcp'>README</span>:

> Miri is an [Undefined Behavior][ub] detection tool for Rust. It can run binaries and test suites of cargo projects and detect unsafe code that fails to uphold its safety requirements.

[ub]: https://doc.rust-lang.org/reference/behavior-considered-undefined.html

You can read a little about how to use it in [a section I recently added][miri-book] to <cite>The Rust Programming Language</cite>, and much more in [its repo][miri].

[miri-book]: https://doc.rust-lang.org/nightly/book/ch20-01-unsafe-rust.html#using-miri-to-check-unsafe-code

</details>

When I said earlier that we would minimize the work done for relocating items, this is what I meant: we *only* move these items after actually using the `Drain`; we do not preemptively move the originals out of place and move these over.

[ptr-copy]: https://doc.rust-lang.org/1.83.0/std/ptr/fn.copy.html

(If you’re wondering, this does mean that if you are draining some small part of a large `Vec`, you may see a performance hiccup when you’re done with the `Drain`. As always with performance, though, you should measure before you assume this is a problem!)

Once the memory move is done, the `DropGuard` is also done. We will see shortly how it gets *used*, and I will explain then why it is used *this way*. Back to the rest of the `drop` implementation for `Drain`.

First, it pulls the range iterator out of the `Drain` and uses it to figure out how many items it needs to drop when cleaning everything up—because, as the docs noted, “If the iterator is dropped before being fully consumed, it drops the remaining removed elements.”

```rust
let iter = mem::take(&mut self.iter);
let drop_len = iter.len();
```

[The `mem::take` function][mem-take] replaces a given value with whatever its *default* value is, as defined by its implementation of [the `std::default::Default` trait][default-trait]. For a `Range<usize>` (as we have for indexing into a `Vec`), that is `0..0`, which runs from `0`-inclusive to `0`-exclusive. In other words, it is the *empty* range, which is hopefully what you would expect. That step sets `self.iter` to a useless value and makes the `iter` value available for further manipulation—and, critically, *available to drop* when this `Drain` goes out of scope, but not attached to it, which matters for some pointer arithmetic which happens later.

[mem-take]: https://doc.rust-lang.org/1.83.0/std/mem/fn.take.html
[default-trait]: https://doc.rust-lang.org/1.83.0/std/default/trait.Default.html

Next up, this `drop` implementation gets a mutable reference to the original `Vec`:

```rust
let mut vec = self.vec;
```

At first read, it might not be obvious that it is a *reference* that we are getting there, but the type of `self.vec` here is `NonNull<Vec<T>>`, which always wraps a reference. In this case, it was constructed by calling `NonNull::from(self)` back when `Drain` got constructed, where `self` was `&mut self` referencing the `Vec` we called `drain` on:

```rust
pub fn drain<R>(&mut self, range: R) -> Drain<'_, T>
where
    R: RangeBounds<usize>,
{
    // all the safe setup...
    unsafe {
        // all the unsafe setup...
        Drain {
            // the other fields, and then at last...
            vec: NonNull::from(self),
        }
    }
}
```

So `let mut vec = self.vec` is a mutable reference to [the `NonNull` pointer][nonnull] to the `Vec`, which in turn we can use via its implementation of [the `Deref` trait][deref] to use all the normal `Vec` methods. That is exactly what we do next.

[nonnull]: https://doc.rust-lang.org/1.83.0/std/ptr/struct.NonNull.html
[deref]: https://doc.rust-lang.org/1.83.0/std/ops/trait.Deref.html

First, there is a special case for zero-sized types. A zero-sized type is a type like this—

```rust
struct TotallyEmpty;
```

—that is, one that has no data associated with it and that the compiler will thus guarantee takes up no memory at all. We have to handle this case distinctly because there is nothing to move!

{% note %}

Idiomatic Rust uses these kinds of types for a couple of reasons—neither of them *extremely* common, but not especially *uncommon*, either:

- As a “marker” for distinguishing between other types. This can help provide type safety without any additional runtime cost, because Rust will distinguish between two zero-sized types. This can be super handy for implementing type-safe state machines, for example.

- To have a useful place to implement a trait. You cannot implement a trait on *nothing*. You can, however, `impl SomeTrait for TotallyEmpty`. That can be useful, especially when in conjunction with use as a marker type! One time you might want this is as a marker to make a given type opt out of being `Send` or `Sync`.

I could say a lot more about zero-sized types, but instead: back to the `drop` implementation!

{% endnote %}

The implementation therefore starts by doing something a little interesting: checking a value on `T`. But `T` is a type!

```rust
if T::IS_ZST {
    // ZSTs have no identity, so we don't need to move them around, we only need to drop the correct amount.
    // this can be achieved by manipulating the Vec length instead of moving values out from `iter`.
    unsafe {
        let vec = vec.as_mut();
        let old_len = vec.len();
        vec.set_len(old_len + drop_len + self.tail_len);
        vec.truncate(old_len + self.tail_len);
    }

    return;
}
```

This is actually [implemented][is-zst] in Rust’s standard library—technically in `libcore`—using an unstable feature currently only designed for internal use like this.[^unstable] That means you cannot write this in your own code, as you can confirm with [this playground][p-nope].[^nightly] Under the hood, though, it is doing something pretty simple:

[is-zst]: https://github.com/rust-lang/rust/blob/75716b45105e443199ce9800c7009ddfd6d2be53/library/core/src/mem/mod.rs#L1239
[p-nope]: https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=b935f58d234eb36ce3a2cbfcdc360905

```rust
pub trait SizedTypeProperties: Sized {
    // other such compiler-only bits...

    const IS_ZST: bool = size_of::<Self>() == 0;
}

impl<T> SizedTypeProperties for T {}
```

That is, at compile time, it determines for any type `T` whether it is a zero-sized type or not, and then Rust’s internals can use that associated field. This *is* something you can do yourself for other traits (see [this playground][p-yep] for a silly example); it is just not something you see very often!

[p-yep]: https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=d6f069372555fe4eb8c1f2e1d77abf43

Back to the `drop` implementation, we can see that all we need to do in this case is update the length of the original `Vec`, with no need to copy memory around. Then we `return` because there is nothing else to do in that case, and the `Drain` instance can be safely cleaned up.

```rust
unsafe {
    let vec = vec.as_mut();
    let old_len = vec.len();
    vec.set_len(old_len + drop_len + self.tail_len);
    vec.truncate(old_len + self.tail_len);
}

return;
```

The “normal” pattern, though, is for types which *do* have a size. In that case, the `DropGuard` finally makes its appearance:

```rust
// ensure elements are moved back into their appropriate places, even when
// drop_in_place panics
let _guard = DropGuard(self);
```

The comment explains why `DropGuard` exists: we need to *guarantee* the constraint I outlined at the top, and the reason this all exists—that the original values from the `Vec` are *never* accessible once they are included in a `Drain`, because otherwise we would violate Rust’s memory safety guarantees. We will see what the `drop_in_place` bit refers to in a moment, but there is one other thing to do first: return immediately if there is nothing extra to drop!

Remember, we got the number of items to drop, i.e. the number of items left in the iterator. If there is nothing left to drop, we’re done:

```rust
let iter = mem::take(&mut self.iter);
let drop_len = iter.len();

// zero-sized type handling and creating the drop guard...

if drop_len == 0 {
    return;
}
```

And by “done”, I mean that the drop method returns, and so the drop guard we declared with `let _guard = DropGuard(self)` now goes out of scope. That means its `Drop` implementation—where we started!—will run. Anything that needs to be moved in the original `Vec` will be moved here at the end of the scope.

The same basic thing will apply, with a small tweak, for the final part of this `drop` implementation:

```rust
// as_slice() must only be called when iter.len() is > 0 because
// it also gets touched by vec::Splice which may turn it into a dangling
// pointer which would make it and the vec pointer point to different
// allocations which would lead to invalid pointer arithmetic below.
let drop_ptr = iter.as_slice().as_ptr();

unsafe {
    // drop_ptr comes from a slice::Iter which only gives us a &[T] but
    // for drop_in_place a pointer with mutable provenance is necessary.
    // Therefore we must reconstruct it from the original vec but also
    // avoid creating a &mut to the front since that could invalidate raw
    // pointers to it which some unsafe code might rely on.
    let vec_ptr = vec.as_mut().as_mut_ptr();
    let drop_offset = drop_ptr.sub_ptr(vec_ptr);
    let to_drop = ptr::slice_from_raw_parts_mut(vec_ptr.add(drop_offset), drop_len);
    ptr::drop_in_place(to_drop);
}
```

The comment on the first line of code here tells us why we handled the `drop_len` check *before* doing any of this. It is also suggestive of a theme that has been here implicitly throughout: Rust makes it *easier* to isolate safety checks, but they are often impossible to make totally local. In this case, [the `Splice` type][splice-struct] created via [the `Vec::splice` method][splice-method] uses `Drain`, and also uses `unsafe` pointers to the original `Vec` in its own `Drop` implementation, so `Drain` has to be careful not to violate the assumptions that `Splice` makes. This is hard to get right! And it’s why we use Miri, as I noted above—that’s what [led to][ptr-pr] this bit of code being written the way it is!

[splice-struct]: https://doc.rust-lang.org/1.83.0/std/vec/struct.Splice.html
[splice-method]: https://doc.rust-lang.org/1.83.0/std/vec/struct.Vec.html#method.splice
[ptr-pr]: https://github.com/rust-lang/rust/pull/106950

The next block of comments and the first line in the unsafe block get into something Rust is working hard to improve in terms of its model of safety: *provenance*. In brief, provenance is about tracking not just the address of a pointer but *where it came from* and therefore what we can prove about it. Provenance is an incredibly deep and fascinating subject about which I know too little, so I won’t say much more than that.

Here, the point is to make sure we have a valid pointer provenance to use when dropping any values that are unused at the end of the original range specified when calling `drain`: Miri will (rightly!) complain otherwise.

Once we have pointers with valid provenances, we get a “raw slice” with [the `std::ptr::slice_from_raw_parts_mut` function][sfrpm]. A “raw slice” is *basically* just a chunk of memory interpreted as a contiguous sequence of items of a given type. It is called “raw” because it is unsafe: it is constructed directly from a pointer and size; it is on the caller to make sure it is valid.[^basically-c] We use the `_mut` version of the function here because the next, and next-to-last, thing we do is call [the `std::ptr::drop_in_place` function][dip], which runs the `Drop` implementation for whatever it is called on *without* moving them. Called on a slice, that will in turn recursively call the `Drop` on each item in.

[sfrpm]: https://doc.rust-lang.org/1.83.0/std/ptr/fn.slice_from_raw_parts_mut.html
[dip]: https://doc.rust-lang.org/1.83.0/std/primitive.pointer.html#method.drop_in_place

`drop_in_place` is unsafe because it leaves the resulting memory exactly as it was, modulo whatever a given item’s own `Drop` implementation might do. That takes us back to the guarantee we have to uphold about clearing all of that memory. That is also why I said calling `drop_in_place` is the “next-to-last” thing this does, though: This is the end of the function, and thus the end of the scope, which means the `_guard` instance of `DropGuard` goes out of scope and runs. That means the guarantee gets upheld! And, as the comment at the creation of the `DropGuard` instance indicated—

```rust
// ensure elements are moved back into their appropriate places, even when
// drop_in_place panics
let _guard = DropGuard(self);
```

—Rust will run the `DropGuard` implementation of `Drop` even if `drop_in_place` panics, which could happen if something in some inner type’s `Drop` implementation is ill-behaved. This allows this function to *guarantee* that even if something went wrong with the data which was originally in the `Vec`, the memory itself is valid, and the `Vec` itself remains valid afterward. That is: There might be a serious bug or problem, but it will not be a bug or problem that violates Rust’s safety and soundness guarantees.

---

That was a lot of ground, but it showed off some interesting bits about providing a safe abstraction for unsafe code and how Rust can take advantage of its ownership semantics to provide great performance while upholding those guarantees. In particular:

1. The original `Vec` is never accessible in an invalid state during or after using `drain` on it.
2. The iterator over that `Vec` can never be invalidated either.
3. Both (1) and (2) are true *even in the face of badly behaved implementations of other types*, as long as there is no *unsound* code in that bad behavior.

It is also worth seeing that while this *includes* memory safety, the way the ownership semantics work in the public <abbr title="application programming interface">API</abbr> here eliminates *other* kinds of bugs too. You can have iterator invalidation bugs in Java or JavaScript just fine if you don’t take care! In Rust, you can only have an iterator invalidation bug by explicitly opting into `unsafe`. That’s neat, and it’s one reason I miss Rust when working in other languages!

I also particularly want to note this use of a `DropGuard` to uphold those guarantees. This is *similar* to the kind of thing you can do with the `using` construct in C# or JavaScript or the `with` construct in Python—but in those cases, there is a special language affordance built in to handle that kind of scoping so you can deploy it for cases where you need it. In Rust, it falls directly out of the combination of ownership and having a destructor that runs automatically when an item goes out of scope. You do not *need* any special language constructs for it other than those two.

## Further reading

If you want to read more about provenance, check out these posts by Rust memory model expert Ralf Jung:

- [Pointers Are Complicated, or: What's in a Byte?](https://www.ralfj.de/blog/2018/07/24/pointers-and-bytes.html)
- [Pointers Are Complicated II, or: We need better language specs](https://www.ralfj.de/blog/2020/12/14/provenance.html)
- [Pointers Are Complicated III, or: Pointer-integer casts exposed](https://www.ralfj.de/blog/2022/04/11/provenance-exposed.html)

You might also want to look into [the <abbr title="Capability Hardware Enhanced RISC Instructions">CHERI</abbr> project][cheri], which is working on adding provenance to pointers at the hardware instruction level, which would help immensely with safety in C.

[cheri]: https://www.cl.cam.ac.uk/research/security/ctsrd/cheri/

For two more great reads on how you can (and Rust does) use ownership in related ways to provide powerful guarantees about your code, check out Cliff Biffle’s posts [The Typestate Pattern in Rust][cliffle-typestate] and [Why Rust mutexes look like they do][cliffle-mutex]. Those are where I first came to understand the pattern I walked through in this post!

[cliffle-typestate]: https://cliffle.com/blog/rust-typestate/
[cliffle-mutex]: https://cliffle.com/blog/rust-mutexes/



[^whoa]: It still surprises and delights me every time I launch the version of the book that will come out with Rust 1.85 and read:

    > by Steve Klabnik, Carol Nichols, and Chris Krycho, with contributions from the Rust Community

[^unstable]: The standard library does this a fair bit for specific things like this. Less over time, though, in general!

[^nightly]: You could use the relevant feature flag to do it on nightly Rust… but you shouldn’t, particularly because it is not planned for stabilization at present.

[^basically-c]: In other words, it is basically a C array.

