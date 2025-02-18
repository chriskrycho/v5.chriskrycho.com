---
title: Axum Handler Errors Need to Implement `IntoResponse`
subtitle: >
  This has some interesting implications for `Result`.

date: 2025-02-17T19:35:00-0700

summary: >
  If you see inscrutable errors about handlers not implementing required traits, check that their return types implement `IntoResponse`!

image:
  cdn: trait-bounds.png

tags:
  - software development
  - Rust

qualifiers:
  audience: |
    Software developers working with the Rust [Axum][axum] library, particularly if you’re seeing an inscrutable message about your handler function not implementing one of the Axum route handler traits.
    
    [axum]: https://github.com/tokio-rs/axum

---

Over the weekend, I was whipping up a little project using Axum,[^anon] and at one point I got a bit stuck trying to figure out why a particular handler was not being accepted.[^macro] I eventually figured it out: any handler you use with Axum’s router needs to implement `IntoResponse`, because Axum uses that to define how to convert your handler’s return into, well, a response.

Axum implements `IntoResponse` for a *lot* of common types, including the majority of things you would naturally want to return, including for `Result`… with an important caveat: both the `T` and `E` cases on the `Result` *also* need to implement `IntoResponse`.

The problem I had came from a signature something like this:

```rust
async fn handler() -> Result<Response<Body>, Error> {
    // ...
}

#[derive(Debug, thiserror::Error)
enum Error {
    #[error("Something went wrong")]
    OhTehNoes
}
```

The problem here, which produced a rather inscrutable error, was that `Error` did not implement `IntoResponse`, so `Result<Response<Body>, Error>` did not either. I fixed that pretty easily, with a trivial implementation:

```rust
impl IntoResponse for Error {
    fn into_response(self) -> axum::response::Response {
        (http::StatusCode::INTERNAL_SERVER_ERROR, self.to_string()).into_response()
    }
}
```

In this case that incredibly simple implementation is sufficient because it’s an incredibly simple little piece of software and the only errors in question mean I did something wrong. I might get more granular later. I also might not!


[^anon]: More on that anon!

[^macro]: Yes, I tried using the extra fancy debug macro; it was not, in this particular case, illuminating!
