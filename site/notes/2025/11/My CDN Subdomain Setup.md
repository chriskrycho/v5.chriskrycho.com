---
title: My CDN Subdomain Setup
subtitle: What I use, and how, for `cdn.chriskrycho.com`.

date: 2025-11-15T08:35:00-0700
updated: 2025-11-15T09:55:00-0700
updates:
  - at: 2025-11-15T09:55:00-0700
    changes: |
      Added further explanation of *why* the setup is the way it is and removed specific identifying details of my buckets.

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

The short version is: I use [Backblaze B2][b2] for actually hosting the content (because it’s super cheap storage and ingress/egress), [Cloudflare][c] for <abbr>DNS</abbr> (as I do with everything presently), and a Cloudflare [<abbr title="universal resource locator">URL</abbr> Rewrite Rule][rewrite]rewrite to map inbound traffic to that Backblaze bucket.

[b2]: https://www.backblaze.com/cloud-storage
[c]: https://www.cloudflare.com
[rewrite]: https://developers.cloudflare.com/rules/transform/url-rewrite/

I use a `CNAME` record to map the `cdn.` subdomain mapped to the Backblaze bucket <abbr>URL</abbr>. Then I use a rewrite rule to map inbound requests to the path for files in the bucket if they are not *already* pointing to that path. So `cdn.chriskrycho.com/some-file.pdf` should map to `<bucket url>/file/<bucket-name>/some-file.pdf`, but `cdn.chriskrycho.com/file/<bucket-name>/some-file.pdf` should be left alone. That makes sure there is no infinite loop in the redirect endlessly adding `file/<bucket-name>` to the front of the path.

The rewrite rule I use is: **If incoming requests match… > Custom filter expression**. The expression I use is:

```
http.host eq "cdn.chriskrycho.com" and
(not starts_with(http.request.uri.path, "/file/<bucket-name>"))
```

Then I set **Then… > Rewrite to… > Dynamic** with the value `concat("/file/<bucket-name>", http.request.uri.path)`. I also set **Query** to **Preserve**, and then the **Place at** is **First** but in this case it doesn’t matter because it’s also the only rule I have for the domain at present!
