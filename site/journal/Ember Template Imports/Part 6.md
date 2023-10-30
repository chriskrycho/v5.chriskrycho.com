---
title: >
  Ember.js Template Imports: Part 6
subtitle: >
  Given the tradeoffs in the space, what is the best set of compromises we can make?
series:
  part: 6
date: 2021-11-15T17:45:00-0700
image: https://cdn.chriskrycho.com/images/template-imports/part-6-table.png
tags:
  - teaching
  - learning

---

Over the past month, I have systematically examined the tradeoffs of the proposed options for Ember and Glimmer’s template imports design:

1. [Introducing the series and walking through the formats.][p1]
2. [Which template imports design has the biggest set of wins for **_teaching and understanding_** components?][p2]
3. [Evaluating the tradeoffs of template language designs for **_tooling_**.][p3]
4. [Keeping, and improving on, one of Ember’s fundamental commitments — and biggest strengths: its integrated **_testing_**.][p4]
5. [What about **styles**? (A bonus post!)][p5]

[p1]: https://v5.chriskrycho.com/journal/ember-template-imports/part-1/
[p2]: https://v5.chriskrycho.com/journal/ember-template-imports/part-2/
[p3]: https://v5.chriskrycho.com/journal/ember-template-imports/part-3/
[p4]: https://v5.chriskrycho.com/journal/ember-template-imports/part-4/
[p5]: https://v5.chriskrycho.com/journal/ember-template-imports/part-5/

In this final part, I am going to pull all of those threads together and synthesize them into my conclusion: that we should use `<template>`. Not because it’s perfect (none of the options are! This is software engineering!) but because it strikes the best balance across all these axes.

---

When I first started discussing these options with people a few years ago, after the strict mode and initial template imports <abbr title="request for comments">RFC</abbr>s were opened, I had a strong bias toward the `hbs` template literal strings design. I have since then come to think that `hbs` is the *second-worst* option, with only imports-only being worse—and that’s iffy, because the problems with `hbs` are so bad in my view! I also originally very much disliked <abbr title="single file component">SFC</abbr> designs, but have now come to see them as better than the `hbs` design in many areas, and if it weren’t for a couple key limitations they might be my favorite. And the `<template>` proposal moved from being my second-least-favored proposal to the one I think we should adopt.

This was the result of discussing and thinking on all the tradeoffs I’ve laid out over the past few weeks in this series: what works best and has the fewest problems pedagogically? implementation-wise? for integrating with styles? for migrating existing users? for language server support?

I sympathize with people who still *like* other proposals better. Those feelings, in many cases, mirror my own initial responses in various ways, even if the details differ. I also expect that no matter what we choose, some people will be unhappy. That could include me! I continue to believe it is *most* important that we choose one of these formats and execute on it—even if that ends up being a decision in a direction I think is misguided.

That gets at something important, though: in order to make a decision, we simply have to evaluate the tradeoffs around these designs and do the best we can with the constraints we have. That’s why “just use <abbr title="JavaScript XML">JSX</abbr>” isn’t one of the options I’ve discussed: <abbr>JSX</abbr> doesn’t work with the constraints of the Glimmer <abbr>VM</abbr> today. It’s also why I haven’t spoken at all about the aesthetics or questions of taste: we will likely all differ on which approach we think looks and feels nicest, and those differences are likely intractable. If you think the `hbs` proposal looks nicest, and I think <abbr>SFC</abbr>s look nicest,[^nicest] how could we possibly persuade each other? There is, as the saying goes, no accounting for taste.

[^nicest]: This is in fact what I think: <abbr>SFC</abbr>s *look* nicest. But that doesn’t make them the best decision.

---

With that in mind, let’s review the conclusions I drew in each of the earlier parts of the series—once again in tabular form:

<div class='table-container'>
  <table>
    <thead>
      <th scope='col'>Consideration</th>
      <th><code>&lt;template&gt;</code></th>
      <th>Template literals</th>
      <th><abbr>SFC</abbr>s</th>
      <th>Imports-only</th>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Progressive Disclosure</th>
        <td>Good</td>
        <td>Bad</td>
        <td>Very good</td>
        <td>Good</td>
      </tr>
      <tr>
        <th scope="row">JavaScript semantics</th>
        <td>Good</td>
        <td>Good</td>
        <td>Good</td>
        <td>Very bad</td>
      </tr>
      <tr>
        <th scope="row">Scope semantics</th>
        <td>Very good</td>
        <td>Bad</td>
        <td>Okay</td>
        <td>Good</td>
      </tr>
      <tr>
        <th scope="row">Semantic mismatch</th>
        <td>Yes/<abbr>HTML</abbr>/tractable</td>
        <td>Yes/<abbr>JS</abbr>/intractable</td>
        <td>No</td>
        <td>No</td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th scope='col' colspan='5'>Syntax</th>
      </tr>
      <tr>
        <th scope='row'><abbr>JS</abbr></th>
        <td>working</td>
        <td>working</td>
        <td>working</td>
        <td>not working</td>
      </tr>
      <tr>
        <th scope='row'>templates</th>
        <td>working</td>
        <td>working</td>
        <td>working</td>
        <td>working</td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th scope='col' colspan='5'>Linting</th>
      </tr>
      <tr>
        <th scope='row'><abbr>JS</abbr></th>
        <td>partial</td>
        <td>partial</td>
        <td>partial</td>
        <td>no</td>
      </tr>
      <tr>
        <th scope='row'>templates</th>
        <td>no</td>
        <td>no</td>
        <td>no</td>
        <td>yes</td>
      </tr>
      <tr>
        <th scope='row'>needs custom parser</th>
        <td>yes</td>
        <td>yes</td>
        <td>yes</td>
        <td>yes</td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th scope='col' colspan='5'>Formatting</th>
      </tr>
      <tr>
        <th scope='row'><abbr>JS</abbr></th>
        <td>no</td>
        <td>partial</td>
        <td>partial</td>
        <td>no</td>
      </tr>
      <tr>
        <th scope='row'>templates</th>
        <td>no</td>
        <td>partial</td>
        <td>partial</td>
        <td>no</td>
      </tr>
      <tr>
        <th scope='row'>needs custom parser</th>
        <td>yes</td>
        <td>yes</td>
        <td>yes</td>
        <td>yes</td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th scope='row'><abbr>LS</abbr> effort</th>
        <td>small</td>
        <td>none</td>
        <td>medium</td>
        <td>small</td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <th scope='row'>Server-side requires compilation</th>
        <td colspan='4'>yes for all formats, including <code>hbs</code></td>
      </tr>
    </tbody>
    <tbody>
      <th scope='row'>shared syntax for tests</th>
      <td>yes</td>
      <td>yes</td>
      <td>no</td>
      <td>no</td>
    </tbody>
    <tbody>
	    <th scope='row'>Styling</th>
	    <td colspan='4'>Everything “just works” for all formats</td>
    </tbody>
  </table>
</div>

When you put all the pieces together like this, I think it’s fairly obvious why I ultimately concluded that `<template>` is the best choice. In every overarching category except for formatting, it is either comparable to the other choices or substantially better. It’s not perfect. It’s more work in a few spots than the alternatives, and in some other cases it’s just kind of *the same* as the alternatives. But it does come out the best overall.

---

As a final note, I think it’s worth considering the relationship between the different categories. Tooling costs are real, but they’re something we address straightforwardly by building some software. We’re software developers; we’re very good at building software! While there are some ongoing costs to maintaining software, they’re small and tractable, and they only fall on the people who maintain those tools.

By contrast, the problems of teaching and understanding are ongoing, and distributed. Every new developer who enters the Ember/Glimmer ecosystem will have to pay them—for as long as we use whatever format we choose here. In my view, that makes the case for `<template>` even more compelling: it’s not just that it comes out the winner in a general analysis (though it does), but that it comes out *by far* the winner in the most important and least-“solvable” category.

<div class='callout'>

As ever, I’m happy to discuss this—and the series as a whole!—[on the Ember forums][forum] or [in Discord][discord]. And keep your eyes open for the <abbr>RFC</abbr> I’ll be opening in the next few weeks advocating that we ship `<template>` as the officially-supported syntax and as part of Ember’s upcoming Polaris edition!

[forum]: https://discuss.emberjs.com/t/ember-template-imports-series-discussion/19247
[discord]: https://discord.com/channels/480462759797063690/518154533143183377/

</div>