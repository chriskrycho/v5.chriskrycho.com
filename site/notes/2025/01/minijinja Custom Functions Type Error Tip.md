---
title: >
    minijinja Custom Functions Type Error Tip
subtitle: >
    If the error message involves `Function`, the problem is really `ViaDeserialize`.

summary: >
    Make sure that every value you need to use in a minijinja template function implements `serde::Deserialize`, or you will have a bad time.

date: 2025-01-29T15:58:00-0700
image:
    cdn: via-deserialize.png

tags:
    - Rust
    - software development

---

In between consulting contracts and job applications, I am building out a small personal Rust project that uses [minijinja][mj]. It works extremely well and is quite fast, and I have well over a decade of experience building static sites with [Jinja] and [Nunjucks][n] templates, so this is a reasonable approach (trying not to shave the yak by implementing my own templating layer… at least for now).

It is possible to work with complex types across minijinja functions using the `ViaDeserialize` trait (though there is a fair bit of implicit conversion necessarily happening there, as implied by the name!). However, that constraint *indirectly* requires that the type you apply it to implement `serde::Deserialize`, and the errors show up not at the site where you try to define a function in terms of a type which does not implement `serde::Deserialize`, but where you try to call minijina’s `Environment::add_function` helper *using* the function you have defined:

```
error[E0277]: the trait bound `for<'a, 'b, 'c> fn(ViaDeserialize<&'a Page<'b>>, ViaDeserialize<&'c data::config::Config>) -> std::string::String {url_for}: Function<_, _>` is not satisfied
   --> src/templates/functions.rs:66:32
    |
66  |    env.add_function("url_for", url_for);
    |        ------------            ^^^^^^^ the trait `Function<_, _>` is not implemented for fn item `fn(ViaDeserialize<&Page<'b>>, ViaDeserialize<&Config>) -> String {url_for}`
    |        |
    |        required by a bound introduced by this call
    |
note: required by a bound in `Environment::<'source>::add_function`
   --> /Users/chris/.cargo/registry/src/index.crates.io-6f17d22bba15001f/minijinja-2.5.0/src/environment.rs:740:12
    |
736 |     pub fn add_function<N, F, Rv, Args>(&mut self, name: N, f: F)
    |            ------------ required by a bound in this associated function
...
740 |         F: functions::Function<Rv, Args>
    |            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ required by this bound in `Environment::<'source>::add_function`
```

Not only is this extremely noisy (despite the Rust team’s best efforts: there is just a lot going on here), it doesn’t *really* tell you what is wrong or what you need to do to fix it. *Why* is the trait `Function<_, _>` not implemented for this call? Who could say?

The answer is that one of the parameters in the function (in this case `url_for`) does not implement `serde::Deserialize`, but I had *claimed* it did by defining `url_for` like this:

```rust
fn url_for(
   ViaDeserialize(path): ViaDeserialize<Page>,
   ViaDeserialize(config): ViaDeserialize<Config>,
) -> String {
   // ...
}
```

In this case, the `Page` type was the culprit: it does not (and for reasons not germane to this particular post, *cannot*) implement `Deserialize`. I can work around that here, by using a narrower type that *can* implement `Deserialize`, but only once I know that that’s the problem!

So, long story short: if you see that gnarly “does not implement `Function`” error, go check all the types you are using with `ViaDeserialize`: one of them is not implementing `Deserialize`!

Bonus: I opened [a <abbr title="pull request">PR</abbr> that fixes this][pr], at the cost of some type system shenanigans internally in minijinja; we’ll see what the maintainer (the excellent [Armin Ronacher][ar]) thinks about it. Hopefully this tip will end up outdated!

[mj]: https://github.com/mitsuhiko/minijinja
[j]: https://jinja.palletsprojects.com/en/stable/
[n]: https://mozilla.github.io/nunjucks/
[pr]: https://github.com/mitsuhiko/minijinja/pull/689
[ar]: https://mitsuhiko.at