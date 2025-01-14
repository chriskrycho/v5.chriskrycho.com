---
title: Resilience, Robustness, and Competence Envelopes
subtitle: |
    Some *great* additions to my systems thinking vocabulary, courtesy of Lorin Hochstein.

date: 2025-01-14T10:26:00-0700

tags:
    - systems thinking
    - quotes
    - learning

qualifiers:
    audience: |
        People interested in [systems thinking][st], perhaps especially (but definitely not *only*) as it affects developing and operation software systems.
        
        [st]: https://en.wikipedia.org/wiki/Systems_thinking

---

Lorin Hochstein has [a great post][lh] analyzing a [Canva incident report][canva].

[lh]: https://surfingcomplexity.blog/2024/12/21/the-canva-outage-another-tale-of-saturation-and-resilience/
[canva]: https://www.canva.dev/blog/engineering/canva-incident-report-api-gateway-outage/

The story itself was all-too familiar to me from an incident I led in 2023 at LinkedIn. Most of the details are different (though the phrase “<abbr>OOM</abbr> Killer” is still enough to make me a little twitchy), but the big picture is likely to be very familiar to *anyone* who has worked through a “thundering-herd”-style incident.

The thing that really caught my attention in Hochstein’s write-up, though, was his discussion near the end, around a couple very helpful concepts in systems thinking I hadn’t come across before: competence envelopes and definitions of robustness and resilience in terms of competence envelopes:

> The competence envelope is sort of a conceptual space of the types of inputs that your system can handle. Incidents occur when your system is pushed to operate outside of its competence envelope, such as when it gets more load than it is provisioned to handle:
>
> The competence envelope is a good way to think about the difference between *robustness* and *resilience*. You can think of robustness as describing the competence envelope itself: a more robust system may have a larger competence envelope, it is designed to handle a broader range of problems.
>
> However, every system has a finite competence envelope. The difference between a *resilient* and a *brittle* system is how that system behaves when it is pushed just outside of its competence envelope.

There is a bunch more, and I found it *quite* helpful to put in my mental toolbox, so [go give it a read][lh]!
