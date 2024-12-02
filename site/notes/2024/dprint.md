---
title: dprint
subtitle: >
    A very fast auto-formatter!

qualifiers:
    audience: |
        Software developers, especially in the JavaScript/TypeScript ecosystem.

date: 2024-12-03T11:31:00-0700
image: https://cdn.chriskrycho.com/images/dprint.png

tags:
    - software development
    - Rust
    - WebAssembly
    - JavaScript
    - TypeScript
    - CSS

---

[dprint][dprint] ([discussed][post] yesterday) is a fast auto-formatting tool. It’s interesting to me because:

[dprint]: https://dprint.dev
[post]: https://v5.chriskrycho.com/notes/definitelytyped-dprint-setup/

- When I say it is fast, I mean it is *really* fast. Much, much faster than (e.g.) [Prettier][prettier]. A big part of that speed is that it is written in Rust (shocking!) and takes advantage of that. This is part of why DefinitelyTyped could adopt it!

- It works with the JavaScript and TypeScript ecosystem—no surprise, since it came out of work at [Deno][deno]. It *also* works with other ecosystems and formats, though. There are formatter plugins for Markdown, <abbr title="Tom’s Own Markup Language">TOML</abbr>, <abbr title="Yet Another Markup Language">YAML</abbr>, <abbr>CSS</abbr>, <abbr>HTML</abbr> (and Vue and Svelte and Astro as a result), and handles embedded languages (code blocks in Markdown, script or style blocks in <abbr>HTML</abbr>, etc.).

- As with other similar tools in the space, it both lets you format code (`dprint fmt`) and check whether code matches its configured formatting rules (`dprint check`), so you can use it as a “lint” in your <abbr title="continuous integration">CI</abbr> setup.

- If you’re familiar with the Rust ecosystem, you might (correctly!) note that it’s usually not considered a good target for plugins. dprint works around that by using a [WebAssembly][wasm] runtime ([wasmer][wasmer]) as a plugin host. Wasm is not *quite* as fast as pure native code, but it’s still very fast on a well-tuned runtime, and this also means that you can write a dprint plugin in any language which can target Wasm, which is neat.

- It also has an interface for just shelling out to other commands, so you can even integrate it with existing formatters—handy if, for example, you are doing a transition from Prettier to dprint but want to do it incrementally. You can just run a single command, `dprint fmt`, and have it execute both your Prettier config *and* the native dprint plugins, on different sets of the codebase as you migrate over time.

For any front-end project I personally work on, dprint is my go-to tool for autoformatting at this point. If you *can* use it, I recommend you *do*!


[prettier]: https://prettier.io
[deno]: https://deno.com
[wasm]: https://webassembly.org
[wasmer]: https://wasmer.io

---

This all came up because today I [fixed][pr] a small [bug][bug] in dprint’s Markdown plugin, and it reminded me that I should write up dprint itself!
        
[dtdprint]: https://v5.chriskrycho.com/notes/definitelytyped-dprint-setup/
[pr]: https://github.com/dprint/dprint-plugin-markdown/pull/130
[bug]: https://github.com/dprint/dprint-plugin-markdown/issues/129
