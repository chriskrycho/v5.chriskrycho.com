---
title: Cloudflare Worker Responses Require Manual Caching
subtitle: This was not intuitive or obvious, but at least it isn’t hard, either.

date: 2025-02-28T13:08:00-0700

qualifiers:
  audience: |
    Software developers using Cloudflare Workers—whether the JavaScript or Rust <abbr>API</abbr>s.

summary: >
  If you deploy a Cloudflare Worker, Cloudflare will *not* do its normal caching; you have to define a caching strategy programmatically yourself.

tags:
  - software development
  - Rust
  - WebAssembly

---

Background: I lately deployed a tiny little app to [Cloudflare Workers][cw] to render and serve social media images. It’s nothing very fancy—just a little Rust/Wasm project that uses [ril][ril] to render an image and push it up to [Backblaze B2][b2], unless it has already been rendered. I was a bit confused to discover that I was serving a *lot* of duplicate requests. My own basic caching strategy of “is this already in B2?” worked fine, but it was asking that question a lot more than I expected given it was running on Cloudflare.

[cw]: https://workers.cloudflare.com
[ril]: https://crates.io/crates/ril
[b2]: https://www.backblaze.com/docs/cloud-storage-native-api

A tiny bit of debugging—read: inspecting the response headers—told me that Cloudflare wasn’t caching it at all: there was no `CF-Cache-Status` header. That was pretty surprising to me, given it was sitting on a Cloudflare Worker, but it turns out Cloudflare does not automatically cache *any* request to a Worker unless you explicitly ask it to. The idea is (and had I read the docs end to end I would have known this!) that you are responsible to use [the `Cache` <abbr title="application programming interface">API</abbr>][cache-api] yourself!

[cache-api]: https://developers.cloudflare.com/workers/runtime-apis/cache/

It was a whopping six lines of code to add, thankfully:

```rust
let cache = Cache::default();
let cache_key = request.uri().to_string();
if let Some(resp) = cache.get(&cache_key, false).await? {
    return Ok(resp);
}

// Check B2 and rebuild the social media image if need be…

cache.put(&cache_key, response.cloned()?).await?;
```

Thenceforth everything Just Worked™ the way I expected it to in the first place!

I’ll probably say more later about Cloudflare Workers, but in the meantime, I hope this is helpful to someone else out there!

[^why]: Why Cloudflare Workers? I’ll write a longer post later, but for now: it was the best/simplest way to get up and running. <abbr title="Amazon Web Services">AWS</abbr> Lambda would also have been a good option. So would [a Mac Mini](https://www.contraption.co/a-mini-data-center/).