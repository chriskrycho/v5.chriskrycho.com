---
title: Publishing to GitHub Pages via GitHub Actions
subtitle: |
    Including two tips for bits that were very much not obvious about the project settings!

date: 2024-12-19T09:35:00-0700

qualifiers:
    audience: |
        Software developers broadly familiar with using GitHub Pages.

tags:
    - software development
    - tools

summary: >
    You can publish to GitHub pages via GitHub Actions, but you need to configure both the project’s GitHub Pages setup and its github-pages environment.

image:
    cdn: github-actions-failures.png

---

I just finished testing a GitHub Actions setup to allow us to publish a fork of [dprint-plugin-markdown][plugin], with the absolutely classic experience of having to iterate repeatedly on a GitHub Actions workflow by running it on GitHub, seeing it fail, fixing that issue, and trying it again.

![My many failed attempts to get this workflow working](https://cdn.chriskrycho.com/images/github-actions-failures.png)

[plugin]: https://github.com/dprint/dprint-plugin-markdown

The output from this is a trivial <abbr title="Hypertext Markup Language">HTML</abbr> page which links to whatever version of the [Wasm][wasm] plugin was just published, as well as the `.wasm` file. You can see the resulting page for the tiny repo where I experimented to get it working [here][page].

[wasm]: https://webassembly.org
[page]: https://chriskrycho.github.io/publish-wasm/

In the past, I have only ever deployed to GitHub Page using GitHub’s built-in support for using a directory or a branch. In this case, it made more sense to use its support for using a GitHub Actions workflow as the source for the output, along with the [actions/upload-pages-artifact][aupa] and [actions/deploy-pages][adp], because I needed to build the Rust Wasm code and upload that along with the <abbr>HTML</abbr>, and I also wanted to update the <abbr>HTML</abbr> output with the version I had just published.

[aupa]: https://github.com/actions/upload-pages-artifact
[adp]: https://github.com/actions/deploy-pages

The flow is pretty straightforward in the end: you configure the `upload-pages-artifact` action to accept a directory, and `deploy-pages` will pull from that automatically. Having those in separate steps keeps things a bit cleaner. You can find the full workflow I built for this [here][workflow].

[workflow]: https://github.com/chriskrycho/publish-wasm/blob/f81f17f7ec22085284c43e55fe3c92f503b868ba/.github/workflows/Build%20and%20Deploy%20WASM.yaml

Two other things I did not know till today for a workflow like this.

1. You must set the project up to publish via GitHub Actions on the **Settings > Pages** page.
2. You must configure the `github-pages` environment to allow tags as well as the default branch on the **Settings > Environments** page.
