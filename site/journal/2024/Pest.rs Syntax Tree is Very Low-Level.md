---
title: Pest.rs’ Syntax Tree is Very Low-Level
subtitle: Which is fine, mostly, but it means you have to do two passes to get a typed <abbr title="abstract syntax tree">AST</abbr>!
date: 2024-06-21T17:22:00-0600
tags:
    - software development
    - programming languages
    - parsing
    - Rust
qualifiers:
    audience: >
        People interested in programming languages and parsers.

---

I am building a small parser for a little programming language I am building[^pl] with [Pest](https://pest.rs),[^pest] and noticed something interesting: If you are using it as a starting point for generating a typed <abbr title="abstract syntax tree">AST</abbr>, it ends up feeling more like a high-level lexer than an actual parser. (Granted that the line between lexing and parsing is fuzzy anyway!)

The reason is that its “high-level” syntax is in terms of `Pair`s, i.e. a matching pair of `Token`s and everything in between them. A `Token`, meanwhile, is just the start and end underlying “rule” from the grammar definition. On its own, that might sound fine, and indeed it could be! The problem is that you end up with something like this:

```rust
enum Rule {
    Value,
    OpPlus,
    OpMinus,
}
```

And then a `Pair` just tells you what a given node’s `Rule` is, and gives you access to the original source span for it *or* a child list of… more `Pair`s, equally undifferentiated from each other at the type level, and just carrying along its own `Rule` and span and so on.

In practice, this measn that if you want a typed <abbr title="abstract syntax tree">AST</abbr> which might attach values to nodes, e.g. `Value(u32)`, you have to build it *yourself* by walking an iterator of pairs and continually pulling out the children of each `Pair`:

```rust
let mut pairs = some_pair.into_inner();
// The docs explicitly say that lots of `unwrap` is expected! Better hope that
// you’re correct about all permutations of possible pairs!
let first = pairs.next().unwrap();
match first.as_rule() {
    Rule::Value => {
        let value = first.as_str().parse().expect("has to be a number!");
        // ...
    }
    Rule::OpPlus => {/* likewise... */}
    Rule::OpPlus => {/* likewise... */}
}
```

This is, to say the least, *not* a high-level <abbr title="application programming interface">API</abbr>! As I suggested at the outset: it almost feels more like a high-level lexer. It would be much better if each node was explicit about what kinds of things *could* be in its child nodes. Thinking about those `.unwrap()` and `.expect()` cases in the code sample: I would really expect that in where it is literally impossible for a given child node *not* to exist, it shouldn’t be optional. That means you cannot use an iterator <abbr title="application programming interface">API</abbr> in all the same ways and places, though, and it makes for dramatically more complicated code generation.

I understand why the library works the way it does today! I just also wish it worked differently. Happily, the Pest [v3 rewrite][v3] looks like it will tackle a lot of these issues and make working with it a lot easier, so I am excited to try that out… *after* I get this first version working.[^goals]

I also recognize that there are actually some possible advantages to *not* having a richly-typed <abbr title="abstract syntax tree">AST</abbr>, and that many real-world parsers look a fair bit like this `Pair` structure, but for the moment a thoroughly typed <abbr title="abstract syntax tree">AST</abbr> is the direction I want to explore!

[v3]: https://github.com/pest-parser/pest/discussions/1016


[^pl]: Purely for my own interest; this one is called “small lang 1” and is expressly intended *not* to go anywhere. I just need to build the muscles!

[^pest]: I enjoy parsing expression grammars, and Pest is a nice one! It is not necessarily the best choice for a production-grade *programming language* parser, because it does not have a good way to do error recovery. But it is a good starting point for me for this little project.

[^goals]: One of my explicit goals for this project is to *get things working* rather than getting sidetracked by ways I could improve it. I [have a bad tendency][infra] to get derailed by those kinds of questions—which can be a real superpower in my day job
