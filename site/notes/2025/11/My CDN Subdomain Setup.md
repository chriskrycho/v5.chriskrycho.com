---
title: My CDN Subdomain Setup
subtitle: What I use, and how, for `cdn.chriskrycho.com`.

date: 2025-11-15

tags:
  - from my outbox
  - software development
  - site meta

qualifiers:
  audience: |
    Folks who run (or are interested in running) their own websites and know a tiny bit about <abbr>DNS</abbr>.

  context: |
    A reader and regular correspondent emailed me asking about how I set up `cdn.chriskrycho.com`—the subdomain I use for photos, [important <abbr title="portable document format">PDF</abbr>s](https://cdn.chriskrycho.com/drops/naur1985programming.pdf), and so on. I realized I had never written it up, so here’s what I sent back!

---

The short version is: Backblaze B2 for actually hosting the content (because it’s super cheap storage and ingress/egress), Cloudflare for <abbr>DNS</abbr> (as I do with everything presently), and a Cloudflare [<abbr title="universal resource locator">URL</abbr> Rewrite Rule](https://developers.cloudflare.com/rules/transform/url-rewrite/) to map inbound traffic to that Backblaze bucket.

The rewrite rule I use is: **If incoming requests match… > Custom filter expression**; the expression in question is:

```
http.host eq "cdn.chriskrycho.com" and
(not starts_with(http.request.uri.path, "/file/chriskrycho-com"))
```

**Then… > Rewrite to… > Dynamic** with the value `concat("/file/chriskrycho-com", http.request.uri.path)`. I set **Query** to **Preserve**, and then the **Place at** is **First** but in this case it doesn’t matter because it’s also the only rule I have for the domain at present!
