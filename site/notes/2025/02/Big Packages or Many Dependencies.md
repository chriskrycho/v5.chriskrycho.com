---
title: Big Packages or Many Dependencies
subtitle: >
    Pick which you prefer, but you cannot be mad about *both*!

summary: >
    Dependency graph breadth and depth are inversely correlated with package size; vendoring and authoring yourself don’t change this. Pick your poison!

image:
    cdn: dep-graph.png

date: 2025-02-04T08:45:00-0700

tags:
    - software development

---

There is a fairly fundamental tension in a package ecosystem—

- You can have small packages that do just one thing and do not have to change often because their exposure to factors like operating system changes is (individually) small.

- You can have large packages that have to release more often to absorb/buffer changes from the world around them, again along the lines of operating system updates.

Through Door #1, you will have many more packages and both a wider and deeper dependency graph as presented by a tree view. Any individual part of it will change less, but there will be higher coordination costs due to propagating changes.

Through Door #2, you will have a smaller number of total dependencies, with both a strictly narrower and shallower graph if you look at a tree, but they will be larger and likelier to change more often.

The width and depth of the dependency graph may belie the total complexity of the graph. One big package may actually have *far more* complexity, but *look* simpler because it is “just one dependency”. Moreover, the number of packages in the tree is often a direct result of pressure to break dependencies apart because of a dislike for large packages. But you cannot have it both ways! Many small dependencies make for deep and wide dependency graphs, and large packages are by definition “heavier” in terms of bytes, complexity, etc.

The best “bend the curve” move we have here is to build meta-packages responsible for marshalling together changes from smaller packages managed by the same group of people. Especially if your ecosystem has good dead code elimination (what the <abbr>JS</abbr> community calls “tree shaking”), this allows for easier coordination across the ecosystem while also providing reasonably good build output sizes as the baseline *and* letting people who want to minimize the size of their dependency graph do so by opting into managing it more manually and directly.

Rebuilding things yourself is a perfectly reasonable move, but it does not actually get rid of the complexity; it just moves it into your own codebase. All the same tradeoffs apply unless you have exactly and only one application. The moment you start splitting out libraries to share, you have to start making the same balancing act. It might be worth it to have your fate entirely in your own hands in some cases. In others, probably not.[^crypto]

When people complain about there being too many dependencies and dependencies being too large, remember these fundamental tensions. You get to pick big packages *or* many dependencies, but you don’t get to complain about *both* in the same breath.

[^crypto]: “Don’t roll your own cryptography” is a rule of thumb for a reason.
